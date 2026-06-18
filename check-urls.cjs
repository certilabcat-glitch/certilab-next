const https = require("https");

async function fetchUrl(url, maxRedirects = 5) {
  let currentUrl = url;
  let redirects = [];
  for (let i = 0; i <= maxRedirects; i++) {
    const parsed = new URL(currentUrl);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: "GET",
      rejectUnauthorized: false,
      timeout: 15000,
      headers: { "User-Agent": "Mozilla/5.0" },
    };
    const result = await new Promise((resolve) => {
      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            url: currentUrl,
            status: res.statusCode,
            location: res.headers.location || null,
            body: data.substring(0, 60000),
          });
        });
      });
      req.on("error", (e) => resolve({ url: currentUrl, status: "ERROR", location: null, body: e.message }));
      req.on("timeout", () => { req.destroy(); resolve({ url: currentUrl, status: "TIMEOUT", location: null, body: "" }); });
      req.end();
    });
    redirects.push({ url: result.url, status: result.status, location: result.location });
    if (result.status >= 300 && result.status < 400 && result.location) {
      currentUrl = result.location.startsWith("http") ? result.location : `https://certilab.cat${result.location}`;
    } else {
      return { ...result, redirectChain: redirects };
    }
  }
  return { url: currentUrl, status: "TOO_MANY_REDIRECTS", location: null, body: "", redirectChain: redirects };
}

(async () => {
  // ============= BLOQUE A: URLs =============
  const urls = [
    "https://certilab.cat/",
    "https://certilab.cat/segunda-opinion/",
    "https://certilab.cat/reclamar-certificado-energetico-incorrecto/",
    "https://certilab.cat/certificado-energetico-f-g-correcto/",
    "https://certilab.cat/certificado-energetico-vendedor-fiable/",
    "https://certilab.cat/certificado-energetico-inflado-que-hacer/",
    "https://certilab.cat/certificado-energetico-negociar-precio/",
    "https://certilab.cat/perder-dinero-certificado-energetico-mal-hecho/",
    "https://certilab.cat/certificado-energetico-hipoteca-verde/",
    "https://certilab.cat/segunda-opinion-certificado-energetico/",
    "https://certilab.cat/errores-graves-certificado-energetico/",
    "https://certilab.cat/multas-certificado-energetico/",
    "https://certilab.cat/diagnostico-express/",
    "https://certilab.cat/blog/sanciones-multas-no-tener-certificado-energetico",
    "https://certilab.cat/blog/multas-no-tener-certificado-energetico",
  ];

  const results = [];
  for (const url of urls) {
    const r = await fetchUrl(url);
    results.push(r);
    const redirects = r.redirectChain.map(c => `${c.status}${c.location ? ' → ' + c.location : ''}`).join(' → ');
    const status = r.status;
    const label = status === 200 ? '✓' : status === 404 ? '✗' : '?';
    console.log(`${label} ${r.url}`);
    console.log(`  Cadena: ${redirects}`);
    console.log(`  Final: ${status} (${r.body.substring(0,80).replace(/\n/g,' ')})`);
    console.log('');
  }

  // ============= BLOQUE B: Content verification =============
  console.log("═══════════════════════════════════════");
  console.log("BLOQUE B — CONTENIDO LIVE");
  console.log("═══════════════════════════════════════\n");

  // Home
  console.log("=== HOME (https://www.certilab.cat/) ===");
  const home = results[0]; // after redirect
  const homeBody = home.body;
  const checksHome = [
    ["59€", homeBody.includes("59€")],
    ["IVA incluido", homeBody.includes("IVA incluido") || homeBody.includes("IVA inc")],
    ["Diagnóstico Express ausente", !homeBody.includes("Diagnóstico Express") && !homeBody.includes("diagnóstico express")],
    ["Revisar mi certificado por 59€", homeBody.includes("Revisar mi certificado por 59€")],
    ["Trabajáis en toda España", homeBody.includes("Trabajáis en toda España") || homeBody.includes("toda España")],
  ];
  checksHome.forEach(([name, pass]) => console.log(`  ${pass ? '✓' : '✗'} ${name}`));

  // Segunda Opinión
  console.log("\n=== SEGUNDA OPINIÓN (https://www.certilab.cat/segunda-opinion/) ===");
  const so = results[1];
  const soBody = so.body;
  const checksSO = [
    ["59€", soBody.includes("59€")],
    ["IVA incluido", soBody.includes("IVA incluido") || soBody.includes("IVA inc")],
    ["Sin 'Sin IVA'", !soBody.includes("Sin IVA")],
    ["Brown Discount en hero", soBody.includes("Brown Discount") || soBody.includes("brown discount")],
    ["Eva María visible junto a CTA", soBody.includes("Eva Mar") || soBody.includes("Eva María")],
    ["Sin 'le están engañando'", !soBody.includes("le están engañando")],
  ];
  checksSO.forEach(([name, pass]) => console.log(`  ${pass ? '✓' : '✗'} ${name}`));

  // ============= BLOQUE C: Meta tags =============
  console.log("\n═══════════════════════════════════════");
  console.log("BLOQUE C — META TAGS ARTÍCULOS");
  console.log("═══════════════════════════════════════\n");

  // Re-fetch article pages on www directly
  const articleSlugs = [
    "reclamar-certificado-energetico-incorrecto",
    "certificado-energetico-f-g-correcto",
    "certificado-energetico-vendedor-fiable",
    "certificado-energetico-inflado-que-hacer",
    "certificado-energetico-negociar-precio",
    "perder-dinero-certificado-energetico-mal-hecho",
    "certificado-energetico-hipoteca-verde",
    "segunda-opinion-certificado-energetico",
    "errores-graves-certificado-energetico",
    "multas-certificado-energetico",
  ];
  for (const slug of articleSlugs) {
    const r = await fetchUrl(`https://www.certilab.cat/${slug}/`);
    const body = r.body;
    const title = body.match(/<title>([^<]*)<\/title>/i)?.[1] || "NO TITLE";
    const desc = body.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1]
             || body.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1]
             || "NO DESCRIPTION";
    const h1 = body.match(/<h1[^>]*>([^<]*)<\/h1>/i)?.[1] || "NO H1";
    const canonical = body.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] || "NO CANONICAL";
    const noindex = body.includes("noindex") ? "⚠️ NOINDEX" : "✓ indexable";
    const schemaArticle = body.includes('"@type":"Article"') || body.includes('"@type": "Article"') ? "✓ schema Article" : "✗ sin schema Article";
    console.log(`\n--- /${slug}/ ---`);
    console.log(`  title: ${title}`);
    console.log(`  description: ${desc.substring(0,120)}`);
    console.log(`  H1: ${h1}`);
    console.log(`  canonical: ${canonical}`);
    console.log(`  robots: ${noindex}`);
    console.log(`  schema: ${schemaArticle}`);
  }
})();