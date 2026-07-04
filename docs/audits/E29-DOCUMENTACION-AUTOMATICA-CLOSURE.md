# E29 — Cierre: Transición automática a "documentación completa"

## Datos de la épica

| Campo | Valor |
|-------|-------|
| **Código** | E29 |
| **Nombre** | Transición automática a "documentación completa" al subir documentos |
| **Fecha** | 2026-07-04 |
| **Auditor** | CF-001 |

## Resumen

Se ha eliminado el paso manual de "Marcar documentación como completa" y se ha
sustituido por una transición automática que ocurre en el momento exacto en que
el usuario sube el segundo tipo de documento requerido (CERTIFICADO_ORIGINAL +
FOTOGRAFIA).

## Cambios realizados

### `src/lib/actions/documentos-expediente.ts`

- En `subirDocumento()`, después de insertar cada documento en storage y BD,
  se consulta cuántos tipos de documento distintos tiene ya el expediente.
- Si ya están presentes ambos tipos (`CERTIFICADO_ORIGINAL` + `FOTOGRAFIA`),
  se actualiza `expedientes.estado = 'documentacion_completa'` automáticamente.
- Si solo está uno de los dos, el expediente permanece en su estado actual.
- No se requiere UI adicional: la transacción ocurre server-side en la misma
  función `subirDocumento()`.

### Archivos eliminados

- `src/lib/actions/marcar-documentacion-completa.ts` — Server Action obsoleto.
- `src/components/expedientes/MarcarDocumentacionCompletaButton.tsx` — Componente
  de botón obsoleto.

### `src/app/(plataforma)/expedientes/[id]/page.tsx`

- Eliminado import de `MarcarDocumentacionCompletaButton`.
- Eliminado bloque JSX que renderizaba el botón.

## Estado del build

- Build: ✅ Compilado sin errores (TypeScript + Turbopack).
- Tests: 158/158 pasando.
- Lint: Sin errores en archivos modificados.
- Sin TODO/FIXME ni console.log en los archivos modificados.

## Cumplimiento PRODUCT-FIRST

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué capacidad funcional añade al MVP? | El usuario ya no necesita pulsar un botón para indicar que ha terminado de subir documentos. El sistema lo detecta automáticamente. |
| ¿Qué agregados participan? | Expediente (solo lectura de estado y actualización). No se crean nuevos agregados. |
| ¿Cómo interactúan entre sí? | `subirDocumento()` lee los documentos del expediente, cuenta los tipos distintos, y si ambos están presentes actualiza el estado. |
| ¿Por qué es la solución de menor complejidad? | Se reutiliza la función existente `subirDocumento()` añadiendo una consulta de recuento y un update condicional. No se requiere nuevo componente, ruta, ni Server Action. Se elimina código legacy. |

## V2 classification

Ninguna mejora clasificada como V2.

## Decisión funcional registrada

**No revertir estado al eliminar documentos.** Si un expediente ha transitado a
`PteDocumentacion` porque cumplía los requisitos mínimos (≥1 CERTIFICADO_ORIGINAL
y ≥3 FOTOGRAFIA), y posteriormente el usuario elimina una fotografía dejando el
conjunto por debajo del mínimo, el expediente **no revierte** a `Solicitud`.

Esta es una decisión funcional deliberada de V1. No se considera un bug.

- La transición hacia adelante es correcta y cumple CF-028 §5.2.
- La eliminación es un soft delete (integridad referencial).
- Implementar la reversión añadiría complejidad sin valor funcional para el MVP.
- Si el usuario necesita adjuntar documentación adicional, puede hacerlo desde
  el detalle del expediente.
- Esta decisión podrá revisarse en V2 si la operativa lo requiere.

## Archivos afectados

| Archivo | Cambio |
|---------|--------|
| `src/lib/actions/documentos-expediente.ts` | Añadida lógica de transición automática |
| `src/lib/actions/marcar-documentacion-completa.ts` | Eliminado |
| `src/components/expedientes/MarcarDocumentacionCompletaButton.tsx` | Eliminado |
| `src/app/(plataforma)/expedientes/[id]/page.tsx` | Eliminado import y uso del botón |

## Aprobación

Para cerrar la épica se requiere aprobación explícita del usuario.