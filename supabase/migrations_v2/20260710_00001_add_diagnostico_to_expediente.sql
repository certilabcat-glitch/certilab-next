-- Migration: 006 - Add diagnostico JSONB to core.expediente
-- Description: Añade la columna diagnostico (JSONB) a core.expediente para
--              persistir el Diagnóstico Técnico del Arquitecto Técnico.
--
-- Basado en: CF-020 Data Model, src/types/core/diagnostico.ts
--            Sprint 1 — Persistencia del Diagnóstico
--
-- Almacena exclusivamente un objeto que cumple el tipo DiagnosticoCompleto.
-- No se permiten estructuras libres ni formatos diferentes.
-- La validación se realiza en la capa de aplicación (server action) antes de persistir.
--
-- Orden de aplicación: AFTER 20260709_00001_create_core_documento.sql
--
-- ============================================================
-- ANÁLISIS PREVIO A LA EJECUCIÓN
-- ============================================================
-- ¿Qué hace?
--   1. Añade columna diagnostico JSONB a core.expediente
--   2. Añade columna diagnostico_version INTEGER (versionado del diagnóstico)
--   3. Añade columna estado_diagnostico TEXT (SinDiagnostico | Borrador | Completado)
--
-- ¿Es reversible?
--   SÍ. ALTER TABLE DROP COLUMN diagnostico, diagnostico_version, estado_diagnostico;
--
-- Riesgos:
--   - NINGUNO: columna nueva con DEFAULT, no afecta a datos existentes
--   - Las consultas existentes siguen funcionando sin cambios
-- ============================================================

-- ============================================================
-- STEP 1: Añadir columna diagnostico (JSONB)
-- Almacena el DiagnosticoCompleto validado
-- ============================================================
ALTER TABLE core.expediente
  ADD COLUMN IF NOT EXISTS diagnostico JSONB;

-- ============================================================
-- STEP 2: Añadir columna diagnostico_version
-- Versionado del diagnóstico para futuras revisiones.
-- Inicialmente siempre 1. Se incrementa cuando el AT actualiza el diagnóstico.
-- ============================================================
ALTER TABLE core.expediente
  ADD COLUMN IF NOT EXISTS diagnostico_version INTEGER NOT NULL DEFAULT 1;

-- ============================================================
-- STEP 3: Añadir columna estado_diagnostico
-- Máquina de estados simplificada del diagnóstico.
-- SinDiagnostico → Borrador → Completado
-- ============================================================
ALTER TABLE core.expediente
  ADD COLUMN IF NOT EXISTS estado_diagnostico TEXT NOT NULL DEFAULT 'SinDiagnostico';

-- ============================================================
-- STEP 4: Restricción CHECK que fuerza JSONB a ser object (no array ni scalar)
-- Garantiza que solo se almacenen objetos JSON, no se permiten arrays ni valores escalares.
-- ============================================================
ALTER TABLE core.expediente
  ADD CONSTRAINT ck_expediente_diagnostico_is_object
  CHECK (
    diagnostico IS NULL OR jsonb_typeof(diagnostico) = 'object'
  );

-- ============================================================
-- STEP 5: Restricción CHECK sobre estado_diagnostico
-- Solo valores permitidos por la máquina de estados
-- ============================================================
ALTER TABLE core.expediente
  ADD CONSTRAINT ck_expediente_estado_diagnostico
  CHECK (estado_diagnostico IN ('SinDiagnostico', 'Borrador', 'Completado'));

-- ============================================================
-- STEP 6: Restricción CHECK sobre diagnostico_version
-- ============================================================
ALTER TABLE core.expediente
  ADD CONSTRAINT ck_expediente_diagnostico_version
  CHECK (diagnostico_version >= 1);

-- ============================================================
-- STEP 7: Comentarios de las columnas
-- ============================================================
COMMENT ON COLUMN core.expediente.diagnostico IS
  'Diagnóstico Técnico del Arquitecto Técnico. Almacena un objeto DiagnosticoCompleto validado. ' ||
  'Sprint 1 — MVP. Sin IA, sin PITR, sin automatizaciones. Diagnóstico manual del AT.';

COMMENT ON COLUMN core.expediente.diagnostico_version IS
  'Versión del diagnóstico. Se incrementa en cada actualización. ' ||
  'Preparado para revisiones futuras sin rediseñar la persistencia.';

COMMENT ON COLUMN core.expediente.estado_diagnostico IS
  'Estado del diagnóstico en su máquina de estados simplificada. ' ||
  'SinDiagnostico → Borrador → Completado. ' ||
  'El diagnóstico se completa antes de aprobar el expediente.';