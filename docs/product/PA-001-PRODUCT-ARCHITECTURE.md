# PA-001 — Product Architecture: De la Estrategia al Producto

| Campo | Valor |
|-------|-------|
| **Código** | PA-001 |
| **Título** | Product Architecture — De la Estrategia al Producto |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-06 |
| **Estado** | ✅ APROBADO |
| **Precedencia** | CF-000 (Constitución), BP-900 (Cierre Business Blueprint), BP-200 (Auditoría Cruzada) |
| **Propósito** | Transformar la estrategia de negocio de Certilab en productos operables y escalables, estableciendo el Catálogo Oficial de Productos como puente entre la estrategia empresarial y el desarrollo de Certilab Platform |

---

## Índice

1. [Executive Summary](#1-executive-summary)
2. [Fundamentos](#2-fundamentos)
3. [Arquitectura de Productos por Líneas de Negocio](#3-arquitectura-de-productos-por-líneas-de-negocio)
4. [Ficha Estándar de Producto](#4-ficha-estándar-de-producto)
5. [Catálogo Oficial de Productos](#5-catálogo-oficial-de-productos)
6. [Matriz de Priorización](#6-matriz-de-priorización)
7. [Roadmap de Incorporación de Productos](#7-roadmap-de-incorporación-de-productos)
8. [Cadena de Trazabilidad](#8-cadena-de-trazabilidad)
9. [Criterios de Validación para Nuevos Productos](#9-criterios-de-validación-para-nuevos-productos)
10. [Anexos](#10-anexos)

---

## 1. Executive Summary

Business Blueprint definió **qué es Certilab como empresa**: una compañía de servicios técnico-digitales que resuelve problemas documentales y técnicos de los propietarios de inmuebles, organizada en líneas de negocio escalables y automatizables.

PRODUCT-ARCHITECTURE-001 responde a la pregunta **qué productos necesita Certilab para ejecutar esa estrategia**.

Este documento transforma el Business Blueprint en el **Catálogo Oficial de Productos de Certilab**. Define:

- La **arquitectura de productos** organizada por líneas de negocio.
- Una **ficha estándar** que todo producto debe cumplir.
- El **catálogo completo** con 14 productos identificados y documentados.
- La **matriz de priorización** que determina el orden de implementación.
- El **roadmap** de incorporación de productos en Certilab Platform.
- Los **criterios de validación** para proponer nuevos productos.
- La **cadena de trazabilidad** obligatoria: Business Blueprint → Producto → PRD → Épica → Desarrollo → Release.

El objetivo no es desarrollar funcionalidades sueltas. El objetivo es construir una plataforma que implemente productos perfectamente definidos y alineados con la estrategia empresarial.

---

## 2. Fundamentos

### 2.1 Principios rectores

Todo producto de Certilab debe respetar estos principios, derivados de la Constitución (CF-000) y el Business Blueprint:

| # | Principio | Implicación |
|---|-----------|-------------|
| 1 | **Empresa 100 % remota** | El producto debe poder entregarse sin presencia física. La operativa debe ser digital y asíncrona. |
| 2 | **Cobertura nacional** | El producto debe funcionar en todo el territorio español, adaptándose a diferencias autonómicas. |
| 3 | **Escalable** | El producto debe poder crecer sin incremento lineal de costes operativos. |
| 4 | **Automatizable** | El producto debe diseñarse para que sus procesos puedan automatizarse progresivamente. |
| 5 | **Orientado a resolver problemas del cliente** | El producto resuelve un problema real del propietario, no satisface un requisito interno. |
| 6 | **Integrado en el ecosistema Certilab** | El producto debe compartir Core V1 (Cliente, Inmueble, Expediente, Documento IA) y datos con el resto del ecosistema. |
| 7 | **Traza documental completa** | Todo producto debe poder recorrerse en la cadena: Blueprint → Producto → PRD → Épica → Desarrollo → Release. |

### 2.2 Restricciones de V1

De acuerdo con CF-001A (Arquitectura congelada) y CF-050 (MVP Freeze):

- **No se modifica la arquitectura del Core V1** durante la fase de definición de producto.
- **No se abren épicas de desarrollo** hasta que el catálogo esté aprobado.
- **No se modifican componentes del Design System**.
- Solo se trabaja sobre **documentación de producto**.

### 2.3 Glosario

| Término | Definición |
|---------|-----------|
| **Producto** | Servicio o funcionalidad con entidad propia que resuelve un problema específico de un cliente objetivo, con un modelo de negocio definido. |
| **Línea de negocio** | Agrupación de productos que comparten un mismo mercado, ICP y modelo operativo. |
| **Certilab Platform** | Plataforma SaaS que implementa los productos de Certilab. |
| **Core V1** | Conjunto de agregados raíz (Cliente, Inmueble, Expediente, Documento IA) que constituyen la base del sistema. |
| **ICP** | Ideal Customer Profile. Perfil de cliente ideal. |
| **PRD** | Product Requirements Document. Documento de requisitos de producto. |
| **ADR** | Architecture Decision Record. Registro de decisión arquitectónica. |

---

## 3. Arquitectura de Productos por Líneas de Negocio

### 3.1 Mapa de arquitectura

```
CERTILAB CORP.
│
├── [ATI] ASISTENCIA TÉCNICA INMOBILIARIA
│   ├── ATI-01 ● Segunda Opinión
│   ├── ATI-02 ○ Segunda Opinión Express
│   ├── ATI-03 ○ Informe Técnico Energético
│   ├── ATI-04 ○ Check-Up Inmobiliario
│   ├── ATI-05 ⚙ PITR™ (Motor interno)
│   └── ATI-06 ○ Observatorio Certilab
│
├── [GTD] GESTIÓN TÉCNICA DOCUMENTAL
│   ├── GTD-01 ◇ Informe de Situación de la Vivienda
│   ├── GTD-02 ◇ Recopilación y Organización Documental
│   ├── GTD-03 ◇ Custodia y Conservación Digital
│   └── GTD-04 ◇ Due Diligence Técnica Inmobiliaria
│
├── [PLT] PLATAFORMA
│   ├── PLT-01 ● Certilab Platform (SaaS AT)
│   └── PLT-02 ● Certilab Backoffice
│
└── [TRV] TRANSVERSAL
    ├── TRV-01 ● Certilab Knowledge Base (CKB™)
    └── TRV-02 ● Certilab Web Pública

Leyenda:
● = ACTIVO (V1)   ○ = PLANIFICADO (V2)   ◇ = PLANIFICADO (PROPUESTO)   ⚙ = Motor interno
```

### 3.2 Línea ATI — Asistencia Técnica Inmobiliaria

**Propósito:** Resolver problemas técnicos y documentales relacionados con la propiedad inmobiliaria, con foco inicial en certificados energéticos y segunda opinión técnica.

**ICP:** Propietarios de inmuebles que necesitan certeza técnica sobre su propiedad (compraventa, alquiler, herencia, reclamación).

**Productos:** 6 productos (1 activo V1, 4 planificados V2, 1 motor interno)

| Producto | Estado | Dependencia |
|----------|--------|-------------|
| ATI-01 Segunda Opinión | ✅ ACTIVO (V1) | Core V1, PITR™ |
| ATI-02 Segunda Opinión Express | 📋 PLANIFICADO (V2) | ATI-01 |
| ATI-03 Informe Técnico Energético | 📋 PLANIFICADO (V2) | ATI-01 |
| ATI-04 Check-Up Inmobiliario | 📋 PLANIFICADO (V2) | ATI-01 |
| ATI-05 PITR™ | ⚙️ MOTOR INTERNO | Core V1 |
| ATI-06 Observatorio Certilab | 📋 PLANIFICADO (V2) | ATI-01, TRV-01 |

### 3.3 Línea GTD — Gestión Técnica Documental

**Propósito:** Ayudar a propietarios a gestionar, organizar, custodiar y recuperar la documentación técnica y legal de sus inmuebles.

**ICP:** Propietarios que necesitan ordenar la documentación de su vivienda (herencias, ventas, rehabilitaciones, comunidad).

**Productos:** 4 productos (todos propuestos, pendientes de aprobación ADR)

| Producto | Estado | Dependencia |
|----------|--------|-------------|
| GTD-01 Informe de Situación | 📋 PLANIFICADO (PROPUESTO) | ADR-003, ADR-004 |
| GTD-02 Recopilación Documental | 📋 PLANIFICADO (PROPUESTO) | GTD-01 |
| GTD-03 Custodia Digital | 📋 PLANIFICADO (PROPUESTO) | GTD-01, GTD-02 |
| GTD-04 Due Diligence Técnica | 📋 PLANIFICADO (PROPUESTO) | GTD-01, GTD-02, GTD-03 |

### 3.4 Línea PLT — Plataforma

**Propósito:** Proporcionar la infraestructura digital sobre la que se ejecutan todos los productos de Certilab.

**ICP:** Arquitectos Técnicos (AT), equipo interno de Certilab.

**Productos:** 2 productos (ambos activos V1)

| Producto | Estado | Dependencia |
|----------|--------|-------------|
| PLT-01 Certilab Platform | ✅ ACTIVO (V1) | Core V1 |
| PLT-02 Certilab Backoffice | ✅ ACTIVO (V1) | Core V1 |

### 3.5 Línea TRV — Transversal

**Propósito:** Proporcionar servicios de conocimiento, información y presencia digital que soportan a todas las líneas de negocio.

**ICP:** Clientes potenciales (SEO/tráfico orgánico), clientes existentes (autoservicio), comunidad técnica.

**Productos:** 2 productos (ambos activos V1)

| Producto | Estado | Dependencia |
|----------|--------|-------------|
| TRV-01 Certilab Knowledge Base | ✅ ACTIVO (V1) | Core V1 |
| TRV-02 Certilab Web Pública | ✅ ACTIVO (V1) | TRV-01 |

---

## 4. Ficha Estándar de Producto

Todo producto del catálogo debe documentarse mediante esta ficha estándar. Los campos marcados con ★ son obligatorios.

### 4.1 Estructura de la ficha

```
┌─────────────────────────────────────────────────────────┐
│ [CÓDIGO] — [NOMBRE DEL PRODUCTO]                       │
│─────────────────────────────────────────────────────────│
│ ★ Código de producto    │ [XX-XX]                       │
│ ★ Nombre                │ [Nombre comercial]            │
│ ★ Línea de negocio      │ [ATI / GTD / PLT / TRV]      │
│ ★ Problema que resuelve │ [Descripción del problema]    │
│ ★ Cliente objetivo      │ [ICP al que se dirige]        │
│ ★ Propuesta de valor    │ [Valor único del producto]    │
│ ★ Entradas necesarias   │ [Qué necesita el cliente]     │
│ ★ Proceso operativo     │ [Cómo se produce/entrega]     │
│ ★ Entregables           │ [Qué recibe el cliente]       │
│   Automatización futura │ [Qué se puede automatizar]    │
│   Integración Platform  │ [Cómo se integra]             │
│   Dependencias          │ [De qué productos/core depende]│
│   Riesgos               │ [Riesgos identificados]       │
│   KPIs                  │ [Métricas de éxito]           │
│   Cross-selling         │ [Productos relacionados]       │
│   Up-selling            │ [Productos premium relacionados]│
│ ★ Estado del producto   │ [ACTIVO / PLANIFICADO / ...]  │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Campos detallados

| Campo | Descripción | ¿Obligatorio? |
|-------|-------------|---------------|
| **Código de producto** | Identificador único. Formato: `[LÍNEA]-[NN]`. Ej: `ATI-01`, `GTD-02`, `PLT-01`, `TRV-02`. | ★ Sí |
| **Nombre** | Nombre comercial del producto. Debe ser descriptivo y orientado al cliente. | ★ Sí |
| **Línea de negocio** | Línea a la que pertenece: ATI, GTD, PLT, TRV. | ★ Sí |
| **Problema que resuelve** | Descripción del problema real del cliente que este producto resuelve. | ★ Sí |
| **Cliente objetivo** | Perfil del cliente que consume este producto (ICP o sub-ICP). | ★ Sí |
| **Propuesta de valor** | Valor único que diferencia este producto de alternativas. | ★ Sí |
| **Entradas necesarias** | Qué necesita aportar el cliente para recibir el servicio. | ★ Sí |
| **Proceso operativo** | Descripción de cómo se produce y entrega el producto. | ★ Sí |
| **Entregables** | Qué recibe el cliente al finalizar el servicio. | ★ Sí |
| **Automatización futura** | Identificación de pasos del proceso que pueden automatizarse. | No |
| **Integración con Certilab Platform** | Cómo se integra este producto en la plataforma. | No |
| **Dependencias** | Productos, servicios o componentes de los que depende. | No |
| **Riesgos** | Riesgos identificados (técnicos, operativos, regulatorios). | No |
| **KPIs** | Métricas que miden el éxito del producto. | No |
| **Cross-selling** | Productos que pueden ofrecerse complementariamente. | No |
| **Up-selling** | Productos premium o versiones avanzadas. | No |
| **Estado del producto** | Estado actual: ACTIVO (V1), PLANIFICADO (V2), PLANIFICADO (PROPUESTO), MOTOR INTERNO, DESCONTINUADO. | ★ Sí |

---

## 5. Catálogo Oficial de Productos

El catálogo completo con las fichas de los 14 productos se encuentra en:

📄 [`docs/product/PA-001-CATALOG.md`](./PA-001-CATALOG.md)

### 5.1 Resumen del catálogo

| Código | Nombre | Línea | Estado |
|--------|--------|-------|--------|
| ATI-01 | Segunda Opinión | ATI | ✅ ACTIVO (V1) |
| ATI-02 | Segunda Opinión Express | ATI | 📋 PLANIFICADO (V2) |
| ATI-03 | Informe Técnico Energético | ATI | 📋 PLANIFICADO (V2) |
| ATI-04 | Check-Up Inmobiliario | ATI | 📋 PLANIFICADO (V2) |
| ATI-05 | PITR™ | ATI | ⚙️ MOTOR INTERNO |
| ATI-06 | Observatorio Certilab | ATI | 📋 PLANIFICADO (V2) |
| GTD-01 | Informe de Situación de la Vivienda | GTD | 📋 PLANIFICADO (PROPUESTO) |
| GTD-02 | Recopilación y Organización Documental | GTD | 📋 PLANIFICADO (PROPUESTO) |
| GTD-03 | Custodia y Conservación Digital | GTD | 📋 PLANIFICADO (PROPUESTO) |
| GTD-04 | Due Diligence Técnica Inmobiliaria | GTD | 📋 PLANIFICADO (PROPUESTO) |
| PLT-01 | Certilab Platform | PLT | ✅ ACTIVO (V1) |
| PLT-02 | Certilab Backoffice | PLT | ✅ ACTIVO (V1) |
| TRV-01 | Certilab Knowledge Base (CKB™) | TRV | ✅ ACTIVO (V1) |
| TRV-02 | Certilab Web Pública | TRV | ✅ ACTIVO (V1) |

---

## 6. Matriz de Priorización

### 6.1 Criterios de priorización

Cada producto se evalúa con una puntuación de 1 a 5 en cada criterio:

| Criterio | Peso | Descripción |
|----------|------|-------------|
| **Impacto en MVP** | 30% | ¿Aporta valor funcional directo al MVP actual? |
| **Valor estratégico** | 25% | ¿Alineación con la visión a largo plazo y la Constitución? |
| **Potencial de ingresos** | 20% | ¿Capacidad de generar ingresos recurrentes? |
| **Complejidad técnica** | 15% | ¿Es sencillo de implementar con el Core V1 existente? (a mayor complejidad, menor puntuación) |
| **Dependencias** | 10% | ¿Bloquea o desbloquea otros productos? (a más dependencias, mayor puntuación) |

### 6.2 Resultados de priorización

| Producto | Impacto MVP (30%) | Valor Estrat. (25%) | Ingresos (20%) | Complejidad (15%) | Dependencias (10%) | Total |
|----------|:-----------------:|:-------------------:|:--------------:|:-----------------:|:------------------:|:-----:|
| ATI-01 Segunda Opinión | 5 | 5 | 5 | 5 | 5 | **5.00** |
| PLT-01 Certilab Platform | 5 | 5 | 3 | 4 | 5 | **4.50** |
| TRV-02 Web Pública | 4 | 4 | 2 | 5 | 3 | **3.70** |
| ATI-05 PITR™ | 5 | 5 | 3 | 2 | 3 | **3.85** |
| PLT-02 Backoffice | 4 | 4 | 1 | 4 | 4 | **3.45** |
| TRV-01 CKB™ | 3 | 4 | 1 | 5 | 3 | **3.15** |
| ATI-02 Express | 3 | 3 | 4 | 3 | 3 | **3.15** |
| ATI-03 Inf. Técnico Energético | 2 | 4 | 3 | 3 | 2 | **2.80** |
| ATI-04 Check-Up | 2 | 4 | 3 | 2 | 2 | **2.65** |
| ATI-06 Observatorio | 1 | 3 | 1 | 3 | 2 | **1.85** |
| GTD-01 Inf. Situación | 1 | 4 | 3 | 2 | 1 | **2.25** |
| GTD-02 Recopilación | 1 | 4 | 3 | 1 | 1 | **2.05** |
| GTD-03 Custodia | 1 | 4 | 3 | 1 | 1 | **2.05** |
| GTD-04 Due Diligence | 1 | 3 | 2 | 1 | 1 | **1.65** |

### 6.3 Prioridad por fases

| Fase | Productos priorizados | Justificación |
|------|----------------------|---------------|
| **Fase 1 — Inmediata (V1)** | ATI-01, PLT-01, PLT-02, TRV-02, ATI-05 | Productos activos existentes. Base operativa. |
| **Fase 2 — V1.1** | ATI-02, TRV-01 | Extensiones de bajo riesgo sobre base existente. |
| **Fase 3 — V2** | ATI-03, ATI-04, ATI-06 | Expansión vertical de ATI. Nuevos servicios sobre PITR™. |
| **Fase 4 — V2+** | GTD-01, GTD-02, GTD-03, GTD-04 | Nueva línea de negocio (requiere ADR aprobada). |

---

## 7. Roadmap de Incorporación de Productos

### 7.1 Timeline

```
FASE 1: V1 (ACTUAL)
═══════════════════════════════════════════
  ATI-01 ● Segunda Opinión        → [ACTIVO]
  PLT-01 ● Certilab Platform      → [ACTIVO]
  PLT-02 ● Certilab Backoffice    → [ACTIVO]
  TRV-02 ● Web Pública            → [ACTIVO]
  ATI-05 ⚙ PITR™                  → [ACTIVO]
  TRV-01 ● CKB™                   → [ACTIVO]

FASE 2: V1.1 (PRÓXIMA)
═══════════════════════════════════════════
  ATI-02 ○ Segunda Opinión Express → [Prioridad alta]
  TRV-01 ○ CKB™ (mejora continua)  → [Prioridad media]

FASE 3: V2 (CORTO PLAZO)
═══════════════════════════════════════════
  ATI-03 ○ Informe Técnico Energético → [Tras ATI-02]
  ATI-04 ○ Check-Up Inmobiliario       → [Tras ATI-03]
  ATI-06 ○ Observatorio Certilab       → [Requiere masa crítica]

FASE 4: V2+ (MEDIO PLAZO)
═══════════════════════════════════════════
  GTD-01 ◇ Informe de Situación      → [Requiere ADR]
  GTD-02 ◇ Recopilación Documental   → [Tras GTD-01]
  GTD-03 ◇ Custodia Digital          → [Tras GTD-02]
  GTD-04 ◇ Due Diligence Técnica     → [Tras GTD-03]
```

### 7.2 Dependencias críticas entre fases

```
Fase 1 (V1) ─────────────────────────────────────────────┐
  ATI-01, PLT-01, PLT-02, TRV-02, ATI-05, TRV-01        │
     │                                                    │
     ▼                                                    │
Fase 2 (V1.1) ───────────────────────────────────────────┤
  ATI-02 ─── depende de ─── ATI-01 (mismo flujo)        │
  TRV-01 ─── mejora continua                             │
     │                                                    │
     ▼                                                    │
Fase 3 (V2) ─────────────────────────────────────────────┤
  ATI-03 ─── depende de ─── ATI-01 + PITR™              │
  ATI-04 ─── depende de ─── ATI-01 + ATI-03             │
  ATI-06 ─── depende de ─── masa crítica de datos       │
     │                                                    │
     ▼                                                    │
Fase 4 (V2+) ────────────────────────────────────────────┘
  GTD-01 ─── requiere ADR-003/004 aprobados
  GTD-02 ─── depende de ─── GTD-01
  GTD-03 ─── depende de ─── GTD-01 + GTD-02
  GTD-04 ─── depende de ─── GTD-01 + GTD-02 + GTD-03
```

### 7.3 Hitos del roadmap

| Hito | Fecha estimada | Productos | Criterio de activación |
|------|---------------|-----------|------------------------|
| **PA-001 Aprobado** | Q3 2026 | — | Aprobación del usuario |
| **V1 estabilizado** | Q3 2026 | ATI-01, PLT-01/02, TRV-02, ATI-05, TRV-01 | Catálogo aprobado |
| **V1.1** | Q4 2026 | ATI-02, TRV-01 mejorado | PRD aprobado para ATI-02 |
| **V2 ATI** | Q1 2027 | ATI-03, ATI-04 | ATI-02 operativo |
| **V2 ATI Observatorio** | Q2 2027 | ATI-06 | >500 expedientes completados |
| **V2+ GTD** | Q3 2027 | GTD-01 a GTD-04 | ADR-003 y ADR-004 aprobados |

---

## 8. Cadena de Trazabilidad

### 8.1 Principio

Ningún desarrollo futuro podrá comenzar sin recorrer la cadena de trazabilidad completa:

```
BUSINESS BLUEPRINT
  └── Define la estrategia empresarial
      ↓
PRODUCTO (Catálogo Oficial)
  └── Define el producto que ejecuta la estrategia
      ↓
PRD (Product Requirements Document)
  └── Define los requisitos funcionales del producto
      ↓
ÉPICA (Epic)
  └── Define el trabajo de desarrollo a realizar
      ↓
DESARROLLO (Implementation)
  └── Implementa la épica en la plataforma
      ↓
RELEASE (Release)
  └── Entrega el producto al usuario final
```

### 8.2 Reglas de trazabilidad

1. **No existe desarrollo sin épica.** Todo código implementado debe pertenecer a una épica registrada.
2. **No existe épica sin PRD.** Toda épica debe derivar de un PRD aprobado que describa el producto.
3. **No existe PRD sin producto.** Todo PRD debe referenciar un producto del Catálogo Oficial.
4. **No existe producto sin estrategia.** Todo producto debe derivar del Business Blueprint y estar alineado con la Constitución.

### 8.3 Identificadores de trazabilidad

Cada elemento de la cadena debe incluir referencias cruzadas:

```
BP-001 → Business Blueprint Plan
  ↓
PA-001 → Product Architecture (este documento)
  ↓
ATI-01 → Producto: Segunda Opinión
  ↓
PRD-ATI-01 → Product Requirements Document para Segunda Opinión
  ↓
EP-XXX → Épica de desarrollo
  ↓
Commit → Implementación en el repositorio
  ↓
Release vX.Y.Z → Entrega al usuario
```

### 8.4 Registro de trazabilidad

| Producto | PRD | Épicas | Release |
|----------|-----|--------|---------|
| ATI-01 | PRD-ATI-01 (pendiente) | EP-026 a EP-033 | v1.0.0-rc1 |
| ATI-02 | PRD-ATI-02 (pendiente) | — | — |
| ATI-03 | PRD-ATI-03 (pendiente) | — | — |
| ATI-04 | PRD-ATI-04 (pendiente) | — | — |
| ATI-05 | PRD-ATI-05 (pendiente) | EP-031 | v1.0.0-rc1 |
| ATI-06 | PRD-ATI-06 (pendiente) | — | — |
| GTD-01 | PRD-GTD-01 (pendiente) | — | — |
| GTD-02 | PRD-GTD-02 (pendiente) | — | — |
| GTD-03 | PRD-GTD-03 (pendiente) | — | — |
| GTD-04 | PRD-GTD-04 (pendiente) | — | — |
| PLT-01 | PRD-PLT-01 (pendiente) | Múltiples | v1.0.0-rc1 |
| PLT-02 | PRD-PLT-02 (pendiente) | Múltiples | v1.0.0-rc1 |
| TRV-01 | PRD-TRV-01 (pendiente) | EP-033 | v1.0.0-rc1 |
| TRV-02 | PRD-TRV-02 (pendiente) | Múltiples | v1.0.0-rc1 |

---

## 9. Criterios de Validación para Nuevos Productos

El proceso completo de validación de nuevos productos se define en:

📄 [`docs/product/PA-001-PRODUCT-VALIDATION-CRITERIA.md`](./PA-001-PRODUCT-VALIDATION-CRITERIA.md)

### 9.1 Resumen del proceso

Todo nuevo producto debe pasar por 5 Gates de validación:

1. **Gate 1 — Strategic Fit**: ¿Está alineado con la Constitución? ¿Respeta CF-001A? ¿Encaja en ATI, GTD o una línea futura aprobada?
2. **Gate 2 — Business Case**: ¿Problema definido? ¿Mercado cuantificable? ¿Modelo de ingresos viable?
3. **Gate 3 — Technical Feasibility**: ¿Se puede construir con el Core V1 existente? ¿Composición vs. creación?
4. **Gate 4 — Prioritization**: ¿Puntuación suficiente en la matriz de priorización?
5. **Gate 5 — Approval**: ¿Aprobado por las autoridades correspondientes (CEO, CTO, Architecture Council)?

### 9.2 Regla de mínima expansión

Antes de crear un nuevo producto, debe demostrarse que la funcionalidad no puede resolverse mediante:

1. **Reutilización** — usar un producto existente sin modificaciones.
2. **Composición** — combinar productos existentes.
3. **Extensión controlada** — añadir capacidad mínima a un producto existente.

La creación de nuevos productos es siempre la **última alternativa**.

---

## 10. Anexos

### A. Documentos relacionados

| Documento | Relación |
|-----------|----------|
| CF-000 — Constitución | Principios rectores del proyecto |
| CF-001A — Acta de Cierre de Arquitectura V1 | Restricciones arquitectónicas |
| BP-900 — Cierre Business Blueprint | Estrategia empresarial de entrada |
| PA-001-CATALOG.md | Catálogo Oficial de Productos |
| PA-001-PRODUCT-VALIDATION-CRITERIA.md | Criterios de validación de nuevos productos |
| PA-900 — Informe de Cierre | Cierre de PRODUCT-ARCHITECTURE-001 |
| ADR-003 — GTD como línea de negocio | Propuesta de nueva línea |
| ADR-004 — Extensión Documento IA para GTD | Propuesta técnica asociada |

### B. Historial de revisiones

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 2026-07-06 | PA-001 | Creación inicial del documento |

---

*Fin del documento PA-001-PRODUCT-ARCHITECTURE.md*