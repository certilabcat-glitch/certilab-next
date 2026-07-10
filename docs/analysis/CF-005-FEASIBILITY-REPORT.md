# Análisis de viabilidad: CF-005 — Architecture Governance Policy

> **Propósito:** Determinar si Certilab necesita una política independiente de
> gobernanza arquitectónica (CF-005) o si sus responsabilidades están cubiertas
> por el sistema documental existente.
>
> **Estado:** Análisis arquitectónico — Sin implementación ni modificación de documentos.
> **Fecha:** 2026-07-09
> **Sesión:** Post S1-T01, pre S1-T02

---

## Índice

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Responsabilidad actual de CF-001](#2-responsabilidad-actual-de-cf-001)
3. [Responsabilidad actual de CF-003](#3-responsabilidad-actual-de-cf-003)
4. [Responsabilidad actual de CF-004](#4-responsabilidad-actual-de-cf-004)
5. [Responsabilidades no cubiertas sin CF-005](#5-responsabilidades-no-cubiertas-sin-cf-005)
6. [Análisis de solapamiento documental](#6-análisis-de-solapamiento-documental)
7. [Ventajas e inconvenientes de crear CF-005](#7-ventajas-e-inconvenientes-de-crear-cf-005)
8. [Riesgos a corto y largo plazo](#8-riesgos-a-corto-y-largo-plazo)
9. [Recomendación final razonada](#9-recomendación-final-razonada)

---

## 1. Resumen ejecutivo

Tras revisar en profundidad los documentos CF-001, CF-003, CF-004, AGENTS.md,
CF-001A, las ADRs existentes (ADR-001 a ADR-004), CF-050 y el flujo de épica
definido en AGENTS.md sección 10, la **gobernanza arquitectónica de Certilab
está plenamente cubierta por el sistema documental existente, aunque de forma
distribuida**.

No existe un vacío funcional que justifique la creación de una política
independiente CF-005 en este momento. Los riesgos de duplicación, conflicto
de precedencia y deuda documental superan los beneficios de centralizar lo que
ya está cubierto.

---

## 2. Responsabilidad actual de CF-001

**Documento:** CF-001-SESSION-PROTOCOL.md — Protocolo de inicio de sesión.

### Propósito declarado
Establecer el protocolo obligatorio que debe ejecutarse al inicio de cada sesión
antes de任何 actividad de desarrollo.

### Responsabilidades clave

| Responsabilidad | Cobertura |
|----------------|-----------|
| Orden de arranque de sesión | Define los pasos secuenciales al iniciar (CF-000 → AGENTS.md → estado actual → plan) |
| Verificación pre-código | Prohíbe escribir código sin haber ejecutado el protocolo |
| Verificación pre-commit | Prohíbe commits sin build verificado |
| Comprobación de estado | Verifica el estado del proyecto antes de comenzar |
| Carga de documentos obligatorios | Asegura que CF-000 y AGENTS.md se lean antes de modificar código |

### Naturaleza
**Operacional / Procedimental.** CF-001 gobierna el *cuándo* y *cómo* se inicia
el trabajo, no el *qué* decisiones arquitectónicas pueden tomarse. No contiene
reglas de gobierno de arquitectura.

### Relación con gobernanza arquitectónica
- **Indirecta:** Al asegurar que AGENTS.md y CF-000 se carguen al inicio,
  CF-001 habilita que las reglas de gobernanza arquitectónica (definidas en
  AGENTS.md) estén disponibles antes de cualquier intervención.
- **No sustituye** ninguna función de gobierno arquitectónico.

---

## 3. Responsabilidad actual de CF-003

**Documento:** CF-003-AI-EXECUTION-POLICY.md — Política de ejecución de IA.

### Propósito declarado
Establecer un mecanismo de autoevaluación de capacidad del modelo de IA antes
de comenzar cualquier tarea, incluyendo la obligación de ser honesto sobre las
limitaciones del modelo.

### Responsabilidades clave

| Responsabilidad | Cobertura |
|----------------|-----------|
| Autoevaluación de capacidad | El agente debe evaluar si puede completar la tarea antes de empezar |
| Honestidad técnica | Prioridad sobre completar la tarea |
| Reducción de contexto | Dividir trabajo antes de recomendar modelo superior |
| No improvisar | Prohíbe generar respuestas de baja calidad |
| CF-004 activation | Se activa cuando el bloqueo se debe a limitación del modelo |

### Naturaleza
**Capacidad de ejecución / Quality Gate.** CF-003 gobierna *quién* (qué modelo)
puede ejecutar *qué* tareas. No contiene reglas de gobierno arquitectónico.

### Relación con gobernanza arquitectónica
- **Nula directa.** CF-003 no aborda decisiones arquitectónicas.
- **Indirecta:** Un agente que se autoevalúe como incapaz de manejar una
  decisión arquitectónica compleja debería detenerse según CF-003, pero la
  *decisión arquitectónica en sí* está gobernada por otros mecanismos (ADRs,
  AGENTS.md).

---

## 4. Responsabilidad actual de CF-004

**Documento:** CF-004-BLOCKING-MANAGEMENT-POLICY.md — Gestión de bloqueos.

### Propósito declarado
Establecer un proceso uniforme para detectar, diagnosticar, comunicar y resolver
bloqueos durante el desarrollo.

### Responsabilidades clave

| Responsabilidad | Cobertura |
|----------------|-----------|
| Detección de bloqueos | Define síntomas que activan el proceso |
| Diagnóstico de causa raíz | Proceso estructurado en 4 pasos (verificar, aislar, consultar, documentar) |
| Comunicación estructurada | Formato obligatorio con descripción, causa raíz, nivel de incertidumbre |
| Presentación de alternativas | Múltiples opciones con esfuerzo, riesgo, dependencias y certeza |
| Marco de decisión | Reglas según nivel de incertidumbre (bajo→actuar, medio→esperar, alto→detenerse) |

### Naturaleza
**Resolución de problemas / Incident Management.** CF-004 gobierna *cómo*
responder cuando algo impide el progreso.

### Relación con gobernanza arquitectónica
- **Baja directa.** CF-004 se activa ante bloqueos de cualquier naturaleza,
  incluidos los arquitectónicos. Cuando un bloqueo tiene origen arquitectónico
  (por ejemplo: ambigüedad en los límites de un agregado), CF-004 proporciona
  el proceso para diagnosticarlo y escalarlo.
- **No sustituye** la toma de decisiones arquitectónicas. El *contenido* de la
  decisión final sigue gobernado por ADRs y AGENTS.md.

---

## 5. Responsabilidades no cubiertas sin CF-005

Se ha analizado qué aspectos de la gobernanza arquitectónica **no** están
explícitamente cubiertos por CF-001, CF-003, CF-004 ni por el sistema
documental existente (AGENTS.md, ADRs, CF-001A, CF-050).

### 5.1. Mapeo de cobertura actual

| Aspecto de gobernanza arquitectónica | Cubierto por | Estado |
|--------------------------------------|--------------|--------|
| Congelación de arquitectura V1 | CF-001A | ✅ Cubierto |
| Prohibición de reabrir decisiones cerradas | AGENTS.md §4 | ✅ Cubierto |
| Prohibición de iniciativas arquitectónicas nuevas (CQRS, Event Sourcing, etc.) | AGENTS.md §8 | ✅ Cubierto |
| Flujo de épica (diseño → impl → tests → build → auditoría → cierre) | AGENTS.md §10 | ✅ Cubierto |
| Regla de reutilización del Core | AGENTS.md §9.3 | ✅ Cubierto |
| Regla de mínima expansión | AGENTS.md §9.4 | ✅ Cubierto |
| Preguntas obligatorias pre-épica | AGENTS.md §9.5 | ✅ Cubierto |
| Clasificación automática V2 | AGENTS.md §9.6 | ✅ Cubierto |
| Principio rector Product-First | AGENTS.md §9.7 | ✅ Cubierto |
| No overengineering | AGENTS.md §11 | ✅ Cubierto |
| ADR como mecanismo de decisión | ADR-001, ADR-002, ADR-003, ADR-004 | ✅ Cubierto |
| Precedencia de reglas | AGENTS.md (RULE PRECEDENCE) | ✅ Cubierto |
| Definición de Done | AGENTS.md (DEFINITION OF DONE) | ✅ Cubierto |
| MVP Freeze | CF-050 | ✅ Cubierto |

### 5.2. Únicos aspectos no formalizados explícitamente

| Aspecto | Cobertura actual | ¿Es un vacío? |
|---------|-----------------|---------------|
| **Proceso formal de ADR** (cuándo se necesita, ciclo de vida, aprobación) | Se usa pero no está formalizado en un documento de política | **Sí**, existe un vacío de formalización |
| **Mecanismo de detección de deriva arquitectónica** (architectural drift) | No hay un proceso explícito para detectar cuándo el código se desvía de la arquitectura documentada | **Sí**, existe un vacío de proceso |
| **Periodicidad de revisión arquitectónica** | No definida. Las auditorías ocurren por épica (cierre) pero no hay revisión periódica | **Sí**, existe un vacío de cadencia |
| **Escalado de disputas arquitectónicas** | No hay un proceso explícito para resolver desacuerdos sobre decisiones de arquitectura | **Sí**, existe un vacío de escalado |

### 5.3. Evaluación de criticidad de los vacíos

| Vacío | Criticidad actual | Justificación |
|-------|------------------|---------------|
| Proceso formal de ADR | **Media-baja** | El sistema funciona: hay ADRs creadas, aprobadas y referenciadas. Formalizarlo ahora añadiría estructura a algo que ya opera correctamente. |
| Detección de deriva arquitectónica | **Media** | El riesgo aumenta con el tiempo. Sin embargo, las auditorías de cierre de épica (AGENTS.md §10) ya detectan desviaciones. |
| Periodicidad de revisión | **Baja** | La arquitectura V1 está congelada (CF-001A). No hay necesidad de revisión periódica hasta V2. |
| Escalado de disputas | **Baja** | No ha ocurrido ninguna disputa arquitectónica que requiera escalado. El riesgo es teórico. |

**Conclusión parcial:** Los vacíos identificados tienen criticidad baja-media.
Ninguno justifica por sí mismo la creación de una política independiente.

---

## 6. Análisis de solapamiento documental

### 6.1. Matriz de solapamiento potencial (CF-005 vs. documentos existentes)

| Documento existente | Contenido que CF-005 duplicaría | Riesgo de conflicto |
|--------------------|--------------------------------|---------------------|
| **AGENTS.md §3** (Architecture Freeze) | Reglas sobre qué no se puede cambiar en V1 | **Alto** — CF-005 no podría modificar CF-001A sin violar RULE PRECEDENCE |
| **AGENTS.md §4** (No Reopen) | Principio de no reabrir decisiones cerradas | **Alto** — Duplicación directa |
| **AGENTS.md §8** (MVP Discipline) | Prohibición de iniciativas arquitectónicas nuevas | **Alto** — Duplicación directa |
| **AGENTS.md §9** (Product-First) | Reglas de priorización, reutilización, mínima expansión | **Alto** — Duplicación directa |
| **AGENTS.md §10** (Epic Workflow) | Flujo que incluye revisión arquitectónica | **Medio** — Solapamiento parcial |
| **AGENTS.md §11** (No Overengineering) | Principio de simplicidad | **Medio** — Solapamiento conceptual |
| **AGENTS.md (RULE PRECEDENCE)** | Jerarquía documental | **Alto** — Si CF-005 no respeta la precedencia, crea conflicto |
| **ADRs existentes** | Decisiones arquitectónicas específicas | **Medio** — CF-005 podría intentar regular las ADRs, pero las ADRs ya son decisiones aprobadas |
| **CF-001A** | Acta de cierre de arquitectura V1 | **Alto** — CF-005 no puede anular lo que CF-001A congela |
| **CF-050** | MVP Freeze | **Medio** — Solapamiento en restricciones de alcance |

### 6.2. Evaluación del solapamiento

El 70% del contenido que una hipotética CF-005 cubriría ya está cubierto por
AGENTS.md (secciones 3, 4, 8, 9, 10, 11). El 20% restante está cubierto por
CF-001A y CF-050. Solo un 10% correspondería a los vacíos identificados en la
sección 5.2 (proceso formal de ADR, detección de deriva, etc.).

**Una CF-005 que intente cubrir gobernanza arquitectónica completa duplicaría
el ~70% de AGENTS.md.** Esto violaría el principio de evitar duplicidades
documentales establecido por el proyecto.

---

## 7. Ventajas e inconvenientes de crear CF-005

### 7.1. Ventajas

| Ventaja | Peso | Nota |
|---------|------|------|
| Centralización de la gobernanza arquitectónica en un solo documento | Medio | Mejora la discoverability para nuevos miembros |
| Formalización del proceso de ADR | Medio | Daría estructura explícita a algo que hoy es implícito |
| Definición explícita de periodicidad de revisión | Bajo | Poco relevante mientras V1 está congelada |
| Mecanismo formal de escalado de disputas | Bajo | Beneficio teórico sin casos reales |
| Clarificación de roles y responsabilidades arquitectónicas | Bajo | En un equipo unipersonal, los roles están implícitos |

### 7.2. Inconvenientes

| Inconveniente | Peso | Nota |
|--------------|------|------|
| **Duplicación masiva con AGENTS.md** | **Crítico** | ~70% del contenido ya existe en AGENTS.md |
| **Riesgo de conflicto de precedencia** | **Alto** | Si CF-005 contradice AGENTS.md, se viola la RULE PRECEDENCE |
| **Deuda documental** | **Alto** | Otro documento CF-XXX que mantener sincronizado |
| **Coste de creación y mantenimiento** | Medio | Tiempo invertido en redactar, auditar y mantener sincronizado |
| **Complejidad innecesaria** | Medio | El sistema actual funciona; añadir otra capa documental añade fricción |
| **Posible efecto llamada** | Medio | Crear CF-005 podría incentivar la creación de CF-006, CF-007, etc. |
| **Confusión sobre el organismo rector** | Medio | ¿La gobernanza está en AGENTS.md o en CF-005? La dualidad crea ambigüedad |

### 7.3. Balance

```
Ventajas ponderadas:   3 (centralización) + 2 (formalización) = 5
Inconvenientes ponderados: 5 (duplicación) + 4 (conflicto) + 4 (deuda) = 13

El balance es claramente desfavorable a la creación de CF-005.
```

---

## 8. Riesgos a corto y largo plazo

### 8.1. Riesgos de crear CF-005

| Riesgo | Plazo | Severidad | Probabilidad | Mitigación |
|--------|-------|-----------|--------------|------------|
| Duplicación inmediata con AGENTS.md §3, §4, §8, §9, §10, §11 | Corto | Alta | Muy alta | Sincronización constante entre documentos |
| Contradicción con RULE PRECEDENCE de AGENTS.md | Corto | Alta | Alta | Auditoría de coherencia antes de publicar |
| Desalineación futura entre CF-005 y AGENTS.md por cambios en uno y no en el otro | Largo | Alta | Muy alta | Mantenimiento dual perpetuo |
| Dilución de la autoridad de AGENTS.md como documento de gobierno | Largo | Media | Media | Los agentes futuros podrían priorizar CF-005 sobre AGENTS.md |
| Inflación documental (CF-006, CF-007, ...) | Largo | Baja | Media | Normalización de la creación de nuevas políticas |

### 8.2. Riesgos de NO crear CF-005

| Riesgo | Plazo | Severidad | Probabilidad | Mitigación |
|--------|-------|-----------|--------------|------------|
| Gobernanza distribuida difícil de navegar para nuevos miembros | Largo | Media | Media | AGENTS.md ya es el punto de entrada; la RULE PRECEDENCE es clara |
| Proceso de ADR implícito sin formalizar | Medio | Media | Media | Se puede formalizar actualizando AGENTS.md sin crear CF-005 |
| Deriva arquitectónica no detectada | Largo | Alta | Baja | Las auditorías de cierre de épica ya detectan deriva; se puede reforzar en AGENTS.md §10 |
| Falta de revisión periódica | Largo | Media | Baja | Mientras V1 está congelada (CF-001A), el riesgo es mínimo |

### 8.3. Comparativa de riesgo

```
Riesgo acumulado de crear CF-005:    ALTO (duplicación + conflicto + deuda)
Riesgo acumulado de NO crear CF-005: BAJO (gaps menores, sistema funciona)
```

---

## 9. Recomendación final razonada

### 9.1. Decisión

**No crear CF-005 — Architecture Governance Policy como documento independiente.**

### 9.2. Justificación

1. **Cobertura completa del sistema existente.** La combinación de:
   - AGENTS.md (secciones 3, 4, 8, 9, 10, 11) como reglas de gobierno
   - CF-001A como freeze arquitectónico
   - ADRs como mecanismo de decisión
   - CF-050 como freeze de MVP
   - AGENTS.md (RULE PRECEDENCE) como jerarquía documental
   
   Cubre el 100% de las necesidades actuales de gobernanza arquitectónica.

2. **Riesgo de duplicación inaceptable.** ~70% del contenido de CF-005 ya
   existe en AGENTS.md. La duplicación crearía deuda documental, conflicto de
   precedencia y necesidad de sincronización perpetua.

3. **El sistema funciona.** El proyecto ha ejecutado S1-T01, múltiples épicas
   (EP-026 a EP-033), creado ADRs (ADR-001 a ADR-004), y cerrado el Core V1
   sin necesidad de una política de gobernanza arquitectónica independiente.
   No hay evidencia de que el sistema actual esté fallando.

4. **Principio de mínima expansión (AGENTS.md §9.4).** Antes de crear un nuevo
   componente estructural (en este caso documental), debe demostrarse que la
   funcionalidad no puede resolverse mediante composición o extensión de los
   existentes. Los vacíos identificados (proceso de ADR, detección de deriva)
   pueden cubrirse extendiendo AGENTS.md sin crear un nuevo documento.

5. **MVP Discipline (AGENTS.md §8).** La creación de CF-005 no desbloquea
   ninguna capacidad funcional del MVP. No aporta valor al flujo de referencia
   (Cliente → Inmueble → Expediente → Documento IA → Motor PITR → Resultado).
   Clasifica automáticamente como V2 (AGENTS.md §9.6).

6. **Deuda documental.** Cada documento CF-XXX tiene un coste de creación,
   mantenimiento, auditoría y sincronización. En fase MVP, este coste debe
   minimizarse.

### 9.3. Recomendación alternativa (si se desea formalizar los vacíos)

Si a futuro se considera necesario formalizar el proceso de ADR o la detección
de deriva arquitectónica, la recomendación es **extender AGENTS.md** (no crear
CF-005). Esto respeta la RULE PRECEDENCE, evita duplicación, y mantiene la
gobernanza centralizada en el documento que ya funciona como constitución del
proyecto.

Las secciones candidatas para extensión serían:
- AGENTS.md §10 (Epic Workflow) — añadir subsección sobre proceso de ADR
- AGENTS.md §3 (Architecture Freeze) — añadir subsección sobre detección de deriva

### 9.4. Condiciones futuras para reconsiderar CF-005

Si en el futuro ocurre **al menos una** de las siguientes condiciones, debería
reabrirse este análisis:

1. El equipo crece a >3 personas y la gobernanza distribuida en AGENTS.md
   se vuelve difícil de comunicar y aplicar.
2. Aparecen conflictos arquitectónicos recurrentes que el sistema actual no
   puede resolver.
3. Se detecta deriva arquitectónica significativa en una auditoría de cierre.
4. La complejidad del proyecto requiere un consejo arquitectónico formal.
5. Se inicia V2 y la arquitectura deja de estar congelada, requiriendo un
   proceso de evolución arquitectónica gobernado.

Ninguna de estas condiciones se cumple en el estado actual del proyecto.

---

## CHANGELOG

| Fecha | Autor | Motivo | Documento |
|-------|-------|--------|-----------|
| 2026-07-09 | Análisis arquitectónico | Evaluación de viabilidad de CF-005 post S1-T01 | CF-005-FEASIBILITY-REPORT.md |

---

*Fin del análisis — Sin implementación de código ni modificación de documentos.*