/**
 * Motor de validación de coherencia energética
 * Basado en escalas oficiales RD 390/2021 – valores medios peninsulares
 */

// Rangos de consumo energético (kWh/m² año) para zona climática peninsular media
export const RANGOS_CONSUMO: Record<string, { min: number; max: number }> = {
  A: { min: 0, max: 30 },
  B: { min: 30.1, max: 50 },
  C: { min: 50.1, max: 85 },
  D: { min: 85.1, max: 130 },
  E: { min: 130.1, max: 190 },
  F: { min: 190.1, max: 260 },
  G: { min: 260.1, max: 9999 },
};

// Rangos de emisiones (kg CO₂/m² año) para zona climática peninsular media
export const RANGOS_EMISIONES: Record<string, { min: number; max: number }> = {
  A: { min: 0, max: 8 },
  B: { min: 8.1, max: 14 },
  C: { min: 14.1, max: 24 },
  D: { min: 24.1, max: 36 },
  E: { min: 36.1, max: 54 },
  F: { min: 54.1, max: 74 },
  G: { min: 74.1, max: 9999 },
};

// Gasto mensual estimado (€) por letra para una vivienda tipo (90m²)
export const GASTO_MENSUAL_POR_LETRA: Record<string, { min: number; max: number }> = {
  A: { min: 0, max: 35 },
  B: { min: 36, max: 55 },
  C: { min: 56, max: 85 },
  D: { min: 86, max: 130 },
  E: { min: 131, max: 190 },
  F: { min: 191, max: 260 },
  G: { min: 261, max: 9999 },
};

export const LETRAS = ["A", "B", "C", "D", "E", "F", "G"] as const;
export type Letra = (typeof LETRAS)[number];

export type Semaforo = "verde" | "amarillo" | "rojo";

export interface ResultadoValidacion {
  semaforo: Semaforo;
  mensaje: string;
  detalles: {
    consumoCoherente: boolean | null;
    emisionesCoherentes: boolean | null;
    diferenciaConsumo: number;
    diferenciaEmisiones: number;
  };
}

export interface Alerta {
  tipo: "error" | "warning" | "info" | "success";
  icono: string;
  titulo: string;
  descripcion: string;
}

/** Obtiene el índice numérico de una letra (A=0, G=6) */
function indiceLetra(letra: string): number {
  const idx = LETRAS.indexOf(letra.toUpperCase() as Letra);
  return idx === -1 ? 99 : idx;
}

/** Calcula cuántas letras de diferencia hay */
function diferenciaLetras(declarada: string, calculada: string): number {
  return indiceLetra(declarada) - indiceLetra(calculada);
}

/**
 * Calcula qué letra le corresponde a un valor según los rangos
 */
export function letraPorRango(
  valor: number,
  rangos: Record<string, { min: number; max: number }>
): string {
  for (const letra of LETRAS) {
    const rango = rangos[letra];
    if (valor >= rango.min && valor <= rango.max) return letra;
  }
  return "G";
}

/**
 * Valida coherencia entre letra declarada, consumo y emisiones
 */
export function validarCoherencia(
  letraDeclarada: string,
  consumo: number | null,
  emisiones: number | null
): ResultadoValidacion {
  const letra = letraDeclarada.toUpperCase();
  const idxDeclarada = indiceLetra(letra);

  if (idxDeclarada === 99) {
    return {
      semaforo: "rojo",
      mensaje: "La letra seleccionada no es válida. Debe ser de la A a la G.",
      detalles: { consumoCoherente: null, emisionesCoherentes: null, diferenciaConsumo: 0, diferenciaEmisiones: 0 },
    };
  }

  let consumoCoherente: boolean | null = null;
  let emisionesCoherentes: boolean | null = null;
  let diferenciaConsumo = 0;
  let diferenciaEmisiones = 0;

  // Validar consumo
  if (consumo !== null) {
    const letraConsumo = letraPorRango(consumo, RANGOS_CONSUMO);
    const idxConsumo = indiceLetra(letraConsumo);
    diferenciaConsumo = idxDeclarada - idxConsumo;
    consumoCoherente = Math.abs(diferenciaConsumo) <= 1;
  }

  // Validar emisiones
  if (emisiones !== null) {
    const letraEmisiones = letraPorRango(emisiones, RANGOS_EMISIONES);
    const idxEmisiones = indiceLetra(letraEmisiones);
    diferenciaEmisiones = idxDeclarada - idxEmisiones;
    emisionesCoherentes = Math.abs(diferenciaEmisiones) <= 1;
  }

  // Determinar semáforo global
  const maxDiferencia = Math.max(
    consumo !== null ? Math.abs(diferenciaConsumo) : 0,
    emisiones !== null ? Math.abs(diferenciaEmisiones) : 0
  );

  let semaforo: Semaforo;
  let mensaje: string;

  if (consumo === null && emisiones === null) {
    semaforo = "amarillo";
    mensaje = "No se pudieron validar los datos. Introduce al menos un valor numérico.";
  } else if (maxDiferencia <= 1) {
    semaforo = "verde";
    mensaje = "✅ Los datos son coherentes con la letra declarada.";
  } else if (maxDiferencia === 2) {
    semaforo = "amarillo";
    mensaje = "⚠️ Posible discrepancia leve. Los valores se desvían una letra de lo esperado.";
  } else {
    semaforo = "rojo";
    mensaje = "❌ Alerta: los números no cuadran con la letra. Revisa el certificado.";
  }

  return {
    semaforo,
    mensaje,
    detalles: { consumoCoherente, emisionesCoherentes, diferenciaConsumo, diferenciaEmisiones },
  };
}

/**
 * Valida que la fecha no sea futura
 */
export function validarFecha(fechaStr: string): { valida: boolean; mensaje: string } {
  if (!fechaStr) return { valida: true, mensaje: "" };

  const partes = fechaStr.split("/");
  if (partes.length !== 3) return { valida: true, mensaje: "" };

  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const anno = parseInt(partes[2], 10);
  const fecha = new Date(anno, mes, dia);

  if (isNaN(fecha.getTime())) return { valida: true, mensaje: "" };

  const hoy = new Date();
  if (fecha > hoy) {
    return {
      valida: false,
      mensaje: "❌ La fecha del certificado es futura. No puede ser válida.",
    };
  }

  return { valida: true, mensaje: "" };
}

/**
 * Extrae datos de un texto extraído de PDF mediante regex
 */
export function extraerDatosDeTexto(texto: string): {
  letra: string | null;
  consumo: number | null;
  emisiones: number | null;
  fecha: string | null;
} {
  const result: { letra: string | null; consumo: number | null; emisiones: number | null; fecha: string | null } = {
    letra: null,
    consumo: null,
    emisiones: null,
    fecha: null,
  };

  // Buscar letra de calificación
  const letraMatch = texto.match(
    /(?:Calificación energética|Calificación|Letra|Clase)\s*(?:de\s*eficiencia)?\s*:?\s*([A-G])/i
  );
  if (letraMatch) result.letra = letraMatch[1].toUpperCase();

  // Buscar consumo energético (kWh/m² año)
  const consumoMatch = texto.match(
    /(\d+[.,]?\d*)\s*kWh\/m²\s*(?:año|a|year)?/i
  );
  if (consumoMatch) {
    result.consumo = parseFloat(consumoMatch[1].replace(",", "."));
  }

  // Buscar emisiones (kg CO₂/m² año)
  const emisionesMatch = texto.match(
    /(\d+[.,]?\d*)\s*kg\s*CO2\/m²\s*(?:año|a|year)?/i
  );
  if (emisionesMatch) {
    result.emisiones = parseFloat(emisionesMatch[1].replace(",", "."));
  }

  // Buscar fecha en formato dd/mm/aaaa
  const fechaMatch = texto.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (fechaMatch) {
    result.fecha = `${fechaMatch[1]}/${fechaMatch[2]}/${fechaMatch[3]}`;
  }

  return result;
}

// ========================================================================
// NUEVAS FUNCIONES PARA EL COMPROBADOR MEJORADO
// ========================================================================

/**
 * Zonas climáticas españolas según CTE DB-HE
 * Mapeo simplificado por provincias (primeros 2 dígitos del CP)
 */
const ZONAS_CLIMATICAS: Record<string, { zona: string; desc: string }> = {
  // Madrid
  "28": { zona: "D", desc: "Continental seca" },
  // Barcelona, Tarragona, Lleida, Girona
  "08": { zona: "C", desc: "Mediterráneo" },
  "17": { zona: "D", desc: "Continental" },
  "25": { zona: "D", desc: "Continental" },
  "43": { zona: "C", desc: "Mediterráneo" },
  // Valencia, Alicante, Castellón
  "46": { zona: "B", desc: "Mediterráneo cálido" },
  "03": { zona: "B", desc: "Mediterráneo cálido" },
  "12": { zona: "C", desc: "Mediterráneo" },
  // Sevilla, Córdoba, Cádiz, Málaga, Huelva, Almería, Granada, Jaén
  "41": { zona: "A", desc: "Mediterráneo seco" },
  "14": { zona: "A", desc: "Mediterráneo seco" },
  "11": { zona: "A", desc: "Atlántico" },
  "29": { zona: "A", desc: "Mediterráneo cálido" },
  "21": { zona: "B", desc: "Mediterráneo" },
  "04": { zona: "A", desc: "Mediterráneo seco" },
  "18": { zona: "B", desc: "Mediterráneo" },
  "23": { zona: "A", desc: "Mediterráneo seco" },
  // País Vasco, Navarra, La Rioja
  "01": { zona: "D", desc: "Atlántico" },
  "48": { zona: "D", desc: "Atlántico" },
  "20": { zona: "D", desc: "Atlántico" },
  "31": { zona: "D", desc: "Continental" },
  "26": { zona: "D", desc: "Continental" },
  // Galicia
  "15": { zona: "C", desc: "Atlántico húmedo" },
  "27": { zona: "C", desc: "Atlántico húmedo" },
  "32": { zona: "C", desc: "Atlántico húmedo" },
  "36": { zona: "C", desc: "Atlántico húmedo" },
  // Castilla y León
  "05": { zona: "E", desc: "Continental frío" },
  "09": { zona: "E", desc: "Continental frío" },
  "24": { zona: "E", desc: "Continental frío" },
  "34": { zona: "E", desc: "Continental frío" },
  "37": { zona: "E", desc: "Continental frío" },
  "40": { zona: "E", desc: "Continental frío" },
  "42": { zona: "E", desc: "Continental frío" },
  "47": { zona: "E", desc: "Continental frío" },
  "49": { zona: "E", desc: "Continental frío" },
  // Castilla-La Mancha
  "02": { zona: "D", desc: "Continental seca" },
  "13": { zona: "D", desc: "Continental seca" },
  "16": { zona: "D", desc: "Continental seca" },
  "19": { zona: "D", desc: "Continental seca" },
  "45": { zona: "D", desc: "Continental seca" },
  // Aragón
  "22": { zona: "D", desc: "Continental" },
  "44": { zona: "D", desc: "Continental" },
  "50": { zona: "D", desc: "Continental" },
  // Extremadura
  "06": { zona: "C", desc: "Mediterráneo continental" },
  "10": { zona: "C", desc: "Mediterráneo continental" },
  // Murcia
  "30": { zona: "B", desc: "Mediterráneo seco" },
  // Baleares
  "07": { zona: "B", desc: "Mediterráneo" },
  // Canarias
  "35": { zona: "A", desc: "Subtropical" },
  "38": { zona: "A", desc: "Subtropical" },
};

/**
 * Obtiene la zona climática a partir del código postal
 */
export function zonaClimaticaPorCP(cp: string): { zona: string; desc: string } {
  const prefijo = cp.slice(0, 2);
  return ZONAS_CLIMATICAS[prefijo] || { zona: "C", desc: "Temperada (genérico)" };
}

/**
 * Estima qué letra le correspondería según el gasto mensual
 */
export function letraPorGastoMensual(gastoMensual: number): string {
  for (const letra of LETRAS) {
    const rango = GASTO_MENSUAL_POR_LETRA[letra];
    if (gastoMensual >= rango.min && gastoMensual <= rango.max) return letra;
  }
  return "G";
}

/**
 * Verifica si hay discrepancia entre la letra del certificado y el gasto real
 */
export function verificarDiscrepanciaGasto(
  letraCertificado: string,
  gastoMensual: number
): { hayDiscrepancia: boolean; letraEstimada: string; diferenciaLetras: number; mensaje: string } {
  const letraEstimada = letraPorGastoMensual(gastoMensual);
  const idxCert = indiceLetra(letraCertificado);
  const idxEst = indiceLetra(letraEstimada);
  const diff = idxCert - idxEst; // positivo = certificado mejor que real

  if (Math.abs(diff) <= 1) {
    return {
      hayDiscrepancia: false,
      letraEstimada,
      diferenciaLetras: diff,
      mensaje: "Tu gasto mensual es coherente con la letra del certificado.",
    };
  }

  if (diff > 1) {
    return {
      hayDiscrepancia: true,
      letraEstimada,
      diferenciaLetras: diff,
      mensaje: `Pagas ${gastoMensual}€/mes pero tu certificado dice ${letraCertificado}. Según tu gasto real, te correspondería una ${letraEstimada}. Es posible que la calificación esté inflada.`,
    };
  }

  return {
    hayDiscrepancia: false,
    letraEstimada,
    diferenciaLetras: diff,
    mensaje: "Tu gasto mensual es razonable para la letra declarada.",
  };
}

/**
 * Calcula el ahorro potencial estimado si se mejora la calificación
 * Basado en saltar 2 letras (ej: E→C, F→D)
 */
export function estimarAhorroPotencial(
  letraActual: string,
  gastoMensual: number
): { ahorroAnual: number; ahorroPorcentual: number; mensaje: string; letraObjetivo: string } {
  const idxActual = indiceLetra(letraActual);
  const idxObjetivo = Math.max(0, idxActual - 2); // mejorar 2 letras
  const letraObjetivo = LETRAS[idxObjetivo];

  // Estimación: cada letra de mejora ≈ 15-20% de ahorro
  const mejora = idxActual - idxObjetivo;
  const factorAhorro = mejora * 0.18;
  const ahorroAnual = Math.round(gastoMensual * 12 * factorAhorro);
  const ahorroPorcentual = Math.round(factorAhorro * 100);

  if (mejora <= 0) {
    return {
      ahorroAnual: 0,
      ahorroPorcentual: 0,
      letraObjetivo,
      mensaje: "Tu certificado ya tiene una buena calificación. El ahorro potencial es limitado.",
    };
  }

  return {
    ahorroAnual,
    ahorroPorcentual,
    letraObjetivo,
    mensaje: `Mejorando de ${letraActual} a ${letraObjetivo} podrías ahorrar hasta ${ahorroAnual}€ al año (${ahorroPorcentual}% de tu factura actual).`,
  };
}

/**
 * Comprueba si el certificado está caducado (>10 años desde emisión)
 */
export function comprobarCaducidad(fechaStr: string | null): { caducado: boolean; anos: number; mensaje: string } {
  if (!fechaStr) {
    return {
      caducado: false,
      anos: 0,
      mensaje: "",
    };
  }

  const partes = fechaStr.split("/");
  if (partes.length !== 3) return { caducado: false, anos: 0, mensaje: "" };

  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const anno = parseInt(partes[2], 10);
  const fecha = new Date(anno, mes, dia);

  if (isNaN(fecha.getTime())) return { caducado: false, anos: 0, mensaje: "" };

  const hoy = new Date();
  const diffMs = hoy.getTime() - fecha.getTime();
  const anos = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));

  if (anos > 10) {
    return {
      caducado: true,
      anos,
      mensaje: `⚠️ Este certificado tiene ${anos} años. Los certificados energéticos caducan a los 10 años. Deberías renovarlo.`,
    };
  }

  if (anos > 8) {
    return {
      caducado: false,
      anos,
      mensaje: `⏰ Este certificado tiene ${anos} años. Caducará en ${10 - anos} años. Te recomendamos renovarlo pronto.`,
    };
  }

  return {
    caducado: false,
    anos,
    mensaje: `✅ Certificado vigente (${anos} años de antigüedad).`,
  };
}

/**
 * Verifica potencial de subvenciones según zona climática y letra
 */
export function verificarPotencialSubvenciones(
  codigoPostal: string,
  letra: string
): { tienePotencial: boolean; mensaje: string } {
  const zona = zonaClimaticaPorCP(codigoPostal);

  // Las subvenciones suelen requerir saltar al menos 2 letras
  // y están disponibles para letras E, F, G mayoritariamente
  const idxLetra = indiceLetra(letra);

  if (idxLetra >= 4) {
    // E, F, G
    return {
      tienePotencial: true,
      mensaje: `Tu vivienda está en zona ${zona.zona} (${zona.desc}) y tu certificado es ${letra}. Las subvenciones Next Generation (hasta 12.000€) están disponibles para viviendas que necesitan mejorar su eficiencia. Con tu calificación actual, cumples los requisitos.`,
    };
  }

  if (idxLetra >= 2) {
    // C, D
    return {
      tienePotencial: false,
      mensaje: `Tu vivienda está en zona ${zona.zona} (${zona.desc}) y tu certificado es ${letra}. Aunque no estás en las peores letras, algunas comunidades autónomas ofrecen ayudas para mejoras puntuales. Consulta con un profesional.`,
    };
  }

  return {
    tienePotencial: false,
    mensaje: `Tu vivienda tiene una calificación ${letra} en zona ${zona.zona}. Al ser eficiente, las subvenciones principales no aplican. Sin embargo, siempre hay deducciones fiscales por reformas.`,
  };
}

/**
 * Genera todas las alertas personalizadas basadas en los datos recogidos
 */
export function generarAlertasPersonales(params: {
  letra: string;
  consumo: number | null;
  fecha: string | null;
  gastoMensual: number | null;
  codigoPostal: string;
}): Alerta[] {
  const alertas: Alerta[] = [];
  const { letra, fecha, gastoMensual, codigoPostal } = params;

  // Alerta 1: Caducidad
  const caducidad = comprobarCaducidad(fecha);
  if (caducidad.mensaje) {
    alertas.push({
      tipo: caducidad.caducado ? "error" : "warning",
      icono: caducidad.caducado ? "🚨" : "⏰",
      titulo: caducidad.caducado ? "Certificado caducado" : "Próximo a caducar",
      descripcion: caducidad.mensaje,
    });
  }

  // Alerta 2: Discrepancia letra vs gasto
  if (gastoMensual !== null && gastoMensual > 0) {
    const discrepancia = verificarDiscrepanciaGasto(letra, gastoMensual);
    if (discrepancia.hayDiscrepancia) {
      alertas.push({
        tipo: "error",
        icono: "💰",
        titulo: "Discrepancia entre tu gasto y la letra",
        descripcion: discrepancia.mensaje,
      });
    }
  }

  // Alerta 3: Potencial subvenciones
  if (codigoPostal && codigoPostal.length >= 5) {
    const subvenciones = verificarPotencialSubvenciones(codigoPostal, letra);
    if (subvenciones.tienePotencial) {
      alertas.push({
        tipo: "success",
        icono: "🏛️",
        titulo: "Potencial de subvenciones detectado",
        descripcion: subvenciones.mensaje,
      });
    }
  }

  // Alerta 4: Ahorro potencial
  if (gastoMensual !== null && gastoMensual > 0) {
    const ahorro = estimarAhorroPotencial(letra, gastoMensual);
    if (ahorro.ahorroAnual > 0) {
      alertas.push({
        tipo: "success",
        icono: "📈",
        titulo: `Ahorro potencial: hasta ${ahorro.ahorroAnual}€/año`,
        descripcion: ahorro.mensaje,
      });
    }
  }

  return alertas;
}