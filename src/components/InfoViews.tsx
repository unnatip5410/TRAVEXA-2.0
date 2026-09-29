"use client";

import { Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { RouteShell } from "@/components/RouteShell";

const content = { about: { eyebrow: "THE TRAVEXA POINT OF VIEW", title: <>Travel with <em>intention.</em></>, intro: "TRAVEXA brings discovery, planning, and practical travel tools into one calm place." }, how: { eyebrow: "A BETTER WAY TO GO", title: <>From feeling to <em>itinerary.</em></>, intro: "Start with a destination, a season, or simply the kind of day you want to have." }, contact: { eyebrow: "WE ARE LISTENING", title: <>Say <em>hello.</em></>, intro: "Questions, ideas, partnerships, or a story from the road. Send us a note." }, faq: { eyebrow: "THE USEFUL DETAILS", title: <>A few things people <em>ask.</em></>, intro: "Clear answers about demos, data, AI planning, and your travel workspace." } } as const;
export function InfoView({ kind }: { kind: keyof typeof content }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const page = content[kind];
  const submitVisitor = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(""); setSaving(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/visitors", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to send your message.");
      setSent(true); event.currentTarget.reset();
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to send your message."); }
    finally { setSaving(false); }
  };
  return <RouteShell eyebrow={page.eyebrow} title={page.title} intro={page.intro}><div className="info-layout">{kind === "contact" ? <form className="contact-form tool-card" onSubmit={submitVisitor}>
    <label><span>YOUR NAME</span><input required name="name" minLength={2} maxLength={120} autoComplete="name" placeholder="Your name" /></label>
    <label><span>EMAIL</span><input required name="email" type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" /></label>
    <label><span>PHONE (OPTIONAL)</span><input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="Phone number" /></label>
    <label><span>DESTINATION (OPTIONAL)</span><input name="destination" maxLength={120} placeholder="Where are you planning to go?" /></label>
    <label><span>MESSAGE</span><textarea required name="message" minLength={5} maxLength={2000} placeholder="How can we help?"></textarea></label>
    <label><input required type="checkbox" name="consent" value="true" /> I agree that TRAVEXA may use these details to respond to my enquiry. See our <a href="/privacy">privacy notice</a>.</label>
    <button className="button button-dark" type="submit" disabled={saving}><Mail size={16} /> {saving ? "Sending…" : "Send enquiry"}</button>
    {error && <p role="alert">{error}</p>}{sent && <p role="status">Thanks. Your enquiry has been received.</p>}
  </form> : <div className="info-copy tool-card">{kind === "about" && <><h2>A travel platform with a <em>human pace.</em></h2><p>We believe the best tools make room for attention. TRAVEXA combines destination context, AI-assisted planning, budget clarity, packing help, and accessible design so the journey feels good before it begins.</p><div className="info-points"><span><ShieldCheck size={17} /> Demo data is labelled clearly</span><span><MessageCircle size={17} /> AI fallback works without an API key</span></div></>}{kind === "how" && <><h2>Four small steps to a better trip.</h2>{["Find a feeling or destination", "Shape it with your pace and budget", "Edit the itinerary until it feels like yours", "Save, share, pack, and go"].map((step, index) => <div className="how-step" key={step}><strong>0{index + 1}</strong><span>{step}</span></div>)}</>}{kind === "faq" && <><h2>Good questions deserve useful answers.</h2>{["Is the booking data live?", "No. Flights and hotels are clearly marked demo results until a provider is connected.", "Does the AI need an API key?", "No. The local fallback uses the destination catalog and remains available.", "Can I use the site with a keyboard?", "Yes. The interface includes semantic forms, focusable controls, skip navigation, and accessibility settings."].map((item, index) => index % 2 === 0 ? <details key={item}><summary>{item}</summary><p>{["No. Flights and hotels are clearly marked demo results until a provider is connected.", "No. The local fallback uses the destination catalog and remains available.", "Yes. The interface includes semantic forms, focusable controls, skip navigation, and accessibility settings."][index / 2]}</p></details> : null)}</>}</div>}</div></RouteShell>;
}
