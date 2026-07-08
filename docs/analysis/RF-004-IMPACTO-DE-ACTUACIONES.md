# RF-004 — Beneficios Esperados de las Actuaciones

> **Documento:** RF-004-IMPACTO-DE-ACTUACIONES.md
> **Versión:** v2.0 — Análisis conceptual (pre-PRD). Reframing a beneficios para el cliente.
> **Estado:** 🔵 ANÁLISIS — Pendiente de aprobación para integrar en PRD
> **Depende de:** RF-003 (Jerarquía de Decisiones), PRD-001 V2
> **Patrón alineado:** Analizar → Recomendar → Revisar → Decidir → Registrar

---

## Índice

1. Problema del cliente que resuelve RF-004
2. ¿Qué decisión ayuda a tomar?
3. Reframing: del análisis a los beneficios
4. Beneficios esperados que comunica RF-004
5. Beneficios MVP vs V2+
6. Formato de comunicación: lenguaje del cliente
7. Validación contra P1-P4
8. Casos de uso
9. Casos límite
10. Criterios de aceptación
11. Preguntas abiertas resueltas
12. Changelog

---

## 1. ¿Qué problema del cliente resuelve realmente RF-004?

### 1.1 El problema no es "no saber cuánto ahorrar"

El PRD V2 definió RF-004 como *"Proponer mejoras con estimación de ahorro económico anual"*. Esta definición asume que el problema del cliente es **no tener una cifra de ahorro**.

La evidencia del mercado (MARKET-RESEARCH-ATI03-VALIDATION, GTM-001-BUYER-PERSONAS) muestra que el problema real es diferente:

| Lo que parece | Lo que es |
|---------------|-----------|
| "No sé cuánto dinero ahorraría" | "No sé si merece la pena hacer esta obra" |
| "Dame una cifra" | "Ayúdame a entender cómo cambiará mi casa" |
| "¿Cuánto recupero?" | "¿Mi casa va a ser más habitable, más valiosa, más eficiente?" |

**El dolor real del cliente no es la falta de una cifra económica. Es la incapacidad de visualizar cómo cambiará su vivienda.**

### 1.2 El problema del propietario

El propietario que recibe recomendaciones técnicas se enfrenta a:

1. **Parálisis por comparación**: "Tengo 5 recomendaciones, cada una con un coste y un ahorro diferente. ¿Cómo comparo?"
2. **Incapacidad de visualizar el resultado**: "Si aíslo fachada, ¿la casa será más cálida en invierno? ¿dejaré de tener humedades?"
3. **Miedo a la inversión sin retorno claro**: "Invierto 8.000€ pero ¿realmente mi casa va a valer más?"
4. **Confusión entre actuaciones**: "El aislamiento cuesta más pero ahorra más. La caldera cuesta menos pero dura menos. ¿Qué elijo?"

### 1.3 El problema del Arquitecto Técnico

El AT necesita:

1. **Justificar cada recomendación al cliente** con argumentos que el cliente entienda
2. **Ayudar al cliente a priorizar** cuando hay múltiples actuaciones posibles
3. **Gestionar expectativas**: "El ahorro es una estimación, no una garantía"

> 🔵 **Problema confirmado:** El producto actual resuelve "generar recomendaciones" pero no "ayudar al cliente a entender qué cambiará en su vivienda". RF-004 debe cerrar esa brecha comunicando el valor esperado, no más datos.

---

## 2. ¿Qué decisión ayuda a tomar?

RF-004 ayuda al cliente a responder **una única pregunta**:

> **"Si invierto en esta actuación, ¿cómo cambiará mi vivienda?"**

A partir de esa respuesta, el cliente puede decidir:

| Decisión | Lo que RF-004 le muestra |
|----------|--------------------------|
| **Invertir ahora** | "El cambio en mi vivienda justifica el coste" |
| **Planificar a futuro** | "El cambio es moderado, lo haré cuando tenga presupuesto" |
| **Descartar** | "El cambio es pequeño o irrelevante para mí" |
| **Solicitar presupuesto** | "El cambio potencial merece pedir una oferta detallada" |
| **Comparar actuaciones** | "Entre la opción A y la B, ¿cuál transforma más mi casa?" |

**La decisión final es del cliente.** La plataforma presenta los beneficios esperados. El AT revisa y recomienda. El cliente decide.

### 2.1 Relación con el flujo completo

```
RF-002: Validación → RF-003: Jerarquía → RF-004: Beneficios esperados
  (¿es correcto?)      (¿qué es prioritario?)    (¿cómo cambia mi vivienda?)
```

RF-004 se aplica **sobre las actuaciones priorizadas por RF-003**. No genera nuevas actuaciones. Comunica los beneficios de las que ya han sido identificadas como relevantes.

---

## 3. Reframing: del análisis a los beneficios

### 3.1 Por qué "impacto multidimensional" no es el lenguaje del cliente

El concepto de "análisis de impacto multidimensional en económico, energético y confort" tiene un problema fundamental:

El cliente no piensa en dimensiones. Piensa en su vivienda.

| Lenguaje técnico | Lenguaje del cliente |
|------------------|---------------------|
| "Impacto en dimensión económica" | "¿Cuánto me ahorraré al año?" |
| "Impacto en dimensión energética" | "¿Mejorará la letra del certificado?" |
| "Impacto en dimensión confort" | "¿La casa será más cálida en invierno?" |
| "Perfil multidimensional" | "¿Merece la pena hacer esta obra?" |
| "Dashboard de impacto" | "A ver, explícame rápido qué gano" |

### 3.2 El concepto correcto: Beneficios esperados para el cliente

**RF-004 no presenta dimensiones técnicas. Responde "¿qué gano si hago esto?"**

La estructura de cada tarjeta debe responder siempre a **cuatro preguntas en orden fijo**:

1. **¿Qué beneficios puedo esperar?** — Ahorro económico, mejora de confort, salto de calificación
2. **¿Cuánto cuesta?** — Coste estimado en horquilla
3. **¿Cuándo empezaré a notar la mejora?** — Plazo de retorno en confort y payback económico estimado
4. **¿Por qué el Arquitecto Técnico me recomienda esta actuación?** — Justificación del AT con base en los datos PITR

Este orden se mantiene idéntico en todas las actuaciones para que el cliente aprenda a leerlas automáticamente y pueda comparar sin esfuerzo.

Cada actuación se comunica como un conjunto de **beneficios esperados**, organizados de forma que el cliente entienda en segundos qué cambiará en su vivienda.

```
ESTADO ACTUAL                    ESTADO MEJORADO
┌──────────────┐                ┌──────────────┐
│ Factura 200€/│                │ Factura 100€/│
│ mes          │                │ mes          │
│              │  ── RF-004 ──►│              │
│ 16°C invierno│   responde    │ 20°C invierno│
│ Letra F      │   "¿qué       │ Letra C      │
│ Corrientes   │    gano?"     │ Sin corrientes│
│ frías        │                │              │
└──────────────┘                └──────────────┘
```

### 3.3 Definición actualizada de RF-004

> **RF-004 no es un sistema de evaluación de impacto. Es un sistema que comunica los beneficios esperados de cada actuación en el lenguaje del cliente, permitiéndole entender en segundos cómo cambiará su vivienda y decidir si merece la pena.**

### 3.4 Principio rector: Evidencia, no catálogo

Los beneficios que comunica RF-004 deben cumplir:

1. **Basados en datos PITR** — No son afirmaciones genéricas de catálogo. Se calculan a partir de las mediciones reales del inmueble.
2. **Personalizados para la vivienda** — "Tu casa pasará de 16°C a 20°C", no "el aislamiento mejora el confort".
3. **En horquillas, no cifras exactas** — "Ahorro de 300-500€/año", no "Ahorro exacto: 412,37€".
4. **Revisables por el AT** — El Arquitecto Técnico puede ajustar cualquier beneficio y justificar el cambio.

---

## 4. Beneficios esperados que comunica RF-004

### 4.1 Los cuatro beneficios que el cliente percibe

RF-004 organiza la información como **respuestas a las preguntas que el cliente se hace**:

| # | El cliente pregunta | RF-004 responde |
|---|-------------------|-----------------|
| 1 | **"¿Cuánto dinero me ahorraré?"** | Ahorro anual esperado (horquilla) + porcentaje sobre factura actual |
| 2 | **"¿Será mi casa más confortable?"** | Cambio de temperatura, eliminación de corrientes, estabilidad térmica |
| 3 | **"¿Mejorará la calificación energética?"** | Salto de letra (ej: E → C) + reducción de consumo |
| 4 | **"¿Qué más supone para mí?"** (cuando aplica) | Mantenimiento, normativa, valor del inmueble |

### 4.2 Cómo se expresan los beneficios

Cada beneficio se comunica en **una frase breve** que el cliente entiende en segundos:

| Beneficio | Frase ejemplo |
|-----------|---------------|
| **Ahorro económico** | "Ahorrarás entre 300 y 500€ al año en calefacción, aproximadamente un 25% de tu factura actual" |
| **Confort térmico** | "Tu casa pasará de 16°C a 19-20°C en invierno. Se eliminarán las corrientes frías junto a las ventanas" |
| **Mejora energética** | "Tu certificado pasará de F a C. Reducirás el consumo de calefacción un 40%" |
| **Mantenimiento** (V2) | "Los nuevos equipos requieren 1 revisión al año. Vida útil estimada: 15 años" |
| **Cumplimiento normativo** (V2) | "Esta actuación alinea tu vivienda con los requisitos de la EPBD 2030 sobre eficiencia energética" |
| **Valor del inmueble** (V2) | "Una mejora de F a C puede incrementar el valor de mercado de la vivienda" |

### 4.3 Regla: beneficios personalizados, no plantillas

Cada beneficio debe estar **basado en los datos PITR de esa vivienda concreta**:

| ✅ Correcto | ❌ Incorrecto |
|------------|---------------|
| "Tu casa pasará de 16°C a 20°C" | "El aislamiento mejora el confort" |
| "Ahorrarás 300-500€/año según tu tarifa actual de 0,15€/kWh" | "El aislamiento ahorra dinero" |
| "Pasarás de letra F a C (consumo de 180 a 95 kWh/m² año)" | "Mejora la calificación energética" |

### 4.4 Tractabilidad al dato original

Cada beneficio debe poder rastrearse a los datos que lo sustentan:

- **Ahorro económico** → Consumo actual PITR + tarifa aplicada + consumo mejorado estimado
- **Confort** → Temperatura superficial medida + diferencia con temperatura objetivo
- **Energética** → Demanda actual vs mejorada (transmitancia, infiltraciones)
- **Normativa** (V2) → Artículo concreto de EPBD o CTE aplicable

---

## 5. Beneficios MVP vs V2+

### 5.1 Decisión de alcance MVP

| Beneficio para el cliente | MVP | V2+ | Justificación |
|---------------------------|:---:|:---:|---------------|
| **"¿Cuánto ahorraré?"** (económico) | ✅ | — | Es lo primero que pregunta el cliente. Medible desde PITR + tarifas medias |
| **"¿Será más confortable?"** (confort térmico) | ✅ | — | Es la dimensión emocional. El cliente "siente" si su casa es confortable |
| **"¿Mejorará la letra?"** (energético) | ✅ | — | Es el indicador que el cliente conoce del certificado energético |
| **"¿Cuánto durará?"** (mantenimiento) | ❌ | ✅ | Requiere datos de vida útil de equipos. No está en PITR V1 |
| **"¿Cumpliré la normativa?"** (cumplimiento) | ❌ | ✅ | Requiere mapeo de EPBD + CTE por año de construcción |
| **"¿Valdrá más mi casa?"** (valor inmueble) | ❌ | ✅ | Requiere datos de mercado inmobiliario + tasaciones |

### 5.2 Justificación de incluir confort en MVP

El confort es el beneficio que **más valora el cliente** según los estudios de mercado (MARKET-RESEARCH-ATI03-VALIDATION). Un cliente puede ignorar un ahorro de 200€/año si la casa sigue siendo fría en invierno. Pero una mejora de confort percibida puede motivar una inversión aunque el ahorro sea bajo.

**PITR puede estimar en V1:**
- Diferencia de temperatura entre estancias
- Eliminación de puentes térmicos identificados
- Mejora de temperatura superficial en cerramientos

**No puede estimar en V1:**
- Confort acústico (requiere medidores de ruido) → V2
- Calidad del aire interior (requiere sensores) → V2

**Límite MVP del confort:** Solo se comunica el confort térmico (temperatura). El confort acústico y la calidad del aire se documentan como V2.

### 5.3 Esquema MVP

```
MVP RF-004
┌─────────────────────────────────────────────────────────┐
│  🏠 AISLAMIENTO DE FACHADA (SATE)                       │
│  ─────────────────────────────────────────               │
│                                                          │
│  1️⃣ ¿QUÉ BENEFICIOS PUEDO ESPERAR?                     │
│     Ahorro económico: 300-500€/año (~25% factura)        │
│     Confort: 16°C → 19-20°C en invierno                  │
│     Calificación: F → C (consumo calefacción -40%)       │
│                                                          │
│  2️⃣ ¿CUÁNTO CUESTA?                                     │
│     Inversión estimada: 7.000-9.000€                     │
│                                                          │
│  3️⃣ ¿CUÁNDO EMPEZARÉ A NOTAR LA MEJORA?                 │
│     Confort: inmediatamente tras la instalación          │
│     Retorno económico estimado: 15-25 años               │
│                                                          │
│  4️⃣ ¿POR QUÉ EL ARQUITECTO TÉCNICO RECOMIENDA          │
│      ESTA ACTUACIÓN?                                     │
│     "Es la medida con mayor impacto en tu vivienda.      │
│      El PITR ha detectado pérdidas de calor críticas     │
│      en fachada. Sin este aislamiento, cualquier otra     │
│      mejora tendrá un efecto limitado."                  │
│                                                          │
│  🔍 Confianza de esta estimación: Alta                   │
└─────────────────────────────────────────────────────────┘
```

**Sin barras, sin porcentajes de impacto, sin dashboard. Cuatro preguntas en orden fijo, consistentes en todas las actuaciones.**

---

## 6. Formato de comunicación: lenguaje del cliente

### 6.1 Principio: el formato debe hacer evidente el valor, no mostrar más datos

RF-004 no necesita un dashboard. Necesita un **formato de comunicación** que:

1. Se entienda en segundos
2. Responda a "¿qué gano?"
3. Permita comparar actuaciones
4. No requiera interpretación técnica

### 6.2 Formato único para MVP: Tarjeta de beneficios

Cada actuación se presenta en una **tarjeta única** que responde siempre a **cuatro preguntas en orden fijo**:

```
┌─────────────────────────────────────────────────────────┐
│  🏠 AISLAMIENTO DE FACHADA (SATE)                       │
│  ─────────────────────────────────────────               │
│                                                          │
│  1️⃣ ¿QUÉ BENEFICIOS PUEDO ESPERAR?                     │
│     Ahorro económico: 300-500€/año (~25% factura)        │
│     Confort: 16°C → 19-20°C en invierno                  │
│     Calificación: F → C (consumo calefacción -40%)       │
│                                                          │
│  2️⃣ ¿CUÁNTO CUESTA?                                     │
│     Inversión estimada: 7.000-9.000€                     │
│                                                          │
│  3️⃣ ¿CUÁNDO EMPEZARÉ A NOTAR LA MEJORA?                 │
│     Confort: inmediatamente tras la instalación          │
│     Retorno económico estimado: 15-25 años               │
│                                                          │
│  4️⃣ ¿POR QUÉ EL ARQUITECTO TÉCNICO RECOMIENDA          │
│      ESTA ACTUACIÓN?                                     │
│     "Es la medida con mayor impacto en tu vivienda.      │
│      El PITR ha detectado pérdidas de calor críticas     │
│      en fachada. Sin este aislamiento, cualquier otra     │
│      mejora tendrá un efecto limitado."                  │
│                                                          │
│  🔍 Confianza de esta estimación: Alta                   │
│  ℹ️  El AT puede ajustar esta información                │
└─────────────────────────────────────────────────────────┘
```

**⚠️ Requisito obligatorio:** Este orden (1→2→3→4) debe mantenerse idéntico en todas las tarjetas de todas las actuaciones. El cliente debe encontrar siempre la misma estructura al leer cualquier recomendación.

### 6.3 Formato de comparación entre actuaciones

Para comparar, se muestran tarjetas lado a lado con los beneficios de cada actuación:

```
┌──────────────────────┐  ┌──────────────────────┐
│ AISLAMIENTO FACHADA  │  │ CALDERA CONDENSACIÓN  │
│                       │  │                       │
│ 300-500€/año ahorro  │  │ 150-250€/año ahorro   │
│ 16°C → 19-20°C       │  │ 16°C → 17°C           │
│ F → C                │  │ F → D                 │
│ 7.000-9.000€         │  │ 3.000-4.000€          │
│                       │  │                       │
│ 🟢 Más beneficio     │  │ 🟡 Menor inversión    │
└──────────────────────┘  └──────────────────────┘
```

### 6.4 Comparación con el formato anterior

| Aspecto | v1 (dashboard) | v2 (beneficios) — ACTUAL |
|---------|---------------|--------------------------|
| Lenguaje | "Dimensión económica, energética, confort" | "Ahorro, confort, mejora energética" |
| Visualización | Barras de 0-100% | Texto en lenguaje claro con cifras |
| Métrica principal | "Impacto: 65%" | "300-500€/año" |
| Lo que comunica | "Perfil de impacto" | "Qué cambia en tu vivienda" |
| Quién lo entiende | Cliente técnico o asesorado | Cualquier propietario |
| Tiempo de comprensión | 15-30s | 5-10s |

### 6.5 Qué NO hará RF-004

| No hacer | Por qué |
|----------|---------|
| Nota única "Impacto: 7.4/10" | Oculta los beneficios. El cliente necesita saber el qué, no un resumen numérico |
| Semáforo 🟢/🟡/🔴 | Demasiado simplificado. No permite comparar ni entender el cambio real |
| Barras de 0-100% | Son abstractas. El cliente no sabe qué significa "65% de impacto" |
| Dashboard con indicadores técnicos | Convierte la decisión del cliente en un ejercicio técnico |
| Ponderaciones entre beneficios | El sistema no decide qué es más importante para cada cliente |

### 6.6 Regla de diseño: cuatro preguntas, siempre en el mismo orden

Cada tarjeta de beneficios debe responder siempre a **las mismas cuatro preguntas, en este orden exacto**:

1. **¿Qué beneficios puedo esperar?**
2. **¿Cuánto cuesta?**
3. **¿Cuándo empezaré a notar la mejora?**
4. **¿Por qué el Arquitecto Técnico me recomienda esta actuación?**

**Este orden es idéntico en todas las actuaciones**, sin excepción. El cliente debe encontrar siempre la misma estructura, lo que le permite:
- Aprender a leer las tarjetas en segundos
- Comparar actuaciones sin reajustar su atención a diferentes formatos
- Reducir la carga cognitiva al evaluar múltiples opciones

Cada tarjeta debe poder leerse en **5-10 segundos** y el cliente debería poder decidir **sin tener que interpretar gráficos ni indicadores**.

---

## 7. Validación contra P1-P4

### 7.1 P1 — Adriana López (propietaria que vende)

**Problema:** Adriana sospecha que su certificado B está inflado. Necesita saber si las mejoras propuestas aumentarán el valor de su piso de cara a la venta.

**¿RF-004 le responde?** ✅ Sí

**Cómo:**
- RF-004 le muestra que aislar fachada mejora la calificación de B a A (beneficio energético)
- RF-004 le muestra el confort ganado (beneficio para visitas y venta)
- La dimensión "valor del inmueble" no está en MVP, pero la mejora de calificación sirve como proxy: "tu piso tendrá mejor letra, eso se ve en la venta"

### 7.2 P2 — Comprador de vivienda

**Problema:** Está evaluando comprar una casa con certificado E y necesita saber el coste real futuro.

**¿RF-004 le responde?** ✅ Sí

**Cómo:**
- RF-004 muestra el ahorro económico esperado: "300-500€/año menos en factura"
- RF-004 muestra la mejora de calificación (energético)
- RF-004 muestra el confort ganado
- **P2 puede decidir:** "Compro y asumo el coste actual", "Compro y reformo (sé qué cambio obtengo)", "No compro"

### 7.3 P3 — Comunidad de propietarios

**Problema:** Necesita justificar ante los vecinos qué obras merecen la pena y en qué orden.

**¿RF-004 le responde?** ✅ Sí

**Cómo:**
- Cada vecino puede leer en segundos los beneficios de cada actuación
- El lenguaje claro permite que vecinos no técnicos entiendan el valor
- La comparación entre tarjetas facilita el debate informado

### 7.4 P4 — Inversor / Propietario de cartera

**Problema:** Necesita priorizar inversiones en múltiples inmuebles con criterios de rentabilidad.

**¿RF-004 le responde?** ⚠️ Parcialmente (con matiz V2)

**Cómo:**
- RF-004 le da el ahorro económico y la inversión de cada actuación
- Puede comparar retornos simples entre inmuebles
- Pero P4 necesita métricas financieras más sofisticadas (TIR, VAN) → documentado como V2

---

## 8. Casos de uso

### 8.1 Caso de uso 1: Actuación con beneficios claros

**Escenario:** Vivienda unifamiliar con calificación G. Se recomienda aislamiento de cubierta.

**Flujo:**
1. RF-003 clasifica la actuación como prioridad alta
2. RF-004 genera los beneficios:
   - **Ahorro:** "600-800€/año menos en calefacción (~30% de tu factura)"
   - **Confort:** "Tu casa pasará de 14°C a 18-19°C en invierno. Adiós a las habitaciones frías"
   - **Energético:** "Pasarás de G a E. Reducción de consumo del 45%"
3. AT revisa, confirma valores, ajusta horquilla si es necesario
4. **Cliente:** "Con este cambio, mi casa será mucho más habitable. Quiero presupuesto."

### 8.2 Caso de uso 2: Dos actuaciones, diferentes beneficios

**Escenario:** Vivienda con calificación E. Se comparan "Aislamiento fachada" vs "Caldera condensación".

**Flujo:**
1. RF-004 genera tarjetas lado a lado:
   - **Aislamiento:** Ahorro 300-500€/año · 16°C→20°C · F→C · 8.000€
   - **Caldera:** Ahorro 150-250€/año · 16°C→17°C · F→D · 3.500€
2. AT añade nota: "El aislamiento tiene más beneficio a largo plazo, pero la caldera es más asequible ahora"
3. **Cliente:** "El aislamiento transforma más la casa. Prefiero esperar y hacer esa."

### 8.3 Caso de uso 3: Actuación con beneficio bajo pero notable

**Escenario:** Vivienda con certificado correcto. Se recomienda "Sellar puertas y ventanas".

**Flujo:**
1. RF-003 clasifica como mejora opcional
2. RF-004 genera beneficios:
   - **Ahorro:** "80-120€/año (bajo, pero la inversión es solo de 200€)"
   - **Confort:** "Se eliminan las corrientes frías. Notarás el cambio inmediatamente"
   - **Energético:** "Mejora marginal en la calificación"
3. AT añade: "Bajo coste (200€), beneficio inmediato en confort"
4. **Cliente:** "Por 200€, eliminar corrientes merece la pena aunque el ahorro sea pequeño"

### 8.4 Caso de uso 4: AT corrige los beneficios esperados

**Escenario:** AT detecta que el ahorro estimado es demasiado optimista para una vivienda con orientación norte y sombra de edificio colindante.

**Flujo:**
1. Sistema genera: "Ahorro 500€/año"
2. AT corrige: "La orientación norte y la sombra reducen el potencial solar pasivo. Ahorro real estimado: 300-400€/año"
3. El cambio queda registrado en el **Registro de Justificación** (patrón RF-003)
4. **Cliente:** Recibe la horquilla corregida. Confía más porque el AT ha ajustado a su caso.

### 8.5 Caso de uso 5: Paquete de actuaciones

**Escenario:** Se recomienda "Aislamiento fachada + Ventanas triple acristalamiento + Caldera condensación" como paquete.

**Flujo:**
1. RF-004 evalúa cada actuación individual
2. El sistema genera una **tarjeta combinada** del paquete con beneficios totales (nota: los beneficios no son estrictamente aditivos)
3. AT revisa sinergias y ajusta duplicidades
4. **Cliente:** Ve el beneficio global del "Plan de rehabilitación integral"

---

## 9. Casos límite

### 9.1 Beneficio negativo en algún aspecto

**Escenario:** Mejorar aislamiento puede reducir la ventilación natural, empeorando la calidad del aire interior.

**Manejo:** RF-004 debe señalar efectos secundarios:
- **Confort:** "Tu casa será más cálida. Recomendación: instala ventilación mecánica para evitar problemas de humedad"
- AT confirma o descarta el riesgo

### 9.2 Horquilla muy amplia

**Escenario:** El coste de una actuación varía enormemente según el profesional (ej: aerotermia: 8.000-15.000€).

**Manejo:** Las horquillas se muestran como rango:
- Inversión: 8.000-15.000€
- Ahorro: 400-700€/año
- El AT puede ajustar según su conocimiento del mercado local

### 9.3 Actuación sin ahorro económico pero con alto confort

**Escenario:** Sellar puertas cuesta 200€. Ahorro estimado: 30€/año. Pero el confort mejora notablemente.

**Manejo:** RF-004 no elimina actuaciones con bajo ahorro económico si el confort es alto. El cliente decide según sus prioridades. La tarjeta muestra ambos beneficios y el cliente valora.

### 9.4 Actuación obligatoria por normativa

**Escenario:** Una comunidad debe instalar un ascensor (normativa accesibilidad). No hay ahorro económico ni mejora energética.

**Manejo:** RF-004 no es aplicable. Se documenta como "Fuera del alcance de RF-004: la decisión es normativa, no de beneficio para el cliente."

### 9.5 Vivienda sin margen de mejora

**Escenario:** Vivienda ya con calificación A y consumo casi nulo.

**Manejo:** RF-004 devuelve:
- **Ahorro:** "Sin margen de mejora significativo"
- **Confort:** "Tu vivienda ya está en condiciones óptimas"
- **Energético:** "Calificación máxima alcanzada"
- AT confirma y cierra el caso

### 9.6 Datos insuficientes para estimar beneficios

**Escenario:** PITR no ha podido medir alguna variable clave (ej: no se pudo acceder a la cubierta).

**Manejo:** RF-004 indica que la estimación tiene "confianza baja" y muestra la variable faltante. El AT puede completar el dato manualmente.

---

## 10. Criterios de aceptación

### 10.1 Reglas de negocio

| ID | Regla | Tipo |
|----|-------|------|
| **RN-RF004-001** | Toda actuación priorizada por RF-003 debe tener una tarjeta de beneficios RF-004 | Obligatorio |
| **RN-RF004-002** | La tarjeta responde siempre a las 4 preguntas en orden fijo: beneficios, inversión, plazos, justificación del AT | Obligatorio |
| **RN-RF004-003** | No se genera una nota numérica única ni un porcentaje de impacto compuesto | Prohibido |
| **RN-RF004-004** | Las cifras usan horquillas o rangos, no valores exactos | Obligatorio |
| **RN-RF004-005** | El AT puede ajustar cualquier beneficio de la tarjeta | Obligatorio |
| **RN-RF004-006** | Todo ajuste del AT queda registrado en el Registro de Justificación (patrón RF-003) | Obligatorio |
| **RN-RF004-007** | Actuaciones con ahorro < 50€/año no se eliminan si tienen beneficio significativo en confort | Excepción |
| **RN-RF004-008** | Actuaciones puramente normativas sin beneficio energético ni de confort no requieren tarjeta RF-004 | Excepción |

### 10.2 Criterios de aceptación funcionales

| ID | Criterio | Verificación |
|----|----------|--------------|
| **CA-RF004-001** | Cada actuación muestra sus beneficios en formato de tarjeta de texto claro | Visual |
| **CA-RF004-002** | La tarjeta incluye ahorro anual en horquilla (ej: "300-500€/año") | Dato |
| **CA-RF004-003** | La tarjeta incluye inversión estimada en horquilla | Dato |
| **CA-RF004-004** | La tarjeta incluye mejora de calificación energética (ej: "F → C") | Dato |
| **CA-RF004-005** | La tarjeta incluye descripción del cambio de confort en lenguaje cotidiano | Texto |
| **CA-RF004-006** | Se puede comparar visualmente hasta 5 actuaciones lado a lado | Interfaz |
| **CA-RF004-007** | AT puede editar cualquier beneficio y registrar justificación | Funcional |
| **CA-RF004-008** | Sistema indica nivel de confianza para cada estimación (Alta/Media/Baja) | Dato |
| **CA-RF004-009** | No se muestra ninguna nota numérica compuesta ni porcentaje de impacto | Ausencia |
| **CA-RF004-010** | Los beneficios incluyen siempre el contexto de la vivienda concreta (no texto genérico) | Contenido |

### 10.3 Criterios de aceptación no funcionales

| ID | Criterio | Objetivo |
|----|----------|----------|
| **CA-RF004-NF-001** | Una tarjeta de beneficios debe entenderse en ≤10 segundos por un propietario no técnico | Usabilidad |
| **CA-RF004-NF-002** | La comparación entre actuaciones debe permitir decisión en ≤30 segundos | Usabilidad |
| **CA-RF004-NF-003** | Lenguaje claro (ESO, nivel 12-14 años) sin tecnicismos | Accesibilidad |
| **CA-RF004-NF-004** | La generación de beneficios debe ser automática desde datos PITR | Eficiencia |
| **CA-RF004-NF-005** | AT debe poder ajustar la tarjeta en ≤2 minutos por actuación | Eficiencia |

---

## 11. Preguntas abiertas resueltas

### 11.1 ¿RF-004 es una "calculadora de ahorro"?

**Respuesta:** No. RF-004 comunica los beneficios esperados de una actuación. El ahorro económico es uno de esos beneficios, no el único.

### 11.2 ¿Cómo se comparan los beneficios entre actuaciones?

**Respuesta:** Mostrando las tarjetas lado a lado con el mismo formato. El cliente compara visualmente: "En esta actuación ahorro más, en esta otra gano más confort". El sistema no pondera ni decide qué es mejor.

### 11.3 ¿RF-004 puede generar recomendaciones nuevas?

**Respuesta:** No. RF-004 comunica los beneficios de actuaciones ya identificadas por PITR y priorizadas por RF-003.

### 11.4 ¿Qué ocurre si una actuación no tiene beneficio en alguna categoría?

**Respuesta:** La categoría se muestra como "Sin cambio significativo" en lugar de ocultarse. La transparencia es un principio del producto.

### 11.5 ¿Los beneficios V2 (mantenimiento, normativa, valor) se pueden añadir sin cambiar el PRD?

**Respuesta:** Sí. El PRD define los 3 beneficios MVP como requisito. Los beneficios V2 son extensiones metodológicas que no requieren cambio de PRD.

### 11.6 ¿Cómo se estima el confort sin sensores físicos?

**Respuesta:** Se estima a partir de:
- Temperatura superficial de cerramientos (medición PITR)
- Existencia de puentes térmicos (inspección visual PITR)
- Infiltraciones (test de presurización si aplica)
- Diferencia de temperatura entre estancias (si se midió)

La precisión se indica en el nivel de confianza.

### 11.7 ¿RF-004 requiere nuevos datos de PITR más allá de los de RF-003?

**Respuesta:** Parcialmente. RF-003 usa los datos de diagnóstico (problemas identificados). RF-004 necesita además:
- Costes de referencia de actuaciones (base de datos interna, metodológica, no en PRD)
- Relación entre mejora técnica y mejora de calificación (tabla de correspondencia)
- Relación entre mejora técnica y cambio de confort (modelo simplificado)

Estos datos son parte de la metodología interna, no del PRD.

---

## 12. Changelog

| Fecha | Versión | Autor | Cambio |
|-------|---------|-------|--------|
| 2026-07-07 | v1.0 | Análisis | Versión inicial. Reframing de "ahorro" a "impacto multidimensional". Dashboard con barras. |
| 2026-07-07 | v2.0 | Análisis | **Reframing a beneficios para el cliente.** Eliminado el dashboard y las barras de impacto. Sustituido por tarjetas de beneficios en lenguaje claro. Las "dimensiones" pasan a ser "beneficios que el cliente entiende". El formato único MVP es texto con cifras, no indicadores visuales. Actualizados todos los casos de uso, criterios y reglas de negocio. |
| 2026-07-07 | v2.1 | Análisis | **Ajuste de diseño: estructura fija de 4 preguntas.** Cada tarjeta responde siempre en orden fijo a: (1) beneficios, (2) inversión, (3) plazos, (4) justificación del AT. Regla obligatoria: mismo orden en todas las actuaciones para facilitar comparación y reducir carga cognitiva. |

---

*Fin del documento RF-004-IMPACTO-DE-ACTUACIONES.md*