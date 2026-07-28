# Auditoría Completa de Migraciones — `supabase/migrations_v2/`

> **Fecha:** 2026-07-16  
> **Propósito:** Auditoría exhaustiva de las 11 migraciones existentes para planificar su reorganización en solo 4 migraciones.  
> **Regla:** NO se modificará ningún archivo. Solo informe.

---

## 1. Inventario Completo en Orden Cronológico

La carpeta `supabase/migrations/` está vacía. Todas las migraciones residen en `supabase/migrations_v2/`.

| # | Archivo | Fecha | Tamaño | Líneas |
|---|---------|-------|--------|--------|
| 1 | `20260702_00001_create_expedientes.sql` | 2026-07-02 | 2,456 B | ~70 |
| 2 | `20260703_00001_create_schema_core.sql` | 2026-07-03 | 9,977 B | ~330 |
| 3 | `20260706_00001_refactor_cliente_mvp.sql` | 2026-07-15 | 6,389 B | ~195 |
| 4 | `20260706_00002_create_inmueble.sql` | 2026-07-15 | 12,141 B | ~390 |
| 5 | `20260707_00001_update_expedientes.sql` | 2026-07-04 | 6,774 B | ~195 |
| 6 | `20260708_00001_create_core_expediente.sql` | 2026-07-15 | 11,234 B | ~325 |
| 7 | `20260709_00001_create_core_documento.sql` | 2026-07-15 | 10,146 B | ~310 |
| 8 | `20260710_00001_add_diagnostico_to_expediente.sql` | 2026-07-08 | 4,586 B | ~92 |
| 9 | `20260710_00001_create_storage_expediente.sql` | 2026-07-04 | 2,824 B | ~80 |
| 10 | `20260711_00001_add_dictamen.sql` | 2026-07-09 | 1,239 B | ~25 |
| 11 | `20260712_00001_create_schema_commercial.sql` | 2026-07-12 | 23,290 B | ~685 |

**Total: 11 archivos, ~91 KB, ~2,597 líneas de SQL.**

---

## 2. Qué Crea Cada Migración

### Migración 1: `20260702_00001_create_expedientes.sql`

| Categoría | Detalle |
|-----------|---------|
| **Schema** | `public` (implícito, por defecto) |
| **Enums** | `estado_expediente` (`Borrador`, `Activo`, `Completado`, `Archivado`, `Cancelado`) |
| **Tablas** | `public.expedientes` (14 columnas: `id UUID PK DEFAULT gen_random_uuid()`, `numero_expediente TEXT`, `cliente_id UUID`, `direccion_inmueble TEXT`, `tipo_inmueble TEXT`, `municipio TEXT`, `codigo_postal TEXT`, `estado estado_expediente DEFAULT 'Borrador'`, `created_at TIMESTAMPTZ DEFAULT now()`, `updated_at TIMESTAMPTZ DEFAULT now()`, `created_by UUID`, `deleted_at TIMESTAMPTZ`, `metadata JSONB DEFAULT '{}'`, `version INTEGER DEFAULT 1`) |
| **Índices** | `idx_expedientes_cliente_id`, `idx_expedientes_estado`, `idx_expedientes_created_at`, `idx_expedientes_municipio`, `idx_expedientes_deleted_at` |
| **Triggers** | `trigger_set_updated_at_expedientes` (BEFORE UPDATE ON public.expedientes, ejecuta `set_updated_at_column()`) |
| **Funciones** | — (usa `set_updated_at_column()` de otra migración?) |
| **RLS** | 2 políticas: `expedientes_select_policy` (SELECT usando `auth.uid()`), `expedientes_insert_policy` (INSERT) |
| **Storage** | — |
| **Seeds** | — |

### Migración 2: `20260703_00001_create_schema_core.sql`

| Categoría | Detalle |
|-----------|---------|
| **Schema** | `core` |
| **Enums** | — |
| **Tablas** | `core.uuid_generate_v7()` (función, no tabla). `core.inmueble` (pre-creada o borrador inicial), `core.cliente` (pre-creada o borrador inicial) |
| **Funciones** | `core.uuid_generate_v7()` (UUID v7 time-ordered), `core.set_updated_at_column()`, `core.increment_version()` |
| **Triggers** | — |
| **RLS** | — (solo schema creation) |
| **Extensiones** | Habilita `pgcrypto` IF NOT EXISTS |
| **Notas** | Esta migración se solapa funcionalmente con las migraciones 3 y 4 que crean cliente e inmueble más completos |

### Migración 3: `20260706_00001_refactor_cliente_mvp.sql`

| Categoría | Detalle |
|-----------|---------|
| **Schema** | `core` |
| **Enums** | — |
| **Tablas** | `core.cliente` (columnas: `id UUID PK`, `user_id UUID UNIQUE REFERENCES auth.users(id)`, `nombre TEXT`, `apellidos TEXT`, `email TEXT`, `telefono TEXT`, `nif TEXT`, `direccion TEXT`, `poblacion TEXT`, `codigo_postal TEXT`, `provincia TEXT`, `pais TEXT DEFAULT 'España'`, `tipo_persona TEXT CHECK`, `created_at`, `updated_at`, `deleted_at`, `version INTEGER DEFAULT 1`) |
| **Índices** | `idx_cliente_user_id`, `idx_cliente_email`, `idx_cliente_nif`, `idx_cliente_deleted_at` |
| **Triggers** | `trigger_set_updated_at_cliente`, `trigger_increment_version_cliente` |
| **Funciones** | Reutiliza `core.uuid_generate_v7()`, `core.set_updated_at_column()`, `core.increment_version()` (de migración 2) |
| **RLS** | 2 políticas: `cliente_select_policy`, `cliente_insert_policy` |
| **Storage** | — |
| **Seeds** | — |

### Migración 4: `20260706_00002_create_inmueble.sql`

| Categoría | Detalle |
|-----------|---------|
| **Schema** | `core` |
| **Enums** | `tipo_inmueble` (`Vivienda`, `LocalComercial`, `Oficina`, `NaveIndustrial`, `EdificioCompleto`, `Otro`), `estado_inmueble` (`Activo`, `Inactivo`, `Pendiente`) |
| **Tablas** | `core.inmueble` (24 columnas: `id UUID PK`, `cliente_id UUID NOT NULL REFERENCES core.cliente(id)`, `referencia_catastral TEXT`, `direccion TEXT NOT NULL`, `localidad TEXT`, `codigo_postal TEXT`, `provincia TEXT`, `tipo tipo_inmueble`, `anyo_construccion INTEGER`, `superficie NUMERIC`, `estado estado_inmueble DEFAULT 'Activo'`, `coordenadas JSONB`, `created_at`, `updated_at`, `deleted_at`, `version INTEGER DEFAULT 1`, + otras columnas técnicas) |
| **Índices** | `idx_inmueble_cliente_id`, `idx_inmueble_ref_catastral`, `idx_inmueble_direccion`, `idx_inmueble_deleted_at` |
| **Triggers** | `trigger_set_updated_at_inmueble`, `trigger_increment_version_inmueble` |
| **Funciones** | Reutiliza funciones de migración 2 |
| **RLS** | 2 políticas: `inmueble_select_policy`, `inmueble_insert_policy` |
| **Storage** | — |
| **Seeds** | — |

### Migración 5: `20260707_00001_update_expedientes.sql`

| Categoría | Detalle |
|-----------|---------|
| **Schema** | `public` |
| **Enums** | — |
| **Tablas** | MODIFICA `public.expedientes`: añade `deleted_at`, `version`, cambia `created_at`/`updated_at` a `TIMESTAMPTZ` |
| **Funciones** | — |
| **Triggers** | Desactiva y recrea `trigger_set_updated_at_expedientes` |
| **RLS** | Desactiva y recrea políticas de `public.expedientes` |
| **Notas** | **Migración correctiva.** Añade columnas que faltaban en la migración 1. Demuestra que la migración 1 estaba incompleta. |

### Migración 6: `20260708_00001_create_core_expediente.sql`

| Categoría | Detalle |
|-----------|---------|
| **Schema** | `core` |
| **Enums** | `estado_core_expediente` (valores específicos core) |
| **Tablas** | `core.expediente` (18 columnas: `id UUID PK DEFAULT core.uuid_generate_v7()`, `numero_expediente TEXT NOT NULL`, `cliente_id UUID NOT NULL` (SIN FK explícito en Fase A), `inmueble_id UUID`, `estado TEXT NOT NULL DEFAULT 'Borrador'`, `diagnostico JSONB`, `diagnostico_version INTEGER`, `estado_diagnostico TEXT`, `dictamen JSONB`, `metadata JSONB DEFAULT '{}'`, `created_at`, `updated_at`, `deleted_at`, `version INTEGER DEFAULT 1`, más columnas de auditoría) |
| **Índices** | `idx_core_expediente_cliente_id`, `idx_core_expediente_numero`, `idx_core_expediente_estado`, `idx_core_expediente_deleted_at` |
| **Triggers** | `trigger_set_updated_at_core_expediente`, `trigger_increment_version_core_expediente` |
| **Funciones** | — |
| **RLS** | 3 políticas |
| **Storage** | — |
| **Seeds** | Migra datos desde `public.expedientes` hacia `core.expediente` con INSERT...SELECT |

### Migración 7: `20260709_00001_create_core_documento.sql`

| Categoría | Detalle |
|-----------|---------|
| **Schema** | `core` |
| **Enums** | `tipo_documento` (`CertificadoOriginal`, `InformeIA`, `DocumentacionComplementaria`, `GeneradoPorSistema`), `estado_documento` (`Pendiente`, `EnProceso`, `Completado`, `Error`) |
| **Tablas** | `core.documento` (16 columnas: `id UUID PK`, `expediente_id UUID NOT NULL REFERENCES core.expediente(id)`, `tipo tipo_documento NOT NULL`, `estado estado_documento DEFAULT 'Pendiente'`, `nombre_original TEXT`, `ruta_storage TEXT`, `tamano_bytes BIGINT`, `mime_type TEXT`, `metadata JSONB DEFAULT '{}'`, `created_at`, `updated_at`, `deleted_at`, `version INTEGER DEFAULT 1` + columnas de control) |
| **Índices** | `idx_documento_expediente_id`, `idx_documento_tipo`, `idx_documento_estado`, `idx_documento_deleted_at` |
| **Triggers** | `trigger_set_updated_at_documento`, `trigger_increment_version_documento` |
| **Funciones** | — |
| **RLS** | 2 políticas |
| **Storage** | — |
| **Seeds** | — |

### Migración 8: `20260710_00001_add_diagnostico_to_expediente.sql`

| Categoría | Detalle |
|-----------|---------|
| **Schema** | `core` |
| **Enums** | — |
| **Tablas** | MODIFICA `core.expediente` (ALTER TABLE ADD COLUMN): `diagnostico JSONB`, `diagnostico_version INTEGER NOT NULL DEFAULT 1`, `estado_diagnostico TEXT NOT NULL DEFAULT 'SinDiagnostico'` |
| **Funciones** | — |
| **Notas** | **Migración parche.** Añade columnas de diagnóstico que ya deberían haber estado en la migración 6. |

### Migración 9: `20260710_00001_create_storage_expediente.sql`

| Categoría | Detalle |
|-----------|---------|
| **Schema** | `storage` (buckets) |
| **Storage** | Crea bucket `expediente-docs` (privado, 20 MB, tipos MIME: PDF, JPG, PNG, WebP) |
| **RLS** | 4 políticas de storage: SELECT, INSERT, UPDATE, DELETE (basadas en `auth.uid()` y `bucket_id`) |
| **Notas** | Esta migración es independiente y autocontenida. |

### Migración 10: `20260711_00001_add_dictamen.sql`

| Categoría | Detalle |
|-----------|---------|
| **Schema** | `core` |
| **Enums** | — |
| **Tablas** | MODIFICA `core.expediente` (ALTER TABLE ADD COLUMN): `dictamen JSONB` |
| **Funciones** | — |
| **Notas** | **Migración parche.** Añade columna que ya debería haber estado en migración 6 o 8. Solo 25 líneas. |

### Migración 11: `20260712_00001_create_schema_commercial.sql`

| Categoría | Detalle |
|-----------|---------|
| **Schema** | `commercial` |
| **Enums** | — (usa CHECK constraints en TEXT en lugar de enums) |
| **Tablas** | 6 tablas: `commercial.customer`, `commercial.order`, `commercial.payment`, `commercial.contract`, `commercial.contract_document`, `commercial.audit_trail` |
| **Funciones** | `commercial.uuid_generate_v7()`, `commercial.update_updated_at_column()`, `commercial.increment_version()` |
| **Índices** | 5 índices únicos parciales + 14 índices de rendimiento |
| **Triggers** | 7 triggers (5 para `updated_at`, 2 para `version`) |
| **RLS** | 17 políticas distribuidas en las 6 tablas |
| **Storage** | — |
| **Seeds** | — |
| **Notas** | **Migración más grande.** 685 líneas, autocontenida. No depende de `core` ni `public`. |

---

## 3. Resumen Consolidado

| Categoría | Total |
|-----------|-------|
| **Schemas** | 3 (`public`, `core`, `commercial`, `storage.buckets`) |
| **Enums** | 5 (`estado_expediente`, `tipo_inmueble`, `estado_inmueble`, `tipo_documento`, `estado_documento`, `estado_core_expediente`) |
| **Tablas** | 10 (`public.expedientes`, `core.cliente`, `core.inmueble`, `core.expediente`, `core.documento`, `commercial.customer`, `commercial.order`, `commercial.payment`, `commercial.contract`, `commercial.contract_document`, `commercial.audit_trail`) |
| **Funciones** | 6 (~3 duplicadas: `uuid_generate_v7`, `set_updated_at_column`, `increment_version` existen tanto en `core` como en `commercial`) |
| **Triggers** | 11 (5 en core + 1 en public + 7 en commercial = 13, pero 2 están solapados) |
| **RLS Policies** | ~32 (2 public.expedientes + 2 core.cliente + 2 core.inmueble + 3 core.expediente + 2 core.documento + 4 storage + 17 commercial) |
| **Storage Buckets** | 1 (`expediente-docs`) |
| **Migraciones parche** | 3 (migraciones 5, 8, 10 — son ALTER TABLE que deberían haber sido CREATE) |

---

## 4. Anomalías Detectadas

### 4.1 Duplicados

| Tipo | Detalle | Archivos |
|------|---------|----------|
| **Función** | `uuid_generate_v7()` existe en `core` (migración 2) Y en `commercial` (migración 11) | `20260703_00001_create_schema_core.sql` y `20260712_00001_create_schema_commercial.sql` |
| **Función** | `set_updated_at_column()` / `update_updated_at_column()` existe en `core` y `commercial` con nombres diferentes pero misma lógica | Ídem |
| **Función** | `increment_version()` idéntica en `core` y `commercial` | Ídem |
| **Tabla** | `public.expedientes` (migración 1) y `core.expediente` (migración 6) representan la misma entidad | `20260702_00001` y `20260708_00001` |
| **Enum** | `estado_expediente` (public) y `estado_core_expediente` (core, TEXT CHECK) representan lo mismo con nombres diferentes | Ídem |

### 4.2 Dependencias Circulares

| Dependencia | Detalle |
|-------------|---------|
| Migración 3 → Migración 2 | `core.cliente` usa funciones de migración 2 |
| Migración 4 → Migración 3 | `core.inmueble` REFERENCES `core.cliente(id)` |
| Migración 6 → Migración 3,4 | `core.expediente` usa `cliente_id` y `inmueble_id` |
| Migración 7 → Migración 6 | `core.documento` REFERENCES `core.expediente(id)` |
| Migración 8 → Migración 6 | ALTER TABLE `core.expediente` |
| Migración 10 → Migración 6 | ALTER TABLE `core.expediente` |
| Migración 11 → ninguna | `commercial` es completamente autocontenida |

**No hay dependencias circulares reales**, pero sí una cadena lineal frágil donde alterar una migración temprana rompe todas las siguientes.

### 4.3 Migraciones que Modifican Tablas Anteriores (Parches)

| Migración | Modifica | Tipo de Cambio |
|-----------|----------|----------------|
| #5 `20260707_00001_update_expedientes.sql` | `public.expedientes` (migración #1) | Añade `deleted_at`, `version`, cambia tipos de columnas |
| #8 `20260710_00001_add_diagnostico_to_expediente.sql` | `core.expediente` (migración #6) | Añade `diagnostico JSONB`, `diagnostico_version`, `estado_diagnostico` |
| #10 `20260711_00001_add_dictamen.sql` | `core.expediente` (migración #6) | Añade `dictamen JSONB` |

**Impacto:** 3 de 11 migraciones (27%) son parches correctivos. Esto indica que las migraciones originales (#1 y #6) estaban incompletas.

### 4.4 Policies Duplicadas

| Patrón | Detalle |
|--------|---------|
| `expedientes_select_policy` vs políticas de `core.expediente` | `public.expedientes` tiene sus propias RLS, `core.expediente` tiene las suyas. Ambas coexisten. |
| Patrón de políticas de tabla | Prácticamente todas siguen el mismo patrón `{tabla}_select_policy`, `{tabla}_insert_policy` |
| Storage policies | Las 4 políticas de storage (`expediente-docs`) son independientes y no duplican otras |

### 4.5 Triggers Duplicados

| Trigger | Aparece en | Tabla |
|---------|-----------|-------|
| `trigger_set_updated_at_expedientes` | Migración #1 (crea) y #5 (recrea) | `public.expedientes` |
| `trigger_set_updated_at_cliente` | Migración #3 | `core.cliente` |
| `trigger_increment_version_cliente` | Migración #3 | `core.cliente` |
| `trigger_set_updated_at_inmueble` | Migración #4 | `core.inmueble` |
| `trigger_increment_version_inmueble` | Migración #4 | `core.inmueble` |
| `trigger_set_updated_at_core_expediente` | Migración #6 | `core.expediente` |
| `trigger_increment_version_core_expediente` | Migración #6 | `core.expediente` |
| `trigger_set_updated_at_documento` | Migración #7 | `core.documento` |
| `trigger_increment_version_documento` | Migración #7 | `core.documento` |
| 7 triggers en commercial | Migración #11 | Tablas commercial |

**Problema:** Los triggers siguen un patrón repetitivo. En la reorganización, deberían generarse con una función genérica reusable.

### 4.6 Funciones Duplicadas

| Función | core | commercial | Problema |
|---------|------|-----------|----------|
| `uuid_generate_v7()` | `core.uuid_generate_v7()` | `commercial.uuid_generate_v7()` | Misma lógica, diferentes schemas |
| `set_updated_at_column()` | `core.set_updated_at_column()` | `commercial.update_updated_at_column()` | Misma lógica, diferente nombre |
| `increment_version()` | `core.increment_version()` | `commercial.increment_version()` | Misma lógica, diferentes schemas |

**Propuesta:** Migrar a schema `_utils` compartido (V2) o simplemente crear las funciones en `public` o `core` y que `commercial` las referencie.

### 4.7 Enums Repetidos / Solapados

| Enum / Tipo | Creado en | También en | ¿Problema? |
|-------------|-----------|------------|------------|
| `estado_expediente` (public) | Migración #1 | `core.expediente` usa TEXT CHECK en lugar de enum | Sí. Inconsistencia de tipos |
| `tipo_inmueble` | Migración #4 | — | No duplicado |
| `estado_inmueble` | Migración #4 | — | No duplicado |
| `tipo_documento` | Migración #7 | — | No duplicado |
| `estado_documento` | Migración #7 | — | No duplicado |
| Estados en `commercial` | Migración #11 | TEXT CHECK, no enums | No duplicado pero estilo diferente |

### 4.8 Seeds Mezclados con Estructura

| Migración | Línea | Contenido Seed |
|-----------|-------|----------------|
| #6 `20260708_00001_create_core_expediente.sql` | ~250+ | `INSERT INTO core.expediente (...) SELECT ... FROM public.expedientes WHERE deleted_at IS NULL` |

**Problema:** La migración 6 mezcla DDL (CREATE TABLE) con DML (INSERT...SELECT de migración de datos). Esto rompe el principio de separación de responsabilidades. Los seeds/data migrations deberían ir en archivos separados.

### 4.9 SQL No Idempotente

| Migración | Problema |
|-----------|----------|
| #5 | `ALTER TABLE public.expedientes ADD COLUMN IF NOT EXISTS` — usa IF NOT EXISTS, OK |
| #8 | `ALTER TABLE core.expediente ADD COLUMN IF NOT EXISTS` — OK |
| #10 | `ALTER TABLE core.expediente ADD COLUMN dictamen JSONB` — **NO usa IF NOT EXISTS** |
| #5 | Recrea triggers sin DROP IF EXISTS previo |
| #6 | Crea enums sin IF NOT EXISTS |
| Storage | `INSERT INTO storage.buckets ... ON CONFLICT (id) DO NOTHING` — OK, es idempotente |
| #11 | Usa `CREATE SCHEMA IF NOT EXISTS`, `CREATE OR REPLACE FUNCTION` — OK |

**Riesgo:** Ejecutar la migración #10 dos veces lanza error porque `dictamen JSONB` ya existe.

---

## 5. Propuesta de Reorganización en 4 Migraciones

### Principios:

1. **Cada migración es atómica** — se aplica completa o no se aplica.
2. **Cada migración es idempotente** — puede ejecutarse N veces.
3. **DDL separado de DML** — estructura en migraciones, datos en seeds.
4. **Una función, un sitio** — sin duplicar funciones entre schemas.
5. **Sin parches** — cada tabla se crea completa desde el principio.

---

### Foundation (`000_foundation.sql`)

> **Propósito:** Schemas, funciones base, tablas del core de dominio.

**Contenido:**

```sql
-- =====================================================
-- MIGRACIÓN: 000_foundation.sql
-- Propósito: Fundación del sistema Certilab
-- Reemplaza: Migraciones 1, 2, 3, 4, 5, 6, 7, 8, 10
-- =====================================================

-- Esquemas
CREATE SCHEMA IF NOT EXISTS core;

-- Extensiones
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Funciones base (UNA VEZ, en core)
CREATE OR REPLACE FUNCTION core.uuid_generate_v7() RETURNS uuid ...
CREATE OR REPLACE FUNCTION core.set_updated_at_column() RETURNS trigger ...
CREATE OR REPLACE FUNCTION core.increment_version() RETURNS trigger ...

-- Enums globales
CREATE TYPE core.estado_expediente AS ENUM (...);
CREATE TYPE core.tipo_inmueble AS ENUM (...);
CREATE TYPE core.estado_inmueble AS ENUM (...);
CREATE TYPE core.tipo_documento AS ENUM (...);
CREATE TYPE core.estado_documento AS ENUM (...);

-- Tabla: core.cliente
CREATE TABLE core.cliente ( ... todas las columnas ... );

-- Tabla: core.inmueble
CREATE TABLE core.inmueble ( ... todas las columnas ... );

-- Tabla: core.expediente (COMPLETA: incluye diagnostico y dictamen)
CREATE TABLE core.expediente (
    ...,
    diagnostico JSONB,
    diagnostico_version INTEGER NOT NULL DEFAULT 1,
    estado_diagnostico TEXT NOT NULL DEFAULT 'SinDiagnostico',
    dictamen JSONB,
    ...
);

-- Tabla: core.documento
CREATE TABLE core.documento ( ... todas las columnas ... );

-- Índices
CREATE INDEX IF NOT EXISTS ... ;

-- Triggers
CREATE TRIGGER ... ;

-- RLS
ALTER TABLE core.cliente ENABLE ROW LEVEL SECURITY;
ALTER TABLE core.inmueble ENABLE ROW LEVEL SECURITY;
ALTER TABLE core.expediente ENABLE ROW LEVEL SECURITY;
ALTER TABLE core.documento ENABLE ROW LEVEL SECURITY;
-- Políticas específicas

-- NO incluye public.expedientes (se eliminará)
-- NO incluye seeds (van en archivo separado)
```

**Incluye** (de migraciones existentes):
- [x] Schema `core` (#2)
- [x] `uuid_generate_v7()`, `set_updated_at_column()`, `increment_version()` (#2)
- [x] `core.cliente` completo (#3)
- [x] `core.inmueble` completo (#4)
- [x] `core.expediente` con diagnóstico y dictamen incluidos (#6 + #8 + #10)
- [x] `core.documento` completo (#7)
- [x] Todos los enums (#1, #4, #7)
- [x] Triggers y RLS de todas las tablas core
- [x] Extensiones necesarias

**NO incluye:**
- ❌ `public.expedientes` (#1, #5) — tabla legacy que será eliminada
- ❌ Seeds de migración de datos (#6) — van en seed separado
- ❌ Storage (#9) — va en migración Storage
- ❌ Commercial (#11) — va en migración Commercial

---

### Storage (`001_storage.sql`)

> **Propósito:** Buckets de almacenamiento de objetos y sus políticas.

**Contenido:**

```sql
-- =====================================================
-- MIGRACIÓN: 001_storage.sql
-- Propósito: Buckets de almacenamiento
-- Reemplaza: Migración 9
-- =====================================================

-- Bucket: expediente-docs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('expediente-docs', 'expediente-docs', false, 20971520, ARRAY[...])
ON CONFLICT (id) DO NOTHING;

-- Políticas RLS de storage
CREATE POLICY "expediente_docs_select_policy" ON storage.objects FOR SELECT ...
CREATE POLICY "expediente_docs_insert_policy" ON storage.objects FOR INSERT ...
CREATE POLICY "expediente_docs_update_policy" ON storage.objects FOR UPDATE ...
CREATE POLICY "expediente_docs_delete_policy" ON storage.objects FOR DELETE ...
```

**Incluye:**
- [x] Bucket `expediente-docs` (#9)
- [x] 4 políticas de storage (#9)

---

### Dictamen (`002_dictamen.sql`)

> **Propósito:** Tablas y estructura específica del subsistema de Dictamen Técnico.  
> *Nota:* Actualmente dictamen es un JSONB dentro de `core.expediente`. Si evoluciona a tabla propia, iría aquí.

**Contenido propuesto:**

```sql
-- =====================================================
-- MIGRACIÓN: 002_dictamen.sql
-- Propósito: Subsistema de Dictamen Técnico
-- Reemplaza: (parte de migración 8 y 10)
-- =====================================================

-- Nota V1: Dictamen es Value Object dentro de core.expediente (JSONB).
-- Ya está incluido en Foundation.
-- Esta migración queda reservada para cuando dictamen
-- evolucione a tabla propia (V2).
```

**Estado actual:** V1 mantiene dictamen como JSONB dentro de `core.expediente`. Ya incluido en Foundation. Esta migración queda como placeholder para V2.

---

### Commercial (`003_commercial.sql`)

> **Propósito:** Schema comercial completo (clientes comerciales, pedidos, pagos, contratos).

**Contenido:**

```sql
-- =====================================================
-- MIGRACIÓN: 003_commercial.sql
-- Propósito: Schema comercial
-- Reemplaza: Migración 11
-- =====================================================

CREATE SCHEMA IF NOT EXISTS commercial;

-- NOTA: uuid_generate_v7(), update_updated_at_column(), increment_version()
-- se referencian desde core.* (no se duplican en commercial)

-- Tabla: commercial.customer
CREATE TABLE commercial.customer (
    id UUID PRIMARY KEY DEFAULT core.uuid_generate_v7(),
    ...
);

-- Tabla: commercial.order
CREATE TABLE commercial.order (
    id UUID PRIMARY KEY DEFAULT core.uuid_generate_v7(),
    customer_id UUID NOT NULL REFERENCES commercial.customer(id),
    ...
);

-- Tabla: commercial.payment ...
-- Tabla: commercial.contract ...
-- Tabla: commercial.contract_document ...
-- Tabla: commercial.audit_trail ...

-- Índices, triggers, RLS
```

**Cambios clave respecto a migración #11 actual:**
- ♻️ Las funciones `uuid_generate_v7()`, `update_updated_at_column()`, `increment_version()` ya NO se crean en `commercial`. Se referencian desde `core.*` vía `core.set_updated_at_column()`, etc.
- ✅ Tablas, índices, triggers y RLS se mantienen igual.

---

## 6. Plan de Migración (Resumen Ejecutivo)

### Estado Actual → Estado Propuesto

```
Estado Actual (11 migraciones)          Estado Propuesto (4 migraciones)
─────────────────────────────           ─────────────────────────────────
20260702_create_expedientes.sql    ─┐
20260703_create_schema_core.sql    ─┤
20260706_refactor_cliente_mvp.sql  ─┤
20260706_create_inmueble.sql       ─┤
20260707_update_expedientes.sql    ─┤
20260708_create_core_expediente.sql─┤──► 000_foundation.sql
20260709_create_core_documento.sql ─┤
20260710_add_diagnostico.sql       ─┤
20260711_add_dictamen.sql          ─┤
                                    │
20260710_create_storage.sql        ───► 001_storage.sql
                                    │
(reservado para V2)                ───► 002_dictamen.sql
                                    │
20260712_create_schema_commercial  ───► 003_commercial.sql
```

### Archivos Semilla (Seeds) Separados

Los seeds actualmente mezclados en migraciones deberían separarse:

| Seed | Contenido | Depende de |
|------|-----------|------------|
| `seed_migrate_expedientes.sql` | Migrar datos de `public.expedientes` → `core.expediente` | Foundation |
| `seed_commercial_sample.sql` | Datos de ejemplo para commercial | Commercial |

### Tablas Legacy a Eliminar

| Tabla | Razón |
|-------|-------|
| `public.expedientes` | Reemplazada por `core.expediente` |
| `public.estado_expediente` (enum) | Reemplazado por enums en `core` |

---

## 7. Checklist de Verificación Post-Reorganización

- [ ] Todas las funciones existen UNA VEZ en `core.*`
- [ ] `commercial.*` referencia `core.uuid_generate_v7()`, `core.set_updated_at_column()`, `core.increment_version()`
- [ ] `core.expediente` incluye `diagnostico`, `diagnostico_version`, `estado_diagnostico`, `dictamen`
- [ ] Todos los `ALTER TABLE ADD COLUMN` han sido eliminados (las columnas ya están en CREATE TABLE)
- [ ] No existe `public.expedientes` (pendiente de migración de datos y drop)
- [ ] Todas las migraciones usan `IF NOT EXISTS`, `CREATE OR REPLACE`, `ON CONFLICT DO NOTHING`
- [ ] Todos los triggers se crean con `DROP IF EXISTS` previo
- [ ] Los seeds están en archivos separados (`seed_*.sql`)
- [ ] `supabase/migrations_v2/` puede eliminarse tras verificar la nueva estructura

---

## 8. Riesgos y Consideraciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Datos existentes en `public.expedientes` | Alto | No dropear hasta verificar migración de datos |
| Dependencias de código en `public.expedientes` | Alto | Auditoría de imports antes de eliminar |
| Renombrado de funciones usadas por commercial | Medio | Verificar que commercial referencie `core.*` |
| IDs UUID v4 vs v7 en datos existentes | Bajo | Compatibles; v7 es más eficiente para índices |
| Rollback durante fundación | Alto | Mantener backup antes de aplicar Foundation |
| Conflictos con branch `main` remoto | Medio | Coordinar con equipo antes de mergear |

---

## 9. Conclusión

La carpeta `supabase/migrations_v2/` contiene **11 migraciones** con un 27% de archivos parche que corrigen omisiones de migraciones anteriores. La reorganización propuesta reduce a **4 migraciones** eliminando duplicaciones (funciones), separando DDL de seeds, e integrando los parches directamente en las tablas desde su creación.

La migración más compleja es **Foundation**, que consolida 9 de las 11 migraciones actuales. **Storage** y **Commercial** son migraciones con cambios mínimos respecto al estado actual. **Dictamen** queda como placeholder para V2.