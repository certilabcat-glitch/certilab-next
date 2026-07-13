# PA-002 — Commercial Domain Architecture

> **Estado:** Aprobado  
> **Congelado por:** PA-900 — Product Architecture Closure  
> **Fecha de congelación:** 2026-07-12  
> **Versión:** 1.0  
> **Propósito:** Definir la arquitectura de producto del ciclo comercial completo que existe antes del Expediente. Este documento analiza si debe existir un Commercial Domain separado del Core Domain y establece los agregados, flujos y políticas de integración.  
> **Aplica a:** Todos los servicios futuros de Certilab (Second Opinion Energy Reports, GTD, ATI-03, etc.)

---

## 1. Problema

### 1.1 Estado actual

El modelo de dominio actual (Core V1) comienza en **Cliente** y **Expediente**:

```
Cliente → Inmueble → Expediente → Documento IA → PITR → Resultado
```

No existe representación de nada anterior a Cliente:
- ¿Cómo llega un visitante anónimo a convertirse en cliente?
- ¿Cómo se gestionan los leads, las órdenes, los pagos?
- ¿Dónde se almacena la aceptación contractual y legal?
- ¿Cómo se gestiona el Customer Success post-entrega?

El flujo real del negocio comienza mucho antes:

```
Visitor → Lead → Order → Payment → Contract → Legal Acceptance → Customer → [Core Domain]
```

### 1.2 Por qué esto importa ahora

El MVP actual ha congelado la arquitectura del Core V1 mediante CF-001A. Este núcleo es funcional para la ejecución técnica (gestión de expedientes, documentos, diagnósticos, dictámenes). Sin embargo, **el producto no puede operar sin la capa comercial**.

Cualquier servicio futuro (ATI-03, GTD, Certificados, etc.) compartirá el mismo ciclo comercial:
- Captación de leads
- Conversión a pedido
- Cobro
- Contratación legal
- Activación como cliente
- Post-venta y éxito del cliente

### 1.3 Pregunta de arquitectura

> ¿Debe existir un Commercial Domain como un Bounded Context separado del Core Domain, o deben integrarse en un único dominio?

---

## 2. Decisión de arquitectura

### 2.1 Respuesta

**Sí, debe existir un Commercial Domain separado del Core Domain.**

### 2.2 Justificación

| Criterio | Evaluación |
|----------|------------|
| **Razón de cambio distinta** | El ciclo comercial cambia por estrategia de precios, promociones, canales de captación, legislación de contratos. El core cambia por mejoras técnicas, nuevos tipos de expediente, algoritmos de PITR. Son velocidades y motivaciones distintas. |
| **Lenguaje ubicuo diferente** | El dominio comercial habla de leads, órdenes, pagos, contratos, customer success. El core técnico habla de expedientes, inmuebles, documentos, dictámenes, diagnósticos. Cada uno tiene su propio glosario. |
| **Equipos separados (futuro)** | A escala, el equipo comercial (marketing, ventas, customer success) opera independientemente del equipo técnico (arquitectos técnicos, ingenieros). La separación de dominios permite equipos autónomos. |
| **Vida independiente** | Un cliente puede existir sin tener un expediente activo (post-venta, histórico). Un expediente técnico no necesita conocer el detalle financiero de la orden. |
| **Reutilización multi-producto** | Todos los productos de Certilab (Second Opinion, GTD, ATI-03, certificados, consultoría) comparten el mismo ciclo comercial. Un único Commercial Domain sirve a todos. |
| **Protección del Core** | El Core V1 está congelado. Introducir lógica comercial en él rompería el acta de cierre arquitectónico. |

### 2.3 Consecuencias

Positivas:
- Separación limpia de responsabilidades
- Core protegido de cambios comerciales
- Ciclo comercial reusable por todos los productos
- Cada dominio puede evolucionar a su propio ritmo
- Esquemas de base de datos separados

Negativas:
- Mayor complejidad de integración (eventos, anti-corruption layer)
- Necesidad de un servicio de aplicación que orqueste la transición entre dominios
- Los datos del cliente aparecen en dos dominios (Customer en Commercial, Cliente en Core) → requiere sincronización

---

## 3. El ciclo comercial completo

### 3.1 Flujo de referencia del producto

```
                    ┌────────────────────────────────────────────────────────────────────┐
                    │                  COMMERCIAL DOMAIN                                  │
                    │                                                                    │
    ┌──────────┐  ┌──────┐  ┌───────┐  ┌───────────┐  ┌────────────┐  ┌────────────┐   │
    │ VISITOR  │→ │ LEAD │→ │ ORDER │→ │  PAYMENT   │→ │ CONTRACT   │→ │ CUSTOMER   │   │
    └──────────┘  └──────┘  └───────┘  └───────────┘  └────────────┘  └────────────┘   │
         │           │          │            │               │              │           │
         │  (orgánico,SEO,ads,│            │               │              │           │
         │   referral,partner)│            │               │              │           │
         │                   │            │               │              │           │
         └─── tracking ──────┴─── datos ──┴─── cobro ─────┴─── legal ────┴─── activo ─┘
         (PostHog, analytics)                                                           │
                      │                                                                 │
                      │                    GATE — Transición al Core                   │
                      └────────────────────────────────────────────────────────────────┘
                                                      │
                                                      ▼
                                          ┌─────────────────────┐
                                          │    CORE DOMAIN       │
                                          │                     │
                                          │  CLIENTE            │
                                          │     ↓               │
                                          │  INMUEBLE           │
                                          │     ↓               │
                                          │  EXPEDIENTE         │
                                          │     ↓               │
                                          │  DOCUMENTO IA       │
                                          │     ↓               │
                                          │  PITR               │
                                          │     ↓               │
                                          │  RESULTADO          │
                                          │                     │
                                          │  DELIVERY           │
                                          └─────────────────────┘
                                                      │
                                                      ▼
                                          ┌─────────────────────┐
                                          │  CUSTOMER SUCCESS    │  ← Post-servicio
                                          └─────────────────────┘
```

### 3.2 Ciclo completo (anteriores al core)

#### Fase 1: Captación (Visitor → Lead)

| Paso | Descripción | Responsable |
|------|-------------|-------------|
| Visitor llega | Usuario anónimo visita certilab.com (SEO, ads, referral, orgánico) | Marketing |
| Interacción | Visitor consume contenido (blog, landing page, calculadora) | Marketing |
| Captura | Visitor completa formulario o CTA → se registra su interés | Sistema |
| Lead creado | Se identifica al visitante con datos mínimos + product_intent | Sistema |

#### Fase 2: Cualificación (Lead)

| Paso | Descripción | Responsable |
|------|-------------|-------------|
| Lead new | Lead recién capturado, pendiente de evaluación | Sistema |
| Scoring automático | Sistema evalúa lead según datos + comportamiento | Sistema |
| Lead qualified | Lead supera umbral de cualificación → listo para venta | Sistema |
| Lead disqualified | Lead no supera umbral → descartado (con motivo) | Sistema/Manual |
| Contactación | Equipo comercial contacta al lead cualificado | Ventas |

#### Fase 3: Comercial (Lead → Order → Payment)

| Paso | Descripción | Responsable |
|------|-------------|-------------|
| Presupuesto | Lead solicita presupuesto o ve precio fijo en web | Sistema/Ventas |
| Order draft | Se crea orden con items según producto seleccionado | Sistema |
| Order confirmed | Lead confirma la orden y acepta el precio | Cliente |
| Payment initiated | Se inicia el cobro (Stripe, transferencia, etc.) | Sistema |
| Payment completed | Pago exitoso → orden pasa a paid | Sistema |
| Payment failed | Pago fallido → reintento automático o cancelación | Sistema |

#### Fase 4: Legal (Payment → Contract)

| Paso | Descripción | Responsable |
|------|-------------|-------------|
| Contract presented | Se muestra contrato/condiciones al cliente post-pago | Sistema |
| GDPR consent | Cliente acepta política de privacidad | Cliente |
| CCoC consent | Cliente acepta condiciones generales | Cliente |
| Specific terms | Cliente acepta términos específicos del producto | Cliente |
| Contract signed | Contrato firmado electrónicamente | Sistema |

#### Fase 5: Activación (Contract → Customer)

| Paso | Descripción | Responsable |
|------|-------------|-------------|
| Customer activated | Se crea el registro de cliente activo | Sistema |
| Segment assignment | Se asigna segmento según producto + perfil | Sistema |
| Welcome flow | Se dispara flujo de bienvenida (email, onboarding) | Sistema |
| Gate to Core | Se crea Cliente + Expediente en Core Domain | Sistema |

#### Fase 6: Post-servicio (Delivery → Customer Success)

| Paso | Descripción | Responsable |
|------|-------------|-------------|
| Technical delivery | Core completa el expediente y entrega resultado | Core |
| Customer Success | Seguimiento de satisfacción, retención, upselling | CS Team |
| Churn prevention | Identificación de clientes en riesgo de abandono | Sistema |
| Loyalty | Programa de fidelización, descuentos por recurrencia | Marketing |
| Feedback loop | Datos de CS retroalimentan captación y producto | Producto |

---

## 4. Agregados del Commercial Domain

### 4.1 Mapa de agregados

```
┌─────────────────────────────────────────────────────────────────────┐
│                     COMMERCIAL DOMAIN                                │
│                                                                      │
│  ┌─────────┐    ┌─────────┐    ┌───────────┐    ┌───────────┐      │
│  │  LEAD    │    │  ORDER   │    │  PAYMENT   │    │ CONTRACT   │      │
│  │          │    │          │    │            │    │            │      │
│  │ AR       │◄──►│ AR       │◄──►│ AR/VO      │◄──►│ AR         │     │
│  └─────────┘    └─────────┘    └───────────┘    └───────────┘      │
│       │               │                            │                │
│       ▼               ▼                            ▼                │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │                      CUSTOMER                             │       │
│  │                                                          │       │
│  │  AR — Agregado raíz que unifica la visión del cliente   │       │
│  └─────────────────────────────────────────────────────────┘       │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │                 CUSTOMER SUCCESS                         │       │
│  │                                                          │       │
│  │  AR — Gestión de retención, satisfacción, fidelización  │       │
│  └─────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Tabla de agregados

| Agregado | Tipo | Propósito | Invariantes clave |
|----------|------|-----------|-------------------|
| **Lead** | Aggregate Root | Representar a un posible cliente que ha mostrado interés pero aún no ha comprado | Email único en sistema; no reactivar sin intervención manual si está disqualified |
| **Order** | Aggregate Root | Representar un pedido de uno o más productos | No puede pasar a paid sin items con precio; un lead no puede tener dos draft activas |
| **Payment** | Aggregate Root | Representar una transacción financiera | No puede estar completed sin confirmación del provider; reembolso no puede exceder original |
| **Contract** | Aggregate Root | Representar la aceptación legal y contractual | No puede estar signed sin GDPR + CCoC aceptados; cada orden debe tener 0 o 1 contrato |
| **Customer** | Aggregate Root | Representar a un cliente activo que ya ha completado el ciclo comercial | No puede existir sin al menos una orden paid; active no puede tener orden cancelled sin revisión |
| **CustomerSuccess** | Aggregate Root | Gestión de post-venta, retención y fidelización | Solo aplicable a customers con lifetime_value > 0 |

### 4.3 Servicios de dominio

| Servicio | Propósito |
|----------|-----------|
| `LeadScoringService` | Evalúa automáticamente un lead según reglas de negocio (umbrales configurables) |
| `PricingService` | Calcula precios, descuentos y promociones para una orden |
| `PaymentGateway` | Abstrae la interacción con proveedores de pago (Stripe, etc.) |
| `ContractService` | Gestiona la generación y validación de contratos |
| `CustomerActivationService` | Orquesta la activación del customer y la transición al Core |
| `CustomerSuccessService` | Gestiona encuestas, detección de churn, upselling |

---

## 5. Integración con el Core Domain

### 5.1 Principios de integración

1. **El Core NO conoce el modelo comercial.** Recibe eventos con datos mínimos (customer_id, order_id, product_code).
2. **El dominio comercial NO conoce el modelo técnico.** Puede consultar estado de expedientes a través de queries (read model).
3. **La transición es un servicio de aplicación**, no de dominio.
4. **Cada dominio tiene su propio esquema de base de datos** (esquemas separados en Supabase).
5. **No hay joins entre esquemas.** Las referencias entre dominios son por identidad (UUID).
6. **Los eventos son el mecanismo de integración**, no las llamadas directas.

### 5.2 Eventos entre dominios

#### Commercial → Core

| Evento | Disparador | Manejador en Core | Efecto |
|--------|------------|-------------------|--------|
| `CustomerActivated` | Customer pasa a `active` | `CreateClienteFromCustomer` | Crea o actualiza Cliente en Core |
| `OrderPaid` | Order pasa a `paid` | `CreateExpedienteFromOrder` | Crea Expediente con tipo según product_code |
| `OrderRefunded` | Order pasa a `refunded` | `CancelExpediente` | Cancela expediente si aplica |

#### Core → Commercial

| Evento | Disparador | Manejador en Commercial | Efecto |
|--------|------------|-------------------------|--------|
| `ExpedienteCompleted` | Expediente completado técnicamente | `UpdateCustomerSuccess` | Actualiza estado de éxito en Customer |
| `ExpedienteDelivered` | Entrega de resultado al cliente | `TriggerPostService` | Inicia flujo de post-servicio y fidelización |

### 5.3 Mapeo de identidades

```
Commercial Domain              Core Domain
─────────────────              ───────────
Customer.id        ──────────▶ Cliente.metadata.customer_source_id
Order.id           ──────────▶ Expediente.metadata.order_id
Order.items[].product_code ──▶ Expediente.tipo
```

### 5.4 Anti-corruption layer

Para mantener ambos dominios desacoplados, se introduce una capa de integración que:

1. Traduce eventos del lenguaje comercial al técnico y viceversa
2. Valida que los datos mínimos existan antes de propagar
3. Maneja fallos de integración (circuit breaker, reintentos)
4. Registra en un log de auditoría todas las transiciones entre dominios

```
Commercial Domain          Integration Layer           Core Domain
     │                           │                        │
     │  CustomerActivated        │                        │
     │ ─────────────────────────►│                        │
     │                           │  CreateClienteCommand  │
     │                           │ ──────────────────────►│
     │                           │                        │  ──► Cliente creado
     │                           │  ClienteCreated        │
     │                           │ ◄──────────────────────│
     │  CustomerReady            │                        │
     │ ◄─────────────────────────│                        │
```

---

## 6. Esquema de datos (lógico)

### 6.1 Esquema: commercial

```sql
CREATE SCHEMA IF NOT EXISTS commercial;

-- LEAD
CREATE TABLE commercial.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source TEXT NOT NULL,                    -- 'seo', 'referral', 'partner', 'social', 'direct', 'ads'
    status TEXT NOT NULL DEFAULT 'new',       -- 'new', 'contacted', 'qualified', 'disqualified'
    score INTEGER DEFAULT 0,                  -- Lead scoring 0-100
    contact_name TEXT,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    product_intent TEXT[],                    -- Códigos de producto de interés
    metadata JSONB DEFAULT '{}',              -- UTMs, landing page, campaña
    qualified_at TIMESTAMPTZ,
    disqualified_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ORDER
CREATE TABLE commercial.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES commercial.leads(id),
    customer_id UUID,                         -- Opcional, se asigna post-pago
    subtotal DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    tax DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status TEXT NOT NULL DEFAULT 'draft',     -- 'draft', 'confirmed', 'paid', 'cancelled', 'refunded'
    notes TEXT,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE commercial.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES commercial.orders(id),
    product_code TEXT NOT NULL,                -- 'ATI-01', 'GTD-01', 'CEE-01', etc.
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    line_total DECIMAL(10,2) NOT NULL,
    metadata JSONB DEFAULT '{}'                -- Referencia catastral, datos específicos
);

-- PAYMENT
CREATE TABLE commercial.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES commercial.orders(id),
    method TEXT NOT NULL,                      -- 'card', 'transfer', 'paypal', 'bizum'
    provider TEXT NOT NULL,                    -- 'stripe'
    provider_payment_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending',    -- 'pending', 'processing', 'completed', 'failed', 'refunded'
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    fee DECIMAL(10,2),
    receipt_url TEXT,
    failure_reason TEXT,
    refunded_amount DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ
);

-- CONTRACT
CREATE TABLE commercial.contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES commercial.orders(id),
    customer_id UUID NOT NULL,
    document_version TEXT NOT NULL,
    accepted_at TIMESTAMPTZ,
    ip_address TEXT,
    user_agent TEXT,
    gdpr_consent BOOLEAN DEFAULT false,
    gdpr_consent_at TIMESTAMPTZ,
    cco_consent BOOLEAN DEFAULT false,
    cco_consent_at TIMESTAMPTZ,
    specific_terms_id UUID,
    status TEXT NOT NULL DEFAULT 'pending',    -- 'pending', 'signed', 'rejected', 'voided'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- CUSTOMER
CREATE TABLE commercial.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES commercial.leads(id),
    status TEXT NOT NULL DEFAULT 'active',     -- 'active', 'suspended', 'churned'
    segment TEXT NOT NULL DEFAULT 'individual', -- 'individual', 'admin_fincas', 'partner', 'enterprise'
    lifetime_value DECIMAL(12,2) DEFAULT 0,
    first_order_at TIMESTAMPTZ,
    last_order_at TIMESTAMPTZ,
    churn_risk TEXT,                           -- 'low', 'medium', 'high'
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    churned_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- CUSTOMER SUCCESS
CREATE TABLE commercial.customer_success (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES commercial.customers(id),
    nps_score INTEGER,                        -- -100 a +100
    satisfaction_score INTEGER,               -- 1-5
    last_contact_at TIMESTAMPTZ,
    next_follow_up TIMESTAMPTZ,
    notes TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 6.2 Esquema: core (existente, no modificado)

El esquema `core` no se modifica. Solo se añade un campo metadata a Cliente y Expediente para almacenar la referencia al Commercial Domain:

```sql
-- Adición mínima a core.clientes
ALTER TABLE core.clientes ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';
-- Dentro de metadata: { "customer_source_id": "uuid-del-customer", "origen_commercial": true }

-- Adición mínima a core.expedientes
ALTER TABLE core.expedientes ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';
-- Dentro de metadata: { "order_id": "uuid-de-la-orden", "product_code": "ATI-01" }
```

---

## 7. Ciclo de vida del Customer

### 7.1 Estados

```
                    ┌──────────────┐
                    │   VISITOR    │  (no modelado, tracking externo)
                    └──────┬───────┘
                           │ captura
                           ▼
                    ┌──────────────┐
                    │     LEAD     │
                    │    (new)     │
                    └──────┬───────┘
                           │ scoring automático
                           ▼
                    ┌──────────────┐                ┌──────────────────┐
                    │     LEAD     │                │      LEAD        │
                    │  (qualified) │                │  (disqualified)  │
                    └──────┬───────┘                └──────────────────┘
                           │ compra
                           ▼
                    ┌──────────────┐
                    │    ORDER     │
                    │   (paid)     │
                    └──────┬───────┘
                           │ contrato
                           ▼
                    ┌──────────────┐
                    │   CONTRACT   │
                    │   (signed)   │
                    └──────┬───────┘
                           │ activación
                           ▼
                    ┌──────────────┐
                    │   CUSTOMER   │
                    │   (active)   │
                    └──────┬───────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
            ┌────────────┐ ┌────────────┐
            │  CUSTOMER  │ │  CUSTOMER  │
            │ (suspended)│ │  (churned) │
            └────────────┘ └────────────┘
```

### 7.2 Ciclo de vida del Customer para Customer Success

```
                    ┌──────────────┐
                    │   CUSTOMER   │
                    │   (active)   │
                    └──────┬───────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
            ┌────────────┐ ┌──────────────────┐
            │  Servicio   │ │  Sin actividad    │
            │  activo     │ │  prolongada       │
            └──────┬─────┘ └────────┬─────────┘
                   │                │
                   ▼                ▼
            ┌────────────┐ ┌──────────────────┐
            │  Delivery   │ │  Riesgo de churn  │
            │  completado │ │  (churn_risk)     │
            └──────┬─────┘ └────────┬─────────┘
                   │                │
                   ▼                ▼
            ┌────────────┐ ┌──────────────────┐
            │  Post-venta │ │  Intervención CS  │
            │  (NPS, sat) │ │  (recuperación)   │
            └──────┬─────┘ └────────┬─────────┘
                   │                │
                   ▼                ▼
            ┌────────────┐ ┌──────────────────┐
            │  Retention  │ │    Churned        │
            │  (new order)│ │                   │
            └────────────┘ └──────────────────┘
```

---

## 8. Políticas de negocio del dominio comercial

### 8.1 Captación y cualificación

| ID | Política | Justificación |
|----|----------|---------------|
| CP-001 | Un lead no puede pasar a `qualified` sin score ≥ umbral configurable (por defecto 30) | Evita leads de baja calidad en el pipeline |
| CP-002 | Un lead `disqualified` no puede reactivarse sin intervención manual | Evita ciclos automáticos infinitos |
| CP-003 | El email debe ser único en el sistema (cruzado con Customer y Cliente) | Evita duplicación de registros |

### 8.2 Órdenes y pagos

| ID | Política | Justificación |
|----|----------|---------------|
| CP-004 | Una orden no puede pasar a `paid` sin que todos sus items tengan precio | Integridad financiera |
| CP-005 | Una orden `cancelled` o `refunded` no puede reactivarse | Trazabilidad de transacciones |
| CP-006 | El total debe ser igual a subtotal - descuento + impuestos | Consistencia de cálculo |
| CP-007 | Un lead no puede tener más de una orden `draft` activa | Evita duplicación de pedidos |
| CP-008 | Un pago no puede estar `completed` sin confirmación del provider | Seguridad financiera |
| CP-009 | No puede haber más de un pago `pending` o `processing` por orden | Evita duplicados de cobro |
| CP-010 | El reembolso no puede exceder el importe original | Límite legal |

### 8.3 Contratos y legal

| ID | Política | Justificación |
|----|----------|---------------|
| CP-011 | El contrato no puede estar `signed` sin que tanto gdpr_consent como cco_consent sean true | Cumplimiento legal (GDPR + CCoC) |
| CP-012 | Un contrato `voided` no puede reactivarse | Integridad legal |
| CP-013 | Cada orden debe tener exactamente un contrato asociado (0 o 1) | Trazabilidad contractual |

### 8.4 Customer y Customer Success

| ID | Política | Justificación |
|----|----------|---------------|
| CP-014 | Un Customer no puede existir sin al menos una orden `paid` | Coherencia del ciclo comercial |
| CP-015 | Un Customer `active` no puede tener una orden `cancelled` sin revisión manual | Protección del cliente |
| CP-016 | El segmento se asigna automáticamente según producto + frecuencia de compra | Personalización de servicio |
| CP-017 | Un customer con churn_risk `high` debe generar alerta automática al equipo CS | Prevención de abandono |

---

## 9. Relación con productos y servicios

### 9.1 Catálogo de productos (referencia)

| Código | Producto | Línea de negocio |
|--------|----------|------------------|
| ATI-01 | Informe Técnico de Eficiencia Energética (Segunda Opinión) | Energy |
| GTD-01 | Gestión Técnica Documental | GTD |
| CEE-01 | Certificado Energético | Energy |
| CEE-02 | Certificado Energético + Consultoría | Energy |
| CON-01 | Consultoría Técnica Especializada | Consulting |

Cada producto, al ser comprado, genera un expediente en el Core Domain con el tipo correspondiente.

### 9.2 Matriz de aplicabilidad multi-producto

| Componente Comercial | ATI-01 | GTD-01 | CEE-01 | CON-01 |
|---------------------|--------|--------|--------|--------|
| Lead | ✓ | ✓ | ✓ | ✓ |
| Order | ✓ | ✓ | ✓ | ✓ |
| Payment | ✓ | ✓ | ✓ | ✓ |
| Contract | ✓ | ✓ | ✓ | ✓ |
| Customer | ✓ | ✓ | ✓ | ✓ |
| Customer Success | ✓ | ✓ | ✓ | ✓ |

**Todos los productos comparten el mismo ciclo comercial.** La única diferencia es el `product_code` en OrderItem y el tipo de expediente que se crea en el Core.

---

## 10. Preguntas de la revisión de producto

### 10.1 Preguntas obligatorias (según AGENTS.md §9.5)

**1. ¿Qué capacidad funcional añade al MVP?**

Añade la capacidad de que un usuario real (no solo un operador interno) pueda:
- Llegar a la web de Certilab e identificar interés en un producto
- Ser gestionado como lead con scoring automático
- Comprar un producto mediante un flujo completo de pedido y pago
- Aceptar contractualmente los términos del servicio
- Ser activado como cliente con segmentación automática
- Recibir seguimiento post-servicio y gestión de retención

Sin esto, el MVP solo puede operar con clientes creados manualmente por operadores internos. No hay flujo de autoservicio para el usuario final.

**2. ¿Qué agregados participan?**

Commercial Domain: Lead, Order, Payment, Contract, Customer, CustomerSuccess
Core Domain: Cliente, Inmueble, Expediente (existentes, no modificados)

**3. ¿Cómo interactúan entre sí?**

Mediante eventos de dominio y un servicio de integración (anti-corruption layer):
- `CustomerActivated` → crea Cliente en Core
- `OrderPaid` → crea Expediente en Core
- `ExpedienteCompleted` → actualiza Customer Success en Commercial

**4. ¿Por qué esta es la solución de menor complejidad?**

- No se modifica el Core existente (congelado por CF-001A)
- Se añade un nuevo Bounded Context separado con su propio esquema
- La integración es mediante eventos, no mediante acoplamiento directo
- Todos los productos futuros reutilizan el mismo Commercial Domain
- No se introducen patrones prohibidos por MVP Discipline (§8)

### 10.2 Clasificación automática V2 (según AGENTS.md §9.6)

Este documento NO es V2. Desbloquea capacidad funcional crítica del MVP: el flujo de autoservicio para que un usuario compre y active un producto. Sin el Commercial Domain, Certilab no puede operar como producto SaaS real.

---

## 11. Próximos pasos

| Paso | Descripción | Prioridad |
|------|-------------|-----------|
| 1 | Validar este documento con el equipo de producto | Alta |
| 2 | Crear ADR formal para la separación de dominios (ADR-005-Commercial-Domain) | Alta |
| 3 | Diseñar el servicio de aplicación (Gate) que orquesta la transición Core ↔ Commercial | Alta |
| 4 | Implementar Lead y Order como primer MVP del Commercial Domain | Alta |
| 5 | Integrar pasarela de pago (Stripe) | Alta |
| 6 | Implementar Contract con términos legales | Media |
| 7 | Implementar Customer Success básico (NPS, encuestas) | Media |
| 8 | Migrar datos de clientes existentes si aplica | Baja |

---

## 12. Referencias

| Documento | Relación |
|-----------|----------|
| CF-001A — Acta de Cierre de Arquitectura V1 | Congela el Core, justifica la separación |
| CF-022 — Aggregate Boundaries | Define los agregados del Core que no se modifican |
| PA-001 — Product Architecture (existente) | Arquitectura de producto general |
| PA-001-CATALOG — Catálogo de productos | Define los productos que usan este dominio comercial |
| BP-100-03 — Modelo Operativo y Comercial | Define el modelo de negocio que este dominio implementa |
| GTM-001 — Go To Market | Define la estrategia de captación que nutre el Lead |
| ADR-003 — GTD Línea de Negocio | Primer caso de uso multi-producto que requiere este dominio |
| AGENTS.md §9 — Product-First Execution Mode | Marco de decisión aplicado a este diseño |