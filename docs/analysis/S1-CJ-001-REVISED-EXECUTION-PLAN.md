# S1-CJ-001 — Revised Execution Plan: Commercial Domain for ATI-01

> **Estado:** Draft (pendiente de aprobación)
> **Fecha:** 2026-07-12
> **Documentos fuente:** PA-001, PA-002, PA-003, PA-003A, PA-900, CF-022, CF-001A, S1-CJ-001

---

## Phase 1 — ATI-01 Customer Journey Validation

### 1.1 Complete ATI-01 Journey Map

ATI-01 ("Segunda Opinión Energética") es el primer producto que atravesará el flujo Commercial → Core.

```
[Web Pública]
    |
    | 1. Descubre servicio ATI-01
    | 2. Ve precio (fijo: 150€), descripción, FAQ
    | 3. Click "Solicitar Segunda Opinión"
    v
[Commercial Domain] — CAPTACIÓN
    |
    | 4. Stripe Checkout (pago único)
    | 5. Pago exitoso → Webhook Stripe
    v
[Commercial Domain] — ACTIVACIÓN
    |
    | 6. ¿Usuario existe? → Sí: asociar a Customer existente
    |                      No: crear cuenta Supabase Auth
    | 7. Presentar paquete legal (Términos, GDPR, Encargo)
    | 8. Aceptación legal → Contract
    v
[Commercial → Core] — PUENTE
    |
    | 9. Crear Cliente en Core (si no existe)
    | 10. Crear Expediente en Core con tipo = 'SEGUNDA_OPINION'
    | 11. Asignar AT disponible
    v
[Core Domain] — EJECUCIÓN TÉCNICA
    |
    | 12. Inspección PITR
    | 13. Emisión de dictamen
    | 14. Resultado
    v
[Delivery] — ENTREGA
    |
    | 15. Dictamen firmado digitalmente
    | 16. Disponible en Customer Portal
    | 17. Notificación al cliente
```

### 1.2 Business Interactions Map

| Paso # | Interacción | Actor | Sistema | Dato crítico |
|--------|-------------|-------|---------|--------------|
| 1-3 | Descubrir y contratar | Visitante anónimo | Web Pública + Stripe | Product slug (`ATI-01`) |
| 4-5 | Pagar | Visitante → Stripe | Stripe Checkout | Email, PaymentIntent ID |
| 6 | Identificar/Crear cuenta | Sistema (webhook) | Supabase Auth Admin API | Email, User ID |
| 7-8 | Aceptar legal | Usuario autenticado | Legal Package UI | Contract version, timestamps |
| 9 | Sincronizar Customer → Cliente | Sistema | Commercial → Core API | Customer ID → Cliente ID |
| 10 | Crear expediente técnico | Sistema | Core Service | Product slug, Cliente ID, Order ID |
| 11-14 | Ejecutar servicio técnico | AT | Core (PITR, Documento IA) | Expediente ID |
| 15-17 | Entregar resultado | Sistema | Core → Commercial → Portal | Dictamen PDF, Order ID |

### 1.3 Business Entities (complete map)

| Entidad | Dominio | Propósito | ¿Nueva o existente? |
|---------|---------|-----------|---------------------|
| User | Core (Auth) | Cuenta de acceso | Existente (Supabase Auth) |
| Profile/User Data | Core | Datos del usuario autenticado | Existente |
| Cliente | Core | Cliente del dominio técnico | Existente (Core V1) |
| Inmueble | Core | Propiedad del cliente | Existente (Core V1) |
| Expediente | Core | Expediente técnico | Existente (Core V1) |
| Documento IA | Core | Documento con IA | Existente (Core V1) |
| **Lead** | **Commercial** | **Interés inicial antes de pago** | **Nueva propuesta** |
| **Customer** | **Commercial** | **Cliente comercial con perfil de facturación** | **Nueva propuesta** |
| **Order** | **Commercial** | **Orden de servicio pagada** | **Nueva propuesta** |
| **Payment** | **Commercial** | **Transacción Stripe** | **Nueva propuesta** |
| **Contract** | **Commercial** | **Paquete legal aceptado** | **Nueva propuesta** |
| **ContractDocument** | **Commercial** | **Documento legal individual aceptado** | **Nueva propuesta** |
| Product Definition | Product Domain | Definición del servicio (config) | Documental (PA-003A) |

---

### 1.4 Dependency Matrix: Product → Commercial → Core → Delivery

```
Product Domain (PA-001, PA-003A)
    │ Define qué se vende
    │ pricing, execution_flow, delivery_spec, legal_terms
    ▼
Commercial Domain (PA-002) ← NUEVO
    │ Gestiona la relación comercial: Lead → Order → Payment → Contract → Customer
    │ Depende de: Product Definitions (pricing, legal_terms)
    │ Provee a Core: Customer activado + Order autorizada
    ▼
Core Domain (CF-022) ← EXISTENTE (CONGELADO)
    │ Ejecuta el servicio técnico: Cliente → Inmueble → Expediente → Documento IA → PITR
    │ Depende de: Commercial (Customer + Order) para crear Cliente + Expediente
    │ Provee a Delivery: Resultado técnico (dictamen)
    ▼
Delivery
    │ Entrega el resultado al cliente: PDF firmado, portal, notificación
    │ Depende de: Core (resultado), Commercial (Customer para notificar)
```

**Reglas de no-solapamiento:**
- Commercial **no** toca Inmueble, Expediente, Documento IA
- Core **no** gestiona pagos, contratos, leads
- Product Domain es **documental/configuración**, no runtime
- Delivery es **transversal** (usa datos de Commercial + Core)

---

## Phase 2 — Commercial Domain Minimization

### Análisis individual de cada agregado propuesto

---

### AGGREGATE: Lead

| Aspecto | Análisis |
|---------|----------|
| **Business responsibility** | Capturar el interés de un visitante anónimo antes de que pague. Registrar qué producto le interesó, de qué fuente vino (landing, SEO, referral), y su email para posible seguimiento si abandona el checkout. |
| **Business invariants** | • Un Lead tiene email + product_slug obligatorios<br>• Puede convertirse en Customer o quedar como lead no convertido<br>• No debe haber leads duplicados para el mismo email+product (último UPDATE prevalece) |
| **¿Aggregate Root necesario?** | **SÍ condicional** — Si queremos tracking de abandonos y campañas de recuperación (email marketing post-abandono), Lead debe ser AR con identidad propia. Si NO hay campañas de recuperación en MVP, Lead es prescindible. |
| **¿Puede diferirse a V2?** | **SÍ** — Para ATI-01, el flujo mínimo es: landing → pago → cuenta. Si el usuario abandona el checkout, simplemente no hay orden. No se requiere Lead para el MVP si aceptamos no hacer remarketing. |
| **¿Puede ser Entity o Value Object?** | Podría ser un Value Object dentro de un `CustomerJourney` o registrarse como evento de auditoría. Pero si se requiere tracking individual, necesita identidad → Entity. |
| **Decisión propuesta** | **DIFERIR a V2.** Para ATI-01, el primer punto de contacto persistente es el Customer tras el pago. La pérdida de información de abandonos es aceptable para el MVP. |

---

### AGGREGATE: Customer

| Aspecto | Análisis |
|---------|----------|
| **Business responsibility** | Representar al cliente como entidad comercial con perfil de facturación, Stripe customer ID, y datos de contacto. Es el "dueño" de las órdenes y contratos. |
| **Business invariants** | • Un Customer tiene 1 User asociado (auth.users)<br>• Un Customer puede tener múltiples Orders<br>• Un Customer puede tener múltiples Contracts<br>• email debe ser único |
| **¿Aggregate Root necesario?** | **SÍ** — Customer es el AR central del Commercial Domain. Es la identidad comercial del usuario, distinta del User técnico (auth) y del Cliente técnico (Core). Sin Customer no hay órdenes ni contratos. |
| **¿Puede diferirse a V2?** | **NO** — Sin Customer no podemos asociar órdenes, pagos ni contratos a una identidad comercial. Es requisito para ATI-01. |
| **¿Puede ser Entity o Value Object?** | Debe ser Aggregate Root porque: (1) es el punto de entrada a toda la raíz de agregados comerciales, (2) tiene un ciclo de vida independiente, (3) contiene invariantes que protegen la consistencia de las órdenes. |
| **Relación con Cliente (Core)** | Customer (Commercial) y Cliente (Core) son conceptos distintos. Customer es comercial; Cliente es técnico. Pero están relacionados 1:1: un Customer activado → crea un Cliente en Core. Esta sincronización es una **regla de negocio** que cruza bounded contexts. |
| **Decisión propuesta** | **IMPLEMENTAR como Aggregate Root.** Es el núcleo del Commercial Domain. |

---

### AGGREGATE: Order

| Aspecto | Análisis |
|---------|----------|
| **Business responsibility** | Registrar la compra de un producto/servicio. Transiciona por estados: `pending → paid → legal_pending → legal_accepted → in_progress → completed`. Es el puente entre Commercial y Core: cuando una Order está `legal_accepted`, se dispara la creación del Expediente en Core. |
| **Business invariants** | • Toda Order pertenece a un Customer<br>• Order tiene exactamente 1 product_slug<br>• Transiciones de estado válidas (no saltos)<br>• No puede pasar a `in_progress` sin `legal_accepted`<br>• No puede crearse sin Payment exitoso |
| **¿Aggregate Root necesario?** | **SÍ** — Order tiene ciclo de vida propio, estado, y es el AR que orquesta la transición al Core. |
| **¿Puede diferirse a V2?** | **NO** — Ordenar un servicio es el paso fundamental del Commercial Domain. Sin Order no hay expediente que crear. |
| **¿Puede ser Entity o Value Object?** | Debe ser AR porque: (1) tiene un ciclo de vida con transiciones de estado, (2) es invocado desde fuera del dominio, (3) contiene la referencia al pago y al contrato. |
| **Decisión propuesta** | **IMPLEMENTAR como Aggregate Root.** Simplificar estados para MVP: `pending → paid → legal_accepted → completed`. Eliminar `legal_pending` e `in_progress` como estados explícitos. |

---

### AGGREGATE: Payment

| Aspecto | Análisis |
|---------|----------|
| **Business responsibility** | Registrar la transacción financiera asociada a una Order. Contiene el stripe_payment_intent_id, el estado del pago, el importe, la moneda. |
| **Business invariants** | • Todo Payment pertenece a 1 Order (1:1 en MVP)<br>• Estados: `pending → succeeded | failed`<br>• El importe debe coincidir con el precio del producto<br>• La referencia a Stripe es inmutable tras el éxito |
| **¿Aggregate Root necesario?** | **NO** — Payment puede ser un Entity dentro del aggregate de Order. No tiene ciclo de vida independiente: su existencia depende de la Order. Si la Order no existe, el Payment no tiene sentido. |
| **¿Puede diferirse a V2?** | **NO** — Sin registro de pago, no podemos verificar que el servicio está pagado. Pero no necesita ser AR. |
| **¿Puede ser Entity o Value Object?** | **SÍ, como Entity dentro de Order.** Payment es un entity owned por Order: tiene identidad (UUID) pero su ciclo de vida está subordinado a Order. Si Order se elimina, Payment se elimina. |
| **Decisión propuesta** | **NO es Aggregate Root.** Implementar como **Entity** dentro del aggregate de Order. Esto reduce el número de ARs de 6 a 5 (sin Lead) o incluso menos. |

---

### AGGREGATE: Contract

| Aspecto | Análisis |
|---------|----------|
| **Business responsibility** | Representar la aceptación legal del paquete de documentos por parte del cliente. Cada Contract tiene un versionado y contiene múltiples ContractDocuments individualmente aceptados. |
| **Business invariants** | • Todo Contract pertenece a 1 Order<br>• Contract tiene versionado (número de versión secuencial)<br>• Todos los ContractDocuments deben estar `accepted=true` para que Contract esté completo<br>• El timestamp de aceptación es irreversibl |
| **¿Aggregate Root necesario?** | **NO** — Contract es parte del ciclo de vida de Order. Su existencia depende de Order. Al igual que Payment, no tiene sentido sin la Order que lo contiene. |
| **¿Puede diferirse a V2?** | **NO** — La aceptación legal es requisito regulatorio. No podemos iniciar el servicio sin ella. Pero no necesita ser AR. |
| **¿Puede ser Entity o Value Object?** | **SÍ, como Entity dentro de Order.** Contract y ContractDocument son entities owned por Order. El aggregate Order contendría: Order (AR) + Payment (Entity) + Contract (Entity) + ContractDocument[] (Entities). |
| **Decisión propuesta** | **NO es Aggregate Root.** Implementar como **Entity** dentro del aggregate de Order. Esto mantiene la consistencia: si la Order se completa, el pago y el contrato están juntos. |

---

### AGGREGATE: ContractDocument

| Aspecto | Análisis |
|---------|----------|
| **Business responsibility** | Documento legal individual (Términos, GDPR, Encargo, etc.) que el cliente acepta explícitamente. Cada documento tiene versión, contenido, timestamp de aceptación. |
| **Business invariants** | • Pertenece a 1 Contract<br>• Cada document_type debe ser único por Contract<br>• La aceptación es irreversible<br>• El contenido del documento está versionado |
| **¿Aggregate Root necesario?** | **NO** — Es un entity anidado dentro de Contract, que a su vez está dentro de Order. Nunca se accede a ContractDocument sin pasar por Contract. |
| **¿Puede diferirse a V2?** | **PARCIALMENTE** — El número de documentos legales puede reducirse para MVP. Por ejemplo: 1 documento combinado en lugar de 6 individuales. Pero la funcionalidad de aceptación legal no es diferible. |
| **¿Puede ser Entity o Value Object?** | **Entity** — Tiene identidad (UUID), ciclo de vida dentro de Contract, pero no independencia. |
| **Decisión propuesta** | **NO es Aggregate Root.** Implementar como **Entity** dentro de Contract (que es Entity dentro de Order). Para MVP, simplificar a 3 documentos clave (Términos, GDPR, Encargo profesional) en lugar de 6. |

---

### AGGREGATE: CustomerSuccess (propuesto en PA-002)

| Aspecto | Análisis |
|---------|----------|
| **Business responsibility** | Gestión post-venta: retención, fidelización, seguimiento. |
| **¿Agregate Root necesario?** | **NO para MVP.** Esto es claramente V2. |
| **Decisión propuesta** | **DIFERIR a V2.** No implementar en absoluto. |

---

## Resultado de la Minimización

### Antes: 6 Aggregate Roots

| AR | Decisión |
|----|----------|
| Lead | ❌ Diferir a V2 |
| Customer | ✅ AR propio |
| Order | ✅ AR propio (contenedor) |
| Payment | ❌ Entity dentro de Order |
| Contract | ❌ Entity dentro de Order |
| ContractDocument | ❌ Entity dentro de Contract (que es Entity de Order) |

### Después: 2 Aggregate Roots

```
Customer (AR)
    ├── id, email, name, stripe_customer_id
    ├── user_id (ref: auth.users)
    ├── billing_address
    └── created_at

Order (AR) ← contenedor del ciclo de vida comercial
    ├── id, customer_id (ref: Customer)
    ├── product_slug (ref: Product Definition)
    ├── status: pending | paid | legal_accepted | completed
    ├── amount, currency
    ├── stripe_session_id
    ├── metadata (product_slug, user_id, etc.)
    ├── created_at, updated_at
    │
    ├── Payment (Entity)
    │   ├── id, order_id (FK)
    │   ├── stripe_payment_intent_id
    │   ├── status: pending | succeeded | failed
    │   ├── amount, currency
    │   └── paid_at
    │
    ├── Contract (Entity)
    │   ├── id, order_id (FK)
    │   ├── version: integer
    │   ├── accepted_at
    │   └── created_at
    │       │
    │       └── ContractDocument (Entity) [1..*]
    │           ├── id, contract_id (FK)
    │           ├── document_type
    │           ├── content
    │           ├── version
    │           ├── accepted: boolean
    │           └── accepted_at

AuditTrail (registro separado, no AR)
    └── entity_type, entity_id, action, actor_id, metadata, created_at
```

### Tablas en Supabase

```sql
-- SCHEMA: commercial

-- AR: Customer
CREATE TABLE commercial.customer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) UNIQUE,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    stripe_customer_id TEXT,
    billing_address JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- AR: Order (contiene Payment + Contract + ContractDocuments como entidades propias)
CREATE TABLE commercial.order (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES commercial.customer(id),
    product_slug TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending','paid','legal_accepted','completed','cancelled')),
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'EUR',
    stripe_session_id TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Entity: Payment (owned por Order)
CREATE TABLE commercial.payment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES commercial.order(id),
    stripe_payment_intent_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending','processing','succeeded','failed','refunded')),
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'EUR',
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Entity: Contract (owned por Order)
CREATE TABLE commercial.contract (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES commercial.order(id),
    version INTEGER NOT NULL DEFAULT 1,
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Entity: ContractDocument (owned por Contract)
CREATE TABLE commercial.contract_document (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES commercial.contract(id),
    document_type TEXT NOT NULL
        CHECK (document_type IN (
            'service_order_receipt',
            'professional_engagement',
            'general_terms',
            'gdpr_consent',
            'technical_declaration',
            'explicit_acceptance'
        )),
    content TEXT NOT NULL,
    version TEXT NOT NULL,
    accepted BOOLEAN DEFAULT false,
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Registro de auditoría (servicio transversal)
CREATE TABLE commercial.audit_trail (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    action TEXT NOT NULL,
    actor_id UUID,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Revised Implementation Sequence

```
FASE 1 (pre-implementación) — VALIDACIÓN ← ESTAMOS AQUÍ
    └ Validación del journey ATI-01 ✓
    └ Minimización de agregados ✓
    └ Aprobación del plan

FASE 2 — COMMERCIAL DOMAIN (2 ARs)
    └ T1: Migración DB — schema commercial (solo 5 tablas)
    └ T2: Tipos TypeScript
    └ T3: Repositorios (customer, order con entities anidadas)
    └ T4: Servicios comerciales
    └ T5: Tests unitarios

FASE 3 — STRIPE INTEGRATION
    └ T6: Stripe client + checkout session
    └ T7: Webhook handler
    └ T8: Account auto-creation (Supabase Auth Admin API)
    └ T9: Tests de integración Stripe

FASE 4 — LEGAL PACKAGE + UI
    └ T10: Legal package service (3 documentos MVP)
    └ T11: Legal package page + form
    └ T12: Service landing page (/servicios/ati-01)
    └ T13: API routes (checkout, webhook)

FASE 5 — INTEGRACIÓN CON CORE
    └ T14: Bridge service (Customer → Cliente, Order → Expediente)
    └ T15: Customer Portal (dashboard de servicios)
    └ T16: Tests de integración del flujo completo

FASE 6 — CIERRE
    └ T17: Tests completos
    └ T18: Auditoría específica
    └ T19: Informe de cierre
    └ Commit & Tag
```

---

## Governance Checklist (§9.1)

- [x] ¿Está cubierto por el Product Domain? Sí (PA-001 + PA-003A)
- [x] ¿Pertenece al dominio correcto? Sí (Commercial Domain — PA-002)
- [x] ¿Introduce conceptos de negocio genuinamente nuevos? Sí, pero minimizados: solo Customer y Order como ARs
- [x] ¿Puede implementarse configurando una Product Definition existente? Sí — ATI-01 se configura como Product Definition; el flujo Commercial es el motor que la ejecuta
- [x] ¿Respeta CF-000, CF-001A, CF-002, CF-050? Sí — no modifica arquitectura congelada del Core V1

## EPIC WORKFLOW Audit Checklist (§10.2)

- [x] El código respeta los Aggregate Roots definidos en CF-022 → No toca Core
- [x] No se han introducido nuevas dependencias entre Bounded Contexts no autorizadas → Commercial → Core es unidireccional
- [ ] No se ha modificado el modelo de datos sin ADR → Sin cambios en Core
- [x] No se han introducido patrones prohibidos por MVP DISCIPLINE → No hay Event Bus, CQRS, etc.
- [x] La solución implementada es la de menor complejidad posible → 2 ARs en lugar de 6
- [x] No hay duplicación de lógica que deba estar en el Core existente → Customer ≠ Cliente; Order ≠ Expediente

---

## Clasificación V2

| Mejora | Motivo |
|--------|--------|
| Lead tracking + remarketing | Funcionalidad comercial avanzada, no bloqueante para MVP |
| CustomerSuccess / post-venta | V2 por definición |
| 6 documentos legales completos | MVP usa 3; ampliar a 6 en V2 |
| Precios dinámicos | Pricing config estático para MVP |
| Multi-idioma | V2 |
| Descuentos y cupones | V2 |
| Dashboard de administración de órdenes | V2 |

---

> **Próximo paso:** Revisión y aprobación del plan. Tras aprobación, se procederá a la Fase 2 (T1: migración DB con 5 tablas y 2 ARs).