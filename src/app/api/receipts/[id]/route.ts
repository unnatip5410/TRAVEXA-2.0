import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession, getAdminSession } from "@/lib/auth";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Sign in to view this receipt." }, { status: 401 });
  const { id } = await params;
  const record = await db.paymentReceipt.findUnique({
    where: { receiptNumber: id },
    include: { payment: { include: { booking: { include: { trip: { include: { destination: true } } } } } } },
  });
  const adminSession = session.role === "ADMIN" ? await getAdminSession() : null;
  if (!record || (record.payment.booking.userId !== session.userId && !adminSession)) return NextResponse.json({ error: "Receipt not found." }, { status: 404 });
  if (record.payment.status !== "SUCCEEDED") return NextResponse.json({ error: "Receipt is not available until payment is verified." }, { status: 409 });
  const payload = record.payload as Record<string, unknown>;
  const trip = record.payment.booking.trip;
  return NextResponse.json({ receipt: { receiptNumber: record.receiptNumber, bookingReference: record.payment.booking.reference, transactionId: typeof payload.paymentId === "string" ? payload.paymentId : record.payment.transactionId, status: record.payment.status, amount: record.payment.amount, currency: record.payment.currency, method: record.payment.method, destination: trip.destination?.name ?? trip.title, destinationSlug: trip.destination?.slug, tripId: trip.id, travelers: Array.isArray(trip.travelers) ? trip.travelers : [], travelDate: trip.travelDate, issuedAt: record.createdAt } }, { headers: { "Cache-Control": "private, no-store" } });
}
