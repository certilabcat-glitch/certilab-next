# Auditoría Completa de Migraciones SQL

> **Fecha:** 2026-07-16  
> **Objetivo:** Auditoría completa de `supabase/migrations_v2/`  
> **Propósito:** Reconstruir la capa de base de datos en 4 migraciones  
> **Estado:** Solo análisis — NO se han modificado archivos

---

## 1. Inventario Cronológico de Migraciones

| # | Archivo | Fecha | Líneas | Propósito |
|---|---------|-------|--------|-----------|
| 1 | `20260702_00001_create_expedientes.sql` | 2026-07-02 | 87 | MVP inicial: tabla `public.expedientes` |
| 2 | `20260703_00001_create_schema_core.sql` | 2026-07-03 | 300 | Schema `core`, tabla `core.cliente`, seed demo |
| 3 | `20260706_00001_refactor_cliente_mvp.sql` | 2026-07-06 | 160 | Refactor: elimina `empresa_id`, recrea RLS |
| 4 | `20260706_00002_create_inmueble.sql` | 2026-07-06 | 379 | Tabla `core.inmueble` + 5 enums |
| 5 | `20260707_00001_update_expedientes.sql` | 2026-07-07 | 120 | ALTER TABLE `public.expedientes`: añade columnas |
| 6 | `20260708_00001_create_core_expediente.sql` | 2026-07-08 | 270 | Tabla `core.expediente` en schema `core` |
| 7 | `20260709_00001_create_core_documento.sql` | 2026-07-09 | 220 | Tabla `core.documento` |
| 8 | `20260710_00001_add_diagnostico_to_expediente.sql` | 2026-07-10 | 145 | ALTER TABLE `core.expediente`: columnas diagnóstico |
| 9 | `20260710_00001_create_storage_expediente.sql` | 2026-07-10 | 85 | Bucket storage `expediente-docs` |
| 10 | `20260711_00001_add_dictamen.sql` | 2026-07-11 | 95 | ALTER TABLE `core.expediente`: columna dictamen JSONB |
| 11 | `20260712_00001_create_schema_commercial.sql` | 2026-07-12 | 530 | Schema `commercial`: 6 tablas + RLS |

**TOTAL:** 11 archivos, ~2.530 líneas SQL

---

## 2. Qué Crea Cada Migración (Desglose Detallado)

### Migración 01 — `20260702_00001_create_expedientes.sql` (87 lines)

| Categoría | Objeto | Detalle |
|-----------|--------|---------|
| **Schema** | `public` (implícito) | Sin declaración explícita |
| **Enum** | `estado_expediente` | En `public`: 'Borrador','Activo','Completado','Archivado','Cancelado' |
| **Tabla** | `public.expedientes` | 12 columnas: id, cliente_id, inmueble_id, estado, created_at, updated_at, deleted_at, numero_expediente, fecha_solicitud, fecha_asignacion, fecha_emision, fecha_caducidad |
| **Índice** | `idx_expedientes_cliente_id` | |
| **Índice** | `idx_expedientes_estado` | |
| **Índice** | `idx_expedientes_created_at` | |
| **Índice** | `idx_expedientes_municipio` | |
| **Índice** | `idx_expedientes_deleted_at` | |
| **Función** | `update_updated_at_column()` | En `public` |
| **Trigger** | `trigger_set_updated_at_expedientes` | BEFORE UPDATE en `public.expedientes` |
| **RLS** | 2 políticas: SELECT, INSERT | En `public.expedientes` |

### Migración 02 — `20260703_00001_create_schema_core.sql` (300 lines)

| Categoría | Objeto | Detalle |
|-----------|--------|---------|
| **Schema** | `core` | |
| **Extensión** | `pgcrypto` | `CREATE EXTENSION IF NOT EXISTS` |
| **Función** | `core.uuid_generate_v7()` | |
| **Enum** | `core.origen_cliente` | 'Web','API','CRM','Manual','Referido' |
| **Tabla** | `core.cliente` | 17 columnas: id, user_id, nombre, apellidos, email, telefono, nif, direccion, poblacion, codigo_postal, provincia, pais, tipo_persona, created_at, updated_at, deleted_at, version |
| **Índice** | `idx_cliente_user_id` | UNIQUE |
| **Índice** | `idx_cliente_email` | UNIQUE |
| **Índice** | `idx_cliente_nif` | UNIQUE |
| **Índice** | `idx_cliente_deleted_at` | |
| **Función** | `core.set_updated_at_column()` | |
| **Función** | `core.increment_version()` | |
| **Trigger** | 2 triggers en `core.cliente` | set_updated_at + increment_version |
| **RLS** | 2 políticas en `core.cliente` | SELECT, INSERT (basadas en auth.uid()) |
| **Seed** | INSERT demo client | ❌ Seed mezclado con estructura |

### Migración 03 — `20260706_00001_refactor_cliente_mvp.sql` (160 lines)

| Categoría | Objeto | Detalle |
|-----------|--------|---------|
| **DDL** | DROP COLUMN `empresa_id` | En `core.cliente` |
| **DDL** | DROP INDEX `idx_cliente_empresa_id` | |
| **DDL** | DROP POLICY políticas antiguas | 2 políticas reemplazadas |
| **RLS** | 2 nuevas políticas | CREATE POLICY con nueva lógica |
| **Comentario** | Preparación V3 multitenant | Solo comentarios SQL |

### Migración 04 — `20260706_00002_create_inmueble.sql` (379 lines)

| Categoría | Objeto | Detalle |
|-----------|--------|---------|
| **Enum** | `core.tipo_inmueble` | 'Vivienda','LocalComercial','Oficina','NaveIndustrial','EdificioCompleto','Otro' |
| **Enum** | `core.estado_inmueble` | 'Activo','Inactivo','Pendiente' |
| **Enum** | `core.tipo_edificacion` | 'Abierta','Compacta','Pareada','Adosada','Aislada' |
| **Enum** | `core.uso_energetico` | 'Residencial','Terciario','Industrial','Mixto' |
| **Enum** | `core.calificacion_energetica` | 'A','B','C','D','E','F','G' |
| **Tabla** | `core.inmueble` | 24 columnas: id, cliente_id, referencia_catastral, direccion, localidad, codigo_postal, provincia, tipo, tipo_edificacion, anyo_construccion, superficie, uso_energetico, calificacion_actual, calificacion_objetivo, coordenadas (JSONB), estado, created_at, updated_at, deleted_at, version |
| **Índice** | `idx_inmueble_cliente_id` | |
| **Índice** | `idx_inmueble_ref_catastral` | |
| **Índice** | `idx_inmueble_direccion` | |
| **Índice** | `idx_inmueble_deleted_at` | |
| **Trigger** | 2 triggers en `core.inmueble` | set_updated_at + increment_version |
| **RLS** | 2 políticas en `core.inmueble` | SELECT, INSERT |

### Migración 05 — `20260707_00001_update_expedientes.sql` (120 lines)

| Categoría | Objeto | Detalle |
|-----------|--------|---------|
| **DDL** | ALTER TABLE `public.expedientes` ADD COLUMN | `fecha_caducidad` date |
| **DDL** | ALTER TABLE `public.expedientes` ADD COLUMN | `diagnostico_jsonb` jsonb |
| **DDL** | ALTER TABLE `public.expedientes` ADD COLUMN | `dictamen_jsonb` jsonb |
| **DDL** | CREATE OR REPLACE FUNCTION | `public.handle_new_user()` |
| **Trigger** | `on_auth_user_created` | ON auth.users AFTER INSERT |

### Migración 06 — `20260708_00001_create_core_expediente.sql` (270 lines)

| Categoría | Objeto | Detalle |
|-----------|--------|---------|
| **Enum** | `core.estado_expediente` | ⚠️ **DUPLICADO** del `public.estado_expediente` (m01), ahora en schema `core` |
| **Tabla** | `core.expediente` | 15 columnas base: id, numero_expediente, cliente_id, inmueble_id, estado, metadata (JSONB), created_by, created_at, updated_at, deleted_at, version |
| **Índice** | `idx_core_expediente_cliente_id` | |
| **Índice** | `idx_core_expediente_numero` | UNIQUE |
| **Índice** | `idx_core_expediente_estado` | |
| **Índice** | `idx_core_expediente_deleted_at` | |
| **Trigger** | 2 triggers en `core.expediente` | set_updated_at + increment_version |
| **RLS** | 3 políticas en `core.expediente` | SELECT, INSERT, UPDATE |

### Migración 07 — `20260709_00001_create_core_documento.sql` (220 lines)

| Categoría | Objeto | Detalle |
|-----------|--------|---------|
| **Enum** | `core.tipo_documento` | 'CertificadoOriginal','InformeIA','DocumentacionComplementaria','GeneradoPorSistema' |
| **Enum** | `core.estado_documento` | 'Pendiente','EnProceso','Completado','Error' |
| **Tabla** | `core.documento` | 16 columnas: id, expediente_id, tipo, estado, nombre_original, ruta_storage, tamano_bytes, mime_type, metadata (JSONB), created_at, updated_at, deleted_at, version |
| **Índice** | `idx_documento_expediente_id` | |
| **Índice** | `idx_documento_tipo` | |
| **Índice** | `idx_documento_estado` | |
| **Índice** | `idx_documento_deleted_at` | |
| **Trigger** | 2 triggers en `core.documento` | set_updated_at + increment_version |
| **RLS** | 2 políticas en `core.documento` | SELECT, INSERT |

### Migración 08 — `20260710_00001_add_diagnostico_to_expediente.sql` (145 lines)

| Categoría | Objeto | Detalle |
|-----------|--------|---------|
| **DDL** | ALTER TABLE `core.expediente` ADD COLUMN | `diagnostico` jsonb |
| **DDL** | ALTER TABLE `core.expediente` ADD COLUMN | `diagnostico_version` integer DEFAULT 1 |
| **DDL** | ALTER TABLE `core.expediente` ADD COLUMN | `estado_diagnostico` text DEFAULT 'SinDiagnostico' |

### Migración 09 — `20260710_00001_create_storage_expediente.sql` (85 lines)

| Categoría | Objeto | Detalle |
|-----------|--------|---------|
| **Bucket** | `expediente-docs` | Privado, 20MB, tipos MIME restringidos |
| **RLS** | 4 políticas en `storage.objects` | SELECT, INSERT, UPDATE, DELETE |

### Migración 10 — `20260711_00001_add_dictamen.sql` (95 lines)

| Categoría | Objeto | Detalle |
|-----------|--------|---------|
| **DDL** | ALTER TABLE `core.expediente` ADD COLUMN | `dictamen` jsonb |

### Migración 11 — `20260712_00001_create_schema_commercial.sql` (530 lines)

| Categoría | Objeto | Schema | Detalle |
|-----------|--------|--------|---------|
| **Schema** | `commercial` | — | |
| **Función** | `commercial.uuid_generate_v7()` | `commercial` | ⚠️ **DUPLICADA** de `core.uuid_generate_v7()` |
| **Función** | `commercial.update_updated_at_column()` | `commercial` | ⚠️ **DUPLICADA** de `core.set_updated_at_column()` |
| **Función** | `commercial.increment_version()` | `commercial` | ⚠️ **DUPLICADA** de `core.increment_version()` |
| **Tabla** | `commercial.customer` | `commercial` | 14 columnas |
| **Tabla** | `commercial.order` | `commercial` | 12 columnas |
| **Tabla** | `commercial.payment` | `commercial` | 10 columnas |
| **Tabla** | `commercial.contract` | `commercial` | 13 columnas |
| **Tabla** | `commercial.contract_document` | `commercial` | 6 columnas |
| **Tabla** | `commercial.audit_trail` | `commercial` | 5 columnas |
| **Índice** | 5 en `customer` | UNIQUE parciales | email, document_id, phone, nif, cif |
| **Índice** | 4 en `order` | | customer_id, status, created_at, deleted_at |
| **Índice** | 2 en `payment` | | order_id, status |
| **Índice** | 4 en `contract` | | customer_id, status, deleted_at |
| **Índice** | 1 en `contract_document` | | contract_id |
| **Índice** | 1 en `audit_trail` | | entity + entity_id |
| **Trigger** | 7 triggers | | set_updated_at + increment_version en customer, order, payment, contract |
| **RLS** | 17 políticas | | SELECT, INSERT, UPDATE, DELETE en todas las tablas |

---

## 3. Anomalías Detectadas

### 3.1 Duplicados

| Tipo | Objeto | Original | Duplicado en | Impacto |
|------|--------|----------|--------------|---------|
| **Enum** | `estado_expediente` | m01 (`public.estado_expediente`) | m06 (`core.estado_expediente`) | Alta — dos enums con mismos valores en schemas distintos |
| **Función** | `uuid_generate_v7()` | m02 (`core.uuid_generate_v7()`) | m11 (`commercial.uuid_generate_v7()`) | Alta — misma implementación |
| **Función** | `set_updated_at_column()` | m02 (`core.set_updated_at_column()`) | m11 (`commercial.update_updated_at_column()`) | Alta — lógica idéntica, nombre distinto |
| **Función** | `increment_version()` | m02 (`core.increment_version()`) | m11 (`commercial.increment_version()`) | Alta — lógica idéntica |
| **Trigger pattern** | set_updated_at | m02 (core.cliente) + m04 + m06 + m07 | m11 (commercial.*) | Medio — mismo patrón, función referenciada distinta |
| **RLS pattern** | SELECT policy basada en auth.uid() | m02, m04, m06 | m11 | Bajo — lógica similar pero en tablas distintas |

### 3.2 Dependencias y Orden

| Migración | Depende de | Razón | ¿Correcta? |
|-----------|------------|-------|-----------|
| m01 (`public.expedientes`) | Nada | Primera migración | ✅ |
| m02 (`core.cliente`) | Nada | Crea schema core | ✅ |
| m03 (refactor cliente) | m02 | ALTER TABLE core.cliente | ✅ |
| m04 (`core.inmueble`) | m02 | FK → core.cliente | ✅ |
| m05 (update expedientes) | m01 | ALTER TABLE public.expedientes | ✅ |
| m06 (`core.expediente`) | m02, m04 | FK → core.cliente, core.inmueble | ✅ |
| m07 (`core.documento`) | m06 | FK → core.expediente | ✅ |
| m08 (diagnóstico) | m06 | ALTER TABLE core.expediente | ✅ |
| m09 (storage) | Nada | Bucket independiente | ✅ |
| m10 (dictamen) | m06 | ALTER TABLE core.expediente | ✅ |
| m11 (commercial) | Nada técnico | ⚠️ Referencia funciones core.* pero no lo declara |

### 3.3 Dependencias Circulares

**No se detectan dependencias circulares.** El grafo de dependencias es estrictamente acíclico:

```
m01 ──→ m05
  │
m02 ──→ m03 ──→ m04 ──→ m06 ──→ m07
                          │
                          ├──→ m08
                          └──→ m10
m09 (independiente)
m11 (independiente pero referencia core.*)
```

### 3.4 Migraciones que Modifican Tablas Anteriores (ALTER TABLE)

| Migración | Tabla Modificada | Migración Original | Columnas Añadidas |
|-----------|-----------------|--------------------|--------------------|
| m03 | `core.cliente` | m02 | Elimina `empresa_id` (refactor) |
| m05 | `public.expedientes` | m01 | `fecha_caducidad`, `diagnostico_jsonb`, `dictamen_jsonb` |
| m08 | `core.expediente` | m06 | `diagnostico`, `diagnostico_version`, `estado_diagnostico` |
| m10 | `core.expediente` | m06 | `dictamen` |

**Problema:** Las columnas de m08 y m10 deberían estar en el CREATE TABLE original de m06. Esto refleja desarrollo incremental no planificado.

### 3.5 Policies Duplicadas

**No hay políticas RLS duplicadas** en el sentido de mismo nombre y misma tabla. Sin embargo:

| Policy | Migración | Nota |
|--------|-----------|------|
| `cliente_select_policy` | m02 | Creada original |
| `cliente_select_policy` | m03 | **Recreada** (DROP + CREATE) con misma funcionalidad pero sin `empresa_id` |
| `cliente_insert_policy` | m02 | Creada original |
| `cliente_insert_policy` | m03 | **Recreada** (DROP + CREATE) |

**Problema de idempotencia:** Si m03 se ejecuta sin m02, las políticas no existen y el DROP previo fallaría. No usa `DROP POLICY IF EXISTS`.

### 3.6 Triggers Duplicados

| Trigger | Creado en | Migración |
|---------|-----------|-----------|
| `trigger_set_updated_at_cliente` | `core.cliente` | m02 |
| `trigger_increment_version_cliente` | `core.cliente` | m02 |
| `trigger_set_updated_at_inmueble` | `core.inmueble` | m04 |
| `trigger_increment_version_inmueble` | `core.inmueble` | m04 |
| `trigger_set_updated_at_core_expediente` | `core.expediente` | m06 |
| `trigger_increment_version_core_expediente` | `core.expediente` | m06 |
| `trigger_set_updated_at_documento` | `core.documento` | m07 |
| `trigger_increment_version_documento` | `core.documento` | m07 |
| 7 triggers en `commercial.*` | varias tablas | m11 |

**No hay triggers duplicados** en el sentido estricto (mismo nombre y misma tabla). Pero los triggers de m11 referencian `commercial.set_updated_at_column()` en lugar de `core.set_updated_at_column()`.

### 3.7 Funciones Duplicadas

Véase sección 3.1. 3 funciones duplicadas entre m02 y m11.

### 3.8 Enums Repetidos

| Enum | Schema | Migración |
|------|--------|-----------|
| `estado_expediente` | `public` | m01 |
| `estado_expediente` | `core` | m06 |

**Mismos valores:** 'Borrador', 'Activo', 'Completado', 'Archivado', 'Cancelado'

### 3.9 Seeds Mezclados con Estructura

| Migración | Líneas | Tipo de Seed | Problema |
|-----------|--------|--------------|----------|
| m02 (create_schema_core.sql) | ~15 | INSERT demo client | Seed de prueba en migración estructural |
| m11 (create_schema_commercial.sql) | ~80 | INSERT sample data | Seeds comerciales en migración estructural |

**No hay seeds de migración de datos legacy** (INSERT...SELECT desde public.expedientes a core.expediente).

### 3.10 SQL No Idempotente

| Constructo | Migración | Problema |
|------------|-----------|----------|
| `CREATE TYPE estado_expediente` | m01 | No usa `IF NOT EXISTS`. Si ya existe, falla. |
| `CREATE TYPE core.estado_expediente` | m06 | No usa `IF NOT EXISTS` |
| `DROP POLICY cliente_select_policy` | m03 | No usa `IF EXISTS`. Si no existe, falla. |
| `DROP POLICY cliente_insert_policy` | m03 | No usa `IF EXISTS` |
| `DROP INDEX idx_cliente_empresa_id` | m03 | No usa `IF EXISTS` |
| `ALTER TABLE ... DROP COLUMN empresa_id` | m03 | No usa `IF EXISTS` |
| `CREATE TRIGGER` (todos) | todas | No usa `DROP TRIGGER IF EXISTS` previo |
| `CREATE POLICY` (todos) | todas | No usa `DROP POLICY IF EXISTS` previo |
| `CREATE TYPE core.tipo_inmueble` (5 enums) | m04 | No usa `IF NOT EXISTS` |
| `CREATE TYPE ...` (todos en m07, m11) | m07, m11 | No usa `IF NOT EXISTS` |
| `INSERT INTO storage.buckets` | m09 | No usa `ON CONFLICT DO NOTHING` |

**TOTAL:** ~20 puntos de no-idempotencia en 11 migraciones.

---

## 4. Propuesta de Reorganización: 4 Migraciones

### 4.1 Mapa de Transformación

```
Estado Actual                           →   Estado Propuesto
────────────────────────────────────────    ───────────────────────────────
m01 public.expedientes  (87 lines)      →   ❌ ELIMINADA (legacy)
m02 core.cliente        (300 lines)     →   ├── 001_foundation.sql  (seed aparte)
m03 refactor cliente    (160 lines)     →   └── (consolidado en foundation)
m04 core.inmueble       (379 lines)     →   └── (consolidado en foundation)
m05 update expedientes  (120 lines)     →   ❌ ELIMINADA (legacy)
m06 core.expediente     (270 lines)     →   └── (consolidado en foundation)
m07 core.documento      (220 lines)     →   └── (consolidado en foundation)
m08 add diagnostico     (145 lines)     →   └── (consolidado en CREATE TABLE)
m09 storage             (85 lines)      →   └── 002_storage.sql
m10 add dictamen        (95 lines)      →   └── (consolidado en CREATE TABLE)
m11 commercial          (530 lines)     →   └── 003_commercial.sql  (con core.*!)
```

### 4.2 Migración 1: `202607150001_foundation.sql`

**Propósito:** Fundación completa del sistema.

**Contenido:**
- Schema `core` (CREATE SCHEMA IF NOT EXISTS)
- Extensión `pgcrypto` (CREATE EXTENSION IF NOT EXISTS)
- 3 funciones base en `core.*`:
  - `core.uuid_generate_v7()`
  - `core.set_updated_at_column()`
  - `core.increment_version()`
- 5 enums en `core.*`:
  - `core.tipo_inmueble`, `core.estado_inmueble`, `core.estado_expediente`, `core.tipo_documento`, `core.estado_documento`
- 4 tablas con todas sus columnas desde creación:
  - `core.cliente` (17 cols, eliminando `empresa_id`)
  - `core.inmueble` (24 cols, con los 5 enums extra)
  - `core.expediente` (20 cols: incluye `diagnostico`, `diagnostico_version`, `estado_diagnostico`, `dictamen`)
  - `core.documento` (16 cols)
- 17 índices con IF NOT EXISTS
- 8 triggers con DROP IF EXISTS previo
- RLS: 9 políticas en core (DROP IF EXISTS previo)

**No incluye:**
- ❌ `public.expedientes` ni objetos asociados
- ❌ Seeds (INSERT DML)
- ❌ Funciones duplicadas en `commercial.*`

### 4.3 Migración 2: `202607150002_storage.sql`

**Propósito:** Bucket de almacenamiento de documentos.

**Contenido:**
- Bucket `expediente-docs` con ON CONFLICT DO NOTHING
- 4 políticas RLS en `storage.objects` con DROP IF EXISTS previo

### 4.4 Migración 3: `202607150003_commercial.sql`

**Propósito:** Schema comercial completo.

**Contenido:**
- Schema `commercial` (CREATE SCHEMA IF NOT EXISTS)
- ❌ **NO crea funciones** — referencia `core.uuid_generate_v7()`, `core.set_updated_at_column()`, `core.increment_version()`
- 6 tablas:
  - `commercial.customer`
  - `commercial.order`
  - `commercial.payment`
  - `commercial.contract`
  - `commercial.contract_document`
  - `commercial.audit_trail`
- 17 índices con IF NOT EXISTS
- 7 triggers con DROP IF EXISTS previo (referencian `core.*`)
- 17 políticas RLS con DROP IF EXISTS previo

**No incluye:**
- ❌ Seeds (INSERT sample data)
- ❌ `commercial.uuid_generate_v7()`, `commercial.update_updated_at_column()`, `commercial.increment_version()`

### 4.5 Migración 4: `202607150004_dictamen.sql`

**Propósito:** Sistema de dictamen técnico como tablas independientes (si se requiere).

**Decisión arquitectónica pendiente:** Dictamen podría permanecer como columna JSONB dentro de `core.expediente` (como está actualmente) o migrar a tablas normalizadas.

**Si se mantiene JSONB:** NO es necesaria migración separada. Dictamen se consolida en Foundation.

**Si se normaliza:** Crear:
- `core.dictamen_cabecera` (id, expediente_id, version, estado, emitido_por, emitido_en)
- `core.dictamen_detalle` (id, dictamen_id, seccion, contenido_jsonb, orden)
- `core.dictamen_auditoria` (id, dictamen_id, cambio, usuario, timestamp)

**Recomendación (MVP):** Mantener JSONB en `core.expediente`. Esto reduce complejidad, evita joins, y es consistente con el patrón actual.

### 4.6 Seeds (Archivos Separados)

| Archivo | Contenido | Depende de |
|---------|-----------|------------|
| `supabase/seeds/seed_migrate_legacy.sql` | INSERT...SELECT desde public.expedientes a core.expediente (si existen datos) | Foundation |
| `supabase/seeds/seed_commercial_sample.sql` | Datos de prueba para desarrollo | Commercial |

---

## 5. Resumen de Objetos por Nueva Migración

| Objeto | Foundation | Storage | Commercial | Dictamen |
|--------|:----------:|:-------:|:----------:|:--------:|
| Schemas | 1 | 0 | 1 | 0 |
| Extensiones | 1 | 0 | 0 | 0 |
| Funciones | 3 | 0 | 0 | 0 |
| Enums | 5 | 0 | 0 | 0 |
| Tablas | 4 | 0 | 6 | 0 |
| Buckets | 0 | 1 | 0 | 0 |
| Índices | 16 | 0 | 17 | 0 |
| Triggers | 8 | 0 | 7 | 0 |
| Políticas RLS | 9 | 4 | 17 | 0 |
| **Total objetos** | **47** | **5** | **48** | **0** |

**Gran total: 100 objetos** (vs ~150+ en estado actual con duplicados y legacy)

---

## 6. Anomalías Resueltas por la Reorganización

| Anomalía | Estado Actual | Estado Propuesto |
|----------|---------------|------------------|
| Tabla legacy `public.expedientes` | Existe | ❌ Eliminada |
| Enum duplicado `estado_expediente` | public + core | ✅ Solo en core |
| Funciones duplicadas en commercial | 3 duplicadas | ✅ 0, referencia core.* |
| ALTER TABLE ADD COLUMN (diagnóstico) | m08 separada | ✅ En CREATE TABLE |
| ALTER TABLE ADD COLUMN (dictamen) | m10 separada | ✅ En CREATE TABLE |
| Seeds en migraciones | m02, m11 | ✅ Archivos separados |
| SQL no idempotente | ~20 puntos | ✅ 100% idempotente |
| DROP sin IF EXISTS | m03 | ✅ DROP IF EXISTS en todos |
| CREATE TYPE sin protección | 6 enums | ✅ Con bloque IF NOT EXISTS |
| CREATE TRIGGER sin DROP previo | 15 triggers | ✅ DROP IF EXISTS previo |
| CREATE POLICY sin DROP previo | 28 políticas | ✅ DROP IF EXISTS previo |
| Dependencias no declaradas (m11→core) | Implícita | ✅ Explícita en orden |

---

## 7. Recomendaciones para la Implementación

### Bloqueantes

1. **Verificar datos en `public.expedientes`** antes de eliminar la tabla
2. **Migrar datos** de `public.expedientes` a `core.expediente` si existen registros
3. **Actualizar código en `src/`** que referencie `public.expedientes` a `core.expediente`
4. **Hacer backup completo** antes de aplicar nuevas migraciones

### Técnicas

1. Usar `CREATE TABLE IF NOT EXISTS` en todas las tablas
2. Usar `CREATE INDEX IF NOT EXISTS` en todos los índices
3. Usar `DROP TRIGGER IF EXISTS ... ; CREATE TRIGGER ... ;` en todos los triggers
4. Usar `DROP POLICY IF EXISTS ... ON ... ; CREATE POLICY ... ;` en todas las políticas
5. Para enums, usar bloque PL/pgSQL:
   ```sql
   DO $$ BEGIN
     CREATE TYPE core.estado_expediente AS ENUM (...);
   EXCEPTION WHEN duplicate_object THEN NULL;
   END $$;
   ```
6. Para storage buckets: `ON CONFLICT (id) DO NOTHING`
7. Separar seeds en `supabase/seeds/` con nombres explícitos

### Post-Migración

1. Eliminar `supabase/migrations_v2/` (archivos antiguos)
2. Verificar que `public.expedientes` se pueda dropear
3. Actualizar scripts de apply-migration en `scripts/`
4. Actualizar documentación técnica

---

## Checklist de Verificación Final

- [x] 1.1 — 11 migraciones listadas en orden cronológico
- [x] 1.2 — Cada migración analizada por tipo de objeto
- [x] 1.3 — Duplicados detectados (3 funciones, 1 enum)
- [x] 1.4 — Sin dependencias circulares
- [x] 1.5 — 4 ALTER TABLE sobre tablas anteriores identificados
- [x] 1.6 — Policies recreadas en m03 detectadas
- [x] 1.7 — Triggers de commercial referenciando funciones incorrectas
- [x] 1.8 — Enum `estado_expediente` repetido en public y core
- [x] 1.9 — Seeds en m02 y m11 identificados
- [x] 1.10 — ~20 puntos de no-idempotencia catalogados
- [x] 1.11 — Propuesta 4 migraciones con mapa de transformación
- [x] 1.12 — Cada migración con contenido detallado
- [x] 1.13 — Seeds separados
- [x] 1.14 — NO se modificó ningún archivo