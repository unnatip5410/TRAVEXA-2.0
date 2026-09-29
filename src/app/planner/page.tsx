import { PlannerView } from "@/components/RouteShell";
export default async function PlannerPage({ searchParams }: { searchParams: Promise<{ destination?: string; dates?: string; style?: string }> }) {
  const params = await searchParams;
  const dates = params.dates?.split(",") ?? [];
  return <PlannerView initialDestination={params.destination ?? ""} initialDate={dates[0] ?? ""} initialStyle={params.style ?? ""} />;
}
