# BP-100-03 — Modelo Operativo Remoto y Arquitectura Comercial

| Campo | Descripción |
|-------|-------------|
| **Código** | BP-100-03 |
| **Título** | Modelo Operativo Remoto y Arquitectura Comercial |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-06 |
| **Estado** | 📋 BORRADOR — Pendiente de aprobación |
| **Precedencia** | Tercer entregable del Business Blueprint. EP-100, bloques 3 y 4 (consolidados). |
| **Propósito** | Detallar la operativa 100% remota y la arquitectura comercial de Certilab. |

---

## Parte I: Modelo Operativo Remoto

### 1. Principios de operación remota

Certilab opera bajo estos principios operativos:

1. **Asíncrono por defecto.** No se programa una reunión si el mismo resultado puede alcanzarse con un documento, un hilo de Slack o un comentario en GitHub. Las reuniones tienen un propósito específico, un orden del día y una duración máxima (30 min por defecto).
2. **Documentación escrita.** Toda decisión importante, política, proceso o procedimiento se documenta por escrito en la wiki de la empresa. "Si no está documentado, no ha pasado."
3. **Transparencia radical.** Toda la información de la empresa es accesible a todo el equipo, salvo datos protegidos por GDPR o secreto profesional.
4. **Medición objetiva.** Cada rol tiene métricas de éxito definidas y visibles. No se gestiona por horas, se gestiona por resultados.
5. **Confianza + responsabilidad.** Se contrata a profesionales responsables. No se controla el tiempo, se controla el resultado.

### 2. Stack tecnológico operativo

| Categoría | Herramienta (selección) | Alternativa | Propósito |
|-----------|------------------------|-------------|-----------|
| **Comunicación síncrona** | Slack | Discord | Diaria. Canales por línea de negocio, proyecto, área. |
| **Comunicación asíncrona** | Slack (hilos) + Notion (docs) | — | Decisiones, debates, actualizaciones. |
| **Videollamada** | Google Meet / Zoom | — | Reuniones programadas, weekly, 1:1. |
| **Wiki** | Notion | Confluence, GitBook | Procesos, manuales, políticas, decisiones. |
| **Gestión de producto** | GitHub Projects | Linear, Jira | Épicas, tareas, sprints, roadmap. |
| **Código** | GitHub | — | Código, CI/CD, code reviews, issues. |
| **Diseño** | Figma | — | UI/UX, prototipados, Design System, handoff a desarrollo. |
| **Email transaccional** | Resend | SendGrid | Notificaciones a clientes (estado expediente, dictamen, etc.). |
| **Analítica de producto** | PostHog | Plausible, Amplitude | Eventos de usuario, embudos, métricas de conversión. |
| **CRM** | HubSpot (recomendado V1) | Pipedrive, Less | Gestión de leads, clientes, partnerships. |
| **Finanzas** | Holded / Qonto | — | Facturación, contabilidad, tesorería. |
| **Customer Support** | Intercom | Crisp, Freshchat | Chat en vivo + tickets + base de conocimiento. |
| **Monitoreo** | Sentry + Supabase Monitoring | — | Errores, rendimiento, uptime. |

### 3. Estructura organizativa detallada

#### 3.1 V1 Fundacional (equipo mínimo viable)

```
CEO / Fundador (tiempo completo)
├── Visión y estrategia
├── Negocio y desarrollo comercial
├── Captación de ATs (red)
├── Partnerships (inmobiliarias, administradores, colegios)
├── Ventas directas (primeros clientes)
└── Finanzas y administración

CTO / Producto (tiempo completo)
├── Desarrollo de plataforma (backend + frontend)
├── Arquitectura técnica
├── Producto y diseño UX/UI
├── DevOps y despliegue
├── Analítica y métricas
└── Design System (mantenimiento)

ATs (red de profesionales independientes)
├── Por expediente
├── Cada AT firma dictámenes con su número de colegiado
├── Comisión por expediente (50-70%)
└── Sin exclusividad

Soporte / Operaciones (media jornada o externalizado)
├── Atención al cliente (email + chat)
├── Gestión de expedientes (asignación a ATs, seguimiento)
├── Coordinación AT ↔ cliente (correcciones)
└── QA de dictámenes (revisión de calidad)

Marketing / Contenido (media jornada o externalizado)
├── SEO y contenido de blog
├── Redes sociales (LinkedIn principal)
├── Newsletter
└── Material de partnerships
```

#### 3.2 Evolución del equipo por hitos

| Hito | Equipo | Contrataciones clave |
|------|--------|---------------------|
| **Pre-lanzamiento** | CEO + CTO | Fundadores |
| **10 expedientes** | CEO + CTO + 1 soporte parcial | Primer soporte |
| **50 expedientes/mes** | CEO + CTO + 1 soporte + 1 marketing parcial | Marketing |
| **200 expedientes/mes** | +1 soporte + 1 contenido + 1 dev parcial | Escalado operativo |
| **500 expedientes/mes** | +1 COO + 1 dev + 1 AT manager + 1 growth | Estructura completa |

### 4. Procesos operativos clave

#### 4.1 Proceso de alta de AT

```
1. Identificación: colegio profesional, recomendación, LinkedIn, inbound
2. Validación: verificación de colegiación activa + seguro de responsabilidad civil
3. Onboarding documental: guía de plataforma, metodología PITR™, SLAs, condiciones
4. Onboarding técnico: alta en plataforma, perfil de AT, preferencias territoriales
5. Expediente de prueba: AT resuelve un expediente simulado (no remunerado)
6. Activación: AT pasa a disponible en la red
```

**Tiempo estimado:** 2-3 días hábiles desde el primer contacto hasta la activación.

#### 4.2 Proceso de asignación de expediente

**V1 (asignación manual):**
1. El sistema notifica al CEO (o al soporte) que hay un nuevo expediente pendiente de AT.
2. El asignador revisa la carga de trabajo de los ATs disponibles en la provincia del inmueble.
3. Asigna al AT con menos carga y mejor disponibilidad.
4. El AT recibe notificación con el expediente, el PITR™ y el certificado a auditar.
5. El AT tiene 24h para aceptar o rechazar. Si rechaza, se reasigna.

**V2 (asignación automática planificada):**
1. Sistema de colas con prioridad por provincia y disponibilidad.
2. Asignación automática basada en reglas.
3. Auto-asignación: los ATs pueden recoger expedientes disponibles.

#### 4.3 Proceso de calidad de dictamen

1. **Revisión inicial:** El AT completa el dictamen. El sistema comprueba campos obligatorios.
2. **Auto-revisión:** El AT confirma el dictamen. El sistema marca el expediente como "pendiente de entrega."
3. **QA por muestreo:** 10% de los dictámenes (V1) son revisados por un segundo AT (pago adicional) para validar consistencia. El muestreo es aleatorio pero con sobrepeso para ATs nuevos.
4. **Entrega:** El dictamen se entrega al cliente. Si el cliente solicita aclaración, se abre un ciclo de correcciones.
5. **NPS:** Posterior a la entrega, se solicita NPS al cliente. El resultado afecta al perfil del AT.

#### 4.4 Proceso de resolución de incidencias

| Tipo de incidencia | Tiempo de respuesta | Responsable | Escalado |
|-------------------|---------------------|-------------|----------|
| Técnica (bug, error en plataforma) | 4h | CTO | — |
| Dictamen (cliente en desacuerdo) | 24h | AT asignado + soporte | CEO si no se resuelve |
| Pago (transacción fallida) | 4h | Soporte | CTO si es persistente |
| AT (no responde, retraso) | 2h | CEO | — |

---

## Parte II: Arquitectura Comercial

### 5. Canales de venta (detalle)

#### 5.1 Canal Directo Online (P0)

**Modelo:** El cliente llega por búsqueda orgánica y contrata online sin intervención humana.

**Requisitos V1 para activar:**
- ✅ Landing de Segunda Opinión (existe)
- ✅ Sistema de solicitud (existe: SolicitarSegundaOpinionForm)
- ❌ Pasarela de pago (pendiente)
- ❌ Modo invitado (pendiente)
- ❌ Email transaccional (pendiente)

**Métricas objetivo:**
- Tasa de conversión landing → solicitud: 3-5%
- Tasa de conversión solicitud → pago: 60-80%
- Tiempo desde llegada a landing hasta pago: < 10 min

#### 5.2 Canal de Referidos AT (P0)

**Modelo:** Los ATs recomiendan Certilab a sus clientes. Cada AT tiene un enlace de referido único.

**Incentivo para el AT:**
- Por cada cliente referido que complete un expediente: bonus de 10-15 € sobre su comisión
- Para el cliente: descuento de 10 € (o "servicio recomendado por su AT")

**Requisitos:**
- Sistema de tracking de referidos (código único por AT)
- Página de aterrizaje con código de referido

#### 5.3 Partnership Inmobiliarias (P1)

**Modelo:** Las agencias inmobiliarias ofrecen "certificado verificado por Certilab" como valor añadido al vendedor.

**Propuesta de partnership:**
- La inmobiliaria recomienda Certilab a sus clientes vendedores
- Certilab ofrece un descuento para clientes de la inmobiliaria (ej: 89 € en vez de 99 €)
- La inmobiliaria recibe una comisión (10-15 € por cliente) o un white-label del servicio

**Requisitos:**
- Material de partnership (presentación, folleto digital, condiciones)
- Página de aterrizaje con código de partnership
- Sistema de tracking de partnerships

#### 5.4 Administradores de Fincas (P1)

**Modelo:** Los administradores ofrecen Certilab a las comunidades de propietarios que gestionan.

**Propuesta:**
- Auditoría de certificados energéticos de toda una comunidad
- Detección de necesidades de ITE futuras
- Informe consolidado para la comunidad

**Requisitos:**
- Producto específico para comunidades (V2)
- Pricing por volumen (descuento por número de inmuebles)

#### 5.5 Colegios Profesionales (P1)

**Modelo:** Los colegios de ATs difunden Certilab entre sus colegiados como herramienta de trabajo.

**Propuesta para el colegio:**
- Certilab ofrece condiciones preferentes a los colegiados (comisiones más altas)
- El colegio recibe una aportación por cada colegiado activo en la plataforma
- Certilab participa en eventos del colegio (formación, jornadas)

#### 5.6 Google Ads (P2)

**Modelo:** Campaña SEM segmentada por intención de búsqueda.

**Keywords objetivo:**
- "segunda opinión certificado energético"
- "mi certificado energético es correcto"
- "auditar certificado energético"
- "revisar certificado energético"
- "certificado energético fraudulento"

**Presupuesto estimado V1:** 300-500 €/mes de prueba.
**CPA objetivo:** < 15 € por solicitud.

### 6. Modelo de pricing (detallado)

#### 6.1 Pricing ATI V1

**Producto: Segunda Opinión PITR™**

| Concepto | Valor | Notas |
|----------|-------|-------|
| Precio al cliente | 99 € | Precio fijo V1. Sin IVA (impuestos aparte) |
| Comisión AT | 59,40 € (60%) | Por dictamen completado |
| Ingreso Certilab | 39,60 € | Antes de costes variables |
| Costes variables | 5-8 € | Supabase, hosting, APIs, pasarela |
| Margen bruto | 31-34 € por expediente | = 80-87% margen |

**Justificación del precio (99 €):**
- Benchmark: una consulta presencial a un AT cuesta 150-300 €
- Benchmark: servicios online similares (legaltech, healthtech) cobran 49-149 €
- 99 € es un precio "aspiracional pero accesible": suficientemente bajo para no pensarlo dos veces, suficientemente alto para que el cliente valore el servicio
- El precio es fijo, sin sorpresas. El cliente sabe lo que paga antes de empezar

**Estrategia de precios futura:**
- V1: 99 € fijo (un solo producto)
- V2: 99-149 € según alcance (Segunda Opinión Standard vs Premium)
- V3: Precios dinámicos según complejidad del inmueble (detectada por PITR™)

#### 6.2 Pricing GTD (estimación V2)

| Producto | Precio estimado | Coste operativo | Margen |
|----------|-----------------|-----------------|--------|
| Informe de Situación Documental | 29-49 € | 10-15 € | 60-70% |
| Recopilación Documental Completa | 99-199 € | 40-80 € | 55-60% |
| Custodia Documental (suscripción) | 5-15 €/mes | 2-5 € | 60-70% |
| Informe de Carga Documental | 49-89 € | 20-30 € | 60-65% |

**Nota:** Los márgenes GTD son menores porque requieren más gestión manual. El objetivo es automatizar progresivamente las consultas a organismos para reducir el coste operativo.

#### 6.3 Split de pagos (Stripe Connect)

**Modelo recomendado:** Stripe Connect con split automático.

```
Cliente paga 99 € → Stripe retiene comisión (~3% + 0,35 €)
  → Split automático:
    → 59,40 € al AT (transferencia inmediata)
    → 39,60 € a Certilab (ingreso neto)
```

**Ventajas:**
- El AT cobra directamente, sin que Certilab tenga que emitir factura al AT
- Certilab factura al cliente solo su parte
- Transparencia: el AT ve lo que cobra por expediente
- Automatización: sin gestión manual de pagos

**Alternativa:** Stripe normal + Certilab cobra todo y paga al AT como autónomo. Más carga administrativa.

### 7. Estrategia de partnerships (detalle)

#### 7.1 Partnership con ATs

| Aspecto | Término |
|---------|---------|
| **Relación contractual** | Prestación de servicios (autónomo) |
| **Exclusividad** | No. El AT puede tener otros clientes |
| **Comisión** | 60% del precio de venta (por expediente) |
| **Tiempo máximo** | 48h para emitir dictamen (salvo correcciones) |
| **Responsabilidad** | El AT firma el dictamen con su número de colegiado. Responden bajo su seguro de responsabilidad civil. |
| **Beneficios** | Clientes sin esfuerzo comercial, herramienta digital, metodología PITR™, soporte operativo |

#### 7.2 Partnership con Inmobiliarias

| Aspecto | Término |
|---------|---------|
| **Relación** | Acuerdo de colaboración comercial |
| **Modelo** | Recomendación + comisión por cliente |
| **Comisión** | 10-15 € por cliente que complete el servicio |
| **Beneficio inmobiliaria** | Diferenciación: "certificado verificado" como valor añadido |
| **Beneficio Certilab** | Clientes cualificados (necesitan el servicio para vender) |
| **Requisitos** | Sin coste inicial. Sin inversión. Sin exclusividad. |

### 8. Métricas comerciales V1

| Métrica | Definición | Objetivo V1 | Herramienta |
|---------|-----------|-------------|-------------|
| **CAC** | Coste de adquisición de cliente (marketing + ventas / nuevos clientes) | < 25 € | CRM + analítica |
| **LTV** | Ingreso total generado por un cliente | 39,60 € (básico) - 119 € (expandido) | CRM |
| **Ratio LTV/CAC** | LTV / CAC | > 3x | CRM |
| **Tasa de conversión** | Solicitudes que completan pago | > 60% | Plataforma |
| **Tasa de retención** | Clientes que repiten | > 20% en 6 meses | Plataforma |
| **NPS** | Net Promoter Score | ≥ 50 | Post-venta |
| **Tiempo de ciclo** | Desde solicitud hasta dictamen entregado | < 48h | Plataforma |
| **Tasa de ocupación AT** | Tiempo de AT dedicado a expedientes Certilab vs. disponible | > 50% después de los primeros 10 expedientes | Plataforma |

---

## Apéndice A: Políticas operativas

### A.1 Política de cancelación y reembolso

| Situación | Política |
|-----------|----------|
| Cliente cancela antes de asignar AT | Reembolso completo (100%) |
| Cliente cancela después de asignar AT (antes de dictamen) | 50% de reembolso. El AT cobra el 50% de su comisión. |
| Cliente cancela después de dictamen inicial | No hay reembolso. El servicio se considera completado. |
| AT no responde en 24h | Se reasigna. El AT original no cobra. |
| Cliente insatisfecho con el dictamen | Ciclo de correcciones. Si no se resuelve, mediación de Certilab. |

### A.2 Política de SLAs

| SLA | Objetivo | Medición |
|-----|----------|----------|
| Asignación de AT | < 4h desde pago confirmado | Plataforma |
| Primer dictamen | < 48h desde asignación | Plataforma |
| Respuesta a correcciones | < 24h | Plataforma |
| Respuesta a incidencia técnica | < 4h (día laborable) | Ticket |
| Respuesta a consulta de cliente | < 8h | Email / chat |

### A.3 Política de datos y privacidad

- El cliente autoriza el tratamiento de sus datos y los de su inmueble
- El AT accede solo a los datos del expediente asignado
- Los documentos del cliente se almacenan cifrados
- Los datos del cliente se eliminan a los 12 meses de la finalización del expediente (salvo que el cliente solicite su conservación)
- Política GDPR completa (enlace a documento legal)

---

*Fin del documento BP-100-03-MODELO-OPERATIVO-Y-COMERCIAL.md v1.0*