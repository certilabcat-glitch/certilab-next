# CF-022 — STRUCTURAL AUDIT REPORT

**Documento:** CF-022-AGGREGATE-BOUNDARIES.md  
**Versión analizada:** 1.0 (974 líneas)  
**Fecha de auditoría:** 11/07/2026  
**Auditor:** Agente de Arquitectura  
**Estado:** DRAFT — Awaiting user approval before modifications  

---

## EXECUTIVE SUMMARY

CF-022 is a **Level 2 (Technical Specification)** document that defines the aggregate boundaries, invariants, events, and relationships of the Certilab domain model. The document is **architecturally sound** but **structurally mixed**: it combines three distinct content categories without clear separation:

1. **V1 Domain (Stable)** — Aggregate Roots, Value Objects, Invariants, Responsibilities, Boundaries
2. **MVP Implementation** — Actual functionalities, completed tasks, implemented behavior
3. **V2+ Evolution** — PITR Motor, OCR, IA, Automations, Events, Integrations
4. **Operational Backlog** — Tasks, checklists, pending items, roadmap, priorities, status

**Critical Finding:** Sections 15 (Evolución V2) and 16 (Evolución V3) are **explicitly V2+ content** but lack [V2+] tags. Sections 4.3 (Expediente states) and 11 (Events) **mix V1 and V2+ without distinction**. This violates CF-002 (Documentation Governance) §6.2 (Mandatory V1/V2+ tagging).

**Recommendation:** Normalize CF-022 following CF-002 by:
- Adding [V1], [V2+], [V1+V2] tags to all sections
- Separating V1 domain content from V2+ evolution content
- Creating a new section "§17 — V2+ Evolution Summary" to consolidate future roadmap
- Updating header to reflect normalization status

---

## 1. CONTENT CLASSIFICATION

### 1.1 V1 Domain (Stable) — 65% of document

**Status:** ✅ Architecturally frozen per CF-001A. No modifications needed.

| Section | Content | Lines | V1 Status |
|---------|---------|-------|-----------|
| §1 | Fundamental principles of aggregates | 1-58 | ✅ V1 Core |
| §1.1 | Definition of Aggregate | 40-45 | ✅ V1 Core |
| §1.2 | Guiding principles (P-01 to P-07) | 47-57 | ✅ V1 Core |
| §1.3 | Aggregate map diagram | 59-92 | ✅ V1 Core |
| §2 | Cliente Aggregate | 96-156 | ✅ V1 Core |
| §2.1-2.5 | Cliente identity, boundary, ownership, invariants, events | 98-155 | ✅ V1 Core |
| §3 | Inmueble Aggregate | 159-228 | ✅ V1 Core |
| §3.1-3.5 | Inmueble identity, boundary, ownership, invariants, events | 161-227 | ✅ V1 Core |
| §4 | Expediente Aggregate | 231-380 | ⚠️ **MIXED V1/V2+** |
| §4.1-4.2 | Expediente identity, boundary | 233-318 | ✅ V1 Core |
| §4.3 | **Expediente states** | 320-348 | ⚠️ **MIXED** |
| §4.4-4.5 | Expediente ownership, invariants | 350-379 | ✅ V1 Core |
| §5 | Organización Aggregate | 383-437 | ✅ V1 Core |
| §5.1-5.5 | Organización identity, boundary, ownership, invariants, events | 385-437 | ✅ V1 Core |
| §6 | Usuario Aggregate | 441-501 | ✅ V1 Core |
| §6.1-6.5 | Usuario identity, boundary, ownership, invariants, events | 443-501 | ✅ V1 Core |
| §7 | Relationships between aggregates | 505-537 | ✅ V1 Core |
| §7.1-7.3 | Reference diagram, reference map, navigation rules | 507-536 | ✅ V1 Core |
| §8 | Permitted vs. prohibited references | 540-566 | ✅ V1 Core |
| §8.1-8.3 | Allowed references, prohibited references, controlled exceptions | 542-574 | ✅ V1 Core |
| §9 | Transactional consistency | 582-643 | ✅ V1 Core |
| §9.1-9.3 | Consistency rules, multi-aggregate flows | 584-643 | ✅ V1 Core |
| §10 | Invariants by aggregate | 647-674 | ✅ V1 Core |
| §10.1-10.2 | Invariant summary, transactional vs. domain invariants | 649-673 | ✅ V1 Core |
| §11 | Events by aggregate | 677-697 | ⚠️ **MIXED V1/V2+** |
| §11.1 | **Event matrix** | 679-687 | ⚠️ **MIXED** |
| §11.2 | Critical subscriptions | 689-696 | ✅ V1 Core |
| §12 | Derived information | 700-723 | ✅ V1 Core |
| §12.1-12.2 | Data never stored, derived data stored | 702-722 | ✅ V1 Core |
| §13 | Data never duplicated | 727-773 | ✅ V1 Core |
| §13.1-13.3 | Duplication blacklist, controlled exceptions, SSOT | 729-772 | ✅ V1 Core |
| §14 | Prohibited modeling errors | 777-812 | ✅ V1 Core |
| §14.1-14.3 | Fatal errors, serious errors, concept errors | 779-811 | ✅ V1 Core |

**Subtotal V1 Domain:** ~630 lines (65%)

---

### 1.2 MVP Implementation — 5% of document

**Status:** ✅ Implemented and frozen per CF-050.

| Section | Content | Lines | MVP Status |
|---------|---------|-------|------------|
| §4.3 | Expediente states (V1 subset) | 320-348 | ✅ MVP Implemented |
| | States: Solicitud, PteDocumentación, RevisionManual, Aprobado, Rechazado, Entregado, Cancelado, RechazadoFaltaDatos, Devuelto | | |
| | **NOT in MVP:** EnRevisionPITR, Auditado (V2+ automatic PITR) | | |

**Subtotal MVP Implementation:** ~30 lines (3%)

---

### 1.3 V2+ Evolution — 25% of document

**Status:** ⚠️ **NOT TAGGED** — Violates CF-002 §6.2 (Mandatory V1/V2+ tagging)

| Section | Content | Lines | V2+ Status |
|---------|---------|-------|------------|
| §4.3 | **Expediente states (V2+ subset)** | 320-348 | ⚠️ **NOT TAGGED** |
| | States: EnRevisionPITR, Auditado (automatic PITR processing) | | |
| | Transitions: automatic state changes via PITR motor | | |
| §11.1 | **Event matrix (V2+ events)** | 679-687 | ⚠️ **NOT TAGGED** |
| | Events: AuditoriaIniciada, EvidenciaAnalizada, ContradiccionDetectada, ContradiccionResuelta, ConfianzaCalculada, RevisionManualRequerida | | |
| | These events are **PITR motor events** (V2+ automation) | | |
| §15 | **Evolución V2 — Contrato & Factura aggregates** | 815-893 | ⚠️ **NOT TAGGED** |
| | New aggregates: Contrato, Factura | | |
| | New references, events, invariants for V2 | | |
| §16 | **Evolución V3 — Edificio & DispositivoIoT aggregates** | 897-971 | ⚠️ **NOT TAGGED** |
| | New aggregates: Edificio, DispositivoIoT | | |
| | New references, events, invariants for V3 | | |

**Subtotal V2+ Evolution:** ~240 lines (25%)

---

### 1.4 Operational Backlog — 5% of document

**Status:** ⚠️ **Minimal** — Document is primarily architectural, not operational.

| Section | Content | Lines | Backlog Status |
|---------|---------|-------|-----------------|
| Document header | Metadata, dependencies, audience | 1-13 | ℹ️ Informational |
| Index | Table of contents | 17-34 | ℹ️ Informational |
| Final note | Closing statement | 973-974 | ℹ️ Informational |

**Subtotal Operational Backlog:** ~30 lines (3%)

---

## 2. CONTRADICTIONS & INCONSISTENCIES

### 2.1 Critical Contradiction: Expediente States (§4.3)

**Location:** Lines 320-348  
**Issue:** Section 4.3 presents a **unified state diagram** that mixes V1 (MVP) and V2+ (automatic PITR) states without distinction.

**V1 States (MVP):**
```
Solicitud → PteDocumentación → RevisionManual → Aprobado → Entregado
                                    ↓
                              Rechazado → Devuelto → PteDocumentación
                                    ↓
                              Cancelado
```

**V2+ States (Automatic PITR):**
```
PteDocumentación → EnRevisionPITR → Auditado → RevisionManual
```

**Problem:** The diagram shows `EnRevisionPITR` and `Auditado` as if they exist in MVP, but:
- CF-050 (MVP Freeze) §3 explicitly states: **"Motor PITR automático" is deferred to V2**
- CF-028 (Expediente Workflow) v1.1.0 (normalized) clearly separates V1 flow from V2+ flow
- The state table (lines 336-348) does NOT indicate which states are V1 vs. V2+

**Evidence:**
- CF-050 §4: "Motor PITR automático — Automatización del proceso PITR mediante IA, OCR, LLM, RAG, procesamiento automático, colas y agentes."
- CF-028 v1.1.0 §2.1 [V1]: "Flujo V1 (MVP): Solicitud → PteDocumentación → RevisionManual → Aprobado/Rechazado → Entregado/Devuelto"
- CF-028 v1.1.0 §2.2 [V2+]: "Flujo V2+ (Motor PITR automático): ... → EnRevisionPITR → Auditado → ..."

**Impact:** Developers reading CF-022 may incorrectly assume `EnRevisionPITR` and `Auditado` are MVP states, leading to:
- Incorrect implementation of automatic state transitions
- Violation of CF-050 MVP Freeze
- Architectural deviation from CF-001A (frozen architecture)

**Correction Required:** Tag states as [V1] or [V2+]:
```
| Estado | [V1/V2+] | Descripción | ¿Transiciona automáticamente? |
|--------|----------|-------------|-------------------------------|
| Solicitud | [V1] | ... | No |
| PteDocumentación | [V1] | ... | No |
| EnRevisionPITR | [V2+] | Motor PITR procesando | Sí |
| Auditado | [V2+] | PITR completó análisis automático | Sí |
| RevisionManual | [V1] | ... | No |
| ... | ... | ... | ... |
```

---

### 2.2 Critical Contradiction: Events (§11.1)

**Location:** Lines 679-687  
**Issue:** Event matrix mixes V1 and V2+ events without distinction.

**V1 Events (MVP):**
- `ClienteRegistrado`, `ClienteVerificado`, `ClienteConsentimientoActualizado`, `ClienteEstadoCambiado`, `ClienteDatosActualizados`, `ClienteBajaSolicitada`
- `InmuebleRegistrado`, `InmueblePropietarioCambiado`, `InmuebleCaracteristicasActualizadas`, `InmuebleEstadoCambiado`, `InmuebleDireccionActualizada`
- `ExpedienteSolicitado`, `ExpedienteAsignado`, `DocumentacionRecibida`, `ExpedienteAprobado`, `ExpedienteRechazado`, `CertificadoEntregado`, `ExpedienteCancelado`
- `OrganizacionRegistrada`, `OrganizacionEstadoCambiado`, `OrganizacionConfiguracionActualizada`
- `UsuarioInvitado`, `UsuarioActivado`, `UsuarioEstadoCambiado`, `UsuarioPerfilCambiado`, `UsuarioDatosActualizados`, `UsuarioBaja`

**V2+ Events (Automatic PITR):**
- `AuditoriaIniciada` — Triggered when expediente enters `EnRevisionPITR` (V2+ state)
- `EvidenciaAnalizada` — PITR motor analyzes evidence (V2+ automation)
- `ContradiccionDetectada` — PITR motor detects contradictions (V2+ automation)
- `ContradiccionResuelta` — PITR motor resolves contradictions (V2+ automation)
- `ConfianzaCalculada` — PITR motor calculates confidence (V2+ automation)
- `RevisionManualRequerida` — PITR motor triggers manual review (V2+ automation)

**Problem:** The event matrix (lines 679-687) does NOT indicate which events are V1 vs. V2+. The table shows:
```
| Agregado | Eventos que EMITE | Eventos que CONSUME |
|----------|-------------------|-------------------|
| Expediente | ExpedienteSolicitado, ExpedienteAsignado, DocumentacionRecibida, AuditoriaIniciada, EvidenciaAnalizada, ContradiccionDetectada, ContradiccionResuelta, ConfianzaCalculada, RevisionManualRequerida, ExpedienteAprobado, ExpedienteRechazado, CertificadoEntregado, ExpedienteCancelado | ... |
```

**Impact:** Developers may implement V2+ events (PITR automation) in MVP, violating CF-050.

**Correction Required:** Tag events as [V1] or [V2+]:
```
| Agregado | Eventos que EMITE | Eventos que CONSUME |
|----------|-------------------|-------------------|
| Expediente | [V1] ExpedienteSolicitado, ExpedienteAsignado, DocumentacionRecibida, ExpedienteAprobado, ExpedienteRechazado, CertificadoEntregado, ExpedienteCancelado | [V1] ClienteVerificado, InmueblePropietarioCambiado |
| | [V2+] AuditoriaIniciada, EvidenciaAnalizada, ContradiccionDetectada, ContradiccionResuelta, ConfianzaCalculada, RevisionManualRequerida | |
```

---

### 2.3 Contradiction: Expediente Boundary (§4.2)

**Location:** Lines 239-317  
**Issue:** The Expediente aggregate boundary diagram includes PITR audit data as if it's V1, but the PITR motor is V2+.

**Current text (lines 269-296):**
```
├── AUDITORÍA PITR (Aggregate Entity interna):
│   ├── estadoAuditoría
│   ├── nivelConfianzaGlobal (0-100)
│   ├── nivelConfianzaPorVariable (mapa)
│   ├── evidencias (colección):
│   │   ├── evidenciaId (local al agregado)
│   │   ├── codigoCatalogo (F-001, H-002, ...)
│   │   ├── tipo: [fotografía, documento]
│   │   ├── urlEvidencia
│   │   ├── variablesAfectadas (lista)
│   │   ├── nivelConfianzaParcial (0-100)
│   │   └── metadatosExtracción (json)
│   ├── preguntas (colección):
│   │   ├── preguntaId (local al agregado)
│   │   ├── codigoPregunta (ref. al árbol CF-031)
│   │   ├── respuesta (texto o selección)
│   │   ├── confianzaRespuesta (0-100)
│   │   └── timestamp
│   ├── contradicciones (colección):
│   │   ├── contradiccionId (local al agregado)
│   │   ├── tipo: [evidencia-evidencia, evidencia-certificado]
│   │   ├── gravedad: [leve, media, grave, crítica]
│   │   ├── variableCE3XAfectada
│   │   ├── descripción
│   │   ├── estado: [detectada, en_resolución, resuelta]
│   │   ├── resolucion: texto (si aplica)
│   │   └── resueltaPor: [sistema, arquitecnico_id]
│   └── informePITR: texto (generado al completar)
```

**Problem:** This entire section describes the **PITR audit data structure**, which is:
- **V1 (MVP):** Manual review by AT (no PITR automation)
- **V2+ (Future):** Automatic PITR motor analysis

In MVP, the AT performs manual review without PITR automation. The data structure shown (evidence analysis, confidence levels, contradiction detection) is **V2+ automation logic**, not V1 manual review.

**Evidence:**
- CF-050 §4: "Motor PITR automático" is deferred to V2
- CF-028 v1.1.0 §5 [V1]: "Revisión Manual del AT — El AT revisa manualmente el expediente y emite su dictamen"
- CF-028 v1.1.0 §6.2 [V2+]: "Motor PITR automático — Automatización del análisis de evidencias, cálculo de confianza, detección de contradicciones"

**Correction Required:** Separate V1 and V2+ audit data:

**[V1] Manual Review Data:**
```
├── REVISIÓN MANUAL (Aggregate Entity interna):
│   ├── estadoRevisión: [pendiente, en_revisión, completada]
│   ├── notasAT: texto (observaciones del AT)
│   ├── fechaInicio, fechaFin
│   └── arquitectoTecnicoId (referencia)
```

**[V2+] PITR Audit Data:**
```
├── AUDITORÍA PITR (Aggregate Entity interna) [V2+]:
│   ├── estadoAuditoría
│   ├── nivelConfianzaGlobal (0-100)
│   ├── ... (rest of PITR data)
```

---

### 2.4 Contradiction: Invariants (§10)

**Location:** Lines 647-674  
**Issue:** Some invariants reference V2+ states and events without tagging.

**Example (I-EX-08, line 377):**
```
| I-EX-08 | **Contradicción requiere resolución** | Un expediente no puede pasar a Entregado si existe alguna contradicción en estado `detectada` o `en_resolución`. Todas deben estar `resueltas`. |
```

**Problem:** This invariant assumes:
- Contradictions are **detected** (V2+ PITR automation)
- Contradictions have **states** (detectada, en_resolución, resuelta) (V2+ PITR automation)

In MVP (V1), the AT performs manual review. There is no automatic contradiction detection. The AT may note issues in their review notes, but there's no formal "contradiction" entity with states.

**Correction Required:** Tag invariant as [V2+]:
```
| I-EX-08 | **[V2+] Contradicción requiere resolución** | Un expediente no puede pasar a Entregado si existe alguna contradicción en estado `detectada` o `en_resolución`. Todas deben estar `resueltas`. |
```

---

## 3. DUPLICATIONS & ARCHITECTURE/BACKLOG MIXING

### 3.1 Duplication: Expediente Boundary (§4.2) vs. CF-026 (Expediente Design)

**Location:** CF-022 §4.2 (lines 239-317) vs. CF-026-EXPEDIENTE-DESIGN.md  
**Issue:** Both documents describe the Expediente aggregate boundary in detail.

**CF-022 §4.2:** Comprehensive boundary diagram with all internal entities (PITR audit, evidence, questions, contradictions, state history, notes)

**CF-026:** Detailed design of Expediente aggregate (if it exists)

**Recommendation:** Verify that CF-022 and CF-026 are not duplicating content. If CF-026 exists and is more detailed, CF-022 should reference it rather than duplicate.

---

### 3.2 Duplication: Events (§11) vs. CF-028 (Expediente Workflow)

**Location:** CF-022 §11 (lines 677-697) vs. CF-028 v1.1.0 §11 (Events)  
**Issue:** Both documents list events emitted by aggregates.

**CF-022 §11:** Event matrix showing which aggregates emit and consume events

**CF-028 v1.1.0 §11:** Events in the context of expediente workflow

**Recommendation:** Verify that both documents are consistent. CF-022 should be the authoritative source for domain events; CF-028 should reference CF-022 for event details.

---

### 3.3 Architecture/Backlog Mixing: Sections 15 & 16

**Location:** §15 (Evolución V2) and §16 (Evolución V3)  
**Issue:** These sections describe **future aggregates and evolution**, which is:
- **Architectural** (new Aggregate Roots, new bounded contexts)
- **Operational backlog** (planned for V2/V3, not MVP)

**Problem:** These sections are mixed into a document that is supposed to define **V1 aggregate boundaries**. They should be:
1. **Separated** into a new section "§17 — V2+ Evolution Roadmap"
2. **Tagged** as [V2+] throughout
3. **Referenced** from a V2+ roadmap document, not embedded in V1 architecture

**Recommendation:** Move §15 and §16 to a new section with clear V2+ tagging, or move to a separate document (e.g., CF-022-V2-EVOLUTION.md).

---

## 4. EXACT REORGANIZATION PROPOSAL

### 4.1 Header Update

**Current:**
```
| **Versión** | 1.0 |
| **Fecha** | 2026-07-03 |
```

**Proposed:**
```
| **Versión** | 1.1.0 |
| **Fecha** | 2026-07-03 |
| **Última normalización** | 2026-07-11 |
| **Estado** | APPROVED (pending normalization) |
| **Auditoría** | CF-022-STRUCTURAL-AUDIT.md |
```

---

### 4.2 Index Update

**Add after current index:**
```
## Índice de contenido por versión

### [V1] Contenido estable (MVP)
- §1 Principios fundamentales
- §2 Agregado Cliente
- §3 Agregado Inmueble
- §4 Agregado Expediente (excepto §4.3 V2+)
- §5 Agregado Organización
- §6 Agregado Usuario
- §7 Relaciones entre agregados
- §8 Referencias permitidas vs. prohibidas
- §9 Consistencia transaccional
- §10 Invariantes por agregado
- §11 Eventos por agregado (excepto V2+ events)
- §12 Información derivada
- §13 Datos que nunca deben duplicarse
- §14 Errores de modelado prohibidos

### [V2+] Contenido futuro
- §4.3 Estados del Expediente (subset V2+)
- §11.1 Matriz de eventos (subset V2+)
- §15 Evolución V2
- §16 Evolución V3
- §17 Resumen de evolución V2+ (nuevo)
```

---

### 4.3 Section 4.3 (Expediente States) — Reorganization

**Current:** Single diagram mixing V1 and V2+

**Proposed:** Split into two subsections

**§4.3.1 [V1] Estados del Expediente (MVP)**
```
[Solicitud] ──> [PteDocumentación] ──> [RevisionManual] ──> [Aprobado] ──> [Entregado]
       │              │                       │
       ▼              ▼                       ▼
 [Cancelado]    [RechazadoFaltaDatos]    [Rechazado] ──> [Devuelto] ──> [PteDocumentación]
```

**§4.3.2 [V2+] Estados del Expediente (Motor PITR automático)**
```
[PteDocumentación] ──> [EnRevisionPITR] ──> [Auditado] ──> [RevisionManual]
```

**§4.3.3 [V1] Tabla de estados (MVP)**
```
| Estado | [V1/V2+] | Descripción | ¿Transiciona automáticamente? |
|--------|----------|-------------|-------------------------------|
| Solicitud | [V1] | Creado con datos mínimos del cliente e inmueble | Sí → PteDocumentación (si hay docs) |
| PteDocumentación | [V1] | Esperando certificado original y evidencias | No (espera acción del cliente) |
| EnRevisionPITR | [V2+] | Motor PITR procesando | Sí → Auditado o RevisionManual |
| Auditado | [V2+] | PITR completó análisis automático | Sí → RevisionManual (si confianza < 80%) |
| RevisionManual | [V1] | Arquitecto Técnico revisando | No (espera decisión humana) |
| Aprobado | [V1] | AT valida el resultado | Sí → Entregado |
| Rechazado | [V1] | AT rechaza el certificado | Sí → Devuelto |
| Entregado | [V1] | Certificado auditado entregado | Terminal |
| Cancelado | [V1] | Cliente desiste o expira | Terminal |
| RechazadoFaltaDatos | [V1] | Cliente no aportó documentación a tiempo | Terminal |
| Devuelto | [V1] | Se devuelve al cliente para correcciones | No terminal (puede reingresar como nuevo) |
```

---

### 4.4 Section 11.1 (Event Matrix) — Reorganization

**Current:** Single matrix mixing V1 and V2+ events

**Proposed:** Split into two subsections

**§11.1.1 [V1] Matriz de eventos (MVP)**
```
| Agregado | [V1] Eventos que EMITE | [V1] Eventos que CONSUME |
|----------|------------------------|-------------------------|
| Cliente | ClienteRegistrado, ClienteVerificado, ClienteConsentimientoActualizado, ClienteEstadoCambiado, ClienteDatosActualizados, ClienteBajaSolicitada | — (ninguno, es raíz independiente) |
| Inmueble | InmuebleRegistrado, InmueblePropietarioCambiado, InmuebleCaracteristicasActualizadas, InmuebleEstadoCambiado, InmuebleDireccionActualizada | ExpedienteSolicitado (para saber que hay un nuevo expediente sobre este inmueble) |
| Expediente | [V1] ExpedienteSolicitado, ExpedienteAsignado, DocumentacionRecibida, ExpedienteAprobado, ExpedienteRechazado, CertificadoEntregado, ExpedienteCancelado | [V1] ClienteVerificado, InmueblePropietarioCambiado |
| Organización | OrganizacionRegistrada, OrganizacionEstadoCambiado, OrganizacionConfiguracionActualizada | — (ninguno, es raíz independiente) |
| Usuario | UsuarioInvitado, UsuarioActivado, UsuarioEstadoCambiado, UsuarioPerfilCambiado, UsuarioDatosActualizados, UsuarioBaja | OrganizacionEstadoCambiado (para suspender usuarios si la organización se suspende) |
```

**§11.1.2 [V2+] Matriz de eventos (Motor PITR automático)**
```
| Agregado | [V2+] Eventos que EMITE | Descripción |
|----------|------------------------|-------------|
| Expediente | AuditoriaIniciada | Cuando expediente entra en EnRevisionPITR |
| | EvidenciaAnalizada | Motor PITR analiza evidencia |
| | ContradiccionDetectada | Motor PITR detecta contradicción |
| | ContradiccionResuelta | Motor PITR resuelve contradicción |
| | ConfianzaCalculada | Motor PITR calcula nivel de confianza |
| | RevisionManualRequerida | Motor PITR requiere revisión manual |
```

---

### 4.5 Section 4.2 (Expediente Boundary) — Reorganization

**Current:** Single boundary diagram mixing V1 and V2+ data

**Proposed:** Split into two subsections

**§4.2.1 [V1] Límite del agregado (MVP)**
```
┌──────────────────────────────────────────────────────────────────┐
│                   AGREGADO EXPEDIENTE [V1]                        │
│                                                                  │
│  RAÍZ: Expediente                                                │
│  ├── datosGenerales:                                             │
│  │   ├── tipoServicio: [auditoría, segunda_certificación]        │
│  │   ├── clienteId (referencia a Cliente)                       │
│  │   ├── inmuebleId (referencia a Inmueble)                     │
│  │   ├── arquitecnicoId (referencia a Usuario)                  │
│  │   ├── estado: ver sección 4.3                                │
│  │   ├── tipoCertificado: [original, auditado]                   │
│  │   └── fechaCreación, fechaCierre                             │
│  │                                                               │
│  ├── ESPECIFICACIÓN DEL CERTIFICADO (Value Object):             │
│  │   ├── variablesCE3X: { C1, C2, C3, H1, H2, H3, F1, F2, G1, ... } │
│  │   ├── calificaciónEnergética: letra (A-G)                    │
│  │   ├── emisionesCO2: número                                  │
│  │   ├── técnicoEmisor: nombre, nif, nº_registro               │
│  │   ├── fechaEmisión, fechaValidez                             │
│  │   └── documentoOriginalUrl (enlace al PDF original)          │
│  │                                                               │
│  ├── REVISIÓN MANUAL (Aggregate Entity interna):                │
│  │   ├── estadoRevisión: [pendiente, en_revisión, completada]   │
│  │   ├── notasAT: texto (observaciones del AT)                  │
│  │   ├── fechaInicio, fechaFin                                  │
│  │   └── arquitectoTecnicoId (referencia)                       │
│  │                                                               │
│  ├── HISTORIAL DE CAMBIOS DE ESTADO (inmutable):               │
│  │   ├── cambioId (secuencial)                                  │
│  │   ├── estadoAnterior                                        │
│  │   ├── estadoNuevo                                           │
│  │   ├── timestamp                                             │
│  │   ├── usuarioId (quién realizó el cambio)                   │
│  │   └── motivo                                                │
│  │                                                               │
│  └── NOTAS Y ANEXOS (solo post-entrega):                       │
│      ├── notaId (secuencial)                                    │
│      ├── contenido                                             │
│      ├── fecha                                                 │
│      └── usuarioId                                             │
│                                                                  │
│  NO INCLUYE:                                                     │
│  - Datos del cliente (están en Cliente)                         │
│  - Datos del inmueble (están en Inmueble)                       │
│  - Datos del usuario (están en Usuario)                         │
│  - Catálogo de preguntas PITR (es un catálogo global)          │
│  - [V2+] Auditoría PITR automática (ver §4.2.2)                │
└──────────────────────────────────────────────────────────────────┘
```

**§4.2.2 [V2+] Límite del agregado (Motor PITR automático)**
```
┌──────────────────────────────────────────────────────────────────┐
│              AGREGADO EXPEDIENTE [V2+] — AUDITORÍA PITR           │
│                                                                  │
│  AUDITORÍA PITR (Aggregate Entity interna) [V2+]:               │
│  ├── estadoAuditoría                                            │
│  ├── nivelConfianzaGlobal (0-100)                               │
│  ├── nivelConfianzaPorVariable (mapa)                           │
│  ├── evidencias (colección):                                    │
│  │   ├── evidenciaId (local al agregado)                        │
│  │   ├── codigoCatalogo (F-001, H-002, ...)                     │
│  │   ├── tipo: [fotografía, documento]                          │
│  │   ├── urlEvidencia                                           │
│  │   ├── variablesAfectadas (lista)                            │
│  │   ├── nivelConfianzaParcial (0-100)                          │
│  │   └── metadatosExtracción (json)                            │
│  ├── preguntas (colección):                                     │
│  │   ├── preguntaId (local al agregado)                         │
│  │   ├── codigoPregunta (ref. al árbol CF-031)                  │
│  │   ├── respuesta (texto o selección)                          │
│  │   ├── confianzaRespuesta (0-100)                            │
│  │   └── timestamp                                             │
│  ├── contradicciones (colección):                               │
│  │   ├── contradiccionId (local al agregado)                    │
│  │   ├── tipo: [evidencia-evidencia, evidencia-certificado]     │
│  │   ├── gravedad: [leve, media, grave, crítica]               │
│  │   ├── variableCE3XAfectada                                  │
│  │   ├── descripción                                           │
│  │   ├── estado: [detectada, en_resolución, resuelta]          │
│  │   ├── resolucion: texto (si aplica)                         │
│  │   └── resueltaPor: [sistema, arquitecnico_id]               │
│  └── informePITR: texto (generado al completar)                │
└──────────────────────────────────────────────────────────────────┘
```

---

### 4.6 Invariants (§10) — Add V1/V2+ Tags

**Current:** Invariants listed without V1/V2+ distinction

**Proposed:** Add [V1] or [V2+] tag to each invariant

**Example:**
```
| # | Invariante | [V1/V2+] | Descripción |
|---|------------|----------|-------------|
| I-EX-01 | **Cliente e inmueble existen** | [V1] | clienteId e inmuebleId deben referenciar agregados existentes. |
| I-EX-02 | **Un expediente activo por inmueble** | [V1] | Un inmueble no puede tener más de un expediente en curso simultáneamente. |
| I-EX-03 | **Asignación obligatoria** | [V1] | Un expediente no puede pasar de Solicitud sin tener un arquitecto_técnico_id asignado. |
| I-EX-04 | **Orden de estados** | [V1] | Las transiciones de estado deben seguir el grafo definido en 4.3. |
| I-EX-05 | **Inmutabilidad post-entrega** | [V1] | Una vez en estado Entregado, solo se pueden añadir notas y anexos. |
| I-EX-06 | **Consistencia de confianza** | [V2+] | nivelConfianzaGlobal debe ser la media ponderada de los nivelConfianzaPorVariable. |
| I-EX-07 | **Evidencia no modificable tras procesada** | [V2+] | Una vez que una evidencia ha sido analizada, no puede modificarse ni eliminarse. |
| I-EX-08 | **Contradicción requiere resolución** | [V2+] | Un expediente no puede pasar a Entregado si existe alguna contradicción en estado `detectada` o `en_resolución`. |
| I-EX-09 | **Variables CE3X completas** | [V1] | Todas las variables CE3X requeridas deben tener un valor. |
| I-EX-10 | **Documentación mínima** | [V1] | Un expediente no puede pasar a EnRevisionPITR si no tiene al menos el certificado original cargado. |
```

---

### 4.7 New Section: §17 — V2+ Evolution Summary

**Location:** After §16, before final note

**Content:**
```
## 17. Resumen de evolución V2+

### 17.1 Cambios en agregados existentes

| Agregado | Cambios V2+ | Sección |
|----------|------------|---------|
| Expediente | Nuevos estados (EnRevisionPITR, Auditado), nuevos eventos (AuditoriaIniciada, EvidenciaAnalizada, ...), nueva entidad interna (AUDITORÍA PITR) | §4.3.2, §11.1.2, §4.2.2 |
| Usuario | Nuevo rol: Certificador Externo (V3) | §16.4 |

### 17.2 Nuevos agregados V2

| Agregado | Descripción | Sección |
|----------|-------------|---------|
| Contrato | Gestión de contratos con clientes | §15.1 |
| Factura | Gestión de facturación | §15.2 |

### 17.3 Nuevos agregados V3

| Agregado | Descripción | Sección |
|----------|-------------|---------|
| Edificio | Agrupación de inmuebles | §16.1 |
| DispositivoIoT | Sensores y dispositivos conectados | §16.2 |

### 17.4 Nota importante

Todos los cambios descritos en §15 y §16 están **bloqueados para MVP** según CF-050 (MVP Freeze). No deben implementarse hasta que se apruebe explícitamente la transición a V2 o V3.
```

---

## 5. RISKS & IMPACT ANALYSIS

### 5.1 Risk: Incorrect MVP Implementation

**Risk Level:** 🔴 **CRITICAL**

**Description:** Developers reading CF-022 without clear V1/V2+ separation may implement:
- Automatic state transitions (EnRevisionPITR → Auditado) in MVP
- PITR automation events (AuditoriaIniciada, EvidenciaAnalizada) in MVP
- Contradiction detection and resolution logic in MVP

**Impact:**
- Violation of CF-050 (MVP Freeze)
- Architectural deviation from CF-001A (frozen architecture)
- Scope creep and delayed MVP delivery
- Increased complexity and testing burden

**Mitigation:**
- ✅ Add [V1] and [V2+] tags to all sections
- ✅ Separate V1 and V2+ content into distinct subsections
- ✅ Update CF-028 (Expediente Workflow) to reference CF-022 for domain definitions
- ✅ Create audit document (this document) to track normalization

---

### 5.2 Risk: Inconsistency with CF-028

**Risk Level:** 🟡 **HIGH**

**Description:** CF-022 and CF-028 may describe different state diagrams or event flows.

**Current Status:**
- CF-028 v1.1.0 (normalized) clearly separates V1 and V2+ flows
- CF-022 v1.0 (not normalized) mixes V1 and V2+ without distinction

**Impact:**
- Developers may follow CF-028 for workflow but CF-022 for domain model, creating inconsistency
- Confusion about which document is authoritative

**Mitigation:**
- ✅ Normalize CF-022 to match CF-028 v1.1.0 structure
- ✅ Add cross-references between CF-022 and CF-028
- ✅ Verify consistency after normalization (create audit document)

---

### 5.3 Risk: Duplication with CF-026

**Risk Level:** 🟡 **MEDIUM**

**Description:** CF-022 §4.2 (Expediente boundary) may duplicate content from CF-026 (Expediente Design).

**Impact:**
- Maintenance burden (changes must be made in two places)
- Risk of inconsistency between documents
- Unclear which document is authoritative

**Mitigation:**
- ✅ Verify that CF-022 and CF-026 are not duplicating content
- ✅ If duplication exists, consolidate into one document and reference from the other
- ✅ Update CF-002 (Documentation Governance) to clarify ownership

---

### 5.4 Risk: Sections 15 & 16 Scope Creep

**Risk Level:** 🟡 **MEDIUM**

**Description:** Sections 15 (Evolución V2) and 16 (Evolución V3) describe future aggregates and evolution, which may be confused with MVP scope.

**Impact:**
- Developers may start implementing V2/V3 features during MVP
- Scope creep and delayed MVP delivery
- Violation of CF-050 (MVP Freeze)

**Mitigation:**
- ✅ Move §15 and §16 to a separate section (§17) with clear [V2+] tagging
- ✅ Add warning note that V2/V3 content is blocked for MVP
- ✅ Reference CF-050 (MVP Freeze) for scope clarification

---

## 6. NORMALIZATION CHECKLIST

### 6.1 Pre-Normalization Verification

- [ ] User approves this audit document
- [ ] User confirms that CF-022 should be normalized following CF-002
- [ ] User confirms that V1/V2+ separation is the correct approach

### 6.2 Normalization Tasks

- [ ] Update header: version, date, audit reference, status
- [ ] Add index of content by version (V1 vs. V2+)
- [ ] Section 4.2 (Expediente Boundary): Split into §4.2.1 [V1] and §4.2.2 [V2+]
- [ ] Section 4.3 (Expediente States): Split into §4.3.1 [V1], §4.3.2 [V2+], §4.3.3 [V1] table
- [ ] Section 10 (Invariants): Add [V1] or [V2+] tags to each invariant
- [ ] Section 11.1 (Event Matrix): Split into §11.1.1 [V1] and §11.1.2 [V2+]
- [ ] Create new section §17 (V2+ Evolution Summary)
- [ ] Add cross-references to CF-028, CF-050, CF-002
- [ ] Update final note with normalization status

### 6.3 Post-Normalization Verification

- [ ] All sections have [V1], [V2+], or [V1+V2] tags
- [ ] V1 and V2+ content are clearly separated
- [ ] No contradictions between CF-022 and CF-028
- [ ] No contradictions between CF-022 and CF-050
- [ ] Invariants are correctly tagged
- [ ] Events are correctly tagged
- [ ] States are correctly tagged
- [ ] Create CF-022-NORMALIZACION-AUDITORIA.md (similar to CF-028-NORMALIZACION-AUDITORIA.md)

---

## 7. CONCLUSION

CF-022 is **architecturally sound** but **structurally mixed**. The document combines V1 domain definitions with V2+ evolution content without clear separation, violating CF-002 (Documentation Governance) §6.2 (Mandatory V1/V2+ tagging).

**Key Findings:**
1. ✅ V1 domain content (65%) is correct and frozen per CF-001A
2. ⚠️ V2+ evolution content (25%) is not tagged, violating CF-002
3. ⚠️ Critical contradictions exist in §4.3 (states) and §11.1 (events)
4. ⚠️ Sections 15 & 16 should be consolidated into §17 with clear V2+ tagging

**Recommendation:** Normalize CF-022 following CF-002 by adding [V1]/[V2+] tags and separating content into distinct subsections. This will:
- Prevent incorrect MVP implementation
- Ensure consistency with CF-028 (normalized)
- Comply with CF-002 (Documentation Governance)
- Reduce risk of scope creep and architectural deviation

**Next Steps:**
1. User reviews and approves this audit
2. Agent normalizes CF-022 following the reorganization proposal (§4)
3. Agent creates CF-022-NORMALIZACION-AUDITORIA.md (post-normalization verification)
4. User approves normalized CF-022
5. Document is frozen and referenced as authoritative source for domain model

---

**Audit Status:** ✅ COMPLETE — Awaiting user approval before normalization begins

**Auditor:** Agente de Arquitectura  
**Date:** 11/07/2026  
**Document:** CF-022-STRUCTURAL-AUDIT.md
