const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const req = https.get(u.href, { rejectUnauthorized: false, timeout: 15000 }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        resolve({ url, status: res.statusCode, location: res.headers.location || '' });
      });
    });
    req.on('error', (e) => resolve({ url, status: 'ERROR', location: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT', location: '' }); });
  });
}

async function main() {
  const urls = [
    'https://certilab.cat/',
    'https://certilab.cat/segunda-opinion/',
    'https://certilab.cat/reclamar-certificado-energetico-incorrecto/',
    'https://certilab.cat/certificado-energetico-f-g-correcto/',
    'https://certilab.cat/certificado-energetico-vendedor-fiable/',
    'https://certilab.cat/certificado-energetico-inflado-que-hacer/',
    'https://certilab.cat/certificado-energetico-negociar-precio/',
    'https://certilab.cat/perder-dinero-certificado-energetico-mal-hecho/',
    'https://certilab.cat/certificado-energetico-hipoteca-verde/',
    'https://certilab.cat/segunda-opinion-certificado-energetico/',
    'https://certilab.cat/errores-graves-certificado-energetico/',
    'https://certilab.cat/multas-certificado-energetico/',
    'https://certilab.cat/diagnostico-express/'
  ];

  for (const url of urls) {
    const r = await checkUrl(url);
    console.log(r.status + '\t' + (r.location || '-') + '\t' + url);
  }
}

main();