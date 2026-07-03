# CF-025 — Inmueble Design

| Campo | Descripción |
|-------|-------------|
| **Código** | CF-025 |
| **Título** | Inmueble Design — Diseño completo del agregado Inmueble como segundo Aggregate Root del dominio |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-03 |
| **Autor** | Certilab® — Arquitectura de Dominio |
| **Propósito** | Definir con precisión el diseño completo del agregado Inmueble, su propósito, responsabilidades, límites, invariantes, ciclo de vida, eventos, reglas de negocio y hoja de ruta de evolución. Este documento es la referencia arquitectónica oficial para la implementación del agregado. |
| **Dependencias** | CF-020 (Data Model), CF-021 (Domain Model), CF-022 (Aggregate Boundaries), CF-030 (PITR Expert Knowledge Engine), CF-031 (PITR Question Tree), CF-032 (Arquitecto Técnico Inspection Manual) |
| **Audiencia** | Arquitectos de software, desarrolladores del núcleo de dominio, diseñadores del sistema de certificación |
| **Lenguaje** | DDD estricto — términos del negocio sin dependencia tecnológica |

---

## Índice

1. [Propósito](#1-propósito)
2. [Responsabilidades](#2-responsabilidades)
3. [Aggregate Root](#3-aggregate-root)
4. [Ownership](#4-ownership)
5. [Ciclo de vida](#5-ciclo-de-vida)
6. [Invariantes](#6-invariantes)
7. [Eventos](#7-eventos)
8. [Reglas de negocio](#8-reglas-de-negocio)
9. [Casos especiales](#9-casos-especiales)
10. [Información derivada](#10-información-derivada)
11. [Riesgos](#11-riesgos)
12. [Preparación V2](#12-preparación-v2)
13. [Preparación V3](#13-preparación-v3)

---

## 1. Propósito

### 1.1 ¿Por qué Inmueble es un Aggregate Root?

Inmueble es el segundo Aggregate Root del dominio de Certilab porque:

1. **Tiene identidad propia e independiente.** Un inmueble existe con independencia de quién lo certifique, quién lo posea o qué expedientes se le asocien. Su identidad la define su referencia catastral, no las transacciones comerciales que ocurren sobre él.

2. **Es la fuente única de verdad de las características físicas del edificio.** Los datos constructivos (año, tipo de fachada, cubierta, ventanas, instalaciones) pertenecen al inmueble, no al expediente. El expediente las referencia, no las posee.

3. **Tiene un ciclo de vida independiente.** Un inmueble puede existir sin expedientes, puede cambiar de propietario, puede ser reformado, puede certificarse múltiples veces a lo largo de décadas. Su ciclo de vida excede con creces el de cualquier expediente individual.

4. **Requiere consistencia transaccional propia.** El cambio de propietario, la actualización de características constructivas tras una reforma, y el registro de eventos históricos son operaciones que deben ser transaccionalmente consistentes dentro del inmueble, sin depender de otros agregados.

5. **Es referenciado por múltiples agregados.** El Expediente lo referencia (inmuebleId), el Cliente como propietario (propietarioActualId), y en V3 el Edificio. Ser Aggregate Root permite que otros agregados lo referencien por ID sin violar los límites transaccionales.

### 1.2 Misión del agregado

> Ser el registro canónico de cada inmueble del dominio de Certilab: su identidad catastral, sus características físicas constructivas, su historial de cambios de propiedad y su evolución a lo largo del tiempo como entidad independiente de cualquier proceso de certificación transaccional.

### 1.3 Principios rectores específicos

| # | Principio | Explicación |
|---|-----------|-------------|
| P-IN-01 | **Identidad catastral inmutable** | La referencia catastral es la clave de negocio única del inmueble. Una vez registrada, no cambia. Si hay un error catastral, se corrige mediante el histórico, no modificando la identidad. |
| P-IN-02 | **Características físicas como fuente de verdad** | Los datos constructivos del inmueble son la referencia oficial. El expediente puede *detectar* discrepancias, pero no *modificar* el inmueble. Las correcciones se realizan mediante eventos de actualización de características. |
| P-IN-03 | **Propietario actual vs. propietario histórico** | El inmueble siempre conoce su propietario actual (referencia al Cliente) y mantiene un registro histórico de todos los propietarios anteriores con fechas. |
| P-IN-04 | **El histórico es inmutable** | Una vez registrado un cambio de propietario o una modificación de características, no se elimina ni modifica. Solo se añaden nuevos registros al histórico. |
| P-IN-05 | **Nunca se elimina** | Un inmueble puede pasar a estado `histórico` pero nunca se elimina físicamente. Su historial de certificaciones es permanente. |

---

## 2. Responsabilidades

### 2.1 Responsabilidades directas (dentro del agregado)

| # | Responsabilidad | Descripción |
|---|----------------|-------------|
| R-01 | **Registrar la identidad catastral** | Almacenar y mantener la referencia catastral única, dirección completa, municipio, provincia, código postal y coordenadas geográficas del inmueble. |
| R-02 | **Mantener las características constructivas** | Almacenar y actualizar los datos constructivos del inmueble: año de construcción, tipo de inmueble, superficie, número de plantas, orientación, tipo de cubierta, tipo de fachada, tipo de ventanas, tipo de suelo, instalaciones fijas, protecciones solares. |
| R-03 | **Registrar el propietario actual** | Mantener la referencia al Cliente que es el propietario actual del inmueble. |
| R-04 | **Mantener el histórico de cambios de propietario** | Registrar cada cambio de propietario con fecha, cliente anterior y cliente nuevo. El histórico es inmutable. |
| R-05 | **Mantener el histórico de cambios de características** | Registrar cada modificación de las características constructivas (reformas, rehabilitaciones) con fecha, origen del cambio (auditoría, declaración del propietario, inspección), y detalle de lo modificado. |
| R-06 | **Gestionar el estado del inmueble** | Controlar las transiciones de estado: `registro` → `activo` → `histórico`. |
| R-07 | **Publicar eventos de cambio** | Emitir eventos cuando se modifica el inmueble para que otros agregados (Expediente, Cliente) puedan reaccionar con consistencia eventual. |

### 2.2 Responsabilidades delegadas (no pertenecen al agregado)

| # | Responsabilidad | ¿Quién la gestiona? | Motivo |
|---|----------------|---------------------|--------|
| R-D01 | **Certificar energéticamente el inmueble** | Expediente | La certificación es un proceso transaccional, no una propiedad del inmueble. |
| R-D02 | **Auditar el certificado** | Expediente (Auditoría PITR) | La auditoría pertenece al proceso de certificación. |
| R-D03 | **Gestionar los datos personales del propietario** | Cliente | Los datos personales son responsabilidad del Cliente. |
| R-D04 | **Validar la veracidad de las características declaradas** | Expediente (PITR) | El motor PITR detecta contradicciones entre el certificado original y las evidencias. No es responsabilidad del Inmueble validar su propia información. |
| R-D05 | **Calcular la calificación energética** | Expediente | La calificación es el resultado del proceso de certificación. |
| R-D06 | **Mantener el historial de certificaciones** | Expediente (vía consulta) | El historial se obtiene consultando los Expedientes asociados al inmueble. No se almacena en Inmueble. |

---

## 3. Aggregate Root

### 3.1 Identidad

| Elemento | Valor |
|----------|-------|
| **Raíz** | `Inmueble` |
| **Identificador único del sistema** | `inmueble_id` |
| **Identificador de negocio** | `referencia_catastral` (único en el sistema) |
| **Tipo de identidad** | Asignada por el sistema (inmueble_id) + Natural (referencia catastral) |

### 3.2 Límite del agregado

```
┌──────────────────────────────────────────────────────────────────────┐
│                      AGREGADO INMUEBLE                               │
│                                                                      │
│  RAÍZ: Inmueble                                                      │
│  ├── IDENTIDAD (Value Object):                                      │
│  │   ├── inmueble_id (identificador interno)                        │
│  │   └── referenciaCatastral (identificador de negocio, único)      │
│  │                                                                   │
│  ├── DATOS CATASTRALES (Value Object):                              │
│  │   ├── direccion: via, numero, piso, puerta                       │
│  │   ├── municipio                                                   │
│  │   ├── provincia                                                   │
│  │   ├── codigoPostal                                                │
│  │   └── coordenadas: latitud, longitud                              │
│  │                                                                   │
│  ├── DATOS CONSTRUCTIVOS (Value Object):                            │
│  │   ├── añoConstruccion                                             │
│  │   ├── tipoInmueble: [vivienda, local, edificioCompleto,          │
│  │   │                  trastero, garaje]                            │
│  │   ├── superficieConstruida (m²)                                  │
│  │   ├── superficieUtil (m², opcional)                              │
│  │   ├── numeroPlantas                                               │
│  │   ├── orientacion: [norte, sur, este, oeste,                     │
│  │   │                noreste, noroeste, sureste, suroeste]          │
│  │   ├── tipoVivienda (si aplica): [piso, unifamiliarAislada,       │
│  │   │                unifamiliarAdosada, dúplex, ático,            │
│  │   │                plantaBaja]                                    │
│  │   ├── envolventeVertical (Value Object):                         │
│  │   │   ├── tipoFachada: [ladrillo, enfoscado, SATE, piedra,       │
│  │   │   │               panelSandwich, madera, hormigon, otro]      │
│  │   │   ├── composicionMuro: [simple, dobleHojaConCamara,          │
│  │   │   │               dobleHojaSinCamara, SATE,                  │
│  │   │   │               panelPrefabricado, muroCarga]              │
│  │   │   ├── espesorMuro (cm, opcional)                             │
│  │   │   ├── tipoAislamiento: [EPS, XPS, PUR, lanaMineral,         │
│  │   │   │               celulosa, ninguno, desconocido]            │
│  │   │   ├── espesorAislamiento (cm, opcional)                      │
│  │   │   ├── colorFachada: [blanco, beige, grisClaro,              │
│  │   │   │               rojo, grisOscuro, oscuro, desconocido]     │
│  │   │   └── estadoFachada: [bueno, regular, malo, desconocido]    │
│  │   ├── huecosYVentanas (Value Object):                            │
│  │   │   ├── tipoMarco: [madera, aluminioSinRPT, aluminioConRPT,   │
│  │   │   │               PVC, mixto, desconocido]                   │
│  │   │   ├── tipoAcristalamiento: [simple, doble, triple,           │
│  │   │   │               desconocido]                               │
│  │   │   ├── tipoApertura: [abatible, oscilobatiente, corredera,   │
│  │   │   │               pivotante, fija, desconocido]              │
│  │   │   ├── proteccionSolar: [toldo, persiana, veneciana,          │
│  │   │   │               cortina, estor, ninguna, desconocido]      │
│  │   │   ├── tipoVidrio: [estandar, bajoEmisivo, controlSolar,     │
│  │   │   │               templado, desconocido]                     │
│  │   │   ├── permeabilidad: [alta, media, baja, desconocida]       │
│  │   │   └── numHuecos (número total de ventanas, opcional)        │
│  │   ├── envolventeHorizontal (Value Object):                      │
│  │   │   ├── tipoCubierta: [plana, inclinadaTeja,                  │
│  │   │   │               inclinadaPanel, noAplica, desconocido]     │
│  │   │   ├── composicionCubierta: [conAislamiento, sinAislamiento, │
│  │   │   │               desconocido]                               │
│  │   │   ├── estadoCubierta: [bueno, regular, malo, desconocido]  │
│  │   │   ├── tipoSueloContacto: [solera, camaraAire, garaje,       │
│  │   │   │               otraVivienda, noAplica, desconocido]      │
│  │   │   └── materialSueloInterior: [madera, ceramica, marmol,     │
│  │   │               moqueta, vinilo, hormigon, desconocido]       │
│  │   ├── instalaciones (Value Object):                             │
│  │   │   ├── tipoCalefaccion: [calderaGas, bombaCalor,             │
│  │   │   │               estufaPellets, electrica, centralizada,   │
│  │   │   │               sueloRadiante, noExiste, desconocido]      │
│  │   │   ├── tipoRefrigeracion: [bombaCalorSplit, bombaCalorConductos, │
│  │   │   │               equipoVentana, noExiste, desconocido]     │
│  │   │   ├── tipoACS: [calderaGas, termoElectrico, solar,         │
│  │   │   │               bombaCalor, noExiste, desconocido]        │
│  │   │   ├── tipoVentilacion: [natural, forzada, mecanica(ADM),   │
│  │   │   │               noExiste, desconocido]                    │
│  │   │   └── energiaRenovable: [solarFotovoltaica, solarTermica,  │
│  │   │               geotermia, ninguna, desconocido]              │
│  │   ├── puentesTermicos (Value Object):                           │
│  │   │   ├── presenciaMoho: [ninguna, algunasEsquinas,             │
│  │   │   │               generalizado, soloBano]                   │
│  │   │   ├── estadoCajaPersiana: [conAislamiento, sinAislamiento, │
│  │   │   │               pasaAire, oculta, desconocido]            │
│  │   │   └── encuentroForjado: [visible, continuo, balcones,      │
│  │   │               fachadaVentilada, desconocido]                │
│  │   └── epocaConstructiva (derivado): [pre1981, 1981-2006,       │
│  │               2007-2013, post2013] — se calcula desde          │
│  │               añoConstruccion                                   │
│  │                                                                   │
│  ├── PROPIETARIO ACTUAL:                                            │
│  │   └── propietarioActualId (referencia al ID del Cliente)        │
│  │                                                                   │
│  ├── HISTORIAL DE CAMBIOS DE PROPIETARIO (colección inmutable):    │
│  │   ├── cambioId (secuencial interno)                              │
│  │   ├── clienteAnteriorId (referencia)                            │
│  │   ├── clienteNuevoId (referencia)                               │
│  │   ├── fechaCambio                                                │
│  │   └── origenCambio: [compraventa, herencia, donacion,           │
│  │               correccionRegistral]                               │
│  │                                                                   │
│  ├── HISTORIAL DE CAMBIOS DE CARACTERÍSTICAS (colección inmutable):│
│  │   ├── cambioId (secuencial interno)                              │
│  │   ├── fechaCambio                                                │
│  │   ├── camposModificados (lista de nombres de campo)             │
│  │   ├── valoresAnteriores (resumen de lo cambiado)                │
│  │   ├── valoresNuevos (resumen del cambio)                        │
│  │   ├── origenCambio: [reforma, auditoria, declaracionPropietario,│
│  │   │               correccionCatastral]                           │
│  │   └── expedienteOrigenId (referencia opcional si el cambio     │
│  │               se origina en una auditoría)                      │
│  │                                                                   │
│  ├── ESTADO: [registro, activo, historico]                         │
│  │                                                                   │
│  └── METADATOS:                                                     │
│      ├── fechaCreacion                                               │
│      ├── fechaUltimaActualizacion                                   │
│      └── version (entero, incremental)                             │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              NO INCLUYE (EXPLÍCITAMENTE)                      │   │
│  │  - Datos personales del propietario (están en Cliente)        │   │
│  │  - Certificados (están en Expediente)                         │   │
│  │  - Auditorías PITR (están en Expediente)                      │   │
│  │  - Expedientes (son otro agregado)                            │   │
│  │  - Lista de expedientes del inmueble (se consulta)            │   │
│  │  - Catálogo de evidencias CF-030 (es global)                  │   │
│  │  - Variables CE3X como tal (pertenecen al certificado)        │   │
│  │  - Calificación energética (se calcula en Expediente)         │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

### 3.3 Value Objects dentro del agregado

| Value Object | Propósito | ¿Se comparte? |
|-------------|-----------|---------------|
| `IdentidadInmueble` | Encapsular la identidad del inmueble (inmueble_id + referencia catastral) | No, es interno del agregado |
| `DatosCatastrales` | Dirección completa y coordenadas | No, la dirección puede ser una proyección |
| `DatosConstructivos` | Todas las características físicas del inmueble | No, es el núcleo del agregado |
| `EnvolventeVertical` | Fachada, muro, aislamiento, color, estado | No, forma parte de DatosConstructivos |
| `HuecosYVentanas` | Marcos, acristalamiento, protecciones, permeabilidad | No, forma parte de DatosConstructivos |
| `EnvolventeHorizontal` | Cubierta, suelo, material interior | No, forma parte de DatosConstructivos |
| `Instalaciones` | Calefacción, refrigeración, ACS, ventilación, renovables | No, forma parte de DatosConstructivos |
| `PuentesTermicos` | Moho, caja persiana, encuentro forjado | No, forma parte de DatosConstructivos |
| `CambioPropietario` | Un evento individual del histórico de propietarios | No, es interno del agregado |
| `CambioCaracteristicas` | Un evento individual del histórico de cambios | No, es interno del agregado |

### 3.4 Entidades internas (no Aggregate Root)

| Entidad | Descripción | Identidad |
|---------|-------------|-----------|
| `CambioPropietario` | Representa un cambio de propietario en el histórico | cambioId (secuencial local) |
| `CambioCaracteristicas` | Representa una modificación de características | cambioId (secuencial local) |

Estas entidades existen **dentro** del agregado Inmueble. No son accesibles desde fuera. Solo la raíz Inmueble puede ser referenciada.

### 3.5 Relaciones con otros agregados

| Relación | Dirección | Tipo |
|----------|-----------|------|
| Inmueble → Cliente (propietarioActualId) | Saliente | Referencia por ID |
| Expediente → Inmueble (inmuebleId) | Entrante | Referencia por ID |
| Inmueble → Edificio (V3) | Saliente (futura) | Referencia por ID |

**Importante:** El Inmueble referencia al Cliente (propietario), pero no contiene datos del Cliente. El Expediente referencia al Inmueble, pero no contiene datos del Inmueble. Siempre referencias por ID.

---

## 4. Ownership

### 4.1 Datos propietarios (pertenecen exclusivamente a Inmueble)

| Dato | ¿Se replica en otro agregado? | ¿Por qué? |
|------|------------------------------|-----------|
| referencia catastral | NO | Es la clave de negocio única. |
| dirección, municipio, provincia, código postal | NO | Son datos catastrales del inmueble. |
| coordenadas geográficas | NO | Son datos de localización. |
| año de construcción | NO | Es un dato constructivo del inmueble. |
| tipo de inmueble | NO | Es una clasificación del inmueble. |
| superficie construida | NO | Es una medida física del inmueble. |
| número de plantas | NO | Es una característica constructiva. |
| orientación | NO | Es una propiedad geográfica del inmueble. |
| tipo de vivienda | NO | Clasificación dentro del tipo de inmueble. |
| envolvente vertical (fachada, muro, aislamiento, color, estado) | NO | Son características físicas. |
| huecos y ventanas (marco, acristalamiento, apertura, protección) | NO | Son características físicas. |
| envolvente horizontal (cubierta, suelo) | NO | Son características físicas. |
| instalaciones (calefacción, refrigeración, ACS, ventilación, renovables) | NO | Son características fijas del inmueble. |
| puentes térmicos | NO | Son características de comportamiento térmico. |
| propietario actual (ID) | NO | Es la referencia al Cliente. |
| histórico de cambios de propietario | NO | Solo existe aquí. |
| histórico de cambios de características | NO | Solo existe aquí. |
| estado del inmueble | NO | Solo existe aquí. |

### 4.2 Datos referenciados (pertenecen a otros agregados)

| Dato | Agregado propietario | Uso en Inmueble |
|------|---------------------|-----------------|
| nombre del propietario | Cliente | NO se almacena. Se resuelve por propietarioActualId. |
| NIF del propietario | Cliente | NO se almacena. Se resuelve por propietarioActualId. |
| email del propietario | Cliente | NO se almacena. Se resuelve por propietarioActualId. |
| certificados históricos | Expediente | NO se almacenan. Se consultan por inmuebleId. |
| calificación energética | Expediente | NO se almacena. Se consulta o se deriva. |
| evidencias fotográficas | Expediente | NO se almacenan. Pertenecen a la auditoría. |

### 4.3 Principio de fuente única de verdad

```
┌──────────────────────────────────────────────────────────────────┐
│                  Single Source of Truth                           │
│                                                                  │
│  Dato                          Fuente Única                      │
│  ─────────────────────────────────────────────────────────────── │
│  referenciaCatastral            INMUEBLE                         │
│  direccion                      INMUEBLE                         │
│  añoConstruccion                INMUEBLE                         │
│  tipoFachada                    INMUEBLE                         │
│  tipoCubierta                   INMUEBLE                         │
│  tipoMarco                      INMUEBLE                         │
│  tipoCalefaccion                INMUEBLE                         │
│  propietarioActual              INMUEBLE (referencia a Cliente)  │
│  historicoPropietarios          INMUEBLE                         │
│  historicoReformas              INMUEBLE                         │
│  nombreCliente                  CLIENTE                          │
│  nifCliente                     CLIENTE                          │
│  calificaciónEnergetica         EXPEDIENTE                       │
│  variablesCE3X                  EXPEDIENTE                       │
│  evidencias                     EXPEDIENTE                       │
│  contradicciones                EXPEDIENTE                       │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Ciclo de vida

### 5.1 Diagrama de estados

```
         ┌──────────────┐
         │   REGISTRO   │
         │  (creación)  │
         └──────┬───────┘
                │
                ▼
         ┌──────────────┐
    ┌───►    ACTIVO     │◄────────┐
    │    └──────┬───────┘         │
    │           │                 │
    │           ▼                 │
    │    ┌──────────────┐         │
    └────┤  HISTÓRICO   ├─────────┘
         └──────────────┘   (reactivación)
```

### 5.2 Estados

| Estado | Descripción | ¿Es terminal? | ¿Permite expedientes activos? |
|--------|-------------|---------------|------------------------------|
| **REGISTRO** | El inmueble ha sido creado con datos mínimos (referencia catastral + dirección). Aún no está completo. Puede tener datos constructivos pendientes. | No | No |
| **ACTIVO** | El inmueble tiene todos los datos mínimos requeridos y está disponible para ser certificado. Es el estado normal de operación. | No | Sí |
| **HISTÓRICO** | El inmueble ha sido desactivado (ej. derribo, fusión catastral, error de registro). Conserva todo su historial pero no puede tener nuevos expedientes. | No (puede reactivarse) | No |

### 5.3 Transiciones

| Desde | Hacia | Condición | ¿Quién autoriza? |
|-------|-------|-----------|-----------------|
| REGISTRO | ACTIVO | Datos mínimos completos (referencia catastral + dirección + año de construcción + tipo de inmueble + superficie). | Sistema (automática) |
| ACTIVO | HISTÓRICO | El inmueble ya no existe físicamente, se ha fusionado con otro, o hay un error catastral que requiere recrear el registro. Requiere que NO haya expedientes activos sobre este inmueble. | Arquitecto Técnico o Administrador |
| HISTÓRICO | ACTIVO | Se ha reactivado el inmueble (ej. error en la desactivación, rehabilitación de un edificio dado de baja). | Arquitecto Técnico o Administrador |
| REGISTRO | HISTÓRICO | Error de creación inmediato (ej. referencia catastral duplicada pero son inmuebles distintos). | Administrador |

### 5.4 Eventos de ciclo de vida

| Evento | Estado resultante | Descripción |
|--------|-------------------|-------------|
| `InmuebleCreado` | REGISTRO | Se ha registrado un nuevo inmueble con datos mínimos. |
| `InmuebleCompletado` | ACTIVO | Se han completado los datos constructivos mínimos. |
| `InmuebleDesactivado` | HISTÓRICO | Se ha desactivado el inmueble. |
| `InmuebleReactivado` | ACTIVO | Se ha reactivado un inmueble histórico. |

### 5.5 Datos mínimos para cada estado

| Estado | Datos requeridos |
|--------|------------------|
| REGISTRO | referenciaCatastral, direccion (vía + número), municipio, provincia |
| ACTIVO | Todo lo de REGISTRO + añoConstruccion, tipoInmueble, superficieConstruida, numeroPlantas, tipoVivienda (si aplica), propietarioActualId |
| HISTÓRICO | (los mismos que ACTIVO, solo cambia el estado) |

### 5.6 Reglas de transición

| # | Regla | Descripción |
|---|-------|-------------|
| CT-01 | **Sin expedientes activos para desactivar** | Un inmueble no puede pasar a HISTÓRICO si tiene algún Expediente asociado en estado no terminal. |
| CT-02 | **Notificación al cambiar a histórico** | Al desactivar un inmueble, se debe notificar (vía evento) a los agregados interesados: Expedientes, Cliente propietario. |
| CT-03 | **Trazabilidad de desactivación** | Toda desactivación debe registrar el motivo y el usuario que la autorizó. |
| CT-04 | **Reactivación conserva histórico** | Al reactivar un inmueble, todo su histórico de cambios de propietario y características se conserva intacto. No se pierde nada. |

---

## 6. Invariantes

### 6.1 Invariantes de identidad

| # | Invariante | Gravedad | Descripción |
|---|------------|----------|-------------|
| I-IN-01 | **Referencia catastral única** | FATAL | No pueden existir dos inmuebles ACTIVOS con la misma referencia catastral. Si se detecta un duplicado, se unifican los registros (uno pasa a HISTÓRICO). |
| I-IN-02 | **Formato de referencia catastral válido** | FATAL | La referencia catastral debe tener el formato oficial: 20 caracteres alfanuméricos según la normativa del Catastro. |
| I-IN-03 | **Identidad inmutable** | FATAL | Una vez registrado, el inmueble_id y la referencia catastral no pueden modificarse. Cualquier corrección catastral se registra en el histórico. |

### 6.2 Invariantes de datos catastrales

| # | Invariante | Gravedad | Descripción |
|---|------------|----------|-------------|
| I-IN-04 | **Dirección no vacía** | FATAL | La dirección postal es obligatoria y no puede ser vacía. Debe contener al menos vía y número. |
| I-IN-05 | **Municipio y provincia obligatorios** | FATAL | El municipio y la provincia son obligatorios y deben ser valores válidos del nomenclátor oficial. |

### 6.3 Invariantes de datos constructivos

| # | Invariante | Gravedad | Descripción |
|---|------------|----------|-------------|
| I-IN-06 | **Año de construcción en rango** | FATAL | El año de construcción debe estar entre 1500 y el año actual + 1 (para edificios en construcción). |
| I-IN-07 | **Superficie construida positiva** | FATAL | La superficie construida debe ser un número positivo > 0. Máximo 100.000 m². |
| I-IN-08 | **Número de plantas positivo** | FATAL | El número de plantas debe ser un entero positivo ≥ 1. |
| I-IN-09 | **Época constructiva coherente** | GRAVE | El tipo de fachada, ventanas y cubierta deben ser coherentes con la época constructiva. Ejemplo: SATE en un inmueble pre-2006 indica reforma posterior. (Esta invariante no bloquea, pero genera una advertencia.) |
| I-IN-10 | **Tipo de vivienda coherente con tipo de inmueble** | GRAVE | Si tipoInmueble es "local", tipoVivienda debe ser null. Si tipoInmueble es "vivienda", tipoVivienda es obligatorio. |

### 6.4 Invariantes de propietario

| # | Invariante | Gravedad | Descripción |
|---|------------|----------|-------------|
| I-IN-11 | **Propietario actual referenciado** | FATAL | propietarioActualId debe referenciar a un Cliente existente. |
| I-IN-12 | **Propietario actual no puede ser nulo en ACTIVO** | FATAL | Un inmueble en estado ACTIVO debe tener un propietarioActualId válido. |
| I-IN-13 | **Histórico de propietarios coherente** | GRAVE | El primer cambio de propietario del histórico debe coincidir con el propietarioOriginal. No puede haber saltos en la secuencia temporal. |

### 6.5 Invariantes de histórico

| # | Invariante | Gravedad | Descripción |
|---|------------|----------|-------------|
| I-IN-14 | **Inmutabilidad del histórico** | FATAL | Una vez registrado, un evento en el histórico de cambios de propietario o de características NO puede modificarse ni eliminarse. Solo se añaden nuevos eventos. |
| I-IN-15 | **Fechas en orden cronológico** | GRAVE | Los eventos del histórico deben tener fechas en orden cronológico ascendente. No se permite registrar un cambio con fecha anterior al último cambio registrado. |

### 6.6 Invariantes de estado

| # | Invariante | Gravedad | Descripción |
|---|------------|----------|-------------|
| I-IN-16 | **Inmueble nunca se elimina** | FATAL | Un inmueble puede pasar a HISTÓRICO pero nunca se elimina físicamente. Su historial de cambios y su vínculo con expedientes pasados es permanente. |
| I-IN-17 | **Sin expedientes activos para estado HISTÓRICO** | FATAL | No se permite cambiar a HISTÓRICO si existen expedientes en curso referenciando este inmueble. |
| I-IN-18 | **Transiciones de estado válidas** | FATAL | Solo se permiten las transiciones definidas en 5.3. Cualquier otra transición está prohibida. |

---

## 7. Eventos

### 7.1 Eventos emitidos por Inmueble

| Evento | Cuándo se emite | Datos portados | Consumidores previstos |
|--------|-----------------|----------------|------------------------|
| `InmuebleCreado` | Tras crear un nuevo inmueble en estado REGISTRO | inmueble_id, referencia_catastral, dirección, municipio, provincia | Expediente (puede crear solicitud), Cliente (vincular) |
| `InmuebleCompletado` | Al completar datos mínimos para pasar a ACTIVO | inmueble_id, año_construcción, tipo_inmueble, superficie | Motor PITR (tiene datos para auditorías), proyecciones |
| `InmueblePropietarioCambiado` | Al registrar un cambio de propietario | inmueble_id, cliente_anterior_id, cliente_nuevo_id, fecha_cambio, origen_cambio | Expediente (validar cliente activo), Cliente (notificar nuevo propietario) |
| `InmuebleCaracteristicasActualizadas` | Al modificar datos constructivos | inmueble_id, campos_modificados, origen_cambio, expediente_origen_id (opcional) | Expediente (re-evaluar si hay cambios relevantes), Motor PITR (actualizar modelo) |
| `InmuebleDireccionActualizada` | Al corregir la dirección | inmueble_id, dirección_anterior_resumen, dirección_nueva_resumen | Proyecciones de búsqueda, facturación (V2) |
| `InmuebleDesactivado` | Al pasar a estado HISTÓRICO | inmueble_id, motivo, usuario_id, fecha | Expediente (alertar si hay expedientes activos), Cliente (notificar) |
| `InmuebleReactivado` | Al volver a estado ACTIVO | inmueble_id, motivo, usuario_id, fecha | Expediente, proyecciones |

### 7.2 Eventos consumidos por Inmueble

| Evento | Emitido por | Acción en Inmueble |
|--------|-------------|-------------------|
| `ClienteVerificado` | Cliente | No requiere acción directa. Puede actualizar proyecciones. |
| `ClienteBajaSolicitada` | Cliente | Si el cliente que solicita la baja es el propietarioActualId, marcar para revisión del AT. No se cambia automáticamente el propietario. |
| `ExpedienteSolicitado` | Expediente | No requiere acción directa. Útil para proyecciones de "inmuebles con expediente activo". |
| `ExpedienteCerrado` (V2) | Expediente | No requiere acción directa. Útil para actualizar contadores de certificaciones del inmueble. |

### 7.3 Flujo de eventos típicos

#### Happy path: Registro inicial y primera certificación

```
1. Cliente proporciona datos del inmueble
2. Servicio crea Inmueble (estado: REGISTRO)
   → Publica: InmuebleCreado
3. Cliente completa datos constructivos (opcional)
   → Publica: InmuebleCompletado (estado: ACTIVO)
4. Cliente solicita certificación → se crea Expediente con inmuebleId
5. ...
```

#### Happy path: Cambio de propietario

```
1. Nuevo propietario o AT notifica cambio de titularidad
2. Servicio actualiza propietarioActualId + añade evento al histórico
   → Publica: InmueblePropietarioCambiado
3. (Consistencia eventual) Expediente recibe el evento:
   - Si hay expediente en curso, verifica que el cliente actual sigue siendo propietario
   - Si no, alerta al AT
4. (Consistencia eventual) Proyección de inmuebles del nuevo propietario se actualiza
```

#### Happy path: Reforma detectada en auditoría

```
1. Motor PITR detecta que el certificado original tiene características
   distintas a las evidencias (ej. SATE en fachada no registrado)
2. AT confirma la reforma durante revisión manual
3. Servicio actualiza datos constructivos del Inmueble
   → Añade evento al histórico de cambios de características
   → Publica: InmuebleCaracteristicasActualizadas
4. AT continúa con la auditoría usando los nuevos datos
```

---

## 8. Reglas de negocio

### 8.1 Reglas de creación

| # | Regla | Descripción |
|---|-------|-------------|
| R-CR-01 | **Creación por cualquier usuario autenticado** | Cualquier usuario (cliente o AT) puede crear un inmueble. No requiere permisos especiales. |
| R-CR-02 | **Validación de referencia catastral** | La referencia catastral debe validarse contra el formato oficial antes de crear el inmueble. No se requiere validación contra el Catastro real (se hará en V2). |
| R-CR-03 | **Deduplicación automática** | Si al crear un inmueble se detecta que ya existe uno ACTIVO con la misma referencia catastral, NO se crea un duplicado. En su lugar, se devuelve el inmueble existente. |
| R-CR-04 | **Creación mínima** | Un inmueble puede crearse solo con referencia catastral y dirección. El resto de datos pueden completarse después. |

### 8.2 Reglas de actualización

| # | Regla | Descripción |
|---|-------|-------------|
| R-AC-01 | **Quién puede actualizar** | El propietario del inmueble, el AT asignado a un expediente sobre este inmueble, o un administrador del sistema pueden actualizar los datos constructivos. |
| R-AC-02 | **Actualización con trazabilidad** | Toda actualización de datos constructivos debe registrar el origen del cambio (reforma, auditoría, declaración del propietario, corrección catastral). |
| R-AC-03 | **Actualización de propietario con verificación** | El cambio de propietario requiere verificación. No puede ser auto-declarado sin documentación de respaldo. En V1, se acepta declaración del AT con responsabilidad profesional. En V2, se integrará con el Catastro. |
| R-AC-04 | **Notificación al AT** | Si un inmueble con un expediente en curso cambia de propietario, se debe notificar al AT asignado para que verifique que el cliente sigue siendo el propietario legítimo. |

### 8.3 Reglas de consulta

| # | Regla | Descripción |
|---|-------|-------------|
| R-CO-01 | **Consulta pública parcial** | Cualquier usuario puede consultar dirección, municipio y provincia de cualquier inmueble. Los datos constructivos detallados solo están disponibles para el propietario y los AT con expedientes activos sobre el inmueble. |
| R-CO-02 | **Historial de propietarios restringido** | El histórico de propietarios solo es visible para el propietario actual, los AT con expedientes activos, y administradores. No es público. |

### 8.4 Reglas de certificación (relación con Expediente)

| # | Regla | Descripción |
|---|-------|-------------|
| R-CE-01 | **Un expediente activo por inmueble** | Un inmueble no puede tener más de un expediente activo simultáneamente. Esta regla se valida en el servicio de aplicación al crear un nuevo Expediente. |
| R-CE-02 | **Datos constructivos como referencia base** | Los datos constructivos del Inmueble son la referencia base para la auditoría PITR. El motor PITR compara el certificado original contra estos datos. |
| R-CE-03 | **Actualización desde auditoría** | Si el motor PITR o el AT detectan una discrepancia entre los datos constructivos registrados y la realidad (evidencias fotográficas), se puede actualizar el Inmueble. La auditoría PITR es una fuente válida de origen de cambio. |
| R-CE-04 | **Consistencia eventual post-auditoría** | Tras una auditoría que actualiza datos constructivos, los expedientes en curso sobre ese inmueble deben ser notificados para que consideren si necesitan re-evaluación. |

### 8.5 Reglas de histórico

| # | Regla | Descripción |
|---|-------|-------------|
| R-HI-01 | **Histórico de propietarios siempre presente** | El inmueble siempre registra quién fue su propietario original (primer cambio) y todos los cambios posteriores. |
| R-HI-02 | **Histórico de reformas completo** | Toda modificación de datos constructivos se registra en el histórico. Incluso cambios menores. |
| R-HI-03 | **Origen documentado** | Cada entrada en ambos históricos debe documentar el origen del cambio (compraventa, reforma, auditoría, etc.). |

---

## 9. Casos especiales

### 9.1 Cambio de propietario

#### Escenario
El propietario actual vende el inmueble a un nuevo propietario. El nuevo propietario puede ser un Cliente existente o uno nuevo.

#### Flujo
```
1. Se verifica que el nuevo propietario existe como Cliente (o se crea)
2. Se registra el cambio en el Inmueble:
   a. Se añade un nuevo CambioPropietario al histórico
   b. Se actualiza propietarioActualId
   c. Se publica: InmueblePropietarioCambiado
3. (Consistencia eventual) Los expedientes en curso reciben el evento
```

#### Consideraciones
- Si hay un expediente en curso, el AT debe ser notificado para verificar la identidad del nuevo propietario.
- El nuevo propietario hereda el historial completo de certificaciones del inmueble.
- El antiguo propietario pierde el acceso a los datos detallados del inmueble, pero conserva el acceso a sus expedientes históricos.
- Si el nuevo propietario ya tenía expedientes sobre otros inmuebles, esos no se ven afectados.

### 9.2 Varios clientes como copropietarios

#### Escenario
Un inmueble tiene múltiples propietarios (copropiedad, herencia, comunidad de bienes).

#### Solución V1
En V1, `propietarioActualId` referencia a un único Cliente. Si hay copropietarios, se designa un **propietario principal** o **representante** que figura como propietarioActualId. Los demás copropietarios se registran como notas internas (no modeladas formalmente).

#### Solución V2
En V2, se introduce un Value Object `Copropietarios` que contiene una lista de IDs de Cliente que son copropietarios. El `propietarioActualId` sigue siendo el representante principal.

#### Reglas
| # | Regla | Descripción |
|---|-------|-------------|
| R-CP-01 | **Representante único** | Siempre hay un propietario principal en propietarioActualId. Los copropietarios son adicionales. |
| R-CP-02 | **Consentimiento del representante** | El representante puede actuar en nombre de los copropietarios para iniciar certificaciones. |
| R-CP-03 | **Visibilidad de datos** | Todos los copropietarios tienen el mismo nivel de acceso a los datos del inmueble que el propietario principal. |

### 9.3 Varios expedientes sobre el mismo inmueble

#### Escenario
Un inmueble puede tener múltiples expedientes a lo largo del tiempo (certificación inicial, renovación a los 10 años, segunda certificación con otro técnico, auditoría de un certificado existente).

#### Solución
- Los expedientes se gestionan en el agregado Expediente. El Inmueble no tiene ni necesita una lista de expedientes.
- La restricción I-EX-02 del agregado Expediente garantiza que solo haya un expediente activo por inmueble.
- El historial completo de expedientes de un inmueble se obtiene consultando al repositorio de Expedientes por inmuebleId.

#### Reglas
| # | Regla | Descripción |
|---|-------|-------------|
| R-VE-01 | **Expedientes secuenciales** | Los expedientes sobre un mismo inmueble se suceden secuencialmente. No pueden solaparse en el tiempo. |
| R-VE-02 | **Referencia al expediente anterior** | Cada nuevo expediente puede (opcionalmente) referenciar al expediente anterior del mismo inmueble para mantener la trazabilidad. |
| R-VE-03 | **Datos constructivos actualizados** | Al iniciar un nuevo expediente, se usan los datos constructivos actuales del Inmueble, no los del expediente anterior. Si ha habido reformas, se habrán registrado en el Inmueble. |

### 9.4 Segundas certificaciones (renovación)

#### Escenario
Un inmueble ya certificado necesita una nueva certificación porque la anterior ha expirado (10 años de validez) o porque se ha realizado una reforma que afecta a la calificación energética.

#### Flujo
```
1. Se verifica que no hay un expediente activo sobre el inmueble
2. Se crea un nuevo Expediente con referencia al anterior (opcional)
3. Se toman los datos constructivos actuales del Inmueble como base
4. El motor PITR compara el nuevo certificado con los datos actuales
5. El resultado (calificación) puede ser igual o distinto al anterior
```

#### Consideraciones
- La segunda certificación no debe copiar los datos del certificado anterior. Usa los datos actuales del Inmueble.
- El histórico de reformas del Inmueble es la fuente de verdad para saber qué ha cambiado desde la última certificación.
- El AT debe ser consciente de que existe una certificación anterior y considerar si los cambios son consistentes.

### 9.5 Histórico del inmueble

#### Escenario
Se necesita conocer la evolución completa del inmueble: quién lo ha poseído, qué reformas se han realizado, y qué certificaciones ha tenido.

#### Fuentes de información
| Aspecto del histórico | Fuente de datos |
|----------------------|-----------------|
| Cambios de propietario | Inmueble.historialPropietarios (interno del agregado) |
| Cambios de características (reformas) | Inmueble.historialCaracteristicas (interno del agregado) |
| Certificaciones realizadas | Consulta a Expedientes por inmuebleId (externo al agregado) |
| Calificaciones obtenidas | Cada Expediente contiene su propia calificación |

#### Proyección para consulta
Para obtener una vista unificada del histórico del inmueble, se construye una proyección de solo lectura que combina:
1. Datos del Inmueble (identidad, catastrales)
2. Histórico de cambios de propietario (del agregado Inmueble)
3. Histórico de cambios de características (del agregado Inmueble)
4. Lista de expedientes con sus calificaciones (del repositorio de Expedientes)

Esta proyección se actualiza mediante eventos y es de **consistencia eventual**.

### 9.6 Inmueble sin datos constructivos completos

#### Escenario
Se crea un inmueble solo con referencia catastral y dirección, sin datos constructivos. Esto puede ocurrir cuando se registra el inmueble rápido para iniciar un expediente y los datos se completan durante la auditoría.

#### Comportamiento
- El inmueble permanece en estado REGISTRO hasta que se completen los datos mínimos para ACTIVO.
- El expediente puede crearse incluso con el inmueble en REGISTRO, pero no puede pasar a `EnRevisionPITR` hasta que el inmueble esté ACTIVO con datos constructivos completos.
- Durante la auditoría, el motor PITR puede solicitar datos que faltan al cliente a través del árbol de preguntas PITR. Estos datos, una vez confirmados por el AT, actualizan el Inmueble.

### 9.7 Error en la referencia catastral

#### Escenario
Se registra un inmueble con una referencia catastral incorrecta y se detecta el error después.

#### Solución
- **NO se modifica** la referencia catastral (violaría I-IN-03).
- **NO se elimina** el inmueble (violaría I-IN-16).
- Se desactiva el inmueble erróneo (pasa a HISTÓRICO) y se crea uno nuevo con la referencia correcta.
- El histórico del inmueble erróneo registra el motivo de desactivación.
- Si había expedientes asociados al inmueble erróneo, se migran al nuevo inmueble (operación manual de administración).

---

## 10. Información derivada

### 10.1 Datos que NUNCA se almacenan en Inmueble (siempre se calculan)

| Dato derivado | Fórmula / Origen | ¿Dónde se calcula? |
|---------------|------------------|--------------------|
| **Época constructiva** | Derivada de añoConstrucción (pre1981, 1981-2006, 2007-2013, post2013) | Se calcula al vuelo en el Value Object DatosConstructivos |
| **Número de expedientes** | Consulta al repositorio de Expedientes filtrando por inmuebleId | Servicio de aplicación |
| **Número de certificaciones** | Consulta al repositorio de Expedientes filtrando por inmuebleId y estado=Entregado | Servicio de aplicación |
| **Última calificación energética** | Consulta al Expediente más reciente del inmueble con estado Entregado | Servicio de aplicación |
| **Tiempo desde última certificación** | Fecha actual - fecha de última certificación | Servicio de aplicación |
| **¿Está en curso?** | Consulta si existe un Expediente activo con este inmuebleId | Servicio de aplicación |
| **Propietario actual (nombre)** | Resolución de propietarioActualId contra el agregado Cliente | Servicio de aplicación o proyección |
| **Coherencia de datos constructivos** | Validación cruzada entre añoConstrucción y tipo de fachada/ventanas/cubierta | Servicio de dominio (no bloqueante) |

### 10.2 Datos que SÍ se almacenan pero podrían derivarse

| Dato | Motivo de almacenamiento |
|------|--------------------------|
| **Estado del inmueble** | Es necesario para saber si el inmueble está disponible para nuevos expedientes. Se almacena porque cambia de forma independiente a otros datos. |
| **Propietario actual (ID)** | Es la referencia al Cliente propietario. Se almacena porque cambia de forma independiente. |
| **Histórico de cambios de propietario** | Es información de dominio que pertenece al inmueble. Se almacena dentro del agregado porque es parte de su estado y debe ser transaccionalmente consistente con él. |
| **Histórico de cambios de características** | Es información de dominio que pertenece al inmueble. Se almacena dentro del agregado por la misma razón. |

### 10.3 Reglas de información derivada

| # | Regla | Descripción |
|---|-------|-------------|
| R-ID-01 | **No derivar dentro del agregado** | Los datos derivados que requieren consultar otros agregados (expedientes, cliente) no se calculan ni almacenan dentro del Inmueble. |
| R-ID-02 | **Derivación interna permitida** | Los datos derivados que solo usan datos internos del Inmueble (época constructiva) pueden calcularse al vuelo dentro del agregado. |
| R-ID-03 | **Proyecciones para consultas frecuentes** | Si una consulta combinada es muy frecuente (ej. "inmuebles de un cliente con su última calificación"), se puede crear una proyección específica de solo lectura que se actualice mediante eventos. |

---

## 11. Riesgos

### 11.1 Riesgos arquitectónicos

| # | Riesgo | Impacto | Mitigación |
|---|--------|---------|------------|
| R-AQ-01 | **Crecimiento excesivo del agregado** | Si se añaden demasiados Value Objects y colecciones, el agregado se vuelve pesado y las operaciones de carga/almacenamiento son lentas. | Mantener los históricos (propietarios, características) como colecciones dentro del agregado pero con paginación implícita (solo se carga lo último + resumen). En V2, externalizar históricos antiguos a proyecciones. |
| R-AQ-02 | **Contención transaccional por actualizaciones frecuentes** | Si un inmueble tiene muchas reformas o cambios de propietario en poco tiempo, puede haber contención en las operaciones de escritura. | El histórico es de solo añadir (append-only), lo que reduce la contención. Las actualizaciones de estado actual son transacciones rápidas. |
| R-AQ-03 | **Datos constructivos desactualizados** | Si el propietario no notifica las reformas, los datos del Inmueble quedan desactualizados. | El motor PITR detecta discrepancias durante las auditorías y puede actualizar los datos. Nunca se garantiza que los datos estén actualizados al 100% (son declarados, no verificados en tiempo real). |

### 11.2 Riesgos de dominio

| # | Riesgo | Impacto | Mitigación |
|---|--------|---------|------------|
| R-DO-01 | **Referencia catastral errónea** | El inmueble queda asociado a otra parcela catastral. | Validación de formato al crear. En V2, validación contra la Sede Electrónica del Catastro. |
| R-DO-02 | **Cambio de propietario no notificado** | El expediente se tramita con un cliente que ya no es propietario. | El AT verifica la identidad del cliente al iniciar la auditoría. Evento InmueblePropietarioCambiado notifica a expedientes activos. |
| R-DO-03 | **Datos constructivos incorrectos** | La auditoría PITR se basa en datos incorrectos y produce un resultado erróneo. | El motor PITR compara el certificado original contra evidencias. Si hay discrepancia, la detecta como contradicción. El AT resuelve durante revisión manual. |
| R-DO-04 | **Fraude en la declaración de características** | Un propietario declara características mejores que las reales para obtener mejor calificación. | Las evidencias fotográficas (CF-030) y el árbol de preguntas (CF-031) están diseñados para detectar contradicciones. El nivel de confianza refleja la fiabilidad de los datos. |

### 11.3 Riesgos de implementación (V1)

| # | Riesgo | Impacto | Mitigación |
|---|--------|---------|------------|
| R-IM-01 | **Sobrecarga de creación temprana** | Los usuarios crean inmuebles sin datos constructivos y nunca los completan. | Implementar recordatorios automáticos y expiración de inmuebles en REGISTRO sin actividad. |
| R-IM-02 | **Datos constructivos como lista infinita** | La granularidad de los datos constructivos es muy alta y nadie los completa. | Definir datos mínimos obligatorios (los necesarios para CE3X). El resto son opcionales y se completan durante la auditoría. |
| R-IM-03 | **Confusión entre agregados** | Se almacenan datos del expediente dentro del inmueble o viceversa. | CF-022 define explícitamente qué pertenece a cada agregado. Revisión de código obligatoria. |

---

## 12. Preparación V2

### 12.1 Nuevas capacidades previstas

| # | Capacidad | Descripción | Impacto en Inmueble |
|---|-----------|-------------|---------------------|
| V2-01 | **Validación contra Catastro real** | Integración con la Sede Electrónica del Catastro para verificar referencia catastral y datos de dirección. | Nuevo Value Object: `DatosCatastralesVerificados` con fecha de verificación y resultado. Nuevo evento: `InmuebleVerificadoCatastralmente`. |
| V2-02 | **Copropietarios formales** | Soporte para múltiples propietarios de un inmueble. | Nuevo Value Object: `Copropietarios` (lista de IDs de Cliente con tipo de copropiedad). El propietarioActualId sigue siendo el representante. |
| V2-03 | **Integración con contrato** | El inmueble puede estar vinculado a un contrato de servicios (mantenimiento, certificación recurrente). | Nueva referencia opcional: `contratoId` (referencia al agregado Contrato). |
| V2-04 | **Imágenes del inmueble** | Almacenar imágenes generales del inmueble (no las evidencias de auditoría, que son del Expediente). | Nuevo Value Object: `ImagenInmueble` con URL, tipo (fachada, interior, cubierta), fecha. Hasta 5 imágenes. |
| V2-05 | **Certificaciones recurrentes** | Recordatorios automáticos de renovación de certificado (10 años). | Nuevo campo derivado: `fechaProximaRenovacion` (calculada desde el último certificado). Evento: `InmuebleRenovacionProxima`. |
| V2-06 | **Clasificación energética histórica** | Almacenar la evolución de la calificación energética del inmueble. | Nuevo Value Object: `HistorialCalificaciones` (colección con calificación, fecha, expediente_id). Se actualiza mediante eventos de Expediente. |

### 12.2 Nuevos eventos V2 inducidos

| Evento | Cuándo se emite | Datos portados |
|--------|-----------------|----------------|
| `InmuebleVerificadoCatastralmente` | Tras validación exitosa contra el Catastro | inmueble_id, fecha_verificación, resultado, datos_verificados |
| `InmuebleCopropietariosActualizados` | Al añadir o eliminar copropietarios | inmueble_id, copropietarios_ids, operación |
| `InmuebleRenovacionProxima` | Cuando faltan menos de 6 meses para la renovación | inmueble_id, fecha_expiracion, ultimo_expediente_id |

### 12.3 Nuevas reglas de negocio V2

| # | Regla | Descripción |
|---|-------|-------------|
| R-V2-01 | **Validación catastral obligatoria** | Para que un inmueble pueda pasar a ACTIVO, debe tener la verificación catastral completada (V2-01). |
| R-V2-02 | **Consentimiento de copropietarios** | Si hay copropietarios, la creación de un nuevo expediente requiere el consentimiento del propietario principal (representante). Los copropietarios son notificados. |
| R-V2-03 | **Certificación recurrente automática** | Si el inmueble tiene un contrato de certificación recurrente, el sistema puede iniciar automáticamente un nuevo expediente de renovación 3 meses antes de la expiración. |

---

## 13. Preparación V3

### 13.1 Nuevas capacidades previstas

| # | Capacidad | Descripción | Impacto en Inmueble |
|---|-----------|-------------|---------------------|
| V3-01 | **Vinculación a edificio** | El inmueble puede pertenecer a un edificio (nuevo agregado Edificio). | Nueva referencia opcional: `edificioId`. |
| V3-02 | **Monitorización IoT** | El inmueble puede tener dispositivos IoT que monitoricen temperatura, humedad, consumo. | Nueva referencia desde DispositivoIoT → Inmueble (inmuebleId). El Inmueble no almacena datos IoT. |
| V3-03 | **Gemelo digital** | Modelo digital completo del inmueble con datos en tiempo real. | El Inmueble es la entidad central del gemelo digital. Los datos constructivos se enriquecen con datos dinámicos de IoT. |
| V3-04 | **Recomendaciones automáticas** | El sistema genera recomendaciones de mejora basadas en las características del inmueble y su histórico de certificaciones. | Nuevo Value Object: `Recomendaciones` (generado externamente, almacenado como proyección). |
| V3-05 | **Valoración energética** | Estimación del valor del inmueble basada en su eficiencia energética. | Dato derivado calculado externamente. No se almacena en el Inmueble. |

### 13.2 Nuevas relaciones V3

| Relación | Dirección | Tipo |
|----------|-----------|------|
| Inmueble → Edificio (edificioId) | Saliente | Referencia por ID (opcional) |
| DispositivoIoT → Inmueble (inmuebleId) | Entrante | Referencia por ID |
| Expediente → Inmueble (inmuebleId) | Entrante | Ya existe en V1 |

### 13.3 Nuevos eventos V3 inducidos

| Evento | Cuándo se emite | Datos portados |
|--------|-----------------|----------------|
| `InmuebleVinculadoAEdificio` | Al asociar el inmueble a un edificio | inmueble_id, edificio_id |
| `InmuebleDesvinculadoDeEdificio` | Al desasociar el inmueble de un edificio | inmueble_id, edificio_id_anterior |
| `RecomendacionGenerada` | Al generar nuevas recomendaciones de mejora | inmueble_id, recomendaciones_resumen |

### 13.4 Nuevas reglas V3

| # | Regla | Descripción |
|---|-------|-------------|
| R-V3-01 | **Un inmueble por edificio** | Un inmueble solo puede pertenecer a un edificio simultáneamente. |
| R-V3-02 | **Coherencia edificio-inmueble** | Si el inmueble pertenece a un edificio, su dirección debe ser coherente con la dirección del edificio (mismo municipio, misma parcela catastral). |
| R-V3-03 | **Datos IoT complementarios** | Los datos de dispositivos IoT complementan pero no reemplazan los datos constructivos del Inmueble. Los datos constructivos son la fuente de verdad para la certificación. |

### 13.5 Proyecciones V3

| Proyección | Descripción | Datos fuente |
|------------|-------------|--------------|
| **Gemelo digital** | Modelo completo del inmueble con datos estáticos (constructivos) + dinámicos (IoT) + históricos (certificaciones, reformas, propietarios) | Inmueble + DispositivoIoT + Expedientes |
| **Dashboard de eficiencia** | Vista consolidada de la eficiencia energética del inmueble a lo largo del tiempo | Inmueble + HistorialCalificaciones + Expedientes |
| **Recomendaciones de mejora** | Lista de mejoras sugeridas con impacto estimado en calificación y coste | Inmueble (características actuales) + Catálogo de mejoras + Historial de reformas |

---

> **Nota final:** El agregado Inmueble es el segundo pilar del dominio de Certilab. Su diseño debe reflejar que el inmueble es una entidad con identidad propia, independiente de los procesos transaccionales que ocurren sobre él. Las decisiones de modelado en este documento priorizan la integridad del histórico, la inmutabilidad de los eventos de cambio, y la separación clara entre datos del inmueble (constructivos, catastrales) y datos del proceso (certificación, auditoría). Cualquier implementación debe respetar los límites del agregado definidos en CF-022 y las invariantes especificadas en este documento.