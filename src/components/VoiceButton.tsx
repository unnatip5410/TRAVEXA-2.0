"use client";

import { Mic, MicOff } from "lucide-react";
import { useRef, useState } from "react";

type SpeechRecognitionInstance = {
  lang: string;
  continuous?: boolean;
  interimResults?: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
};

export function VoiceButton({
  onText,
  label = "Use voice search",
  className = ""
}: {
  onText: (text: string) => void;
  label?: string;
  className?: string;
}) {
  const [listening, setListening] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const speak = () => {
    if (typeof window === "undefined") return;

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const speech = window as SpeechWindow;
    const Recognition = speech.SpeechRecognition ?? speech.webkitSpeechRecognition;

    if (!Recognition) {
      setErrorStatus("Voice is not supported in this browser.");
      return;
    }

    try {
      const recognition = new Recognition();
      recognitionRef.current = recognition;
      recognition.lang = "en-IN";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          onText(transcript.trim());
        }
        setListening(false);
      };

      recognition.onerror = (e) => {
        const errors: Record<string, string> = { "not-allowed": "Microphone permission was denied. You can type your search instead.", "permission-denied": "Microphone permission was denied. You can type your search instead.", "no-speech": "No speech was detected. Try again or type your search.", "network": "Voice recognition needs a network connection. You can type your search instead." };
        setErrorStatus(errors[e?.error] ?? "Voice recognition stopped unexpectedly. You can type your search instead.");
        setListening(false);
        recognitionRef.current = null;
      };

      recognition.onend = () => {
        setListening(false);
        recognitionRef.current = null;
      };

      setListening(true);
      setErrorStatus(null);
      recognition.start();
    } catch (err) {
      setErrorStatus(err instanceof Error ? err.message : "Unable to start voice recognition.");
      setListening(false);
    }
  };

  return (
    <>
    <button
      type="button"
      className={`voice-button ${listening ? "listening" : ""} ${className}`}
      aria-label={listening ? "Listening... click to stop" : label}
      title={listening ? "Listening... click to stop" : label}
      onClick={speak}
    >
      {listening ? <MicOff size={18} /> : <Mic size={18} />}
    </button>
    {errorStatus && <span className="voice-error" role="status">{errorStatus}</span>}
    </>
  );
}
