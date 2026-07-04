# EP-026 — IMPLEMENTATION READINESS REPORT

> **Aggregate:** Expediente
> **Versión documento:** 1.0
> **Fecha:** 2026-07-04
> **Estado:** ✅ APROBADO PARA IMPLEMENTACIÓN
> **Basado en:** CF-020, CF-021, CF-022, CF-026, CF-040, ADR-001

---

## 1. VERIFICACIÓN DE INFORMACIÓN SUFICIENTE

### 1.1 Documentación de origen

| Documento | Contenido | Suficiente |
|-----------|-----------|------------|
| CF-020-DATA-MODEL.md | Columnas, tipos, FKs, constraints, RLS, soft delete, optimistic locking del agregado Expediente | ✅ |
| CF-021-DOMAIN-MODEL.md | Definición del aggregate root, value objects, estados (10), eventos, invariantes, ciclo de vida | ✅ |
| CF-022-AGGREGATE-BOUNDARIES.md | Límites del agregado: entidades dentro/fuera, reglas de consistencia transaccional, referencias a Cliente e Inmueble | ✅ |
| CF-026-EXPEDIENTE-DESIGN.md | Especificación completa de implementación: SQL, tipos, repository, service, validaciones, flujos, RLS | ✅ |
| CF-040-BUSINESS-POLICIES.md | ~46 políticas de negocio: creación (8), estados/transiciones (11), temporizadores (4), Cliente (4), Inmueble (2), PITR (6), Segunda Opinión (6), contratos (3), V2 (2) | ✅ |

**Conclusión:** Toda la información necesaria existe y está documentada formalmente.

---

## 2. ANÁLISIS DE CONTRADICCIONES

### 2.1 Tabla: core.expediente vs public.expedientes

| Aspecto | CF-020 / CF-026 (V1) | Estado actual (MVP) | ¿Contradicción? |
|---------|---------------------|---------------------|-----------------|
| Schema | `core.expediente` | `public.expedientes` | ⚠️ **Gap**: La tabla MVP está en `public`, no en `core`. La migración V1 debe crear `core.expediente`. |
| Estados | `core.estado_expediente` (10 estados: solicitud, pte_documentacion, en_revision_pitr, auditado, requiere_revision_manual, revision_manual, aprobado, rechazado, entregado, devuelto, cancelado) | `estado_expediente` ENUM (9 estados: pendiente, pago_pendiente, pago_recibido, expediente_creado, en_revision, informe_enviado, cerrado, rechazado, cancelado) | ⚠️ **Gap**: Conjunto de estados completamente diferente. El ENUM MVP no cubre la máquina de estados V1. |
| Columnas | 20+ columnas (empresa_id, numero_visible, cliente_id, inmueble_id, servicio_id, tipo_servicio, estado, prioridad, progreso, fechas, origen, notas_internas + audit trail) | 10 columnas (id, numero_expediente, cliente_id, estado, servicio, titulo, notas, created_at, updated_at + inmueble_id, created_by, updated_by, deleted_at, deleted_by, version) | ⚠️ **Gap**: La tabla MVP carece de: empresa_id, numero_visible, servicio_id, tipo_servicio, prioridad, progreso, fecha_inicio, fecha_cierre, fecha_vencimiento, origen, notas_internas. |

### 2.2 servicio_id FK

CF-020 define `servicio_id UUID FK → servicio.id` como obligatorio. No existe tabla `core.servicio` — es un concepto V2. CF-026 no lo menciona en el alcance V1.

**Veredicto:** ❌ **No es contradicción.** CF-026 (documento de diseño de implementación) tiene prioridad sobre CF-020 para detalles de implementación V1. `servicio_id` se omite en V1 y se añadirá en V2 mediante ADR.

### 2.3 empresa_id FK

CF-020 define `empresa_id UUID FK → empresa.id` como obligatorio. No existe tabla `empresa` — multitenant es V3.

**Veredicto:** ❌ **No es contradicción.** La arquitectura congelada (CF-001A) pospone multitenant a V3. `empresa_id` se omite en V1.

### 2.4 Estados vs CF-040 timers

CF-040 define temporizadores (P-TMP-01 a P-TMP-04) que disparan transiciones automáticas (30 días inactividad → cancelado, etc.). CF-026 no implementa estos temporizadores.

**Veredicto:** ❌ **No es contradicción.** Los temporizadores requieren infraestructura de background jobs (V2). Se implementan como **comportamiento futuro** documentado en CF-040.

### 2.5 Conclusión de contradicciones

| Ítem | Tipo | Severidad | Acción |
|------|------|-----------|--------|
| Schema `core` vs `public` | Gap de migración | Media | Crear `core.expediente` como tabla nueva. Los datos MVP existentes en `public.expedientes` se migran o quedan como históricos. |
| Estados V1 vs MVP | Gap de evolución | Baja | El ENUM V1 sustituye al MVP. La migración crea `core.estado_expediente` con los 10 estados V1. |
| `servicio_id` | No aplica en V1 | Ninguna | Diferimiento a V2 documentado. |
| `empresa_id` | No aplica en V1 | Ninguna | Diferimiento a V3 documentado. |
| Timers CF-040 | No aplica en V1 | Ninguna | Diferimiento a V2 documentado. |

**No existen contradicciones bloqueantes entre los 5 documentos normativos.**

---

## 3. VERIFICACIÓN DE DEPENDENCIAS

### 3.1 Dependencias del Aggregate Expediente

| Dependencia | Tipo | Estado actual | ¿Suficiente? |
|-------------|------|---------------|--------------|
| `core.cliente` (FK `cliente_id`) | Agregado externo | ✅ Implementado: migración, tipos, repository, service, tests | ✅ |
| `core.inmueble` (FK `inmueble_id`) | Agregado externo | ✅ Implementado: migración, tipos, repository, service, tests | ✅ |
| `auth.users` (FK `created_by`, `updated_by`, `deleted_by`) | Sistema | ✅ Nativo de Supabase | ✅ |
| Patrón Repository | Arquitectura | ✅ ClienteRepository e InmuebleRepository como referencia | ✅ |
| Patrón Service | Arquitectura | ✅ InmuebleService como referencia | ✅ |
| Patrón de tests | Arquitectura | ✅ cliente.repository.test.ts e inmueble.repository.test.ts como referencia | ✅ |
| Mock de Supabase | Testing | ✅ `src/lib/__mocks__/supabase.ts` existente | ✅ |
| Soft Delete | Patrón | ✅ Implementado en Cliente e Inmueble | ✅ |
| Optimistic Locking | Patrón | ✅ Implementado en Cliente e Inmueble | ✅ |
| Esquema `core` | Base de datos | ✅ Creado por migración 20260703_00001 | ✅ |
| Función `core.trigger_set_updated_at()` | Base de datos | ✅ Creada por migraciones de Inmueble | ✅ |

**Conclusión:** Cliente e Inmueble proporcionan todas las dependencias necesarias. Los patrones están establecidos y probados.

---

## 4. COMPONENTES A IMPLEMENTAR

### 4.1 Lista completa

| # | Componente | Archivo | Depende de |
|---|------------|---------|------------|
| 1 | Migración SQL | `supabase/migrations/20260708_00001_create_core_expediente.sql` | Migraciones Cliente (20260703) e Inmueble (20260706) |
| 2 | RLS (incluida en migración) | (misma migración) | Esquema `core` |
| 3 | Tipos TypeScript | `src/types/core/expediente.ts` | Tipos Cliente e Inmueble |
| 4 | Repository | `src/lib/core/expediente.repository.ts` | Tipos, Patrón ClienteRepository |
| 5 | Service | `src/lib/core/expediente.service.ts` | Repository, Tipos, Patrón InmuebleService |
| 6 | Tests Repository | `src/lib/core/__tests__/expediente.repository.test.ts` | Repository, Mock Supabase, Patrón tests Cliente |
| 7 | Tests Service | `src/lib/core/__tests__/expediente.service.test.ts` | Service, Patrón tests Inmueble |
| 8 | Lint | `npx eslint src/lib/core/` | — |
| 9 | Build | `npm run build` | — |
| 10 | Auditoría específica | `docs/audits/AUDITORIA-EXPEDIENTE.md` | Todos los anteriores |
| 11 | Informe de cierre | `docs/audits/EP-026-CIERRE.md` | Auditoría |

---

## 5. PLAN DE EJECUCIÓN POR FASES

### FASE 1: Migración SQL y RLS

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear `core.expediente` con todos los campos, constraints, RLS, índices y triggers |
| **Archivos** | `supabase/migrations/20260708_00001_create_core_expediente.sql` |
| **Dependencias** | Migraciones 20260703 (schema core), 20260706 (inmueble) |
| **Riesgos** | Coordinación con migración existente 20260707 que modifica `public.expedientes`. La nueva migración debe ser autónoma. |
| **Criterios aceptación** | `core.expediente` existe con todas las columnas, RLS funcional, trigger updated_at, índices creados |
| **DoD** | Migración aplicable, idempotente, reversible |

### FASE 2: Tipos TypeScript

| Campo | Valor |
|-------|-------|
| **Objetivo** | Definir tipos completos para Expediente |
| **Archivos** | `src/types/core/expediente.ts` |
| **Dependencias** | Tipos de Cliente e Inmueble |
| **Riesgos** | Bajo — patrón establecido |
| **Criterios aceptación** | Tipos exportados, sin `any`, coherentes con la migración SQL |
| **DoD** | Compila correctamente |

### FASE 3: Repository

| Campo | Valor |
|-------|-------|
| **Objetivo** | Implementar acceso a datos completo |
| **Archivos** | `src/lib/core/expediente.repository.ts` |
| **Dependencias** | Fase 2, ClienteRepository como referencia |
| **Riesgos** | Medio — el optimistic locking con versión debe manejarse correctamente para transiciones de estado |
| **Criterios aceptación** | Métodos: crear, findById, findMany (con filtros), actualizar (con version check), softDelete, hardDelete, count. Soft delete y optimistic locking funcionales. |
| **DoD** | Todos los métodos implementados, sin TODO |

### FASE 4: Service

| Campo | Valor |
|-------|-------|
| **Objetivo** | Implementar lógica de negocio del agregado Expediente |
| **Archivos** | `src/lib/core/expediente.service.ts` |
| **Dependencias** | Fase 3, InmuebleService como referencia |
| **Riesgosos** | Alto — las reglas de negocio de CF-040 deben aplicarse correctamente: validación de estados, creación con cliente/inmueble, máquina de estados |
| **Criterios aceptación** | Métodos: crear, obtener, listar, actualizarEstado (con máquina de estados), actualizar, eliminar. Validaciones de CF-040 implementadas. |
| **DoD** | Sin console.log, sin TODO/FIXME |

### FASE 5: Tests Repository

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cobertura completa del repository |
| **Archivos** | `src/lib/core/__tests__/expediente.repository.test.ts` |
| **Dependencias** | Fase 3, Patrón de tests Cliente |
| **Riesgos** | Bajo — patrón establecido |
| **Criterios aceptación** | Tests: creación, búsqueda por ID, listado con filtros, actualización con version, soft delete, count. Casos edge: versión incorrecta, ID inexistente. |
| **DoD** | Tests pasando |

### FASE 6: Tests Service

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cobertura de lógica de negocio |
| **Archivos** | `src/lib/core/__tests__/expediente.service.test.ts` |
| **Dependencias** | Fase 4, Patrón de tests Inmueble |
| **Riesgos** | Medio — las transiciones de estado tienen múltiples caminos |
| **Criterios aceptación** | Tests: creación válida, creación con datos inválidos, transiciones de estado válidas, transiciones inválidas (deben rechazarse), soft delete. |
| **DoD** | Tests pasando |

### FASE 7: Lint y Build

| Campo | Valor |
|-------|-------|
| **Objetivo** | Verificar calidad y compilación |
| **Archivos** | N/A (comandos) |
| **Dependencias** | Fases 1-6 |
| **Riesgos** | Bajo |
| **Criterios aceptación** | `npm run lint` sin errores en archivos modificados. `npm run build` exitoso. |
| **DoD** | Build completado |

### FASE 8: Auditoría específica

| Campo | Valor |
|-------|-------|
| **Objetivo** | Verificar cumplimiento con todos los documentos normativos |
| **Archivos** | `docs/audits/AUDITORIA-EXPEDIENTE.md` |
| **Dependencias** | Fases 1-7 |
| **Riesgos** | Bajo |
| **Criterios aceptación** | La auditoría confirma: cumplimiento CF-020/021/022/026/040, cobertura de tests, sin TODO/FIXME, sin console.log, lint OK, build OK |
| **DoD** | Auditoría genera informe sin hallazgos críticos |

### FASE 9: Informe de cierre

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cierre formal de EP-026 |
| **Archivos** | `docs/audits/EP-026-CIERRE.md` |
| **Dependencias** | Fase 8 |
| **Riesgos** | Bajo |
| **Criterios aceptación** | Definition of Done completo, aprobación del usuario |
| **DoD** | Informe firmado |

---

## 6. MAPA DE RIESGOS

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Migración SQL conflictiva con 20260707 | Media | Alto | La migración 20260707 modifica `public.expedientes`. La Fase 1 crea `core.expediente` como tabla nueva independiente, sin tocar `public.expedientes`. |
| Máquina de estados incompleta | Baja | Alto | CF-026 §6.1 define las 10 transiciones. Se implementa como función pura con mapa de transiciones válidas. CF-040 timers se documentan como V2. |
| Optimistic locking en transiciones de estado | Media | Medio | El service debe leer versión actual antes de actualizar. Patrón probado en Cliente e Inmueble. |
| Dependencia circular service/repository | Baja | Medio | Patrón establecido: Service depende de Repository, no al revés. |
| Tipos incompatibles entre TypeScript y SQL | Baja | Medio | Los tipos se generan manualmente alineados con la migración. Sin generador automático. |

---

## 7. CRITERIOS DE DEFINITION OF DONE (DoD)

- [ ] Implementación completada (Fases 1-6)
- [ ] Tipos TypeScript actualizados (Fase 2)
- [ ] Tests implementados y pasando (Fases 5-6)
- [ ] Build completado correctamente (Fase 7)
- [ ] Lint sin errores en archivos modificados (Fase 7)
- [ ] Sin TODO ni FIXME en archivos de la épica
- [ ] Sin console.log, console.warn o console.error en producción
- [ ] Auditoría específica completada (Fase 8)
- [ ] Informe de cierre generado (Fase 9)
- [ ] Aprobación explícita del usuario

---

## 8. CONFIRMACIONES OBLIGATORIAS

| Confirmación | Estado |
|-------------|--------|
| ❌ No es necesario modificar la arquitectura | ✅ **Confirmado.** La arquitectura V1 está congelada (CF-001A). El agregado Expediente se implementa dentro de los límites establecidos. |
| ❌ No es necesario modificar el dominio | ✅ **Confirmado.** El dominio Expediente está definido en CF-021 y detallado en CF-026. No se introducen nuevos conceptos de dominio. |
| ❌ No es necesario crear nuevas ADR | ✅ **Confirmado.** ADR-001 ya registra el sistema de ingeniería. No se requieren decisiones arquitectónicas nuevas. |
| ❌ No es necesario crear documentación adicional | ✅ **Confirmado.** CF-026 ya proporciona la especificación de implementación completa. |
| ❌ La implementación puede comenzar inmediatamente | ✅ **Confirmado.** No existen bloqueos. Todas las dependencias están satisfechas. Los patrones están establecidos y probados. |

---

## 9. VISTO BUENO

```
┌─────────────────────────────────────────────┐
│                                             │
│  EP-026 IMPLEMENTATION READINESS REPORT     │
│                                             │
│  Estado: ✅ APROBADO PARA IMPLEMENTACIÓN    │
│                                             │
│  Fecha: 2026-07-04                         │
│                                             │
│  La implementación del Aggregate             │
│  Expediente puede comenzar                  │
│  de forma completamente mecánica.           │
│                                             │
│  Sin necesidad de:                          │
│  • Modificar arquitectura                   │
│  • Modificar dominio                        │
│  • Crear nuevas ADR                         │
│  • Crear documentación adicional            │
│                                             │
└─────────────────────────────────────────────┘