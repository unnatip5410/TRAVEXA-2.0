import { notFound } from "next/navigation";
import { destinations } from "@/lib/data";
import { TripView } from "@/components/ExtraViews";

export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!destinations.some((item) => item.slug === slug)) notFound();
  return <TripView slug={slug} />;
}
