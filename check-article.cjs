const https = require('https');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const isFirst = !url.startsWith('https://www');
    const fullUrl = isFirst ? url : url;
    https.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400) {
        const loc = res.headers.location;
        res.resume();
        const nextUrl = loc.startsWith('http') ? loc : `https://www.certilab.cat${loc}`;
        console.log(`  Following redirect → ${nextUrl}`);
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
  const url = 'https://certilab.cat/reclamar-certificado-energetico-incorrecto/';
  console.log('Fetching:', url);
  const html = await fetchHtml(url);
  
  // Save first 5000 chars to see structure
  console.log('\n=== FIRST 2000 CHARS ===');
  console.log(html.substring(0, 2000));
  
  console.log('\n=== META SEARCH ===');
  const titleMatch = html.match(/<title>([^<]*?)<\/title>/i);
  console.log('Title match:', titleMatch ? titleMatch[1] : 'NONE');
  
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*\/?>/i);
  console.log('Desc match:', descMatch ? descMatch[1] : 'NONE');
  
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  console.log('H1 match:', h1Match ? h1Match[1].trim() : 'NONE');
  
  const noIndex = html.match(/<meta[^>]*name="robots"[^>]*\/?>/i);
  console.log('Robots:', noIndex ? noIndex[0] : 'NONE');
  
  // Check if this is a Next.js 404 (catch-all)
  const contains404 = html.includes('404') || html.includes('not-found') || html.includes('Not Found');
  console.log('Contains 404 indicators:', contains404);
  
  console.log('\nTotal HTML length:', html.length);
}

main().catch(console.error);