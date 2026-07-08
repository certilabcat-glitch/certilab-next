# RF-005 — Inversión y Retorno

> **Documento:** RF-005-INVERSION-RETORNO.md
> **Versión:** v1.0 — Análisis conceptual (pre-PRD). Definición del sistema de inversión y retorno para cada actuación.
> **Estado:** 🔵 ANÁLISIS — Pendiente de aprobación para integrar en PRD
> **Depende de:** RF-003 (Jerarquía de Decisiones), RF-004 (Beneficios Esperados), PRD-001 V2
> **Patrón alineado:** Analizar → Recomendar → Revisar → Decidir → Registrar

---

## Índice

1. Problema del cliente que resuelve RF-005
2. ¿Qué decisión ayuda a tomar?
3. Reframing: del ROI técnico al veredicto de inversión
4. El sistema de clasificación: "Merece la pena / Valóralo / No recomendado"
5. Criterios de clasificación
6. MVP vs V2+
7. Formato de comunicación
8. Relación con RF-004 (Beneficios Esperados)
9. Validación contra P1-P4
10. Casos de uso
11. Casos límite
12. Reglas de negocio
13. Criterios de aceptación
14. Preguntas abiertas resueltas
15. Changelog

---

## 1. ¿Qué problema del cliente resuelve realmente RF-005?

### 1.1 El problema no es "no saber el retorno"

El PRD V2 definió RF-005 como *"Estimar costes + calcular retorno de inversión por actuación"*. Esta definición asume que el problema del cliente es **no tener un número de retorno**.

La evidencia del mercado (MARKET-RESEARCH-ATI03-VALIDATION, GTM-001-BUYER-PERSONAS, validación de experiencia de cliente ATI-03) y el análisis de RF-004 muestran que el problema real es diferente:

| Lo que parece | Lo que es |
|---------------|-----------|
| "Necesito saber el retorno de inversión" | "Necesito saber si esta obra merece lo que cuesta" |
| "Dame el payback en años" | "Ayúdame a decidir si invierto 8.000€ ahora o espero" |
| "¿Cuál es el ROI?" | "¿Qué pasa si no hago nada?" |
| "Compara los retornos" | "Dime cuál es la mejor decisión para MI bolsillo" |

**El dolor real del cliente no es la falta de una métrica financiera. Es la incapacidad de decidir si una inversión merece la pena en su contexto personal.**

### 1.2 El problema del propietario

El propietario que recibe recomendaciones técnicas con cifras de ahorro e inversión se enfrenta a:

1. **Parálisis por análisis**: "Tengo 3 actuaciones con diferentes inversiones, ahorros y retornos. ¿Cómo decido si 13 años de payback es bueno?"
2. **Falta de contexto decisional**: "¿13 años de retorno es bueno o malo para una reforma de fachada?" Sin referencias, cualquier cifra es abstracta.
3. **Miedo a la inversión irrecuperable**: "Invierto 8.000€ ahora, pero ¿y si vendo la casa en 5 años? ¿Recupero algo?"
4. **Confusión entre inversión y valor**: "Gasto 8.000€, ahorro 600€/año. El retorno es 13 años. Pero la casa vale más. ¿Cómo sumo eso?"

### 1.3 El problema del Arquitecto Técnico

El AT necesita:

1. **Responder a la pregunta "¿merece la pena?"** con un criterio defendible, no con una opinión
2. **Gestionar expectativas financieras**: "El retorno es una estimación basada en tu consumo actual y tarifas actuales"
3. **Diferenciar entre inversión recomendada, valorable y no recomendada** con criterios objetivos
4. **Justificar el veredicto** cuando el cliente pregunta "¿por qué dices que merece la pena?"

> 🔵 **Problema confirmado:** El producto actual (informe técnico tradicional) entrega cifras de ahorro e inversión sin contexto decisional. RF-005 debe cerrar esa brecha proporcionando un **veredicto de inversión explicable** para cada actuación.

---

## 2. ¿Qué decisión ayuda a tomar?

RF-005 ayuda al cliente a responder **una única pregunta**:

> **"De mi dinero, ¿merece la pena gastarlo en esto?"**

A partir de esa respuesta, el cliente puede decidir:

| Decisión | Lo que RF-005 le muestra |
|----------|--------------------------|
| **Invertir ahora** | "Merece la pena: la inversión se recupera dentro de la vida útil y el beneficio neto es positivo" |
| **Planificar a futuro** | "Valóralo: el retorno es más largo, pero el beneficio no económico (confort, normativa) puede justificarlo" |
| **Descartar** | "No recomendado: la inversión es alta, el retorno supera la vida útil o el beneficio es marginal" |
| **Priorizar entre actuaciones** | "Entre A y B, una es 'Merece la pena' y la otra 'Valóralo'. El orden de prioridad es claro" |
| **Pedir segundo presupuesto** | "El coste estimado tiene una horquilla amplia. Un presupuesto detallado puede cambiar el veredicto" |

### 2.1 Relación con el flujo completo

```
RF-002: Validación → RF-003: Jerarquía → RF-004: Beneficios → RF-005: Inversión y retorno
  (¿es correcto?)     (¿qué es prioritario?)   (¿qué gano?)     (¿merece la pena?)
```

RF-005 se aplica **sobre cada actuación de RF-004**. No genera nuevas actuaciones ni recalcula los beneficios. Añade la **capa de decisión de inversión**: dados los beneficios (RF-004) y la prioridad (RF-003), ¿merece la pena invertir?

---

## 3. Reframing: del ROI técnico al veredicto de inversión

### 3.1 Por qué "retorno de inversión" no es el lenguaje del cliente

El concepto de "calcular el retorno de inversión por actuación" tiene un problema fundamental:

El cliente no piensa en ROI. Piensa en "¿merece la pena?".

| Lenguaje técnico | Lenguaje del cliente |
|------------------|---------------------|
| "Retorno simple de inversión (payback)" | "¿En cuántos años recupero lo que gasto?" |
| "Tasa interna de retorno (TIR)" | "¿Es mejor que dejar el dinero en el banco?" |
| "Valor actual neto (VAN)" | "Al final, ¿gano o pierdo dinero?" |
| "ROI ajustado a vida útil" | "Si la obra dura 30 años pero la recupero en 13, sales ganando" |
| "Cálculo financiero" | "Decisión de inversión" |

### 3.2 El concepto correcto: Veredicto de inversión para el cliente

**RF-005 no es una calculadora financiera. Es un sistema que responde "¿merece la pena?" con un veredicto claro, explicable y defendible.**

La estructura de cada actuación debe responder a **tres preguntas en orden fijo**:

1. **¿CUÁNTO CUESTA?** — Inversión estimada (horquilla)
2. **¿CUÁNDO LO RECUPERO?** — Retorno simple (años) + relación con vida útil
3. **¿MERECE LA PENA?** — Veredicto con explicación

Este orden se mantiene idéntico en todas las actuaciones para que el cliente aprenda a leerlas automáticamente.

```
ACTUACIÓN: AISLAMIENTO DE FACHADA
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  💰 INVERSIÓN ESTIMADA                                       │
│  7.000€ – 9.000€                                             │
│                                                              │
│  📈 RETORNO ESTIMADO                                         │
│  13 años (ahorro 500-700€/año)                               │
│  Vida útil de la actuación: 30+ años                         │
│  → Recuperas la inversión y disfrutas 17+ años de ahorro     │
│                                                              │
│  ✅ MERECE LA PENA                                           │
│  Recuperas la inversión en menos de la mitad de la vida útil │
│  Beneficio neto estimado: 10.000€ – 16.000€ en 30 años       │
│                                                              │
│  📝 El AT puede ajustar el veredicto                         │
└──────────────────────────────────────────────────────────────┘
```

### 3.3 Definición actualizada de RF-005

> **RF-005 no es un sistema de cálculo de ROI. Es un sistema que evalúa cada actuación y emite un veredicto de inversión ("Merece la pena / Valóralo / No recomendado") basado en criterios objetivos, permitiendo al cliente decidir si gastar su dinero en cada mejora.**

### 3.4 Principio rector: Decisión, no cálculo

El veredicto de RF-005 debe cumplir:

1. **Basado en datos PITR + costes de referencia** — No son opiniones. Se calculan a partir de mediciones reales y costes de mercado estimados.
2. **Personalizado para la vivienda** — "Tu inversión se recupera en 13 años", no "El aislamiento suele recuperarse en 10-15 años".
3. **En horquillas, no cifras exactas** — "7.000-9.000€", no "8.247,53€".
4. **Con veredicto claro** — ✅ Merece la pena / 🟡 Valóralo / ❌ No recomendado.
5. **Revisable por el AT** — El Arquitecto Técnico puede ajustar cualquier estimación y justificar el cambio.

---

## 4. El sistema de clasificación: "Merece la pena / Valóralo / No recomendado"

### 4.1 Los tres veredictos

| Veredicto | Significa | Cuándo se aplica |
|-----------|-----------|------------------|
| ✅ **Merece la pena** | La inversión se justifica por sí misma. El cliente debería considerar seriamente hacer esta actuación. | Payback < 50% de vida útil, o beneficio neto positivo significativo |
| 🟡 **Valóralo** | La inversión tiene sentido en tu contexto, pero depende de tus prioridades personales. | Payback entre 50-80% de vida útil, o beneficio no económico relevante (confort, normativa) |
| ❌ **No recomendado** | La inversión no se justifica. El cliente debería destinar su dinero a otras actuaciones. | Payback > 80% de vida útil, o beneficio neto negativo, o actuación sin impacto significativo |

### 4.2 Ejemplos de aplicación

| Actuación | Inversión | Ahorro/año | Payback | Vida útil | Veredicto | Razón |
|-----------|-----------|------------|---------|-----------|-----------|-------|
| Aislamiento fachada (SATE) | 8.000€ | 600€ | 13 años | 30+ años | ✅ Merece la pena | Recuperas en <50% de vida útil. 17+ años de ahorro neto |
| Caldera condensación | 3.500€ | 250€ | 14 años | 15 años | 🟡 Valóralo | Payback cerca del final de vida útil. El confort inmediato puede justificarlo |
| Ventanas triple acristalamiento | 6.000€ | 200€ | 30 años | 25-30 años | ❌ No recomendado | No recuperas la inversión antes de que necesiten reemplazo |
| Sellar puertas y ventanas | 200€ | 100€ | 2 años | 5-10 años | ✅ Merece la pena | Inversión mínima, retorno rapidísimo |
| Aerotermia | 12.000€ | 800€ | 15 años | 20 años | 🟡 Valóralo | Recuperas, pero el payback es ajustado. Depende del precio futuro de la energía |

### 4.3 El veredicto no es absoluto

El sistema de clasificación es una **recomendación**, no una sentencia. El AT puede:

- **Aceptar** el veredicto del sistema
- **Modificarlo** con justificación (ej: "pese al payback largo, el confort que aporta justifica la inversión")
- **Crear un nuevo veredicto** si el contexto del cliente lo requiere

Todo cambio queda registrado en el **Registro de Justificación** (patrón RF-003).

---

## 5. Criterios de clasificación

### 5.1 Criterio principal: Relación payback / vida útil

El criterio principal para determinar el veredicto es la relación entre el **tiempo de retorno simple (payback)** y la **vida útil estimada de la actuación**:

```
Ratio = Payback (años) / Vida útil (años)

- Ratio < 0.5 → ✅ Merece la pena
- Ratio 0.5 - 0.8 → 🟡 Valóralo
- Ratio > 0.8 → ❌ No recomendado
```

### 5.2 Criterios secundarios (ajustan el veredicto)

Cuando el criterio principal no es suficiente, entran en juego criterios secundarios:

| Criterio | Efecto en veredicto | Ejemplo |
|----------|---------------------|---------|
| **Beneficio de confort significativo** | Puede elevar 🟡→✅ o ❌→🟡 | Sellar puertas: payback 2 años + confort inmediato → ✅ |
| **Obligación normativa futura** | Puede elevar 🟡→✅ | Aislamiento requerido por EPBD 2030 → ✅ aunque el payback sea ajustado |
| **Ahorro muy bajo (<50€/año)** | Puede bajar ✅→🟡 o 🟡→❌ | Micro-mejoras con ahorro marginal |
| **Inversión muy alta (>20.000€)** | Introduce cautela en el veredicto | Rehabilitación integral → el AT revisa obligatoriamente |
| **Coste de la inacción** | Puede elevar ❌→🟡 | No actuar hoy puede encarecer la futura rehabilitación obligatoria |
| **Sinergia con otras actuaciones** | Puede elevar el veredicto del conjunto | Aislar + ventanas juntos tienen mejor ratio que por separado |

### 5.3 Casos especiales

- **Actuaciones con ahorro cero pero obligación normativa**: Se clasifican como "Obligatorio" (fuera del sistema de veredicto). No aplica RF-005.
- **Actuaciones con beneficio exclusivamente de confort**: Se evalúan con criterio secundario de confort. El AT puede emitir veredicto manual.
- **Paquetes de actuaciones**: Se evalúa el conjunto como una inversión única. El ratio combinado puede ser mejor que el individual.

### 5.4 Transparencia de los criterios

Los criterios estarán documentados en la metodología interna. El cliente no necesita conocer los criterios para entender el veredicto: la explicación en lenguaje claro es suficiente.

---

## 6. MVP vs V2+

### 6.1 Decisión de alcance MVP

| Componente | MVP | V2+ | Justificación |
|------------|:---:|:---:|---------------|
| **Inversión estimada (horquilla)** | ✅ | — | Dato básico. Costes de referencia de mercado |
| **Retorno simple (payback en años)** | ✅ | — | Cálculo directo: inversión / ahorro anual |
| **Vida útil estimada** | ✅ | — | Tablas estándar por tipo de actuación (fuente: CTE, IDAE) |
| **Veredicto ✅/🟡/❌** | ✅ | — | Es el núcleo del RF-005 |
| **Explicación del veredicto** | ✅ | — | Una frase en lenguaje claro que justifique el porqué |
| **Relación payback/vida útil** | ✅ | — | Cálculo interno, no se muestra al cliente directamente |
| **Beneficio neto estimado (ahorro total menos inversión)** | ✅ | — | "En 30 años ahorrarás 10.000€" |
| **Coste de la inacción** | ❌ | ✅ | Requiere simular escenario sin actuar + inflación energética |
| **TIR / VAN** | ❌ | ✅ | Métricas financieras sofisticadas para P4 (inversor) |
| **Análisis de sensibilidad (subida de precios energía)** | ❌ | ✅ | Requiere modelos de precios futuros |
| **Comparativa con alternative de inversión (índices, depósitos)** | ❌ | ✅ | Requiere datos financieros externos |
| **Cálculo de subvenciones / deducciones fiscales** | ❌ | ✅ | Depende de CCAA, requiere mapa normativo actualizado |

### 6.2 Esquema MVP

```
MVP RF-005
                                                              
💰 INVERSIÓN ESTIMADA                                       
7.000€ – 9.000€                                             
                                                              
📈 RETORNO ESTIMADO                                         
Retorno simple: 13 años                                     
Vida útil: 30+ años                                         
                                                              
Beneficio neto estimado (30 años): 10.000€ – 16.000€        
                                                              
✅ MERECE LA PENA                                           
Recuperas tu inversión en menos de la mitad de la vida útil.
Después, todo es ahorro neto durante 17+ años.              
                                                              
🔍 Confianza de esta estimación: Alta                       
```

### 6.3 Lo que NO incluye RF-005 MVP

| No incluir | Por qué |
|------------|---------|
| Tasa interna de retorno (TIR) | El cliente no la entiende. No aporta valor decisional |
| Valor actual neto (VAN) | Requiere tasa de descuento. Introduce complejidad innecesaria |
| Payback descontado | Similar al VAN. No mejora la decisión para el perfil del cliente |
| Análisis de sensibilidad | V2. Requiere simular escenarios de precios futuros |
| Subvenciones aplicables | V2. Depende de CCAA y convocatorias. Cambia constantemente |
| Coste de oportunidad vs otras inversiones | V2. Requiere datos financieros externos |

---

## 7. Formato de comunicación

### 7.1 Principio: el formato debe permitir decidir, no calcular

RF-005 no necesita una calculadora. Necesita un **formato de comunicación** que:

1. Responda a "¿merece la pena?" en segundos
2. Muestre la inversión y el retorno juntos
3. Emita un veredicto claro
4. Explique el porqué en una frase

### 7.2 Integración con la tarjeta de RF-004

RF-005 se integra **dentro** de la tarjeta de RF-004, como una sección adicional que responde a la pregunta de inversión. La tarjeta completa quedaría:

```
┌──────────────────────────────────────────────────────────────┐
│  🏠 AISLAMIENTO DE FACHADA (SATE) — 🔴 PRIORITARIA          │
│  ─────────────────────────────────────────────               │
│                                                              │
│  ❓ ¿QUÉ BENEFICIOS PUEDO ESPERAR?                           │
│  Ahorro: 500-700€/año (~30% factura)                        │
│  Confort: 16°C → 19-20°C en invierno                        │
│  Calificación: F → C (-40% consumo calefacción)             │
│                                                              │
│  💰 INVERSIÓN Y RETORNO                                      │
│  Inversión: 7.000-9.000€                                    │
│  Retorno: 13 años (vida útil: 30+ años)                     │
│  ✅ MERECE LA PENA — Recuperas en <50% de la vida útil      │
│                                                              │
│  👷 JUSTIFICACIÓN DEL AT                                     │
│  "Es la medida con mayor impacto. Sin este aislamiento,      │
│   cualquier otra mejora tendrá un efecto limitado."          │
│                                                              │
│  🔍 Confianza: Alta │ AT puede ajustar │                    │
└──────────────────────────────────────────────────────────────┘
```

**Estructura final de la tarjeta (4 secciones en orden fijo):**

1. **❓ Beneficios** (RF-004) — ¿Qué gano?
2. **💰 Inversión y retorno** (RF-005) — ¿Cuánto cuesta y merece la pena?
3. **👷 Justificación del AT** (RF-004) — ¿Por qué me lo recomiendan?
4. 🔍 Confianza de la estimación

### 7.3 Formato de comparación entre actuaciones

Para comparar, se muestran tarjetas lado a lado con los veredictos visibles:

```
┌──────────────────────────┐  ┌──────────────────────────┐
│ AISLAMIENTO FACHADA      │  │ CALDERA CONDENSACIÓN      │
│ 500-700€/año             │  │ 200-300€/año              │
│ 7.000-9.000€ · 13 años   │  │ 3.000-4.000€ · 14 años    │
│ ✅ MERECE LA PENA        │  │ 🟡 VALÓRALO              │
│ Vida útil: 30+ años      │  │ Vida útil: 15 años        │
└──────────────────────────┘  └──────────────────────────┘
```

### 7.4 Formato detallado (expansión)

Desde la tarjeta, el cliente puede expandir para ver:

- **Desglose de la inversión**: Materiales, mano de obra, otros
- **Desglose del ahorro**: Por concepto (calefacción, refrigeración, ACS)
- **Nota del AT**: Comentario personalizado sobre la estimación
- **Confianza**: Alta / Media / Baja (según calidad de los datos PITR)

### 7.5 Qué NO hará RF-005

| No hacer | Por qué |
|----------|---------|
| Mostrar el ratio payback/vida útil como número | Es interno. Al cliente le basta con el veredicto |
| Pedir al cliente que introduzca su tarifa | Se usa la tarifa media de la zona. El AT puede ajustar |
| Calcular financiación o cuotas mensuales | Es un producto de decisión, no de contratación |
| Recomendar "no hacer nada" sistemáticamente | Solo cuando el veredicto es ❌ y no hay obligación normativa |
| Mostrar TIR, VAN u otras métricas financieras | El cliente no las necesita para decidir |

---

## 8. Relación con RF-004 (Beneficios Esperados)

### 8.1 Diferenciación clara

| Aspecto | RF-004 (Beneficios) | RF-005 (Inversión y Retorno) |
|---------|---------------------|------------------------------|
| **Pregunta que responde** | "¿Qué gano?" | "¿Merece la pena?" |
| **Unidad principal** | Ahorro anual (€/año) | Inversión total (€) + retorno (años) |
| **Output** | Descripción de beneficios | Veredicto ✅/🟡/❌ |
| **Dimensión** | Anual / del cambio | Plurianual / del ciclo de vida |
| **Dependencia temporal** | Inmediato (primer año) | Largo plazo (toda la vida útil) |

### 8.2 Dependencia

RF-005 recibe de RF-004:

- **Ahorro anual estimado** (base para calcular payback)
- **Tipo de actuación** (para determinar vida útil)
- **Beneficios de confort** (para criterios secundarios)

RF-005 NO recalcula el ahorro. Usa el valor de RF-004.

### 8.3 Flujo de datos

```
PITR → RF-004 (ahorro anual) → RF-005 (inversión + retorno + veredicto)
  ↑                              ↑
Datos del inmueble          Costes de referencia
                            Tablas de vida útil
```

---

## 9. Validación contra P1-P4

### 9.1 P1 — Adriana López (propietaria que vende)

**Problema:** Adriana necesita saber si las mejoras aumentan el valor de venta, y si la inversión se recupera en el corto plazo (planea vender en 2-3 años).

**¿RF-005 le responde?** ⚠️ Parcialmente

**Cómo:**
- RF-005 muestra que aislar fachada tiene un retorno de 13 años → ❌ No recomendado para su horizonte (2-3 años)
- Pero el AT puede ajustar: "Aunque no recuperes la inversión, mejorar la calificación de B a A puede aumentar el precio de venta"
- **Matiz V2:** El cálculo de "plusvalía por mejora energética" no está en MVP. En MVP, el AT explica verbalmente este beneficio.

### 9.2 P2 — Comprador de vivienda

**Problema:** Evalúa comprar una casa con certificado E. Necesita saber el coste real futuro y si las reformas merecen la pena.

**¿RF-005 le responde?** ✅ Sí

**Cómo:**
- RF-005 muestra que aislar fachada (8.000€, retorno 13 años) es ✅ Merece la pena
- RF-005 muestra que cambiar caldera (3.500€, retorno 14 años) es 🟡 Valóralo
- **P2 puede decidir:** "Compro y reformo el aislamiento (lo recuperaré en 13 años)", "Pido descuento en el precio por el coste de las reformas", "Busco otra vivienda"

### 9.3 P3 — Comunidad de propietarios

**Problema:** Necesita justificar qué obras merecen la pena ante los vecinos.

**¿RF-005 le responde?** ✅ Sí

**Cómo:**
- RF-005 genera un veredicto claro para cada actuación: aislamiento fachada ✅, ascensor (no aplica RF-005), caldera centralizada 🟡
- El presidente puede mostrar: "El sistema dice que aislar la fachada merece la pena. Vecinos que no estén de acuerdo, que hablen con el AT"
- El veredicto proporciona un **marco objetivo** para el debate, reduciendo discusiones subjetivas

### 9.4 P4 — Inversor / Propietario de cartera

**Problema:** Necesita priorizar inversiones en múltiples inmuebles con criterios de rentabilidad.

**¿RF-005 le responde?** ⚠️ Parcialmente (con matiz V2)

**Cómo:**
- RF-005 le da el veredicto ✅/🟡/❌ para cada actuación en cada inmueble
- Puede comparar: "Este inmueble tiene más actuaciones ✅ que este otro"
- **Pero P4 necesita:**
  - TIR, VAN para comparar con otras inversiones (V2)
  - Análisis de sensibilidad a subidas de energía (V2)
  - Cálculo de subvenciones (V2)
  - Se documenta como V2

---

## 10. Casos de uso

### 10.1 Caso de uso 1: Actuación con veredicto claro ✅

**Escenario:** Vivienda unifamiliar con calificación G. Se recomienda aislamiento de cubierta.

**Flujo:**
1. RF-003 clasifica como prioridad alta
2. RF-004 genera beneficios: ahorro 600-800€/año, confort 14°C→19°C, mejora G→E
3. RF-005 calcula:
   - Inversión: 5.000-7.000€
   - Retorno: 8-10 años
   - Vida útil: 30+ años
   - Ratio payback/vida útil: 0.27
   - **Veredicto: ✅ Merece la pena**
4. AT revisa y confirma
5. **Cliente:** "Recupero la inversión en menos de 10 años de una obra que dura 30. Sí, lo hago."

### 10.2 Caso de uso 2: Actuación para valorar 🟡

**Escenario:** Vivienda con caldera antigua pero aún funcional. Se recomienda caldera de condensación.

**Flujo:**
1. RF-003 clasifica como prioridad media (recomendada)
2. RF-004 genera beneficios: ahorro 200-300€/año, confort 17°C→18°C, mejora F→D
3. RF-005 calcula:
   - Inversión: 3.000-4.000€
   - Retorno: 13-15 años
   - Vida útil: 15 años
   - Ratio payback/vida útil: 0.87
   - **Veredicto: 🟡 Valóralo**
   - Nota del AT: "Si tu caldera actual falla, la nueva se amortiza mejor al evitar urgencias"
4. AT ajusta: mantiene 🟡 pero añade justificación
5. **Cliente:** "No recupero antes de que toque cambiarla otra vez. Pero si la actual se estropea, sabré que merece la pena cambiarla por condensación."

### 10.3 Caso de uso 3: Actuación no recomendada ❌

**Escenario:** Vivienda con ventanas de doble acristalamiento en buen estado. Se propone triple acristalamiento.

**Flujo:**
1. RF-003 clasifica como opcional
2. RF-004 genera beneficios: ahorro 100-150€/año, confort marginal (18°C→19°C), mejora E→D
3. RF-005 calcula:
   - Inversión: 5.000-7.000€
   - Retorno: 40-50 años
   - Vida útil: 25-30 años
   - Ratio payback/vida útil: >1.5
   - **Veredicto: ❌ No recomendado**
4. AT confirma: "El ahorro no justifica el cambio. Cuando las ventanas actuales lleguen al final de su vida útil, entonces valora el triple acristalamiento"
5. **Cliente:** "No merece la pena. Me quedo con mis ventanas actuales."

### 10.4 Caso de uso 4: AT corrige el veredicto

**Escenario:** AT considera que el aislamiento de fachada en una vivienda protegida por normativa patrimonial tiene sobrecoste (andamios especiales, materiales específicos).

**Flujo:**
1. Sistema genera: 7.000-9.000€, retorno 13 años → ✅ Merece la pena
2. AT corrige: "Por normativa patrimonial, el coste real es 12.000-15.000€. Retorno: 20-25 años"
3. Sistema recalcula: Ratio > 0.8 → ❌ No recomendado (automático, según datos corregidos)
4. AT añade justificación: "Aunque no se recupere económicamente, es obligatorio para alinear con EPBD 2030. El veredicto pasa a 🟡 Valóralo por obligación normativa."
5. El cambio queda registrado en el Registro de Justificación

### 10.5 Caso de uso 5: Paquete de actuaciones

**Escenario:** Se recomienda "Aislamiento fachada + Ventanas triple acristalamiento + Caldera condensación" como paquete.

**Flujo:**
1. RF-005 evalúa cada actuación individualmente (como siempre)
2. El sistema genera un **veredicto combinado** opcional:
   - Inversión total: 14.000-19.000€
   - Ahorro total: 900-1.200€/año
   - Retorno combinado: 14-16 años
   - Veredicto del paquete: ✅ Merece la pena (mejor que individual por sinergias)
3. AT revisa: "El paquete tiene mejor retorno que hacer las actuaciones por separado"
4. **Cliente:** "Prefiero hacerlo todo de una vez. El retorno es similar al del aislamiento solo pero la transformación es completa."

### 10.6 Caso de uso 6: Actuación con beneficio de confort pero payback largo

**Escenario:** Sótanos húmedos con problemas de salubridad. Se recomienda impermeabilización + ventilación mecánica.

**Flujo:**
1. RF-003 clasifica como prioritaria (salud)
2. RF-004 genera: ahorro bajo (50-100€/año), confort alto (eliminación de humedad, moho), sin mejora de calificación
3. RF-005 calcula:
   - Inversión: 4.000-6.000€
   - Retorno: 40-60 años (solo ahorro económico)
   - Veredicto inicial por ratio: ❌ No recomendado
4. El sistema detecta "beneficio de confort alto" (criterio secundario) → eleva a 🟡 Valóralo
5. AT revisa: "El beneficio en salud y confort justifica la inversión aunque el retorno económico sea largo. Mantengo 🟡."
6. **Cliente:** "La humedad me está generando problemas de salud. Aunque no lo recupere económicamente, vale la pena."

---

## 11. Casos límite

### 11.1 Vida útil no determinable

**Escenario:** Actuación sin vida útil estándar (ej: reparación puntual de una grieta).

**Manejo:** No aplica RF-005 para esta actuación. El AT emite veredicto manual. Se marca como "Sin estimación de retorno — decisión del AT."

### 11.2 Inversión cero o casi cero

**Escenario:** Actuaciones de mantenimiento básico (ej: sellar grietas, ajustar persianas).

**Manejo:** Si la inversión es < 500€, RF-005 simplifica:
- Inversión: < 500€
- Retorno: inmediato o < 2 años
- Veredicto: ✅ Merece la pena (automático)

### 11.3 Ahorro cero pero obligación normativa

**Escenario:** Instalación de ascensor (accesibilidad obligatoria).

**Manejo:** No aplica RF-005. La actuación se marca como "Obligatorio por normativa." El veredicto del sistema no aplica.

### 11.4 Actuación con coste negativo (subvencionada)

**Escenario:** Subvención del 60% del coste del aislamiento.

**Manejo:** 
- El sistema usa el coste neto (inversión total - subvención estimada)
- Si el AT conoce la subvención aplicable, puede ajustar el coste
- El cálculo de subvenciones es V2. En MVP, el AT introduce manualmente el coste neto

### 11.5 Tarifa energética inusual

**Escenario:** Cliente con tarifa fija (calefacción centralizada incluida en comunidad).

**Manejo:**
- El sistema usa tarifa media de la zona por defecto
- El AT puede ajustar la tarifa si conoce el caso concreto
- El ahorro estimado se recalcula con la tarifa ajustada

### 11.6 Actuación con beneficios sinérgicos no aditivos

**Escenario:** Hacer aislamiento + ventanas juntos tiene un ahorro conjunto menor que la suma de los ahorros individuales (porque ambos reducen la misma demanda).

**Manejo:**
- En MVP, cada actuación se evalúa individualmente
- El AT puede marcar "sinergia detectada" y ajustar el ahorro combinado
- El paquete combinado se evalúa como caso de uso 5
- V2: modelo de sinergias automático entre actuaciones

### 11.7 Cliente en proceso de venta (horizonte corto)

**Escenario:** Cliente que planea vender en 2 años.

**Manejo:**
- El veredicto se basa en payback/vida útil estándar
- El AT puede añadir: "Para tu horizonte de 2 años, ninguna actuación tiene retorno económico directo. Sin embargo, la mejora de calificación puede aumentar el valor de venta."
- El sistema no tiene horizonte temporal del cliente en MVP. Es el AT quien contextualiza.

---

## 12. Reglas de negocio

### 12.1 Reglas obligatorias

| ID | Regla | Tipo |
|----|-------|------|
| **RN-RF005-001** | Toda actuación de RF-004 con beneficio económico debe tener una estimación de RF-005 | Obligatorio |
| **RN-RF005-002** | RF-005 muestra siempre: inversión, retorno simple, vida útil y veredicto | Obligatorio |
| **RN-RF005-003** | El veredicto usa exclusivamente: ✅ Merece la pena / 🟡 Valóralo / ❌ No recomendado | Obligatorio |
| **RN-RF005-004** | Las cifras usan horquillas o rangos, no valores exactos | Obligatorio |
| **RN-RF005-005** | El AT puede ajustar cualquier valor (inversión, ahorro, vida útil, veredicto) | Obligatorio |
| **RN-RF005-006** | Todo ajuste del AT queda registrado en el Registro de Justificación | Obligatorio |
| **RN-RF005-007** | El veredicto se calcula automáticamente desde los datos. El AT puede override con justificación | Obligatorio |
| **RN-RF005-008** | Actuaciones sin ahorro económico pero con obligación normativa se marcan como "Obligatorio" (fuera del sistema) | Excepción |
| **RN-RF005-009** | Actuaciones con inversión < 500€ obtienen veredicto ✅ automático | Simplificación |
| **RN-RF005-010** | La vida útil se obtiene de tablas estándar por tipo de actuación (fuente: CTE, IDAE) | Metodología |

### 12.2 Priorización entre RF-004 y RF-005

| Si RF-004 dice... | Y RF-005 dice... | El mensaje combinado es |
|-------------------|------------------|------------------------|
| Beneficio alto | ✅ Merece la pena | **Prioridad máxima:** mucho beneficio y buena inversión |
| Beneficio moderado | ✅ Merece la pena | **Recomendado:** vale la pena, aunque el beneficio no sea enorme |
| Beneficio alto | 🟡 Valóralo | **Evalúa:** el beneficio es alto pero la inversión es ajustada |
| Beneficio bajo | ❌ No recomendado | **Descartar:** ni el beneficio ni el retorno justifican la inversión |
| Beneficio alto | ❌ No recomendado | **Caso excepcional:** revisar con AT. Posible error de estimación |

---

## 13. Criterios de aceptación

### 13.1 Criterios funcionales

| ID | Criterio | Verificación |
|----|----------|--------------|
| **CA-RF005-001** | Cada actuación muestra inversión estimada en horquilla | Dato |
| **CA-RF005-002** | Cada actuación muestra retorno simple en años | Dato |
| **CA-RF005-003** | Cada actuación muestra vida útil estimada en años | Dato |
| **CA-RF005-004** | Cada actuación muestra veredicto ✅/🟡/❌ con icono y color | Visual |
| **CA-RF005-005** | Cada actuación incluye una frase explicativa del veredicto | Texto |
| **CA-RF005-006** | El veredicto se calcula automáticamente desde inversión, ahorro y vida útil | Algoritmo |
| **CA-RF005-007** | El AT puede modificar cualquier valor y el veredicto se recalcula | Funcional |
| **CA-RF005-008** | El AT puede override manual el veredicto con justificación obligatoria | Funcional |
| **CA-RF005-009** | Se puede comparar visualmente el veredicto de hasta 5 actuaciones lado a lado | Interfaz |
| **CA-RF005-010** | Actuaciones con inversión < 500€ muestran veredicto ✅ automático | Regla |
| **CA-RF005-011** | Actuaciones sin beneficio económico (solo normativa) se marcan como "Obligatorio" | Excepción |
| **CA-RF005-012** | No se muestra TIR, VAN ni ninguna métrica financiera compleja | Ausencia |

### 13.2 Criterios no funcionales

| ID | Criterio | Objetivo |
|----|----------|----------|
| **CA-RF005-NF-001** | El veredicto de una actuación debe entenderse en ≤5 segundos | Usabilidad |
| **CA-RF005-NF-002** | La comparación entre actuaciones debe permitir decisión en ≤20 segundos | Usabilidad |
| **CA-RF005-NF-003** | Lenguaje claro (ESO, nivel 12-14 años) sin tecnicismos financieros | Accesibilidad |
| **CA-RF005-NF-004** | El cálculo de veredicto debe ser automático desde datos de RF-004 | Eficiencia |
| **CA-RF005-NF-005** | AT debe poder ajustar una estimación en ≤1 minuto por actuación | Eficiencia |

---

## 14. Preguntas abiertas resueltas

### 14.1 ¿RF-005 es una calculadora financiera?

**Respuesta:** No. RF-005 es un sistema de **veredicto de inversión**. Usa cálculos simples (payback, relación con vida útil) para emitir un juicio claro. No es una herramienta de análisis financiero.

### 14.2 ¿Por qué payback simple y no TIR o VAN?

**Respuesta:** Porque el cliente no necesita TIR/VAN para decidir si una actuación merece la pena. Necesita saber: "¿Cuánto invierto? ¿Cuándo lo recupero? ¿Merece la pena?" El payback simple responde a esas preguntas. TIR y VAN se documentan como V2 para el perfil inversor (P4).

### 14.3 ¿RF-005 puede recomendar no hacer nada?

**Respuesta:** Sí. Si una actuación tiene veredicto ❌ No recomendado y no hay criterios secundarios que lo eleven, el sistema recomienda no hacer esa actuación y destinar el dinero a otras mejoras.

### 14.4 ¿Cómo se determina la vida útil?

**Respuesta:** Mediante tablas estándar del sector (fuente: CTE, IDAE, fabricantes). Cada tipo de actuación tiene una vida útil asignada. El AT puede ajustarla según su conocimiento del caso concreto.

### 14.5 ¿RF-005 necesita nuevos datos de PITR?

**Respuesta:** No. RF-005 usa los mismos datos que RF-004 (ahorro anual estimado) y añade tablas externas de costes de referencia y vidas útiles. No requiere nuevas mediciones PITR.

### 14.6 ¿Qué ocurre si el cliente tiene una tarifa muy diferente a la media?

**Respuesta:** En MVP se usa la tarifa media de la zona. El AT puede ajustar la tarifa si conoce el caso concreto. En V2, el cliente podría introducir su tarifa real.

### 14.7 ¿Cómo se manejan las subvenciones?

**Respuesta:** En MVP, el AT puede ajustar el coste neto (inversión - subvención conocida) manualmente. El cálculo automático de subvenciones es V2.

### 14.8 ¿El veredicto puede cambiar si sube el precio de la energía?

**Respuesta:** En MVP no. El cálculo usa precios actuales. En V2, el análisis de sensibilidad permitiría ver cómo afecta una subida de precios al retorno.

### 14.9 ¿RF-005 requiere aprobación del AT o es automático?

**Respuesta:** RF-005 genera un veredicto automático. El AT debe revisarlo y puede aceptarlo, modificarlo o hacer override. Sin revisión del AT, el veredicto no se entrega al cliente.

---

## 15. Changelog

| Fecha | Versión | Autor | Cambio |
|-------|---------|-------|--------|
| 2026-07-08 | v1.0 | Análisis | Versión inicial. Reframing de "ROI técnico" a "veredicto de inversión". Sistema de clasificación ✅/🟡/❌ basado en relación payback/vida útil. Integración con RF-004 en tarjeta única de 4 secciones. |

---

*Fin del documento RF-005-INVERSION-RETORNO.md*