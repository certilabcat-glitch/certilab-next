# PRD-FRAMEWORK-001 — Product Requirements Document Framework

| Campo | Valor |
|-------|-------|
| **Código** | PRD-FRAMEWORK-001 |
| **Título** | Product Requirements Document Framework |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-06 |
| **Estado** | ✅ APROBADO |
| **Precedencia** | BP-900 (Business Blueprint), PA-900 (Product Architecture), GTM-900 (Go-To-Market) |
| **Propósito** | Definir la plantilla oficial, las secciones obligatorias, las reglas de redacción, los criterios de calidad, la trazabilidad con Business Blueprint, Product Architecture y Go-To-Market, y el proceso de validación previo al desarrollo de todos los PRDs del ecosistema Certilab. |

---

## Índice

1. [OBJETIVO DEL FRAMEWORK](#1-objetivo-del-framework)
2. [CICLO DE VIDA DEL PRD](#2-ciclo-de-vida-del-prd)
3. [ESTRUCTURA OBLIGATORIA](#3-estructura-obligatoria)
4. [REGLAS DE REDACCIÓN](#4-reglas-de-redacción)
5. [CRITERIOS DE CALIDAD](#5-criterios-de-calidad)
6. [TRAZABILIDAD CON BB, PA Y GTM](#6-trazabilidad-con-bb-pa-y-gtm)
7. [PROCESO DE VALIDACIÓN PREVIO AL DESARROLLO](#7-proceso-de-validación-previo-al-desarrollo)
8. [DEFINITION OF DONE DEL PRD](#8-definition-of-done-del-prd)
9. [PREGUNTAS OBLIGATORIAS (PRODUCT-FIRST EXECUTION MODE)](#9-preguntas-obligatorias-product-first-execution-mode)
10. [ANEXOS Y REFERENCIAS](#10-anexos-y-referencias)

---

## 1. OBJETIVO DEL FRAMEWORK

Este framework establece el **estándar oficial** que todos los Product Requirements Documents (PRDs) del ecosistema Certilab deben seguir. Un PRD es el documento que traduce una necesidad de negocio validada (Business Blueprint) y una definición de producto validada (Product Architecture) en un conjunto de requisitos funcionales y no funcionales listos para ser implementados.

**El PRD no es:**

- ❌ Un documento de negocio (eso es el Business Blueprint).
- ❌ Un documento de arquitectura de producto (eso es Product Architecture).
- ❌ Un documento técnico de implementación (eso son las épicas y los tickets).
- ❌ Un documento de mercado (eso es Go-To-Market).

**El PRD es:**

- ✅ El **puente** entre la definición del producto y la implementación.
- ✅ La **especificación** que un equipo de desarrollo necesita para construir.
- ✅ El **contrato** entre producto y desarrollo que define qué se construye y por qué.
- ✅ El **documento de trazabilidad** que conecta la necesidad de negocio con la funcionalidad entregada.

---

## 2. CICLO DE VIDA DEL PRD

Cada PRD sigue un ciclo de vida con estados bien definidos:

```
BORRADOR ──→ EN_REVISION ──→ VALIDADO ──→ APROBADO ──→ EN_DESARROLLO ──→ CERRADO
```

| Estado | Descripción | Quién lo cambia |
|--------|-------------|-----------------|
| **BORRADOR** | El documento se está redactando. Puede contener secciones incompletas marcadas con `[TODO]`. | Autor del PRD |
| **EN_REVISION** | El documento está completo y enviado a revisión. Se aplican los criterios de calidad (sección 5). | Autor del PRD |
| **VALIDADO** | El documento ha superado la revisión de calidad y contenido. Pendiente de aprobación final. | Revisor asignado |
| **APROBADO** | El PRD está aprobado y listo para que comience la implementación. No puede modificarse sin una ADR. | Product Owner / Dirección |
| **EN_DESARROLLO** | La implementación está en curso. El PRD es la fuente de verdad durante el desarrollo. | (automático) |
| **CERRADO** | La implementación ha finalizado y el PRD se archiva como referencia histórica. | Product Owner |

**Regla:** Ningún PRD puede pasar a `APROBADO` sin haber superado todos los criterios de calidad definidos en la sección 5.

**Regla:** Ningún PRD puede pasar a `EN_DESARROLLO` sin la aprobación explícita del Product Owner.

---

## 3. ESTRUCTURA OBLIGATORIA

### 3.1 Metadatos del documento

```
| Campo | Valor |
|-------|-------|
| **Código** | PRD-{NNN} — Ej: PRD-001, PRD-002 |
| **Título** | Nombre descriptivo del PRD |
| **Versión** | Semver — Ej: 1.0, 2.1 |
| **Fecha** | YYYY-MM-DD |
| **Estado** | BORRADOR | EN_REVISION | VALIDADO | APROBADO | EN_DESARROLLO | CERRADO |
| **Precedencia** | Documentos que preceden a este PRD (BP, PA, ADR) |
| **Dependencias** | Otros PRDs de los que depende |
| **Épica asociada** | Código de la épica (EP-XXX) cuando se asigne |
| **Propósito** | Una frase que describa qué logra este PRD |
```

### 3.2 Secciones obligatorias

Todo PRD debe contener **obligatoriamente** las siguientes secciones en este orden:

---

#### 1. Resumen Ejecutivo

- **Propósito:** Explicar en 3-5 párrafos qué es esta iniciativa y por qué se hace.
- **Debe contener:**
  - Contexto del problema que resuelve.
  - Audiencia objetivo (usuario final).
  - Impacto esperado en el negocio.
  - Relación con el roadmap V1.
- **No debe contener:** Detalles técnicos, especificaciones de implementación, discusiones arquitectónicas.

---

#### 2. Problema y Oportunidad

- **Propósito:** Definir con claridad qué problema resuelve este PRD y por qué vale la pena resolverlo.
- **Debe contener:**
  - Descripción del problema actual (con evidencia si existe: datos de soporte, feedback de clientes, análisis de mercado).
  - La oportunidad de negocio que se captura al resolverlo.
  - Qué ocurre si no se implementa (coste de oportunidad).
  - Enlace al documento de Business Blueprint correspondiente (sección de línea de negocio afectada).
- **Formato:** Problema concreto → evidencia → oportunidad → coste de no hacerlo.

---

#### 3. Alcance

- **Propósito:** Definir los límites del PRD: qué incluye, qué excluye y qué queda para versiones futuras.
- **Debe contener:**
  - **Dentro del alcance (In Scope):** Funcionalidades que se implementan.
  - **Fuera del alcance (Out of Scope):** Funcionalidades que explícitamente no se implementan.
  - **Evoluciones futuras (V2+):** Funcionalidades que se dejan para versiones posteriores pero que están relacionadas.
- **Formato:** Listas con viñetas o tabla. Cada ítem debe ser una funcionalidad concreta, no una categoría genérica.

---

#### 4. User Journey y Flujo

- **Propósito:** Describir cómo interactúa el usuario con la funcionalidad de principio a fin.
- **Debe contener:**
  - **User Journey principal:** Paso a paso del flujo feliz (happy path).
  - **User Journey alternativos:** Variaciones y caminos alternativos.
  - **Casos edge:** Situaciones excepcionales y cómo se manejan.
  - **Diagrama de flujo (si aplica):** Arte ASCII o referencia a diagrama externo.
  - **Referencia al Customer Journey de GTM** si es un flujo orientado a captación o conversión.
- **Formato:** Pasos numerados o tabla con: Actor, Acción, Sistema, Resultado esperado.

---

#### 5. Requisitos Funcionales

- **Propósito:** Especificar qué debe hacer el sistema. Es la sección más importante del PRD.
- **Debe contener:**
  - Cada requisito funcional debe tener un **identificador único**: `RF-{PRD-NNN}-{NNN}`.
  - **Descripción** del comportamiento esperado.
  - **Criterios de aceptación** por requisito (ver formato abajo).
  - **Prioridad:** Alta, Media, Baja.
  - **Dependencia:** Referencia a otro RF, entidad del dominio o documento.
- **Formato de cada RF:**

  ```
  ### RF-{PRD-NNN}-{NNN}: Título descriptivo
  - **Descripción:** Comportamiento esperado en una frase.
  - **Prioridad:** Alta | Media | Baja
  - **Dependencias:** [IDs de otros RFs, entidades, o documentos]
  - **Criterios de aceptación:**
    1. [Escenario 1 — Given/When/Then]
    2. [Escenario 2 — Given/When/Then]
    3. ...
  - **Notas:** [Información adicional si es necesaria]
  ```

- **Criterios de aceptación:** Deben redactarse en formato **Given-When-Then** (Gherkin):

  ```
  Dado (Given) [contexto inicial]
  Cuando (When) [acción del usuario o evento]
  Entonces (Then) [resultado esperado]
  ```

  **Ejemplo:**
  ```
  Dado un expediente en estado PITR_COMPLETADO
  Cuando el Arquitecto Técnico accede al expediente
  Entonces el sistema muestra el botón "Iniciar Revisión" en lugar de "Editar"
  ```

---

#### 6. Requisitos No Funcionales

- **Propósito:** Especificar las propiedades de calidad del sistema.
- **Debe contener:**
  - Cada requisito no funcional debe tener un **identificador único**: `RNF-{PRD-NNN}-{NNN}`.
  - **Tipo:** Rendimiento, Seguridad, Usabilidad, Disponibilidad, Mantenibilidad, Compatibilidad.
  - **Descripción** del requisito.
  - **Métrica:** Cómo se mide el cumplimiento.
  - **Umbral:** Valor mínimo aceptable.
- **Formato:**

  ```
  ### RNF-{PRD-NNN}-{NNN}: Título del requisito
  - **Tipo:** Rendimiento | Seguridad | Usabilidad | Disponibilidad | Mantenibilidad | Compatibilidad
  - **Descripción:** Comportamiento esperado.
  - **Métrica:** [Cómo se mide]
  - **Umbral:** [Valor mínimo aceptable]
  ```

---

#### 7. Reglas de Negocio

- **Propósito:** Documentar las reglas de negocio que gobiernan el comportamiento de la funcionalidad.
- **Debe contener:**
  - Cada regla debe tener un **identificador**: `RN-{PRD-NNN}-{NNN}`.
  - Descripción de la regla.
  - Referencia a la política de negocio en CF-040-BUSINESS-POLICIES.md si aplica.
  - Referencia a las reglas definidas en el Domain Model (CF-021) si aplica.
- **Formato:**

  ```
  ### RN-{PRD-NNN}-{NNN}: Título de la regla
  - **Descripción:** [Regla de negocio]
  - **Origen:** [CF-040 | CF-021 | Nueva — si es nueva, justificar]
  ```

---

#### 8. Integraciones y APIs

- **Propósito:** Especificar las integraciones con sistemas externos o internos que requiere la funcionalidad.
- **Debe contener:**
  - Cada integración debe tener un **identificador**: `INT-{PRD-NNN}-{NNN}`.
  - **Sistema externo:** Nombre del sistema (Supabase, MyPOS, n8n, etc.).
  - **Tipo de integración:** API REST, Webhook, SDK, Evento.
  - **Propósito:** Qué hace la integración.
  - **Datos intercambiados:** Qué datos fluyen (referencia al Data Model CF-020).
  - **Contrato esperado:** Endpoint, método, payload de ejemplo (o referencia a documentación externa).

---

#### 9. Datos y Persistencia

- **Propósito:** Describir qué datos se crean, modifican o consultan.
- **Debe contener:**
  - **Entidades del dominio afectadas:** Referencia a CF-020-DATA-MODEL.md y CF-021-DOMAIN-MODEL.md.
  - **Nuevas entidades o campos:** Si se requieren, detallar con el mismo formato que CF-020.
  - **Volumen esperado:** Estimación de registros/día, tamaño de datos.
  - **Políticas de retención:** Cuánto tiempo se conservan los datos.
  - **Soft Delete:** Confirmar si aplica (por defecto, sí — según CF-001A).
  - **Optimistic Locking:** Confirmar si aplica (por defecto, sí — según CF-001A).

---

#### 10. UX y Diseño

- **Propósito:** Especificar los requisitos de experiencia de usuario y diseño.
- **Debe contener:**
  - **Pantallas y componentes:** Lista de las pantallas o componentes nuevos/modificados.
  - **Flujo de navegación:** Cómo se accede a la funcionalidad desde la interfaz existente.
  - **Estados de la UI:** Loading, empty, error, success para cada pantalla.
  - **Responsive:** Comportamiento en mobile, tablet y desktop.
  - **Referencia al Design System:** Componentes del Design System que se reutilizan (Volumen 03).
  - **Referencia a la UX Bible:** Patrones de interacción que se siguen (Volumen 04).
  - **Enlace a prototipos (si existen):** Figma, Storybook, etc.

---

#### 11. Trazabilidad

- **Propósito:** Conectar este PRD con los documentos upstream y downstream del ecosistema Certilab.
- **Debe contener:**
  - Tabla de trazabilidad con tres columnas: Documento upstream, Sección/Referencia, Relación.
  - **Documentos upstream obligatorios:**
    - BP-100-XX (Línea de negocio afectada)
    - PA-001-CATALOG.md (Producto/servicio del catálogo)
    - PA-001-PRODUCT-ARCHITECTURE.md (Arquitectura de producto)
    - GTM-001-XXX (si aplica: pricing, customer journey, etc.)
    - ADR-XXX (si aplica)
  - **Documentos downstream potenciales:**
    - Epic design docs (EP-XXX-ANALYSIS, EP-XXX-DESIGN)
    - Implementation tickets
    - Tests
- **Formato:**

  ```
  | Documento Upstream | Sección/Referencia | Relación con este PRD |
  |--------------------|-------------------|------------------------|
  | BP-100-02 | Línea 2: Auditoría Técnica | Esta funcionalidad implementa el servicio de Auditoría Técnica descrito en BP |
  | PA-001-CATALOG | Servicio: Segunda Opinión Express | Este PRD desarrolla el producto definido en PA |
  | GTM-001-PRICING | Precios Segunda Opinión | Los límites del servicio deben alinearse con los precios definidos en GTM |
  ```

---

#### 12. Riesgos y Supuestos

- **Propósito:** Identificar los riesgos conocidos y los supuestos bajo los que se desarrolla.
- **Debe contener:**
  - **Riesgos:** Situaciones que podrían impedir o retrasar la implementación.
  - **Mitigaciones:** Qué se hará para reducir cada riesgo.
  - **Supuestos:** Condiciones que se dan por ciertas para que el PRD tenga sentido.
  - **Dependencias externas:** Cosas que deben ocurrir fuera del equipo para que esto funcione.

---

#### 13. Preguntas Abiertas

- **Propósito:** Registrar las decisiones pendientes que deben resolverse antes de la aprobación.
- **Debe contener:**
  - Lista de preguntas con responsable y fecha límite.
  - Cada pregunta debe tener un estado: `PENDIENTE` | `RESUELTA` | `RECHAZADA`.
- **Formato:**

  ```
  | # | Pregunta | Responsable | Fecha límite | Estado |
  |---|----------|-------------|--------------|--------|
  | 1 | ¿Debe notificarse al cliente por email o solo en dashboard? | PO | 2026-07-15 | PENDIENTE |
  ```

---

#### 14. Histórico de Cambios

- **Propósito:** Registrar quién ha modificado este PRD, cuándo y por qué.
- **Formato:**

  ```
  | Versión | Fecha | Autor | Cambio | Documento de referencia |
  |---------|-------|-------|--------|------------------------|
  | 1.0 | 2026-07-06 | [Autor] | Versión inicial | — |
  | 1.1 | 2026-07-20 | [Autor] | Actualización alcance RF-001 | Acta reunión 2026-07-18 |
  ```

---

### 3.3 Secciones opcionales

Las siguientes secciones pueden incluirse si el PRD lo requiere:

| Sección | Cuándo incluirla |
|---------|------------------|
| **Glosario de términos** | Si el PRD introduce nueva terminología del dominio |
| **Métrica de éxito** | Si se quiere medir el impacto post-lanzamiento (KPIs) |
| **Plan de rollout** | Si la funcionalidad se despliega por fases |
| **Consideraciones legales** | Si la funcionalidad tiene implicaciones regulatorias |
| **Estrategia de datos para IA** | Si la funcionalidad consume o genera datos para el Observatorio o modelos de IA |

---

## 4. REGLAS DE REDACCIÓN

### 4.1 Principios de escritura

1. **Una responsabilidad por PRD.** Un PRD describe una funcionalidad o un conjunto de funcionalidades estrechamente relacionadas. No mezclar iniciativas independientes en un mismo PRD.

2. **Un requisito, un comportamiento.** Cada RF debe describir una sola unidad de comportamiento. Si un RF necesita múltiples escenarios, usar criterios de aceptación separados, no dividir en sub-RFs.

3. **Lenguaje preciso, no ambiguo.** Evitar palabras como "rápido", "fácil", "intuitivo", "moderno" sin métrica asociada. Usar lenguaje concreto: "La respuesta debe renderizarse en menos de 2 segundos", no "La respuesta debe ser rápida".

4. **Evitar prescribir la implementación.** El PRD dice **qué** debe hacer el sistema, no **cómo** debe implementarse. Ejemplo correcto: "El sistema debe validar que el email tiene formato válido". Ejemplo incorrecto: "El sistema debe usar una regex para validar el email".

5. **Negativo explícito.** Si un comportamiento no debe ocurrir, especificarlo como un criterio de aceptación negativo. Ejemplo: "Dado un email inválido, Cuando el usuario envía el formulario, Entonces el sistema muestra un error y no crea el expediente".

6. **Sin ambigüedad temporal.** Usar fechas concretas o eventos del sistema, no "próximamente" o "en el futuro cercano".

7. **Los criterios de aceptación son contracto.** Si un test falla porque el comportamiento no coincide con el criterio de aceptación, el error es del código, no del PRD. Si el criterio de aceptación es incorrecto, debe modificarse el PRD antes que el código.

### 4.2 Formato

- Usar Markdown estándar (GFM — GitHub Flavored Markdown).
- Títulos con `#` para secciones (máximo 3 niveles de profundidad: `##`, `###`, `####`).
- Tablas para datos estructurados (metadatos, trazabilidad, riesgos).
- Listas numeradas para secuencias (pasos del user journey).
- Listas con viñetas para opciones, dependencias, ítems de alcance.
- Los RFs, RNFs, RNs e INTs deben ser secciones `###` dentro de su sección correspondiente.
- Arte ASCII para diagramas simples. Para diagramas complejos, referencia a archivo externo en `docs/diagrams/`.

### 4.3 Identificadores y nomenclatura

| Elemento | Prefijo | Ejemplo |
|----------|---------|---------|
| Requisito Funcional | RF-{PRD-NNN}-{NNN} | RF-001-001 |
| Requisito No Funcional | RNF-{PRD-NNN}-{NNN} | RNF-001-001 |
| Regla de Negocio | RN-{PRD-NNN}-{NNN} | RN-001-001 |
| Integración | INT-{PRD-NNN}-{NNN} | INT-001-001 |

### 4.4 Reglas de exclusión

Está **prohibido** incluir en un PRD:

- Discusiones arquitectónicas (deben ir en ADR o CF-XXX).
- Código de implementación (el PRD especifica, no implementa).
- Diseño de base de datos detallado (debe ir en CF-020 o migraciones SQL).
- Estrategias de testing (deben ir en los tests, no en el PRD).
- Planes de marketing (deben ir en GTM).
- Discusiones de roadmap que no sean referencias puntuales.

---

## 5. CRITERIOS DE CALIDAD

### 5.1 Checklist de calidad obligatorio

Antes de que un PRD pase de `BORRADOR` a `EN_REVISION`, debe superar este checklist. No puede saltarse ningún punto:

| # | Criterio | Verificación |
|---|----------|-------------|
| 1 | **Completitud:** Todas las secciones obligatorias están presentes y no contienen `[TODO]`. | Revisión manual |
| 2 | **Trazabilidad ascendente:** Existe al menos una referencia a BP y otra a PA. Si aplica, también a GTM. | Revisión manual |
| 3 | **RFs con identificador único:** Todos los RFs tienen formato `RF-{PRD-NNN}-{NNN}`. | Automatizable |
| 4 | **Criterios de aceptación en formato Given-When-Then:** Cada RF tiene al menos un criterio de aceptación con ese formato. | Automatizable |
| 5 | **Sin ambigüedad:** No hay palabras como "rápido", "fácil", "intuitivo", "moderno" sin métrica. | Automatizable (grep) |
| 6 | **Sin prescripción de implementación:** No hay descripciones de cómo implementar, solo de qué comportamiento se espera. | Revisión manual |
| 7 | **RNFs con métrica y umbral:** Todos los RNFs tienen métrica cuantificable y umbral numérico. | Automatizable |
| 8 | **Alcance definido:** Las secciones In Scope y Out of Scope están completas y no tienen ambigüedad. | Revisión manual |
| 9 | **Preguntas resueltas:** Todas las preguntas de la sección 13 están en estado `RESUELTA` o `RECHAZADA`. | Revisión manual |
| 10 | **Sin reglas de negocio huerfanas:** Toda RN referenciada en un RF existe y está documentada. | Automatizable |
| 11 | **Formato markdown válido:** El documento se renderiza correctamente sin errores de formato. | Automatizable |
| 12 | **Sin referencias rotas:** Todos los enlaces a otros documentos son válidos (existen en el repositorio). | Automatizable |
| 13 | **Product-First Execution Mode:** Las preguntas obligatorias de la sección 9 están respondidas. | Revisión manual |

### 5.2 Umbrales de aceptación

- **Puntuación mínima:** 12/13 criterios superados.
- **Criterios obligatorios:** Los criterios 1, 2, 3, 4, 5, 6, 8, 9, 13 son obligatorios. Si falla uno de estos, el PRD no puede avanzar aunque tenga el resto aprobados.
- **Revisión cruzada:** Al menos un revisor que no sea el autor debe validar el checklist.

### 5.3 Responsable de la revisión

El **Product Owner** es el responsable último de la calidad del PRD. Puede delegar la revisión en un miembro del equipo, pero la aprobación final es suya.

---

## 6. TRAZABILIDAD CON BB, PA Y GTM

### 6.1 Jerarquía documental

```
Business Blueprint (BP-100-XX)
    └── Define la necesidad de negocio y la línea de negocio.
        ↓
Product Architecture (PA-001-*)
    └── Define el producto, el servicio y el catálogo.
        ↓
PRD (PRD-XXX) ←── Este documento
    └── Define los requisitos para implementar la funcionalidad.
        ↓
Go-To-Market (GTM-001-*)
    └── Define cómo se comercializa (paralelo, informativo).
        ↓
Épica de implementación (EP-XXX)
    └── Implementa los requisitos definidos en el PRD.
        ↓
Tests, Build, Release, Auditoría, Cierre
```

### 6.2 Reglas de trazabilidad

1. **Cada PRD debe poder trazarse a al menos un documento BP.** Si un PRD no responde a ninguna necesidad de negocio documentada, no debería existir.

2. **Cada PRD debe poder trazarse a al menos una entrada del catálogo PA.** Si el PRD desarrolla algo que no está en el catálogo de producto, primero debe actualizarse PA.

3. **Cada PRD debe considerar la documentación GTM relevante.** Si el PRD afecta a pricing, customer journey o posicionamiento, debe reflejarlo en la sección de trazabilidad.

4. **Cada RF debe poder trazarse a un requisito de negocio o una regla de dominio.** Si un RF no tiene origen documentado, probablemente sobra.

5. **La trazabilidad es bidireccional:** Desde el PRD se puede navegar al documento upstream, y desde el documento upstream se debe poder identificar qué PRDs lo implementan.

### 6.3 Tabla de referencia cruzada

| Documento | Rol en el ecosistema | Qué contiene relevante para PRD |
|-----------|---------------------|---------------------------------|
| BP-100-01 | Business Canvas | Modelo de negocio, propuesta de valor, segmentos de cliente |
| BP-100-02 | Líneas de Negocio | Servicios, flujos operativos, propuesta de valor por línea |
| BP-100-03 | Modelo Operativo y Comercial | Procesos, canales, estructura operativa |
| BP-100-04 | Marketing, Customer Journey, Crecimiento | Estrategia de captación, conversión, retención |
| PA-001-PRODUCT-ARCHITECTURE | Arquitectura de Producto | Definición de productos, relaciones, ciclo de vida |
| PA-001-CATALOG | Catálogo de Productos | Productos y servicios oficiales con descripción y precio |
| PA-001-VALIDATION-CRITERIA | Criterios de Validación | Criterios que todo producto debe cumplir |
| GTM-001-PRICING | Pricing | Precios, modelos de suscripción, descuentos |
| GTM-001-CUSTOMER-JOURNEY | Customer Journey | Touchpoints, experiencia del cliente |
| GTM-001-GTM-STRATEGY | GTM Strategy | Canales, posicionamiento, lanzamiento |
| GTM-001-POSITIONING | Posicionamiento | Mensajes, diferenciación, competencia |
| CF-020 | Data Model | Entidades, relaciones, campos |
| CF-021 | Domain Model | Agregados, reglas de dominio, eventos |
| CF-040 | Business Policies | Políticas de negocio que gobiernan el comportamiento |
| CF-000 | Project Brain (Constitución) | Reglas absolutas, principios de desarrollo, roadmap |

---

## 7. PROCESO DE VALIDACIÓN PREVIO AL DESARROLLO

### 7.1 Flujo de validación

```
┌─────────────────────────────────────────────────────────────┐
│                    1. AUTOEVALUACIÓN                         │
│    El autor aplica el checklist de calidad (sección 5.1)     │
│    ¿Pasa? → SÍ → Avanza    NO → Vuelve a editar             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 2. REVISIÓN CRUZADA                           │
│    Revisor asigna: PASA / PASA CON OBSERVACIONES / RECHAZA   │
│    ¿Pasa? → SÍ (o con observaciones menores) → Avanza        │
│    ¿RECHAZA? → Vuelve a editar + nueva revisión              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│               3. APROBACIÓN DEL PRODUCT OWNER                 │
│    El PO revisa y firma: APROBADO / RECHAZADO                │
│    ¿APROBADO? → PRD pasa a estado APROBADO                   │
│    ¿RECHAZADO? → Se archiva o se envía a revisión mayor      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│             4. ENTRADA EN EL BACKLOG DE DESARROLLO            │
│    Se asigna épica (EP-XXX) y se planifica la implementación │
│    El PRD pasa a estado EN_DESARROLLO                         │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Tiempos máximos

| Fase | Tiempo máximo | Responsable |
|------|---------------|-------------|
| Autoevaluación | 2 días hábiles desde la creación | Autor |
| Revisión cruzada | 3 días hábiles desde que se solicita | Revisor asignado |
| Aprobación PO | 2 días hábiles desde que se solicita | Product Owner |
| **Total ciclo** | **7 días hábiles máximo** | — |

### 7.3 Causas de rechazo

Un PRD puede ser rechazado en cualquiera de estas fases por:

1. **Incumplimiento constitucional:** Viola lo establecido en CF-000, CF-001A o una ADR aprobada.
2. **Sin justificación de negocio:** No se traza a un BP o la necesidad de negocio no está clara.
3. **Alcance no viable:** El alcance es demasiado grande, demasiado ambiguo o no se puede implementar en una épica.
4. **Violación de MVP Discipline:** Propone algo que está explícitamente prohibido en V1 (arquitectura nueva, refactorizaciones masivas, etc.).
5. **Criterios de calidad insuficientes:** No pasa el checklist de calidad.
6. **No responde a las preguntas obligatorias Product-First:** Las respuestas de la sección 9 no son satisfactorias.

### 7.4 Registro de validación

Cada PRD debe incluir, al final del documento, una tabla de registro de validación:

```
| Fase | Fecha | Responsable | Resultado | Observaciones |
|------|-------|-------------|-----------|---------------|
| Autoevaluación | YYYY-MM-DD | [Autor] | ✅ PASA | — |
| Revisión cruzada | YYYY-MM-DD | [Revisor] | ✅ PASA | [Observaciones si las hay] |
| Aprobación PO | YYYY-MM-DD | [PO] | ✅ APROBADO | — |
```

---

## 8. DEFINITION OF DONE DEL PRD

Un PRD se considera completo (`CERRADO`) únicamente cuando se cumplen **todos** los siguientes puntos:

| # | Criterio | Cómo se verifica |
|---|----------|-----------------|
| 1 | **Todas las secciones obligatorias completas** sin `[TODO]`. | Revisión del documento |
| 2 | **Checklist de calidad superado** (mínimo 12/13). | Registro en el documento |
| 3 | **Aprobación del PO registrada** en la tabla de validación. | Registro en el documento |
| 4 | **Trazabilidad documentada** con BP, PA y GTM (si aplica). | Sección de trazabilidad |
| 5 | **Identificadores únicos asignados** a todos los RFs, RNFs, RNs e INTs. | Automatizable |
| 6 | **Preguntas abiertas resueltas** (todas RESUELTA o RECHAZADA). | Sección de preguntas |
| 7 | **Respuestas a las preguntas obligatorias Product-First** registradas. | Sección 9 completada |
| 8 | **Sin referencias rotas** a otros documentos del repositorio. | Automatizable |
| 9 | **Formato markdown válido** y sin errores de lint. | Automatizable |
| 10 | **Épica asignada** en el campo "Épica asociada" de los metadatos. | Metadatos del documento |

---

## 9. PREGUNTAS OBLIGATORIAS (PRODUCT-FIRST EXECUTION MODE)

> Según lo establecido en AGENTS.md sección 9.5 (PRODUCT-FIRST EXECUTION MODE), todo PRD debe responder obligatoriamente a estas preguntas antes de iniciar la implementación.

El autor del PRD debe incluir las respuestas en esta sección. No puede omitirse ninguna pregunta.

---

### P1. ¿Qué capacidad funcional añade al MVP?

Debe identificarse la funcionalidad concreta que el usuario final podrá utilizar y que no existía antes.

**Respuesta:** [Texto]

---

### P2. ¿Qué agregados participan?

Deben enumerarse los agregados del Core V1 (Cliente, Inmueble, Expediente, Documento IA) y/o nuevos que intervienen, especificando el rol de cada uno.

| Agregado | Rol en esta funcionalidad |
|----------|--------------------------|
| [Cliente / Inmueble / Expediente / Documento IA / Nuevo] | [Descripción del rol] |

**Respuesta:** [Texto / Tabla]

---

### P3. ¿Cómo interactúan entre sí?

Debe describirse el flujo de datos y la secuencia de interacciones entre los agregados participantes, incluyendo las reglas de negocio que gobiernan dicha interacción.

**Respuesta:** [Texto o diagrama]

---

### P4. ¿Por qué esta es la solución de menor complejidad que satisface completamente el requisito funcional respetando la arquitectura aprobada?

Debe justificarse por qué no se ha optado por una solución más simple (reutilización directa, composición o extensión controlada según la jerarquía de AGENTS.md sección 9.3).

**Respuesta:** [Texto justificativo]

---

## 10. ANEXOS Y REFERENCIAS

### 10.1 Documentos relacionados

| Código | Título | Relación |
|--------|--------|----------|
| CF-000 | Project Brain (Constitución) | Marco normativo del proyecto. Define reglas absolutas y principios. |
| CF-001A | Acta de Cierre de Arquitectura V1 | Decisiones arquitectónicas congeladas que ningún PRD puede violar. |
| AGENTS.md | Reglas de Gobernanza | EPIC WORKFLOW, DEFINITION OF DONE, PRODUCT-FIRST EXECUTION MODE. |
| CF-020 | Data Model | Entidades, relaciones y campos del modelo de datos. |
| CF-021 | Domain Model | Agregados, reglas de dominio y eventos del dominio. |
| CF-040 | Business Policies | Políticas de negocio que gobiernan el comportamiento del sistema. |
| CF-050 | MVP Freeze | Funcionalidades congeladas para el alcance del MVP V1. |

### 10.2 Estructura de archivo

```
docs/analysis/PRD-{NNN}-{DESCRIPTIVE-SLUG}.md
```

**Regla:** Los PRDs se almacenan en `docs/analysis/` para mantenerlos junto con el resto de documentación de análisis de producto. Cada PRD tiene un número secuencial único.

### 10.3 Template para nuevo PRD

Para crear un nuevo PRD, copiar la siguiente estructura mínima:

```
# PRD-{NNN} — {Título Descriptivo}

| Campo | Valor |
|-------|-------|
| **Código** | PRD-{NNN} |
| **Título** | {Título} |
| **Versión** | 1.0 |
| **Fecha** | {YYYY-MM-DD} |
| **Estado** | BORRADOR |
| **Precedencia** | {BP-XXX}, {PA-XXX} |
| **Dependencias** | {PRD-XXX si aplica} |
| **Épica asociada** | {EP-XXX cuando se asigne} |
| **Propósito** | {Una frase} |

---

## 1. Resumen Ejecutivo

...

## 2. Problema y Oportunidad

...

## 3. Alcance

### In Scope

...

### Out of Scope

...

### Evoluciones futuras (V2+)

...

## 4. User Journey y Flujo

...

## 5. Requisitos Funcionales

### RF-{NNN}-001: {Título}
- **Descripción:** ...
- **Prioridad:** Alta
- **Dependencias:** ...
- **Criterios de aceptación:**
  1. Dado ... Cuando ... Entonces ...

## 6. Requisitos No Funcionales

### RNF-{NNN}-001: {Título}
- **Tipo:** ...
- **Descripción:** ...
- **Métrica:** ...
- **Umbral:** ...

## 7. Reglas de Negocio

### RN-{NNN}-001: {Título}
- **Descripción:** ...
- **Origen:** ...

## 8. Integraciones y APIs

### INT-{NNN}-001: {Título}
- **Sistema externo:** ...
- **Tipo:** ...
- **Propósito:** ...

## 9. Datos y Persistencia

...

## 10. UX y Diseño

...

## 11. Trazabilidad

| Documento Upstream | Sección/Referencia | Relación |
|--------------------|-------------------|----------|
| BP-XXX | ... | ... |
| PA-XXX | ... | ... |
| GTM-XXX | ... | ... |

## 12. Riesgos y Supuestos

...

## 13. Preguntas Abiertas

| # | Pregunta | Responsable | Fecha límite | Estado |
|---|----------|-------------|--------------|--------|
| 1 | ... | ... | ... | PENDIENTE |

## 14. Respuestas Product-First (Preguntas Obligatorias)

### P1. ¿Qué capacidad funcional añade al MVP?

...

### P2. ¿Qué agregados participan?

...

### P3. ¿Cómo interactúan entre sí?

...

### P4. ¿Por qué esta es la solución de menor complejidad?

...

## 15. Histórico de Cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 1.0 | {YYYY-MM-DD} | {Autor} | Versión inicial |

## 16. Registro de Validación

| Fase | Fecha | Responsable | Resultado | Observaciones |
|------|-------|-------------|-----------|---------------|
| Autoevaluación | | | | |
| Revisión cruzada | | | | |
| Aprobación PO | | | | |
```

---

## FIN DEL DOCUMENTO PRD-FRAMEWORK-001