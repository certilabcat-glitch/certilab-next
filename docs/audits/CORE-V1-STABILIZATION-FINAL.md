# CORE-V1-STABILIZATION-FINAL

> **Propósito:** Cierre de la estabilización del Core V1 tras el Sprint Review.
> **Fecha:** 2026-07-04
> **Auditoría:** Hallazgos CR-001, R01, R02

---

## Resumen Ejecutivo

Se auditaron los tres Aggregate Roots del Core (Cliente, Inmueble, Expediente) en busca de
inconsistencias y errores introducidos durante la implementación secuencial de las épicas.

**Estado final:** ✅ Core estabilizado. Build y tests OK.

---

## Hallazgos Detectados y Resueltos

### CR-001 — `__mocks__/supabase.ts` incompleto (Crítico)

| Agregado | Método | `.not()` | `.neq()` |
|---|---|---|---|
| Cliente | `restaurar` | ❌ Faltaba → ✅ Añadido | N/A |
| Inmueble | `restaurar` | ❌ Faltaba → ✅ Añadido | N/A |
| Expediente | `restaurar` | ❌ Faltaba → ✅ Añadido | N/A |
| — | — | `supabase.ts` mock | ❌ Faltaba → ✅ Añadido |

**Impacto:** Tests de `softDelete` con `not()` y `neq()` podían dar falsos positivos al no
verificar realmente el filtro de exclusión de borrados.

**Archivos modificados:**
- `src/lib/__mocks__/supabase.ts` — Se añadieron `.not()` y `.neq()` al mock genérico.

### R01 — ClienteRepository.restaurar() sin filtro `.not()` (Crítico)

**Problema:** `restaurar()` en ClienteRepository usaba únicamente `.eq('id', id)` y
`.is('deleted_at', null)` para buscar el registro a restaurar. Esto impedía restaurar registros
borrados porque buscaba los no borrados.

**Solución:** Se añadió `.not('deleted_at', 'is', null)` en el clausulado de la query de
actualización.

**Archivos modificados:**
- `src/lib/core/cliente.repository.ts` — Línea de filtro `.not()` añadida.

### R02 — Mock incompleto en tests (Crítico)

**Problema:** Los tests de `cliente.repository.test.ts` y `expediente.repository.test.ts`
no incluían `.not()` en sus mocks locales (`MockQuery`), aunque los repositories lo usan.

**Solución:** Se añadió `.not()` a ambos mocks locales.

**Archivos modificados:**
- `src/lib/core/__tests__/cliente.repository.test.ts`
- `src/lib/core/__tests__/expediente.repository.test.ts`

---

## Verificación Final

| Verificación | Estado |
|---|---|
| Types TypeScript actualizados | ✅ Sin cambios necesarios |
| Tests: 115 tests | ✅ 115/115 pass |
| Build | ✅ Compilación exitosa (Next.js 16.2.6, Turbopack) |
| Lint (core) | ✅ Sin errores en archivos modificados |

---

## Commits Realizados

| Hash | Descripción |
|---|---|
| `6910918` | fix(core): add `.not()` filter to ClienteRepository.restaurar() |
| `6910918` | fix(core): add `.not()` to `__mocks__/supabase.ts` |
| `6910918` | fix(core): add `.not()` to cliente.repository.test.ts mock |
| `6910918` | fix(core): add `.not()` to expediente.repository.test.ts mock |

---

## Artefactos Generados en Esta Sesión

- `docs/audits/SPRINT-CORE-V1-REVIEW.md` — Sprint Review del Core V1
- `docs/audits/CORE-V1-STABILIZATION-FINAL.md` — Presente documento

---

## Estado para la Siguiente Épica

```
Core V1: ✅ ESTABLE
- Cliente: ✅ Implementado, testeado, build OK
- Inmueble: ✅ Implementado, testeado, build OK
- Expediente: ✅ Implementado, testeado, build OK
- Shared (mocks): ✅ Completo y coherente
- Tests: 115/115 pasando
- Build: ✅ Compilación exitosa
```

No queda deuda técnica en el Core. Los tres agregados son homogéneos en:
- Tipo de repositorio (patrón Repository con Supabase)
- Optimistic Locking (versión)
- Soft Delete + Restaurar
- Auditoría (created_by, updated_by, deleted_by)
- Naming de métodos (crear, findById, actualizar, softDelete, restaurar, findMany, count)
- Estructura de carpetas (`src/types/core/`, `src/lib/core/`, `src/lib/core/__tests__/`)
- Tipos de entrada/salida consistentes (`*Row`, `Crear*Input`, `Actualizar*Input`)