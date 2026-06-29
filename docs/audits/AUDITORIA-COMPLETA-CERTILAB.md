# Auditoría Completa — Certilab (certilab.cat)

> Fecha: 22/06/2026
>
> Objetivo: Aumentar solicitudes del servicio Segunda Opinión y reforzar la autoridad de Certilab como auditor independiente.

---

## 1. ESTRUCTURA DEL PROYECTO

### Árbol de carpetas

```
src/
├── app/
│   ├── (legal)/
│   │   ├── aviso-legal/page.tsx
│   │   ├── privacidad/page.tsx
│   │   └── cookies/page.tsx
│   ├── (servicios)/
│   │   ├── segunda-opinion/page.tsx
│   │   ├── segunda-opinion-express/page.tsx
│   │   ├── informe-tecnico-energetico/page.tsx
│   │   ├── check-up-inmobiliario/page.tsx
│   │   └── ayudas-eficiencia-energetica/page.tsx
│   ├── blog/
│   │   └── [slug]/page.tsx
│   ├── api/
│   │   └── extraer-certificado/route.ts
│   ├── buscador-certificado-energetico-catalunya/page.tsx
│   ├── cercador-certificats-energetics/page.tsx
│   ├── gracias/page.tsx
│   ├── resultado-auditoria/page.tsx
│   ├── sobre-nosotros/page.tsx
│   ├── page.tsx                    (home)
│   ├── layout.tsx                  (root layout)
│   ├── sitemap.ts
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   ├── CookieConsent.tsx
│   │   ├── CookieConsent.module.css
│   │   ├── StickyCTA.tsx
│   │   └── StickyCTA.module.css
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── ContrastSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── FAQSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── CheckUpInmobiliarioClient.tsx
│   │   └── *.module.css
│   ├── forms/
│   │   ├── ContactForm.tsx
│   │   └── ContactForm.module.css
│   └── blog/
│       └── AutorBloque.tsx
├── data/
│   ├── articles.ts       (27 artículos, ~3300 líneas)
│   ├── services.ts       (datos de servicios)
│   ├── faq.ts            (FAQ data)
│   └── articles/         (archivos .md individuales)
├── lib/
│   └── wa.ts             (utilidad WhatsApp)
└── types/
    └── (index/types)
```

### Rutas registradas (27 total)

| Ruta | Tipo | Peso |
|------|------|------|
| `/` | Home | Landing |
| `/segunda-opinion/` | Servicio core | Landing |
| `/segunda-opinion-express/` | Servicio up-sell | Landing |
| `/informe-tecnico-energetico/` | Servicio premium | Landing |
| `/check-up-inmobiliario/` | Servicio | Landing |
| `/ayudas-eficiencia-energetica/` | Servicio | Landing |
| `/blog/[slug]/` | 27 artículos blog | Contenido |
| `/buscador-certificado-energetico-catalunya/` | Herramienta | Lead gen |
| `/cercador-certificats-energetics/` | Herramienta (cat) | Lead gen |
| `/resultado-auditoria/` | Post-lead | Nurturing |
| `/gracias/` | Post-conversión | Confirmación |
| `/sobre-nosotros/` | Institucional | Confianza |
| `/aviso-legal/` | Legal | Compliance |
| `/privacidad/` | Legal | Compliance |
| `/cookies/` | Legal | Compliance |
| `/api/extraer-certificado` | API endpoint | Backend |

### Componentes principales

**Layout global:**
- `Header` — navegación principal con logo, enlaces y CTA
- `CookieConsent` — banner RGPD
- `StickyCTA` — CTA flotante inferior

**Landing home:**
- `HeroSection` — hero principal
- `ProblemSection` — sección de problema
- `ContrastSection` — contraste antes/después
- `HowItWorks` — cómo funciona
- `ServicesGrid` — grid de servicios
- `TestimonialsSection` — testimonios
- `FAQSection` — FAQ
- `ContactForm` — formulario de contacto

**Blog:**
- `AutorBloque` — bloque de autor con credenciales

---

## 2. SEO TÉCNICO

### Metadata global (layout.tsx)

```ts
title: "Certilab · Auditoría Certificados Energéticos"
description: "Auditoría independiente de certificados energéticos. Eva María González García, CATEB 9457. Segunda opinión profesional desde 59€."
```

Análisis:

| Elemento | Estado | Problema |
|----------|--------|----------|
| **Title** global | ✅ | Correcto pero podría ser más descriptivo para home |
| **Description** | ✅ | Incluye precio y credencial — buena práctica |
| **Canonical** | ⚠️ NO implementado | No hay etiqueta canonical en layout. Las páginas no tienen auto-referencia canonical |
| **Robots** | ⚠️ NO implementado | No hay meta robots. Las páginas legales deberían tener noindex |
| **Hreflang** | ❌ NO implementado | Hay versión catalana `/cercador...` pero sin hreflang |
| **Open Graph** | ⚠️ Parcial | og:title y og:description se renderizan. Falta og:image — solo og:image:alt |
| **Twitter Cards** | ❌ NO | No hay meta tags para Twitter |
| **Sitemap** | ✅ | Implementado en `sitemap.ts` |
| **robots.txt** | ✅ | Correcto, permite todo. Referencia sitemap |

### Análisis de cada página

| Página | Title único | Description única | H1 |
|--------|-------------|-------------------|-----|
| Home | Sí (default) | Sí | ✅ "Tus certificados energéticos bajo control" |
| Segunda Opinión | ❌ | ❌ | — |
| Blog [slug] | Sí (dinámico) | Sí (excerpt) | Sí |
| Sobre nosotros | Sí | Sí | Sí |
| Legal | Sí | No visible | Sí |
| Buscador | Sí | Sí | Sí |

**Problemas críticos:**

1. **No hay canonical** en ninguna página. Riesgo de contenido duplicado.
2. **Las páginas de servicios** (segunda-opinion, etc.) usan el layout global y heredan title/description genéricos. Deberían tener metadata específica en cada page.tsx.
3. **No hay meta robots noindex** en páginas legales, gracias, resultado-auditoria.
4. **No hay hreflang** para la versión catalana del buscador.
5. **Open Graph image** — solo hay og:image:alt, no og:image real.

### Sitemap (sitemap.ts)

✅ Genera URLs para:
- Home
- Servicios (5)
- Todos los artículos (27)
- Sobre nosotros
- Buscador (cast/cat)

❌ **No incluye**: páginas legales (correcto), gracias, resultado-auditoria.

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://certilab.cat/sitemap.xml
```

✅ Correcto. No hay bloqueos innecesarios.

---

## 3. SCHEMA.ORG

### Lo que existe

**BreadcrumbList:**
✅ Implementado en el layout global con `ld+json`:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://certilab.cat" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://certilab.cat/blog" },
    { "@type": "ListItem", "position": 3, "name": "[título]", "item": "..." }
  ]
}
```

**Organization:**
✅ Implementado en layout con `ld+json`:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Certilab",
  "url": "https://certilab.cat",
  "description": "...",
  "foundingDate": "2024",
  "founder": { "@type": "Person", "name": "Eva María González García" },
  "contactPoint": { "@type": "ContactPoint", ... },
  "sameAs": ["https://www.linkedin.com/in/eva-mar%C3%ADa-gonz%C3%A1lez-garc%C3%ADa-8762aa96/"]
}
```

### Lo que falta (crítico)

| Schema | Estado | Impacto |
|--------|--------|---------|
| **Organization** | ✅ Existe | Medio |
| **BreadcrumbList** | ✅ Existe | Medio |
| **Person** (Eva) | ❌ NO existe | Alto — para E-E-A-T |
| **Service** | ❌ NO existe | **Crítico** — cada servicio debería tener su propio schema Service |
| **LocalBusiness** | ❌ NO existe | Alto — para búsqueda local (Catalunya) |
| **FAQPage** | ❌ NO existe | Alto — hay FAQSection con datos pero sin schema FAQPage |
| **Article** (NewsArticle) | ❌ NO existe | Alto — los artículos del blog no tienen schema Article |
| **Product** (para servicios con precio) | ❌ NO existe | Medio |
| **Review** | ❌ NO existe | Medio — podría marcar testimonios como Review |
| **HowTo** | ❌ NO existe | Bajo — aplicable a procesos como "cómo detectar" |

### Prioridad de implementación

1. **Service** — cada página de servicio con precio, descripción, área servida
2. **FAQPage** — sobre el FAQSection existente (hay datos pero sin marcado)
3. **Article** — todos los artículos del blog
4. **LocalBusiness** — con área de servicio en Catalunya
5. **Person** — Eva como profesional con credenciales

---

## 4. SEO PARA IA

### Entidades principales que domina la web

| Entidad | Frecuencia | Autoridad |
|---------|-----------|-----------|
| Certificado energético incorrecto | Muy alta | Alta — es el tema core |
| Brown Discount / sobreprecio | Alta | Media — pocos competidores lo tratan |
| Calificación energética (letras A-G) | Muy alta | Alta |
| RD 390/2021 (normativa) | Alta | Alta — referencias legales |
| Segunda opinión | Media | Media — concepto propio |
| Visita presencial del técnico | Alta | Alta |
| CATEB 9457 | Baja | Alta — identificador único de Eva |
| Eva María González García | Media | Alta — única experta citada |

### Entidades que deberían reforzarse

| Entidad | Estado | Acción |
|---------|--------|--------|
| **Catalunya / Generalitat** | Bajo | Solo en páginas de buscador. Debería aparecer en más artículos |
| **Arquitecto técnico** | Bajo | La profesión de Eva debería explicitarse más |
| **Colegio de Arquitectos Técnicos** | Bajo | Refuerza autoridad |
| **Hipoteca verde / financiación** | Bajo | Solo 1 artículo. Gran oportunidad |
| **Reclamación / denuncia** | Bajo | Aparece pero sin página dedicada |
| **Valor de mercado / tasación** | Medio | Oportunidad de relacionar más |

### Estructura semántica

**Fortalezas:**
- Relación clara entre problema (certificado incorrecto) y solución (segunda opinión)
- Cada artículo aborda un aspecto específico del problema central
- Autoría consistente de Eva — buena señal E-E-A-T

**Debilidades:**
- Los artículos no se enlazan entre sí (contenido huérfano)
- No hay clusters temáticos claros ni hub pages
- Las categorías/tags existen en datos pero no se explotan en navegación
- No hay taxonomy pages (páginas de categoría)

### Recuperación por LLMs

✅ **llms.txt y llms-full.txt** existen en `/public/`. Contienen extractos útiles.

Problemas:
- `llms.txt` tiene contenido limitado. El `llms-full.txt` es más completo pero no está referenciado desde el sitemap.
- No hay `llms-large.txt` con el contenido completo de todos los artículos.
- La estructura actual solo expone resúmenes; los LLMs no pueden recuperar el cuerpo completo de los artículos indexados.

---

## 5. ARQUITECTURA DE CONTENIDOS

### Mapa de contenidos

```
CERTIFICADO ENERGÉTICO (tema raíz)
│
├── PROBLEMAS / ERRORES
│   ├── certificado-energetico-incorrecto        (artículo principal)
│   ├── certificado-energetico-inflado
│   ├── detectar-certificado-energetico-falso
│   ├── errores-certificado-energetico
│   ├── errores-graves-certificado-energetico
│   ├── como-saber-si-certificado-energetico-esta-mal
│   ├── certificado-energetico-inflado-que-hacer
│   ├── certificado-energetico-f-g-correcto
│   └── certificado-energetico-f-g-correcto-o-error
│
├── CONSECUENCIAS ECONÓMICAS
│   ├── brown-discount-precio-vivienda
│   ├── perder-dinero-certificado-energetico-mal-hecho
│   ├── certificado-energetico-negociar-precio
│   └── certificado-energetico-hipoteca-verde
│
├── NORMATIVA / OBLIGACIONES
│   ├── certificado-energetico-obligatorio-alquiler
│   ├── multas-certificado-energetico
│   ├── cuanto-dura-certificado-energetico
│   └── certificado-energetico-comunidades-vecinos
│
├── PROCESO / CÓMO HACERLO
│   ├── como-obtener-certificado-energetico
│   ├── obtener-certificado-energetico-gratis
│   ├── cuanto-cuesta-certificado-energetico-2026
│   ├── como-interpretar-certificado-energetico
│   ├── guia-tramitar-certificado-energetico-catalunya
│   └── certificado-energetico-vendedor-fiable
│
├── RECLAMACIÓN
│   ├── reclamar-certificado-energetico-incorrecto
│   └── (necesita refuerzo)
│
├── AYUDAS / SUBVENCIONES
│   └── ayudas-next-generation-rehabilitacion-energetica-2026
│
└── CONTEXTO INMOBILIARIO
    ├── vivienda-eficiente-sin-certificado-a
    └── (necesita más artículos de compraventa)
```

### Contenido huérfano

| Artículo | Enlaces entrantes desde otros artículos |
|----------|----------------------------------------|
| brown-discount-precio-vivienda | 0 enlaces desde otros artículos |
| cuanto-cuesta-certificado-energetico-2026 | 0 |
| obtener-certificado-energetico-gratis | 0 |
| ayudas-next-generation-2026 | 0 |
| certificado-energetico-comunidades-vecinos | 0 |
| certificado-energetico-hipoteca-verde | 0 |
| perder-dinero-certificado-energetico-mal-hecho | 0 |
| segundas-opinion-certificado-energetico | 0 |

✅ Los artículos enlazan al servicio `/segunda-opinion/` mediante CTAs, **pero no se enlazan entre sí**.

### Oportunidades de enlazado interno

1. Cada artículo sobre "errores" debería enlazar a "reclamar-certificado-energetico-incorrecto"
2. Cada artículo sobre "precio" debería enlazar a "brown-discount" y "perder-dinero"
3. Cada artículo sobre "normativa" debería enlazar a "multas-certificado-energetico"
4. Todos los artículos sobre "detectar" deberían enlazar a "segunda-opinion"
5. El artículo de "hipoteca-verde" debería enlazar a "certificado-energetico-negociar-precio"

---

## 6. CONVERSIÓN

### Mapa de conversión actual

```
TRÁFICO ORGÁNICO
  │
  ▼
ARTÍCULO / PÁGINA DE SERVICIO
  │
  ├── CTA: "Segunda Opinión por 59€" (artículos)
  ├── CTA: WhatsApp flotante
  ├── CTA: StickyCTA inferior
  ├── CTA: Formulario de contacto
  │
  ▼
PÁGINA SEGUNDA OPINIÓN (landing de servicio)
  │
  ├── CTA: Botón "Solicitar ahora" → WhatsApp
  ├── CTA: Formulario
  │
  ▼
GRACIAS / WHATSAPP
  │
  ▼
EVA (respuesta manual)
```

### CTAs identificados

| Ubicación | Tipo | Texto | Efectividad |
|-----------|------|-------|-------------|
| Artículos (inline) | Link | "Revisar mi certificado por 59€ →" | ✅ Buena |
| Artículos (bloque) | Botón | "Revisar mi certificado por 59€ →" | ✅ Buena |
| Header | Botón | "Segunda Opinión" | ✅ Constante |
| StickyCTA | Botón | WhatsApp / teléfono | ✅ Visible sempre |
| HeroSection | Botón | CTA principal | ✅ |
| ContactForm | Formulario | Nombre, email, teléfono, mensaje | ⚠️ Largo |
| Testimonials | Social proof | Citas de clientes | ✅ |
| WhatsApp flotante | Icono | Chat directo | ✅ |

### Fricciones detectadas

| Fricción | Impacto | Solución |
|----------|---------|----------|
| **Formulario demasiado largo** | Alto | Tiene 4 campos + textarea. Reducir a 3 campos (nombre, teléfono, email) |
| **No hay lead magnet automático** | Alto | No hay nada descargable sin interacción humana. Añadir checklist PDF descargable |
| **Precio solo en CTAs, no en hero** | Medio | El hero no muestra precio. Debería mostrar "Desde 59€" |
| **WhatsApp como único canal de pago** | Medio | Dependencia total de respuesta manual de Eva |
| **No hay calculadora de ahorro** | Medio | Una calculadora "¿Cuánto puedes perder?" generaría leads |
| **Artículos no enlazan a otros servicios** | Bajo | Solo enlazan a Segunda Opinión. Perder perder oportunidades de up-sell |
| **No hay pop-up de salida** | Bajo | Podría capturar leads que están a punto de abandonar |

### Lead magnets (inexistentes)

❌ **No hay ningún lead magnet implementado.**

Oportunidades:
- Checklist "10 señales de certificado incorrecto" (PDF descargable)
- Calculadora "¿Cuánto vale realmente tu vivienda?"
- Guía "Cómo reclamar un certificado energético incorrecto"
- Mini-curso por email "3 días para saber si tu certificado es fiable"

### Funnel actual

```
CONCIENCIA   → Artículo blog (tráfico orgánico)
INTERÉS      → Lectura + identificación del problema
CONSIDERACIÓN → CTA → Landing Segunda Opinión
ACCIÓN       → WhatsApp / Formulario
RETENCIÓN    → ❌ No hay email marketing ni remarketing
```

**Problema grave:** No hay fase de retención. Una vez que el usuario contacta, no hay seguimiento automático.

---

## 7. PRIORIZACIÓN

| # | Mejora | Impacto SEO | Impacto IA | Impacto Conversión | Dificultad |
|---|--------|:-----------:|:----------:|:------------------:|:----------:|
| 1 | Añadir schema FAQPage al FAQSection | 🟢 Alto | 🟢 Alto | 🟡 Medio | 🟢 Baja |
| 2 | Añadir schema Article a blog posts | 🟢 Alto | 🟢 Alto | 🟡 Medio | 🟢 Baja |
| 3 | Añadir schema Service en páginas de servicio | 🟢 Alto | 🟢 Alto | 🟢 Alto | 🟢 Baja |
| 4 | Enlazar artículos entre sí (internal linking) | 🟢 Alto | 🟢 Alto | 🟡 Medio | 🟢 Baja |
| 5 | Crear lead magnet descargable (checklist) | 🟡 Medio | 🔴 Bajo | 🟢 Alto | 🟢 Baja |
| 6 | Añadir canonical a todas las páginas | 🟢 Alto | 🔴 Bajo | 🔴 Bajo | 🟢 Baja |
| 7 | Añadir meta específica a cada servicio | 🟢 Alto | 🟡 Medio | 🟡 Medio | 🟢 Baja |
| 8 | Añadir meta robots noindex a páginas legales/gracias | 🟡 Medio | 🔴 Bajo | 🔴 Bajo | 🟢 Baja |
| 9 | Añadir schema LocalBusiness | 🟡 Medio | 🟢 Alto | 🟡 Medio | 🟢 Baja |
| 10 | Añadir schema Person (Eva) | 🟡 Medio | 🟢 Alto | 🟡 Medio | 🟢 Baja |
| 11 | Simplificar formulario de contacto | 🔴 Bajo | 🔴 Bajo | 🟢 Alto | 🟢 Baja |
| 12 | Añadir hreflang para versión catalana | 🟡 Medio | 🔴 Bajo | 🔴 Bajo | 🟢 Baja |
| 13 | Añadir precio en hero de servicios | 🔴 Bajo | 🔴 Bajo | 🟢 Alto | 🟢 Baja |
| 14 | Crear páginas de categoría/taxonomía | 🟢 Alto | 🟢 Alto | 🟡 Medio | 🟡 Media |
| 15 | Crear calculadora de Brown Discount | 🟡 Medio | 🟡 Medio | 🟢 Alto | 🟡 Media |
| 16 | Añadir Open Graph image real | 🟡 Medio | 🔴 Bajo | 🟡 Medio | 🟢 Baja |
| 17 | Añadir Twitter Cards | 🟡 Medio | 🔴 Bajo | 🔴 Bajo | 🟢 Baja |
| 18 | Implementar email marketing post-contacto | 🔴 Bajo | 🔴 Bajo | 🟢 Alto | 🟡 Media |
| 19 | Enriquecer llms.txt con contenido completo | 🔴 Bajo | 🟢 Alto | 🟡 Medio | 🟢 Baja |
| 20 | Añadir pop-up de salida con lead magnet | 🔴 Bajo | 🔴 Bajo | 🟢 Alto | 🟢 Baja |

---

## 8. TOP 20 MEJORAS ORDENADAS

Priorización basada en:
1. **Conversión** — aumentar solicitudes de Segunda Opinión
2. **SEO para IA** — visibilidad en respuestas de LLMs
3. **SEO técnico** — posicionamiento orgánico

### 🏆 IMPLEMENTACIÓN INMEDIATA (días 1-3)

**1. Lead magnet descargable**
Crear PDF "Checklist: 10 señales de que tu certificado energético está mal".
Colocar en todos los artículos como descarga gratuita a cambio de email.
→ **Por qué:** Captura leads aunque no compren. Es el inicio del funnel.

**2. Schema FAQPage**
Marcar el FAQSection existente con schema.org/FAQPage.
→ **Por qué:** Google muestra las FAQ en rich snippets. Bajo esfuerzo, alto impacto.

**3. Schema Article en blog**
Añadir schema NewsArticle a cada artículo del blog.
→ **Por qué:** Los artículos aparecerían en Google News y rich results. Diferencia con competidores.

**4. Schema Service en páginas de servicio**
Cada servicio (Segunda Opinión, Express, Informe Técnico) con schema Service,
incluyendo precio, área servida (Catalunya), y provider (Eva/Organization).
→ **Por qué:** Google Shopping de servicios. Rich snippet con precio.

**5. Internal linking entre artículos**
Añadir enlaces contextuales cruzados entre artículos relacionados.
→ **Por qué:** Distribuye link juice, mejora crawl depth, mantiene al usuario en el site.

**6. Canonical tags**
Añadir `<link rel="canonical" href="...">` a todas las páginas.
→ **Por qué:** Evita problemas de contenido duplicado (www/no-www, trailing slash, etc.)

**7. Meta específica por servicio**
Cada página de servicio debe tener su propio title y description, no heredar los del layout.
→ **Por qué:** Las SERPs actuales muestran el mismo título para servicios diferentes.

**8. Simplificar formulario**
Reducir ContactForm a: nombre, teléfono. Eliminar email como obligatorio (pedirlo después).
→ **Por qué:** Menos fricción = más conversiones. El email se puede pedir en el lead magnet.

**9. Precio en hero**
Añadir "Desde 59€" en el hero de Segunda Opinión.
→ **Por qué:** El precio es el principal factor de decisión. Ocultarlo retrasa la conversión.

### 🥈 CORTO PLAZO (días 4-7)

**10. Schema LocalBusiness**
Añadir con área de servicio: Catalunya. Incluir horario, teléfono, dirección (si aplica).
→ **Por qué:** Google Local. Búsquedas "certificado energético Barcelona/Girona/Lleida/Tarragona".

**11. Schema Person**
Añadir schema para Eva con: nombre, profesión (Arquitecto Técnico), afiliación (CATEB 9457),
LinkedIn, descripción.
→ **Por qué:** E-E-A-T. Google valora la autoría humana verificable.

**12. Meta robots noindex**
Añadir `noindex, follow` a: /gracias/, /resultado-auditoria/, /aviso-legal/, /privacidad/, /cookies/.
→ **Por qué:** Evita páginas de baja calidad en el índice.

**13. Hreflang**
Añadir hreflang a la página catalana del buscador.
→ **Por qué:** Señal internacionalización. El catalán es un idioma oficial.

**14. Open Graph image**
Añadir og:image real (1200x630) con el logo + texto descriptivo.
→ **Por qué:** Mejora el compartir en redes sociales. Actualmente no hay imagen OG.

**15. Twitter Cards**
Añadir meta tags twitter:card, twitter:site, twitter:title, twitter:description.
→ **Por qué:** Visibilidad en X/Twitter. Bajo esfuerzo.

### 🥉 MEDIO PLAZO (semanas 2-4)

**16. Páginas de categoría/taxonomía**
Crear páginas para cada tag:
- /blog/errores/
- /blog/normativa/
- /blog/consecuencias/
- /blog/reclamacion/

Enlazar desde el menú y desde los artículos.
→ **Por qué:** Arquitectura de contenidos. Permite crawling sistemático.

**17. Calculadora de Brown Discount**
Herramienta interactiva: "Introduce el valor de tu vivienda y la calificación real →
calcula cuánto puedes perder".
→ **Por qué:** Lead generation masivo. Engagement. Shareability.

**18. Email marketing post-contacto**
Implementar secuencia de 3 emails automáticos tras el lead magnet:
1. "Aquí tienes tu checklist"
2. "¿Has comprobado tu certificado?"
3. "Oferta especial Segunda Opinión"
→ **Por qué:** Nurturing. Muchos leads no compran en el primer contacto.

**19. Enriquecer llms.txt**
Añadir el contenido completo indexable de todos los artículos en llms-full.txt.
→ **Por qué:** Recuperación por LLMs. Posicionamiento en respuestas de ChatGPT, Claude, Perplexity.

**20. Pop-up de salida con lead magnet**
Cuando el usuario mueve el ratón para salir, mostrar el lead magnet.
→ **Por qué:** Captura leads que abandonan. Conversión residual.

---

## RESUMEN EJECUTIVO

### Logros actuales
- ✅ Arquitectura sólida con 27 artículos que cubren el tema central
- ✅ Autoridad temática clara en certificados energéticos incorrectos
- ✅ CTAs bien distribuidos en artículos y header
- ✅ Schema Organization y BreadcrumbList implementados
- ✅ Sitemap y robots.txt correctos
- ✅ llms.txt implementado
- ✅ Diseño mobile-friendly (tailwind + CSS modules)
- ✅ WhatsApp como canal de conversión directa

### Problemas críticos
| # | Problema | Impacto |
|---|----------|---------|
| ❌ | No hay lead magnets (captura de emails = 0) | Conversión |
| ❌ | No hay schema en servicios, FAQ, artículos | SEO + IA |
| ❌ | No hay internal linking entre artículos | SEO + Usabilidad |
| ❌ | Metadata genérica en páginas de servicio | SEO |
| ❌ | No hay canonical tags | SEO técnico |
| ❌ | No hay email marketing ni retención | Conversión |
| ❌ | Formulario tiene fricción innecesaria | Conversión |

### Quick wins (día 1)
1. Schema FAQPage → 30 minutos
2. Schema Service en Segunda Opinión → 1 hora
3. Simplificar formulario → 30 minutos
4. Añadir canonical → 1 hora
5. Meta específica por servicio → 2 horas
6. Precio en hero → 30 minutos
7. Lead magnet PDF → 4 horas
8. Internal linking (10 artículos) → 3 horas

**Total día 1: ~12 horas de trabajo → impacto directo en conversiones y visibilidad.**