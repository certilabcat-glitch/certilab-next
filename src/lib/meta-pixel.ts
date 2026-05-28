"use client";

import { getFbc, getFbp, useUtm } from "./utm";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

/** Evento PageView */
export function trackPageView() {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", "PageView");
  }
}

/** Evento Lead — cuando alguien se convierte en lead */
export function trackLead(data?: Record<string, unknown>) {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", "Lead", {
      content_name: "lead",
      content_category: "lead",
      value: 0,
      currency: "EUR",
      ...data,
    });
  }
}

/** Evento ViewContent — cuando alguien ve contenido */
export function trackViewContent(data?: Record<string, unknown>) {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", "ViewContent", data);
  }
}

/** Evento Contact — clic en WhatsApp, teléfono, email */
export function trackContact(data?: Record<string, unknown>) {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", "Contact", data);
  }
}

/** Evento Search — búsquedas en el sitio */
export function trackSearch(data?: Record<string, unknown>) {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", "Search", data);
  }
}

/** Envía evento al servidor mediante Conversions API (CAPI) */
export async function trackServerEvent(
  eventName: string,
  options?: {
    email?: string;
    phone?: string;
    url?: string;
    customData?: Record<string, unknown>;
  }
) {
  try {
    await fetch("/api/meta/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        email: options?.email,
        phone: options?.phone,
        url:
          options?.url ||
          (typeof window !== "undefined" ? window.location.href : ""),
        fbc: getFbc(),
        fbp: getFbp(),
        customData: {
          ...options?.customData,
          utms: useUtm(),
        },
      }),
    });
  } catch (error) {
    console.error("[Meta CAPI] Error:", error);
  }
}

/**
 * Helper completo: dispara Lead tanto en píxel (cliente) como en CAPI (servidor).
 * Úsalo en formularios, landing pages, etc.
 */
export async function trackLeadComplete(options?: {
  contentName?: string;
  email?: string;
  phone?: string;
  value?: number;
  currency?: string;
  customData?: Record<string, unknown>;
}) {
  const eventData = {
    content_name: options?.contentName || "lead",
    content_category: "lead",
    value: options?.value ?? 0,
    currency: options?.currency || "EUR",
    ...options?.customData,
  };

  // Píxel (cliente)
  trackLead(eventData);

  // CAPI (servidor)
  await trackServerEvent("Lead", {
    email: options?.email,
    phone: options?.phone,
    customData: eventData,
  });
}
