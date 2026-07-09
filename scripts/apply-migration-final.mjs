/**
 * Final migration script for the diagnostic type and column.
 * Uses Supabase Management API to execute raw SQL via service role key.
 * 
 * Run: node scripts/apply-migration-final.mjs
 */

const PROJECT_URL = 'https://vcntmgnebdoptnldvumd.supabase.co';
const PROJECT_REF = 'vcntmgnebdoptnldvumd';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not set in environment');
  process.exit(1);
}

const sql = `
-- Create tipo_diagnostico enum
DO $$ BEGIN
  CREATE TYPE tipo_diagnostico AS ENUM (
    'certificado_energetico',
    'informe_tecnico',
    'segunda_opinion',
    'eficiencia_energetica',
    'rehabilitacion',
    'inspeccion_tecnica',
    'plan_mantenimiento',
    'viabilidad_economica',
    'diagnostico_estructural',
    'acustico'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Add columns to expedientes table
ALTER TABLE expedientes 
  ADD COLUMN IF NOT EXISTS tipo_diagnostico tipo_diagnostico,
  ADD COLUMN IF NOT EXISTS diagnostico_data JSONB,
  ADD COLUMN IF NOT EXISTS datos_inmueble JSONB,
  ADD COLUMN IF NOT EXISTS datos_cliente JSONB,
  ADD COLUMN IF NOT EXISTS ultimo_mensaje TEXT,
  ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id);

-- Add columns to documentos_ia table
ALTER TABLE documentos_ia 
  ADD COLUMN IF NOT EXISTS tipo_diagnostico tipo_diagnostico,
  ADD COLUMN IF NOT EXISTS diagnostico_data JSONB;
`;

async function tryPgMeta() {
  console.log('🔧 Attempting via pg-meta query endpoint...');
  const response = await fetch(`${PROJECT_URL}/pg/meta/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  console.log(`Status: ${response.status}`);
  const text = await response.text();
  console.log(`Response: ${text.substring(0, 500)}`);
  return response.ok;
}

async function tryRestV1() {
  console.log('\n🔧 Attempting via REST API...');
  const response = await fetch(`${PROJECT_URL}/rest/v1/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'params=single-object',
    },
    body: JSON.stringify({ query: sql }),
  });

  console.log(`Status: ${response.status}`);
  const text = await response.text();
  console.log(`Response: ${text.substring(0, 500)}`);
  return response.ok;
}

async function tryRpcExec() {
  console.log('\n🔧 Attempting via rpc/exec_sql...');
  const response = await fetch(`${PROJECT_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query_text: sql }),
  });

  console.log(`Status: ${response.status}`);
  const text = await response.text();
  console.log(`Response: ${text.substring(0, 500)}`);
  return response.ok;
}

async function main() {
  console.log('🚀 Applying migration for diagnostico columns...\n');
  
  const methods = [tryPgMeta, tryRestV1, tryRpcExec];
  
  for (const method of methods) {
    try {
      if (await method()) {
        console.log('\n✅ Migration applied successfully!');
        return;
      }
    } catch (err) {
      console.log(`❌ Method failed: ${err.message}`);
    }
  }
  
  console.log('\n⚠️  All automatic methods failed.');
  console.log('\n📋 To apply manually:');
  console.log('1. Open https://supabase.com/dashboard/project/vcntmgnebdoptnldvumd');
  console.log('2. Go to SQL Editor');
  console.log('3. Paste and run:');
  console.log('---');
  console.log(sql);
  console.log('---');
}

main().catch(console.error);