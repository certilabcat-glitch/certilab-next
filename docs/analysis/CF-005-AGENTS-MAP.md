# Segunda revisión: Mapeo de gaps en AGENTS.md

> **Propósito:** Identificar con precisión dónde AGENTS.md cubre o puede cubrir
> los cuatro gaps detectados (ADR, deriva arquitectónica, periodicidad de
> revisión, escalado de disputas), y proponer las modificaciones mínimas
> necesarias para cerrarlos sin crear CF-005.
>
> **Estado:** Plan de cambios — Sin modificar AGENTS.md.
> **Fecha:** 2026-07-09
> **Depende de:** docs/analysis/CF-005-FEASIBILITY-REPORT.md

---

## Índice

1. [Gap 1 — Proceso formal de ADR](#gap-1--proceso-formal-de-adr)
2. [Gap 2 — Detección de deriva arquitectónica](#gap-2--detección-de-deriva-arquitectónica)
3. [Gap 3 — Periodicidad de revisión arquitectónica](#gap-3--periodicidad-de-revisión-arquitectónica)
4. [Gap 4 — Escalado de disputas arquitectónicas](#gap-4--escalado-de-disputas-arquitectónicas)
5. [Consolidación del plan de cambios](#5-consolidación-del-plan-de-cambios)
6. [Evaluación de impacto](#6-evaluación-de-impacto)
7. [Conclusión](#7-conclusión)

---

## Gap 1 — Proceso formal de ADR

### Situación actual en AGENTS.md

Las ADRs se mencionan en dos lugares:

| Sección | Referencia | Naturaleza |
|---------|-----------|------------|
| §3 — ARCHITECTURE FREEZE | «Solo podrán modificarse mediante una ADR aprobada» (línea 51) | **Activación** — dice *cuándo* se necesita una ADR (para modificar lo congelado) |
| §4 — NO REOPEN | «Si una decisión aparece como APROBADA en: [..] ADR» (líneas 57-61) | **Vinculación** — las ADRs son decisiones cerradas |
| RULE PRECEDENCE | «3. ADR aprobadas» (línea 321) | **Jerarquía** — las ADRs están en el tercer nivel de precedencia |
| §9.6 — Clasificación V2 | «Las mejoras clasificadas como V2 no requerirán ADR salvo que impliquen una decisión arquitectónica permanente» (líneas 230-231) | **Exención** — dice cuándo NO se necesita ADR |

### Lo que falta

No hay en ningún documento del proyecto una definición explícita de:

1. **¿Qué es una ADR?** — Definición y propósito.
2. **¿Cuándo se necesita obligatoriamente una ADR?** — Más allá del caso de §3 (modificar freeze).
3. **¿Qué estructura debe tener una ADR?** — Formato/plantilla.
4. **¿Qué ciclo de vida tiene?** — Draft → Review → Approved → Superseded.
5. **¿Quién la aprueba?** — En un equipo unipersonal, ¿quién firma?
6. **¿Cómo se numera/nombra?** — Convención de nomenclatura.
7. **¿Dónde se almacenan?** — Ya es `docs/adr/ADR-NNN-title.md`.

### ¿AGENTS.md puede asumirlo?

**Sí.** El lugar natural es una subsección dentro de **§10 — EPIC WORKFLOW**, ya que el workflow es el punto donde las decisiones arquitectónicas deben formalizarse como ADRs. Alternativamente, podría ser una sección independiente §13.

### Modificación propuesta (mínima)

**Objetivo:** Formalizar el proceso sin añadir más de 15-20 líneas.

#### Opción A (recomendada): Subsección en §10 — EPIC WORKFLOW

Añadir al final de §10, después de «No puede saltarse ningún paso» (línea 278):

```
### 10.1 — ADR (Architecture Decision Record)

Toda decisión arquitectónica que afecte a los elementos protegidos por
ARCHITECTURE FREEZE (§3) o que tenga impacto permanente en la estructura
del sistema **requiere una ADR**.

Formato obligatorio de una ADR:

- **Título:** ADR-NNN — Descripción breve
- **Estado:** Draft | Review | Approved | Superseded
- **Contexto:** Problema o decisión a resolver
- **Decisión:** Opción seleccionada
- **Consecuencias:** Impacto positivo y negativo
- **Alternativas consideradas:** Opciones descartadas con justificación

Las ADRs se numeran secuencialmente (ADR-001, ADR-002, ...) y se
almacenan en `docs/adr/`.

Una ADR pasa a estado **Approved** cuando el usuario la aprueba
explícitamente en sesión. Una ADR **Superseded** debe referenciar
la ADR que la reemplaza.
```

**Líneas adicionales:** ~15 líneas

#### Opción B: Sección independiente §13

Crear una sección §13 — ADR PROCESS tras §12 (AI EXECUTION POLICY).
Ventaja: centraliza toda la información de ADR en un solo lugar.
Inconveniente: separa el proceso de ADR del flujo de épica donde se ejecuta.

**Recomendación: Opción A** — Integrar ADR en el workflow donde ocurre.

---

## Gap 2 — Detección de deriva arquitectónica

### Situación actual en AGENTS.md

| Sección | Referencia | Naturaleza |
|---------|-----------|------------|
| §10 — EPIC WORKFLOW | «Auditoría específica» (línea 265) | **Preventiva** — cada épica tiene una auditoría que debería detectar deriva |
| DEFINITION OF DONE | «□ Auditoría específica de la épica completada» (línea 366) | **Obligación** — la auditoría es condición de done |

### Lo que falta

1. **¿Qué debe comprobar la auditoría específica?** — No hay criterios explícitos.
2. **¿Cómo se detecta la deriva arquitectónica?** — No hay un checklist de comprobación.
3. **¿Qué hacer si se detecta deriva?** — No hay proceso de remediación.

### ¿AGENTS.md puede asumirlo?

**Sí.** El lugar natural es dentro de **§10 — EPIC WORKFLOW**, concretamente en el paso de «Auditoría específica», añadiendo criterios mínimos de comprobación arquitectónica. También podría añadirse un punto en DEFINITION OF DONE.

### Modificación propuesta (mínima)

**Objetivo:** Añadir criterios de auditoría arquitectónica a la auditoría de cierre de épica.

#### Añadir checklist de deriva en §10 — EPIC WORKFLOW

Después del bloque de flujo (líneas 256-278), añadir:

```
### 10.2 — Criterios de auditoría arquitectónica

La auditoría específica de cada épica deberá verificar **al menos**:

□ El código respeta los Aggregate Roots definidos en CF-022.
□ No se han introducido nuevas dependencias entre Bounded Contexts
  no autorizadas.
□ No se ha modificado el modelo de datos sin ADR.
□ No se han introducido patrones prohibidos por MVP DISCIPLINE (§8).
□ La solución implementada es la de menor complejidad posible
  (según §9.4 y §11).
□ No hay duplicación de lógica que deba estar en el Core existente.

Si alguna verificación falla, la épica no puede pasar a «Informe de
cierre» hasta que se resuelva la desviación o se justifique mediante
ADR.
```

**Líneas adicionales:** ~15 líneas

---

## Gap 3 — Periodicidad de revisión arquitectónica

### Situación actual en AGENTS.md

| Sección | Referencia | Naturaleza |
|---------|-----------|------------|
| §10 — EPIC WORKFLOW | Auditoría por épica | **Por evento** — ocurre cuando hay épica |
| No hay revisión periódica | — | **Vacío** — no se revisa la arquitectura si no hay épica activa |

### ¿AGENTS.md puede asumirlo?

**Sí, pero¿es necesario?** La arquitectura V1 está congelada por CF-001A. No hay
decisiones arquitectónicas activas que requieran revisión periódica. Una revisión
periódica sin épica en curso sería trabajo sin valor productivo.

La pregunta clave es: **¿Qué revisarías periódicamente si la arquitectura está
congelada?** La respuesta es: nada hasta que se inicien cambios en V2.

### Modificación propuesta (mínima)

**No añadir periodicidad en AGENTS.md ahora.** En su lugar, añadir una nota en
§3 — ARCHITECTURE FREEZE que establezca cuándo se reactiva la necesidad de
revisión.

#### Extensión de §3 — ARCHITECTURE FREEZE

Añadir al final de §3 (después de línea 51):

```
> La revisión arquitectónica periódica no es necesaria mientras V1
> esté congelado. Al iniciar V2, deberá establecerse una cadencia
> de revisión como parte del plan de evolución arquitectónica.
```

**Líneas adicionales:** ~3 líneas

---

## Gap 4 — Escalado de disputas arquitectónicas

### Situación actual en AGENTS.md

| Sección | Referencia | Naturaleza |
|---------|-----------|------------|
| §4 — NO REOPEN | Prohíbe reabrir decisiones cerradas | **Preventivo** — evita disputas sobre decisiones ya tomadas |
| CF-004 | Proceso de bloqueos | **Reactivo** — resuelve bloqueos, incluyendo los arquitectónicos |

### Lo que falta

Si dos agentes o un agente y el usuario discrepan sobre una decisión
arquitectónica **nueva** (no cerrada), no hay un mecanismo explícito para
resolver la discrepancia.

Sin embargo, en un equipo unipersonal con supervisión directa del usuario:
- El usuario es la autoridad final.
- No hay «disputas» reales porque no hay múltiples decisores con el mismo nivel.
- CF-004 ya cubre el caso de bloqueo por incertidumbre arquitectónica.

### ¿AGENTS.md puede asumirlo?

**Sí, pero el valor práctico es mínimo.** El caso de disputa entre pares no
existe en un equipo unipersonal. El mecanismo natural de escalado es: el agente
presenta alternativas (CF-004) → el usuario decide. No se necesita un organismo
de arbitraje.

### Modificación propuesta (mínima)

**Añadir una línea en §4 — NO REOPEN** para cubrir el caso de desacuerdo sobre
decisiones NO cerradas.

#### Extensión de §4 — NO REOPEN (línea 69)

Después de «Debe continuarse el desarrollo.» (línea 69), añadir:

```
>
> Para decisiones arquitectónicas **nuevas** (no cerradas) en las que
> exista desacuerdo, el agente deberá presentar las alternativas
> según CF-004 y el usuario actuará como autoridad final.
```

**Líneas adicionales:** ~3 líneas

---

## 5. Consolidación del plan de cambios

### Mapa de cambios propuestos en AGENTS.md

| Gap | Sección afectada | Tipo de cambio | Líneas añadidas | Criticidad |
|-----|-----------------|----------------|-----------------|------------|
| 1 — ADR | §10 — EPIC WORKFLOW (nueva §10.1) | **Añadir** subsección de proceso ADR | ~15 | Media |
| 2 — Deriva arquitectónica | §10 — EPIC WORKFLOW (nueva §10.2) | **Añadir** checklist de auditoría | ~15 | Media |
| 3 — Periodicidad | §3 — ARCHITECTURE FREEZE | **Añadir** nota de postergación a V2 | ~3 | Baja |
| 4 — Escalado de disputas | §4 — NO REOPEN | **Añadir** línea de resolución | ~3 | Baja |

### Cambios excluidos de este plan

| Cambio considerado | Motivo de exclusión |
|-------------------|---------------------|
| Sección §13 independiente para ADR | Introduce el mismo problema de dispersión que CF-005 resolvería. El lugar natural es §10 (workflow). |
| Nueva sección de «Arquitectura» | Crearía otro bloque temático que fragmenta la gobernanza. |
| Modificar §6 — SESSION STATUS | No procede; el status cubre CF-001 y CF-003, no gobernanza arquitectónica. |
| Modificar RULE PRECEDENCE | No es necesario; las ADRs ya tienen su lugar en la jerarquía. |

### Orden de ejecución propuesto

| Paso | Sección | Dependencia |
|------|---------|-------------|
| 1 | §4 — NO REOPEN (escalado de disputas) | Ninguna |
| 2 | §3 — ARCHITECTURE FREEZE (periodicidad) | Ninguna |
| 3 | §10 — EPIC WORKFLOW (ADR process §10.1) | Después de pasos 1-2 |
| 4 | §10 — EPIC WORKFLOW (checklist deriva §10.2) | Junto con paso 3 |

---

## 6. Evaluación de impacto

### Impacto en la cohesión documental

**Sin CF-005:** Los 4 gaps se cierran con ~36 líneas adicionales en 3 secciones
de AGENTS.md, respetando la RULE PRECEDENCE y sin crear duplicidad.

**Con CF-005:** Se crearían ~70-100 líneas en un nuevo documento, de las cuales
~50-70 duplicarían contenido de AGENTS.md.

### Impacto en la legibilidad

Los cambios propuestos son localizados y semánticamente coherentes:
- §3 cubre límites (freeze + periodicidad futura).
- §4 cubre cierre de decisiones (no reopen + escalado de nuevas).
- §10 cubre ejecución (workflow + ADR + auditoría).

No se dispersa la información; al contrario, se refuerza la agrupación temática
existente.

### Impacto en el mantenimiento

La información de ADR y auditoría está donde se ejecuta (workflow), no en un
documento separado que un agente podría olvidar consultar. Esto reduce la
fricción de cumplimiento.

### Impacto en MVP

Ninguno de los cambios desbloquea funcionalidad del usuario final. Sin embargo,
a diferencia de CF-005, los cambios propuestos:
- No crean un nuevo documento que mantener.
- No duplican contenido existente.
- No requieren sincronización entre documentos.
- Son modificaciones mínimas sobre el governance document existente.

**Por tanto, no violan MVP DISCIPLINE (§8) porque no son una iniciativa
arquitectónica nueva — son formalización de procesos existentes dentro del
marco documental actual.**

---

## 7. Conclusión

El análisis demuestra que **AGENTS.md puede asumir los 4 gaps sin necesidad de
CF-005**. Las modificaciones propuestas son mínimas, localizadas y respetan la
estructura temática actual del documento.

No existe ningún gap que AGENTS.md no pueda cubrir. La pregunta original del
análisis («¿AGENTS.md puede asumir esas responsabilidades?») se responde
afirmativamente para los 4 casos.

---

*Fin del plan de cambios — Sin modificación de AGENTS.md.*