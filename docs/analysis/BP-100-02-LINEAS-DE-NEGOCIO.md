# BP-100-02 — Líneas de Negocio: Especificación Formal

| Campo | Descripción |
|-------|-------------|
| **Código** | BP-100-02 |
| **Título** | Líneas de Negocio — Especificación detallada de ATI y GTD |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-06 |
| **Estado** | 📋 BORRADOR — Pendiente de aprobación |
| **Precedencia** | Segundo entregable del Business Blueprint. EP-100, bloque 2 de 7. |
| **Propósito** | Definir formalmente las dos primeras líneas de negocio de Certilab: **Auditoría Técnica de Inmuebles (ATI)** y **Gestión Técnica Documental (GTD)**. |

---

## 0. Principio rector

> **Una línea de negocio es una unidad estratégica autónoma. Cada una tiene:**
> - Propuesta de valor independiente
> - Mercado objetivo definido
> - Modelo de ingresos propio
> - Métricas de éxito específicas
> - Capacidad de operar sin depender de las otras líneas
>
> **Comparten:** infraestructura tecnológica, Core V1, red de ATs, marca, operaciones.

---

## 1. Línea 1: Auditoría Técnica de Inmuebles (ATI)

### 1.1 Declaración de la línea

> **ATI verifica la corrección técnica de documentos y certificados de un inmueble mediante profesionales colegiados, con metodología auditable y entrega digital.**

### 1.2 Propuesta de valor

**Para el cliente final (propietario):**
"Te decimos si tu certificado/documento técnico es correcto, sin que tengas que saber de normativa. Garantía de un Arquitecto Técnico colegiado. Si no es correcto, te explicamos por qué y cómo corregirlo."

**Para el AT:**
"Te proporcionamos clientes, herramienta digital y metodología estandarizada para que ofrezcas auditoría técnica sin esfuerzo comercial ni operativo. Tú pones el conocimiento técnico, nosotros el resto."

### 1.3 Mercado objetivo

| Segmento | Descripción | Tamaño estimado | Prioridad |
|----------|-------------|-----------------|-----------|
| **Propietario vendedor** | Necesita verificar su certificado antes de vender | ~3,5M transacciones/año en España | P0 (V1) |
| **Propietario arrendador** | Necesita verificar su certificado antes de alquilar | Incluido en el volumen anterior | P0 (V1) |
| **Comprador precavido** | Quiere verificar el certificado del inmueble que va a comprar | Mercado por validar | P1 (V2) |
| **Comunidad de propietarios** | Necesita auditoría de certificados de todo un edificio (ITE, eficiencia) | ~1M comunidades en España | P1 (V2) |
| **Administrador de fincas** | Gestiona múltiples propiedades y necesita auditoría centralizada | ~8.000 administradores en España | P1 (V2) |
| **Inmobiliaria** | Quiere ofrecer "certificado verificado" como valor añadido | ~30.000 agencias en España | P1 (V2) |

### 1.4 Productos dentro de la línea

| Producto | Descripción | Precio V1 | Precio futuro | Prioridad |
|----------|-------------|-----------|---------------|-----------|
| **Segunda Opinión PITR™** | Auditoría completa de un certificado energético. PITR™ + revisión AT + dictamen | 99 € | 99-149 € | P0 ✅ (MVP) |
| **Segunda Opinión Express** | Auditoría rápida (solo PITR™, sin correcciones) | — | 49-69 € | P2 (V2) |
| **Informe Técnico Energético** | Dictamen formal detallado con valor legal | — | 199-299 € | P2 (V2) |
| **ITE Express** | Auditoría básica de ITE (Inspección Técnica de Edificios) | — | Por definir | V3 |
| **Auditoría de Accesibilidad** | Verificación de condiciones de accesibilidad | — | Por definir | V3 |

### 1.5 Métricas de éxito

| Métrica | Objetivo V1 | Objetivo V2 | Objetivo V3 |
|---------|-------------|-------------|-------------|
| Expedientes/mes | 20-50 | 200 | 500+ |
| NPS | ≥ 50 | ≥ 60 | ≥ 70 |
| Tiempo medio por expediente | < 48h | < 24h | < 12h |
| Satisfacción AT (eNPS) | — | ≥ 40 | ≥ 50 |
| Ingreso neto medio por expediente | 35-40 € | 40-50 € | 45-60 € |
| Tasa de correcciones solicitadas | < 30% | < 20% | < 15% |
| Tasa de reclamaciones | < 5% | < 3% | < 2% |

### 1.6 Ciclo de vida del producto (V1)

```
Solicitud → Pago → PITR™ → Asignación AT → Revisión → 
↕ (ciclo de correcciones si necesario) → Dictamen → Entrega → Post-venta
```

### 1.7 Dependencias de la plataforma

| Capacidad | Estado | Notas |
|-----------|--------|-------|
| Core V1 (Cliente, Inmueble, Expediente, Documento IA) | ✅ Implementado | Congelado |
| PITR™ v1 | ✅ Implementado | Árbol manual |
| Workflow de correcciones | ✅ Implementado | Ciclo AT ↔ cliente |
| Entrega de resultado | ✅ Implementado | Dictamen formal |
| Pasarela de pago | ❌ Pendiente | Stripe Connect para split de pagos |
| Modo invitado | ❌ Pendiente | Reducir fricción en solicitud |
| Email transaccional | ❌ Pendiente | Notificaciones de estado |
| PDF descargable | ❌ Pendiente | Dictamen en PDF |

---

## 2. Línea 2: Gestión Técnica Documental (GTD)

### 2.1 Declaración de la línea

> **GTD obtiene, organiza y verifica la documentación técnica de un inmueble mediante autorización del cliente y consulta a organismos oficiales, eliminando la carga burocrática del propietario.**

### 2.2 Propuesta de valor

**Para el cliente final (propietario):**
"Te conseguimos toda la documentación técnica de tu inmueble sin que tengas que llamar a ningún organismo, rellenar ningún formulario ni saber qué documentos existen. Tú autorizas, nosotros gestionamos."

**Para el AT / partner:**
"Cuando necesites documentación técnica de un inmueble para tu trabajo, GTD te la proporciona completa y verificada, sin que pierdas tiempo en gestiones burocráticas."

### 2.3 Mercado objetivo

| Segmento | Descripción | Tamaño estimado | Prioridad |
|----------|-------------|-----------------|-----------|
| **Propietario vendedor** | Necesita recopilar documentación para la venta (cédula, certificados, planos) | Dentro de ~3,5M transacciones/año | P0 (V1 planificado) |
| **Propietario que hereda** | Recibe un inmueble y no sabe qué documentación existe | ~200.000 herencias/año | P1 (V2) |
| **Comunidad de propietarios** | Necesita el libro del edificio, ITE, planos | ~1M comunidades | P1 (V2) |
| **AT/Arquitecto** | Necesita documentación base para su trabajo técnico | ~15.000 ATs | P1 (V2) |
| **Inmobiliaria** | Quiere ofrecer "documentación completa" como servicio premium | ~30.000 agencias | P2 (V2) |

### 2.4 Productos dentro de la línea

| Producto | Descripción | Precio estimado | Prioridad |
|----------|-------------|-----------------|-----------|
| **Informe de Situación Documental** | Auditoría de qué documentación existe y cuál falta para un inmueble concreto | 29-49 € | P0 (primer producto GTD) |
| **Recopilación Documental Completa** | Obtención de toda la documentación existente (con autorización + consulta a organismos) | 99-199 € | P1 (V2) |
| **Custodia Documental** | Archivo digital seguro de la documentación del inmueble con actualizaciones | Suscripción 5-15 €/mes | P2 (V2-V3) |
| **Informe de Carga Documental** | Certificación del contenido documental del inmueble para transacciones | 49-89 € | P2 (V2) |

### 2.5 Problema que resuelve GTD

**Escenario típico:**
Un propietario quiere vender su piso. El comprador pide:
- Cédula de habitabilidad
- Certificado energético
- Último recibo del IBI
- Nota simple del Registro
- Planos de la vivienda
- Certificado de estar al corriente de comunidad

El propietario no sabe:
- Qué documentos existen
- Dónde solicitarlos
- Cuánto cuestan
- Cuánto tardan
- Si los que tiene son válidos

**GTD resuelve todo esto con una autorización única.**

### 2.6 Modelo operativo de GTD

```
Cliente autoriza → GTD identifica documentos necesarios →
  ┌─ ¿Documento disponible online? → Consulta API organismo → Descarga
  └─ ¿Documento no disponible online? → Solicitud telemática → Recepción → Digitalización
→ Organización → Verificación de vigencia → Entrega al cliente
```

**Tipos de consulta:**

| Tipo | Ejemplo | Método | Coste para Certilab |
|------|---------|--------|---------------------|
| **API pública** | Catastro, Sede Electrónica | Automático vía API | Gratuito o tasa mínima |
| **Solicitud telemática** | Ayuntamiento (cédula), Colegio (planos) | Formulario web + seguimiento | Bajo (tiempo del gestor) |
| **Presencial (excepcional)** | Organismo sin digitalización | Gestor externo | Medio (coste del gestor) |

### 2.7 Métricas de éxito

| Métrica | Objetivo V1 (planificado) | Objetivo V2 |
|---------|---------------------------|-------------|
| Informes de situación/mes | 10-20 | 100+ |
| Recopilaciones completas/mes | — | 50+ |
| Tiempo medio de recopilación | < 5 días hábiles | < 3 días |
| Tasa de éxito (documentos obtenidos) | > 80% | > 90% |
| NPS | — | ≥ 50 |
| Ingreso neto medio por servicio | 15-25 € (informe) / 40-80 € (recopilación) | — |

### 2.8 Dependencias de la plataforma

| Capacidad | Estado | Notas |
|-----------|--------|-------|
| Core V1 (Cliente, Inmueble) | ✅ Implementado | Reutilización directa |
| Agregado Documento IA | ✅ Implementado | Potencial extensión (ver EP-101) |
| Notificaciones al cliente | ❌ Pendiente | Email transaccional |
| Autorización digital del cliente | ❌ Pendiente | Consentimiento GDPR + poder de representación |
| Integración con APIs de organismos | ❌ Pendiente | Catastro, Sede Electrónica, etc. |
| Gestor documental interno | ❌ Pendiente | Organización y clasificación |

---

## 3. Relación entre líneas de negocio

### 3.1 Sinergias

| Sinergia | ATI → GTD | GTD → ATI |
|----------|-----------|-----------|
| **Cliente compartido** | Un cliente que pide auditoría ATI puede necesitar GTD para recopilar documentación | Un cliente que pide GTD puede descubrir que su certificado necesita auditoría |
| **Inmueble compartido** | Ambos servicios operan sobre el mismo inmueble (Core V1) | Misma reutilización |
| **AT como prescriptor** | El AT que auditó un certificado puede recomendar GTD | El AT que necesita documentación para su trabajo puede pedir GTD |
| **Documentación** | El dictamen ATI es un documento más que GTD puede gestionar | GTD puede aportar documentos que el AT necesita para su auditoría |
| **Confianza** | ATI genera confianza → el cliente confía para GTD | GTD demuestra capacidad → el cliente confía para ATI |

### 3.2 Separación

| Dimensión | ATI | GTD |
|-----------|-----|-----|
| **Núcleo del servicio** | Juicio técnico de un profesional colegiado | Gestión burocrática y documental |
| **Responsable de la ejecución** | AT (profesional titulado) | Gestor documental (perfil administrativo) |
| **Margen** | 80-87% (más alto) | 60-70% (más gestión manual) |
| **Escalabilidad** | Limitada por número de ATs | Limitada por capacidad de gestión |
| **Automatización posible** | Alta (PITR™ guiado) | Media (depende de APIs de organismos) |
| **Valor percibido por el cliente** | Alto (tranquilidad, seguridad) | Alto (ahorro de tiempo, evita gestión) |

### 3.3 Orden de implementación

1. **ATI primero** (V1) — Ya implementado. Validar demanda.
2. **GTD después** (V2) — Cuando ATI haya validado el modelo de negocio y exista tracción.

**Razón:** ATI tiene mayor margen, menor coste operativo y reutiliza directamente el Core V1 sin necesidad de nuevas capacidades de plataforma. GTD requiere integraciones externas (APIs de organismos) y un perfil de gestor que aún no existe.

---

## 4. Reserva: futuras líneas de negocio

### 4.1 Línea 3: (reservada)

Esta línea queda reservada para cuando el negocio madure. Posibles candidatos identificados:

| Candidato | Problema que resuelve | Requisito para activarse |
|-----------|----------------------|------------------------|
| **Formación Técnica** | ATs necesitan formación continua en normativa | Marca establecida, audiencia de ATs consolidada |
| **Consultoría de Rehabilitación** | Propietarios necesitan asesoría para obras de mejora | Volumen de expedientes suficiente, datos del Observatorio |
| **Marketplace de Servicios Técnicos** | Propietarios necesitan contratar ATs para obra concreta | Red de ATs amplia y consolidada |

**Regla:** Ninguna línea 3 se activará sin:
1. Validación de demanda real
2. Modelo de ingresos viable
3. Justificación de que no puede resolverse mediante ATI o GTD
4. ADR aprobada (si afecta a la arquitectura de la plataforma)

---

## 5. Matriz de decisión: ¿ATI o GTD para un problema concreto?

Esta matriz ayuda a determinar en qué línea de negocio encaja un problema del cliente:

| El problema del cliente es... | Línea | Razón |
|------------------------------|-------|-------|
| "No sé si mi certificado es correcto" | ATI | Requiere juicio técnico de un AT |
| "No sé qué documentos tiene mi piso" | GTD | Es una cuestión de identificación documental |
| "Necesito el certificado energético para vender" | GTD (obtención) + ATI (verificación) | Primero obtenerlo, luego auditarlo |
| "Mi certificado tiene errores, ¿cómo lo corrijo?" | ATI | El dictamen identifica los errores; la corrección la hace el emisor original |
| "Quiero saber si puedo construir una terraza" | Línea 3 (futura) | No es documentación ni auditoría, es consultoría técnica |
| "Necesito los planos de mi casa" | GTD | Búsqueda y obtención documental |
| "Mi comunidad necesita la ITE" | ATI (auditoría) + GTD (documentación previa) | Ambas líneas colaboran |

---

## 6. Riesgos específicos por línea

### 6.1 Riesgos ATI

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| **Dependencia de ATs** | Alta | Alto | Onboarding múltiple desde V1. Estandarización PITR™. |
| **Saturación de AT** | Media | Alto | Pool de ATs. Sistema de colas. Auto-asignación. |
| **Calidad inconsistente entre ATs** | Media | Alto | Guías de revisión. Doble ciego para muestras. NPS por AT. |
| **Baja demanda** | Media | Alto | SEO + contenido. Validación con 10 expedientes reales. |

### 6.2 Riesgos GTD

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| **APIs de organismos no disponibles** | Alta | Alto | Plan B: gestor manual. Estandarización del proceso de solicitud. |
| **Coste de gestión más alto de lo estimado** | Media | Alto | Automatización progresiva. Pricing que refleje el coste real. |
| **Complejidad GDPR** (el cliente autoriza el acceso a sus datos) | Media | Medio | Consentimiento explícito + política de datos + plazo de destrucción. |
| **Dependencia de terceros** (organismos que tardan en responder) | Alta | Medio | SLAs realistas en la comunicación al cliente. Seguimiento proactivo. |

---

## 7. Próximos pasos para cada línea

| Acción | ATI | GTD |
|--------|-----|-----|
| Validar demanda con clientes reales | ✅ V1 (hito: 10 expedientes) | 📋 Pendiente (EP-102) |
| Definir producto mínimo | ✅ MVP listo (Segunda Opinión) | 📋 Pendiente (EP-102) |
| Implementar en plataforma | ✅ Core V1 implementado | 📋 Pendiente (EP-101 + desarrollo) |
| Establecer pricing | ✅ 99 € (Segunda Opinión) | 📋 Pendiente (EP-102) |
| Incorporar ATs | ⏳ En curso (red inicial) | 🟡 No aplica (gestores documentales) |
| Diseñar customer journey | ✅ BP-100-01 (sección 7) | 📋 Pendiente (EP-102) |
| Definir métricas | ✅ BP-100-02 (sección 1.5) | 📋 Pendiente (EP-102) |

---

## Apéndice A: Escenarios de uso combinados

### Escenario 1: Venta de vivienda (full service)

```
1. El propietario contacta a Certilab para vender su piso
2. GTD: Identificamos qué documentación tiene y cuál falta
3. GTD: Obtenemos la documentación faltante (cédula, nota simple, etc.)
4. ATI: Auditamos el certificado energético (Segunda Opinión PITR™)
5. ATI: Emitimos dictamen de corrección si es necesario
6. GTD: Entregamos pack documental completo al propietario
7. El propietario vende con toda la documentación en regla y certificado verificado
```

### Escenario 2: Comunidad de propietarios

```
1. El administrador de fincas contacta a Certilab
2. GTD: Recopilamos documentación de cada propietario (con autorización)
3. ATI: Auditamos los certificados energéticos de toda la comunidad
4. ATI: Identificamos si la comunidad necesita ITE
5. GTD: Obtenemos la ITE si es necesaria
6. Entregamos informe consolidado al administrador
```

---

*Fin del documento BP-100-02-LINEAS-DE-NEGOCIO.md v1.0*