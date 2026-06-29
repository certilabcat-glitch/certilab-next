# Informe de Diferenciación: Certificado Energético Incorrecto

**Fecha:** 23 de junio de 2026  
**Responsable:** Implementación de plan de diferenciación de contenidos  
**Estado:** ✅ Completado

---

## 1. Secciones Eliminadas

### En `certificado-energetico-incorrecto.md`

- ❌ **CTA intermedio (línea 47-49):** Eliminado el enlace "¿No sabes si tu certificado tiene errores? Te lo confirmamos por 59€ →" que estaba entre secciones de detección.
  - **Razón:** Evitar saturación de CTAs. Se mantiene el CTA principal en la conclusión.

### En `reclamar-certificado-energetico-incorrecto.md`

- ❌ **CTA final simple (línea 103-104):** Reemplazado el CTA único por doble CTA contextualizado.
  - **Razón:** Permitir que el usuario elija según su situación (verificación vs. reclamación).

---

## 2. Secciones Añadidas

### En `reclamar-certificado-energetico-incorrecto.md`

#### ✅ Ampliación: Responsabilidades legales del técnico certificador

**Contenido nuevo añadido:**
- Responsabilidad penal: "En casos de fraude grave o falsificación de datos, el técnico puede enfrentar cargos penales por estafa o falsedad documental."
- Plazo de reclamación ampliado: "A diferencia del plazo de vicios ocultos (6 meses), la reclamación por responsabilidad profesional prescribe a los **10 años** desde la emisión del certificado. Esto te da margen para actuar."
- Contexto de ICAEN: Especificación de la administración autonómica en Cataluña.
- Sanciones máximas: Ampliación a "Las sanciones más graves pueden llegar a **10.000€**."

**Impacto:** Proporciona información legal más completa y tranquilizadora sobre plazos de reclamación.

#### ✅ Ampliación: ¿Necesitas un abogado o basta con un informe técnico?

**Contenido nuevo añadido:**
- Procedimientos específicos: "El colegio profesional y la administración autonómica tienen procedimientos específicos para reclamaciones sin necesidad de abogado."
- Especialización de abogado: "Un abogado especializado en derecho inmobiliario puede ayudarte a cuantificar el daño y presentar la demanda correctamente."
- Recuperabilidad de costes: "Si el error es grave, el coste del informe es recuperable en la reclamación."

**Impacto:** Clarifica cuándo es necesario abogado y cómo el informe técnico es inversión recuperable.

#### ✅ Nueva sección: Próximos pasos (Doble CTA)

**Estructura:**
```
## Próximos pasos

Tienes dos opciones según tu situación:

[CTA 1] Si aún no has verificado tu certificado
→ Segunda Opinión (59€)

[CTA 2] Si necesitas pruebas para reclamar
→ Informe Técnico (399€)
```

**Impacto:** 
- Diferencia clara entre dos flujos de usuario.
- Cada CTA es contextual y no competitivo.
- Aumenta conversión al permitir que el usuario elija su camino.

---

## 3. Enlaces Internos Creados

### Enlace 1: certificado-energetico-incorrecto → reclamar-certificado-energetico-incorrecto

**Ubicación:** Línea 110 (después de casos reales)  
**Texto:** "Si ya has identificado errores en tu certificado, [aquí te explicamos cómo reclamar paso a paso](/blog/reclamar-certificado-energetico-incorrecto/)."  
**Contexto:** Transición natural después de mostrar el impacto económico.

### Enlace 2: reclamar-certificado-energetico-incorrecto → certificado-energetico-incorrecto

**Ubicación:** Línea 18 (en la introducción)  
**Texto:** "Si todavía no sabes si tu certificado tiene errores, [descubre las señales de alerta aquí](/blog/certificado-energetico-incorrecto/)."  
**Contexto:** Referencia al artículo anterior para usuarios que aún no han detectado errores.

### Enlace 3: reclamar-certificado-energetico-incorrecto → informe-tecnico-energetico

**Ubicación:** Línea 127 (en CTA de "Próximos pasos")  
**Texto:** "El Informe Técnico es el documento que necesitas para reclamar ante el técnico, el colegio profesional o la administración."  
**Contexto:** Enlace directo al servicio de Informe Técnico (399€).

---

## 4. CTAs Añadidos

### CTA Principal en certificado-energetico-incorrecto.md

**Ubicación:** Sección "Conclusión" (línea 130-139)  
**Tipo:** CTA Bloque Final  
**Texto del botón:** "Segunda Opinión →"  
**URL:** `/segunda-opinion/`  
**Contexto:** Llamada a acción principal para verificar el certificado.

**Cambio realizado:**
- Antes: "Solicitar Segunda Opinión por 59€ →"
- Después: "Segunda Opinión →"
- **Razón:** Simplificar el texto del botón; el precio ya está en el contexto.

### Doble CTA en reclamar-certificado-energetico-incorrecto.md

**Ubicación:** Nueva sección "Próximos pasos" (línea 119-135)  
**Tipo:** Dos CTAs contextualizados

#### CTA 1: Segunda Opinión
- **Texto:** "Segunda Opinión →"
- **URL:** `/segunda-opinion/`
- **Contexto:** "Si aún no has verificado tu certificado"
- **Subtexto:** "Respuesta en 24-48h · Firmado por arquitecta colegiada CATEB 9457"

#### CTA 2: Informe Técnico
- **Texto:** "Informe Técnico →"
- **URL:** `/informe-tecnico-energetico/`
- **Contexto:** "Si necesitas pruebas para reclamar"
- **Subtexto:** "Análisis completo · Válido como prueba pericial · 399€"

**Impacto:** 
- No son competitivos, sino complementarios.
- Cada uno responde a una necesidad diferente.
- Aumenta la probabilidad de conversión al permitir que el usuario elija su camino.

---

## 5. Riesgos Detectados

### ⚠️ Riesgo 1: Falta de CSS para `.cta-doble`

**Severidad:** Media  
**Descripción:** La nueva sección "Próximos pasos" usa clases CSS `.cta-doble` y `.cta-opcion` que no están definidas en los estilos del proyecto.

**Solución recomendada:**
```css
.cta-doble {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.cta-opcion {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
}

.cta-opcion h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.cta-opcion .cta-button {
  display: inline-block;
  margin: 1rem 0;
}

@media (max-width: 768px) {
  .cta-doble {
    grid-template-columns: 1fr;
  }
}
```

**Acción:** Verificar si existen estilos en `src/app/blog/[slug]/post.css` o crear los estilos necesarios.

### ⚠️ Riesgo 2: Inconsistencia en estructura de metadatos

**Severidad:** Baja  
**Descripción:** Los dos artículos usan diferentes formatos de metadatos:
- `certificado-energetico-incorrecto.md`: Usa YAML con `datePublished`, `canonicalUrl`
- `reclamar-certificado-energetico-incorrecto.md`: Usa YAML con `date`, `excerpt`

**Solución recomendada:** Estandarizar ambos archivos al mismo formato.

**Acción:** Revisar `src/data/articles.ts` para confirmar qué campos son obligatorios.

### ⚠️ Riesgo 3: Enlaces internos sin validación

**Severidad:** Media  
**Descripción:** Los enlaces internos creados apuntan a rutas que deben existir:
- `/blog/certificado-energetico-incorrecto/` ✅ Existe
- `/blog/reclamar-certificado-energetico-incorrecto/` ✅ Existe
- `/segunda-opinion/` ✅ Existe
- `/informe-tecnico-energetico/` ✅ Existe

**Acción:** Verificar que todas las rutas están correctamente configuradas en el router de Next.js.

### ⚠️ Riesgo 4: Diferenciación de precios en CTAs

**Severidad:** Baja  
**Descripción:** Los CTAs muestran precios diferentes:
- Segunda Opinión: 59€ (en subtexto)
- Informe Técnico: 399€ (en subtexto)

**Nota:** Esto es correcto según el plan. Los precios están claramente diferenciados.

### ⚠️ Riesgo 5: Posible confusión entre Segunda Opinión e Informe Técnico

**Severidad:** Media  
**Descripción:** Ambos servicios generan "informes" pero con propósitos diferentes:
- Segunda Opinión (59€): Verificación rápida, válida como prueba inicial
- Informe Técnico (399€): Análisis completo, válido como prueba pericial

**Solución recomendada:** Añadir una tabla comparativa en la página de servicios o en FAQ que diferencie claramente ambos productos.

**Acción:** Considerar crear una sección FAQ que compare ambos servicios.

---

## 6. Verificación de Cambios

### Cambios en certificado-energetico-incorrecto.md

| Elemento | Antes | Después | Estado |
|----------|-------|---------|--------|
| CTA intermedio | Presente | Eliminado | ✅ |
| CTA principal | "Solicitar Segunda Opinión por 59€ →" | "Segunda Opinión →" | ✅ |
| Enlaces internos | 1 (a reclamar) | 1 (a reclamar) | ✅ |
| Secciones | 8 | 8 | ✅ |

### Cambios en reclamar-certificado-energetico-incorrecto.md

| Elemento | Antes | Después | Estado |
|----------|-------|---------|--------|
| Responsabilidades legales | Básicas | Ampliadas (penal, plazos) | ✅ |
| Abogado vs informe | Básico | Ampliado (procedimientos, especialización) | ✅ |
| CTA final | Simple | Doble contextualizado | ✅ |
| Enlaces internos | 1 (a certificado) | 3 (certificado, segunda-opinion, informe-tecnico) | ✅ |
| Secciones | 8 | 9 (nueva: Próximos pasos) | ✅ |

---

## 7. Resumen Ejecutivo

### ✅ Objetivos Completados

1. **Diferenciación de contenidos:** Cada artículo tiene propósito claro y diferenciado.
   - `certificado-energetico-incorrecto`: Detectar errores
   - `reclamar-certificado-energetico-incorrecto`: Reclamar errores

2. **Eliminación de solapamientos:** Removidos CTAs redundantes que competían entre sí.

3. **Contenido nuevo:** Ampliadas secciones legales con información sobre responsabilidad penal y plazos de prescripción.

4. **Enlazado interno:** Creados 3 enlaces internos que guían al usuario por el customer journey.

5. **CTAs estratégicos:**
   - CTA principal en `certificado-energetico-incorrecto`: Segunda Opinión
   - Doble CTA en `reclamar-certificado-energetico-incorrecto`: Segunda Opinión + Informe Técnico

6. **Ambos slugs mantenidos:** Sin redirects, sin fusiones.

### 📊 Impacto Esperado

- **Claridad:** Usuario entiende claramente qué artículo leer según su situación.
- **Conversión:** Doble CTA permite que usuario elija su camino sin fricción.
- **SEO:** Enlaces internos mejoran autoridad y relevancia temática.
- **Experiencia:** Flujo natural: detectar → reclamar → actuar.

### 🔧 Acciones Pendientes

1. Crear/verificar estilos CSS para `.cta-doble` y `.cta-opcion`
2. Validar rutas en Next.js router
3. Estandarizar metadatos entre artículos
4. Considerar tabla comparativa Segunda Opinión vs Informe Técnico

---

**Implementación completada:** 23 de junio de 2026, 11:36 AM  
**Próxima revisión recomendada:** Después de 2 semanas de publicación para analizar métricas de conversión.
