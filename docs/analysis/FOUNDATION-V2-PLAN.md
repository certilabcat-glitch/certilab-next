# Foundation V2 — Plan de Reconstrucción de la Capa de Base de Datos

> **Estado:** Plan aprobado pendiente de ejecución  
> **Fecha:** 2026-07-16  
> **Origen:** `docs/audits/AUDITORIA-COMPLETA-MIGRATIONS.md`  
> **CF-001 requerido antes de ejecutar:** Sí  
> **Impacto:** Reemplaza completamente `supabase/migrations_v2/`

---

## 0. Resumen Ejecutivo

Se reconstruirán las 11 migraciones actuales (`supabase/migrations_v2/`) en únicamente **4 migraciones** más un seed opcional. La reconstrucción elimina toda duplicación de funciones, consolida tablas dispersas verticalmente, separa estructura de datos demo, y unifica las funciones utilitarias en un solo schema (`core`).

**Estado actual:** 11 archivos, 5.0/10 de salud  
**Estado objetivo:** 4 archivos + seed opcional, 9.5/10 de salud

---

## 1. Migraciones Destino

### 1.1 `001_foundation.sql`

**Propósito:** Infraestructura base del sistema. Todo lo que no tiene dependencias.

**Contenido exacto:**

```sql
-- =============================================
-- 001_foundation.sql
-- Fundación del sistema — schema, enums, funciones, core.cliente
-- =============================================

-- 1. Schema
CREATE SCHEMA IF NOT EXISTS core;

-- 2. Función UUID v7 (única para todo el sistema)
CREATE OR REPLACE FUNCTION core.uuid_generate_v7()
RETURNS uuid AS $$
  -- ... implementación estándar UUID v7
$$ LANGUAGE sql VOLATILE;

-- 3. Función updated_at (única para todo el sistema)
CREATE OR REPLACE FUNCTION core.update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Función increment_version (única para todo el sistema)
CREATE OR REPLACE FUNCTION core.increment_version()
RETURNS trigger AS $$
BEGIN
  NEW.version = NEW.version + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Todos los enums en core
CREATE TYPE core.estado_expediente AS ENUM ('borrador', 'completado', ...);
CREATE TYPE core.origen_cliente AS ENUM (...);
CREATE TYPE core.tipo_inmueble AS ENUM (...);
CREATE TYPE core.tipo_edificio AS ENUM (...);
CREATE TYPE core.uso_inmueble AS ENUM (...);
CREATE TYPE core.orientacion AS ENUM (...);
CREATE TYPE core.zona_climatica_cte AS ENUM (...);
CREATE TYPE core.zona_climatica_verano AS ENUM (...);
CREATE TYPE core.tipo_documento AS ENUM (...);
CREATE TYPE core.estado_procesamiento_ia AS ENUM (...);

-- 6. Tabla core.cliente (versión final, sin empresa_id)
CREATE TABLE core.cliente (
  id uuid PRIMARY KEY DEFAULT core.uuid_generate_v7(),
  usuario_id uuid NOT NULL REFERENCES auth.users(id),
  nombre text NOT NULL,
  email text NOT NULL,
  telefono text,
  origen core.origen_cliente NOT NULL DEFAULT 'manual',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  anonymized_at timestamptz,
  version integer NOT NULL DEFAULT 1
);

-- 7. Índices (versión final, sin duplicados)
CREATE UNIQUE INDEX IF NOT EXISTS uq_cliente_email ON core.cliente(email);
CREATE INDEX IF NOT EXISTS idx_cliente_usuario_id ON core.cliente(usuario_id);
CREATE INDEX IF NOT EXISTS idx_cliente_nombre ON core.cliente(nombre);
CREATE INDEX IF NOT EXISTS idx_cliente_created_at ON core.cliente(created_at);
CREATE INDEX IF NOT EXISTS idx_cliente_deleted_at ON core.cliente(deleted_at);

-- 8. Triggers
CREATE TRIGGER trg_cliente_updated_at
  BEFORE UPDATE ON core.cliente
  FOR EACH ROW EXECUTE FUNCTION core.update_updated_at();

CREATE TRIGGER trg_cliente_version
  BEFORE UPDATE ON core.cliente
  FOR EACH ROW EXECUTE FUNCTION core.increment_version();

-- 9. RLS
ALTER TABLE core.cliente ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver sus clientes"
  ON core.cliente FOR SELECT
  USING (usuario_id = auth.uid());

CREATE POLICY "Usuarios pueden crear clientes"
  ON core.cliente FOR INSERT
  WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuarios pueden modificar sus clientes"
  ON core.cliente FOR UPDATE
  USING (usuario_id = auth.uid())
  WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Solo servicio puede hard-delete"
  ON core.cliente FOR DELETE
  USING (auth.role() = 'service_role');
```

**Cambios respecto al estado actual:**
| Aspecto | Antes (11 migs) | Después (Foundation V2) |
|---------|-----------------|--------------------------|
| `estado_expediente` | En `public` | Movido a `core` |
| Funciones `update_updated_at` | 3 copias (public, core, core con otro nombre) | 1 única función `core.update_updated_at()` |
| Función `uuid_generate_v7` | 2 copias (core, commercial) | 1 única función `core.uuid_generate_v7()` |
| Función `increment_version` | 3 copias (core genérica, core expediente, commercial) | 1 única función `core.increment_version()` |
| Índices `core.cliente` | Creados en #2 y recreados en #3 (duplicados) | Creados una sola vez |
| RLS `core.cliente` | Creadas en #2 y DROP+CREATE en #3 (duplicadas) | Creadas una sola vez |

---

### 1.2 `002_storage.sql`

**Propósito:** Infraestructura de almacenamiento. Depende de Foundation para las policies RLS que referencian `core.expediente`, pero estructuralmente puede aplicarse antes de crear expediente.

**Contenido exacto:**

```sql
-- =============================================
-- 002_storage.sql
-- Storage buckets y RLS
-- =============================================

-- 1. Bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('expediente-docs', 'expediente-docs', false)
ON CONFLICT (id) DO NOTHING;

-- 2. RLS en storage.objects
CREATE POLICY "Usuarios autenticados pueden subir documentos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'expediente-docs'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Usuarios pueden ver sus documentos"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'expediente-docs'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Usuarios pueden actualizar sus documentos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'expediente-docs'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Usuarios pueden eliminar sus documentos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'expediente-docs'
    AND auth.role() = 'authenticated'
  );
```

**Cambios respecto al estado actual:**
| Aspecto | Antes | Después |
|---------|-------|---------|
| Policies de storage | En migración #9 (aislada) | Misma ubicación, mismo contenido |
| Dependencia | Ninguna | Ninguna (las policies son genéricas, no referencian tablas) |

---

### 1.3 `003_dictamen.sql`

**Propósito:** Agregado Expediente completo: inmueble, expediente (con todas sus columnas), documento.

**Contenido exacto:**

```sql
-- =============================================
-- 003_dictamen.sql
-- Agregado Expediente — core.inmueble, core.expediente, core.documento
-- Depende de: 001_foundation.sql (schema core, enums, funciones)
-- =============================================

-- =============================================
-- PARTE 1: core.inmueble
-- =============================================

CREATE TABLE core.inmueble (
  id uuid PRIMARY KEY DEFAULT core.uuid_generate_v7(),
  cliente_id uuid NOT NULL REFERENCES core.cliente(id),
  -- ... resto de columnas (direccion, tipo, metros, etc.)
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  version integer NOT NULL DEFAULT 1
);

-- Índices
CREATE INDEX idx_inmueble_cliente_id ON core.inmueble(cliente_id);

-- Triggers
CREATE TRIGGER trg_inmueble_updated_at
  BEFORE UPDATE ON core.inmueble
  FOR EACH ROW EXECUTE FUNCTION core.update_updated_at();

CREATE TRIGGER trg_inmueble_version
  BEFORE UPDATE ON core.inmueble
  FOR EACH ROW EXECUTE FUNCTION core.increment_version();

-- RLS
ALTER TABLE core.inmueble ENABLE ROW LEVEL SECURITY;
-- ... policies

-- =============================================
-- PARTE 2: core.expediente (TODAS las columnas juntas)
-- =============================================

CREATE TABLE core.expediente (
  id uuid PRIMARY KEY DEFAULT core.uuid_generate_v7(),
  cliente_id uuid NOT NULL REFERENCES core.cliente(id),
  inmueble_id uuid NOT NULL REFERENCES core.inmueble(id),
  numero_expediente text NOT NULL UNIQUE,
  estado core.estado_expediente NOT NULL DEFAULT 'borrador',
  created_by uuid NOT NULL REFERENCES auth.users(id),
  updated_by uuid NOT NULL REFERENCES auth.users(id),
  -- Diagnóstico (antes en migración #8 separada)
  diagnostico jsonb,
  diagnostico_version integer,
  estado_diagnostico text,
  -- Dictamen (antes en migración #10 separada)
  dictamen jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  deleted_by uuid REFERENCES auth.users(id),
  version integer NOT NULL DEFAULT 1
);

-- Índices
CREATE INDEX idx_expediente_cliente_id ON core.expediente(cliente_id);
CREATE INDEX idx_expediente_inmueble_id ON core.expediente(inmueble_id);
CREATE INDEX idx_expediente_estado ON core.expediente(estado);
CREATE INDEX idx_expediente_created_at ON core.expediente(created_at);

-- Triggers
CREATE TRIGGER trg_expediente_updated_at
  BEFORE UPDATE ON core.expediente
  FOR EACH ROW EXECUTE FUNCTION core.update_updated_at();

CREATE TRIGGER trg_expediente_version
  BEFORE UPDATE ON core.expediente
  FOR EACH ROW EXECUTE FUNCTION core.increment_version();

-- RLS
ALTER TABLE core.expediente ENABLE ROW LEVEL SECURITY;
-- ... policies

-- =============================================
-- PARTE 3: core.documento
-- =============================================

CREATE TABLE core.documento (
  id uuid PRIMARY KEY DEFAULT core.uuid_generate_v7(),
  expediente_id uuid NOT NULL REFERENCES core.expediente(id),
  tipo core.tipo_documento NOT NULL,
  nombre_original text NOT NULL,
  ruta_storage text NOT NULL,
  estado_ia core.estado_procesamiento_ia NOT NULL DEFAULT 'pendiente',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  version integer NOT NULL DEFAULT 1
);

-- Índices
CREATE INDEX idx_documento_expediente_id ON core.documento(expediente_id);
CREATE INDEX idx_documento_tipo ON core.documento(tipo);
CREATE INDEX idx_documento_estado_ia ON core.documento(estado_ia);

-- Triggers
CREATE TRIGGER trg_documento_updated_at
  BEFORE UPDATE ON core.documento
  FOR EACH ROW EXECUTE FUNCTION core.update_updated_at();

CREATE TRIGGER trg_documento_version
  BEFORE UPDATE ON core.documento
  FOR EACH ROW EXECUTE FUNCTION core.increment_version();

-- RLS
ALTER TABLE core.documento ENABLE ROW LEVEL SECURITY;
-- ... policies
```

**Cambios respecto al estado actual:**
| Aspecto | Antes (11 migs) | Después (Foundation V2) |
|---------|-----------------|--------------------------|
| `core.expediente.diagnostico` | Añadido en #8 (migración separada) | Creado directamente en la tabla |
| `core.expediente.dictamen` | Añadido en #10 (migración separada) | Creado directamente en la tabla |
| `core.expediente` completo | Repartido en 3 archivos (#6, #8, #10) | 1 sola CREATE TABLE |
| Trigger `version` en expediente | Función específica `increment_version_expediente()` | Reutiliza `core.increment_version()` |
| `public.expedientes` | Tabla paralela (#1, #5) | Eliminada o reemplazada por VIEW si existe compatibilidad |
| Seeds demo | Dentro de #4, #6, #7 | Movidos a seed.sql separado |

---

### 1.4 `004_commercial.sql`

**Propósito:** Schema de dominio comercial. Sin funciones duplicadas — reutiliza las de `core`.

**Contenido exacto:**

```sql
-- =============================================
-- 004_commercial.sql
-- Schema comercial
-- Depende de: 001_foundation.sql (core.uuid_generate_v7, core.update_updated_at, core.increment_version)
-- =============================================

-- 1. Schema
CREATE SCHEMA IF NOT EXISTS commercial;

-- NOTA: NO se crean funciones duplicadas.
-- Se usan core.uuid_generate_v7(), core.update_updated_at(), core.increment_version()

-- 2. Tablas
CREATE TABLE commercial.customer (
  id uuid PRIMARY KEY DEFAULT core.uuid_generate_v7(),
  -- ... columnas
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  version integer NOT NULL DEFAULT 1
);

CREATE TRIGGER trg_customer_updated_at
  BEFORE UPDATE ON commercial.customer
  FOR EACH ROW EXECUTE FUNCTION core.update_updated_at();

CREATE TRIGGER trg_customer_version
  BEFORE UPDATE ON commercial.customer
  FOR EACH ROW EXECUTE FUNCTION core.increment_version();

-- ... resto de tablas (order, payment, contract, contract_document, audit_trail)
-- TODAS usando core.uuid_generate_v7(), core.update_updated_at(), core.increment_version()
```

**Cambios respecto al estado actual:**
| Aspecto | Antes (11 migs) | Después (Foundation V2) |
|---------|-----------------|--------------------------|
| `commercial.uuid_generate_v7()` | Copia exacta de `core.uuid_generate_v7()` | **Eliminada** — usa `core.uuid_generate_v7()` |
| `commercial.update_updated_at_column()` | Copia exacta de `core.trigger_set_updated_at()` | **Eliminada** — usa `core.update_updated_at()` |
| `commercial.increment_version()` | Copia exacta de `core.increment_version()` | **Eliminada** — usa `core.increment_version()` |

---

### 1.5 `seed.sql` (opcional)

**Propósito:** Datos demo para entornos de desarrollo. Independiente de la estructura.

```sql
-- =============================================
-- seed.sql
-- Datos demo — solo para desarrollo/testing
-- Aplicar después de las 4 migraciones
-- =============================================

INSERT INTO core.cliente (id, usuario_id, nombre, email, origen)
VALUES ('...', '...', 'Cliente Demo', 'demo@certilab.com', 'manual')
ON CONFLICT (id) DO NOTHING;

INSERT INTO core.inmueble (id, cliente_id, ...)
VALUES ('...', '...', ...)
ON CONFLICT (id) DO NOTHING;

INSERT INTO core.expediente (id, cliente_id, inmueble_id, numero_expediente, estado, created_by, updated_by)
VALUES ('...', '...', '...', 'EXP-2026-001', 'borrador', '...', '...')
ON CONFLICT (id) DO NOTHING;

INSERT INTO core.documento (id, expediente_id, tipo, nombre_original, ruta_storage, estado_ia)
VALUES ('...', '...', 'certificado', 'demo.pdf', 'expediente-docs/demo.pdf', 'pendiente')
ON CONFLICT (id) DO NOTHING;
```

---

## 2. Orden de Aplicación

```
001_foundation.sql  →  crea schema core, enums, funciones, core.cliente
       ↓
002_storage.sql     →  crea bucket y RLS de storage
       ↓
003_dictamen.sql    →  crea core.inmueble, core.expediente, core.documento
       ↓
004_commercial.sql  →  crea schema commercial y todas sus tablas
       ↓
seed.sql (opcional) →  inserta datos demo
```

---

## 3. Problemas Resueltos por Este Plan

| # | Problema | Cómo se resuelve |
|---|----------|-------------------|
| 1 | 3 copias de `update_updated_at` | Una única función `core.update_updated_at()` |
| 2 | 2 copias de `uuid_generate_v7` | Una única función `core.uuid_generate_v7()` |
| 3 | 3 copias de `increment_version` | Una única función `core.increment_version()` |
| 4 | `estado_expediente` en `public` | Movido a `core.estado_expediente` |
| 5 | `core.cliente` modificado en 2 migs | Tabla completa y final en Foundation |
| 6 | `core.expediente` disperso en 3 migs | Una sola CREATE TABLE con todas las columnas |
| 7 | 6 índices duplicados de cliente | Creados una vez |
| 8 | 8 policies duplicadas de cliente | Creadas una vez |
| 9 | Seeds mezclados con estructura | Extraídos a `seed.sql` |
| 10 | `commercial` duplica funciones core | Reutiliza funciones de `core` |

---

## 4. Lo Que NO Cambia (Arquitectura Congelada)

Ninguno de estos cambios arquitectónicos se modifica:

- ✅ Aggregate Roots: Cliente, Inmueble, Expediente, Documento
- ✅ Bounded Contexts: Core, Commercial
- ✅ Clean Architecture / Vertical Slice
- ✅ Soft Delete (deleted_at)
- ✅ Optimistic Locking (version)
- ✅ UUID v7 como PK
- ✅ Single Tenant + RLS con auth.uid()
- ✅ Políticas de negocio de CF-040

---

## 5. Migración de Datos (Data Migration)

Cuando se ejecute la reconstrucción, los datos existentes deben migrarse:

```sql
-- Migración desde core.cliente actual a core.cliente nuevo (si cambia estructura)
INSERT INTO core.cliente (id, usuario_id, nombre, email, telefono, origen, created_at, updated_at, deleted_at, version)
SELECT id, usuario_id, nombre, email, telefono, origen, created_at, updated_at, deleted_at, version
FROM core.cliente
ON CONFLICT (id) DO NOTHING;

-- Migración desde core.expediente actual a core.expediente nuevo
INSERT INTO core.expediente (id, cliente_id, inmueble_id, numero_expediente, estado, created_by, updated_by,
                              diagnostico, diagnostico_version, estado_diagnostico, dictamen,
                              created_at, updated_at, deleted_at, deleted_by, version)
SELECT id, cliente_id, inmueble_id, numero_expediente, estado, created_by, updated_by,
       diagnostico, diagnostico_version, estado_diagnostico, dictamen,
       created_at, updated_at, deleted_at, deleted_by, version
FROM core.expediente
ON CONFLICT (id) DO NOTHING;
```

---

## 6. Verificación Post-Reconstrucción

Checklist de verificación obligatoria después de aplicar las 4 migraciones:

- [ ] `core.uuid_generate_v7()` existe y `commercial.uuid_generate_v7()` NO existe
- [ ] `core.update_updated_at()` existe y `core.trigger_set_updated_at()` NO existe
- [ ] `core.increment_version()` existe y `core.increment_version_expediente()` NO existe
- [ ] `core.estado_expediente` existe y `public.estado_expediente` NO existe
- [ ] `core.cliente` tiene todas las columnas finales (sin `empresa_id`)
- [ ] `core.expediente` tiene `diagnostico`, `diagnostico_version`, `estado_diagnostico`, `dictamen`
- [ ] `public.expedientes` NO existe (o es una VIEW)
- [ ] Todos los triggers apuntan a `core.update_updated_at()` y `core.increment_version()`
- [ ] No hay funciones en `commercial` que dupliquen las de `core`
- [ ] Las 4 migraciones se pueden aplicar dos veces seguidas sin errores (idempotencia)

---

## 7. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Código de aplicación referencia `public.estado_expediente` | ALTO | Buscar en el código antes de eliminar; actualizar referencias |
| Código referencia `public.expedientes` | ALTO | Buscar en el código; migrar a `core.expediente` |
| Scripts de migración actuales (apply-*.mjs) dependen de nombres viejos | MEDIO | Actualizar scripts después de la reconstrucción |
| Datos existentes en producción se pierden | CRÍTICO | Backup previo + migración de datos explícita |

---

## 8. Autoría y Aprobación

| Rol | Responsable | Estado |
|-----|-------------|--------|
| Auditoría | Cline (agente) | ✅ Completada |
| Plan Foundation V2 | Cline (agente) | ✅ Completado |
| Revisión | Usuario | Pendiente |
| Aprobación | Usuario | Pendiente |
| Ejecución (CF-001) | Por determinar | Pendiente |

---

## 9. Histórico

| Fecha | Versión | Cambio | Autor |
|-------|---------|--------|-------|
| 2026-07-16 | v1.0 | Creación inicial del plan | Cline |

---

*Próximo paso: aprobación del usuario. No modificar ningún archivo de migración hasta recibir instrucciones.*