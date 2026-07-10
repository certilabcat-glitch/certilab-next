# CKB-001 — Propuesta Simplificada V1 (Product First)

> **Estado:** Propuesta de diseño revisada (no implementada)
> **Fecha:** 09/07/2026
> **Versión:** 1.0.0-draft
> **Basada en:** CKB-001-ARCHITECTURAL-REPORT.md (aprobado en dirección general)
> **Motivo de la revisión:** Aplicar Product First, reducir complejidad inicial, evitar indexación masiva desde el día 1.

---

## ÍNDICE

1. [Principio rector: CKB incremental](#1-principio-rector-ckb-incremental)
2. [¿Qué problema resolvemos en V1?](#2-qué-problema-resolvemos-en-v1)
3. [Conjunto mínimo de documentos para V1](#3-conjunto-mínimo-de-documentos-para-v1)
4. [Familias esenciales vs. diferibles](#4-familias-esenciales-vs-diferibles)
5. [Artefactos de V1](#5-artefactos-de-v1)
6. [Hoja de ruta de evolución: V1 → V2 → V3](#6-hoja-de-ruta-de-evolución-v1--v2--v3)
7. [Impacto en gobernanza existente](#7-impacto-en-gobernanza-existente)
8. [Resumen: lo que NO hacemos en V1](#8-resumen-lo-que-no-hacemos-en-v1)

---

## 1. PRINCIPIO RECTOR: CKB INCREMENTAL

El CKB no se construye como un sistema cerrado desde el día 1. Se construye como un **índice vivo** que empieza pequeño y crece por demanda: solo se indexa un documento cuando este es necesario para el desarrollo activo.

### Regla de incorporación para V1

> Un documento ingresa al CKB cuando **un agente o desarrollador necesita referenciarlo durante una sesión de desarrollo activa** y no lo encuentra en menos de 1 minuto.

Esto garantiza que:

- No se dedica tiempo a indexar documentos históricos que nadie consulta.
- El CKB refleja el conocimiento activo, no el archivo muerto.
- El mantenimiento del índice es proporcional al trabajo real del proyecto.
- El coste de entrada es bajo: 15-20 documentos iniciales en lugar de 120.

### Cuándo NO se indexa un documento en V1

- Cuando su contenido es histórico (auditorías cerradas, épicas completadas, informes de épicas anteriores).
- Cuando su contenido está duplicado (explícitamente o por solapamiento con otro documento ya indexado).
- Cuando su contenido es efímero o exploratorio (análisis no validados, propuestas descartadas).
- Cuando su contenido es autorreferencial o de proceso interno (sesiones, handovers).

**Excepción:** Una auditoría que se referencia activamente durante el desarrollo (por ejemplo, porque define criterios que siguen vigentes) SÍ se indexa.

---

## 2. ¿QUÉ PROBLEMA RESOLVEMOS EN V1?

### Problema real (no teórico)

Actualmente, al iniciar una sesión, CF-001 ordena leer ~20 documentos de gobernanza y arquitectura. El agente debe:

1. Saber qué documentos existen.
2. Saber dónde están.
3. Saber cuáles son los vigentes.
4. Saber cómo se relacionan entre sí.

Sin un índice central, cada sesión comienza con una exploración manual del árbol `docs/`. Esto es lento, propenso a errores (saltarse un documento) y no escala.

### Solución V1 (mínima viable)

Un **índice maestro** (`CKB-INDEX.md`) que contenga **únicamente los documentos activos** que un agente necesita en una sesión típica. Este índice se consulta al inicio de cada sesión (CF-001) y permite localizar cualquier documento en segundos.

Además, el índice resuelve el problema de **qué documento prevalece** cuando hay solapamiento (ej: CF-020 define el modelo de datos, CF-021 el modelo de dominio — ¿cuál es la fuente de verdad para una consulta concreta?).

### Lo que NO se resuelve en V1

| Problema | Se resuelve en |
|----------|---------------|
| Validación automática de referencias cruzadas | V2 (script) |
| Verificación de integridad del índice vs sistema de archivos | V2 (script) |
| Cobertura documental del 100% de `docs/` | V3 (nunca si no es necesario) |
| Tooling de CI/CD para el CKB | V2 |
| Taxonomía completa de etiquetas | V2 |

---

## 3. CONJUNTO MÍNIMO DE DOCUMENTOS PARA V1

### 3.1 Documentos que entran en V1

Se indexan **exclusivamente** los documentos que se referencian activamente durante el desarrollo o que son requeridos por CF-001/AGENTS.md.

**Total estimado: 17 documentos.**

| # | CKB-ID | Documento actual | Familia | Por qué entra en V1 |
|---|--------|-----------------|---------|---------------------|
| 1 | GOV-000 | `AGENTS.md` | GOV | Es la constitución operativa. Referenciado en CF-001 y en cada sesión. |
| 2 | GOV-001 | `docs/CF-000-PROJECT-BRAIN.md` | GOV | Constitución del proyecto. AUTOLOAD de AGENTS.md. |
| 3 | GOV-002 | `docs/CF-001-SESSION-PROTOCOL.md` | GOV | Protocolo obligatorio de cada sesión. AUTOLOAD. |
| 4 | GOV-003 | `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` | GOV | Congela la arquitectura V1. AUTOLOAD. |
| 5 | GOV-004 | `docs/CF-003-AI-EXECUTION-POLICY.md` | GOV | Política de ejecución de IA. Requerida por AGENTS.md §12. |
| 6 | GOV-005 | `docs/CF-004-BLOCKING-MANAGEMENT-POLICY.md` | GOV | Política de gestión de bloqueos. |
| 7 | ARCH-001 | `docs/CF-020-DATA-MODEL.md` | ARCH | Modelo de datos. Fuente de verdad semántica. |
| 8 | ARCH-002 | `docs/CF-021-DOMAIN-MODEL.md` | ARCH | Modelo de dominio. Fuente de verdad de agregados y bounded contexts. |
| 9 | ARCH-003 | `docs/CF-022-AGGREGATE-BOUNDARIES.md` | ARCH | Límites de agregados. Esencial para auditorías. |
| 10 | ARCH-004 | `docs/CF-040-BUSINESS-POLICIES.md` | ARCH | Políticas de negocio. Gobernado por CF-001A. |
| 11 | ARCH-005 | `docs/CF-050-MVP-FREEZE.md` | ARCH | Ámbito del MVP. Referenciado en cada decisión de scope. |
| 12 | DOM-001 | `docs/CF-025-INMUEBLE-DESIGN.md` | DOM | Diseño del agregado Inmueble. Núcleo del dominio. |
| 13 | DOM-002 | `docs/CF-026-EXPEDIENTE-DESIGN.md` | DOM | Diseño del agregado Expediente. Núcleo del dominio. |
| 14 | DOM-003 | `docs/CF-028-EXPEDIENTE-WORKFLOW.md` | DOM | Workflow del expediente. Esencial para desarrollo de UI. |
| 15 | ADR-001 | `docs/adr/ADR-001-CERTILAB-ENGINEERING-SYSTEM.md` | ADR | Decisión fundacional del sistema. |
| 16 | ADR-002 | `docs/adr/ADR-002-AUTO-ENTREGA-MVP.md` | ADR | Decisión sobre auto-entrega MVP. |
| 17 | ROAD-001 | `docs/ROADMAP-V1.md` | ROAD | Roadmap V1. Planificación activa. |

### 3.2 Documentos adicionales opcionales (entran si se referencian activamente)

| # | CKB-ID | Documento | Familia | Cuándo entra |
|---|--------|-----------|---------|-------------|
| 18 | ADR-003 | `docs/adr/ADR-003-GTD-LINEA-DE-NEGOCIO.md` | ADR | Si la sesión actual trabaja GTD. |
| 19 | ADR-004 | `docs/adr/ADR-004-EXTENSION-DOCUMENTO-IA-GTD.md` | ADR | Idem. |
| 20 | ARCH-006 | `docs/CF-021-SUPABASE-ARCHITECTURE.md` | ARCH | Si la sesión toca arquitectura de base de datos. |
| 21 | DOM-004 | `docs/CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md` | DOM | Si la sesión toca el motor PITR. |
| 22 | DOM-005 | `docs/CF-031-PITR-QUESTION-TREE.md` | DOM | Idem. |
| 23 | DOM-006 | `docs/CF-032-ARQUITECTO-TECNICO-INSPECTION-MANUAL.md` | DOM | Idem. |

Estos documentos se añaden al índice cuando un agente los necesite, no antes.

### 3.3 Documentos que NO entran en V1 (con justificación)

| Grupo | Ejemplos | Justificación |
|-------|----------|---------------|
| **Auditorías cerradas** | RC-001-FINAL-AUDIT.md, CORE-V1-STABILIZATION-FINAL.md, EP-030-CLOSURE-REPORT.md | Histórico. Su función (verificar cumplimiento en su momento) ya se completó. Volverán a ser relevantes si una auditoría futura necesita trazabilidad. |
| **Análisis exploratorios** | EP-031-PITR-V1-ANALYSIS.md, PRD-001-CANDIDATE-EVALUATION.md, MARKET-RESEARCH-ATI03-VALIDATION.md | Análisis previo a implementación. Una vez implementados, el conocimiento se absorbe en los documentos de diseño o ADRs. |
| **Business Blueprint** | BP-100-01-*, BP-100-02-*, BP-100-03-*, BP-100-04-* | Estrategia de negocio. Importante pero no necesario en sesiones de desarrollo. Se indexa cuando una épica requiere consultarlo. |
| **Go-to-Market** | GTM-001-* (8 documentos) | Estrategia de mercado. Relevante para épicas de producto, no para desarrollo técnico. |
| **Documentación de producto** | PA-001-*, PRODUCT-PERSONAS.md, PRODUCT-VISION.md | Producto. Esencial para decisiones de producto, no para sesiones de codificación. |
| **Diseño (Design System)** | Volume-01 a Volume-07, DESIGN-SYSTEM-ARCHITECTURE.md | Diseño. Indexado por Storybook. Se indexa en CKB cuando se requiera trazar decisiones de diseño. |
| **Sesiones y handovers** | SESSION_REPORT.md, SESSION-HANDOVER-PRD001.md | Efímero. Solo importa para la sesión siguiente. |
| **Informes de cierre menores** | DS-02B-*, DS-03-CLOSURE-REPORT.md, E26-T01-CLOSURE-REPORT.md | Cierres de tareas específicas. El conocimiento relevante ya está en los documentos de diseño correspondientes. |
| **Propuestas no validadas** | PROPUESTA-MODELO-MVP.md, CERTILAB-OS-DISCOVERY.md | Exploración. Si se convierten en decisión, se formalizan como ADR o documento de diseño y entonces se indexan. |
| **Análisis de viabilidad** | CF-005-FEASIBILITY-REPORT.md, CF-005-AGENTS-MAP.md | Análisis de capacidad. Relevante solo si se reactiva la épica correspondiente. |
| **Auditorías estratégicas** | AUDITORIA-ESTRATEGICA-V2.md, INVESTOR-DUE-DILIGENCE-V2.md | Auditorías externas. No relacionadas con el desarrollo activo. |
| **Editorial/Copywriting** | docs/editorial/*, docs/book/ (volúmenes editoriales) | Contenido de producto, no de desarrollo. |

---

## 4. FAMILIAS ESENCIALES VS. DIFERIBLES

### 4.1 Familias que entran en V1 (5 familias)

| Familia | Prefijo | Docs en V1 | Justificación Product First |
|---------|---------|-----------|----------------------------|
| **GOV** — Gobernanza | GOV- | 6 docs | Obligatorio por CF-001. Sin estos documentos no puede iniciarse ninguna sesión de desarrollo. |
| **ARCH** — Arquitectura | ARCH- | 5 docs | Obligatorio por AGENTS.md §10.2 (auditoría arquitectónica). Sin estos no pueden tomarse decisiones técnicas fundadas. |
| **DOM** — Dominio | DOM- | 6 docs (3 fijos + 3 condicionales) | Son los diseños de los agregados que se están implementando. Son el núcleo del flujo de referencia del dominio (AGENTS.md §9.2). |
| **ADR** — Decisiones | ADR- | 2 docs (hasta 4) | Las ADRs activas definen el marco de decisión actual. Sin ellas no se puede determinar por qué se tomaron ciertas decisiones. |
| **ROAD** — Roadmap | ROAD- | 1 doc | Define hacia dónde va el proyecto. Esencial para priorizar. |

**Total V1: ~17 documentos.**

### 4.2 Familias diferidas a V2 (próxima ampliación)

| Familia | Prefijo | Docs aprox. | Condición de entrada |
|---------|---------|------------|---------------------|
| **PROD** — Producto | PA- | ~8 docs | Cuando una épica requiera validar criterios de producto o consultar el catálogo. |
| **STRAT** — Estrategia | BP-, GTM- | ~14 docs | Cuando una épica de negocio requiera consultar el blueprint o el GTM. |
| **DES** — Diseño | DS-, Volume- | ~9 docs | Cuando una épica de UI requiera consultar el design system o el UX bible. |
| **PITR** (incluido en DOM condicional) | CF-030/031/032 | 3 docs | Cuando se trabaje activamente en el motor PITR. Ya están contemplados como condicionales en V1 (§3.2). |

### 4.3 Familias diferidas a V3 (completitud)

| Familia | Prefijo | Docs aprox. | Condición de entrada |
|---------|---------|------------|---------------------|
| **AUD** — Auditorías históricas | AUD- | ~25 docs | Solo si una auditoría futura necesita trazabilidad. Se indexan bajo demanda. |
| **EP** — Épicas cerradas | EP- | ~15 docs | Solo si un análisis futuro referencia una épica anterior. |
| **SESS** — Sesiones | SESS- | ~5 docs | No se prevé su indexación. Las sesiones son efímeras. |
| **ED** — Editorial | Volume- | ~5 docs | Cuando se requiera consultar decisiones editoriales. |
| **OBS** — Observatorio | OBS- | (a definir) | Cuando se active la épica del observatorio. |

### 4.4 Principio de entrada

> Una familia entra al CKB cuando, sin ella, una sesión de desarrollo no puede completar su objetivo o corre el riesgo de tomar una decisión inconsistente.

**En V1, solo GOV, ARCH, DOM, ADR y ROAD cumplen este criterio.**

---

## 5. ARTEFACTOS DE V1

### 5.1 Lo que se crea en V1 (exactamente 3 archivos)

```
docs/
├── CKB-INDEX.md    ← Índice maestro con los ~17 documentos activos
├── CKB-GUIDE.md    ← Guía breve de 1 página
```

```
docs/ckb/
└── CKB-EVOLUTION.md ← Este documento (propuesta simplificada)
```

### 5.2 Estructura del CKB-INDEX.md V1

El índice V1 es una tabla Markdown con 6 columnas:

```markdown
# CKB-INDEX.md — Índice Maestro del Conocimiento Activo

> **Versión:** 1.0.0 | **Última actualización:** 09/07/2026
> **Documentos indexados:** 17 de ~120 totales en docs/
> **Familias activas:** GOV (6) · ARCH (5) · DOM (3+3) · ADR (2) · ROAD (1)

| CKB-ID | Título | Ruta | Estado | Versión | Relaciones |
|--------|--------|------|--------|---------|------------|
| GOV-000 | AGENTS.md | `AGENTS.md` | Approved | 1.0.0 | — |
| GOV-001 | CF-000 Project Brain | `docs/CF-000-PROJECT-BRAIN.md` | Approved | 1.0.0 | — |
| ... | ... | ... | ... | ... | ... |
```

Sin frontmatter en los documentos fuente (en V1 no se modifican documentos existentes para añadir metadatos).

Sin taxonomía de etiquetas.

Sin secciones de relaciones complejas (solo una columna de relaciones libres).

### 5.3 Estructura del CKB-GUIDE.md V1

Una página, 5 secciones:

1. **¿Qué es el CKB?** — 3 líneas.
2. **¿Cómo uso el CKB?** — Consulta CKB-INDEX.md al inicio de cada sesión (CF-001). Si no encuentras un documento, búscalo en `docs/` y luego añádelo al índice.
3. **¿Cómo añado un documento al CKB?** — Asigna CKB-ID secuencial, añade fila a la tabla, actualiza la versión del índice.
4. **Regla de oro:** Solo indexa un documento si lo necesitas para la sesión actual. No indexes "por si acaso".
5. **¿Qué NO está en el CKB?** — Remite a la lista de familias diferidas.

### 5.4 Lo que NO se crea en V1 (pero estaba en la propuesta original)

| Artefacto | Motivo de exclusión |
|-----------|---------------------|
| `docs/ckb/CKB-ARCHITECTURE.md` | No necesario. La arquitectura del CKB se define en este análisis y en CKB-GUIDE.md. |
| `docs/ckb/CKB-CHANGELOG.md` | No necesario en V1. Los cambios se trackean con Git. |
| `docs/ckb/CKB-TAXONOMY.md` | Sobredimensionado. Sin taxonomía hasta que haya >30 documentos indexados. |
| Frontmatter en documentos fuente | No se modifican documentos existentes. Los metadatos viven solo en CKB-INDEX.md. |

### 5.5 Modificaciones a documentos existentes

Para que el CKB sea operativo, se requieren **4 cambios mínimos** en documentos existentes:

1. **`AGENTS.md`** — Añadir `docs/CKB-INDEX.md` a AUTOLOAD (§7) y `□ CKB-INDEX.md consultado` a SESSION STATUS (§6).
2. **`docs/CF-001-SESSION-PROTOCOL.md`** — Añadir en el paso 4 (Lectura de documentación): "Consultar CKB-INDEX.md para localizar documentos activos."
3. **`START_HERE.md`** — Añadir CKB-INDEX.md a la lista de documentos iniciales.
4. **`docs/CF-000-PROJECT-BRAIN.md`** — Actualizar sección 6.9 para reflejar el CKB como repositorio interno (no solo público).

---

## 6. HOJA DE RUTA DE EVOLUCIÓN: V1 → V2 → V3

### 6.1 V1: Fundación (MVP del CKB) — Se implementa ahora

```
Objetivo:    Índice de conocimiento activo (17 docs, 5 familias)
Artefactos:  3 archivos (CKB-INDEX.md, CKB-GUIDE.md, CKB-EVOLUTION.md)
Cambios:     4 modificaciones mínimas a documentos existentes
Coste:       ~2 horas (vs. ~5 horas de la propuesta original)
Valor:       Un agente encuentra cualquier documento activo en <30 segundos
```

**Criterio de salida de V1:** Al menos 3 sesiones consecutivas usando CKB-INDEX.md sin necesidad de modificar el índice.

### 6.2 V2: Crecimiento controlado (post-MVP, tras épicas activas)

```
Objetivo:    Ampliar el índice a familias PROD, STRAT, DES (+ ~30 docs)
Artefactos:  
  - Ampliar CKB-INDEX.md con nuevas familias
  - (Opcional) Script scripts/validate-ckb.mjs
  - (Opcional) Integración CI para validar el índice
Entrada:    Cuando una épica requiera consultar documentos de producto o estrategia
Coste:      ~2-4 horas
Valor:      Cobertura del ~60% de docs/ con mantenimiento automatizado
```

**Condición de inicio de V2:** Se ha completado el MVP o se inicia una épica que requiere consultar documentos de PROD/STRAT/DES.

### 6.3 V3: Madurez (post-MVP, mantenimiento continuo)

```
Objetivo:    Indexación completa bajo demanda
Artefactos:
  - CKB-INDEX.md completo (todos los docs que se hayan necesitado)
  - Scripts de validación y generación automática
  - Posible migración a YAML/JSON si el Markdown es insuficiente
Entrada:    Cuando el número de documentos indexados supere 50
Coste:      Bajo (incremental)
Valor:      Cobertura completa bajo demanda
```

**Condición de inicio de V3:** >50 documentos indexados o se detectan problemas de mantenimiento del índice manual.

### 6.4 Lo que nunca se hace (a menos que haya una razón explícita)

| Actividad | Motivo |
|-----------|--------|
| Indexar todos los documentos de `docs/` independientemente de su uso | No aporta valor. Un documento que nadie consulta no necesita estar en el índice. |
| Reorganizar físicamente `docs/` | Rompe URLs, referencias y enlaces existentes. El CKB es una capa de índice, no un reorg. |
| Migrar a una herramienta externa (Notion, Confluence) | Rompe la fuente de verdad única (Git) y no es accesible para agentes de IA. |
| Añadir frontmatter YAML a todos los documentos existentes | Sobrecarga de trabajo sin beneficio proporcional. Los metadatos viven en el índice. |
| Validación automática del CKB desde el día 1 | El coste de implementar tooling supera el beneficio cuando hay 17 documentos. Se difiere a V2. |

---

## 7. IMPACTO EN GOBERNANZA EXISTENTE

### 7.1 Cumplimiento con AGENTS.md

| Regla de AGENTS.md | Impacto del CKB V1 |
|--------------------|-------------------|
| **RULE PRECEDENCE (§3)** | Sin impacto. AGENTS.md, CF-000, CF-001A y ADRs conservan su precedencia. El CKB es un índice, no una fuente de autoridad. |
| **MVP DISCIPLINE (§8)** | Sin impacto. El CKB no introduce CQRS, Event Sourcing ni ninguna iniciativa prohibida. |
| **AUTOLOAD (§7)** | Se añade CKB-INDEX.md a la lista de documentos a cargar automáticamente. |
| **SESSION STATUS (§6)** | Se añade checklist item: □ CKB-INDEX.md consultado. |
| **NO OVERENGINEERING (§11)** | El CKB V1 cumple: es la solución de menor complejidad (Markdown + tabla) que satisface el requisito. |
| **PRODUCT-FIRST (§9)** | El CKB V1 prioriza el conocimiento necesario para el desarrollo activo sobre el conocimiento histórico o secundario. Cumple el principio rector (§9.7). |

### 7.2 Cumplimiento con CF-001

El paso 4 de CF-001 (Lectura de documentación) se modifica para incluir:

```
4. Leer documentación:
   - AGENTS.md (gobernanza)
   - CF-000 (constitución)
   - CF-001A (acta de cierre arquitectura V1)
   - CKB-INDEX.md (índice de conocimiento activo) ← NUEVO
   - ADR-001, ADR-002 (decisiones aprobadas)
```

---

## 8. RESUMEN: LO QUE NO HACEMOS EN V1

A modo de contraste con la propuesta original, esto es lo que **no** forma parte de la implementación V1:

| Aspecto | Propuesta original | Propuesta simplificada V1 |
|---------|-------------------|--------------------------|
| Documentos indexados | ~120 (todos) | ~17 (solo activos) |
| Familias | 14 | 5 (GOV, ARCH, DOM, ADR, ROAD) |
| Frontmatter en documentos fuente | Sí | No |
| Taxonomía de etiquetas | Sí | No |
| CKB-CHANGELOG.md | Sí | No |
| CKB-ARCHITECTURE.md | Sí | No (se usa CKB-EVOLUTION.md + CKB-GUIDE.md) |
| Script de validación | Sí (V2) | No (se difiere a V2) |
| CI/CD para CKB | Sí (V2) | No |
| Renombrado de documentos | Sí | No |
| Tiempo estimado de implementación | ~5 horas | ~2 horas |

El CKB V1 es pequeño, útil desde el día 1, y no intenta resolver problemas que todavía no existen.

---

> **Fin de la propuesta simplificada.**
>
> Pendiente de aprobación para iniciar la implementación (creación de CKB-INDEX.md, CKB-GUIDE.md y modificaciones a AGENTS.md, CF-001, START_HERE.md, CF-000).