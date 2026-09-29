import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations } from "@/lib/data";
import { DestinationView } from "@/components/RouteShell";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const place = destinations.find((item) => item.slug === slug);
  if (!place) return { title: "Destination not found | TRAVEXA", robots: { index: false, follow: false } };
  return { title: `${place.name} Travel Guide | TRAVEXA`, description: place.description, alternates: { canonical: `/destination/${place.slug}` }, openGraph: { title: `${place.name} Travel Guide | TRAVEXA`, description: place.description, images: [place.image], type: "article" } };
}
export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!destinations.some((item) => item.slug === slug)) notFound(); return <DestinationView slug={slug} />; }
