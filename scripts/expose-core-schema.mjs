/**
 * Expose core schema to PostgREST API
 * Uses Supabase Management API to add extra_schema_directories
 */
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'vcntmgnebdoptnldvumd';
const API_KEY = process.env.SUPABASE_MANAGEMENT_API_KEY;

async function main() {
  // Step 1: Get current config
  console.log('=== Fetching current config... ===');
  const getRes = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/config/database/postgres`,
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    }
  );
  
  if (!getRes.ok) {
    const errText = await getRes.text();
    console.error('Failed to fetch config:', getRes.status, errText);
    process.exit(1);
  }
  
  const config = await getRes.json();
  console.log('Current config:', JSON.stringify(config, null, 2));
  
  const currentExtraSchemas = config.extra_schema_directories || [];
  if (currentExtraSchemas.includes('core')) {
    console.log('✅ core schema already exposed via Management API');
    return;
  }
  
  // Step 2: Update config to include core
  console.log('\n=== Exposing core schema... ===');
  const newExtraSchemas = [...new Set([...currentExtraSchemas, 'core'])];
  
  const patchRes = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/config/database/postgres`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        extra_schema_directories: newExtraSchemas
      })
    }
  );
  
  if (!patchRes.ok) {
    const errText = await patchRes.text();
    console.error('Failed to update config:', patchRes.status, errText);
    console.log('\nAlternative: use Supabase Dashboard > Database > Schema to add "core"');
    process.exit(1);
  }
  
  console.log('✅ core schema exposed successfully!');
  console.log('Updated extra_schema_directories:', newExtraSchemas);
}

main().catch(console.error);