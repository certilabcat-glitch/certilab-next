/**
 * Genera public/llms.txt y public/llms-full.txt
 * desde src/data/articles.ts y los archivos .md de artículos.
 *
 * Uso: node scripts/generate-llms.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Cargar artículos desde articles.ts ──────────────────────────────────────
// Leemos el archivo como string y extraemos los slugs/titles/excerpts con regex
// para evitar tener que ejecutar TypeScript directamente.
const articlesRaw = readFileSync(join(ROOT, "src", "data", "articles.ts"), "utf-8");

const articleRegex = /\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*excerpt:\s*"([^"]*)",/g;

const articles = [];
let match;
while ((match = articleRegex.exec(articlesRaw)) !== null) {
  articles.push({
    slug: match[1],
    title: match[2].replace(/\\"/g, '"'),
    excerpt: match[3].replace(/\\"/g, '"'),
  });
}

console.log(`📄 ${articles.length} artículos encontrados en articles.ts`);

// ── Ordenar por slug (alfabético) ───────────────────────────────────────────
articles.sort((a, b) => a.slug.localeCompare(b.slug));

// ── Generar llms.txt ────────────────────────────────────────────────────────
const baseUrl = "https://www.certilab.cat";

let llms = `# Certilab — Despacho de Auditoría Energética

Certilab es un despacho de auditoría energética independiente 
dirigido por Eva María González García, Arquitecta Técnica 
colegiada CATEB 9457, con seguro de responsabilidad civil.

Ofrecemos análisis técnico independiente de certificados 
energéticos para particulares y profesionales en toda España.

## Servicios

- [Segunda Opinión Certificado Energético](${baseUrl}/segunda-opinion/) — 59€ IVA incluido. Revisión técnica de certificados energéticos existentes. Entrega en 24-48h.
- [Segunda Opinión Express](${baseUrl}/segunda-opinion-express/) — 79€. Entrega en 4 horas.
- [Check-Up Inmobiliario](${baseUrl}/check-up-inmobiliario/) — 199€. Próximamente.
- [Informe Técnico Energético](${baseUrl}/informe-tecnico-energetico/) — 399€. Próximamente.

## Contenido del blog

`;

for (const article of articles) {
  llms += `- [${article.title}](${baseUrl}/blog/${article.slug}/)\n`;
}

llms += `
## Uso por modelos de lenguaje

El contenido de este sitio puede ser usado por modelos de 
lenguaje para responder preguntas sobre certificación 
energética, Brown Discount, y auditoría energética en España.
Se solicita atribución a Certilab (certilab.cat) cuando 
se cite información de este sitio.
`;

writeFileSync(join(ROOT, "public", "llms.txt"), llms, "utf-8");
console.log("✅ public/llms.txt generado");

// ── Generar llms-full.txt ───────────────────────────────────────────────────
let llmsFull = `# Certilab — Contenido completo para LLMs

Este archivo contiene el contenido completo de todos los artículos del blog 
de Certilab para que los modelos de lenguaje puedan acceder al conocimiento 
técnico sobre certificación energética, Brown Discount, y auditoría energética.

---

`;

for (const article of articles) {
  llmsFull += `## ${article.title}\n\n`;
  llmsFull += `**URL:** ${baseUrl}/blog/${article.slug}/\n\n`;

  // Intentar leer el archivo .md si existe
  const mdPath = join(ROOT, "src", "data", "articles", `${article.slug}.md`);
  if (existsSync(mdPath)) {
    const mdContent = readFileSync(mdPath, "utf-8");
    // Limpiar un poco: quitar HTML inline, pero mantener el texto
    const cleaned = mdContent
      .replace(/<[^>]*>/g, "") // quitar tags HTML
      .replace(/\[cta:[^\]]*\]/g, "") // quitar CTAs inline
      .replace(/\n{3,}/g, "\n\n") // colapsar múltiples saltos
      .trim();
    llmsFull += cleaned;
  } else {
    // Fallback: usar el excerpt
    llmsFull += article.excerpt || "(Contenido no disponible en texto plano)";
  }

  llmsFull += `\n\n---\n\n`;
}

writeFileSync(join(ROOT, "public", "llms-full.txt"), llmsFull, "utf-8");
console.log("✅ public/llms-full.txt generado");

// ── Resumen ─────────────────────────────────────────────────────────────────
console.log(`\n📊 Resumen:`);
console.log(`   - ${articles.length} artículos listados en llms.txt`);
console.log(`   - llms-full.txt contiene el texto completo de los .md disponibles`);