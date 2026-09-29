import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { safeJsonBody } from "@/lib/validation";
import { allowRequest } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!allowRequest(request, "visitor-enquiry", 5, 60_000)) return NextResponse.json({ error: "Too many enquiries. Please wait a minute before trying again." }, { status: 429 });
  try {
    const body = await safeJsonBody(request);
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : "";
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || (body.consent !== true && body.consent !== "true")) {
      return NextResponse.json({ error: "Enter your name and a valid email, and agree to the privacy notice." }, { status: 400 });
    }
    const session = await getSession();
    const visitor = await db.visitor.create({ data: {
      name, email,
      phone: typeof body.phone === "string" ? body.phone.trim().slice(0, 40) || null : null,
      destination: typeof body.destination === "string" ? body.destination.trim().slice(0, 120) || null : null,
      message: typeof body.message === "string" ? body.message.trim().slice(0, 2000) || null : null,
      consent: true, userId: session?.userId,
    }, select: { id: true, status: true, createdAt: true } });
    return NextResponse.json({ visitor, message: "Thanks. Your enquiry has been received." }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save your enquiry right now." }, { status: 500 });
  }
}
