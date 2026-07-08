# Protocolo de Validación de Comprensión — Documento de Decisiones

> **Objetivo:** Verificar si una persona sin conocimientos técnicos entiende el Documento de Decisiones lo suficiente para tomar una decisión informada sobre su vivienda.
>
> **Duración estimada por sesión:** 15-20 minutos.
>
> **Perfil:** Propietario de vivienda (no técnico, no arquitecto, no ingeniero).
>
> **Escenario de prueba:** Prototipo Storybook (3 stories representativas).

---

## Metodología

**Formato:** Entrevista semiestructurada individual (presencial o videollamada).

**Material necesario:**
- Prototipo Storybook con las 3 stories seleccionadas
- Cronómetro
- Hoja de respuestas (físico o formulario)
- Grabación de pantalla + audio (consentimiento previo)

**Muestra mínima recomendada:** 5 personas por story. 15 total (con cruce de perfiles).

**Reclutamiento:** Personas que hayan pedido un CEE en los últimos 2 años o estén pensando en reformar su vivienda. No deben tener formación técnica en edificación.

---

## Selección de Stories para la prueba

Se prueban 3 escenarios que cubren el espectro completo de veredictos:

| Story | Veredicto | Perfil emocional | Se prueba con |
|-------|-----------|------------------|---------------|
| A | **Deficiente** (3 críticos) | Alarma / urgencia | Dueño de vivienda sin reformas recientes |
| B | **Regular** (2 críticos) | Ambigüedad / ansiedad moderada | Dueño con CEE previo E/F/G |
| C | **Buena** (sin críticos) | Tranquilidad / validación | Dueño con reformas recientes |

---

## Estructura de la sesión

### Fase 1: Exposición libre (sin preguntas previas)

> **Qué se mide:** Comprensión inicial, claridad, atención visual.

1. Mostrar la Story al usuario en pantalla.
2. Decir: _"Este es un documento que recibirías tras pedir un certificado energético. Míralo con calma."_
3. **No dar ninguna indicación adicional.**
4. Cronometrar en silencio.

**A los 5 segundos**, pausar y preguntar:

> **P1:** _En una frase, ¿qué te dice este documento?_

**A los 30 segundos**, preguntar:

> **P2:** _¿Crees que tu vivienda necesita reformas urgentes? ¿Por qué?_

> **P3:** _Señala con el dedo (o describe) qué parte del documento te ha llevado a esa conclusión._

---

### Fase 2: Preguntas de comprensión

> **Qué se mide:** Capacidad de extraer información concreta.

| # | Pregunta | Respuesta correcta | Indicador |
|---|----------|-------------------|-----------|
| C1 | _¿Cuál es el veredicto energético de tu vivienda?_ | Buena / Regular / Deficiente | Comprensión básica |
| C2 | _¿Hay algún problema que consideren "crítico"? ¿Cuántos?_ | N / S / N (número exacto de críticos) | Comprensión detallada |
| C3 | _¿Cuánto dinero perderías en 10 años si no haces nada?_ | La cifra mostrada en coste de inacción | Persuasión económica |
| C4 | _¿Cuánto podrías ahorrar al año si haces las reformas recomendadas?_ | La cifra mostrada en ahorro potencial | Persuasión económica |
| C5 | _¿Hay alguna actuación que "merezca la pena"? ¿Cuál?_ | La actuación con payback ≤ vida útil (o "ninguna") | Capacidad de decisión |

**Respuestas esperadas por story:**

| Story | C1 | C2 | C3 | C4 | C5 |
|-------|----|----|----|----|----|
| A (Deficiente) | Deficiente | 3 críticos | ~24.600 € | ~2.460 €/año | 3 actuaciones |
| B (Regular) | Regular | 2 críticos | ~12.400 € | ~1.240 €/año | Sí, al menos 1 |
| C (Buena) | Buena | 0 críticos | N/A (sin coste) | ~1.850 €/año | **"No merece la pena ninguna"** (payback 57a) |

**Pregunta posterior (solo si C5 tiene actuaciones):**

> **C6:** _Si tuvieras que elegir una sola actuación para empezar, ¿cuál sería? ¿Por qué?_

---

### Fase 3: Capacidad de decisión

> **Qué se mide:** Si el usuario puede traducir la información en una acción concreta. Al final de la fase, se registra si el usuario **tiene una decisión tomada**, independientemente de cuál sea.

**Escenario simulado:**

> _"Imagina que tienes 5.000 € ahorrados y quieres decidir si gastarlos en reformas o no. Basándote en este documento, ¿qué harías?"_

**Opciones de respuesta (abierta):**

| Acción esperada | Story A | Story B | Story C |
|-----------------|---------|---------|---------|
| Haría reformas | ✅ Alta prioridad | ✅ Moderada | ❌ No necesario |
| No haría nada | — | — | ✅ Razonable |
| Pediría más presupuestos | ✅ Razonable | ✅ Razonable | — |
| Consultaría a un técnico | ✅ Razonable | ✅ Razonable | — |

**Anotar:** ¿La decisión del usuario se alinea con el veredicto y los datos mostrados?

**Pregunta adicional para Story C:**

> _Si tuviéramos que decirte "Tu vivienda cumple los requisitos 2030, no necesitas reformar", ¿cambiaría tu decisión?_

**Métrica: Decisión tomada** — Al final de la fase, registrar:

> **D1:** _Después de ver el documento, ¿tienes clara tu decisión sobre si reformar o no tu vivienda?_

| Respuesta | Significado |
|-----------|-------------|
| Sí, clara | El documento cumple su función de habilitar decisión |
| Más o menos | Comprensión parcial, duda persistente |
| No, me falta información | El documento no es suficiente por sí solo |

> Lo importante no es cuál sea la decisión, sino que **exista**. Si el usuario responde "Sí, clara", el documento ha cumplido su función principal: permitir tomar una decisión informada.

---

### Fase 4: Recuerdo (sin el documento visible)

> **Qué se mide:** Qué información retiene el usuario tras la exposición.

**Ocultar el prototipo. Preguntar:**

> **R1:** _Sin mirar el documento, ¿qué es lo más importante que recuerdas?_

> **R2:** _¿Dirías que la vivienda está en buena o mala situación energética? ¿Qué te hace decirlo?_

> **R3:** _¿Recuerdas alguna cifra concreta? (No pasa nada si no es exacta, dime qué recuerdas)_

**Clasificar el recuerdo como:**

- ✅ **Alta fidelidad:** Recuerda veredicto + al menos una cifra clave sin ayuda.
- ⚠️ **Fidelidad media:** Recuerda veredicto pero no cifras, o necesita prompting.
- ❌ **Baja fidelidad:** No recuerda el veredicto ni cifras.

---

### Fase 5: Cierre y retroalimentación

> **Qué se mide:** Satisfacción subjetiva, claridad percibida, y capacidad de transmitir el mensaje a otros.

> **S1:** _En una escala del 1 al 10, ¿qué tan claro te ha parecido el documento?_

> **S2:** _¿Qué parte del documento te ha costado más entender?_

> **S3:** _¿Qué cambiarías o añadirías?_

> **S4:** _Después de ver esto, ¿contratarías el servicio? (Sí / No / No estoy seguro)_

**Métrica: Capacidad de explicar** — Preguntar al final de la fase:

> **E1:** _Si ahora tuvieras que enseñarle este documento a tu pareja o a otra persona, ¿qué le explicarías primero?_

**Anotar** la respuesta textual del usuario. Esta pregunta revela:

- **Qué información genera valor percibido real** (no solo lo que el documento muestra, sino lo que el usuario considera importante compartir).
- **Cuál es el mensaje principal** que el cliente transmitiría a otros (el "elevator pitch" del documento).
- **Si el orden de importancia del usuario coincide con la jerarquía visual del documento** (Capa 1: veredicto → Capa 2: críticos → Capa 3: económicos).

**Clasificar la respuesta como:**

| Tipo | Ejemplo | Significado |
|------|---------|-------------|
| **Veredicto** | "Que está en regular, pero sin urgencia" | El veredicto es el mensaje principal que retiene |
| **Económico** | "Que pierdo 12.000 € si no hago nada" | El coste de inacción es lo más persuasivo |
| **Acción** | "Que debería cambiar la caldera primero" | La priorización de actuaciones es lo que transmite |
| **Técnico** | "Los valores de transmitancia y esos números" | El detalle técnico — señal de que la Capa 1 no comunica bien |
| **No sabría** | "Pues no sabría por dónde empezar" | El documento no deja un mensaje claro |

> Ideal: **Veredicto** o **Económico**. Aceptable: **Acción**. Preocupante: **Técnico** o **No sabría**.

---

## Hoja de respuestas (por sesión)

```
=== SESIÓN #ID ===
Usuario: [anon-ID]
Story: [A / B / C]
Fecha: [dd/mm/aaaa]

=== FASE 1: EXPOSICIÓN LIBRE ===
P1 (5s): _________________________________
P2 (30s): ________________________________
P3 (señalado): ___________________________

=== FASE 2: COMPRENSIÓN ===
C1 (veredicto):      ____ / correcto
C2 (nº críticos):    ____ / correcto
C3 (coste inacción): ____ / correcto
C4 (ahorro/año):     ____ / correcto
C5 (más merece):     ____ / correcto
C6 (cuál): ________________________________

=== FASE 3: DECISIÓN ===
Decisión: ________________________________
Alineada con datos: [Sí / No / Parcial]
D1 (decisión clara): [Sí, clara / Más o menos / No, me falta info]

=== FASE 4: RECUERDO ===
R1 (espontáneo): _________________________
R2 (veredicto):    ____ / correcto
R3 (cifras):       ____ / correcto
Fidelidad: [Alta / Media / Baja]

=== FASE 5: CIERRE ===
S1 (claridad 1-10): ____
S2 (más costoso): _________________________
S3 (cambiaría): ___________________________
S4 (contrataría): [Sí / No / No estoy seguro]
E1 (qué explicaría primero): ______________
Clasificación E1: [Veredicto / Económico / Acción / Técnico / No sabría]

=== ANOTACIONES LIBRES ===
__________________________________________
```

---

## Criterios de éxito

### Individual (por story)

| Indicador | Objetivo mínimo | Objetivo deseable |
|-----------|----------------|-------------------|
| Acierto C1 (veredicto) | 80% | 100% |
| Acierto C2 (críticos) | 60% | 80% |
| Acierto C3 (coste inacción) | 50% | 70% |
| Acierto C5 (actuación prioritaria) | 60% | 80% |
| Decisión alineada con datos | 70% | 90% |
| Recuerdo alta fidelidad | 40% | 60% |
| Claridad percibida ≥ 7/10 | 60% | 80% |

### General (transversal)

- **Story A (Deficiente):** Debe obtener la puntuación más alta en comprensión y decisión. Si falla aquí, el documento no cumple su función principal (alarma → acción).
- **Story B (Regular):** Es la más crítica. Si la comprensión es baja, la ambigüedad persiste.
- **Story C (Buena):** Debe obtener claridad ≥ 8/10. Si es baja, hay ruido visual que sobra.

---

## Plan de ejecución recomendado

| Día | Actividad |
|-----|-----------|
| 1 | Reclutar 5 participantes (email / LinkedIn / conocidos no técnicos) |
| 2-4 | Realizar 5 sesiones (~1 sesión/día, 15 min c/u) |
| 5 | Analizar resultados y generar informe resumen |
| — | Decidir si iterar o validar definitivamente |

**Condición de parada:** Si tras 5 sesiones todas las métricas superan los objetivos mínimos, el documento se considera comprensible para el MVP. No se requieren más pruebas. Cualquier iteración adicional sería V2.

---

## Anexo: Guion para el entrevistador

### Apertura (2 min)

> _"Gracias por participar. Esto no es un examen. Queremos entender si un documento que explica la eficiencia energética de una vivienda es fácil de entender para personas sin conocimientos técnicos._
>
> _Te voy a mostrar una pantalla con un documento. Primero solo míralo, sin prisa. Luego te haré unas preguntas._
>
> _No hay respuestas incorrectas. Lo importante es tu opinión sincera."_

### Durante la prueba

- **No ayudar.** Si el usuario pregunta "¿esto qué significa?", responder: _"Tú dime qué crees que significa."_
- **No confirmar ni negar.** No decir "sí, eso es correcto" ni "no, no es así".
- **Anotar todo.** Las dudas, los gestos, los rodeos son datos.
- **Cronometrar** pero no apresurar. La fase 1 tiene hitos de 5s y 30s, pero si el usuario necesita más tiempo, dárselo.

### Cierre (2 min)

> _"Muchas gracias. Tus respuestas nos ayudan a mejorar el documento para que cualquier persona pueda entenderlo. Si tienes alguna pregunta sobre el contenido técnico, puedo resolverla ahora que la prueba ha terminado."_

---

## Criterio de aprobación del protocolo

Este protocolo se considera completo y listo para ejecutar cuando:

- [ ] Las 5 fases están definidas con preguntas y tiempos
- [ ] La hoja de respuestas captura todos los indicadores
- [ ] Los criterios de éxito están establecidos por story
- [ ] El plan de ejecución es factible en 5 días
- [ ] El guion del entrevistador está redactado