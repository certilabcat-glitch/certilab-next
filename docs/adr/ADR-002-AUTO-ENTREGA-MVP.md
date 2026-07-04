# ADR-002 — Auto-entrega del resultado como decisión específica del MVP

- **Estado:** ACEPTADA
- **Fecha:** 2026-07-04
- **Épica origen:** EP-032 — Entrega del Resultado al Cliente
- **Documento de referencia:** `docs/CF-050-MVP-FREEZE.md`

---

## 1. Contexto

Durante la implementación de EP-032 se decidió que la entrega del resultado de la revisión del Arquitecto Técnico al cliente se realizara mediante **auto-entrega al visualizar** el expediente: cuando el cliente accede a la vista de detalle de un expediente en estado `Aprobado`, el sistema ejecuta automáticamente la transición `Aprobado → Entregado`.

Esta decisión responde a la necesidad de minimizar la fricción del MVP: el cliente no necesita realizar una acción explícita para recibir el resultado, y el Arquitecto Técnico no necesita intervenir manualmente en la entrega.

---

## 2. Problema

La auto-entrega al visualizar es una solución pragmática pero **no modela correctamente el dominio real**:

1. **La entrega es un acto del dominio.** En el mundo real, el Arquitecto Técnico entrega formalmente el resultado al cliente. La visualización por parte del cliente es un evento de consumo, no un mecanismo de entrega.

2. **No hay trazabilidad de la entrega.** La auto-entrega no distingue entre "el cliente ha recibido el resultado" y "el cliente ha visualizado la página". No hay acuse de recibo ni registro de consentimiento.

3. **No escala a requisitos futuros.** Funcionalidades como firma digital, acuse de recibo, notificaciones push, o entrega programada requerirían un modelo de entrega explícito.

---

## 3. Decisión

**La auto-entrega al visualizar se acepta como implementación válida para el MVP, pero no debe convertirse en una regla permanente del dominio.**

Específicamente:

- La transición `Aprobado → Entregado` en `ExpedienteService.entregarExpediente()` es parte del dominio y permanece.
- El mecanismo de **disparo** (auto-entrega al visualizar) es una decisión de implementación del MVP, no una invariante del dominio.
- En V2+, si surgen requisitos de firma, acuse de recibo, notificaciones o cualquier otro mecanismo formal de entrega, deberá revisarse este mecanismo sin estar vinculado por la implementación actual.

---

## 4. Consecuencias

**Positivas:**
- MVP entregado sin fricción para el cliente.
- Sin necesidad de infraestructura adicional (notificaciones, colas, etc.).
- La transición de estado permanece correctamente modelada en el dominio.

**Negativas:**
- La trazabilidad de la entrega es implícita (el cliente pudo haber visto la página sin haber "recibido" el resultado).
- No hay acuse de recibo.
- Si en V2+ se requiere notificación explícita, habrá que modificar el mecanismo de disparo.

**Obligaciones:**
- Cualquier cambio futuro en el mecanismo de entrega deberá documentarse en una nueva ADR.
- No se añadirán nuevas funcionalidades sobre la auto-entrega (notificaciones, acuses, etc.) sin revisar primero el mecanismo completo.

---

## 5. Alternativas consideradas

| Alternativa | Razón para no elegirla en MVP |
|-------------|-------------------------------|
| Botón explícito de "Recibir resultado" | El usuario aprueba flujo automático para reducir fricción en MVP |
| Envío por email del resultado | Requiere integración con servicio de email, fuera del alcance del MVP |
| Notificación push | Requiere infraestructura de notificaciones, fuera del alcance del MVP |
| Entrega manual por el AT | Añade carga operativa innecesaria para el MVP |

---

## 6. Referencias

- `docs/CF-050-MVP-FREEZE.md` — Documento de congelación del MVP
- `docs/analysis/EP-032-ENTREGA-RESULTADO-ANALYSIS.md` — Análisis funcional de EP-032
- `src/lib/core/expediente.service.ts` — Método `entregarExpediente()` (dominio)
- `src/components/expedientes/EntregarResultadoButton.tsx` — Auto-entrega al visualizar (implementación MVP)
- `src/lib/actions/entregar-resultado.ts` — Server Action idempotente