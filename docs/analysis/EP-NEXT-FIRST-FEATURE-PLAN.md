# EP-035: Integración del flujo documental con la máquina de estados

> **Estado:** Draft — v2 corregido tras auditoría documental  
> **Tipo:** Épica MVP  
> **Dependencias:** Core V1 (cerrado), Upload documents (EP-027), Expediente service  
> **Prioridad:** CRÍTICA — Sin esta épica ningún expediente avanza del estado `Solicitud`.

---

## 1. Resumen ejecutivo

Auditoría funcional del código fuente (MVP-AUDITORIA-FUNCIONAL.md) revela que **ningún expediente puede progresar más allá del estado `Solicitud`** porque:

1. **No hay trigger** que mueva `Solicitud → PteDocumentacion` tras la subida de documentos.
2. **No hay trigger** que mueva `PteDocumentacion → EnRevisionPITR` cuando la documentación está completa (según regla de dominio documentada en CF-028 §5.2 y CF-026 I-EX-05).
3. **La bandeja técnica del AT** filtra por `PteDocumentacion`, pero ningún expediente llega nunca a ese estado.

Esta épica cierra el **gap transaccional** del flujo de referencia del MVP para V1:

```
Solicitud ──[subida docs]──▶ PteDocumentacion ──[docs mínimos requeridos]──▶ EnRevisionPITR ──[AT inicia revisión manual]──▶ Auditado ──[...]──▶ Resultado
```

> ⚠ **Corrección vs. propuesta original:** Tras auditoría documental, se confirma que:
> - La ejecución del **Motor PITR es manual en V1** (iniciada por el AT), no automática. (CF-050, CF-028)
> - La **regla de completitud documental** está definida como: certificado original + mínimo 3 fotografías. (CF-028 §5.2, CF-026 I-EX-05, CF-040 P-PITR-01)
> - La automatización del PITR corresponde a V2.

---

## 2. ¿Qué capacidad funcional añade al MVP?

El usuario podrá:

- **Cliente:** Subir documentos → el expediente pasa automáticamente a `PteDocumentacion`.
- **Sistema:** Cuando la documentación mínima requerida está completa (certificado original + mínimo 3 fotografías, según CF-028 §5.2), el expediente se mueve automáticamente a `EnRevisionPITR`.
- **AT:** Ve los expedientes en su bandeja técnica (`PteDocumentacion` y `EnRevisionPITR`) e inicia la revisión PITR manualmente.
- **Motor PITR:** Se ejecuta bajo demanda cuando el AT inicia la revisión desde su bandeja (V1: manual; V2: automático).

Sin esta épica, el flujo MVP está roto en el paso 0.

---

## 3. ¿Qué agregados participan?

| Agregado | Rol |
|---|---|
| **Expediente** | Máquina de estados. Orquesta las transiciones. |
| **Documento IA** | Proporciona el servicio de verificación de completitud documental. |
| **Motor PITR** | Se ejecuta contra el expediente al llegar a `EnRevisionPITR`. |

---

## 4. ¿Cómo interactúan entre sí?

```
Cliente sube docs ──▶ Expediente (action: subir-documentos)
                          │
                          ▼ (trigger automático, T1)
                    transitar a PteDocumentacion
                          │
                          ▼ (verificación completitud, T2)
                    ¿docs mínimos completos? ──No──▶ esperar más docs
                          │ Sí
                          ▼
                    transitar a EnRevisionPITR
                          │
                          ▼
                    AT visualiza en bandeja técnica (PteDocumentacion + EnRevisionPITR)
                          │
                          ▼ (AT inicia revisión manual, fuera del alcance de EP-035)
                    Ejecutar PITR → Auditado → Resultado
```

> **Nota V1:** La ejecución del PITR es manual por parte del AT. La automatización al llegar a `EnRevisionPITR` es V2. (CF-050, CF-028)

---

## 5. Justificación de complejidad mínima

**No se crean nuevos agregados ni bounded contexts.** Se añaden:

1. Un **trigger automático** en la Server Action de subida de documentos (`src/lib/actions/documentos-expediente.ts`) que ejecuta `expedienteService.cambiarEstado()`.
2. Una **regla de completitud** basada en la documentación oficial: verificar que existe al menos 1 documento de tipo `certificado_energetico` y al menos 3 documentos de tipo `fotografia` (configurable en `src/config/documentos.ts` según CF-028 §5.2).
3. Tests de integración del flujo completo.

No se necesita migración de esquema, nueva tabla, nuevo agregado, ni ADR.

**Excluido de V1:** Ejecución automática del Motor PITR. En V1 el AT inicia la revisión manualmente. (CF-050, CF-028)

---

## 6. Desglose en tareas

### Tarea 1: Trigger Solicitud → PteDocumentacion

**Descripción:** Tras subir el primer documento a un expediente en estado `Solicitud`, el sistema debe transitar automáticamente a `PteDocumentacion`.

**Archivos a modificar:**
- `src/lib/actions/documentos-expediente.ts` — añadir transición tras `subirDocumento()`
- `src/lib/actions/__tests__/documentos-expediente.test.ts` — actualizar tests

**Criterios de aceptación:**
- [ ] Al subir el primer documento, el expediente se mueve de `Solicitud` a `PteDocumentacion`.
- [ ] Si el expediente ya está en `PteDocumentacion`, subir más documentos no cambia el estado.
- [ ] Si la transición falla (versión conflict), se lanza error manejable.
- [ ] El `updated_by` es el ID del usuario autenticado.
- [ ] La versión del expediente se incrementa correctamente.

**Tests plan:**
- Test unitario: `expedienteService.cambiarEstado(expedienteId, 'PteDocumentacion', userId, version)` funciona correctamente.
- Test de acción: llamar `subirDocumento()` con expediente en `Solicitud` → verificar estado = `PteDocumentacion`.
- Test de idempotencia: expediente ya en `PteDocumentacion` → tras subir documento, sigue en `PteDocumentacion`.
- Test de error: versión incorrecta → lanza `ExpedienteVersionConflictError`.

### Tarea 2: Regla de completitud documental

**Descripción:** Verificar automáticamente si la documentación mínima está completa. Si sí, transitar `PteDocumentacion → EnRevisionPITR`.

**Configuración inicial (MVP):**
- Documentos requeridos: `certificado_energetico` (1), `cedula_habitabilidad` (1)
- Configurable en `src/config/documentos.ts`

**Archivos a crear/modificar:**
- `src/lib/core/documento-ia.service.ts` — añadir método `verificarCompletitud(expedienteId): Promise<boolean>`
- `src/config/documentos.ts` — configuración de tipos requeridos
- `src/lib/actions/documentos-expediente.ts` — llamar a verificarCompletitud tras cada subida

**Criterios de aceptación:**
- [ ] Tras subir el último documento requerido, el expediente transita automáticamente a `EnRevisionPITR`.
- [ ] Si faltan documentos, el expediente permanece en `PteDocumentacion`.
- [ ] La lista de tipos requeridos es configurable desde `src/config/documentos.ts`.
- [ ] Si el expediente ya está en un estado posterior, no se ejecuta la verificación.

**Tests plan:**
- Test unitario: verificarCompletitud devuelve `true` cuando existen todos los tipos requeridos.
- Test unitario: verificarCompletitud devuelve `false` cuando falta algún tipo.
- Test de acción: subir documentos en orden → verificar transición solo tras el último requerido.
- Test de configuración: cambiar lista requerida → verificar que se usa la nueva lista.

### Tarea 3: Feedback visual para el AT — Expedientes listos para revisión

**Descripción:** Asegurar que los expedientes en `PteDocumentacion` y `EnRevisionPITR` aparecen correctamente en la bandeja técnica del AT para que éste pueda iniciar la revisión manual.

**Archivos a modificar:**
- `src/app/(plataforma)/at/dashboard/BandejaTecnicaTable.tsx` — verificar filtros de estado, añadir acción "Iniciar revisión PITR"
- `src/lib/actions/at.ts` — crear Server Action `iniciarRevisionPITR(expedienteId)` que ejecute el PITR y transite a `Auditado`
- `src/lib/actions/__tests__/at.test.ts` — tests de la acción

**Criterios de aceptación:**
- [ ] Tras alcanzar `EnRevisionPITR`, el expediente aparece en la bandeja técnica del AT.
- [ ] El AT puede hacer clic en "Iniciar revisión PITR" desde la bandeja.
- [ ] Al iniciar la revisión, se ejecuta `iniciarRevisionPITR()` que corre el PITR y transita a `Auditado`.
- [ ] Si el PITR falla, el expediente transita a `RequiereRevisionManual` con error registrado.
- [ ] La ejecución del PITR es síncrona en V1.

> **Justificación:** Esta tarea reemplaza la T3 original (ejecución automática del PITR) que adelantaba funcionalidad V2. Según CF-050 y CF-028, en V1 el AT inicia la revisión manualmente.

**Tests plan:**
- Test de acción: `iniciarRevisionPITR()` con expediente en `EnRevisionPITR` → verifica transición a `Auditado` y `diagnostico` poblado.
- Test de error: mock del PITR lanza error → verificar transición a `RequiereRevisionManual`.
- Test de interfaz: botón "Iniciar revisión PITR" visible solo para expedientes en `EnRevisionPITR`.
- Test de autorización: solo usuarios con rol `at` pueden ejecutar la acción.

### Tarea 4: Feedback visual para el cliente y el AT

**Descripción:** Mostrar al cliente el estado actual de su expediente y qué documentos ha subido/faltan.

**Archivos a modificar:**
- `src/app/(plataforma)/mis-expedientes/ExpedientesTable.tsx` — añadir columna "Estado + progreso docs"
- `src/app/(plataforma)/expedientes/[id]/page.tsx` — añadir indicador de completitud documental
- `src/components/expedientes/DocumentList.tsx` — mejorar con indicador de tipo requerido vs opcional

**Criterios de aceptación:**
- [ ] El cliente ve el estado actual de su expediente en la tabla de "Mis expedientes".
- [ ] El cliente ve qué documentos ha subido y cuáles faltan.
- [ ] Los tipos requeridos aparecen marcados como "Obligatorio".
- [ ] El cliente entiende si puede o no seguir avanzando.

**Tests plan:**
- Test visual: Storybook de ExpedientesTable con expediente en distintos estados.
- Test de componente: DocumentList renderiza tipos requeridos con badge "Obligatorio".
- Test de accesibilidad: contraste suficiente, etiquetas ARIA en indicadores.

### Tarea 5: Test de integración del flujo completo

**Descripción:** Test E2E (con mocking de Supabase) que recorra:
Solicitud → subida docs → PteDocumentacion → docs completos → EnRevisionPITR → Auditado

**Archivos a crear:**
- `src/lib/actions/__tests__/flujo-integracion.test.ts`

**Criterios de aceptación:**
- [ ] El test recorre el flujo completo sin errores.
- [ ] Verifica el estado final es `Auditado`.
- [ ] Verifica que `expediente.diagnostico` tiene datos.
- [ ] Verifica que cada transición intermedia ocurrió en orden.

---

## 7. Plan de pruebas (resumen)

| Tarea | Tipo de test | Archivo |
|---|---|---|
| T1 — trigger Subida → PteDoc | Unitario + Acción | `expediente.service.test.ts`, `documentos-expediente.test.ts` |
| T2 — completitud documental | Unitario + Acción | `documento-ia.service.test.ts`, `documentos-expediente.test.ts` |
| T3 — ejecución PITR | Integración + Acción | `diagnostico.test.ts` |
| T4 — feedback visual | Storybook + Componente | `ExpedientesTable.stories.tsx`, `DocumentList.test.tsx` |
| T5 — flujo completo | Integración E2E | `flujo-integracion.test.ts` |

---

## 8. No incluido (V2)

- Ejecución automática del Motor PITR al llegar a `EnRevisionPITR` (V1: manual por el AT).
- Subida asíncrona de documentos (V1: síncrona, el cliente espera).
- Procesamiento PITR en background (V1: síncrono, el cliente espera).
- Notificaciones push/email al cliente (V1: el cliente recarga la página).
- Configuración dinámica de tipos requeridos vía UI (V1: config en código).
- Drag & drop mejorado (V1: input file nativo).

---

## 9. Estimación

| Tarea | Esfuerzo estimado | Dependencias |
|---|---|---|
| T1 — Trigger Solicitud → PteDocumentacion | 0.5 días | — |
| T2 — Regla de completitud documental | 1 día | T1 |
| T3 — Feedback visual + acción AT para PITR manual | 1 día | T2 |
| T4 — Feedback visual cliente | 1 día | T2 |
| T5 — Test de integración | 0.5 días | T1–T4 |
| **Total** | **4 días** | |

---

## 10. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| La transición automática puede causar race conditions si el cliente sube 2 docs simultáneamente | Medio | Usar optimistic locking (versión) en cada transición. |
| Subida masiva de documentos (batch) | Bajo | DocumentList ya soporta subida individual. Batch se maneja en V2. |
| PITR tarda > 10s (ejecutado manualmente por el AT) | Medio | En V1 es síncrono con timeout de 30s. Si excede, transitar a `RequiereRevisionManual`. |
| Regla de completitud mal alineada con la documentación | Alto | Ya verificada: certificado original + 3 fotos según CF-028 §5.2 y CF-026 I-EX-05. |

---

## 11. Checklist de definición de completado

- [ ] T1 implementado y testeado.
- [ ] T2 implementado y testeado (regla según CF-028 §5.2: certificado original + 3 fotos).
- [ ] T3 implementado y testeado (PITR manual por AT, no automático).
- [ ] T4 implementado y testeado.
- [ ] T5 implementado y pasando.
- [ ] Build completo sin errores.
- [ ] Lint sin errores en archivos modificados.
- [ ] Sin TODO ni FIXME en archivos de la épica.
- [ ] Sin console.log en producción.
- [ ] Auditoría específica completada (EPIC WORKFLOW §10.2).
- [ ] Informe de cierre generado.
- [ ] Aprobación explícita del usuario.

---

## 12. Decisión

> **Propuesta:** Implementar EP-035 como primera funcionalidad del MVP, comenzando por la Tarea 1 (trigger documental).
> 
> Esta épica desbloquea el flujo completo del MVP desde la perspectiva del cliente y del AT.
> Sin ella, ningún expediente puede progresar más allá del estado inicial.
>
> **No requiere ADR** porque:
> - No modifica la arquitectura congelada (CF-001A).
> - No crea nuevos agregados ni bounded contexts.
> - Reutiliza el Core existente (Expediente, Documento IA).
> - Es una extensión controlada de las Server Actions existentes.
> - Todas las reglas de negocio implementadas están documentadas en CF-028 y CF-026.

---

**Correcciones aplicadas respecto a v1 (auditoría documental):**
- T2: requisito de completitud corregido a "certificado original + 3 fotos" (CF-028 §5.2, CF-026 I-EX-05).
- T3: eliminada ejecución automática del PITR. Sustituida por acción manual del AT (CF-050, CF-028).
- Estimación ajustada: 4.5d → 4d.

*Generado: 2026-07-11*  
*Basado en: MVP-AUDITORIA-FUNCIONAL.md, ROADMAP-V1.md, CF-028-EXPEDIENTE-WORKFLOW.md, CF-050-MVP-FREEZE.md, CF-026-EXPEDIENTE-DESIGN.md, CF-040-BUSINESS-POLICIES.md*
