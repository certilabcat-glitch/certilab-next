# MATRIZ-TRAZABILIDAD-CAPA1 — Matriz de Trazabilidad de la Capa 1 PRD-001 (ATI03)

| Campo | Valor |
|-------|-------|
| **Código** | MATRIZ-TRAZABILIDAD-CAPA1 |
| **Título** | Matriz de Trazabilidad de la Capa 1 del PRD-001 (ATI03) |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-07 |
| **Estado** | ✅ APROBADO |
| **Alcance** | RF-002, RF-003, RF-004, RF-005 (futuro) |
| **Propósito** | Documentar el flujo de información entre los requisitos funcionales de la Capa 1, identificar dependencias, entradas y salidas de cada RF, y servir como referencia para la implementación secuencial. |

---

## Índice

1. [Arquitectura de la Capa 1](#1-arquitectura-de-la-capa-1)
2. [Diagrama de flujo de información](#2-diagrama-de-flujo-de-información)
3. [Fichas de requisitos](#3-fichas-de-requisitos)
4. [Matriz de dependencias](#4-matriz-de-dependencias)
5. [Matriz de datos compartidos](#5-matriz-de-datos-compartidos)
6. [Secuencia de implementación recomendada](#6-secuencia-de-implementación-recomendada)
7. [Riesgos de integración](#7-riesgos-de-integración)

---

## 1. Arquitectura de la Capa 1

### 1.1 Vista general

La Capa 1 del PRD-001 (ATI03) está compuesta por cuatro requisitos funcionales que operan sobre los datos brutos de la inspección PITR™ para generar el producto entregable al cliente.

**Nota sobre RF-001:** En el PRD-001, RF-001 es el *Documento Visual de Decisiones* (formato de entrega). Queda fuera del alcance de esta matriz, que se centra en el flujo de información entre los RFs de la Capa 1 (RF-002 a RF-005).

```
                    ┌──────────────────────────────────────────────────────────────┐
                    │                    CAPA 1 — PRD-001 (ATI03)                   │
                    │                                                              │
                    │  RF-001 (Documento Visual de Decisiones)                      │
                    │  Define el formato de entrega del producto.                   │
                    │  Proporciona la estructura visual que consume los datos       │
                    │  generados por RF-002, RF-003, RF-004 y RF-005.               │
                    └──────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
                    ┌──────────────────────────────────────────────────────────────┐
                    │  RF-002: Nivel de Confianza del Diagnóstico                   │
                    │  Evalúa la fiabilidad de los datos del inmueble               │
                    │  Salida: Confianza Global + Confianza por Módulo              │
                    └──────────────────┬───────────────────────────────────────────┘
                                       │
                    ┌──────────────────┴───────────────────────────────────────────┐
                    │                                                              │
                    ▼                                                              ▼
┌──────────────────────────────────────┐              ┌──────────────────────────────────────┐
│  RF-003: Sistema de Apoyo a la        │              │  RF-004: Beneficios Esperados         │
│  Priorización                         │              │  de las Actuaciones                   │
│                                       │              │                                      │
│  Entrada: Datos inmueble + RF-002     │              │  Entrada: Datos inmueble + RF-002     │
│  Salida: Orden Recomendado con        │              │  Salida: Estimaciones con Confianza   │
│  Justification Log                    │              │  de la Estimación                     │
└──────────────────┬───────────────────┘              └──────────────────┬───────────────────┘
                   │                                                     │
                   └──────────────────────┬──────────────────────────────┘
                                          ▼
                    ┌──────────────────────────────────────────────────────────────┐
                    │  RF-005 (futuro): Inversión y Retorno (ROI)                  │
                    │  Calcula el retorno de inversión por actuación.              │
                    │  Salida: inversión estimada, ahorro anual, retorno simple,   │
                    │  clasificación (Merece la pena / Valóralo / No recomendado). │
                    └──────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
                    ┌──────────────────────────────────────────────────────────────┐
                    │  RF-001 (Documento Visual de Decisiones)                      │
                    │  Ensambla todas las salidas de RF-002, RF-003, RF-004 y      │
                    │  RF-005 en el formato de entrega al cliente.                  │
                    └──────────────────────────────────────────────────────────────┘
```

### 1.2 Principios de la arquitectura

1. **RF-001 es la base** — Todos los RFs de la Capa 1 dependen de los datos del inmueble. Sin RF-001 no hay diagnóstico.
2. **RF-002 es transversal** — El nivel de confianza contextualiza tanto la priorización (RF-003) como las estimaciones (RF-004).
3. **RF-003 y RF-004 son independientes entre sí** — No existe dependencia directa entre ellos. Ambos consumen de RF-001 y RF-002.
4. **RF-005 es el integrador** — Consolida las salidas de RF-002, RF-003 y RF-004 en el documento final.

---

## 2. Diagrama de flujo de información

### 2.1 Flujo detallado de datos

```
PITR™ (Inspección)
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  RF-001: Datos del Inmueble                                         │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ • Datos geométricos (superficies, alturas)                      ││
│  │ • Datos de cerramientos (composición, transmitancia)            ││
│  │ • Datos de instalaciones (caldera, ACS, climatización)          ││
│  │ • Datos de confort (temperatura, humedad, corrientes)           ││
│  │ • Documentación disponible (proyecto, ITE, certificados)        ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
    │
    ├──────────────────────────────────────────────┐
    ▼                                              ▼
┌──────────────────────────┐              ┌──────────────────────────┐
│  RF-002: Factores de     │              │  (Datos adicionales)     │
│  confianza               │              │                          │
│  • Acceso al inmueble    │              │  Los datos de RF-001     │
│  • Condiciones medición  │              │  se usan directamente    │
│  • Antigüedad datos      │              │  en RF-003 y RF-004      │
│  • Documentación disp.   │              │  junto con la confianza  │
│  • Precisión equipos     │              │  de RF-002.              │
│  • Cobertura inspección  │              │                          │
└──────────┬───────────────┘              └──────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────────────────┐
│  RF-002: Salidas                                                     │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │ • Nivel de Confianza Global: 🟢 Alta / 🟡 Media / 🔴 Baja       ││
│  │ • Nivel de Confianza por Módulo:                                 ││
│  │   - Geométricos: 🟢 Alta / 🟡 Media / 🔴 Baja                   ││
│  │   - Cerramientos: 🟢 Alta / 🟡 Media / 🔴 Baja                  ││
│  │   - Instalaciones: 🟢 Alta / 🟡 Media / 🔴 Baja                 ││
│  │   - Confort: 🟢 Alta / 🟡 Media / 🔴 Baja                       ││
│  │ • Justification Log (si AT sobrescribe)                          ││
│  └──────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
    │
    ├──────────────────────────────────────────────────┐
    │                                                  │
    ▼                                                  ▼
┌──────────────────────────────┐    ┌──────────────────────────────┐
│  RF-003: Entradas             │    │  RF-004: Entradas             │
│  ┌──────────────────────────┐│    │  ┌──────────────────────────┐│
│  │ De RF-001:               ││    │  │ De RF-001:               ││
│  │ • Datos del inmueble     ││    │  │ • Datos del inmueble     ││
│  │ • Lista de problemas     ││    │  │ • Características        ││
│  │ • Valoraciones AT 1-10   ││    │  │   técnicas del inmueble  ││
│  │                         ││    │  │                         ││
│  │ De RF-002:               ││    │  │ De RF-002:               ││
│  │ • Confianza Global       ││    │  │ • Confianza por Módulo   ││
│  │ • Confianza por Módulo   ││    │  │ • Confianza Global       ││
│  │                         ││    │  │                         ││
│  │ Otros:                   ││    │  │ Otros:                   ││
│  │ • Perfil del Cliente     ││    │  │ • (Ninguno adicional)    ││
│  │ • Ponderación Metodol.   ││    │  └──────────────────────────┘│
│  └──────────────────────────┘│    └──────────────────────────────┘
└──────────────┬───────────────┘    └──────────────┬───────────────┘
               │                                    │
               ▼                                    ▼
┌──────────────────────────────┐    ┌──────────────────────────────┐
│  RF-003: Salidas              │    │  RF-004: Salidas              │
│  ┌──────────────────────────┐│    │  ┌──────────────────────────┐│
│  │ • Orden Recomendado con  ││    │  │ Por cada actuación:      ││
│  │   niveles 🔴🟡🟢          ││    │  │ • Ahorro energético     ││
│  │ • Puntuación Compuesta   ││    │  │   (kWh/año y €/año)     ││
│  │   por actuación          ││    │  │ • Mejora calificación   ││
│  │ • Desglose por criterio  ││    │  │ • Impacto en confort    ││
│  │ • Justification Log      ││    │  │ • Inversión estimada    ││
│  │   (si AT modificó)       ││    │  │ • Plazo amortización    ││
│  │ • Actuaciones filtradas  ││    │  │ • Confianza de la       ││
│  │   por umbral             ││    │  │   Estimación (de RF-002)││
│  └──────────────────────────┘│    │  • Rango estimado (mín,   ││
│                              │    │    máximo, esperado)      ││
│                              │    └──────────────────────────┘│
└──────────────────────────────┘    └──────────────────────────────┘
    │                                    │
    └──────────────────┬─────────────────┘
                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│  RF-005 (futuro): Inversión y Retorno (ROI)                         │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │ Integra:                                                         ││
│  │ • De RF-002: Sección de Confianza (Global + por Módulo)         ││
│  │ • De RF-003: Jerarquía Priorizada con explicaciones             ││
│  │ • De RF-004: Beneficios Esperados con Confianza de la Estimación││
│  │                                                                ││
│  │ Genera:                                                          ││
│  │ • Documento entregable al cliente (ATI03)                        ││
│  │ • Anexo técnico para el AT                                       ││
│  └──────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
```

### 2.2 Flujo resumido (visión ejecutiva)

```
RF-001 ──────────────────────────────────────────────────────────────────┐
    │  Datos del inmueble                                                 │
    ▼                                                                     ▼
RF-002 ───────────────►  RF-003 ───► Orden Recomendado ───┐               │
(Nivel de Confianza)    RF-004 ───► Beneficios Esperados ─┤               │
    │                                                      ├──► RF-005 ───┘
    └──────────────────►  Confianza contextualiza ────────┘   (Inversión
                                                                y Retorno)
```

---

## 3. Fichas de requisitos

### 3.1 RF-002 — Nivel de Confianza del Diagnóstico

| Propiedad | Valor |
|-----------|-------|
| **Código** | RF-002 |
| **Nombre corto** | Nivel de Confianza |
| **Documento** | `docs/analysis/RF-002-NIVEL-DE-CONFIANZA.md` |
| **Estado** | ✅ APROBADO |
| **Depende de** | RF-001 (datos del inmueble), PITR™ |
| **Es dependencia de** | RF-003, RF-004, RF-005 |
| **Entradas** | Factores de confianza de la inspección (acceso, condiciones, equipos, etc.) |
| **Salidas** | Confianza Global (🟢/🟡/🔴), Confianza por Módulo, Justification Log |
| **Rol en la capa** | Capa de validación transversal — contextualiza la fiabilidad de toda la información |

**Datos que produce y consume:**

| Dato | Produce | Consumido por |
|------|---------|---------------|
| Confianza Global (🟢/🟡/🔴) | ✅ | RF-003, RF-004, RF-005 |
| Confianza por Módulo (4 categorías) | ✅ | RF-003, RF-004, RF-005 |
| Justification Log (si aplica) | ✅ | RF-005 |

**Reglas de negocio que exporta:**
- RN-RF002-001: Toda inspección debe tener confianza global asignada
- RN-RF002-003: Acceso parcial (<70%) → confianza no puede ser Alta
- RN-RF002-004: Equipos no calibrados → confianza automáticamente Baja
- RN-RF002-005: Confianza por módulo alimenta "Confianza de la Estimación" en RF-004
- RN-RF002-007: AT puede sobrescribir con justificación

---

### 3.2 RF-003 — Sistema de Apoyo a la Priorización

| Propiedad | Valor |
|-----------|-------|
| **Código** | RF-003 |
| **Nombre corto** | Priorización |
| **Documento** | `docs/analysis/RF-003-JERARQUIA-DE-DECISIONES.md` |
| **Estado** | ✅ APROBADO PARA PRD-001 V2 |
| **Depende de** | RF-001, RF-002, PITR™ |
| **Es dependencia de** | RF-005 |
| **Entradas** | Datos del inmueble (RF-001), Nivel de Confianza (RF-002), valoraciones AT 1-10, perfil del cliente, ponderación metodológica |
| **Salidas** | Orden Recomendado (🔴🟡🟢), puntuación compuesta, desglose por criterio, Justification Log, actuaciones filtradas |
| **Rol en la capa** | Capa de decisión — transforma problemas en un plan priorizado |

**Datos que produce y consume:**

| Dato | Produce | Consumido por |
|------|---------|---------------|
| Orden Recomendado con niveles 🔴🟡🟢 | ✅ | RF-005 |
| Puntuación Compuesta por actuación | ✅ | RF-005 (anexo técnico) |
| Desglose por criterio (7 criterios) | ✅ | RF-005 (anexo técnico) |
| Justification Log (si AT modificó) | ✅ | RF-005 |
| Actuaciones filtradas por umbral | ✅ | RF-005 (anexo técnico) |
| Explicaciones por nivel (plantillas) | ✅ | RF-005 |

**Reglas de negocio que exporta:**
- RN-RF003-001: Prioridad no puede determinarse solo por ahorro energético
- RN-RF003-002: Seguridad ≥ 7 → siempre Prioritaria
- RN-RF003-003: Incumplimiento normativo ≥ 8 → siempre Prioritaria
- RN-RF003-004: AT puede modificar el orden + Justification Log

---

### 3.3 RF-004 — Beneficios Esperados de las Actuaciones

| Propiedad | Valor |
|-----------|-------|
| **Código** | RF-004 |
| **Nombre corto** | Beneficios Esperados |
| **Documento** | `docs/analysis/RF-004-IMPACTO-DE-ACTUACIONES.md` |
| **Estado** | ✅ APROBADO |
| **Depende de** | RF-001, RF-002 |
| **Es dependencia de** | RF-005 |
| **Entradas** | Datos del inmueble (RF-001), Nivel de Confianza por Módulo (RF-002) |
| **Salidas** | Por cada actuación: ahorro energético, mejora calificación, impacto confort, inversión, amortización, confianza de la estimación, rango estimado |
| **Rol en la capa** | Capa de cuantificación — traduce cada actuación en beneficios concretos y medibles |

**Datos que produce y consume:**

| Dato | Produce | Consumido por |
|------|---------|---------------|
| Ahorro energético (kWh/año + €/año) | ✅ | RF-005 |
| Mejora de calificación energética | ✅ | RF-005 |
| Impacto en confort | ✅ | RF-005 |
| Inversión estimada | ✅ | RF-005 |
| Plazo de amortización | ✅ | RF-005 |
| Confianza de la Estimación (🟢/🟡/🔴) | ✅ | RF-005 |
| Rango estimado (mín, máximo, esperado) | ✅ | RF-005 |

**Reglas de negocio que exporta:**
- Las estimaciones incorporan la Confianza por Módulo de RF-002
- Toda estimación se expresa como rango, no como valor único

---

### 3.4 RF-005 — Inversión y Retorno (Análisis conceptual)

| Propiedad | Valor |
|-----------|-------|
| **Código** | RF-005 |
| **Nombre corto** | Inversión y Retorno |
| **Documento** | `docs/analysis/RF-005-INVERSION-RETORNO.md` |
| **Estado** | 🔵 EN ANÁLISIS — Pendiente de aprobación para integrar en PRD |
| **Depende de** | RF-001, RF-002, RF-003, RF-004 |
| **Es dependencia de** | (Ninguno — es el final de la Capa 1) |
| **Entradas** | Ahorro anual estimado (RF-004), tipo de actuación (RF-004), costes de referencia, tablas de vida útil |
| **Salidas** | Por actuación: inversión estimada (horquilla), retorno simple (años), vida útil, veredicto (✅ Merece la pena / 🟡 Valóralo / ❌ No recomendado), beneficio neto estimado |
| **Rol en la capa** | Capa de decisión de inversión — evalúa si cada actuación merece la pena económicamente |

**Datos que consume:**

| Dato | Origen |
|------|--------|
| Confianza Global y por Módulo | RF-002 |
| Orden Recomendado con niveles | RF-003 |
| Explicaciones por nivel | RF-003 |
| Puntuación Compuesta (anexo) | RF-003 |
| Beneficios Esperados por actuación | RF-004 |
| Confianza de la Estimación | RF-004 (derivado de RF-002) |
| Justification Log | RF-002 / RF-003 |

---

## 4. Matriz de dependencias

### 4.1 Matriz de dependencias funcionales

| RF \ Depende de → | RF-001 | RF-002 | RF-003 | RF-004 | RF-005 | PITR™ |
|:------------------:|:------:|:------:|:------:|:------:|:------:|:-----:|
| **RF-002** | ✅ | — | ❌ | ❌ | ❌ | ✅ |
| **RF-003** | ✅ | ✅ | — | ❌ | ❌ | ✅ |
| **RF-004** | ✅ | ✅ | ❌ | — | ❌ | ✅ |
| **RF-005** | ✅ | ✅ | ✅ | ✅ | — | ❌ |

### 4.2 Matriz de dependencias de datos

| Dato \ Producido por → | RF-002 | RF-003 | RF-004 |
|:-----------------------:|:------:|:------:|:------:|
| **Consumido por RF-003** | ✅ | — | ❌ |
| **Consumido por RF-004** | ✅ | ❌ | — |
| **Consumido por RF-005** | ✅ | ✅ | ✅ |

**Interpretación:**
- RF-003 y RF-004 son **independientes entre sí** (no se consumen mutuamente)
- RF-002 es el **único RF que es consumido por dos RFs hermanos** (RF-003 y RF-004)
- RF-005 es el **único consumidor de todos los RFs anteriores**

---

## 5. Matriz de datos compartidos

### 5.1 Datos que fluyen entre RFs

| Dato | Origen | Destino(s) | Tipo | Obligatorio |
|------|--------|------------|------|:-----------:|
| Confianza Global (🟢/🟡/🔴) | RF-002 | RF-003, RF-004, RF-005 | Enumerado | ✅ |
| Confianza por Módulo (4× 🟢/🟡/🔴) | RF-002 | RF-003, RF-004, RF-005 | Array | ✅ |
| Justification Log (confianza) | RF-002 | RF-005 | Objeto | ⚠️ (solo si AT sobrescribe) |
| Orden Recomendado (🔴🟡🟢) | RF-003 | RF-005 | Array | ✅ |
| Puntuación Compuesta | RF-003 | RF-005 | Número | ✅ |
| Desglose por criterio | RF-003 | RF-005 (anexo) | Objeto | ✅ |
| Justification Log (prioridad) | RF-003 | RF-005 | Objeto | ⚠️ (solo si AT modifica) |
| Explicaciones por nivel | RF-003 | RF-005 | Texto | ✅ |
| Ahorro energético | RF-004 | RF-005 | Número (rango) | ✅ |
| Mejora calificación | RF-004 | RF-005 | Texto | ✅ |
| Impacto en confort | RF-004 | RF-005 | Texto | ✅ |
| Inversión estimada | RF-004 | RF-005 | Número (rango) | ✅ |
| Plazo amortización | RF-004 | RF-005 | Número (rango) | ✅ |
| Confianza de la Estimación | RF-004 | RF-005 | Enumerado | ✅ |
| Rango estimado (min/max/esp) | RF-004 | RF-005 | Objeto | ✅ |

### 5.2 Datos que NO fluyen entre RFs de la Capa 1

| Dato | Descripción | Motivo |
|------|-------------|--------|
| Perfil del Cliente | Solo usado por RF-003 | No es relevante para RF-002 ni RF-004 |
| Ponderación Metodológica | Solo usada por RF-003 | Es interna del modelo de priorización |
| Valoraciones AT 1-7 | Solo usadas por RF-003 | Son la entrada específica del modelo multicriterio |
| Factores de confianza brutos | Solo usados por RF-002 | Se transforman en el nivel de confianza; no se exportan |
| Datos geométricos brutos | Originados en RF-001 | Usados por RF-002, RF-003, RF-004 según necesidad |

---

## 6. Secuencia de implementación recomendada

### 6.1 Orden de implementación

```
Paso 1: RF-002 (Nivel de Confianza)
        ↓
Paso 2: RF-003 (Priorización)   ← Pueden implementarse en paralelo
Paso 2: RF-004 (Beneficios)     ← Pueden implementarse en paralelo
        ↓
Paso 3: RF-005 (Inversión y Retorno)
```

### 6.2 Justificación del orden

1. **RF-002 primero** — Es el requisito más simple y el del que dependen los otros dos. Establece la infraestructura de confianza que RF-003 y RF-004 necesitan.
2. **RF-003 y RF-004 en paralelo** — No tienen dependencias entre sí. Pueden implementarse simultáneamente por equipos diferentes o en iteraciones separadas.
3. **RF-005 al final** — Requiere las salidas de los tres RFs anteriores. Es el integrador natural.

### 6.3 Hitos de la Capa 1

| Hito | RFs involucrados | Criterio de éxito |
|------|-------------------|-------------------|
| **H1: Base de confianza** | RF-002 | El AT puede asignar nivel de confianza y este se muestra en el expediente |
| **H2a: Priorización operativa** | RF-003 | El sistema genera un orden recomendado y el AT puede modificarlo con justificación |
| **H2b: Beneficios calculados** | RF-004 | El sistema calcula beneficios esperados por actuación con confianza asociada |
| **H3: Documento integrado** | RF-005 | El cliente puede descargar el ATI03 completo con confianza, priorización y beneficios |

---

## 7. Riesgos de integración

### 7.1 Riesgos identificados

| ID | Riesgo | RFs afectados | Probabilidad | Impacto | Mitigación |
|----|--------|:-------------:|:------------:|:-------:|------------|
| R1 | Cambios en RF-001 (datos del inmueble) afectan a toda la capa | RF-002, RF-003, RF-004, RF-005 | Baja | Alto | RF-001 está estabilizado en el Core V1. Cualquier cambio requeriría ADR. |
| R2 | Desajuste entre los módulos de confianza de RF-002 y las categorías de datos que necesita RF-004 | RF-002, RF-004 | Media | Medio | Validar durante la implementación que las 4 categorías de RF-002 cubren todas las necesidades de RF-004. |
| R3 | El Justification Log tiene formatos distintos en RF-002 y RF-003 | RF-002, RF-003, RF-005 | Media | Bajo | Unificar el formato del Justification Log como estructura de datos común antes de implementar RF-005. |
| R4 | La ponderación metodológica de RF-003 evoluciona y afecta al orden recomendado sin que RF-004 lo refleje | RF-003, RF-004, RF-005 | Baja | Medio | RF-004 no depende de RF-003, por lo que cambios en la ponderación no afectan a los beneficios calculados. Riesgo controlado. |
| R5 | RF-005 requiere datos de RF-003 y RF-004 que aún no están disponibles en el expediente | RF-005 | Alta | Alto | Definir el contrato de datos de RF-005 durante la implementación de RF-003 y RF-004 para garantizar que producen lo necesario. |

### 7.2 Recomendaciones para RF-005

1. **Definir el contrato de datos de RF-005 antes de completar RF-003 y RF-004** para que ambos produzcan exactamente lo que el integrador necesita.
2. **Unificar el Justification Log** como estructura compartida entre RF-002 y RF-003 antes de llegar a RF-005.
3. **Validar la cobertura de módulos** de RF-002 contra las necesidades de RF-004 durante la implementación de ambos.

---

## Histórico de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 1.0 | 2026-07-07 | Sistema | Versión inicial. Creación de la matriz de trazabilidad de la Capa 1. Mapeo completo de dependencias, flujos de datos y secuencia de implementación entre RF-002, RF-003, RF-004 y RF-005. |
| 1.1 | 2026-07-08 | Sesión RF-005 | Actualización: RF-005 completado. Se añade referencia al documento de análisis RF-005-INVERSION-RETORNO.md y se actualiza el estado del hito H3. |

---

*Fin del documento MATRIZ-TRAZABILIDAD-CAPA1.md*