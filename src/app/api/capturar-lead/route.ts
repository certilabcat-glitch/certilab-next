import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint para capturar leads del Comprobador de coherencia energética.
 *
 * Almacena: nombre, email, resultado del análisis (letra, consumo, emisiones, semáforo),
 * gasto mensual estimado, código postal.
 *
 * Por ahora guarda en console.log (modo desarrollo).
 * En producción se conectaría con:
 *  - Google Sheets API (vía service account)
 *  - O una base de datos (Supabase, PostgreSQL, etc.)
 *  - O un CRM vía webhook
 */

interface LeadData {
  nombre: string;
  email: string;
  origen: string;
  letra?: string;
  consumo?: number | null;
  emisiones?: number | null;
  resultado?: string; // "verde" | "amarillo" | "rojo"
  gastoMensual?: number | null;
  codigoPostal?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadData;

    // Validar campos obligatorios
    if (!body.email) {
      return NextResponse.json(
        { error: "Email es obligatorio." },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "El email no tiene un formato válido." },
        { status: 400 }
      );
    }

    // Preparar datos para almacenar
    const lead = {
      nombre: body.nombre || "",
      email: body.email,
      origen: body.origen || "desconocido",
      letra: body.letra || null,
      consumo: body.consumo ?? null,
      emisiones: body.emisiones ?? null,
      resultado: body.resultado || null,
      gastoMensual: body.gastoMensual ?? null,
      codigoPostal: body.codigoPostal || null,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "desconocida",
      userAgent: request.headers.get("user-agent") || "desconocido",
    };

    // LOG: En desarrollo registramos en consola
    console.log("=== NUEVO LEAD CAPTURADO ===");
    console.log(JSON.stringify(lead, null, 2));
    console.log("============================");

    // Aquí se integraría con:
    // - Google Sheets: https://docs.google.com/spreadsheets/d/...
    // - Supabase: await supabase.from('leads').insert(lead)
    // - Email: nodemailer o Resend para enviar el PDF prometido

    return NextResponse.json({
      success: true,
      message: "Gracias por tu interés. En breve recibirás tu informe de alertas.",
    });
  } catch (error) {
    console.error("Error capturando lead:", error);
    return NextResponse.json(
      { error: "Error interno al procesar la solicitud." },
      { status: 500 }
    );
  }
}