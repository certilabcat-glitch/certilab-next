# PRODUCT POSITIONING — Certilab Platform

**Versión:** 2.0
**Fecha:** 2026-07-05
**Estado:** ✅ APROBADO — FASE PRODUCTO INICIADA

---

> **Nota sobre el alcance de este documento:** El posicionamiento descrito a continuación corresponde al **primer módulo** de Certilab Platform: la auditoría de certificados energéticos (Segunda Opinión PITR™). La plataforma está diseñada para soportar nuevos módulos de inspección técnica (ITE, accesibilidad, eficiencia hídrica, peritajes) sin cambios en la arquitectura del Core V1. El posicionamiento de futuros módulos se definirá en documentos específicos.

---

## 1. Mercado objetivo

### Mercado primario (V1-V2)

**España — Propietarios de inmuebles con certificado energético en vigor.**

- **Tamaño del mercado:** ~3,5 millones de transacciones inmobiliarias anuales (ventas + alquileres) que requieren certificado energético en España.
- **Segmento focal inicial:** Cataluña (20% del mercado nacional ≈ 700.000 transacciones/año).
- **Tasa estimada de certificados con errores:** 15-30% según estudios sectoriales.
- **Mercado direccionable:** Propietarios que desconfían de su certificado o quieren verificarlo antes de una transacción.

### Mercado secundario (V2-V3)

**Arquitectos Técnicos y empresas certificadoras en España y Latinoamérica.**

- **ATs colegiados en España:** ~15.000 (colegios de Aparejadores y Arquitectos Técnicos).
- **Empresas certificadoras registradas:** ~5.000 en España.
- **Mercado LATAM:** México, Colombia y Chile tienen regulación de certificación energética incipiente → oportunidad de posicionamiento temprano.

---

## 2. Cliente ideal (ICP)

### ICP Cliente final (propietario)

| Atributo | Descripción |
|----------|-------------|
| **Perfil** | Propietario de vivienda en España, edad 30-65 años |
| **Situación** | Va a vender, alquilar o ya tiene el certificado y duda de su validez |
| **Nivel técnico** | Bajo o nulo en eficiencia energética |
| **Digitalización** | Usa internet para gestiones, confía en servicios digitales |
| **Dolor** | "Mi certificado me parece demasiado bueno/malo. No me fío. ¿Y si luego tengo problemas?" |
| **Disposición a pagar** | 50-150 € por una segunda opinión profesional (frente a 500-800 € de coste potencial de un error legal) |
| **Canales de captación** | Google (búsqueda orgánica SEO), blog, recomendación de inmobiliaria/administrador de fincas |

### ICP Arquitecto Técnico (AT)

| Atributo | Descripción |
|----------|-------------|
| **Perfil** | AT colegiado, independiente o pequeña oficina (1-5 personas) |
| **Situación** | Busca diversificar ingresos más allá de la obra nueva/rehabilitación |
| **Nivel técnico** | Alto. Conoce normativa energética (CTE, RD 390/2021) |
| **Digitalización** | Media. Usa herramientas digitales pero no apps complejas |
| **Dolor** | "Necesito una herramienta que me permita ofrecer auditoría de certificados sin tener que construirla yo. Perdería clientes si rechazo este servicio." |
| **Disposición a pagar** | Suscripción mensual 30-90 €/mes o comisión por expediente |
| **Canales de captación** | Colegios profesionales, LinkedIn, eventos sectoriales, referidos |

---

## 3. Competidores

| Competidor | Tipo | Relación con Certilab |
|------------|------|----------------------|
| **Certificadoras tradicionales** | Indirecto | Emiten certificados, no los auditan. Certilab complementa / audita su trabajo |
| **Autoconsulta del propietario** | Sustitutivo | El propietario intenta verificar por su cuenta (no puede, no tiene conocimientos) |
| **Otro AT local** | Directo (futuro) | Otro AT puede ofrecer el mismo servicio, pero sin plataforma digital escalable |
| **Plataformas de certificación online** (Ej. Certicalia, Habitissimo) | Indirecto | Conectan con certificadores, pero no auditan. No hay superposición directa |

*Análisis detallado en docs/product/PRODUCT-COMPETITORS.md*

---

## 4. Diferenciación

### Factores diferenciales clave (primer módulo)

| Factor | Certilab | Alternativas |
|--------|----------|--------------|
| **Independencia** | No emite certificados. Solo audita. Sin conflicto de interés. | Las certificadoras auditan su propio trabajo (conflicto inherente). |
| **Metodología** | PITR™ — Procedimiento de Inspección Técnica Remota. Preguntas guiadas, código abierto, auditable. | El propietario no tiene marco para verificar. Otros ATs no tienen proceso estandarizado. |
| **Digitalización** | Plataforma completa: solicitud, pago, PITR™, revisión, correcciones, dictamen. Sin papel, sin llamadas, sin emails perdidos. | El proceso tradicional: email → WhatsApp → llamada → papel. Sin trazabilidad. |
| **Escalabilidad** | Un AT puede gestionar decenas de expedientes simultáneamente desde el dashboard. | AT tradicional: gestión artesanal, un expediente a la vez. |
| **Transparencia** | Observatorio público con datos anonimizados del mercado. | El mercado no tiene datos sobre su propia calidad. |
| **Precio** | Desde 49 € (Segunda Opinión Express) hasta 149 € (Segunda Opinión completa). | Contratar a un AT para revisión informal: 200-500 € sin estructura. |

### Declaración de posicionamiento (V1)

> **Para propietarios de vivienda que desconfían de su certificado energético, Certilab Platform es el servicio de auditoría independiente que verifica la validez de su certificado con la garantía de un Arquitecto Técnico colegiado, a diferencia de las certificadoras que auditan su propio trabajo o de la autoconsulta que no tiene rigor técnico.**

---

## 5. Pricing orientativo

### Modelo SaaS B2B2C

Certilab opera un modelo **B2B2C**: los ATs (B) usan la plataforma para servir a propietarios (C).

| Servicio | Precio al cliente final | Comisión AT | Ingreso Certilab |
|----------|------------------------|-------------|------------------|
| **Segunda Opinión** | 99-149 € | 60-70% | 30-50 € |
| **Segunda Opinión Express** | 49-69 € | 40-50% | 25-35 € |
| **Informe Técnico Energético** | 199-299 € | 70-75% | 50-75 € |

### Planes de suscripción AT (V3+)

| Plan | Precio/mes | Expedientes incluidos | Comisión adicional |
|------|-----------|---------------------|-------------------|
| **Básico** | 29 € | Hasta 5 | 20% |
| **Profesional** | 69 € | Hasta 20 | 15% |
| **Ilimitado** | 149 € | Ilimitados | 10% |

### Pricing V1 inicial

Para el lanzamiento MVP (V1):

- Servicio único: **Segunda Opinión — 99 €** (precio fijo, sin suscripción AT porque el AT es interno).
- Modelo: pago por servicio (no suscripción). El cliente paga, el AT cobra su comisión.

---

## 6. Modelo SaaS

### Arquitectura de ingresos

```
Cliente final (propietario)
         │
         ▼
   Paga 99-149 € por servicio
         │
         ▼
┌─────────────────────────────────┐
│      Certilab Platform           │
│  (plataforma, PITR™, dictamen)  │
│  Ingreso: 30-50 € por servicio   │
└─────────────────────────────────┘
         │
         ▼
   Comisión al AT (60-70%)
```

### Canales de adquisición

| Canal | Coste estimado | Conversión esperada | Prioridad V1 |
|-------|---------------|-------------------|--------------|
| **SEO orgánico** (blog, landings, Observatorio) | Bajo (contenido) | Media | ✅ Alta |
| **Google Ads** (búsqueda: "segunda opinión certificado energético") | Medio (1-3 € CPC) | Alta | ⏳ V2 |
| **Referidos** (inmobiliarias, administradores de fincas) | Bajo (comisión de afiliado) | Alta | ✅ Alta |
| **Colegios profesionales AT** | Bajo (partnership) | Media | ✅ Alta |
| **Redes sociales** (LinkedIn, Instagram) | Bajo (contenido orgánico) | Baja | ⏳ V2 |
| **PR / medios sectoriales** | Medio (relaciones públicas) | Media | ⏳ V2 |

### Economía unitaria estimada (V1)

| Métrica | Valor |
|---------|-------|
| **CAC** (coste adquisición cliente) | 15-25 € (SEO + referidos) |
| **ARPU** (ingreso medio por cliente) | 35 € (después de comisión AT) |
| **LTV** (vida media cliente) | 35 € (compra única inicial, recurrente si tiene varios inmuebles o servicios) |
| **Gross Margin** | 70-80% (costes: hosting, Supabase, APIs) |
| **Payback period** | Inmediato (pago por servicio) |
| **Break-even mensual** | ~50 expedientes/mes para cubrir costes fijos |

---

## 7. Estrategia de go-to-market (GTM) V1

### Fase 1: Tracción inicial (Mes 1-3)

- **Objetivo:** 10 expedientes completados.
- **Canales:** SEO (contenido existente), referidos personales, red de contactos AT.
- **Precio:** 99 € fijo (Segunda Opinión).

### Fase 2: Validación (Mes 4-6)

- **Objetivo:** 50 expedientes completados. NPS ≥ 40.
- **Canales:** + partnerships con inmobiliarias locales, + colegios AT.
- **Precio:** 99-129 € según complejidad.

### Fase 3: Crecimiento (Mes 7-12)

- **Objetivo:** 200 expedientes/mes. Primer AT externo onboarded.
- **Canales:** + Google Ads (presupuesto limitado), + programa de referidos.
- **Precio:** 99-149 €. Planes AT en beta.

---

## 8. Riesgos de posicionamiento

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| **Confusión con certificadoras** | Alta | Medio | Comunicación clara: "No certificamos, auditamos". Diferenciación constante en contenido. |
| **Percepción de "caro"** | Media | Medio | Comparativa con coste de error legal. Testimonios de clientes. |
| **ATs que rechazan la plataforma** | Media | Alto | Involucrar ATs en diseño. Modelo de comisiones atractivo. |
| **Dependencia de SEO** | Alta | Alto | Diversificar canales desde V2. Programa de referidos. |
| **Barrera regulatoria** | Baja | Alto | Cumplimiento GDPR. Dictamen como opinión técnica, no vinculante. Seguro de responsabilidad civil. |

---

*Fin del documento PRODUCT-POSITIONING.md*