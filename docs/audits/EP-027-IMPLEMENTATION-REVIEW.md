# EP-027 — Documento IA: Implementation Review

**Date:** 2026-07-09
**Reviewer:** Sistema de auditoría automática
**Scope:** Review técnica previa a commit, sin modificación de código ni propuestas de rediseño.

---

## Q1: ¿Documento IA es coherente con Cliente, Inmueble y Expediente?

**Clasificación: Falso positivo**

Documento IA sigue exactamente el mismo patrón estructural que los otros tres agregados del Core V1:

| Aspecto | Cliente | Inmueble | Expediente | Documento IA |
|---------|---------|----------|------------|--------------|
| Error classes (Validation/NotFound/Conflict/VersionConflict) | ✅ | ✅ | ✅ | ✅ |
| Input types (Crear/Actualizar/Filter/DeleteResult) | ✅ | ✅ | ✅ | ✅ |
| Singleton + clase | ✅ | ✅ | ✅ | ✅ |
| Repository → Service separación | ✅ | ✅ | ✅ | ✅ |
| Soft delete audit fields | ✅ | ✅ | ✅ | ✅ |
| version para optimistic locking | ✅ | ✅ | ✅ | ✅ |

No hay divergencias estructurales. La coherencia con los otros agregados es total.

---

## Q2: ¿La máquina de estados IA tiene transiciones imposibles o faltantes?

**Clasificación: 🔴 CRÍTICO**

**El agregado Documento IA NO tiene máquina de estados definida.**

El tipo `EstadoProcesamientoIA` se define como literal union:
```
'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO' | 'ERROR' | 'NO_APLICA'
```

Pero en el código del Service no existe ninguna validación de transiciones, comparable a `TRANSICIONES_ESTADO` y `esTransicionValida()` que SÍ existen en Expediente (`src/types/core/expediente.ts` líneas 211-233).

**Transiciones actualmente permitidas (sin restricción):**
- `NO_APLICA → COMPLETADO` (sin pasar por PENDIENTE/EN_PROCESO)
- `PENDIENTE → COMPLETADO` (sin pasar por EN_PROCESO)
- `COMPLETADO → PENDIENTE` (vuelta atrás imposible en un pipeline real)
- `ERROR → COMPLETADO` (desde error directamente a completado)
- `EN_PROCESO → NO_APLICA` (contradicción semántica)

**Estado faltante:** En el diseño (`CF-030 PITR` y closure report) se mencionaba `RECHAZADO` como estado posible, pero no está en el enum ni en el SQL.

**Además:** El enumerado SQL usa `EN_PROCESO` mientras que la closure report mencionaba `PROCESANDO`. Son equivalentes, pero hay que verificar cuál es el correcto según diseño.

**Impacto:** Sin máquina de estados, `registrarProcesamientoIA()` acepta cualquier transición. Esto es una regla de negocio no implementada.

---

## Q3: ¿metadata_ia contiene únicamente datos técnicos de IA y no datos de negocio?

**Clasificación: Falso positivo**

`metadata_ia` está tipado como `Record<string, unknown> | null` en TypeScript y `JSONB` en SQL.

No hay validación que fuerce una estructura concreta en `metadata_ia`. La ausencia de schema validation es intencional por diseño (es un blob semiestructurado para evolucionar). Sin embargo:

- En `registrarProcesamientoIA`, se valida que sea obligatorio cuando `estado_ia ≠ NO_APLICA`, pero NO su contenido.
- En los tests se usa `{ modelo, confianza, resumen, fecha_procesamiento }`, que son datos técnicos de IA correctos.

**Riesgo real:** Bajo. El campo está diseñado como semiestructurado. Forzar un schema estricto ahora sería overengineering (V2). En V1 es aceptable.

---

## Q4: ¿Existe algún dato que realmente debería pertenecer a Expediente?

**Clasificación: Falso positivo**

Campos de Documento IA:
- `expediente_id` — FK correcta al aggregate padre ✅
- `tipo` — específico del documento ✅
- `nombre` — nombre de archivo, no de expediente ✅
- `mime_type` — formato del archivo ✅
- `tamano_bytes` — metadato de archivo ✅
- `storage_path` — ruta de almacenamiento ✅
- `hash_sha256` — checksum de integridad ✅
- `metadata_ia` / `estado_ia` — procesamiento IA ✅
- `version` — optimistic locking propio del agregado ✅

Ningún campo pertenece semánticamente a Expediente. La relación es limpia: Expediente tiene documentos, Documento IA es su propio agregado con su propio lifecycle.

---

## Q5: ¿La relación Expediente → Documento IA respeta los límites del agregado definidos en DDD?

**Clasificación: Falso positivo**

Documento IA se modela como **agregado hijo** de Expediente:

- Expediente NO tiene embedded `DocumentoIARow[]` — no rompe encapsulamiento.
- Documento IA referencia a Expediente por `expediente_id` (FK).
- Documento IA tiene su propio repositorio, ciclo de vida, y reglas de negocio.
- Las operaciones sobre Documento IA no modifican el estado de Expediente.
- `listarPorExpediente()` expresa la relación padre-hijo mediante filtro, no mediante navegación del aggregate root.

Esto respeta estrictamente los límites definidos en CF-022-AGGREGATE-BOUNDARIES.md y CF-020-DATA-MODEL.md.

---

## Q6: ¿Hay validaciones duplicadas entre Repository y Service?

**Clasificación: Falso positivo**

La separación de responsabilidades es correcta:

| Validación | Service | Repository |
|-----------|---------|------------|
| Tipo documento válido | ✅ (líneas 96-102) | ❌ (confía en DB enum) |
| MIME type permitido | ✅ (líneas 125-133) | ❌ |
| Tamaño ≤ 50MB | ✅ (líneas 136-147) | ❌ (solo `> 0` via constraint) |
| Hash SHA-256 formato | ✅ (líneas 112-123) | ❌ |
| Storage path formato | ✅ (líneas 160-171) | ❌ |
| Version ≥ 1 | ✅ (líneas 187-193) | ❌ (solo `>= 1` via constraint) |
| FK expediente existe | ❌ (no valida) | ❌ (confía en FK constraint) |
| Unique (hash + expediente) | ❌ (catch frágil) | ❌ (no hay UNIQUE constraint) |

Repository confía en las constraints de la BD. Service aplica reglas de negocio más estrictas. No hay duplicación real.

**NOTA:** La línea 236 del Service captura `duplicate key` del repositorio, pero **no existe UNIQUE constraint** en la migración SQL que pueda generar ese error. El catch nunca se ejecutará.

---

## Q7: ¿Hay riesgo de concurrencia no cubierto por optimistic locking?

**Clasificación: ⚠️ RECOMENDADO ANTES DEL MVP**

Revisiones:

1. **UPDATE (optimistic locking):** ✅ Cubierto vía `.eq('version', input.version)` en el Repository.

2. **softDelete SIN version check:** ⚠️ El softDelete no verifica version. Dos softDelete concurrentes:
   - Ambos ven el documento con version=1.
   - Ambos ejecutan el mismo UPDATE sin version filter.
   - Ambos reciben success=true.
   - Esto es aceptable para V1 porque la operación es idempotente (el segundo simplemente sobrescribe deleted_at con el mismo valor). El daño es mínimo.

3. **INSERT sin control de concurrencia:** ⚠️ Creación de documentos duplicados.
   - Sin UNIQUE constraint en `(expediente_id, hash_sha256)`, dos inserts concurrentes con el mismo hash crearán dos filas distintas.
   - La validación de unicidad en el Service (línea 236) no funciona porque no hay índice único.

4. **registrarProcesamientoIA usa actualizar → optimistic locking cubre:** ✅

5. **restaurar SIN version check:** Misma situación que softDelete.

**Riesgo principal:** Duplicación de documentos por ausencia de UNIQUE constraint. Impacto medio-bajo para V1.

---

## Q8: ¿La migración SQL sigue exactamente el patrón del Core?

**Clasificación: Falso positivo**

La migración sigue la estructura canónica de Core V1:

| Paso | Descripción | Expediente | Documento IA |
|------|-------------|-----------|--------------|
| STEP 1 | Enums con `DO $$ ... WHEN duplicate_object` | ✅ | ✅ |
| STEP 2 | CREATE TABLE con PK, FK, CHECK, version, auditoría | ✅ | ✅ (idéntico patrón) |
| STEP 3 | Partial indexes con `WHERE deleted_at IS NULL` | ✅ | ✅ (más índice compuesto) |
| STEP 4 | ALTER TABLE ENABLE RLS | ✅ | ✅ |
| STEP 5 | RLS Policies con auth.uid() | ✅ | ✅ (misma estructura) |
| STEP 6 | Trigger updated_at | ✅ | ✅ |
| STEP 7 | COMMENT ON TABLE/COLUMN | ✅ | ✅ |
| STEP 8 | Seed data demo | ✅ | ✅ |

Diferencias menores no problemáticas:
- Documento IA añade `idx_documento_expediente_tipo` (índice compuesto) que expediente no tiene. Es una mejora justificada por el patrón de consulta.
- Documento IA usa `core.uuid_generate_v7()` como default como expediente.

---

## Q9: ¿Los tests cubren los casos de error más importantes?

**Clasificación: ⚠️ RECOMENDADO ANTES DEL MVP**

Cobertura actual: 43 tests, todas pasando.

### Casos cubiertos adecuadamente:
- ✅ Validación de campos en creación (expediente_id, tipo, nombre, mime_type, tamaño, hash, storage_path)
- ✅ findById con ID vacío y no encontrado
- ✅ findMany con/sin resultados
- ✅ listarPorExpediente con filtros
- ✅ count
- ✅ actualizar con version conflict, not found, validaciones condicionales
- ✅ registrarProcesamientoIA con metadata requerida, NO_APLICA sin metadata, version conflict
- ✅ softDelete y restaurar con todos los edge cases

### Casos NO cubiertos (recomendados):
1. **🔴 storage_path con formato inválido específico** — `validateStoragePath` solo verifica `path.split('/').length < 3`, pero no que el primer segmento sea UUID, ni que el segundo sea un tipo válido. Los tests solo cubren el caso "invalid-path" (2 partes).
2. **🔴 Catch de error de repositorio en actualizar** — El Service captura `PGRST116` en el Repository, pero el test de version conflict no prueba el caso donde `actualizar` lanza un error inesperado (no return null).
3. **⚠️ Estado IA enum en mayúsculas** — El patrón `SHA256_PATTERN = /^[a-f0-9]{64}$/` rechaza mayúsculas. Esto no está probado ni documentado como limitación.
4. **⚠️ metadata_ia con estructura inválida** — No hay tests que verifiquen que metadata_ia no contiene datos de negocio (no hay schema validation, pero el riesgo quedaría documentado).

---

## Q10: ¿Existe algún bloqueo para considerar Documento IA listo para producción?

**Clasificación: 🔴 CRÍTICO**

**SÍ existe bloqueo.** Hallazgos que impiden considerar el aggregate listo para producción:

### Bloqueantes (🔴 CRÍTICO):

1. **Ausencia de máquina de estados IA (Q2):** `registrarProcesamientoIA()` permite cualquier transición entre estados IA. Es una regla de negocio fundamental no implementada. Corregir requiere añadir `TRANSICIONES_ESTADO_IA` y validación en el Service.

### Recomendados antes del MVP (⚠️):

2. **UNIQUE constraint faltante (Q6, Q7):** Sin `UNIQUE (expediente_id, hash_sha256)`, pueden crearse documentos duplicados. El catch de `duplicate key` en el Service nunca se ejecuta. Afecta a integridad de datos.

3. **Cobertura de tests parcial (Q9):** Faltan casos edge en storage_path, hash mayúsculas, y error propagation.

### Diferibles a V2:

4. **Soft delete sin optimistic locking (Q7):** Aceptable porque la operación es idempotente.
5. **metadata_ia sin schema validation (Q3):** Aceptable como campo semiestructurado.
6. **Restaurar sin version check (Q7):** Misma situación que soft delete.

### Falsos positivos:

- Q1 (coherencia con otros agregados)
- Q4 (datos que pertenezcan a Expediente)
- Q5 (límites DDD)
- Q6 (validaciones duplicadas)
- Q8 (patrón SQL)

---

## Resumen de clasificaciones

| # | Pregunta | Clasificación |
|---|----------|---------------|
| 1 | Coherencia con Cliente/Inmueble/Expediente | ✅ Falso positivo |
| 2 | Máquina de estados IA | 🔴 **Crítico** |
| 3 | metadata_ia puro | ✅ Falso positivo |
| 4 | Datos de Expediente | ✅ Falso positivo |
| 5 | Límites DDD | ✅ Falso positivo |
| 6 | Validaciones duplicadas | ✅ Falso positivo |
| 7 | Concurrencia no cubierta | ⚠️ **Recomendado antes del MVP** |
| 8 | Patrón SQL | ✅ Falso positivo |
| 9 | Tests de error | ⚠️ **Recomendado antes del MVP** |
| 10 | Bloqueo producción | 🔴 **Crítico** |

---

## Conclusión

El agregado Documento IA es estructuralmente sólido, coherente con los otros tres agregados del Core V1, y respeta los límites DDD. **Sin embargo, tiene un defecto crítico:** la máquina de estados de procesamiento IA no está implementada, lo que permite transiciones de estado imposibles según las reglas de negocio.

**Antes de commit, es necesario corregir:**
1. 🔴 Añadir máquina de estados IA con transiciones válidas
2. ⚠️ Añadir UNIQUE constraint `(expediente_id, hash_sha256)` en la migración SQL
3. ⚠️ Completar tests para los casos edge identificados

Sin estas correcciones, el aggregate no cumple el Definition of Done establecido en AGENTS.md.