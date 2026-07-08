# RF-002 — Nivel de Confianza del Diagnóstico

> **Documento:** RF-002-NIVEL-DE-CONFIANZA.md
> **Versión:** v1.0 — Versión conceptual aprobada, formalizada como documento independiente
> **Estado:** ✅ APROBADO (conceptual) — Pendiente de integrar en PRD-001
> **Depende de:** RF-001 (Información del inmueble), PITR™
> **Es dependencia de:** RF-003 (Sistema de Apoyo a la Priorización), RF-004 (Beneficios Esperados de las Actuaciones)
> **Propósito:** Definir el sistema de validación de la calidad de los datos de diagnóstico PITR™, comunicando al cliente y al AT la fiabilidad de las mediciones y la confianza que pueden depositar en las recomendaciones derivadas.

---

## Índice

1. ¿Qué problema del cliente resuelve RF-002?
2. ¿Qué decisión ayuda a tomar?
3. ¿Cómo se determina el nivel de confianza?
4. Niveles de confianza definidos
5. Comunicación del nivel de confianza al cliente
6. Uso del nivel de confianza por RF-003 y RF-004
7. Validación contra P1-P4
8. Casos de uso
9. Casos límite
10. Criterios de aceptación
11. Preguntas abiertas resueltas
12. Changelog

---

## 1. ¿Qué problema del cliente resuelve RF-002?

### 1.1 El problema real

El cliente recibe un diagnóstico técnico de su vivienda con recomendaciones. El cliente no tiene forma de saber:

- **¿Son fiables estos datos?** "¿El Arquitecto Técnico ha podido medir todo correctamente?"
- **¿Puedo confiar en las recomendaciones?** "¿Estas actuaciones se basan en datos sólidos o en suposiciones?"
- **¿Qué margen de error tienen las estimaciones?** "Si el ahorro es 300-500€/año, ¿cuánto de fiable es esa horquilla?"

**Sin RF-002, el cliente recibe:**
- Un diagnóstico sin indicación de fiabilidad
- Recomendaciones que parecen igual de sólidas, aunque algunas se basen en mediciones directas y otras en estimaciones
- Incertidumbre sobre si puede confiar en el plan de acción

### 1.2 El dolor emocional

| Emoción | Causa |
|---------|-------|
| **Desconfianza** | "¿Me están recomendando esto porque es necesario o porque ganan dinero?" |
| **Inseguridad** | "Si los datos no son fiables, ¿cómo sé que las recomendaciones son correctas?" |
| **Parálisis** | "Invertir 8.000€ basándome en datos que no sé si son fiables... mejor no hago nada." |
| **Frustración** | "He pagado por un diagnóstico. Quiero saber si lo que me dicen es fiable." |

### 1.3 Lo que el cliente realmente necesita

El cliente necesita **una respuesta a una sola pregunta**:

> **"¿Puedo confiar en este diagnóstico?"**

No necesita el detalle técnico de cada medición. Necesita saber, en términos claros, si los datos que sustentan las recomendaciones son fiables y qué limitaciones tienen.

### 1.4 Pregunta que responde RF-002

> **"¿Es correcto el diagnóstico?"**

---

## 2. ¿Qué decisión ayuda a tomar?

RF-002 ayuda al cliente y al AT a responder una pregunta fundamental:

> **"¿Puedo confiar en estos datos para tomar decisiones?"**

A partir de esa respuesta, el cliente puede decidir:

| Decisión | Lo que RF-002 le muestra |
|----------|--------------------------|
| **Actuar según las recomendaciones** | "Los datos son fiables. Puedo confiar en el plan de acción." |
| **Solicitar una segunda inspección** | "Hay datos con confianza baja. Un AT podría completarlos." |
| **Aceptar con cautela** | "Los datos principales son fiables, pero algunas estimaciones tienen margen de error." |
| **Descartar recomendaciones específicas** | "Esta recomendación se basa en datos insuficientes." |

---

## 3. ¿Cómo se determina el nivel de confianza?

### 3.1 Factores que afectan al nivel de confianza

El nivel de confianza del diagnóstico se determina a partir de múltiples factores durante la inspección PITR™:

| Factor | Descripción | Impacto en confianza |
|--------|-------------|---------------------|
| **Acceso al inmueble** | ¿Se ha podido acceder a todas las estancias y elementos? | Sin acceso completo → confianza media/baja |
| **Condiciones de medición** | ¿Las mediciones se realizaron en condiciones representativas? | Condiciones adversas → confianza media |
| **Antigüedad de los datos** | ¿Los datos del inmueble son actuales o del catastro? | Datos antiguos → confianza media |
| **Documentación disponible** | ¿Existe documentación técnica del inmueble (proyecto, ITE, certificados)? | Sin documentación → confianza media/baja |
| **Precisión de los equipos** | ¿Se usaron equipos calibrados y adecuados? | Equipos no calibrados → confianza baja |
| **Cobertura de la inspección** | ¿Se pudieron inspeccionar cubierta, fachadas, instalaciones? | Inspección parcial → confianza media/baja |

### 3.2 El AT asigna el nivel de confianza

La plataforma no determina automáticamente el nivel de confianza. El AT, durante la inspección PITR™, asigna el nivel basándose en su juicio profesional y en los factores anteriores.

La plataforma proporciona:
- Un **cuestionario de verificación** que guía al AT en la evaluación de cada factor
- Una **recomendación de confianza** basada en las respuestas del cuestionario
- La capacidad de que el AT **ajuste** el nivel recomendado

### 3.3 Confianza global y confianza por módulo

RF-002 distingue dos niveles de confianza:

1. **Confianza global del diagnóstico:** Nivel general de fiabilidad de la inspección
2. **Confianza por módulo de datos:** Nivel específico para cada tipo de medición:
   - Datos geométricos (superficies, alturas)
   - Datos de cerramientos (composición, transmitancia)
   - Datos de instalaciones (caldera, ACS, climatización)
   - Datos de confort (temperatura, humedad, corrientes)

Esta distinción permite que, por ejemplo, la confianza global sea "Alta" pero la confianza en los datos de instalaciones sea "Media" porque no se pudo acceder a la caldera.

---

## 4. Niveles de confianza definidos

### 4.1 Los tres niveles

| Nivel | Significado | Lenguaje cliente |
|-------|-------------|------------------|
| **🟢 Alta** | Mediciones directas, equipos calibrados, acceso completo. Los datos son representativos y fiables. | "Los datos de esta inspección son fiables. Puedes confiar en las recomendaciones." |
| **🟡 Media** | Algunas mediciones son estimaciones o no se pudo acceder a todos los elementos. Los datos principales son fiables, pero hay margen de error en algunas estimaciones. | "Los datos principales son fiables, pero algunas estimaciones tienen margen de error. Tu AT puede darte más detalle." |
| **🔴 Baja** | No se pudo acceder a partes esenciales, los equipos no estaban calibrados o las condiciones de medición no fueron representativas. Las recomendaciones deben tomarse con cautela. | "Algunos datos de esta inspección tienen limitaciones. Consulta con tu AT antes de tomar decisiones basadas en ellos." |

### 4.2 Reglas de negocio

| ID | Regla | Tipo |
|----|-------|------|
| **RN-RF002-001** | Toda inspección PITR™ debe tener un nivel de confianza global asignado | Obligatorio |
| **RN-RF002-002** | El AT puede asignar el nivel de confianza global y los niveles por módulo | Obligatorio |
| **RN-RF002-003** | Si el acceso al inmueble fue parcial (< 70% de estancias), la confianza global no puede ser "Alta" | Restricción |
| **RN-RF002-004** | Si se usaron equipos no calibrados, la confianza global es automáticamente "Baja" | Restricción |
| **RN-RF002-005** | El nivel de confianza por módulo alimenta el campo "Confianza de esta estimación" en RF-004 | Obligatorio |
| **RN-RF002-006** | El nivel de confianza global se muestra al cliente en el documento de decisiones | Obligatorio |
| **RN-RF002-007** | El AT puede sobrescribir cualquier nivel de confianza asignado por el sistema, dejando constancia de su justificación en el Justification Log | Obligatorio |

---

## 5. Comunicación del nivel de confianza al cliente

### 5.1 Formato de comunicación

El nivel de confianza se comunica al cliente en **una frase breve** al inicio del documento de decisiones:

```
🔍 FIABILIDAD DEL DIAGNÓSTICO

Confianza global: 🟢 Alta

"Los datos de esta inspección son fiables. Tu Arquitecto Técnico ha
podido acceder a todas las estancias y realizar mediciones completas.
Puedes confiar en las recomendaciones de este informe."

Confianza por módulos:
• Datos del inmueble:   🟢 Alta
• Cerramientos:          🟢 Alta  
• Instalaciones:         🟡 Media (no se pudo acceder a la caldera)
• Confort térmico:       🟢 Alta
```

### 5.2 Principio: Transparencia, no ocultación

La comunicación del nivel de confianza debe seguir estos principios:

1. **Visible al cliente** — No está oculto en un anexo técnico
2. **Lenguaje claro** — Sin tecnicismos
3. **Ubicación prominente** — Al inicio del documento, antes de las recomendaciones
4. **Accionable** — El cliente sabe qué hacer (confiar, consultar, o pedir segunda opinión)
5. **Trazable** — El cliente puede preguntar al AT por qué un módulo tiene confianza media

### 5.3 NO se comunica

- Las puntuaciones numéricas de cada factor (quedan en el anexo técnico del AT)
- El detalle de qué equipo no estaba calibrado (salvo que el AT lo considere relevante)
- Información que genere desconfianza innecesaria

---

## 6. Uso del nivel de confianza por RF-003 y RF-004

### 6.1 Flujo de información

```
PITR™ ─────────────────────────────────────┐
                                           ▼
                              ┌─────────────────────────┐
                              │  RF-002                 │
                              │  Nivel de confianza     │
                              │  • Global               │
                              │  • Por módulo           │
                              └────────┬────┬───────────┘
                                       │    │
                  ┌────────────────────┘    └────────────────────┐
                  ▼                                              ▼
   ┌─────────────────────────┐                    ┌─────────────────────────┐
   │  RF-003                 │                    │  RF-004                 │
   │  Sistema de Priorización│                    │  Beneficios Esperados   │
   │                         │                    │                         │
   │  Usa la confianza para: │                    │  Usa la confianza para: │
   │  • Contextualizar la    │                    │  • Indicar "Confianza   │
   │    fiabilidad de los    │                    │    de esta estimación:  │
   │    datos de entrada     │                    │    Alta/Media/Baja"     │
   │  • Ajustar la           │                    │    para cada beneficio  │
   │    recomendación si la  │                    │    comunicado           │
   │    confianza es baja    │                    │  • Priorizar módulos    │
   └─────────────────────────┘                    │    con datos fiables    │
                                                  └─────────────────────────┘
```

### 6.2 RF-002 y RF-003

RF-003 utiliza el nivel de confianza para:

1. **Contextualizar la priorización:** Si la confianza global es "Baja", la plataforma sugiere al AT que la priorización se tome con cautela y que considere una segunda inspección
2. **Ajustar la recomendación:** Actuaciones basadas en módulos con confianza "Baja" se marcan con una nota de precaución en el anexo técnico
3. **Informar la explicación:** El AT puede referenciar el nivel de confianza en su explicación al cliente

### 6.3 RF-002 y RF-004

RF-004 utiliza el nivel de confianza para:

1. **Indicar la confianza de cada estimación:** El campo "Confianza de esta estimación: Alta/Media/Baja" en cada tarjeta de beneficios se deriva del nivel de confianza del módulo correspondiente
2. **Priorizar qué beneficios comunicar:** Si un módulo tiene confianza "Baja", los beneficios basados en ese módulo muestran la nota de confianza baja

---

## 7. Validación contra P1-P4

### 7.1 P1 — Adriana López (propietaria que vende)

**Problema:** Adriana sospecha que su certificado B está inflado. Necesita saber si puede confiar en el diagnóstico.

**¿RF-002 le responde?** ✅ Sí

**Cómo:**
- RF-002 muestra la confianza global: "Alta — los datos son fiables"
- Adriana puede confiar en que el diagnóstico no está inflado
- Si la confianza fuera baja, podría solicitar una segunda inspección

### 7.2 P2 — Comprador de vivienda

**Problema:** Está evaluando comprar una casa con certificado E y necesita saber si los datos del diagnóstico son fiables para tomar una decisión de compra.

**¿RF-002 le responde?** ✅ Sí

**Cómo:**
- RF-002 muestra la confianza por módulos
- Si la confianza en cerramientos es "Alta", el comprador sabe que los datos de aislamiento son fiables
- Si la confianza en instalaciones es "Media", sabe que debe pedir al AT más detalle sobre la caldera

### 7.3 P3 — Comunidad de propietarios

**Problema:** Necesita saber si el diagnóstico de su edificio es fiable antes de decidir inversiones comunitarias.

**¿RF-002 le responde?** ✅ Sí

**Cómo:**
- RF-002 muestra la confianza global del diagnóstico del edificio
- Cada vecino puede ver que los datos han sido validados por un AT
- La transparencia genera confianza en la comunidad

### 7.4 P4 — Inversor / Propietario de cartera

**Problema:** Necesita saber si puede confiar en los diagnósticos de múltiples inmuebles para priorizar inversiones.

**¿RF-002 le responde?** ✅ Sí

**Cómo:**
- RF-002 permite comparar niveles de confianza entre inmuebles
- Un inmueble con confianza "Alta" tiene prioridad sobre uno con confianza "Baja" a igualdad de otras condiciones
- El inversor puede decidir: "Invierto primero en los inmuebles con diagnóstico fiable"

---

## 8. Casos de uso

### 8.1 Caso de uso principal: Inspección completa con confianza alta

**Escenario:** Vivienda unifamiliar. AT accede a todas las estancias, realiza mediciones completas con equipos calibrados. Disponible documentación técnica del inmueble.

**Flujo:**
1. AT completa la inspección PITR™ sin incidencias
2. AT asigna confianza global: Alta
3. Confianza por módulos: Todos Alta
4. El documento de decisiones muestra: "🔍 Confianza global: 🟢 Alta"
5. RF-003 y RF-004 reciben la confianza y generan sus respectivas salidas sin notas de precaución

### 8.2 Caso de uso: Acceso parcial

**Escenario:** No se pudo acceder a la cubierta (inquilino ausente). El resto de la vivienda se inspeccionó con normalidad.

**Flujo:**
1. AT completa la inspección parcial
2. Sistema sugiere confianza global: Media (por acceso parcial)
3. AT confirma: confianza global Media
4. Confianza por módulos: Cerramientos → Media (cubierta no inspeccionada), el resto → Alta
5. RF-004 muestra: Confianza Media para beneficios relacionados con la cubierta
6. AT añade nota: "No se pudo inspeccionar la cubierta. Las recomendaciones relacionadas con el tejado tienen margen de error."

### 8.3 Caso de uso: Equipos no calibrados

**Escenario:** El AT descubre durante la inspección que su cámara termográfica no está calibrada.

**Flujo:**
1. AT detecta el problema
2. RN-RF002-004 activa: confianza global automáticamente Baja
3. AT registra la incidencia en el Justification Log
4. El documento muestra confianza Baja con la explicación
5. AT recomienda al cliente: "Repetir la inspección con equipos calibrados, sin coste adicional"

### 8.4 Caso de uso: AT justifica por qué la confianza es mayor que la sugerida

**Escenario:** El acceso fue parcial (80% de estancias), pero el AT conoce bien el inmueble porque lo inspeccionó hace 2 años.

**Flujo:**
1. Sistema sugiere: confianza Media (acceso parcial < 100%)
2. AT sobrescribe: confianza Alta
3. Justificación: "Conozco el inmueble de una inspección anterior (2024). Los datos de la cubierta ya estaban documentados. El acceso parcial no afecta a la fiabilidad."
4. El Justification Log registra el cambio
5. El documento muestra confianza Alta

---

## 9. Casos límite

### 9.1 Cliente que no confía en el diagnóstico aunque la confianza sea alta

**Manejo:** El cliente puede solicitar una segunda inspección o una segunda opinión de otro AT. La plataforma soporta este flujo.

### 9.2 Todos los módulos tienen confianza baja

**Manejo:** La plataforma recomienda repetir la inspección antes de continuar con RF-003 y RF-004. El AT puede optar por continuar si considera que hay suficiente información para recomendaciones parciales.

### 9.3 Confianza alta en módulos que no son relevantes para las recomendaciones

**Manejo:** No es un problema. La confianza alta en cualquier módulo es información útil. RF-004 solo muestra la confianza de los módulos que afectan a cada beneficio.

### 9.4 El cliente rechaza el nivel de confianza asignado

**Manejo:** El nivel de confianza es una valoración profesional del AT. Si el cliente no está de acuerdo, puede solicitar una segunda opinión. La plataforma no permite que el cliente modifique el nivel de confianza.

---

## 10. Criterios de aceptación

### 10.1 Criterios funcionales

| ID | Criterio | Verificación |
|----|----------|--------------|
| **CA-RF002-001** | Toda inspección tiene un nivel de confianza global asignado | Dato |
| **CA-RF002-002** | El cliente ve el nivel de confianza global al inicio del documento de decisiones | Visual |
| **CA-RF002-003** | El cliente ve el nivel de confianza por módulos si lo solicita | Visual |
| **CA-RF002-004** | El lenguaje del nivel de confianza es claro para un propietario no técnico | Texto |
| **CA-RF002-005** | RF-003 recibe el nivel de confianza global y por módulo | Dato |
| **CA-RF002-006** | RF-004 recibe el nivel de confianza por módulo para cada beneficio | Dato |
| **CA-RF002-007** | El AT puede ajustar el nivel de confianza y registrar justificación | Funcional |
| **CA-RF002-008** | Si confianza global es Baja, el sistema sugiere repetir inspección | Regla |

### 10.2 Criterios no funcionales

| ID | Criterio | Objetivo |
|----|----------|----------|
| **CA-RF002-NF-001** | El nivel de confianza se entiende en ≤5 segundos por un propietario no técnico | Usabilidad |
| **CA-RF002-NF-002** | El AT puede asignar el nivel de confianza en ≤2 minutos | Eficiencia |
| **CA-RF002-NF-003** | Los niveles de confianza se comunican sin tecnicismos | Accesibilidad |

---

## 11. Preguntas abiertas resueltas

| # | Pregunta | Resolución |
|---|----------|------------|
| 1 | ¿RF-002 es un requisito independiente o parte de RF-001? | **Independiente.** RF-001 recoge los datos del inmueble. RF-002 valida la fiabilidad de esos datos. |
| 2 | ¿El cliente puede modificar el nivel de confianza? | **No.** Es una valoración profesional del AT. |
| 3 | ¿RF-002 requiere nuevos datos de PITR? | **No.** Opera sobre los mismos datos de la inspección. Añade una capa de validación sobre ellos. |
| 4 | ¿Qué ocurre si RF-002 no se implementa? | RF-003 y RF-004 no tendrían contexto de fiabilidad. El cliente recibiría recomendaciones sin saber si puede confiar en ellas. |
| 5 | ¿RF-002 se comunica al cliente en todos los casos? | **Sí, siempre.** Incluso si la confianza es Alta, se muestra para que el cliente sepa que el diagnóstico es fiable. |

---

## 12. Changelog

| Fecha | Versión | Autor | Cambio |
|-------|---------|-------|--------|
| 2026-07-07 | v1.0 | Sistema | Versión inicial. Formalización de RF-002 como documento independiente a partir del concepto aprobado en REVISION-HORIZONTAL-CAPA1.md y las referencias en RF-003 y RF-004. Contenido conceptual sin modificar. |

---

*Fin del documento RF-002-NIVEL-DE-CONFIANZA.md*