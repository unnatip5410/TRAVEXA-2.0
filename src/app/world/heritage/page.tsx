import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Star, Clock, ShieldCheck, Landmark } from "lucide-react";
import { RouteShell } from "@/components/RouteShell";
import { destinations } from "@/lib/data";

export default function WorldHeritagePage() {
  const heritageSites = destinations.filter(
    (d) =>
      d.characteristics?.includes("World Heritage") ||
      d.characteristics?.includes("Heritage") ||
      d.categoryType === "heritage" ||
      d.categoryType === "wonder"
  );

  return (
    <RouteShell
      eyebrow="✦ LIVING TREASURES OF HUMANITY ✦"
      title={<>UNESCO <em>World Heritage.</em></>}
      intro="Culturally profound and naturally breathtaking sites recognized by UNESCO for their outstanding universal value to humanity."
    >
      <div className="heritage-intro">
        <div>
          <Landmark size={26} />
          <strong>PROTECTED CULTURAL & NATURAL LEGACIES</strong>
          <p>
            From the monolithic rock-cut cave temples of Ellora and the ruins of the Vijayanagara Empire in Hampi to the rose-red stone facades of Petra and the mist-shrouded citadel of Machu Picchu — explore sustainable, respectful itineraries to the world&apos;s most cherished heritage sites.
          </p>
        </div>
        <Link className="button button-coral" href="/planner">
          Plan Heritage Circuit <ArrowRight size={16} />
        </Link>
      </div>

      <div className="heritage-full-grid">
        {heritageSites.map((site) => (
          <div className="heritage-card" key={site.slug}>
            <div
              className="heritage-image"
              style={{ backgroundImage: `url(${site.image})` }}
            >
              <span className="heritage-badge">
                <ShieldCheck size={13} /> UNESCO HERITAGE
              </span>
              <span className="heritage-country-badge">{site.country}</span>
            </div>

            <div className="heritage-body">
              <div className="heritage-meta-top">
                <span className="heritage-rating">
                  <Star size={14} fill="currentColor" /> {site.rating}
                </span>
                <span className="heritage-time">
                  <Clock size={14} /> {site.duration}
                </span>
                <span className="heritage-season">
                  Best: {site.bestTime}
                </span>
              </div>

              <h3>{site.name}</h3>
              <p className="heritage-location">
                <MapPin size={14} /> {site.region}, {site.country}
              </p>
              <p className="heritage-tag">{site.tag}</p>
              <p className="heritage-desc">{site.description}</p>

              <div className="heritage-pills">
                {site.knownFor.slice(0, 3).map((item) => (
                  <span key={item} className="heritage-pill-item">
                    ✦ {item}
                  </span>
                ))}
              </div>

              <div className="heritage-footer">
                <div className="heritage-budget">
                  <small>From</small>
                  <strong>{site.budget}</strong>
                </div>
                <div className="heritage-actions">
                  <Link
                    href={`/destination/${site.slug}`}
                    className="button button-dark small"
                  >
                    View Site <ArrowRight size={14} />
                  </Link>
                  <Link
                    href={`/enroll/${site.slug}`}
                    className="button button-coral small"
                  >
                    Enroll Trip
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
