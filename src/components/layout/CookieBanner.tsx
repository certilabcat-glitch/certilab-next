"use client";

import { useState } from "react";

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

export default function CookieBanner() {
  const [consent, setConsentState] = useState<Consent>(() => {
    // Solo se ejecuta una vez, en el primer render del cliente
    if (typeof window === "undefined") return null;
    return getConsent();
  });

  if (consent !== null) return null;

  const handleAccept = () => {
    setConsent("all");
    setConsentState("all");
  };

  const handleEssential = () => {
    setConsent("essential");
    setConsentState("essential");
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Modal */}
      <div
        id="cookie-banner"
        role="alert"
        aria-live="polite"
        className="relative max-w-[520px] w-full bg-[#0A0A0A] text-[#F5EFE6] p-8 shadow-2xl animate-[fadeIn_0.3s_ease]"
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