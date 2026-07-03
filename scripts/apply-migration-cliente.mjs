/**
 * Apply the core schema migration (CLIENTE table) to Supabase
 * Run: node scripts/apply-migration-cliente.mjs
 */
import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = 'https://vcntmgnebdoptnldvumd.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const sql = readFileSync('supabase/migrations/20260703_00001_create_schema_core.sql', 'utf-8');

async function main() {
  console.log('Executing migration for schema_core...\n');
  
  // Try pg-meta endpoint
  const response = await fetch(`${PROJECT_URL}/pg/meta/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify([{ query: sql }]),
  });
  
  const result = await response.json();
  console.log('Status:', response.status);
  
  if (!response.ok) {
    console.error('Migration failed:', JSON.stringify(result, null, 2));
    console.log('\nAlternative: trying Supabase REST SQL endpoint...');
    
    // Try REST endpoint
    const restResponse = await fetch(`${PROJECT_URL}/rest/v1/rpc/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    });
    console.log('REST status:', restResponse.status);
    const restText = await restResponse.text();
    console.log('Response:', restText.substring(0, 1000));
    return;
  }
  
  console.log('Migration executed successfully!');
  console.log('Result:', JSON.stringify(result, null, 2));
  
  // Verify
  console.log('\nVerifying table exists...');
  const supabase = createClient(PROJECT_URL, SERVICE_KEY);
  const { data: schemaData, error: schemaError } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'core')
    .eq('table_name', 'cliente');
  
  if (schemaError) {
    console.log('Schema query error:', schemaError.message);
  }
  
  // Check if we can query the table
  const { error: queryError } = await supabase.from('core.cliente').select('id').limit(1);
  if (queryError) {
    console.log('Table query error:', queryError.message);
    console.log('\nTable might be in schema mode. Try querying with schema prefix...');
  } else {
    console.log('✅ Table core.cliente verified successfully!');
  }
}

main().catch(console.error);