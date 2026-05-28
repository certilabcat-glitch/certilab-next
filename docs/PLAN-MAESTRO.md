# PLAN MAESTRO — Certilab + SaaS Inmobiliario

> **Versión:** 2.0 — Mayo 2026  
> **Responsable:** Eva González (Arquitecta Técnica, Cateb 9457) + Abdelaziz (desarrollo)  
> **TL;DR:** Migrar Certilab.cat de HTML estáticas a Next.js 16 + Tailwind CSS v4 + TypeScript, expandir con SaaS B2B, blog dinámico y backoffice para Eva.

---

## 📋 Índice

1. [Visión general](#-visión-general)
2. [Stack técnico](#-stack-técnico)
3. [Arquitectura del proyecto](#-arquitectura-del-proyecto)
4. [Fase 1 — Migración a Next.js 16](#-fase-1--migración-a-nextjs-16)
5. [Estado actual del proyecto (26/05/2026)](#-estado-actual-del-proyecto-26052026)
6. [Fase 2 — Landing B2B Certilab SaaS](#-fase-2--landing-b2b-certilab-saas)
7. [Fase 3 — Blog educativo de contenidos](#-fase-3--blog-educativo-de-contenidos)
8. [Fase 4 — Backoffice para Eva](#-fase-4--backoffice-para-eva)
9. [Principios de desarrollo](#-principios-de-desarrollo)
10. [Orden de ejecución recomendado](#-orden-de-ejecución-recomendado)
11. [Métricas de éxito (OKRs)](#-métricas-de-éxito-okrs)
12. [Plan de ejecución detallado](#-plan-de-ejecución-detallado)
13. [Checklist de verificación pre-deploy](#-checklist-de-verificación-pre-deploy)

---

## 🎯 Visión General

Transformar Certilab (certilab.cat) en una plataforma digital completa que combine:

1. **Web profesional** de consultoría energética forense (Certilab)
2. **SaaS B2B** para agencias inmobiliarias, arquitectos técnicos y profesionales del sector
3. **Blog educativo** sobre eficiencia energética (SEO-driven)
4. **Backoffice** para que Eva gestione leads, contenido y métricas

---

## 🛠 Stack Técnico

| Capa | Tecnología |
|------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Estilos** | Tailwind CSS v4 |
| **Lenguaje** | TypeScript |
| **Hosting** | Vercel (despliegue continuo desde GitHub) |
| **CMS / Contenido** | Markdown local + datos TypeScript |
| **Leads** | n8n webhook + WhatsApp Business API (wa.me) |
| **Analítica** | Meta Pixel (con consentimiento RGPD) |
| **Base de datos** | Supabase (PostgreSQL) |
| **Autenticación** | Supabase Auth o NextAuth |
| **ORM** | Prisma (tipado seguro con TypeScript) |
| **Pagos** | Stripe (suscripciones SaaS) |
| **Mapa del sitio** | generateSitemaps nativo |
| **Fuentes** | Google Fonts: Crimson Pro + Inter |

---

## 📦 FASE 1 — Migración a Next.js 16

### 1.1 Objetivo

Migrar las **15+ páginas HTML estáticas** actuales a Next.js 16 + Tailwind CSS v4 + TypeScript, **preservando**:

- Diseño visual actual (paleta, tipografía, estética premium editorial mediterránea)
- URLs existentes (con redirects 301 donde sea necesario)
- Meta tags SEO (Schema.org, Open Graph, Twitter Cards)
- Funcionalidad de lead capture vía WhatsApp + n8n
- Sistema de consentimiento de cookies RGPD
- Blog con artículos estáticos actuales

### 1.2 Requisitos técnicos clave

| Requisito | Implementación |
|-----------|---------------|
| **SEO** | `generateMetadata` por página, sitemap dinámico, robots.txt |
| **Componentes** | Header, Footer, ServiceCard, PricingCard, HeroSection, FAQ, TrustBar, CTASection |
| **Blog dinámico** | Artículos en TypeScript con frontmatter, generación estática |
| **Leads** | Formulario → n8n webhook → WhatsApp. CertiCore refactorizado |
| **URLs actuales** | Redirects 301 en `next.config.js` o middleware |
| **Imágenes** | `next/image` con dominio Vercel/Cloudinary |
| **Responsive** | Mobile-first con Tailwind |
| **Cookies** | Componente de banner con consentimiento local storage |

### 1.3 Estrategia de migración

1. **Scaffolding**: Inicializar proyecto Next.js 16 con TypeScript y Tailwind CSS v4 ✅
2. **Layout global**: Header (nav), Footer, TrustBlock ✅
3. **Home page**: Migrar hero, problem section, services grid, diff grid, privacy section, how it works, contrast section, eva section, FAQ, CTA final ✅
4. **Páginas de servicio**: Cada una con su hero, features, pricing, FAQ, CTA ✅ (5/6)
5. **Blog**: Migrar a sistema de archivos TypeScript con frontmatter 🟡 (estructura lista, contenido en TS)
6. **Páginas legales**: Privacidad, cookies, aviso legal ✅
7. **Sistema de leads**: Refactorizar certi-core.js y formularios 🟡 (parcial)
8. **SEO**: Sitemap, robots.txt, breadcrumbs, Schema.org dinámico ✅
9. **SaaS B2B**: Preparar estructura de rutas para futura expansión

---

## 🏗 Arquitectura del proyecto

### Monorepo conceptual (mismo dominio, rutas separadas)

```
certilab.cat/
├── /                     # Landing pública (Fase 1)
├── /saas/                # Landing B2B + dashboard (Fase 2)
├── /blog/                # Blog educativo (Fase 3)
├── /admin/               # Backoffice Eva (Fase 4)
└── /api/                 # API routes compartidas
```

### Estructura actual del proyecto

```
certilab-next/
├── .env.local                    # Variables de entorno
├── next.config.ts                # Configuración Next.js (redirects, headers)
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── eslint.config.mjs
├── public/
│   └── images/                   # Imágenes estáticas
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout (Header, Footer, CookieBanner)
│   │   ├── page.tsx              # Home page
│   │   ├── not-found.tsx         # 404 personalizada
│   │   ├── sitemap.ts            # Sitemap dinámico
│   │   ├── robots.ts             # robots.txt dinámico
│   │   ├── globals.css           # Tailwind v4 + paleta custom
│   │   │
│   │   ├── (servicios)/          # Grupo de rutas de servicios
│   │   │   ├── segunda-opinion/
│   │   │   ├── segunda-opinion-express/
│   │   │   ├── check-up-inmobiliario/
│   │   │   ├── informe-tecnico-energetico/
│   │   │   └── por-que-no-emite-ce/
│   │   │
│   │   ├── (legal)/              # Grupo de rutas legales
│   │   │   ├── privacidad/
│   │   │   ├── cookies/
│   │   │   └── aviso-legal/
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog index
│   │   │   ├── blog.css
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Artículo individual
│   │   │
│   │   ├── sobre-nosotros/
│   │   ├── formulario/           # ❌ Pendiente
│   │   ├── gracias/              # ❌ Pendiente
│   │   ├── resultado-auditoria/  # ❌ Pendiente
│   │   ├── calculadoracat/       # ❌ Pendiente
│   │   └── ... (más páginas)
│   │
│   ├── components/
│   │   ├── layout/   (Header, Footer, CookieBanner)
│   │   ├── sections/ (Hero, FAQ, CTA, ServicesGrid, DiffGrid, etc.)
│   │   ├── cards/    (❌ Vacío)
│   │   ├── ui/       (Breadcrumbs, IncludesBox)
│   │   └── forms/    (CertiExpedienteForm)
│   │
│   ├── lib/    (constants, metadata, schema, wa)
│   ├── data/   (services, navigation, faq, articles)
│   └── types/  (service, navigation)
```

---

## 🎨 Paleta y Diseño Visual

### Colores (Tailwind v4 custom theme)

| Token | Hex | Uso |
|-------|-----|-----|
| `terra` | `#8B6F47` | Acentos, precios, hover states |
| `terra-dark` | `#5C4A2A` | Variante oscura, texto secundario |
| `terra-light` | `#C4A882` | Logo, elementos decorativos |
| `crema` | `#F5EFE6` | Fondo principal |
| `verde` | `#4A7C59` | Éxito, positivo (futuro SaaS) |
| `black` | `#0A0A0A` | Texto principal |
| `dark` | `#333333` | Texto cuerpo |
| `grey` | `#666666` | Texto secundario |
| `border` | `#E8E4DD` | Bordes |

### Tipografía

- **Títulos:** Crimson Pro (serif) — pesos 300, 400, 600, 700, itálica 400
- **Cuerpo:** Inter (sans-serif) — pesos 300, 400, 500, 600, 700, 800

```css
/* Equivalente Tailwind v4 */
@theme {
  --font-serif: 'Crimson Pro', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --color-terra: #8B6F47;
  --color-terra-dark: #5C4A2A;
  --color-terra-light: #C4A882;
  --color-crema: #F5EFE6;
  --color-verde: #4A7C59;
}
```

### Estética general

- Premium, editorial, mediterránea
- Blanco/crema predominante con acentos tierra
- Espaciado generoso (padding 7.5rem secciones desktop, 5rem mobile)
- Bordes finos (`1px solid var(--border)`)
- Tipografía serif para títulos, sans-serif para cuerpo
- Botones con texto uppercase, letter-spacing, sin border-radius (salvo excepciones)
- Efectos hover: opacity 0.6-0.85, sin transiciones complejas

---

## 📄 Inventario de Páginas y Componentes

### Página 1 — Home (`/`)

| Sección | Componente | Estado |
|---------|-----------|--------|
| Hero | `HeroSection` | ✅ Hero con eyebrow, h1, sub, badges, CTAs, nota |
| Buscador forense | `CertiExpedienteForm` | ✅ Input + botón "Analizar" con lead capture |
| El problema | `ProblemSection` | ✅ 3 cards en grid |
| Trust bar | `TrustBar` | ✅ Barra de credenciales |
| Diferenciadores | `DiffGrid` | ✅ 4 cards numerados |
| Servicios | `ServicesGrid` | ✅ 5 ServiceCards (1 destacado) |
| Privacidad | `PrivacySection` | ✅ 4 cards con iconos |
| Cómo funciona | `HowItWorks` | ✅ 4 pasos numerados |
| Contraste mercado | `ContrastSection` | ✅ 2 columnas comparativas |
| Eva | `EvaSection` | ✅ Foto/texto/credenciales |
| FAQ | `FAQSection` | ✅ Acordeón con 8 preguntas |
| CTA final | `CTASection` | ✅ Título + texto + botón |
| Trust block | `TrustBlock` | ✅ Badges + disclaimer |
| Footer | `Footer` | ✅ 3 columnas + copyright |

### Página 2 — Segunda Opinión (`/segunda-opinion/`)

| Sección | Componente |
|---------|-----------|
| Hero | `HeroSection` (con badge, precio, credentials) |
| Features | `FeaturesGrid` (4 features con números romanos) |
| Proceso | `StepsGrid` (3 pasos) |
| Incluye | `IncludesBox` (lista de inclusiones) |
| FAQ | `FAQSection` (preguntas específicas) |
| CTA | `CTASection` |

### Página 3 — Segunda Opinión Express (`/segunda-opinion-express/`)

| Sección | Componente |
|---------|-----------|
| Hero | `HeroSection` |
| Situaciones | `SituationsGrid` (3-4 cards) |
| Schedule | `ScheduleBox` (horarios) |
| Comparación | `ComparisonTable` (vs estándar) |
| FAQ | `FAQSection` |
| CTA | `CTASection` |

### Página 4 — Check-Up Inmobiliario (`/check-up-inmobiliario/`)

| Sección | Componente |
|---------|-----------|
| Hero | `HeroSection` |
| ROI | `ROIGrid` (2 boxes comparativos) |
| Casos reales | `CasoCard` |
| Compromiso | `CompromisoList` |
| Lo que NO es | `NotList` |
| FAQ | `FAQSection` |
| CTA | `CTASection` |

### Página 5 — Informe Técnico (`/informe-tecnico-energetico/`)

| Sección | Componente |
|---------|-----------|
| Hero | `HeroSection` |
| Features | `FeaturesGrid` |
| Proceso | `StepsGrid` |
| Incluye | `IncludesBox` |
| FAQ | `FAQSection` |
| CTA | `CTASection` |

### Página 6 — Diagnóstico Express (`/diagnostico-express/` → `/formulario/`)

| Sección | Componente |
|---------|-----------|
| Hero | `HeroSection` |
| Formulario | `ContactForm` (deriva a WhatsApp) |
| FAQ | `FAQSection` |

### Página 7 — Por qué no emitimos CE (`/por-que-no-emite-ce/`)

| Sección | Componente |
|---------|-----------|
| Hero | `HeroSection` |
| Empatía | `EmpathySection` (prosa larga) |
| Ley | `LawSection` (cita legal) |
| Router | `RouterGrid` (cards de servicios) |
| FAQ | `FAQSection` (FAQPage Schema.org) |
| CTA | `CTASection` |

### Página 8 — Blog (`/blog/`)

| Sección | Componente |
|---------|-----------|
| Header | `BlogHeader` |
| Grid | `BlogGrid` con `BlogCard` por artículo |
| Individual | `[slug]/page.tsx` con contenido MD |

### Página 9 — Sobre nosotros (`/sobre-nosotros/`)

| Sección | Componente |
|---------|-----------|
| Hero | `HeroSection` |
| Manifiesto | `ProseBlock` |
| Eva | `EvaSection` |

### Página 10-12 — Legales

| Página | Ruta Next.js |
|--------|-------------|
| Privacidad | `/privacidad/page.tsx` |
| Cookies | `/cookies/page.tsx` |
| Aviso legal | `/aviso-legal/page.tsx` |

### Páginas adicionales

| Página | Ruta actual | Ruta Next.js |
|--------|-------------|-------------|
| Calculadora ahorro | `/calculadoracat/` | `/calculadoracat/page.tsx` |
| Formulario | `/formulario/` | `/formulario/page.tsx` |
| Ayudas eficiencia | `/ayudas-eficiencia-energetica/` | `/ayudas-eficiencia-energetica/page.tsx` |
| Buscador Catalunya | `/buscador-certificado-energetico-catalunya/` | `/buscador-certificado-energetico-catalunya/page.tsx` |
| Resultado auditoría | `/resultado-auditoria/` | `/resultado-auditoria/page.tsx` |
| Configurar auditoría | `/configurar-auditoria/` | `/configurar-auditoria/page.tsx` |
| Profesionales | `/profesionales/` | `/profesionales/page.tsx` |
| Cercador | `/cercador-certificats-energetics/` | `/cercador-certificats-energetics/page.tsx` |
| Gracias | `/gracias/` | `/gracias/page.tsx` |

---

## 🧩 Estrategia de Componentes

### Principios

1. **Composición sobre herencia**: Cada sección es un componente independiente que recibe props
2. **Data-driven**: Los datos de servicios, navegación y FAQ viven en archivos de datos, no en componentes
3. **Reutilización máxima**: ServiceCard, PricingCard, FAQSection, HeroSection se usan en múltiples páginas
4. **SEO nativo**: Los componentes incluyen atributos aria y roles semánticos
5. **Mobile-first**: Todos los diseños responsive desde el componente

### Componentes core

| Componente | Props | Notas |
|-----------|-------|-------|
| `Header` | `activePath?: string` | Nav con dropdowns, toggle móvil, active state |
| `Footer` | — | 3 columnas, carga dinámica desde `data/navigation.ts` |
| `HeroSection` | `{ eyebrow, title, subtitle, badges, ctaPrimary, ctaSecondary, price?, credentials? }` | Versátil para todas las páginas |
| `ServiceCard` | `{ title, price, description, badge, href, destacado }` | Para servicios grid |
| `FAQSection` | `{ items: { q, a }[] }` | Acordeón accesible |
| `CTASection` | `{ title, text, buttonText, buttonHref }` | CTA consistente |
| `Breadcrumbs` | `{ items: { name, href }[] }` | Con Schema.org integrado |
| `TrustBar` | `{ text: string }` | Barra de credenciales |
| `TrustBlock` | `{ name, credentials, badges }` | Bloque de confianza |
| `CookieBanner` | — | Banner RGPD con localStorage |

### Tipos compartidos

```typescript
// types/service.ts
export interface Service {
  slug: string;
  title: string;
  description: string;
  price: number;
  badge: string;
  href: string;
  destacado?: boolean;
  features: string[];
  includes?: string[];
  faq?: FAQItem[];
}

// types/blog.ts
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  content: string; // MD
  tags: string[];
}

// types/navigation.ts
export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}
```

---

## 🔍 SEO y Datos Estructurados

### Estrategia SEO

1. **generateMetadata** en cada página con title, description, canonical, Open Graph, Twitter Cards
2. **Sitemap dinámico** (`/sitemap.ts`) que incluye todas las rutas
3. **robots.txt** dinámico
4. **Breadcrumbs** con Schema.org BreadcrumbList en páginas internas
5. **Schema.org** por página:
   - Home: `ProfessionalService` + `WebSite`
   - Servicios: `Service` + `Offer` + `BreadcrumbList`
   - Blog: `Article` + `BreadcrumbList`
   - Por qué no emitimos CE: `FAQPage` + `Article` + `BreadcrumbList`
   - Sobre nosotros: `Person` + `ProfessionalService`
6. **Canonical URLs** en todas las páginas
7. **Meta Pixel** con consentimiento (cookie banner)

### Ejemplo de `generateMetadata`

```typescript
// app/segunda-opinion/page.tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Segunda Opinión Certificado Energético | Desde 39€ | Certilab',
    description: 'Segunda opinión de tu certificado energético desde 39€. Análisis técnico sin desplazamientos. Dictamen en 24-48h (Express <2h). Arquitecta Técnica Cateb 9457.',
    alternates: { canonical: 'https://www.certilab.cat/segunda-opinion/' },
    openGraph: {
      title: 'Segunda Opinión del Certificado Energético | Desde 39€ | Certilab',
      description: '...',
      url: 'https://www.certilab.cat/segunda-opinion/',
    },
    twitter: { card: 'summary', title: '...', description: '...' },
  };
}
```

### Ejemplo de Schema.org dinámico

```typescript
// lib/schema.ts
export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Certilab - Eva González',
    },
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'EUR',
    },
    areaServed: { '@type': 'Country', name: 'España' },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href,
    })),
  };
}
```

### Redirects 301

```typescript
// next.config.ts
const nextConfig = {
  async redirects() {
    return [
      // URLs legales (.html → /)
      { source: '/privacidad.html', destination: '/privacidad', permanent: true },
      { source: '/cookies.html', destination: '/cookies', permanent: true },
      { source: '/legal.html', destination: '/aviso-legal', permanent: true },
      // Otras páginas .html si existieran
    ];
  },
};
```

---

## 📝 Blog Dinámico

### Estructura de artículos

Cada artículo es un archivo Markdown en `src/data/blog/` con frontmatter:

```markdown
---
title: 'Brown Discount: qué es y cómo afecta al precio de tu vivienda'
description: 'El Brown Discount es la pérdida de valor de una vivienda por su mala calificación energética. Descubre cómo detectarlo y qué hacer si estás comprando o vendiendo.'
date: '2026-01-15'
author: 'Eva María González Gracia'
image: '/images/blog/brown-discount.jpg'
tags: ['brown discount', 'calificación energética', 'compraventa']
---

## ¿Qué es el Brown Discount?

Contenido del artículo en Markdown...
```

### Blog index (`/blog/`)

- Lista de todos los artículos ordenados por fecha
- `BlogCard` con título, descripción, fecha, tags
- Paginación si hay más de 10 artículos

### Artículo individual (`/blog/[slug]/`)

- Renderizado de Markdown con `react-markdown` o `next-mdx-remote`
- Breadcrumbs
- Schema.org Article
- Compartir en WhatsApp
- CTA contextual al final

---

## 📞 Sistema de Leads

### Flujo actual (a preservar)

```
Usuario → Formulario / Buscador forense → n8n webhook → WhatsApp / Email
```

### Componentes involucrados

1. **ContactForm** (`/formulario/`): Formulario de contacto → wa.me + n8n
2. **CertiExpedienteForm**: Buscador forense en home → n8n → redirect a `/resultado-auditoria/`
3. **WhatsApp CTA**: Botones "Diagnóstico Gratis" → `wa.me/34608515922`

### Refactorización de certi-core.js

El script actual `js/certi-core.js` se refactorizará a:

```typescript
// lib/webhook.ts
export async function sendToWebhook(data: LeadData): Promise<void> {
  const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) console.error('Webhook error:', response.status);
}

// components/forms/CertiExpedienteForm.tsx
'use client';
// Maneja input, animación "Conectando con Sede Electrónica…", envío a webhook y redirect
```

### Variables de entorno

```env
N8N_WEBHOOK_URL=https://tu-n8n.com/webhook/lead-certilab
NEXT_PUBLIC_WHATSAPP_NUMBER=34608515922
NEXT_PUBLIC_META_PIXEL_ID=1271893388238243
NEXT_PUBLIC_SITE_URL=https://www.certilab.cat
```

---

## 📅 Plan de Ejecución

### Fase 1.1 — Scaffolding y setup (Día 1)

- [ ] `npx create-next-app@latest certilab-next --typescript --tailwind --eslint --app`
- [ ] Configurar Tailwind v4 con paleta de colores personalizada
- [ ] Configurar fuentes (Crimson Pro + Inter) vía `next/font` o Google Fonts import
- [ ] Configurar `next.config.ts` con redirects y headers de seguridad
- [ ] Configurar `robots.ts` y `sitemap.ts`
- [ ] Estructura de carpetas completa

### Fase 1.2 — Layout global (Día 1-2)

- [ ] `Header.tsx`: Nav con dropdowns, toggle móvil, active state
- [ ] `Footer.tsx`: 3 columnas con enlaces
- [ ] `TrustBar.tsx` + `TrustBlock.tsx`
- [ ] `CookieBanner.tsx` con consentimiento RGPD
- [ ] Root layout con metadata global

### Fase 1.3 — Home page (Día 2-3)

- [ ] `HeroSection` (reutilizable)
- [ ] `ProblemSection`
- [ ] `DiffGrid`
- [ ] `ServicesGrid` + `ServiceCard`
- [ ] `PrivacySection`
- [ ] `HowItWorks`
- [ ] `ContrastSection`
- [ ] `EvaSection`
- [ ] `FAQSection` (reutilizable)
- [ ] `CTASection` (reutilizable)

### Fase 1.4 — Páginas de servicio (Día 3-5)

- [ ] Segunda Opinión
- [ ] Segunda Opinión Express
- [ ] Check-Up Inmobiliario
- [ ] Informe Técnico Energético
- [ ] Diagnóstico Express (formulario)
- [ ] Por qué no emitimos CE

### Fase 1.5 — Blog (Día 5-6)

- [ ] Migrar artículos a Markdown
- [ ] Blog index con `BlogCard`
- [ ] Página de artículo individual con renderizado MD
- [ ] Schema.org Article
- [ ] CTA contextual

### Fase 1.6 — Páginas restantes (Día 6-7)

- [ ] Sobre nosotros
- [ ] Calculadora ahorro
- [ ] Ayudas eficiencia energética
- [ ] Buscador Catalunya / Cercador
- [ ] Profesionales
- [ ] Gracias
- [ ] Legales (privacidad, cookies, aviso legal)

### Fase 1.7 — Sistema de leads (Día 7)

- [ ] Refactorizar `certi-core.js` → TypeScript
- [ ] Componente `CertiExpedienteForm`
- [ ] Componente `ContactForm`
- [ ] Integración n8n webhook
- [ ] Página de resultado-auditoria dinámica

### Fase 1.8 — SEO y testing (Día 8-9)

- [ ] Verificar generateMetadata en todas las páginas
- [ ] Verificar Schema.org JSON-LD
- [ ] Verificar sitemap.xml
- [ ] Verificar redirects 301
- [ ] Lighthouse audit (performance, accessibility, SEO)
- [ ] Testing responsive (mobile, tablet, desktop)
- [ ] Testing de formularios y lead capture

### Fase 1.9 — Deploy (Día 10)

- [ ] Repositorio GitHub
- [ ] Conexión con Vercel
- [ ] Variables de entorno en Vercel
- [ ] Dominio personalizado (certilab.cat)
- [ ] Post-deploy SEO verification (Google Search Console)

---

## 🔮 Fase 2 — SaaS B2B (Visión Futura)

### Descripción general

Plataforma SaaS para agencias inmobiliarias, arquitectos técnicos y profesionales que quieran:

- Solicitar análisis forenses en lote
- Dashboard con historial de expedientes
- API de integración con CRMs inmobiliarios
- Panel de control con estadísticas
- Facturación recurrente

### Estructura de rutas futura

```
/src/app/
  ├── (saas)/                     # Grupo de rutas SaaS
  │   ├── login/
  │   ├── register/
  │   ├── dashboard/
  │   ├── expedientes/
  │   ├── api/
  │   └── settings/
```

### Integraciones futuras

- Stripe (pagos recurrentes)
- Auth.js / NextAuth (autenticación)
- Base de datos (Postgres en Vercel/Neon, o Supabase)
- API RESTful para integración con CRMs
- Panel de administración para Eva

---

## ✅ Checklist de verificación pre-deploy

- [ ] Todas las páginas responden 200 OK
- [ ] URLs legacy redirigen 301 a nuevas rutas
- [ ] Meta tags SEO presentes y correctos en cada página
- [ ] Schema.org JSON-LD válido (Google Rich Results Test)
- [ ] Sitemap.xml incluye todas las rutas
- [ ] robots.txt permite indexación
- [ ] Lighthouse > 90 en Performance, Accessibility, SEO
- [ ] Formularios envían leads correctamente
- [ ] Cookie banner funcional con RGPD
- [ ] Meta Pixel se carga solo con consentimiento
- [ ] Diseño responsive correcto en mobile, tablet, desktop
- [ ] Fuentes cargan correctamente (Crimson Pro + Inter)
- [ ] Imágenes optimizadas con next/image
- [ ] 404 personalizada
- [ ] Analítica/configuración de Vercel correcta

---

> **Próximo paso:** Abdelaziz procede con la Fase 1.1 — scaffolding del proyecto Next.js 16 + Tailwind CSS v4 + TypeScript.
