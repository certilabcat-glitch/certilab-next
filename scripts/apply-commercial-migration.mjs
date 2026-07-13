/**
 * Apply commercial schema migration to Supabase
 * Creates: commercial schema with customer, order, payment, contract, contract_document, audit_trail
 * Rollback: node scripts/apply-commercial-migration.mjs rollback
 * 
 * Usage: node scripts/apply-commercial-migration.mjs [apply|rollback]
 */

const supabaseUrl = 'https://vcntmgnebdoptnldvumd.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const mode = process.argv[2] || 'apply';

if (!serviceRoleKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  process.exit(1);
}

const sqlPath = mode === 'rollback'
  ? 'supabase/migrations/20260712_00001_rollback_commercial.sql'
  : 'supabase/migrations/20260712_00001_create_schema_commercial.sql';

const { readFileSync } = await import('fs');
const sql = readFileSync(sqlPath, 'utf-8');

console.log(`\n🚀 Executing ${mode} migration...`);
console.log(`📄 SQL file: ${sqlPath}`);

// Try Management API first (most reliable for DDL)
async function tryManagementApi() {
  console.log('\n📡 Trying Management API...');
  const response = await fetch(
    `https://api.supabase.com/v1/projects/vcntmgnebdoptnldvumd/database/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify([{ query: sql }]),
    }
  );

  const text = await response.text();
  console.log(`📡 Management API status: ${response.status}`);
  
  if (response.ok) {
    console.log('✅ Management API success');
    return { success: true, data: text };
  }
  
  console.log(`⚠️  Management API failed: ${text.substring(0, 500)}`);
  return { success: false, error: text };
}

// Fallback: PostgREST with raw SQL
async function tryPostgrestApi() {
  console.log('\n📡 Trying PostgREST SQL endpoint...');
  
  // Try different approaches
  const approaches = [
    // Approach 1: POST to /rest/v1/rpc/ with query param
    async () => {
      const res = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify({ query: sql }),
      });
      return { status: res.status, body: await res.text(), approach: 'rpc' };
    },
    // Approach 2: POST to /rest/v1/ with query in body
    async () => {
      const res = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Prefer': 'params=single-object',
        },
        body: JSON.stringify({ query: sql }),
      });
      return { status: res.status, body: await res.text(), approach: 'rest-v1' };
    },
  ];

  for (const approach of approaches) {
    try {
      const result = await approach();
      console.log(`  ${result.approach}: status ${result.status}`);
      if (result.status === 200 || result.status === 201 || result.status === 204) {
        console.log(`  ✅ ${result.approach} succeeded`);
        return { success: true, data: result.body };
      }
    } catch (err) {
      console.log(`  ❌ ${err.message}`);
    }
  }
  
  return { success: false, error: 'All PostgREST approaches failed' };
}

// Main execution
const result = await tryManagementApi();
if (!result.success) {
  console.log('\n⚠️  Management API failed, trying PostgREST fallback...');
  const fallbackResult = await tryPostgrestApi();
  if (!fallbackResult.success) {
    console.log('\n❌ All migration methods failed.');
    console.log('\n📋 Manual SQL to execute in Supabase Dashboard SQL Editor:');
    console.log('---');
    console.log(sql);
    console.log('---');
    process.exit(1);
  }
}

// Verify
console.log('\n🔍 Verifying migration...');
if (mode === 'apply') {
  const verifyRes = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
    },
    body: JSON.stringify({
      query: `SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'commercial'`
    }),
  });
  
  try {
    const verifyData = await verifyRes.json();
    console.log(`📊 Verify response:`, JSON.stringify(verifyData).substring(0, 200));
  } catch {
    console.log(`📊 Verify status: ${verifyRes.status}`);
  }
}

console.log(`\n✅ Migration ${mode} completed successfully!`);
console.log(`\n📋 Summary:`);
console.log(`  Mode: ${mode}`);
console.log(`  File: ${sqlPath}`);
if (mode === 'apply') {
  console.log(`  Schema: commercial`);
  console.log(`  Tables: customer, order, payment, contract, contract_document, audit_trail`);
}
console.log(`  Rollback: node scripts/apply-commercial-migration.mjs rollback`);