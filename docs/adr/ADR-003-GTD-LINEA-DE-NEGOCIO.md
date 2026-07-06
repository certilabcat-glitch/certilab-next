# ADR-003 — Gestión Técnica Documental como segunda línea de negocio

| Campo | Valor |
|-------|-------|
| **Código** | ADR-003 |
| **Título** | Aprobación de Gestión Técnica Documental (GTD) como segunda línea de negocio de Certilab |
| **Estado** | 📋 PROPUESTA — Pendiente de aprobación |
| **Fecha** | 2026-07-06 |
| **Autores** | Product |
| **Precedencia** | BP-100-02 (Líneas de negocio), EP-102 (Análisis GTD) |
| **Impacto** | Producto, Roadmap, Posicionamiento, Priorización de épicas |

---

## Contexto

El Business Blueprint (BP-100-01/02/03/04) ha definido que Certilab crecerá mediante **líneas de negocio**, no mediante una lista de servicios. La línea fundacional es **ATI — Auditoría Técnica de Inmuebles** (certificados energéticos, V1 actual).

Durante la fase de definición estratégica se ha identificado una segunda línea de negocio viable y alineada con la visión de la empresa:

**GTD — Gestión Técnica Documental:** Obtención, organización, verificación y custodia de la documentación técnica de inmuebles, mediante autorización del cliente y consulta de organismos oficiales cuando proceda.

El análisis detallado se encuentra en EP-102-GESTION-TECNICA-DOCUMENTAL.md.

---

## Decisión

**Se aprueba Gestión Técnica Documental (GTD) como segunda línea de negocio de Certilab**, con las siguientes condiciones:

1. **No se inicia implementación hasta que ATI V1 esté estabilizado y operativo.**
2. **La primera implementación de GTD será el Informe de Situación Documental (EP-102A), orientado a validar demanda.**
3. **GTD reutiliza el Core V1 existente (Cliente, Inmueble, Expediente, Documento IA) mediante composición y extensión controlada.**
4. **La extensión de Documento IA para GTD se aborda en ADR-004.**
5. **No se crean nuevos Aggregate Roots ni Bounded Contexts para GTD en V1.**

---

## Consecuencias

### Positivas

- **Diversificación de ingresos:** GTD abre un mercado de ~25M de viviendas (stock total) frente a ~3,5M transacciones/año de ATI.
- **Reutilización del Core:** Sin cambios arquitectónicos. GTD usa Cliente, Inmueble, Expediente y Documento IA.
- **Efecto red:** Los clientes de GTD pueden convertirse en clientes de ATI y viceversa.
- **Moat competitivo:** La combinación ATI + GTD sobre la misma plataforma es difícil de replicar.
- **Validación temprana:** El Informe de Situación (29-49 €) tiene menor barrera de entrada que la Segunda Opinión (99 €), permitiendo captar clientes más fácilmente.

### Negativas

- **Riesgo de dilución de marca:** Dos líneas de negocio pueden confundir al mercado si no se comunican correctamente.
- **Coste de oportunidad:** Cada hora dedicada a GTD es una hora no dedicada a ATI.
- **Complejidad operativa:** Dos líneas de negocio implican dos flujos de atención al cliente, dos pipelines de venta, dos métricas de éxito.

### Neutrales

- El roadmap debe reescribirse para reflejar dos líneas de negocio en paralelo.
- Los documentos de producto (VISION, POSITIONING) deben actualizarse tras aprobar el Business Blueprint.

---

## Alternativas consideradas

| Alternativa | Razón para rechazarla |
|-------------|----------------------|
| **No hacer GTD** | Se pierde una línea de negocio con alta demanda validada y que comparte el mismo Core. |
| **GTD como módulo de ATI** | Son líneas diferentes. ATI audita, GTD documenta. Mezclarlas diluiría ambas propuestas de valor. |
| **GTD como empresa separada** | Incrementa la complejidad operativa y fiscal sin beneficio claro en V1. Se reconsiderará si GTD escala significativamente. |
| **Esperar a V3** | La ventana de oportunidad existe ahora. El análisis EP-102 muestra que hay demanda no cubierta. |

---

## Referencias

- BP-100-02-LINEAS-DE-NEGOCIO.md
- EP-102-GESTION-TECNICA-DOCUMENTAL.md
- EP-101-PRODUCT-BUSINESS-ALIGNMENT.md
- CF-050-MVP-FREEZE.md

---

*Fin del documento ADR-003*