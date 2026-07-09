# CKB-INDEX — Repositorio Oficial de Conocimiento

> **Propósito:** Índice maestro del conocimiento activo del proyecto Certilab.
> Una única fuente de verdad para localizar cualquier documento relevante en menos de 30 segundos.
>
> **Instrucciones:** Consultar al inicio de cada sesión tras leer los documentos AUTOLOAD (GOV-000 a GOV-003).
> No almacena contenido. No duplica documentos fuente. No sustituye las fuentes de verdad originales.

---

## GOV — Gobernanza

Documentos que definen las reglas de operación, constitución y políticas del proyecto.

| CKB-ID | Título | Ruta | Estado | Descripción |
|--------|--------|------|--------|-------------|
| GOV-000 | AGENTS.md | `AGENTS.md` | Vigente | Constitución operativa del proyecto. Contiene reglas de gobernanza, sesión y ejecución. |
| GOV-001 | CF-000 Project Brain | `docs/CF-000-PROJECT-BRAIN.md` | Vigente | Constitución del proyecto. Visión, principios, arquitectura y decisiones fundacionales. |
| GOV-002 | CF-001 Session Protocol | `docs/CF-001-SESSION-PROTOCOL.md` | Vigente | Protocolo obligatorio de inicio de cada sesión de desarrollo. |
| GOV-003 | CF-001A Acta Cierre Arquitectura V1 | `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` | Vigente | Acta que congela la arquitectura V1. Prohíbe cambios sin ADR. |
| GOV-004 | CF-003 AI Execution Policy | `docs/CF-003-AI-EXECUTION-POLICY.md` | Vigente | Política de autoevaluación y ejecución para agentes de IA. |
| GOV-005 | CF-004 Blocking Management Policy | `docs/CF-004-BLOCKING-MANAGEMENT-POLICY.md` | Vigente | Política de gestión de bloqueos y decisiones bloqueantes. |

## ARCH — Arquitectura

Documentos que describen el modelo de datos, dominio, límites de agregados y políticas arquitectónicas.

| CKB-ID | Título | Ruta | Estado | Descripción |
|--------|--------|------|--------|-------------|
| ARCH-001 | CF-020 Data Model | `docs/CF-020-DATA-MODEL.md` | Vigente | Modelo de datos. Definición de tablas, columnas, tipos y relaciones SQL. |
| ARCH-002 | CF-021 Domain Model | `docs/CF-021-DOMAIN-MODEL.md` | Vigente | Modelo de dominio. Agregados, entidades, value objects y bounded contexts. |
| ARCH-003 | CF-022 Aggregate Boundaries | `docs/CF-022-AGGREGATE-BOUNDARIES.md` | Vigente | Límites de agregados. Reglas de consistencia y relaciones entre aggregates. |
| ARCH-004 | CF-040 Business Policies | `docs/CF-040-BUSINESS-POLICIES.md` | Vigente | Políticas de negocio del dominio de certificación energética. |
| ARCH-005 | CF-050 MVP Freeze | `docs/CF-050-MVP-FREEZE.md` | Vigente | Documento de alcance congelado del MVP V1. |

## DOM — Diseño de Dominio

Documentos que detallan el diseño de agregados, servicios y workflows del dominio.

| CKB-ID | Título | Ruta | Estado | Descripción |
|--------|--------|------|--------|-------------|
| DOM-001 | CF-025 Inmueble Design | `docs/CF-025-INMUEBLE-DESIGN.md` | Vigente | Diseño del agregado Inmueble. Reglas, validaciones y comportamiento. |
| DOM-002 | CF-026 Expediente Design | `docs/CF-026-EXPEDIENTE-DESIGN.md` | Vigente | Diseño del agregado Expediente. Reglas, estados y comportamiento. |
| DOM-003 | CF-028 Expediente Workflow | `docs/CF-028-EXPEDIENTE-WORKFLOW.md` | Vigente | Workflow del expediente. Máquina de estados y transiciones. |

## ADR — Architecture Decision Records

Decisiones arquitectónicas adoptadas formalmente mediante ADR.

| CKB-ID | Título | Ruta | Estado | Descripción |
|--------|--------|------|--------|-------------|
| ADR-001 | ADR-001 Certilab Engineering System | `docs/adr/ADR-001-CERTILAB-ENGINEERING-SYSTEM.md` | Vigente | Sistema de ingeniería: marco técnico y metodología de desarrollo. |
| ADR-002 | ADR-002 Auto-entrega MVP | `docs/adr/ADR-002-AUTO-ENTREGA-MVP.md` | Vigente | Decisión de implementar auto-entrega de resultados en el MVP. |

## ROAD — Roadmap

Documentos de planificación y dirección del proyecto.

| CKB-ID | Título | Ruta | Estado | Descripción |
|--------|--------|------|--------|-------------|
| ROAD-001 | ROADMAP-V1 | `docs/ROADMAP-V1.md` | Vigente | Roadmap vigente del proyecto. Épicas, prioridades e hitos. |

---

## Resumen del índice

| Familia | Documentos indexados |
|---------|---------------------|
| GOV | 6 |
| ARCH | 5 |
| DOM | 3 |
| ADR | 2 |
| ROAD | 1 |
| **Total** | **17** |

---

> **Mantenimiento:** Actualizar este índice cada vez que se cree, depreque o elimine un documento fuente.
> **Formato commit:** `CKB: (add\|update\|deprecate\|remove) FAMILIA-NNN — Título del documento`
> **Última actualización:** 09/07/2026