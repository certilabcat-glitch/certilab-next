# PRODUCT VISION — Certilab Platform

**Versión:** 2.0
**Fecha:** 2026-07-05
**Estado:** ✅ APROBADO — FASE PRODUCTO INICIADA
**Documento raíz:** docs/releases/v1.0.0-rc1.md

---

## Jerarquía del producto

```
Empresa
  └── Certilab

Producto SaaS
  └── Certilab Platform

Módulos
    ├── Auditoría de Certificados Energéticos (V1)
    └── Futuros módulos (V2+)
```

**Principio rector:**

> Certilab Platform es una plataforma modular de gestión y auditoría técnica. Los módulos implementan capacidades específicas, pero ninguno define la plataforma. Todos reutilizan el mismo Core de Cliente, Inmueble, Expediente y Documento IA.

---

## 1. ¿Qué es Certilab Platform?

Certilab Platform es una **plataforma SaaS de auditoría técnica de inmuebles** que permite a propietarios, profesionales y empresas gestionar inspecciones técnicas de forma digital. Su **primer módulo** es la auditoría de certificados energéticos (Segunda Opinión PITR™), que permite a propietarios de inmuebles obtener una segunda opinión profesional, rápida y fiable sobre su certificado energético, y a Arquitectos Técnicos gestionar el ciclo completo de revisión, corrección y entrega de dictámenes.

Certilab no es un software de certificación energética. No calcula letras energéticas. No compite con CE3X ni con herramientas de certificación. El primer módulo de Certilab **audita** certificados ya emitidos, detecta errores, inflados o falseamientos, y proporciona un dictamen técnico colegiado.

---

## 2. ¿Qué problema resuelve?

### El problema del mercado inmobiliario español

En España, el certificado de eficiencia energética es obligatorio para vender o alquilar una vivienda desde 2013. Sin embargo:

- **Hasta un 30% de los certificados energéticos pueden contener errores** (fuente: estudios de asociaciones de Arquitectos Técnicos).
- **Existe un incentivo económico para inflar la letra energética**: una vivienda con letra A o B se vende o alquila mejor y más caro que una con letra D o E.
- **El propietario medio no tiene conocimientos técnicos** para verificar si su certificado es correcto.
- **Confiar en un certificado incorrecto puede tener consecuencias legales y económicas**: multas por publicidad engañosa, problemas en reclamaciones de eficiencia, pérdida de valor real.
- **Las certificadoras no auditan su propio trabajo**: no existe un mecanismo independiente de verificación.

### La solución Certilab

El primer módulo de Certilab proporciona un **mecanismo independiente, profesional y accesible** para que cualquier propietario pueda verificar si su certificado energético es correcto, sin necesidad de conocimientos técnicos y con la garantía de un Arquitecto Técnico colegiado.

---

## 3. ¿Para quién está diseñada?

Certilab está diseñada para **tres perfiles principales**:

| Perfil | Rol | Necesidad principal |
|--------|-----|-------------------|
| **Propietario de inmueble** | Cliente final | Verificar si su certificado energético es correcto sin conocimientos técnicos |
| **Arquitecto Técnico (AT)** | Profesional auditor | Gestionar expedientes de revisión de forma eficiente y escalable |
| **Empresa certificadora** | Socio estratégico | Ofrecer un servicio de garantía post-venta a sus clientes |

Perfiles secundarios (futuro):
- **Agente inmobiliario** (V2): certificar la calidad de los certificados de sus carteras.
- **Administrador de fincas** (V2): auditar certificados de comunidades de propietarios.
- **Administración pública** (V3): supervisar la calidad del parque certificado en su territorio.

---

## 4. ¿Cuál es su propuesta de valor?

### Propuesta de valor principal (primer módulo)

> **Certilab te dice si tu certificado energético es correcto, con la garantía de un Arquitecto Técnico colegiado, sin que tengas que saber nada de eficiencia energética.**

### Beneficios clave

| Para el propietario | Para el AT | Para el mercado |
|---------------------|------------|-----------------|
| Tranquilidad: sabe si su certificado es fiable | Plataforma de gestión de expedientes sin fricción | Datos anonimizados sobre calidad del parque certificado (Observatorio) |
| Sin conocimientos técnicos requeridos | Flujo de revisión guiado (PITR™) | Transparencia del mercado de certificación |
| Proceso rápido y digital | Ciclo de correcciones con el cliente integrado | Incentivo a la calidad: los certificados incorrectos se detectan |
| Dictamen con validez técnica (AT colegiado) | Escalabilidad: gestionar múltiples revisiones simultáneas | Mejora del stock de vivienda (rehabilitación informada) |
| Precio asequible frente al coste de un error | Diferenciación profesional: ofrecer un servicio de auditoría | |

---

## 5. ¿Qué NO pretende ser?

> *Las siguientes exclusiones corresponden a la versión V1 de Certilab Platform. No deben interpretarse como límites permanentes de la plataforma. Versiones futuras podrán incorporar nuevos módulos dentro de la misma arquitectura.*

En V1, Certilab NO es:

- ❌ **Un software de certificación energética.** No calcula letras, no genera certificados oficiales, no sustituye a CE3X, HULC ni ninguna herramienta de certificación.
- ❌ **Un comparador de certificados.** No busca el certificado más barato ni compara precios de certificadores.
- ❌ **Un marketplace de certificadores.** No conecta propietarios con certificadores para que emitan certificados nuevos.
- ❌ **Un registro oficial.** No tiene validez administrativa. El dictamen Certilab es una opinión técnica cualificada, no un documento oficial vinculante.
- ❌ **Una herramienta de gestión de comunidades.** No gestiona facturas, derramas ni actas de comunidades de propietarios.
- ❌ **Un CRM inmobiliario.** No gestiona carteras de inmuebles, leads ni procesos de compraventa.
- ❌ **Una consultora energética.** En V1, no realiza auditorías energéticas completas ni propone medidas de rehabilitación (más allá de las implícitas en la detección de errores).

---

## 6. ¿Cuál es la visión a 5 años?

### Visión 2031

> **Certilab es la plataforma de referencia para la auditoría técnica de inmuebles en el mundo hispanohablante, comenzando por la certificación energética como primer módulo. Cualquier propietario que desconfíe de su certificado energético acude a Certilab como primera opción. Cualquier Arquitecto Técnico utiliza Certilab como herramienta profesional de auditoría. El Observatorio Certilab es la fuente de datos más citada sobre el estado real de la certificación energética en el mundo hispanohablante.**

### Hitos a 5 años

| Año | Hito |
|-----|------|
| **2026** | MVP V1 lanzado. Primer módulo (auditoría de certificados energéticos) operativo. Flujo completo propietario → AT → dictamen. Primeros 100 expedientes. |
| **2027** | V2 con IA asistente. 500 expedientes/mes. Observatorio con 3 informes publicados. |
| **2028** | V3 SaaS multitécnico. Nuevos módulos de inspección. 50+ ATs usando la plataforma. Expansión a Latinoamérica (México, Colombia, Chile). |
| **2029** | V4 IA proactiva. 2.000 expedientes/mes. API pública. Integración con portales inmobiliarios (Idealista, Fotocasa). |
| **2030-2031** | Liderazgo de mercado en España. Posicionamiento como estándar de facto de verificación técnica de inmuebles. Datos del Observatorio utilizados por administraciones públicas y centros de investigación. |

### Principios estratégicos a 5 años

1. **Independencia**: Certilab no certifica ni emite certificados energéticos en V1. No competirá con sus clientes (ATs) ni con las certificadoras. La plataforma mantendrá su independencia como principio fundacional.
2. **Calidad**: Cada dictamen es firmado por un AT colegiado. No se automatiza la decisión final.
3. **Transparencia**: El Observatorio publica datos anonimizados del mercado, incluyendo la tasa de errores detectados.
4. **Escalabilidad**: La plataforma está diseñada para crecer desde 1 AT hasta 1.000+ y desde 1 módulo hasta N módulos sin reescribir la arquitectura.
5. **Datos como activo**: El Observatorio es el moat competitivo. A más expedientes, más datos, más valor para el mercado.

---

## 7. Métricas de éxito (OKRs fundacionales)

| Objetivo | KR | Horizonte |
|----------|----|-----------|
| Validar demanda | 100 expedientes completados | 6 meses post-lanzamiento |
| Satisfacción cliente | NPS ≥ 50 | 12 meses |
| Calidad del servicio | Tasa de error en dictámenes < 1% | Continuo |
| Visibilidad de marca | 10.000 visitas/mes al blog + landings | 12 meses |
| Eficiencia AT | Tiempo medio por expediente < 48h | 6 meses |
| Masa crítica Observatorio | 500 expedientes anonimizados | 18 meses |

---

*Fin del documento PRODUCT-VISION.md*