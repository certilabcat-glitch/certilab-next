# CKB-001 — INFORME ARQUITECTÓNICO: REPOSITORIO OFICIAL DE CONOCIMIENTO

> **Estado:** Análisis y propuesta de diseño (no implementado)
> **Versión:** 2.0-draft
> **Fecha:** 09/07/2026
> **Basado en:** Análisis de gobernanza vigente, estructura documental actual y principios DDD/Clean Architecture/Product First

---

## ÍNDICE

1. [Objetivo y responsabilidad del CKB](#1-objetivo-y-responsabilidad-del-ckb)
2. [Qué información pertenece al CKB y cuál no](#2-qué-información-pertenece-al-ckb-y-cuál-no)
3. [Estructura recomendada](#3-estructura-recomendada)
4. [Relación con otros sistemas documentales](#4-relación-con-otros-sistemas-documentales)
5. [Criterios de versionado y mantenimiento](#5-criterios-de-versionado-y-mantenimiento)
6. [Flujo de incorporación de nuevo conocimiento](#6-flujo-de-incorporación-de-nuevo-conocimiento)
7. [Riesgos de duplicidad documental y mitigación](#7-riesgos-de-duplicidad-documental-y-mitigación)
8. [Recomendación final de arquitectura](#8-recomendación-final-de-arquitectura)
9. [Anexo: Mapeo completo de la documentación existente](#9-anexo-mapeo-completo-de-la-documentación-existente)

---

## 1. OBJETIVO Y RESPONSABILIDAD DEL CKB

### 1.1 Objetivo fundamental

> Que cualquier agente (IA o humano) que inicie una sesión en Certilab pueda localizar **el documento que necesita en menos de 30 segundos**, sin necesidad de explorar manualmente el árbol `docs/`, sin incertidumbre sobre qué versión está vigente y sin riesgo de basarse en documentos obsoletos o descartados.

### 1.2 Responsabilidad del CKB

El CKB tiene una responsabilidad única y delimitada: **ser el índice que hace descubrible el conocimiento activo del proyecto**. No es:

- **Un sistema documental nuevo.** No almacena, no transforma, no versiona documentos fuente.
- **Un repositorio de código.** El código se gobierna por su propia estructura.
- **Un motor de búsqueda.** No indexa contenido interno de los documentos, solo los referencia.
- **Una herramienta de productividad.** No mide tiempos, no genera métricas, no automatiza flujos.
- **Un archivo histórico.** No conserva conocimiento obsoleto ni decisiones descartadas.

### 1.3 Principio de diseño fundamental

> El CKB no añade una nueva capa de gestión documental. **Elimina la fricción de descubrimiento** sobre la documentación ya existente.

### 1.4 Criterio de éxito

El CKB tiene éxito si:
- **Acelera cada sesión:** un agente encuentra lo que necesita sin explorar el árbol de directorios.
- **Previene el error de omisión:** un agente no se salta documentos relevantes porque no sabía que existían.
- **Resuelve ambigüedades:** ante dos documentos con solapamiento aparente, el índice y su columna de relaciones indican cuál prevalece.
- **No añade mantenimiento perceptible:** actualizar el índice debe tomar menos de 2 minutos por sesión.

---

## 2. QUÉ INFORMACIÓN PERTENECE AL CKB Y CUÁL NO

### 2.1 Conocimiento activo (SÍ se indexa)

Pertenece al CKB todo documento que constituya **conocimiento activo del proyecto**, es decir, que cumpla TODAS estas condiciones:

1. **Es necesario para el desarrollo presente.** Un agente lo necesita consultar durante una épica activa.
2. **Es una fuente de verdad vigente.** No ha sido reemplazado, deprecado ni superado por otro documento.
3. **Es conocimiento permanente.** No es un análisis exploratorio, una propuesta descartada ni un informe de proceso interno.
4. **No es código fuente.** El código se gobierna por su propia estructura de tipos, carpetas y repositorios.

**Categorías que entran:**

| Categoría | Ejemplos | Criterio de entrada |
|-----------|----------|---------------------|
| Gobernanza | AGENTS.md, CF-000, CF-001, CF-001A, CF-003, CF-004 | Definen reglas de operación del proyecto. Son obligatorios por CF-001 y AGENTS.md §7 (AUTOLOAD). |
| Arquitectura | CF-020, CF-021, CF-022, CF-040, CF-050 | Documentan decisiones arquitectónicas congeladas o políticas vigentes. |
| Diseño de dominio | CF-025, CF-026, CF-028, CF-030, CF-032 | Describen agregados, servicios o workflows en producción o desarrollo activo. |
| ADRs aprobadas | ADR-001, ADR-002, ADR-003, ADR-004 | Decisiones arquitectónicas adoptadas. Solo en estado Approved. |
| Roadmap vigente | ROADMAP-V1, CF-050 | Definen la dirección actual del proyecto. |
| Documentación de producto (V1 condicional) | PA-001, PA-001-CATALOG | Solo si una épica activa requiere validar criterios de producto. Inicialmente no entra. |

### 2.2 Conocimiento inactivo (NO se indexa)

**Nunca se indexan:**

| No indexable | Motivo | Alternativa |
|--------------|--------|-------------|
| Análisis exploratorios no validados | No son fuente de verdad. Son investigación preliminar. | Permanecen en `docs/analysis/` pero fuera del CKB. |
| Propuestas descartadas | No representan conocimiento activo. | Se eliminan o archivan en `docs/archive/`. |
| Informes de proceso interno | Sesiones, handovers, reportes de sesión. | No son conocimiento del proyecto, son registro de trabajo. |
| Código fuente | Se gobierna por su propia estructura. | `src/` no se indexa. |
| Documentación de diseño visual (V1) | Design System, Brand Book, UX. | Entra en V2 cuando una épica de UI lo requiera. |
| Auditorías cerradas | Salvo que contengan criterios arquitectónicos aún vigentes. | Por defecto no se indexan. Pueden indexarse por excepción. |
| Releases y changelogs | Son históricos. La versión actual se conoce por Git. | No se indexan. |
| Documentación SEO/marketing | No es conocimiento técnico del proyecto. | No se indexa. |

### 2.3 Excepción para auditorías

Una auditoría SÍ se indexa si:
- Define criterios arquitectónicos que **siguen vigentes** (ej: auditoría constitucional que validó el core V1).
- Es referenciada activamente durante el desarrollo de una épica en curso.
- Su contenido no está duplicado en otro documento fuente ya indexado.

**Regla de decisión:** Si un agente necesita citar una auditoría como fuente de autoridad durante el desarrollo, se indexa. Si la auditoría es un informe de cierre sin impacto en decisiones futuras, no se indexa.

---

## 3. ESTRUCTURA RECOMENDADA

### 3.1 Topología V1 (MVP del CKB)

```
docs/
├── CKB-INDEX.md         ← Único artefacto obligatorio
├── CKB-GUIDE.md          ← Guía breve de uso (1 página, recomendada)
docs/ckb/
└── CKB-EVOLUTION.md      ← Hoja de ruta del CKB (opcional en V1)
```

### 3.2 CKB-INDEX.md — Índice maestro

**Único artefacto obligatorio.** Contiene una tabla única con la siguiente estructura:

| Campo | Descripción | Obligatorio | Ejemplo |
|-------|-------------|-------------|---------|
| **CKB-ID** | Identificador único dentro de su familia | Sí | `GOV-002` |
| **Título** | Nombre del documento | Sí | `CF-001 Session Protocol` |
| **Ruta** | Path relativo desde la raíz del proyecto | Sí | `docs/CF-001-SESSION-PROTOCOL.md` |
| **Estado** | Vigente \| Superseded \| Draft | Sí | `Vigente` |
| **Familia** | GOV \| ARCH \| DOM \| ADR \| ROAD \| PROD | Sí | `GOV` |
| **Descripción** | Una línea de qué contiene (máx. 100 caracteres) | Sí | `Protocolo obligatorio de inicio de sesión` |
| **Referencias** | CKB-IDs de documentos relacionados | Opcional | `referenced-by: GOV-000, GOV-001` |

**Formato:** Tabla Markdown plana, sin frontmatter YAML, sin versionado semántico.

**Reglas del índice:**
- No se añade versión del documento ni del índice. Git es el versionado.
- No se incluyen resúmenes ni abstracts del contenido.
- No se añaden etiquetas (tags) hasta superar los 30 documentos indexados (se difiere a V2).
- No se reorganizan físicamente los archivos fuente en `docs/`.
- No se modifica ningún documento fuente para añadirle metadatos del CKB.

### 3.3 CKB-GUIDE.md — Guía de uso (recomendada)

Procedimiento breve (una página, máximo 30 líneas) para:

1. **Consultar el índice:** Leer `CKB-INDEX.md` al inicio de cada sesión.
2. **Añadir un documento:** Verificar que no existe duplicado → asignar CKB-ID secuencial → insertar fila → commit.
3. **Actualizar el estado:** De Vigente a Superseded cuando un documento es reemplazado.
4. **Resolver conflictos de solapamiento:** Aplicar RULE PRECEDENCE de AGENTS.md.
5. **Saber qué NO indexar:** Reglas de exclusión de la sección 2.2.

### 3.4 CKB-EVOLUTION.md — Evolución del CKB (opcional)

Documento de hoja de ruta del propio CKB para planificar:
- **V1:** Índice maestro + guía. ~15-20 documentos.
- **V2:** Script de validación de integridad, taxonomía de etiquetas, CI básico para verificar que las rutas existen.
- **V3:** Tooling avanzado (verificación de cobertura, detección de duplicados automática).

No es necesario en V1, pero se recomienda crearlo para evitar que el CKB quede sin hoja de ruta de evolución.

### 3.5 Taxonomía de familias CKB-ID

| Familia | Prefijo | Descripción | ¿Qué documentos cubre? |
|---------|---------|-------------|----------------------|
| **GOV** | GOV-NNN | Gobernanza | AGENTS.md, CF-000, CF-001, CF-001A, CF-003, CF-004 |
| **ARCH** | ARCH-NNN | Arquitectura | CF-020, CF-021, CF-022, CF-040, CF-050 |
| **DOM** | DOM-NNN | Diseño de dominio | CF-025, CF-026, CF-028, CF-030, CF-031, CF-032 |
| **ADR** | ADR-NNN | Architecture Decision Records | docs/adr/ADR-*.md (solo Approved) |
| **ROAD** | ROAD-NNN | Roadmap | ROADMAP-V1, CF-050 |
| **PROD** | PROD-NNN | Producto (V2) | PA-001, PA-001-CATALOG (futuro) |

**Numeración:** Secuencial dentro de cada familia. Ej: GOV-000, GOV-001, GOV-002... No se reutilizan números de documentos deprecados.

---

## 4. RELACIÓN CON OTROS SISTEMAS DOCUMENTALES

### 4.1 Mapa de relaciones

| Sistema | Relación con el CKB | Fuente de verdad | ¿Se indexa en V1? |
|---------|---------------------|------------------|-------------------|
| **AGENTS.md** | El CKB se referencia en AGENTS.md mediante la sección AUTOLOAD. El CKB **no modifica** AGENTS.md. El CKB indexa AGENTS.md como GOV-000. | `AGENTS.md` | Sí |
| **ADRs** | Las ADRs aprobadas se indexan con prefijo ADR-NNN. Las ADRs en Draft/Review no se indexan. | `docs/adr/ADR-NNN.md` | Sí (solo Approved) |
| **Auditorías** | No se indexan por defecto. Excepción: si contienen criterios arquitectónicos aún vigentes. | `docs/audits/` | No (por defecto) |
| **Documentación de producto** | No se indexa en V1. Entra en V2 cuando la primera épica requiera validar criterios de producto. | `docs/product/` | No (V2) |
| **Documentación técnica (CF-*)** | Se indexa mediante las familias GOV, ARCH y DOM. Es el grueso del CKB V1. | `docs/CF-*.md` | Sí |
| **Documentación de diseño** | Design System, Brand Book, UX Bible. No se indexa en V1. Entra cuando una épica de UI activa lo requiera. | `docs/book/`, `docs/design/` | No (V2) |
| **Análisis exploratorios** | No se indexan. Son documentos de trabajo previos a la decisión de diseño. | `docs/analysis/` | No |
| **Código fuente** | El CKB **no indexa código**. Las decisiones de código se reflejan en ADRs y documentación técnica. | `src/` | No |
| **Storybook** | No se indexa. Es tooling de desarrollo, no documentación del proyecto. | `stories/` | No |
| **llms.txt** | No se indexa. Es un artefacto de IA externo, no documentación del proyecto. | `docs/llms.txt`, `public/llms.txt` | No |

### 4.2 Principio de una única fuente de verdad

Cada tipo de conocimiento tiene exactamente **un** lugar de origen. El CKB solo **referencia** esas fuentes. No las duplica, no las modifica, no las sustituye.

| Conocimiento | Fuente de verdad única |
|--------------|------------------------|
| Gobernanza | `AGENTS.md` + `docs/CF-*.md` (familia GOV) |
| Arquitectura | `docs/CF-0*.md` (familias ARCH y DOM) |
| Decisiones arquitectónicas | `docs/adr/ADR-*.md` |
| Código | `src/` |
| Producto | `docs/product/` |
| Diseño visual | `docs/book/` + `docs/design/` |
| Datos de negocio | `supabase/migrations/` + esquema de base de datos |

### 4.3 Jerarquía de precedencia

Cuando dos documentos indexados en el CKB entren en conflicto, se aplica la **RULE PRECEDENCE** de AGENTS.md:

1. Constitución (CF-000)
2. CF-001A — Acta de Cierre de Arquitectura V1
3. ADRs aprobadas
4. AGENTS.md
5. Documentos CF-XXX
6. Prompts de sesión

El CKB refleja esta jerarquía en la columna "Referencias" y en la guía de uso, pero **no la impone**. La precedencia se resuelve en el momento de la consulta.

---

## 5. CRITERIOS DE VERSIONADO Y MANTENIMIENTO

### 5.1 Versionado

**No existe versionado semántico en el índice.** El CKB-INDEX.md no lleva número de versión incrustado. Git es el mecanismo exclusivo de versionado y trazabilidad:

- Cada modificación del índice queda registrada en el historial de Git.
- El commit message debe seguir el formato: `CKB: (add|update|deprecate|remove) FAMILIA-NNN — Título del documento`
- Ejemplos:
  - `CKB: add GOV-006 CF-011 Foundation`
  - `CKB: mark ADR-001 as Superseded (replaced by ADR-005)`
  - `CKB: remove DOM-004 (aggregate deprecated in ADR-006)`

**No se requiere changelog adicional.** El log de Git es el changelog.

### 5.2 Mantenimiento periódico

| Actividad | Frecuencia | Responsable | Descripción |
|-----------|------------|-------------|-------------|
| Verificación de rutas | Al inicio de cada sesión (CF-001) | Agente activo | Verificar que las rutas en el índice siguen existiendo con `test -f` o `ls` |
| Actualización de estados | Al aprobar/deprecar un documento | Agente que realiza el cambio | Marcar como Superseded si hay ADR que lo reemplaza |
| Alta de nuevos documentos | Cuando se crea un documento que cumple los criterios de entrada | Agente que lo crea | Asignar CKB-ID, añadir fila, commit |
| Revisión de cobertura | Al cierre de cada épica | Agente de cierre | Verificar si hay nuevo conocimiento activo que deba indexarse |

### 5.3 Health check del índice

El CKB está sano si:

- **Todas las rutas en el índice existen.** No hay referencias rotas.
- **No hay documentos fuente eliminados que sigan en el índice.** Si un documento se elimina, se elimina del índice.
- **Todos los documentos indexados están en estado Vigente o Superseded.** No hay documentos en Draft en el índice.
- **No hay duplicados.** Un mismo concepto no aparece en dos documentos indexados sin que las relaciones lo resuelvan.

### 5.4 Política de deprecación

- **Nunca se elimina una fila del índice** como sustitución de marcarla como Superseded.
- La trazabilidad es importante: un documento Superseded permite entender por qué se tomó una decisión y qué la reemplazó.
- Solo se elimina una fila si el documento físico se elimina del repositorio (limpieza real, no deprecación).
- Cuando se depreca un documento, se actualiza su columna "Estado" a `Superseded` y se añade una referencia al documento que lo reemplaza.

---

## 6. FLUJO DE INCORPORACIÓN DE NUEVO CONOCIMIENTO

### 6.1 Regla de entrada

> Un documento ingresa al CKB cuando constituye **conocimiento activo del proyecto**, es decir, cuando es necesario para el desarrollo presente y no está ya accesible desde el índice.

**Criterio operativo:** Si un agente necesita referenciar un documento durante una sesión de desarrollo activa y no lo encuentra en el índice en menos de 30 segundos, el documento debe indexarse.

### 6.2 Procedimiento de incorporación

```
1. VERIFICACIÓN
   └── ¿El documento existe físicamente en el repositorio?
   └── ¿Ya está indexado en el CKB? (buscar por título o ruta)
   └── ¿Cumple los criterios de entrada? (conocimiento activo §2.1)
   └── ¿No está duplicado? (verificar solapamiento con documentos ya indexados)

2. ASIGNACIÓN DE CKB-ID
   └── Identificar la familia: GOV | ARCH | DOM | ADR | ROAD
   └── Asignar el siguiente número secuencial disponible en esa familia
   └── Ej: si ARCH tiene hasta ARCH-005, el siguiente es ARCH-006

3. INSERCIÓN EN EL ÍNDICE
   └── Añadir fila en CKB-INDEX.md con todos los campos:
        - CKB-ID
        - Título (nombre del documento, sin extensión)
        - Ruta (path relativo desde raíz del proyecto)
        - Estado (Vigente por defecto)
        - Familia
        - Descripción (máx. 100 caracteres)
        - Referencias (si aplica)

4. COMMIT
   └── Formato: "CKB: add FAMILIA-NNN — Título del documento"
```

### 6.3 Tabla de criterios por familia

| Familia | Es conocimiento activo si... | No es conocimiento activo si... |
|---------|-----------------------------|--------------------------------|
| GOV | El documento define reglas de gobernanza vigentes | El documento ha sido reemplazado por otro GOV |
| ARCH | El diseño que describe está en producción o desarrollo activo | El diseño fue descartado o reemplazado por ADR |
| DOM | El agregado que describe está en producción o desarrollo activo | El agregado fue deprecado o reemplazado |
| ADR | La ADR está en estado Approved | La ADR está en Draft, Review o Superseded |
| ROAD | El roadmap es el vigente (última versión aprobada) | El roadmap ha sido reemplazado |
| PROD | Una épica activa requiere validar criterios de producto | No hay épica activa de producto |

### 6.4 Integración con CF-001 (SESSION PROTOCOL)

El CKB-INDEX.md debe incorporarse al protocolo CF-001 como paso de **consulta obligatoria al inicio de cada sesión**:

1. Leer AGENTS.md (AUTOLOAD)
2. Leer CF-000 (AUTOLOAD)
3. Leer CF-001A (AUTOLOAD)
4. Leer CF-001 (AUTOLOAD)
5. **Consultar CKB-INDEX.md** para identificar documentos adicionales relevantes para la épica en curso
6. Leer los documentos identificados

Esta integración es la que **cierra el ciclo**: el CKB no es un artefacto opcional, sino el paso que permite a un agente saber qué más necesita leer sin explorar manualmente `docs/`.

### 6.5 Conjunto mínimo para V1

**17 documentos** que entran en V1 por ser conocimiento activo necesario para el desarrollo:

| CKB-ID | Documento | Familia | Por qué entra |
|--------|-----------|---------|---------------|
| GOV-000 | `AGENTS.md` | GOV | Constitución operativa. Referenciado en CF-001 y cada sesión. |
| GOV-001 | `docs/CF-000-PROJECT-BRAIN.md` | GOV | Constitución del proyecto. AUTOLOAD de AGENTS.md. |
| GOV-002 | `docs/CF-001-SESSION-PROTOCOL.md` | GOV | Protocolo obligatorio de cada sesión. AUTOLOAD. |
| GOV-003 | `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` | GOV | Congela la arquitectura V1. AUTOLOAD. |
| GOV-004 | `docs/CF-003-AI-EXECUTION-POLICY.md` | GOV | Política de ejecución de IA. Requerida por AGENTS.md §12. |
| GOV-005 | `docs/CF-004-BLOCKING-MANAGEMENT-POLICY.md` | GOV | Política de gestión de bloqueos. |
| ARCH-001 | `docs/CF-020-DATA-MODEL.md` | ARCH | Modelo de datos. Fuente de verdad semántica. |
| ARCH-002 | `docs/CF-021-DOMAIN-MODEL.md` | ARCH | Modelo de dominio. Agregados y bounded contexts. |
| ARCH-003 | `docs/CF-022-AGGREGATE-BOUNDARIES.md` | ARCH | Límites de agregados. Esencial para auditorías. |
| ARCH-004 | `docs/CF-040-BUSINESS-POLICIES.md` | ARCH | Políticas de negocio. |
| ARCH-005 | `docs/CF-050-MVP-FREEZE.md` | ARCH | Alcongelamiento del MVP. |
| DOM-001 | `docs/CF-025-INMUEBLE-DESIGN.md` | DOM | Diseño del agregado Inmueble. |
| DOM-002 | `docs/CF-026-EXPEDIENTE-DESIGN.md` | DOM | Diseño del agregado Expediente. |
| DOM-003 | `docs/CF-028-EXPEDIENTE-WORKFLOW.md` | DOM | Workflow del expediente. |
| ADR-001 | `docs/adr/ADR-001-CERTILAB-ENGINEERING-SYSTEM.md` | ADR | Approved. Engineering System. |
| ADR-002 | `docs/adr/ADR-002-AUTO-ENTREGA-MVP.md` | ADR | Approved. Auto-entrega MVP. |
| ROAD-001 | `docs/ROADMAP-V1.md` | ROAD | Roadmap vigente del proyecto. |

**Potencialmente ampliable con:**

| CKB-ID | Documento | Familia | Condición |
|--------|-----------|---------|-----------|
| ADR-003 | `docs/adr/ADR-003-GTD-LINEA-DE-NEGOCIO.md` | ADR | Si está Approved |
| ADR-004 | `docs/adr/ADR-004-EXTENSION-DOCUMENTO-IA-GTD.md` | ADR | Si está Approved |
| DOM-004 | `docs/CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md` | DOM | Si PITR está en desarrollo activo |
| DOM-005 | `docs/CF-031-PITR-QUESTION-TREE.md` | DOM | Si el árbol de preguntas PITR está activo |
| DOM-006 | `docs/CF-032-ARQUITECTO-TECNICO-INSPECTION-MANUAL.md` | DOM | Si el manual de inspección está activo |

---

## 7. RIESGOS DE DUPLICIDAD DOCUMENTAL Y MITIGACIÓN

### 7.1 Matriz de riesgos

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|--------|-------------|---------|------------|
| 1 | Dos documentos describen el mismo concepto (ej: CF-020 y CF-021 sobre el modelo) | Alta | Medio | La columna "Referencias" del índice permite detectar solapamientos. Si hay conflicto real, se aplica RULE PRECEDENCE. El CKB debe documentar explícitamente la relación. |
| 2 | Un análisis exploratorio se confunde con diseño oficial | Alta | Alto | El análisis exploratorio no se indexa. El documento de diseño (ARCH/DOM) que deriva de él sí. Ambos coexisten en `docs/` pero solo el de diseño entra al CKB. |
| 3 | Una ADR reemplaza una decisión documentada en un CF-XXX sin que se actualice el CF-XXX | Media | Alto | Se marca el CF-XXX como Superseded en el índice y se referencia la ADR en "Referencias". No se modifica el CF-XXX físicamente. |
| 4 | El índice se desincroniza con los archivos reales (ruta eliminada pero índice no actualizado) | Media | Medio | El flujo de incorporación exige verificar que la ruta existe antes de indexar. En cada sesión se debe verificar con `test -f` o `ls`. |
| 5 | Contenido efímero se confunde con conocimiento permanente | Alta | Alto | Los criterios de entrada de la sección 2 y la tabla de criterios por familia (sección 6) definen condiciones explícitas de indexación. |
| 6 | Un documento se añade al índice sin verificar duplicados | Media | Medio | El paso 1 del procedimiento de incorporación exige verificar duplicados explícitamente. |
| 7 | El CKB se usa como repositorio de conocimiento en lugar de índice, almacenando resúmenes o abstracts | Baja | Alto | La recomendación arquitectónica (sección 8) establece que el CKB es **solo índice**. No se almacena contenido, solo referencias. |
| 8 | Un agente edita documentos fuente para añadirles metadatos del CKB | Baja | Alto | Prohibido explícitamente. El CKB no modifica documentos fuente. |

### 7.2 Prevención estructural

- **No se modifican documentos fuente** para añadirles metadatos del CKB.
- **No se mueven archivos físicamente** dentro de `docs/`. El CKB referencia rutas existentes.
- **No se crean resúmenes ni abstracts** en el índice. Solo referencia y descripción de una línea.
- **Cada documento tiene una única ruta** en el índice. No se permiten referencias duplicadas.
- **No se almacena contenido** en el CKB. Es solo un índice de referencias.

### 7.3 Casos de solapamiento conocidos

| Documentos | Naturaleza del solapamiento | Resolución en el CKB |
|------------|---------------------------|----------------------|
| CF-020 (Data Model) vs CF-021 (Domain Model) | Ambos definen entidades del dominio | CF-020 es la fuente de verdad de datos (columnas, tipos SQL). CF-021 es la fuente de verdad de dominio (agregados, comportamiento). El CKB documenta esta relación en "Referencias". |
| CF-025 (Inmueble Design) vs CF-022 (Aggregate Boundaries) | CF-022 define los límites, CF-025 detalla el diseño | CF-022 es la fuente de verdad de límites. CF-025 es la fuente de verdad de diseño del agregado. Se referencian mutuamente. |
| CF-050 (MVP Freeze) vs ROADMAP-V1 | Ambos definen el alcance del MVP | CF-050 es el freeze formal. ROADMAP-V1 es la planificación. Se referencian mutuamente. |

---

## 8. RECOMENDACIÓN FINAL DE ARQUITECTURA

### 8.1 Decisión fundamental: CKB como índice, no como repositorio

**El CKB NO almacena conocimiento. SOLO lo referencia.**

Esta decisión es la consecuencia directa de aplicar los principios de:
- **DDD:** cada concepto tiene un único Aggregate Root documental. El CKB no es un nuevo agregado, es un servicio de descubrimiento.
- **Clean Architecture:** el CKB es una capa de aplicación (caso de uso: "encontrar documento"), no una capa de dominio (no es fuente de verdad).
- **Product First:** el CKB resuelve el problema real (fricción de descubrimiento) sin crear nueva infraestructura documental.

**Impactos positivos:**
- ✅ Elimina el riesgo de duplicidad — los documentos no se copian, solo se referencian.
- ✅ Preserva la estructura actual de `docs/` — no requiere migración ni reestructuración.
- ✅ Minimiza la fricción de adopción — no requiere cambios en documentos existentes.
- ✅ Escala incrementalmente — el índice crece por demanda, no por diseño anticipado.
- ✅ No compite con las fuentes de verdad existentes — las complementa.
- ✅ No requiere tooling especializado en V1 — un archivo Markdown y Git son suficientes.

### 8.2 Lo que NO se hace en V1

| Actividad | Motivo | Se hace en |
|-----------|--------|------------|
| Frontmatter YAML en documentos fuente | No se modifican documentos existentes | Nunca |
| Taxonomía de etiquetas (tags) | Sobredimensionado hasta superar los 30 documentos indexados | V2 |
| Script de validación de integridad | Añade complejidad innecesaria en V1 | V2 |
| Integración CI para el CKB | No hay suficientes documentos para justificarlo | V2 |
| Reorganizar físicamente `docs/` | Rompe URLs, referencias y enlaces existentes | Nunca |
| Migrar a herramienta externa (Notion, Confluence) | Rompe la fuente de verdad única (Git) | Nunca |
| Versionado semántico del índice | Git es el mecanismo de versionado | Nunca |
| Incluir análisis exploratorios | No son conocimiento activo | Nunca |
| Incluir documentación de diseño visual en V1 | No hay épica de UI activa | V2 |
| Incluir informes de sesión/handover | Son proceso interno, no conocimiento del proyecto | Nunca |

### 8.3 Impacto en la gobernanza existente

**El CKB NO modifica la gobernanza actual.** Específicamente:

- **AGENTS.md** no se modifica. La referencia al CKB se añadirá en una sesión posterior, mediante el procedimiento estándar de modificación de AGENTS.md (registro en CHANGELOG).
- **CF-001** no se modifica. Se actualizará el protocolo para incluir la consulta del CKB-INDEX.md como paso obligatorio.
- **CF-001A** no se modifica. El CKB no es una decisión arquitectónica congelada.
- **Ninguna ADR es necesaria** para crear el CKB. No afecta a elementos protegidos por ARCHITECTURE FREEZE.

### 8.4 Hoja de ruta de evolución: V1 → V2 → V3

**V1 (MVP) — Esta propuesta**

```
Artefactos: CKB-INDEX.md + CKB-GUIDE.md + CKB-EVOLUTION.md (opcional)
Documentos: 17 iniciales
Tooling: Ninguno. Git + Markdown.
Coste: ~2 horas de implementación.
```

**V2 (Crecimiento)**

```
Nuevos artefactos: Script de validación de rutas (opcional)
Nuevas familias: PROD (producto)
Documentos estimados: 25-30
Tooling: Script opcional para verificar que todas las rutas del índice existen.
Entrada de: Documentación de producto si hay épica activa, documentación de diseño si hay épica de UI.
```

**V3 (Madurez)**

```
Nuevos artefactos: CI básico para health check del índice
Documentos estimados: 30-50
Tooling: Verificación automática en CI de que CKB-INDEX.md está actualizado con docs/.
Taxonomía de etiquetas si se superan los 50 documentos.
```

### 8.5 Coste estimado de implementación V1

| Actividad | Tiempo estimado |
|-----------|----------------|
| Creación de CKB-INDEX.md con 17 documentos | ~45 minutos |
| Creación de CKB-GUIDE.md (guía breve) | ~15 minutos |
| Verificación de rutas de los 17 documentos | ~10 minutos |
| Redacción de CKB-EVOLUTION.md (opcional) | ~15 minutos |
| **Total** | **~1.5 horas** |

### 8.6 Decisión arquitectónica

> **RECOMENDACIÓN:** Implementar CKB-001 como un índice Markdown plano (CKB-INDEX.md) que referencia los ~17 documentos de conocimiento activo del proyecto, acompañado de una guía de uso breve (CKB-GUIDE.md). Sin tooling adicional en V1. Sin modificar documentos fuente. Sin frontmatter. Sin versionado semántico.

Esta decisión:
- **No requiere ADR** — no afecta a elementos protegidos por ARCHITECTURE FREEZE.
- **No modifica la gobernanza** — AGENTS.md, CF-001 y CF-001A permanecen intactos.
- **No genera deuda documental** — el CKB es un índice, no un repositorio de contenido duplicado.
- **Acelera el desarrollo** — resuelve el problema real de descubrimiento en menos de 2 horas de implementación.
- **Respeta todos los principios** — DDD, Clean Architecture, Product First, una única fuente de verdad por cada tipo de conocimiento.

---

## 9. ANEXO: MAPEO COMPLETO DE LA DOCUMENTACIÓN EXISTENTE

Análisis de toda la documentación actual en `docs/` para determinar su elegibilidad en el CKB.

### 9.1 Gobernanza (familia GOV)

| # | Documento | ¿Entra en V1? | Motivo |
|---|-----------|--------------|--------|
| 1 | `AGENTS.md` | ✅ GOV-000 | Constitución operativa. Obligatorio. |
| 2 | `docs/CF-000-PROJECT-BRAIN.md` | ✅ GOV-001 | Constitución del proyecto. Obligatorio. |
| 3 | `docs/CF-001-SESSION-PROTOCOL.md` | ✅ GOV-002 | Protocolo de sesión. Obligatorio. |
| 4 | `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` | ✅ GOV-003 | Arquitectura congelada. Obligatorio. |
| 5 | `docs/CF-003-AI-EXECUTION-POLICY.md` | ✅ GOV-004 | Política de IA. Obligatorio. |
| 6 | `docs/CF-004-BLOCKING-MANAGEMENT-POLICY.md` | ✅ GOV-005 | Política de bloqueos. |
| 7 | `docs/CF-002-EXPEDIENTE-DIGITAL.md` | ❌ Diferir | Es diseño de dominio, no gobernanza. Pasa a DOM si procede. |

### 9.2 Arquitectura (familia ARCH)

| # | Documento | ¿Entra en V1? | Motivo |
|---|-----------|--------------|--------|
| 1 | `docs/CF-020-DATA-MODEL.md` | ✅ ARCH-001 | Modelo de datos. Conocimiento activo. |
| 2 | `docs/CF-021-DOMAIN-MODEL.md` | ✅ ARCH-002 | Modelo de dominio. Conocimiento activo. |
| 3 | `docs/CF-022-AGGREGATE-BOUNDARIES.md` | ✅ ARCH-003 | Límites de agregados. Conocimiento activo. |
| 4 | `docs/CF-040-BUSINESS-POLICIES.md` | ✅ ARCH-004 | Políticas de negocio. Conocimiento activo. |
| 5 | `docs/CF-050-MVP-FREEZE.md` | ✅ ARCH-005 | Freeze del MVP. Conocimiento activo. |
| 6 | `docs/CF-011-FOUNDATION.md` | ❌ Diferir | Fundacional. Verificar si está vigente o reemplazado. |
| 7 | `docs/CF-021-SUPABASE-ARCHITECTURE.md` | ❌ Diferir | Arquitectura de infraestructura. Evaluar si es conocimiento activo. |
| 8 | `docs/CF-022-IMPLEMENTATION-BACKLOG.md` | ❌ Diferir | Backlog de implementación. Evaluar si está activo. |

### 9.3 Diseño de dominio (familia DOM)

| # | Documento | ¿Entra en V1? | Motivo |
|---|-----------|--------------|--------|
| 1 | `docs/CF-025-INMUEBLE-DESIGN.md` | ✅ DOM-001 | Agregado Inmueble en producción. |
| 2 | `docs/CF-026-EXPEDIENTE-DESIGN.md` | ✅ DOM-002 | Agregado Expediente en producción. |
| 3 | `docs/CF-028-EXPEDIENTE-WORKFLOW.md` | ✅ DOM-003 | Workflow del expediente en producción. |
| 4 | `docs/CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md` | ❌ Evaluar | Si PITR está en desarrollo activo, entra como DOM-004. |
| 5 | `docs/CF-031-PITR-QUESTION-TREE.md` | ❌ Evaluar | Si el árbol de preguntas está activo, entra como DOM-005. |
| 6 | `docs/CF-032-ARQUITECTO-TECNICO-INSPECTION-MANUAL.md` | ❌ Evaluar | Si el manual de inspección está activo, entra como DOM-006. |
| 7 | `docs/CF-040-BUSINESS-POLICIES.md` | ✅ Ya indexado como ARCH-004 | Políticas de negocio. |

### 9.4 ADRs (familia ADR)

| # | Documento | Estado de la ADR | ¿Entra en V1? |
|---|-----------|-----------------|--------------|
| 1 | `docs/adr/ADR-001-CERTILAB-ENGINEERING-SYSTEM.md` | Approved | ✅ ADR-001 |
| 2 | `docs/adr/ADR-002-AUTO-ENTREGA-MVP.md` | Approved | ✅ ADR-002 |
| 3 | `docs/adr/ADR-003-GTD-LINEA-DE-NEGOCIO.md` | Approved | ✅ ADR-003 (si se confirma estado) |
| 4 | `docs/adr/ADR-004-EXTENSION-DOCUMENTO-IA-GTD.md` | Approved | ✅ ADR-004 (si se confirma estado) |

### 9.5 Roadmap (familia ROAD)

| # | Documento | ¿Entra en V1? | Motivo |
|---|-----------|--------------|--------|
| 1 | `docs/ROADMAP-V1.md` | ✅ ROAD-001 | Roadmap vigente del proyecto. |
| 2 | `docs/CF-050-MVP-FREEZE.md` | ✅ Ya indexado como ARCH-005 | Freeze del MVP. |

### 9.6 Documentos que NO entran en V1

| Categoría | Documentos | Motivo de exclusión |
|-----------|-----------|---------------------|
| Auditorías | `docs/audits/*.md` (~40 archivos) | Son informes de cierre. Salvo excepción de criterios vigentes. |
| Análisis exploratorios | `docs/analysis/*.md` (~35 archivos) | No son conocimiento activo. Son trabajo previo. |
| Diseño visual | `docs/book/*.md` (7 volúmenes), `docs/design/*.md` | Design System. Entra en V2. |
| Producto | `docs/product/*.md` (~5 archivos) | Documentación de producto. Entra en V2. |
| Strategic | `docs/AUDITORIA-ESTRATEGICA-V2.md`, `docs/INVESTOR-DUE-DILIGENCE-V2.md` | No son conocimiento técnico activo para el desarrollo. |
| Releases | `docs/releases/*.md` | Histórico. No es conocimiento activo. |
| Miscelánea | `docs/PROPUESTA-MODELO-MVP.md`, `docs/CERTILAB-OS-DISCOVERY.md` | Exploratorios o externos al desarrollo. |
| Editorial/SEO | `docs/editorial/*.md`, `docs/observatorio/*.md` | Contenido externo. No es documentación del proyecto. |

### 9.7 Total estimado V1

| Familia | Cantidad |
|---------|----------|
| GOV | 5-6 documentos |
| ARCH | 5 documentos |
| DOM | 3-5 documentos |
| ADR | 2-4 documentos |
| ROAD | 1 documento |
| **Total** | **16-21 documentos** |

---

> **Fin del informe arquitectónico CKB-001.**
> 
> Este documento es una propuesta de diseño. No constituye implementación ni modificación de ningún archivo del proyecto. No requiere ADR. No modifica AGENTS.md. No requiere commit.