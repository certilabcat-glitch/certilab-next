# RELEASE BACKLOG — Certilab v1.0 Execution Plan

> **Fecha:** 2026-07-13
> **Rol:** Delivery Manager
> **Contexto:** Auditoría global completada. El objetivo es transformar el estado actual en Release v1.0.
> **Restricciones:** CF-001A (Arquitectura V1 congelada), ADR aprobadas vigentes, sin nuevas capacidades de producto, Commercial Domain → v1.1 salvo dependencia documentada.

---

## Arquitectura de Referencia (Flujo MVP V1)

```
Solicitud → Documentación → PITR → Auditoría → Dictamen → Entrega
```

Cada ítem del backlog se posiciona en uno o varios puntos de este flujo.

---

## P0 — RELEASE BLOCKERS

> Trabajo que objetivamente impide Release v1.0. Sin estos ítems el producto no puede entregarse.

---

### P0-001: Verificar build limpio y lint sin errores

| Campo | Valor |
|-------|-------|
| **Objetivo** | Asegurar que `npm run build` y `npm run lint` pasan sin errores ni warnings en producción. |
| **Por qué es requerido** | No se puede releasear un proyecto que no compila. RC-001 audit indica que hubo fixes previos; debe verificarse estado actual. |
| **Archivos/módulos** | `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, todos los `.ts/.tsx` |
| **Dependencias** | Ninguna |
| **Esfuerzo estimado** | 1–2h |
| **Criterios de aceptación** | `npm run build` exit code 0. `npm run lint` exit code 0. Sin warnings de deprecación. |
| **Pasos de validación** | 1. Ejecutar `npm run build` 2. Ejecutar `npm run lint` 3. Verificar que no hay errores |

---

### P0-002: Verificar suite de tests completa

| Campo | Valor |
|-------|-------|
| **Objetivo** | Ejecutar toda la suite de tests y confirmar que pasa. |
| **Por qué es requerido** | No se puede releasear sin cobertura de tests verificada. Existen tests unitarios del Core y acciones que deben validarse. |
| **Archivos/módulos** | `vitest.config.ts`, `src/**/*.test.ts`, `src/**/*.test.tsx` |
| **Dependencias** | P0-001 |
| **Esfuerzo estimado** | 1–2h |
| **Criterios de aceptación** | `npm test` exit code 0. Todos los tests pasan. |
| **Pasos de validación** | 1. Ejecutar `npm test` 2. Verificar que todos los suites pasan 3. Si hay fallos, corregir |

---

### P0-003: Verificar migraciones aplicadas en base de datos

| Campo | Valor |
|-------|-------|
| **Objetivo** | Confirmar que todas las migraciones SQL están aplicadas correctamente en el entorno de producción. |
| **Por qué es requerido** | Sin esquema de base de datos correcto, el producto no funciona. Existen migraciones para cliente, inmueble, expediente, documento, diagnóstico, dictamen. |
| **Archivos/módulos** | `supabase/migrations/*.sql`, `scripts/*.mjs` |
| **Dependencias** | Acceso a Supabase project |
| **Esfuerzo estimado** | 1h |
| **Criterios de aceptación** | Todas las migraciones listadas como aplicadas. Esquema `core` completo con tablas: `clientes`, `inmuebles`, `expedientes`, `documentos_ia`, `diagnosticos`, `dictamenes`. |
| **Pasos de validación** | 1. Ejecutar script de verificación de esquema 2. Comprobar cada tabla contra el modelo de datos CF-020 |

---

### P0-004: Completar ciclo end-to-end de expediente (QA manual)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Recorrer el flujo completo de un expediente desde solicitud hasta resultado entregado en el entorno de preview/staging. |
| **Por qué es requerido** | Es la validación definitiva de que el MVP funciona. Sin esto no hay release. |
| **Archivos/módulos** | `src/app/(plataforma)/`, `src/components/expedientes/`, `src/lib/actions/`, `src/lib/core/` |
| **Dependencias** | P0-001, P0-002, P0-003 |
| **Esfuerzo estimado** | 3–4h |
| **Criterios de aceptación** | Usuario puede: (1) Crear solicitud, (2) Subir documentos, (3) Ver progreso, (4) Recibir resultado con dictamen. AT puede: (1) Ver bandeja técnica, (2) Revisar, (3) Emitir dictamen, (4) Entregar. |
| **Pasos de validación** | 1. Crear expediente como cliente 2. Subir documentación 3. Verificar cambio de estado 4. Revisar como AT 5. Emitir dictamen 6. Verificar entrega 7. Ver que cliente ve resultado |

---

## P1 — RELEASE QUALITY

> Mejoras importantes que deben completarse antes o inmediatamente después del Release. Sin estos ítems el producto funciona pero tiene carencias de experiencia de usuario y calidad.

---

### P1-001: Añadir estados de carga (loading/skeleton) en páginas clave

| Campo | Valor |
|-------|-------|
| **Objetivo** | Implementar skeletons o spinners en las páginas que actualmente muestran blank screen durante la carga de datos. |
| **Por qué es requerido** | Sin feedback visual, el usuario percibe que la aplicación no funciona. Impacta directamente la confianza del cliente. |
| **Archivos/módulos** | `src/app/(plataforma)/expedientes/[id]/page.tsx`, `src/app/(plataforma)/mis-expedientes/page.tsx`, `src/app/(plataforma)/at/dashboard/page.tsx`, `src/components/ui/Skeleton.tsx` |
| **Dependencias** | P0-001 |
| **Esfuerzo estimado** | 2–3h |
| **Criterios de aceptación** | Cada página muestra un skeleton/spinner mientras carga datos. La transición al contenido real es fluida. |
| **Pasos de validación** | 1. Navegar a cada página 2. Observar skeleton visible durante carga 3. Verificar que el contenido reemplaza al skeleton correctamente |

---

### P1-002: Añadir manejo de errores visible en UI

| Campo | Valor |
|-------|-------|
| **Objetivo** | Capturar errores de red, base de datos o servidor y mostrar mensajes amigables al usuario en lugar de páginas en blanco o errores genéricos. |
| **Por qué es requerido** | El MVP debe ser usable incluso cuando ocurren errores. Sin manejo de errores, el usuario queda sin orientación. |
| **Archivos/módulos** | `src/lib/actions/*.ts`, `src/components/expedientes/*.tsx`, `src/components/ui/use-toast.tsx` |
| **Dependencias** | P0-001 |
| **Esfuerzo estimado** | 3–4h |
| **Criterios de aceptación** | Los errores de servidor muestran toast o banner con mensaje descriptivo. Las acciones fallidas notifican al usuario sin desaparecer silenciosamente. |
| **Pasos de validación** | 1. Provocar error de red 2. Verificar que aparece mensaje de error 3. Verificar que la UI sigue operable |

---

### P1-003: Timeline de actividad básico

| Campo | Valor |
|-------|-------|
| **Objetivo** | Reemplazar el placeholder actual "El historial de actividad estará disponible próximamente" con un timeline que muestre los cambios de estado del expediente. |
| **Por qué es requerido** | La auditoría funcional detectó el placeholder como incompleto. Aunque no bloquea el release, es la principal carencia visual del expediente. |
| **Archivos/módulos** | `src/app/(plataforma)/expedientes/[id]/page.tsx` (líneas 274-285), backend de eventos o consulta de logs de cambio de estado |
| **Dependencias** | P0-001, (opcional) tabla de actividad en DB |
| **Esfuerzo estimado** | 3–4h |
| **Criterios de aceptación** | El timeline muestra al menos: fecha de creación, cambios de estado principales, fecha de entrega. Si no hay datos históricos, muestra el estado actual. |
| **Pasos de validación** | 1. Ver expediente en distintos estados 2. Confirmar que el timeline refleja los cambios 3. Verificar que no hay placeholder |

---

### P1-004: Descarga de resultado en PDF (básico)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Permitir al cliente descargar el resultado de la revisión como PDF. |
| **Por qué es requerido** | El cliente espera poder guardar/descargar el resultado. Actualmente solo se muestra en pantalla. No es P0 porque la experiencia web es funcional sin PDF, pero es la feature de calidad más solicitada. |
| **Archivos/módulos** | `src/components/expedientes/DictamenView.tsx`, `src/lib/actions/entregar-resultado.ts`, potencialmente `src/lib/pdf/` |
| **Dependencias** | P0-001, P0-003 |
| **Esfuerzo estimado** | 4–6h |
| **Criterios de aceptación** | El cliente puede hacer clic en "Descargar PDF" y recibe un PDF con el resultado del dictamen. El PDF incluye: número de expediente, fecha, resultado, notas del AT. |
| **Pasos de validación** | 1. Navegar a expediente con estado Entregado 2. Hacer clic en descargar 3. Verificar que el PDF se genera correctamente con la información esperada |

---

### P1-005: Mejorar feedback visual de auto-entrega (EntregarResultadoButton)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Reemplazar el spinner infinito actual por un mecanismo que detecte cuándo la acción ha completado y actualice la UI sin requiring recarga manual. |
| **Por qué es requerido** | Actualmente `EntregarResultadoButton` muestra spinner y ejecuta `requestSubmit()` pero la UI no se actualiza hasta recargar la página. El usuario ve "Preparando resultado..." permanentemente. |
| **Archivos/módulos** | `src/components/expedientes/EntregarResultadoButton.tsx`, `src/lib/actions/entregar-resultado.ts` |
| **Dependencias** | P0-001 |
| **Esfuerzo estimado** | 2–3h |
| **Criterios de aceptación** | Al auto-entregar: el spinner se reemplaza por el resultado. La transición es visible sin recargar la página. |
| **Pasos de validación** | 1. Ver expediente en estado Aprobado 2. Observar spinner → resultado sin recargar 3. Verificar que el estado persiste al recargar |

---

## P2 — POST RELEASE (v1.1+)

> Trabajo futuro planificado para la siguiente iteración. No debe implementarse durante la fase de Release v1.0.

---

### P2-001: Commercial Domain — Customer Management

| Campo | Valor |
|-------|-------|
| **Objetivo** | Completar el módulo de gestión de clientes comerciales con perfil, historial y preferencias. |
| **Por qué es requerido** | Base para facturación, leads y Customer Success. Ya existe `src/lib/commercial/customer.repository.ts` pero está incompleto. |
| **Archivos/módulos** | `src/lib/commercial/customer.repository.ts`, `src/types/commercial/index.ts`, `supabase/migrations/20260712_00001_create_schema_commercial.sql` |
| **Dependencias** | P0 completo |
| **Esfuerzo estimado** | 8–12h |
| **Criterios de aceptación** | CRUD de clientes comerciales completo con tests. |
| **Pasos de validación** | Tests unitarios + integración |

---

### P2-002: Commercial Domain — Order & Payment (Stripe)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Integrar Stripe para pagos de expedientes y gestionar pedidos. |
| **Por qué es requerido** | Necesario para monetizar el producto. Ya existe `src/lib/commercial/order.repository.ts` esqueleto. |
| **Archivos/módulos** | `src/lib/commercial/order.repository.ts`, nueva integración Stripe, webhooks, `src/lib/payment/` |
| **Dependencias** | P2-001, Stripe account setup |
| **Esfuerzo estimado** | 16–24h |
| **Criterios de aceptación** | Usuario puede pagar expediente vía Stripe. Webhook actualiza estado de pedido automáticamente. |
| **Pasos de validación** | 1. Crear expediente 2. Ir a checkout 3. Pagar con Stripe test 4. Verificar que el estado cambia |

---

### P2-003: PITR Motor — Fase 2 (Configuración y Calibración)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Implementar la configuración dinámica de pesos, umbrales y reglas del motor PITR (Pregunta-Intención-Trust-Relevancia). |
| **Por qué es requerido** | El motor PITR actual (`src/lib/pitr/`) es un hook básico. Falta la lógica de negocio completa con árbol de decisión configurable. |
| **Archivos/módulos** | `src/lib/pitr/`, `docs/CF-031-PITR-QUESTION-TREE.md`, `docs/CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md` |
| **Dependencias** | P0 completo |
| **Esfuerzo estimado** | 20–30h |
| **Criterios de aceptación** | Motor PITR puede calificar documentación automáticamente con configuración ajustable por administrador. |
| **Pasos de validación** | Tests de integración con distintos escenarios documentales |

---

### P2-004: Sistema de Notificaciones (Email)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Enviar emails automáticos al cliente cuando cambia el estado del expediente. |
| **Por qué es requerido** | Mejora la experiencia de usuario y reduce consultas a soporte. V1 MVP no incluye notificaciones push/email por diseño. |
| **Archivos/módulos** | Nuevo `src/lib/notifications/`, integración con proveedor email (Resend/SendGrid) |
| **Dependencias** | P0 completo |
| **Esfuerzo estimado** | 8–12h |
| **Criterios de aceptación** | Al cambiar a estado Rechazado, Aprobado, Entregado o Devuelto se envía email al cliente. |
| **Pasos de validación** | 1. Crear expediente 2. Verificar email de confirmación 3. Cambiar estado 4. Verificar email de notificación |

---

### P2-005: GTD — Gestión Técnica Documental (Línea de negocio secundaria)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Implementar la segunda línea de negocio aprobada vía ADR-003 y ADR-004. |
| **Por qué es requerido** | Diversifica el producto y permite captar un segmento adicional de clientes. Postergado a v1.1 por regla MVP. |
| **Archivos/módulos** | TBD — extensión de Documento IA |
| **Dependencias** | P0 completo, ADR-003, ADR-004 |
| **Esfuerzo estimado** | 20–30h |
| **Criterios de aceptación** | Usuario GTD puede gestionar documentación técnica con el mismo Core. |
| **Pasos de validación** | Por definir |

---

### P2-006: Actividad — Timeline completo con eventos históricos persistidos

| Campo | Valor |
|-------|-------|
| **Objetivo** | Persistir todos los cambios de estado, comentarios y acciones en una tabla `actividad_expediente` y mostrar timeline completo. |
| **Por qué es requerido** | Actualmente no hay registro histórico de eventos. P1-003 es una solución básica. Esta es la implementación completa. |
| **Archivos/módulos** | Nueva tabla `actividad_expediente` (migración), nuevo servicio `src/lib/core/actividad.service.ts`, timeline UI |
| **Dependencias** | P0 completo, P1-003 |
| **Esfuerzo estimado** | 8–12h |
| **Criterios de aceptación** | Cada cambio de estado genera un evento persistido. El timeline muestra historial completo ordenado por fecha. |
| **Pasos de validación** | 1. Recorrer flujo completo 2. Ver timeline con todos los eventos |

---

### P2-007: Customer Success — Dashboard de métricas y administración

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear dashboard para equipo de Customer Success con métricas de expedientes, clientes y SLAs. |
| **Por qué es requerido** | El equipo comercial necesita visibilidad del pipeline. No es necesario para Release v1.0. |
| **Archivos/módulos** | Nuevo `src/app/(admin)/`, nuevas queries analíticas |
| **Dependencias** | P2-001, P2-002 |
| **Esfuerzo estimado** | 16–24h |
| **Criterios de aceptación** | Dashboard muestra KPIs básicos de expedientes y clientes. |
| **Pasos de validación** | Verificación manual con datos reales |

---

## PRIORIDAD SELECCIONADA

### Tarea de mayor prioridad: **P0-004 — Ciclo end-to-end de expediente (QA manual)**

**Justificación:** Es la validación definitiva de que el producto funciona. Sin este ciclo completo aprobado, ningún release es posible. Los P0-001, P0-002, P0-003 son prerrequisitos técnicos pero P0-004 es la validación funcional que unifica todo.

**Razones:**
- Verifica que el flujo Solicitud → Documentación → PITR → Auditoría → Dictamen → Entrega funciona
- Detecta problemas de integración que los tests unitarios no cubren
- Es el criterio de aceptación último del MVP
- Depende de que P0-001, P0-002, P0-003 estén resueltos

---

### Primer incremento: P0-001 + P0-002 (2–4h cada uno)

Dado que P0-004 necesita que el build y los tests pasen, el primer incremento ejecutable es **verificar y reparar build + tests**.

#### Paso 1: Verificar build (2h)

| # | Acción | Estimación |
|---|--------|------------|
| 1.1 | Ejecutar `npm run build` y capturar errores | 10min |
| 1.2 | Corregir errores de compilación (tipos, imports, exports) | 1h |
| 1.3 | Ejecutar `npm run lint` y capturar errores | 10min |
| 1.4 | Corregir errores de lint (reglas ESLint, imports no usados) | 40min |
| 1.5 | Verificar build limpio nuevamente | 10min |

#### Paso 2: Verificar tests (2h)

| # | Acción | Estimación |
|---|--------|------------|
| 2.1 | Ejecutar `npm test` y capturar fallos | 5min |
| 2.2 | Analizar fallos: tests rotos por cambios recientes vs. tests que nunca pasaron | 30min |
| 2.3 | Corregir tests fallidos (actualizar mocks, fixtures, aserciones) | 1h |
| 2.4 | Añadir tests faltantes para cobertura mínima ( > 70% en Core) | 25min |

#### Paso 3: Verificar migraciones (1h)

| # | Acción | Estimación |
|---|--------|------------|
| 3.1 | Ejecutar script de verificación de esquema contra Supabase | 10min |
| 3.2 | Comparar tablas existentes contra CF-020 Data Model | 30min |
| 3.3 | Aplicar migraciones pendientes si las hay | 20min |

#### Paso 4: QA manual end-to-end (3h)

| # | Acción | Estimación |
|---|--------|------------|
| 4.1 | Como cliente: crear solicitud de segunda opinión | 20min |
| 4.2 | Como cliente: subir documentación (PDF + fotos) | 15min |
| 4.3 | Verificar cambio automático de estado | 10min |
| 4.4 | Como AT: ver expediente en bandeja técnica | 10min |
| 4.5 | Como AT: revisar documentación, emitir diagnóstico | 30min |
| 4.6 | Como AT: emitir dictamen | 15min |
| 4.7 | Verificar que cliente ve resultado automáticamente | 10min |
| 4.8 | Verificar flujo Devuelto → corrección → re-entrega | 30min |
| 4.9 | Verificar flujo Rechazado | 20min |
| 4.10 | Documentar incidencias encontradas | 20min |

> **Total primer incremento:** ~8 horas distribuidas en 4 pasos secuenciales de 1–3h cada uno.

---

## RESUMEN DE ESFUERZO

| Prioridad | Ítems | Esfuerzo estimado |
|-----------|-------|-------------------|
| **P0** | 4 | 7–11h |
| **P1** | 5 | 14–20h |
| **P2** | 7 | 76–134h |
| **Total** | 16 | 97–165h |

---

## RIESGOS IDENTIFICADOS

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Migraciones no aplicables a producción por conflictos con datos existentes | Alto | Ejecutar migraciones en entorno de staging primero |
| Tests rotos que requieren refactor del código bajo test | Medio | Priorizar corrección de tests sobre refactor |
| QA manual descubre bugs de integración no cubiertos por tests | Medio | Incluir tiempo de buffer en paso 4 |
| Comercial Domain tiene dependencias ocultas con Core que obligan a implementarlo en v1.0 | Alto | Auditoría de dependencias antes de comenzar P2 |

---

## APROBACIÓN

> Este plan requiere aprobación del usuario antes de comenzar la implementación.
>
> **Próximo paso:** Revisar y aprobar el plan. Una vez aprobado, comenzar con **Paso 1: Verificar build**.