/**
 * Apply migration directly to Supabase
 * Run: node scripts/run-migration.mjs
 */

import { readFileSync } from 'fs';

const sql = readFileSync('supabase/migrations/20260702_00001_create_expedientes.sql', 'utf-8');
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function apply() {
  // Try Supabase Management API
  const res = await fetch('https://api.supabase.com/v1/projects/vcntmgnebdoptnldvumd/database/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${serviceKey}`,
    },
    body: JSON.stringify([{ query: sql }]),
  });
  
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text.substring(0, 500));
  
  if (res.status === 200) {
    console.log('✅ Migration applied successfully!');
  } else {
    console.log('❌ Migration failed');
    process.exit(1);
  }
}

apply().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});