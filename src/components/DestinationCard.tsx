"use client";

import Link from "next/link";
import { ArrowUpRight, Heart, MapPin, Share2, Star, Sparkles } from "lucide-react";
import { useState } from "react";
import type { Destination } from "@/lib/data";
import { useFavorites } from "@/lib/favorites";
import { usePreferences } from "@/components/Preferences";

export function DestinationCard({
  destination,
  featured = false,
}: {
  destination: Destination;
  featured?: boolean;
}) {
  const { isSaved, toggleFavorite } = useFavorites();
  const { t } = usePreferences();
  const [shared, setShared] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const saved = isSaved(destination.slug);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/destination/${destination.slug}`);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(destination.slug);
  };

  return (
    <article className={`destination-card ${featured ? "featured-card" : ""}`}>
      <div className="destination-image">
        {!imageFailed && (
          <img
            src={destination.image}
            alt={`${destination.name} landscape in ${destination.country}`}
            loading={featured ? "eager" : "lazy"}
            fetchPriority={featured ? "high" : "auto"}
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        )}
        {imageFailed && (
          <div className="image-fallback" aria-label={`${destination.name} image`}>
            <span>TRAVEXA</span>
            <strong>{destination.name}</strong>
          </div>
        )}

        <span className="image-tag">{destination.tag}</span>

        <button
          className={`heart-button ${saved ? "saved" : ""}`}
          aria-label={saved ? `Remove ${destination.name} from saved` : `Save ${destination.name}`}
          onClick={handleSave}
          title={saved ? t("cardSaved") : t("cardSave")}
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="destination-copy">
        <div className="eyebrow">
          <MapPin size={13} /> {destination.region} · {destination.country}
        </div>

        <Link href={`/destination/${destination.slug}`}>
          <h3 className="destination-card-title">{destination.name}</h3>
        </Link>

        <p>{destination.description}</p>

        {/* Characteristics / Tags */}
        <div className="destination-tags">
          {(destination.characteristics ?? destination.tags ?? []).slice(0, 3).map((tag) => (
            <span key={tag} className="char-badge">
              {tag}
            </span>
          ))}
        </div>

        <div className="card-meta">
          <span className="rating-pill">
            <Star size={14} fill="currentColor" /> {destination.rating}
          </span>
          <span className="time-pill">{destination.bestTime}</span>
          <span className="budget-pill">
            {t("cardFrom")} <strong>{destination.budget}</strong>
          </span>
        </div>

        <div className="card-actions">
          <Link href={`/destination/${destination.slug}`} className="card-action primary">
            <ArrowUpRight size={15} /> {t("cardViewDetails")}
          </Link>
          <Link href={`/planner?destination=${destination.slug}`} className="card-action">
            <Sparkles size={14} /> {t("cardPlan")}
          </Link>
          <button
            className="card-action share-btn"
            onClick={handleShare}
            aria-label={`Share ${destination.name}`}
            title="Copy share link"
          >
            <Share2 size={14} /> {shared ? t("cardCopied") : t("cardShare")}
          </button>
        </div>
      </div>
    </article>
  );
}
