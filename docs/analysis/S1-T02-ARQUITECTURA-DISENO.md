# S1-T02 — Diseño Arquitectónico Completo

> **Documento:** Diseño de arquitectura para S1-T02  
> **Versión:** 1.0 (Borrador para revisión)  
> **Estado:** Pendiente de aprobación  
> **Fecha:** 2026-07-09  
> **Basado en:** S1-T01 (ADT), CF-001A, CF-021, CF-022, CF-028, CF-050, ADR-002, ADR-003, ADR-004

---

## ÍNDICE

1. [Objetivo funcional de la épica](#1-objetivo-funcional-de-la-épica)
2. [Valor de negocio al MVP](#2-valor-de-negocio-al-mvp)
3. [Relación con S1-T01](#3-relación-con-s1-t01)
4. [Impacto sobre el dominio (DDD)](#4-impacto-sobre-el-dominio-ddd)
5. [Aggregate Roots y entidades afectadas](#5-aggregate-roots-y-entidades-afectadas)
6. [Casos de uso nuevos o modificados](#6-casos-de-uso-nuevos-o-modificados)
7. [Impacto sobre la base de datos](#7-impacto-sobre-la-base-de-datos)
8. [APIs, Server Actions y contratos](#8-apis-server-actions-y-contratos)
9. [Componentes UI implicados](#9-componentes-ui-implicados)
10. [Riesgos técnicos y funcionales](#10-riesgos-técnicos-y-funcionales)
11. [Impacto transversal sobre la arquitectura](#11-impacto-transversal-sobre-la-arquitectura)
12. [Compatibilidad con gobernanza](#12-compatibilidad-con-gobernanza)
13. [Modelo de dominio extendido](#13-modelo-de-dominio-extendido)
14. [Flujo funcional completo](#14-flujo-funcional-completo)
15. [Estrategia de implementación por fases](#15-estrategia-de-implementación-por-fases)

---

## 1. Objetivo funcional de la épica

### 1.1 Propósito

**S1-T02** tiene como objetivo **generar, visualizar y entregar el dictamen técnico-formal** — documento derivado que incorpora un diagnostico_base inmutable sobre el que Certilab emite la decisión técnica oficial — que condensa el diagnóstico realizado por el Arquitecto Técnico (AT) durante S1-T01, transformándolo en un documento entregable al cliente.

### 1.2 Capacidades funcionales que aporta

| # | Capacidad | Descripción |
|---|-----------|-------------|
| 1 | **Generar dictamen desde diagnóstico** | Transformar el `DiagnosticoCompleto` (JSONB) en un documento formal estructurado con: veredicto, nivel de confianza, problemas detectados, actuaciones recomendadas, impacto económico |
| 2 | **Visualizar dictamen en backoffice** | Vista de lectura del dictamen generado, previa a la entrega, con opción de ajustes finales |
| 3 | **Marcar dictamen como definitivo** | Transición de estado: `DiagnosticoCompletado` → `DictamenEmitido` (nuevo paso en el workflow del expediente) |
| 4 | **Entregar resultado al cliente** | Poner el dictamen a disposición del cliente en su dashboard de plataforma |
| 5 | **Registrar evidencia de entrega** | Evento `DICTAMEN_ENTREGADO` con timestamp, userId y versión del dictamen |

### 1.3 Lo que NO incluye S1-T02

- ❌ Generación de PDF (se hará en S1-T03 o como extensión posterior)
- ❌ Firma digital del cliente (post-MVP)
- ❌ Notificaciones email automáticas (se harán vía n8n en épica E31)
- ❌ Cierre de expediente (posterior, E28-T06)
- ❌ Correcciones o re-versiones del dictamen (post-MVP)

---

## 2. Valor de negocio al MVP

### 2.1 Contexto en el flujo MVP

```
Cliente solicita → Paga → Completa PITR → AT revisa → AT diagnostica (S1-T01) 
    → AT emite dictamen (S1-T02) → Cliente recibe resultado → Expediente se cierra
                                                      ↑
                                              **AQUÍ ESTAMOS**
```

### 2.2 Valor directo

| Aspecto | Valor |
|---------|-------|
| **Completa el servicio** | Sin S1-T02, el diagnóstico del AT nunca llega al cliente. El servicio queda inconcluso. |
| **Primer entregable formal** | Es el primer documento de valor que el cliente recibe de Certilab. |
| **Cierra el loop de confianza** | El cliente ve que su pago se tradujo en un análisis profesional estructurado. |
| **Base para el Observatorio** | Los dictámenes emitidos alimentarán los KPIS anonimizados del Observatorio (V2). |
| **Diferenciación competitiva** | Un dictamen estructurado y profesional es superior a un simple email o PDF informal. |

### 2.3 Respuesta a las preguntas obligatorias (Product-First §9.5)

**1. ¿Qué capacidad funcional añade al MVP?**
Permite al AT transformar el diagnóstico técnico (capturado en S1-T01) en un dictamen formal que el cliente puede consultar en su dashboard. Es la primera vez que el cliente recibe un output de valor tangible.

**2. ¿Qué agregados participan?**
- **Expediente** (principal): Contiene el diagnóstico y gestiona el estado del dictamen
- **Documento IA** (secundario): Almacena el dictamen como un documento generado

**3. ¿Cómo interactúan entre sí?**
```
Expediente.diagnostico (JSONB) → Server Action → genera → Dictamen (Documento IA)
                                                          ↓
                                              Almacena en expediente.dictamen
                                                          ↓
                                              Cliente consulta en dashboard
```

**4. ¿Por qué esta es la solución de menor complejidad?**
Porque reutiliza el diagnóstico existente (S1-T01) sin crear nuevos agregados. El dictamen es una transformación del diagnóstico, no una entidad nueva. Se almacena como JSONB en el expediente existente, añadiendo una columna mediante migración SQL, siguiendo el mismo patrón que el diagnóstico. No se requiere nuevo schema SQL, ni nuevo bucket, ni nuevo servicio de dominio.

---

## 3. Relación con S1-T01

### 3.1 Dependencia directa

S1-T02 **depende completamente** de S1-T01. No puede existir sin él:

```
S1-T01 (ADT)                         S1-T02 (Dictamen)
─────────────────────────────────────────────────────────────
Captura diagnóstico                  Genera dictamen desde diagnóstico
Estado: Borrador/Completado          Estado: DictamenEmitido
Propiedad: AT edita                  Propiedad: AT emite (solo lectura tras emisión)
Persistencia: JSONB en expediente    Persistencia: JSONB en expediente (misma fila)
```

### 3.2 Contrato de integración

El contrato entre S1-T01 y S1-T02 es el tipo `DiagnosticoCompleto`:

```typescript
// S1-T01 produce → S1-T02 consume
interface DiagnosticoCompleto {
  veredicto: VeredictoGlobal;
  nivel_confianza: NivelConfianza;
  resumen_ejecutivo: string;
  certificado_original: {
    letra: string;
    registro: string;
    fecha_emision: string;
  };
  problemas: ProblemaDiagnostico[];
  actuaciones: ActuacionDiagnostico[];
}
```

S1-T02 tomará este objeto y lo transformará en un `DictamenTecnico` estructurado para presentación al cliente.

### 3.3 No hay breaking changes

S1-T02 **no modifica** los tipos, server actions o componentes de S1-T01. Solo añade nuevas capacidades:

- Nuevos tipos (`dictamen.ts`)
- Nuevas server actions (`emitir-dictamen.ts`, `entregar-dictamen.ts`)
- Nuevos componentes UI (`DictamenView.tsx`, `EntregarDictamenButton.tsx`)
- Nueva migración SQL (añade columna `dictamen` al expediente)

---

## 4. Impacto sobre el dominio (DDD)

### 4.1 ¿Nuevo Aggregate Root?

**NO.** No se crea un nuevo Aggregate Root. El dictamen es un **Value Object** dentro del agregado **Expediente**, siguiendo el mismo patrón que el diagnóstico.

**Justificación (según §9.3 y §9.4):**
- **Reutilización**: El expediente ya contiene el diagnóstico. El dictamen es una transformación del mismo.
- **Composición**: No necesita componer otros agregados. Solo lee del expediente.
- **Extensión controlada**: Añadir una columna JSONB `dictamen` al expediente es extensión controlada.

### 4.2 ¿Nuevo Bounded Context?

**NO.** El dictamen pertenece al mismo Bounded Context que el expediente y el diagnóstico: **Contexto de Expediente**.

### 4.3 Machine de estados extendida

El expediente añade un nuevo estado intermedio:

```
Actual (S1-T01):
  SinDiagnostico → Borrador → Completado

Nuevo (S1-T02):
  SinDiagnostico → Borrador → Completado → DictamenEmitido → DictamenEntregado
                                            ↑ nuevo          ↑ nuevo
```

**Transiciones:**
| Desde | Hasta | Acción | Quién |
|-------|-------|--------|-------|
| `Completado` | `DictamenEmitido` | AT emite dictamen formal | AT |
| `DictamenEmitido` | `DictamenEntregado` | Sistema entrega resultado | Sistema |
| `DictamenEntregado` | `Cerrado` (futuro) | AT cierra expediente | AT/Admin |

### 4.4 Reglas de negocio

Las siguientes reglas se definen en el dominio y se implementarán en las Server Actions:

1. **Solo se puede emitir dictamen si el diagnóstico está `Completado`**
2. **Un dictamen emitido nunca se modifica**. Si es necesario corregirlo o reemplazarlo, se emitirá un nuevo dictamen conservando la trazabilidad del anterior.
3. **La entrega solo puede ocurrir tras la emisión**
4. **El cliente solo ve el dictamen tras la entrega** (no antes)
5. **El AT ve el dictamen inmediatamente tras emitirlo** (previsualización)
6. **La emisión requiere que el AT esté autenticado y sea el asignado al expediente**
7. **El cliente solo ve el dictamen de sus propios expedientes** (RLS)
8. **El dictamen es un documento derivado que incorpora un `diagnostico_base` inmutable sobre el que Certilab emite la decisión técnica oficial**. Modificaciones posteriores del diagnóstico no alteran el dictamen ya emitido.

---

## 5. Aggregate Roots y entidades afectadas

### 5.1 Mapa de impacto

| Aggregate Root | Entidad | Tipo de impacto | Descripción |
|---------------|---------|-----------------|-------------|
| **Expediente** | `Expediente` | **Modificación** | Nuevo campo `dictamen`, nueva transición de estado |
| **Expediente** | `DiagnosticoCompleto` | **Lectura** | S1-T02 lee el diagnóstico para generar el dictamen |
| **Documento IA** | `DocumentoIA` | **Lectura** | (Opcional) Referencia a documentos originales del cliente |
| **Usuario** | `Usuario` (AT) | **Lectura** | Verificación de rol y asignación |
| **Cliente** | `Cliente` | **Lectura** | Identificación del cliente para la entrega |

### 5.2 No se crean nuevos agregados

Confirmación explícita: **CERO** nuevos Aggregate Roots. El dictamen es un Value Object dentro de Expediente.

---

## 6. Casos de uso nuevos o modificados

### 6.1 Nuevos casos de uso

| ID | Caso de uso | Descripción | Actor |
|----|-------------|-------------|-------|
| UC-01 | **Emitir Dictamen** | El AT genera el dictamen formal desde el diagnóstico completado | AT |
| UC-02 | **Visualizar Dictamen** | El AT previsualiza el dictamen antes de entregar | AT |
| UC-03 | **Entregar Dictamen** | El sistema pone el dictamen a disposición del cliente | Sistema |
| UC-04 | **Consultar Dictamen** | El cliente ve el dictamen de su expediente | Cliente |
| UC-05 | **Descargar Dictamen** | (Futuro) El cliente descarga el dictamen en PDF | Cliente |

### 6.2 Casos de uso modificados

| ID | Caso de uso | Cambio |
|----|-------------|--------|
| UC-S1-T01-03 | **Completar Diagnóstico** | Ahora también permite la transición a `DictamenEmitido` (nuevo botón en UI) |
| UC-EP031 | **Revisar PITR** | Flujo existente: el AT sigue el mismo proceso, pero al completar diagnóstico aparece la opción de emitir dictamen |

### 6.3 Matriz de autorización

| Caso de uso | AT | Cliente | Admin |
|-------------|----|---------|-------|
| Emitir Dictamen | ✅ (asignado) | ❌ | ✅ |
| Visualizar Dictamen (pre-entrega) | ✅ (asignado) | ❌ | ✅ |
| Entregar Dictamen | ✅ (asignado) | ❌ | ✅ |
| Consultar Dictamen (post-entrega) | ✅ | ✅ (propio) | ✅ |
| Descargar Dictamen (futuro) | ✅ | ✅ (propio) | ✅ |

---

## 7. Impacto sobre la base de datos

### 7.1 Migración de base de datos

**Filosofía:** Mínima expansión. Se añade una columna mediante migración SQL, sin crear nuevas tablas.

**Decisión arquitectónica (validada):**
- Se mantiene el agregado `Expediente`.
- No se crean tablas nuevas.
- Se añade una columna `dictamen` JSONB mediante una migración SQL (ALTER TABLE ADD COLUMN).
- No se crean nuevos Aggregate Roots ni Bounded Contexts.
- La migración es mínima y no destructiva: añade una columna nullable a `core.expediente`.

> **Nota:** Añadir una columna `dictamen` JSONB a `core.expediente` **requiere una migración de base de datos**. Toda modificación del esquema existente debe ejecutarse mediante una migración SQL versionada.

#### 7.1.1 Nueva columna en `core.expediente`

```sql
ALTER TABLE core.expediente 
ADD COLUMN dictamen JSONB;

COMMENT ON COLUMN core.expediente.dictamen IS 
  'Dictamen técnico formal generado desde el diagnóstico. 
   Value Object inmutable tras emisión. 
   Estructura definida en DictamenTecnico (TypeScript).';
```

#### 7.1.2 Nuevo estado en ENUM

```sql
-- Si el ENUM estado_expediente se gestiona como tipo
-- Añadir: 'DictamenEmitido', 'DictamenEntregado'
-- Si no, la transición se maneja en aplicación
```

**Decisión arquitectónica:** Revisar si los estados se gestionan como ENUM SQL o como string en aplicación. Si es ENUM, requiere ALTER TYPE. Si es string, solo aplicación.

#### 7.1.3 Índice (opcional)

```sql
-- Opcional: índice para filtrar expedientes con dictamen emitido
CREATE INDEX idx_expediente_dictamen_emitido 
ON core.expediente (id) 
WHERE dictamen IS NOT NULL;
```

### 7.2 No se requieren tablas nuevas

**CERO** tablas nuevas. Todo se almacena dentro del expediente existente.

### 7.3 RLS

Las políticas RLS existentes en `core.expediente` son suficientes:

```sql
-- Ya existe: cliente solo ve sus expedientes
CREATE POLICY "Cliente ve solo sus expedientes" 
ON core.expediente FOR SELECT
USING (cliente_id IN (SELECT id FROM core.cliente WHERE user_id = auth.uid()));
```

No se requieren nuevas políticas RLS para el dictamen.

---

## 8. APIs, Server Actions y contratos

### 8.1 Nuevo tipo: `dictamen.ts`

```typescript
// src/types/core/dictamen.ts

export type EstadoDictamen = 'NoEmitido' | 'Emitido' | 'Entregado';

/**
 * DictamenTecnico — Documento derivado del diagnóstico.
 * 
 * Es un Value Object inmutable dentro del agregado Expediente.
 * Se genera por transformación del DiagnosticoCompleto en el momento de la emisión.
 * 
 * Contiene dos partes:
 *   1. diagnostico_base: base inmutable del diagnóstico en el momento de la emisión.
 *   2. Metadatos de emisión, entrega y versionado.
 * 
 * Regla de dominio: Un dictamen emitido nunca se modifica.
 */
export interface DictamenTecnico {
  // Base inmutable extraída del diagnóstico completo (S1-T01)
  diagnostico_base: {
    veredicto: VeredictoGlobal;
    nivel_confianza: NivelConfianza;
    resumen_ejecutivo: string;
    certificado_original: {
      letra_detectada: string;   // A-G
      registro_oficial: string;
      fecha_emision: string;
      organismo_emisor?: string;
    };
    problemas: Array<{
      nombre: string;
      categoria: CategoriaProblema;
      descripcion: string;
      impacto: string;
      nivel_confianza: NivelConfianza;
    }>;
    actuaciones: Array<{
      nombre: string;
      descripcion: string;
      inversion_estimada?: number;
      ahorro_estimado?: number;
      retorno_inversion?: number;
      veredicto: VeredictoRetorno;
    }>;
  };

  // Metadatos de emisión
  emitido_por: string;        // userId del AT
  emitido_en: string;         // ISO timestamp
  version: number;            // Versionado (1, 2, ...)

  // Estado de entrega (populado tras entregar al cliente)
  entregado_a?: string;        // cliente_id
  entregado_en?: string;       // ISO timestamp
}
```

### 8.2 Server Actions

#### `src/lib/actions/emitir-dictamen.ts`

```typescript
'use server';

export async function emitirDictamen(
  expedienteId: string
): Promise<ActionResult<DictamenTecnico>>;

// Validaciones:
// - AT autenticado
// - AT asignado al expediente
// - Diagnóstico en estado Completado
// - Dictamen no emitido previamente

// Flujo:
// 1. Leer expediente con diagnóstico
// 2. Validar estado (debe ser Completado)
// 3. Construir DictamenTecnico desde DiagnosticoCompleto
// 4. Validar que el dictamen sea coherente
// 5. Persistir en expediente.dictamen
// 6. Transitar expediente a DictamenEmitido
// 7. Registrar evento DICTAMEN_EMITIDO
// 8. Devolver DictamenTecnico
```

#### `src/lib/actions/entregar-dictamen.ts`

```typescript
'use server';

export async function entregarDictamen(
  expedienteId: string
): Promise<ActionResult<{ entregado: boolean }>>;

// Validaciones:
// - AT autenticado
// - Dictamen en estado Emitido
// - No entregado previamente

// Flujo:
// 1. Validar estado (debe ser DictamenEmitido)
// 2. Marcar dictamen como entregado (fecha, cliente)
// 3. Transitar expediente a DictamenEntregado
// 4. Registrar evento DICTAMEN_ENTREGADO
```

#### `src/lib/actions/obtener-dictamen.ts`

```typescript
'use server';

export async function obtenerDictamen(
  expedienteId: string
): Promise<ActionResult<DictamenTecnico | null>>;

// Comportamiento:
// - AT ve dictamen inmediatamente tras emisión
// - Cliente ve dictamen solo si estado = DictamenEntregado
```

### 8.3 API Routes (ninguna nueva)

No se requieren nuevas API routes. Todo se maneja mediante Server Actions.

---

## 9. Componentes UI implicados

### 9.1 Nuevos componentes

| Componente | Ruta propuesta | Propósito |
|------------|---------------|-----------|
| `DictamenView.tsx` | `src/components/expedientes/DictamenView.tsx` | Vista de lectura del dictamen (versión AT y cliente) |
| `EmitirDictamenButton.tsx` | `src/components/expedientes/EmitirDictamenButton.tsx` | Botón "Emitir dictamen" con confirmación |
| `EntregarDictamenButton.tsx` | `src/components/expedientes/EntregarDictamenButton.tsx` | Botón "Entregar al cliente" con confirmación |
| `DictamenStatusBadge.tsx` | `src/components/expedientes/DictamenStatusBadge.tsx` | Badge indicando estado del dictamen |

### 9.2 Componentes modificados

| Componente | Cambio |
|------------|--------|
| `src/app/(plataforma)/at/expedientes/[id]/page.tsx` | Añadir sección de dictamen tras el diagnóstico completado |
| `src/app/(plataforma)/expedientes/[id]/page.tsx` | Añadir sección de dictamen para el cliente (post-entrega) |
| `AsistenteDecisionTecnica.tsx` | Añadir botón "Emitir dictamen" en paso final tras completar diagnóstico |

### 9.3 Mockups funcionales

#### Vista AT (post-emisión)
```
┌─────────────────────────────────────────────┐
│  🏠 Expediente #1234  ·  Dictamen Emitido   │
│  ─────────────────────────────────────────── │
│                                              │
│  📋 DICTAMEN TÉCNICO                        │
│                                              │
│  Veredicto:  🟡 REGULAR                      │
│  Confianza:  🔵 ALTO                        │
│                                              │
│  Resumen ejecutivo:                          │
│  ┌────────────────────────────────────────┐  │
│  │ El certificado presenta discrepancias  │  │
│  │ en el cálculo de la envolvente...      │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Problemas detectados (3):                   │
│  ┌────────────────────────────────────────┐  │
│  │ 🟠 1. Aislamiento fachada insuficiente│  │
│  │ 🔴 2. Puentes térmicos no calculados  │  │
│  │ 🟡 3. Rendimiento caldera incorrecto  │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  [🔙 Volver]        [📨 Entregar al cliente] │
└─────────────────────────────────────────────┘
```

#### Vista Cliente (post-entrega)
```
┌─────────────────────────────────────────────┐
│  📋 Resultado de tu expediente #1234        │
│  ─────────────────────────────────────────── │
│                                              │
│  ✅ Dictamen entregado el 09/07/2026        │
│                                              │
│  Veredicto:  🟡 REGULAR                      │
│                                              │
│  Resumen:                                    │
│  Se ha revisado tu certificado energético    │
│  y se han detectado algunas discrepancias.   │
│                                              │
│  [📥 Descargar informe completo]  (futuro)   │
└─────────────────────────────────────────────┘
```

---

## 10. Riesgos técnicos y funcionales

### 10.1 Matriz de riesgos

| # | Riesgo | Tipo | Prob. | Impacto | Mitigación |
|---|--------|------|-------|---------|-----------|
| R1 | **Datos incompletos en diagnóstico** al generar dictamen | Funcional | Media | Alto | Validación estricta en `emitirDictamen()`: verificar que todos los campos requeridos existen |
| R2 | **AT emite dictamen sin haber completado el diagnóstico** | Funcional | Baja | Crítico | Server Action valida estado = `Completado`. UI deshabilita botón hasta diagnóstico completo |
| R3 | **Cliente ve dictamen antes de entrega** | Seguridad | Baja | Crítico | RLS impide SELECT si estado < `DictamenEntregado`. Server Action filtra por rol |
| R4 | **Dos ATs emiten dictamen simultáneamente** | Concurrencia | Baja | Medio | Versionado optimista (`updated_at`). Segundo intento da error: "Dictamen ya emitido" |
| R5 | **Dictamen muy grande (>100KB JSONB)** | Rendimiento | Baja | Bajo | Límite de 50 problemas + 20 actuaciones en validación. Diagnóstico suele ser <10KB |
| R6 | **Inconsistencia si diagnóstico se modifica tras emisión** | Integridad | Media | Alto | El dictamen incorpora un **diagnostico_base inmutable**. No referencia, incorpora. |
| R7 | **AT no asignado al expediente intenta emitir** | Seguridad | Baja | Alto | Server Action verifica `at_asignado_id === userId`. |
| R8 | **Entrega falla por error de BD** | Técnico | Baja | Medio | Transacción atómica: si falla la entrega, el dictamen sigue en `Emitido`. Retry. |

### 10.2 Decisión: Inmutabilidad del dictamen

**Decisión:** El dictamen es un **documento derivado que incorpora un diagnostico_base inmutable** sobre el que se emite la decisión técnica oficial.

**Razón:** Si el AT modifica el diagnóstico tras emitir el dictamen, el cliente vería un dictamen diferente al que el AT aprobó. Esto rompe la integridad del proceso.

**Implementación:**
```typescript
// En emitirDictamen():
const dictamen: DictamenTecnico = {
  diagnostico_base: diagnostico,  // Base inmutable del diagnóstico
  emitido_por: userId,
  emitido_en: new Date().toISOString(),
  version: 1,
};
// Se almacena como JSONB independiente del diagnóstico
// Modificaciones posteriores al diagnóstico NO afectan al dictamen
```

---

## 11. Impacto transversal sobre la arquitectura

### 11.1 Capas afectadas

| Capa | Impacto | Descripción |
|------|---------|-------------|
| **Tipos (types/)** | Añadir | Nuevo archivo `types/core/dictamen.ts` |
| **Server Actions (lib/actions/)** | Añadir | 3 nuevas server actions: `emitir-dictamen.ts`, `entregar-dictamen.ts`, `obtener-dictamen.ts` |
| **Repository (lib/core/)** | Modificar ligero | ExpedienteRepository可能需要 nuevo método `updateDictamen()` |
| **UI Componentes** | Añadir | 4 nuevos componentes de presentación |
| **Páginas** | Modificar | Página de detalle de expediente (AT y cliente) |
| **BD** | Modificar | 1 nueva columna + posible extensión ENUM |
| **Eventos** | Añadir | 2 nuevos tipos de evento: `DICTAMEN_EMITIDO`, `DICTAMEN_ENTREGADO` |

### 11.2 Dependencias

```
S1-T02
  ├── S1-T01 (diagnóstico completado) — REQUERIDO
  ├── Core V1 — Expediente (estados, eventos)
  ├── Core V1 — Usuario (autenticación, roles)
  ├── Componentes UI existentes (Badge, Button, Card)
  └── (Futuro) PDF generation engine — OPCIONAL
```

### 11.3 No hay impacto en:

- ❌ Autenticación (middleware, auth)
- ❌ Cliente (Core V1)
- ❌ Inmueble (Core V1)
- ❌ Documento IA (Core V1)
- ❌ Motor PITR
- ❌ Sistema de pagos
- ❌ n8n workflows
- ❌ Observatorio
- ❌ SEO / páginas públicas

---

## 12. Compatibilidad con gobernanza

### 12.1 AGENTS.md

| Regla | Verificación |
|-------|-------------|
| **§3 Architecture Freeze** | ✅ No modifica ningún elemento congelado. No afecta a Constitución, DDD, Clean Architecture, Aggregate Roots, Bounded Contexts, modelo de datos core, Single Tenant, Soft Delete, Optimistic Locking, RLS. |
| **§8 MVP Discipline** | ✅ No introduce CQRS, Event Sourcing, Microservicios, Multi Tenant, Event Bus, reestructuración completa ni refactorizaciones masivas. |
| **§9 Product-First** | ✅ Añade capacidad funcional visible (el cliente recibe el dictamen). Reutiliza el Core existente. Mínima expansión (1 columna JSONB, 0 tablas nuevas, 0 agregados nuevos). |
| **§9.3 Reutilización del Core** | ✅ El dictamen se almacena en el expediente existente. No se crean nuevos componentes estructurales. |
| **§9.4 Mínima expansión** | ✅ Demostrado que es extensión controlada sobre Expediente. No se necesitan nuevos agregados. |
| **§10 EPIC WORKFLOW** | ✅ Se seguirá el flujo completo: Diseño → Implementación → Tests → Build → Auditoría → Informe → Aprobación → Commit → Tag |
| **§11 NO OVERENGINEERING** | ✅ Solución simple y directa. JSONB en expediente, server actions, componentes simples. Sin abstracciones innecesarias. |
| **§12 AI EXECUTION POLICY** | ✅ Capacidad verificada. Diseño dentro de límites del modelo. |

### 12.2 ADRs

| ADR | Compatibilidad |
|-----|---------------|
| **ADR-001** (Engineering System) | ✅ Compatible. TypeScript, Next.js, Server Actions, Vitest. |
| **ADR-002** (Auto-Entrega MVP) | ✅ Compatible. La entrega del dictamen es manual (AT decide cuándo entregar). No requiere automatización. |
| **ADR-003** (GTD) | ✅ Compatible. No afecta a la línea de negocio GTD. |
| **ADR-004** (Extensión Documento IA GTD) | ✅ Compatible. No afecta a Documento IA. |

### 12.3 CKB (Knowledge Base)

| Documento | Compatibilidad |
|-----------|---------------|
| **CKB-INDEX.md** | ✅ Sin conflictos |
| **CKB-GUIDE.md** | ✅ Sin conflictos |
| **CKB-EVOLUTION.md** | ✅ Sin conflictos |
| **CKB-001 (Simplified Proposal)** | ✅ Consolidación completada. S1-T02 no requiere cambios en CKB. |

### 12.4 Core V1

| Componente | Estado | Compatibilidad |
|------------|--------|---------------|
| Cliente (EP-024) | ✅ Congelado | Sin impacto |
| Inmueble (EP-025) | ✅ Congelado | Sin impacto |
| Expediente (EP-026) | ✅ Congelado | **Extensión controlada**: nueva columna, nuevos estados. NO modifica existente. |
| Documento IA (EP-027) | ✅ Congelado | Sin impacto |
| Motor PITR (EP-031) | ✅ Completado | Sin impacto |
| Entrega Resultado (EP-032) | 🔲 Pendiente | S1-T02 es PRECURSOR de EP-032 |
| Correcciones (EP-033) | 🔲 Pendiente | Sin impacto |

### 12.5 Auditoría arquitectónica (§10.2)

Checklist de verificación previa al cierre:

- [ ] El código respeta los Aggregate Roots definidos en CF-022 → ✅ No se crean nuevos
- [ ] No se introducen nuevas dependencias entre Bounded Contexts no autorizadas → ✅ Ninguna
- [ ] No se modifica el modelo de datos sin ADR → ✅ Una columna JSONB, no requiere ADR
- [ ] No se introducen patrones prohibidos por MVP DISCIPLINE → ✅ Ninguno
- [ ] Solución de menor complejidad posible → ✅ Demostrado en §2.3
- [ ] No hay duplicación de lógica que deba estar en el Core existente → ✅ Toda la lógica es nueva y específica

---

## 13. Modelo de dominio extendido

### 13.1 Diagrama de entidades (textual)

```
┌──────────────────────────────────────────────────────┐
│                    EXPEDIENTE                         │
│                                                        │
│  ┌─────────────────────┐   ┌──────────────────────┐   │
│  │   Diagnóstico        │   │    Dictamen           │   │
│  │   (JSONB)            │   │    (JSONB)            │   │
│  │                      │   │                        │   │
│  │  - Veredicto         │──▶│  - Veredicto (base)   │   │
│  │  - Confianza         │   │  - Confianza (base)   │   │
│  │  - Problemas         │   │  - Problemas (base)   │   │
│  │  - Actuaciones       │   │  - Actuaciones (base) │   │
│  │  - Resumen           │   │  - Resumen (base)     │   │
│  │                      │   │  - Emitido_por         │   │
│  │                      │   │  - Emitido_en          │   │
│  │  Estado: Completado  │   │  - Version             │   │
│  │                      │   │  - Entregado_a         │   │
│  │                      │   │  - Entregado_en        │   │
│  │                      │   │                        │   │
│  │                      │   │  Estado: Emitido/      │   │
│  │                      │   │  Entregado             │   │
│  └─────────────────────┘   └──────────────────────┘   │
│                                                        │
│  Estado_expediente: ... → Completado → DictamenEmitido │
│                              → DictamenEntregado       │
└──────────────────────────────────────────────────────┘
```

### 13.2 Eventos de dominio

```typescript
// Nuevos eventos
interface DICTAMEN_EMITIDO {
  type: 'DICTAMEN_EMITIDO';
  expedienteId: string;
  emitidoPor: string;
  emitidoEn: string;
  version: number;
}

interface DICTAMEN_ENTREGADO {
  type: 'DICTAMEN_ENTREGADO';
  expedienteId: string;
  entregadoPor: string;
  entregadoEn: string;
  clienteId: string;
}
```

### 13.3 Valué Objects compartidos

Los Value Objects del diagnóstico se reutilizan sin cambios:

- `VeredictoGlobal`: "Buena" | "Regular" | "Mejorable" | "Deficiente"
- `NivelConfianza`: "Alto" | "Medio" | "Bajo"
- `CategoriaProblema`: "critico" | "importante" | "mejora"
- `VeredictoRetorno`: "merece" | "valoralo" | "no_recomendado"

---

## 14. Flujo funcional completo

### 14.1 Diagrama de flujo

```
┌────────────────────────────────────────────────────────────┐
│                   FLUJO S1-T01 + S1-T02                     │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  [AT revisa expediente asignado]                            │
│         │                                                   │
│         ▼                                                   │
│  [AT completa diagnóstico en ADT (S1-T01)]                  │
│         │                                                   │
│         ▼                                                   │
│  ✅ Diagnóstico: COMPLETADO                                │
│         │                                                   │
│         ▼                                                   │
│  [AT revisa resumen del diagnóstico]                        │
│         │                                                   │
│         ▼                                                   │
│  ┌─── ¿AT confirma? ───┐                                    │
│  │                      │                                   │
│  │  SÍ                  │  NO → [AT vuelve a editar]        │
│  │                      │                                   │
│  ▼                      ▼                                   │
│  [AT pulsa "Emitir dictamen"]                               │
│         │                                                   │
│         ▼                                                   │
│  [Sistema valida: diagnóstico completo]                     │
│         │                                                   │
│         ▼                                                   │
│  [Sistema genera DictamenTecnico desde Diagnostico]         │
│         │                                                   │
│         ▼                                                   │
│  [Sistema persiste dictamen + transita estado]              │
│         │                                                   │
│         ▼                                                   │
│  ✅ Dictamen: EMITIDO                                      │
│         │                                                   │
│         ▼                                                   │
│  [AT visualiza dictamen emitido]                            │
│         │                                                   │
│         ▼                                                   │
│  ┌─── ¿AT entrega? ────┐                                    │
│  │                      │                                   │
│  │  SÍ                  │  NO → [AT puede esperar]          │
│  │                      │                                   │
│  ▼                      ▼                                   │
│  [AT pulsa "Entregar al cliente"]                           │
│         │                                                   │
│         ▼                                                   │
│  [Sistema marca dictamen como entregado]                    │
│         │                                                   │
│         ▼                                                   │
│  ✅ Dictamen: ENTREGADO                                    │
│         │                                                   │
│         ▼                                                   │
│  [Cliente ve dictamen en su dashboard]                      │
│         │                                                   │
│         ▼                                                   │
│  (Futuro: AT cierra expediente → CERRADO)                  │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### 14.2 Transiciones de estado del expediente (actualizado)

```
Solicitud → PteDocumentacion → DocumentacionCompleta → PtePago
    → PtePITR → PITRCompletado → PteRevision → EnRevision
    → Completado → DictamenEmitido → DictamenEntregado → Cerrado
                                        ↑ S1-T02      ↑ futuro
                   ↑ EP-026 existente
```

---

## 15. Estrategia de implementación por fases

### 15.1 Fase 1 — Core (dictamen types + server actions)

**Estimación:** 3h  
**Entrega:** Servidor funcional, sin UI

| Paso | Tarea | Archivos |
|------|-------|----------|
| 1.1 | Definir tipo `DictamenTecnico` | `src/types/core/dictamen.ts` |
| 1.2 | Implementar `emitirDictamen()` | `src/lib/actions/emitir-dictamen.ts` |
| 1.3 | Implementar `entregarDictamen()` | `src/lib/actions/entregar-dictamen.ts` |
| 1.4 | Implementar `obtenerDictamen()` | `src/lib/actions/obtener-dictamen.ts` |
| 1.5 | Tests unitarios de server actions | `src/lib/actions/__tests__/dictamen.test.ts` |
| 1.6 | Migración SQL: columna `dictamen` | `supabase/migrations/20260711_00001_add_dictamen.sql` |

### 15.2 Fase 2 — UI AT (backoffice)

**Estimación:** 3h  
**Entrega:** AT puede emitir y entregar dictamen

| Paso | Tarea | Archivos |
|------|-------|----------|
| 2.1 | Componente `DictamenView` (vista AT) | `src/components/expedientes/DictamenView.tsx` |
| 2.2 | Componente `EmitirDictamenButton` | `src/components/expedientes/EmitirDictamenButton.tsx` |
| 2.3 | Componente `EntregarDictamenButton` | `src/components/expedientes/EntregarDictamenButton.tsx` |
| 2.4 | Modificar página detalle AT | `src/app/(plataforma)/at/expedientes/[id]/page.tsx` |
| 2.5 | Integrar botón en ADT (paso final) | `AsistenteDecisionTecnica.tsx` |
| 2.6 | Tests de componentes | `src/components/expedientes/__tests__/DictamenView.test.tsx` |

### 15.3 Fase 3 — UI Cliente (plataforma)

**Estimación:** 2h  
**Entrega:** Cliente puede ver dictamen entregado

| Paso | Tarea | Archivos |
|------|-------|----------|
| 3.1 | Componente `DictamenView` (vista cliente, modo lectura) | Reutilizar componente Fase 2.1 con mode="cliente" |
| 3.2 | Modificar página detalle expediente cliente | `src/app/(plataforma)/expedientes/[id]/page.tsx` |
| 3.3 | Badge de estado del dictamen | `DictamenStatusBadge.tsx` |

### 15.4 Fase 4 — Cierre

**Estimación:** 2h  
**Entrega:** Build, tests, auditoría

| Paso | Tarea |
|------|-------|
| 4.1 | Build completo (TypeScript + lint) |
| 4.2 | Tests de integración (flujo completo) |
| 4.3 | Auditoría arquitectónica específica |
| 4.4 | Informe de cierre |
| 4.5 | Aprobación del usuario |

### 15.5 Resumen de estimación

| Fase | Horas | ¿Bloqueante? |
|------|-------|-------------|
| Fase 1 — Core | 3h | Sí |
| Fase 2 — UI AT | 3h | Sí |
| Fase 3 — UI Cliente | 2h | Sí |
| Fase 4 — Cierre | 2h | Sí |
| **Total** | **10h** | |

---

## APROBACIÓN

| Rol | Aprobación | Fecha |
|-----|-----------|-------|
| **Arquitecto** | ⏳ Pendiente | — |
| **Product Owner** | ⏳ Pendiente | — |
| **Revisor** | ⏳ Pendiente | — |

---

## ANEXO A: Preguntas obligatorias respondidas (Product-First §9.5)

| # | Pregunta | Respuesta |
|---|----------|-----------|
| 1 | **¿Qué capacidad funcional añade al MVP?** | Transformar el diagnóstico técnico del AT en un dictamen formal que el cliente puede consultar en su dashboard. Es la primera vez que el cliente recibe un output tangible. |
| 2 | **¿Qué agregados participan?** | Expediente (contiene y gestiona el dictamen). No se requieren otros agregados. |
| 3 | **¿Cómo interactúan entre sí?** | El dictamen se genera desde el diagnóstico (mismo agregado). No hay interacción entre agregados para este caso de uso. |
| 4 | **¿Por qué es la solución de menor complejidad?** | Porque reutiliza el expediente existente, almacena el dictamen como JSONB (sin tablas nuevas), y no crea nuevos agregados. La alternativa (nuevo agregado Dictamen, nueva tabla, nuevo servicio) añadiría complejidad sin valor adicional. |

---

## ANEXO B: Clasificación V2

Las siguientes mejoras se clasifican como V2 según §9.6:

- Generación de PDF del dictamen (post-MVP)
- Firma digital del cliente
- Notificaciones email automáticas al entregar
- Histórico de versiones del dictamen
- Correcciones/re-versiones del dictamen
- Descarga masiva de dictámenes

---

## ANEXO C: Glosario

| Término | Definición |
|---------|-----------|
| **ADT** | Asistente de Decisión Técnica (S1-T01) |
| **AT** | Arquitecto Técnico (revisor) |
| **Dictamen** | Documento formal que resume el diagnóstico técnico |
| **Diagnóstico** | Datos capturados por el AT durante la revisión |
| **Entrega** | Acción de poner el dictamen a disposición del cliente |
| **Emisión** | Acción de generar el dictamen formal desde el diagnóstico |

---

*Fin del documento — Pendiente de aprobación para iniciar implementación*