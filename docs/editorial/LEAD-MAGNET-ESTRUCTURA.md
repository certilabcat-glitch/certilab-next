# Lead Magnet: 7 Señales de que tu Certificado Energético Podría Contener Errores

## 📋 Resumen Ejecutivo

**Objetivo:** Capturar emails de visitantes que todavía no están preparados para comprar servicios.

**Activo:** Guía descargable en PDF (4 páginas)

**Landing:** `/landing/7-senales-ce`

**Formulario:** Nombre + Email (opcional: teléfono)

**Página de agradecimiento:** `/gracias/?magnet=7-senales-ce`

---

## 1️⃣ RECURSO DESCARGABLE

### Ubicación
- **Archivo HTML:** `/public/7-senales-certificado-energetico-incorrecto.html`
- **Descargable como:** PDF (mediante navegador: Ctrl+P → Guardar como PDF)

### Contenido (4 páginas)

**Página 1: Portada**
- Título: "7 Señales de que tu Certificado Energético Podría Contener Errores"
- Subtítulo: "Guía práctica para detectar certificados mal hechos antes de comprar o vender"
- Autor: Eva María González García (Arquitecta Técnica CATEB 9457)

**Página 2: Las 7 Señales (Parte 1)**
1. El técnico no visitó la vivienda
2. El precio fue inferior a 50€
3. La calificación es sorprendentemente buena
4. No hay detalles técnicos específicos

**Página 3: Las 7 Señales (Parte 2) + Impacto Económico**
5. No hay recomendaciones de mejora
6. Datos técnicos que no coinciden con la realidad
7. Aislamiento o instalaciones inventadas

**Impacto:** 5-15% del valor de la vivienda (13.500€ - 40.500€ en una vivienda de 270.000€)

**Página 4: Checklist + CTA**
- 7 preguntas para revisar tu certificado
- CTA: "¿Dudas sobre tu certificado? Una Segunda Opinión de un arquitecta técnica colegiada te da certeza."
- Precio: Desde 59€ · Respuesta en 24-48h

---

## 2️⃣ LANDING DE CAPTACIÓN

### Ruta
`/landing/7-senales-ce`

### Estructura
```
Header (Hero)
├── Eyebrow: "Guía gratuita · Arquitecta Técnica Cateb 9457"
├── H1: "7 Señales de que tu Certificado Energético Podría Contener Errores"
├── Subtítulo: Descripción del contenido
└── Beneficios (3 items con ✅)

Formulario (LandingLeadForm)
├── Nombre (requerido)
├── Email (requerido)
├── Teléfono (opcional)
└── Botón: "Descargar guía gratis →"
```

### Archivos
- `src/app/landing/7-senales-ce/layout.tsx` - Metadata SEO
- `src/app/landing/7-senales-ce/page.tsx` - Componente principal
- `src/app/landing/7-senales-ce/page.module.css` - Estilos

### Flujo
1. Usuario llena formulario (nombre + email)
2. Se envía a webhook (n8n)
3. Se registra evento Lead en Meta Pixel
4. Se redirige a `/gracias/?magnet=7-senales-ce`
5. Después de 3 segundos, redirige a WhatsApp

---

## 3️⃣ CTA PARA INSERTAR EN ARTÍCULOS

### Componente
`src/components/sections/LeadMagnetCTA.tsx`

### Uso
```tsx
import LeadMagnetCTA from "@/components/sections/LeadMagnetCTA";

export default function MiArticulo() {
  return (
    <>
      {/* Contenido del artículo */}
      <LeadMagnetCTA />
    </>
  );
}
```

### Personalización
```tsx
<LeadMagnetCTA
  title="¿Dudas sobre tu certificado energético?"
  description="Descarga gratis nuestra guía: 7 señales de que tu certificado podría contener errores."
  ctaText="Descargar guía gratis →"
  ctaLink="/landing/7-senales-ce"
/>
```

### Artículos donde insertar
1. `certificado-energetico-incorrecto`
2. `como-saber-si-certificado-energetico-esta-mal`
3. `certificado-energetico-inflado`
4. `certificado-energetico-f-g-correcto-o-error`
5. `brown-discount-precio-vivienda`

---

## 4️⃣ PÁGINA DE AGRADECIMIENTO

### Ruta
`/gracias/?magnet=7-senales-ce`

### Comportamiento
- Muestra mensaje: "Te hemos enviado el contenido solicitado por email. Revísalo en unos minutos."
- Después de 3 segundos, redirige a WhatsApp
- Muestra spinner mientras redirige

### Archivo existente
`src/app/gracias/GraciasContentClient.tsx` (ya implementado)

---

## 5️⃣ SECUENCIA DE 3 CORREOS (ESTRUCTURA)

### Correo 1: Entrega del PDF
**Asunto:** "Tu guía: 7 Señales de que tu Certificado Energético Podría Contener Errores"

**Contenido:**
- Saludo personalizado
- Enlace de descarga del PDF
- Breve resumen de qué encontrará
- CTA secundaria: "¿Necesitas una Segunda Opinión?"

**Timing:** Inmediato (al completar el formulario)

---

### Correo 2: Caso Práctico
**Asunto:** "Caso real: Cómo detectamos un certificado incorrecto (y ahorramos 28.500€)"

**Contenido:**
- Caso práctico con cifras reales
- Cómo se detectó el error
- Qué pasó después
- CTA: "¿Quieres que revisemos tu certificado?"

**Timing:** 2 días después del Correo 1

---

### Correo 3: CTA Segunda Opinión
**Asunto:** "¿Ya revisaste tu certificado? Aquí está el siguiente paso"

**Contenido:**
- Resumen de los puntos clave de la guía
- Testimonial de cliente
- Oferta: "Segunda Opinión por 59€"
- CTA principal: "Solicitar Segunda Opinión"

**Timing:** 5 días después del Correo 2

---

## 📊 TRACKING Y MÉTRICAS

### Eventos Meta Pixel
- **ViewContent:** Al cargar la landing
- **Lead:** Al completar el formulario

### Parámetros UTM
- `utm_campaign=7-senales-certificado`
- `utm_source=landing`
- `utm_medium=lead-magnet`

### Webhook (n8n)
Datos enviados:
```json
{
  "nombre": "string",
  "email": "string",
  "telefono": "string (opcional)",
  "mensaje": "Lead magnet: 7-senales-ce",
  "servicio": "lead-magnet",
  "origen": "landing-7-senales-ce",
  "timestamp": "ISO 8601"
}
```

---

## 🔗 RUTAS CREADAS

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/landing/7-senales-ce` | `src/app/landing/7-senales-ce/page.tsx` | Landing principal |
| `/gracias/?magnet=7-senales-ce` | `src/app/gracias/page.tsx` | Página de agradecimiento |
| `/public/7-senales-certificado-energetico-incorrecto.html` | HTML descargable | PDF descargable |

---

## 📝 PRÓXIMOS PASOS

### Implementación pendiente
- [ ] Integración con email marketing (Brevo, Mailchimp, etc.)
- [ ] Automatización de secuencia de 3 correos
- [ ] Descarga automática del PDF en email
- [ ] Testing A/B de landing
- [ ] Inserción de CTA en artículos especificados

### Monitoreo
- [ ] Tasa de conversión de landing
- [ ] Tasa de apertura de correos
- [ ] Tasa de clics en CTA
- [ ] Conversión a Segunda Opinión

---

## 📌 NOTAS IMPORTANTES

1. **No hay newsletter:** Este es un lead magnet puro, no una suscripción a newsletter.
2. **Sin automatizaciones complejas:** Solo estructura de 3 correos, sin ramificaciones.
3. **Enfoque en captación:** El objetivo es capturar emails de visitantes no preparados para comprar.
4. **Credibilidad:** Firmado por Eva María González García (Arquitecta Técnica CATEB 9457).
5. **Valor real:** La guía proporciona información práctica y accionable.

---

**Creado:** 23 de junio de 2026
**Versión:** 1.0
**Estado:** Estructura completada, pendiente de integración con email marketing
