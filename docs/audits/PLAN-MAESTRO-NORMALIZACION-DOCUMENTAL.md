# PLAN MAESTRO DE NORMALIZACIÓN DOCUMENTAL

> **Objetivo:** Ejecutar la normalización completa de todos los documentos del sistema Certilab para garantizar que cada documento refleje fielmente la implementación actual y esté alineado con las decisiones arquitectónicas congeladas (CF-001A, CF-050, MVP Freeze).
>
> **Estado:** EN EJECUCIÓN
> **Fecha:** 11/07/2026
> **Proceso:** CF-002 (Documentation Governance)

---

## 0. INSTRUCCIONES DE USO

Este plan maestro se ejecuta en **rondas sucesivas**. Cada ronda normaliza un grupo de documentos. Al final de cada ronda se ejecuta verificación de coherencia cruzada.

**Progreso global:**

| Fase | Documentos | Estado |
|------|-----------|--------|
| Fase 0 — Auditoría inicial | Todos | ✅ COMPLETADA |
| Fase 1 — Normalización Core V1 | CF-022, CF-028 | ✅ COMPLETADA |
| Fase 2 — Normalización ADR y Políticas | ADR-003, ADR-004, CF-040 | 🔄 PENDIENTE |
| Fase 3 — Normalización PITR | CF-030, CF-031, CF-032 | 🔄 PENDIENTE |
| Fase 4 — Normalización Roadmap y Backlog | ROADMAP-V1, CF-022-IMPLEMENTATION-BACKLOG | 🔄 PENDIENTE |
| Fase 5 — Normalización Arquitectura Congelada | CF-001A, CF-050 | 🔄 PENDIENTE |
| Fase 6 — Verificación de coherencia global | Todos | 🔄 PENDIENTE |

---

## 1. FASE 0 — AUDITORÍA INICIAL (COMPLETADA)

Se identificaron los siguientes documentos con necesidad de normalización:

### 1.1 Documentos ya normalizados

| Documento | Ruta | Estado Normalización | Observaciones |
|-----------|------|--------------------|---------------|
| CF-022 — Aggregate Boundaries | `docs/CF-022-AGGREGATE-BOUNDARIES.md` | ✅ COMPLETADA | Distingue V1/V2, refleja estado actual |
| CF-028 — Expediente Workflow | `docs/CF-028-EXPEDIENTE-WORKFLOW.md` | ✅ COMPLETADA | Distingue V1/V2+, alineado con implementación |

### 1.2 Documentos pendientes de normalización

| Documento | Ruta | Prioridad | Estado |
|-----------|------|-----------|--------|
| CF-040 — Business Policies | `docs/CF-040-BUSINESS-POLICIES.md` | ALTA | 🔄 PENDIENTE |
| CF-030 — PITR Expert Knowledge Engine | `docs/CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md` | MEDIA | 🔄 PENDIENTE |
| CF-031 — PITR Question Tree | `docs/CF-031-PITR-QUESTION-TREE.md` | MEDIA | 🔄 PENDIENTE |
| CF-032 — Arquitecto Técnico Inspection Manual | `docs/CF-032-ARQUITECTO-TECNICO-INSPECTION-MANUAL.md` | MEDIA | 🔄 PENDIENTE |
| ADR-003 — GTD Línea de Negocio | `docs/adr/ADR-003-GTD-LINEA-DE-NEGOCIO.md` | MEDIA | 🔄 PENDIENTE |
| ADR-004 — Extensión Documento IA GTD | `docs/adr/ADR-004-EXTENSION-DOCUMENTO-IA-GTD.md` | MEDIA | 🔄 PENDIENTE |
| ROADMAP-V1 | `docs/ROADMAP-V1.md` | ALTA | 🔄 PENDIENTE |
| CF-022 — Implementation Backlog | `docs/CF-022-IMPLEMENTATION-BACKLOG.md` | ALTA | 🔄 PENDIENTE |
| CF-001A — Acta Cierre Arquitectura V1 | `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` | BAJA | 🔄 PENDIENTE |
| CF-050 — MVP Freeze | `docs/CF-050-MVP-FREEZE.md` | BAJA | 🔄 PENDIENTE |

---

## 2. FASE 1 — NORMALIZACIÓN CORE V1 (COMPLETADA)

### 2.1 CF-022 — Aggregate Boundaries v1.1.0 ✅

**Archivo:** `docs/CF-022-AGGREGATE-BOUNDARIES.md`

**Cambios realizados:**
- ✅ Etiquetado V1/V2+ en todas las secciones
- ✅ Eliminada referencia a PITR como flujo obligatorio en V1
- ✅ Actualizado flujo V1 para reflejar implementación actual (RevisiónManual → Aprobado/Rechazado)
- ✅ Conservado contenido V2+ con etiqueta explícita
- ✅ Actualizada sección de referencias cruzadas
- ✅ Mantenidas todas las validaciones e invariantes
- ✅ Tabla de versiones actualizada (v1.1.0)

**Auditoría:** ✅ COMPLETADA — `docs/audits/CF-022-NORMALIZACION-AUDITORIA.md`

### 2.2 CF-028 — Expediente Workflow v1.1.0 ✅

**Archivo:** `docs/CF-028-EXPEDIENTE-WORKFLOW.md`

**Cambios realizados:**
- ✅ Distingue explícitamente V1 (MVP) de V2+ (futuro)
- ✅ Etiqueta todas las secciones con `[V1]`, `[V2+]`, `[V1+V2]`
- ✅ Alinea el flujo V1 con la implementación actual del código
- ✅ Conserva todo el contenido V2+ claramente marcado
- ✅ Mantiene referencias cruzadas válidas
- ✅ Cumple con CF-002 (gobernanza documental)

**Auditoría:** ✅ COMPLETADA — `docs/audits/CF-028-NORMALIZACION-AUDITORIA.md`

---

## 3. FASE 2 — NORMALIZACIÓN ADR Y POLÍTICAS

### 3.1 ADR-003 — GTD Línea de Negocio

**Archivo:** `docs/adr/ADR-003-GTD-LINEA-DE-NEGOCIO.md`

**Criterios de normalización:**
- [ ] Verificar que el estado refleje la situación actual (¿sigue en PROPUESTA o fue aprobada?)
- [ ] Verificar que las referencias a otros documentos sean válidas
- [ ] Confirmar que la decisión no contradice CF-001A ni CF-050
- [ ] Añadir metadatos de última revisión

### 3.2 ADR-004 — Extensión Documento IA GTD

**Archivo:** `docs/adr/ADR-004-EXTENSION-DOCUMENTO-IA-GTD.md`

**Criterios de normalización:**
- [ ] Verificar que el estado refleje la situación actual
- [ ] Verificar que las referencias cruzadas (ADR-003, EP-102) sean válidas
- [ ] Confirmar que la extensión propuesta respeta la arquitectura congelada
- [ ] Añadir metadatos de última revisión

### 3.3 CF-040 — Business Policies

**Archivo:** `docs/CF-040-BUSINESS-POLICIES.md`

**Criterios de normalización:**
- [ ] Verificar que todas las políticas sean V1 o estén etiquetadas como V2+
- [ ] Confirmar que los umbrales reflejan la configuración actual del sistema
- [ ] Verificar que no hay políticas obsoletas o contradictorias
- [ ] Añadir etiquetas de versión a cada política
- [ ] Verificar referencias a CF-026, CF-021, CF-022

---

## 4. FASE 3 — NORMALIZACIÓN PITR

### 4.1 CF-030 — PITR Expert Knowledge Engine

**Archivo:** `docs/CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md`

**Criterios de normalización:**
- [ ] Verificar que el documento distingue entre conocimiento V1 (implementado) y V2+ (futuro)
- [ ] Confirmar que las referencias a CF-012, CF-000 son válidas
- [ ] Verificar que los grupos de variables (A-O) reflejan el estado actual
- [ ] Etiquetar secciones que no están implementadas en V1 como V2+
- [ ] Añadir metadatos de última revisión

### 4.2 CF-031 — PITR Question Tree

**Archivo:** `docs/CF-031-PITR-QUESTION-TREE.md`

**Criterios de normalización:**
- [ ] Verificar coherencia con CF-030 y CF-032
- [ ] Confirmar que las preguntas reflejan la implementación actual
- [ ] Etiquetar ramas V2+ no implementadas en V1
- [ ] Añadir metadatos de última revisión

### 4.3 CF-032 — Arquitecto Técnico Inspection Manual

**Archivo:** `docs/CF-032-ARQUITECTO-TECNICO-INSPECTION-MANUAL.md`

**Criterios de normalización:**
- [ ] Verificar coherencia con CF-030 y CF-031
- [ ] Confirmar que los procedimientos reflejan la operativa actual
- [ ] Etiquetar secciones V2+
- [ ] Añadir metadatos de última revisión

---

## 5. FASE 4 — NORMALIZACIÓN ROADMAP Y BACKLOG

### 5.1 ROADMAP-V1

**Archivo:** `docs/ROADMAP-V1.md`

**Criterios de normalización:**
- [ ] Actualizar estado de todas las épicas según implementación real
- [ ] Verificar coherencia con los informes de cierre de épica
- [ ] Añadir épicas creadas tras la versión actual (EP-033, EP-034, etc.)
- [ ] Verificar que el roadmap refleja fielmente el flujo de referencia del dominio
- [ ] Añadir metadatos de última revisión

### 5.2 CF-022 — Implementation Backlog

**Archivo:** `docs/CF-022-IMPLEMENTATION-BACKLOG.md`

**Criterios de normalización:**
- [ ] Marcar tareas completadas con su informe de cierre asociado
- [ ] Verificar que las tareas pendientes son realmente necesarias para V1
- [ ] Clasificar tareas V2+ según CF-050 y PRODUCT-FIRST EXECUTION MODE (§9)
- [ ] Verificar que ninguna tarea viola MVP DISCIPLINE (§8)
- [ ] Añadir metadatos de última revisión

---

## 6. FASE 5 — NORMALIZACIÓN ARQUITECTURA CONGELADA

### 6.1 CF-001A — Acta de Cierre de Arquitectura V1

**Archivo:** `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md`

**Criterios de normalización:**
- [ ] Verificar que todos los elementos congelados siguen siendo válidos
- [ ] Confirmar que ninguna ADR posterior ha modificado decisiones cerradas
- [ ] Añadir referencia a ADR-003 y ADR-004 si aplican
- [ ] Verificar tablas de versión y changelog

### 6.2 CF-050 — MVP Freeze

**Archivo:** `docs/CF-050-MVP-FREEZE.md`

**Criterios de normalización:**
- [ ] Verificar que el alcance del MVP sigue siendo el correcto
- [ ] Confirmar que no se han introducido funcionalidades fuera del alcance
- [ ] Verificar coherencia con ROADMAP-V1 y CF-022
- [ ] Añadir metadatos de última revisión

---

## 7. FASE 6 — VERIFICACIÓN DE COHERENCIA GLOBAL

Una vez completadas todas las fases anteriores, se ejecutará una verificación cruzada:

### 7.1 Matriz de coherencia

| Documento | CF-022 | CF-028 | CF-030 | CF-040 | ADR-003 | ADR-004 | ROADMAP | CF-022-IMP |
|-----------|--------|--------|--------|--------|---------|---------|---------|------------|
| CF-022 | — | ✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | ✅ |
| CF-028 | ✅ | — | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| CF-030 | 🟡 | 🟡 | — | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| CF-040 | 🟡 | 🟡 | 🟡 | — | 🟡 | 🟡 | 🟡 | 🟡 |
| ADR-003 | 🟡 | 🟡 | 🟡 | 🟡 | — | ✅ | 🟡 | 🟡 |
| ADR-004 | 🟡 | 🟡 | 🟡 | 🟡 | ✅ | — | 🟡 | 🟡 |
| ROADMAP | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | — | 🟡 |
| CF-022-IMP | ✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | — |

**Leyenda:** ✅ Verificada — 🟡 Pendiente de verificar — ❌ Incoherencia detectada

### 7.2 Checklist de verificación global

- [ ] Todos los documentos usan el mismo sistema de etiquetado V1/V2+
- [ ] No hay contradicciones entre documentos sobre el alcance del MVP
- [ ] Todas las referencias cruzadas son válidas (archivos existentes)
- [ ] Los informes de cierre de épica coinciden con el estado del backlog
- [ ] Las ADRs aprobadas están reflejadas en los documentos de diseño
- [ ] Los documentos congelados (CF-001A) no han sido modificados sin ADR

---

## 8. ANEXO A — PROTOCOLO DE NORMALIZACIÓN

Cada normalización de documento sigue este protocolo:

### 8.1 Pasos obligatorios

1. **Leer** el documento completo y el/los informe(s) de auditoría asociados
2. **Identificar** secciones V1 vs V2+ y contenido obsoleto
3. **Etiquetar** cada sección con `[V1]`, `[V2+]`, o `[V1+V2]`
4. **Actualizar** tablas de versiones y changelog
5. **Verificar** referencias cruzadas (internas y externas)
6. **Escribir** la nueva versión del documento
7. **Auditar** el resultado (crear informe de auditoría)
8. **Marcar** como completada en este plan maestro

### 8.2 Criterios de etiquetado

| Etiqueta | Significado | Acción |
|----------|-------------|--------|
| `[V1]` | Funcionalidad implementada en MVP | Mantener como está |
| `[V2+]` | Funcionalidad futura (post-MVP) | Conservar pero etiquetar explícitamente |
| `[V1+V2]` | Sección que aplica a ambos | Mantener con nota aclaratoria |
| `[OBSOLETO]` | Ya no aplica | Eliminar o archivar |

### 8.3 Criterios de no-normalización

Un documento **no debe** normalizarse si:

- Es un documento de análisis temporal (carpeta `docs/analysis/`)
- Es un informe de cierre de épica (carpeta `docs/audits/`)
- Es una ADR en estado "Draft" no aprobada
- Es un documento archivado (carpeta `docs/archive/`)

---

## 9. CAMBIOS EN ESTE DOCUMENTO

| Fecha | Versión | Cambio | Autor |
|-------|---------|--------|-------|
| 11/07/2026 | 1.0 | Creación inicial del plan maestro | Cline (Agent) |

---

*Fin del documento PLAN MAESTRO DE NORMALIZACIÓN DOCUMENTAL*