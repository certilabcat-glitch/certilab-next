// ===== Re-exportaciones desde la Fuente Unica de Verdad =====
// Este archivo mantiene compatibilidad con codigo existente.
// Para codigo nuevo, importa directamente desde "@/config".

import { COMPANY, RESPONSABLE, CONTACTO, UBICACION, HORARIO, REDES_SOCIALES, META_IDS } from "@/config/company";
import { MONEDA, IVA, PRECIOS, fmtPrecio, fmtPrecioConIVA } from "@/config/pricing";
import { SERVICIOS } from "@/config/services";
export type { Servicio } from "@/config/services";
import { CATALOGO_CTAS } from "@/config/cta";
export type { CtaOficial } from "@/config/cta";
import { TERMINOS_PERMITIDOS, TERMINOS_PROHIBIDOS } from "@/config/glossary";
import { FMT } from "@/config/formatting";

// Re-exportar todo
export { COMPANY, RESPONSABLE, CONTACTO, UBICACION, HORARIO, REDES_SOCIALES, META_IDS };
export { MONEDA, IVA, PRECIOS, fmtPrecio, fmtPrecioConIVA };
export { SERVICIOS };
export { CATALOGO_CTAS };
export { TERMINOS_PERMITIDOS, TERMINOS_PROHIBIDOS };
export { FMT };

// === Legacy exports (compatibilidad con codigo existente) ===
export const SITE_URL = COMPANY.url;
export const WHATSAPP_NUMBER = CONTACTO.whatsappNumero;
export const WHATSAPP_URL = CONTACTO.whatsappUrl;
export const META_PIXEL_ID = META_IDS.fbAppId;
export const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://tu-n8n.com/webhook/lead-certilab";

export const EVA_INFO = {
  name: RESPONSABLE.nombreCompleto,
  title: RESPONSABLE.titulo,
  colegio: RESPONSABLE.credencialColegio,
  experiencia: RESPONSABLE.experiencia,
  seguro: RESPONSABLE.seguro,
};
