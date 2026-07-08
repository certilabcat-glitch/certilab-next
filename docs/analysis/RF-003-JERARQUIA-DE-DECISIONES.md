# RF-003: Sistema de Apoyo a la Priorización — Análisis conceptual

| Campo | Valor |
|-------|-------|
| **Código** | RF-003 (dentro de PRD-001) |
| **Título** | Sistema de Apoyo a la Priorización |
| **Versión** | 2.0 (Aprobado conceptualmente — listo para PRD) |
| **Fecha** | 2026-07-07 |
| **Estado** | ✅ APROBADO PARA PRD-001 V2 |
| **Dependencia funcional** | RF-002 (Nivel de confianza del diagnóstico) |
| **Dependencia técnica** | RF-001 (Información del inmueble), PITR™, AT |
| **Propósito** | Definir el sistema de apoyo que asiste al Arquitecto Técnico en la construcción de una priorización recomendada, basada en criterios técnicos multicriterio, manteniendo siempre la decisión final en el AT |

---

## Índice

1. [¿Qué problema del cliente resuelve realmente RF-003?](#1-qué-problema-del-cliente-resuelve-realmente-rf-003)
2. [¿Cómo genera el sistema un orden recomendado?](#2-cómo-genera-el-sistema-un-orden-recomendado)
3. [Criterios de decisión documentados](#3-criterios-de-decisión-documentados)
4. [El AT como decisor final](#4-el-at-como-decisor-final)
5. [¿Qué ocurre si dos problemas tienen la misma importancia?](#5-qué-ocurre-si-dos-problemas-tienen-la-misma-importancia)
6. [¿Cómo evita recomendar actuaciones que no aportan valor suficiente?](#6-cómo-evita-recomendar-actuaciones-que-no-aportan-valor-suficiente)
7. [¿Puede la plataforma ayudar a explicar al cliente por qué una actuación aparece antes que otra?](#7-puede-la-plataforma-ayudar-a-explicar-al-cliente-por-qué-una-actuación-aparece-antes-que-otra)
8. [¿Cómo ayuda esta jerarquía a tomar una decisión mejor?](#8-cómo-ayuda-esta-jerarquía-a-tomar-una-decisión-mejor)
9. [¿Existe una forma más simple de conseguir el mismo resultado?](#9-existe-una-forma-más-simple-de-conseguir-el-mismo-resultado)
10. [Validación contra P1-P4](#10-validación-contra-p1-p4)
11. [Casos de uso, casos límite y criterios de aceptación](#11-casos-de-uso-casos-límite-y-criterios-de-aceptación)
12. [Definición formal de RF-003](#12-definición-formal-de-rf-003)
13. [Preguntas abiertas resueltas](#13-preguntas-abiertas-resueltas)
14. [Convención de lenguaje transversal](#14-convención-de-lenguaje-transversal)

---

## 1. ¿Qué problema del cliente resuelve realmente RF-003?

### 1.1 El problema real

El cliente no tiene **un** problema. Tiene una lista de problemas sin orden, sin urgencia relativa y sin contexto económico.

**Sin RF-003, el cliente recibe:**

- Una lista de defectos térmicos, de instalaciones, de cerramientos
- Cada uno explicado técnicamente
- Sin criterio para decidir por dónde empezar

**El resultado es la parálisis:**

> "Tengo que aislar la fachada, cambiar la caldera, poner doble acristalamiento y revisar el suelo. Son 30.000€. No sé por dónde empezar. No hago nada."

### 1.2 El dolor emocional

| Emoción | Causa |
|---------|-------|
| **Abrumo** | Demasiadas cosas que hacer, sin orden |
| **Desconfianza** | "¿Me están recomendando esto porque es necesario o porque ganan dinero?" |
| **Parálisis** | Incapacidad de priorizar → inacción |
| **Miedo al error** | "¿Y si hago primero lo menos importante y me arruino?" |
| **Frustración** | "He pagado por un diagnóstico y sigo sin saber qué hacer." |

### 1.3 Lo que el cliente realmente necesita

El cliente necesita **una respuesta a una sola pregunta**:

> **"¿Qué hago primero, qué hago después, y qué puedo dejar para más adelante?"**

No necesita más información. Necesita **orden**.

### 1.4 El rol del Arquitecto Técnico en esta respuesta

La plataforma no responde esta pregunta directamente. **Ayuda al AT a responderla.** El AT conoce al cliente, conoce el inmueble, conoce el contexto. La plataforma le proporciona un orden recomendado basado en criterios técnicos objetivos. El AT lo revisa, lo ajusta si es necesario, lo justifica y se lo entrega al cliente.

Esta distinción es fundamental: **el producto no sustituye el criterio profesional. Lo potencia.**

---

## 2. ¿Cómo genera el sistema un orden recomendado?

### 2.1 El mecanismo: Evaluación multicriterio

El AT identifica N problemas durante la inspección PITR™. Para cada problema, el AT asigna una valoración en cada uno de los criterios definidos (ver sección 3). La plataforma calcula una **puntuación compuesta** que produce un **orden recomendado**.

```
Lista plana de problemas                     Orden recomendado por la plataforma
┌─────────────────────┐                      ┌─────────────────────┐
│ Fachada sin aislar  │                      │ 1. Caldera          │
│ Caldera antigua     │     Evaluación       │    ↓                │
│ Ventanas simples    │  ─────────────────►  │ 2. Fachada          │
│ Suelo sin aislam.   │     multicriterio    │    ↓                │
│ ACS ineficiente     │                      │ 3. Ventanas         │
│ Puertas con fisuras │                      │    ↓                │
└─────────────────────┘                      │ 4. Suelo            │
                                              └─────────────────────┘
```

**Importante:** Este orden es **recomendado**. El AT puede aceptarlo, modificarlo o establecer un orden completamente diferente. Cualquier cambio debe quedar registrado con su justificación (ver sección 4).

### 2.2 El cálculo de la puntuación compuesta

La plataforma utiliza una función de puntuación basada en los valores que el AT asigna a cada criterio:

```
Puntuación_actuación = Σ (valor_i × peso_i)
```

Donde:

- `valor_i` es la valoración 1-10 que el AT asigna a cada criterio durante PITR™
- `peso_i` es el peso de cada criterio, definido en la **metodología interna** del sistema (no en el PRD)

**Los pesos no forman parte de este documento.** Se definen como parte de la metodología interna de la plataforma y pueden evolucionar con la experiencia acumulada sin necesidad de modificar el PRD. La sección 3 documenta los criterios, su sentido de influencia y las reglas que los gobiernan, pero no sus valores numéricos fijos.

### 2.3 La generación del orden recomendado

Una vez calculada la puntuación compuesta, el sistema sugiere una clasificación en 3 niveles:

| Nivel | Lenguaje cliente | Significado |
|-------|------------------|-------------|
| **🔴 Prioritaria** | "Actúa ya" | Riesgo, incumplimiento o pérdida significativa. No esperar. |
| **🟡 Recomendada** | "Planifica" | Merece la pena, pero se puede programar en los próximos meses. |
| **🟢 Opcional** | "Valóralo cuando reformes" | Mejora positiva pero no urgente ni rentable a corto plazo. |

Cada nivel incluye:

- **El desglose por criterio** (en anexo técnico para el AT)
- **La explicación para el cliente** (redactada por el AT con apoyo de plantillas)
- **El siguiente paso recomendado**

---

## 3. Criterios de decisión documentados

### 3.1 Los 7 criterios de evaluación

Cada actuación se evalúa en 7 dimensiones. El AT asigna un valor 1-10 para cada criterio basándose en su juicio profesional durante la inspección PITR™.

| # | Criterio | ¿Qué mide? | Sentido de influencia |
|---|----------|------------|-----------------------|
| 1 | **Seguridad** | Riesgo físico para personas (instalación defectuosa, riesgo de incendio, CO, etc.) | A mayor riesgo, mayor prioridad |
| 2 | **Cumplimiento normativo** | Grado de incumplimiento de la normativa vigente (CTE, EPBD, ordenanzas) | A mayor incumplimiento, mayor prioridad |
| 3 | **Coste energético anual evitable** | Euros/año que se pierden por no actuar | A mayor coste evitable, mayor prioridad |
| 4 | **Plazo de amortización** | Años hasta recuperar la inversión | A menor plazo, mayor prioridad |
| 5 | **Impacto en confort** | Mejora percibida en temperatura, ruido, calidad del aire | A mayor impacto, mayor prioridad |
| 6 | **Viabilidad técnica** | Facilidad/simplicidad de ejecución | A mayor viabilidad (más simple), mayor prioridad |
| 7 | **Ahorro energético** | kWh/año ahorrados | A mayor ahorro, mayor prioridad |

**Condiciones obligatorias del modelo:**

1. **El criterio "Seguridad" tiene la máxima influencia** sobre cualquier otro criterio. Una actuación con riesgo alto será prioritaria independientemente de su ahorro energético.
2. **El criterio "Ahorro energético" tiene la mínima influencia** en el modelo. La prioridad nunca puede depender únicamente del ahorro energético. Esto garantiza que:
   - Una caldera con riesgo de CO (seguridad alta) siempre esté por encima de un aislamiento que ahorra más energía pero no tiene riesgo
   - Una fachada que incumple CTE (normativa alta) esté por encima de un suelo sin aislar que solo pierde energía
3. **El orden de influencia relativa** entre criterios se define en la metodología interna y es evolutivo. El PRD únicamente fija que seguridad tiene prioridad máxima y ahorro energético tiene prioridad mínima.

### 3.2 Perfiles de cliente (ajuste direccional)

El perfil del cliente, detectado durante el onboarding, ajusta direccionalmente la ponderación de los criterios. Este documento define la **dirección del ajuste**, no valores numéricos:

| Perfil | Ajuste direccional respecto a la metodología base |
|--------|---------------------------------------------------|
| **Propietario que quiere vender** | Aumenta peso de normativa y seguridad. Reduce peso de amortización y confort. |
| **Propietario que quiere reformar para vivir** | Aumenta peso de confort y coste anual. Reduce peso de normativa y viabilidad. |
| **Propietario con presupuesto limitado** | Aumenta peso de amortización y coste anual. Reduce peso de confort. **La seguridad nunca puede reducirse por debajo del mínimo metodológico.** |
| **Comunidad de propietarios** | Aumenta peso de normativa y seguridad. Reduce peso de confort y amortización. |

Los valores concretos de estos ajustes se definen en la metodología interna de la plataforma y pueden calibrarse con la experiencia acumulada.

### 3.3 Reglas de negocio del modelo

- **RN-RF003-001:** La prioridad de una actuación no puede determinarse únicamente por el ahorro energético. Debe considerar al menos 3 de los 7 criterios definidos.
- **RN-RF003-002:** Ninguna actuación con factor de seguridad ≥ 7 puede tener prioridad inferior a "🔴 Prioritaria", independientemente del resto de factores.
- **RN-RF003-003:** Ninguna actuación con factor de incumplimiento normativo ≥ 8 puede tener prioridad inferior a "🔴 Prioritaria".
- **RN-RF003-004:** El AT puede modificar el orden recomendado por la plataforma en cualquier momento. Todo cambio debe quedar registrado con su justificación (ver sección 4).

---

## 4. El AT como decisor final

### 4.1 La capacidad de decisión del AT

La plataforma genera un **orden recomendado**. El AT tiene tres opciones:

| Opción | Descripción | Requisito |
|--------|-------------|-----------|
| **Aceptar** | El AT valida el orden propuesto por la plataforma y lo entrega al cliente | Confirmación explícita |
| **Modificar** | El AT reordena las actuaciones según su criterio profesional | Registrar justificación del cambio |
| **Rechazar y redefinir** | El AT establece un orden completamente diferente al recomendado | Registrar justificación del cambio |

### 4.2 El registro de justificación (Justification Log)

Cuando el AT modifica el orden recomendado, la plataforma registra:

```
┌──────────────────────────────────────────────────────────────┐
│ 📋 Registro de modificación de prioridad                     │
│                                                              │
│ Actuación afectada: Aislar fachada                           │
│ Posición recomendada: 2                                      │
│ Posición final: 4                                            │
│                                                              │
│ Justificación del AT:                                        │
│ "El cliente va a vender la vivienda en 6 meses. Aunque el    │
│  aislamiento de fachada es rentable a largo plazo, no         │
│  recuperará la inversión antes de la venta. He priorizado    │
│  las actuaciones que mejoran la calificación energética       │
│  con menor inversión."                                       │
│                                                              │
│ Fecha: 2026-07-07  AT: Juan García (j.garcia@certilab.com)   │
└──────────────────────────────────────────────────────────────┘
```

### 4.3 Transparencia con el cliente

El cliente ve el orden final (el que el AT ha aprobado). La plataforma puede incluir una nota de transparencia:

> "Este orden ha sido revisado y validado por un Arquitecto Técnico colegiado. Se basa en criterios técnicos objetivos y en el conocimiento directo de tu vivienda."

Si el AT lo considera útil, puede compartir el Justification Log con el cliente para demostrar trazabilidad y rigor profesional.

### 4.4 ¿Por qué es importante este enfoque?

1. **El AT conoce al cliente.** La plataforma no sabe si el cliente acaba de perder su empleo, si está a punto de vender o si tiene un bebé en camino. El AT sí.
2. **El AT conoce el contexto local.** La plataforma no sabe que la ordenanza municipal exige un tipo específico de aislamiento que encarece la obra. El AT sí.
3. **El AT es responsable.** La plataforma no firma el informe. El AT sí. La decisión debe ser suya.
4. **El cliente confía en el AT.** La plataforma es una herramienta. El AT es el profesional que el cliente ha contratado.

---

## 5. Regla de desempate

### 5.1 Criterios de desempate

Si dos actuaciones obtienen la misma puntuación compuesta (diferencia menor que el umbral definido en la metodología interna), se aplican las siguientes reglas de desempate en orden:

| Orden | Regla | Criterio |
|:-----:|-------|----------|
| 1 | **Seguridad** | Mayor puntuación en seguridad gana |
| 2 | **Normativa** | Mayor puntuación en normativa gana |
| 3 | **Coste anual** | Mayor coste anual evitable gana |
| 4 | **Plazo legal** | Si hay plazo de inspección obligatoria (ITEs, calderas), el que expire antes gana |
| 5 | **Simplicidad** | Mayor viabilidad técnica (más fácil de hacer) gana |

### 5.2 Ejemplo de desempate

```
Actuación A: Aislar fachada     → Puntuación: 7.2
Actuación B: Doble acristalam.  → Puntuación: 7.0

Diferencia por debajo del umbral → Aplicar desempate
1. Seguridad: A=3, B=2 → Empate
2. Normativa:  A=5, B=6 → Gana B
3. Coste anual: A=600€, B=300€ → Gana A

Resultado: Aislar fachada es prioritario (coste anual mayor)
```

### 5.3 Agrupación por empate múltiple

Si tres o más actuaciones están en la misma horquilla (por debajo del umbral de diferencia definido en la metodología), el sistema las agrupa en un **mismo nivel** y sugiere:

> **"Estas tres actuaciones tienen una importancia similar. Cualquiera de las tres es un buen punto de partida."**

Esto evita falsa precisión y reconoce que en ciertos casos hay múltiples caminos válidos. El AT puede desempatarlas con su criterio profesional o mantenerlas agrupadas.

---

## 6. ¿Cómo evita recomendar actuaciones que no aportan valor suficiente?

### 6.1 Regla de valor mínimo (Umbral de rentabilidad)

Toda actuación debe superar un **umbral de valor mínimo** para ser recomendada en los niveles principales. Si no lo supera, la plataforma la sugiere para la categoría "No recomendado" (visible solo en anexo técnico).

| Criterio | Umbral | Excepción |
|----------|:------:|-----------|
| **Ahorro energético anual** | ≥ 50€/año o ≥ 5% de la factura | Seguridad ≥ 7 o Normativa ≥ 8 (se muestra aunque no ahorre) |
| **Amortización** | ≤ 20 años | Lo mismo: seguridad o normativa altas |
| **Seguridad** | No aplica umbral | Cualquier riesgo de seguridad ≥ 4 aparece aunque el resto de factores sean 0 |
| **Normativa** | No aplica umbral | Cualquier incumplimiento documentado aparece aunque no sea rentable |

### 6.2 Ejemplos de filtrado

| Actuación | Ahorro anual | Coste | Amortización | ¿Aparece? | Motivo |
|-----------|:------------:|:-----:|:------------:|:---------:|--------|
| Sustituir ventanas | 80€/año | 4.000€ | 50 años | ❌ No | Amortización > 20 años, sin seguridad ni normativa |
| Aislar fachada | 600€/año | 8.000€ | 13 años | ✅ Sí | Rentable |
| Revisar caldera de gas | 0€/año | 150€ | — | ✅ Sí | Seguridad ≥ 7 (riesgo CO) |
| Pintar fachada | 0€/año | 3.000€ | — | ❌ No | Sin ahorro, sin seguridad, sin normativa |

### 6.3 El AT puede sobrescribir el filtrado

Si el AT considera que una actuación filtrada merece aparecer en la jerarquía principal, puede incluirla manualmente dejando constancia de su justificación.

---

## 7. ¿Puede la plataforma ayudar a explicar al cliente por qué una actuación aparece antes que otra?

### 7.1 Mecanismo: "Trazabilidad de prioridad"

Cada actuación en la jerarquía debe poder explicar **por qué está donde está**. La plataforma proporciona al AT los datos necesarios para construir esta explicación:

```
┌──────────────────────────────────────────────────────────┐
│ 🟡 RECOMENDADA (Planifica)                               │
│                                                          │
│ Aislar fachada                                           │
│                                                          │
│ ┌───┬─────────────────────────────────────────────────┐  │
│ │ 🏠│ Ahorro energético     ████████░░ 8/10  600€/año │  │
│ │ 💰│ Inversión estimada             8.000€           │  │
│ │ 📅│ Recuperas la inversión en     13 años           │  │
│ │ 🔒│ Seguridad                           Baja        │  │
│ │ 📋│ Cumplimiento normativo         Mejorable        │  │
│ └───┴─────────────────────────────────────────────────┘  │
│                                                          │
│ ¿Por qué aparece aquí?                                   │
│ "Esta actuación es la segunda más importante porque      │
│  tiene el mayor ahorro anual (600€) y recuperas la       │
│  inversión en un plazo razonable (13 años). Aunque la    │
│  caldera es más urgente por seguridad, esta es la que    │
│  más dinero te va a ahorrar."                            │
│                                                          │
│ Siguiente paso: Solicita presupuesto de aislamiento      │
│ de fachada a tres profesionales.                         │
└──────────────────────────────────────────────────────────┘
```

### 7.2 Plantillas de apoyo a la redacción

La plataforma ofrece plantillas que el AT completa (o adapta):

| Nivel | Plantilla sugerida |
|-------|---------------------|
| **🔴 Prioritaria** | "Esta actuación es prioritaria porque [factor principal: seguridad / normativa]. Si no actúas, [consecuencia concreta: hay riesgo para las personas / puedes tener problemas legales / estás perdiendo X€/año]." |
| **🟡 Recomendada** | "Esta actuación es recomendable porque [factor principal: ahorro / confort]. Recuperas la inversión en X años y [beneficio adicional: mejora el confort / aumenta el valor de la vivienda]." |
| **🟢 Opcional** | "Esta mejora es opcional. Si ya vas a hacer obras, merece la pena aprovechar para incluirla. Si no, puedes dejarlo para más adelante sin consecuencias importantes." |
| **No recomendado** | (No aparece en el flujo principal. Solo en anexo.) |

### 7.3 Responsabilidad de la redacción

La plataforma **no genera automáticamente** la explicación final. Proporciona:

- La puntuación compuesta y el desglose por criterio
- La plantilla de texto sugerida

El AT redacta la explicación en lenguaje cliente. Esto garantiza calidad, personalización y que la explicación refleje el conocimiento directo del inmueble.

---

## 8. ¿Cómo ayuda esta jerarquía a tomar una decisión mejor?

### 8.1 Antes vs. Después

**Antes (sin RF-003):**

El cliente tiene una lista de 7 problemas y ninguna idea de por dónde empezar. Contrata a un profesional que le recomienda lo que más le conviene a él, no al cliente. O no hace nada.

**Después (con RF-003):**

El cliente tiene:

1. **Una jerarquía visual** — Sabe qué es lo primero, lo segundo y lo tercero
2. **Una razón para cada posición** — Sabe por qué la caldera está antes que la fachada
3. **Un siguiente paso concreto** — No es "reforma tu casa", es "pide presupuesto de caldera"
4. **Tranquilidad sobre lo que no hace** — Sabe que lo que queda fuera no es urgente ni rentable
5. **Confianza en el profesional** — Sabe que un AT ha revisado y validado el plan

### 8.2 Las 3 preguntas que la jerarquía responde

| Pregunta del cliente | Respuesta de la jerarquía |
|----------------------|---------------------------|
| **¿Qué tengo que hacer SÍ o SÍ?** | 🔴 Prioritarias — No hay alternativa segura/legal |
| **¿Qué merece la pena hacer?** | 🟡 Recomendadas — Recuperas la inversión |
| **¿Qué puedo dejar para después?** | 🟢 Opcionales — Mejoran pero no son críticas |

### 8.3 Impacto en la decisión

La jerarquía transforma la decisión de:

> "Tengo 30.000€ en reformas que hacer, no sé por dónde empezar, así que no hago nada."

A:

> "Tengo que cambiar la caldera (2.500€). Luego, si puedo, aislar fachada (8.000€, lo recupero en 13 años). El resto puede esperar."

---

## 9. ¿Existe una forma más simple de conseguir el mismo resultado?

### 9.1 Alternativas consideradas

| Alternativa | Ventaja | Problema | Veredicto |
|-------------|---------|----------|:---------:|
| **A: Lista plana ordenada por ahorro energético** | Simple, fácil de calcular | Ignora seguridad, normativa, confort. Prioriza mal. | ❌ |
| **B: Solo tres categorías manuales (AT decide)** | Simple, sin modelo | Depende del criterio subjetivo del AT. Inconsistente entre ATs. Sin apoyo objetivo. | ❌ |
| **C: Scoring simple (suma 1-10)** | Más objetivo que B | No diferencia criterios. Dos problemas iguales no se pueden desempatar. | ❌ |
| **D: Evaluación multicriterio con AT como decisor (propuesta actual)** | Objetivo, flexible, explicable, preserva el criterio profesional | Más complejo de diseñar e implementar | ✅ |

### 9.2 Justificación P4

**¿Por qué esta es la solución de menor complejidad que satisface completamente el requisito?**

1. **Reutilización del Core:** RF-003 no requiere nuevos agregados. Opera sobre los datos que ya produce RF-001 (información del inmueble) y RF-002 (nivel de confianza). El Core V1 existente (Cliente, Inmueble, Expediente, Documento IA) es suficiente.

2. **Composición:** La jerarquía se compone de datos ya existentes:
   - La información del inmueble (RF-001) proporciona la materia prima
   - El nivel de confianza (RF-002) contextualiza la fiabilidad de esa información
   - El AT asigna las valoraciones por criterio durante PITR™
   - El sistema calcula la puntuación compuesta y genera el orden recomendado

3. **Extensión controlada:** Lo único nuevo es el **modelo de evaluación multicriterio** (los criterios, las reglas de desempate, los umbrales, la metodología de ponderación y la interfaz de revisión para el AT). Esto no es un nuevo agregado ni un nuevo servicio. Es una **función de cálculo** dentro del servicio de expediente existente, más una **interfaz de validación** para el AT.

4. **No se ha optado por una solución más simple (Alternativa A o B)** porque:
   - La alternativa A (solo ahorro energético) viola la condición explícita de que la prioridad no puede depender únicamente del ahorro energético
   - La alternativa B (AT decide subjetivamente sin apoyo) introduce inconsistencia entre ATs y falta de trazabilidad. El cliente no tendría una respuesta clara a "¿por qué esto primero?"
   - La alternativa C (suma simple) no permite desempates y no diferencia entre criterios

---

## 10. Validación contra P1-P4 (Product-First Execution Mode)

### P1. ¿Qué capacidad funcional añade al MVP?

RF-003 añade la capacidad de que el AT pueda generar un **plan de actuaciones priorizado recomendado** basado en un modelo multicriterio, revisarlo, ajustarlo si es necesario y entregarlo al cliente con una explicación clara de por qué cada actuación está donde está.

**Valor para el usuario final (cliente):** El cliente pasa de "tengo muchos problemas y no sé por dónde empezar" a "sé exactamente qué tengo que hacer primero, por qué, y un profesional lo ha validado".

**Valor para el AT:** El AT dispone de una herramienta objetiva y sistemática para construir priorizaciones consistentes, explicables y defendibles ante el cliente, sin perder su capacidad de decisión profesional.

**Valor diferencial:** Ningún certificado energético ni informe técnico tradicional ofrece una priorización multicriterio revisada por un profesional. Todos ofrecen listas planas o recomendaciones genéricas.

### P2. ¿Qué agregados participan?

| Agregado | Rol en esta funcionalidad |
|----------|--------------------------|
| **Cliente** | Aporta perfil de decisión (vender, reformar, presupuesto limitado) que ajusta direccionalmente la ponderación |
| **Inmueble** | Aporta los datos físicos (cerramientos, instalaciones, superficies) sobre los que se identifican los problemas |
| **Expediente** | Contiene el listado de problemas/actuaciones identificadas por el AT, las valoraciones por criterio, el orden recomendado, y el Justification Log si el AT modificó el orden |
| **Documento IA** | No participa directamente. La jerarquía se muestra dentro del documento de decisiones (RF-001) como capa 2 y capa 3 |

No se requieren agregados nuevos. La jerarquía es un **atributo calculado del Expediente**, no una entidad independiente.

### P3. ¿Cómo interactúan entre sí?

```
Cliente.profile ───────► Ajusta direccionalmente la ponderación ──┐
                                                                    ▼
Inmueble.datos ─────────► El AT identifica problemas ──────────► Lista de actuaciones con
                         y asigna valores 1-10 a cada criterio    valoraciones por criterio
                                                                         │
                                                                         ▼
Expediente.actuaciones ◄────── Se almacena: orden recomendado ────────┘
                         + Justification Log (si AT modificó)
                                  │
                                  ▼
        AT revisa → acepta / modifica / reordena → justifica cambios
                                  │
                                  ▼
                  Documento de decisiones (RF-001)
                  Capa 2: Jerarquía visual
                  Capa 3: Plan de acción
```

### P4. ¿Por qué esta es la solución de menor complejidad que satisface completamente el requisito?

**Justificación completa:**

1. **Reutilización del Core V1 (100%):** RF-003 no requiere nuevos agregados, nuevos bounded contexts ni nuevas tablas en la base de datos. Opera sobre los datos existentes de Cliente, Inmueble y Expediente.

2. **Composición de capacidades existentes:** La jerarquía se construye combinando:
   - Los datos del inmueble (ya disponibles desde RF-001)
   - El nivel de confianza (RF-002), que contextualiza si los datos son fiables
   - La evaluación del AT durante PITR™ (proceso existente)
   - El perfil del cliente (ya disponible desde la creación del expediente)

3. **Extensión mínima:** Lo único que se añade es:
   - Un modelo matemático (función de ponderación) — sin nueva infraestructura
   - Reglas de negocio (4 reglas) — sin nueva arquitectura
   - Interfaz de revisión para el AT (aceptar/modificar/justificar) — componente UI sobre expediente existente
   - Campos de almacenamiento para la jerarquía y el Justification Log en el Expediente — sin nuevas tablas

4. **Alternativas más simples descartadas justificadamente:**
   - **Lista por ahorro energético** — Viola condición explícita del requisito (no puede ser el único criterio). Además priorizaría mal en casos reales (ej: recomendaría aislar antes que revisar una caldera con riesgo de CO).
   - **Solo criterio del AT** — Inconsistente, no trazable, no explicable al cliente. Depende del criterio de cada AT.
   - **No hacer nada (dejar la lista plana)** — El cliente no tendría prioridades → parálisis → el producto no cumple su función.

**Conclusión:** Esta es la solución de menor complejidad que cumple completamente el requisito respetando la arquitectura aprobada y preservando el rol profesional del AT.

---

## 11. Casos de uso, casos límite y criterios de aceptación

### 11.1 Caso de uso principal (Happy Path)

**Título:** Propietario recibe plan priorizado validado por el AT
**Perfil:** Propietario que quiere reformar para vivir
**Inmueble:** Vivienda unifamiliar con 6 problemas identificados

**Flujo:**
1. El AT completa la inspección PITR™ e identifica 6 problemas
2. El AT asigna valoración 1-10 a cada criterio para cada problema
3. La plataforma calcula la puntuación compuesta aplicando la metodología interna (ponderación ajustada al perfil "reformar para vivir")
4. La plataforma sugiere una clasificación: 2 Prioritarias, 3 Recomendadas, 1 Opcional
5. El AT revisa el orden recomendado y lo acepta sin cambios
6. El AT redacta la explicación para cada nivel usando las plantillas de apoyo
7. La jerarquía se muestra en el documento de decisiones (capas 2 y 3)

**Criterio de aceptación:**
```
Dado un expediente con 6 actuaciones evaluadas por el AT
Cuando la plataforma genera el orden recomendado
Y el AT lo acepta
Entonces se muestran 3 niveles (🔴 Prioritaria, 🟡 Recomendada, 🟢 Opcional)
Y cada actuación incluye valoración por criterio, explicación y siguiente paso
Y las actuaciones aparecen ordenadas por puntuación compuesta descendente
Y el documento indica que el orden ha sido validado por el AT
```

### 11.2 Caso de seguridad crítica

**Título:** Actuación con riesgo de seguridad aparece siempre como prioritaria

**Flujo:**
1. AT identifica caldera con riesgo de CO (seguridad = 9)
2. El resto de criterios tienen valoraciones bajas (ahorro = 2, confort = 3, etc.)
3. La plataforma puede calcular una puntuación compuesta baja (ej: 4.5)
4. RN-RF003-002 anula: seguridad ≥ 7 → prioridad 🔴
5. El AT confirma que la caldera debe ser 🔴 Prioritaria

**Criterio de aceptación:**
```
Dado una actuación con valoración de seguridad ≥ 7
Cuando la plataforma genera el orden recomendado
Entonces la actuación se clasifica como 🔴 Prioritaria
Independientemente de la puntuación compuesta del resto de criterios
```

### 11.3 Caso de modificación por el AT

**Título:** El AT modifica el orden recomendado y registra la justificación

**Flujo:**
1. La plataforma sugiere: 1. Caldera, 2. Fachada, 3. Ventanas
2. El AT conoce que el cliente va a vender la vivienda en 3 meses
3. El AT mueve "Ventanas" a la posición 2 y "Fachada" a la 3
4. El AT registra: "El cliente vende en 3 meses. Las ventanas mejoran la calificación energética con menor inversión. La fachada no se amortizaría antes de la venta."
5. La plataforma almacena el Justification Log
6. El documento muestra el orden final modificado

**Criterio de aceptación:**
```
Dado un orden recomendado por la plataforma
Cuando el AT modifica la posición de una o más actuaciones
Entonces la plataforma solicita una justificación escrita
Y almacena el Justification Log con: actuación, posición recomendada, posición final, justificación, fecha y AT
Y el documento final muestra el orden modificado
Y opcionalmente puede mostrar la nota de transparencia con la intervención del AT
```

### 11.4 Caso de empate

**Título:** Dos actuaciones con puntuación idéntica se desempatan

**Flujo:**
1. Actuación A (aislar fachada): puntuación compuesta = 7.2
2. Actuación B (cambiar ventanas): puntuación compuesta = 7.0
3. Diferencia por debajo del umbral → aplicar desempate
4. Seguridad: A=3, B=2 → empate
5. Normativa: A=5, B=6 → gana B (normativa)
6. Pero coste anual: A=600€, B=300€ → gana A (coste anual)
7. Resultado: Aislar fachada primero
8. El AT revisa y acepta o modifica

**Criterio de aceptación:**
```
Dado dos actuaciones con diferencia de puntuación por debajo del umbral
Cuando la plataforma aplica las reglas de desempate
Entonces las ordena por: seguridad > normativa > coste anual > plazo legal > simplicidad
Y el AT puede aceptar o modificar el orden resultante
```

### 11.5 Caso de empate triple

**Título:** Tres actuaciones con puntuación similar se agrupan

**Criterio de aceptación:**
```
Dado tres o más actuaciones con puntuaciones en un rango por debajo del umbral entre la primera y la última
Cuando la plataforma genera el orden recomendado
Entonces las agrupa en un mismo nivel
Y sugiere el mensaje: "Estas actuaciones tienen una importancia similar"
Y el AT puede desempatarlas o mantenerlas agrupadas
```

### 11.6 Caso de actuación no rentable

**Título:** Actuación que no supera umbral de valor mínimo se oculta

**Flujo:**
1. AT identifica sustitución de ventanas (ahorro = 80€/año, coste = 4.000€, amortización = 50 años)
2. Seguridad = 2, Normativa = 3
3. Amortización > 20 años → no supera umbral
4. Seguridad < 7 y Normativa < 8 → no aplica excepción
5. La actuación no aparece en la jerarquía principal (se sugiere para "No recomendado")
6. El AT puede optar por incluirla manualmente si lo considera necesario

**Criterio de aceptación:**
```
Dado una actuación con amortización > 20 años
Y seguridad < 7
Y normativa < 8
Cuando la plataforma genera el orden recomendado
Entonces la actuación no aparece en la jerarquía principal
Y la plataforma la sugiere para anexo técnico como "No recomendada"
Y el AT puede incluirla manualmente con justificación
```

### 11.7 Caso de perfil de cliente "Vender"

**Título:** La ponderación se ajusta direccionalmente cuando el cliente quiere vender

**Criterio de aceptación:**
```
Dado un cliente con perfil "Quiero vender la vivienda"
Cuando la plataforma genera el orden recomendado
Entonces la ponderación se ajusta direccionalmente según la metodología interna
Y las actuaciones que resuelven incumplimientos normativos aparecen antes en la recomendación
```

### 11.8 Caso límite: Sin problemas identificados

**Título:** Expediente sin problemas no genera jerarquía

**Criterio de aceptación:**
```
Dado un expediente donde el AT no identifica ningún problema ni actuación
Cuando la plataforma genera el orden recomendado
Entonces muestra: "No se han identificado problemas en tu vivienda"
Y la capa 2 del documento de decisiones muestra el estado como "Sin incidencias"
Y la capa 3 muestra el mensaje: "No necesitas realizar ninguna actuación en este momento"
```

### 11.9 Caso límite: Un solo problema

**Título:** Un único problema se muestra directamente

**Criterio de aceptación:**
```
Dado un expediente con una única actuación identificada
Cuando la plataforma genera el orden recomendado
Entonces la muestra directamente como 🔴 Prioritaria (si cumple criterios de prioridad)
O como 🟡 Recomendada (en caso contrario)
O como 🟢 Opcional (si no supera umbrales pero el AT decide incluirla)
Y no genera niveles vacíos
```

### 11.10 Caso límite: Todos los problemas son de seguridad

**Título:** Múltiples problemas de seguridad se ordenan internamente

**Criterio de aceptación:**
```
Dado un expediente donde todas las actuaciones tienen seguridad ≥ 7
Cuando la plataforma genera el orden recomendado
Entonces todas son 🔴 Prioritarias
Y se ordenan internamente por: normativa > coste anual > viabilidad
```

---

## 12. Definición formal de RF-003

### RF-003: Sistema de Apoyo a la Priorización

> **Descripción:** La plataforma debe proporcionar al Arquitecto Técnico un sistema de apoyo que genere un orden recomendado de actuaciones basado en un modelo de evaluación multicriterio. El modelo considera los criterios documentados de seguridad, cumplimiento normativo, coste energético anual evitable, plazo de amortización, impacto en confort, viabilidad técnica y ahorro energético. La plataforma clasifica las actuaciones en tres niveles sugeridos (Prioritaria, Recomendada, Opcional) y permite al AT aceptar el orden, modificarlo o establecer uno propio, registrando en todos los casos la justificación de cualquier cambio. Las actuaciones que no superan el umbral de valor mínimo se excluyen de la vista principal, aunque el AT puede incluirlas manualmente.

- **Prioridad:** Alta
- **Dependencias:** RF-001 (Información del inmueble), RF-002 (Nivel de confianza)
- **Criterios de aceptación:** (Ver sección 11)
- **Restricciones:** Los pesos de ponderación no se definen en el PRD. Son parte de la metodología interna y pueden evolucionar sin modificar este documento.

### RN-RF003-001 a RN-RF003-004

(Ver sección 3.3 para las 4 reglas de negocio)

---

## 13. Preguntas abiertas resueltas

| # | Pregunta | Resolución |
|---|----------|------------|
| 1 | ¿Debe el cliente poder modificar los pesos manualmente? | **No en V1.** Los pesos son metodología interna. El cliente no los ve ni los modifica. |
| 2 | ¿La jerarquía debe ser dinámica o estática? | **Estática en V1.** Se fija en el momento del diagnóstico. Si el perfil del cliente cambia, se genera un nuevo expediente. |
| 3 | ¿Debe el AT poder anular manualmente la jerarquía calculada? | **Sí.** Es el núcleo de RF-003. El AT puede aceptar, modificar o redefinir el orden. Todo cambio debe quedar registrado en el Justification Log. |
| 4 | ¿Los pesos por defecto se definen en V1 o se ajustan con datos reales en V2? | **Metodología interna en V1.** Los pesos se definen como parte de la implementación técnica, no del PRD. Pueden calibrarse sin modificar requisitos. |
| 5 | ¿El cliente puede ver la puntuación numérica o solo los niveles? | **Solo niveles (🔴🟡🟢) en la vista cliente.** El detalle numérico queda en el anexo técnico para el AT. La explicación la redacta el AT en lenguaje cliente. |

---

## Histórico de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 1.0 | 2026-07-07 | Sistema | Análisis conceptual completo con modelo de ponderación multicriterio |
| 1.1 | 2026-07-07 | Sistema | Ajuste conceptual: RF-003 pasa a ser "Sistema de Apoyo a la Priorización". Se eliminan porcentajes fijos del PRD. Se incorpora al AT como decisor final con capacidad de aceptar/modificar/justificar. Se documentan criterios sin pesos. Los pesos pasan a metodología interna. Se añade Justification Log. Se responde pregunta abierta P3 (AT puede anular). |
| 2.0 | 2026-07-07 | Usuario | Aprobación conceptual. Validación del enfoque multicriterio, del rol del AT como decisor final y de la exclusión de pesos fijos del PRD. El documento pasa a estado APROBADO PARA PRD-001 V2. |

---

## 14. Convención de lenguaje transversal

### 14.1 Principio

RF-003 no es un **algoritmo de decisión automática**. Es un **sistema de apoyo a la priorización** que genera un **orden recomendado**. El decisor final es siempre el Arquitecto Técnico.

Este documento usa un lenguaje deliberado para reflejar esta distinción en todos los niveles del análisis, la especificación, el diseño y la implementación.

### 14.2 Tabla de términos prohibidos y sustitutos

| Término prohibido | Sustituto obligatorio | Ejemplo de uso correcto |
|-------------------|-----------------------|-------------------------|
| determina / decide | sugiere / recomienda | "El sistema **sugiere** un orden" |
| el algoritmo calcula | la plataforma calcula / genera | "La plataforma **genera** una puntuación compuesta" |
| orden definitivo | orden recomendado | "El AT revisa el **orden recomendado**" |
| clasificación automática | clasificación sugerida | "La **clasificación sugerida** es Prioritaria" |
| el sistema prioriza | el sistema recomienda priorizar | "El sistema **recomienda priorizar** esta actuación" |
| peso fijo / porcentaje | ponderación metodológica | "La **ponderación metodológica** se ajusta al perfil" |
| el AT debe aceptar | el AT puede aceptar | "El AT **puede** aceptar, modificar o redefinir" |
| decisión del sistema | recomendación del sistema | "La **recomendación** del sistema es un punto de partida" |
| el sistema asigna | el AT asigna (valoraciones) | "El AT **asigna** la valoración 1-10" |

### 14.3 Ámbito de aplicación

Esta convención se aplica a:

1. **Documentos de análisis y especificación** (como este documento)
2. **PRD y requisitos funcionales** derivados de RF-003
3. **Código fuente** — Nombres de funciones, variables, comentarios y mensajes de log
4. **UI/UX** — Textos visibles para el AT y para el cliente
5. **Documentación del producto** — Manuales, guías y formación

### 14.4 Validación

Cualquier revisión del código o documentación de RF-003 deberá verificar el cumplimiento de esta convención. El uso de términos de la columna izquierda en la tabla anterior será considerado un defecto de alineación conceptual.

---

*Fin del análisis conceptual RF-003 v1.1*
