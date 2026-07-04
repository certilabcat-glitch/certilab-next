# EP-030 — Informe de Cierre

## Datos de la épica

| Campo | Valor |
|-------|-------|
| **Épica** | EP-030 |
| **Título** | Cola de trabajo del Área Técnica (primera iteración) |
| **Fecha** | 2026-07-04 |
| **Rama** | platform-v1 |
| **Commit** | b42c3e29 |
| **Build** | Exitoso |
| **Tests** | 162 pasados (6 suites) |

---

## 1. Capacidad funcional entregada

> El sistema expone una cola de trabajo FIFO que lista los expedientes en estado
> `PteDocumentacion`, visible en `/at/dashboard`.

El Área Técnica dispone de un dashboard que muestra:
- Contador de expedientes pendientes
- Bandeja ordenada por `created_at` ascendente (FIFO)
- Datos básicos: nº expediente, servicio, título, fecha de recepción, estado

---

## 2. Paso del flujo desbloqueado

```
Cliente → Inmueble → Expediente → Documento IA → [ÁREA TÉCNICA] → Motor PITR → Resultado
                                                ↑
                                           EP-030
```

Se desbloquea el paso inmediatamente posterior a la recepción de documentación
completa. El sistema ya no tiene un callejón sin salida tras `PteDocumentacion`:
existe una cola desde la que se puede consumir el trabajo pendiente.

---

## 3. Agregados participantes

- **Expediente** — único agregado involucrado. Se consulta por estado y orden
  FIFO. No se crean ni modifican registros desde esta épica.

No se crean nuevos agregados. No se modifica el modelo de datos.

---

## 4. Componentes creados o modificados

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `src/lib/core/expediente.repository.ts` | Modificado | Nuevo método `findByEstado()` con orden ASC (FIFO), paginación, soft-delete y wrapper de error |
| `src/lib/actions/at.ts` | Nuevo | Server Actions del Área Técnica: `obtenerProximoExpedientePendiente`, `obtenerBandejaTecnica`, `contarPendientes` |
| `src/app/(plataforma)/at/dashboard/page.tsx` | Nuevo | Página Server-side del dashboard del Área Técnica |
| `src/lib/core/__tests__/expediente.repository.test.ts` | Modificado | 4 tests nuevos para `findByEstado`: consulta FIFO, límite personalizado, vacío, error |

---

## 5. Decisiones arquitectónicas

1. **No se crea un nuevo agregado.** El estado `PteDocumentacion` ya existe en
   el modelo de Expediente (CF-026). Una cola de trabajo no es un nuevo concepto
   de dominio, es una consulta con estado y orden.

2. **No se crea un servicio de dominio nuevo.** La lógica de consulta por estado
   es suficientemente simple como para residir en el Repository. El servicio de
   dominio (expediente.service.ts) no necesita modificaciones.

3. **Server Actions como capa de integración.** Se exponen las consultas del
   Repository como Server Actions listas para ser consumidas por componentes
   React Server Components.

4. **FIFO por created_at ASC.** No se añade un campo `queue_position` ni una
   tabla separada de cola. La ordenación por fecha de creación es suficiente
   para V1. Si en el futuro se necesita priorización, se añadirá sin cambiar
   la interfaz.

---

## 6. Lo que NO se implementó (V2 en adelante)

- Motor PITR (explícitamente excluido por el usuario)
- Procesamiento automático al alcanzar `PteDocumentacion` (el usuario quiere el
  flujo manual por ahora)
- Priorización de expedientes en la cola
- Asignación a técnicos concretos
- Estados de seguimiento dentro del AT (EnProgreso, Completado, etc.)
- Notificaciones al cliente
- Interfaz de detalle del expediente en el AT

---

## 7. Verificación contra DEFINITION OF DONE

| Criterio | Estado |
|----------|--------|
| Implementación completada | ✅ |
| Tipos TypeScript actualizados | ✅ (no se modificaron tipos existentes) |
| Tests implementados y pasando | ✅ 4 tests nuevos, 162 totales |
| Build completado correctamente | ✅ |
| Lint sin errores en archivos modificados | ✅ |
| Sin TODO ni FIXME | ✅ |
| Sin console.log en producción | ✅ |
| Auditoría específica completada | ✅ (este informe) |
| Aprobación explícita del usuario | Pendiente |

---

## 8. V2 Classification Check

Ninguna de las mejoras identificadas en la sección 6 pertenece a V2. Son
funcionalidades futuras que no bloquean el MVP y que se implementarán cuando
el roadmap las requiera.

---

## 9. Decisión arquitectónica

> La bandeja técnica reutiliza directamente el agregado Expediente. No se crea
> ninguna cola ni infraestructura adicional en V1. El futuro Motor PITR consultará
> directamente los expedientes en estado `PteDocumentacion`. Cualquier sistema de
> colas, prioridades, reintentos o procesamiento asíncrono queda diferido hasta
> que exista un consumidor real.

---

## 10. Conclusión

EP-030 completa la primera iteración del flujo de trabajo del Área Técnica.
Se ha creado una cola de trabajo FIFO sin modificar el modelo de datos, sin
crear nuevos agregados y sin introducir complejidad innecesaria. El Motor PITR
queda fuera del alcance de esta épica, tal como se solicitó.

El Dashboard del Área Técnica está accesible en `/at/dashboard` tras el build.