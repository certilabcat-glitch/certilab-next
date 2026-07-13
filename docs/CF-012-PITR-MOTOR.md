# CF-012-PITR-MOTOR

> **⚠️ V2+ — Documento de diseño sin implementación en MVP**
> Este documento describe la arquitectura objetivo del Motor PITR™ completo.
> Durante V1 únicamente estará disponible la versión simplificada definida en CF-028 (Expediente Workflow).
> No debe implementarse según esta especificación hasta nueva orden.

**PITR™ — Protocolo de Inspección Técnica Remota**
Documentación técnica del motor de inspección reutilizable.

| Campo | Valor |
|-------|-------|
| Versión | 1.0 |
| Fecha | 30/06/2026 |
| Release | v1.2 |
| Responsable | Arquitectura Técnica Certilab |
| Dependencias | Foundation v1.1 (CF-011) |
| Build | ✅ Compilado (0 errores, 74 páginas) |

---

## 1. ARQUITECTURA

El motor PITR™ sigue un patrón de tres capas, completamente desacoplado de la UI:

```
┌────────────────────────────────────────────┐
│  CAPA DE PRESENTACIÓN                      │
│  src/components/pitr/                      │
│  ├── PitrEngine.tsx      (orquestador)     │
│  ├── PitrQuestion.tsx    (15 tipos input)  │
│  ├── PitrNavigation.tsx  (anterior/sig)    │
│  └── PitrProgress.tsx    (barra progreso)  │
├────────────────────────────────────────────┤
│  CAPA DE LÓGICA (React Hook)               │
│  src/lib/pitr/use-pitr.ts                  │
│  ── Puente entre motor puro y React ──     │
├────────────────────────────────────────────┤
│  CAPA DE DOMINIO (TypeScript puro)         │
│  src/lib/pitr/motor.ts   (584 líneas)      │
│  src/types/inspection.ts (290 líneas)      │
│  src/lib/pitr/templates/ (plantillas)      │
└────────────────────────────────────────────┘
```

**Principio fundamental:** El motor (`motor.ts`) no importa React. Es TypeScript puro, testable sin DOM, reutilizable en cualquier contexto (CLI, tests, workers).

---

## 2. ENTIDADES DEL DOMINIO

### 2.1 InspectionTemplate

Define la plantilla maestra de una inspección.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Slug único (ej: `segunda-opinion`) |
| `name` | string | Nombre visible |
| `version` | string | Versión semántica |
| `service` | string | Servicio asociado |
| `active` | boolean | ¿Visible en producción? |
| `description` | string | Propósito de la plantilla |
| `order` | number | Orden en selector |
| `config` | InspectionTemplateConfig | Configuración global |
| `sections` | InspectionSection[] | Secciones ordenadas |

**Configuración global (`InspectionTemplateConfig`):**

| Flag | Default | Efecto |
|------|---------|--------|
| `allowDraft` | true | Permite guardar borrador en localStorage |
| `allowResume` | true | Permite continuar un borrador existente |
| `showProgress` | true | Muestra barra de progreso |
| `showEstimatedTime` | true | Muestra tiempo estimado |
| `validateOnNext` | true | Valida al hacer clic en "Siguiente" |
| `requireAuth` | false | Requiere autenticación |
| `freeNavigation` | false | Navegación libre entre secciones |
| `autoSaveInterval` | 0 | Segundos entre auto-guardados (0=off) |
| `welcomeSection` | undefined | ID de sección de bienvenida |
| `summarySection` | undefined | ID de sección de resumen |
| `slots` | {} | Slots de integración futura |

### 2.2 InspectionSection

Agrupa preguntas por dominio temático.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Slug único dentro del template |
| `templateId` | string | Template padre |
| `name` | string | Nombre visible (H2 en UI) |
| `description` | string | Texto de ayuda bajo el título |
| `order` | number | Posición en el flujo |
| `questions` | InspectionQuestion[] | Preguntas de la sección |
| `required` | boolean | ¿Sección obligatoria? |
| `estimatedTime` | number | Minutos estimados |

### 2.3 InspectionQuestion

Define una pregunta individual. Soporta **15 tipos** de input.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Slug único |
| `sectionId` | string | Sección padre |
| `type` | QuestionType | Tipo de input (enum) |
| `text` | string | Etiqueta visible |
| `description` | string | Texto de ayuda bajo el input |
| `help` | string | Tooltip adicional |
| `placeholder` | string | Placeholder del input |
| `required` | boolean | ¿Obligatoria? |
| `condition` | QuestionCondition | Condición de visibilidad |
| `validation` | QuestionValidation | Reglas de validación |
| `order` | number | Posición en la sección |
| `destino` | string | Redirige a sección si se responde |
| `options` | QuestionOption[] | Opciones (select, radio, checkbox) |
| `defaultValue` | unknown | Valor por defecto |
| `metadata` | Record | Datos para integraciones futuras |

---

## 3. TIPOS DE PREGUNTA SOPORTADOS

| Enum value | Input HTML | Caso de uso |
|------------|-----------|-------------|
| `texto` | `<input type="text">` | Nombre, dirección |
| `textarea` | `<textarea>` | Observaciones, descripciones |
| `select` | `<select>` | Lista desplegable |
| `radio` | `<input type="radio">` | Selección única entre opciones |
| `checkbox` | `<input type="checkbox">` | Selección múltiple |
| `fecha` | `<input type="date">` | Fecha de construcción, visita |
| `email` | `<input type="email">` | Correo electrónico |
| `telefono` | `<input type="tel">` | Teléfono de contacto |
| `numero` | `<input type="number">` | Metros cuadrados, año |
| `fotografia` | `<input type="file" accept="image/*">` | Fotos del inmueble |
| `pdf` | `<input type="file" accept="application/pdf">` | Certificados, documentos |
| `archivo` | `<input type="file">` | Archivos genéricos |
| `referencia_catastral` | `<input type="text">` + validación catastral | Ref. catastral (14/20 dígitos) |
| `coordenadas` | `<input type="text">` + slot GPS | Latitud, longitud |
| `firma` | Área de firma digital (slot canvas) | Firma del técnico/cliente |

---

## 4. FLUJO DE INSPECCIÓN

```
INICIO
  │
  ├─ ¿Existe borrador? ──SÍ──▶ Cargar borrador (localStorage)
  │                              │
  └─ NO                          │
     │                           │
     ▼                           ▼
  Inicializar estado ◀───────────┘
     │
     ▼
  Mostrar bienvenida (si configurada)
     │
     ▼
  ┌─────────────────────────────────┐
  │  BUCLE DE SECCIONES             │
  │                                 │
  │  1. Mostrar preguntas visibles  │
  │  2. Evaluar condiciones         │
  │  3. Usuario responde            │
  │  4. Validar al cambiar          │
  │  5. Usuario pulsa "Siguiente"   │
  │  6. Validar sección completa    │
  │  7. Si errores → mostrar        │
  │  8. Si OK → marcar completada   │
  │  9. Navegar a siguiente         │
  │                                 │
  └──────────┬──────────────────────┘
             │
             ▼
  Mostrar resumen (si configurado)
             │
             ▼
  Finalizar → status="submitted"
             │
             ▼
  Eliminar borrador de localStorage
```

---

## 5. SISTEMA DE CONDICIONES

El motor evalúa visibilidad de preguntas mediante `QuestionCondition`.

**Operadores soportados:**

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `igual` | Valor coincide | Mostrar si "tipo_vivienda" === "piso" |
| `distinto` | Valor no coincide | Ocultar si "antiguedad" es "nueva" |
| `contiene` | Array o string contiene valor | Mostrar si seleccionó "ventana" en checklist |
| `mayor_que` | Valor numérico superior | Mostrar si "metros" > 100 |
| `menor_que` | Valor numérico inferior | Mostrar si "antiguedad" < 5 |
| `existe` | La pregunta tiene respuesta | Mostrar si ya respondió "email" |
| `no_existe` | La pregunta no tiene respuesta | Mostrar si aún no respondió "nombre" |

**Las condiciones evalúan contra todas las preguntas del template**, no solo las de la sección actual. Esto permite encadenar lógica entre secciones.

---

## 6. SISTEMA DE VALIDACIÓN

Cada pregunta puede definir reglas en `QuestionValidation`:

| Regla | Tipo | Descripción |
|-------|------|-------------|
| `minLength` | number | Longitud mínima de texto |
| `maxLength` | number | Longitud máxima de texto |
| `min` | number/string | Valor mínimo (numérico) |
| `max` | number/string | Valor máximo (numérico) |
| `pattern` | string | Expresión regular |
| `mensaje` | string | Mensaje de error personalizado |
| `formatoCatastral` | boolean | Valida referencia catastral española |
| `maxFileSize` | number | Tamaño máximo de archivo (bytes) |
| `allowedMimeTypes` | string[] | Tipos MIME permitidos |

**Flujo de validación:**
1. `validarSeccion()` recibe la sección + respuestas + todas las preguntas
2. Filtra preguntas visibles con `obtenerPreguntasVisibles()`
3. Para cada pregunta visible requerida sin respuesta → error
4. Para cada pregunta visible con respuesta → `validarRespuesta()`
5. Retorna `ValidationResult[]` con `{ valid, questionId, errors }`

**Si `validateOnNext: true`**, la validación se ejecuta automáticamente al pulsar "Siguiente" y bloquea el avance si hay errores.

---

## 7. CÁLCULO DE PROGRESO

El progreso (0-100%) se calcula como:

```
progreso = (preguntas_visibles_respondidas / total_preguntas_visibles) × 100
```

**No se basa en secciones completadas**, sino en preguntas concretas respondidas, considerando solo las preguntas visibles (las ocultas por condiciones no penalizan).

`generarEstadisticas()` retorna `ProgressStats` con:

| Campo | Descripción |
|-------|-------------|
| `percentage` | 0-100 |
| `currentStep` | Índice de sección actual (1-based) |
| `totalSteps` | Total de secciones |
| `estimatedMinutes` | Suma de tiempos estimados |
| `elapsedMinutes` | Tiempo real transcurrido |
| `remainingMinutes` | Estimado - transcurrido |
| `sections[]` | Array de `NavigableSection` con estado individual |

---

## 8. GESTIÓN DE BORRADORES

Los borradores se persisten en **localStorage** con prefijo `certilab_pitr_`.

| Función | Descripción |
|---------|-------------|
| `guardarBorrador(state)` | Serializa el estado completo y lo guarda |
| `cargarBorrador(draftId)` | Recupera y deserializa (restaura fechas) |
| `eliminarBorrador(draftId)` | Elimina al finalizar inspección |
| `listarBorradores()` | Lista todos los borradores (ordenados por fecha) |

**Auto-save configurable** vía `autoSaveInterval` (en segundos). Si es 0, desactivado.

---

## 9. EXTENSIBILIDAD

### 9.1 Cómo crear un nuevo template

1. Crear archivo en `src/lib/pitr/templates/` (ej: `auditoria-completa.ts`)
2. Exportar constante con tipo `InspectionTemplate`
3. Definir `sections[]` con sus `questions[]`
4. Usar el template en una página con `<PitrEngine template={...} />`

### 9.2 Cómo añadir un nuevo tipo de pregunta

1. Añadir valor al enum `QuestionType` en `src/types/inspection.ts`
2. Añadir renderer en `PitrQuestion.tsx` (línea 346)
3. Añadir estilos si es necesario en `PitrQuestion.module.css`
4. Opcional: añadir validación específica en `motor.ts` > `validarRespuesta()`

### 9.3 Servicios que usarán el motor

| Servicio | Template | Estado |
|----------|----------|--------|
| Segunda Opinión | `segunda-opinion.ts` | ✅ Template funcional |
| Segunda Opinión Express | Pendiente | 🔜 Por crear |
| Informe Técnico | Pendiente | 🔜 Por crear |
| Auditoría Completa | Pendiente | 🔜 Por crear |
| Servicios futuros | Pendiente | 🔜 Por crear |

---

## 10. VERSIONADO

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 30/06/2026 | Release inicial. 3 entidades, motor puro, hook React, 4 componentes UI, template Segunda Opinión funcional, 15 tipos de pregunta, sistema de condiciones, validación, progreso, borradores. |

---

## 11. SLOTS DE INTEGRACIÓN FUTURA

El motor reserva puntos de extensión sin implementarlos. Se definen en `InspectionTemplateSlots`:

| Slot | Propósito | Archivo preparado |
|------|-----------|-------------------|
| `photography` | Cámara nativa + geolocalización GPS | `PitrQuestion.tsx` (tipo `coordenadas`) |
| `ocr` | Lectura de certificados energéticos | `PitrQuestion.tsx` (tipo `pdf`) |
| `ai` | Asistente de inspección inteligente | `motor.ts` (campo `metadata`) |
| `catastro` | Consulta datos catastrales en tiempo real | `PitrQuestion.tsx` (tipo `referencia_catastral`) |
| `ce3x` | Integración con motor de certificación CE3X | `motor.ts` (campo `metadata`) |

**Todos los slots están marcados en código con comentarios `📍 Slot` o campos `metadata` listos para recibir payloads.**

---

## 12. RUTA DEMO

```
/pitr/segunda-opinion
```

Accesible desde el dashboard de plataforma. Muestra el motor funcionando con 10 secciones y preguntas de ejemplo representativas.

---

## 13. ÁRBOL DE ARCHIVOS

```
src/
├── types/
│   └── inspection.ts              (290 líneas — 3 entidades + 9 auxiliares)
├── lib/pitr/
│   ├── motor.ts                   (584 líneas — lógica pura)
│   ├── use-pitr.ts                (227 líneas — hook React)
│   └── templates/
│       └── segunda-opinion.ts     (plantilla funcional)
├── components/pitr/
│   ├── PitrEngine.tsx             (orquestador UI)
│   ├── PitrEngine.module.css
│   ├── PitrQuestion.tsx           (15 renderers)
│   ├── PitrQuestion.module.css
│   ├── PitrNavigation.tsx         (botones navegación)
│   ├── PitrNavigation.module.css
│   ├── PitrProgress.tsx           (barra + estadísticas)
│   └── PitrProgress.module.css
└── app/(plataforma)/pitr/
    └── segunda-opinion/
        ├── page.tsx
        └── page.module.css