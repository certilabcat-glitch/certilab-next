/**
 * Apply migration to Supabase via JS SDK service role
 * Run: node scripts/apply-migration-v3.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const PROJECT_URL = 'https://vcntmgnebdoptnldvumd.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const sql = readFileSync('supabase/migrations/20260702_00001_create_expedientes.sql', 'utf-8');

const supabase = createClient(PROJECT_URL, SERVICE_KEY);

async function main() {
  // Step 1: Check if table exists
  console.log('Checking if expedientes table exists...');
  const { data: checkData, error: checkError } = await supabase.from('expedientes').select('id').limit(1);
  
  if (!checkError) {
    console.log('✅ Table expedientes already exists!');
    return;
  }
  
  console.log('Table does not exist. Error:', checkError.message);
  console.log('Attempting to create via SQL REST API...');
  
  // Step 2: Execute raw SQL via the Supabase REST API with service_role
  // We POST to the /rest/v1/ endpoint with the SQL in the body
  const response = await fetch(`${PROJECT_URL}/rest/v1/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'params=single-object',
    },
    body: JSON.stringify({
      query: sql,
    }),
  });
  
  console.log('REST API status:', response.status);
  const text = await response.text();
  console.log('Response:', text.substring(0, 500));
  
  // Step 3: Try alternative - execute SQL via the SQL endpoint
  // The Supabase REST API allows raw SQL with the service role key
  // when using the Accept: application/json header and the SQL in the request body
  
  console.log('\nTrying alternative SQL endpoint...');
  const sqlResponse = await fetch(`${PROJECT_URL}/rest/v1/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify([{ query: sql }]),
  });
  
  console.log('SQL endpoint status:', sqlResponse.status);
  const sqlText = await sqlResponse.text();
  console.log('Response:', sqlText.substring(0, 500));
  
  // Step 4: Check again
  console.log('\nVerifying table creation...');
  const { error: finalError } = await supabase.from('expedientes').select('id').limit(1);
  if (finalError) {
    console.log('❌ Table still does not exist:', finalError.message);
    console.log('\nYou need to run this SQL manually in Supabase Dashboard SQL Editor:');
    console.log('---');
    console.log(sql);
    console.log('---');
  } else {
    console.log('✅ Table expedientes successfully created!');
  }
}

main().catch(console.error);