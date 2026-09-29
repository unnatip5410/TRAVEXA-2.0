import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { safeJsonBody } from "@/lib/validation";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const saved = await db.savedDestination.findMany({ where: { userId: session.userId }, include: { destination: { select: { slug: true, name: true } } }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ saved }, { headers: { "Cache-Control": "private, no-store" } });
}
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  try {
    const body = await safeJsonBody(request);
    if (typeof body.slug !== "string" || !body.slug) return NextResponse.json({ error: "Destination is required." }, { status: 400 });
    const destination = await db.destination.findUnique({ where: { slug: body.slug }, select: { id: true } });
    if (!destination) return NextResponse.json({ error: "Destination not found." }, { status: 404 });
    const row = await db.savedDestination.upsert({ where: { userId_destinationId: { userId: session.userId, destinationId: destination.id } }, create: { userId: session.userId, destinationId: destination.id }, update: {} });
    return NextResponse.json({ saved: row }, { status: 201 });
  } catch { return NextResponse.json({ error: "Unable to save destination." }, { status: 400 }); }
}
export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Destination is required." }, { status: 400 });
  await db.savedDestination.deleteMany({ where: { userId: session.userId, destination: { slug } } });
  return NextResponse.json({ ok: true });
}
