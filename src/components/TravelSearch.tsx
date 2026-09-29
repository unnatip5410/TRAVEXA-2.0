"use client";

import { ChevronDown, ChevronLeft, ChevronRight, Sparkles, X, Calendar as CalendarIcon, MapPin, Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { destinations } from "@/lib/data";
import { VoiceButton } from "@/components/VoiceButton";
import { usePreferences } from "@/components/Preferences";

const popular = ["Goa", "Kerala", "Kashmir", "Ladakh", "Jaipur", "Udaipur", "Hampi", "Manali", "Kyoto", "Swiss Alps", "Bali", "Dubai", "Paris", "Amalfi Coast"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pad = (value: number) => String(value).padStart(2, "0");
const isoDate = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

function calculateDaysBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

function Calendar({
  startDate,
  endDate,
  onSelect,
  onClose
}: {
  startDate: string;
  endDate: string;
  onSelect: (date: string) => void;
  onClose: () => void;
}) {
  const initial = new Date();
  const [month, setMonth] = useState(initial.getMonth());
  const [year, setYear] = useState(initial.getFullYear());

  const move = (amount: number) => {
    const next = new Date(year, month + amount, 1);
    setMonth(next.getMonth());
    setYear(next.getFullYear());
  };

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, index) =>
    index < firstDay ? null : index - firstDay + 1
  );

  const durationDays = startDate && endDate ? calculateDaysBetween(startDate, endDate) : 0;

  return (
    <div className="calendar-popup" role="dialog" aria-label="Choose travel dates">
      <div className="calendar-head">
        <button type="button" onClick={() => move(-1)} aria-label="Previous month">
          <ChevronLeft size={18} />
        </button>
        <strong>
          {months[month]} {year}
        </strong>
        <button type="button" onClick={() => move(1)} aria-label="Next month">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="calendar-week">
        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
      </div>

      <div className="calendar-grid">
        {cells.map((day, index) => {
          const value = day ? isoDate(new Date(year, month, day)) : "";
          const selected = value === startDate || value === endDate;
          const inRange = Boolean(startDate && endDate && value > startDate && value < endDate);
          return (
            <button
              type="button"
              className={selected ? "calendar-day selected" : inRange ? "calendar-day in-range" : "calendar-day"}
              disabled={!day}
              key={`${value}-${index}`}
              onClick={() => value && onSelect(value)}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="calendar-hint">
        {startDate ? (
          endDate ? (
            <span>
              <strong>{startDate} → {endDate}</strong> ({durationDays} days)
            </span>
          ) : (
            <span>Selected start: <strong>{startDate}</strong>. Click an end date.</span>
          )
        ) : (
          <span>Select your journey departure date</span>
        )}
      </div>

      <div className="calendar-actions">
        <button
          type="button"
          className="calendar-done-btn"
          onClick={onClose}
        >
          Confirm Dates
        </button>
      </div>
    </div>
  );
}

export function TravelSearch({ onPlan }: { onPlan: (destination: string, dates: string, style?: string) => void }) {
  const { t } = usePreferences();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [style, setStyle] = useState("");

  const suggestions = useMemo(() => {
    const query = destination.trim().toLowerCase();
    if (!query) {
      return popular.map((name) => destinations.find((item) => item.name === name)).filter(Boolean) as typeof destinations;
    }
    return destinations.filter((item) => {
      const searchContent = `${item.name} ${item.country} ${item.region} ${item.state ?? ""} ${item.city ?? ""} ${(item.tags ?? []).join(" ")} ${(item.characteristics ?? []).join(" ")}`.toLowerCase();
      return searchContent.includes(query);
    }).slice(0, 8);
  }, [destination]);

  const selectDate = (date: string) => {
    if (!startDate || endDate || date < startDate) {
      setStartDate(date);
      setEndDate("");
      return;
    }
    setEndDate(date);
    setDateOpen(false);
  };

  const duration = startDate && endDate ? calculateDaysBetween(startDate, endDate) : null;
  const dateLabel = startDate
    ? endDate
      ? `${startDate} → ${endDate} (${duration}d)`
      : `${startDate} → End date`
    : t("searchChooseDates");

  return (
    <div className="search-panel">
      <div className="search-intro">
        <Sparkles size={20} className="sparkle-gold" />
        <div>
          <strong>{t("searchWhereTo")}</strong>
          <span>{t("heroCurated")}</span>
        </div>
      </div>

      <div className="search-fields">
        {/* Destination Field with prominent Voice search */}
        <div className="search-field destination-field">
          <div className="field-header">
            <span>{t("searchDestination")}</span>
            <VoiceButton
              onText={(text) => {
                setDestination(text);
                setFocus(true);
              }}
              label="Speak destination"
            />
          </div>

          <div className="input-with-clear">
            <input
              value={destination}
              onFocus={() => setFocus(true)}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchDestination")}
            />
            {destination && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setDestination("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {focus && (
            <div className="suggestions" role="listbox">
              <div className="suggestions-top">
                <strong>{destination ? t("searchMatching") : t("searchPopular")}</strong>
                <button type="button" onClick={() => setFocus(false)} aria-label="Close suggestions">
                  <X size={15} />
                </button>
              </div>
              {suggestions.length > 0 ? (
                suggestions.map((item) => (
                  <button
                    type="button"
                    className="suggestion"
                    key={item.slug}
                    onClick={() => {
                      setDestination(item.name);
                      setFocus(false);
                    }}
                  >
                    <div>
                      <span className="suggestion-name">{item.name}</span>
                      <small className="suggestion-meta">
                        <MapPin size={11} /> {item.region} · {item.country}
                      </small>
                    </div>
                    <span className="suggestion-tag">{item.tag}</span>
                  </button>
                ))
              ) : (
                <div className="no-suggestions">
                  <p>No places found matching &ldquo;{destination}&rdquo;</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Date Field with Interactive Calendar */}
        <div className="search-field date-field">
          <div className="field-header">
            <span>{t("searchWhen")}</span>
            <CalendarIcon size={14} className="field-icon-header" />
          </div>
          <button
            type="button"
            className="field-button"
            onClick={() => setDateOpen(!dateOpen)}
            aria-expanded={dateOpen}
          >
            {dateLabel}
          </button>
          <ChevronDown size={15} className="dropdown-arrow" />

          {dateOpen && (
            <Calendar
              startDate={startDate}
              endDate={endDate}
              onSelect={selectDate}
              onClose={() => setDateOpen(false)}
            />
          )}

          <div className="quick-dates">
            {["Next month", "Winter", "Summer", "Monsoon", "Flexible"].map((quick) => (
              <button
                type="button"
                key={quick}
                onClick={() => {
                  setStartDate(quick);
                  setEndDate("");
                  setDateOpen(false);
                }}
              >
                {quick}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Style Field */}
        <label className="search-field style-field">
          <div className="field-header">
            <span>{t("searchTravelStyle")}</span>
          </div>
          <select value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="">{t("searchStylePlaceholder")}</option>
            <option value="Slow & soulful">Slow & soulful</option>
            <option value="Food & culture">Food & culture</option>
            <option value="Adventure">Adventure</option>
            <option value="Nature & Wildlife">Nature & Wildlife</option>
            <option value="Family">Family</option>
            <option value="Romantic">Romantic</option>
            <option value="Luxury">Luxury</option>
            <option value="Budget">Budget</option>
          </select>
          <ChevronDown size={15} className="dropdown-arrow" />
        </label>

        {/* Plan CTA */}
        <button
          className="search-submit"
          onClick={() => onPlan(destination, endDate ? `${startDate},${endDate}` : startDate, style)}
          aria-label={t("searchPlanAI")}
        >
          <Sparkles size={17} /> <span>{t("searchPlanAI")}</span>
        </button>
      </div>
    </div>
  );
}
