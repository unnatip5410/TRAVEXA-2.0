import { NextResponse } from "next/server";
import { verifySignature, confirmRazorpayPayment, confirmRazorpayQrPayment } from "@/lib/payments";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  const raw = await request.text();
  if (!secret || !verifySignature(raw, signature, secret)) return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  try {
    const event = JSON.parse(raw);
    if (event.event === "payment.captured" || event.event === "order.paid") {
      const payment = event.payload?.payment?.entity;
      const orderId = payment?.order_id ?? event.payload?.order?.entity?.id;
      if (typeof orderId === "string" && typeof payment?.id === "string") await confirmRazorpayPayment(orderId, payment.id);
    } else if (event.event === "qr_code.credited") {
      const qrCodeId = event.payload?.qr_code?.entity?.id;
      const payment = event.payload?.payment?.entity;
      if (typeof qrCodeId === "string" && typeof payment?.id === "string") {
        const record = await db.payment.findFirst({ where: { method: `Razorpay UPI QR|${qrCodeId}` } });
        if (record) await confirmRazorpayQrPayment(record.transactionId, qrCodeId, payment.id);
      }
    } else if (event.event === "payment.failed") {
      const payment = event.payload?.payment?.entity;
      if (typeof payment?.order_id === "string") await db.payment.updateMany({ where: { transactionId: payment.order_id, status: "PENDING" }, data: { status: "FAILED" } });
    }
    return NextResponse.json({ received: true });
  } catch { return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 }); }
}
