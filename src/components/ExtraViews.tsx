"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Download,
  FileText,
  Hotel,
  Map,
  Mic,
  Plane,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  Heart,
  Star,
  MapPin,
  Sparkles,
  BarChart3,
  Users,
  DollarSign,
  Layers,
  Edit,
  Globe,
  SlidersHorizontal,
  X
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { RouteShell } from "@/components/RouteShell";
import { usePreferences } from "@/components/Preferences";
import { destinations, type Destination } from "@/lib/data";
import { useFavorites } from "@/lib/favorites";

function ToolCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`tool-card ${className}`}>{children}</div>;
}

export function BookingView({ kind }: { kind: "flights" | "hotels" }) {
  const [searched, setSearched] = useState(false);
  const isFlight = kind === "flights";

  return (
    <RouteShell
      eyebrow={isFlight ? "✦ TRANSIT & FLIGHTS ✦" : "✦ CURATED STAYS ✦"}
      title={isFlight ? <>The Journey Starts <em>Here.</em></> : <>A Good Stay Changes <em>Everything.</em></>}
      intro="Provider-backed flight and hotel inventory is not configured yet. The sample cards shown after search are illustrative only, not live prices or availability."
    >
      <form
        className="booking-form"
        onSubmit={(e) => {
          e.preventDefault();
          setSearched(true);
        }}
      >
        <div className="booking-icon">
          {isFlight ? <Plane size={22} /> : <Hotel size={22} />}
        </div>
        <div className="booking-fields">
          <label>
            <span>{isFlight ? "FROM" : "DESTINATION"}</span>
            <input required placeholder={isFlight ? "Mumbai (BOM)" : "Kerala / Goa / Kyoto"} />
          </label>
          <label>
            <span>{isFlight ? "TO" : "CHECK-IN"}</span>
            <input required placeholder={isFlight ? "Cochin (COK)" : "Select check-in date"} />
          </label>
          <label>
            <span>{isFlight ? "DEPARTURE" : "CHECK-OUT"}</span>
            <input required placeholder="Select date" />
          </label>
          <label>
            <span>{isFlight ? "TRAVELLERS" : "GUESTS & ROOMS"}</span>
            <select defaultValue="2">
              <option>2 travellers</option>
              <option>1 traveller</option>
              <option>3 travellers</option>
              <option>4+ travellers</option>
            </select>
          </label>
        </div>
        <button className="button button-coral" type="submit">
          <Search size={17} /> Search {isFlight ? "flights" : "stays"}
        </button>
      </form>

      {searched ? (
        <div className="result-list">
          <div className="result-note">
            <ShieldCheck size={16} /> Sample options only · not live inventory, prices, or reservations.
          </div>
          {(isFlight
            ? [
                { name: "Vistara · Direct (09:10 — 11:15)", stops: "Non-stop", duration: "2h 05m", price: "₹6,400" },
                { name: "IndiGo · Direct (14:35 — 16:50)", stops: "Non-stop", duration: "2h 15m", price: "₹5,800" },
                { name: "Air India · Direct (19:20 — 21:35)", stops: "Non-stop", duration: "2h 15m", price: "₹6,100" },
              ]
            : [
                { name: "Brunton Boatyard (Fort Kochi) · 4.9 ★", location: "Heritage Waterfront", desc: "Colonial maritime charm & private sunset dock", price: "₹14,500/night" },
                { name: "Evolve Back Orange County · 4.8 ★", location: "Plantation Sanctuary", desc: "Private pool cottages amidst spice groves", price: "₹19,000/night" },
                { name: "Marari Beach Eco Resort · 4.8 ★", location: "Secluded Shoreline", desc: "Thatched roof villas right by the Arabian sea", price: "₹12,200/night" },
              ]
          ).map((result) => (
            <div className="result-row" key={result.name}>
              <div>
                <strong>{result.name}</strong>
                <small>{("stops" in result ? result.stops : result.location)} · {("duration" in result ? result.duration : result.desc)}</small>
              </div>
              <b>
                {result.price} <ArrowRight size={16} />
              </b>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state booking-empty">
          <CalendarDays size={25} />
          <h3>Search when you&apos;re ready</h3>
          <p>Find flight routes and vetted boutique stays suited to your itinerary.</p>
        </div>
      )}
    </RouteShell>
  );
}

export function TripView({ slug = "kerala" }: { slug?: string }) {
  const destination = destinations.find((d) => d.slug === slug) ?? destinations[0];
  const [done, setDone] = useState<string[]>([]);
  const [downloaded, setDownloaded] = useState(false);

  const toggle = (item: string) => {
    setDone((current) =>
      current.includes(item) ? current.filter((v) => v !== item) : [...current, item]
    );
  };

  const download = (type: "txt" | "ics") => {
    const content =
      type === "ics"
        ? `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:TRAVEXA · ${destination.name} Itinerary\nDTSTART:20261012T090000\nDTEND:20261016T180000\nLOCATION:${destination.name}, ${destination.country}\nDESCRIPTION:${destination.description}\nEND:VEVENT\nEND:VCALENDAR`
        : `TRAVEXA · ${destination.name.toUpperCase()}\n${destination.tag}\n\nDuration: ${destination.duration}\nBest Time: ${destination.bestTime}\nBudget: ${destination.budget}\n\nOverview:\n${destination.description}\n\nTop Experiences:\n1. Historic & Cultural exploration\n2. Regional culinary tasting\n3. Scenic viewpoints and nature trails`;

    const blob = new Blob([content], {
      type: type === "ics" ? "text/calendar" : "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `travexa-${destination.slug}-itinerary.${type}`;
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <RouteShell
      eyebrow={`✦ YOUR TRAVEXA TRIP · ${destination.name.toUpperCase()} ✦`}
      title={<>{destination.name}, <em>in Full Colour.</em></>}
      intro={`${destination.duration} · 2 travellers · ${destination.travelStyles?.join(" & ") ?? "Slow travel"}`}
    >
      <div className="trip-toolbar">
        <div className="trip-tabs">
          <button className="active">Itinerary</button>
          <Link href="/budget">Budget</Link>
          <Link href="/packing">Packing</Link>
          <Link href="/map">Map</Link>
          <Link href="/reviews">Reviews</Link>
        </div>
        <div className="trip-actions">
          <button className="outline-button" onClick={() => download("ics")}>
            <CalendarDays size={16} /> Calendar (.ics)
          </button>
          <button className="button button-dark" onClick={() => download("txt")}>
            <Download size={16} /> Download (.txt)
          </button>
        </div>
      </div>

      {downloaded && (
        <div className="success-banner">
          <Check size={16} /> Your travel document has been downloaded.
        </div>
      )}

      <div className="trip-layout">
        <div className="itinerary-list">
          <div className="day-label">
            DAY 01 <span>Arrive & Settle into {destination.name}</span>
          </div>
          {[
            `Check-in at curated accommodation`,
            `Sunset walking tour around historic quarter`,
            `Welcome regional dinner at local family kitchen`,
          ].map((item) => (
            <label className={done.includes(item) ? "activity complete" : "activity"} key={item}>
              <input
                type="checkbox"
                checked={done.includes(item)}
                onChange={() => toggle(item)}
              />
              <span>
                <strong>{item}</strong>
                <small>{item.includes("dinner") ? "19:30 · Included in plan" : "Morning / Afternoon"}</small>
              </span>
              <Check size={16} />
            </label>
          ))}

          <div className="day-label">
            DAY 02 <span>Signature Nature & Cultural Immersion</span>
          </div>
          {[
            `Early morning scenic trail / boat cruise`,
            `Culinary market tour & artisanal workshop`,
            `Twilight panoramic viewpoint`,
          ].map((item) => (
            <label className={done.includes(item) ? "activity complete" : "activity"} key={item}>
              <input
                type="checkbox"
                checked={done.includes(item)}
                onChange={() => toggle(item)}
              />
              <span>
                <strong>{item}</strong>
                <small>09:00 · 3 hrs · Guided</small>
              </span>
              <Check size={16} />
            </label>
          ))}

          <div className="day-label">
            DAY 03 <span>Detours & Hidden Gems</span>
          </div>
          {[
            `Visit secluded village & sacred groves`,
            `Relaxed afternoon tea / coffee tasting`,
            `Leisure evening for unscripted discovery`,
          ].map((item) => (
            <label className={done.includes(item) ? "activity complete" : "activity"} key={item}>
              <input
                type="checkbox"
                checked={done.includes(item)}
                onChange={() => toggle(item)}
              />
              <span>
                <strong>{item}</strong>
                <small>Flexible pace</small>
              </span>
              <Check size={16} />
            </label>
          ))}
        </div>

        <aside className="trip-aside">
          <ToolCard>
            <span className="eyebrow">ESTIMATED TRIP COST</span>
            <h3>{destination.budget}</h3>
            <div className="budget-bar">
              <span style={{ width: "65%" }} />
            </div>
            <div className="dash-row">
              <span>Status</span>
              <strong>On Track</strong>
            </div>
            <Link href="/budget" className="text-link">
              Open budget manager <ArrowRight size={15} />
            </Link>
          </ToolCard>

          <ToolCard>
            <span className="eyebrow">MAP & NEARBY STOPS</span>
            <div className="mini-map">
              <Map size={26} />
              <span>{destination.topAttractions?.length ?? 4} Key Landmarks</span>
            </div>
            <Link href="/map" className="text-link">
              Open interactive map <ArrowRight size={15} />
            </Link>
          </ToolCard>

          <ToolCard>
            <span className="eyebrow">BOOK / ENROLL</span>
            <p>Ready to confirm this itinerary with verified transport and stays?</p>
            <Link href={`/enroll/${destination.slug}`} className="button button-coral full-width">
              Book Experience <ArrowRight size={15} />
            </Link>
          </ToolCard>
        </aside>
      </div>
    </RouteShell>
  );
}

export function BudgetView() {
  const [travellers, setTravellers] = useState(2);
  const [days, setDays] = useState(5);
  const [currency, setCurrency] = useState("INR");
  const [expenses, setExpenses] = useState([
    { name: "Accommodation", amount: 18000 },
    { name: "Food & Dining", amount: 8500 },
    { name: "Transportation & Cabs", amount: 6200 },
    { name: "Activities & Guide Fees", amount: 12000 },
    { name: "Shopping & Souvenirs", amount: 4500 },
    { name: "Contingency / Emergency", amount: 3000 },
  ]);

  const symbol =
    currency === "INR" ? "₹" : currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "د.إ";

  const total = expenses.reduce((sum, item) => sum + item.amount, 0) * (travellers / 2);

  const addExpense = () => {
    setExpenses([...expenses, { name: "New Travel Expense", amount: 2000 }]);
  };

  const updateAmount = (index: number, amount: number) => {
    setExpenses(
      expenses.map((item, i) => (i === index ? { ...item, amount: Math.max(0, amount) } : item))
    );
  };

  const updateName = (index: number, name: string) => {
    setExpenses(expenses.map((item, i) => (i === index ? { ...item, name } : item)));
  };

  return (
    <RouteShell
      eyebrow="✦ KEEP IT COMFORTABLE ✦"
      title={<>A Budget That Leaves Room for <em>Joy.</em></>}
      intro="Plan with a reliable estimate, customize allocations, and make smart trade-offs before booking."
    >
      <div className="budget-controls tool-card">
        <label>
          <span>TRAVELLERS</span>
          <select value={travellers} onChange={(e) => setTravellers(Number(e.target.value))}>
            <option value="1">1 traveller</option>
            <option value="2">2 travellers</option>
            <option value="3">3 travellers</option>
            <option value="4">4 travellers</option>
          </select>
        </label>
        <label>
          <span>DURATION</span>
          <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
            <option value="3">3 days</option>
            <option value="5">5 days</option>
            <option value="7">7 days</option>
            <option value="10">10 days</option>
            <option value="14">14 days</option>
          </select>
        </label>
        <label>
          <span>CURRENCY</span>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option>INR</option>
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>AED</option>
          </select>
        </label>
      </div>

      <div className="budget-summary">
        <ToolCard>
          <span className="eyebrow">ESTIMATED TOTAL</span>
          <h2>
            {symbol}{total.toLocaleString("en-IN")}
          </h2>
          <p>{travellers} travellers · {days} days</p>
        </ToolCard>
        <ToolCard>
          <span className="eyebrow">DAILY BUDGET</span>
          <h2>
            {symbol}{Math.round(total / days).toLocaleString("en-IN")}
          </h2>
          <p>Group daily average</p>
        </ToolCard>
        <ToolCard>
          <span className="eyebrow">PER PERSON</span>
          <h2>
            {symbol}{Math.round(total / travellers).toLocaleString("en-IN")}
          </h2>
          <p>Per traveller average</p>
        </ToolCard>
      </div>

      <div className="budget-table tool-card">
        <div className="budget-table-header">
          <strong>Category</strong>
          <span>Allocation & Breakdown</span>
          <strong>Amount ({symbol})</strong>
        </div>

        {expenses.map((item, index) => (
          <div className="budget-line" key={`${item.name}-${index}`}>
            <div>
              <input
                className="budget-name-input"
                value={item.name}
                onChange={(e) => updateName(index, e.target.value)}
              />
              <small>{Math.round((item.amount / Math.max(total, 1)) * 100)}% of total</small>
            </div>
            <div className="budget-track">
              <i style={{ width: `${Math.min(100, (item.amount / Math.max(total, 1)) * 100 * 2)}%` }} />
            </div>
            <div className="budget-input-cell">
              <input
                className="expense-input"
                type="number"
                value={item.amount}
                onChange={(e) => updateAmount(index, Number(e.target.value))}
              />
              <button
                className="delete-expense"
                onClick={() => setExpenses(expenses.filter((_, i) => i !== index))}
                aria-label={`Remove ${item.name}`}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}

        <div className="budget-table-actions">
          <button className="button button-dark" onClick={addExpense}>
            <Plus size={16} /> Add Custom Expense
          </button>
        </div>
      </div>
    </RouteShell>
  );
}

export function PackingView() {
  const [destination, setDestination] = useState("Kerala");
  const [days, setDays] = useState(5);
  const [season, setSeason] = useState("Monsoon");
  const [custom, setCustom] = useState("");
  const [saved, setSaved] = useState(false);
  const [checked, setChecked] = useState<string[]>([
    "Passport & ID",
    "Comfortable walking shoes",
    "Universal adapter",
  ]);

  const [items, setItems] = useState<Record<string, string[]>>({
    Documents: ["Passport & Govt ID", "Travel insurance policy", "Printed / offline tickets"],
    Clothing: [
      "Light breathable cottons",
      "Comfortable walking shoes",
      "Light rain shell / windbreaker",
      "Modest attire for temples/sacred sites",
    ],
    Electronics: ["Universal travel adapter", "20,000mAh Power bank", "Camera & spare memory cards"],
    Toiletries: ["Reef-safe sunscreen SPF 50", "Insect / mosquito repellent", "Hydrating lip balm"],
    Medical: ["Personal prescription medications", "Basic first-aid kit", "Rehydration salts (ORS)"],
    Accessories: ["Polarized sunglasses", "Reusable filtered water bottle", "Compact daypack"],
  });

  const allItems = Object.values(items).flat();
  const progress = allItems.length ? Math.round((checked.length / allItems.length) * 100) : 0;

  const toggleCheck = (item: string) => {
    setChecked((curr) => (curr.includes(item) ? curr.filter((v) => v !== item) : [...curr, item]));
  };

  const addItem = () => {
    if (!custom.trim()) return;
    setItems({
      ...items,
      Accessories: [...(items.Accessories ?? []), custom.trim()],
    });
    setCustom("");
  };

  return (
    <RouteShell
      eyebrow="✦ PACK LIGHT, LIVE FULLY ✦"
      title={<>The Smart <em>Packing Checklist.</em></>}
      intro="Dynamic checklist organized by climate, duration, cultural considerations, and essential documents."
    >
      <div className="packing-controls tool-card">
        <label>
          <span>DESTINATION</span>
          <input value={destination} onChange={(e) => setDestination(e.target.value)} />
        </label>
        <label>
          <span>DAYS</span>
          <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
            <option value="3">3 Days (Weekend)</option>
            <option value="5">5 Days (Standard)</option>
            <option value="7">7 Days (Full Week)</option>
            <option value="10">10 Days</option>
            <option value="14">14 Days</option>
          </select>
        </label>
        <label>
          <span>SEASON</span>
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
            <option>Winter</option>
            <option>Summer</option>
            <option>Monsoon</option>
            <option>Spring / Autumn</option>
          </select>
        </label>
      </div>

      <div className="packing-head">
        <div>
          <span className="eyebrow">
            {destination.toUpperCase()} · {days} DAYS · {season.toUpperCase()}
          </span>
          <p>
            <strong>{checked.length} of {allItems.length} items packed</strong> ({progress}%)
          </p>
        </div>
        <div className="packing-actions">
          <button className="outline-button" onClick={() => setChecked([])}>
            Reset All
          </button>
          <button className="button button-coral" onClick={() => setSaved(true)}>
            {saved ? "Checklist Saved ✓" : "Save Checklist"}
          </button>
        </div>
      </div>

      <div className="packing-progress">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="packing-grid">
        {Object.entries(items).map(([category, values]) => (
          <ToolCard key={category}>
            <h3>{category}</h3>
            {values.map((item) => (
              <label
                className={`pack-item ${checked.includes(item) ? "checked" : ""}`}
                key={item}
              >
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={() => toggleCheck(item)}
                />
                <span>{item}</span>
                <Check size={15} />
              </label>
            ))}
          </ToolCard>
        ))}
      </div>

      <div className="custom-item tool-card">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add custom packing item..."
        />
        <button className="button button-dark" onClick={addItem}>
          <Plus size={16} /> Add Item
        </button>
      </div>
    </RouteShell>
  );
}

export function ReviewsView() {
  const [reviews, setReviews] = useState<Array<{ id: string; author: string; title: string; body: string; rating: number; destination: { name: string; slug: string } }>>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [destinationSlug, setDestinationSlug] = useState("kerala");
  const [submitted, setSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => { fetch("/api/reviews", { cache: "no-store" }).then((response) => response.json()).then((data) => setReviews(data.reviews ?? [])).catch(() => setReviews([])); }, []);
  const averageRating = reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : "—";

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;
    setReviewError("");
    try { const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ destination: destinationSlug, title: newTitle, body: newBody, rating: newRating }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error ?? "Unable to submit review."); setSubmitted(true); setNewTitle(""); setNewBody(""); }
    catch (error) { setReviewError(error instanceof Error ? error.message : "Unable to submit review."); }
  };

  return (
    <RouteShell
      eyebrow="✦ TRAVELLERS TELL IT TRUE ✦"
      title={<>The Places We Keep <em>Talking About.</em></>}
      intro="Read honest reviews and ratings from our community. Share your own notes after your journey."
    >
      <div className="review-summary">
        <div>
          <strong>{averageRating}</strong>
          <span className="stars-gold">★★★★★</span>
          <small>{reviews.length} published reviews</small>
        </div>
        <div className="rating-bars">
          {[5, 4, 3].map((rating) => { const count = reviews.filter((review) => review.rating === rating).length; const percent = reviews.length ? Math.round(count / reviews.length * 100) : 0; return <span key={rating}>{rating} ★ <i style={{ width: `${percent}%` }} /> ({count})</span>; })}
        </div>
      </div>

      <form className="review-form tool-card" onSubmit={handleAddReview}>
        <div>
          <label><span>DESTINATION</span><select value={destinationSlug} onChange={(e) => setDestinationSlug(e.target.value)}>{destinations.map((destination) => <option key={destination.slug} value={destination.slug}>{destination.name}</option>)}</select></label>
          <label>
            <span>YOUR RATING</span>
            <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
              <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
              <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
              <option value={3}>★★★☆☆ (3 Stars - Average)</option>
            </select>
          </label>
          <label>
            <span>REVIEW TITLE</span>
            <input
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What stayed with you?"
            />
          </label>
        </div>
        <label>
          <span>YOUR EXPERIENCE</span>
          <textarea
            required
            rows={4}
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            placeholder="Share honest insights, favorite food spots, or transit tips..."
          />
        </label>
        <button className="button button-dark" type="submit">
          Share Your Note <ArrowRight size={16} />
        </button>
      </form>

      {submitted && (
        <div className="success-banner">
          <Check size={16} /> Thank you! Your review was submitted for moderation.
        </div>
      )}
      {reviewError && <p role="alert">{reviewError}</p>}

      <div className="review-list">
        {reviews.map((rev) => (
          <ToolCard key={rev.id}>
            <div className="review-top">
              <span className="stars-gold">{"★".repeat(rev.rating)}</span>
              <small>{rev.author} · {rev.destination.name}</small>
            </div>
            <h3>{rev.title}</h3>
            <p>{rev.body}</p>
            <Link href={`/destination/${rev.destination.slug}`}>View destination</Link>
          </ToolCard>
        ))}
      </div>
    </RouteShell>
  );
}

export function SavedView() {
  const { favorites, toggleFavorite } = useFavorites();
  const savedDestinations = destinations.filter((d) => favorites.includes(d.slug));

  return (
    <RouteShell
      eyebrow="✦ KEEP THE GOOD IDEAS CLOSE ✦"
      title={<>Your Saved <em>Destinations.</em></>}
      intro="Places, itineraries, and inspirations saved to your personal travel workspace."
    >
      <div className="saved-page">
        {savedDestinations.map((item) => (
          <div key={item.slug} className="saved-destination-row tool-card">
            <div className="saved-row-photo" style={{ backgroundImage: `url(${item.image})` }} />
            <div className="saved-row-info">
              <span className="eyebrow"><MapPin size={12} /> {item.region} · {item.country}</span>
              <h3>{item.name}</h3>
              <p>{item.tag}</p>
              <div className="saved-row-meta">
                <span>★ {item.rating}</span>
                <span>{item.duration}</span>
                <span>From {item.budget}</span>
              </div>
            </div>
            <div className="saved-row-actions">
              <Link className="button button-dark small" href={`/destination/${item.slug}`}>
                View Details <ArrowRight size={14} />
              </Link>
              <button
                className="icon-button delete-btn"
                aria-label={`Remove ${item.name}`}
                title="Remove from saved"
                onClick={() => toggleFavorite(item.slug)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {savedDestinations.length === 0 && (
          <div className="empty-state">
            <Heart size={32} className="empty-heart-icon" />
            <h3>Your saved list is quiet</h3>
            <p>Tap the heart icon on any destination card to curate your wishlist.</p>
            <Link className="button button-dark" href="/explore">
              Explore Destinations <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </RouteShell>
  );
}

export function MapView() {
  const [selectedSlug, setSelectedSlug] = useState("kerala");
  const [travelMode, setTravelMode] = useState<"driving" | "walking" | "transit" | "bicycling">("driving");
  const selected = destinations.find((d) => d.slug === selectedSlug) ?? destinations[0];
  const [lat, lon] = selected.coordinates ?? [];
  const mapUrl = typeof lat === "number" && typeof lon === "number" ? `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.12}%2C${lat - 0.08}%2C${lon + 0.12}%2C${lat + 0.08}&layer=mapnik&marker=${lat}%2C${lon}` : null;

  return (
    <RouteShell
      eyebrow="✦ SEE THE SHAPE OF THE JOURNEY ✦"
      title={<>Every Stop, <em>in Context.</em></>}
      intro="Explore destination locations on OpenStreetMap and open live directions through your preferred mapping service."
    >
      <div className="map-layout">
        <div className="map-canvas">
          <div className="map-art-container" aria-label={`Map of ${selected.name}`}>
            {mapUrl ? <iframe title={`OpenStreetMap location of ${selected.name}`} src={mapUrl} loading="lazy" referrerPolicy="no-referrer" /> : <div className="empty-state">Map coordinates are not available for this place.</div>}
          </div>

          <div className="map-popup">
            <img src={selected.image} alt={selected.name} />
            <div className="map-popup-copy">
              <strong>{selected.name}</strong>
              <small><MapPin size={12} /> {selected.region} · {selected.country}</small>
              <p>{selected.description}</p>
              <div className="map-popup-actions">
                <Link href={`/destination/${selected.slug}`} className="button button-dark small">
                  View Details <ArrowRight size={13} />
                </Link>
                {typeof lat === "number" && typeof lon === "number" && <a className="button button-coral small" href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=${travelMode}`} target="_blank" rel="noreferrer">Open directions</a>}
              </div>
            </div>
          </div>
        </div>

        <div className="map-stops">
          <span className="eyebrow">CURATED STOPS & REGIONS</span>
          <label className="travel-mode-select"><span>Directions mode</span><select value={travelMode} onChange={(event) => setTravelMode(event.target.value as typeof travelMode)}><option value="driving">Driving</option><option value="transit">Transit</option><option value="walking">Walking</option><option value="bicycling">Cycling</option></select></label>
          <div className="stops-scroll">
            {destinations.map((dest, idx) => (
              <button
                key={dest.slug}
                className={`map-stop ${selected.slug === dest.slug ? "active" : ""}`}
                onClick={() => setSelectedSlug(dest.slug)}
              >
                <span className="stop-idx">{idx + 1}</span>
                <div>
                  <strong>{dest.name}</strong>
                  <small>{dest.region} · {dest.bestTime}</small>
                </div>
                <b>★ {dest.rating}</b>
              </button>
            ))}
          </div>
        </div>
      </div>
    </RouteShell>
  );
}

export function AccessibilityView() {
  return (
    <RouteShell
      eyebrow="✦ DESIGNED FOR ALL TRAVELLERS ✦"
      title={<>Travel Should Meet <em>You.</em></>}
      intro="Customize your reading, motion, and contrast preferences. Settings persist across your sessions."
    >
      <AccessibilityPanel />
    </RouteShell>
  );
}

export function AccessibilityPanel() {
  const {
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
  } = usePreferences();

  return (
    <div className="access-panel tool-card">
      <div className="access-row">
        <div>
          <h3>Text Size</h3>
          <p>Scale typography for easier reading.</p>
        </div>
        <div className="segmented">
          {(["normal", "large", "xl"] as const).map((size) => (
            <button
              type="button"
              className={textSize === size ? "active" : ""}
              onClick={() => setTextSize(size)}
              key={size}
            >
              {size === "xl" ? "Extra Large" : size[0].toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="access-row">
        <div>
          <h3>High Contrast</h3>
          <p>Boost contrast between text and surface elements.</p>
        </div>
        <button
          type="button"
          className={`toggle ${highContrast ? "on" : ""}`}
          onClick={() => setHighContrast(!highContrast)}
          aria-label="Toggle high contrast"
          aria-pressed={highContrast}
        >
          <span />
        </button>
      </div>

      <div className="access-row">
        <div>
          <h3>Reduced Motion</h3>
          <p>Minimize background motion and transitions.</p>
        </div>
        <button
          type="button"
          className={`toggle ${reducedMotion ? "on" : ""}`}
          onClick={() => setReducedMotion(!reducedMotion)}
          aria-label="Toggle reduced motion"
          aria-pressed={reducedMotion}
        >
          <span />
        </button>
      </div>
    </div>
  );
}

export function AdminView() {
  const { t } = usePreferences();
  const [activeTab, setActiveTab] = useState<"analytics" | "users" | "destinations" | "visitors" | "bookings" | "payments" | "reviews" | "translations">("analytics");
  const [adminData, setAdminData] = useState<{ users: Array<{ id: string; name: string; email: string; role: string }>; visitors: Array<{ id: string; name: string; email: string; phone: string | null; destination: string | null; message: string | null; status: string; createdAt: string }>; bookingRecords: Array<{ id: string; reference: string; status: string; user: { name: string; email: string }; trip: { title: string; travellers: number; destination: { name: string } | null }; payment: { status: string; amount: number; currency: string; receipt: { receiptNumber: string } | null } | null }>; paymentRecords: Array<{ id: string; transactionId: string; status: string; method: string; amount: number; currency: string; receipt: { receiptNumber: string } | null; booking: { reference: string; user: { name: string; email: string }; trip: { destination: { name: string } | null } } }>; reviewRecords: Array<{ id: string; approved: boolean; rating: number; title: string; body: string; createdAt: string; user: { name: string; email: string }; destination: { name: string; slug: string } }>; destinations: Array<{ id: string; slug: string; name: string; rating: number; _count: { trips: number; reviews: number; savedBy: number } }>; popularDestinations: Array<{ destinationId: string | null; _count: { destinationId: number } }>; recentEvents: Array<{ id: string; name: string; path: string | null; createdAt: string }>; stats: { users: number; visitors: number; trips: number; bookings: number; successfulPayments: number; paymentVolume: number; reviews: number } } | null>(null);
  const [adminSearch, setAdminSearch] = useState("");
  useEffect(() => { fetch("/api/admin", { cache: "no-store" }).then(async (res) => { if (!res.ok) throw new Error("Unable to load protected admin data."); return res.json(); }).then(setAdminData).catch(() => setAdminData(null)); }, []);
  const [destList, setDestList] = useState<Destination[]>(destinations);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Destination State
  const [newName, setNewName] = useState("");
  const [newCountry, setNewCountry] = useState("India");
  const [newRegion, setNewRegion] = useState("South India");
  const [newTag, setNewTag] = useState("");
  const [newBudget, setNewBudget] = useState("₹25,000");
  const [newDuration, setNewDuration] = useState("5–7 days");
  const [newBestTime, setNewBestTime] = useState("Oct – Mar");
  const [newChar, setNewChar] = useState("Nature");

  const handleAddDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const created: Destination = {
      slug,
      name: newName.trim(),
      country: newCountry,
      region: newRegion,
      tag: newTag.trim() || "Curated experience",
      description: `${newName} offers scenic trails, local heritage, and memorable cultural rhythms.`,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
      rating: "4.8",
      duration: newDuration,
      budget: newBudget,
      bestTime: newBestTime,
      seasons: ["Winter", "Summer"],
      color: "#dcefe6",
      characteristics: [newChar as Destination["characteristics"][number], "Slow Travel"],
      tags: [newChar, "Scenic"],
      travelStyles: ["Slow travel", "Culture"],
      knownFor: ["Historic landmark", "Scenic viewpoint", "Local dining"],
    };
    setDestList([created, ...destList]);
    setShowAddModal(false);
    setNewName("");
    setNewTag("");
  };

  const handleDeleteDest = (slug: string) => {
    if (confirm("Are you sure you want to delete this destination?")) {
      setDestList(destList.filter((d) => d.slug !== slug));
    }
  };

  return (
    <RouteShell
      eyebrow="✦ SECURE ADMIN PLATFORM ✦"
      title={<>TRAVEXA <em>Control Center.</em></>}
      intro="Authorized administrative workspace for managing catalog data, user accounts, trip enrollments, UPI transactions, and real-time travel intelligence."
    >
      <div className="admin-nav-tabs">
        <button
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          <BarChart3 size={16} /> Analytics & Intelligence
        </button>
        <button
          className={activeTab === "destinations" ? "active" : ""}
          onClick={() => setActiveTab("destinations")}
        >
          <Layers size={16} /> Destinations ({destList.length})
        </button>
        <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}><Users size={16} /> Users ({adminData?.stats.users ?? "…"})</button>
        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          <Users size={16} /> Bookings & Trips
        </button>
        <button className={activeTab === "visitors" ? "active" : ""} onClick={() => setActiveTab("visitors")}><Users size={16} /> Visitors ({adminData?.stats.visitors ?? "…"})</button>
        <button
          className={activeTab === "payments" ? "active" : ""}
          onClick={() => setActiveTab("payments")}
        >
          <DollarSign size={16} /> Payments & Receipts
        </button>
        <button className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}><Star size={16} /> Reviews ({adminData?.stats.reviews ?? "…"})</button>
        <button
          className={activeTab === "translations" ? "active" : ""}
          onClick={() => setActiveTab("translations")}
        >
          <Globe size={16} /> Translations (3 Langs)
        </button>
      </div>

      {activeTab === "analytics" && (
        <>
          {!adminData && <div className="empty-state" role="status">Loading live admin metrics…</div>}
          <div className="admin-stats">
            <ToolCard>
              <span className="eyebrow">TOTAL USERS</span>
              <strong>{adminData?.stats.users ?? "—"}</strong>
              <small>Registered accounts</small>
            </ToolCard>
            <ToolCard>
              <span className="eyebrow">ACTIVE DESTINATIONS</span>
              <strong>{destList.length}</strong>
              <small>Across 14 categories & 22 regions</small>
            </ToolCard>
            <ToolCard>
              <span className="eyebrow">TOTAL ENROLLMENTS</span>
              <strong>{adminData?.stats.bookings ?? "—"}</strong>
              <small>Recorded bookings</small>
            </ToolCard>
            <ToolCard>
              <span className="eyebrow">AI ITINERARIES CRAFTED</span>
          <strong>{adminData?.stats.visitors ?? "—"}</strong>
              <small>Visitor enquiries</small>
            </ToolCard>
          </div>

          <div className="admin-analytics-charts tool-card">
            <div className="admin-table-head">
              <strong>Popular destinations by saved trips</strong>
            </div>
            <div className="analytics-bars-grid">
              {adminData?.popularDestinations.map((entry, index) => { const dest = adminData.destinations.find((d) => d.id === entry.destinationId); const max = Math.max(1, adminData.popularDestinations[0]?._count.destinationId ?? 1); const count = entry._count.destinationId; return <div key={entry.destinationId ?? index}><span>{dest?.name ?? "Unknown destination"} ({count})</span><div className="bar-track"><i style={{ width: `${Math.round(count / max * 100)}%` }} /></div></div>; })}
            </div>
          </div>
        </>
      )}

      {activeTab === "destinations" && (
        <div className="admin-dest-management tool-card">
          <div className="admin-table-head">
            <strong>Destination Catalog Management</strong>
            <button className="button button-coral small" onClick={() => setShowAddModal(true)}>
              <Plus size={15} /> Add New Destination
            </button>
          </div>

          <div className="admin-dest-table">
            {destList.map((item) => (
              <div key={item.slug} className="admin-dest-row">
                <img src={item.image} alt={item.name} className="admin-dest-thumb" />
                <div className="admin-dest-details">
                  <strong>{item.name}</strong>
                  <small>{item.region} · {item.country} · ★ {item.rating}</small>
                  <div className="admin-dest-pills">
                    {item.characteristics?.slice(0, 3).map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                </div>
                <div className="admin-dest-pricing">
                  <b>{item.budget}</b>
                  <small>{item.duration}</small>
                </div>
                <div className="admin-dest-actions">
                  <Link href={`/destination/${item.slug}`} className="outline-button small">
                    View
                  </Link>
                  <button
                    className="icon-button delete-btn"
                    onClick={() => handleDeleteDest(item.slug)}
                    title="Delete destination"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="admin-table tool-card">
          <div className="admin-table-head">
            <strong>Recent Enrollments & Bookings</strong>
            <button className="outline-button small">Export CSV <Download size={14} /></button>
          </div>
          {adminData?.bookingRecords.map((item) => <div className="admin-row" key={item.id}><div><strong>{item.user.name} · {item.reference}</strong><small>{item.user.email} · {item.trip.destination?.name ?? item.trip.title} · {item.trip.travellers} traveller(s)</small></div><b>{item.payment ? `${item.payment.currency} ${item.payment.amount.toLocaleString()}` : "Unpaid"}</b><span>{item.payment?.status ?? item.status}</span></div>)}
          {!adminData?.bookingRecords.length && <p className="empty-state">No bookings recorded.</p>}
        </div>
      )}

      {activeTab === "visitors" && (
        <div className="admin-table tool-card">
          <div className="admin-table-head"><strong>Private visitor enquiries</strong><input aria-label="Search visitors" placeholder="Search name, email, destination" value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} /></div>
          {adminData?.visitors.filter((v) => `${v.name} ${v.email} ${v.destination ?? ""}`.toLowerCase().includes(adminSearch.toLowerCase())).map((visitor) => <div className="admin-row" key={visitor.id}><div><strong>{visitor.name}</strong><small>{visitor.email}{visitor.phone ? ` · ${visitor.phone}` : ""} · {new Date(visitor.createdAt).toLocaleDateString()}</small><small>{visitor.destination ?? "General enquiry"}{visitor.message ? ` · ${visitor.message}` : ""}</small></div><select aria-label={`Status for ${visitor.name}`} value={visitor.status} onChange={async (e) => { const status = e.target.value; const response = await fetch(`/api/admin/visitors/${visitor.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }); if (response.ok) setAdminData((current) => current ? { ...current, visitors: current.visitors.map((v) => v.id === visitor.id ? { ...v, status } : v) } : current); }}><option>NEW</option><option>CONTACTED</option><option>CLOSED</option></select></div>)}
          {!adminData?.visitors.length && <p className="empty-state">{adminData ? "No visitor enquiries recorded." : "Could not load visitor records. Confirm administrator access and database availability."}</p>}
        </div>
      )}

      {activeTab === "users" && <div className="admin-table tool-card"><div className="admin-table-head"><strong>Registered accounts</strong></div>{adminData?.users.map((user) => <div className="admin-row" key={user.id}><div><strong>{user.name}</strong><small>{user.email}</small></div><span>{user.role}</span></div>)}{!adminData?.users.length && <p className="empty-state">No accounts recorded.</p>}</div>}

      {activeTab === "reviews" && <div className="admin-table tool-card"><div className="admin-table-head"><strong>Review moderation</strong></div>{adminData?.reviewRecords.map((review) => <div className="admin-row" key={review.id}><div><strong>{review.title} · {"★".repeat(review.rating)} · {review.approved ? "Published" : "Pending"}</strong><small>{review.user.name} ({review.user.email}) · {review.destination.name}</small><small>{review.body}</small></div><button className="outline-button small" onClick={async () => { const approved = !review.approved; const response = await fetch(`/api/admin/reviews/${review.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ approved }) }); if (response.ok) setAdminData((current) => current ? { ...current, reviewRecords: current.reviewRecords.map((item) => item.id === review.id ? { ...item, approved } : item) } : current); }}>{review.approved ? "Unpublish" : "Approve"}</button><Link href={`/destination/${review.destination.slug}`}>View</Link></div>)}{!adminData?.reviewRecords.length && <p className="empty-state">No reviews submitted.</p>}</div>}

      {activeTab === "payments" && (
        <div className="admin-table tool-card">
          <div className="admin-table-head">
            <strong>Verified Gateway Transactions & Receipts</strong>
          </div>
          {adminData?.paymentRecords.map((txn) => <div className="admin-row" key={txn.id}><div><strong>{txn.transactionId}</strong><small>{txn.booking.reference} · {txn.booking.user.name} · {txn.booking.user.email} · {txn.booking.trip.destination?.name ?? "Trip"}{txn.receipt ? <> · <Link href={`/receipt/${txn.receipt.receiptNumber}`}>Receipt {txn.receipt.receiptNumber}</Link></> : " · Receipt pending verified capture"}</small></div><b>{txn.currency} {txn.amount.toLocaleString()}</b><span>{txn.status} · {txn.method}</span></div>)}
          {!adminData?.paymentRecords.length && <p className="empty-state">No payment records.</p>}
        </div>
      )}

      {activeTab === "translations" && (
        <div className="admin-table tool-card">
          <div className="admin-table-head">
            <strong>Multilingual Content & i18n Status</strong>
          </div>
          <div className="translation-summary-grid">
            <div className="lang-stat-card">
              <h3>English (EN)</h3>
            <p>Core UI dictionary · page and catalog coverage is incomplete</p>
              <span className="badge-confirmed">Active</span>
            </div>
            <div className="lang-stat-card">
              <h3>हिंदी (HI)</h3>
            <p>Core UI dictionary · page and catalog coverage is incomplete</p>
            <span className="badge-confirmed">Partial</span>
            </div>
            <div className="lang-stat-card">
              <h3>मराठी (MR)</h3>
            <p>Core UI dictionary · page and catalog coverage is incomplete</p>
            <span className="badge-confirmed">Partial</span>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true" aria-label="Add Destination">
          <div className="admin-modal-box tool-card">
            <div className="admin-table-head">
              <strong>Add New Destination to Catalog</strong>
              <button className="icon-button" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddDestination} className="admin-add-form">
              <label>
                <span>DESTINATION NAME</span>
                <input required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Rishikesh / Tokyo" />
              </label>
              <div className="form-row">
                <label>
                  <span>COUNTRY</span>
                  <input required value={newCountry} onChange={(e) => setNewCountry(e.target.value)} />
                </label>
                <label>
                  <span>REGION / STATE</span>
                  <input required value={newRegion} onChange={(e) => setNewRegion(e.target.value)} />
                </label>
              </div>
              <label>
                <span>SIGNATURE TAGLINE</span>
                <input required value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="e.g. Yoga capital & holy rapids" />
              </label>
              <div className="form-row">
                <label>
                  <span>ESTIMATED BUDGET</span>
                  <input value={newBudget} onChange={(e) => setNewBudget(e.target.value)} />
                </label>
                <label>
                  <span>IDEAL DURATION</span>
                  <input value={newDuration} onChange={(e) => setNewDuration(e.target.value)} />
                </label>
              </div>
              <label>
                <span>PRIMARY CHARACTERISTIC</span>
                <select value={newChar} onChange={(e) => setNewChar(e.target.value)}>
                  <option>Beach & Coast</option>
                  <option>Heritage</option>
                  <option>Nature</option>
                  <option>Mountains</option>
                  <option>Adventure</option>
                  <option>Culture</option>
                  <option>Slow Travel</option>
                  <option>Luxury</option>
                  <option>Budget</option>
                </select>
              </label>
              <button className="button button-coral" type="submit">
                Save & Publish Destination
              </button>
            </form>
          </div>
        </div>
      )}
    </RouteShell>
  );
}

export function HelpView() {
  return (
    <RouteShell
      eyebrow="✦ WE ARE HERE TO HELP ✦"
      title={<>A Little Clarity Goes <em>a Long Way.</em></>}
      intro="Answers to common questions about bookings, offline AI planning, itineraries, and payment receipts."
    >
      <div className="help-grid">
        <ToolCard>
          <Search size={22} className="tool-icon" />
          <h3>Search the Help Desk</h3>
          <p>Find instant guides on modifying dates, accessing printable receipts, and packing recommendations.</p>
          <input className="help-input" placeholder="Try “receipt” or “packing list”..." />
        </ToolCard>
        <ToolCard>
          <Mic size={22} className="tool-icon" />
          <h3>Ask TRAVEXA AI</h3>
          <p>Get instant answers about weather, local food etiquette, or optimal transit routes.</p>
          <Link className="text-link" href="/planner">
            Open AI Assistant <ArrowRight size={16} />
          </Link>
        </ToolCard>
        <ToolCard>
          <FileText size={22} className="tool-icon" />
          <h3>Travel Documents</h3>
          <p>Retrieve confirmed bookings, tax invoices, and calendar (.ics) sync files.</p>
          <Link className="text-link" href="/dashboard">
            Open Travel Space <ArrowRight size={16} />
          </Link>
        </ToolCard>
      </div>
    </RouteShell>
  );
}
