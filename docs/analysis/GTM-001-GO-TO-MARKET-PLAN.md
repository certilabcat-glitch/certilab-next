# GTM-001 — Plan de Trabajo: Go-To-Market

| Campo | Valor |
|-------|-------|
| **Código** | GTM-001 |
| **Título** | Plan de Trabajo — Go-To-Market |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-06 |
| **Estado** | 📋 EN EJECUCIÓN |
| **Precedencia** | PA-900 (Cierre Product Architecture), BP-900 (Cierre Business Blueprint), PA-001-CATALOG (Catálogo de Productos) |
| **Propósito** | Definir y ejecutar la fase de validación comercial del catálogo oficial de productos de Certilab frente al mercado real |
| **Cadena oficial del proyecto** | Business Blueprint → Product Architecture → **Go-To-Market** → PRD → Épica → Desarrollo → Release |

---

## 1. Objetivo

Validar el catálogo oficial de 14 productos frente al mercado real y definir cómo cada producto llegará a sus clientes.

No se trata de diseñar productos desde una perspectiva interna. Se trata de asegurar que cada producto:

- Responde a una necesidad real del mercado.
- Tiene un posicionamiento claro y diferencial.
- Forma parte de un ecosistema comercial coherente.
- Tiene un recorrido completo desde el descubrimiento hasta la fidelización.

---

## 2. Alcance

**Dentro del alcance (GTM-001):**

- Análisis de mercado y arquitectura comercial.
- Buyer Personas completas para cada línea de negocio.
- Análisis competitivo detallado.
- Posicionamiento diferencial de cada producto.
- Estrategia Go-To-Market.
- Customer Journey detallado por producto.
- Estrategia de precios preliminar.
- Estrategia SEO por producto.
- Estrategia de contenidos.
- Estrategia de captación.
- Estrategia de conversión.
- Estrategia de fidelización.
- Matriz de oportunidades de automatización e IA.
- Informe final de validación comercial.

**Fuera del alcance (GTM-001):**

- ❌ No se implementará código.
- ❌ No se modificará el Core.
- ❌ No se abrirán PRDs.
- ❌ No se abrirán nuevas épicas de desarrollo.
- ❌ No se modificarán documentos arquitectónicos existentes.
- ❌ No se implementarán cambios en la plataforma.

---

## 3. Principio rector

Cada producto del catálogo deberá responder como mínimo a estas 9 preguntas:

| # | Pregunta | Implicación estratégica |
|---|----------|------------------------|
| 1 | ¿Quién lo compra? | ICP claro y segmentado |
| 2 | ¿Qué problema resuelve? | Value proposition validada |
| 3 | ¿Qué alternativa utiliza hoy el cliente? | Competitive substitution |
| 4 | ¿Por qué elegiría Certilab? | Diferenciación y ventaja |
| 5 | ¿Cómo nos encontrará? | Canales de adquisición |
| 6 | ¿Qué contenido consumirá antes? | Content funnel / educación |
| 7 | ¿Cuál será su primera acción? | Entry point / conversión |
| 8 | ¿Qué comprará después? | Expansión / cross-sell |
| 9 | ¿Cómo fortalece el ecosistema Certilab? | Network effects / data flywheel |

---

## 4. Líneas de negocio objetivo

### 4.1 ATI — Asistencia Técnica Inmobiliaria (6 productos)

| Código | Producto | Estado | Prioridad GTM |
|--------|----------|--------|:-------------:|
| ATI-01 | Segunda Opinión | ✅ ACTIVO (V1) | 🔴 Crítica |
| ATI-02 | Segunda Opinión Express | 📋 PLANIFICADO (V2) | 🟡 Alta |
| ATI-03 | Informe Técnico Energético | 📋 PLANIFICADO (V2) | 🟡 Alta |
| ATI-04 | Check-Up Inmobiliario | 📋 PLANIFICADO (V2) | 🟡 Alta |
| ATI-05 | PITR™ | ⚙️ MOTOR INTERNO | ⚪ No comercial |
| ATI-06 | Observatorio Certilab | 📋 PLANIFICADO (V2) | 🟢 Media |

### 4.2 GTD — Gestión Técnica Documental (4 productos)

| Código | Producto | Estado | Prioridad GTM |
|--------|----------|--------|:-------------:|
| GTD-01 | Informe de Situación de la Vivienda | 📋 PLANIFICADO (PROPUESTO) | 🟡 Alta |
| GTD-02 | Recopilación y Organización Documental | 📋 PLANIFICADO (PROPUESTO) | 🟡 Alta |
| GTD-03 | Custodia y Conservación Digital | 📋 PLANIFICADO (PROPUESTO) | 🟢 Media |
| GTD-04 | Due Diligence Técnica Inmobiliaria | 📋 PLANIFICADO (PROPUESTO) | 🟢 Media |

### 4.3 PLT — Plataforma (2 productos)

| Código | Producto | Estado | Prioridad GTM |
|--------|----------|--------|:-------------:|
| PLT-01 | Certilab Platform | ✅ ACTIVO (V1) | 🔴 Crítica |
| PLT-02 | Certilab Backoffice | ✅ ACTIVO (V1) | 🟢 Media |

### 4.4 TRV — Transversal (2 productos)

| Código | Producto | Estado | Prioridad GTM |
|--------|----------|--------|:-------------:|
| TRV-01 | Certilab Knowledge Base (CKB™) | ✅ ACTIVO (V1) | 🟡 Alta |
| TRV-02 | Certilab Web Pública | ✅ ACTIVO (V1) | 🔴 Crítica |

---

## 5. Entregables

| # | Entregable | Archivo | Dependencias |
|---|------------|---------|:------------:|
| 1 | Market Architecture | `GTM-001-MARKET-ARCHITECTURE.md` | BP-100-01/02 |
| 2 | Buyer Personas completas | `GTM-001-BUYER-PERSONAS.md` | #1 |
| 3 | Análisis competitivo | `GTM-001-COMPETITIVE-ANALYSIS.md` | #1, #2 |
| 4 | Posicionamiento diferencial | `GTM-001-POSITIONING.md` | #2, #3 |
| 5 | Estrategia Go-To-Market | `GTM-001-GTM-STRATEGY.md` | #1, #3, #4 |
| 6 | Customer Journey detallado | `GTM-001-CUSTOMER-JOURNEY.md` | #2, #5 |
| 7 | Estrategia de precios preliminar | `GTM-001-PRICING.md` | #3, #4 |
| 8 | Estrategia SEO por producto | `GTM-001-SEO.md` | #1, #4, #5 |
| 9 | Estrategia de contenidos | `GTM-001-CONTENT-STRATEGY.md` | #6, #8 |
| 10 | Estrategia de captación | `GTM-001-ACQUISITION.md` | #5, #8, #9 |
| 11 | Estrategia de conversión | `GTM-001-CONVERSION.md` | #6, #10 |
| 12 | Estrategia de fidelización | `GTM-001-RETENTION.md` | #6, #11 |
| 13 | Matriz de automatización e IA | `GTM-001-AUTOMATION-MATRIX.md` | #1, #4, #7 |
| 14 | Informe final de validación comercial | `GTM-900-VALIDATION-REPORT.md` | #1 → #13 |

---

## 6. Flujo de trabajo

```
1. Market Architecture ──────────────────────────────────┐
       │                                                  │
       ▼                                                  │
2. Buyer Personas ───────────────────────────────────────┤
       │                                                  │
       ▼                                                  │
3. Competitive Analysis ─────────────────────────────────┤
       │                                                  │
       ▼                                                  │
4. Positioning ──────────────────────────────────────────┤
       │                                                  │
       ▼                                                  │
5. GTM Strategy ─────────────────────────────────────────┤
       │                                                  │
       ├──→ 6. Customer Journey ─────────────────────────┤
       ├──→ 7. Pricing Strategy ─────────────────────────┤
       │                                                  │
       ▼                                                  │
8. SEO Strategy ─────────────────────────────────────────┤
       │                                                  │
       ▼                                                  │
9. Content Strategy ─────────────────────────────────────┤
       │                                                  │
       ▼                                                  │
10. Acquisition Strategy ────────────────────────────────┤
       │                                                  │
       ▼                                                  │
11. Conversion Strategy ─────────────────────────────────┤
       │                                                  │
       ▼                                                  │
12. Retention Strategy ──────────────────────────────────┤
       │                                                  │
       ▼                                                  │
13. Automation Matrix ───────────────────────────────────┤
       │                                                  │
       ▼                                                  ▼
14. ╔══════════════════════════════════════════════════════╗
    ║       GTM-900 — VALIDATION REPORT                    ║
    ╚══════════════════════════════════════════════════════╝
```

---

## 7. Definition of Done

| # | Criterio | Estado |
|---|----------|--------|
| 1 | Market Architecture documentada y validada | ⬜ |
| 2 | Buyer Personas completas para ATI, GTD, PLT y TRV | ⬜ |
| 3 | Análisis competitivo con competidores directos e indirectos | ⬜ |
| 4 | Posicionamiento diferencial de cada producto | ⬜ |
| 5 | Estrategia GTM definida con canales y tácticas | ⬜ |
| 6 | Customer Journey detallado por producto (5+ etapas) | ⬜ |
| 7 | Estrategia de precios preliminar con rangos | ⬜ |
| 8 | Estrategia SEO con keywords y clusters por producto | ⬜ |
| 9 | Estrategia de contenidos con pilares y calendario | ⬜ |
| 10 | Estrategia de captación con canales y CAC estimado | ⬜ |
| 11 | Estrategia de conversión con funnel y CRO | ⬜ |
| 12 | Estrategia de fidelización con programas y métricas | ⬜ |
| 13 | Matriz de automatización e IA priorizada | ⬜ |
| 14 | Informe final de validación comercial completo | ⬜ |
| 15 | Sin TODO ni FIXME en los archivos de la fase | ⬜ |
| 16 | Aprobación explícita del usuario | ⬜ |

---

## 8. Documentos de referencia

| Documento | Relación |
|-----------|----------|
| `PA-001-CATALOG.md` | Catálogo de 14 productos a validar comercialmente |
| `BP-100-01-BUSINESS-BLUEPRINT-CANVAS.md` | Business Model Canvas (9 bloques) |
| `BP-100-02-LINEAS-DE-NEGOCIO.md` | Líneas ATI y GTD detalladas |
| `BP-100-03-MODELO-OPERATIVO-Y-COMERCIAL.md` | Modelo operativo y comercial |
| `BP-100-04-MARKETING-CUSTOMER-JOURNEY-CRECIMIENTO.md` | Marketing y customer journey base |
| `PA-001-PRODUCT-VALIDATION-CRITERIA.md` | Criterios de validación (5 Gates) |
| `PRODUCT-PERSONAS.md` | Buyer personas existentes (5 perfiles) |
| `PRODUCT-COMPETITORS.md` | Análisis competitivo existente |
| `PRODUCT-VISION.md` | Visión de producto |
| `PRODUCT-POSITIONING.md` | Posicionamiento existente |
| `PRODUCT-ROADMAP.md` | Roadmap de producto |

---

## 9. Directriz metodológica: Investigación basada en evidencia

> Aprobada por el usuario el 2026-07-06. Prioridad sobre cualquier otro aspecto de la fase.

**Todas las conclusiones importantes deben respaldarse con investigación real del mercado.**

Para cada entregable, distinguir claramente entre:

| Categoría | Definición |
|-----------|------------|
| ✅ **Hecho verificado** | Dato contrastado con fuente pública o investigación directa |
| 📊 **Dato obtenido mediante investigación** | Resultado de búsqueda, análisis de competidores, benchmarks |
| 📈 **Tendencia observada** | Patrón identificado en múltiples fuentes o sectores |
| 🔮 **Hipótesis** | Suposición fundamentada pero no verificada |
| 🎯 **Recomendación estratégica** | Propuesta de acción basada en la evidencia anterior |

**Alcance de la investigación:** No limitarse al sector de certificados energéticos. Incluir:

- PropTech
- LegalTech
- Gestorías digitales
- Plataformas documentales
- Due Diligence inmobiliaria
- SaaS B2B
- Automatización documental
- Plataformas de experiencia digital para clientes

**Por cada producto o línea de negocio documentar:** competidores, posicionamiento, público objetivo, modelo de negocio, rango de precios, fortalezas, debilidades, oportunidades de diferenciación, automatización y SEO.

**Principio rector:** Prefiero un documento más lento pero basado en evidencia que un documento muy rápido basado únicamente en suposiciones.

---

## 10. Próximos pasos

1. ✅ **Aprobar este plan de trabajo** (usuario)
2. □ **Ejecutar entregable 1**: Market Architecture (con investigación de mercado)
3. □ → **Ejecutar entregables secuenciales 2 → 13**
4. □ **Generar informe final GTM-900**
5. □ **Aprobación del usuario**
6. □ **Commit + Tag** de la fase GTM-001

---

*Fin del documento GTM-001-GO-TO-MARKET-PLAN.md*
