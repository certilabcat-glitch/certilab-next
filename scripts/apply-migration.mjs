/**
 * Script to apply migration to Supabase via direct SQL
 * Run: node scripts/apply-migration.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Error: Missing environment variables.');
  console.error('Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  const migrationPath = resolve(__dirname, '..', 'supabase', 'migrations', '20260702_00001_create_expedientes.sql');
  const sql = readFileSync(migrationPath, 'utf-8');

  console.log('Applying migration...');
  console.log('--- SQL START ---');
  console.log(sql.substring(0, 200) + '...');
  console.log('--- SQL END ---');

  const { error } = await supabase.rpc('exec_sql', { sql });

  if (error) {
    // Try direct SQL query approach
    console.log('RPC method failed, trying direct SQL...');
    const { data, error: directError } = await supabase
      .from('_exec_sql')
      .select('*')
      .eq('query', sql);

    if (directError) {
      console.error('Migration failed:', directError);
      process.exit(1);
    }
    console.log('Migration result:', data);
  }

  console.log('Migration applied successfully!');
}

main().catch(console.error);