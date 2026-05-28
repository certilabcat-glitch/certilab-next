/**
 * Genera un placeholder og-image.jpg (1200x630px) en public/
 * Requiere: node >= 18
 * Uso: node scripts/generate-og-image.mjs
 *
 * Si no tienes Sharp instalado, simplemente creamos un SVG y lo convertimos.
 * Fallback: crea un SVG básico como placeholder.
 */
import { writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, "..", "public", "og-image.jpg");

// Si ya existe, no sobreescribir
if (existsSync(outputPath)) {
  console.log("✅ og-image.jpg ya existe en public/");
  process.exit(0);
}

// Intentamos generar con Sharp
try {
  const sharp = (await import("sharp")).default;
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a"/>
          <stop offset="100%" style="stop-color:#2d2d2d"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <text x="600" y="280" text-anchor="middle" font-family="Georgia,serif" font-size="64" fill="#f5f0eb" font-weight="300">Certilab</text>
      <text x="600" y="350" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#a0887a" letter-spacing="4">CONSULTORÍA ENERGÉTICA FORENSE</text>
      <line x1="500" y1="380" x2="700" y2="380" stroke="#a0887a" stroke-width="1"/>
      <text x="600" y="420" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="#666">Certilab.cat</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 85 })
    .toFile(outputPath);

  console.log("✅ og-image.jpg generado en public/ (1200x630px)");
} catch {
  // Fallback: crear SVG
  const svgPath = join(__dirname, "..", "public", "og-image.svg");
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#1a1a1a"/>
    <text x="600" y="280" text-anchor="middle" font-family="Georgia,serif" font-size="64" fill="#f5f0eb" font-weight="300">Certilab</text>
    <text x="600" y="350" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#a0887a" letter-spacing="4">CONSULTORÍA ENERGÉTICA FORENSE</text>
    <text x="600" y="420" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="#666">Certilab.cat</text>
  </svg>`;
  writeFileSync(svgPath, svg);
  console.log("⚠️ Sharp no disponible. Creado og-image.svg como placeholder en public/");
  console.log("   Convierte manualmente a JPG 1200x630 o instala sharp: npm install sharp");
}