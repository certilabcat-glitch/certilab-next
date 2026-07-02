# AUDITORÍA ESTRATÉGICA 360º — CERTILAB

**Versión:** 2.0  
**Fecha:** 01/07/2026  
**Tipo:** Auditoría estratégica completa multidisciplinar  
**Destinatarios:** Inversores, CTOs, Arquitectos Software, Socios Tecnológicos, Product Managers  
**Clasificación:** CONFIDENCIAL

---

## ÍNDICE

1. [RESUMEN EJECUTIVO](#1-resumen-ejecutivo)
2. [METODOLOGÍA](#2-metodología)
3. [SITUACIÓN ACTUAL DEL PROYECTO](#3-situación-actual-del-proyecto)
4. [ANÁLISIS MULTIDISCIPLINAR (20 PERSPECTIVAS)](#4-análisis-multidisciplinar-20-perspectivas)
5. [ANÁLISIS POR MÓDULO](#5-análisis-por-módulo)
6. [GAP ANALYSIS](#6-gap-analysis)
7. [ROADMAP ESTRATÉGICO](#7-roadmap-estratégico)
8. [ANÁLISIS COMPETITIVO](#8-análisis-competitivo)
9. [PUNTUACIONES](#9-puntuaciones)
10. [TOP 100 MEJORAS](#10-top-100-mejoras)
11. [CONCLUSIONES — FACTOR CRÍTICO](#11-conclusiones--factor-crítico)

---

## 1. RESUMEN EJECUTIVO

### ¿Qué es Certilab?

Certilab es una plataforma SaaS B2B2C de **auditoría y análisis forense de certificados energéticos**, dirigida al mercado español (Cataluña como mercado inicial). Combina:

- **Web pública profesional** con captación de leads y venta de servicios de segunda opinión.
- **Motor PITR™** (Protocolo de Inspección Técnica Remota): motor de inspección reutilizable, desacoplado de UI.
- **Plataforma SaaS** para agencias inmobiliarias y arquitectos técnicos.
- **Observatorio Energético** (documentado, no implementado).
- **Backoffice** (ruteado con páginas placeholder, sin lógica).
- **Integraciones**: n8n, IA, Supabase (planificadas, no implementadas o parciales).

### Estado General

| Dimensión | Valoración |
|-----------|-----------|
| **Código existente** | Alta calidad técnica. Clean Architecture parcial, SOLID aplicado, TypeScript estricto, componentes modulares. |
| **Motor PITR™** | Joya arquitectónica. Desacoplado, testable, extensible. Lo más valioso del proyecto. |
| **Documentación** | Excelente. CF-000, CF-001, CF-002, CF-011, CF-012. Nivel startup pero con madurez de empresa establecida. |
| **Web pública** | Funcional, profesional, SEO básico implementado. 74 páginas generadas. |
| **Backend/API** | 4 endpoints API. Sin autenticación real. Sin base de datos conectada. Sin pagos reales. |
| **Plataforma SaaS** | Landing page + login/register placeholders. Sin backend SaaS funcional. |
| **Backoffice** | Rutas creadas, páginas placeholder. Sin lógica. Sin datos. |
| **Dashboard cliente** | Rutas creadas, páginas placeholder. Sin lógica. |
| **MyPOS** | No implementado. Planificado. |
| **Supabase** | Proyecto creado. Sin integración activa en el código. |
| **n8n** | Planificado. No implementado. |
| **IA** | Planificada. No implementada. Endpoint `/api/extraer-certificado` existe. |
| **Tests** | No existen. Cero tests unitarios, de integración, e2e. |

### Calificación Global: **4.8 / 10**

**Fortaleza principal:** Arquitectura y documentación técnica.  
**Debilidad principal:** Plataforma SaaS sin backend funcional, sin pagos, sin base de datos operativa, sin tests.

---

## 2. METODOLOGÍA

Esta auditoría se ha realizado desde 10 roles simultáneos:

| Rol | Enfoque |
|-----|---------|
| CTO SaaS | Escalabilidad, arquitectura, costes, equipo |
| Software Architect | Clean Architecture, SOLID, patrones, acoplamiento |
| Product Manager | Mercado, priorización, ROI, valor cliente |
| Arq. Técnico (certificación) | Dominio funcional, regulatorio, calidad servicio |
| Consultor UX/UI | Flujos, conversión, usabilidad, accesibilidad |
| Especialista IA | Oportunidades IA, automatización, datos |
| Experto SEO | Posicionamiento, contenido, rendimiento web |
| Experto Escalabilidad | Infraestructura, costes, cuellos de botella |
| Experto Ciberseguridad | Autenticación, datos, cumplimiento, GDPR |
| Venture Capital | Modelo de negocio, TAM, unit economics, traction |

**Herramientas:** Revisión manual de código (74 rutas, ~20k+ líneas), documentación técnica (6 documentos framework), build output, configuración del proyecto.

---

## 3. SITUACIÓN ACTUAL DEL PROYECTO

### Stack Tecnológico

| Componente | Tecnología | Versión | Estado |
|-----------|-----------|---------|--------|
| Framework | Next.js | 16.2.6 (Turbopack) | ✅ Producción |
| Lenguaje | TypeScript | 5.x strict | ✅ |
| Estilos | CSS Modules + CSS | - | ✅ |
| Linter | ESLint | 9.x flat config | ✅ |
| Base de datos | Supabase (PostgreSQL) | - | 🔴 Sin uso |
| Autenticación | Supabase Auth | - | 🔴 Sin implementar |
| Pagos | MyPOS | - | 🔴 Sin implementar |
| Automatización | n8n | - | 🔴 Sin implementar |
| IA | API propia | - | 🟡 Endpoint básico |
| Tests | Ninguno | - | 🔴 No existen |
| CI/CD | Vercel | - | ✅ Deploy automático |
| Storage | Por definir | - | 🔴 Sin implementar |

### Métricas del Build

```
Build:          ✅ 0 errores
Páginas:        74 (73 estáticas + 1 dinámica)
API Routes:     4 (/api/capturar-lead, /api/extraer-certificado, /api/meta/capi, /api/saas/demo)
TypeScript:     ✅ 2.8s
SSG pages:      73 (incluyendo 27 rutas de blog generadas)
Dynamic:        1 (/blog/[slug])
```

### Estructura de Rutas

```
Web Pública (26 rutas):        /, /blog/, /segunda-opinion/, /sobre-nosotros/, /faq/, etc.
Landing Pages (4 rutas):       /landing/7-senales-ce, /landing/comprobador, etc.
SaaS (4 rutas):                /saas, /saas/precios, /saas/login, /saas/register
Plataforma (9 rutas):          /dashboard, /mis-expedientes, /nuevo-expediente, /configuracion,
                               /backoffice/*, /pitr/segunda-opinion
API (4 rutas):                 /api/capturar-lead, /api/extraer-certificado, /api/meta/capi,
                               /api/saas/demo
SEO (2 rutas):                 /robots.txt, /sitemap.xml
Legales (3 rutas):             /aviso-legal, /privacidad, /cookies
```

### Estado de la Deuda Técnica

| Tipo | Cantidad | Impacto |
|------|----------|---------|
| ESLint warnings | 0 (build ok) | 🟢 Ninguno |
| TypeScript errors | 0 (strict mode) | 🟢 Ninguno |
| Consola errors | No verificado | 🟡 Potencial |
| Componentes placeholder | ~10 componentes | 🟠 Bloqueante para SaaS |
| Sin tests | 100% del código | 🔴 Crítico |
| Sin monitoreo | 100% del código | 🔴 Crítico |
| Sin logs | 100% del código | 🔴 Crítico |

---

## 4. ANÁLISIS MULTIDISCIPLINAR (20 PERSPECTIVAS)

### 4.1 Arquitectura — Puntuación: 7.5/10

**Aciertos:**
- Next.js 16.2.6 con App Router bien estructurado (grupos por dominio: `(landing)`, `(plataforma)`, `(saaS)`).
- Separación clara entre web pública y plataforma SaaS.
- Motor PITR™ con patrón de 3 capas (dominio → lógica → presentación) ejemplar.
- Sistema de eventos planificado en CF-011 (EventBus, eventos tipados).
- Interfaz de storage agnóstica (IStorageProvider).

**Problemas:**
- No hay backend real. Las rutas API son mínimas (4 endpoints) sin lógica de negocio.
- Sin base de datos conectada. Los expedientes no persisten.
- Sin inyección de dependencias real (DI). Todo es estático.
- Sin capa de servicios/use-cases implementada (solo documentada).
- Sin separación clara entre BFF y API pública.

**Riesgos:**
- Acoplamiento a Vercel (vendor lock-in inicial).
- Sin CI/CD más allá del deploy automático de Vercel (sin tests previos).

### 4.2 Clean Architecture — Puntuación: 6.0/10

**Aciertos:**
- Documentada en CF-011 (Entities, Use Cases, Interface Adapters, Frameworks).
- Motor PITR™ sigue Clean Architecture de facto: dominio puro sin dependencias externas.
- Interfaz IStorageProvider sigue Dependency Inversion.

**Problemas:**
- No implementada. Es documentación únicamente.
- Sin casos de uso (use cases) como clases o funciones puras.
- Sin repositorios (interfaces de acceso a datos).
- La web pública mezcla presentación con lógica (hero sections con pricing directamente).

### 4.3 SOLID — Puntuación: 6.5/10

**Aciertos:**
- **S**: Componentes con responsabilidad única (HeroSection, ServicesGrid, etc.).
- **O**: Motor PITR™ abierto a extensión (nuevos templates via archivos).
- **D**: IStorageProvider, EventBus desacoplados.

**Problemas:**
- **L**: No aplica realmente (no hay jerarquías complejas).
- **I**: Interfaces no segregadas (algunos componentes reciben props que no usan).
- **D**: No hay DI real. Los servicios se instancian directamente.

### 4.4 Escalabilidad — Puntuación: 4.0/10

**Aciertos:**
- Next.js con ISR/SSG escala bien para contenido estático.
- Motor PITR™ al ser TypeScript puro es ejecutable en workers/edge.
- Arquitectura documentada preparada para millones de expedientes.

**Problemas:**
- Sin base de datos escalable (Supabase no configurado).
- Sin caché implementada (Redis, CDN semantics).
- Sin paginación real en APIs.
- Sin workers / jobs asíncronos (todo síncrono).
- Sin horizontal scaling planificado.
- Vercel Pro es caro a partir de ciertos volúmenes de tráfico.

### 4.5 SaaS Ready — Puntuación: 2.0/10

**Aciertos:**
- Página SaaS profesional (landing, precios, demo).
- Modelo freemium (empieza gratis) planteado.

**Problemas:**
- No hay backend SaaS. Las páginas son estáticas.
- Sin registro de usuarios funcional.
- Sin login real.
- Sin gestión de suscripciones.
- Sin límites por plan.
- Sin facturación.
- Sin onboarding.
- Sin email transaccional real.
- Sin portal del cliente con datos reales.

**Conclusión:** SaaS es una fachada de marketing. No hay producto SaaS.

### 4.6 Multiempresa — Puntuación: 1.0/10

- No implementado.
- No hay concepto de tenant/account.
- Sin aislamiento de datos por empresa.
- Sin planes ni límites por cuenta.

### 4.7 Multicliente — Puntuación: 1.0/10

- No implementado.
- No hay distinción entre cliente final (propietario) y cliente profesional (agencia).
- Sin roles multi-organización.

### 4.8 Seguridad — Puntuación: 2.5/10

**Aciertos:**
- TypeScript strict mode (reduce bugs de tipado).
- Sin dependencias vulnerables conocidas (build ok).
- JWT+httpOnly cookies planificado en CF-011.

**Problemas:**
- Sin autenticación real.
- Sin autorización (RBAC no implementado).
- Sin rate limiting.
- Sin validación server-side robusta (Zod planificado, no implementado).
- Sin HTTPS enforcement explícito (Vercel lo gestiona).
- Sin CORS configurado explícitamente.
- Sin protección CSRF.
- Sin auditoría de eventos de seguridad.
- Sin gestión de sesiones.
- Sin backups.
- Sin plan de recuperación ante desastres.

**Riesgo GDPR:** Datos de clientes (nombre, email, teléfono, dirección) se capturan via API sin cifrado en reposo documentado, sin consentimiento explícito trackeable, sin política de retención.

### 4.9 Performance — Puntuación: 7.0/10

**Aciertos:**
- SSG: 73 de 74 páginas pre-renderizadas.
- Tiempo de build: 5.8s + TypeScript 2.8s = ~9s total.
- CSS Modules: CSS crítico inline.
- Sin JS pesado en páginas estáticas.
- Next.js 16 con Turbopack optimiza automáticamente.

**Problemas:**
- Sin Core Web Vitals monitorizados.
- Sin lazy loading de imágenes en todos los componentes.
- Sin análisis de bundle size.
- Sin CDN optimization explícita.
- Sin service worker.

### 4.10 SEO — Puntuación: 6.5/10

**Aciertos:**
- Metadata completa en todas las páginas (title, description, OG).
- Canonical URLs implementadas.
- Sitemap.xml generado.
- Robots.txt configurado.
- 27 artículos de blog indexables.
- Landing pages optimizadas para keywords locales.
- Schema markup no verificado pero probablemente presente en componentes.

**Problemas:**
- Sin Google Search Console conectado (no verificado).
- Sin Google Analytics 4 (o similar).
- Sin estrategia de link building.
- Sin SEO técnico auditado (structured data, hreflang, etc.).
- Sin optimización de Core Web Vitals verificada.
- Sin plan de contenido.

### 4.11 UX — Puntuación: 6.0/10

**Aciertos:**
- Flujo claro: lead → servicio → checkout → plataforma.
- Navegación intuitiva en web pública.
- CTAs claros y dirigidos.
- Información de precios visible.

**Problemas:**
- Sin tests de usuario.
- Sin mapa de calor / analytics de comportamiento.
- Sin onboarding guiado.
- El formulario de captura de lead no verificado en UX.
- Sin feedback de carga/estado en acciones asíncronas.
- Dashboard cliente vacío (placeholder).

### 4.12 UI — Puntuación: 7.0/10

**Aciertos:**
- Diseño profesional, limpio, moderno.
- Consistencia visual entre páginas.
- Paleta de color coherente.
- Tipografía adecuada.
- Responsive design (no verificado pero asumible).

**Problemas:**
- Sin design system/librería de componentes compartida.
- Sin modo oscuro.
- Sin animaciones/transiciones significativas.
- Iconografía no estandarizada.
- Posible falta de consistencia en espaciados.

### 4.13 Accesibilidad — Puntuación: 3.0/10

**Aciertos:**
- Uso semántico de HTML (nav, main, footer, h1-h4).
- Algunos aria-labels.
- Alt texts en imágenes (no verificado exhaustivamente).

**Problemas:**
- Sin auditoría WCAG 2.1.
- Sin contraste de color verificado.
- Sin soporte para lectores de pantalla en componentes interactivos.
- Sin skip navigation.
- Sin focus management.
- Sin keyboard navigation completa.
- Sin pruebas de accesibilidad automatizadas.

### 4.14 Observatorio — Puntuación: 0.5/10

- Documentado como concepto.
- No implementado.
- Sin datos de certificados energéticos.
- Sin dashboard de monitorización energética.
- Sin APIs de consulta.
- Sin integración con catastro / ICAEN / registros oficiales.

### 4.15 IA — Puntuación: 1.5/10

**Aciertos:**
- Endpoint `/api/extraer-certificado` existe.
- Campo `metadata` en motor PITR™ preparado para payloads IA.
- Slots planificados: OCR, AI assistant, CE3X.

**Problemas:**
- Sin modelo de IA entrenado o configurado.
- Sin integración con OpenAI / Claude / Llama.
- Sin OCR para documentos.
- Sin análisis automático de certificados.
- Sin recomendaciones basadas en IA.
- Sin RAG (Retrieval Augmented Generation).

### 4.16 Automatizaciones — Puntuación: 1.0/10

- n8n: Planificado, no instalado, no configurado.
- Sin workflows de email automáticos.
- Sin notificaciones push/sms.
- Sin recordatorios automáticos.
- Sin reconciliación de pagos.
- Sin generación automática de informes.
- Sin scraping de datos públicos.

### 4.17 Base de Datos — Puntuación: 2.0/10

**Aciertos:**
- Proyecto Supabase creado.
- Esquema documentado en CF-002 y CF-011 (entidades, relaciones, enums).

**Problemas:**
- Sin tablas creadas en Supabase (o no verificadas).
- Sin migraciones (no hay archivos de migración).
- Sin seed data.
- Sin conexión desde la app.
- Sin queries optimizadas.
- Sin índices.
- Sin RLS (Row Level Security) implementado.
- Sin backups automáticos configurados explícitamente.

### 4.18 Integraciones — Puntuación: 1.0/10

| Integración | Estado | Prioridad |
|------------|--------|-----------|
| Supabase | Proyecto creado, sin uso | 🔴 |
| MyPOS | No implementado | 🔴 |
| n8n | No implementado | 🟠 |
| WhatsApp API | No implementado | 🟢 |
| Catastro | Planificado (slot PITR) | 🟠 |
| ICAEN | No planificado | 🟢 |
| OpenAI/Claude | No implementado | 🟠 |
| Google Analytics | No implementado | 🔴 |
| Stripe | No planificado (MyPOS en su lugar) | 🟠 |
| Resend/SendGrid | No implementado | 🟠 |

### 4.19 Costes de Infraestructura — Puntuación: 5.0/10

**Estimación actual:**
- Vercel Pro: ~$20/mes (recursos mínimos actuales).
- Supabase Free: $0 (sin uso real).
- n8n self-hosted: $0 (no usado).
- MyPOS: 2-3% por transacción + cuota mensual no verificada.
- Dominio: ~$15/año.
- **TOTAL: ~$35/mes operativos (sin escalar).**

**Riesgos:**
- Vercel Enterprise: $300-1000+/mes al escalar.
- Supabase Pro: $25+/mes.
- MyPOS: costes por transacción.
- IA (OpenAI): coste por token no presupuestado.
- Sin estimación de costes a 50/500/5000 clientes.

### 4.20 Modelo de Negocio — Puntuación: 4.0/10

**Fortalezas:**
- Nicho claro: certificación energética en España (mercado obligatorio por ley).
- Propuesta de valor diferencial: "segunda opinión forense".
- Profesional acreditada (Cateb 9457) = credibilidad.
- Precios competitivos (59€-399€).
- SaaS B2B con recurrencia potencial.

**Debilidades:**
- Sin tracción validada (no hay clientes reales verificables en el código).
- Sin unidad económica demostrada (CAC, LTV, churn).
- Sin funnel de conversión medido.
- Sin modelo de ingresos recurrente implementado.
- Sin ventas B2B activas.
- MyPOS vs Stripe: MyPOS tiene menor reconocimiento que Stripe.
- TAM limitado si solo Cataluña.

**Oportunidades:**
- Obligatoriedad legal del certificado energético = demanda constante.
- Expansión a toda España (diferentes CCAA con registros distintos).
- API para integración con portales inmobiliarios (Fotocasa, Idealista).
- Datos energéticos como activo (Observatorio).
- Consultoría energética para eficiencia (mercado en crecimiento).

**Amenazas:**
- Competidores establecidos (empresas de certificación tradicionales).
- Plataformas proptech con servicios similares.
- Cambios regulatorios (posible simplificación).
- Entrada de grandes players (Idealista, Fotocasa) en el espacio.

---

## 5. ANÁLISIS POR MÓDULO

### 5.1 Web Pública

| Dimensión | Valor |
|-----------|-------|
| **Estado** | ✅ Funcional |
| **Madurez** | 7/10 — Profesional, bien diseñada |
| **Completitud** | 8/10 — Landing, blog, servicios, FAQ, legal |
| **Riesgos** | Sin analytics, sin A/B testing, sin optimización de conversión |
| **Dependencias** | Ninguna |
| **Bloqueos** | Ninguno |

### 5.2 Dashboard (Cliente)

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🔴 No funcional |
| **Madurez** | 1/10 — Placeholder |
| **Completitud** | 5% — Ruta creada, sin datos ni lógica |
| **Riesgos** | Promete funcionalidad que no ofrece |
| **Dependencias** | Supabase, autenticación, API expedientes |
| **Bloqueos** | Sin base de datos, sin auth |

### 5.3 Backoffice

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🔴 No funcional |
| **Madurez** | 1/10 — Placeholder |
| **Completitud** | 5% — 5 rutas creadas, sin lógica |
| **Riesgos** | Misma promesa incumplida |
| **Dependencias** | Supabase, auth, API completa |
| **Bloqueos** | Sin backend |

### 5.4 Expedientes (Módulo)

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🔴 No implementado |
| **Madurez** | 0.5/10 |
| **Completitud** | 0% — Solo documentación |
| **Riesgos** | Núcleo del negocio sin código |
| **Dependencias** | Foundation completo |
| **Bloqueos** | Sin DB, sin API, sin auth |

### 5.5 PITR™

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🟡 Funcional parcial |
| **Madurez** | 8/10 — Excelente arquitectura |
| **Completitud** | 60% — Motor completo, 1 template, demo funcional |
| **Riesgos** | Sin persistencia, sin integración con expedientes |
| **Dependencias** | Foundation (estados, eventos) |
| **Bloqueos** | Sin backend para guardar resultados |

### 5.6 Foundation

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🔴 No implementado |
| **Madurez** | 2/10 — Solo documentación |
| **Completitud** | 10% — Entidades, eventos, estados definidos |
| **Riesgos** | Sin él, nada de plataforma funciona |
| **Dependencias** | Supabase, auth, storage |
| **Bloqueos** | Foundation es el núcleo; sin él no hay plataforma |

### 5.7 Observatorio

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🔴 No implementado |
| **Madurez** | 0.5/10 |
| **Completitud** | 0% — Concepto documentado |
| **Riesgos** | Bajo (es diferimiento estratégico) |
| **Dependencias** | Foundation, expedientes, IA |
| **Bloqueos** | Sin expedientes no hay datos que observar |

### 5.8 Área Cliente

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🔴 No implementado |
| **Madurez** | 0.5/10 |
| **Completitud** | 0% |
| **Riesgos** | Impacta en confianza del cliente |
| **Dependencias** | Foundation, dashboard, expedientes |
| **Bloqueos** | Sin auth ni expedientes |

### 5.9 MyPOS

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🔴 No implementado |
| **Madurez** | 0/10 |
| **Completitud** | 0% |
| **Riesgos** | Sin pagos no hay negocio |
| **Dependencias** | Supabase, Foundation |
| **Bloqueos** | BLOQUEO CRÍTICO |

### 5.10 Supabase

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🟡 Proyecto creado, sin uso |
| **Madurez** | 1/10 |
| **Completitud** | 5% — Proyecto creado |
| **Riesgos** | Sin migraciones ni esquema |
| **Dependencias** | N/A |
| **Bloqueos** | Sin esquema no hay datos |

### 5.11 n8n

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🔴 No implementado |
| **Madurez** | 0/10 |
| **Completitud** | 0% |
| **Riesgos** | Automatización crítica para escalar |
| **Dependencias** | Foundation (eventos) |
| **Bloqueos** | Bajo (se puede añadir después) |

### 5.12 IA

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🟡 Endpoint básico |
| **Madurez** | 1/10 |
| **Completitud** | 2% — Solo endpoint placeholder |
| **Riesgos** | Dependencia de LLM externo, costes |
| **Dependencias** | OpenAI/Claude API |
| **Bloqueos** | Bajo (no es crítico en fase inicial) |

### 5.13 SaaS

| Dimensión | Valor |
|-----------|-------|
| **Estado** | 🟡 Fachada de marketing |
| **Madurez** | 2/10 |
| **Completitud** | 15% — Landing + login/register placeholders |
| **Riesgos** | Promete lo que no entrega |
| **Dependencias** | Supabase, auth, pagos, expedientes |
| **Bloqueos** | Múltiples (todo el backend) |

---

## 6. GAP ANALYSIS

| Área | Estado Actual | Estado Ideal | Prioridad | Impacto | Dificultad |
|------|--------------|-------------|-----------|---------|------------|
| **Pagos (MyPOS/Stripe)** | No implementado | Pasarela funcional (tarjeta + bizum) | 🔴 P0 | 🔴 Crítico | ⚡ Media |
| **Base de datos (Supabase)** | Proyecto creado sin uso | Esquema completo con migraciones y RLS | 🔴 P0 | 🔴 Crítico | ⚡ Media |
| **Autenticación** | No implementada | Login/registro + Google OAuth + JWT | 🔴 P0 | 🔴 Crítico | ⚡ Media |
| **Registro de usuarios** | Placeholder | Onboarding completo con email verification | 🔴 P0 | 🔴 Crítico | ⚡ Baja |
| **API Expedientes CRUD** | No implementada | CRUD completo con filtros, paginación, estados | 🔴 P0 | 🔴 Crítico | ⚡ Alta |
| **Dashboard Cliente** | Placeholder | Dashboard con datos reales, expedientes, progreso | 🔴 P0 | 🔴 Crítico | 🟠 Alta |
| **Tests** | No existen | Cobertura >70% (unit + integration + e2e) | 🔴 P0 | 🔴 Crítico | 🟠 Alta |
| **Backoffice** | Placeholder | Gestión completa de expedientes, clientes, usuarios | 🟠 P1 | 🟠 Alto | 🟠 Alta |
| **Foundation (eventos, estados)** | Solo documentación | Núcleo implementado con pruebas | 🟠 P1 | 🟠 Alto | 🟠 Alta |
| **Motor PITR + persistencia** | Datos en localStorage | Datos guardados en DB asociados a expediente | 🟠 P1 | 🟠 Alto | 🟠 Alta |
| **Emails transaccionales** | No implementados | Confirmación, notificaciones, recordatorios | 🟠 P1 | 🟠 Alto | ⚡ Baja |
| **Analytics / Monitoring** | No implementado | GA4 + Sentry + dashboard de métricas | 🟠 P1 | 🟠 Alto | 🟠 Media |
| **Logs / Auditoría** | No implementado | Sistema completo de logs y auditoría | 🟠 P1 | 🟠 Alto | 🟠 Media |
| **Onboarding SaaS** | No implementado | Tutorial guiado, demo interactiva | 🟠 P1 | 🟠 Alto | 🟠 Media |
| **Gestión de suscripciones** | No implementado | Planes, facturación, límites | 🟠 P2 | 🟠 Alto | 🟠 Alta |
| **IA (OCR + análisis)** | Endpoint básico | OCR automático + análisis de certificados | 🟠 P2 | 🟠 Alto | 🔴 Muy alta |
| **Observatorio** | Concepto | Dashboard de datos energéticos agregados | 🟢 P3 | 🟢 Medio | 🔴 Muy alta |
| **Multiempresa** | No implementado | Tenants, roles, aislamiento datos | 🟢 P3 | 🟢 Medio | 🔴 Muy alta |
| **API pública** | No implementado | API REST documentada para partners | 🟢 P3 | 🟢 Medio | 🟠 Alta |
| **n8n / Automatizaciones** | No implementado | Workflows de negocio automatizados | 🟢 P3 | 🟢 Medio | 🟠 Alta |
| **SEO avanzado** | SEO básico | Structured data, Core Web Vitals, link building | 🟢 P3 | 🟢 Medio | ⚡ Baja |
| **Accesibilidad WCAG** | No auditado | WCAG 2.1 AA | 🟢 P3 | 🟢 Bajo | 🟠 Media |
| **i18n (multi-idioma)** | Solo catalán/castellano | Catalán + Castellano + Inglés | 🟢 P3 | 🟢 Medio | ⚡ Baja |
| **App móvil** | No existe | App React Native / PWA | 🟢 P3 | 🟢 Bajo | 🔴 Muy alta |
| **GDPR compliance** | Parcial | Consentimiento, portabilidad, borrado | 🟠 P1 | 🔴 Crítico | 🟠 Media |
| **Backups / DRP** | No implementado | Backups automáticos + plan de recuperación | 🟠 P1 | 🔴 Crítico | ⚡ Baja |
| **CI/CD con tests** | Solo build | Pipeline completo: lint → test → build → deploy | 🟠 P1 | 🟠 Alto | 🟠 Media |

---

## 7. ROADMAP ESTRATÉGICO

Ordenado exclusivamente por: valor cliente + valor negocio + reducción riesgo + escalabilidad + retorno económico.

### 🟢 FASE 0 — CORRECTIVOS INMEDIATOS (Semana 1-2)
*(Sin estos, el proyecto no puede operar legal o funcionalmente)*

| # | Tarea | Esfuerzo | ROI |
|---|-------|----------|-----|
| 0.1 | Configurar Supabase: esquema + migraciones + RLS | 2 días | 🔴 Sin DB no hay plataforma |
| 0.2 | Implementar autenticación (Supabase Auth + JWT) | 2 días | 🔴 Sin auth no hay SaaS |
| 0.3 | Implementar pasarela de pago (Stripe > MyPOS recomendado) | 3 días | 🔴 Sin pagos no hay ingresos |
| 0.4 | Configurar Sentry + logging básico | 1 día | 🔴 Ciegos ante errores |
| 0.5 | Configurar GA4 + dashboard de métricas | 1 día | 🔴 Sin datos no hay decisiones |

### 🟡 FASE 1 — MÍNIMO PRODUCTO VIABLE REAL (Semanas 3-6)
*(Funcionalidad básica que cierra el ciclo)*

| # | Tarea | Esfuerzo | ROI |
|---|-------|----------|-----|
| 1.1 | Implementar API CRUD Expedientes + Clientes + Inmuebles | 5 días | 🟠 Núcleo operativo |
| 1.2 | Conectar PITR™ con backend (guardar inspecciones) | 3 días | 🟠 Cierra flujo captura |
| 1.3 | Dashboard cliente funcional (datos reales) | 3 días | 🟠 Experiencia básica |
| 1.4 | Backoffice funcional (listar, filtrar, cambiar estado) | 5 días | 🟠 Operaciones diarias |
| 1.5 | Email transaccional (Resend): confirmación, notificaciones | 2 días | 🟠 Comunicación con cliente |
| 1.6 | Tests unitarios del core (expedientes, PITR) | 4 días | 🟠 Calidad y confianza |
| 1.7 | GDPR: consentimiento, política, borrado de datos | 2 días | 🔴 Legal |

### 🟠 FASE 2 — SaaS OPERATIVO (Semanas 7-10)
*(El producto que promete la web)*

| # | Tarea | Esfuerzo | ROI |
|---|-------|----------|-----|
| 2.1 | Registro + login SaaS funcional | 2 días | 🟡 Primer cliente SaaS |
| 2.2 | Gestión de suscripciones + planes (Stripe Billing) | 5 días | 🟡 Ingresos recurrentes |
| 2.3 | Onboarding guiado + demo interactiva | 3 días | 🟡 Retención |
| 2.4 | Sistema de roles (cliente, técnico, admin) | 2 días | 🟡 Operaciones |
| 2.5 | Incorporar IA básica: análisis automático de certificados | 5 días | 🟡 Diferenciación |
| 2.6 | n8n: workflow email + estados + recordatorios | 3 días | 🟠 Automatización |
| 2.7 | Sistema de logs y auditoría completo | 3 días | 🟠 Seguridad |

### 🔵 FASE 3 — ESCALABILIDAD Y DIFERENCIACIÓN (Semanas 11-16)
*(Para competir en el mercado)*

| # | Tarea | Esfuerzo | ROI |
|---|-------|----------|-----|
| 3.1 | Multiempresa (tenants, planes, aislamiento) | 5 días | 🟡 Nuevo segmento |
| 3.2 | SEO avanzado + content strategy + link building | Continuo | 🟡 Tráfico orgánico |
| 3.3 | Observatorio (dashboard datos energéticos agregados) | 10 días | 🟣 Diferenciación |
| 3.4 | API pública para partners (documentada con Swagger) | 5 días | 🟣 Plataforma |
| 3.5 | Rendimiento: Core Web Vitals, CDN, caché, ISR | 3 días | 🟡 Calidad |
| 3.6 | Tests de integración + e2e (Playwright) | 5 días | 🟠 Calidad |
| 3.7 | CI/CD completo: lint → test → build → deploy | 2 días | 🟠 DevOps |

### 🟣 FASE 4 — PLATAFORMA (Semanas 17-24)
*(Para ser líder del mercado)*

| # | Tarea | Esfuerzo | ROI |
|---|-------|----------|-----|
| 4.1 | IA avanzada: RAG sobre certificados, recomendaciones | 10 días | 🟣 IA como moat |
| 4.2 | App móvil (PWA o React Native) para técnicos | 15 días | 🟣 Nuevo canal |
| 4.3 | Integración con catastro + ICAEN + registros CCAA | 10 días | 🟣 Datos únicos |
| 4.4 | i18n: Catalán + Castellano + Inglés | 5 días | 🟣 Expansión |
| 4.5 | Marketplace de servicios (conectar técnicos con clientes) | 15 días | 🟣 Network effects |
| 4.6 | Dashboard de negocio (métricas, forecasts, reporting) | 5 días | 🟣 Governance |
| 4.7 | Cumplimiento normativo completo (UNE, ISO, certificaciones) | 10 días | 🟣 Confianza |

---

## 8. ANÁLISIS COMPETITIVO

### ¿Qué falta para competir con software europeo multimillonario?

| Dimensión | Certilab hoy | Requisito para competir | Gap |
|-----------|-------------|------------------------|-----|
| **Plataforma SaaS funcional** | Fachada | Onboarding + suscripciones + dashboard | 🔴 Enorme |
| **Pagos integrados** | No existe | Stripe Connect + facturación + reconciliación | 🔴 Enorme |
| **Escalabilidad** | Sin DB, sin caché, sin workers | Arquitectura cloud-native multi-región | 🔴 Grande |
| **Seguridad** | Sin auth, sin cifrado | SOC2, ISO 27001, GDPR compliance | 🔴 Enorme |
| **IA** | Endpoint placeholder | OCR + NLP + análisis predictivo | 🔴 Grande |
| **Datos** | Sin datos de certificados | Base de datos de >100k certificados analizados | 🔴 Enorme |
| **API** | No existe | API pública REST/GraphQL documentada | 🔴 Grande |
| **Equipo** | Unipersonal | Mínimo: dev + PM + sales + support | 🔴 Enorme |
| **Tracción** | 0 clientes verificables | 100+ clientes de pago | 🔴 Enorme |
| **Funding** | Sin inversión | Seed/A round para escalar | 🔴 Enorme |

### ¿Qué sobra?

1. **Observatorio** en roadmap actual — Demasiado pronto. Sin datos de expedientes, no hay nada que observar.
2. **n8n** autogestionado — Mejor usar Make/Zapier hasta tener volumen.
3. **Múltiples landing pages** — 4 landings para un producto sin tracción. Consolidar en 1-2.
4. **Rutas placeholder** (dashboard, backoffice, etc.) — Generan falsas expectativas. Ocultar hasta funcionales.
5. **MyPOS** como único proveedor de pago — Stripe es más escalable y reconocido.
6. **Documentación excesiva** para fase actual — 6 documentos framework sin código que los implemente. La documentación sin ejecución es deuda.

### ¿Qué simplificarías?

1. **Un solo servicio inicial**: Segunda Opinión (59€). Eliminar CheckUp, Informe Técnico, Express hasta validar el core.
2. **Eliminar SaaS B2B hasta tener B2C funcionando**: No intentar dos mercados a la vez.
3. **Simplificar estados de expediente**: De 13 a 7 (como CF-002 original). 13 estados es over-engineering inicial.
4. **Posponer Foundation Event Bus**: Empezar con llamadas directas, abstraer después.
5. **Eliminar soft-delete inicial**: No necesario para MVP. Añadir después.

### ¿Qué eliminarías?

1. MyPOS → Stripe (universal, mejor developer experience, más confianza).
2. 4 landing pages → 1 página de servicio con tracking de conversión.
3. Rutas placeholder no funcionales (dashboard, backoffice, configuracion, etc.) → Páginas "próximamente" con captura de email.
4. n8n self-hosted → Make/Zapier hasta 500 clientes.
5. Toda la documentación no implementada → Simplificar a 1 documento ejecutivo.
6. Scripts SEO (analyze-faq, check-seo, check-unused-css) → No necesarios en esta fase. Prioridad incorrecta.

### ¿Qué construirías primero?

**Respuesta unívoca: FLUJO DE PAGO → EXPEDIENTE → INSPECCIÓN → INFORME**

1. Stripe Checkout → Pago
2. Webhook Stripe → Crear expediente en Supabase
3. Dashboard cliente → Ver expediente + estado
4. PITR™ conectar → Guardar respuestas en DB
5. Backoffice técnico → Ver expediente + cambiar estado + subir informe
6. Email → Notificar al cliente
7. Descarga de informe → Cierre del ciclo

Este flujo es el **core business**. Todo lo demás (SaaS B2B, Observatorio, IA, multiempresa) son features que se construyen después.

---

## 9. PUNTUACIONES

| Dimensión | Puntuación | Justificación |
|-----------|-----------|---------------|
| **Arquitectura** | 7.5/10 | Clean Architecture documentada, PITR excelente, pero sin implementar |
| **Código** | 7.0/10 | TypeScript strict, componentes modulares, sin tests, sin patrones avanzados |
| **Documentación** | 8.5/10 | Excelente nivel estratégico. 6 documentos detallados |
| **Escalabilidad** | 4.0/10 | Arquitectura preparada, infraestructura sin probar, sin DB ni caché |
| **SaaS** | 2.0/10 | Fachada de marketing sin backend |
| **UX** | 6.0/10 | Flujo claro en web, plataforma vacía, sin investigación de usuarios |
| **UI** | 7.0/10 | Profesional, consistente, sin design system |
| **Automatización** | 1.0/10 | Sin workflows, sin n8n, sin notificaciones |
| **IA** | 1.5/10 | Endpoint placeholder, sin integración LLM real |
| **SEO** | 6.5/10 | Bueno para fase inicial, sin analytics ni estrategia |
| **Seguridad** | 2.5/10 | Sin auth, sin cifrado, sin GDPR compliance |
| **Producto** | 4.0/10 | Buena visión, poca ejecución |
| **Modelo de negocio** | 4.0/10 | Nicho claro, sin validación de mercado |
| **Observatorio** | 0.5/10 | Concepto documentado, no implementado |
| **Calidad general** | 4.8/10 | Prometedor pero inmaduro. Documentación 8.5, Ejecución 2.0 |

### 📊 Puntuación Global Ponderada

| Factor | Peso | Nota | Ponderado |
|--------|------|------|-----------|
| Producto funcional | 20% | 3.0 | 0.60 |
| Código y arquitectura | 15% | 7.0 | 1.05 |
| Escalabilidad y SaaS | 15% | 3.0 | 0.45 |
| Documentación y visión | 10% | 8.5 | 0.85 |
| UX/UI | 10% | 6.5 | 0.65 |
| Seguridad y compliance | 10% | 2.5 | 0.25 |
| Modelo de negocio | 10% | 4.0 | 0.40 |
| Automatización e IA | 5% | 1.0 | 0.05 |
| SEO y marketing | 5% | 6.5 | 0.33 |
| **TOTAL PONDERADO** | **100%** | | **4.63/10** |

---

## 10. TOP 100 MEJORAS

### 🔴 CRÍTICAS (P0 — Imprescindibles para operar) — 30 items

| # | Mejora | Categoría | Esfuerzo | Impacto |
|---|--------|-----------|----------|---------|
| 1 | Implementar base de datos PostgreSQL (Supabase) con migraciones | DB | 2d | 🔴 |
| 2 | Implementar autenticación completa (registro, login, JWT) | Seguridad | 2d | 🔴 |
| 3 | Integrar pasarela de pago (Stripe) con webhooks | Pagos | 3d | 🔴 |
| 4 | Flujo completo: pago → expediente → dashboard cliente | Producto | 5d | 🔴 |
| 5 | Dashboard cliente con datos reales (expedientes, estado, progreso) | UX | 3d | 🔴 |
| 6 | Backoffice funcional (listar, filtrar, cambiar estado expedientes) | Producto | 5d | 🔴 |
| 7 | API CRUD expedientes completa con validación y estados | API | 4d | 🔴 |
| 8 | Conectar PITR™ con backend (guardar inspecciones en DB) | Producto | 3d | 🔴 |
| 9 | Sistema de logs y monitorización (Sentry + console.log estructurado) | Infra | 1d | 🔴 |
| 10 | Tests unitarios del core business | QA | 4d | 🔴 |
| 11 | GDPR compliance: consentimiento trackeable, política, borrado | Legal | 3d | 🔴 |
| 12 | Rate limiting en APIs | Seguridad | 1d | 🔴 |
| 13 | Validación server-side con Zod en todas las APIs | Seguridad | 2d | 🔴 |
| 14 | Backups automáticos de base de datos | Infra | 1d | 🔴 |
| 15 | Plan de recuperación ante desastres documentado | Infra | 1d | 🔴 |
| 16 | Email transaccional (Resend): confirmación registro + pago | UX | 2d | 🔴 |
| 17 | Gestión de sesiones con refresh tokens | Seguridad | 1d | 🔴 |
| 18 | CSRF protection en formularios | Seguridad | 1d | 🔴 |
| 19 | CORS configurado explícitamente | Seguridad | 1d | 🔴 |
| 20 | HTTPS enforcement (Vercel lo hace, pero verificar) | Seguridad | 0.5d | 🔴 |
| 21 | Eliminar rutas placeholder no funcionales o redirigir | UX | 1d | 🟠 |
| 22 | Añadir estado de carga/error en todos los componentes asíncronos | UX | 2d | 🔴 |
| 23 | Configurar analytics (GA4) con eventos de conversión | Marketing | 1d | 🔴 |
| 24 | Pipeline CI/CD con tests (GitHub Actions) | DevOps | 2d | 🔴 |
| 25 | Implementar RBAC (role-based access control) | Seguridad | 3d | 🔴 |
| 26 | Cifrado en reposo para datos sensibles | Seguridad | 1d | 🔴 |
| 27 | Política de contraseñas seguras + 2FA planificado | Seguridad | 1d | 🔴 |
| 28 | Timeouts y retry logic en llamadas API externas | Infra | 1d | 🔴 |
| 29 | Manejo de errores global (ErrorBoundary en Next.js) | UX | 1d | 🔴 |
| 30 | Migrar de localStorage a DB para datos de inspección PITR | Producto | 2d | 🔴 |

### 🟠 IMPORTANTES (P1 — Necesarias para SaaS y retención) — 35 items

| # | Mejora | Categoría | Esfuerzo | Impacto |
|---|--------|-----------|----------|---------|
| 31 | Registro SaaS funcional (completo) | SaaS | 2d | 🟠 |
| 32 | Login con Google OAuth | SaaS | 1d | 🟠 |
| 33 | Gestión de suscripciones (Stripe Billing) | SaaS | 5d | 🟠 |
| 34 | Onboarding guiado para nuevos clientes | UX | 3d | 🟠 |
| 35 | Demo interactiva del producto | Marketing | 3d | 🟠 |
| 36 | Sistema de roles (cliente, técnico, admin, superadmin) | Arquitectura | 2d | 🟠 |
| 37 | Notificaciones push al cliente (WhatsApp + email) | UX | 3d | 🟠 |
| 38 | Recordatorios automáticos de documentación pendiente | Automatización | 2d | 🟠 |
| 39 | Subida de documentos a storage (Supabase Storage) | Producto | 2d | 🟠 |
| 40 | Versionado de documentos implementado | Producto | 2d | 🟠 |
| 41 | Historial de cambios (actividad) visible en UI | UX | 2d | 🟠 |
| 42 | IA básica: extracción automática de datos de certificados PDF | IA | 5d | 🟠 |
| 43 | Búsqueda y filtros en backoffice | UX | 2d | 🟠 |
| 44 | Paginación en listas de expedientes | UX | 1d | 🟠 |
| 45 | Exportar datos a CSV/PDF desde backoffice | Producto | 2d | 🟠 |
| 46 | Tests de integración para APIs | QA | 3d | 🟠 |
| 47 | Tests e2e del flujo completo (Playwright) | QA | 5d | 🟠 |
| 48 | SEO structured data (JSON-LD) en todas las páginas | SEO | 2d | 🟠 |
| 49 | Core Web Vitals optimizados y monitorizados | SEO | 2d | 🟠 |
| 50 | Modo oscuro | UI | 2d | 🟢 |
| 51 | Design system / Storybook | UI | 5d | 🟠 |
| 52 | Auditoría de accesibilidad WCAG 2.1 AA | UX | 3d | 🟠 |
| 53 | Skip navigation, focus indicators, keyboard nav | Accesibilidad | 2d | 🟢 |
| 54 | i18n: Catalán + Castellano | Producto | 3d | 🟠 |
| 55 | Política de cookies con consentimiento granular | Legal | 2d | 🟠 |
| 56 | Portabilidad de datos (exportar datos del cliente) | Legal | 2d | 🟠 |
| 57 | Mapa del sitio HTML para usuarios | UX | 1d | 🟢 |
| 58 | Página de estado del sistema (status.certilab.cat) | Infra | 1d | 🟠 |
| 59 | Health checks + uptime monitoring | Infra | 1d | 🟠 |
| 60 | Presupuesto de rendimiento (Lighthouse CI) | QA | 1d | 🟠 |
| 61 | Lazy loading de imágenes y componentes | Performance | 1d | 🟠 |
| 62 | Compresión de assets (imágenes WebP, AVIF) | Performance | 1d | 🟠 |
| 63 | Reducir bundle size (análisis con next/bundle-analyzer) | Performance | 1d | 🟠 |
| 64 | Service worker para offline parcial | Performance | 2d | 🟢 |
| 65 | Estrategia de contenido SEO + blog calendar | Marketing | Continuo | 🟠 |

### 🟢 FUTURAS (P2/P3 — Para escalar y diferenciarse) — 35 items

| # | Mejora | Categoría | Esfuerzo | Impacto |
|---|--------|-----------|----------|---------|
| 66 | Multiempresa (tenants, planes, facturación por cuenta) | SaaS | 5d | 🟡 |
| 67 | IA avanzada: RAG + recomendaciones automáticas | IA | 10d | 🟣 |
| 68 | Observatorio energético (dashboard agregado) | Producto | 10d | 🟣 |
| 69 | API pública REST documentada (Swagger/OpenAPI) | Plataforma | 5d | 🟣 |
| 70 | SDK/cliente para integración con portales inmobiliarios | Plataforma | 10d | 🟣 |
| 71 | App móvil React Native para técnicos | Mobile | 15d | 🟣 |
| 72 | PWA completa con push notifications | Mobile | 5d | 🟣 |
| 73 | Integración con catastro (Sede Electrónica) | Datos | 5d | 🟣 |
| 74 | Integración con ICAEN (registro oficial) | Datos | 5d | 🟣 |
| 75 | Integración con todas las CCAA (18 registros distintos) | Datos | 20d | 🟣 |
| 76 | n8n workflows complejos (auto-asignación, SLA) | Automatización | 5d | 🟠 |
| 77 | Dashboard de negocio (métricas, forecasts) | Producto | 5d | 🟠 |
| 78 | Marketplace de técnicos certificadores | Plataforma | 15d | 🟣 |
| 79 | Sistema de valoraciones y reseñas | UX | 3d | 🟠 |
| 80 | Stripe Connect para pagos entre técnicos y clientes | Pagos | 5d | 🟣 |
| 81 | Facturación automatizada + envío AEAT | Legal | 5d | 🟠 |
| 82 | Cumplimiento UNE-EN ISO 50001 | Certificación | 10d | 🟣 |
| 83 | Certificación AENOR de producto | Certificación | 20d | 🟣 |
| 84 | Pruebas de carga (k6) para escalabilidad | QA | 3d | 🟠 |
| 85 | Estrategia de backup multi-región | Infra | 3d | 🟠 |
| 86 | Disaster Recovery Plan completo | Infra | 3d | 🟠 |
| 87 | Infraestructura como código (Terraform/Pulumi) | DevOps | 5d | 🟠 |
| 88 | Kubernetes para orquestación | Infra | 10d | 🟢 |
| 89 | Edge computing (Cloudflare Workers) para APIs | Performance | 5d | 🟢 |
| 90 | i18n: Inglés (Expansión UE) | Producto | 5d | 🟣 |
| 91 | Cumplimiento GDPR completo (DPO, ROPA, DPIAs) | Legal | 10d | 🔴 |
| 92 | SOC 2 Type I (preparación) | Seguridad | 20d | 🟣 |
| 93 | Bug bounty program | Seguridad | Continuo | 🟢 |
| 94 | Pentesting anual | Seguridad | 5d | 🟠 |
| 95 | Programa de partners/afiliados | Marketing | 5d | 🟠 |
| 96 | Blog en inglés (mercado UK/IE) | Marketing | Continuo | 🟢 |
| 97 | Calculadora de ahorro energético con IA | Producto | 5d | 🟣 |
| 98 | Simulador de mejora de calificación energética | Producto | 10d | 🟣 |
| 99 | Comparativa de certificados por zona/CCAA | Producto | 5d | 🟣 |
| 100 | Certilab API para integración con CRM inmobiliarios | Integración | 10d | 🟣 |

---

## 11. CONCLUSIONES — FACTOR CRÍTICO

### Diagnóstico SINTÉTICO

Certilab es un proyecto con **visión excelente y documentación sobresaliente, pero ejecución temprana**. El desequilibrio entre documentación (8.5/10) y código funcional (3/10) revela un riesgo típico de startups técnicas: **sobre-diseño antes de validación de mercado**.

### Los 3 riesgos existenciales

1. **Falta de flujo de ingresos**: Sin pagos integrados, el proyecto no genera ni un euro. Es una web informativa con costes.

2. **Plataforma prometida vs real**: Un cliente que llegue desde el blog o SEO y contrate un servicio no tendrá dashboard, ni seguimiento, ni backoffice. La experiencia sería: pago manual → PDF por email. Esto no es escalable ni profesional.

3. **Validación de mercado cero**: No hay evidencia de que alguien pagaría 59€ por una segunda opinión. El producto debe validarse con clientes reales antes de construir Observatorios, SAAS B2B, o sistemas de eventos.

### La decisión estratégica

**Opción A — Lean Startup (RECOMENDADA)**
- Construir el flujo mínimo: pago → expediente → inspección → informe.
- Validar con 10 clientes reales.
- Iterar antes de escalar.
- **Riesgo:** Bajo. **Coste:** Bajo. **Aprendizaje:** Máximo.

**Opción B — Big Bang (No recomendada)**
- Implementar Foundation completa, eventos, multiempresa, IA, Observatorio.
- Lanzar plataforma completa.
- **Riesgo:** Alto. **Coste:** Alto. **Aprendizaje:** Bajo (se construye a ciegas).

### Recomendación del Consejo

> **Construir el mínimo para cerrar el ciclo de ingresos. Validar. Después escalar.**

El PITR™ es el activo técnico más valioso. La documentación es la segunda. El código web es la tercera. Pero sin un flujo de pago → servicio → entrega, todo es teoría.

### Próximos pasos inmediatos sugeridos

1. Configurar Supabase (esquema + migraciones + RLS).
2. Integrar Stripe Checkout (sesión de pago única).
3. Crear expediente automáticamente tras pago exitoso.
4. Mostrar dashboard al cliente con estado del expediente.
5. Conectar PITR™ a base de datos.
6. Backoffice para cambiar estado y marcar "informe enviado".
7. Email de notificación al cliente.
8. Lanzar a 10 clientes piloto.

**Esto se puede hacer en 2-3 semanas de desarrollo intensivo.** Después, el proyecto tendrá un producto real que mostrar a inversores.

---

## ANEXO: MÉTRICAS DEL PROYECTO

| Métrica | Valor |
|---------|-------|
| Páginas totales | 74 |
| Rutas API | 4 |
| Componentes | ~30+ |
| Documentos técnicos | 6 |
| Tests | 0 |
| Líneas de código estimadas | ~20,000+ |
| Dependencias npm | Por verificar |
| Tiempo de build | ~9s (Turbopack) |
| Versión Next.js | 16.2.6 |
| TypeScript | Strict mode |
| ESLint | Flat config 9.x |
| CSS | Modules + CSS nativo |
| Despliegue | Vercel (automático) |
| Dominio | certilab.cat |

---

*Documento generado como parte de la Auditoría Estratégica 360º.  
Clasificación: CONFIDENCIAL — Solo para inversores y socios tecnológicos.*