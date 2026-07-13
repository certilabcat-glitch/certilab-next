# PA-003A — The Product as an Executable Business Definition

> **Estado:** Approved  
> **Frozen by:** PA-900 — Product Architecture Closure  
> **Freeze date:** 2026-07-12  
> **Versión:** 1.0  
> **Propósito:** Reframing the entire Product Architecture around the principle that **a product is not a description of what a business does — it is the executable definition of that business**.  
> **Naturaleza:** Product Architecture manifesto. No modifica CF, no crea ADRs, no contiene código.  
> **Relación:** Supersedes the conceptual model of PA-003. The three-domain architecture (Product / Commercial / Core) is valid but incomplete — it describes components, not the execution principle that binds them.

---

## 1. The fundamental shift

> **"A Product is an Executable Business Definition."**

This is not a metaphor.

A product is not:
- A description of what a business does
- A set of features someone can buy
- A UI that lets users accomplish tasks

A product is:
- A **formal specification** of a business capability
- That specification is **directly executable** by the system
- Every business rule, constraint, policy, price, flow, and deliverable is encoded **in the product definition itself**, not in the code that interprets it

The system does not "implement" business logic. The system **executes the product definition**.

---

## 2. The problem with current architectures

Most software architectures, including the three-domain model from PA-003, treat the product as an **external concern**:

```
[Product Team defines] → [Engineering implements] → [System runs]
```

This creates an **interpretation gap**:

| Step | What happens | Risk |
|------|-------------|------|
| Product team defines a service | Document, spec, spreadsheet | Ambiguity |
| Engineering reads the spec | Interpretation, estimation | Translation error |
| Engineering implements | Code, business logic, conditions | Drift from spec |
| QA validates | Manual comparison | Incomplete coverage |
| Product reviews | "That's not what I meant" | Rework |

Every step in this chain is a **lossy compression** of the original business intent.

---

## 3. The product as executable definition

### 3.1 The principle

```
┌─────────────────────────────────────────────────────────────────────┐
│                      PRODUCT DEFINITION                              │
│                                                                      │
│  The product IS the code.                                            │
│  The code IS the specification.                                     │
│                                                                      │
│  There is no gap between what the business defines and what          │
│  the system executes.                                                │
└─────────────────────────────────────────────────────────────────────┘
```

A service in the catalog is not a JSON document that describes what the service does.  

It is a **function** that:

1. **Accepts inputs** within a defined schema
2. **Applies rules** (pricing, eligibility, validation)
3. **Orchestrates a workflow** (the execution flow)
4. **Produces outputs** (deliverables)
5. **Enforces constraints** (legal, regulatory, business)

### 3.2 What this means concretely

| Current approach | Executable definition approach |
|-----------------|-------------------------------|
| Service Catalog is a data table | Service Catalog is a registry of executable workflows |
| Pricing rules are business logic in code | Pricing IS part of the service definition, executed by a pricing engine |
| Execution flow is hardcoded in the Core | Execution flow IS the service definition; the Core is a generic workflow executor |
| Business policies are documented separately | Business policies ARE the service definition |
| Legal terms are external documents | Legal terms are part of the service contract definition |
| A new product requires coding new logic | A new product is a new definition in the catalog |

### 3.3 The execution model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PRODUCT CATALOG                                       │
│  (Registry of executable business definitions)                                │
│                                                                              │
│  Service ATI-01 {                                                            │
│    input_schema: { certificado: file, referencia: string, direccion: string }│
│    pricing: { base: 89€, rules: [first_order: -10%, bundle: -15%] }         │
│    validation: { certificado: must_be_valid, referencia: must_match }         │
│    workflow: [ validate → create_expediente → analyze → generate → deliver ]│
│    output: { format: pdf, includes: [report, dictamen, recommendations] }    │
│    terms: { contract: CCoC-2026-01, gdpr: true, sla: 5d }                   │
│  }                                                                            │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │ "Execute this definition"
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         EXECUTION ENGINE                                      │
│                                                                              │
│  The engine doesn't know what ATI-01 is. It reads the definition and         │
│  executes it.                                                                │
│                                                                              │
│  1. Validate inputs against input_schema                                    │
│  2. Calculate price using pricing rules                                     │
│  3. Execute workflow steps (each step is a generic action)                  │
│  4. Produce output according to output specification                         │
│  5. Enforce terms (SLA, GDPR, contract version)                              │
│                                                                              │
│  The engine is domain-agnostic. The product definition carries the domain.   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Implication for the three-domain model

PA-003 proposed:

```
Product Domain    →  Defines the catalog
Commercial Domain →  Manages the sale
Core Domain       →  Executes the service
```

This is still valid as a **component model** — it describes who does what.

But the **execution model** reframes it:

```
                    ┌─────────────────────────────────────┐
                    │         PRODUCT DEFINITION            │
                    │  (The executable business spec)       │
                    └──────────────┬──────────────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
          ▼                        ▼                        ▼
┌──────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│  PRODUCT DOMAIN   │  │  COMMERCIAL DOMAIN │  │    CORE DOMAIN     │
│                    │  │                    │  │                    │
│  Defines the "what"│  │  Executes the      │  │  Executes the      │
│  and "how"         │  │  "sale" workflow   │  │  "production"      │
│                    │  │                    │  │  workflow          │
│  The catalog       │  │  Order → Payment   │  │  Expediente →      │
│  IS the language   │  │  → Contract        │  │  Document → PITR   │
│  of the system     │  │                    │  │  → Deliverable     │
└──────────────────┘  └────────────────────┘  └────────────────────┘
                         │                         │
                         └──────────┬──────────────┘
                                    │
                                    ▼
                         ┌────────────────────┐
                         │   BUSINESS STATE   │
                         │                    │
                         │  The result of     │
                         │  executing the     │
                         │  product           │
                         │  definition        │
                         └────────────────────┘
```

In this model:

- **Product Domain** does not just "define" things. It **IS the executable specification language** of the entire platform.
- **Commercial Domain** and **Core Domain** are not "separate domains with their own logic". They are **workflow executors** that read and interpret the product definition.
- The **business logic** is not in any domain. It is **in the product definition**.

---

## 5. Why this is more than a conceptual shift

### 5.1 Concrete architectural consequences

| Aspect | Before (three-domain) | After (executable definition) |
|--------|----------------------|------------------------------|
| **Service Catalog** | A data table describing services | A registry of executable specifications |
| **Business logic** | Distributed across Commercial and Core | Centralized in the product definition |
| **New product** | Must implement logic in two domains | Define once in the catalog, both domains execute |
| **Pricing** | Calculated by Commercial logic | Defined in product; executed by pricing engine |
| **Workflow** | Hardcoded in Core services | Defined in product; executed by workflow engine |
| **Validation** | Scattered across forms and services | Defined in product; executed by validation engine |
| **Legal terms** | Reference to external documents | Part of the product definition |
| **Evolution** | Modify code in multiple domains | Version the product definition |

### 5.2 The Service IS the Business

If you take this principle to its logical conclusion:

```typescript
interface Service {
  code: string;
  version: string;
  name: string;
  status: 'active' | 'deprecated' | 'experimental';
  
  // What the service does
  inputSchema: JSONSchema;
  outputSchema: JSONSchema;
  
  // How much it costs
  pricing: PricingDefinition;
  
  // What happens when you run it
  workflow: WorkflowDefinition;
  
  // When it's not valid
  eligibilityRules: Rule[];
  
  // What you must accept
  terms: LegalDefinition;
  
  // What else it can be combined with
  bundles: BundleRule[];
}
```

If the system has 10 services, the system has 10 executable business definitions.  
The system does not "know" about energy reports or document management — it knows how to execute service definitions.

**The platform becomes a business definition engine.**

---

## 6. Alignment with existing architecture constraints

### 6.1 MVP Discipline (§9)

This analysis does not introduce new MVP functionality. It reframes the architectural model. The MVP continues with its current scope. The executable definition principle is a **long-term architectural foundation**, not an immediate implementation requirement.

### 6.2 Core V1 Freeze (§3, CF-001A)

The Core Domain is not modified. The principle of executable definitions treats the Core as a workflow executor that reads product definitions — but this requires **no changes to the Core's current implementation**. The Core's current code continues to run. The executable definition layer is additive, not transformative.

### 6.3 No Overengineering (§11)

The principle may appear abstract, but it prevents a specific form of overengineering: **building domain logic that duplicates product intent**. Without this principle, every new service requires custom Commercial and Core logic. With it, new services are just new definitions in the catalog.

### 6.4 ADR Requirement (§10.1)

If this principle is adopted as the foundation for the Product Architecture, it **does not require an ADR** because it does not modify any frozen architectural element. It is a guiding principle for future implementation, not a change to existing architecture.

However, the **Service Catalog schema** (the concrete manifestation of this principle) will require an ADR when it is implemented.

---

## 7. The evolutionary path

### Phase 1: Explicit definitions (now)
The product defines services as explicit, structured definitions. This is the **documentation phase** — what PA-001 and PA-003 already do.

### Phase 2: Formalized definitions (next)
The Service Catalog is implemented as a **formal schema** with types, validation, and versioning. The definitions are still interpreted by humans and code, but they are stored in a structured, queryable format.

### Phase 3: Executable definitions (future)
The Service Catalog definitions become **directly executable**. The platform reads a service definition and executes it without additional coding. This requires:
- A workflow engine that interprets execution flows
- A pricing engine that interprets pricing rules
- A validation engine that interprets input schemas
- A delivery engine that interprets output specifications

### Phase 4: Product as platform (V2+)
The product itself becomes the platform. New services are defined by configuring definitions in the catalog — the platform executes them without additional development. **The product becomes code.**

---

## 8. The principle as the product vision

> **Certilab's product is not a set of energy reports.**
>
> Certilab's product is an **executable business definition platform** that happens to ship energy reports as its first service.
>
> Every new service is not a new feature — it is a **new definition**.
>
> Every business change is not a code change — it is a **definition update**.
>
> The product IS the business. The business IS the product.

This is the north star for the Product Architecture. The three-domain model (PA-003) and the commercial lifecycle (PA-002) are the **how**. This document is the **why**.

---

## 9. References

| Document | Relationship |
|----------|-------------|
| PA-001 — Product Architecture | The architecture this principle should govern |
| PA-002 — Commercial Domain Architecture | Defines the sale workflow this principle informs |
| PA-003 — Product Domain Analysis | The three-domain model this principle supersedes conceptually |
| PA-001-CATALOG — Product Catalog | The catalog this principle would make executable |
| CF-000 — Project Brain | The foundational document this principle extends |
| ADR-001 — Certilab Engineering System | The engineering system this principle would influence |