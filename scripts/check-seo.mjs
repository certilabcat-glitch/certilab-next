import https from 'https';

const urls = [
  { name: 'Home', url: 'https://www.certilab.cat/' },
  { name: 'Segunda Opinión', url: 'https://www.certilab.cat/segunda-opinion/' },
  { name: 'Express', url: 'https://www.certilab.cat/segunda-opinion-express/' },
  { name: 'ITE', url: 'https://www.certilab.cat/informe-tecnico-energetico/' },
  { name: 'Check-up', url: 'https://www.certilab.cat/check-up-inmobiliario/' },
  { name: 'Gracias', url: 'https://www.certilab.cat/gracias/' },
  { name: 'Resultado Auditoría', url: 'https://www.certilab.cat/resultado-auditoria/' },
  { name: 'Buscador CE Catalunya', url: 'https://www.certilab.cat/buscador-certificado-energetico-catalunya/' },
  { name: 'NotFound (404 real)', url: 'https://www.certilab.cat/esta-pagina-no-existe/' },
];

let pending = urls.length;

urls.forEach(({ name, url }) => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let d = '';
    res.on('data', (c) => (d += c));
    res.on('end', () => {
      const title = d.match(/<title>([^<]+)<\/title>/)?.[1] || 'MISSING';
      const desc = d.match(/<meta name="description" content="([^"]+)"/)?.[1] || d.match(/<meta name='description' content='([^']+)'/)?.[1] || 'MISSING';
      const canonical = d.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || 'MISSING';
      const ogTitle = d.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || 'MISSING';
      const ogDesc = d.match(/<meta property="og:description" content="([^"]+)"/)?.[1] || 'MISSING';
      const h1 = d.match(/<h1[^>]*>([^<]+)<\/h1>/)?.[1] || 'MISSING';
      const ld = d.match(/<script type="application\/ld\+json"[^>]*>([^<]+)<\/script>/)?.[1] || null;
      const viewport = d.match(/<meta name="viewport" content="([^"]+)"/)?.[1] || 'MISSING';
      const lang = d.match(/<html[^>]*lang="([^"]+)"/)?.[1] || 'MISSING';

      console.log(`\n========== ${name} (${res.statusCode}) ==========`);
      console.log(`🗺️  Canonical: ${canonical}`);
      console.log(`🏷️  Title: ${title}`);
      console.log(`📝 Description: ${desc.substring(0, 120)}${desc.length > 120 ? '...' : ''}`);
      console.log(`📰 OG Title: ${ogTitle}`);
      console.log(`📰 OG Desc: ${ogDesc.substring(0, 80)}${ogDesc.length > 80 ? '...' : ''}`);
      console.log(`📐 H1: ${h1}`);
      console.log(`🌐 lang: ${lang}`);
      console.log(`📱 Viewport: ${viewport}`);
      console.log(`🧠 Schema.org: ${ld ? 'PRESENT (' + ld.length + ' chars)' : 'MISSING'}`);

      pending--;
      if (pending === 0) {
        // Check robots.txt
        https.get('https://www.certilab.cat/robots.txt', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r2) => {
          let rd = '';
          r2.on('data', (c) => (rd += c));
          r2.on('end', () => {
            console.log('\n========== robots.txt ==========');
            console.log(rd.substring(0, 600));
            
            // Check sitemap
            https.get('https://www.certilab.cat/sitemap.xml', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r3) => {
              let sd = '';
              r3.on('data', (c) => (sd += c));
              r3.on('end', () => {
                console.log('\n========== sitemap.xml ==========');
                const urlsCount = (sd.match(/<url>/g) || []).length;
                console.log(`URLs in sitemap: ${urlsCount}`);
                const locs = [...sd.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
                locs.forEach(l => console.log(`  ${l}`));

                // Check llms.txt
                https.get('https://www.certilab.cat/llms.txt', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r4) => {
                  let lld = '';
                  r4.on('data', (c) => (lld += c));
                  r4.on('end', () => {
                    console.log('\n========== llms.txt ==========');
                    console.log(lld.substring(0, 500));
                    process.exit(0);
                  });
                });
              });
            });
          });
        });
      }
    });
  });
});