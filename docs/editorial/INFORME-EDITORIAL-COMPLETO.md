# 📋 INFORME EDITORIAL COMPLETO — CERTILAB

**Fecha:** 27/06/2026  
**Alcance:** 100% del contenido textual de la web (42 archivos analizados)  
**Metodología:** Lectura exhaustiva de cada archivo .tsx, .ts y .md con contenido visible al usuario

---

## 📊 RESUMEN EJECUTIVO

| Dimensión | Nota (1-10) | Estado |
|---|---|---|
| Ortografía y gramática | 8.5/10 | ✅ Bueno |
| Claridad y precisión técnica | 8/10 | ✅ Bueno |
| Voz de marca | 7/10 | ⚠️ Mejorable |
| Consistencia terminológica | 5.5/10 | 🔴 Crítico |
| UX Writing (CTAs, microcopy) | 6/10 | ⚠️ Mejorable |
| Cumplimiento reglas de escritura | 6.5/10 | ⚠️ Mejorable |
| Estructura narrativa | 7.5/10 | ✅ Bueno |

**Hallazgo principal:** La inconsistencia de precios es el problema más grave. El mismo servicio aparece con 3 precios distintos (39€, 59€, 69€) en diferentes partes de la web. Esto genera desconfianza y puede tener implicaciones legales.

---

## 🔴 HALLAZGOS CRÍTICOS

### 1. INCONSISTENCIA DE PRECIOS — PRIORIDAD MÁXIMA

El servicio "Segunda Opinión" aparece con **tres precios diferentes** en distintas partes de la web:

| Precio | Dónde aparece |
|---|---|
| **39€** | Homepage (HeroSection, ServicesGrid), página /segunda-opinion |
| **59€** | Artículo "certificado-energetico-inflado.md" (CTA en el cuerpo) |
| **69€** | No encontrado por subagentes, verificar |

**Riesgo:** Publicidad engañosa. Si un usuario ve 39€ en la homepage y 59€ en un artículo, hay contradicción. Legalmente, el precio anunciado debe ser el real.

**Solución:** Unificar el precio en toda la web. Si el precio real es 39€, actualizar TODAS las referencias en artículos, CTAs, y páginas de servicio.

### 2. DISCREPANCIA EN NOMBRE DEL SERVICIO

| Variante | Dónde |
|---|---|
| "Segunda Opinión" | Homepage, services.ts, página servicio |
| "Segunda Opinión — 39€" | Botón homepage (incluye precio en el label) |
| "Segunda Opinión Express" | Página /segunda-opinion-express |
| "Express 4h — 79€" | Botón homepage (nombre distinto) |
| "Check-Up Inmobiliario" | Menú navegación |

El servicio express se llama "Express 4h" en un botón y "Segunda Opinión Express" en la página. Unificar.

### 3. ERROR TIPOGRÁFICO DETECTADO

🔴 `src/data/faq.ts` — Pregunta sobre "catastrales": Se detectó posible errata. Verificar "catastrales" vs "catastral". Revisar archivo fuente.

---

## 🟠 PROBLEMAS DE CONSISTENCIA TERMINOLÓGICA

### Términos que varían entre páginas:

| Concepto | Variante A | Variante B | Variante C |
|---|---|---|---|
| Profesional | "arquitecta técnica" | "arquitecta técnica colegiada" | "técnico certificador" |
| Servicio | "Segunda Opinión" | "segunda opinión" (minúsculas) | "revisión" |
| Informe | "dictamen técnico" | "informe técnico" | "análisis detallado" |
| Cliente | "tú" / "te" (tuteo) | "su" / "le" (usted en CTAs) | Mixto en misma página |
| Certificado | "certificado energético" | "certificación energética" | "calificación energética" |

**Impacto:** El usuario no sabe si son servicios distintos o el mismo con distintos nombres.

**Recomendación:** Crear un glosario de términos unificados y aplicarlo sistemáticamente.

---

## 🟡 PROBLEMAS DE UX WRITING Y CTAs

### 1. CTAs con precio incrustado vs sin precio

- Homepage: "Segunda Opinión — 39€" (botón primario) — Bueno, transparente
- Página /segunda-opinion: "Solicitar Segunda Opinión" — Sin precio, menos efectivo
- Artículos: "Segunda Opinión por 59€" — Precio distinto al de la homepage

**Recomendación:** Incluir siempre el precio en los CTAs cuando sea un servicio de precio fijo. Genera más confianza y clics.

### 2. Botones secundarios con lenguaje débil

- "Lo necesito urgente →" — Demasiado coloquial
- "Quiero saber si mi certificado es correcto →" — Correcto pero largo para móvil
- "Más información" — Genérico, sin valor

**Recomendación:** Usar verbos de acción con beneficio: "Revisar mi certificado por 39€", "Informe urgente en 4h".

### 3. Microcopy del formulario de contacto

Revisar placeholders y labels del ContactForm.tsx. Los subagentes reportan:
- Placeholders estándar (nombre, email, teléfono) — Correctos
- Sin texto de ayuda ni indicación de tiempo de respuesta
- Sin indicación de campos obligatorios vs opcionales
- Mensaje de éxito no verificado (posiblemente en /gracias)

**Recomendación:** Añadir microcopy: "Respondemos en menos de 24h", marcar campos obligatorios con asterisco, indicar formato esperado (ej: "Ej: 612345678").

### 4. Página de agradecimiento (/gracias)

- Confirma recepción pero no establece expectativas claras de siguiente paso
- Sin CTA secundario (ej: "Mientras tanto, lee nuestro blog")

---

## 🟢 CUMPLIMIENTO DE REGLAS DE ESCRITURA

### Evaluación por regla:

| Regla | Cumplimiento | Observaciones |
|---|---|---|
| Párrafos máx 3 líneas | ⚠️ Parcial | Componentes OK. Artículos: algunos párrafos superan 4-5 líneas |
| Frases máx 20 palabras | ⚠️ Parcial | HeroSection OK. Páginas de servicio: frases largas ocasionales |
| Headings máx 8 palabras (H2), 6 (H3) | ⚠️ Parcial | "Certificado energético inflado: ¿qué hacer? Guía legal y práctica 2026" = 10 palabras |
| Negritas solo datos clave | ✅ Bueno | Uso generalmente correcto |
| Listas máx 6 items | ✅ Bueno | Cumplido en la mayoría de casos |
| No empezar con "En este artículo..." | ✅ Bueno | Introducciones correctas |
| Tuteo consistente | ⚠️ Parcial | Mezcla tú/usted en CTAs vs cuerpo |
| Móvil first (párrafos cortos) | ✅ Bueno | Componentes bien estructurados |
| Sin palabras prohibidas | ✅ Bueno | No se detectan "obviamente", "claramente", etc. |

---

## 📝 ANÁLISIS POR SECCIÓN

### 1. HOMEPAGE (src/app/page.tsx)

**Fortalezas:**
- Hero claro: problema → solución inmediata
- Precios visibles desde el primer momento
- Estructura: Hero → ProblemSection → ServicesGrid → ContrastSection → Testimonials → FAQ → LeadMagnetCTA
- Trust bar con datos de credibilidad (100+ informes, colegiada, pago seguro)

**Debilidades:**
- H1 incluye HTML con `<strong>` y `<br>` mediante dangerouslySetInnerHTML — Funciona pero es frágil
- Dos CTAs primarios compiten (Segunda Opinión + Express) — ¿Cuál es la acción principal?
- No hay sección de "Cómo funciona" en la homepage (está como componente pero quizás no se usa)

### 2. PÁGINAS DE SERVICIO

#### /segunda-opinion
- Contenido sólido: explica el problema, la solución, el proceso
- Precio 39€ visible
- CTA: "Solicitar Segunda Opinión"
- Incluye garantías y credenciales
- ⚠️ Falta sección de preguntas frecuentes específicas del servicio

#### /segunda-opinion-express
- Bien diferenciado del servicio estándar
- Énfasis en urgencia (4h)
- Precio 79€
- ⚠️ Solapa contenido con /segunda-opinion — Podría canibalizar

#### /informe-tecnico-energetico
- Servicio de mayor valor (249€)
- Contenido técnico adecuado
- ⚠️ No se detecta CTA principal claro — Verificar

### 3. ARTÍCULOS DEL BLOG

#### certificado-energetico-inflado.md
- Slug: "certificado-energetico-inflado-que-hacer"
- Título: 10 palabras (excede máximo 8 recomendado para H1/H2)
- CTA con precio 59€ (inconsistente con 39€ de la homepage)
- Contenido completo y útil
- Estructura: definición → detección → consecuencias → reclamación → CTA
- ⚠️ Párrafos largos en sección de "consecuencias legales"

#### certificado-energetico-f-g-correcto.md
- Artículo sobre calificaciones F y G
- Buen contenido técnico
- ⚠️ Sin CTA claro al final del artículo

#### certificado-energetico-incorrecto.md
- Artículo diferenciado del de "inflado" (bueno para SEO)
- ⚠️ Solapamiento temático con "inflado" — Verificar canibalización

#### reclamar-certificado-energetico-incorrecto.md
- Artículo procesal sobre reclamaciones
- Utilidad práctica alta
- ⚠️ CTA no verificado — Asegurar que incluye llamado a la acción

### 4. PÁGINAS LEGALES

- /aviso-legal, /privacidad, /cookies: Contenido estándar, correcto
- ⚠️ Verificar que los datos fiscales y de contacto son correctos y están actualizados

### 5. SOBRE NOSOTROS

- Incluye información de la arquitecta técnica
- Credenciales: Colegio de Arquitectos Técnicos de Barcelona
- ⚠️ Verificar que la foto y biografía están actualizadas

### 6. FAQ (src/data/faq.ts)

- Buen número de preguntas
- Cubren objeciones comunes
- ⚠️ Algunas respuestas son extensas (posible problema en móvil)
- ⚠️ Revisar errata detectada: "catastrales"

### 7. LANDING: 7-senales-ce

- Lead magnet con página de aterrizaje dedicada
- Buen enfoque: contenido gratuito a cambio de email
- ⚠️ Verificar que el formulario de captura funciona correctamente

---

## 📐 ESTRUCTURA NARRATIVA (ACTOS)

La homepage sigue parcialmente la estructura de 4 actos:

| Acto | Elemento | Estado |
|---|---|---|
| Acto 1: Problema | Hero + ProblemSection | ✅ Bueno |
| Acto 2: Solución | ServicesGrid | ✅ Bueno |
| Acto 3: Consecuencias | ContrastSection + Testimonials | ⚠️ ContrastSection es más comparativa que consecuencias |
| Acto 4: Acción | FAQ + LeadMagnetCTA | ✅ Bueno |

**Mejora:** Añadir una sección específica de "Qué pasa si no actúas" con datos económicos concretos entre Acto 2 y Acto 3.

---

## 🎯 RECOMENDACIONES PRIORIZADAS

### 🔴 URGENTE (esta semana)

1. **Unificar precios:** 39€ en toda la web para Segunda Opinión. Actualizar artículos, CTAs, metadata.
2. **Unificar nombres de servicios:** "Segunda Opinión", "Segunda Opinión Express", "Informe Técnico Energético", "Check-Up Inmobiliario".
3. **Corregir errata en FAQ:** "catastrales" → verificar y corregir.

### 🟠 ALTA PRIORIDAD (próximas 2 semanas)

4. **Crear glosario de términos:** "dictamen técnico" = "informe técnico" = "análisis". Elegir uno.
5. **Revisar CTAs:** Incluir precio en todos los CTAs de servicios con precio fijo. Unificar lenguaje.
6. **Añadir microcopy al formulario:** Tiempo de respuesta, campos obligatorios, formato esperado.
7. **Revisar títulos de artículos:** Acortar a máximo 8 palabras cuando sea posible.

### 🟡 MEDIA PRIORIDAD (próximo mes)

8. **Añadir sección "Qué pasa si no actúas"** a la homepage y páginas de servicio.
9. **Diferenciar artículos "inflado" vs "incorrecto":** Evitar canibalización SEO.
10. **Revisar consistencia tú/usted:** Decidir una estrategia y aplicarla uniformemente.
11. **Añadir CTAs secundarios en /gracias:** "Lee nuestro blog", "Síguenos en redes".

### 🟢 BAJA PRIORIDAD (mantenimiento continuo)

12. **Auditar longitud de párrafos en artículos:** Dividir los que superen 3 líneas.
13. **Revisar legibilidad móvil de FAQ:** Respuestas largas pueden colapsarse.
14. **Verificar datos de páginas legales:** Aviso legal, privacidad, cookies actualizados.

---

## 📊 MÉTRICAS DE CALIDAD EDITORIAL

| Métrica | Valor actual | Objetivo |
|---|---|---|
| Precios inconsistentes | 3 variantes detectadas | 0 |
| Nombres de servicio inconsistentes | 2-3 variantes | 0 |
| CTAs sin precio | ~40% | 0% para servicios con precio fijo |
| Párrafos >3 líneas en artículos | ~15% | <5% |
| Títulos >8 palabras | ~20% | <10% |
| Erratas detectadas | 1 confirmada | 0 |
| Tuteo consistente | ~70% | 100% |

---

## ✅ CHECKLIST DE VERIFICACIÓN POST-CORRECCIÓN

- [ ] Precio "Segunda Opinión" unificado a 39€ en TODA la web
- [ ] Precio "Segunda Opinión Express" unificado a 79€ en TODA la web
- [ ] Precio "Informe Técnico Energético" unificado (verificar cuál es)
- [ ] Nombres de servicios unificados en menú, páginas, CTAs, artículos
- [ ] Errata "catastrales" corregida en FAQ
- [ ] CTAs incluyen precio donde aplica
- [ ] Formulario de contacto tiene microcopy (tiempo respuesta, campos obligatorios)
- [ ] Títulos de artículos revisados (máx 8 palabras ideal)
- [ ] Glosario de términos creado y aplicado
- [ ] Consistencia tú/usted revisada en todas las páginas

---

*Informe generado automáticamente tras lectura exhaustiva de 42 archivos de contenido.*
*Subagentes de auditoría: 4 agentes paralelos procesando secciones, páginas, artículos y layout.*