# CF-002 — DOCUMENTATION GOVERNANCE

**Versión:** 1.0
**Fecha:** 11/07/2026
**Responsable:** Gobernanza del Proyecto Certilab
**Estado:** Approved

---

## Índice

1. [Propósito](#1-propósito)
2. [Ámbito de aplicación](#2-ámbito-de-aplicación)
3. [Jerarquía documental](#3-jerarquía-documental)
4. [Precedencia entre documentos](#4-precedencia-entre-documentos)
5. [Resolución de conflictos](#5-resolución-de-conflictos)
6. [Reglas para futuras modificaciones](#6-reglas-para-futuras-modificaciones)
7. [Estados documentales](#7-estados-documentales)

---

## 1. Propósito

Establecer el sistema de gobernanza que rige la documentación del proyecto Certilab. Este documento define:

- La jerarquía de autoridad entre documentos.
- La precedencia cuando dos o más documentos entran en conflicto.
- El protocolo de resolución de conflictos.
- Las reglas para crear, modificar, promover y retirar documentación.
- El ciclo de vida y los estados que puede atravesar cualquier documento del proyecto.

**Este documento prevalece sobre cualquier convención no escrita, correo electrónico, comunicación verbal o prompt de sesión que contradiga lo aquí establecido.**

---

## 2. Ámbito de aplicación

### 2.1 Versiones del producto

Esta gobernanza aplica a toda la documentación técnica, arquitectónica, de producto y operativa del proyecto Certilab, independientemente de la versión del producto a la que haga referencia:

| Versión | Ámbito | Estado |
|---------|--------|--------|
| **MVP V1** | Funcionalidad mínima viable en desarrollo activo | En ejecución |
| **V1.1** | Mejoras posteriores al MVP sin cambios arquitectónicos | Futuro |
| **V2** | Motor PITR, automatizaciones, GTD | Futuro (bloqueado) |
| **V3** | Expansiones mayores no definidas | Futuro |

### 2.2 Documentos incluidos

Quedan sujetos a esta gobernanza:

- Documentos CF- (incluido este mismo)
- ADR (Architecture Decision Records)
- Roadmaps y backlogs
- Documentación de producto (visiones, personas, catálogo)
- Documentación de diseño y sistema de diseño
- Documentación de análisis y auditorías
- CKB (Common Knowledge Base)
- Informes, actas y cierres

**Quedan excluidos:**

- Código fuente (src/, migraciones, configuraciones técnicas)
- Scripts de automatización
- Documentación generada automáticamente (node_modules, builds)
- Notas personales no incorporadas al repositorio

### 2.3 Ámbito temporal

Esta gobernanza entra en vigor inmediatamente tras su aprobación y se mantiene vigente hasta que un documento de Nivel 1 la sustituya o modifique.

---

## 3. Jerarquía documental

La documentación del proyecto se organiza en cuatro niveles de autoridad. Un documento de nivel superior **siempre prevalece** sobre uno de nivel inferior.

### Nivel 1 — Autoridad máxima

Documentos fundacionales que definen el alcance, la arquitectura y las reglas del proyecto. **No pueden ser contradichos por ningún otro documento.**

| # | Documento | Contenido |
|---|-----------|-----------|
| 1 | **CF-000-PROJECT-BRAIN.md** | Constitución del proyecto. Visión, principios, restricciones. |
| 2 | **CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md** | Acta de cierre de la arquitectura V1. Congela decisiones arquitectónicas. |
| 3 | **CF-002-DOCUMENTATION-GOVERNANCE.md** | Presente documento. Gobernanza documental. |
| 4 | **CF-050-MVP-FREEZE.md** | Alcance del MVP. Define qué es V1 y qué está bloqueado para V2+. |

**Relación entre documentos de Nivel 1:**

- CF-000 es la fuente última de principios y visión del proyecto.
- CF-001A concreta decisiones arquitectónicas adoptadas durante V1.
- CF-002 define las reglas de gobernanza documental para todo el proyecto.
- CF-050 establece el perímetro del MVP y bloquea funcionalidades V2+.

En caso de conflicto entre documentos de Nivel 1, el orden de precedencia es:
**CF-000 → CF-001A → CF-002 → CF-050**

### Nivel 2 — Especificación técnica

Documentos que detallan diseño, dominio y decisiones de implementación. **Deben ser coherentes con Nivel 1.**

| # | Documento | Contenido |
|---|-----------|-----------|
| 1 | **CF-028-EXPEDIENTE-WORKFLOW.md** | Flujo de trabajo del expediente. |
| 2 | **CF-022-AGGREGATE-BOUNDARIES.md** | Límites de agregados, estados y eventos del dominio. |
| 3 | **CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md** | Conocimiento experto para inspección técnica remota. |
| 4 | **ADR aprobadas** | Architecture Decision Records (ADR-001, ADR-002, ...). |

### Nivel 3 — Referencia operativa

Documentos de planificación y seguimiento. **Deben ser coherentes con Nivel 1 y Nivel 2.**

| # | Documento | Contenido |
|---|-----------|-----------|
| 1 | **ROADMAP-V1.md** | Roadmap técnico del proyecto. |
| 2 | **PRODUCT-ROADMAP.md** | Roadmap de producto. |
| 3 | **Backlogs (CF-022-IMPLEMENTATION-BACKLOG.md y otros)** | Listas de tareas priorizadas. |

### Nivel 4 — Documentación de apoyo

Documentos de producto, investigación y referencia. **Deben ser coherentes con todos los niveles superiores.**

| # | Documento | Contenido |
|---|-----------|-----------|
| 1 | **PRODUCT-VISION.md** | Visión de producto. |
| 2 | **PRODUCT-PERSONAS.md** | Definición de personas de usuario. |
| 3 | **Otros documentos de producto** | Análisis de competencia, posicionamiento, etc. |

### Diagrama de jerarquía

```
NIVEL 1 — Autoridad máxima
┌─────────────────────────────────────────────────────────────┐
│  CF-000 · CF-001A · CF-002 · CF-050                        │
│  No pueden ser contradichos. Prevalecen sobre todo.         │
└─────────────────────────────────────────────────────────────┘
                            ↓
NIVEL 2 — Especificación técnica
┌─────────────────────────────────────────────────────────────┐
│  CF-028 · CF-022 · CF-030 · ADR aprobadas                  │
│  Deben ser coherentes con Nivel 1.                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
NIVEL 3 — Referencia operativa
┌─────────────────────────────────────────────────────────────┐
│  ROADMAP-V1 · PRODUCT-ROADMAP · Backlogs                   │
│  Deben ser coherentes con Nivel 1 y Nivel 2.               │
└─────────────────────────────────────────────────────────────┘
                            ↓
NIVEL 4 — Documentación de apoyo
┌─────────────────────────────────────────────────────────────┐
│  PRODUCT-VISION · Personas · Docs de apoyo                 │
│  Deben ser coherentes con todos los niveles superiores.    │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Precedencia entre documentos

### 4.1 Regla general

> **Un documento de nivel superior prevalece siempre sobre uno de nivel inferior.**

### 4.2 Matriz de precedencia

| Este documento | Prevalece sobre | Razón |
|---------------|-----------------|-------|
| CF-000 | Todos los documentos | Constitución del proyecto |
| CF-001A | Todo excepto CF-000 | Acta de cierre arquitectura V1 |
| CF-002 | Todo excepto CF-000 y CF-001A | Gobernanza documental |
| CF-050 | Nivel 2, 3 y 4 | Define alcance del MVP |
| CF-028 | Nivel 3 y 4 | Especificación del flujo de expediente |
| CF-022 | Nivel 3 y 4 | Límites de agregados del dominio |
| CF-030 | Nivel 3 y 4 | Conocimiento experto del dominio |
| ADR | Nivel 3 y 4 | Decisiones arquitectónicas aprobadas |
| ROADMAP-V1 | Nivel 4 | Planificación técnica |
| PRODUCT-ROADMAP | Nivel 4 | Planificación de producto |
| Backlogs | Nivel 4 | Listas de tareas |

### 4.3 Precedencia dentro del mismo nivel

| Nivel | Criterio |
|-------|----------|
| Nivel 1 | CF-000 → CF-001A → CF-002 → CF-050 |
| Nivel 2 | CF-028 → CF-022 → CF-030 → ADR (por orden de aprobación) |
| Nivel 3 | ROADMAP-V1 → PRODUCT-ROADMAP → Backlogs |
| Nivel 4 | PRODUCT-VISION → Personas → Documentos de apoyo |

### 4.4 Precedencia temporal

Si dos documentos del mismo nivel entran en conflicto y el criterio anterior no lo resuelve:

- **ADR:** La ADR más reciente (fecha de aprobación) prevalece sobre la más antigua.
- **CF del mismo tipo:** La versión más reciente prevalece.
- **Otros documentos:** El documento con fecha de aprobación más reciente prevalece, salvo que un documento superior indique lo contrario.

### 4.5 Casos especiales

| Situación | Resolución |
|-----------|-----------|
| CF-028 describe Motor PITR, pero CF-050 dice "Sin Motor PITR en MVP" | **CF-050 prevalece** (Nivel 1 > Nivel 2) |
| ADR-002 aprueba auto-entrega, pero CF-050 describe entrega manual | **ADR-002 prevalece** (aprobada explícitamente; CF-050 debe actualizarse) |
| ROADMAP-V1 incluye EP-029 Motor PITR como pendiente, pero CF-050 lo bloquea | **CF-050 prevalece**; ROADMAP-V1 debe corregirse |
| PRODUCT-VISION menciona funcionalidad V2 como parte del producto actual | **CF-050 prevalece**; PRODUCT-VISION debe corregirse |

---

## 5. Resolución de conflictos

### 5.1 Identificación de conflictos

Un conflicto documental existe cuando dos o más documentos afirman información contradictoria sobre:

- El alcance del MVP (V1) frente a versiones futuras (V2+).
- El flujo de trabajo de un agregado del dominio.
- Los estados válidos de una entidad.
- Las reglas de negocio aplicables.
- La prioridad o pertenencia de una tarea al backlog.

### 5.2 Protocolo de resolución

**Paso 1 — Identificar el conflicto**

Documentar:

- Documento A: ruta, sección, líneas, texto conflictivo.
- Documento B: ruta, sección, líneas, texto conflictivo.
- Naturaleza del conflicto: desactualización, error, decisión nueva.

**Paso 2 — Determinar el nivel jerárquico**

Identificar el nivel de cada documento según §3.

- Si los niveles son distintos: aplicar §4.1 (el de nivel superior prevalece).
- Si los niveles son iguales: aplicar §4.3 o §4.4.

**Paso 3 — Clasificar el conflicto**

| Tipo | Descripción | Acción |
|------|-------------|--------|
| **Desactualización** | Un documento no refleja cambios aprobados en un documento superior. | Actualizar el documento de nivel inferior. |
| **Error** | Un documento contiene información incorrecta (no respaldada por ningún documento superior). | Corregir el documento. |
| **Decisión nueva** | El conflicto revela que se necesita una decisión no cubierta por documentos existentes. | Crear ADR o actualizar documento de Nivel 1. |

**Paso 4 — Resolver**

- **Desactualización:** Modificar el documento de nivel inferior para alinearlo con el superior. Registrar el cambio.
- **Error:** Corregir el documento. Si el error afecta a documentación técnica, notificar al equipo.
- **Decisión nueva:** Si afecta a Nivel 1, requiere aprobación del usuario. Si afecta a Nivel 2, puede resolverse mediante ADR. Si afecta a Nivel 3 o 4, puede resolverse con aprobación del responsable del documento.

**Paso 5 — Documentar la resolución**

Registrar en el documento afectado:

- Fecha de la resolución.
- Descripción del cambio.
- Documento de nivel superior que lo justifica.

### 5.3 Escalado

Si no se alcanza una resolución en los pasos anteriores:

1. **Escalado interno:** El responsable del documento de nivel superior dirime.
2. **Escalado final:** El usuario (Product Owner / Arquitecto) actúa como autoridad final.

### 5.4 Bloqueo durante resolución

Mientras un conflicto está en proceso de resolución:

- **No se permite** iniciar implementación basada en el documento conflictivo.
- **Sí se permite** continuar implementación basada en el documento de nivel superior.
- **Sí se permite** continuar implementación en áreas no afectadas por el conflicto.

### 5.5 Matriz de resolución rápida

| Conflicto | Nivel A | Nivel B | Resolución |
|-----------|---------|---------|-----------|
| CF-050 vs CF-028 | 1 | 2 | **CF-050 prevalece.** CF-028 debe separar V1/V2. |
| CF-050 vs ADR | 1 | 2 | **CF-050 prevalece**, salvo que la ADR haya sido aprobada explícitamente. |
| CF-028 vs CF-022 | 2 | 2 | **CF-028 prevalece** (especificación de flujo sobre límites de agregados). |
| CF-028 vs ROADMAP | 2 | 3 | **CF-028 prevalece.** ROADMAP debe alinearse. |
| ADR-002 vs CF-050 | 2 | 1 | **ADR-002 prevalece** (aprobada explícitamente). CF-050 debe actualizarse. |
| ADR-003 vs CF-050 | 2 | 1 | **CF-050 prevalece.** ADR-003 debe bloquearse para MVP. |

---

## 6. Reglas para futuras modificaciones

### 6.1 Reglas generales

| Regla | Descripción |
|-------|-------------|
| **R1 — Coherencia** | Toda modificación debe mantener la coherencia vertical (niveles superiores → inferiores). |
| **R2 — Trazabilidad** | Toda modificación debe registrar: fecha, autor, motivo, documento justificante. |
| **R3 — Mínimo cambio** | Modificar únicamente lo necesario para resolver el problema. No introducir cambios cosméticos no solicitados. |
| **R4 — No regresión** | Una modificación no puede reintroducir una contradicción ya resuelta. |
| **R5 — Auditoría** | Toda modificación de Nivel 1 o Nivel 2 debe ir seguida de una verificación de coherencia. |

### 6.2 Modificaciones por nivel

| Nivel | Quién puede modificar | Requisitos |
|-------|----------------------|------------|
| **Nivel 1** | Arquitecto / Product Owner | Aprobación explícita del usuario. Registro en changelog. |
| **Nivel 2** | Cualquier miembro del equipo técnico | Coherencia verificada con Nivel 1. Aprobación del responsable del documento. |
| **Nivel 3** | Cualquier miembro del equipo | Coherencia verificada con Nivel 1 y 2. |
| **Nivel 4** | Cualquier miembro del equipo | Coherencia verificada con Nivel 1, 2 y 3. |

### 6.3 Creación de nuevos documentos

| Paso | Acción |
|------|--------|
| 1 | Identificar el nivel jerárquico del nuevo documento. |
| 2 | Verificar que no existe ya un documento que cubra la misma necesidad. |
| 3 | Si es Nivel 1: requiere ADR y aprobación del usuario. |
| 4 | Si es Nivel 2: puede crearse con aprobación del responsable de Nivel 1. |
| 5 | Si es Nivel 3 o 4: puede crearse con aprobación del responsable de Nivel 2. |
| 6 | Registrar el nuevo documento en el índice de documentación correspondiente. |
| 7 | Verificar coherencia con todos los niveles superiores. |

### 6.4 Retirada de documentos

| Paso | Acción |
|------|--------|
| 1 | Identificar el documento a retirar y su nivel. |
| 2 | Si es Nivel 1: requiere ADR y aprobación del usuario. |
| 3 | Si es Nivel 2, 3 o 4: puede retirarse con aprobación del responsable del nivel superior. |
| 4 | Mover el documento a `docs/archive/` con prefijo de fecha. |
| 5 | Actualizar el índice de documentación. |
| 6 | Verificar que ningún documento activo referencia al documento retirado. |

### 6.5 Identificación de documentos

- Los documentos CF- llevan numeración secuencial: CF-000, CF-001, CF-002, ...
- Los ADR llevan numeración secuencial: ADR-001, ADR-002, ...
- Los documentos de análisis se almacenan en `docs/analysis/` con nombre descriptivo.
- Los documentos de auditoría se almacenan en `docs/audits/` con nombre descriptivo.
- Los documentos de producto se almacenan en `docs/product/` con nombre descriptivo.

### 6.6 Changelog obligatorio

Todo documento debe incluir al final una tabla de changelog con el siguiente formato:

```markdown
## Historial de cambios

| Fecha | Autor | Cambio | Documento justificante |
|-------|-------|--------|----------------------|
| YYYY-MM-DD | Nombre | Descripción del cambio | CF-XXX / ADR-NNN |
```

---

## 7. Estados documentales

### 7.1 Ciclo de vida de un documento

```
Draft
  │
  ▼
Review ──→ (rechazado) ──→ Draft (revisión)
  │
  ▼
Approved
  │
  ├──→ Superseded (sustituido por una versión posterior)
  │
  └──→ Archived (retirado, ya no aplica)
```

### 7.2 Definición de estados

| Estado | Descripción | Acciones permitidas |
|--------|-------------|---------------------|
| **Draft** | Documento en elaboración. No vinculante. | Modificación libre. No puede usarse como referencia. |
| **Review** | Documento enviado a revisión. Pendiente de aprobación. | Modificación solo para corregir errores detectados en revisión. |
| **Approved** | Documento aprobado y vinculante. | Modificación según reglas de §6. Sirve como fuente de verdad. |
| **Superseded** | Documento reemplazado por una versión más reciente. | No modificable. Se referencia al documento que lo sustituye. |
| **Archived** | Documento retirado. Ya no aplica al proyecto. | No modificable. Almacenado en `docs/archive/`. |

### 7.3 Transiciones permitidas

| Desde | Hacia | Requisito |
|-------|-------|-----------|
| Draft | Review | El autor considera el documento completo. |
| Review | Draft | Se solicita revisión sustancial. |
| Review | Approved | Aprobación del responsable del documento. |
| Approved | Superseded | Nuevo documento aprobado que lo reemplaza. |
| Approved | Archived | Deja de aplicar al proyecto. |
| Superseded | Archived | El documento sustituto también es archivado. |
| Draft | Archived | El documento se descarta sin llegar a aprobarse. |

### 7.4 Estado de los documentos actuales

| Documento | Estado actual |
|-----------|---------------|
| CF-000-PROJECT-BRAIN.md | Approved |
| CF-001-SESSION-PROTOCOL.md | Approved |
| CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md | Approved |
| **CF-002-DOCUMENTATION-GOVERNANCE.md** | **Approved** (este documento) |
| CF-003-AI-EXECUTION-POLICY.md | Approved |
| CF-004-BLOCKING-MANAGEMENT-POLICY.md | Approved |
| CF-011-FOUNDATION.md | Draft |
| CF-012-PITR-MOTOR.md | Draft |
| CF-020-DATA-MODEL.md | Draft |
| CF-021-DOMAIN-MODEL.md | Draft |
| CF-021-SUPABASE-ARCHITECTURE.md | Draft |
| CF-022-AGGREGATE-BOUNDARIES.md | Draft |
| CF-022-IMPLEMENTATION-BACKLOG.md | Draft |
| CF-025-INMUEBLE-DESIGN.md | Draft |
| CF-026-EXPEDIENTE-DESIGN.md | Draft |
| CF-028-EXPEDIENTE-WORKFLOW.md | Draft |
| CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md | Draft |
| CF-031-PITR-QUESTION-TREE.md | Draft |
| CF-032-ARQUITECTO-TECNICO-INSPECTION-MANUAL.md | Draft |
| CF-040-BUSINESS-POLICIES.md | Draft |
| CF-050-MVP-FREEZE.md | Approved |
| ADR-001-CERTILAB-ENGINEERING-SYSTEM.md | Approved |
| ADR-002-AUTO-ENTREGA-MVP.md | Approved |
| ADR-003-GTD-LINEA-DE-NEGOCIO.md | Draft |
| ADR-004-EXTENSION-DOCUMENTO-IA-GTD.md | Draft |

**Nota:** Los documentos CF marcados como "Draft" reflejan su estado actual a fecha de este documento. El presente plan de normalización documental tiene como objetivo promoverlos a "Approved" tras verificar su coherencia con los niveles superiores.

---

## Historial de cambios

| Fecha | Autor | Cambio | Documento justificante |
|-------|-------|--------|----------------------|
| 11/07/2026 | CF-001 | Versión inicial. Sistema de gobernanza documental. | MASTER-DOCUMENT-COHERENCE-AUDIT.md, PLAN-MAESTRO-NORMALIZACION-DOCUMENTAL.md |