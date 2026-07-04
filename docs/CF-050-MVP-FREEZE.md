# CERTILAB — ACTA DE CONGELACIÓN DEL MVP

## CF-050 — MVP Freeze

> **Este documento es la referencia principal del proyecto. En caso de contradicción entre CF-050 y cualquier otro documento (incluyendo el roadmap original), prevalece lo dispuesto en CF-050 sobre el alcance del MVP.**

---

## 0. Estado actual del proyecto

| Componente | Estado | Detalle |
|------------|--------|---------|
| Core V1 — Cliente | ✅ Congelado | EP-024 completada |
| Core V1 — Inmueble | ✅ Congelado | EP-025 completada |
| Core V1 — Expediente | ✅ Congelado | EP-026 completada |
| Core V1 — Documento IA | ✅ Congelado | EP-027 completada |
| Dashboard AT | ✅ Completado | EP-030 completada |
| Motor PITR V1 (Revisión Manual AT) | ✅ Completado | EP-031 completada |
| Entrega del Resultado al Cliente | 🔲 Pendiente | EP-032 |
| Flujo de Correcciones | 🔲 Pendiente | EP-033 |
| Arquitectura V1 | ✅ Congelada | CF-001A |
| MVP | ✅ Congelado | CF-050 |

**Épicas completadas:** EP-024 · EP-025 · EP-026 · EP-027 · EP-030 · EP-031

**Épicas pendientes:** EP-032 · EP-033

---

## 1. Objetivo del MVP

El MVP (Minimum Viable Product) de Certilab tiene como objetivo **permitir que un cliente solicite una segunda opinión sobre un certificado energético, reciba la revisión manual de un Arquitecto Técnico y obtenga el resultado de dicha revisión**, todo ello dentro de un flujo controlado, trazable y sin automatización inteligente.

El MVP valida la hipótesis de negocio fundamental: **existe demanda de revisión experta manual de certificados energéticos** y el proceso puede operarse con pago manual, notificación manual y correcciones gestionadas por el cliente.

---

## 2. Modelo de negocio aprobado

### 2.1 Pago manual

El pago se gestiona de forma manual fuera del sistema. El expediente se crea en estado `Solicitud` y el paso a `PteDocumentacion` se realiza mediante acción manual. No existe pasarela de pago integrada ni gateway automático en V1.

### 2.2 Flujo de correcciones permitido

El cliente puede corregir la documentación de un expediente rechazado. El flujo es:

```
Cliente sube documentación → Expediente PteDocumentacion → AT revisa
    ↓
Rechazado → Devuelto → Cliente corrige → PteDocumentacion → AT revisa de nuevo
```

No hay límite de iteraciones de corrección en V1. La gestión del ciclo corresponde al AT.

### 2.3 Notificación manual

Todas las notificaciones (cambio de estado, solicitud de correcciones, resultado final) se realizan de forma manual. No existe sistema automático de emails, SMS ni notificaciones push en V1.

---

## 3. Capacidades incluidas en el MVP

| Capacidad | Épica | Estado |
|-----------|-------|--------|
| Agregado Cliente (alta, consulta) | EP-024 | ✅ Completada |
| Agregado Inmueble (alta, consulta) | EP-025 | ✅ Completada |
| Agregado Expediente (solicitud, documentación, estados) | EP-026 | ✅ Completada |
| Agregado Documento IA (gestión documental) | EP-027 | ✅ Completada |
| Dashboard del Arquitecto Técnico (bandeja de expedientes) | EP-030 | ✅ Completada |
| Motor PITR V1 — Revisión Manual del AT | EP-031 | ✅ Completada |
| Vista del Cliente (mis expedientes, detalle) | — | ✅ Completada |
| Entrega del Resultado al Cliente | EP-032 | 🔲 Pendiente |
| Flujo de Correcciones | EP-033 | 🔲 Pendiente |

### Estados del expediente activos en MVP

```
Solicitud → PteDocumentacion → RevisionManual → Aprobado → Entregado
                                                    ↓
                                               Rechazado → Devuelto → PteDocumentacion
                                                    ↓
                                               Cancelado
```

---

## 4. Capacidades diferidas a V2

| Capacidad | Descripción |
|-----------|-------------|
| **Motor PITR automático** | Automatización del proceso PITR mediante IA, OCR, LLM, RAG, procesamiento automático, colas y agentes. El concepto de dominio PITR (revisión técnica) permanece; la automatización computacional se difiere. |
| Pasarela de pago | Integración con gateway de pago automático. |
| Notificaciones automáticas | Sistema de notificaciones push, email o SMS. |
| Informe Técnico como entidad | Modelado del Informe Técnico como aggregate independiente. |
| Paginación en UI | Paginación o infinite scroll en listados de expedientes. |
| Tests de UI y server actions | Cobertura de tests para componentes y acciones de servidor. |
| Caché | Sistema de caché para mejorar rendimiento. |
| Value Objects | Modelado formal de NIF, email, código postal, etc. |

---

## 5. Roadmap congelado

El MVP consta de las siguientes épicas, que constituyen el alcance completo y cerrado del producto mínimo viable:

### EP-032 — Entrega del Resultado al Cliente

**Objetivo:** Permitir que el cliente reciba el resultado de la revisión realizada por el Arquitecto Técnico.

**Incluye:**
- Transición `Aprobado → Entregado`
- Representación del resultado en la vista del cliente
- Reutilización de las notas existentes del Expediente
- PDF solo si resulta imprescindible para la entrega

**Restricciones:**
- No se crea un nuevo Aggregate Root "Informe Técnico".
- No se modela el Informe Técnico como entidad independiente en V1.

### EP-033 — Flujo de Correcciones

**Objetivo:** Permitir al cliente visualizar el motivo del rechazo, subir nueva documentación y comenzar un nuevo ciclo de revisión.

**Dependencias:** EP-031 únicamente. No depende de EP-032.

**Incluye:**
- Visualización del motivo del rechazo (notas del AT)
- Subida de nueva documentación por parte del cliente
- Transición `Devuelto → PteDocumentacion`
- Nueva revisión por parte del AT tras la corrección

---

## 6. Criterio de finalización del MVP

El MVP de Certilab se considerará completado cuando un cliente pueda realizar de principio a fin el siguiente flujo:

1. **Registrarse** — El cliente se da de alta en la plataforma.
2. **Crear un expediente** — El cliente crea una solicitud de segunda opinión.
3. **Subir la documentación requerida** — El cliente adjunta el certificado energético y las evidencias necesarias.
4. **Esperar la revisión del Arquitecto Técnico** — El AT recibe el expediente, lo revisa manualmente y emite su dictamen.
5. **Recibir el resultado de la revisión** — El cliente consulta el resultado (aprobado o rechazado) con las notas del AT.
6. **Corregir la documentación si fuese necesario** — En caso de rechazo, el cliente corrige la documentación y el ciclo de revisión se reinicia.
7. **Finalizar el expediente** — El expediente se cierra con estado `Entregado`.

Cuando este flujo pueda ejecutarse íntegramente con un cliente real, el MVP se declarará finalizado.

A partir de ese momento, toda nueva funcionalidad pertenecerá a V2 salvo decisión arquitectónica explícita.

---

## 7. Principios del MVP

El desarrollo del MVP de Certilab se rige por los siguientes principios, que prevalecen sobre cualquier criterio técnico o arquitectónico:

1. **Valor funcional primero** — Entregar valor funcional antes que sofisticación técnica. Una solución simple que funciona hoy es mejor que una solución elegante que retrasa la entrega.

2. **Reutilización del Core** — Reutilizar siempre el Core existente (Cliente, Inmueble, Expediente, Documento IA) antes de crear nuevos componentes. La composición y extensión controlada son preferibles a la creación.

3. **Sin nuevos Aggregate Roots sin necesidad demostrada** — No introducir nuevos Aggregate Roots sin una necesidad funcional demostrada que no pueda resolverse mediante los agregados existentes.

4. **Desbloqueo del primer cliente de pago** — Toda nueva funcionalidad debe desbloquear directamente el camino hasta el primer cliente de pago. Si no acerca el producto a ese objetivo, no pertenece al MVP.

5. **V2 por defecto** — Cualquier capacidad que únicamente mejore arquitectura, automatización o escalabilidad se considera V2 salvo justificación expresa que demuestre que desbloquea el MVP.

6. **El dominio manda** — Las reglas de negocio del dominio de Certilab prevalecen sobre cualquier consideración técnica, de framework o de infraestructura. Ninguna decisión tecnológica puede alterar el significado del dominio. Si existe conflicto entre una convención técnica y una invariante del dominio, la invariante del dominio gana.

---

## 8. Declaración de freeze

> **A partir de la fecha de esta acta, el MVP de Certilab queda oficialmente congelado.**
>
> El alcance del MVP es el definido en este documento (secciones 0-5). No se admiten nuevas funcionalidades, épicas, capacidades ni requisitos dentro del MVP.
>
> Cualquier propuesta de nueva funcionalidad deberá:
>
> 1. Justificar explícitamente por qué desbloquea el MVP o es imprescindible para su entrega.
> 2. Demostrar que no puede resolverse mediante la reutilización, composición o extensión de las capacidades ya incluidas.
> 3. Obtener aprobación expresa antes de iniciar cualquier implementación.
>
> Las capacidades diferidas a V2 (sección 4) no podrán incorporarse al MVP salvo que concurrentemente se demuestre un bloqueo funcional crítico que impida la entrega.
>
> **Lo que no está en este documento no pertenece al MVP.**

---

## 9. Documentos relacionados

| Documento | Relación |
|-----------|----------|
| `CF-000-PROJECT-BRAIN.md` | Constitución del proyecto |
| `CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` | Acta de cierre de arquitectura V1 |
| `CF-028-EXPEDIENTE-WORKFLOW.md` | Workflow del expediente |
| `docs/ROADMAP-V1.md` | Roadmap de V1 (subsidiario de CF-050) |
| `docs/PROPUESTA-MODELO-MVP.md` | Propuesta de modelo MVP previa |
| `docs/audits/SPRINT-05-CIERRE-DOMINIO-V1.md` | Cierre de Sprint 05 |
| `docs/audits/CORE-V1-STABILIZATION-FINAL.md` | Estabilización del Core V1 |

---

| Fecha | Versión | Autor | Cambio |
|-------|---------|-------|--------|
| 2026-07-04 | 1.0 | Sprint Review MVP | Creación del documento. Congelación oficial del MVP. |
| 2026-07-04 | 1.1 | Sprint Review MVP | Adición de sección 6 — Principios del MVP. Reordenación de secciones. |
| 2026-07-04 | 1.2 | Sprint Review MVP | Adición de sección 6 — Criterio de finalización del MVP. Reordenación de secciones 7-9. |
| 2026-07-04 | 2.0 | Sprint Review MVP | Adición de §0 Estado actual del proyecto. Nota de prevalencia de CF-050 sobre el roadmap. CF-050 pasa a ser la referencia principal. |

---

**Certilab — MVP Freeze**
**Fecha: 4 de julio de 2026**
**Estado: ✅ Congelado**