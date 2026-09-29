import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSessionToken } from "@/lib/session-token";

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();
  const session = readSessionToken(request.cookies.get("travexa-session")?.value);
  if (session?.role === "ADMIN") return NextResponse.next();
  const login = new URL("/login", request.url);
  login.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(login);
}

export const config = { matcher: ["/admin/:path*"] };
