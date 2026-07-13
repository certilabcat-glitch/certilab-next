# Auditoría de Dependencias para la Reorganización del Repositorio

> **Documento:** Auditoría completa de referencias cruzadas
> **Proyecto:** Certilab Platform — V1
> **Fecha:** 2026-07-10
> **Estado:** ✅ Análisis completado — sin modificaciones

---

## 1. Mapa Maestro de Dependencias

### 1.1 Documentos CF en docs/ raíz

| # | Archivo actual | Destino propuesto | Referencias directas | Riesgo |
|---|---|---|---|---|
| 1 | `docs/CF-000-PROJECT-BRAIN.md` | `docs/00-GOVERNANCE/` | **19+ referencias** en: AGENTS.md (L112), llms.txt (L18), START_HERE.md, CKB-INDEX.md, CKB-001-ARCHITECTURAL-REPORT.md, CKB-001-SIMPLIFIED-PROPOSAL.md, ADR-001, ADR-002, ADR-003, ADR-004, AUDITORIA-CONSTITUCIONAL, MASTER-CLEANUP-AUDIT, REORGANIZATION-PLAN, SP-05-DOMINIO, S1-T02-CLIENTE-CLOSURE | **⚠️ Alto** |
| 2 | `docs/CF-001-SESSION-PROTOCOL.md` | `docs/00-GOVERNANCE/` | **15+ referencias** en: AGENTS.md (L113), llms.txt (L19), START_HERE.md, CKB-INDEX.md, MASTER-CLEANUP-AUDIT | **⚠️ Alto** |
| 3 | `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` | `docs/00-GOVERNANCE/` | **18+ referencias** en: AGENTS.md (L114), llms.txt (L9, L20), START_HERE.md, CKB-INDEX.md, ADR-001, ADR-002, MASTER-CLEANUP-AUDIT, REORGANIZATION-PLAN | **⚠️ Alto** |
| 4 | `docs/CF-002-EXPEDIENTE-DIGITAL.md` | `docs/01-DOMAIN/` | **2+ referencias** en: llms.txt (L27), CKB-INDEX.md | **Riesgo Bajo** |
| 5 | `docs/CF-003-AI-EXECUTION-POLICY.md` | `docs/00-GOVERNANCE/` | **5+ referencias** en: AGENTS.md (sección 12), CKB-INDEX.md, REORGANIZATION-PLAN | **⚠️ Medio** |
| 6 | `docs/CF-004-BLOCKING-MANAGEMENT-POLICY.md` | `docs/00-GOVERNANCE/` | **3+ referencias** en: AGENTS.md, CKB-INDEX.md | **Riesgo Bajo** |
| 7 | `docs/CF-011-FOUNDATION.md` | `docs/04-INFRASTRUCTURE/` | **2+ referencias** en: llms.txt (L48), CKB-INDEX.md | **Riesgo Bajo** |
| 8 | `docs/CF-012-PITR-MOTOR.md` | `docs/01-DOMAIN/` | **2+ referencias** en: llms.txt (L28), CKB-INDEX.md | **Riesgo Bajo** |
| 9 | `docs/CF-020-DATA-MODEL.md` | `docs/01-DOMAIN/` | **3+ referencias** en: llms.txt (L38), CKB-INDEX.md | **Riesgo Bajo** |
| 10 | `docs/CF-021-DOMAIN-MODEL.md` | `docs/01-DOMAIN/` | **3+ referencias** en: llms.txt (L39), CKB-INDEX.md | **Riesgo Bajo** |
| 11 | `docs/CF-021-SUPABASE-ARCHITECTURE.md` | `docs/04-INFRASTRUCTURE/` | **2+ referencias** en: llms.txt (L49), CKB-INDEX.md | **Riesgo Bajo** |
| 12 | `docs/CF-022-AGGREGATE-BOUNDARIES.md` | `docs/01-DOMAIN/` | **4+ referencias** en: llms.txt (L40), CKB-INDEX.md, ADR-001 | **Riesgo Bajo** |
| 13 | `docs/CF-022-IMPLEMENTATION-BACKLOG.md` | `docs/04-INFRASTRUCTURE/` | **2+ referencias** en: llms.txt (L50), CKB-INDEX.md | **Riesgo Bajo** |
| 14 | `docs/CF-025-INMUEBLE-DESIGN.md` | `docs/01-DOMAIN/` | **3+ referencias** en: llms.txt (L41), CKB-INDEX.md | **Riesgo Bajo** |
| 15 | `docs/CF-026-EXPEDIENTE-DESIGN.md` | `docs/01-DOMAIN/` | **3+ referencias** en: llms.txt (L29), CKB-INDEX.md | **Riesgo Bajo** |
| 16 | `docs/CF-028-EXPEDIENTE-WORKFLOW.md` | `docs/01-DOMAIN/` | **2+ referencias** en: CKB-INDEX.md | **Riesgo Bajo** |
| 17 | `docs/CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md` | `docs/01-DOMAIN/` | **2+ referencias** en: llms.txt (L30), CKB-INDEX.md | **Riesgo Bajo** |
| 18 | `docs/CF-031-PITR-QUESTION-TREE.md` | `docs/01-DOMAIN/` | **2+ referencias** en: llms.txt (L31), CKB-INDEX.md | **Riesgo Bajo** |
| 19 | `docs/CF-032-ARQUITECTO-TECNICO-INSPECTION-MANUAL.md` | `docs/01-DOMAIN/` | **2+ referencias** en: llms.txt (L32), CKB-INDEX.md | **Riesgo Bajo** |
| 20 | `docs/CF-040-BUSINESS-POLICIES.md` | `docs/03-POLICIES/` | **3+ referencias** en: llms.txt (L42), CKB-INDEX.md | **Riesgo Bajo** |
| 21 | `docs/CF-050-MVP-FREEZE.md` | `docs/03-POLICIES/` | **2+ referencias** en: CKB-INDEX.md | **Riesgo Bajo** |

### 1.2 Documentos de Estrategia en docs/ raíz

| # | Archivo actual | Destino propuesto | Referencias directas | Riesgo |
|---|---|---|---|---|
| 22 | `docs/ROADMAP-V1.md` | `docs/06-PRODUCT/` | **4+ referencias** en: llms.txt (L56), CKB-INDEX.md, MASTER-CLEANUP-AUDIT | **Riesgo Medio** |
| 23 | `docs/PROPUESTA-MODELO-MVP.md` | `docs/06-PRODUCT/` | **2+ referencias** en: llms.txt (L57), CKB-INDEX.md | **Riesgo Bajo** |
| 24 | `docs/IMPLEMENTACION-V1.1.md` | `docs/06-PRODUCT/` | **2+ referencias** en: llms.txt (L58), CKB-INDEX.md | **Riesgo Bajo** |
| 25 | `docs/RELEASE-V1.2.md` | `docs/06-PRODUCT/` | **1 referencia** en: llms.txt (L59) | **Riesgo Bajo** |
| 26 | `docs/CERTILAB-OS-DISCOVERY.md` | `docs/06-PRODUCT/` | **2+ referencias** en: llms.txt (L60), CKB-INDEX.md | **Riesgo Bajo** |
| 27 | `docs/CKB-INDEX.md` | `docs/15-CKB/` | **2+ referencias** en: CKB-GUIDE.md, CKB-EVOLUTION.md — autorreferenciado | **⚠️ Medio** |
| 28 | `docs/CKB-GUIDE.md` | `docs/15-CKB/` | **1+ referencia** en: CKB-EVOLUTION.md | **Riesgo Bajo** |
| 29 | `docs/AUDITORIA-ESTRATEGICA-V2.md` | `docs/archive/01-V2-INITIATIVES/` | **1 referencia** en: llms.txt (L61) | **Seguro** |
| 30 | `docs/INVESTOR-DUE-DILIGENCE-V2.md` | `docs/archive/01-V2-INITIATIVES/` | **1 referencia** en: llms.txt (L62) | **Seguro** |
| 31 | `docs/llms.txt` | `docs/` (permanece) | Autoreferenciado — **NO MOVER** | — |
| 32 | `docs/AUDITORIA-ARQUITECTURA-V1.1.md` | `docs/archive/02-DEPRECATED/` | Sin referencias externas detectadas | **Seguro** |
| 33 | `docs/CF-005-FEASIBILITY-REPORT.md` | `docs/archive/04-EPICS-CLOSED/` | Sin referencias externas detectadas | **Seguro** |

### 1.3 ADR (docs/adr/)

| # | Archivo actual | Destino propuesto | Referencias directas | Riesgo |
|---|---|---|---|---|
| 34 | `docs/adr/ADR-001-CERTILAB-ENGINEERING-SYSTEM.md` | `docs/00-GOVERNANCE/` (stay) | **25+ referencias** en 15+ archivos: CKB-001-ARCHITECTURAL-REPORT.md, CKB-001-SIMPLIFIED-PROPOSAL.md, REORGANIZATION-PLAN.md, MASTER-CLEANUP-AUDIT.md, llms.txt (L21), y otros | **Movimiento Complejo** |
| 35 | `docs/adr/ADR-002-AUTO-ENTREGA-MVP.md` | `docs/00-GOVERNANCE/` (stay) | **20+ referencias** en 12+ archivos | **Movimiento Complejo** |
| 36 | `docs/adr/ADR-003-GTD-LINEA-DE-NEGOCIO.md` | `docs/00-GOVERNANCE/` (stay) | **30+ referencias** en 18+ archivos | **Movimiento Complejo** |
| 37 | `docs/adr/ADR-004-EXTENSION-DOCUMENTO-IA-GTD.md` | `docs/00-GOVERNANCE/` (stay) | **25+ referencias** en 15+ archivos | **Movimiento Complejo** |

### 1.4 Auditorías (docs/audits/)

| # | Archivo actual | Destino propuesto | Referencias directas | Riesgo |
|---|---|---|---|---|
| 38 | `docs/audits/AUDITORIA-CONSTITUCIONAL-DEFINITIVA.md` | `docs/08-AUDITS/` | **3+ referencias** en: llms.txt (L68), CKB-INDEX.md | **Riesgo Bajo** |
| 39 | `docs/audits/SPRINT-05-CIERRE-DOMINIO-V1.md` | `docs/08-AUDITS/` | **2+ referencias** en: llms.txt (L69), CKB-INDEX.md | **Riesgo Bajo** |
| 40 | `docs/audits/SESSION_REPORT.md` | `docs/08-AUDITS/` | **1 referencia** en: llms.txt (L70) | **Seguro** |
| 41 | 25+ auditorías de épica (EP-0XX-CLOSURE-REPORT) | `docs/08-AUDITS/` | Referencias internas entre auditorías | **Riesgo Bajo** |
| 42 | `docs/audits/MASTER-CLEANUP-AUDIT.md` | `docs/08-AUDITS/` | **3+ referencias** internas a CF docs | **Riesgo Bajo** |
| 43 | `docs/audits/RC-001-FINAL-AUDIT.md` | `docs/08-AUDITS/` | 0 referencias externas | **Seguro** |

### 1.5 Documentos de Análisis (docs/analysis/)

| # | Archivo actual | Destino propuesto | Referencias directas | Riesgo |
|---|---|---|---|---|
| 44 | BP-001-BUSINESS-BLUEPRINT-PLAN.md | `docs/10-ANALYSIS/business-blueprint/` | Referencias internas al BP | **Riesgo Bajo** |
| 45 | BP-100-01 a BP-100-04 | `docs/10-ANALYSIS/business-blueprint/` | 0 externas | **Seguro** |
| 46 | GTM-001-* (10 archivos) | `docs/10-ANALYSIS/go-to-market/` | 0 externas | **Seguro** |
| 47 | PRD-FRAMEWORK-001.md | `docs/10-ANALYSIS/prd/` | 0 externas | **Seguro** |
| 48 | PRD-001-CANDIDATE-EVALUATION.md | `docs/10-ANALYSIS/prd/` | 0 externas | **Seguro** |
| 49 | RF-002 a RF-005 | `docs/10-ANALYSIS/prd/` | Referencias internas a RF | **Seguro** |
| 50 | DROPDOWN-ESLINT-*.md | `docs/10-ANALYSIS/technical/` | 0 externas | **Seguro** |
| 51 | CKB-001-*.md | `docs/10-ANALYSIS/technical/` | Referencias a CF-000 | **Riesgo Bajo** |
| 52 | REVISION-HORIZONTAL-CAPA1.md | `docs/10-ANALYSIS/prd/` | 0 externas | **Seguro** |
| 53 | MATRIZ-TRAZABILIDAD-CAPA1.md | `docs/10-ANALYSIS/prd/` | 0 externas | **Seguro** |
| 54 | ARQUITECTURA-DOCUMENTO-DECISIONES.md | `docs/10-ANALYSIS/technical/` | Referencia desde stories/ | **Riesgo Bajo** |
| 55 | UX-VALIDATION-DOCUMENTO-DECISIONES.md | `docs/10-ANALYSIS/technical/` | 0 externas | **Seguro** |
| 56 | PROTOCOLO-VALIDACION-COMPRENSION.md | `docs/10-ANALYSIS/technical/` | 0 externas | **Seguro** |
| 57 | S1-T01-ARQUITECTURA-REVISION.md | `docs/10-ANALYSIS/technical/` | 0 externas | **Seguro** |
| 58 | S1-T02-ARQUITECTURA-DISENO.md | `docs/10-ANALYSIS/technical/` | 0 externas | **Seguro** |
| 59 | EP-031-PITR-V1-ANALYSIS.md | `docs/10-ANALYSIS/technical/` | 0 externas | **Seguro** |
| 60 | EP-032-ENTREGA-RESULTADO-ANALYSIS.md | `docs/10-ANALYSIS/technical/` | 0 externas | **Seguro** |
| 61 | EP-033-CORRECCION-DOCUMENTACION-ANALYSIS.md | `docs/10-ANALYSIS/technical/` | 0 externas | **Seguro** |
| 62 | SESSION-HANDOVER-PRD001.md | `docs/10-ANALYSIS/prd/` | 0 externas | **Seguro** |
| 63 | GLOSARIO-PRD-001.md | `docs/10-ANALYSIS/prd/` | 0 externas | **Seguro** |
| 64 | MARKET-RESEARCH-ATI03-VALIDATION.md | `docs/10-ANALYSIS/prd/` | 0 externas | **Seguro** |

### 1.6 docs/product/

| # | Archivo actual | Destino propuesto | Referencias directas | Riesgo |
|---|---|---|---|---|
| 65 | PRODUCT-PERSONAS.md | Permanecería en destino | Referencias internas al PA | **Seguro** |
| 66 | PRODUCT-COMPETITORS.md | Permanecería en destino | Referencias internas | **Seguro** |
| 67 | PRODUCT-VISION.md | Permanecería en destino | Referencias internas | **Seguro** |
| 68 | PRODUCT-POSITIONING.md | Permanecería en destino | Referencias internas | **Seguro** |
| 69 | PRODUCT-ROADMAP.md | Permanecería en destino | Referencias internas | **Seguro** |
| 70 | PA-001-PRODUCT-ARCHITECTURE.md | Permanecería en destino | Referencias a ADR-003, ADR-004 | **Riesgo Bajo** |
| 71 | PA-001-CATALOG.md | Permanecería en destino | Referencias a ADR-003, ADR-004 | **Riesgo Bajo** |
| 72 | PA-001-PRODUCT-VALIDATION-CRITERIA.md | Permanecería en destino | 0 externas | **Seguro** |

### 1.7 docs/book/ y docs/design/

| # | Archivo actual | Destino propuesto | Referencias directas | Riesgo |
|---|---|---|---|---|
| 73 | book/INDEX.md → 7 Volúmenes | **No mover** (permanecen en `docs/book/`) | Referencias internas desde stories/ | **Seguro** |
| 74 | docs/design/DESIGN-SYSTEM-ARCHITECTURE.md | **No mover** (permanece en `docs/design/`) | Referencias internas | **Seguro** |

### 1.8 docs/ckb/

| # | Archivo actual | Destino propuesto | Referencias directas | Riesgo |
|---|---|---|---|---|
| 75 | docs/ckb/CKB-EVOLUTION.md | **Mover** a `docs/15-CKB/` | Referencia a CKB-GUIDE, CKB-INDEX | **Riesgo Bajo** |

### 1.9 docs/releases/

| # | Archivo actual | Destino propuesto | Referencias directas | Riesgo |
|---|---|---|---|---|
| 76 | v1.0.0-rc1.md | **No mover** (permanece en `docs/releases/`) | 0 externas | **Seguro** |

### 1.10 docs/recovery/ y docs/architecture/

| # | Archivo actual | Destino propuesto | Referencias directas | Riesgo |
|---|---|---|---|---|
| 77 | recovery/ (7 archivos) | `docs/09-RECOVERY/` | **1 referencia** en: llms.txt (L78-L84) | **Riesgo Medio** |
| 78 | architecture/ | `docs/07-SEO/` | **1 referencia** en: START_HERE.md | **Riesgo Bajo** |

### 1.11 docs/editorial/, docs/expedientes/, docs/observatorio/

| Archivo | Destino | Referencias | Riesgo |
|---|---|---|---|
| `docs/editorial/` | `docs/archive/06-PUBLIC-SEO/` | 0 externas | **Seguro** |
| `docs/expedientes/` | `docs/archive/06-PUBLIC-SEO/` | 0 externas | **Seguro** |
| `docs/observatorio/` | `docs/archive/06-PUBLIC-SEO/` | 0 externas | **Seguro** |

### 1.12 Scripts

| Script | Destino propuesto | Referencias directas | Riesgo |
|---|---|---|---|
| apply-migration-*.mjs (6) | `scripts/db/` | **3+ referencias** desde src/app/api/apply-migration/route.ts | **⚠️ Medio** |
| check-*.mjs (6) | `scripts/db/` | 0 externas | **Seguro** |
| expose-core-schema.mjs | `scripts/db/` | 0 externas | **Seguro** |
| verify-and-fix-schema.mjs | `scripts/db/` | 0 externas | **Seguro** |
| generate-llms.mjs | `scripts/build/` | 0 externas | **Seguro** |
| generate-og-image.mjs | `scripts/build/` | 0 externas | **Seguro** |
| check-seo.mjs | `scripts/seo/` | 0 externas | **Seguro** |
| check-unused-css.mjs | `scripts/build/` | 0 externas | **Seguro** |
| analyze-faq-articles.mjs | `scripts/seo/` | 0 externas | **Seguro** |
| analyze-faq.mjs | `scripts/seo/` | 0 externas | **Seguro** |

---

## 2. Referencias que DEBERÍAN actualizarse (si se ejecuta la reorganización)

### 2.1 Bloque Crítico: `docs/llms.txt` (31 rutas)

El archivo `docs/llms.txt` contiene **31 rutas** con prefijo `../docs/`. Cualquier movimiento de archivos CF dentro de `docs/` romperá TODAS estas referencias. Ejemplo:

```
L18: - [docs/CF-000-PROJECT-BRAIN.md](../docs/CF-000-PROJECT-BRAIN.md)
     → debería ser:    ../docs/00-GOVERNANCE/CF-000-PROJECT-BRAIN.md
```

**Todas las líneas 18-84 necesitan actualización.**

### 2.2 Bloque Alto: `AGENTS.md` (3 rutas)

```
L112: - `docs/CF-000-PROJECT-BRAIN.md`
L113: - `docs/CF-001-SESSION-PROTOCOL.md`
L114: - `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md`
```

Las rutas en AGENTS.md NO llevan `../` porque AGENTS.md está en la raíz. Las rutas son relativas a la raíz. Si los archivos se mueven a `docs/00-GOVERNANCE/`, las rutas cambiarían a:
- `docs/00-GOVERNANCE/CF-000-PROJECT-BRAIN.md`
- `docs/00-GOVERNANCE/CF-001-SESSION-PROTOCOL.md`
- `docs/00-GOVERNANCE/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md`

### 2.3 Bloque Medio: `CKB-INDEX.md` (12+ rutas)

`docs/CKB-INDEX.md` referencia múltiples CF docs y otros archivos usando paths relativos. Si los CF docs se mueven a `docs/00-GOVERNANCE/` y `docs/CKB-INDEX.md` se mueve a `docs/15-CKB/`, todas las rutas relativas cambian.

### 2.4 Bloque Medio: `CKB-GUIDE.md` (1 ruta)

Referencia a `CKB-INDEX.md` que también se movería.

### 2.5 Bloque Bajo: START_HERE.md

Referencias a CF-000, CF-001, CF-001A y docs/architecture/ — rutas relativas desde raíz.

### 2.6 Bloque Bajo: Referencias internas entre ADRs

Las ADR-001 a ADR-004 se referencian mutuamente. Si se mueven de `docs/adr/` → `docs/00-GOVERNANCE/`, las referencias relativas entre ellas se rompen.

### 2.7 Bloque Bajo: Storybook stories

`stories/getting-started/` referencia `docs/book/` — pero book/ NO se mueve, por lo que no hay impacto real.

---

## 3. Bloqueos Detectados

### 🔴 BLOQUEO CRÍTICO: NO mover `docs/llms.txt`
- **Motivo:** `docs/llms.txt` es un índice para LLMs que debe estar en `docs/` según la convención llms.txt. Moverlo rompería la URL pública `docs/llms.txt`.
- **Decisión:** ❌ Permanecer donde está.

### 🔴 BLOQUEO CRÍTICO: NO mover `docs/adr/` como directorio
- **Motivo:** Las ADRs tienen 25+ referencias cada una desde el CKB, auditorías, y otros documentos. Renombrar la ruta `docs/adr/` → `docs/00-GOVERNANCE/adr/` rompería todas las referencias a `docs/adr/ADR-NNN`.
- **Decisión:** ❌ Permanecer donde está, o mover solo con actualización masiva de referencias.

### 🟡 BLOQUEO MEDIO: NO mover `docs/recovery/` sin actualizar `docs/llms.txt`
- **Motivo:** 7 referencias en llms.txt (L78-L84).
- **Decisión:** ⚠️ Mover solo si se actualiza llms.txt simultáneamente.

### 🟡 BLOQUEO MEDIO: Scripts referenciados desde código
- `src/app/api/apply-migration/route.ts` importa `scripts/apply-migration.mjs`. Mover scripts rompería este import.
- **Decisión:** ⚠️ Verificar antes de mover.

### 🟢 SIN BLOQUEO: docs/analysis/, docs/audits/, docs/architecture/, docs/editorial/, docs/expedientes/, docs/observatorio/
- No hay referencias externas desde código fuente.
- Las referencias existen solo dentro de otros documentos de docs/analysis/ y docs/audits/, que se moverían juntos.
- **Decisión:** ✅ Movimiento seguro.

### 🟢 SIN BLOQUEO: docs/book/, docs/design/, docs/product/, docs/releases/
- Permanentemente estables en su ubicación actual.
- **Decisión:** ❌ No mover.

---

## 4. Tabla de Riesgos por Movimiento

| Riesgo | Condición | Acción requerida |
|---|---|---|
| **Seguro** | Sin referencias externas | Mover sin precauciones |
| **Riesgo Bajo** | 1-3 referencias en docs/ (actualizables) | Actualizar referencias después del movimiento |
| **Riesgo Medio** | 3-10 referencias o referencias en AGENTS.md / CKB | Planificar actualización coordinada |
| **⚠️ Alto** | 10+ referencias en múltiples archivos | Requiere plan de actualización detallado |
| **Movimiento Complejo** | >5 referencias que requieren cambio de ruta | Alternativa: no mover o actualizar todo |
| **🔴 Bloqueo** | Rompe funcionalidad del proyecto | No mover |

---

## 5. Propuesta Alternativa (si el riesgo supera al beneficio)

Si se determina que mover archivos físicos aporta poco valor frente al riesgo de referencias rotas, se propone:

### 5.1 Modelo basado en `docs/INDEX.md` + índices virtuales

```
docs/
├── INDEX.md              ← Punto de entrada único (NUEVO)
├── llms.txt              ← Punto de entrada para LLMs (existente)
├── CF-000-PROJECT-BRAIN.md  ← Permanecen DONDE ESTÁN
├── CF-001-SESSION-PROTOCOL.md
├── ...
├── 00-GOVERNANCE/        ← Solo índice virtual (links simbólicos NO)
├── 01-DOMAIN/
├── 04-INFRASTRUCTURE/
└── archive/
```

En lugar de mover archivos, se crea un `docs/INDEX.md` con la **clasificación temática** usando enlaces a las rutas actuales. Esto proporciona navegación sin riesgo de referencias rotas.

### 5.2 Beneficios del enfoque INDEX.md

| Aspecto | Reorganización física | Índice virtual |
|---|---|---|
| Riesgo de referencias rotas | **Alto** (31 rutas en llms.txt) | **Nulo** |
| Navegación mejorada | ✅ Sí | ✅ Sí (mejor) |
| Preserva histórico | ✅ Sí | ✅ Sí |
| Esfuerzo de implementación | **Alto** (actualizar 50+ referencias) | **Bajo** (crear 1 archivo) |
| Mantenimiento futuro | **Medio** (cada nuevo doc necesita ruta correcta) | **Bajo** (solo actualizar INDEX.md) |
| Compatibilidad con AGENTS.md | **Riesgo** (rutas hardcodeadas) | 100% compatible |

### 5.3 Estructura propuesta para INDEX.md

```markdown
# Certilab — Índice de Documentación del Proyecto

## Gobernanza y Constitución
- [CF-000 — Project Brain](CF-000-PROJECT-BRAIN.md)
- [CF-001 — Session Protocol](CF-001-SESSION-PROTOCOL.md)
- [CF-001A — Acta Cierre Arquitectura V1](CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md)
- [ADR-001 — Engineering System](adr/ADR-001-CERTILAB-ENGINEERING-SYSTEM.md)
- ...

## Dominio (Expediente, Inmueble, Documento IA)
- [CF-020 — Data Model](CF-020-DATA-MODEL.md)
- [CF-021 — Domain Model](CF-021-DOMAIN-MODEL.md)
- [CF-022 — Aggregate Boundaries](CF-022-AGGREGATE-BOUNDARIES.md)
- ...

## Infraestructura
- [CF-011 — Foundation](CF-011-FOUNDATION.md)
- [CF-021 — Supabase Architecture](CF-021-SUPABASE-ARCHITECTURE.md)
- ...

## Auditorías Cerradas
- [MASTER-CLEANUP-AUDIT](audits/MASTER-CLEANUP-AUDIT.md)
- [Ver todas](audits/)
```

---

## 6. Recomendación Final

**Recomendación: APROBAR PARCIALMENTE la reorganización.**

### Lo que SÍ recomiendo mover físicamente:

| Grupo | Destino | Riesgo | Beneficio |
|---|---|---|---|
| `docs/analysis/` → subdirectorios temáticos | `docs/10-ANALYSIS/{technical,prd,business-blueprint,go-to-market}/` | ✅ Bajo | Alta organización |
| `docs/audits/` → `docs/08-AUDITS/` | Sin subclasificar | ✅ Bajo (1 ref en llms.txt) | Media |
| `docs/architecture/` → `docs/07-SEO/` | Renombrar | ✅ Bajo (1 ref en START_HERE.md) | Media |
| `docs/editorial/`, `docs/expedientes/`, `docs/observatorio/` → `docs/archive/06-PUBLIC-SEO/` | ✅ Seguro | Baja (archivo) |
| scripts → subdirectorios | ✅ Bajo (*verificar api/route.ts*) | Alta |
| `docs/recovery/` → `docs/09-RECOVERY/` | ⚠️ Medio (7 refs en llms.txt) | Media |

### Lo que NO recomiendo mover físicamente:

| Grupo | Motivo | Alternativa |
|---|---|---|
| `docs/CF-*` (docs/ raíz) | **31 rutas en llms.txt** + 3 en AGENTS.md + 12 en CKB-INDEX.md | Índice virtual en INDEX.md |
| `docs/adr/` | **25+ referencias cada ADR** desde CKB | Permanecer en `docs/adr/` |
| `docs/book/`, `docs/design/` | Sin problema actual | Permanecer |
| `docs/product/`, `docs/releases/` | Sin problema actual | Permanecer |
| `docs/llms.txt` | Convención llms.txt + URL pública | Permanecer |
| `docs/CKB-INDEX.md`, `docs/CKB-GUIDE.md` | Autorreferencias cruzadas | Permanecer O mover con actualización |

### Resumen de la propuesta

```
docs/
├── llms.txt             ← PERMANECE
├── INDEX.md             ← NUEVO (índice virtual clasificado)
├── CF-*.md (25 docs)    ← PERMANECEN
├── CKB-INDEX.md         ← PERMANECE
├── CKB-GUIDE.md         ← PERMANECE
├── adr/                 ← PERMANECE
├── book/                ← PERMANECE
├── design/              ← PERMANECE
├── product/             ← PERMANECE
├── releases/            ← PERMANECE
├── ckb/                 ← PERMANECE
├── 07-SEO/              ← RENOMBRAR desde architecture/
├── 08-AUDITS/           ← MOVER desde audits/ (seguro)
├── 09-RECOVERY/         ← MOVER desde recovery/ (con precaución)
├── 10-ANALYSIS/         ← MOVER desde analysis/ (seguro)
├── archive/             ← NUEVO (contenido SEO, editorial, V2 docs)
│   ├── 01-V2-INITIATIVES/
│   ├── 02-DEPRECATED/
│   ├── 06-PUBLIC-SEO/
│   └── ...
└── scripts/             ← REORGANIZAR en db/, build/, seo/
```

**Impacto neto:**
- ~20 movimientos seguros o de bajo riesgo
- ~25 movimientos cancelados por riesgo alto (CF docs y ADRs)
- 1 archivo NUEVO (INDEX.md) que soluciona el problema de navegación sin riesgo
- **0 referencias rotas** si se ejecuta según lo recomendado