/**
 * Applies SQL migration directly to Supabase.
 * Uses the service_role key to bypass RLS.
 * 
 * Usage: node scripts/apply-sql.mjs
 */

const supabaseUrl = 'https://vcntmgnebdoptnldvumd.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const sql = `
-- Create enum for expediente estados if not exists
DO $$ BEGIN
  CREATE TYPE estado_expediente AS ENUM (
    'pendiente',
    'pago_pendiente',
    'pago_recibido',
    'expediente_creado',
    'en_revision',
    'informe_enviado',
    'cerrado',
    'rechazado',
    'cancelado'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create expedientes table
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

-- Index for faster queries by client
CREATE INDEX IF NOT EXISTS idx_expedientes_cliente_id ON expedientes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_expedientes_estado ON expedientes(estado);

-- Enable Row Level Security
ALTER TABLE expedientes ENABLE ROW LEVEL SECURITY;

-- Policy: Clients can only see their own expedientes
DROP POLICY IF EXISTS "Clientes pueden ver sus propios expedientes" ON expedientes;
CREATE POLICY "Clientes pueden ver sus propios expedientes"
  ON expedientes
  FOR SELECT
  TO authenticated
  USING (cliente_id = auth.uid());

-- Policy: Clients can insert their own expedientes
DROP POLICY IF EXISTS "Clientes pueden crear sus propios expedientes" ON expedientes;
CREATE POLICY "Clientes pueden crear sus propios expedientes"
  ON expedientes
  FOR INSERT
  TO authenticated
  WITH CHECK (cliente_id = auth.uid());

-- Policy: Clients can update their own expedientes
DROP POLICY IF EXISTS "Clientes pueden actualizar sus propios expedientes" ON expedientes;
CREATE POLICY "Clientes pueden actualizar sus propios expedientes"
  ON expedientes
  FOR UPDATE
  TO authenticated
  USING (cliente_id = auth.uid())
  WITH CHECK (cliente_id = auth.uid());

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_expedientes_updated_at ON expedientes;
CREATE TRIGGER update_expedientes_updated_at
  BEFORE UPDATE ON expedientes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
`;

const query = { query: sql };

fetch(`${supabaseUrl}/rest/v1/rpc/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': serviceRoleKey,
    'Authorization': `Bearer ${serviceRoleKey}`,
  },
  body: JSON.stringify(query),
})
.then(res => res.json())
.then(data => {
  console.log('Migration applied:', data);
})
.catch(err => {
  console.error('Migration failed:', err.message);
  // Fallback: try direct REST approach
  console.log('Trying alternative approach...');
  
  // Use the Supabase Management API instead
  const managementKey = serviceRoleKey;
  
  fetch(`https://api.supabase.com/v1/projects/vcntmgnebdoptnldvumd/database/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${managementKey}`,
    },
    body: JSON.stringify([{ query: sql }]),
  })
  .then(res => res.text())
  .then(text => console.log('Result:', text))
  .catch(e => console.error('Final error:', e));
});