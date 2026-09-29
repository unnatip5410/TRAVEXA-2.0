"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  Compass,
  Headphones,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { AIAssistant, SiteHeader } from "@/components/SiteHeader";
import { DestinationCard } from "@/components/DestinationCard";
import {
  destinations,
  categoriesList,
  seasonalHighlights,
  indiaCollections,
  worldRegions,
  type Destination
} from "@/lib/data";
import { TravelSearch } from "@/components/TravelSearch";
import { usePreferences } from "@/components/Preferences";

export default function Home() {
  const { t } = usePreferences();
  const [activeTab, setActiveTab] = useState<"India" | "The world" | "Trending">("India");
  const [activeSeason, setActiveSeason] = useState<string>("Winter");
  const [toast, setToast] = useState("");

  // Tabbed destinations
  const featured = activeTab === "India"
    ? destinations.filter((d) => d.country === "India").slice(0, 4)
    : activeTab === "The world"
    ? destinations.filter((d) => d.country !== "India").slice(0, 4)
    : destinations.filter((d) => Number(d.rating) >= 4.8).slice(0, 4);

  // Seasonal destinations
  const currentSeasonData = seasonalHighlights.find((s) => s.season === activeSeason) ?? seasonalHighlights[0];
  const seasonalDestinations = destinations.filter((d) => currentSeasonData.destinations.includes(d.slug));

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        {/* 1. Hero Section */}
        <section className="hero-section">
          <div className="hero-copy">
            <div className="kicker">
              <span className="kicker-line" /> {t("heroKicker")}
            </div>
            <h1>
              {t("heroTitle")}<br />
              <em>{t("heroTitleEm")}</em>
            </h1>
            <p className="hero-lede">
              {t("heroLede")}
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/planner">
                {t("heroBuildJourney")} <ArrowRight size={17} />
              </Link>
              <Link className="watch-link" href="/how-it-works">
                <span className="play-icon">
                  <ArrowRight size={12} />
                </span>
                {t("heroSeeHow")}
              </Link>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-photo" />
            <div className="hero-stamp">
              TRAVEL<br />
              <span>WITH INTENTION</span>
            </div>
            <div className="hero-caption">
              <span className="caption-dot" /> {t("heroCurated")}{" "}
              <span className="caption-rule" />
            </div>
          </div>
        </section>

        {/* 2. Top Search with prominent voice search & date calculation */}
        <TravelSearch
          onPlan={(place, dates, style) => {
            const destParam = place ? `destination=${encodeURIComponent(place)}` : "";
            const datesParam = dates ? `dates=${encodeURIComponent(dates)}` : "";
            const styleParam = style ? `style=${encodeURIComponent(style)}` : "";
            const query = [destParam, datesParam, styleParam].filter(Boolean).join("&");
            window.location.href = `/planner${query ? `?${query}` : ""}`;
          }}
        />

        {/* 3. Discover by Categories */}
        <section className="section-block categories-section">
          <div className="section-heading">
            <div>
              <div className="kicker">
                <span className="kicker-line" /> {t("categoriesTitle")}
              </div>
              <h2>
                Travel for the <em>senses.</em>
              </h2>
              <p className="section-subtitle">{t("categoriesSubtitle")}</p>
            </div>
            <Link className="text-link" href="/explore">
              View all places <ArrowRight size={16} />
            </Link>
          </div>

          <div className="category-cards-grid">
            {categoriesList.map((cat) => (
              <Link
                key={cat.name}
                href={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="category-card"
              >
                <span className="cat-icon">{cat.icon}</span>
                <div className="cat-info">
                  <strong>{cat.name}</strong>
                  <small>{cat.desc}</small>
                </div>
                <ArrowRight size={15} className="cat-arrow" />
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Curated Destinations with Tabs */}
        <section className="section-block intro-section">
          <div className="section-heading">
            <div>
              <div className="kicker">
                <span className="kicker-line" /> A LITTLE INSPIRATION
              </div>
              <h2>
                Places with a <em>point of view.</em>
              </h2>
            </div>
            <Link className="text-link" href="/explore">
              View all destinations <ArrowRight size={17} />
            </Link>
          </div>

          <div className="tab-row" role="tablist">
            {(["India", "The world", "Trending"] as const).map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "tab active" : "tab"}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "India" ? t("navIndia") : tab === "The world" ? t("navWorld") : "Trending"}
              </button>
            ))}
          </div>

          <div className="destination-grid-home">
            {featured.map((item, index) => (
              <DestinationCard key={item.slug} destination={item} featured={index === 0} />
            ))}
          </div>
        </section>

        {/* 5. Seasonal Recommendation System */}
        <section className="section-block seasonal-section">
          <div className="seasonal-container">
            <div className="seasonal-head">
              <div>
                <span className="eyebrow">✦ {t("seasonWhere")} ✦</span>
                <h2>{currentSeasonData.title}</h2>
                <p>{currentSeasonData.subtitle}</p>
              </div>

              <div className="season-selector-pills">
                {["Winter", "Summer", "Monsoon", "Spring / Autumn"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={activeSeason === s ? "season-pill active" : "season-pill"}
                    onClick={() => setActiveSeason(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="seasonal-dest-grid">
              {seasonalDestinations.map((dest) => (
                <DestinationCard key={dest.slug} destination={dest} />
              ))}
            </div>
          </div>
        </section>

        {/* 6. Incredible India Collection */}
        <section className="india-section">
          <div className="india-ribbon">✦ INDIA, IN ALL ITS WONDER ✦</div>
          <div className="section-heading light-heading">
            <div>
              <div className="kicker">
                <span className="kicker-line gold" /> MADE FOR THE DEEPLY CURIOUS
              </div>
              <h2>
                Somewhere between<br />
                <em>ritual & revelation.</em>
              </h2>
            </div>
            <Link className="text-link light-link" href="/india">
              Explore incredible India <ArrowRight size={17} />
            </Link>
          </div>
          <p className="india-lede">
            From the first chai at dawn in Varanasi to emerald backwaters in Kerala and high-altitude Himalayan clarity in Ladakh. Discover an India that lives far beyond the checklist.
          </p>
          <div className="collection-grid">
            {indiaCollections.map((item) => (
              <Link
                href={item.href}
                className="collection-item"
                key={item.label}
              >
                <span className="collection-icon">{item.icon}</span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.count}</small>
                </span>
                <ArrowRight size={17} />
              </Link>
            ))}
          </div>
        </section>

        {/* 7. AI Travel Planner Promo */}
        <section className="section-block planner-promo">
          <div className="planner-visual">
            <div className="planner-card">
              <div className="planner-card-top">
                <span className="tiny-label">YOUR NEXT ADVENTURE</span>
                <span className="status-pill">
                  <span /> AI CURATED
                </span>
              </div>
              <h3>
                Seven days of<br />
                <em>beautifully unscripted.</em>
              </h3>
              <div className="route-line">
                <span className="route-point" />
                <div>
                  <strong>Lisbon</strong>
                  <small>Day 01 — 03</small>
                </div>
                <span className="route-dash" />
                <div>
                  <strong>Sintra</strong>
                  <small>Day 04 — 05</small>
                </div>
                <span className="route-point filled" />
              </div>
              <div className="planner-footer">
                <span>
                  <Clock3 size={14} /> 7 days
                </span>
                <span>
                  <Users size={14} /> 2 travellers
                </span>
                <span>€ 1,240</span>
              </div>
            </div>
          </div>

          <div className="planner-copy">
            <div className="kicker">
              <span className="kicker-line" /> YOUR PERSONAL TRAVEL STUDIO
            </div>
            <h2>
              A little less<br />
              <em>searching.</em><br />
              A lot more <em>feeling.</em>
            </h2>
            <p>
              Tell us what makes you come alive. Our AI planner weaves together places, pace, realistic transit times, and the tiny details that make a trip truly yours.
            </p>
            <div className="planner-cta-group">
              <Link className="button button-dark" href="/planner">
                Meet your planner <ArrowRight size={17} />
              </Link>
              <Link className="outline-button" href="/compare">
                Compare destinations
              </Link>
            </div>
            <div className="trust-line">
              <Check size={15} /> No generic itineraries. Ever.
            </div>
          </div>
        </section>

        {/* 8. Why & How Trevexa Works */}
        <section className="section-block how-section">
          <div className="section-heading">
            <div>
              <div className="kicker">
                <span className="kicker-line" /> THE TRAVEXA STANDARD
              </div>
              <h2>
                How Trevexa <em>works.</em>
              </h2>
            </div>
          </div>

          <div className="how-cards-grid">
            <div className="how-card">
              <span className="how-num">01</span>
              <h3>Structured Discovery</h3>
              <p>Explore destinations with verified characteristics, transport modes, seasonal timing, and honest daily budgets.</p>
            </div>
            <div className="how-card">
              <span className="how-num">02</span>
              <h3>Intelligent AI Planning</h3>
              <p>Personalize routes, accommodation tiers, and packing checklists tailored specifically to your group and pace.</p>
            </div>
            <div className="how-card">
              <span className="how-num">03</span>
              <h3>Seamless Enrollment & Booking</h3>
              <p>Securely enroll in travel experiences with transparent UPI & card gateways and verifiable payment receipts.</p>
            </div>
          </div>
        </section>

        {/* 9. The World Regions */}
        <section className="world-strip">
          <div>
            <div className="kicker">
              <span className="kicker-line" /> THE WORLD IS WIDER THAN A WEEKEND
            </div>
            <h2>
              Go far.<br />
              <em>Stay present.</em>
            </h2>
          </div>
          <div className="world-circles">
            {worldRegions.map((region, i) => (
              <Link
                key={region}
                href={`/world?region=${encodeURIComponent(region)}`}
                className={`world-circle circle-${i}`}
              >
                <span>{region}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 10. Traveller Testimonials */}
        <section className="section-block reviews-home-section">
          <div className="section-heading">
            <div>
              <div className="kicker">
                <span className="kicker-line" /> FROM OUR TRAVELLERS
              </div>
              <h2>
                Journeys that <em>stayed with them.</em>
              </h2>
            </div>
            <Link className="text-link" href="/reviews">
              Read all reviews <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home-reviews-grid">
            <div className="home-review-card">
              <div className="review-stars">★★★★★</div>
              <p>&ldquo;The Kerala backwater and Munnar tea trail planned via Trevexa was so beautifully unhurried. Not a single wasted hour.&rdquo;</p>
              <div className="reviewer-info">
                <strong>Pooja & Siddharth M.</strong>
                <small>Kerala · 5 Days</small>
              </div>
            </div>

            <div className="home-review-card">
              <div className="review-stars">★★★★★</div>
              <p>&ldquo;From the Kyoto temple dawn walk to the bullet train connection, every single recommendation felt curated just for us.&rdquo;</p>
              <div className="reviewer-info">
                <strong>Karan V.</strong>
                <small>Kyoto & Tokyo · 7 Days</small>
              </div>
            </div>

            <div className="home-review-card">
              <div className="review-stars">★★★★★</div>
              <p>&ldquo;The UPI payment checkout was fast, and having the printable PDF receipt with full route details made travelling stress-free.&rdquo;</p>
              <div className="reviewer-info">
                <strong>Ananya R.</strong>
                <small>Goa Coastal Escape · 4 Days</small>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Final Call To Action */}
        <section className="section-block final-cta">
          <div className="final-quote">
            “The best journeys answer<br />
            questions you didn&apos;t know<br />
            <em>you had.</em>”
          </div>
          <div className="final-actions">
            <p>Whenever you&apos;re ready, your personal travel studio is here.</p>
            <Link className="button button-coral" href="/planner">
              Start Exploring <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      {/* Premium Footer with Full Multilingual Support */}
      <footer className="site-footer">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <span className="brand-mark">T</span>
            <span className="brand-text">TRAVEXA</span>
          </Link>
          <p>
            {t("brandTagline")}<br />
            {t("footerTagline")}
          </p>
        </div>

        <div className="footer-links">
          <div>
            <span>{t("footerExplore")}</span>
            <Link href="/india">{t("navIndia")}</Link>
            <Link href="/world">{t("navWorld")}</Link>
            <Link href="/explore">{t("navExplore")}</Link>
            <Link href="/india/12-jyotirlingas">12 Jyotirlingas</Link>
          </div>

          <div>
            <span>{t("footerMakeYours")}</span>
            <Link href="/planner">{t("navPlanner")}</Link>
            <Link href="/compare">{t("navCompare")}</Link>
            <Link href="/budget">Trip Budget Tool</Link>
            <Link href="/packing">Smart Packing List</Link>
          </div>

          <div>
            <span>{t("footerGoodToKnow")}</span>
            <Link href="/dashboard">{t("navSpace")}</Link>
            <Link href="/saved">{t("navSaved")}</Link>
            <Link href="/reviews">Traveller Reviews</Link>
            <Link href="/accessibility">{t("accessibilityTitle")}</Link>
            <Link href="/faq">FAQs</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t("footerRights")}</span>
          <span>{t("footerTagline")}</span>
          <span>EN · हिंदी · मराठी · INR</span>
        </div>
      </footer>

      <AIAssistant />

      {toast && (
        <button className="toast" onClick={() => setToast("")}>
          <Headphones size={16} /> {toast} <span>×</span>
        </button>
      )}
    </div>
  );
}
