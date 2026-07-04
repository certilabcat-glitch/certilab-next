# EP-031 — Motor PITR V1: Análisis Pre-Implementación

> 7 preguntas obligatorias según PRODUCT-FIRST EXECUTION MODE (AGENTS.md §9)
> Ninguna línea de código se escribirá hasta completar este análisis.

---

## 1. ¿Qué hace exactamente el Arquitecto Técnico desde que pulsa "Iniciar revisión" hasta que el expediente queda finalizado?

### Flujo completo paso a paso

**Punto de partida:** El AT está en la Bandeja Técnica (`/at/dashboard`) y ve la lista de expedientes en estado `PteDocumentacion`.

```
1. AT pulsa "Iniciar revisión" sobre un expediente
   ↓
2. Se abre la página de detalle/revisión del expediente
   ↓
3. AT VE los datos del expediente (solo lectura):
   - Número de expediente, servicio, fechas
   - Datos del Cliente (nombre, email, teléfono)
   - Datos del Inmueble (referencia catastral, dirección, tipo, superficie)
   ↓
4. AT VE los documentos subidos por el cliente:
   - Certificado energético original (PDF)
   - Fotografías del inmueble
   - Documentación complementaria
   ↓
5. AT VALIDA la documentación:
   - ¿El certificado es legible y corresponde al inmueble?
   - ¿Las fotografías son del inmueble correcto?
   - ¿Hay documentación suficiente para continuar?
   ↓
   Opción A: Documentación insuficiente → Marcar como "Solicitar más documentación"
      → Expediente vuelve a PteDocumentacion
      → El cliente recibe notificación
   Opción B: Documentación correcta → Continúa
   ↓
6. AT INTRODUCE MANUALMENTE las variables del certificado CE3X:
   - Demanda de calefacción (kWh/m² año)
   - Demanda de refrigeración (kWh/m² año)
   - Consumo de energía primaria no renovable (kWh/m² año)
   - Consumo de energía primaria total (kWh/m² año)
   - Emisiones de CO₂ (kgCO₂/m² año)
   - Calificación energética (A-G)
   - Año de construcción del inmueble
   - Superficie útil (m²)
   - Tipo de instalación de calefacción
   - Tipo de instalación de ACS
   - Tipo de instalación de refrigeración
   ↓
7. AT REVISA el certificado contrastando con evidencias:
   - Compara los datos del certificado con las fotografías
   - Identifica posibles contradicciones (ej: ventanas selladas en
     certificado pero fotos muestran ventanas abiertas al exterior)
   - Evalúa coherencia general
   ↓
8. AT TOMA UNA DECISIÓN:
   - **APROBAR** → El expediente pasa a estado `Aprobado`
   - **RECHAZAR** → El expediente pasa a estado `Rechazado`
     (motivo de rechazo obligatorio)
   - **SOLICITAR MÁS DOCUMENTACIÓN** → Vuelve a `PteDocumentacion`
   ↓
9. Confirmación:
   - AT ve el resultado de su acción
   - Vuelve a la Bandeja Técnica
   ↓
10. Sistema genera informe final automáticamente
    → Estado `Entregado`
```

---

## 2. ¿Qué información necesita ver el AT?

### Usando únicamente el Core existente

Del agregado **Expediente** (ya implementado):
- `numero_expediente` (EXP-YYYY-NNNNNN)
- `servicio` (tipo de servicio)
- `titulo`
- `notas`
- `created_at` (fecha de solicitud)
- `updated_at` (última actualización)
- `estado` (actual)

Del agregado **Cliente** (ya implementado):
- `nombre`
- `email`
- `telefono`

Del agregado **Inmueble** (ya implementado):
- `referencia_catastral`
- `direccion`
- `tipo` (vivienda, local, etc.)
- `superficie`
- `anyo_construccion`

Del agregado **Documento IA** (ya implementado):
- Lista de documentos tipo `CERTIFICADO_ORIGINAL` (URL del PDF)
- Lista de documentos tipo `FOTOGRAFIA` (URLs de imágenes)
- Lista de documentos tipo `DOCUMENTACION_COMPLEMENTARIA`
- `estado_ia` de cada documento
- `hash_sha256`

**No se necesita NINGÚN campo adicional para la visualización.**

---

## 3. ¿Qué decisiones toma el AT?

1. **Validar documentación recibida** → ¿Es correcta y suficiente?
2. **Solicitar documentación adicional** → Si falta algo, volver a PteDocumentacion
3. **Introducir variables CE3X** → Transcribir manualmente los datos del certificado
4. **Evaluar coherencia** → Detectar contradicciones visibles
5. **Aprobar expediente** → Certificado válido → estado `Aprobado`
6. **Rechazar expediente** → Certificado inválido → estado `Rechazado` + motivo

**En V1, las decisiones 1-4 son manuales y no requieren automatización.**

---

## 4. ¿Qué resultado produce el Motor PITR V1?

### Entregable funcional

El **Informe Técnico Certilab** — un documento digital que contiene:

- **Cabecera:**
  - Número de expediente
  - Fecha de emisión
  - Nombre del AT que realizó la revisión

- **Datos del cliente y del inmueble** (resumen)

- **Resultado de la revisión:**
  - APROBADO o RECHAZADO
  - Nivel de confianza (100% en V1 si AT aprueba, 0% si rechaza)

- **Variables CE3X verificadas** (tabla con los valores introducidos)

- **Observaciones del AT:**
  - Notas sobre la revisión
  - Contradicciones detectadas (si las hay)
  - Recomendaciones

- **En caso de RECHAZO:**
  - Motivo detallado obligatorio

- **Firma del AT** (nombre y fecha)

El informe se almacena como un nuevo documento tipo `INFORME_FINAL` en el agregado Documento IA y queda accesible para el cliente.

---

## 5. ¿Qué componentes nuevos son imprescindibles?

### Solo los mínimos

**A. En el agregado Expediente (nuevos campos en la tabla):**
- `variables_ce3x` (JSONB) — Almacena las variables introducidas por el AT
  ```json
  {
    "demanda_calefaccion": 45.2,
    "demanda_refrigeracion": 12.8,
    "consumo_energia_no_renovable": 78.5,
    "consumo_energia_total": 112.3,
    "emisiones_co2": 22.1,
    "calificacion_energetica": "C",
    "anyo_construccion": 2005,
    "superficie_util": 85.0,
    "tipo_calefaccion": "gas_natural",
    "tipo_acs": "gas_natural",
    "tipo_refrigeracion": "electrico_split"
  }
  ```
- `resultado_revision` (TEXT nullable) — `aprobado` | `rechazado` (resultado final del AT)
- `motivo_rechazo` (TEXT nullable) — Obligatorio si resultado = rechazado
- `observaciones_at` (TEXT nullable) — Notas libres del AT
- `at_user_id` (UUID nullable) — ID del AT que revisó
- `fecha_revision` (TIMESTAMPTZ nullable) — Cuándo se completó la revisión

**B. Nuevas rutas (Server Actions):**
- `src/lib/actions/revisar-expediente.ts` — Acciones del AT sobre el expediente:
  - `iniciarRevision(expedienteId, atUserId)` → Cambia estado `PteDocumentacion` → `EnRevisionPITR`
  - `guardarVariablesCe3x(expedienteId, variables)` → Guarda las variables CE3X
  - `aprobarExpediente(expedienteId, atUserId, observaciones)` → `RevisionManual` → `Aprobado`
  - `rechazarExpediente(expedienteId, atUserId, motivo)` → `RevisionManual` → `Rechazado`
  - `solicitarMasDocumentacion(expedienteId, atUserId, motivo)` → `RevisionManual` → `PteDocumentacion`

**C. Una nueva página:**
- `/at/expedientes/[id]` — Página de revisión del AT (interfaz completa)

**D. Servicio de dominio:**
- `src/lib/core/pitr.service.ts` — Orquesta el flujo PITR V1 manual:
  - `iniciarAnalisis(expedienteId, atUserId)`
  - `registrarVariablesCe3x(expedienteId, variables)`
  - `completarRevision(expedienteId, decision)`
  - `generarInformeTecnico(expedienteId)` → genera el informe final

---

## 6. ¿Qué partes quedan explícitamente fuera?

### Todo lo que pertenece a V2+

- IA (Inteligencia Artificial) — ningún modelo, ninguna inferencia
- OCR (Reconocimiento Óptico de Caracteres) — no se extraen datos automáticamente
- Extracción automática de datos del PDF — el AT introduce manualmente
- Modelos de machine learning
- Embeddings vectoriales
- RAG (Retrieval Augmented Generation)
- Agentes autónomos
- Procesamiento distribuido o asíncrono
- Colas (RabbitMQ, Redis, SQS...)
- Workers o jobs en background
- Evaluación automática de confianza (el AT decide directamente)
- Detección automática de contradicciones (el AT las identifica)
- Generación automática de informes con IA (plantilla fija, relleno manual)
- Clasificación automática de fotografías
- Cálculo automático de nivel de confianza PITR
- Event Bus o sistema de eventos para integraciones
- WebSockets o actualizaciones en tiempo real
- Microservicios o separación de procesos
- CQRS, Event Sourcing, arquitectura hexagonal

**Tecnologías específicamente excluidas de V1:**
- OpenAI / Anthropic / modelos de LLM
- Tesseract / cualquier OCR
- LangChain, LlamaIndex, Haystack
- pgvector, embeddings
- Redis, RabbitMQ, Kafka
- BullMQ, Celery, Sidekiq
- Serverless functions para procesamiento
- Workers en segundo plano
- Sistemas de colas de Supabase (pg_net, pg_cron para automatización)

---

## 7. ¿Cuál es la implementación más pequeña posible?

### Flujo funcional mínimo

```
Bandeja AT (/at/dashboard)
  ↓  (muestra expedientes en PteDocumentacion)
AT hace clic en un expediente
  ↓
Página de revisión AT (/at/expedientes/[id])
  ↓
AT ve:
  ├── Datos del expediente (de ExpedienteRow existente)
  ├── Datos del cliente (de ClienteRow, consulta a cliente.repository)
  ├── Datos del inmueble (de InmuebleRow, consulta a inmueble.repository)
  ├── Documentos subidos (de DocumentoRow, listado por expediente_id)
  └── Formulario para introducir variables CE3X (input manual)
        ↓
AT completa el formulario y pulsa "Finalizar revisión"
  ↓
Server Action guarda variables CE3X en el expediente (nuevo campo JSONB)
  ↓
Server Action cambia estado: PteDocumentacion → EnRevisionPITR → Auditado
  ↓
AT ve un panel de decisión:
  ┌─ "Aprobar" → Guarda resultado, observaciones
  │              Cambia estado: Auditado → Aprobado
  │              Se genera informe final automáticamente
  │              Cambia estado: Aprobado → Entregado
  │
  └─ "Rechazar" → Solicita motivo obligatorio
                   Cambia estado: Auditado → Rechazado
                   Se genera informe final automáticamente
                   Cambia estado: Rechazado → Devuelto
  ↓
AT vuelve a la Bandeja Técnica
  ↓  (el expediente ya no aparece como pendiente)
FIN
```

### Simplificaciones clave para V1

1. **Sin "nivel de confianza":** El AT decide directamente aprobar/rechazar.
2. **Sin detección de contradicciones:** El AT las identifica y las anota en observaciones.
3. **Sin estados intermedios complejos:** `PteDocumentacion` → revisión → `Aprobado`|`Rechazado`.
4. **Un solo paso:** El AT revisa, introduce variables y decide en una misma página.
5. **Sin historial de cambios:** Solo se guarda el resultado final y las observaciones.
6. **Una sola migración de BD:** Añadir columnas a `core.expediente`.
7. **Sin nuevo agregado:** Todo vive dentro del Expediente existente.
8. **Sin tabla nueva:** Solo columnas adicionales en `core.expediente`.
9. **Documento IA se reutiliza:** Los documentos ya están subidos y accesibles.
10. **Cliente e Inmueble son solo lectura:** Se consultan pero no se modifican.