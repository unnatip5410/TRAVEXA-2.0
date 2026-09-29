import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Star, Clock } from "lucide-react";
import { RouteShell } from "@/components/RouteShell";
import { destinations, jyotirlingas } from "@/lib/data";

export default function JyotirlingaPage() {
  const jyotirlingaDests = jyotirlingas.flatMap(([name, location, slug], index) => {
    const dest = destinations.find((d) => d.slug === slug);
    if (!dest || dest.categoryType !== "jyotirlinga") return [];
    return {
      index: index + 1,
      name,
      location,
      slug,
      image: dest.image,
      tag: dest.tag,
      description: dest.description,
      rating: dest.rating,
      bestTime: dest.bestTime,
      duration: dest.duration,
      budget: dest.budget,
      state: dest.state ?? location.split(", ")[1] ?? "India",
      knownFor: dest.knownFor,
    };
  });

  return (
    <RouteShell
      eyebrow="✦ A SACRED CIRCUIT OF INDIA ✦"
      title={<>The 12 Sacred <em>Jyotirlingas.</em></>}
      intro="A comprehensive guide to India's twelve most revered Shiva shrines of infinite light. Plan a single darshan or map the full nationwide circuit."
    >
      <div className="pilgrimage-intro">
        <div>
          <Sparkles size={24} />
          <strong>THE TRAVEXA SACRED PILGRIMAGE EDIT</strong>
          <p>
            From the wave-swept shores of Somnath in Gujarat to the snowbound peaks of Kedarnath in Uttarakhand and the southern seas of Rameshwaram, discover verified darshan timings, traditional dress codes, and route planning for all twelve sacred shrines.
          </p>
        </div>
        <Link className="button button-dark" href="/planner">
          Plan Pilgrimage <ArrowRight size={16} />
        </Link>
      </div>

      <div className="pilgrimage-full-grid">
        {jyotirlingaDests.map((temple) => (
          <div className="pilgrimage-temple-card" key={temple.slug}>
            <div
              className="temple-card-image"
              style={{ backgroundImage: `url(${temple.image})` }}
            >
              <span className="temple-index">
                {String(temple.index).padStart(2, "0")} / 12
              </span>
              <span className="temple-state-badge">{temple.state}</span>
            </div>

            <div className="temple-card-body">
              <div className="temple-meta-top">
                <span className="temple-rating">
                  <Star size={14} fill="currentColor" /> {temple.rating}
                </span>
                <span className="temple-time">
                  <Clock size={14} /> {temple.duration}
                </span>
              </div>

              <h3>{temple.name}</h3>
              <p className="temple-location">
                <MapPin size={14} /> {temple.location}
              </p>
              <p className="temple-desc">{temple.tag}</p>

              <div className="temple-features">
                {temple.knownFor.slice(0, 2).map((kf) => (
                  <span key={kf} className="temple-feature-pill">
                    ✦ {kf}
                  </span>
                ))}
              </div>

              <div className="temple-card-footer">
                <div className="temple-budget">
                  <small>From</small>
                  <strong>{temple.budget}</strong>
                </div>
                <div className="temple-actions">
                  <Link
                    href={`/destination/${temple.slug}`}
                    className="button button-dark small"
                  >
                    View Guide <ArrowRight size={14} />
                  </Link>
                  <Link
                    href={`/enroll/${temple.slug}`}
                    className="button button-coral small"
                  >
                    Book Darshan
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
