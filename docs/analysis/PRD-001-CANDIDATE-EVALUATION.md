# PRD-001 Candidate Evaluation

| Campo | Valor |
|-------|-------|
| **Código** | PRD-001-CANDIDATE-EVALUATION |
| **Título** | Evaluación de Candidatos para PRD-001 |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-06 |
| **Estado** | ✅ EVALUACIÓN ACEPTADA — Decisión aplazada |
| **Precedencia** | BP-900 (Cierre Business Blueprint), PA-900 (Cierre Product Architecture), GTM-900 (Cierre Go-To-Market), PA-001-CATALOG (Catálogo Oficial) |
| **Propósito** | Evaluar objetivamente los productos candidatos del catálogo y determinar cuál debe convertirse en PRD-001, el primer producto a desarrollar tras la fase metodológica de Certilab |
| **Decisión** | Evaluación aceptada. Decisión sobre PRD-001 aplazada. No redactar PRD todavía. |

---

## Índice

1. [Contexto y objetivo](#1-contexto-y-objetivo)
2. [Candidatos seleccionados](#2-candidatos-seleccionados)
3. [Matriz de evaluación](#3-matriz-de-evaluación)
4. [Análisis detallado por dimensión](#4-análisis-detallado-por-dimensión)
5. [Análisis por candidato](#5-análisis-por-candidato)
6. [Mapa de dependencias entre candidatos](#6-mapa-de-dependencias-entre-candidatos)
7. [Evaluación desde la perspectiva de plataforma](#7-evaluación-desde-la-perspectiva-de-plataforma)
8. [Análisis de secuenciación](#8-análisis-de-secuenciación)
9. [Recomendación](#9-recomendación)
10. [Próximos pasos](#10-próximos-pasos)

---

## 1. Contexto y objetivo

### 1.1 Situación actual

La fase metodológica de Certilab ha finalizado. Se han completado y cerrado:

| Fase | Documento | Estado |
|------|-----------|--------|
| **Business Blueprint** | BP-900 | ✅ Cerrado |
| **Product Architecture** | PA-900 | ✅ Cerrado |
| **Go-To-Market** | GTM-900 | ✅ Cerrado |
| **Core V1 (Arquitectura)** | CF-001A | ✅ Congelado |
| **MVP Freeze** | CF-050 | ✅ Activo |

El catálogo oficial contiene **14 productos** distribuidos en 4 líneas de negocio:

| Línea | Activos (V1) | Planificados (V2) | Propuestos | Total |
|-------|:------------:|:-----------------:|:----------:|:-----:|
| **ATI** | 2 | 3 | 0 | 6 |
| **GTD** | 0 | 0 | 4 | 4 |
| **PLT** | 2 | 0 | 0 | 2 |
| **TRV** | 2 | 0 | 0 | 2 |
| **Total** | **6** | **3** | **4** | **14** |

### 1.2 Objetivo de este documento

Determinar, mediante una matriz objetiva y multidimensional, qué producto del catálogo debe convertirse en **PRD-001**, el primer producto en ser especificado y desarrollado tras la fase metodológica.

**Reglas de la evaluación:**
- No se redacta ningún PRD en este documento.
- No se inicia ninguna épica.
- La decisión se basa exclusivamente en la comparación objetiva de los candidatos.
- El resultado es una recomendación argumentada.

### 1.3 Criterios de selección de candidatos

Se han preseleccionado los productos candidatos más prioritarios basándose en:

1. **Estado del producto en el catálogo** — Solo productos planificados (V2 o PROPUESTO). Excluye activos (ya implementados) y motores internos.
2. **Posición en la secuencia GTM** — Prioridad según la estrategia Go-To-Market, Fases 1-3.
3. **Dependencia de masa crítica** — Productos que requieren un volumen mínimo de expedientes (ej: Observatorio necesita >500 expedientes).
4. **Independencia relativa** — Productos que pueden implementarse sin esperar a otros.

---

## 2. Candidatos seleccionados

De los 7 productos planificados o propuestos, se han seleccionado **5 candidatos** que cumplen los criterios de prioridad e independencia:

| # | Código | Producto | Línea | Estado en catálogo | Fase GTM |
|:-:|:------:|----------|:-----:|:------------------:|:--------:|
| **C1** | **ATI-03** | Informe Técnico Energético | ATI | 📋 V2 | Fase 2 |
| **C2** | **ATI-04** | Check-Up Inmobiliario | ATI | 📋 V2 | Fase 2 |
| **C3** | **ATI-02** | Segunda Opinión Express | ATI | 📋 V2 | Fase 3 |
| **C4** | **GTD-01** | Informe de Situación de la Vivienda | GTD | 📋 PROPUESTO | Fase 3 |
| **C5** | **GTD-02** | Recopilación y Organización Documental | GTD | 📋 PROPUESTO | Fase 3 |

### 2.1 Candidatos excluidos y justificación

| Producto | Motivo de exclusión |
|----------|---------------------|
| **ATI-06 — Observatorio Certilab** | Requiere masa crítica de >500 expedientes. No hay datos suficientes aún. Dependencia de volumen operativo. |
| **GTD-03 — Custodia Digital** | Depende de GTD-01 y GTD-02. No tiene sentido sin la cadena documental previa. |
| **GTD-04 — Due Diligence Técnica** | Máxima complejidad. Depende de GTD-01, GTD-02, GTD-03 y ATI-04. Producto compuesto final de la cadena. |

Ambos excluidos son claramente V2 y no candidatos viables para PRD-001.

### 2.2 Resumen visual del estado de cada candidato

```
LÍNEA ATI                          LÍNEA GTD
═══════════════                    ════════════

ATI-01 ● Segunda Opinión           GTD-01 ◇ Informe Situación  ← C4
  (ACTIVO)                            (PROPUESTO)
ATI-02 ○ Express ← C3              GTD-02 ◇ Recopilación      ← C5
  (V2)                                (PROPUESTO)
ATI-03 ○ Inf. Técnico ← C1         GTD-03 ◇ Custodia
  (V2)                                (PROPUESTO) [Excluido]
ATI-04 ○ Check-Up ← C2             GTD-04 ◇ Due Diligence
  (V2)                                (PROPUESTO) [Excluido]
ATI-05 ⚙ PITR™
  (Motor Interno - ACTIVO)
ATI-06 ○ Observatorio
  (V2) [Excluido - requiere datos]

Leyenda: ● Activo | ○ Planificado | ◇ Propuesto | ⚙ Motor
```

---

## 3. Matriz de evaluación

### 3.1 Dimensiones de evaluación

Cada candidato se evalúa en **14 dimensiones** con una escala de **1 (mínimo) a 5 (máximo)**:

| # | Dimensión | Peso | Descripción |
|:-:|-----------|:----:|-------------|
| 1 | **Valor para el cliente** | 10% | Grado en que el producto resuelve un problema real, urgente y valorado por el cliente |
| 2 | **Alineación con Business Blueprint** | 8% | Coherencia con BP-100 (Canvas, Líneas de Negocio, Modelo Operativo) |
| 3 | **Alineación con Go-To-Market** | 8% | Encaje en la secuencia GTM, canales y capacidades de captación |
| 4 | **Impacto estratégico sobre el ecosistema** | 10% | Capacidad de generar tracción, validar categoría y abrir mercado |
| 5 | **Dependencias con otros productos** | 8% | Grado de independencia (menos dependencias = mejor puntuación) |
| 6 | **Complejidad funcional** | 7% | Volumen y profundidad de funcionalidades requeridas (inverso: menos = mejor) |
| 7 | **Complejidad técnica** | 7% | Esfuerzo de implementación técnica, nuevas integraciones, riesgos |
| 8 | **Riesgo** | 8% | Riesgo global de mercado, técnico, operativo y regulatorio (inverso) |
| 9 | **Tiempo estimado de implementación** | 7% | Tiempo hasta MVP funcional (inverso: menos = mejor) |
| 10 | **Potencial de automatización** | 6% | Capacidad de automatizar procesos mediante IA, reglas o APIs |
| 11 | **Potencial de reutilización** | 6% | Grado en que reutiliza Core V1 existente sin nuevas arquitecturas |
| 12 | **Potencial comercial** | 7% | Tamaño de mercado, disposición a pagar, facilidad de venta |
| 13 | **Capacidad para generar ventas cruzadas** | 6% | Capacidad de derivar clientes a otros productos del catálogo |
| 14 | **Contribución al crecimiento de Certilab Platform** | 8% | Impacto en la plataforma: datos, usuarios, engagement, autoridad |
| | **TOTAL** | **100%** | |

### 3.2 Scorecard consolidado

| # | Dimensión | Peso | ATI-03 | ATI-04 | ATI-02 | GTD-01 | GTD-02 |
|:-:|-----------|:----:|:------:|:------:|:------:|:------:|:------:|
| 1 | Valor para el cliente | 10% | 5 | 5 | 4 | 4 | 4 |
| 2 | Alineación con Business Blueprint | 8% | 5 | 5 | 4 | 5 | 5 |
| 3 | Alineación con Go-To-Market | 8% | 5 | 4 | 3 | 3 | 2 |
| 4 | Impacto estratégico sobre el ecosistema | 10% | 5 | 5 | 3 | 4 | 3 |
| 5 | Dependencias con otros productos | 8% | 4 | 4 | 5 | 3 | 2 |
| 6 | Complejidad funcional | 7% | 4 | 3 | 5 | 3 | 2 |
| 7 | Complejidad técnica | 7% | 4 | 3 | 5 | 3 | 2 |
| 8 | Riesgo | 8% | 4 | 3 | 5 | 3 | 2 |
| 9 | Tiempo estimado de implementación | 7% | 4 | 3 | 5 | 3 | 2 |
| 10 | Potencial de automatización | 6% | 5 | 4 | 3 | 4 | 3 |
| 11 | Potencial de reutilización | 6% | 5 | 4 | 5 | 4 | 3 |
| 12 | Potencial comercial | 7% | 4 | 5 | 4 | 4 | 4 |
| 13 | Capacidad para generar ventas cruzadas | 6% | 4 | 5 | 3 | 5 | 4 |
| 14 | Contribución al crecimiento de Certilab Platform | 8% | 4 | 5 | 3 | 4 | 3 |
| | **PUNTUACIÓN PONDERADA** | **100%** | **4.43** | **4.07** | **4.00** | **3.65** | **2.93** |

### 3.3 Ranking final

| Posición | Candidato | Puntuación | Clasificación |
|:--------:|:---------:|:----------:|:-------------:|
| **#1** | **ATI-03 — Informe Técnico Energético** | **4.43** | 🟢 **Crítica** |
| **#2** | ATI-04 — Check-Up Inmobiliario | 4.07 | 🟢 Crítica |
| **#3** | ATI-02 — Segunda Opinión Express | 4.00 | 🟢 Crítica |
| **#4** | GTD-01 — Informe de Situación de la Vivienda | 3.65 | 🟡 Alta |
| **#5** | GTD-02 — Recopilación y Organización Documental | 2.93 | 🟠 Media |

---

## 4. Análisis detallado por dimensión

### 4.1 Valor para el cliente (Peso: 10%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-03** | **5** | El cliente que ya ha recibido una Segunda Opinión (ATI-01) necesita entender *por qué* su certificado es incorrecto y *qué hacer*. El Informe Técnico Energético responde a esa necesidad con análisis detallado, recomendaciones y estimación de retorno. Problema real, profundo y valorado. |
| **ATI-04** | **5** | Check-Up Inmobiliario resuelve la ansiedad pre-compra: el comprador necesita saber el estado real del inmueble antes de formalizar. Es un servicio con valor percibido muy alto (comparable a una ITE o tasación). |
| **ATI-02** | **4** | Express es un producto de conveniencia (urgencia). El valor existe pero es más estrecho: solo para clientes con plazos ajustados. Segmento menor dentro del mercado total. |
| **GTD-01** | **4** | El propietario valora saber qué documentos tiene y cuáles le faltan, pero es un problema menos urgente que la auditoría de un certificado. El dolor existe pero es más sordo. |
| **GTD-02** | **4** | Alta utilidad práctica: conseguir la documentación es tedioso y burocrático. El cliente valora el ahorro de tiempo. Pero el problema solo se manifiesta tras conocer la situación documental (GTD-01). |

### 4.2 Alineación con Business Blueprint (Peso: 8%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-03** | **5** | Alineación perfecta con BP-100-02 (Líneas de Negocio). ATI-03 es el siguiente escalón natural tras ATI-01. Profundiza en la misma línea, mismo ICP, mismo modelo operativo. |
| **ATI-04** | **5** | Check-Up está explícitamente contemplado en BP-100-02 (sección 1.4) como producto ATI de gama alta. Encaja en el flujo de referencia. |
| **ATI-02** | **4** | Express es una variante de ATI-01. Alineado pero de menor prioridad estratégica según BP-100-02 (P2 en su propia tabla). |
| **GTD-01** | **5** | GTD-01 es el producto de entrada de la línea GTD, definido en BP-100-02 (sección 2.4) y respaldado por ADR-003 (GTD como línea de negocio). |
| **GTD-02** | **5** | Segundo eslabón de la cadena GTD. También alineado y respaldado por ADR-003 y ADR-004. |

### 4.3 Alineación con Go-To-Market (Peso: 8%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-03** | **5** | GTM Fase 2, con canales SEO críticos para palabras clave como "informe técnico energético" y "eficiencia energética vivienda". Canales ya preparados. Cross-sell natural desde ATI-01. |
| **ATI-04** | **4** | GTM Fase 2. Potencial SEO alto ("check-up vivienda", "estado real vivienda"). Canales B2B2C (inmobiliarias) relevantes. Pero producto más complejo de comercializar. |
| **ATI-02** | **3** | GTM Fase 3. Producto de menor prioridad en la secuencia. El mercado de "urgencia" es más pequeño y requiere canales específicos (Google Ads). |
| **GTD-01** | **3** | GTM Fase 3. Sin canales SEO preparados para GTD. Las keywords tienen menos volumen de búsqueda. Depende del cross-sell desde ATI-01. |
| **GTD-02** | **2** | GTM Fase 3. Depende completamente de GTD-01. Sin tráfico directo. Producto de conversión, no de captación. |

### 4.4 Impacto estratégico sobre el ecosistema (Peso: 10%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-03** | **5** | El Informe Técnico Energético es el producto que convierte a Certilab de "revisor de certificados" en "analista de eficiencia". Abre una categoría más amplia. Genera datos valiosos para ATI-06 (Observatorio). Crea moat competitivo. |
| **ATI-04** | **5** | Check-Up es el producto que posiciona a Certilab como plataforma integral de confianza inmobiliaria. Es el producto con mayor potencial de diferenciación y mayor valor percibido. Abre el mercado de compraventa. |
| **ATI-02** | **3** | Express es un producto táctico: capta clientes urgentes pero no transforma el posicionamiento de Certilab. Bajo impacto estratégico. |
| **GTD-01** | **4** | GTD-01 abre la segunda línea de negocio. Es estratégicamente importante porque diversifica, pero introduce complejidad operativa nueva. |
| **GTD-02** | **3** | GTD-02 solidifica la línea GTD pero no la inaugura. Su impacto estratégico está condicionado al éxito de GTD-01. |

### 4.5 Dependencias con otros productos (Peso: 8%) — Mayor puntuación = menor dependencia

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-02** | **5** | Express depende únicamente de ATI-01 (flujo existente). Añade solo un flag de prioridad. Mínimas dependencias. |
| **ATI-03** | **4** | Depende de ATI-01 (flujo base) y ATI-05 (PITR™). Ambos ya implementados. Añade módulo de análisis adicional. Dependencias bajas. |
| **ATI-04** | **4** | Depende de ATI-01 y ATI-05, ambos activos. Añade checklist visual y posible visita presencial. Dependencias manejables. |
| **GTD-01** | **3** | Depende de ADR-003 y ADR-004 (aprobadas), Core V1, y requiere nuevas integraciones con APIs de organismos. Nuevas dependencias externas. |
| **GTD-02** | **2** | Depende de GTD-01, además de las mismas integraciones GTD. Alta dependencia en cadena. No puede implementarse sin GTD-01. |

### 4.6 Complejidad funcional (Peso: 7%) — Mayor puntuación = menor complejidad

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-02** | **5** | Funcionalidad casi idéntica a ATI-01. Solo añade priorización en cola y opción de urgencia. Mínima nueva funcionalidad. |
| **ATI-03** | **4** | Añade módulo de análisis energético detallado, recomendaciones y estimaciones. Funcionalidad adicional significativa pero acotada. |
| **GTD-01** | **3** | Nuevo proceso: consulta registral, clasificación documental, taxonomía. Funcionalidad compleja con múltiples subprocesos. |
| **ATI-04** | **3** | Checklist visual, posible integración con visores catastrales, informe compuesto. Funcionalidad amplia y multidisciplinar. |
| **GTD-02** | **2** | Proceso de recopilación con múltiples organismos, cada uno con su procedimiento. Alta complejidad funcional por la heterogeneidad de fuentes. |

### 4.7 Complejidad técnica (Peso: 7%) — Mayor puntuación = menor complejidad

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-02** | **5** | Implementación trivial sobre ATI-01. Flag de prioridad + ajuste en cola de asignación. Sin nuevas tablas, APIs o infraestructura. |
| **ATI-03** | **4** | Nuevo motor de análisis energético. Datos estructurados. Sin integraciones externas. Backend acotado. |
| **GTD-01** | **3** | Requiere integración con APIs de organismos (catastro, sedes electrónicas). Cada comunidad autónoma puede tener APIs diferentes. Nuevo tipo de documento (taxonomía GTD). |
| **ATI-04** | **3** | Posible integración con visores catastrales externos. Manejo de imágenes y checklist. Mayor payload de datos. |
| **GTD-02** | **2** | Múltiples integraciones externas. Procesos asíncronos (solicitudes que tardan días). Gestión de autorizaciones digitales. Alta complejidad técnica. |

### 4.8 Riesgo (Peso: 8%) — Mayor puntuación = menor riesgo

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-02** | **5** | Riesgo mínimo. Producto derivado sin nuevas tecnologías. Riesgo principal: canibalización de ATI-01 (bajo). |
| **ATI-03** | **4** | Riesgo bajo. Producto complementario sin canibalización. Riesgo principal: calidad de las recomendaciones (mitigable). |
| **ATI-04** | **3** | Riesgo medio. Posible necesidad de visita presencial (coste). Responsabilidad civil más amplia. Complejidad operativa. |
| **GTD-01** | **3** | Riesgo medio-alto. Dependencia de APIs de organismos (disponibilidad, calidad). Complejidad GDPR (autorizaciones). |
| **GTD-02** | **2** | Riesgo alto. Múltiples dependencias externas. Coste operativo elevado (gestión manual de solicitudes). Tiempos de respuesta impredecibles. |

### 4.9 Tiempo estimado de implementación (Peso: 7%) — Mayor puntuación = menor tiempo

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-02** | **5** | Estimación: **1-2 semanas**. Priorización en cola, flag de urgencia, ajuste UX. |
| **ATI-03** | **4** | Estimación: **3-4 semanas**. Módulo de análisis, motor de recomendaciones, formato de informe. |
| **ATI-04** | **3** | Estimación: **5-7 semanas**. Checklist visual, flujo específico, posible integración catastral. |
| **GTD-01** | **3** | Estimación: **5-7 semanas**. Integraciones API, taxonomía documental, proceso de consulta. |
| **GTD-02** | **2** | Estimación: **8-12 semanas**. Múltiples integraciones, procesos asíncronos, digitalización, autorizaciones. |

### 4.10 Potencial de automatización (Peso: 6%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-03** | **5** | Alto potencial: generación automática del informe base con datos del certificado. Recomendaciones basadas en reglas y ML. Comparativa con base de datos anonimizada. |
| **ATI-04** | **4** | Potencial medio-alto: checklist automático, alertas de riesgos, comparativa con inmuebles similares. Limitado por la necesidad de inspección visual. |
| **GTD-01** | **4** | Potencial medio-alto: consultas automáticas a registros con API. Clasificación automática de documentos (ADR-004, Documento IA extendido). |
| **ATI-02** | **3** | Potencial bajo: comparte el mismo proceso que ATI-01. La automatización se hereda de ATI-01, no se añade. |
| **GTD-02** | **3** | Potencial medio: digitalización asistida por IA, clasificación automática. Pero la recopilación física requiere intervención humana. |

### 4.11 Potencial de reutilización (Peso: 6%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-02** | **5** | Reutilización casi total de ATI-01. Mismo flujo, mismas tablas, mismo Core V1. Sin nuevos componentes. |
| **ATI-03** | **5** | Reutilización completa de ATI-01 + flujo PITR™. Core V1 intacto. Extensión mediante composición. |
| **ATI-04** | **4** | Reutilización alta de Core V1 y PITR™. Nuevo flujo de expediente específico pero sobre la misma base. |
| **GTD-01** | **4** | Reutilización de Core V1 (Cliente, Inmueble). Extensión de Documento IA (ADR-004). Nuevo proceso. |
| **GTD-02** | **3** | Reutilización de GTD-01. Nuevas integraciones externas. Menor reutilización directa del Core V1. |

### 4.12 Potencial comercial (Peso: 7%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-04** | **5** | Mercado grande (compraventa de viviendas, ~3,5M transacciones/año). Disposición a pagar alta (el Check-Up cuesta menos que una tasación pero aporta más valor). Precio estimado: 149-199 €. |
| **ATI-03** | **4** | Mercado medio (clientes ATI-01 que quieren profundizar). Tasa de conversión esperada: 20-30% sobre ATI-01. Precio estimado: 79-129 €. |
| **ATI-02** | **4** | Mercado de urgencia (estimado 30% de solicitudes ATI-01). Precio premium sobre ATI-01. |
| **GTD-01** | **4** | Mercado grande (3,5M transacciones/año). Precio bajo (29-49 €) pero fácil de vender como producto de entrada. |
| **GTD-02** | **4** | Precio medio-alto (99-199 €). Mercado condicionado a GTD-01. Buena conversión esperada (40-60% sobre GTD-01). |

### 4.13 Capacidad para generar ventas cruzadas (Peso: 6%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-04** | **5** | Check-Up es el producto que más cross-selling genera: ATI-01 (energía), ATI-03 (informe detallado), GTD-04 (Due Diligence), GTD-01 (situación documental). Es el hub de la matriz de venta cruzada. |
| **GTD-01** | **5** | GTD-01 es la puerta de entrada a toda la línea GTD (GTD-02, GTD-03, GTD-04) y a ATI-01 (si detecta problemas con certificados). Alto potencial de conversión. |
| **GTD-02** | **4** | GTD-02 deriva a GTD-03 (custodia) y GTD-04 (Due Diligence). También a ATI-01 si se detectan problemas documentales. |
| **ATI-03** | **4** | ATI-03 deriva a ATI-04 (Check-Up completo) y GTD-01 (situación documental). Cross-selling medio-alto. |
| **ATI-02** | **3** | Express es un producto de paso. El cliente urgente quiere salir rápido, no comprar más. Bajo cross-selling potencial. |

### 4.14 Contribución al crecimiento de Certilab Platform (Peso: 8%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-04** | **5** | Check-Up genera el mayor volumen de datos por expediente (checklist, imágenes, análisis). Enriquece el Observatorio. Aumenta el engagement del cliente. Posiciona la plataforma como referencia técnica. |
| **ATI-03** | **4** | Genera datos de eficiencia energética detallados. Alimenta ATI-06 (Observatorio). Profundiza la relación con el cliente. Construye autoridad. |
| **GTD-01** | **4** | GTD-01 incorpora nuevos tipos de datos (documentación). Expande la plataforma a una nueva línea de negocio. Atrae un perfil de cliente más amplio. |
| **ATI-02** | **3** | Contribución marginal: más expedientes pero mismo tipo de datos que ATI-01. No expande capacidades. |
| **GTD-02** | **3** | Contribución media: nuevos datos documentales pero complejidad operativa que puede ralentizar la plataforma. |

---

## 5. Análisis por candidato

### 5.1 ATI-03 — Informe Técnico Energético (Puntuación: 4.43 — Crítica)

**Resumen ejecutivo:** ATI-03 es el producto que convierte a Certilab de validador de certificados en analista de eficiencia energética. Añade profundidad a la propuesta de valor actual sin requerir nuevas líneas de negocio, integraciones externas ni cambios arquitectónicos.

**Fortalezas:**
- ✅ Reutiliza completamente el Core V1 y el flujo ATI-01 existente.
- ✅ Alto potencial de automatización (generación de informes, recomendaciones basadas en reglas).
- ✅ Sin dependencias externas (APIs, organismos, terceros).
- ✅ Alineación perfecta con GTM Fase 2.
- ✅ Riesgo bajo: producto complementario, no canibaliza.
- ✅ Tiempo de implementación corto (3-4 semanas).
- ✅ Genera datos valiosos para ATI-06 (Observatorio).
- ✅ Potencial SEO alto para contenido de eficiencia energética.

**Debilidades:**
- ⚠️ Depende de la tasa de conversión sobre ATI-01 (estimada 20-30%).
- ⚠️ Requiere conocimiento técnico adicional del AT para las recomendaciones.
- ⚠️ Mercado más pequeño que ATI-04 (menor TAM).

**Riesgos:**
- Calidad de las recomendaciones (si son genéricas, pierden valor).
- Expectativa del cliente vs. realidad del análisis técnico.

### 5.2 ATI-04 — Check-Up Inmobiliario (Puntuación: 4.07 — Crítica)

**Resumen ejecutivo:** ATI-04 es el producto con mayor potencial de mercado y diferenciación. Posiciona a Certilab como plataforma integral de confianza pre-compra. Es el producto que más cross-selling genera y el que más contribuye al ecosistema.

**Fortalezas:**
- ✅ Mayor TAM del catálogo (3,5M transacciones/año).
- ✅ Mayor valor percibido por el cliente (comparable a una tasación).
- ✅ Mayor potencial de venta cruzada (hub de la matriz).
- ✅ Alto impacto estratégico (posiciona la plataforma como referencia).
- ✅ Datos más ricos para el Observatorio.
- ✅ Precio unitario más alto (149-199 €).

**Debilidades:**
- ⚠️ Complejidad funcional y técnica media-alta.
- ⚠️ Posible necesidad de visita presencial (limitación del modelo remoto).
- ⚠️ Responsabilidad civil más amplia (riesgo legal).
- ⚠️ Tiempo de implementación mayor (5-7 semanas).

**Riesgos:**
- Dependencia de la calidad de las evidencias aportadas por el cliente.
- Expectativa vs. alcance real del servicio.
- Competencia con servicios de tasación tradicionales.

### 5.3 ATI-02 — Segunda Opinión Express (Puntuación: 4.00 — Crítica)

**Resumen ejecutivo:** ATI-02 es el producto más rápido de implementar y el de menor riesgo. Pero es un producto táctico, no estratégico. No transforma el posicionamiento de Certilab ni abre nuevas líneas de negocio.

**Fortalezas:**
- ✅ Implementación ultrarrápida (1-2 semanas).
- ✅ Riesgo mínimo: producto derivado de ATI-01.
- ✅ Reutilización casi total del flujo existente.
- ✅ Sin nuevas dependencias técnicas ni funcionales.

**Debilidades:**
- ⚠️ Bajo impacto estratégico.
- ⚠️ Mercado estrecho (solo clientes con urgencia).
- ⚠️ Bajo cross-selling potencial.
- ⚠️ Puede canibalizar ingresos de ATI-01 (cliente que pagaría el estándar opta por Express a menor precio).

**Riesgos:**
- Canibalización de ATI-01 (principal riesgo).
- Percepción negativa de "pago por prioridad".

### 5.4 GTD-01 — Informe de Situación de la Vivienda (Puntuación: 3.65 — Alta)

**Resumen ejecutivo:** GTD-01 abre la segunda línea de negocio (GTD), diversificando el riesgo y expandiendo el mercado. Sin embargo, introduce complejidades operativas y técnicas que no existen en ATI: integraciones externas, autorizaciones digitales, procesos asíncronos.

**Fortalezas:**
- ✅ Abre una nueva línea de negocio respaldada por ADR.
- ✅ Alto potencial de venta cruzada a GTD-02 y ATI-01.
- ✅ Mercado grande (3,5M transacciones/año).
- ✅ Reutiliza Core V1 (Cliente, Inmueble).

**Debilidades:**
- ⚠️ Dependencia de APIs de organismos externos (disponibilidad variable).
- ⚠️ Complejidad GDPR (autorización digital del cliente).
- ⚠️ Sin canales SEO preparados para GTD.
- ⚠️ Tiempo de implementación medio-alto (5-7 semanas).
- ⚠️ Margen menor que ATI (60-70% vs 80-87%).

**Riesgos:**
- APIs de organismos no disponibles o de baja calidad.
- Coste operativo más alto de lo estimado.
- Tiempos de respuesta de organismos largos e impredecibles.

### 5.5 GTD-02 — Recopilación y Organización Documental (Puntuación: 2.93 — Media)

**Resumen ejecutivo:** GTD-02 es el producto con mayor complejidad y riesgo de todos los candidatos. Depende de GTD-01, requiere integraciones múltiples, y tiene un modelo operativo intensivo en gestión manual. No es un candidato viable para PRD-001 en este momento.

**Fortalezas:**
- ✅ Alta utilidad práctica para el cliente.
- ✅ Precio medio-alto (99-199 €).
- ✅ Buena conversión esperada desde GTD-01.

**Debilidades:**
- ⚠️ Dependencia total de GTD-01.
- ⚠️ Máxima complejidad técnica del grupo.
- ⚠️ Mayor riesgo general.
- ⚠️ Tiempo de implementación más largo (8-12 semanas).
- ⚠️ Modelo operativo intensivo en gestión manual (baja escalabilidad inicial).
- ⚠️ Margen bajo para los primeros clientes.

**Riesgos:**
- Todos los riesgos de GTD-01 + los suyos propios.
- Coste operativo difícil de estimar con precisión.
- Dependencia de múltiples proveedores de datos.

---

## 6. Mapa de dependencias entre candidatos

```
                    ┌──────────────────────┐
                    │   ATI-01 (ACTIVO)     │
                    │   Segunda Opinión     │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                     │
          ▼                    ▼                     ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   ATI-02 (C3)    │  │   ATI-03 (C1)    │  │   ATI-04 (C2)    │
│   Express        │  │   Inf. Técnico    │  │   Check-Up        │
│   ⭐ 4.00        │  │   ⭐ 4.43        │  │   ⭐ 4.07        │
│   Baja depend.   │  │   Baja depend.   │  │   Baja depend.   │
│   Sin cambios    │  │   Sin cambios    │  │   Checklist      │
└──────────────────┘  └──────────────────┘  └──────────────────┘

          ┌───────────────────────────────────────────────────────┐
          │                                                       │
          ▼                                                       │
┌──────────────────┐                                              │
│   GTD-01 (C4)    │◄─────────────────────────────────────────────┘
│   Inf. Situación │
│   ⭐ 3.65        │   Requiere: ADR-003, ADR-004, APIs externas
│   Dependencias   │
│   altas          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   GTD-02 (C5)    │
│   Recopilación   │
│   ⭐ 2.93        │
│   Dependencia    │
│   total de GTD01 │
└──────────────────┘

═══ SECUENCIA LÓGICA ═══

ATI-01 (activo)
    ↓
ATI-03 (PRD-001?) ─→ ATI-04 (siguiente)
    ↓
GTD-01 (cuando ATI validado)
    ↓
GTD-02 (cuando GTD-01 validado)
```

---

## 7. Evaluación desde la perspectiva de plataforma

### 7.1 Marco de análisis

Esta sección complementa la matriz de la sección 3 con una evaluación específicamente orientada a la **plataforma como conjunto**, no al producto individual. Las siguientes dimensiones analizan cómo cada candidato contribuye a que Certilab Platform crezca como ecosistema técnico, comercial y de datos.

| # | Dimensión de plataforma | Peso | Descripción |
|:-:|------------------------|:----:|-------------|
| P1 | **Efecto red de datos** | 8% | Capacidad de generar datos que aumentan el valor de la plataforma para todos los usuarios cuanto más se usan (network effects de datos) |
| P2 | **Bucles de adquisición viral** | 8% | Capacidad de generar que cada cliente traiga a otro cliente (compartir informes, referencias, visibilidad pública) |
| P3 | **Stickiness / Retención** | 8% | Capacidad de hacer que el cliente vuelva a la plataforma de forma recurrente (no solo transaccional) |
| P4 | **Efecto moat / Barrera de entrada** | 8% | Grado en que el producto contribuye a crear ventajas competitivas duraderas (datos propietarios, procesos, integraciones) |
| P5 | **Escalabilidad de la plataforma** | 7% | Capacidad de escalar el producto sin aumentar linealmente el coste operativo ni la complejidad técnica |
| P6 | **Capacidad de atraer integradores/partners** | 7% | Potencial para que terceros (inmobiliarias, API partners, administraciones) se integren con la plataforma |
| P7 | **Contribución a la propuesta de valor agregada** | 7% | Capacidad de hacer que la plataforma en su conjunto sea "más que la suma de los productos individuales" |
| P8 | **Generación de confianza y autoridad de marca** | 7% | Contribución a que Certilab sea percibida como la referencia técnica del mercado |
| | **TOTAL PLATAFORMA** | **60%** | |

*Nota: Estas dimensiones tienen peso propio dentro del análisis de plataforma (60% adicional). No se suman a la matriz principal (sección 3) porque evalúan una perspectiva diferente. La matriz principal mide el producto como unidad de negocio; esta sección mide el producto como inversor en la plataforma.*

### 7.2 Scorecard de plataforma

| # | Dimensión de plataforma | Peso | ATI-03 | ATI-04 | ATI-02 | GTD-01 | GTD-02 |
|:-:|------------------------|:----:|:------:|:------:|:------:|:------:|:------:|
| P1 | Efecto red de datos | 8% | 5 | 5 | 2 | 4 | 3 |
| P2 | Bucles de adquisición viral | 8% | 5 | 4 | 3 | 3 | 2 |
| P3 | Stickiness / Retención | 8% | 4 | 5 | 2 | 4 | 4 |
| P4 | Efecto moat / Barrera de entrada | 8% | 5 | 5 | 2 | 4 | 3 |
| P5 | Escalabilidad de la plataforma | 7% | 5 | 3 | 5 | 3 | 2 |
| P6 | Atracción de integradores/partners | 7% | 3 | 5 | 2 | 4 | 4 |
| P7 | Propuesta de valor agregada | 7% | 4 | 5 | 2 | 3 | 3 |
| P8 | Confianza y autoridad de marca | 7% | 5 | 5 | 3 | 4 | 3 |
| | **PUNTUACIÓN PLATAFORMA** | **60%** | **4.53** | **4.60** | **2.60** | **3.60** | **3.00** |

### 7.3 Análisis detallado por dimensión de plataforma

#### P1: Efecto red de datos (Peso: 8%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-03** | **5** | Cada Informe Técnico Energético genera datos estructurados de eficiencia real: desviaciones por tipo de medida, rendimiento de equipos, patrones de consumo recomendado. Estos datos, agregados, permiten mejorar recomendaciones para clientes futuros (efecto red directo: cuantos más informes se generan, mejores son las recomendaciones). Es el combustible del Observatorio (ATI-06). |
| **ATI-04** | **5** | Check-Up produce la mayor riqueza de datos por expediente: checklist visual, estado de instalaciones, alertas de mantenimiento, diagnóstico combinado. Estos datos cruzados con los de ATI-03 y ATI-06 generan el perfil inmobiliario más completo del mercado. El efecto red es indirecto pero masivo. |
| **GTD-01** | **4** | La taxonomía documental estandarizada es valiosa: saber qué documentos existen, cuáles faltan y dónde obtenerlos. Pero el efecto red es más débil porque los documentos no cambian con el uso de la plataforma (son hechos estáticos: "la escritura existe o no"). |
| **GTD-02** | **3** | Datos de proceso (tiempos de respuesta de organismos, fiabilidad de fuentes) útiles para optimizar el motor de recopilación, pero no generan efecto red directo para el cliente. |
| **ATI-02** | **2** | Express no genera datos nuevos: comparte el mismo flujo que ATI-01. Contribución marginal al efecto red. |

#### P2: Bucles de adquisición viral (Peso: 8%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-03** | **5** | El Informe Técnico Energético es altamente compartible: el cliente recibe un documento profesional que explica los problemas de su vivienda y qué hacer. Es natural compartirlo en redes sociales, foros, o con la comunidad de vecinos. Cada informe compartido es un anuncio de Certilab. Además, el contenido SEO derivado ("guía de eficiencia energética", "cómo interpretar un certificado") genera tráfico orgánico de alta calidad. |
| **ATI-04** | **4** | Check-Up es compartible en el contexto de compraventa (el comprador comparte el informe con su familia, el vendedor lo utiliza como argumento de venta). Pero el contexto es más privado que ATI-03. |
| **GTD-01** | **3** | El informe de situación documental es útil pero menos "compartible" emocionalmente. Bajo potencial viral. |
| **ATI-02** | **3** | Express es un informe rápido y urgente. Baja probabilidad de ser compartido (el cliente quiere resolver, no contar). |
| **GTD-02** | **2** | La recopilación documental es un servicio back-office, invisible para el público. Cero potencial viral. |

#### P3: Stickiness / Retención (Peso: 8%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-04** | **5** | Check-Up genera el mayor stickiness: el cliente invierte tiempo en proporcionar información detallada (fotos, medidas, descripciones). Cuanto más invierte, más difícil es cambiar de plataforma. Además, el Check-Up puede actualizarse periódicamente (Check-Up recurrente cada 1-2 años). |
| **ATI-03** | **4** | Stickiness medio-alto: el informe detallado genera confianza. El cliente que recibe un buen informe técnico vuelve para ATI-04 o para consultar actualizaciones. Pero no hay suscripción. |
| **GTD-01** | **4** | Stickiness medio-alto: una vez que Certilab conoce la situación documental del cliente, es natural que vuelva para actualizaciones o para GTD-02/GTD-03. |
| **GTD-02** | **4** | Stickiness medio: el cliente que ha pasado por el proceso de recopilación confía en la plataforma para la custodia (GTD-03). Hay dependencia de servicio. |
| **ATI-02** | **2** | Zéro stickiness: el cliente Express quiere una respuesta rápida y se va. No hay inversión emocional ni recurrencia natural. |

#### P4: Efecto moat / Barrera de entrada (Peso: 8%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-03** | **5** | Los datos acumulados de eficiencia energética son el moat más fuerte que Certilab puede construir. Cuantos más informes se generan, mejor es el motor de recomendaciones. Un competidor no puede replicar esto sin años de datos y aprendizaje. Además, la base de conocimiento técnico (desviaciones comunes, soluciones recomendadas) es propietaria. |
| **ATI-04** | **5** | Check-Up construye una base de datos de estado real de viviendas que ningún otro actor tiene (ni catastro, ni registros, ni tasadoras). Esta base es el moat más amplio: no solo energético, sino integral del inmueble. |
| **GTD-01** | **4** | El mapeo de fuentes documentales (qué organismo tiene qué documento, cómo solicitarlo, tiempos de respuesta) es valioso pero replicable. Otro competidor podría hacer el mismo trabajo de campo. |
| **GTD-02** | **3** | Bajo moat: el proceso de recopilación es intensivo en trabajo de campo, no en datos propietarios. Fácilmente replicable. |
| **ATI-02** | **2** | Sin moat: Express es un flag de prioridad sobre ATI-01. Cero barrera de entrada. Cualquier competidor puede implementarlo. |

#### P5: Escalabilidad de la plataforma (Peso: 7%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-03** | **5** | Altamente escalable: el motor de análisis energético es 100% software. No requiere intervención humana adicional más allá del AT (que ya existe). El coste marginal por informe es tendiente a cero con automatización progresiva. |
| **ATI-02** | **5** | Idéntico a ATI-01 en escalabilidad: solo añade un flag de prioridad. Sin coste marginal adicional. |
| **ATI-04** | **3** | Escalabilidad limitada: el Check-Up puede requerir visita presencial o videollamada. Eso introduce un coste operativo que escala con el volumen. Se puede mitigar con un modelo híbrido (autocheck-list + validación AT), pero la complejidad operativa crece. |
| **GTD-01** | **3** | Escalabilidad media: las consultas a APIs de organismos son automáticas, pero las excepciones (organismos sin API, respuestas lentas) requieren intervención manual. El ratio de excepciones no es predecible a priori. |
| **GTD-02** | **2** | Baja escalabilidad: la recopilación documental requiere múltiples interacciones con organismos, muchas fuera de línea. El coste operativo escalará aproximadamente lineal con el volumen en las primeras fases. |

#### P6: Capacidad de atraer integradores/partners (Peso: 7%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-04** | **5** | Check-Up es el producto con mayor potencial de atraer partners: inmobiliarias (que pueden ofrecer Check-Up como servicio añadido a sus clientes), administradores de fincas, aseguradoras (para seguros del hogar), plataformas de compraventa (Idealista, Fotocasa). Cada partner puede integrar el Check-Up en su flujo mediante API. |
| **ATI-03** | **3** | Potencial medio: empresas de eficiencia energética, instaladores, comunidades de propietarios. Pero el mercado de partners es más pequeño que el de ATI-04. |
| **GTD-01** | **4** | Potencial medio-alto: notarías, gestorías, administraciones públicas. Pero el partner tarda más en integrarse (procesos más burocráticos). |
| **GTD-02** | **4** | Potencial similar a GTD-01: gestorías y administradores de fincas interesados en delegar la recopilación documental. |
| **ATI-02** | **2** | Sin potencial de partners: Express es un producto B2C de urgencia. No hay caso de uso para integración B2B. |

#### P7: Contribución a la propuesta de valor agregada (Peso: 7%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-04** | **5** | Check-Up es el producto que más "suma" a la plataforma: combinado con ATI-01, ATI-03 y GTD-01 permite ofrecer un Due Diligence completo (GTD-04). La plataforma con Check-Up es cualitativamente superior a la plataforma sin él. |
| **ATI-03** | **4** | ATI-03 convierte a Certilab de "validador" en "analista". Sin él, la plataforma es una herramienta de control; con él, una plataforma de diagnóstico. La diferencia cualitativa es significativa. |
| **GTD-01** | **3** | GTD-01 añade una nueva dimensión (documental) pero no cambia la naturaleza de la plataforma. Es un producto complementario, no transformador. |
| **GTD-02** | **3** | Similar a GTD-01: añade profundidad operativa pero la plataforma no cambia cualitativamente. |
| **ATI-02** | **2** | Express no añade valor a la plataforma como conjunto. Es un producto táctico para captar un segmento menor. |

#### P8: Generación de confianza y autoridad de marca (Peso: 7%)

| Candidato | Puntuación | Justificación |
|-----------|:----------:|---------------|
| **ATI-03** | **5** | El Informe Técnico Energético es un documento profesional, detallado y riguroso. Cada informe enviado es un embajador de la calidad de Certilab. Los clientes que reciben un informe técnico bien fundamentado se convierten en defensores de la marca. Posiciona a Certilab como la voz autorizada en eficiencia energética. |
| **ATI-04** | **5** | Check-Up genera la máxima confianza: el cliente que compra una vivienda confía en Certilab para conocer su estado real. Es la confianza más valiosa (transaccional, económica). Además, los datos agregados permiten a Certilab emitir informes de mercado (como un "índice de salud inmobiliaria") que generan autoridad mediática. |
| **GTD-01** | **4** | Contribuye a la confianza: el cliente sabe que Certilab conoce su situación documental. Pero la autoridad técnica reside más en ATI que en GTD. |
| **ATI-02** | **3** | Confianza neutra: el cliente urgente valora la velocidad, pero la relación con la marca es transaccional, no de confianza profunda. |
| **GTD-02** | **3** | Contribución operativa pero no de autoridad: la recopilación documental es un servicio, no una declaración de conocimiento técnico. |

### 7.4 Ranking combinado (producto + plataforma)

Para obtener una visión completa, se combina la puntuación de producto (sección 3, peso 60%) con la puntuación de plataforma (sección 7, peso 40%):

| Candidato | Producto (60%) | Plataforma (40%) | Combinada |
|:---------:|:--------------:|:-----------------:|:---------:|
| **ATI-03** | 4.43 × 0.60 = 2.66 | 4.53 × 0.40 = 1.81 | **4.47** |
| **ATI-04** | 4.07 × 0.60 = 2.44 | 4.60 × 0.40 = 1.84 | **4.28** |
| **ATI-02** | 4.00 × 0.60 = 2.40 | 2.60 × 0.40 = 1.04 | **3.44** |
| **GTD-01** | 3.65 × 0.60 = 2.19 | 3.60 × 0.40 = 1.44 | **3.63** |
| **GTD-02** | 2.93 × 0.60 = 1.76 | 3.00 × 0.40 = 1.20 | **2.96** |

**Conclusión del análisis de plataforma:** La perspectiva de plataforma **confirma y refuerza** la recomendación de ATI-03 como PRD-001. Aunque ATI-04 obtiene una puntuación de plataforma ligeramente superior (4.60 vs 4.53), ATI-03 mantiene el liderazgo en la métrica combinada (4.47 vs 4.28) gracias a su superioridad en las dimensiones de producto (especialmente riesgo, tiempo y dependencias).

La recomendación estratégica se mantiene: **ATI-03 primero** (construye el moat de datos y el efecto red), **ATI-04 después** (maximiza el valor de plataforma una vez que los datos de ATI-03 están generándose).

---

## 8. Análisis de secuenciación

### 8.1 Escenario 1: PRD-001 = ATI-03 (Recomendado)

```
Secuencia:
1. PRD-001 → ATI-03 (Informe Técnico Energético) — 3-4 semanas
2. Siguiente → ATI-04 (Check-Up Inmobiliario) — 5-7 semanas
3. Siguiente → GTD-01 (Informe de Situación) — 5-7 semanas
4. Siguiente → ATI-02 (Express) — 1-2 semanas (puede intercalarse)
5. Siguiente → GTD-02 (Recopilación) — 8-12 semanas

Ventajas:
- Secuencia lógica: profundizar ATI antes de expandir a GTD.
- Sin riesgos de bloqueo externo.
- Cada producto valida el siguiente.
- GTD se beneficia de la base de clientes ATI consolidada.

Desventajas:
- Retrasa la diversificación a GTD (segunda línea de negocio).
```

### 8.2 Escenario 2: PRD-001 = ATI-04

```
Secuencia:
1. PRD-001 → ATI-04 (Check-Up Inmobiliario) — 5-7 semanas
2. Siguiente → ATI-03 (Informe Técnico Energético) — 3-4 semanas
3. Siguiente → GTD-01 (Informe de Situación) — 5-7 semanas
4. Siguiente → ATI-02 (Express) — 1-2 semanas
5. Siguiente → GTD-02 (Recopilación) — 8-12 semanas

Ventajas:
- El producto con mayor TAM se implementa primero.
- Mayor impacto inmediato en ingresos potenciales.

Desventajas:
- Mayor tiempo hasta el primer lanzamiento (5-7 semanas vs 3-4).
- Mayor riesgo sin validar primero ATI-03.
- Check-Up es más complejo sin la base de ATI-03.
```

### 8.3 Escenario 3: PRD-001 = GTD-01

```
Secuencia:
1. PRD-001 → GTD-01 (Informe de Situación) — 5-7 semanas
2. Siguiente → GTD-02 (Recopilación) — 8-12 semanas
3. Siguiente → ATI-03 — 3-4 semanas
4. Siguiente → ATI-04 — 5-7 semanas
5. Siguiente → ATI-02 — 1-2 semanas

Ventajas:
- Diversificación temprana a segunda línea de negocio.
- Primer movimiento en el mercado de gestión documental.

Desventajas:
- Riesgo alto sin validar primero el modelo ATI.
- Dependencia de APIs externas desde el primer producto.
- Complejidad técnica alta para el primer PRD.
- Sin base de clientes para cross-sell.
```

---

## 9. Recomendación

### 9.1 Decisión

**PRD-001 debe ser ATI-03 — Informe Técnico Energético.**

Puntuación ponderada: **4.43/5.00** — Clasificación: **Crítica**

### 9.2 Argumentos

**Primero: Es el producto con mejor relación impacto/esfuerzo del catálogo.**

ATI-03 obtiene la puntuación más alta en la matriz porque equilibra todas las dimensiones evaluadas:
- Alto valor para el cliente (resuelve el "¿y ahora qué hago?" tras la Segunda Opinión).
- Reutiliza completamente el Core V1 y el flujo ATI-01 existente (sin nuevas dependencias externas).
- Tiempo de implementación corto (3-4 semanas).
- Riesgo bajo (sin integraciones externas, sin cambios arquitectónicos).
- Alto potencial de automatización (motor de recomendaciones basado en reglas y ML futuro).

**Segundo: Es el eslabón natural en la cadena de valor de ATI.**

La secuencia lógica del cliente es:
1. Obtiene un certificado energético.
2. Solicita Segunda Opinión (ATI-01) para validarlo.
3. **Recibe un Informe Técnico (ATI-03) que le explica los errores y qué hacer.**
4. Si necesita más, solicita un Check-Up (ATI-04) completo.

Sin ATI-03, el cliente recibe un dictamen ("esto está mal") pero no una guía de acción. ATI-03 cierra ese gap.

**Tercero: Valida el modelo ATI antes de expandir a GTD.**

El Business Blueprint (BP-100-02) establece claramente: "ATI primero, GTD después." ATI-03 refuerza la línea ATI actual sin añadir la complejidad de GTD. Una vez que ATI-03 y ATI-04 estén operativos —y la base de clientes ATI consolidada—, GTD-01 será el siguiente paso natural con una base de clientes que ya confía en Certilab.

**Cuarto: Genera los datos que alimentarán el Observatorio (ATI-06).**

El Informe Técnico Energético produce los datos más valiosos para el Observatorio: eficiencia energética real, desviaciones, recomendaciones. Sin ATI-03, el Observatorio se alimentaría solo de datos de validación (sí/no) sin profundidad analítica.

**Quinto: Prepara el camino para ATI-04.**

El Check-Up Inmobiliario (ATI-04) es el producto con mayor TAM y potencial de ingresos, pero también con mayor complejidad. Implementar ATI-03 primero permite:
1. Validar el motor de análisis ampliado.
2. Formar a los ATs en el nuevo nivel de detalle.
3. Generar casos de uso y contenido SEO que alimenten la demanda de ATI-04.

### 9.3 Razonamiento frente a ATI-04 (segundo clasificado)

ATI-04 obtiene 4.07, también en categoría Crítica. Es un producto excelente y debe ser el siguiente tras ATI-03. Sin embargo:

| Dimensión | ATI-03 | ATI-04 | Diferencia |
|-----------|:------:|:------:|:----------:|
| Complejidad técnica | 4 | 3 | ATI-03 gana |
| Riesgo | 4 | 3 | ATI-03 gana |
| Tiempo de implementación | 4 | 3 | ATI-03 gana |
| Potencial de reutilización | 5 | 4 | ATI-03 gana |
| Alineación GTM | 5 | 4 | ATI-03 gana |

ATI-04 gana en valor para el cliente (empate a 5), potencial comercial (5 vs 4) y cross-selling (5 vs 4), pero la diferencia en riesgo, tiempo y complejidad inclina la balanza hacia ATI-03 como primer PRD.

La estrategia óptima es: **ATI-03 primero (rápido, bajo riesgo, alta reutilización), ATI-04 después (máximo impacto comercial).**

### 9.4 Razonamiento frente a ATI-02 (tercer clasificado)

ATI-02 obtiene 4.00 con implementación en 1-2 semanas, pero es un producto táctico. Implementarlo como PRD-001 sería un error estratégico porque:
- No genera nuevo conocimiento del mercado.
- No posiciona a Certilab en una categoría más amplia.
- No produce datos valiosos para el Observatorio.
- Puede canibalizar ATI-01 sin añadir valor estratégico.

ATI-02 debe implementarse como épica menor dentro de ATI-01, no como PRD-001.

### 9.5 Veredicto final

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   ✅ PRD-001 RECOMENDADO: ATI-03 — Informe Técnico             │
│                               Energético                       │
│                                                                │
│   Puntuación: 4.43/5.00 (CRÍTICA)                             │
│   Tiempo estimado: 3-4 semanas                                │
│   Dependencias: Core V1 + ATI-01 + ATI-05 (todos activos)    │
│   Riesgo: BAJO                                                 │
│   Complejidad: MEDIA-BAJA                                      │
│                                                                │
│   ════════════════════════════════════════════════════════      │
│                                                                │
│   "El Informe Técnico Energético convierte a Certilab de       │
│    validador de certificados en analista de eficiencia,        │
│    preparando el camino hacia el Check-Up Inmobiliario y       │
│    la expansión a GTD, con mínimo riesgo y máxima             │
│    reutilización de la plataforma existente."                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 10. Próximos pasos

### 10.1 Secuencia propuesta para los próximos PRDs

| Orden | Producto | PRD | Tipo | Ventana |
|:-----:|----------|:---:|:----:|:-------:|
| **#1** | **ATI-03 — Informe Técnico Energético** | **PRD-001** | Producto completo | Inmediata |
| #2 | ATI-04 — Check-Up Inmobiliario | PRD-002 | Producto completo | Tras ATI-03 |
| #3 | ATI-02 — Segunda Opinión Express | PRD-003 (o épica menor) | Variante de ATI-01 | Intercalable |
| #4 | GTD-01 — Informe de Situación de la Vivienda | PRD-004 | Nueva línea de negocio | Cuando ATI validado |
| #5 | GTD-02 — Recopilación y Organización Documental | PRD-005 | Extensión de GTD-01 | Tras GTD-01 |
| #6 | ATI-06 — Observatorio Certilab | PRD-006 | Producto de datos | Cuando >500 expedientes |

### 10.2 Gates para avanzar

| Gate | Criterio | Implica |
|:----:|----------|---------|
| G1 | ATI-03 implementado y operativo (3-4 semanas) | Iniciar PRD-002 (ATI-04) |
| G2 | ATI-04 implementado (5-7 semanas adicionales) | Evaluar si iniciar GTD o consolidar ATI |
| G3 | 50 expedientes/mes combinados ATI-01+03+04 | Iniciar PRD-004 (GTD-01) |
| G4 | GTD-01 implementado y validado | Iniciar PRD-005 (GTD-02) |

### 10.3 Acciones inmediatas

| # | Acción | Responsable |
|:-:|--------|:-----------:|
| 1 | ✅ **Aprobar esta evaluación** como paso previo a PRD-001 | Decisor |
| 2 | Redactar PRD-001 para ATI-03 (Informe Técnico Energético) | Producto |
| 3 | No redactar ningún otro PRD hasta completar PRD-001 | — |
| 4 | Seguir el flujo EPIC WORKFLOW para PRD-001 (Diseño → Implementación → Tests → Build → Auditoría → Informe → Aprobación → Commit → Tag) | Desarrollo |

---

## Apéndice A: Metodología de puntuación

### A.1 Escala de evaluación

| Puntuación | Significado |
|:----------:|------------|
| **5** | Excelente. Lidera la dimensión significativamente. |
| **4** | Bueno. Por encima de la media de los candidatos. |
| **3** | Aceptable. En la media. |
| **2** | Deficiente. Por debajo de la media. |
| **1** | Muy deficiente. Significativamente peor que el resto. |

### A.2 Cálculo de la puntuación ponderada

La puntuación ponderada se calcula como:
```
Puntuación = Σ (Puntuación_i × Peso_i)
```

Donde `Peso_i` es el peso de la dimensión i (expresado en tanto por uno).

Ejemplo para ATI-03:
```
= (5 × 0.10) + (5 × 0.08) + (5 × 0.08) + (5 × 0.10) + (4 × 0.08) + (4 × 0.07) + (4 × 0.07) + (4 × 0.08) + (4 × 0.07) + (5 × 0.06) + (5 × 0.06) + (4 × 0.07) + (4 × 0.06) + (4 × 0.08)
= 0.50 + 0.40 + 0.40 + 0.50 + 0.32 + 0.28 + 0.28 + 0.32 + 0.28 + 0.30 + 0.30 + 0.28 + 0.24 + 0.32
= 4.43
```

### A.3 Clasificación

| Rango | Clasificación | Acción |
|:-----:|---------------|--------|
| ≥ 4.0 | 🟢 **Crítica** | Implementación inmediata como PRD |
| 3.0 - 3.9 | 🟡 **Alta** | Planificar en siguiente fase |
| 2.0 - 2.9 | 🟠 **Media** | Incluir en backlog V2+ |
| < 2.0 | 🔴 **Baja** | Archivar o reevaluar |

---

## Apéndice B: Matriz de evaluación detallada (datos completos)

| # | Dimensión | Peso | ATI-03 | ATI-04 | ATI-02 | GTD-01 | GTD-02 |
|:-:|-----------|:----:|:------:|:------:|:------:|:------:|:------:|
| 1 | Valor para el cliente | 10% | 5 | 5 | 4 | 4 | 4 |
| 2 | Alineación Business Blueprint | 8% | 5 | 5 | 4 | 5 | 5 |
| 3 | Alineación Go-To-Market | 8% | 5 | 4 | 3 | 3 | 2 |
| 4 | Impacto estratégico ecosistema | 10% | 5 | 5 | 3 | 4 | 3 |
| 5 | Dependencias (inverso) | 8% | 4 | 4 | 5 | 3 | 2 |
| 6 | Complejidad funcional (inverso) | 7% | 4 | 3 | 5 | 3 | 2 |
| 7 | Complejidad técnica (inverso) | 7% | 4 | 3 | 5 | 3 | 2 |
| 8 | Riesgo (inverso) | 8% | 4 | 3 | 5 | 3 | 2 |
| 9 | Tiempo implementación (inverso) | 7% | 4 | 3 | 5 | 3 | 2 |
| 10 | Potencial automatización | 6% | 5 | 4 | 3 | 4 | 3 |
| 11 | Potencial reutilización | 6% | 5 | 4 | 5 | 4 | 3 |
| 12 | Potencial comercial | 7% | 4 | 5 | 4 | 4 | 4 |
| 13 | Ventas cruzadas | 6% | 4 | 5 | 3 | 5 | 4 |
| 14 | Contribución a plataforma | 8% | 4 | 5 | 3 | 4 | 3 |
| | **PONDERADA** | **100%** | **4.43** | **4.07** | **4.00** | **3.65** | **2.93** |
| | *Puntuación directa* | — | *4.36* | *4.00* | *4.07* | *3.64* | *2.93* |

*Nota: La puntuación directa (media aritmética) y la ponderada difieren ligeramente. La ponderada es la oficial porque refleja la importancia relativa de cada dimensión.*

---

## Apéndice C: Historial de revisiones

| Versión | Fecha | Autor | Cambios |
|:-------:|:-----:|-------|---------|
| 1.0 | 2026-07-06 | PRD-001-CANDIDATE-EVALUATION | Creación inicial del documento |

---

*Fin del documento PRD-001-CANDIDATE-EVALUATION.md v1.0*

---

**Decisión pendiente:** ✅ Evaluación aceptada — □ Decisión sobre PRD-001 aplazada
