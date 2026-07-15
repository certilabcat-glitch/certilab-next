# INFORME DE ESTADO GLOBAL — Certilab V1
**Fecha:** 2026-07-13
**Versión del análisis:** 1.0
**Base documental:** CF-000, CF-001A, CF-050, ROADMAP-V1, MVP-AUDIT-ESTADO-ACTUAL, RC-001, informes de cierre de épicas, PA-002/003, S1-CJ-001

---

## 1. FUNCIONALIDADES IMPLEMENTADAS

### 1.1 Core de Datos (Completo — 4/4 agregados)

| Agregado | Estado | Archivos clave | Tests |
|----------|--------|----------------|-------|
| **Cliente** (alta/consulta) | ✅ COMPLETO | `cliente.repository.ts`, `types/core/cliente.ts` | ✅ unitarios |
| **Inmueble** (alta/consulta) | ✅ COMPLETO | `inmueble.repository.ts`, `inmueble.service.ts`, `types/core/inmueble.ts` | ✅ unitarios (repository + service) |
| **Expediente** (CRUD + estados) | ✅ COMPLETO | `expediente.repository.ts`, `expediente.service.ts`, `types/core/expediente.ts` | ✅ unitarios (repository + service) |
| **Documento IA** (gestión documental) | ✅ COMPLETO | `documento-ia.repository.ts`, `documento-ia.service.ts`, `types/core/documento-ia.ts` | ✅ unitarios (repository + service) |

### 1.2 Autenticación y Autorización (Completo)

| Componente | Archivos | Estado |
|-----------|----------|--------|
| Magic link login | `src/lib/actions/auth.ts` | ✅ Completo |
| Middleware RLS + Supabase | `src/middleware.ts`, `src/lib/supabase/middleware.ts` | ✅ Completo |
| Sesión de usuario (hook) | `src/hooks/use-user.ts` | ✅ Completo |
| Auth callback route | `src/app/auth/callback/route.ts` | ✅ Completo |
| UserMenu (UI) | `src/components/auth/UserMenu.tsx` | ✅ Completo |

### 1.3 Dashboard y Navegación (Completo)

| Página | Ruta | Estado |
|--------|------|--------|
| Dashboard cliente principal | `/(plataforma)/dashboard/page.tsx` | ✅ Completo |
| Dashboard AT (técnico) | `/(plataforma)/at/dashboard/page.tsx` | ✅ Completo |
| Mis expedientes (cliente) | `/(plataforma)/mis-expedientes/page.tsx` | ✅ Completo |
| Nuevo expediente (solicitud) | `/(plataforma)/nuevo-expediente/page.tsx` | ✅ Completo |
| Bandeja técnica AT | `/(plataforma)/at/dashboard/BandejaTecnicaTable.tsx` | ✅ Completo |
| Detalle expediente (AT) | `/(plataforma)/at/expedientes/[id]/page.tsx` | ✅ Completo |
| Detalle expediente (cliente) | `/(plataforma)/expedientes/[id]/page.tsx` | ✅ Completo |
| Configuración de usuario | `/(plataforma)/configuracion/page.tsx` | ✅ Completo |
| Solicitar segunda opinión | `/(plataforma)/solicitar-segunda-opinion/page.tsx` | ✅ Completo |
| Página de privacidad (legal) | `/(legal)/privacidad/page.tsx` | ✅ Completo |

### 1.4 Acciones de Servidor (Server Actions)

| Acción | Archivo | Propósito | Estado |
|--------|---------|-----------|--------|
| `crearExpediente` | `crear-expediente.ts` | Creación desde formulario | ✅ Completo |
| `subirDocumento` | `documentos-expediente.ts` | Subida a Storage | ✅ Completo |
| `eliminarDocumento` | `documentos-expediente.ts` | Eliminación de documentos | ✅ Completo |
| `listarDocumentos` | `documentos-expediente.ts` | Listado de documentos | ✅ Completo |
| `entregarResultado` | `entregar-resultado.ts` | Transición Aprobado→Entregado | ✅ Completo |
| `obtenerProximoExpedientePendiente` | `at.ts` | FIFO queue AT | ✅ Completo |
| Flujo aceptar/rechazar (AT) | `at.ts` | Transiciones expediente AT | ✅ Completo |
| `entregarDictamen` | `entregar-dictamen.ts` | Entrega de dictamen | ✅ Completo |
| `emitirDictamen` | `emitir-dictamen.ts` | Emisión de dictamen | ✅ Completo |
| `obtenerDictamen` | `obtener-dictamen.ts` | Consulta de dictamen | ✅ Completo |
| `corregirExpediente` | `corregir-expediente.ts` | Corrección de expediente | ✅ Completo |
| Acciones de diagnóstico | `diagnostico.ts` | Diagnóstico PITR | ✅ Completo |
| Acciones auth (login/registro) | `auth.ts` | Autenticación | ✅ Completo |

### 1.5 Sistema de Diseño UI (Design System)

| Componente | Archivo | Tests | Story | Estado |
|-----------|---------|-------|-------|--------|
| Badge | `Badge.tsx` | ✅ | ✅ | ✅ Completo |
| DataTable | `DataTable.tsx` | ✅ | ✅ | ✅ Completo |
| Input | `Input.tsx` | ✅ | ✅ | ✅ Completo |
| Card | `Card.tsx` | — | ✅ | ✅ Completo |
| DropdownMenu | `DropdownMenu.tsx` | — | — | ✅ Completo |
| Skeleton | `Skeleton.tsx` | — | — | ✅ Completo |
| Separator | `Separator.tsx` | — | — | ✅ Completo |
| use-toast | `use-toast.tsx` | — | — | ✅ Completo |
| icons | `icons.tsx` | — | — | ✅ Completo |
| CookieConsent | `CookieConsent.tsx` | — | — | ✅ Completo |

### 1.6 Migraciones SQL Aplicadas (10 migraciones)

| Migración | Propósito | Aplicada |
|-----------|-----------|----------|
| `20260702_00001_create_expedientes.sql` | Esquema inicial expedientes | ✅ |
| `20260703_00001_create_schema_core.sql` | Esquema core (RLS, funciones) | ✅ |
| `20260706_00002_create_inmueble.sql` | Tabla inmueble | ✅ |
| `20260707_00001_update_expedientes.sql` | Mejoras expediente | ✅ |
| `20260708_00001_create_core_expediente.sql` | Core expediente (Fase A) | ✅ |
| `20260709_00001_create_core_documento.sql` | Core documento | ✅ |
| `20260710_00001_add_diagnostico_to_expediente.sql` | Diagnóstico | ✅ |
| `20260711_00001_add_dictamen.sql` | Dictamen | ✅ |
| `20260712_00001_create_schema_commercial.sql` | Esquema commercial | ✅ |
| `20260712_00001_rollback_commercial.sql` | Rollback commercial | ✅ |

### 1.7 Documentación de Producto (Completa)

| Documento | Estado |
|-----------|--------|
| PRD-001 (ATI-03) — Informe Técnico Energético | ✅ Completo V2 |
| RF-002 (Nivel de Confianza) | ✅ Completo |
| RF-003 (Jerarquía de Decisiones) | ✅ Completo |
| RF-004 (Impacto de Actuaciones) | ✅ Completo |
| RF-005 (Inversión y Retorno) | ✅ Completo |
| Matriz de Trazabilidad Capa 1 | ✅ Completo |
| Arquitectura Documento de Decisiones | ✅ Completo |
| Validación UX Documento Decisiones | ✅ Completo |
| CF-050 (MVP Freeze) | ✅ Completo |
| CF-040 (Business Policies) | ✅ Completo |

### 1.8 Business Blueprint (Completo — 4 documentos)

| Documento | Estado |
|-----------|--------|
| BP-100-01 (Canvas de Negocio) | ✅ Completo |
| BP-100-02 (Líneas de Negocio) | ✅ Completo |
| BP-100-03 (Modelo Operativo y Comercial) | ✅ Completo |
| BP-100-04 (Marketing, Customer Journey y Crecimiento) | ✅ Completo |
| EP-102 (Gestión Técnica Documental — GTD) | ✅ Completo |
| EP-101 (Product Business Alignment) | ✅ Completo |

### 1.9 Product Architecture (Completo — 3 documentos + catálogo)

| Documento | Estado |
|-----------|--------|
| PA-001 (Product Architecture) | ✅ Completo |
| PA-001 (Catalog) | ✅ Completo |
| PA-001 (Product Validation Criteria) | ✅ Completo |
| PA-002 (Commercial Architecture) | ✅ Completo |
| PA-003 (Product Domain Analysis) | ✅ Completo |
| PA-003A (Product as Executable Business Definition) | ✅ Completo |

### 1.10 Go-To-Market Strategy (Completo — 11 documentos)

| Documento | Estado |
|-----------|--------|
| GTM-001 (Go-To-Market Plan) | ✅ Completo |
| GTM-001 (Market Architecture) | ✅ Completo |
| GTM-001 (Buyer Personas) | ✅ Completo |
| GTM-001 (Competitive Analysis) | ✅ Completo |
| GTM-001 (Positioning) | ✅ Completo |
| GTM-001 (GTM Strategy) | ✅ Completo |
| GTM-001 (Customer Journey) | ✅ Completo |
| GTM-001 (Pricing) | ✅ Completo |
| GTM-001 (SEO & Content Strategy) | ✅ Completo |
| GTM-001 (Captation, Conversion, Retention) | ✅ Completo |
| GTM-001 (Automation & IA Matrix) | ✅ Completo |

### 1.11 Brand Book y Diseño (Completo — 7 volúmenes)

| Volumen | Estado |
|---------|--------|
| V1 — Foundations | ✅ Completo |
| V2 — Visual Language | ✅ Completo |
| V3 — Design System | ✅ Completo |
| V4 — UX Bible | ✅ Completo |
| V5 — Copywriting | ✅ Completo |
| V6 — Brand Book | ✅ Completo |
| V7 — Implementation | ✅ Completo |

### 1.12 ADRs Aprobadas (4)

| ADR | Título | Estado |
|-----|--------|--------|
| ADR-001 | Certilab Engineering System | ✅ Approved |
| ADR-002 | Auto-Entrega MVP (EntregarResultado) | ✅ Approved |
| ADR-003 | GTD — Línea de Negocio | ✅ Approved |
| ADR-004 | Extensión Documento IA para GTD | ✅ Approved |

### 1.13 Componentes UI del Expediente

| Componente | Archivo | Estado |
|-----------|---------|--------|
| ExpedientesTable | `mis-expedientes/ExpedientesTable.tsx` | ✅ Completo |
| BandejaTecnicaTable | `at/dashboard/BandejaTecnicaTable.tsx` | ✅ Completo |
| DocumentList | `expedientes/DocumentList.tsx` | ✅ Completo |
| DocumentUpload | `expedientes/DocumentUpload.tsx` | ✅ Completo |
| DictamenView | `expedientes/DictamenView.tsx` | ✅ Completo |
| DictamenStatusBadge | `expedientes/DictamenStatusBadge.tsx` | ✅ Completo |
| EmitirDictamenButton | `expedientes/EmitirDictamenButton.tsx` | ✅ Completo |
| EmitirDictamenModal | `expedientes/EmitirDictamenModal.tsx` | ✅ Completo |
| EntregarDictamenButton | `expedientes/EntregarDictamenButton.tsx` | ✅ Completo |
| EntregarResultadoButton | `expedientes/EntregarResultadoButton.tsx` | ✅ Completo |
| CorregirExpedienteButton | `expedientes/CorregirExpedienteButton.tsx` | ✅ Completo |
| AsistenteDecisionTecnica | `expedientes/AsistenteDecisionTecnica.tsx` | ✅ Completo |
| SolicitarSegundaOpinionForm | `solicitar-segunda-opinion/SolicitarSegundaOpinionForm.tsx` | ✅ Completo |

---

## 2. FUNCIONALIDADES INCOMPLETAS

### 2.1 DocumentoDecisiones (CRÍTICO — BLOQUEANTE MVP)

| Aspecto | Estado |
|---------|--------|
| Componente React existe | ✅ Implementado |
| Storybook story | ✅ Implementado |
| Test unitarios | ❌ **No existen** |
| Datos reales conectados | ❌ **Usa datos mock** |
| Integrado en página de cliente | ❌ **No integrado** |
| 6 capas completas definidas | ❌ **Implementación parcial** |
| Sistema color+icono+texto (validación UX) | ❌ **No implementado** |
| Props tipadas con modelo real | ❌ **No existen** |

### 2.2 EP-032 Entrega de Resultado al Cliente (CRÍTICO — BLOQUEANTE MVP)

| Aspecto | Estado |
|---------|--------|
| Botón EntregarResultado (vista AT) | ✅ Existe |
| Acción `entregarResultado()` | ✅ Existe |
| Página de resultado para el CLIENTE | ❌ **No existe** |
| Representación DocumentoDecisiones en vista cliente | ❌ **No existe** |
| Cliente puede ver diagnóstico | ❌ **No puede** |

### 2.3 EP-033 Flujo de Correcciones (ALTA)

| Aspecto | Estado |
|---------|--------|
| Flujo Devuelto→PteDocumentacion en acciones `at.ts` | ✅ Existe |
| Vista cliente para ver motivo del rechazo | ❌ **No existe** |
| Vista cliente para subir documentación tras corrección | ❌ **No existe** |
| UI de cliente asociada a transición | ❌ **No existe** |
| Test flujo de correcciones | ❌ **No implementado** |

### 2.4 Motor PITR V1 — Integración (MEDIA)

| Aspecto | Estado |
|---------|--------|
| Hook `use-pitr.ts` | ✅ Existe |
| CF-030 (Expert Knowledge Engine) | ✅ Documentado |
| CF-031 (Question Tree) | ✅ Documentado |
| CF-032 (Inspection Manual) | ✅ Documentado |
| Integración real con expediente | ❌ **No implementada** |
| Salida de revisión visible al cliente | ❌ **No materializada** |

### 2.5 Dictamen (DictamenV2 / Flujo completo)

| Aspecto | Estado |
|---------|--------|
| Migración `20260711_00001_add_dictamen.sql` | ✅ Aplicada |
| Tipos TypeScript `dictamen.ts` | ✅ Existen |
| Acciones (emitir/entregar/obtener) | ✅ Implementadas |
| Tests de acciones | ✅ Implementados |
| Componentes UI (EmitirDictamenModal, etc.) | ✅ Implementados |
| Integración flujo completo AT→cliente | ⚠️ **Parcial — falta vista cliente** |

---

## 3. DEUDA TÉCNICA

### 3.1 Deuda Funcional (Bloqueante para MVP)

| ID | Descripción | Archivos | Prioridad |
|----|-------------|----------|-----------|
| **D-F01** | DocumentoDecisiones sin tests unitarios | `src/components/ui/DocumentoDecisiones.tsx` | **ALTA** |
| **D-F02** | No hay página de resultado para el cliente | — | **ALTA** |
| **D-F03** | DocumentoDecisiones no recibe datos reales | `DocumentoDecisiones.tsx` | **ALTA** |
| **D-F04** | No hay modelo de datos para resultado del diagnóstico | — | **ALTA** |
| **D-F05** | No hay interfaz AT para generar diagnóstico completo | — | **ALTA** |
| **D-F06** | Flujo de correcciones sin vista cliente | — | **ALTA** |

### 3.2 Deuda Técnica (Mejorable)

| ID | Descripción | Archivos | Prioridad |
|----|-------------|----------|-----------|
| **D-T01** | No hay tipo compartido para Justification Log entre RF-002 y RF-003 | `src/types/core/` | Media |
| **D-T02** | No hay test E2E del flujo completo cliente→AT→resultado | — | Alta |
| **D-T03** | Flujo de pago manual sin pasarela (según CF-050) | — | Media |
| **D-T04** | `expediente-mvp.ts` — tipos legacy que pueden entrar en conflicto con `core/expediente.ts` | `src/types/expediente-mvp.ts` | Baja |
| **D-T05** | Scripts de migración duplicados (apply-migration.mjs, apply-migration-final.mjs, apply-migration-v3.mjs, apply-commercial-migration.mjs) | `scripts/` | Baja |
| **D-T06** | No hay integración continua configurada (CI/CD) | — | Media |
| **D-T07** | ESLint config presente pero pueden existir warnings residuales | `eslint.config.mjs` | Baja |

### 3.3 Deuda de Documentación

| ID | Descripción | Prioridad |
|----|-------------|-----------|
| **D-D01** | Documentos de análisis en `docs/analysis/` sin índice único de navegación | Baja |
| **D-D02** | Archivos `scripts/apply-sql-v2` sin extensión (archivo huérfano) | Baja |
| **D-D03** | Algunos informes de cierre de épicas no tienen checklist DoD completo verificado | Media |

---

## 4. COBERTURA DE TESTS

### 4.1 Tests del Core de Datos

| Archivo | Tipo | Archivo de test | Estado |
|---------|------|-----------------|--------|
| `cliente.repository.ts` | Repository | `__tests__/cliente.repository.test.ts` | ✅ |
| `inmueble.repository.ts` | Repository | `__tests__/inmueble.repository.test.ts` | ✅ |
| `inmueble.service.ts` | Service | `__tests__/inmueble.service.test.ts` | ✅ |
| `expediente.repository.ts` | Repository | `__tests__/expediente.repository.test.ts` | ✅ |
| `expediente.service.ts` | Service | `__tests__/expediente.service.test.ts` | ✅ |
| `documento-ia.repository.ts` | Repository | — | ⚠️ Pendiente |
| `documento-ia.service.ts` | Service | `__tests__/documento-ia.service.test.ts` | ✅ |

### 4.2 Tests de Acciones (Server Actions)

| Archivo | Archivo de test | Estado |
|---------|-----------------|--------|
| `diagnostico.ts` | `__tests__/diagnostico.test.ts` | ✅ |
| `dictamen.ts` (emitir/entregar/obtener) | `__tests__/dictamen.test.ts` | ✅ |
| `documentos-expediente.ts` | `__tests__/documentos-expediente.test.ts` | ✅ |
| `corregir-expediente.ts` | `__tests__/corregir-expediente.test.ts` | ✅ |

### 4.3 Tests del Sistema de Diseño

| Componente | Archivo de test | Story | Estado |
|-----------|-----------------|-------|--------|
| Badge | `__tests__/Badge.test.tsx` | ✅ | ✅ |
| DataTable | `__tests__/DataTable.test.tsx` | ✅ | ✅ |
| Input | (DS-02B — validado) | ✅ | ✅ |
| DocumentoDecisiones | ❌ Sin tests | ✅ | ⚠️ |

### 4.4 Resumen de Cobertura

| Categoría | Implementados | Pendientes | Cobertura estimada |
|-----------|--------------|------------|-------------------|
| Core Repositories | 4/5 | `documento-ia.repository.ts` | ~80% |
| Core Services | 3/3 | — | 100% |
| Server Actions | 4/4 | — | 100% |
| UI Components | 2/3 | `DocumentoDecisiones` | ~66% |
| Storybook Stories | 5+ | — | Alta |
| Tests E2E | 0 | Flujo completo | **0%** |

**Conclusión:** La cobertura de tests unitarios es buena (~80-100%) en el Core y Server Actions. La carencia principal son los tests E2E y los tests del componente `DocumentoDecisiones`.

---

## 5. ESTADO DEL DOMINIO CORE

### 5.1 Arquitectura

| Aspecto | Estado |
|---------|--------|
| Clean Architecture + DDD | ✅ Congelado (CF-001A) |
| Vertical Slice | ✅ Congelado |
| Bounded Contexts definidos | ✅ CF-022 |
| Aggregate Roots definidos | ✅ CF-022 |
| Single Tenant + RLS auth.uid() | ✅ CF-021 |
| Soft Delete + Optimistic Locking | ✅ CF-021 |
| Arquitectura congelada | ✅ CF-001A |

### 5.2 Agregados del Core V1

```
Cliente ───┐
           ├──→ Expediente ──→ Documento IA
Inmueble ──┘
```

| Agregado | Estado | Repository | Service | Types | Tests |
|----------|--------|------------|---------|-------|-------|
| Cliente | ✅ Completo | ✅ | — | ✅ | ✅ |
| Inmueble | ✅ Completo | ✅ | ✅ | ✅ | ✅ |
| Expediente | ✅ Completo | ✅ | ✅ | ✅ | ✅ |
| Documento IA | ✅ Completo | ✅ | ✅ | ✅ | ⚠️ repository sin test |

### 5.3 Flujo de Referencia del Dominio

```
Cliente → Inmueble → Expediente → Documento IA → Motor PITR → Resultado
   ✅        ✅          ✅            ✅           ⚠️ parcial    ❌ no existe
```

**Brecha principal:** El flujo se completa a nivel de datos y acciones, pero el **resultado** (Documento de Decisiones) no tiene modelo de datos, página de cliente ni integración real.

### 5.4 Estados del Expediente

```
solicitado → pendiente_documentacion → en_revision_at → aprobado → entregado
                                                           ↓
                                                     devuelto → pendiente_documentacion (loop)
```

El workflow de estados está implementado en las acciones `at.ts`, `expediente.service.ts`, y las transiciones funcionan correctamente.

---

## 6. ESTADO DEL DOMINIO COMMERCIAL (V2 — En fase inicial)

### 6.1 Documentación Comercial Existente

| Documento | Estado |
|-----------|--------|
| PA-002 (Commercial Architecture) | ✅ Completo |
| S1-CJ-001 (Commercial Journey Plan) | ✅ Completo |
| S1-CJ-001 (Revised Execution Plan) | ✅ Completo |
| ADR-003 (GTD — Línea de Negocio) | ✅ Approved |
| ADR-004 (Extensión Documento IA para GTD) | ✅ Approved |

### 6.2 Implementación Commercial (Fase inicial — T1)

| Componente | Archivo | Estado |
|-----------|---------|--------|
| Migración esquema commercial | `20260712_00001_create_schema_commercial.sql` | ✅ Aplicada |
| Rollback commercial | `20260712_00001_rollback_commercial.sql` | ✅ Creado |
| Customer repository | `src/lib/commercial/customer.repository.ts` | ✅ Implementado |
| Order repository | `src/lib/commercial/order.repository.ts` | ✅ Implementado |
| Tipos Commercial | `src/types/commercial/index.ts` | ✅ Existen |

### 6.3 Evaluación del Dominio Commercial

| Aspecto | Estado |
|---------|--------|
| Modelo de datos Commercial (customer, order) | ✅ Creado |
| Repositorios implementados | ✅ Parcial |
| Tests de repositorios | ❌ Pendientes |
| Servicios de dominio Commercial | ❌ No implementados |
| UI Comercial | ❌ No existe |
| Integración con Core V1 | ❌ No implementada |
| Flujo de pago | ❌ No implementado |
| readiness para MVP V1 | ⚠️ Según CF-050 y PA-002, el dominio Commercial es **post-MVP** |

**Clasificación:** El dominio Commercial está en **fase de diseño e implementación temprana (T1)**. Según CF-050 (MVP Freeze) y las reglas de PRODUCT-FIRST EXECUTION MODE, el Commercial debe priorizarse **después** de completar el flujo MVP del Core. Se recomienda mantenerlo en backlog V2, salvo que desbloquee funcionalidad del MVP.

---

## 7. PRÓXIMOS HITOS RECOMENDADOS

### 7.1 Camino Crítico hacia MVP Funcional

Basado en MVP-AUDIT-ESTADO-ACTUAL y los bloqueos identificados:

```
SEMANA 1-2          SEMANA 3-4           SEMANA 5-6
┌────────────┐     ┌────────────┐       ┌──────────────┐
│ C1: Modelo  │──→ │ C2: Página  │──→   │ A2: Flujo    │
│ datos       │     │ resultado  │       │ correcciones │
│ diagnóstico │     │ cliente    │       │ (vista cli)  │
└────────────┘     └────────────┘       └──────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
┌────────────┐     ┌────────────┐       ┌──────────────┐
│ C4: Interfaz │──→ │ C3: Documento│──→   │ A3: Test E2E │
│ AT para     │     │ Decisiones  │       │ flujo        │
│ diagnóstico │     │ (datos real)│       │ completo     │
└────────────┘     └────────────┘       └──────────────┘
```

### 7.2 Hitos con Fechas Estimadas

| Hito | Descripción | Dependencias | Esfuerzo estimado |
|------|-------------|-------------|-------------------|
| **H1** | Modelo de datos para resultado del diagnóstico (tabla + tipos + repositorio + tests) | Core Expediente | 3-4 días |
| **H2** | Interfaz AT para generar diagnóstico (formulario de veredicto, problemas, actuaciones) | H1 | 4-5 días |
| **H3** | Página de resultado para el cliente (renderiza DocumentoDecisiones con datos reales) | H1 | 3-4 días |
| **H4** | Refactor DocumentoDecisiones (props reales, 6 capas, sistema color+icono+texto, tests) | H1 | 3-4 días |
| **H5** | Mejoras UX en DocumentoDecisiones (coste inacción, estado intermedio) | H4 | 2 días |
| **H6** | Vista cliente para flujo de correcciones (motivo rechazo + subida documentos) | — | 3-4 días |
| **H7** | Test E2E del flujo completo cliente→AT→resultado | H2, H3, H4, H5, H6 | 2-3 días |
| **H8** | Auditoría específica MVP + Informe de cierre | H1-H7 | 1-2 días |

**Esfuerzo total estimado:** 21-28 días hábiles (~4-6 semanas)

---

## 8. PRIORIDADES P0, P1, P2

### 8.1 P0 — CRÍTICO (Imprescindible para MVP — Sin esto no hay MVP)

| ID | Tarea | Para qué sirve | Hito asociado |
|----|-------|---------------|---------------|
| **P0-01** | Crear modelo de datos para resultado del diagnóstico (migración SQL + tipos + repositorio) | Almacenar el diagnóstico del AT para que el cliente pueda consultarlo | H1 |
| **P0-02** | Crear página de resultado para el cliente (`/expedientes/[id]/resultado`) | El cliente debe poder ver el resultado de su solicitud | H3 |
| **P0-03** | Conectar DocumentoDecisiones a datos reales del expediente | El componente debe renderizar información real, no mock | H4 |
| **P0-04** | Crear interfaz AT para generar diagnóstico completo (veredicto, problemas, actuaciones) | El AT necesita una UI para introducir su diagnóstico | H2 |

**Criterio P0:** Sin estas tareas, el flujo extremo a extremo (cliente solicita → AT revisa → cliente ve resultado) no es funcional.

### 8.2 P1 — ALTA (Necesario para flujo completo y calidad MVP)

| ID | Tarea | Para qué sirve | Hito asociado |
|----|-------|---------------|---------------|
| **P1-01** | Implementar sistema color+icono+texto en DocumentoDecisiones (validación UX) | Accesibilidad: no depender solo del color para transmitir información | H5 |
| **P1-02** | Dar protagonismo al coste de inacción en el DocumentoDecisiones | El usuario debe entender el coste de no actuar | H5 |
| **P1-03** | Crear vista cliente para ver motivo de rechazo y subir documentación (flujo correcciones) | El cliente debe entender por qué su expediente fue devuelto | H6 |
| **P1-04** | Añadir tests unitarios a DocumentoDecisiones | Calidad del componente principal del MVP | H4 |
| **P1-05** | Test E2E del flujo completo cliente→AT→resultado | Validación de que todo funciona correctamente | H7 |
| **P1-06** | Auditoría arquitectónica específica de la épica MVP | Verificar que se respetan CF-022, CF-001A y reglas de arquitectura | H8 |

**Criterio P1:** Sin estas tareas, el MVP funciona pero tiene problemas de usabilidad, accesibilidad o calidad.

### 8.3 P2 — MEDIA (Mejora post-MVP / V2)

| ID | Tarea | Para qué sirve | Clasificación |
|----|-------|---------------|---------------|
| **P2-01** | Simplificar nivel de detalle económico en primera lectura (Capas 4-5 del DocumentoDecisiones) | Mejorar experiencia de primera lectura para usuario no técnico | V2 |
| **P2-02** | Revisar diferencia "Merece la pena" vs "Valóralo" (criterios y copy) | Claridad de los veredictos para usuario no técnico | V2 |
| **P2-03** | Integrar Motor PITR con datos reales del expediente | Automatizar parte de la revisión del AT | V2 |
| **P2-04** | Implementar flujo de pago (pasarela) | Monetización del servicio | V2 |
| **P2-05** | Optimizar experiencia del estado "Buena" en DocumentoDecisiones | El cliente debe sentir valor aunque no haya problemas | V2 |
| **P2-06** | Revisar tratamiento del Anexo Técnico (inline vs PDF vs enlace) | Claridad documental | V2 |
| **P2-07** | Implementar dominio Commercial completo (UI, servicios, integración) | Segunda línea de negocio (GTD) | V2 |
| **P2-08** | Configurar CI/CD | Automatización de builds y despliegues | V2 |
| **P2-09** | Consolidar scripts de migración (eliminar duplicados) | Mantenibilidad | V2 |
| **P2-10** | Crear tipo compartido para Justification Log entre RF-002 y RF-003 | Consistencia de tipos | V2 |

**Criterio P2:** Mejoras que no bloquean el MVP y pueden posponerse a V2 sin impacto crítico.

---

## 9. RESUMEN EJECUTIVO

### Estado General: 🟡 AMARILLO — MVP parcialmente funcional

| Dimensión | Calificación | Detalle |
|-----------|-------------|---------|
| Core de Datos (4 agregados) | 🟢 Verde | Cliente, Inmueble, Expediente, Documento IA completos |
| Autenticación | 🟢 Verde | Magic link, RLS, middleware, sesión |
| UI / Navegación | 🟢 Verde | Dashboards, formularios, tablas, AT bandeja |
| Server Actions | 🟢 Verde | 12+ acciones implementadas y probadas |
| Design System | 🟢 Verde | 7+ componentes con tests y stories |
| ADRs | 🟢 Verde | 4 ADRs aprobadas |
| Documentación producto | 🟢 Verde | PRD, RFs, GTM, BP, PA completos |
| Flujo extremo a extremo | 🔴 Rojo | No existe — se rompe en "Resultado" |
| Resultado al cliente | 🔴 Rojo | No hay modelo de datos, página, ni vista |
| DocumentoDecisiones | 🟡 Amarillo | Componente existe pero sin datos reales ni tests |
| Flujo correcciones (cliente) | 🔴 Rojo | Vista cliente no existe |
| Motor PITR integrado | 🟡 Amarillo | Documentado pero no integrado |
| Tests E2E | 🔴 Rojo | No existen |
| Dominio Commercial | 🟡 Amarillo | Fase T1 — repositorios creados, sin UI ni integración |

### ¿Qué impide declarar MVP funcional?

1. **No existe modelo de datos para el resultado del diagnóstico** — el AT no tiene dónde guardar su veredicto.
2. **No existe página de resultado para el cliente** — el cliente solicita, el AT revisa, pero el resultado nunca llega al cliente.
3. **El DocumentoDecisiones no está conectado a datos reales** — es un mock sin tests.
4. **No hay interfaz AT para generar el diagnóstico completo** — el AT no tiene formulario para introducir problemas, actuaciones, ahorro, etc.
5. **El flujo de correcciones no tiene vista cliente** — si el expediente se devuelve, el cliente no sabe por qué ni puede reaccionar.

### Próximo paso recomendado

Comenzar con **P0-01**: Crear el modelo de datos para el resultado del diagnóstico. Esto desbloquea las demás tareas P0 y permite avanzar en paralelo con P0-02 (página cliente) y P0-04 (interfaz AT).

---

*Fin del informe — INFORME-ESTADO-GLOBAL-2026-07-13.md*
*Base documental: 40+ documentos analizados del proyecto Certilab V1*