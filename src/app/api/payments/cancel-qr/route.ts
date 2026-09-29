import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const orderId = typeof body.orderId === "string" ? body.orderId : "";
  const qrCodeId = typeof body.qrCodeId === "string" ? body.qrCodeId : "";
  const payment = await db.payment.findUnique({ where: { transactionId: orderId }, include: { booking: true } });
  if (!payment || payment.booking.userId !== session.userId || payment.status !== "PENDING" || payment.method !== `Razorpay UPI QR|${qrCodeId}`) return NextResponse.json({ error: "Active QR payment not found." }, { status: 404 });
  const keyId = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) return NextResponse.json({ error: "Razorpay is not configured." }, { status: 503 });
  try {
    const response = await fetch(`https://api.razorpay.com/v1/payments/qr_codes/${encodeURIComponent(qrCodeId)}/close`, { method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}`, "Content-Type": "application/json" }, body: "{}", cache: "no-store" });
    if (!response.ok) return NextResponse.json({ error: "Provider could not cancel the QR yet; its payment status remains pending." }, { status: 502 });
    await db.payment.updateMany({ where: { id: payment.id, status: "PENDING" }, data: { status: "FAILED", method: "Razorpay UPI QR (cancelled)" } });
    return NextResponse.json({ status: "CANCELLED" });
  } catch { return NextResponse.json({ error: "Could not confirm QR cancellation with provider." }, { status: 502 }); }
}
