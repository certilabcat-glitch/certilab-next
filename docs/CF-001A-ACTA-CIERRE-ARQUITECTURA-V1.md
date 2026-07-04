# CERTILAB — ACTA DE CIERRE DE ARQUITECTURA V1

## CF-001A — Arquitectura V1 Congelada

---

## 1. ACTA DE APROBACIÓN

| Campo | Valor |
|-------|-------|
| **Fecha** | 03/07/2026 |
| **Versión** | MVP V1 (V1.3 Consolidación) |
| **Commit** | 0998864bed56c9e694025f5c7de9c02f06934765 |
| **Auditoría** | Auditoría Constitucional Definitiva |
| **Consejo de Arquitectura** | Consejo Independiente de Arquitectura |

### Estado

**ARQUITECTURA V1 APROBADA**

El Consejo Independiente de Arquitectura, tras completar la Auditoría Constitucional Definitiva del proyecto Certilab MVP V1, emite el siguiente veredicto:

- ✅ Arquitectura aprobada
- ✅ DDD conforme
- ✅ Modelo de datos conforme
- ✅ Cliente aprobado
- ✅ Inmueble aprobado
- ✅ Single Tenant aprobado
- ✅ Sin necesidad de rediseño
- ✅ Puede comenzar la siguiente épica

**Salud del proyecto: 7.5/10** — Base sólida, arquitectura bien planteada, documentación coherente con el código, decisiones MVP correctamente justificadas.

---

## 2. DECISIONES CONGELADAS

A partir de la fecha de esta acta, las siguientes decisiones arquitectónicas quedan **congeladas** y **no podrán volver a debatirse** durante el desarrollo del MVP V1:

| # | Decisión | Tipo | Justificación |
|---|----------|------|---------------|
| 1 | **Constitución** | Fundacional | CF-000-PROJECT-BRAIN. Marco normativo del proyecto. No se modifica sin ADR. |
| 2 | **Single Tenant** | Arquitectónico | V1 opera con un único inquilino. No hay `empresa_id`, `organization_id` ni `tenant_id` en el código. |
| 3 | **Multitenancy únicamente en V3** | Roadmap | La descomposición multitenant se abordará exclusivamente en V3 según el roadmap. |
| 4 | **Domain Driven Design** | Metodológico | El dominio es el corazón del proyecto. Las entidades, agregados y servicios siguen DDD táctico. |
| 5 | **Clean Architecture** | Estructural | Separación en capas: dominio, aplicación, infraestructura, presentación. |
| 6 | **Vertical Slice** | Organizacional | Las épicas se desarrollan en vertical (end-to-end), no en capas horizontales. |
| 7 | **Aggregate Root Cliente** | Modelo | `core.cliente` es Aggregate Root con soft delete y optimistic locking. |
| 8 | **Aggregate Root Inmueble** | Modelo | `core.inmueble` es Aggregate Root independiente con su propio repositorio y servicio. |
| 9 | **Soft Delete** | Persistencia | Ninguna entidad de negocio se elimina físicamente. Se marca con `deleted_at` y `deleted_by`. |
| 10 | **Optimistic Locking** | Concurrencia | Control de concurrencia mediante `updated_at` y verificación en escritura. |
| 11 | **RLS mediante auth.uid()** | Seguridad | Row Level Security de Supabase con políticas basadas en `auth.uid()`. |
| 12 | **Supabase** | Infraestructura | Backend como servicio: PostgreSQL, Auth, Storage, RLS. |
| 13 | **Next.js** | Framework | Framework de frontend con App Router, Server Components y Server Actions. |
| 14 | **TypeScript** | Lenguaje | Tipado estático en toda la base de código. |

> **Nota:** Estas decisiones no podrán ser cuestionadas, reabiertas ni modificadas durante el desarrollo de V1, salvo que concurra alguna de las excepciones definidas en el Principio de Estabilidad (sección 3).

---

## 3. PRINCIPIO DE ESTABILIDAD

> **"Ninguna decisión arquitectónica podrá modificarse durante V1 salvo evidencia objetiva de incumplimiento de la Constitución o aparición de un riesgo crítico para producción."**

### Ámbito de aplicación

Este principio aplica a todas las decisiones enumeradas en la sección 2 y a cualquier decisión arquitectónica implícita derivada de ellas.

### Excepciones permitidas

Únicamente las siguientes circunstancias justifican la modificación de una decisión congelada:

1. **Incumplimiento constitucional** — Evidencia objetiva y demostrable de que una decisión arquitectónica viola lo establecido en la Constitución (CF-000).
2. **Riesgo crítico para producción** — Amenaza inminente para la seguridad, integridad de datos o continuidad del servicio que no pueda resolverse dentro del marco arquitectónico actual.
3. **Bloqueo funcional** — Imposibilidad técnica de implementar una funcionalidad requerida sin modificar la arquitectura.

### Procedimiento

Toda excepción requerirá:

1. Documentación del problema y la evidencia
2. Evaluación de alternativas
3. Aprobación mediante ADR (Architecture Decision Record)
4. Ratificación del Consejo de Arquitectura

---

## 4. QUÉ NO VOLVERÁ A AUDITARSE

Los siguientes temas han sido auditados, aprobados y quedan **cerrados permanentemente** para V1:

| Tema | Estado | Resolución |
|------|--------|------------|
| **DDD** | ✅ Aprobado | Capas separadas, repositorios bien definidos. Sin violaciones graves de DDD. |
| **Arquitectura** | ✅ Aprobada | Clean Architecture + Vertical Slice. 8/10 en auditoría. |
| **Cliente** | ✅ Aprobado | Aggregate Root implementado con repositorio, servicio y tests. |
| **Inmueble** | ✅ Aprobado | Aggregate Root implementado con repositorio, servicio y tests. |
| **Single Tenant** | ✅ Aprobado | Sin código multitenant en V1. Todos los comentarios V3 son válidos y planificados. |
| **Modelo de datos** | ✅ Aprobado | Migraciones ordenadas, índices correctos, sin `empresa_id` en V1. 9/10 en auditoría. |
| **Ownership** | ✅ Aprobado | Propiedad de datos mediante `auth.uid()` y RLS. |
| **Aggregate Roots** | ✅ Aprobados | Cliente e Inmueble definidos como Aggregate Roots independientes. |
| **Bounded Contexts** | ✅ Aprobados | Contextos delimitados correctamente identificados y documentados. |

> Ninguno de estos temas podrá ser objeto de nuevas auditorías, revisiones o debates durante el desarrollo de V1.

---

## 5. QUÉ SÍ PODRÁ AUDITARSE

Durante V1, las auditorías se limitarán exclusivamente a:

| Ámbito | Descripción |
|--------|-------------|
| **Nuevas épicas** | Auditoría de nuevas funcionalidades al ser incorporadas al producto. |
| **Bugs** | Corrección de errores y verificación de su resolución. |
| **Seguridad** | Identificación y mitigación de vulnerabilidades. |
| **Rendimiento** | Métricas de rendimiento, latencia y escalabilidad. |
| **Deuda técnica** | Reducción planificada de la deuda técnica identificada en la auditoría. |
| **Calidad del código** | Cobertura de tests, tipos, linter, buenas prácticas. |
| **Cumplimiento de la Constitución** | Verificación continua de que el código y las decisiones respetan la Constitución. |

### Deuda técnica priorizada para auditoría

Los siguientes items de deuda técnica identificados en la Auditoría Constitucional Definitiva serán objeto de seguimiento:

| Prioridad | Ítem | Estado inicial |
|-----------|------|----------------|
| P0 | API route pública con service_role key (apply-migration) | 🔴 Pendiente |
| P1 | Duplicación de tipos de Expediente (MVP vs completo) | 🔴 Pendiente |
| P1 | Mock de Supabase no utilizado (dead code) | 🔴 Pendiente |
| P1 | Inconsistencia soft delete: expedientes sin soft delete | 🔴 Pendiente |
| P2 | FK a `auth.users` en lugar de tabla de negocio | 🟡 Planificado |
| P2 | Sin tabla de eventos (trazabilidad append-only) | 🟡 Planificado |
| P2 | Sin server actions para cliente e inmueble | 🟡 Planificado |

---

## 6. PROCEDIMIENTO PARA CAMBIAR LA ARQUITECTURA

Cualquier cambio sobre las decisiones arquitectónicas congeladas deberá realizarse mediante una **ADR (Architecture Decision Record)**.

### Requisitos mínimos de una ADR

Toda ADR deberá incluir obligatoriamente:

| Elemento | Descripción |
|----------|-------------|
| **Problema** | Descripción clara del problema que motiva el cambio arquitectónico. |
| **Evidencia** | Datos objetivos que demuestren la necesidad del cambio (métricas, logs, informes, etc.). |
| **Alternativas** | Al menos dos alternativas evaluadas, con sus pros y contras. |
| **Impacto** | Análisis del impacto en el código existente, base de datos, rendimiento y seguridad. |
| **Compatibilidad** | Evaluación de la compatibilidad hacia atrás y plan de migración. |
| **Aprobación** | Firma del Consejo de Arquitectura o responsable designado. |

### Flujo de aprobación

```
[Problema identificado]
        ↓
[Documentación de ADR]
        ↓
[Revisión del Consejo de Arquitectura]
        ↓
[Aprobación] → [Implementación del cambio]
        ↓
[Rechazo]    → [Archivo de la ADR como decisión no adoptada]
```

### Archivo de ADRs

Las ADRs se almacenarán en `docs/architecture/` con nomenclatura `ADR-XXX-titulo-breve.md`.

---

## 7. RIESGOS ACEPTADOS

Se registra expresamente la siguiente deuda técnica aceptada para V1. **Ninguno de estos items constituye un error arquitectónico.** Son decisiones conscientes, documentadas y aplazadas dentro del plan de desarrollo.

### Deuda técnica aceptada

| # | Deuda | Justificación | Plan de resolución |
|---|-------|---------------|-------------------|
| 1 | API route apply-migration con service_role key | Herramienta de desarrollo dejada en producción. **P0 — Corregir inmediatamente.** | Eliminar o proteger con autenticación + rate limiting. |
| 2 | Duplicación de tipos Expediente (MVP vs completo) | Evolución del modelo sin refactorizar el anterior. | Unificar en un solo sistema de tipos antes de la siguiente épica. |
| 3 | Mock de Supabase no utilizado | Mock creado pero tests escritos sin importarlo. | Refactorizar tests para usar mock compartido o eliminar el archivo. |
| 4 | Inconsistencia soft delete (expedientes sin soft delete) | Migraciones creadas en momentos distintos. | Añadir soft delete a expedientes o simplificar modelo. |
| 5 | FK a `auth.users` en lugar de `core.cliente` | Simplificación MVP. La tabla `core.cliente` no existía cuando se creó la migración de expedientes. | Migrar FK a `core.cliente` antes de V2. |
| 6 | Sin tabla de eventos (trazabilidad append-only) | Pendiente de implementación. | Crear tabla `eventos` en V1.5 o V2. |
| 7 | Sin Value Objects (NIF, email, código postal, etc.) | MVP simplificado. La Constitución no exige VOs académicos para V1. | Evaluar creación en V2 si hay validación compleja. |
| 8 | Sin paginación en UI de expedientes | MVP. | Implementar paginación o infinite scroll para V2. |
| 9 | Sin tests para API routes, server actions, hooks, componentes | Prioridad en funcionalidad durante MVP. | Implementar tests antes de V2. |
| 10 | Sin caché | MVP. | Evaluar React Cache o Supabase cache para V2. |

### Declaración

> Los riesgos enumerados en esta sección son **deuda técnica aceptada**, no errores arquitectónicos.
>
> La arquitectura del núcleo de Certilab (DDD, Clean Architecture, Single Tenant, modelo de datos, Aggregate Roots, RLS) ha sido auditada, aprobada y queda congelada.
>
> La existencia de esta deuda técnica no invalida ni debilita las decisiones arquitectónicas aprobadas. Su resolución está planificada dentro del roadmap del producto.

---

## 8. ACTA FINAL

La Auditoría Constitucional Definitiva ha concluido con el siguiente resultado:

- **5 errores reales** encontrados (1 P0, 3 P1, 1 P2)
- **7 items de deuda técnica** identificados
- **0 contradicciones graves** entre documentación y código
- **0 violaciones constitucionales** demostradas

El Consejo Independiente de Arquitectura, tras revisar la totalidad del proyecto, declara:

---

**La arquitectura del núcleo de Certilab queda oficialmente congelada para el desarrollo del MVP V1.**

**Las siguientes épicas deberán centrarse exclusivamente en la evolución funcional del producto.**

**No se autoriza ningún rediseño arquitectónico salvo aprobación expresa mediante ADR.**

---

| Rol | Responsable | Firma |
|-----|-------------|-------|
| **Consejo Independiente de Arquitectura** | Auditoría Constitucional Definitiva | ✅ Aprobado |
| **Arquitecto Técnico** | Custodio de la Arquitectura | ✅ Conforme |
| **Producto** | Evolución funcional del MVP V1 | ✅ Notificado |

**Documentos relacionados:**
- CF-000-PROJECT-BRAIN.md — Constitución del proyecto
- CF-001-SESSION-PROTOCOL.md — Protocolo de sesión
- AUDITORIA-CONSTITUCIONAL-DEFINITIVA.md — Informe de auditoría completo
- CF-022-IMPLEMENTATION-BACKLOG.md — Backlog de implementación