# SPRINT CORE V1 — REVISIÓN GLOBAL

**Fecha:** 2026-07-04
**Auditoría:** Revisión unificada de los tres Aggregate Roots del núcleo de Certilab
**Alcance:** Cliente, Inmueble, Expediente — tipos, repositorios, servicios, tests, mocks

---

## Resumen Ejecutivo

Se auditaron los tres Aggregate Roots del Core como un sistema único. Se detectaron **1 hallazgo crítico**, **5 recomendaciones pre-MVP**, **4 diferibles a V2** y **2 falsos positivos**.

El patrón arquitectónico es **mayoritariamente homogéneo** y sigue las reglas definidas en CF-021 (Supabase Architecture) y CF-022 (Aggregate Boundaries). Sin embargo, existen incoherencias concretas entre los agregados, siendo Expediente el que más se desvía del estándar establecido por Cliente e Inmueble.

---

## 1. HALLAZGOS CRÍTICOS

### CR-001 — ExpedienteRepository.restaurar() usa `.not().is()` rompiendo el mock y la consistencia

**Archivo:** `src/lib/core/expediente.repository.ts` (línea 253)
**Gravedad:** CRÍTICO

**Problema:**
- `ExpedienteRepository.restaurar()` encadena `.not('deleted_at', 'is', null)` para filtrar solo registros eliminados.
- `ClienteRepository.restaurar()` **no** usa este filtro — restaura cualquier registro por ID.
- El mock de Supabase (`src/lib/__mocks__/supabase.ts`) no implementa el método `.not()`, provocando **2 tests fallando**:

```
FAIL  src/lib/core/__tests__/expediente.repository.test.ts
  => ExpedienteRepository > restaurar > should restore a soft-deleted expediente
  TypeError: supabase.from(...).update(...).eq(...).not is not a function
```

**Impacto:**
- 2 tests de `restaurar` en Expediente fallan en CI (113/115 pasan).
- El mock necesita mantenerse sincronizado con la implementación real de Supabase.
- Inconsistencia semántica: Cliente.restaurar restaura cualquier registro (incluso no eliminado), mientras que Expediente.restaurar filtra por deleted_at.

**Acción requerida antes del MVP:**
- Decidir si `restaurar()` debe ser permisivo (como Cliente) o restrictivo (como intenta Expediente).
- Si se opta por restrictivo: añadir `.not()` al mock y alinearlo en Cliente.
- Si se opta por permisivo: eliminar `.not()` de Expediente.

---

## 2. RECOMENDACIONES ANTES DEL MVP

### R01 — ClienteRepository.restaurar() no verifica que el registro esté eliminado

**Archivo:** `src/lib/core/cliente.repository.ts` (líneas 242-266)
**Gravedad:** RECOMENDADO ANTES DEL MVP

**Problema:**
El método `restaurar()` de Cliente hace un `update().eq('id', id).select().single()` sin filtrar por `deleted_at IS NOT NULL`. Esto significa que se puede "restaurar" un cliente que nunca fue eliminado, lo cual es semánticamente incorrecto.

```typescript
// cliente.repository.ts (actual)
await supabase
  .from(TABLE)
  .update({ deleted_at: null, deleted_by: null, updated_by: updatedBy })
  .eq('id', id)
  .select(SOFT_DELETE_COLS)
  .single();
```

Al no tener filtro `.not('deleted_at', 'is', null)`, el update se ejecuta pero no afecta filas (deleted_at ya es null), y `PGRST116` solo se dispara si no existe el registro. Podría restaurar un registro no eliminado sin error.

**Recomendación:** Añadir `.is('deleted_at', 'ne', null)` o `.not('deleted_at', 'is', null)` a la query de Cliente, igualando el comportamiento que intenta Expediente.

---

### R02 — Mock de Supabase incompleto: falta `.not()`, `.neq()`, `.textSearch()`

**Archivo:** `src/lib/__mocks__/supabase.ts` (líneas 6-33)
**Gravedad:** RECOMENDADO ANTES DEL MVP

**Problema:**
El mock solo implementa los métodos básicos de chaining: `eq`, `is`, `or`, `order`, `range`, `single`, `select`, `insert`, `update`, `from`. No implementa:

- `.not(column, operator, value)` — usado por Expediente.restaurar
- `.neq(column, value)` — no usado actualmente pero común en PostgREST
- `.textSearch(column, query)` — usado potencialmente en búsquedas full-text
- `.in(column, values)` — usado en filtros IN de SQL
- `.gte()`/`.lte()` — rangos numéricos
- `.lt()`/`.gt()` — comparadores

**Recomendación:** Ampliar el mock para cubrir todos los métodos de filtrado de PostgREST que puedan usarse, o usar una aproximación de mock dinámico que registre cualquier método.

**Impacto:** Cualquier nuevo agregado que use estos métodos romperá los tests del mock.

---

### R03 — Los Services no tienen un error type unificado para validación de negocio

**Archivos:** `src/lib/core/inmueble.service.ts`, `src/lib/core/expediente.service.ts`
**Gravedad:** RECOMENDADO ANTES DEL MVP

**Problema:**
Los services lanzan errores con `throw new Error(...)` para validaciones de negocio. No existe una clase `DomainError` o `BusinessError` que diferencie:

- Errores de validación (400)
- Errores de dominio (422)
- Errores de no encontrado (404)
- Errores de conflicto (409)

Cada service usa su propio mensaje de error en texto plano:

- `inmueble.service.ts`: `"Error de validación: ..."`
- `expediente.service.ts`: `"Error de validación: ..."`
- Cliente no tiene service

**Recomendación:** Crear una taxonomía de errores de dominio compartida (`@/lib/core/errors.ts`) con clases como:
- `ValidationError`
- `NotFoundError`
- `ConflictError` (para version/locking)
- `BusinessRuleViolation`

---

### R04 — Las transiciones de estado de Expediente están en el Service pero no validadas con un state machine explícito

**Archivo:** `src/lib/core/expediente.service.ts`
**Gravedad:** RECOMENDADO ANTES DEL MVP

**Problema:**
La validación de transiciones de estado usa un helper `isValidEstadoTransition()` que es una función privada dentro del service. No hay un objeto state machine reutilizable ni testeable de forma aislada.

```typescript
// expediente.service.ts
const ESTADO_TRANSITIONS: Record<string, string[]> = {
  pendiente: ['en_curso', 'cancelado'],
  en_curso: ['completado', 'cancelado'],
  completado: [],
  cancelado: [],
};
```

Esto está correctamente implementado pero:
- Está acoplado al service, no es reusable
- No tiene tests unitarios directos (se testea indirectamente vía `actualizar`)
- No hay un diagrama formal en los docs sobre las transiciones permitidas

**Recomendación:** Extraer a un `StateMachine` o `ExpedienteEstadoMachine` en `@/lib/core/domain/expediente-estado.ts` y testearlo independientemente.

---

### R05 — Cliente no tiene Service

**Archivo faltante:** `src/lib/core/cliente.service.ts`
**Gravedad:** RECOMENDADO ANTES DEL MVP

**Problema:**
Inmueble y Expediente tienen su correspondiente `*.service.ts` con validaciones de negocio, reglas de dominio y wrapping de errores. Cliente no tiene service. El `ClienteRepository` se usa directamente desde capas superiores.

**Riesgo:**
- Las reglas de negocio de Cliente (validación de DNI, email, RGPD, consentimiento) no tienen un lugar definido.
- No hay validación de negocio antes de persistir un Cliente.
- Inconsistencia arquitectónica: 2/3 agregados tienen service.

**Recomendación:** Crear `ClienteService` siguiendo el patrón de `InmuebleService` y `ExpedienteService`.

---

## 3. HALLAZGOS DIFERIBLES A V2

### D01 — Falta un BaseRepository abstracto o mixin

**Archivos:** `src/lib/core/cliente.repository.ts`, `src/lib/core/inmueble.repository.ts`, `src/lib/core/expediente.repository.ts`
**Gravedad:** DIFERIBLE A V2

**Problema:**
Los tres repositorios tienen **código duplicado estructural**:

- `crear()`: 25-30 líneas, misma estructura (insert, select, single, error handling)
- `findById()`: 15-20 líneas, misma estructura (select, eq, single, null handling)
- `actualizar()`: 30-40 líneas, misma estructura (update, eq, eq(version), is(deleted_at), select, single)
- `softDelete()`: 20-25 líneas, misma estructura (update, eq, is(deleted_at), select, single)
- `restaurar()`: 15-20 líneas, misma estructura (update, eq, select, single)
- `findMany()`: 30-40 líneas, misma estructura (select, filters, order, range)
- `count()`: 10-15 líneas, misma estructura (select head, filter, count)

El único código que varía es:
- Nombre de tabla
- Columnas en SOFT_DELETE_COLS
- Filtros específicos de dominio en `findMany()`
- Campos específicos en `actualizar()`

**Recomendación V2:** Extraer un `BaseRepository<TTable, TFilter>` o un `CoreRepository` genérico que encapsule CRUD base, con hooks para filtros personalizados.

---

### D02 — Falta validación de esquema compartida (Zod / Valibot)

**Archivos:** `src/lib/core/inmueble.service.ts`, `src/lib/core/expediente.service.ts`
**Gravedad:** DIFERIBLE A V2

**Problema:**
Las validaciones de entrada en los services se hacen manualmente con condicionales `if/throw`:

```typescript
// inmueble.service.ts
if (!input.direccion?.trim()) {
  throw new Error('Error de validación: La dirección es obligatoria');
}
if (!/^\d{5}$/.test(input.codigo_postal)) {
  throw new Error('Error de validación: El código postal debe tener 5 dígitos');
}
```

Esto es frágil, verboso y no genera mensajes de error estructurados. Una librería de esquemas permitiría:
- Schemas compartidos entre type y validación
- Mensajes de error internacionalizables
- Tipos inferidos automáticamente desde el schema

**Recomendación V2:** Adoptar Zod o Valibot para definir schemas de validación en todos los agregados.

---

### D03 — No hay integración entre agregados a nivel de repositorio

**Archivo:** Todos los repositorios
**Gravedad:** DIFERIBLE A V2

**Problema:**
Cada repositorio opera de forma completamente independiente. En el modelo de dominio, un `Expediente` referencia a un `Cliente` y un `Inmueble`, pero no hay:

- Validación de que `cliente_id` en Expediente exista realmente en `core.cliente`
- Transacciones entre agregados (una creación de Expediente + actualización de Cliente)
- Constraints de integridad referencial a nivel de aplicación (solo existen a nivel de BD)

**Recomendación V2:** 
- Implementar un `UnitOfWork` o saga pattern
- Agregar validación de existencia de referencias en el service de Expediente
- Evaluar si las operaciones entre agregados necesitan consistencia transaccional

---

### D04 — Los tipos tienen nombres inconsistentes con el estándar PostgREST

**Archivos:** `src/types/core/cliente.ts`, `src/types/core/inmueble.ts`, `src/types/core/expediente.ts`
**Gravedad:** DIFERIBLE A V2

**Problema:**
Los tipos de fila (row types) usan sufijos inconsistentes:

- `ClienteRow` — ✅ consistente
- `InmuebleRow` — ✅ consistente
- `ExpedienteRow` — ✅ consistente

Sin embargo, los tipos de entrada/salida:

- `CrearClienteInput` / `ActualizarClienteInput`
- `CrearInmuebleInput` / `ActualizarInmuebleInput`
- `CrearExpedienteInput` / `ActualizarExpedienteInput`

Y los filtros:

- `ClienteFilter`
- `InmuebleFilter`
- `ExpedienteFilter`

Pero las exportaciones de `findMany` usan `CrearXInput` para definir tipos parciales devueltos, lo que es semánticamente impreciso. Por ejemplo en inmueble:

```typescript
export type BuscarPorRefCatResult = Pick<InmuebleRow, 'id' | 'referencia_catastral'> | null;
```

Esto está bien pero mezcla estilos: `Pick<>` vs tipos explícitos. En otros aggregates se usan tipos planos.

**Recomendación V2:** Estandarizar a `Pick<>`, `Omit<>` o tipos planos según un criterio único documentado en ADR.

---

## 4. FALSOS POSITIVOS

### FP01 — Expediente no tiene `buscarPorReferenciaCatastral` como Inmueble

**Archivo:** `src/lib/core/expediente.service.ts`
**Gravedad:** FALSO POSITIVO

**Análisis:**
`buscarPorReferenciaCatastral` es una regla de dominio específica de Inmueble (R-CR-03: deduplicación por referencia catastral). No tiene sentido en Cliente ni Expediente. No es una incoherencia, es una diferencia legítima de dominio.

---

### FP02 — Cliente no tiene validación de transiciones de estado

**Archivo:** `src/types/core/cliente.ts`
**Gravedad:** FALSO POSITIVO

**Análisis:**
Cliente no tiene un campo `estado` con transiciones como Expediente. Esto es correcto: un Cliente no pasa por estados workflow (pendiente → en_curso → completado). Cliente tiene `origen` (web, admin, api) que es un campo informativo, no un state machine.

---

## 5. MAPA DE CONSISTENCIA ARQUITECTÓNICA

| Dimensión               | Cliente       | Inmueble      | Expediente    | ¿Consistente? |
|-------------------------|---------------|---------------|---------------|:---:|
| **Tipo Row**            | ✅ ClienteRow | ✅ InmuebleRow| ✅ ExpedienteRow | ✅ |
| **Tipo Input**          | ✅ Crear/Actualizar | ✅ Crear/Actualizar | ✅ Crear/Actualizar | ✅ |
| **Tipo Filter**         | ✅ ClienteFilter | ✅ InmuebleFilter | ✅ ExpedienteFilter | ✅ |
| **Repository class**    | ✅ ClienteRepository | ✅ InmuebleRepository | ✅ ExpedienteRepository | ✅ |
| **Service class**       | ❌ No existe | ✅ InmuebleService | ✅ ExpedienteService | ❌ |
| **Singleton export**    | ✅ `clienteRepository` | ✅ `inmuebleRepository` | ✅ `expedienteRepository` | ✅ |
| **Singleton service**   | ❌ No existe | ✅ `inmuebleService` | ✅ `expedienteService` | ❌ |
| **Soft delete**         | ✅ | ✅ | ✅ | ✅ |
| **Optimistic locking**  | ✅ | ✅ | ✅ | ✅ |
| **PGRST116 handling**   | ✅ | ✅ | ✅ | ✅ |
| **MVP multitenant note**| ✅ | ✅ | ✅ | ✅ |
| **SOFT_DELETE_COLS**    | ✅ 14 campos | ✅ 14 campos | ✅ 15 campos (incluye `fecha_alta`) | ⚠️ |
| **findMany: deleted filter** | ✅ `.is()` | ✅ `.is()` | ✅ `.is()` | ✅ |
| **restaurar filter**    | ❌ Sin filtro | ❌ Sin filtro | ⚠️ Con `.not()` | ❌ |
| **Translation: crear**  | ✅ | ✅ | ✅ | ✅ |
| **Translation: actualizar** | ✅ | ✅ | ✅ | ✅ |
| **Translation: softDelete** | ✅ | ✅ | ✅ | ✅ |
| **Translation: restaurar** | ✅ | ✅ | ✅ | ✅ |
| **Translation: findById** | ✅ | ✅ | ✅ | ✅ |
| **Translation: findMany** | ✅ | ✅ | ✅ | ✅ |
| **Translation: count**  | ✅ | ✅ | ✅ | ✅ |

### Leyenda:
- ✅ = Consistente / Implementado
- ❌ = Inconsistente / Ausente
- ⚠️ = Parcial o con diferencias menores

---

## 6. DUPLICACIONES DETECTADAS

### Código duplicado entre los 3 repositorios

| Método       | Líneas | ¿Varía? | Factor de duplicación |
|--------------|--------|---------|-----------------------|
| `crear()`    | ~25-30 | Solo columnas INSERT | 3x |
| `findById()` | ~15-20 | Solo nombre tabla + columnas SELECT | 3x |
| `actualizar()` | ~35-45 | Columnas UPDATE + filtros | 3x |
| `softDelete()` | ~25 | Solo nombre tabla | 3x |
| `restaurar()` | ~20-25 | Solo nombre tabla (+ .not() inconsistente) | 3x |
| `findMany()` | ~35-45 | Filtros específicos | 3x |
| `count()`    | ~15 | Solo nombre tabla + filtros | 3x |

**Total estimado de líneas duplicadas:** ~600-700 líneas (3 repos × ~200-250 líneas cada uno, con ~80% de boilerplate idéntico)

---

## 7. DEUDA TÉCNICA

### 7.1 Mock incompleto
**Archivo:** `src/lib/__mocks__/supabase.ts`
- El mock no implementa `.not()`, causando test failures.
- El mock no implementa `.neq()`, `.lt()`, `.gt()`, `.gte()`, `.lte()`, `.in()`, `.textSearch()`, `.ilike()`.

### 7.2 Sin tests de integración real
- Todos los tests son unitarios con mock.
- No hay un solo test de integración contra Supabase real o local.
- No se verifica que las queries generadas sean sintácticamente correctas.

### 7.3 Sin tests de soft-delete cross-aggregate
- No se verifica qué pasa al hacer `findMany` con `include_deleted` cuando hay joins implícitos entre agregados.

### 7.4 Sin cobertura de lint automatizada en CI
- No se ejecuta `next lint` ni `vitest` en hook pre-commit o CI pipeline visible.

---

## 8. CÓDIGO MUERTO / NO UTILIZADO

### 8.1 `src/lib/actions/expedientes.ts`
- Archivo legacy (`src/lib/actions/expedientes.ts`) que implementaba acciones de servidor Next.js para Expediente.
- Ahora el Core usa `src/lib/core/expediente.service.ts` y `src/lib/core/expediente.repository.ts`.
- **Este archivo probablemente contiene código muerto o debe migrarse al nuevo patrón.**
- No se audita en detalle porque está fuera del alcance (Core), pero es relevante mencionarlo ya que podría generar confusión.

### 8.2 `src/types/expediente-mvp.ts`
- Archivo de tipos legacy pre-Core.
- Ahora los tipos están en `src/types/core/expediente.ts`.
- **Debe eliminarse o marcarse como deprecado** para evitar uso accidental.

---

## 9. ESTILO Y NAMING

### 9.1 Convenciones aplicadas consistentemente
- ✅ `camelCase` en TypeScript
- ✅ `snake_case` en columnas SQL
- ✅ Métodos en español (`crear`, `actualizar`, `softDelete`, `restaurar`)
- ✅ Prefijo `I` en interfaces de dominio (no usado — correcto)
- ✅ Clases exportadas con nombre completo (`ClienteRepository`)
- ✅ Singletons exportados con nombre camelCase (`clienteRepository`)
- ✅ Comentarios JSDoc en métodos públicos
- ✅ Comentarios de referencia a documentos CF-XXX

### 9.2 Inconsistencias menores
- `softDelete` es inglés, el resto de métodos son español. Opción válida si es decisión consciente, pero rompe la homogeneidad.
- `SOFT_DELETE_COLS` incluye `fecha_alta` en Expediente pero no en Cliente/Inmueble. Esto es correcto porque Expediente tiene ese campo, pero debería documentarse la diferencia.

---

## 10. OPORTUNIDADES DE REUTILIZACIÓN

### 10.1 Inmediatas (pre-MVP)
- Extraer `createClient()` del patrón repetitivo (ya está en `@/lib/supabase/server.ts` — bien)
- Estandarizar `restaurar()` entre los 3 repositorios

### 10.2 Corto plazo (V2)
- `BaseRepository<TTable, TFilter>` con:
  - `crear(input)` implementado genéricamente
  - `findById(id)` implementado genéricamente
  - `actualizar(id, input, version)` implementado genéricamente
  - `softDelete(id, deletedBy)` implementado genéricamente
  - `restaurar(id, updatedBy)` implementado genéricamente
  - `count(filter)` implementado genéricamente
  - Hook abstracto `applySpecificFilters(query, filter)` para `findMany`

- `BaseService<T>` con:
  - `findById(id)` implementado genéricamente
  - `softDelete(id, deletedBy)` implementado genéricamente
  - `restaurar(id, restoredBy)` implementado genéricamente
  - Hooks abstractos para validación específica en `crear`, `actualizar`

### 10.3 Singleton factory
- Unificar la creación de singletons: actualmente cada archivo exporta `new X()`.
- Podría centralizarse en un `core.module.ts` o `core.ts` barrel export.

---

## 11. COBERTURA DE TESTS

### Resultados actuales: 113/115 pasan (98.3%)

| Archivo | Tests | Status |
|---------|-------|--------|
| `cliente.repository.test.ts` | 13 | ✅ 13/13 |
| `inmueble.repository.test.ts` | 15 | ✅ 15/15 |
| `expediente.repository.test.ts` | 17 | ❌ 15/17 (2 fail: restaurar) |
| `inmueble.service.test.ts` | 40 | ✅ 40/40 |
| `expediente.service.test.ts` | 30 | ✅ 30/30 |
| **Total** | **115** | **✅ 113/115 (98.3%)** |

### Tests faltantes
- **ClienteService**: 0 tests — no existe el service
- **Tests de integración**: 0 — todos los tests son unitarios con mock

---

## 12. CONCLUSIONES

### Estado general: ✅ ACEPTABLE CON OBSERVACIONES

**Fortalezas:**
1. Patrón arquitectónico muy consistente entre los tres agregados.
2. Soft delete y optimistic locking implementados correctamente en todos.
3. Manejo de errores homogéneo (PGRST116 en repos, validación en services).
4. Nombrado coherente (español para dominio, inglés para métodos técnicos).
5. Estructura de carpetas idéntica.
6. Tests con alta cobertura de casos (113/115 pasan).

**Debilidades:**
1. **1 bug crítico** en `ExpedienteRepository.restaurar()` (CR-001).
2. **Cliente no tiene service** (R05), rompiendo la simetría 3×3.
3. **Mock de Supabase incompleto** (R02), propenso a roturas futuras.
4. **600-700 líneas de código duplicado** entre repos (D01, diferible a V2).
5. **Sin taxonomía de errores** (R03), errores planos sin tipo.

### Prioridad de acción

1. **⚠️ CR-001** — Arreglar `restaurar()` en Expediente y mock (pre-MVP, urgente)
2. **📌 R01** — Unificar criterio de `restaurar()` entre agregados (pre-MVP)
3. **📌 R02** — Completar mock de Supabase (pre-MVP)
4. **📌 R05** — Crear ClienteService (pre-MVP)
5. **📌 R03, R04** — Mejoras de calidad (pre-MVP si hay tiempo)
6. **📋 D01-D04** — Mover a backlog V2

---

*Fin del informe — 7/4/2026*
*No se modificó ningún archivo de código ni documentación.*
*No se realizaron commits.*
*No se realizó push.*