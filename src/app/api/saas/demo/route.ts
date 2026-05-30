import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, empresa, tipo } = body;

    // Validación básica
    if (!nombre || !email || !telefono || !tipo) {
      return NextResponse.json(
        { error: "Campos obligatorios faltantes" },
        { status: 400 }
      );
    }

    // Aquí se integraría con un CRM/email (ej: Resend, SendGrid, etc.)
    // Por ahora registramos en consola
    console.log("[SaaS Demo Lead]", { nombre, email, telefono, empresa, tipo });

    // TODO: Enviar email de notificación
    // TODO: Guardar en base de datos/CRM

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SaaS Demo API] Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}