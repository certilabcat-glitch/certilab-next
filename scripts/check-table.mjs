// Check core.cliente table using Supabase REST API
const SUPABASE_URL = 'https://vcntmgnebdoptnldvumd.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function main() {
  // Query core.cliente table via REST API
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({
        sql: "SELECT table_name FROM information_schema.tables WHERE table_schema = 'core'"
      })
    }
  );

  // Try querying the table directly
  const tableResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/core/cliente?select=id,email,nombre,apellidos,origen,created_at&limit=5`,
    {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Accept': 'application/json'
      }
    }
  );

  if (tableResponse.ok) {
    const data = await tableResponse.json();
    console.log('✅ core.cliente table EXISTS and is accessible!\n');
    if (data.length > 0) {
      console.log(`Found ${data.length} row(s):`);
      data.forEach(row => {
        const createdDate = row.created_at ? new Date(row.created_at).toISOString().slice(0, 19).replace('T', ' ') : 'N/A';
        console.log(`  - ${row.id?.slice(0, 8)}... | ${row.nombre} ${row.apellidos} | ${row.email} | ${row.origen} | created: ${createdDate}`);
      });
    } else {
      console.log('Table exists but has no rows (seed might not be applied yet).');
    }

    // Show headers for debugging
    const contentType = tableResponse.headers.get('content-type');
    console.log(`\nContent-Type: ${contentType}`);
    console.log(`Status: ${tableResponse.status} ${tableResponse.statusText}`);

    // Check if schema exists
    const schemaResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/`,
      {
        method: 'GET',
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
          'Accept': 'application/json'
        }
      }
    );
    console.log(`\nAPI Root Status: ${schemaResponse.status}`);
  } else {
    const errorText = await tableResponse.text();
    console.log(`❌ ERROR (${tableResponse.status}):`);
    console.log(errorText);
  }
}

main().catch(console.error);