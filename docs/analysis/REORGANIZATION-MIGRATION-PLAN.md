# Plan de Reorganización de Migraciones — V2 Simplificada

> **Fecha:** 2026-07-16  
> **Estado:** Borrador para aprobación  
> **Arquitectura objetivo:** 3 migraciones atómicas + 1 directorio de seeds  
> **Origen:** 11 migraciones en `supabase/migrations_v2/`  
> **Destino:** 3 migraciones en `supabase/migrations/` + `supabase/seeds/`

---

## 1. Arquitectura Objetivo

```
supabase/
├── migrations/                          # 3 migraciones atómicas
│   ├── 202607150001_foundation.sql      # Schema core + todas las tablas + funciones + RLS
│   ├── 202607150002_storage.sql         # Buckets + storage RLS
│   └── 202607150003_commercial.sql      # Schema commercial + tablas + RLS
└── seeds/                               # Datos demo separados
    ├── 001_cliente_demo.sql
    ├── 002_inmueble_demo.sql
    ├── 003_expediente_demo.sql
    └── 004_documento_demo.sql
```

**Reglas:**
- Cada migración es **atómicamente idempotente** (`IF NOT EXISTS`, `DROP IF EXISTS`, `CREATE OR REPLACE`)
- **Sin seeds** en migraciones estructurales
- **Sin migraciones de datos** (public.expedientes → core.expediente va en script one-shot aparte)
- **Sin funciones duplicadas** entre Foundation y Commercial
- **Sin SQL no idempotente** (UPDATEs destructivos, INSERTs con UUIDs fijos)

---

## 2. Foundation — Contenido Detallado

**Archivo:** `supabase/migrations/202607150001_foundation.sql`

### 2.1 Schema y Extensiones

| Orden | Elemento | Idempotente | Origen (migración original) |
|-------|----------|-------------|-----------------------------|
| 1 | `CREATE SCHEMA IF NOT EXISTS core` | ✅ | 2 |
| 2 | `CREATE EXTENSION IF NOT EXISTS pgcrypto` | ✅ | (implícita en gen_random_uuid) |

### 2.2 Funciones Compartidas (1 sola definición cada una)

| Orden | Función | Idempotente | Notas |
|-------|---------|-------------|-------|
| 3 | `core.uuid_generate_v7()` | `CREATE OR REPLACE` | Única en todo el sistema. Eliminar `commercial.uuid_generate_v7()` |
| 4 | `core.update_updated_at_column()` | `CREATE OR REPLACE` | Única. Eliminar `commercial.update_updated_at_column()`. También eliminar `core.trigger_set_updated_at()` que es duplicada |
| 5 | `core.increment_version()` | `CREATE OR REPLACE` | Única. Eliminar `commercial.increment_version()`. También eliminar `core.increment_version_expediente()` que es redundante |

### 2.3 Enumeraciones

| Orden | Enum | Idempotente | Notas |
|-------|------|-------------|-------|
| 6 | `core.origen_cliente` | `DO $$ ... EXCEPTION WHEN duplicate_object THEN NULL` | Migración 2 |
| 7 | `core.tipo_inmueble` | Ídem | Migración 4 |
| 8 | `core.tipo_edificio` | Ídem | Migración 4 |
| 9 | `core.uso_inmueble` | Ídem | Migración 4 |
| 10 | `core.orientacion` | Ídem | Migración 4 |
| 11 | `core.zona_climatica_cte` | Ídem | Migración 4 |
| 12 | `core.zona_climatica_verano` | Ídem | Migración 4 |
| 13 | `core.estado_expediente` | Ídem | Migraciones 1 + 6 (unificado como `core.estado_expediente`) |
| 14 | `core.tipo_documento` | Ídem | Migración 7 |
| 15 | `core.estado_procesamiento_ia` | Ídem | Migración 7 |

### 2.4 Tablas (orden secuencial por dependencias FK)

#### 2.4.1 `core.cliente`

| Aspecto | Detalle |
|---------|---------|
| Columnas | `id` (PK, UUID v7), `usuario_id`, `email`, `nombre`, `apellidos`, `telefono`, `dni`, `direccion`, `ciudad`, `codigo_postal`, `notas`, `origen`, `consent_id`, `retention_days`, `anonymized_at`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `version` |
| Constraints | `chk_cliente_contacto_requerido`, `chk_cliente_retention_days`, `chk_cliente_version` |
| Índices | `uq_cliente_email` (UNIQUE WHERE deleted_at IS NULL AND email IS NOT NULL), `idx_cliente_usuario_id`, `idx_cliente_email`, `idx_cliente_nombre`, `idx_cliente_created_at`, `idx_cliente_anonymized_at` |
| RLS habilitada | ✅ |

#### 2.4.2 `core.inmueble`

| Aspecto | Detalle |
|---------|---------|
| Columnas | `id` (PK, UUID v7), `cliente_id` (FK → core.cliente), `refcat`, `direccion`, `municipio`, `provincia`, `codigo_postal`, `tipo_inmueble`, `tipo_edificio`, `uso_inmueble`, `anyo_construccion`, `superficie_util`, `superficie_construida`, `orientacion`, `zona_climatica_cte`, `zona_climatica_verano`, `coordenadas` (JSONB), `notas`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `version` |
| Constraints | CHECK de coordenadas, CHECK de version |
| Índices | `idx_inmueble_cliente_id`, `idx_inmueble_refcat`, `idx_inmueble_cp`, `idx_inmueble_municipio`, `idx_inmueble_provincia`, `idx_inmueble_ubicacion`, `idx_inmueble_zona_climatica`, `idx_inmueble_deleted_at` |
| RLS habilitada | ✅ |

#### 2.4.3 `core.expediente`

| Aspecto | Detalle |
|---------|---------|
| Columnas | `id` (PK, UUID v7), `numero` (generado), `cliente_id` (FK → core.cliente), `inmueble_id` (FK → core.inmueble), `estado` (core.estado_expediente), `diagnostico` (JSONB), `diagnostico_version` (INTEGER), `estado_diagnostico` (TEXT), `dictamen` (JSONB), `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `version` |
| Constraints | `ck_expediente_diagnostico_is_object`, `ck_expediente_estado_diagnostico`, `ck_expediente_diagnostico_version` |
| Índices | `idx_expediente_cliente_id`, `idx_expediente_estado`, `idx_expediente_numero`, `idx_expediente_inmueble_id`, `idx_expediente_deleted_at`, `idx_expediente_dictamen_emitido` |
| RLS habilitada | ✅ |

#### 2.4.4 `core.documento`

| Aspecto | Detalle |
|---------|---------|
| Columnas | `id` (PK, UUID v7), `expediente_id` (FK → core.expediente), `tipo` (core.tipo_documento), `nombre_original`, `hash` (TEXT), `storage_path`, `mime_type`, `tamano_bytes`, `estado_ia` (core.estado_procesamiento_ia), `resultado_ia` (JSONB), `metadata` (JSONB), `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `version` |
| Constraints | CHECK de version |
| Índices | `idx_documento_expediente_id`, `idx_documento_tipo`, `idx_documento_hash`, `idx_documento_estado_ia`, `idx_documento_expediente_tipo`, `idx_documento_deleted_at` |
| RLS habilitada | ✅ |

### 2.5 Triggers

| Orden | Trigger | Tabla | Función |
|-------|---------|-------|---------|
| 25 | `trg_cliente_updated_at` | `core.cliente` | `core.update_updated_at_column()` |
| 26 | `trg_cliente_version` | `core.cliente` | `core.increment_version()` |
| 27 | `trg_inmueble_updated_at` | `core.inmueble` | `core.update_updated_at_column()` |
| 28 | `trg_inmueble_version` | `core.inmueble` | `core.increment_version()` |
| 29 | `trg_expediente_updated_at` | `core.expediente` | `core.update_updated_at_column()` |
| 30 | `trg_expediente_version` | `core.expediente` | `core.increment_version()` |
| 31 | `trg_documento_updated_at` | `core.documento` | `core.update_updated_at_column()` |
| 32 | `trg_documento_version` | `core.documento` | `core.increment_version()` |

**Nomenclatura unificada:** `trg_{tabla}_updated_at` y `trg_{tabla}_version`

### 2.6 Políticas RLS

#### `core.cliente` (5 políticas)

| Nombre | Operación | Rol |
|--------|-----------|-----|
| `Usuarios pueden ver sus clientes` | SELECT | authenticated |
| `Usuarios pueden crear clientes` | INSERT | authenticated |
| `Usuarios pueden actualizar sus clientes` | UPDATE | authenticated |
| `Solo servicio puede hard-delete cliente` | DELETE | service_role |
| `Service role acceso completo cliente` | ALL | service_role |

#### `core.inmueble` (5 políticas)

| Nombre | Operación | Rol |
|--------|-----------|-----|
| `Usuarios pueden ver inmuebles de sus clientes` | SELECT | authenticated |
| `Usuarios pueden crear inmuebles` | INSERT | authenticated |
| `Usuarios pueden actualizar inmuebles` | UPDATE | authenticated |
| `Solo servicio puede hard-delete inmueble` | DELETE | service_role |
| `Service role acceso completo inmueble` | ALL | service_role |

#### `core.expediente` (5 políticas)

| Nombre | Operación | Rol |
|--------|-----------|-----|
| `Usuarios pueden ver expedientes de sus clientes` | SELECT | authenticated |
| `Usuarios pueden crear expedientes` | INSERT | authenticated |
| `Usuarios pueden actualizar expedientes` | UPDATE | authenticated |
| `Solo servicio puede hard-delete expediente` | DELETE | service_role |
| `Service role acceso completo expediente` | ALL | service_role |

#### `core.documento` (5 políticas)

| Nombre | Operación | Rol |
|--------|-----------|-----|
| `Usuarios pueden ver documentos de sus expedientes` | SELECT | authenticated |
| `Usuarios pueden crear documentos` | INSERT | authenticated |
| `Usuarios pueden actualizar documentos` | UPDATE | authenticated |
| `Solo servicio puede hard-delete documento` | DELETE | service_role |
| `Service role acceso completo documento` | ALL | service_role |

**Nota:** Las políticas se nombran de forma consistente con el mismo patrón: `{accion} {recurso}` o `{rol} {acceso} {recurso}`.

### 2.7 Comentarios (COMMENT ON)

| Objeto | Comentario |
|--------|------------|
| SCHEMA core | `Core Domain — Cliente, Inmueble, Expediente, Documento IA` |
| TABLE core.cliente | `AR: Cliente — Persona física o jurídica propietaria del inmueble` |
| TABLE core.inmueble | `Entity: Inmueble — Propiedad asociada a un cliente` |
| TABLE core.expediente | `AR: Expediente — Proceso de certificación energética` |
| TABLE core.documento | `Entity: Documento — Archivo digital asociado a un expediente` |

### 2.8 Lo que NO va en Foundation

| Elemento | Motivo | Destino |
|----------|--------|---------|
| Seeds (`INSERT`) | Violan idempotencia | `supabase/seeds/` |
| `public.expedientes` | Legacy MVP, no debe recrearse | Eliminar |
| `public.update_updated_at_column()` | Función en espacio público | Eliminar (usar `core.*`) |
| Migración de datos `public.expedientes → core.expediente` | Script one-shot | Script separado |

---

## 3. Storage — Contenido Detallado

**Archivo:** `supabase/migrations/202607150002_storage.sql`

### 3.1 Buckets

| Orden | Bucket | Idempotente |
|-------|--------|-------------|
| 1 | `expediente-docs` | `INSERT INTO storage.buckets ... ON CONFLICT DO NOTHING` |

### 3.2 Políticas RLS de Storage

| Orden | Nombre | Bucket | Operación | Rol |
|-------|--------|--------|-----------|-----|
| 2 | `Usuarios pueden subir documentos a sus expedientes` | `expediente-docs` | INSERT | authenticated |
| 3 | `Usuarios pueden leer documentos de sus expedientes` | `expediente-docs` | SELECT | authenticated |
| 4 | `Usuarios pueden eliminar documentos de sus expedientes` | `expediente-docs` | DELETE | authenticated |
| 5 | `Servicio puede gestionar documentos` | `expediente-docs` | ALL | service_role |

### 3.3 Configuración de Seguridad

| Orden | Acción |
|-------|--------|
| 6 | `REVOKE ALL ON storage.objects FROM anon, public` |

### 3.4 Lo que NO va en Storage

| Elemento | Motivo |
|----------|--------|
| Tablas de negocio | Pertenecen a Foundation o Commercial |
| Funciones compartidas (uuid_generate_v7, etc.) | Ya están en Foundation |
| RLS de tablas core.* | Ya están en Foundation |
| Seeds | Van en `supabase/seeds/` |

---

## 4. Commercial — Contenido Detallado

**Archivo:** `supabase/migrations/202607150003_commercial.sql`

### 4.1 Schema

| Orden | Elemento | Idempotente |
|-------|----------|-------------|
| 1 | `CREATE SCHEMA IF NOT EXISTS commercial` | ✅ |

**NO se crean funciones duplicadas.** Commercial reusa las funciones de Foundation:
- `core.uuid_generate_v7()` para DEFAULT de PKs
- `core.update_updated_at_column()` para triggers updated_at
- `core.increment_version()` para triggers version

### 4.2 Tablas (orden secuencial por dependencias FK)

#### 4.2.1 `commercial.customer`

| Aspecto | Detalle |
|---------|---------|
| Columnas | `id` (PK, UUID v7 DEFAULT `core.uuid_generate_v7()`), `user_id` (UUID, 1:1 con auth.users), `business_name` (VARCHAR), `tax_id` (VARCHAR), `email` (VARCHAR), `phone` (VARCHAR), `address` (TEXT), `city` (VARCHAR), `postal_code` (VARCHAR), `country` (VARCHAR), `billing_email` (VARCHAR), `stripe_customer_id` (VARCHAR), `metadata` (JSONB), `created_at`, `updated_at`, `deleted_at`, `version` |
| Índices | `uq_customer_email` (UNIQUE WHERE deleted_at IS NULL), `idx_customer_user_id`, `idx_customer_stripe_id`, `idx_customer_business_name` |
| RLS habilitada | ✅ |

#### 4.2.2 `commercial.order`

| Aspecto | Detalle |
|---------|---------|
| Columnas | `id` (PK, UUID v7 DEFAULT `core.uuid_generate_v7()`), `customer_id` (FK → commercial.customer), `order_number` (VARCHAR UNIQUE), `status` (VARCHAR), `description` (TEXT), `amount` (DECIMAL), `currency` (VARCHAR DEFAULT 'EUR'), `metadata` (JSONB), `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `version` |
| Constraints | `chk_order_amount` (amount >= 0) |
| Índices | `idx_order_customer_id`, `idx_order_status`, `idx_order_number`, `idx_order_created_at`, `idx_order_deleted_at` |
| RLS habilitada | ✅ |

#### 4.2.3 `commercial.payment`

| Aspecto | Detalle |
|---------|---------|
| Columnas | `id` (PK, UUID v7), `order_id` (FK → commercial.order), `stripe_payment_intent_id` (VARCHAR), `amount` (DECIMAL), `currency` (VARCHAR), `status` (VARCHAR), `payment_method` (VARCHAR), `paid_at` (TIMESTAMPTZ), `metadata` (JSONB), `created_at`, `updated_at` |
| Constraints | `chk_payment_amount` (amount > 0) |
| Índices | `idx_payment_order_id`, `idx_payment_stripe_id`, `idx_payment_status` |
| RLS habilitada | ✅ |

#### 4.2.4 `commercial.contract`

| Aspecto | Detalle |
|---------|---------|
| Columnas | `id` (PK, UUID v7), `order_id` (FK → commercial.order), `contract_type` (VARCHAR), `version` (VARCHAR), `content` (TEXT), `signed_at` (TIMESTAMPTZ), `signed_by` (UUID), `ip_address` (INET), `metadata` (JSONB), `created_at`, `updated_at`, `deleted_at`, `version` |
| Índices | `idx_contract_order_id`, `idx_contract_type` |
| RLS habilitada | ✅ |

#### 4.2.5 `commercial.contract_document`

| Aspecto | Detalle |
|---------|---------|
| Columnas | `id` (PK, UUID v7), `contract_id` (FK → commercial.contract), `document_type` (VARCHAR), `storage_path` (TEXT), `filename` (VARCHAR), `mime_type` (VARCHAR), `content_hash` (VARCHAR), `metadata` (JSONB), `created_at`, `updated_at` |
| Índices | `idx_contract_doc_contract_id` |
| RLS habilitada | ✅ |

#### 4.2.6 `commercial.audit_trail`

| Aspecto | Detalle |
|---------|---------|
| Columnas | `id` (PK, UUID v7), `entity_type` (VARCHAR), `entity_id` (UUID), `action` (VARCHAR), `actor_id` (UUID), `actor_role` (VARCHAR), `old_values` (JSONB), `new_values` (JSONB), `ip_address` (INET), `user_agent` (TEXT), `created_at` |
| Índices | `idx_audit_entity`, `idx_audit_actor`, `idx_audit_created_at` |
| RLS habilitada | ✅ |

### 4.3 Triggers (usando funciones de Foundation)

| Orden | Trigger | Tabla | Función |
|-------|---------|-------|---------|
| 8 | `trg_customer_updated_at` | `commercial.customer` | `core.update_updated_at_column()` |
| 9 | `trg_customer_version` | `commercial.customer` | `core.increment_version()` |
| 10 | `trg_order_updated_at` | `commercial.order` | `core.update_updated_at_column()` |
| 11 | `trg_order_version` | `commercial.order` | `core.increment_version()` |
| 12 | `trg_payment_updated_at` | `commercial.payment` | `core.update_updated_at_column()` |
| 13 | `trg_contract_updated_at` | `commercial.contract` | `core.update_updated_at_column()` |
| 14 | `trg_contract_document_updated_at` | `commercial.contract_document` | `core.update_updated_at_column()` |

### 4.4 Políticas RLS

#### `commercial.customer` (5 políticas)

| Nombre | Operación | Rol |
|--------|-----------|-----|
| `Customers can view own profile` | SELECT | authenticated |
| `Customers can create profile` | INSERT | authenticated |
| `Customers can update own profile` | UPDATE | authenticated |
| `Only service can hard-delete customer` | DELETE | service_role |
| `Service role full access customer` | ALL | service_role |

#### `commercial.order` (5 políticas)

| Nombre | Operación | Rol |
|--------|-----------|-----|
| `Customers can view own orders` | SELECT | authenticated |
| `Customers can create orders` | INSERT | authenticated |
| `Customers can update own orders` | UPDATE | authenticated |
| `Only service can hard-delete order` | DELETE | service_role |
| `Service role full access order` | ALL | service_role |

#### `commercial.payment` (2 políticas)

| Nombre | Operación | Rol |
|--------|-----------|-----|
| `Customers can view own payments` | SELECT | authenticated |
| `Service can manage payments` | ALL | service_role |

#### `commercial.contract` (2 políticas)

| Nombre | Operación | Rol |
|--------|-----------|-----|
| `Customers can view own contracts` | SELECT | authenticated |
| `Service can manage contracts` | ALL | service_role |

#### `commercial.contract_document` (2 políticas)

| Nombre | Operación | Rol |
|--------|-----------|-----|
| `Customers can view own contract documents` | SELECT | authenticated |
| `Service can manage contract documents` | ALL | service_role |

#### `commercial.audit_trail` (3 políticas)

| Nombre | Operación | Rol |
|--------|-----------|-----|
| `Authenticated can read audit trail` | SELECT | authenticated |
| `Service can write audit trail` | INSERT | service_role |
| `Service role full access audit` | ALL | service_role |

### 4.5 Comentarios

| Objeto | Comentario |
|--------|------------|
| SCHEMA commercial | `Commercial Domain — Gestión de clientes comerciales, órdenes, pagos y contratos` |
| TABLE commercial.customer | `AR: Customer — Cliente comercial con perfil de facturación. 1:1 con auth.users` |
| TABLE commercial.order | `AR: Order — Orden de servicio pagada` |
| TABLE commercial.payment | `Entity: Payment — Transacción asociada a una Order` |
| TABLE commercial.contract | `Entity: Contract — Paquete legal aceptado asociado a una Order` |
| TABLE commercial.contract_document | `Entity: ContractDocument — Documento legal individual aceptado` |
| TABLE commercial.audit_trail | `Transversal: AuditTrail — Registro de auditoría para entidades comerciales` |

### 4.6 Lo que NO va en Commercial

| Elemento | Motivo |
|----------|--------|
| `commercial.uuid_generate_v7()` | Usar `core.uuid_generate_v7()` |
| `commercial.update_updated_at_column()` | Usar `core.update_updated_at_column()` |
| `commercial.increment_version()` | Usar `core.increment_version()` |
| Seeds | Van en `supabase/seeds/` |

---

## 5. Seeds — Contenido Detallado

**Directorio:** `supabase/seeds/`

Todos los seeds se ejecutan **después** de las 3 migraciones. Cada seed es idempotente mediante `ON CONFLICT DO NOTHING`.

### 5.1 `001_cliente_demo.sql`

```sql
INSERT INTO core.cliente (id, email, nombre, apellidos, telefono, origen, consent_id, retention_days, created_by, updated_by)
VALUES (
  core.uuid_generate_v7(),
  'cliente.demo@certilab.com',
  'Cliente',
  'Demo Certilab',
  '+34 600 000 000',
  'web',
  '00000000-0000-0000-0000-000000000000',
  2190,
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000'
) ON CONFLICT DO NOTHING;
```

### 5.2 `002_inmueble_demo.sql`

```sql
INSERT INTO core.inmueble (id, cliente_id, refcat, direccion, municipio, provincia, tipo_inmueble, uso_inmueble, created_by, updated_by)
SELECT
  core.uuid_generate_v7(),
  c.id,
  '1234567AA',
  'C/ Demostración 42',
  'Barcelona',
  'Barcelona',
  'vivienda',
  'residencial',
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000'
FROM core.cliente c
WHERE c.email = 'cliente.demo@certilab.com'
  AND NOT EXISTS (SELECT 1 FROM core.inmueble WHERE refcat = '1234567AA');
```

### 5.3 `003_expediente_demo.sql`

```sql
INSERT INTO core.expediente (id, cliente_id, inmueble_id, estado, created_by, updated_by)
SELECT
  core.uuid_generate_v7(),
  c.id,
  i.id,
  'pendiente',
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000'
FROM core.cliente c
JOIN core.inmueble i ON i.cliente_id = c.id
WHERE c.email = 'cliente.demo@certilab.com'
  AND NOT EXISTS (SELECT 1 FROM core.expediente WHERE cliente_id = c.id);
```

### 5.4 `004_documento_demo.sql`

```sql
INSERT INTO core.documento (id, expediente_id, tipo, nombre_original, hash, storage_path, mime_type, tamano_bytes, created_by, updated_by)
SELECT
  core.uuid_generate_v7(),
  e.id,
  'certificado_energetico',
  'certificado-demo.pdf',
  'demo-hash-placeholder',
  'expediente-docs/demo/certificado-demo.pdf',
  'application/pdf',
  0,
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000'
FROM core.expediente e
WHERE NOT EXISTS (SELECT 1 FROM core.documento WHERE expediente_id = e.id)
LIMIT 1;
```

---

## 6. Archivos que se Eliminan o Reemplazan

### 6.1 Migraciones originales (a eliminar tras validación)

```
supabase/migrations_v2/20260702_00001_create_expedientes.sql       → Eliminar
supabase/migrations_v2/20260703_00001_create_schema_core.sql        → Eliminar
supabase/migrations_v2/20260706_00001_refactor_cliente_mvp.sql      → Eliminar
supabase/migrations_v2/20260706_00002_create_inmueble.sql           → Eliminar
supabase/migrations_v2/20260707_00001_update_expedientes.sql        → Eliminar
supabase/migrations_v2/20260708_00001_create_core_expediente.sql    → Eliminar
supabase/migrations_v2/20260709_00001_create_core_documento.sql     → Eliminar
supabase/migrations_v2/20260710_00001_add_diagnostico_to_expediente.sql → Eliminar
supabase/migrations_v2/20260710_00001_create_storage_expediente.sql → Eliminar
supabase/migrations_v2/20260711_00001_add_dictamen.sql              → Eliminar
supabase/migrations_v2/20260712_00001_create_schema_commercial.sql  → Eliminar
```

### 6.2 Scripts de aplicación a revisar

```
scripts/apply-migration.mjs              → Posiblemente reemplazar
scripts/apply-migration-cliente.mjs      → Eliminar (obsoleto)
scripts/apply-migration-final.mjs        → Revisar
scripts/apply-migration-v3.mjs           → Revisar
scripts/apply-commercial-migration.mjs   → Reemplazar
scripts/apply-phase-a-expediente.mjs     → Eliminar (obsoleto)
scripts/apply-expediente-migration.mjs   → Eliminar (obsoleto)
scripts/apply-diagnostico-migration.mjs  → Eliminar (obsoleto)
scripts/apply-sql.mjs                    → Revisar
scripts/apply-sql-final.mjs              → Revisar
scripts/run-migration.mjs                → Revisar
```

---

## 7. Orden de Aplicación

### Primera ejecución (base de datos vacía)

```
1. supabase/migrations/202607150001_foundation.sql
2. supabase/migrations/202607150002_storage.sql
3. supabase/migrations/202607150003_commercial.sql
4. supabase/seeds/001_cliente_demo.sql
5. supabase/seeds/002_inmueble_demo.sql
6. supabase/seeds/003_expediente_demo.sql
7. supabase/seeds/004_documento_demo.sql
```

### Actualización (base de datos con migraciones_v2 aplicadas)

Se requiere un script de migración one-shot que:

1. Elimine `public.expedientes` (si existe)
2. Elimine `commercial.uuid_generate_v7()` (si existe)
3. Elimine `commercial.update_updated_at_column()` (si existe)
4. Elimine `commercial.increment_version()` (si existe)
5. Elimine `core.trigger_set_updated_at()` (si existe)
6. Elimine `core.increment_version_expediente()` (si existe)
7. Elimine `public.update_updated_at_column()` (si existe)
8. Añada columna `dictamen` y `diagnostico` si no existen en `core.expediente`

Luego aplicar las 3 migraciones nuevas (que son idempotentes y detectarán que ya existe todo).

---

## 8. Verificación Post-Migración

| # | Verificación | Comando |
|---|--------------|---------|
| 1 | Schema core existe | `SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'core')` |
| 2 | Schema commercial existe | Ídem |
| 3 | Tablas core existen | `SELECT tablename FROM pg_tables WHERE schemaname = 'core'` |
| 4 | Tablas commercial existen | `SELECT tablename FROM pg_tables WHERE schemaname = 'commercial'` |
| 5 | Funciones compartidas sin duplicados | `SELECT proname, nspname FROM pg_proc JOIN pg_namespace ON pronamespace = pg_namespace.oid WHERE proname IN ('uuid_generate_v7', 'update_updated_at_column', 'increment_version')` |
| 6 | Bucket storage existe | `SELECT name FROM storage.buckets WHERE name = 'expediente-docs'` |
| 7 | RLS activa en todas las tablas | `SELECT relname, relrowsecurity FROM pg_class WHERE relrowsecurity = true` |
| 8 | No hay tablas en public (salvo las de sistema) | `SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename NOT LIKE 'pg_%'` |

---

## 9. Resumen de Cambios Respecto al Estado Actual

| Aspecto | Antes (11 migraciones) | Después (3 migraciones + seeds) |
|---------|------------------------|---------------------------------|
| Número de archivos de migración | 11 | 3 |
| Funciones duplicadas | 7 | 0 |
| Seeds en estructura | 5 migraciones | 0 migraciones (todo en seeds/) |
| SQL no idempotente | 4 fragmentos | 0 |
| Políticas con nombre inconsistente | 12 | 0 |
| Nomenclatura triggers | 3 patrones distintos | 1 patrón unificado |
| Dependencias entre archivos | Crítica (orden exacto) | Ninguna (cada migración es autónoma) |
| `public.expedientes` | Tabla legacy activa | Eliminada |
| `estado_expediente` | Sin schema (público) | `core.estado_expediente` |

---

*Fin del plan de reorganización. Pendiente de aprobación para proceder con la implementación.*