/**
 * Check remote DB state
 */
import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = 'https://vcntmgnebdoptnldvumd.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(PROJECT_URL, SERVICE_KEY);

async function main() {
  // 1. Try to query core.cliente
  console.log('--- Checking core.cliente ---');
  const { data: cData, error: cError } = await supabase
    .from('core.cliente')
    .select('id, email')
    .limit(3);
  console.log('client result:', JSON.stringify({ data: cData, error: cError }, null, 2));

  // 2. Try the original table from migration 001 (maybe in public schema)
  console.log('\n--- Checking expedientes in public ---');
  const { data: eData, error: eError } = await supabase
    .from('expedientes')
    .select('id')
    .limit(1);
  console.log('expedientes result:', JSON.stringify({ data: eData?.length, error: eError?.message }, null, 2));

  // 3. Check inmueble
  console.log('\n--- Checking core.inmueble ---');
  const { data: iData, error: iError } = await supabase
    .from('core.inmueble')
    .select('id')
    .limit(1);
  console.log('inmueble result:', JSON.stringify({ data: iData, error: iError?.message }, null, 2));
}

main().catch(console.error);