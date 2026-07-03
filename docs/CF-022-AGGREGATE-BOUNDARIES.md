# CF-022 — Aggregate Boundaries

| Campo | Descripción |
|-------|-------------|
| **Código** | CF-022 |
| **Título** | Aggregate Boundaries — Límites definitivos de los agregados del dominio de Certilab |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-03 |
| **Autor** | Certilab® — Arquitectura de Dominio |
| **Propósito** | Definir con precisión quirúrgica los límites de cada agregado del dominio, sus raíces, invariantes, consistencia transaccional y reglas de referencia. Este documento es la referencia oficial para implementar todas las entidades restantes. |
| **Dependencias** | CF-020 (Data Model), CF-021 (Domain Model), CF-030 (PITR Expert Knowledge Engine), CF-031 (PITR Question Tree), CF-032 (Arquitecto Técnico Inspection Manual) |
| **Audiencia** | Arquitectos de software, desarrolladores del núcleo de dominio, implementadores de repositorios |
| **Lenguaje** | DDD estricto — términos del negocio con precisión de límites transaccionales |

---

## Índice

1. [Principios fundamentales de agregados](#1-principios-fundamentales-de-agregados)
2. [Agregado: Cliente](#2-agregado-cliente)
3. [Agregado: Inmueble](#3-agregado-inmueble)
4. [Agregado: Expediente](#4-agregado-expediente)
5. [Agregado: Organización](#5-agregado-organización)
6. [Agregado: Usuario](#6-agregado-usuario)
7. [Relaciones entre agregados](#7-relaciones-entre-agregados)
8. [Referencias permitidas vs. prohibidas](#8-referencias-permitidas-vs-prohibidas)
9. [Consistencia transaccional](#9-consistencia-transaccional)
10. [Invariantes por agregado](#10-invariantes-por-agregado)
11. [Eventos por agregado](#11-eventos-por-agregado)
12. [Información derivada](#12-información-derivada)
13. [Datos que nunca deben duplicarse](#13-datos-que-nunca-deben-duplicarse)
14. [Errores de modelado prohibidos](#14-errores-de-modelado-prohibidos)
15. [Evolución V2](#15-evolución-v2)
16. [Evolución V3](#16-evolución-v3)

---

## 1. Principios fundamentales de agregados

### 1.1 Definición

Un **Agregado** es un clúster de objetos de dominio que se tratan como una unidad cohesionada. Cada agregado tiene:
- Una **raíz (Aggregate Root)**: la única entidad que puede ser referenciada desde fuera del agregado.
- Un **límite transaccional**: todo cambio dentro del agregado se completa en una única transacción.
- **Invariantes**: reglas que deben cumplirse siempre dentro del agregado.

### 1.2 Principios rectores de Certilab

| # | Principio | Explicación |
|---|-----------|-------------|
| P-01 | **Raíz única** | Cada agregado tiene exactamente una raíz. Nunca se referencian entidades internas de otro agregado. |
| P-02 | **Referencia por identidad** | Los agregados se referencian entre sí solo mediante el identificador de su raíz. Nunca por referencia directa a objetos en memoria. |
| P-03 | **Transacción única por agregado** | Una operación afecta exactamente un agregado. Si se necesitan cambios en múltiples agregados, se usan eventos de dominio para la consistencia eventual. |
| P-04 | **Inmutabilidad del pasado** | Los eventos históricos y registros de cambios de estado son inmutables. Solo se añaden, nunca se modifican ni eliminan. |
| P-05 | **Ownership claro** | Cada dato pertenece a exactamente un agregado. Ningún dato se comparte entre agregados; si se necesita en otro agregado, se pasa como copia de solo lectura mediante eventos. |
| P-06 | **Información derivada fuera del agregado** | Los datos que se calculan a partir de otros (totales, resúmenes, proyecciones) no se almacenan dentro del agregado. Se calculan al vuelo o se mantienen en proyecciones separadas. |
| P-07 | **Catastro registral vs. dato transaccional** | El Inmueble es la entidad de registro (catastro). El Expediente es la entidad transaccional (proceso). Ninguna mezcla sus roles. |

### 1.3 Mapa de agregados

```
┌──────────────────────────────────────────────────────────────────┐
│                       MAPA DE AGREGADOS                          │
│                                                                  │
│  ┌─────────────────────┐     ┌─────────────────────┐            │
│  │     CLIENTE         │     │     INMUEBLE         │            │
│  │  Raíz: Cliente      │     │  Raíz: Inmueble      │            │
│  │  ID: cliente_id     │◄───►│  ID: inmueble_id     │            │
│  │  Owns: datos pers.  │     │  Owns: datos catast. │            │
│  └─────────────────────┘     └─────────────────────┘            │
│           │                            │                         │
│           │ (ref)                      │ (ref)                   │
│           ▼                            ▼                         │
│  ┌─────────────────────────────────────────────────────┐         │
│  │                   EXPEDIENTE                         │         │
│  │  Raíz: Expediente                                   │         │
│  │  ID: expediente_id                                  │         │
│  │  Owns: certificado, auditoría, evidencias,           │         │
│  │         preguntas, contradicciones, cambios_estado   │         │
│  └─────────────────────────────────────────────────────┘         │
│                                                                  │
│  ┌─────────────────────┐     ┌─────────────────────┐            │
│  │   ORGANIZACIÓN      │     │      USUARIO        │            │
│  │  Raíz: Organización │───►│  Raíz: Usuario       │            │
│  │  ID: organizacion_id│     │  ID: usuario_id      │            │
│  │  Owns: datos org.   │     │  Owns: datos prof.  │            │
│  └─────────────────────┘     └─────────────────────┘            │
└──────────────────────────────────────────────────────────────────┘

Nota: Las flechas indican "referencia por ID", no "contenencia".
Ningún agregado contiene a otro.
```

---

## 2. Agregado: Cliente

### 2.1 Identidad

- **Raíz:** `Cliente`
- **Identificador único:** `cliente_id`
- **Identificador de negocio:** `nif` (único en el sistema)

### 2.2 Límite del agregado

```
┌──────────────────────────────────────────────────────────┐
│                   AGREGADO CLIENTE                        │
│                                                          │
│  RAÍZ: Cliente                                           │
│  ├── datosDeIdentidad: nombre, nif, email, teléfono      │
│  ├── datosDeRepresentación: tipoPersona, razónSocial     │
│  ├── estado: [alta, activo, inactivo, baja]             │
│  ├── preferencias: idioma, canalNotificaciones          │
│  └── consentimientos:                                   │
│      ├── consentimientoRGPD (fecha, versión)            │
│      └── consentimientoServicio (fecha, versión)        │
│                                                          │
│  NO INCLUYE:                                             │
│  - Inmuebles del cliente (son otro agregado)             │
│  - Expedientes del cliente (son otro agregado)           │
│  - Historial de cambios de propietario                  │
└──────────────────────────────────────────────────────────┘
```

### 2.3 Ownership

| Dato | Propietario | ¿Se replica en otro agregado? |
|------|-------------|------------------------------|
| nombre, nif, email | Cliente | NO. Nunca se copian. El Expediente referencia por `cliente_id`. |
| teléfono | Cliente | NO. |
| tipo de persona | Cliente | NO. |
| consentimientos | Cliente | NO. Solo existen aquí. |
| estado | Cliente | NO. |

### 2.4 Invariantes

| # | Invariante | Descripción |
|---|------------|-------------|
| I-CL-01 | **NIF único** | No pueden existir dos clientes activos con el mismo NIF. Si un cliente inactivo se reactiva con un NIF existente, se fusionan. |
| I-CL-02 | **Consentimiento obligatorio** | Un cliente no puede tener estado `activo` sin tener registrado un consentimiento RGPD y de servicio vigentes. |
| I-CL-03 | **Email válido** | El email debe tener formato válido y ser verificable. Un cliente no puede iniciar un expediente sin email verificado. |
| I-CL-04 | **Inmutabilidad del NIF** | Una vez registrado, el NIF no puede modificarse. Si hay un error, se debe dar de baja al cliente y crear uno nuevo. |
| I-CL-05 | **Baja conserva histórico** | Un cliente en estado `baja` conserva su identificador. No se elimina ningún registro, solo se anonimizan los datos personales tras el periodo legal de retención. |

### 2.5 Eventos emitidos

| Evento | Cuándo se emite | Datos portados |
|--------|-----------------|----------------|
| `ClienteRegistrado` | Tras crear un nuevo cliente | cliente_id, nif, nombre, email |
| `ClienteVerificado` | Tras verificar la identidad del cliente | cliente_id, método_verificación, timestamp |
| `ClienteConsentimientoActualizado` | Al registrar o renovar consentimiento | cliente_id, tipo_consentimiento, versión, fecha |
| `ClienteEstadoCambiado` | Al cambiar de estado | cliente_id, estado_anterior, estado_nuevo, motivo |
| `ClienteDatosActualizados` | Al modificar datos no sensibles | cliente_id, campos_actualizados |
| `ClienteBajaSolicitada` | El cliente solicita la baja RGPD | cliente_id, fecha_solicitud, fecha_anonymización_prevista |

---

## 3. Agregado: Inmueble

### 3.1 Identidad

- **Raíz:** `Inmueble`
- **Identificador único:** `inmueble_id`
- **Identificador de negocio:** `referencia_catastral` (único en el sistema)

### 3.2 Límite del agregado

```
┌──────────────────────────────────────────────────────────┐
│                  AGREGADO INMUEBLE                        │
│                                                          │
│  RAÍZ: Inmueble                                          │
│  ├── datosCatastrales: referencia, dirección,            │
│  │   municipio, provincia, códigoPostal, coordenadas     │
│  ├── datosConstructivos:                                │
│  │   ├── añoConstrucción                                │
│  │   ├── tipoInmueble (vivienda, local, edificio)       │
│  │   ├── superficieConstruida                           │
│  │   └── características: númeroPlantas,                │
│  │       orientación, tipoCubierta, tipoFachada         │
│  ├── estado: [registro, activo, histórico]              │
│  ├── propietarioActualId: cliente_id (referencia)       │
│  └── eventosHistoricos (inmutable):                    │
│      ├── cambiosDePropietario (colección)               │
│      └── cambiosDeCaracterísticas (colección)           │
│                                                          │
│  NO INCLUYE:                                             │
│  - Datos personales del propietario (están en Cliente)   │
│  - Certificados (están en Expediente)                    │
│  - Auditorías (están en Expediente)                      │
│  - Expedientes (son otro agregado)                       │
└──────────────────────────────────────────────────────────┘
```

### 3.3 Ownership

| Dato | Propietario | ¿Se replica en otro agregado? |
|------|-------------|------------------------------|
| referencia catastral | Inmueble | NO. Es la clave de negocio única. |
| dirección, municipio, provincia | Inmueble | NO. |
| año de construcción | Inmueble | NO. |
| tipo de inmueble | Inmueble | NO. |
| superficie | Inmueble | NO. |
| propietarioActualId | Inmueble | Es una referencia por ID al agregado Cliente. Nunca se copian datos del cliente. |
| histórico de cambios de propietario | Inmueble | NO. Solo existe aquí. |
| histórico de cambios de características | Inmueble | NO. Solo existe aquí. |

### 3.4 Invariantes

| # | Invariante | Descripción |
|---|------------|-------------|
| I-IN-01 | **Referencia catastral única** | No pueden existir dos inmuebles activos con la misma referencia catastral. Si se detecta un duplicado, se unifican los registros. |
| I-IN-02 | **Propietario siempre referenciado** | El campo `propietarioActualId` debe referenciar a un Cliente existente en estado `activo`. Si el Cliente se da de baja, se debe actualizar el Inmueble. |
| I-IN-03 | **Inmutabilidad de eventos históricos** | Una vez registrado, un evento en `eventosHistoricos` no puede modificarse ni eliminarse. Solo se añaden nuevos. |
| I-IN-04 | **Dirección no vacía** | La dirección postal es obligatoria y no puede ser vacía. |
| I-IN-05 | **Inmueble nunca se elimina** | Un inmueble puede pasar a estado `histórico` pero nunca se elimina físicamente. Su historial de certificaciones es permanente. |

### 3.5 Eventos emitidos

| Evento | Cuándo se emite | Datos portados |
|--------|-----------------|----------------|
| `InmuebleRegistrado` | Tras crear un nuevo inmueble | inmueble_id, referencia_catastral, dirección, cliente_id |
| `InmueblePropietarioCambiado` | Al registrar un cambio de propietario | inmueble_id, cliente_anterior_id, cliente_nuevo_id, fecha_cambio |
| `InmuebleCaracteristicasActualizadas` | Al modificar datos constructivos (ej. tras auditoría que detecta reforma) | inmueble_id, campos_actualizados, origen (auditoría_id) |
| `InmuebleEstadoCambiado` | Al pasar a histórico o volver a activo | inmueble_id, estado_anterior, estado_nuevo, motivo |
| `InmuebleDireccionActualizada` | Al corregir la dirección | inmueble_id, dirección_anterior, dirección_nueva |

---

## 4. Agregado: Expediente

### 4.1 Identidad

- **Raíz:** `Expediente`
- **Identificador único:** `expediente_id`
- **Identificador de negocio:** `codigoExpediente` (generado como EXP-YYYY-NNNNNN)

### 4.2 Límite del agregado — ATENCIÓN: Este es el agregado más complejo

```
┌──────────────────────────────────────────────────────────────────┐
│                   AGREGADO EXPEDIENTE                             │
│                                                                  │
│  RAÍZ: Expediente                                                │
│  ├── datosGenerales:                                             │
│  │   ├── tipoServicio: [auditoría, segunda_certificación]        │
│  │   ├── clienteId (referencia a Cliente)                       │
│  │   ├── inmuebleId (referencia a Inmueble)                     │
│  │   ├── arquitecnicoId (referencia a Usuario)                  │
│  │   ├── estado: ver sección 4.3                                │
│  │   ├── tipoCertificado: [original, auditado]                   │
│  │   └── fechaCreación, fechaCierre                             │
│  │                                                               │
│  ├── ESPECIFICACIÓN DEL CERTIFICADO (Value Object):             │
│  │   ├── variablesCE3X: {                                       │
│  │   │   C1, C2, C3: cerramientos                               │
│  │   │   H1, H2, H3: huecos                                     │
│  │   │   F1, F2: instalaciones fijas                            │
│  │   │   G1: renovables                                         │
│  │   │   ... (según normativa vigente)                          │
│  │   │   }                                                      │
│  │   ├── calificaciónEnergética: letra (A-G)                    │
│  │   ├── emisionesCO2: número                                  │
│  │   ├── técnicoEmisor: nombre, nif, nº_registro               │
│  │   ├── fechaEmisión, fechaValidez                             │
│  │   └── documentoOriginalUrl (enlace al PDF original)          │
│  │                                                               │
│  ├── AUDITORÍA PITR (Aggregate Entity interna):                 │
│  │   ├── estadoAuditoría                                        │
│  │   ├── nivelConfianzaGlobal (0-100)                           │
│  │   ├── nivelConfianzaPorVariable (mapa)                       │
│  │   ├── evidencias (colección):                                │
│  │   │   ├── evidenciaId (local al agregado)                    │
│  │   │   ├── codigoCatalogo (F-001, H-002, ...)                 │
│  │   │   ├── tipo: [fotografía, documento]                      │
│  │   │   ├── urlEvidencia                                       │
│  │   │   ├── variablesAfectadas (lista)                        │
│  │   │   ├── nivelConfianzaParcial (0-100)                      │
│  │   │   └── metadatosExtracción (json)                        │
│  │   ├── preguntas (colección):                                 │
│  │   │   ├── preguntaId (local al agregado)                     │
│  │   │   ├── codigoPregunta (ref. al árbol CF-031)              │
│  │   │   ├── respuesta (texto o selección)                      │
│  │   │   ├── confianzaRespuesta (0-100)                        │
│  │   │   └── timestamp                                         │
│  │   ├── contradicciones (colección):                           │
│  │   │   ├── contradiccionId (local al agregado)                │
│  │   │   ├── tipo: [evidencia-evidencia, evidencia-certificado] │
│  │   │   ├── gravedad: [leve, media, grave, crítica]           │
│  │   │   ├── variableCE3XAfectada                              │
│  │   │   ├── descripción                                       │
│  │   │   ├── estado: [detectada, en_resolución, resuelta]      │
│  │   │   ├── resolucion: texto (si aplica)                     │
│  │   │   └── resueltaPor: [sistema, arquitecnico_id]           │
│  │   └── informePITR: texto (generado al completar)            │
│  │                                                               │
│  ├── HISTORIAL DE CAMBIOS DE ESTADO (inmutable):               │
│  │   ├── cambioId (secuencial)                                  │
│  │   ├── estadoAnterior                                        │
│  │   ├── estadoNuevo                                           │
│  │   ├── timestamp                                             │
│  │   ├── usuarioId (quién realizó el cambio)                   │
│  │   └── motivo                                                │
│  │                                                               │
│  └── NOTAS Y ANEXOS (solo post-entrega):                       │
│      ├── notaId (secuencial)                                    │
│      ├── contenido                                             │
│      ├── fecha                                                 │
│      └── usuarioId                                             │
│                                                                  │
│  NO INCLUYE:                                                     │
│  - Datos del cliente (están en Cliente)                         │
│  - Datos del inmueble (están en Inmueble)                       │
│  - Datos del usuario (están en Usuario)                         │
│  - Catálogo de preguntas PITR (es un catálogo global)          │
└──────────────────────────────────────────────────────────────────┘
```

### 4.3 Estados del Expediente

```
[Solicitud] ──> [PteDocumentación] ──> [EnRevisionPITR] ──> [Auditado] ──> [Entregado]
       │              │                       │
       ▼              ▼                       ▼
 [Cancelado]    [RechazadoFaltaDatos]    [RevisionManual]
                                             │
                                        ┌────┴────┐
                                        ▼         ▼
                                   [Aprobado] [Rechazado]
                                        │         │
                                        ▼         ▼
                                   [Entregado] [Devuelto]
```

| Estado | Descripción | ¿Transiciona automáticamente? |
|--------|-------------|-------------------------------|
| Solicitud | Creado con datos mínimos del cliente e inmueble | Sí → PteDocumentación (si hay docs) |
| PteDocumentación | Esperando certificado original y evidencias | No (espera acción del cliente) |
| EnRevisionPITR | Motor PITR procesando | Sí → Auditado o RevisionManual |
| Auditado | PITR completó análisis automático | Sí → RevisionManual (si confianza < 80%) |
| RevisionManual | Arquitecto Técnico revisando | No (espera decisión humana) |
| Aprobado | AT valida el resultado | Sí → Entregado |
| Rechazado | AT rechaza el certificado | Sí → Devuelto |
| Entregado | Certificado auditado entregado | Terminal |
| Cancelado | Cliente desiste o expira | Terminal |
| RechazadoFaltaDatos | Cliente no aportó documentación a tiempo | Terminal |
| Devuelto | Se devuelve al cliente para correcciones | No terminal (puede reingresar como nuevo) |

### 4.4 Ownership

| Dato | Propietario | ¿Se replica en otro agregado? |
|------|-------------|------------------------------|
| variables CE3X del certificado | Expediente | NO. Son datos específicos de este expediente. |
| calificación energética | Expediente | NO. Cada expediente produce su propia calificación. |
| evidencias fotográficas | Expediente | NO. Son específicas de esta auditoría. |
| preguntas respondidas | Expediente | NO. Son específicas de esta auditoría. |
| contradicciones | Expediente | NO. Son específicas de esta auditoría. |
| nivel de confianza | Expediente | NO. Se calcula dentro de este agregado. |
| historial de cambios de estado | Expediente | NO. Solo existe aquí. |
| notas y anexos | Expediente | NO. Solo existen aquí. |
| referencia al cliente | Expediente | Es `cliente_id`. Nunca se copian datos del cliente. |
| referencia al inmueble | Expediente | Es `inmueble_id`. Nunca se copian datos del inmueble. |
| referencia al AT | Expediente | Es `usuario_id`. Nunca se copian datos del usuario. |

### 4.5 Invariantes

| # | Invariante | Descripción |
|---|------------|-------------|
| I-EX-01 | **Cliente e inmueble existen** | clienteId e inmuebleId deben referenciar agregados existentes. Esta validación ocurre en el momento de creación. |
| I-EX-02 | **Un expediente activo por inmueble** | Un inmueble no puede tener más de un expediente en curso simultáneamente. Solo se permite abrir uno nuevo si el anterior está en estado terminal (Entregado, Cancelado, Rechazado, Devuelto). |
| I-EX-03 | **Asignación obligatoria** | Un expediente no puede pasar de Solicitud sin tener un arquitecto_técnico_id asignado. |
| I-EX-04 | **Orden de estados** | Las transiciones de estado deben seguir el grafo definido en 4.3. No se permiten saltos inválidos (ej. de Solicitud a Entregado sin pasar por revisión). |
| I-EX-05 | **Inmutabilidad post-entrega** | Una vez en estado Entregado, solo se pueden añadir notas y anexos. No se puede modificar ningún dato existente. |
| I-EX-06 | **Consistencia de confianza** | nivelConfianzaGlobal debe ser la media ponderada de los nivelConfianzaPorVariable. No puede haber discrepancia entre el valor global y el cálculo a partir de las variables. |
| I-EX-07 | **Evidencia no modificable tras procesada** | Una vez que una evidencia ha sido analizada (tiene nivelConfianzaParcial), no puede modificarse ni eliminarse. Solo se puede añadir nueva evidencia. |
| I-EX-08 | **Contradicción requiere resolución** | Un expediente no puede pasar a Entregado si existe alguna contradicción en estado `detectada` o `en_resolución`. Todas deben estar `resueltas`. |
| I-EX-09 | **Variables CE3X completas** | Todas las variables CE3X requeridas por la normativa vigente deben tener un valor. Ninguna puede estar vacía. |
| I-EX-10 | **Documentación mínima** | Un expediente no puede pasar a EnRevisionPITR si no tiene al menos el certificado original cargado. |

---

## 5. Agregado: Organización

### 5.1 Identidad

- **Raíz:** `Organización`
- **Identificador único:** `organizacion_id`
- **Identificador de negocio:** `cif` (único en el sistema)

### 5.2 Límite del agregado

```
┌──────────────────────────────────────────────────────────┐
│                AGREGADO ORGANIZACIÓN                      │
│                                                          │
│  RAÍZ: Organización                                      │
│  ├── datosLegales: nombre, cif, direcciónFiscal         │
│  ├── estado: [registrada, activa, suspendida, cancelada]│
│  ├── configuración:                                     │
│  │   ├── capacidadMaximaAT (N expedientes por AT)       │
│  │   ├── flujoAsignacion: [automático, manual]         │
│  │   ├── umbralConfianzaAutomatico (80% por defecto)   │
│  │   └── logo, marca                                    │
│  └── usuariosActivos: contador (no la lista)            │
│                                                          │
│  NO INCLUYE:                                             │
│  - Usuarios (son otro agregado, referenciados por ID)   │
│  - Expedientes (son otro agregado)                      │
│  - Clientes (son otro agregado)                         │
└──────────────────────────────────────────────────────────┘
```

### 5.3 Ownership

| Dato | Propietario | ¿Se replica en otro agregado? |
|------|-------------|------------------------------|
| nombre, cif | Organización | NO. |
| dirección fiscal | Organización | NO. |
| configuración | Organización | NO. |
| estado | Organización | NO. |

### 5.4 Invariantes

| # | Invariante | Descripción |
|---|------------|-------------|
| I-OR-01 | **CIF único** | No pueden existir dos organizaciones activas con el mismo CIF. |
| I-OR-02 | **Capacidad máxima positiva** | capacidadMaximaAT debe ser un entero positivo ≥ 1. |
| I-OR-03 | **Umbral de confianza en rango** | umbralConfianzaAutomatico debe estar entre 50 y 100. |

### 5.5 Eventos emitidos

| Evento | Cuándo se emite | Datos portados |
|--------|-----------------|----------------|
| `OrganizacionRegistrada` | Tras crear una nueva organización | organizacion_id, nombre, cif |
| `OrganizacionEstadoCambiado` | Al cambiar de estado | organizacion_id, estado_anterior, estado_nuevo |
| `OrganizacionConfiguracionActualizada` | Al modificar parámetros de configuración | organizacion_id, campos_actualizados |

---

## 6. Agregado: Usuario

### 6.1 Identidad

- **Raíz:** `Usuario`
- **Identificador único:** `usuario_id`
- **Identificador de negocio:** `email` (único en el sistema)

### 6.2 Límite del agregado

```
┌──────────────────────────────────────────────────────────┐
│                  AGREGADO USUARIO                         │
│                                                          │
│  RAÍZ: Usuario                                           │
│  ├── datosPersonales: nombre, apellidos, email          │
│  ├── datosProfesionales:                                │
│  │   ├── perfil: [arquitecto_tecnico, revisor, admin]   │
│  │   ├── numeroColegiado (si aplica)                    │
│  │   └── especialidades (lista)                         │
│  ├── organizacionId (referencia)                        │
│  ├── estado: [invitado, activo, suspendido, baja]      │
│  ├── preferencias: idioma, notificaciones               │
│  └── expedientesActivos: contador (no la lista)         │
│                                                          │
│  NO INCLUYE:                                             │
│  - Datos de la organización (están en Organización)     │
│  - Expedientes asignados (están en Expediente)          │
│  - Credenciales de acceso (contexto de identidad)       │
└──────────────────────────────────────────────────────────┘
```

### 6.3 Ownership

| Dato | Propietario | ¿Se replica en otro agregado? |
|------|-------------|------------------------------|
| nombre, apellidos, email | Usuario | NO. |
| datos profesionales | Usuario | NO. |
| perfil / rol | Usuario | NO. |
| estado | Usuario | NO. |
| organizaciónId | Usuario | Es referencia al agregado Organización. |

### 6.4 Invariantes

| # | Invariante | Descripción |
|---|------------|-------------|
| I-US-01 | **Email único** | No pueden existir dos usuarios activos con el mismo email. |
| I-US-02 | **Pertenencia a organización** | Un usuario no puede estar en estado `activo` sin tener un `organizacionId` válido. |
| I-US-03 | **Perfil válido** | El perfil debe ser uno de los definidos: arquitecto_tecnico, revisor, admin. |
| I-US-04 | **Expedientes activos no negativos** | El contador expedientesActivos no puede ser negativo. |

### 6.5 Eventos emitidos

| Evento | Cuándo se emite | Datos portados |
|--------|-----------------|----------------|
| `UsuarioInvitado` | Al crear un nuevo usuario | usuario_id, email, organizacion_id |
| `UsuarioActivado` | Al completar el registro | usuario_id, email |
| `UsuarioEstadoCambiado` | Al cambiar de estado | usuario_id, estado_anterior, estado_nuevo |
| `UsuarioPerfilCambiado` | Al modificar el perfil profesional | usuario_id, perfil_anterior, perfil_nuevo |
| `UsuarioDatosActualizados` | Al modificar datos personales | usuario_id, campos_actualizados |
| `UsuarioBaja` | Al dar de baja | usuario_id, motivo |

---

## 7. Relaciones entre agregados

### 7.1 Diagrama de referencias (por ID, no por contenencia)

```
CLIENTE (cliente_id) ────────> EXPEDIENTE.clienteId
INMUEBLE (inmueble_id) ─────> EXPEDIENTE.inmuebleId
USUARIO (usuario_id) ───────> EXPEDIENTE.arquitectoTecnicoId
ORGANIZACION (organizacion_id) ────────> USUARIO.organizacionId
INMUEBLE.propietarioActualId <───────── CLIENTE (cliente_id)
```

**Importante:** Todas las relaciones son referencias débiles por ID. Ningún agregado contiene a otro. Las relaciones se resuelven mediante consultas al repositorio correspondiente, no mediante navegación directa de objetos.

### 7.2 Mapa de referencias

| Desde | Campo de referencia | Hacia | Tipo de referencia |
|-------|-------------------|-------|-------------------|
| Expediente | clienteId | Cliente | Por ID (débil) |
| Expediente | inmuebleId | Inmueble | Por ID (débil) |
| Expediente | arquitecnicoId | Usuario | Por ID (débil) |
| Usuario | organizacionId | Organización | Por ID (débil) |
| Inmueble | propietarioActualId | Cliente | Por ID (débil) |

### 7.3 Reglas de navegación

| # | Regla | Descripción |
|---|-------|-------------|
| RN-01 | **Navegación unidireccional** | Las referencias son siempre unidireccionales. Nunca se crean referencias inversas dentro del mismo agregado. Si se necesita la inversa, se consulta el repositorio correspondiente (ej. "dame los expedientes de este cliente" es una consulta al repositorio de Expedientes, no un campo en Cliente). |
| RN-02 | **Sin navegación entre agregados en memoria** | El código de dominio nunca debe cargar un agregado completo para navegar a otro. Si el servicio de aplicación necesita datos de múltiples agregados, los carga por separado y los combina. |
| RN-03 | **IDs como tipos primitivos** | Los IDs de referencia se almacenan como tipos primitivos (string, number), no como referencias a objetos de dominio. Esto previene la navegación accidental entre agregados. |
| RN-04 | **Validación de existencia en creación** | Al crear un agregado que referencia a otro, se debe validar que el ID referenciado existe. Esta validación se hace en el servicio de aplicación, no en el dominio. |

---

## 8. Referencias permitidas vs. prohibidas

### 8.1 Referencias PERMITIDAS (por ID únicamente)

| # | Referencia | Motivo |
|---|------------|--------|
| ✅ | Expediente → Cliente (clienteId) | Necesario para saber a quién pertenece el expediente. El ID es suficiente; no se necesitan datos del cliente dentro del expediente. |
| ✅ | Expediente → Inmueble (inmuebleId) | Necesario para saber qué inmueble se está certificando. Las características del inmueble no cambian durante la auditoría. |
| ✅ | Expediente → Usuario (arquitectoTecnicoId) | Necesario para saber qué AT está asignado. |
| ✅ | Usuario → Organización (organizacionId) | Necesario para saber a qué organización pertenece. |
| ✅ | Inmueble → Cliente (propietarioActualId) | Necesario para saber quién es el propietario actual del inmueble. |
| ✅ | Expediente → Expediente anterior (expedienteAnteriorId) | En caso de renovación, el nuevo expediente referencia al anterior. Es opcional. |

### 8.2 Referencias PROHIBIDAS

| # | Referencia | Motivo | Alternativa |
|---|------------|--------|-------------|
| ❌ | Cliente → Lista de Inmuebles | Rompe el límite del agregado Cliente. Los inmuebles son otro agregado. | Consultar al repositorio de Inmuebles por propietarioActualId. |
| ❌ | Cliente → Lista de Expedientes | Rompe el límite del agregado Cliente. Los expedientes son otro agregado. | Consultar al repositorio de Expedientes por clienteId. |
| ❌ | Inmueble → Lista de Expedientes | Rompe el límite del agregado Inmueble. | Consultar al repositorio de Expedientes por inmuebleId. |
| ❌ | Expediente → Datos del Cliente (nombre, email) | Duplicación de datos del cliente dentro del expediente. | Usar clienteId y resolver en la UI o servicio de aplicación. |
| ❌ | Expediente → Datos del Inmueble (dirección, referencia catastral) | Duplicación de datos catastrales dentro del expediente. | Usar inmuebleId y resolver cuando sea necesario. |
| ❌ | Expediente → Datos del Usuario (nombre, email) | Duplicación de datos del usuario. | Usar usuarioId y resolver. |
| ❌ | Organización → Lista de Usuarios | Rompe el límite del agregado Organización. | Consultar al repositorio de Usuarios por organizacionId. |
| ❌ | Cualquier agregado → Lista de Eventos de otro agregado | Los eventos son internos de cada agregado. | Escuchar los eventos publicados y construir proyecciones separadas. |
| ❌ | Cualquier agregado → Objeto completo de otro agregado | Nunca se debe navegar a otro agregado como subobjeto. | Siempre por ID. |
| ❌ | Expediente → Catálogo de preguntas PITR (como copia) | El catálogo es global y no debe duplicarse. | Referenciar por códigoPregunta y resolver desde el motor PITR. |

### 8.3 Excepción controlada: Información derivada en proyecciones

Se permiten **proyecciones de solo lectura** que combinen datos de múltiples agregados para consultas de UI o reporting. Estas proyecciones:
- NO son parte del modelo de dominio.
- Se actualizan mediante eventos (consistencia eventual).
- No tienen invariantes transaccionales.
- Se almacenan en tablas separadas marcadas como `read_model` o `materialized_view`.

Ejemplos permitidos:
- `vista_expediente_resumen`: combina datos del Expediente con nombre del cliente (proveniente del evento ClienteRegistrado) para la lista de expedientes.
- `vista_inmueble_historial`: combina datos del Inmueble con referencias a Expedientes para mostrar la línea temporal.

---

## 9. Consistencia transaccional

### 9.1 Transacciones por agregado

| Agregado | ¿Qué operaciones son transaccionales? | ¿Qué operaciones son de consistencia eventual? |
|----------|---------------------------------------|-----------------------------------------------|
| **Cliente** | Crear, actualizar datos, cambiar estado, registrar consentimiento | Notificar a otros agregados del cambio (mediante eventos) |
| **Inmueble** | Crear, actualizar datos catastrales, cambiar propietario, registrar evento histórico | Actualizar proyecciones de histórico de inmueble |
| **Expediente** | Crear, cambiar estado, añadir evidencia, procesar auditoría, resolver contradicción, aprobar/rechazar | Notificar a cliente, actualizar contadores del AT, generar factura (V2) |
| **Organización** | Crear, actualizar configuración, cambiar estado | Notificar a usuarios afectados |
| **Usuario** | Crear, actualizar perfil, cambiar estado | Actualizar cola de asignación de expedientes |

### 9.2 Reglas de consistencia

| # | Regla | Descripción |
|---|-------|-------------|
| TC-01 | **Una transacción = un agregado** | Ninguna operación de dominio modifica más de un agregado en la misma transacción. |
| TC-02 | **Consistencia fuerte intra-agregado** | Dentro de un agregado, la consistencia es inmediata (ACID). Si falla una parte, falla toda la operación. |
| TC-03 | **Consistencia eventual entre agregados** | Cuando una operación en un agregado debe reflejarse en otro, se utiliza un evento de dominio. El otro agregado se actualiza de forma asíncrona. |
| TC-04 | **Eventos como frontera transaccional** | La publicación de un evento ocurre dentro de la misma transacción que la operación que lo origina (outbox pattern o similar). Si la transacción falla, el evento no se publica. |
| TC-05 | **Tolerancia a duplicados** | Los consumidores de eventos deben ser idempotentes. Procesar el mismo evento dos veces debe producir el mismo resultado que procesarlo una vez. |

### 9.3 Ejemplos de flujos multi-agregado

#### Ejemplo 1: Nuevo expediente (afecta a Expediente, Cliente e Inmueble)

```
1. Crear Expediente (transacción 1)
   - Validar que clienteId e inmuebleId existen (consultas)
   - Crear el expediente en estado Solicitud
   - Publicar evento: ExpedienteSolicitado
   
2. (Consistencia eventual) Al recibir ExpedienteSolicitado:
   - Incrementar contador de expedientes activos del Cliente (proyección)
   - Marcar Inmueble como "con expediente en curso" (no necesario, se calcula)
```

#### Ejemplo 2: Aprobar expediente (afecta a Expediente y Usuario)

```
1. Aprobar Expediente (transacción 1)
   - Cambiar estado a Aprobado
   - Validar invariantes (todas contradicciones resueltas, etc.)
   - Publicar evento: ExpedienteAprobado
   
2. (Consistencia eventual) Al recibir ExpedienteAprobado:
   - Notificar al cliente (servicio externo)
   - Actualizar contador de expedientes activos del Usuario (si aplica)
```

#### Ejemplo 3: Cambio de propietario (afecta a Inmueble y Cliente)

```
1. Cambiar propietario en Inmueble (transacción 1)
   - Actualizar propietarioActualId
   - Añadir evento al histórico
   - Publicar evento: InmueblePropietarioCambiado
   
2. (Consistencia eventual) Al recibir InmueblePropietarioCambiado:
   - Actualizar proyección de inmuebles del nuevo propietario
   - Notificar al nuevo propietario
```

---

## 10. Invariantes por agregado

### 10.1 Resumen de invariantes

| Agregado | Invariantes | ¿Se validan siempre? |
|----------|-------------|----------------------|
| Cliente | I-CL-01 a I-CL-05 | Sí, en cada operación de escritura. |
| Inmueble | I-IN-01 a I-IN-05 | Sí, en cada operación de escritura. |
| Expediente | I-EX-01 a I-EX-10 | Sí, en cada operación de escritura. Las de estado y transición se validan en cada cambio de estado. |
| Organización | I-OR-01 a I-OR-03 | Sí, en cada operación de escritura. |
| Usuario | I-US-01 a I-US-04 | Sí, en cada operación de escritura. |

### 10.2 Invariantes transaccionales vs. de dominio

**Invariantes transaccionales** (se validan dentro de la transacción):
- Unicidad de IDs (cliente_id, inmueble_id, etc.)
- Referencias a IDs existentes (clienteId, inmuebleId, etc.)
- Orden de estados (I-EX-04)
- Completitud de datos requeridos
- Rangos numéricos válidos

**Invariantes de dominio** (se validan en el servicio de aplicación antes de llamar al agregado):
- Unicidad de NIF (I-CL-01): se consulta al repositorio antes de crear
- Un expediente activo por inmueble (I-EX-02): se consulta al repositorio antes de crear
- Unicidad de referencia catastral (I-IN-01): se consulta al repositorio antes de crear
- Email único (I-US-01): se consulta al repositorio antes de crear
- CIF único (I-OR-01): se consulta al repositorio antes de crear

---

## 11. Eventos por agregado

### 11.1 Matriz de eventos

| Agregado | Eventos que EMITE | Eventos que CONSUME (de otros agregados) |
|----------|-------------------|------------------------------------------|
| **Cliente** | ClienteRegistrado, ClienteVerificado, ClienteConsentimientoActualizado, ClienteEstadoCambiado, ClienteDatosActualizados, ClienteBajaSolicitada | — (ninguno, es raíz independiente) |
| **Inmueble** | InmuebleRegistrado, InmueblePropietarioCambiado, InmuebleCaracteristicasActualizadas, InmuebleEstadoCambiado, InmuebleDireccionActualizada | ExpedienteSolicitado (para saber que hay un nuevo expediente sobre este inmueble) |
| **Expediente** | ExpedienteSolicitado, ExpedienteAsignado, DocumentacionRecibida, AuditoriaIniciada, EvidenciaAnalizada, ContradiccionDetectada, ContradiccionResuelta, ConfianzaCalculada, RevisionManualRequerida, ExpedienteAprobado, ExpedienteRechazado, CertificadoEntregado, ExpedienteCancelado | ClienteVerificado (para permitir la entrega), InmueblePropietarioCambiado (para validar que el cliente sigue siendo propietario) |
| **Organización** | OrganizacionRegistrada, OrganizacionEstadoCambiado, OrganizacionConfiguracionActualizada | — (ninguno, es raíz independiente) |
| **Usuario** | UsuarioInvitado, UsuarioActivado, UsuarioEstadoCambiado, UsuarioPerfilCambiado, UsuarioDatosActualizados, UsuarioBaja | OrganizacionEstadoCambiado (para suspender usuarios si la organización se suspende) |

### 11.2 Suscripciones críticas

| Evento | Suscriptor | Acción |
|--------|------------|--------|
| InmueblePropietarioCambiado | Expediente | Si hay un expediente en curso cuyo clienteId ya no es el propietario actual, se debe notificar al AT para revisión. |
| ClienteBajaSolicitada | Expediente | Marcar los expedientes en curso del cliente para revisión. No se cancelan automáticamente, pero se alerta al AT. |
| UsuarioEstadoCambiado (a suspendido) | Expediente | Reasignar los expedientes activos del usuario a otro AT disponible. |
| ExpedienteAprobado | Cliente (vía UI/servicio) | Notificar al cliente que su certificado está listo. |

---

## 12. Información derivada

### 12.1 Datos que NUNCA se almacenan (siempre se calculan)

| Dato derivado | Origen | ¿Dónde se calcula? |
|---------------|--------|-------------------|
| **Número de expedientes activos de un cliente** | Consulta al repositorio de Expedientes filtrando por clienteId y estados no terminales | Servicio de aplicación. No se almacena en Cliente. |
| **Número de expedientes activos de un AT** | Consulta al repositorio de Expedientes filtrando por arquitecnicoId y estados no terminales | Servicio de aplicación. No se almacena en Usuario. |
| **Lista de inmuebles de un cliente** | Consulta al repositorio de Inmuebles filtrando por propietarioActualId | Servicio de aplicación o proyección. No se almacena en Cliente. |
| **Historial de expedientes de un inmueble** | Consulta al repositorio de Expedientes filtrando por inmuebleId | Proyección de solo lectura. No se almacena en Inmueble. |
| **Calificación energética final ponderada** | Cálculo a partir de las variables CE3X y sus niveles de confianza | Motor PITR (dentro del agregado Expediente). Se almacena como resultado dentro de la auditoría. |
| **Nivel de confianza global** | Media ponderada de niveles de confianza por variable | Motor PITR. Se almacena dentro de la auditoría. |
| **Tiempo medio de auditoría** | Cálculo a partir de fechas de creación y cierre de expedientes completados | Reporting / analytics. No pertenece al dominio transaccional. |

### 12.2 Datos que SÍ se almacenan pero son derivados dentro del agregado

| Dato | Agregado | Motivo |
|------|----------|--------|
| **nivelConfianzaGlobal** | Expediente (Auditoría PITR) | Es necesario para decidir si se requiere revisión manual. Se almacena para no recalcular cada vez. |
| **nivelConfianzaPorVariable** | Expediente (Auditoría PITR) | Es necesario para el informe de auditoría y para la trazabilidad. |
| **contadorExpedientesActivos** | Usuario | Se almacena como optimización para la asignación automática. Se actualiza mediante eventos. Es un contador, no una lista. |
| **contadorUsuariosActivos** | Organización | Se almacena como optimización para reporting. Se actualiza mediante eventos. |

**Regla:** Los contadores almacenados son aproximaciones. El valor real siempre se puede obtener consultando los repositorios. El contador almacenado es solo una optimización para consultas frecuentes.

---

## 13. Datos que nunca deben duplicarse

### 13.1 Lista negra de duplicación

| Dato | Aparece en | Prohibición |
|------|------------|-------------|
| **nombre del cliente** | Cliente | NO debe copiarse en Expediente, Inmueble ni ningún otro agregado. |
| **NIF del cliente** | Cliente | NO debe copiarse en ningún otro agregado. |
| **email del cliente** | Cliente | NO debe copiarse en ningún otro agregado. |
| **dirección del inmueble** | Inmueble | NO debe copiarse en Expediente. |
| **referencia catastral** | Inmueble | NO debe copiarse en Expediente. |
| **nombre del AT** | Usuario | NO debe copiarse en Expediente. |
| **cif de la organización** | Organización | NO debe copiarse en Usuario. |
| **código de pregunta PITR** | Catálogo global | NO debe copiarse dentro del Expediente. Se referencia por código. |
| **descripción de evidencia estándar** | Catálogo CF-030 | NO debe copiarse dentro de la evidencia. Se referencia por códigoCatalogo. |
| **calificación energética histórica** | Expediente anterior | NO debe copiarse en el nuevo Expediente. Se referencia y se recalcula. |

### 13.2 Excepciones controladas (datos que SÍ se duplican)

| Dato | ¿Dónde se duplica? | Motivo | Norma |
|------|--------------------|--------|-------|
| **clienteId** | Expediente (+ Inmueble.propietarioActualId) | Identificador, no dato personal. Es una referencia, no una copia de datos. | Siempre por ID, nunca datos del cliente. |
| **inmuebleId** | Expediente | Identificador de negocio. Es referencia. | Siempre por ID. |
| **usuarioId** | Expediente (AT asignado) | Identificador de negocio. Es referencia. | Siempre por ID. |
| **variables CE3X** | Certificado original vs. Certificado auditado | El certificado original es el que aporta el cliente; el auditado es el resultado de la verificación. | Se almacenan por separado porque el auditado puede diferir del original. No es duplicación, son dos versiones distintas. |

### 13.3 Principio de fuente única de verdad

```
┌──────────────────────────────────────────────────────────────────┐
│                  Single Source of Truth                          │
│                                                                  │
│  Dato                    Fuente Única          Almacenado en     │
│  ─────────────────────────────────────────────────────────────── │
│  nombre, nif, email      Cliente               Agregado Cliente  │
│  referencia catastral    Inmueble              Agregado Inmueble  │
│  dirección del inmueble  Inmueble              Agregado Inmueble  │
│  variables CE3X          Certificado original  Agregado Expediente│
│  evidencias fotográficas Auditoría PITR        Agregado Expediente│
│  contradicciones         Auditoría PITR        Agregado Expediente│
│  nivel de confianza      Auditoría PITR        Agregado Expediente│
│  nombre del AT           Usuario               Agregado Usuario   │
│  nombre de organización  Organización          Agregado Organización│
│  catálogo de preguntas   Motor PITR (global)   Servicio externo   │
│  catálogo de evidencias  CF-030 (global)       Servicio externo   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 14. Errores de modelado prohibidos

### 14.1 Errores fatales (bloquean la implementación)

| # | Error | Descripción | Consecuencia |
|---|-------|-------------|--------------|
| E-01 | **Cliente con lista de expedientes** | Almacenar una lista de IDs de expedientes dentro del agregado Cliente. | Inconsistencia transaccional. Dos agregados modificándose en la misma transacción. |
| E-02 | **Inmueble con lista de certificados** | Almacenar una lista de certificados dentro del Inmueble. | El certificado es parte del Expediente, no del Inmueble. |
| E-03 | **Expediente con datos del cliente copiados** | Almacenar nombre, NIF, email del cliente dentro del Expediente. | Datos desactualizados si el cliente cambia sus datos. Violación de Single Source of Truth. |
| E-04 | **Expediente con datos del inmueble copiados** | Almacenar dirección, referencia catastral dentro del Expediente. | Los mismos problemas de sincronización. |
| E-05 | **Expediente con datos del AT copiados** | Almacenar nombre, email del AT dentro del Expediente. | Los mismos problemas de sincronización. |
| E-06 | **Catálogo de preguntas PITR dentro del Expediente** | Duplicar el catálogo de preguntas para cada expediente. | Explosión de datos duplicados e imposibilidad de actualizar el catálogo centralmente. |
| E-07 | **Usuario con lista de expedientes asignados** | Almacenar una lista de expediente_ids dentro del Usuario. | Dos agregados modificándose en la misma transacción al reasignar expedientes. |
| E-08 | **Organización con lista de usuarios** | Almacenar una lista de usuario_ids dentro de la Organización. | Dos agregados modificándose en la misma transacción al dar de alta un usuario. |
| E-09 | **Eventos de dominio como parte del modelo de datos transaccional** | Almacenar eventos de dominio en la misma tabla que los agregados y usarlos como fuente de verdad para el estado actual. | Los eventos son para comunicación entre agregados. El estado actual del agregado se almacena en sus propias tablas. |
| E-10 | **Agregado gigante** | Expediente + Cliente + Inmueble + Usuario en un solo agregado. | Imposibilidad de escalar. Cualquier cambio en cualquier parte bloquea todo el agregado. Contención transaccional masiva. |

### 14.2 Errores graves (deben corregirse en revisión)

| # | Error | Descripción | Corrección |
|---|-------|-------------|------------|
| E-11 | **Referencia circular entre agregados** | Cliente → Inmueble → Expediente → Cliente. | Romper el ciclo. Las referencias deben ser unidireccionales en una jerarquía acíclica. |
| E-12 | **Actualización en cascada entre agregados** | Al modificar el nombre del cliente, actualizar todos los expedientes que lo referencian. | No. Los expedientes solo tienen clienteId. El nombre se resuelve al consultar. |
| E-13 | **Transacción que modifica dos agregados** | En una sola operación, modificar Expediente y Usuario. | Separar en dos transacciones con evento de por medio. |
| E-14 | **Copia de datos "por conveniencia"** | Copiar la dirección del inmueble en el Expediente "para no tener que consultar". | Violación del Single Source of Truth. Usar proyecciones de solo lectura si es necesario para rendimiento. |
| E-15 | **Negación de servicio por agregado gigante** | Un agregado que contiene tanta información que cualquier operación requiere cargar grandes volúmenes de datos. | Revisar los límites del agregado. Los históricos inmutables grandes deben externalizarse a proyecciones. |

### 14.3 Errores de concepto (formación del equipo)

| # | Error | Explicación |
|---|-------|-------------|
| E-16 | **Pensar que "agregado" es lo mismo que "tabla"** | Un agregado puede persistir en múltiples tablas (ej. Expediente → expedientes + evidencias + preguntas + contradicciones). El límite del agregado es conceptual, no físico. |
| E-17 | **Pensar que "referencia por ID" significa "JOIN en base de datos"** | Las referencias por ID son conceptuales. En la implementación, pueden resolverse con JOINs o con consultas separadas según el contexto. |
| E-18 | **Pensar que los eventos de dominio son "logs de auditoría"** | Los eventos de dominio son mecanismos de comunicación entre agregados, no registros de auditoría. El historial de cambios de estado del Expediente es un registro de auditoría interno del agregado. |
| E-19 | **Confundir "consistencia eventual" con "datos inconsistentes"** | La consistencia eventual significa que los datos serán consistentes en un plazo predecible. No significa que los datos puedan estar incorrectos permanentemente. |

---

## 15. Evolución V2

### 15.1 Nuevo agregado: Contrato

```
┌──────────────────────────────────────────────────────────┐
│              AGREGADO CONTRATO (V2)                      │
│                                                          │
│  RAÍZ: Contrato                                          │
│  ├── clienteId (referencia)                             │
│  ├── organizacionId (referencia, opcional)              │
│  ├── tipoContrato: [por_expediente, suscripción, marco] │
│  ├── estado: [borrador, activo, expirado, cancelado]    │
│  ├── fechaInicio, fechaFin                              │
│  ├── condiciones:                                       │
│  │   ├── maxExpedientes (si aplica)                    │
│  │   ├── precioPorExpediente                            │
│  │   ├── precioRevisionManual                           │
│  │   └── serviciosIncluidos (lista)                    │
│  └── facturasAsociadas (ids) — solo referencia          │
│                                                          │
│  NO INCLUYE:                                             │
│  - Datos del cliente (están en Cliente)                  │
│  - Expedientes (están en Expediente)                     │
│  - Facturas (serán otro agregado)                        │
└──────────────────────────────────────────────────────────┘
```

### 15.2 Nuevo agregado: Factura

```
┌──────────────────────────────────────────────────────────┐
│              AGREGADO FACTURA (V2)                       │
│                                                          │
│  RAÍZ: Factura                                           │
│  ├── contratoId (referencia)                            │
│  ├── expedienteId (referencia, opcional)                │
│  ├── clienteId (referencia)                             │
│  ├── numeroFactura (único, secuencial)                  │
│  ├── importe, iva, total                                │
│  ├── estado: [emitida, pagada, vencida, anulada]        │
│  └── fechaEmision, fechaVencimiento                     │
└──────────────────────────────────────────────────────────┘
```

### 15.3 Nuevas referencias V2

| Desde | Hacia | Tipo |
|-------|-------|------|
| Expediente | Contrato (contratoId) | Por ID |
| Contrato | Cliente (clienteId) | Por ID |
| Contrato | Organización (organizacionId) | Por ID (opcional) |
| Factura | Contrato (contratoId) | Por ID |
| Factura | Expediente (expedienteId) | Por ID (opcional) |
| Factura | Cliente (clienteId) | Por ID |

### 15.4 Nuevos eventos V2

| Evento | Agregado origen |
|--------|-----------------|
| ContratoCreado | Contrato |
| ContratoExpirado | Contrato |
| ContratoCancelado | Contrato |
| FacturaEmitida | Factura |
| FacturaPagada | Factura |
| FacturaVencida | Factura |

### 15.5 Nuevos invariantes V2

| # | Invariante | Agregado |
|---|------------|----------|
| I-CO-01 | **Contrato activo único por cliente** | Un cliente no puede tener más de un contrato activo del mismo tipo simultáneamente. |
| I-CO-02 | **Expedientes dentro del límite** | Un contrato por_expediente no puede exceder su maxExpedientes. |
| I-FA-01 | **Número de factura único** | Cada factura tiene un número secuencial único dentro de la organización. |

### 15.6 Nuevos datos que nunca deben duplicarse (V2)

- **Importe del contrato**: No debe copiarse en la Factura. La factura referencia al contrato y calcula su importe en el momento de emisión.
- **Datos del cliente en la factura**: No. Solo clienteId. El nombre y NIF se resuelven al generar el PDF.

---

## 16. Evolución V3

### 16.1 Nuevo agregado: Edificio

```
┌──────────────────────────────────────────────────────────┐
│              AGREGADO EDIFICIO (V3)                      │
│                                                          │
│  RAÍZ: Edificio                                          │
│  ├── datosIdentificacion: dirección, municipio,         │
│  │   referenciaCatastralEdificio                        │
│  ├── tipoEdificio: [residencial, comercial, mixto]      │
│  ├── añoConstrucción                                    │
│  ├── numeroInmuebles: contador (no lista)               │
│  └── estado: [registrado, activo, histórico]            │
│                                                          │
│  Referencia: Inmueble → Edificio (edificioId)           │
│  NO INCLUYE:                                             │
│  - Lista de inmuebles (se consulta por edificioId)      │
│  - Expedientes del edificio (son otro agregado)         │
└──────────────────────────────────────────────────────────┘
```

### 16.2 Nuevo agregado: Dispositivo IoT

```
┌──────────────────────────────────────────────────────────┐
│           AGREGADO DISPOSITIVO IOT (V3)                  │
│                                                          │
│  RAÍZ: DispositivoIoT                                    │
│  ├── inmuebleId (referencia)                            │
│  ├── tipoDispositivo: [temperatura, humedad, consumo]   │
│  ├── identificadorHardware (único)                      │
│  ├── estado: [activo, inactivo, error]                  │
│  └── ultimaLectura: valor, timestamp                    │
│                                                          │
│  NO INCLUYE:                                             │
│  - Historial de lecturas (sería otro agregado o BD de series temporales)│
│  - Datos del inmueble                                   │
└──────────────────────────────────────────────────────────┘
```

### 16.3 Nuevas referencias V3

| Desde | Hacia | Tipo |
|-------|-------|------|
| Inmueble | Edificio (edificioId) | Por ID (opcional) |
| DispositivoIoT | Inmueble (inmuebleId) | Por ID |
| Expediente | Edificio (edificioId) | Por ID (si el expediente es sobre el edificio completo) |

### 16.4 Nuevos eventos V3

| Evento | Agregado origen |
|--------|-----------------|
| EdificioCreado | Edificio |
| InmuebleVinculadoAEdificio | Edificio (o Inmueble, según diseño final) |
| DispositivoIoTVinculado | DispositivoIoT |
| LecturaIoTRecibida | DispositivoIoT (evento de integración, no de dominio puro) |
| CertificadorExternoAsignado | Expediente (nueva referencia a un nuevo tipo de Usuario) |

### 16.5 Nuevos invariantes V3

| # | Invariante | Agregado |
|---|------------|----------|
| I-ED-01 | **Dirección de edificio única** | No pueden existir dos edificios con la misma dirección y municipio. |
| I-ED-02 | **Inmueble en un solo edificio** | Un inmueble no puede pertenecer a más de un edificio simultáneamente. |
| I-IoT-01 | **Identificador de hardware único** | Cada dispositivo IoT tiene un identificador de hardware único en el sistema. |
| I-IoT-02 | **Un dispositivo por tipo por inmueble** | Un inmueble no puede tener dos dispositivos IoT del mismo tipo (ej. dos sensores de temperatura). En ese caso, se promedian. |

### 16.6 Proyecciones V3

- **Vista de edificio completo**: Combina Inmueble + Edificio + Expedientes activos para mostrar el estado energético del conjunto.
- **Dashboard de monitorización**: Combina DispositivoIoT + Inmueble para mostrar datos en tiempo real.
- **Informe de recomendaciones**: Combina Expediente + variables CE3X + catálogo de mejoras para generar recomendaciones automáticas.

---

> **Nota final:** Este documento define con precisión quirúrgica los límites de cada agregado del dominio de Certilab. Cualquier implementación que cruce estos límites (referenciando entidades internas de otro agregado, duplicando datos, o realizando transacciones multi-agregado) será considerada una violación arquitectónica y deberá ser corregida. Los agregados son la unidad de consistencia, escalabilidad y evolución del dominio. Respetar sus límites es la regla más importante de la arquitectura de Certilab.