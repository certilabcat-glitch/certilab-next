# Volume I — Foundations

## The Conceptual Framework of Certilab Platform

---

**Volume:** I of VII
**Status:** ✅ ACTIVE
**Last Updated:** 2026-07-05
**Estimated Pages:** 60–80

---

## Table of Contents

1. [The Origin](#1-the-origin)
2. [The Problem](#2-the-problem)
3. [The Product Philosophy](#3-the-product-philosophy)
4. [Design Manifesto](#4-design-manifesto)
5. [Principles](#5-principles)
6. [The User](#6-the-user)
7. [The Core](#7-the-core)
8. [Product Architecture](#8-product-architecture)
9. [Design Decisions](#9-design-decisions)
10. [Open Questions](#10-open-questions)

---

## 1. The Origin

### 1.1 The Discovery

Certilab was born from a structural observation: the Spanish energy certification market is broken.

Between 15% and 30% of all energy performance certificates issued in Spain contain significant errors. These are not marginal mistakes. They are systematic failures that affect property valuations by up to 15%, create legal liabilities for sellers and agents, and leave buyers without recourse.

The industry had accepted this as normal. There was no independent verification mechanism. The certifying technician was hired by the seller, creating an inherent conflict of interest. No one was auditing the auditors.

### 1.2 The Response

Certilab Platform was conceived as the answer to this market failure. Not as certification software — there are dozens of tools that calculate energy ratings. Not as an ERP — the market is saturated with property management systems. Certilab was conceived as an **audit platform**: a system that enables independent technical architects to review, verify, and issue binding expert opinions on existing certificates.

> 🔍 **Source:** CF-000-PROJECT-BRAIN.md — Section 1.1 "Why Certilab Exists"

### 1.3 The Name

*Certilab* is a portmanteau of *Certificado* (certificate) and *Lab* (laboratory). The name evokes the idea of a laboratory where certificates are tested, analysed, and validated. It suggests rigor, precision, and scientific method — values that define the product.

The name is pronounced *cer-tee-lab*, with equal stress on all three syllables in Spanish. In English contexts, it may be pronounced *sir-tee-lab*.

> 🔍 **Source:** CF-000-PROJECT-BRAIN.md — Section 1.3

---

## 2. The Problem

### 2.1 Market Reality

The Spanish energy certification market processes approximately 3.5 million certificates annually across sales and rental transactions. The addressable market for Certilab in V1 is concentrated in Catalonia, representing approximately 700,000 transactions per year — 20% of the national total.

**Key market characteristics:**

- **High error rate:** Industry studies indicate 15–30% of certificates contain significant errors.
- **No independent verification:** The certifier is paid by the certificate owner, creating a conflict of interest.
- **Low awareness:** Most property owners do not know their certificate may be incorrect.
- **No regulatory enforcement:** Regional authorities lack resources to audit certificates systematically.
- **Economic impact:** An incorrect certificate can devalue a property by up to 15%.

> 🔍 **Source:** PRODUCT-POSITIONING.md — Section 1 "Market Objective"

### 2.2 The Conflict of Interest

The fundamental problem is structural:

> The person who issues the certificate is paid by the person who needs the certificate to be favourable.

This creates a perverse incentive. When a property needs to be sold or rented, the owner hires a technician to issue a certificate. If the certificate reveals poor energy performance, the property loses value. The technician is therefore under implicit pressure to deliver a favourable result — or at least not to probe too deeply.

Certilab breaks this cycle by introducing **an independent third party**: a Technical Architect (Arquitecto Técnico) who has no relationship with the original certificate issuer, no incentive to produce a particular outcome, and whose professional reputation depends on the accuracy of their analysis.

> 🔍 **Source:** CF-000-PROJECT-BRAIN.md — Section 1.1

### 2.3 The Professional Void

Beyond the conflict of interest, there is a professional void. The role of the Technical Architect (AT) has been systematically undervalued in Spain. Once responsible for the technical oversight of construction projects, ATs have seen their role diminished and their expertise underutilized.

Certilab creates a new professional avenue for ATs: **technical auditing**. This is not a reduction of their role but an expansion — a return to their core function of technical verification, applied to the energy certification domain.

> 🔍 **Source:** PRODUCT-VISION.md — Section 2.1

---

## 3. The Product Philosophy

### 3.1 The Operating System of Technical Work

Certilab Platform is not born to be another ERP. It is born to become the **operating system of technical work**.

What does this mean?

An operating system is a foundation — invisible, reliable, and universal. Applications run on top of it. Users interact with it without thinking about it. The operating system manages complexity so that applications can focus on functionality.

Certilab follows the same model. The platform provides:

- **A unified data model** for clients, properties, case files, and documents.
- **A consistent workflow engine** for technical inspections.
- **A robust audit trail** for every action and decision.
- **A professional interface** that disappears into the background of the user's work.

The platform does not define what technical work looks like. It enables it.

> 🎯 **Principle:** The platform must be invisible. Users should not think about "using Certilab". They should think about "reviewing a certificate", "analysing a property", or "delivering an expert opinion."

### 3.2 Technology Must Disappear

This is the cardinal principle. Technology must disappear.

When an AT reviews a certificate, they should not be fighting the interface. They should be focused on the document, the data, the inconsistencies. The interface should be so natural, so intuitive, that it becomes an extension of their professional judgment.

When a property owner requests a second opinion, they should not feel like they are using software. They should feel like they are commissioning a professional service.

> 🎯 **Principle:** The measure of good design is not how much the user notices it. It is how little the user notices it.

### 3.3 Simplicity on the Surface, Complexity in the Core

The interface of Certilab must be radically simple. But that simplicity must be earned through rigorous complexity management in the core.

The domain model — Client, Property, Case File, AI Document — is the result of careful domain-driven design. The business rules — policies, validations, workflows — are precisely defined. The data model is normalized and optimized.

All of this complexity exists **behind the interface**. The user never sees it. What they see is:

- A clear next action
- Relevant information at the right time
- A system that anticipates their needs
- An interface that feels almost empty

> 🎯 **Principle:** Every element in the interface must justify its existence. If the user does not need it to complete their current task, it does not belong on the screen.

### 3.4 Professional, Not Corporate

Certilab's visual and experiential identity is professional, not corporate.

Corporate design is about branding, consistency across departments, and projecting an image of scale. Professional design is about **utility, precision, and respect for the user's expertise**.

A professional interface looks like a tool, not a brochure. It values information density over whitespace when the user needs data. It values silence over noise. It trusts the user's intelligence.

> 🔍 **Source:** PRODUCT-POSITIONING.md — Section 3 "Brand Positioning"

### 3.5 The Question That Guides Everything

Everything we build must always answer a single question:

> *Does it help the professional work better?*

If the answer is no, it must not exist.

This question applies to:

- **Features:** Does this feature help the AT perform a better audit?
- **Interface elements:** Does this button, this label, this icon help the user complete their task?
- **Content:** Does this text help the user understand what to do?
- **Animations:** Does this motion help orient the user or does it add delay?
- **Notifications:** Does this alert help the user take action or does it create noise?

> 🎯 **Principle:** If a feature cannot pass this test, it must be cut. If it can, it must be refined until it serves the user's work with maximum efficiency and minimum friction.

---

## 4. Design Manifesto

### 4.1 We Are Not Designing Interfaces

We are not designing interfaces.

We are designing **tools for professionals**.

The distinction is critical. Interfaces are about interaction with software. Tools are about interaction with work. A carpenter does not think about the hammer — they think about the nail. A surgeon does not think about the scalpel — they think about the incision. A Technical Architect using Certilab should not think about the interface — they should think about the certificate they are reviewing.

### 4.2 The Design Dogma

1. **Clarity over creativity.** The interface must communicate with absolute clarity. Creative flourishes that reduce clarity are not permitted. Every design element must serve comprehension.

2. **Precision over beauty.** The system must be precise in its behaviour, its feedback, its data presentation. A beautiful interface that lacks precision is a failure.

3. **Silence over noise.** The default state of the interface is silence. No unnecessary elements, no decorative graphics, no redundant labels. Every addition must earn its place.

4. **Speed over richness.** The user must be able to complete their tasks quickly. Rich interactions that slow the user down are not acceptable. Keyboard navigation must be as natural as mouse interaction.

5. **Trust over control.** The system must trust the professional user. It should not second-guess their decisions, require unnecessary confirmations, or impose artificial constraints. The interface enables, it does not restrict.

6. **Consistency over surprise.** Once the user learns a pattern, it must apply everywhere. Surprise is the enemy of professional work.

7. **Accessibility over exclusion.** The platform must be usable by all qualified professionals regardless of their abilities. Accessibility is not a feature — it is a requirement.

> 🔍 **Source:** DESIGN-SYSTEM-ARCHITECTURE.md — Section 1 "Design Philosophy"

### 4.3 What We Are Not

**We are not a marketplace.** Certilab is not connecting ATs with clients like a freelancer platform. The AT in V1 is internal to Certilab. In future, ATs may be onboarded as platform professionals, but the relationship is professional, not transactional.

**We are not certification software.** Certilab does not calculate energy ratings. It does not compete with CE3X, CERMA, or HULC. It operates on the output of these tools — verifying, auditing, and providing expert opinion on certificates that have already been issued.

**We are not a CRM.** The platform does not manage customer relationships in the traditional sense. It manages **case files** — the technical workflow of an audit.

**We are not compliance software.** While Certilab's work has regulatory implications, the platform does not enforce regulations. It enables professionals to exercise their judgment within a structured framework.

> 🔍 **Source:** PRODUCT-VISION.md — Section 1 "What is Certilab Platform"

---

## 5. Principles

### 5.1 Product Principles

#### PR-001: The Core is Sacred

The Core V1 — Client, Property, Case File, AI Document — is frozen for V1. No new aggregate roots, bounded contexts, or domain services may be created without an approved ADR. All new functionality must be achieved through composition or extension of existing components.

> 📐 **Source:** CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md — Section 3 "Frozen Decisions"

#### PR-002: Vertical Slice, Not Horizontal Layer

Each feature must be delivered as a vertical slice: from the UI through the application service, domain logic, persistence, and back. Features are not built layer by layer; they are built slice by slice.

> 📐 **Source:** CF-000-PROJECT-BRAIN.md — Section on architecture

#### PR-003: Reuse Before Compose Before Extend

When a new requirement emerges, evaluate in this order:
1. Can an existing component be used without modification?
2. Can existing components be composed to satisfy the requirement?
3. Can an existing component be minimally extended?
Only as a last resort should a new component be created.

> 🎯 **Source:** AGENTS.md — Section 9.3 "Regla de reutilización del Core"

#### PR-004: Data First, Features Second

Features that generate data for the Observatory have priority over those that do not. Data is the long-term asset. Every feature should be evaluated not only for its immediate value but for its contribution to the platform's data moat.

> 🎯 **Source:** PRODUCT-ROADMAP.md — "Principios de priorización"

#### PR-005: Revenue Before Expansion

Features that enable revenue (payment gateway, pricing page) have priority over features that improve experience or expand functionality. The platform must generate revenue before it grows.

> 🎯 **Source:** PRODUCT-ROADMAP.md — "Principios de priorización"

---

### 5.2 Design Principles

#### DP-001: Information Before Ornament

Present information first. Decoration is never the goal. If a design element does not convey information or improve comprehension, remove it.

**✅ Correct:** A clean table with well-formatted data, clear headers, and appropriate spacing.
**❌ Incorrect:** A table with background patterns, decorative icons that do not add meaning, or unnecessary borders.

#### DP-002: Progressive Disclosure

Show the user what they need, when they need it. Do not overwhelm with information upfront. Reveal complexity progressively as the user navigates deeper into a task.

**✅ Correct:** A case file list shows only essential information (title, status, date). Detailed information is one click away.
**❌ Incorrect:** A case file list showing every possible field, requiring the user to scan horizontally through dozens of columns.

#### DP-003: Consistency Is a Feature

Once a pattern is established, it must be used everywhere. Inconsistent interfaces force users to relearn patterns, creating cognitive friction.

**✅ Correct:** All forms use the same input style, validation pattern, and error presentation.
**❌ Incorrect:** Some forms validate on blur, others on submit. Some show errors inline, others in a toast.

#### DP-004: The User Is a Professional

The platform's users are educated professionals — Technical Architects, property experts, building engineers. The interface must respect their intelligence and experience.

**✅ Correct:** Using precise technical terminology where appropriate, providing data without oversimplification.
**❌ Incorrect:** Over-explaining concepts the user already knows, using childlike illustrations, or assuming the user needs hand-holding.

#### DP-005: Silence Is the Default

The interface should be silent until it needs to speak. Do not show success messages for routine operations. Do not animate elements that do not need animation. Do not celebrate the ordinary.

**✅ Correct:** A file upload that silently succeeds, with the new file appearing in the list without fanfare.
**❌ Incorrect:** A file upload that shows a confetti animation, plays a sound, or displays "¡Archivo subido con éxito!"

#### DP-006: Feedback Must Be Precise

When the system needs to communicate with the user, the communication must be precise. Error messages must explain what happened, why, and what to do next. Success confirmations must be factual, not celebratory.

**✅ Correct:** "No se pudieron cargar los datos del expediente. Comprueba tu conexión y vuelve a intentarlo."
**❌ Incorrect:** "¡Error!" or "Something went wrong."

#### DP-007: Accessibility Is Non-Negotiable

Every interface element must be accessible. This is not a feature request — it is a design requirement. Colour contrast, keyboard navigation, screen reader support, and focus management are baseline expectations.

✅ **Correct:** All interactive elements are keyboard accessible. Forms have proper labels. Colour is never the only differentiator.
❌ **Incorrect:** A dropdown that requires a mouse. A chart that uses colour alone to distinguish data series. A button with no aria-label.

---

### 5.3 Experience Principles

#### XP-001: The User Should Never Feel Lost

At every point in the application, the user must know:
- Where they are
- What they can do
- What will happen next
- How to go back

**✅ Correct:** Breadcrumbs, clear page titles, a consistent navigation structure, and explicit next actions.
**❌ Incorrect:** Deep navigation without breadcrumbs, ambiguous button labels, no way to cancel or go back.

#### XP-002: Every Action Must Have a Clear Outcome

Before a user performs an action, they must understand what will happen. Buttons must have precise labels. Destructive actions must be confirmed. State changes must be visible.

**✅ Correct:** "Eliminar expediente" with a confirmation dialog explaining the consequences.
**❌ Incorrect:** A trash icon without text, or "Submit" on a form that could create, update, or delete data.

#### XP-003: The System Must Anticipate

The platform must anticipate the user's needs based on context. Pre-fill information when it can be inferred. Suggest next actions based on the current state. Remember preferences.

**✅ Correct:** When a user starts a new case file for an existing client, the client's information is pre-filled.
**❌ Incorrect:** The user must re-enter the client's information for every new case file.

#### XP-004: State Must Be Visible

The system must communicate its state clearly. Loading states, empty states, error states, and success states must be distinct and informative.

**✅ Correct:** A skeleton screen during loading, an empty state with guidance for first use, and clear error states with recovery actions.
**❌ Incorrect:** A spinning loader with no indication of progress, or an empty page with no explanation.

#### XP-005: The Platform Must Be Fast

Speed is a feature. The platform must respond to user input immediately. If an operation takes time, the system must show progress. Optimistic updates are preferred when safe.

**✅ Correct:** Immediately showing the user's action as pending while the server processes it.
**❌ Incorrect:** Making the user wait for a spinner after clicking a button.

---

## 6. The User

### 6.1 Primary Personas

#### Persona 1: Marc — The Technical Architect

> "I want to focus on the technical work. The software should stay out of my way."

- **Role:** Registered Technical Architect (Arquitecto Técnico)
- **Age:** 35–55
- **Technical level:** Comfortable with professional software, impatient with unnecessary complexity
- **Primary need:** An efficient tool to review certificates and issue expert opinions
- **Secondary need:** A platform that respects their professional judgment and expertise

Marc is the primary user of the platform. The entire experience is designed around him. His workflow is the workflow of the platform.

> 🔍 **Source:** PRODUCT-PERSONAS.md — Persona 2

#### Persona 2: Elena — The Property Owner

> "I need to know if my energy certificate is correct. I don't want to become an expert — I want to hire one."

- **Role:** Property owner or buyer
- **Age:** 30–65
- **Technical level:** Variable — from comfortable with online services to needing significant guidance
- **Primary need:** A simple, trustworthy way to verify their certificate
- **Secondary need:** Clear communication about what they are getting and what it means

Elena is the entry point to the platform. Her experience must be simple, reassuring, and transparent. She is purchasing a professional service, not using software.

> 🔍 **Source:** PRODUCT-PERSONAS.md — Persona 1

#### Persona 3: Alba — The Property Manager

> "I manage dozens of properties. I need to verify certificates at scale."

- **Role:** Community property manager (Administradora de Fincas)
- **Age:** 40–60
- **Technical level:** Proficient with administrative software
- **Primary need:** Multi-property certificate audit management
- **Secondary need:** Reporting and dashboard capabilities

Alba represents the V2 expansion target. The platform must be designed with V2 in mind but must not compromise V1 for future flexibility.

> 🔍 **Source:** PRODUCT-PERSONAS.md — Persona 5

### 6.2 Secondary Personas

| Persona | Role | Primary Need | V1 Priority |
|---------|------|-------------|-------------|
| Inés | Certification company director | Quality control, partnership | V2 |
| Carlos | Real estate agent | Certificate verification for listings | V2 |
| Laura | Observatory researcher | Anonymized data, market insights | V2 |

### 6.3 User Capabilities

The platform's users are diverse in their technical capabilities. The design must accommodate:

- **Professional users (ATs):** High domain expertise, high software competence. These users benefit from keyboard shortcuts, data density, and efficiency features.
- **Consumer users (property owners):** Variable domain knowledge, variable software competence. These users benefit from clarity, guidance, and simplicity.
- **Professional users (property managers):** High administrative competence, moderate technical knowledge. These users benefit from bulk operations, reporting, and dashboards.

> 🎯 **Principle:** Design for the most capable user without excluding the least capable. Advanced features should be available but not required.

---

## 7. The Core

### 7.1 The Four Aggregates

The Platform Core consists of four aggregates, frozen for V1:

| Aggregate | Purpose | V1 Status |
|-----------|---------|-----------|
| **Client** | Represents the person or entity requesting the service | ✅ Implemented |
| **Property** | The physical property being audited | ✅ Implemented |
| **Case File** | The audit process, from request to delivery | ✅ Implemented |
| **AI Document** | Documents generated or processed by the system | ✅ Implemented |

> 📐 **Source:** CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md — Section 3

### 7.2 The Flow of Work

```
Client → Property → Case File → AI Document → PITR Engine → Result
```

This is the reference flow of the MVP V1. Every feature must integrate into at least one step of this flow.

1. **Client:** The property owner requests a second opinion (PITR™).
2. **Property:** The property details are recorded and validated.
3. **Case File:** An audit case file is created and assigned to an AT.
4. **AI Document:** The AT reviews and processes documents related to the case.
5. **PITR Engine:** The system guides the AT through the audit process.
6. **Result:** The AT delivers a formal expert opinion.

> 🔍 **Source:** AGENTS.md — Section 9.2 "Flujo de referencia del dominio"

### 7.3 Domain Boundaries

The Core operates within clearly defined boundaries:

- **Client** manages identity, contact, and relationship.
- **Property** manages physical characteristics, location, and legal identification.
- **Case File** manages the workflow — status, assignment, timeline.
- **AI Document** manages document storage, classification, and processing.

Cross-boundary communication happens through domain services, never through direct repository access. Each aggregate is responsible for its own consistency and validation.

> 🔍 **Source:** CF-022-AGGREGATE-BOUNDARIES.md — Section 2

---

## 8. Product Architecture

### 8.1 Modular Platform Structure

```
Certilab Platform
    ├── Module 1: Energy Certificate Audit (V1)
    ├── Module 2: ITE / Technical Building Inspection (future)
    ├── Module 3: Accessibility Certification (future)
    └── Module N: Future inspection modules
```

The platform is modular. Each module implements specific capabilities, but none defines the platform. All modules reuse the same Core of Client, Property, Case File, and AI Document.

> 🔍 **Source:** PRODUCT-ROADMAP.md — "Jerarquía del producto"

### 8.2 Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 14+ (React 19) | React Server Components, App Router |
| Styling | Tailwind CSS v4 | Utility-first, token-driven |
| Design System | Custom atomic system | Modular, progressive migration |
| Backend | Next.js API routes | Co-located with frontend |
| Database | Supabase (PostgreSQL) | RLS, real-time, managed |
| Auth | Supabase Auth | RLS integration, Row Level Security |
| Storage | Supabase Storage | Document management |
| Deployment | Vercel | Optimized for Next.js |

> 🔍 **Source:** DESIGN-SYSTEM-ARCHITECTURE.md — Section 5 "Technical Context"

### 8.3 Design System Architecture

The Design System follows Atomic Design methodology with a progressive migration strategy:

```
Phase 1: Atoms (primitives)
Phase 2: Molecules (composites)
Phase 3: Organisms (sections)
Phase 4: Templates (page structures)
Phase 5: Migration (component replacement)
Phase 6: Maintenance (documentation, governance)
```

The architecture is decoupled from visual decisions. When the Brand Book is finalized, visual tokens can be injected without restructuring components.

> 🔍 **Source:** DESIGN-SYSTEM-ARCHITECTURE.md — Section 4 "Implementation Strategy"

---

## 9. Design Decisions

### 9.1 Closed Decisions

The following design decisions are closed for V1:

| Decision | Rationale |
|----------|-----------|
| No dark mode in V1 | Not a blocker for MVP. Planned for V2. |
| No mobile app in V1 | Responsive web is sufficient. Native app is V3+. |
| English language not in V1 | Spanish market only. Internationalization is V2+. |
| No custom illustrations in V1 | Use precise icons and typography. Illustrations are V2. |
| No animations in V1 | Use subtle transitions only if they serve a functional purpose. |
| No dashboard widgets in V1 | Focus on core workflow. Custom dashboards are V1.1+. |

### 9.2 Design System Governance

- The Design System is owned by the product team.
- All changes must be reviewed against design principles.
- Component modifications must maintain backward compatibility.
- Visual token changes must be approved by design lead.
- Documentation must be updated with every change.

### 9.3 Design Debt Register

| Item | Description | Proposed Resolution | Priority |
|------|-------------|-------------------|----------|
| DD-001 | Current CSS uses mixed patterns (CSS modules + Tailwind) | Standardize to Tailwind only in V2 | V2 |
| DD-002 | No centralized colour tokens | Create token system as part of Design System Phase 1 | V1.1 |
| DD-003 | No consistent spacing scale | Define and apply spacing tokens | V1.1 |
| DD-004 | Typography not tokenized | Move font sizes to design tokens | V1.1 |
| DD-005 | No component documentation | Begin living documentation | V1.1 |

> 🎯 **Principle:** Design debt is tracked and prioritized alongside technical debt. It must be resolved systematically, not ignored.

---

## 10. Open Questions

The following decisions are identified as **Pending validation of design** and should not be improvised. They must be resolved through the design process before implementation.

### 10.1 Pending Design Decisions

| ID | Question | Context | Depends On |
|----|----------|---------|------------|
| PD-001 | Should the AT workspace use a split-panel layout (document on left, form on right)? | The AT review workflow requires simultaneous document viewing and data entry. Two popular patterns exist: split-panel and tab-based. | User testing with ATs |
| PD-002 | What is the optimal density of the case file list for ATs? | Professional users (Marc) prefer higher density. Consumer users (Elena) need more whitespace. The case file list must serve both. | Persona-specific views or adaptive density? |
| PD-003 | Should document preview be inline or modal? | Inline preview is more immersive. Modal preview is more focused. The right answer depends on the complexity of the document review workflow. | AT workflow analysis |
| PD-004 | What is the appropriate level of guidance for the PITR™ question tree? | Too much guidance feels constraining to experienced ATs. Too little risks missing critical checks. | AT user testing |
| PD-005 | How should the correction workflow (AT ↔ client) be visualized? | The iterative correction loop is central to the value proposition but complex to represent clearly. | UX design iteration |

### 10.2 Research Required

| Topic | Question | Method | Timeline |
|-------|----------|--------|----------|
| Navigation model | Should the primary navigation be horizontal or vertical? | Competitive analysis, user testing with ATs | V1.1 |
| Data visualization | How should certificate comparison data be presented? | Usability testing, expert review | V1.1 |
| Mobile adaptation | What is the minimum viable mobile experience? | Responsive design audit, user needs analysis | V1.1 |
| Accessibility baseline | What is the current accessibility state? | Accessibility audit | V1.1 |

---

## Volume I — References

| Reference | Relationship |
|-----------|-------------|
| → V2:§1 (Colour) | Visual expression of foundations |
| → V3:§1 (Component Architecture) | Implementation of principles in components |
| → V4:§3 (AT Workflow) | UX expression of the Core flow |
| → V5:§2 (Tone of Voice) | Linguistic expression of the philosophy |
| → VI:§1 (Brand Identity) | Visual manifestation of the brand |
| → VII:§2 (Token System) | Technical implementation of design decisions |

---

*End of Volume I — Foundations*

*This volume is coherent with CF-000, CF-001A, PRODUCT-VISION, PRODUCT-POSITIONING, PRODUCT-ROADMAP, and DESIGN-SYSTEM-ARCHITECTURE. All decisions documented here derive from those foundation documents.*