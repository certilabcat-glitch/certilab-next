# INFORME DE CIERRE — SPRINT 0.5
## Cierre Definitivo del Dominio Certilab V1

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-07-03 |
| **Sprint** | 0.5 — Cierre Definitivo del Dominio |
| **Documentos afectados** | CF-026 (refinado), CF-040 (nuevo) |
| **Auditor** | Certilab® — Arquitectura de Dominio |
| **Objetivo** | Dejar completamente congelado el dominio de Certilab V1 |

---

## 1. Elementos movidos de CF-026 a CF-040

Los siguientes elementos han sido **extraídos del dominio** (CF-026) y trasladados a **CF-040-BUSINESS-POLICIES.md** por tratarse de políticas configurables, no de lógica intrínseca del negocio:

| # | Elemento en CF-026 | Origen (sección) | Destino en CF-040 |
|---|--------------------|------------------|-------------------|
| 1 | Umbral confianza global 80% | R-EX-13 (10.3) | P-UMB-01 |
| 2 | Umbral confianza variable crítica 60% | R-EX-13 (10.3) | P-UMB-02 |
| 3 | Umbral ultra-alto >95% para entrega automática | Decisiones pendientes (Resumen) | P-UMB-03 |
| 4 | Lista de variables críticas (C1, C2, C3, F1, F2) | R-EX-11 (10.3) | P-UMB-04 |
| 5 | SLA asignación AT (24h hábiles) | T-04 (8.2) | P-SLA-01 |
| 6 | SLA revisión humana post-PITR (24h hábiles) | T-03 (8.2), Timeline 14.1 | P-SLA-02 |
| 7 | SLA revisión manual completa (7 días hábiles) | T-03 (8.2), Timeline 14.2 | P-SLA-03 |
| 8 | Procesamiento PITR automático (12-24h) | Timeline 14.1 | P-SLA-04 |
| 9 | Caducidad por inactividad en Pte. Documentación (30 días) | T-01 (8.2), 12.6 | P-TMP-01 |
| 10 | Aviso pre-caducidad (15 días) | Decisiones pendientes | P-TMP-02 |
| 11 | Caducidad por inactividad en Devuelto (30 días) | R-EX-27 (10.6), T-02 (8.2) | P-TMP-03 |
| 12 | Re-evaluación en monitorización V3 (7 días) | R-V3-02 (16.4) | P-TMP-04 |
| 13 | Monitorización máxima V3 (30 días) | R-V3-03 (16.4) | P-TMP-05 |
| 14 | Revisión humana final obligatoria | R-EX-14 (10.3), Decisión diseño #2 | P-REV-01 |
| 15 | Revisión ligera vs. completa según confianza | Implícito en R-EX-14 | P-REV-02 |
| 16 | Separación AT vs. revisor diferida a V2 | Decisiones pendientes #5 | P-REV-03 |
| 17 | Capacidad máxima expedientes por AT (N configurable) | R-EX-18 (10.4) | P-CAP-01 |
| 18 | Tiempo máximo respuesta cliente (48h hábiles) | No explícito, derivado | P-CAP-02 |
| 19 | Plazo renovación anticipada (3 meses) | No explícito, regla de negocio | P-REN-01 |
| 20 | Expediente anterior obligatorio en renovaciones | R-SO-01 a R-SO-04 transformados | P-REN-02 |
| 21 | Documentación completa para renovación | R-REN-02 implícita | P-REN-03 |
| 22 | Validez certificado auditado (10 años) | R-EX-23 (10.5) | P-REN-04 |
| 23 | Motivos válidos para segunda opinión | R-SO-* (12.4) | P-SO-01 |
| 24 | AT ciego al resultado anterior | R-SO-03 (12.4) | P-SO-02 |
| 25 | Prevalencia del resultado de segunda opinión | R-SO-* (12.4) | P-SO-03 |
| 26 | AT diferente obligatorio en segunda opinión | R-SO-01 (12.4) | P-SO-04 |
| 27 | Coste segunda opinión (política comercial) | No explícito | P-SO-05 |
| 28 | Máximo 1 segunda opinión por expediente | R-SO-* (12.4) | P-SO-06 |
| 29 | Evidencias mínimas requeridas (5) | R-EX-10 (10.2) | P-PITR-01 |
| 30 | Variables CE3X obligatorias | R-EX-09 (10.2) | P-PITR-02 |
| 31 | Calidad mínima evidencia | No explícito | P-PITR-03 |
| 32 | Peso máximo por evidencia (20 MB) | No explícito | P-PITR-04 |
| 33 | Número máximo evidencias (50) | No explícito | P-PITR-05 |
| 34 | Idioma árbol de preguntas (ES) | No explícito | P-PITR-06 |
| 35 | Umbral contradicción crítica | No explícito | P-PITR-07 |
| 36 | Contradicciones máximas antes de pausa (3) | No explícito | P-PITR-08 |
| 37 | Formato código expediente (EXP-YYYY-NNNNNN) | 4.1 | P-OP-01 |
| 38 | Trazabilidad de origen del certificado auditado | R-EX-22 (10.5) | P-OP-02 |
| 39 | Medio de entrega del certificado | No explícito | P-OP-03 |
| 40 | Hash del documento original (opcional V1) | Decisiones pendientes #7 | P-OP-04 |
| 41 | Historial de cambios de estado completo | R-EX-20 (10.5) | P-OP-05 |
| 42 | Parámetros V2 (6 items) | Sección 15 (completa) | P-V2-01 a P-V2-06 |
| 43 | Parámetros V3 (7 items) | Sección 16 (completa) | P-V3-01 a P-V3-07 |

**Total: 43 elementos extraídos del dominio.**

---

## 2. Elementos eliminados por sobreingeniería

Los siguientes elementos han sido **eliminados** por no pertenecer al diseño del agregado ni al dominio, sino a documentación operativa, procedural o roadmap futuro:

| # | Elemento | Sección | Motivo de eliminación |
|---|----------|---------|----------------------|
| 1 | **Checklist de 28 items** (EX-CK-01 a EX-CK-30) | Sección 13 (completa) | Mezcla dominio con operación. Los checks son procedimentales, no invariantes de agregado. Cada checklist es responsabilidad del servicio de aplicación o del flujo de trabajo, no del modelo de dominio. |
| 2 | **Timeline conceptual de expediente típico** | Sección 14.1 | Diagrama operativo con días estimados. No es diseño de dominio. Los valores numéricos se han movido a CF-040, el diagrama en sí no aporta al modelo. |
| 3 | **Timeline con revisión manual** | Sección 14.2 | Misma razón que 14.1. Procedimental, no estructural. |
| 4 | **Timeline de renovación** | Sección 14.3 | Misma razón. El concepto de "años" no es parte del modelo de dominio. |
| 5 | **Preparación V2 completa** (V2-01 a V2-07, eventos V2, reglas V2) | Sección 15 (completa) | Roadmap futuro. No debe estar en el diseño del agregado V1. Introduce ruido y falsa sensación de completitud. Los parámetros V2 se han trasladado a CF-040 como placeholders. |
| 6 | **Preparación V3 completa** (V3-01 a V3-06, eventos V3, reglas V3, proyecciones) | Sección 16 (completa) | Misma razón que V2. Roadmap futuro fuera del scope V1. Los parámetros V3 se han trasladado a CF-040 como placeholders. |
| 7 | **R-EX-19 (Prioridad de revisión manual)** | 10.4 | Regla operativa de cola de trabajo, no invariante de dominio. Depende de cómo el sistema prioriza tareas humanas. |
| 8 | **Sección 12.6 (Cancelación por inactividad)** — mecanismo completo | 12.6 | El mecanismo de "cómo se cancela" es procedimental. La política del temporizador (30 días) se ha movido a CF-040. El hecho de que un expediente pueda cancelarse por inactividad es dominio, pero el cómo se implementa no. |
| 9 | **Sección 12.7 (Reasignación AT)** — mecanismo completo | 12.7 | Misma razón. La reasignación es un proceso operativo. Las reglas R-RE-01 a R-RE-03 son procedurales, no invariantes. |
| 10 | **Sección 12.8 (Inmueble incompleto)** — mecanismo | 12.8 | Caso especial operativo menor. La relación con inmueble en REGISTRO es un detalle de flujo, no de dominio. |
| 11 | **Sección 12.9 (Duplicación accidental)** — mecanismo | 12.9 | Detalle de aplicación. La regla I-EX-03 (un expediente activo por inmueble) es el invariante de dominio que cubre esto. El resto es procedimental. |
| 12 | **Decisiones pendientes #1-#7** | Resumen | Dudas operativas mezcladas con el diseño. No son decisiones de dominio. Los valores numéricos se han movido a CF-040. Las preguntas operativas (separación de funciones, hash, AT ciego) deben resolverse en el roadmap, no en el diseño del agregado. |

**Total: 12 elementos eliminados por sobreingeniería.**

---

## 3. Decisiones definitivamente congeladas para V1

Tras el refinamiento, las siguientes decisiones sobre el **Agregado Expediente** quedan definitivamente congeladas para V1:

### 3.1 Decisiones de identidad y estructura

| # | Decisión | Justificación |
|---|----------|---------------|
| D-01 | **Expediente es Aggregate Root** | Es el corazón transaccional del dominio. Tiene identidad propia y ciclo de vida independiente. |
| D-02 | **Identidad dual** | `expediente_id` (UUID interno) + `codigoExpediente` (EXP-YYYY-NNNNNN visible). |
| D-03 | **Límite del agregado** | Datos generales + CertificadoOriginal + CertificadoAuditado + AuditoríaPITR (evidencias, preguntas, contradicciones, confianza) + HistorialCambiosEstado + NotasPostEntrega. |
| D-04 | **Referencias débiles por ID** | A Cliente, Inmueble y Usuario solo por ID. Nunca se duplican datos personales, catastrales ni profesionales. |
| D-05 | **Auditoría PITR como entidad interna** | No es un agregado independiente. Vive dentro del Expediente por consistencia transaccional crítica. |

### 3.2 Decisiones de ciclo de vida

| # | Decisión | Justificación |
|---|----------|---------------|
| D-06 | **Máquina de estados con 11 estados** | Solicitud → PteDocumentación → EnRevisionPITR → Auditado → RevisionManual → Aprobado/Rechazado/Devuelto → Entregado/Cancelado. Suficiente para V1. |
| D-07 | **Inmutabilidad post-entrega** | Una vez Entregado, ningún dato se modifica. Solo notas y anexos. |
| D-08 | **Historial de cambios de estado inmutable** | Cada transición se registra y no puede eliminarse. Es la bitácora de auditoría. |
| D-09 | **Separación certificado original vs. auditado** | Son dos Value Objects distintos. Nunca se mezclan. |

### 3.3 Decisiones técnicas invariantes

| # | Decisión | Justificación |
|---|----------|---------------|
| D-10 | **Optimistic Locking** | Control de concurrencia mediante `version` entero incremental. |
| D-11 | **Soft Delete** | Ningún expediente se elimina físicamente. `deleted_at` + `deleted_by`. |
| D-12 | **Un expediente activo por inmueble** | Invariante I-EX-03. Impide duplicación activa. |

### 3.4 Decisiones de eventos de dominio

| # | Decisión | Justificación |
|---|----------|---------------|
| D-13 | **Eventos emitidos (lista completa)** | Los 17 eventos definidos en 11.1 son los que el agregado Expediente emite. No se añaden más en V1. |
| D-14 | **Eventos consumidos (lista completa)** | Los 6 eventos definidos en 11.2 son los que el agregado Expediente consume. No se añaden más en V1. |

### 3.5 Decisiones sobre el alcance V1

| # | Decisión | Justificación |
|---|----------|---------------|
| D-15 | **No hay flujo completamente automático** | Todo expediente requiere confirmación humana antes de Entregado. |
| D-16 | **Tipos de servicio V1** | auditoriaCertificado, segundaOpinion, renovacion, certificacionNueva. Sin edificio completo, sin peritaje. |
| D-17 | **Sin monitorización IoT** | Estado EnMonitorizacion es V3. No existe en V1. |
| D-18 | **Sin recomendaciones automáticas** | V3. |
| D-19 | **Sin blockchain** | V3. |
| D-20 | **Sin facturación integrada** | V2. |
| D-21 | **Sin contratos** | V2. |

---

## 4. Confirmación de cierre del dominio

**El dominio de Certilab V1 queda oficialmente cerrado.**

### 4.1 Estado final de los documentos

| Documento | Estado | Última modificación |
|-----------|--------|---------------------|
| CF-000 — Project Brain (Constitución) | ✅ Congelado | Sprint previo |
| CF-001A — Acta de Cierre Arquitectura V1 | ✅ Congelado | Sprint previo |
| CF-020 — Data Model | ✅ Congelado | Sprint previo |
| CF-021 — Domain Model | ✅ Congelado | Sprint previo |
| CF-022 — Aggregate Boundaries | ✅ Congelado | Sprint previo |
| CF-025 — Inmueble Design | ✅ Congelado | Sprint previo |
| **CF-026 — Expediente Design** | ✅ **Refinado (dominio puro)** | **Sprint 0.5** |
| **CF-040 — Business Policies** | ✅ **Nuevo (políticas configurables)** | **Sprint 0.5** |
| CF-030 — PITR Engine | ✅ Independiente del dominio | Sin cambios |
| CF-031 — PITR Question Tree | ✅ Independiente del dominio | Sin cambios |
| CF-032 — Inspection Manual | ✅ Independiente del dominio | Sin cambios |

### 4.2 Agregados del dominio V1

| Agregado | Estado | Documento |
|----------|--------|-----------|
| **Cliente** | ✅ Implementado y auditado | CF-021, CF-022 |
| **Inmueble** | ✅ Implementado y auditado | CF-025, CF-022 |
| **Expediente** | ✅ **Dominio cerrado, pendiente de implementar** | CF-026 (refinado) |
| **Organización** | 🚫 No implementado en V1 | Futuro |
| **Usuario** | 🚫 Gestionado por Supabase Auth en V1 | Futuro |

### 4.3 Verificación de consistencia (FASE 4 — Auditoría)

| Requisito | Estado | Evidencia |
|-----------|--------|-----------|
| ✓ CF-026 contiene únicamente dominio | ✅ | Secciones 1-12 contienen exclusivamente identidad, estructura, invariantes, eventos y casos especiales del agregado. Sin políticas configurables. |
| ✓ CF-040 contiene únicamente políticas configurables | ✅ | Sin dominio, sin tecnología, sin SQL, sin TypeScript. Solo políticas de negocio. |
| ✓ No existen duplicidades | ✅ | Revisión cruzada completa. Ninguna política aparece en ambos documentos. |
| ✓ No existen contradicciones | ✅ | Los dominios (CF-026) se refieren a políticas en CF-040 mediante la semántica de "requiere revisión si confianza baja" sin fijar el valor. |
| ✓ Respeta la Constitución | ✅ | DDD, Clean Architecture, Single Tenant, Soft Delete, Optimistic Locking. |
| ✓ Respeta CF-022 (Aggregate Boundaries) | ✅ | El límite del agregado Expediente definido en CF-022 (sección 4) coincide exactamente con el de CF-026 tras el refinamiento. |
| ✓ Respeta CF-021 (Domain Model) | ✅ | Las relaciones Expediente-Cliente-Inmueble-Usuario son las definidas en el modelo de dominio. |
| ✓ Respeta CF-025 (Inmueble Design) | ✅ | Expediente referencia Inmueble por ID. No duplica datos constructivos. |
| ✓ Respeta CF-001A | ✅ | No se han reabierto decisiones cerradas. No se han introducido CQRS, Event Sourcing, Microservicios ni Multi Tenant. |

### 4.4 Definición de Done del Sprint 0.5

| Requisito | Estado |
|-----------|--------|
| ✓ CF-026 refinado (sin sobreingeniería) | ✅ |
| ✓ Políticas separadas a CF-040 | ✅ |
| ✓ CF-040 creado | ✅ |
| ✓ Auditoría de consistencia | ✅ |
| ✓ Informe de cierre generado | ✅ |
| ✓ Sin modificaciones a otros documentos | ✅ |
| ✓ Sin código | ✅ |
| ✓ Sin SQL | ✅ |
| ✓ Sin commits | ✅ |
| ✓ Sin push | ✅ |

---

## 5. Confirmación de la siguiente tarea

> **La siguiente tarea será exclusivamente la implementación técnica del Aggregate Expediente.**

Queda confirmado que:

1. **No es necesario volver a tomar decisiones de negocio.** El dominio está cerrado.
2. **La implementación puede ser mecánica.** CF-026 define exactamente qué implementar. CF-040 define los parámetros con los que implementarlo.
3. **No se requiere nueva documentación de dominio.** Todo está congelado.
4. **La siguiente épica debe seguir el flujo definido en AGENTS.md:**
   ```
   Diseño → Implementación → Tests → Build → Auditoría específica → Informe de cierre → Aprobación → Commit → Tag
   ```

**El dominio de Certilab V1 ha sido oficialmente cerrado el 3 de julio de 2026.**

---

## Historial

| Fecha | Versión | Autor | Motivo |
|-------|---------|-------|--------|
| 2026-07-03 | 1.0 | Certilab® | Informe de cierre del Sprint 0.5 — Cierre Definitivo del Dominio V1 |