# PROPUESTA — Modelo de Datos MVP (v1.0)

> **Documento:** PROPUESTA-MODELO-MVP.md  
> **Base:** CF-020-DATA-MODEL.md v1.1 (definición completa de 28 entidades)  
> **Alcance:** Subconjunto mínimo viable para el flujo "Segunda Opinión"  
> **Estado:** Propuesta pendiente de aprobación  
> **Creado:** 2026-07-02

---

## 1. CRITERIOS DE SELECCIÓN MVP

De las 28 entidades definidas en CF-020, seleccionamos **7 entidades núcleo** que cumplen:

1. Soportan el flujo completo "Solicitar Segunda Opinión"
2. No tienen dependencias circulares
3. Son independientes de features futuros (facturación, IA, observatorio)
4. Se pueden migrar en una sola release

**Entidades EXCLUIDAS del MVP** (llegarán en V1.4+):

| Entidad | Motivo de exclusión |
|---------|---------------------|
| `empresa` | Se asume empresa única para el MVP; se hardcodea o se añade tras V1.4 |
| `usuario` | Se usa `auth.users` de Supabase directamente; tabla puente `usuario` se añade con multiempresa |
| `servicio` | Se hardcodea "segunda_opinion" como servicio único |
| `factura` | Feature de facturación V1.4 |
| `actividad` | Event log V1.4 |
| `plantilla_pitr` | Se hardcodea una plantilla por defecto |
| `seccion_pitr` | Idem |
| `pregunta_pitr` | Idem |
| `firma_pitr` | V1.4 |
| `observatorio` | V2 |
| `prediccion_ia` | V2 |
| `consentimiento` | V1.4 (RGPD) |

---

## 2. ENTIDAD 1 — CLIENTE (`core.cliente`)

### Propósito
Persona física que contrata servicios de Certilab. Es el dueño del inmueble y el destinatario del informe. Separada de `auth.users` porque un cliente puede no tener acceso a la plataforma (si un técnico gestiona por él).

### Schema
`core.cliente`

### Campos

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | `UUID` | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `auth_user_id` | `UUID` | ❌ | ✅ → `auth.users.id` | ❌ | `NULL` | Solo si el cliente tiene cuenta en la plataforma |
| `email` | `VARCHAR(255)` | ❌ | ❌ | ✅ | — | Email (único) |
| `nombre` | `VARCHAR(150)` | ❌ | ❌ | ✅ | — | Nombre |
| `apellidos` | `VARCHAR(255)` | ❌ | ❌ | ✅ | — | Apellidos |
| `telefono` | `VARCHAR(20)` | ❌ | ❌ | ❌ | `NULL` | Teléfono de contacto |
| `dni` | `VARCHAR(15)` | ❌ | ❌ | ❌ | `NULL` | DNI/NIE (sin cifrar en MVP; se cifrará en V1.4) |
| `direccion` | `TEXT` | ❌ | ❌ | ❌ | `NULL` | Dirección |
| `ciudad` | `VARCHAR(150)` | ❌ | ❌ | ❌ | `NULL` | Ciudad |
| `codigo_postal` | `VARCHAR(10)` | ❌ | ❌ | ❌ | `NULL` | Código postal |
| `notas` | `TEXT` | ❌ | ❌ | ❌ | `NULL` | Notas internas |
| `created_at` | `TIMESTAMPTZ` | ❌ | ❌ | ✅ | `now()` | Creación |
| `updated_at` | `TIMESTAMPTZ` | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `deleted_at` | `TIMESTAMPTZ` | ❌ | ❌ | ❌ | `NULL` | Soft delete |

### Claves
- **PK:** `id` (UUID v4)
- **UK:** `email` (único)
- **FK:** `auth_user_id` → `auth.users.id` (opcional)

### Relaciones
- `cliente` 1 ── N `inmueble` (un cliente puede tener varios inmuebles)
- `cliente` 1 ── N `expediente` (un cliente puede tener varios expedientes)

### Restricciones
- `UNIQUE(email)` — Dos clientes no pueden compartir email
- `CHECK(email ~* '^.+@.+\\..+$')` — Validación básica de email (opcional, puede hacerse en app)

### Índices
- `idx_cliente_email` ON `cliente` (`email`) WHERE `deleted_at IS NULL`
- `idx_cliente_auth_user` ON `cliente` (`auth_user_id`) WHERE `deleted_at IS NULL`

### Reglas de negocio
1. Un cliente se crea automáticamente al registrarse en la plataforma (si hace login con email).
2. Un técnico puede crear un cliente en nombre de una persona sin acceso a la plataforma (en ese caso `auth_user_id` = NULL).
3. Soft delete: nunca se elimina físicamente.

---

## 3. ENTIDAD 2 — INMUEBLE (`core.inmueble`)

### Propósito
El inmueble sobre el que se realiza el servicio. Independiente del expediente — el mismo inmueble puede tener múltiples expedientes a lo largo del tiempo.

### Schema
`core.inmueble`

### Campos

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | `UUID` | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `cliente_id` | `UUID` | ❌ | ✅ → `cliente.id` | ✅ | — | Propietario |
| `ref_catastral` | `VARCHAR(20)` | ❌ | ❌ | ❌ | `NULL` | Referencia catastral (14-20 dígitos) |
| `direccion` | `TEXT` | ❌ | ❌ | ✅ | — | Dirección completa |
| `ciudad` | `VARCHAR(150)` | ❌ | ❌ | ✅ | — | Ciudad |
| `codigo_postal` | `VARCHAR(10)` | ❌ | ❌ | ✅ | — | Código postal |
| `provincia` | `VARCHAR(100)` | ❌ | ❌ | ✅ | — | Provincia |
| `pais` | `VARCHAR(100)` | ❌ | ❌ | ❌ | `'ESPAÑA'` | País |
| `latitud` | `NUMERIC(10,7)` | ❌ | ❌ | ❌ | `NULL` | Latitud |
| `longitud` | `NUMERIC(10,7)` | ❌ | ❌ | ❌ | `NULL` | Longitud |
| `tipo` | `VARCHAR(50)` | ❌ | ❌ | ✅ | — | `'piso'`, `'unifamiliar'`, `'local'`, `'oficina'`, `'industrial'`, `'otro'` |
| `superficie` | `NUMERIC(10,2)` | ❌ | ❌ | ❌ | `NULL` | Metros cuadrados |
| `ano_construccion` | `INTEGER` | ❌ | ❌ | ❌ | `NULL` | Año de construcción |
| `plantas` | `INTEGER` | ❌ | ❌ | ❌ | `NULL` | Número de plantas |
| `certificado_existente_url` | `TEXT` | ❌ | ❌ | ❌ | `NULL` | URL del certificado energético PDF existente |
| `certificado_letra` | `CHAR(1)` | ❌ | ❌ | ❌ | `NULL` | Letra del certificado existente (A-G) |
| `notas` | `TEXT` | ❌ | ❌ | ❌ | `NULL` | Notas internas |
| `created_at` | `TIMESTAMPTZ` | ❌ | ❌ | ✅ | `now()` | Creación |
| `updated_at` | `TIMESTAMPTZ` | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `deleted_at` | `TIMESTAMPTZ` | ❌ | ❌ | ❌ | `NULL` | Soft delete |

### Claves
- **PK:** `id` (UUID v4)
- **UK:** `ref_catastral` (único, nullable)
- **FK:** `cliente_id` → `cliente.id`

### Relaciones
- `inmueble` N ── 1 `cliente`
- `inmueble` 1 ── N `expediente`

### Restricciones
- `UNIQUE(ref_catastral)` — Si existe, debe ser único
- `CHECK(ano_construccion >= 1800 AND ano_construccion <= EXTRACT(YEAR FROM CURRENT_DATE) + 1)`
- `CHECK(superficie IS NULL OR superficie > 0)`
- `CHECK(tipo IN ('piso', 'unifamiliar', 'local', 'oficina', 'industrial', 'otro'))`

### Índices
- `idx_inmueble_cliente` ON `inmueble` (`cliente_id`) WHERE `deleted_at IS NULL`
- `idx_inmueble_cp` ON `inmueble` (`codigo_postal`) WHERE `deleted_at IS NULL`
- `idx_inmueble_refcat` ON `inmueble` (`ref_catastral`) WHERE `deleted_at IS NULL`

### Reglas de negocio
1. Un inmueble pertenece EXACTAMENTE a un cliente.
2. La referencia catastral es opcional en el MVP pero recomendada para trazabilidad.
3. Si se aporta URL del certificado existente, la letra debe ser coherente (validación en app).

---

## 4. ENTIDAD 3 — EXPEDIENTE (`core.expediente`)

### Propósito
Entidad central del sistema. Representa un caso de servicio contratado. Agrupa documentos, pagos, respuestas PITR y el resultado del dictamen.

### Schema
`core.expediente`

### Campos

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | `UUID` | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `numero_expediente` | `VARCHAR(20)` | ❌ | ❌ | ✅ | — | Nº visible: `EXP-{YYYY}-{XXXXX}` |
| `cliente_id` | `UUID` | ❌ | ✅ → `cliente.id` | ✅ | — | Cliente contratante |
| `inmueble_id` | `UUID` | ❌ | ✅ → `inmueble.id` | ✅ | — | Inmueble auditado |
| `servicio` | `VARCHAR(50)` | ❌ | ❌ | ✅ | `'segunda_opinion'` | Tipo de servicio |
| `estado` | `estado_expediente` | ❌ | ❌ | ✅ | `'pendiente'` | Máquina de estados (ver enum abajo) |
| `dictamen` | `VARCHAR(30)` | ❌ | ❌ | ❌ | `NULL` | Resultado: `'CORRECTO'`, `'INFLADO'`, `'MAL_CALCULADO'`, `'FALSEADO'` |
| `letra_original` | `CHAR(1)` | ❌ | ❌ | ❌ | `NULL` | Letra del certificado original (A-G) |
| `letra_certilab` | `CHAR(1)` | ❌ | ❌ | ❌ | `NULL` | Letra según dictamen de Certilab (A-G) |
| `informe_url` | `TEXT` | ❌ | ❌ | ❌ | `NULL` | URL del informe PDF final |
| `titulo` | `TEXT` | ❌ | ❌ | ❌ | `NULL` | Título visible para el cliente |
| `notas_internas` | `TEXT` | ❌ | ❌ | ❌ | `NULL` | Notas del técnico (no visibles al cliente) |
| `fecha_limite` | `TIMESTAMPTZ` | ❌ | ❌ | ❌ | `NULL` | Fecha límite de entrega |
| `fecha_cierre` | `TIMESTAMPTZ` | ❌ | ❌ | ❌ | `NULL` | Fecha de cierre del expediente |
| `created_at` | `TIMESTAMPTZ` | ❌ | ❌ | ✅ | `now()` | Creación |
| `updated_at` | `TIMESTAMPTZ` | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `deleted_at` | `TIMESTAMPTZ` | ❌ | ❌ | ❌ | `NULL` | Soft delete |

### Enum: `estado_expediente` (ya existe en la migración actual)

```sql
CREATE TYPE estado_expediente AS ENUM (
  'pendiente',         -- Recién creado
  'pago_pendiente',    -- Esperando pago
  'pago_recibido',     -- Pago confirmado
  'expediente_creado', -- Técnico empieza a trabajar
  'en_revision',       -- Técnico revisando documentación
  'informe_enviado',   -- Informe entregado al cliente
  'cerrado',           -- Cliente satisfecho, expediente completo
  'rechazado',         -- Cliente rechaza / datos insuficientes
  'cancelado'          -- Cliente cancela antes de finalizar
);
```

### Claves
- **PK:** `id` (UUID v4)
- **UK:** `numero_expediente` (único)
- **FK:** `cliente_id` → `cliente.id`
- **FK:** `inmueble_id` → `inmueble.id`

### Relaciones
- `expediente` N ── 1 `cliente`
- `expediente` N ── 1 `inmueble`
- `expediente` 1 ── N `documento`
- `expediente` 1 ── N `pago`
- `expediente` 1 ── 1 `respuesta_pitr`

### Restricciones
- `UNIQUE(numero_expediente)`
- `CHECK(letra_original IS NULL OR letra_original ~ '^[A-G]$')`
- `CHECK(letra_certilab IS NULL OR letra_certilab ~ '^[A-G]$')`
- `CHECK(dictamen IS NULL OR dictamen IN ('CORRECTO', 'INFLADO', 'MAL_CALCULADO', 'FALSEADO'))`

### Índices
- `idx_expediente_numero` ON `expediente` (`numero_expediente`)
- `idx_expediente_cliente` ON `expediente` (`cliente_id`) WHERE `deleted_at IS NULL`
- `idx_expediente_inmueble` ON `expediente` (`inmueble_id`) WHERE `deleted_at IS NULL`
- `idx_expediente_estado` ON `expediente` (`estado`)

### Reglas de negocio
1. El `numero_expediente` se genera automáticamente con formato `EXP-{YYYY}-{XXXXX}`.
2. El estado sigue una máquina de estados estricta (ver diagrama de flujo más abajo).
3. `informe_url` se establece cuando se sube el PDF del informe final.
4. `fecha_cierre` se establece solo cuando el estado pasa a `cerrado`.
5. Soft delete: nunca se elimina físicamente.

### Máquina de estados (transiciones permitidas)

```
pendiente ──────────────► pago_pendiente
pago_pendiente ──────────► pago_recibido
pago_recibido ───────────► expediente_creado
expediente_creado ───────► en_revision
en_revision ─────────────► informe_enviado
informe_enviado ─────────► cerrado
cualquier estado ────────► cancelado (solo si no está cerrado)
en_revision ─────────────► rechazado
rechazado ───────────────► expediente_creado (reabierto)
```

---

## 5. ENTIDAD 4 — DOCUMENTO (`core.documento`)

### Propósito
Archivo asociado a un expediente. Puede ser el certificado original a auditar, documentación complementaria o el informe final generado.

### Schema
`core.documento`

### Campos

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | `UUID` | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `expediente_id` | `UUID` | ❌ | ✅ → `expediente.id` | ✅ | — | Expediente asociado |
| `tipo` | `VARCHAR(50)` | ❌ | ❌ | ✅ | — | Tipo de documento (ver enum abajo) |
| `nombre` | `VARCHAR(255)` | ❌ | ❌ | ✅ | — | Nombre original del archivo |
| `mime_type` | `VARCHAR(100)` | ❌ | ❌ | ✅ | — | Tipo MIME (`application/pdf`, `image/jpeg`, etc.) |
| `tamano_bytes` | `BIGINT` | ❌ | ❌ | ✅ | — | Tamaño en bytes |
| `storage_path` | `TEXT` | ❌ | ❌ | ✅ | — | Ruta en Supabase Storage |
| `hash_sha256` | `VARCHAR(64)` | ❌ | ❌ | ✅ | — | Hash SHA-256 del archivo (deduplicación) |
| `created_at` | `TIMESTAMPTZ` | ❌ | ❌ | ✅ | `now()` | Fecha de subida |
| `deleted_at` | `TIMESTAMPTZ` | ❌ | ❌ | ❌ | `NULL` | Soft delete |

### Tipos de documento (MVP)

| Tipo | Descripción |
|------|-------------|
| `CERTIFICADO_ORIGINAL` | Certificado energético a auditar (obligatorio) |
| `DOCUMENTACION_COMPLEMENTARIA` | Documentos adicionales (planos, fichas técnicas) |
| `INFORME_FINAL` | Dictamen técnico en PDF generado por Certilab |
| `FOTOGRAFIA` | Fotos del inmueble |
| `OTRO` | Otros |

### Claves
- **PK:** `id` (UUID v4)
- **FK:** `expediente_id` → `expediente.id`

### Relaciones
- `documento` N ── 1 `expediente`

### Restricciones
- `CHECK(tamano_bytes > 0)`
- `CHECK(tipo IN ('CERTIFICADO_ORIGINAL', 'DOCUMENTACION_COMPLEMENTARIA', 'INFORME_FINAL', 'FOTOGRAFIA', 'OTRO'))`

### Índices
- `idx_documento_expediente` ON `documento` (`expediente_id`)
- `idx_documento_tipo` ON `documento` (`tipo`)
- `idx_documento_hash` ON `documento` (`hash_sha256`)

### Reglas de negocio
1. El `CERTIFICADO_ORIGINAL` es obligatorio para iniciar un expediente.
2. El `INFORME_FINAL` se genera automáticamente al cerrar el expediente.
3. `storage_path` referencia a Supabase Storage: `{expediente_id}/{tipo}/{uuid}_{nombre}`.
4. `hash_sha256` permite detectar archivos duplicados.
5. Los documentos con tipo `INFORME_FINAL` son inmutables (no se pueden borrar ni reemplazar una vez generados).

---

## 6. ENTIDAD 5 — PAGO (`billing.pago`)

### Propósito
Transacción económica asociada a un expediente. Representa el cobro del servicio.

### Schema
`billing.pago`

### Campos

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | `UUID` | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `expediente_id` | `UUID` | ❌ | ✅ → `expediente.id` | ✅ | — | Expediente asociado |
| `proveedor` | `VARCHAR(50)` | ❌ | ❌ | ✅ | — | `'stripe'`, `'mypos'` |
| `proveedor_pago_id` | `VARCHAR(255)` | ❌ | ❌ | ❌ | `NULL` | ID del pago en el proveedor |
| `estado` | `VARCHAR(30)` | ❌ | ❌ | ✅ | `'PENDIENTE'` | Estado del pago |
| `importe` | `NUMERIC(10,2)` | ❌ | ❌ | ✅ | — | Importe en euros |
| `moneda` | `VARCHAR(3)` | ❌ | ❌ | ✅ | `'EUR'` | Moneda |
| `comision` | `NUMERIC(10,2)` | ❌ | ❌ | ❌ | `NULL` | Comisión del proveedor |
| `importe_neto` | `NUMERIC(10,2)` | ❌ | ❌ | ❌ | `NULL` | Importe neto (importe - comisión) |
| `metodo_pago` | `VARCHAR(50)` | ❌ | ❌ | ❌ | `NULL` | `'tarjeta'`, `'transferencia'`, `'bizum'` |
| `fecha_pago` | `TIMESTAMPTZ` | ❌ | ❌ | ❌ | `NULL` | Fecha de confirmación |
| `link_pago` | `TEXT` | ❌ | ❌ | ❌ | `NULL` | URL del link de pago |
| `webhook_recibido` | `BOOLEAN` | ❌ | ❌ | ❌ | `false` | ¿Se recibió webhook de confirmación? |
| `webhook_payload` | `JSONB` | ❌ | ❌ | ❌ | `NULL` | Payload completo del webhook |
| `created_at` | `TIMESTAMPTZ` | ❌ | ❌ | ✅ | `now()` | Creación |
| `updated_at` | `TIMESTAMPTZ` | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `deleted_at` | `TIMESTAMPTZ` | ❌ | ❌ | ❌ | `NULL` | Soft delete |

### Estados de pago (transiciones)

```
PENDIENTE ────► PROCESANDO ────► COMPLETADO
                                  ├──► REEMBOLSADO
                                  └──► CANCELADO
PENDIENTE ────► RECHAZADO (por proveedor)
```

### Claves
- **PK:** `id` (UUID v4)
- **FK:** `expediente_id` → `expediente.id`

### Relaciones
- `pago` N ── 1 `expediente`

### Restricciones
- `CHECK(importe > 0)`
- `CHECK(estado IN ('PENDIENTE', 'PROCESANDO', 'COMPLETADO', 'RECHAZADO', 'REEMBOLSADO', 'CANCELADO'))`

### Índices
- `idx_pago_expediente` ON `pago` (`expediente_id`)
- `idx_pago_proveedor` ON `pago` (`proveedor`, `proveedor_pago_id`)
- `idx_pago_estado` ON `pago` (`estado`)

### Reglas de negocio
1. Un expediente SOLO puede tener un pago activo (se controla desde la aplicación o con un índice parcial único).
2. El link de pago se genera al transitar a `pago_pendiente` y se guarda en `link_pago`.
3. El webhook del proveedor es el que dispara la transición a `COMPLETADO`.
4. `proveedor_pago_id` es el identificador del lado del proveedor (Stripe PaymentIntent ID, etc.).
5. `comision` e `importe_neto` se calculan al recibir confirmación del proveedor.

---

## 7. ENTIDAD 6 — RESPUESTA PITR (`pitr.respuesta_pitr`)

### Propósito
Formulario completado de la inspección. Contiene las respuestas a las preguntas del PITR asociado al servicio contratado.

### Schema
`pitr.respuesta_pitr`

### Campos

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | `UUID` | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `expediente_id` | `UUID` | ❌ | ✅ → `expediente.id` | ✅ | — | Expediente asociado |
| `plantilla_slug` | `VARCHAR(100)` | ❌ | ❌ | ✅ | `'segunda_opinion'` | Identificador de la plantilla usada |
| `estado` | `VARCHAR(20)` | ❌ | ❌ | ✅ | `'EN_PROGRESO'` | Estado de la respuesta |
| `respuestas` | `JSONB` | ❌ | ❌ | ❌ | `'{}'` | Mapa `{pregunta_id: valor}` |
| `progreso` | `INTEGER` | ❌ | ❌ | ❌ | `0` | Progreso 0-100 |
| `completada_en` | `TIMESTAMPTZ` | ❌ | ❌ | ❌ | `NULL` | Cuándo se completó |
| `created_at` | `TIMESTAMPTZ` | ❌ | ❌ | ✅ | `now()` | Creación |
| `updated_at` | `TIMESTAMPTZ` | ❌ | ❌ | ✅ | `now()` | Última modificación |

### Estados de respuesta

| Estado | Descripción |
|--------|-------------|
| `EN_PROGRESO` | Inspección no finalizada |
| `COMPLETADA` | Inspección finalizada y firmada |

### Claves
- **PK:** `id` (UUID v4)
- **FK:** `expediente_id` → `expediente.id` (UNIQUE)

### Relaciones
- `respuesta_pitr` 1 ── 1 `expediente` (un expediente tiene exactamente una respuesta PITR)

### Restricciones
- `UNIQUE(expediente_id)` — Un expediente tiene UNA respuesta PITR
- `CHECK(progreso >= 0 AND progreso <= 100)`
- `CHECK(estado IN ('EN_PROGRESO', 'COMPLETADA'))`

### Índices
- `idx_respuesta_expediente` ON `respuesta_pitr` (`expediente_id`)
- `idx_respuesta_estado` ON `respuesta_pitr` (`estado`)

### Reglas de negocio
1. La respuesta PITR se crea automáticamente al crear el expediente.
2. `respuestas` es un JSONB que almacena `{pregunta_id: valor}`. Las preguntas se definen en la aplicación (no hay tabla `pregunta_pitr` en MVP).
3. El progreso se calcula como: `(preguntas_respondidas / total_preguntas) * 100`.
4. Solo se puede tener UNA respuesta por expediente.
5. Al completarse (`COMPLETADA`), el JSON `respuestas` se congela (la app deja de permitir modificaciones).

---

## 8. ENTIDAD 7 — INFORME (`core.informe`)

### Propósito
NO existe como tabla separada en el MVP. El informe se materializa de dos formas:

1. **Datos estructurados del dictamen:** Almacenados directamente en `expediente` mediante los campos:
   - `dictamen` (CORRECTO, INFLADO, MAL_CALCULADO, FALSEADO)
   - `letra_original` (A-G)
   - `letra_certilab` (A-G)

2. **Documento PDF del informe:** Almacenado en `documento` con `tipo = 'INFORME_FINAL'`.

### Justificación de la decisión
- En el MVP, el informe es **output del proceso**, no una entidad con ciclo de vida propio.
- Los datos clave del dictamen (letras, veredicto) se almacenan en el expediente porque se necesitan para las queries de listado y estadísticas.
- El PDF completo se almacena como un documento más (aprovechando toda la lógica de Storage, hash, versionado).
- Separar `informe` como tabla propia se añadirá en V1.4 cuando se necesite: versionado de informes, aprobación por firma digital, múltiples iteraciones.

### Alternativa futura (V1.4+)
```sql
CREATE TABLE core.informe (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expediente_id UUID NOT NULL REFERENCES core.expediente(id),
  version INTEGER NOT NULL DEFAULT 1,
  dictamen VARCHAR(30) NOT NULL,
  letra_original CHAR(1) NOT NULL,
  letra_certilab CHAR(1) NOT NULL,
  contenido_json JSONB,       -- Datos completos del informe
  pdf_storage_path TEXT,       -- Ruta al PDF generado
  validado_por UUID,           -- FK → usuario.id
  validado_en TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 9. DIAGRAMA ENTIDAD-RELACIÓN (ERD)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MODELO MVP — CERTILAB                             │
│                                                                     │
│  ┌──────────────┐                                                   │
│  │   CLIENTE    │                                                   │
│  │──────────────│                                                   │
│  │ id (PK)      │────────────────────────────────────────────────┐  │
│  │ auth_user_id │──(opcional)──► auth.users.id                   │  │
│  │ email (UK)   │                                                │  │
│  │ nombre       │                                                │  │
│  │ apellidos    │                                                │  │
│  │ telefono     │                                                │  │
│  │ dni          │              1                                 │  │
│  │ direccion    │               │                                 │  │
│  │ ...          │               │                                 │  │
│  └──────┬───────┘               │                                 │  │
│         │                       │                                 │  │
│         │ 1                     │                                 │  │
│         │                       │                                 │  │
│         ▼                       ▼                                 │  │
│  ┌──────────────┐      ┌────────────────┐                         │  │
│  │   INMUEBLE   │      │   EXPEDIENTE   │                         │  │
│  │──────────────│      │────────────────│                         │  │
│  │ id (PK)      │      │ id (PK)        │                         │  │
│  │ cliente_id(FK)│◄────│ cliente_id (FK)│◄────────────────────────┘  │
│  │ ref_catastral│      │ inmueble_id(FK)│                         │  │
│  │ direccion    │      │ numero_exp (UK)│                         │  │
│  │ ciudad       │      │ servicio       │                         │  │
│  │ codigo_postal│      │ estado (ENUM)  │                         │  │
│  │ provincia    │      │ dictamen       │                         │  │
│  │ tipo         │      │ letra_original  │                         │  │
│  │ superficie   │      │ letra_certilab │                         │  │
│  │ ano_construc │      │ informe_url    │                         │  │
│  │ ──────────   │      │ ────────────   │                         │  │
│  └──────────────┘      └───────┬────────┘                         │  │
│                                │                                   │  │
│                    ┌───────────┼───────────┐                       │  │
│                    │           │           │                       │  │
│                    ▼           ▼           ▼                       │  │
│           ┌────────────┐ ┌────────┐ ┌──────────────┐              │  │
│           │ DOCUMENTO  │ │  PAGO  │ │  RTA_PITR    │              │  │
│           │────────────│ │────────│ │──────────────│              │  │
│           │ id (PK)    │ │ id(PK) │ │ id (PK)      │              │  │
│           │expediente  │ │expedien│ │expediente(FK)│              │  │
│           │ tipo       │ │ provee │ │plantilla_slug│              │  │
│           │ nombre     │ │ importe│ │ estado       │              │  │
│           │ storage_   │ │ estado │ │ respuestas   │              │  │
│           │ hash       │ │fecha.. │ │ (JSONB)      │              │  │
│           └────────────┘ └────────┘ │ progreso     │              │  │
│                                      └──────────────┘              │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     LEYENDA                                   │   │
│  │  (PK) = Clave Primaria    (FK) = Clave Foránea               │   │
│  │  (UK) = Única             ────► = Relación                   │   │
│  │  1 ──── N = Uno a muchos  1 ──── 1 = Uno a uno              │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 10. MAPA DE RELACIONES (TEXTO)

| De | A | Tipo | Cardinalidad | Campo FK |
|----|---|------|--------------|----------|
| `cliente` | `auth.users` | Opcional 1:1 | 0..1 ── 1 | `cliente.auth_user_id` |
| `inmueble` | `cliente` | Obligatorio N:1 | N ── 1 | `inmueble.cliente_id` |
| `expediente` | `cliente` | Obligatorio N:1 | N ── 1 | `expediente.cliente_id` |
| `expediente` | `inmueble` | Obligatorio N:1 | N ── 1 | `expediente.inmueble_id` |
| `documento` | `expediente` | Obligatorio N:1 | N ── 1 | `documento.expediente_id` |
| `pago` | `expediente` | Obligatorio N:1 | N ── 1 | `pago.expediente_id` |
| `respuesta_pitr` | `expediente` | Obligatorio 1:1 | 1 ── 1 | `respuesta_pitr.expediente_id` |

---

## 11. RESUMEN DE ESQUEMAS

| Schema | Tablas MVP | Propósito |
|--------|-----------|-----------|
| `core` | `cliente`, `inmueble`, `expediente`, `documento` | Entidades del negocio |
| `billing` | `pago` | Transacciones económicas |
| `pitr` | `respuesta_pitr` | Respuestas de inspección |

---

## 12. COMPARATIVA CON LA MIGRACIÓN ACTUAL

La migración existente (`20260702_00001_create_expedientes.sql`) crea:

- Tabla `expedientes` con campos: `id`, `numero_expediente`, `cliente_id` (→ `auth.users.id`), `estado`, `servicio`, `titulo`, `notas`, timestamps
- Enum `estado_expediente`
- Índices en `cliente_id` y `estado`
- RLS policies básicas

**Cambios necesarios:**

| Aspecto | Actual | Propuesto MVP |
|---------|--------|---------------|
| `cliente_id` | FK → `auth.users` | FK → `core.cliente.id` |
| `numero_expediente` | `NOT NULL` | Se mantiene (UK) |
| `servicio` | TEXT default 'segunda_opinion' | Se mantiene |
| Campos faltantes | Sin `inmueble_id`, `dictamen`, `letras`, `informe_url` | Se añaden |
| Tablas faltantes | Solo existe `expedientes` | Se crean `cliente`, `inmueble`, `documento`, `pago`, `respuesta_pitr` |
| RLS policies | Solo sobre `expedientes` | Se crean sobre todas las tablas |
| Soft delete | No existe | Se añade a todas las tablas |

---

## 13. ESTRATEGIA DE MIGRACIÓN (solo diseño, sin implementar)

**Orden de creación de tablas** (respetando dependencias de FK):

1. `core.cliente` — sin FK externas (solo auth_user_id opcional)
2. `core.inmueble` — FK → `cliente.id`
3. `core.expediente` — FK → `cliente.id`, `inmueble.id`
4. `core.documento` — FK → `expediente.id`
5. `billing.pago` — FK → `expediente.id`
6. `pitr.respuesta_pitr` — FK → `expediente.id`

La migración actual (`expedientes`) deberá ser reemplazada o alterada para añadir `inmueble_id` y los campos de dictamen, y cambiar `cliente_id` de `auth.users` a `core.cliente`.

---

## 14. PREGUNTAS PARA VALIDAR EL DISEÑO

1. **Cliente hereda de auth.users o es tabla independiente?** → Propuesta: independiente con FK opcional a `auth.users`. Esto permite que un técnico cree clientes sin cuenta.
2. **Informe es tabla o campos en expediente?** → Propuesta: campos en expediente + documento PDF. Tabla propia en V1.4.
3. **JSONB para respuestas PITR vs tabla normalizada?** → Propuesta: JSONB. Para el MVP las preguntas están hardcodeadas. La normalización llegará con tablas `plantilla/seccion/pregunta`.
4. **Un pago por expediente o múltiples?** → Propuesta: un pago por expediente en MVP. Múltiples pagos (split payments) en V1.4.
5. **RGPD / consentimiento ahora o después?** → Propuesta: después (V1.4). Por ahora se asume consentimiento implícito al usar la plataforma.

---

> **Documento generado para revisión. Sin implementación hasta aprobación.**