import { ExploreView } from "@/components/RouteShell";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; region?: "all" | "india" | "world" }>;
}) {
  const params = await searchParams;
  return <ExploreView region={params?.region ?? "all"} initialCategory={params?.category} />;
}
