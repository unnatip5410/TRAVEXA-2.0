import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession, newReference } from "@/lib/auth";
import { razorpayConfigured } from "@/lib/payments";
import { allowRequest } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!allowRequest(request, "payment-order", 6, 60_000)) return NextResponse.json({ error: "Too many checkout attempts. Wait a minute and retry." }, { status: 429 });
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Sign in before checkout." }, { status: 401 });
  if (!razorpayConfigured()) return NextResponse.json({ error: "Payments are unavailable until Razorpay credentials and webhook secret are configured. No charge was made." }, { status: 503 });
  try {
    const body = await request.json();
    const tripId = typeof body.tripId === "string" ? body.tripId : "";
    const qrRequested = body.method === "qr";
    const trip = await db.trip.findFirst({ where: { id: tripId, userId: session.userId }, include: { destination: true, bookings: true } });
    if (!trip || !trip.bookings[0]) return NextResponse.json({ error: "Saved trip not found." }, { status: 404 });
    const preferences = (trip.preferences ?? {}) as { stayTier?: unknown; transportTier?: unknown };
    const stayTier = preferences.stayTier;
    const transportTier = preferences.transportTier;
    if (!Number.isInteger(trip.travellers) || trip.travellers < 1 || trip.travellers > 4 || !["Standard", "Heritage / Mid", "Luxury"].includes(String(stayTier)) || !["Drive & Local", "Flight + Cab", "Train + Local"].includes(String(transportTier))) return NextResponse.json({ error: "Trip quote is invalid. Please update and save your trip again." }, { status: 400 });
    const stayMultiplier = stayTier === "Luxury" ? 2.2 : stayTier === "Heritage / Mid" ? 1.4 : 1;
    const transportCost = transportTier === "Flight + Cab" ? 8500 : transportTier === "Train + Local" ? 3200 : 4500;
    const amount = Math.round(18500 * trip.travellers * stayMultiplier + transportCost * trip.travellers);
    if (!Number.isSafeInteger(amount) || amount < 100) return NextResponse.json({ error: "Trip quote is invalid." }, { status: 400 });
    const makeQr = async (orderId: string) => {
      const keyId = process.env.RAZORPAY_KEY_ID!;
      const auth = Buffer.from(`${keyId}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
      const closeBy = Math.floor(Date.now() / 1000) + 2 * 60 * 60;
      const qrResponse = await fetch("https://api.razorpay.com/v1/payments/qr_codes", { method: "POST", headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" }, body: JSON.stringify({ type: "upi_qr", name: `TRAVEXA ${trip.bookings[0].reference}`, usage: "single_use", fixed_amount: true, payment_amount: amount * 100, description: `${trip.destination?.name ?? trip.title} · ${trip.bookings[0].reference}`, close_by: closeBy, notes: { orderId, bookingId: trip.bookings[0].id, bookingReference: trip.bookings[0].reference, ownerId: session.userId } }), cache: "no-store" });
      const qr = await qrResponse.json();
      if (!qrResponse.ok || typeof qr.id !== "string" || typeof qr.image_url !== "string") return NextResponse.json({ error: "Razorpay could not create a QR for this merchant account. UPI QR activation may be required; no charge was made." }, { status: 502 });
      await db.payment.update({ where: { bookingId: trip.bookings[0].id }, data: { method: `Razorpay UPI QR|${qr.id}` } });
      return NextResponse.json({ flow: "qr", qrCodeId: qr.id, imageUrl: qr.image_url, expiresAt: qr.close_by, orderId, bookingReference: trip.bookings[0].reference, amount: amount * 100, currency: "INR" }, { headers: { "Cache-Control": "no-store" } });
    };
    const existing = await db.payment.findUnique({ where: { bookingId: trip.bookings[0].id } });
    if (existing) {
      if (existing.status === "SUCCEEDED") return NextResponse.json({ error: "This trip has already been paid." }, { status: 409 });
      if (existing.amount !== amount) return NextResponse.json({ error: "Trip quote changed. Save the trip again before checkout." }, { status: 409 });
      const priorQrId = existing.method.startsWith("Razorpay UPI QR|") ? existing.method.slice("Razorpay UPI QR|".length) : "";
      if (existing.status === "PENDING" && priorQrId) {
        const closeResponse = await fetch(`https://api.razorpay.com/v1/payments/qr_codes/${encodeURIComponent(priorQrId)}/close`, { method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64")}`, "Content-Type": "application/json" }, body: "{}", cache: "no-store" });
        if (!closeResponse.ok) return NextResponse.json({ error: "The previous provider QR is still active. Wait for its payment status before starting another checkout." }, { status: 409 });
      }
      await db.payment.update({ where: { id: existing.id }, data: { status: "PENDING", method: "Razorpay Checkout" } });
      if (qrRequested) return makeQr(existing.transactionId);
      return NextResponse.json({ orderId: existing.transactionId, bookingReference: trip.bookings[0].reference, amount: amount * 100, currency: existing.currency, keyId: process.env.RAZORPAY_KEY_ID }, { headers: { "Cache-Control": "no-store" } });
    }
    const keyId = process.env.RAZORPAY_KEY_ID!;
    const auth = Buffer.from(`${keyId}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
    const orderResponse = await fetch("https://api.razorpay.com/v1/orders", { method: "POST", headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" }, body: JSON.stringify({ amount: amount * 100, currency: "INR", receipt: newReference("TRX"), notes: { tripId: trip.id, bookingId: trip.bookings[0].id, ownerId: session.userId } }), cache: "no-store" });
    const order = await orderResponse.json();
    if (!orderResponse.ok || typeof order.id !== "string") return NextResponse.json({ error: "Payment provider could not create an order." }, { status: 502 });
    await db.payment.create({ data: { transactionId: order.id, amount, currency: "INR", method: "Razorpay Checkout", status: "PENDING", demoMode: false, bookingId: trip.bookings[0].id } });
    if (qrRequested) return makeQr(order.id);
    return NextResponse.json({ orderId: order.id, bookingReference: trip.bookings[0].reference, amount: order.amount, currency: order.currency, keyId }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "Could not start checkout. No payment was taken." }, { status: 500 }); }
}
