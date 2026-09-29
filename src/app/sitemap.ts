import type { MetadataRoute } from "next";
import { destinations } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL ?? "http://localhost:3000";
  const publicRoutes = ["", "/explore", "/india", "/india/12-jyotirlingas", "/world", "/world/7-wonders", "/world/heritage", "/about", "/how-it-works", "/faq", "/contact", "/privacy"];
  return [
    ...publicRoutes.map((path) => ({ url: new URL(path || "/", base).toString(), lastModified: new Date(), changeFrequency: "weekly" as const })),
    ...destinations.map((destination) => ({ url: new URL(`/destination/${destination.slug}`, base).toString(), lastModified: new Date(), changeFrequency: "monthly" as const })),
  ];
}
