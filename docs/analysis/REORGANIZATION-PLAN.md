# Plan Definitivo de Reorganización del Repositorio Certilab Platform

> **Versión:** 1.0 — Propuesta final  
> **Fecha:** 2026-07-10  
> **Estado:** Pendiente de aprobación  
> **Basado en:** Auditoría de dependencias (`REORGANIZATION-DEPENDENCY-AUDIT.md`)  
> **Restricciones:** Sin mover archivos, sin eliminar archivos, sin modificar código, sin modificar migraciones, sin modificar Git/GitHub/Supabase/Vercel

---

## Objetivos

| Objetivo | Métrica |
|---|---|
| Reducir carga cognitiva | Cualquier desarrollador/IA encuentra la documentación relevante en ≤2 clics |
| Facilitar localizar documentación vigente | Estructura temática clara con índices |
| Preservar conocimiento histórico | `docs/archive/` con clasificación expresa |
| No afectar al Core V1 | 0 cambios en src/, supabase/migrations/ |
| No afectar al funcionamiento del proyecto | 0 cambios en config, build, deploy |

---

## 1. Nueva Estructura Propuesta del Repositorio

### 1.1 docs/ — Estructura final

```
docs/
├── llms.txt                         ← PERMANECE (índice para LLMs, convención llms.txt)
├── INDEX.md                         ← NUEVO — Índice clasificado por temática con enlaces a rutas actuales
│
├── [CF-].md  (25 archivos raíz)     ← PERMANECEN en docs/ raíz por riesgo de referencias
├── CKB-INDEX.md                     ← PERMANECE
├── CKB-GUIDE.md                     ← PERMANECE
│
├── adr/                             ← PERMANECE (25+ referencias cada ADR — riesgo de rotura)
│   ├── ADR-001-CERTILAB-ENGINEERING-SYSTEM.md
│   ├── ADR-002-AUTO-ENTREGA-MVP.md
│   ├── ADR-003-GTD-LINEA-DE-NEGOCIO.md
│   └── ADR-004-EXTENSION-DOCUMENTO-IA-GTD.md
│
├── book/                            ← PERMANECE (referenciado desde stories/)
│   ├── INDEX.md
│   ├── Volume-01-Foundations.md  …  Volume-07-Implementation.md
│
├── design/                          ← PERMANECE
│   └── DESIGN-SYSTEM-ARCHITECTURE.md
│
├── product/                         ← PERMANECE
│   ├── PRODUCT-PERSONAS.md  …  PRODUCT-ROADMAP.md
│   ├── PA-001-PRODUCT-ARCHITECTURE.md
│   ├── PA-001-CATALOG.md
│   └── PA-001-PRODUCT-VALIDATION-CRITERIA.md
│
├── releases/                        ← PERMANECE
│   └── v1.0.0-rc1.md
│
├── ckb/                             ← PERMANECE (referenciado desde CKB-INDEX.md, CKB-GUIDE.md)
│   └── CKB-EVOLUTION.md
│
├── 07-SEO/                          ← ✅ MOVER desde docs/architecture/
│   └── (contenido SEO actual)
│
├── 08-AUDITS/                       ← ✅ MOVER desde docs/audits/
│   ├── AUDITORIA-CONSTITUCIONAL-DEFINITIVA.md
│   ├── SPRINT-05-CIERRE-DOMINIO-V1.md
│   ├── SESSION_REPORT.md
│   ├── MASTER-CLEANUP-AUDIT.md
│   ├── RC-001-FINAL-AUDIT.md
│   ├── EP-026-*.md
│   ├── EP-027-*.md
│   ├── EP-030-*.md
│   ├── EP-031-*.md
│   ├── EP-032-*.md
│   ├── EP-033-*.md
│   ├── DS-02B-*.md
│   ├── DS-03-*.md
│   ├── BP-200-*.md, BP-900-*.md
│   ├── PA-900-*.md
│   ├── GTM-900-*.md
│   ├── RF-005-*.md
│   ├── S1-T01-*.md, S1-T02-*.md
│   ├── E26-T01-*.md, E28-*.md, E29-*.md
│   ├── MVP-AUDIT-ESTADO-ACTUAL.md
│   ├── CONSOLIDATION-001-*.md
│   ├── LINT-FIXES-*.md
│   └── CORE-V1-STABILIZATION-FINAL.md
│
├── 09-RECOVERY/                     ← ✅ MOVER desde docs/recovery/
│   ├── 01-RECOVERY-GUIDE.md
│   ├── 02-ENVIRONMENT-CHECKLIST.md
│   ├── 03-BACKUP-CHECKLIST.md
│   ├── 04-NEW-COMPUTER.md
│   ├── 05-DISASTER-RECOVERY.md
│   ├── 07-CHANGE-DEVICE.md
│   └── 08-CHECK-SCRIPT.md
│
├── 10-ANALYSIS/                     ← ✅ MOVER desde docs/analysis/
│   ├── INDEX.md                     ← NUEVO — Índice del directorio analysis
│   │
│   ├── technical/                   ← Análisis técnico y arquitectura
│   │   ├── DROPDOWN-ESLINT-ANALYSIS.md
│   │   ├── DROPDOWN-ESLINT-FINAL-ANALYSIS.md
│   │   ├── DROPDOWN-ESLINT-RESOLUTION.md
│   │   ├── ARQUITECTURA-DOCUMENTO-DECISIONES.md
│   │   ├── UX-VALIDATION-DOCUMENTO-DECISIONES.md
│   │   ├── PROTOCOLO-VALIDACION-COMPRENSION.md
│   │   ├── S1-T01-ARQUITECTURA-REVISION.md
│   │   ├── S1-T02-ARQUITECTURA-DISENO.md
│   │   ├── EP-031-PITR-V1-ANALYSIS.md
│   │   ├── EP-032-ENTREGA-RESULTADO-ANALYSIS.md
│   │   ├── EP-033-CORRECCION-DOCUMENTACION-ANALYSIS.md
│   │   ├── CF-005-FEASIBILITY-REPORT.md
│   │   ├── CF-005-AGENTS-MAP.md
│   │   ├── CKB-001-SIMPLIFIED-PROPOSAL.md
│   │   ├── CKB-001-ARCHITECTURAL-REPORT.md
│   │   └── REORGANIZATION-PLAN.md          ← ESTE documento
│   │
│   ├── prd/                         ← Análisis de producto PRD (ATI03)
│   │   ├── PRD-FRAMEWORK-001.md
│   │   ├── PRD-001-CANDIDATE-EVALUATION.md
│   │   ├── PRD-001-ATI03-INFORME-TECNICO-ENERGETICO.md
│   │   ├── MARKET-RESEARCH-ATI03-VALIDATION.md
│   │   ├── GLOSARIO-PRD-001.md
│   │   ├── SESSION-HANDOVER-PRD001.md
│   │   ├── RF-002-NIVEL-DE-CONFIANZA.md
│   │   ├── RF-003-JERARQUIA-DE-DECISIONES.md
│   │   ├── RF-004-IMPACTO-DE-ACTUACIONES.md
│   │   ├── RF-005-INVERSION-RETORNO.md
│   │   ├── REVISION-HORIZONTAL-CAPA1.md
│   │   └── MATRIZ-TRAZABILIDAD-CAPA1.md
│   │
│   ├── business-blueprint/          ← Business Blueprint (línea GTD)
│   │   ├── BP-001-BUSINESS-BLUEPRINT-PLAN.md
│   │   ├── BP-100-01-BUSINESS-BLUEPRINT-CANVAS.md
│   │   ├── BP-100-02-LINEAS-DE-NEGOCIO.md
│   │   ├── BP-100-03-MODELO-OPERATIVO-Y-COMERCIAL.md
│   │   ├── BP-100-04-MARKETING-CUSTOMER-JOURNEY-CRECIMIENTO.md
│   │   ├── EP-102-GESTION-TECNICA-DOCUMENTAL.md
│   │   └── EP-101-PRODUCT-BUSINESS-ALIGNMENT.md
│   │
│   └── go-to-market/                ← GTM (Go To Market)
│       ├── GTM-001-GO-TO-MARKET-PLAN.md
│       ├── GTM-001-MARKET-ARCHITECTURE.md
│       ├── GTM-001-BUYER-PERSONAS.md
│       ├── GTM-001-COMPETITIVE-ANALYSIS.md
│       ├── GTM-001-POSITIONING.md
│       ├── GTM-001-GTM-STRATEGY.md
│       ├── GTM-001-CUSTOMER-JOURNEY.md
│       ├── GTM-001-PRICING.md
│       ├── GTM-001-SEO-CONTENT-STRATEGY.md
│       ├── GTM-001-CAPTATION-CONVERSION-RETENTION.md
│       └── GTM-001-AUTOMATION-IA-MATRIX.md
│
├── archive/                        ← NUEVO — Histórico clasificado
│   ├── INDEX.md                    ← NUEVO — Índice del archivo
│   │
│   ├── 01-V2-INITIATIVES/          ← Iniciativas diferidas a V2
│   │   ├── AUDITORIA-ESTRATEGICA-V2.md
│   │   ├── INVESTOR-DUE-DILIGENCE-V2.md
│   │   └── AUDITORIA-ARQUITECTURA-V1.1.md
│   │
│   ├── 02-DEPRECATED/              ← Documentos obsoletos o reemplazados
│   │   └── (sin contenido actual — reservado para futuros deprecated)
│   │
│   ├── 04-EPICS-CLOSED/            ← Épicas cerradas con informes completos
│   │   └── (los EP-XXX-CLOSURE-REPORT se archivan aquí tras migrar a 08-AUDITS/ si se decide)
│   │
│   ├── 05-OBSOLETE-STRUCTURE/      ← Documentos sobre estructura antigua del proyecto
│   │   ├── (vacío — reservado)
│   │   └── PROPUESTA-MODELO-MVP.md ← ¿Archivar? Depende de si sigue vigente → CLASIFICAR: Revisar
│   │
│   └── 06-PUBLIC-SEO/              ← Contenido SEO y web pública (histórico de análisis)
│       ├── (desde docs/editorial/)
│       ├── (desde docs/expedientes/)
│       └── (desde docs/observatorio/)
│
└── (fin de docs/ tree)
```

### 1.2 scripts/ — Estructura final

```
scripts/
├── archive/                        ← PERMANECE (ya existe)
│
├── db/                             ← ✅ MOVER scripts de base de datos aquí
│   ├── apply-migration.mjs
│   ├── apply-migration-cliente.mjs
│   ├── apply-migration-final.mjs
│   ├── apply-migration-v3.mjs
│   ├── apply-sql.mjs
│   ├── apply-sql-final.mjs
│   ├── apply-expediente-migration.mjs
│   ├── apply-phase-a-expediente.mjs
│   ├── apply-diagnostico-migration.mjs
│   ├── check-db.mjs
│   ├── check-db-state.mjs
│   ├── check-table.mjs
│   ├── check-remote-schema.mjs
│   ├── check-and-expose-schema.mjs
│   ├── expose-core-schema.mjs
│   ├── verify-and-fix-schema.mjs
│   ├── run-migration.mjs
│   └── apply-sql-v2               ← (archivo sin extensión — evaluar)
│
├── build/                          ← ✅ MOVER scripts de build aquí
│   ├── generate-llms.mjs
│   ├── generate-og-image.mjs
│   └── check-unused-css.mjs
│
└── seo/                            ← ✅ MOVER scripts de SEO aquí
    ├── check-seo.mjs
    ├── analyze-faq.mjs
    └── analyze-faq-articles.mjs
```

### 1.3 Archivos raíz — Sin cambios

| Archivo | Acción | Motivo |
|---|---|---|
| `AGENTS.md` | PERMANECE | Gobernanza del proyecto, referenciado desde llms.txt y CF-001 |
| `START_HERE.md` | PERMANECE | Punto de entrada para nuevos desarrolladores |
| `README.md` | PERMANECE | Documentación del repositorio en GitHub |
| `package.json` | PERMANECE | Configuración del proyecto Node.js |
| `tsconfig.json` | PERMANECE | Configuración de TypeScript |
| `next.config.ts` | PERMANECE | Configuración de Next.js |
| `eslint.config.mjs` | PERMANECE | Configuración de ESLint |
| `postcss.config.mjs` | PERMANECE | Configuración de PostCSS |
| `vitest.config.ts` | PERMANECE | Configuración de tests |
| `vercel.json` | PERMANECE | Configuración de deploy en Vercel |
| `.gitignore` | PERMANECE | Configuración de Git |
| `DEPLOY.md` | PERMANECE | Guía de deploy |
| `console.log(s)` | PERMANECE | (archivo existente) |

### 1.4 public/ — Sin cambios

| Archivo | Acción | Motivo |
|---|---|---|
| `public/llms.txt` | PERMANECE | Índice público para LLMs del sitio web |
| `public/llms-full.txt` | PERMANECE | Contenido completo para LLMs |
| Favicon, SVG, imágenes | PERMANECE | Assets del sitio |

### 1.5 src/ y supabase/ — Sin cambios (Restricción expresa)

- **src/:** Sin modificaciones — 0 impacto en Core V1
- **supabase/migrations/:** Sin modificaciones — 0 impacto en base de datos

---

## 2. Clasificación Definitiva de Documentos

### 2.1 Documentos ACTIVOS (permanecen visibles en docs/ raíz o subdirectorios activos)

| Categoría | Documentos | Ubicación |
|---|---|---|
| **Gobernanza** | CF-000, CF-001, CF-001A, CF-003, CF-004 | `docs/` raíz |
| **Dominio** | CF-002, CF-012, CF-020, CF-021, CF-022, CF-025, CF-026, CF-028, CF-030, CF-031, CF-032, CF-040, CF-050 | `docs/` raíz |
| **Infraestructura** | CF-011, CF-021-SUPABASE-ARCHITECTURE, CF-022-IMPLEMENTATION-BACKLOG | `docs/` raíz |
| **ADR** | ADR-001, ADR-002, ADR-003, ADR-004 | `docs/adr/` |
| **CKB** | CKB-INDEX, CKB-GUIDE | `docs/` raíz |
| **CKB-Evolución** | CKB-EVOLUTION | `docs/ckb/` |
| **Diseño** | Design System Architecture | `docs/design/` |
| **Book (DS)** | 7 volúmenes | `docs/book/` |
| **Producto** | Personas, Competitors, Visión, Positioning, Roadmap, PA-001 | `docs/product/` |
| **Releases** | v1.0.0-rc1 | `docs/releases/` |
| **Producto/Estrategia** | ROADMAP-V1, PROPUESTA-MODELO-MVP, IMPLEMENTACION-V1.1, RELEASE-V1.2, CERTILAB-OS-DISCOVERY | `docs/` raíz |
| **Recuperación** | 8 guías | `docs/09-RECOVERY/` |
| **Auditorías activas** | Todas las de épica cerrada | `docs/08-AUDITS/` |
| **Análisis activos** | Todos los documentos de analysis | `docs/10-ANALYSIS/` |
| **SEO** | Contenido de architecture/ (renombrado) | `docs/07-SEO/` |

### 2.2 Documentos ARCHIVO (se mueven a `docs/archive/`)

| Documento | Destino | Motivo |
|---|---|---|
| `docs/AUDITORIA-ESTRATEGICA-V2.md` | `archive/01-V2-INITIATIVES/` | Exclusivamente V2 — no desbloquea MVP |
| `docs/INVESTOR-DUE-DILIGENCE-V2.md` | `archive/01-V2-INITIATIVES/` | Exclusivamente V2 — no desbloquea MVP |
| `docs/AUDITORIA-ARQUITECTURA-V1.1.md` | `archive/01-V2-INITIATIVES/` | V1.1, no V1 — no aplica al MVP |
| `docs/editorial/*` | `archive/06-PUBLIC-SEO/` | Contenido histórico de análisis SEO público |
| `docs/expedientes/*` | `archive/06-PUBLIC-SEO/` | Contenido histórico de análisis SEO público |
| `docs/observatorio/*` | `archive/06-PUBLIC-SEO/` | Contenido histórico de análisis SEO público |
| `docs/CF-005-FEASIBILITY-REPORT.md` | `archive/04-EPICS-CLOSED/` | Reporte de viabilidad — épica cerrada |

### 2.3 Documentos REVISAR (requieren decisión sobre su estado)

| Documento | Clasificación propuesta | Criterio |
|---|---|---|
| `docs/PROPUESTA-MODELO-MVP.md` | **Revisar** — ¿Archivar o mantener activo? | Contiene la definición del MVP, pero puede estar superado por CF-050 y decisiones posteriores |
| `docs/IMPLEMENTACION-V1.1.md` | **Revisar** — ¿Archivar o mantener activo? | Plan V1.1 vs. estado actual del proyecto |
| `docs/RELEASE-V1.2.md` | **Revisar** — ¿Archivar o mantener activo? | Plan V1.2 vs. priorización actual |
| `docs/CERTILAB-OS-DISCOVERY.md` | **Revisar** — ¿Archivar o mantener activo? | Discovery que motivó ADR-001 — valor histórico, pero su contenido está integrado en ADR-001 |

---

## 3. Lista Completa de Movimientos

### 3.1 Movimientos de directorios completos ✅ (sin riesgo de referencias rotas)

| # | Origen | Destino | Tipo | Referencias a actualizar |
|---|---|---|---|---|
| M1 | `docs/architecture/` | `docs/07-SEO/` | Renombrar directorio | 1 (START_HERE.md) |
| M2 | `docs/audits/` | `docs/08-AUDITS/` | Mover directorio | 3 (llms.txt L68-L70) |
| M3 | `docs/recovery/` | `docs/09-RECOVERY/` | Mover directorio | 7 (llms.txt L78-L84) |
| M4 | `docs/editorial/` | `docs/archive/06-PUBLIC-SEO/` | Mover directorio | 0 |
| M5 | `docs/expedientes/` | `docs/archive/06-PUBLIC-SEO/` | Mover directorio | 0 |
| M6 | `docs/observatorio/` | `docs/archive/06-PUBLIC-SEO/` | Mover directorio | 0 |

### 3.2 Reorganización de docs/analysis/ → docs/10-ANALYSIS/ ✅

| # | Origen | Destino | Referencias a actualizar |
|---|---|---|---|
| M7 | `docs/analysis/DROPDOWN-ESLINT-ANALYSIS.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M8 | `docs/analysis/DROPDOWN-ESLINT-FINAL-ANALYSIS.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M9 | `docs/analysis/DROPDOWN-ESLINT-RESOLUTION.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M10 | `docs/analysis/ARQUITECTURA-DOCUMENTO-DECISIONES.md` | `docs/10-ANALYSIS/technical/` | 1 (stories/) |
| M11 | `docs/analysis/UX-VALIDATION-DOCUMENTO-DECISIONES.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M12 | `docs/analysis/PROTOCOLO-VALIDACION-COMPRENSION.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M13 | `docs/analysis/CF-005-FEASIBILITY-REPORT.md` | `docs/archive/04-EPICS-CLOSED/` | 0 |
| M14 | `docs/analysis/CF-005-AGENTS-MAP.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M15 | `docs/analysis/CKB-001-SIMPLIFIED-PROPOSAL.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M16 | `docs/analysis/CKB-001-ARCHITECTURAL-REPORT.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M17 | `docs/analysis/REORGANIZATION-PLAN.md` | `docs/10-ANALYSIS/technical/` | 0 (se actualizaría a sí mismo) |
| M18 | `docs/analysis/REORGANIZATION-DEPENDENCY-AUDIT.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M19 | `docs/analysis/S1-T01-ARQUITECTURA-REVISION.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M20 | `docs/analysis/S1-T02-ARQUITECTURA-DISENO.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M21 | `docs/analysis/EP-031-PITR-V1-ANALYSIS.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M22 | `docs/analysis/EP-032-ENTREGA-RESULTADO-ANALYSIS.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M23 | `docs/analysis/EP-033-CORRECCION-DOCUMENTACION-ANALYSIS.md` | `docs/10-ANALYSIS/technical/` | 0 |
| M24 | `docs/analysis/BP-001-BUSINESS-BLUEPRINT-PLAN.md` | `docs/10-ANALYSIS/business-blueprint/` | 0 |
| M25 | `docs/analysis/BP-100-01-BUSINESS-BLUEPRINT-CANVAS.md` | `docs/10-ANALYSIS/business-blueprint/` | 0 |
| M26 | `docs/analysis/BP-100-02-LINEAS-DE-NEGOCIO.md` | `docs/10-ANALYSIS/business-blueprint/` | 0 |
| M27 | `docs/analysis/BP-100-03-MODELO-OPERATIVO-Y-COMERCIAL.md` | `docs/10-ANALYSIS/business-blueprint/` | 0 |
| M28 | `docs/analysis/BP-100-04-MARKETING-CUSTOMER-JOURNEY-CRECIMIENTO.md` | `docs/10-ANALYSIS/business-blueprint/` | 0 |
| M29 | `docs/analysis/EP-102-GESTION-TECNICA-DOCUMENTAL.md` | `docs/10-ANALYSIS/business-blueprint/` | 0 |
| M30 | `docs/analysis/EP-101-PRODUCT-BUSINESS-ALIGNMENT.md` | `docs/10-ANALYSIS/business-blueprint/` | 0 |
| M31 | `docs/analysis/GTM-001-GO-TO-MARKET-PLAN.md` | `docs/10-ANALYSIS/go-to-market/` | 0 |
| M32 | `docs/analysis/GTM-001-MARKET-ARCHITECTURE.md` | `docs/10-ANALYSIS/go-to-market/` | 0 |
| M33 | `docs/analysis/GTM-001-BUYER-PERSONAS.md` | `docs/10-ANALYSIS/go-to-market/` | 0 |
| M34 | `docs/analysis/GTM-001-COMPETITIVE-ANALYSIS.md` | `docs/10-ANALYSIS/go-to-market/` | 0 |
| M35 | `docs/analysis/GTM-001-POSITIONING.md` | `docs/10-ANALYSIS/go-to-market/` | 0 |
| M36 | `docs/analysis/GTM-001-GTM-STRATEGY.md` | `docs/10-ANALYSIS/go-to-market/` | 0 |
| M37 | `docs/analysis/GTM-001-CUSTOMER-JOURNEY.md` | `docs/10-ANALYSIS/go-to-market/` | 0 |
| M38 | `docs/analysis/GTM-001-PRICING.md` | `docs/10-ANALYSIS/go-to-market/` | 0 |
| M39 | `docs/analysis/GTM-001-SEO-CONTENT-STRATEGY.md` | `docs/10-ANALYSIS/go-to-market/` | 0 |
| M40 | `docs/analysis/GTM-001-CAPTATION-CONVERSION-RETENTION.md` | `docs/10-ANALYSIS/go-to-market/` | 0 |
| M41 | `docs/analysis/GTM-001-AUTOMATION-IA-MATRIX.md` | `docs/10-ANALYSIS/go-to-market/` | 0 |
| M42 | `docs/analysis/PRD-FRAMEWORK-001.md` | `docs/10-ANALYSIS/prd/` | 0 |
| M43 | `docs/analysis/PRD-001-CANDIDATE-EVALUATION.md` | `docs/10-ANALYSIS/prd/` | 0 |
| M44 | `docs/analysis/PRD-001-ATI03-INFORME-TECNICO-ENERGETICO.md` | `docs/10-ANALYSIS/prd/` | 0 |
| M45 | `docs/analysis/MARKET-RESEARCH-ATI03-VALIDATION.md` | `docs/10-ANALYSIS/prd/` | 0 |
| M46 | `docs/analysis/GLOSARIO-PRD-001.md` | `docs/10-ANALYSIS/prd/` | 0 |
| M47 | `docs/analysis/SESSION-HANDOVER-PRD001.md` | `docs/10-ANALYSIS/prd/` | 0 |
| M48 | `docs/analysis/RF-002-NIVEL-DE-CONFIANZA.md` | `docs/10-ANALYSIS/prd/` | 0 |
| M49 | `docs/analysis/RF-003-JERARQUIA-DE-DECISIONES.md` | `docs/10-ANALYSIS/prd/` | 0 |
| M50 | `docs/analysis/RF-004-IMPACTO-DE-ACTUACIONES.md` | `docs/10-ANALYSIS/prd/` | 0 |
| M51 | `docs/analysis/RF-005-INVERSION-RETORNO.md` | `docs/10-ANALYSIS/prd/` | 0 |
| M52 | `docs/analysis/REVISION-HORIZONTAL-CAPA1.md` | `docs/10-ANALYSIS/prd/` | 0 |
| M53 | `docs/analysis/MATRIZ-TRAZABILIDAD-CAPA1.md` | `docs/10-ANALYSIS/prd/` | 0 |

### 3.3 Movimientos de documentos individuales a archive/

| # | Origen | Destino | Riesgo |
|---|---|---|---|
| M54 | `docs/AUDITORIA-ESTRATEGICA-V2.md` | `docs/archive/01-V2-INITIATIVES/` | ✅ Seguro |
| M55 | `docs/INVESTOR-DUE-DILIGENCE-V2.md` | `docs/archive/01-V2-INITIATIVES/` | ✅ Seguro |
| M56 | `docs/AUDITORIA-ARQUITECTURA-V1.1.md` | `docs/archive/01-V2-INITIATIVES/` | ✅ Seguro |

### 3.4 Reorganización de scripts/

| # | Origen | Destino | Riesgo |
|---|---|---|---|
| M57 | `scripts/apply-migration.mjs` | `scripts/db/` | ⚠️ Verificar api/route.ts |
| M58 | `scripts/apply-migration-cliente.mjs` | `scripts/db/` | ✅ Seguro |
| M59 | `scripts/apply-migration-final.mjs` | `scripts/db/` | ✅ Seguro |
| M60 | `scripts/apply-migration-v3.mjs` | `scripts/db/` | ✅ Seguro |
| M61 | `scripts/apply-sql.mjs` | `scripts/db/` | ✅ Seguro |
| M62 | `scripts/apply-sql-final.mjs` | `scripts/db/` | ✅ Seguro |
| M63 | `scripts/apply-expediente-migration.mjs` | `scripts/db/` | ✅ Seguro |
| M64 | `scripts/apply-phase-a-expediente.mjs` | `scripts/db/` | ✅ Seguro |
| M65 | `scripts/apply-diagnostico-migration.mjs` | `scripts/db/` | ✅ Seguro |
| M66 | `scripts/check-db.mjs` | `scripts/db/` | ✅ Seguro |
| M67 | `scripts/check-db-state.mjs` | `scripts/db/` | ✅ Seguro |
| M68 | `scripts/check-table.mjs` | `scripts/db/` | ✅ Seguro |
| M69 | `scripts/check-remote-schema.mjs` | `scripts/db/` | ✅ Seguro |
| M70 | `scripts/check-and-expose-schema.mjs` | `scripts/db/` | ✅ Seguro |
| M71 | `scripts/expose-core-schema.mjs` | `scripts/db/` | ✅ Seguro |
| M72 | `scripts/verify-and-fix-schema.mjs` | `scripts/db/` | ✅ Seguro |
| M73 | `scripts/run-migration.mjs` | `scripts/db/` | ✅ Seguro |
| M74 | `scripts/apply-sql-v2` (sin extensión) | `scripts/db/` | ✅ Seguro |
| M75 | `scripts/generate-llms.mjs` | `scripts/build/` | ✅ Seguro |
| M76 | `scripts/generate-og-image.mjs` | `scripts/build/` | ✅ Seguro |
| M77 | `scripts/check-unused-css.mjs` | `scripts/build/` | ✅ Seguro |
| M78 | `scripts/check-seo.mjs` | `scripts/seo/` | ✅ Seguro |
| M79 | `scripts/analyze-faq.mjs` | `scripts/seo/` | ✅ Seguro |
| M80 | `scripts/analyze-faq-articles.mjs` | `scripts/seo/` | ✅ Seguro |
| M81 | `scripts/extracted_articles.json` | `scripts/seo/` | ✅ Seguro |
| M82 | `scripts/rewritten_articles.json` | `scripts/seo/` | ✅ Seguro |
| M83 | `scripts/rewritten_v2.json` | `scripts/seo/` | ✅ Seguro |

### 3.5 Archivos NUEVOS a crear

| # | Archivo | Propósito |
|---|---|---|
| N1 | `docs/INDEX.md` | Índice clasificado con enlaces a todos los documentos activos |
| N2 | `docs/10-ANALYSIS/INDEX.md` | Índice de análisis con enlaces a technical/, prd/, business-blueprint/, go-to-market/ |
| N3 | `docs/archive/INDEX.md` | Índice de archivo explicando qué contiene cada subdirectorio y por qué está archivado |

---

## 4. Referencias que DEBEN Actualizarse

### 4.1 Referencias en archivos raíz (críticas)

| Archivo | Línea | Referencia actual | Debe actualizarse a |
|---|---|---|---|
| `AGENTS.md` | 112 | `` `docs/CF-000-PROJECT-BRAIN.md` `` | (sin cambios — CF docs NO se mueven) |
| `AGENTS.md` | 113 | `` `docs/CF-001-SESSION-PROTOCOL.md` `` | (sin cambios) |
| `AGENTS.md` | 114 | `` `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` `` | (sin cambios) |
| `START_HERE.md` | — | `docs/architecture/` | `docs/07-SEO/` (si se renombra) |
| `docs/llms.txt` | L68 | `docs/audits/AUDITORIA-CONSTITUCIONAL-DEFINITIVA.md` | `docs/08-AUDITS/AUDITORIA-CONSTITUCIONAL-DEFINITIVA.md` |
| `docs/llms.txt` | L69 | `docs/audits/SPRINT-05-CIERRE-DOMINIO-V1.md` | `docs/08-AUDITS/SPRINT-05-CIERRE-DOMINIO-V1.md` |
| `docs/llms.txt` | L70 | `docs/audits/SESSION_REPORT.md` | `docs/08-AUDITS/SESSION_REPORT.md` |
| `docs/llms.txt` | L72 | `[docs/audits/](../docs/audits/)` | `[docs/08-AUDITS/](../docs/08-AUDITS/)` |
| `docs/llms.txt` | L78-L84 | `docs/recovery/*` | `docs/09-RECOVERY/*` |

### 4.2 Referencias en código fuente (potencialmente críticas)

| Archivo | Línea | Referencia | Nota |
|---|---|---|---|
| `src/app/api/apply-migration/route.ts` | — | `scripts/apply-migration.mjs` | ⚠️ Verificar si importa por ruta relativa |

### 4.3 Resumen de actualizaciones

| Prioridad | Archivos a modificar | Número de cambios |
|---|---|---|
| 🔴 Crítica | `docs/llms.txt` | 10 referencias |
| 🟡 Alta | `AGENTS.md` | 3 referencias (solo si se mueven CF docs — NO recomendado) |
| 🟡 Alta | `START_HERE.md` | 1 referencia (docs/architecture/ → docs/07-SEO/) |
| 🟢 Media | `docs/CKB-INDEX.md` | 12+ referencias (solo si se mueven CF docs — NO recomendado) |
| 🟢 Baja | `src/app/api/apply-migration/route.ts` | 1 referencia (scripts/) |

---

## 5. Riesgos

### 5.1 Matriz de Riesgos

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|---|
| R1 | **Referencias rotas en llms.txt** al mover audits/ y recovery/ | Media | Alto (LLMs no encontrarían docs) | Actualizar llms.txt en el mismo commit que los movimientos |
| R2 | **Referencia rota en START_HERE.md** al renombrar architecture/ | Alta | Bajo (solo 1 ruta) | Actualizar START_HERE.md simultáneamente |
| R3 | **Script import no encontrado** al mover apply-migration.mjs | Baja | Alto (API route rota) | Verificar src/app/api/apply-migration/route.ts antes de mover; crear symlink o actualizar import |
| R4 | **CKB-INDEX roto** si se mueven CF docs | Media (si se ignora recomendación) | Alto (CKB es guía de conocimiento) | NO mover CF docs — permanecen en docs/ raíz |
| R5 | **AGENTS.md roto** si se mueven CF docs | Media (si se ignora recomendación) | Alto (AUTOLOAD no funcionaría) | NO mover CF docs — permanecen en docs/ raíz |
| R6 | **Storybook no encuentra assets/book** si se mueve docs/book/ | Baja | Medio (stories rotas) | NO mover docs/book/ |
| R7 | **Confusión post-reorganización** si se mueve todo de golpe | Alta | Medio (desorientación temporal) | Ejecutar por fases, actualizar INDEX.md progresivamente |
| R8 | **Regresión en build/deploy** por cambios en scripts/ | Baja | Alto | NO mover scripts sin verificar imports en src/ |
| R9 | **Pérdida de trazabilidad histórica** si se archivan docs sin índice | Baja | Medio | Crear archive/INDEX.md que explique cada decisión de archivado |

### 5.2 Riesgos que se ACEPTAN

| Riesgo | Justificación |
|---|---|
| **Desorientación temporal** (días 1-3 tras reorganización) | Mitigable con INDEX.md y llms.txt actualizado |
| **Conflicto en merge si hay PRs abiertos** | No aplica — no se modifica Git hasta aprobación |
| **Referencias internas entre análisis** (analysis/ se referencian entre sí) | Se mueven juntos, las referencias relativas se mantienen si se preserva la estructura de subdirectorios |

### 5.3 Riesgos que se EVITAN (no se ejecutan)

| Decisión | Motivo |
|---|---|
| NO mover CF docs de docs/ raíz | 31 referencias en llms.txt + 3 en AGENTS.md + 12+ en CKB-INDEX = riesgo de rotura masiva |
| NO mover ADRs de docs/adr/ | 25+ referencias cada una desde CKB, auditorías, y documentos de análisis |
| NO mover docs/book/ | Referenciado desde stories/ |
| NO mover docs/product/ | Sin beneficio claro, riesgo de rotura de referencias internas |
| NO mover docs/releases/ | Sin referencias externas que justifiquen el movimiento |
| NO mover docs/ckb/ | Autorreferencias con CKB-INDEX.md y CKB-GUIDE.md en docs/ raíz |
| NO mover docs/design/ | Sin beneficio, sin referencias rotas actualmente |

---

## 6. Impacto

### 6.1 Impacto por área

| Área | Impacto | Descripción |
|---|---|---|
| **docs/llms.txt** | ⚠️ 10 líneas modificadas | Actualizar rutas de audits/, recovery/, architecture/ |
| **AGENTS.md** | ✅ Sin impacto | CF docs no se mueven |
| **START_HERE.md** | 🟢 1 línea modificada | `docs/architecture/` → `docs/07-SEO/` |
| **src/api/apply-migration** | 🟡 Verificar | Si el import es por ruta relativa, habrá que actualizar |
| **stories/** | ✅ Sin impacto | book/ no se mueve |
| **CKB-INDEX.md** | ✅ Sin impacto | CF docs no se mueven |
| **CKB-GUIDE.md** | ✅ Sin impacto | CF docs no se mueven |
| **scripts/ archive/** | ✅ Sin impacto | scripts/archive/ no se modifica |
| **GitHub Actions / CI** | ✅ Sin impacto | build.yml no referencia docs/ |
| **Vercel** | ✅ Sin impacto | vercel.json no referencia docs/ |
| **Supabase** | ✅ Sin impacto | migrations/ no se modifica |
| **Core V1** | ✅ Sin impacto | src/ no se modifica |

### 6.2 Impacto en flujo de trabajo diario

| Rol | Antes | Después |
|---|---|---|
| **Desarrollador** | Navega docs/ con 25 archivos CF + 6 subdirectorios mezclados | Navega docs/INDEX.md clasificado + directorios temáticos claros |
| **IA (agente)** | Lee docs/ raíz con mezcla de activo/archivo/mixto | Lee docs/INDEX.md primero → localiza documentos por temática |
| **Arquitecto** | Busca ADRs en docs/adr/ + CF docs mezclados | ADRs en docs/adr/, CF docs en docs/ raíz, todo enlazado desde INDEX.md |
| **Product Manager** | docs/product/ existe pero docs/analysis/ está mezclado | product/ y analysis/ separados claramente |

### 6.3 Impacto en la navegación (antes vs. después)

**Antes:** Para encontrar un documento, el usuario/IA debía conocer su nombre exacto o escanear todo docs/ raíz + 6 subdirectorios.

**Después:**
1. `docs/INDEX.md` → clasificación temática → enlace directo
2. `docs/llms.txt` → clasificación por dominio → enlace directo
3. `docs/10-ANALYSIS/INDEX.md` → subclasificación por tipo de análisis

---

## 7. Orden Recomendado de Ejecución

> **Fase 0 — Preparación** (sin mover archivos)
> **Fase 1 — Índices**
> **Fase 2 — Movimientos seguros**
> **Fase 3 — Movimientos con referencias**
> **Fase 4 — Archivado**
> **Fase 5 — Scripts**
> **Fase 6 — Verificación**

### Fase 0: Preparación (estimación: 1 hora)

| Paso | Acción | Comando / Detalle |
|---|---|---|
| 0.1 | **APROBACIÓN del usuario** | — |
| 0.2 | Verificar que no hay cambios sin commit | `git status` |
| 0.3 | Verificar que el build funciona | `npm run build` |
| 0.4 | Verificar que los tests pasan | `npm test` |
| 0.5 | Verificar el contenido de `src/app/api/apply-migration/route.ts` | Leer el archivo y confirmar si importa scripts/ por ruta relativa |

### Fase 1: Crear índices (estimación: 30 min)

| Paso | Acción | Riesgo |
|---|---|---|
| 1.1 | Crear `docs/INDEX.md` | ✅ Ninguno — archivo nuevo |
| 1.2 | Crear `docs/10-ANALYSIS/INDEX.md` | ✅ Ninguno — archivo nuevo |
| 1.3 | Crear `docs/archive/INDEX.md` | ✅ Ninguno — archivo nuevo |

### Fase 2: Renombrar architecture/ → 07-SEO/ (estimación: 15 min)

| Paso | Acción | Riesgo |
|---|---|---|
| 2.1 | Renombrar `docs/architecture/` → `docs/07-SEO/` | ✅ Bajo |
| 2.2 | Actualizar `docs/llms.txt` (si referencia architecture/) | ✅ Bajo |
| 2.3 | Actualizar `START_HERE.md` (1 referencia) | ✅ Bajo |

### Fase 3: Mover audits/ → 08-AUDITS/ (estimación: 15 min)

| Paso | Acción | Riesgo |
|---|---|---|
| 3.1 | Mover `docs/audits/` → `docs/08-AUDITS/` | ⚠️ Medio (llms.txt) |
| 3.2 | Actualizar `docs/llms.txt` líneas 68-72 | Obligatorio — mismo commit |

### Fase 4: Mover recovery/ → 09-RECOVERY/ (estimación: 10 min)

| Paso | Acción | Riesgo |
|---|---|---|
| 4.1 | Mover `docs/recovery/` → `docs/09-RECOVERY/` | ⚠️ Medio (llms.txt) |
| 4.2 | Actualizar `docs/llms.txt` líneas 78-84 | Obligatorio — mismo commit |

### Fase 5: Reorganizar docs/analysis/ → 10-ANALYSIS/ (estimación: 1h)

| Paso | Acción | Riesgo |
|---|---|---|
| 5.1 | Crear subdirectorios: technical/, prd/, business-blueprint/, go-to-market/ | ✅ Ninguno |
| 5.2 | Mover archivos a technical/ (14 archivos) | ✅ Bajo |
| 5.3 | Mover archivos a prd/ (12 archivos) | ✅ Bajo |
| 5.4 | Mover archivos a business-blueprint/ (7 archivos) | ✅ Bajo |
| 5.5 | Mover archivos a go-to-market/ (11 archivos) | ✅ Bajo |
| 5.6 | Mover CF-005-FEASIBILITY-REPORT.md → archive/ | ✅ Seguro |
| 5.7 | Actualizar `docs/10-ANALYSIS/INDEX.md` con rutas correctas | ✅ Bajo |

### Fase 6: Archivar V2 y SEO (estimación: 20 min)

| Paso | Acción | Riesgo |
|---|---|---|
| 6.1 | Crear subdirectorios en archive/ | ✅ Ninguno |
| 6.2 | Mover docs a archive/01-V2-INITIATIVES/ | ✅ Seguro |
| 6.3 | Mover editorial/ → archive/06-PUBLIC-SEO/ | ✅ Seguro |
| 6.4 | Mover expedientes/ → archive/06-PUBLIC-SEO/ | ✅ Seguro |
| 6.5 | Mover observatorio/ → archive/06-PUBLIC-SEO/ | ✅ Seguro |
| 6.6 | Actualizar `docs/llms.txt` si referencia estos docs | ✅ Bajo |
| 6.7 | Actualizar `docs/archive/INDEX.md` | ✅ Bajo |

### Fase 7: Reorganizar scripts/ (estimación: 30 min)

| Paso | Acción | Riesgo |
|---|---|---|
| 7.1 | Verificar `src/app/api/apply-migration/route.ts` | ⚠️ Crítico — determinar si el import es por ruta |
| 7.2 | Crear subdirectorios: db/, build/, seo/ | ✅ Ninguno |
| 7.3 | Mover scripts DB (18 archivos) a scripts/db/ | ⚠️ Verificar paso 7.1 |
| 7.4 | Mover scripts build (3 archivos) a scripts/build/ | ✅ Seguro |
| 7.5 | Mover scripts SEO (6 archivos) a scripts/seo/ | ✅ Seguro |
| 7.6 | Si `apply-migration.mjs` es referenciado desde código, **no mover** o actualizar import | ⚠️ Medio |

### Fase 8: Verificación final (estimación: 30 min)

| Paso | Acción | Comando |
|---|---|---|
| 8.1 | Verificar que `docs/llms.txt` sigue siendo accesible | `curl http://localhost:3000/docs/llms.txt` |
| 8.2 | Verificar que no hay enlaces rotos en INDEX.md | Revisión manual |
| 8.3 | Verificar que START_HERE.md enlaces funcionan | Revisión manual |
| 8.4 | Verificar build | `npm run build` |
| 8.5 | Verificar tests | `npm test` |
| 8.6 | Verificar que el proyecto sigue funcionando | `npm run dev` y navegar |

### Tiempo total estimado: ~4 horas

---

## 8. Resumen Ejecutivo

### Cambios totales

| Tipo | Cantidad |
|---|---|
| Archivos NUEVOS | 3 (`docs/INDEX.md`, `docs/10-ANALYSIS/INDEX.md`, `docs/archive/INDEX.md`) |
| Directorios MOVIDOS | 5 (architecture/, audits/, recovery/, editorial/, expedientes/, observatorio/) |
| Archivos MOVIDOS (analysis/) | ~44 |
| Archivos MOVIDOS (scripts/) | ~27 |
| Archivos MOVIDOS (archive/) | ~5 |
| Archivos MODIFICADOS (referencias) | ~2 (`docs/llms.txt`, `START_HERE.md`) |
| Archivos SIN CAMBIOS | Todo src/, supabase/migrations/, config raíz |

### Lo que NO se mueve

| Elemento | Decisión firme |
|---|---|
| `docs/CF-*.md` (25 archivos) | ❌ Permanecen en docs/ raíz |
| `docs/adr/` | ❌ Permanecen en docs/adr/ |
| `docs/book/` | ❌ Permanecen en docs/book/ |
| `docs/design/` | ❌ Permanecen en docs/design/ |
| `docs/product/` | ❌ Permanecen en docs/product/ |
| `docs/releases/` | ❌ Permanecen en docs/releases/ |
| `docs/ckb/` | ❌ Permanecen en docs/ckb/ |
| `docs/CKB-INDEX.md`, `docs/CKB-GUIDE.md` | ❌ Permanecen en docs/ raíz |
| `docs/llms.txt` | ❌ Permanecen en docs/ raíz |

### Lo que se gana

1. **Claridad temática:** La documentación activa se organiza por función (gobernanza, dominio, infraestructura, producto, análisis, auditorías, recuperación, SEO)
2. **Archivo histórico:** `docs/archive/` con clasificación expresa (V2, deprecated, épicas cerradas, SEO público)
3. **Índices navegables:** `docs/INDEX.md` + `docs/10-ANALYSIS/INDEX.md` + `docs/archive/INDEX.md`
4. **Cero impacto en Core V1:** src/, supabase/migrations/, config raíz no se modifican
5. **Cero impacto en el pipeline:** build, deploy, tests no cambian
6. **Riesgo controlado:** ~4 horas de ejecución, ~2 archivos con referencias a actualizar

---

## 9. Anexo: Contenido Propuesto para los Nuevos Índices

### 9.1 `docs/INDEX.md` (contenido propuesto)

```markdown
# Certilab Platform — Índice de Documentación

> Índice clasificado de la documentación activa del proyecto.
> Para agentes de IA: usar `docs/llms.txt` como punto de entrada principal.
> Para navegación humana: este índice organiza los documentos por temática.

## Gobernanza y Constitución (docs/)
- [CF-000 — Project Brain (Constitución)](CF-000-PROJECT-BRAIN.md)
- [CF-001 — Session Protocol](CF-001-SESSION-PROTOCOL.md)
- [CF-001A — Acta de Cierre de Arquitectura V1](CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md)
- [CF-003 — AI Execution Policy](CF-003-AI-EXECUTION-POLICY.md)
- [CF-004 — Blocking Management Policy](CF-004-BLOCKING-MANAGEMENT-POLICY.md)
- [ADR-001 — Engineering System](adr/ADR-001-CERTILAB-ENGINEERING-SYSTEM.md)
- [ADR-002 — Auto-entrega MVP](adr/ADR-002-AUTO-ENTREGA-MVP.md)
- [ADR-003 — GTD Línea de Negocio](adr/ADR-003-GTD-LINEA-DE-NEGOCIO.md)
- [ADR-004 — Extensión Documento IA GTD](adr/ADR-004-EXTENSION-DOCUMENTO-IA-GTD.md)

## Dominio (Expediente Digital, Inmueble, Documento IA)
- [CF-002 — Expediente Digital](CF-002-EXPEDIENTE-DIGITAL.md)
- [CF-012 — PITR Motor](CF-012-PITR-MOTOR.md)
- [CF-020 — Data Model](CF-020-DATA-MODEL.md)
- [CF-021 — Domain Model](CF-021-DOMAIN-MODEL.md)
- [CF-022 — Aggregate Boundaries](CF-022-AGGREGATE-BOUNDARIES.md)
- [CF-025 — Inmueble Design](CF-025-INMUEBLE-DESIGN.md)
- [CF-026 — Expediente Design](CF-026-EXPEDIENTE-DESIGN.md)
- [CF-028 — Expediente Workflow](CF-028-EXPEDIENTE-WORKFLOW.md)
- [CF-030 — PITR Expert Knowledge Engine](CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md)
- [CF-031 — PITR Question Tree](CF-031-PITR-QUESTION-TREE.md)
- [CF-032 — Arquitecto Técnico Inspection Manual](CF-032-ARQUITECTO-TECNICO-INSPECTION-MANUAL.md)
- [CF-040 — Business Policies](CF-040-BUSINESS-POLICIES.md)

## Infraestructura y Plataforma
- [CF-011 — Foundation](CF-011-FOUNDATION.md)
- [CF-021 — Supabase Architecture](CF-021-SUPABASE-ARCHITECTURE.md)
- [CF-022 — Implementation Backlog](CF-022-IMPLEMENTATION-BACKLOG.md)

## Producto y Estrategia
- [ROADMAP-V1](ROADMAP-V1.md)
- [PROPUESTA-MODELO-MVP](PROPUESTA-MODELO-MVP.md) (Revisar)
- [IMPLEMENTACION-V1.1](IMPLEMENTACION-V1.1.md) (Revisar)
- [RELEASE-V1.2](RELEASE-V1.2.md) (Revisar)
- [CERTILAB-OS-DISCOVERY](CERTILAB-OS-DISCOVERY.md) (Revisar)
- [Product Vision](product/PRODUCT-VISION.md)
- [Product Roadmap](product/PRODUCT-ROADMAP.md)
- [Product Architecture (PA-001)](product/PA-001-PRODUCT-ARCHITECTURE.md)
- [Product Catalog](product/PA-001-CATALOG.md)

## Design System
- [Design System Architecture](design/DESIGN-SYSTEM-ARCHITECTURE.md)
- [Book — Foundations](book/Volume-01-Foundations.md)
- [Book — Visual Language](book/Volume-02-Visual-Language.md)
- [Book — Design System](book/Volume-03-Design-System.md)
- [Book — UX Bible](book/Volume-04-UX-Bible.md)
- [Book — Copywriting](book/Volume-05-Copywriting.md)
- [Book — Brand Book](book/Volume-06-Brand-Book.md)
- [Book — Implementation](book/Volume-07-Implementation.md)
- [Índice completo del Book](book/INDEX.md)

## CKB (Cumulative Knowledge Base)
- [CKB-INDEX](CKB-INDEX.md)
- [CKB-GUIDE](CKB-GUIDE.md)
- [CKB-EVOLUTION](ckb/CKB-EVOLUTION.md)

## Análisis
- [Índice de Análisis](10-ANALYSIS/INDEX.md) (con subclasificación por tipo)

## Auditorías
- [Ver todas en 08-AUDITS/](08-AUDITS/)

## Recuperación
- [Guías de Recuperación en 09-RECOVERY/](09-RECOVERY/)

## SEO
- [Documentos SEO en 07-SEO/](07-SEO/)

## Archivo
- [Histórico en archive/](archive/INDEX.md)
```

### 9.2 `docs/archive/INDEX.md` (contenido propuesto)

```markdown
# Certilab — Archivo de Documentación Histórica

> Documentos archivados que conservan conocimiento histórico pero NO forman parte
> de la documentación activa del proyecto.
>
> **No deben leerse como parte del protocolo de inicio de sesión (CF-001).**
> **Solo consultarse cuando sea necesario por trazabilidad histórica.**

## 01-V2-INITIATIVES — Iniciativas diferidas a V2
- AUDITORIA-ESTRATEGICA-V2.md — Auditoría estratégica para V2 (no aplica al MVP)
- INVESTOR-DUE-DILIGENCE-V2.md — Due diligence para inversores (no urgente)
- AUDITORIA-ARQUITECTURA-V1.1.md — Auditoría de arquitectura V1.1 (post-MVP)

## 04-EPICS-CLOSED — Épicas cerradas (informes)
- CF-005-FEASIBILITY-REPORT.md — Reporte de viabilidad (épica cerrada)

## 06-PUBLIC-SEO — Contenido SEO público (histórico de análisis)
- Contenido de editorial/, expedientes/, observatorio/ — Análisis SEO de la web pública

## Sobre este archivo
Los documentos en archive/ se clasifican como:
- **Archivo definitivo:** No se espera que vuelvan a activarse
- **Archivo diferido:** Se revisarán para V2 o fases posteriores
```

---

## 10. Decisión Pendiente: Documentos a REVISAR

| Documento | Pregunta para el decisor | Opciones |
|---|---|---|
| `docs/PROPUESTA-MODELO-MVP.md` | ¿Sigue siendo la definición vigente del MVP o está superada por CF-050 y decisiones posteriores? | (a) Mantener activo en docs/ raíz — (b) Archivar en archive/ |
| `docs/IMPLEMENTACION-V1.1.md` | ¿El plan V1.1 sigue siendo relevante o ha sido reemplazado por el roadmap actual? | (a) Mantener activo — (b) Archivar |
| `docs/RELEASE-V1.2.md` | ¿El plan V1.2 es una hoja de ruta activa o un documento histórico? | (a) Mantener activo — (b) Archivar |
| `docs/CERTILAB-OS-DISCOVERY.md` | ¿Es necesario mantenerlo como documento independiente o su contenido ya está integrado en ADR-001? | (a) Mantener activo — (b) Archivar |

**Decisión del usuario (pendiente):** _________________________________