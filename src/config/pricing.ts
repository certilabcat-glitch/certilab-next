// ===== FUENTE ÚNICA DE VERDAD — Precios =====
// Todos los precios de la web deben obtenerse desde aquí.

export const MONEDA = { codigo: "EUR", simbolo: "€", sufijo: "€" } as const;
export const IVA = { incluido: true, texto: "IVA incluido", textoCorto: "IVA inc." } as const;

export const PRECIOS = {
  segundaOpinion: 59,
  segundaOpinionExpress: 79,
  informeTecnico: 399,
  checkUpInmobiliario: 199,
} as const;

export function fmtPrecio(valor: number): string { return `${valor}${MONEDA.sufijo}`; }
export function fmtPrecioConIVA(valor: number): string { return `${fmtPrecio(valor)} (${IVA.textoCorto})`; }
