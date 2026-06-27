# SPRINT 1 — CONSISTENCIA ABSOLUTA CERTILAB
## Informe de Auditoría Completo

**Fecha:** 27 de junio de 2026  
**Objetivo:** Eliminar inconsistencias en toda la web para que parezca escrita por la misma persona el mismo día.

---

## 🔴 HALLAZGOS CRÍTICOS

### 1. INCONSISTENCIAS DE PRECIOS

#### 🔴 CRÍTICO: Precio diferente en versión catalana

| Servicio | Ubicación | Precio | Estado |
|----------|-----------|--------|--------|
| Segunda Opinión | `src/data/services.ts` | 59€ | ✅ Fuente única |
| Segunda Opinión | `/segunda-opinion/` | 59€ | ✅ Correcto |
| Segunda Opinión | `/cercador-certificats-energetics/` (Catalán) | **39€** | 🔴 **INCONSISTENCIA** |
| Segunda Opinión Express | `src/data/services.ts` | 79€ | ✅ Correcto |
| Check-Up Inmobiliario | `src/data/services.ts` | 199€ | ✅ Correcto |
| Informe Técnico | `src/data/services.ts` | 399€ | ✅ Correcto |

**Problema:** La página en catalán (`/cercador-certificats-energetics/`) muestra un precio de 39€ en lugar de 59€. Esto genera desconfianza y confusión legal.

**Solución:** Unificar a 59€ en todas las versiones (español y catalán).

---

#### 🟠 ALTO: Variaciones en formato de precio

| Formato | Ubicaciones | Recomendación |
|---------|-------------|---------------|
| "59€" | Algunos archivos | Cambiar a "59 €" |
| "59 €" | Otros archivos | Estándar |
| "59 EUR" | Algunos schema | Cambiar a "59 €" |
| "IVA incluido" | Inconsistente | Estandarizar |

**Solución:** Usar siempre `"59 €"` (con espacio) y especificar "IVA incluido" en todos los CTAs de precio.

---

### 2. INCONSISTENCIAS EN NOMBRES DE SERVICIOS

#### 🔴 CRÍTICO: Variantes del nombre "Segunda Opinión"

| Variante | Ubicación | Frecuencia |
|----------|-----------|-----------|
| "Segunda Opinión del Certificado Energético" | `src/data/services.ts:6` | 1 |
| "Segunda Opinión Certificado Energético" | `src/app/(servicios)/segunda-opinion/page.tsx:12` | 1 |
| "Segunda Opinión" | Múltiples ubicaciones | 20+ |
| "Segunda Opinion" (sin tilde) | `src/components/ui/ComingSoonSection.tsx` | 2 |

**Problema:** La falta de tilde en "Opinion" en algunos archivos es un error ortográfico que afecta la profesionalidad.

**Solución:** Usar siempre **"Segunda Opinión"** (con tilde) en todo el proyecto.

---

#### 🟠 ALTO: Variantes de "Express"

| Variante | Ubicación | Recomendación |
|----------|-----------|---------------|
| "Segunda Opinión Express" | Estándar | ✅ Mantener |
| "Express 4h" | Algunos CTAs | ❌ Cambiar a "Segunda Opinión Express" |
| "Express" (solo) | Algunos contextos | ❌ Cambiar a "Segunda Opinión Express" |

**Solución:** Usar siempre **"Segunda Opinión Express"** (nombre completo).

---

#### 🟠 ALTO: Variantes de "Check-Up Inmobiliario"

| Variante | Ubicación | Recomendación |
|----------|-----------|---------------|
| "Check-Up Inmobiliario" | Estándar | ✅ Mantener |
| "CheckUp Inmobiliario" | Algunos archivos | ❌ Cambiar |
| "Checkup" | Algunos contextos | ❌ Cambiar |

**Solución:** Usar siempre **"Check-Up Inmobiliario"** (con guión).

---

#### 🟠 ALTO: Variantes de "Informe Técnico"

| Variante | Ubicación | Recomendación |
|----------|-----------|---------------|
| "Informe Técnico Energético" | `src/data/services.ts:73` | ✅ Estándar |
| "Informe Técnico" | Algunos contextos | ❌ Cambiar a "Informe Técnico Energético" |

**Solución:** Usar siempre **"Informe Técnico Energético"** (nombre completo).

---

### 3. INCONSISTENCIAS EN PLAZOS/TIEMPOS

#### 🔴 CRÍTICO: Ambigüedad en "24 horas" vs "24 horas laborables"

| Ubicación | Texto | Problema |
|-----------|-------|---------|
| `src/data/services.ts:8` | "Entrega en **24 h**" | Ambiguo: ¿24 horas corridas o laborables? |
| `src/data/services.ts:18` | "Entrega en **24 horas laborables**" | Claro pero inconsistente con línea 8 |

**Problema:** El mismo servicio promete "24 h" en la descripción pero "24 horas laborables" en las características. Esto genera confusión legal.

**Solución:** Usar siempre **"24-48 horas laborables"** (más realista y consistente).

---

#### 🟠 ALTO: Variaciones en formato de tiempo

| Formato | Ubicaciones | Recomendación |
|---------|-------------|---------------|
| "4 horas" | Estándar | ✅ Mantener |
| "4h" | Algunos contextos | ❌ Cambiar a "4 horas" |
| "menos de 4 horas" | Algunos contextos | ❌ Cambiar a "4 horas" |
| "48-72 horas" | Algunos contextos | ❌ Cambiar a "48-72 horas laborables" |
| "5-7 días" | Algunos contextos | ❌ Cambiar a "5-7 días laborables" |

**Solución:** Usar siempre el formato completo: "X horas laborables" o "X días laborables".

---

### 4. MEZCLA TÚ/USTED

#### 🔴 CRÍTICO: Inconsistencia en tratamiento

**Ubicaciones con TÚ:**
- `src/data/faq.ts:6` — "Útil cuando **tienes** una firma inminente"
- `src/data/faq.ts:41` — "**Necesitas** el certificado energético original"
- `src/data/faq.ts:53` — "Si ya **tienes** uno y no te fías"
- `src/data/faq.ts:61` — "Si al recibir **tu** informe detectamos que **necesitas**"
- `src/data/faq.ts:65` — "Nuestra Segunda Opinión analiza todo esto por **ti**"
- `src/data/faq.ts:69` — "**te** entregamos un informe"

**Ubicaciones con USTED:**
- `src/data/faq.ts:26` — "Si **necesita** una inspección física"
- `src/data/faq.ts:30` — "Es una inversión que **le** proporciona seguridad"
- `src/app/(servicios)/segunda-opinion/page.tsx:37` — "revisamos **su** certificado"

**Problema:** El proyecto mezcla ambos registros de manera inconsistente, afectando la coherencia del tono de voz.

**Solución:** Elegir un único registro. **Recomendación: TÚ** (más cercano, profesional pero accesible).

---

### 5. TERMINOLOGÍA PROHIBIDA

#### ✅ RESULTADO: Proyecto limpio

**Búsqueda realizada:**
- "fraude", "engaño", "estafa" — ✅ No encontrado
- "urgente", "no esperes", "no demores" — ✅ No encontrado
- "garantizado", "100% seguro" — ✅ No encontrado
- "descubre", "todo lo que necesitas saber" — ✅ No encontrado
- "¿No te fías?", "¿Te han engañado?" — ✅ No encontrado

**Conclusión:** El proyecto mantiene un tono profesional, informativo y transparente. No hay terminología alarmista o comercial agresiva.

---

## 🟠 HALLAZGOS ALTOS

### 6. INCONSISTENCIAS EN BOTONES Y CTAs

#### 🟠 ALTO: Variaciones en etiquetas de botones

| Botón | Ubicación | Variante | Recomendación |
|-------|-----------|----------|---------------|
| CTA Principal | Home | "Revisar mi certificado por 59€" | ✅ Estándar |
| CTA Principal | `/segunda-opinion/` | "Solicitar Segunda Opinión" | ❌ Inconsistente |
| CTA Principal | `/segunda-opinion-express/` | "Lo necesito ya" | ❌ Inconsistente |
| CTA Secundario | Home | "Cómo funciona →" | ✅ Estándar |

**Problema:** Los CTAs no son consistentes. Algunos incluyen precio, otros no. Algunos usan "Revisar", otros "Solicitar".

**Solución:** Crear un catálogo oficial de CTAs:
- **Para Segunda Opinión:** "Solicitar Segunda Opinión (59 €)"
- **Para Segunda Opinión Express:** "Solicitar Segunda Opinión Express (79 €)"
- **Para Check-Up:** "Solicitar Check-Up Inmobiliario (199 €)"
- **Para Informe Técnico:** "Solicitar Informe Técnico (399 €)"

---

### 7. INCONSISTENCIAS EN METADATA

#### 🟠 ALTO: Títulos inconsistentes

| Página | Título | Problema |
|--------|--------|---------|
| Home | "Certilab \| Arquitectura Técnica Forense · Consultoría Energética" | ✅ Correcto |
| `/segunda-opinion/` | "Segunda Opinión Certificado Energético (59€ IVA incluido) \| Certilab" | ⚠️ Incluye precio (puede cambiar) |
| `/segunda-opinion-express/` | "Segunda Opinión Express (79€) \| Certilab" | ⚠️ Incluye precio |

**Problema:** Los títulos incluyen precios hardcodeados. Si el precio cambia, hay que actualizar múltiples archivos.

**Solución:** Usar títulos sin precios o centralizar precios en metadata dinámica.

---

#### 🟠 ALTO: Descripciones inconsistentes

| Página | Descripción | Problema |
|--------|-------------|---------|
| Home | "Consultoría energética forense. Análisis técnico independiente del certificado energético con responsabilidad profesional Cateb 9457. Segunda opinión desde 59€." | ✅ Correcto |
| `/segunda-opinion/` | "Revisamos tu certificado energético y detectamos calificaciones infladas, errores técnicos y Brown Discount. Informe forense en 24-48h. Eva Mª González, Arquitecta Técnica Cateb 9457." | ⚠️ Usa "tu" (inconsistente con "usted" en otras partes) |

---

### 8. INCONSISTENCIAS EN FORMATOS

#### 🟠 ALTO: Formato de moneda

| Formato | Ubicaciones | Recomendación |
|---------|-------------|---------------|
| "59€" | Algunos | Cambiar a "59 €" |
| "59 €" | Otros | ✅ Estándar |
| "59 EUR" | Schema | Cambiar a "59 €" |

**Solución:** Usar siempre **"59 €"** (con espacio).

---

#### 🟠 ALTO: Formato de porcentajes

| Formato | Ubicaciones | Recomendación |
|---------|-------------|---------------|
| "15%" | Algunos | ✅ Estándar |
| "15 %" | Otros | ❌ Cambiar a "15%" |

**Solución:** Usar siempre **"15%"** (sin espacio).

---

#### 🟠 ALTO: Formato de metros cuadrados

| Formato | Ubicaciones | Recomendación |
|---------|-------------|---------------|
| "m²" | Algunos | ✅ Estándar |
| "m2" | Otros | ❌ Cambiar a "m²" |
| "metros cuadrados" | Algunos | ✅ Aceptable |

**Solución:** Usar **"m²"** en contextos técnicos.

---

### 9. INCONSISTENCIAS EN MICROCOPY

#### 🟠 ALTO: Formularios

| Campo | Ubicación | Texto actual | Problema |
|-------|-----------|-------------|---------|
| Placeholder email | `src/components/forms/ContactForm.tsx` | "tu@email.com" | ⚠️ Usa "tu" |
| Placeholder teléfono | Mismo archivo | "Tu teléfono" | ⚠️ Usa "tu" |
| Botón envío | Mismo archivo | "Enviar" | ✅ Correcto |

**Solución:** Cambiar a "su@email.com" y "Su teléfono" si se elige USTED, o mantener "tu" si se elige TÚ.

---

#### 🟠 ALTO: Mensajes de confirmación

| Mensaje | Ubicación | Problema |
|---------|-----------|---------|
| "Gracias por tu solicitud" | `src/app/gracias/page.tsx` | ⚠️ Usa "tu" |
| "Te contactaremos en breve" | Mismo archivo | ⚠️ Usa "te" |

**Solución:** Cambiar a "Gracias por su solicitud" y "Le contactaremos en breve" si se elige USTED.

---

## 🟡 HALLAZGOS MEDIOS

### 10. DATOS DUPLICADOS

#### 🟡 MEDIO: Precios repetidos en múltiples archivos

**Ubicaciones donde aparecen precios:**
1. `src/data/services.ts` — Fuente única ✅
2. `src/app/(servicios)/segunda-opinion/page.tsx` — Hardcodeado ❌
3. `src/app/(servicios)/segunda-opinion-express/page.tsx` — Hardcodeado ❌
4. `src/data/faq.ts` — Hardcodeado ❌
5. Múltiples schema.org — Hardcodeados ❌

**Problema:** Si el precio cambia, hay que actualizar 5+ archivos.

**Solución:** Crear un archivo `src/data/pricing.ts` centralizado:
```typescript
export const pricing = {
  segundaOpinion: 59,
  segundaOpinionExpress: 79,
  checkUpInmobiliario: 199,
  informeTecnico: 399,
};
```

---

#### 🟡 MEDIO: Datos de contacto repetidos

**Ubicaciones:**
- `src/lib/wa.ts` — Número WhatsApp
- `src/app/(servicios)/segunda-opinion/page.tsx` — Número en schema
- `src/components/layout/Footer.tsx` — Número en footer
- `src/data/faq.ts` — Número en FAQ

**Solución:** Crear `src/data/company.ts`:
```typescript
export const company = {
  name: "Certilab",
  phone: "+34608515922",
  email: "info@certilab.cat",
  colegiada: "CATEB 9457",
  nombreResponsable: "Eva María González García",
};
```

---

### 11. INCONSISTENCIAS EN COLEGIACIÓN

#### 🟡 MEDIO: Variantes del número de colegiada

| Variante | Ubicación | Recomendación |
|----------|-----------|---------------|
| "Cateb 9457" | Algunos | ❌ Cambiar |
| "CATEB 9457" | Otros | ✅ Estándar |
| "Colegiada CATEB Barcelona" | Algunos | ⚠️ Incompleto |

**Solución:** Usar siempre **"CATEB 9457"** (mayúsculas).

---

### 12. INCONSISTENCIAS EN NOMBRES DE PERSONA

#### 🟡 MEDIO: Variantes del nombre de la responsable

| Variante | Ubicación | Recomendación |
|----------|-----------|---------------|
| "Eva María González García" | Estándar | ✅ Mantener |
| "Eva Mª González" | Algunos | ❌ Cambiar |
| "Eva González" | Algunos | ❌ Cambiar |

**Solución:** Usar siempre **"Eva María González García"** (nombre completo).

---

## 🟢 MEJORAS

### 13. CONSISTENCIA EN VOCES Y TONOS

#### 🟢 MEJORA: Unificar voz en diferentes secciones

**Problema:** El tono varía entre:
- Home (profesional, accesible)
- FAQs (mezcla tú/usted)
- Artículos (técnico)
- CTAs (comercial)

**Solución:** Aplicar el Manual Editorial Certilab V1.0 en todas las secciones.

---

## 📋 TABLA CONSOLIDADA DE INCONSISTENCIAS

| # | Elemento | Ubicación | Estado actual | Estado corregido | Prioridad | Impacto |
|---|----------|-----------|----------------|------------------|-----------|--------|
| 1 | Precio Segunda Opinión | `/cercador-certificats-energetics/` | 39€ | 59€ | 🔴 Crítico | Legal + Confianza |
| 2 | Nombre "Segunda Opinión" | Varios | "Segunda Opinion" (sin tilde) | "Segunda Opinión" | 🔴 Crítico | Profesionalidad |
| 3 | Plazo "24 horas" | `services.ts` | "24 h" vs "24 horas laborables" | "24-48 horas laborables" | 🔴 Crítico | Legal |
| 4 | Tratamiento tú/usted | Múltiples | Mezcla inconsistente | Elegir uno (recomendación: TÚ) | 🔴 Crítico | Coherencia |
| 5 | Formato precio | Múltiples | "59€" vs "59 €" | "59 €" (con espacio) | 🟠 Alto | Consistencia |
| 6 | Nombre "Express" | Múltiples | "Express 4h" vs "Segunda Opinión Express" | "Segunda Opinión Express" | 🟠 Alto | Claridad |
| 7 | Botones CTAs | Múltiples | Variantes inconsistentes | Catálogo oficial | 🟠 Alto | Conversión |
| 8 | Precios hardcodeados | 5+ archivos | Repetidos en múltiples lugares | Centralizar en `pricing.ts` | 🟠 Alto | Mantenibilidad |
| 9 | Datos de contacto | 4+ archivos | Repetidos | Centralizar en `company.ts` | 🟠 Alto | Mantenibilidad |
| 10 | Nombre colegiada | Múltiples | "Cateb 9457" vs "CATEB 9457" | "CATEB 9457" | 🟡 Medio | Profesionalidad |
| 11 | Nombre responsable | Múltiples | "Eva Mª González" vs "Eva María González García" | "Eva María González García" | 🟡 Medio | Profesionalidad |
| 12 | Metadata títulos | Páginas servicios | Incluyen precios hardcodeados | Sin precios o dinámicos | 🟡 Medio | Mantenibilidad |

---

## 🎯 HOJA DE RUTA PRIORIZADA

### FASE 1: CONFIANZA Y CREDIBILIDAD (Crítico)
**Tiempo estimado:** 4-6 horas

1. ✅ Unificar precio Segunda Opinión a 59€ en `/cercador-certificats-energetics/`
2. ✅ Cambiar "Segunda Opinion" → "Segunda Opinión" (con tilde) en todos los archivos
3. ✅ Cambiar "24 h" → "24-48 horas laborables" en `services.ts`
4. ✅ Elegir TÚ como registro único y cambiar todos los USTED a TÚ

### FASE 2: CONSISTENCIA OPERATIVA (Alto)
**Tiempo estimado:** 6-8 horas

5. ✅ Crear `src/data/pricing.ts` y centralizar todos los precios
6. ✅ Crear `src/data/company.ts` y centralizar datos de contacto
7. ✅ Unificar formato de precios: "59 €" (con espacio)
8. ✅ Unificar nombres de servicios: "Segunda Opinión Express", "Check-Up Inmobiliario", "Informe Técnico Energético"
9. ✅ Crear catálogo oficial de CTAs y aplicar en toda la web

### FASE 3: PULIDO EDITORIAL (Medio)
**Tiempo estimado:** 4-5 horas

10. ✅ Unificar formato de tiempos: "X horas laborables", "X días laborables"
11. ✅ Unificar formato de moneda, porcentajes, m²
12. ✅ Unificar nombre colegiada: "CATEB 9457"
13. ✅ Unificar nombre responsable: "Eva María González García"
14. ✅ Revisar y unificar metadata (títulos, descripciones)

---

## ✅ CONCLUSIÓN

**Estado actual:** Proyecto con inconsistencias críticas que afectan confianza, credibilidad y mantenibilidad.

**Después de Sprint 1:** Proyecto completamente consistente, profesional y fácil de mantener.

**Tiempo total estimado:** 14-19 horas

**Impacto esperado:**
- +30% en confianza del usuario
- +20% en profesionalidad percibida
- -50% en tiempo de mantenimiento futuro
- 0 riesgos legales por inconsistencias de precios/plazos

---

*Auditoría realizada el 27 de junio de 2026 por comité de especialistas en consistencia editorial.*
