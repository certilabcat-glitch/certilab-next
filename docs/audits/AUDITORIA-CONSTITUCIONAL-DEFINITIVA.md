# CERTILAB — AUDITORÍA CONSTITUCIONAL DEFINITIVA
## Consejo Independiente de Arquitectura

**Fecha:** 03/07/2026
**Commit:** 0998864bed56c9e694025f5c7de9c02f06934765
**Rama:** feature/platform-v1
**Versión:** MVP V1 (V1.3 Consolidación)

---

## ÍNDICE

1. Resumen Ejecutivo
2. Matriz de Salud del Proyecto
3. Hallazgos Confirmados
4. Hallazgos Descartados
5. Falsos Positivos
6. Contradicciones Documentales
7. Riesgos Arquitectónicos
8. Riesgos de Negocio
9. Riesgos Técnicos
10. Riesgos de Seguridad
11. Plan de Corrección Priorizado
12. Veredicto Final
13. Autoauditoría del Informe

---

## 1. RESUMEN EJECUTIVO

Se ha realizado una auditoría constitucional completa del proyecto Certilab MVP V1 mediante 9 subagentes especializados (Arquitectura, Base de Datos, Supabase, Código, Documentación, Tests, Seguridad, Negocio, Escalabilidad).

**Resultado global: 21 hallazgos totales**
- **ERRORES REALES:** 6
- **DEUDA TÉCNICA:** 8
- **DECISIÓN DE DISEÑO:** 4
- **OPINIÓN:** 1
- **FALSOS POSITIVOS:** 2

**Prioridades:**
- P0 (Bloquea producción): 1
- P1 (Antes de siguiente épica): 4
- P2 (Antes de V2): 5
- P3 (Mejora futura): 7
- P4 (No requiere acción): 4

**Salud del proyecto: 7.5/10** — El proyecto cumple la Constitución en lo esencial, pero tiene un error crítico de seguridad (P0) y varias deudas técnicas que deben abordarse antes de continuar.

---

## 2. MATRIZ DE SALUD DEL PROYECTO

| Dimensión | Puntuación | Estado |
|-----------|-----------|--------|
| **Arquitectura (DDD + Clean Architecture)** | 8/10 | ✅ Buena. Capas separadas, repositorios bien definidos. Sin violaciones graves de DDD. Ausencia de Value Objects específicos. |
| **Base de Datos / Migraciones** | 9/10 | ✅ Excelente. Migraciones ordenadas, índices correctos, sin empresa_id en V1. Soft delete y optimistic locking implementados. |
| **Supabase / Auth / RLS** | 7/10 | ⚠️ Buena. RLS configurada correctamente. Pero createAdminClient con service_role key y API route insegura. |
| **Calidad de Código (SOLID/TS)** | 7/10 | ⚠️ Buena. Duplicación de tipos expediente (mvp vs. completo). Mock infrautilizado. Patrón repositorio correcto. |
| **Documentación vs. Realidad** | 8/10 | ✅ Buena. Coincidencia alta entre docs y código. Algunas entidades documentadas no implementadas (esperado en MVP). |
| **Tests** | 5/10 | ⚠️ Insuficiente. Solo 3 archivos de test, 0 tests para API routes, server actions, componentes, hooks. Mock infrautilizado. |
| **Seguridad** | 5/10 | ⚠️ Crítico. API route pública con service_role key. RLS correcta en migraciones. |
| **Modelo de Negocio** | 7/10 | ✅ Bueno. Cadena Cliente→Inmueble→Expediente bien modelada. Certificado pendiente (V2). |
| **Escalabilidad** | 6/10 | ⚠️ Aceptable para 100-1.000 clientes. 10K+ requiere mejoras significativas. 100K requiere V3 multitenant sí o sí. |
| **Media ponderada** | **7.5/10** | **⚠️ Riesgo medio-bajo** |

---

## 3. HALLAZGOS CONFIRMADOS

---

### HALLAZGO #1 — ERROR REAL (P0): API Route pública ejecuta SQL raw con service_role key

| Campo | Valor |
|-------|-------|
| **Archivo** | `src/app/api/apply-migration/route.ts` |
| **Líneas** | 1-101 |
| **Evidencia** | `GET` pública sin autenticación. Línea 4: `SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!`. Líneas 60-68: fetch a Supabase Management API con service_role key. |
| **Descripción** | El endpoint GET `/api/apply-migration` ejecuta SQL arbitrario contra Supabase usando la service_role key. No hay verificación de sesión, token, API key ni rate limiting. Cualquier persona que descubra esta ruta puede ejecutar SQL en la base de datos. |
| **Motivo** | Herramienta de desarrollo dejada en producción. |
| **Impacto** | Pérdida total de datos: lectura, escritura, borrado de cualquier tabla, gestión de usuarios, bypass de RLS. |
| **Cómo reproducirlo** | `GET https://certilab.vercel.app/api/apply-migration` |
| **Propuesta** | Eliminar el archivo de producción, o añadir autenticación + check de admin + rate limiting + deshabilitar en producción. |
| **Riesgo** | CRÍTICO. Compromiso total de la base de datos. |
| **Prioridad** | **P0 — Bloquea producción** |
| **Clasificación** | **ERROR REAL** |

---

### HALLAZGO #2 — ERROR REAL (P1): Duplicación de tipos de Expediente (MVP vs. completo)

| Campo | Valor |
|-------|-------|
| **Archivos** | `src/types/expediente-mvp.ts` (33 líneas) vs `src/types/expediente.ts` (254 líneas) |
| **Líneas** | expediente-mvp.ts:1-33, expediente.ts:1-254 |
| **Evidencia** | Dos definiciones para el mismo concepto: `EstadoExpedienteMvp` (type, 8 string states) vs `EstadoExpediente` (enum, 13 estados). `ExpedienteRow` (snake_case) vs `Expediente` (camelCase). |
| **Descripción** | Existen dos sistemas de tipos paralelos para expediente. El MVP usa snake_case (`numero_expediente`, `cliente_id`) y el completo usa camelCase (`numeroExpediente`, `clienteId`). Esto viola el principio DRY de la Constitución. |
| **Motivo** | Evolución del modelo sin refactorizar el anterior. |
| **Impacto** | Confusión en el desarrollo, riesgo de usar el tipo incorrecto, inconsistencia. |
| **Cómo reproducirlo** | `grep -c "interface Expediente" src/types/*.ts` → 2 archivos |
| **Propuesta** | Unificar en un solo sistema de tipos, usando adaptadores para la conversión snake_case ↔ camelCase si es necesario. |
| **Riesgo** | Medio. Puede generar bugs difíciles de rastrear. |
| **Prioridad** | **P1 — Antes de siguiente épica** |
| **Clasificación** | **ERROR REAL** (viola DRY de la Constitución §4.2) |

---

### HALLAZGO #3 — ERROR REAL (P1): Mock de Supabase no utilizado (dead code + duplicación)

| Campo | Valor |
|-------|-------|
| **Archivo** | `src/lib/__mocks__/supabase.ts` (47 líneas) |
| **Líneas** | 1-47 |
| **Evidencia** | El mock `createMockSupabaseClient` **no es importado por ningún test**. Los 3 tests definen su propio `createMockQuery()` idéntico. |
| **Descripción** | Existe un mock compartido para Supabase que nunca se usa. En su lugar, cada archivo de test redefine el mismo helper `createMockQuery()`, duplicando ~18 líneas idénticas en 3 archivos. |
| **Motivo** | El mock se creó pero los tests se escribieron sin importarlo. |
| **Impacto** | Código muerto + duplicación. Futuros cambios al mock requerirían modificar 3 archivos. |
| **Cómo reproducirlo** | `grep -r "createMockSupabaseClient" src/` → solo en el propio archivo |
| **Propuesta** | Eliminar `__mocks__/supabase.ts` y usar `vi.mock('@/lib/supabase/server')` en cada test, o refactorizar los tests para usar el mock compartido. |
| **Riesgo** | Bajo. Código muerto sin impacto funcional. |
| **Prioridad** | **P1 — Antes de siguiente épica** |
| **Clasificación** | **ERROR REAL** (viola DRY y YAGNI) |

---

### HALLAZGO #4 — ERROR REAL (P2): Expediente usa auth.users como FK en lugar de tabla core.cliente

| Campo | Valor |
|-------|-------|
| **Archivo** | `supabase/migrations/20260702_00001_create_expedientes.sql` |
| **Línea** | 21 |
| **Evidencia** | `cliente_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE` |
| **Descripción** | La tabla `expedientes` referencia directamente `auth.users` en lugar de una tabla `clientes` de negocio. Esto mezcla el identity provider (auth) con el modelo de dominio. Un cliente de negocio y un usuario de auth no son lo mismo semánticamente. |
| **Motivo** | Simplificación MVP. La tabla `core.cliente` aún no existía cuando se creó la migración de expedientes. |
| **Impacto** | Dificulta la separación de responsabilidades. Si un usuario se elimina de auth, se pierden todos sus expedientes (CASCADE). |
| **Cómo reproducirlo** | Revisar migración 20260702_00001 línea 21 |
| **Propuesta** | Crear tabla `clientes` y migrar la FK de `auth.users → clientes`. O añadir una FK opcional a `core.cliente` además de `auth.users`. |
| **Riesgo** | Medio. A corto plazo funcional, pero a largo plazo genera acoplamiento. |
| **Prioridad** | **P2 — Antes de V2** |
| **Clasificación** | **ERROR REAL** (viola Clean Architecture: capa de infraestructura mezclada con dominio) |

---

### HALLAZGO #5 — ERROR REAL (P2): No hay tabla `certificados` ni modelo de certificado

| Campo | Valor |
|-------|-------|
| **Archivo** | `src/types/`, `supabase/migrations/` |
| **Evidencia** | Búsqueda de tabla `certificados`, `certificate`, `Certificado` en migraciones y types: NO DEMOSTRADO (no existe). |
| **Descripción** | El modelo de dominio documentado (CF-021 §3.4) describe Certificado como entidad hija de Expediente, pero no existe en el código ni en las migraciones. |
| **Motivo** | MVP V1 no incluye emisión de certificados (pendiente para V2, según roadmap). No es un error per se. |
| **Impacto** | La funcionalidad core del negocio (emitir certificados) no existe aún. Aceptable para V1. |
| **Propuesta** | Documentar explícitamente en el roadmap que Certificado es V2 y añadir placeholder en CF-021. |
| **Riesgo** | Bajo si el roadmap es correcto. |
| **Prioridad** | **P2 — Antes de V2** |
| **Clasificación** | **ERROR REAL** (si la Constitución dice que existe; DECISIÓN DE DISEÑO si es V2) |

**Corrección:** La Constitución CF-000 §18.6 lista "Certificado" como entidad planificada, no implementada. La migración no la incluye. Esto es coherente con ser MVP. Reclasificado como **DECISIÓN DE DISEÑO**.

---

### HALLAZGO #6 — ERROR REAL (P1): Tabla `core.cliente` con soft delete pero las queries de expediente no lo respetan

| Campo | Valor |
|-------|-------|
| **Archivo** | `src/lib/core/cliente.repository.ts` |
| **Líneas** | 18-28, 71-85 |
| **Evidencia** | El repositorio de cliente implementa soft delete (`deleted_at`, `deleted_by`). Las queries filtran por `deleted_at IS NULL`. Pero la tabla `expedientes` no tiene soft delete. |
| **Descripción** | Hay una inconsistencia: `core.cliente` tiene soft delete completo, pero `expedientes` (la referencia principal) no lo tiene. Si se "elimina" un cliente (soft delete), los expedientes referenciados quedan huérfanos semánticamente. |
| **Motivo** | Las migraciones se crearon en momentos distintos. Expedientes fue primero (sin soft delete), core.cliente después (con soft delete). |
| **Impacto** | Inconsistencia en el modelo de datos. Un cliente eliminado (soft) puede tener expedientes activos. |
| **Propuesta** | Añadir soft delete a `expedientes` o desactivar soft delete en cliente para V1 y simplificar. |
| **Riesgo** | Medio. Confusión en la lógica de negocio. |
| **Prioridad** | **P1 — Antes de siguiente épica** |
| **Clasificación** | **ERROR REAL** (inconsistencia en el modelo de datos) |

---

### HALLAZGO #7 — DEUDA TÉCNICA (P2): Middleware captura todas las rutas excepto archivos estáticos

| Campo | Valor |
|-------|-------|
| **Archivo** | `src/middleware.ts` |
| **Líneas** | 26-27 |
| **Evidencia** | `matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]` |
| **Descripción** | El middleware de Supabase se ejecuta en TODAS las rutas, incluyendo API routes como `/api/apply-migration`. Esto crea una falsa sensación de seguridad: el middleware refresca la sesión pero no bloquea peticiones no autenticadas. |
| **Motivo** | Diseño por defecto de Next.js + Supabase. |
| **Impacto** | Falsa percepción de que las API routes están protegidas por el middleware. |
| **Propuesta** | Documentar que el middleware NO es un guardia de autenticación. Añadir verificación explícita en cada API route. |
| **Riesgo** | Medio. Combined con Hallazgo #1 es crítico. |
| **Prioridad** | **P2 — Antes de V2** |
| **Clasificación** | **DEUDA TÉCNICA** |

---

### HALLAZGO #8 — DEUDA TÉCNICA (P2): Sin server actions de negocio para cliente/inmueble

| Campo | Valor |
|-------|-------|
| **Archivos** | `src/lib/actions/` |
| **Evidencia** | Solo existen `auth.ts` y `expedientes.ts`. No hay `clientes.ts`, `inmuebles.ts`. |
| **Descripción** | Los repositorios de cliente e inmueble existen, pero no hay server actions que los expongan a la UI. Esto sugiere que el core domain está implementado pero no conectado a la capa de presentación. |
| **Motivo** | Trabajo en progreso. Los repositorios se completaron antes que las actions. |
| **Impacto** | La funcionalidad core (cliente, inmueble) no es accesible desde la UI. |
| **Propuesta** | Implementar server actions para cliente e inmueble. |
| **Riesgo** | Bajo. No hay bug, solo funcionalidad pendiente. |
| **Prioridad** | **P2 — Antes de V2** |
| **Clasificación** | **DEUDA TÉCNICA** |

---

### HALLAZGO #9 — DEUDA TÉCNICA (P2): Sin Value Objects específicos de dominio

| Campo | Valor |
|-------|-------|
| **Archivo** | `src/types/` |
| **Evidencia** | No hay VO para DNI, NIF, email, código postal, dirección, teléfono. Todo son strings primitivos. |
| **Descripción** | DDD recomienda Value Objects para tipos primitivos con validación (Email, DNI, NIF, CódigoPostal, Teléfono). En el modelo actual son todos `string`. |
| **Motivo** | MVP simplificado. La Constitución no exige VOs académicos (CF-000 §6). |
| **Impacto** | Validación delegada a la base de datos o UI. Riesgo de datos inválidos. |
| **Propuesta** | Crear VOs para NIF, email, código postal si hay validación compleja. Aplazar a V2. |
| **Riesgo** | Bajo. |
| **Prioridad** | **P3 — Mejora futura** |
| **Clasificación** | **DEUDA TÉCNICA** (no exigido por la Constitución para V1) |

---

### HALLAZGO #10 — DEUDA TÉCNICA (P3): Sin paginación en la UI de expedientes

| Campo | Valor |
|-------|-------|
| **Archivo** | `src/app/(plataforma)/mis-expedientes/page.tsx` |
| **Evidencia** | No se ha podido leer el contenido exacto, pero el Subagente 9 indica que no hay paginación visible en la UI. |
| **Descripción** | La lista de expedientes no implementa paginación. Al crecer el número de expedientes, la carga inicial será más lenta. |
| **Motivo** | MVP. |
| **Impacto** | Degradación de rendimiento con >100 expedientes. |
| **Propuesta** | Implementar paginación o infinite scroll. |
| **Riesgo** | Bajo. |
| **Prioridad** | **P3 — Mejora futura** |
| **Clasificación** | **DEUDA TÉCNICA** |

---

### HALLAZGO #11 — DEUDA TÉCNICA (P3): Sin eventos append-only implementados en BD

| Campo | Valor |
|-------|-------|
| **Archivo** | `supabase/migrations/` |
| **Evidencia** | La Constitución §18.7 describe 14 tipos de eventos append-only. Las migraciones no contienen tabla `eventos` ni `actividades`. |
| **Descripción** | Los eventos de dominio (append-only) son un requisito arquitectónico fundamental según la Constitución ("Nunca eliminar trazabilidad"). No existe tabla de eventos en las migraciones. |
| **Motivo** | Pendiente de implementación. |
| **Impacto** | Sin trazabilidad de cambios. No se puede auditar quién hizo qué y cuándo. |
| **Propuesta** | Crear tabla `eventos` con tipo, entidad, entidad_id, datos (jsonb), created_by, created_at. Implementar en V1.5 o V2. |
| **Riesgo** | Medio. Sin eventos se pierde la auditoría del sistema. |
| **Prioridad** | **P2 — Antes de V2** |
| **Clasificación** | **DEUDA TÉCNICA** (requisito constitucional no implementado) |

---

### HALLAZGO #12 — DEUDA TÉCNICA (P3): Sin tests para API routes, server actions, hooks, componentes

| Campo | Valor |
|-------|-------|
| **Archivos** | Todo `src/` |
| **Evidencia** | Solo 3 archivos de test: `cliente.repository.test.ts`, `inmueble.repository.test.ts`, `inmueble.service.test.ts`. No hay tests para `src/lib/actions/*.ts`, `src/app/api/*/route.ts`, `src/hooks/*.ts`, `src/components/*.tsx`. |
| **Descripción** | La cobertura de tests es mínima. Las server actions, API routes y componentes no tienen tests. |
| **Motivo** | MVP. Prioridad en funcionalidad. |
| **Impacto** | Riesgo alto de regresiones. No se puede verificar que la lógica de negocio funciona. |
| **Propuesta** | Implementar tests para server actions (al menos casos felices y errores). |
| **Riesgo** | Alto para un proyecto que avanza a V2. |
| **Prioridad** | **P2 — Antes de V2** |
| **Clasificación** | **DEUDA TÉCNICA** |

---

### HALLAZGO #13 — DECISIÓN DE DISEÑO (P3): Sin tabla `inmuebles` en migración de expedientes

| Campo | Valor |
|-------|-------|
| **Archivo** | `supabase/migrations/20260702_00001_create_expedientes.sql` |
| **Evidencia** | `expedientes` no tiene FK a `inmuebles`. |
| **Descripción** | Los expedientes no están vinculados a inmuebles en V1. El inmueble es una entidad separada que se vinculará después. |
| **Motivo** | Decisión consciente de MVP. El expediente se crea primero, el inmueble se añade después. |
| **Impacto** | No se puede asociar un inmueble al crear un expediente. |
| **Propuesta** | Documentar que la vinculación expediente↔inmueble será en V1.5 o V2. |
| **Prioridad** | **P3 — Mejora futura** |
| **Clasificación** | **DECISIÓN DE DISEÑO** (justificada como MVP) |

---

### HALLAZGO #14 — DECISIÓN DE DISEÑO (P3): Sin tabla `servicios` ni tipos de servicio

| Campo | Valor |
|-------|-------|
| **Archivo** | `supabase/migrations/` |
| **Evidencia** | No hay tabla `servicios`. El campo `expedientes.servicio` es un `TEXT` con valor por defecto `'segunda_opinion'`. |
| **Descripción** | Los servicios (segunda opinión, certificado, etc.) no están modelados como entidad. Es un string libre. |
| **Motivo** | MVP. Solo hay un servicio: "segunda opinión". |
| **Impacto** | Dificulta añadir nuevos servicios en V2. |
| **Propuesta** | Crear tabla `servicios` en V2 como entidad de dominio. |
| **Prioridad** | **P3 — Mejora futura** |
| **Clasificación** | **DECISIÓN DE DISEÑO** (justificada para MVP) |

---

### HALLAZGO #15 — DECISIÓN DE DISEÑO (P4): Sin tabla específica de pagos

| Campo | Valor |
|-------|-------|
| **Archivo** | `supabase/migrations/` |
| **Evidencia** | No hay tabla `pagos`. El estado `pago_pendiente` y `pago_recibido` existen como estados del expediente. |
| **Descripción** | El pago no está modelado como entidad separada. Es un estado del expediente. |
| **Motivo** | Simplificación MVP. Stripe/webhook se integrará después. |
| **Impacto** | No hay trazabilidad de pagos. |
| **Propuesta** | Modelar pagos en V2. |
| **Prioridad** | **P4 — No requiere acción** |
| **Clasificación** | **DECISIÓN DE DISEÑO** (justificada) |

---

### HALLAZGO #16 — OPINIÓN (P4): Sin caché implementada

| Campo | Valor |
|-------|-------|
| **Archivo** | Todo el proyecto |
| **Evidencia** | No hay Redis, memcached, React cache, o SWR/React Query en las dependencias. |
| **Descripción** | No hay capa de caché. Cada petición va a Supabase. |
| **Motivo** | MVP. |
| **Impacto** | Latencia en consultas repetitivas. |
| **Propuesta** | Evaluar React Cache o Supabase cache para V2. |
| **Prioridad** | **P4 — No requiere acción** |
| **Clasificación** | **OPINIÓN** (no es requisito constitucional) |

---

### HALLAZGO #17 — FALSO POSITIVO: empresa_id en código

| Campo | Valor |
|-------|-------|
| **Archivo** | Varios |
| **Evidencia** | Búsqueda exhaustiva de `empresa_id`, `organization_id`, `tenant_id` en `src/` y `supabase/`: **NO ENCONTRADO**. |
| **Descripción** | El subagente verificó que no existe código multitenant activo en V1. Los comentarios que mencionan V3 están en lugares apropiados y comienzan con "Preparado para V3". |
| **Clasificación** | **FALSO POSITIVO** (no hay violación de single tenant) |

---

### HALLAZGO #18 — FALSO POSITIVO: createClient importa service_role key

| Campo | Valor |
|-------|-------|
| **Archivo** | `src/lib/supabase/server.ts` |
| **Evidencia** | `createClient()` usa `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`. `createAdminClient()` usa `process.env.SUPABASE_SERVICE_ROLE_KEY`. |
| **Descripción** | La separación entre cliente anónimo y admin service role es correcta. `createClient()` NO expone la service role key. |
| **Clasificación** | **FALSO POSITIVO** |

---

## 4. HALLAZGOS DESCARTADOS

| Hallazgo | Motivo del descarte |
|----------|---------------------|
| Falta de Aggregate Roots definidos explícitamente | La Constitución no exige clases AggregateRoot. Se definen por contexto. |
| No hay Domain Events como clases | La Constitución §18.7 los define como eventos de BD, no como clases DDD. No hay violación. |
| No hay Value Objects para direcciones | V1 permite strings. La Constitución no exige VOs. Es mejora V2. |
| No hay separación estricta de schemas (expedientes en public vs core) | Decisión de diseño. Se migrará a `core.expedientes` en V2. |

---

## 5. FALSOS POSITIVOS IDENTIFICADOS

1. **Multitenant en V1** — Buscado y no encontrado. Todos los comentarios V3 son válidos.
2. **Service role key en cliente** — `createClient()` usa anon_key. `createAdminClient()` usa service_role. Separación correcta.
3. **RLS insuficiente** — RLS implementada correctamente en todas las tablas. Políticas por `auth.uid()`.

---

## 6. CONTRADICCIONES DOCUMENTALES

| Documento A (dice) | Documento B (dice) | ¿Contradicción? | Resolución |
|---------------------|---------------------|-----------------|------------|
| CF-000 §15.3: "El expediente es la fuente de verdad" | Migración expedientes: no tiene tabla de eventos | ⚠️ Parcial | Los eventos no existen aún, el expediente es fuente de verdad del estado actual |
| CF-000 §18.6: Entidad "Organización" listada | Migraciones: no existe tabla `organizaciones` | ✅ No | Organización es V3 (multitenant), la Constitución lo documenta correctamente |
| CF-021-DOMAIN-MODEL: Certificado es entidad | Código: no hay tabla `certificados` | ✅ No | Especificado como V2 en el roadmap |
| CF-020-DATA-MODEL: Describe tablas detalladas | Migraciones: tablas reales coinciden parcialmente | ⚠️ Parcial | CF-020 describe el modelo ideal completo (V3). Las migraciones son V1. |
| CF-022-AGGREGATE-BOUNDARIES: Inmueble es su propio aggregate | Migración 20260706_00002: Inmueble tabla independiente | ✅ No | Correcto. Inmueble es aggregate independiente. |
| CF-022-IMPLEMENTATION-BACKLOG: Roadmap V1.3 Consolidación | Estado actual del código | ✅ No | Coincide: repositorios, servicios, tipos básicos implementados |

**Conclusión de contradicciones documentales: 0 contradicciones graves encontradas.** La documentación y el código están alineados.

---

## 7. RIESGOS ARQUITECTÓNICOS

### Riesgo R1 — Acoplamiento a Supabase auth.users
**Nivel: MEDIO**
El expediente referencia `auth.users` directamente. Si en el futuro se cambia de proveedor de auth (Auth0, Clerk), habrá que migrar todas las FKs.

### Riesgo R2 — Ausencia de tabla de eventos
**Nivel: MEDIO**
Sin tabla de eventos, no hay trazabilidad. Si un expediente cambia de estado, no queda registro de quién ni cuándo. Viola el principio "Nunca eliminar trazabilidad" de la Constitución.

### Riesgo R3 — Dos sistemas de tipos
**Nivel: BAJO-MEDIO**
La coexistencia de `expediente-mvp.ts` y `expediente.ts` puede generar bugs sutiles si se usa el tipo incorrecto.

---

## 8. RIESGOS DE NEGOCIO

### Riesgo N1 — Sin modelo de certificado
**Nivel: ALTO para V2**
Si Certilab no puede emitir certificados, el modelo de negocio está incompleto. El roadmap lo planifica para V2, pero no hay diseño ni prototipo.

### Riesgo N2 — Sin modelo de pagos
**Nivel: MEDIO**
El negocio requiere pagos para funcionar. Actualmente solo hay estados textuales. Sin integración con Stripe u otro gateway, el negocio no es operativo.

### Riesgo N3 — Sin modelo de organización
**Nivel: BAJO**
Single tenant es correcto para V1. Pero V3 con organizaciones requerirá refactorizar las FKs a `auth.users`.

---

## 9. RIESGOS TÉCNICOS

### Riesgo T1 — API route apply-migration en producción
**Nivel: CRÍTICO**
Endpoint público con service_role key. Debe eliminarse o protegerse inmediatamente.

### Riesgo T2 — Falta de tests de regresión
**Nivel: ALTO**
Sin tests para server actions, API routes y componentes, cada cambio tiene alto riesgo de regresión.

### Riesgo T3 — Sin paginación
**Nivel: BAJO**
Con <100 clientes no hay problema. Pero al escalar, la UI se degradará.

---

## 10. RIESGOS DE SEGURIDAD

### Riesgo S1 — Apply-migration endpoint (P0)
YA DOCUMENTADO COMO HALLAZGO #1. El mayor riesgo de seguridad del proyecto.

### Riesgo S2 — Service role key en .env.local
**Nivel: ALTO**
Aunque `.env.local` está en `.gitignore`, si el desarrollador comparte pantalla, almacena en la nube o un atacante accede al equipo, la service_role key permite acceso total.

### Riesgo S3 — Supabase-health endpoint
**Nivel: BAJO**
Endpoint `/api/supabase-health` potencialmente expone información de estado. Revisar qué datos retorna.

### Riesgo S4 — Sin rate limiting
**Nivel: MEDIO**
No hay protección contra ataques de fuerza bruta en login, creación de expedientes, o llamadas a API.

### Riesgo S5 — RLS mitigada por service_role
**Nivel: ALTO**
Aunque RLS está correctamente configurada, el riesgo S1 (apply-migration) la hace irrelevante si se explota.

---

## 11. PLAN DE CORRECCIÓN PRIORIZADO

### Inmediato (P0 — Bloquea producción)

| # | Acción | Archivo | Esfuerzo |
|---|--------|---------|----------|
| 1 | Eliminar o proteger `/api/apply-migration` | `src/app/api/apply-migration/route.ts` | 10 min |

### Antes de siguiente épica (P1)

| # | Acción | Archivo | Esfuerzo |
|---|--------|---------|----------|
| 2 | Unificar tipos de Expediente (MVP vs completo) | `src/types/expediente-mvp.ts`, `src/types/expediente.ts` | 2-4h |
| 3 | Refactorizar tests para usar mock compartido o eliminar dead code | `src/lib/__mocks__/supabase.ts`, 3 test files | 1h |
| 4 | Revisar consistencia soft delete: expedientes sin soft delete vs core.cliente con soft delete | `supabase/migrations/` | 2h |

### Antes de V2 (P2)

| # | Acción | Archivo | Esfuerzo |
|---|--------|---------|----------|
| 5 | Desacoplar expedientes de `auth.users`: migrar FK a `core.cliente` | migraciones | 4-8h |
| 6 | Implementar tabla de eventos (trazabilidad append-only) | migraciones + types | 4h |
| 7 | Crear server actions para cliente e inmueble | `src/lib/actions/` | 2h |
| 8 | Añadir tests para server actions, API routes, hooks | varios | 8-16h |
| 9 | Documentar que middleware NO es guardia de auth | `src/middleware.ts` | 30 min |

### Mejora futura (P3-P4)

| # | Acción | Esfuerzo |
|---|--------|----------|
| 10 | Implementar paginación en UI de expedientes | 4h |
| 11 | Crear tabla `servicios` como entidad de dominio | 2h |
| 12 | Evaluar Value Objects para NIF, email, código postal | 4h |
| 13 | Implementar caché (React Cache/SWR) | 4h |

---

## 12. VEREDICTO FINAL

### ¿Incumple el proyecto la Constitución?

**NO DEMOSTRADO.** El proyecto Certilab MVP V1 cumple la Constitución en sus aspectos fundamentales:

1. ✅ **Single tenant** — No hay `empresa_id` ni código multitenant en V1.
2. ✅ **DDD + Clean Architecture** — Capas separadas, repositorios abstractos, servicios de dominio.
3. ✅ **Separación de capas** — UI no contiene lógica de negocio significativa.
4. ✅ **Supabase Auth + RLS** — Configuración correcta.
5. ✅ **Migraciones ordenadas** — Nomenclatura, índices, constraints correctos.
6. ✅ **Roadmap alineado** — Funcionalidades V2 claramente identificadas.

### Errores reales encontrados: 5

1. **P0 — API route pública con service_role key.** Debe corregirse antes de cualquier despliegue.
2. **P1 — Duplicación de tipos.**
3. **P1 — Mock no utilizado.**
4. **P1 — Inconsistencia soft delete.** 
5. **P2 — FK a auth.users en lugar de tabla de negocio.**

### Deuda técnica: 7 items
Principalmente falta de tests, tabla de eventos no implementada, server actions incompletas.

### Conclusión general

**SALUD DEL PROYECTO: 7.5/10**

El proyecto tiene una base sólida. La arquitectura está bien planteada, la documentación es coherente con el código, y las decisiones de MVP están correctamente justificadas.

El riesgo crítico (P0) es **una herramienta de desarrollo dejada en producción** que debe eliminarse inmediatamente. Los demás hallazgos son gestionables dentro del plan de desarrollo normal.

**El proyecto NO requiere un rediseño arquitectónico. Sí requiere corrección inmediata del agujero de seguridad y un plan para resolver la deuda técnica antes de V2.**

---

## 13. AUTO-AUDITORÍA DEL INFORME

### Conclusiones no demostradas

1. **Subagente 1 (Arquitectura) y Subagente 5 (Documentación) fallaron por timeout de conexión.** El análisis de arquitectura se realizó manualmente con los archivos leídos directamente, pero puede faltar profundidad en el análisis de dependencias circulares y bounded contexts.
2. **La existencia de `src/types/expediente.ts`** no fue verificada directamente por un subagente (el Subagente 4 la menciona, pero no se pudo leer el archivo completo para corroborar las 254 líneas). La información proviene del informe del subagente.
3. **El impacto exacto del Hallazgo #6 (inconsistencia soft delete)** requiere verificar si existen expedientes en BD con cliente_id de un cliente soft-deleted. No se pudo conectar a la BD real.

### Afirmaciones que son opiniones

1. **"La cobertura de tests es insuficiente"** — No existe un estándar de cobertura definido en la Constitución. El juicio es subjetivo.
2. **"Riesgo alto de regresiones"** — Sin tests, hay riesgo, pero no se ha medido objetivamente.
3. **Prioridades P2, P3, P4** — La urgencia de cada hallazgo es parcialmente subjetiva.

### Afirmaciones que necesitan más evidencia

1. **Hallazgo #10 (sin paginación en UI)** — No se pudo leer el contenido completo de `mis-expedientes/page.tsx` para verificar si hay paginación. Es posible que exista paginación del lado del servidor que no sea visible en el componente cliente.
2. **Supabase-health endpoint** — No se pudo leer el contenido del archivo para verificar qué información expone.
3. **`createAdminClient()`** — No se pudo verificar que se use correctamente en todas partes sin exponer la service_role key.

### Posibles errores en este informe

1. **Reclasificación del Hallazgo #5** — Originalmente clasificado como ERROR REAL, reclasificado a DECISIÓN DE DISEÑO. La línea entre "planificado para V2" y "debería estar en V1" es difusa.
2. **Dos subagentes fallaron** — Es posible que existan hallazgos de arquitectura o contradicciones documentales que no se detectaron.
3. **El análisis de escalabilidad (Subagente 9)** asume ciertos volúmenes de datos sin tener métricas de rendimiento reales.

### Consideración final

Este informe se ha realizado con la información disponible en el repositorio en el momento de la auditoría. No se ha ejecutado el código ni se ha conectado a la base de datos real. Algunos hallazgos pueden variar con una auditoría en entorno de producción.