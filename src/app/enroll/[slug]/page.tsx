import { notFound } from "next/navigation";
import { destinations } from "@/lib/data";
import { EnrollmentView } from "@/components/CommerceViews";
export default async function EnrollmentPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!destinations.some((item) => item.slug === slug)) notFound(); return <EnrollmentView slug={slug} />; }
