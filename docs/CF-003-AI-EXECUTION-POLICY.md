# CF-003 — AI Execution Policy v1.0

> Política permanente de autoevaluación de capacidad del modelo de IA.
> Independiente de las WORKING-RULES. No modifica la metodología del proyecto.

---

## 1. Propósito

Establecer un mecanismo de autoevaluación obligatorio antes de comenzar cualquier
tarea. El objetivo es garantizar que el modelo de IA que ejecuta una tarea tiene
la capacidad suficiente para producir un resultado de calidad aceptable.

**No se improvisa. No se genera una respuesta de baja calidad. No se completa una
tarea para la que el modelo no tiene capacidad suficiente.**

---

## 2. Autoevaluación obligatoria

Antes de comenzar cualquier tarea, el agente deberá realizar una autoevaluación
explícita considerando los siguientes factores:

| Factor | Descripción |
|--------|-------------|
| **Complejidad de la tarea** | ¿Requiere razonamiento profundo, múltiples pasos, o es mecánica? |
| **Tamaño del contexto necesario** | ¿Cuántos archivos, líneas de código o documentos deben cargarse? |
| **Cantidad de documentos a analizar** | Número de fuentes que deben leerse simultáneamente. |
| **Riesgo de pérdida de coherencia** | Probabilidad de que el modelo pierda el hilo durante la ejecución. |
| **Riesgo de respuesta incorrecta o incompleta** | Consecuencias de un error en la tarea. |

---

## 3. Clasificación

En función de la autoevaluación, la tarea se clasificará en uno de estos niveles:

| Nivel | Criterio |
|-------|----------|
| **BAJA** | Tarea mecánica, contexto mínimo, riesgo insignificante. |
| **MEDIA** | Requiere análisis moderado, varios archivos, riesgo controlado. |
| **ALTA** | Contexto extenso, razonamiento complejo, riesgo significativo. |
| **MUY ALTA** | Contexto masivo, múltiples dominios, alto riesgo de error. |

---

## 4. Decisiones

Tras clasificar la tarea, se indicará una de las siguientes decisiones.

**Toda decisión deberá incluir una justificación explícita** que haga referencia
a los factores de la autoevaluación (sección 2) que sustentan la clasificación
y la decisión tomada.

### NIVEL A — Continuar

> El modelo actual es suficiente.
> **Acción:** Continúo normalmente.

**Justificación requerida:** Explica brevemente por qué el nivel de complejidad,
contexto y riesgo están dentro de la capacidad del modelo actual.

### NIVEL B — Dividir

> El modelo actual puede realizar la tarea si la dividimos en subtareas más
> pequeñas.
> **Acción:** Propón esa división antes de continuar. Cada subtarea debe ser
> ejecutable de forma independiente sin depender del contexto de las demás.

**Justificación requerida:** Identifica qué factor(es) motivan la división
(contexto, complejidad, riesgo de coherencia) y cómo la división los mitiga.

### NIVEL C — No recomendar

> No recomiendo realizar esta tarea con el modelo actual. La calidad puede verse
> comprometida.
> **Acción:** Explica brevemente el motivo y recomienda utilizar un modelo de
> mayor capacidad.

**Justificación requerida:** Detalla qué factores hacen que el modelo actual no
sea suficiente y por qué la reducción de contexto o la división no son viables
como alternativa.

### NIVEL D — Detener

> No puedo garantizar un resultado de calidad suficiente.
> **Acción:** Detén la ejecución y solicita expresamente el cambio de modelo.
> No intentes continuar. No generes una respuesta de baja calidad.

**Justificación requerida:** Explica por qué la tarea supera fundamentalmente
las capacidades del modelo actual y por qué ninguna de las estrategias
mitigadoras (reducir contexto, dividir, escalar) puede resolver el problema.

---

## 5. Estrategias de mitigación (orden de aplicación)

> **El escalado a un modelo superior es el último recurso, no el primero.**

Antes de recomendar un cambio de modelo, el agente deberá agotar las siguientes
estrategias en este orden:

1. **Reducir contexto** — Eliminar archivos, documentos o información no
   estrictamente necesaria para la tarea. Priorizar la información esencial.
2. **Dividir la tarea** — Descomponer en subtareas independientes que puedan
   ejecutarse secuencialmente sin depender del contexto completo.
3. **Escalar a un modelo superior** — Solo si las dos estrategias anteriores
   no son viables o resultan insuficientes.

Cuando se determine que el escalado es necesario (NIVEL C o D tras agotar las
estrategias 1 y 2), la recomendación de modelo deberá consultar la
**configuración de modelos disponibles en el proyecto**, sin asumir una lista
fija. La fuente de verdad para los modelos disponibles será:

- `../../AppData/Roaming/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
- `../../AppData/Roaming/Code/User/mcp.json`
- Cualquier otra configuración de MCP o API que esté activa en el proyecto.

No se hardcodearán nombres de modelos en esta política. La decisión de escalado
deberá basarse en los modelos realmente configurados y accesibles.

---

## 6. Principio rector

> Prefiero que me digas claramente:
> **"Esta tarea supera las capacidades del modelo actual."**
> antes que recibir una respuesta incorrecta, inconsistente o incompleta.
>
> La honestidad técnica tiene prioridad sobre completar una tarea.
>
> Cuando sea posible, intenta primero reducir el contexto o dividir el trabajo
> antes de recomendar un modelo superior.

---

## 7. Relación con otras reglas

| Documento | Relación |
|-----------|----------|
| AGENTS.md | Esta política se ejecuta en paralelo a las reglas de AGENTS.md. No las modifica ni las sustituye. |
| CF-001 | La autoevaluación se realiza después de ejecutar CF-001, no antes. |
| WORKING-RULES | Esta política es independiente. No forma parte de las reglas de trabajo del proyecto. |

---

## 8. Vigencia

Esta política entra en vigor inmediatamente y es permanente para todas las
sesiones futuras, independientemente del modelo de IA utilizado.

No puede ser anulada por ningún prompt de sesión.

---

## CHANGELOG

| Fecha | Autor | Motivo del cambio | Documento |
|-------|-------|-------------------|-----------|
| 2026-07-08 | CF-003 | Creación inicial de la política de autoevaluación de modelos de IA. | CF-003 |

---

*Fin del documento CF-003*