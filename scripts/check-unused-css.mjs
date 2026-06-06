#!/usr/bin/env node
/**
 * Detecta clases CSS definidas en .module.css que no se usan
 * en el componente .tsx correspondiente.
 * Uso: node scripts/check-unused-css.mjs
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, resolve } from "path";

const SRC = resolve("src");

// Recopilar todos los .module.css y .tsx
const cssModules = [];
const tsxFiles = [];

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      walk(full);
    } else if (entry.name.endsWith(".module.css")) {
      cssModules.push(full);
    } else if (entry.name.endsWith(".tsx")) {
      tsxFiles.push(full);
    }
  }
}

walk(SRC);

let totalUnused = 0;
let filesWithUnused = 0;

for (const cssPath of cssModules) {
  // Buscar el .tsx correspondiente (mismo nombre, mismo directorio)
  const dir = cssPath.replace(/\\/g, "/").substring(0, cssPath.replace(/\\/g, "/").lastIndexOf("/"));
  const baseName = cssPath.replace(/\\/g, "/").split("/").pop().replace(".module.css", "");
  const tsxPath = join(dir, `${baseName}.tsx`);

  if (!tsxFiles.includes(tsxPath)) {
    console.log(`⚠️  Sin .tsx correspondiente: ${relative(SRC, cssPath)}`);
    continue;
  }

  const cssContent = readFileSync(cssPath, "utf-8");
  const tsxContent = readFileSync(tsxPath, "utf-8");

  // Extraer nombres de clase del CSS
  // Busca: .nombreClase { o .nombreClase, o .nombreClase: o .nombreClase.
  const classRegex = /\.([a-zA-Z][\w-]*)\b(?:\s*[,{:.\s])/g;
  const cssClasses = new Set();
  let match;
  while ((match = classRegex.exec(cssContent)) !== null) {
    const cls = match[1];
    // Saltar pseudo-clases y selectores
    if (!["hover", "focus", "active", "before", "after", "first", "last", "nth", "not", "is", "where", "has"].includes(cls)) {
      // Solo clases simples (no anidadas complejas)
      if (!cls.includes("(") && !cls.includes(")")) {
        cssClasses.add(cls);
      }
    }
  }

  // Extraer usos de styles.xxx y styles["xxx"] en el TSX
  const useRegex = /styles\.([a-zA-Z][\w-]*)|styles\["([^"]+)"\]|styles\[`([^`]+)`\]|styles\['([^']+)'\]/g;
  const usedClasses = new Set();
  while ((match = useRegex.exec(tsxContent)) !== null) {
    const cls = match[1] || match[2] || match[3] || match[4];
    if (cls) usedClasses.add(cls);
  }

  // Encontrar no usadas
  const unused = [...cssClasses].filter((c) => !usedClasses.has(c));

  if (unused.length > 0) {
    filesWithUnused++;
    totalUnused += unused.length;
    const relPath = relative(SRC, cssPath);
    console.log(`\n🔴 ${relPath} (${unused.length} no usadas):`);
    for (const cls of unused) {
      console.log(`   - .${cls}`);
    }
  }
}

console.log(`\n========================================`);
console.log(`Resumen:`);
console.log(`  CSS Modules analizados: ${cssModules.length}`);
console.log(`  Archivos con CSS no usado: ${filesWithUnused}`);
console.log(`  Total clases no usadas: ${totalUnused}`);
console.log(`========================================`);