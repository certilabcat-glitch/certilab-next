# PRODUCT AUDIT — MVP Commercial Readiness

**Date:** 2026-07-16
**Author:** Lead Full Stack Engineer
**Scope:** Product perspective only. No database/architecture improvements considered.
**Rule:** "Does this help us get our first paying customer?"

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [What Is Already Finished](#2-what-is-already-finished)
3. [Complete Workflow Map](#3-complete-workflow-map)
4. [What Is Missing — Per Workflow Stage](#4-what-is-missing--per-workflow-stage)
5. [Blockers](#5-blockers)
6. [Classified Task List](#6-classified-task-list)
7. [Foundation V2 Backlog](#7-foundation-v2-backlog)
8. [Recommended Implementation Order](#8-recommended-implementation-order)
9. [Commercial Journey Gap Analysis](#9-commercial-journey-gap-analysis)
10. [Reference Documents](#10-reference-documents)

---

## 1. Executive Summary

The application has a **solid technical core** but is **not commercially ready**. An architect can log in, create clients, create properties, create expedientes, upload documents, emit dictámenes, and deliver reports. However, the **first paying customer** cannot:

- Sign up and pay for a product
- See a clear product offering with prices
- Create an expediente from the client portal
- Track progress of their expediente
- Download their final report

The platform is **operational on the Backoffice side (AT)** but **empty on the client side** and **missing the entire commercial layer**.

**Estimated effort to reach first customer readiness: 6–8 weeks** (focused, full-time).

---

## 2. What Is Already Finished

### 2.1 Authentication & Authorization
- [x] Supabase Auth integration (email/password)
- [x] Login page (`/saas/login`)
- [x] Auth callback route
- [x] Middleware for route protection
- [x] User menu with profile/logout
- [x] Role-based access (client vs AT via JWT claims)

### 2.2 Backoffice (Arquitecto Técnico)

#### Dashboard (`/dashboard` — client view) and (`/at/dashboard` — AT view)
- [x] AT Dashboard with real counts from DB
- [x] Bandeja Técnica table with pagination, filters, sorting
- [x] Technical queue management

#### Clients (Cliente)
- [x] Client creation during expediente creation flow
- [x] Client lookup via NIF/NIE/documento
- [x] Client linked to auth user

#### Properties (Inmueble)
- [x] Property search via INE API
- [x] Property creation linked to expediente
- [x] Property reference stored in expediente

#### Expedientes (Core Workflow)
- [x] Create expediente wizard (Nuevo Expediente page)
- [x] Expediente detail page (AT view): full tabbed interface
- [x] Document upload/download/delete
- [x] Document list per expediente
- [x] Generar Diagnóstico (AI-powered technical diagnosis)
- [x] Asistente de Decisión Técnica (AI assistant)
- [x] Emitir Dictamen (emit technical opinion)
- [x] Entregar Dictamen / Entregar Resultado (deliver result)
- [x] Corregir Expediente (correct/return for revision)
- [x] Expediente state machine (borrador → completado → etc.)
- [x] Solicitar Segunda Opinión (request second opinion) — partial UI

#### Technical Queue («AT» area)
- [x] AT-specific expediente detail with all actions
- [x] Full tab system: documentos, dictamen, entrega, diagnóstico
- [x] Document upload with RLS verification

### 2.3 Client Portal
- [x] Mis Expedientes page — lists user's expedientes with real data
- [x] Filters (activos/completados)
- [x] Expediente detail page — shows expediente data, documents
- [ ] (Missing) Client cannot create expedientes from portal
- [ ] (Missing) Client cannot see dictamen results
- [ ] (Missing) No report download

### 2.4 Design System
- [x] Component library (Card, Badge, DataTable, Input, DropdownMenu, Skeleton, Separator, Toast, Icons)
- [x] Storybook documentation for core components
- [x] Design tokens (colors, typography, spacing, radius)
- [x] Brand book & visual language

### 2.5 Business Documentation
- [x] Product catalog defined (ITE, CEE, Asesoramiento, GTD)
- [x] Product personas defined
- [x] Pricing defined (docs only, not implemented)
- [x] GTM strategy documented
- [x] Commercial architecture defined
- [x] BP-900 Business Blueprint completed
- [x] PA-900 Product Architecture completed
- [x] GTM-900 Go-to-Market completed

### 2.6 Legal & Public
- [x] Privacy policy page
- [x] Cookie consent component
- [x] SEO: energy certificate search page

---

## 3. Complete Workflow Map

```
                   ┌─────────────────────────────────────┐
                   │          CUSTOMER JOURNEY           │
                   │  (NOT BUILT)                        │
                   │                                     │
                   │  Landing → Pricing → Signup → Pay   │
                   │  → Create Expediente → Track →      │
                   │  → Receive Report → Done            │
                   └─────────────────────────────────────┘
                               │
                               ▼
                   ┌─────────────────────────────────────┐
                   │          BACKOFFICE (AT)            │
                   │  (BUILT — mostly complete)          │
                   │                                     │
    Lead ─────────→  Client ──────→ Property             │
        (manual)      (manual)       (manual)            │
                               │                         │
                               ▼                         │
                         Expediente                      │
                               │                         │
                               ▼                         │
                     Upload Documents                    │
                               │                         │
                    ┌──────────┴──────────┐              │
                    ▼                     ▼              │
           AI Diagnosis          Architect Review        │
                    │                     │              │
                    └──────────┬──────────┘              │
                               ▼                         │
                          Dictamen                       │
                               │                         │
                               ▼                         │
                      Deliver Report ──→ CLIENT         │
                               │          (PDF delivery  │
                               │           NOT BUILT)    │
                               ▼                         │
                         Done ✓                          │
                   └─────────────────────────────────────┘
```

**Current status:**
- Backoffice workflow is ~85% complete
- Client external journey is ~10% complete
- Commercial layer (payments) is 0%

---

## 4. What Is Missing — Per Workflow Stage

### 4.1 Lead → Client (Commercial Entry)

| Missing | Priority | Impact | Notes |
|---------|----------|--------|-------|
| Public landing/pricing page | **P0** | Blocker | No way for customers to discover product |
| Self-service signup with product selection | **P0** | Blocker | Customers must select a product (ITE, CEE, etc.) |
| Checkout & payment flow | **P0** | Blocker | No payment = no revenue |
| Order/invoice generation | **P0** | Blocker | Legal requirement for commercial transactions |
| Email notifications (welcome, order confirmation) | **P1** | High | Customer experience |
| Commercial dashboard for AT (manage orders) | **P1** | High | AT needs to see what's been ordered |

**Estimate:** 3 weeks

### 4.2 Client Portal (Self-Service)

| Missing | Priority | Impact | Notes |
|---------|----------|--------|-------|
| Client can create expediente from portal | **P1** | High | Currently only AT can create |
| Client can see expediente status/progress | **P1** | High | Currently shows data but not progress |
| Client can see dictamen result | **P1** | High | Currently only AT sees dictamen |
| Client can download final report (PDF) | **P0** | Blocker | Core value delivery |
| Client document upload from portal | **P1** | High | Currently only AT can upload |
| Client notifications (status changes) | **P2** | Medium | Nice to have for MVP |

**Estimate:** 2 weeks

### 4.3 Report Generation & Delivery

| Missing | Priority | Impact | Notes |
|---------|----------|--------|-------|
| PDF report generation from dictamen data | **P0** | Blocker | Core product output |
| Secure report delivery (download link) | **P0** | Blocker | Must be delivered to client |
| Report branding (company logo, format) | **P1** | High | Professional appearance |
| Report version history | **P2** | Low | Future improvement |

**Estimate:** 2 weeks

### 4.4 Backoffice Polish

| Missing | Priority | Impact | Notes |
|---------|----------|--------|-------|
| Dashboard real data (currently shows "0") | **P1** | High | Dashboard is a static shell |
| Configuración page (empty) | **P2** | Medium | Can ship without it |
| State machine enforcement (UI guards) | **P1** | High | Prevent invalid transitions |
| Loading states / error states in all pages | **P1** | High | UX quality |
| Empty states (no data yet) | **P2** | Low | UX polish |
| Dashboard metrics (expedientes/documents per day) | **P2** | Low | Not MVP-critical |

**Estimate:** 1 week

### 4.5 Infrastructure & Ops

| Missing | Priority | Impact | Notes |
|---------|----------|--------|-------|
| Error monitoring (Sentry or similar) | **P1** | High | Cannot debug production issues |
| Analytics (page views, conversion tracking) | **P1** | High | Cannot measure business |
| CI/CD pipeline for production | **P1** | High | Need to deploy |
| Custom domain / SSL | **P0** | Blocker | Cannot launch without branded domain |
| Production database backup strategy | **P1** | High | Data safety |

**Estimate:** 1 week

---

## 5. Blockers

These are items that **must** be resolved before any customer can use the platform. They are non-negotiable for MVP launch.

### Blocker 1: No Payment Processing
**Severity:** CRITICAL
**Description:** There is no way for a customer to pay for a product. The entire commercial schema exists in the database but has zero frontend integration.
**Resolution:** Implement Stripe Checkout (or similar) integrated with the Orders flow.
**Depends on:** Public pricing page, product selection, order creation.

### Blocker 2: No Report Output
**Severity:** CRITICAL
**Description:** The AT can emit a dictamen and mark it as "delivered", but there is no actual PDF/ report file generated. The client receives nothing tangible.
**Resolution:** Build PDF generation from dictamen data, create a download endpoint, show it in the client portal.
**Depends on:** Dictamen data structure (already exists), PDF generation library.

### Blocker 3: No Customer Acquisition Path
**Severity:** CRITICAL
**Description:** There is no public-facing page where a potential customer can learn about Certilab's products and pricing. The only entry point is the login page.
**Resolution:** Build a public landing page with product info and pricing (can be single-page MVP).
**Depends on:** Product/pricing definitions (already documented).

### Blocker 4: No Production Deployment
**Severity:** CRITICAL
**Description:** The app is running locally or on a dev deployment. No production-ready deployment with custom domain exists.
**Resolution:** Complete Vercel/self-hosted deployment with custom domain, SSL, environment configuration.

---

## 6. Classified Task List

### P0 — Must have before first customer (estimated: 4-5 weeks)

| # | Task | Est. | Depends On |
|---|------|------|------------|
| P0.1 | Public landing page with product & pricing info | 1 week | — |
| P0.2 | Self-service signup with product selection | 1 week | P0.1 |
| P0.3 | Stripe Checkout integration (or equivalent) | 1.5 weeks | P0.2 |
| P0.4 | Order creation and confirmation flow | 0.5 week | P0.3 |
| P0.5 | PDF report generation from dictamen | 1.5 weeks | — |
| P0.6 | Report delivery to client portal | 0.5 week | P0.5 |
| P0.7 | Production deployment (domain, SSL, env) | 0.5 week | — |
| P0.8 | Custom domain and branded email | 0.5 week | P0.7 |

### P1 — High priority for MVP launch (estimated: 3-4 weeks)

| # | Task | Est. | Depends On |
|---|------|------|------------|
| P1.1 | Client portal: create expediente | 0.5 week | — |
| P1.2 | Client portal: expediente progress tracking | 0.5 week | — |
| P1.3 | Client portal: dictamen viewing | 0.5 week | P0.5 |
| P1.4 | Client portal: document upload from client side | 0.5 week | — |
| P1.5 | Dashboard with real data (fix "0" metrics) | 0.5 week | — |
| P1.6 | State machine UI guards (prevent invalid transitions) | 0.5 week | — |
| P1.7 | Loading/error/empty states across all pages | 0.5 week | — |
| P1.8 | Error monitoring (Sentry) | 0.25 week | — |
| P1.9 | Basic analytics (page views, signup events) | 0.25 week | — |
| P1.10 | Production database backup strategy | 0.25 week | — |
| P1.11 | Email notifications (order confirmation, report ready) | 1 week | P0.3, P0.5 |
| P1.12 | Commercial dashboard for AT | 0.5 week | P0.4 |

### P2 — Post-MVP (estimated: 2-3 weeks)

| # | Task | Est. | Notes |
|---|------|------|-------|
| P2.1 | Configuración page | 0.5 week | Empty placeholder currently |
| P2.2 | Empty states for tables | 0.25 week | UX polish |
| P2.3 | Dashboard historical metrics | 0.5 week | Nice to have |
| P2.4 | Report version history | 0.5 week | |
| P2.5 | Client notifications (status changes) | 0.5 week | |
| P2.6 | Solicitar Segunda Opinión polish | 0.5 week | Currently rough |
| P2.7 | Dashboard per-day charts | 0.5 week | |
| P2.8 | Report branding customization | 0.5 week | |

---

## 7. Foundation V2 Backlog

> All database/architecture improvements moved here. Do NOT implement now.

These are explicitly excluded from current development per strategic directive:

- Database schema normalization / Foundation V2 migration
- SQL audit findings implementation
- RLS policy improvements (unless causing a functional bug)
- Migration consolidation and cleanup
- Data model redesign
- Aggregate root refactoring
- Any architecture pattern changes
- Performance optimization of queries
- Index optimization
- Type safety improvements in repositories
- Test coverage increases (unless for new P0/P1 features)
- Lint/style fixes in files not being actively worked on
- Any refactoring that does not unlock a P0/P1 feature

**When this backlog will be reopened:** After MVP launch and first paying customer.

---

## 8. Recommended Implementation Order

### Phase 1: Foundation for Revenue (Weeks 1-2)
```
Week 1:    P0.1  Public landing + pricing page
           P0.7  Production deployment (do early to test)
           P0.8  Custom domain + branded email

Week 2:    P0.2  Self-service signup with product selection
           P0.3  Stripe Checkout integration (start)
```

### Phase 2: Complete the Transaction (Weeks 3-4)
```
Week 3:    P0.3  Stripe Checkout integration (finish)
           P0.4  Order creation + confirmation flow
           P1.8  Error monitoring (Sentry)
           P1.9  Basic analytics

Week 4:    P0.5  PDF report generation from dictamen
           P1.12 Commercial dashboard for AT
```

### Phase 3: Client Portal Completion (Weeks 5-6)
```
Week 5:    P0.6  Report delivery to client portal
           P1.1  Client create expediente
           P1.2  Client expediente progress tracking
           P1.3  Client dictamen viewing

Week 6:    P1.4  Client document upload
           P1.5  Dashboard real data fix
           P1.6  State machine UI guards
           P1.11 Email notifications
```

### Phase 4: Polish & Launch (Weeks 7-8)
```
Week 7:    P1.7  Loading/error/empty states
           P1.10 Backup strategy
           P2.1  Configuración page (if time)
           P2.2  Empty states

Week 8:    QA, testing, dry-run with real customer
           Launch 🚀
```

---

## 9. Commercial Journey Gap Analysis

### Current State
```
Landing → [MISSING]
Pricing → [MISSING]
Signup  → Login page exists, but no product selection
Pay     → [MISSING]
Portal  → Basic expediente list, no self-service creation
Track   → Basic status, no progress visualization
Receive → Dictamen marked as "delivered" but no actual file
Done    → No notification, no download, no invoice
```

### Target State (Minimum Viable Commercial)
```
Landing → Two sections: "Productos" + "Precios" (MVP version)
Pricing → Simple table: ITE €X, CEE €Y, GTD €Z
Signup  → Select product → Create account → or Login if returning
Pay     → Stripe Checkout → Success → Redirect to Portal
Portal  → Create expediente → Upload docs → Track progress
Track   → "En revisión" / "Completado" with dates
Receive → Download PDF button + email link
Done    → Invoice in portal + confirmation email
```

**Gap closure requires implementing P0.1 through P0.6 in order.**

---

## 10. Reference Documents

| Document | Path |
|----------|------|
| Product Catalog | `docs/product/PA-001-CATALOG.md` |
| Pricing Definition | `docs/analysis/GTM-001-PRICING.md` |
| Commercial Architecture | `docs/product/PA-002-COMMERCIAL-ARCHITECTURE.md` |
| Commercial DB Schema | `src/types/commercial/index.ts` |
| Customer Repository | `src/lib/commercial/customer.repository.ts` |
| Order Repository | `src/lib/commercial/order.repository.ts` |
| GTM Strategy | `docs/analysis/GTM-001-GTM-STRATEGY.md` |
| MVP Freeze | `docs/CF-050-MVP-FREEZE.md` |
| RC-1 Audit | `docs/audits/RC-001-FINAL-AUDIT.md` |
| Previous State Report | `docs/analysis/INFORME-ESTADO-GLOBAL-2026-07-13.md` |
| Previous Backlog | `docs/analysis/RELEASE-BACKLOG-2026-07-13.md` |

---

## Appendix: Product Readiness Checklist

> Use this to track overall readiness for first commercial customer.

### Commercial Layer
- [ ] Public landing page with product info
- [ ] Self-service signup with product selection
- [ ] Stripe Checkout / payment integration
- [ ] Order creation and confirmation
- [ ] Invoice generation

### Client Portal
- [ ] Client can create expediente
- [ ] Client can upload documents
- [ ] Client can view progress
- [ ] Client can see dictamen/report
- [ ] Client can download PDF report
- [ ] Client receives email notifications

### Backoffice
- [ ] Dashboard shows real data
- [ ] State machine transitions enforced in UI
- [ ] All pages have loading/error states
- [ ] Commercial dashboard for AT

### Infrastructure
- [ ] Production deployment active
- [ ] Custom domain configured
- [ ] SSL/HTTPS
- [ ] Error monitoring (Sentry)
- [ ] Analytics tracking
- [ ] Database backups configured

### Definition of Launch Ready
- [ ] A new user can discover the product, sign up, pay, create an expediente, upload documents, and receive a delivered report
- [ ] An AT can manage the full expediente workflow from creation to delivery
- [ ] The system can process a payment and generate an order record
- [ ] The system can generate and deliver a PDF report
- [ ] The system sends email notifications for key events
- [ ] Production monitoring is active
- [ ] A dry-run with a real customer has been completed successfully

---

**Next step:** Awaiting approval before modifying any code.