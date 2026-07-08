# CF-004 — Blocking Management Policy v1.0

> Política transversal y permanente de gestión de bloqueos.
> Independiente del lenguaje, framework, tecnología o arquitectura del proyecto.
> Los detalles técnicos específicos pertenecen a guías o checklists especializados,
> no a esta política.

---

## 1. Propósito

Establecer un proceso uniforme para detectar, diagnosticar, comunicar y resolver
bloqueos durante el desarrollo. Un bloqueo es cualquier situación que impide
progresar en una tarea de forma directa, ya sea por falta de información,
resultados inesperados, errores no resueltos o incertidumbre técnica.

El objetivo es evitar:
- Avanzar ciegamente sobre una base no verificada.
- Tomar decisiones sin conocer la causa raíz.
- Acumular deuda técnica por decisiones apresuradas.
- Perder tiempo en direcciones equivocadas.

---

## 2. Detección del bloqueo

Un bloqueo puede manifestarse de las siguientes formas:

| Síntoma | Descripción |
|---------|-------------|
| **Error inesperado** | Una operación falla sin una causa evidente. |
| **Resultado incoherente** | El output de una operación no coincide con lo esperado. |
| **Dependencia no disponible** | Un servicio, API, base de datos o recurso no responde o no está accesible. |
| **Información insuficiente** | No se dispone de los datos necesarios para tomar una decisión. |
| **Contradicción entre fuentes** | Dos o más fuentes de información proporcionan datos incompatibles. |
| **Incertidumbre técnica** | No se puede determinar si una solución es correcta sin verificaciones adicionales. |

**Regla:** Ante cualquiera de estos síntomas, la tarea debe pausarse y activar
el proceso de diagnóstico. **No se continúa sin antes comprender la causa raíz.**

---

## 3. Diagnóstico de causa raíz

Antes de proponer cualquier solución, deben agotarse las siguientes acciones de
diagnóstico en orden:

### 3.1. Verificar la información de entrada

- ¿Los datos de entrada son correctos y completos?
- ¿Las precondiciones necesarias están satisfechas?
- ¿El entorno o contexto de ejecución es el adecuado?

### 3.2. Aislar el punto de fallo

- Reducir el problema al mínimo posible (eliminar variables).
- Determinar si el fallo está en la entrada, el proceso o la salida.
- Reproducir el fallo de forma controlada si es posible.

### 3.3. Consultar fuentes de verdad

- Revisar la documentación oficial del componente o tecnología involucrada.
- Consultar la configuración y el estado actual del sistema.
- Verificar versiones, dependencias y compatibilidades.

### 3.4. Documentar hallazgos

- Registrar qué se esperaba, qué ocurrió y qué se ha descartado.
- Anotar las pruebas realizadas y sus resultados.
- Registrar el nivel de certeza de cada hallazgo.

**Regla:** No se salta ningún paso del diagnóstico. Si tras completar los cuatro
pasos el bloqueo persiste, se procede a la comunicación.

---

## 4. Comunicación del bloqueo

Todo bloqueo diagnosticado debe comunicarse con la siguiente estructura:

### 4.1. Descripción del problema

- ¿Qué se estaba intentando hacer?
- ¿Qué ocurrió en su lugar?
- ¿Cuál es el impacto inmediato sobre la tarea?

### 4.2. Causa raíz identificada

- ¿Cuál es la causa más probable del bloqueo?
- ¿Qué se ha descartado durante el diagnóstico?
- **Nivel de incertidumbre** (obligatorio): Alto, Medio o Bajo.

### 4.3. Nivel de incertidumbre

| Nivel | Significado |
|-------|-------------|
| **Bajo** | La causa raíz está confirmada. La solución es conocida y predecible. |
| **Medio** | La causa raíz es probable pero no confirmada al 100%. Existen hipótesis alternativas. |
| **Alto** | No se ha podido determinar la causa raíz con seguridad. Existen múltiples hipótesis no validadas. |

---

## 5. Presentación de alternativas

Una vez comunicado el bloqueo, debe presentarse al menos una alternativa de
resolución. Si existe más de una, deben enumerarse con sus respectivos pros y
contras.

Cada alternativa debe incluir:

- **Descripción** de la solución propuesta.
- **Esfuerzo estimado** (bajo, medio, alto).
- **Riesgo de la solución** (bajo, medio, alto).
- **Dependencias** necesarias para ejecutarla.
- **Certeza** de que resolverá el bloqueo (baja, media, alta).

### 5.1. Recomendación

De entre las alternativas presentadas, debe indicarse una recomendación explícita
y la justificación de por qué es la mejor opción.

**Formato de recomendación:**

> **Recomendación:** [alternativa seleccionada]
> **Justificación:** [razón principal]
> **Nivel de confianza en la recomendación:** [Alto / Medio / Bajo]

---

## 6. Decisión

Tras presentar el problema y las alternativas:

- Si la incertidumbre es **baja** y la recomendación es clara, puede ejecutarse
  la solución sin esperar confirmación explícita del usuario, informando de la
  acción tomada.
- Si la incertidumbre es **media**, debe presentarse el caso y esperar la
  decisión del usuario antes de actuar.
- Si la incertidumbre es **alta**, debe detenerse la ejecución y esperar
  instrucciones explícitas. No se intenta una solución no validada.

**Regla fundamental:** Cuando no haya suficiente certeza para actuar,
**detenerse y esperar** es la acción correcta. No se improvisa.

---

## 7. Activación de CF-003

Esta política se relaciona con CF-003 (AI Execution Policy) de la siguiente forma:

CF-003 se activa cuando el bloqueo se debe a una **limitación de capacidad del
modelo de IA** y no a un problema del sistema, la configuración o la información
disponible.

Indicadores de que el bloqueo puede requerir CF-003:
- El diagnóstico (sección 3) no ha podido completarse por falta de capacidad
  de procesamiento o contexto.
- Las alternativas propuestas (sección 5) requieren un nivel de razonamiento
  que supera las capacidades del modelo actual.
- El nivel de incertidumbre (sección 4.3) se mantiene en **Alto** tras haber
  agotado todos los pasos de diagnóstico.

En estos casos, debe activarse el procedimiento de autoevaluación de CF-003
antes de continuar.

---

## 8. Principio rector

> **No se avanza sobre incertidumbre no resuelta.**
>
> Es mejor detenerse y pedir ayuda que avanzar en la dirección equivocada.
>
> La transparencia sobre lo que no se sabe tiene más valor que una solución
> incorrecta entregada a tiempo.

---

## 9. Relación con otros documentos

| Documento | Relación |
|-----------|----------|
| CF-001 | El protocolo de sesión incluye comprobaciones que pueden detectar bloqueos antes de empezar. |
| CF-003 | Se activa cuando el bloqueo se debe a limitación de capacidad del modelo de IA. |
| AGENTS.md | Esta política complementa las reglas de ejecución transversales. |

---

## 10. Vigencia

Esta política entra en vigor inmediatamente y es permanente para todas las
sesiones futuras. Es independiente del lenguaje, framework, tecnología o
arquitectura del proyecto.

No puede ser anulada por ningún prompt de sesión.

---

## CHANGELOG

| Fecha | Autor | Motivo del cambio | Documento |
|-------|-------|-------------------|-----------|
| 2026-07-08 | CF-004 | Creación inicial de la política de gestión de bloqueos. | CF-004 |

---

*Fin del documento CF-004*