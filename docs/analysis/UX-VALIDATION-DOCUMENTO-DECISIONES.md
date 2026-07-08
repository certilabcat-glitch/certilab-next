# Validación UX — Documento de Decisiones (Prototipo Storybook)

> **Objetivo:** Validar que el prototipo cumple la promesa del producto:
> *"Entender en segundos lo que antes requería interpretar un informe técnico."*
>
> **Metodología:** Análisis exclusivo de experiencia de usuario. Sin revisión de código ni propuestas de rediseño.
> **Perfil evaluado:** Cliente propietario de vivienda (no técnico).

---

## Story 1 · Default (Regular — 2 críticos, 4 actuaciones)

| # | Pregunta | Observación |
|---|----------|-------------|
| 1 | **¿Qué entiende en 5s?** | Ve "Regular" y respira aliviado. No percibe urgencia. |
| 2 | **¿Qué entiende en 30s?** | Al abrir acordeones descubre 2 **críticos** (cubierta, caldera). Contradicción entre veredicto "Regular" y categoría "crítico". |
| 3 | **¿Bloque con demasiado esfuerzo?** | **SÍ — Prioridad ALTA.** El veredicto "Regular" y la etiqueta "crítico" coexisten sin jerarquía visual. El usuario duda: *"¿esto es grave o no?"* |
| 4 | **¿Información sobrante?** | Desglose de ahorro por concepto (calefacción/refrigeración/ACS/iluminación). En primera visita el cliente solo necesita el total. |
| 5 | **¿Información que pasa desapercibida?** | **Coste inacción a 10 años: 12.400 €.** Está en Capa 6. Si no expande todos los acordeones, no lo ve. Es el dato más persuasivo y está enterrado. |
| 6 | **Momento de máximo valor** | Cuando descubre que con 3 actuaciones "Merece la pena" puede ahorrar 1.240 €/año. Pero llega después de 3 clics. |

---

## Story 2 · Estado: Buena (1 mejora, 0 críticos, 0 importantes)

| # | Pregunta | Observación |
|---|----------|-------------|
| 1 | **¿Qué entiende en 5s?** | Ve **"Buena"** en verde (texto). Satisfacción inmediata. Objetivo cumplido. |
| 2 | **¿Qué entiende en 30s?** | Ve que la única actuación es "Valóralo" con payback de 57 años. Conclusión lógica: no hacer nada. |
| 3 | **¿Bloque con demasiado esfuerzo?** | No. Es la story más limpia. El problema es el opuesto: el cliente siente que pagó por un documento que le dice "no pasa nada". **El valor aquí es la tranquilidad**, no la acción. |
| 4 | **¿Información sobrante?** | Desglose de ahorro y proyecciones detalladas. Para una vivienda "Buena", estos números son irrelevantes. |
| 5 | **¿Información que pasa desapercibida?** | **"Tu vivienda cumple requisitos 2030"** está al final. Debería estar en Capa 1. Es la pregunta real: *"¿Me van a obligar a reformar?"* |
| 6 | **Momento de máximo valor** | Al leer "Buena" en los primeros 2 segundos. El resto del documento es validación de esa tranquilidad. |

---

## Story 3 · Estado: Deficiente (3 críticos, 1 importante, 4 actuaciones)

| # | Pregunta | Observación |
|---|----------|-------------|
| 1 | **¿Qué entiende en 5s?** | Ve **"Deficiente"** en rojo (texto). Alarma inmediata. **Esto funciona bien.** |
| 2 | **¿Qué entiende en 30s?** | Se enfrenta a 3 críticos + 4 actuaciones. Riesgo real de parálisis por sobrecarga. |
| 3 | **¿Bloque con demasiado esfuerzo?** | **SÍ — Prioridad ALTA.** El acordeón obliga a expandir cada problema manualmente. Un cliente con 3 críticos necesita una **vista resumen** que le diga "esto es lo prioritario" sin clics adicionales. |
| 4 | **¿Información sobrante?** | "Por qué importa" y "Si no actúas" son redundantes para críticos. Cuando algo es crítico, el cliente solo necesita saber **qué hacer y cuánto cuesta**. |
| 5 | **¿Información que pasa desapercibida?** | **"Obligatorio mín. D en 2033"** — Es un motivador legal muy potente pero está al final como texto plano. Debería destacarse visualmente. |
| 6 | **Momento de máximo valor** | Cuando ve que 3 actuaciones "Merece" suman 2.460 €/año de ahorro frente a 3.800 €/año de coste actual. Esa comparación lado a lado es muy poderosa. |

---

## Story 4 · Sin críticos (Regular — 1 importante, 1 mejora)

| # | Pregunta | Observación |
|---|----------|-------------|
| 1 | **¿Qué entiende en 5s?** | Ve "Regular" (igual que Story 1). Indistinguible visualmente de un caso con críticos. |
| 2 | **¿Qué entiende en 30s?** | Descubre que no hay críticos y solo 1 actuación "Merece". Alivio, pero ha tenido que explorar. |
| 3 | **¿Bloque con demasiado esfuerzo?** | **SÍ — Prioridad MEDIA.** El veredicto "Regular" es ambiguo. Un badge "Sin problemas críticos" en Capa 1 eliminaría la necesidad de explorar. |
| 4 | **¿Información sobrante?** | Proyecciones de coste inacción a 10 años (4.600 €) para una mejora opcional. El cliente puede ignorar el documento completo. |
| 5 | **¿Información que pasa desapercibida?** | "Tu vivienda podría necesitar mejoras antes de 2033" — Especulativo y genérico. No es información útil sin concreción. |
| 6 | **Momento de máximo valor** | Cuando confirma que no hay nada urgente. Pero ese momento llega tarde, después de inspeccionar. |

---

## Observaciones priorizadas por impacto (transversales)

| # | Impacto | Observación | Stories |
|---|---------|-------------|---------|
| 1 | **🔴 ALTO** | **Veredicto "Regular" es ambiguo.** Un cliente no distingue si "Regular" significa "podría ser peor" (Story 4) o "tienes 2 críticos" (Story 1). Necesita un sub-veredicto tipo "Sin urgencia" / "Requiere atención". | 1, 4 |
| 2 | **🔴 ALTO** | **Coste de inacción a 10 años es el dato más persuasivo pero está en la última capa.** Debería ser visible sin expansión (Capa 1). | 1 (12.400€), 3 (24.600€) |
| 3 | **🔴 ALTO** | **El veredicto no tiene color.** Para "entender en segundos", el color del veredicto (verde/ámbar/rojo) es el atajo visual principal. Actualmente es solo texto. | Todas |
| 4 | **🟡 MEDIO** | **"Merece la pena" / "Valóralo" no se explica por sí mismo.** Un cliente no sabe qué criterio separa uno de otro. Sugerencia: tooltip o nota al pie "recuperas la inversión en ≤15 años". | 1, 3 |
| 5 | **🟡 MEDIO** | **Desglose de ahorro (4 conceptos) es micro-detalle.** Ocupa espacio vertical sin beneficio en primera visita. Podría colapsarse por defecto. | 1, 3 |
| 6 | **🟢 BAJO** | **Story 2 (Buena): el resto del documento sobra.** Un cliente que ve "Buena" en 2 segundos no necesita leer 6 capas. Podría tener CTA "Descargar resumen" y ocultar el resto. | 2 |
| 7 | **🟢 BAJO** | **Anexo Técnico placeholder.** Si no hay PDF descargable, mejor ocultar la sección que mostrar "Próximamente". | Todas |

---

## Veredicto

**El prototipo cumple la promesa base** — un cliente con vivienda "Deficiente" o "Buena" entiende su situación en segundos. El problema principal está en la **gama media** (veredicto "Regular"), donde la ambigüedad del término obliga al usuario a explorar para decidir si debe preocuparse.

La prioridad #1 es resolver la **legibilidad instantánea del veredicto**: color + sub-veredicto + métrica principal visible sin interacción.