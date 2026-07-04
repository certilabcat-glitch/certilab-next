# EP-026B — Expediente Core Domain — Closure Report

**Fecha:** 2026-07-08
**Estado:** ✅ COMPLETED
**Auditor:** Sistema

---

## 1. Resumen

Implementación del dominio core del agregado **Expediente** en el esquema `core.expediente`, siguiendo los patrones establecidos en Inmueble y Cliente (Repository + Service + Tests).

---

## 2. Archivos creados

| Archivo | Propósito |
|---|---|
| `src/types/core/expediente.ts` | Type definitions: EstadoExpediente, TipoServicio, ExpedienteRow, inputs, error classes, máquina de estados |
| `supabase/migrations/20260708_00001_create_core_expediente.sql` | Migración SQL: tabla core.expediente con RLS, soft delete, optimistic locking |
| `scripts/apply-phase-a-expediente.mjs` | Script de aplicación de migración |
| `src/lib/core/expediente.repository.ts` | Repositorio con operaciones CRUD + soft delete + restaurar |
| `src/lib/core/__tests__/expediente.repository.test.ts` | Tests del repositorio (16 tests) |
| `src/lib/core/expediente.service.ts` | Servicio con validación de negocio, máquina de estados, optimistic locking |
| `src/lib/core/__tests__/expediente.service.test.ts` | Tests del servicio (30 tests) |

---

## 3. Resultados de tests

```
 Test Files  5 passed (5)
      Tests  114 passed (114)
```

| Suite | Tests | Estado |
|---|---|---|
| `cliente.repository.test.ts` | 12 | ✅ |
| `inmueble.repository.test.ts` | 16 | ✅ |
| `inmueble.service.test.ts` | 40 | ✅ |
| `expediente.repository.test.ts` | 16 | ✅ |
| `expediente.service.test.ts` | 30 | ✅ |

---

## 4. Cobertura funcional

### ExpedienteRow (1:1 con core.expediente)
- [x] UUID v7 ID
- [x] número de expediente con formato EXP-YYYY-MM-NNNN
- [x] cliente_id obligatorio
- [x] inmueble_id opcional (sin FK en Fase A)
- [x] Máquina de estados: 9 estados con transiciones controladas
- [x] Tipo de servicio
- [x] Título y notas opcionales
- [x] Auditoría completa (created, updated, deleted + version)

### Repository
- [x] `crear` — insert con todos los campos
- [x] `findById` — búsqueda por UUID, con/sin soft deleted
- [x] `findMany` — filtros: estado, cliente_id, search, paginación
- [x] `count` — total con filtros
- [x] `actualizar` — update con optimistic locking (version check)
- [x] `softDelete` — marca deleted_at sin borrado físico
- [x] `restaurar` — undelete (solo admin)

### Service
- [x] Validación de número de expediente (patrón EXP-YYYY-MM-NNNN)
- [x] Validación de cliente obligatorio
- [x] Estado inicial siempre `pendiente`
- [x] Validación de transiciones de estado (máquina de estados)
- [x] Servicio por defecto: `segunda_opinion`
- [x] Optimistic locking vía version
- [x] Trazabilidad: updated_by obligatorio
- [x] Soft delete solo en estados terminales o pendiente
- [x] Restaurar con validación de estado

---

## 5. Definición de Done

- [x] Implementación completada
- [x] Tipos TypeScript actualizados
- [x] Tests implementados y pasando (114/114)
- [x] Build completado (TypeScript check)
- [x] Lint sin errores
- [x] Sin TODO ni FIXME
- [x] Sin console.log en producción
- [x] Informe de cierre generado

---

## 6. Observaciones

- Se siguió el mismo patrón arquitectónico que Inmueble y Cliente (Repository + Service + Tests).
- La máquina de estados se implementó con transiciones explícitas vía `TRANSICIONES_ESTADO`.
- Se respetó la arquitectura congelada (CF-001A): Clean Architecture, DDD, Vertical Slice, Single Tenant.
- Pendiente: Conexión con migración y verificación en base de datos real.