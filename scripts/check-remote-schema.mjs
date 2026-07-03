/**
 * Check remote Supabase schema
 * Usage: node scripts/check-remote-schema.mjs
 */
const PROJECT_URL = 'https://vcntmgnebdoptnldvumd.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const sql = `SELECT table_schema, table_name, table_type 
  FROM information_schema.tables 
  WHERE table_schema IN ('public','core') 
  ORDER BY table_schema, table_name`;

async function main() {
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
  console.log(JSON.stringify(result, null, 2));
  
  // Also check core.cliente specifically
  const checkClient = await fetch(`${PROJECT_URL}/pg/meta/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify([{ 
      query: `SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_schema = 'core' AND table_name = 'cliente'
        ORDER BY ordinal_position` 
    }]),
  });
  const clientResult = await checkClient.json();
  console.log('\n--- core.cliente columns ---');
  console.log(JSON.stringify(clientResult, null, 2));
}

main().catch(console.error);