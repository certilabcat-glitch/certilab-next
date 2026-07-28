# Auditoría Completa de Migraciones — `supabase/migrations_v2/`

> **Fecha:** 2026-07-16  
> **Objetivo:** Auditoría exhaustiva de las 11 migraciones existentes para su reorganización en 4 bloques fundamentales.  
> **NO modificar archivos — solo informe.**

---

## 1. Inventario Cronológico Completo

| # | Archivo | Fecha |
|---|---------|-------|
| M01 | `20260702_00001_create_expedientes.sql` | 2026-07-02 |
| M02 | `20260703_00001_create_schema_core.sql` | 2026-07-03 |
| M03 | `20260706_00001_refactor_cliente_mvp.sql` | 2026-07-06 |
| M04 | `20260706_00002_create_inmueble.sql` | 2026-07-06 |
| M05 | `20260707_00001_update_expedientes.sql` | 2026-07-07 |
| M06 | `20260708_00001_create_core_expediente.sql` | 2026-07-08 |
| M07 | `20260709_00001_create_core_documento.sql` | 2026-07-09 |
| M08 | `20260710_00001_add_diagnostico_to_expediente.sql` | 2026-07-10 |
| M09 | `20260710_00001_create_storage_expediente.sql` | 2026-07-10 |
| M10 | `20260711_00001_add_dictamen.sql` | 2026-07-11 |
| M11 | `20260712_00001_create_schema_commercial.sql` | 2026-07-12 |

---

## 2. Qué Crea Cada Migración

### M01 — `20260702_00001_create_expedientes.sql` (MVP original)

| Elemento | Nombre | Schema |
|----------|--------|--------|
| Enum | `estado_expediente` | `public` |
| Tabla | `expedientes` | `public` |
| Índice | `idx_expedientes_cliente_id` | `public` |
| Índice | `idx_expedientes_estado` | `public` |
| RLS | `Clientes pueden ver sus propios expedientes` | `public.expedientes` |
| RLS | `Clientes pueden crear sus propios expedientes` | `public.expedientes` |
| RLS | `Clientes pueden actualizar sus propios expedientes` | `public.expedientes` |
| Función | `update_updated_at_column()` | `public` |
| Trigger | `update_expedientes_updated_at` | `public.expedientes` |

### M02 — `20260703_00001_create_schema_core.sql` (Foundation)

| Elemento | Nombre | Schema |
|----------|--------|--------|
| Schema | `core` | — |
| Función | `core.uuid_generate_v7()` | `core` |
| Enum | `core.origen_cliente` | `core` |
| Tabla | `core.cliente` | `core` |
| Índice | `uq_cliente_email` | `core` |
| Índice | `idx_cliente_usuario_id` | `core` |
| Índice | `idx_cliente_email` | `core` |
| Índice | `idx_cliente_nombre` | `core` |
| Índice | `idx_cliente_created_at` | `core` |
| Índice | `idx_cliente_anonymized_at` | `core` |
| RLS | `Usuarios ven clientes` | `core.cliente` |
| RLS | `Usuarios pueden crear clientes` | `core.cliente` |
| RLS | `Usuarios pueden actualizar clientes` | `core.cliente` |
| RLS | `Solo servicio puede hard-delete` | `core.cliente` |
| RLS | `Service role acceso completo` | `core.cliente` |
| Función | `core.update_updated_at_column()` | `core` |
| Función | `core.increment_version()` | `core` |
| Trigger | `trg_cliente_updated_at` | `core.cliente` |
| Trigger | `trg_cliente_version` | `core.cliente` |
| Seed | 1 cliente demo | `core.cliente` |
| Check | `chk_cliente_contacto_requerido` | `core.cliente` |
| Check | `chk_cliente_retention_days` | `core.cliente` |
| Check | `chk_cliente_version` | `core.cliente` |

### M03 — `20260706_00001_refactor_cliente_mvp.sql` (Parche)

| Elemento | Acción |
|----------|--------|
| DROP | 5 RLS policies existentes en `core.cliente` |
| DROP | 2 índices (`uq_cliente_email_empresa`, `idx_cliente_empresa_id`) |
| DROP COLUMN | `empresa_id` de `core.cliente` |
| CREATE | 5 RLS policies nuevas (nombres distintos) |
| CREATE | 6 índices (algunos ya existían) |
| UPDATE | Seed data de demo cliente |
| COMMENT | Varios COMMENTS de preparación multitenant |

### M04 — `20260706_00002_create_inmueble.sql` (Inmueble)

| Elemento | Nombre | Schema |
|----------|--------|--------|
| Enum | `core.tipo_inmueble` | `core` |
| Enum | `core.tipo_edificio` | `core` |
| Enum | `core.uso_inmueble` | `core` |
| Enum | `core.orientacion` | `core` |
| Enum | `core.zona_climatica_cte` | `core` |
| Enum | `core.zona_climatica_verano` | `core` |
| Tabla | `core.inmueble` | `core` |
| Índices | 9 (ver detalle en el archivo) | `core` |
| RLS | 5 policies | `core.inmueble` |
| Función | `core.trigger_set_updated_at()` | `core` |
| Trigger | `trg_inmueble_set_updated_at` | `core.inmueble` |
| Seed | 1 inmueble demo | `core.inmueble` |

### M05 — `20260707_00001_update_expedientes.sql` (Parche a MVP)

| Elemento | Acción |
|----------|--------|
| ALTER TABLE | Añade 6 columnas a `public.expedientes` (inmueble_id, created_by, updated_by, deleted_at, deleted_by, version) |
| CREATE FUNCTION | Redefine `core.trigger_set_updated_at()` |
| DROP POLICY | 3 policies existentes en `public.expedientes` |
| CREATE POLICY | 5 policies nuevas en `public.expedientes` |
| DROP TRIGGER | `update_expedientes_updated_at` |
| CREATE TRIGGER | `trg_expedientes_set_updated_at` |
| UPDATE | Seed data (created_by, updated_by) |

### M06 — `20260708_00001_create_core_expediente.sql` (Core Expediente)

| Elemento | Nombre | Schema |
|----------|--------|--------|
| Tabla | `core.expediente` | `core` |
| Índices | 5 | `core` |
| RLS | 5 policies | `core.expediente` |
| Función | `core.increment_version_expediente()` | `core` |
| Trigger | `trg_expediente_set_updated_at` | `core.expediente` |
| Trigger | `trg_expediente_version` | `core.expediente` |
| Data | Migra datos desde `public.expedientes` | — |
| Seed | 1 expediente demo | `core.expediente` |

### M07 — `20260709_00001_create_core_documento.sql` (Documento IA)

| Elemento | Nombre | Schema |
|----------|--------|--------|
| Enum | `core.tipo_documento` | `core` |
| Enum | `core.estado_procesamiento_ia` | `core` |
| Tabla | `core.documento` | `core` |
| Índices | 6 | `core` |
| RLS | 5 policies | `core.documento` |
| Trigger | `trg_documento_set_updated_at` | `core.documento` |
| Seed | 1 documento demo | `core.documento` |

### M08 — `20260710_00001_add_diagnostico_to_expediente.sql` (Diagnóstico)

| Elemento | Nombre |
|----------|--------|
| ALTER TABLE | ADD COLUMN `diagnostico` JSONB en `core.expediente` |
| ALTER TABLE | ADD COLUMN `diagnostico_version` INTEGER en `core.expediente` |
| ALTER TABLE | ADD COLUMN `estado_diagnostico` TEXT en `core.expediente` |
| Check | `ck_expediente_diagnostico_is_object` |
| Check | `ck_expediente_estado_diagnostico` |
| Check | `ck_expediente_diagnostico_version` |

### M09 — `20260710_00001_create_storage_expediente.sql` (Storage)

| Elemento | Nombre |
|----------|--------|
| Bucket | `expediente-docs` en `storage.buckets` |
| RLS | `Usuarios pueden subir documentos a sus expedientes` en `storage.objects` |
| RLS | `Usuarios pueden leer documentos de sus expedientes` en `storage.objects` |
| RLS | `Usuarios pueden eliminar documentos de sus expedientes` en `storage.objects` |
| REVOKE | `ALL ON storage.objects FROM anon` |

### M10 — `20260711_00001_add_dictamen.sql` (Dictamen)

| Elemento | Nombre |
|----------|--------|
| ALTER TABLE | ADD COLUMN `dictamen` JSONB en `core.expediente` |
| Índice | `idx_expediente_dictamen_emitido` |

### M11 — `20260712_00001_create_schema_commercial.sql` (Commercial)

| Elemento | Nombre | Schema |
|----------|--------|--------|
| Schema | `commercial` | — |
| Función | `commercial.uuid_generate_v7()` | `commercial` |
| Tabla | `commercial.customer` | `commercial` |
| Tabla | `commercial.order` | `commercial` |
| Tabla | `commercial.payment` | `commercial` |
| Tabla | `commercial.contract` | `commercial` |
| Tabla | `commercial.contract_document` | `commercial` |
| Tabla | `commercial.audit_trail` | `commercial` |
| Índices | 16 (todas las tablas) | `commercial` |
| RLS | ~20 policies (5 por tabla) | `commercial.*` |
| Función | `commercial.update_updated_at_column()` | `commercial` |
| Función | `commercial.increment_version()` | `commercial` |
| Triggers | 7 | `commercial.*` |

---

## 3. Problemas Detectados

### 3.1 DUPLICADOS

#### 🔴 Función UUID v7 duplicada
```
core.uuid_generate_v7()      ← M02 (20260703)
commercial.uuid_generate_v7() ← M11 (20260712) — IDÉNTICA
```
**Impacto:** Código duplicado. La función es genérica y debería estar en `core` y ser reutilizada.

#### 🔴 Función `update_updated_at_column` duplicada
```
core.update_updated_at_column()        ← M02
commercial.update_updated_at_column()  ← M11 — IDÉNTICA
```
**Impacto:** Dos funciones que hacen exactamente lo mismo. La de `commercial` es redundante.

#### 🔴 Función `increment_version` duplicada
```
core.increment_version()        ← M02
commercial.increment_version()  ← M11 — IDÉNTICA
```
**Impacto:** Las tablas comerciales deberían reutilizar `core.increment_version()`.

#### 🟡 Función `trigger_set_updated_at` redefinida
```
Definida en M04 (core.trigger_set_updated_at)
Redefinida en M05 (CREATE OR REPLACE)
```
**Impacto:** Redefinición innecesaria. `CREATE OR REPLACE` no rompe nada pero es redundante.

#### 🟡 Índice `uq_cliente_email` duplicado
```
Creado en M02
Dropeado y recreado en M03
```
**Impacto:** El índice se elimina y recrea en el parche porque el nombre original cambió. Podría haberse alterado in situ.

#### 🟡 RLS Policies — nombres duplicados / renombrados
| M02 (original) | M03 (reemplazo) |
|---|---|
| `Usuarios ven clientes` | `Usuarios pueden ver sus clientes` |
| `Usuarios pueden crear clientes` | `Usuarios pueden crear clientes` *(idéntico)* |
| `Usuarios pueden actualizar clientes` | `Usuarios pueden actualizar sus clientes` |
| `Solo servicio puede hard-delete` | `Solo servicio puede hard-delete` *(idéntico)* |
| `Service role acceso completo` | `Service role acceso completo` *(idéntico)* |

**Impacto:** Las policies originales se dropean y recrean con nombres casi idénticos. Las policies nuevas son funcionalmente equivalentes pero con nombres ligeramente distintos. Ruido innecesario.

### 3.2 DEPENDENCIAS ENTRE MIGRACIONES

```mermaid
M01 (public.expedientes) ──→ M05 (ALTER TABLE) ──→ M06 (migra datos desde)
        │
M02 (core.cliente, uuid_generate_v7) ──→ M03 (parche cliente)
        │
        ├──→ M04 (core.inmueble → FK a core.cliente)
        │         │
        │         └──→ M05 (usa core.trigger_set_updated_at)
        │
        ├──→ M06 (core.expediente → usa uuid_generate_v7, trigger_set_updated_at)
        │         │
        │         ├──→ M07 (core.documento → FK a core.expediente)
        │         ├──→ M08 (ALTER TABLE core.expediente)
        │         ├──→ M09 (storage → RLS referencias core.expediente)
        │         └──→ M10 (ALTER TABLE core.expediente)
        │
M11 (commercial.*) → independiente, no depende de migraciones anteriores
```

**Dependencias circulares:** ❌ **No se detectan.**

### 3.3 MIGRACIONES QUE MODIFICAN TABLAS ANTERIORES

| Migración | Modifica | Creada en |
|-----------|----------|-----------|
| **M03** | `core.cliente` (DROP empresa_id, DROP índices) | M02 |
| **M05** | `public.expedientes` (ADD 6 columnas) | M01 |
| **M08** | `core.expediente` (ADD diagnostico JSONB) | M06 |
| **M10** | `core.expediente` (ADD dictamen JSONB) | M06 |

### 3.4 POLICIES DUPLICADAS

#### 🟡 RLS en `core.expediente` superpuestas con `public.expedientes`
- M05 crea 5 policies en `public.expedientes` (tabla legacy)
- M06 crea 5 policies en `core.expediente` (nueva tabla)
- Ambas hacen lo mismo pero sobre tablas distintas. Correcto como fase de migración, pero genera ruido.

#### 🟡 RLS en storage con lógica casi idéntica
- M09 tiene 3 policies en `storage.objects` con la misma subquery de verificación, solo cambia la operación (INSERT/SELECT/DELETE).

### 3.5 TRIGGERS DUPLICADOS / INCONSISTENTES

#### 🟡 Dos funciones de trigger para `updated_at` en el mismo schema `core`
```
core.update_updated_at_column()   ← usada por trg_cliente_updated_at
core.trigger_set_updated_at()     ← usada por trg_inmueble_*, trg_expediente_*, trg_documento_*
```
**Impacto:** Hacen exactamente lo mismo. Una debería eliminarse.

#### 🟡 Nomenclatura inconsistente de triggers
| Trigger | Migración | Patrón |
|---------|-----------|--------|
| `trg_cliente_updated_at` | M02 | `{tabla}_updated_at` |
| `trg_inmueble_set_updated_at` | M04 | `{tabla}_set_updated_at` |
| `trg_expedientes_set_updated_at` | M05 | `{tabla}_set_updated_at` |
| `trg_expediente_set_updated_at` | M06 | `{tabla}_set_updated_at` |
| `trg_documento_set_updated_at` | M07 | `{tabla}_set_updated_at` |

**Impacto:** `cliente` usa un patrón de nomenclatura distinto al resto.

### 3.6 FUNCIONES DUPLICADAS

| Función | Creada en | Duplicada en |
|---------|-----------|--------------|
| `core.uuid_generate_v7()` | M02 | M11 (`commercial.uuid_generate_v7()`) |
| `core.update_updated_at_column()` | M02 | M11 (`commercial.update_updated_at_column()`) |
| `core.increment_version()` | M02 | M11 (`commercial.increment_version()`) |
| `core.trigger_set_updated_at()` | M04 | M05 (CREATE OR REPLACE) |

### 3.7 ENUMS REPETIDOS

Ningún enum aparece definido dos veces. Todos los `CREATE TYPE` usan `DO $$ ... EXCEPTION WHEN duplicate_object THEN NULL; END $$`, lo que los hace idempotentes. ✅

### 3.8 SEEDS MEZCLADOS CON ESTRUCTURA

| Migración | Seed | Problema |
|-----------|------|----------|
| M02 | 1 cliente demo (`core.uuid_generate_v7()` genera UUID nuevo cada vez) | 🟡 **No idempotente** — cada re-ejecución insertaría un registro nuevo con UUID distinto |
| M04 | 1 inmueble demo (usa `ON CONFLICT DO NOTHING` por referencia catastral) | ✅ Idempotente |
| M06 | 1 expediente demo (usa `ON CONFLICT DO NOTHING` por número_expediente) | ✅ Idempotente |
| M07 | 1 documento demo (usa `ON CONFLICT DO NOTHING` por id fijo) | ✅ Idempotente |

**Problema en M02:** El seed del cliente demo usa `core.uuid_generate_v7()` para el ID y placeholders `00000000-0000-0000-0000-000000000000` para consent_id, created_by y updated_by. No tiene `ON CONFLICT DO NOTHING` en el INSERT real (tiene un `ON CONFLICT` genérico pero no hay unique constraint que lo active si el email ya existe — el unique index es parcial con `WHERE deleted_at IS NULL`, pero como el email es único, en la primera inserción funciona, en la segunda fallaría por el unique index salvo que el registro anterior esté deleted).

### 3.9 SQL NO IDEMPOTENTE

| Migración | Línea | Problema |
|-----------|-------|----------|
| **M02** | Seed INSERT | `core.uuid_generate_v7()` genera UUID nuevo cada vez. Si la migración se re-ejecuta, insertará un registro duplicado (aunque el unique index en email lo bloquearía) |
| **M03** | `UPDATE core.cliente SET usuario_id = ...` | Actualización sin verificar si ya se ejecutó. Es idempotente porque el WHERE evita re-ejecución, pero frágil |
| **M05** | `UPDATE expedientes SET created_by = ...` | Similar al anterior |
| **M06** | `INSERT INTO core.expediente ... SELECT FROM public.expedientes WHERE NOT EXISTS` | La migración en sí es idempotente, pero si hay nuevos registros en `public.expedientes` se migrarían de nuevo |

### 3.10 OTROS PROBLEMAS

#### 🔴 SQL ROTO en M07 (Documento)
El archivo `20260709_00001_create_core_documento.sql` contiene un **error de sintaxis SQL**: la política `"Usuarios pueden ver documentos de sus expedientes"` aparece DOS VECES — la primera ocurrencia está incompleta (le falta el `USING`):

```sql
-- Primera ocurrencia (ROTA — falta el USING completo)
CREATE POLICY "Usuarios pueden ver documentos de sus expedientes"
-- Segunda ocurrencia (correcta)
CREATE POLICY "Usuarios pueden ver documentos de sus expedientes"
  ON core.documento
  FOR SELECT
  TO authenticated
  USING (...)
```

**Impacto:** Esta migración **no se puede ejecutar** tal cual. La primera policy rota causará un error de sintaxis.

#### 🟡 Enum `estado_expediente` en schema `public` referenciado desde `core.expediente`
La tabla `core.expediente` (M06) usa el tipo `estado_expediente` que fue creado en `public` (M01). Esto crea una dependencia inter-schema que debería eliminarse creando el enum en `core`.

#### 🟡 Migración 006 y 007 con orden numérico invertido
- `20260709_00001_create_core_documento.sql` = día 09 → debería ser migración 006
- `20260710_00001_add_diagnostico_to_expediente.sql` = día 10 → debería ser migración 007

Los comentarios internos dicen "Migration: 007" y "Migration: 006" respectivamente, confirmando la inversión.

---

## 4. Propuesta de Reorganización

### 4.1 Estrategia

Reorganizar las 11 migraciones actuales en **4 migraciones secuenciales** siguiendo el principio de **una dirección, sin retrocesos**:

1. **Foundation** — Schemas, funciones base, enums, core.cliente, constraints, RLS. Sin seeds.
2. **Storage** — Bucket, policies de storage.
3. **Dictamen** — core.inmueble, core.expediente, core.documento, columnas JSONB (diagnóstico, dictamen). Toda la lógica técnica.
4. **Commercial** — Schema commercial, tablas, RLS, triggers. Reutilizando funciones de core.

### 4.2 Mapa de Reorganización

```
MIGRACIÓN 1: FOUNDATION
  ├── Schema: core
  ├── Función: core.uuid_generate_v7()
  ├── Enums: core.origen_cliente
  ├── Tabla: core.cliente + constraints + índices
  ├── Función: core.update_updated_at_column()  ← ÚNICA función de trigger
  ├── Función: core.increment_version()
  ├── Trigger: trg_cliente_updated_at
  ├── Trigger: trg_cliente_version
  └── RLS: core.cliente (5 policies)

MIGRACIÓN 2: STORAGE
  ├── Bucket: expediente-docs
  └── RLS: storage.objects (3 policies)

MIGRACIÓN 3: DICTAMEN (todo el dominio técnico)
  ├── Enums: core.tipo_inmueble, core.tipo_edificio, core.uso_inmueble,
  │          core.orientacion, core.zona_climatica_cte, core.zona_climatica_verano,
  │          core.tipo_documento, core.estado_procesamiento_ia,
  │          core.estado_expediente (movido desde public)
  ├── Tabla: core.inmueble + FK a core.cliente + índices + RLS
  ├── Tabla: core.expediente + FK a core.cliente + índices + RLS
  │         └── Columnas: diagnostico JSONB, dictamen JSONB, estado_diagnostico
  ├── Tabla: core.documento + FK a core.expediente + índices + RLS
  ├── Trigger: trg_inmueble_set_updated_at
  ├── Trigger: trg_expediente_set_updated_at
  ├── Trigger: trg_expediente_version
  ├── Trigger: trg_documento_set_updated_at
  └── Función: core.increment_version_expediente()

MIGRACIÓN 4: COMMERCIAL
  ├── Schema: commercial
  ├── Tablas: customer, order, payment, contract, contract_document, audit_trail
  ├── Índices: 16
  ├── RLS: ~20 policies
  ├── Triggers: 7 (usando core.update_updated_at_column y core.increment_version)
  └── NOTA: NO crear commercial.uuid_generate_v7() — reutilizar core
```

### 4.3 Cambios Específicos Necesarios

| Actual | Problema | Solución |
|--------|----------|----------|
| `commercial.uuid_generate_v7()` | Duplicada | Eliminar; usar `core.uuid_generate_v7()` |
| `commercial.update_updated_at_column()` | Duplicada | Eliminar; usar `core.update_updated_at_column()` |
| `commercial.increment_version()` | Duplicada | Eliminar; usar `core.increment_version()` |
| `core.update_updated_at_column()` + `core.trigger_set_updated_at()` | Redundantes | Unificar en `core.update_updated_at_column()` |
| `estado_expediente` en `public` | Cross-schema | Mover a `core.estado_expediente` |
| M09 storage policies con subquery frágil (`regexp_replace`) | Frágil | Simplificar o documentar limitación |
| M07 RLS duplicada (policy rota) | SQL inválido | Eliminar la ocurrencia duplicada |
| Seeds mezclados con estructura | Contaminación | Extraer todos los seeds a migración separada opcional o eliminarlos |
| M03 (parche empresa_id) | Refactor innecesario | Incorporar la versión final directamente en Foundation |
| M05 (parche public.expedientes) | Legacy | No incluir en migraciones nuevas — public.expedientes se elimina |
| M10 (ADD dictamen) | Separada | Fusionar con la creación de core.expediente en Dictamen |

### 4.4 Orden de Aplicación Propuesto

```
01_foundation.sql     → Crea core schema, funciones, core.cliente
02_storage.sql        → Crea bucket y políticas de storage
03_dictamen.sql       → Crea inmueble, expediente, documento (dominio técnico)
04_commercial.sql     → Crea commercial schema y tablas comerciales
```

### 4.5 Seeds

Los seeds de demo deben **eliminarse** de las migraciones estructurales y moverse a un script separado:

```
supabase/seed.sql     → Datos de demostración (opcional, no ejecutar en producción)
```

Esto mantiene las migraciones limpias y los datos de prueba separados de la estructura.

---

## 5. Resumen de Hallazgos

| Categoría | Severidad | Cantidad |
|-----------|-----------|----------|
| 🔴 SQL roto (M07 policy duplicada) | **Crítico** | 1 |
| 🟡 Funciones duplicadas (uuid, updated_at, increment_version) | Alto | 3 |
| 🟡 Función de trigger redundante en core | Medio | 1 |
| 🟡 Seeds no idempotentes mezclados con estructura | Medio | 1 (M02) |
| 🟡 Enum en schema incorrecto (public vs core) | Medio | 1 |
| 🟡 Nomenclatura inconsistente de triggers | Bajo | 5 |
| 🟡 Índices dropeados y recreados innecesariamente | Bajo | 2 |
| 🟡 Policy names inconsistentes entre M02 y M03 | Bajo | 5 |
| 🟡 Migración 006/007 con orden numérico invertido | Bajo | 1 |

---

## 6. Conclusión

Las 11 migraciones actuales contienen **1 error crítico** (SQL inválido en M07 que impide su ejecución), **múltiples duplicaciones de funciones** que deberían centralizarse en `core`, y **seeds mezclados con estructura** que comprometen la idempotencia.

La reorganización propuesta en 4 migraciones elimina todas las duplicaciones, corrige el SQL roto, centraliza las funciones compartidas, mueve los enums a su schema correcto, y extrae los seeds a un archivo independiente. El resultado sería un conjunto de migraciones limpias, idempotentes y con dependencias unidireccionales claras.

No se requieren cambios arquitectónicos — solo consolidación y limpieza del conjunto existente.