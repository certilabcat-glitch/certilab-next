-- Migration: 003 - Create table core.inmueble
-- Description: Crea la tabla de inmuebles independiente del expediente.
--              El Arquitecto Técnico puede reutilizar el mismo inmueble durante años.
--              El expediente pertenece al inmueble, no al revés.
--              Optimizado para alimentar CE3X.
-- Based on: CF-020 Data Model §3.5, CF-030 PITR, CF-031, CF-032

-- ============================================================
-- STEP 1: Create enum types for Inmueble
-- ============================================================

DO $$ BEGIN
  CREATE TYPE core.tipo_inmueble AS ENUM (
    'piso', 'unifamiliar', 'local', 'oficina', 'industrial', 'otro'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE core.tipo_edificio AS ENUM (
    'bloque', 'adosado', 'aislado', 'pareado'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE core.uso_inmueble AS ENUM (
    'residencial', 'terciario', 'industrial', 'publico', 'otro'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE core.orientacion AS ENUM (
    'N', 'S', 'E', 'O', 'NE', 'NO', 'SE', 'SO', 'MIXTA'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE core.zona_climatica_cte AS ENUM (
    'A1', 'A2', 'A3', 'A4',
    'B1', 'B2', 'B3', 'B4',
    'C1', 'C2', 'C3', 'C4',
    'D1', 'D2', 'D3',
    'E1'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE core.zona_climatica_verano AS ENUM (
    '1', '2', '3', '4'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- STEP 2: Create table core.inmueble
-- ============================================================

CREATE TABLE IF NOT EXISTS core.inmueble (
  -- PK
  id UUID NOT NULL DEFAULT gen_random_uuid(),

  -- FK - Cliente propietario
  cliente_id UUID NOT NULL,

  -- Identificación catastral
  referencia_catastral VARCHAR(20),

  -- Dirección completa (CE3X requiere todos estos campos)
  direccion TEXT NOT NULL,
  municipio VARCHAR(150) NOT NULL,
  provincia VARCHAR(100) NOT NULL,
  codigo_postal VARCHAR(10) NOT NULL,

  -- Geolocalización (para CE3X cálculo de zona climática)
  latitud NUMERIC(10, 7),
  longitud NUMERIC(10, 7),
  altitud INTEGER,

  -- Clasificación del inmueble
  uso uso_inmueble NOT NULL DEFAULT 'residencial',
  tipo tipo_inmueble NOT NULL DEFAULT 'piso',
  tipo_edificio tipo_edificio,

  -- Superficies (CE3X: útil + construida)
  superficie_util NUMERIC(10, 2) CHECK (superficie_util IS NULL OR superficie_util > 0),
  superficie_construida NUMERIC(10, 2) CHECK (superficie_construida IS NULL OR superficie_construida > 0),

  -- Datos constructivos (CE3X)
  ano_construccion INTEGER CHECK (ano_construccion IS NULL OR (ano_construccion >= 1800 AND ano_construccion <= EXTRACT(YEAR FROM CURRENT_DATE) + 1)),
  numero_plantas INTEGER CHECK (numero_plantas IS NULL OR numero_plantas > 0),
  altura_libre NUMERIC(5, 2) CHECK (altura_libre IS NULL OR altura_libre > 0),

  -- Orientación (CE3X)
  orientacion_principal orientacion,
  orientacion_secundaria orientacion,

  -- Zonificación climática CTE (CE3X)
  zona_climatica_cte zona_climatica_cte,
  zona_climatica_verano zona_climatica_verano,

  -- Certificado energético existente
  certificado_existente_url TEXT,
  certificado_letra CHAR(1) CHECK (certificado_letra IS NULL OR certificado_letra IN ('A','B','C','D','E','F','G')),
  certificado_consumo NUMERIC(10, 2) CHECK (certificado_consumo IS NULL OR certificado_consumo >= 0),
  certificado_emisiones NUMERIC(10, 2) CHECK (certificado_emisiones IS NULL OR certificado_emisiones >= 0),

  -- Datos catastrales enriquecidos
  datos_catastrales JSONB,

  -- Observaciones del Arquitecto Técnico
  observaciones TEXT,

  -- Auditoría
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID NOT NULL,
  deleted_at TIMESTAMPTZ,
  deleted_by UUID,
  version INTEGER NOT NULL DEFAULT 1,

  -- Constraints
  CONSTRAINT pk_inmueble PRIMARY KEY (id),
  CONSTRAINT fk_inmueble_cliente FOREIGN KEY (cliente_id) REFERENCES core.cliente (id),
  CONSTRAINT uq_inmueble_refcat UNIQUE (referencia_catastral),
  CONSTRAINT ck_inmueble_version CHECK (version >= 1)
);

-- ============================================================
-- STEP 3: Create indexes
-- ============================================================

-- Búsqueda por cliente (principal patrón de acceso)
CREATE INDEX IF NOT EXISTS idx_inmueble_cliente_id
  ON core.inmueble (cliente_id)
  WHERE deleted_at IS NULL;

-- Búsqueda por referencia catastral
CREATE INDEX IF NOT EXISTS idx_inmueble_refcat
  ON core.inmueble (referencia_catastral)
  WHERE deleted_at IS NULL;

-- Búsqueda por código postal (para agrupaciones geográficas)
CREATE INDEX IF NOT EXISTS idx_inmueble_cp
  ON core.inmueble (codigo_postal)
  WHERE deleted_at IS NULL;

-- Búsqueda por municipio
CREATE INDEX IF NOT EXISTS idx_inmueble_municipio
  ON core.inmueble (municipio)
  WHERE deleted_at IS NULL;

-- Búsqueda por provincia
CREATE INDEX IF NOT EXISTS idx_inmueble_provincia
  ON core.inmueble (provincia)
  WHERE deleted_at IS NULL;

-- Índice compuesto para búsqueda geográfica avanzada
CREATE INDEX IF NOT EXISTS idx_inmueble_ubicacion
  ON core.inmueble (provincia, municipio, codigo_postal)
  WHERE deleted_at IS NULL;

-- Búsqueda por zona climática (útil para informes)
CREATE INDEX IF NOT EXISTS idx_inmueble_zona_climatica
  ON core.inmueble (zona_climatica_cte, zona_climatica_verano)
  WHERE deleted_at IS NULL;

-- Índice para datos eliminados (soft delete)
CREATE INDEX IF NOT EXISTS idx_inmueble_deleted_at
  ON core.inmueble (deleted_at)
  WHERE deleted_at IS NOT NULL;

-- ============================================================
-- STEP 4: Enable RLS
-- ============================================================

ALTER TABLE core.inmueble ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 5: Create RLS Policies
-- ============================================================

-- Policy 1: SELECT - Usuarios autenticados ven inmuebles de sus clientes
--           En V3: AND empresa_id IN (SELECT empresa_id FROM auth.users...)
CREATE POLICY "Usuarios pueden ver inmuebles de sus clientes"
  ON core.inmueble
  FOR SELECT
  TO authenticated
  USING (
    cliente_id IN (
      SELECT id FROM core.cliente
      WHERE usuario_id = auth.uid()
        OR auth.uid() IN (
          SELECT id FROM auth.users
          WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
        )
    )
  );

-- Policy 2: INSERT - Usuarios autenticados pueden crear inmuebles
CREATE POLICY "Usuarios pueden crear inmuebles"
  ON core.inmueble
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND
    cliente_id IN (
      SELECT id FROM core.cliente
      WHERE usuario_id = auth.uid()
        OR auth.uid() IN (
          SELECT id FROM auth.users
          WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
        )
    )
  );

-- Policy 3: UPDATE - Solo el propietario/cliente o admin puede actualizar
CREATE POLICY "Usuarios pueden actualizar inmuebles"
  ON core.inmueble
  FOR UPDATE
  TO authenticated
  USING (
    cliente_id IN (
      SELECT id FROM core.cliente
      WHERE usuario_id = auth.uid()
        OR auth.uid() IN (
          SELECT id FROM auth.users
          WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
        )
    )
  )
  WITH CHECK (
    cliente_id IN (
      SELECT id FROM core.cliente
      WHERE usuario_id = auth.uid()
        OR auth.uid() IN (
          SELECT id FROM auth.users
          WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
        )
    )
  );

-- Policy 4: DELETE - Solo service_role puede hard-delete
CREATE POLICY "Solo servicio puede hard-delete inmuebles"
  ON core.inmueble
  FOR DELETE
  TO service_role
  USING (true);

-- Policy 5: Service role tiene acceso completo
CREATE POLICY "Service role acceso completo inmuebles"
  ON core.inmueble
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- STEP 6: Create trigger for updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION core.trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_inmueble_set_updated_at'
  ) THEN
    CREATE TRIGGER trg_inmueble_set_updated_at
      BEFORE UPDATE ON core.inmueble
      FOR EACH ROW
      EXECUTE FUNCTION core.trigger_set_updated_at();
  END IF;
END;
$$;

-- ============================================================
-- STEP 7: Add table comments
-- ============================================================

COMMENT ON TABLE core.inmueble IS
  'Inmueble sobre el que se realiza el servicio. Independiente del expediente: el mismo inmueble puede tener múltiples expedientes. Optimizado para CE3X.';

COMMENT ON COLUMN core.inmueble.altitud IS 'Altitud en metros. Necesaria para cálculo CE3X de zona climática.';
COMMENT ON COLUMN core.inmueble.zona_climatica_cte IS 'Zona climática de invierno según CTE DB-HE (A1-E1). Se calcula automáticamente de coordenadas o se asigna manualmente.';
COMMENT ON COLUMN core.inmueble.zona_climatica_verano IS 'Zona climática de verano según CTE DB-HE (1-4).';
COMMENT ON COLUMN core.inmueble.superficie_util IS 'Superficie útil en m². Para CE3X.';
COMMENT ON COLUMN core.inmueble.superficie_construida IS 'Superficie construida en m². Para CE3X.';
COMMENT ON COLUMN core.inmueble.altura_libre IS 'Altura libre de plantas en metros. Para CE3X volumen.';
COMMENT ON COLUMN core.inmueble.referencia_catastral IS 'Referencia catastral de 20 dígitos. Única en el sistema.';
COMMENT ON COLUMN core.inmueble.observaciones IS 'Observaciones del Arquitecto Técnico durante la inspección.';
COMMENT ON COLUMN core.inmueble.datos_catastrales IS 'JSON con datos enriquecidos obtenidos del Catastro (Sede Electrónica).';
COMMENT ON COLUMN core.inmueble.version IS 'Optimistic locking. Se incrementa en cada actualización.';

-- ============================================================
-- STEP 8: Seed data
-- ============================================================

-- Insert demo inmueble (referencia catastral de demo: 1234567XX1234A_0001XX)
INSERT INTO core.inmueble (
  id,
  cliente_id,
  referencia_catastral,
  direccion,
  municipio,
  provincia,
  codigo_postal,
  latitud,
  longitud,
  altitud,
  uso,
  tipo,
  tipo_edificio,
  superficie_util,
  superficie_construida,
  ano_construccion,
  numero_plantas,
  altura_libre,
  orientacion_principal,
  zona_climatica_cte,
  zona_climatica_verano,
  certificado_existente_url,
  certificado_letra,
  certificado_consumo,
  certificado_emisiones,
  created_by,
  updated_by
)
SELECT
  '0191f1c0-0000-7000-8000-000000000100',
  id,
  '1234567XX1234A_0001XX',
  'Carrer del Comte d''Urgell 187, 3º 2ª',
  'Barcelona',
  'Barcelona',
  '08036',
  41.3874,
  2.1686,
  12,
  'residencial',
  'piso',
  'bloque',
  85.50,
  95.00,
  1975,
  5,
  2.50,
  'S',
  'C2',
  '3',
  'https://ejemplo.com/certificado.pdf',
  'E',
  180.50,
  32.10,
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000'
FROM core.cliente
WHERE email = 'cliente.demo@certilab.com'
  AND NOT EXISTS (
    SELECT 1 FROM core.inmueble WHERE referencia_catastral = '1234567XX1234A_0001XX'
  );