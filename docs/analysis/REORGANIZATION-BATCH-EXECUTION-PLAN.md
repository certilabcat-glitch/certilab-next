# Plan de Ejecución por Lotes — Reorganización del Repositorio

> **Versión:** 1.0 — Pendiente de aprobación
> **Basado en:** `REORGANIZATION-PLAN.md` + `REORGANIZATION-DEPENDENCY-AUDIT.md`
> **Principios:** Cada lote ≤10 movimientos, completamente reversible, impacto reducido, verificación de integridad automática
> **Estado:** ❌ No ejecutar — propuesta pendiente de aprobación

---

## Estructura de cada lote

```
Lote N: [Nombre del lote]
├── Objetivo:
├── Movimientos: [N] (≤10)
├── Referencias a actualizar: [archivos]
├── Comprobación previa: [qué verificar antes de comenzar]
├── Pasos de ejecución:
│   ├── 1. [comando]
│   └── N. [comando]
├── Reversibilidad: [cómo deshacer]
├── Verificación post-lote:
│   ├── □ Referencias OK (grep)
│   ├── □ Build OK (npm run build)
│   └── □ Navegación OK (revisión manual en VS Code)
└── Riesgo: [Bajo | Medio | Alto]
```

---

## Lote 1 — Creación de índices (3 archivos nuevos, 0 movimientos)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Crear los 3 archivos índice que guiarán la navegación post-reorganización |
| **Movimientos** | 0 |
| **Archivos nuevos** | 3 (`docs/INDEX.md`, `docs/10-ANALYSIS/INDEX.md`, `docs/archive/INDEX.md`) |
| **Referencias a actualizar** | 0 (archivos nuevos, nadie los referencia aún) |
| **Riesgo** | ✅ **Muy bajo** — archivos nuevos, no afectan a nada existente |
| **Reversibilidad** | `git rm docs/INDEX.md docs/10-ANALYSIS/INDEX.md docs/archive/INDEX.md` |

### Pasos

1. Crear `docs/INDEX.md` con contenido del anexo 9.1 del plan
2. Crear `docs/10-ANALYSIS/INDEX.md` con índice de subdirectorios
3. Crear `docs/archive/INDEX.md` con contenido del anexo 9.2 del plan

### Verificación post-lote

```
□ Los 3 archivos existen
□ Los enlaces en INDEX.md apuntan a archivos que existen (verificar 3-5 enlaces manualmente)
□ `npm run build` sigue funcionando (no debería afectar, pero verificar)
```

---

## Lote 2 — Archivar documentos V2 (3 movimientos, 0 referencias)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover documentos exclusivamente V2 a `docs/archive/01-V2-INITIATIVES/` |
| **Movimientos** | 3 |
| **Archivos** | `AUDITORIA-ESTRATEGICA-V2.md`, `INVESTOR-DUE-DILIGENCE-V2.md`, `AUDITORIA-ARQUITECTURA-V1.1.md` |
| **Referencias a actualizar** | 0 (ninguna referencia externa detectada) |
| **Riesgo** | ✅ **Muy bajo** — sin referencias, movimiento directo |
| **Reversibilidad** | `git mv docs/archive/01-V2-INITIATIVES/* docs/` |

### Pasos

```bash
mkdir -p docs/archive/01-V2-INITIATIVES
git mv docs/AUDITORIA-ESTRATEGICA-V2.md docs/archive/01-V2-INITIATIVES/
git mv docs/INVESTOR-DUE-DILIGENCE-V2.md docs/archive/01-V2-INITIATIVES/
git mv docs/AUDITORIA-ARQUITECTURA-V1.1.md docs/archive/01-V2-INITIATIVES/
```

### Verificación post-lote

```
□ Los 3 archivos ya no existen en docs/ raíz
□ Los 3 archivos existen en docs/archive/01-V2-INITIATIVES/
□ `grep -r "AUDITORIA-ESTRATEGICA-V2" docs/ --include="*.md" --include="*.txt"` → 0 resultados (excepto este plan)
□ `grep -r "INVESTOR-DUE-DILIGENCE" docs/ --include="*.md" --include="*.txt"` → 0 resultados
□ `grep -r "V1.1" docs/ --include="*.md" --include="*.txt"` → solo referencias genéricas, no a la ruta
□ `npm run build` → OK
```

---

## Lote 3 — Archivar editorial + expedientes + observatorio (3 movimientos de directorio)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover contenido SEO histórico a `docs/archive/06-PUBLIC-SEO/` |
| **Movimientos** | 3 (directorios completos: editorial/, expedientes/, observatorio/) |
| **Referencias a actualizar** | 0 (ninguna desde código o documentación activa) |
| **Riesgo** | ✅ **Muy bajo** — contenido aislado, sin referencias |
| **Reversibilidad** | `git mv docs/archive/06-PUBLIC-SEO/editorial/ docs/ && git mv docs/archive/06-PUBLIC-SEO/expedientes/ docs/ && git mv docs/archive/06-PUBLIC-SEO/observatorio/ docs/` |

### Pasos

```bash
mkdir -p docs/archive/06-PUBLIC-SEO
git mv docs/editorial/ docs/archive/06-PUBLIC-SEO/
git mv docs/expedientes/ docs/archive/06-PUBLIC-SEO/
git mv docs/observatorio/ docs/archive/06-PUBLIC-SEO/
```

### Verificación post-lote

```
□ Los 3 directorios ya no existen en docs/ raíz
□ Los 3 directorios existen en docs/archive/06-PUBLIC-SEO/
□ `grep -r "editorial" docs/llms.txt` → 0 (si referencia, actualizar)
□ `grep -r "expedientes/" docs/ --include="*.md" --include="*.txt"` → solo referencias a rutas de app, no docs/
□ `npm run build` → OK
```

---

## Lote 4 — Renombrar architecture/ → 07-SEO/ (1 movimiento, 1 referencia)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Renombrar `docs/architecture/` a `docs/07-SEO/` |
| **Movimientos** | 1 (directorio completo) |
| **Referencias a actualizar** | 1 (`START_HERE.md`) + posiblemente `docs/llms.txt` |
| **Riesgo** | 🟢 **Bajo** — 1-2 referencias, fácil de verificar |
| **Reversibilidad** | `git mv docs/07-SEO/ docs/architecture/ && git checkout START_HERE.md` |

### Pasos

```bash
# 1. Verificar referencias actuales
grep -rn "architecture/" . --include="*.md" --include="*.txt" --include="*.mjs" | grep -v node_modules | grep -v ".git"

# 2. Renombrar
git mv docs/architecture/ docs/07-SEO/

# 3. Actualizar START_HERE.md (sustituir docs/architecture/ por docs/07-SEO/)
sed -i 's|docs/architecture/|docs/07-SEO/|g' START_HERE.md

# 4. Si llms.txt referencia architecture/, actualizar
sed -i 's|docs/architecture/|docs/07-SEO/|g' docs/llms.txt
```

### Verificación post-lote

```
□ `docs/architecture/` ya no existe
□ `docs/07-SEO/` existe
□ Los archivos dentro de 07-SEO/ son los mismos que había en architecture/
□ `grep -rn "docs/architecture/" . --include="*.md" --include="*.txt" | grep -v node_modules | grep -v ".git"` → 0 resultados
□ `npm run build` → OK
```

---

## Lote 5 — Mover recovery/ → 09-RECOVERY/ (1 movimiento, 7 referencias)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover `docs/recovery/` a `docs/09-RECOVERY/` |
| **Movimientos** | 1 (directorio completo) |
| **Referencias a actualizar** | 7 en `docs/llms.txt` (L78-L84) |
| **Riesgo** | 🟡 **Medio** — 7 referencias concentradas en 1 archivo |
| **Reversibilidad** | `git mv docs/09-RECOVERY/ docs/recovery/ && git checkout docs/llms.txt` |

### Pasos

```bash
# 1. Verificar referencias
grep -rn "docs/recovery/" . --include="*.md" --include="*.txt" | grep -v node_modules | grep -v ".git"

# 2. Mover
git mv docs/recovery/ docs/09-RECOVERY/

# 3. Actualizar llms.txt (7 líneas)
sed -i 's|docs/recovery/|docs/09-RECOVERY/|g' docs/llms.txt
sed -i 's|docs/recovery|docs/09-RECOVERY|g' docs/llms.txt
```

### Verificación post-lote

```
□ `docs/recovery/` ya no existe
□ `docs/09-RECOVERY/` existe
□ `grep -rn "docs/recovery/" . --include="*.md" --include="*.txt" | grep -v node_modules | grep -v ".git"` → 0 resultados
□ Los 7 archivos de recovery/ están en 09-RECOVERY/
□ `npm run build` → OK
```

---

## Lote 6 — Mover audits/ → 08-AUDITS/ (1 movimiento, 4 referencias)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover `docs/audits/` a `docs/08-AUDITS/` |
| **Movimientos** | 1 (directorio completo con ~27 archivos) |
| **Referencias a actualizar** | 4 en `docs/llms.txt` (L68-L72) |
| **Riesgo** | 🟡 **Medio** — 4 referencias en llms.txt, pero muchas referencias internas entre auditorías que se mantienen |
| **Reversibilidad** | `git mv docs/08-AUDITS/ docs/audits/ && git checkout docs/llms.txt` |

### Pasos

```bash
# 1. Verificar referencias actuales
grep -rn "docs/audits/" . --include="*.md" --include="*.txt" | grep -v node_modules | grep -v ".git"

# 2. Mover
git mv docs/audits/ docs/08-AUDITS/

# 3. Actualizar llms.txt
sed -i 's|docs/audits/|docs/08-AUDITS/|g' docs/llms.txt
sed -i 's|docs/audits|docs/08-AUDITS|g' docs/llms.txt
```

### Verificación post-lote

```
□ `docs/audits/` ya no existe
□ `docs/08-AUDITS/` existe
□ Todos los archivos de audits/ están ahora en 08-AUDITS/
□ `grep -rn "docs/audits/" . --include="*.md" --include="*.txt" | grep -v node_modules | grep -v ".git"` → 0 resultados
□ `npm run build` → OK
□ Verificar que llms.txt L68-L72 apuntan a 08-AUDITS/
```

---

## Lote 7 — Mover análisis técnico a 10-ANALYSIS/technical/ (14 movimientos)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover análisis técnico/arquitectura a `docs/10-ANALYSIS/technical/` |
| **Movimientos** | 14 (archivos individuales) |
| **Referencias a actualizar** | 1 (`stories/molecules/DocumentoDecisiones.stories.tsx` → referencia a `ARQUITECTURA-DOCUMENTO-DECISIONES.md`) |
| **Riesgo** | 🟢 **Bajo** — 1 referencia externa, fácil de localizar |
| **Reversibilidad** | `git mv docs/10-ANALYSIS/technical/* docs/analysis/` |

### Archivos a mover

```
DROPDOWN-ESLINT-ANALYSIS.md
DROPDOWN-ESLINT-FINAL-ANALYSIS.md
DROPDOWN-ESLINT-RESOLUTION.md
ARQUITECTURA-DOCUMENTO-DECISIONES.md
UX-VALIDATION-DOCUMENTO-DECISIONES.md
PROTOCOLO-VALIDACION-COMPRENSION.md
CF-005-AGENTS-MAP.md
CKB-001-SIMPLIFIED-PROPOSAL.md
CKB-001-ARCHITECTURAL-REPORT.md
S1-T01-ARQUITECTURA-REVISION.md
S1-T02-ARQUITECTURA-DISENO.md
EP-031-PITR-V1-ANALYSIS.md
EP-032-ENTREGA-RESULTADO-ANALYSIS.md
EP-033-CORRECCION-DOCUMENTACION-ANALYSIS.md
```

### Pasos

```bash
# 1. Verificar referencias
grep -rn "docs/analysis/" . --include="*.stories.*" --include="*.tsx" --include="*.ts" | grep -v node_modules | grep -v ".git"

# 2. Crear directorio
mkdir -p docs/10-ANALYSIS/technical

# 3. Mover archivos
git mv docs/analysis/DROPDOWN-ESLINT-ANALYSIS.md docs/10-ANALYSIS/technical/
git mv docs/analysis/DROPDOWN-ESLINT-FINAL-ANALYSIS.md docs/10-ANALYSIS/technical/
git mv docs/analysis/DROPDOWN-ESLINT-RESOLUTION.md docs/10-ANALYSIS/technical/
git mv docs/analysis/ARQUITECTURA-DOCUMENTO-DECISIONES.md docs/10-ANALYSIS/technical/
git mv docs/analysis/UX-VALIDACION-DOCUMENTO-DECISIONES.md docs/10-ANALYSIS/technical/
git mv docs/analysis/PROTOCOLO-VALIDACION-COMPRENSION.md docs/10-ANALYSIS/technical/
git mv docs/analysis/CF-005-AGENTS-MAP.md docs/10-ANALYSIS/technical/
git mv docs/analysis/CKB-001-SIMPLIFIED-PROPOSAL.md docs/10-ANALYSIS/technical/
git mv docs/analysis/CKB-001-ARCHITECTURAL-REPORT.md docs/10-ANALYSIS/technical/
git mv docs/analysis/S1-T01-ARQUITECTURA-REVISION.md docs/10-ANALYSIS/technical/
git mv docs/analysis/S1-T02-ARQUITECTURA-DISENO.md docs/10-ANALYSIS/technical/
git mv docs/analysis/EP-031-PITR-V1-ANALYSIS.md docs/10-ANALYSIS/technical/
git mv docs/analysis/EP-032-ENTREGA-RESULTADO-ANALYSIS.md docs/10-ANALYSIS/technical/
git mv docs/analysis/EP-033-CORRECCION-DOCUMENTACION-ANALYSIS.md docs/10-ANALYSIS/technical/

# 4. Actualizar referencia en stories/ (si existe)
# Buscar: grep -rn "ARQUITECTURA-DOCUMENTO-DECISIONES" stories/
```

### Verificación post-lote

```
□ Los 14 archivos están en docs/10-ANALYSIS/technical/
□ Ya no existen en docs/analysis/
□ `grep -rn "docs/analysis/" stories/ --include="*.stories.*" | grep -v node_modules` → 0 (o referencias actualizadas)
□ `npm run build` → OK
```

---

## Lote 8 — Mover análisis PRD a 10-ANALYSIS/prd/ (12 movimientos)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover análisis de producto PRD a `docs/10-ANALYSIS/prd/` |
| **Movimientos** | 12 (archivos individuales) |
| **Referencias a actualizar** | 0 externas (solo referencias internas entre los propios PRD) |
| **Riesgo** | ✅ **Muy bajo** — sin referencias externas |
| **Reversibilidad** | `git mv docs/10-ANALYSIS/prd/* docs/analysis/` |

### Archivos a mover

```
PRD-FRAMEWORK-001.md
PRD-001-CANDIDATE-EVALUATION.md
PRD-001-ATI03-INFORME-TECNICO-ENERGETICO.md
MARKET-RESEARCH-ATI03-VALIDATION.md
GLOSARIO-PRD-001.md
SESSION-HANDOVER-PRD001.md
RF-002-NIVEL-DE-CONFIANZA.md
RF-003-JERARQUIA-DE-DECISIONES.md
RF-004-IMPACTO-DE-ACTUACIONES.md
RF-005-INVERSION-RETORNO.md
REVISION-HORIZONTAL-CAPA1.md
MATRIZ-TRAZABILIDAD-CAPA1.md
```

### Pasos

```bash
mkdir -p docs/10-ANALYSIS/prd
git mv docs/analysis/PRD-FRAMEWORK-001.md docs/10-ANALYSIS/prd/
git mv docs/analysis/PRD-001-CANDIDATE-EVALUATION.md docs/10-ANALYSIS/prd/
git mv docs/analysis/PRD-001-ATI03-INFORME-TECNICO-ENERGETICO.md docs/10-ANALYSIS/prd/
git mv docs/analysis/MARKET-RESEARCH-ATI03-VALIDATION.md docs/10-ANALYSIS/prd/
git mv docs/analysis/GLOSARIO-PRD-001.md docs/10-ANALYSIS/prd/
git mv docs/analysis/SESSION-HANDOVER-PRD001.md docs/10-ANALYSIS/prd/
git mv docs/analysis/RF-002-NIVEL-DE-CONFIANZA.md docs/10-ANALYSIS/prd/
git mv docs/analysis/RF-003-JERARQUIA-DE-DECISIONES.md docs/10-ANALYSIS/prd/
git mv docs/analysis/RF-004-IMPACTO-DE-ACTUACIONES.md docs/10-ANALYSIS/prd/
git mv docs/analysis/RF-005-INVERSION-RETORNO.md docs/10-ANALYSIS/prd/
git mv docs/analysis/REVISION-HORIZONTAL-CAPA1.md docs/10-ANALYSIS/prd/
git mv docs/analysis/MATRIZ-TRAZABILIDAD-CAPA1.md docs/10-ANALYSIS/prd/
```

### Verificación post-lote

```
□ Los 12 archivos están en docs/10-ANALYSIS/prd/
□ Ya no existen en docs/analysis/
□ `npm run build` → OK
```

---

## Lote 9 — Mover Business Blueprint a 10-ANALYSIS/business-blueprint/ (7 movimientos)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover Business Blueprint (GTD) a `docs/10-ANALYSIS/business-blueprint/` |
| **Movimientos** | 7 (archivos individuales) |
| **Referencias a actualizar** | 0 externas (solo referencias internas entre BP docs, que se mueven juntos) |
| **Riesgo** | ✅ **Muy bajo** |
| **Reversibilidad** | `git mv docs/10-ANALYSIS/business-blueprint/* docs/analysis/` |

### Archivos a mover

```
BP-001-BUSINESS-BLUEPRINT-PLAN.md
BP-100-01-BUSINESS-BLUEPRINT-CANVAS.md
BP-100-02-LINEAS-DE-NEGOCIO.md
BP-100-03-MODELO-OPERATIVO-Y-COMERCIAL.md
BP-100-04-MARKETING-CUSTOMER-JOURNEY-CRECIMIENTO.md
EP-102-GESTION-TECNICA-DOCUMENTAL.md
EP-101-PRODUCT-BUSINESS-ALIGNMENT.md
```

### Pasos

```bash
mkdir -p docs/10-ANALYSIS/business-blueprint
git mv docs/analysis/BP-001-BUSINESS-BLUEPRINT-PLAN.md docs/10-ANALYSIS/business-blueprint/
git mv docs/analysis/BP-100-01-BUSINESS-BLUEPRINT-CANVAS.md docs/10-ANALYSIS/business-blueprint/
git mv docs/analysis/BP-100-02-LINEAS-DE-NEGOCIO.md docs/10-ANALYSIS/business-blueprint/
git mv docs/analysis/BP-100-03-MODELO-OPERATIVO-Y-COMERCIAL.md docs/10-ANALYSIS/business-blueprint/
git mv docs/analysis/BP-100-04-MARKETING-CUSTOMER-JOURNEY-CRECIMIENTO.md docs/10-ANALYSIS/business-blueprint/
git mv docs/analysis/EP-102-GESTION-TECNICA-DOCUMENTAL.md docs/10-ANALYSIS/business-blueprint/
git mv docs/analysis/EP-101-PRODUCT-BUSINESS-ALIGNMENT.md docs/10-ANALYSIS/business-blueprint/
```

### Verificación post-lote

```
□ Los 7 archivos están en docs/10-ANALYSIS/business-blueprint/
□ Ya no existen en docs/analysis/
□ `npm run build` → OK
```

---

## Lote 10 — Mover GTM a 10-ANALYSIS/go-to-market/ (11 movimientos)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover análisis GTM a `docs/10-ANALYSIS/go-to-market/` |
| **Movimientos** | 11 (archivos individuales) |
| **Referencias a actualizar** | 0 externas |
| **Riesgo** | ✅ **Muy bajo** |
| **Reversibilidad** | `git mv docs/10-ANALYSIS/go-to-market/* docs/analysis/` |

### Archivos a mover

```
GTM-001-GO-TO-MARKET-PLAN.md
GTM-001-MARKET-ARCHITECTURE.md
GTM-001-BUYER-PERSONAS.md
GTM-001-COMPETITIVE-ANALYSIS.md
GTM-001-POSITIONING.md
GTM-001-GTM-STRATEGY.md
GTM-001-CUSTOMER-JOURNEY.md
GTM-001-PRICING.md
GTM-001-SEO-CONTENT-STRATEGY.md
GTM-001-CAPTATION-CONVERSION-RETENTION.md
GTM-001-AUTOMATION-IA-MATRIX.md
```

### Pasos

```bash
mkdir -p docs/10-ANALYSIS/go-to-market
git mv docs/analysis/GTM-001-GO-TO-MARKET-PLAN.md docs/10-ANALYSIS/go-to-market/
git mv docs/analysis/GTM-001-MARKET-ARCHITECTURE.md docs/10-ANALYSIS/go-to-market/
git mv docs/analysis/GTM-001-BUYER-PERSONAS.md docs/10-ANALYSIS/go-to-market/
git mv docs/analysis/GTM-001-COMPETITIVE-ANALYSIS.md docs/10-ANALYSIS/go-to-market/
git mv docs/analysis/GTM-001-POSITIONING.md docs/10-ANALYSIS/go-to-market/
git mv docs/analysis/GTM-001-GTM-STRATEGY.md docs/10-ANALYSIS/go-to-market/
git mv docs/analysis/GTM-001-CUSTOMER-JOURNEY.md docs/10-ANALYSIS/go-to-market/
git mv docs/analysis/GTM-001-PRICING.md docs/10-ANALYSIS/go-to-market/
git mv docs/analysis/GTM-001-SEO-CONTENT-STRATEGY.md docs/10-ANALYSIS/go-to-market/
git mv docs/analysis/GTM-001-CAPTATION-CONVERSION-RETENTION.md docs/10-ANALYSIS/go-to-market/
git mv docs/analysis/GTM-001-AUTOMATION-IA-MATRIX.md docs/10-ANALYSIS/go-to-market/
```

### Verificación post-lote

```
□ Los 11 archivos están en docs/10-ANALYSIS/go-to-market/
□ Ya no existen en docs/analysis/
□ `npm run build` → OK
```

---

## Lote 11 — Archivar CF-005-FEASIBILITY-REPORT (1 movimiento)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover CF-005-FEASIBILITY-REPORT.md a `docs/archive/04-EPICS-CLOSED/` |
| **Movimientos** | 1 |
| **Referencias a actualizar** | 0 (ninguna externa) |
| **Riesgo** | ✅ **Muy bajo** |
| **Reversibilidad** | `git mv docs/archive/04-EPICS-CLOSED/CF-005-FEASIBILITY-REPORT.md docs/analysis/` |

### Pasos

```bash
mkdir -p docs/archive/04-EPICS-CLOSED
git mv docs/analysis/CF-005-FEASIBILITY-REPORT.md docs/archive/04-EPICS-CLOSED/
```

### Verificación post-lote

```
□ El archivo está en docs/archive/04-EPICS-CLOSED/
□ Ya no existe en docs/analysis/
□ `npm run build` → OK
```

---

## Lote 12 — Mover REORGANIZATION-PLAN.md + DEPENDENCY-AUDIT.md (2 movimientos)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover los planes de reorganización a `docs/10-ANALYSIS/technical/` |
| **Movimientos** | 2 |
| **Referencias a actualizar** | 0 (son autorreferenciados) |
| **Riesgo** | ✅ **Muy bajo** |
| **Reversibilidad** | `git mv docs/10-ANALYSIS/technical/REORGANIZATION-*.md docs/analysis/` |

### Pasos

```bash
git mv docs/analysis/REORGANIZATION-PLAN.md docs/10-ANALYSIS/technical/
git mv docs/analysis/REORGANIZATION-DEPENDENCY-AUDIT.md docs/10-ANALYSIS/technical/
```

### Verificación post-lote

```
□ Los 2 archivos están en docs/10-ANALYSIS/technical/
□ Ya no existen en docs/analysis/
□ `npm run build` → OK
```

---

## Lote 13 — Actualizar docs/10-ANALYSIS/INDEX.md (1 archivo modificado)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Actualizar INDEX.md de analysis con las rutas correctas tras los movimientos |
| **Movimientos** | 0 (solo edición de 1 archivo existente) |
| **Referencias a actualizar** | 0 (el INDEX.md se creó en lote 1 con rutas provisionales) |
| **Riesgo** | ✅ **Muy bajo** — solo actualizar enlaces en 1 archivo |
| **Reversibilidad** | `git checkout docs/10-ANALYSIS/INDEX.md` |

### Pasos

Editar `docs/10-ANALYSIS/INDEX.md` para que los enlaces apunten a `technical/`, `prd/`, `business-blueprint/`, `go-to-market/` en lugar de a `docs/analysis/`.

### Verificación post-lote

```
□ Los enlaces en INDEX.md funcionan (verificar 1-2 por subdirectorio)
□ `npm run build` → OK
```

---

## Lote 14 — Reorganizar scripts/build/ (3 movimientos)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover scripts de build a `scripts/build/` |
| **Movimientos** | 3 |
| **Referencias a actualizar** | 0 (no referenciados desde código) |
| **Riesgo** | ✅ **Muy bajo** |
| **Reversibilidad** | `git mv scripts/build/* scripts/` |

### Archivos a mover

```
generate-llms.mjs
generate-og-image.mjs
check-unused-css.mjs
```

### Pasos

```bash
mkdir -p scripts/build
git mv scripts/generate-llms.mjs scripts/build/
git mv scripts/generate-og-image.mjs scripts/build/
git mv scripts/check-unused-css.mjs scripts/build/
```

### Verificación post-lote

```
□ Los 3 archivos están en scripts/build/
□ Ya no existen en scripts/ raíz
□ `grep -rn "scripts/generate-llms\|scripts/generate-og-image\|scripts/check-unused-css" . --include="*.json" --include="*.mjs" --include="*.ts" | grep -v node_modules | grep -v ".git"` → 0 (o actualizadas en package.json si aplica)
□ `npm run build` → OK
```

---

## Lote 15 — Reorganizar scripts/seo/ (6 movimientos)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover scripts de SEO + datos a `scripts/seo/` |
| **Movimientos** | 6 |
| **Referencias a actualizar** | 0 (no referenciados desde código) |
| **Riesgo** | ✅ **Muy bajo** |
| **Reversibilidad** | `git mv scripts/seo/* scripts/` |

### Archivos a mover

```
check-seo.mjs
analyze-faq.mjs
analyze-faq-articles.mjs
extracted_articles.json
rewritten_articles.json
rewritten_v2.json
```

### Pasos

```bash
mkdir -p scripts/seo
git mv scripts/check-seo.mjs scripts/seo/
git mv scripts/analyze-faq.mjs scripts/seo/
git mv scripts/analyze-faq-articles.mjs scripts/seo/
git mv scripts/extracted_articles.json scripts/seo/
git mv scripts/rewritten_articles.json scripts/seo/
git mv scripts/rewritten_v2.json scripts/seo/
```

### Verificación post-lote

```
□ Los 6 archivos están en scripts/seo/
□ Ya no existen en scripts/ raíz
□ `npm run build` → OK
```

---

## Lote 16 — Verificar referencia de scripts/db/ (pre-verificación)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Verificar si `src/app/api/apply-migration/route.ts` referencia scripts/ por ruta relativa |
| **Movimientos** | 0 — solo lectura |
| **Referencias a actualizar** | Depende de lo que se descubra |
| **Riesgo** | 🔴 **Alto** — podría romper una API route |
| **Reversibilidad** | N/A (solo lectura) |

### Pasos

```bash
# Leer el archivo para determinar si importa por ruta relativa
cat src/app/api/apply-migration/route.ts
```

### Decisión basada en resultados

| Si el import es... | Acción |
|---|---|
| `import ... from '../../scripts/apply-migration'` | **NO mover** apply-migration.mjs — permanece en scripts/ raíz |
| `import ... from './apply-migration'` o `exec('node scripts/apply-migration.mjs')` | **Mover con precaución** y actualizar ruta en route.ts |
| `execSync(\`node \${path.join(\__dirname, '../../scripts/apply-migration.mjs')}\`)` | **Mover** y actualizar ruta |

---

## Lote 17 — Mover scripts/db/ (hasta 18 movimientos, condicional)

| Propiedad | Valor |
|---|---|
| **Objetivo** | Mover scripts de base de datos a `scripts/db/` |
| **Movimientos** | Hasta 18 (depende de resultado del lote 16) |
| **Referencias a actualizar** | 1 posible (`src/app/api/apply-migration/route.ts`) |
| **Riesgo** | 🟡 **Medio** — 1 referencia en código, mitigable |
| **Reversibilidad** | `git mv scripts/db/* scripts/` + restaurar route.ts si se modificó |

**NOTA:** Este lote solo debe ejecutarse después de completar el lote 16 y confirmar que es seguro.

### Archivos a mover (condicional)

```
apply-migration.mjs          ← SOLO si lote 16 confirma que es seguro
apply-migration-cliente.mjs
apply-migration-final.mjs
apply-migration-v3.mjs
apply-sql.mjs
apply-sql-final.mjs
apply-expediente-migration.mjs
apply-phase-a-expediente.mjs
apply-diagnostico-migration.mjs
check-db.mjs
check-db-state.mjs
check-table.mjs
check-remote-schema.mjs
check-and-expose-schema.mjs
expose-core-schema.mjs
verify-and-fix-schema.mjs
run-migration.mjs
apply-sql-v2
```

### Pasos (condicionales)

```bash
mkdir -p scripts/db

# Si el lote 16 confirma que es seguro mover apply-migration.mjs:
git mv scripts/apply-migration.mjs scripts/db/  # ← solo si seguro

# Estos son siempre seguros:
git mv scripts/apply-migration-cliente.mjs scripts/db/
git mv scripts/apply-migration-final.mjs scripts/db/
git mv scripts/apply-migration-v3.mjs scripts/db/
git mv scripts/apply-sql.mjs scripts/db/
git mv scripts/apply-sql-final.mjs scripts/db/
git mv scripts/apply-expediente-migration.mjs scripts/db/
git mv scripts/apply-phase-a-expediente.mjs scripts/db/
git mv scripts/apply-diagnostico-migration.mjs scripts/db/
git mv scripts/check-db.mjs scripts/db/
git mv scripts/check-db-state.mjs scripts/db/
git mv scripts/check-table.mjs scripts/db/
git mv scripts/check-remote-schema.mjs scripts/db/
git mv scripts/check-and-expose-schema.mjs scripts/db/
git mv scripts/expose-core-schema.mjs scripts/db/
git mv scripts/verify-and-fix-schema.mjs scripts/db/
git mv scripts/run-migration.mjs scripts/db/
git mv scripts/apply-sql-v2 scripts/db/
```

### Verificación post-lote

```
□ Los scripts están en scripts/db/
□ Ya no existen en scripts/ raíz (excepto archive/)
□ Si apply-migration.mjs se movió: verificar que la API route funciona
□ `npm run build` → OK
□ Si existe ruta de prueba para la API: `curl http://localhost:3000/api/apply-migration` → OK
```

---

## Resumen de todos los lotes

| Lote | Nombre | Movs. | Archivos nuevos | Archivos editados | Riesgo | Depende de |
|------|--------|-------|-----------------|-------------------|--------|------------|
| 1 | Creación de índices | 0 | 3 | 0 | ✅ Muy bajo | — |
| 2 | Archivar V2 | 3 | 0 | 0 | ✅ Muy bajo | Lote 1 |
| 3 | Archivar SEO público | 3 | 0 | 0 | ✅ Muy bajo | Lote 1 |
| 4 | Renombrar architecture/ → 07-SEO/ | 1 | 0 | 1-2 | 🟢 Bajo | — |
| 5 | Mover recovery/ → 09-RECOVERY/ | 1 | 0 | 1 | 🟡 Medio | — |
| 6 | Mover audits/ → 08-AUDITS/ | 1 | 0 | 1 | 🟡 Medio | — |
| 7 | Mover analysis/technical/ | 14 | 0 | 0-1 | 🟢 Bajo | Lote 1 |
| 8 | Mover analysis/prd/ | 12 | 0 | 0 | ✅ Muy bajo | Lote 1 |
| 9 | Mover analysis/business-blueprint/ | 7 | 0 | 0 | ✅ Muy bajo | Lote 1 |
| 10 | Mover analysis/go-to-market/ | 11 | 0 | 0 | ✅ Muy bajo | Lote 1 |
| 11 | Archivar CF-005 | 1 | 0 | 0 | ✅ Muy bajo | Lotes 7-10 |
| 12 | Mover planes reorganización | 2 | 0 | 0 | ✅ Muy bajo | Lote 7 |
| 13 | Actualizar INDEX.md de analysis | 0 | 0 | 1 | ✅ Muy bajo | Lotes 7-12 |
| 14 | Reorganizar scripts/build/ | 3 | 0 | 0 | ✅ Muy bajo | — |
| 15 | Reorganizar scripts/seo/ | 6 | 0 | 0 | ✅ Muy bajo | — |
| 16 | Verificar referencia API route | 0 | 0 | 0 | 🔴 Solo lectura | — |
| 17 | Reorganizar scripts/db/ | ≤18 | 0 | 0-1 | 🟡 Medio | Lote 16 |

**Totales:** 17 lotes, ~83 movimientos, 3 archivos nuevos, ~5 archivos editados

---

## Orden de ejecución recomendado (sin dependencias fuertes)

```
FASE A — Preparación (sin efectos secundarios)
├── Lote 1  → Crear índices
├── Lote 16 → Verificar API route (solo lectura)

FASE B — Archivado seguro (sin referencias externas)
├── Lote 2  → Archivar V2
├── Lote 3  → Archivar SEO público

FASE C — Renombrar directorios (con referencias)
├── Lote 4  → architecture/ → 07-SEO/
├── Lote 5  → recovery/ → 09-RECOVERY/
├── Lote 6  → audits/ → 08-AUDITS/

FASE D — Reorganizar analysis/ (independiente entre sí)
├── Lote 7  → technical/
├── Lote 8  → prd/
├── Lote 9  → business-blueprint/
├── Lote 10 → go-to-market/

FASE E — Cierre de analysis/
├── Lote 11 → Archivar CF-005
├── Lote 12 → Mover planes reorganización
├── Lote 13 → Actualizar INDEX.md

FASE F — Reorganizar scripts/ (independiente entre sí)
├── Lote 14 → scripts/build/
├── Lote 15 → scripts/seo/
├── Lote 17 → scripts/db/ (condicional al lote 16)

FASE G — Verificación final
├── Verificar docs/llms.txt actualizado
├── Verificar START_HERE.md actualizado
├── npm run build
├── npm test
├── Navegación manual de docs/INDEX.md
```

---

## Criterios para avanzar entre lotes

Después de CADA lote, antes de pasar al siguiente:

```
□ Verificación de referencias:
   □ `grep -rn "ruta_antigua" . --include="*.md" --include="*.txt" --include="*.mjs" --include="*.ts" | grep -v node_modules | grep -v ".git"` → 0 resultados

□ Verificación de compilación:
   □ `npm run build` → exit code 0

□ Verificación de archivos:
   □ Los archivos existen en el destino
   □ Los archivos ya no existen en el origen

□ Informe entregado al usuario:
   □ "Lote N completado. [N] archivos movidos. [0] referencias rotas. Build OK. ¿Continuar con lote N+1?"
```

---

**Fin del plan de ejecución por lotes.** Pendiente de aprobación del usuario para comenzar la ejecución del primer lote.