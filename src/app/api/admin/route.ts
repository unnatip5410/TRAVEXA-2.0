import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const query = new URL(request.url).searchParams.get("q")?.trim().slice(0, 120) ?? "";
  const [users, visitors, trips, bookings, bookingRecords, payments, paymentRecords, reviews, reviewRecords, destinations, popularDestinations, recentEvents] = await Promise.all([
    db.user.findMany({ where: query ? { OR: [{ name: { contains: query, mode: "insensitive" } }, { email: { contains: query, mode: "insensitive" } }] } : {}, select: { id: true, name: true, email: true, role: true, createdAt: true }, orderBy: { createdAt: "desc" }, take: 100 }),
    db.visitor.findMany({ where: query ? { OR: [{ name: { contains: query, mode: "insensitive" } }, { email: { contains: query, mode: "insensitive" } }, { destination: { contains: query, mode: "insensitive" } }] } : {}, select: { id: true, name: true, email: true, phone: true, destination: true, message: true, status: true, createdAt: true }, orderBy: { createdAt: "desc" }, take: 100 }),
    db.trip.count(), db.booking.count(),
    db.booking.findMany({ include: { user: { select: { name: true, email: true } }, trip: { include: { destination: { select: { name: true, slug: true } } } }, payment: { include: { receipt: { select: { receiptNumber: true } } } } }, orderBy: { createdAt: "desc" }, take: 100 }),
    db.payment.aggregate({ _sum: { amount: true }, _count: true, where: { status: "SUCCEEDED" } }),
    db.payment.findMany({ include: { booking: { include: { user: { select: { name: true, email: true } }, trip: { include: { destination: { select: { name: true, slug: true } } } } } }, receipt: { select: { receiptNumber: true } } }, orderBy: { createdAt: "desc" }, take: 100 }),
    db.review.count(),
    db.review.findMany({ include: { user: { select: { name: true, email: true } }, destination: { select: { name: true, slug: true } } }, orderBy: { createdAt: "desc" }, take: 100 }),
    db.destination.findMany({ select: { id: true, slug: true, name: true, rating: true, _count: { select: { trips: true, reviews: true, savedBy: true } } }, orderBy: { name: "asc" } }),
    db.trip.groupBy({ by: ["destinationId"], _count: { destinationId: true }, orderBy: { _count: { destinationId: "desc" } }, take: 8 }),
    db.analyticsEvent.findMany({ orderBy: { createdAt: "desc" }, take: 30, select: { id: true, name: true, path: true, createdAt: true } }),
  ]);
  return NextResponse.json({ users, visitors, bookingRecords, paymentRecords, reviewRecords, destinations, stats: { users: await db.user.count(), visitors: await db.visitor.count(), trips, bookings, successfulPayments: payments._count, paymentVolume: payments._sum.amount ?? 0, reviews }, popularDestinations, recentEvents }, { headers: { "Cache-Control": "private, no-store" } });
}
