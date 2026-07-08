# Auditoría de Estado Actual — MVP V1

> **Propósito:** Determinar el estado real del proyecto, identificar el camino crítico hacia un MVP funcional y producir un backlog técnico priorizado.
> **Fecha:** 2026-07-08
> **Base:** CF-050 (MVP Freeze), PRD-001 (ATI-03), Roadmap V1, CF-001A (Arquitectura congelada)

---

## 1. ¿Qué funcionalidades del MVP ya están completamente implementadas?

### 1.1 Core de Datos — Completo

| Componente | Archivos | Tests | Estado |
|-----------|----------|-------|--------|
| **Cliente** (alta/consulta) | `cliente.repository.ts`, types en `core/cliente.ts` | ✅ | **Completo** |
| **Inmueble** (alta/consulta) | `inmueble.repository.ts`, `inmueble.service.ts`, types `core/inmueble.ts` | ✅ | **Completo** |
| **Expediente** (CRUD + estados) | `expediente.repository.ts`, `expediente.service.ts`, types `core/expediente.ts` | ✅ | **Completo** |
| **Documento IA** (gestión documental) | `documento-ia.repository.ts`, `documento-ia.service.ts`, types `core/documento-ia.ts` | ✅ | **Completo** |

### 1.2 Migraciones SQL — Aplicadas

| Migración | Propósito | Aplicada |
|-----------|-----------|----------|
| `20260702_00001_create_expedientes.sql` | Esquema inicial expedientes | ✅ |
| `20260703_00001_create_schema_core.sql` | Esquema core (RLS, funciones) | ✅ |
| `20260706_00002_create_inmueble.sql` | Tabla inmueble | ✅ |
| `20260707_00001_update_expedientes.sql` | Mejoras expediente | ✅ |
| `20260708_00001_create_core_expediente.sql` | Core expediente (Fase A) | ✅ |
| `20260709_00001_create_core_documento.sql` | Core documento | ✅ |

### 1.3 Autenticación — Completo

| Componente | Archivos | Estado |
|-----------|----------|--------|
| Magic link login | `src/lib/actions/auth.ts` | ✅ **Completo** |
| Middleware RLS | `src/middleware.ts`, `src/lib/supabase/middleware.ts` | ✅ **Completo** |
| Sesión | `src/hooks/use-user.ts` | ✅ **Completo** |
| Auth callback | `src/app/auth/callback/route.ts` | ✅ **Completo** |

### 1.4 Dashboard y Navegación — Completo

| Página | Ruta | Estado |
|--------|------|--------|
| Dashboard cliente | `/(plataforma)/dashboard/page.tsx` | ✅ **Completo** |
| Dashboard AT | `/(plataforma)/at/dashboard/page.tsx` | ✅ **Completo** |
| Mis expedientes (cliente) | `/(plataforma)/mis-expedientes/page.tsx` | ✅ **Completo** |
| Nuevo expediente | `/(plataforma)/nuevo-expediente/page.tsx` | ✅ **Completo** |
| Bandeja técnica AT | `/(plataforma)/at/dashboard/BandejaTecnicaTable.tsx` | ✅ **Completo** |
| Expediente detail (AT) | `/(plataforma)/at/expedientes/[id]/page.tsx` | ✅ **Completo** |
| Configuración | `/(plataforma)/configuracion/page.tsx` | ✅ **Completo** |

### 1.5 Acciones de servidor — Implementadas

| Acción | Archivo | Propósito | Estado |
|--------|---------|-----------|--------|
| `crearExpediente` | `crear-expediente.ts` | Creación de expediente desde formulario | ✅ |
| `subirDocumento` | `documentos-expediente.ts` | Subida de documentos a Storage | ✅ |
| `eliminarDocumento` | `documentos-expediente.ts` | Eliminación de documentos | ✅ |
| `listarDocumentos` | `documentos-expediente.ts` | Listado de documentos | ✅ |
| `entregarResultado` | `entregar-resultado.ts` | Transición Aprobado→Entregado | ✅ |
| `obtenerProximoExpedientePendiente` | `at.ts` | FIFO queue para AT | ✅ |
| Flujo aceptar/rechazar | `at.ts` | Transiciones de expediente | ✅ |

### 1.6 Sistema de Diseño UI — Implementado

| Componente | Archivo | Tests | Story | Estado |
|-----------|---------|-------|-------|--------|
| Badge | `Badge.tsx` | ✅ | ✅ | ✅ |
| DataTable | `DataTable.tsx` | ✅ | ✅ | ✅ |
| Input | `Input.tsx` | ✅ (DS-02B) | ✅ | ✅ |
| Card | `Card.tsx` | — | ✅ | ✅ |
| **DocumentoDecisiones** | `DocumentoDecisiones.tsx` | ❌ | ✅ | ⚠️ **Sin test, sin datos reales** |

### 1.7 Documentación de producto — Completa

| Documento | Estado |
|-----------|--------|
| PRD-001 (ATI-03) | ✅ Completo V2 |
| RF-002 (Nivel Confianza) | ✅ Completo |
| RF-003 (Jerarquía Decisiones) | ✅ Completo |
| RF-004 (Impacto Actuaciones) | ✅ Completo |
| RF-005 (Inversión Retorno) | ✅ Completo |
| Matriz Trazabilidad | ✅ Completo |
| Arquitectura Doc. Decisiones | ✅ Completo |
| UX Validation | ✅ Completo |
| CF-050 MVP Freeze | ✅ Completo |

---

## 2. ¿Qué funcionalidades están parcialmente implementadas?

### 2.1 DocumentoDecisiones (Componente UI)

- **Estado:** El componente React existe (`src/components/ui/DocumentoDecisiones.tsx`) con una Storybook story (`stories/molecules/DocumentoDecisiones.stories.tsx`)
- **Qué falta:**
  - No tiene datos reales conectados — renderiza datos mock/ficticios
  - No tiene tests unitarios
  - No está integrado en ninguna página del plataforma (cliente ni AT)
  - No recibe datos del expediente real
  - No implementa las 6 capas definidas en la arquitectura — es una representación parcial
  - No implementa el sistema visual basado en color+icono+texto definido en la validación UX

### 2.2 EP-032 Entrega Resultado (EntregarResultadoButton)

- **Estado:** El botón existe en la vista de AT, la acción `entregarResultado()` existe
- **Qué falta:**
  - No hay una página de resultado para el **cliente** — no hay `/(plataforma)/expedientes/[id]/resultado/page.tsx` ni equivalente
  - El botón entrega el resultado, pero el cliente no tiene dónde verlo
  - No hay representación del Documento de Decisiones en la vista de cliente

### 2.3 EP-033 Flujo de Correcciones

- **Estado:** El flujo Devuelto→PteDocumentacion existe en las acciones `at.ts`
- **Qué falta:**
  - No hay vista para que el cliente vea el motivo del rechazo
  - No hay vista para que el cliente suba nueva documentación tras corrección
  - La transición Devuelto→PteDocumentacion está implementada a nivel de datos pero no hay UI de cliente asociada

### 2.4 Motor PITR V1 — Revisión Manual

- **Estado:** `src/lib/pitr/use-pitr.ts` existe, `docs/CF-030/031/032` definen el conocimiento experto
- **Qué falta:**
  - No hay integración real de datos PITR con el expediente
  - El flujo "AT revisa manualmente" existe en la bandeja técnica pero la salida de esa revisión (el diagnóstico) no se materializa en un resultado visible para el cliente
  - No hay modelo de datos para guardar el resultado de la revisión PITR (diagnóstico, problemas, actuaciones)

---

## 3. ¿Qué funcionalidades aún no existen?

### 3.1 Vista de Resultado para el Cliente (BLOQUEANTE)

- **No existe** ninguna página que renderice el `DocumentoDecisiones` con datos reales del expediente
- **No existe** el modelo de datos para almacenar el resultado del diagnóstico PITR
- **No existe** el mecanismo para que el AT genere el contenido del Documento de Decisiones (diagnóstico, problemas, actuaciones)

### 3.2 Datos del Documento de Decisiones

| Componente de datos | Estado |
|--------------------|--------|
| Modelo de datos para diagnóstico (veredicto, nivel confianza) | ❌ **No existe** |
| Modelo de datos para problemas priorizados (🔴🟡🟢) | ❌ **No existe** |
| Modelo de datos para actuaciones recomendadas | ❌ **No existe** |
| Modelo de datos para ahorro/inversión/retorno | ❌ **No existe** |
| Modelo de datos para coste de inacción | ❌ **No existe** |
| Servicio de dominio para generar el Documento de Decisiones | ❌ **No existe** |
| Repositorio para persistir el Documento de Decisiones | ❌ **No existe** |

### 3.3 Flujo Completo de Extremo a Extremo

- **No existe** un flujo que conecte: Cliente solicita → AT revisa → Resultado se entrega → Cliente ve resultado
- Los fragmentos existen de forma aislada pero no hay integración

---

## 4. ¿Qué bloquea disponer de un flujo completo de extremo a extremo?

### Bloqueo #1 — CRÍTICO: No hay modelo de datos para el resultado

No existe ninguna tabla, tipo TypeScript ni repositorio para almacenar el resultado del diagnóstico que genera el AT. Sin esto:
- El AT no puede guardar su diagnóstico
- El cliente no puede ver su resultado
- No hay Documento de Decisiones que renderizar

### Bloqueo #2 — CRÍTICO: No hay página de resultado para el cliente

El `EntregarResultadoButton` cambia el estado del expediente a `Entregado`, pero no hay una ruta/página donde el cliente pueda ver el resultado entregado. El cliente no tiene acceso a una vista de "Mi diagnóstico" o "Mi resultado".

### Bloqueo #3 — ALTO: El DocumentoDecisiones no está conectado a datos reales

El componente existe como mock pero:
- No recibe props tipadas con los datos reales del expediente
- No tiene tests
- No implementa las 6 capas completas definidas en la arquitectura
- No implementa las mejoras de la validación UX (color+icono+texto, coste de inacción prominente)

### Bloqueo #4 — ALTO: No hay flujo de revisión AT → resultado

El AT puede aceptar/rechazar expedientes en la bandeja técnica, pero no hay una interfaz para que el AT:
- Introduzca el veredicto diagnóstico
- Priorice problemas
- Recomiende actuaciones
- Genere el contenido del Documento de Decisiones

---

## 5. ¿Cuál es el siguiente bloque de implementación con mayor valor para el cliente?

**RESPUESTA: Crear el modelo de datos y el flujo de entrega del resultado del diagnóstico.**

Este es el bloque que desbloquea el flujo completo:

```
Sin esto:    AT revisa → [agujero negro] → nada llega al cliente
Con esto:    AT revisa → resultado guardado → cliente ve su diagnóstico
```

### Criterio de valor

1. **Resuelve el bloqueo #1 y #2 simultáneamente** — el dato y su visualización
2. **El cliente puede ver por primera vez el resultado de su solicitud** — esto es MVP
3. **Desbloquea todas las épicas restantes** — sin resultado no hay nada que mostrar
4. **Reutiliza el Core existente** — Extensión controlada de Expediente (según 9.3 de AGENTS.md)

---

## 6. Backlog Técnico Priorizado

### Prioridad CRÍTICA — Imprescindible para MVP

| # | Tarea | Objetivo | Dependencias | Prioridad | Criterio de Finalización |
|---|-------|----------|-------------|-----------|-------------------------|
| **C1** | **Modelo de datos: Resultado del Diagnóstico** | Crear migración SQL + tipos TypeScript + repositorio para almacenar el resultado del diagnóstico (veredicto, nivel confianza, problemas priorizados, actuaciones recomendadas, ahorro, inversión, coste inacción, metadatos de entrega) | Core Expediente (completado) | **CRÍTICA** | Migración SQL aplicada. Tipos TypeScript en `src/types/core/`. Repositorio con tests. |
| **C2** | **Página de resultado para el cliente** | Crear `/(plataforma)/expedientes/[id]/resultado/page.tsx` que renderice el DocumentoDecisiones con datos reales del expediente | C1 | **CRÍTICA** | Página accesible desde "Mis expedientes" para expedientes en estado `Entregado`. Renderiza el diagnóstico completo. |
| **C3** | **Integración DocumentoDecisiones → datos reales** | Refactorizar `DocumentoDecisiones.tsx` para recibir props tipadas con el modelo real. Implementar las 6 capas completas. Implementar sistema color+icono+texto. Añadir tests. | C1 | **CRÍTICA** | Componente renderiza con datos reales. Todas las capas implementadas. Tests unitarios pasando. Sin mock data. |
| **C4** | **Interfaz AT para generar resultado** | Crear vista/formulario para que el AT introduzca veredicto, problemas, actuaciones, ahorro e inversión durante la revisión del expediente | C1 | **CRÍTICA** | AT puede guardar diagnóstico completo desde la vista de expediente. Los datos persisten en la base de datos. |

### Prioridad ALTA — Necesario para flujo completo

| # | Tarea | Objetivo | Dependencias | Prioridad | Criterio de Finalización |
|---|-------|----------|-------------|-----------|-------------------------|
| **A1** | **UX Validation: mejoras en DocumentoDecisiones** | Resolver ambigüedad estado intermedio. Dar protagonismo al coste de inacción. Sistema color+icono+texto (sin depender solo del color). | C3 | **ALTA** | Validación de comprensión superada con las 3 mejoras implementadas. |
| **A2** | **Flujo de correcciones: vista cliente** | Crear vista para que el cliente vea el motivo del rechazo y pueda subir nueva documentación | EP-033 (parcial) | **ALTA** | Cliente ve nota de rechazo. Cliente puede subir documentos. Expediente vuelve a PteDocumentacion. |
| **A3** | **Conexión flujo completo E2E** | Integrar: Cliente solicita → AT revisa → Resultado se entrega → Cliente ve resultado. Probar el flujo completo. | C1, C2, C3, C4, A2 | **ALTA** | Flujo completo funcional en un solo test E2E o recorrido manual. |

### Prioridad MEDIA — Mejora iterativa post-flujo

| # | Tarea | Objetivo | Dependencias | Prioridad | Criterio de Finalización |
|---|-------|----------|-------------|-----------|-------------------------|
| **M1** | **Simplificar nivel de detalle económico (1ª lectura)** | Revisar Capa 4 y 5: reducir detalles económicos visibles por defecto, mantener solo los datos esenciales para decisión | C3 | **MEDIA** | Las capas 4-5 muestran menos datos en primera lectura. El detalle económico está en expandible. Validado con criterio UX. |
| **M2** | **Revisar diferencia "Merece la pena" vs "Valóralo"** | Ajustar criterios y copy de diferenciación entre ambos veredictos en Capa 5 | C1, C3 | **MEDIA** | Diferencia clara y comprensible para un usuario no técnico. Validado en prueba de comprensión. |

### Prioridad BAJA — Deuda técnica / V2

| # | Tarea | Objetivo | Dependencias | Prioridad | Criterio de Finalización |
|---|-------|----------|-------------|-----------|-------------------------|
| **B1** | **Optimizar experiencia del estado "Buena"** | Mejorar la capa 1 cuando el veredicto es "Buena": el cliente debe sentir que ha recibido valor aunque no haya problemas | C3 | **BAJA** | Clasificado como V2 si no bloquea MVP. |
| **B2** | **Revisar tratamiento del Anexo Técnico** | Evaluar si el anexo técnico debe ser inline, PDF descargable, o enlace externo | C3 | **BAJA** | Clasificado como V2 si no bloquea MVP. |

---

## 7. Deuda Técnica y Funcional Detectada (No resolver ahora)

| ID | Tipo | Descripción | Archivos afectados | Prioridad futura |
|----|------|-------------|-------------------|-----------------|
| D1 | **Funcional** | `DocumentoDecisiones.tsx` no tiene tests unitarios | `src/components/ui/DocumentoDecisiones.tsx` | Alta (se resuelve en C3) |
| D2 | **Técnica** | No hay tipo compartido para el Justification Log entre RF-002 y RF-003 | `src/types/core/` | Media (R3 en matriz trazabilidad) |
| D3 | **Funcional** | El flujo de pago es manual según CF-050 — no hay integración con pasarela de pago | — | Media (post-MVP) |
| D4 | **Técnica** | No hay test E2E del flujo completo cliente→AT→resultado | — | Alta (se resuelve en A3) |
| D5 | **Funcional** | El componente `DocumentoDecisiones` no implementa las mejoras de la validación UX | `src/components/ui/DocumentoDecisiones.tsx` | Alta (se resuelve en A1) |

---

## 8. Resumen de la Hoja de Ruta

```
FASE ACTUAL ──► PRÓXIMO PASO ──► MVP COMPLETO
                   (4-6 semanas estimadas)

Core V1 ✅          C1 ─── Modelo datos resultado
Auth ✅             C2 ─── Página resultado cliente
Dashboards ✅       C3 ─── DocumentoDecisiones real
UI System ✅        C4 ─── Interfaz AT para diagnóstico
Acciones ✅         A1 ─── UX validation mejoras
PRD/Análisis ✅     A2 ─── Flujo correcciones cliente
                    A3 ─── Test flujo completo E2E
```

**Orden de implementación recomendado:** C1 → C4 y C2 en paralelo → C3 → A1 → A2 → A3 → M1 → M2

**Criterio de "MVP Funcional":** Un cliente puede solicitar un diagnóstico, el AT lo revisa, genera el resultado, y el cliente puede ver su Documento de Decisiones completo con las 6 capas.

---

*Fin del documento — MVP-AUDIT-ESTADO-ACTUAL.md*
*Próximo paso: Obtener aprobación del usuario para comenzar la implementación según el backlog priorizado.*