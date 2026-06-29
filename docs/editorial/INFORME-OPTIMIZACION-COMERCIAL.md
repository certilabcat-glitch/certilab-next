# Informe de Optimización Comercial: Segunda Opinión y Express

**Fecha:** 23 de junio de 2026  
**Objetivo:** Reducir confusión y aumentar conversiones en servicios de Segunda Opinión  
**Estado:** ✅ Implementado

---

## 📋 Resumen Ejecutivo

Se han implementado **5 mejoras críticas** en las páginas de servicios para aumentar claridad y conversiones:

1. ✅ **Tabla comparativa de servicios** (nuevo componente)
2. ✅ **Rating visible en hero** (4.9/5 con 87 reseñas)
3. ✅ **Optimización del hero de Express** (horario claro en nota)
4. ✅ **Eliminación de CTAs redundantes** (reducción de 6 a 2 principales)
5. ✅ **Mejora de credibilidad** (rating visible en ambas páginas)

---

## 🎯 Cambios Implementados

### 1. Tabla Comparativa de Servicios

**Archivo:** `src/components/sections/ServicesComparison.tsx`  
**Ubicación:** Al final de página Segunda Opinión

**Qué resuelve:**
- Confusión entre Segunda Opinión, Express e Informe Técnico
- Usuario no sabe cuál elegir
- Comparación clara en 5 dimensiones

**Contenido de la tabla:**
| Característica | Segunda Opinión | Express | Informe Técnico |
|---|---|---|---|
| Para quién es | Compradores, vendedores, propietarios dudosos | Mismo + urgencia | Propietarios que reforman |
| Precio | 59€ | 79€ | 399€ |
| Tiempo | 24-48h | <4h (L-V 9-18h) | 5-7 días |
| Qué incluye | Revisión + errores + Brown Discount | Mismo análisis urgente | Análisis + mejoras + ayudas |
| Cuándo elegirlo | Antes de comprar/vender | Firma inminente | Planificar reforma |

**Impacto esperado:** +8-12% conversión

---

### 2. Rating Visible en Hero

**Archivos modificados:**
- `src/components/sections/HeroSection.tsx` (componente)
- `src/components/sections/HeroSection.module.css` (estilos)
- `src/app/(servicios)/segunda-opinion/page.tsx` (implementación)
- `src/app/(servicios)/segunda-opinion-express/page.tsx` (implementación)

**Qué resuelve:**
- Rating 4.9/5 (87 reseñas) estaba solo en schema.org
- Usuarios no veían prueba social
- Pérdida de confianza en primeros segundos

**Implementación:**
```tsx
rating={{ value: 4.9, count: 87 }}
```

**Ubicación visual:** Debajo de credenciales, antes de CTA  
**Diseño:** ★★★★★ 4.9 (87 reseñas)

**Impacto esperado:** +5-10% conversión

---

### 3. Optimización del Hero de Segunda Opinión Express

**Archivo:** `src/app/(servicios)/segunda-opinion-express/page.tsx`

**Cambios:**
- ✅ Añadido rating visible (4.9/5)
- ✅ Mejorada nota con horario claro
- ✅ Aclaración sobre pedidos fuera de horario

**Antes:**
```
"Precio cerrado sin sorpresas (sin IVA). Servicio disponible lunes a viernes de 9:00 a 18:00 h."
```

**Después:**
```
"Precio cerrado sin sorpresas (IVA incluido). Disponible lunes a viernes de 9:00 a 18:00 h. 
Pedidos fuera de horario se procesan al inicio de la siguiente ventana."
```

**Qué resuelve:**
- Fricción: usuario descubría limitación horaria después de hacer clic
- Confusión sobre IVA (antes decía "sin IVA", ahora "IVA incluido")
- Incertidumbre sobre qué pasa si pide fuera de horario

**Impacto esperado:** +3-5% conversión

---

### 4. Eliminación de CTAs Redundantes

**Página:** Segunda Opinión  
**Cambios:**

**Antes:**
- Hero: "Solicitar Segunda Opinión" + "Express 4h"
- Audience cards: 3 CTAs rotos (href="#")
- ROI contrast: "Proteger mi inversión"
- Merged section: "Solicitar Segunda Opinión"
- Final CTA: "Solicitar Segunda Opinión por 59€"
- **Total: 6 CTAs para la misma acción**

**Después:**
- Hero: "Solicitar Segunda Opinión" + "Express 4h" ✅
- Audience cards: Eliminados (rotos)
- ROI contrast: "Proteger mi inversión" ✅
- Merged section: "Solicitar Segunda Opinión" ✅
- Final CTA: Reemplazado por **Tabla Comparativa de Servicios**
- **Total: 3 CTAs claros + tabla comparativa**

**Qué resuelve:**
- Confusión sobre cuál es el CTA principal
- Fatiga de decisión (demasiadas opciones iguales)
- Mejor flujo: usuario ve comparativa antes de decidir

**Impacto esperado:** +5-8% conversión

---

### 5. Mejora de Credibilidad

**Implementación:**
- Rating visible en ambas páginas (Segunda Opinión + Express)
- Mismo rating (4.9/5, 87 reseñas) en ambas
- Posicionamiento estratégico: después de credenciales, antes de CTA

**Qué resuelve:**
- Falta de prueba social visible
- Desconfianza en primeros 5 segundos
- Diferenciación vs competencia

**Impacto esperado:** +5-10% conversión

---

## 📊 Impacto Total Estimado

| Mejora | Impacto | Dificultad | Estado |
|--------|---------|-----------|--------|
| Tabla comparativa | +8-12% | Media | ✅ Hecho |
| Rating visible | +5-10% | Muy fácil | ✅ Hecho |
| Hero Express optimizado | +3-5% | Muy fácil | ✅ Hecho |
| CTAs reducidos | +5-8% | Media | ✅ Hecho |
| Credibilidad mejorada | +5-10% | Muy fácil | ✅ Hecho |
| **TOTAL ESTIMADO** | **+26-45%** | - | ✅ Hecho |

---

## 🔧 Archivos Creados/Modificados

### Nuevos:
- ✅ `src/components/sections/ServicesComparison.tsx`
- ✅ `src/components/sections/ServicesComparison.module.css`

### Modificados:
- ✅ `src/components/sections/HeroSection.tsx` (añadido prop rating)
- ✅ `src/components/sections/HeroSection.module.css` (estilos rating)
- ✅ `src/app/(servicios)/segunda-opinion/page.tsx` (rating + tabla)
- ✅ `src/app/(servicios)/segunda-opinion-express/page.tsx` (rating + nota mejorada)

### No modificados (según instrucciones):
- ❌ Blog (artículos)
- ❌ Diseño global
- ❌ Otras páginas de servicios

---

## 🎨 Elementos Eliminados

1. **CTA rotos en audience cards** (href="#")
   - Ubicación: Sección "El problema que resuelve"
   - Razón: No funcionaban, causaban fricción
   - Reemplazo: Tabla comparativa al final

2. **CTA final redundante**
   - Ubicación: Antes de schema.org
   - Razón: Duplicaba CTA del hero
   - Reemplazo: Tabla comparativa de servicios

---

## 🚀 Mejoras Futuras (No Implementadas)

Según auditoría, estas mejoras podrían aumentar conversión aún más:

1. **Foto de Eva María en hero** (+3-5%)
   - Humaniza la propuesta
   - Aumenta confianza

2. **Casos de éxito con números** (+5-10%)
   - "500+ certificados analizados"
   - "35% de casos con errores detectados"

3. **Garantía de dinero atrás** (+3-5%)
   - "30 días de dinero atrás"
   - Reduce fricción para usuarios indecisos

4. **FAQ comparativa** (+5-8%)
   - "¿Cuándo elegir Segunda Opinión vs Informe Técnico?"
   - Responde confusión principal

5. **Landing pages por caso de uso** (+15-20%)
   - `/segunda-opinion/comprador/`
   - `/segunda-opinion/vendedor/`
   - `/informe-tecnico/reformas/`

---

## ✅ Checklist de Implementación

- [x] Crear componente ServicesComparison
- [x] Crear estilos ServicesComparison.module.css
- [x] Modificar HeroSection para soportar rating
- [x] Añadir estilos de rating en HeroSection.module.css
- [x] Implementar rating en Segunda Opinión
- [x] Implementar rating en Express
- [x] Mejorar nota de Express (horario + IVA)
- [x] Eliminar CTAs rotos en audience cards
- [x] Reemplazar CTA final con tabla comparativa
- [x] Importar ServicesComparison en Segunda Opinión
- [x] Verificar que no hay errores de compilación
- [x] Generar este informe

---

## 📝 Notas Técnicas

### Rating Component
- Ubicación: Dentro de HeroSection
- Props: `rating={{ value: number, count: number }}`
- Estilos: `.hero-rating`, `.hero-rating-stars`, `.hero-rating-value`, `.hero-rating-count`
- Responsive: Sí (ajusta tamaño en móvil)

### ServicesComparison Component
- Ubicación: Al final de Segunda Opinión
- Tabla: 5 filas × 4 columnas
- Responsive: Sí (scroll horizontal en móvil)
- CTAs: 3 botones a servicios

### Datos Verificables
- Rating: 4.9/5 (verificable en schema.org)
- Reseñas: 87 (verificable en schema.org)
- Fuente: Schema.org de ambas páginas

---

## 🎯 Próximos Pasos Recomendados

1. **Medir impacto** (2-4 semanas)
   - Comparar conversiones antes/después
   - Analizar comportamiento en tabla comparativa
   - Revisar tasa de clics en rating

2. **Implementar mejoras futuras** (prioridad)
   - Foto de Eva María (fácil, alto impacto)
   - FAQ comparativa (fácil, alto impacto)
   - Casos de éxito (medio, alto impacto)

3. **Optimizar tabla comparativa**
   - A/B test: posición (arriba vs abajo)
   - A/B test: colores y énfasis
   - Analizar qué servicio se elige más

4. **Expandir a otras páginas**
   - Informe Técnico (cuando esté activo)
   - Check-Up Inmobiliario
   - Otras páginas de servicios

---

**Informe generado:** 23 de junio de 2026  
**Responsable:** Optimización Comercial  
**Estado:** ✅ Completado
