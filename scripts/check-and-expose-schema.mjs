/**
 * Check current DB state and expose core schema to PostgREST
 */
import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = 'https://vcntmgnebdoptnldvumd.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(PROJECT_URL, SERVICE_KEY);

async function main() {
  // 1. Check tables in core schema (direct SQL via raw query)
  console.log('\n=== 1. Checking if core.cliente exists via raw SQL ===');
  const { data: tablesData, error: tablesError } = await supabase.rpc('exec_sql', {
    sql_text: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'core' ORDER BY table_name`
  });
  console.log('Tables in core (via RPC):', JSON.stringify({ data: tablesData, error: tablesError?.message }));

  if (tablesError) {
    console.log('RPC not available, trying direct query...');
    // Try to query with schema prefix (requires core in exposed schemas)
    const { data: cData, error: cError } = await supabase
      .from('core.cliente')
      .select('id, email')
      .limit(3);
    console.log('core.cliente query result:', JSON.stringify({ data: cData, error: cError?.message, hint: cError?.hint }, null, 2));
  }

  // 2. Try querying from public schema (in case it was created in public)
  console.log('\n=== 2. Checking public schema tables ===');
  const { data: pData, error: pError } = await supabase
    .from('cliente')
    .select('id, email')
    .limit(3);
  console.log('public.cliente query result:', JSON.stringify({ data: pData, error: pError?.message }, null, 2));

  // 3. Check if migration table exists
  console.log('\n=== 3. Checking if migration has been applied ===');
  const { data: mData, error: mError } = await supabase
    .from('_migrations')
    .select('*')
    .limit(10);
  console.log('_migrations:', JSON.stringify({ data: mData, error: mError?.message }, null, 2));
}

main().catch(console.error);