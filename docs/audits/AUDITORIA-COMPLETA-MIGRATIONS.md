# Auditoría Completa de Migraciones — `supabase/migrations_v2/`

> **Fecha:** 2026-07-16  
> **Propósito:** Auditoría estructural completa de la capa de base de datos para reconstrucción total en 4 migraciones.

---

## 1. Inventario Cronológico de Migraciones

| #  | Archivo                                | Fecha       | Tamaño | Propósito |
|----|----------------------------------------|-------------|--------|-----------|
| 1  | `20260702_00001_create_expedientes.sql` | 2026-07-02  | 2.4 KB | Tabla `public.expedientes` MVP inicial |
| 2  | `20260703_00001_create_schema_core.sql` | 2026-07-03  | 9.9 KB | Schema `core`, UUIDv7, tabla `core.cliente` |
| 3  | `20260706_00001_refactor_cliente_mvp.sql` | 2026-07-06 | 6.3 KB | Elimina `empresa_id` de `core.cliente`, refactor RLS |
| 4  | `20260706_00002_create_inmueble.sql`   | 2026-07-06  | 12.1 KB | Tabla `core.inmueble`, enums, RLS, seed |
| 5  | `20260707_00001_update_expedientes.sql` | 2026-07-07  | 6.7 KB | ALTER `public.expedientes`, añade columnas core |
| 6  | `20260708_00001_create_core_expediente.sql` | 2026-07-08 | 11.2 KB | Tabla `core.expediente`, migración desde `public` |
| 7  | `20260709_00001_create_core_documento.sql` | 2026-07-09 | 10.1 KB | Tabla `core.documento`, enums, RLS, seed |
| 8  | `20260710_00001_add_diagnostico_to_expediente.sql` | 2026-07-10 | 4.5 KB | ALTER `core.expediente` + diagnostico JSONB |
| 9  | `20260710_00001_create_storage_expediente.sql` | 2026-07-10 | 2.8 KB | Storage bucket `expediente-docs` + policies |
| 10 | `20260711_00001_add_dictamen.sql`      | 2026-07-11  | 1.2 KB | ALTER `core.expediente` + dictamen JSONB |
| 11 | `20260712_00001_create_schema_commercial.sql` | 2026-07-12 | 23.2 KB | Schema `commercial`, 6 tablas, RLS, triggers |

---

## 2. Qué Crea Cada Migración — Inventario Detallado

### 2.1 Schemas

| Migración         | Schema Creado |
|-------------------|---------------|
| #2 (20260703)     | `core`        |
| #11 (20260712)    | `commercial`  |

### 2.2 Enums

| Enum                                | Migración | Schema      |
|-------------------------------------|-----------|-------------|
| `estado_expediente`                 | #1        | `public`    |
| `core.origen_cliente`               | #2        | `core`      |
| `core.tipo_inmueble`                | #4        | `core`      |
| `core.tipo_edificio`                | #4        | `core`      |
| `core.uso_inmueble`                 | #4        | `core`      |
| `core.orientacion`                  | #4        | `core`      |
| `core.zona_climatica_cte`           | #4        | `core`      |
| `core.zona_climatica_verano`        | #4        | `core`      |
| `core.tipo_documento`               | #7        | `core`      |
| `core.estado_procesamiento_ia`      | #7        | `core`      |

### 2.3 Tablas

| Tabla                        | Migración | Schema        | Notas                          |
|------------------------------|-----------|---------------|--------------------------------|
| `public.expedientes`         | #1        | `public`      | MVP inicial, evolucionada en #5 |
| `core.cliente`               | #2        | `core`        | Refactorizada en #3            |
| `core.inmueble`              | #4        | `core`        |                                |
| `core.expediente`            | #6        | `core`        | Copia desde `public.expedientes` |
| `core.documento`             | #7        | `core`        |                                |
| `commercial.customer`        | #11       | `commercial`  |                                |
| `commercial.order`           | #11       | `commercial`  |                                |
| `commercial.payment`         | #11       | `commercial`  |                                |
| `commercial.contract`        | #11       | `commercial`  |                                |
| `commercial.contract_document` | #11     | `commercial`  |                                |
| `commercial.audit_trail`     | #11       | `commercial`  |                                |

### 2.4 Índices

| Migración(es) | Total | Notas |
|----------------|-------|-------|
| #1, #2, #3, #4, #5, #6, #7, #11 | ~50 índices | Muchos duplicados entre migraciones |

### 2.5 Triggers

| Nombre del Trigger                 | Migración | Tabla              | Función                           |
|------------------------------------|-----------|--------------------|-----------------------------------|
| `update_expedientes_updated_at`    | #1        | `public.expedientes` | `update_updated_at_column()` (public) |
| `trg_cliente_updated_at`           | #2        | `core.cliente`      | `core.update_updated_at_column()` |
| `trg_cliente_version`              | #2        | `core.cliente`      | `core.increment_version()`        |
| `trg_inmueble_set_updated_at`      | #4        | `core.inmueble`     | `core.trigger_set_updated_at()`   |
| `trg_expedientes_set_updated_at`   | #5        | `public.expedientes` | `core.trigger_set_updated_at()`   |
| `trg_expediente_set_updated_at`    | #6        | `core.expediente`   | `core.trigger_set_updated_at()`   |
| `trg_expediente_version`           | #6        | `core.expediente`   | `core.increment_version_expediente()` |
| `trg_documento_set_updated_at`     | #7        | `core.documento`    | `core.trigger_set_updated_at()`   |
| `trg_customer_updated_at`          | #11       | `commercial.customer` | `commercial.update_updated_at_column()` |
| `trg_customer_version`             | #11       | `commercial.customer` | `commercial.increment_version()`  |
| `trg_order_updated_at`             | #11       | `commercial.order`  | `commercial.update_updated_at_column()` |
| `trg_order_version`                | #11       | `commercial.order`  | `commercial.increment_version()`  |
| `trg_payment_updated_at`           | #11       | `commercial.payment` | `commercial.update_updated_at_column()` |
| `trg_contract_updated_at`          | #11       | `commercial.contract` | `commercial.update_updated_at_column()` |
| `trg_contract_document_updated_at` | #11       | `commercial.contract_document` | `commercial.update_updated_at_column()` |

### 2.6 Funciones

| Función                                | Migración | Schema        |
|----------------------------------------|-----------|---------------|
| `update_updated_at_column()`           | #1        | `public`      |
| `core.uuid_generate_v7()`              | #2        | `core`        |
| `core.update_updated_at_column()`      | #2        | `core`        |
| `core.increment_version()`             | #2        | `core`        |
| `core.trigger_set_updated_at()`        | #4        | `core`        |
| `core.increment_version_expediente()`  | #6        | `core`        |
| `commercial.uuid_generate_v7()`        | #11       | `commercial`  |
| `commercial.update_updated_at_column()` | #11       | `commercial`  |
| `commercial.increment_version()`       | #11       | `commercial`  |

### 2.7 RLS Policies

| Migración(es) | Total Policies | Notas |
|-----------------|----------------|--------|
| #1, #2, #3, #4, #5, #6, #7, #9, #11 | ~50+ policies | Múltiples versiones de las mismas policies por refactor |

### 2.8 Storage

| Migración | Recurso               |
|-----------|-----------------------|
| #9        | Bucket `expediente-docs` + 4 RLS policies en `storage.objects` |

### 2.9 Seeds

| Migración | Seed                                      |
|-----------|-------------------------------------------|
| #2        | `core.cliente` — cliente demo             |
| #4        | `core.inmueble` — inmueble demo           |
| #6        | `core.expediente` — expediente demo       |
| #7        | `core.documento` — documento demo         |

---

## 3. Problemas Detectados

### 3.1 Duplicados

| Tipo                | Problema | Detalle |
|---------------------|----------|---------|
| **Schema**          | ✅ OK    | No hay schemas duplicados |
| **Enums**           | ⚠️ Parcial | `estado_expediente` vive en `public` — debería estar en `core` |
| **Índices duplicados** | ❌ GRAVE | `uq_cliente_email`, `idx_cliente_usuario_id`, `idx_cliente_email`, `idx_cliente_nombre`, `idx_cliente_created_at`, `idx_cliente_anonymized_at` se crean en #2 y se _recrean_ en #3 |
| **Índices duplicados** | ❌ GRAVE | `idx_expedientes_inmueble_id` se crea en #5 y otra vez `idx_expediente_inmueble_id` en #6 (nombres distintos, misma función) |
| **Funciones duplicadas** | ❌ GRAVE | `update_updated_at_column()` existe en `public` (#1) y como `core.update_updated_at_column()` (#2) y como `core.trigger_set_updated_at()` (#4) — **3 implementaciones del mismo concepto** |
| **Funciones duplicadas** | ❌ GRAVE | `core.uuid_generate_v7()` (#2) y `commercial.uuid_generate_v7()` (#11) — **copia exacta** |
| **Funciones duplicadas** | ❌ GRAVE | `core.increment_version()` (#2) y `commercial.increment_version()` (#11) — **copia exacta** |
| **Funciones duplicadas** | ❌ GRAVE | `core.increment_version_expediente()` (#6) es un duplicado conceptual de `core.increment_version()` con nombre distinto |
| **Policies duplicadas** | ❌ GRAVE | Las policies de `core.cliente` se crean en #2 y se DROP+CREATE completas en #3 |
| **Triggers duplicados** | ❌ MODERADO | `update_expedientes_updated_at` (#1) se DROP en #5 y se recrea como `trg_expedientes_set_updated_at` |

### 3.2 Dependencias Circulares

| Origen | Tipo | Destino | Problema |
|--------|------|---------|----------|
| `core.inmueble` (#4) | FK | `core.cliente` (#2) | ✅ OK (cliente existe antes) |
| `core.expediente` (#6) | FK (implícita) | `core.inmueble` (#4) | ✅ OK (inmueble existe antes) |
| `core.expediente` (#6) | FK (implícita) | `public.expedientes` (#1) | ⚠️ La migración #6 LEE datos de #1, pero #1 está en `public` y #6 crea `core` — no es circular pero es frágil |
| `core.documento` (#7) | FK | `core.expediente` (#6) | ✅ OK |
| `commercial.customer` (#11) | FK | `auth.users` | ✅ OK (dependencia legítima) |
| `commercial.order` (#11) | FK | `commercial.customer` | ✅ OK |
| `commercial.payment` (#11) | FK | `commercial.order` | ✅ OK |
| `commercial.contract` (#11) | FK | `commercial.order` | ✅ OK |
| `commercial.contract_document` (#11) | FK | `commercial.contract` | ✅ OK |
| **NINGUNA dependencia circular** | — | — | ✅ OK |

### 3.3 Migraciones que Modifican Tablas Anteriores

| Migración | Modifica        | Creada en | Tipo de Modificación |
|-----------|-----------------|-----------|----------------------|
| #3        | `core.cliente`  | #2        | DROP COLUMN `empresa_id`, DROP+CREATE índices y RLS |
| #5        | `public.expedientes` | #1   | ADD COLUMNs (inmueble_id, created_by, updated_by, deleted_at, deleted_by, version) + nuevos índices + DROP+CREATE RLS |
| #8        | `core.expediente` | #6       | ADD COLUMNs (diagnostico, diagnostico_version, estado_diagnostico) |
| #10       | `core.expediente` | #6       | ADD COLUMN (dictamen) |

**Problema estructural:** `core.expediente` se crea en #6 pero se modifica en #8 y #10. Esto crea una dispersión vertical — para entender la estructura completa de `core.expediente` hay que leer 3 archivos.

### 3.4 Policies Duplicadas

| Policy                                     | Creada en | Recreada en |
|--------------------------------------------|-----------|-------------|
| `Clientes pueden ver sus propios expedientes` | #1        | #5 (DROP+CREATE con otro nombre) |
| `Clientes pueden crear sus propios expedientes` | #1    | #5 (DROP+CREATE con otro nombre) |
| `Clientes pueden actualizar sus propios expedientes` | #1 | #5 (DROP+CREATE con otro nombre) |
| `Usuarios pueden ver sus clientes`         | #2        | #3 (DROP+CREATE) |
| `Usuarios pueden crear clientes`           | #2        | #3 (DROP+CREATE) |
| `Usuarios pueden actualizar sus clientes`  | #2        | #3 (DROP+CREATE) |
| `Solo servicio puede hard-delete`          | #2        | #3 (DROP+CREATE) |
| `Service role acceso completo`             | #2        | #3 (DROP+CREATE) |

### 3.5 Triggers Duplicados / Redundantes

| Trigger Original | Reemplazado Por | Problema |
|------------------|-----------------|----------|
| `update_expedientes_updated_at` (público, #1) | `trg_expedientes_set_updated_at` (#5) | Migración #5 hace DROP del trigger #1 y crea uno nuevo con nombre diferente |
| `core.update_updated_at_column()` (#2) | `core.trigger_set_updated_at()` (#4) | #4 crea una función con nombre distinto pero **idéntica lógica** |

### 3.6 Funciones Duplicadas / Redundantes

| Función | Es Duplicado De | Impacto |
|---------|-----------------|---------|
| `public.update_updated_at_column()` (#1) | `core.update_updated_at_column()` (#2) | Bajo — misma lógica, distinto schema |
| `core.trigger_set_updated_at()` (#4) | `core.update_updated_at_column()` (#2) | **Alto** — misma función con nombre distinto en el mismo schema |
| `core.increment_version_expediente()` (#6) | `core.increment_version()` (#2) | Medio — misma lógica, nombre específico innecesario |
| `commercial.uuid_generate_v7()` (#11) | `core.uuid_generate_v7()` (#2) | **Alto** — copia exacta, debe reutilizar la de `core` |
| `commercial.update_updated_at_column()` (#11) | `core.trigger_set_updated_at()` (#4) | **Alto** — misma lógica, schema distinto |
| `commercial.increment_version()` (#11) | `core.increment_version()` (#2) | **Alto** — copia exacta |

### 3.7 Enums Repetidos

| Enum | Creado En | Problema |
|------|-----------|----------|
| `estado_expediente` | #1 (public) | Creado en `public` pero usado también en `core.expediente` (#6) y `public.expedientes` (#1, #5). Debe unificarse en `core`. |

### 3.8 Seeds Mezclados con Estructura

| Migración | Estructura + Seed | Problema |
|-----------|-------------------|----------|
| #2 | Crea tabla + inserta seed | **Inconveniente**: al regenerar, el seed puede fallar si la estructura cambia |
| #4 | Crea tabla + inserta seed | **Dependencia**: seed referencia `core.cliente` que podría no tener datos |
| #6 | Crea tabla + migra datos + inserta seed | **Riesgo alto**: mezcla migración de datos, creación de estructura y seed demo |
| #7 | Crea tabla + inserta seed | **Dependencia**: seed referencia `core.expediente` por `numero_expediente` |

### 3.9 SQL No Idempotente

| Línea | Migración | Problema |
|-------|-----------|----------|
| `UPDATE expedientes SET created_by = ... WHERE created_by IS NULL` | #5 | Asume que hay datos. Si se re-ejecuta, actualiza registros ya migrados (aunque el WHERE protege) |
| `INSERT INTO core.expediente ... FROM public.expedientes ... WHERE NOT EXISTS` | #6 | Es idempotente por el WHERE NOT EXISTS |
| Seeds con `ON CONFLICT DO NOTHING` | #2, #4, #6, #7 | ✅ Son idempotentes |
| `DROP POLICY IF EXISTS ...` + `CREATE POLICY ...` | #3, #5, #6, #7 | ✅ Es idempotente |
| `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` | #5, #8, #10 | ✅ Es idempotente |
| `DROP INDEX IF EXISTS` + `CREATE INDEX IF NOT EXISTS` | #3, #5 | ✅ Es idempotente |
| `ALTER TABLE ... DROP CONSTRAINT IF EXISTS` + `ADD CONSTRAINT` | #5, #8 | ✅ Es idempotente |

**Problema detectado:** La migración #5 actualiza datos existentes:
```sql
UPDATE expedientes
  SET created_by = '00000000-0000-0000-0000-000000000000',
      updated_by = '00000000-0000-0000-0000-000000000000'
  WHERE created_by IS NULL;
```
Si se re-ejecuta y hay registros nuevos con `created_by IS NULL`, se sobrescribirán — aunque en la práctica no debería ocurrir si el código siempre asigna `created_by`.

---

## 4. Propuesta de Reorganización en 4 Migraciones

### 4.1 Foundation (`001_foundation.sql`)

**Propósito:** Todo el schema `core` con su infraestructura base.

**Contenido:**
- Schema `core`
- Función `core.uuid_generate_v7()` (única, reusable)
- Función `core.update_updated_at()` (única, reusable)
- Función `core.increment_version()` (única, reusable)
- Todos los enums de `core`:
  - `core.estado_expediente` (migrado desde `public`)
  - `core.origen_cliente`
  - `core.tipo_inmueble`, `core.tipo_edificio`, `core.uso_inmueble`, `core.orientacion`
  - `core.zona_climatica_cte`, `core.zona_climatica_verano`
  - `core.tipo_documento`, `core.estado_procesamiento_ia`
- Tabla `core.cliente` (con todas sus columnas finales, sin `empresa_id`)
- Índices de `core.cliente`
- RLS de `core.cliente`
- Triggers de `core.cliente`
- Seed de cliente demo (opcional, o movido a `seed.sql`)

**Dependencias:** Ninguna (solo `auth.users` para FK, que es de Supabase)

### 4.2 Storage (`002_storage.sql`)

**Propósito:** Infraestructura de almacenamiento de archivos.

**Contenido:**
- Bucket `expediente-docs`
- RLS policies en `storage.objects`

**Dependencias:** Foundation (necesita `core.expediente` para validación RLS, pero esto crea una dependencia cruzada)

**Alternativa:** Renombrar a "Foundation + Storage" y poner Storage al final de Foundation, o mover las policies RLS de storage a la migración Dictamen que crea `core.expediente`.

### 4.3 Dictamen (`003_dictamen.sql`)

**Propósito:** Todo el agregado Expediente y sus entidades hijas.

**Contenido:**
- Tabla `public.expedientes` (solo si se mantiene compatibilidad; idealmente se elimina)
- Tabla `core.inmueble` + índices + RLS + triggers
- Tabla `core.expediente` + columnas finales (incluyendo `diagnostico`, `diagnostico_version`, `estado_diagnostico`, `dictamen`) + índices + RLS + triggers
- Tabla `core.documento` + índices + RLS + triggers
- Seeds demo (o movidos a `seed.sql`)

**Dependencias:** Foundation (necesita schema `core`, enums, funciones)

### 4.4 Commercial (`004_commercial.sql`)

**Propósito:** Schema de dominio comercial completo.

**Contenido:**
- Schema `commercial`
- Funciones `commercial` (simplificadas: reutilizan las de `core` en lugar de duplicar)
- Tabla `commercial.customer` + índices + RLS + triggers
- Tabla `commercial.order` + índices + RLS + triggers
- Tabla `commercial.payment` + índices + RLS
- Tabla `commercial.contract` + índices + RLS
- Tabla `commercial.contract_document` + índices + RLS
- Tabla `commercial.audit_trail` + índices + RLS

**Dependencias:** Foundation (necesita `core`)

### 4.5 Semilla Separada (opcional: `seed.sql`)

**Propósito:** Datos demo independientes de la estructura.

**Contenido:**
- Seed `core.cliente`
- Seed `core.inmueble`
- Seed `core.expediente`
- Seed `core.documento`

**Ventaja:** Se puede regenerar sin tocar la estructura. Útil para entornos de desarrollo/testing.

### 4.6 Mapa de Dependencias entre las 4 Migraciones

```
001_foundation.sql
    ↓
002_storage.sql ──→ (dependencia débil: RLS policies referencian core.expediente)
    ↓
003_dictamen.sql
    ↓
004_commercial.sql
```

**Orden de aplicación obligatorio:**
1. `001_foundation.sql`
2. `002_storage.sql`
3. `003_dictamen.sql`
4. `004_commercial.sql`

---

## 5. Resumen de Problemas por Prioridad

### 🔴 Críticos (bloquean reconstrucción)

| Problema | Afecta | Solución Propuesta |
|----------|--------|--------------------|
| `commercial.uuid_generate_v7()` duplica a `core.uuid_generate_v7()` | Commercial | Eliminar función duplicada, usar `core.uuid_generate_v7()` |
| `commercial.update_updated_at_column()` duplica a `core.trigger_set_updated_at()` | Commercial | Eliminar función duplicada, usar `core.update_updated_at()` |
| `commercial.increment_version()` duplica a `core.increment_version()` | Commercial | Eliminar función duplicada, usar `core.increment_version()` |
| `core.trigger_set_updated_at()` duplica a `core.update_updated_at_column()` | Core | Unificar en una sola función (`core.update_updated_at()`) |
| `core.increment_version_expediente()` duplica a `core.increment_version()` | Core | Eliminar, usar `core.increment_version()` |
| `estado_expediente` creado en `public` en vez de `core` | Foundation | Mover enum a `core.estado_expediente` |

### 🟡 Altos

| Problema | Afecta | Solución Propuesta |
|----------|--------|--------------------|
| Seeds mezclados con estructura | Todas | Extraer a `seed.sql` separado |
| Dispersión vertical de columnas de `core.expediente` | #6, #8, #10 | Consolidar columnas finales en una sola CREATE TABLE |
| Índices duplicados entre #2 y #3 | Core | Consolidar en Foundation |
| Policies duplicadas entre #2 y #3 | Core | Consolidar en Foundation con versión final |

### 🟢 Bajos / Informativos

| Problema | Afecta | Solución Propuesta |
|----------|--------|--------------------|
| `public.update_updated_at_column()` | #1 | Mantener solo si `public.expedientes` sigue existiendo |
| `public.expedientes` como tabla paralela a `core.expediente` | #1, #5, #6 | Decidir: eliminar `public.expedientes` o mantener como view |

---

## 6. Recomendaciones Finales

1. **Unificar todas las funciones utilitarias** en `core` y referenciarlas desde `commercial`.
2. **Consolidar `core.expediente`** con todas sus columnas (incluyendo `diagnostico`, `dictamen`) en una sola CREATE TABLE en Dictamen.
3. **Extraer todos los seeds** a un archivo `seed.sql` separado, aplicable opcionalmente.
4. **Mover `estado_expediente`** de `public` a `core`.
5. **Eliminar `public.expedientes`** si nada en el código de aplicación depende de ella (o reemplazar por una view).
6. **Usar `CREATE OR REPLACE FUNCTION`** en lugar de `CREATE FUNCTION` + comprobaciones manuales para las funciones utilitarias.
7. **Añadir `pgTAP` tests** para verificar idempotencia: aplicar las 4 migraciones 2 veces seguidas debe ser un no-op.

---

## 7. Scoring de Salud de la Base de Datos Actual

| Criterio | Puntuación (0-10) | Nota |
|----------|--------------------|-------|
| Idempotencia | 7/10 | La mayoría de comandos usan IF NOT EXISTS, pero datos UPDATE no son idempotentes |
| Ausencia de duplicados | 4/10 | 6+ funciones duplicadas, índices, policies |
| Separación estructura/datos | 5/10 | Seeds mezclados con estructura en 4 migraciones |
| Cohesión vertical | 3/10 | `core.expediente` repartido en 3 archivos |
| Ausencia de dispersión | 6/10 | Commercial bien encapsulado, pero core disperso |
| **Total (promedio)** | **5.0/10** | **Necesita reconstrucción** |

---

*Documento generado por auditoría automatizada el 2026-07-16.*  
*Próximo paso: Ejecutar CF-001 y proceder con reconstrucción previa aprobación.*