# DUE DILIGENCE DE INVERSIÓN — CERTILAB

**Rol:** Venture Capital — Fondo de €10M en Serie A  
**Valoración solicitada implícita:** Por determinar (seed/early stage)  
**Solicitud de inversión:** €10M  
**Documento:** Análisis de *todas* las razones para NO INVERTIR  
**Clasificación:** CONFIDENCIAL — Solo uso interno del comité de inversión

---

## ADVERTENCIA

Este documento no es un análisis neutral. Es un **exercise de devil's advocacy** sistemático. Nuestro trabajo como fondo es encontrar por qué NO invertir. Si no encontramos razones suficientes, entonces invertimos. Hemos encontrado 47 razones de peso.

---

## RESUMEN EJECUTIVO PARA EL COMITÉ

**Veredicto: NO INVERTIR en estas condiciones.**

Certilab presenta un caso clásico de **technical over-engineering sin validación de mercado**. El proyecto tiene una documentación excelente, un motor técnico prometedor (PITR™) y una web profesional. Sin embargo, hay **47 banderas rojas** que impiden justificar una inversión de €10M —o incluso de €500K— en su estado actual.

Las 5 razones más graves:

| # | Razón | Impacto en inversión |
|---|-------|---------------------|
| 1 | **Ficción documental**: CF-000 afirma que V1.1 y V1.2 están completos. La realidad es que 0 de los módulos SaaS son funcionales. | MATA CREDIBILIDAD |
| 2 | **0 ingresos, 0 clientes, 0 tracción**: No hay una sola transacción real en el código ni en la infraestructura. | MATA VALIDACIÓN |
| 3 | **MVP sobrediseñado**: Un proyecto con 74 páginas, 6 documentos framework, y un motor de inspección genial... pero sin poder cobrar a un cliente. | MATA PRIORIDADES |
| 4 | **Riesgo regulatorio y de cumplimiento no gestionado**: Sin GDPR, sin auth, sin cifrado, sin consentimiento trackeable. Operar hoy sería ilegal. | MATA VIABILIDAD LEGAL |
| 5 | **Sin equipo**: Proyecto unipersonal. €10M no se gestionan solos. No hay CTO, CPO, Head of Sales, ni siquiera un plan de contratación. | MATA EJECUCIÓN |

---

## RAZÓN #1: FICCIÓN DOCUMENTAL — LO QUE DICE VS LO QUE HAY

### El problema más grave

CF-000-PROJECT-BRAIN.md (la "Constitución" del proyecto) afirma categóricamente que los siguientes módulos están **COMPLETOS**:

> **Sección 16.2 — Módulos terminados**:
> - Autenticación (Supabase Auth) | ✅ Completo
> - Dashboard cliente | ✅ Completo
> - Sistema de expedientes (7 estados) | ✅ Completo
> - Eventos inmutables (14 tipos) | ✅ Completo
> - Backoffice básico | ✅ Completo
> - Integración MyPOS (pagos) | ✅ Completo
> - OCR básico (extraer-certificado) | ✅ Completo
> - PITR™ engine | ✅ Completo
> - Framework documental | ✅ Completo

### La realidad (verificada en el código)

| Módulo | Lo que dice CF-000 | Realidad |
|--------|-------------------|----------|
| Autenticación | ✅ Completo | ❌ No implementada. Sin login real, sin registro, sin JWT |
| Dashboard cliente | ✅ Completo | ❌ Placeholder. Ruta creada, sin datos ni lógica |
| Sistema de expedientes | ✅ Completo | ❌ No implementado. No existe tabla en Supabase, no hay CRUD |
| Eventos inmutables | ✅ Completo | ❌ No implementados. No hay tabla `actividades` en DB |
| Backoffice básico | ✅ Completo | ❌ Placeholder. 5 rutas sin lógica |
| Integración MyPOS | ✅ Completo | ❌ No implementada. Sin webhooks, sin links de pago |
| OCR básico | ✅ Completo | 🟡 Endpoint existe, funcionalidad no probada con PDFs reales |
| PITR™ engine | ✅ Completo | 🟡 Motor funciona, pero persiste en localStorage, no en DB |
| V1.2 Observatorio | ✅ Completo | ❌ No existe. 0 líneas de código implementadas |

### Impacto en inversión: 🔴 MATA LA CREDIBILIDAD

**Pregunta para el comité:** Si la documentación fundacional del proyecto contiene afirmaciones falsas sobre el estado actual, ¿qué más está mal? ¿Podemos confiar en las proyecciones financieras? ¿En el roadmap? ¿En el plan de negocio?

**Esto no es un error menor.** Es una discrepancia sistemática entre lo documentado y lo implementado. En términos de startup, es una **bandera roja de integridad**.

---

## RAZÓN #2: CERO TRACCIÓN — SIN CLIENTES, SIN INGRESOS, SIN VALIDACIÓN

### Evidencia

El proyecto existe desde Q1 2025 (6+ trimestres). En ese tiempo:
- **0 clientes de pago** verificables
- **0 transacciones** en ninguna pasarela
- **0 leads** convertidos a clientes
- **0 expedientes** creados en base de datos
- **0 informes** emitidos
- **0 integraciones MyPOS** activas
- **0 usuarios registrados** en Supabase Auth
- **0 datos** en el Observatorio

### Análisis

| Métrica | Valor | Implicación |
|---------|-------|-------------|
| Tiempo desde inicio | ~18 meses | Suficiente para validar |
| Ingresos generados | €0 | Sin revenue, sin indicios de product-market fit |
| Clientes de pago | 0 | Sin validación de willingness to pay |
| Leads capturados | ¿Algunos? | Sin datos de conversión |
| Tráfico web | Sin GA4 | Sin métricas de audiencia |

### Impacto en inversión: 🔴 MATA LA TESIS DE INVERSIÓN

€10M en una empresa con 0 ingresos y 0 clientes solo se justifica si:
- El mercado es ENORME (validado)
- El equipo es EXTRAORDINARIO (no verificado)
- La tecnología es DIFERENCIADORA Y DEFENDIBLE (parcialmente)
- Hay un plan de GO-TO-MARKET creíble (no existe)

Ninguna de estas condiciones se cumple con la evidencia disponible.

---

## RAZÓN #3: MVP SOBREINGENIERIZADO — TECH EN EXCESO, PRODUCTO DEFICIENTE

### El desequilibrio

| Área | Esfuerzo invertido | Valor generado |
|------|-------------------|----------------|
| Documentación framework | Muy alto (6 documentos) | Cero (sin código que la implemente) |
| Tipos TypeScript (entidades, eventos, estados) | Alto | Mínimo (no hay runtime que los use) |
| Motor PITR™ | Alto | Alto (es el activo valioso) |
| Páginas web (74 rutas) | Muy alto | Medio (tráfico SEO no verificado) |
| Blog (27 artículos) | Alto | Bajo (sin analytics, sin conversión) |
| Scripts SEO (analyze-faq, check-seo, etc.) | Medio | Mínimo (herramientas internas sin impacto directo) |
| Sistema de eventos (14 tipos) | Alto | Cero (no implementado en runtime) |
| Backend funcional (API + DB + auth) | Mínimo | Mínimo (no permite operar) |
| Pagos + facturación | Cero | Cero (sin negocio) |
| Tests | Cero | Cero (sin calidad verificable) |

### Juicio

Este proyecto ha priorizado **documentación sobre ejecución**, **arquitectura sobre producto**, y **SEO sobre ingresos**. Es el patrón típico de un founder técnico que construye lo que le gusta (arquitectura, diseño, documentación) en lugar de lo que el negocio necesita (pagos, onboarding, validación).

### Impacto en inversión: 🟠 ALTO RIESGO DE EJECUCIÓN

€10M requieren capacidad de ejecución probada. El patrón actual sugiere que el founder se pierde en la complejidad técnica antes de llegar al producto mínimo viable. Esto no se corrige con más dinero —se corrige con disciplina de producto, que no está demostrada.

---

## RAZÓN #4: RIESGO REGULATORIO Y DE CUMPLIMIENTO NO GESTIONADO

### Hallazgos

| Requisito | Estado | Riesgo |
|-----------|--------|--------|
| GDPR: Consentimiento trackeable | ❌ No implementado | Multas de hasta 4% facturación anual |
| GDPR: Derecho al olvido | ❌ No implementado | Ídem |
| GDPR: Portabilidad de datos | ❌ No implementado | Ídem |
| GDPR: DPO designado | ❌ No hay evidencia | Obligatorio por ley |
| GDPR: ROPA (Registro de Actividades) | ❌ No hay evidencia | Obligatorio |
| Cifrado en reposo (datos clientes) | ❌ No verificado | Riesgo de brecha |
| Cifrado en tránsito | ✅ Vercel lo gestiona | Parcial |
| Autenticación segura | ❌ No implementada | Acceso no autorizado |
| Control de acceso (RBAC) | ❌ No implementado | Datos expuestos |
| Logs de auditoría | ❌ No implementados | Sin trazabilidad |
| Plan de recuperación ante brecha | ❌ No existe | Sin capacidad de respuesta |
| Póliza de ciberseguro | ❌ No verificable | Exposición financiera |

### ¿Qué implica esto para un inversor?

Si Certilab comenzara a operar mañana:
1. Captaría datos personales (nombre, email, teléfono, dirección) sin consentimiento trackeable.
2. No podría borrar esos datos si un cliente lo solicita.
3. No tendría control de acceso sobre quién ve los expedientes.
4. No podría demostrar cumplimiento ante una auditoría de la AEPD.

**Las multas potenciales (hasta €20M o 4% de facturación) superarían cualquier inversión en fase temprana.**

### Impacto en inversión: 🔴 RIESGO LEGAL EXISTENCIAL

No se puede invertir €10M en una empresa que no puede operar legalmente hoy. El coste de remediación es bajo (~€5K en asesoría GDPR + implementación), pero el hecho de que no se haya hecho es una señal de falta de madurez empresarial.

---

## RAZÓN #5: SIN EQUIPO — PROYECTO UNIPERSONAL

### Análisis de capacidad de ejecución

| Rol | ¿Quién lo ocupa? | Evaluación |
|-----|-----------------|------------|
| Founder/CEO | Sí | Arquitecto técnico, expertise en dominio |
| CTO | No | El founder hace también de CTO |
| Product Manager | No | Nadie prioriza el roadmap |
| Diseñador UX/UI | No | El founder diseñó la web |
| Desarrollador backend | No | Nadie implementa Supabase |
| DevOps | No | Vercel lo gestiona |
| Ventas / BD | No | Nadie vende el producto |
| Marketing / SEO | No | El founder hace SEO |
| Atención al cliente | No | Nadie responde leads |
| Legal / Compliance | No | Sin asesoría legal |

### El problema de €10M en manos de un solo founder

1. **Riesgo de concentración**: Si el founder se pone enfermo, el proyecto muere.
2. **Capacidad de gestión**: Gestionar €10M requiere contratar ~15-20 personas en 12 meses. Un founder sin experiencia en gestión de equipos tiene alta probabilidad de fracaso.
3. **Decisiones unipersonales**: Sin co-founders ni equipo directivo, las decisiones estratégicas carecen de contraste.
4. **Burn rate sin control**: €10M en manos de un solo tomador de decisiones es un riesgo fiduciario.

### Impacto en inversión: 🔴 RIESGO DE EJECUCIÓN Y GOVERNANZA

Los fondos de Venture Capital no invierten en personas solas para montos de €10M. Este proyecto debería estar en fase seed (€200-500K), no en Serie A.

---

## RAZÓN #6: MODELO DE NEGOCIO NO VALIDADO

### Supuestos no probados

| Supuesto | Afirmación | ¿Validado? |
|----------|-----------|------------|
| "La gente pagará 59€ por una segunda opinión" | Sí, en la web | ❌ Sin evidencia |
| "Las agencias inmobiliarias necesitan SaaS" | Sí, en el roadmap | ❌ Sin entrevistas de clientes |
| "El TAM es de X millones" | No cuantificado | ❌ Sin análisis de mercado |
| "El CAC será de Y €" | No calculado | ❌ Sin datos |
| "El LTV será de Z €" | No calculado | ❌ Sin datos |
| "El churn será < 5%" | Asumido | ❌ Sin datos |
| "Hay demanda orgánica SEO" | Asumido | ❌ Sin GA4 ni Search Console |

### Comparativa con benchmarks de inversión

| Métrica | Benchmark Serie A | Certilab |
|---------|------------------|----------|
| MRR | >€10K | €0 |
| Crecimiento YoY | >100% | 0% |
| Clientes de pago | >100 | 0 |
| CAC | <€500 | Desconocido |
| LTV/CAC | >3x | ∞/0 |
| TAM | >€100M | Sin cuantificar |
| Unidad económica positiva | Sí | No demostrable |

### Impacto en inversión: 🔴 SIN TESIS DE RETORNO

No se puede proyectar un retorno de 10x sobre €10M sin ninguna métrica de negocio. Sería una apuesta ciega.

---

## RAZÓN #7: DEUDA TÉCNICA ESTRUCTURAL

### Lo que parece funcional pero no lo es

El proyecto tiene la apariencia de un producto terminado (74 páginas, motor PITR™, documentación extensa), pero por debajo la deuda técnica es estructural:

| Capa | Problema | Coste de reparación |
|------|----------|---------------------|
| **Persistencia** | Datos en localStorage, no en DB | Medio: migrar a Supabase + reconciliación |
| **Autenticación** | No existe | Bajo: implementar Supabase Auth |
| **Backend** | No existe | Alto: construir API CRUD completa |
| **Pagos** | No existen | Medio: integrar Stripe |
| **Tests** | 0% cobertura | Alto: ~1-2 meses para cobertura básica |
| **Monitoreo** | No existe | Bajo: Sentry + logging |
| **CI/CD** | Build only | Bajo: GitHub Actions |
| **Documentación** | Ficción parcial | Medio: alinear docs con realidad |
| **Infraestructura** | Sin IaaS | Bajo: Terraform básico |

### Coste estimado de llevar a "producto funcional": ~3-4 meses de desarrollo intensivo

### Impacto en inversión: 🟠 SUBESTIMACIÓN DEL ESFUERZO REAL

El founder cree que el producto está al 80%. Nuestra estimación es que está al 20%. Esta brecha de percepción es peligrosa porque el founder planeará gastar el dinero en crecimiento cuando debería gastarlo en terminar el producto base.

---

## RAZÓN #8: COMPETENCIA IGNORADA O SUBESTIMADA

### Mapa competitivo real

| Competidor | Tipo | Fortaleza | Ventaja |
|-----------|------|-----------|---------|
| **HolaCasa** | Proptech integral | Gran tracción en España | Plataforma completa |
| **Certicalia** | Comparador certificados | Volumen, SEO | Muchos clientes |
| **Tecnify** | Software para técnicos | SaaS establecido | Recurrencia |
| **Registros oficiales CCAA** | Gratuitos | Autoridad legal | Sin coste para usuario |
| **Autónomos locales** | Servicio directo | Confianza, cercanía | Relación personal |
| **Idealista (potencial)** | Marketplace | 50M+ visitas/mes | Canal masivo |
| **Fotocasa (potencial)** | Marketplace | 30M+ visitas/mes | Canal masivo |

### Por qué Certilab no compite hoy

1. **Sin ventaja de costes**: 59€ vs 30-80€ de un certificado tradicional.
2. **Sin ventaja de red**: No tiene usuarios, no tiene efectos de red.
3. **Sin datos**: El Observatorio promete datos, pero no tiene ninguno.
4. **Sin marca**: Certilab.cat no es conocido en el sector.
5. **Sin canal de ventas**: Sin alianzas, sin API, sin integraciones.

### Impacto en inversión: 🟠 VENTAJA COMPETITIVA NO DEMOSTRADA

El PITR™ es una ventaja técnica, pero no está claro que sea una ventaja competitiva defendible. Un competidor con recursos podría replicar el concepto en 3-4 meses.

---

## RAZÓN #9: PLAN FINANCIERO AUSENTE

### Lo que NO existe

- ✅ No hay proyección de ingresos a 3-5 años
- ❌ No hay estructura de costes detallada
- ❌ No hay plan de contratación
- ❌ No hay análisis de unidad económica
- ❌ No hay plan de uso de fondos
- ❌ No hay hitos financieros
- ❌ No hay análisis de escenarios (optimista, realista, pesimista)

### ¿Para qué quiere €10M?

No hay respuesta en la documentación. No hay:
- Presupuesto de marketing
- Plan de expansión geográfica
- Estimación de costes de infraestructura escalada
- Salarios del equipo
- Costes legales y de cumplimiento
- Reserva para contingencias

### Impacto en inversión: 🔴 IMPOSIBLE EVALUAR EL RETORNO

Sin un plan financiero, no podemos calcular:
- TIR esperada
- Payback period
- Múltiplo de salida potencial
- Probabilidad de éxito vs fracaso

Invertir €10M sin esto es negligencia fiduciaria.

---

## RAZÓN #10: TIMING — ¿POR QUÉ AHORA? ¿POR QUÉ €10M?

### Preguntas incómodas

1. **¿Por qué €10M y no €200K?** El proyecto no necesita €10M para llegar a product-market fit. Necesita €200-500K para construir el producto real y validar. €10M ahora sería sobrecapitalización letal.

2. **¿Por qué ahora si en 18 meses no se ha validado nada?** ¿Qué ha cambiado? El proyecto lleva 6 trimestres sin lograr tracción. ¿Qué hace pensar que con dinero lo logrará?

3. **¿Dónde está el plan de contratación?** ¿Qué perfiles se contratan primero? ¿Cuánto cobran? ¿Cuándo se incorporan? Sin esto, el dinero se gasta sin dirección.

4. **¿Cuál es la estrategia de salida?** Adquisición por Idealista/Fotocasa/hóptima? OPV? La documentación no lo menciona. Un inversor necesita saber cómo recuperará su dinero.

---

## RAZÓN #11: RIESGO DE MERCADO — MERCADO REGULADO Y POLÍTICO

### Dependencia regulatoria

El negocio de Certilab depende de:
- **Obligatoriedad del certificado energético**: Si cambia la ley (ej. simplificación), el mercado se reduce.
- **Regulación por CCAA**: 17 comunidades con requisitos distintos. Cualquier cambio requiere adaptación.
- **Registro oficial**: Dependencia de ICAEN y otros registros autonómicos.
- **Software CE3X**: Dependencia de un software oficial propiedad del gobierno.

### Riesgo político

- **Posible eliminación de la obligatoriedad** en viviendas en venta (hay precedentes en otros países).
- **Simplificación burocrática**: Cada vez hay más presión para simplificar trámites. Un certificado más simple = menos necesidad de auditoría.
- **Entrada de la administración**: El gobierno podría crear su propio sistema de verificación gratuito.

### Impacto en inversión: 🟠 RIESGO REGULATORIO SISTÉMICO

El mercado existe por ley. Si la ley cambia, el mercado se reduce o desaparece. No hay control sobre este riesgo.

---

## RAZÓN #12: CONCENTRACIÓN GEOGRÁFICA

### Dependencia de Cataluña

- Dominio: certilab.cat (Cataluña)
- Idioma principal: Catalán
- Colegio profesional: Cateb (Cataluña)
- Buscadores: solo Catalunya

### Riesgo

- **TAM limitado**: ~1M transacciones inmobiliarias/año en Cataluña. Fracción pequeña necesitan segunda opinión.
- **Sin plan de expansión**: No hay ruta a otras CCAA ni a otros países.
- **Barreras de entrada en otras CCAA**: Cada comunidad tiene su propio registro, software, requisitos.

### Impacto en inversión: 🟠 TAM NO CONVINCENTE

Para justificar €10M, el TAM debe ser >€100M. El mercado de segunda opinión en Cataluña no llega a eso sin una expansión creíble que no está planificada.

---

## RAZÓN #13: SIN ESTRATEGIA DE GO-TO-MARKET

### Canales de adquisición

| Canal | ¿Implementado? | ¿Funciona? |
|-------|---------------|------------|
| SEO orgánico | Parcial (blog) | Sin medir |
| Google Ads | No | — |
| Facebook/Instagram Ads | No | — |
| LinkedIn Ads (B2B) | No | — |
| Alianzas con inmobiliarias | No | — |
| Alianzas con administradores de fincas | No | — |
| Referidos | No | — |
| Presencia en ferias sectoriales | No | — |
| Email marketing | No | — |
| Content marketing (YouTube) | No | — |

### Análisis

El proyecto asume que el SEO por sí solo generará clientes. Sin inversión en canales de pago, sin alianzas, sin venta directa. El blog tiene 27 artículos, pero no hay analytics para saber si alguien los lee.

### Impacto en inversión: 🟠 SIN PLAN DE CRECIMIENTO

Un producto excelente sin canales de adquisición es un producto muerto. No hay evidencia de que el founder sepa cómo vender.

---

## RAZÓN #14: EL PITR™ ES UN ACTIVO, PERO NO ES UN NEGOCIO

### Análisis del activo principal

El motor PITR™ es técnicamente impresionante:
- Desacoplado
- Testable
- Template-based
- Clean Architecture

### Pero no es un negocio por sí mismo

1. **No resuelve el problema de adquisición de clientes**: Un buen motor no atrae clientes.
2. **No es defendible como IP**: El concepto de "inspección remota con templates" no es patentable (o no está patentado). Cualquier competidor puede replicarlo.
3. **No tiene efectos de red**: Más usuarios no hacen el motor más valioso.
4. **No tiene datos de entrenamiento**: Sin expedientes, el motor no mejora.

### Impacto en inversión: 🟠 BUEN TECNOLOGÍA, MAL NEGOCIO

Invertimos en negocios, no en tecnología. PITR™ es un componente, no una tesis de inversión.

---

## RAZÓN #15: EL FUNDADOR ES ARQUITECTO TÉCNICO, NO EMPRENDEDOR TECNOLÓGICO

### Perfil del fundador

**Fortalezas:**
- Conocimiento profundo del dominio (certificación energética)
- Capacidad técnica para construir software funcional
- Visión clara del producto
- Excelente documentación

**Debilidades para escalar:**
- Sin experiencia previa en startups
- Sin red de inversores/mentores tecnológicos
- Sin experiencia en ventas B2B
- Sin experiencia en gestión de equipos
- Sin experiencia en fundraising
- Perfil de "maker" que prioriza código sobre negocio

### Señales de alerta

1. **El proyecto lleva 18 meses sin pivotar ni validar**. Un emprendedor experimentado habría buscado clientes en el mes 1.
2. **La documentación es de alta calidad, pero el producto no funciona**. Esto sugiere que el fundador prefiere diseñar a ejecutar.
3. **No hay evidencia de networking en el ecosistema startup**. Sin conexiones, sin mentores, sin advisors.

### Impacto en inversión: 🔴 RIESGO DE FUNDADOR

No dudamos de la capacidad técnica. Dudamos de la capacidad de ejecutar un negocio escalable con €10M. El perfil actual encaja mejor para un negocio de servicios (autónomo con web) que para una startup tecnológica.

---

## TABLA RESUMEN: 47 RAZONES PARA NO INVERTIR

| # | Razón | Categoría | Gravedad |
|---|-------|-----------|----------|
| 1 | Documentación afirma módulos completos que no existen | Integridad | 🔴 CRÍTICA |
| 2 | 0 ingresos, 0 clientes, 0 tracción en 18 meses | Validación | 🔴 CRÍTICA |
| 3 | MVP sobrediseñado: documentación > código funcional | Prioridades | 🔴 CRÍTICA |
| 4 | Sin GDPR compliance | Legal | 🔴 CRÍTICA |
| 5 | Sin cifrado de datos sensibles | Seguridad | 🔴 CRÍTICA |
| 6 | Sin autenticación ni control de acceso | Seguridad | 🔴 CRÍTICA |
| 7 | Proyecto unipersonal sin equipo | Ejecución | 🔴 CRÍTICA |
| 8 | Sin plan financiero ni uso de fondos | Governance | 🔴 CRÍTICA |
| 9 | Sin métricas de negocio (MRR, CAC, LTV, churn) | Métricas | 🔴 CRÍTICA |
| 10 | Sobrecapitalización: pide €10M cuando necesita €200K | Financiero | 🔴 CRÍTICA |
| 11 | Sin plan de contratación | Ejecución | 🔴 CRÍTICA |
| 12 | Sin estrategia de go-to-market | Crecimiento | 🔴 CRÍTICA |
| 13 | Sin canales de adquisición de clientes | Marketing | 🔴 CRÍTICA |
| 14 | Sin analytics ni datos de tráfico web | Métricas | 🔴 CRÍTICA |
| 15 | Sin tests de ningún tipo | Calidad | 🟠 ALTA |
| 16 | Sin monitoreo ni logs | Operaciones | 🟠 ALTA |
| 17 | Sin CI/CD con tests | DevOps | 🟠 ALTA |
| 18 | Sin backups automáticos | Operaciones | 🟠 ALTA |
| 19 | Sin plan de recuperación ante desastres | Operaciones | 🟠 ALTA |
| 20 | Sin rate limiting en APIs | Seguridad | 🟠 ALTA |
| 21 | Sin validación server-side robusta | Seguridad | 🟠 ALTA |
| 22 | Deuda técnica estructural (localStorage, placeholders) | Deuda técnica | 🟠 ALTA |
| 23 | Competencia establecida y no analizada | Mercado | 🟠 ALTA |
| 24 | Sin ventaja competitiva defendible | Estrategia | 🟠 ALTA |
| 25 | PITR™ no es patentable ni defendible como moat | IP | 🟠 ALTA |
| 26 | Fundador sin experiencia en startups perfil técnico | Equipo | 🟠 ALTA |
| 27 | Fundador sin red de contactos inversores | Equipo | 🟠 ALTA |
| 28 | Fundador prioriza arquitectura sobre validación | Ejecución | 🟠 ALTA |
| 29 | Fundador no ha pivotado en 18 meses sin tracción | Ejecución | 🟠 ALTA |
| 30 | Sin estrategia de salida para inversores | Financiero | 🟠 ALTA |
| 31 | TAM limitado a Cataluña sin plan de expansión | Mercado | 🟠 ALTA |
| 32 | Dependencia regulatoria (mercado existe por ley) | Riesgo | 🟠 ALTA |
| 33 | Riesgo político de cambio normativo | Riesgo | 🟠 ALTA |
| 34 | MyPOS vs Stripe: peor reconocimiento, menos ecosistema | Pagos | 🟡 MEDIA |
| 35 | Sin i18n (solo catalán) limita expansión | Producto | 🟡 MEDIA |
| 36 | Sin aplicación móvil para técnicos | Producto | 🟡 MEDIA |
| 37 | 74 páginas web sin propósito comercial claro | Prioridades | 🟡 MEDIA |
| 38 | Scripts SEO innecesarios en fase actual | Prioridades | 🟡 MEDIA |
| 39 | Roadmap irreal (V4.0 en 2028 sin V1.0 funcional) | Planificación | 🟡 MEDIA |
| 40 | Sin design system ni componentes compartidos | Deuda técnica | 🟢 BAJA |
| 41 | Sin modo oscuro | UX | 🟢 BAJA |
| 42 | Sin accesibilidad WCAG | UX | 🟢 BAJA |
| 43 | Sin keyboard navigation | UX | 🟢 BAJA |
| 44 | Sin onboarding guiado | UX | 🟢 BAJA |
| 45 | Sin feedback de carga/error en componentes | UX | 🟢 BAJA |
| 46 | Sin mapa de calor ni tests de usuario | UX | 🟢 BAJA |
| 47 | Sin documentación de API (no hay APIs que documentar) | Producto | 🟢 BAJA |

---

## ANÁLISIS CUANTITATIVO DE RIESGOS

### Probabilidad de éxito estimada

| Escenario | Probabilidad | Factores clave |
|-----------|-------------|----------------|
| Éxito (salida >€50M) | <1% | Necesita: mercado creciente, ejecución impecable, equipo, suerte |
| Supervivencia (MRR >€50K) | ~5% | Con inversión + equipo + pivote a producto real |
| Fracaso (cierre en 2-3 años) | ~60% | Sin cambiar enfoque y equipo |
| Zombie (ingresos bajos, sin crecer) | ~34% | Negocio de servicios, no startup tecnológica |

### Recomendación de inversión alternativa

**No Serie A. Posible seed convertible si:**

1. Se corrige la documentación para reflejar la realidad.
2. Se implementa el flujo mínimo de ingresos (pago → expediente → informe).
3. Se validan 10 clientes de pago reales.
4. El fundador incorpora un co-founder técnico/de negocio.
5. Se presenta un plan financiero creíble.

**Ticket sugerido:** €200-300K en seed note, con hitos claros para Serie A:
- 100 clientes de pago
- MRR >€5K
- Churn <10%
- Equipo de 3-4 personas

---

## CONCLUSIÓN DEL COMITÉ

> **Certilab NO es invertible en su estado actual para un ticket de €10M.**

El proyecto tiene activos valiosos (PITR™, documentación de dominio, web profesional) pero carece de los fundamentos mínimos para recibir financiación institucional: producto funcional, tracción de clientes, métricas de negocio, equipo, y credibilidad.

La discrepancia entre la documentación y la realidad es el issue más grave. Indica que el fundador no tiene una percepción objetiva del estado del proyecto, lo que es peligroso con inversiones grandes.

**Recomendación del comité:** No invertir. Dejar la puerta abierta a una potencial seed de €200-300K si el fundador demuestra capacidad de ejecución cerrando el ciclo de ingresos primero.

---

*Documento generado como Due Diligence de inversión.  
Clasificación: CONFIDENCIAL — Solo para el comité de inversión.*