# EP-033 — Corrección de Documentación por Cliente: Análisis PRODUCT-FIRST

> Análisis previo a implementación. Basado en CF-028, CF-050, AGENTS.md §9.
> Fecha: 2026-07-05

---

## 1. ¿Qué capacidad funcional obtiene el cliente?

El cliente cuyo expediente ha sido **rechazado por el AT y devuelto** (`Devuelto`) puede:
- Visualizar el expediente en estado `Devuelto` (ya funcional desde EP-030/031)
- **Subir nueva documentación corregida** (reutilizando DocumentUpload de E28/E29)
- **Solicitar una nueva revisión** pulsando un botón que transiciona el expediente de `Devuelto` → `PteDocumentacion`

El AT recibirá el expediente como si fuera una nueva solicitud de documentación, y podrá procesarlo desde `PteDocumentacion` en adelante.

---

## 2. ¿Qué parte del flujo del MVP desbloquea?

Desbloquea la **retroalimentación del flujo** desde la Fase de Resultado hacia la Fase de Documentación:

```
Cliente → Inmueble → Expediente → Documento IA → PITR → Resultado
                                                           ↑
                                     Devuelto ─────────────┘
                                         ↓
                                    PteDocumentacion (reingreso)
```

Sin EP-033, un expediente en `Devuelto` es un estado terminal para el cliente sin posibilidad de reingreso.

---

## 3. ¿Qué agregados participan?

| Agregado | Rol | Tipo de acceso |
|----------|-----|----------------|
| **Expediente** | Coordina la transición `Devuelto → PteDocumentacion` | Modificación de estado |
| **Documento IA** | Almacena los nuevos documentos corregidos que el cliente suba antes de reingresar | Escritura (reutilizando flujo existente) |

Cliente e Inmueble son **solo lectura** — no se modifican.

---

## 4. ¿Qué componentes del Core V1 se reutilizan sin modificaciones?

| Componente | Reutilización |
|------------|---------------|
| `ExpedienteService.transicionarEstado()` | Ya existe y valida contra `TRANSICIONES_ESTADO`. La transición `Devuelto → PteDocumentacion` ya está permitida en la máquina de estados |
| `TRANSICIONES_ESTADO` en `src/types/core/expediente.ts` | **No requiere modificación** — ya incluye `Devuelto: ['PteDocumentacion']` (línea 238) |
| `DocumentUpload` | Reutilizado para que el cliente suba certificados/fotos corregidos |
| `DocumentList` | Reutilizado para que el cliente vea los documentos ya subidos |
| `ExpedienteRepository.actualizar()` | Reutilizado para la transición de estado |
| Vistas de detalle (mis-expedientes, expedientes/[id]) | Ya muestran el estado `Devuelto` con labels y colores |

---

## 5. ¿Cuál es la implementación mínima posible para permitir el flujo de correcciones?

3 artefactos:

### 5.1 Servicio — `expediente.service.ts`
Método `corregirExpediente(id, updatedBy, version)`:
- Valida estado actual = `Devuelto`
- Valida que updatedBy sea el cliente propietario del expediente
- Transiciona a `PteDocumentacion`
- Aplica optimistic locking (version)
- Retorna `{ success, estado_anterior, estado_nuevo, expediente }`

### 5.2 Server Action — `src/lib/actions/corregir-expediente.ts`
Acción `corregirExpedienteAction(id)`:
- Obtiene usuario autenticado (session)
- Verifica que el usuario es el propietario del expediente (comparando `cliente_id` con `auth.uid()`)
- Delega en `ExpedienteService.corregirExpediente()`
- Retorna resultado para la UI

### 5.3 UI — Botón "Corregir y reenviar"
- Botón visible solo cuando expediente está en `Devuelto`
- Texto: "Corregir documentación" o similar
- Tras la transición exitosa, redirige a la vista del expediente con enlace a DocumentUpload
- Manejo de estados (loading, error, success)

**No se requiere:**
- Migración de BD (no hay nuevos campos ni tablas)
- Nuevos tipos (la transición ya está tipada en la máquina de estados)
- Nuevos endpoints
- Modificaciones a la máquina de estados (`TRANSICIONES_ESTADO`)
- Nuevos aggregates ni bounded contexts

---

## 6. ¿Qué funcionalidades quedan explícitamente fuera del MVP (V2)?

| Funcionalidad | Motivo |
|---------------|--------|
| Notificación automática al cliente cuando el expediente pasa a `Devuelto` | No desbloquea el flujo de corrección en sí. El cliente entrará a la plataforma y verá el estado |
| Historial de versiones de correcciones | Completitud de registro, no necesario para la transición funcional |
| Re-asignación automática de AT | El AT ya está asignado al expediente |
| Límite de reintentos de corrección | Política de negocio no definida para V1 |
| Panel comparativo de documentos (antes vs después) | Mejora UX, no necesaria para el flujo funcional |
| Comentarios/feedback del AT visibles en el flujo de corrección | El AT puede usar el campo `notas` existente para dar feedback |
| Plazo de corrección (deadline automático) | Regla de negocio V2 |

---

## Clasificación

- **Tipo:** Extensión controlada del Expediente
- **Agregado afectado:** Solo Expediente (modificación)
- **Componentes nuevos:** 3 artefactos (método de servicio + server action + botón UI)
- **Componentes Core reutilizados:** 5+ sin modificaciones
- **Clasificación V2:** Las mejoras de notificaciones, historial, límites y deadline se clasifican automáticamente como V2 según AGENTS.md §9.6
- **Cumple regla de mínima expansión (AGENTS.md §9.4):** Sí — No se crean nuevos aggregates, bounded contexts ni servicios de dominio. Se extiende el agregado Expediente con un método.

---

## Estado de la transición en la máquina de estados

Confirmado: `TRANSICIONES_ESTADO` ya contiene:

```typescript
Devuelto: ['PteDocumentacion'],  // línea 238 de src/types/core/expediente.ts
```

**No requiere modificación.**

---

*Documento generado como parte del flujo EPIC WORKFLOW (AGENTS.md §10) — paso de Diseño/Análisis.*