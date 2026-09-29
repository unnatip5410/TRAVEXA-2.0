"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "travexa-favorites";

export function getSavedSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

export function saveSlug(slug: string): boolean {
  const current = getSavedSlugs();
  const exists = current.includes(slug);
  const updated = exists ? current.filter((s) => s !== slug) : [...current, slug];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("travexa-favorites-changed"));
  } catch {}
  return !exists;
}

export function isSlugSaved(slug: string): boolean {
  return getSavedSlugs().includes(slug);
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    queueMicrotask(() => setFavorites(getSavedSlugs()));
    fetch("/api/saved", { cache: "no-store" }).then(async (response) => { if (!response.ok) return; const data = await response.json(); const slugs = (data.saved ?? []).map((entry: { destination: { slug: string } }) => entry.destination.slug); setFavorites(slugs); localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs)); }).catch(() => {});
    const handler = () => setFavorites(getSavedSlugs());
    window.addEventListener("travexa-favorites-changed", handler);
    return () => window.removeEventListener("travexa-favorites-changed", handler);
  }, []);

  const toggleFavorite = (slug: string) => {
    const wasSaved = favorites.includes(slug);
    saveSlug(slug);
    void fetch(wasSaved ? `/api/saved?slug=${encodeURIComponent(slug)}` : "/api/saved", wasSaved ? { method: "DELETE" } : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug }) }).catch(() => {});
    setFavorites(getSavedSlugs());
  };

  return { favorites, toggleFavorite, isSaved: (slug: string) => favorites.includes(slug) };
}
