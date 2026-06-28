// ===== FUENTE ÚNICA DE VERDAD — Formatos =====
// Toda la web debe utilizar exactamente el mismo formato.

export const FMT = {
  precio: (v: number) => `${v}€`,
  precioIva: (v: number) => `${v}€ (IVA incluido)`,
  porcentaje: (v: number) => `${v}%`,
  metrosCuadrados: (v: number) => `${v}m²`,
  horas: (v: number) => `${v}h`,
  fecha: (d: Date) => d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" }),
  normativa: (rd: string) => `RD ${rd}`,
  telefonoNacional: (num: string) => {
    const cleaned = num.replace(/\s/g, "");
    if (cleaned.startsWith("+34")) {
      return cleaned.replace(/(\+34)(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
    }
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
  },
} as const;
