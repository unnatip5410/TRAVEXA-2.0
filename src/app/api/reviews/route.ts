import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { safeJsonBody } from "@/lib/validation";
import { allowRequest } from "@/lib/rate-limit";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("destination") ?? "";
  const reviews = await db.review.findMany({ where: { approved: true, ...(slug ? { destination: { slug } } : {}) }, select: { id: true, rating: true, title: true, body: true, createdAt: true, destination: { select: { name: true, slug: true } } }, orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ reviews: reviews.map((review) => ({ ...review, author: "Verified traveller" })) }, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: Request) {
  if (!allowRequest(request, "review", 5, 60_000)) return NextResponse.json({ error: "Too many review submissions. Try again later." }, { status: 429 });
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Sign in to submit a review." }, { status: 401 });
  try {
    const body = await safeJsonBody(request);
    const slug = typeof body.destination === "string" ? body.destination : "";
    const title = typeof body.title === "string" ? body.title.trim().slice(0, 140) : "";
    const text = typeof body.body === "string" ? body.body.trim().slice(0, 4000) : "";
    const rating = Number(body.rating);
    if (!slug || !title || text.length < 5 || !Number.isInteger(rating) || rating < 1 || rating > 5) return NextResponse.json({ error: "Provide a title, review, and rating from 1 to 5." }, { status: 400 });
    const destination = await db.destination.findUnique({ where: { slug }, select: { id: true } });
    if (!destination) return NextResponse.json({ error: "Destination not found." }, { status: 404 });
    const review = await db.review.create({ data: { userId: session.userId, destinationId: destination.id, rating, title, body: text, approved: false } });
    return NextResponse.json({ review: { id: review.id, status: "pending-moderation" }, message: "Review submitted for moderation." }, { status: 201 });
  } catch { return NextResponse.json({ error: "Unable to submit review." }, { status: 400 }); }
}
