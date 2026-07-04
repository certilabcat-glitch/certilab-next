# CF-040 — Business Policies

| Campo | Descripción |
|-------|-------------|
| **Código** | CF-040 |
| **Título** | Business Policies — Políticas configurables del negocio de Certilab |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-03 |
| **Autor** | Certilab® — Arquitectura de Dominio |
| **Propósito** | Centralizar todas las políticas de negocio que son configurables, permitiendo que el dominio (CF-026) permanezca puro y estable. Este documento contiene umbrales, SLA, temporizadores, límites operativos y cualquier parámetro que pueda cambiar sin modificar el modelo de dominio. |
| **Dependencias** | CF-026 (Expediente Design), CF-021 (Domain Model), CF-022 (Aggregate Boundaries) |
| **Audiencia** | Product owners, arquitectos, Arquitectos Técnicos, responsables de operaciones |
| **Lenguaje** | Términos del negocio, sin tecnología, sin SQL, sin implementación |

---

## Índice

1. [Objetivo](#1-objetivo)
2. [Principios](#2-principios)
3. [Umbrales de confianza PITR](#3-umbrales-de-confianza-pitr)
4. [SLAs del proceso](#4-slas-del-proceso)
5. [Temporizadores de caducidad](#5-temporizadores-de-caducidad)
6. [Políticas de revisión humana](#6-políticas-de-revisión-humana)
7. [Políticas de capacidad operativa](#7-políticas-de-capacidad-operativa)
8. [Políticas de renovación](#8-políticas-de-renovación)
9. [Políticas de segunda certificación](#9-políticas-de-segunda-certificación)
10. [Políticas PITR](#10-políticas-pitr)
11. [Políticas operativas generales](#11-políticas-operativas-generales)
12. [Parámetros preparados para V2](#12-parámetros-preparados-para-v2)
13. [Parámetros preparados para V3](#13-parámetros-preparados-para-v3)

---

## 1. Objetivo

Este documento centraliza todas las políticas de negocio que son **configurables** en Certilab V1.

Una política configurable es cualquier regla, umbral, límite, temporizador o SLA que:

- Puede cambiar sin modificar el modelo de dominio.
- Depende de decisiones operativas o comerciales, no de la lógica intrínseca del negocio.
- Puede ser diferente por organización, cliente o tipo de servicio en el futuro.
- Puede ser ajustada sin necesidad de una ADR.

**El dominio (CF-026) define QUÉ se hace. Este documento define CON QUÉ PARÁMETROS se hace.**

---

## 2. Principios

| # | Principio | Explicación |
|---|-----------|-------------|
| BP-01 | **Separación dominio/política** | Ningún valor numérico, umbral o temporizador vive en el modelo de dominio. Todos se referencian desde aquí. |
| BP-02 | **Configurabilidad por defecto** | Toda política tiene un valor por defecto para V1. En V2 podrá ser configurable por organización. |
| BP-03 | **Evidencia operativa** | Los valores aquí definidos deben poder justificarse con datos operativos o experiencia de Arquitectos Técnicos. No son decisiones arbitrarias. |
| BP-04 | **Evolución sin ADR** | Los valores de este documento pueden modificarse sin ADR, siempre que no cambien la semántica del dominio. Si una política cambia la semántica (qué se hace, no con qué parámetros), debe moverse a CF-026 y requerir ADR. |
| BP-05 | **Traza de cambios** | Cada modificación de este documento debe registrarse con fecha, autor y motivo. |

---

## 3. Umbrales de confianza PITR

| # | Política | Valor V1 | Descripción | ¿Configurable V2? |
|---|----------|----------|-------------|-------------------|
| P-UMB-01 | **Confianza global mínima** | 80% | Si el nivel de confianza global de la auditoría PITR es inferior a este umbral, el expediente requiere revisión manual obligatoria. | Sí |
| P-UMB-02 | **Confianza mínima por variable crítica** | 60% | Si alguna variable crítica (cerramientos, instalaciones) tiene una confianza inferior a este umbral, requiere revisión manual. | Sí |
| P-UMB-03 | **Confianza ultra-alta para entrega automática** | >95% (pendiente de validación) | Umbral opcional para permitir entrega automática sin revisión humana. Desactivado en V1. Se activa mediante decisión operativa. | Sí |
| P-UMB-04 | **Variables críticas** | C1, C2, C3 (cerramientos), F1, F2 (instalaciones) | Lista de variables CE3X consideradas críticas. Su incumplimiento individual fuerza revisión manual. | Sí |

---

## 4. SLAs del proceso

| # | Política | Valor V1 | Descripción |
|---|----------|----------|-------------|
| P-SLA-01 | **Asignación de AT** | 24 horas hábiles | Tiempo máximo desde que el expediente entra en Pte. Documentación hasta que se asigna un Arquitecto Técnico. |
| P-SLA-02 | **Revisión humana post-PITR** | 24 horas hábiles | Tiempo máximo para que el AT revise y confirme/rechace el resultado de la auditoría PITR automática. |
| P-SLA-03 | **Revisión manual completa** | 7 días hábiles | Tiempo máximo para completar una revisión manual desde que se inicia. Si se excede, se escala. |
| P-SLA-04 | **Procesamiento PITR automático** | 12-24 horas | Tiempo estimado para que el motor PITR procese evidencias y genere resultados. No es un SLA vinculante, es una referencia operativa. |

---

## 5. Temporizadores de caducidad

| # | Política | Valor V1 | Descripción |
|---|----------|----------|-------------|
| P-TMP-01 | **Caducidad por inactividad en Pte. Documentación** | 30 días naturales | Si el cliente no aporta la documentación completa en este plazo, el expediente pasa a Cancelado automáticamente. |
| P-TMP-02 | **Aviso pre-caducidad** | 15 días desde creación | Se envía un aviso al cliente cuando faltan 15 días para la caducidad por inactividad. |
| P-TMP-03 | **Caducidad por inactividad en Devuelto** | 30 días naturales | Si el cliente no subsana las correcciones solicitadas en este plazo, el expediente se cierra como Cancelado. |
| P-TMP-04 | **Re-evaluación en monitorización (V3)** | 7 días | Durante el estado EnMonitorizacion (V3), el sistema re-evalúa la confianza al menos cada 7 días. |
| P-TMP-05 | **Monitorización máxima (V3)** | 30 días consecutivos | Un expediente no puede estar en monitorización más de 30 días. Después pasa a revisión manual. |

---

## 6. Políticas de revisión humana

| # | Política | Valor V1 | Descripción |
|---|----------|----------|-------------|
| P-REV-01 | **Revisión humana final obligatoria** | Siempre | Incluso cuando la confianza automática supera el umbral P-UMB-01, se requiere la confirmación de un AT antes de pasar a AP. No existe flujo completamente automático en V1. |
| P-REV-02 | **Revisión ligera vs. completa** | Ligera si confianza ≥80% | Si la confianza global es ≥80%, la revisión humana puede ser ligera (confirmación rápida). Si es <80%, la revisión es completa. |
| P-REV-03 | **Separación de funciones AT vs. revisor** | No separado en V1 | En V1, el mismo AT puede auditar y revisar. En V2 se valorará la separación de funciones. |

---

## 7. Políticas de capacidad operativa

| # | Política | Valor V1 | Descripción |
|---|----------|----------|-------------|
| P-CAP-01 | **Capacidad máxima de expedientes por AT** | Sin límite en V1 | Número máximo de expedientes activos que un AT puede gestionar simultáneamente. Pendiente de validación operativa. En V1 se deja sin límite. |
| P-CAP-02 | **Tiempo máximo de respuesta del cliente** | 48 horas hábiles | Tiempo máximo para que el cliente responda a solicitudes de información adicional del AT. |

---

## 8. Políticas de renovación

| # | Política | Valor V1 | Descripción |
|---|----------|----------|-------------|
| P-REN-01 | **Plazo para renovación anticipada** | 3 meses antes del vencimiento | El cliente puede solicitar la renovación hasta 3 meses antes de que expire el certificado actual. |
| P-REN-02 | **Expediente anterior como referencia** | Obligatorio en renovaciones | Toda renovación debe referenciar el expediente anterior mediante expedienteAnteriorId. |
| P-REN-03 | **Documentación para renovación** | Nueva evidencia completa | La renovación requiere nueva evidencia (fotografías, documentos). No se reutiliza la evidencia del expediente anterior, salvo que el AT lo considere aceptable. |
| P-REN-04 | **Validez del certificado auditado** | 10 años desde emisión | Periodo de validez estándar del certificado energético según normativa vigente. |

---

## 9. Políticas de segunda certificación

| # | Política | Valor V1 | Descripción |
|---|----------|----------|-------------|
| P-SO-01 | **Motivos válidos para segunda opinión** | Disconformidad con resultado, sospecha de error técnico, requerimiento judicial | Lista cerrada de motivos por los que un cliente puede solicitar una segunda opinión. |
| P-SO-02 | **AT ciego al resultado anterior** | Sí, hasta completar análisis | El AT asignado a la segunda opinión no debe conocer el resultado del expediente original hasta completar su propio análisis. |
| P-SO-03 | **Prevalencia del resultado** | El resultado de la segunda opinión prevalece | Si hay discrepancia entre el expediente original y la segunda opinión, el resultado de la segunda opinión es el oficial. |
| P-SO-04 | **Revisión por AT diferente** | Obligatorio | La segunda opinión debe ser realizada por un AT diferente al del expediente original. |
| P-SO-05 | **Coste de la segunda opinión** | Política comercial no definida en este documento | El coste de la segunda opinión es una decisión comercial fuera del ámbito de este documento. |
| P-SO-06 | **Número máximo de segundas opiniones por expediente** | 1 por expediente | Un expediente solo puede tener una segunda opinión. Si el cliente sigue en desacuerdo, debe iniciar un proceso de reclamación externo. |

---

## 10. Políticas PITR

| # | Política | Valor V1 | Descripción |
|---|----------|----------|-------------|
| P-PITR-01 | **Evidencias mínimas requeridas** | 5 por expediente | Número mínimo de evidencias (fotografías, documentos) que debe aportar el cliente para que el motor PITR pueda procesar la auditoría. |
| P-PITR-02 | **Variables CE3X obligatorias** | C1, C2, C3, H1, H2, H3, F1, F2, G1 | Conjunto mínimo de variables que deben estar cubiertas por las evidencias para considerar la auditoría completa. |
| P-PITR-03 | **Calidad mínima de evidencia** | Resolución 1920x1080, sin desenfoque, iluminación adecuada | Estándares mínimos de calidad para que una evidencia fotográfica sea aceptada por el sistema. |
| P-PITR-04 | **Peso máximo por evidencia** | 20 MB por fichero | Límite de tamaño para cada documento o fotografía aportada como evidencia. |
| P-PITR-05 | **Número máximo de evidencias por expediente** | 50 | Límite superior de evidencias que puede contener un expediente. |
| P-PITR-06 | **Idioma del árbol de preguntas** | Español (ES) | Idioma en el que se presentan las preguntas del árbol PITR al cliente. |
| P-PITR-07 | **Umbral de contradicción crítica** | Gravedad "crítica" activa revisión manual inmediata | Si una contradicción tiene gravedad crítica, el expediente se detiene y requiere revisión manual. |
| P-PITR-08 | **Contradicciones máximas antes de pausa automática** | 3 | Si se detectan 3 o más contradicciones, el sistema pausa la auditoría automática y notifica al AT. |

---

## 11. Políticas operativas generales

| # | Política | Valor V1 | Descripción |
|---|----------|----------|-------------|
| P-OP-01 | **Formato de código de expediente** | EXP-YYYY-NNNNNN | Formato visible del identificador de negocio del expediente. Año + número secuencial de 6 dígitos. |
| P-OP-02 | **Trazabilidad de origen del certificado auditado** | Obligatorio | El certificado auditado entregado al cliente debe incluir trazabilidad del origen de los datos y las decisiones de auditoría. |
| P-OP-03 | **Medio de entrega del certificado auditado** | Descarga desde plataforma | El certificado auditado se entrega al cliente mediante descarga desde la plataforma. |
| P-OP-04 | **Hash del documento original** | Opcional en V1 | Almacenar el hash del PDF original del certificado como buena práctica de integridad documental. Pendiente de implementación. |
| P-OP-05 | **Historial de cambios de estado completo** | Siempre | Cada transición de estado se registra con fecha, usuario y motivo. El historial es inmutable. |

---

## 12. Parámetros preparados para V2

Los siguientes parámetros se reservan para V2 y no tienen valor asignado en V1:

| # | Parámetro | Uso previsto |
|---|-----------|--------------|
| P-V2-01 | `contratoRequerido` | Booleano que indica si se requiere contrato activo para crear un expediente. |
| P-V2-02 | `facturacionAutomatica` | Booleano que activa la generación automática de factura al entregar. |
| P-V2-03 | `diasParaRecordatorio` | Días de inactividad antes de enviar recordatorio al cliente. |
| P-V2-04 | `historialATRequerido` | Booleano que exige registrar el motivo en cada cambio de AT. |
| P-V2-05 | `tiposServicioExtendidos` | Lista de nuevos tipos de servicio (certificación edificio completo, local comercial, asesoramiento). |
| P-V2-06 | `multiIdiomaHabilitado` | Booleano que activa el multi-idioma en informes y expedientes. |

---

## 13. Parámetros preparados para V3

Los siguientes parámetros se reservan para V3 y no tienen valor asignado en V1:

| # | Parámetro | Uso previsto |
|---|-----------|--------------|
| P-V3-01 | `iotMonitorizacionHabilitada` | Booleano que activa la monitorización IoT durante la auditoría. |
| P-V3-02 | `recomendacionesAutomaticas` | Booleano que activa la generación automática de recomendaciones. |
| P-V3-03 | `certificacionContinuaHabilitada` | Booleano que activa el estado EnMonitorizacion. |
| P-V3-04 | `diasReevaluacionPeriodica` | Días entre re-evaluaciones durante monitorización. |
| P-V3-05 | `blockchainHabilitado` | Booleano que activa el registro en blockchain. |
| P-V3-06 | `peritajeJudicialHabilitado` | Booleano que activa el tipo de servicio peritaje judicial. |
| P-V3-07 | `maximoDiasMonitorizacion` | Días máximos consecutivos en monitorización. |

---

## Historial de cambios

| Fecha | Versión | Autor | Motivo | Documento justificante |
|-------|---------|-------|--------|----------------------|
| 2026-07-03 | 1.0 | Certilab® | Separación de políticas del dominio CF-026 para cierre definitivo del dominio V1 | CF-026, Sprint 0.5 |

---

> **Nota final:** Este documento es el repositorio único de políticas configurables de Certilab V1. Cualquier nueva política debe añadirse aquí, no en los documentos de dominio. La modificación de valores no requiere ADR. La modificación de la semántica de las políticas (qué hacen, no con qué valores) requiere ADR y posible modificación de CF-026.