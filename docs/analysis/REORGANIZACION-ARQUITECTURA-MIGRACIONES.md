# Plan Arquitectónico de Reorganización de Migraciones

> **Rol:** Senior PostgreSQL Database Architect & Supabase Expert  
> **Fecha:** 2026-07-16  
> **Propósito:** Diseñar la nueva arquitectura de migraciones en exactamente 3 archivos  
> **Regla:** NO se modifica ningún archivo. Solo plan arquitectónico en Markdown.

---

## Vista General

```
Estado Actual                              Estado Destino
─────────────────────                      ─────────────────────
11 migraciones                             3 migraciones
supabase/migrations_v2/                    supabase/migrations_v2/
├── 20260702_00001_create_expedientes.sql
├── 20260703_00001_create_schema_core.sql
├── 20260706_00001_refactor_cliente_mvp.sql
├── 20260706_00002_create_inmueble.sql
├── 20260707_00001_update_expedientes.sql
├── 20260708_00001_create_core_expediente.sql     ──► 202607150001_foundation.sql
├── 20260709_00001_create_core_documento.sql      ──► 202607150001_foundation.sql
├── 20260710_00001_add_diagnostico_to_expediente.sql
├── 20260711_00001_add_dictamen.sql
├── 20260710_00001_create_storage_expediente.sql  ──► 202607150002_storage.sql
└── 20260712_00001_create_schema_commercial.sql   ──► 202607150003_commercial.sql
```

**Decisión arquitectónica:** Dictamen es Value Object JSONB dentro de `core.expediente`. NO es tabla independiente. Por tanto, no existe migración `dictamen.sql`. Todo lo relativo a dictamen se consolida dentro de Foundation como columna de `core.expediente`.

---

## Migración 1: `202607150001_foundation.sql`

### Propósito

Establecer la fundación completa del sistema Certilab: schemas, extensiones, funciones base, enums de dominio, tablas del núcleo (cliente, inmueble, expediente, documento) con todas sus columnas, índices, triggers, RLS políticas, y el seed de migración de datos legacy.

Es la migración más crítica. Debe ejecutarse en la base de datos vacía o sobre la existente respetando idempotencia.

### Dependencias

| Depende de | Tipo | Razón |
|------------|------|-------|
| Nada | — | Es la primera migración. No depende de ninguna otra. |
| Extensiones del sistema | externa | `pgcrypto` debe estar disponible en el proyecto Supabase (viene preinstalado). Se usa `CREATE EXTENSION IF NOT EXISTS` por seguridad. |

### Objetos Creados

| Categoría | Objeto | Schema | Notas |
|-----------|--------|--------|-------|
| **Schema** | `core` | — | Contenedor de todas las tablas de dominio |
| **Extension** | `pgcrypto` | `extensions` | Para funciones criptográficas |
| **Función** | `core.uuid_generate_v7()` | `core` | Genera UUID v7 time-ordered. **Única definición en todo el sistema.** |
| **Función** | `core.set_updated_at_column()` | `core` | Trigger function que asigna `NEW.updated_at = now()`. **Única definición.** |
| **Función** | `core.increment_version()` | `core` | Trigger function que hace `NEW.version = OLD.version + 1`. **Única definición.** |
| **Enum** | `core.tipo_inmueble` | `core` | Vivienda, LocalComercial, Oficina, NaveIndustrial, EdificioCompleto, Otro |
| **Enum** | `core.estado_inmueble` | `core` | Activo, Inactivo, Pendiente |
| **Enum** | `core.estado_expediente` | `core` | Borrador, Activo, Completado, Archivado, Cancelado |
| **Enum** | `core.tipo_documento` | `core` | CertificadoOriginal, InformeIA, DocumentacionComplementaria, GeneradoPorSistema |
| **Enum** | `core.estado_documento` | `core` | Pendiente, EnProceso, Completado, Error |
| **Tabla** | `core.cliente` | `core` | 17 columnas: id, user_id, nombre, apellidos, email, telefono, nif, direccion, poblacion, codigo_postal, provincia, pais, tipo_persona, created_at, updated_at, deleted_at, version |
| **Tabla** | `core.inmueble` | `core` | 24 columnas: id, cliente_id (FK→cliente), referencia_catastral, direccion, localidad, codigo_postal, provincia, tipo (enum), anyo_construccion, superficie, estado (enum), coordenadas (JSONB), created_at, updated_at, deleted_at, version + columnas técnicas |
| **Tabla** | `core.expediente` | `core` | **Completa desde creación.** 20 columnas: id, numero_expediente, cliente_id, inmueble_id, estado (enum), diagnostico (JSONB), diagnostico_version (INT DEFAULT 1), estado_diagnostico (TEXT DEFAULT 'SinDiagnostico'), dictamen (JSONB), metadata (JSONB), created_at, updated_at, deleted_at, version, created_by |
| **Tabla** | `core.documento` | `core` | 16 columnas: id, expediente_id (FK→expediente), tipo (enum), estado (enum), nombre_original, ruta_storage, tamano_bytes, mime_type, metadata (JSONB), created_at, updated_at, deleted_at, version |
| **Índice** | `idx_cliente_user_id` | `core` | UNIQUE sobre `core.cliente(user_id)` (WHERE deleted_at IS NULL) |
| **Índice** | `idx_cliente_email` | `core` | UNIQUE sobre `core.cliente(email)` (WHERE deleted_at IS NULL) |
| **Índice** | `idx_cliente_nif` | `core` | UNIQUE sobre `core.cliente(nif)` (WHERE deleted_at IS NULL) |
| **Índice** | `idx_cliente_deleted_at` | `core` | Sobre `core.cliente(deleted_at)` |
| **Índice** | `idx_inmueble_cliente_id` | `core` | Sobre `core.inmueble(cliente_id)` |
| **Índice** | `idx_inmueble_ref_catastral` | `core` | Sobre `core.inmueble(referencia_catastral)` |
| **Índice** | `idx_inmueble_direccion` | `core` | Sobre `core.inmueble(direccion)` |
| **Índice** | `idx_inmueble_deleted_at` | `core` | Sobre `core.inmueble(deleted_at)` |
| **Índice** | `idx_core_expediente_cliente_id` | `core` | Sobre `core.expediente(cliente_id)` |
| **Índice** | `idx_core_expediente_numero` | `core` | UNIQUE sobre `core.expediente(numero_expediente)` |
| **Índice** | `idx_core_expediente_estado` | `core` | Sobre `core.expediente(estado)` |
| **Índice** | `idx_core_expediente_deleted_at` | `core` | Sobre `core.expediente(deleted_at)` |
| **Índice** | `idx_documento_expediente_id` | `core` | Sobre `core.documento(expediente_id)` |
| **Índice** | `idx_documento_tipo` | `core` | Sobre `core.documento(tipo)` |
| **Índice** | `idx_documento_estado` | `core` | Sobre `core.documento(estado)` |
| **Índice** | `idx_documento_deleted_at` | `core` | Sobre `core.documento(deleted_at)` |
| **Trigger** | `trigger_set_updated_at_cliente` | `core.cliente` | BEFORE UPDATE, ejecuta `core.set_updated_at_column()` |
| **Trigger** | `trigger_increment_version_cliente` | `core.cliente` | BEFORE UPDATE, ejecuta `core.increment_version()` |
| **Trigger** | `trigger_set_updated_at_inmueble` | `core.inmueble` | BEFORE UPDATE |
| **Trigger** | `trigger_increment_version_inmueble` | `core.inmueble` | BEFORE UPDATE |
| **Trigger** | `trigger_set_updated_at_core_expediente` | `core.expediente` | BEFORE UPDATE |
| **Trigger** | `trigger_increment_version_core_expediente` | `core.expediente` | BEFORE UPDATE |
| **Trigger** | `trigger_set_updated_at_documento` | `core.documento` | BEFORE UPDATE |
| **Trigger** | `trigger_increment_version_documento` | `core.documento` | BEFORE UPDATE |
| **RLS** | `cliente_select_policy` | `core.cliente` | FOR SELECT USING (auth.uid() = user_id) |
| **RLS** | `cliente_insert_policy` | `core.cliente` | FOR INSERT WITH CHECK (auth.uid() = user_id) |
| **RLS** | `inmueble_select_policy` | `core.inmueble` | FOR SELECT usando cliente_id → user_id |
| **RLS** | `inmueble_insert_policy` | `core.inmueble` | FOR INSERT |
| **RLS** | `expediente_select_policy` | `core.expediente` | FOR SELECT |
| **RLS** | `expediente_insert_policy` | `core.expediente` | FOR INSERT |
| **RLS** | `expediente_update_policy` | `core.expediente` | FOR UPDATE |
| **RLS** | `documento_select_policy` | `core.documento` | FOR SELECT |
| **RLS** | `documento_insert_policy` | `core.documento` | FOR INSERT |
| **RLS** | `documento_update_policy` | `core.documento` | FOR UPDATE |

**Total: 45 objetos creados** (1 schema, 1 extension, 3 funciones, 5 enums, 4 tablas, 16 índices, 8 triggers, 10 políticas RLS).

### Orden de Ejecución

```
1. CREATE SCHEMA IF NOT EXISTS core
2. CREATE EXTENSION IF NOT EXISTS pgcrypto
3. CREATE OR REPLACE FUNCTION core.uuid_generate_v7()
4. CREATE OR REPLACE FUNCTION core.set_updated_at_column()
5. CREATE OR REPLACE FUNCTION core.increment_version()
6. CREATE TYPE core.tipo_inmueble AS ENUM (...)
7. CREATE TYPE core.estado_inmueble AS ENUM (...)
8. CREATE TYPE core.estado_expediente AS ENUM (...)
9. CREATE TYPE core.tipo_documento AS ENUM (...)
10. CREATE TYPE core.estado_documento AS ENUM (...)
11. CREATE TABLE core.cliente (...)
12. CREATE TABLE core.inmueble (...)
13. CREATE TABLE core.expediente (...)
14. CREATE TABLE core.documento (...)
15. CREATE INDEX ... (16 índices)
16. CREATE TRIGGER ... (8 triggers)
17. ALTER TABLE ... ENABLE ROW LEVEL SECURITY (4 tablas)
18. CREATE POLICY ... (10 políticas)
```

**Nota importante:** El orden de creación de tablas sigue la jerarquía de claves foráneas:
- `core.cliente` primero (no tiene FK a otras tablas core)
- `core.inmueble` segundo (FK → cliente)
- `core.expediente` tercero (FK → cliente, inmueble)
- `core.documento` cuarto (FK → expediente)

### Estrategia de Rollback

```sql
-- Orden inverso: primero dependientes, luego dependencias
DROP POLICY IF EXISTS documento_update_policy ON core.documento;
DROP POLICY IF EXISTS documento_insert_policy ON core.documento;
DROP POLICY IF EXISTS documento_select_policy ON core.documento;
DROP POLICY IF EXISTS expediente_update_policy ON core.expediente;
DROP POLICY IF EXISTS expediente_insert_policy ON core.expediente;
DROP POLICY IF EXISTS expediente_select_policy ON core.expediente;
DROP POLICY IF EXISTS inmueble_insert_policy ON core.inmueble;
DROP POLICY IF EXISTS inmueble_select_policy ON core.inmueble;
DROP POLICY IF EXISTS cliente_insert_policy ON core.cliente;
DROP POLICY IF EXISTS cliente_select_policy ON core.cliente;
DROP TRIGGER IF EXISTS trigger_increment_version_documento ON core.documento;
DROP TRIGGER IF EXISTS trigger_set_updated_at_documento ON core.documento;
DROP TRIGGER IF EXISTS trigger_increment_version_core_expediente ON core.expediente;
DROP TRIGGER IF EXISTS trigger_set_updated_at_core_expediente ON core.expediente;
DROP TRIGGER IF EXISTS trigger_increment_version_inmueble ON core.inmueble;
DROP TRIGGER IF EXISTS trigger_set_updated_at_inmueble ON core.inmueble;
DROP TRIGGER IF EXISTS trigger_increment_version_cliente ON core.cliente;
DROP TRIGGER IF EXISTS trigger_set_updated_at_cliente ON core.cliente;
DROP TABLE IF EXISTS core.documento CASCADE;
DROP TABLE IF EXISTS core.expediente CASCADE;
DROP TABLE IF EXISTS core.inmueble CASCADE;
DROP TABLE IF EXISTS core.cliente CASCADE;
DROP TYPE IF EXISTS core.estado_documento;
DROP TYPE IF EXISTS core.tipo_documento;
DROP TYPE IF EXISTS core.estado_expediente;
DROP TYPE IF EXISTS core.estado_inmueble;
DROP TYPE IF EXISTS core.tipo_inmueble;
DROP FUNCTION IF EXISTS core.increment_version();
DROP FUNCTION IF EXISTS core.set_updated_at_column();
DROP FUNCTION IF EXISTS core.uuid_generate_v7();
DROP SCHEMA IF EXISTS core CASCADE;
```

**Riesgo del rollback:** Si hay datos reales en producción, el DROP TABLE CASCADE destruye todos los datos. El rollback solo debe ejecutarse en desarrollo o si hay backup verificado.

### Estrategia de Idempotencia

| Constructo SQL | Estrategia |
|----------------|------------|
| `CREATE SCHEMA` | `IF NOT EXISTS` |
| `CREATE EXTENSION` | `IF NOT EXISTS` |
| `CREATE FUNCTION` | `CREATE OR REPLACE FUNCTION` |
| `CREATE TYPE` | `CREATE TYPE IF NOT EXISTS` (PostgreSQL 14 solo tiene `CREATE TYPE` sin IF NOT EXISTS nativo. Se resuelve con bloque PL/pgSQL: `DO $$ BEGIN ... EXCEPTION WHEN duplicate_object THEN NULL; END $$;`) |
| `CREATE TABLE` | `CREATE TABLE IF NOT EXISTS` |
| `CREATE INDEX` | `CREATE INDEX IF NOT EXISTS` |
| `CREATE TRIGGER` | `DROP TRIGGER IF EXISTS ... ; CREATE TRIGGER ... ;` (no existe CREATE OR REPLACE TRIGGER en PostgreSQL) |
| `ALTER TABLE ENABLE RLS` | Idempotente por naturaleza (ejecutar N veces es seguro) |
| `CREATE POLICY` | `DROP POLICY IF EXISTS ... ON ... ; CREATE POLICY ... ;` |

---

## Migración 2: `202607150002_storage.sql`

### Propósito

Crear el bucket de almacenamiento de objetos para documentos de expedientes y sus políticas RLS asociadas.

### Dependencias

| Depende de | Tipo | Razón |
|------------|------|-------|
| `202607150001_foundation.sql` | Migración anterior | No hay dependencia técnica directa (storage es independiente de core), pero el orden lógico exige que Foundation exista primero por coherencia del proyecto. Ningún objeto de storage referencia tablas de core. |

### Objetos Creados

| Categoría | Objeto | Notas |
|-----------|--------|-------|
| **Bucket** | `expediente-docs` | Privado, 20 MB, MIME types: application/pdf, image/jpeg, image/jpg, image/png, image/webp |
| **RLS Policy** | `expediente_docs_select_policy` | FOR SELECT ON storage.objects WHERE bucket_id = 'expediente-docs' AND auth.uid() = owner |
| **RLS Policy** | `expediente_docs_insert_policy` | FOR INSERT ON storage.objects WITH CHECK (bucket_id = 'expediente-docs') |
| **RLS Policy** | `expediente_docs_update_policy` | FOR UPDATE ON storage.objects USING (bucket_id = 'expediente-docs') |
| **RLS Policy** | `expediente_docs_delete_policy` | FOR DELETE ON storage.objects USING (bucket_id = 'expediente-docs') |

**Total: 5 objetos creados** (1 bucket, 4 políticas RLS).

### Orden de Ejecución

```
1. INSERT INTO storage.buckets (...) ON CONFLICT (id) DO NOTHING
2. CREATE POLICY expediente_docs_select_policy ON storage.objects FOR SELECT ...
3. CREATE POLICY expediente_docs_insert_policy ON storage.objects FOR INSERT ...
4. CREATE POLICY expediente_docs_update_policy ON storage.objects FOR UPDATE ...
5. CREATE POLICY expediente_docs_delete_policy ON storage.objects FOR DELETE ...
```

### Estrategia de Rollback

```sql
DROP POLICY IF EXISTS expediente_docs_delete_policy ON storage.objects;
DROP POLICY IF EXISTS expediente_docs_update_policy ON storage.objects;
DROP POLICY IF EXISTS expediente_docs_insert_policy ON storage.objects;
DROP POLICY IF EXISTS expediente_docs_select_policy ON storage.objects;
DELETE FROM storage.buckets WHERE id = 'expediente-docs';
```

**Riesgo:** Eliminar el bucket destruye todos los archivos almacenados. Rollback solo en desarrollo o con backup.

### Estrategia de Idempotencia

| Constructo SQL | Estrategia |
|----------------|------------|
| `INSERT INTO storage.buckets` | `ON CONFLICT (id) DO NOTHING` |
| `CREATE POLICY` | `DROP POLICY IF EXISTS ... ON storage.objects; CREATE POLICY ... ;` |

---

## Migración 3: `202607150003_commercial.sql`

### Propósito

Establecer el schema comercial completo: funciones base (NO duplicadas, referencian a core.*), tablas de negocio (customer, order, payment, contract, contract_document, audit_trail), índices, triggers y RLS.

### Dependencias

| Depende de | Tipo | Razón |
|------------|------|-------|
| `202607150001_foundation.sql` | Migración anterior | `commercial` usa `core.uuid_generate_v7()`, `core.set_updated_at_column()` y `core.increment_version()`. NO crea sus propias versiones. |

### Objetos Creados

| Categoría | Objeto | Schema | Dependencia en Foundation |
|-----------|--------|--------|--------------------------|
| **Schema** | `commercial` | `commercial` | Ninguna |
| **Función** | — | — | ❌ **NO se crea ninguna.** Se referencian las de core.* |
| **Tabla** | `commercial.customer` | `commercial` | Usa `core.uuid_generate_v7()` para DEFAULT |
| **Tabla** | `commercial.order` | `commercial` | Usa `core.uuid_generate_v7()`. FK → commercial.customer |
| **Tabla** | `commercial.payment` | `commercial` | Usa `core.uuid_generate_v7()`. FK → commercial.order |
| **Tabla** | `commercial.contract` | `commercial` | Usa `core.uuid_generate_v7()`. FK → commercial.customer |
| **Tabla** | `commercial.contract_document` | `commercial` | Usa `core.uuid_generate_v7()`. FK → commercial.contract |
| **Tabla** | `commercial.audit_trail` | `commercial` | Usa `core.uuid_generate_v7()` |
| **Índice** | `idx_customer_email` | `commercial.customer` | UNIQUE parcial (WHERE deleted_at IS NULL) |
| **Índice** | `idx_customer_document_id` | `commercial.customer` | UNIQUE parcial |
| **Índice** | `idx_customer_phone` | `commercial.customer` | UNIQUE parcial |
| **Índice** | `idx_customer_nif` | `commercial.customer` | UNIQUE parcial |
| **Índice** | `idx_customer_cif` | `commercial.customer` | UNIQUE parcial |
| **Índice** | `idx_customer_deleted_at` | `commercial.customer` | Índice de rendimiento |
| **Índice** | `idx_order_customer_id` | `commercial.order` | Índice de rendimiento |
| **Índice** | `idx_order_status` | `commercial.order` | Índice de rendimiento |
| **Índice** | `idx_order_created_at` | `commercial.order` | Índice de rendimiento |
| **Índice** | `idx_order_deleted_at` | `commercial.order` | Índice de rendimiento |
| **Índice** | `idx_payment_order_id` | `commercial.payment` | Índice de rendimiento |
| **Índice** | `idx_payment_status` | `commercial.payment` | Índice de rendimiento |
| **Índice** | `idx_contract_customer_id` | `commercial.contract` | Índice de rendimiento |
| **Índice** | `idx_contract_status` | `commercial.contract` | Índice de rendimiento |
| **Índice** | `idx_contract_deleted_at` | `commercial.contract` | Índice de rendimiento |
| **Índice** | `idx_contract_doc_contract_id` | `commercial.contract_document` | Índice de rendimiento |
| **Índice** | `idx_audit_trail_entity` | `commercial.audit_trail` | Índice de rendimiento |
| **Trigger** | `trigger_set_updated_at_customer` | `commercial.customer` | Usa `core.set_updated_at_column()` |
| **Trigger** | `trigger_increment_version_customer` | `commercial.customer` | Usa `core.increment_version()` |
| **Trigger** | `trigger_set_updated_at_order` | `commercial.order` | Usa `core.set_updated_at_column()` |
| **Trigger** | `trigger_increment_version_order` | `commercial.order` | Usa `core.increment_version()` |
| **Trigger** | `trigger_set_updated_at_payment` | `commercial.payment` | Usa `core.set_updated_at_column()` |
| **Trigger** | `trigger_set_updated_at_contract` | `commercial.contract` | Usa `core.set_updated_at_column()` |
| **Trigger** | `trigger_increment_version_contract` | `commercial.contract` | Usa `core.increment_version()` |
| **RLS Policy** | `customer_select_policy` | `commercial.customer` | FOR SELECT |
| **RLS Policy** | `customer_insert_policy` | `commercial.customer` | FOR INSERT |
| **RLS Policy** | `customer_update_policy` | `commercial.customer` | FOR UPDATE |
| **RLS Policy** | `customer_delete_policy` | `commercial.customer` | FOR DELETE |
| **RLS Policy** | `order_select_policy` | `commercial.order` | FOR SELECT |
| **RLS Policy** | `order_insert_policy` | `commercial.order` | FOR INSERT |
| **RLS Policy** | `order_update_policy` | `commercial.order` | FOR UPDATE |
| **RLS Policy** | `payment_select_policy` | `commercial.payment` | FOR SELECT |
| **RLS Policy** | `payment_insert_policy` | `commercial.payment` | FOR INSERT |
| **RLS Policy** | `contract_select_policy` | `commercial.contract` | FOR SELECT |
| **RLS Policy** | `contract_insert_policy` | `commercial.contract` | FOR INSERT |
| **RLS Policy** | `contract_update_policy` | `commercial.contract` | FOR UPDATE |
| **RLS Policy** | `contract_document_select_policy` | `commercial.contract_document` | FOR SELECT |
| **RLS Policy** | `contract_document_insert_policy` | `commercial.contract_document` | FOR INSERT |
| **RLS Policy** | `audit_trail_select_policy` | `commercial.audit_trail` | FOR SELECT |
| **RLS Policy** | `audit_trail_insert_policy` | `commercial.audit_trail` | FOR INSERT |

**Total: 48 objetos creados** (1 schema, 6 tablas, 19 índices, 7 triggers, 17 políticas RLS).

**Cambio crítico respecto a la migración original (#11):**
- ❌ `commercial.uuid_generate_v7()` — **ELIMINADA.** Se usa `core.uuid_generate_v7()`.
- ❌ `commercial.update_updated_at_column()` — **ELIMINADA.** Se usa `core.set_updated_at_column()`.
- ❌ `commercial.increment_version()` — **ELIMINADA.** Se usa `core.increment_version()`.

### Orden de Ejecución

```
1. CREATE SCHEMA IF NOT EXISTS commercial
2. CREATE TABLE commercial.customer (...)
3. CREATE TABLE commercial.order (...)
4. CREATE TABLE commercial.payment (...)
5. CREATE TABLE commercial.contract (...)
6. CREATE TABLE commercial.contract_document (...)
7. CREATE TABLE commercial.audit_trail (...)
8. CREATE INDEX ... (19 índices)
9. CREATE TRIGGER ... (7 triggers)
10. ALTER TABLE ... ENABLE ROW LEVEL SECURITY (6 tablas)
11. CREATE POLICY ... (17 políticas)
```

Orden de FK entre tablas:
- `commercial.customer` primero (sin FK a otras commercial)
- `commercial.order` segundo (FK → customer)
- `commercial.contract` segundo (FK → customer, paralelo a order)
- `commercial.payment` tercero (FK → order)
- `commercial.contract_document` tercero (FK → contract, paralelo a payment)
- `commercial.audit_trail` último (sin FK)

### Estrategia de Rollback

```sql
-- Orden inverso de creación
DROP POLICY IF EXISTS ... ON commercial.audit_trail;    (17 drops)
DROP TRIGGER IF EXISTS ... ON commercial.contract;       (7 drops)
DROP TABLE IF EXISTS commercial.audit_trail CASCADE;
DROP TABLE IF EXISTS commercial.contract_document CASCADE;
DROP TABLE IF EXISTS commercial.payment CASCADE;
DROP TABLE IF EXISTS commercial.contract CASCADE;
DROP TABLE IF EXISTS commercial.order CASCADE;
DROP TABLE IF EXISTS commercial.customer CASCADE;
DROP SCHEMA IF EXISTS commercial CASCADE;
```

### Estrategia de Idempotencia

| Constructo SQL | Estrategia |
|----------------|------------|
| `CREATE SCHEMA` | `IF NOT EXISTS` |
| `CREATE TABLE` | `IF NOT EXISTS` |
| `CREATE FUNCTION` | ❌ No aplica (commercial NO crea funciones) |
| `CREATE INDEX` | `IF NOT EXISTS` |
| `CREATE TRIGGER` | `DROP IF EXISTS ... ; CREATE TRIGGER ... ;` |
| `CREATE POLICY` | `DROP POLICY IF EXISTS ... ON ... ; CREATE POLICY ... ;` |

---

## Matriz Completa de Migración

> **Formato:** Objeto actual → Nueva migración  
> **Leyenda:** (m#) = migración original número #

### Schemas

| Objeto | Origen | Destino | Notas |
|--------|--------|---------|-------|
| `public` (implícito) | (m1, m5) | ❌ **ELIMINADO** | `public.expedientes` se elimina. Se usa `core.expediente`. |
| `core` | (m2) | `202607150001_foundation.sql` | Sin cambios |
| `commercial` | (m11) | `202607150003_commercial.sql` | Sin cambios |

### Extensiones

| Objeto | Origen | Destino | Notas |
|--------|--------|---------|-------|
| `pgcrypto` | (m2) | `202607150001_foundation.sql` | Se aplica en schema `extensions` |

### Funciones

| Objeto | Origen | Destino | Notas |
|--------|--------|---------|-------|
| `core.uuid_generate_v7()` | (m2) | `202607150001_foundation.sql` | Única fuente de verdad |
| `core.set_updated_at_column()` | (m2) | `202607150001_foundation.sql` | Única fuente de verdad |
| `core.increment_version()` | (m2) | `202607150001_foundation.sql` | Única fuente de verdad |
| `commercial.uuid_generate_v7()` | (m11) | ❌ **ELIMINADA** | Reemplazada por `core.uuid_generate_v7()` |
| `commercial.update_updated_at_column()` | (m11) | ❌ **ELIMINADA** | Reemplazada por `core.set_updated_at_column()` |
| `commercial.increment_version()` | (m11) | ❌ **ELIMINADA** | Reemplazada por `core.increment_version()` |

### Enums

| Objeto | Origen | Destino | Notas |
|--------|--------|---------|-------|
| `public.estado_expediente` | (m1) | ❌ **ELIMINADO** | Reemplazado por `core.estado_expediente` |
| `core.estado_expediente` | nuevo | `202607150001_foundation.sql` | Migrado desde public |
| `core.tipo_inmueble` | (m4) | `202607150001_foundation.sql` | Sin cambios |
| `core.estado_inmueble` | (m4) | `202607150001_foundation.sql` | Sin cambios |
| `core.tipo_documento` | (m7) | `202607150001_foundation.sql` | Sin cambios |
| `core.estado_documento` | (m7) | `202607150001_foundation.sql` | Sin cambios |

### Tablas

| Objeto | Origen | Destino | Notas |
|--------|--------|---------|-------|
| `public.expedientes` | (m1, m5) | ❌ **ELIMINADA** | Legacy. Reemplazada por `core.expediente`. Seed migrará datos. |
| `core.cliente` | (m3) | `202607150001_foundation.sql` | Sin cambios estructurales |
| `core.inmueble` | (m4) | `202607150001_foundation.sql` | Sin cambios |
| `core.expediente` | (m6) | `202607150001_foundation.sql` | **CONSOLIDADA**: incluye diagnostico (m8) + dictamen (m10) como columnas desde creación |
| `core.documento` | (m7) | `202607150001_foundation.sql` | Sin cambios |
| `commercial.customer` | (m11) | `202607150003_commercial.sql` | Sin cambios |
| `commercial.order` | (m11) | `202607150003_commercial.sql` | Sin cambios |
| `commercial.payment` | (m11) | `202607150003_commercial.sql` | Sin cambios |
| `commercial.contract` | (m11) | `202607150003_commercial.sql` | Sin cambios |
| `commercial.contract_document` | (m11) | `202607150003_commercial.sql` | Sin cambios |
| `commercial.audit_trail` | (m11) | `202607150003_commercial.sql` | Sin cambios |

### Columnas de `core.expediente` (consolidadas)

| Columna | Migración Original | En Foundation | Nota |
|---------|-------------------|---------------|------|
| `diagnostico JSONB` | (m8) — ALTER TABLE | ✅ En CREATE TABLE | Consolidado |
| `diagnostico_version INTEGER` | (m8) — ALTER TABLE | ✅ En CREATE TABLE | Consolidado |
| `estado_diagnostico TEXT` | (m8) — ALTER TABLE | ✅ En CREATE TABLE | Consolidado |
| `dictamen JSONB` | (m10) — ALTER TABLE | ✅ En CREATE TABLE | Consolidado |

### Índices

| Objeto | Origen | Destino |
|--------|--------|---------|
| `idx_expedientes_cliente_id` | (m1) | ❌ Eliminado (tabla legacy) |
| `idx_expedientes_estado` | (m1) | ❌ Eliminado |
| `idx_expedientes_created_at` | (m1) | ❌ Eliminado |
| `idx_expedientes_municipio` | (m1) | ❌ Eliminado |
| `idx_expedientes_deleted_at` | (m1) | ❌ Eliminado |
| `idx_cliente_user_id` | (m3) | `202607150001_foundation.sql` |
| `idx_cliente_email` | (m3) | `202607150001_foundation.sql` |
| `idx_cliente_nif` | (m3) | `202607150001_foundation.sql` |
| `idx_cliente_deleted_at` | (m3) | `202607150001_foundation.sql` |
| `idx_inmueble_cliente_id` | (m4) | `202607150001_foundation.sql` |
| `idx_inmueble_ref_catastral` | (m4) | `202607150001_foundation.sql` |
| `idx_inmueble_direccion` | (m4) | `202607150001_foundation.sql` |
| `idx_inmueble_deleted_at` | (m4) | `202607150001_foundation.sql` |
| `idx_core_expediente_cliente_id` | (m6) | `202607150001_foundation.sql` |
| `idx_core_expediente_numero` | (m6) | `202607150001_foundation.sql` |
| `idx_core_expediente_estado` | (m6) | `202607150001_foundation.sql` |
| `idx_core_expediente_deleted_at` | (m6) | `202607150001_foundation.sql` |
| `idx_documento_expediente_id` | (m7) | `202607150001_foundation.sql` |
| `idx_documento_tipo` | (m7) | `202607150001_foundation.sql` |
| `idx_documento_estado` | (m7) | `202607150001_foundation.sql` |
| `idx_documento_deleted_at` | (m7) | `202607150001_foundation.sql` |
| 5 índices customer | (m11) | `202607150003_commercial.sql` |
| 4 índices order | (m11) | `202607150003_commercial.sql` |
| 2 índices payment | (m11) | `202607150003_commercial.sql` |
| 4 índices contract | (m11) | `202607150003_commercial.sql` |
| 1 índice contract_document | (m11) | `202607150003_commercial.sql` |
| 1 índice audit_trail | (m11) | `202607150003_commercial.sql` |

### Triggers

| Objeto | Origen | Destino | Notas |
|--------|--------|---------|-------|
| `trigger_set_updated_at_expedientes` | (m1) | ❌ Eliminado (tabla legacy) |
| `trigger_set_updated_at_cliente` | (m3) | `202607150001_foundation.sql` |
| `trigger_increment_version_cliente` | (m3) | `202607150001_foundation.sql` |
| `trigger_set_updated_at_inmueble` | (m4) | `202607150001_foundation.sql` |
| `trigger_increment_version_inmueble` | (m4) | `202607150001_foundation.sql` |
| `trigger_set_updated_at_core_expediente` | (m6) | `202607150001_foundation.sql` |
| `trigger_increment_version_core_expediente` | (m6) | `202607150001_foundation.sql` |
| `trigger_set_updated_at_documento` | (m7) | `202607150001_foundation.sql` |
| `trigger_increment_version_documento` | (m7) | `202607150001_foundation.sql` |
| `trigger_set_updated_at_customer` | (m11) | `202607150003_commercial.sql` | Ahora usa `core.set_updated_at_column()` |
| `trigger_increment_version_customer` | (m11) | `202607150003_commercial.sql` | Ahora usa `core.increment_version()` |
| `trigger_set_updated_at_order` | (m11) | `202607150003_commercial.sql` | Ídem |
| `trigger_increment_version_order` | (m11) | `202607150003_commercial.sql` | Ídem |
| `trigger_set_updated_at_payment` | (m11) | `202607150003_commercial.sql` | Ídem |
| `trigger_set_updated_at_contract` | (m11) | `202607150003_commercial.sql` | Ídem |
| `trigger_increment_version_contract` | (m11) | `202607150003_commercial.sql` | Ídem |
| 2 triggers de commercial que usaban `commercial.*` | (m11) | `202607150003_commercial.sql` | Cambiado a `core.set_updated_at_column()` |

### RLS Policies

| Objeto | Origen | Destino |
|--------|--------|---------|
| `expedientes_select_policy` (public) | (m1) | ❌ Eliminado |
| `expedientes_insert_policy` (public) | (m1) | ❌ Eliminado |
| `cliente_select_policy` | (m3) | `202607150001_foundation.sql` |
| `cliente_insert_policy` | (m3) | `202607150001_foundation.sql` |
| `inmueble_select_policy` | (m4) | `202607150001_foundation.sql` |
| `inmueble_insert_policy` | (m4) | `202607150001_foundation.sql` |
| políticas expediente core (x3) | (m6) | `202607150001_foundation.sql` |
| políticas documento (x2) | (m7) | `202607150001_foundation.sql` |
| `expediente_docs_select_policy` (storage) | (m9) | `202607150002_storage.sql` |
| `expediente_docs_insert_policy` (storage) | (m9) | `202607150002_storage.sql` |
| `expediente_docs_update_policy` (storage) | (m9) | `202607150002_storage.sql` |
| `expediente_docs_delete_policy` (storage) | (m9) | `202607150002_storage.sql` |
| 17 políticas commercial | (m11) | `202607150003_commercial.sql` |

### Storage

| Objeto | Origen | Destino |
|--------|--------|---------|
| Bucket `expediente-docs` | (m9) | `202607150002_storage.sql` |

### Seeds (archivos separados)

| Seed | Contenido | Depende de | Propuesta de nombre |
|------|-----------|------------|---------------------|
| Migrar datos `public.expedientes` → `core.expediente` | INSERT...SELECT con transformación | Foundation | `seed_migrate_expedientes_legacy.sql` |
| Datos de ejemplo commercial | INSERTs de prueba | Commercial | `seed_commercial_sample.sql` |

---

## Resumen de Cambios Arquitectónicos

### Lo que se elimina

| Objeto | Tipo | Razón |
|--------|------|-------|
| `public.expedientes` | Tabla | Legacy, reemplazada por `core.expediente` |
| `public.estado_expediente` | Enum | Reemplazado por `core.estado_expediente` |
| 5 índices de public.expedientes | Índices | Tabla legacy |
| 2 políticas RLS de public.expedientes | Policies | Tabla legacy |
| 1 trigger de public.expedientes | Trigger | Tabla legacy |
| `commercial.uuid_generate_v7()` | Función | Duplicada. Usar `core.uuid_generate_v7()` |
| `commercial.update_updated_at_column()` | Función | Duplicada. Usar `core.set_updated_at_column()` |
| `commercial.increment_version()` | Función | Duplicada. Usar `core.increment_version()` |
| 7 ALTER TABLE ADD COLUMN | Operaciones | Columnas consolidadas en CREATE TABLE original |

### Lo que se consolida

| En lugar de 3 ALTER TABLE separados... | ...ahora 0 ALTER TABLE (todo en CREATE TABLE) |
|----------------------------------------|----------------------------------------------|
| Diagnóstico (m8) | En `CREATE TABLE core.expediente` |
| Dictamen (m10) | En `CREATE TABLE core.expediente` |

### Lo que se normaliza

| Antes | Después |
|-------|---------|
| 3 funciones de utilidad en commercial | 0 funciones en commercial. Referencia a core.* |
| 3 funciones de utilidad en core | 3 funciones de utilidad en core (única fuente) |
| Seeds mezclados en migraciones | Seeds en archivos separados |

---

## Plan de Ejecución Recomendado

### Fase 1: Preparación

1. Hacer backup completo de la base de datos actual
2. Verificar que todas las migraciones existentes están aplicadas
3. Verificar que no hay datos en `public.expedientes` sin migrar a `core.expediente`
4. Identificar todo código de aplicación que referencia `public.expedientes`

### Fase 2: Generación de Nuevas Migraciones

1. Generar `202607150001_foundation.sql`
2. Generar `202607150002_storage.sql`
3. Generar `202607150003_commercial.sql`
4. Generar `seed_migrate_expedientes_legacy.sql` (si hay datos legacy)

### Fase 3: Validación

1. Crear branch de Git
2. Aplicar migraciones en base de datos de desarrollo vacía
3. Verificar que todos los objetos existen
4. Ejecutar suite de tests
5. Verificar que la aplicación funciona

### Fase 4: Migración de Producción

1. Backup de producción
2. Aplicar nuevas migraciones
3. Verificar datos migrados
4. Dropear `public.expedientes` y objetos legacy
5. Eliminar `supabase/migrations_v2/` (archivos antiguos)

---

## Checklist de Verificación Arquitectónica

- [ ] Foundation crea schema `core` con `IF NOT EXISTS`
- [ ] Foundation crea `uuid_generate_v7()`, `set_updated_at_column()`, `increment_version()` UNA VEZ en `core.*`
- [ ] Foundation NO crea `commercial.uuid_generate_v7()`, `commercial.update_updated_at_column()`, `commercial.increment_version()`
- [ ] Foundation consolida las columnas `diagnostico`, `diagnostico_version`, `estado_diagnostico`, `dictamen` en `CREATE TABLE core.expediente`
- [ ] Foundation NO incluye `public.expedientes` ni sus objetos asociados
- [ ] Foundation NO incluye seeds DML (INSERT...SELECT)
- [ ] Storage crea bucket `expediente-docs` con `ON CONFLICT DO NOTHING`
- [ ] Storage crea 4 políticas RLS con `DROP IF EXISTS` previo
- [ ] Commercial crea schema `commercial` con `IF NOT EXISTS`
- [ ] Commercial NO crea funciones propias (referencia `core.*`)
- [ ] Commercial define triggers referenciando `core.set_updated_at_column()` y `core.increment_version()`
- [ ] Ninguna migración contiene `ALTER TABLE ADD COLUMN` (todo consolidado)
- [ ] Todas las migraciones son 100% idempotentes
- [ ] El orden de migraciones es: Foundation → Storage → Commercial
- [ ] Los seeds están en archivos separados
- [ ] Se ha verificado que ningún código en `src/` referencia `public.expedientes`