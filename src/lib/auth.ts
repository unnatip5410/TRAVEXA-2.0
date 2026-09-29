import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import { createSessionToken, readSessionToken, type Session } from "@/lib/session-token";
export { createSessionToken, readSessionToken, type Session } from "@/lib/session-token";
export async function getSession() { const store = await cookies(); return readSessionToken(store.get("travexa-session")?.value); }
export async function setSession(session: Session) { const store = await cookies(); store.set("travexa-session", createSessionToken(session), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 }); }
export async function clearSession() { const store = await cookies(); store.delete("travexa-session"); }
export async function getAdminSession() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return null;
  const user = await db.user.findUnique({ where: { id: session.userId }, select: { role: true } });
  return user?.role === "ADMIN" ? session : null;
}
export const newReference = (prefix: string) => `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;
