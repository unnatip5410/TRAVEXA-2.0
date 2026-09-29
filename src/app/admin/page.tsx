import { AdminView } from "@/components/ExtraViews";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function AdminPage() { const session = await getAdminSession(); if (!session) redirect("/login?next=/admin"); return <AdminView />; }
