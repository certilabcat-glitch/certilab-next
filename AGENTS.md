# AGENTS.md — Certilab Governance Document

> Documento de gobernanza permanente del proyecto Certilab.
> Todas las sesiones deben ceñirse a estas reglas sin excepción.

---

## 1. SESSION START RULE

> **Ninguna IA ni desarrollador puede comenzar desarrollo sin ejecutar previamente el protocolo definido en CF-001.**
>
> El protocolo CF-001-SESSION-PROTOCOL.md (`docs/CF-001-SESSION-PROTOCOL.md`) es obligatorio. Debe ejecutarse completo al inicio de cada sesión.
>
> **No se permite:**
> - Escribir código sin haber ejecutado CF-001.
> - Realizar commits sin haber verificado el build.
> - Modificar archivos sin haber leído CF-000 y AGENTS.md.

---

<!-- BEGIN:nextjs-agent-rules -->
## 2. NEXT.JS RULES

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## 3. ARCHITECTURE FREEZE

> La arquitectura del núcleo de Certilab V1 está oficialmente congelada mediante:
>
> `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md`
>
> Durante V1 está **prohibido** proponer cambios en:
>
> - Constitución
> - DDD
> - Clean Architecture
> - Vertical Slice
> - Aggregate Roots
> - Bounded Contexts
> - Modelo de datos
> - Single Tenant
> - Soft Delete
> - Optimistic Locking
> - RLS basada en auth.uid()
>
> Solo podrán modificarse mediante una ADR aprobada.
>
> Durante el MVP no se requieren revisiones arquitectónicas periódicas.
> La revisión arquitectónica será obligatoria al cierre de cada épica
> relevante o cuando un cambio propuesto tenga impacto sobre el dominio,
> la arquitectura o las políticas del proyecto.

---

## 4. NO REOPEN CLOSED DECISIONS

> Si una decisión aparece como **APROBADA** en:
>
> - Constitución
> - CF-001A
> - ADR
>
> **No debe volver a debatirse.**
>
> **No deben proponerse alternativas.**
>
> **No deben iniciarse discusiones arquitectónicas nuevas.**
>
> Debe continuarse el desarrollo.
>
> Para decisiones arquitectónicas **nuevas** (no cerradas) en las que
> exista desacuerdo, el agente deberá presentar las alternativas
> según CF-004 y el usuario actuará como autoridad final.

---

## 5. EVIDENCE FIRST

> Toda recomendación arquitectónica deberá incluir obligatoriamente:
>
> - **evidencia** — dato o fuente concreta que la respalde
> - **archivo** — ruta del archivo afectado
> - **línea** — número de línea exacto
> - **impacto** — efecto real del cambio propuesto
> - **prioridad** — alta, media o baja
>
> **No se aceptan opiniones sin evidencia.**

---

## 6. SESSION STATUS

> □ **CF-001 ejecutado**
> □ **CF-003 autoevaluación realizada**
>
> - **Si CF-001 no está ejecutado:** Solo pueden realizarse tareas de consulta y análisis.
> - **Si CF-003 no se ha evaluado:** Deberá realizarse la autoevaluación de capacidad del modelo antes de modificar código.
> - Antes de modificar código deberá ejecutarse CF-001 y la autoevaluación CF-003.
> - **Nunca indicar que la sesión es inválida.**

---

## 7. AUTOLOAD

> Si durante una sesión falta alguno de estos documentos:
>
> - `docs/CF-000-PROJECT-BRAIN.md` (CF-000)
> - `docs/CF-001-SESSION-PROTOCOL.md` (CF-001)
> - `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` (CF-001A)
> El agente deberá leerlos automáticamente antes de modificar código.
>
> **No deberá esperar confirmación del usuario.**

---

## 8. MVP DISCIPLINE

> Durante V1 está **prohibido** introducir iniciativas arquitectónicas nuevas como:
>
> - CQRS
> - Event Sourcing
> - Microservicios
> - Multi Tenant
> - Event Bus
> - Reestructuración completa
> - Refactorizaciones masivas
>
> **Salvo que exista una ADR aprobada.**

---

## 9. PRODUCT-FIRST EXECUTION MODE

> A partir de la finalización del Core V1, el proyecto Certilab entra en una fase
> de integración y entrega de valor funcional para el MVP. Esta sección establece
> las reglas de priorización, validación y ejecución de todas las nuevas épicas.

### 9.1 Cambio de fase

- La **Arquitectura V1** está oficialmente congelada mediante CF-001A.
- El **Core V1** (Cliente, Inmueble, Expediente y Documento IA) constituye la base
  estable del proyecto. Está implementado, testeado y verificado.
- A partir de este momento la prioridad deja de ser diseñar nuevos componentes
  y pasa a ser **integrar los ya existentes** para entregar capacidades funcionales
  visibles del MVP.

### 9.2 Flujo de referencia del dominio

Este es el flujo de referencia del **MVP V1**. Una épica no tiene por qué recorrer
todos los pasos, pero sí debe integrarse en al menos uno de ellos o justificar
expresamente su posición fuera del flujo.

```
Cliente
    ↓
Inmueble
    ↓
Expediente
    ↓
Documento IA
    ↓
Motor PITR
    ↓
Resultado
```

Si una propuesta no aporta valor a este flujo o a la integración entre sus
elementos, deberá justificarse expresamente.

### 9.3 Regla de reutilización del Core

Antes de proponer un nuevo Aggregate Root, Bounded Context, servicio de dominio,
componente estructural o módulo, el agente deberá comprobar si la funcionalidad
puede resolverse reutilizando el Core existente (Cliente, Inmueble, Expediente,
Documento IA).

Siempre deberá priorizarse:

1. **Reutilización** — usar un componente existente sin modificaciones.
2. **Composición** — combinar componentes existentes para resolver la necesidad.
3. **Extensión controlada** — añadir una capacidad mínima a un componente existente.

Antes que crear nuevos componentes.

### 9.4 Regla de mínima expansión

No podrá crearse un nuevo Aggregate Root, Bounded Context, servicio de dominio o
componente estructural sin demostrar previamente que la funcionalidad no puede
resolverse mediante la composición o extensión de los componentes existentes
(según la jerarquía del punto 9.3).

La creación de nuevos elementos estructurales será siempre la **última
alternativa**, nunca la primera.

### 9.5 Preguntas obligatorias

Toda propuesta de nueva épica deberá responder obligatoriamente a estas preguntas
antes de iniciar la implementación:

1. **¿Qué capacidad funcional añade al MVP?**
   Debe identificarse la funcionalidad concreta que el usuario final podrá
   utilizar y que no existía antes.

2. **¿Qué agregados participan?**
   Deben enumerarse los agregados del Core V1 (Cliente, Inmueble, Expediente,
   Documento IA) y/o nuevos que intervienen, especificando el rol de cada uno.

3. **¿Cómo interactúan entre sí?**
   Debe describirse el flujo de datos y la secuencia de interacciones entre los
   agregados participantes, incluyendo las reglas de negocio que gobiernan dicha
   interacción.

4. **¿Por qué esta es la solución de menor complejidad que satisface completamente
   el requisito funcional respetando la arquitectura aprobada?**
   Debe justificarse por qué no se ha optado por una solución más simple
   (reutilización directa, composición o extensión controlada).

Si alguna respuesta no puede justificarse, la propuesta deberá detenerse antes de
comenzar la implementación.

### 9.6 Clasificación automática V2

Las mejoras que únicamente aporten:

- calidad arquitectónica,
- refactorización,
- reutilización,
- optimización,

pero que **no desbloqueen el MVP** ni **corrijan un defecto crítico**, deberán
clasificarse automáticamente como V2.

- No deberán implementarse durante el MVP.
- Las mejoras clasificadas como V2 no requerirán ADR salvo que impliquen una
  decisión arquitectónica permanente.
- Bastará con registrarlas brevemente en el informe de cierre de la épica.

### 9.7 Principio rector

Durante el resto del desarrollo del MVP V1, el éxito de una épica se medirá por
**la capacidad funcional entregada al usuario** y **no** por la cantidad de
componentes, patrones, abstracciones o complejidad añadida al sistema.

### 9.8 Relación con otras reglas

- **MVP DISCIPLINE (sección 8):** Complementa la prohibición de iniciativas
  arquitectónicas nuevas estableciendo un marco de decisión positivo.
- **EPIC WORKFLOW (sección 10):** Las épicas que superen el filtro de PRODUCT-FIRST
  EXECUTION MODE entran en el flujo de ejecución definido en EPIC WORKFLOW.
- **NO OVERENGINEERING (sección 11):** La regla de mínima expansión y el principio
  rector refuerzan el mismo mandato de simplicidad desde la perspectiva del diseño
  y la priorización.

---

## 10. EPIC WORKFLOW

> El flujo obligatorio para todas las épicas de V1 es:
>
> ```
> Diseño
> ↓
> Implementación
> ↓
> Tests
> ↓
> Build
> ↓
> Auditoría específica
> ↓
> Informe de cierre
> ↓
> Aprobación del usuario
> ↓
> Commit
> ↓
> Tag
> ↓
> Siguiente épica
> ```
>
> No puede saltarse ningún paso.

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

---

## 11. NO OVERENGINEERING

> No proponer soluciones más complejas que las necesarias para cumplir:
>
> - Constitución
> - Roadmap
> - MVP
>
> Si una mejora pertenece claramente a V2 o V3, debe indicarse como **evolución futura** y no implementarse en V1.

---

## 12. AI EXECUTION POLICY

> **CF-003 — AI Execution Policy v1.0**
>
> `docs/CF-003-AI-EXECUTION-POLICY.md`
>
> Antes de comenzar cualquier tarea, el agente deberá realizar una autoevaluación
> de la capacidad del modelo según lo establecido en CF-003. Esta evaluación es
> independiente de las WORKING-RULES y no modifica la metodología del proyecto.
>
> **Regla fundamental:**
>
> - No improvisar.
> - No generar respuestas de baja calidad.
> - No completar tareas para las que el modelo no tiene capacidad suficiente.
> - La honestidad técnica tiene prioridad sobre completar la tarea.
> - Cuando sea posible, reducir el contexto o dividir el trabajo antes de
>   recomendar un modelo superior.

---

## RULE PRECEDENCE

En caso de conflicto entre documentos, el orden de prioridad será:

1. Constitución
2. CF-001A — Acta de Cierre de Arquitectura V1
3. ADR aprobadas
4. AGENTS.md
5. Documentos CF-XXX
6. Prompts de la sesión

Ningún prompt puede anular una decisión aprobada en la Constitución, CF-001A o una ADR.

---

## CHANGELOG

Toda modificación futura de AGENTS.md deberá registrar:

- Fecha
- Autor
- Motivo del cambio
- Documento que lo justifica (Constitución, CF-001A o ADR)

El objetivo es mantener la trazabilidad de las reglas de gobernanza.

| Fecha | Autor | Motivo del cambio | Documento |
|-------|-------|-------------------|-----------|
| 2026-07-04 | CF-001 | Adición de sección 9 — PRODUCT-FIRST EXECUTION MODE. Cambio de fase tras finalización del Core V1. Reordenación de secciones 10 y 11. | CF-001A, AGENTS.md |
| 2026-07-08 | CF-003 | Adición de sección 12 — AI EXECUTION POLICY. Nueva política de autoevaluación de capacidad del modelo. Actualización de SESSION STATUS (sección 6). Eliminación de CF-003 del AUTOLOAD (sección 7) por ser política de ejecución, no fuente de verdad del producto. | CF-003 |
| 2026-07-09 | AGENTE | Formalización de ADR (§10.1), auditoría arquitectónica (§10.2), periodicidad (§3) y escalado de disputas (§4). | AGENTS.md |

---

## DEFINITION OF DONE

Una épica únicamente podrá considerarse finalizada cuando se cumplan TODOS los siguientes puntos:

□ Implementación completada.

□ Tipos TypeScript actualizados.

□ Tests implementados y pasando.

□ Build completado correctamente.

□ Lint sin errores en los archivos modificados.

□ Sin TODO ni FIXME en los archivos de la épica.

□ Sin console.log, console.warn o console.error en producción.

□ Auditoría específica de la épica completada.

□ Informe de cierre generado.

□ Aprobación explícita del usuario.

Solo después de cumplir todos estos puntos podrá proponerse el commit.