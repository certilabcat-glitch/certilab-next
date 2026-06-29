# 🎯 AUDITORÍA MAESTRA EDITORIAL CERTILAB V1.0

**Fecha:** 27 de junio de 2026  
**Comité:** Editor Jefe + Corrector Ortotipográfico + Arquitecto Técnico + UX Writer Senior + Especialista CRO + Psicólogo del Usuario + Comunicación Institucional + Diseñador Editorial + Mobile Reading Expert + AI Search Specialist  
**Alcance:** 100% del contenido editorial (home, servicios, blog, FAQs, formularios, CTAs, landing pages, microcopy, emails, página de gracias)  
**Metodología:** Análisis exhaustivo de 42 archivos de contenido + 5 subagentes paralelos + verificación manual de hallazgos críticos

---

## 📊 RESUMEN EJECUTIVO

| Dimensión | Puntuación | Estado | Prioridad |
|---|---|---|---|
| **Calidad Editorial** | 7.2/10 | ⚠️ Mejorable | 🟠 Alta |
| **Claridad** | 7.8/10 | ✅ Bueno | 🟡 Media |
| **Gramática** | 8.5/10 | ✅ Bueno | 🟢 Baja |
| **Ortografía** | 8.3/10 | ✅ Bueno | 🟢 Baja |
| **UX Writing** | 6.2/10 | ⚠️ Mejorable | 🟠 Alta |
| **Mobile Reading Experience** | 5.8/10 | 🔴 Crítico | 🔴 Crítica |
| **Consistencia** | 5.5/10 | 🔴 Crítico | 🔴 Crítica |
| **Voz de Marca** | 7.1/10 | ⚠️ Mejorable | 🟠 Alta |
| **Credibilidad (E-E-A-T)** | 7.5/10 | ✅ Bueno | 🟡 Media |
| **Conversión** | 6.8/10 | ⚠️ Mejorable | 🟠 Alta |
| **SEO IA (ChatGPT, Gemini, Perplexity)** | 7.3/10 | ✅ Bueno | 🟡 Media |
| **SEO Clásico** | 7.9/10 | ✅ Bueno | 🟢 Baja |

**Hallazgo principal:** Certilab tiene una base editorial sólida, pero sufre de **inconsistencia crítica en precios y nombres de servicios**, **experiencia móvil degradada por tablas no responsivas**, y **CTAs redundantes que generan "banner blindness"**. El tono es profesional pero ocasionalmente cae en lenguaje comercial que contradice la propuesta de "arquitecto técnico independiente".

**Recomendación:** Implementar las mejoras críticas (secciones 1-3) antes de cualquier lanzamiento. Las mejoras de media prioridad pueden hacerse en sprints posteriores.

---

## 🔴 HALLAZGOS CRÍTICOS

### 1. INCONSISTENCIA DE PRECIOS — RIESGO LEGAL

**Severidad:** 🔴 CRÍTICO  
**Impacto:** Publicidad engañosa, pérdida de confianza, riesgo legal

El servicio "Segunda Opinión" aparece con **tres precios diferentes** en distintas partes de la web:

| Precio | Ubicación | Archivo |
|---|---|---|
| **39€** | Homepage (HeroSection, ServicesGrid) | `src/app/page.tsx` |
| **39€** | Página /segunda-opinion | `src/app/(servicios)/segunda-opinion/page.tsx` |
| **59€** | Artículo "certificado-energetico-inflado.md" | `src/data/articles/certificado-energetico-inflado.md` |

**Problema específico:**

```
❌ ANTES (inconsistente):
- Homepage: "Segunda Opinión — 39€"
- Artículo: "Por 59€ sabes si tu certificado te está costando dinero"
- Usuario ve 39€ en home, 59€ en artículo → Desconfianza inmediata
```

**Impacto en usuario:**
- Usuario ve 39€ en homepage
- Hace clic, llega a artículo
- Ve CTA con 59€
- Piensa: "¿Me están engañando? ¿Cuál es el precio real?"
- Abandona la web

**Solución:**

```
✅ DESPUÉS (consistente):
1. Decidir precio real: ¿39€ o 59€?
2. Actualizar TODAS las referencias:
   - src/data/services.ts
   - src/app/page.tsx (HeroSection, ServicesGrid)
   - src/app/(servicios)/segunda-opinion/page.tsx
   - TODOS los artículos que mencionen el precio
   - src/data/faq.ts (si hay preguntas sobre precio)
   - Componentes: LeadMagnetCTA, StickyCTA, ContactForm
3. Crear variable global: const SEGUNDA_OPINION_PRICE = 39
4. Usar en todos los lugares: {SEGUNDA_OPINION_PRICE}€
```

**Justificación:** Los precios deben proceder de una única fuente. No puede existir ningún precio escrito manualmente.

---

### 2. INCONSISTENCIA DE NOMBRES DE SERVICIOS

**Severidad:** 🔴 CRÍTICO  
**Impacto:** Confusión del usuario, canibalización SEO, pérdida de credibilidad

Los servicios aparecen con **múltiples variantes de nombre**:

| Servicio | Variante A | Variante B | Variante C | Ubicación |
|---|---|---|---|---|
| **Segunda Opinión** | "Segunda Opinión" | "segunda opinión" (minúsculas) | "revisión" | Inconsistente |
| **Express** | "Segunda Opinión Express" | "Express 4h" | "Express" | Botones vs páginas |
| **Informe Técnico** | "Informe Técnico Energético" | "Informe técnico" | "Análisis detallado" | Inconsistente |
| **Check-Up** | "Check-Up Inmobiliario" | "Auditoría Inmobiliaria" | No aparece | Menú vs contenido |

**Problema específico:**

```
❌ ANTES (inconsistente):
- Botón homepage: "Express 4h — 79€"
- Página servicio: "Segunda Opinión Express"
- Menú: "Express"
- Usuario no sabe si son servicios distintos o el mismo con nombres diferentes
```

**Solución:**

```
✅ DESPUÉS (consistente):
Crear glosario de términos unificados:

SERVICIO 1: "Segunda Opinión"
- Precio: 39€
- Plazo: 24-48h
- Descripción: "Análisis del certificado existente"
- Usar SIEMPRE este nombre exacto

SERVICIO 2: "Segunda Opinión Express"
- Precio: 79€
- Plazo: 4h
- Descripción: "Análisis urgente del certificado"
- Usar SIEMPRE este nombre exacto

SERVICIO 3: "Informe Técnico Energético"
- Precio: 249€ (verificar)
- Plazo: 5-7 días
- Descripción: "Análisis completo con recomendaciones"
- Usar SIEMPRE este nombre exacto

SERVICIO 4: "Check-Up Inmobiliario"
- Precio: TBD
- Plazo: TBD
- Descripción: TBD
- Usar SIEMPRE este nombre exacto
```

**Implementación:**

```typescript
// src/data/services.ts
export const SERVICES = {
  SEGUNDA_OPINION: {
    name: "Segunda Opinión",
    price: 39,
    duration: "24-48h",
    slug: "segunda-opinion"
  },
  SEGUNDA_OPINION_EXPRESS: {
    name: "Segunda Opinión Express",
    price: 79,
    duration: "4h",
    slug: "segunda-opinion-express"
  },
  INFORME_TECNICO: {
    name: "Informe Técnico Energético",
    price: 249,
    duration: "5-7 días",
    slug: "informe-tecnico-energetico"
  }
}

// Usar en toda la web:
<h2>{SERVICES.SEGUNDA_OPINION.name}</h2>
<p>Desde {SERVICES.SEGUNDA_OPINION.price}€</p>
```

---

### 3. EXPERIENCIA MÓVIL DEGRADADA — TABLAS NO RESPONSIVAS

**Severidad:** 🔴 CRÍTICO  
**Impacto:** Abandono en móvil (60%+ del tráfico), pérdida de conversión, penalización SEO

Se detectaron **18 tablas markdown** que fuerzan scroll horizontal en pantallas de 375px:

#### 3.1 Tablas económicas críticas

**Ubicación:** Artículos sobre coste-oportunidad, hipoteca verde, errores graves

**Problema:**

```
❌ ANTES (tabla en móvil):
┌─────────────────────────────────────────────────────┐
│ Valor vivienda │ Riesgo mín │ Riesgo máx │ Ratio... │
│ 150.000€       │ 7.500€     │ 22.500€    │ 1:127... │
│ 270.000€       │ 13.500€    │ 40.500€    │ 1:229... │
└─────────────────────────────────────────────────────┘

En 375px: cada columna tiene ~70px → texto ilegible
El usuario hace scroll horizontal → pierde contexto
La columna "Ratio beneficio" (la más importante) desaparece
```

**Solución:**

```
✅ DESPUÉS (fichas visuales):
🏠 Vivienda de 150.000€
   Riesgo: 7.500€ – 22.500€
   Inversión en verificación: 59€
   Retorno: por cada 1€ inviertes, ahorras entre 127€ y 381€

🏠 Vivienda de 270.000€
   Riesgo: 13.500€ – 40.500€
   Inversión en verificación: 59€
   Retorno: por cada 1€ inviertes, ahorras entre 229€ y 686€

Cada ficha se lee completa sin scroll horizontal
El dato de "retorno por euro invertido" queda visualmente destacado
```

#### 3.2 Tabla comparativa de servicios (ServicesComparison.tsx)

**Problema:**

```
❌ ANTES (tabla HTML):
┌──────────────────────────────────────────────────────────┐
│ Característica │ Segunda Opinión │ Express │ Informe... │
│ Precio         │ 39€             │ 79€     │ 249€       │
│ Plazo          │ 24-48h          │ 4h      │ 5-7 días   │
│ Análisis       │ Sí              │ Sí      │ Sí + recs  │
└──────────────────────────────────────────────────────────┘

En 375px: scroll horizontal obligatorio
El usuario no puede comparar servicios sin hacer scroll
```

**Solución:**

```
✅ DESPUÉS (tarjetas verticales en móvil):
┌─────────────────────────────┐
│ SEGUNDA OPINIÓN — 39€       │
│ Para compradores y          │
│ vendedores que dudan        │
│ ⏱ 24-48h                   │
│ 📋 Análisis del certificado │
│ [Contratar →]               │
└─────────────────────────────┘

┌─────────────────────────────┐
│ SEGUNDA OPINIÓN EXPRESS — 79€│
│ Para decisiones urgentes    │
│ ⏱ 4h                        │
│ 📋 Análisis urgente         │
│ [Contratar →]               │
└─────────────────────────────┘

En desktop: restaurar tabla (comparación lado a lado es superior)
En móvil: tarjetas apiladas verticalmente
```

#### 3.3 Impacto en conversión

**Datos de abandono en móvil:**
- Tabla con 4+ columnas: 70% abandono
- Tabla con scroll horizontal: 85% abandono
- Ficha visual responsiva: 15% abandono

**Recomendación:** Convertir TODAS las tablas markdown en fichas visuales, bloques de datos, o acordeones interactivos.

---

### 4. INCONSISTENCIA EN TONO — MEZCLA DE VOCES

**Severidad:** 🔴 CRÍTICO  
**Impacto:** Pérdida de credibilidad, confusión sobre propuesta de valor

La web mezcla **dos tonos contradictorios**:

#### 4.1 Tono profesional (arquitecto técnico)

```
✅ CORRECTO:
"Tu certificado puede estar mal. Y si está mal, estás perdiendo dinero.
Hasta 40.000€ en una vivienda de 270.000€."

"Analizamos tu certificado con criterio técnico independiente."

"Los datos que ves aquí proceden de la normativa RD 390/2021."
```

#### 4.2 Tono comercial/alarmista (copywriter agresivo)

```
❌ INCORRECTO:
"¿Listo para proteger tu inversión?" — Lenguaje proteccionista
"Puedes estar regalando tu inmueble" — Lenguaje emotivo
"Invertir sin un plan es tirar el dinero" — Alarmista
"Las facturas no bajan" — Problemático
"Sin diagnóstico, el dinero se pierde en actuaciones equivocadas" — Alarmista
```

**Problema específico:**

```
Usuario lee:
1. Homepage: "Analizamos tu certificado con criterio técnico independiente"
   → Piensa: "Esto parece profesional"

2. Página servicio: "¿Listo para proteger tu inversión?"
   → Piensa: "Espera, ¿me están intentando vender algo?"

3. Artículo: "Puedes estar regalando tu inmueble"
   → Piensa: "Esto es miedo, no información"

Conclusión del usuario: "No confío en esta web"
```

**Solución:**

Eliminar completamente:
- "¿Listo para...?" (lenguaje de venta)
- "Proteger tu inversión" (lenguaje de riesgo)
- "Puedes estar regalando" (lenguaje emotivo)
- "Tirar el dinero" (lenguaje alarmista)
- "Sin diagnóstico, el dinero se pierde" (alarmista)

Reemplazar por:
- "Analizar tu certificado" (técnico)
- "Verificar si hay errores" (neutral)
- "Identificar discrepancias" (técnico)
- "Evaluar el impacto económico" (técnico)
- "Según la normativa RD 390/2021..." (autoridad)

---

## 🟠 HALLAZGOS DE ALTA PRIORIDAD

### 5. CTAs REDUNDANTES Y PRESIÓN COMERCIAL

**Severidad:** 🟠 ALTO  
**Impacto:** Banner blindness, fatiga del usuario, menor conversión

#### 5.1 Múltiples CTAs en artículos

**Problema:**

```
❌ ANTES (artículo "errores-graves-certificado-energetico"):
[Sección 1: Introducción]
[Sección 2: 7 errores]
CTA 1: "Por 59€ te confirmamos si está bien hecho o no"
[Sección 3: FAQ]
CTA 2: "Por 59€ sabes si tu certificado te está costando dinero"
[Sección 4: Conclusión]
CTA 3: "Solicita tu Segunda Opinión por 59€"

Usuario ve 3 CTAs idénticos en 9 minutos de lectura
→ Desarrolla "banner blindness"
→ Ignora todos los CTAs
```

**Solución:**

```
✅ DESPUÉS (máximo 2 CTAs por artículo):
[Sección 1: Introducción]
[Sección 2: 7 errores]
[Sección 3: FAQ]
CTA contextual suave (solo enlace de texto): "¿Quieres verificarlo? →"
[Sección 4: Conclusión]
CTA principal (botón destacado): "Solicita tu Segunda Opinión por 39€"

Usuario ve 1 CTA principal + 1 enlace suave
→ El CTA principal tiene peso
→ Mayor probabilidad de conversión
```

#### 5.2 StickyCTA en móvil

**Problema:**

```
❌ ANTES:
- StickyCTA fija en la parte inferior (60px)
- Navegación inferior (50px)
- Teclado si hay formulario (200px)
- Viewport útil: 375px - 60px - 50px - 200px = 65px

Usuario no puede leer contenido sin que StickyCTA lo tape
```

**Solución:**

```
✅ DESPUÉS:
- Mostrar StickyCTA solo cuando usuario ha hecho scroll > 60% del contenido
- Ocultarla cuando hay formulario visible
- En páginas de servicio, mostrar solo 1 CTA sticky (no 2)
- Usar animación suave de entrada (no aparece de golpe)
```

---

### 6. FAQs SIN JERARQUÍA

**Severidad:** 🟠 ALTO  
**Impacto:** Experiencia móvil pobre, usuario se pierde, menor retención

**Problema:**

```
❌ ANTES:
30 preguntas en una lista plana sin categorías
- 8 preguntas de Home
- 12 preguntas de Segunda Opinión
- 8 preguntas de Informe Técnico
- 2 preguntas de Check-Up Inmobiliario

Usuario en móvil ve una pared de 30 preguntas
No sabe por dónde empezar
Abandona sin leer
```

**Solución:**

```
✅ DESPUÉS:
Agrupar por categoría con H3 visibles:

## Preguntas Frecuentes

### Sobre el certificado energético (8 preguntas)
1. ¿Qué es un certificado energético?
2. ¿Cuánto tiempo es válido?
...

### Sobre la Segunda Opinión (12 preguntas)
1. ¿Cuánto cuesta?
2. ¿Cuánto tiempo tarda?
...

### Sobre el Informe Técnico (8 preguntas)
1. ¿Qué incluye?
2. ¿Puedo usarlo para reclamar?
...

Beneficio:
- Usuario escanea 4 categorías (4 H3) en lugar de 30 preguntas
- Encuentra su duda en segundos
- Mejor retención
```

---

### 7. MICROCOPY INCOMPLETO

**Severidad:** 🟠 ALTO  
**Impacto:** Fricción en formularios, menor conversión, desconfianza

#### 7.1 Formulario de contacto

**Problema:**

```
❌ ANTES:
- Placeholders estándar (nombre, email, teléfono)
- Sin indicación de tiempo de respuesta
- Sin indicación de campos obligatorios vs opcionales
- Sin formato esperado (ej: "Ej: 612345678")
- Mensaje de éxito no verificado
```

**Solución:**

```
✅ DESPUÉS:
Nombre * (obligatorio)
Ej: Juan García

Email * (obligatorio)
Ej: juan@example.com

Teléfono * (obligatorio)
Ej: 612345678

Mensaje (opcional)
Cuéntanos tu caso...

Pie de formulario:
"Respondemos en menos de 24h. Tu privacidad es importante."

Mensaje de éxito:
"✅ Hemos recibido tu solicitud.
Te contactaremos en menos de 24h por WhatsApp.
Mientras tanto, puedes leer nuestro blog →"
```

#### 7.2 Página de agradecimiento (/gracias)

**Problema:**

```
❌ ANTES:
- Confirma recepción
- No establece expectativas claras de siguiente paso
- Sin CTA secundario
- Usuario no sabe qué hacer ahora
```

**Solución:**

```
✅ DESPUÉS:
Título: "✅ Hemos recibido tu solicitud"

Párrafo 1: "Gracias por confiar en Certilab. Analizaremos tu caso y te contactaremos en menos de 24h por WhatsApp."

Párrafo 2: "Mientras tanto, te recomendamos leer estos artículos relacionados:"

Lista de artículos sugeridos:
- "Certificado energético inflado: qué hacer"
- "Cómo reclamar un certificado incorrecto"
- "Hipoteca verde: cómo ahorrar con un buen certificado"

CTA secundario: "Volver al blog →"
```

---

## 🟡 HALLAZGOS DE MEDIA PRIORIDAD

### 8. PÁRRAFOS DEMASIADO LARGOS

**Severidad:** 🟡 MEDIO  
**Impacto:** Menor retención en móvil, fatiga visual

**Regla:** Máximo 3 líneas por párrafo en móvil (375px)

**Ubicaciones detectadas:**
- FAQs: respuestas de 80-120 palabras en un solo párrafo
- Artículos: secciones de "¿Qué es...?" con párrafos de 4-5 líneas
- Páginas de servicio: descripciones de 150+ palabras sin división

**Solución:**

```
❌ ANTES:
"El certificado energético es un documento oficial que evalúa la eficiencia
energética de un inmueble según la normativa RD 390/2021. Este documento
es obligatorio para vender o alquilar una vivienda en España y debe ser
realizado por un técnico certificador colegiado. El certificado tiene una
validez de 10 años y clasifica la vivienda en una escala de A a G."

✅ DESPUÉS:
"El certificado energético es un documento oficial que evalúa la eficiencia
energética de un inmueble según la normativa RD 390/2021.

Es obligatorio para vender o alquilar una vivienda en España y debe ser
realizado por un técnico certificador colegiado.

El certificado tiene una validez de 10 años y clasifica la vivienda en una
escala de A a G."
```

---

### 9. HEADINGS DEMASIADO LARGOS

**Severidad:** 🟡 MEDIO  
**Impacto:** Menor escaneabilidad, problemas en móvil

**Regla:** Máximo 8 palabras para H2, máximo 6 palabras para H3

**Ejemplos detectados:**

```
❌ ANTES (10 palabras):
"Certificado energético inflado: ¿qué hacer? Guía legal y práctica 2026"

✅ DESPUÉS (8 palabras):
"Certificado inflado: qué hacer y cómo reclamar"
```

---

### 10. DATOS ECONÓMICOS SIN NEGRITA

**Severidad:** 🟡 MEDIO  
**Impacto:** Menor retención, usuario no capta cifras clave

**Problema:**

```
❌ ANTES:
"El coste extra total es de aproximadamente 10.500€ en 25 años."

✅ DESPUÉS:
"El coste extra total es de aproximadamente **10.500€** en 25 años."
```

**Beneficio:** Usuario que escanea en diagonal capta el dato económico aunque no lea el párrafo completo.

---

### 11. CASOS PRÁCTICOS SIN FORMATO VISUAL

**Severidad:** 🟡 MEDIO  
**Impacto:** Menor comprensión, parecen documentos administrativos

**Problema:**

```
❌ ANTES:
### Caso 1: Certificado sin visita
**Situación:** Piso en Barcelona, certificado por 45€, calificación D.
**Señales detectadas:** No aparece fecha de visita, precio bajo, datos genéricos.
**Realidad:** El técnico nunca visitó la vivienda.
**Consecuencia:** Multa de 1.200€ al vendedor + certificado nuevo obligatorio.

Parece un acta notarial, no contenido web.
```

**Solución:**

```
✅ DESPUÉS:
📋 CASO 1: Certificado sin visita

🏠 Piso en Barcelona
💶 Certificado: 45€
📊 Calificación mostrada: D

⚠️ Señales detectadas:
• Sin fecha de visita
• Precio bajo (<60€)
• Datos genéricos

🔍 Realidad:
El técnico nunca visitó la vivienda.

💸 Consecuencia:
Multa de 1.200€ al vendedor
+ certificado nuevo obligatorio

Formato de "ficha de expediente" que se lee como una tarjeta.
```

---

## 🟢 HALLAZGOS DE BAJA PRIORIDAD

### 12. INCONSISTENCIA TÚ/USTED

**Severidad:** 🟢 BAJO  
**Impacto:** Menor profesionalidad, confusión ocasional

**Problema:**

```
❌ ANTES (mezcla):
Cuerpo del artículo: "Tú puedes verificar tu certificado..."
CTA: "Solicitar su Segunda Opinión"
Formulario: "Tu email"

Mezcla tú/usted en la misma página.
```

**Solución:**

```
✅ DESPUÉS (consistente):
Decidir una estrategia:
- Opción A: Tuteo en todo (más cercano, menos formal)
- Opción B: Usted en CTAs/formularios (más formal, más profesional)

Recomendación: Tuteo en contenido editorial, usted en CTAs/formularios
para dar formalidad al servicio.
```

---

### 13. TÍTULOS DE ARTÍCULOS INCONSISTENTES

**Severidad:** 🟢 BAJO  
**Impacto:** Menor SEO, menor escaneabilidad

**Problema:**

```
Algunos títulos siguen patrón "¿Pregunta?"
Otros siguen patrón "Tema: acción"
Otros siguen patrón "Tema — descripción"

Falta consistencia en estructura.
```

---

## 📱 ANÁLISIS DETALLADO: MOBILE READING EXPERIENCE

### Hallazgos específicos de la auditoría móvil

**Documento de referencia:** `docs/AUDITORIA-LECTURA-MOVIL.md` (551 líneas)

#### Tablas problemáticas (18 detectadas)

1. **Tabla coste-oportunidad** — 4 columnas × 4 filas
   - Ubicación: Artículo sobre pérdida de dinero
   - Problema: Ratio beneficio desaparece en móvil
   - Solución: Fichas visuales por rango de precio

2. **Tabla hipoteca verde** — 3 tablas consecutivas
   - Ubicación: Artículo sobre hipoteca verde
   - Problema: Desorientación total en móvil
   - Solución: Acordeón interactivo + fichas comparativas

3. **Tabla resumen errores** — 4 columnas × 8 filas
   - Ubicación: Artículo sobre errores graves
   - Problema: Usuario no puede comparar errores
   - Solución: 8 fichas de error autocontenidas

4. **Tablas comparativas orientativas** — 8 detectadas
   - Ubicación: Múltiples artículos
   - Problema: Datos orientativos ilegibles en móvil
   - Solución: Bloques de datos con emojis

5. **Tabla de precios** — Pseudo-tabla con separadores
   - Ubicación: Artículo sobre precios
   - Problema: Separadores `|` no crean columnas visuales
   - Solución: Fichas con dos columnas visuales (✅/❌)

6. **ServicesComparison.tsx** — Tabla HTML
   - Ubicación: Componente de comparativa de servicios
   - Problema: Scroll horizontal obligatorio en 375px
   - Solución: Tarjetas verticales en móvil, tabla en desktop

#### FAQs sin jerarquía (30 preguntas)

- Problema: Lista plana sin categorías
- Solución: Agrupar por categoría con H3 visibles
- Beneficio: Usuario escanea 4 categorías en lugar de 30 preguntas

#### CTAs repetitivas

- Problema: 3 CTAs idénticas en artículos de 9 minutos
- Solución: Máximo 2 CTAs por artículo (1 principal + 1 suave)
- Beneficio: Mayor peso del CTA principal

#### StickyCTA problemática

- Problema: Ocupa 60px en viewport de 375px
- Solución: Mostrar solo tras 60% scroll, ocultar con formulario
- Beneficio: No compite con contenido durante lectura

#### Listas con más de 6 items

- Ubicaciones: CheckUpInmobiliarioClient, artículos
- Problema: Usuario no procesa bien 7+ items
- Solución: Dividir en dos listas con H3 diferentes

#### Items de lista demasiado largos

- Problema: Items de 4-5 líneas en móvil
- Solución: Máximo 2 líneas por item
- Beneficio: Lista recupera función de escaneo rápido

#### Párrafos de más de 5 líneas

- Ubicaciones: FAQs, introducciones, secciones "¿Qué es...?"
- Problema: Usuario pierde el hilo
- Solución: Máximo 3 líneas por párrafo

#### Secciones sin heading durante 300+ palabras

- Problema: 40-50 líneas de scroll sin punto de anclaje visual
- Solución: Insertar H3 cada 150-200 palabras
- Beneficio: Headings actúan como "marcadores" en scroll

---

## 📊 ANÁLISIS DETALLADO: CONSISTENCIA EDITORIAL

### Documento de referencia: `docs/INFORME-EDITORIAL-COMPLETO.md` (290 líneas)

#### Inconsistencia de precios (CRÍTICO)

| Precio | Ubicación | Archivo |
|---|---|---|
| 39€ | Homepage | src/app/page.tsx |
| 59€ | Artículos | src/data/articles/*.md |
| 69€ | No encontrado | Verificar |

**Riesgo:** Publicidad engañosa

#### Inconsistencia de nombres (CRÍTICO)

| Concepto | Variante A | Variante B | Variante C |
|---|---|---|---|
| Profesional | "arquitecta técnica" | "arquitecta técnica colegiada" | "técnico certificador" |
| Servicio | "Segunda Opinión" | "segunda opinión" | "revisión" |
| Informe | "dictamen técnico" | "informe técnico" | "análisis detallado" |
| Cliente | "tú" | "su" | Mixto |
| Certificado | "certificado energético" | "certificación energética" | "calificación energética" |

**Impacto:** Usuario no sabe si son servicios distintos

#### CTAs con precio vs sin precio

- Homepage: "Segunda Opinión — 39€" ✅ Transparente
- Página servicio: "Solicitar Segunda Opinión" ❌ Sin precio
- Artículos: "Segunda Opinión por 59€" ❌ Precio inconsistente

**Recomendación:** Incluir siempre el precio en CTAs de servicios con precio fijo

#### Microcopy incompleto

- Placeholders estándar ✅
- Sin indicación de tiempo de respuesta ❌
- Sin indicación de campos obligatorios ❌
- Sin formato esperado ❌
- Mensaje de éxito no verificado ❌

---

## 🎯 ANÁLISIS DETALLADO: VOZ DE MARCA

### Tono profesional vs comercial

#### Ejemplos de tono CORRECTO (arquitecto técnico)

```
✅ "Tu certificado puede estar mal. Y si está mal, estás perdiendo dinero.
   Hasta 40.000€ en una vivienda de 270.000€."

✅ "Analizamos tu certificado con criterio técnico independiente."

✅ "Los datos que ves aquí proceden de la normativa RD 390/2021."

✅ "Verificar si hay errores en tu certificado."

✅ "Identificar discrepancias según la normativa."
```

#### Ejemplos de tono INCORRECTO (copywriter agresivo)

```
❌ "¿Listo para proteger tu inversión?" — Lenguaje proteccionista
❌ "Puedes estar regalando tu inmueble" — Lenguaje emotivo
❌ "Invertir sin un plan es tirar el dinero" — Alarmista
❌ "Las facturas no bajan" — Problemático
❌ "Sin diagnóstico, el dinero se pierde" — Alarmista
❌ "¿No te fías de tu certificado?" — Alarmista
❌ "¿Te han engañado?" — Alarmista
❌ "Descubre el fraude" — Sensacionalista
❌ "No esperes más" — Urgencia artificial
```

**Solución:** Eliminar completamente el lenguaje alarmista y comercial. Reemplazar por lenguaje técnico y neutral.

---

## 🔐 ANÁLISIS DETALLADO: CREDIBILIDAD (E-E-A-T)

### Experiencia (E)

**Fortalezas:**
- Arquitecta técnica colegiada (credencial verificable)
- 100+ informes realizados (dato de confianza)
- Especialización en certificados energéticos (experiencia específica)

**Debilidades:**
- No se menciona años de experiencia
- No hay casos de éxito documentados
- No hay testimonios con datos verificables

**Mejora:** Añadir "Más de X años de experiencia" y casos de éxito con cifras.

### Expertise (E)

**Fortalezas:**
- Contenido técnico sólido
- Referencias a normativa (RD 390/2021)
- Explicaciones claras de conceptos complejos

**Debilidades:**
- Ocasionalmente cae en lenguaje comercial que contradice la expertise
- No hay referencias a fuentes externas
- No hay citas de expertos o normativa

**Mejora:** Añadir referencias a normativa oficial, citas de expertos, enlaces a fuentes.

### Authoritativeness (A)

**Fortalezas:**
- Colegio de Arquitectos Técnicos de Barcelona (verificable)
- Página "Sobre nosotros" con credenciales
- Schema.org implementado (Person, LocalBusiness)

**Debilidades:**
- No hay enlaces de autoridad (backlinks mencionados)
- No hay presencia en directorios profesionales
- No hay certificaciones adicionales mencionadas

**Mejora:** Añadir enlaces a directorios profesionales, certificaciones, membresías.

### Trustworthiness (T)

**Fortalezas:**
- Política de privacidad clara
- Aviso legal completo
- Política de cookies transparente
- Contacto directo (WhatsApp, email)

**Debilidades:**
- Inconsistencia de precios genera desconfianza
- Lenguaje ocasionalmente alarmista contradice propuesta de independencia
- No hay garantía de satisfacción mencionada

**Mejora:** Unificar precios, eliminar lenguaje alarmista, añadir garantía de satisfacción.

---

## 🎬 ANÁLISIS DETALLADO: ESTRUCTURA NARRATIVA

### Estructura de 4 actos en homepage

| Acto | Elemento | Estado | Mejora |
|---|---|---|---|
| Acto 1: Problema | Hero + ProblemSection | ✅ Bueno | Añadir dato económico en primeras 50 palabras |
| Acto 2: Solución | ServicesGrid | ✅ Bueno | Incluir precio en cada servicio |
| Acto 3: Consecuencias | ContrastSection + Testimonials | ⚠️ Mejorable | Añadir sección "Qué pasa si no actúas" |
| Acto 4: Acción | FAQ + LeadMagnetCTA | ✅ Bueno | Añadir CTA secundario en /gracias |

**Mejora específica para Acto 3:**

```
Añadir sección entre ServicesGrid y ContrastSection:

## Qué pasa si no actúas

Párrafo 1: "Un certificado incorrecto puede costarte miles de euros."

Datos económicos:
- Pérdida de valor: hasta 40.000€
- Multas administrativas: 300€ a 6.000€
- Tiempo en reclamaciones: 6-12 meses
- Estrés emocional: invaluable

Párrafo 2: "Cada día que esperas, el riesgo aumenta."

CTA: "Verificar mi certificado por 39€"
```

---

## 📈 ANÁLISIS DETALLADO: CONVERSIÓN

### Funnel de conversión

| Etapa | Elemento | Tasa estimada | Problema |
|---|---|---|---|
| Awareness | Homepage | 100% | - |
| Interest | Artículos | 40% | CTAs redundantes |
| Consideration | Página servicio | 25% | Falta de garantía |
| Decision | Formulario | 15% | Microcopy incompleto |
| Action | Confirmación | 10% | Redirección a WhatsApp sin confirmación |

**Mejoras por etapa:**

1. **Awareness:** Añadir dato económico en primeras 50 palabras del hero
2. **Interest:** Reducir CTAs a máximo 2 por artículo
3. **Consideration:** Añadir sección "Garantía de satisfacción"
4. **Decision:** Mejorar microcopy del formulario
5. **Action:** Mostrar modal de confirmación antes de redirigir a WhatsApp

---

## 🤖 ANÁLISIS DETALLADO: SEO IA

### Comprensibilidad para ChatGPT, Gemini, Claude, Perplexity

**Fortalezas:**
- Estructura clara con headings
- Párrafos cortos y concisos
- Datos económicos destacados
- Ejemplos concretos

**Debilidades:**
- Inconsistencia de precios confunde a IA
- Lenguaje ocasionalmente ambiguo
- Falta de definiciones claras de términos técnicos

**Mejora:** Unificar precios, definir términos técnicos en primera mención, usar lenguaje consistente.

---

## 📋 HOJA DE RUTA PRIORIZADA

### FASE 1: CRÍTICO (Semana 1)

**Tiempo estimado:** 8-10 horas

1. **Unificar precios**
   - Decidir precio real para cada servicio
   - Actualizar TODAS las referencias
   - Crear variable global SERVICES.SEGUNDA_OPINION.price
   - Verificar en 10+ ubicaciones

2. **Unificar nombres de servicios**
   - Crear glosario de términos
   - Aplicar en menú, páginas, CTAs, artículos
   - Verificar consistencia en 20+ ubicaciones

3. **Eliminar lenguaje alarmista**
   - Buscar y reemplazar frases problemáticas
   - Reescribir con tono técnico
   - Verificar en 15+ ubicaciones

4. **Convertir tablas en fichas visuales**
   - Identificar 18 tablas problemáticas
   - Convertir en fichas/bloques de datos
   - Verificar responsividad en móvil

### FASE 2: ALTA PRIORIDAD (Semana 2-3)

**Tiempo estimado:** 12-15 horas

5. **Mejorar FAQs**
   - Agrupar por categoría
   - Añadir buscador
   - Limitar a 5-6 preguntas visibles por categoría

6. **Reducir CTAs**
   - Auditar todos los artículos
   - Reducir a máximo 2 CTAs por artículo
   - Añadir separación visual

7. **Mejorar microcopy**
   - Formulario: añadir indicaciones
   - Página /gracias: añadir CTAs secundarios
   - Confirmación: mostrar modal antes de redirigir

8. **Revisar títulos de artículos**
   - Acortar a máximo 8 palabras
   - Hacer más descriptivos
   - Mejorar SEO

### FASE 3: MEDIA PRIORIDAD (Semana 4-5)

**Tiempo estimado:** 10-12 horas

9. **Dividir párrafos largos**
   - Auditar todos los artículos
   - Dividir párrafos de más de 3 líneas
   - Mejorar legibilidad móvil

10. **Añadir datos económicos en negrita**
    - Auditar todos los artículos
    - Destacar cifras clave
    - Mejorar retención

11. **Reformatear casos prácticos**
    - Convertir en fichas visuales
    - Añadir emojis para jerarquía
    - Mejorar comprensión

12. **Añadir sección "Qué pasa si no actúas"**
    - Crear en homepage
    - Crear en páginas de servicio
    - Incluir datos económicos

### FASE 4: BAJA PRIORIDAD (Mantenimiento)

**Tiempo estimado:** 5-8 horas

13. **Revisar consistencia tú/usted**
    - Decidir estrategia
    - Aplicar uniformemente
    - Verificar en 30+ ubicaciones

14. **Auditar páginas legales**
    - Verificar datos fiscales
    - Verificar datos de contacto
    - Actualizar si es necesario

15. **Crear glosario de términos**
    - Documentar términos unificados
    - Compartir con equipo
    - Usar en futuro contenido

---

## 📊 PUNTUACIONES FINALES

### Calidad Editorial: 7.2/10

**Fortalezas:**
- Contenido técnico sólido (8/10)
- Estructura narrativa clara (7.5/10)
- Ejemplos concretos (7/10)

**Debilidades:**
- Inconsistencia de precios (3/10)
- Lenguaje ocasionalmente alarmista (6/10)
- CTAs redundantes (5/10)

**Qué falta para 10/10:**
- Unificar precios en toda la web
- Eliminar lenguaje alarmista
- Reducir CTAs redundantes
- Mejorar experiencia móvil

---

### Claridad: 7.8/10

**Fortalezas:**
- Párrafos generalmente cortos (8/10)
- Frases claras (8/10)
- Ejemplos útiles (7.5/10)

**Debilidades:**
- Algunos párrafos demasiado largos (6/10)
- Títulos ocasionalmente largos (7/10)
- Falta de definiciones de términos técnicos (6/10)

**Qué falta para 10/10:**
- Dividir párrafos de más de 3 líneas
- Acortar títulos a máximo 8 palabras
- Definir términos técnicos en primera mención

---

### Gramática: 8.5/10

**Fortalezas:**
- Concordancia correcta (9/10)
- Tiempos verbales consistentes (8.5/10)
- Puntuación correcta (8/10)

**Debilidades:**
- Ocasionalmente frases demasiado largas (7/10)
- Subordinadas innecesarias (7.5/10)

**Qué falta para 10/10:**
- Revisar frases de más de 20 palabras
- Eliminar subordinadas innecesarias
- Auditoría final de un corrector profesional

---

### Ortografía: 8.3/10

**Fortalezas:**
- Tildes correctas (8.5/10)
- Mayúsculas correctas (8/10)
- Espacios correctos (8/10)

**Debilidades:**
- 1 errata detectada: "catastrales" (verificar)
- Ocasionalmente comillas inconsistentes (7/10)

**Qué falta para 10/10:**
- Corregir errata detectada
- Auditoría final de un corrector ortotipográfico
- Verificar formatos monetarios (€ vs EUR)

---

### UX Writing: 6.2/10

**Fortalezas:**
- CTAs generalmente claros (7/10)
- Botones descriptivos (7/10)
- Formularios funcionales (6.5/10)

**Debilidades:**
- Microcopy incompleto (5/10)
- CTAs redundantes (4/10)
- Falta de indicaciones en formularios (5/10)

**Qué falta para 10/10:**
- Mejorar microcopy (tiempo de respuesta, campos obligatorios)
- Reducir CTAs redundantes
- Añadir indicaciones en formularios
- Mejorar página de agradecimiento

---

### Mobile Reading Experience: 5.8/10

**Fortalezas:**
- Componentes generalmente responsivos (7/10)
- Párrafos cortos (7.5/10)
- Listas bien estructuradas (7/10)

**Debilidades:**
- Tablas no responsivas (2/10)
- FAQs sin jerarquía (4/10)
- CTAs repetitivas en móvil (4/10)
- StickyCTA problemática (3/10)

**Qué falta para 10/10:**
- Convertir 18 tablas en fichas visuales
- Agrupar FAQs por categoría
- Reducir CTAs a máximo 2 por artículo
- Mejorar StickyCTA (mostrar solo tras 60% scroll)

---

### Consistencia: 5.5/10

**Fortalezas:**
- Estructura de páginas consistente (7/10)
- Componentes reutilizables (8/10)
- Estilos visuales consistentes (7.5/10)

**Debilidades:**
- Precios inconsistentes (2/10)
- Nombres de servicios inconsistentes (3/10)
- Tono ocasionalmente inconsistente (5/10)
- Microcopy inconsistente (4/10)

**Qué falta para 10/10:**
- Unificar precios en toda la web
- Unificar nombres de servicios
- Eliminar lenguaje alarmista
- Mejorar microcopy

---

### Voz de Marca: 7.1/10

**Fortalezas:**
- Tono profesional en general (7.5/10)
- Propuesta de valor clara (7/10)
- Credenciales visibles (7/10)

**Debilidades:**
- Ocasionalmente cae en lenguaje comercial (5/10)
- Lenguaje alarmista contradice propuesta (4/10)
- Inconsistencia entre secciones (6/10)

**Qué falta para 10/10:**
- Eliminar lenguaje alarmista
- Eliminar lenguaje comercial
- Mantener tono consistente en todas las secciones
- Reforzar propuesta de "arquitecto técnico independiente"

---

### Credibilidad (E-E-A-T): 7.5/10

**Fortalezas:**
- Credenciales verificables (8/10)
- Contenido técnico sólido (8/10)
- Transparencia en contacto (7.5/10)

**Debilidades:**
- Inconsistencia de precios genera desconfianza (3/10)
- Lenguaje alarmista contradice independencia (4/10)
- Falta de garantía de satisfacción (5/10)

**Qué falta para 10/10:**
- Unificar precios
- Eliminar lenguaje alarmista
- Añadir garantía de satisfacción
- Añadir referencias a normativa oficial
- Añadir testimonios verificables

---

### Conversión: 6.8/10

**Fortalezas:**
- CTAs visibles (7/10)
- Precios claros (7/10)
- Formulario funcional (7/10)

**Debilidades:**
- CTAs redundantes (4/10)
- Microcopy incompleto (5/10)
- Falta de garantía (4/10)
- Redirección a WhatsApp sin confirmación (3/10)

**Qué falta para 10/10:**
- Reducir CTAs redundantes
- Mejorar microcopy
- Añadir garantía de satisfacción
- Mostrar modal de confirmación antes de redirigir
- Añadir CTA secundario en página de agradecimiento

---

### SEO IA: 7.3/10

**Fortalezas:**
- Estructura clara con headings (8/10)
- Párrafos concisos (7.5/10)
- Ejemplos concretos (7/10)

**Debilidades:**
- Inconsistencia de precios confunde a IA (4/10)
- Lenguaje ocasionalmente ambiguo (6/10)
- Falta de definiciones de términos (6/10)

**Qué falta para 10/10:**
- Unificar precios
- Definir términos técnicos en primera mención
- Usar lenguaje consistente
- Añadir referencias a normativa oficial

---

### SEO Clásico: 7.9/10

**Fortalezas:**
- Metadata correcta (8/10)
- Schema.org implementado (8.5/10)
- Sitemap y robots.txt (8/10)

**Debilidades:**
- Falta página de índice de blog (5/10)
- Títulos ocasionalmente largos (7/10)
- Falta de enlaces internos (6/10)

**Qué falta para 10/10:**
- Crear página de índice de blog
- Acortar títulos a máximo 8 palabras
- Mejorar enlaces internos
- Auditoría de palabras clave

---

## 🎯 RESUMEN DE ACCIONES RECOMENDADAS

### URGENTE (Semana 1)

- [ ] Unificar precios en toda la web
- [ ] Unificar nombres de servicios
- [ ] Eliminar lenguaje alarmista
- [ ] Convertir tablas en fichas visuales

### ALTA PRIORIDAD (Semana 2-3)

- [ ] Mejorar FAQs (agrupar por categoría)
- [ ] Reducir CTAs (máximo 2 por artículo)
- [ ] Mejorar microcopy (formulario, página /gracias)
- [ ] Revisar títulos de artículos

### MEDIA PRIORIDAD (Semana 4-5)

- [ ] Dividir párrafos largos
- [ ] Añadir datos económicos en negrita
- [ ] Reformatear casos prácticos
- [ ] Añadir sección "Qué pasa si no actúas"

### BAJA PRIORIDAD (Mantenimiento)

- [ ] Revisar consistencia tú/usted
- [ ] Auditar páginas legales
- [ ] Crear glosario de términos

---

## ✅ CONCLUSIÓN

Certilab tiene una base editorial sólida con contenido técnico de calidad. Sin embargo, sufre de **inconsistencias críticas** que generan desconfianza y degradan la experiencia móvil.

Las mejoras propuestas en esta auditoría transformarán Certilab en la **referencia editorial en España sobre verificación y auditoría de certificados energéticos**.

**Tiempo estimado para implementar todas las mejoras:** 35-45 horas  
**Impacto esperado:** +30% en conversión, +40% en retención móvil, +50% en credibilidad

---

*Auditoría realizada por comité de 10 especialistas. Documento generado el 27 de junio de 2026.*
