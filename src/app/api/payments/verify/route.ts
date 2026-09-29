import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { confirmRazorpayPayment, verifySignature } from "@/lib/payments";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const orderId = typeof body.razorpay_order_id === "string" ? body.razorpay_order_id : "";
  const paymentId = typeof body.razorpay_payment_id === "string" ? body.razorpay_payment_id : "";
  const signature = typeof body.razorpay_signature === "string" ? body.razorpay_signature : "";
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!orderId || !paymentId || !signature || !secret || !verifySignature(`${orderId}|${paymentId}`, signature, secret)) return NextResponse.json({ error: "Payment signature is invalid." }, { status: 400 });
  const payment = await db.payment.findUnique({ where: { transactionId: orderId }, include: { booking: true } });
  if (!payment || payment.booking.userId !== session.userId) return NextResponse.json({ error: "Payment order not found." }, { status: 404 });
  try {
    const verified = await confirmRazorpayPayment(orderId, paymentId);
    const receipt = await db.paymentReceipt.findUnique({ where: { paymentId: verified.id }, include: { payment: { include: { booking: { include: { trip: { include: { destination: true } } } } } } } });
    if (!receipt || verified.status !== "SUCCEEDED") return NextResponse.json({ error: "Payment is not captured; no receipt was issued." }, { status: 409 });
    const trip = receipt.payment.booking.trip;
    return NextResponse.json({ status: verified.status, receipt: { receiptNumber: receipt.receiptNumber, transactionId: paymentId, bookingReference: receipt.payment.booking.reference, method: receipt.payment.method, amount: receipt.payment.amount, currency: receipt.payment.currency, destination: trip.destination?.name ?? trip.title, travelers: Array.isArray(trip.travelers) ? trip.travelers : [], travelDate: trip.travelDate, issuedAt: receipt.createdAt } });
  } catch {
    try {
      const keyId = process.env.RAZORPAY_KEY_ID;
      if (!keyId || !secret) throw new Error("Provider configuration is missing.");
      const providerResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, { headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}` }, cache: "no-store" });
      const providerPayment = providerResponse.ok ? await providerResponse.json() : null;
      if (!providerPayment || providerPayment.order_id !== orderId || providerPayment.amount !== payment.amount * 100 || providerPayment.currency !== payment.currency) throw new Error("Provider payment does not match this order.");
      if (providerPayment.status === "failed") {
        await db.payment.updateMany({ where: { id: payment.id, status: "PENDING" }, data: { status: "FAILED" } });
        return NextResponse.json({ status: "FAILED", error: "Provider reports that this payment failed. You can retry checkout." }, { status: 409 });
      }
      return NextResponse.json({ status: "PENDING", error: "Payment is still pending provider capture. No receipt was issued; check your account again shortly." }, { status: 202 });
    } catch {
      return NextResponse.json({ status: "PENDING", error: "Provider has not confirmed capture yet. No receipt was issued." }, { status: 409 });
    }
  }
}
