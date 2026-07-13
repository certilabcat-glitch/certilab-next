# Auditoría Funcional MVP — Matriz de Cobertura

> **Fecha:** 2026-07-11
> **Propósito:** Recorrer el MVP como un cliente real y un Arquitecto Técnico, identificando el primer bloqueo funcional real.
> **Regla:** Cada paso se clasifica como **Funcional**, **Parcial** o **No implementado**.
> **Prohibido:** Proponer nuevas funcionalidades, mejoras de UX, más épicas. Solo identificar el primer punto donde el flujo completo se rompe.

---

## FLUJO COMPLETO MVP

### 1. Cliente inicia solicitud

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1.1 | Landing / Home | ✅ Dashboard | N/A | N/A | N/A | N/A | N/A | ✅ | **Funcional** |
| 1.2 | Página "Solicitar Segunda Opinión" | ✅ `solicitar-segunda-opinion/page.tsx` | N/A | N/A | N/A | N/A | N/A | ✅ | **Funcional** |
| 1.3 | Formulario solicitud | ✅ `SolicitarSegundaOpinionForm.tsx` | ✅ `crearExpediente()` | ✅ Crea Cliente + Expediente | ✅ Supabase insert | ✅ `null → Solicitud` via `expedienteService.crear` | ✅ Autenticación, error handling | ✅ redirect + error | **Funcional** |
| 1.4 | Redirección a mis-expedientes | ✅ | ✅ | N/A | N/A | N/A | N/A | ✅ | **Funcional** |

**Problemas detectados:**
- El formulario no recoge datos del cliente (nombre, email, teléfono, dirección). Crea un cliente con datos mínimos del usuario auth.
- No hay captura de datos del inmueble en la solicitud.
- La pantalla `nuevo-expediente/page.tsx` existe pero tiene el formulario deshabilitado — es un placeholder muerto.

---

### 2. Cliente crea expediente (desde solicitud)

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 2.1 | Lista "Mis Expedientes" | ✅ `mis-expedientes/page.tsx` | ✅ `getMisExpedientes()` | ✅ Filtra por cliente_id | ✅ Supabase query | N/A | ✅ Auth | ✅ Tabla o empty state | **Funcional** |
| 2.2 | Detalle expediente (cliente) | ✅ `expedientes/[id]/page.tsx` | ✅ `getExpedienteById()` | ✅ Verifica propiedad | ✅ Supabase query | N/A | ✅ Auth + ownership | ✅ Skeleton + error | **Funcional** |

**Problemas detectados:**
- El expediente se crea vacío: sin datos de cliente, sin datos de inmueble, sin documentos.
- El dashboard principal muestra `0` hardcodeado en todas las métricas. No hay datos reales.

---

### 3. Cliente aporta documentación

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 3.1 | DocumentList en detalle | ✅ `DocumentList.tsx` | ✅ Obtiene documentos | ✅ Lista docs del expediente | ✅ `documentos-expediente.ts` | N/A | N/A | ✅ Lista con attached/empty | **Funcional** |
| 3.2 | Subir documento | ❌ No implementado | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |
| 3.3 | Marcar documentación completa | ✅ Botón "Marcar documentación completa" | ✅ `marcarDocumentacionCompleta` | ❌ **No valida estado previo** | ✅ Actualiza estado | ✅ `Solicitud → PteDocumentacion` | ❌ **No verifica si hay documentos subidos** | ✅ toast | **Parcial** |

> ⚠️ **BLOQUEO FUNCIONAL #1: El cliente no puede subir documentos.**
> No existe componente de upload de archivos. Sin documentos subidos, no hay expediente válido. El botón "Marcar documentación completa" existe pero no verifica que realmente haya documentos. Se puede pasar a `PteDocumentacion` sin haber subido nada.

---

### 4. Expediente cambia de estado (automático / PITR)

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 4.1 | Motor PITR | ❌ `use-pitr.ts` existe pero es un hook cliente vacío | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |
| 4.2 | Transición `PteDocumentacion → EnRevisionPITR` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |
| 4.3 | Transición `EnRevisionPITR → Auditado/RequiereRevisionManual` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |

> ⚠️ **BLOQUEO FUNCIONAL #2: El motor PITR no está implementado.**
> El hook `use-pitr.ts` es un esqueleto vacío. No hay procesamiento automático de expedientes. El flujo se rompe aquí porque ningún expediente puede transicionar más allá de `PteDocumentacion` de forma automática.

---

### 5. Arquitecto Técnico recibe el expediente

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 5.1 | Dashboard AT | ✅ `at/dashboard/page.tsx` | ✅ Obtiene expedientes AT | ✅ Filtra por AT asignado o todos | ✅ `at.ts → listarExpedientesAT` | N/A | ✅ Auth (rol AT) | ✅ Tabla + filtros | **Funcional** |
| 5.2 | BandejaTecnicaTable | ✅ `BandejaTecnicaTable.tsx` | ✅ | N/A | N/A | N/A | N/A | ✅ Columnas + estados | **Funcional** |
| 5.3 | Transición manual `PteDocumentacion → RequiereRevisionManual` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |
| 5.4 | Tomar expediente / asignarse | ✅ `marcarRevisionManual()` | ✅ | ✅ Cambia a `RevisionManual` | ✅ | ✅ `RequiereRevisionManual → RevisionManual` | ✅ via `esTransicionValida` | ✅ toast | **Funcional** |

---

### 6. Arquitecto Técnico revisa

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 6.1 | Detalle expediente (AT) | ✅ `at/expedientes/[id]/page.tsx` | ✅ `obtenerExpedienteAT()` | ✅ | ✅ | N/A | ✅ Auth AT | ✅ Skeleton + error | **Funcional** |
| 6.2 | Visualizar documentación | ✅ `DocumentList.tsx` (solo lista nombres) | N/A | ✅ | N/A | N/A | N/A | ✅ | **Funcional** |
| 6.3 | Descargar/visualizar documentos | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |
| 6.4 | Asistente de Decisión Técnica | ✅ `AsistenteDecisionTecnica.tsx` | ✅ `iniciarDiagnostico()`, `guardarBorradorDiagnostico()`, `completarDiagnostico()` | ✅ Parcial (no valida estado del expediente) | ✅ | ❌ **No usa `esTransicionValida`** | ❌ **State bypass** | ✅ inline feedback | **Parcial** |

**Problemas detectados:**
- `iniciarDiagnostico` verifica `estado !== "SinDiagnostico"` en vez de usar `esTransicionValida`.
- `completarDiagnostico` NO transiciona el estado del expediente automáticamente.
- No se puede visualizar documentos subidos (no hay upload, no hay visor).

---

### 7. Arquitecto Técnico emite diagnóstico

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 7.1 | Asistente (diagnóstico) | ✅ (mismo que 6.4) | ✅ | ✅ Parcial | ✅ | ❌ No transiciona | ❌ | ✅ | **Parcial** |
| 7.2 | Transición `RevisionManual → Aprobado` vía diagnóstico | ❌ `completarDiagnostico` guarda pero NO cambia estado expediente | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |

> ⚠️ **BLOQUEO FUNCIONAL #3: `completarDiagnostico` no transiciona el estado del expediente.**
> El AT puede completar un diagnóstico, pero el expediente se queda en `RevisionManual`. No hay una acción que mueva el estado a `Aprobado` o `Rechazado` basado en el diagnóstico. El flujo se rompe aquí porque no hay continuidad diagnóstica.

---

### 8. Arquitecto Técnico emite dictamen

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 8.1 | EmitirDictamenButton | ✅ `EmitirDictamenButton.tsx` | N/A (renders conditional) | N/A | N/A | N/A | ✅ Solo render en `Aprobado` | ✅ | **Funcional** |
| 8.2 | EmitirDictamenModal | ✅ `EmitirDictamenModal.tsx` | ✅ `emitirDictamen()` | ✅ Parcial | ✅ | ❌ **Manual state check** `estado !== 'Aprobado'` | ❌ **No usa `esTransicionValida`** | ✅ toast + close + refresh | **Parcial** |
| 8.3 | Transición `Aprobado → DictamenEmitido` | ✅ | ✅ | ✅ | ✅ | ✅ `emitirDictamen` cambia estado | ❌ bypass `esTransicionValida` | ✅ | **Parcial** |
| 8.4 | DictamenView | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | **Funcional** |
| 8.5 | DictamenStatusBadge | ✅ | N/A | N/A | N/A | N/A | N/A | ✅ | **Funcional** |

---

### 9. Arquitecto Técnico entrega resultado

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 9.1 | EntregarDictamenButton | ✅ | ✅ `entregarDictamen()` | ✅ | ✅ | ✅ `DictamenEmitido → DictamenEntregado` | ❌ **No usa `esTransicionValida`** | ✅ toast | **Parcial** |
| 9.2 | EntregarResultadoButton | ✅ | ✅ `entregarResultado()` | ✅ | ✅ | ✅ `DictamenEntregado → Entregado` | ❌ **No usa `esTransicionValida`** | ✅ toast + mutate | **Parcial** |
| 9.3 | Acción `entregar-dictamen.ts` | N/A | ✅ | ✅ | ✅ | ✅ | ❌ bypass | ✅ | **Parcial** |
| 9.4 | Acción `entregar-resultado.ts` | N/A | ✅ | ✅ | ✅ | ✅ | ❌ bypass | ✅ | **Parcial** |

---

### 10. Cliente recibe el resultado

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 10.1 | Ver resultado en detalle (cliente) | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ | **Funcional** |
| 10.2 | Visualizar dictamen completo | ✅ `DictamenView.tsx` | N/A | N/A | ✅ | N/A | N/A | ✅ | **Funcional** |
| 10.3 | Notificación al cliente | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |

---

### 11. Cliente corrige documentación si procede

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 11.1 | CorregirExpedienteButton | ✅ | ✅ `corregirExpediente()` | ✅ | ✅ | ✅ `Rechazado → Devuelto` | ✅ via `esTransicionValida` | ✅ toast + refresh | **Funcional** |
| 11.2 | Subir nueva documentación | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |
| 11.3 | Marcar corrección completada | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |

---

### 12. Expediente vuelve al flujo

| # | Componente | ¿Existe pantalla? | ¿Existe acción? | ¿Existe lógica negocio? | ¿Existe persistencia? | ¿Transición estado? | ¿Validación? | ¿Respuesta visual? | Estado |
|---|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 12.1 | Transición `Devuelto → RevisionManual` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |
| 12.2 | Re-notificación al AT | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **No implementado** |

---

## MATRIZ DE COBERTURA FUNCIONAL — RESUMEN

| Paso del flujo | Estado | Observación |
|----------------|--------|-------------|
| 1. Cliente inicia solicitud | ✅ **Funcional** | Sin captura de datos de cliente/inmueble |
| 2. Cliente crea expediente | ✅ **Funcional** | Expediente mínimo sin datos |
| **3. Cliente aporta documentación** | ❌ **No implementado** | ⛔ **No hay upload de documentos** |
| 4. Expediente cambia de estado (PITR) | ❌ **No implementado** | Motor PITR es esqueleto vacío |
| 5. AT recibe expediente | ✅ **Funcional** | Solo para `RequiereRevisionManual` |
| 6. AT revisa | ⚠️ **Parcial** | No puede ver documentos, diagnóstico sin transición |
| 7. AT emite diagnóstico | ⚠️ **Parcial** | No transiciona estado del expediente |
| 8. AT emite dictamen | ⚠️ **Parcial** | Bypass de validación de estado |
| 9. AT entrega resultado | ⚠️ **Parcial** | Bypass de validación de estado |
| 10. Cliente recibe resultado | ⚠️ **Parcial** | Sin notificaciones |
| 11. Cliente corrige documentación | ⚠️ **Parcial** | Puede marcar corrección pero no subir docs |
| 12. Expediente vuelve al flujo | ❌ **No implementado** | No hay transición `Devuelto → RevisionManual` |

---

## IDENTIFICACIÓN DEL PRIMER BLOQUEO FUNCIONAL REAL

### 🚨 Bloqueo #1: Subida de documentos (Paso 3)

**El flujo completo del MVP se rompe en el paso 3.** El cliente crea un expediente, pero no tiene forma de adjuntar el certificado energético original ni ninguna evidencia documental.

**Razón por la que es el primer bloqueo:**
1. Sin documentos, el expediente no tiene objeto de revisión.
2. Sin documentos, el AT no puede hacer ningún trabajo.
3. El botón "Marcar documentación completa" permite transicionar a `PteDocumentacion` sin verificar si hay documentos.
4. Aunque el AT pudiera tomar el expediente, no tendría nada que revisar.
5. Todo el flujo posterior (diagnóstico, dictamen, entrega) es irrelevante sin documentos.

**Impacto:** El producto no puede completar ni una sola transacción real de principio a fin.

**Evidencia concreta:**
- `DocumentList.tsx` solo lista documentos — no hay `<input type="file">` ni API de upload.
- `documentos-expediente.ts` solo tiene acciones de lectura y marcado — no hay `subirDocumento()`.
- Las migraciones SQL (`20260709_00001_create_core_documento.sql`) definen la tabla `core.documento` pero no hay API de storage.
- El botón de marcar documentación completa existe en la UI pero no ejecuta validación de contenido documental.
- No se ha implementado el bucket de Supabase Storage ni las políticas RLS correspondientes.

### Bloqueos secundarios (no son el primero porque el primero ya corta todo el flujo):

| # | Bloqueo | Paso | Depende de |
|---|---------|------|------------|
| 2 | Motor PITR no implementado | 4 | Bloqueo #1 |
| 3 | Diagnóstico no transiciona estado | 7 | Bloqueo #1 |
| 4 | Sin notificaciones al cliente | 10 | Bloqueo #1 |
| 5 | Sin reincorporación tras corrección | 12 | Bloqueo #1 |

---

## CONCLUSIÓN

| Elemento | Valor |
|----------|-------|
| **Primer bloqueo funcional** | **Subida de documentos (Paso 3)** — El cliente no puede aportar el certificado energético |
| **Localización** | `src/components/expedientes/DocumentList.tsx`, `src/lib/actions/documentos-expediente.ts` |
| **Naturaleza** | Falta de implementación completa del módulo de documentos (upload + storage + validación) |
| **Impacto** | El 100% del flujo downstream es inalcanzable sin documentos |
| **Prioridad** | **Crítica** — Sin esto el MVP no tiene valor funcional alguno |
| **Acción requerida** | Implementar upload de documentos con Supabase Storage + validación + transición de estado condicional |