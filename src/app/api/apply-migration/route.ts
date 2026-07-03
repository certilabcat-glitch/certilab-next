import { NextResponse } from "next/server";

const PROJECT_REF = "vcntmgnebdoptnldvumd";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET() {
  try {
    // Read the SQL migration
    const sql = `
DO $$ BEGIN
  CREATE TYPE estado_expediente AS ENUM (
    'pendiente', 'pago_pendiente', 'pago_recibido', 'expediente_creado',
    'en_revision', 'informe_enviado', 'cerrado', 'rechazado', 'cancelado'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS expedientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_expediente TEXT NOT NULL,
  cliente_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  estado estado_expediente NOT NULL DEFAULT 'pendiente',
  servicio TEXT NOT NULL DEFAULT 'segunda_opinion',
  titulo TEXT,
  notas TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_expedientes_cliente_id ON expedientes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_expedientes_estado ON expedientes(estado);

ALTER TABLE expedientes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clientes pueden ver sus propios expedientes" ON expedientes;
CREATE POLICY "Clientes pueden ver sus propios expedientes"
  ON expedientes FOR SELECT TO authenticated USING (cliente_id = auth.uid());

DROP POLICY IF EXISTS "Clientes pueden crear sus propios expedientes" ON expedientes;
CREATE POLICY "Clientes pueden crear sus propios expedientes"
  ON expedientes FOR INSERT TO authenticated WITH CHECK (cliente_id = auth.uid());

DROP POLICY IF EXISTS "Clientes pueden actualizar sus propios expedientes" ON expedientes;
CREATE POLICY "Clientes pueden actualizar sus propios expedientes"
  ON expedientes FOR UPDATE TO authenticated USING (cliente_id = auth.uid()) WITH CHECK (cliente_id = auth.uid());

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_expedientes_updated_at ON expedientes;
CREATE TRIGGER update_expedientes_updated_at
  BEFORE UPDATE ON expedientes FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
`;

    // Use the Supabase Management API to execute raw SQL
    // This endpoint is available on every Supabase project
    const response = await fetch(
      `https://${PROJECT_REF}.supabase.co/pg/meta/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
        body: JSON.stringify([
          {
            query: sql,
          },
        ]),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      // Try alternative: direct SQL via REST using the pg_dump-like approach
      return NextResponse.json(
        {
          error: "Migration failed via pg-meta",
          details: result,
          suggestion:
            "Open Supabase Dashboard > SQL Editor and run the migration manually.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Migration applied successfully via pg-meta",
      result,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}