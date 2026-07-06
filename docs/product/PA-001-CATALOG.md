# PA-001-CATALOG — Catálogo Oficial de Productos de Certilab

| Campo | Valor |
|-------|-------|
| **Código** | PA-001-CATALOG |
| **Título** | Catálogo Oficial de Productos de Certilab |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-06 |
| **Estado** | ✅ APROBADO |
| **Precedencia** | PA-001 (Arquitectura de Productos), BP-900 (Cierre Business Blueprint) |
| **Propósito** | Documentar los 14 productos de Certilab con la ficha estándar definida en PA-001 |

---

## Índice de productos

### Línea ATI — Asistencia Técnica Inmobiliaria
| Código | Producto | Estado |
|--------|----------|--------|
| ATI-01 | Segunda Opinión | ✅ ACTIVO (V1) |
| ATI-02 | Segunda Opinión Express | 📋 PLANIFICADO (V2) |
| ATI-03 | Informe Técnico Energético | 📋 PLANIFICADO (V2) |
| ATI-04 | Check-Up Inmobiliario | 📋 PLANIFICADO (V2) |
| ATI-05 | PITR™ | ⚙️ MOTOR INTERNO |
| ATI-06 | Observatorio Certilab | 📋 PLANIFICADO (V2) |

### Línea GTD — Gestión Técnica Documental
| Código | Producto | Estado |
|--------|----------|--------|
| GTD-01 | Informe de Situación de la Vivienda | 📋 PLANIFICADO (PROPUESTO) |
| GTD-02 | Recopilación y Organización Documental | 📋 PLANIFICADO (PROPUESTO) |
| GTD-03 | Custodia y Conservación Digital | 📋 PLANIFICADO (PROPUESTO) |
| GTD-04 | Due Diligence Técnica Inmobiliaria | 📋 PLANIFICADO (PROPUESTO) |

### Línea PLT — Plataforma
| Código | Producto | Estado |
|--------|----------|--------|
| PLT-01 | Certilab Platform | ✅ ACTIVO (V1) |
| PLT-02 | Certilab Backoffice | ✅ ACTIVO (V1) |

### Línea TRV — Transversal
| Código | Producto | Estado |
|--------|----------|--------|
| TRV-01 | Certilab Knowledge Base (CKB™) | ✅ ACTIVO (V1) |
| TRV-02 | Certilab Web Pública | ✅ ACTIVO (V1) |

---

> **Total: 14 productos** — 6 ACTIVOS (V1), 4 PLANIFICADOS (V2), 4 PLANIFICADOS (PROPUESTOS)

---

## ATI-01 — Segunda Opinión

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | ATI-01 |
| ★ **Nombre** | Segunda Opinión |
| ★ **Línea de negocio** | ATI — Asistencia Técnica Inmobiliaria |
| ★ **Problema que resuelve** | El cliente tiene un certificado energético (propiedad o alquiler) y duda de su validez, precisión o legalidad. Necesita una verificación técnica independiente antes de tomar una decisión patrimonial. |
| ★ **Cliente objetivo** | Propietarios de inmuebles que necesitan certeza técnica. ICP primario: propietario no profesional que realiza compraventa, alquiler o reclamación. También ATs que externalizan la revisión. |
| ★ **Propuesta de valor** | Dictamen técnico vinculante emitido por un Arquitecto Técnico colegiado que verifica, valida o impugna un certificado energético existente. Certidumbre documentada con valor legal. |
| ★ **Entradas necesarias** | Certificado energético original (PDF). Datos del inmueble (dirección, referencia catastral). Motivo de la solicitud. Datos del cliente. |
| ★ **Proceso operativo** | 1. Cliente solicita segunda opinión desde la web. 2. Sistema crea expediente y asigna AT. 3. AT realiza inspección PITR™. 4. AT emite dictamen técnico. 5. Dictamen se entrega al cliente. 6. Expediente se cierra. |
| ★ **Entregables** | Dictamen técnico firmado digitalmente. Informe de inspección PITR™ (anexo). Certificado de validez del proceso. |
| **Automatización futura** | Clasificación automática de riesgos documentales. Validación automática de datos del certificado. Generación asistida del dictamen mediante IA. |
| **Integración con Certilab Platform** | Producto nativo del MVP. Flujo completo: solicitud → expediente → PITR™ → entrega. |
| **Dependencias** | Core V1 (Cliente, Inmueble, Expediente, Documento IA). ATI-05 (PITR™). Web Pública (captación). |
| **Riesgos** | Dependencia de ATs disponibles. Variabilidad en calidad del dictamen. Saturación en picos estacionales. |
| **KPIs** | NPS ≥ 50. Tiempo medio < 48h. Tasa de conversión solicitud→compra > 60%. Volumen: 100/mes (objetivo V1). |
| **Cross-selling** | ATI-02 (Express si necesita urgencia). ATI-03 (Informe Técnico si necesita más detalle). GTD-01 (Informe de Situación). |
| **Up-selling** | ATI-04 (Check-Up Inmobiliario completo). GTD-04 (Due Diligence Técnica). |
| ★ **Estado del producto** | ✅ ACTIVO (V1) |

---

## ATI-02 — Segunda Opinión Express

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | ATI-02 |
| ★ **Nombre** | Segunda Opinión Express |
| ★ **Línea de negocio** | ATI — Asistencia Técnica Inmobiliaria |
| ★ **Problema que resuelve** | El cliente necesita una verificación técnica urgente (compraventa inminente, plazo de desistimiento, oferta vinculada). No puede esperar 48h del proceso estándar. |
| ★ **Cliente objetivo** | Propietarios y compradores en situación de urgencia. Inmobiliarias que necesitan cierre rápido de operaciones. |
| ★ **Propuesta de valor** | Misma calidad técnica que Segunda Opinión estándar pero con priorización en la cola de trabajo y entrega en 12-24h. |
| ★ **Entradas necesarias** | Mismas que ATI-01. Indicación de urgencia. |
| ★ **Proceso operativo** | Mismo que ATI-01 pero con prioridad alta en asignación y cola de trabajo. |
| ★ **Entregables** | Mismos que ATI-01. |
| **Automatización futura** | Misma que ATI-01. |
| **Integración con Certilab Platform** | Misma que ATI-01, con flag de prioridad. |
| **Dependencias** | ATI-01 (comparte flujo y recursos). ATI-05 (PITR™). |
| **Riesgos** | Canibalización del servicio estándar. Saturación de la cola urgente. Percepción de "pago por prioridad" negativa. |
| **KPIs** | Tiempo medio < 24h. NPS ≥ 45. Volumen: 30% de las solicitudes ATI-01. |
| **Cross-selling** | ATI-01 (si cliente opta por estándar). ATI-04 (Check-Up). |
| **Up-selling** | Premium: prioridad absoluta con entrega en 6h. |
| ★ **Estado del producto** | 📋 PLANIFICADO (V2) |

---

## ATI-03 — Informe Técnico Energético

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | ATI-03 |
| ★ **Nombre** | Informe Técnico Energético |
| ★ **Línea de negocio** | ATI — Asistencia Técnica Inmobiliaria |
| ★ **Problema que resuelve** | El cliente no solo duda del certificado, sino que necesita comprender en detalle la eficiencia energética de su inmueble, identificar mejoras y recibir recomendaciones técnicas. |
| ★ **Cliente objetivo** | Propietarios que planean rehabilitación energética. Compradores que necesitan conocer el estado energético real antes de comprar. |
| ★ **Propuesta de valor** | Informe técnico detallado que analiza el rendimiento energético del inmueble, identifica desviaciones respecto al certificado y propone mejoras con estimación de costes y retorno. |
| ★ **Entradas necesarias** | Mismas que ATI-01. Opcional: facturas de suministros, fotografías del inmueble. |
| ★ **Proceso operativo** | 1. Mismo flujo que ATI-01. 2. Adicional: análisis de consumo real vs. estimado. 3. Recomendaciones personalizadas. |
| ★ **Entregables** | Informe Técnico Energético completo. Análisis de consumo. Recomendaciones de mejora priorizadas. Estimación de retorno de inversión. |
| **Automatización futura** | Generación automática del informe base con datos del certificado. Recomendaciones basadas en ML sobre base de datos de mejoras. |
| **Integración con Certilab Platform** | Extensión de ATI-01. Módulo adicional en el flujo de expediente. |
| **Dependencias** | ATI-01. ATI-05 (PITR™). Core V1. |
| **Riesgos** | Complejidad técnica del análisis. Dependencia de datos de consumo reales. Expectativa de recomendaciones no viables. |
| **KPIs** | NPS ≥ 45. Tasa de adopción > 20% sobre ATI-01. Recomendaciones implementadas (tracking). |
| **Cross-selling** | ATI-01 (base). ATI-04 (Check-Up completo). GTD-01. |
| **Up-selling** | Informe con visita técnica presencial (si aplica). |
| ★ **Estado del producto** | 📋 PLANIFICADO (V2) |

---

## ATI-04 — Check-Up Inmobiliario

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | ATI-04 |
| ★ **Nombre** | Check-Up Inmobiliario |
| ★ **Línea de negocio** | ATI — Asistencia Técnica Inmobiliaria |
| ★ **Problema que resuelve** | El comprador de una vivienda necesita conocer el estado técnico general del inmueble antes de formalizar la compra: no solo el certificado energético, sino también aspectos estructurales, instalaciones, legalidad urbanística, etc. |
| ★ **Cliente objetivo** | Compradores de vivienda (segunda mano). Inversores inmobiliarios. |
| ★ **Propuesta de valor** | Evaluación técnica integral del inmueble que combina el análisis energético, estructural, de instalaciones y documental en un único informe pre-compra. |
| ★ **Entradas necesarias** | Datos del inmueble. Documentación disponible (nota simple, cédula, certificados). Autorización para visita/inspección PITR™. |
| ★ **Proceso operativo** | 1. Solicitud y creación de expediente. 2. Inspección PITR™ remota (con visita si aplica). 3. Análisis de documentación. 4. Informe integrado con checklist visual. 5. Entrega con recomendaciones. |
| ★ **Entregables** | Informe de Check-Up Inmobiliario. Checklist visual del estado del inmueble. Análisis energético. Anomalías detectadas. Recomendaciones y prioridad de intervención. |
| **Automatización futura** | Generación automática del informe base. Comparativa con inmuebles similares (ATI-06). Alertas de riesgos legales. |
| **Integración con Certilab Platform** | Producto independiente que reutiliza Core V1 y PITR™. Flujo específico con checklist. |
| **Dependencias** | ATI-01. ATI-05 (PITR™). Core V1. Posible dependencia externa de visores catastrales. |
| **Riesgos** | Mayor complejidad operativa. Posible necesidad de visita presencial (limitación remota). Responsabilidad civil más amplia. |
| **KPIs** | NPS ≥ 40. Tiempo medio < 72h. Volumen objetivo: 10/mes (V2). |
| **Cross-selling** | ATI-01 (si solo necesita energía). ATI-03 (informe energético detallado). GTD-04 (Due Diligence completa). |
| **Up-selling** | Check-Up Premium con visita presencial de AT. Due Diligence Técnica completa (GTD-04). |
| ★ **Estado del producto** | 📋 PLANIFICADO (V2) |

---

## ATI-05 — PITR™ (Protocolo de Inspección Técnica Remota)

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | ATI-05 |
| ★ **Nombre** | PITR™ — Protocolo de Inspección Técnica Remota |
| ★ **Línea de negocio** | ATI — Asistencia Técnica Inmobiliaria (Motor interno) |
| ★ **Problema que resuelve** | Los productos ATI necesitan un método de inspección estandarizado, remoto, auditable y escalable que garantice la calidad técnica sin requerir presencia física. |
| ★ **Cliente objetivo** | **No es un producto de cliente.** Es el motor interno que utilizan los ATs para realizar inspecciones dentro de los productos ATI-01, ATI-02, ATI-03 y ATI-04. |
| ★ **Propuesta de valor** | Metodología y plataforma de inspección remota propietaria que permite inspeccionar un inmueble a distancia con la misma validez técnica que una visita presencial. |
| ★ **Entradas necesarias** | Datos del inmueble (dirección, referencia catastral). Fotografías y vídeos (guíados por protocolo). Documentación del inmueble (planos, certificados). Autorización del propietario. |
| ★ **Proceso operativo** | 1. Asignación de AT. 2. El AT utiliza la plataforma PITR™ para guiar la inspección. 3. Captura de evidencia digital (fotos, vídeos, documentos). 4. Análisis y dictamen. 5. Generación de informe de inspección. |
| ★ **Entregables** | Informe de inspección PITR™. Evidencia digital geolocalizada y timestamped. Dictamen técnico. |
| **Automatización futura** | Captura automática de datos catastrales. Análisis de imágenes asistido por IA. Detección automática de anomalías. Generación de borrador de informe. |
| **Integración con Certilab Platform** | Componente transversal de la plataforma. Todos los productos ATI lo utilizan como motor de inspección. |
| **Dependencias** | Core V1 (Expediente, Documento IA). |
| **Riesgos** | Calidad de las evidencias aportadas por el cliente. Limitaciones de la inspección remota para ciertos tipos de anomalías. Aceptación legal/regulatoria. |
| **KPIs** | Tiempo medio de inspección < 90 min. Tasa de éxito (dictamen completo) > 95%. Satisfacción del AT > 8/10. |
| **Cross-selling** | No aplica (es motor interno). |
| **Up-selling** | No aplica (es motor interno). |
| ★ **Estado del producto** | ⚙️ MOTOR INTERNO |

---

## ATI-06 — Observatorio Certilab

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | ATI-06 |
| ★ **Nombre** | Observatorio Certilab |
| ★ **Línea de negocio** | ATI — Asistencia Técnica Inmobiliaria |
| ★ **Problema que resuelve** | No existe una fuente pública y fiable de datos sobre certificados energéticos, su calidad, las desviaciones del mercado y las tendencias del sector inmobiliario desde la perspectiva técnica. |
| ★ **Cliente objetivo** | Público general, profesionales del sector (ATs, inmobiliarias), medios de comunicación, inversores. |
| ★ **Propuesta de valor** | Observatorio de datos abiertos y anonimizados sobre el estado de la certificación energética en España. Informes trimestrales, rankings, tendencias y análisis de mercado basados en datos reales de Certilab. |
| ★ **Entradas necesarias** | Datos anonimizados de expedientes ATI completados. Fuentes externas (registros públicos, catastro, IDAE). |
| ★ **Proceso operativo** | 1. Recopilación y anonimización de datos internos. 2. Integración de fuentes externas. 3. Análisis y generación de informes. 4. Publicación en plataforma y web. 5. Distribución en medios y redes. |
| ★ **Entregables** | Informes trimestrales. Dashboard público de indicadores. Artículos y análisis. Datos abiertos para descarga. |
| **Automatización futura** | Generación automática de informes. Dashboard en tiempo real. APIs de datos abiertos. |
| **Integración con Certilab Platform** | Módulo de reporting y analytics. Datos extraídos del Core V1. Publicación en TRV-02 (Web Pública). |
| **Dependencias** | ATI-01 (volumen de datos). TRV-01 (CKB™). TRV-02 (Web Pública). Masa crítica: >500 expedientes. |
| **Riesgos** | Privacidad de datos (anonimización correcta). Representatividad estadística. Sesgo de selección (solo datos Certilab). Coste de producción de informes. |
| **KPIs** | Descargas de informes. Menciones en medios. Tráfico a la sección. Leads generados. |
| **Cross-selling** | ATI-01 a ATI-04 (visibilidad que atrae clientes). TRV-02 (contenido SEO). |
| **Up-selling** | Informes personalizados para empresas. Consultoría de datos. |
| ★ **Estado del producto** | 📋 PLANIFICADO (V2) |

---

## GTD-01 — Informe de Situación de la Vivienda

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | GTD-01 |
| ★ **Nombre** | Informe de Situación de la Vivienda |
| ★ **Línea de negocio** | GTD — Gestión Técnica Documental |
| ★ **Problema que resuelve** | El propietario no sabe qué documentos tiene su vivienda, cuáles le faltan, cuáles están caducados y qué necesita para estar en orden documentalmente. |
| ★ **Cliente objetivo** | Propietarios de vivienda que necesitan conocer el estado documental de su inmueble (herencias, ventas, rehabilitaciones, comunidad). |
| ★ **Propuesta de valor** | Informe completo del estado documental de la vivienda: documentos existentes, documentos faltantes, estado de caducidad y acciones recomendadas. |
| ★ **Entradas necesarias** | Datos del inmueble. Documentos que el propietario ya tenga (si los tiene). Autorización para consultas registrales. |
| ★ **Proceso operativo** | 1. Solicitud del cliente. 2. Recopilación de documentos disponibles. 3. Consulta registral (si aplica). 4. Análisis y clasificación. 5. Informe de situación con check-list. |
| ★ **Entregables** | Informe de Situación de la Vivienda. Checklist documental. Alertas de caducidad. Recomendaciones personalizadas. |
| **Automatización futura** | Consulta automática de registros públicos. Clasificación automática de documentos (Documento IA extendido — ADR-004). Alertas automáticas de caducidad. |
| **Integración con Certilab Platform** | Nuevo producto sobre Core V1 existente. Extensión de Documento IA para clasificación documental (ADR-004). |
| **Dependencias** | ADR-003 (GTD como línea de negocio aprobada). ADR-004 (Extensión Documento IA). Core V1. |
| **Riesgos** | Acceso a registros autonómicos (diferentes APIs). Dependencia de la colaboración del propietario. Calidad de documentos escaneados por el cliente. |
| **KPIs** | Informes/mes. NPS ≥ 40. Tasa de conversión a GTD-02. |
| **Cross-selling** | GTD-02 (recopilación). GTD-03 (custodia). ATI-01 (si detecta problemas con certificados). |
| **Up-selling** | GTD-04 (Due Diligence completa). |
| ★ **Estado del producto** | 📋 PLANIFICADO (PROPUESTO) |

---

## GTD-02 — Recopilación y Organización Documental

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | GTD-02 |
| ★ **Nombre** | Recopilación y Organización Documental |
| ★ **Línea de negocio** | GTD — Gestión Técnica Documental |
| ★ **Problema que resuelve** | El propietario sabe qué documentos le faltan (por GTD-01) pero no tiene tiempo, conocimientos o medios para obtenerlos y organizarlos. |
| ★ **Cliente objetivo** | Propietarios que han recibido un Informe de Situación (GTD-01) y necesitan completar su documentación. |
| ★ **Propuesta de valor** | Servicio integral de recopilación de toda la documentación técnica y legal de la vivienda: solicitud a organismos, digitalización, clasificación y organización. |
| ★ **Entradas necesarias** | Informe GTD-01. Autorizaciones del propietario. Datos registrales y catastrales. |
| ★ **Proceso operativo** | 1. Basado en GTD-01, identificar documentos necesarios. 2. Solicitud a organismos (catastro, registro, ayuntamiento). 3. Recopilación y digitalización. 4. Clasificación según taxonomía GTD. 5. Organización en dossier documental. |
| ★ **Entregables** | Dossier documental completo y digitalizado. Índice documental. Archivos digitales clasificados. |
| **Automatización futura** | Solicitudes automáticas a organismos con API. Digitalización asistida por IA. Clasificación automática (ADR-004). |
| **Integración con Certilab Platform** | Extensión de GTD-01. Gestión de documentos en Core V1 (Documento IA extendido). |
| **Dependencias** | GTD-01. ADR-003, ADR-004. Integración con organismos autonómicos. |
| **Riesgos** | Coste operativo elevado (solicitudes manuales). Heterogeneidad de procedimientos autonómicos. Tiempos de respuesta de organismos largos. |
| **KPIs** | Dossiers/mes. Tiempo medio de recopilación. Tasa de éxito (documentos obtenidos vs. solicitados). |
| **Cross-selling** | GTD-01 (base). GTD-03 (custodia posterior). |
| **Up-selling** | GTD-04 (Due Diligence con análisis legal). |
| ★ **Estado del producto** | 📋 PLANIFICADO (PROPUESTO) |

---

## GTD-03 — Custodia y Conservación Digital

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | GTD-03 |
| ★ **Nombre** | Custodia y Conservación Digital |
| ★ **Línea de negocio** | GTD — Gestión Técnica Documental |
| ★ **Problema que resuelve** | El propietario tiene ahora toda su documentación organizada pero no tiene un sistema seguro, accesible y permanente para conservarla, actualizarla y compartirla. |
| ★ **Cliente objetivo** | Propietarios que han completado GTD-01 y GTD-02 y quieren mantener su documentación actualizada y segura. |
| ★ **Propuesta de valor** | Plataforma de custodia digital segura con acceso permanente, actualización automática de caducidades, alertas y posibilidad de compartir documentos con terceros. |
| ★ **Entradas necesarias** | Dossier documental de GTD-02. Datos del propietario para acceso. |
| ★ **Proceso operativo** | 1. Alta del dossier en plataforma de custodia. 2. Configuración de alertas (caducidades, renovaciones). 3. Acceso web del propietario. 4. Posibilidad de compartir con terceros (inmobiliarias, notarías). |
| ★ **Entregables** | Acceso a plataforma de custodia. Documentos digitales seguros. Alertas y notificaciones. Posibilidad de descarga y compartición. |
| **Automatización futura** | Actualización automática de documentos. Alertas inteligentes. Compartición segura con terceros. Integración con notarías y registros. |
| **Integración con Certilab Platform** | Nuevo módulo de custodia. Almacenamiento seguro con cifrado. Core V1 como base de datos documental. |
| **Dependencias** | GTD-01, GTD-02. ADR-003, ADR-004. Infraestructura de almacenamiento seguro. |
| **Riesgos** | Responsabilidad por pérdida de datos. Coste de almacenamiento. Cumplimiento RGPD. Dependencia tecnológica. |
| **KPIs** | Usuarios activos. Tasa de retención. Documentos custodiados. Alertas emitidas. |
| **Cross-selling** | GTD-01, GTD-02 (entrada). ATI-01 (si caduca certificado). |
| **Up-selling** | Planes premium con más almacenamiento. Custodia para carteras de inmuebles. |
| ★ **Estado del producto** | 📋 PLANIFICADO (PROPUESTO) |

---

## GTD-04 — Due Diligence Técnica Inmobiliaria

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | GTD-04 |
| ★ **Nombre** | Due Diligence Técnica Inmobiliaria |
| ★ **Línea de negocio** | GTD — Gestión Técnica Documental |
| ★ **Problema que resuelve** | El comprador o inversor necesita una evaluación técnica y documental completa del inmueble antes de una operación de compraventa, incluyendo aspectos legales, urbanísticos, energéticos y estructurales. |
| ★ **Cliente objetivo** | Inversores inmobiliarios. Compradores de alto valor. Fondos de inversión. Inmobiliarias premium. |
| ★ **Propuesta de valor** | Due Diligence técnica integral que combina toda la cadena GTD (informe, recopilación, custodia) con el análisis técnico ATI para ofrecer una fotografía completa y con valor legal. |
| ★ **Entradas necesarias** | Datos del inmueble. Documentación disponible. Autorización del propietario. |
| ★ **Proceso operativo** | 1. GTD-01 (informe de situación). 2. GTD-02 (recopilación documental). 3. ATI-04 (Check-Up técnico). 4. Análisis legal de documentación. 5. Informe integrado de Due Diligence. 6. Entrega con recomendaciones y alertas. |
| ★ **Entregables** | Informe de Due Diligence Técnica Inmobiliaria. Dossier documental completo. Análisis técnico. Alertas legales y urbanísticas. Recomendaciones de mitigación. |
| **Automatización futura** | Check-list automático de documentación. Alertas de riesgos legales. Comparativa de mercado (ATI-06). |
| **Integración con Certilab Platform** | Producto compuesto que orquesta múltiples módulos. Vista unificada para el cliente. |
| **Dependencias** | GTD-01, GTD-02, GTD-03. ATI-04 (Check-Up). ADR-003, ADR-004. Core V1. |
| **Riesgos** | Alta complejidad operativa. Responsabilidad civil muy amplia. Precio elevado limita mercado. Dependencia de múltiples proveedores de datos. |
| **KPIs** | Due Diligences/mes. NPS ≥ 50. Valor medio del ticket. Tasa de cierre de operaciones. |
| **Cross-selling** | ATI-01, ATI-04. GTD-01 a GTD-03. |
| **Up-selling** | Due Diligence para carteras de inmuebles. Consultoría técnica avanzada. |
| ★ **Estado del producto** | 📋 PLANIFICADO (PROPUESTO) |

---

## PLT-01 — Certilab Platform

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | PLT-01 |
| ★ **Nombre** | Certilab Platform |
| ★ **Línea de negocio** | PLT — Plataforma |
| ★ **Problema que resuelve** | Los ATs necesitan una plataforma SaaS que les permita gestionar expedientes, realizar inspecciones PITR™, emitir dictámenes y administrar su cartera de clientes de forma eficiente. |
| ★ **Cliente objetivo** | Arquitectos Técnicos (ATs) colegiados que forman parte de la red Certilab. |
| ★ **Propuesta de valor** | Plataforma SaaS integral que proporciona todas las herramientas que un AT necesita para operar dentro del ecosistema Certilab: gestión de expedientes, inspección PITR™, emisión de dictámenes, facturación y reporting. |
| ★ **Entradas necesarias** | Alta del AT (verificación colegial). Credenciales de acceso. |
| ★ **Proceso operativo** | 1. AT accede a la plataforma. 2. Recibe asignación de expedientes. 3. Realiza inspección PITR™ desde la plataforma. 4. Emite dictamen. 5. Gestiona su cartera. 6. Accede a reporting y analytics. |
| ★ **Entregables** | Acceso a la plataforma. Dashboard de expedientes. Herramientas PITR™. Sistema de emisión. Reporting. |
| **Automatización futura** | Asignación inteligente de expedientes. Generación automática de borradores. Dashboard predictivo de carga de trabajo. |
| **Integración con Certilab Platform** | Es la plataforma. Todos los productos se integran en ella. |
| **Dependencias** | Core V1. ATI-05 (PITR™). |
| **Riesgos** | Adopción por parte de ATs. Curva de aprendizaje. Competencia con otras plataformas. Disponibilidad técnica. |
| **KPIs** | ATs activos. Expedientes gestionados/mes. NPS AT. Tiempo de actividad > 99.5%. |
| **Cross-selling** | ATI-01 a ATI-04 (servicios que gestionan). |
| **Up-selling** | Planes premium con más funcionalidades. |
| ★ **Estado del producto** | ✅ ACTIVO (V1) |

---

## PLT-02 — Certilab Backoffice

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | PLT-02 |
| ★ **Nombre** | Certilab Backoffice |
| ★ **Línea de negocio** | PLT — Plataforma |
| ★ **Problema que resuelve** | El equipo operativo de Certilab necesita gestionar expedientes, ATs, clientes, facturación y métricas del negocio desde una interfaz administrativa centralizada. |
| ★ **Cliente objetivo** | Equipo interno de Certilab (operaciones, administración, dirección). |
| ★ **Propuesta de valor** | Interfaz de administración completa que permite gestionar todo el ecosistema Certilab: usuarios, expedientes, ATs, facturación, configuración y métricas. |
| ★ **Entradas necesarias** | Credenciales de administrador. Permisos según rol. |
| ★ **Proceso operativo** | 1. Acceso al backoffice. 2. Gestión de expedientes (asignación, supervisión, cierre). 3. Gestión de ATs (altas, bajas, productividad). 4. Gestión de clientes. 5. Facturación y cobros. 6. Reporting y analytics. |
| ★ **Entregables** | Acceso al backoffice. Herramientas de gestión. Dashboards operativos. Exportación de datos. |
| **Automatización futura** | Asignación automática de expedientes. Detección de anomalías. Alertas operativas. Reporting automático. |
| **Integración con Certilab Platform** | Backend compartido. Interfaz administrativa sobre el mismo Core V1. |
| **Dependencias** | Core V1. PLT-01 (comparte backend). |
| **Riesgos** | Acceso no autorizado (seguridad crítica). Complejidad creciente con nuevos productos. |
| **KPIs** | Expedientes gestionados. Tiempo de resolución. Satisfacción del equipo. |
| **Cross-selling** | No aplica (interno). |
| **Up-selling** | No aplica (interno). |
| ★ **Estado del producto** | ✅ ACTIVO (V1) |

---

## TRV-01 — Certilab Knowledge Base (CKB™)

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | TRV-01 |
| ★ **Nombre** | Certilab Knowledge Base (CKB™) |
| ★ **Línea de negocio** | TRV — Transversal |
| ★ **Problema que resuelve** | Los clientes potenciales tienen dudas recurrentes sobre certificados energéticos, procesos de inspección, normativa y servicios. El equipo necesita una fuente única de verdad documental. |
| ★ **Cliente objetivo** | Clientes potenciales (autoservicio informativo). Clientes existentes (seguimiento). Equipo interno (documentación). |
| ★ **Propuesta de valor** | Base de conocimiento centralizada con FAQs, guías, tutoriales, normativa y glosario. Accesible desde la web y la plataforma. Reduce la carga de atención al cliente y empodera al usuario. |
| ★ **Entradas necesarias** | Preguntas frecuentes reales. Contenido editorial. Normativa actualizada. |
| ★ **Proceso operativo** | 1. Identificación de necesidades de conocimiento. 2. Creación/actualización de contenido. 3. Publicación en CKB™. 4. Indexación SEO. 5. Medición de impacto. |
| ★ **Entregables** | Artículos de FAQ. Guías y tutoriales. Glosario técnico. Normativa comentada. |
| **Automatización futura** | Generación asistida de contenido (IA). Chatbot basado en CKB™. Actualización automática de normativa. |
| **Integración con Certilab Platform** | Integrado en web pública y plataforma. API de consulta. |
| **Dependencias** | Core V1 (contenido relacionado con expedientes). TRV-02 (publicación web). |
| **Riesgos** | Contenido desactualizado. Coste de mantenimiento. Dificultad para cubrir todas las dudas. |
| **KPIs** | Artículos publicados. Visitas a CKB™. Tasa de resolución sin contacto humano. Satisfacción del contenido. |
| **Cross-selling** | Todos los productos ATI y GTD (educación del cliente). |
| **Up-selling** | No aplica (es servicio gratuito de valor añadido). |
| ★ **Estado del producto** | ✅ ACTIVO (V1) |

---

## TRV-02 — Certilab Web Pública

| Campo | Valor |
|-------|-------|
| ★ **Código de producto** | TRV-02 |
| ★ **Nombre** | Certilab Web Pública |
| ★ **Línea de negocio** | TRV — Transversal |
| ★ **Problema que resuelve** | Los clientes potenciales necesitan encontrar Certilab, conocer sus servicios, confiar en la marca y poder solicitar productos desde un canal digital profesional y accesible. |
| ★ **Cliente objetivo** | Clientes potenciales (tráfico orgánico y referido). Público general. Medios de comunicación. |
| ★ **Propuesta de valor** | Presencia web profesional, optimizada para SEO, que genera confianza, educa al mercado y convierte visitantes en clientes. |
| ★ **Entradas necesarias** | Contenido de productos (PA-001-CATALOG). Contenido CKB™ (TRV-01). Diseño y branding (Design System). |
| ★ **Proceso operativo** | 1. Mantenimiento de la web. 2. Publicación de contenido. 3. SEO continuo. 4. Gestión de solicitudes. 5. Analytics y optimización. |
| ★ **Entregables** | Sitio web público. Landing pages de productos. Blog. Sistema de solicitud de servicios. |
| **Automatización futura** | Personalización de contenido por segmento. A/B testing automatizado. Chat de atención al cliente. |
| **Integración con Certilab Platform** | Frontend público. Backend compartido (solicitudes, expedientes). |
| **Dependencias** | TRV-01 (contenido CKB™). Design System. |
| **Riesgos** | Dependencia SEO. Competencia por palabras clave. Cambios en algoritmos de búsqueda. |
| **KPIs** | Tráfico orgánico. Tasa de conversión. Posicionamiento en keywords objetivo. Tiempo de carga. |
| **Cross-selling** | Todos los productos (canal de entrada principal). |
| **Up-selling** | No aplica (es canal, no producto tarificado). |
| ★ **Estado del producto** | ✅ ACTIVO (V1) |

---

## Apéndice A: Mapa de relaciones entre productos

```
                    ┌─────────────────────────────────────┐
                    │           TRV-02 Web Pública         │
                    │         (Canal de captación)         │
                    └──────────┬──────────────────────────┘
                               │
                    ┌──────────▼──────────────────────────┐
                    │         TRV-01 CKB™                  │
                    │    (Educación y autoservicio)        │
                    └─────────────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                      │
         ▼                     ▼                      ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   LÍNEA ATI      │  │  LÍNEA GTD       │  │  LÍNEA PLT       │
│                  │  │                  │  │                  │
│ ATI-01 ● Segunda │  │ GTD-01 ◇ Inf.   │  │ PLT-01 ● Platform│
│   Opinión        │  │   Situación     │  │ PLT-02 ● Backoff.│
│ ATI-02 ○ Express │  │ GTD-02 ◇ Recop. │  └──────────────────┘
│ ATI-03 ○ Inf.Téc │  │ GTD-03 ◇ Custod │         │
│ ATI-04 ○ CheckUp │  │ GTD-04 ◇ DueDil │         │
│ ATI-05 ⚙ PITR™  │  └──────────────────┘         │
│ ATI-06 ○ Observ. │           │                   │
└────────┬─────────┘           │                   │
         │                     │                   │
         └─────────────────────┼───────────────────┘
                               │
                    ┌──────────▼──────────────────────────┐
                    │         CORE V1                      │
                    │  (Cliente, Inmueble, Expediente,    │
                    │   Documento IA)                     │
                    └─────────────────────────────────────┘
```

**Leyenda:**
- ● = ACTIVO (V1)
- ○ = PLANIFICADO (V2)
- ◇ = PLANIFICADO (PROPUESTO)
- ⚙ = Motor interno

---

## Apéndice B: Estados del producto por línea

| Estado | ATI | GTD | PLT | TRV | Total |
|--------|:---:|:---:|:---:|:---:|:-----:|
| ✅ ACTIVO (V1) | 2 | 0 | 2 | 2 | **6** |
| ⚙️ MOTOR INTERNO | 1 | 0 | 0 | 0 | **1** |
| 📋 PLANIFICADO (V2) | 3 | 0 | 0 | 0 | **3** |
| 📋 PLANIFICADO (PROPUESTO) | 0 | 4 | 0 | 0 | **4** |
| **Total** | **6** | **4** | **2** | **2** | **14** |

---

*Fin del documento PA-001-CATALOG.md*