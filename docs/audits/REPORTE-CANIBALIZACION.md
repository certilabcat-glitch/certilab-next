# 🔍 Auditoría de Canibalizaciones — Julio 2026

## Metodología
- Fuentes analizadas: `articles.ts` (26 artículos), 4 markdowns leídos, `faq.ts`, `sitemap.ts`, `services.ts`, 10 componentes React
- Análisis por: intención de búsqueda, keyword principal, etapa del funnel, CTA
- No se usó documentación histórica ni planes previos

---

## 🚨 A) CANIBALIZACIÓN FUERTE

### 🔴 Caso 1: `certificado-energetico-incorrecto` vs `reclamar-certificado-energetico-incorrecto`

| Campo | `certificado-energetico-incorrecto` | `reclamar-certificado-energetico-incorrecto` |
|-------|--------------------------------------|----------------------------------------------|
| Slug | `/certificado-energetico-incorrecto/` | `/reclamar-certificado-energetico-incorrecto/` |
| Title | "Certificado energético incorrecto: cómo detectarlo y reclamar" | "¿Puedo reclamar un certificado energético incorrecto? Guía 2026" |
| Keyword principal | **certificado energético incorrecto** | **reclamar certificado energético incorrecto** |
| Intención | Detectar errores + reclamar | Reclamar (paso a paso) |
| Problema | El certificado tiene errores | El certificado tiene errores |
| Funnel | TOFU → MOFU | MOFU → BOFU |
| CTA | Segunda Opinión 59€ | Segunda Opinión 59€ |
| Tags | "certificado energético", "errores", "reclamación", "compraventa" | "certificado energético", "reclamar", "errores", "dictamen técnico", "Segunda Opinión" |
| Reading time | 12 min | 8 min |
| Enlazados entre sí | ❌ No se mencionan mutuamente | ❌ No se mencionan mutuamente |

**Motivo:** El artículo largo (12 min) cubre DETECTAR + RECLAMAR. El artículo corto (8 min) cubre solo RECLAMAR. Hay solapamiento en la sección de reclamación. Google no sabe cuál servir para "cómo reclamar certificado energético incorrecto".

**Recomendación: 🔀 FUSIONAR**
- Mantener solo `certificado-energetico-incorrecto` (más completo, mayor readingTime, más autoridad)
- Eliminar `reclamar-certificado-energetico-incorrecto`
- Redirigir 301 hacia el artículo principal
- En el artículo principal, reforzar la sección de reclamación con el contenido del artículo eliminado

---

## 🟡 B) CANIBALIZACIÓN PARCIAL

### 🟡 Caso 2: `certificado-energetico-incorrecto` vs `certificado-energetico-inflado-que-hacer`

| Campo | `certificado-energetico-incorrecto` | `certificado-energetico-inflado-que-hacer` |
|-------|--------------------------------------|--------------------------------------------|
| Slug | `/certificado-energetico-incorrecto/` | `/certificado-energetico-inflado-que-hacer/` |
| Title | "Certificado energético incorrecto: cómo detectarlo y reclamar" | "Certificado energético inflado: ¿qué hacer? Guía legal y práctica 2026" |
| Keyword principal | **certificado energético incorrecto** (genérico) | **certificado energético inflado** (específico) |
| Intención | Todo tipo de errores | Solo calificación inflada |
| Problema | Hay errores en el certificado | La calificación es mejor de la real |
| Funnel | TOFU | MOFU |
| CTA | Segunda Opinión 59€ | Segunda Opinión 59€ |

**Motivo:** El artículo "incorrecto" cubre muchos tipos de errores (incluyendo inflado). El artículo "inflado" es un subconjunto específico. Hay solapamiento en diagnóstico y consecuencias.

**Recomendación: 🔗 ENLAZAR CRUZADAMENTE**
- Desde "incorrecto" → enlazar a "inflado" en la sección de "calificación inflada"
- Desde "inflado" → enlazar a "incorrecto" como "guía general de errores"
- No fusionar porque "inflado" tiene keyword específica propia que no canibaliza

### 🟡 Caso 3: `certificado-energetico-f-g-correcto-o-error` vs `certificado-energetico-incorrecto`

| Campo | `certificado-energetico-f-g-correcto-o-error` | `certificado-energetico-incorrecto` |
|-------|-----------------------------------------------|--------------------------------------|
| Slug | `/certificado-energetico-f-g-correcto-o-error/` | `/certificado-energetico-incorrecto/` |
| Title | "Certificado energético F o G: ¿es correcto o está mal calculado?" | "Certificado energético incorrecto: cómo detectarlo y reclamar" |
| Keyword principal | **certificado energético F o G** | **certificado energético incorrecto** |
| Intención | ¿F/G es real o error? | Detectar errores en general |
| Problema | Calificación F/G sospechosa | El certificado tiene errores |
| Funnel | TOFU-MOFU | TOFU |
| CTA | Segunda Opinión 59€ | Segunda Opinión 59€ |

**Motivo:** El artículo F/G explica cómo saber si es error o no. El artículo "incorrecto" también cubre errores. Solapamiento leve en la parte de diagnóstico de errores.

**Recomendación: 🔗 ENLAZAR CRUZADAMENTE**
- Desde F/G → enlazar a "incorrecto" en la sección de "errores del técnico"
- Desde "incorrecto" → enlazar a F/G en la sección de calificaciones sospechosas
- No fusionar porque F/G tiene intención muy específica (calificación F o G concreta)

### 🟡 Caso 4: `multas-certificado-energetico` vs `sanciones-por-no-tener-certificado-energetico`

*Nota: No tengo el contenido completo de ambos. Evaluación basada en slugs y títulos.*

| Campo | `multas-certificado-energetico` | `sanciones-por-no-tener-certificado-energetico` |
|-------|----------------------------------|--------------------------------------------------|
| Slug | `/multas-certificado-energetico/` | `/sanciones-por-no-tener-certificado-energetico/` |
| Keyword principal | multas certificado energético | sanciones no tener certificado energético |
| Intención | Cuánto es la multa | Qué pasa si no tengo certificado |
| Problema | Me van a multar | No tengo certificado |
| Funnel | MOFU | TOFU |

**Motivo:** Keywords muy cercanas: "multas" vs "sanciones". Google las trata como sinónimos en muchos contextos.

**Recomendación: 🔗 ENLAZAR + DIFERENCIAR**
- Diferenciar claramente: multas = cuantías económicas; sanciones = consecuencias legales + proceso
- Enlazar cruzadamente
- Si siguen compitiendo en 3 meses → fusionar

---

## 🟢 C) CONTENIDO COMPLEMENTARIO (No fusionar)

### Caso 5: `brown-discount-precio-vivienda` vs `certificado-energetico-inflado-que-hacer`
- **Motivo:** Brown Discount habla de PÉRDIDA DE VALOR; Inflado habla de CALIFICACIÓN FALSA
- **Relación:** Causa (inflado) → Consecuencia (Brown Discount)
- **Recomendación:** ✅ ENLAZAR (ya enlazado en ambos sentidos)

### Caso 6: `obtener-certificado-energetico-gratis` vs `cuanto-cuesta-certificado-energetico-2026`
- **Motivo:** Gratis vs Precios reales. Intenciones distintas
- **Recomendación:** ✅ ENLAZAR

### Caso 7: `certificado-energetico-f-g-correcto-o-error` vs `certificado-energetico-inflado-que-hacer`
- **Motivo:** F/G = calificación sospechosamente BAJA; Inflado = calificación sospechosamente ALTA
- **Relación:** Opuestos
- **Recomendación:** ✅ ENLAZAR como "caso contrario"

---

## 📋 REVISIÓN DE REFERENCIAS ROTAS

### FAQ (`src/data/faq.ts`)
- ❌ **Ninguna** referencia a slugs de blog. Solo enlaza a `/ayudas-eficiencia-energetica/` ✅

### Sitemap (`src/app/sitemap.ts`)
- Genera rutas dinámicamente desde el array `articles[]`
- ✅ No hay slugs hardcodeados. Si se elimina un artículo del array, el sitemap se actualiza solo.

### Componentes React
| Archivo | Slugs referenciados | Estado |
|---------|---------------------|--------|
| `HeroSection.tsx` | ❌ Ninguno | ✅ |
| `ProblemSection.tsx` | `brown-discount-precio-vivienda` | ✅ Existe |
| `ContrastSection.tsx` | ❌ Ninguno | ✅ |
| `FAQSection.tsx` | ❌ Ninguno | ✅ |
| `CheckUpInmobiliarioClient.tsx` | ❌ Ninguno | ✅ |
| `HowItWorks.tsx` | ❌ Ninguno | ✅ |
| `ServicesGrid.tsx` | ❌ Ninguno | ✅ |
| `ayudas-eficiencia-energetica/page.tsx` | `certificado-energetico-inflado-que-hacer`, `certificado-energetico-f-g-correcto-o-error`, `reclamar-certificado-energetico-incorrecto` | ✅ Todos existen |
| `page.tsx` (home) | ❌ Ninguno | ✅ |
| `segunda-opinion/page.tsx` | ❌ Ninguno | ✅ |

**Total referencias a artículos existentes:** Todas OK ✅
**Total referencias rotas:** 0 ✅

---

## 🏆 RANKING DE OPORTUNIDADES

| Prioridad | Acción | Esfuerzo | Impacto SEO | Beneficio |
|-----------|--------|----------|-------------|-----------|
| 🔴 **P1** | Fusionar `reclamar-certificado-energetico-incorrecto` → `certificado-energetico-incorrecto` | Medio | Alto | Elimina canibalización fuerte; consolida autoridad |
| 🟡 **P2** | Enlazar `certificado-energetico-incorrecto` ↔ `certificado-energetico-inflado-que-hacer` | Bajo | Medio | Señal de relevancia temática |
| 🟡 **P3** | Enlazar `certificado-energetico-f-g-correcto-o-error` ↔ `certificado-energetico-incorrecto` | Bajo | Medio | Señal de relevancia temática |
| 🟡 **P4** | Diferenciar `multas-certificado-energetico` vs `sanciones-por-no-tener-certificado-energetico` | Bajo | Medio | Evita canibalización futura |
| 🟢 **P5** | Enlazar F/G ↔ Inflado como casos opuestos | Bajo | Bajo | Señal de autoridad temática |

---

## ⚠️ RIESGOS DETECTADOS

1. **Canibalización fuerte** entre `certificado-energetico-incorrecto` (12 min) y `reclamar-certificado-energetico-incorrecto` (8 min): Google tiene dos URLs con intención muy similar compitiendo. **Riesgo: ALTO**
2. **Sin referencias rotas** en FAQ, componentes, sitemap ✅
3. **Redirects F/G** ya están configurados correctamente en `next.config.ts` ✅
4. **El slug corto `certificado-energetico-f-g-correcto`** no existe como artículo real → no hay riesgo ✅

---

## 📊 RESUMEN

| Métrica | Valor |
|---------|-------|
| Artículos totales | 26 |
| Canibalización fuerte | 1 par (2 artículos) |
| Canibalización parcial | 3 pares |
| Contenido complementario | 3 pares |
| Referencias rotas | 0 |
| Redirects necesarios | 1 (si se fusiona P1) |
| Esfuerzo total recomendado | 4-6 horas |

---

*Auditoría generada el 23/06/2026. Fuentes: articles.ts, markdowns, faq.ts, sitemap.ts, services.ts, 10 componentes React.*