# EP-026 — GAP Analysis: Expediente Table vs CF-020 Canonical Model

> **Propósito:** Identificar todas las brechas entre la implementación actual de `expedientes` y el modelo canónico definido en `CF-020 §3.7`.
>
> **Elaborado:** 2026-07-04
>
> **Fuentes:**
> - `docs/CF-020-DATA-MODEL.md` §3.7 — Modelo canónico `core.expediente`
> - `supabase/migrations/20260702_00001_create_expedientes.sql` — MVP inicial
> - `supabase/migrations/20260707_00001_update_expedientes.sql` — V1 audit trail
> - `src/types/expediente-mvp.ts` — TypeScript MVP actual

---

## 1. Estado Actual de `expedientes`

La tabla `expedientes` ha pasado por dos migraciones:

| Migración | Estado | Schema | Propósito |
|-----------|--------|--------|-----------|
| `20260702_00001` | ✅ Aplicada | `public` | MVP Segunda Opinión |
| `20260707_00001` | 🟡 Sin aplicar | `public` | V1 audit trail (inmueble FK, trazabilidad, soft delete) |

**Schema actual:** `public.expedientes` (no `core.expediente`)
**Tabla intermedia (V1 migration):** `public.expedientes` con columnas añadidas

---

## 2. Comparativa: Columnas DB vs CF-020

### 2.1 Columnas EXISTENTES (mapeadas correctamente)

| CF-020 Canónico | DB Actual | Estado | Notas |
|-----------------|-----------|--------|-------|
| `id` | `id` | ✅ | UUID, PK |
| `cliente_id` | `cliente_id` | ✅ | FK → `auth.users` (MVP) / `core.cliente` (futuro) |
| `estado` | `estado` | ✅ | `estado_expediente` ENUM |
| `created_at` | `created_at` | ✅ | |
| `updated_at` | `updated_at` | ✅ | |
| `inmueble_id` | *(añadido en V1 mig.)* | ✅ (pendiente aplicar) | FK → `core.inmueble` nullable |
| `created_by` | *(añadido en V1 mig.)* | ✅ (pendiente aplicar) | |
| `updated_by` | *(añadido en V1 mig.)* | ✅ (pendiente aplicar) | |
| `deleted_at` | *(añadido en V1 mig.)* | ✅ (pendiente aplicar) | |
| `deleted_by` | *(añadido en V1 mig.)* | ✅ (pendiente aplicar) | |
| `version` | *(añadido en V1 mig.)* | ✅ (pendiente aplicar) | Optimistic locking |

### 2.2 Columnas EXISTENTES pero con nombre/tipo incorrecto

| CF-020 Canónico | DB Actual | Brecha | Severidad |
|-----------------|-----------|--------|-----------|
| `numero_visible` | `numero_expediente` | Nombre distinto. Ambos son `TEXT`/`VARCHAR(20)` | 🔴 Media |
| `notas_internas` | `notas` | Nombre distinto. Ambos `TEXT` nullable | 🟢 Baja |
| *(no existe)* | `servicio` | Columna extra MVP (`VARCHAR NOT NULL DEFAULT 'segunda_opinion'`). Canónico usa FK `servicio_id` | 🔴 Alta |
| *(no existe)* | `titulo` | Columna extra MVP (`TEXT` nullable). No definida en canónico | 🟢 Baja |

### 2.3 Columnas FALTANTES (definidas en CF-020, no implementadas)

| CF-020 Canónico | Tipo | Obligatorio | Severidad | Justificación |
|-----------------|------|-------------|-----------|---------------|
| `empresa_id` | UUID (FK) | ✅ | 🔴 Alta | FK a empresa (single tenant V1, pero necesario para arquitectura) |
| `servicio_id` | UUID (FK) | ✅ | 🔴 Alta | FK a servicio. Actualmente es VARCHAR libre |
| `tecnico_asignado_id` | UUID (FK) | ❌ | 🟡 Media | FK a usuario (técnico). Funcionalidad V1 planificada |
| `prioridad` | VARCHAR(20) | ❌ | 🟢 Baja | 'baja','media','alta','urgente'. MVP no requiere |
| `progreso` | INTEGER | ❌ | 🟢 Baja | 0-100. Para seguimiento |
| `fecha_inicio` | TIMESTAMPTZ | ❌ | 🟡 Media | Inicio del servicio |
| `fecha_limite` | TIMESTAMPTZ | ✅ | 🔴 Alta | Deadline. No implementada |
| `fecha_cierre` | TIMESTAMPTZ | ❌ | 🟡 Media | Cierre del expediente |
| `dictamen` | VARCHAR(30) | ❌ | 🟡 Media | 'CORRECTO','INFLADO','MAL_CALCULADO','FALSEADO' |
| `letra_original` | CHAR(1) | ❌ | 🟡 Media | Letra del certificado auditado (A-G) |
| `letra_certilab` | CHAR(1) | ❌ | 🟡 Media | Letra según dictamen |
| `informe_url` | TEXT | ❌ | 🟡 Media | URL del informe final en PDF |
| `tags` | TEXT[] | ❌ | 🟢 Baja | Etiquetas para búsqueda |
| `config` | JSONB | ❌ | 🟢 Baja | Configuración específica del expediente |
| `consent_id` | UUID (FK) | ✅ | 🔴 Alta | FK a core.consentimiento. RGPD obligatorio |
| `retention_days` | INTEGER | ✅ | 🔴 Alta | Días de retención (default 2190). RGPD |
| `anonymized_at` | TIMESTAMPTZ | ❌ | 🟡 Media | Fecha de anonimización |

### 2.4 Resumen cuantitativo

| Métrica | Valor |
|---------|-------|
| Columnas totales en CF-020 canónico | **30** |
| Columnas implementadas correctamente | **5** (MVP) + **6** (V1 pendiente) = **11** |
| Columnas con nombre incorrecto | **2** (numero_expediente, notas) |
| Columnas extra no canónicas | **2** (servicio, titulo) |
| Columnas faltantes (canónico) | **17** |
| Columnas implementadas post-V1 migration | **11 / 30 (37%)** |
| Columnas faltantes totales (incluyendo migración V1) | **19 / 30 (63%)** |

---

## 3. Comparativa: TypeScript vs CF-020

### 3.1 TypeScript actual (`expediente-mvp.ts`)

```typescript
export interface ExpedienteRow {
  id: string;
  numero_expediente: string;
  cliente_id: string;
  estado: EstadoExpedienteMvp;
  servicio: string;
  titulo: string | null;
  notas: string | null;
  created_at: string;
  updated_at: string;
}
```

### 3.2 Brechas TypeScript

| CF-020 Campo | TypeScript | Brecha |
|---------------|------------|--------|
| `empresa_id` | ❌ Ausente | No modelado |
| `numero_visible` | `numero_expediente` (incorrecto) | Nombre distinto |
| `inmueble_id` | ❌ Ausente | No modelado |
| `servicio_id` | `servicio` (string libre) | Tipo incorrecto (string vs UUID FK) |
| `tecnico_asignado_id` | ❌ Ausente | No modelado |
| `prioridad` | ❌ Ausente | No modelado |
| `progreso` | ❌ Ausente | No modelado |
| `fecha_inicio` | ❌ Ausente | No modelado |
| `fecha_limite` | ❌ Ausente | No modelado |
| `fecha_cierre` | ❌ Ausente | No modelado |
| `dictamen` | ❌ Ausente | No modelado |
| `letra_original` | ❌ Ausente | No modelado |
| `letra_certilab` | ❌ Ausente | No modelado |
| `informe_url` | ❌ Ausente | No modelado |
| `notas_internas` | `notas` (nombre incorrecto) | Nombre distinto |
| `tags` | ❌ Ausente | No modelado |
| `config` | ❌ Ausente | No modelado |
| `consent_id` | ❌ Ausente | No modelado |
| `retention_days` | ❌ Ausente | No modelado |
| `anonymized_at` | ❌ Ausente | No modelado |
| `created_by` | ❌ Ausente | No modelado |
| `updated_by` | ❌ Ausente | No modelado |
| `deleted_at` | ❌ Ausente | No modelado |
| `deleted_by` | ❌ Ausente | No modelado |
| `version` | ❌ Ausente | No modelado |
| *(extra)* | `titulo` | No existe en canónico |

**Brecha TypeScript total:** El type actual modela **8/30** campos (27%). Faltan **22** campos.

### 3.3 EstadoExpedienteMvp vs estado_expediente ENUM canónico

| TypeScript (MVP) | DB (MVP) | CF-020 (canónico) |
|------------------|----------|-------------------|
| `pendiente` | `pendiente` | ❌ No definido |
| `pago_pendiente` | `pago_pendiente` | ❌ No definido |
| `pago_recibido` | `pago_recibido` | ❌ No definido |
| `expediente_creado` | `expediente_creado` | ❌ No definido |
| `en_revision` | `en_revision` | ❌ No definido |
| `informe_enviado` | `informe_enviado` | ❌ No definido |
| `cerrado` | `cerrado` | ❌ No definido |
| `rechazado` | `rechazado` | ❌ No definido |
| `cancelado` | `cancelado` | ❌ No definido |

CF-020 no define explícitamente los valores del ENUM `estado_expediente`. Estos deben tomarse de CF-026 `types.estado_expediente` (PENDING — ver sección 6.1).

---

## 4. Constraints Faltantes

CF-020 define estas restricciones que NO existen en la tabla actual:

| Constraint | CF-020 | DB Actual | Severidad |
|------------|--------|-----------|-----------|
| UNIQUE(`numero_visible`, `empresa_id`) | ✅ Definido | ❌ No implementado | 🔴 Alta |
| CHECK(`progreso` >= 0 AND `progreso` <= 100) | ✅ Definido | ❌ No implementado | 🟢 Baja |
| CHECK(`prioridad` IN (...)) | ✅ Definido | ❌ No implementado | 🟢 Baja |
| CHECK(`dictamen` IN (...)) | ✅ Definido | ❌ No implementado | 🟡 Media |
| CHECK(`letra_original` ~ '^[A-G]$') | ✅ Definido | ❌ No implementado | 🟡 Media |
| CHECK(`letra_certilab` ~ '^[A-G]$') | ✅ Definido | ❌ No implementado | 🟡 Media |
| CHECK(`version` >= 1) | *(implícito)* | ✅ (V1 migration) | 🟢 OK |
| FK `cliente_id` → `core.cliente.id` | ✅ Definido | ❌ Apunta a `auth.users` | 🔴 Alta |
| FK `inmueble_id` → `core.inmueble.id` | ✅ Definido | ✅ (V1 migration) | 🟢 OK |
| FK `consent_id` → `core.consentimiento.id` | ✅ Definido | ❌ No implementado | 🔴 Alta |
| NOT NULL `servicio_id` | ✅ Definido | ❌ No existe columna | 🔴 Alta |

**Total constraints faltantes: 10** (de las cuales 4 son alta severidad)

---

## 5. Índices Faltantes

CF-020 define 7 índices. Estado actual:

| Índice CF-020 | DB Actual | Severidad |
|---------------|-----------|-----------|
| `idx_expediente_numero` ON `numero_visible` | ❌ No existe (nombre distinto) | 🟡 Media |
| `idx_expediente_cliente` ON `cliente_id` WHERE `deleted_at IS NULL` | ✅ `idx_expedientes_cliente_id` (sin condición) | 🟢 Baja |
| `idx_expediente_inmueble` ON `inmueble_id` WHERE `deleted_at IS NULL` | ✅ (V1 migration) | 🟢 OK |
| `idx_expediente_estado` ON `estado` | ✅ `idx_expedientes_estado` (sin condición) | 🟢 Baja |
| `idx_expediente_tecnico` ON `tecnico_asignado_id` WHERE `deleted_at IS NULL` | ❌ No existe columna | 🟡 Media |
| `idx_expediente_fecha_limite` ON `fecha_limite` WHERE `deleted_at IS NULL` | ❌ No existe columna | 🟡 Media |
| `idx_expediente_empresa_estado` ON (`empresa_id`, `estado`) | ❌ No existe columna | 🔴 Alta |

**Total índices faltantes: 4** (por columnas que no existen)

**Índices existentes pero no canónicos:**
- `idx_expedientes_deleted_at` (V1 migration) — No definido en CF-020 pero útil

---

## 6. Otras Brechas

### 6.1 ENUM de estados no definido canónicamente

CF-020 §3.7 no define explícitamente los valores del ENUM. La referencia cruzada con CF-026-EXPEDIENTE-DESIGN.md muestra una máquina de estados que debe definirse formalmente.

| Origen | Valores |
|--------|---------|
| DB actual (MVP) | 9 estados |
| CF-020 | ❌ No definidos |
| CF-026 | ✅ Definidos parcialmente |

**Acción:** Formalizar el ENUM `types.estado_expediente` con todos los valores canónicos.

### 6.2 Schema incorrecto

| Aspecto | CF-020 | DB Actual | Severidad |
|---------|--------|-----------|-----------|
| Schema | `core.expediente` | `public.expedientes` | 🔴 Alta |
| Nombre tabla | `expediente` (singular) | `expedientes` (plural) | 🟡 Media |

### 6.3 RLS Policies

| Política | CF-020 | DB Actual | Brecha |
|----------|--------|-----------|--------|
| Aislamiento por empresa | ✅ `empresa_id = auth.get_empresa_id()` | ❌ No existe (no hay empresa_id) | 🔴 Alta |
| Cliente ve sus expedientes | ✅ `cliente_id = auth.uid()` | ✅ Similar | 🟢 OK |
| Técnico ve todos (misma empresa) | ✅ Rol 'tecnico' | ❌ No implementado | 🟡 Media |

### 6.4 Servicio como string vs FK

Actualmente `servicio` es un VARCHAR con `DEFAULT 'segunda_opinion'`. El modelo canónico exige `servicio_id` UUID FK a `core.servicio`. Esto implica:

- Migración de datos (mapear strings a UUIDs de servicio)
- La tabla `core.servicio` debe existir y poblarse
- Rompe la compatibilidad con la UI MVP actual

---

## 7. Resumen de Brechas por Severidad

| Severidad | Cantidad | Descripción |
|-----------|----------|-------------|
| 🔴 Alta | 12 | empresa_id, servicio_id, fecha_limite, consent_id, retention_days, FK cliente, schema, nombre tabla, UNIQUE constraint, ENUM formal, RLS empresa, constraint FK servicio |
| 🟡 Media | 12 | tecnico_asignado_id, fecha_inicio, fecha_cierre, dictamen, letras, informe_url, numero_visible, notas_internas, estados canónicos, RLS técnico, índices varios, índices técnico/fecha |
| 🟢 Baja | 6 | prioridad, progreso, tags, config, titulo extra, índices sin condición |

**Total brechas identificadas: 30**

---

## 8. Recomendación

**Escenario recomendado: EP-027 — Normalización expedientes V1.1**

Dado el volumen de brechas (30) y su criticidad, se recomienda una épica específica que ejecute:

### 8.1 Priorización

| Fase | Alcance | Dependencias |
|------|---------|--------------|
| **🔴 Fase 1** (Alta, bloqueante) | Schema `core.expediente` + columnas obligatorias (empresa_id, servicio_id, fecha_limite, consent_id, retention_days) + UNIQUE + FK correctas | Core schema creado (core.servicio, core.consentimiento) |
| **🟡 Fase 2** (Media, funcional) | Columnas funcionales (técnico, fechas, dictamen, letras, informe_url) + RLS completo + índices | Fase 1 |
| **🟢 Fase 3** (Baja, mejora) | Columnas complementarias (prioridad, progreso, tags, config) + limpieza columnas MVP (servicio, titulo) | Fase 2 |

### 8.2 Enfoque: Migración in-situ vs Nueva tabla

- **No se recomienda** mover datos a nueva tabla (riesgo alto, coste de migración alto)
- **Se recomienda** migración in-situ: ALTER TABLE + renombrar + añadir columnas
- Crear vista `core.expediente` como ALIAS o sinónimo (si PostgreSQL lo permite)
- Alternativa: `CREATE TABLE core.expediente` + migración de datos por lotes

### 8.3 Decisiones pendientes (requieren ADR)

1. ¿Migrar datos a `core.expediente` o mantener `public.expedientes` con alter?
2. ¿Cuándo formalizar el ENUM de estados canónico?
3. ¿Cómo mapear `servicio` (string) → `servicio_id` (UUID) sin romper la UI actual?
4. ¿Se añade `empresa_id` ahora (V1 single tenant) o se difiere a V3 (multitenant)?
   - CF-020 dice: "V1 es Single Tenant. No existe empresa_id."
   - Pero: la tabla expediente SÍ tiene `empresa_id` en CF-020 §3.7.
   - **Decisión propuesta:** No añadir `empresa_id` hasta V3, alineado con el resto del modelo single tenant.

---

## 9. Archivos Afectados

| Archivo | Acción |
|---------|--------|
| `supabase/migrations/20260702_00001_create_expedientes.sql` | ❌ No modificar (histórico) |
| `supabase/migrations/20260707_00001_update_expedientes.sql` | 🟡 Sin aplicar. Requiere revisión post-gap |
| `src/types/expediente-mvp.ts` | 🔴 Actualizar a modelo canónico |
| `src/lib/actions/expedientes.ts` | 🔴 Actualizar queries y tipos |
| `src/app/(plataforma)/*` | 🟡 Posibles ajustes UI |
| `docs/CF-020-DATA-MODEL.md` | ❌ No modificar (es el canónico) |
| `docs/CF-026-EXPEDIENTE-DESIGN.md` | ✅ Referencia para ENUM estados |

---

## 10. Conclusiones

1. **La tabla actual está al 37% del modelo canónico** (11/30 columnas post-V1 migration).
2. **Hay 12 brechas de alta severidad** que deben resolverse antes de considerar la tabla "V1 completa".
3. **La migración V1 (20260707_00001) resuelve 6 brechas** pero no es suficiente: faltan columnas obligatorias (servicio_id, fecha_limite, consent_id, retention_days).
4. **El mayor gap arquitectónico** es que `servicio` es un string libre en vez de FK → `core.servicio`.
5. **Se recomienda EP-027** como épica de normalización, con 3 fases priorizadas.
6. **No modificar la tabla actual hasta tener la ADR correspondiente** aprobada, para no bloquear el desarrollo en curso.

---

*Fin del informe GAP EP-026*