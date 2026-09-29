import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { safeJsonBody } from "@/lib/validation";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true, name: true, email: true, role: true, locale: true, currency: true, createdAt: true,
      trips: {
        orderBy: { createdAt: "desc" },
        include: {
          destination: { select: { name: true, slug: true } },
          bookings: { select: { reference: true, status: true, payment: { select: { status: true, amount: true, currency: true, method: true, createdAt: true, receipt: { select: { receiptNumber: true, createdAt: true } } } } } },
        },
      },
      savedDestinations: { include: { destination: { select: { name: true, slug: true } } } },
    },
  });
  if (!user) return NextResponse.json({ error: "Account not found." }, { status: 404 });
  return NextResponse.json({ user }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  try {
    const body = await safeJsonBody(request);
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    if (name.length < 2) return NextResponse.json({ error: "Name must contain at least two characters." }, { status: 400 });
    const user = await db.user.update({ where: { id: session.userId }, data: { name }, select: { id: true, name: true, email: true } });
    return NextResponse.json({ user }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return NextResponse.json({ error: "Unable to update your profile." }, { status: 400 }); }
}
