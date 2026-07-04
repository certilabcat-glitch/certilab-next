/**
 * Apply expediente migration to Supabase
 * This script updates the expedientes table with core audit trail columns
 * Run: node scripts/apply-expediente-migration.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const PROJECT_URL = 'https://vcntmgnebdoptnldvumd.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const sql = readFileSync('supabase/migrations/20260707_00001_update_expedientes.sql', 'utf-8');

async function main() {
  console.log('=== Applying expediente migration ===\n');
  
  // Try to execute SQL via Supabase Management API
  const ref = 'vcntmgnebdoptnldvumd';
  
  // Method 1: Use the /rest/v1/rpc/ endpoint with SQL directly
  console.log('Method 1: Using REST API with raw SQL...');
  try {
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
    console.log('Status:', response.status);
    const text = await response.text();
    console.log('Response:', text.substring(0, 300));
    if (response.ok) {
      console.log('✅ Migration applied successfully via Method 1!');
    } else {
      console.log('Method 1 failed, trying alternative...');
    }
  } catch (e) {
    console.log('Method 1 error:', e.message);
  }

  // Method 2: Try using pg-meta API
  console.log('\nMethod 2: Using pg-meta API...');
  try {
    const response = await fetch(`${PROJECT_URL}/pg-meta/default/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    });
    console.log('Status:', response.status);
    const text = await response.text();
    console.log('Response:', text.substring(0, 300));
    if (response.ok) {
      console.log('✅ Migration applied successfully via Method 2!');
    }
  } catch (e) {
    console.log('Method 2 error:', e.message);
  }

  // Verify
  console.log('\n=== Verifying migration ===');
  try {
    const supabase = createClient(PROJECT_URL, SERVICE_KEY);
    const { data, error } = await supabase.from('expedientes').select('id, version, created_by').limit(1);
    if (error) {
      console.log('❌ Verification failed:', error.message);
      console.log('\nIf automated methods fail, run this SQL in Supabase Dashboard SQL Editor:');
      console.log('---');
      console.log(sql);
      console.log('---');
    } else {
      console.log('✅ Table expedientes has the new columns!');
      console.log('Sample columns:', data && data.length > 0 ? Object.keys(data[0]) : 'table is empty');
    }
  } catch (e) {
    console.log('Verification error:', e.message);
  }
}

main().catch(console.error);