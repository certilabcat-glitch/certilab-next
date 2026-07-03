# CF-021 — Domain Model

| Campo | Descripción |
|-------|-------------|
| **Código** | CF-021 |
| **Título** | Domain Model — Modelo de dominio completo de Certilab |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-03 |
| **Autor** | Certilab® — Arquitectura de Dominio |
| **Propósito** | Definir el modelo de dominio puro de Certilab, sus entidades del negocio, relaciones, reglas, eventos y ciclo de vida. Esta es la referencia arquitectónica oficial del negocio, independiente de tecnología, infraestructura o implementación. |
| **Dependencias** | CF-020 (Data Model — contexto de implementación), CF-030 (PITR Expert Knowledge Engine), CF-031 (PITR Question Tree), CF-032 (Arquitecto Técnico Inspection Manual), CF-000 (Project Brain) |
| **Audiencia** | Arquitectos de software, domain experts, product owners, desarrolladores del núcleo de dominio |
| **Lenguaje** | DDD ubicuo — términos del negocio, no términos técnicos |

---

## Índice

1. [Objetivos del dominio](#1-objetivos-del-dominio)
2. [Entidades del negocio](#2-entidades-del-negocio)
3. [Responsabilidades de cada entidad](#3-responsabilidades-de-cada-entidad)
4. [Relaciones entre entidades](#4-relaciones-entre-entidades)
5. [Ownership de la información](#5-ownership-de-la-información)
6. [Ciclo de vida de cada entidad](#6-ciclo-de-vida-de-cada-entidad)
7. [Reglas de negocio](#7-reglas-de-negocio)
8. [Eventos principales](#8-eventos-principales)
9. [Agregados](#9-agregados)
10. [Casos especiales](#10-casos-especiales)
11. [Evolución prevista para V2](#11-evolución-prevista-para-v2)
12. [Evolución prevista para V3](#12-evolución-prevista-para-v3)

---

## 1. Objetivos del dominio

### 1.1 Misión del dominio

Certilab existe para **garantizar la veracidad, trazabilidad y calidad** de los certificados de eficiencia energética en España, mediante un proceso de auditoría remota basado en evidencia fotográfica, documental y en el juicio experto del Arquitecto Técnico.

### 1.2 Objetivos estratégicos del dominio

| # | Objetivo | Descripción |
|---|----------|-------------|
| 1 | **Auditar certificados** | Verificar que cada certificado energético refleja fielmente la realidad constructiva e instalaciones del inmueble. |
| 2 | **Detectar fraudes** | Identificar contradicciones entre el certificado declarado y la evidencia real del edificio. |
| 3 | **Generar confianza** | Asignar un nivel de confianza a cada certificado basado en la calidad y completitud de la evidencia. |
| 4 | **Estandarizar la inspección** | Unificar criterios de inspección mediante la metodología PITR™, eliminando la subjetividad del técnico de campo. |
| 5 | **Trazar el histórico** | Mantener el historial completo de cada inmueble: todos sus certificados, auditorías, cambios de propietario y reformas. |
| 6 | **Escalar la revisión** | Permitir que un Arquitecto Técnico audite remotamente múltiples expedientes sin necesidad de visita presencial. |

### 1.3 Contexto acotado (Bounded Context)

Este modelo de dominio describe exclusivamente el **contexto de certificación y auditoría energética**. Quedan fuera de este modelo:
- Facturación y pagos (contexto de facturación)
- Marketing y captación de clientes (contexto comercial)
- Gestión de usuarios y roles (contexto de identidad y acceso)
- Infraestructura técnica (contexto de plataforma)

Sin embargo, estos contextos se relacionan con el dominio principal a través de eventos e integraciones acordadas.

---

## 2. Entidades del negocio

### 2.1 Mapa de entidades

```
┌─────────────────────────────────────────────────────────────┐
│                    DOMINIO CERTILAB                          │
│                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐       │
│  │ CLIENTE  │◄──>│ INMUEBLE │◄──>│   EXPEDIENTE     │       │
│  └──────────┘    └──────────┘    └────────┬─────────┘       │
│                                           │                  │
│  ┌──────────┐    ┌──────────┐    ┌────────▼─────────┐       │
│  │ USUARIO  │◄──>│ ORGANIZ. │    │   CERTIFICADO    │       │
│  └──────────┘    └──────────┘    └──────────────────┘       │
│                                           │                  │
│  ┌────────────────────────────────────────▼──────────┐      │
│  │              AUDITORÍA PITR                         │      │
│  │  ┌─────────┐  ┌──────────┐  ┌──────────────────┐   │      │
│  │  │EVIDENCIA│  │ PREGUNTA │  │CONTRADICCIÓN      │   │      │
│  │  └─────────┘  └──────────┘  └──────────────────┘   │      │
│  └─────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Descripción de entidades

#### **Cliente**
Persona física o jurídica que solicita el servicio de certificación o auditoría. Es el propietario del inmueble o su representante legal.

#### **Inmueble**
Unidad constructiva objeto de certificación. Puede ser una vivienda completa, un local comercial, o un edificio completo. Tiene una dirección, una referencia catastral y unas características físicas que determinan su comportamiento energético.

#### **Expediente**
Contenedor del proceso de certificación o auditoría. Nace cuando un cliente solicita un servicio y muere cuando se entrega el certificado auditado (o se rechaza). Alberga toda la interacción entre el cliente, el sistema PITR y el Arquitecto Técnico.

#### **Certificado**
Documento formal de eficiencia energética (según formato oficial del Ministerio o equivalente). Contiene las variables CE3X que describen el inmueble y su calificación energética (A-G). Puede ser:
- **Certificado original**: el que aporta el cliente, emitido por un técnico certificador.
- **Certificado auditado**: el resultado tras la verificación PITR, con su nivel de confianza.

#### **Usuario**
Persona que trabaja en Certilab: Arquitectos Técnicos, administradores, revisores. No es lo mismo que el Cliente.

#### **Organización**
Entidad legal que agrupa Usuarios. Puede ser una empresa de certificación, un estudio de arquitectura, o el propio Certilab como organización auditora.

#### **Auditoría PITR**
Proceso metodológico de verificación remota. Es el corazón del dominio. Contiene:
- **Evidencias**: fotografías y documentos que prueban las características declaradas.
- **Preguntas del árbol**: cada respuesta del cliente o dato extraído.
- **Contradicciones**: incompatibilidades detectadas entre evidencias o entre evidencia y certificado.
- **Nivel de confianza**: resultado agregado por variable CE3X y global.

---

## 3. Responsabilidades de cada entidad

### 3.1 Cliente

| Responsabilidad | Descripción |
|----------------|-------------|
| **Identificarse** | Proporcionar su identidad legal (nombre/NIF) para la emisión del certificado. |
| **Acreditar propiedad** | Demostrar que es propietario o representante autorizado del inmueble. |
| **Aportar documentación** | Entregar el certificado energético original, escrituras, IBIs, planos, facturas de obras. |
| **Proporcionar evidencia** | Tomar y subir las fotografías requeridas por el árbol PITR siguiendo las instrucciones. |
| **Declarar reformas** | Informar de cualquier rehabilitación o modificación relevante del inmueble. |
| **Responder preguntas** | Contestar al árbol de preguntas adaptativo sobre características del inmueble. |
| **Autorizar la auditoría** | Consentir el proceso de verificación y el tratamiento de sus datos. |

### 3.2 Inmueble

| Responsabilidad | Descripción |
|----------------|-------------|
| **Ser identificable** | Tener una dirección única y referencia catastral que lo distingan inequívocamente. |
| **Conservar su histórico** | Acumular todos los expedientes, certificados y auditorías realizadas sobre él a lo largo del tiempo. |
| **Reflejar su estado actual** | Las características registradas deben corresponder al estado actual del inmueble, no al original si ha sido reformado. |
| **Registrar su línea temporal** | Mantener la trazabilidad de cambios: año de construcción, reformas, cambios de uso, cambios de propietario. |

### 3.3 Expediente

| Responsabilidad | Descripción |
|----------------|-------------|
| **Orquestar el flujo** | Guiar el proceso desde la solicitud hasta la entrega del certificado auditado. |
| **Contener la auditoría** | Albergar la instancia de auditoría PITR asociada a esta certificación. |
| **Gestionar el estado** | Mantener y hacer evolucionar su estado: borrador, pendiente de evidencia, en revisión, auditado, rechazado, entregado. |
| **Registrar la interacción** | Conservar el historial de comunicaciones, cambios de estado y decisiones tomadas durante el proceso. |
| **Proteger la integridad** | Una vez cerrado, ningún dato del expediente puede ser modificado (solo anexado como nota). |

### 3.4 Certificado

| Responsabilidad | Descripción |
|----------------|-------------|
| **Declarar la calificación** | Contener la calificación energética del inmueble (letra A-G) y las emisiones de CO₂. |
| **Describir el inmueble** | Especificar todas las variables CE3X: envolvente, instalaciones, renovables, etc. |
| **Ser verificable** | Cada variable debe poder contrastarse con la evidencia recogida en la auditoría. |
| **Registrar su procedencia** | Indicar quién lo emitió, cuándo y con qué metodología. |
| **Portar la confianza** | Incluir el nivel de confianza asignado por la auditoría PITR a cada variable y al conjunto. |

### 3.5 Usuario

| Responsabilidad | Descripción |
|----------------|-------------|
| **Ejecutar auditorías** | Revisar expedientes, validar evidencias, resolver contradicciones y emitir dictámenes. |
| **Aplicar juicio experto** | Cuando el nivel de confianza automático no es suficiente, inspeccionar manualmente y decidir. |
| **Gestionar clientes** | Atender consultas, solicitar información adicional, coordinar el proceso. |
| **Mantener la calidad** | Velar por la integridad del proceso PITR y la calidad de las auditorías. |

### 3.6 Organización

| Responsabilidad | Descripción |
|----------------|-------------|
| **Agrupar usuarios** | Contener los perfiles profesionales que operan en Certilab. |
| **Gestionar capacidad** | Distribuir la carga de trabajo entre sus usuarios. |
| **Representar la entidad** | Actuar como la persona jurídica que presta el servicio de auditoría. |

### 3.7 Auditoría PITR

| Responsabilidad | Descripción |
|----------------|-------------|
| **Recoger evidencia** | Guiar al cliente en la captura de fotografías y documentos según el catálogo de CF-030. |
| **Ejecutar árbol de preguntas** | Formular preguntas adaptativas que determinen las características reales del inmueble. |
| **Calcular confianza** | Asignar un nivel de confianza (0-100%) a cada variable CE3X basado en la calidad y completitud de la evidencia. |
| **Detectar contradicciones** | Cruzar respuestas, evidencias y certificado original para identificar incompatibilidades. |
| **Recomendar revisión manual** | Cuando la confianza es insuficiente o hay contradicciones graves, solicitar intervención del Arquitecto Técnico. |
| **Generar informe** | Producir el informe de auditoría con la trazabilidad completa de decisiones. |

---

## 4. Relaciones entre entidades

### 4.1 Diagrama de relaciones

```
CLIENTE ──1:N──> INMUEBLE
    │                │
    │                │
    1:N              1:N
    │                │
    ▼                ▼
EXPEDIENTE ──N:1── CERTIFICADO
    │
    │ 1:1
    ▼
AUDITORÍA PITR ──1:N── EVIDENCIA
       │                │
       │ 1:N             │ 1:1
       ▼                 ▼
   PREGUNTA ──N:M── VARIABLE CE3X
                             ▲
                             │
                             │ 1:N
                             │
                     CONTRADICCIÓN

USUARIO ──N:1── ORGANIZACIÓN
    │
    │ N:M
    ▼
EXPEDIENTE (asignado a Usuario como Arquitecto Técnico)
```

### 4.2 Reglas de relación

| Relación | Cardinalidad | Reglas |
|----------|-------------|--------|
| Cliente → Inmueble | 1:N | Un cliente puede poseer varios inmuebles. Un inmueble pertenece a un único cliente en un momento dado (puede cambiar de propietario). |
| Cliente → Expediente | 1:N | Un cliente puede solicitar múltiples expedientes (para distintos inmuebles o para el mismo en diferentes momentos). |
| Inmueble → Expediente | 1:N | Un inmueble puede tener múltiples expedientes a lo largo del tiempo (renovaciones, cambios de propietario, segundas certificaciones). |
| Expediente → Certificado | N:1 | Un expediente produce exactamente un certificado auditado. Un certificado puede referenciar a varios expedientes si hay una segunda auditoría sobre el mismo certificado original. |
| Expediente → Auditoría PITR | 1:1 | Cada expediente tiene exactamente una auditoría PITR asociada (que puede estar en curso o completada). |
| Auditoría PITR → Evidencia | 1:N | Una auditoría contiene múltiples evidencias. Cada evidencia pertenece a una sola auditoría. |
| Auditoría PITR → Pregunta | 1:N | Una auditoría ejecuta múltiples preguntas del árbol. Cada pregunta se instancia en el contexto de una auditoría. |
| Auditoría PITR → Contradicción | 0:N | Una auditoría puede detectar cero o varias contradicciones. |
| Usuario → Organización | N:1 | Un usuario pertenece a una organización. Una organización contiene múltiples usuarios. |
| Usuario → Expediente | N:M | Un usuario puede estar asignado a múltiples expedientes. Un expediente puede tener múltiples usuarios involucrados (Arquitecto Técnico principal, revisor, administrador). |

---

## 5. Ownership de la información

### 5.1 Matriz de propiedad

| Entidad | Propietario | Custodio | Ciclo de retención |
|---------|-------------|----------|-------------------|
| Cliente | El propio cliente (datos personales) | Certilab (como responsable del tratamiento) | Mientras dure la relación contractual + 5 años (obligación legal). |
| Inmueble | El propietario del inmueble (derechos reales) | Certilab como registro histórico | Permanente (trazabilidad de certificados históricos del inmueble). |
| Expediente | Certilab (proceso interno) | Certilab | Mínimo 15 años (obligaciones legales de certificación energética). |
| Certificado | El cliente (documento oficial) | Certilab (copia de seguridad) | 15 años desde su emisión. |
| Evidencia fotográfica | El cliente (derechos de imagen) | Certilab (procesada y almacenada) | Hasta cierre del expediente + 1 año (salvo contradicciones, que se conservan 5 años). |
| Auditoría PITR | Certilab (metodología) | Certilab | Permanente como parte del expediente. |
| Usuario | El propio usuario (datos personales) | Organización + Certilab | Mientras dure la relación laboral + 2 años. |
| Organización | La propia organización | Certilab | Mientras tenga relación contractual activa. |

### 5.2 Principios de ownership

1. **El cliente es propietario de sus datos personales y de su certificado.** Certilab es custodio y responsable del tratamiento según RGPD.
2. **El inmueble es una entidad pública en cuanto a su certificación energética.** Los datos energéticos de un inmueble pueden ser consultados por terceros (compradores, arrendatarios) según la normativa vigente.
3. **El expediente y la auditoría PITR son propiedad intelectual de Certilab.** La metodología PITR, el árbol de preguntas y el motor de confianza son activos internos.
4. **Las evidencias fotográficas pertenecen al cliente**, pero Certilab tiene licencia para procesarlas, analizarlas y almacenarlas como parte del servicio contratado.
5. **La organización es propietaria de la relación con el cliente.** Los usuarios actúan en nombre de la organización, no a título personal.

---

## 6. Ciclo de vida de cada entidad

### 6.1 Ciclo de vida del Cliente

```
[Alta] ──> [Activo] ──> [Inactivo] ──> [Baja]
               │
               ▼
         [Con expediente en curso]
```

| Estado | Descripción | Transiciones |
|--------|-------------|--------------|
| **Alta** | El cliente se ha registrado pero aún no ha solicitado ningún servicio. | → Activo (al solicitar un expediente) |
| **Activo** | Tiene al menos un expediente en curso o completado recientemente. | → Inactivo (si no hay actividad en >12 meses) |
| **Inactivo** | No tiene expedientes activos ni recientes. | → Activo (si solicita un nuevo servicio), → Baja (por solicitud expresa) |
| **Baja** | El cliente ha solicitado la eliminación de sus datos (RGPD). | Es terminal; solo se conservan datos anonimizados para obligaciones legales. |

### 6.2 Ciclo de vida del Inmueble

```
[Registro] ──> [Activo] ──> [Histórico]
```

| Estado | Descripción |
|--------|-------------|
| **Registro** | El inmueble se da de alta con sus datos básicos (dirección, referencia catastral). |
| **Activo** | Tiene al menos un expediente en curso o es propiedad de un cliente activo. |
| **Histórico** | No tiene propietario activo conocido pero conserva su historial de certificaciones. |

**Nota:** Un inmueble nunca se elimina. Su historial de certificaciones es un registro público de interés general. Solo pasa a estado Histórico cuando no tiene cliente asociado activo.

### 6.3 Ciclo de vida del Expediente

```
[Solicitud] ──> [Pendiente de documentación] ──> [En revisión PITR] ──> [Auditado] ──> [Entregado]
       │                    │                           │
       ▼                    ▼                           ▼
 [Cancelado]          [Rechazado por               [Revisión manual]
                       falta de datos]                  │
                                                         ▼
                                                   [Aprobado ─> Entregado]
                                                      │
                                                      ▼
                                                   [Rechazado ─> Devuelto]
```

| Estado | Descripción | Reglas |
|--------|-------------|--------|
| **Solicitud** | El cliente ha solicitado el servicio con los datos mínimos. | Se asigna automáticamente un Arquitecto Técnico. |
| **Pte. documentación** | Se espera que el cliente aporte el certificado original y/o evidencias. | Si transcurren >30 días sin actividad, pasa a Cancelado. |
| **En revisión PITR** | El motor PITR está ejecutando el árbol de preguntas y procesando evidencias. | Automático; no requiere intervención humana salvo contradicciones. |
| **Auditado** | La auditoría PITR ha completado el análisis. | Se genera el informe de confianza. |
| **Revisión manual** | El nivel de confianza no alcanza el umbral mínimo o hay contradicciones que requieren juicio experto. | Intervención obligatoria del Arquitecto Técnico. |
| **Aprobado** | El Arquitecto Técnico valida el resultado de la auditoría. | Se genera el certificado auditado. |
| **Rechazado** | El certificado original contiene incorrecciones graves o la evidencia es insuficiente. | Se notifica al cliente con el detalle de las discrepancias. |
| **Entregado** | El certificado auditado se ha entregado al cliente. | Estado terminal. No se puede modificar. Se puede anexar documentación. |
| **Cancelado** | El cliente desiste o el expediente expira por inactividad. | Estado terminal. No se entrega certificado. |
| **Devuelto** | El certificado fue rechazado y se devuelve al cliente para corrección. | El cliente puede corregir y reiniciar el proceso (nuevo expediente). |

### 6.4 Ciclo de vida del Certificado

```
[Original recibido] ──> [En verificación] ──> [Auditado] ──> [Entregado]
                            │                      │
                            ▼                      ▼
                     [Discrepante]          [Rechazado]
```

| Estado | Descripción |
|--------|-------------|
| **Original recibido** | El certificado original ha sido aportado por el cliente y está pendiente de verificación. |
| **En verificación** | El motor PITR está cotejando las variables del certificado con la evidencia. |
| **Discrepante** | Se han detectado contradicciones entre el certificado y la evidencia. |
| **Auditado** | El certificado ha sido verificado y se le ha asignado un nivel de confianza. |
| **Entregado** | El certificado auditado ha sido entregado al cliente. |
| **Rechazado** | El certificado original contenía errores graves y no puede ser auditado favorablemente. |

### 6.5 Ciclo de vida de la Auditoría PITR

```
[Iniciada] ──> [Recogiendo evidencia] ──> [Procesando] ──> [Completada]
                    │                           │
                    ▼                           ▼
             [Pausada por                  [Requiere revisión manual]
              falta de datos]
```

| Estado | Descripción |
|--------|-------------|
| **Iniciada** | La auditoría comienza cuando el expediente entra en revisión. |
| **Recogiendo evidencia** | El sistema solicita evidencias al cliente mediante el árbol de preguntas. |
| **Procesando** | Las evidencias se están analizando y cotejando con el certificado original. |
| **Pausada por falta de datos** | No se ha recibido la evidencia requerida tras varios recordatorios. |
| **Completada** | La auditoría ha finalizado con un nivel de confianza determinado. |
| **Requiere revisión manual** | El sistema ha delegado la decisión final a un Arquitecto Técnico. |

### 6.6 Ciclo de vida del Usuario

```
[Invitado] ──> [Activo] ──> [Suspendido] ──> [Baja]
```

### 6.7 Ciclo de vida de la Organización

```
[Registrada] ──> [Activa] ──> [Suspendida] ──> [Cancelada]
```

---

## 7. Reglas de negocio

### 7.1 Reglas del Cliente

| # | Regla | Descripción | Incumplimiento |
|---|-------|-------------|----------------|
| R-CL-01 | **Unicidad de cliente** | Un cliente se identifica por su NIF/NIE. No puede haber dos clientes activos con el mismo NIF. | Se fusionan los registros duplicados. |
| R-CL-02 | **Acreditación de propiedad** | Para iniciar un expediente, el cliente debe acreditar ser propietario del inmueble o tener representación legal. | No se puede iniciar el expediente. |
| R-CL-03 | **Consentimiento informado** | El cliente debe aceptar explícitamente las condiciones del servicio y el tratamiento de sus datos. | No se puede procesar el expediente. |
| R-CL-04 | **Identidad verificada** | La identidad del cliente debe ser verificada antes de la entrega del certificado auditado. | No se puede entregar el certificado. |

### 7.2 Reglas del Inmueble

| # | Regla | Descripción | Incumplimiento |
|---|-------|-------------|----------------|
| R-IN-01 | **Unicidad catastral** | Un inmueble se identifica por su referencia catastral. No pueden existir dos inmuebles con la misma referencia en activo. | Se unifican los registros. |
| R-IN-02 | **Dirección única** | La dirección postal debe ser única en la base de datos. | Se normaliza la dirección. |
| R-IN-03 | **Actualización de estado** | Si se detecta una reforma durante la auditoría, el estado del inmueble debe actualizarse. | El informe de auditoría reflejará la discrepancia. |
| R-IN-04 | **Trazabilidad perpetua** | Un inmueble nunca se elimina; solo pasa a histórico si no tiene propietario activo. | — |

### 7.3 Reglas del Expediente

| # | Regla | Descripción | Incumplimiento |
|---|-------|-------------|----------------|
| R-EX-01 | **Un expediente activo por inmueble** | Un inmueble no puede tener más de un expediente en curso simultáneamente (solo el último expediente abierto es válido). | Se cierra el anterior o se rechaza la nueva solicitud. |
| R-EX-02 | **Caducidad por inactividad** | Si un expediente permanece en "Pendiente de documentación" más de 30 días sin actividad del cliente, pasa automáticamente a Cancelado. | El cliente debe solicitar un nuevo expediente. |
| R-EX-03 | **Asignación automática** | Todo expediente en estado Solicitud debe asignarse a un Arquitecto Técnico disponible en un plazo máximo de 24 horas laborables. | Se escala al administrador de la organización. |
| R-EX-04 | **Inmutabilidad post-entrega** | Una vez que un expediente alcanza el estado Entregado, ningún dato puede ser modificado. Solo se permiten anexos o notas aclaratorias. | Se requiere un nuevo expediente para correcciones. |
| R-EX-05 | **Segunda oportunidad** | Si un expediente fue Rechazado, el cliente puede solicitar un nuevo expediente con las correcciones indicadas. | El nuevo expediente referenciará al anterior como antecedente. |
| R-EX-06 | **Prioridad de revisión manual** | Los expedientes que requieren revisión manual tienen prioridad sobre los que están en proceso automático. | — |

### 7.4 Reglas del Certificado

| # | Regla | Descripción | Incumplimiento |
|---|-------|-------------|----------------|
| R-CE-01 | **Formato oficial** | El certificado emitido debe cumplir con el formato oficial vigente del Ministerio (o el que corresponda por normativa autonómica). | No se puede entregar. |
| R-CE-02 | **Variables CE3X completas** | Todas las variables CE3X deben tener un valor (aunque sea estimado por defecto). | No se puede completar la auditoría. |
| R-CE-03 | **Confianza mínima** | Para que un certificado sea entregado sin revisión manual, la confianza global debe ser ≥ 80% y ninguna variable crítica puede tener confianza < 60%. | Requiere revisión manual obligatoria. |
| R-CE-04 | **Trazabilidad de origen** | El certificado auditado debe indicar claramente: (a) el certificado original del que parte, (b) las modificaciones realizadas, (c) el nivel de confianza de cada variable. | No cumple los requisitos de transparencia. |
| R-CE-05 | **Validez temporal** | El certificado auditado hereda la fecha de validez del certificado original. Si el original ha expirado, se notifica al cliente. | Se indica en el informe pero no impide la auditoría. |

### 7.5 Reglas de la Auditoría PITR

| # | Regla | Descripción | Incumplimiento |
|---|-------|-------------|----------------|
| R-PI-01 | **Evidencia mínima por variable** | Cada variable CE3X debe estar respaldada por al menos una evidencia del catálogo CF-030 (fotografía o documento). | La confianza de esa variable se reduce automáticamente. |
| R-PI-02 | **Priorización dinámica** | El árbol de preguntas debe formular primero las preguntas de alta prioridad (variables críticas: C1, C2, H1, H3, F1, F2). | El sistema debe garantizar que las variables críticas tienen suficiente evidencia antes de saltar preguntas de baja prioridad. |
| R-PI-03 | **Resolución de contradicciones** | Cuando se detecta una contradicción, se debe abrir una rama de resolución antes de continuar con el árbol principal. | La auditoría no puede completarse hasta resolver (o documentar) todas las contradicciones. |
| R-PI-04 | **Umbral de revisión manual** | Se requiere revisión manual si: (a) confianza global < 80%, (b) cualquier variable crítica tiene confianza < 60%, (c) hay contradicciones graves sin resolver, (d) se detectan grietas > 2mm en fachada o patologías estructurales. | El Arquitecto Técnico debe intervenir obligatoriamente. |
| R-PI-05 | **Trazabilidad de decisiones** | Cada decisión automatizada del motor PITR debe quedar registrada con: regla aplicada, evidencias consideradas, nivel de confianza asignado y marca temporal. | La auditoría no cumple los requisitos de trazabilidad. |
| R-PI-06 | **Revisión humana final** | Todo expediente, incluso si supera el umbral de confianza automático, debe ser revisado por un Arquitecto Técnico antes de la entrega (revisión ligera de confirmación). | No se puede entregar el certificado auditado. |
| R-PI-07 | **Catálogo de evidencia estandarizado** | Todas las evidencias deben codificarse según el catálogo CF-030 (F-xxx, H-xxx, D-xxx, I-xxx). | La evidencia no es válida para la auditoría. |

### 7.6 Reglas de Usuario y Organización

| # | Regla | Descripción |
|---|-------|-------------|
| R-US-01 | **Competencia profesional** | Solo los usuarios con perfil de Arquitecto Técnico pueden realizar revisiones manuales y firmar dictámenes. |
| R-US-02 | **Separación de funciones** | El mismo usuario no puede ser el Arquitecto Técnico principal y el revisor del mismo expediente. |
| R-US-03 | **Capacidad máxima** | Un Arquitecto Técnico no puede tener más de N expedientes asignados simultáneamente en estado activo (N configurable por organización). |
| R-US-04 | **Actuación en nombre de** | El usuario siempre actúa en representación de su organización, no a título personal. |

---

## 8. Eventos principales

### 8.1 Eventos de dominio

| Evento | Descripción | Origen | Destino | Datos portados |
|--------|-------------|--------|---------|----------------|
| **ClienteRegistrado** | Un nuevo cliente se ha dado de alta en el sistema. | Módulo de registro | Contexto de expedientes | ID Cliente, NIF, nombre, email |
| **InmuebleRegistrado** | Un nuevo inmueble se ha asociado a un cliente. | Contexto de expedientes | Contexto de histórico | ID Inmueble, referencia catastral, dirección |
| **ExpedienteSolicitado** | Un cliente ha solicitado un nuevo servicio. | Portal del cliente | Motor PITR, sistema de asignación | ID Expediente, ID Cliente, ID Inmueble, tipo de servicio |
| **ExpedienteAsignado** | Un Arquitecto Técnico ha sido asignado al expediente. | Sistema de asignación | Notificaciones | ID Expediente, ID Usuario AT |
| **DocumentacionRecibida** | El cliente ha aportado el certificado original y/o evidencias. | Portal del cliente | Motor PITR | ID Expediente, lista de documentos recibidos |
| **AuditoriaIniciada** | El motor PITR comienza el procesamiento del expediente. | Motor PITR | Expediente | ID Expediente, timestamp |
| **EvidenciaAnalizada** | Una evidencia ha sido procesada y su información extraída. | Motor PITR | Árbol de preguntas | ID Evidencia, variables CE3X afectadas, nivel de confianza parcial |
| **ContradiccionDetectada** | El sistema ha encontrado una incompatibilidad entre evidencias o entre evidencia y certificado. | Motor PITR | Expediente, Arquitecto Técnico | ID Contradicción, variables implicadas, descripción, nivel de gravedad |
| **ContradiccionResuelta** | Una contradicción ha sido resuelta (automática o manualmente). | Motor PITR o AT | Expediente | ID Contradicción, resolución adoptada |
| **ConfianzaCalculada** | El nivel de confianza global y por variable ha sido determinado. | Motor PITR | Expediente | Confianza global, confianza por variable CE3X |
| **RevisionManualRequerida** | El sistema determina que se necesita intervención humana. | Motor PITR | Cola de revisión manual | ID Expediente, motivo(s), variables problemáticas |
| **ExpedienteAprobado** | El Arquitecto Técnico valida el resultado de la auditoría. | Arquitecto Técnico | Expediente | ID Expediente, ID Usuario AT, timestamp |
| **ExpedienteRechazado** | El expediente es rechazado por incorrecciones graves. | Arquitecto Técnico | Cliente | ID Expediente, motivo del rechazo, acciones correctivas sugeridas |
| **CertificadoEntregado** | El certificado auditado ha sido entregado al cliente. | Sistema de entrega | Cliente | ID Certificado, ID Expediente, enlace de descarga |
| **InmuebleActualizado** | Se han detectado cambios en las características del inmueble (reforma, cambio de uso). | Motor PITR o AT | Histórico del inmueble | ID Inmueble, cambios detectados, origen (auditoría) |
| **CambioPropietarioRegistrado** | El inmueble ha cambiado de propietario. | Cliente nuevo | Histórico del inmueble | ID Inmueble, ID Cliente anterior, ID Cliente nuevo, fecha |

### 8.2 Flujo de eventos principal (happy path)

```
ClienteRegistrado
    │
    ▼
InmuebleRegistrado
    │
    ▼
ExpedienteSolicitado
    │
    ▼
ExpedienteAsignado
    │
    ▼
DocumentacionRecibida
    │
    ▼
AuditoriaIniciada
    │
    ▼
    ├── EvidenciaAnalizada (se repite por cada evidencia)
    ├── (opcional) ContradiccionDetectada → ContradiccionResuelta
    │
    ▼
ConfianzaCalculada
    │
    ├── Confianza ≥ 80% → ExpedienteAprobado → CertificadoEntregado
    └── Confianza < 80% → RevisionManualRequerida → ExpedienteAprobado/Rechazado → CertificadoEntregado
```

---

## 9. Agregados

### 9.1 Definición de agregados

Los agregados agrupan entidades que deben mantenerse consistentes entre sí. Cada agregado tiene una raíz y un límite transaccional.

### 9.2 Agregado: Cliente

```
RAÍZ: Cliente
├── Inmuebles (colección de inmuebles del cliente)
└── Expedientes (colección de expedientes del cliente)
```

**Reglas del agregado:**
- Para modificar los datos del cliente, se debe acceder a través de la raíz Cliente.
- Un Inmueble no puede existir sin un Cliente raíz.
- Los Expedientes se crean siempre desde el Cliente.

### 9.3 Agregado: Expediente

```
RAÍZ: Expediente
├── Certificado (1:1 — el certificado que se está auditando)
├── Auditoría PITR (1:1)
│   ├── Evidencias (colección)
│   ├── Preguntas respondidas (colección)
│   └── Contradicciones (colección)
└── Historial de cambios de estado (colección)
```

**Reglas del agregado:**
- Este es el agregado más importante del dominio. Contiene la consistencia transaccional del proceso de auditoría.
- Las evidencias, preguntas y contradicciones solo se modifican a través de la Auditoría PITR, que a su vez solo se accede desde el Expediente.
- El Certificado no puede modificarse una vez que el Expediente ha sido Entregado.
- Los cambios de estado del Expediente son inmutables (solo añadir, no modificar ni eliminar).

### 9.4 Agregado: Inmueble

```
RAÍZ: Inmueble
└── Historial de certificaciones (colección de referencias a Expedientes)
```

**Reglas del agregado:**
- El Inmueble es un agregado de solo lectura para la mayoría de las operaciones.
- Solo se modifica cuando: (a) se actualiza su dirección o referencia catastral, (b) se registra un cambio de propietario, (c) una auditoría detecta cambios en sus características.
- El histórico de certificaciones es inmutable.

### 9.5 Agregado: Organización

```
RAÍZ: Organización
└── Usuarios (colección de usuarios pertenecientes)
```

**Reglas del agregado:**
- La Organización es la raíz para operaciones de gestión de personal.
- Los Usuarios se crean, modifican o eliminan a través de la Organización.
- Un Usuario no puede existir sin una Organización.

---

## 10. Casos especiales

### 10.1 Cambio de propietario del inmueble

**Escenario:** El inmueble se vende y el nuevo propietario solicita un nuevo certificado o quiere acceder al histórico del inmueble.

**Mecanismo:**
1. El nuevo propietario se registra como Cliente (o se verifica que ya existe).
2. El Inmueble se vincula al nuevo Cliente (sin perder el vínculo con el anterior).
3. Se crea un evento `CambioPropietarioRegistrado` en el histórico del inmueble.
4. El nuevo propietario puede ver los expedientes anteriores (solo datos no personales del anterior propietario).
5. Los expedientes anteriores permanecen inmutables, referenciando al propietario anterior.

**Reglas:**
- El cambio de propietario no invalida los certificados anteriores (siguen siendo válidos hasta su fecha de expiración).
- El nuevo propietario puede solicitar un nuevo expediente sin necesidad de que el anterior esté cerrado.
- El histórico del inmueble conserva la trazabilidad completa de propietarios y certificados.

### 10.2 Varios clientes para un mismo inmueble

**Escenario:** Un inmueble tiene varios copropietarios (comunidad de bienes, herencia, cónyuges).

**Mecanismo:**
1. Se designa un **Cliente principal** que actúa como representante.
2. Los **copropietarios** se vinculan al inmueble como clientes secundarios.
3. El cliente principal es el responsable de la solicitud y recibe las notificaciones.
4. Los copropietarios pueden consultar el estado del expediente.

**Reglas:**
- Solo el cliente principal puede autorizar la auditoría y recibir el certificado.
- Cualquier copropietario puede solicitar un nuevo expediente sobre el mismo inmueble.
- La identidad de todos los copropietarios debe constar en el expediente.
- Si un copropietario quiere actuar como principal, se requiere acuerdo de la mayoría o documento notarial.

### 10.3 Varios expedientes sobre el mismo inmueble

**Escenario:** El mismo inmueble tiene múltiples certificaciones a lo largo del tiempo (renovación cada 10 años, reformas, cambios de normativa).

**Mecanismo:**
1. Cada expediente es independiente y tiene su propio ciclo de vida.
2. Los expedientes se ordenan cronológicamente en el histórico del inmueble.
3. Un nuevo expediente puede referenciar al anterior como antecedente.
4. Si hay un expediente en curso, no se puede abrir otro (regla R-EX-01).

**Reglas:**
- Cada expediente produce su propio certificado auditado.
- Los certificados anteriores no se modifican; cada uno refleja el estado del inmueble en su momento.
- El árbol de preguntas PITR puede pre-cargar respuestas del expediente anterior (con menor confianza, requiriendo reconfirmación).
- Si el inmueble ha sido reformado, se debe iniciar un nuevo expediente; el anterior queda como histórico.

### 10.4 Segundas certificaciones (segunda opinión)

**Escenario:** Un cliente tiene un certificado emitido por un técnico A y quiere que Certilab emita un segundo certificado (posiblemente con calificación diferente).

**Mecanismo:**
1. Se crea un expediente de tipo **Segunda Certificación** (no de auditoría).
2. El cliente aporta el certificado original del técnico A.
3. El motor PITR ejecuta la auditoría sobre el inmueble.
4. Si el resultado difiere del certificado original, se genera un informe de discrepancias.
5. El cliente decide si quiere: (a) aceptar el nuevo certificado auditado como definitivo, (b) mantener el original con el informe de discrepancias adjunto, (c) solicitar revisión manual por un Arquitecto Técnico.

**Reglas:**
- La segunda certificación NO invalida automáticamente la primera certificación.
- El cliente es libre de usar cualquiera de los dos certificados (el original o el auditado).
- Certilab no se hace responsable de las consecuencias legales de usar un certificado discrepante.
- Si la discrepancia es grave (diferencia de ≥2 letras en la calificación), se recomienda encarecidamente la revisión manual.

### 10.5 Histórico del inmueble

**Escenario:** Se necesita reconstruir la línea temporal completa de un inmueble: todos sus certificados, reformas, cambios de propietario y auditorías.

**Mecanismo:**
1. El histórico es una proyección de solo lectura construida a partir de los eventos registrados.
2. Cada evento relevante (nuevo certificado, reforma, cambio de propietario, auditoría) se añade a la línea temporal.
3. El histórico se presenta como una cronología ordenada con los datos no personales de cada evento.

**Datos del histórico (por evento):**
- Fecha del evento
- Tipo de evento (certificación, auditoría, cambio de propietario, reforma)
- Descripción resumida
- Calificación energética (si aplica)
- Enlace al expediente completo (solo para el propietario actual)

**Reglas:**
- El histórico es público en cuanto a los datos energéticos del inmueble (calificación, emisiones).
- Los datos personales de propietarios anteriores NO son públicos.
- Solo el propietario actual puede ver los datos completos del histórico.
- Las reformas detectadas en auditorías se incorporan automáticamente al histórico.

---

## 11. Evolución prevista para V2

### 11.1 Nuevas entidades previstas

| Entidad | Descripción |
|---------|-------------|
| **Contrato** | Acuerdo formal entre el cliente y Certilab (o la organización) que estandariza el servicio, los plazos y las condiciones. |
| **Factura** | Documento de cobro asociado a un expediente o a un contrato. |
| **Plantilla de certificado** | Configuración de variables CE3X por tipo de inmueble (vivienda, local, edificio completo) para agilizar la auditoría. |
| **Notificación** | Comunicación programada al cliente (recordatorios de evidencia, cambios de estado, alertas). |

### 11.2 Nuevas relaciones V2

- **Cliente → Contrato**: Un cliente puede tener múltiples contratos (servicio continuado, no por expediente).
- **Contrato → Expediente**: Un expediente se enmarca dentro de un contrato.
- **Expediente → Factura**: Un expediente genera una factura (o varias, si hay revisión manual adicional).
- **Organización → Contrato**: La organización puede tener contratos marco con clientes corporativos.

### 11.3 Nuevas reglas de negocio V2

| # | Regla | Descripción |
|---|-------|-------------|
| R-V2-01 | **Contrato obligatorio** | Todo expediente debe estar asociado a un contrato vigente. |
| R-V2-02 | **Límite de expedientes por contrato** | Un contrato puede establecer un número máximo de expedientes incluidos. |
| R-V2-03 | **Facturación por evento** | La revisión manual genera un coste adicional sobre el precio base del expediente. |
| R-V2-04 | **Notificaciones configurables** | El cliente puede configurar los canales y la frecuencia de las notificaciones. |

### 11.4 Nuevos eventos V2

| Evento | Descripción |
|--------|-------------|
| ContratoCreado | Se ha formalizado un nuevo contrato con un cliente. |
| ContratoExpirado | El contrato ha llegado a su fecha de fin. |
| FacturaEmitida | Se ha generado una factura asociada a un expediente. |
| NotificacionEnviada | Se ha enviado una notificación al cliente. |
| PlantillaCreada | Se ha creado una nueva plantilla de certificado. |

### 11.5 Mejoras en el ciclo de vida V2

- **Expediente**: Nuevos estados "Pendiente de pago" y "En disputa" para gestionar incidencias de facturación.
- **Cliente**: Nueva clasificación "Cliente corporativo" con gestión de múltiples contactos internos.

---

## 12. Evolución prevista para V3

### 12.1 Nuevas entidades previstas

| Entidad | Descripción |
|---------|-------------|
| **Edificio** | Agrupación de inmuebles que pertenecen a un mismo edificio (comunidad de propietarios). Permite certificar el edificio completo o partes comunes. |
| **Certificador externo** | Técnico certificador acreditado por Certilab que puede realizar inspecciones presenciales cuando la auditoría remota lo requiere. |
| **Dispositivo IoT** | Sensor o dispositivo conectado que monitoriza en tiempo real variables energéticas del inmueble (temperatura, humedad, consumo). |
| **Informe energético** | Documento generado a partir de datos históricos del inmueble que muestra la evolución de su eficiencia energética. |
| **Recomendación** | Sugerencia de mejora energética generada por el sistema basada en las deficiencias detectadas durante la auditoría. |

### 12.2 Nuevas relaciones V3

- **Inmueble → Edificio**: Un inmueble pertenece a un edificio. Un edificio contiene múltiples inmuebles.
- **Edificio → Expediente**: Se puede abrir un expediente para certificar el edificio completo (partes comunes).
- **Inmueble → Dispositivo IoT**: Un inmueble puede tener cero o más dispositivos IoT monitorizando sus condiciones.
- **Expediente → Recomendación**: Cada expediente puede generar cero o más recomendaciones de mejora.
- **Certificador externo → Expediente**: Un certificador externo puede ser asignado a un expediente que requiera visita presencial.

### 12.3 Nuevas reglas de negocio V3

| # | Regla | Descripción |
|---|-------|-------------|
| R-V3-01 | **Certificación de edificio completo** | Se puede certificar un edificio completo (no solo unidades individuales) para obtener la calificación del conjunto. |
| R-V3-02 | **Monitorización continua** | Los dispositivos IoT pueden proporcionar datos en tiempo real que complementan (o sustituyen) la evidencia fotográfica para ciertas variables. |
| R-V3-03 | **Recomendaciones automatizadas** | El sistema genera recomendaciones de mejora basadas en las variables con peor calificación y la viabilidad técnica inferida. |
| R-V3-04 | **Red de certificadores externos** | Los certificadores externos son profesionales acreditados por Certilab que pueden realizar visitas presenciales bajo demanda. |
| R-V3-05 | **Evaluación de edificios colindantes** | Para edificios adosados, el sistema puede considerar datos de inmuebles colindantes certificados para mejorar la precisión de la auditoría. |

### 12.4 Nuevos eventos V3

| Evento | Descripción |
|--------|-------------|
| EdificioCreado | Se ha registrado un nuevo edificio en el sistema. |
| InmuebleVinculadoAEdificio | Se ha asociado un inmueble a un edificio. |
| DispositivoIoTVinculado | Un nuevo dispositivo IoT se ha asociado a un inmueble. |
| LecturaIoTRecibida | Se ha recibido una lectura de un dispositivo IoT. |
| RecomendacionGenerada | El sistema ha generado una recomendación de mejora. |
| CertificadorAsignado | Un certificador externo ha sido asignado a un expediente para visita presencial. |
| VisitaPresencialCompletada | El certificador externo ha completado la visita y ha subido la documentación. |

### 12.5 Mejoras en el ciclo de vida V3

- **Inmueble**: Nuevo estado "Monitorizado" cuando tiene dispositivos IoT activos.
- **Expediente**: Nuevo estado "En visita presencial" cuando se ha solicitado intervención de un certificador externo.
- **Certificado**: Nueva funcionalidad de "Certificado dinámico" que se actualiza con datos de monitorización continua (solo para fines informativos, no reemplaza al certificado oficial).

---

> **Nota final:** Este documento describe el modelo de dominio puro de Certilab, independiente de cualquier tecnología, infraestructura o implementación. Todas las decisiones sobre persistencia, APIs, interfaces de usuario o despliegue deben derivarse de este modelo de dominio, no al revés. El dominio es el corazón del negocio; la tecnología es un detalle.