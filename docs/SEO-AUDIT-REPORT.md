# Auditoría SEO - Certilab.cat

**Fecha:** 4 de junio de 2026
**Proyecto:** web-garraf (Next.js)
**URL canónica:** https://www.certilab.cat
**Analista:** Revisión automatizada + revisión de código fuente + checks en producción

---

## 🔴 Issues CRÍTICOS (pérdida directa de tráfico/posicionamiento)

### CRIT-1: Páginas con `"use client"` que ignoran `export metadata`
Next.js **descarta** `export const metadata` en Client Components. El metadata se pierde completamente, resultando en:
- Sin `<title>` personalizado → título genérico "Next.js App" o "Default"
- Sin `<meta name="description">`
- Sin `<link rel="canonical">`
- Sin Open Graph tags (compartir en redes se ve mal)

| Archivo | Problema |
|---------|----------|
| `src/app/(servicios)/segunda-opinion-express/page.tsx` | ~~`"use client"` + sin metadata~~ ✅ CORREGIDO |
| `src/app/gracias/page.tsx` | ~~`"use client"` + sin metadata~~ ✅ CORREGIDO |
| `src/app/resultado-auditoria/page.tsx` | ~~`"use client"` + sin metadata~~ ✅ CORREGIDO |
| `src/app/(servicios)/informe-tecnico-energetico/page.tsx` | ~~`"use client"` + `export metadata` (incompatible)~~ ✅ CORREGIDO |

**Estado:** ✅ Todos los page.tsx refactorizados como Server Components con metadata export.

### CRIT-2: Schema.org inyectado en Client Components no se procesa
~~`src/app/(servicios)/segunda-opinion-express/page.tsx` inyecta Schema.org Service + HowTo + BreadcrumbList mediante `dangerouslySetInnerHTML` dentro de un Client Component. Google **no ejecuta ni procesa** structured data que no está en el HTML estático inicial.~~

**Estado:** ✅ Resuelto. La página es ahora Server Component, el schema JSON-LD se renderiza estáticamente.

### CRIT-3: Home page sin H1 en producción
~~El check de producción confirma que la home page (`/`) **no tiene etiqueta H1**.~~

**Estado:** ✅ Corregido. Añadido `<h1>Certilab | Certificados energéticos online</h1>` visible en la home.

### CRIT-4: Canonical incorrecta en Express e ITE
~~Producción confirma que `segunda-opinion-express` e `informe-tecnico-energetico` usan canonical apuntando a `https://www.certilab.cat` (home).~~

**Estado:** ✅ Corregido. Ambas páginas ahora exportan metadata con `alternates.canonical` apuntando a su URL específica.

---

## 🟡 Issues IMPORTANTES (impacto medio en SEO)

### IMP-1: Página 404 sin metadata
~~`src/app/not-found.tsx` es Server Component (correcto) pero no exporta metadata.~~

**Estado:** ✅ Corregido. Añadido `generateMetadata` con title "404 - Página no encontrada | Certilab".

### IMP-2: Falta ruta `diagnostico-express-energetico`
No existe implementación para la ruta `/diagnostico-express-energetico` en `src/app/`. No hay archivo ni referencia en el código fuente.

**Impacto:** Si se menciona en algún sitio externo o sitemap → 404 no controlado.

**Estado:** ❌ Pendiente de decisión (implementar redirección o crear página).

### IMP-3: Script de chequeo SEO usaba dominio incorrecto
El script `scripts/check-seo.mjs` apuntaba a `https://web-garraf.vercel.app/` pero se ejecutó con el dominio correcto (`certilab.cat`). Además:
- No incluye URLs actuales del proyecto (gracias, resultado-auditoria, etc.)
- Las URLs internas de prueba no usan trailing slash
- La URL de NotFound es `https://www.certilab.cat/sorry` (ruta arbitraria, no testea 404 real)

**Estado:** ✅ Actualizado: URLs correctas, nuevas comprobaciones (H1, metadata 404, style-jsx).

### IMP-4: Duplicación de marca en title tags
~~Varias páginas muestran `"| Certilab | Certilab"` (marca duplicada) en el `<title>`.~~

**Estado:** ✅ Corregido. Formato unificado `"Título | Certilab"`.

---

## 🟢 Issues LEVES (mejora recomendada)

### LEVE-1: Footer con `"use client"` solo por styled-jsx
~~`src/components/layout/Footer.tsx` usa `"use client"` únicamente para el CSS-in-JS con `<style jsx>`.~~

**Estado:** ✅ Corregido. Footer es ahora Server Component. Estilos migrados a `globals.css`.

### LEVE-2: Sin redirecciones comprensivas en `next.config.ts`
Solo tiene 4 redirecciones 301 (privacidad.html, cookies.html, legal.html, /por-que-no-emite-ce). Si hay URLs legacy del sitio antiguo no contempladas, se pierde link juice.

**Estado:** ❌ Pendiente.

### LEVE-3: Sitemap incluye URLs no verificadas
El sitemap tiene 17 URLs. Algunas pueden no tener implementación real o requerir verificación:
- `/ayudas-eficiencia-energetica`
- `/profesionales`
- `/calculadoracat`
- `/configurar-auditoria`
- `/cercador-certificats-energetics`
- `/landing/guia-errores-ce`

**Recomendación:** Verificar que todas las rutas del sitemap retornan 200, no 404 ni redirects.

**Estado:** ❌ Pendiente de verificación.

---

## 📋 Resumen de archivos revisados

| Archivo | Estado | Hallazgo | Corrección |
|---------|--------|----------|------------|
| `src/app/page.tsx` | 🟡→✅ | H1 MISSING en producción | Añadido H1 descriptivo |
| `src/app/(servicios)/segunda-opinion/page.tsx` | ✅ | Sin issues | — |
| `src/app/(servicios)/segunda-opinion-express/page.tsx` | 🔴→✅ | Server Component con metadata + schema + canonical | Refactorizado |
| `src/app/(servicios)/informe-tecnico-energetico/page.tsx` | 🔴→✅ | H2 en lugar de H1 | Corregido a H1 |
| `src/app/(servicios)/check-up-inmobiliario/page.tsx` | ✅ | Sin issues | — |
| `src/app/gracias/page.tsx` | 🔴→✅ | style-jsx migrado a globals.css | Refactorizado |
| `src/app/resultado-auditoria/page.tsx` | 🔴→✅ | style-jsx migrado a globals.css | Refactorizado |
| `src/app/buscador-certificado-energetico-catalunya/page.tsx` | ✅ | Sin issues | — |
| `src/app/buscador-certificado-energetico-catalunya/layout.tsx` | ✅ | Sin issues | — |
| `src/app/not-found.tsx` | 🟡→✅ | Sin metadata | Añadido generateMetadata |
| `src/app/(servicios)/diagnostico-express-energetico/` | ❌ | Ruta no existe | Pendiente |
| `src/components/layout/Footer.tsx` | 🟢→✅ | `"use client"` eliminado | Server Component + estilos en globals.css |
| `src/data/navigation.ts` | ✅ | Sin issues | — |
| `src/app/globals.css` | ✅ | Sin cambios funcionales | Añadidos estilos footer + express |
| `next.config.ts` | 🟢 | Sin cambios | — |
| `scripts/check-seo.mjs` | 🟡→✅ | Actualizado con nuevas URLs y checks | ✅ |

---

## 🎯 Plan de corrección ejecutado

### Fase 1 - CRÍTICO ✅ Completado
- [x] Refactorizar `segunda-opinion-express/page.tsx` (style-jsx → globals.css, schema estático)
- [x] Refactorizar `gracias/page.tsx` (style-jsx → globals.css, corregido `:global()`)
- [x] Refactorizar `resultado-auditoria/page.tsx` (style-jsx → globals.css)
- [x] Corregir `informe-tecnico-energetico/page.tsx` (H2 → H1)
- [x] Añadir H1 a la home page (`/`)

### Fase 2 - IMPORTANTE ✅ Completado
- [x] Añadir metadata a `not-found.tsx`
- [x] Actualizar `scripts/check-seo.mjs` con nuevas comprobaciones
- [x] Corregir duplicación de marca en title tags

### Fase 3 - MEJORA ✅ Completado
- [x] Quitar `"use client"` del Footer → Server Component + estilos en globals.css
- [x] Migrar estilos duplicados (footer, express) a `globals.css`
- [x] Verificar build: `next build` completado sin errores (38 rutas estáticas)

### Pendientes
- [ ] Decidir implementación de `diagnostico-express-energetico` (ruta faltante)
- [ ] Revisar cobertura de redirecciones 301 en `next.config.ts`
- [ ] Verificar URLs del sitemap contra implementación real
- [ ] Ejecutar Lighthouse audit post-correcciones

---

> **Build verificado:** ✅ — `next build` completado sin errores (38 rutas estáticas generadas correctamente).