"use client";

/** Captura parámetros UTM, fbclid y gclid de la URL actual */
export function useUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
  ];
  const utm: Record<string, string> = {};
  keys.forEach((key) => {
    const val = params.get(key);
    if (val) utm[key] = val;
  });
  return utm;
}

/** Versión no-hook de useUtm para usar fuera de componentes React */
export function getUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
  ];
  const utm: Record<string, string> = {};
  keys.forEach((key) => {
    const val = params.get(key);
    if (val) utm[key] = val;
  });
  return utm;
}

/** Convierte fbclid → fbc (Facebook Click ID) para CAPI */
export function getFbc(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  return fbclid
    ? `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}`
    : undefined;
}

/** Obtiene _fbp (Facebook Browser Pixel) desde cookie */
export function getFbp(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const match = document.cookie.match(/(?:^|;\s*)_fbp=([^;]*)/);
    return match?.[1];
  } catch {
    return undefined;
  }
}
