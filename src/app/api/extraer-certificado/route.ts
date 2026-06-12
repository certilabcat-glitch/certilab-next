import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint para extraer datos de un certificado energético en PDF.
 *
 * Por ahora implementa:
 * - Recepción del archivo
 * - Simulación de extracción (para desarrollo sin pdfplumber en Node)
 * - Detección de PDF imagen
 *
 * En producción se conectaría con un microservicio Python (pdfplumber)
 * o se usaría pdf-parse en Node.
 */

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se recibió ningún archivo." },
        { status: 400 }
      );
    }

    // Validar que sea PDF
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "El archivo debe ser un PDF." },
        { status: 400 }
      );
    }

    // Validar tamaño máximo (10 MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 10 MB." },
        { status: 400 }
      );
    }

    // Leer el contenido del PDF como texto
    const buffer = Buffer.from(await file.arrayBuffer());
    const textContent = buffer.toString("utf-8");

    // Si el contenido no tiene texto legible, probablemente es un PDF imagen
    // Los PDFs con texto tienen una densidad de caracteres imprimibles > 30%
    const printableChars = (textContent.match(/[A-Za-z0-9\s.,;:!?()/-]/g) || [])
      .length;
    const textRatio = printableChars / textContent.length;

    if (textRatio < 0.15 || textContent.length < 100) {
      return NextResponse.json(
        {
          imagePdf: true,
          error:
            "Parece que tu PDF es una imagen escaneada. No se puede extraer texto automáticamente.",
        },
        { status: 400 }
      );
    }

    // Extraer datos con expresiones regulares
    const datos = extraerDatos(textContent);

    if (!datos.letra) {
      return NextResponse.json({
        letraEncontrada: false,
        consumo: datos.consumo,
        emisiones: datos.emisiones,
        fecha: datos.fecha || null,
        mensaje:
          "No se ha podido detectar la calificación energética en el PDF. Introduce los datos manualmente.",
      });
    }

    return NextResponse.json(datos);
  } catch (error) {
    console.error("Error procesando PDF:", error);
    return NextResponse.json(
      { error: "Error interno al procesar el PDF." },
      { status: 500 }
    );
  }
}

interface DatosExtraidos {
  letra: string;
  consumo: number | null;
  emisiones: number | null;
  fecha: string;
}

function extraerDatos(texto: string): DatosExtraidos {
  // Normalizar el texto: eliminar saltos de línea excesivos, normalizar espacios
  const textoNormalizado = texto
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+/g, " ")
    .trim();

  // 1. Buscar letra de calificación energética
  // Patrones comunes: "Calificación energética: A", "Letra: B", "Clase energética C", etc.
  const letraPatterns = [
    /(?:Calificación\s*energética|Clase\s*energ[ée]tica|Letra|Calificaci[óo]n)\s*:?\s*([A-G])/i,
    /(?:Calificación\s*energética|Clase\s*energ[ée]tica|Letra)\s*(?:actual|final)?\s*:?\s*([A-G])/i,
    /(?:consumo\s*de\s*energ[íi]a|energ[íi]a\s*primaria)[\s\S]{0,50}?([A-G])\b/i,
  ];

  let letra = "";
  for (const pattern of letraPatterns) {
    const match = textoNormalizado.match(pattern);
    if (match) {
      letra = match[1].toUpperCase();
      break;
    }
  }

  // 2. Buscar consumo de energía primaria (kWh/m² año)
  const consumoPatterns = [
    /(\d{2,4}(?:[.,]\d{1,2})?)\s*kWh\/m[²2]\s*(?:año|any)/i,
    /consumo\s*(?:de\s*)?energ[íi]a\s*(?:primaria)?\s*(?:anual|anual)?\s*:?\s*(\d{2,4}(?:[.,]\d{1,2})?)/i,
    /(\d{2,4}(?:[.,]\d{1,2})?)\s*kWh\/m2/i,
  ];

  let consumo: number | null = null;
  for (const pattern of consumoPatterns) {
    const match = textoNormalizado.match(pattern);
    if (match) {
      consumo = parseFloat(match[1].replace(",", "."));
      if (consumo >= 10 && consumo <= 2000) {
        break;
      }
      consumo = null;
    }
  }

  // 3. Buscar emisiones (kg CO₂/m² año)
  const emisionesPatterns = [
    /(\d{1,3}(?:[.,]\d{1,2})?)\s*kg\s*CO[₂2]\s*\/\s*m[²2]\s*(?:año|any)/i,
    /emisiones\s*(?:de\s*)?(?:CO2|CO₂|di[oó]xido)\s*(?:anuales)?\s*:?\s*(\d{1,3}(?:[.,]\d{1,2})?)/i,
    /(\d{1,3}(?:[.,]\d{1,2})?)\s*kg\s*CO2\/m2/i,
  ];

  let emisiones: number | null = null;
  for (const pattern of emisionesPatterns) {
    const match = textoNormalizado.match(pattern);
    if (match) {
      emisiones = parseFloat(match[1].replace(",", "."));
      if (emisiones >= 1 && emisiones <= 500) {
        break;
      }
      emisiones = null;
    }
  }

  // 4. Buscar fecha
  const fechaPatterns = [
    /(\d{2}\/\d{2}\/\d{4})/,
    /(\d{2}-\d{2}-\d{4})/,
    /(\d{2}\.\d{2}\.\d{4})/,
  ];

  let fecha = "";
  for (const pattern of fechaPatterns) {
    const match = textoNormalizado.match(pattern);
    if (match) {
      fecha = match[1];
      // Validar que sea una fecha real (mes 01-12, día 01-31)
      const partes = match[1].split(/[/.\-]/);
      if (partes.length === 3) {
        const mes = parseInt(partes[1], 10);
        const dia = parseInt(partes[0], 10);
        if (mes >= 1 && mes <= 12 && dia >= 1 && dia <= 31) {
          break;
        }
      }
    }
  }

  return { letra, consumo, emisiones, fecha };
}