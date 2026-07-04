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
>
> - **Si no está ejecutado:** Solo pueden realizarse tareas de consulta y análisis.
> - Antes de modificar código deberá ejecutarse CF-001.
> - **Nunca indicar que la sesión es inválida.**

---

## 7. AUTOLOAD

> Si durante una sesión falta alguno de estos documentos:
>
> - `docs/CF-000-PROJECT-BRAIN.md` (CF-000)
> - `docs/CF-001-SESSION-PROTOCOL.md` (CF-001)
> - `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` (CF-001A)
>
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

## 9. EPIC WORKFLOW

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

---

## 10. NO OVERENGINEERING

> No proponer soluciones más complejas que las necesarias para cumplir:
>
> - Constitución
> - Roadmap
> - MVP
>
> Si una mejora pertenece claramente a V2 o V3, debe indicarse como **evolución futura** y no implementarse en V1.

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
