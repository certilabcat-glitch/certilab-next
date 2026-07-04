# CF-028 — Orquestación del flujo del Expediente

> **Documento de diseño de la orquestación del flujo funcional completo del MVP.**
>
> Define cómo los cuatro agregados del Core V1 (Cliente, Inmueble, Expediente, Documento IA)
> colaboran para recorrer el ciclo de vida completo de un expediente, desde la solicitud
> hasta la entrega del resultado.
>
> No modifica agregados existentes. No crea nuevos agregados. No redefine el dominio.

---

**Versión:** 1.0.0  
**Fecha:** 04/07/2026  
**Autor:** Certilab Core Engineering  
**Estado:** ✅ Vigente  
**Tipo:** Diseño de orquestación  
**Relación:** CF-022, CF-026, CF-030, CF-031, CF-032, CF-040, PROPUESTA-MODELO-MVP

---

## ÍNDICE

1. [Propósito y alcance](#1-propósito-y-alcance)
2. [Diagrama general del flujo](#2-diagrama-general-del-flujo)
3. [Fase 0 — Pre-creación: Identificación del cliente e inmueble](#3-fase-0--pre-creación-identificación-del-cliente-e-inmueble)
4. [Fase 1 — Creación del expediente](#4-fase-1--creación-del-expediente)
5. [Fase 2 — Recepción de documentación](#5-fase-2--recepción-de-documentación)
6. [Fase 3 — Análisis PITR automático](#6-fase-3--análisis-pitr-automático)
7. [Fase 4 — Revisión manual del Arquitecto Técnico](#7-fase-4--revisión-manual-del-arquitecto-técnico)
8. [Fase 5 — Entrega del resultado](#8-fase-5--entrega-del-resultado)
9. [Fase de cancelación y rechazo](#9-fase-de-cancelación-y-rechazo)
10. [Matriz de responsabilidades por agregado](#10-matriz-de-responsabilidades-por-agregado)
11. [Mapa de eventos entre agregados](#11-mapa-de-eventos-entre-agregados)
12. [Validaciones por paso](#12-validaciones-por-paso)
13. [Gestión de fallos](#13-gestión-de-fallos)
14. [Manual vs. Automatizado en V1](#14-manual-vs-automatizado-en-v1)
15. [Glosario de la orquestación](#15-glosario-de-la-orquestación)

---

## 1. Propósito y alcance

### 1.1 ¿Qué es este documento?

Define la secuencia orquestada de interacciones entre los cuatro agregados del Core V1
para completar el flujo funcional completo del MVP de Certilab:

```text
Cliente → Inmueble → Expediente → Documento IA → PITR → Resultado
```

### 1.2 ¿Qué NO es este documento?

- ❌ No es código ni especificación de implementación.
- ❌ No modifica los límites de ningún agregado existente.
- ❌ No crea nuevos agregados ni entidades.
- ❌ No redefine el modelo de dominio (CF-020, CF-021, CF-022).
- ❌ No sustituye el diseño del Expediente (CF-026) ni del Documento IA (EP-027).
- ❌ No es un documento de infraestructura (no define colas, workers, schedules).

### 1.3 Principios de la orquestación

1. **Cada agregado es autónomo.** Ningún agregado accede directamente a los datos internos de otro. Toda comunicación ocurre mediante referencias por ID y eventos.
2. **El Expediente es el coordinador del flujo.** Es el agregado que contiene la máquina de estados y determina cuándo debe actuar cada agregado.
3. **La orquestación es explícita.** Cada transición está definida y validada. No existen cambios de estado implícitos.
4. **Los fallos son estados de primera clase.** Cada transición puede fallar, y el flujo contempla explícitamente qué ocurre en cada caso.
5. **La automatización es gradual.** En V1, la orquestación prioriza la intervención humana en los pasos críticos. Las automatizaciones futuras se identifican pero no se implementan.

---

## 2. Diagrama general del flujo

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FLUJO COMPLETO DEL MVP                       │
│                                                                     │
│  FASE 0                    FASE 1              FASE 2               │
│  PRE-CREACIÓN              CREACIÓN            DOCUMENTACIÓN        │
│  ┌──────────┐             ┌──────────┐        ┌──────────────┐      │
│  │ Cliente  │────(1)─────▶│Expediente│────(5)─▶│ Documento IA │      │
│  │ existente│             │ creado   │        │  recepción   │      │
│  └──────────┘             └──────────┘        └──────┬───────┘      │
│       │                                              │              │
│       │(2)                                           │(6)           │
│       ▼                                              ▼              │
│  ┌──────────┐                                    ┌──────────┐      │
│  │ Inmueble │◀────(3)────┐                       │ Doc      │      │
│  │vinculado │             │                       │ completo │      │
│  └──────────┘             │                       └────┬─────┘      │
│       │                  │                            │             │
│       │(4)               │(fallback)                  │(7)          │
│       ▼                  │                            ▼             │
│  ┌──────────┐            │                    ┌──────────────┐      │
│  │Inmueble  │            │                    │ Expediente   │      │
│  │ existente│            │                    │documentado   │      │
│  └──────────┘            │                    └──────┬───────┘      │
│                                                    │              │
│  FASE 3                   FASE 4                  │  FASE 5       │
│  ANÁLISIS PITR            REVISIÓN MANUAL          │  ENTREGA      │
│  ┌──────────────┐        ┌──────────────┐          │              │
│  │ Motor PITR   │──(8)──▶│ Expediente   │          │              │
│  │ (automático) │        │ auditado     │          │              │
│  └──────┬───────┘        └──────┬───────┘          │              │
│         │                      │                   │              │
│         │(9a)                  │(10)               │              │
│         ▼                      ▼                   ▼              │
│  ┌──────────────┐        ┌──────────────┐    ┌──────────────┐     │
│  │Confianza ≥80%│        │ Aprobado     │    │ Expediente   │     │
│  │ → Auditado   │        │ por AT       │    │ Entregado    │     │
│  └──────────────┘        └──────┬───────┘    └──────────────┘     │
│         │                      │                                  │
│         │(9b)                  │(11)                              │
│         ▼                      ▼                                  │
│  ┌──────────────┐        ┌──────────────┐                         │
│  │Confianza <80%│        │ Rechazado    │                         │
│  │ → RevManual  │        │ por AT       │                         │
│  └──────────────┘        └──────┬───────┘                         │
│                                 │                                 │
│                                 ▼                                 │
│                          ┌──────────────┐                         │
│                          │  Devuelto    │                         │
│                          │  al cliente  │                         │
│                          └──────────────┘                         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Fase 0 — Pre-creación: Identificación del cliente e inmueble

### 3.1 Descripción

Antes de crear un expediente, el sistema debe identificar al **Cliente** y al **Inmueble**
que participarán. Esta fase resuelve si son existentes o deben registrarse.

### 3.2 Flujo

```
Inicio de solicitud
       │
       ▼
┌─────────────────────────────┐
│ ¿Cliente existente?         │
│ (búsqueda por email/NIF)    │
└─────────┬─────────┬─────────┘
          │         │
         SÍ        NO
          │         │
          ▼         ▼
   ┌──────────┐  ┌──────────────────┐
   │ Usar ID  │  │ Registrar nuevo  │
   │existente │  │ Cliente          │
   └──────────┘  └──────────────────┘
          │         │
          └────┬────┘
               │
               ▼
┌─────────────────────────────┐
│ ¿Inmueble existente?        │
│ (búsqueda por ref.catastral)│
└─────────┬─────────┬─────────┘
          │         │
         SÍ        NO
          │         │
          ▼         ▼
   ┌──────────┐  ┌──────────────────┐
   │ Usar ID  │  │ Registrar nuevo  │
   │existente │  │ Inmueble (con    │
   │          │  │ propietarioId)   │
   └──────────┘  └──────────────────┘
          │         │
          └────┬────┘
               │
               ▼
       ┌──────────────┐
       │ IDs resueltos│
       │ cliente_id   │
       │ inmueble_id  │
       └──────────────┘
```

### 3.3 Agregado responsable

| Paso | Agregado | Acción |
|------|----------|--------|
| Búsqueda de cliente | **Cliente** | Busca por email o NIF. Devuelve `cliente_id` o `null`. |
| Creación de cliente | **Cliente** | Registra nuevo cliente. Emite `ClienteRegistrado`. Devuelve `cliente_id`. |
| Búsqueda de inmueble | **Inmueble** | Busca por referencia catastral. Devuelve `inmueble_id` o `null`. |
| Creación de inmueble | **Inmueble** | Registra nuevo inmueble vinculado al `cliente_id`. Emite `InmuebleRegistrado`. Devuelve `inmueble_id`. |

### 3.4 Información intercambiada

| Origen | Destino | Datos |
|--------|---------|-------|
| Formulario | Cliente | email/NIF, nombre, teléfono |
| Formulario | Inmueble | referencia catastral, dirección, tipo |
| Cliente | Expediente | `cliente_id` |
| Inmueble | Expediente | `inmueble_id` |

### 3.5 Estados afectados

| Agregado | Estado anterior | Estado nuevo |
|----------|----------------|--------------|
| Cliente | — (nuevo) | `activo` |
| Cliente | `activo` | `activo` (sin cambio si existía) |
| Inmueble | — (nuevo) | `activo` |
| Inmueble | `activo` | `activo` (sin cambio si existía) |

### 3.6 Validaciones

| # | Validación | ¿Bloqueante? | ¿Quién valida? |
|---|-----------|-------------|----------------|
| V-PRE-01 | Email o NIF no vacío | Sí | Cliente |
| V-PRE-02 | Referencia catastral no vacía | Sí | Inmueble |
| V-PRE-03 | Cliente no duplicado por email (activo) | Sí | Cliente |
| V-PRE-04 | Inmueble no duplicado por ref.catastral (activo) | Sí (se unifica) | Inmueble |
| V-PRE-05 | Propietario del inmueble es el cliente solicitante | Sí | Inmueble |

### 3.7 Gestión de fallos

| Fallo | Acción | ¿Recuperable? |
|-------|--------|--------------|
| Cliente no encontrado y datos insuficientes para crear | Mostrar error al usuario | Sí (completar datos) |
| Inmueble no encontrado y datos insuficientes para crear | Mostrar error al usuario | Sí (completar datos) |
| Propietario no coincide | Solicitar acreditación de representación | Sí (subir documento) |

### 3.8 Manual vs. Automatizado en V1

| Paso | V1 | Futuro |
|------|-----|--------|
| Búsqueda de cliente por email/NIF | Automático | — |
| Registro de nuevo cliente | Automático | — |
| Validación de datos del cliente | Manual (revisión AT) | Automático con documentos |
| Búsqueda de inmueble por ref.catastral | Automático | — |
| Registro de nuevo inmueble | Automático | — |
| Verificación de titularidad | Manual (documento adjunto) | Automático con catastro |

---

## 4. Fase 1 — Creación del expediente

### 4.1 Descripción

Con el `cliente_id` y `inmueble_id` resueltos, se crea el expediente en estado `Solicitud`
con los datos mínimos del servicio solicitado.

### 4.2 Flujo

```
┌──────────────────────────────────────────────────────────────┐
│ Crear Expediente                                              │
│                                                              │
│ Inputs:                                                      │
│  - cliente_id (de Fase 0)                                   │
│  - inmueble_id (de Fase 0)                                  │
│  - tipoServicio: [auditoría, segunda_certificación]         │
│  - tipoCertificado: [original, auditado]                    │
│  - arquitecnico_id (asignado en este punto o después)       │
│                                                              │
│ Outputs:                                                     │
│  - expediente_id                                             │
│  - codigoExpediente (EXP-YYYY-NNNNNN)                       │
│  - Estado: Solicitud                                         │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Validaciones (I-EX-01, I-EX-02, I-EX-03)                    │
│                                                              │
│ 1. cliente_id existe y Cliente está activo                  │
│ 2. inmueble_id existe y Inmueble está activo                │
│ 3. No hay otro expediente activo para este inmueble         │
│ 4. Tipo de servicio válido                                  │
│ 5. Asignación de AT (opcional aquí, obligatorio antes de    │
│    pasar de Solicitud)                                       │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Expediente creado → Estado: Solicitud                       │
│                                                              │
│ Evento emitido: ExpedienteCreado                            │
│ Datos: expediente_id, cliente_id, inmueble_id,               │
│        tipoServicio, timestamp                               │
└──────────────────────────────────────────────────────────────┘
```

### 4.3 Agregado responsable

| Paso | Agregado | Acción |
|------|----------|--------|
| Validación de cliente existente | **Cliente** (consultado) | Verifica que `cliente_id` existe y está activo |
| Validación de inmueble existente | **Inmueble** (consultado) | Verifica que `inmueble_id` existe y está activo |
| Validación de expediente activo previo | **Expediente** | Verifica I-EX-02 (un expediente activo por inmueble) |
| Creación del expediente | **Expediente** | Crea el registro, emite `ExpedienteCreado` |

### 4.4 Información intercambiada

| Origen | Destino | Datos |
|--------|---------|-------|
| Formulario | Expediente | cliente_id, inmueble_id, tipoServicio |
| Cliente (repo) | Expediente (validación) | estado del cliente, confirmación de existencia |
| Inmueble (repo) | Expediente (validación) | estado del inmueble, confirmación de existencia |
| Expediente | Sistema | ExpedienteCreado (evento) |

### 4.5 Estados afectados

| Agregado | Estado anterior | Estado nuevo |
|----------|----------------|--------------|
| Expediente | — | **Solicitud** |
| Cliente | `activo` | `activo` (sin cambio) |
| Inmueble | `activo` | `activo` (sin cambio) |

### 4.6 Validaciones

| # | Validación | ¿Bloqueante? | ¿Quién valida? |
|---|-----------|-------------|----------------|
| V-CR-01 | `cliente_id` referencia a Cliente activo | Sí | Expediente → Cliente |
| V-CR-02 | `inmueble_id` referencia a Inmueble activo | Sí | Expediente → Inmueble |
| V-CR-03 | No existe expediente activo para este inmueble | Sí | Expediente |
| V-CR-04 | `tipoServicio` es válido | Sí | Expediente |
| V-CR-05 | `tipoCertificado` es válido | Sí | Expediente |
| V-CR-06 | Generación de código único (EXP-YYYY-NNNNNN) | Sí | Expediente |

### 4.7 Gestión de fallos

| Fallo | Acción | ¿Recuperable? |
|-------|--------|--------------|
| Cliente no existe | Mostrar error: "El cliente no está registrado" | Sí (volver a Fase 0) |
| Inmueble no existe | Mostrar error: "El inmueble no está registrado" | Sí (volver a Fase 0) |
| Ya existe expediente activo | Mostrar error: "Ya hay un expediente en curso para este inmueble" | Sí (esperar a que termine) |
| Código duplicado (colisión) | Regenerar con nuevo número secuencial | Automático |

### 4.8 Manual vs. Automatizado en V1

| Paso | V1 | Futuro |
|------|-----|--------|
| Validación de cliente/inmueble existentes | Automático | — |
| Creación del expediente | Automático | — |
| Asignación de AT | Manual (selección por administrador) | Automático (round-robin por carga) |
| Verificación I-EX-02 (expediente activo) | Automático | — |

---

## 5. Fase 2 — Recepción de documentación

### 5.1 Descripción

El cliente debe aportar la documentación necesaria para iniciar el análisis. Esta fase
gestiona la carga de documentos a través del agregado **Documento IA**.

### 5.2 Flujo

```
Expediente en Solicitud
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Transición automática si hay docs disponibles                │
│                                                              │
│ Estado: Solicitud → PteDocumentación                        │
│                                                              │
│ (Si el cliente ya adjunta docs al crear, la transición       │
│  es inmediata. Si no, el expediente espera en este estado.)  │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Cliente sube documentos                                      │
│                                                              │
│ 1. Certificado original (PDF obligatorio)                   │
│ 2. Fotografías del inmueble (conjunto mínimo según CF-030)  │
│ 3. Documentación complementaria (catastro, escrituras...)   │
│                                                              │
│ Cada documento se registra en Documento IA con:              │
│  - expediente_id                                             │
│  - tipo: CERTIFICADO_ORIGINAL / FOTOGRAFIA /                 │
│          DOCUMENTACION_COMPLEMENTARIA                        │
│  - estado_ia: PENDIENTE                                      │
│  - hash_sha256 (para integridad)                             │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Validación de documentación mínima                           │
│                                                              │
│ ¿Está cargado el CERTIFICADO_ORIGINAL?                       │
│  │                                                            │
│  ├─ NO → PteDocumentación (espera más docs)                  │
│  │                                                            │
│  └─ SÍ → Validar PDF:                                       │
│          - ¿es realmente un PDF?                             │
│          - ¿tamaño dentro de límites?                        │
│          - ¿se puede leer?                                   │
│            │                                                  │
│            ├─ Fallo → Documento marcado como ERROR           │
│            │         Expediente sigue en PteDocumentación    │
│            │                                                  │
│            └─ OK → Documento marcado como COMPLETADO         │
│                      (estado_ia = COMPLETADO)                 │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ ¿Se ha alcanzado el mínimo de documentación?                 │
│                                                              │
│ Mínimo V1:                                                   │
│  - Certificado original (OBLIGATORIO)                        │
│  - Al menos 3 fotografías del inmueble                       │
│    (fachada principal + dos laterales, según CF-030 §21)     │
│                                                              │
│  │                                                            │
│  ├─ NO → PteDocumentación (espera)                           │
│  │                                                            │
│  └─ SÍ → Expediente → PteDocumentación → EnRevisionPITR     │
│                                                              │
│ Evento emitido: DocumentacionMinimaCompleta                  │
└──────────────────────────────────────────────────────────────┘
```

### 5.3 Agregado responsable

| Paso | Agregado | Acción |
|------|----------|--------|
| Registro de documento subido | **Documento IA** | Almacena metadatos, genera hash, marca como `PENDIENTE` |
| Validación de tipo/tamaño/integridad | **Documento IA** | Verifica mime_type, tamano_bytes, hash |
| Conteo de documentos por tipo | **Documento IA** | Consulta documentos del expediente agrupados por tipo |
| Verificación de documentación mínima | **Expediente** | Decide si se cumplen los requisitos para avanzar |
| Transición de estado | **Expediente** | Solicitud → PteDocumentación → EnRevisionPITR |

### 5.4 Información intercambiada

| Origen | Destino | Datos |
|--------|---------|-------|
| Cliente (UI) | Documento IA | Archivo, tipo, nombre, expediente_id |
| Documento IA | Expediente | Conteo de documentos por tipo, estado_ia de cada uno |
| Documento IA | Storage externo | Archivo binario (no es responsabilidad del agregado) |

### 5.5 Estados afectados

| Agregado | Estado anterior | Estado nuevo |
|----------|----------------|--------------|
| Expediente | Solicitud | **PteDocumentación** |
| Expediente | PteDocumentación | **PteDocumentación** (sigue esperando) |
| Expediente | PteDocumentación | **EnRevisionPITR** (mínimo cumplido) |
| Documento IA (certificado) | — | `PENDIENTE` → `COMPLETADO` (tras validación) |
| Documento IA (fotos) | — | `PENDIENTE` → `COMPLETADO` (tras validación) |
| Documento IA (cualquier doc) | — | `PENDIENTE` → `ERROR` (si falla validación) |

### 5.6 Validaciones

| # | Validación | ¿Bloqueante? | ¿Quién valida? |
|---|-----------|-------------|----------------|
| V-DOC-01 | Certificado original presente | Sí (para salir de PteDocumentación) | Expediente |
| V-DOC-02 | Certificado es PDF válido (< 20MB) | Sí | Documento IA |
| V-DOC-03 | Fotografías en formato imagen (JPEG/PNG, < 10MB c/u) | Sí (las que se suben) | Documento IA |
| V-DOC-04 | Mínimo 3 fotografías | Sí (para salir de PteDocumentación) | Expediente |
| V-DOC-05 | Hash SHA-256 coincide tras subida | Sí (integridad) | Documento IA |
| V-DOC-06 | No duplicados por hash en el mismo expediente | Sí (evita subir mismo archivo dos veces) | Documento IA |

### 5.7 Gestión de fallos

| Fallo | Acción | ¿Recuperable? |
|-------|--------|--------------|
| PDF inválido o corrupto | Marcar como ERROR. Notificar al cliente para que re-subir | Sí |
| Fotografía en formato no soportado | Rechazar archivo. Pedir formato válido | Sí |
| Archivo demasiado grande | Rechazar con mensaje de tamaño máximo | Sí |
| Hash no coincide tras subida | Reintentar subida. Si persiste, error de almacenamiento | Sí (reintento) |
| Cliente no sube nada tras 30 días | Transición a RechazadoFaltaDatos | No (terminal) |

### 5.8 Manual vs. Automatizado en V1

| Paso | V1 | Futuro |
|------|-----|--------|
| Subida de documentos por el cliente | Manual (cliente) | — |
| Validación de tipo/tamaño/hash | Automático | — |
| Verificación de documentación mínima | Automático | — |
| Validación de que el PDF es un CE3X real | **Manual** (el AT lo revisa) | Automático (IA) |
| Extracción de datos del certificado original | **Manual** (el AT introduce variables CE3X) | Automático (OCR + IA) |
| Clasificación automática de fotografías | No aplica | Automático (IA visión) |

---

## 6. Fase 3 — Análisis PITR automático

### 6.1 Descripción

El motor PITR procesa automáticamente el certificado original y la documentación
aportada para generar un nivel de confianza global y detectar contradicciones.

> **Nota:** El motor PITR no es un agregado del Core V1. Es un servicio de dominio
> que opera sobre los datos del Expediente y del Documento IA. Su diseño detallado
> está en CF-030, CF-031 y CF-032.

### 6.2 Flujo

```
Expediente en EnRevisionPITR
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ 1. Extracción de variables CE3X del certificado original    │
│                                                              │
│    Origen: Documento IA (CERTIFICADO_ORIGINAL)               │
│    Destino: Expediente (especificacionCertificado)           │
│                                                              │
│    En V1: El AT introduce manualmente las variables.         │
│    Futuro: Extracción automática mediante OCR/IA.            │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. Evaluación por variable CE3X                              │
│                                                              │
│    Para cada variable:                                       │
│    - Buscar evidencia en documentos y fotografías            │
│    - Aplicar reglas de inferencia (CF-030)                   │
│    - Asignar nivel de confianza individual (0-100)           │
│    - Detectar contradicciones                                │
│                                                              │
│    Output: nivelConfianzaPorVariable                         │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. Cálculo de confianza global                               │
│                                                              │
│    nivelConfianzaGlobal = media ponderada de                 │
│                          nivelConfianzaPorVariable           │
│                                                              │
│    Invariante: I-EX-06 (consistencia de confianza)          │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ 4. Generación de informe PITR                                │
│                                                              │
│    Contenido:                                                │
│    - Resumen de confianza global                             │
│    - Variables con baja confianza (< 80%)                    │
│    - Contradicciones detectadas (si las hay)                 │
│    - Recomendación para revisión manual                      │
│                                                              │
│    El informe se almacena en:                                │
│    Documento IA (tipo: INFORME_IA)                           │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ 5. Decisión de ruta                                          │
│                                                              │
│    ┌──────────────────────────────────────┐                  │
│    │ nivelConfianzaGlobal ≥ 80%           │                  │
│    │ Y sin contradicciones graves o        │                  │
│    │ críticas sin resolver                 │                  │
│    ├──────────────────────────────────────┤                  │
│    │ SÍ → Auditado                        │                  │
│    │ NO → RevisionManual                  │                  │
│    └──────────────────────────────────────┘                  │
│                                                              │
│    Eventos emitidos:                                         │
│    - PITRAnalisisCompletado (siempre)                       │
│    - PITRConfianzaAlta (si ≥ 80%)                           │
│    - PITRConfianzaBaja (si < 80%)                           │
└──────────────────────────────────────────────────────────────┘
```

### 6.3 Agregado responsable

| Paso | Agregado/Servicio | Acción |
|------|-------------------|--------|
| Extracción de variables CE3X | **AT** (V1 manual) / **Motor PITR** (futuro) | Introduce o extrae variables en Expediente |
| Evaluación por variable | **Motor PITR** | Aplica reglas de CF-030. Escribe nivelConfianzaPorVariable en Expediente |
| Cálculo de confianza global | **Motor PITR** | Calcula media ponderada. Escribe nivelConfianzaGlobal en Expediente |
| Detección de contradicciones | **Motor PITR** | Aplica matriz de CF-030 §18. Escribe contradicciones en Expediente |
| Generación de informe | **Motor PITR** | Genera texto informePITR. Almacena en Expediente y Documento IA |
| Decisión de ruta | **Expediente** | Evalúa confianza y contradicciones. Decide transición |

### 6.4 Información intercambiada

| Origen | Destino | Datos |
|--------|---------|-------|
| Expediente (vars CE3X) | Motor PITR | variablesCE3X del certificado |
| Documento IA | Motor PITR | Evidencias (urls, tipo), metadatos_ia |
| Motor PITR | Expediente | nivelConfianzaPorVariable, nivelConfianzaGlobal, contradicciones, informePITR |
| Motor PITR | Documento IA | Informe PITR generado (INFORME_IA) |

### 6.5 Estados afectados

| Agregado | Estado anterior | Estado nuevo |
|----------|----------------|--------------|
| Expediente | EnRevisionPITR | **Auditado** (confianza ≥ 80% y sin contradicciones críticas) |
| Expediente | EnRevisionPITR | **RevisionManual** (confianza < 80% o contradicciones críticas) |
| Documento IA | — | Nuevo documento tipo INFORME_IA, estado_ia = COMPLETADO |
| Expediente (auditoría PITR) | — | nivelConfianzaGlobal, nivelConfianzaPorVariable, contradicciones establecidos |

### 6.6 Validaciones

| # | Validación | ¿Bloqueante? | ¿Quién valida? |
|---|-----------|-------------|----------------|
| V-PITR-01 | Variables CE3X completas (I-EX-09) | Sí | Expediente |
| V-PITR-02 | nivelConfianzaGlobal = media ponderada de variables (I-EX-06) | Sí | Motor PITR |
| V-PITR-03 | Cada nivelConfianzaPorVariable entre 0 y 100 | Sí | Motor PITR |
| V-PITR-04 | Documento CERTIFICADO_ORIGINAL existe y es accesible | Sí | Motor PITR |
| V-PITR-05 | Contradicciones tienen tipo y gravedad válidos | Sí | Motor PITR |
| V-PITR-06 | Informe PITR no vacío | Sí | Motor PITR |

### 6.7 Gestión de fallos

| Fallo | Acción | ¿Recuperable? |
|-------|--------|--------------|
| Variables CE3X incompletas | No iniciar análisis. Notificar al AT | Sí (completar variables) |
| Error en extracción de datos del certificado | Marcar Documento IA como ERROR. Notificar al AT | Sí (revisar certificado) |
| Fallo en motor PITR (error interno) | Transición a RevisionManual automáticamente. Registrar error | Sí (reintento manual) |
| Timeout en procesamiento | Cancelar análisis. Transición a RevisionManual | Sí |
| Confianza global indeterminada (demasiadas variables sin datos) | Transición a RevisionManual con alerta | Sí |

### 6.8 Manual vs. Automatizado en V1

| Paso | V1 | Futuro |
|------|-----|--------|
| Extracción de variables CE3X del certificado | **Manual** (AT introduce datos) | Automático (OCR + IA) |
| Evaluación por variable con reglas de CF-030 | **Manual** (AT aplica criterio) | Semiautomático (reglas + IA) |
| Cálculo de confianza global | Automático | — |
| Detección de contradicciones | **Manual** (AT identifica) | Automático (matriz CF-030) |
| Generación de informe PITR | **Manual** (AT redacta) | Automático (plantillas + IA) |
| Decisión de ruta (Auditado vs. RevisionManual) | Automático basado en confianza | — |

---

## 7. Fase 4 — Revisión manual del Arquitecto Técnico

### 7.1 Descripción

Cuando el análisis PITR automático no alcanza la confianza suficiente, o cuando
existen contradicciones críticas, el expediente pasa a revisión manual por un
Arquitecto Técnico.

> Esta fase también ocurre SIEMPRE cuando el expediente alcanza el estado `Auditado`
> con confianza ≥ 80%, pero en ese caso la revisión se limita a validación del informe.
> En V1, **todo expediente pasa por revisión manual**, incluso los de alta confianza.

### 7.2 Flujo

```
Expediente en RevisionManual (desde EnRevisionPITR)
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ AT revisa el expediente                                      │
│                                                              │
│ El AT tiene acceso a:                                        │
│  - Datos del Cliente (solo lectura)                          │
│  - Datos del Inmueble (solo lectura)                         │
│  - Certificado original (Documento IA)                       │
│  - Fotografías y documentación (Documento IA)                │
│  - Variables CE3X introducidas (Expediente)                  │
│  - Informe PITR generado (Expediente + Documento IA)         │
│  - Contradicciones detectadas (Expediente)                   │
│  - Niveles de confianza por variable (Expediente)            │
│                                                              │
│ Flujo de revisión (según CF-032):                            │
│  1. Verificar coherencia entre certificado y evidencias      │
│  2. Evaluar contradicciones detectadas                       │
│  3. Resolver o descartar contradicciones                     │
│  4. Validar o corregir variables CE3X                        │
│  5. Decidir resultado final                                  │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Decisión del AT                                              │
│                                                              │
│  ┌──────────────────────────────┐                            │
│  │ ¿El certificado es válido?   │                            │
│  ├──────────────────────────────┤                            │
│  │ SÍ → Aprobado               │                            │
│  │     Estado: Aprobado        │                            │
│  │     Evento:  AprobadoPorAT  │                            │
│  │                                                           │
│  │ NO → Rechazado              │                            │
│  │     Estado: Rechazado       │                            │
│  │     Evento:  RechazadoPorAT │                            │
│  │     Motivo:  texto obligatorio                            │
│  └──────────────────────────────┘                            │
│                                                              │
│  Si hay contradicciones sin resolver (I-EX-08):              │
│  No puede aprobar hasta resolverlas todas                    │
└──────────────────────────────────────────────────────────────┘
```

### 7.3 Agregado responsable

| Paso | Agregado | Acción |
|------|----------|--------|
| Visualización de datos del cliente | **Cliente** (solo lectura) | Provee datos al AT |
| Visualización de datos del inmueble | **Inmueble** (solo lectura) | Provee datos al AT |
| Visualización de documentos | **Documento IA** (solo lectura) | Provee URLs de documentos |
| Modificación de variables CE3X | **Expediente** | AT corrige variables si es necesario |
| Resolución de contradicciones | **Expediente** | AT resuelve contradicciones (cambia estado a `resuelta`) |
| Decisión final | **Expediente** | AT aprueba o rechaza. Cambia estado. |

### 7.4 Información intercambiada

| Origen | Destino | Datos |
|--------|---------|-------|
| Cliente (repo) | AT (UI) | nombre, email, teléfono (solo lectura) |
| Inmueble (repo) | AT (UI) | referencia catastral, dirección, tipo, superficie (solo lectura) |
| Documento IA (repo) | AT (UI) | URLs de certificado original, fotografías, informes |
| Expediente | AT (UI) | variablesCE3X, nivelConfianzaGlobal, contradicciones, informePITR |
| AT (UI) | Expediente | Variables corregidas, contradicciones resueltas, decisión (Aprobado/Rechazado) |

### 7.5 Estados afectados

| Agregado | Estado anterior | Estado nuevo |
|----------|----------------|--------------|
| Expediente | RevisionManual | **Aprobado** |
| Expediente | RevisionManual | **Rechazado** |
| Expediente | Auditado | **RevisionManual** (si el AT decide que necesita más revisión) |
| Expediente | Auditado | **Aprobado** (si el AT confirma sin cambios) |
| Expediente (contradicciones) | `detectada` / `en_resolución` | **`resuelta`** |
| Expediente (variables CE3X) | — | Posiblemente corregidas |

### 7.6 Validaciones

| # | Validación | ¿Bloqueante? | ¿Quién valida? |
|---|-----------|-------------|----------------|
| V-REV-01 | I-EX-08 (sin contradicciones sin resolver para aprobar) | Sí | Expediente |
| V-REV-02 | I-EX-09 (variables CE3X completas tras corrección) | Sí | Expediente |
| V-REV-03 | I-EX-06 (consistencia de confianza tras cambios) | Sí | Expediente |
| V-REV-04 | Motivo de rechazo obligatorio si estado = Rechazado | Sí | Expediente |
| V-REV-05 | AT que decide está asignado al expediente | Sí | Expediente |

### 7.7 Gestión de fallos

| Fallo | Acción | ¿Recuperable? |
|-------|--------|--------------|
| AT no puede resolver contradicciones | Deriva a otro AT o solicita más documentación | Sí (vuelve a PteDocumentación) |
| AT detecta que faltan datos críticos | Transición a PteDocumentación con solicitud de docs | Sí |
| AT no completa revisión en plazo | Reasignar a otro AT | Sí |
| AT rechaza pero cliente discrepa | Cliente puede solicitar reconsideración (nuevo expediente) | No en este expediente |

### 7.8 Manual vs. Automatizado en V1

| Paso | V1 | Futuro |
|------|-----|--------|
| Toda la revisión de calidad del certificado | **Manual** (AT) | Semiautomático con IA |
| Resolución de contradicciones | **Manual** (AT) | Automático con reglas avanzadas |
| Corrección de variables CE3X | **Manual** (AT) | Asistido por IA (sugerencias) |
| Decisión de aprobado/rechazado | **Manual** (AT) | Automático solo para confianza ≥ 95% |
| Verificación de I-EX-08, I-EX-09, I-EX-06 | Automático | — |

---

## 8. Fase 5 — Entrega del resultado

### 8.1 Descripción

Una vez aprobado (o rechazado), el expediente se cierra y se entrega el resultado
al cliente. En V1, la entrega incluye la generación del informe final.

### 8.2 Flujo

```
Expediente en Aprobado
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Generación de informe final                                  │
│                                                              │
│ Contenido del informe:                                       │
│  - Datos del expediente (código, fechas, AT asignado)        │
│  - Datos del cliente (nombre)                                │
│  - Datos del inmueble (dirección, ref.catastral)             │
│  - Certificado original analizado                            │
│  - Variables CE3X validadas                                  │
│  - Resultado: APROBADO / RECHAZADO                           │
│  - Nivel de confianza global                                 │
│  - Observaciones del AT                                      │
│                                                              │
│ El informe se almacena en:                                   │
│  - Documento IA (tipo: INFORME_FINAL)                        │
│  - estado_ia: COMPLETADO                                     │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Transición a Entregado                                       │
│                                                              │
│  Estado: Aprobado → Entregado                                │
│  Fecha de cierre: timestamp actual                           │
│                                                              │
│  Invariante: I-EX-05 (inmutabilidad post-entrega)           │
│  A partir de aquí solo se pueden añadir notas y anexos.      │
│                                                              │
│  Evento emitido: ExpedienteEntregado                         │
│  Datos: expediente_id, codigoExpediente, fecha_cierre,       │
│         resultado (aprobado/rechazado)                        │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Notificación al cliente                                      │
│                                                              │
│  - Email con resumen del resultado                           │
│  - Enlace para descargar el informe final                    │
│  - Enlace para ver el expediente en la plataforma            │
└──────────────────────────────────────────────────────────────┘
```

### 8.3 Agregado responsable

| Paso | Agregado | Acción |
|------|----------|--------|
| Generación de informe final | **Expediente** | Compila datos del resultado |
| Almacenamiento del informe | **Documento IA** | Guarda INFORME_FINAL asociado al expediente |
| Transición a Entregado | **Expediente** | Cambia estado, establece fecha de cierre |
| Notificación | **Sistema externo** | Envía email al cliente (infraestructura) |

### 8.4 Información intercambiada

| Origen | Destino | Datos |
|--------|---------|-------|
| Expediente | Documento IA | Contenido del informe final, expediente_id |
| Cliente (repo) | Sistema notificación | Email del cliente (solo lectura) |
| Inmueble (repo) | Informe final | Dirección, ref.catastral (solo lectura) |
| Expediente | Sistema histórico | Datos completos del expediente cerrado |

### 8.5 Estados afectados

| Agregado | Estado anterior | Estado nuevo |
|----------|----------------|--------------|
| Expediente | Aprobado | **Entregado** (terminal) |
| Expediente | Rechazado | **Devuelto** (terminal, pero puede reingresar) |
| Documento IA | — | Nuevo documento tipo INFORME_FINAL |

### 8.6 Validaciones

| # | Validación | ¿Bloqueante? | ¿Quién valida? |
|---|-----------|-------------|----------------|
| V-ENT-01 | Estado actual es Aprobado o Rechazado | Sí | Expediente |
| V-ENT-02 | I-EX-08 (sin contradicciones sin resolver) | Sí | Expediente |
| V-ENT-03 | Informe final generado correctamente | Sí | Expediente |
| V-ENT-04 | I-EX-05 (no modificar datos post-entrega) | Permanente | Expediente |

### 8.7 Gestión de fallos

| Fallo | Acción | ¿Recuperable? |
|-------|--------|--------------|
| Error al generar informe | Reintentar. Si persiste, notificar al AT | Sí |
| Error al almacenar en Documento IA | Reintentar. Si persiste, mantener estado Aprobado | Sí |
| Error en notificación al cliente | Reintentar. Registrar como pendiente | Sí |
| Intento de modificar expediente entregado | Rechazar (I-EX-05). No permitir operación | No |

### 8.8 Manual vs. Automatizado en V1

| Paso | V1 | Futuro |
|------|-----|--------|
| Generación de informe final | Automático (plantilla) | — |
| Almacenamiento del informe | Automático | — |
| Notificación al cliente | Automático (email) | Canales adicionales (WhatsApp, SMS) |
| Publicación en dashboards | Automático | — |
| Adición de notas/anexos post-entrega | **Manual** (AT) | — |

---

## 9. Fase de cancelación y rechazo

### 9.1 Cancelación voluntaria

El cliente puede cancelar el expediente en cualquier estado **no terminal**.

```
Estado actual → Cancelado
Motivo: texto proporcionado por el cliente (opcional)
Evento emitido: ExpedienteCancelado
```

**Validaciones:**
- V-CAN-01: Estado actual no es terminal (Entregado, Cancelado, RechazadoFaltaDatos, Devuelto)
- V-CAN-02: Quien solicita la cancelación es el cliente propietario del expediente

### 9.2 Rechazo por falta de documentación

Si el cliente no aporta la documentación mínima en el plazo establecido (30 días):

```
PteDocumentación → RechazadoFaltaDatos
Evento emitido: ExpedienteRechazadoFaltaDatos
```

**Fallos:**
- Si el cliente aporta documentación después del plazo, se requiere un nuevo expediente.
- El sistema debe enviar recordatorios automáticos antes de alcanzar el plazo.

### 9.3 Rechazado por el AT → Devuelto

Cuando el AT rechaza el certificado:

```
RevisionManual → Rechazado → Devuelto
Motivo: obligatorio
Evento emitido: ExpedienteDevuelto
```

El expediente en `Devuelto` no es técnicamente terminal: el cliente puede corregir
el certificado e iniciar un **nuevo expediente** referenciando al anterior.

### 9.4 Reactivación desde Devuelto

```
Nuevo expediente (con referencia al anterior Devuelto)
  │
  ├─ Mismo cliente
  ├─ Mismo inmueble
  ├─ Nuevo certificado corregido
  └─ Referencia a expediente_id anterior (para trazabilidad)
```

### 9.5 Estados terminales

| Estado | ¿Definitivo? | ¿Puede reingresar? |
|--------|-------------|-------------------|
| Entregado | Sí | No (mismo certificado ya auditado) |
| Cancelado | Sí | Sí (nuevo expediente) |
| RechazadoFaltaDatos | Sí | Sí (nuevo expediente con documentación completa) |
| Devuelto | No (véase 9.4) | Sí (nuevo expediente vinculado) |

---

## 10. Matriz de responsabilidades por agregado

### 10.1 Cliente

| Responsabilidad | Fase | ¿Solo lectura? |
|-----------------|------|----------------|
| Registro de nuevo cliente | 0 | No |
| Validación de existencia | 1 | Sí |
| Provisión de datos al AT | 4 | Sí |
| Notificación de resultado | 5 | No (destinatario) |

### 10.2 Inmueble

| Responsabilidad | Fase | ¿Solo lectura? |
|-----------------|------|----------------|
| Registro de nuevo inmueble | 0 | No |
| Validación de existencia | 1 | Sí |
| Verificación de titularidad | 0 | Sí |
| Provisión de datos al AT | 4 | Sí |

### 10.3 Expediente (coordinador del flujo)

| Responsabilidad | Fase | ¿Solo lectura? |
|-----------------|------|----------------|
| Creación del expediente | 1 | No |
| Máquina de estados (todas las transiciones) | 1-5 | No |
| Validación I-EX-01 a I-EX-10 | 1-5 | No |
| Almacenamiento de variables CE3X | 3 | No |
| Almacenamiento de confianza y contradicciones | 3 | No |
| Resolución de contradicciones | 4 | No |
| Decisión final (aprobado/rechazado) | 4 | No |
| Cierre del expediente | 5 | No |

### 10.4 Documento IA

| Responsabilidad | Fase | ¿Solo lectura? |
|-----------------|------|----------------|
| Recepción y validación de documentos subidos | 2 | No |
| Almacenamiento de certificado original | 2 | No |
| Almacenamiento de fotografías | 2 | No |
| Almacenamiento de informe PITR | 3 | No |
| Almacenamiento de informe final | 5 | No |
| Provisión de documentos al AT | 4 | Sí |

---

## 11. Mapa de eventos entre agregados

### 11.1 Eventos del agregado Cliente

| Evento | Emisor | Receptores | Fase |
|--------|--------|------------|------|
| `ClienteRegistrado` | Cliente | Expediente (validación), Sistema | 0 |
| `ClienteActualizado` | Cliente | Sistema | — |

### 11.2 Eventos del agregado Inmueble

| Evento | Emisor | Receptores | Fase |
|--------|--------|------------|------|
| `InmuebleRegistrado` | Inmueble | Expediente (validación), Sistema | 0 |
| `InmueblePropietarioCambiado` | Inmueble | Sistema | — |
| `InmuebleCaracteristicasActualizadas` | Inmueble | Sistema | — |

### 11.3 Eventos del agregado Expediente

| Evento | Emisor | Receptores | Fase |
|--------|--------|------------|------|
| `ExpedienteCreado` | Expediente | Sistema, Documento IA (prepara recepción) | 1 |
| `ExpedienteDocumentacionCompleta` | Expediente | Motor PITR (inicia análisis) | 2 |
| `PITRAnalisisCompletado` | Motor PITR | Expediente (procesa resultado) | 3 |
| `PITRConfianzaAlta` | Motor PITR | Expediente (transición a Auditado) | 3 |
| `PITRConfianzaBaja` | Motor PITR | Expediente (transición a RevisionManual) | 3 |
| `AprobadoPorAT` | Expediente | Sistema, Documento IA (genera informe) | 4 |
| `RechazadoPorAT` | Expediente | Sistema (notifica al cliente) | 4 |
| `ExpedienteEntregado` | Expediente | Sistema (notifica al cliente) | 5 |
| `ExpedienteCancelado` | Expediente | Sistema | — |
| `ExpedienteRechazadoFaltaDatos` | Expediente | Sistema | — |
| `ExpedienteDevuelto` | Expediente | Sistema | — |

### 11.4 Eventos del agregado Documento IA

| Evento | Emisor | Receptores | Fase |
|--------|--------|------------|------|
| `DocumentoSubido` | Documento IA | Expediente (actualiza conteo) | 2 |
| `DocumentoValidado` | Documento IA | Expediente (actualiza estado de documentación) | 2 |
| `DocumentoError` | Documento IA | Expediente, Sistema (notifica al cliente) | 2 |
| `InformePITRGenerado` | Motor PITR | Documento IA (almacena informe) | 3 |
| `InformeFinalGenerado` | Documento IA | Expediente (confirma entrega) | 5 |

---

## 12. Validaciones por paso

### 12.1 Validaciones globales (aplican siempre)

| # | Validación | Descripción | ¿Quién? |
|---|-----------|-------------|---------|
| V-GL-01 | Soft Delete | Ninguna operación puede eliminar físicamente un registro | Todos |
| V-GL-02 | Optimistic Locking | Toda actualización debe verificar `version` | Todos |
| V-GL-03 | RLS | Solo el propietario del expediente o el AT pueden acceder | Infraestructura |

### 12.2 Validaciones por transición de estado

| Transición | Validaciones |
|------------|-------------|
| Solicitud → PteDocumentación | V-CR-01, V-CR-02, V-CR-03, V-CR-04, V-CR-05, I-EX-01, I-EX-02, I-EX-03 |
| PteDocumentación → EnRevisionPITR | V-DOC-01, V-DOC-04, I-EX-10 |
| EnRevisionPITR → Auditado | V-PITR-01, V-PITR-02, V-PITR-03, V-PITR-04, V-PITR-05, V-PITR-06, I-EX-06, I-EX-09 |
| EnRevisionPITR → RevisionManual | V-PITR-01, V-PITR-06 (fallo parcial) |
| Auditado → RevisionManual | Decisión del AT |
| Auditado → Aprobado | V-REV-01, V-REV-02, V-REV-03, I-EX-08, I-EX-09 |
| RevisionManual → Aprobado | V-REV-01, V-REV-02, V-REV-03, V-REV-05, I-EX-08, I-EX-09 |
| RevisionManual → Rechazado | V-REV-04 |
| Aprobado → Entregado | V-ENT-01, V-ENT-02, V-ENT-03, I-EX-08 |
| Rechazado → Devuelto | V-ENT-01 (automático tras Rechazado) |
| Cualquiera → Cancelado | V-CAN-01, V-CAN-02 |
| PteDocumentación → RechazadoFaltaDatos | Plazo de 30 días sin documentación mínima |
| Cualquiera (post-entrega) → modificación | I-EX-05 (denegado) |

---

## 13. Gestión de fallos

### 13.1 Fallos por transición

```
┌─────────────────────────────────────────────────────────────────┐
│                      GESTIÓN DE FALLOS                           │
│                                                                 │
│  Cada transición de estado puede fallar por:                    │
│                                                                 │
│  1. Error de validación (V-xxx)                                 │
│     → El sistema rechaza la transición                          │
│     → Se devuelve un mensaje de error específico                │
│     → El expediente permanece en el estado actual               │
│     → Se registra el intento fallido en el historial            │
│                                                                 │
│  2. Error de infraestructura (BD, storage, red)                 │
│     → Se reintenta la operación (hasta 3 veces)                 │
│     → Si persiste, se registra el error y se notifica al admin  │
│     → El expediente permanece en el estado actual               │
│                                                                 │
│  3. Error de integridad (optimistic locking)                    │
│     → Se informa al usuario de que los datos han cambiado       │
│     → Se solicita recargar y reintentar                         │
│                                                                 │
│  4. Timeout en procesamiento PITR                               │
│     → Se transiciona automáticamente a RevisionManual           │
│     → Se registra el timeout en el expediente                   │
│     → El AT decide si reintentar o proceder manualmente         │
└─────────────────────────────────────────────────────────────────┘
```

### 13.2 Fallos en el flujo PITR

Si el motor PITR no puede completar el análisis (por error interno, timeout o
datos insuficientes), el sistema debe:

1. Registrar el error en el expediente (campo `auditoríaPITR`)
2. Transicionar a `RevisionManual` automáticamente
3. Notificar al AT asignado con el detalle del error
4. El AT puede decidir:
   - Reintentar el análisis automático
   - Proceder con revisión manual completa
   - Solicitar más documentación (vuelve a PteDocumentación)

### 13.3 Recuperación de estados

| Estado de error | ¿Recuperación automática? | Acción de recuperación |
|-----------------|--------------------------|------------------------|
| Error en subida de documento | No (requiere re-subida del cliente) | Notificar al cliente |
| Error en validación de documento | No (requiere re-subida) | Notificar al cliente |
| Timeout PITR | Sí (→ RevisionManual) | AT decide siguiente paso |
| Error de almacenamiento | Sí (reintento 3x) | Si persiste, notificar admin |
| Conflicto de versión | No (requiere recarga) | Informar al usuario |
| Error de notificación | Sí (reintento 3x) | Si persiste, registrar pendiente |

---

## 14. Manual vs. Automatizado en V1

### 14.1 Resumen por fase

| Fase | Total pasos | Automáticos V1 | Manuales V1 | Futuro automático |
|------|-------------|----------------|-------------|-------------------|
| **0 — Pre-creación** | 6 | 4 (67%) | 2 (33%) | 2 |
| **1 — Creación** | 4 | 3 (75%) | 1 (25%) | 1 |
| **2 — Documentación** | 6 | 4 (67%) | 2 (33%) | 2 |
| **3 — Análisis PITR** | 6 | 2 (33%) | 4 (67%) | 5 |
| **4 — Revisión AT** | 6 | 1 (17%) | 5 (83%) | 3 |
| **5 — Entrega** | 4 | 3 (75%) | 1 (25%) | 0 |
| **Cancelación/Rechazo** | 3 | 3 (100%) | 0 (0%) | 0 |

### 14.2 Mapa completo manual vs. automático

| Paso | V1 | Automatización futura | Prioridad futura |
|------|-----|----------------------|------------------|
| **Búsqueda de cliente** | Automático | — | — |
| **Registro de cliente** | Automático | — | — |
| **Validación de datos del cliente** | Manual | Documentación automática | Alta |
| **Búsqueda de inmueble** | Automático | — | — |
| **Registro de inmueble** | Automático | — | — |
| **Verificación de titularidad** | Manual | Catastro online | Alta |
| **Creación de expediente** | Automático | — | — |
| **Asignación de AT** | Manual | Round-robin por carga | Media |
| **Subida de documentos** | Manual (cliente) | — | — |
| **Validación de formato/tamaño** | Automático | — | — |
| **Verificación documentación mínima** | Automático | — | — |
| **Validación de que el PDF es CE3X** | Manual | OCR + IA | Alta |
| **Extracción de variables CE3X** | Manual | OCR + IA | Crítica |
| **Evaluación por variable** | Manual | Reglas + IA | Alta |
| **Cálculo de confianza global** | Automático | — | — |
| **Detección de contradicciones** | Manual | Matriz CF-030 | Alta |
| **Generación de informe PITR** | Manual | Plantillas + IA | Media |
| **Decisión de ruta (confianza)** | Automático | — | — |
| **Revisión de calidad del certificado** | Manual | IA asistida | Alta |
| **Resolución de contradicciones** | Manual | Reglas avanzadas | Media |
| **Corrección de variables CE3X** | Manual | Sugerencias IA | Media |
| **Decisión aprobado/rechazado** | Manual | Solo para ≥ 95% | Media |
| **Generación de informe final** | Automático | — | — |
| **Almacenamiento de informe** | Automático | — | — |
| **Notificación al cliente** | Automático | — | — |
| **Cancelación por cliente** | Automático | — | — |
| **Rechazo por falta de docs** | Automático | — | — |
| **Reactivación desde Devuelto** | Automático | — | — |

### 14.3 Criterios para prioridad de automatización futura

| Prioridad | Criterio | Ejemplos en el flujo |
|-----------|----------|---------------------|
| **Crítica** | Sin esto, el modelo de negocio no escala. Dependencia directa del ROI. | Extracción de variables CE3X |
| **Alta** | Reduce significativamente la carga manual del AT. Desbloquea capacidad. | Validación PDF, detección contradicciones, evaluación por variable |
| **Media** | Mejora la experiencia pero no es crítica para el MVP. | Asignación AT, informe PITR automático, sugerencias IA |

---

## 15. Glosario de la orquestación

| Término | Definición |
|---------|------------|
| **Orquestación** | Secuencia coordinada de interacciones entre agregados para completar un flujo de principio a fin. |
| **Agregado coordinador** | El Expediente, por ser el que contiene la máquina de estados que gobierna el flujo. |
| **Transición de estado** | Cambio de un estado a otro dentro de la máquina de estados del Expediente, gobernado por reglas de validación. |
| **Estado terminal** | Estado del Expediente tras el cual no pueden ocurrir más transiciones. |
| **Evento de dominio** | Notificación emitida por un agregado cuando ocurre un cambio de estado significativo. |
| **Motor PITR** | Servicio de dominio que aplica las reglas de conocimiento experto (CF-030) para evaluar variables CE3X. No es un agregado. |
| **Nivel de confianza** | Valor numérico (0-100) que indica la fiabilidad de una variable CE3X o del conjunto del análisis. |
| **Contradicción** | Discrepancia entre dos fuentes de evidencia (certificado vs. fotografía, dos fotografías, etc.). |
| **Documentación mínima** | Conjunto de documentos requerido para iniciar el análisis: certificado original + 3 fotografías mínimas. |
| **Datos de solo lectura** | Información de un agregado que otro agregado o actor puede consultar pero no modificar. |
| **Bloqueante** | Validación que, si falla, impide la transición de estado. |
| **Recuperable** | Fallo que puede resolverse sin perder el progreso del expediente. |

---

## CHANGELOG

| Fecha | Versión | Autor | Motivo |
|-------|---------|-------|--------|
| 04/07/2026 | 1.0.0 | Certilab Core Engineering | Creación inicial del documento de orquestación. |