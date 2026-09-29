import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
import { requiredString, safeJsonBody } from "@/lib/validation";
import { allowRequest } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!allowRequest(request, "register", 5, 60_000)) return NextResponse.json({ error: "Too many account attempts. Try again in a minute." }, { status: 429 });
  try {
    const body = await safeJsonBody(request);
    const email = requiredString(body.email, "Email").toLowerCase();
    const password = requiredString(body.password, "Password");
    const name = requiredString(body.name, "Name");
    if (password.length < 8 || !email.includes("@")) return NextResponse.json({ error: "Use a valid email and an 8-character password." }, { status: 400 });
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    const user = await db.user.create({ data: { email, name, passwordHash: await bcrypt.hash(password, 12) } });
    await setSession({ userId: user.id, role: user.role });
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } }, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to register." }, { status: 400 }); }
}
