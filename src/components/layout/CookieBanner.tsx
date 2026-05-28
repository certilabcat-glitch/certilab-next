"use client";

import { useState, useEffect } from "react";
import { META_PIXEL_ID } from "@/lib/constants";

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

export default function CookieBanner() {
  const [show, setShow] = useState<boolean>(() => getConsent() === null);

  useEffect(() => {
    const consent = getConsent();
    if (consent === "all") {
      loadMetaPixel();
    }
  }, []);

  const handleAccept = () => {
    setConsent("all");
    setShow(false);
    loadMetaPixel();
  };

  const handleEssential = () => {
    setConsent("essential");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div id="cookie-banner" role="alert" aria-live="polite" className="cookie-banner">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text">
          Utilizamos cookies técnicas esenciales para el funcionamiento del sitio
          y cookies analíticas (Meta Pixel) para medir resultados. Puedes aceptar
          todas o solo las técnicas.{" "}
          <a href="/cookies/">Más info</a>
        </p>
        <div className="cookie-banner-actions">
          <button
            className="cookie-btn cookie-btn--secondary"
            onClick={handleEssential}
          >
            Solo técnicas
          </button>
          <button
            className="cookie-btn cookie-btn--primary"
            onClick={handleAccept}
          >
            Aceptar todas
          </button>
        </div>
      </div>

      <style jsx>{`
        .cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--color-black);
          color: var(--color-crema);
          z-index: 200;
          padding: 1.5rem;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .cookie-banner-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .cookie-banner-text {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          line-height: 1.6;
          margin: 0;
          flex: 1;
          min-width: 280px;
        }
        .cookie-banner-text a {
          color: var(--color-terra-light);
          text-decoration: underline;
        }
        .cookie-banner-actions {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        .cookie-btn {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          padding: 0.6rem 1.25rem;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .cookie-btn:hover {
          opacity: 0.8;
        }
        .cookie-btn--primary {
          background: var(--color-crema);
          color: var(--color-black);
        }
        .cookie-btn--secondary {
          background: transparent;
          color: var(--color-crema);
          border: 1px solid var(--color-crema);
        }

        @media (max-width: 600px) {
          .cookie-banner-inner {
            flex-direction: column;
            text-align: center;
          }
          .cookie-banner-actions {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}