"use client";

import Link from "next/link";
import { Bell, Heart, Menu, Moon, Search, Send, Sparkles, Sun, UserRound, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { usePreferences, type Language } from "@/components/Preferences";
import { useFavorites } from "@/lib/favorites";
import { VoiceButton } from "@/components/VoiceButton";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, theme, toggleTheme, setLanguage, t } = usePreferences();
  const { favorites } = useFavorites();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="TRAVEXA home">
        <span className="brand-mark">T</span>
        <span className="brand-text">TRAVEXA</span>
      </Link>

      <nav className={open ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
        <Link href="/explore" onClick={() => setOpen(false)}>{t("navExplore")}</Link>
        <Link href="/india" onClick={() => setOpen(false)}>{t("navIndia")}</Link>
        <Link href="/world" onClick={() => setOpen(false)}>{t("navWorld")}</Link>
        <Link href="/planner" onClick={() => setOpen(false)}>{t("navPlanner")}</Link>
        <Link href="/compare" onClick={() => setOpen(false)}>{t("navCompare")}</Link>
      </nav>

      <div className="header-actions">
        <Link className="icon-button hide-mobile" href="/explore" aria-label="Search destinations">
          <Search size={19} />
        </Link>

        <Link className="icon-button header-saved-btn" href="/saved" aria-label="Saved destinations">
          <Heart size={18} />
          {favorites.length > 0 && <span className="header-badge">{favorites.length}</span>}
        </Link>

        <button className="icon-button hide-mobile" aria-label="Toggle dark mode" onClick={toggleTheme}>
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <div className="language-menu">
          <button
            className="language-button"
            aria-expanded={languageOpen}
            onClick={() => setLanguageOpen(!languageOpen)}
          >
            {language} <span className="arrow-down">⌄</span>
          </button>
          {languageOpen && (
            <div className="language-options">
              {(["EN", "हिंदी", "मराठी"] as Language[]).map((option) => (
                <button
                  key={option}
                  className={language === option ? "active" : ""}
                  onClick={() => {
                    setLanguage(option);
                    setLanguageOpen(false);
                  }}
                >
                  {option === "EN" ? "English (EN)" : option === "हिंदी" ? "हिंदी (HI)" : "मराठी (MR)"}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link className="profile-button hide-mobile" href="/account">
          <UserRound size={17} />
          <span>{t("navSpace")}</span>
        </Link>

        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

export function AIAssistant() {
  const { t } = usePreferences();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "ai"; text: string; destinationSlug?: string }>>([
    {
      sender: "ai",
      text: "Hello! I am your TRAVEXA AI Travel Assistant. Tell me where you would like to go, your preferred season, travel style, or budget, and I will craft tailored suggestions for you.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (value = message) => {
    const text = value.trim();
    if (!text) return;
    setMessage("");
    setChatHistory((prev) => [...prev, { sender: "user", text }]);
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      const answer = data.answer ?? data.error ?? "I could not find a specific match, but I can help you plan across India or the World!";
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.mode === "local-engine" ? `${answer} (Local catalog guidance; provider AI is not configured.)` : answer,
          destinationSlug: data.destination,
        },
      ]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I am currently using offline mode. I can still guide you through Kerala, Goa, Kashmir, Rajasthan, Kyoto, Amalfi, and Swiss Alps.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    t("aiPrompt1"),
    t("aiPrompt2"),
    t("aiPrompt3"),
    t("aiPrompt4"),
    t("aiPrompt5"),
    t("aiPrompt6"),
  ];

  const clearChat = () => {
    setChatHistory([
      {
        sender: "ai",
        text: "Conversation cleared. Where would your curiosity like to go next?",
      },
    ]);
  };

  return (
    <>
      <button className="ai-float" type="button" aria-label="Open TRAVEXA AI travel assistant" onClick={() => setOpen(true)}>
        <span className="ai-orb">
          <Sparkles size={18} />
        </span>
        <span>
          <strong>{t("aiTitle")}</strong>
          <small>{t("aiSubtitle")}</small>
        </span>
        <span className="ai-arrow">↗</span>
      </button>

      {open && (
        <div className="ai-modal-backdrop" role="presentation" onClick={() => setOpen(false)}>
          <section
            className="ai-modal"
            role="dialog"
            aria-modal="true"
            aria-label={t("aiTitle")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ai-modal-head">
              <div className="ai-head-title">
                <span className="eyebrow">
                  <Sparkles size={13} className="sparkle-gold" /> {t("aiTitle")}
                </span>
                <h2>{t("aiSubtitle")}</h2>
              </div>
              <div className="ai-head-actions">
                <button
                  className="icon-button clear-chat-btn"
                  type="button"
                  onClick={clearChat}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="ai-messages-container">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`ai-message-row ${msg.sender === "user" ? "user-row" : "ai-row"}`}
                >
                  {msg.sender === "ai" && (
                    <span className="ai-avatar">
                      <Sparkles size={14} />
                    </span>
                  )}
                  <div className={`ai-bubble ${msg.sender === "user" ? "user-bubble" : "ai-bubble-content"}`}>
                    <p>{msg.text}</p>
                    {msg.destinationSlug && (
                      <Link
                        href={`/destination/${msg.destinationSlug}`}
                        className="ai-destination-link"
                        onClick={() => setOpen(false)}
                      >
                        Explore {msg.destinationSlug} ↗
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="ai-message-row ai-row">
                  <span className="ai-avatar">
                    <Sparkles size={14} />
                  </span>
                  <div className="ai-bubble ai-bubble-content thinking">
                    <span className="dot-flashing" /> Thinking about your ideal journey...
                  </div>
                </div>
              )}
            </div>

            <div className="ai-quick-actions">
              <span className="quick-action-label">Suggested:</span>
              <div className="quick-scroll">
                {quickActions.map((action) => (
                  <button key={action} type="button" onClick={() => sendMessage(action)}>
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="ai-form"
              onSubmit={(e) => {
                e.preventDefault();
                void sendMessage();
              }}
            >
              <div className="ai-input-wrap">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("aiPlaceholder")}
                  aria-label="Ask TRAVEXA AI"
                />
                <VoiceButton
                  onText={(text) => {
                    setMessage(text);
                    void sendMessage(text);
                  }}
                  label="Speak your question"
                  className="ai-voice-btn"
                />
              </div>
              <button type="submit" aria-label={t("aiSend")} disabled={!message.trim()}>
                <Send size={17} />
              </button>
            </form>

            <Link className="ai-planner-link" href="/planner" onClick={() => setOpen(false)}>
              {t("aiFullPlanner")}
            </Link>
          </section>
        </div>
      )}
    </>
  );
}
