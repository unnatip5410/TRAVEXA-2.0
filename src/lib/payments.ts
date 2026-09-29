import { createHmac, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
import { newReference } from "@/lib/auth";

export const razorpayConfigured = () => Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_WEBHOOK_SECRET);
export function verifySignature(payload: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(payload).digest();
  let provided: Buffer;
  try { provided = Buffer.from(signature, "hex"); } catch { return false; }
  return expected.length === provided.length && timingSafeEqual(expected, provided);
}

export async function confirmRazorpayPayment(orderId: string, paymentId: string) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error("Payment provider is not configured.");
  const existing = await db.payment.findUnique({ where: { transactionId: orderId }, include: { booking: { include: { trip: { include: { destination: true } } } } } });
  if (!existing) throw new Error("Payment order not found.");
  if (existing.status === "SUCCEEDED") return existing;
  const response = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, { headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}` }, cache: "no-store" });
  if (!response.ok) throw new Error("Payment verification with provider failed.");
  const providerPayment = await response.json();
  if (providerPayment.order_id !== orderId || providerPayment.status !== "captured" || providerPayment.amount !== existing.amount * 100 || providerPayment.currency !== existing.currency) throw new Error("Payment was not captured for this order.");
  return db.$transaction(async (tx) => {
    const updated = await tx.payment.update({ where: { id: existing.id }, data: { status: "SUCCEEDED", method: providerPayment.method ?? "Razorpay" } });
    await tx.booking.update({ where: { id: existing.bookingId }, data: { status: "CONFIRMED" } });
    await tx.paymentReceipt.upsert({ where: { paymentId: existing.id }, update: {}, create: { paymentId: existing.id, receiptNumber: newReference("RCP"), payload: { orderId, paymentId, amount: existing.amount, currency: existing.currency, destination: existing.booking.trip.destination?.name ?? existing.booking.trip.title } } });
    return updated;
  });
}

export async function confirmRazorpayQrPayment(orderId: string, qrCodeId: string, paymentId: string) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error("Payment provider is not configured.");
  const existing = await db.payment.findUnique({ where: { transactionId: orderId }, include: { booking: { include: { trip: { include: { destination: true } } } } } });
  if (!existing || existing.status === "FAILED") throw new Error("QR code is not associated with this booking.");
  if (existing.status === "SUCCEEDED") {
    const receipt = await db.paymentReceipt.findUnique({ where: { paymentId: existing.id } });
    if (receipt && (receipt.payload as Record<string, unknown>).qrCodeId === qrCodeId && (receipt.payload as Record<string, unknown>).paymentId === paymentId) return existing;
    throw new Error("A different payment already completed for this booking.");
  }
  if (existing.method !== `Razorpay UPI QR|${qrCodeId}`) throw new Error("QR code is not associated with this booking.");
  const response = await fetch(`https://api.razorpay.com/v1/payments/qr_codes/${encodeURIComponent(qrCodeId)}/payments?count=100`, { headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}` }, cache: "no-store" });
  if (!response.ok) throw new Error("QR payment verification with provider failed.");
  const collection = await response.json();
  const providerPayment = Array.isArray(collection.items) ? collection.items.find((item: Record<string, unknown>) => item.id === paymentId) : null;
  if (!providerPayment || providerPayment.status !== "captured" || providerPayment.amount !== existing.amount * 100 || providerPayment.currency !== existing.currency) throw new Error("Provider has not captured the exact QR payment.");
  return db.$transaction(async (tx) => {
    const updated = await tx.payment.update({ where: { id: existing.id }, data: { status: "SUCCEEDED", method: providerPayment.method === "upi" ? "UPI QR" : "Razorpay QR" } });
    await tx.booking.update({ where: { id: existing.bookingId }, data: { status: "CONFIRMED" } });
    await tx.paymentReceipt.upsert({ where: { paymentId: existing.id }, update: {}, create: { paymentId: existing.id, receiptNumber: newReference("RCP"), payload: { orderId, qrCodeId, paymentId, amount: existing.amount, currency: existing.currency, destination: existing.booking.trip.destination?.name ?? existing.booking.trip.title } } });
    return updated;
  });
}
