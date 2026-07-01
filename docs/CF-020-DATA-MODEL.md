# CF-020 — DATA MODEL: CONSTITUCIÓN DEL MODELO DE DATOS

**Versión:** 1.0  
**Fecha:** 01/07/2026  
**Responsable:** Arquitectura Técnica Certilab  
**Estado:** Documento de diseño (sin implementación)  
**Build:** ✅ Compilado (0 errores)

---

## 📋 Índice

1. [Filosofía del modelo de datos](#1-filosofía-del-modelo-de-datos)
2. [Modelo conceptual](#2-modelo-conceptual)
3. [Modelo Entidad Relación](#3-modelo-entidad-relación)
4. [Diseño PostgreSQL](#4-diseño-postgresql)
5. [Seguridad](#5-seguridad)
6. [Storage](#6-storage)
7. [Eventos](#7-eventos)
8. [PITR](#8-pitr)
9. [Observatorio](#9-observatorio)
10. [IA](#10-ia)
11. [Automatizaciones](#11-automatizaciones)
12. [Integraciones](#12-integraciones)
13. [Estrategia de migraciones](#13-estrategia-de-migraciones)
14. [Escalabilidad](#14-escalabilidad)
15. [Riesgos](#15-riesgos)
16. [Roadmap](#16-roadmap)

---

# 1. FILOSOFÍA DEL MODELO DE DATOS

## 1.1 Principios fundamentales

El modelo de datos de Certilab se rige por **doce principios absolutos** que ninguna implementación puede violar:

### P1. Fuente de verdad única

Cada dato existe exactamente una vez en el sistema. No hay copias, no hay caches que actúen como fuente primaria, no hay duplicación entre tablas. Si un dato está en `inmueble.direccion`, esa es la única dirección del inmueble en todo el sistema.

### P2. No duplicación

Prohibido almacenar el mismo dato en dos tablas diferentes. Si un valor puede calcularse o derivarse (ej: el número de expedientes de un cliente se obtiene con `COUNT(*)` sobre `expediente`), no se almacena como columna derivada. Las únicas excepciones son:
- **Caches de agregación** en el Observatorio (datos precalculados para informes públicos).
- **Snapshots de estado** para reconstrucción rápida de expedientes (ver sección 7).

### P3. Integridad referencial absoluta

Toda relación entre entidades se materializa con claves foráneas (FK) en la base de datos. No hay relaciones implícitas ni joins basados en convenciones de nombres. Las FK llevan `ON DELETE RESTRICT` por defecto — ningún registro se elimina en cascada sin decisión explícita del diseñador.

### P4. Inmutabilidad del registro histórico

Los eventos son **append-only**. Una vez insertados, no se modifican ni se eliminan. El modelo de eventos (sección 7) es la única fuente de verdad sobre lo que ocurrió en el sistema. Cualquier mutación sobre una entidad de negocio debe generar un evento.

### P5. Soft delete universal

Ninguna entidad se elimina físicamente de la base de datos. Todas las tablas de negocio incluyen:
- `deleted_at` — Timestamp de soft delete (NULL = activo).
- `deleted_by` — UUID del usuario que eliminó (NULL si no aplica).

La única excepción son las tablas de eventos, que ni siquiera permiten soft delete.

### P6. Auditoría completa

Toda tabla de negocio incluye:
- `created_at` — Timestamp de creación.
- `created_by` — UUID del usuario que creó el registro.
- `updated_at` — Timestamp de última modificación.
- `updated_by` — UUID del último usuario que modificó.
- `version` — Número entero incremental (optimistic locking).

### P7. Identificadores UUID

Todas las claves primarias son UUID v4 generados por la aplicación o por `gen_random_uuid()`. No se usan secuencias auto-incrementales (`SERIAL`, `BIGSERIAL`) como PK. Las claves numéricas solo se permiten como identificadores legibles para humanos (ej: `expediente.numero_visible` → "EXP-2026-001234").

### P8. Versionado semántico

Cada entidad que evoluciona en el tiempo tiene un número de `version` que se incrementa en cada actualización. Las escrituras concurrentes se protegen con optimistic locking: el `UPDATE` incluye `WHERE version = :version_anterior` y falla si otro proceso modificó el registro entre la lectura y la escritura.

### P9. Timezone-aware

Todos los timestamps se almacenan en UTC con zona horaria (`TIMESTAMPTZ`). La conversión a la zona horaria del usuario se realiza en la capa de presentación, nunca en la base de datos.

### P10. Separación por schemas

El modelo se organiza en schemas de PostgreSQL que reflejan los límites del dominio (ver sección 4.2). No hay una tabla suelta sin schema asignado. Esto permite:
- Aislamiento de dominios.
- Permisos granulares por schema.
- Ciclos de vida independientes.
- Facilidad para migrar a bases de datos separadas si escala lo requiere.

### P11. RGPD nativo

Todo dato personal está identificado con metadatos de RGPD:
- `consent_id` — Referencia al consentimiento asociado.
- `retention_days` — Días de retención antes de anonimización programada.
- `anonymized_at` — Timestamp de anonimización (NULL si aún no se anonimizó).

El sistema nunca almacena datos personales sin consentimiento explícito registrable.

### P12. Event Sourcing parcial

No se aplica Event Sourcing puro (reconstruir todo el estado desde eventos) por coste y complejidad. Se usa un modelo híbrido:
- **Estado actual** en tablas de negocio (normalizadas, actualizables).
- **Historial inmutable** en tablas de eventos (append-only).
- **Reconstrucción** posible pero no necesaria para operaciones normales.
- **Snapshots periódicos** para expedientes cerrados (ver sección 7.4).

## 1.2 Consecuencias de los principios

| Principio | Implicación técnica |
|-----------|-------------------|
| Fuente de verdad única | No hay tablas redundantes. No hay caches Redis como fuente primaria. |
| No duplicación | Las vistas materializadas solo existen en el schema `analytics`. |
| Integridad referencial | No hay `ON DELETE CASCADE` sin aprobación explícita del arquitecto. |
| Inmutabilidad | Las tablas de eventos tienen `UPDATE` y `DELETE` prohibidos por RLS. |
| Soft delete | Todas las queries de negocio incluyen `WHERE deleted_at IS NULL`. |
| Auditoría | Ninguna tabla de negocio omite los campos de auditoría. |
| UUID | Ninguna PK es `SERIAL`. Las FK son `UUID`, no `INTEGER`. |
| Versionado | Toda escritura concurrente usa optimistic locking. |
| RGPD | No se almacena un email sin `consent_id` y `retention_days`. |

---

# 2. MODELO CONCEPTUAL

## 2.1 Mapa de dominios

Certilab se organiza en **ocho dominios** claramente delimitados:

```
┌────────────────────────────────────────────────────────────────────┐
│                     CERTILAB — MAPA DE DOMINIOS                    │
├────────────┬────────────┬────────────┬────────────┬───────────────┤
│            │            │            │            │               │
│  CLIENTES  │ INMUEBLES  │ SERVICIOS  │EXPEDIENTES │  PITR™       │
│            │            │            │            │               │
│  auth      │  core      │  core      │  core      │  pitr         │
│  .users    │  .clientes │  .servicios│  .expes    │  .templates   │
│  .clientes │  .inmuebles│            │  .docs     │  .respuestas  │
│            │            │            │  .pagos    │  .firmas      │
├────────────┼────────────┼────────────┼────────────┼───────────────┤
│            │            │            │            │               │
│  PAGOS     │ EVENTS     │ OBSERVAT.  │ AUTOMAT.   │  IA           │
│            │            │            │            │               │
│  billing   │  events    │  analytics │  automation│  ai           │
│  .pagos    │  .eventos  │  .observat │  .webhooks │  .prediccion  │
│  .facturas │  .snapshots│  .agregados│  .colas    │  .auditoria   │
│            │            │            │  .emails   │  .prompts     │
└────────────┴────────────┴────────────┴────────────┴───────────────┘
```

## 2.2 Diagrama de entidades conceptuales

```
┌─────────────────────────────────────────────────────────────────────┐
│                      DIAGRAMA CONCEPTUAL                            │
│                                                                     │
│                                                                     │
│  ┌──────────┐       ┌───────────┐       ┌───────────┐              │
│  │          │       │           │       │           │              │
│  │ EMPRESA  │ 1──N  │  USUARIO  │ 1──N  │  CLIENTE  │              │
│  │          │       │           │       │           │              │
│  └──────────┘       └───────────┘       └─────┬─────┘              │
│                                                │                    │
│                                                │ 1                  │
│                                                │                    │
│                                                ▼                    │
│                       ┌─────────────────┐  ┌──────────┐            │
│                       │                 │  │          │            │
│                       │   EXPEDIENTE    │◄─┤INMUEBLE  │            │
│                       │                 │  │          │            │
│                       └───┬───┬───┬─────┘  └──────────┘            │
│                           │   │   │                                 │
│                  ┌────────┘   │   └────────┐                       │
│                  ▼            ▼            ▼                       │
│           ┌──────────┐ ┌──────────┐ ┌──────────┐                  │
│           │          │ │          │ │          │                  │
│           │ SERVICIO │ │  PAGO    │ │ACTIVIDAD │                  │
│           │          │ │          │ │(EVENTOS) │                  │
│           └──────────┘ └──────────┘ └──────────┘                  │
│                                                │                    │
│                                                │                    │
│                  ┌─────────────────────────────┼──────┐            │
│                  │                             │      │            │
│                  ▼                             ▼      │            │
│           ┌──────────┐                 ┌──────────┐   │            │
│           │          │                 │          │   │            │
│           │ PITR     │                 │DOCUMENTO │   │            │
│           │          │                 │          │   │            │
│           │ ┌──────┐ │                 └──────────┘   │            │
│           │ │TEMPL.│ │                                │            │
│           │ │SECT. │ │                                │            │
│           │ │PREG. │ │                                │            │
│           │ │RPTA. │ │                                │            │
│           │ └──────┘ │                                │            │
│           └──────────┘                                │            │
│                                                        │            │
│           ┌────────────────────────────────────────────┘            │
│           ▼                                                         │
│    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐        │
│    │              │    │              │    │              │        │
│    │ OBSERVATORIO │    │ FACTURACIÓN  │    │    IA        │        │
│    │ (anonimizado)│    │              │    │ .predicción  │        │
│    │              │    │              │    │ .auditoría   │        │
│    └──────────────┘    └──────────────┘    └──────────────┘        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 2.3 Catálogo de entidades

| # | Entidad | Dominio | Propósito | V1.x | V2 | V3 |
|---|---------|---------|-----------|------|----|----|
| 1 | `empresa` | Clientes | Entidad multiempresa. Contiene la razón social, NIF, configuración. | ✅ | ✅ | ✅ |
| 2 | `usuario` | Clientes | Persona con acceso al sistema (admin, técnico, cliente). | ✅ | ✅ | ✅ |
| 3 | `cliente` | Clientes | Persona que contrata servicios. | ✅ | ✅ | ✅ |
| 4 | `inmueble` | Inmuebles | Propiedad sobre la que se realiza el servicio. | ✅ | ✅ | ✅ |
| 5 | `servicio` | Servicios | Producto contratable (Segunda Opinión, Express, ITE). | ✅ | ✅ | ✅ |
| 6 | `expediente` | Expedientes | Unidad de trabajo central. | ✅ | ✅ | ✅ |
| 7 | `documento` | Expedientes | Archivo asociado a un expediente. | ✅ | ✅ | ✅ |
| 8 | `pago` | Pagos | Transacción económica. | ✅ | ✅ | ✅ |
| 9 | `factura` | Pagos | Factura emitida. | 🔜 V1.4 | ✅ | ✅ |
| 10 | `actividad` | Events | Evento inmutable del sistema. | ✅ | ✅ | ✅ |
| 11 | `plantilla_pitr` | PITR | Template de inspección. | ✅ | ✅ | ✅ |
| 12 | `seccion_pitr` | PITR | Sección de un template. | ✅ | ✅ | ✅ |
| 13 | `pregunta_pitr` | PITR | Pregunta individual. | ✅ | ✅ | ✅ |
| 14 | `respuesta_pitr` | PITR | Respuesta a una pregunta. | ✅ | ✅ | ✅ |
| 15 | `firma_pitr` | PITR | Firma digital asociada. | 🔜 V1.4 | ✅ | ✅ |
| 16 | `version_pitr` | PITR | Versionado de templates. | ❌ | ✅ | ✅ |
| 17 | `observatorio` | Observatorio | Dato anonimizado público. | ✅ | ✅ | ✅ |
| 18 | `agregado_observatorio` | Observatorio | Dato precalculado para informes. | ❌ | ✅ | ✅ |
| 19 | `prediccion_ia` | IA | Predicción generada por IA. | ❌ | ✅ | ✅ |
| 20 | `auditoria_ia` | IA | Registro de acciones de IA. | ❌ | ✅ | ✅ |
| 21 | `prompt_ia` | IA | Template de prompt. | ❌ | ✅ | ✅ |
| 22 | `webhook` | Automatizaciones | Webhook registrado. | ✅ | ✅ | ✅ |
| 23 | `cola_tarea` | Automatizaciones | Cola de tareas pendientes. | 🔜 V1.4 | ✅ | ✅ |
| 24 | `email` | Automatizaciones | Email enviado/por enviar. | 🔜 V1.4 | ✅ | ✅ |
| 25 | `notificacion` | Automatizaciones | Notificación para el usuario. | 🔜 V1.4 | ✅ | ✅ |
| 26 | `integracion` | Integraciones | Configuración de integración externa. | ❌ | ✅ | ✅ |
| 27 | `consentimiento` | RGPD | Registro de consentimiento. | 🔜 V1.4 | ✅ | ✅ |
| 28 | `backup_log` | Auditoría | Registro de backup. | ❌ | ✅ | ✅ |

---

# 3. MODELO ENTIDAD RELACIÓN

## 3.1 Convenciones del MER

Cada entidad se define con los siguientes elementos:

```
### [Nombre Entidad] (`nombre_tabla`)
**Propósito:** [Descripción de una línea]
**Schema:** [schema.postgresql]

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| ...   | ...  | ✅ | ❌ | ✅           | ...     | ...         |

**Relaciones:**
- [Entidad A] 1 ── N [Entidad B] mediante `campo_fk`
- [Entidad C] N ── M [Entidad D] mediante `tabla_puente`

**Restricciones:**
- UNIQUE(`campo1`)
- CHECK(`campo` > 0)

**Índices:**
- `idx_tabla_campo` ON `tabla` (`campo`)
- `idx_tabla_compuesto` ON `tabla` (`campo1`, `campo2`)

**Versionado:** [Sí / No] — [Descripción de cómo se versiona]
```

---

## 3.2 Entidad: Empresa (`empresa`)

**Propósito:** Entidad raíz del modelo multiempresa. Cada empresa es un tenant independiente con sus propios clientes, expedientes, servicios y configuración. Todas las tablas de negocio referencian a `empresa.id`.

**Schema:** `core.empresa`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `nombre` | VARCHAR(255) | ❌ | ❌ | ✅ | — | Razón social |
| `nif` | VARCHAR(20) | ❌ | ❌ | ✅ | — | NIF/DNI/CIF |
| `slug` | VARCHAR(100) | ❌ | ❌ | ✅ | — | Identificador URL único |
| `logo_url` | TEXT | ❌ | ❌ | ❌ | NULL | URL del logo |
| `direccion` | TEXT | ❌ | ❌ | ❌ | NULL | Dirección fiscal |
| `ciudad` | VARCHAR(150) | ❌ | ❌ | ❌ | NULL | Ciudad |
| `codigo_postal` | VARCHAR(10) | ❌ | ❌ | ❌ | NULL | Código postal |
| `pais` | VARCHAR(100) | ❌ | ❌ | ❌ | 'ESPAÑA' | País |
| `email_contacto` | VARCHAR(255) | ❌ | ❌ | ✅ | — | Email de contacto |
| `telefono` | VARCHAR(20) | ❌ | ❌ | ❌ | NULL | Teléfono |
| `web` | VARCHAR(255) | ❌ | ❌ | ❌ | NULL | Sitio web |
| `config` | JSONB | ❌ | ❌ | ❌ | '{}' | Configuración específica de la empresa |
| `plan` | VARCHAR(50) | ❌ | ❌ | ✅ | 'free' | Plan de suscripción (free, pro, enterprise) |
| `activa` | BOOLEAN | ❌ | ❌ | ✅ | true | ¿Empresa activa? |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `deleted_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Soft delete |
| `deleted_by` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` |
| `version` | INTEGER | ❌ | ❌ | ✅ | 1 | Optimistic locking |

**Relaciones:**
- `empresa` 1 ── N `usuario` mediante `usuario.empresa_id`
- `empresa` 1 ── N `cliente` mediante `cliente.empresa_id`
- `empresa` 1 ── N `expediente` mediante `expediente.empresa_id`
- `empresa` 1 ── N `servicio` mediante `servicio.empresa_id`

**Restricciones:**
- UNIQUE(`slug`)
- UNIQUE(`nif`)

**Índices:**
- `idx_empresa_slug` ON `empresa` (`slug`) WHERE `deleted_at IS NULL`
- `idx_empresa_nif` ON `empresa` (`nif`) WHERE `deleted_at IS NULL`
- `idx_empresa_plan` ON `empresa` (`plan`)

**Versionado:** Sí. Cada cambio en `config` o `plan` genera un evento en `events.evento`.

---

## 3.3 Entidad: Usuario (`usuario`)

**Propósito:** Persona con acceso al sistema. Puede ser administrador, arquitecto técnico o personal de backoffice. El cliente NO está aquí — el cliente tiene su propia entidad para separar datos personales de acceso al sistema.

**Schema:** `auth.usuario`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `auth_user_id` | UUID | ❌ | ✅ | ✅ | — | FK → `auth.users.id` (Supabase Auth) |
| `email` | VARCHAR(255) | ❌ | ❌ | ✅ | — | Email (único por empresa) |
| `nombre` | VARCHAR(150) | ❌ | ❌ | ✅ | — | Nombre |
| `apellidos` | VARCHAR(255) | ❌ | ❌ | ✅ | — | Apellidos |
| `rol` | VARCHAR(50) | ❌ | ❌ | ✅ | 'tecnico' | Rol: 'admin', 'tecnico', 'backoffice', 'sistema' |
| `telefono` | VARCHAR(20) | ❌ | ❌ | ❌ | NULL | Teléfono |
| `avatar_url` | TEXT | ❌ | ❌ | ❌ | NULL | Avatar |
| `numero_colegial` | VARCHAR(50) | ❌ | ❌ | ❌ | NULL | Nº colegiado (arquitectos técnicos) |
| `especialidad` | VARCHAR(255) | ❌ | ❌ | ❌ | NULL | Especialidad técnica |
| `firma_digital` | TEXT | ❌ | ❌ | ❌ | NULL | Hash de firma digital |
| `activo` | BOOLEAN | ❌ | ❌ | ✅ | true | ¿Usuario activo? |
| `ultimo_acceso` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Último login |
| `preferencias` | JSONB | ❌ | ❌ | ❌ | '{}' | Preferencias de UI |
| `consent_id` | UUID | ❌ | ✅ | ✅ | — | FK → `core.consentimiento.id` |
| `retention_days` | INTEGER | ❌ | ❌ | ✅ | 1825 | Días de retención (5 años por defecto) |
| `anonymized_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Fecha de anonimización |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `deleted_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Soft delete |
| `deleted_by` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` |
| `version` | INTEGER | ❌ | ❌ | ✅ | 1 | Optimistic locking |

**Relaciones:**
- `usuario` N ── 1 `empresa` mediante `empresa_id`
- `usuario` 1 ── N `expediente` (como técnico asignado) mediante `expediente.tecnico_asignado_id`
- `usuario` 1 ── N `actividad` (como actor) mediante `actividad.usuario_id`

**Restricciones:**
- UNIQUE(`email`, `empresa_id`)
- UNIQUE(`auth_user_id`)
- CHECK(`rol` IN ('admin', 'tecnico', 'backoffice', 'sistema'))

**Índices:**
- `idx_usuario_email` ON `usuario` (`email`) WHERE `deleted_at IS NULL`
- `idx_usuario_empresa` ON `usuario` (`empresa_id`) WHERE `deleted_at IS NULL`
- `idx_usuario_rol` ON `usuario` (`rol`)
- `idx_usuario_auth` ON `usuario` (`auth_user_id`)

**Versionado:** No. El usuario es una entidad de sistema, no de negocio. Los cambios en roles se registran como eventos.

---

## 3.4 Entidad: Cliente (`cliente`)

**Propósito:** Persona física que contrata servicios de Certilab. Separada de `usuario` por diseño: un cliente puede no tener acceso a la plataforma (si un técnico gestiona por él), y un usuario no es necesariamente un cliente.

**Schema:** `core.cliente`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `usuario_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` (si tiene acceso a plataforma) |
| `email` | VARCHAR(255) | ❌ | ❌ | ✅ | — | Email (único por empresa) |
| `nombre` | VARCHAR(150) | ❌ | ❌ | ✅ | — | Nombre |
| `apellidos` | VARCHAR(255) | ❌ | ❌ | ✅ | — | Apellidos |
| `telefono` | VARCHAR(20) | ❌ | ❌ | ❌ | NULL | Teléfono |
| `dni` | VARCHAR(15) | ❌ | ❌ | ❌ | NULL | DNI/NIE (cifrado) |
| `direccion` | TEXT | ❌ | ❌ | ❌ | NULL | Dirección |
| `ciudad` | VARCHAR(150) | ❌ | ❌ | ❌ | NULL | Ciudad |
| `codigo_postal` | VARCHAR(10) | ❌ | ❌ | ❌ | NULL | Código postal |
| `notas` | TEXT | ❌ | ❌ | ❌ | NULL | Notas internas |
| `origen` | VARCHAR(50) | ❌ | ❌ | ❌ | 'web' | Origen (web, whatsapp, referido, etc.) |
| `consent_id` | UUID | ❌ | ✅ | ✅ | — | FK → `core.consentimiento.id` |
| `retention_days` | INTEGER | ❌ | ❌ | ✅ | 2190 | Días de retención (6 años por defecto) |
| `anonymized_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Fecha de anonimización |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `deleted_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Soft delete |
| `deleted_by` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` |
| `version` | INTEGER | ❌ | ❌ | ✅ | 1 | Optimistic locking |

**Relaciones:**
- `cliente` N ── 1 `empresa` mediante `empresa_id`
- `cliente` 1 ── 1 `usuario` mediante `usuario_id` (opcional)
- `cliente` 1 ── N `inmueble` mediante `inmueble.cliente_id`
- `cliente` 1 ── N `expediente` mediante `expediente.cliente_id`
- `cliente` 1 ── N `consentimiento` mediante `consent_id`

**Restricciones:**
- UNIQUE(`email`, `empresa_id`)
- CHECK(`retencion_dias` >= 365)

**Índices:**
- `idx_cliente_email` ON `cliente` (`email`) WHERE `deleted_at IS NULL`
- `idx_cliente_empresa` ON `cliente` (`empresa_id`) WHERE `deleted_at IS NULL`
- `idx_cliente_usuario` ON `cliente` (`usuario_id`) WHERE `deleted_at IS NULL`

**Versionado:** No. Los cambios en datos del cliente se registran como eventos.

**Nota de seguridad:** El campo `dni` se almacena cifrado con AES-256. Solo el Administrador y el Arquitecto Técnico asignado pueden desencriptarlo.

---

## 3.5 Entidad: Inmueble (`inmueble`)

**Propósito:** El inmueble sobre el que se realiza el servicio. Es independiente del expediente: el mismo inmueble puede tener múltiples expedientes a lo largo del tiempo (inspecciones periódicas, cambios de normativa, etc.).

**Schema:** `core.inmueble`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `cliente_id` | UUID | ❌ | ✅ | ✅ | — | FK → `cliente.id` |
| `ref_catastral` | VARCHAR(20) | ❌ | ❌ | ❌ | NULL | Referencia catastral (20 dígitos) |
| `direccion` | TEXT | ❌ | ❌ | ✅ | — | Dirección completa |
| `ciudad` | VARCHAR(150) | ❌ | ❌ | ✅ | — | Ciudad |
| `codigo_postal` | VARCHAR(10) | ❌ | ❌ | ✅ | — | Código postal |
| `provincia` | VARCHAR(100) | ❌ | ❌ | ✅ | — | Provincia |
| `pais` | VARCHAR(100) | ❌ | ❌ | ❌ | 'ESPAÑA' | País |
| `latitud` | NUMERIC(10,7) | ❌ | ❌ | ❌ | NULL | Latitud (geolocalización) |
| `longitud` | NUMERIC(10,7) | ❌ | ❌ | ❌ | NULL | Longitud (geolocalización) |
| `tipo` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Tipo: 'piso', 'unifamiliar', 'local', 'oficina', 'industrial', 'otro' |
| `tipo_edificio` | VARCHAR(50) | ❌ | ❌ | ❌ | NULL | 'bloque', 'adosado', 'aislado', 'pareado' |
| `superficie` | NUMERIC(10,2) | ❌ | ❌ | ❌ | NULL | Metros cuadrados |
| `ano_construccion` | INTEGER | ❌ | ❌ | ❌ | NULL | Año de construcción |
| `plantas` | INTEGER | ❌ | ❌ | ❌ | NULL | Número de plantas |
| `orientacion` | VARCHAR(20) | ❌ | ❌ | ❌ | NULL | Norte, Sur, Este, Oeste, Mixta |
| `certificado_existente_url` | TEXT | ❌ | ❌ | ❌ | NULL | URL del certificado energético existente |
| `certificado_letra` | CHAR(1) | ❌ | ❌ | ❌ | NULL | Letra del certificado existente (A-G) |
| `certificado_consumo` | NUMERIC(10,2) | ❌ | ❌ | ❌ | NULL | Consumo en kWh/m²año |
| `certificado_emisiones` | NUMERIC(10,2) | ❌ | ❌ | ❌ | NULL | Emisiones en kgCO₂/m²año |
| `datos_catastrales` | JSONB | ❌ | ❌ | ❌ | NULL | Datos obtenidos del Catastro |
| `notas` | TEXT | ❌ | ❌ | ❌ | NULL | Notas internas |
| `consent_id` | UUID | ❌ | ✅ | ✅ | — | FK → `core.consentimiento.id` |
| `retention_days` | INTEGER | ❌ | ❌ | ✅ | 2190 | Días de retención |
| `anonymized_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Fecha de anonimización |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `deleted_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Soft delete |
| `deleted_by` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` |
| `version` | INTEGER | ❌ | ❌ | ✅ | 1 | Optimistic locking |

**Relaciones:**
- `inmueble` N ── 1 `empresa` mediante `empresa_id`
- `inmueble` N ── 1 `cliente` mediante `cliente_id`
- `inmueble` 1 ── N `expediente` mediante `expediente.inmueble_id`
- `inmueble` 1 ── N `documento` mediante `documento.inmueble_id`

**Restricciones:**
- UNIQUE(`ref_catastral`, `empresa_id`) — La ref catastral es única por empresa
- CHECK(`ano_construccion` >= 1800 AND `ano_construccion` <= EXTRACT(YEAR FROM CURRENT_DATE) + 1)
- CHECK(`superficie` IS NULL OR `superficie` > 0)

**Índices:**
- `idx_inmueble_cliente` ON `inmueble` (`cliente_id`) WHERE `deleted_at IS NULL`
- `idx_inmueble_cp` ON `inmueble` (`codigo_postal`) WHERE `deleted_at IS NULL`
- `idx_inmueble_refcat` ON `inmueble` (`ref_catastral`) WHERE `deleted_at IS NULL`

**Versionado:** No. Los cambios en datos del inmueble se registran como eventos.

---

## 3.6 Entidad: Servicio (`servicio`)

**Propósito:** Producto que Certilab ofrece. Define precio, plazo de entrega, template PITR asociado y configuración del flujo.

**Schema:** `core.servicio`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `codigo` | VARCHAR(20) | ❌ | ❌ | ✅ | — | Código interno (ej: "SO-001") |
| `nombre` | VARCHAR(200) | ❌ | ❌ | ✅ | — | Nombre comercial |
| `slug` | VARCHAR(100) | ❌ | ❌ | ✅ | — | Slug para URLs |
| `descripcion` | TEXT | ❌ | ❌ | ✅ | — | Descripción |
| `precio_base` | NUMERIC(10,2) | ❌ | ❌ | ✅ | — | Precio en euros |
| `moneda` | VARCHAR(3) | ❌ | ❌ | ✅ | 'EUR' | Moneda |
| `dias_limite` | INTEGER | ❌ | ❌ | ✅ | — | Plazo de entrega en días |
| `duracion_estimada` | INTEGER | ❌ | ❌ | ❌ | NULL | Minutos estimados de inspección |
| `template_pitr_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `pitr.plantilla_pitr.id` |
| `requiere_inspeccion` | BOOLEAN | ❌ | ❌ | ✅ | true | ¿Requiere completar PITR? |
| `requiere_documentacion` | BOOLEAN | ❌ | ❌ | ✅ | true | ¿Requiere subir documentos? |
| `requiere_pago` | BOOLEAN | ❌ | ❌ | ✅ | true | ¿Requiere pago? |
| `config` | JSONB | ❌ | ❌ | ❌ | '{}' | Configuración específica |
| `activo` | BOOLEAN | ❌ | ❌ | ✅ | true | ¿Servicio disponible? |
| `orden` | INTEGER | ❌ | ❌ | ❌ | 0 | Orden de presentación |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `deleted_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Soft delete |
| `deleted_by` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` |
| `version` | INTEGER | ❌ | ❌ | ✅ | 1 | Optimistic locking |

**Relaciones:**
- `servicio` N ── 1 `empresa` mediante `empresa_id`
- `servicio` 1 ── 1 `plantilla_pitr` mediante `template_pitr_id` (opcional)
- `servicio` 1 ── N `expediente` mediante `expediente.servicio_id`

**Restricciones:**
- UNIQUE(`codigo`, `empresa_id`)
- UNIQUE(`slug`)
- CHECK(`precio_base` >= 0)
- CHECK(`dias_limite` > 0)

**Índices:**
- `idx_servicio_codigo` ON `servicio` (`codigo`) WHERE `deleted_at IS NULL`
- `idx_servicio_slug` ON `servicio` (`slug`) WHERE `deleted_at IS NULL`
- `idx_servicio_empresa` ON `servicio` (`empresa_id`) WHERE `deleted_at IS NULL`

**Versionado:** Sí. Cada cambio de precio o configuración genera un evento.

---

## 3.7 Entidad: Expediente (`expediente`)

**Propósito:** Entidad central del sistema. Representa un caso de servicio contratado. Agrupa todas las entidades relacionadas (documentos, pagos, respuestas PITR, actividad).

**Schema:** `core.expediente`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `numero_visible` | VARCHAR(20) | ❌ | ❌ | ✅ | — | Nº legible (EXP-2026-XXXXX) |
| `cliente_id` | UUID | ❌ | ✅ | ✅ | — | FK → `cliente.id` |
| `inmueble_id` | UUID | ❌ | ✅ | ✅ | — | FK → `inmueble.id` |
| `servicio_id` | UUID | ❌ | ✅ | ✅ | — | FK → `servicio.id` |
| `tecnico_asignado_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` (técnico) |
| `estado` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Máquina de estados |
| `prioridad` | VARCHAR(20) | ❌ | ❌ | ❌ | 'media' | 'baja', 'media', 'alta', 'urgente' |
| `progreso` | INTEGER | ❌ | ❌ | ❌ | 0 | Porcentaje 0-100 |
| `fecha_inicio` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Inicio del servicio |
| `fecha_limite` | TIMESTAMPTZ | ❌ | ❌ | ✅ | — | Deadline |
| `fecha_cierre` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Cierre del expediente |
| `dictamen` | VARCHAR(30) | ❌ | ❌ | ❌ | NULL | 'CORRECTO', 'INFLADO', 'MAL_CALCULADO', 'FALSEADO' |
| `letra_original` | CHAR(1) | ❌ | ❌ | ❌ | NULL | Letra del certificado auditado |
| `letra_certilab` | CHAR(1) | ❌ | ❌ | ❌ | NULL | Letra según dictamen |
| `informe_url` | TEXT | ❌ | ❌ | ❌ | NULL | URL del informe final |
| `notas_internas` | TEXT | ❌ | ❌ | ❌ | NULL | Notas del técnico |
| `tags` | TEXT[] | ❌ | ❌ | ❌ | '{}' | Etiquetas para búsqueda |
| `config` | JSONB | ❌ | ❌ | ❌ | '{}' | Configuración específica |
| `consent_id` | UUID | ❌ | ✅ | ✅ | — | FK → `core.consentimiento.id` |
| `retention_days` | INTEGER | ❌ | ❌ | ✅ | 2190 | Días de retención |
| `anonymized_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Fecha de anonimización |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `deleted_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Soft delete |
| `deleted_by` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` |
| `version` | INTEGER | ❌ | ❌ | ✅ | 1 | Optimistic locking |

**Relaciones:**
- `expediente` N ── 1 `empresa`
- `expediente` N ── 1 `cliente`
- `expediente` N ── 1 `inmueble`
- `expediente` N ── 1 `servicio`
- `expediente` N ── 1 `usuario` (técnico asignado)
- `expediente` 1 ── N `documento`
- `expediente` 1 ── N `pago`
- `expediente` 1 ── N `factura`
- `expediente` 1 ── N `actividad`
- `expediente` 1 ── 1 `respuesta_pitr` (la respuesta completa)
- `expediente` 1 ── N `notificacion`

**Restricciones:**
- UNIQUE(`numero_visible`, `empresa_id`)
- CHECK(`progreso` >= 0 AND `progreso` <= 100)
- CHECK(`prioridad` IN ('baja', 'media', 'alta', 'urgente'))
- CHECK(`dictamen` IS NULL OR `dictamen` IN ('CORRECTO', 'INFLADO', 'MAL_CALCULADO', 'FALSEADO'))
- CHECK(`letra_original` IS NULL OR `letra_original` ~ '^[A-G]$')
- CHECK(`letra_certilab` IS NULL OR `letra_certilab` ~ '^[A-G]$')

**Índices:**
- `idx_expediente_numero` ON `expediente` (`numero_visible`)
- `idx_expediente_cliente` ON `expediente` (`cliente_id`) WHERE `deleted_at IS NULL`
- `idx_expediente_inmueble` ON `expediente` (`inmueble_id`) WHERE `deleted_at IS NULL`
- `idx_expediente_estado` ON `expediente` (`estado`)
- `idx_expediente_tecnico` ON `expediente` (`tecnico_asignado_id`) WHERE `deleted_at IS NULL`
- `idx_expediente_fecha_limite` ON `expediente` (`fecha_limite`) WHERE `deleted_at IS NULL`
- `idx_expediente_empresa_estado` ON `expediente` (`empresa_id`, `estado`)

**Versionado:** Sí. Cada cambio de estado genera un evento y actualiza la versión.

---

## 3.8 Entidad: Documento (`documento`)

**Propósito:** Archivo asociado a un expediente o inmueble. Puede ser un PDF, foto, firma, informe o cualquier adjunto.

**Schema:** `core.documento`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `expediente_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `expediente.id` |
| `inmueble_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `inmueble.id` |
| `cliente_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `cliente.id` |
| `tipo` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Tipo de documento (ver enumerados) |
| `nombre` | VARCHAR(255) | ❌ | ❌ | ✅ | — | Nombre original del archivo |
| `mime_type` | VARCHAR(100) | ❌ | ❌ | ✅ | — | Tipo MIME |
| `tamano_bytes` | BIGINT | ❌ | ❌ | ✅ | — | Tamaño en bytes |
| `storage_path` | TEXT | ❌ | ❌ | ✅ | — | Ruta en Supabase Storage |
| `hash_sha256` | VARCHAR(64) | ❌ | ❌ | ✅ | — | Hash SHA-256 del archivo |
| `firmado` | BOOLEAN | ❌ | ❌ | ❌ | false | ¿Documento firmado digitalmente? |
| `firma_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `pitr.firma.id` (si aplica) |
| `version` | INTEGER | ❌ | ❌ | ❌ | 1 | Versión del documento |
| `metadatos` | JSONB | ❌ | ❌ | ❌ | '{}' | Metadatos del archivo (OCR, etc.) |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Subida |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `deleted_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Soft delete |
| `deleted_by` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` |

**Relaciones:**
- `documento` N ── 1 `expediente`
- `documento` N ── 1 `inmueble`
- `documento` N ── 1 `cliente`
- `documento` 1 ── 1 `firma`

**Tipos de documento (ENUM):**
- `CERTIFICADO_ORIGINAL` — Certificado energético a auditar
- `FACTURA` — Factura del servicio
- `INFORME_FINAL` — Dictamen técnico en PDF
- `DOCUMENTACION_COMPLEMENTARIA` — Documentos adicionales
- `FOTOGRAFIA` — Fotos del inmueble
- `NOTA_TECNICA` — Notas internas del técnico
- `FOTO_FACHADA` — Foto de fachada
- `FOTO_VENTANAS` — Foto de ventanas
- `FOTO_CLIMATIZACION` — Foto de equipos
- `FOTO_INSTALACIONES` — Foto de instalaciones
- `FIRMA_CLIENTE` — Firma del cliente
- `FIRMA_TECNICO` — Firma del técnico
- `CE3X_XML` — Archivo XML de CE3X
- `OTRO` — Otros

**Restricciones:**
- CHECK(`tamano_bytes` > 0)
- CHECK(`tipo` IS NOT NULL)
- Al menos una FK a expediente, inmueble o cliente debe ser no NULL

**Índices:**
- `idx_documento_expediente` ON `documento` (`expediente_id`)
- `idx_documento_tipo` ON `documento` (`tipo`)
- `idx_documento_hash` ON `documento` (`hash_sha256`)

**Versionado:** Sí. Un documento puede tener versiones (nueva versión = nuevo registro con mismo `expediente_id` y `tipo`, `version` incrementado).

---

## 3.9 Entidad: Pago (`pago`)

**Propósito:** Transacción económica asociada a un expediente.

**Schema:** `billing.pago`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `expediente_id` | UUID | ❌ | ✅ | ✅ | — | FK → `expediente.id` |
| `servicio_id` | UUID | ❌ | ✅ | ✅ | — | FK → `servicio.id` |
| `proveedor` | VARCHAR(50) | ❌ | ❌ | ✅ | — | 'mypos', 'stripe', 'transferencia' |
| `proveedor_pago_id` | VARCHAR(255) | ❌ | ❌ | ❌ | NULL | ID del pago en el proveedor |
| `estado` | VARCHAR(30) | ❌ | ❌ | ✅ | 'PENDIENTE' | Estado del pago |
| `importe` | NUMERIC(10,2) | ❌ | ❌ | ✅ | — | Importe en euros |
| `moneda` | VARCHAR(3) | ❌ | ❌ | ✅ | 'EUR' | Moneda |
| `comision` | NUMERIC(10,2) | ❌ | ❌ | ❌ | NULL | Comisión del proveedor |
| `importe_neto` | NUMERIC(10,2) | ❌ | ❌ | ❌ | NULL | Importe neto (importe - comisión) |
| `metodo_pago` | VARCHAR(50) | ❌ | ❌ | ❌ | NULL | 'tarjeta', 'transferencia', 'bizum' |
| `fecha_pago` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Fecha de confirmación |
| `link_pago` | TEXT | ❌ | ❌ | ❌ | NULL | URL del link de pago |
| `webhook_recibido` | BOOLEAN | ❌ | ❌ | ❌ | false | ¿Se recibió webhook de confirmación? |
| `webhook_payload` | JSONB | ❌ | ❌ | ❌ | NULL | Payload completo del webhook |
| `metadata` | JSONB | ❌ | ❌ | ❌ | '{}' | Metadatos adicionales |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `version` | INTEGER | ❌ | ❌ | ✅ | 1 | Optimistic locking |

**Estados de pago (ENUM):**
- `PENDIENTE` — Pago no realizado
- `PROCESANDO` — Pago en proceso
- `COMPLETADO` — Pago confirmado
- `RECHAZADO` — Pago rechazado
- `REEMBOLSADO` — Pago devuelto
- `CANCELADO` — Pago cancelado

**Relaciones:**
- `pago` N ── 1 `expediente`
- `pago` 1 ── 1 `factura`

**Restricciones:**
- CHECK(`importe` > 0)
- CHECK(`estado` IN ('PENDIENTE', 'PROCESANDO', 'COMPLETADO', 'RECHAZADO', 'REEMBOLSADO', 'CANCELADO'))

**Índices:**
- `idx_pago_expediente` ON `pago` (`expediente_id`)
- `idx_pago_proveedor` ON `pago` (`proveedor`, `proveedor_pago_id`)
- `idx_pago_estado` ON `pago` (`estado`)

**Versionado:** Sí. Cada cambio de estado es crítico y se registra como evento.

---

## 3.10 Entidad: Factura (`factura`)

**Propósito:** Factura fiscal emitida. Válida para contabilidad y cumplimiento tributario.

**Schema:** `billing.factura`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `pago_id` | UUID | ❌ | ✅ | ✅ | — | FK → `pago.id` |
| `expediente_id` | UUID | ❌ | ✅ | ✅ | — | FK → `expediente.id` |
| `numero_factura` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Nº de factura secuencial |
| `serie` | VARCHAR(10) | ❌ | ❌ | ❌ | 'F' | Serie fiscal |
| `importe_base` | NUMERIC(10,2) | ❌ | ❌ | ✅ | — | Base imponible |
| `iva_porcentaje` | NUMERIC(5,2) | ❌ | ❌ | ✅ | 21.00 | % de IVA |
| `iva_importe` | NUMERIC(10,2) | ❌ | ❌ | ✅ | — | Importe del IVA |
| `importe_total` | NUMERIC(10,2) | ❌ | ❌ | ✅ | — | Total con IVA |
| `pdf_url` | TEXT | ❌ | ❌ | ❌ | NULL | URL del PDF de la factura |
| `estado` | VARCHAR(20) | ❌ | ❌ | ✅ | 'EMITIDA' | 'EMITIDA', 'PAGADA', 'ANULADA' |
| `fecha_emision` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Fecha de emisión |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `version` | INTEGER | ❌ | ❌ | ✅ | 1 | Optimistic locking |

**Relaciones:**
- `factura` 1 ── 1 `pago`
- `factura` N ── 1 `expediente`

**Restricciones:**
- UNIQUE(`numero_factura`, `serie`, `empresa_id`)
- CHECK(`importe_total` > 0)

**Índices:**
- `idx_factura_numero` ON `factura` (`numero_factura`, `serie`)
- `idx_factura_expediente` ON `factura` (`expediente_id`)
- `idx_factura_pago` ON `factura` (`pago_id`)

**Versionado:** No. Las facturas son inmutables (solo estado puede cambiar).

---

## 3.11 Entidad: Actividad (`actividad`)

**Propósito:** Registro inmutable de eventos del sistema. Es la tabla de auditoría principal.

**Schema:** `events.actividad`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `expediente_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `expediente.id` (puede ser NULL para eventos globales) |
| `usuario_id` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` (quién generó el evento) |
| `tipo` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Tipo de evento |
| `severidad` | VARCHAR(20) | ❌ | ❌ | ❌ | 'info' | 'info', 'warning', 'error', 'critical' |
| `datos` | JSONB | ❌ | ❌ | ❌ | '{}' | Payload del evento |
| `datos_anteriores` | JSONB | ❌ | ❌ | ❌ | NULL | Snapshot del estado anterior (si aplica) |
| `ip_origen` | INET | ❌ | ❌ | ❌ | NULL | IP desde la que se generó |
| `user_agent` | TEXT | ❌ | ❌ | ❌ | NULL | User-Agent |
| `timestamp` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Cuándo ocurrió (inmutable) |

**Tipos de evento (30+ tipos planificados):**
- `EXPEDIENTE.CREADO` — Expediente creado
- `EXPEDIENTE.CAMBIO_ESTADO` — Transición de estado
- `EXPEDIENTE.ASIGNADO` — Técnico asignado
- `EXPEDIENTE.CERRADO` — Expediente cerrado
- `EXPEDIENTE.REABIERTO` — Expediente reabierto
- `CLIENTE.CREADO` — Cliente registrado
- `CLIENTE.ACTUALIZADO` — Datos del cliente modificados
- `INMUEBLE.CREADO` — Inmueble registrado
- `INMUEBLE.ACTUALIZADO` — Datos del inmueble modificados
- `PAGO.CREADO` — Pago iniciado
- `PAGO.COMPLETADO` — Pago confirmado
- `PAGO.RECHAZADO` — Pago rechazado
- `PAGO.REEMBOLSADO` — Pago devuelto
- `DOCUMENTO.SUBIDO` — Documento subido
- `DOCUMENTO.VALIDADO` — Documento verificado
- `DOCUMENTO.ELIMINADO` — Documento eliminado (soft delete)
- `PITR.INICIADO` — Inspección comenzada
- `PITR.COMPLETADO` — Inspección finalizada
- `PITR.RESPUESTA_GUARDADA` — Respuesta guardada
- `PITR.FIRMADO` — Firma registrada
- `DICTAMEN.EMITIDO` — Dictamen generado
- `DICTAMEN.VALIDADO` — Dictamen validado por técnico
- `OBSERVATORIO.ANONIMIZADO` — Datos enviados al Observatorio
- `IA.PREDICCION_SOLICITADA` — IA consultada
- `IA.PREDICCION_ENTREGADA` — Respuesta de IA registrada
- `USUARIO.LOGIN` — Inicio de sesión
- `USUARIO.LOGOUT` — Cierre de sesión
- `USUARIO.CAMBIO_ROL` — Cambio de rol
- `EMPRESA.CONFIG_ACTUALIZADA` — Configuración de empresa modificada
- `SEGURIDAD.INTENTO_FALLIDO` — Intento de acceso no autorizado
- `SEGURIDAD.RLS_VIOLACION` — Intento de violación de RLS
- `INTEGRACION.WEBHOOK_RECIBIDO` — Webhook entrante
- `INTEGRACION.WEBHOOK_ENVIADO` — Webhook saliente
- `AUTOMATIZACION.WORKFLOW_EJECUTADO` — Workflow de n8n ejecutado

**Relaciones:**
- `actividad` N ── 1 `expediente`
- `actividad` N ── 1 `usuario`

**Restricciones:**
- `UPDATE` y `DELETE` prohibidos por RLS (tabla append-only)
- CHECK(`tipo` ~ '^[A-Z]+\.[A-Z_]+$') — Formato estricto de tipo

**Índices:**
- `idx_actividad_expediente` ON `actividad` (`expediente_id`)
- `idx_actividad_tipo` ON `actividad` (`tipo`)
- `idx_actividad_usuario` ON `actividad` (`usuario_id`)
- `idx_actividad_timestamp` ON `actividad` (`timestamp`)
- `idx_actividad_empresa_tipo` ON `actividad` (`empresa_id`, `tipo`)

**Versionado:** No. Es una tabla append-only e inmutable.

---

## 3.12 Entidad: Plantilla PITR (`plantilla_pitr`)

**Propósito:** Template maestro de inspección. Define la estructura completa de un PITR: secciones, preguntas, validaciones y configuración.

**Schema:** `pitr.plantilla_pitr`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `nombre` | VARCHAR(200) | ❌ | ❌ | ✅ | — | Nombre visible |
| `slug` | VARCHAR(100) | ❌ | ❌ | ✅ | — | Identificador URL único |
| `version` | VARCHAR(10) | ❌ | ❌ | ✅ | '1.0.0' | Versión semántica |
| `descripcion` | TEXT | ❌ | ❌ | ❌ | NULL | Propósito de la plantilla |
| `config` | JSONB | ❌ | ❌ | ❌ | '{}' | Configuración del template (slots, flags) |
| `activa` | BOOLEAN | ❌ | ❌ | ✅ | true | ¿Disponible para usar? |
| `publica` | BOOLEAN | ❌ | ❌ | ❌ | false | ¿Visible para otras empresas (SaaS V3)? |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `deleted_at` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Soft delete |
| `deleted_by` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` |
| `version` | INTEGER | ❌ | ❌ | ✅ | 1 | Optimistic locking |

**Relaciones:**
- `plantilla_pitr` 1 ── N `seccion_pitr` mediante `seccion_pitr.plantilla_id`
- `plantilla_pitr` 1 ── N `version_pitr` (historial de versiones)

**Restricciones:**
- UNIQUE(`slug`, `empresa_id`)

**Índices:**
- `idx_plantilla_slug` ON `plantilla_pitr` (`slug`) WHERE `deleted_at IS NULL`

**Versionado:** Sí. Cada modificación crea un registro en `version_pitr`.

---

## 3.13 Entidad: Sección PITR (`seccion_pitr`)

**Propósito:** Agrupación lógica de preguntas dentro de un template.

**Schema:** `pitr.seccion_pitr`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `plantilla_id` | UUID | ❌ | ✅ | ✅ | — | FK → `plantilla_pitr.id` |
| `nombre` | VARCHAR(200) | ❌ | ❌ | ✅ | — | Nombre visible |
| `descripcion` | TEXT | ❌ | ❌ | ❌ | NULL | Texto de ayuda |
| `orden` | INTEGER | ❌ | ❌ | ✅ | — | Posición en el flujo |
| `obligatoria` | BOOLEAN | ❌ | ❌ | ❌ | true | ¿Sección obligatoria? |
| `tiempo_estimado` | INTEGER | ❌ | ❌ | ❌ | NULL | Minutos estimados |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |

**Relaciones:**
- `seccion_pitr` N ── 1 `plantilla_pitr`
- `seccion_pitr` 1 ── N `pregunta_pitr` mediante `pregunta_pitr.seccion_id`

**Restricciones:**
- UNIQUE(`plantilla_id`, `orden`)
- CHECK(`orden` > 0)

**Índices:**
- `idx_seccion_plantilla` ON `seccion_pitr` (`plantilla_id`, `orden`)

**Versionado:** La sección se versiona a través de la plantilla padre.

---

## 3.14 Entidad: Pregunta PITR (`pregunta_pitr`)

**Propósito:** Pregunta individual dentro de una sección.

**Schema:** `pitr.pregunta_pitr`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `seccion_id` | UUID | ❌ | ✅ | ✅ | — | FK → `seccion_pitr.id` |
| `tipo` | VARCHAR(30) | ❌ | ❌ | ✅ | — | Tipo de input (15 tipos) |
| `texto` | TEXT | ❌ | ❌ | ✅ | — | Enunciado de la pregunta |
| `descripcion` | TEXT | ❌ | ❌ | ❌ | NULL | Texto de ayuda |
| `placeholder` | VARCHAR(255) | ❌ | ❌ | ❌ | NULL | Placeholder |
| `obligatoria` | BOOLEAN | ❌ | ❌ | ❌ | false | ¿Obligatoria? |
| `orden` | INTEGER | ❌ | ❌ | ✅ | — | Posición en la sección |
| `opciones` | JSONB | ❌ | ❌ | ❌ | NULL | Opciones para select, radio, checkbox |
| `validacion` | JSONB | ❌ | ❌ | ❌ | NULL | Reglas de validación (min, max, pattern, etc.) |
| `condicion` | JSONB | ❌ | ❌ | ❌ | NULL | Condición de visibilidad |
| `valor_default` | JSONB | ❌ | ❌ | ❌ | NULL | Valor por defecto |
| `destino` | VARCHAR(100) | ❌ | ❌ | ❌ | NULL | Sección destino (salto condicional) |
| `metadata` | JSONB | ❌ | ❌ | ❌ | '{}' | Metadatos para integraciones |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |

**Tipos de pregunta (15):**
`texto`, `textarea`, `select`, `radio`, `checkbox`, `fecha`, `email`, `telefono`, `numero`, `fotografia`, `pdf`, `archivo`, `referencia_catastral`, `coordenadas`, `firma`

**Relaciones:**
- `pregunta_pitr` N ── 1 `seccion_pitr`

**Restricciones:**
- UNIQUE(`seccion_id`, `orden`)
- CHECK(`orden` > 0)

**Índices:**
- `idx_pregunta_seccion` ON `pregunta_pitr` (`seccion_id`, `orden`)

**Versionado:** La pregunta se versiona a través de la plantilla padre.

---

## 3.15 Entidad: Respuesta PITR (`respuesta_pitr`)

**Propósito:** Respuestas de un expediente a un template PITR. Es el "formulario completado".

**Schema:** `pitr.respuesta_pitr`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `expediente_id` | UUID | ❌ | ✅ | ✅ | — | FK → `expediente.id` |
| `plantilla_id` | UUID | ❌ | ✅ | ✅ | — | FK → `plantilla_pitr.id` |
| `version_plantilla` | VARCHAR(10) | ❌ | ❌ | ✅ | — | Versión del template usado |
| `estado` | VARCHAR(20) | ❌ | ❌ | ✅ | 'EN_PROGRESO' | Estado de la respuesta |
| `respuestas` | JSONB | ❌ | ❌ | ❌ | '{}' | Mapa de respuestas {pregunta_id: valor} |
| `progreso` | INTEGER | ❌ | ❌ | ❌ | 0 | Progreso 0-100 |
| `tiempo_total_segundos` | INTEGER | ❌ | ❌ | ❌ | NULL | Tiempo total empleado |
| `completada_en` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Fecha de finalización |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `version` | INTEGER | ❌ | ❌ | ✅ | 1 | Optimistic locking |

**Estados de respuesta:**
- `EN_PROGRESO` — Inspección no finalizada
- `COMPLETADA` — Inspección finalizada
- `VALIDADA` — Validada por el técnico
- `RECHAZADA` — Rechazada (datos insuficientes)

**Relaciones:**
- `respuesta_pitr` N ── 1 `expediente`
- `respuesta_pitr` N ── 1 `plantilla_pitr`
- `respuesta_pitr` 1 ── N `firma_pitr`

**Restricciones:**
- UNIQUE(`expediente_id`, `plantilla_id`)
- CHECK(`progreso` >= 0 AND `progreso` <= 100)

**Índices:**
- `idx_respuesta_expediente` ON `respuesta_pitr` (`expediente_id`)
- `idx_respuesta_estado` ON `respuesta_pitr` (`estado`)

**Versionado:** Sí. Cada guardado de respuesta incrementa versión.

---

## 3.16 Entidad: Firma PITR (`firma_pitr`)

**Propósito:** Firma digital asociada a una respuesta PITR.

**Schema:** `pitr.firma_pitr`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `respuesta_id` | UUID | ❌ | ✅ | ✅ | — | FK → `respuesta_pitr.id` |
| `tipo_firma` | VARCHAR(30) | ❌ | ❌ | ✅ | — | Tipo: 'CLIENTE', 'TECNICO', 'AMBAS' |
| `firma_cliente_url` | TEXT | ❌ | ❌ | ❌ | NULL | URL de la firma del cliente |
| `firma_tecnico_url` | TEXT | ❌ | ❌ | ❌ | NULL | URL de la firma del técnico |
| `hash_firma_cliente` | VARCHAR(64) | ❌ | ❌ | ❌ | NULL | SHA-256 de la firma del cliente |
| `hash_firma_tecnico` | VARCHAR(64) | ❌ | ❌ | ❌ | NULL | SHA-256 de la firma del técnico |
| `fecha_firma_cliente` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Cuándo firmó el cliente |
| `fecha_firma_tecnico` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Cuándo firmó el técnico |
| `ip_firma_cliente` | INET | ❌ | ❌ | ❌ | NULL | IP de la firma del cliente |
| `ip_firma_tecnico` | INET | ❌ | ❌ | ❌ | NULL | IP de la firma del técnico |
| `dispositivo_cliente` | TEXT | ❌ | ❌ | ❌ | NULL | User-Agent del cliente |
| `dispositivo_tecnico` | TEXT | ❌ | ❌ | ❌ | NULL | User-Agent del técnico |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |

**Relaciones:**
- `firma_pitr` 1 ── 1 `respuesta_pitr`

**Restricciones:**
- UNIQUE(`respuesta_id`, `tipo_firma`)

**Índices:**
- `idx_firma_respuesta` ON `firma_pitr` (`respuesta_id`)

**Versionado:** No. Las firmas son inmutables.

---

## 3.17 Entidad: Observatorio (`observatorio`)

**Propósito:** Dato anonimizado de expedientes cerrados. El activo de conocimiento público de Certilab.

**Schema:** `analytics.observatorio`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `expediente_id` | UUID | ❌ | ✅ | ✅ | — | FK → `expediente.id` (solo trazabilidad interna) |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `fecha_anonimizacion` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Cuándo se anonimizó |
| `codigo_postal_provincia` | VARCHAR(2) | ❌ | ❌ | ✅ | — | Solo 2 dígitos (provincia) |
| `provincia` | VARCHAR(100) | ❌ | ❌ | ❌ | NULL | Nombre de la provincia |
| `tipo_inmueble` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Tipo de inmueble |
| `tipo_edificio` | VARCHAR(50) | ❌ | ❌ | ❌ | NULL | Tipo de edificio |
| `ano_construccion_rango` | VARCHAR(20) | ❌ | ❌ | ❌ | NULL | Década (ej: "1970-1980") |
| `superficie_rango` | VARCHAR(20) | ❌ | ❌ | ❌ | NULL | Rango (ej: "60-90m²") |
| `orientacion` | VARCHAR(20) | ❌ | ❌ | ❌ | NULL | Orientación |
| `letra_original` | CHAR(1) | ❌ | ❌ | ✅ | — | Letra del certificado auditado |
| `letra_certilab` | CHAR(1) | ❌ | ❌ | ✅ | — | Letra según dictamen Certilab |
| `diferencia_letras` | INTEGER | ❌ | ❌ | ✅ | — | Diferencia de letras (0-6) |
| `dictamen` | VARCHAR(30) | ❌ | ❌ | ✅ | — | 'CORRECTO', 'INFLADO', 'MAL_CALCULADO', 'FALSEADO' |
| `servicio` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Tipo de servicio |
| `calefaccion_tipo` | VARCHAR(50) | ❌ | ❌ | ❌ | NULL | Tipo de calefacción |
| `acs_tipo` | VARCHAR(50) | ❌ | ❌ | ❌ | NULL | Tipo de ACS |
| `ventanas_tipo` | VARCHAR(50) | ❌ | ❌ | ❌ | NULL | Tipo de ventanas |
| `cubierta_tipo` | VARCHAR(50) | ❌ | ❌ | ❌ | NULL | Tipo de cubierta |
| `muro_tipo` | VARCHAR(50) | ❌ | ❌ | ❌ | NULL | Tipo de muro |
| `consumo_original` | NUMERIC(10,2) | ❌ | ❌ | ❌ | NULL | Consumo kWh/m²año (anonimizado) |
| `emisiones_original` | NUMERIC(10,2) | ❌ | ❌ | ❌ | NULL | Emisiones kgCO₂/m²año (anonimizado) |
| `comunidad_autonoma` | VARCHAR(100) | ❌ | ❌ | ❌ | NULL | CCAA |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Inserción |

**Relaciones:**
- `observatorio` N ── 1 `expediente` (solo trazabilidad interna)

**Restricciones:**
- UNIQUE(`expediente_id`)
- CHECK(`letra_original` ~ '^[A-G]$')
- CHECK(`letra_certilab` ~ '^[A-G]$')
- CHECK(`diferencia_letras` >= 0 AND `diferencia_letras` <= 6)

**Índices:**
- `idx_observatorio_provincia` ON `observatorio` (`codigo_postal_provincia`)
- `idx_observatorio_dictamen` ON `observatorio` (`dictamen`)
- `idx_observatorio_letras` ON `observatorio` (`letra_original`, `letra_certilab`)
- `idx_observatorio_fecha` ON `observatorio` (`fecha_anonimizacion`)

**Versionado:** No. Son datos agregados inmutables.

---

## 3.18 Entidad: Agregado Observatorio (`agregado_observatorio`)

**Propósito:** Datos precalculados para informes públicos del Observatorio. Evita consultas pesadas sobre datos anonimizados.

**Schema:** `analytics.agregado_observatorio`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `tipo_informe` | VARCHAR(50) | ❌ | ❌ | ✅ | — | 'TRIMESTRAL', 'ANUAL', 'CCAA', 'TIPOLOGIA' |
| `periodo` | VARCHAR(20) | ❌ | ❌ | ✅ | — | Ej: '2026-Q1', '2025-ANUAL' |
| `datos` | JSONB | ❌ | ❌ | ✅ | — | Datos agregados del informe |
| `total_expedientes` | INTEGER | ❌ | ❌ | ✅ | — | Nº total de expedientes en el periodo |
| `generado_en` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Cuándo se generó |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Inserción |

**Restricciones:**
- UNIQUE(`tipo_informe`, `periodo`)
- CHECK(`total_expedientes` > 0)

**Índices:**
- `idx_agregado_tipo_periodo` ON `agregado_observatorio` (`tipo_informe`, `periodo`)

---

## 3.19 Entidad: Predicción IA (`prediccion_ia`)

**Propósito:** Registro de una predicción generada por un modelo de IA.

**Schema:** `ai.prediccion_ia`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `expediente_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `expediente.id` |
| `tipo` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Tipo de predicción |
| `modelo` | VARCHAR(100) | ❌ | ❌ | ✅ | — | Modelo usado (gpt-4o, claude-sonnet, etc.) |
| `input_resumen` | TEXT | ❌ | ❌ | ❌ | NULL | Resumen del input enviado |
| `output_completo` | JSONB | ❌ | ❌ | ❌ | NULL | Respuesta completa del modelo |
| `confianza` | NUMERIC(5,2) | ❌ | ❌ | ❌ | NULL | Score de confianza 0-100 |
| `validada_por` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` (quién validó) |
| `validada_en` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Cuándo se validó |
| `resultado_validacion` | VARCHAR(20) | ❌ | ❌ | ❌ | NULL | 'ACEPTADA', 'RECHAZADA', 'MODIFICADA' |
| `tiempo_respuesta_ms` | INTEGER | ❌ | ❌ | ❌ | NULL | Latencia del modelo |
| `coste` | NUMERIC(10,6) | ❌ | ❌ | ❌ | NULL | Coste en euros |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` (o 'sistema') |

**Tipos de predicción:**
- `DETECCION_ANOMALIAS` — Anomalías en datos PITR
- `PROPUESTA_LETRA` — Rango de letra energética propuesto
- `BORRADOR_DICTAMEN` — Borrador de texto de dictamen
- `CLASIFICACION_DOCUMENTO` — Tipo de documento identificado
- `EXTRACCION_OCR` — Datos extraídos de PDF
- `ANALISIS_OBSERVATORIO` — Patrones detectados en datos agregados
- `RESPUESTA_FAQ` — Respuesta a pregunta frecuente

**Relaciones:**
- `prediccion_ia` N ── 1 `expediente`

**Índices:**
- `idx_prediccion_expediente` ON `prediccion_ia` (`expediente_id`)
- `idx_prediccion_tipo` ON `prediccion_ia` (`tipo`)
- `idx_prediccion_modelo` ON `prediccion_ia` (`modelo`)

**Versionado:** No. Las predicciones son inmutables.

---

## 3.20 Entidad: Auditoría IA (`auditoria_ia`)

**Propósito:** Registro de auditoría de cada acción ejecutada por un modelo de IA. Permite trazar qué datos se enviaron, qué se recibió y quién validó.

**Schema:** `ai.auditoria_ia`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `prediccion_id` | UUID | ❌ | ✅ | ✅ | — | FK → `prediccion_ia.id` |
| `accion` | VARCHAR(100) | ❌ | ❌ | ✅ | — | Acción ejecutada |
| `datos_enviados_hash` | VARCHAR(64) | ❌ | ❌ | ✅ | — | Hash SHA-256 del payload enviado |
| `datos_enviados_resumen` | TEXT | ❌ | ❌ | ❌ | NULL | Resumen descriptivo de qué se envió |
| `contiene_datos_personales` | BOOLEAN | ❌ | ❌ | ✅ | false | ¿Se enviaron datos personales? |
| `nivel_anonimizacion` | VARCHAR(20) | ❌ | ❌ | ✅ | 'TOTAL' | 'TOTAL', 'PARCIAL', 'NINGUNA' |
| `modelo_version` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Versión del modelo |
| `proveedor` | VARCHAR(50) | ❌ | ❌ | ✅ | — | 'openai', 'anthropic', 'local', 'otro' |
| `ip_salida` | INET | ❌ | ❌ | ❌ | NULL | IP desde la que se llamó al modelo |
| `tiempo_inicio` | TIMESTAMPTZ | ❌ | ❌ | ✅ | — | Inicio de la llamada |
| `tiempo_fin` | TIMESTAMPTZ | ❌ | ❌ | ✅ | — | Fin de la llamada |
| `tokens_input` | INTEGER | ❌ | ❌ | ❌ | NULL | Tokens de entrada |
| `tokens_output` | INTEGER | ❌ | ❌ | ❌ | NULL | Tokens de salida |
| `coste_estimado` | NUMERIC(10,6) | ❌ | ❌ | ❌ | NULL | Coste estimado |
| `error` | TEXT | ❌ | ❌ | ❌ | NULL | Mensaje de error (si falló) |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |

**Relaciones:**
- `auditoria_ia` N ── 1 `prediccion_ia`

**Índices:**
- `idx_auditoria_prediccion` ON `auditoria_ia` (`prediccion_id`)
- `idx_auditoria_proveedor` ON `auditoria_ia` (`proveedor`)
- `idx_auditoria_fecha` ON `auditoria_ia` (`tiempo_inicio`)

**Versionado:** No. Es un registro de auditoría inmutable.

---

## 3.21 Entidad: Prompt IA (`prompt_ia`)

**Propósito:** Template de prompt versionado. Define el prompt del sistema para cada tipo de tarea de IA.

**Schema:** `ai.prompt_ia`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `nombre` | VARCHAR(100) | ❌ | ❌ | ✅ | — | Nombre del prompt |
| `tipo` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Tipo de tarea |
| `version` | VARCHAR(10) | ❌ | ❌ | ✅ | '1.0.0' | Versión semántica |
| `prompt_sistema` | TEXT | ❌ | ❌ | ✅ | — | Prompt del sistema |
| `prompt_usuario` | TEXT | ❌ | ❌ | ❌ | NULL | Template de prompt de usuario |
| `modelo_destino` | VARCHAR(100) | ❌ | ❌ | ❌ | NULL | Modelo recomendado |
| `temperatura` | NUMERIC(3,2) | ❌ | ❌ | ❌ | 0.3 | Temperatura del modelo |
| `max_tokens` | INTEGER | ❌ | ❌ | ❌ | 2000 | Máximo de tokens de salida |
| `activo` | BOOLEAN | ❌ | ❌ | ✅ | true | ¿Prompt activo? |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |

**Restricciones:**
- UNIQUE(`tipo`, `version`)

---

## 3.22 Entidad: Webhook (`webhook`)

**Propósito:** Registro de webhooks entrantes y salientes.

**Schema:** `automation.webhook`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `direccion` | VARCHAR(10) | ❌ | ❌ | ✅ | — | 'INBOUND', 'OUTBOUND' |
| `proveedor` | VARCHAR(50) | ❌ | ❌ | ✅ | — | 'mypos', 'n8n', 'supabase', 'openai', etc. |
| `evento` | VARCHAR(100) | ❌ | ❌ | ✅ | — | Tipo de evento |
| `url` | TEXT | ❌ | ❌ | ❌ | NULL | URL destino (outbound) |
| `payload` | JSONB | ❌ | ❌ | ❌ | NULL | Payload recibido/enviado |
| `response` | JSONB | ❌ | ❌ | ❌ | NULL | Respuesta (si aplica) |
| `http_status` | INTEGER | ❌ | ❌ | ❌ | NULL | Código HTTP de respuesta |
| `exito` | BOOLEAN | ❌ | ❌ | ❌ | false | ¿Se procesó correctamente? |
| `reintentos` | INTEGER | ❌ | ❌ | ❌ | 0 | Nº de reintentos |
| `procesado_en` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Cuándo se procesó |
| `error` | TEXT | ❌ | ❌ | ❌ | NULL | Mensaje de error |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |

**Índices:**
- `idx_webhook_proveedor` ON `webhook` (`proveedor`, `evento`)
- `idx_webhook_exito` ON `webhook` (`exito`)
- `idx_webhook_fecha` ON `webhook` (`created_at`)

---

## 3.23 Entidad: Cola de Tarea (`cola_tarea`)

**Propósito:** Cola de tareas pendientes para procesamiento asíncrono.

**Schema:** `automation.cola_tarea`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `tipo` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Tipo de tarea |
| `payload` | JSONB | ❌ | ❌ | ✅ | — | Datos de la tarea |
| `estado` | VARCHAR(20) | ❌ | ❌ | ✅ | 'PENDIENTE' | Estado |
| `prioridad` | INTEGER | ❌ | ❌ | ❌ | 0 | Prioridad (mayor = más urgente) |
| `intentos` | INTEGER | ❌ | ❌ | ❌ | 0 | Intentos realizados |
| `max_intentos` | INTEGER | ❌ | ❌ | ❌ | 3 | Máximo de intentos |
| `programada_para` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Ejecución programada |
| `ejecutada_en` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Ejecución real |
| `error` | TEXT | ❌ | ❌ | ❌ | NULL | Último error |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última actualización |

**Tipos de tarea:**
- `GENERAR_INFORME` — Generar PDF del dictamen
- `ANONIMIZAR_EXPEDIENTE` — Anonimizar para Observatorio
- `ENVIAR_EMAIL` — Enviar email transaccional
- `ENVIAR_WEBHOOK` — Enviar webhook a n8n
- `GENERAR_FACTURA` — Generar factura
- `SINCRONIZAR_DRIVE` — Backup a Google Drive
- `PROCESAR_OCR` — OCR de documento
- `CONSULTAR_CATASTRO` — Consulta de datos catastrales
- `PREDICCION_IA` — Solicitar predicción a IA

**Índices:**
- `idx_cola_estado` ON `cola_tarea` (`estado`, `prioridad`)
- `idx_cola_tipo_estado` ON `cola_tarea` (`tipo`, `estado`)
- `idx_cola_programada` ON `cola_tarea` (`programada_para`) WHERE `estado` = 'PENDIENTE'

---

## 3.24 Entidad: Email (`email`)

**Propósito:** Registro de emails enviados y pendientes de enviar.

**Schema:** `automation.email`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `expediente_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `expediente.id` |
| `cliente_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `cliente.id` |
| `para` | VARCHAR(255) | ❌ | ❌ | ✅ | — | Destinatario |
| `cc` | TEXT[] | ❌ | ❌ | ❌ | '{}' | Copia a |
| `asunto` | VARCHAR(255) | ❌ | ❌ | ✅ | — | Asunto |
| `cuerpo_html` | TEXT | ❌ | ❌ | ❌ | NULL | Cuerpo en HTML |
| `cuerpo_texto` | TEXT | ❌ | ❌ | ❌ | NULL | Cuerpo en texto plano |
| `plantilla` | VARCHAR(100) | ❌ | ❌ | ❌ | NULL | Nombre de la plantilla usada |
| `estado` | VARCHAR(20) | ❌ | ❌ | ✅ | 'PENDIENTE' | 'PENDIENTE', 'ENVIADO', 'FALLIDO', 'REBOTADO' |
| `enviado_en` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Fecha de envío |
| `error` | TEXT | ❌ | ❌ | ❌ | NULL | Error de envío |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |

**Índices:**
- `idx_email_expediente` ON `email` (`expediente_id`)
- `idx_email_estado` ON `email` (`estado`)
- `idx_email_destinatario` ON `email` (`para`)

---

## 3.25 Entidad: Notificación (`notificacion`)

**Propósito:** Notificación para mostrar al usuario en la plataforma.

**Schema:** `automation.notificacion`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `usuario_id` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` (destinatario) |
| `expediente_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `expediente.id` |
| `tipo` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Tipo de notificación |
| `titulo` | VARCHAR(255) | ❌ | ❌ | ✅ | — | Título |
| `mensaje` | TEXT | ❌ | ❌ | ✅ | — | Cuerpo de la notificación |
| `enlace` | TEXT | ❌ | ❌ | ❌ | NULL | Enlace de acción |
| `leida` | BOOLEAN | ❌ | ❌ | ❌ | false | ¿Leída por el usuario? |
| `fecha_lectura` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Cuándo se leyó |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |

**Índices:**
- `idx_notificacion_usuario` ON `notificacion` (`usuario_id`, `leida`)
- `idx_notificacion_expediente` ON `notificacion` (`expediente_id`)
- `idx_notificacion_fecha` ON `notificacion` (`created_at`)

---

## 3.26 Entidad: Consentimiento (`consentimiento`)

**Propósito:** Registro de consentimiento RGPD.

**Schema:** `core.consentimiento`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `cliente_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `cliente.id` |
| `usuario_id` | UUID | ❌ | ✅ | ❌ | NULL | FK → `usuario.id` |
| `tipo` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Tipo de consentimiento |
| `aceptado` | BOOLEAN | ❌ | ❌ | ✅ | true | ¿Aceptado? |
| `ip_aceptacion` | INET | ❌ | ❌ | ❌ | NULL | IP desde la que se aceptó |
| `user_agent_aceptacion` | TEXT | ❌ | ❌ | ❌ | NULL | User-Agent |
| `fecha_aceptacion` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Cuándo se aceptó |
| `fecha_expiracion` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Cuándo expira |
| `revocado` | BOOLEAN | ❌ | ❌ | ❌ | false | ¿Revocado? |
| `fecha_revocacion` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Cuándo se revocó |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |

**Tipos de consentimiento:**
- `RGPD_DATOS_BASICOS` — Almacenamiento de datos personales básicos
- `RGPD_COMUNICACIONES` — Envío de comunicaciones comerciales
- `RGPD_CESION_DATOS` — Cesión de datos a terceros (si aplica)
- `RGPD_OBSERVATORIO` — Anonimización y publicación en Observatorio
- `RGPD_COOKIES` — Cookies de tracking

**Restricciones:**
- Al menos una FK (cliente_id o usuario_id) debe ser no NULL

**Índices:**
- `idx_consentimiento_cliente` ON `consentimiento` (`cliente_id`)
- `idx_consentimiento_tipo` ON `consentimiento` (`cliente_id`, `tipo`)

---

## 3.27 Entidad: Versionado PITR (`version_pitr`)

**Propósito:** Historial de versiones de una plantilla PITR. Permite reconstruir qué versión se usó en cada expediente.

**Schema:** `pitr.version_pitr`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `plantilla_id` | UUID | ❌ | ✅ | ✅ | — | FK → `plantilla_pitr.id` |
| `version` | VARCHAR(10) | ❌ | ❌ | ✅ | — | Versión semántica |
| `snapshot` | JSONB | ❌ | ❌ | ✅ | — | Snapshot completo de la plantilla en esta versión |
| `cambios` | TEXT | ❌ | ❌ | ❌ | NULL | Descripción de cambios respecto a la anterior |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |

**Restricciones:**
- UNIQUE(`plantilla_id`, `version`)

**Índices:**
- `idx_version_plantilla` ON `version_pitr` (`plantilla_id`, `version` DESC)

---

## 3.28 Entidad: Integración (`integracion`)

**Propósito:** Configuración de integraciones con servicios externos.

**Schema:** `core.integracion`

| Campo | Tipo | PK | FK | Obligatorio | Default | Descripción |
|-------|------|----|----|-------------|---------|-------------|
| `id` | UUID | ✅ | ❌ | ✅ | `gen_random_uuid()` | Identificador único |
| `empresa_id` | UUID | ❌ | ✅ | ✅ | — | FK → `empresa.id` |
| `proveedor` | VARCHAR(50) | ❌ | ❌ | ✅ | — | Proveedor (mypos, openai, catastro, etc.) |
| `activa` | BOOLEAN | ❌ | ❌ | ❌ | true | ¿Integración activa? |
| `config` | JSONB | ❌ | ❌ | ❌ | '{}' | Configuración (API keys cifradas) |
| `ultima_sincro` | TIMESTAMPTZ | ❌ | ❌ | ❌ | NULL | Última sincronización exitosa |
| `ultimo_error` | TEXT | ❌ | ❌ | ❌ | NULL | Último error |
| `created_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Creación |
| `created_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |
| `updated_at` | TIMESTAMPTZ | ❌ | ❌ | ✅ | `now()` | Última modificación |
| `updated_by` | UUID | ❌ | ✅ | ✅ | — | FK → `usuario.id` |

**Restricciones:**
- UNIQUE(`empresa_id`, `proveedor`)

**Índices:**
- `idx_integracion_proveedor` ON `integracion` (`proveedor`)

---

## 3.29 Resumen de relaciones maestro

```
core.empresa (1) ──N── core.cliente (N)
core.empresa (1) ──N── auth.usuario (N)
core.empresa (1) ──N── core.inmueble (N)
core.empresa (1) ──N── core.servicio (N)
core.empresa (1) ──N── core.expediente (N)
core.empresa (1) ──N── billing.pago (N)
core.empresa (1) ──N── events.actividad (N)
core.empresa (1) ──N── automation.webhook (N)
core.empresa (1) ──N── automation.cola_tarea (N)
core.empresa (1) ──N── core.documento (N)
core.empresa (1) ──N── core.consentimiento (N)
core.empresa (1) ──N── ai.prediccion_ia (N)
core.empresa (1) ──N── core.integracion (N)

auth.usuario (1) ──N── core.expediente (tecnico_asignado)
auth.usuario (1) ──N── events.actividad (actor)

core.cliente (1) ──N── core.inmueble (N)
core.cliente (1) ──N── core.expediente (N)
core.cliente (1) ──1── auth.usuario (opcional)

core.inmueble (1) ──N── core.expediente (N)
core.inmueble (1) ──N── core.documento (N)

core.servicio (1) ──N── core.expediente (N)
core.servicio (1) ──1── pitr.plantilla_pitr (opcional)

core.expediente (1) ──N── core.documento (N)
core.expediente (1) ──N── billing.pago (N)
core.expediente (1) ──N── billing.factura (N)
core.expediente (1) ──N── events.actividad (N)
core.expediente (1) ──1── pitr.respuesta_pitr (1)
core.expediente (1) ──N── automation.notificacion (N)
core.expediente (1) ──N── analytics.observatorio (1)

pitr.plantilla_pitr (1) ──N── pitr.seccion_pitr (N)
pitr.seccion_pitr (1) ──N── pitr.pregunta_pitr (N)
pitr.plantilla_pitr (1) ──N── pitr.version_pitr (N)
pitr.respuesta_pitr (1) ──1── pitr.firma_pitr (1)

ai.prediccion_ia (1) ──N── ai.auditoria_ia (N)
```

---

# 4. DISEÑO POSTGRESQL

## 4.1 Convenciones de nomenclatura

Todo el esquema de base de datos sigue estas convenciones estrictas:

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Schemas | `snake_case` | `core`, `auth`, `pitr`, `events`, `billing`, `analytics`, `automation`, `ai` |
| Tablas | `snake_case` singular | `expediente`, `inmueble`, `plantilla_pitr` |
| Columnas | `snake_case` | `fecha_creacion`, `tecnico_asignado_id` |
| Claves primarias | `id` (UUID) en todas las tablas | `id UUID DEFAULT gen_random_uuid()` |
| Claves foráneas | `entidad_id` | `cliente_id`, `expediente_id` |
| Timestamps | `created_at`, `updated_at`, `deleted_at` | `created_at TIMESTAMPTZ DEFAULT now()` |
| Soft delete | `deleted_at`, `deleted_by` | Ambas columnas siempre juntas |
| Auditoría | `created_by`, `updated_by` | FK a `usuario.id` |
| Versionado | `version INTEGER DEFAULT 1` | Para optimistic locking |
| Índices | `idx_tabla_campo` | `idx_expediente_estado` |
| Unique constraints | `uq_tabla_campos` | Interno de PostgreSQL |
| Check constraints | `ck_tabla_campo` | `ck_expediente_progreso` |
| Enums | `snake_case` en schema `types` | `types.tipo_documento`, `types.estado_expediente` |
| JSONB | `snake_case` | `config`, `metadatos`, `payload` |
| BOOLEAN | `true`/`false` (nunca 1/0) | `activa BOOLEAN DEFAULT true` |

## 4.2 Schemas de PostgreSQL

```
-- Schemas del sistema
CREATE SCHEMA IF NOT EXISTS core;          -- Entidades de negocio centrales
CREATE SCHEMA IF NOT EXISTS auth;          -- Usuarios y autenticación
CREATE SCHEMA IF NOT EXISTS pitr;          -- PITR (templates, respuestas, firmas)
CREATE SCHEMA IF NOT EXISTS events;        -- Eventos y auditoría
CREATE SCHEMA IF NOT EXISTS billing;       -- Pagos y facturación
CREATE SCHEMA IF NOT EXISTS analytics;     -- Observatorio y datos agregados
CREATE SCHEMA IF NOT EXISTS automation;    -- Colas, webhooks, emails, notificaciones
CREATE SCHEMA IF NOT EXISTS ai;            -- IA: predicciones, auditoría, prompts
CREATE SCHEMA IF NOT EXISTS types;         -- Tipos ENUM compartidos
```

**Mapa schema ↔ dominio:**

| Schema | Dominio | Tablas |
|--------|---------|--------|
| `core` | Núcleo de negocio | `empresa`, `cliente`, `inmueble`, `servicio`, `expediente`, `documento`, `consentimiento`, `integracion` |
| `auth` | Acceso al sistema | `usuario` |
| `pitr` | Inspección remota | `plantilla_pitr`, `seccion_pitr`, `pregunta_pitr`, `respuesta_pitr`, `firma_pitr`, `version_pitr` |
| `events` | Eventos inmutables | `actividad` |
| `billing` | Facturación | `pago`, `factura` |
| `analytics` | Analítica y datos | `observatorio`, `agregado_observatorio` |
| `automation` | Automatizaciones | `webhook`, `cola_tarea`, `email`, `notificacion` |
| `ai` | Inteligencia Artificial | `prediccion_ia`, `auditoria_ia`, `prompt_ia` |
| `types` | Tipos compartidos | Enums (ninguna tabla de datos) |

## 4.3 Enumerados (ENUMs)

Los ENUMs se crean en el schema `types` y se referencian desde las tablas:

```sql
-- Estados de expediente
CREATE TYPE types.estado_expediente AS ENUM (
    'PAGO_RECIBIDO', 'EXPEDIENTE_CREADO', 'ESPERANDO_INFORMACION',
    'INFORMACION_RECIBIDA', 'EN_REVISION', 'INFORME_ENVIADO',
    'CERRADO'
);

-- Roles de usuario
CREATE TYPE types.rol_usuario AS ENUM (
    'admin', 'tecnico', 'backoffice', 'sistema'
);

-- Tipos de documento
CREATE TYPE types.tipo_documento AS ENUM (
    'CERTIFICADO_ORIGINAL', 'FACTURA', 'INFORME_FINAL',
    'DOCUMENTACION_COMPLEMENTARIA', 'FOTOGRAFIA', 'NOTA_TECNICA',
    'FOTO_FACHADA', 'FOTO_VENTANAS', 'FOTO_CLIMATIZACION',
    'FOTO_INSTALACIONES', 'FIRMA_CLIENTE', 'FIRMA_TECNICO',
    'CE3X_XML', 'OTRO'
);

-- Estado de pago
CREATE TYPE types.estado_pago AS ENUM (
    'PENDIENTE', 'PROCESANDO', 'COMPLETADO', 'RECHAZADO',
    'REEMBOLSADO', 'CANCELADO'
);

-- Estado de respuesta PITR
CREATE TYPE types.estado_respuesta_pitr AS ENUM (
    'EN_PROGRESO', 'COMPLETADA', 'VALIDADA', 'RECHAZADA'
);

-- Dictamen
CREATE TYPE types.dictamen AS ENUM (
    'CORRECTO', 'INFLADO', 'MAL_CALCULADO', 'FALSEADO'
);

-- Prioridad
CREATE TYPE types.prioridad AS ENUM (
    'baja', 'media', 'alta', 'urgente'
);

-- Tipo de notificación
CREATE TYPE types.tipo_notificacion AS ENUM (
    'EXPEDIENTE_CREADO', 'CAMBIO_ESTADO', 'PAGO_RECIBIDO',
    'DOCUMENTO_SUBIDO', 'INFORME_LISTO', 'MENSAJE_TECNICO',
    'RECORDATORIO', 'ALERTA'
);
```

## 4.4 Reglas de Foreign Keys

| Regla | Valor por defecto | Excepción |
|-------|-------------------|-----------|
| `ON DELETE` | `RESTRICT` | Solo `CASCADE` aprobado explícitamente |
| `ON UPDATE` | `CASCADE` | Siempre, porque las PK son UUID inmutables |
| `NOT VALID` | No usar | Todas las FK se validan siempre |

**FKs que podrían usar CASCADE (solo tras aprobación del arquitecto):**
- `seccion_pitr.plantilla_id` → Si se elimina una plantilla (no debería), se eliminan sus secciones.

## 4.5 Reglas de Índices

| Tipo de índice | Cuándo usarlo | Ejemplo |
|----------------|---------------|---------|
| B-tree (default) | Columnas de filtro, joins, ORDER BY | `idx_expediente_estado` |
| Composite B-tree | Filtros combinados frecuentes | `idx_expediente_empresa_estado` |
| Partial index | Filtrar solo registros activos | `WHERE deleted_at IS NULL` |
| GIN | Columnas JSONB y arrays | `idx_documento_metadatos` en `documento.metadatos` |
| BRIN | Columnas correlacionadas (timestamp) | Tablas de eventos grandes |

**Reglas:**
- Toda FK debe tener un índice (explícito, no confiar en auto-index de PK).
- Toda columna usada en WHERE frecuente debe tener índice.
- Los índices parciales con `WHERE deleted_at IS NULL` son preferibles a índices completos cuando la mayoría de registros están activos.
- No indexar columnas con baja cardinalidad (ej: booleanos) a menos que se combinen en composite.

## 4.6 Resumen de tipos PostgreSQL usados

| Tipo PostgreSQL | Uso principal |
|----------------|---------------|
| `UUID` | Claves primarias y foráneas |
| `TIMESTAMPTZ` | Todos los timestamps (UTC) |
| `VARCHAR(n)` | Texto corto con límite conocido |
| `TEXT` | Texto largo sin límite |
| `NUMERIC(p,s)` | Valores monetarios y precisos |
| `INTEGER` | Conteos, años, ordinales |
| `BIGINT` | Tamaños de archivo en bytes |
| `BOOLEAN` | Flags binarios (activo, leída, etc.) |
| `JSONB` | Datos flexibles, configuraciones, metadatos |
| `INET` | Direcciones IP |
| `TEXT[]` | Arrays de texto (tags) |

---

# 5. SEGURIDAD

## 5.1 Supabase Auth

Supabase Auth es la puerta de entrada al sistema. Toda autenticación pasa por Supabase.

**Integración con el modelo de datos:**

```
auth.users (Supabase Auth)
    │
    │ (1:1)
    ▼
auth.usuario (sistema interno)
    │
    │ (N:1)
    ▼
core.empresa (tenant)
```

**Reglas:**
- `auth.users` es gestionado por Supabase. No se crean usuarios directamente en `auth.usuario` sin un registro correspondiente en `auth.users`.
- El `auth_user_id` en `auth.usuario` es la FK a `auth.users.id`.
- El login y registro usan los flujos nativos de Supabase Auth (email+password, magic link, OAuth).

## 5.2 Row Level Security (RLS)

Todas las tablas tienen RLS habilitado. Las políticas siguen **doce reglas**:

### R1. Aislamiento por empresa

Toda política de SELECT, INSERT, UPDATE, DELETE incluye `empresa_id = auth_empresa_id()` donde `auth_empresa_id()` es una función que obtiene la empresa del usuario autenticado.

```sql
-- Ejemplo para core.expediente
CREATE POLICY "Aislamiento por empresa" ON core.expediente
    FOR ALL
    USING (empresa_id = auth_empresa_id());
```

### R2. El cliente solo ve sus propios datos

```sql
CREATE POLICY "Cliente ve sus expedientes" ON core.expediente
    FOR SELECT
    USING (
        cliente_id IN (
            SELECT id FROM core.cliente WHERE usuario_id = auth_usuario_id()
        )
    );
```

### R3. El técnico ve todos los expedientes de su empresa

```sql
CREATE POLICY "Técnico ve todos" ON core.expediente
    FOR SELECT
    USING (empresa_id = auth_empresa_id());
```

### R4. El administrador ve todo

```sql
CREATE POLICY "Admin acceso total" ON core.expediente
    FOR ALL
    USING (auth_rol() = 'admin');
```

### R5. Eventos append-only

```sql
-- Solo INSERT permitido para eventos
CREATE POLICY "Solo insertar eventos" ON events.actividad
    FOR INSERT
    WITH CHECK (auth_rol() IN ('admin', 'tecnico', 'sistema', 'backoffice'));
    
-- Nadie puede modificar o borrar eventos
CREATE POLICY "No modificar eventos" ON events.actividad
    FOR UPDATE
    USING (false);
    
CREATE POLICY "No borrar eventos" ON events.actividad
    FOR DELETE
    USING (false);
```

### R6. IA solo lectura de datos anonimizados

Las políticas de IA permiten lectura de datos del Observatorio y de expedientes solo a través de la función `ai_leer_datos()` que filtra datos personales automáticamente.

### R7. n8n (sistema) con permisos específicos

Un usuario `sistema` (rol 'sistema') tiene permisos para:
- Leer y actualizar expedientes, pagos, documentos.
- Insertar eventos.
- Leer y escribir en colas y webhooks.
- No tiene acceso a datos personales de clientes (solo puede leerlos si son necesarios para el workflow).

### R8. Soft delete invisible

Las políticas de SELECT filtran automáticamente `deleted_at IS NULL` para todos los roles excepto `admin`.

### R9. Observatorio público (solo lectura)

```sql
CREATE POLICY "Observatorio público" ON analytics.observatorio
    FOR SELECT
    USING (true);  -- Cualquiera puede leer datos anonimizados
```

### R10. Consentimiento obligatorio

No se puede INSERTAR un cliente sin un `consent_id` válido.

### R11. Auditoría de accesos

Todo SELECT sobre datos personales se registra en la tabla de eventos (evento `SEGURIDAD.CONSULTA_DATOS`).

### R12. Protección de columnas sensibles

RLS a nivel de columna para `cliente.dni`, que solo pueden leer usuarios con rol 'admin' o 'tecnico' asignado al expediente.

## 5.3 Roles del sistema

| Rol | Descripción | Schemas accesibles | RLS |
|-----|-------------|-------------------|-----|
| `admin` | Administrador de la empresa | Todos | Sin restricciones (dentro de su empresa) |
| `tecnico` | Arquitecto Técnico | `core`, `pitr`, `billing`, `automation`, `analytics` | Ve todo de su empresa, no puede borrar |
| `backoffice` | Personal de backoffice | `core`, `pitr`, `billing`, `analytics` | Ve todo de su empresa, solo lectura en billing |
| `sistema` | n8n, automatizaciones | `core`, `events`, `automation` | Permisos específicos por workflow |
| `cliente` | Cliente con acceso a plataforma | `core`, `pitr` | Solo sus propios datos |
| `ia` | Sistema de IA | `analytics`, `ai` | Solo datos anonimizados |
| `anonimo` | Usuario no autenticado | `analytics` | Solo Observatorio |

## 5.4 Permisos por entidad

| Entidad | admin | tecnico | backoffice | sistema | cliente | ia | anonimo |
|---------|-------|---------|------------|---------|---------|----|---------|
| `empresa` | CRUD | R | R | R | - | - | - |
| `usuario` | CRUD | R | R | R | - | - | - |
| `cliente` | CRUD | CRU | CRU | CRU | R | - | - |
| `inmueble` | CRUD | CRU | RU | CRU | R | - | - |
| `servicio` | CRUD | R | R | R | R | - | - |
| `expediente` | CRUD | CRU | RU | CRU | R | - | - |
| `documento` | CRUD | CRU | RU | CRU | CR | - | - |
| `pago` | CRUD | R | R | CRU | R | - | - |
| `factura` | CRUD | R | R | CRU | R | - | - |
| `actividad` | CRUD | R | R | CR | R | - | - |
| `plantilla_pitr` | CRUD | R | R | - | - | - | - |
| `respuesta_pitr` | CRUD | CRU | R | RU | CR | - | - |
| `observatorio` | CRUD | R | R | RU | - | R | R |
| `prediccion_ia` | CRUD | R | R | - | - | R | - |
| `auditoria_ia` | CRUD | R | R | - | - | - | - |
| `cola_tarea` | CRUD | R | R | CRUD | - | - | - |
| `email` | CRUD | R | - | CRU | R | - | - |
| `notificacion` | CRUD | CRU | - | CRU | R | - | - |
| `consentimiento` | CRUD | R | R | CR | R | - | - |

**Leyenda:** C=Create, R=Read, U=Update, D=Delete (soft)

## 5.5 Seguridad a nivel de aplicación

- **Cifrado en tránsito:** Todo el tráfico va por HTTPS/TLS 1.3.
- **Cifrado en reposo:** PostgreSQL cifrado con AES-256. Supabase lo gestiona.
- **Cifrado de campo:** `cliente.dni` cifrado con AES-256. Clave de cifrado en Supabase Vault.
- **API keys:** Configuraciones de integraciones (`core.integracion.config`) cifradas con AES-256.
- **Auditoría de acceso:** Todo SELECT a `cliente.dni` y `cliente.email` se registra como evento.

---

# 6. STORAGE

## 6.1 Arquitectura de almacenamiento

Supabase Storage es el sistema de almacenamiento de archivos. La fuente de verdad es Supabase, no Google Drive ni ningún otro sistema externo.

**Buckets de Storage:**

| Bucket | Visibilidad | Contenido | Retención |
|--------|-------------|-----------|-----------|
| `documentos-expediente` | Privado (RLS) | Certificados, PDFs, fotos | Hasta cierre del expediente + 6 años |
| `informes` | Privado (RLS) | Informes finales en PDF | Permanente |
| `firmas` | Privado (RLS) | Firmas digitales (PNG/SVG) | Permanente |
| `facturas` | Privado (RLS) | Facturas en PDF | 10 años (legal) |
| `fotos-inmueble` | Privado (RLS) | Fotos subidas durante PITR | Misma retención que el expediente |
| `publico` | Público | Logos, assets estáticos | Permanente |

## 6.2 Estructura de rutas en Storage

```
documentos-expediente/
  {empresa_id}/
    {expediente_id}/
      {tipo_documento}/
        {documento_id}_{nombre_original}

informes/
  {empresa_id}/
    {expediente_id}/
      {numero_visible}_informe_final.pdf

firmas/
  {empresa_id}/
    {expediente_id}/
      firma_cliente_{respuesta_pitr_id}.png
      firma_tecnico_{respuesta_pitr_id}.png

facturas/
  {empresa_id}/
    {anio}/
      {numero_factura}.pdf

fotos-inmueble/
  {empresa_id}/
    {expediente_id}/
      {tipo_foto}/
        {timestamp}_{documento_id}.jpg

publico/
  logos/
    {empresa_slug}.png
  assets/
    ...
```

## 6.3 Hash y validación de integridad

Cada archivo subido genera un hash SHA-256 que se almacena en `documento.hash_sha256`. Este hash se usa para:

1. **Verificar integridad** — Comparar hash al descargar para detectar corrupción.
2. **Detección de duplicados** — Si el hash ya existe, no se sube de nuevo (referencia al documento existente).
3. **Prueba de existencia** — El hash sirve como prueba criptográfica de que el archivo existía en una fecha determinada.

## 6.4 Versionado de documentos

Los documentos pueden tener versiones (ej: un certificado reemplazado por otro más reciente). El versionado funciona así:

1. Cada versión es un registro independiente en `core.documento`.
2. El campo `version` se incrementa (1, 2, 3...).
3. El `storage_path` incluye la versión: `{expediente_id}/CERTIFICADO_ORIGINAL/v1_{hash}.pdf`.
4. La versión más reciente es la que tiene el `version` más alto para un `expediente_id` + `tipo`.
5. Las versiones anteriores nunca se eliminan (historial completo).

## 6.5 Metadatos de documentos

Cada documento puede tener metadatos en formato JSONB:

```json
{
  "ocr": {
    "procesado": true,
    "modelo": "gpt-4o",
    "campos_extraidos": 12,
    "confianza": 0.87
  },
  "dimensiones": {
    "ancho_px": 1920,
    "alto_px": 1080
  },
  "gps": {
    "latitud": 41.3874,
    "longitud": 2.1686
  },
  "exif": {
    "fecha_toma": "2026-06-15T10:30:00Z",
    "camara": "iPhone 16 Pro"
  }
}
```

---

# 7. EVENTOS

## 7.1 Arquitectura del sistema de eventos

El sistema de eventos sigue un modelo **append-only** con **Event Sourcing parcial**:

```
                        ┌──────────────────┐
                        │   EXPEDIENTE     │
                        │  (estado actual) │ ← Tabla de negocio actualizable
                        └────────┬─────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │             │
                    ▼            ▼             ▼
           ┌────────────┐ ┌────────────┐ ┌────────────┐
           │  EVENTO 1  │ │  EVENTO 2  │ │  EVENTO N  │ ← Tabla events.actividad
           │ "CREADO"   │ │ "CAMBIO"   │ │ "CERRADO"  │   (append-only)
           │ {datos}    │ │ {datos}    │ │ {datos}    │
           └────────────┘ └────────────┘ └────────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │   SNAPSHOT       │ ← Reconstrucción rápida
                        │  (si necesario)  │   (tabla separada)
                        └──────────────────┘
```

**Principios del sistema de eventos:**

1. **Toda acción de negocio genera un evento.** No hay operación sin registro.
2. **Los eventos son inmutables.** Una vez insertados, no se modifican ni eliminan.
3. **Los eventos tienen tipo estricto.** `{DOMINIO}.{ACCION}` (ej: `EXPEDIENTE.CAMBIO_ESTADO`).
4. **El estado actual es la fuente de verdad operativa.** No se reconstruye desde eventos para operaciones normales.
5. **Los snapshots existen para auditoría** pero no son necesarios para el funcionamiento diario.
6. **La reconstrucción es posible** para análisis forense, pero no es la operación normal.

## 7.2 Quién genera eventos

| Actor | Puede generar eventos | Restricciones |
|-------|----------------------|---------------|
| Usuario (admin) | ✅ Todos los tipos | No puede borrar eventos |
| Usuario (técnico) | ✅ Eventos de expediente, PITR, documentos | No eventos de configuración global |
| Usuario (backoffice) | ✅ Eventos de expediente y cliente | No eventos de pago |
| Sistema (n8n) | ✅ Eventos automáticos (pagos, webhooks, colas) | No eventos que requieran juicio humano |
| IA | ✅ Eventos de predicción | Solo tipo `IA.*`, nunca cambia estado de expediente |
| Cliente | ✅ Eventos limitados (subir documento, completar PITR) | Solo sus propios expedientes |

## 7.3 Quién puede leer eventos

| Actor | Puede leer | No puede leer |
|-------|-----------|---------------|
| Admin | Todos los eventos de su empresa | — |
| Técnico | Eventos de expedientes de su empresa | Eventos de sistema (configuración) |
| Backoffice | Eventos de expedientes y clientes | Eventos de pago (solo resumen) |
| Cliente | Eventos de sus propios expedientes | Eventos internos (notas técnicas) |
| IA | Eventos del Observatorio | Eventos con datos personales |
| Anónimo | Ninguno | Ninguno |

## 7.4 Snapshots de expedientes

Para expedientes cerrados, se puede generar un **snapshot** que capture el estado completo en el momento del cierre:

**Schema:** `events.snapshot_expediente`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | PK |
| `expediente_id` | UUID | FK → `expediente.id` |
| `version` | INTEGER | Versión del snapshot |
| `snapshot` | JSONB | Estado completo del expediente + respuestas + documentos |
| `creado_en` | TIMESTAMPTZ | Creación |
| `creado_por` | UUID | FK → `usuario.id` |

**Propósito del snapshot:**
- Reconstrucción rápida sin replay de eventos.
- Verificación forense: el snapshot prueba el estado en un momento dado.
- Backup: si la tabla de expediente se corrompe, se puede restaurar desde el último snapshot + eventos posteriores.

## 7.5 Ciclo de vida de un evento

```
1. ACCIÓN: Usuario cambia estado de expediente
       │
       ▼
2. VALIDACIÓN: ¿La acción está permitida? (estado, rol, permisos)
       │
       ▼
3. TRANSACCIÓN: BEGIN
       │
       ├── 3a. Actualizar expediente (UPDATE con version)
       │
       ├── 3b. Insertar evento (INSERT en events.actividad)
       │
       ├── 3c. Si aplica: insertar notificación (INSERT en automation.notificacion)
       │
       ├── 3d. Si aplica: insertar tarea en cola (INSERT en automation.cola_tarea)
       │
       └── COMMIT / ROLLBACK si algo falla
```

**Regla:** La transacción es atómica. Si falla la inserción del evento, se revierte la actualización del expediente y viceversa.

---

# 8. PITR

## 8.1 Cómo persisten los templates

Los templates PITR se persisten en tres tablas:

```
pitr.plantilla_pitr        → Template maestro
    ├── pitr.seccion_pitr  → Secciones del template
    │       └── pitr.pregunta_pitr → Preguntas individuales
    └── pitr.version_pitr  → Historial de versiones
```

**Flujo de creación de un template:**
1. Se crea `plantilla_pitr` con nombre, slug y configuración.
2. Se crean N `seccion_pitr` asociadas a la plantilla.
3. Se crean M `pregunta_pitr` asociadas a cada sección.
4. Al publicar, se genera un `version_pitr` con un snapshot JSONB completo.

**Flujo de modificación de un template:**
1. Se bloquea la plantilla activa (no se puede modificar mientras haya expedientes en curso).
2. Se crea una nueva versión (clone).
3. Se modifica la nueva versión.
4. Se publica la nueva versión.
5. Los expedientes nuevos usan la nueva versión.
6. Los expedientes en curso siguen usando la versión con la que empezaron.

## 8.2 Cómo persisten las secciones

Las secciones se almacenan en `pitr.seccion_pitr`. Cada sección:
- Pertenece a exactamente una plantilla.
- Tiene un orden numérico.
- Puede ser obligatoria o no.
- Tiene un tiempo estimado.

## 8.3 Cómo persisten las preguntas

Las preguntas se almacenan en `pitr.pregunta_pitr`. Cada pregunta:
- Pertenece a exactamente una sección.
- Tiene un tipo (15 tipos posibles).
- Tiene validación (JSONB con reglas).
- Tiene condición de visibilidad (JSONB).
- Puede tener opciones (JSONB para select/radio/checkbox).
- Puede tener valor por defecto.

**El campo `opciones` (JSONB) sigue esta estructura:**
```json
{
  "values": [
    {"value": "gas_natural", "label": "Gas Natural"},
    {"value": "electricidad", "label": "Electricidad"},
    {"value": "gasoleo", "label": "Gasóleo"}
  ],
  "multiple": false,
  "allow_other": true,
  "other_label": "Otro (especificar)"
}
```

**El campo `validacion` (JSONB):**
```json
{
  "minLength": 2,
  "maxLength": 100,
  "min": 0,
  "max": 10000,
  "pattern": "^[A-Za-zÁáÉéÍíÓóÚúÑñ ]+$",
  "mensaje": "Solo letras permitidas"
}
```

**El campo `condicion` (JSONB):**
```json
{
  "pregunta_id": "tipo_calefaccion",
  "operador": "distinto",
  "valor": "sin_calefaccion"
}
```

## 8.4 Cómo persisten las respuestas

Las respuestas se almacenan en `pitr.respuesta_pitr`. El campo `respuestas` es un JSONB donde:
- **Key:** `pregunta_pitr.id` (UUID)
- **Value:** El valor de la respuesta (string, number, array, object según el tipo)

**Ejemplo de `respuestas`:**
```json
{
  "uuid-preg-001": "Juan Pérez",
  "uuid-preg-002": "Calle Mayor 123",
  "uuid-preg-003": "08001",
  "uuid-preg-004": "piso",
  "uuid-preg-005": ["calefaccion_gas", "calefaccion_electrica"],
  "uuid-preg-006": "2026-06-15T10:00:00Z"
}
```

**Reglas de persistencia de respuestas:**
1. Cada expediente tiene 0 o 1 respuestas por plantilla (UNIQUE expediente_id + plantilla_id).
2. Las respuestas se guardan en cada "Siguiente" (auto-save).
3. El progreso se recalcula en cada guardado.
4. Las respuestas completadas se marcan como `COMPLETADA`.
5. El técnico puede validar (`VALIDADA`) o rechazar (`RECHAZADA`) las respuestas.

## 8.5 Cómo persisten las firmas

Las firmas se almacenan en `pitr.firma_pitr`. Una firma:
- Se asocia a una respuesta PITR (1:1).
- Puede ser del cliente, del técnico o ambas.
- La imagen de la firma se almacena en Supabase Storage (bucket `firmas`).
- El hash SHA-256 de la firma se almacena en la base de datos.
- Se registra IP, user-agent y timestamp de cada firma.

## 8.6 Cómo persisten las versiones de templates

Cuando se publica un cambio en un template, se genera un `version_pitr` con:

```json
{
  "snapshot": {
    "plantilla": { ... todo el template ... },
    "secciones": [
      {
        "id": "uuid...",
        "nombre": "Datos del inmueble",
        "preguntas": [ ... array completo ... ]
      }
    ]
  },
  "version": "1.1.0",
  "cambios": "Añadida pregunta de tipo de ventanas"
}
```

Esto permite:
1. Saber exactamente qué versión se usó en cada expediente.
2. Reconstruir el formulario exacto que vio el cliente.
3. Auditar cambios en templates.

---

# 9. OBSERVATORIO

## 9.1 Qué datos llegan

El Observatorio recibe datos de **expedientes cerrados**. El flujo es:

```
Expediente cerrado
    │
    ▼
Workflow n8n "anonimizar"
    │
    ├── 1. Extraer datos del expediente + respuesta PITR
    ├── 2. Anonimizar (eliminar/truncar datos personales)
    ├── 3. Insertar en analytics.observatorio
    └── 4. Marcar expediente como anonimizado (anonymized_at)
```

**Datos que entran al Observatorio:**
- Código postal (solo 2 dígitos, provincia).
- Tipo de inmueble.
- Tipo de edificio.
- Década de construcción (ej: "1970-1980").
- Rango de superficie (ej: "60-90m²").
- Orientación.
- Letra original del certificado auditado.
- Letra según dictamen Certilab.
- Diferencia de letras.
- Dictamen (CORRECTO, INFLADO, MAL_CALCULADO, FALSEADO).
- Tipo de servicio contratado.
- Tipos de calefacción, ACS, ventanas, cubierta, muro.
- Consumo (kWh/m²año) y emisiones (kgCO₂/m²año) — anonimizados.
- Comunidad autónoma.

## 9.2 Qué datos se anonimizan

| Dato original | Transformación en Observatorio |
|---------------|--------------------------------|
| Dirección | Eliminado |
| Nombre del cliente | Eliminado |
| Email | Eliminado |
| Teléfono | Eliminado |
| DNI | Eliminado |
| Referencia catastral | Eliminado |
| Código postal completo | Truncado a 2 dígitos (provincia) |
| Año construcción exacto | Agrupado en década |
| Superficie exacta | Agrupada en rango |
| Consumo exacto | Redondeado a entero |
| Emisiones exactas | Redondeado a entero |
| Coordenadas GPS | Eliminado |
| Notas del técnico | Eliminado |
| Documentos | Eliminado (nunca se suben al Observatorio) |

## 9.3 Cómo se agregan los datos

Los datos del Observatorio se agregan periódicamente en `analytics.agregado_observatorio`:

| Tipo de agregado | Frecuencia | Contenido |
|------------------|-----------|-----------|
| `TRIMESTRAL` | Cada 3 meses | Distribución de dictámenes, media de diferencia de letras, top provincias |
| `ANUAL` | Cada año | Comparativa interanual, tendencias, informe completo |
| `CCAA` | Trimestral | Desglose por comunidad autónoma |
| `TIPOLOGIA` | Trimestral | Análisis por tipo de inmueble y edificio |

Los agregados se generan con consultas SQL sobre `analytics.observatorio` y se cachean en `agregado_observatorio` para servir rápido al frontend público.

## 9.4 Qué nunca podrá salir al Observatorio

**Datos que NUNCA salen de la base de datos principal hacia el Observatorio:**

1. **Datos personales:** nombre, email, teléfono, DNI del cliente.
2. **Datos del inmueble:** dirección exacta, referencia catastral, coordenadas GPS.
3. **Documentos:** ningún archivo subido (certificados, fotos, informes).
4. **Datos económicos:** precio pagado, método de pago, datos de facturación.
5. **Comunicaciones:** contenido de emails, notas del técnico.
6. **IPs:** direcciones IP de usuarios o clientes.
7. **Datos de autenticación:** hashes de contraseñas, tokens.
8. **Datos de auditoría:** eventos internos, logs de acceso.

**Regla absoluta:** Si un dato permite identificar a una persona física o a un inmueble concreto, no pertenece al Observatorio.

---

# 10. IA

## 10.1 Qué datos puede leer la IA

La IA puede leer los siguientes datos del sistema, siempre a través de una función controlada (`ai.leer_datos`):

**Datos accesibles:**
- Datos anonimizados del Observatorio (`analytics.observatorio`).
- Datos de expedientes **sin datos personales**:
  - Preguntas y respuestas PITR (sin nombre del cliente, sin dirección).
  - Tipo de inmueble, año de construcción (sin referencia catastral).
  - Letras energéticas, dictamen.
- Templates PITR (estructura de preguntas, validaciones, opciones).
- Prompts del sistema (`ai.prompt_ia`).

**Forma de acceso:**
1. La función `ai.leer_datos(tipo, expediente_id)` recibe un tipo de consulta.
2. La función aplica un filtro automático que elimina datos personales.
3. Los datos filtrados se entregan al modelo de IA.
4. Todo acceso se registra en `ai.auditoria_ia`.

## 10.2 Qué datos nunca puede leer la IA

**Datos prohibidos para la IA (inaccesibles por RLS):**

1. **Datos personales del cliente:** nombre, email, teléfono, DNI, dirección.
2. **Datos del inmueble que permitan identificación:** dirección exacta, referencia catastral, coordenadas GPS.
3. **Documentos:** los archivos en Storage nunca se envían directamente a la IA (excepto OCR controlado).
4. **Datos de pago:** importes, métodos de pago, datos bancarios.
5. **Datos de autenticación:** tokens, contraseñas, sesiones.
6. **Comunicaciones privadas:** contenido de emails, mensajes internos.
7. **Datos de otros clientes:** la IA no puede cruzar datos entre empresas.

**Regla absoluta:** Ningún dato personal sale del entorno Certilab hacia modelos externos (OpenAI, Anthropic, etc.).

## 10.3 Qué datos puede escribir la IA

La IA puede escribir exclusivamente en:

| Tabla | Qué puede escribir | Restricción |
|-------|-------------------|-------------|
| `ai.prediccion_ia` | Predicciones completas | Solo INSERT. No modificar. |
| `ai.auditoria_ia` | Registro de auditoría | Solo INSERT. No modificar. |
| `automation.cola_tarea` | Tareas para procesamiento | Solo INSERT. |

**La IA NUNCA puede:**
- Modificar el estado de un expediente.
- Cambiar datos de un cliente o inmueble.
- Subir documentos (solo sugerir su clasificación).
- Enviar emails (solo sugerir su envío).
- Borrar nada.

## 10.4 Cómo quedan auditadas las acciones de la IA

Cada acción de la IA genera **dos registros inmutables**:

```
PREDICCIÓN                    AUDITORÍA
┌─────────────────┐          ┌──────────────────┐
│ prediccion_ia   │ 1──N──   │ auditoria_ia     │
│                 │          │                  │
│ tipo            │          │ accion           │
│ modelo          │          │ datos_enviados   │
│ input_resumen   │          │ hash_payload     │
│ output_completo │          │ contiene_datos_  │
│ confianza       │          │   personales     │
│ validada_por    │          │ modelo_version   │
│ resultado_val.  │          │ proveedor        │
│ coste           │          │ tokens_in/out    │
│                 │          │ coste_estimado   │
└─────────────────┘          └──────────────────┘
```

**Qué queda registrado:**
1. **Qué datos se enviaron al modelo** (resumen + hash del payload).
2. **Si esos datos contenían información personal** (flag booleano).
3. **Qué modelo se usó** (proveedor + versión).
4. **Cuánto costó** (tokens + coste estimado).
5. **Qué respondió el modelo** (output completo).
6. **Si un humano validó la respuesta** (validada_por + resultado).
7. **Cuánto tardó** (tiempo de respuesta).

**Propósito de la auditoría:**
- Trazabilidad completa de cada decisión asistida por IA.
- Detección de fugas de datos personales.
- Control de costes por modelo y proveedor.
- Base para mejora continua de prompts.

---

# 11. AUTOMATIZACIONES

## 11.1 Relación con n8n

n8n es el orquestador de automatizaciones. Su relación con la base de datos:

```
n8n (workflows)
    │
    ├── Lee y escribe en core.expediente (vía API REST)
    ├── Lee y escribe en billing.pago (vía API REST)
    ├── Lee y escribe en automation.cola_tarea
    ├── Lee y escribe en automation.email
    ├── Inserta en events.actividad
    ├── Lee analytics.observatorio (para informes)
    └── Lee core.documento (para backups)
```

**n8n se autentica como usuario con rol 'sistema':**
- Tiene su propio `auth_user_id` (o usa service role key de Supabase).
- Todas sus acciones quedan registradas en `events.actividad` con `usuario_id = sistema`.
- No tiene acceso a datos personales no necesarios para su workflow.

## 11.2 Colas de tareas

El sistema de colas (`automation.cola_tarea`) es el mecanismo de procesamiento asíncrono.

**Flujo típico:**

```
1. Se inserta una tarea en cola_tarea (estado=PENDIENTE)
       │
       ▼
2. n8n o un worker consulta tareas PENDIENTE
       │
       ▼
3. Se marca como EN_PROCESO
       │
       ▼
4. Se ejecuta la tarea
       │
       ├── Éxito → estado=COMPLETADA
       └── Error → incrementa intentos
                ├── intentos < max_intentos → estado=PENDIENTE (reintento)
                └── intentos >= max_intentos → estado=FALLIDA
```

**Tipos de tarea y su procesador:**

| Tipo de tarea | Procesador | Prioridad | SLA |
|---------------|-----------|-----------|-----|
| `GENERAR_INFORME` | Worker interno (API) | Alta | 5 min |
| `ANONIMIZAR_EXPEDIENTE` | n8n | Media | 1 hora |
| `ENVIAR_EMAIL` | n8n (SMTP) | Alta | 2 min |
| `ENVIAR_WEBHOOK` | n8n | Alta | 1 min |
| `GENERAR_FACTURA` | Worker interno (API) | Alta | 10 min |
| `SINCRONIZAR_DRIVE` | n8n (programado) | Baja | 24 horas |
| `PROCESAR_OCR` | Worker interno (API) | Media | 15 min |
| `CONSULTAR_CATASTRO` | n8n | Media | 5 min |
| `PREDICCION_IA` | Worker interno (API) | Baja | 30 min |

## 11.3 Webhooks

Los webhooks se registran en `automation.webhook`. Todos los webhooks, entrantes y salientes, quedan registrados para auditoría.

**Webhooks entrantes (proveedores externos → Certilab):**

| Proveedor | Evento | Acción |
|-----------|--------|--------|
| MyPOS | `pago.completado` | Actualizar pago, crear expediente |
| MyPOS | `pago.rechazado` | Notificar cliente |
| MyPOS | `pago.reembolsado` | Actualizar pago |
| Supabase | `auth.usuario.creado` | Sincronizar usuario |
| OpenAI (futuro) | `batch.completado` | Procesar predicciones batch |

**Webhooks salientes (Certilab → n8n):**

| Evento de negocio | Webhook a n8n | Propósito |
|-------------------|---------------|-----------|
| Expediente creado | `expediente.creado` | Disparar workflow de bienvenida |
| Pago completado | `pago.completado` | Disparar workflow de confirmación |
| Documento subido | `documento.subido` | Disparar OCR |
| PITR completado | `pitr.completado` | Notificar al técnico |
| Informe enviado | `informe.enviado` | Disparar workflow de cierre |

## 11.4 Emails

Los emails transaccionales se registran en `automation.email`. Todos los emails quedan registrados con estado de envío.

**Plantillas de email registradas en el sistema:**
- `nuevo-lead` — Confirmación de lead
- `link-pago` — Link de pago MyPOS
- `pago-confirmado` — Confirmación de pago
- `acceso-plataforma` — Credenciales de acceso
- `pitr-pendiente` — Recordatorio de inspección
- `datos-solicitados` — Solicitud de información adicional
- `informe-listo` — Aviso de informe disponible
- `expediente-cerrado` — Expediente completado
- `recordatorio-pago` — Recordatorio de pago pendiente
- `recordatorio-pitr` — Recordatorio de PITR pendiente

**Reglas de email:**
- Todo email se registra en `automation.email` (pendiente, enviado, fallido, rebotado).
- Los rebotes se registran para limpieza de contactos.
- Incluir siempre link de baja (GDPR).
- Nunca adjuntar el informe (solo link de descarga segura).

---

# 12. INTEGRACIONES

## 12.1 MyPOS

**Integración con el modelo de datos:**

```
MyPOS (API)
    │
    ├── Crear link de pago → Almacenar link_pago en billing.pago
    ├── Webhook pago.completado → Actualizar billing.pago (estado=COMPLETADO)
    └── Webhook pago.rechazado → Actualizar billing.pago (estado=RECHAZADO)
```

**Datos almacenados:**
- `billing.pago.proveedor_pago_id` — ID del pago en MyPOS.
- `billing.pago.link_pago` — URL del link de pago generado.
- `billing.pago.webhook_payload` — Payload completo recibido de MyPOS (para auditoría).
- `billing.pago.comision` — Comisión cobrada por MyPOS.

**No se almacenan:** datos de tarjeta de crédito, CVV, fecha de caducidad, nombre del titular (PCI compliance delegada a MyPOS).

## 12.2 Catastro

**Integración con el modelo de datos:**

```
Sede Electrónica del Catastro (API)
    │
    ├── Consultar por ref. catastral → Almacenar en inmueble.datos_catastrales (JSONB)
    └── Validar datos → Comparar con inmueble.superficie, inmueble.ano_construccion
```

**Datos que se almacenan en `inmueble.datos_catastrales`:**
```json
{
  "ref_catastral": "1234567XX1234S",
  "superficie_suelo": 85.0,
  "superficie_construida": 95.0,
  "ano_construccion": 1985,
  "uso": "residencial",
  "tipo": "vivienda",
  "clase": "urbano",
  "valor_catastral": 85000.00,
  "fecha_consulta": "2026-06-15T10:00:00Z",
  "coincidencias": {
    "superficie": true,
    "ano_construccion": true
  }
}
```

## 12.3 Google Maps

**Integración con el modelo de datos:**

```
Google Maps Geocoding API
    │
    └── Geocodificar dirección → Almacenar latitud, longitud en inmueble
```

**Uso:**
- Geocodificación automática de direcciones de inmuebles.
- Almacenamiento en `inmueble.latitud` e `inmueble.longitud`.
- Uso futuro para mapas de calor del Observatorio.

## 12.4 OpenAI

**Integración con el modelo de datos:**

```
OpenAI API
    │
    ├── GPT-4o (chat completions) → Generar predicciones → ai.prediccion_ia
    ├── GPT-4o (vision) → Analizar fotos → ai.prediccion_ia
    └── O1 (razonamiento) → Análisis técnico → ai.prediccion_ia
```

**Reglas:**
- Nunca se envían datos personales a OpenAI.
- Los prompts se gestionan desde `ai.prompt_ia`.
- Cada llamada se registra en `ai.auditoria_ia`.
- Coste estimado por llamada.

## 12.5 Anthropic

**Integración con el modelo de datos:**

```
Anthropic API
    │
    ├── Claude Sonnet → Análisis de documentos → ai.prediccion_ia
    └── Claude Opus → Análisis complejo → ai.prediccion_ia
```

**Mismas reglas que OpenAI:**
- Sin datos personales.
- Auditoría completa.
- Registro de costes.

## 12.6 OCR

**Integración con el modelo de datos:**

```
OCR Pipeline
    │
    ├── 1. Documento subido (core.documento)
    ├── 2. Worker procesa PDF/Imagen (cola_tarea tipo PROCESAR_OCR)
    ├── 3. IA extrae datos (prediccion_ia tipo EXTRACCION_OCR)
    └── 4. Resultados en documento.metadatos.ocr
```

**Datos extraídos por OCR:**
- Dirección, referencia catastral, letra, consumo, emisiones, etc.
- Se almacenan en `documento.metadatos -> 'ocr'` (JSONB).
- El técnico valida los datos extraídos.

## 12.7 CE3X

**Integración con el modelo de datos:**

```
CE3X (Software de certificación)
    │
    ├── Generar archivo XML → Almacenar en core.documento (tipo CE3X_XML)
    └── Importar datos desde CE3X → Alimentar respuesta PITR
```

**Datos almacenados:**
- Archivo XML de CE3X como documento en Supabase Storage.
- Referencia en `core.documento` con tipo `CE3X_XML`.

## 12.8 APIs futuras

| API | Propósito | Versión planificada |
|-----|-----------|-------------------|
| Google Drive API | Backup de informes | V1.4 |
| WhatsApp Business API | Notificaciones al cliente | V1.4 |
| Slack API | Notificaciones internas al equipo | V2.0 |
| Idealista API | Datos de mercado inmobiliario | V2.5 |
| Fotocasa API | Datos de mercado inmobiliario | V2.5 |
| INE API | Datos demográficos para Observatorio | V2.5 |
| AEMET API | Datos climáticos para correlaciones | V3.0 |

---

# 13. ESTRATEGIA DE MIGRACIONES

## 13.1 Herramienta

Las migraciones se gestionan con **Supabase CLI** (`supabase migration`). Cada migración es un archivo SQL versionado.

**Estructura de migraciones:**

```
supabase/
  migrations/
    20260701_000001_create_schemas.sql
    20260701_000002_create_types_enums.sql
    20260701_000003_create_core_empresa.sql
    20260701_000004_create_auth_usuario.sql
    20260701_000005_create_core_cliente.sql
    20260701_000006_create_core_inmueble.sql
    20260701_000007_create_core_servicio.sql
    20260701_000008_create_core_expediente.sql
    ...
```

## 13.2 Versionado de migraciones

Cada migración tiene:
- **Timestamp** en el nombre (`YYYYMMDD_HHMMSS`).
- **Número secuencial** para orden.
- **Descripción** clara del cambio.

**Formato:** `{timestamp}_{numero}_{descripcion}.sql`

**Reglas:**
- Las migraciones se aplican en orden secuencial.
- No se modifica una migración ya aplicada (se crea una nueva).
- Cada migración es **reversible** (tiene `-- DOWN` comentado para rollback manual).
- Las migraciones se prueban en staging antes de producción.

## 13.3 Rollback

Cada migración incluye el SQL de rollback comentado al final:

```sql
-- UP
CREATE TABLE core.expediente ( ... );

-- DOWN
-- DROP TABLE IF EXISTS core.expediente;
```

**Procedimiento de rollback:**
1. Ejecutar `supabase migration repair --status reverted <migration>`.
2. Ejecutar el SQL de DOWN manualmente.
3. Verificar que no hay datos huérfanos.
4. Notificar al equipo.

## 13.4 Seeds (Datos de prueba)

Los seeds son datos de prueba para desarrollo y staging:

```
supabase/
  seeds/
    001_empresa_demo.sql
    002_usuarios_demo.sql
    003_clientes_demo.sql
    004_inmuebles_demo.sql
    005_servicios_demo.sql
    006_expedientes_demo.sql
    007_plantilla_pitr_demo.sql
```

**Reglas de seeds:**
- Los seeds se ejecutan solo en `--env local` y `--env staging`.
- Nunca en producción.
- Los datos demo son claramente identificables (prefijo "DEMO-" en nombres).

## 13.5 Datos demo

Los datos iniciales necesarios para que la plataforma funcione en desarrollo:

| Tabla | Registros mínimos | Propósito |
|-------|------------------|-----------|
| `core.empresa` | 1 | Certilab como empresa demo |
| `auth.usuario` | 3 | admin, tecnico, backoffice |
| `core.cliente` | 5 | Clientes demo |
| `core.inmueble` | 8 | Inmuebles variados |
| `core.servicio` | 3 | Segunda Opinión, Express, ITE |
| `core.expediente` | 10 | En varios estados |
| `pitr.plantilla_pitr` | 1 | Template Segunda Opinión |
| `pitr.seccion_pitr` | 8 | Secciones del template |
| `pitr.pregunta_pitr` | 45 | Preguntas del template |
| `pitr.respuesta_pitr` | 4 | Respuestas completadas |
| `billing.pago` | 5 | Pagos en varios estados |
| `events.actividad` | 30 | Eventos históricos |
| `analytics.observatorio` | 10 | Datos anonimizados demo |

---

# 14. ESCALABILIDAD

## 14.1 100 usuarios

**Régimen:** Startup.
**Volumen:** < 500 expedientes/año. < 50 GB Storage.

**Qué funciona sin cambios:**
- Modelo actual sin particionado.
- Índices B-tree simples.
- Sin caché externa.
- Supabase free/pro (8GB DB, 100GB Storage).

**Riesgos:** Ninguno. El modelo está sobredimensionado para este volumen.

## 14.2 1.000 usuarios

**Régimen:** Crecimiento.
**Volumen:** < 5.000 expedientes/año. < 200 GB Storage.

**Qué puede necesitar ajustes:**
- `events.actividad` empieza a tener > 100.000 filas. Índices BRIN en timestamp.
- `analytics.observatorio` tiene > 5.000 filas. Índices compuestos.
- Supabase Pro (16GB DB, 1TB Storage) o Team.

**Riesgos:** Bajos. Monitorizar tamaño de la tabla de eventos.

## 14.3 10.000 usuarios

**Régimen:** Escalamiento.
**Volumen:** < 50.000 expedientes/año. < 2 TB Storage.

**Qué necesita cambios:**
- **Particionado** de `events.actividad` por mes (partition by timestamp).
- **Particionado** de `analytics.observatorio` por trimestre.
- **Vistas materializadas** para informes recurrentes del Observatorio.
- **Caché Redis** para datos de alta lectura (empresa, servicio, template activos).
- **Supabase Team/Large** (64GB DB, 5TB Storage).
- **Archivado** de expedientes cerrados > 3 años a tabla `expediente_archivado`.

**Riesgos:** Medios. La tabla de eventos es el principal cuello de botella.

## 14.4 100.000 expedientes

**Régimen:** Escalamiento avanzado.
**Volumen:** < 500.000 expedientes/año. < 10 TB Storage.

**Qué necesita cambios:**
- **Separación de bases de datos:** base transaccional + base de eventos + base analítica.
- **Events a base separada:** `events` schema se mueve a una base de datos PostgreSQL independiente.
- **Sharding por empresa** opcional si hay empresas con > 10.000 expedientes.
- **Caché Redis** en todos los endpoints críticos.
- **Colas externas** (RabbitMQ/Redis) en lugar de tabla `cola_tarea`.
- **Supabase Enterprise** con replica en lectura.
- **Archivado automático** de expedientes > 5 años a cold storage.

**Riesgos:** Altos. La separación de bases requiere migración.

## 14.5 1 millón de expedientes

**Régimen:** Enterprise.
**Volumen:** < 5M expedientes/año. < 50 TB Storage.

**Qué necesita cambios:**
- **Base de datos dedicada** para cada schema principal (`core`, `pitr`, `events`, `analytics`).
- **TimescaleDB** para eventos (hypertables con compresión automática).
- **CDN** para distribución de documentos (CloudFront/Cloudflare).
- **Read replicas** para consultas del Observatorio.
- **Sharding geográfico** si hay expansión internacional.
- **Compresión** de datos viejos (eventos > 2 años comprimidos).
- **Cold storage** (S3 Glacier/Google Archive) para expedientes > 5 años.

**Riesgos:** Críticos. Requiere re-arquitectura del sistema de eventos.

## 14.6 5 millones de expedientes

**Régimen:** Escala global.
**Volumen:** < 25M expedientes/año. < 250 TB Storage.

**Qué necesita cambios:**
- **Arquitectura multi-base de datos** completamente distribuida.
- **CQRS** separando escritura (PostgreSQL) de lectura (Elasticsearch/Clickhouse).
- **Event Sourcing completo** (reconstruir estado desde eventos).
- **Streaming** (Kafka/Redpanda) para eventos en tiempo real.
- **Data Warehouse** (Snowflake/BigQuery) para analítica.
- **Sharding automático** por región + empresa.

**Riesgos:** Cambio completo de arquitectura. No debería llegar a este punto sin una reescritura planificada.

---

## 14.7 Estrategia de archivado

El archivado mueve datos de la tabla principal a tablas de archivado en el mismo schema:

```sql
-- Tabla de archivado para expedientes cerrados
CREATE TABLE core.expediente_archivado (LIKE core.expediente INCLUDING ALL);

-- Trigger de archivado: cuando un expediente cumple 3 años de cerrado
-- se mueve automáticamente a expediente_archivado
```

**Reglas de archivado:**

| Antigüedad | Acción |
|------------|--------|
| < 2 años | Tabla principal |
| 2-5 años | Tabla de archivado (misma BD) |
| 5-10 años | Tabla de archivado comprimida |
| > 10 años | Cold storage (backup, fuera de la BD operativa) |

**Datos que NO se archivan nunca:**
- Empresas activas.
- Usuarios activos.
- Templates PITR activos.
- Datos del Observatorio (permanecen siempre accesibles).

---

# 15. RIESGOS

## 15.1 Cuellos de botella identificados

| # | Cuello de botella | Impacto | Probabilidad | Mitigación |
|---|-------------------|---------|-------------|------------|
| 1 | `events.actividad` crece sin límite | Degradación de SELECT/INSERT | Alta (100%) | Particionado por mes desde el diseño. Archivado a los 2 años. |
| 2 | `core.expediente` con muchas actualizaciones | Contención en version lock | Media (60%) | Optimistic locking + retry. Separar lecturas de escrituras. |
| 3 | `pitr.respuesta_pitr.respuestas` (JSONB grande) | Lectura lenta del JSON completo | Media (50%) | Indexar campos frecuentes dentro del JSONB con GIN. |
| 4 | `analytics.observatorio` consultas agregadas | Escaneo secuencial en tablas grandes | Media (40%) | Vistas materializadas + agregados precalculados. |
| 5 | Subida concurrente de documentos | Contención en Storage | Baja (30%) | Límite de concurrencia por expediente. Cola de procesamiento. |
| 6 | Consultas sin índice en fecha | Sequential scan en tablas grandes | Alta (60%) | Siempre incluir índice en columnas de fecha. |
| 7 | `auth.usuario` JOIN con `auth.users` | Dependencia de tabla externa (Supabase Auth) | Media (40%) | Cachear auth_user_id localmente. Minimizar JOINs. |
| 8 | Transacciones largas (evento + expediente + cola) | Deadlocks | Baja (20%) | Mantener transacciones cortas. Orden consistente de tablas. |

## 15.2 Tablas críticas

| Tabla | Crítica porque | Estrategia |
|-------|---------------|------------|
| `core.expediente` | Entidad central. Toda operación la consulta. | Replicación, caché, índices completos. |
| `events.actividad` | Auditoría. Crece más rápido que cualquier otra. | Particionado mensual. Archivado + compresión. |
| `pitr.respuesta_pitr` | Almacena respuestas de clientes. Datos grandes. | JSONB optimizado. Backup frecuente. |
| `core.documento` | Referencia a archivos en Storage. | Soft delete. Hash de verificación. |
| `analytics.observatorio` | Datos públicos. Consultas frecuentes. | Vistas materializadas. CDN si es necesario. |

## 15.3 Índices necesarios (orden de prioridad)

| Prioridad | Índice | Justificación |
|-----------|--------|---------------|
| 🔴 P0 | `idx_expediente_empresa_estado` | Filtro principal del dashboard |
| 🔴 P0 | `idx_expediente_cliente` | Consulta de "mis expedientes" |
| 🔴 P0 | `idx_actividad_expediente` | JOIN con expediente (el más frecuente) |
| 🔴 P0 | `idx_documento_expediente` | JOIN expediente-documento |
| 🟡 P1 | `idx_pago_expediente` | Consulta de pagos por expediente |
| 🟡 P1 | `idx_respuesta_expediente` | JOIN expediente-respuesta |
| 🟡 P1 | `idx_actividad_timestamp` | Ordenación por fecha |
| 🟡 P1 | `idx_inmueble_cliente` | Búsqueda de inmuebles por cliente |
| 🟢 P2 | `idx_observatorio_dictamen` | Filtro del Observatorio |
| 🟢 P2 | `idx_prediccion_expediente` | Consulta de predicciones IA |
| 🟢 P2 | `idx_notificacion_usuario` | Notificaciones no leídas |
| 🟢 P2 | `idx_cola_estado` | Worker de colas |

## 15.4 Particionado

| Tabla | Tipo de partición | Clave | Período |
|-------|-------------------|-------|---------|
| `events.actividad` | RANGE | `timestamp` | Mensual |
| `analytics.observatorio` | RANGE | `fecha_anonimizacion` | Trimestral |
| `analytics.agregado_observatorio` | RANGE | `generado_en` | Anual |
| `automation.webhook` | RANGE | `created_at` | Mensual |
| `automation.cola_tarea` | LIST | `estado` | PENDIENTE vs resto |

## 15.5 Archivado

| Tabla | Cuándo archivar | Destino |
|-------|-----------------|---------|
| `core.expediente` | > 3 años cerrado | `core.expediente_archivado` |
| `events.actividad` | > 2 años | `events.actividad_archivado` |
| `core.documento` | > 5 años (expediente archivado) | Soft delete + Storage cold |
| `automation.email` | > 1 año | `automation.email_archivado` |

---

# 16. ROADMAP

## 16.1 Orden exacto de implementación

### FASE 0 — Schemas y tipos (día 1-2)

```
Migraciones:
1.  create_schemas.sql          → Crear 9 schemas
2.  create_types_enums.sql      → Crear todos los ENUMs
```

### FASE 1 — Núcleo de negocio (día 3-7)

```
Migraciones:
3.  create_core_empresa.sql         → core.empresa + RLS
4.  create_auth_usuario.sql         → auth.usuario + RLS
5.  create_core_cliente.sql         → core.cliente + RLS
6.  create_core_inmueble.sql        → core.inmueble + RLS
7.  create_core_servicio.sql        → core.servicio + RLS
8.  create_core_consentimiento.sql  → core.consentimiento + RLS
```

### FASE 2 — Expedientes (día 8-10)

```
Migraciones:
9.  create_core_expediente.sql            → core.expediente + RLS + índices
10. create_core_documento.sql             → core.documento + RLS + storage
11. create_events_actividad.sql           → events.actividad + RLS + particionado
12. create_events_snapshot_expediente.sql → events.snapshot_expediente
```

### FASE 3 — PITR (día 11-14)

```
Migraciones:
13. create_pitr_plantilla.sql    → pitr.plantilla_pitr + RLS
14. create_pitr_seccion.sql      → pitr.seccion_pitr + RLS
15. create_pitr_pregunta.sql     → pitr.pregunta_pitr + RLS
16. create_pitr_respuesta.sql    → pitr.respuesta_pitr + RLS
17. create_pitr_firma.sql        → pitr.firma_pitr + RLS
18. create_pitr_version.sql      → pitr.version_pitr + RLS
```

### FASE 4 — Pagos y facturación (día 15-16)

```
Migraciones:
19. create_billing_pago.sql      → billing.pago + RLS
20. create_billing_factura.sql   → billing.factura + RLS
```

### FASE 5 — Automatizaciones (día 17-18)

```
Migraciones:
21. create_automation_cola.sql       → automation.cola_tarea + RLS
22. create_automation_webhook.sql    → automation.webhook + RLS
23. create_automation_email.sql      → automation.email + RLS
24. create_automation_notificacion.sql → automation.notificacion + RLS
```

### FASE 6 — Integraciones (día 19)

```
Migraciones:
25. create_core_integracion.sql      → core.integracion + RLS
```

### FASE 7 — Observatorio (día 20-21)

```
Migraciones:
26. create_analytics_observatorio.sql       → analytics.observatorio + RLS
27. create_analytics_agregado.sql           → analytics.agregado_observatorio + RLS
```

### FASE 8 — IA (día 22-23)

```
Migraciones:
28. create_ai_prompt.sql            → ai.prompt_ia + RLS
29. create_ai_prediccion.sql        → ai.prediccion_ia + RLS
30. create_ai_auditoria.sql         → ai.auditoria_ia + RLS
```

## 16.2 Tablas para V1.x (implementación inmediata)

| # | Tabla | Prioridad | Depende de |
|---|-------|-----------|------------|
| 1 | `core.empresa` | 🔴 IMPRESCINDIBLE | — |
| 2 | `auth.usuario` | 🔴 IMPRESCINDIBLE | 1 |
| 3 | `core.cliente` | 🔴 IMPRESCINDIBLE | 1, 2 |
| 4 | `core.inmueble` | 🔴 IMPRESCINDIBLE | 1, 3 |
| 5 | `core.servicio` | 🔴 IMPRESCINDIBLE | 1 |
| 6 | `core.expediente` | 🔴 IMPRESCINDIBLE | 1, 3, 4, 5 |
| 7 | `core.documento` | 🔴 IMPRESCINDIBLE | 1, 6 |
| 8 | `events.actividad` | 🔴 IMPRESCINDIBLE | 1, 6, 2 |
| 9 | `core.consentimiento` | 🔴 IMPRESCINDIBLE (RGPD) | 1, 3 |
| 10 | `pitr.plantilla_pitr` | 🔴 IMPRESCINDIBLE | 1 |
| 11 | `pitr.seccion_pitr` | 🔴 IMPRESCINDIBLE | 10 |
| 12 | `pitr.pregunta_pitr` | 🔴 IMPRESCINDIBLE | 11 |
| 13 | `pitr.respuesta_pitr` | 🔴 IMPRESCINDIBLE | 6, 10 |
| 14 | `pitr.firma_pitr` | 🔴 IMPRESCINDIBLE | 13 |
| 15 | `pitr.version_pitr` | 🔴 IMPRESCINDIBLE | 10 |
| 16 | `billing.pago` | 🔴 IMPRESCINDIBLE | 1, 6 |
| 17 | `automation.cola_tarea` | 🟡 ALTA | 1 |
| 18 | `automation.webhook` | 🟡 ALTA | 1 |
| 19 | `automation.notificacion` | 🟡 ALTA | 1, 2, 6 |
| 20 | `analytics.observatorio` | 🟡 ALTA | 1, 6 |

## 16.3 Tablas para V2

| # | Tabla | Prioridad | Depende de |
|---|-------|-----------|------------|
| 21 | `billing.factura` | 🟡 ALTA | 1, 6, 16 |
| 22 | `automation.email` | 🟡 ALTA | 1, 6 |
| 23 | `analytics.agregado_observatorio` | 🟢 MEDIA | 20 |
| 24 | `core.integracion` | 🟢 MEDIA | 1 |
| 25 | `ai.prompt_ia` | 🟢 MEDIA | — |
| 26 | `ai.prediccion_ia` | 🟢 MEDIA | 1, 6, 25 |
| 27 | `ai.auditoria_ia` | 🟢 MEDIA | 26 |
| 28 | `events.snapshot_expediente` | 🔵 BAJA | 6, 8 |

## 16.4 Tablas para V3

| # | Tabla | Prioridad | Depende de |
|---|-------|-----------|------------|
| 29 | `core.expediente_archivado` | 🔵 BAJA | 6 |
| 30 | `events.actividad_archivado` | 🔵 BAJA | 8 |
| 31 | `automation.email_archivado` | 🔵 BAJA | 22 |

## 16.5 Dependencias críticas entre tablas

```
core.empresa
    ├── auth.usuario (depende de empresa)
    ├── core.cliente (depende de empresa)
    ├── core.inmueble (depende de empresa y cliente)
    ├── core.servicio (depende de empresa)
    └── core.expediente (depende de empresa, cliente, inmueble, servicio)
        ├── core.documento (depende de expediente)
        ├── events.actividad (depende de empresa, expediente, usuario)
        ├── billing.pago (depende de empresa, expediente)
        ├── pitr.respuesta_pitr (depende de expediente, plantilla)
        ├── ai.prediccion_ia (depende de empresa, expediente)
        └── analytics.observatorio (depende de expediente)

pitr.plantilla_pitr
    ├── pitr.seccion_pitr (depende de plantilla)
    │   └── pitr.pregunta_pitr (depende de sección)
    └── pitr.version_pitr (depende de plantilla)
```

---

## Apéndice A: Diccionario de datos

| Término | Definición en el contexto del modelo de datos |
|---------|-----------------------------------------------|
| **Auditoría** | Registro inmutable de toda acción en el sistema. Ver esquema `events`. |
| **Cliente** | Persona física que contrata servicios. Ver `core.cliente`. |
| **Dictamen** | Conclusión técnica del Arquitecto sobre el certificado auditado. Campo en `core.expediente`. |
| **Empresa** | Tenant del sistema multiempresa. Ver `core.empresa`. |
| **Evento** | Registro append-only de una acción. Ver `events.actividad`. |
| **Expediente** | Unidad de trabajo central. Ver `core.expediente`. |
| **Inmueble** | Propiedad sobre la que se realiza el servicio. Ver `core.inmueble`. |
| **Observatorio** | Datos anonimizados públicos. Ver `analytics.observatorio`. |
| **PITR** | Procedimiento de Inspección Técnica Remota. Ver schema `pitr`. |
| **Servicio** | Producto contratable. Ver `core.servicio`. |
| **Soft delete** | Marcado de registro como eliminado sin borrado físico. `deleted_at` + `deleted_by`. |
| **Tenant** | Empresa en el modelo multiempresa. Ver `core.empresa`. |
| **Usuario** | Persona con acceso al sistema. Ver `auth.usuario`. |
| **Versionado** | Control de concurrencia mediante columna `version`. Optimistic locking. |

---

## Apéndice B: Cambios respecto al modelo actual (CF-000, CF-002)

| Cambio | Modelo actual (CF-000/CF-002) | Modelo nuevo (CF-020) | Justificación |
|--------|------------------------------|----------------------|---------------|
| Multiempresa | No existe `empresa` como entidad | `core.empresa` es la entidad raíz | SaaS multiempresa (V3) requiere aislamiento de datos |
| UUID en todas las PK | Se menciona pero no es norma | **Todas** las PK son UUID | Consistencia, escalabilidad, seguridad |
| Soft delete en todas las tablas | No se menciona explícitamente | Todas las tablas de negocio tienen `deleted_at`/`deleted_by` | Recuperación ante errores, auditoría |
| Schemas PostgreSQL | No se mencionan | 9 schemas organizados por dominio | Aislamiento, permisos, escalabilidad |
| Auditoría completa | Solo `created_at`/`updated_at` | + `created_by`/`updated_by`/`version` | Trazabilidad completa de cambios |
| ENUMs | En TypeScript, no en BD | ENUMs en schema `types` | Integridad a nivel de base de datos |
| Observatorio | Tabla plana sin agregados | `observatorio` + `agregado_observatorio` | Rendimiento en consultas públicas |
| IA | Mencionada sin modelo de datos | 3 tablas: `prediccion`, `auditoria`, `prompt` | Trazabilidad completa de IA |
| Eventos | 14 tipos listados | 30+ tipos con formato `DOMINIO.ACCION` | Cobertura completa del sistema |
| Colas | No existen como tabla | `automation.cola_tarea` con estados y prioridad | Procesamiento asíncrono trazable |
| Firmas digitales | Mencionadas sin detalle | `pitr.firma_pitr` con hash, IP, user-agent | Valor legal, auditoría |
| Versionado de templates | No existe | `pitr.version_pitr` con snapshot JSONB | Reconstrucción exacta de versiones |
| Particionado | No se menciona | `events.actividad` particionado por mes | Escalabilidad desde el diseño |

---

## Apéndice C: Checklist de validación del modelo

- [ ] Todas las entidades tienen UUID como PK
- [ ] Todas las entidades tienen `created_at`, `created_by`, `updated_at`, `updated_by`
- [ ] Todas las entidades de negocio tienen soft delete (`deleted_at`, `deleted_by`)
- [ ] Todas las entidades de negocio tienen `version` (optimistic locking)
- [ ] Todas las FK tienen su correspondiente índice
- [ ] Todas las tablas tienen RLS habilitado
- [ ] Las políticas de RLS incluyen `empresa_id` para aislamiento multiempresa
- [ ] Las tablas de eventos tienen RLS que prohíbe UPDATE y DELETE
- [ ] Los ENUMs están en schema `types` y se referencian desde las tablas
- [ ] Los timestamps son `TIMESTAMPTZ` (con zona horaria)
- [ ] Los datos RGPD tienen `consent_id` y `retention_days`
- [ ] El modelo separa `cliente` (persona física) de `usuario` (acceso al sistema)
- [ ] El modelo separa `inmueble` de `expediente` (un inmueble puede tener N expedientes)
- [ ] El Observatorio no contiene datos personales ni datos que permitan identificar
- [ ] Las tablas de IA son inmutables (solo INSERT, sin UPDATE/DELETE)
- [ ] El sistema de colas tiene reintentos y estado de error
- [ ] Los documentos tienen hash SHA-256 para verificación de integridad
- [ ] Las firmas digitales registran IP, user-agent y timestamp
- [ ] Las transiciones de estado están protegidas por la máquina de estados
- [ ] El modelo permite reconstruir el historial completo de un expediente

---

**Fin del documento CF-020 — DATA MODEL**

---

*Este documento es la Constitución del modelo de datos de Certilab. Cualquier cambio en el modelo debe ser aprobado por el Arquitecto Técnico responsable y reflejado en este documento antes de su implementación.*