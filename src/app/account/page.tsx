"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RouteShell } from "@/components/RouteShell";

type AccountData = { user: { name: string; email: string; createdAt: string; trips: Array<{ id: string; title: string; status: string; destination?: { name: string; slug: string } | null; bookings: Array<{ reference: string; payment?: { status: string; amount: number; currency: string; method: string; createdAt: string; receipt?: { receiptNumber: string; createdAt: string } | null } | null }> }>; savedDestinations: Array<{ destination: { name: string; slug: string } }> } };
export default function AccountPage() {
  const [data, setData] = useState<AccountData | null>(null);
  const [error, setError] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  useEffect(() => { fetch("/api/account", { cache: "no-store" }).then(async (res) => { const body = await res.json(); if (!res.ok) throw new Error(body.error ?? "Unable to load account."); setData(body); }).catch((e) => setError(e.message)); }, []);
  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); window.location.assign("/login"); };
  const updateProfile = async (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); const response = await fetch("/api/account", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name") }) }); const result = await response.json(); if (!response.ok) { setProfileMessage(result.error ?? "Unable to update profile."); return; } setData((current) => current ? { ...current, user: { ...current.user, name: result.user.name } } : current); setProfileMessage("Profile updated."); };
  return <RouteShell eyebrow="✦ PRIVATE ACCOUNT ✦" title={<>My <em>Account.</em></>} intro="Your profile, saved destinations, trip history and verified receipts." >
    {!data ? <div className="empty-state" role="status">{error ? <><p>{error}</p><Link className="button button-dark" href="/login">Sign in</Link></> : <p>Loading account…</p>}</div> : <div className="dashboard-grid">
      <section className="dashboard-card"><span className="eyebrow">PROFILE</span><form onSubmit={updateProfile}><label><span>NAME</span><input name="name" required minLength={2} maxLength={120} defaultValue={data.user.name} /></label><p>{data.user.email}</p><p>Member since {new Date(data.user.createdAt).toLocaleDateString()}</p><button className="outline-button" type="submit">Save profile</button>{profileMessage && <p role="status">{profileMessage}</p>}</form><button className="outline-button" onClick={logout}>Sign out</button></section>
      <section className="dashboard-card"><span className="eyebrow">SAVED DESTINATIONS ({data.user.savedDestinations.length})</span>{data.user.savedDestinations.length ? data.user.savedDestinations.map(({ destination }) => <p key={destination.slug}><Link href={`/destination/${destination.slug}`}>{destination.name}</Link></p>) : <p>No account-synced saves yet. <Link href="/explore">Explore destinations</Link>.</p>}</section>
      <section className="dashboard-card upcoming"><span className="eyebrow">TRIPS, PAYMENTS & RECEIPTS</span>{data.user.trips.length ? data.user.trips.map((trip) => <div key={trip.id} className="dash-row"><span>{trip.destination ? <Link href={`/destination/${trip.destination.slug}`}>{trip.destination.name}</Link> : trip.title} · {trip.status}</span>{trip.bookings.map((booking) => <small key={booking.reference}>{booking.reference}{booking.payment ? ` · ${booking.payment.status} · ${booking.payment.currency} ${booking.payment.amount.toLocaleString("en-IN")} · ${booking.payment.method} · ${new Date(booking.payment.createdAt).toLocaleString("en-IN")}` : " · Awaiting payment"}{booking.payment?.receipt ? <Link href={`/receipt/${booking.payment.receipt.receiptNumber}`}> · Receipt {booking.payment.receipt.receiptNumber}</Link> : null}</small>)}</div>) : <p>No trips saved to your account yet.</p>}<Link className="button button-dark" href="/planner">Plan a trip</Link></section>
    </div>}
  </RouteShell>;
}
