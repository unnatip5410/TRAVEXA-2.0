import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env";

export type Session = { userId: string; role: "USER" | "ADMIN" | "EDITOR" };
const sign = (value: string) => createHmac("sha256", env.authSecret() || (process.env.NODE_ENV === "production" ? "" : "travexa-local-development-only-secret" )).update(value).digest("hex");
export function createSessionToken(session: Session) { const payload = Buffer.from(JSON.stringify({ ...session, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 })).toString("base64url"); return `${payload}.${sign(payload)}`; }
export function readSessionToken(token: string | undefined): Session | null { if (!token) return null; const [payload, signature] = token.split("."); if (!payload || !signature) return null; try { const expected = Buffer.from(sign(payload), "hex"); const actual = Buffer.from(signature, "hex"); if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null; const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()); if (!parsed || typeof parsed.userId !== "string" || !["USER", "ADMIN", "EDITOR"].includes(parsed.role) || !Number.isInteger(parsed.exp) || parsed.exp <= Math.floor(Date.now() / 1000)) return null; return { userId: parsed.userId, role: parsed.role } as Session; } catch { return null; } }
