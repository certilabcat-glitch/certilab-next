# EP-032 — Análisis Funcional: Entrega del Resultado al Cliente

> **Documento:** Análisis funcional PRODUCT-FIRST previo a implementación.
> **Basado en:** CF-050-MVP-FREEZE.md, CF-028-EXPEDIENTE-WORKFLOW.md, CF-026-EXPEDIENTE-DESIGN.md
> **Estado:** Análisis pendiente de aprobación

---

## 1. ¿Qué recibe el cliente?

El cliente recibe el **resultado de la revisión realizada por el Arquitecto Técnico**.

Ese resultado se compone de:

| Elemento | Origen | Descripción |
|----------|--------|-------------|
| **Dictamen** | `Expediente.estado` | Aprobado o Rechazado. Es el veredicto del AT. |
| **Notas técnicas** | `Expediente.notas` | Texto libre escrito por el AT durante la revisión. Constituye el contenido del resultado. |
| **Nº de expediente** | `Expediente.numero_expediente` | Identificador del caso. |
| **Datos del inmueble** | Inmueble asociado | Dirección, referencia catastral. Contexto de la revisión. |
| **Documentos** | Documentos del expediente | Certificado original y evidencias subidas por el cliente. |

**No existe un "Informe Técnico" como entidad separada.** El resultado ES el expediente en estado `Entregado` con sus notas. No hay un nuevo artefacto que modelar.

---

## 2. ¿Cómo se representa el resultado reutilizando el Core?

### 2.1 Confirmación: No hace falta nueva persistencia

> **Toda la información que verá el cliente ya existe en los agregados del Core V1.**

A continuación se detalla dónde reside cada elemento que verá el cliente en la vista de resultado:

| Elemento visible para el cliente | Agregado | Campo/Origen |
|----------------------------------|----------|--------------|
| Dictamen (Aprobado/Rechazado) | `Expediente` | `ExpedienteRow.estado` |
| Notas técnicas del AT | `Expediente` | `ExpedienteRow.notas` |
| Nº de expediente | `Expediente` | `ExpedienteRow.numero_expediente` |
| Dirección del inmueble | `Inmueble` | `InmuebleRow.direccion` |
| Referencia catastral | `Inmueble` | `InmuebleRow.referencia_catastral` |
| Nombre del cliente | `Cliente` | `ClienteRow.nombre_completo` |
| Documentos aportados | `DocumentoIA` | Documentos asociados al expediente |
| Fecha de aprobación | `Expediente` | `ExpedienteRow.updated_at` (fecha del cambio de estado) |
| Historial de estados | `Expediente` | Tabla de historial de transiciones |

**EP-032 únicamente cambia la forma de presentar esta información.** No añade nuevos datos persistentes. No modifica el schema de la base de datos. No requiere migraciones.

### 2.2 Confirmación: No aparece ninguna entidad nueva

> **No se crean nuevas entidades en EP-032. No existe entidad "Informe Técnico". No existe tabla nueva. No existe Aggregate Root nuevo.**

Elementos que explícitamente NO se introducen:

- ❌ **No** existe entidad `InformeTecnico` como tipo, clase, interfaz o tabla
- ❌ **No** se crea una nueva tabla en Supabase
- ❌ **No** se añade un nuevo Aggregate Root
- ❌ **No** se añaden nuevas columnas a tablas existentes
- ❌ **No** se crea un nuevo tipo de documento
- ❌ **No** se introduce un nuevo Value Object

La representación del resultado es exclusivamente lógica: una sección condicional en la vista de detalle que muestra datos ya existentes.

### 2.3 Estrategia de representación

Se reutiliza íntegramente el Core existente:

| Core existente | Uso en EP-032 |
|----------------|---------------|
| `ExpedienteRow.notas` | Contiene el resultado escrito por el AT. Se muestra al cliente. |
| `ExpedienteRow.estado` | `Entregado` indica que el resultado está disponible. |
| `ExpedienteRow.numero_expediente` | Identificador del caso. |
| Inmueble asociado | Dirección y referencia catastral para contexto. |
| Documentos asociados | Certificado original para consulta del cliente. |

### 2.4 Vista del cliente (reutilización de `expedientes/[id]/page.tsx`)

La vista existente ya muestra:

- Número de expediente
- Estado (badge)
- Notas (si existen)
- Documentos subidos
- Fechas

Lo que **falta añadir** en EP-032:

1. **Sección "Resultado de la Revisión"** visible cuando el estado es `Aprobado` o `Entregado`
   - Muestra el dictamen (Aprobado)
   - Muestra las notas del AT formateadas como contenido legible
   - Fecha de aprobación
   - Botón/acción para "marcar como recibido" si el cliente confirma la entrega
2. **En la lista de "Mis Expedientes"** (`mis-expedientes/page.tsx`):
   - Los expedientes `Aprobados` deben tener un indicador de que el resultado está listo para ser consultado
   - Los expedientes `Entregados` deben aparecer como completados

### No se requiere

- Nuevo aggregate
- Nueva tabla en Supabase
- Nuevo tipo de documento
- Nueva columna en expediente

---

## 3. ¿Vista web, PDF o ambos?

### Decisión: Vista web como representación primaria y única en MVP

**El resultado se entrega como vista web dentro de la plataforma.**

El cliente accede a su expediente, ve el badge `Entregado`, y el contenido del resultado (notas del AT) se muestra en una sección dedicada.

### Justificación

| Criterio | Decisión |
|----------|----------|
| **Valor funcional** | El cliente necesita conocer el resultado. La vista web lo satisface inmediatamente. |
| **Complejidad** | PDF requiere generación server-side, librería (pdfkit, puppeteer), almacenamiento, y manejo de versiones. |
| **Frecuencia de uso** | El cliente consultará el resultado desde la plataforma. PDF sería secundario para guardar/ imprimir. |
| **MVP Discipline** | PDF no desbloquea al primer cliente de pago. La vista web sí. |

### PDF

**Se difiere a V2 salvo que se demuestre necesidad regulatoria o contractual que exija PDF.**

Si durante EP-032 se identifica un requisito explícito de un cliente piloto, se evaluará como extensión controlada dentro del MVP. En ese caso:
- Se generaría bajo demanda (no automático)
- Se almacenaría en Supabase Storage como documento del expediente
- Se reutilizaría la infraestructura de Documentos existente

---

## 4. ¿Cómo se produce la transición Aprobado → Entregado?

### 4.1 Análisis de dominio

Según CF-028-EXPEDIENTE-WORKFLOW.md §4 y la máquina de estados actual (`TRANSICIONES_ESTADO`):

```
Aprobado → [Entregado]
```

La transición ya está definida como válida en el tipo `EstadoExpediente` y en `TRANSICIONES_ESTADO`. Lo que falta es:

1. Un método en `ExpedienteService` que ejecute esta transición
2. Una Server Action que la exponga
3. Un desencadenante (quién o qué marca el expediente como entregado)

### 4.2 Análisis comparativo de alternativas

A continuación se analizan las tres alternativas solicitadas desde el punto de vista funcional y de negocio.

---

#### Alternativa A — Automática al aprobar

**Descripción:** El AT aprueba el expediente y el sistema lo pasa automáticamente a `Entregado`. El cliente ve directamente `Entregado`.

| Aspecto | Valor |
|---------|-------|
| **Transición** | `RevisionManual → Entregado` (en un solo paso) |
| **Desencadenante** | La acción de aprobar del AT |
| **Estado intermedio** | No existe `Aprobado` como estado visible |

**Ventajas:**
- Máxima simplicidad técnica (un solo cambio de estado, no hay lógica condicional en la vista)
- El AT completa su trabajo y el sistema finaliza el expediente sin pasos adicionales
- El cliente no necesita realizar ninguna acción para recibir el resultado

**Inconvenientes:**
- **Pérdida semántica:** El dominio de Certilab define dos actos distintos: la *aprobación técnica* (el AT dictamina que el certificado es correcto) y la *entrega* (el resultado se pone a disposición del cliente). Fusionarlos elimina la trazabilidad de cuándo ocurrió cada uno.
- **Sin ventana de visibilidad:** El AT no puede aprobar hoy y que la entrega ocurra mañana. Todo ocurre en el mismo instante.
- **El AT como entregador:** El AT no es responsable de "entregar" el resultado. Su responsabilidad termina en el dictamen técnico (aprobar o rechazar).

**Alineación con CF-050:** Baja. CF-050 §5 define explícitamente "Transición Aprobado → Entregado" como un paso diferenciado dentro de EP-032. Fusionarlos contradice la definición aprobada.

---

#### Alternativa B — Confirmación explícita del cliente

**Descripción:** El AT aprueba → el expediente queda en `Aprobado` → el cliente ve el resultado y pulsa un botón "He recibido el resultado" → `Entregado`.

| Aspecto | Valor |
|---------|-------|
| **Transición** | `Aprobado → Entregado` |
| **Desencadenante** | Acción explícita del cliente ("He recibido el resultado") |
| **Estado intermedio** | `Aprobado` |

**Ventajas:**
- **Acuse de recibo explícito:** El cliente declara formalmente haber recibido el resultado. Es el modelo más fiel al concepto de "entrega" con constancia.
- **Trazabilidad completa:** Queda registrado que el cliente confirmó la recepción en una fecha y hora concretas.
- **Separación clara:** La aprobación técnica y la entrega son actos distintos, cada uno con su registro.

**Inconvenientes:**
- **Fricción para el cliente:** El cliente debe realizar una acción adicional (hacer clic en un botón) después de haber leído el resultado. No aporta valor al cliente, solo al sistema.
- **Riesgo de abandono:** Si el cliente no pulsa el botón, el expediente queda en `Aprobado` indefinidamente. No hay notificación automática (CF-050 §2.3) que le recuerde hacerlo.
- **Inconsistencia con notificación manual:** Si el cliente entra porque ha sido notificado manualmente (ej. llamada telefónica), ya ha recibido el resultado. Exigirle una confirmación adicional en la plataforma es redundante.
- **Complejidad técnica adicional:** La vista de detalle debe mostrar un estado "pendiente de confirmación" visualmente distinto de "entregado", y gestionar el botón y su estado post-confirmación.

**Alineación con CF-050:** Media. Respeta la separación de los dos actos, pero introduce fricción que contradice el principio de simplicidad del MVP (CF-050 §7.1: "Una solución simple que funciona hoy es mejor que una solución elegante que retrasa la entrega").

---

#### Alternativa C — Automática al visualizar (sin acción explícita)

**Descripción:** El AT aprueba → el expediente queda en `Aprobado` → el cliente accede a la vista de detalle → el sistema detecta que es cliente propietario del expediente y lo transiciona a `Entregado` → el cliente ve el resultado completo.

| Aspecto | Valor |
|---------|-------|
| **Transición** | `Aprobado → Entregado` |
| **Desencadenante** | El cliente accede a la vista de detalle del expediente en estado `Aprobado` |
| **Estado intermedio** | `Aprobado` |

**Ventajas:**
- **Sin fricción:** El cliente solo necesita hacer clic en el expediente para ver el resultado. No hay pasos adicionales.
- **Semántica de dominio respetada:** `Aprobado` existe como estado intermedio entre el dictamen técnico y la entrega. Queda registrado cuándo se aprobó y cuándo se entregó.
- **Proxy razonable de "recepción":** En un modelo de notificación manual (CF-050 §2.3), el cliente accede a la plataforma por iniciativa propia (o tras una llamada). Ese acto de acceso es un proxy funcionalmente aceptable de "el cliente ha recibido el resultado".
- **Alineado con CF-050 §6 (criterio de finalización):** "El cliente **consulta** el resultado (aprobado o rechazado) con las notas del AT." El criterio usa "consultar", no "confirmar". La visualización es el evento relevante.
- **Mínima complejidad técnica:** Un condicional en la vista de detalle + una Server Action. No requiere nuevo estado visual ni botón adicional.

**Inconvenientes:**
- **Un evento de dominio (entrega) asociado a una acción técnica (cargar una página):** Alguien podría argumentar que "abrir una página ≠ recibir un resultado". Sin embargo, en el contexto de una aplicación web donde el cliente accede autenticado a su expediente, la equivalencia es razonable.
- **Sin acuse de recibo explícito:** No queda constancia de que el cliente "confirmó" la recepción, solo de que "accedió". En V2 podría mejorarse con un checkbox o firma digital.

**Alineación con CF-050:** Alta. Respeta la separación de actos, la simplicidad del MVP, el modelo de notificación manual, y el criterio de finalización definido.

---

### 4.3 Comparativa resumida

| Criterio | A — Auto al aprobar | B — Confirmación cliente | C — Auto al visualizar |
|----------|:---:|:---:|:---:|
| Simplicidad técnica | ✅ Máxima | ⚠️ Media | ✅ Alta |
| Separación dominio (aprobar ≠ entregar) | ❌ No existe | ✅ Sí | ✅ Sí |
| Fricción para el cliente | ✅ Ninguna | ❌ Acción extra | ✅ Ninguna |
| Acuse de recibo | ❌ No | ✅ Sí | ⚠️ Proxy |
| Trazabilidad de fechas | ❌ Una sola fecha | ✅ Dos fechas | ✅ Dos fechas |
| Alineación con CF-050 §5 | ❌ Contradice | ⚠️ Parcial | ✅ Total |
| Alineación con CF-050 §6 | ⚠️ Parcial | ⚠️ Parcial | ✅ Total |
| Alineación con notificación manual (§2.3) | ✅ | ❌ Inconsistente | ✅ |

### 4.4 Recomendación: Alternativa C — Automática al visualizar

**Se recomienda la Alternativa C por las siguientes razones:**

1. **El dominio manda:** `Aprobado` y `Entregado` son dos estados distintos con significado distinto. El AT aprueba; el sistema entrega cuando el cliente accede.
2. **Sin fricción:** El MVP prioriza la entrega de valor funcional. Un botón de confirmación no aporta valor al cliente, solo burocracia al sistema.
3. **Notificación manual compatible:** Con notificación manual, el flujo esperado es que el cliente entre a la plataforma a consultar. Al hacerlo, la entrega ocurre naturalmente.
4. **Criterio de finalización alineado:** CF-050 §6 habla de "consultar", no de "confirmar". La visualización satisface el criterio.
5. **Mínima expansión:** No requiere nuevo estado, nuevo componente de UI condicional, ni lógica adicional en el AT.

### 4.5 Comportamiento en la vista

```typescript
// Pseudo-código de la vista de detalle
async function ExpedienteDetailPage({ id }) {
  const expediente = await getExpedienteById(id);
  const esCliente = usuarioAutenticado.id === expediente.cliente_id;

  // Transición automática: si el cliente accede a un Aprobado, se entrega
  if (expediente.estado === 'Aprobado' && esCliente) {
    await entregarResultado(expediente.id, expediente.version);
    expediente = await getExpedienteById(id); // refrescar con estado Entregado
  }

  // Renderizar vista con el resultado
  render(<ResultadoView expediente={expediente} esCliente={esCliente} />);
}
```

### 4.6 Comportamiento para Rechazado

EP-032 cubre la entrega del resultado al cliente. Si el AT ha rechazado el expediente:

- El cliente puede ver el estado `Rechazado` y las notas del AT en la vista de detalle
- **No se ejecuta transición a `Entregado`** desde `Rechazado` (esa transición no existe en la máquina de estados)
- La gestión de `Rechazado → Devuelto → PteDocumentacion` corresponde a EP-033

### 4.7 Casos borde

| Escenario | Comportamiento |
|-----------|---------------|
| El cliente refresca la página | La segunda carga ya no ejecuta la transición porque el estado ya es `Entregado` |
| El AT accede al expediente después de aprobar | No se ejecuta la transición (no es cliente propietario). El AT ve `Aprobado` y puede consultar su dictamen |
| Un administrador accede | No se ejecuta la transición (no es cliente propietario) |
| El cliente nunca accede | El expediente queda en `Aprobado`. La entrega no ocurre porque el cliente no la ha recibido. Esto es correcto desde el punto de vista del dominio |
| El cliente accede pero la transición falla (error de BD) | La vista muestra el resultado en estado `Aprobado`. El cliente puede refrescar para reintentar. No se pierde información |
| El expediente está en `Entregado` por visita anterior | La vista muestra el resultado sin intentar transicionar. Estado estable |
| El cliente accede desde un dispositivo móvil con carga lenta | La transición ocurre después de cargar los datos, antes de renderizar. El usuario ve directamente `Entregado` |

### 4.8 Decisión final

> **Opción seleccionada: Alternativa C — Automática al visualizar (sin acción explícita del cliente).**
>
> El AT aprueba → `Aprobado` → el cliente accede a la vista de detalle → el sistema transiciona a `Entregado` → el cliente ve el resultado completo.
>

---

## 5. Componentes imprescindibles

### Server Layer

| Componente | Descripción | Archivo |
|------------|-------------|---------|
| `ExpedienteService.entregar()` | Nuevo método en el servicio que ejecuta transición `Aprobado → Entregado` | `src/lib/core/expediente.service.ts` |
| `entregarResultadoExpediente()` | Nueva Server Action que expone la transición | `src/lib/actions/at.ts` (o nuevo archivo `src/lib/actions/entrega.ts`) |

### Types

| Cambio | Descripción |
|--------|-------------|
| `TRANSICIONES_ESTADO` | ✅ Ya incluye `Aprobado → Entregado`. Sin cambios. |

### UI Layer (Cliente)

| Componente | Descripción | Archivo |
|------------|-------------|---------|
| Sección "Resultado de la Revisión" | Sección visible en `Aprobado`/`Entregado` que muestra dictamen + notas | `src/app/(plataforma)/expedientes/[id]/page.tsx` |
| Indicador en lista | En "Mis Expedientes", los `Aprobados` muestran indicador de "Resultado disponible" | `src/app/(plataforma)/mis-expedientes/page.tsx` |

### UI Layer (AT)

| Componente | Descripción | Archivo |
|------------|-------------|---------|
| ✅ Sin cambios | El AT no necesita nueva interfaz. Su acción termina al aprobar. | — |

### Tests

| Test | Descripción |
|------|-------------|
| Transición `Aprobado → Entregado` en service | Test unitario de `ExpedienteService.entregar()` |
| Server Action `entregarResultadoExpediente` | Test de integración de la acción |

---

## 6. ¿Qué queda explícitamente fuera del MVP?

| Capacidad | Motivo |
|-----------|--------|
| **PDF del resultado** | No desbloquea la entrega. Se difiere a V2. |
| **Nuevo Aggregate Root "Informe Técnico"** | Prohibido por CF-050. Se reutiliza Expediente. |
| **Notificación automática al cliente** | Notificación manual. El cliente debe consultar la plataforma. |
| **Firma digital del AT** | V2. En MVP, el resultado es texto del AT en notas. |
| **Historial de versiones del resultado** | V2. En MVP, el resultado es la última versión de las notas. |
| **Paginación en listados** | V2. No afecta a la entrega del resultado. |
| **Diseño de PDF corporativo** | V2. Ligado a la generación de PDF. |
| **Gateway de pago** | V2. Pago manual sigue siendo el modelo. |
| **Correcciones del cliente** | EP-033. No depende de EP-032. |

---

## 7. Flujo completo EP-032

```
AT aprueba expediente
    ↓
Expediente.estado = "Aprobado"
Expediente.notas = "El certificado cumple con los requisitos..."
    ↓
Cliente ve en "Mis Expedientes": badge "Aprobado" + indicador "Resultado disponible"
    ↓
Cliente hace clic en el expediente
    ↓
Vista de detalle detecta estado "Aprobado" + cliente propietario
    ↓
Transición automática: Aprobado → Entregado
    ↓
Vista de detalle muestra sección "Resultado de la Revisión":
  - ✅ Dictamen: Aprobado
  - Notas del AT
  - Fecha de aprobación
  - Nº de expediente
  - Datos del inmueble
    ↓
Cliente visualiza el resultado. El expediente queda en estado "Entregado".
```

---

## 8. Resumen de decisiones

| Decisión | Valor |
|----------|-------|
| ¿Qué recibe el cliente? | Dictamen (estado) + Notas técnicas del AT |
| Representación | Vista web dentro de la plataforma |
| ¿PDF? | No en MVP. Diferido a V2. |
| Transición Aprobado → Entregado | Automática al acceder el cliente a la vista de detalle |
| ¿Nuevo Aggregate Root? | No. Se reutiliza Expediente. |
| ¿Nueva tabla? | No. |
| ¿Nuevo tipo de documento? | No. |
| ¿Nuevas columnas? | No. |
| Server Action nueva | `ExpedienteService.entregar()` + Server Action |
| UI nueva | Sección "Resultado de la Revisión" en vista de detalle del cliente |
| UI modificada | Indicador en "Mis Expedientes" para expedientes con resultado disponible |
| Tests | Transición + Server Action |

---

## 9. Preguntas obligatorias (PRODUCT-FIRST)

### 9.1 ¿Qué capacidad funcional añade al MVP?

Permite que el cliente reciba y visualice el resultado de la revisión de su certificado energético, completando el ciclo de negocio: **solicitar → documentar → revisar → recibir resultado**.

Sin EP-032, el flujo termina en `Aprobado` pero el cliente no tiene forma de ver el resultado del AT. La entrega no está representada en el sistema.

### 9.2 ¿Qué agregados participan?

- **Expediente** (agregado raíz): contiene el estado y las notas que constituyen el resultado.
- **Inmueble**: proporciona contexto sobre la propiedad auditada (dirección, referencia catastral).
- **Cliente**: identifica al destinatario del resultado.

No se crean nuevos agregados.

### 9.3 ¿Cómo interactúan entre sí?

1. AT escribe notas en Expediente y cambia estado a `Aprobado`
2. Cliente consulta Expediente → se verifica que el cliente es propietario
3. Sistema cambia estado a `Entregado` y el cliente visualiza notas + datos del inmueble asociado

### 9.4 ¿Por qué esta es la solución de menor complejidad?

Porque:
- **Reutiliza** el Expediente existente sin modificaciones estructurales
- **Reutiliza** el campo `notas` existente como vehículo del resultado
- **Reutiliza** la máquina de estados existente (la transición ya está definida)
- **Añade** solo un método en el servicio y una Server Action
- **Modifica** mínimamente la vista del cliente para mostrar el resultado
- **No crea** nuevas tablas, tipos, agregados ni infraestructura
- **No requiere** PDF, notificaciones ni cambios en la interfaz del AT

Es la solución más simple que satisface completamente el requisito funcional respetando la arquitectura aprobada.

---

## 10. Pendiente de decisión

| Asunto | Pregunta |
|--------|----------|
| **¿Transición automática o acción explícita del cliente?** | La propuesta es automática al acceder. ¿Se prefiere que el cliente pulse un botón "He recibido el resultado"? |
| **¿Dónde ubicar la Server Action?** | En `src/lib/actions/at.ts` (junto al resto de acciones del AT-cliente) o en un nuevo archivo `src/lib/actions/entrega.ts`? |
| **¿PDF necesario para cliente piloto?** | ¿Existe algún requisito contractual/regulatorio conocido que exija PDF para la entrega? |

---

**Documento generado el:** 4 de julio de 2026
**Estado:** Pendiente de aprobación para iniciar implementación