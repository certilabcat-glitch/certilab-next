# CERTILAB OS — DISCOVERY

> **Épica:** EP-000A  
> **Propósito:** Descubrir cómo debería organizarse Certilab OS para minimizar errores, evitar duplicidades, preservar el conocimiento y permitir escalar el proyecto durante V1, V2 y V3.  
> **Estado:** Descubrimiento completado — Pendiente de validación  
> **Fecha:** 2026-07-04  

---

## Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
   1.1 [Análisis del estándar llms.txt](#15-análisis-del-estándar-llmstxt)
2. [Estado Actual del Proyecto](#2-estado-actual-del-proyecto)
3. [Patrones Detectados](#3-patrones-detectados)
4. [Fortalezas](#4-fortalezas)
5. [Debilidades](#5-debilidades)
6. [Riesgos](#6-riesgos)
7. [Conocimiento Permanente](#7-conocimiento-permanente)
8. [Conocimiento Temporal](#8-conocimiento-temporal)
9. [Lagunas de Conocimiento](#9-lagunas-de-conocimiento)
10. [Unknown Unknowns](#10-unknown-unknowns)
11. [Recomendaciones](#11-recomendaciones)
12. [Preguntas que Deben Resolverse Antes de Diseñar Certilab OS](#12-preguntas-que-deben-resolverse-antes-de-diseñar-certilab-os)

---

## ⚠️ ACLARACIÓN: Corrigiendo la interpretación de "Certilab OS"

> **Esta sección reconoce un error de interpretación en la versión anterior del documento y lo corrige.**

### El error

En la primera versión de este Discovery, la "Reflexión Crítica" argumentaba que Certilab OS no debía construirse porque suponía una plataforma monolítica con UI, base de datos vectorial, orquestador multi-agente, hooks, MCP servers y pipelines de automatización.

**Esa interpretación era incorrecta.**

Nadie propuso construir esa plataforma. El concepto real de Certilab OS es:

> Una **convención ligera de organización del conocimiento del proyecto** formada exclusivamente por:
> - memoria (archivos de contexto para agentes)
> - reglas (documentos de gobernanza)
> - conocimiento (documentación técnica y de dominio)
> - índices (mapas de navegación del conocimiento)
> - documentación para agentes (llms.txt, manifiestos, playbooks)
>
> Sin automatizaciones obligatorias, sin plugins, sin MCP servers obligatorios, sin infraestructura nueva, sin complejidad innecesaria.

### Implicaciones de la corrección

| Lo que YO asumí incorrectamente | Lo que REALMENTE es |
|--------------------------------|---------------------|
| Una plataforma que requiere desarrollo | Una convención que solo requiere archivos markdown |
| Infraestructura nueva (vectores, MCP, orquestación) | Solo archivos de texto plano |
| Violaría MVP Discipline | Es compatible: no consume recursos de desarrollo del producto |
| Violaría No Overengineering | No: es la solución más simple posible al problema de organización |
| Deuda técnica potencial | Sin implementación técnica, no hay deuda |
| Diferir a V2+ | Se puede empezar en V1 sin coste |

### Conclusión de la aclaración

**Con la definición correcta —convención ligera de organización documental— Certilab OS SÍ debe diseñarse y adoptarse en V1**, porque:

1. **No requiere implementación técnica.** Solo archivos markdown.
2. **Resuelve problemas reales:** conocimiento fragmentado, contexto perdido, sin índice maestro.
3. **Es compatible con MVP Discipline:** no consume recursos de desarrollo del producto.
4. **Es compatible con No Overengineering:** es la solución más simple imaginable.
5. **Puede empezar con poco:** un índice, un CLAUDE.md, un manifiesto básico.
6. **Escala naturalmente:** más archivos markdown no es complejidad adicional.
7. **Es descartable:** si el proyecto pivota, solo se pierden archivos de documentación.

Las secciones siguientes reflejan **esta definición corregida**.

---

## 1. Resumen Ejecutivo

Certilab es un proyecto con una gobernanza excepcionalmente madura para su etapa de desarrollo. La documentación fundacional (CF-000, CF-001, AGENTS.md, CF-001A) establece reglas claras, jerarquías de decisión y flujos de trabajo obligatorios. Sin embargo, el sistema actual presenta **6 fragilidades estructurales** que una convención ligera de organización del conocimiento puede resolver:

| # | Fragilidad | Impacto | ¿Lo resuelve Certilab OS? |
|---|-----------|---------|---------------------------|
| 1 | **Sin continuidad entre sesiones.** Cada sesión empieza desde cero. | Conocimiento perdido | ✅ Con CLAUDE.md / memoria persistente |
| 2 | **Conocimiento fragmentado en ~40+ documentos** sin índice maestro ni consistencia cruzada. | Drift documental | ✅ Con índice maestro |
| 3 | **Sin CI/CD automatizado.** Tests, lint, typecheck y build son manuales. | Build roto | ❌ No (requiere automatización) |
| 4 | **Gobernanza no programática.** Depende de que el agente lea y cumpla documentos. | Reglas ignorables | ✅ Con manifiestos y playbooks |
| 5 | **Sin separación de entornos** (dev/staging/prod). | Riesgo de configuración | ❌ No (requiere DevOps) |
| 6 | **Cobertura de tests limitada** a unit tests puros. | Regresiones no detectadas | ❌ No (requiere testing) |

Certilab OS resuelve 3 de las 6 fragilidades. Las otras 3 son problemas de automatización y DevOps que están fuera de su alcance (pero pueden abordarse por separado).

### Decisión arquitectónica

**Certilab OS se adopta como convención ligera de organización documental desde V1.** No requiere implementación técnica, solo archivos markdown siguiendo una estructura acordada.

**No se construye ninguna plataforma.** No se escribe código de infraestructura. No se añaden dependencias al proyecto. No se viola MVP Discipline ni No Overengineering.

---

## 1.5 Análisis del estándar llms.txt

> El estándar `llms.txt` es un componente central de Certilab OS. Esta sección analiza su adopción.

### ¿Qué es llms.txt?

Es un estándar emergente propuesto por la comunidad (Answer.AI, llmstxt.org) que define un archivo `/llms.txt` en la raíz de cualquier sitio web. Este archivo proporciona un resumen estructurado del contenido del sitio en un formato que los LLMs pueden consumir fácilmente (markdown con enlaces).

El proyecto **ya tiene implementado**:
- `public/llms.txt` → Lista de servicios + artículos del blog + instrucciones de uso
- `public/llms-full.txt` → Contenido completo de todos los artículos para RAG
- `scripts/generate-llms.mjs` → Script que genera ambos desde `src/data/articles.ts` y archivos `.md`

### Ventajas

| Ventaja | Descripción | Impacto en Certilab |
|---------|-------------|---------------------|
| **Adopción inmediata** | Ya está implementado parcialmente en el proyecto | ✅ Sin coste de arranque |
| **Formato universal** | Markdown + links — cualquier LLM lo entiende | ✅ Sin bindings propietarios |
| **Sin infraestructura** | Archivo estático servido por Vercel/Next.js | ✅ Sin coste operativo |
| **Generación automatizable** | Script existente que se ejecuta en build | ✅ Mantenimiento mínimo |
| **Mejora el SEO para LLMs** | Los modelos recuperan contenido estructurado | ✅ Mejora discoverability |
| **Estandarización emergente** | Adoptado por Anthropic, OpenAI, Mistral | ✅ Compatibilidad futura |
| **Versión "full" para RAG** | `llms-full.txt` permite carga completa en contexto | ✅ Ideal para agentes |
| **Framework de extensión** | Se puede añadir: `llms-architecture.txt`, `llms-governance.txt`, etc. | ✅ Escalable |

### Inconvenientes

| Inconveniente | Descripción | Mitigación |
|--------------|-------------|------------|
| **Estándar inmaduro** | No es un estándar formal (2024-2026), puede evolucionar | Bajo riesgo: es markdown plano, fácil de migrar |
| **Límite de contexto** | `llms-full.txt` puede exceder el contexto de algunos LLMs | Ya segmentado: `llms.txt` (índice) + `llms-full.txt` (contenido) |
| **Mantenimiento manual parcial** | Si los artículos no tienen `.md`, solo muestra excerpt | Añadir generación automática desde CMS |
| **Sin control de versiones** | No hay historial de cambios del archivo generado | Incluir en commits (ya está en el repo) |
| **Posible duplicación con sitemap.xml** | Ambos listan URLs, pero con propósito diferente | Son complementarios: uno para LLMs, otro para crawlers |

### Coste de mantenimiento

| Aspecto | Coste actual | Proyección V1 |
|---------|-------------|---------------|
| Script de generación | ✅ Ya existe en `scripts/generate-llms.mjs` | Sin cambios |
| Ejecución manual | Ejecutar `node scripts/generate-llms.mjs` | ~2 segundos |
| Artículos nuevos | Se añaden a `articles.ts` y automáticamente al generar | ~0 |
| Documentación de proyecto (CF) | No está incluida actualmente en llms.txt | Añadir sección de arquitectura |
| Rotación de contenido | Artículos antiguos se mantienen en llms-full.txt | Sin límite práctico |

**Coste estimado total para V1:** ~0 horas de desarrollo. Solo añadir secciones de documentación del proyecto al llms.txt existente.

### Compatibilidad futura con agentes

| Escenario | Compatibilidad |
|-----------|----------------|
| **Claude (Cline)** | ✅ Ya lo usa el proyecto. Cline lee `public/llms.txt` para contexto |
| **ChatGPT (GPTs)** | ✅ GPTs pueden configurarse para leer `llms.txt` como knowledge base |
| **GitHub Copilot** | ⚠️ No soporta `llms.txt` directamente, pero el contenido en el repo es accesible |
| **Agentes personalizados** | ✅ Cualquier agente RAG puede ingerir `llms.txt` y `llms-full.txt` |
| **Futuros MCP servers** | ✅ El contenido estructurado es más fácil de exponer como recursos MCP |
| **Frameworks de agentes (LangChain, CrewAI)** | ✅ Herramientas de carga de documentos aceptan markdown plano |

### Impacto en la gobernanza

| Aspecto de gobernanza | Impacto |
|-----------------------|---------|
| **Jerarquía de decisión** | Sin impacto. `llms.txt` es documentación, no reglas |
| **Architecture Freeze** | Sin impacto. No modifica la arquitectura |
| **MVP Discipline** | ✅ Compatible. No consume recursos de producto |
| **No Overengineering** | ✅ Es la solución más simple posible |
| **Evidence First** | ✅ Puede estructurarse con referencias a evidencia |
| **Definition of Done** | ✅ Añadir: "llms.txt actualizado" como criterio opcional |
| **Epic Workflow** | ✅ Añadir paso de actualización de llms.txt en epics de contenido |

### ¿Debería adoptarse desde V1?

**Sí, con matices.**

| Decisión | Razón |
|----------|-------|
| **Adoptar `llms.txt` para contenido público (blog, servicios)** | ✅ Ya está implementado. Sin coste adicional. |
| **Extender `llms.txt` para incluir documentación del proyecto (CFs, arquitectura)** | ✅ Conveniente para agentes, bajo coste |
| **Adoptar `llms-full.txt` para RAG completo** | ✅ Ya implementado. Mantener. |
| **Crear `llms-architecture.txt` para agentes especializados** | ⚠️ Evaluar cuando Certilab OS tenga más estructura |
| **Hacer obligatoria su actualización en el DoD** | ❌ No en V1. Sería burocracia innecesaria. Dejarlo como buena práctica. |
| **Automatizar su generación en CI/CD** | ⏳ Para cuando exista CI/CD. Hoy ejecución manual basta. |

**Recomendación:** Incorporar `llms.txt` como parte de Certilab OS desde V1, pero sin rigidez: que sea un archivo vivo que se actualiza cuando hay cambios significativos, sin procesos formales de actualización obligatoria.


---

## 2. Estado Actual del Proyecto

### 2.1 Arquitectura

| Aspecto | Estado |
|---------|--------|
| Arquitectura base | DDD + Clean Architecture + Vertical Slice — **congelada** vía CF-001A |
| Bounded Contexts | Definidos: Core (Cliente, Inmueble, Expediente), PITR (Knowledge Engine, Question Tree, Inspection Manual) |
| Stack técnico | Next.js (versión cutting-edge con breaking changes) + Supabase (PostgreSQL, Auth, RLS, Storage) |
| Testing | Vitest — tests unitarios puros. Sin tests de integración, E2E, ni DB |
| Migraciones | SQL secuencial en `supabase/migrations/`. Aplicación manual via scripts |
| Despliegue | Vercel (Git-based auto-deploy). Sin pipeline CI/CD explícito |
| Estado actual | MVP en desarrollo activo. V1 roadmap en progreso. Sprint actual: dominio expedientes |

### 2.2 Documentación

| Categoría | Documentos | Estado |
|-----------|-----------|--------|
| Fundacional | CF-000, CF-001, AGENTS.md, CF-001A | ✅ Completos y estables |
| Arquitectura | CF-020, CF-021, CF-022, CF-025, CF-026 | ✅ Completos (congelados) |
| Producto | CF-030, CF-031, CF-032, CF-040, ROADMAP-V1 | ✅ Completos |
| Auditoría | AUDITORIA-CONSTITUCIONAL-DEFINITIVA, SPRINT-05-CIERRE, SESSION_REPORT, AUDITORIA-ESTRATEGICA-V2 | ✅ Realizadas |
| Estrategia | INVESTOR-DUE-DILIGENCE-V2, PROPUESTA-MODELO-MVP | ✅ Completos |
| Operativos | DEPLOY.md, START_HERE.md, README.md | ⚠️ Básicos |
| Editoral/Observatorio | Varios documentos en `docs/editorial/` y `docs/observatorio/` | ⚠️ Contenido externo |
| Recovery | Guías de recuperación en `docs/recovery/` | ⚠️ Histórico |

### 2.3 Scripts y Automación

| Script | Propósito | Estado |
|--------|-----------|--------|
| `scripts/apply-migration.mjs` | Aplicar migraciones SQL a Supabase | ✅ Funcional |
| `scripts/apply-expediente-migration.mjs` | Migración específica de expedientes | ✅ Funcional |
| `scripts/check-db.mjs` | Verificar estado de BD | ✅ Funcional |
| `scripts/check-remote-schema.mjs` | Verificar schema remoto | ✅ Funcional |
| `scripts/expose-core-schema.mjs` | Exponer schema core | ✅ Funcional |
| `scripts/verify-and-fix-schema.mjs` | Verificar y corregir schema | ✅ Funcional |
| Múltiples variantes no estandarizadas | Versiones v2, v3, sql-final, etc. | ⚠️ Fragmentación |

### 2.4 Gobernanza Actual

La gobernanza se implementa mediante:
1. **AGENTS.md** — 10 reglas absolutas que deben cumplirse en cada sesión
2. **CF-001** — Protocolo de inicio de sesión obligatorio (lectura de documentos, verificación de build)
3. **CF-001A** — Acta de cierre arquitectónico V1
4. **Definition of Done** — 10 criterios que deben cumplirse antes de commit
5. **Regla de precedencia** — Constitución > CF-001A > ADR > AGENTS.md > CF-XXX > Prompts

**Problema fundamental:** Toda esta gobernanza depende de que el agente lea y cumpla manualmente las reglas. No hay enforcements programáticos.

---

## 3. Patrones Detectados

### 3.1 Patrones Arquitectónicos

| Patrón | Descripción | Frecuencia | Documentos |
|--------|-------------|------------|------------|
| **Tres capas de conocimiento** | Capa canónica → Operacional → Efímera | Dominante | CF-030, CF-031, CF-032 |
| **State Machine / Decision Tree** | Árbol de nodos con branching condicional | Constante | CF-031, CF-032 |
| **Evidence-first design** | Toda decisión requiere evidencia con archivo, línea, impacto | Universal | AGENTS.md (regla 5), auditorías |
| **Aggregate Root pattern** | Cliente, Inmueble, Expediente como raíces de agregado | Universal | CF-020, CF-022, CF-025, CF-026 |
| **Soft Delete + Optimistic Locking** | `deleted_at`, `version` en todas las tablas | Universal | CF-020 |
| **RLS basada en auth.uid()** | Row Level Security por usuario autenticado | Universal | CF-021-SUPABASE-ARCHITECTURE |

### 3.2 Patrones de Documentación

| Patrón | Descripción | Ejemplos |
|--------|-------------|----------|
| **CF-XXX secuencial** | Numeración correlativa con sufijo semántico | CF-000 a CF-040 |
| **Propósito + Contexto + Reglas** | Estructura tripartita en todos los CF | Todos los CF |
| **Checklists obligatorios** | Listas de verificación en CF-001, AGENTS.md (DoD) | CF-001, AGENTS.md |
| **Cross-referencia manual** | Referencias a otros documentos CF | Frecuente pero sin verificación |
| **Sufijo VERSION** | V1.0, V1.1, V2, etc. en nombres de archivo | Auditorías, releases |
| **Idioma mixto** | Español dominante, inglés en técnico | General |

### 3.3 Patrones de Gobernanza

| Patrón | Descripción | Frecuencia |
|--------|-------------|------------|
| **Session Start Protocol** | CF-001 ejecutado obligatoriamente al inicio | Cada sesión |
| **Epic Workflow** | Diseño → Implementación → Tests → Build → Auditoría → Cierre → Commit → Tag | Cada épica |
| **Architecture Freeze** | No modificar decisiones cerradas sin ADR | Permanente |
| **No Reopen Closed Decisions** | Decisiones aprobadas no se debaten | Permanente |
| **Definition of Done** | 10 criterios antes de commit | Cada épica |

### 3.4 Patrones de Desarrollo

| Patrón | Descripción | Frecuencia |
|--------|-------------|------------|
| **Documentation-driven** | Documento CF antes de implementar | Cada feature |
| **Tests co-localizados** | `__tests__/` junto al fuente | Tests existentes |
| **Scripts ad-hoc** | Scripts Node.js para operaciones de BD | Frecuente |
| **Migraciones SQL secuenciales** | Fecha-numero_descripcion.sql | Cada cambio de schema |

### 3.5 Patrones Repetitivos (WHAT WE ALWAYS DO)

Basado en el análisis de sesiones, sprints y workflows:

1. **Leer CF-000 + AGENTS.md al inicio** — Cada sesión comienza leyendo los mismos documentos
2. **Ejecutar CF-001 manualmente** — Verificar build, leer docs, revisar estado
3. **Crear documentos CF-XXX** — Para cada nueva feature, crear un nuevo documento de diseño
4. **Escribir tests primero o después** — Tests unitarios para lógica de dominio
5. **Ejecutar build manual** — `npm run build` o `npx next build`
6. **Auditar cambios** — Revisar consistencia con Constitución y CF-001A
7. **Generar informe de cierre** — Documentar qué se hizo, qué falta, riesgos
8. **Commit + Tag** — Siguiendo el Epic Workflow
9. **Verificar contra Definition of Done** — Checklist manual de 10 puntos
10. **Aplicar migraciones SQL** — Usar scripts ad-hoc, verificar remote schema

---

## 4. Fortalezas

### 4.1 Gobernanza

- **Jerarquía de decisión clara.** La regla de precedencia (Constitución > CF-001A > ADR > AGENTS.md > CF-XXX > Prompts) elimina ambigüedades.
- **Arquitectura congelada y documentada.** CF-001A y ACTA CIERRE previenen discusiones interminables sobre decisiones ya tomadas.
- **Definition of Done exhaustivo.** 10 criterios que garantizan calidad antes de commit.
- **Evidence-first.** Toda recomendación debe incluir evidencia concreta, no opiniones.

### 4.2 Documentación

- **Documentación fundacional robusta.** CF-000 (Project Brain), CF-001 (Session Protocol) y AGENTS.md son excepcionalmente completos.
- **Auditorías regulares.** Se realizan auditorías constitucionales y de arquitectura que detectan desviaciones.
- **Cross-referencia entre documentos.** Los CF se referencian entre sí creando una red de conocimiento.

### 4.3 Arquitectura Técnica

- **DDD + Clean Architecture bien aplicados.** Separación clara de dominios, bounded contexts, aggregate roots.
- **Supabase bien integrado.** RLS, Auth, Storage usados correctamente.
- **TypeScript estricto.** Tipado fuerte en todo el código.

### 4.4 Proceso

- **Epic Workflow definido.** Flujo claro de diseño a commit.
- **Scripts de utilidad.** Varios scripts para operaciones comunes de BD.
- **Tests unitarios presentes.** Para lógica de dominio pura.

---

## 5. Debilidades

### 5.1 Continuidad y Memoria

- **Cada sesión empieza desde cero.** No hay persistencia de contexto entre sesiones. El agente pierde todo el conocimiento adquirido.
- **No hay memoria de decisiones anteriores.** Las ADRs existen pero no son consultables programáticamente.
- **El conocimiento se repite en prompts.** Instrucciones que deberían estar en documentos se incluyen en prompts de sesión.

### 5.2 Automatización y CI/CD

- **No hay CI/CD pipeline.** Tests, linting, type-checking y builds no están automatizados. Dependen de ejecución manual.
- **No hay pre-commit hooks.** No hay husky, lint-staged, ni validaciones automáticas pre-commit.
- **Scripts fragmentados.** Múltiples versiones de scripts similares (apply-migration, apply-sql-v2, apply-migration-v3, apply-sql-final, etc.) sin estandarización.
- **No hay tests automáticos en migraciones.** Las migraciones SQL se aplican sin verificación automática de consistencia.

### 5.3 Testing

- **Cobertura limitada a tests unitarios puros.** Sin tests de integración, E2E, tests de base de datos, ni tests de seguridad.
- **Sin test database.** Los tests no se ejecutan contra una base de datos real o containerizada.
- **Sin fixtures centralizados.** Datos de prueba inline en cada test.
- **Sin métricas de cobertura.** No se mide qué porcentaje del código está cubierto.

### 5.4 Gestión de Configuración y Entornos

- **Sin separación de entornos.** Desarrollo, staging y producción no están diferenciados más allá del deploy de Vercel.
- **Variables de entorno en `.env.local`.** Riesgo de exposición y falta de documentación de vars requeridas.
- **Sin Infrastructure as Code.** No hay Terraform, Pulumi ni CDK para gestionar recursos de Supabase.

### 5.5 Documentación

- **Sin índice maestro actualizado.** No hay un documento que liste todos los CF con su estado y relaciones.
- **Duplicación de contenido.** Algunos conceptos aparecen en múltiples documentos con redacciones diferentes.
- **Documentos huérfanos.** Algunos documentos no están referenciados desde ningún índice.
- **Nomenclatura inconsistente.** Mezcla de español e inglés, mayúsculas y minúsculas, versiones en nombre de archivo.

### 5.6 Seguridad

- **Sin auditoría de RLS automatizada.** Las políticas de RLS no se verifican automáticamente.
- **Sin análisis de dependencias.** No se usa Dependabot, Snyk ni similar para vulnerabilidades.
- **Sin secret scanning.** No hay detección de credenciales expuestas en el código.

---

## 6. Riesgos

### 6.1 Riesgos de Conocimiento (CRÍTICOS)

| Riesgo | Probabilidad | Impacto | Descripción |
|--------|-------------|---------|-------------|
| **Pérdida de contexto entre sesiones** | Alta | Crítico | Cada sesión de agente empieza sin memoria de la anterior. Decisiones, problemas y soluciones se pierden. |
| **Drift documental** | Alta | Alto | Documentos que se desactualizan sin que nadie lo note. CF-020 puede diferir de la BD real. |
| **Duplicidad de conocimiento** | Media | Alto | Misma regla escrita en dos documentos con redacción diferente, llevando a interpretaciones contradictorias. |
| **Silos de conocimiento** | Media | Alto | Conocimiento atrapado en prompts de sesión que nadie más ve. |
| **Dependencia de agente** | Alta | Alto | La calidad del trabajo depende de que el agente lea y cumpla correctamente documentos extensos. |

### 6.2 Riesgos de Proceso

| Riesgo | Probabilidad | Impacto | Descripción |
|--------|-------------|---------|-------------|
| **CF-001 no ejecutado** | Media | Crítico | Si se salta el protocolo, pueden escribirse cambios inconsistentes con la arquitectura. |
| **Build roto en main** | Media | Alto | Sin CI/CD, un commit puede romper el build y no detectarse hasta el próximo deploy. |
| **Migraciones inconsistentes** | Media | Alto | Aplicar migraciones fuera de orden o con conflictos. Scripts manuales propensos a error. |
| **DoD no verificado** | Media | Medio | Saltarse puntos del Definition of Done. |

### 6.3 Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Descripción |
|--------|-------------|---------|-------------|
| **Breaking changes de Next.js** | Alta | Alto | Next.js cutting-edge: APIs, convenciones y estructura de archivos pueden cambiar sin aviso. |
| **Regresión sin tests** | Alta | Alto | Sin tests de integración, cambios en un dominio pueden romper otro. |
| **RLS mal configurada** | Media | Crítico | Una política RLS incorrecta puede exponer datos de otros clientes (single-tenant pero con riesgo). |
| **Pérdida de datos en Supabase** | Baja | Crítico | Sin PITR configurado o backups automatizados (no verificado en documentación). |

### 6.4 Riesgos de Gobernanza

| Riesgo | Probabilidad | Impacto | Descripción |
|--------|-------------|---------|-------------|
| **Arquitectura freeze violada** | Baja | Crítico | Alguien (IA o humano) podría introducir cambios no autorizados en arquitectura congelada. |
| **ADR no registrada** | Media | Medio | Decisiones importantes tomadas sin documentar como ADR. |
| **Regla de precedencia ignorada** | Baja | Alto | Prompt de sesión anulando decisiones de la Constitución. |

### 6.5 Riesgos Regulatorios (Evolutivos)

| Riesgo | Probabilidad | Impacto | Descripción |
|--------|-------------|---------|-------------|
| **Cambio normativo energético** | Media | Alto | Nuevas regulaciones europeas, estatales o catalanas que requieran cambios en el modelo de datos. |
| **Ciberseguridad** | Media | Alto | Certificados energéticos como datos personales (LOPD/GDPR). Exposición de datos de clientes. |
| **Responsabilidad profesional** | Baja | Alto | Errores en el cálculo energético que deriven en certificados incorrectos. |

---

## 7. Conocimiento Permanente

Conocimiento que **nunca debería volver a escribirse en un prompt** porque es intrínseco al proyecto y debe vivir como memoria permanente.

### 7.1 Conocimiento del Proyecto (Vive en documentos CF)

| Conocimiento | Documento(s) | ¿Por qué es permanente? |
|--------------|-------------|------------------------|
| Visión, misión, valores del proyecto | CF-000 | Fundación del proyecto |
| Reglas de gobernanza | AGENTS.md | No cambian sin ADR |
| Protocolo de inicio de sesión | CF-001 | Obligatorio cada sesión |
| Arquitectura congelada | CF-001A | No cambia en V1 |
| Modelo de datos (tablas, relaciones) | CF-020 | Congelado en V1 |
| Modelo de dominio (aggregates, bounded contexts) | CF-021, CF-022 | Congelado en V1 |
| Diseño de Inmueble | CF-025 | Documento de diseño |
| Diseño de Expediente | CF-026 + CF-002 | Documentos de diseño |
| Business Policies | CF-040 | Reglas de negocio inmutables |
| Roadmap V1 | ROADMAP-V1 | Hoja de ruta |
| Criterios de calidad (DoD) | AGENTS.md (sección DoD) | No cambian sin ADR |
| Regla de precedencia | AGENTS.md | Jerarquía de decisión |

### 7.2 Conocimiento Técnico Permanente

| Conocimiento | Vive en | Propósito |
|--------------|---------|-----------|
| Stack tecnológico (Next.js + Supabase + Vitest) | CF-000, package.json | Stack conocido |
| Patrones DDD + Clean Architecture | CF-020, CF-021, CF-022 | Estilo arquitectónico |
| RLS basada en auth.uid() | CF-021-SUPABASE-ARCHITECTURE | Patrón de seguridad |
| Soft Delete + Optimistic Locking | CF-020, migraciones | Patrón de datos |
| Convenciones de nomenclatura | Múltiples docs | Estilo de código/docs |

### 7.3 Conocimiento de Energía y Certificación

| Conocimiento | Vive en | Propósito |
|--------------|---------|-----------|
| Variables CE3X | CF-030 | Formulario de certificación |
| Árbol de preguntas de inspección | CF-031 | Lógica de entrevista técnica |
| Manual de inspección técnica | CF-032 | Protocolos de inspección |
| Políticas de negocio | CF-040 | Reglas de cálculo y validación |

### 7.4 Clasificación por Propietario

¿Qué conocimiento pertenece a quién?

#### Pertenece al PROYECTO (vive en el repositorio, en documentos CF)

| Conocimiento | Formato | Responsable de mantenerlo |
|--------------|---------|--------------------------|
| Arquitectura congelada (CF-001A) | Markdown en repo | Arquitecto / IA |
| Modelo de datos (CF-020) | Markdown en repo | Arquitecto / IA |
| Modelo de dominio (CF-021, CF-022) | Markdown en repo | Arquitecto / IA |
| Diseño de agregados (CF-025, CF-026) | Markdown en repo | Arquitecto / IA |
| Políticas de negocio (CF-040) | Markdown en repo | Producto / IA |
| Roadmap (ROADMAP-V1) | Markdown en repo | Producto |
| Código fuente | TypeScript, SQL | IA + Humano |
| Migraciones de BD | SQL en `supabase/migrations/` | IA + Humano |
| Tests | TypeScript (Vitest) | IA |
| llms.txt / llms-full.txt | Markdown generado | IA (script automatizado) |

#### Pertenece al USUARIO (vive como preferencia personal, no en el repo)

| Conocimiento | Formato | ¿Por qué pertenece al usuario? |
|--------------|---------|-------------------------------|
| Configuración de la herramienta IA (cline_mcp_settings.json, mcp.json) | JSON local (AppData) | Especifica del usuario y su setup |
| Credenciales y tokens | .env.local (gitignored) | Secretos que no deben compartirse |
| Historial de sesiones anteriores (prompts, decisiones de session) | Sistema de archivos local | Contexto personal del desarrollador |
| Preferencias de workflow personal | Personal | Cómo cada usuario prefiere trabajar |
| Notas personales de investigación | Sistema de archivos local | Notas no oficiales del proyecto |

#### Pertenece a un AGENTE ESPECIALIZADO (debería vivir en documentación de agente)

| Conocimiento | Tipo de agente | Propósito |
|--------------|---------------|-----------|
| Reglas de gobernanza (AGENTS.md) | Agente de desarrollo | Cumplir reglas |
| Protocolo de inicio (CF-001) | Agente de desarrollo | Inicializar sesión |
| Definition of Done | Agente de desarrollo | Validar calidad |
| Árbol de preguntas de inspección (CF-031) | Agente técnico PITR | Realizar entrevista técnica |
| Manual de inspección (CF-032) | Agente técnico PITR | Conducir inspección |
| Conocimiento energético (artículos blog) | Agente de dominio | Responder preguntas del dominio |
| Políticas de negocio aplicables (CF-040) | Agente de dominio | Aplicar reglas de negocio |
| llms.txt / llms-full.txt | Cualquier agente externo | Conocer el proyecto/producto |

> **Nota:** Esta clasificación es una propuesta inicial. Debería validarse cuando se diseñe Certilab OS formalmente. La frontera entre "pertenece al proyecto" y "pertenece a un agente" es difusa: el conocimiento de los agentes también vive en el repo como documentación, pero se consume de forma diferente (prompts de sistema de agente vs. lectura de docs).

---

## 8. Conocimiento Temporal

Conocimiento que **debe existir solo durante una sesión** y no necesita persistencia permanente.

| Conocimiento | Vive en | Ciclo de vida |
|--------------|---------|---------------|
| Prompt de la sesión actual | Prompt de usuario | Una sesión |
| Contexto de trabajo actual | Memoria de la sesión | Una sesión |
| Errores de compilación actuales | Terminal / Output | Hasta que se corrijan |
| Problemas específicos de BD | Output de scripts | Hasta que se resuelvan |
| Discusiones de diseño en curso | Chat de la sesión | Una sesión |
| Tareas pendientes de la épica | Task_progress | Una épica |

**Problema actual:** No hay frontera clara entre conocimiento permanente y temporal. El conocimiento temporal a menudo:
1. Se repite en prompts de sesiones posteriores (perdiendo contexto)
2. Se pierde cuando debería promoverse a permanente (decisiones no documentadas como ADR)
3. Se mantiene cuando debería descartarse (notas obsoletas)

---

## 9. Lagunas de Conocimiento

Temas que requieren investigación oficial. NO investigados aún — solo identificados.

### 9.1 Legales / Normativos

| Laguna | Prioridad | Ámbito | Razón |
|--------|-----------|--------|-------|
| Regulación UE de certificación energética (EPBD recast) | Alta | Europeo | La EPBD (Energy Performance of Buildings Directive) recast de 2024 puede cambiar requisitos. |
| RD 390/2021 (España) y实际 aplicación | Alta | Estatal | Reglamento de certificación energética español. ¿Actualizado con última transposición? |
| Decretos catalanes de eficiencia energética | Alta | Cataluña | Cataluña tiene competencias y puede tener requisitos adicionales. |
| LOPD / GDPR aplicado a certificados energéticos | Alta | Europeo/Estatal | Datos personales del propietario, datos técnicos del inmueble. ¿El certificado es dato personal? |
| Responsabilidad civil del certificador | Media | Estatal | Marco legal de responsabilidad por errores en certificación. |
| ITE / IEE (Inspección Técnica de Edificios) | Media | Cataluña | Relación entre ITE y certificación energética. |

### 9.2 Técnicas / Arquitectura

| Laguna | Prioridad | Área | Razón |
|--------|-----------|------|-------|
| Automatización de migraciones SQL en CI/CD | Alta | DevOps | Actualmente manual. Necesario para escalar. |
| Integración de tests en pipeline | Alta | DevOps | Tests no se ejecutan automáticamente. |
| Estrategia de branching y releases | Alta | DevOps | No documentada. ¿Git Flow? ¿Trunk-based? |
| Containerización con Docker | Media | DevOps | ¿Necesaria para desarrollo local? |
| Mecanismos de backup y PITR en Supabase | Alta | Seguridad | No documentado. Crítico para producción. |
| Rate limiting y protección contra abusos | Media | Seguridad | No documentado. |
| Monitorización y alertas | Media | DevOps | No documentado. |

### 9.3 Producto / Dominio

| Laguna | Prioridad | Área | Razón |
|--------|-----------|------|-------|
| Validación de CE3X contra cálculo real | Alta | Energía | ¿Cómo validamos que los cálculos son correctos? |
| Flujo completo de expediente (solicitud → certificado) | Alta | Producto | No está completamente implementado ni documentado. |
| Integración con registros autonómicos | Media | Cataluña | ¿Es necesario registrar certificados en la Generalitat? |
| Modelo de pricing y suscripción | Media | Producto | No documentado. ¿SaaS? ¿Por certificado? |

### 9.4 IA / Agent Engineering

| Laguna | Prioridad | Área | Razón |
|--------|-----------|------|-------|
| Mecanismos de memoria persistente para agentes | Alta | IA | Fundamental para Certilab OS. Sin esto, no hay continuidad. |
| Estrategia de RAG (Retrieval Augmented Generation) | Alta | IA | ¿Cómo recuperar conocimiento relevante para cada tarea? |
| Validación automática de cumplimiento de reglas | Alta | IA | ¿Cómo verificar que el agente sigue CF-001, DoD, etc.? |
| Orquestación multi-agente | Media | IA | ¿Coordinación entre agentes especializados? |

---

## 10. Unknown Unknowns

Escenarios futuros que aún no se han contemplado pero que podrían afectar significativamente al proyecto.

### 10.1 Escenarios Técnicos Futuros

1. **Next.js cambia su modelo de renderizado.** Si Next.js depreca el App Router actual o cambia fundamentalmente su modelo de datos, habría que reevaluar la arquitectura frontend.
2. **Supabase introduce breaking changes.** Supabase está en evolución activa. Cambios en RLS, Auth, o la API de cliente podrían requerir migraciones forzosas.
3. **Crecimiento de datos no lineal.** Si el producto escala más rápido de lo previsto, el modelo single-tenant con RLS por auth.uid() podría tener problemas de rendimiento.
4. **Necesidad de offline-first.** Los inspectores técnicos podrían necesitar trabajar sin conexión. Esto requeriría un cambio arquitectónico significativo (PWA, sincronización, etc.).
5. **Dependencia de servicios externos de cálculo energético.** Si el motor de cálculo CE3X requiere integración con APIs externas (HULC, CYPETHERM, etc.), la arquitectura de integración cambiaría.

### 10.2 Escenarios de Producto Futuros

6. **Expansión a otros países.** Si el producto escala a otros países de la UE, cada uno tiene su propia regulación, variables de certificación y procesos. El modelo de datos tendría que ser multi-regulación.
7. **Agregación de datos multi-cliente.** Si certificadores independientes quieren compartir datos anonimizados para benchmarking, chocaría con el modelo single-tenant actual.
8. **Mercado B2B2C.** Si plataformas inmobiliarias (Fotocasa, Idealista) quieren integrar certificados, cambiaría el modelo de distribución y la API pública.

### 10.3 Escenarios Regulatorios Futuros

9. **Nueva directiva UE de eficiencia energética.** La EPBD en revisión podría introducir nuevos requisitos (pasaporte de renovación, indicadores de inteligencia del edificio, etc.) que requerirían nuevas entidades en el modelo de datos.
10. **Obligatoriedad de firma electrónica cualificada.** Si los certificados electrónicos requieren firma digital con sello de tiempo, habría que integrar con proveedores de PKI.
11. **Cambios fiscales en subvenciones.** Si el gobierno introduce deducciones fiscales vinculadas a certificados energéticos, el proceso de certificación podría tener implicaciones fiscales.

### 10.4 Escenarios Organizativos Futuros

12. **Crecimiento del equipo.** Si el proyecto pasa de un solo desarrollador a un equipo, los procesos actuales (un solo agente, prompts manuales, sin CI/CD) no escalarán.
13. **Auditoría externa.** Si una tercera parte audita el código o la seguridad, necesitaríamos trazabilidad completa de decisiones y cambios.
14. **Salida a producción real.** Pasar de MVP a producción real con clientes de pago introduce requisitos de SLA, soporte, facturación, etc.

---

## 11. Recomendaciones

Recomendaciones de alto nivel (sin diseño concreto de Certilab OS todavía).

### 11.1 Prioridad Crítica (Resolver Antes de Diseñar Certilab OS)

| # | Recomendación | Problema que resuelve | Dependencia |
|---|---------------|----------------------|-------------|
| R1 | **Definir modelo de memoria persistente para agentes.** ¿Cómo recordará un agente el trabajo de sesiones anteriores? | Pérdida de contexto entre sesiones | Investigación de mecanismos RAG/vector store |
| R2 | **Categorizar todo el conocimiento existente como permanente, temporal o automatizable.** | No hay frontera clara entre tipos de conocimiento | Auditoría completa de documentos |
| R3 | **Definir el alcance exacto de Certilab OS.** ¿Es solo para desarrollo? ¿Para producto? ¿Para operaciones? | Sin límites claros, el diseño será difuso | Las preguntas de la sección 12 |

### 11.2 Prioridad Alta (Primeras Iteraciones de Certilab OS)

| # | Recomendación | Problema que resuelve |
|---|---------------|----------------------|
| R4 | **Automatizar CF-001 como script de init.** El protocolo de inicio de sesión debe ejecutarse con un solo comando. | Dependencia de lectura manual de documentos |
| R5 | **Implementar CI/CD básico (GitHub Actions).** Tests + lint + typecheck + build en cada push a main. | Build roto no detectado, tests no ejecutados |
| R6 | **Crear índice maestro de documentación.** Un documento que liste todos los CF con estado, dependencias y relaciones. | Drift documental, documentos huérfanos |
| R7 | **Estandarizar scripts de migración.** Un solo script con parámetros en lugar de múltiples versiones. | Fragmentación de scripts |

### 11.3 Prioridad Media (Iteraciones Posteriores)

| # | Recomendación | Problema que resuelve |
|---|---------------|----------------------|
| R8 | **Implementar validación automática del Definition of Done.** Un script que verifique los 10 criterios antes de permitir commit. | DoD no verificado |
| R9 | **Separar entornos (dev/staging/prod) con IaC.** Terraform o Pulumi para gestionar recursos de Supabase. | Riesgo de configuración |
| R10 | **Implementar tests de integración con test database.** Containerizar PostgreSQL para tests de repositorios. | Cobertura de tests insuficiente |
| R11 | **Establecer pre-commit hooks (husky + lint-staged).** Lint, format y typecheck automáticos antes de cada commit. | Calidad de código inconsistente |

### 11.4 Prioridad Baja (V2+ o Según Necesidad)

| # | Recomendación | Problema que resuelve |
|---|---------------|----------------------|
| R12 | **Implementar análisis de vulnerabilidades (Dependabot/Snyk).** | Dependencias con vulnerabilidades conocidas |
| R13 | **Documentar estrategia de branching y releases.** | Sin proceso claro de releases |
| R14 | **Investigación regulatoria oficial.** Contratar asesoría legal especializada en certificación energética. | Lagunas legales |

---

## 12. Preguntas que Deben Resolverse Antes de Diseñar Certilab OS

Estas preguntas deben responderse **antes** de proponer una arquitectura concreta para Certilab OS.

### 12.1 Preguntas de Alcance

| # | Pregunta | Implicación |
|---|----------|-------------|
| Q1 | **¿Certilab OS es solo para agentes de IA o también para desarrolladores humanos?** | Determina si la UI es necesaria, el nivel de automatización, y los formatos de salida. |
| Q2 | **¿Certilab OS debe funcionar offline o siempre necesita conexión?** | Determina la arquitectura de almacenamiento y sincronización. |
| Q3 | **¿Certilab OS es específico de este proyecto o debe ser genericizable?** | Determina el nivel de abstracción y reutilización. |
| Q4 | **¿Quién mantendrá Certilab OS? ¿El mismo equipo de desarrollo?** | Determina la complejidad aceptable y la deuda técnica permitida. |
| Q5 | **¿Certilab OS debe ser compatible con múltiples herramientas de IA (Claude, ChatGPT, Copilot) o es para un solo agente?** | Determina los formatos de entrada/salida y protocolos de comunicación. |

### 12.2 Preguntas de Arquitectura

| # | Pregunta | Implicación |
|---|----------|-------------|
| Q6 | **¿Dónde vive la memoria persistente?** ¿En el sistema de archivos? ¿En una base de datos vectorial? ¿En Supabase? | Determina la infraestructura necesaria. |
| Q7 | **¿Cómo se estructura la memoria?** ¿Por épica? ¿Por dominio? ¿Por sesión? ¿Por fecha? | Determina el esquema de organización. |
| Q8 | **¿Los agentes deben poder escribir documentos o solo leerlos?** | Determina el modelo de permisos y control de cambios. |
| Q9 | **¿Cómo se manejan los conflictos cuando dos agentes (o un agente y un humano) modifican el mismo conocimiento?** | Determina el modelo de concurrencia y merge. |

### 12.3 Preguntas de Gobernanza

| # | Pregunta | Implicación |
|---|----------|-------------|
| Q10 | **¿Certilab OS debe hacer cumplir las reglas de gobernanza o solo recordarlas?** | Determina si hay enforcement programático o solo asistencia. |
| Q11 | **¿Cómo se audita que Certilab OS está funcionando correctamente?** | Determina los mecanismos de logging y verificación. |
| Q12 | **¿Quién tiene autoridad para modificar la configuración de Certilab OS?** | Determina el modelo de administración. |
| Q13 | **¿Las ADRs deben registrarse automáticamente o manualmente?** | Determina el flujo de captura de decisiones. |

### 12.4 Preguntas de Automatización

| # | Pregunta | Implicación |
|---|----------|-------------|
| Q14 | **¿Qué nivel de automatización es realista para V1?** | Determina el MVP de Certilab OS. |
| Q15 | **¿La generación de documentos CF debe ser asistida por IA o completamente manual?** | Determina el rol del agente en la creación de conocimiento. |
| Q16 | **¿Las auditorías pueden automatizarse parcialmente?** | Determina el alcance del módulo de auditoría. |

### 12.5 Preguntas de Evolución

| # | Pregunta | Implicación |
|---|----------|-------------|
| Q17 | **¿Cómo evolucionará Certilab OS entre V1, V2 y V3?** | Determina la arquitectura base y los puntos de extensión. |
| Q18 | **¿Qué partes de Certilab OS deben ser estables (congeladas) y cuáles pueden evolucionar?** | Similar al modelo de arquitectura freeze del proyecto. |
| Q19 | **¿Certilab OS debe versionarse junto con el proyecto o independientemente?** | Determina el modelo de releases y changelog. |

---

## Anexo A: Documentos Analizados

### Fundacionales
- `AGENTS.md` — Gobernanza del proyecto
- `docs/CF-000-PROJECT-BRAIN.md` — Constitución del proyecto
- `docs/CF-001-SESSION-PROTOCOL.md` — Protocolo de sesión
- `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` — Acta de cierre arquitectónico

### Arquitectura y Diseño
- `docs/CF-020-DATA-MODEL.md` — Modelo de datos
- `docs/CF-021-DOMAIN-MODEL.md` — Modelo de dominio
- `docs/CF-021-SUPABASE-ARCHITECTURE.md` — Arquitectura Supabase
- `docs/CF-022-AGGREGATE-BOUNDARIES.md` — Límites de agregados
- `docs/CF-022-IMPLEMENTATION-BACKLOG.md` — Backlog de implementación
- `docs/CF-025-INMUEBLE-DESIGN.md` — Diseño de Inmueble
- `docs/CF-026-EXPEDIENTE-DESIGN.md` — Diseño de Expediente

### Producto y Conocimiento
- `docs/CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md` — Motor de conocimiento PITR
- `docs/CF-031-PITR-QUESTION-TREE.md` — Árbol de preguntas PITR
- `docs/CF-032-ARQUITECTO-TECNICO-INSPECTION-MANUAL.md` — Manual de inspección
- `docs/CF-040-BUSINESS-POLICIES.md` — Políticas de negocio
- `docs/ROADMAP-V1.md` — Roadmap V1
- `docs/PROPUESTA-MODELO-MVP.md` — Propuesta MVP

### Estrategia y Auditoría
- `docs/AUDITORIA-ESTRATEGICA-V2.md` — Auditoría estratégica V2
- `docs/INVESTOR-DUE-DILIGENCE-V2.md` — Due diligence inversores
- `docs/audits/AUDITORIA-CONSTITUCIONAL-DEFINITIVA.md` — Auditoría constitucional
- `docs/audits/SPRINT-05-CIERRE-DOMINIO-V1.md` — Cierre sprint 05
- `docs/audits/SESSION_REPORT.md` — Reporte de sesión

### Operativos y Técnicos
- `README.md` — Readme del proyecto
- `START_HERE.md` — Guía de inicio
- `DEPLOY.md` — Guía de despliegue
- `package.json` — Dependencias y scripts
- `next.config.ts` — Configuración Next.js
- `vitest.config.ts` — Configuración Vitest
- `eslint.config.mjs` — Configuración ESLint
- `tsconfig.json` — Configuración TypeScript
- `vercel.json` — Configuración Vercel

### Configuración de IA
- `public/llms.txt` — Instructivo LLM público
- `public/llms-full.txt` — Instructivo LLM completo

### Scripts
- Todos los scripts en `scripts/` (15+ archivos)

### Migraciones
- Todas las migraciones en `supabase/migrations/` (5+ archivos)

### Código Fuente
- `src/middleware.ts`
- `src/lib/supabase/` (client, server, middleware)
- `src/lib/core/` (cliente.repository, inmueble.repository, inmueble.service)
- `src/lib/core/__tests__/` (cliente.repository.test, inmueble.repository.test, inmueble.service.test)
- `src/types/` (core/cliente, core/inmueble, expediente-mvp)
- `src/app/` (rutas y páginas principales)

---

## Anexo B: Metodología de Análisis

Este descubrimiento se realizó mediante:

1. **Lectura directa** de documentos fundacionales y de arquitectura.
2. **Subagentes especializados** (5 en paralelo) analizando desde perspectivas de:
   - Arquitectura Software y DDD
   - DevOps y Seguridad
   - IA / Agent Engineering y Gobernanza
   - Producto y Testing
   - Documentación y Legal/Normativo
3. **Síntesis cruzada** de los hallazgos de los 5 subagentes.
4. **Clasificación** de patrones, riesgos, conocimiento y lagunas.
5. **Identificación de preguntas abiertas** que deben resolverse antes del diseño.

**Herramientas:** Cline (agente principal) + 5 subagentes especializados.
**Total documentos analizados:** 40+ archivos entre documentación, código, scripts y configuraciones.

---

> **Fin del documento de descubrimiento.**  
> Pendiente de validación por el usuario.  
> No crear archivos adicionales, no modificar documentos existentes, no realizar commits.