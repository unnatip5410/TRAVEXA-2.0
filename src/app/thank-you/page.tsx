"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { RouteShell } from "@/components/RouteShell";

type Receipt = { receiptNumber: string; status: string; destination: string; destinationSlug?: string; travelers: string[]; amount: number; currency: string };
function ThankYouContent() {
  const params = useSearchParams();
  const receiptId = params.get("receipt");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { if (receiptId) fetch(`/api/receipts/${encodeURIComponent(receiptId)}`, { cache: "no-store" }).then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.error ?? "This receipt could not be verified."); setReceipt(data.receipt); }).catch((e) => setError(e.message)); }, [receiptId]);
  if (!receipt) return <div className="empty-state" role={error || !receiptId ? "alert" : "status"}><p>{error || (!receiptId ? "No verified payment receipt was provided. Your trip may be saved without payment." : "Verifying payment and receipt…")}</p><Link className="button button-dark" href="/account">My account</Link></div>;
  return <div className="thank-you-layout"><div className="thank-you-hero-card"><div className="thank-you-badge"><CheckCircle2 size={32} /></div><span className="eyebrow">PAYMENT VERIFIED</span><h2>Your journey is <em>confirmed.</em></h2><p>We confirmed the payment with the provider and issued your receipt.</p><div className="thank-you-stats"><div><span>Destination</span><strong>{receipt.destination}</strong></div><div><span>Travellers</span><strong>{receipt.travelers.join(", ") || "Account holder"}</strong></div><div><span>Receipt</span><strong>{receipt.receiptNumber}</strong></div><div><span>Paid</span><strong>{receipt.currency} {receipt.amount.toLocaleString("en-IN")}</strong></div></div><div className="card-btn-row"><Link className="button button-dark" href={`/receipt/${receipt.receiptNumber}`}>View receipt <ArrowRight size={16} /></Link>{receipt.destinationSlug && <Link className="button button-coral" href={`/trip/${receipt.destinationSlug}`}>Open trip details</Link>}</div></div></div>;
}
export default function ThankYouPage() { return <RouteShell eyebrow="✦ JOURNEY DETAILS ✦" title={<>A verified <em>beginning.</em></>} intro="Your confirmation details are available after we verify the receipt."><Suspense fallback={<div className="empty-state">Loading confirmation…</div>}><ThankYouContent /></Suspense></RouteShell>; }
