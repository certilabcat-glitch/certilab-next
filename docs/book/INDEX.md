# THE BOOK OF CERTILAB

## The Official Design Documentation of Certilab Platform

---

**Edition:** V1.0
**Status:** ✅ ACTIVE
**Classification:** Internal — Product Design Reference
**Last Updated:** 2026-07-05

---

## BOOK SUPREMACY

> **If any technical decision conflicts with The Book of Certilab, The Book of Certilab always prevails.**
>
> The Book of Certilab is the supreme design and experience reference for Certilab Platform. It is not a suggestion. It is not a guideline to be negotiated. It is the constitution of the product's interface, identity, and experience.
>
> When a conflict is detected between a technical decision (architecture, implementation, dependency choice, component structure) and any volume of this book, the following protocol applies:
>
> 1. **Document the conflict** — Identify the exact sections of The Book and the technical decision in conflict.
> 2. **Stop implementation** — Do not proceed with the conflicting technical decision.
> 3. **Escalate** — The conflict must be resolved by updating either the technical decision (to align with The Book) or The Book itself (via a design decision, never unilaterally).
>
> No technical decision may override The Book of Certilab. The Book may only be overridden by a future edition of itself, approved through the design governance process defined in Volume VII.
>
> This rule is non-negotiable and takes precedence over any other document or directive, including AGENTS.md, CF documents, ADRs, and session prompts.

## Foreword

> *"We do not design software.*
>
> *We design tools for professionals.*
>
> *The technology must disappear.*
>
> *The work of the technical architect must be the protagonist.*
>
> *Certilab Platform is not born to be another ERP.*
>
> *It is born to become the operating system of technical work.*
>
> *Complexity belongs to the Core.*
>
> *Simplicity belongs to the interface.*
>
> *Everything we build must always answer a single question:*
>
> *Does it help the professional work better?*
>
> *If the answer is no, it must not exist."*

This foreword is the conceptual reference for the entire book. It must not be reinterpreted.

---

## Volume Structure

| Volume | Title | Pages | Status |
|--------|-------|-------|--------|
| I | Foundations | 60–80 | ✅ Written |
| II | Visual Language | 80–120 | ✅ Written |
| III | Design System | 150–200 | ✅ Written |
| IV | UX Bible | 200–250 | ✅ Written |
| V | Copywriting | 80–100 | ✅ Written |
| VI | Brand Book | 100–150 | ✅ Written |
| VII | Implementation | 100–150 | ✅ Written |

**Total estimated pages:** 770–1,050

---

## Quick Navigation

| Document | Purpose |
|----------|---------|
| `Volume-01-Foundations.md` | Product philosophy, vision, principles, design manifesto |
| `Volume-02-Visual-Language.md` | Color, typography, iconography, space, motion |
| `Volume-03-Design-System.md` | Component architecture, patterns, states, behavior |
| `Volume-04-UX-Bible.md` | User experience, flows, interactions, accessibility |
| `Volume-05-Copywriting.md` | Tone of voice, microcopy, editorial style |
| `Volume-06-Brand-Book.md` | Identity, applications, brand assets, guidelines |
| `Volume-07-Implementation.md` | Technical architecture, tokens, CI/CD, quality gates |

---

## Cross-Reference Legend

Throughout this book, the following symbols are used for cross-referencing:

| Symbol | Meaning |
|--------|---------|
| → V2:§3.2 | Cross-reference to Volume 2, Section 3.2 |
| → DS:Component | Cross-reference to a Design System component |
| → BR:Guideline | Cross-reference to Brand Book guidelines |
| → PR:Principle | Cross-reference to a product principle |
| ⚠️ | Warning — potential pitfall or common mistake |
| ✅ | Correct pattern / approved approach |
| ❌ | Incorrect pattern — do not use |
| 📐 | Architectural decision |
| 🎯 | Design principle |
| 🔍 | Reference to source document |

---

## Reference Documents

> 📐 **Supremacy:** If any technical decision conflicts with The Book of Certilab, The Book of Certilab always prevails. See "BOOK SUPREMACY" above.

This book is coherent with and derives from the following foundational documents:

| Document | Role |
|----------|------|
| CF-000-PROJECT-BRAIN.md | Constitution — Project purpose and foundational decisions |
| CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md | Architecture freeze — Closed decisions for V1 |
| PRODUCT-VISION.md | Product vision and mission |
| PRODUCT-POSITIONING.md | Market position and differentiation |
| PRODUCT-ROADMAP.md | Product roadmap and version planning |
| PRODUCT-PERSONAS.md | User personas and profiles |
| PRODUCT-COMPETITORS.md | Competitive landscape analysis |
| DESIGN-SYSTEM-ARCHITECTURE.md | Design System technical architecture |
| AGENTS.md | Governance rules for AI-assisted development |

---

## Volume Access

Each volume is self-contained but references others. Readers are encouraged to start with Volume I (Foundations) to understand the conceptual framework before proceeding to specific volumes.

For designers: Start with Volume II (Visual Language) and Volume III (Design System).
For product managers: Start with Volume I (Foundations) and Volume IV (UX Bible).
For developers: Start with Volume III (Design System) and Volume VII (Implementation).
For content creators: Start with Volume V (Copywriting) and Volume VI (Brand Book).

---

*This book is a living document. As the product evolves, these volumes will be updated to reflect new decisions, patterns, and knowledge. Each update must preserve coherence with the foundation documents listed above.*