import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Star, Clock, Globe } from "lucide-react";
import { RouteShell } from "@/components/RouteShell";
import { destinations, sevenWondersList } from "@/lib/data";

export default function SevenWondersPage() {
  const wonders = sevenWondersList.map((w, index) => {
    const dest = destinations.find((d) => d.slug === w.slug);
    return {
      index: index + 1,
      name: w.name,
      location: w.location,
      slug: w.slug,
      tag: w.tag,
      image: dest?.image ?? "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85",
      description: dest?.description ?? "Icon of human genius and monumental architecture.",
      rating: dest?.rating ?? "4.9",
      bestTime: dest?.bestTime ?? "Year round",
      duration: dest?.duration ?? "3–5 days",
      budget: dest?.budget ?? "₹35,000",
      country: dest?.country ?? w.location.split(", ")[1] ?? "World",
      characteristics: dest?.characteristics ?? ["7 Wonders", "Heritage", "World Heritage"],
    };
  });

  return (
    <RouteShell
      eyebrow="✦ THE PINNACLE OF HUMAN INGENUITY ✦"
      title={<>The 7 Wonders <em>of the World.</em></>}
      intro="The official New Seven Wonders of the World. Monumental feats of architecture, culture, and endurance spanning four continents."
    >
      <div className="wonders-intro">
        <div>
          <Globe size={26} />
          <strong>GLOBAL HERITAGE ICONS</strong>
          <p>
            Voted by over 100 million people worldwide, these seven extraordinary landmarks represent the pinnacle of ancient and medieval human craftsmanship. Explore verified arrival routes, optimal photography hours, and local guides for each wonder.
          </p>
        </div>
        <Link className="button button-coral" href="/planner">
          Plan a Wonder Trip <ArrowRight size={16} />
        </Link>
      </div>

      <div className="wonders-full-grid">
        {wonders.map((wonder) => (
          <div className="wonder-card" key={wonder.slug}>
            <div
              className="wonder-image"
              style={{ backgroundImage: `url(${wonder.image})` }}
            >
              <span className="wonder-badge">
                WONDER 0{wonder.index}
              </span>
              <span className="wonder-country-badge">{wonder.country}</span>
            </div>

            <div className="wonder-body">
              <div className="wonder-meta-top">
                <span className="wonder-rating">
                  <Star size={14} fill="currentColor" /> {wonder.rating}
                </span>
                <span className="wonder-time">
                  <Clock size={14} /> {wonder.duration}
                </span>
                <span className="wonder-season">
                  Best: {wonder.bestTime}
                </span>
              </div>

              <h3>{wonder.name}</h3>
              <p className="wonder-location">
                <MapPin size={14} /> {wonder.location}
              </p>
              <p className="wonder-tag">{wonder.tag}</p>
              <p className="wonder-desc">{wonder.description}</p>

              <div className="wonder-footer">
                <div className="wonder-budget">
                  <small>Estimated Spend</small>
                  <strong>{wonder.budget}</strong>
                </div>
                <div className="wonder-actions">
                  <Link
                    href={`/destination/${wonder.slug}`}
                    className="button button-dark small"
                  >
                    Explore Wonder <ArrowRight size={14} />
                  </Link>
                  <Link
                    href={`/enroll/${wonder.slug}`}
                    className="button button-coral small"
                  >
                    Book Experience
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </RouteShell>
  );
}
