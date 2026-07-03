/**
 * Verify CLIENTE table exists, expose core schema, and check everything works
 */
import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = 'https://vcntmgnebdoptnldvumd.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(PROJECT_URL, SERVICE_KEY, {
  db: { schema: 'core' }
});

async function main() {
  console.log('=== 1. Checking core schema tables via direct DB SQL ===');
  
  // Use raw SQL query to check tables
  const { data, error } = await supabase.rpc('exec_sql', {
    sql_text: `
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = 'core' 
      ORDER BY table_name
    `
  });
  
  if (error) {
    console.log('RPC exec_sql not available:', error.message);
    
    // Try direct query (requires core in exposed schemas)
    try {
      const response = await fetch(`${PROJECT_URL}/rest/v1/cliente?select=id,email&limit=2`, {
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
          'Accept': 'application/json'
        }
      });
      console.log('Direct query status:', response.status);
      const result = await response.json();
      console.log('Direct query result:', JSON.stringify(result, null, 2));
    } catch (e) {
      console.error('Direct query failed:', e.message);
    }
    
    // The core schema is NOT exposed to PostgREST.
    // We need to expose it via a SQL command or dashboard.
    // Let's try via a CREATE EXTENSION or the pg_catalog approach
    console.log('\n=== 2. core schema NOT exposed to API. Checking database directly via psql-style ===');
    
    // Try to use the supabase-js client with db schema
    const db = createClient(PROJECT_URL, SERVICE_KEY);
    const { data: cData, error: cError } = await db
      .from('core.cliente')
      .select('id, email')
      .limit(2);
    
    if (cError && cError.message?.includes('schema')) {
      console.log('Schema not exposed. Need to expose core schema to PostgREST.');
      console.log('Error:', cError.message);
      console.log('Hint:', cError.hint);
      
      // The solution: add 'core' to the exposed schemas in Supabase config
      // This can be done via SQL:
      const { data: fixData, error: fixError } = await db.rpc('exec_sql', {
        sql_text: `SELECT set_config('request.schema', 'core', false)`
      });
      console.log('Fix attempt:', JSON.stringify({ data: fixData, error: fixError?.message }));
    } else if (cData) {
      console.log('✅ core.cliente accessible via core.cliente!');
      console.log('Data:', JSON.stringify(cData));
    } else {
      console.log('Query result:', JSON.stringify({ data: cData, error: cError }));
    }
  } else {
    console.log('Tables in core schema:', JSON.stringify(data));
  }
  
  // 3. Check cliente table columns
  console.log('\n=== 3. Checking CLIENTE table structure ===');
  const { data: colData, error: colError } = await supabase.rpc('exec_sql', {
    sql_text: `
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_schema = 'core' AND table_name = 'cliente'
      ORDER BY ordinal_position
    `
  });
  
  if (colError) {
    console.log('Cannot query columns:', colError.message);
    
    // Try direct query to see if we get the structure
    try {
      const response = await fetch(`${PROJECT_URL}/rest/v1/?select=id`, {
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
          'Accept': 'application/json'
        }
      });
      console.log('Root API status:', response.status);
      const text = await response.text();
      console.log('Root API:', text.substring(0, 500));
    } catch (e) {
      console.error(e.message);
    }
  } else {
    console.log('CLIENTE columns:', JSON.stringify(colData, null, 2));
  }
}

main().catch(console.error);