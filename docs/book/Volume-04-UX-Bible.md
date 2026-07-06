# Volume IV — UX Bible

## The User Experience Design of Certilab Platform

---

**Volume:** IV of VII
**Status:** ✅ ACTIVE
**Last Updated:** 2026-07-05
**Estimated Pages:** 200–250

---

## Table of Contents

1. [UX Philosophy](#1-ux-philosophy)
2. [The AT Workflow](#2-the-at-workflow)
3. [The Client Journey](#3-the-client-journey)
4. [The Case File Lifecycle](#4-the-case-file-lifecycle)
5. [Screen-by-Screen UX Specifications](#5-screen-by-screen-ux-specifications)
6. [Error States for Every Screen](#6-error-states-for-every-screen)
7. [Empty States for Every Screen](#7-empty-states-for-every-screen)
8. [Loading States for Every Screen](#8-loading-states-for-every-screen)
9. [Confirmation Patterns](#9-confirmation-patterns)
10. [Mobile Adaptation Notes](#10-mobile-adaptation-notes)
11. [Accessibility Requirements](#11-accessibility-requirements)
12. [UX Micro-Copy Patterns](#12-ux-micro-copy-patterns)
13. [User Testing Plan](#13-user-testing-plan)
14. [Open UX Questions](#14-open-ux-questions)

---

## 1. UX Philosophy

### 1.1 The Ten Commandments of Certilab UX

These commandments are the foundation of every UX decision. They are not suggestions. They are rules.

#### I. The Platform Must Disappear

The user's focus must be on the work — the case file, the documents, the PITR™ analysis, the client. Not on the interface. Not on navigation. Not on finding the right button.

> **Test:** If a user describes their experience in terms of software ("I clicked here, then there"), the platform is too visible. If they describe it in terms of their work ("I reviewed the certificate, found an error, requested corrections"), the platform is invisible.

**✅ Correct:** A one-click action that performs the task immediately.
**❌ Incorrect:** A three-step wizard for a task that could be a single action.

#### II. Every Interaction Must Have Purpose

Every element on every screen must answer: "Does this help the professional work better?" If the answer is no, it must not exist.

**✅ Correct:** A status badge that immediately communicates the case file's state.
**❌ Incorrect:** A decorative illustration on the dashboard that communicates nothing.

#### III. Silence Is the Default

The ideal state of the platform is silence. No notifications. No banners. No alerts. The platform should only speak when it has something important to say.

**✅ Correct:** A subtle toast confirming a successful action, auto-dismissed.
**❌ Incorrect:** A celebratory modal with confetti after saving a draft.

#### IV. Reduce Cognitive Load

Every decision the user must make, every piece of information they must process, costs mental energy. The platform must minimise this cost.

**✅ Correct:** Pre-populated default values, smart defaults, remembered preferences.
**❌ Incorrect:** Empty forms with no defaults, requiring the user to fill everything from scratch.

#### V. Errors Are Conversations

An error is not a failure. It is a conversation. The platform tells the user what went wrong, why it went wrong, and what to do about it.

**✅ Correct:** "El certificado no se ha podido procesar. El archivo supera el tamaño máximo permitido (10 MB). Reduce el tamaño del archivo e inténtalo de nuevo."
**❌ Incorrect:** "Error 500. Contacta con soporte."

#### VI. Consistency Builds Trust

The same action must work the same way everywhere. The same information must appear in the same place on every screen. Consistency builds predictability, and predictability builds trust.

**✅ Correct:** The "Guardar" button always appears in the same position with the same visual treatment.
**❌ Incorrect:** "Guardar" is a button on one screen and a link on another.

#### VII. Protect the User's Work

Work in progress must never be lost. The platform should autosave, warn before navigation, and recover gracefully from session timeouts.

**✅ Correct:** Autosave every 30 seconds with a subtle "Guardado" indicator.
**❌ Incorrect:** A form that loses all input when the user accidentally navigates away.

#### VIII. Progress Must Be Visible

The user must always know where they are, what has been done, and what remains. This is especially critical for the AT workflow, where case files move through multiple states.

**✅ Correct:** A progress indicator showing completed, current, and pending steps.
**❌ Incorrect:** A case file that changes state without any notification to the user.

#### IX. Favour the Expert

The AT is a professional who uses the platform daily. The interface should favour their speed and efficiency over the needs of a first-time user.

**✅ Correct:** Keyboard shortcuts, bulk actions, customisable views.
**❌ Incorrect:** A chatbot that interrupts the workflow with "How can I help you?" on every page.

#### X. Accessibility Is Not Optional

Every interaction must be accessible to every user, regardless of ability. Accessibility is a design requirement, not a constraint.

**✅ Correct:** All interactive elements are keyboard accessible and screen reader compatible.
**❌ Incorrect:** A drag-and-drop interface that requires a mouse and has no keyboard alternative.

### 1.2 The UX North Star

The ultimate measure of UX success at Certilab is:

> **The AT completes their work with fewer clicks, less reading, and less thinking than before.**

Every feature, every screen, every micro-interaction must be evaluated against this measure.

### 1.3 Design Principles for UX

| Principle | What It Means | How We Measure |
|-----------|---------------|----------------|
| Frictionless | Remove unnecessary steps | Task completion time |
| Predictable | Behave consistently | User error rate |
| Forgiving | Protect from mistakes | Recovery actions needed |
| Informative | Communicate clearly | Support tickets related to UX |
| Efficient | Minimise effort | Clicks per task |
| Respectful | Never waste time | Time to value |

---

## 2. The AT Workflow

### 2.1 End-to-End Audit Process

The AT (Arquitecto Técnico) workflow is the core flow of the platform. Every UX decision must support and accelerate this workflow.

```
┌─────────────────────────────────────────────────────────────┐
│                      AT WORKFLOW                              │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐│
│  │ Assigned │→│ Case     │→│ PITR™   │→│              ││
│  │ Case     │  │ Review   │  │ Analysis │  │ Report       ││
│  └──────────┘  └──────────┘  └──────────┘  │ Generation   ││
│                              ┌──────────┐   └──────────────┘│
│                              │ Corrections│                 │
│                              │ Loop      │                  │
│                              └──────────┘                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐│
│  │ Quality  │→│ Client   │→│ Result   │→│ Case         ││
│  │ Review   │  │ Delivery  │  │ Feedback  ││ Closed       ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Phase Descriptions

#### Phase 1: Case Assignment
- **Trigger:** Client submits a second opinion request.
- **AT action:** Review case summary, accept or decline.
- **UX requirements:** Clear case overview (property type, urgency, requested service). One-click accept. Visibility of queue position and expected workload.

#### Phase 2: Document Review
- **Trigger:** AT accepts the case.
- **AT action:** Review all client-uploaded documents (certificates, plans, photos).
- **UX requirements:** Document viewer with zoom/rotate, split-view for comparison, annotation tools, checklist of required documents.

#### Phase 3: PITR™ Analysis
- **Trigger:** Documents reviewed.
- **AT action:** Complete the PITR™ (Peritaje Inteligente Técnico Razonado) question tree.
- **UX requirements:** Guided question flow, auto-save after each answer, progress indicator, ability to skip and return, reference material accessible inline.

#### Phase 4: Report Generation
- **Trigger:** PITR™ analysis complete.
- **AT action:** Review auto-generated report, make adjustments, approve.
- **UX requirements:** WYSIWYG editor for report adjustments, one-click regeneration, version history.

#### Phase 5: Corrections Loop
- **Trigger:** Issues identified during analysis.
- **AT action:** Request corrections from the client, track their progress, review corrected documents.
- **UX requirements:** Clear communication channel (messages or structured requests), status tracking of requested corrections, re-review queue.

#### Phase 6: Quality Review
- **Trigger:** Analysis and report complete.
- **AT action:** Final review before client delivery.
- **UX requirements:** Summary view of all work done, checklist of verification items, one-click final approval.

#### Phase 7: Client Delivery
- **Trigger:** Quality review approved.
- **AT action:** Deliver the final report to the client.
- **UX requirements:** Delivery confirmation, automatic client notification, record of delivery timestamp.

#### Phase 8: Case Closure
- **Trigger:** Client receives the report.
- **AT action:** Archive case, add notes for future reference.
- **UX requirements:** Archive with proper indexing, searchable notes, case reopening capability.

### 2.3 Time Targets

| Phase | Target Time | Measure |
|-------|-------------|---------|
| Case acceptance | < 2 hours from assignment | Mean time to acceptance |
| Document review | < 4 hours | Mean review time |
| PITR™ analysis | < 2 hours | Mean PITR™ completion time |
| Report generation | < 1 hour | Mean generation time |
| Quality review | < 30 minutes | Mean review time |
| Total (simple case) | < 8 hours | Mean case completion time |
| Total (complex case) | < 24 hours | Mean case completion time |

These time targets are aspirational for V1 and should be validated against real usage data.

### 2.4 The Correction Loop

```
                 ┌──────────────────┐
                 │  Corrections     │
                 │  Requested       │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │  Client          │
                 │  Submits         │
                 │  Corrections     │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │  AT Reviews      │
                 │  Corrections     │
                 └──┬──────────┬────┘
                    │          │
         Satisfied  │          │  Not satisfied
                    ▼          ▼
         ┌────────────┐  ┌──────────────────┐
         │ Continue    │  │ Corrections      │
         │ to Delivery │  │ Requested        │
         └────────────┘  │ Again            │
                         └──────────────────┘
```

**UX requirements:**
- Clear indication of what needs correction (highlighted sections, specific notes).
- Side-by-side comparison of original vs corrected documents.
- Limit of 3 correction cycles before escalation (configurable per case type).

---

## 3. The Client Journey

### 3.1 Journey Map

```
Phase 1: Discovery      Phase 2: Decision     Phase 3: Onboarding
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Finds Certilab  │    │ Reviews pricing │    │ Creates account │
│ via search/refer│    │ Compares options│    │ Enters property │
│ Reads about     │    │ Decides to      │    │ info            │
│ service         │    │ request opinion │    │ Uploads docs    │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │                     │                      │
         ▼                     ▼                      ▼
Phase 4: Waiting        Phase 5: AT Work        Phase 6: Corrections
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Receives        │    │ AT analyzes     │    │ Receives        │
│ confirmation    │    │ case            │    │ correction      │
│ Sees status     │    │ Client sees     │    │ request         │
│ Can track       │    │ status updates  │    │ Uploads new     │
│ progress        │    │                 │    │ docs            │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │                     │                      │
         ▼                     ▼                      ▼
Phase 7: Delivery       Phase 8: Post-Service
┌─────────────────┐    ┌─────────────────┐
│ Receives report  │    │ Leaves review   │
│ Downloads PDF   │    │ Can request     │
│ Can ask         │    │ second review   │
│ questions       │    │ Becomes repeat  │
│                 │    │ client          │
└─────────────────┘    └─────────────────┘
```

### 3.2 Moments of Truth

#### Moment 1: The Landing Page (5 seconds)
The client decides whether Certilab is trustworthy.

**UX requirements:**
- Clear value proposition in one sentence.
- Professional design that conveys expertise.
- Trust signals (experience, credentials, testimonials).

#### Moment 2: The Payment Decision
The client decides whether the service is worth the cost.

**UX requirements:**
- Transparent pricing with no hidden fees.
- Clear scope of what's included.
- Money-back guarantee or satisfaction promise.

#### Moment 3: The Report Reception
The client opens the report and judges its quality.

**UX requirements:**
- Professional PDF formatting.
- Clear, actionable conclusions.
- Explanation of findings in accessible language.

### 3.3 Client Communication Touchpoints

| Touchpoint | Channel | Content | Timing |
|------------|---------|---------|--------|
| Confirmation | Email + In-app | "Tu solicitud ha sido recibida" | Immediate |
| AT assigned | Email | "Un AT ha comenzado a revisar tu caso" | When AT accepts |
| Corrections needed | Email + In-app | "Necesitamos documentación adicional" | When AT requests |
| Report ready | Email + In-app | "Tu segunda opinión está lista" | When report is delivered |
| Follow-up | Email | "¿Cómo fue tu experiencia?" | 7 days after delivery |

### 3.4 Client-Side UX Principles

1. **No jargon.** Use client-friendly language throughout the client-facing interface.
2. **Status transparency.** The client should always know where their case is in the process.
3. **Minimal friction.** Reduce the number of steps to submit a request.
4. **Mobile-first.** Most clients will interact through their phone.
5. **Trust signals.** Display credentials, experience, and social proof prominently.

---

## 4. The Case File Lifecycle

### 4.1 State Machine

```
                  ┌──────────────────┐
                  │   SOLICITADO     │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │  EN PREPARACIÓN  │
                  │  (Client uploads │
                  │   documents)     │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │  PENDIENTE AT    │
                  │  (In queue for   │
                  │   assignment)    │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │  EN REVISIÓN AT  │
                  └──┬────────────┬──┘
                     │            │
                     ▼            ▼
            ┌────────────┐  ┌────────────┐
            │ CORRECCIONES│  │ EN ANÁLISIS│
            │ SOLICITADAS │  │ PITR™     │
            └──────┬─────┘  └──────┬─────┘
                   │               │
                   ▼               ▼
            ┌────────────┐  ┌────────────┐
            │ Cliente     │  │ INFORME    │
            │ subsana     │  │ GENERADO   │
            └──────┬─────┘  └──────┬─────┘
                   │               │
                   └───────┬───────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │  CONTROL CALIDAD │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │  ENTREGADO       │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │  CERRADO         │
                  │  (Archived)      │
                  └──────────────────┘
```

### 4.2 State Transitions

| From | To | Trigger | Who |
|------|-----|---------|-----|
| SOLICITADO | EN PREPARACIÓN | Client begins upload | Client |
| EN PREPARACIÓN | PENDIENTE AT | Client marks as complete | Client |
| PENDIENTE AT | EN REVISIÓN AT | AT accepts case | AT |
| EN REVISIÓN AT | CORRECCIONES SOLICITADAS | AT requests changes | AT |
| EN REVISIÓN AT | EN ANÁLISIS PITR™ | AT begins analysis | AT |
| CORRECCIONES SOLICITADAS | EN REVISIÓN AT | Client submits corrections | Client |
| EN ANÁLISIS PITR™ | INFORME GENERADO | PITR™ completed | System |
| INFORME GENERADO | CONTROL CALIDAD | AT submits for QC | AT |
| CONTROL CALIDAD | ENTREGADO | QC approved | AT |
| ENTREGADO | CERRADO | Client acknowledges or 30 days | System |

### 4.3 State-Specific UX

| State | Client Sees | AT Sees |
|-------|-------------|---------|
| SOLICITADO | "Tu solicitud ha sido recibida" | In queue |
| EN PREPARACIÓN | Document upload interface | Waiting for docs |
| PENDIENTE AT | "Buscando el AT ideal para tu caso" | Assignable in dashboard |
| EN REVISIÓN AT | "Tu caso está siendo revisado" | Case detail / doc review |
| CORRECCIONES SOLICITADAS | Corrections request details | Waiting for client |
| EN ANÁLISIS PITR™ | "Análisis en profundidad" | PITR™ interface |
| INFORME GENERADO | "Informe en preparación" | Report review |
| CONTROL CALIDAD | "Control de calidad" | Quality checklist |
| ENTREGADO | "Tu segunda opinión está lista" | Case completed in dashboard |
| CERRADO | Archived in "Mis expedientes" | Archived in dashboard |

---

## 5. Screen-by-Screen UX Specifications

### 5.1 Landing Page (Client-Facing)

**Purpose:** Convert visitors into requesting a second opinion.

**Key UX requirements:**
- Hero section: Value proposition in one sentence: "La segunda opinión técnica para certificados energéticos."
- How it works: 3-step explanation (upload → review → receive).
- Trust signals: AT credentials, years of experience, number of cases completed.
- CTA: Primary button "Solicitar segunda opinión."
- Footer: Legal information, privacy policy, terms of service.

**States:**
- **Default:** Full landing page with all sections.
- **Loading:** Skeleton matching the hero layout.
- **Error:** If hero content fails to load, show abbreviated version with retry.
- **Empty:** N/A (static marketing content).

**Mobile:**
- Single-column stack of sections.
- CTA is sticky at the bottom on mobile viewports.
- Navigation collapses to hamburger menu.

**Accessibility:**
- All images must have alt text.
- Skip navigation link at top.
- Colour contrast for all text on backgrounds.

### 5.2 Second Opinion Request Flow

**Purpose:** Collect client and property information for the AT to review.

**Flow:**

```
Step 1: Property Info
  - Street address (autocomplete via Spanish cadastre API)
  - Property type (dropdown: piso, casa unifamiliar, local comercial, etc.)
  - Year built
  - Surface area (m²)

Step 2: Certificate Info
  - Upload existing certificate (PDF, max 10MB)
  - Certificate registration number
  - Issuing date
  - Current energy rating (dropdown: A-G)

Step 3: Request Details
  - Reason for second opinion (dropdown: compra-venta, alquiler, discrepancia, otros)
  - Additional notes (textarea)
  - Urgency level (dropdown: normal, urgente)

Step 4: Review & Submit
  - Summary of all entered information
  - Edit links for each section
  - Submit button
```

**Key UX requirements:**
- Progress indicator showing steps 1-4.
- Autosave after each step.
- Ability to save as draft and continue later.
- Mobile-optimised form fields (large touch targets, appropriate input types).

**States:**
- **Default:** Step 1 displayed with empty form.
- **Loading:** Spinner on "Siguiente" button while saving.
- **Empty:** N/A (form is the content).
- **Error per field:** Inline validation messages.
- **Error on submit:** Toast + scroll to first error.
- **Success (draft saved):** Toast "Borrador guardado."

**Confirmation patterns:**
- On "Salir sin guardar" (if user tries to navigate away): "¿Seguro que quieres salir? Si sales, perderás los datos no guardados."
- On submit: "¿Confirmas que los datos son correctos?"

**Accessibility:**
- All inputs have labels.
- Error messages are announced by screen readers.
- Step indicator is navigable by keyboard.
- Time limit on session: 30 minutes inactivity warning.

### 5.3 AT Dashboard

**Purpose:** Central workspace for the AT to manage their caseload.

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [Logo]                [Search]  [Notifications] [AT]│
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐│
│  │  Summary Cards                                   ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────┐ ││
│  │  │Pendientes│ │En Revis.│ │Correcc. │ │Compl.│ ││
│  │  │    12    │ │    8    │ │    3    │ │  45  │ ││
│  │  └─────────┘ └─────────┘ └─────────┘ └──────┘ ││
│  └─────────────────────────────────────────────────┘│
│                                                      │
│  ┌─────────────────────────────────────────────────┐│
│  │  Case File List                                  ││
│  │  ┌────────┬────────┬──────────┬────────┬──────┐││
│  │  │ Cliente│ Estado │ Prioridad│ Fecha  │Acción│││
│  │  ├────────┼────────┼──────────┼────────┼──────┤││
│  │  │ García │ En rev │ Alta     │ 15/07  │ [▶] │││
│  │  │ López  │ Corre  │ Normal   │ 14/07  │ [▶] │││
│  │  │ Martí  │ PITR™  │ Urgente  │ 14/07  │ [▶] │││
│  │  └────────┴────────┴──────────┴────────┴──────┘││
│  └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

**Key UX requirements:**
- Summary cards with counts, clickable to filter the list below.
- Sortable columns in the case list.
- Color-coded priority indicators.
- Quick actions (▶ to open case) without full page load.
- Keyboard shortcuts: `N` new case, `F` focus search, `1-4` filter by state.

**States:**
- **Loading:** Skeleton for summary cards + table rows.
- **Empty (no cases):** "No tienes casos pendientes. Los nuevos casos aparecerán aquí."
- **Empty (filtered):** "No se encontraron casos con este filtro." + "Limpiar filtros" button.
- **Error:** Toast "Error al cargar los casos. Inténtalo de nuevo." + retry button.

**Mobile:**
- Summary cards stack 2x2.
- Table becomes card list (each case is a card with key info and actions).
- Filter is a bottom sheet.

**Accessibility:**
- Table has proper `role="grid"` with `aria-sort` on headers.
- Summary cards have `aria-label` with count and type.
- Keyboard navigation within table.

### 5.4 Case File Detail View

**Purpose:** Complete view of a single case with all its information and actions.

**Layout (AT view):**
```
┌─────────────────────────────────────────────────────┐
│  ← Volver al listado                                 │
│  [Breadcrumbs: Inicio > Caso #1234]                  │
│                                                      │
│  ┌─── Client Info ──────────┐ ┌─── Actions ───────┐│
│  │  Cliente: María García   │ │  [Estado: PITR™]  ││
│  │  Inmueble: C/ Mayor 15   │ │  [Editar] [Msg]   ││
│  │  Solicitado: 14/07/2026  │ │  [Acciones ▼]     ││
│  └──────────────────────────┘ └───────────────────┘│
│                                                      │
│  ┌─────────────────────────────────────────────────┐│
│  │  Tabs: [Documentos] [Análisis] [Informe] [Msgs] ││
│  ├─────────────────────────────────────────────────┤│
│  │                                                 ││
│  │  Tab content (changes based on selected tab)    ││
│  │                                                 ││
│  └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

**Key UX requirements:**
- Tabs for organising case sections.
- State-dependent available actions (e.g., "Iniciar PITR™" only when in "En revisión" state).
- Document viewer in the Documents tab.
- PITR™ interface in the Analysis tab.
- Report preview in the Informe tab.
- Message thread for client communication.

**States:**
- **Loading:** Skeleton matching the two-column layout.
- **Empty (tab):** Each tab has its own empty state (e.g., "No hay documentos para este caso").
- **Error:** Toast on load failure, inline error on action failure.
- **State transitions:** Visual indicator (subtle pulse) when case state changes.

**Mobile:**
- Two-column layout collapses to single column.
- Tabs become scrollable (left/right swipe or horizontal scroll).
- Actions button becomes sticky at the bottom.

**Accessibility:**
- Tabs have proper `role="tablist"` with `aria-selected`.
- Tab panels have `role="tabpanel"` with `aria-labelledby`.
- State changes are announced via `aria-live` region.

### 5.5 Document Review Interface

**Purpose:** The AT reviews client-uploaded documents.

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  ┌─ Document List (left) ──┐ ┌─ Viewer (right) ──┐│
│  │  ✓ Certificado. pdf     │ │  ┌──────────────┐ ││
│  │  ○ Plano.pdf            │ │  │              │ ││
│  │  ○ Fotos interiores.zip │ │  │  Document     │ ││
│  │  ○ Notas.pdf            │ │  │  Viewer       │ ││
│  │                         │ │  │              │ ││
│  │  [Subir documento]      │ │  │              │ ││
│  └─────────────────────────┘ │  └──────────────┘ ││
│                              │  [−] [+] [↺] [🔍] ││
│                              └───────────────────┘│
└─────────────────────────────────────────────────────┘
```

**Key UX requirements:**
- Document list with status (viewed, pending, new).
- Inline preview for PDFs and images.
- Zoom controls, rotate, full-screen mode.
- Document comparison (side-by-side view for corrected documents).
- Annotation tools (highlight, comment).

**States:**
- **Loading:** Document list shows file names with skeleton icons. Viewer shows spinner.
- **Empty (no documents):** "No se han subido documentos. Solicita al cliente que los suba." + "Notificar al cliente" button.
- **Empty (no viewer selection):** "Selecciona un documento para visualizarlo."
- **Error (file load failure):** "No se ha podido cargar el documento. Puede estar dañado." + "Descargar" button as fallback.

**Mobile:**
- Document list is a bottom sheet overlay.
- Viewer takes full screen.
- Pinch to zoom.

**Accessibility:**
- Document images have text descriptions.
- Viewer controls have accessible labels.
- Keyboard shortcuts for zoom (Ctrl++/Ctrl+-).

### 5.6 PITR™ Question Tree Interaction

**Purpose:** The AT completes the structured question tree for the audit.

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  Progress: ███████████░░░░░░░  65%                  │
│  Categoría: Cerramientos                             │
│                                                      │
│  Pregunta 12 de 45                                   │
│  ┌─────────────────────────────────────────────────┐│
│  │                                                 ││
│  │  ¿El cerramiento de fachada presenta puentes   ││
│  │  térmicos en los encuentros con forjados?       ││
│  │                                                 ││
│  │  ○ Sí                                          ││
│  │  ○ No                                          ││
│  │  ○ No aplicable                                ││
│  │  ○ No se puede determinar                      ││
│  │                                                 ││
│  │  Notas adicionales (opcional):                 ││
│  │  ┌──────────────────────────────────────────┐  ││
│  │  │                                          │  ││
│  │  └──────────────────────────────────────────┘  ││
│  └─────────────────────────────────────────────────┘│
│                                                      │
│  [← Anterior]                          [Siguiente →]│
│                                                     │
│  Referencias: [Ver guía técnica] [Ver normativa]    │
└─────────────────────────────────────────────────────┘
```

**Key UX requirements:**
- Clear progress indicator with percentage and "X of Y" count.
- Category label for context.
- Each question is a single decision point (not multiple questions per page).
- Optional notes field per question.
- "No aplicable" and "No se puede determinar" options to avoid forcing choices.
- Reference documents accessible without leaving the interface (slide-out panel).
- Auto-save after each question answered.
- Ability to skip and return (marked as "Pendiente" in progress).

**States:**
- **Loading:** Skeleton for question card.
- **Empty:** N/A (first question is always loaded).
- **Error on save:** "No se ha podido guardar tu respuesta." + "Reintentar" button. Auto-retry when connection returns.
- **All complete:** "Cuestionario completado. Revisa tus respuestas antes de continuar." + "Revisar respuestas" and "Generar informe" buttons.

**Keyboard shortcuts:**
- `1-4` Select answer option.
- `Ctrl+Enter` Next.
- `Ctrl+ArrowUp` Previous.
- `N` Open notes.
- `R` Open references.

**Mobile:**
- Single question per screen.
- Swipe left/right for next/previous.
- Progress bar at top.
- References open as bottom sheet.

**Accessibility:**
- Question has `role="radiogroup"`.
- Progress is announced as "Pregunta 12 de 45. Categoría: Cerramientos. Completado 65%."
- Error announcements via `aria-live`.

### 5.7 Result Delivery

**Purpose:** The report is delivered to the client and acknowledged.

**AT view after delivery:**
```
┌─────────────────────────────────────────────────────┐
│  ✅ Informe entregado                                │
│                                                      │
│  Resumen de entrega:                                 │
│  • Cliente: María García                             │
│  • Fecha de entrega: 15/07/2026 14:30                │
│  • Método: Email + Descarga en plataforma            │
│  • Estado: Pendiente de confirmación del cliente     │
│                                                      │
│  [Ver informe] [Descargar PDF] [Enviar recordatorio] │
│                                                      │
│  ── Historial de entrega ──                          │
│  15/07/2026 14:30 → Cliente notificado               │
│  15/07/2026 14:28 → Control calidad superado         │
│  15/07/2026 12:15 → Informe generado                 │
└─────────────────────────────────────────────────────┘
```

**Client view:**
```
┌─────────────────────────────────────────────────────┐
│  ✅ Tu segunda opinión está lista                    │
│                                                      │
│  Hola María,                                        │
│                                                      │
│  El AT ha completado el análisis de tu certificado  │
│  energético. Puedes descargar el informe completo.   │
│                                                      │
│  [Descargar informe (PDF)]                           │
│                                                      │
│  Resumen:                                            │
│  • Certificado: Correcto con observaciones           │
│  • Recomendaciones: 3                                │
│  • Próximos pasos: Revisa las recomendaciones del   │
│    informe para mejorar la calificación energética   │
│                                                      │
│  ¿Tienes dudas? Puedes responder a este email o      │
│  contactar con tu AT desde la plataforma.            │
└─────────────────────────────────────────────────────┘
```

**States:**
- **Loading (generation):** "Generando informe..." with estimated time.
- **Success:** Delivery confirmation with summary.
- **Error (delivery failed):** "No se ha podido entregar el informe. Inténtalo de nuevo." + "Reintentar" and "Descargar para entrega manual" options.
- **Client acknowledged:** Green banner "Cliente ha confirmado recepción."
- **Client not acknowledged (7 days):** "El cliente no ha confirmado la recepción. ¿Quieres enviar un recordatorio?"

**Mobile (client view):**
- Simple card layout with download button.
- Summary in collapsed sections.
- Share button for messaging the PDF.

### 5.8 Payment Flow

**Purpose:** Client pays for the second opinion service.

**Flow:**

```
Step 1: Service Selection
  - Select service type (standard, express, comprehensive)
  - Price displayed clearly with no hidden fees
  - What's included in each tier

Step 2: Payment Information
  - Card details (Stripe integration)
  - Billing information
  - Tax ID (optional, for invoice)

Step 3: Confirmation
  - Payment summary
  - Invoice download
  - Case creation confirmation
```

**Key UX requirements:**
- Clear pricing with no surprises.
- Multiple payment methods (card, Bizum, PayPal).
- Invoice generation (automatic with provided tax ID).
- Secure payment environment (PCI compliance via Stripe).
- Confirmation with case reference number.

**States:**
- **Loading (payment processing):** "Procesando pago..." with spinner. Never leave this screen without confirmation.
- **Success:** "Pago confirmado. Tu solicitud ha sido recibida." + Case reference.
- **Error (card declined):** "El pago no se ha podido procesar. Verifica los datos de la tarjeta." + "Intentar de nuevo."
- **Error (network):** "No se ha podido procesar el pago. Comprueba tu conexión." + "Reintentar."
- **Session expired:** "Tu sesión ha expirado por seguridad. Los datos del pago no se han procesado." + "Volver a empezar."

**Mobile:**
- Optimised form fields for mobile (large touch targets, appropriate keyboard types).
- Biometric authentication for payment confirmation (Face ID / fingerprint).

---

## 6. Error States for Every Screen

### 6.1 General Error Patterns

| Error Type | UX Pattern | Message Example |
|------------|------------|-----------------|
| Network | Toast + retry | "No se ha podido conectar. Comprueba tu conexión." |
| Server | Toast + fallback | "Algo ha ido mal. Inténtalo de nuevo." |
| Session expired | Full-screen redirect | "Tu sesión ha expirado. Inicia sesión de nuevo." |
| Permission denied | Full-screen message | "No tienes permiso para acceder a esta página." |
| Not found (404) | Full-screen message | "La página que buscas no existe." |
| Validation | Inline per field | "Este campo es obligatorio." / "Formato incorrecto." |
| Rate limit | Toast + wait time | "Demasiadas solicitudes. Inténtalo en 5 minutos." |
| Maintenance | Banner (scheduled) / Full-screen (unscheduled) | "Estamos realizando tareas de mantenimiento." |

### 6.2 Screen-Specific Error States

| Screen | Error | UX Pattern | Fallback |
|--------|-------|------------|----------|
| Landing page | Content load failure | Static fallback version | Minimal hero + CTA |
| Request flow | Save failure | Inline toast | Autosave retry |
| Request flow | Payment failure | Sticky error card | Alternative payment methods |
| AT Dashboard | Case list load failure | Empty state + retry | Manual refresh |
| AT Dashboard | Summary cards failure | Hide cards, show table only | Show "Error loading stats" |
| Case detail | Tab content load failure | Inline error in tab | Show only tab with data |
| Document viewer | File load failure | Error overlay in viewer | Download link |
| PITR™ | Save failure | Toast + inline retry | Autosave retry buffer |
| Delivery | Email failure | Warning + manual option | Download + retry |

### 6.3 Recovery Actions

Every error state must provide a clear recovery action. The user should never be stuck in an error state with no path forward.

**✅ Correct:** "No se ha podido cargar el documento. Descarga el archivo directamente: [Download link]"
**❌ Incorrect:** "Error loading document. Contact support." with no other options.

---

## 7. Empty States for Every Screen

### 7.1 General Empty State Pattern

All empty states follow the same structure:

```
┌──────────────────────────────────────┐
│                                      │
│           [semantic icon]           │
│                                      │
│       Short title (1-3 words)       │
│                                      │
│       Concise description           │
│       (1-2 sentences)              │
│                                      │
│       [Primary action button]       │
│                                      │
└──────────────────────────────────────┘
```

### 7.2 Screen-Specific Empty States

| Screen | Empty State Title | Description | Primary Action |
|--------|------------------|-------------|----------------|
| AT Dashboard (pending) | "No hay casos pendientes" | "Todos los casos están al día. Cuando llegue un nuevo caso, aparecerá aquí." | None needed |
| AT Dashboard (filtered) | "Sin resultados" | "No se encontraron casos con los filtros actuales." | "Limpiar filtros" |
| Case list (client) | "Sin expedientes" | "Solicita tu primera segunda opinión para comenzar." | "Solicitar segunda opinión" |
| Case detail (documents) | "Sin documentos" | "El cliente aún no ha subido documentos." | "Notificar al cliente" |
| Case detail (messages) | "Sin mensajes" | "No hay mensajes en este caso. Envía el primero." | "Escribir mensaje" |
| PITR™ (not started) | "Análisis no iniciado" | "Completa la revisión de documentos antes de iniciar el análisis PITR™." | "Ir a documentos" |
| Notifications | "Sin notificaciones" | "No hay notificaciones nuevas." | None needed |
| Search results | "Sin resultados" | "No se encontraron resultados para tu búsqueda." | "Intentar con otros términos" |

### 7.3 Empty State Rules

1. Never show a raw "No data" or empty table.
2. Empty states must include a path forward.
3. Empty states on the AT dashboard should be informative, not promotional.
4. Empty states for the client should encourage the next action.
5. Empty states should not use illustrations in V1.

---

## 8. Loading States for Every Screen

### 8.1 Loading State Philosophy

Loading states communicate to the user that something is happening. They prevent frustration by setting expectations. They should never feel slower than necessary.

### 8.2 Loading Patterns by Duration

| Duration | Pattern | Implementation |
|----------|---------|----------------|
| < 100ms | No indicator | Instant update |
| 100ms – 300ms | Subtle opacity change | Slight dim on content |
| 300ms – 3s | Skeleton | Placeholder matching layout |
| 3s – 10s | Skeleton + progress | Skeleton + progress bar |
| > 10s | Skeleton + message | Skeleton + "Esto está tomando más de lo esperado" |

### 8.3 Screen-Specific Loading States

| Screen | Loading Pattern | Notes |
|--------|----------------|-------|
| Landing page | Content fade-in | Already rendered, data populates |
| Request flow (save) | Button spinner | Inline, text stays visible |
| Request flow (submit) | Full-page overlay | "Procesando solicitud..." |
| AT Dashboard | Skeleton (cards + table) | Match card dimensions and table rows |
| Case detail | Skeleton (two-column) | Match header, sidebar, and content areas |
| Document viewer | Skeleton (viewer area) | Document outline shape |
| PITR™ | Inline question spinner | Question card shows spinner |
| Report generation | Progress bar | Estimated time shown |
| Payment | Full-page overlay | "Procesando pago..." |
| File upload | Progress bar | Percentage + filename |

### 8.4 Loading State Rules

1. Loading states must maintain layout dimensions to prevent layout shift.
2. Skeleton shapes should approximate the content that will fill them.
3. Never show a generic spinner when a skeleton is possible.
4. Loading states should reduce opacity to 50% maximum.
5. Skeleton animation: subtle pulse at 1.5s duration.

---

## 9. Confirmation Patterns

### 9.1 Confirmation Types

| Type | Usage | UI Pattern |
|------|-------|------------|
| Confirmation | Destructive or irreversible actions | Modal dialog |
| Warning | Actions with potential consequences | Banner + inline warning |
| Acknowledgment | Information the user must notice | Toast (persistent) |
| Verification | Actions requiring user verification | Modal with specific input |

### 9.2 Confirmation Dialog Specification

```
┌──────────────────────────────────────┐
│  ┌────────────────────────────────┐  │
│  │  ⚠️  ¿Eliminar expediente?   │  │
│  │                                │  │
│  │  Esta acción no se puede      │  │
│  │  deshacer. El expediente y    │  │
│  │  todos sus documentos se      │  │
│  │  eliminarán permanentemente.  │  │
│  │                                │  │
│  │  [Cancelar]    [Eliminar]     │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

**Rules:**
- Title asks a yes/no question (e.g., "¿Eliminar expediente?").
- Body explains consequences clearly.
- Primary (destructive) button uses the action verb (e.g., "Eliminar", not "Aceptar").
- Cancel is always the secondary, non-destructive option.

### 9.3 Confirmation Patterns by Action

| Action | Confirmation Required | Dialog Content |
|--------|----------------------|----------------|
| Delete case file | Yes | "¿Eliminar expediente? Esta acción no se puede deshacer." |
| Cancel request | Yes (after work started) | "¿Cancelar solicitud? El cliente será notificado." |
| Close case | Yes | "¿Cerrar expediente? Se archivará y no aparecerá en tu lista activa." |
| Submit payment | Yes (before final step) | "¿Confirmar pago de XX €?" |
| Exit without saving | Yes (if changes exist) | "¿Salir sin guardar? Los cambios no guardados se perderán." |
| Remove team member | Yes | "¿Eliminar a [nombre] del equipo? Esta acción no se puede deshacer." |

### 9.4 Confirmation Rules

1. Confirmation dialogs must appear for all destructive actions.
2. Confirmation dialogs must not contain promotional content.
3. Confirmation dialogs must be closable (Escape, ✕, clicking outside).
4. Confirmation buttons must be ordered: [Cancel] [Destructive action].
5. "Are you sure?" is not sufficient. Explain what will happen.

---

## 10. Mobile Adaptation Notes

### 10.1 Mobile-First Philosophy

While the primary user (the AT) works on desktop, clients and AT-on-the-go access the platform through mobile. Mobile adaptation is not an afterthought — it is a design requirement.

### 10.2 Mobile Layout Rules

| Element | Desktop | Mobile |
|---------|---------|--------|
| Navigation | Sidebar | Bottom tab bar (4 items) |
| Content area | Multi-column | Single column |
| Data tables | Full table | Card list |
| Modals | Centred | Bottom sheet (full height) |
| Tooltips | Hover | Tap to show |
| Filters | Inline bar | Bottom sheet or select |
| Pagination | Numbers | "Load more" button |
| Actions | Inline buttons | FAB or bottom action bar |

### 10.3 Mobile-Specific UX Decisions

- **Touch targets:** Minimum 44×44px for all interactive elements.
- **Form fields:** Optimised input types (`type="email"`, `type="tel"`, `type="number"`).
- **Keyboard:** Appropriate keyboard types for each field.
- **Gesture support:** Swipe to go back, pull to refresh, pinch to zoom on images.
- **Offline capability:** Read access to downloaded reports without internet.
- **Notifications:** Push notifications for state changes (case assigned, corrections requested, report ready).

### 10.4 Mobile Browser Testing Matrix

| Browser | OS | Priority |
|---------|----|----------|
| Safari | iOS 16+ | Primary (Spanish users are 70% iOS) |
| Chrome | Android 13+ | Primary |
| Samsung Internet | Android 13+ | Secondary |

---

## 11. Accessibility Requirements

### 11.1 Accessibility Standards

Certilab Platform will conform to **WCAG 2.1 Level AA** as the minimum standard. Level AAA compliance is targeted for V2.

### 11.2 Requirements by Screen

#### Landing Page
- Skip navigation link.
- All images have alt text.
- Heading hierarchy (h1 → h2 → h3).
- Colour contrast: 4.5:1 for body text, 3:1 for large text.
- Focus indicators visible on all interactive elements.

#### Request Flow
- All form elements have labels (visible or `aria-label`).
- Error messages are associated with inputs via `aria-describedby`.
- Progress indicator is announced by screen readers.
- Required fields are indicated textually, not just by colour.
- Auto-focus on the first field of each step.

#### AT Dashboard
- Table has `role="grid"` with proper `aria-colcount` and `aria-rowcount`.
- Sortable columns have `aria-sort`.
- Summary cards have `aria-label` describing the content.
- Filter controls are keyboard accessible.
- Live region (`aria-live="polite"`) for toast notifications.

#### PITR™ Interface
- Questions use `role="radiogroup"` for answer options.
- Progress is announced: "Pregunta X de Y. Categoría: [categoría]."
- References panel has `role="dialog"` with `aria-modal`.
- Auto-save confirmation is announced.
- Keyboard navigation: arrow keys for options, Tab for navigation buttons.

#### Document Viewer
- Documents without text layer (scanned images) must have ALT text.
- Zoom controls have accessible labels.
- Annotations are accessible (text alternatives).
- Keyboard shortcuts are documented in an accessible manner.

### 11.3 General Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | All interactive elements reachable via Tab |
| Focus management | Visible focus ring (3:1 contrast) |
| Screen reader | All content conveyed visually available to screen readers |
| Colour independence | Information not conveyed by colour alone |
| Motion | `prefers-reduced-motion: reduce` supported |
| Text scaling | Layout remains usable at 200% zoom |
| Touch targets | Minimum 44×44px |
| Errors | Error messages announced by screen readers |

### 11.4 Testing Requirements

All screens must pass:
1. Keyboard-only navigation test.
2. Screen reader test (VoiceOver + NVDA).
3. Colour blindness simulation (protanopia, deuteranopia, tritanopia).
4. 200% zoom test.
5. Reduced motion test.

---

## 12. UX Micro-Copy Patterns

### 12.1 Pattern Reference Table

| Pattern | Example (Spanish) | Context |
|---------|-------------------|---------|
| Success confirmation | "Expediente creado." | After successful creation |
| Success without celebration | ✅ "Pago confirmado." | After payment |
| Loading (short) | "Guardando..." | Autosave indicator |
| Loading (long) | "Procesando solicitud..." | Form submission |
| Error (validation) | "Este campo es obligatorio." | Required field left empty |
| Error (format) | "Formato de email inválido." | Incorrect email format |
| Error (network) | "No se ha podido conectar." | Network failure |
| Error (server) | "Algo ha ido mal. Inténtalo de nuevo." | Internal server error |
| Empty state | "No hay expedientes." | Empty list |
| Empty state (alt) | "No se encontraron resultados." | Filtered list with no matches |
| Confirmation title | "¿Eliminar expediente?" | Destructive action |
| Confirmation body | "Esta acción no se puede deshacer." | Irreversible action warning |
| Primary button | "Enviar solicitud" | Form submission |
| Secondary button | "Cancelar" | Cancel action |
| Danger button | "Eliminar" | Destructive action |
| Link | "Ver todos los expedientes" | Navigate to list |
| Tooltip | "Selecciona el tipo de inmueble" | Form field guidance |
| Placeholder | "Ej: C/ Mayor, 15, 08001 Barcelona" | Address field |
| Hint | "Máximo 10 MB. Formato PDF." | File upload constraints |

### 12.2 Micro-Copy Principles Applied

| Principle | Example |
|-----------|---------|
| Clarity over cleverness | "Enviar solicitud" not "¡Lánzate!" |
| Precision over persuasion | "Guardar borrador" not "No pierdas tu progreso" |
| Brevity | "Expediente creado." not "El expediente se ha creado correctamente." |
| Professional tone | "Error de conexión" not "Oops! Something went wrong" |
| Active voice | "El AT ha solicitado correcciones" not "Correcciones han sido solicitadas" |
| Spanish first | Always Spanish, never English UI text |

---

## 13. User Testing Plan

### 13.1 Testing Phases

| Phase | Focus | Participants | Method | Timing |
|-------|-------|-------------|--------|--------|
| 1 | Core AT workflow (dashboard, case detail, PITR™) | 5 ATs | Moderated usability testing | Pre-V1 launch |
| 2 | Client request flow (upload, pay, receive) | 5 clients | Moderated + unmoderated | Pre-V1 launch |
| 3 | Full end-to-end (both sides) | 3 ATs + 3 clients | Paired testing | Beta phase |
| 4 | Accessibility audit | 2 accessibility specialists | Expert review | Pre-V1 launch |
| 5 | Mobile validation | 5 mobile users | Unmoderated | V1.1 |

### 13.2 Testing Protocol

Each usability test follows the same protocol:

1. **Introduction** (5 min): Explain the context, not the interface.
2. **Task completion** (30 min): User completes 5-6 predefined tasks.
3. **Think-aloud** (during tasks): User verbalises their thought process.
4. **Post-test interview** (15 min): Qualitative feedback.
5. **SUS questionnaire** (5 min): Standardised UX measurement.

### 13.3 Key Research Questions

1. Can the AT complete the full workflow without assistance?
2. How long does each phase take (baseline measurement)?
3. Where do users hesitate or make errors?
4. Is the PITR™ question tree intuitive for experienced ATs?
5. Do clients trust the platform enough to upload documents and pay?
6. Are error messages helpful or confusing?
7. Is the mobile experience comparable to desktop for key tasks?

### 13.4 Success Metrics

| Metric | Target | Method |
|--------|--------|--------|
| Task completion rate | 100% for core tasks | Observation |
| Time per task | < 50% of current manual process | Measurement |
| Error rate | < 5% of interactions | Log analysis |
| SUS score | > 75 | Questionnaire |
| Net Promoter Score (AT) | > 40 | Survey |
| Net Promoter Score (Client) | > 30 | Survey |

---

## 14. Open UX Questions

| ID | Question | Context | Depends On |
|----|----------|---------|------------|
| UX-001 | Should the PITR™ question tree be vertically scrollable (all questions visible) or paginated (one question at a time)? | Vertically scrollable gives overview but may overwhelm. Paginated is more guided but slower. | User testing |
| UX-002 | Should the AT see a queue of cases or only one case at a time? | Queue gives control over workflow. Single case reduces cognitive load. | AT interviews |
| UX-003 | Should clients be able to track AT progress in real-time (e.g., "AT is reviewing documents")? | Transparency builds trust but may create pressure on the AT. | Product decision |
| UX-004 | Should the platform include a chat feature or use structured messaging for corrections? | Chat is more flexible. Structured messaging is clearer and trackable. | Product decision |
| UX-005 | What is the optimal length for the PITR™ question tree? | Too few questions = shallow analysis. Too many = AT fatigue. | User testing |
| UX-006 | Should the report include a video summary from the AT? | Value-add for clients but creates production overhead for ATs. | V2 planning |
| UX-007 | Should there be a public AT profile page for client selection? | Enables client choice but adds complexity and potential for bias. | V2 planning |

---

## Volume IV — References

| Reference | Relationship |
|-----------|-------------|
| → I:§3 (Product Vision) | UX decisions must deliver on the vision |
| → III:§9 (Form Design) | Forms used in request flow |
| → V:§4 (Micro-copy) | Exact text for UX patterns |
| → VII:§4 (Accessibility) | Technical implementation of accessibility |

---

*End of Volume IV — UX Bible*

*All UX decisions in this Volume are based on the product vision, positioning, and design system architecture. Where decisions could not be deduced from existing documents, they are identified as "Pending validation of design" with a UX- reference ID.*