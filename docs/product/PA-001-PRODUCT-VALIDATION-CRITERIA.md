# PA-002 — Criterios de Validación de Nuevos Productos

| Campo | Valor |
|-------|-------|
| **Código** | PA-002 |
| **Título** | Criterios de Validación de Nuevos Productos |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-06 |
| **Estado** | ✅ APROBADO |
| **Precedencia** | CF-000 (Constitución), PA-001 (Arquitectura de Productos), ADR-003 (GTD), ADR-004 (Extensión Documento IA) |
| **Propósito** | Definir el proceso oficial de validación para proponer, evaluar y aprobar nuevos productos dentro del ecosistema Certilab |

---

## Índice

1. [Introducción y propósito](#1-introducción-y-propósito)
2. [Proceso de validación: 5 Gates](#2-proceso-de-validación-5-gates)
3. [Gate 1 — Strategic Fit](#3-gate-1--strategic-fit)
4. [Gate 2 — Business Case](#4-gate-2--business-case)
5. [Gate 3 — Technical Feasibility](#5-gate-3--technical-feasibility)
6. [Gate 4 — Prioritization](#6-gate-4--prioritization)
7. [Gate 5 — Approval](#7-gate-5--approval)
8. [Regla de mínima expansión](#8-regla-de-mínima-expansión)
9. [Template de propuesta de nuevo producto](#9-template-de-propuesta-de-nuevo-producto)
10. [Trazabilidad obligatoria](#10-trazabilidad-obligatoria)
11. [Anexos](#11-anexos)

---

## 1. Introducción y propósito

Este documento define el **proceso oficial de validación** para proponer, evaluar y aprobar nuevos productos dentro del ecosistema Certilab.

Todo nuevo producto —ya sea un módulo de la plataforma, un servicio independiente, una funcionalidad transversal o una nueva línea de negocio— debe pasar por las **5 Gates de Validación** aquí definidas antes de ser incorporado al Catálogo Oficial de Productos y, por tanto, antes de que pueda generarse cualquier PRD, épica o desarrollo asociado.

### 1.1 ¿Por qué es necesario?

- Evita que el catálogo de productos se diluya con iniciativas no alineadas con la estrategia.
- Garantiza que todo nuevo producto respete la Constitución, la arquitectura congelada y las restricciones del MVP.
- Asegura que solo se desarrollen productos con caso de negocio viable, viabilidad técnica demostrada y prioridad justificada.
- Mantiene la coherencia del ecosistema: los productos se construyen sobre el Core V1 y se integran en Certilab Platform.

### 1.2 Ámbito de aplicación

Este proceso aplica a:

- **Nuevos productos** que no existen en el Catálogo Oficial (PA-001-CATALOG).
- **Nuevas líneas de negocio** más allá de ATI, GTD, PLT y TRV.
- **Extensiones significativas** de productos existentes que cambien su alcance, ICP o modelo de ingresos.

**No aplica a:**
- Mejoras internas de productos ya catalogados (evolución dentro del alcance definido).
- Correcciones técnicas o deuda técnica.
- Optimizaciones que no cambien la propuesta de valor al cliente.

---

## 2. Proceso de validación: 5 Gates

```
PROPUESTA
    │
    ▼
┌─────────────────────────────────────────────────────┐
│ GATE 1: STRATEGIC FIT                               │
│ ¿El producto está alineado con la Constitución?     │
│ ¿Respeta CF-001A? ¿Encaja en una línea existente?  │
└──────────────────────┬──────────────────────────────┘
         │ FAIL → RECHAZADO
         │ PASS ↓
         ▼
┌─────────────────────────────────────────────────────┐
│ GATE 2: BUSINESS CASE                               │
│ ¿Problema definido? ¿Mercado cuantificable?         │
│ ¿Modelo de ingresos viable?                         │
└──────────────────────┬──────────────────────────────┘
         │ FAIL → RECHAZADO
         │ PASS ↓
         ▼
┌─────────────────────────────────────────────────────┐
│ GATE 3: TECHNICAL FEASIBILITY                       │
│ ¿Se puede construir con Core V1 existente?          │
│ ¿Composición vs. creación?                          │
└──────────────────────┬──────────────────────────────┘
         │ FAIL → RECHAZADO (o requiere ADR)
         │ PASS ↓
         ▼
┌─────────────────────────────────────────────────────┐
│ GATE 4: PRIORITIZATION                              │
│ ¿Puntuación suficiente en matriz de priorización?   │
│ ¿Justifica su posición en el roadmap?              │
└──────────────────────┬──────────────────────────────┘
         │ FAIL → RECHAZADO (o pasa a backlog V2+)
         │ PASS ↓
         ▼
┌─────────────────────────────────────────────────────┐
│ GATE 5: APPROVAL                                    │
│ Aprobación formal por autoridades competentes       │
└──────────────────────┬──────────────────────────────┘
         │ FAIL → RECHAZADO
         │ PASS ↓
         ▼
✅ PRODUCTO INCORPORADO AL CATÁLOGO OFICIAL
         ↓
   INICIO DE PRD → ÉPICA → DESARROLLO → RELEASE
```

---

## 3. Gate 1 — Strategic Fit

### 3.1 Preguntas de validación

| # | Pregunta | Criterio de aprobación |
|---|----------|------------------------|
| 1.1 | ¿El producto está alineado con los principios de la Constitución (CF-000)? | Debe cumplir los 7 principios: remoto, nacional, escalable, automatizable, orientado al cliente, integrado en ecosistema, trazable. |
| 1.2 | ¿Respeta el Acta de Cierre de Arquitectura V1 (CF-001A)? | No debe requerir cambios en la arquitectura del Core V1. Si los requiere, debe presentar una ADR. |
| 1.3 | ¿Respeta el MVP Freeze (CF-050)? | Si el producto requiere desarrollo en V1, debe justificarse como necesario para el MVP. |
| 1.4 | ¿Encaja en una línea de negocio existente (ATI, GTD, PLT, TRV)? | Si no encaja en ninguna línea existente, se considera una nueva línea y requiere ADR específica. |
| 1.5 | ¿Aporta valor al flujo de referencia del MVP? | Debe integrarse en al menos un paso del flujo: Cliente → Inmueble → Expediente → Documento IA → PITR™ → Resultado. |

### 3.2 Decisión

- **PASS**: El producto supera el Gate 1 y pasa a Gate 2.
- **RECHAZADO**: El producto no está alineado con la estrategia. Se archiva la propuesta.
- **ADR REQUERIDA**: El producto requiere cambios arquitectónicos. Se debe redactar una ADR antes de continuar.

---

## 4. Gate 2 — Business Case

### 4.1 Preguntas de validación

| # | Pregunta | Criterio de aprobación |
|---|----------|------------------------|
| 2.1 | ¿El problema que resuelve está claramente definido? | Descripción del problema validada con datos (encuestas, entrevistas, datos de mercado). |
| 2.2 | ¿El mercado es cuantificable? | TAM (Total Addressable Market), SAM (Serviceable Available Market), SOM (Serviceable Obtainable Market). |
| 2.3 | ¿Existe un ICP definido? | Ideal Customer Profile con datos demográficos, comportamentales y needs. |
| 2.4 | ¿El modelo de ingresos es viable? | Precio estimado, margen, recurrencia vs. one-shot. |
| 2.5 | ¿La unidad económica es positiva? | Customer Acquisition Cost (CAC) < Lifetime Value (LTV). Ratio LTV/CAC > 3x. |
| 2.6 | ¿Existe competencia? ¿Qué nos diferencia? | Análisis competitivo con ventajas diferenciales de Certilab. |

### 4.2 Decisión

- **PASS**: El producto tiene caso de negocio viable. Pasa a Gate 3.
- **RECHAZADO**: Caso de negocio no viable o insuficientemente justificado. Se archiva o se solicita más información.

---

## 5. Gate 3 — Technical Feasibility

### 5.1 Preguntas de validación

| # | Pregunta | Criterio de aprobación |
|---|----------|------------------------|
| 3.1 | ¿Se puede construir con el Core V1 existente? | Debe reutilizar Cliente, Inmueble, Expediente y/o Documento IA. |
| 3.2 | ¿Requiere nuevos agregados raíz? | Si requiere nuevos agregados, se considera cambio arquitectónico → ADR requerida. |
| 3.3 | ¿Es componible desde productos existentes? | Priorizar composición sobre creación (según regla de mínima expansión). |
| 3.4 | ¿Requiere integraciones externas? | Identificar APIs, proveedores, costes de integración. |
| 3.5 | ¿Cuál es el esfuerzo estimado? | Estimación en story points o días/equipo. |
| 3.6 | ¿Existen riesgos técnicos conocidos? | Identificar y documentar riesgos y mitigaciones. |

### 5.2 Decisión

- **PASS**: Técnicamente viable. Pasa a Gate 4.
- **RECHAZADO**: No es viable técnicamente sin cambios arquitectónicos que requieren ADR.
- **ADR REQUERIDA**: Se necesita una ADR para evaluar el cambio arquitectónico antes de continuar.

---

## 6. Gate 4 — Prioritization

### 6.1 Scorecard de priorización

Cada producto se evalúa con la misma matriz definida en PA-001:

| Criterio | Peso | Puntuación (1-5) | Ponderado |
|----------|------|:----------------:|:---------:|
| Impacto en MVP | 30% | | |
| Valor estratégico | 25% | | |
| Potencial de ingresos | 20% | | |
| Complejidad técnica (inversa) | 15% | | |
| Dependencias | 10% | | |
| **TOTAL** | **100%** | | |

### 6.2 Umbrales de priorización

| Puntuación | Clasificación | Acción |
|:----------:|---------------|--------|
| ≥ 4.0 | **Crítica** | Implementación inmediata en la siguiente fase del roadmap |
| 3.0 - 3.9 | **Alta** | Planificar en la siguiente fase o en la próxima planificación |
| 2.0 - 2.9 | **Media** | Incluir en backlog para fases futuras (V2+) |
| < 2.0 | **Baja** | Archivar o reevaluar en siguiente ciclo estratégico |

### 6.3 Decisión

- **PASS** (≥ 3.0): El producto se prioriza para implementación. Pasa a Gate 5.
- **PASS condicional** (2.0 - 2.9): Pasa a backlog. Se requiere justificación adicional para avanzar.
- **RECHAZADO** (< 2.0): No se prioriza. Se archiva.

---

## 7. Gate 5 — Approval

### 7.1 Autoridades de aprobación

| Tipo de decisión | Aprueba | Condiciones |
|------------------|---------|-------------|
| **Nuevo producto en línea existente** | CEO + CTO | Producto estándar sin cambios arquitectónicos |
| **Nueva línea de negocio** | CEO + Architecture Council | Requiere ADR aprobada y presentación al consejo |
| **Cambio arquitectónico** | Architecture Council (vía ADR) | Evaluación técnica independiente |
| **Excepción al MVP Freeze** | CEO + CTO | Justificación detallada de necesidad para MVP |

### 7.2 Proceso de aprobación

1. El proponente completa el formulario de propuesta (sección 9).
2. Presenta la propuesta al CEO para la pre-evaluación.
3. Si requiere ADR, el Architecture Council evalúa la decisión arquitectónica.
4. Decisión final documentada y comunicada.
5. Si es aprobado, el producto se incorpora al Catálogo Oficial y se inicia la fase de PRD.

### 7.3 Documentación de la aprobación

Toda aprobación debe quedar registrada con:

- Fecha de la decisión.
- Autoridad que aprueba.
- Referencia a la propuesta original.
- Condiciones (si las hay).
- Firma digital o email de confirmación.

---

## 8. Regla de mínima expansión

### 8.1 Principio

Antes de proponer un nuevo producto, el proponente debe demostrar que la funcionalidad no puede resolverse mediante:

### 8.2 Jerarquía de soluciones

1. **Reutilización**: Usar un producto existente sin modificaciones.
   - Pregunta: ¿Un producto ya catalogado resuelve este problema?
   - Evidencia: Mostrar el producto existente y cómo cubre la necesidad.

2. **Composición**: Combinar productos existentes para resolver la necesidad.
   - Pregunta: ¿Dos o más productos existentes pueden combinarse para cubrir la necesidad?
   - Evidencia: Secuencia de uso combinado de productos existentes.

3. **Extensión controlada**: Añadir una capacidad mínima a un producto existente.
   - Pregunta: ¿Es suficiente con añadir una nueva funcionalidad a un producto existente?
   - Evidencia: Alcance mínimo de la extensión necesaria.

4. **Nuevo producto**: Solo si 1, 2 y 3 no son viables.
   - Justificación: Explicar por qué reutilización, composición y extensión no son suficientes.

### 8.3 Obligación de justificación

La propuesta de nuevo producto debe incluir una sección específica que demuestre que se ha recorrido la jerarquía y que 1, 2 y 3 no son viables. Sin esta justificación, la propuesta no pasará de Gate 1.

---

## 9. Template de propuesta de nuevo producto

```markdown
# Propuesta de Nuevo Producto — [CÓDIGO-PROPUESTA-NN]

**Fecha:** [YYYY-MM-DD]
**Proponente:** [Nombre/Rol]
**Versión:** 1.0

---

## 1. Información básica

| Campo | Valor |
|-------|-------|
| Nombre propuesto del producto | |
| Línea de negocio propuesta | [ATI / GTD / PLT / TRV / Nueva] |
| Tipo de propuesta | [Nuevo producto / Nueva línea / Extensión significativa] |
| Código de producto sugerido | [LÍNEA-NN] |

## 2. Gate 1 — Strategic Fit

### 2.1 Alineación con la Constitución
[Explicar cómo cumple los 7 principios]

### 2.2 Respeto a CF-001A
[¿Requiere cambios arquitectónicos? Si sí, describir]

### 2.3 Encaje en línea de negocio existente
[¿Encaja en ATI, GTD, PLT o TRV? ¿Por qué?]

### 2.4 Aporte al flujo MVP
[¿Dónde se integra en el flujo Cliente→Resultado?]

### 2.5 Regla de mínima expansión
[Demostrar que reutilización, composición y extensión no son viables]

## 3. Gate 2 — Business Case

### 3.1 Problema que resuelve
[Descripción detallada]

### 3.2 Mercado
- TAM:
- SAM:
- SOM:

### 3.3 ICP
[Descripción del cliente ideal]

### 3.4 Modelo de ingresos
[Precio, recurrencia, márgenes estimados]

### 3.5 Unidad económica
- CAC estimado:
- LTV estimado:
- Ratio LTV/CAC:

### 3.6 Competencia
[Análisis competitivo]

## 4. Gate 3 — Technical Feasibility

### 4.1 Reutilización del Core V1
[¿Qué agregados del Core V1 se reutilizan?]

### 4.2 Nuevos agregados requeridos
[Si aplica, describir]

### 4.3 Composición con productos existentes
[¿Qué productos existentes participan?]

### 4.4 Integraciones externas necesarias
[APIs, proveedores, costes]

### 4.5 Esfuerzo estimado
[Story points o días/equipo]

### 4.6 Riesgos técnicos
[Riesgos y mitigaciones]

## 5. Gate 4 — Prioritization

### 5.1 Scorecard
| Criterio | Peso | Puntuación (1-5) | Ponderado |
|----------|:----:|:----------------:|:---------:|
| Impacto en MVP | 30% | | |
| Valor estratégico | 25% | | |
| Potencial de ingresos | 20% | | |
| Complejidad técnica | 15% | | |
| Dependencias | 10% | | |
| **TOTAL** | 100% | | |

### 5.2 Posición propuesta en roadmap
[Fase del roadmap donde debería incorporarse]

## 6. Información adicional

### 6.1 Cross-selling potencial
[Productos relacionados]

### 6.2 Up-selling potencial
[Versiones premium]

### 6.3 KPIs propuestos
[Métricas de éxito]

### 6.4 Observaciones
[Cualquier información adicional relevante]

---

**Firma del proponente:** [Nombre]
```

---

## 10. Trazabilidad obligatoria

### 10.1 Cadena completa

Todo producto aprobado debe iniciar su cadena de trazabilidad:

```
PROPUESTA (PA-002)
    ↓
PRODUCTO APROBADO (Catálogo Oficial)
    ↓
PRD (Product Requirements Document)
    ↓
ÉPICA (Epic)
    ↓
DESARROLLO (Implementation)
    ↓
RELEASE (Release)
```

### 10.2 Referencias cruzadas

Cada elemento de la cadena debe incluir referencias al elemento anterior:

- **PRD**: Debe referenciar el código de producto del Catálogo Oficial (ej: `ATI-02`).
- **Épica**: Debe referenciar el PRD correspondiente (ej: `PRD-ATI-02`).
- **Desarrollo**: Cada commit debe referenciar la épica (ej: `EP-XXX`).
- **Release**: Debe listar los productos incluidos y sus épicas.

---

## 11. Anexos

### A. Diagrama de flujo de validación

```
INICIO: Propuesta de nuevo producto
    │
    ▼
┌─────────────────────┐
│ GATE 1: Strategic   │ ← Constitución, CF-001A, CF-050
│ Fit                 │
└─────────┬───────────┘
          │
    ┌─────┴─────┐
    │ PASS?     │ NO → RECHAZADO
    └─────┬─────┘
          │ SÍ
          ▼
┌─────────────────────┐
│ GATE 2: Business    │ ← Datos de mercado, unidad económica
│ Case                │
└─────────┬───────────┘
          │
    ┌─────┴─────┐
    │ PASS?     │ NO → RECHAZADO
    └─────┬─────┘
          │ SÍ
          ▼
┌─────────────────────┐
│ GATE 3: Technical   │ ← Core V1, ADR si necesario
│ Feasibility         │
└─────────┬───────────┘
          │
    ┌─────┴──────────────────────┐
    │ PASS?     NO → ¿ADR viable?│── SÍ → Redactar ADR
    └─────┬──────────────────────┘              │
          │ SÍ                                  │
          ▼                                     │
┌─────────────────────┐                         │
│ GATE 4: Prioriti-   │ ← Matriz de            │
│ zation              │   priorización          │
└─────────┬───────────┘                         │
          │                                     │
    ┌─────┴──────────────────────┐              │
    │ PASS?     NO → ¿Backlog?   │── SÍ → Backlog
    └─────┬──────────────────────┘              │
          │ SÍ                                  │
          ▼                                     │
┌─────────────────────┐                         │
│ GATE 5: Approval    │ ← CEO, CTO, ArchCouncil│
└─────────┬───────────┘                         │
          │                                     │
    ┌─────┴─────┐                               │
    │ PASS?     │ NO → RECHAZADO                │
    └─────┬─────┘                               │
          │ SÍ                                  │
          ▼                                     ▼
┌─────────────────────┐              ┌─────────────────────┐
│ ✅ PRODUCTO         │              │ ADR Presentada      │
│   INCORPORADO       │              │ y evaluada          │
│   AL CATÁLOGO       │              └──────────┬──────────┘
└─────────────────────┘                         │
          │                               ┌─────┴─────┐
          ▼                               │ APROBADA? │
    INICIO PRD ──────────────────────────└─────┬─────┘
          │                                    │ SÍ
          ▼                                    │
    INICIO PRD (con ADR) ◄─────────────────────┘
```

### B. Documentos relacionados

| Documento | Relación |
|-----------|----------|
| CF-000 — Constitución | Principios que todo producto debe cumplir |
| CF-001A — Acta de Cierre de Arquitectura V1 | Restricciones arquitectónicas |
| CF-050 — MVP Freeze | Prioridades y restricciones del MVP |
| PA-001-PRODUCT-ARCHITECTURE.md | Arquitectura de productos y matriz de priorización |
| PA-001-CATALOG.md | Catálogo Oficial de Productos |
| PA-900 — Informe de Cierre | Cierre de PRODUCT-ARCHITECTURE-001 |

### C. Historial de revisiones

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 2026-07-06 | PA-002 | Creación inicial del documento |

---

*Fin del documento PA-001-PRODUCT-VALIDATION-CRITERIA.md*