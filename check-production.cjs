const https = require("https");

async function fetchUrl(url, followRedirects = false) {
  return new Promise((resolve) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: "GET",
      rejectUnauthorized: false,
      timeout: 15000,
    };
    const req = https.request(options, (res) => {
      let data = "";
      const status = res.statusCode;
      const location = res.headers.location || null;

      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({ url, status, location, body: data.substring(0, 50000) });
      });
    });
    req.on("error", (e) => resolve({ url, status: "ERROR", location: null, body: e.message }));
    req.on("timeout", () => { req.destroy(); resolve({ url, status: "TIMEOUT", location: null, body: "" }); });
    req.end();
  });
}

function extractMeta(html, tag, attr) {
  const regex = new RegExp(`<${tag}[^>]*${attr}=["']([^"']+)["'][^>]*>`, "i");
  const m = html.match(regex);
  return m ? m[1] : null;
}

(async () => {
  const urls = [
    "https://certilab.cat/",
    "https://certilab.cat/segunda-opinion/",
    // Tier 1
    "https://certilab.cat/reclamar-certificado-energetico-incorrecto/",
    "https://certilab.cat/certificado-energetico-f-g-correcto/",
    "https://certilab.cat/certificado-energetico-vendedor-fiable/",
    "https://certilab.cat/certificado-energetico-inflado-que-hacer/",
    // Tier 2
    "https://certilab.cat/certificado-energetico-negociar-precio/",
    "https://certilab.cat/perder-dinero-certificado-energetico-mal-hecho/",
    "https://certilab.cat/certificado-energetico-hipoteca-verde/",
    "https://certilab.cat/segunda-opinion-certificado-energetico/",
    "https://certilab.cat/errores-graves-certificado-energetico/",
    // Fusionado
    "https://certilab.cat/multas-certificado-energetico/",
    // Redirecciones
    "https://certilab.cat/diagnostico-express/",
    "https://certilab.cat/blog/sanciones-multas-no-tener-certificado-energetico",
    "https://certilab.cat/blog/multas-no-tener-certificado-energetico",
  ];

  console.log("═══════════════════════════════════════");
  console.log("BLOQUE A — URLS EN PRODUCCIÓN");
  console.log("═══════════════════════════════════════\n");

  for (const url of urls) {
    const result = await fetchUrl(url);
    if (result.status >= 300 && result.status < 400) {
      console.log(`→ ${result.url}`);
      console.log(`  ${result.status} → ${result.location}`);
      // Follow redirect and check again
      if (result.location) {
        const absUrl = result.location.startsWith("http") ? result.location : `https://certilab.cat${result.location}`;
        const result2 = await fetchUrl(absUrl);
        console.log(`  ↳ ${result2.status} (${result2.body.substring(0,100).replace(/\n/g," ")})`);
      }
    } else {
      const title = extractMeta(result.body, "title", "") ? result.body.match(/<title>([^<]*)<\/title>/i)?.[1] : "N/A";
      const desc = extractMeta(result.body, "meta", "name") || extractMeta(result.body, "meta", "property");
      console.log(`✓ ${result.url}`);
      console.log(`  ${result.status} | title: ${title || "(no title)"}`);
    }
  }
})();