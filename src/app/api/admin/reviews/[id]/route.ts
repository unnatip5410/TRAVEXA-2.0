import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getAdminSession()) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  if (typeof body.approved !== "boolean") return NextResponse.json({ error: "Review approval must be true or false." }, { status: 400 });
  const review = await db.review.update({ where: { id }, data: { approved: body.approved }, select: { id: true, approved: true } }).catch(() => null);
  return review ? NextResponse.json({ review }) : NextResponse.json({ error: "Review not found." }, { status: 404 });
}
