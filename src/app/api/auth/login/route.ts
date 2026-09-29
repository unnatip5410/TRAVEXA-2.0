import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
import { requiredString, safeJsonBody } from "@/lib/validation";
import { allowRequest } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!allowRequest(request, "login", 10, 60_000)) return NextResponse.json({ error: "Too many sign-in attempts. Try again in a minute." }, { status: 429 });
  try {
    const body = await safeJsonBody(request);
    const email = requiredString(body.email, "Email").toLowerCase();
    const password = requiredString(body.password, "Password");
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
    await setSession({ userId: user.id, role: user.role });
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to sign in." }, { status: 400 }); }
}
