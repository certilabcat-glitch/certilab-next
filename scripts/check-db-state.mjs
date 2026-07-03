/**
 * Check current database state - what tables exist
 */
const token = process.env.SUPABASE_MANAGEMENT_API_KEY;
const ref = process.env.SUPABASE_PROJECT_REF || 'vcntmgnebdoptnldvumd';

async function query(sql) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify([{ query: sql }]),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

async function main() {
  console.log('=== Tables in core/public schemas ===');
  const tables = await query(
    "SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema IN ('core', 'public') AND table_type = 'BASE TABLE' ORDER BY table_schema, table_name"
  );
  console.log(JSON.stringify(tables, null, 2));

  console.log('\n=== Checking expedientes table ===');
  try {
    const exp = await query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'expedientes') as exists");
    console.log(JSON.stringify(exp, null, 2));
  } catch (e) {
    console.log('Error checking expedientes:', e.message);
  }

  console.log('\n=== Checking core.cliente table ===');
  try {
    const cliente = await query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'core' AND table_name = 'cliente') as exists");
    console.log(JSON.stringify(cliente, null, 2));
  } catch (e) {
    console.log('Error checking core.cliente:', e.message);
  }
}

main().catch(console.error);