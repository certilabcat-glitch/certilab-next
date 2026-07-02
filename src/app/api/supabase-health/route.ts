import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // 1. Check env vars
    const envCheck = {
      NEXT_PUBLIC_SUPABASE_URL: !!supabaseUrl,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!supabaseAnonKey,
      SUPABASE_SERVICE_ROLE_KEY: !!serviceRoleKey,
    };

    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      return NextResponse.json(
        {
          status: "error",
          message: "Faltan variables de entorno de Supabase",
          env: envCheck,
        },
        { status: 500 },
      );
    }

    // 2. Ping Supabase REST API (health check on the project)
    const response = await fetch(
      `${supabaseUrl}/rest/v1/`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
      },
    );

    return NextResponse.json({
      status: "ok",
      message: "Conexión con Supabase establecida correctamente",
      timestamp: new Date().toISOString(),
      projectRef: supabaseUrl.match(/https:\/\/([^.]+)/)?.[1],
      apiResponseStatus: response.status,
      env: envCheck,
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Error desconocido al conectar con Supabase";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}