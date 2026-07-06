# EP-102 — Gestión Técnica Documental: Especificación Funcional

| Campo | Valor |
|-------|-------|
| **Código** | EP-102 |
| **Título** | Gestión Técnica Documental — Especificación funcional y de plataforma |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-06 |
| **Estado** | 📋 BORRADOR — Pendiente de aprobación |
| **Precedencia** | Quinto entregable del Business Blueprint. Define GTD como segunda línea de negocio. |
| **Propósito** | Especificar qué es GTD, cómo funciona, qué necesita de la plataforma y cuándo puede implementarse. |

---

## 0. Principios de diseño

1. **GTD es una línea de negocio independiente.** Su modelo operativo, pricing y métricas son propios. Comparte infraestructura y Core con ATI, pero no depende de ella.
2. **Mínimo producto viable.** El primer producto GTD debe ser simple, implementable en semanas (no meses), y validable con clientes reales.
3. **Reutilización del Core V1.** Cliente, Inmueble y Documento IA son los agregados base. No se crean nuevos aggregates sin justificación.
4. **Automatización progresiva.** V1 comienza con gestión manual asistida. V2 automatiza consultas a organismos. V3 aspira a ser completamente automático.
5. **El cliente autoriza, GTD ejecuta.** GTD actúa bajo mandato del cliente (autorización GDPR + poder de representación para consultas).

---

## 1. Definición del servicio

**Gestión Técnica Documental (GTD)** es el servicio que obtiene, organiza y verifica la documentación técnica de un inmueble mediante autorización del cliente y consulta a organismos oficiales.

**No es:**
- Un almacén de documentos (aunque puede custodiar)
- Un servicio de asesoría legal (aunque puede informar)
- Un servicio de gestoría administrativa generalista (se limita a documentación técnica del inmueble)

**Es:**
- Un servicio de inteligencia documental: identifica qué documentos existen, cuáles son necesarios, cuáles faltan
- Un servicio de obtención: consigue los documentos que faltan
- Un servicio de verificación: confirma que los documentos son válidos y están vigentes

---

## 2. Productos GTD (priorizados)

### 2.1 Producto 1: Informe de Situación Documental (P0, V1)

**Descripción:** Auditoría documental de un inmueble. El cliente recibe un informe que dice:
- Qué documentos existen para su inmueble
- Cuáles son válidos y cuáles no
- Cuáles faltan y cómo obtenerlos
- Recomendaciones personalizadas

**Input del cliente:**
- Datos del inmueble (dirección, referencia catastral)
- Opcional: documentos que ya posee (escritura, certificados, etc.)

**Output:**
- Informe digital con la situación documental del inmueble
- Checklist de documentación completa vs. pendiente
- Enlaces/instrucciones para obtener documentos faltantes
- Presupuesto para recopilación completa (si procede)

**Precio estimado:** 29-49 €
**Esfuerzo de implementación:** 2-3 semanas (desarrollo de lógica de identificación documental + UI de informe)

### 2.2 Producto 2: Recopilación Documental Completa (P1, V2)

**Descripción:** Obtención de toda la documentación técnica del inmueble. El cliente autoriza y Certilab gestiona la obtención.

**Input del cliente:**
- Autorización digital (consentimiento GDPR + poder de representación)
- Datos del inmueble
- Opcional: documentos que ya posee

**Proceso:**
1. Identificación de documentos necesarios (herencia del Producto 1)
2. Consulta a organismos oficiales (Catastro, Registro, Ayuntamiento, Colegios, etc.)
3. Obtención y digitalización
4. Organización y verificación de vigencia
5. Entrega al cliente

**Precio estimado:** 99-199 €
**Esfuerzo de implementación:** 6-8 semanas (integraciones con APIs de organismos + gestor documental)

### 2.3 Producto 3: Custodia Documental (P2, V2-V3)

**Descripción:** Archivo digital seguro de la documentación del inmueble con actualizaciones periódicas.

**Modelo:** Suscripción mensual.
**Precio estimado:** 5-15 €/mes.

### 2.4 Producto 4: Informe de Carga Documental (P2, V2)

**Descripción:** Certificación del contenido documental del inmueble para transacciones (venta, herencia, etc.).

**Precio estimado:** 49-89 €.

---

## 3. Catálogo de documentos técnicos por inmueble

### 3.1 Documentos universales (todo inmueble)

| Documento | Organismo emisor | Disponibilidad online | Coste de obtención | Prioridad GTD |
|-----------|-----------------|----------------------|-------------------|--------------|
| Nota simple | Registro de la Propiedad | ✅ API / web | 3-10 € | P0 |
| Escritura de propiedad | Notaría / Registro | ✅ Copia simple | 10-30 € | P0 |
| IBI (último recibo) | Catastro / Ayuntamiento | ✅ Sede electrónica | Gratuito | P0 |
| Referencia catastral | Catastro | ✅ Sede electrónica | Gratuito | P0 |
| Certificado energético | Colegio de ATs / Registro CCAA | ✅ Variable según CCAA | 0-15 € (tasa) | P0 |
| Cédula de habitabilidad | Ayuntamiento / Comunidad Autónoma | ❌ Variable | 0-30 € (tasa) | P0 |
| Planos de la vivienda | Archivo municipal / Colegio de ATs | ❌ Variable | 10-50 € | P1 |
| ITE (si aplica) | Ayuntamiento / Comunidad Autónoma | ❌ Variable | 20-100 € (tasa) | P1 |
| Licencia de obras (si aplica) | Ayuntamiento | ❌ Variable | 10-30 € | P2 |
| Certificado de comunidad | Administrador de fincas | ❌ Manual | Gratuito (gestión) | P1 |

### 3.2 Documentos por tipo de inmueble

| Tipo de inmueble | Documentos adicionales |
|-----------------|----------------------|
| **Vivienda unifamiliar** | Licencia de construcción, certificado final de obra |
| **Piso en comunidad** | Estatutos de la comunidad, acuerdos de junta, certificado de cargas |
| **Local comercial** | Licencia de actividad, certificado de compatibilidad urbanística |
| **Edificio completo** | ITE, libro del edificio, actas de junta, seguro del edificio |

---

## 4. Modelo operativo GTD (detalle)

### 4.1 Flujo del servicio (Producto 1: Informe de Situación)

```
1. Cliente proporciona datos del inmueble (web)
2. Sistema identifica documentos existentes:
   a. Consulta automática a APIs disponibles (Catastro, Registro, etc.)
   b. El cliente puede subir documentos que ya posee
3. Sistema genera informe con:
   - Documentos existentes (verificados)
   - Documentos pendientes
   - Cómo obtener cada documento pendiente (enlace + instrucciones)
   - Presupuesto para que Certilab gestione la obtención
4. Entrega del informe al cliente (email + plataforma)
5. Opcional: upsell a Recopilación Completa
```

**Tiempo estimado:** < 5 minutos (automático) si hay APIs disponibles. < 2h si requiere consulta manual.

### 4.2 Flujo del servicio (Producto 2: Recopilación Completa)

```
1. Cliente autoriza (consentimiento digital)
2. Sistema identifica documentos necesarios (hereda del Informe)
3. Para cada documento:
   ¿Disponible vía API? → Consulta automática → Descarga
   ¿No disponible vía API? → Solicitud telemática → Recepción → Digitalización
   ¿Requiere gestión presencial? → Gestor externo
4. Sistema verifica vigencia de cada documento
5. Sistema organiza y clasifica
6. Entrega al cliente (pack documental digital)
```

**Tiempo estimado:** 2-5 días hábiles.

### 4.3 Roles GTD

| Rol | Responsabilidad | Perfil |
|-----|----------------|---------|
| **Gestor documental** | Ejecuta solicitudes, hace seguimiento, verifica documentos recibidos | Perfil administrativo con conocimiento de documentación de inmuebles |
| **Validador** | Verifica que los documentos obtenidos son correctos y vigentes | Perfil técnico (puede ser AT) |
| **Sistema GTD** | Automatiza consultas, clasifica documentos, genera informes | Software |

---

## 5. Dependencias de plataforma

### 5.1 Capacidades existentes (reutilización directa)

| Capacidad | Agregado | Uso en GTD |
|-----------|----------|------------|
| Cliente | Core V1 | El cliente de GTD es un Cliente existente |
| Inmueble | Core V1 | Cada servicio GTD se asocia a un Inmueble |
| Documento IA | Core V1 | Cada documento obtenido es un Documento IA |
| Expediente | Core V1 | Cada servicio GTD genera un Expediente (tipo gtd) |

### 5.2 Capacidades necesarias (nuevas)

| Capacidad | Prioridad | Descripción | Dependencia externa |
|-----------|-----------|-------------|---------------------|
| **Catálogo de documentos** | P0 | Base de datos de tipos de documento, organismos emisores, costes, URLs de solicitud | No |
| **Motor de identificación documental** | P0 | Lógica que determina qué documentos aplican a un inmueble según sus características | No |
| **Gestor de autorizaciones** | P0 | Consentimiento digital del cliente + poder de representación para consultas | GDPR, firma electrónica básica |
| **Integración Catastro** | P0 | Consulta de datos catastrales vía API pública | API Catastro (gratuita) |
| **Integración Registro** | P0 | Consulta de notas simples vía API | API Registro (precio por consulta) |
| **Gestor de solicitudes** | P1 | Seguimiento de solicitudes a organismos (estado, plazo, resultado) | No |
| **Integración Ayuntamientos** | P1 | Consulta de cédulas, licencias, ITE | Variable (cada ayuntamiento) |
| **Integración Colegios** | P1 | Consulta de planos, certificados | Variable (cada colegio) |
| **Clasificador automático** | P1 | Clasificación de documentos obtenidos por tipo y vigencia | No |
| **Generador de informes** | P0 | Generación del informe de situación documental en PDF | No |

### 5.3 APIs de organismos (mapeo inicial)

| Organismo | API disponible | Coste | Documentos accesibles | Esfuerzo integración |
|-----------|---------------|-------|----------------------|---------------------|
| **Catastro** | ✅ OVCCatastro | Gratuito | Referencia catastral, datos catastrales | Bajo |
| **Registro de la Propiedad** | ✅ Colegio de Registradores API | 3-10 €/consulta | Nota simple | Medio |
| **Sede Electrónica Catastro** | ✅ Sede Electrónica | Gratuito | IBI, certificados catastrales | Bajo |
| **Ayuntamientos** | ❌ Variable | Variable | Cédula, licencias, ITE | Alto (cada uno) |
| **Colegio de ATs** | ❌ Variable | Variable | Planos, certificados | Alto (cada colegio) |
| **Registro CCAA (certificados)** | ❌ Variable | Variable | Certificados energéticos | Medio |

---

## 6. Estrategia de implementación

### 6.1 V1: Informe de Situación Documental (semanas 1-3)

**Objetivo:** Validar demanda del servicio GTD con el producto mínimo.

**Alcance:**
- Catálogo de documentos básico (10-15 tipos)
- Motor de identificación documental (reglas basadas en tipo de inmueble)
- Integración con Catastro (consulta de datos básicos)
- Interfaz de cliente: formulario de datos del inmueble
- Generación de informe (digital, no PDF)
- Sin integración con Registro (precio por consulta no justificado en V1)
- Sin gestión de autorizaciones (el cliente no autoriza, solo recibe información)

**Lo que NO incluye V1:**
- Obtención de documentos
- Integraciones con APIs de pago
- Gestor de autorizaciones
- PDF descargable

**Métrica de validación:**
- 10 clientes que paguen por el informe (o lo soliciten gratuitamente en beta)
- Tasa de conversión a recopilación completa (cuando exista): > 20%

### 6.2 V2: Recopilación Completa + Custodia (semanas 4-12)

**Objetivo:** Servicio completo de obtención documental.

**Nuevo alcance:**
- Gestor de autorizaciones (consentimiento + poder)
- Integración con Registro (nota simple)
- Gestor de solicitudes (seguimiento de trámites)
- Integración con Ayuntamientos (top 5 provincias)
- Clasificador automático de documentos
- Generación de informe PDF
- Dashboard de estado para el cliente

### 6.3 V3: Automatización + Escalado

**Objetivo:** Reducir intervención manual al mínimo.

**Nuevo alcance:**
- Integración con todos los ayuntamientos (vía plataforma única o agregador)
- Integración con Colegios de ATs
- Automatización de la verificación de vigencia
- Custodia documental con suscripción
- API pública para partners (inmobiliarias, administradores)

---

## 7. Riesgos específicos GTD

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| **APIs de Catastro/Registro caídas o lentas** | Media | Medio | Caché de consultas. Fallback a solicitud manual. |
| **Ayuntamientos sin digitalización** | Alta | Alto | V1 solo incluye ayuntamientos con sede electrónica. Para el resto, gestor manual. |
| **Coste de obtención superior al precio** | Media | Alto | Pricing que incluya margen para imprevistos. Precio final con límite. |
| **El cliente no entiende qué recibe** | Media | Medio | Informe en lenguaje claro. Vídeo explicativo. Soporte. |
| **Autorización insuficiente para consultas** | Media | Medio | Asesoría legal. Plantillas de autorización validadas. |
| **Baja demanda del informe de situación** | Alta | Alto | Si no hay demanda, pausar GTD hasta V2. No forzar. |

---

## 8. Métricas de éxito GTD

| Métrica | V1 (Informe) | V2 (Recopilación) |
|---------|-------------|-------------------|
| Clientes/mes | 10-20 | 50+ |
| Tasa de conversión Informe → Recopilación | — | > 20% |
| Tiempo medio de entrega (Informe) | < 2h | — |
| Tiempo medio de entrega (Recopilación) | — | < 5 días hábiles |
| Tasa de éxito (documentos obtenidos) | — | > 80% |
| NPS | — | ≥ 50 |
| Coste operativo medio por servicio | 10-15 € | 40-80 € |
| Margen | 60-70% | 55-60% |

---

## 9. Integración con el resto de la plataforma

### 9.1 GTD + ATI

GTD y ATI operan sobre los mismos agregados (Cliente, Inmueble, Expediente). Un mismo cliente puede tener:
- Un expediente ATI (auditoría de certificado)
- Un expediente GTD (recopilación documental)

**Sinergias:**
- Si GTD identifica que falta el certificado energético, puede ofrecer ATI para auditarlo cuando se obtenga
- Si ATI detecta que la documentación del inmueble está incompleta, puede recomendar GTD
- Ambos servicios comparten el mismo Inmueble (evita duplicidad de datos)

### 9.2 GTD + Documento IA

El agregado Documento IA se extiende para representar cualquier documento técnico, no solo los generados por IA. Cada documento obtenido por GTD es una instancia de Documento IA con:
- `tipo`: tipo de documento (nota_simple, escritura, cedula, etc.)
- `fuente`: organismo emisor
- `fecha_obtencion`: cuándo se obtuvo
- `vigente`: si está vigente o no
- `url`: enlace al documento almacenado

**Extensión necesaria del tipo Documento IA:**
```typescript
// Extensión del tipo base Documento IA para GTD
type DocumentoGTD = {
  id: string;
  inmueble_id: string;
  expediente_id?: string;
  tipo: TipoDocumentoGTD;
  organismo: string;
  fecha_emision?: string;
  fecha_vencimiento?: string;
  fecha_obtencion: string;
  vigente: boolean;
  url: string;
  metadata: Record<string, string>; // datos específicos del documento
};

type TipoDocumentoGTD = 
  | 'nota_simple'
  | 'escritura'
  | 'ibi'
  | 'referencia_catastral'
  | 'certificado_energetico'
  | 'cedula_habitabilidad'
  | 'planos'
  | 'ite'
  | 'licencia_obras'
  | 'certificado_comunidad'
  | 'estatutos_comunidad'
  | 'libro_edificio'
  | 'otro';
```

### 9.3 Nuevo agregado: Catálogo Documental

Se identifica la necesidad de un nuevo agregado: **Catálogo Documental**. Este agregado no es un nuevo Bounded Context, sino una tabla de referencia dentro del contexto de Documento IA.

**Propósito:** Mantener el conocimiento de qué documentos existen, qué organismos los emiten, cómo obtenerlos y cuánto cuestan.

**Estructura propuesta:**
```typescript
type CatalogoDocumental = {
  tipo: TipoDocumentoGTD;
  nombre: string;
  descripcion: string;
  organismo: string;
  url_solicitud: string;
  disponible_api: boolean;
  coste: number; // en euros
  tiempo_obtencion: string; // "inmediato", "1-3 días", "1-2 semanas"
  obligatorio_para: string[]; // ["venta", "alquiler", "herencia"]
};
```

---

## 10. Plan de implementación

| Fase | Semanas | Dependencias | Entregable |
|------|---------|-------------|------------|
| **EP-102 (este documento)** | — | Business Blueprint aprobado | Especificación aprobada |
| **EP-102A (V1 GTD)** | 1-3 | ADR-004 (extensión Documento IA) | Informe de Situación Documental |
| **EP-102B (V2 GTD)** | 4-12 | Integraciones externas, gestor de autorizaciones | Recopilación Completa |
| **EP-102C (V3 GTD)** | 12+ | Automatización, escalado | GTD completo |

**Nota:** EP-102A no se inicia hasta que:
1. El Business Blueprint esté completamente aprobado
2. Se haya validado que la demanda de GTD existe (validación con clientes)
3. Se haya priorizado frente a otras épicas de ATI

---

## Apéndice A: Interfaces de usuario (sketch funcional)

### A.1 Formulario de solicitud de Informe de Situación

```
┌──────────────────────────────────────┐
│  🔍 Informe de Situación Documental    │
│                                        │
│  Dirección del inmueble:               │
│  ┌──────────────────────────────────┐ │
│  │ C/ Ejemplo, 123, 08001 Barcelona │ │
│  └──────────────────────────────────┘ │
│                                        │
│  Referencia catastral (opcional):      │
│  ┌──────────────────────────────────┐ │
│  │ 1234567DF7890A                   │ │
│  └──────────────────────────────────┘ │
│                                        │
│  Documentos que ya tienes (opcional):  │
│  [Subir PDF...]                        │
│                                        │
│  [Solicitar Informe — 39 €]            │
│                                        │
│  * Te diremos qué documentos existen,  │
│    cuáles son válidos y cuáles faltan  │
└──────────────────────────────────────┘
```

### A.2 Informe de Situación (output)

```
┌──────────────────────────────────────┐
│  📋 Informe de Situación Documental    │
│  C/ Ejemplo, 123, 08001 Barcelona      │
│                                        │
│  ✅ Documentos existentes:             │
│  ├── Nota simple (vigente hasta 2027)  │
│  ├── IBI 2026 (pagado)                 │
│  ├── Referencia catastral              │
│  └── Certificado energético (letra D)  │
│                                        │
│  ⏳ Documentos pendientes:             │
│  ├── Cédula de habitabilidad           │
│  │   🔗 Solicitar en Ayuntamiento      │
│  │   🏷️ 20-30 € · 2-5 días            │
│  ├── Planos de la vivienda             │
│  │   🔗 Solicitar en Colegio de ATs    │
│  │   🏷️ 10-50 € · 3-7 días            │
│  └── Certificado de comunidad          │
│  │   🔗 Solicitar al administrador     │
│  │   🏷️ Gratuito · 1-2 días           │
│                                        │
│  📊 Tu inmueble tiene un 40% de        │
│  documentación disponible.             │
│                                        │
│  [Gestionar Recopilación Completa]      │
│  Desde 99 € · Te lo gestionamos todo   │
└──────────────────────────────────────┘
```

---

*Fin del documento EP-102-GESTION-TECNICA-DOCUMENTAL.md v1.0*