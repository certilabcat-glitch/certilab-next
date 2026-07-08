# Arquitectura del Documento de Decisiones

> **Propósito:** Definir la estructura lógica del entregable que recibe el cliente de ATI-03.
> **Restricción:** No contiene diseño visual, wireframes, colores, tipografías ni componentes UI.
> **Precedencia:** PRD-001-ATI03-INFORME-TECNICO-ENERGETICO V2 — Sección 10 (Pila de decisión)

---

## 0. Principios de la arquitectura

| Principio | Implicación |
|-----------|-------------|
| **Lo más importante primero** | La información que responde a la pregunta crítica del cliente aparece sin scroll |
| **Una pregunta por capa** | Cada bloque responde a una única pregunta de decisión |
| **Flujo principal → anexo** | El detalle técnico está fuera del flujo de lectura principal, a un clic |
| **Comprensión en ≤30 segundos** | Las capas 1-3 deben responder las 4 preguntas clave en ese tiempo sin expandir nada |
| **Profundidad opcional** | Expandir es siempre una elección del usuario, nunca un requisito |
| **Confianza explícita** | El cliente debe poder saber si puede confiar en el diagnóstico sin tener que expandir nada |
| **Lenguaje no técnico** | El documento debe poder entenderse sin conocimientos de construcción, energía o normativa |
| **Abandonable en cualquier punto** | El cliente debe poder cerrar el documento habiendo obtenido valor, independientemente de la capa en la que esté |

---

## 1. Flujo de lectura general

El documento se organiza en **6 capas** más un **anexo técnico**. El orden de lectura es estrictamente vertical (scroll, no paginación):

```
    ┌──────────────────────────────────────────┐
    │                                          │
    │  CAPA 1 — ESTADO REAL                    │  ← Siempre visible (sin scroll)
    │  "¿Cuál es el estado real de mi          │
    │   vivienda?"                             │
    │                                          │
    ├──────────────────────────────────────────┤
    │                                          │
    │  CAPA 2 — PROBLEMAS PRIORIZADOS          │  ← Visible con scroll parcial
    │  "¿Qué problemas son realmente           │
    │   importantes?"                          │
    │                                          │
    ├──────────────────────────────────────────┤
    │                                          │
    │  CAPA 3 — PLAN DE ACCIÓN                 │  ← Flujo principal
    │  "¿Qué debo hacer primero?"              │  (target ≤30s)
    │                                          │
    ├──────────────────────────────────────────┤
    │                                          │
    │  CAPA 4 — AHORRO ECONÓMICO               │
    │  "¿Cuánto puedo ahorrar?"                │  ← Flujo de profundización
    │                                          │  (lectura opcional en 1er contacto)
    ├──────────────────────────────────────────┤
    │                                          │
    │  CAPA 5 — INVERSIÓN Y RETORNO            │
    │  "¿Qué inversión merece la pena?"        │
    │                                          │
    ├──────────────────────────────────────────┤
    │                                          │
    │  CAPA 6 — COSTE DE LA INACCIÓN           │  ← Cierre del documento
    │  "¿Qué ocurre si no hago nada?"          │
    │                                          │
    ├──────────────────────────────────────────┤
    │                                          │
    │  [ANEXO TÉCNICO]                         │  ← Fuera del flujo principal
    │  "Ver detalle técnico completo"          │  (enlace, no contenido inline)
    │                                          │
    └──────────────────────────────────────────┘
```

### 1.1 Flujo principal (capas 1-3)

Es la experiencia mínima viable del documento. El cliente que solo lea estas 3 capas debe poder:

1. Saber si su vivienda tiene un problema real (Capa 1)
2. Entender cuáles son los problemas que requieren acción urgente (Capa 2)
3. Conocer el primer paso que debe dar (Capa 3)

**Tiempo objetivo de comprensión del flujo principal:** ≤30 segundos.

### 1.2 Flujo de profundización (capas 4-6)

El cliente que quiera entender el detalle económico y las consecuencias de la inacción continúa el scroll. Estas capas responden a preguntas que el cliente puede no haberse planteado todavía, pero que son necesarias para una decisión informada.

**No deben requerir acción del usuario para aparecer** — están en el flujo de scroll, no ocultas tras un botón. Pero su contenido expandible (detalle interno) sí está colapsado por defecto.

### 1.3 Anexo técnico

No está en el flujo de scroll. Es un enlace/pestaña separada. Contiene todo el detalle que el cliente solo necesita si:

- Quiere verificar una afirmación con los datos brutos
- Es un perfil muy técnico (arquitecto, ingeniero)
- Necesita el documento para un trámite administrativo

---

## 2. Capa 1 — Estado Real

### Pregunta que responde
**"¿Cuál es el estado real de mi vivienda?"**

### Por qué está primero
Es la pregunta que el cliente se hace en el momento cero. Antes de saber qué hacer, necesita saber si hay un problema. Esta capa debe responder en **≤3 segundos** desde que abre el documento.

### Información en el flujo principal (siempre visible)

| Elemento | Descripción | ¿Visible sin scroll? |
|----------|-------------|---------------------|
| **Veredicto diagnóstico** | Estado global: Buena / Regular / Mejorable / Deficiente | ✅ Sí |
| **Indicador visual del veredicto** | Representación icónica del estado (tipo semáforo) | ✅ Sí |
| **Dirección del inmueble** | Dato de contexto: "Vivienda en [dirección]" | ✅ Sí |
| **Nivel de Confianza del diagnóstico** | Indicador visible: Alto 🟢 / Medio 🟡 / Bajo 🔴 (basado en RF-002) | ✅ Sí |
| **Fecha del diagnóstico** | Fecha de emisión + firma digital del AT | ✅ Sí |
| **Resumen de una línea** | "Tu vivienda tiene un estado energético [veredicto] con un nivel de confianza [Alto/Medio/Bajo]" | ✅ Sí |

### Información expandible (un clic)

| Elemento | ¿Cuándo se expande? |
|----------|---------------------|
| **¿Qué significa este veredicto?** | Al hacer clic en el veredicto o en un icono de ayuda |
| **Detalle del veredicto** | Texto breve que explica cómo se ha llegado al veredicto: "El consumo real supera en un 40% el consumo estimado del certificado, y hay 3 problemas críticos identificados" |

### Información que va al anexo técnico

- Datos brutos de la inspección PITR™ (termografía, presurización, etc.)
- Consumos históricos desglosados por mes y año
- Certificado energético original escaneado
- Desviación numérica detallada (consumo real vs certificado, en kWh)
- Metodología de cálculo del veredicto

---

## 3. Capa 2 — Problemas Priorizados

### Pregunta que responde
**"¿Qué problemas son realmente importantes?"**

### Por qué está segunda
Una vez que el cliente sabe que hay un problema, necesita entender **cuál es la gravedad**. Esta capa transforma datos técnicos en una jerarquía clara.

### Información en el flujo principal (visible tras scroll parcial, colapsada)

| Elemento | Descripción | ¿Visible sin expandir? |
|----------|-------------|----------------------|
| **Categoría 🔴 Críticos** | Problemas que requieren acción urgente (seguridad, normativa, daño progresivo) | ✅ Título de la categoría sí. La lista de problemas, NO. |
| **Categoría 🟡 Importantes** | Problemas que planificar en próximos meses | ✅ Título de la categoría sí. La lista, NO. |
| **Categoría 🟢 Mejoras** | Problemas a abordar cuando toque reforma | ✅ Título de la categoría sí. La lista, NO. |

### Regla de visibilidad por defecto

- Si hay 🔴 **Críticos**: la categoría Críticos se muestra **expandida por defecto**. Importantes y Mejoras aparecen colapsadas.
- Si NO hay Críticos pero sí 🟡 **Importantes**: Importantes se muestra **expandida por defecto**. Mejoras colapsada.
- Si solo hay 🟢 **Mejoras**: todo visible (expandido o semi-expandido), no hay urgencia que comunicar.

### Información expandible (un clic por problema)

Cada problema, al expandirse, muestra:

| Campo | Descripción |
|-------|-------------|
| **Nombre del problema** | Ej: "Filtraciones en cubierta" |
| **¿Qué es?** | Explicación en 1-2 frases del problema técnico |
| **¿Por qué importa?** | Consecuencia directa para el propietario (confort, factura, seguridad) |
| **¿Qué pasa si no actúas?** | Consecuencia de la inacción a 1-3-5 años |
| **Nivel de confianza** | Alto / Medio / Bajo (de RF-002) |
| **Relación con actuaciones** | "Este problema se resuelve con: [nombre de la actuación]" |

### Información que va al anexo técnico

- Listado completo de todos los hallazgos de la inspección, incluso los no priorizados
- Mediciones concretas (temperaturas, presiones, espesores, etc.)
- Fotos de la inspección
- Referencia a la normativa que aplica a cada problema
- Justificación detallada de la priorización (criterios y pesos)

---

## 4. Capa 3 — Plan de Acción

### Pregunta que responde
**"¿Qué debo hacer primero?"**

### Por qué está tercera
Después de entender los problemas, el cliente necesita **una secuencia clara de pasos**. No es una lista de recomendaciones — es un plan ordenado.

### Información en el flujo principal (siempre visible)

| Elemento | Descripción |
|----------|-------------|
| **Título de la capa** | "Esto es lo que debes hacer, en orden" |
| **Lista ordenada de actuaciones** | Numeradas del 1 al N, por orden de prioridad |
| **Por cada actuación (visible):** | Nombre, veredicto de retorno, inversión estimada, ahorro anual |

### Cada actuación muestra (visible sin expandir)

| Campo | ¿Siempre visible? |
|-------|------------------|
| Posición en el plan (1, 2, 3...) | ✅ Sí |
| Nombre de la actuación | ✅ Sí |
| Inversión estimada (€) | ✅ Sí |
| Ahorro anual estimado (€/año) | ✅ Sí |
| Veredicto de retorno (✅ / ⚠️ / ❌) | ✅ Sí |
| Payback (años) | ✅ Sí |

### Cada actuación puede expandirse (un clic)

Al expandir una actuación se muestra:

| Campo | Descripción |
|-------|-------------|
| **¿En qué consiste?** | Descripción breve de la actuación |
| **¿Por qué esta posición?** | Justificación de la prioridad dentro del plan |
| **Nivel de confianza del ahorro** | Alto / Medio / Bajo (basado en RF-002) |
| **Vida útil estimada** | Años que dura la mejora |
| **Veredicto detallado** | Explicación de por qué merece/no merece la pena |
| **Notas del AT** | Comentario opcional del Arquitecto Técnico sobre la actuación |

### Información que va al anexo técnico

- Cálculo detallado del ahorro estimado (modelo, fuentes, asunciones)
- Cálculo detallado del coste de la actuación (desglose de partidas)
- Tabla de costes de referencia utilizada
- Metodología de priorización con pesos específicos
- Justification Log (cambios del AT sobre el orden recomendado por el sistema)

---

## 5. Capa 4 — Ahorro Económico

### Pregunta que responde
**"¿Cuánto puedo ahorrar?"**

### Por qué está cuarta
Esta capa proporciona el contexto económico agregado. No es específica de una actuación (eso ya se ha visto en la Capa 3), sino que muestra **la foto completa del potencial de ahorro**.

### Información en el flujo principal (siempre visible)

| Elemento | Descripción |
|----------|-------------|
| **Ahorro total si se aplican todas las actuaciones** | Suma del ahorro anual de todas las actuaciones recomendadas |
| **Comparativa visual** | Barra: coste anual actual → coste anual tras mejoras |
| **Desglose por concepto** | Calefacción / Refrigeración / ACS / Iluminación (en €/año) |

### Información expandible (un clic)

| Elemento | Descripción |
|----------|-------------|
| **Proyección a 5 años** | Ahorro acumulado si se aplican las actuaciones, año a año |
| **Desglose por estación** | Invierno vs verano: dónde se produce el ahorro |
| **Distribución por actuación** | Gráfico que muestra qué % del ahorro total aporta cada actuación |

### Información que va al anexo técnico

- Facturas históricas utilizadas para el cálculo
- Precios energéticos de referencia (tarifas, zona climática)
- Metodología de cálculo del ahorro (herramienta, versión, asunciones)
- Simulación energética completa (si se ha realizado)

---

## 6. Capa 5 — Inversión y Retorno

### Pregunta que responde
**"¿Qué inversión merece la pena y cuál no?"**

### Por qué está quinta
Ya se han visto las actuaciones (Capa 3) y el ahorro global (Capa 4). Ahora el cliente necesita **el análisis financiero individual** que le ayude a decidir en qué invertir.

### Relación con la Capa 3

- **Capa 3** muestra cada actuación con su veredicto de forma compacta
- **Capa 5** amplía el análisis financiero: muestra la lógica de cada veredicto

### Información en el flujo principal (visible)

| Elemento | Descripción |
|----------|-------------|
| **Lista de actuaciones agrupadas por veredicto** | ✅ Merece la pena / ⚠️ Valóralo / ❌ No recomendado |
| **Por cada actuación (visible):** | Inversión, ahorro anual, payback, veredicto |

### Información expandible (un clic por actuación)

| Elemento | Descripción |
|----------|-------------|
| **¿Por qué este veredicto?** | Explicación clara: "Payback de 5 años con vida útil de 20 años → recuperas la inversión 4 veces durante la vida de la mejora" |
| **Desglose de inversión** | Coste de materiales + mano de obra + IVA estimado |
| **Horquilla de retorno** | "Entre 4 y 7 años dependiendo del precio futuro de la energía" |
| **Coste anual equivalente** | Coste de la actuación anualizado (inversión / vida útil) vs ahorro anual |

### Información que va al anexo técnico

- Tabla de costes de referencia completa (fuente, fecha, zona)
- Cálculo del payback con fórmulas y asunciones
- Vidas útiles de referencia por tipo de actuación (fuente normativa)
- Análisis de sensibilidad (variación del payback ante cambios en el precio de la energía)

---

## 7. Capa 6 — Coste de la Inacción

### Pregunta que responde
**"¿Qué ocurre si no hago nada?"**

### Por qué está al final
Es la **consecuencia natural** de haber recorrido todo el documento. El cliente ha visto los problemas, el plan, el ahorro y la inversión. Ahora necesita entender el **coste de no actuar** — que es el argumento de cierre.

### Información en el flujo principal (siempre visible)

| Elemento | Descripción |
|----------|-------------|
| **Proyección temporal** | Coste acumulado de no actuar a 1, 5 y 10 años |
| **Coste anual de la inacción** | Diferencia entre factura actual y factura potencial si se actuara |
| **Impacto en valor de reventa** | Rango estimado de pérdida de valor por baja calificación |
| **Riesgo regulatorio** | Nota sobre futuras exigencias (EPBD): "A partir de 2030 será obligatorio tener [X]" |

### Información expandible (un clic)

| Elemento | Descripción |
|----------|-------------|
| **Desglose anual de la inacción** | Año a año: factura pagada vs factura que se pagaría con mejoras |
| **Detalle del riesgo regulatorio** | Normativa concreta y plazos |
| **Escenarios** | Optimista / Realista / Pesimista según evolución del precio de la energía |

### Información que va al anexo técnico

- Proyecciones completas con modelo económico
- Fuentes de datos sobre valor de reventa y certificación energética
- Referencias normativas detalladas (EPBD, CTE, etc.)
- Metodología de cálculo de los escenarios

---

## 8. Anexo Técnico

### Propósito
Contener **toda la información técnica** que el cliente NO necesita para decidir, pero que:
- Da rigor y trazabilidad al documento
- Es necesaria para perfiles técnicos o trámites administrativos
- Permite verificar cualquier afirmación del documento principal

### Estructura del anexo

| Sección | Contenido |
|---------|-----------|
| 1. Datos de la inspección | Fecha, técnico, metodología, equipo, condiciones |
| 2. Resultados PITR™ completos | Termografía, presurización, mediciones, etc., por elemento |
| 3. Consumos históricos | Facturas, perfiles de consumo, tarifas |
| 4. Certificado original | Escaneado + análisis de desviaciones |
| 5. Cálculos detallados | Por actuación: ahorro, inversión, payback, fuentes |
| 6. Metodología | Modelos utilizados, versiones, asunciones, limitaciones |
| 7. Justification Log | Cambios del AT sobre recomendaciones automáticas |
| 8. Firma digital | Firma del AT colegiado |

### Comportamiento

- **No está en el flujo de scroll** del documento principal
- Se accede mediante un enlace/botón desde cualquier capa
- Cada capa del documento principal puede tener un enlace directo a la sección del anexo que la justifica
- Es descargable como PDF independiente

---

## 9. Resumen de visibilidad por defecto

| Sección | Estado por defecto | ¿Scroll necesario? | Prioridad de lectura |
|---------|-------------------|-------------------|---------------------|
| Capa 1 — Estado Real | Expandido | No (sin scroll) | 1ª en ver (target 3s) |
| Capa 2 — Problemas [SIN críticos] | Semi-expandido (título visible, problemas colapsados) | Sí, parcial | 2ª en ver |
| Capa 2 — Problemas [CON críticos] | Críticos expandido, resto colapsado | Sí, parcial | 2ª en ver |
| Capa 3 — Plan de Acción | Expandido (lista visible, detalle colapsado) | Sí | 3ª en ver |
| Capa 4 — Ahorro Económico | Expandido (comparativa visible, proyección colapsada) | Sí | Opcional (1er contacto) |
| Capa 5 — Inversión y Retorno | Semi-expandido (veredictos visibles, desglose colapsado) | Sí | Opcional (1er contacto) |
| Capa 6 — Coste Inacción | Expandido (proyección visible, escenarios colapsados) | Sí | Cierre |
| Anexo Técnico | No visible en flujo principal | No (enlace aparte) | Bajo demanda |

---

## 10. Reglas de expansión

1. **Una expansión a la vez:** Cuando el usuario expande un elemento, cualquier otro elemento expandido en la misma capa se colapsa automáticamente (aplica dentro de la misma capa, no entre capas).

2. **Colapso por defecto salvo excepción:** Todo el contenido detallado (explicaciones, desgloses, justificaciones) está colapsado inicialmente, excepto:
   - Capa 1: completamente visible
   - Capa 2: categoría superior expandida si hay críticos o importantes
   - Capa 3: lista de actuaciones visible, detalle colapsado

3. **Estado persistente en sesión:** Si el usuario expande un elemento, navega a otra capa y vuelve, el elemento permanece expandido. No se conserva entre sesiones.

4. **La expansión es por toque/clic:** No hay hover expand. En móvil no existe hover. En escritorio, el hover puede mostrar un tooltip con el dato más relevante, pero la expansión completa requiere clic.

---

## 11. Mapa de contenidos: capa → origen funcional

| Capa | RF asociado | Origen de los datos |
|------|-------------|-------------------|
| 1 — Estado Real | RF-002 (Nivel de Confianza) | PITR™ + certificado original + consumos reales |
| 2 — Problemas Priorizados | RF-003 (Jerarquía de Decisiones) | PITR™ + criterios de priorización del AT |
| 3 — Plan de Acción | RF-003 + RF-004 + RF-005 | RF-003 + ahorro de RF-004 + retorno de RF-005 |
| 4 — Ahorro Económico | RF-004 (Impacto de Actuaciones) | Desglose del ahorro por concepto |
| 5 — Inversión y Retorno | RF-005 (Inversión y Retorno) | Costes de referencia + vidas útiles + ahorro |
| 6 — Coste Inacción | RF-004 + RF-005 | Proyección del ahorro no realizado + impacto regulatorio |
| Anexo Técnico | Todos | Datos brutos de cada capa + metodología |

---

## 12. Formato de entrega

### Canal primario: Dashboard web interactivo

- Scroll vertical continuo (una página)
- URL única con acceso del cliente
- La expansión de detalle es inline (no modal, no popup)
- Responsive: la experiencia se ha diseñado para funcionar en móvil primero

### Canal secundario: PDF descargable

- Misma estructura visual
- El contenido expandido por defecto en el dashboard se mantiene expandido en el PDF
- El contenido colapsado en el dashboard se omite o se incluye como nota al pie
- El PDF NO es el producto principal — es una concesión a quien necesita papel

### Anexo técnico

- PDF descargable independiente
- Enlace directo desde cada capa del dashboard ("Ver justificación técnica")
- También accesible desde un botón global "Descargar anexo técnico completo"

---

*Fin del documento — Arquitectura del Documento de Decisiones*
*Siguiente paso: Prototipo visual del documento de decisiones (Storybook)*