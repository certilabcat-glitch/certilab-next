"use client";

import { useSyncExternalStore } from "react";
import { META_PIXEL_ID } from "@/lib/constants";
import styles from "./CookieBanner.module.css";

const STORAGE_KEY = "certilab_cookies_accepted";
const EXPIRY_DAYS = 365;

type Consent = "all" | "essential" | null;

function getConsent(): Consent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.expires && Date.now() > data.expires) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data.choice;
  } catch {
    return null;
  }
}

function setConsent(choice: "all" | "essential") {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        choice,
        timestamp: Date.now(),
        expires: Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000,
      })
    );
  } catch {
    /* storage no disponible */
  }
}

type FbqFn = {
  (...args: unknown[]): void;
  push?: FbqFn;
  loaded?: boolean;
  version?: string;
  queue?: unknown[];
};

function loadMetaPixel() {
  if (typeof window === "undefined") return;
  const w = window as Window & { fbq?: FbqFn; _fbq?: FbqFn };
  if (typeof w.fbq === "function") return;

  const script = document.createElement("script");
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  script.async = true;
  document.head.appendChild(script);

  const fbq: FbqFn = function (...args: unknown[]) {
    fbq.queue!.push(args);
  };

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  w.fbq = fbq;
  if (!w._fbq) w._fbq = fbq;
  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

const CONSENT_EVENT = "certilab-consent-change";

function subscribeToStorage(callback: () => void): () => void {
  // Evento nativo solo se dispara en OTRAS pestañas
  window.addEventListener("storage", callback);
  // Evento personalizado para la MISMA pestaña
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

export default function CookieBanner() {
  // useSyncExternalStore:
  // - subscribe: escucha cambios en localStorage (storage event entre pestañas)
  //   + callback propio para cuando setConsent se llama desde este componente
  // - getConsent: lee snapshot actual
  // - () => null: server snapshot (SSR) para evitar hydration mismatch
  const consent = useSyncExternalStore(
    subscribeToStorage,
    getConsent,
    () => null
  );

  // Cargar Meta Pixel si ya había consentimiento previo "all"
  // Esto se ejecuta en cada cambio de consent, pero loadMetaPixel tiene guard
  if (consent === "all") {
    loadMetaPixel();
  }

  const handleAccept = () => {
    setConsent("all");
    loadMetaPixel();
    // Notifica a useSyncExternalStore para re-render (misma + otras pestañas)
    window.dispatchEvent(new Event(CONSENT_EVENT));
    window.dispatchEvent(new Event("storage"));
  };

  const handleEssential = () => {
    setConsent("essential");
    window.dispatchEvent(new Event(CONSENT_EVENT));
    window.dispatchEvent(new Event("storage"));
  };

  // SSR: consent = null (server snapshot), pero show = false porque
  // no hay window. En cliente, si consent es null, mostramos.
  const show = typeof window !== "undefined" && consent === null;

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Modal */}
      <div
        id="cookie-banner"
        role="alert"
        aria-live="polite"
        className={`relative max-w-[520px] w-full bg-[#0A0A0A] text-[#F5EFE6] p-8 shadow-2xl ${styles.banner}`}
      >
        <p className="font-sans text-sm leading-relaxed m-0 mb-5">
          Utilizamos cookies técnicas esenciales para el funcionamiento del sitio
          y cookies analíticas (Meta Pixel) para medir resultados. Puedes aceptar
          todas o solo las técnicas.{" "}
          <a href="/cookies/" className="text-[#c4a97d] underline whitespace-nowrap">
            Más info
          </a>
        </p>
        <div className="flex gap-3 justify-center">
          <button
            className="font-sans text-xs tracking-widest px-5 py-2.5 border-0 cursor-pointer uppercase font-medium transition-opacity duration-200 hover:opacity-80 bg-transparent text-[#F5EFE6] border border-solid border-[#F5EFE6]"
            onClick={handleEssential}
          >
            Solo técnicas
          </button>
          <button
            className="font-sans text-xs tracking-widest px-5 py-2.5 border-0 cursor-pointer uppercase font-medium transition-opacity duration-200 hover:opacity-80 bg-[#F5EFE6] text-[#0A0A0A]"
            onClick={handleAccept}
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}