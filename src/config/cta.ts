// ===== FUENTE ÚNICA DE VERDAD — Catálogo oficial de CTAs =====
// Máximo 20 CTAs. Ningún CTA puede escribirse manualmente si ya existe aquí.

export interface CtaOficial {
  id: string;
  texto: string;
  tipo: "primario" | "secundario" | "whatsapp" | "informacion";
  href: string;
  paginas: string[];
}

export const CATALOGO_CTAS: Record<string, CtaOficial> = {
  "so-revisar": {
    id: "so-revisar",
    texto: "Revisar mi certificado por 59€",
    tipo: "primario",
    href: "/segunda-opinion/",
    paginas: ["home", "blog", "landing"],
  },
  "so-como-funciona": {
    id: "so-como-funciona",
    texto: "Cómo funciona →",
    tipo: "secundario",
    href: "#servicios",
    paginas: ["home"],
  },
  "express-solicitar": {
    id: "express-solicitar",
    texto: "Solicitar Express",
    tipo: "whatsapp",
    href: "/segunda-opinion-express/",
    paginas: ["segunda-opinion-express"],
  },
  "express-volver": {
    id: "express-volver",
    texto: "→ Volver a la estándar (59€)",
    tipo: "secundario",
    href: "/segunda-opinion/",
    paginas: ["segunda-opinion-express"],
  },
  "home-listopro": {
    id: "home-listopro",
    texto: "¿Quieres saber si tu certificado es fiable?",
    tipo: "primario",
    href: "/segunda-opinion/",
    paginas: ["home"],
  },
  "blog-no-te-fias": {
    id: "blog-no-te-fias",
    texto: "¿No te fías de tu certificado?",
    tipo: "primario",
    href: "/segunda-opinion/",
    paginas: ["blog"],
  },
  "blog-necesitas-analisis": {
    id: "blog-necesitas-analisis",
    texto: "¿Necesitas análisis de viabilidad?",
    tipo: "primario",
    href: "/informe-tecnico-energetico/",
    paginas: ["blog"],
  },
  "blog-revisar-mi": {
    id: "blog-revisar-mi",
    texto: "Revisar mi certificado →",
    tipo: "primario",
    href: "/segunda-opinion/",
    paginas: ["blog"],
  },
  "blog-solicitar-informe": {
    id: "blog-solicitar-informe",
    texto: "Solicitar Informe →",
    tipo: "primario",
    href: "/informe-tecnico-energetico/",
    paginas: ["blog"],
  },
  "informe-solicitar": {
    id: "informe-solicitar",
    texto: "Solicitar Informe Técnico (399€)",
    tipo: "whatsapp",
    href: "/informe-tecnico-energetico/",
    paginas: ["informe-tecnico-energetico"],
  },
  "checkup-solicitar": {
    id: "checkup-solicitar",
    texto: "Solicitar Check-Up",
    tipo: "whatsapp",
    href: "/check-up-inmobiliario/",
    paginas: ["check-up-inmobiliario"],
  },
} as const;
