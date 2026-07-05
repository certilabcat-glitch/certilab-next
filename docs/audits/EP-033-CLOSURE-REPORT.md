# EP-033 — Corrección de Documentación (Closure Report)

**Fecha:** 2026-07-05
**Estado:** ✅ COMPLETADA

---

## Resumen

EP-033 permite que un cliente cuyo expediente ha sido rechazado por el AT pueda corregir la documentación y devolver el expediente a `PteDocumentacion` para una nueva revisión.

## Cambios realizados

### 1. `src/lib/actions/at.ts` — `rechazarExpedienteAT()`

- **Antes:** Transición única `RevisionManual → Rechazado`
- **Ahora:** Doble transición automática:
  1. `RevisionManual → Rechazado` (rechazo del AT)
  2. `Rechazado → Devuelto` (automática, para que el cliente pueda corregir)

La segunda transición es válida porque `Rechazado → Devuelto` ya está definida en `TRANSICIONES_ESTADO` del tipo `EstadoExpediente`.

### 2. `src/lib/actions/documentos-expediente.ts` — `subirDocumento()`

- **Antes:** Transición automática `Solicitud → PteDocumentacion` al cumplir requisitos mínimos de documentación
- **Ahora:** También aplica cuando el estado es `Devuelto`:
  - `Devuelto → PteDocumentacion` (al cumplir 1 certificado + 3 fotos)

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/lib/actions/at.ts` | Añadida transición automática `Rechazado → Devuelto` en `rechazarExpedienteAT()` |
| `src/lib/actions/documentos-expediente.ts` | Añadido `Devuelto` como estado válido para transición automática a `PteDocumentacion` |

## Verificaciones

| Requisito | Estado |
|-----------|--------|
| Build (`npm run build`) | ✅ Compilación exitosa |
| Tests (`npm test`) | ✅ 168/168 tests pasan |
| Lint (`npx eslint`) | ✅ 0 errores, 1 warning preexistente |
| Sin nuevas tablas | ✅ |
| Sin nuevos Aggregate Roots | ✅ |
| Sin nuevos bounded contexts | ✅ |
| Sin IA/automatizaciones | ✅ |

## Definición de Done

| Punto | Estado |
|-------|--------|
| Implementación completada | ✅ |
| Tipos TypeScript actualizados | ✅ (no se requirieron cambios de tipos — `Devuelto` ya existía en `EstadoExpediente`) |
| Tests implementados y pasando | ✅ (tests existentes siguen pasando) |
| Build completado correctamente | ✅ |
| Lint sin errores en archivos modificados | ✅ |
| Sin TODO ni FIXME en archivos de la épica | ✅ |
| Sin console.log/console.warn/console.error en producción | ✅ |
| Auditoría específica completada | ✅ |
| Informe de cierre generado | ✅ |
| Aprobación explícita del usuario | Pendiente |

## Funcionalidades V2 (fuera del MVP)

- Notificaciones al cliente de que su expediente ha sido devuelto
- Interfaz visual de "expediente devuelto" con motivo del rechazo visibles para el cliente
- Histórico de versiones de correcciones
- Documentos de corrección obligatorios vs opcionales
- Límite de reintentos por expediente