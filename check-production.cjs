const urls = [
  'https://www.certilab.cat/',
  'https://www.certilab.cat/segunda-opinion',
  'https://www.certilab.cat/blog/reclamar-certificado-energetico-incorrecto',
  'https://www.certilab.cat/blog/certificado-energetico-f-g-correcto',
  'https://www.certilab.cat/blog/certificado-energetico-vendedor-fiable',
  'https://www.certilab.cat/blog/certificado-energetico-inflado-que-hacer',
  'https://www.certilab.cat/blog/certificado-energetico-negociar-precio',
  'https://www.certilab.cat/blog/perder-dinero-certificado-energetico-mal-hecho',
  'https://www.certilab.cat/blog/certificado-energetico-hipoteca-verde',
  'https://www.certilab.cat/blog/segunda-opinion-certificado-energetico',
  'https://www.certilab.cat/blog/errores-graves-certificado-energetico',
  'https://www.certilab.cat/blog/multas-certificado-energetico'
];

(async () => {
  for (const url of urls) {
    try {
      const resp = await fetch(url);
      const html = await resp.text();
      const titleMatch = html.match(/<title>([^<]*)<\/title>/);
      const title = titleMatch ? titleMatch[1].trim() : 'NO ENCONTRADO';
      const descMatch = html.match(/<meta name="description" content="([^"]*)"[\s\/]*>/i);
      const desc = descMatch ? descMatch[1].trim() : 'NO ENCONTRADO';
      const h1Match = html.match(/<h1[^>]*>([^<]*)<\/h1>/i);
      const h1 = h1Match ? h1Match[1].trim() : 'NO ENCONTRADO';
      process.stdout.write('=== ' + url + ' ===\n');
      process.stdout.write('TITLE: ' + title + '\n');
      process.stdout.write('DESC: ' + desc + '\n');
      process.stdout.write('H1: ' + h1 + '\n\n');
    } catch (e) {
      process.stdout.write(url + ' => ERROR: ' + e.message + '\n');
    }
  }
})();