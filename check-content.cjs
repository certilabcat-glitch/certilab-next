const https = require('https');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400) {
        // Follow redirect
        const loc = res.headers.location;
        res.resume();
        const nextUrl = loc.startsWith('http') ? loc : `https://www.certilab.cat${loc}`;
        https.get(nextUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
          let data2 = '';
          res2.on('data', c => data2 += c);
          res2.on('end', () => resolve(data2));
        }).on('error', reject);
        return;
      }
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  // BLOQUE B — Home
  console.log('=== HOME PAGE ===');
  const homeHtml = await fetchHtml('https://www.certilab.cat/');
  
  const checks = [
    { label: 'Precio 59€', pattern: /59\s*€/i },
    { label: 'Sin Diagnóstico Express', pattern: /diagnóstico\s*express/i, expect: false },
    { label: 'CTA hero "Revisar mi certificado por 59€"', pattern: /revisar\s*mi\s*certificado/i },
    { label: 'FAQ "Trabajáis en toda España"', pattern: /toda\s*españa/i },
    { label: '4 tarjetas servicios (sin gratuita)', pattern: /gratuita/i, expect: false },
  ];
  
  for (const check of checks) {
    const found = check.pattern.test(homeHtml);
    if (check.expect === false) {
      console.log(`  ${found ? '✗ ENCONTRADO (debe NO estar)' : '✓ NO ENCONTRADO'}: ${check.label}`);
    } else {
      console.log(`  ${found ? '✓' : '✗'} ${check.label}`);
    }
  }

  // Extract services grid - count service cards
  const serviceCards = homeHtml.match(/<div[^>]*class="[^"]*service[^"]*"[^>]*>/gi);
  console.log(`  Servicios count: ${serviceCards ? serviceCards.length : 'no encontrados'}`);

  // === SEGUNDA OPINION PAGE ===
  console.log('\n=== SEGUNDA OPINIÓN PAGE ===');
  const soHtml = await fetchHtml('https://www.certilab.cat/segunda-opinion/');

  const soChecks = [
    { label: 'Precio 59€ IVA incluido', pattern: /59\s*€.*iva|iva.*59\s*€/i },
    { label: 'Sin "Sin IVA"', pattern: /sin\s*iva/i, expect: false },
    { label: 'Brown Discount en hero', pattern: /brown\s*discount|brown\s*descuento/i },
    { label: 'Eva María visible junto CTA', pattern: /eva\s*marí[ai]/i },
    { label: 'Sin "le están engañando"', pattern: /engañando/i, expect: false },
  ];

  for (const check of soChecks) {
    const found = check.pattern.test(soHtml);
    if (check.expect === false) {
      console.log(`  ${found ? '✗ ENCONTRADO (debe NO estar)' : '✓ NO ENCONTRADO'}: ${check.label}`);
    } else {
      console.log(`  ${found ? '✓' : '✗'} ${check.label}`);
    }
  }

  // BLOQUE C — Meta tags for articles
  console.log('\n=== BLOQUE C — META TAGS ARTÍCULOS ===');
  const articleUrls = [
    { name: 'Reclamar CE incorrecto', url: 'https://www.certilab.cat/reclamar-certificado-energetico-incorrecto/' },
    { name: 'CE F-G correcto', url: 'https://www.certilab.cat/certificado-energetico-f-g-correcto/' },
    { name: 'CE vendedor fiable', url: 'https://www.certilab.cat/certificado-energetico-vendedor-fiable/' },
    { name: 'CE inflado qué hacer', url: 'https://www.certilab.cat/certificado-energetico-inflado-que-hacer/' },
    { name: 'CE negociar precio', url: 'https://www.certilab.cat/certificado-energetico-negociar-precio/' },
    { name: 'Perder dinero CE mal hecho', url: 'https://www.certilab.cat/perder-dinero-certificado-energetico-mal-hecho/' },
    { name: 'CE hipoteca verde', url: 'https://www.certilab.cat/certificado-energetico-hipoteca-verde/' },
    { name: 'Segunda opinión CE', url: 'https://www.certilab.cat/segunda-opinion-certificado-energetico/' },
    { name: 'Errores graves CE', url: 'https://www.certilab.cat/errores-graves-certificado-energetico/' },
    { name: 'Multas CE', url: 'https://www.certilab.cat/multas-certificado-energetico/' },
  ];

  for (const art of articleUrls) {
    try {
      const html = await fetchHtml(art.url);
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
      const h1Match = html.match(/<h1[^>]*>([^<]*)<\/h1>/i);
      
      const title = titleMatch ? titleMatch[1] : 'NO ENCONTRADO';
      const desc = descMatch ? descMatch[1] : 'NO ENCONTRADO';
      const h1 = h1Match ? h1Match[1] : 'NO ENCONTRADO';
      
      const tOk = title && !title.includes('Sin título') && !title.includes('Descripción') && title !== 'NO ENCONTRADO';
      const dOk = desc && !desc.includes('Sin título') && !desc.includes('Descripción') && desc !== 'NO ENCONTRADO';
      const hOk = h1 && h1 !== 'NO ENCONTRADO';
      
      console.log(`  ${tOk ? '✓' : '✗'} ${art.name}:`);
      console.log(`     Title: ${title.substring(0, 80)}`);
      console.log(`     Desc:  ${desc.substring(0, 80)}`);
      console.log(`     H1:    ${h1.substring(0, 60)}`);
    } catch(e) {
      console.log(`  ✗ ${art.name}: ERROR fetching - ${e.message}`);
    }
  }
}

main().catch(console.error);