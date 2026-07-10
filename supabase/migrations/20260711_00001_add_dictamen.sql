-- Migration: Add dictamen column to core.expediente
-- Date: 2026-07-11
-- Purpose: Add JSONB column to store DictamenTecnico (formal opinion document)
-- 
-- This migration adds a single column to the existing core.expediente table
-- to store the formal technical opinion (dictamen) generated from the diagnosis.
-- 
-- The dictamen is a Value Object within the Expediente aggregate root.
-- It is immutable once emitted and incorporates a diagnostico_base snapshot.

-- Add dictamen column (nullable, populated only after emission)
ALTER TABLE core.expediente 
ADD COLUMN dictamen JSONB;

-- Add comment explaining the column
COMMENT ON COLUMN core.expediente.dictamen IS 
  'Dictamen técnico formal generado desde el diagnóstico. 
   Value Object inmutable tras emisión. 
   Estructura definida en DictamenTecnico (TypeScript).
   Contiene diagnostico_base (snapshot del diagnóstico en el momento de emisión),
   metadatos de emisión (emitido_por, emitido_en, version),
   y metadatos de entrega (entregado_a, entregado_en).';

-- Optional: Create index for filtering expedientes with emitted dictamen
CREATE INDEX idx_expediente_dictamen_emitido 
ON core.expediente (id) 
WHERE dictamen IS NOT NULL;
