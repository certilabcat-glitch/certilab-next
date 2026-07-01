# CF-000 — CERTILAB PROJECT BRAIN

> **La Constitución del Proyecto Certilab.**
>
> Este documento es el cerebro del proyecto. No es documentación técnica. No es documentación para usuarios. Es el documento maestro que permite continuar el desarrollo aunque cambie el equipo, el editor, el portátil o el desarrollador.
>
> **Todo desarrollador debe leer este documento antes de escribir una sola línea de código.**
>
> Toda decisión futura deberá ser coherente con este documento. Si algo no está aquí, no existe. Si algo contradice este documento, es incorrecto.

---

**Versión:** 1.1.0
**Fecha:** 01/07/2026
**Release actual:** v1.3.0
**Autor:** Equipo Certilab
**Último commit:** 040296d
**Repositorio:** https://github.com/certilabcat-glitch/certilab-next.git

---

## SESSION START PROTOCOL

> **Todas las sesiones de desarrollo comienzan ejecutando CF-001.**
>
> El protocolo definido en `docs/CF-001-SESSION-PROTOCOL.md` es obligatorio. Ninguna IA ni desarrollador puede escribir código, realizar commits o tomar decisiones técnicas sin haberlo ejecutado previamente.
>
> Ver `docs/CF-001-SESSION-PROTOCOL.md` para el protocolo completo.

---

## ÍNDICE

1. [VISIÓN](#1-visión)
2. [FILOSOFÍA](#2-filosofía)
3. [HISTORIA DEL PROYECTO](#3-historia-del-proyecto)
4. [ARQUITECTURA GENERAL](#4-arquitectura-general)
5. [FRAMEWORK CERTILAB](#5-framework-certilab)
6. [PRODUCTOS](#6-productos)
7. [CUSTOMER JOURNEY](#7-customer-journey)
8. [PITR™](#8-pitr)
9. [EXPEDIENTE DIGITAL](#9-expediente-digital)
10. [OBSERVATORIO](#10-observatorio)
11. [IA](#11-ia)
12. [AUTOMATIZACIONES](#12-automatizaciones)
13. [ROADMAP](#13-roadmap)
14. [PRINCIPIOS DE DESARROLLO](#14-principios-de-desarrollo)
15. [REGLAS ABSOLUTAS](#15-reglas-absolutas)
16. [ESTADO ACTUAL](#16-estado-actual)
17. [PRÓXIMOS PASOS](#17-próximos-pasos)
18. [APÉNDICES](#18-apéndices)

---

# 1. VISIÓN

## 1.1 ¿Por qué existe Certilab?

Certilab existe porque el mercado de la certificación energética en España está roto.

Cada año se emiten cientos de miles de certificados energéticos. Muchos de ellos son incorrectos. Están inflados, mal calculados o directamente falseados. Las consecuencias son devastadoras: propietarios que pierden hasta el **15% del valor** de su vivienda, compradores que heredan vicios ocultos, inmobiliarias que enfrentan reclamaciones legales.

Nadie estaba verificando la calidad de esos certificados. Nadie ofrecía una segunda opinión técnica independiente. Nadie ponía datos objetivos sobre la mesa.

Certilab nació para cerrar esa brecha.

## 1.2 Qué problema resuelve

Certilab resuelve tres problemas fundamentales:

1. **Falta de verificación independiente.** El certificado energético lo emite un técnico contratado por el vendedor. No existe contrapeso. Certilab es ese contrapeso: un Arquitecto Técnico colegiado que revisa, audita y emite una segunda opinión vinculante.

2. **Desinformación del mercado.** Propietarios, compradores e inmobiliarias desconocen el impacto económico real de un certificado incorrecto. Certilab publica datos, informes e investigaciones a través del Observatorio para que el mercado tenga información veraz y accionable.

3. **Ineficiencia en el proceso de compraventa.** Detectar un certificado incorrecto después de la firma es caro y lento. Certilab permite detectarlo antes, con una Inspección Técnica Remota (PITR™) que no requiere visita presencial.

## 1.3 Qué NO pretende ser Certilab

Certilab NO es:

- **NO es un emisor de certificados energéticos.** Certilab no compite con los técnicos certificadores. Los audita.
- **NO es un software de cálculo energético.** No sustituye a CE3X, HULC ni CYPETHERM. Los complementa verificando sus resultados.
- **NO es un despacho de arquitectura tradicional.** No hace proyectos ni dirección de obra.
- **NO es un marketplace de técnicos.** Solo trabajan Arquitectos Técnicos colegiados del equipo Certilab.
- **NO es una herramienta para que el cliente haga trabajo técnico.** El cliente observa. El Arquitecto Técnico valida. El sistema asiste.

## 1.4 Cuál es la misión

**Garantizar que cada certificado energético en España refleje la realidad física del inmueble.**

Esto implica:
- Verificar certificados existentes mediante segunda opinión técnica independiente.
- Formar al mercado para que sepa detectar certificados incorrectos.
- Publicar datos anonimizados del Observatorio para elevar el estándar del sector.
- Automatizar todo lo automatizable sin sacrificar el criterio técnico humano.

## 1.5 Cuál es la visión a 10 años

En 10 años, Certilab será:

- **El estándar de verificación** de certificados energéticos en España. Todo comprador sabrá que puede pedir una "segunda opinión Certilab" antes de firmar.
- **El Observatorio de referencia** en eficiencia energética residencial, con datos abiertos, informes trimestrales e investigación aplicada con IA.
- **La plataforma SaaS** que usen otros Arquitectos Técnicos para realizar sus propias inspecciones técnicas remotas con PITR™.
- **El puente entre la certificación energética y la valoración inmobiliaria.** Cuando un banco quiera saber el valor real de un inmueble, consultará el expediente Certilab.

## 1.6 Qué significa "Segunda Opinión"

La **Segunda Opinión** es el servicio estrella de Certilab.

Un Arquitecto Técnico colegiado revisa un certificado energético existente y emite un dictamen técnico vinculante. No es una opinión subjetiva. Es una auditoría técnica basada en:

- La normativa vigente (RD 390/2021, CTE DB-HE).
- Los datos reales del inmueble recopilados mediante PITR™.
- El criterio profesional de un técnico colegiado.

La Segunda Opinión puede confirmar que el certificado es correcto o detectar que está inflado, mal calculado o falseado. En este último caso, el dictamen tiene valor legal para reclamar ante el técnico emisor y los organismos competentes.

## 1.7 Qué significa "Inspección Técnica Remota"

La **Inspección Técnica Remota (PITR™)** es la metodología propietaria de Certilab.

Permite recopilar toda la información necesaria de un inmueble sin que el Arquitecto Técnico se desplace físicamente. El proceso es:

1. El cliente recibe acceso a un formulario estructurado (el motor PITR™).
2. El cliente responde preguntas guiadas, sube fotos y documentos.
3. El sistema valida automáticamente la coherencia de los datos.
4. El Arquitecto Técnico revisa todo y emite su dictamen.

PITR™ no sustituye la visita presencial cuando es necesaria. Pero en el 80% de los casos, permite emitir un dictamen técnico sólido sin desplazamiento. Esto reduce costes, acorta plazos y escala el servicio.

## 1.8 Qué significa "Observatorio"

El **Observatorio Certilab** es la base de conocimiento público sobre eficiencia energética residencial en España.

Todos los datos de los expedientes (anonimizados y agregados) alimentan el Observatorio. Esto permite:
- Publicar informes trimestrales sobre el estado real de la certificación energética.
- Detectar patrones: zonas geográficas con más certificados inflados, tipologías de vivienda más afectadas, rangos de precios donde más se falsea.
- Alimentar modelos de IA para detección automática de anomalías.
- Generar contenido SEO que posiciona a Certilab como autoridad en el sector.

El Observatorio convierte cada expediente en un activo de conocimiento. No se pierde nada. Todo suma.

---

# 2. FILOSOFÍA

## 2.1 La IA nunca sustituye al Arquitecto Técnico

La inteligencia artificial asiste, sugiere, acelera. Pero la decisión final siempre es del Arquitecto Técnico colegiado.

La IA puede:
- Proponer un rango de letra probable para un certificado.
- Detectar inconsistencias en los datos ingresados.
- Sugerir el siguiente estado del expediente.
- Generar un borrador de informe.
- Clasificar documentos automáticamente.

La IA NUNCA puede:
- Firmar un dictamen técnico.
- Modificar el estado de un expediente sin validación humana.
- Tomar una decisión que tenga consecuencias legales.
- Sustituir el juicio profesional ante un caso ambiguo.
- Comunicarse directamente con el cliente sin supervisión.

## 2.2 El cliente nunca hace trabajo técnico

El cliente responde preguntas sencillas: "¿Qué tipo de ventanas tiene?", "¿Cuándo se construyó el edificio?", "Suba una foto de la fachada".

El cliente NUNCA:
- Calcula transmitancias térmicas.
- Interpreta normativas.
- Decide qué datos son relevantes.
- Evalúa la calidad de un certificado.
- Determina la letra energética.

El sistema traduce las respuestas del cliente a datos técnicos. El Arquitecto Técnico los valida. El cliente solo observa el progreso de su expediente.

## 2.3 El cliente solamente observa

El área de cliente está diseñada para que el cliente vea el estado de su expediente, el progreso, los documentos disponibles y las fechas clave.

El cliente no edita. El cliente no configura. El cliente no toma decisiones técnicas.

Si el cliente necesita hacer algo (subir un documento, responder una pregunta), el sistema se lo solicita explícitamente. Pero nunca se le da acceso a funciones que requieran criterio técnico.

## 2.4 El Arquitecto valida

Todo dato que entra en el sistema pasa por validación humana antes de convertirse en verdad.

El flujo es:
1. El sistema recopila datos (PITR™, OCR, APIs).
2. El sistema valida automáticamente (reglas de coherencia, rangos permitidos).
3. El Arquitecto Técnico revisa y aprueba o rechaza.
4. Solo entonces el dato se incorpora al expediente.

Un dato no validado por un Arquitecto Técnico no es un dato. Es una propuesta.

## 2.5 Toda decisión debe ser justificable

Si un Arquitecto Técnico cambia la letra de un certificado de D a E, debe poder justificarlo técnicamente. Si el sistema cambia el estado de un expediente, debe quedar registrado quién, cuándo y por qué.

El principio de trazabilidad es absoluto:
- Cada cambio de estado genera un evento.
- Cada evento tiene timestamp, usuario, IP y datos.
- Los eventos nunca se borran. Nunca se modifican. Solo se agregan.
- El historial completo de un expediente es inmutable.

## 2.6 El expediente es la fuente de verdad

Un expediente Certilab contiene todo lo que se sabe sobre un inmueble en un momento dado. No hay información dispersa en emails, WhatsApps o notas sueltas.

Si algo no está en el expediente, no existe.

El expediente agrupa: datos del inmueble (dirección, catastro, características), certificado energético original, documentación aportada por el cliente, resultados PITR™, dictamen del Arquitecto Técnico, historial completo de eventos, pagos y facturas.

## 2.7 El inmueble es permanente

Un inmueble no desaparece cuando se cierra un expediente. Puede volver a ser auditado años después. Puede tener varios expedientes a lo largo del tiempo.

Por eso el inmueble es una entidad independiente del expediente. Un mismo inmueble puede tener N expedientes. Un mismo cliente puede tener N inmuebles.

Esto permite comparar expedientes del mismo inmueble en el tiempo, detectar cambios en la calificación energética y alimentar el Observatorio con series temporales.

## 2.8 Todo debe ser escalable

Cada decisión de arquitectura debe soportar 10x y 100x sin cambios estructurales:

- El motor PITR™ permite agregar nuevos templates de inspección sin tocar el motor.
- El sistema de eventos permite suscribir nuevos handlers sin modificar los existentes.
- Los storage providers son intercambiables mediante una interfaz común.
- Los templates de email y flujos de n8n son configurables sin tocar código.

## 2.9 Todo debe ser reutilizable

No se construye dos veces lo mismo:

- Los componentes UI (EstadoBadge, ProgressBar) se usan en cliente y backoffice.
- Los validadores de coherencia del PITR™ se usarán en el Observatorio y la IA.
- Las entidades TypeScript son la fuente de los tipos de Supabase.
- Las configuraciones están centralizadas, no dispersas en componentes.

## 2.10 Nunca duplicar información

Una verdad, un lugar:

- Los precios de los servicios están en archivos de configuración centralizados.
- Los datos de la empresa (nombre, CIF, dirección) están centralizados.
- Las FAQs están en `src/data/faq.ts`. Se muestran en la web y en artículos desde el mismo archivo.
- Los artículos del blog están en `src/data/articles/`. Se renderizan en blog, sitemap y llms.txt desde la misma fuente.

---

# 3. HISTORIA DEL PROYECTO

## 3.1 El origen: detectar lo que nadie detectaba

Certilab nació de la experiencia real de Arquitectos Técnicos que, una y otra vez, encontraban certificados energéticos incorrectos durante tasaciones, peritajes y segundas opiniones informales.

El patrón era claro: los certificados se emitían sin rigor, con datos inventados o con programas mal configurados. Y nadie lo verificaba.

La pregunta fue: ¿por qué no existe un servicio que revise certificados energéticos de forma independiente?

La respuesta: porque es técnicamente complejo, requiere conocimiento normativo y no escala con visitas presenciales.

Ahí nació la idea de PITR™: una metodología que permite hacer esa revisión de forma remota, estructurada y repetible.

## 3.2 V1.0 — La web informativa (Release v1.0.0)

La primera versión fue una web estática en Next.js. El objetivo: validar que existía demanda.

**Release V1.0** (tag: v1.0.0, commit: b3ddaf8):
- Web con Next.js 15, TypeScript estricto, CSS Modules.
- Páginas de servicio: Segunda Opinión, Segunda Opinión Express, Informe Técnico Energético.
- Blog con 30 artículos sobre certificación energética.
- SEO sistémico: meta titles, FAQPage schema, sitemap, llms.txt, llms-full.txt.
- Embudo CRO: landings → servicio → formulario → gracias.
- Auditoría de accesibilidad para audiencia madura (45-65 años).
- Integración con Google Analytics y Meta Pixel.
- Cookie consent profesional.
- Despliegue en Vercel.

**Decisiones importantes de V1.0:**
- **TypeScript estricto desde el día 1** (`strict: true`).
- **CSS Modules** como estrategia de estilos (no Tailwind, no styled-components).
- **Trailing slash** en todas las URLs para consistencia SEO.
- **Sin emojis** en contenido editorial (tono profesional para audiencia madura).
- **Cumplimiento legal** completo: aviso legal, privacidad, cookies.
- **Renderizado estático** siempre que sea posible.
- **Fuente única de verdad** para configuraciones (Sprint 1.5).

## 3.3 V1.1 — El Expediente Digital

Con la web validada, el siguiente paso era construir la plataforma interna. No se podía escalar con emails y hojas de cálculo.

**Release V1.1** (commit: 18f0a1c, parte de feature/platform-v1):
- Diseño completo del Sistema de Expedientes.
- Definición de 6 entidades: Expediente, Cliente, Inmueble, Servicio, Usuario, Actividad.
- Máquina de estados con 7 estados y transiciones validadas.
- Componentes UI: EstadoBadge, ProgressBar.
- Sistema de eventos (EventBus) con 14 tipos de eventos (ver sección 9).
- Interfaces de storage provider.
- Permisos y roles: cliente, técnico, admin.
- Rutas de plataforma: dashboard, mis-expedientes, backoffice.
- Auditoría de Arquitectura exhaustiva.
- Documentación: CF-002, CF-011.

**Decisiones importantes de V1.1:**
- **Separar Inmueble de Expediente.** El inmueble es permanente, el expediente es transitorio.
- **Eventos inmutables.** Solo se agregan, nunca se modifican ni eliminan.
- **Clean Architecture** con separación clara: entities → use cases → adapters → frameworks.
- **Supabase** como infraestructura (Auth + PostgreSQL + Storage), abstraída tras interfaces.

## 3.4 V1.2 — El Inspection Engine (PITR™)

El núcleo diferencial: la metodología de inspección remota.

**Release V1.2** (tag: v1.2.0, commit: a02e0e6):
- Motor PITR™ completo: 3 capas (UI → Hook → Motor TypeScript puro).
- Template de Segunda Opinión con preguntas estructuradas.
- 15 tipos de input (text, number, select, file, photo, date, etc.).
- Sistema de condiciones para mostrar/ocultar preguntas.
- 9 reglas de validación.
- Cálculo de progreso en tiempo real.
- Persistencia en localStorage.
- Documentación CF-012.

**Decisiones importantes de V1.2:**
- **Motor en TypeScript puro.** No depende de React. El hook es solo una capa de adaptación.
- **Templates como datos**, no código. Agregar un tipo de inspección es crear un archivo de template.
- **Type discriminators** para validación en tiempo de compilación.

## 3.5 Cronología de decisiones arquitectónicas clave

| Fecha | Release | Decisión | Impacto |
|-------|---------|----------|---------|
| Inicio | V0 | Next.js + TypeScript estricto | Base tecnológica |
| V1.0 | Sprint 1.2 | CSS Modules sobre Tailwind | Control total, sin dependencias |
| V1.0 | Sprint 1.3 | Trailing slash obligatorio | Consistencia SEO |
| V1.0 | Sprint 1.5 | Fuente única de verdad | Eliminó duplicidades en 13 archivos |
| V1.1 | - | Inmueble separado de Expediente | Escalabilidad, Observatorio |
| V1.1 | - | Eventos inmutables | Trazabilidad absoluta |
| V1.1 | - | Interfaces de storage | No acoplarse a Supabase |
| V1.2 | - | Motor PITR™ en TypeScript puro | Testeable, portable |
| V1.2 | - | Templates como datos | Extensibilidad sin tocar motor |

---

# 4. ARQUITECTURA GENERAL

## 4.1 Diagrama conceptual

```
┌─────────────────────────────────────────────────────────────────┐
│                         CERTILAB                                │
│                                                                 │
│  ┌──────────┐                                                   │
│  │   WEB    │  Web pública (Next.js)                            │
│  │          │  - Landing pages, servicios, blog                 │
│  │          │  - SEO, sitemap, llms.txt                         │
│  └────┬─────┘                                                   │
│       │                                                         │
│       ▼                                                         │
│  ┌──────────┐                                                   │
│  │ PLATFORM │  Área privada (Next.js route group)               │
│  │          │  - Dashboard cliente + Backoffice                 │
│  │          │  - Gestión de expedientes                         │
│  └────┬─────┘                                                   │
│       │                                                         │
│       ▼                                                         │
│  ┌──────────────────┐                                           │
│  │ INSPECTION ENGINE│  Motor PITR™                              │
│  │                  │  - Templates de inspección                │
│  │                  │  - Motor TypeScript puro                  │
│  │                  │  - Hook React (usePitr) + UI              │
│  └────┬─────────────┘                                           │
│       │                                                         │
│       ▼                                                         │
│  ┌──────────┐                                                   │
│  │EXPEDIENTE│  Expediente Digital                               │
│  │          │  - Entidades (6+1), Máquina de estados (13)      │
│  │          │  - EventBus (14 eventos), Versionado             │
│  └────┬─────┘                                                   │
│       │                                                         │
│       ├──────────────────────────────────────┐                  │
│       ▼                                      ▼                  │
│  ┌───────────────┐                  ┌───────────────┐           │
│  │KNOWLEDGE BASE │                  │ OBSERVATORIO  │           │
│  │  - FAQs       │                  │  - Datos anon. │           │
│  │  - Artículos  │                  │  - Informes    │           │
│  │  - Glosario   │                  │  - SEO         │           │
│  │  - llms.txt   │                  │  - Investigac. │           │
│  └───────┬───────┘                  └───────┬───────┘           │
│          │                                  │                   │
│          └──────────────┬───────────────────┘                   │
│                         ▼                                       │
│                  ┌──────────┐                                   │
│                  │    IA    │  Inteligencia Artificial           │
│                  │          │  - Detección anomalías            │
│                  │          │  - Propuesta de letra             │
│                  │          │  - Borradores de informe          │
│                  └────┬─────┘                                   │
│                       │                                         │
│                       ▼                                         │
│                  ┌──────────┐                                   │
│                  │   SaaS   │  Software as a Service            │
│                  │          │  - Multiusuario, Suscripciones    │
│                  │          │  - PITR™ para terceros           │
│                  └──────────┘                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 4.2 Flujo de datos principal

```
Cliente → Web pública → Formulario → Pago (MyPOS) → Expediente creado
                                                            ↓
                          PITR™ ← Cliente responde ←  Notificación email
                             ↓
                      Arquitecto Técnico revisa y dictamina
                             ↓
              Dictamen → Informe PDF → Cliente recibe → Expediente cerrado
                                                    ↓
                             Observatorio ← Datos anonimizados
                                                    ↓
                                            IA analiza patrones
```

## 4.3 Stack tecnológico

### Frontend
- **Framework:** Next.js 15 (App Router, route groups)
- **Lenguaje:** TypeScript (strict: true)
- **Estilos:** CSS Modules (.module.css)
- **Renderizado:** SSG + RSC (Server Components por defecto)
- **SEO:** Metadata API, sitemap dinámico, Schema.org JSON-LD

### Backend
- **API Routes:** Next.js API routes
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** Supabase Auth + middleware de autorización
- **Storage:** Supabase Storage (abstraído tras IStorageProvider)
- **Pagos:** MyPOS (webhooks → n8n → Supabase)

### Automatización
- **n8n:** Workflows para emails, notificaciones, sincronización
- **OCR:** Extracción de datos de certificados (PDF → texto estructurado)
- **Catastro:** Consulta de datos catastrales vía API

### Scripts de utilidad
- `extract-pdf.mjs` — OCR de certificados energéticos
- `check-seo.mjs` — Auditoría SEO automatizada
- `generate-llms.mjs` — Generación de llms.txt y llms-full.txt
- `generate-og-image.mjs` — Imágenes de Open Graph
- `analyze-faq.mjs` — Análisis de FAQs
- `analyze-faq-articles.mjs` — Análisis de artículos FAQ

### Infraestructura
- **Hosting:** Vercel
- **Dominio:** certilab.cat
- **CI/CD:** Vercel Git Integration (push a main → deploy automático)
- **Analytics:** Google Analytics + Meta Pixel

## 4.4 Estructura de directorios

```
web-garraf/
├── docs/                          # Documentación del proyecto
│   ├── CF-000-PROJECT-BRAIN.md    # ← ESTE DOCUMENTO
│   ├── CF-001-SESSION-PROTOCOL.md # Protocolo de inicio de sesión
│   ├── CF-002-EXPEDIENTE-DIGITAL.md
│   ├── CF-011-FOUNDATION.md
│   ├── CF-012-PITR-MOTOR.md
│   ├── AUDITORIA-ARQUITECTURA-V1.1.md
│   ├── IMPLEMENTACION-V1.1.md
│   ├── RELEASE-V1.2.md
│   ├── architecture/              # Diagramas, planes SEO, keywords
│   ├── audits/                    # Auditorías de calidad
│   ├── editorial/                 # Manual editorial, briefings
│   ├── expedientes/               # Diagramas de flujo de expedientes
│   ├── observatorio/              # Plan del Observatorio
│   └── releases/                  # Planes de release
├── public/                        # Activos estáticos
│   ├── favicon.png
│   ├── og-image.jpg
│   ├── robots.txt
│   ├── llms.txt                   # Para LLMs (índice resumido)
│   ├── llms-full.txt              # Para LLMs (contenido completo)
│   └── 7-senales-ce.html          # Landing estática (legacy)
├── scripts/                       # Scripts de utilidad
│   ├── check-seo.mjs
│   ├── generate-llms.mjs
│   ├── generate-og-image.mjs
│   ├── analyze-faq.mjs
│   ├── analyze-faq-articles.mjs
│   ├── extract-pdf.mjs
│   └── archive/                   # Scripts archivados
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Layout raíz con metadata global
│   │   ├── page.tsx               # Home page
│   │   ├── globals.css            # Estilos globales y variables CSS
│   │   ├── sitemap.ts             # Sitemap dinámico
│   │   ├── not-found.tsx          # Página 404 personalizada
│   │   ├── (servicios)/           # Route group: páginas de servicio
│   │   │   ├── segunda-opinion/
│   │   │   ├── segunda-opinion-express/
│   │   │   └── informe-tecnico-energetico/
│   │   ├── (legal)/               # Route group: páginas legales
│   │   │   ├── aviso-legal/
│   │   │   ├── privacidad/
│   │   │   └── cookies/
│   │   ├── (plataforma)/          # Route group: área privada
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   ├── mis-expedientes/
│   │   │   ├── nuevo-expediente/
│   │   │   ├── configuracion/
│   │   │   ├── pitr/segunda-opinion/
│   │   │   └── backoffice/
│   │   │       ├── expedientes/
│   │   │       ├── clientes/
│   │   │       ├── inmuebles/
│   │   │       ├── usuarios/
│   │   │       └── configuracion/
│   │   ├── blog/[slug]/
│   │   ├── landing/7-senales-ce/
│   │   ├── gracias/
│   │   ├── resultado-auditoria/
│   │   ├── sobre-nosotros/
│   │   ├── ayudas-eficiencia-energetica/
│   │   ├── buscador-certificado-energetico-catalunya/
│   │   ├── cercador-certificats-energetics/
│   │   └── api/extraer-certificado/
│   ├── components/                # Componentes React reutilizables
│   │   ├── layout/                # Header, Footer, StickyCTA, CookieConsent
│   │   ├── sections/              # Hero, Problem, Contrast, FAQ, ServicesGrid...
│   │   ├── forms/                 # ContactForm y variantes
│   │   ├── blog/                  # AutorBloque y componentes de blog
│   │   ├── plataforma/            # EstadoBadge, ProgressBar
│   │   └── pitr/                  # PitrEngine, PitrQuestion, PitrNavigation...
│   ├── config/                    # Configuración centralizada
│   ├── data/                      # Datos de contenido (fuente única)
│   │   ├── articles.ts            # Índice de artículos del blog
│   │   ├── articles/              # Archivos .md de cada artículo
│   │   ├── faq.ts                 # FAQs centralizadas
│   │   └── services.ts            # Datos de servicios
│   ├── lib/                       # Lógica de negocio (TypeScript puro)
│   │   ├── storage/               # Storage providers (interfaz + implementaciones)
│   │   ├── pitr/                  # Motor PITR™
│   │   │   ├── motor.ts           # Motor principal
│   │   │   ├── use-pitr.ts        # Hook React
│   │   │   └── templates/         # Templates de inspección
│   │   ├── expediente-estados.ts  # Máquina de estados
│   │   ├── eventos.ts             # EventBus + helpers
│   │   ├── integraciones.ts       # APIs externas
│   │   └── wa.ts                  # WhatsApp integration
│   └── types/                     # Tipos TypeScript (fuente de verdad)
│       ├── expediente.ts
│       ├── inspection.ts
│       ├── documento.ts
│       └── pago.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── eslint.config.mjs
├── vercel.json
├── DEPLOY.md
├── README.md
├── START_HERE.md                  # Flujo de inicio del proyecto
├── RELEASE_CLEANUP_V1.0_REPORT.md
├── CLAUDE.md
└── AGENTS.md
```

## 4.5 Route groups de Next.js

El proyecto usa **route groups** de Next.js (carpetas entre paréntesis) para organizar rutas sin afectar la URL final:

- `(servicios)` — Páginas públicas de servicio. `/segunda-opinion` está en `src/app/(servicios)/segunda-opinion/`.
- `(legal)` — Páginas legales. `/aviso-legal` está en `src/app/(legal)/aviso-legal/`.
- `(plataforma)` — Área privada completa. `/dashboard` está en `src/app/(plataforma)/dashboard/`.

La URL nunca contiene `(servicios)`, `(legal)` ni `(plataforma)`.

## 4.6 Clean Architecture en la práctica

El proyecto sigue los principios de Clean Architecture con esta separación de capas:

- **Entities** (`src/types/`) — Tipos TypeScript puros. No dependen de nada.
- **Use Cases** (`src/lib/`) — Lógica de negocio pura. Dependen solo de entities.
- **Adapters** (`src/lib/storage/`, `src/lib/integraciones.ts`) — Implementaciones concretas de interfaces.
- **Frameworks** (`src/app/`, `src/components/`) — Next.js, React. La capa más externa.

Regla de dependencia: las capas internas nunca importan de las externas. `src/lib/` nunca importa de `src/components/`. `src/types/` nunca importa de `src/lib/`.

---

# 5. FRAMEWORK CERTILAB

El Framework Certilab (CF) es el sistema de documentación del proyecto. Cada documento CF cubre un aspecto específico del sistema. Juntos forman la documentación completa.

## 5.1 Documentos existentes

### CF-000 — PROJECT BRAIN (este documento)
**Archivo:** `docs/CF-000-PROJECT-BRAIN.md`

La constitución del proyecto. Visión, filosofía, historia, arquitectura general, roadmap, reglas absolutas. Es el punto de entrada para cualquier persona que se incorpore al proyecto. Debe leerse primero, antes que cualquier otro documento.

### CF-001 — SESSION PROTOCOL
**Archivo:** `docs/CF-001-SESSION-PROTOCOL.md`

Protocolo obligatorio de inicio de sesión. Define los pasos que cualquier IA o desarrollador debe ejecutar antes de empezar una sesión de desarrollo: verificación Git, build de verificación, lectura de documentación, comparación documentación/repositorio y generación de informe. Es el primer documento que debe ejecutarse al comenzar cualquier sesión de trabajo.

### CF-002 — EXPEDIENTE DIGITAL
**Archivo:** `docs/CF-002-EXPEDIENTE-DIGITAL.md`

Diseño completo del Sistema de Expedientes. Define:
- 6 entidades: Expediente, Cliente, Inmueble, Servicio, Usuario, Actividad.
- Relaciones entre entidades (un cliente tiene N inmuebles, un inmueble tiene N expedientes).
- Máquina de estados con 7 estados y transiciones.
- APIs REST para expedientes, clientes, inmuebles, usuarios.
- Permisos por rol (cliente, técnico, admin).
- Esquema de base de datos en Supabase.

### CF-011 — FOUNDATION
**Archivo:** `docs/CF-011-FOUNDATION.md`

Documento que define las bases sobre las que se construye todo el sistema. Documenta:
- Configuración de TypeScript estricto y por qué cada flag está activado.
- Estrategia de CSS Modules y nomenclatura.
- Configuración de ESLint.
- Estrategia de testing.
- Principios de Clean Architecture aplicados al proyecto.
- Estándares de código y nomenclatura.

### CF-012 — PITR MOTOR
**Archivo:** `docs/CF-012-PITR-MOTOR.md`

Documento que detalla el Inspection Engine de Certilab. Contiene:
- Arquitectura de 3 capas del motor PITR™.
- 15 tipos de input soportados.
- Sistema de condiciones para bifurcación de preguntas.
- 9 reglas de validación.
- Esquema de persistencia en localStorage.
- Guía para crear nuevos templates de inspección.
- Integración con el sistema de expedientes.

### CF-003 a CF-010, CF-013+ (Planificados)

Estos documentos aún no se han creado. Se crearán a medida que el proyecto avance:
- **CF-003** — OBSERVATORIO. Modelo de datos, anonimización, informes, APIs.
- **CF-004** — IA. Arquitectura de modelos, límites, validación humana.
- **CF-005** — AUTOMATIZACIONES. Flujos en n8n, plantillas de email, webhooks.
- **CF-006** — SAAS. Multiusuario, suscripciones, planes, facturación.
- **CF-007** — WEB PÚBLICA. Arquitectura editorial, SEO, landings.
- **CF-008** — SEGURIDAD. Autenticación, autorización, GDPR, backups.
- **CF-009** — TESTING. Estrategia de tests unitarios, integración, E2E.
- **CF-010** — DEVOPS. CI/CD, despliegue en Vercel, entornos, monitoreo.
- **CF-013** — API PÚBLICA. APIs para terceros, documentación OpenAPI.
- **CF-014** — MÓVIL. Futura app complementaria.

---

# 6. PRODUCTOS

Certilab se compone de 10 productos. Algunos son visibles para el cliente. Otros son internos. Todos están interconectados.

## 6.1 Web (Web Pública)

La web pública es el punto de entrada principal. Construida con Next.js 15, App Router, TypeScript estricto y CSS Modules.

**Funciones:**
- Páginas de servicios detalladas.
- Blog con 30 artículos de certificación energética.
- Landings de captación (lead magnets).
- Páginas legales.
- SEO sistémico con metadatos por página, sitemap y Schema.org.

**Rutas públicas principales:**
- `/` — Home
- `/segunda-opinion` — Servicio principal
- `/segunda-opinion-express` — Servicio exprés
- `/informe-tecnico-energetico` — Informe técnico
- `/blog/[slug]` — Blog
- `/sobre-nosotros` — Quiénes somos
- `/resultado-auditoria` — Resultado de auditoría de certificado
- `/gracias` — Página de agradecimiento post-formulario
- `/buscador-certificado-energetico-catalunya` — Buscador público
- `/cercador-certificats-energetics` — Buscador en catalán
- `/ayudas-eficiencia-energetica` — Ayudas Next Generation
- `/7-senales-ce` — Landing de lead magnet (7 señales)

## 6.2 Platform (Plataforma)

La plataforma es el área privada del proyecto. Agrupa el dashboard de cliente y el backoffice de administración.

**Dashboard de cliente:**
- Visión general de expedientes activos.
- Lista de expedientes con estado y progreso.
- Creación de nuevo expediente.
- Configuración del perfil.
- Acceso al PITR™ para completar inspecciones.

**Backoffice (solo Arquitectos Técnicos y admins):**
- Gestión de expedientes (ver, filtrar, cambiar estado).
- Gestión de clientes.
- Gestión de inmuebles.
- Gestión de usuarios.
- Configuración del sistema.

## 6.3 Observatorio

El Observatorio es la base de conocimiento público. Convierte datos anonimizados de expedientes en informes, estadísticas y alertas.

**Objetivos:**
- Publicar informes trimestrales sobre el estado de la certificación energética.
- Posicionar a Certilab como autoridad en SEO mediante datos propios.
- Alimentar modelos de IA para investigación y detección de patrones.
- Servir de fuente para artículos, notas de prensa y material editorial.

**Estado actual:** Planificado. Sección 10 detalla el diseño completo.

## 6.4 SaaS

La capa SaaS permitirá que otros Arquitectos Técnicos usen PITR™ para sus propias inspecciones. Es la evolución natural tras validar el motor con casos reales.

**Funcionalidades previstas:**
- Multitenant: cada técnico tiene su propio espacio.
- Suscripciones mensuales/anuales con límite de expedientes.
- Templates configurables por tipo de inspección.
- Marca blanca (informes con el logo del técnico).
- Integración con sus propias pasarelas de pago.
- Marketplace de templates comunitarios.

**Estado actual:** Planificado. Depende de completar el motor PITR™ y el sistema de expedientes.

## 6.5 Backoffice

El backoffice es la interfaz de administración para Arquitectos Técnicos y admins. Está dentro del route group `(plataforma)`.

**Páginas:**
- `/backoffice/expedientes` — Lista, filtros, cambio de estado.
- `/backoffice/clientes` — Lista de clientes y sus expedientes.
- `/backoffice/inmuebles` — Lista de inmuebles auditados.
- `/backoffice/usuarios` — Gestión de usuarios del sistema.
- `/backoffice/configuracion` — Configuración global.

**Permisos:**
- **cliente:** Solo ve su dashboard y sus expedientes.
- **técnico:** Ve backoffice limitado (expedientes asignados, clientes, inmuebles).
- **admin:** Ve y puede modificar todo.

## 6.6 Área Cliente

El área cliente es la vista que ve el cliente cuando accede a la plataforma. No es un producto separado: es el dashboard del route group `(plataforma)` con rol `cliente`.

**Lo que el cliente puede hacer:**
- Ver el estado de sus expedientes.
- Ver la barra de progreso y los pasos completados.
- Responder preguntas del PITR™.
- Subir documentos solicitados.
- Descargar informes finales.
- Contactar con soporte.

**Lo que el cliente NO puede hacer:**
- Modificar datos técnicos del expediente.
- Cambiar el estado de un expediente.
- Ver expedientes de otros clientes.
- Acceder al backoffice.
- Editar la configuración del sistema.

## 6.7 Inspection Engine (Motor PITR™)

El Inspection Engine es el corazón técnico de Certilab. Es un motor TypeScript puro que ejecuta templates de inspección. Está documentado en CF-012.

**Capas:**
1. **Motor** (`src/lib/pitr/motor.ts`) — TypeScript puro. Sin React.
2. **Hook** (`src/lib/pitr/use-pitr.ts`) — Adaptador React que conecta el motor con la UI.
3. **Templates** (`src/lib/pitr/templates/`) — Datos declarativos que definen cada tipo de inspección.

**Características:**
- 15 tipos de input (text, number, select, file, photo, date, etc.).
- Sistema de condiciones para mostrar/ocultar preguntas según respuestas anteriores.
- 9 reglas de validación (required, min, max, pattern, fileType, fileSize, etc.).
- Cálculo de progreso en tiempo real.
- Persistencia en localStorage con recuperación de sesión.
- Arquitectura extensible: agregar un tipo de inspección es crear un archivo de template.

## 6.8 PITR™ (Metodología)

PITR™ (Procedimiento de Inspección Técnica Remota) es la metodología propietaria de Certilab. Es más que el motor: es el proceso completo, las preguntas, la filosofía y las validaciones.

La sección 8 documenta PITR™ en detalle.

## 6.9 CKB™ (Certilab Knowledge Base)

La base de conocimiento de Certilab agrupa:
- FAQs centralizadas en `src/data/faq.ts`.
- Artículos del blog en `src/data/articles/`.
- Glosario de términos de eficiencia energética.
- Datos estructurados para Schema.org (FAQPage).
- llms.txt y llms-full.txt para indexación por IA.

Toda la CKB se genera desde una fuente única de verdad. Si un dato cambia, se cambia en un solo lugar y se propaga a toda la web.

## 6.10 CIE™ (Certilab Inspection Engine)

CIE™ es el nombre comercial del Inspection Engine. Internamente se le llama "motor PITR™". Está documentado en CF-012.

---

# 7. CUSTOMER JOURNEY

## 7.1 Diagrama del journey completo

```
                               ┌───────────────────┐
                               │ WEB PÚBLICA        │
                               │ (SEO, blog, landings)│
                               └────────┬──────────┘
                                        │
                                        ▼
                               ┌───────────────────┐
                               │ PÁGINA DE SERVICIO │
                               │ (Segunda Opinión)  │
                               └────────┬──────────┘
                                        │
                                        ▼
                               ┌───────────────────┐
                               │ FORMULARIO         │
                               │ (ContactForm)      │
                               └────────┬──────────┘
                                        │
                                        ▼
                               ┌───────────────────┐
                               │ CORREO INFORMATIVO │
                               │ (n8n automático)   │
                               └────────┬──────────┘
                                        │
                                        ▼
                               ┌───────────────────┐
                               │ PAGO (MyPOS)       │
                               │ Link de pago       │
                               └────────┬──────────┘
                                        │
                                        ▼
                               ┌───────────────────┐
                               │ CREACIÓN EXPEDIENTE│
                               │ (automático)       │
                               │ Estado: PENDIENTE  │
                               └────────┬──────────┘
                                        │
                                        ▼
                               ┌───────────────────┐
                               │ EMAIL: ACCESO      │
                               │ Link a dashboard   │
                               │ + PITR™            │
                               └────────┬──────────┘
                                        │
                                        ▼
                               ┌───────────────────┐
                               │ CLIENTE COMPLETA   │
                               │ PITR™              │
                               │ (preguntas + fotos)│
                               └────────┬──────────┘
                                        │
                                        ▼
                               ┌───────────────────┐
                               │ ARQUITECTO REVISA  │
                               │ Valida datos       │
                               └────────┬──────────┘
                                        │
                              ┌─────────┴─────────┐
                              ▼                   ▼
                    ┌──────────────┐    ┌──────────────┐
                    │ DATOS CORRECTOS│    │ DATOS FALTANTES│
                    │ Emite dictamen │    │ Solicita datos │
                    └──────┬───────┘    └──────┬───────┘
                           │                    │
                           │                    ▼
                           │          ┌───────────────────┐
                           │          │ CLIENTE APORTA     │
                           │          │ DATOS FALTANTES    │
                           │          └────────┬──────────┘
                           │                    │
                           └────────────────────┘
                                        │
                                        ▼
                               ┌───────────────────┐
                               │ DICTAMEN EMITIDO   │
                               │ Informe PDF        │
                               │ Estado: CERRADO    │
                               └────────┬──────────┘
                                        │
                                        ▼
                               ┌───────────────────┐
                               │ EMAIL: INFORME     │
                               │ + PDF descargable  │
                               └────────┬──────────┘
                                        │
                                        ▼
                               ┌───────────────────┐
                               │ DATOS ANONIMIZADOS │
                               │ → OBSERVATORIO     │
                               └───────────────────┘
```

## 7.2 Estados del expediente (máquina de estados)

El sistema de expedientes tiene actualmente 7 estados. La máquina de estados está definida en `src/lib/expediente-estados.ts`.

| Estado | Significado | ¿Quién puede cambiar? |
|--------|------------|----------------------|
| `PENDIENTE` | Expediente creado, esperando acción | Sistema, Admin |
| `EN_PROGRESO` | Cliente está completando PITR™ | Sistema |
| `PITR_COMPLETADO` | Cliente terminó PITR™, espera revisión | Sistema |
| `EN_REVISION` | Arquitecto Técnico está revisando | Técnico, Admin |
| `SOLICITUD_DATOS` | Faltan datos, se solicita al cliente | Técnico, Admin |
| `DICTAMINADO` | Dictamen emitido, informe generado | Técnico, Admin |
| `CERRADO` | Expediente finalizado | Admin |

**Transiciones permitidas (en V1.1):**
- PENDIENTE → EN_PROGRESO (al iniciar PITR™)
- EN_PROGRESO → PITR_COMPLETADO (al terminar PITR™)
- PITR_COMPLETADO → EN_REVISION (técnico toma el caso)
- EN_REVISION → SOLICITUD_DATOS (si faltan datos)
- SOLICITUD_DATOS → EN_REVISION (cliente aporta datos)
- EN_REVISION → DICTAMINADO (dictamen emitido)
- DICTAMINADO → CERRADO (informe entregado)

## 7.3 Eventos del sistema

Cada acción relevante genera un evento inmutable. Los eventos se definen en `src/lib/eventos.ts`. Son 14 tipos:

1. `EXPEDIENTE_CREADO` — Se crea un nuevo expediente.
2. `PAGO_RECIBIDO` — Se confirma el pago vía MyPOS.
3. `PITR_INICIADO` — El cliente empieza la inspección.
4. `PITR_COMPLETADO` — El cliente termina la inspección.
5. `DOCUMENTO_SUBIDO` — El cliente sube un archivo.
6. `DOCUMENTO_VALIDADO` — El Arquitecto valida un documento.
7. `DATOS_SOLICITADOS` — Se solicita información adicional.
8. `DATOS_APORTADOS` — El cliente aporta la información.
9. `REVISION_INICIADA` — El Arquitecto empieza la revisión.
10. `DICTAMEN_EMITIDO` — Se emite el dictamen técnico.
11. `INFORME_GENERADO` — Se genera el PDF del informe.
12. `EXPEDIENTE_CERRADO` — Se cierra el expediente.
13. `ANONIMIZADO` — Datos anonimizados enviados al Observatorio.
14. `ERROR_SISTEMA` — Error registrado para auditoría.

## 7.4 Emails automáticos

Los emails se envían mediante workflows de n8n, disparados por eventos del sistema.

| Evento disparador | Email | Destinatario | Contenido |
|-------------------|-------|-------------|-----------|
| `EXPEDIENTE_CREADO` | "Tu expediente está listo" | Cliente | Nº expediente, estado, instrucciones |
| `PAGO_RECIBIDO` | "Pago confirmado" | Cliente | Confirmación, factura, link a PITR™ |
| `PITR_COMPLETADO` | "Hemos recibido tu información" | Cliente | Confirmación, plazo estimado de revisión |
| `SOLICITUD_DATOS` | "Necesitamos más información" | Cliente | Qué falta, cómo aportarlo |
| `DICTAMEN_EMITIDO` | "Tu dictamen está listo" | Cliente | Resumen, link al informe |
| `EXPEDIENTE_CERRADO` | "Expediente completado" | Cliente | Resumen final, enlace al Observatorio |

## 7.5 Pagos

El flujo de pagos es:
1. Cliente completa el formulario de servicio.
2. n8n genera un link de pago de MyPOS.
3. Se envía el link por email al cliente.
4. El cliente paga mediante tarjeta en MyPOS.
5. MyPOS envía webhook a n8n confirmando el pago.
6. n8n actualiza el estado del expediente a EN_PROGRESO.
7. Se envía email de confirmación al cliente.

---

# 8. PITR™ (PROCEDIMIENTO DE INSPECCIÓN TÉCNICA REMOTA)

## 8.1 Objetivos de PITR™

PITR™ persigue cinco objetivos:

1. **Recopilar datos técnicos sin visita presencial.** Que el Arquitecto Técnico tenga toda la información que necesita para emitir un dictamen sólido.

2. **Guiar al cliente con preguntas simples.** El cliente no sabe qué datos son relevantes. PITR™ le pregunta exactamente lo necesario, en lenguaje llano.

3. **Validar coherencia automáticamente.** Si el cliente dice que el edificio es de 1970 pero tiene ventanas con rotura de puente térmico, el sistema detecta la inconsistencia.

4. **Estandarizar el proceso.** Todos los expedientes del mismo tipo pasan por las mismas preguntas y validaciones. No depende del técnico de turno.

5. **Escalar.** Un Arquitecto Técnico puede revisar 10, 50 o 100 expedientes al mes porque el sistema estructura los datos antes de que él los vea.

## 8.2 Bloques del template de Segunda Opinión

El template actual (Segunda Opinión, `src/lib/pitr/templates/segunda-opinion.ts`) se organiza en 8 bloques:

1. **Datos del solicitante** — Nombre, email, teléfono.
2. **Datos del inmueble** — Dirección, referencia catastral, tipo de vivienda.
3. **Documentación** — Subida del certificado energético actual (PDF).
4. **Datos del edificio** — Año de construcción, número de plantas, orientación.
5. **Envolvente térmica** — Fachada, cubierta, ventanas, tipo de vidrio.
6. **Instalaciones** — Calefacción, ACS, refrigeración, ventilación.
7. **Fotografías** — Fachada, ventanas, equipos de climatización.
8. **Observaciones** — Campo libre para información adicional.

Cada bloque contiene entre 3 y 12 preguntas. En total, el template tiene aproximadamente 45-50 preguntas.

## 8.3 Filosofía de preguntas

- **Una pregunta, un dato.** Nunca preguntar dos cosas en la misma pregunta.
- **Lenguaje llano, no técnico.** "¿De qué material es la fachada?" en lugar de "Composición de la envolvente vertical opaca".
- **Opciones cerradas cuando es posible.** Select con opciones predefinidas en lugar de campos de texto libre.
- **Fotos obligatorias para datos críticos.** No se puede avanzar sin subir foto de la fachada.
- **Preguntas condicionales.** Si dice que tiene calefacción de gas natural, se pregunta la antigüedad de la caldera. Si dice que no tiene calefacción, esa pregunta no aparece.

## 8.4 Evolución futura de PITR™

- **Más templates.** Informe Técnico Energético, Verificación post-reforma, Inspección pre-compra.
- **OCR automático.** Extraer datos del certificado PDF subido para pre-llenar campos y verificar consistencia.
- **IA en validaciones.** Detectar automáticamente tipologías constructivas desde las fotos.
- **Comparativa con catastro.** Cruce automático con datos catastrales para verificar superficie y año.
- **Templates comunitarios (SaaS).** Que otros técnicos puedan crear y compartir templates.

---

# 9. EXPEDIENTE DIGITAL

## 9.1 Entidades principales

El Sistema de Expedientes se compone de 6 entidades principales, documentadas en CF-002:

### Expediente
La entidad central. Representa un caso de inspección.

**Campos clave:**
- `id` — UUID único del expediente.
- `cliente_id` — FK a Cliente.
- `inmueble_id` — FK a Inmueble.
- `servicio` — Tipo de servicio (SEGUNDA_OPINION, SEGUNDA_OPINION_EXPRESS, INFORME_TECNICO).
- `estado` — Estado actual (máquina de estados de 7 estados).
- `fecha_creacion` — Timestamp de creación.
- `fecha_actualizacion` — Última modificación.
- `fecha_cierre` — Timestamp de cierre (si aplica).

### Cliente
La persona que contrata el servicio.

**Campos clave:**
- `id` — UUID único.
- `email` — Email (único).
- `nombre`, `apellidos` — Datos personales.
- `telefono` — Teléfono de contacto.
- `user_id` — FK al usuario de Supabase Auth.

### Inmueble
El inmueble inspeccionado. Es independiente del expediente.

**Campos clave:**
- `id` — UUID único.
- `cliente_id` — FK a Cliente (propietario).
- `direccion` — Dirección completa.
- `ref_catastral` — Referencia catastral.
- `tipo` — Piso, unifamiliar, local, etc.
- `superficie` — Metros cuadrados.
- `ano_construccion` — Año de construcción.
- `codigo_postal` — CP.

### Servicio
Define el tipo de servicio contratado y su precio.

**Campos clave:**
- `id` — UUID único.
- `codigo` — Código interno (ej. "SO-001").
- `nombre` — Nombre comercial.
- `precio_base` — Precio en euros.
- `duracion_estimada` — Días estimados de entrega.
- `descripcion` — Descripción para el cliente.

### Usuario (del sistema)
Persona con acceso a la plataforma.

**Campos clave:**
- `id` — UUID único.
- `user_id` — FK a Supabase Auth.
- `rol` — 'cliente', 'tecnico', 'admin'.
- `nombre`, `email` — Datos de identificación.

### Actividad (Eventos)
Registro inmutable de cada acción.

**Campos clave:**
- `id` — UUID único.
- `expediente_id` — FK a Expediente.
- `tipo` — Tipo de evento (14 tipos).
- `datos` — JSONB con los datos del evento.
- `usuario_id` — Quién realizó la acción.
- `timestamp` — Cuándo ocurrió.

## 9.2 Relaciones entre entidades

```
┌──────────┐         ┌──────────┐
│  CLIENTE │ 1 ─── N │ INMUEBLE │
└────┬─────┘         └────┬─────┘
     │                    │
     │ 1                  │ 1
     │                    │
     ▼                    ▼
┌──────────┐         ┌──────────┐
│EXPEDIENTE│ N ─── 1 │ INMUEBLE │
└────┬─────┘         └──────────┘
     │
     │ 1          N
     ├───────────────┐
     │               │
     ▼               ▼
┌──────────┐   ┌──────────┐
│ SERVICIO │   │ACTIVIDAD │
└──────────┘   └──────────┘
```

- Un **Cliente** tiene N **Inmuebles**.
- Un **Inmueble** puede tener N **Expedientes** (varias inspecciones a lo largo del tiempo).
- Un **Expediente** pertenece a un **Cliente** y a un **Inmueble**.
- Un **Expediente** tiene un **Servicio** contratado.
- Un **Expediente** tiene N **Actividades** (eventos inmutables).

## 9.3 Estados y eventos (detalle)

Ver sección 7.2 para la máquina de estados y 7.3 para los eventos. Las definiciones de código están en:
- `src/types/expediente.ts` — Tipos TypeScript.
- `src/lib/expediente-estados.ts` — Lógica de transiciones.
- `src/lib/eventos.ts` — EventBus y tipos de eventos.

## 9.4 Versionado

Cada cambio en el estado del expediente queda registrado como un evento. Los eventos son **append-only**: nunca se modifican ni se eliminan.

Esto garantiza trazabilidad absoluta. En cualquier momento se puede reconstruir el historial completo de un expediente consultando sus eventos ordenados por timestamp.

## 9.5 Documentos

Tipos de documentos que pueden asociarse a un expediente (definidos en `src/types/documento.ts`):

- `CERTIFICADO_ORIGINAL` — El certificado energético a auditar.
- `FACTURA` — Factura del servicio.
- `INFORME_FINAL` — El dictamen técnico en PDF.
- `DOCUMENTACION_COMPLEMENTARIA` — Cualquier documento adicional.
- `FOTOGRAFIA` — Fotos subidas por el cliente.
- `NOTA_TECNICA` — Notas internas del Arquitecto.

## 9.6 Pagos

Tipos de pago (definidos en `src/types/pago.ts`):
- `PENDIENTE` — Pago no realizado.
- `COMPLETADO` — Pago confirmado por MyPOS.
- `RECHAZADO` — Pago rechazado.
- `REEMBOLSADO` — Pago devuelto.

## 9.7 Permisos

Control de acceso por rol:

| Acción | cliente | tecnico | admin |
|--------|---------|---------|-------|
| Ver expedientes propios | ✅ | ✅ | ✅ |
| Ver todos los expedientes | ❌ | ✅ | ✅ |
| Crear expediente | ✅ | ✅ | ✅ |
| Cambiar estado expediente | ❌ | ✅ | ✅ |
| Ver backoffice | ❌ | ✅ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ✅ |
| Ver datos anonimizados | ❌ | ✅ | ✅ |
| Configurar sistema | ❌ | ❌ | ✅ |

---

# 10. OBSERVATORIO

## 10.1 Objetivo

El Observatorio Certilab convierte cada expediente cerrado en un activo de conocimiento. Su propósito es:

1. **Informar al mercado.** Publicar datos reales (anonimizados) sobre el estado de la certificación energética en España.
2. **Posicionar SEO.** Los informes del Observatorio generan tráfico orgánico, backlinks y autoridad de dominio.
3. **Investigar patrones.** Detectar zonas, tipologías y rangos de precio con mayor incidencia de certificados incorrectos.
4. **Entrenar IA.** Los datos agregados sirven para entrenar modelos de detección automática de anomalías.

## 10.2 Modelo de datos (planificado)

Los datos se almacenan en una tabla `observatorio` en Supabase, separada de los expedientes:

- **id** — UUID único del registro anonimizado.
- **expediente_id** — FK al expediente original (solo para trazabilidad, no expuesto).
- **fecha_anonimizacion** — Timestamp.
- **codigo_postal** — Solo los 2 primeros dígitos (provincia).
- **tipo_inmueble** — Piso, unifamiliar, etc.
- **ano_construccion_rango** — Década (ej. "1970-1980"), no año exacto.
- **superficie_rango** — Rango (ej. "60-90m²").
- **letra_original** — Letra del certificado auditado (A-G).
- **letra_certilab** — Letra según dictamen Certilab.
- **diferencia_letras** — Número de letras de diferencia.
- **dictamen** — "CORRECTO", "INFLADO", "MAL_CALCULADO", "FALSEADO".
- **servicio** — Tipo de servicio contratado.
- **tipo_edificio** — Bloque, unifamiliar aislado, unifamiliar adosado.
- **orientacion** — Norte, Sur, Este, Oeste, Mixta.
- **calefaccion_tipo** — Gas natural, eléctrica, sin calefacción, etc.
- **acs_tipo** — Gas natural, eléctrica, solar, etc.

**Reglas de anonimización:**
- Nunca se almacena dirección, referencia catastral ni nombre del cliente.
- El código postal se trunca a provincia.
- Las superficies y fechas se agrupan en rangos.
- Los datos no permiten identificar un inmueble concreto.

## 10.3 Informes planificados

- **Informe trimestral** — Publicación cada 3 meses con estadísticas agregadas.
- **Informe por CCAA** — Comparativa entre comunidades autónomas.
- **Informe de tipologías** — Qué tipología de vivienda tiene más certificados incorrectos.
- **Informe anual** — Resumen del año con tendencias.

## 10.4 SEO del Observatorio

Cada informe del Observatorio se publica como página en la web, con:
- URL canónica: `/observatorio/[slug]`.
- Metadatos completos para SEO.
- Schema.org Dataset para Google Dataset Search.
- Datos descargables en CSV/JSON.
- Gráficos estáticos (SVG) para indexabilidad.
- Enlaces cruzados con artículos del blog.

## 10.5 Investigación con IA (planificado)

Los datos agregados del Observatorio alimentarán modelos de IA para:
- Predecir la probabilidad de que un certificado esté inflado según tipología y zona.
- Detectar patrones de falseamiento (ej. "ventanas con rotura de puente térmico en edificios de 1960").
- Generar alertas tempranas para zonas con alta incidencia de certificados incorrectos.

---

# 11. IA (INTELIGENCIA ARTIFICIAL)

## 11.1 Qué hará la IA

La IA en Certilab será un **asistente**, nunca un decisor. Sus funciones planificadas:

1. **Detección de anomalías.** Analizar los datos del PITR™ y señalar inconsistencias (ej. "dice que el edificio es de 1970 pero tiene ventanas con rotura de puente térmico").
2. **Propuesta de letra energética.** Basándose en los datos del inmueble, proponer un rango de letra probable. El Arquitecto Técnico confirma o corrige.
3. **Generación de borradores de informe.** A partir de los datos validados, redactar un primer borrador del dictamen.
4. **Clasificación de documentos.** Identificar automáticamente el tipo de documento subido (certificado, factura, foto, DNI).
5. **Extracción de datos (OCR).** Leer el certificado energético en PDF y extraer datos estructurados.
6. **Análisis del Observatorio.** Detectar patrones y correlaciones en los datos agregados.
7. **Respuestas a FAQs.** Asistente conversacional para preguntas frecuentes (con supervisión).

## 11.2 Qué NUNCA hará la IA

- **NUNCA firmará un dictamen.** La firma es del Arquitecto Técnico colegiado.
- **NUNCA cambiará el estado de un expediente.** Requiere validación humana.
- **NUNCA se comunicará con el cliente sin supervisión.**
- **NUNCA tomará decisiones con consecuencias legales.**
- **NUNCA sustituirá el criterio profesional ante casos ambiguos.**
- **NUNCA modificará datos del expediente sin registro de auditoría.**
- **NUNCA decidirá qué es "correcto" sin que un humano lo confirme.**

## 11.3 Qué puede proponer

La IA puede **proponer**:
- Un rango de letra energética.
- Un estado sugerido para el expediente.
- Un texto de dictamen pre-redactado.
- Documentos sospechosos de ser incorrectos.
- Preguntas adicionales para el PITR™.

Toda propuesta de la IA debe ser validada por un Arquitecto Técnico antes de aplicarse.

## 11.4 Qué debe validar el Arquitecto Técnico

El Arquitecto Técnico siempre valida:
- La letra energética final del dictamen.
- El texto completo del informe antes de su emisión.
- Los cambios de estado del expediente.
- Las solicitudes de información adicional al cliente.
- La clasificación de documentos dudosos.

## 11.5 Modelos que podrán utilizarse

La selección de modelos se basará en privacidad, coste y precisión:
- **OpenAI GPT-4o** — Para generación de texto y razonamiento complejo (borradores, detección de anomalías).
- **OpenAI o1** — Para razonamiento técnico avanzado (validación normativa).
- **Claude Sonnet** — Alternativa, especialmente para análisis de documentos largos.
- **Modelos locales (Ollama)** — Para tareas que no deban salir del servidor (anonimización, clasificación simple).
- **Vision API** — Para análisis de fotografías (detección de tipologías constructivas, estado de fachadas).

**Regla absoluta:** ningún dato personal sale del entorno Certilab hacia APIs externas. Los datos enviados a modelos externos deben estar anonimizados.

## 11.6 Cómo evolucionará

- **Fase 1 (V2.0):** OCR de certificados + propuesta de letra energética. Modelos locales para tareas simples.
- **Fase 2 (V2.5):** Generación de borradores de dictamen + detección de anomalías en fotos. Modelos cloud con datos anonimizados.
- **Fase 3 (V3.0):** Asistente conversacional + análisis predictivo del Observatorio + templates automáticos de PITR™.
- **Fase 4 (V4.0):** IA proactiva que sugiere inspecciones a clientes según datos agregados.

---

# 12. AUTOMATIZACIONES

## 12.1 n8n — El orquestador central

n8n es la herramienta de automatización que conecta todos los sistemas externos de Certilab. Sus workflows se ejecutan como webhooks o en intervalos programados.

**Por qué n8n:**
- Código abierto y autoalojado (sin dependencia de terceros).
- Editor visual que permite a cualquier miembro del equipo entender los flujos.
- Webhooks nativos para recibir eventos de MyPOS, Supabase y la web.
- Conexiones con Google Drive, email (SMTP) y APIs REST.
- Versionado de workflows en el repositorio.

**Workflows actuales y planificados:**

| Workflow | Disparador | Acción |
|----------|-----------|--------|
| `nuevo-lead` | Formulario web enviado | Crear lead en CRM, enviar email informativo |
| `generar-link-pago` | Lead cualificado → compra | Crear link de pago MyPOS, enviar email |
| `pago-confirmado` | Webhook MyPOS | Actualizar estado expediente, enviar email |
| `crear-expediente` | Pago confirmado | Crear expediente en Supabase, enviar credenciales |
| `notificar-estado` | Cambio de estado expediente | Enviar email al cliente según plantilla |
| `enviar-informe` | Dictamen emitido | Generar PDF, enviar email, subir a Drive |
| `anonimizar` | Expediente cerrado | Extraer datos, anonimizar, insertar en Observatorio |
| `sincronizar-drive` | Diario | Backup de informes a Google Drive |
| `recordatorio-pago` | Programado 48h | Email recordatorio si pago pendiente |
| `recordatorio-pitr` | Programado 72h | Email si PITR™ no completado |

## 12.2 Emails

Los emails son transaccionales y se envían desde n8n vía SMTP. Nunca se usa servicio de email marketing para correos transaccionales.

**Plantillas de email:**
- `nuevo-lead` — "Gracias por tu interés, esto es lo que sucede ahora".
- `link-pago` — "Tu servicio está listo para contratar. Link de pago".
- `pago-confirmado` — "Pago recibido. Aquí tienes tu acceso".
- `acceso-plataforma` — "Bienvenido a Certilab. Tus credenciales".
- `pitr-pendiente` — "Recuerda completar tu inspección".
- `datos-solicitados` — "Necesitamos esta información adicional".
- `informe-listo` — "Tu dictamen está listo. Descárgalo aquí".
- `expediente-cerrado` — "Expediente completado. Gracias por confiar".

**Reglas:**
- Todo email incluye número de expediente.
- Nunca se adjunta el informe directamente (solo link de descarga segura).
- Todos los emails tienen link de baja (GDPR).
- Los emails se versionan como parte del código (plantillas en `/src/data/emails/`).

## 12.3 MyPOS

MyPOS es la pasarela de pagos de Certilab (V1.1+).

**Funcionamiento:**
1. n8n crea un link de pago vía API de MyPOS.
2. Se envía al cliente por email.
3. El cliente paga con tarjeta en la web de MyPOS.
4. MyPOS envía webhook a n8n confirmando el pago.
5. n8n dispara `crear-expediente` y envía email de confirmación.

**Ventajas de MyPOS:**
- Pagos con tarjeta sin necesidad de integrar TPV virtual.
- Webhooks fiables para automatización.
- Comisiones transparentes.
- No almacenamos datos de tarjeta (PCI compliance delegada).

## 12.4 OCR (Extracción de datos de PDF)

La API `/api/extraer-certificado` (`src/app/api/extraer-certificado/route.ts`) permite extraer datos de un certificado energético en PDF.

**Flujo:**
1. El cliente sube su certificado en PDF durante el PITR™.
2. El backend procesa el PDF con `pdf-parse`.
3. Se extraen campos mediante regex: dirección, referencia catastral, letra, consumo, emisiones.
4. Los datos extraídos se devuelven al frontend para pre-llenar el formulario.
5. El Arquitecto Técnico valida los datos extraídos contra el PDF original.

**Limitaciones actuales (V1.1):**
- Solo procesa PDFs con texto nativo (no escaneados).
- La extracción depende del formato del certificado (varía por CCAA y software).
- No usa IA todavía (será Fase 1 IA en V2.0).

## 12.5 Catastro

Integración planificada con la Sede Electrónica del Catastro:
- Validar referencia catastral durante PITR™.
- Obtener año de construcción, superficie y uso del inmueble.
- Detectar discrepancias entre los datos declarados y los catastrales.

**Estado:** Planificado para V2.0.

## 12.6 CE3X

CE3X es el software oficial de certificación energética en España. Integración planificada:
- Automatizar el cálculo de la letra energética tras validación del Arquitecto.
- Generar el archivo XML oficial para registro en la Generalitat.

**Estado:** Planificado para V2.0.

## 12.7 Google Drive

Google Drive actúa como almacén secundario de documentos:
- Backup automático de informes PDF generados.
- Backup de certificados originales subidos por clientes.
- Sincronización diaria programada desde n8n.

**Regla:** Google Drive es backup, no fuente de verdad. La fuente de verdad es Supabase Storage.

## 12.8 Supabase

Supabase es el backend de Certilab. Proporciona:
- **Auth:** Autenticación de usuarios (email/password, magic link).
- **Database:** PostgreSQL con Row Level Security.
- **Storage:** Almacenamiento de documentos PDF y fotos.
- **Realtime:** Notificaciones en tiempo real (futuro).

**Integraciones vía n8n:**
- Insertar/actualizar expedientes vía API REST.
- Leer eventos para disparar workflows.
- Subir documentos a Storage.

---

# 13. ROADMAP

## 13.1 Visión general de Releases

Cada Release es una versión de la plataforma con funcionalidades incrementales. Las Releases se etiquetan en Git (`git tag v1.0.0`).

## 13.2 V1.0 — LANZAMIENTO (Completado ✅)

**Objetivo:** Web pública con SEO y landings de captación.

**Entregables:**
- Home page con Hero, ProblemSection, ServicesGrid, HowItWorks, Testimonials, FAQ.
- Páginas de servicios: Segunda Opinión, Segunda Opinión Express, Informe Técnico Energético.
- Blog con 30 artículos SEO.
- Landing "7 señales de certificado incorrecto".
- Páginas legales (aviso legal, privacidad, cookies).
- Formulario de contacto (ContactForm) con WhatsApp y email.
- Buscador de certificados (castellano y catalán).
- Sitemap dinámico, robots.txt, metadatos por página.
- Schema.org (Organization, FAQPage, Article).

**Estado:** ✅ COMPLETADO. Q1 2025.

## 13.3 V1.1 — PLATAFORMA BÁSICA (Completado ✅)

**Objetivo:** Área privada con dashboard y expedientes.

**Entregables:**
- Sistema de autenticación con Supabase Auth.
- Dashboard de cliente con vista de expedientes.
- Creación de nuevo expediente.
- Máquina de estados de expedientes (7 estados).
- Eventos inmutables (14 tipos).
- Backoffice básico para Arquitectos Técnicos.
- PITR™ engine (motor, hook, template de Segunda Opinión).
- UI del PITR™ con preguntas y navegación.
- Persistencia en localStorage.
- Extracción OCR de certificados (API).
- Integración con n8n y MyPOS para pagos.

**Estado:** ✅ COMPLETADO. Q2 2025.

## 13.4 V1.2 — OBSERVATORIO MÍNIMO FUNCIONAL (Completado ✅)

**Objetivo:** Publicar los primeros datos del Observatorio.

**Entregables:**
- Modelo de datos del Observatorio en Supabase.
- Workflow de anonimización de expedientes cerrados en n8n.
- Página pública `/observatorio` con primer informe.
- Gráficos estáticos (SVG) con datos agregados.
- Schema.org Dataset.
- Artículo del blog presentando el Observatorio.
- Metodología de investigación publicada.

**Estado:** ✅ COMPLETADO. Q1 2026.

## 13.5 V1.3 — CONSOLIDACIÓN (En curso 🔄)

**Objetivo:** Estabilizar, testear y optimizar.

**Entregables:**
- Tests unitarios para el motor PITR™.
- Tests de integración para expedientes.
- Optimización de rendimiento (Lighthouse > 90).
- Corrección de bugs reportados en V1.1-V1.2.
- Mejora del backoffice (filtros avanzados, exportación CSV).
- Eliminación de deuda técnica de localStorage (migración a Supabase).
- Sistema de notificaciones en tiempo real.

**Estado:** 🔄 EN CURSO. Q2 2026.

## 13.6 V1.4 — SEGUNDA OPINIÓN EXPRESS

**Objetivo:** Lanzar el servicio exprés automatizado.

**Entregables:**
- Template PITR™ reducido para Segunda Opinión Express.
- Flujo de pago + inspección en < 72h.
- Automatización completa del proceso (sin intervención del Arquitecto para casos claros).
- Informe Express generado con datos pre-validados.

**Estado:** 📋 PLANIFICADO.

## 13.7 V2.0 — IA ASISTENTE

**Objetivo:** Introducir IA como asistente del Arquitecto.

**Entregables:**
- OCR inteligente de certificados (sin depender de formato).
- Propuesta automática de letra energética.
- Detección de anomalías en datos del PITR™.
- Borrador automático de dictamen.
- Integración con Catastro (validación de datos).
- Integración con CE3X (cálculo automatizado).

**Estado:** 📋 PLANIFICADO.

## 13.8 V2.5 — OBSERVATORIO COMPLETO

**Objetivo:** Observatorio con informes trimestrales automáticos.

**Entregables:**
- Informes trimestrales automatizados.
- Informes por CCAA.
- Dashboard público interactivo.
- Alertas de tendencias.
- API del Observatorio para terceros.

**Estado:** 📋 PLANIFICADO.

## 13.9 V3.0 — SAAS (MULTI-TÉCNICO)

**Objetivo:** Permitir que otros Arquitectos Técnicos usen PITR™.

**Entregables:**
- Multitenant: espacios separados por técnico.
- Suscripciones y facturación.
- Templates configurables.
- Marca blanca en informes.
- Marketplace de templates comunitarios.

**Estado:** 📋 PLANIFICADO.

## 13.10 V4.0 — IA PROACTIVA

**Objetivo:** IA que sugiera acciones preventivas.

**Entregables:**
- Predicción de certificados incorrectos por zona/ tipología.
- Recomendaciones proactivas a propietarios.
- Integración con portales inmobiliarios.
- API pública completa.

**Estado:** 📋 PLANIFICADO.

---

# 14. PRINCIPIOS DE DESARROLLO

## 14.1 SOLID

Todo el código de Certilab sigue los principios SOLID:

- **S — Single Responsibility:** Cada archivo tiene una sola razón para cambiar. Ejemplo: `motor.ts` ejecuta templates, `use-pitr.ts` conecta con React.
- **O — Open/Closed:** Abierto a extensión, cerrado a modificación. Ejemplo: agregar un tipo de inspección es crear un archivo de template, no modificar el motor.
- **L — Liskov Substitution:** Las implementaciones de interfaces son intercambiables. Ejemplo: `StorageInterface` permite cambiar de localStorage a Supabase sin tocar el código cliente.
- **I — Interface Segregation:** Interfaces pequeñas y específicas. Ejemplo: `PitrQuestion`, `PitrBlock`, `PitrTemplate` son tipos separados, no un tipo monolítico.
- **D — Dependency Inversion:** El código depende de abstracciones, no de implementaciones. Ejemplo: `usePitr` recibe un `PitrTemplate`, no lo importa directamente.

## 14.2 Clean Architecture

La arquitectura separa estrictamente:
- **Dominio** (`src/lib/pitr/motor.ts`, `src/lib/expediente-estados.ts`, `src/types/`) — Lógica de negocio pura, sin dependencias de framework.
- **Aplicación** (`src/lib/pitr/use-pitr.ts`, `src/lib/eventos.ts`) — Orquestación, casos de uso.
- **Infraestructura** (`src/lib/integraciones.ts`, `src/lib/storage/`) — Acceso a APIs externas, bases de datos, almacenamiento.
- **Presentación** (`src/components/`, `src/app/`) — React, CSS, UI.

**Regla absoluta:** La lógica de negocio nunca importa React. React importa la lógica de negocio, no al revés.

## 14.3 Domain-Driven Design (DDD)

- **Entidades** con identidad: `Expediente`, `Cliente`, `Inmueble`.
- **Value Objects** sin identidad: `Direccion`, `Precio`.
- **Agregados:** `Expediente` es el agregado raíz que agrupa `Documentos` y `Actividades`.
- **Eventos de dominio:** Cada cambio de estado genera un evento inmutable.
- **Repositorios:** Abstracción sobre Supabase para acceso a datos.

## 14.4 Componentes reutilizables

Todo componente de UI es autónomo y reutilizable:
- No depende de rutas específicas.
- Recibe datos por props, no los busca él mismo.
- CSS Modules con scope local (nunca estilos globales para componentes).
- Estados: loading, empty, error, success documentados en cada componente.

## 14.5 TypeScript estricto

`tsconfig.json` tiene `strict: true`. Reglas adicionales:
- No `any` sin justificación documentada.
- Tipos exportados desde `src/types/` para entidades compartidas.
- `zod` para validación de datos externos (APIs, formularios).
- Interfaces, no `type` para entidades (extensibilidad).
- `type` para uniones y utilidades.

## 14.6 No duplicación

- **DRY estricto** para lógica de negocio.
- **DRY flexible** para UI: se permite cierta duplicación entre páginas muy diferentes si abstraerlas complica el código.
- Datos centralizados en `src/data/` (FAQs, servicios, artículos).
- Una fuente de verdad por cada dato.

## 14.7 Documentación obligatoria

- **Framework (docs/CF-XXX):** Documentos de arquitectura y diseño.
- **Releases (docs/releases/):** Notas de cada Release.
- **Código:** JSDoc para funciones públicas y tipos exportados.
- **README.md:** Cómo arrancar el proyecto en local.
- **AGENTS.md:** Reglas para herramientas de IA.

**Regla:** si no está documentado, no existe.

## 14.8 Build limpio

- `npm run build` debe pasar sin warnings ni errores.
- ESLint configurado y sin desactivaciones injustificadas.
- Sin imports no usados.
- Sin variables no usadas.
- CSS Modules sin estilos muertos.

## 14.9 Commits profesionales

Formato: `tipo(scope): descripción`

Tipos:
- `feat` — Nueva funcionalidad.
- `fix` — Corrección de bug.
- `docs` — Documentación.
- `refactor` — Refactorización sin cambios funcionales.
- `test` — Tests.
- `chore` — Tareas de mantenimiento.

Ejemplos:
- `feat(pitr): añadir sistema de condiciones`
- `fix(expedientes): corregir transición PITR_COMPLETADO`
- `docs(framework): crear CF-000`

## 14.10 Tags por Release

Cada Release se etiqueta en Git:
- `git tag -a v1.0.0 -m "Release V1.0 — Lanzamiento web pública"`
- `git tag -a v1.1.0 -m "Release V1.1 — Plataforma básica"`

---

# 15. REGLAS ABSOLUTAS

Estas reglas no pueden romperse bajo ninguna circunstancia. Si una regla resulta inviable, debe debatirse y modificarse formalmente en el Framework, no ignorarse.

## 15.1 Reglas de Arquitectura

1. **Nunca modificar la arquitectura sin actualizar el Framework.** Si cambia la estructura, CF-000 (este documento) debe reflejarlo antes o simultáneamente.

2. **Nunca romper compatibilidad hacia atrás.** Los templates de PITR™ existentes deben seguir funcionando. La API de expedientes debe mantener contratos.

3. **Nunca duplicar entidades.** Si `Expediente` existe en el dominio, no crear `Case` o `InspectionRecord` con los mismos datos.

4. **Nunca guardar lógica de negocio en componentes React.** Un componente React muestra datos. La lógica está en `src/lib/`.

5. **Nunca acoplar la UI a una fuente de datos concreta.** Los componentes reciben datos por props. No hacen fetch directamente.

## 15.2 Reglas de IA

6. **Nunca sustituir criterio técnico por IA.** La IA propone. El Arquitecto Técnico decide. Siempre.

7. **Nunca enviar datos personales a modelos externos.** Nombre, dirección, DNI, teléfono, email del cliente nunca salen del entorno Certilab hacia OpenAI, Anthropic u otros.

8. **Nunca automatizar decisiones legales.** Un cambio de estado, un dictamen, una firma: siempre requieren acción humana.

## 15.3 Reglas de Datos

9. **Nunca eliminar trazabilidad.** Los eventos son append-only. No se borran. No se modifican.

10. **Nunca preguntar al cliente información técnica que pueda inferirse.** Si el certificado tiene la referencia catastral, no preguntarla. Si el catastro tiene la superficie, no pedirla.

11. **Todo expediente cerrado debe poder alimentar el Observatorio.** Si un expediente no puede anonimizarse, el diseño está mal.

12. **Nunca duplicar información entre sistemas.** La fuente de verdad de un expediente es Supabase. Google Drive es backup, no fuente alternativa.

## 15.4 Reglas de Desarrollo

13. **Nunca escribir código sin documentación.** Funciones exportadas: JSDoc. Entidades: comentario de propósito. APIs: descripción de entrada/salida.

14. **Nunca hacer push a main directamente.** Solo mediante PR revisado.

15. **Nunca desplegar sin build limpio.** `npm run build` debe pasar. ESLint debe pasar.

16. **Nunca usar `any` en TypeScript sin un comentario que lo justifique.**

## 15.5 Reglas de Producto

17. **El cliente nunca hace trabajo técnico.** PITR™ hace preguntas en lenguaje llano. El cliente no calcula, no interpreta normativa, no decide qué es relevante.

18. **El Arquitecto Técnico siempre valida.** Ningún expediente se cierra sin revisión humana.

19. **El expediente es la fuente de verdad.** Todo lo que ocurre queda registrado en el expediente. Si no está en el expediente, no ocurrió.

20. **El inmueble es permanente.** Los datos del inmueble persisten entre expedientes. Un cliente puede pedir varias inspecciones del mismo inmueble sin reintroducir datos.

---

# 16. ESTADO ACTUAL

## 16.1 Información del proyecto

| Campo | Valor |
|-------|-------|
| **Nombre** | Certilab |
| **Repositorio** | `certilabcat-glitch/certilab-next` |
| **Framework** | Next.js 15 (App Router) |
| **Lenguaje** | TypeScript (strict) |
| **Estilos** | CSS Modules |
| **Backend** | Supabase (Auth, DB, Storage) |
| **Despliegue** | Vercel |
| **Automatización** | n8n |
| **Pagos** | MyPOS |
| **Versión actual** | V1.3 (Consolidación) |
| **Último commit** | `040296d` |

## 16.2 Módulos terminados

| Módulo | Versión | Estado |
|--------|---------|--------|
| Web pública (SEO, blog, landings) | V1.0 | ✅ Completo |
| Formulario de contacto + WhatsApp | V1.0 | ✅ Completo |
| Autenticación (Supabase Auth) | V1.1 | ✅ Completo |
| Dashboard cliente | V1.1 | ✅ Completo |
| Sistema de expedientes (7 estados) | V1.1 | ✅ Completo |
| Eventos inmutables (14 tipos) | V1.1 | ✅ Completo |
| Backoffice básico | V1.1 | ✅ Completo |
| Motor PITR™ (`src/lib/pitr/motor.ts`) | V1.1 | ✅ Completo |
| UI PITR™ (React, navegación) | V1.1 | ✅ Completo |
| Template Segunda Opinión | V1.1 | ✅ Completo |
| OCR básico (extraer-certificado) | V1.1 | ✅ Completo |
| Integración MyPOS (pagos) | V1.1 | ✅ Completo |
| Framework documental (CF-000, 002, 011, 012) | V1.1 | ✅ Completo |

## 16.3 Módulos en curso

| Módulo | Versión | Estado |
|--------|---------|--------|
| Tests unitarios PITR™ | V1.3 | 🔄 En desarrollo |
| Tests integración expedientes | V1.3 | 🔄 En desarrollo |
| Migración localStorage → Supabase | V1.3 | 🔄 En desarrollo |
| Mejora backoffice (filtros, CSV) | V1.3 | 🔄 En desarrollo |
| Sistema notificaciones en tiempo real | V1.3 | 🔄 Pendiente |

## 16.4 Módulos pendientes

| Módulo | Versión | Prioridad |
|--------|---------|-----------|
| Tests unitarios PITR™ | V1.3 | Alta |
| Tests integración expedientes | V1.3 | Alta |
| Optimización Lighthouse > 90 | V1.3 | Media |
| Template Segunda Opinión Express | V1.4 | Alta |
| OCR inteligente con IA | V2.0 | Alta |
| Propuesta IA letra energética | V2.0 | Media |
| Integración Catastro | V2.0 | Media |
| Integración CE3X | V2.0 | Baja |
| Informes Observatorio | V2.5 | Media |
| SaaS multitécnico | V3.0 | Baja |

## 16.5 Deuda técnica conocida

| Deuda | Impacto | Plan |
|-------|---------|------|
| Sin tests automatizados | Riesgo de regresiones | V1.3 |
| Persistencia solo en localStorage | Datos no sincronizados entre dispositivos | V1.3 |
| OCR dependiente de formato (sin IA) | Baja tasa de extracción en PDFs no estándar | V2.0 |
| Backoffice con UI mínima | Poca eficiencia para técnicos | V1.3 |
| Sin sistema de notificaciones realtime | Cliente debe recargar para ver cambios | V1.3 |
| Observatorio sin datos reales | Sin valor público todavía | V1.2 ✅ |

---

# 17. PRÓXIMOS PASOS

## 17.1 Siguiente Release: V1.3 — Consolidación

La Release V1.3 está en curso. Es la prioridad absoluta ahora mismo.

**Qué DEBE hacerse:**
1. Escribir tests unitarios para el motor PITR™ (`src/lib/pitr/motor.ts`).
2. Escribir tests de integración para el sistema de expedientes.
3. Migrar la persistencia de PITR™ de localStorage a Supabase.
4. Mejorar el backoffice: filtros avanzados, exportación CSV, paginación.
5. Implementar sistema de notificaciones en tiempo real.
6. Optimizar rendimiento (Lighthouse > 90).
7. Corregir bugs reportados en V1.1 y V1.2.

**Qué NO debe hacerse en V1.3:**
- No añadir IA (es V2.0).
- No lanzar Segunda Opinión Express (es V1.4).
- No crear templates de PITR™ adicionales (salvo que sean necesarios para bugs).
- No refactorizar la máquina de estados.
- No iniciar V1.4 hasta cerrar V1.3.

## 17.2 Decisiones ya tomadas

1. **Los tests serán escritos con Vitest.** Framework moderno, compatible con Vite/Next.js.
2. **localStorage se migrará a Supabase con caché local.** Sesión persistente entre dispositivos.
3. **Las notificaciones serán vía n8n (email + dashboard).** En tiempo real vía Supabase Realtime.
4. **El backoffice se prioriza sobre nuevas funcionalidades.** Sin buena UX de backoffice no se escala.
5. **Todos los bugs reportados se documentan en GitHub Issues.** Trazabilidad completa.

## 17.3 Decisiones pendientes

1. **¿Usar Supabase Realtime o WebSockets propios para notificaciones?** Impacto en coste vs control.
2. **¿Incluir pruebas E2E con Playwright en V1.3 o solo unitarias + integración?** Depende del tiempo disponible.
3. **¿Exportar CSV en frontend o generar en servidor?** El servidor escala mejor para grandes volúmenes.
4. **¿Migrar datos de localStorage existentes a Supabase o empezar de cero?** Impacto en clientes activos.
5. **¿Desplegar en staging antes de producción?** Reduciría riesgos de regresión.

---

# 18. APÉNDICES

## 18.1 Glosario

| Término | Definición |
|---------|-----------|
| **Arquitecto Técnico** | Profesional colegiado que firma los dictámenes de Certilab. No es un empleado: es el profesional responsable. |
| **Certificado energético** | Documento oficial que califica la eficiencia energética de un inmueble con letras de la A (más eficiente) a la G (menos eficiente). |
| **CKB™** | Certilab Knowledge Base. Base de conocimiento que agrupa FAQs, artículos, glosario y datos estructurados. |
| **CIE™** | Certilab Inspection Engine. Nombre comercial del motor PITR™. |
| **Cliente** | Persona que contrata un servicio de Certilab. Es el propietario del inmueble, no un profesional. |
| **Dictamen** | Conclusión técnica del Arquitecto sobre el certificado energético auditado. |
| **Expediente** | Unidad de trabajo que agrupa todos los datos, documentos y eventos de un servicio contratado. |
| **Framework (CF)** | Conjunto de documentos CF-XXX que constituyen la documentación maestra del proyecto. |
| **Inspection Engine** | Motor TypeScript que ejecuta templates de inspección. |
| **Observatorio** | Base de conocimiento público con datos anonimizados de expedientes cerrados. |
| **PITR™** | Procedimiento de Inspección Técnica Remota. Metodología propietaria y marca registrada de Certilab. |
| **Template PITR™** | Archivo declarativo que define las preguntas, bloques y validaciones de un tipo de inspección. |
| **Segunda Opinión** | Servicio de auditoría de un certificado energético existente para verificar si es correcto. |
| **Segunda Opinión Express** | Versión reducida y automatizada de Segunda Opinión para casos simples. |

## 18.2 Siglas

| Sigla | Significado |
|-------|------------|
| **ACS** | Agua Caliente Sanitaria |
| **CCAA** | Comunidad Autónoma |
| **CE3X** | Software oficial de certificación energética en España |
| **CF** | Certilab Framework (documentos CF-XXX) |
| **CKB** | Certilab Knowledge Base |
| **CIE** | Certilab Inspection Engine |
| **CP** | Código Postal |
| **CTE** | Código Técnico de la Edificación |
| **DDD** | Domain-Driven Design |
| **DRY** | Don't Repeat Yourself |
| **GDPR** | General Data Protection Regulation (RGPD en España) |
| **MITECO** | Ministerio para la Transición Ecológica y el Reto Demográfico |
| **OCR** | Optical Character Recognition |
| **PITR** | Procedimiento de Inspección Técnica Remota |
| **RD** | Real Decreto |
| **SEO** | Search Engine Optimization |
| **SOLID** | Principios de diseño de software (Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion) |

## 18.3 Diagramas

Los diagramas están embebidos como arte ASCII a lo largo del documento:
- **Arquitectura general:** Sección 4.
- **Customer journey:** Sección 7.1.
- **Relaciones entre entidades:** Sección 9.2.

Diagramas externos (SVG/PNG) se almacenan en `docs/diagrams/` cuando se generen.

## 18.4 Cronología del proyecto

| Fecha | Hito |
|-------|------|
| **Q1 2025** | V1.0 — Lanzamiento web pública |
| **Q2 2025** | V1.1 — Plataforma básica con expedientes y PITR™ |
| **Q1 2026** | V1.2 — Observatorio mínimo funcional (completado ✅) |
| **Q2 2026** | V1.3 — Consolidación y tests |
| **Q3 2026** | V1.4 — Segunda Opinión Express |
| **Q4 2026** | V2.0 — IA asistente |
| **2027** | V2.5 — Observatorio completo |
| **2027** | V3.0 — SaaS multitécnico |
| **2028** | V4.0 — IA proactiva |

## 18.5 Estructura del proyecto (árbol de carpetas)

```
web-garraf/
├── docs/                          # Documentación del Framework
│   ├── CF-000-PROJECT-BRAIN.md    # Este documento
│   ├── CF-002-EXPEDIENTE-DIGITAL.md
│   ├── CF-011-FOUNDATION.md
│   ├── CF-012-PITR-MOTOR.md
│   ├── RELEASE-V1.2.md
│   ├── AUDITORIA-ARQUITECTURA-V1.1.md
│   ├── IMPLEMENTACION-V1.1.md
│   ├── architecture/
│   ├── audits/
│   ├── editorial/
│   ├── expedientes/
│   ├── observatorio/
│   └── releases/
├── public/                        # Archivos estáticos
│   ├── robots.txt
│   ├── llms.txt
│   ├── llms-full.txt
│   └── *.svg, *.png, *.jpg
├── scripts/                       # Scripts de utilidad
│   ├── analyze-faq.mjs
│   ├── analyze-faq-articles.mjs
│   ├── check-seo.mjs
│   ├── check-unused-css.mjs
│   ├── generate-llms.mjs
│   ├── generate-og-image.mjs
│   └── archive/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Layout raíz
│   │   ├── page.tsx               # Home
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   ├── not-found.tsx
│   │   ├── api/
│   │   │   └── extraer-certificado/
│   │   ├── (servicios)/           # Route group: servicios
│   │   │   ├── segunda-opinion/
│   │   │   ├── segunda-opinion-express/
│   │   │   └── informe-tecnico-energetico/
│   │   ├── (legal)/               # Route group: páginas legales
│   │   │   ├── aviso-legal/
│   │   │   ├── privacidad/
│   │   │   └── cookies/
│   │   ├── (plataforma)/          # Route group: área privada
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard

│   │   │   ├── dashboard/
│   │   │   ├── mis-expedientes/
│   │   │   ├── nuevo-expediente/
│   │   │   ├── configuracion/
│   │   │   ├── pitr/
│   │   │   │   └── segunda-opinion/
│   │   │   └── backoffice/
│   │   │       ├── expedientes/
│   │   │       ├── clientes/
│   │   │       ├── inmuebles/
│   │   │       ├── usuarios/
│   │   │       └── configuracion/
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   ├── gracias/
│   │   ├── resultado-auditoria/
│   │   ├── sobre-nosotros/
│   │   ├── buscador-certificado-energetico-catalunya/
│   │   ├── cercador-certificats-energetics/
│   │   ├── ayudas-eficiencia-energetica/
│   │   └── landing/
│   │       └── 7-senales-ce/
│   ├── components/
│   │   ├── layout/              # Header, Footer, StickyCTA, CookieConsent
│   │   ├── sections/            # Hero, ServicesGrid, FAQ, Problem, Contrast, etc.
│   │   ├── forms/               # ContactForm
│   │   ├── blog/                # AutorBloque
│   │   ├── pitr/                # PitrEngine, PitrQuestion, PitrNavigation, PitrProgress
│   │   └── plataforma/          # EstadoBadge, ProgressBar
│   ├── config/                  # Configuracion del sitio
│   ├── data/                    # FAQs, servicios, articulos, emails
│   ├── lib/                     # Logica de negocio
│   │   ├── pitr/
│   │   │   ├── motor.ts
│   │   │   ├── use-pitr.ts
│   │   │   └── templates/
│   │   ├── expediente-estados.ts
│   │   ├── eventos.ts
│   │   ├── integraciones.ts
│   │   ├── wa.ts
│   │   └── storage/
│   └── types/                   # Tipos TypeScript
│       ├── expediente.ts
│       ├── inspection.ts
│       ├── documento.ts
│       └── pago.ts
├── .gitignore
├── .env.local
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── vercel.json
├── README.md
├── CLAUDE.md
├── AGENTS.md
├── DEPLOY.md
└── RELEASE_CLEANUP_V1.0_REPORT.md
```

## 18.6 Entidades

### Expediente

- **id:** UUID unico
- **estado:** `borrador` → `pendiente_pago` → `pagado` → `pitr_en_curso` → `pitr_completado` → `en_revision` → `cerrado` → `cancelado`
- **tipo_servicio:** `segunda_opinion` | `segunda_opinion_express` | `informe_tecnico`
- **cliente_id** → FK a Cliente
- **inmueble_id** → FK a Inmueble
- **created_at, updated_at, closed_at**

### Cliente

- **id:** UUID unico
- **email:** Unico, validado
- **nombre, apellidos**
- **telefono:** Opcional
- **created_at**

### Inmueble

- **id:** UUID unico
- **referencia_catastral:** 14 digitos (validado)
- **direccion:** Calle, numero, CP, municipio, provincia
- **tipo:** `vivienda_unifamiliar` | `piso` | `local` | `oficina` | `otro`
- **superficie:** m2
- **anio_construccion:** Ano
- **created_at**

### Documento

- **id:** UUID unico
- **expediente_id** → FK a Expediente
- **tipo:** `certificado_original` | `informe_auditoria` | `foto` | `otro`
- **nombre:** Original y descriptivo
- **url:** En Supabase Storage
- **tamano:** Bytes
- **subido_por:** `cliente` | `tecnico`
- **created_at**

### Pago

- **id:** UUID unico
- **expediente_id** → FK a Expediente
- **estado:** `pendiente` | `completado` | `fallido` | `reembolsado`
- **importe:** EUR en centimos
- **metodo:** `mypos`
- **mypos_transaction_id:** ID externo
- **mypos_link:** URL del link de pago
- **created_at, paid_at**

### Actividad

- **id:** UUID unico
- **expediente_id** → FK a Expediente
- **tipo:** Ver seccion 18.7
- **datos:** JSON con informacion especifica del evento
- **realizado_por:** `cliente` | `tecnico` | `sistema`
- **created_at**

## 18.7 Eventos

14 tipos de eventos definidos en `src/lib/eventos.ts`:

1. **EXPEDIENTE_CREADO** — El cliente crea un nuevo expediente.
2. **DATOS_INMUEBLE_COMPLETADOS** — El cliente rellena los datos del inmueble.
3. **DOCUMENTO_SUBIDO** — Se sube el certificado energetico.
4. **PAGO_SOLICITADO** — Se genera link de pago MyPOS.
5. **PAGO_CONFIRMADO** — MyPOS confirma el pago.
6. **PITR_INICIADO** — El cliente empieza la inspeccion remota.
7. **PITR_PREGUNTA_RESPONDIDA** — Se responde una pregunta del PITR.
8. **PITR_COMPLETADO** — El cliente termina el PITR.
9. **DOCUMENTACION_SOLICITADA** — El tecnico pide mas informacion.
10. **DOCUMENTACION_APORTADA** — El cliente sube la informacion solicitada.
11. **DICTAMEN_EMITIDO** — El Arquitecto Tecnico emite el dictamen.
12. **INFORME_DESCARGADO** — El cliente descarga el informe.
13. **EXPEDIENTE_CERRADO** — El expediente se cierra, datos listos para Observatorio.
14. **EXPEDIENTE_CANCELADO** — El expediente se cancela (cliente o tecnico).

Todos los eventos son inmutables. Se insertan en la tabla `actividades` con timestamp automatico. Ningun evento se modifica ni se elimina.

## 18.8 Estados

Maquina de estados del expediente (`src/lib/expediente-estados.ts`):

```
borrador ──→ pendiente_pago ──→ pagado ──→ pitr_en_curso
                                                │
                                                ▼
en_revision ←─── pitr_completado ←──────────────┘
    │
    ▼
cerrado ──→ (datos → Observatorio)

cancelado (desde cualquier estado anterior a cerrado)
```

**Reglas:**
- `borrador` → `pendiente_pago`: Al iniciar el pago.
- `pendiente_pago` → `pagado`: Webhook MyPOS confirma pago.
- `pagado` → `pitr_en_curso`: El cliente inicia el PITR.
- `pitr_en_curso` → `pitr_completado`: El cliente responde todas las preguntas obligatorias.
- `pitr_completado` → `en_revision`: El sistema asigna al Arquitecto Tecnico.
- `en_revision` → `cerrado`: El Arquitecto emite el dictamen.
- Cualquier estado → `cancelado`: Cancelacion por cliente o limite de tiempo.
- `cerrado` → Datos anonimizados insertados en `observatorio` via n8n.

## 18.9 APIs

### API interna

| Endpoint | Metodo | Descripcion | Archivo |
|----------|--------|-------------|---------|
| `/api/extraer-certificado` | POST | Extrae datos de un PDF de certificado energetico | `src/app/api/extraer-certificado/route.ts` |

**Endpoint: extraer-certificado**
- **Entrada:** FormData con archivo PDF.
- **Salida:** JSON con `{ referencia_catastral, direccion, letra, consumo, emisiones }` o errores de validacion.
- **Autenticacion:** Requiere sesion activa (Supabase Auth).
- **Limitaciones:** Solo PDFs con texto nativo, formato variable segun CCAA.

### APIs externas (planificadas)

| API | Uso | Version |
|-----|-----|---------|
| MyPOS REST API | Crear links de pago, consultar estado | V1.1 ✅ |
| Supabase REST API | CRUD de expedientes, storage, auth | V1.1 ✅ |
| Catastro (Sede Electronica) | Validar referencia catastral | V2.0 📋 |
| CE3X | Calculo de letra energetica | V2.0 📋 |
| OpenAI / Anthropic API | IA asistente (datos anonimizados) | V2.0 📋 |

## 18.10 Integraciones

| Sistema | Proposito | Estado | Disparador |
|---------|-----------|--------|------------|
| **n8n** | Automatizacion | ✅ V1.1 | Webhooks, programado |
| **MyPOS** | Pasarela de pagos | ✅ V1.1 | Webhook a n8n |
| **Supabase** | Backend (Auth, DB, Storage) | ✅ V1.1 | SDK + REST API |
| **Google Drive** | Backup de documentos | ✅ V1.1 | Programado (n8n) |
| **SMTP** | Envio de emails transaccionales | ✅ V1.1 | n8n |
| **Catastro** | Validacion de inmuebles | 📋 V2.0 | API REST |
| **CE3X** | Calculo energetico oficial | 📋 V2.0 | API REST |
| **OpenAI / Anthropic** | IA | 📋 V2.0 | API REST |
| **Google Analytics** | Analisis de trafico web | ✅ V1.0 | Script en frontend |

---

# CONSTITUCION DEL PROYECTO CERTILAB

Este documento es **LA CONSTITUCION DEL PROYECTO CERTILAB**.

Toda futura decision tecnica, de producto, de arquitectura o de contenido debe ser coherente con lo establecido en este documento.

Si una decision contradice este documento:
1. Primero se debate la modificacion del documento.
2. Luego se implementa el cambio.
3. Nunca al reves.

**Version:** 1.1 — 1 de julio de 2026
**Ultima actualizacion:** Commit `040296d`
**Proxima revision obligatoria:** Antes de iniciar V1.4

---

*Fin del documento CF-000-PROJECT-BRAIN.md — La Constitucion de Certilab*