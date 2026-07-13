# S1-CJ-001 — Commercial Journey Foundation

> **Epic:** Sprint 1 — Commercial Journey Foundation
> **Status:** Design (draft)
> **Fecha:** 2026-07-12
> **Documentos fuente:** PA-002, PA-003A, BP-100-03, GTM-001, PA-001-CATALOG

---

## 1. Product-First Execution Mode — Preguntas obligatorias (§9.5)

### 1.1 ¿Qué capacidad funcional añade al MVP?

Un flujo comercial completo y reutilizable que permite a cualquier usuario:

1. Descubrir un servicio desde una landing page pública
2. Ver el detalle del servicio con precios, FAQ y condiciones legales
3. Pagar mediante Stripe Checkout
4. Obtener cuenta automática (o login si ya existe)
5. Recibir el paquete legal completo (contrato, términos, GDPR, etc.)
6. Acceder al Customer Portal para seguimiento

Esta capacidad es **transversal** a todos los servicios futuros del MVP (ATI-03, Segunda Opinión, etc.) y evita implementar un flujo de pago y legal diferente para cada producto.

### 1.2 ¿Qué agregados participan?

| Agregado | Dominio | Rol |
|----------|---------|-----|
| **Lead** | Commercial (nuevo) | Captura del interés inicial antes de crear cuenta |
| **Order** | Commercial (nuevo) | Orden de servicio pagada; puente entre Commercial y Core |
| **Payment** | Commercial (nuevo) | Transacción Stripe; estado del pago |
| **Contract** | Commercial (nuevo) | Paquete legal aceptado con versionado |
| **Customer** | Commercial (nuevo) | Cliente comercial con perfil de facturación |
| **User** | Core (auth) | Cuenta de acceso (Supabase Auth) |
| **Cliente** | Core (existente) | Cliente del dominio técnico (ya existe en Core V1) |

### 1.3 ¿Cómo interactúan entre sí?

```
Landing/Servicio (público)
    ↓ selecciona producto
Stripe Checkout (pago)
    ↓ webhook success
Creación automática de cuenta (si no existe)
    ↓
Creación de Order + Payment
    ↓
Presentación del Legal Package
    ↓ aceptación
Generación de Contract (versionado)
    ↓
Customer Portal (dashboard de servicios)
    ↓
Redirección a la plataforma Core (expediente)
```

**Reglas de negocio clave:**

- Si el usuario **ya tiene cuenta**: login existente tras el pago, se asocia Order a su Customer
- Si el usuario **no tiene cuenta**: se crea automáticamente (email + contraseña temporal), se envía email de bienvenida
- El servicio no comienza hasta que el **Legal Package** esté firmado
- Stripe es la única pasarela de pago para el MVP (PA-002 §6)

### 1.4 ¿Por qué esta es la solución de menor complejidad?

1. **Reutilización** — El flujo se implementa una sola vez y se conecta a cualquier Product Definition futura
2. **Composición** — Combina Stripe Checkout (externo) + Supabase Auth (existente) + nuevo agregado Order
3. **Extensión controlada** — Se añaden 4 agregados nuevos (Lead, Order, Payment, Contract) pero todos dentro del Commercial Domain, sin tocar el Core V1 congelado
4. **Sin nuevos patrones** — No requiere Event Bus, CQRS ni microservicios. Es un flujo síncrono con webhook de Stripe
5. **Stripe Checkout** — Elimina la necesidad de implementar formularios de pago, manejo de tarjetas, cumplimiento PCI-DSS

No existe una solución más simple que cumpla el requisito completo.

---

## 2. Diseño

### 2.1 Arquitectura de rutas (Next.js App Router)

```
/                             → Landing principal
/servicios/[slug]             → Página de servicio (pricing, FAQ, CTA)
/servicios/[slug]/checkout    → Redirección a Stripe Checkout
/auth/callback                → Callback post-pago (ya existe)
/auth/legal-package           → Aceptación del paquete legal
/dashboard                    → Customer Portal (ya existe como plataforma)
```

### 2.2 Estructura del Commercial Domain

```
src/
  lib/
    commercial/
      lead.repository.ts
      lead.service.ts
      order.repository.ts
      order.service.ts
      payment.repository.ts
      payment.service.ts
      contract.repository.ts
      contract.service.ts
      customer.repository.ts
      customer.service.ts
      stripe/
        stripe.webhook.ts
        stripe.checkout.ts
        stripe.client.ts
      legal/
        legal-package.service.ts
        legal-document.repository.ts
      __tests__/
        ...
  types/
    commercial/
      lead.ts
      order.ts
      payment.ts
      contract.ts
      customer.ts
      legal-document.ts
  app/
    servicios/
      [slug]/
        page.tsx
    auth/
      legal-package/
        page.tsx
    api/
      stripe/
        webhook/route.ts
        checkout/route.ts
```

### 2.3 Modelo de datos (Supabase)

```sql
-- Commercial Domain
CREATE TABLE commercial.lead (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  source TEXT DEFAULT 'landing',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE commercial.customer (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  stripe_customer_id TEXT,
  billing_address JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE commercial.product_order (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES commercial.customer(id),
  product_slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','paid','legal_pending','legal_accepted','in_progress','completed','cancelled')),
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  stripe_session_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE commercial.payment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES commercial.product_order(id),
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','processing','succeeded','failed','refunded')),
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE commercial.contract (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES commercial.product_order(id),
  customer_id UUID REFERENCES commercial.customer(id),
  version INTEGER NOT NULL DEFAULT 1,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE commercial.contract_document (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES commercial.contract(id),
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

-- Audit trail
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

### 2.4 Flujo detallado

#### Paso 1: Landing → Servicio

- Página pública `/servicios/[slug]` que carga el Product Definition del servicio
- Muestra: título, descripción, precio (desde `src/config/pricing.ts`), FAQ, CTA "Contratar"
- Botón CTA → `/api/stripe/checkout` (server action)

#### Paso 2: Stripe Checkout

- API route crea una Stripe Checkout Session con:
  - `mode: payment`
  - `line_items`: producto + precio
  - `success_url`: `/auth/callback?session_id={CHECKOUT_SESSION_ID}`
  - `cancel_url`: `/servicios/[slug]`
  - `customer_email`: email del usuario (si está logueado) o null
  - `metadata`: `{ product_slug, user_id? }`
- Redirecciona a Stripe

#### Paso 3: Webhook Stripe (evento `checkout.session.completed`)

- Valida la firma del webhook
- Obtiene el email del customer desde Stripe
- **Si el usuario no existe**: crea cuenta Supabase Auth + Cliente (Core) + Customer (Commercial)
- **Si el usuario existe**: asocia Order a su Customer existente
- Crea Order con status `paid`
- Crea Payment asociado
- Redirecciona al usuario a `/auth/legal-package?order_id=XXX`

#### Paso 4: Legal Package

- Muestra los documentos legales requeridos para el servicio
- Cada documento debe ser aceptado explícitamente (checkbox individual)
- Botón "Aceptar y continuar"
- Server action: crea Contract + ContractDocuments con versionado
- Timestamp y audit trail de cada aceptación
- Redirecciona a `/dashboard` (Customer Portal)

#### Paso 5: Customer Portal

- Muestra las órdenes activas del usuario
- Cada orden tiene: estado, enlace a la plataforma (expediente), documentos legales descargables
- Punto de entrada único para el usuario

### 2.5 Componentes UI necesarios

| Componente | Descripción |
|------------|-------------|
| `ServiceHero` | Hero de la página de servicio con precio y CTA |
| `ServicePricing` | Tabla de precios (si hay variantes) |
| `ServiceFAQ` | FAQ específico del servicio |
| `LegalPackageForm` | Formulario de aceptación legal con checkboxes |
| `LegalDocumentViewer` | Visualizador de documento legal (HTML renderizado) |
| `OrderStatusBadge` | Badge de estado de la orden |
| `CustomerOrderList` | Lista de órdenes del customer |

### 2.6 Stripe webhook signature validation

Requerido: añadir `stripe` npm package y configurar webhook secret en variables de entorno.

---

## 3. Tareas de implementación

### Tarea 1: Migración de base de datos — Schema Commercial
- Crear schema `commercial` en Supabase
- Crear tablas: `lead`, `customer`, `product_order`, `payment`, `contract`, `contract_document`, `audit_trail`
- Índices y RLS policies (basadas en `auth.uid()`)
- Aplicar migración

### Tarea 2: Tipos TypeScript — Commercial Domain
- Crear `src/types/commercial/lead.ts`
- Crear `src/types/commercial/order.ts`
- Crear `src/types/commercial/payment.ts`
- Crear `src/types/commercial/contract.ts`
- Crear `src/types/commercial/customer.ts`
- Crear `src/types/commercial/legal-document.ts`

### Tarea 3: Repositorios — Commercial Domain
- Implementar `commercial/lead.repository.ts`
- Implementar `commercial/customer.repository.ts`
- Implementar `commercial/order.repository.ts`
- Implementar `commercial/payment.repository.ts`
- Implementar `commercial/contract.repository.ts`
- Tests unitarios para cada repositorio

### Tarea 4: Servicios — Commercial Domain
- `commercial/lead.service.ts` — crear lead desde landing
- `commercial/customer.service.ts` — crear/buscar customer, asociar a user
- `commercial/order.service.ts` — crear orden, transicionar estados
- `commercial/payment.service.ts` — registrar pago desde webhook
- `commercial/contract.service.ts` — crear contrato, gestionar aceptación
- Tests unitarios para cada servicio

### Tarea 5: Integración Stripe
- `commercial/stripe/stripe.client.ts` — cliente Stripe configurado
- `commercial/stripe/stripe.checkout.ts` — crear Checkout Session
- `commercial/stripe/stripe.webhook.ts` — manejar eventos webhook
- Tests de integración (mocked Stripe)

### Tarea 6: Legal Package
- `commercial/legal/legal-package.service.ts` — generar paquete legal dinámico
- `commercial/legal/legal-document.repository.ts` — persistencia de documentos legales
- Templates de documentos: service order receipt, professional engagement, T&C, GDPR, technical declarations
- Versionado semántico de documentos legales

### Tarea 7: Páginas públicas — Servicios
- `src/app/servicios/[slug]/page.tsx` — página de servicio
- Componentes: ServiceHero, ServicePricing, ServiceFAQ
- Integrar con Product Definition (PA-003A)

### Tarea 8: Legal Package Page
- `src/app/auth/legal-package/page.tsx` — página de aceptación legal
- Componente LegalPackageForm con checkboxes individuales
- Server action para aceptar y persistir
- Audit trail de cada aceptación

### Tarea 9: API Routes
- `src/app/api/stripe/checkout/route.ts` — POST para crear sesión Stripe
- `src/app/api/stripe/webhook/route.ts` — POST para webhook de Stripe

### Tarea 10: Customer Portal
- Extender el dashboard existente con sección "Mis servicios"
- Mostrar órdenes activas con estado
- Enlace a documentos legales descargables
- Enlace a la plataforma técnica (expediente)

### Tarea 11: Auth — Auto-creación de cuenta
- En el webhook, detectar si el usuario existe por email
- Si no existe: crear cuenta con Supabase Auth Admin API
- Enviar email de bienvenida con contraseña temporal (o magic link)
- Asociar Customer + Cliente (Core)

### Tarea 12: Tests
- Tests unitarios de todos los servicios y repositorios
- Tests de integración del flujo completo (mocked Stripe)
- Tests de las API routes

---

## 4. Criterios de aceptación

### Functional

- [ ] CA-01: Un usuario anónimo puede ver una página de servicio pública con precio y descripción
- [ ] CA-02: Un usuario anónimo puede iniciar checkout y pagar con Stripe
- [ ] CA-03: Tras el pago exitoso, se crea automáticamente una cuenta si el usuario no existe
- [ ] CA-04: Tras el pago exitoso, si el usuario ya existe, se asocia la orden a su cuenta
- [ ] CA-05: El usuario debe aceptar explícitamente cada documento del legal package
- [ ] CA-06: El legal package incluye: service order receipt, professional engagement, T&C, GDPR consent, technical declarations
- [ ] CA-07: Cada aceptación legal queda registrada con timestamp y audit trail
- [ ] CA-08: Los documentos legales tienen versionado
- [ ] CA-09: El usuario accede al Customer Portal tras completar el flujo
- [ ] CA-10: El Customer Portal muestra las órdenes activas del usuario

### Technical

- [ ] CA-11: RLS policies protegen todas las tablas del schema commercial
- [ ] CA-12: Stripe webhook valida la firma HMAC
- [ ] CA-13: No se tocan los agregados del Core V1
- [ ] CA-14: El flujo completo puede ejecutarse en local con Stripe test mode
- [ ] CA-15: Todos los tests pasan (unitarios + integración)
- [ ] CA-16: Build completo sin errores

---

## 5. Plan de tests

### Tests unitarios

| Archivo | Coverage mínimo |
|---------|-----------------|
| `commercial/lead.service.test.ts` | Estados de lead, creación |
| `commercial/customer.service.test.ts` | Creación, búsqueda, asociación con user |
| `commercial/order.service.test.ts` | Transiciones de estado, creación |
| `commercial/payment.service.test.ts` | Registro de pago, webhook |
| `commercial/contract.service.test.ts` | Creación, aceptación, versionado |
| `commercial/legal/legal-package.service.test.ts` | Generación de paquete |
| `commercial/stripe/stripe.checkout.test.ts` | Creación de sesión |
| `commercial/stripe/stripe.webhook.test.ts` | Validación de eventos |

### Tests de integración

| Escenario | Descripción |
|-----------|-------------|
| Flujo completo anónimo | Landing → Checkout → Pago → Cuenta creada → Legal → Portal |
| Flujo completo usuario existente | Login → Checkout → Pago → Legal → Portal |
| Fallo de pago | Checkout → Pago fallido → Redirección |
| Webhook inválido | Firma incorrecta → 401 |
| Legal package incompleto | Falta algún documento → Error de validación |

---

## 6. Variables de entorno requeridas

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 7. Dependencias npm a añadir

- `stripe` — SDK oficial de Stripe (necesario para webhook y checkout)

---

## 8. Lo que NO se hace en este sprint

- No se implementa ATI-01 ni ATI-03 (próximo sprint)
- No se toca el Core V1 (Cliente, Inmueble, Expediente, Documento IA)
- No se implementan precios dinámicos (pricing config estático para MVP)
- No se implementa facturación recurrente (solo one-time payments)
- No se implementa multi-idioma (solo español/catalán)
- No se implementan descuentos ni cupones

---

## 9. Arquitectura — Verificaciones

### 9.1 Gobernanza checklist

- [ ] ¿Está cubierto por el Product Domain? Sí (PA-001 + PA-002)
- [ ] ¿Pertenece al dominio correcto? Sí (Commercial Domain — PA-002)
- [ ] ¿Introduce un concepto de negocio genuinamente nuevo? Sí (Order, Payment, Contract, Customer como entidades separadas del Core)
- [ ] ¿Puede implementarse configurando una Product Definition existente? No aplica (es la fundación que las Product Definitions usarán)
- [ ] ¿Respeta CF-000, CF-001A, CF-002, CF-050? Sí — no modifica arquitectura congelada

### 9.2 EPIC WORKFLOW audit checklist (§10.2)

- [ ] El código respeta los Aggregate Roots definidos en CF-022
- [ ] No se han introducido nuevas dependencias entre Bounded Contexts no autorizadas
- [ ] No se ha modificado el modelo de datos sin ADR
- [ ] No se han introducido patrones prohibidos por MVP DISCIPLINE (§8)
- [ ] La solución implementada es la de menor complejidad posible
- [ ] No hay duplicación de lógica que deba estar en el Core existente

### 9.3 Clasificación V2

Mejoras clasificadas como V2 (no se implementan ahora):
- Precios dinámicos configurables por admin
- Facturación recurrente / suscripciones
- Multi-idioma
- Descuentos y cupones
- Dashboard de administración de órdenes

---

## 10. Secuencia de implementación

```
Semana 1:
  └ T1: Migración DB (schema commercial)
  └ T2: Tipos TypeScript
  └ T3: Repositorios
  └ T4: Servicios comerciales

Semana 2:
  └ T5: Integración Stripe
  └ T6: Legal package
  └ T7: Páginas públicas de servicios

Semana 3:
  └ T8: Legal package page
  └ T9: API routes
  └ T10: Customer Portal

Semana 4:
  └ T11: Auth — auto-creación de cuenta
  └ T12: Tests
  └ Auditoría
  └ Informe de cierre
  └ Commit & Tag
```

---

## 11. Abierto / Pendiente de decisión

- **¿Magic link vs contraseña temporal para auto-creación de cuenta?** → Se recomienda magic link si Supabase lo soporta, contraseña temporal como fallback
- **¿Los documentos legales son estáticos o generados dinámicamente?** → Inicialmente estáticos con versionado. Dinámicos si se requiere personalización por servicio
- **¿El Customer Portal es una página nueva o una sección del dashboard existente?** → Se recomienda integrarlo en el dashboard existente (`/dashboard`) como una sección "Mis servicios"

---

> **Próximo paso:** Esperar aprobación del plan. Tras aprobación, crear el branch de la épica y comenzar T1.