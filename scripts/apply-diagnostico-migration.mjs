/**
 * Apply diagnostico migration to core.expediente
 * Run: node scripts/apply-diagnostico-migration.mjs
 */
import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = 'https://vcntmgnebdoptnldvumd.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(PROJECT_URL, SERVICE_KEY);

async function query(sql) {
  const response = await fetch(`${PROJECT_URL}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });
  return { status: response.status, text: await response.text() };
}

async function main() {
  // Step 1: Check current columns
  console.log('=== Checking core.expediente columns ===');
  const { data: columns, error } = await supabase
    .from('core_expediente')
    .select('id, estado_diagnostico, diagnostico_version, diagnostico')
    .limit(1);

  if (!error) {
    console.log('✅ core.expediente already has diagnostico columns!');
    console.log('Sample:', JSON.stringify(columns, null, 2));
    return;
  }

  console.log('❌ Error:', error.message);

  // Step 2: Try direct table name
  console.log('\n=== Trying core.expediente ===');
  const { data: c2, error: e2 } = await supabase
    .from('core.expediente')
    .select('id, estado_diagnostico, diagnostico_version, diagnostico')
    .limit(1);

  if (!e2) {
    console.log('✅ core.expediente already has diagnostico columns!');
    console.log('Sample:', JSON.stringify(c2, null, 2));
    return;
  }

  console.log('❌ Error:', e2.message);

  // Step 3: Print the SQL to apply manually
  const sql = `
ALTER TABLE core.expediente
  ADD COLUMN IF NOT EXISTS diagnostico JSONB;

ALTER TABLE core.expediente
  ADD COLUMN IF NOT EXISTS diagnostico_version INTEGER NOT NULL DEFAULT 1;

ALTER TABLE core.expediente
  ADD COLUMN IF NOT EXISTS estado_diagnostico TEXT NOT NULL DEFAULT 'SinDiagnostico';

ALTER TABLE core.expediente
  ADD CONSTRAINT ck_expediente_diagnostico_is_object
  CHECK (diagnostico IS NULL OR jsonb_typeof(diagnostico) = 'object');

ALTER TABLE core.expediente
  ADD CONSTRAINT ck_expediente_estado_diagnostico
  CHECK (estado_diagnostico IN ('SinDiagnostico', 'Borrador', 'Completado'));

ALTER TABLE core.expediente
  ADD CONSTRAINT ck_expediente_diagnostico_version
  CHECK (diagnostico_version >= 1);

COMMENT ON COLUMN core.expediente.diagnostico IS
  'Diagnóstico Técnico del Arquitecto Técnico. Almacena un objeto DiagnosticoCompleto validado. Sprint 1 — MVP. Sin IA, sin PITR, sin automatizaciones. Diagnóstico manual del AT.';

COMMENT ON COLUMN core.expediente.diagnostico_version IS
  'Versión del diagnóstico. Se incrementa en cada actualización. Preparado para revisiones futuras sin rediseñar la persistencia.';

COMMENT ON COLUMN core.expediente.estado_diagnostico IS
  'Estado del diagnóstico en su máquina de estados simplificada. SinDiagnostico → Borrador → Completado. El diagnóstico se completa antes de aprobar el expediente.';
`;

  console.log('\n📋 Paste this in Supabase SQL Editor:');
  console.log('https://supabase.com/dashboard/project/vcntmgnebdoptnldvumd/sql/new');
  console.log('\n---');
  console.log(sql);
  console.log('---');
}

main().catch(console.error);