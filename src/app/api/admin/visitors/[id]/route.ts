import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getAdminSession()) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const status = body.status;
  if (!['NEW', 'CONTACTED', 'CLOSED'].includes(status)) return NextResponse.json({ error: "Invalid visitor status." }, { status: 400 });
  const visitor = await db.visitor.update({ where: { id }, data: { status }, select: { id: true, status: true } }).catch(() => null);
  return visitor ? NextResponse.json({ visitor }) : NextResponse.json({ error: "Visitor record not found." }, { status: 404 });
}
