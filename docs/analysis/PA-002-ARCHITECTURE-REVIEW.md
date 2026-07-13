# Architecture Review: PA-002 Commercial Architecture

| Campo | Valor |
|-------|-------|
| **Código** | PA-002-REVIEW |
| **Título** | Architecture Review — PA-002 Commercial Architecture |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-11 |
| **Estado** | ✅ COMPLETADO |
| **Propósito** | Revisión crítica de PA-002 desde primeros principios antes de su congelación. No modifica PA-002. No es una ADR. |
| **Metodología** | First-principles analysis cuestionando cada decisión arquitectónica propuesta, con énfasis en escalabilidad, generalidad y pureza del modelo de dominio. |

---

## Índice

1. [Resumen Ejecutivo de la Revisión](#1-resumen-ejecutivo-de-la-revisión)
2. [Revisión 1: Customer como Aggregate Root](#2-revisión-1-customer-como-aggregate-root)
3. [Revisión 2: Service como Agregado Iniciador](#3-revisión-2-service-como-agregado-iniciador)
4. [Revisión 3: Gate — Entidad o Política de Negocio](#4-revisión-3-gate--entidad-o-política-de-negocio)
5. [Revisión 4: Esquema Separado vs. Bounded Contexts](#5-revisión-4-esquema-separado-vs-bounded-contexts)
6. [Revisión 5: Soporte Universal para Todos los Servicios](#6-revisión-5-soporte-universal-para-todos-los-servicios)
7. [Revisión 6: Escalabilidad a 50 Servicios](#7-revisión-6-escalabilidad-a-50-servicios)
8. [Revisión 7: Suscripciones, Renovaciones e Inspecciones Recurrentes](#8-revisión-7-suscripciones-renovaciones-e-inspecciones-recurrentes)
9. [Revisión 8: Plataforma SaaS](#9-revisión-8-plataforma-saas)
10. [Síntesis: Problemas Identificados](#10-síntesis-problemas-identificados)
11. [Recomendaciones](#11-recomendaciones)
12. [Preguntas para Debate Arquitectónico](#12-preguntas-para-debate-arquitectónico)

---

## 1. Resumen Ejecutivo de la Revisión

**PA-002 es un documento sólido** que identifica correctamente el gap comercial y propone una separación de dominios bien argumentada. Sin embargo, la revisión desde primeros principios revela **cinco decisiones arquitectónicas cuestionables** que deben resolverse antes de congelar el diseño:

| # | Decisión | Veredicto de la revisión |
|---|----------|--------------------------|
| 1 | **Customer como Aggregate Root** | ⚠️ **Débil.** Customer tiene más sentido como Value Object o como entidad creada en la transición al Core, no como AR independiente. |
| 2 | **Ausencia de Service como AR** | ❌ **Error de omisión.** El agregado Service (el producto contratado) es el corazón del ciclo comercial y falta en PA-002. |
| 3 | **Gate como entidad en el diagrama** | ⚠️ **Confusión conceptual.** Gate no es una entidad ni un agregado. Es una política de negocio que orquesta la transición entre dominios. |
| 4 | **Esquema de BD separado** | ✅ **Correcto** para independencia de dominios, pero debe refinarse la justificación y el modelo de integración. |
| 5 | **Soporte universal sin modificación** | ❌ **No validado.** El modelo actual está sesgado hacia productos transaccionales únicos (Second Opinion). Fallan suscripciones, bundles, servicios gratuitos y planes de mantenimiento. |

Las secciones siguientes desarrollan cada revisión en detalle.

---

## 2. Revisión 1: Customer como Aggregate Root

### 2.1 Lo que dice PA-002

El agregado **Customer** es un AR con:
- Ciclo de vida propio (active, suspended, churned)
- Referencia a lead_id
- Órdenes históricas (order_ids[])
- Segmento, LTV, churn_risk

### 2.2 Pregunta de primeros principios

> ¿Tiene Customer reglas de neg propias, invariantes y un ciclo de vida *independiente* de otros agregados?

### 2.3 Análisis

**Customer tiene estas responsabilidades reales:**

| Responsabilidad | ¿Es realmente de Customer? | Alternativa |
|----------------|---------------------------|-------------|
| Estado activo/suspendido/churned | ✅ Sí, ciclo de vida comercial | Pero este estado podría ser una proyección del estado de sus órdenes y contratos |
| Segmento (individual, admin, partner) | ✅ Clasificación útil | Value Object, no AR |
| LTV | ❌ Derivado. Se calcula sumando órdenes pagadas | No debería ser atributo almacenado, sino calculado |
| Churn risk | ❌ Derivado. Depende de tiempo desde última orden | Política de negocio, no atributo |
| Órdenes históricas | ❌ Relación, no atributo | La orden referencias a Customer, no al revés |
| Preferencias | ✅ Ajustes de usuario | Value Object |

**Invariantes propuestas en PA-002:**
1. "Un Customer no puede existir sin al menos una orden paid" → Si necesita una orden para existir, su ciclo de vida **no** es independiente: nace de la orden.
2. "Un Customer active no puede tener una orden cancelled sin revisión manual" → Esto es una política que cruza Customer + Order.
3. "El segmento se asigna automáticamente" → Derivado, no invariante del AR.

### 2.4 Problema central

**Customer no tiene identidad propia.** Su existencia depende de que exista al menos una orden pagada. No hay Customer sin Order. No hay Customer sin Contract. Customer emerge *como consecuencia* de la finalización del ciclo Order → Payment → Contract.

En DDD, un Aggregate Root debe ser la raíz de un cluster de objetos que se mantienen consistentes juntos. Customer no aglutina nada: sus atributos son o derivados o referencias a otros agregados.

### 2.5 Propuesta alternativa

**Customer no es un Aggregate Root. Es:**

- **Opción A: Un Value Object** que representa el perfil comercial consolidado del cliente, creado por un servicio de aplicación en la transición al Core Domain. Contiene: person_id (referencia a la persona física), segment, preferences.
- **Opción B: Una entidad en el Core Domain**, que *sustituye* al actual Cliente. Es decir, el Cliente del Core absorbe las responsabilidades comerciales y el Commercial Domain no tiene Customer.
- **Opción C: Una proyección (read model)** que se materializa a partir de eventos de Order, Payment y Contract, sin ser un agregado de escritura.

**Recomendación:** Opción B. El Cliente del Core Domain se enriquece para incluir segmento, preferencias y estado comercial, pero su identidad sigue siendo la misma. El Commercial Domain termina en Contract y emite eventos; el Core Domain reacciona creando o actualizando su Cliente.

---

## 3. Revisión 2: Service como Agregado Iniciador

### 3.1 Lo que dice PA-002

El ciclo comienza con Visitor → Lead → Order. Order contiene OrderItems con `product_code`.

### 3.2 Pregunta de primeros principios

> ¿Cuál es el agregado raíz que representa *lo que el cliente viene a comprar*?

### 3.3 Análisis

En PA-002, el producto aparece solo como un `product_code` dentro de OrderItem. El producto en sí mismo no está modelado como entidad. Esto es un **error de omisión grave**.

**¿Por qué Service debería ser un Aggregate Root?**

1. **Un servicio tiene su propio ciclo de vida.** No es lo mismo un servicio contratado (pendiente de entrega) que un servicio entregado (completado) que un servicio recurrente (activo hasta cancelación).

2. **Un servicio tiene estado transaccional propio.** La Segunda Opinión tiene un workflow: solicitud → revisión → dictamen → entrega. El ITE tiene otro: solicitud → visita → inspección → informe. Son estados del *servicio*, no de la orden ni del expediente.

3. **Un servicio puede existir sin orden.** Servicios gratuitos, promocionales, pruebas (freemium). Un lead puede recibir un servicio de muestra sin haber pagado.

4. **Un servicio puede agrupar múltiples expedientes.** Un servicio "Certificación Energética + ITE" puede generar dos expedientes técnicos. La orden lo contiene, pero el servicio es la entidad que sabe qué expedientes debe crear.

5. **Un servicio puede ser recurrente.** "Mantenimiento anual" no es una transacción única: es un servicio que se renueva. El modelo actual de Order no captura esta semántica.

### 3.4 Modelo propuesto (para debate)

```
SERVICE (Aggregate Root)
├── id: UUID
├── catalog_code: string (ATI-01, GTD-03, etc.)
├── name: string
├── type: enum (one_time, subscription, bundle)
├── status: enum (pending, active, completed, cancelled, expired)
├── billing_schedule: enum (once, monthly, yearly)
├── current_period_start: timestamptz?
├── current_period_end: timestamptz?
├── linked_service_ids: UUID[]? (para bundles)
└── metadata: jsonb
```

**¿Dónde encaja Service en el ciclo?**

```
Lead → Order → [Service → Payment → Contract] → Core Domain
                └── El Service es lo que realmente se paga y entrega
```

Cada OrderItem en PA-002 **es un Service**. La diferencia es semántica: OrderItem sugiere una línea de factura; Service sugiere una unidad de valor que el cliente recibe.

### 3.5 Implicación para PA-002

La ausencia de Service como AR es la debilidad más significativa de PA-002. Sin Service, no hay forma de modelar:

- Estados de servicio independientes de la orden
- Servicios recurrentes (suscripciones)
- Bundles de servicios
- Servicios gratuitos (sin payment)
- Transiciones de servicio (upgrade, downgrade, pause, cancel)

**Recomendación:** Introducir Service como Aggregate Root en el Commercial Domain, con Order como contenedor transaccional de Services en el momento de la compra.

---

## 4. Revisión 3: Gate — Entidad o Política de Negocio

### 4.1 Lo que dice PA-002

PA-002 representa Gate como una etapa en el flujo (sección 3.1) y lo define como "servicio de aplicación, no de dominio" (sección 8.3). Sin embargo, aparece visualmente como una caja entre dominios, lo que crea ambigüedad.

### 4.2 Pregunta de primeros principios

> ¿Gate tiene estado? ¿Tiene identidad? ¿Tiene invariantes? ¿O es una política de negocio?

### 4.3 Análisis

**Respuesta: Gate no es una entidad ni un agregado.**

Gate es una **Business Policy** que especifica:

```
CUÁNDO (evento de dominio comercial)
    → CustomerActivated (o su equivalente)
    → OrderPaid + ContractSigned
HACER QUÉ (acción)
    → Crear o recuperar Cliente en Core Domain
    → Crear Expediente(s) en Core Domain
    → Vincular identidades
Y LUEGO (efecto colateral)
    → Emitir evento de dominio CoreDomain.ExpedienteCreado
```

**Razones por las que Gate NO es una entidad:**
- No tiene identidad (no hay "gate_123")
- No tiene estado que persista (es transaccional: ocurre o no ocurre)
- No tiene invariantes (sus reglas son condiciones if/and)
- No tiene comportamiento complejo (es orquestación, no lógica de dominio)

### 4.4 Implicación para PA-002

El diagrama debe corregirse: Gate no debe aparecer como un rectángulo (que sugiere entidad/agregado) sino como un **rombo de decisión** o una **flecha etiquetada** que indica "política de transición".

El texto de PA-002 ya dice correctamente en 8.3 que "la transición (gate) es un servicio de aplicación, no de dominio". Pero los diagramas lo contradicen visualmente.

---

## 5. Revisión 4: Esquema Separado vs. Bounded Contexts

### 5.1 Lo que dice PA-002

PA-002 propone un esquema de base de datos separado (`commercial.*`) con sus propias tablas y sin joins con el Core. Propone 5 tablas: leads, orders, order_items, payments, contracts, customers.

### 5.2 Pregunta de primeros principios

> ¿Son dos esquemas de BD equivalentes a dos Bounded Contexts? ¿O es una implementación que fuerza un límite que debería ser conceptual?

### 5.3 Análisis

**La respuesta corta:** Dos esquemas de BD en la misma instancia de Supabase **no equivalen** a dos Bounded Contexts en sentido estricto de DDD. Son una táctica de implementación, no una decisión arquitectónica.

**Lo que realmente importa es:**

| Aspecto | Dos esquemas (PA-002) | Dos Bounded Contexts (alternativa) |
|---------|----------------------|-----------------------------------|
| Acoplamiento de BD | Bajo (no hay FK entre esquemas) | Bajo (cada contexto podría tener su propia BD) |
| Acoplamiento de código | Medio (mismo proyecto, mismo lenguaje) | Bajo (posibles equipos independientes) |
| Consistencia transaccional | Alta (misma transacción de Supabase) | Baja (consistencia eventual entre contextos) |
| Deployment | Único | Independiente |
| Simplicidad MVP | Alta | Baja |
| Migraciones | Coordinadas entre esquemas | Independientes |

### 5.4 Problema potencial

PA-002 mezcla dos conceptos: **separación lógica** (bounded contexts, eventos de dominio) con **separación física** (esquemas de BD). La propuesta de esquemas separados es correcta, pero la justificación debe ser:

1. **Dos Bounded Contexts** (conceptual) — esta es la decisión arquitectónica real.
2. **Dos esquemas en la misma BD** (implementación) — esto es una consecuencia, no la decisión.

### 5.5 Recomendación

Refinar PA-002 para dejar explícito:
- La decisión arquitectónica es **dos Bounded Contexts**: Commercial y Core.
- La implementación con esquemas separados en Supabase es una *consecuencia técnica* que podría cambiarse en el futuro (ej: separar en microservicios) sin cambiar la arquitectura.
- Cada Bounded Context tiene su propio modelo de datos, su propio lenguaje ubicuo y sus propias invariantes.

---

## 6. Revisión 5: Soporte Universal para Todos los Servicios

### 6.1 Lo que dice PA-002

PA-002 afirma (sección 10) que el Commercial Domain sirve para todos los productos del catálogo PA-001 sin modificación.

### 6.2 Pregunta de primeros principios

> ¿Puede el modelo Lead → Order → Payment → Contract → Customer soportar *todos* los tipos de servicio que Certilab ofrece o podría ofrecer?

### 6.3 Análisis de casos límite

**Caso 1: Servicio gratuito (freemium / muestra)**
- Un lead puede recibir un "Diagnóstico gratuito" sin pagar.
- PA-002 requiere Payment → Contract → Customer. No hay ruta para servicio sin pago.
- ❌ El modelo falla. Se necesitaría: Order → (skip Payment) → Contract → Customer. O una ruta de servicio directa sin pasar por Order.

**Caso 2: Bundle de servicios**
- "Informe Técnico + Custodia 1 año" se vende como pack a 149€.
- Un OrderItem con quantity=2 no captura que son dos servicios diferentes, con diferentes ciclos de vida, diferentes expedientes y diferentes reglas de cancelación.
- ❌ El modelo falla. Order no distingue un pack de una compra múltiple. Service resolvería esto.

**Caso 3: Servicio corporativo multi-sede**
- Laura (admin fincas) contrata "ITE para 15 edificios".
- ¿Son 15 expedientes? ¿Una orden con 15 items? ¿Un item con quantity=15?
- ⚠️ PA-002 no especifica. Un Service con multiplicador de sedes resolvería el caso.

**Caso 4: Pago fraccionado (deposit + remainder)**
- ITE de 1.200€: 400€ al contratar, 800€ al entregar.
- PA-002 modela un solo Payment por Order. No hay pago fraccionado.
- ❌ El modelo falla. Se necesitaría 1 Order → N Payments.

**Caso 5: Reembolso parcial**
- Un cliente cancela a mitad del servicio. Se reembolsan 50€ de 99€.
- PA-002 permite refund en Payment, pero no especifica cómo queda Order ni Service.
- ⚠️ Insuficiente.

**Caso 6: Upgrade / downgrade de servicio**
- Un cliente cambia de "Custodia Básica" a "Custodia Premium" a mitad del período.
- PA-002 no modela cambios de plan. Una nueva Order no captura la continuidad.
- ❌ El modelo falla.

### 6.4 Veredicto

**PA-002 no soporta todos los servicios sin modificación.** El modelo está sesgado hacia servicios transaccionales únicos con pago completo upfront. Los casos de servicios gratuitos, bundles, pago fraccionado, reembolsos parciales y cambios de plan requieren modificaciones significativas.

La ausencia del agregado Service es la causa raíz: Order es un contenedor transaccional, no un gestor del ciclo de vida del servicio.

---

## 7. Revisión 6: Escalabilidad a 50 Servicios

### 7.1 Pregunta de primeros principios

> Si Certilab pasa de 14 a 50 servicios, ¿el Commercial Domain de PA-002 sigue siendo válido sin cambios estructurales?

### 7.2 Análisis

**Lo que escala bien:**
- El flujo Lead → Order → Payment → Contract es genérico y no depende del número de servicios.
- El esquema de BD con `product_code` como string escalaría sin cambios de esquema.
- La tabla `order_items` con metadata JSONB permite extensiones sin migraciones.

**Lo que NO escala bien sin Service:**

| Escenario con 50 servicios | Problema |
|---------------------------|----------|
| 20 servicios son one-time, 15 son suscripción, 10 son bundles, 5 son gratuitos | PA-002 no distingue tipos de servicio. Cada tipo tiene reglas distintas de billing, cancelación, reembolso. |
| Algunos servicios requieren aprobación manual previa (ej: ITE de alto valor) | No hay estado de "aprobación pendiente" en el flujo. Lead → Order no contempla workflows de aprobación B2B. |
| Algunos servicios generan múltiples expedientes en paralelo (ej: "Auditoría completa" = ITE + Certificado + Accesibilidad) | Order no sabe cuántos expedientes crear ni cómo trackear cada uno. |
| Algunos servicios requieren datos de entrada muy diferentes | El metadata JSONB de OrderItem no escala semánticamente sin un esquema formal por tipo de servicio. |

### 7.3 Veredicto

**PA-002 escala hasta ~20-25 servicios** con el modelo actual. Más allá, la falta de Service como AR y la ausencia de un modelo de configuración de servicios por tipo se convierte en un cuello de botella.

El límite no está en la base de datos, sino en la **complejidad accidental** de manejar 50 tipos de servicio dentro de un modelo que solo distingue `product_code`.

---

## 8. Revisión 7: Suscripciones, Renovaciones e Inspecciones Recurrentes

### 8.1 Pregunta de primeros principios

> ¿El modelo de PA-002 puede manejar servicios que no terminan nunca? ¿Servicios que se renuevan automáticamente? ¿Servicios que requieren visitas periódicas?

### 8.2 Análisis

**Suscripciones (GTD-03 Custodia):**
- El cliente paga 49€/año por tener su documentación custodiada.
- No hay un "expediente" en el sentido de proceso que termina. Es un estado continuo.
- PA-002 modela esto como una transacción que crea un Expediente. Pero ¿qué hace el expediente durante un año? ¿Se cierra y se reabre cada año?
- ❌ No hay modelo para servicio continuo.

**Renovaciones:**
- Una custodia se renueva automáticamente cada 12 meses.
- PA-002 tiene Order → Payment. Pero la renovación no es una nueva Order: es la misma Service que continúa.
- Para modelarlo hoy, habría que crear una nueva Order cada año, perdiendo la trazabilidad con la original.
- ❌ No hay modelo de renovación.

**Inspecciones periódicas (ITE recurrente):**
- ITE obligatorio cada 5-10 años según normativa.
- El cliente no compra "un ITE" sino "el servicio de mantenimiento ITE" que incluye la inspección inicial + recordatorios + nueva inspección a los 5 años.
- ❌ No hay modelo de periodicidad ni de recordatorio legal.

**Planes de mantenimiento:**
- "Plan de Mantenimiento Anual" incluye: revisión de certificados, alertas normativas, actualización de documentos.
- Es un servicio continuo que puede incluir servicios on-top (ej: si sale una norma nueva, se genera un expediente adicional).
- ❌ No hay modelo de servicio compuesto con generación dinámica de expedientes.

### 8.3 Veredicto

**PA-002 no soporta suscripciones, renovaciones ni servicios periódicos.** El modelo asume que el servicio termina (Expediente → Delivery → Customer Success). Los servicios continuos no encajan en este ciclo.

Service como AR resolvería parcialmente este problema porque un Service puede tener `status: active` durante meses/años, con `billing_schedule: yearly` y `auto_renew: true`, sin necesidad de crear nuevas órdenes.

---

## 9. Revisión 8: Plataforma SaaS

### 9.1 Pregunta de primeros principios

> Si Certilab se convierte en una plataforma SaaS multi-tenant, ¿PA-002 sigue siendo válido?

### 9.2 Análisis

**¿Qué implica ser plataforma SaaS?**
1. Multiinquilino: clientes que no se conocen entre sí comparten la misma instancia.
2. Planes y pricing por tenant: cada tenant puede tener su propio plan de precios.
3. Facturación al tenant, no al usuario final: el tenant paga una suscripción, los usuarios del tenant consumen servicios.
4. Roles y permisos dentro del tenant: admin, técnico, lector.
5. Onboarding de tenant: registro, trial, conversión a pago.

**¿PA-002 soporta esto?**

| Aspecto SaaS | Soporte en PA-002 | Problema |
|-------------|:----------------:|----------|
| Multiinquilino | ❌ No modelado | Lead/Customer no distinguen tenant. Un "admin fincas" (Laura) debería ser un tenant, no un lead individual. |
| Planes de tenant | ❌ No modelado | PA-002 asume pricing directo al consumidor. SaaS tendría pricing B2B (ej: 199€/mes para la agencia, sin coste por expediente). |
| Roles intra-tenant | ❌ No modelado | Customer actual es una persona. SaaS necesita: tenant → users → roles. |
| Trial gratuito | ❌ No modelado | Service gratuito sin Payment. |
| Facturación al tenant | ❌ No modelado | Invoice se menciona como futura en Fase 4, pero no se especifica cómo se agregan facturas de múltiples usuarios. |
| Self-service onboarding | ⚠️ Parcial | Lead → Order podría funcionar para auto-registro, pero no hay concepto de "plan de trial". |

### 9.3 Veredicto

**PA-002 es un modelo direct-to-consumer (D2C). No soporta plataforma SaaS multi-tenant sin cambios fundamentales.**

Si el objetivo a largo plazo es SaaS, PA-002 necesita:
- Un agregado **Tenant** (u Organization) que agrupe users, suscripciones y facturación.
- El concepto de **Subscription** (plan del tenant) separado de Service (servicio consumido).
- Un modelo de roles y permisos dentro del tenant.
- Facturación consolidada por tenant, no por individuo.

Dicho esto, no todos los servicios de Certilab serán SaaS. Second Opinion es D2C. ITE puede ser B2B (admin fincas). Custodia puede ser suscripción D2C. La plataforma SaaS sería una capa adicional, no un sustituto.

---

## 10. Síntesis: Problemas Identificados

| # | Problema | Severidad | Sección |
|---|----------|:---------:|:-------:|
| 1 | **Customer no debería ser Aggregate Root.** Carece de identidad propia y vida independiente. Nace de Order+Payment+Contract. | 🔴 Alta | §2 |
| 2 | **Service no existe como Aggregate Root.** Ordenar un servicio y *tener un servicio* son conceptos distintos. PA-002 solo cubre el primero. | 🔴 Alta | §3 |
| 3 | **Gate está mal representado.** No es entidad ni agregado. Es política de negocio. | 🟡 Media | §4 |
| 4 | **Confusión entre Bounded Context y esquema de BD.** Hay que separar decisión arquitectónica de implementación técnica. | 🟡 Media | §5 |
| 5 | **No cubre servicios gratuitos, bundles ni pago fraccionado.** El modelo asume pago único completo. | 🔴 Alta | §6 |
| 6 | **No escala más allá de ~25 servicios sin Service AR.** La complejidad accidental crece con cada nuevo tipo de servicio. | 🟡 Media | §7 |
| 7 | **No soporta suscripciones ni renovaciones.** Modelo transaccional para un negocio que necesita modelos recurrentes. | 🔴 Alta | §8 |
| 8 | **No soporta plataforma SaaS multi-tenant.** El modelo es D2C. SaaS requeriría Tenant, Subscription, roles. | 🟡 Media | §9 |

---

## 11. Recomendaciones

### 11.1 Corregir antes de congelar PA-002

1. **Elevar Service a Aggregate Root.** Es la entidad central del Commercial Domain. Order es el contenedor transaccional; Service es la unidad de valor con ciclo de vida propio.

2. **Eliminar Customer como Aggregate Root.** El Customer comercial o bien se absorbe en el Cliente del Core, o se convierte en un Value Object, o se materializa como una proyección.

3. **Corregir la representación de Gate.** No debe aparecer como una caja-entity en los diagramas. Reflejarlo como política de negocio o servicio de aplicación.

### 11.2 Incluir como análisis, no como bloqueante

4. **Documentar la distinción Bounded Context vs. esquema de BD.** PA-002 ya es correcta en esencia; solo necesita claridad terminológica.

5. **Añadir sección de "Casos no cubiertos"** que documente explícitamente: servicios gratuitos, bundles, pago fraccionado, reembolsos parciales, upgrades/downgrades, suscripciones, renovaciones, SaaS multi-tenant. No es necesario resolverlos todos ahora, pero sí documentar que existen.

### 11.3 Diferir a futura ADR

6. **Service AR + Subscription model** requerirá una ADR si se decide implementar. Este review recomienda introducir Service, pero la decisión formal debe tomarse mediante ADR.

7. **SaaS multi-tenant** requiere un diseño completo de plataforma que está más allá del alcance de PA-002. Diferir a V2 o V3.

---

## 12. Preguntas para Debate Arquitectónico

1. **Service AR:** ¿Aceptamos que Service debe ser un Aggregate Root separado de Order? Si es así, ¿Service nace de OrderItem o coexiste con él?

2. **Customer:** ¿Se elimina como AR? ¿Se fusiona con el Cliente del Core? ¿Se convierte en Value Object?

3. **Order como documento transaccional:** ¿Order debe ser un AR o puede ser un Value Object que agrupa Services en el momento de la compra? Es decir, ¿Order es un "recibo" de la transacción, no una entidad con estado?

4. **Suscripciones en V1 vs V2:** ¿Debe el modelo actual (PA-002 sin Service, sin suscripciones) ser suficiente para el MVP de V1, documentando que V2 añadirá Service y Subscription? ¿O debe el diseño anticipar estos casos aunque no se implementen hasta V2?

5. **Escalabilidad:** ¿Aceptamos que PA-002 cubre los 14 servicios actuales del catálogo y que un modelo más general (con Service AR) se diseñará cuando se superen los ~20 servicios?

6. **Plataforma:** ¿Certilab será D2C, B2B o SaaS? La respuesta cambia fundamentalmente el diseño del Commercial Domain. Si no hay respuesta hoy, ¿diseñamos para D2C con extensibilidad hacia B2B?

---

## Anexo: Mapa de Agregados Propuesto (Alternativa a PA-002)

```
DOMINIO COMERCIAL (ALTERNATIVA)
┌───────────────────────────────────────────────────────┐
│                                                        │
│  ┌──────────┐   ┌──────────┐   ┌──────────────────┐   │
│  │  LEAD    │──▶│  ORDER   │──▶│    SERVICE(s)    │   │
│  │          │   │          │   │  (uno por item)  │   │
│  └──────────┘   │ (tx/     │   └────────┬─────────┘   │
│                  │  recibo) │            │              │
│                  └──────────┘     ┌──────┴──────┐     │
│                                   │              │     │
│                              ┌────▼────┐   ┌────▼────┐ │
│                              │ PAYMENT │   │CONTRACT │ │
│                              │ (1..N)  │   │ (1)     │ │
│                              └─────────┘   └─────────┘ │
│                                   │              │      │
│                                   └──────┬───────┘      │
│                                          │              │
│                                    ⏎ Política de       │
│                                      Transición (GATE)  │
│                                          │              │
└──────────────────────────────────────────┼──────────────┘
                                           │
                                           ▼
                              ┌──────────────────────────┐
                              │  DOMINIO CORE            │
                              │  ┌──────────┐            │
                              │  │ CLIENTE  │← Customer  │
                              │  │ (único)  │  ya no es  │
                              │  └──────────┘  AR propio │
                              └──────────────────────────┘
```

**Cambios clave respecto a PA-002:**
- **Service** es el AR central del dominio comercial.
- **Customer** no existe como AR. La persona (física o jurídica) es el Lead primero, y después el Cliente del Core.
- **Order** es un contenedor transaccional (un "recibo" o "documento de compra").
- **1 Order → 1..N Services** (porque una compra puede incluir múltiples servicios).
- **1 Service → 1..N Payments** (pago fraccionado).
- **Gate** no es entidad, sino política de negocio: "cuando Service está active y Contract signed, crear Cliente y Expediente en Core".

---

> ⚠️ **Nota final:** Este review no modifica PA-002 ni constituye una ADR. Es un análisis crítico para informar la decisión de congelar o modificar PA-002. Las recomendaciones aquí contenidas deberán formalizarse mediante ADR si se decide implementarlas.