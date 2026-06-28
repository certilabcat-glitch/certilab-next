// ===== FUENTE ÚNICA DE VERDAD — Servicios =====
// Cada servicio se define UNA SOLA VEZ.

import { PRECIOS, fmtPrecio } from "./pricing";

export interface Servicio {
  id: string;
  slug: string;
  nombreOficial: string;
  nombreCorto: string;
  descripcionCorta: string;
  descripcionLarga: string;
  precio: number;
  plazo: string;
  ctaTexto: string;
  color: string;
  keywords: string[];
}

export const SERVICIOS: Record<string, Servicio> = {
  segundaOpinion: {
    id: "segunda-opinion",
    slug: "/segunda-opinion/",
    nombreOficial: "Segunda Opinión Certificado Energético",
    nombreCorto: "Segunda Opinión",
    descripcionCorta: "Revisión técnica independiente de tu certificado energético",
    descripcionLarga: "Análisis forense completo del certificado energético con detección de errores, cálculo del Brown Discount y dictamen técnico firmado.",
    precio: PRECIOS.segundaOpinion,
    plazo: "24-48 horas",
    ctaTexto: `Revisar mi certificado por ${fmtPrecio(PRECIOS.segundaOpinion)}`,
    color: "#1a1a1a",
    keywords: ["segunda opinion", "certificado energetico", "revision", "dictamen tecnico"],
  },
  segundaOpinionExpress: {
    id: "segunda-opinion-express",
    slug: "/segunda-opinion-express/",
    nombreOficial: "Segunda Opinión Express",
    nombreCorto: "Express",
    descripcionCorta: "El mismo análisis, con entrega urgente en menos de 4 horas",
    descripcionLarga: "Mismo análisis forense que la Segunda Opinión estándar con entrega prioritaria en menos de 4 horas laborables.",
    precio: PRECIOS.segundaOpinionExpress,
    plazo: "Menos de 4 horas (L-V 9-18h)",
    ctaTexto: "Solicitar Express",
    color: "#c4a882",
    keywords: ["segunda opinion", "express", "urgente", "entrega rapida"],
  },
  informeTecnico: {
    id: "informe-tecnico",
    slug: "/informe-tecnico-energetico/",
    nombreOficial: "Informe Técnico Energético",
    nombreCorto: "Informe Técnico",
    descripcionCorta: "Análisis completo con propuestas de mejora y mapa de ayudas",
    descripcionLarga: "Estudio técnico integral de la vivienda con propuestas de mejora priorizadas, cálculo de rentabilidad y mapa de ayudas y subvenciones disponibles.",
    precio: PRECIOS.informeTecnico,
    plazo: "5-7 días",
    ctaTexto: "Solicitar Informe Técnico",
    color: "#2d2d2d",
    keywords: ["informe tecnico", "rehabilitacion", "mejora energetica", "ayudas"],
  },
  checkUpInmobiliario: {
    id: "check-up-inmobiliario",
    slug: "/check-up-inmobiliario/",
    nombreOficial: "Check-Up Inmobiliario",
    nombreCorto: "Check-Up",
    descripcionCorta: "Análisis completo antes de comprar o vender",
    descripcionLarga: "Evaluación técnica integral de todos los documentos energéticos de un inmueble antes de una transacción inmobiliaria.",
    precio: PRECIOS.checkUpInmobiliario,
    plazo: "3-5 días",
    ctaTexto: "Solicitar Check-Up",
    color: "#1a3a5c",
    keywords: ["check up", "inmobiliario", "compraventa", "evaluacion"],
  },
} as const;
