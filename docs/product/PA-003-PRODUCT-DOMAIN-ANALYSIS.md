# PA-003 — Product Domain Analysis

> **Estado:** Aprobado  
> **Congelado por:** PA-900 — Product Architecture Closure  
> **Fecha de congelación:** 2026-07-12  
> **Versión:** 1.0  
> **Propósito:** Explorar si debe existir un Product Domain por encima del Commercial Domain, si el Service Catalog debe convertirse en el Aggregate Root principal del negocio, y si la plataforma debe modelarse como "Servicios → Contratación → Ejecución" en lugar de "Clientes → Expedientes".  
> **Naturaleza:** Análisis arquitectónico de producto. No modifica CF, no crea ADRs, no contiene código.  
> **Relación:** Complementa PA-002 (Commercial Domain Architecture) y PA-001 (Product Architecture).

---

## 1. El problema profundo

### 1.1 El modelo actual

```
Cliente → Inmueble → Expediente → Documento IA → PITR → Resultado
```

Este modelo es **entity-first**: parte de la pregunta "¿quién?" (Cliente) y llega a "¿qué?" (Expediente). Pero en la realidad del negocio, la primera pregunta es:

> **"¿Qué servicio necesita este cliente?"**

El Cliente no existe como entidad abstracta. Existe porque **contrata un servicio**. El Expediente no es un contenedor genérico. Es la **ejecución de un servicio contratado**.

### 1.2 El servicio como razón de ser

Certilab no vende clientes. No vende expedientes.

Certilab vende **servicios técnicos**:
- Segunda Opinión Energética (ATI-03)
- Gestión Técnica Documental (GTD)
- Certificado Energético (CEE)
- Consultoría Técnica (CON)

Cada servicio tiene:
- Un **precio** y unas **condiciones comerciales**
- Un **contenido** (qué incluye, qué no incluye)
- Un **flujo de ejecución** (pasos técnicos para completarlo)
- Un **entregable** (informe, documento, certificado)
- Unas **garantías** y un **soporte post-venta**

### 1.3 Las tres preguntas del usuario

```
¿Qué necesito?         →   ¿Cómo lo contrato?     →   ¿Cómo se ejecuta?
     │                              │                           │
  PRODUCT                         COMMERCIAL                  CORE
  DOMAIN                          DOMAIN                      DOMAIN
     │                              │                           │
 Service Catalog                Contract an Order          Execute Service
```

El usuario no piensa "voy a crear un expediente". Piensa "necesito una Segunda Opinión Energética para mi piso".

---

## 2. ¿Debe existir un Product Domain por encima del Commercial Domain?

### 2.1 Respuesta

**Sí. El Product Domain debe existir como el dominio superior que define qué se vende, a qué precio, y bajo qué condiciones.**

### 2.2 Arquitectura de tres dominios

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           PRODUCT DOMAIN                                 │
│                                                                          │
│  Define el catálogo de servicios: qué se ofrece, cómo se configura,     │
│  cuánto cuesta, qué incluye, qué flujo de ejecución tiene.              │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                         SERVICE                                    │   │
│  │                         CATALOG                                    │   │
│  │                                                                     │   │
│  │  Agregado raíz del negocio. Define la oferta comercial de          │   │
│  │  Certilab. Cada Service tiene: code, name, description,            │   │
│  │  pricing_rules, execution_flow, delivery_spec, legal_terms,         │   │
│  │  valid_combinations, etc.                                           │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Responsabilidades:                                                      │
│  - Definir qué productos existen                                        │
│  - Definir reglas de precios (fijos, variables, descuentos)             │
│  - Definir el flujo de ejecución de cada servicio                        │
│  - Definir los entregables de cada servicio                              │
│  - Definir combinaciones válidas (bundles, paquetes)                    │
│  - Versionar servicios (cambios de precio, alcance, condiciones)        │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   │ "Quiero contratar este servicio"
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         COMMERCIAL DOMAIN                                │
│                                                                          │
│  Gestiona el ciclo de vida del cliente: captación, venta, cobro,        │
│  contratación, activación, post-venta.                                   │
│                                                                          │
│  Lead → Order → Payment → Contract → Customer → Customer Success        │
│                                                                          │
│  Cada Order referencia a un Service del Product Domain.                 │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   │ "El servicio ha sido contratado y pagado"
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           CORE DOMAIN                                    │
│                                                                          │
│  Ejecuta el servicio técnico: recibe una orden de servicio y produce     │
│  el entregable según el flujo definido por el Service.                   │
│                                                                          │
│  Cliente → Inmueble → Expediente → Documento IA → PITR → Resultado      │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Por qué Product Domain debe ser independiente

| Razón | Explicación |
|-------|-------------|
| **El servicio es anterior al cliente** | No existe Certilab sin servicios que ofrecer. El catálogo es la primera decisión de negocio. |
| **El servicio gobierna el Commercial** | No se puede vender lo que no está definido. El Commercial Domain referencia al Service Catalog, no al revés. |
| **El servicio gobierna el Core** | Cada servicio define su propio flujo de ejecución. El Core ejecuta según el tipo de servicio. |
| **Multi-producto real** | Cada servicio puede tener reglas de precio, flujo de ejecución y entregables completamente distintos. |
| **Evolución del producto** | Los servicios cambian (precios, alcance, condiciones). El Product Domain versiona estos cambios sin afectar al Commercial o Core. |
| **Experimentación** | Permite lanzar variantes de servicio (A/B testing, pilotos) sin modificar la estructura comercial o técnica. |

### 2.4 Consecuencias

Positivas:
- El catálogo es la única fuente de verdad sobre qué se vende
- Commercial y Core referencian al Service Catalog, no tienen lógica de producto duplicada
- Permite lanzar nuevos servicios sin modificar los dominios inferiores
- Versionado nativo de servicios

Negativas:
- Un dominio más que gestionar (3 en lugar de 2)
- Complejidad de coordinación entre dominios
- Riesgo de overengineering si solo hay 2-3 servicios

---

## 3. ¿Debe el Service Catalog convertirse en el Aggregate Root principal del negocio?

### 3.1 Respuesta

**Sí. El Service Catalog es el Aggregate Root principal. Toda transacción de negocio comienza con la selección de un servicio.**

### 3.2 Visión actual vs visión propuesta

| Aspecto | Modelo actual (entity-first) | Modelo propuesto (service-first) |
|---------|------------------------------|----------------------------------|
| **Punto de partida** | Cliente existe | Servicio existe |
| **Acción principal** | Crear expediente | Contratar servicio |
| **Expansión** | Añadir más tipos de expediente | Añadir más servicios al catálogo |
| **Relación** | Cliente "tiene" expedientes | Servicio "es contratado por" clientes |
| **¿Qué es un expediente?** | Un contenedor genérico | La ejecución de un servicio contratado |
| **Lógica de negocio** | En el expediente | En el servicio (herencia/composición) |
| **Nuevo producto** | Crear nuevo tipo de expediente | Crear nuevo servicio en el catálogo |

### 3.3 El Service Catalog como raíz

```
                    ┌─────────────────────────────┐
                    │      SERVICE CATALOG         │ ← Aggregate Root principal
                    │                              │
                    │  Service {                    │
                    │    code: "ATI-01",            │
                    │    name: "Segunda Opinión",   │
                    │    pricing: {...},            │
                    │    executionFlow: {...},      │
                    │    deliverySpec: {...},       │
                    │    legalTerms: {...},         │
                    │    validFor: ["residential"]  │
                    │  }                            │
                    │                              │
                    │  Service {                    │
                    │    code: "GTD-01",            │
                    │    name: "Gestión Documental",│
                    │    ...                        │
                    │  }                            │
                    └──────────────┬──────────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
                ▼                  ▼                  ▼
        ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
        │  Commercial   │  │    Core      │  │   Post-      │
        │  (Order)      │  │  (Expediente)│  │   Delivery   │
        └──────────────┘  └──────────────┘  └──────────────┘
```

### 3.4 ¿Qué contiene un Service?

```json
{
  "code": "ATI-01",
  "version": "2.1.0",
  "name": "Informe Técnico de Eficiencia Energética (Segunda Opinión)",
  "lineaNegocio": "energy",
  "description": "Análisis técnico detallado del certificado energético existente...",
  "status": "active",

  "pricing": {
    "type": "fixed",           // fixed | variable | quote
    "basePrice": 89.00,
    "currency": "EUR",
    "taxRate": 0.21,
    "discountRules": [
      { "condition": "first_order", "discount": 0.10 },
      { "condition": "bundle_with:GTD-01", "discount": 0.15 }
    ]
  },

  "execution": {
    "requiredInputs": [
      { "name": "certificado_energetico", "type": "document", "required": true },
      { "name": "referencia_catastral", "type": "string", "required": true },
      { "name": "direccion_inmueble", "type": "string", "required": true }
    ],
    "steps": [
      { "order": 1, "action": "validate_documents", "handler": "document-ia" },
      { "order": 2, "action": "create_expediente", "handler": "core" },
      { "order": 3, "action": "pitr_analysis", "handler": "pitr-engine" },
      { "order": 4, "action": "generate_dictamen", "handler": "core" },
      { "order": 5, "action": "deliver_result", "handler": "core" }
    ],
    "maxDurationDays": 5,
    "autoDelivery": true
  },

  "delivery": {
    "format": ["pdf", "html"],
    "includes": [
      "Informe técnico detallado",
      "Dictamen de viabilidad",
      "Recomendaciones de mejora"
    ],
    "legalDisclaimer": "Este informe no constituye un certificado energético oficial..."
  },

  "legal": {
    "contractVersion": "CCoC-2026-01",
    "gdprRequired": true,
    "specificTermsRequired": true
  },

  "metadata": {
    "createdAt": "2026-01-15",
    "deprecatedAt": null,
    "supersededBy": null
  }
}
```

---

## 4. ¿Debe modelarse como "Servicios → Contratación → Ejecución"?

### 4.1 Respuesta

**Sí. Este es el modelo correcto para Certilab. Reemplaza "Clientes → Expedientes" como paradigma central.**

### 4.2 Comparativa de paradigmas

#### Paradigma actual: Entity-First

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐
│ CLIENTE   │────▶│ INMUEBLE     │────▶│ EXPEDIENTE   │
└──────────┘     └──────────────┘     └──────────────┘
     │                                       │
     │ ¿Quién es?                            │ ¿Qué se hace?
     │ (identidad)                           │ (acción técnica)
     ▼                                       ▼
  Atributos: nombre, email...            Atributos: tipo, estado...

Problemas:
- ¿Expediente de qué? El "tipo" es un enum, no un modelo
- ¿Cómo sé lo que incluye? La lógica está dispersa
- ¿Cómo añado un nuevo servicio? Creo otro case en el enum
- ¿Dónde está el precio? En otro sistema
```

#### Paradigma propuesto: Service-First

```
┌────────────────────────────────────────────────────────────────┐
│                          PRODUCT DOMAIN                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  SERVICE CATALOG                                         │   │
│  │                                                          │   │
│  │  ATI-01: "Segunda Opinión" → precio, flujo, entregable  │   │
│  │  GTD-01: "Gestión Documental" → precio, flujo, entregable│   │
│  │  CEE-01: "Certificado"       → precio, flujo, entregable│   │
│  └──────────────┬───────────────────────────────────────────┘   │
└─────────────────┼──────────────────────────────────────────────┘
                  │ selecciona
                  ▼
┌────────────────────────────────────────────────────────────────┐
│                       COMMERCIAL DOMAIN                         │
│                                                                  │
│  Order { service: "ATI-01", price: 89€, status: "paid" }      │
│  Contract { order_id, gdpr: true, signed: true }               │
│  Customer { status: "active", segment: "individual" }          │
│                                                                  │
│  "He contratado el servicio ATI-01 y lo he pagado"              │
└──────────────────┬─────────────────────────────────────────────┘
                   │ ejecuta
                   ▼
┌────────────────────────────────────────────────────────────────┐
│                         CORE DOMAIN                             │
│                                                                  │
│  Expediente { type: "ATI-01", steps: [...], status: "done" }  │
│                                                                  │
│  "Estoy ejecutando el servicio ATI-01 según su flujo definido" │
└────────────────────────────────────────────────────────────────┘
```

### 4.3 Cambio fundamental en el modelo de datos

#### Antes (entity-first)

```sql
-- ¿Qué es un expediente? Un contenedor genérico con un tipo
expedientes (
  id, cliente_id, inmueble_id, tipo TEXT, -- 'ATI', 'GTD', etc.
  estado TEXT, documentos JSONB, ...
)
```

#### Después (service-first)

```sql
-- El expediente es la instancia de ejecución de un servicio
expedientes (
  id, order_id, service_code TEXT,  -- FK al Service Catalog
  step_order INTEGER,               -- paso actual del flujo
  inputs JSONB,                     -- datos específicos del servicio
  status TEXT,                      -- 'pending', 'in_progress', 'completed'
  ...
)
```

La diferencia clave: **tipo** era un enum opaco → **service_code** es una referencia a un modelo completo de servicio con precio, flujo, entregables, términos legales.

### 4.4 Implicaciones para el Core Domain

El Core V1 está congelado por CF-001A. Esto **no requiere modificar el Core existente**. El cambio es de paradigma, no de implementación inmediata:

| Elemento Core | Impacto del nuevo paradigma |
|---------------|----------------------------|
| Cliente | Sigue existiendo. Se crea desde el Commercial Domain cuando un Customer contrata un servicio. |
| Inmueble | Sigue existiendo. Se asocia al Expediente como parte de la ejecución del servicio. |
| Expediente | Sigue existiendo. Su `tipo` ahora se mapea a `service_code` del Service Catalog. No se modifica su estructura actual. |
| Documento IA | Sigue existiendo. Es un paso en el flujo de ejecución del servicio. |
| PITR | Sigue existiendo. Es el motor de análisis dentro del flujo del servicio. |

**El Core no se modifica. Solo se reinterpreta** como la capa de ejecución del servicio contratado.

---

## 5. Mapeo completo: Service → Commercial → Core

### 5.1 Flujo completo

```
┌─────────────────────────────────────────────────────────────────────────┐
│ PRODUCT DOMAIN                                                          │
│                                                                          │
│  1. DEFINIR SERVICIO                                                     │
│     Service { code: "ATI-01", price: 89€, flow: [...], deliverables }   │
│                                                                          │
│  2. PUBLICAR EN CATÁLOGO                                                 │
│     Disponible para contratación en certilab.com                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ COMMERCIAL DOMAIN                                                       │
│                                                                          │
│  3. VISITOR → LEAD                                                      │
│     Usuario llega, ve el servicio ATI-01, lo selecciona                 │
│                                                                          │
│  4. LEAD → ORDER                                                        │
│     Order { service_code: "ATI-01", price: 89€ }                       │
│                                                                          │
│  5. ORDER → PAYMENT                                                     │
│     Payment { method: "card", status: "completed" }                     │
│                                                                          │
│  6. PAYMENT → CONTRACT                                                  │
│     Contract { service_version: "ATI-01-v2.1.0", signed: true }        │
│                                                                          │
│  7. CONTRACT → CUSTOMER                                                 │
│     Customer { service: "ATI-01", status: "active" }                   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ CORE DOMAIN                                                             │
│                                                                          │
│  8. CUSTOMER ACTIVATED → CLIENTE CREADO                                │
│     Cliente { customer_source_id, metadata: { service: "ATI-01" } }    │
│                                                                          │
│  9. ORDER PAID → EXPEDIENTE CREADO                                      │
│     Expediente { service_code: "ATI-01", status: "pending_inputs" }   │
│                                                                          │
│  10. EJECUTAR FLUJO DEL SERVICIO                                        │
│      Step 1: Validate documents (Documento IA)                          │
│      Step 2: Associate Inmueble                                         │
│      Step 3: PITR Analysis                                              │
│      Step 4: Generate Dictamen                                          │
│      Step 5: Deliver Result                                             │
│                                                                          │
│  11. SERVICIO COMPLETADO → CUSTOMER SUCCESS                             │
│      Expediente → "completed", Customer Success → "delivered"           │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Relaciones entre dominios

```
Product Domain                    Commercial Domain                    Core Domain
─────────────────                 ─────────────────                 ─────────────
ServiceCatalog                    Order                              Expediente
  │                                 │                                  │
  │ service_code ──────────────────┤ service_code ────────────────────┤ service_code
  │                                 │                                  │
  │ pricing ───────────────────────┤ total                             │
  │                                 │                                  │
  │ executionFlow ────────────────────────────────────────────────────┤ steps[]
  │                                                                   │
  │ deliverySpec ─────────────────────────────────────────────────────┤ deliverables
  │                                                                   │
  │ legalTerms ─────────────────────┤ Contract.document_version       │
  │                                 │                                  │
  │                                 │ Customer                        │ Cliente
  │                                 │   │                             │   │
  │                                 │   │ id ─────────────────────────┤ metadata.customer_source_id
```

---

## 6. ¿Qué cambia realmente?

### 6.1 Cambios inmediatos (solo documentación)

| Cambio | Descripción |
|--------|-------------|
| Nuevo dominio | Product Domain como capa superior |
| Service Catalog | Nuevo agregado raíz principal |
| Reinterpretación | Core deja de ser "el centro" y pasa a ser "la capa de ejecución" |
| Flujo de referencia | Cambia de "Cliente → Expediente" a "Servicio → Contratación → Ejecución" |
| PA-001 (Product Architecture) | Actualizar para reflejar la estructura de 3 dominios |

### 6.2 Lo que NO cambia

| Elemento | Estado |
|----------|--------|
| Core V1 (Cliente, Inmueble, Expediente, Documento IA, PITR) | Congelado. No se modifica. |
| CF-001A — Acta de Cierre | Vigente. No se modifica. |
| ADR aprobadas | Vigentes. No se modifican. |
| MVP scope | No se expande. El cambio es de modelo mental, no de implementación. |
| Implementación actual | No se toca. El Service Catalog se implementará cuando se aborde el Product Domain. |

### 6.3 Lo que cambia para el futuro

| Futuro | Antes | Después |
|--------|-------|---------|
| Nuevo producto | Crear nuevo tipo de expediente + lógica en Core | Crear nuevo Service en el catálogo + flujo de ejecución |
| Cambio de precio | Modificar sistema de pricing externo | Modificar Service.pricing |
| Cambio de flujo | Modificar lógica del Core | Modificar Service.executionFlow |
| Bundle de servicios | No existe como concepto | Service.validCombinations |
| Versiones de servicio | No existe | Service.version, Service.supersededBy |

---

## 7. Preguntas de la revisión de producto

### 7.1 Respondiendo a las tres preguntas del usuario

**P1: ¿Debe existir un Product Domain por encima del Commercial Domain?**

Sí. El Product Domain define **qué se vende** (el catálogo de servicios). El Commercial Domain gestiona **cómo se vende** (el ciclo de contratación). Son dos responsabilidades distintas que deben estar separadas. Sin Product Domain, el Commercial Domain no tiene un catálogo autoritativo al que referenciar: los precios, condiciones y flujos quedan dispersos.

**P2: ¿Debe el Service Catalog convertirse en el Aggregate Root principal del negocio?**

Sí. Toda transacción de negocio comienza con la selección de un servicio. El Service Catalog es la primera entidad que existe: antes de tener clientes, antes de tener expedientes, Certilab define qué servicios ofrece. Es el Aggregate Root del que dependen todos los demás.

**P3: ¿Puede toda la plataforma modelarse como "Servicios → Contratación → Ejecución"?**

Sí. Este modelo es superior a "Clientes → Expedientes" porque:
- Refleja la realidad del negocio (se contrata un servicio, no se "crea un expediente")
- Es extensible (nuevos servicios se añaden al catálogo, no al Core)
- Separa responsabilidades (cada dominio hace una cosa)
- Es el modelo que todos los SaaS B2B maduros utilizan (product catalog → subscription → fulfillment)

### 7.2 Respuesta a AGENTS.md §9.5

**1. ¿Qué capacidad funcional añade al MVP?**

No añade capacidad funcional inmediata. Pero establece el modelo mental correcto para todo el desarrollo futuro. Sin este modelo, cada nuevo producto requerirá modificar el Core, duplicar lógica de pricing, y reinventar el flujo de contratación.

**2. ¿Qué agregados participan?**

Product Domain: Service Catalog (nuevo agregado raíz principal)
Commercial Domain: Lead, Order, Payment, Contract, Customer, CustomerSuccess (identificados en PA-002)
Core Domain: Cliente, Inmueble, Expediente (existentes, no modificados)

**3. ¿Cómo interactúan entre sí?**

- Product Domain define el Service Catalog → Commercial Domain referencia service_code en Order
- Product Domain define executionFlow → Core Domain lo ejecuta paso a paso en Expediente
- Commercial Domain crea Customer → Core Domain crea Cliente desde Customer
- Commercial Domain completa Order → Core Domain crea Expediente desde Order

**4. ¿Por qué esta es la solución de menor complejidad?**

Porque no modifica el Core existente. No introduce nuevos patrones. No requiere refactorización. Simplemente añade una capa de definición (Product Domain) que organiza y unifica lo que ya existe de manera implícita. La alternativa (seguir añadiendo tipos al enum de Expediente) es más simple a corto plazo pero insostenible a medio plazo.

### 7.3 Clasificación V2

**Este análisis NO es V2.** Aunque no desbloquea una funcionalidad inmediata del MVP, establece el modelo arquitectónico que gobierna todo el desarrollo futuro. Sin este modelo, cada nueva épica chocará contra la falta de un catálogo de servicios autoritativo.

Sin embargo, su **implementación** (crear el Service Catalog, schema de base de datos, APIs) sí puede diferirse: no es necesario para el MVP inmediato, pero sí para el segundo producto (GTD).

---

## 8. Conclusión: La estructura de tres dominios

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CERTILAB PLATFORM                                  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                       PRODUCT DOMAIN                                   │   │
│  │                                                                        │   │
│  │  "¿Qué vendemos?"                                                      │   │
│  │                                                                        │   │
│  │  SERVICE CATALOG (Aggregate Root)                                     │   │
│  │    ├── Service { code, name, pricing, executionFlow, deliverySpec }    │   │
│  │    ├── Service { ... }                                                 │   │
│  │    └── Service { ... }                                                 │   │
│  │                                                                        │   │
│  │  Responsabilidad: Definir la oferta comercial de Certilab              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                      COMMERCIAL DOMAIN                                 │   │
│  │                                                                        │   │
│  │  "¿Cómo lo contratan?"                                                 │   │
│  │                                                                        │   │
│  │  Cycle: Lead → Order → Payment → Contract → Customer → CS            │   │
│  │                                                                        │   │
│  │  Responsabilidad: Gestionar la relación comercial con el cliente       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        CORE DOMAIN                                    │   │
│  │                                                                        │   │
│  │  "¿Cómo lo ejecutamos?"                                                │   │
│  │                                                                        │   │
│  │  Flow: Cliente → Inmueble → Expediente → Documento IA → PITR → Result │   │
│  │                                                                        │   │
│  │  Responsabilidad: Ejecutar el servicio técnico y producir el entregable│   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.1 Principio rector

> **El Service Catalog es la fuente de toda verdad comercial y técnica.**
>
> El pricing viene del Service. El flujo de ejecución viene del Service. Los entregables vienen del Service. Los términos legales vienen del Service.
>
> Commercial y Core son downstream del Service Catalog. No toman decisiones sobre qué, cómo ni a qué precio se vende. Solo ejecutan la contratación y la producción según lo definido en el Service.

---

## 9. Próximos pasos

| Paso | Descripción | Prioridad | Depende de |
|------|-------------|-----------|------------|
| 1 | Validar el modelo de 3 dominios con el equipo | Alta | Este documento |
| 2 | Reflejar Product Domain en PA-001 (Product Architecture) | Alta | Validación |
| 3 | Definir el Service Catalog con schema completo | Alta | Paso 2 |
| 4 | Decidir si el pricing debe estar en Product Domain o Commercial Domain | Alta | Paso 1 |
| 5 | Mapear servicios existentes al nuevo modelo (ATI-01, GTD-01, etc.) | Media | Paso 3 |
| 6 | Cuando se aborde una nueva épica, usar "Servicio → Contratación → Ejecución" como paradigma | Inmediato | Este documento |

---

## 10. Referencias

| Documento | Relación |
|-----------|----------|
| PA-001 — Product Architecture | Arquitectura de producto que este análisis propone modificar |
| PA-002 — Commercial Domain Architecture | Define el Commercial Domain que ahora es el dominio medio |
| CF-001A — Acta de Cierre de Arquitectura V1 | El Core sigue congelado; el Product Domain no lo modifica |
| CF-022 — Aggregate Boundaries | Los agregados del Core no se modifican |
| PA-001-CATALOG — Catálogo de productos | Catálogo actual que el Service Catalog formalizará |
| BP-100-02 — Líneas de Negocio | Define las líneas que el Product Domain organizará |
| AGENTS.md §9 — Product-First Execution Mode | Marco de decisión aplicado |
| AGENTS.md §4 — No Reopen Closed Decisions | El Core no se rediscute; el Product Domain es nuevo |