"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Language, type I18nDictionary } from "@/lib/i18n";

export type { Language, I18nDictionary };

type Preferences = {
  language: Language;
  theme: "light" | "dark";
  textSize: "normal" | "large" | "xl";
  highContrast: boolean;
  reducedMotion: boolean;
};

type PreferencesContextValue = Preferences & {
  dictionary: I18nDictionary;
  t: (key: keyof I18nDictionary) => string;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
  setTextSize: (size: Preferences["textSize"]) => void;
  setHighContrast: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
};

const defaults: Preferences = {
  language: "EN",
  theme: "light",
  textSize: "normal",
  highContrast: false,
  reducedMotion: false,
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(defaults);

  useEffect(() => {
    const saved = window.localStorage.getItem("travexa-preferences");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        queueMicrotask(() => setPreferences((prev) => ({ ...prev, ...parsed })));
      } catch {}
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("travexa-preferences", JSON.stringify(preferences));
    const root = document.documentElement;
    root.lang = preferences.language === "हिंदी" ? "hi" : preferences.language === "मराठी" ? "mr" : "en";
    root.classList.toggle("theme-dark", preferences.theme === "dark");
    root.classList.toggle("text-large", preferences.textSize === "large");
    root.classList.toggle("text-xl", preferences.textSize === "xl");
    root.classList.toggle("high-contrast", preferences.highContrast);
    root.classList.toggle("motion-reduced", preferences.reducedMotion);
  }, [preferences]);

  const update = (patch: Partial<Preferences>) => setPreferences((current) => ({ ...current, ...patch }));

  const currentDict = translations[preferences.language] || translations.EN;
  const t = (key: keyof I18nDictionary): string => currentDict[key] || translations.EN[key] || key;

  return (
    <PreferencesContext.Provider
      value={{
        ...preferences,
        dictionary: currentDict,
        t,
        setLanguage: (language) => update({ language }),
        toggleTheme: () => update({ theme: preferences.theme === "dark" ? "light" : "dark" }),
        setTextSize: (textSize) => update({ textSize }),
        setHighContrast: (highContrast) => update({ highContrast }),
        setReducedMotion: (reducedMotion) => update({ reducedMotion }),
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    const defaultDict = translations.EN;
    return {
      ...defaults,
      dictionary: defaultDict,
      t: (key: keyof I18nDictionary) => defaultDict[key] || key,
      setLanguage: () => {},
      toggleTheme: () => {},
      setTextSize: () => {},
      setHighContrast: () => {},
      setReducedMotion: () => {},
    };
  }
  return context;
}

export function WelcomeGate({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t, highContrast, setHighContrast } = usePreferences();

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
    const welcomed = window.localStorage.getItem("travexa-welcomed");
    if (!welcomed) {
      queueMicrotask(() => setVisible(true));
    }
  }, []);

  if (!mounted) return <>{children}</>;
  if (!visible) return <>{children}</>;

  const enter = (path = "/") => {
    window.localStorage.setItem("travexa-welcomed", "1");
    setVisible(false);
    if (path !== "/") window.location.href = path;
  };

  return (
    <div className="welcome-screen" role="dialog" aria-modal="true" aria-label="Welcome to TRAVEXA">
      <div className="welcome-photo" aria-hidden="true" />
      <div className="welcome-grid" aria-hidden="true" />
      <div className="welcome-route" aria-hidden="true">
        <span />
        <i />
        <b />
      </div>
      <div className="welcome-particles" aria-hidden="true">
        ✦　·　✧　·　✦　·　✧
      </div>

      <div className="welcome-mark">T</div>

      <div className="welcome-tools">
        <label className="welcome-lang-select">
          <span className="sr-only">Language</span>
          <select value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
            <option value="EN">English (EN)</option>
            <option value="हिंदी">हिंदी (HI)</option>
            <option value="मराठी">मराठी (MR)</option>
          </select>
        </label>
        <button
          type="button"
          className="welcome-access-btn"
          onClick={() => setHighContrast(!highContrast)}
        >
          {highContrast ? "Normal Contrast" : "High Contrast"}
        </button>
      </div>

      <div className="welcome-copy">
        <span className="kicker welcome-kicker">✦ {t("welcomeKicker")} ✦</span>
        <h1>{t("welcomeTitle")}</h1>
        <p className="welcome-tagline">{t("welcomeSubtitle")}</p>
        <div className="welcome-steps-badge">
          <span>Discover</span> → <span>Plan</span> → <span>Travel</span>
        </div>
        <p className="welcome-description">{t("welcomeDesc")}</p>

        <div className="welcome-actions">
          <button className="button button-light" onClick={() => enter("/")}>
            {t("welcomeStart")} <span>↗</span>
          </button>
          <button className="button welcome-plan" onClick={() => enter("/planner")}>
            {t("welcomePlan")} <span>✦</span>
          </button>
        </div>
      </div>

      <div className="welcome-footer">
        <span>TRAVEXA / 2026</span>
        <span>{t("footerTagline")}</span>
        <span>{language} · INR</span>
      </div>
    </div>
  );
}
