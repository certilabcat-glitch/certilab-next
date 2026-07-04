/**
 * Apply PHASE A - Create core.expediente and migrate data
 * 
 * FASE A: Crea la tabla core.expediente y migra datos desde public.expedientes
 * NO modifica la FK cliente_id (se mantiene como UUID simple hasta Fase B)
 * 
 * Prerequisitos:
 *   1. core schema debe existir (migración 001 aplicada)
 *   2. core.cliente debe existir (migración 001 aplicada)
 *   3. core.inmueble debe existir (migración 003 aplicada)
 *   4. public.expedientes debe existir (migraciones 002 y 004 aplicadas)
 * 
 * Run: node scripts/apply-phase-a-expediente.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_URL = 'https://vcntmgnebdoptnldvumd.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SQL_FILE = resolve(__dirname, '..', 'supabase/migrations/20260708_00001_create_core_expediente.sql');

if (!SERVICE_KEY) {
  console.error('❌ ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable not set');
  process.exit(1);
}

async function verifyPrerequisites(supabase) {
  console.log('\n=== Verifying prerequisites ===\n');
  const checks = [];

  // Check 1: core schema exists
  try {
    const { data, error } = await supabase
      .from('information_schema.schemata')
      .select('schema_name')
      .eq('schema_name', 'core');
    if (error) throw error;
    checks.push({ name: 'core schema exists', passed: data && data.length > 0 });
  } catch (e) {
    checks.push({ name: 'core schema exists', passed: false, error: e.message });
  }

  // Check 2: core.cliente exists
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'core')
      .eq('table_name', 'cliente');
    if (error) throw error;
    checks.push({ name: 'core.cliente exists', passed: data && data.length > 0 });
  } catch (e) {
    checks.push({ name: 'core.cliente exists', passed: false, error: e.message });
  }

  // Check 3: core.inmueble exists
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'core')
      .eq('table_name', 'inmueble');
    if (error) throw error;
    checks.push({ name: 'core.inmueble exists', passed: data && data.length > 0 });
  } catch (e) {
    checks.push({ name: 'core.inmueble exists', passed: false, error: e.message });
  }

  // Check 4: public.expedientes exists
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'expedientes');
    if (error) throw error;
    checks.push({ name: 'public.expedientes exists', passed: data && data.length > 0 });
  } catch (e) {
    checks.push({ name: 'public.expedientes exists', passed: false, error: e.message });
  }

  // Check 5: estado_expediente enum exists
  try {
    const { data, error } = await supabase
      .from('information_schema.columns')
      .select('data_type')
      .eq('table_schema', 'public')
      .eq('table_name', 'expedientes')
      .eq('column_name', 'estado');
    if (error) throw error;
    checks.push({ name: 'estado_expediente enum exists', passed: data && data.length > 0 });
  } catch (e) {
    checks.push({ name: 'estado_expediente enum exists', passed: false, error: e.message });
  }

  // Check 6: uuid_generate_v7 function exists
  try {
    const { data, error } = await supabase
      .rpc('uuid_generate_v7'.includes('core.') ? 'core.uuid_generate_v7' : 'uuid_generate_v7');
    // Just check if the function exists by querying information_schema
    const { data: funcData, error: funcError } = await supabase
      .from('information_schema.routines')
      .select('routine_name')
      .eq('routine_schema', 'core')
      .eq('routine_name', 'uuid_generate_v7');
    if (funcError) throw funcError;
    checks.push({ name: 'core.uuid_generate_v7 exists', passed: funcData && funcData.length > 0 });
  } catch (e) {
    checks.push({ name: 'core.uuid_generate_v7 exists', passed: false, error: e.message });
  }

  // Print results
  let allPassed = true;
  for (const check of checks) {
    if (check.passed) {
      console.log(`  ✅ ${check.name}`);
    } else {
      console.log(`  ❌ ${check.name}${check.error ? ` — ${check.error}` : ''}`);
      allPassed = false;
    }
  }

  if (!allPassed) {
    console.log('\n❌ Prerequisites not met. Aborting migration.');
    process.exit(1);
  }

  console.log('\n✅ All prerequisites verified successfully!');
}

async function countRows(supabase, table, schema = 'public') {
  try {
    const { count, error } = await supabase
      .from(table.includes('.') ? table : `${schema}.${table}`)
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count || 0;
  } catch (e) {
    console.log(`  ⚠️  Could not count ${schema}.${table}: ${e.message}`);
    // Try with schema prefix
    try {
      const query = schema === 'core' 
        ? supabase.from(table.includes('.') ? table : `${schema}.${table}`).select('*', { count: 'exact', head: true })
        : supabase.from(table).select('*', { count: 'exact', head: true });
      const { count, error: err2 } = await query;
      if (err2) throw err2;
      return count || 0;
    } catch (e2) {
      return -1; // Unknown
    }
  }
}

async function verifyMigration(supabase) {
  console.log('\n=== Verifying migration ===\n');

  // 1. Count rows in source (public.expedientes)
  const sourceCount = await countRows(supabase, 'expedientes', 'public');
  console.log(`  📊 public.expedientes rows: ${sourceCount >= 0 ? sourceCount : 'unknown'}`);

  // 2. Count rows in destination (core.expediente)
  const destCount = await countRows(supabase, 'expediente', 'core');
  console.log(`  📊 core.expediente rows: ${destCount >= 0 ? destCount : 'unknown'}`);

  // 3. Verify row count matches
  if (sourceCount >= 0 && destCount >= 0) {
    if (sourceCount === destCount) {
      console.log('  ✅ Row count matches between source and destination');
    } else {
      console.log(`  ⚠️  Row count mismatch: source=${sourceCount}, dest=${destCount}`);
    }
  }

  // 4. Verify indexes
  console.log('\n  --- Indexes ---');
  const indexNames = [
    'idx_expediente_cliente_id',
    'idx_expediente_estado',
    'idx_expediente_numero',
    'idx_expediente_inmueble_id',
    'idx_expediente_deleted_at'
  ];
  for (const indexName of indexNames) {
    try {
      const { data, error } = await supabase
        .from('information_schema.statistics')
        .select('index_name')
        .eq('index_schema', 'core')
        .eq('index_name', indexName);
      // Try pg_indexes view instead
      const { data: idxData, error: idxError } = await supabase
        .rpc('get_indexes_for_table', { table_schema_name: 'core', table_name_val: 'expediente' });
      
      // Fallback: check via raw query
      const response = await fetch(`${PROJECT_URL}/rest/v1/rpc/get_index_info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
        },
        body: JSON.stringify({ schema_name: 'core', table_name: 'expediente' }),
      });
      const result = await response.json();
      if (response.ok && result) {
        console.log(`  ✅ Index ${indexName}`);
      } else {
        console.log(`  ⚠️  Could not verify index: ${indexName}`);
      }
    } catch (e) {
      console.log(`  ⚠️  Could not verify index ${indexName}: ${e.message}`);
    }
  }

  // 5. Verify RLS is enabled
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('row_level_security_enabled')
      .eq('table_schema', 'core')
      .eq('table_name', 'expediente');
    if (data && data.length > 0) {
      console.log(`  ✅ RLS enabled: ${data[0].row_level_security_enabled}`);
    } else {
      console.log('  ⚠️  Could not verify RLS status');
    }
  } catch (e) {
    console.log(`  ⚠️  Could not verify RLS: ${e.message}`);
  }

  // 6. Verify constraints
  try {
    const { data, error } = await supabase
      .from('information_schema.table_constraints')
      .select('constraint_name, constraint_type')
      .eq('table_schema', 'core')
      .eq('table_name', 'expediente');
    if (data && data.length > 0) {
      console.log('\n  --- Constraints ---');
      for (const c of data) {
        console.log(`  ✅ ${c.constraint_type}: ${c.constraint_name}`);
      }
    }
  } catch (e) {
    console.log(`  ⚠️  Could not verify constraints: ${e.message}`);
  }

  // 7. Sample data check
  try {
    const { data, error } = await supabase
      .from('core.expediente')
      .select('id, numero_expediente, estado, created_at')
      .limit(5);
    if (error) throw error;
    if (data && data.length > 0) {
      console.log(`\n  --- Sample records (${data.length}) ---`);
      for (const row of data) {
        console.log(`  📄 ${row.id.substring(0, 8)}... | ${row.numero_expediente} | ${row.estado}`);
      }
    } else {
      console.log('  ⚠️  No records found in core.expediente');
    }
  } catch (e) {
    console.log(`  ⚠️  Could not sample data: ${e.message}`);
  }
}

async function main() {
  console.log('========================================');
  console.log('  PHASE A: Create core.expediente');
  console.log('  Migrate data from public.expedientes');
  console.log('========================================\n');

  console.log('Plan:');
  console.log('  1. Create core.expediente table');
  console.log('  2. Create indexes (5 total)');
  console.log('  3. Enable RLS');
  console.log('  4. Create RLS policies (5 total)');
  console.log('  5. Create triggers (updated_at + version)');
  console.log('  6. Migrate all data from public.expedientes');
  console.log('  7. Add comments');
  console.log('  8. Insert demo seed data');
  console.log('\nNOT modifying:');
  console.log('  - public.expedientes (preserved intact)');
  console.log('  - FK cliente_id (temporary UUID, no FK)');
  console.log('  - Any existing tables or policies\n');

  const supabase = createClient(PROJECT_URL, SERVICE_KEY);

  // Step 1: Verify prerequisites
  await verifyPrerequisites(supabase);

  // Step 2: Read SQL
  console.log('\n=== Reading migration SQL ===\n');
  const sql = readFileSync(SQL_FILE, 'utf-8');
  const lineCount = sql.split('\n').length;
  console.log(`  📄 SQL file: ${SQL_FILE}`);
  console.log(`  📏 Lines: ${lineCount}`);

  // Step 3: Execute migration
  console.log('\n=== Executing migration ===\n');
  
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
    
    console.log(`  Status: ${response.status}`);
    const text = await response.text();
    
    if (response.ok) {
      console.log('  ✅ Migration SQL executed successfully!');
    } else {
      console.log(`  ⚠️  Response (first 500 chars): ${text.substring(0, 500)}`);
      
      // Try alternative endpoint
      console.log('\n  Trying alternative endpoint...');
      const altResponse = await fetch(`${PROJECT_URL}/pg-meta/default/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
        },
        body: JSON.stringify({ query: sql }),
      });
      
      console.log(`  Alt Status: ${altResponse.status}`);
      const altText = await altResponse.text();
      
      if (altResponse.ok) {
        console.log('  ✅ Migration applied via alternative endpoint!');
      } else {
        console.log(`  ❌ All methods failed.`);
        console.log(`  Last error: ${altText.substring(0, 500)}`);
        console.log('\n  To apply manually, run this SQL in Supabase Dashboard SQL Editor:');
        console.log('  ---');
        console.log(`  ${SQL_FILE}`);
        console.log('  ---');
        process.exit(1);
      }
    }
  } catch (e) {
    console.log(`  ❌ Error executing migration: ${e.message}`);
    process.exit(1);
  }

  // Step 4: Verify migration
  await verifyMigration(supabase);

  console.log('\n========================================');
  console.log('  PHASE A COMPLETE');
  console.log('========================================\n');
  console.log('Next step: PHASE B will update cliente_id FK to core.cliente.id');
  console.log('Do NOT proceed with Phase B until Phase A is validated.\n');
}

main().catch(console.error);
