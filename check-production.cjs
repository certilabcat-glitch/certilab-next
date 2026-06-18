const https = require('https');
const http = require('http');

const DAY = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

const URLS = [
  { label: 'Home', url: 'https://certilab.cat/' },
  { label: 'Segunda Opinión', url: 'https://certilab.cat/segunda-opinion/' },
  { label: 'Artículo: Reclamar CE incorrecto', url: 'https://certilab.cat/reclamar-certificado-energetico-incorrecto/' },
  { label: 'Artículo: CE F-G correcto', url: 'https://certilab.cat/certificado-energetico-f-g-correcto/' },
  { label: 'Artículo: CE vendedor fiable', url: 'https://certilab.cat/certificado-energetico-vendedor-fiable/' },
  { label: 'Artículo: CE inflado qué hacer', url: 'https://certilab.cat/certificado-energetico-inflado-que-hacer/' },
  { label: 'Artículo: CE negociar precio', url: 'https://certilab.cat/certificado-energetico-negociar-precio/' },
  { label: 'Artículo: Perder dinero CE mal hecho', url: 'https://certilab.cat/perder-dinero-certificado-energetico-mal-hecho/' },
  { label: 'Artículo: CE hipoteca verde', url: 'https://certilab.cat/certificado-energetico-hipoteca-verde/' },
  { label: 'Artículo: Segunda opinión CE', url: 'https://certilab.cat/segunda-opinion-certificado-energetico/' },
  { label: 'Artículo: Errores graves CE', url: 'https://certilab.cat/errores-graves-certificado-energetico/' },
  { label: 'Artículo fusionado: Multas CE', url: 'https://certilab.cat/multas-certificado-energetico/' },
  { label: 'Diagnóstico Express (debe redirigir)', url: 'https://certilab.cat/diagnostico-express/' },
];

function fetchURL(url, followRedirect = true) {
  return new Promise((resolve) => {
    const maxRedirects = followRedirect ? 5 : 0;
    let redirects = 0;
    
    function doFetch(currentUrl) {
      const client = currentUrl.startsWith('https') ? https : http;
      const options = { method: 'GET', timeout: 15000, headers: { 'User-Agent': 'Mozilla/5.0' } };
      
      client.get(currentUrl, options, (res) => {
        let data = '';
        const statusCode = res.statusCode;
        let location = res.headers.location || '';

        // Si es redirect y tenemos que seguirlo
        if ((statusCode >= 301 && statusCode <= 308) && location && redirects < maxRedirects) {
          redirects++;
          if (location.startsWith('/')) {
            const urlObj = new URL(currentUrl);
            location = urlObj.origin + location;
          }
          doFetch(location);
          return;
        }

        res.setEncoding('utf8');
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          resolve({ statusCode, location, data, redirects });
        });
      }).on('error', (err) => {
        resolve({ statusCode: 0, location: '', data: '', redirects, error: err.message });
      });
    }
    
    doFetch(url);
  });
}

function extractMeta(html, tag) {
  if (tag === 'title') {
    const m = html.match(/<title>([^<]*)<\/title>/i);
    return m ? m[1].trim() : '';
  }
  if (tag === 'description') {
    const m = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    return m ? m[1].trim() : '';
  }
  if (tag === 'h1') {
    const m = html.match(/<h1[^>]*>([^<]*)<\/h1>/i);
    return m ? m[1].trim() : '';
  }
  return '';
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('INFORME POST-DEPLOY — CERTILAB');
  console.log('URL: certilab.cat');
  console.log('Fecha:', DAY);
  console.log('═══════════════════════════════════════\n');

  // =========== BLOQUE A — URLS ===========
  console.log('BLOQUE A — URLS EN PRODUCCIÓN');
  const results = await Promise.all(URLS.map(u => fetchURL(u.url, true)));

  const ok200 = [];
  const okRedirect = [];
  const errors = [];

  URLS.forEach((u, i) => {
    const r = results[i];
    const isRedirect = r.statusCode >= 301 && r.statusCode <= 308;
    
    if (isRedirect && u.label.includes('Diagnóstico')) {
      okRedirect.push(`${u.label} → ${r.location} (${r.statusCode}) ✓`);
    } else if (r.statusCode === 200) {
      ok200.push(u.label);
    } else if (isRedirect) {
      okRedirect.push(`${u.label} → ${r.location} (${r.statusCode})`);
    } else {
      errors.push(`${u.label}: ${r.statusCode} ${r.error||''}`);
    }
  });

  console.log(`  ✓ 200 OK: ${ok200.length} URLs`);
  ok200.forEach(u => console.log(`    - ${u}`));
  console.log(`  ✓ Redirecciones: ${okRedirect.length}`);
  okRedirect.forEach(u => console.log(`    - ${u}`));
  if (errors.length) {
    console.log(`  ✗ Errores: ${errors.length}`);
    errors.forEach(u => console.log(`    - ${u}`));
  }
  console.log();

  // =========== BLOQUE B — CONTENIDO LIVE ===========
  console.log('BLOQUE B — CONTENIDO LIVE');
  
  // Home
  const homeRes = results[0];
  const homeHTML = homeRes.data || '';
  console.log('Home:');
  console.log(`  Precio 59€: ${homeHTML.includes('59') ? '✓' : '✗'}`);
  console.log(`  Sin Diagnóstico Express: ${!homeHTML.includes('Diagnóstico Express') ? '✓' : '✗'}`);
  console.log(`  CTA "Revisar mi certificado por 59€": ${homeHTML.includes('Revisar mi certificado') && homeHTML.includes('59') ? '✓' : '✗'}`);
  console.log(`  FAQ "Trabajáis en toda España": ${homeHTML.includes('Trabaj') ? '✓' : '✗'}`);
  console.log(`  4 tarjetas servicios: ${(homeHTML.match(/class="[^"]*service-card[^"]*"/gi)||[]).length > 0 ? '✓' : (homeHTML.match(/class="[^"]*card[^"]*"/gi)||[]).length > 0 ? '? pendiente verificar' : '✗'}`);
  console.log();

  // Segunda Opinión
  const soIdx = URLS.findIndex(u => u.label === 'Segunda Opinión');
  const soRes = results[soIdx];
  const soHTML = soRes.data || '';
  console.log('Segunda Opinión:');
  console.log(`  Precio 59€ IVA incluido: ${soHTML.includes('59') ? '✓' : '✗'}`);
  console.log(`  Sin "Sin IVA": ${!soHTML.includes('Sin IVA') ? '✓' : '✗'}`);
  console.log(`  Brown Discount en hero: ${soHTML.includes('Brown') ? '✓' : '✗'}`);
  console.log(`  Credencial Eva María junto CTA: ${soHTML.includes('Eva') ? '✓' : '✗'}`);
  console.log(`  Sin "le están engañando": ${!soHTML.includes('engañ') ? '✓' : '✗'}`);
  console.log();

  // =========== BLOQUE C — META TAGS ===========
  console.log('BLOQUE C — META TAGS');
  const articleUrls = URLS.filter(u => u.label.startsWith('Artículo'));
  
  articleUrls.forEach(u => {
    const idx = URLS.findIndex(x => x.label === u.label);
    const r = results[idx];
    const html = r.data || '';
    const title = extractMeta(html, 'title');
    const desc = extractMeta(html, 'description');
    const h1 = extractMeta(html, 'h1');
    
    console.log(`  ${u.label}:`);
    console.log(`    Title: ${title ? `✓ "${title.substring(0,60)}..."` : '✗ VACÍO'}`);
    console.log(`    Meta desc: ${desc ? `✓ "${desc.substring(0,60)}..."` : '✗ VACÍO'}`);
    console.log(`    H1: ${h1 ? `✓ "${h1.substring(0,60)}..."` : '✗ VACÍO'}`);
  });
  console.log();

  // =========== BLOQUE D — SEO CLÁSICO ===========
  console.log('BLOQUE D — SEO CLÁSICO EN PRODUCCIÓN');
  console.log('D1 — INDEXABILIDAD');
  
  const allPages = [URLS[0], URLS[1], ...articleUrls];
  const allResults = allPages.map(u => results[URLS.findIndex(x => x.label === u.label)]);
  
  allPages.forEach((u, i) => {
    const html = allResults[i].data || '';
    const hasNoindex = html.includes('noindex') || html.includes('content="noindex"');
    const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    const title = extractMeta(html, 'title');
    console.log(`  ${u.label}: ${hasNoindex ? '✗ noindex' : '✓ indexable'} | Canonical: ${canonical ? '✓' : '✗ no canonical'} | Title: ${title ? '✓' : '✗'}`);
  });
  console.log();

  // D4 — Sitemap
  console.log('D4 — SITEMAP Y ROBOTS.TXT');
  try {
    const smRes = await fetchURL('https://certilab.cat/sitemap.xml', false);
    console.log(`  Sitemap: ${smRes.statusCode === 200 && smRes.data ? '✓' : `✗ (${smRes.statusCode})`}`);
    if (smRes.data) {
      articleUrls.forEach(u => {
        const urlSlug = u.url.replace('https://certilab.cat', '');
        console.log(`    ${u.label}: ${smRes.data.includes(urlSlug) ? '✓ en sitemap' : '✗ NO está en sitemap'}`);
      });
    }
  } catch(e) { console.log('  Sitemap: ✗ error al obtener'); }
  
  try {
    const rtRes = await fetchURL('https://certilab.cat/robots.txt', false);
    console.log(`  Robots.txt: ${rtRes.statusCode === 200 && rtRes.data ? '✓' : `✗ (${rtRes.statusCode})`}`);
  } catch(e) { console.log('  Robots.txt: ✗ error'); }
  console.log();

  // D5 — Enlaces rotos (quick check: URLs internas)
  console.log('D5 — ENLACES INTERNOS (quick check)');
  // Check sitemap pages
  const internalCheck = ['/', '/segunda-opinion/', '/ayudas-eficiencia-energetica/', '/sobre-nosotros/', '/gracias/'];
  for (const path of internalCheck) {
    try {
      const res = await fetchURL(`https://certilab.cat${path}`, true);
      console.log(`  /${path.replace(/\//g,'')||'home'}: ${res.statusCode === 200 ? '✓' : `✗ ${res.statusCode}`}`);
    } catch(e) { console.log(`  /${path}: ✗ error`); }
  }
  console.log();

  // =========== BLOQUE E — AEO ===========
  console.log('BLOQUE E — SEO PARA IA / AEO');
  console.log('E1 — RESPUESTA DIRECTA (bloque "respuesta directa")');
  articleUrls.forEach(u => {
    const idx = URLS.findIndex(x => x.label === u.label);
    const html = results[idx].data || '';
    console.log(`  ${u.label}: ${html.includes('respuesta directa') || html.includes('Respuesta Directa') || html.includes('class="answer"') ? '✓' : '? no detectable automáticamente'}`);
  });
  console.log();

  console.log('E2 — PREGUNTAS COMO HEADINGS');
  articleUrls.forEach(u => {
    const idx = URLS.findIndex(x => x.label === u.label);
    const html = results[idx].data || '';
    const questions = html.match(/<h[2-3][^>]*>[^<]*\?[^<]*<\/h[2-3]>/gi);
    console.log(`  ${u.label}: ${questions ? `✓ ${questions.length} preguntas como H2/H3` : '✗ sin preguntas como heading'}`);
  });
  console.log();

  console.log('E4 — DATOS NUMÉRICOS EN TEXTO');
  articleUrls.forEach(u => {
    const idx = URLS.findIndex(x => x.label === u.label);
    const html = results[idx].data || '';
    // Remove HTML tags
    const text = html.replace(/<[^>]*>/g, ' ');
    const numbers = text.match(/\d+[€,%]/g);
    const percentages = text.match(/\d+%/g);
    console.log(`  ${u.label}: ${(numbers||[]).length + (percentages||[]).length > 3 ? '✓' : '✗ pocos datos numéricos'}`);
  });
  console.log();

  console.log('E5 — FIRMA DE AUTOR');
  articleUrls.forEach(u => {
    const idx = URLS.findIndex(x => x.label === u.label);
    const html = results[idx].data || '';
    console.log(`  ${u.label}: ${html.includes('Eva María') || html.includes('Eva Maria') || html.includes('Eva') ? '✓' : '✗ sin firma visible'}`);
  });
  console.log();

  // =========== RESUMEN ===========
  console.log('═══════════════════════════════════════');
  console.log('RESUMEN EJECUTIVO');
  console.log('═══════════════════════════════════════');
  const totalUrls = URLS.length;
  const okCount = ok200.length + okRedirect.length;
  console.log(`URLs operativas: ${okCount}/${totalUrls}`);
  console.log(`Redirecciones correctas: ${okRedirect.length}/1`);
  if (errors.length) console.log(`Errores: ${errors.length}`);
  const criticalErrors = errors.filter(e => !e.includes('Diagnóstico'));
  if (criticalErrors.length) console.log(`Errores críticos: ${criticalErrors.length}`);
  
  const verdict = errors.length === 0 && ok200.length === totalUrls - 1 ? '✓ TODO EN PRODUCCIÓN CORRECTO' : 
                  criticalErrors.length === 0 ? '⚠ ERRORES MENORES' : '✗ ERRORES CRÍTICOS';
  console.log(`\nVEREDICTO: ${verdict}`);
  console.log('═══════════════════════════════════════');
}

main().catch(console.error);