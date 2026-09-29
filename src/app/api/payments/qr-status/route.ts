import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { confirmRazorpayQrPayment } from "@/lib/payments";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const orderId = typeof body.orderId === "string" ? body.orderId : "";
  const qrCodeId = typeof body.qrCodeId === "string" ? body.qrCodeId : "";
  const payment = await db.payment.findUnique({ where: { transactionId: orderId }, include: { booking: { include: { trip: { include: { destination: true } } } } } });
  if (!payment || payment.booking.userId !== session.userId) return NextResponse.json({ error: "QR payment not found." }, { status: 404 });
  if (payment.status === "SUCCEEDED") {
    const receipt = await db.paymentReceipt.findUnique({ where: { paymentId: payment.id } });
    if (!receipt) return NextResponse.json({ error: "Verified payment receipt is unavailable." }, { status: 500 });
    const trip = payment.booking.trip;
    return NextResponse.json({ status: "SUCCEEDED", receipt: { receiptNumber: receipt.receiptNumber, transactionId: (receipt.payload as Record<string, unknown>).paymentId ?? payment.transactionId, bookingReference: payment.booking.reference, method: payment.method, amount: payment.amount, currency: payment.currency, destination: trip.destination?.name ?? trip.title, travelers: Array.isArray(trip.travelers) ? trip.travelers : [], travelDate: trip.travelDate, issuedAt: receipt.createdAt } });
  }
  if (!qrCodeId || payment.method !== `Razorpay UPI QR|${qrCodeId}` || payment.status !== "PENDING") return NextResponse.json({ status: payment.status, error: "QR payment is no longer active." }, { status: 409 });
  const keyId = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) return NextResponse.json({ error: "Razorpay is not configured." }, { status: 503 });
  try {
    const response = await fetch(`https://api.razorpay.com/v1/payments/qr_codes/${encodeURIComponent(qrCodeId)}/payments?count=100`, { headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}` }, cache: "no-store" });
    if (!response.ok) throw new Error("QR status is unavailable.");
    const collection = await response.json();
    const providerPayments = Array.isArray(collection.items) ? collection.items : [];
    const captured = providerPayments.find((item: Record<string, unknown>) => item.status === "captured" && item.amount === payment.amount * 100 && item.currency === payment.currency);
    if (captured && typeof captured.id === "string") {
      await confirmRazorpayQrPayment(orderId, qrCodeId, captured.id);
      const [receipt, updatedPayment] = await Promise.all([db.paymentReceipt.findUnique({ where: { paymentId: payment.id } }), db.payment.findUnique({ where: { id: payment.id } })]);
      if (!receipt || !updatedPayment) return NextResponse.json({ error: "Verified payment receipt is unavailable." }, { status: 500 });
      const trip = payment.booking.trip;
      return NextResponse.json({ status: "SUCCEEDED", receipt: { receiptNumber: receipt.receiptNumber, transactionId: captured.id, bookingReference: payment.booking.reference, method: updatedPayment.method, amount: payment.amount, currency: payment.currency, destination: trip.destination?.name ?? trip.title, travelers: Array.isArray(trip.travelers) ? trip.travelers : [], travelDate: trip.travelDate, issuedAt: receipt.createdAt } });
    }
    const failed = providerPayments.find((item: Record<string, unknown>) => item.status === "failed");
    if (failed) {
      await db.payment.updateMany({ where: { id: payment.id, status: "PENDING" }, data: { status: "FAILED", method: "Razorpay UPI QR (failed)" } });
      return NextResponse.json({ status: "FAILED", error: "Provider reports that this QR payment failed. Start checkout again to retry." });
    }
    const qrResponse = await fetch(`https://api.razorpay.com/v1/payments/qr_codes/${encodeURIComponent(qrCodeId)}`, { headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}` }, cache: "no-store" });
    if (qrResponse.ok && (await qrResponse.json()).status === "closed") {
      await db.payment.updateMany({ where: { id: payment.id, status: "PENDING" }, data: { status: "FAILED", method: "Razorpay UPI QR (expired)" } });
      return NextResponse.json({ status: "FAILED", error: "This provider QR expired. Start checkout again for a new QR." });
    }
    return NextResponse.json({ status: "PENDING", message: "Waiting for provider confirmation. Do not close this page until payment finishes." });
  } catch {
    return NextResponse.json({ status: "PENDING", error: "Still waiting for provider confirmation." }, { status: 202 });
  }
}
