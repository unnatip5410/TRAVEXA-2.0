import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession, newReference } from "@/lib/auth";
import { positiveInt, requiredString, safeJsonBody } from "@/lib/validation";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const trips = await db.trip.findMany({ where: { userId: session.userId }, include: { destination: true, days: true, bookings: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ trips });
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    const body = await safeJsonBody(request);
    const title = requiredString(body.title, "Trip title");
    const destinationSlug = typeof body.destination === "string" ? body.destination.trim() : "";
    const destination = destinationSlug ? await db.destination.findUnique({ where: { slug: destinationSlug }, select: { id: true } }) : null;
    if (destinationSlug && !destination) return NextResponse.json({ error: "Destination not found." }, { status: 404 });
    const travelerNames = Array.isArray(body.travelers) ? body.travelers.slice(0, 12).map((entry: unknown) => typeof entry === "string" ? entry.trim().slice(0, 120) : "").filter(Boolean) : [];
    const travellers = positiveInt(body.travellers ?? 1, "Travellers");
    if (travelerNames.length && travelerNames.length !== travellers) return NextResponse.json({ error: "Add a name for each traveller." }, { status: 400 });
    const travelDate = typeof body.travelDate === "string" ? new Date(body.travelDate) : null;
    if (travelDate && Number.isNaN(travelDate.getTime())) return NextResponse.json({ error: "Choose a valid travel date." }, { status: 400 });
    const trip = await db.trip.create({ data: { title, destinationId: destination?.id, travellers, userId: session.userId, style: typeof body.style === "string" ? body.style.slice(0, 160) : "Thoughtful", budget: typeof body.budget === "string" ? body.budget.slice(0, 80) : undefined, travelDate, travelers: travelerNames, preferences: typeof body.preferences === "object" && body.preferences !== null ? body.preferences : undefined, status: "DRAFT", bookings: { create: { reference: newReference("TRIP"), userId: session.userId } } }, include: { bookings: true } });
    return NextResponse.json({ trip }, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save trip." }, { status: 400 }); }
}
