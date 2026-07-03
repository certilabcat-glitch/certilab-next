/**
 * Apply migration to Supabase via Management API or SQL endpoint
 * Run: node scripts/apply-sql-final.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vcntmgnebdoptnldvumd.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MANAGEMENT_TOKEN = process.env.SUPABASE_MANAGEMENT_API_KEY;
const sql = readFileSync('supabase/migrations/20260702_00001_create_expedientes.sql', 'utf-8');

const supabase = createClient(PROJECT_URL, SERVICE_KEY);

async function checkTable() {
  const { data, error } = await supabase.from('expedientes').select('id').limit(1);
  return { exists: !error, error };
}

async function tryManagementAPI() {
  console.log('Trying Management API...');
  const response = await fetch(
    `https://api.supabase.com/v1/projects/vcntmgnebdoptnldvumd/database/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MANAGEMENT_TOKEN}`,
      },
      body: JSON.stringify([{ query: sql }]),
    }
  );
  console.log('Status:', response.status);
  const text = await response.text();
  console.log('Response:', text.substring(0, 500));
  return response.ok;
}

async function trySupabaseSQL() {
  console.log('Trying Supabase SQL endpoint...');
  const response = await fetch(
    `${PROJECT_URL}/rest/v1/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Prefer': 'params=single-object',
      },
      body: JSON.stringify({ query: sql }),
    }
  );
  console.log('Status:', response.status);
  const text = await response.text();
  console.log('Response:', text.substring(0, 500));
  return response.ok;
}

async function main() {
  // Check if table already exists
  const { exists } = await checkTable();
  if (exists) {
    console.log('✅ Table expedientes already exists!');
    return;
  }
  console.log('Table expedientes does not exist. Attempting to create...');

  // Try management API first
  const managed = await tryManagementAPI();
  if (managed) {
    const { exists: nowExists } = await checkTable();
    if (nowExists) {
      console.log('✅ Table created successfully via Management API!');
      return;
    }
  }

  // Try SQL endpoint
  const sqlOk = await trySupabaseSQL();
  if (sqlOk) {
    const { exists: nowExists } = await checkTable();
    if (nowExists) {
      console.log('✅ Table created successfully via SQL endpoint!');
      return;
    }
  }

  // Try direct fetch to pg-meta
  console.log('Trying pg-meta endpoint with GET...');
  const pgMeta = await fetch(`${PROJECT_URL}/pg-meta`, {
    headers: { 'apikey': SERVICE_KEY, 'Authorization': `Bearer ${SERVICE_KEY}` }
  });
  console.log('pg-meta status:', pgMeta.status);
  const pgMetaText = await pgMeta.text();
  console.log('Response:', pgMetaText.substring(0, 500));

  // Final check
  const { exists: finalExists, error: finalError } = await checkTable();
  if (finalExists) {
    console.log('✅ Table created successfully!');
  } else {
    console.log('❌ Table still does not exist:', finalError?.message);
    console.log('\nManual SQL to run in Supabase Dashboard SQL Editor:');
    console.log('---');
    console.log(sql);
    console.log('---');
  }
}

main().catch(console.error);