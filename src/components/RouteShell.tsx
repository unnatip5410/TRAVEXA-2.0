"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  Clock,
  Compass,
  DollarSign,
  Heart,
  HelpCircle,
  Luggage,
  MapPin,
  Maximize2,
  Navigation,
  Phone,
  Plane,
  Plus,
  Search,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Train,
  Utensils,
  Volume2,
  VolumeX,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AIAssistant, SiteHeader } from "@/components/SiteHeader";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations, categoriesList, type Destination, type DestinationCharacteristic } from "@/lib/data";
import { usePreferences } from "@/components/Preferences";
import { useFavorites } from "@/lib/favorites";

export function RouteShell({
  children,
  title,
  eyebrow,
  intro,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  eyebrow: string;
  intro: string;
}) {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="route-main">
        <div className="route-hero">
          <div className="kicker">
            <span className="kicker-line" /> {eyebrow}
          </div>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        {children}
      </main>
      <AIAssistant />
    </div>
  );
}

export function ExploreView({ region = "all", initialCategory }: { region?: "all" | "india" | "world"; initialCategory?: string }) {
  const { t } = usePreferences();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory ?? "All places");
  const [season, setSeason] = useState("All seasons");
  const [sort, setSort] = useState("Recommended");
  const [budgetTier, setBudgetTier] = useState("All budgets");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const base = useMemo(() => {
    return destinations.filter((item) => {
      if (region === "india") return item.country === "India";
      if (region === "world") return item.country !== "India";
      return true;
    });
  }, [region]);

  const categories = ["All places", ...categoriesList.map((category) => category.name)];

  const filtered = useMemo(() => {
    return base
      .filter((item) => {
        const searchPool = `${item.name} ${item.region} ${item.country} ${item.state ?? ""} ${item.city ?? ""} ${(item.tags ?? []).join(" ")} ${(item.characteristics ?? []).join(" ")} ${item.description}`.toLowerCase();
        const matchesQuery = query.trim() === "" || searchPool.includes(query.toLowerCase());

        const matchesCategory =
          selectedCategory === "All places" ||
          (item.characteristics ?? []).includes(selectedCategory as DestinationCharacteristic) ||
          (item.tags ?? []).some((t) => t.toLowerCase() === selectedCategory.toLowerCase());

        const matchesSeason =
          season === "All seasons" ||
          (item.seasons ?? []).includes(season);

        const budgetNumber = Number(item.budget.replace(/[^\d]/g, ""));
        const isForeignPrice = /[$€£]/.test(item.budget);
        const budgetBand = (item.characteristics ?? []).includes("Luxury") || (isForeignPrice ? budgetNumber >= 1000 : budgetNumber >= 60000)
          ? "Luxury"
          : (item.characteristics ?? []).includes("Budget") || (isForeignPrice ? budgetNumber < 250 : budgetNumber < 20000)
            ? "Budget" : "Mid-Range";
        const matchesBudget = budgetTier === "All budgets" || budgetBand === budgetTier;

        return matchesQuery && matchesCategory && matchesSeason && matchesBudget;
      })
      .sort((a, b) => {
        if (sort === "az") return a.name.localeCompare(b.name);
        if (sort === "rating") return Number(b.rating) - Number(a.rating);
        if (sort === "popular") return (b.tags?.length ?? 0) - (a.tags?.length ?? 0);
        if (sort === "budget") return Number(a.budget.replace(/[^\d]/g, "")) - Number(b.budget.replace(/[^\d]/g, ""));
        return 0;
      });
  }, [base, query, selectedCategory, season, budgetTier, sort]);

  const resetFilters = () => {
    setQuery("");
    setSelectedCategory("All places");
    setSeason("All seasons");
    setBudgetTier("All budgets");
    setSort("Recommended");
  };

  const activeFilterCount =
    (selectedCategory !== "All places" ? 1 : 0) +
    (season !== "All seasons" ? 1 : 0) +
    (budgetTier !== "All budgets" ? 1 : 0) +
    (query ? 1 : 0);

  return (
    <RouteShell
      eyebrow={
        region === "india"
          ? "✦ INCREDIBLE INDIA ✦"
          : region === "world"
          ? "✦ DISCOVER THE WORLD ✦"
          : "✦ CURATED DESTINATIONS ✦"
      }
      title={
        region === "india" ? (
          <>Explore <em>Incredible</em> India.</>
        ) : region === "world" ? (
          <>The World, <em>Wide Open.</em></>
        ) : (
          <>Places with a <em>Point of View.</em></>
        )
      }
      intro="Structured travel discovery across verified locations, seasonal guides, and authentic cultural context."
    >
      {/* Search Toolbar */}
      <div className="route-toolbar">
        <label className="route-search">
          <Search size={18} />
          <input
            aria-label="Search destinations"
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button type="button" className="clear-search-btn" onClick={() => setQuery("")}>
              <X size={15} />
            </button>
          )}
        </label>

        <button
          className={`filter-button ${filtersOpen || activeFilterCount > 0 ? "active" : ""}`}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal size={16} />
          <span>{t("filterTitle")} {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Category Chips Bar */}
      <div className="route-chips" role="tablist">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            className={`chip ${selectedCategory === item ? "active" : ""}`}
            onClick={() => setSelectedCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Expandable Filter Drawer */}
      {filtersOpen && (
        <div className="filter-drawer">
          <label>
            <span>{t("filterSeason")}</span>
            <select value={season} onChange={(e) => setSeason(e.target.value)}>
              <option>All seasons</option>
              <option>Winter</option>
              <option>Summer</option>
              <option>Monsoon</option>
              <option>Spring / Autumn</option>
            </select>
          </label>

          <label>
            <span>BUDGET TIER</span>
            <select value={budgetTier} onChange={(e) => setBudgetTier(e.target.value)}>
              <option>All budgets</option>
              <option>Budget</option>
              <option>Mid-Range</option>
              <option>Luxury</option>
            </select>
          </label>

          <label>
            <span>{t("filterSort")}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="Recommended">{t("filterSortRecommended")}</option>
              <option value="popular">{t("filterSortPopular")}</option>
              <option value="rating">{t("filterSortRating")}</option>
              <option value="budget">{t("filterSortBudget")}</option>
              <option value="az">{t("filterSortAZ")}</option>
            </select>
          </label>

          <div className="filter-actions">
            <button type="button" className="outline-button small" onClick={resetFilters}>
              {t("filterClear")}
            </button>
            <span className="result-count">
              <strong>{filtered.length}</strong> {t("resultsCount")}
            </span>
          </div>
        </div>
      )}

      {/* Result Grid or Empty State */}
      {filtered.length > 0 ? (
        <div className="explore-grid">
          {filtered.map((item, index) => (
            <DestinationCard key={item.slug} destination={item} featured={index === 0} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={28} className="empty-icon" />
          <h3>{t("emptyNoPlaces")}</h3>
          <p>Try clearing filters or searching for another destination.</p>
          <button className="button button-dark" onClick={resetFilters}>
            {t("emptyReset")}
          </button>
        </div>
      )}
    </RouteShell>
  );
}

export function PlannerView({ initialDestination = "", initialDate = "", initialStyle = "" }: { initialDestination?: string; initialDate?: string; initialStyle?: string }) {
  const { t } = usePreferences();
  const [destination, setDestination] = useState(initialDestination);
  const [travelDate, setTravelDate] = useState(/^\d{4}-\d{2}-\d{2}$/.test(initialDate) ? initialDate : "");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([initialStyle || "Slow & soulful"]);
  const [duration, setDuration] = useState("5–7 days");
  const [season, setSeason] = useState("Winter");
  const [travellers, setTravellers] = useState("2 travellers");
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [planResult, setPlanResult] = useState<{ answer: string; itinerary?: string[]; mode: string } | null>(null);
  const [planError, setPlanError] = useState("");
  const [tripSaveMessage, setTripSaveMessage] = useState("");
  const [savingTrip, setSavingTrip] = useState(false);

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true); setPlanError(""); setGenerated(false);
    try {
      const response = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: `Plan a ${duration} trip to ${destination}, in ${season}, for ${travellers}. Travel styles: ${selectedStyles.join(", ")}. Budget preference: ${selectedDestinationObj.budget}.` }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error ?? "Unable to generate suggestions.");
      setPlanResult({ answer: data.answer, itinerary: data.itinerary, mode: data.mode ?? "provider" }); setGenerated(true);
    } catch (error) { setPlanError(error instanceof Error ? error.message : "The travel assistant is unavailable right now."); }
    finally { setGenerating(false); }
  };

  const saveGeneratedTrip = async () => {
    setSavingTrip(true); setTripSaveMessage("");
    try {
      const response = await fetch("/api/trips", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: `${selectedDestinationObj.name} trip`, destination: selectedDestinationObj.slug, travellers: Number((travellers.match(/\d+/) ?? ["1"])[0]), travelDate: travelDate || undefined, budget: selectedDestinationObj.budget, style: selectedStyles.join(", ") }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error ?? "Unable to save your trip.");
      setTripSaveMessage("Trip saved to your account.");
    } catch (error) { setTripSaveMessage(error instanceof Error ? error.message : "Unable to save trip."); }
    finally { setSavingTrip(false); }
  };

  const selectedDestinationObj = destinations.find(
    (d) => d.name.toLowerCase() === destination.toLowerCase() || d.slug === destination.toLowerCase()
  ) || destinations[0];

  return (
    <RouteShell
      eyebrow="✦ TRAVEXA TRAVEL STUDIO ✦"
      title={<>Make Room for <em>Wonder.</em></>}
      intro="Tell us what moves you. Our AI planner harmonizes pace, culture, routes, and realistic budgets into a personalized itinerary."
    >
      <div className="planner-layout">
        <form className="planner-form" onSubmit={handleGenerate}>
          <div className="form-section">
            <span className="form-step">01</span>
            <div>
              <h3>Where are you dreaming of?</h3>
              <p>Type any destination or choose a curated favorite.</p>
            </div>
          </div>

          <label className="wide-input">
            <span>DESTINATION</span>
            <input
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Kerala, Goa, Kashmir, Kyoto, Swiss Alps, Paris..."
            />
          </label>

          <label className="wide-input"><span>TRAVEL DATE</span><input type="date" value={travelDate} onChange={(event) => setTravelDate(event.target.value)} /></label>

          <div className="quick-dest-pills">
            {["Kerala", "Goa", "Kashmir", "Ladakh", "Jaipur", "Kyoto", "Bali", "Amalfi Coast"].map((name) => (
              <button
                type="button"
                key={name}
                className={destination.toLowerCase() === name.toLowerCase() ? "active" : ""}
                onClick={() => setDestination(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="form-section">
            <span className="form-step">02</span>
            <div>
              <h3>What kind of trip feels right?</h3>
              <p>Select your travel styles.</p>
            </div>
          </div>

          <div className="choice-grid">
            {[
              "Slow & soulful",
              "Heritage & history",
              "Nature & wildlife",
              "Mountains & trekking",
              "Beach & coast",
              "Food & culinary",
              "Romantic getaway",
              "Family friendly",
              "Luxury retreat",
            ].map((choice) => (
              <label className="choice" key={choice}>
                <input
                  type="checkbox"
                  checked={selectedStyles.includes(choice)}
                  onChange={() => toggleStyle(choice)}
                />
                <span>{choice}</span>
              </label>
            ))}
          </div>

          <div className="form-row">
            <label className="wide-input">
              <span>DURATION</span>
              <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option>3–4 days (Weekend Reset)</option>
                <option>5–7 days (Balanced Journey)</option>
                <option>8–12 days (Deep Immersion)</option>
                <option>14+ days (Grand Circuit)</option>
              </select>
            </label>

            <label className="wide-input">
              <span>SEASON</span>
              <select value={season} onChange={(e) => setSeason(e.target.value)}>
                <option>Winter (Nov – Feb)</option>
                <option>Summer (Mar – Jun)</option>
                <option>Monsoon (Jul – Sep)</option>
                <option>Spring / Autumn (Oct & Mar)</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label className="wide-input">
              <span>TRAVELLERS</span>
              <select value={travellers} onChange={(e) => setTravellers(e.target.value)}>
                <option>1 Solo Explorer</option>
                <option>2 travellers (Couple / Duo)</option>
                <option>3–4 travellers (Family / Friends)</option>
                <option>5+ Group</option>
              </select>
            </label>
          </div>

          <button className="button button-coral planner-submit" type="submit" disabled={generating}>
            <Sparkles size={17} /> {generating ? "Generating suggestions…" : generated ? "Regenerate Itinerary" : "Generate My Itinerary"}
          </button>
        </form>

        <div className="planner-aside">
          <div className="aside-icon">
            <Sparkles size={22} />
          </div>
          <h3>Your itinerary, not a template.</h3>
          <p>
            TRAVEXA considers pace, authentic local food stops, realistic transit times, and honest budgets so your trip feels effortless before you depart.
          </p>
          <div className="aside-list">
            <span><Check size={16} /> Day-by-day unscripted rhythm</span>
            <span><Check size={16} /> Verified transport & route timings</span>
            <span><Check size={16} /> Curated stay & dining recommendations</span>
            <span><Check size={16} /> Packing list customized to weather</span>
          </div>
        </div>
      </div>

      {generated && (
        <div className="generated-plan">
          <div>
            <span className="eyebrow">
              ✦ ITINERARY READY · {selectedDestinationObj.name.toUpperCase()} ✦
            </span>
            <h2>{duration} of <em>{selectedDestinationObj.tag}.</em></h2>
            <p>{planResult?.answer ?? selectedDestinationObj.description}</p>
            {planResult?.mode === "local-engine" && <small>Local catalog guidance · provider AI is not configured.</small>}
            {planResult?.itinerary && <ol>{planResult.itinerary.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ol>}
          </div>
          <div className="generated-actions">
            <Link className="button button-coral" href={`/trip/${selectedDestinationObj.slug}`}>
              Open Full Itinerary <ArrowRight size={17} />
            </Link>
            <Link className="button button-dark" href={`/enroll/${selectedDestinationObj.slug}`}>
              Book / Enroll Trip <ArrowUpRight size={17} />
            </Link>
            <button className="button button-dark" type="button" onClick={saveGeneratedTrip} disabled={savingTrip}>{savingTrip ? "Saving…" : "Save to my account"}</button>
          </div>
          {tripSaveMessage && <p role="status">{tripSaveMessage}</p>}
        </div>
      )}
      {planError && <p role="alert">{planError}</p>}
    </RouteShell>
  );
}

export function DestinationView({ slug }: { slug: string }) {
  const { t } = usePreferences();
  const { isSaved, toggleFavorite } = useFavorites();
  const destination = destinations.find((item) => item.slug === slug) ?? destinations[0];

  const [selectedHub, setSelectedHub] = useState<string>(
    destination.routes?.[0]?.from ?? "Mumbai"
  );
  const [selectedImage, setSelectedImage] = useState(destination.image);
  const [newReviewTitle, setNewReviewTitle] = useState("");
  const [newReviewBody, setNewReviewBody] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState<Array<{ author: string; rating: number; date: string; title: string; comment: string }>>([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const saved = isSaved(destination.slug);
  const activeRoute = destination.routes?.find((r) => r.from === selectedHub) ?? destination.routes?.[0];

  useEffect(() => { fetch(`/api/reviews?destination=${encodeURIComponent(destination.slug)}`, { cache: "no-store" }).then((response) => response.json()).then((data) => setReviewsList((data.reviews ?? []).map((review: { author: string; rating: number; title: string; body: string; createdAt: string }) => ({ author: review.author, rating: review.rating, title: review.title, comment: review.body, date: new Date(review.createdAt).toLocaleDateString() })))).catch(() => setReviewsList([])); }, [destination.slug]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewBody.trim()) return;
    setReviewError("");
    try {
      const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ destination: destination.slug, title: newReviewTitle, body: newReviewBody, rating: newReviewRating }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to submit review.");
              setReviewSubmitted(true); setNewReviewTitle(""); setNewReviewBody("");
    } catch (error) { setReviewError(error instanceof Error ? error.message : "Unable to submit review."); }
  };

  const similarDestinations = destinations
    .filter((d) => d.slug !== destination.slug && d.characteristics.some((c) => destination.characteristics.includes(c)))
    .slice(0, 3);

  return (
    <RouteShell
      eyebrow={`✦ ${destination.region.toUpperCase()} · ${destination.country.toUpperCase()} ✦`}
      title={<>Meet <em>{destination.name}.</em></>}
      intro={destination.description}
    >
      {/* Destination still image */}
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${selectedImage})` }}
      >
        <div className="destination-image-title">
          <span>{destination.city ?? destination.region}{destination.state ? ` · ${destination.state}` : ""}</span>
          <strong>{destination.name}</strong>
        </div>
        {destination.imageCredit && <a className="destination-image-credit" href={destination.imageCredit.sourceUrl} target="_blank" rel="noreferrer">Photo: {destination.imageCredit.author} · {destination.imageCredit.license}</a>}

        {destination.gallery && destination.gallery.length > 1 && (
          <div className="gallery-thumbs">
            {[destination.image, ...destination.gallery].map((img, i) => (
              <button
                key={i}
                className={selectedImage === img ? "thumb active" : "thumb"}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`Thumb ${i}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid: Story + Key Facts */}
      <div className="detail-grid">
        <div className="detail-story">
          <div className="detail-facts">
            <span><Star size={16} fill="currentColor" /> {destination.rating} {t("cardRating")}</span>
            <span><MapPin size={16} /> {destination.region}</span>
            <span><Clock size={16} /> {destination.duration}</span>
            <span>{t("cardFrom")} {destination.budget}</span>
          </div>

          <h2>The kind of place you <em>feel</em> before you understand.</h2>
          <p className="body-copy">
            {destination.longDescription ?? destination.description}
          </p>

          {/* Explicit Characteristics Section */}
          <div className="characteristics-block">
            <span className="char-heading">
              <Sparkles size={15} /> {t("detailCharacteristics")}
            </span>
            <div className="char-pills">
              {destination.characteristics.map((char) => (
                <span key={char} className="char-pill-item">
                  ✦ {char}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-actions">
            <Link className="button button-coral" href={`/enroll/${destination.slug}`}>
              {t("detailEnroll")} <ArrowRight size={16} />
            </Link>
            <Link className="button button-dark" href={`/planner?destination=${destination.slug}`}>
              <Sparkles size={16} /> {t("cardPlan")}
            </Link>
            <button
              className={`outline-button ${saved ? "saved-active" : ""}`}
              onClick={() => toggleFavorite(destination.slug)}
            >
              <Heart size={16} fill={saved ? "currentColor" : "none"} />
              {saved ? t("cardSaved") : t("cardSave")}
            </button>
            <button
              className="outline-button"
              aria-label="Share"
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard?.writeText(window.location.href);
                  alert("Destination link copied to clipboard!");
                }
              }}
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Quick Facts Aside */}
        <aside className="quick-facts">
          <span>{t("footerGoodToKnow")}</span>
          <div>
            <strong>{t("detailBestTime")}</strong>
            <b>{destination.bestTime}</b>
          </div>
          <div>
            <strong>{t("detailDuration")}</strong>
            <b>{destination.duration}</b>
          </div>
          <div>
            <strong>{t("detailDailyBudget")}</strong>
            <b>{destination.dailyBudget ?? "₹3,500 / day"}</b>
          </div>
          <div>
            <strong>Signature Vibe</strong>
            <b>{destination.knownFor.slice(0, 2).join(" · ")}</b>
          </div>
          <Link href="/compare">
            Compare with another place <ArrowRight size={14} />
          </Link>
        </aside>
      </div>

      {/* Top Things to Do & Attractions */}
      <section className="detail-section things-section">
        <div className="section-header-compact">
          <span className="kicker">CURATED EXPERIENCES</span>
          <h2>{t("detailThingsToDo")} & Landmarks</h2>
        </div>

        <div className="things-grid">
          {(destination.thingsToDo ?? [
            { title: "Walk the Historic Center", desc: "Discover centuries-old architecture and cultural heritage." },
            { title: "Taste Local Specialties", desc: "Savor authentic regional dishes and visit local food markets." },
            { title: "Scenic Sunset Point", desc: "Unwind with panoramic views as dusk falls over the landscape." },
          ]).map((item, idx) => (
            <div key={idx} className="thing-card">
              <span className="thing-index">0{idx + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {destination.topAttractions && (
          <div className="attractions-strip">
            <span className="eyebrow">{t("detailAttractions")}</span>
            <div className="attraction-tags">
              {destination.topAttractions.map((att) => (
                <span key={att} className="attraction-tag">
                  📍 {att}
                </span>
              ))}
            </div>
          </div>
        )}

        {destination.hiddenGems && (
          <div className="gems-strip">
            <span className="eyebrow">✨ {t("detailHiddenGems")}</span>
            <div className="gem-items">
              {destination.hiddenGems.map((gem) => (
                <div key={gem} className="gem-item">
                  <strong>{gem}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Transport, Route & Travel Time Section */}
      <section className="detail-section transport-section">
        <div className="section-header-compact">
          <span className="kicker">TRANSIT & CONNECTIVITY</span>
          <h2>{t("detailTransport")} & Routes</h2>
        </div>

        {destination.routes && destination.routes.length > 0 && (
          <div className="routes-container">
            <div className="hub-selector">
              <span>Departing from:</span>
              <div className="hub-pills">
                {destination.routes.map((r) => (
                  <button
                    key={r.from}
                    type="button"
                    className={selectedHub === r.from ? "active" : ""}
                    onClick={() => setSelectedHub(r.from)}
                  >
                    {r.from}
                  </button>
                ))}
              </div>
            </div>

            {activeRoute && (
              <div className="route-detail-card">
                <div className="route-header">
                  <div>
                    <strong>{activeRoute.from} → {destination.name}</strong>
                    <span className="route-distance">Approx. {activeRoute.distance}</span>
                  </div>
                  <Navigation size={20} className="route-icon" />
                </div>

                <div className="transport-modes-grid">
                  {activeRoute.flight && (
                    <div className="transit-mode">
                      <Plane size={18} />
                      <div>
                        <strong>{t("transportFlight")}</strong>
                        <p>{activeRoute.flight}</p>
                      </div>
                    </div>
                  )}

                  {activeRoute.train && (
                    <div className="transit-mode">
                      <Train size={18} />
                      <div>
                        <strong>{t("transportTrain")}</strong>
                        <p>{activeRoute.train}</p>
                      </div>
                    </div>
                  )}

                  {activeRoute.car && (
                    <div className="transit-mode">
                      <Car size={18} />
                      <div>
                        <strong>{t("transportCar")}</strong>
                        <p>{activeRoute.car}</p>
                      </div>
                    </div>
                  )}

                  {activeRoute.bus && (
                    <div className="transit-mode">
                      <Compass size={18} />
                      <div>
                        <strong>{t("transportBus")}</strong>
                        <p>{activeRoute.bus}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Stay & Accommodation Guidance */}
      {destination.stayInfo && (
        <section className="detail-section stay-section">
          <div className="section-header-compact">
            <span className="kicker">STAYS & HOSPITALITY</span>
            <h2>{t("detailStayInfo")}</h2>
          </div>

          <div className="stay-grid">
            <div className="stay-card budget">
              <span className="stay-badge">Budget Homestay</span>
              <h4>{destination.stayInfo.budget}</h4>
              <p>Authentic local guesthouses, boutique hostels, and community homestays.</p>
            </div>
            <div className="stay-card mid">
              <span className="stay-badge">Mid-Range Heritage</span>
              <h4>{destination.stayInfo.midRange}</h4>
              <p>Boutique hotels, plantation bungalows, and scenic lakeview resorts.</p>
            </div>
            <div className="stay-card luxury">
              <span className="stay-badge">Luxury Retreat</span>
              <h4>{destination.stayInfo.luxury}</h4>
              <p>Palatial suites, private pool villas, and 5-star experiential sanctuaries.</p>
            </div>
          </div>
          <p className="stay-area-tip">
            💡 <strong>Recommended Area:</strong> {destination.stayInfo.recommendedArea}
          </p>
        </section>
      )}

      {/* Local Food & Culture */}
      {(destination.localFood || destination.cultureTips) && (
        <section className="detail-section food-culture-section">
          <div className="section-header-compact">
            <span className="kicker">TASTE & TRADITION</span>
            <h2>Local Flavours & Culture</h2>
          </div>

          <div className="food-culture-grid">
            {destination.localFood && (
              <div className="food-card">
                <h3><Utensils size={18} /> {t("detailLocalFood")}</h3>
                <ul>
                  {destination.localFood.map((dish) => (
                    <li key={dish}>{dish}</li>
                  ))}
                </ul>
              </div>
            )}

            {destination.cultureTips && (
              <div className="culture-card">
                <h3><ShieldCheck size={18} /> {t("detailCulture")}</h3>
                <ul>
                  {destination.cultureTips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Packing & Safety */}
      {destination.packingList && (
        <section className="detail-section packing-preview-section">
          <div className="section-header-compact">
            <span className="kicker">PREPARATION</span>
            <h2>{t("detailPacking")}</h2>
          </div>
          <div className="packing-tags">
            {destination.packingList.map((item) => (
              <span key={item} className="packing-pill">
                <Luggage size={14} /> {item}
              </span>
            ))}
          </div>
          <Link href="/packing" className="text-link">
            Open Interactive Packing Assistant →
          </Link>
        </section>
      )}

      {/* Reviews & Submission */}
      <section className="detail-section reviews-section">
        <div className="section-header-compact">
          <span className="kicker">TRAVELLER EXPERIENCES</span>
          <h2>{t("detailReviews")}</h2>
        </div>

        <div className="reviews-layout">
          <div className="reviews-list">
            {reviewsList.map((rev, idx) => (
              <div key={idx} className="review-item-card">
                <div className="review-item-header">
                  <strong>{rev.author}</strong>
                  <span className="review-stars">
                    {"★".repeat(rev.rating)}
                  </span>
                </div>
                <h4>{rev.title}</h4>
                <p>{rev.comment}</p>
                <small>{rev.date}</small>
              </div>
            ))}
          </div>

          <form className="add-review-form" onSubmit={handleReviewSubmit}>
            <h3>Leave a Review</h3>
            {reviewSubmitted && (
              <div className="success-banner">
              <Check size={16} /> Thank you! Your review was submitted for moderation.
              </div>
            )}
            {reviewError && <p role="alert">{reviewError}</p>}
            <label>
              <span>RATING</span>
              <select
                value={newReviewRating}
                onChange={(e) => setNewReviewRating(Number(e.target.value))}
              >
                <option value={5}>★★★★★ (5 - Outstanding)</option>
                <option value={4}>★★★★☆ (4 - Very Good)</option>
                <option value={3}>★★★☆☆ (3 - Good)</option>
              </select>
            </label>

            <label>
              <span>TITLE</span>
              <input
                required
                value={newReviewTitle}
                onChange={(e) => setNewReviewTitle(e.target.value)}
                placeholder="Highlight of your trip"
              />
            </label>

            <label>
              <span>YOUR FEEDBACK</span>
              <textarea
                required
                rows={3}
                value={newReviewBody}
                onChange={(e) => setNewReviewBody(e.target.value)}
                placeholder="Share helpful insights for future travellers..."
              />
            </label>

            <button type="submit" className="button button-dark">
              Submit Review
            </button>
          </form>
        </div>
      </section>

      {/* Similar Destinations */}
      {similarDestinations.length > 0 && (
        <section className="detail-section similar-section">
          <div className="section-header-compact">
            <span className="kicker">EXPLORE FURTHER</span>
            <h2>{t("detailSimilar")}</h2>
          </div>
          <div className="similar-grid">
            {similarDestinations.map((sim) => (
              <DestinationCard key={sim.slug} destination={sim} />
            ))}
          </div>
        </section>
      )}

    </RouteShell>
  );
}

export function CompareView() {
  const [dest1Slug, setDest1Slug] = useState("goa");
  const [dest2Slug, setDest2Slug] = useState("kerala");

  const dest1 = destinations.find((d) => d.slug === dest1Slug) ?? destinations[0];
  const dest2 = destinations.find((d) => d.slug === dest2Slug) ?? destinations[1];

  const compareRows = [
    { label: "Country / State", val1: `${dest1.country} · ${dest1.state ?? dest1.region}`, val2: `${dest2.country} · ${dest2.state ?? dest2.region}` },
    { label: "Best Season", val1: dest1.bestTime, val2: dest2.bestTime },
    { label: "Estimated Budget", val1: dest1.budget, val2: dest2.budget },
    { label: "Daily Spend", val1: dest1.dailyBudget ?? "₹3,000", val2: dest2.dailyBudget ?? "₹3,500" },
    { label: "Ideal Duration", val1: dest1.duration, val2: dest2.duration },
    { label: "Characteristics", val1: dest1.characteristics.slice(0, 4).join(", "), val2: dest2.characteristics.slice(0, 4).join(", ") },
    { label: "Top Highlights", val1: dest1.knownFor.slice(0, 3).join(" · "), val2: dest2.knownFor.slice(0, 3).join(" · ") },
    { label: "Rating", val1: `★ ${dest1.rating}`, val2: `★ ${dest2.rating}` },
  ];

  return (
    <RouteShell
      eyebrow="✦ A MORE CONSIDERED CHOICE ✦"
      title={<>Side by Side: <em>Compare Places.</em></>}
      intro="Evaluate two destinations across budget, optimal seasons, characteristics, and pace to choose the right fit."
    >
      <div className="comparison">
        <div className="compare-selectors">
          <label>
            <span>FIRST DESTINATION</span>
            <select value={dest1Slug} onChange={(e) => setDest1Slug(e.target.value)}>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>{d.name} ({d.country})</option>
              ))}
            </select>
          </label>

          <label>
            <span>SECOND DESTINATION</span>
            <select value={dest2Slug} onChange={(e) => setDest2Slug(e.target.value)}>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>{d.name} ({d.country})</option>
              ))}
            </select>
          </label>
        </div>

        <div className="compare-head">
          <div />
          <div className="compare-destination">
            <div className="compare-photo" style={{ backgroundImage: `url(${dest1.image})` }} />
            <h3>{dest1.name}</h3>
            <span>{dest1.region} · {dest1.country}</span>
          </div>
          <div className="compare-destination">
            <div className="compare-photo" style={{ backgroundImage: `url(${dest2.image})` }} />
            <h3>{dest2.name}</h3>
            <span>{dest2.region} · {dest2.country}</span>
          </div>
        </div>

        {compareRows.map((row) => (
          <div className="compare-row" key={row.label}>
            <strong>{row.label}</strong>
            <span>{row.val1}</span>
            <span>{row.val2}</span>
          </div>
        ))}

        <div className="compare-actions">
          <Link className="button button-dark" href={`/destination/${dest1.slug}`}>
            Explore {dest1.name} <ArrowRight size={15} />
          </Link>
          <Link className="button button-coral" href={`/planner?destination=${dest2.slug}`}>
            Plan {dest2.name} <Sparkles size={15} />
          </Link>
        </div>
      </div>
    </RouteShell>
  );
}

export function DashboardView() {
  const { t } = usePreferences();
  const { favorites } = useFavorites();

  const savedDestinationsList = destinations.filter((d) => favorites.includes(d.slug));

  return (
    <RouteShell
      eyebrow="✦ YOUR TRAVEL SPACE ✦"
      title={<>Welcome back, <em>Curious Traveller.</em></>}
      intro="Your saved destinations, active bookings, payment receipts, and personalized itineraries in one place."
    >
      <div className="dashboard-grid">
        {/* Active Trip Card */}
        <div className="dashboard-card upcoming">
          <span className="eyebrow">ACTIVE BOOKING & ITINERARY</span>
          <h2>Kerala <em>in Full Colour.</em></h2>
          <p>5 Days · 2 Travellers · Confirmed</p>
          <div className="progress">
            <span style={{ width: "85%" }} />
          </div>
          <div className="dash-row">
            <span>Trip Readiness</span>
            <strong>85% Ready</strong>
          </div>
          <div className="dash-btn-group">
            <Link className="button button-dark" href="/trip/kerala">
              View Itinerary <ArrowRight size={16} />
            </Link>
            <Link className="outline-button" href="/receipt/TRX-KRL-8821">
              View Receipt
            </Link>
          </div>
        </div>

        {/* Travel DNA Card */}
        <div className="dashboard-card dna">
          <span className="eyebrow">YOUR TRAVEL DNA</span>
          <div className="dna-mark">◌</div>
          <h3>Nature & Slow Travel</h3>
          <p>You seek unhurried journeys, serene waterways, and deep culinary roots.</p>
          <Link className="text-link" href="/travel-dna">
            Retake Travel DNA Assessment →
          </Link>
        </div>

        {/* Saved Destinations Card */}
        <div className="dashboard-card saved-card">
          <span className="eyebrow">SAVED DESTINATIONS ({favorites.length})</span>
          <div className="saved-mini-list">
            {savedDestinationsList.slice(0, 4).map((item) => (
              <Link href={`/destination/${item.slug}`} key={item.slug} className="saved-mini">
                <div className="mini-photo" style={{ backgroundImage: `url(${item.image})` }} />
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.region} · ★ {item.rating}</small>
                </span>
                <Heart size={16} fill="var(--coral)" color="var(--coral)" />
              </Link>
            ))}
            {savedDestinationsList.length === 0 && (
              <p className="empty-mini">No places saved yet. Tap the heart icon on any card!</p>
            )}
          </div>
          <Link className="text-link" href="/saved">
            View All Saved Places ({favorites.length}) →
          </Link>
        </div>
      </div>
    </RouteShell>
  );
}
