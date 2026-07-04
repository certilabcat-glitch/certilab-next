# CF-026 — Expediente Design (Refinado)

| Campo | Descripción |
|-------|-------------|
| **Código** | CF-026 |
| **Título** | Expediente Design — Diseño del agregado Expediente |
| **Versión** | 2.0 (refinado) |
| **Fecha** | 2026-07-03 |
| **Autor** | Certilab® — Arquitectura de Dominio |
| **Propósito** | Definir el diseño del agregado Expediente: identidad, estructura, invariantes, ciclo de vida, eventos y casos especiales. Este documento contiene **exclusivamente lógica de dominio**. Las políticas configurables (umbrales, SLA, temporizadores) residen en CF-040-BUSINESS-POLICIES.md. |
| **Dependencias** | CF-021 (Domain Model), CF-022 (Aggregate Boundaries), CF-025 (Inmueble Design), CF-040 (Business Policies) |
| **Audiencia** | Arquitectos, desarrolladores DDD |
| **Lenguaje** | Términos del dominio, sin tecnología, sin SQL, sin implementación |

---

## Índice

1. [Objetivo](#1-objetivo)
2. [Identidad](#2-identidad)
3. [Estructura del agregado](#3-estructura-del-agregado)
4. [Relaciones con otros agregados](#4-relaciones-con-otros-agregados)
5. [Ciclo de vida](#5-ciclo-de-vida)
6. [Máquina de estados](#6-máquina-de-estados)
7. [Invariantes](#7-invariantes)
8. [Reglas de negocio (dominio)](#8-reglas-de-negocio-dominio)
9. [Eventos emitidos y consumidos](#9-eventos-emitidos-y-consumidos)
10. [Casos especiales](#10-casos-especiales)

---

## 1. Objetivo

El **Expediente** es el agregado raíz del proceso de certificación energética auditada. Representa una solicitud de auditoría de certificado energético desde que el cliente la inicia hasta que el certificado auditado es entregado.

Cada Expediente encapsula:

- Los datos de la solicitud (tipo de servicio, cliente, inmueble).
- El certificado energético original aportado por el cliente.
- El proceso de auditoría automática (motor PITR) con sus evidencias, preguntas, contradicciones y niveles de confianza.
- El resultado de la revisión humana.
- El certificado auditado generado.
- El historial completo de cambios de estado.

**Este documento contiene exclusivamente lo que el agregado ES y las reglas que debe CUMPLIR.** Los valores numéricos, umbrales y políticas configurables se definen en **CF-040**.

---

## 2. Identidad

| Propiedad | Descripción |
|-----------|-------------|
| **Identidad interna** | `expediente_id` — UUID v7 generado por el sistema. Es la clave primaria del agregado. |
| **Identidad de negocio** | `codigoExpediente` — Código visible para el cliente con formato definido en CF-040. Es único en el sistema. |
| **Tipo de identidad** | Dual: interna (UUID) + negocio (código). La interna es la verdadera identidad del agregado. La de negocio es un alias legible. |

### 2.1 Atributos de identidad

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `expediente_id` | UUID v7 | Identificador interno. Se asigna en creación. Inmutable. |
| `codigoExpediente` | string | Código visible. Formato y generación según política CF-040. Se asigna en creación. Inmutable. |
| `tipoServicio` | enum | Tipo de servicio solicitado. Define el propósito del expediente. |

### 2.2 Tipos de servicio (V1)

| Tipo | Descripción |
|------|-------------|
| `auditoriaCertificado` | Auditoría de un certificado energético existente. |
| `segundaOpinion` | Segunda opinión sobre un certificado ya auditado. |
| `renovacion` | Renovación de un certificado previo. |
| `certificacionNueva` | Certificación energética desde cero. |

---

## 3. Estructura del agregado

### 3.1 Límite del agregado

```
┌─────────────────────────────────────────────────────────────────────┐
│                        EXPEDIENTE (Aggregate Root)                    │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  Datos generales                                                 │ │
│  │  expediente_id, codigoExpediente, tipoServicio,                  │ │
│  │  clienteId, inmuebleId, arquitecnicoId, expedienteAnteriorId,    │ │
│  │  estado, version, fechas (creacion, modificacion, entrega)       │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  CertificadoOriginal (Value Object)                              │ │
│  │  pdf_url, variablesCE3X[], calificacionDeclarada,                │ │
│  │  fechaEmision, organismoEmisor, hashDocumento                    │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  AuditoriaPITR (Entity interna)                                  │ │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐   │ │
│  │  │ Evidencias[] │  │ Preguntas[]  │  │ Contradicciones[]    │   │ │
│  │  └─────────────┘  └──────────────┘  └──────────────────────┘   │ │
│  │  ┌──────────────────────────────┐  ┌────────────────────┐      │ │
│  │  │ Confianza (global + por var) │  │ InformePITR        │      │ │
│  │  └──────────────────────────────┘  └────────────────────┘      │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  CertificadoAuditado (Value Object)                              │ │
│  │  variablesCE3X[], calificacionAuditada, discrepancias[],        │ │
│  │  pdf_url, hashDocumento                                          │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  HistorialCambiosEstado (lista de Value Objects)                 │ │
│  │  [{ estadoAnterior, estadoNuevo, fecha, usuarioId, motivo }]    │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  NotasPostEntrega (lista de Value Objects)                       │ │
│  │  [{ notaId, tipo, contenido, fecha, autor }]                    │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Entidades internas del agregado

| Entidad | Descripción | Identidad local |
|---------|-------------|-----------------|
| `AuditoriaPITR` | Representa el proceso de auditoría automática (1:1 con Expediente) | auditId (local al agregado) |
| `CambioEstado` | Una transición de estado en el historial | cambioId (secuencial local) |

Estas entidades existen **dentro** del agregado Expediente. No son accesibles desde fuera. Solo la raíz Expediente puede ser referenciada.

### 3.3 Datos propietarios (pertenecen exclusivamente a Expediente)

| Dato | ¿Se replica? | Motivo |
|------|-------------|--------|
| código de expediente | No | Identidad del proceso de certificación |
| tipo de servicio | No | Define el propósito del expediente |
| variables CE3X del certificado original | No | Datos específicos de este certificado |
| calificación energética declarada | No | Calificación que el cliente declaró |
| variables CE3X verificadas (auditadas) | No | Resultado de la verificación |
| calificación energética auditada | No | Resultado de la auditoría |
| discrepancias original vs. auditado | No | Solo tienen sentido dentro del contexto del expediente |
| evidencias fotográficas y documentales | No | Específicas de esta auditoría |
| preguntas respondidas del árbol PITR | No | Específicas de la interacción con este cliente |
| contradicciones detectadas y resueltas | No | Resultado del análisis de este expediente |
| nivel de confianza global y por variable | No | Se calcula para este expediente |
| informe PITR | No | Se genera para este expediente |
| historial de cambios de estado | No | Bitácora de este expediente |
| notas y anexos post-entrega | No | Solo existen aquí |
| asignación del Arquitecto Técnico | No | Solo existe aquí (referencia a Usuario) |
| fechas de creación, modificación, cierre, entrega | No | Marcas temporales del ciclo de vida |

### 3.4 Datos referenciados (pertenecen a otros agregados)

| Dato | Agregado propietario | Uso en Expediente |
|------|---------------------|-------------------|
| nombre del cliente | Cliente | Se resuelve por clienteId |
| NIF del cliente | Cliente | Se resuelve por clienteId |
| referencia catastral | Inmueble | Se resuelve por inmuebleId |
| datos constructivos | Inmueble | Se resuelven por inmuebleId |
| nombre del AT | Usuario | Se resuelve por usuarioId |
| catálogo de preguntas PITR | Motor PITR (global) | Se referencia por códigoPregunta |
| catálogo de evidencias | CF-030 (global) | Se referencia por codigoCatalogo |

---

## 4. Relaciones con otros agregados

### 4.1 Mapa de relaciones

```
                       ┌──────────────────┐
                       │     CLIENTE      │
                       │  (cliente_id)    │
                       └────────┬─────────┘
                                │ 1 (referencia)
                                ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│    INMUEBLE      │    │   EXPEDIENTE     │    │    USUARIO      │
│  (inmueble_id)   │───►│  (expediente_id) │◄───│  (usuario_id)   │
└──────────────────┘    └────────┬─────────┘    └──────────────────┘
                                │ (opcional)
                                ▼
                    ┌──────────────────────┐
                    │  EXPEDIENTE ANTERIOR │
                    │  (expediente_id)     │
                    └──────────────────────┘
```

### 4.2 Naturaleza de cada relación

| Relación | Cardinalidad | Naturaleza | Regla |
|----------|-------------|------------|-------|
| Expediente → Cliente | N:1 | Referencia débil | Un cliente puede tener múltiples expedientes. |
| Expediente → Inmueble | N:1 | Referencia débil | Un inmueble puede tener múltiples expedientes a lo largo del tiempo. Solo uno activo simultáneamente. |
| Expediente → Usuario (AT) | N:1 | Referencia débil | Un AT puede tener múltiples expedientes. El AT puede cambiar durante la vida del expediente. |
| Expediente → Expediente anterior | 0:1 | Referencia débil | Para renovaciones, segundas opiniones. Opcional. |

### 4.3 Reglas de navegación

| # | Regla | Descripción |
|---|-------|-------------|
| RN-EX-01 | **Solo referencias salientes** | El Expediente referencia a otros agregados, pero ningún agregado referencia al Expediente desde su interior. |
| RN-EX-02 | **Resolución por servicio de aplicación** | Cuando se necesitan datos combinados, el servicio de aplicación carga el Expediente y resuelve las referencias. |
| RN-EX-03 | **Inmutabilidad de referencias** | clienteId e inmuebleId son inmutables tras la creación. arquitecnicoId sí puede cambiar (reasignación). |

### 4.4 Referencias permitidas

| # | Referencia | Motivo |
|---|------------|--------|
| ✅ | Expediente → Cliente (clienteId) | Saber a quién pertenece el expediente. |
| ✅ | Expediente → Inmueble (inmuebleId) | Saber qué inmueble se certifica. |
| ✅ | Expediente → Usuario (arquitectoTecnicoId) | Saber qué AT está asignado. |
| ✅ | Expediente → Expediente anterior (expedienteAnteriorId) | Trazabilidad entre certificaciones. |

### 4.5 Referencias prohibidas

| # | Referencia | Motivo | Alternativa |
|---|------------|--------|-------------|
| ❌ | Expediente → Datos del Cliente | Duplicación datos personales. | Usar clienteId y resolver. |
| ❌ | Expediente → Datos del Inmueble | Duplicación datos catastrales. | Usar inmuebleId y resolver. |
| ❌ | Expediente → Datos del Usuario | Duplicación datos profesionales. | Usar usuarioId y resolver. |
| ❌ | Cliente → Lista de Expedientes | Rompe el límite del agregado Cliente. | Consultar al repositorio de Expedientes. |
| ❌ | Inmueble → Lista de Expedientes | Rompe el límite del agregado Inmueble. | Consultar al repositorio de Expedientes. |

---

## 5. Ciclo de vida

### 5.1 Fases

El Expediente atraviesa **cuatro fases** en su ciclo de vida:

```
FASE 1: SOLICITUD Y APERTURA
    [Solicitud] ──► [PteDocumentación] ──► (cancelación si no se completa)

FASE 2: AUDITORÍA AUTOMÁTICA (PITR)
    [EnRevisionPITR] ──► [Auditado] ──► (confianza suficiente → revisión ligera)
                                    ──► (confianza insuficiente → Revisión Manual)

FASE 3: DECISIÓN HUMANA
    [RevisionManual] ──► [Aprobado] ──► [Entregado]
                     ──► [Rechazado] ──► [Devuelto]

FASE 4: CIERRE
    [Entregado] ──► (estado terminal, solo anexos)
    [Cancelado] ──► (estado terminal)
```

### 5.2 Eventos de ciclo de vida

| Evento | Fase | Descripción |
|--------|------|-------------|
| `ExpedienteCreado` | 1 | Nuevo expediente en estado Solicitud. |
| `ExpedienteDocumentado` | 1 | Cliente aportó certificado original y evidencias mínimas. |
| `ExpedienteAsignado` | 1 | Se asignó un Arquitecto Técnico. |
| `ExpedienteCaducado` | 1 | Expediente caducó por inactividad del cliente. |
| `AuditoriaIniciada` | 2 | Motor PITR comenzó procesamiento. |
| `AuditoriaCompletada` | 2 | Motor PITR finalizó con nivel de confianza. |
| `RevisionManualRequerida` | 2→3 | Confianza insuficiente, se requiere AT. |
| `ExpedienteAprobado` | 3 | AT aprobó el expediente. |
| `ExpedienteRechazado` | 3 | AT rechazó el expediente. |
| `ExpedienteDevuelto` | 3 | AT devolvió al cliente para correcciones. |
| `CertificadoEntregado` | 4 | Certificado auditado entregado al cliente. |
| `ExpedienteCancelado` | 1/2/3 | Cliente o sistema cancelaron el expediente. |
| `NotaAñadida` | 4 | Nota o anexo añadido post-entrega. |

---

## 6. Máquina de estados

### 6.1 Estados

| Estado | Código | Fase | Descripción | ¿Es terminal? |
|--------|--------|------|-------------|---------------|
| **Solicitud** | SOL | 1 | Cliente solicitó el servicio. Pendiente de confirmación y asignación. | No |
| **Pte. Documentación** | PDOC | 1 | Se espera certificado original y evidencias. | No |
| **En Revisión PITR** | PITR | 2 | Motor PITR procesando automáticamente. | No |
| **Auditado** | AUD | 2 | PITR completado con confianza suficiente. Pendiente revisión AT. | No |
| **Requiere Revisión Manual** | RRM | 2→3 | PITR determinó que se necesita intervención humana. | No |
| **Revisión Manual** | RM | 3 | AT revisando el expediente. | No |
| **Aprobado** | AP | 3 | AT validó el resultado. Pendiente de entrega. | No |
| **Rechazado** | REC | 3 | AT rechazó el certificado original. | No |
| **Entregado** | ENT | 4 | Certificado auditado entregado. | Sí |
| **Cancelado** | CAN | 1/2/3/4 | Expediente cancelado. | Sí |
| **Devuelto** | DEV | 3 | Certificado devuelto al cliente para correcciones. | No |

### 6.2 Transiciones

| Desde | Hacia | Condición | Autoriza |
|-------|-------|-----------|----------|
| SOL | PDOC | Cliente confirma solicitud y se requiere documentación. | Sistema |
| SOL | CAN | Cliente desiste o error en datos de creación. | Cliente/Sistema |
| PDOC | PITR | Cliente aporta certificado + evidencias mínimas + AT asignado. | Sistema |
| PDOC | CAN | Inactividad del cliente según temporizador CF-040. | Sistema |
| PITR | AUD | PITR completa con confianza suficiente y sin contradicciones críticas. | Motor PITR |
| PITR | RRM | PITR completa con confianza insuficiente o contradicciones críticas. | Motor PITR |
| AUD | RM | AT inicia revisión. | AT |
| AUD | AP | AT revisa y valida directamente. | AT |
| RRM | RM | AT acepta revisión manual. | AT |
| RM | AP | AT aprueba la auditoría. | AT |
| RM | REC | AT rechaza por incorrecciones graves. | AT |
| AP | ENT | Se genera y entrega certificado auditado. | Sistema |
| REC | DEV | Se notifica al cliente y se devuelve. | Sistema |
| ENT | — | Estado terminal. Solo notas y anexos. | — |
| CAN | — | Estado terminal. Sin modificaciones. | — |
| Cualquiera (no terminal) | CAN | Cliente cancela o administrador autoriza. | Cliente/Admin |

### 6.3 Reglas de transición

| # | Regla |
|---|-------|
| ET-01 | **Unidireccionalidad.** El expediente no puede retroceder a un estado anterior (salvo REC→DEV). |
| ET-02 | **Terminalidad post-entrega.** En ENTREGADO ningún dato se modifica. Solo notas y anexos. |
| ET-03 | **Cancelación desde cualquier estado no terminal.** No se puede reactivar. |
| ET-04 | **Asignación obligatoria para PITR.** No se pasa a EnRevisiónPITR sin arquitectoTecnicoId. |
| ET-05 | **Documentación mínima para PITR.** No se pasa sin certificado original cargado. |
| ET-06 | **Revisión humana final obligatoria.** Incluso en AUDITADO, se requiere acción del AT antes de la entrega. |
| ET-07 | **Nuevo expediente desde DEVUELTO.** El devuelto no se reabre. Se crea uno nuevo referenciando al anterior. |
| ET-08 | **Reasignación de AT.** arquitectoTecnicoId puede cambiarse en cualquier estado no terminal. |

---

## 7. Invariantes

### 7.1 Invariantes de identidad y creación

| # | Invariante | Gravedad | Descripción |
|---|------------|----------|-------------|
| I-EX-01 | **Código de expediente único** | FATAL | codigoExpediente es único en el sistema. |
| I-EX-02 | **Cliente e inmueble existentes** | FATAL | clienteId e inmuebleId deben referenciar agregados existentes. |
| I-EX-03 | **Un expediente activo por inmueble** | FATAL | Un inmueble no puede tener más de un expediente en curso. Solo se abre uno nuevo si el anterior es terminal. |
| I-EX-04 | **Asignación obligatoria** | FATAL | No se pasa de PDOC sin arquitectoTecnicoId. |
| I-EX-05 | **Documentación mínima** | FATAL | No se pasa a PITR sin certificado original cargado. |

### 7.2 Invariantes de estado

| # | Invariante | Gravedad | Descripción |
|---|------------|----------|-------------|
| I-EX-06 | **Orden de estados** | FATAL | Las transiciones deben seguir el grafo definido. |
| I-EX-07 | **Terminalidad** | FATAL | En ENTREGADO o CANCELADO ningún dato se modifica. |
| I-EX-08 | **Inmutabilidad del historial** | FATAL | Un cambio de estado registrado no puede modificarse ni eliminarse. |

### 7.3 Invariantes de auditoría

| # | Invariante | Gravedad | Descripción |
|---|------------|----------|-------------|
| I-EX-09 | **Variables CE3X completas** | FATAL | Todas las variables CE3X requeridas deben tener valor. |
| I-EX-10 | **Consistencia de confianza** | GRAVE | nivelConfianzaGlobal debe ser consistente con los valores por variable. |
| I-EX-11 | **Evidencia no modificable tras procesada** | FATAL | Una evidencia analizada no puede modificarse ni eliminarse. Solo añadir nueva. |
| I-EX-12 | **Resolución de contradicciones** | FATAL | No se puede aprobar con contradicciones sin resolver. |
| I-EX-13 | **Confianza en rango** | FATAL | Todos los niveles de confianza en rango 0-100. |

### 7.4 Invariantes post-entrega

| # | Invariante | Gravedad | Descripción |
|---|------------|----------|-------------|
| I-EX-14 | **Inmutabilidad del certificado auditado** | FATAL | Entregado, las variables auditadas, calificación y confianza no se modifican. |
| I-EX-15 | **Solo adición post-entrega** | FATAL | Solo notas y anexos. No modificar ni eliminar datos existentes. |

### 7.5 Invariante de concurrencia

| # | Invariante | Gravedad | Descripción |
|---|------------|----------|-------------|
| I-EX-16 | **Optimistic locking** | FATAL | Si dos operaciones modifican simultáneamente, una falla. La versión se incrementa en cada modificación. |

---

## 8. Reglas de negocio (dominio)

### 8.1 Reglas de creación

| # | Regla | Descripción | Incumplimiento |
|---|-------|-------------|----------------|
| R-EX-01 | **Un expediente activo por inmueble** | Un inmueble no puede tener más de un expediente en curso. | Se cierra el anterior o se rechaza la nueva solicitud. |
| R-EX-02 | **Acreditación de propiedad** | El cliente debe acreditar ser propietario del inmueble o tener representación legal. | No se puede iniciar. |
| R-EX-03 | **Consentimiento informado** | El cliente debe aceptar las condiciones del servicio y tratamiento de datos. | No se puede procesar. |
| R-EX-04 | **Tipo de servicio definido** | Todo expediente debe tener un tipo de servicio definido. | No se puede crear. |

### 8.2 Reglas de documentación

| # | Regla | Descripción | Incumplimiento |
|---|-------|-------------|----------------|
| R-EX-05 | **Certificado original obligatorio** | El cliente debe aportar el certificado original para pasar a revisión PITR. | Permanece en PDOC. |
| R-EX-06 | **Formato oficial del certificado** | El certificado debe cumplir el formato oficial vigente. | No se puede procesar. |
| R-EX-07 | **Variables CE3X completas** | Todas las variables CE3X deben tener valor en el certificado original. | No se puede completar la auditoría. |

### 8.3 Reglas de auditoría PITR

| # | Regla | Descripción | Incumplimiento |
|---|-------|-------------|----------------|
| R-EX-08 | **Priorización dinámica** | El árbol de preguntas prioriza las variables críticas definidas en CF-040. | El sistema debe garantizar evidencia suficiente en críticas. |
| R-EX-09 | **Resolución de contradicciones** | Al detectar una contradicción, se abre rama de resolución antes de continuar. | La auditoría no se completa hasta resolver. |
| R-EX-10 | **Confianza mínima para tránsito a AUDITADO** | Para alcanzar AUDITADO, la confianza global debe superar el umbral definido en CF-040 y ninguna variable crítica puede estar por debajo de su umbral. | Requiere revisión manual. |
| R-EX-11 | **Revisión humana final** | Todo expediente requiere confirmación del AT antes de la entrega (incluso en AUDITADO). | No se puede entregar. |
| R-EX-12 | **Trazabilidad de decisiones** | Cada decisión automatizada debe registrarse con regla, evidencias, confianza y timestamp. | Auditoría no cumple trazabilidad. |

### 8.4 Reglas de decisión humana

| # | Regla | Descripción | Incumplimiento |
|---|-------|-------------|----------------|
| R-EX-13 | **Competencia profesional** | Solo AT pueden realizar revisiones manuales y aprobar/rechazar. | La acción no se ejecuta. |
| R-EX-14 | **Capacidad del AT** | Un AT no puede exceder el límite de expedientes activos definido en CF-040. | No se puede asignar. |

### 8.5 Reglas de entrega y post-entrega

| # | Regla | Descripción | Incumplimiento |
|---|-------|-------------|----------------|
| R-EX-15 | **Inmutabilidad post-entrega** | En ENTREGADO ningún dato se modifica. Solo anexos o notas. | Se requiere nuevo expediente. |
| R-EX-16 | **Identidad verificada** | La identidad del cliente debe verificarse antes de la entrega. | No se puede entregar. |
| R-EX-17 | **Trazabilidad de origen** | El certificado auditado debe indicar: (a) certificado original, (b) modificaciones, (c) confianza por variable. | No cumple transparencia. |

### 8.6 Reglas de cancelación y devolución

| # | Regla | Descripción |
|---|-------|-------------|
| R-EX-18 | **Cancelación por solicitud** | El cliente puede cancelar en cualquier estado no terminal. |
| R-EX-19 | **Cancelación por error** | Un administrador puede cancelar si hay errores en datos de creación. |
| R-EX-20 | **Segunda oportunidad** | Si fue RECHAZADO, el cliente puede solicitar un nuevo expediente referenciando al anterior. |

---

## 9. Eventos emitidos y consumidos

### 9.1 Eventos emitidos por Expediente

| Evento | Cuándo se emite | Datos portados |
|--------|-----------------|----------------|
| `ExpedienteCreado` | Creación en estado Solicitud | expediente_id, codigoExpediente, clienteId, inmuebleId, tipoServicio |
| `ExpedienteDocumentado` | Cliente aportó documentación | expediente_id, fechaDocumentacion |
| `ExpedienteAsignado` | AT asignado | expediente_id, arquitecnicoId, fechaAsignacion |
| `AuditoriaIniciada` | PITR comienza procesamiento | expediente_id, timestamp |
| `EvidenciaAnalizada` | Evidencia procesada | expediente_id, evidenciaId, variablesAfectadas, confianzaParcial |
| `ContradiccionDetectada` | Incompatibilidad encontrada | expediente_id, contradiccionId, variable, tipo, gravedad |
| `ContradiccionResuelta` | Contradicción resuelta | expediente_id, contradiccionId, estadoFinal, resueltaPor |
| `ConfianzaCalculada` | Confianza determinada | expediente_id, confianzaGlobal, confianzaPorVariable |
| `AuditoriaCompletada` | PITR finalizó | expediente_id, resultado, confianzaGlobal |
| `RevisionManualRequerida` | Se necesita intervención humana | expediente_id, motivo, variablesProblematicas |
| `ExpedienteAprobado` | AT validó | expediente_id, arquitecnicoId, timestamp |
| `ExpedienteRechazado` | AT rechazó | expediente_id, motivo, accionesCorrectivas |
| `ExpedienteDevuelto` | Devuelto al cliente | expediente_id, motivoDevolucion |
| `CertificadoEntregado` | Certificado entregado | expediente_id, fechaEntrega |
| `ExpedienteCancelado` | Expediente cancelado | expediente_id, motivo, usuarioId |
| `NotaAñadida` | Nota post-entrega | expediente_id, notaId, tipo, fecha |
| `ExpedienteReasignado` | AT cambiado | expediente_id, atAnteriorId, atNuevoId, motivo |

### 9.2 Eventos consumidos por Expediente

| Evento | Emitido por | Acción en Expediente |
|--------|-------------|---------------------|
| `ClienteVerificado` | Cliente | Si está APROBADO, permitir entrega. |
| `ClienteEstadoCambiado` (baja) | Cliente | Alertar al AT si hay expedientes en curso. |
| `InmueblePropietarioCambiado` | Inmueble | Si el clienteId ya no es propietario, notificar al AT. |
| `InmuebleCaracteristicasActualizadas` | Inmueble | Notificar al AT si cambios relevantes afectan al resultado. |
| `InmuebleEstadoCambiado` (histórico) | Inmueble | Bloquear continuación si hay expedientes activos. |
| `UsuarioEstadoCambiado` (suspendido) | Usuario | Reasignar expedientes activos del AT. |

---

## 10. Casos especiales

### 10.1 Cambio de propietario durante expediente en curso

1. Inmueble emite `InmueblePropietarioCambiado`.
2. Expediente verifica si clienteId coincide con propietarioActualId.
3. Si no coincide, se notifica al AT.
4. El AT decide: actualizar clienteId, cancelar, o mantener si hay representación legal.

**Reglas:**
- No se cancela automáticamente.
- Si se actualiza clienteId, se mantiene la auditoría realizada.

### 10.2 Varios expedientes sobre el mismo inmueble

- Cada expediente es independiente y referencia al inmueble por inmuebleId.
- La regla I-EX-03 garantiza solo un expediente activo por inmueble.
- Los expedientes anteriores se consultan por inmuebleId.
- Pueden encadenarse mediante expedienteAnteriorId.

**Reglas:**
| # | Regla |
|---|-------|
| R-VE-01 | **Expedientes secuenciales.** No pueden solaparse en tiempo activo. |
| R-VE-02 | **Referencia opcional al anterior.** Para trazabilidad. |
| R-VE-03 | **Datos constructivos actuales.** Se usan los del Inmueble al inicio, no los del anterior. |

### 10.3 Segunda oportunidad (rechazado → nuevo expediente)

1. Expediente original alcanza RECHAZADO → DEVUELTO.
2. Cliente recibe detalle de discrepancias.
3. Cliente solicita nuevo expediente referenciando al anterior como expedienteAnteriorId.
4. El nuevo expediente comienza desde Solicitud.

**Reglas:**
- El nuevo expediente es independiente. No hereda datos.
- El AT puede ver el anterior para comparar.
- No hay límite en el número de segundas oportunidades.

### 10.4 Segunda opinión

1. Cliente solicita nuevo expediente con tipoServicio = segundaOpinion.
2. Referencia al expediente original como expedienteAnteriorId.
3. Se asigna AT diferente al del original.
4. La auditoría se realiza desde cero sobre el mismo certificado original.

**Reglas:**
| # | Regla |
|---|-------|
| R-SO-01 | **AT diferente obligatorio.** No puede ser el mismo que el original. |
| R-SO-02 | **Auditoría completa.** Ejecuta PITR completo, no es revisión del anterior. |
| R-SO-03 | **Sin sesgo.** El AT no debe ver el resultado original hasta completar su análisis. |
| R-SO-04 | **Límite de segundas opiniones.** Según política CF-040. |

### 10.5 Certificado original inválido o expirado

1. El certificado original se verifica al cargarlo.
2. Si es inválido (formato incorrecto, datos incompletos), no se puede procesar.
3. Si ha expirado, se notifica al cliente pero no impide la auditoría. La validez temporal del certificado auditado sigue la política CF-040.

### 10.6 Documentación incompleta

- El expediente permanece en PDOC hasta que se cumplan los requisitos mínimos definidos en CF-040.
- Si transcurre el tiempo máximo sin completar, el expediente caduca según temporizador CF-040.

### 10.7 Reasignación de Arquitecto Técnico

- arquitectoTecnicoId puede cambiarse en cualquier estado no terminal.
- La reasignación no modifica el estado del expediente.
- Se registra en el historial con el motivo.

### 10.8 Duplicación accidental

- Si se intenta crear un segundo expediente activo para el mismo inmueble, el invariante I-EX-03 lo impide.
- Si se detecta duplicación real (error humano), se cancela el duplicado y se mantiene el original.

---

## Historial de cambios

| Fecha | Versión | Autor | Motivo | Documento justificante |
|-------|---------|-------|--------|----------------------|
| 2026-07-03 | 2.0 | Certilab® | Refinamiento del dominio: eliminación de sobreingeniería (checklist, timelines, V2, V3) y separación de políticas configurables a CF-040 | Sprint 0.5 |

---

> **Este documento contiene exclusivamente dominio.** Las políticas configurables (umbrales, SLA, temporizadores, límites) se definen en **CF-040-BUSINESS-POLICIES.md**. Cualquier modificación de la semántica del dominio requiere ADR. Las políticas pueden modificarse sin ADR.