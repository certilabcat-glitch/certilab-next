# GLOSARIO-PRD-001 — Glosario Oficial de Términos para PRD-001 (ATI03)

| Campo | Valor |
|-------|-------|
| **Código** | GLOSARIO-PRD-001 |
| **Título** | Glosario Oficial de Términos para PRD-001 ATI03 |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-07 |
| **Estado** | ✅ APROBADO |
| **Alcance** | RF-002, RF-003, RF-004 de la Capa 1 del PRD-001 |
| **Propósito** | Unificar el vocabulario utilizado por los requisitos funcionales de la Capa 1 para garantizar consistencia terminológica en documentos, código, UI y comunicaciones con el cliente. |

---

## Índice

1. [Introducción](#1-introducción)
2. [Glosario alfabético](#2-glosario-alfabético)
3. [Términos prohibidos y sustitutos](#3-términos-prohibidos-y-sustitutos)
4. [Validación de documentos](#4-validación-de-documentos)

---

## 1. Introducción

### 1.1 Propósito del glosario

Este glosario establece el **vocabulario oficial** para todos los documentos, requisitos, código y comunicaciones relacionadas con PRD-001 (ATI03 — Informe Técnico Energético). Su objetivo es:

- **Eliminar ambigüedades** terminológicas entre RF-002, RF-003 y RF-004
- **Garantizar consistencia** en la nomenclatura usada en análisis, especificación, implementación y UI
- **Facilitar la trazabilidad** entre documentos mediante términos compartidos y estables
- **Servir como referencia** para la creación de nuevos RFs y documentación futura

### 1.2 Convenciones del glosario

- Cada entrada incluye: **Término oficial**, **Definición**, **Sinónimos aceptados**, **Términos prohibidos**, **Referencia cruzada** (RF donde se usa) y **Notas** si aplica.
- Los términos marcados con ™ son marcas registradas de Certilab.
- Los términos en **negrita** son los términos oficiales que deben usarse en todos los documentos.

### 1.3 Relación con otros documentos

| Documento | Relación |
|-----------|----------|
| PRD-FRAMEWORK-001 | Framework que define la estructura de PRDs. Este glosario es una sección opcional según PRD-FRAMEWORK-001 sección 3.3. |
| RF-002-NIVEL-DE-CONFIANZA | Primer RF de la Capa 1. Define el Nivel de Confianza del Diagnóstico. |
| RF-003-JERARQUIA-DE-DECISIONES | Segundo RF de la Capa 1. Incluye su propia convención de lenguaje (sección 14) que este glosario extiende y armoniza con RF-002 y RF-004. |
| RF-004-IMPACTO-DE-ACTUACIONES | Tercer RF de la Capa 1. Define los Beneficios Esperados de las Actuaciones. |
| CF-000-PROJECT-BRAIN | Constitución del proyecto. Marco normativo. |
| CF-021-DOMAIN-MODEL | Modelo de dominio con las entidades del Core V1. |

---

## 2. Glosario alfabético

### A

#### Actuación
- **Definición:** Cada una de las intervenciones o medidas correctoras identificadas por el AT sobre el inmueble durante la inspección PITR™. Una actuación puede ser una reparación, una mejora, una sustitución o una instalación nueva.
- **Sinónimos aceptados:** Medida correctora, intervención.
- **Términos prohibidos:** Tarea, acción (sin calificar), ítem, punto de mejora.
- **Uso en RFs:** RF-003 (evaluación multicriterio), RF-004 (beneficios esperados).
- **Notas:** Cada actuación se evalúa individualmente en los 7 criterios de RF-003. RF-004 calcula los beneficios esperados de cada actuación.

#### Arquitecto Técnico (AT)
- **Definición:** Profesional técnico colegiado responsable de realizar la inspección PITR™, asignar las valoraciones, revisar el orden recomendado y validar el informe final. Es el **decisor final** de todo el proceso.
- **Sinónimos aceptados:** AT, técnico inspector.
- **Términos prohibidos:** Usuario técnico, inspector (sin el contexto de AT), evaluador.
- **Uso en RFs:** RF-002 (asigna nivel de confianza), RF-003 (revisa y modifica el orden recomendado), RF-004 (valida las estimaciones).

---

### B

#### Beneficios Esperados
- **Definición:** Conjunto de estimaciones económicas, energéticas y de confort que resultarían de implementar una actuación. Incluye: ahorro energético anual (kWh/año y €/año), mejora de calificación energética, impacto en confort, inversión estimada y plazo de amortización.
- **Sinónimos aceptados:** Impacto esperado, retorno estimado.
- **Términos prohibidos:** Ahorro garantizado, beneficio asegurado, retorno fijo.
- **Uso en RFs:** RF-004 (definición principal).
- **Notas:** Todos los beneficios son **estimaciones** basadas en los datos de la inspección. Su confianza depende del Nivel de Confianza del módulo correspondiente (RF-002).

---

### C

#### Cliente
- **Definición:** Persona física o jurídica que contrata el servicio de Informe Técnico Energético (ATI03). Puede ser propietario, comprador, comunidad de propietarios o inversor. Es el **destinatario final** del documento de decisiones.
- **Sinónimos aceptados:** Propietario, usuario final, destinatario.
- **Términos prohibidos:** Comprador (salvo en perfil de venta), lead, prospect.
- **Uso en RFs:** RF-002 (ve nivel de confianza), RF-003 (ve jerarquía priorizada y explicaciones), RF-004 (ve estimaciones de beneficios).
- **Notas:** El perfil del cliente (vender, reformar, presupuesto limitado, comunidad) ajusta direccionalmente la ponderación en RF-003.

#### Confianza de la Estimación
- **Definición:** Indicador del nivel de fiabilidad de cada beneficio estimado en RF-004. Se deriva del Nivel de Confianza por Módulo (RF-002) correspondiente al tipo de dato del que depende el beneficio.
- **Sinónimos aceptados:** Fiabilidad de la estimación.
- **Términos prohibidos:** Precisión de la estimación, exactitud, margen de error (salvo que se especifique numéricamente).
- **Uso en RFs:** RF-002 (origen del dato), RF-004 (destino del dato).
- **Notas:** Se muestra al cliente con los mismos niveles y colores que RF-002: 🟢 Alta / 🟡 Media / 🔴 Baja.

#### Confianza por Módulo
- **Definición:** Nivel de confianza específico para cada categoría de datos de la inspección: geométricos, cerramientos, instalaciones y confort térmico. Complementa la Confianza Global proporcionando granularidad.
- **Sinónimos aceptados:** Confianza por categoría, confianza específica.
- **Términos prohibidos:** Subconfianza, confianza parcial.
- **Uso en RFs:** RF-002 (definición principal), RF-004 (alimenta Confianza de la Estimación).

---

### D

#### Diagnóstico
- **Definición:** Resultado completo del proceso de inspección PITR™ que incluye la identificación de problemas, la evaluación del inmueble y las recomendaciones del AT. Es el contenido sobre el que se determina el Nivel de Confianza.
- **Sinónimos aceptados:** Evaluación técnica, análisis del inmueble.
- **Términos prohibidos:** Auditoría (salvo en contexto legal), revisión genérica.
- **Uso en RFs:** RF-002 (objeto del nivel de confianza), RF-003 (base para la priorización), RF-004 (base para las estimaciones).
- **Notas:** No confundir con "Documento de Decisiones" que es el formato entregable al cliente.

#### Documento de Decisiones
- **Definición:** Documento entregable al cliente que integra la información del inmueble (RF-001), el Nivel de Confianza (RF-002), la Jerarquía Priorizada (RF-003) y los Beneficios Esperados (RF-004). Es el **producto final** que recibe el cliente.
- **Sinónimos aceptados:** Informe final, documento entregable, ATI03.
- **Términos prohibidos:** Certificado, informe genérico, documento técnico (sin más contexto).
- **Uso en RFs:** RF-002 (contiene la sección de confianza), RF-003 (contiene la jerarquía), RF-004 (contiene las estimaciones).

---

### E

#### Estimación
- **Definición:** Valor calculado o proyectado de un beneficio esperado (ahorro, mejora de calificación, etc.) basado en los datos disponibles y el juicio profesional del AT. No es una garantía ni una medición exacta.
- **Sinónimos aceptados:** Proyección, cálculo estimado.
- **Términos prohibidos:** Garantía, cifra exacta, valor asegurado.
- **Uso en RFs:** RF-004 (definición principal).

#### Evaluación Multicriterio
- **Definición:** Modelo de valoración de actuaciones basado en 7 criterios (seguridad, normativa, coste energético, amortización, confort, viabilidad, ahorro energético). Cada actuación recibe una valoración 1-10 por criterio asignada por el AT, y el sistema calcula una puntuación compuesta para generar un orden recomendado.
- **Sinónimos aceptados:** Modelo multicriterio, scoring técnico.
- **Términos prohibidos:** Algoritmo de decisión, sistema automático de priorización.
- **Uso en RFs:** RF-003 (definición principal).

#### Expediente
- **Definición:** Agregado del Core V1 que contiene todos los datos de un caso de diagnóstico: cliente, inmueble, inspección, actuaciones, valoraciones, documentos generados y estado del proceso.
- **Sinónimos aceptados:** Caso, expediente técnico.
- **Términos prohibidos:** Ticket, orden, proyecto.
- **Uso en RFs:** RF-002 (contiene el nivel de confianza), RF-003 (contiene la jerarquía y Justification Log), RF-004 (contiene las estimaciones).
- **Notas:** Entidad del Core V1 definida en CF-021-DOMAIN-MODEL y CF-026-EXPEDIENTE-DESIGN.

---

### I

#### Inmueble
- **Definición:** Agregado del Core V1 que contiene los datos físicos, geométricos, de cerramientos e instalaciones de la vivienda, edificio o local objeto del diagnóstico.
- **Sinónimos aceptados:** Vivienda, edificio, propiedad.
- **Términos prohibidos:** Activo (salvo en contexto de inversor), unidad.
- **Uso en RFs:** RF-002 (base de los datos evaluados), RF-003 (base para identificar problemas), RF-004 (base para calcular beneficios).
- **Notas:** Entidad del Core V1 definida en CF-021-DOMAIN-MODEL y CF-025-INMUEBLE-DESIGN.

#### Inspección PITR™
- **Definición:** Metodología de inspección técnica presencial desarrollada por Certilab. Es el proceso mediante el cual el AT recoge los datos del inmueble que alimentan todo el ecosistema PRD-001.
- **Sinónimos aceptados:** Inspección, visita técnica, PITR™.
- **Términos prohibidos:** Revisión rápida, inspección visual (salvo que se especifique como parte de PITR™).
- **Uso en RFs:** RF-002 (durante la inspección se determina la confianza), RF-003 (durante la inspección el AT asigna valoraciones), RF-004 (los datos de la inspección alimentan las estimaciones).

---

### J

#### Justification Log
- **Definición:** Registro auditable de cualquier modificación que el AT realice sobre las recomendaciones generadas por la plataforma. Incluye: actuación afectada, valor recomendado, valor final, justificación textual, fecha y firma del AT.
- **Sinónimos aceptados:** Registro de justificación, log de cambios.
- **Términos prohibidos:** Historial de ediciones (sin más contexto), changelog.
- **Uso en RFs:** RF-002 (cuando el AT sobrescribe el nivel de confianza), RF-003 (cuando el AT modifica el orden recomendado).
- **Notas:** Es parte del Expediente. Su existencia es obligatoria siempre que el AT se aparte de una recomendación del sistema.

---

### N

#### Nivel de Confianza (del Diagnóstico)
- **Definición:** Indicador global de la fiabilidad del diagnóstico PITR™. Determina en qué medida el cliente y el AT pueden confiar en los datos recogidos y en las recomendaciones derivadas.
- **Sinónimos aceptados:** Confianza global, fiabilidad del diagnóstico.
- **Términos prohibidos:** Precisión, exactitud, calidad de los datos (salvo que se use como métrica interna).
- **Uso en RFs:** RF-002 (definición principal), RF-003 (contextualiza la priorización), RF-004 (determina la confianza de las estimaciones).
- **Notas:** Tiene tres niveles: 🟢 Alta, 🟡 Media, 🔴 Baja. Se muestra siempre al cliente al inicio del Documento de Decisiones.

---

### O

#### Orden Recomendado
- **Definición:** Clasificación sugerida por la plataforma de las actuaciones identificadas, basada en la evaluación multicriterio. No es vinculante: el AT puede aceptarlo, modificarlo o establecer uno propio.
- **Sinónimos aceptados:** Priorización sugerida, clasificación recomendada.
- **Términos prohibidos:** Orden definitivo, clasificación automática, decisión del sistema.
- **Uso en RFs:** RF-003 (definición principal).

---

### P

#### Perfil del Cliente
- **Definición:** Clasificación del cliente según su objetivo principal detectado durante el onboarding: vender, reformar para vivir, presupuesto limitado, o comunidad de propietarios. Afecta direccionalmente la ponderación de los criterios en RF-003.
- **Sinónimos aceptados:** Perfil de decisión, segmento de cliente.
- **Términos prohibidos:** Segmento de mercado (salvo en contexto GTM), tipo de cliente (ambiguo).
- **Uso en RFs:** RF-003 (ajuste de ponderación).
- **Notas:** No afecta a RF-002 ni RF-004 directamente. Solo ajusta el modelo de priorización.

#### Priorización
- **Definición:** Proceso de ordenar las actuaciones según su importancia relativa, combinando la evaluación multicriterio del sistema con el criterio profesional del AT.
- **Sinónimos aceptados:** Jerarquización, clasificación por prioridad.
- **Términos prohibidos:** Decisión automática de prioridad, ranking definitivo.
- **Uso en RFs:** RF-003 (definición principal).

#### Niveles de Prioridad
- **Definición:** Las tres categorías en las que se clasifican las actuaciones según el orden recomendado:
  - **🔴 Prioritaria** — "Actúa ya". Riesgo, incumplimiento o pérdida significativa.
  - **🟡 Recomendada** — "Planifica". Merece la pena pero se puede programar.
  - **🟢 Opcional** — "Valóralo cuando reformes". Mejora positiva no urgente.
- **Sinónimos aceptados:** Categorías de prioridad, niveles sugeridos.
- **Términos prohibidos:** Urgente/No urgente, Crítica/No crítica, Semáforo.
- **Uso en RFs:** RF-003 (definición principal).

---

### R

#### RF-001 (Información del Inmueble)
- **Definición:** Requisito funcional base de PRD-001 que define la recogida y estructuración de los datos del inmueble. Es el **origen de datos** para RF-002, RF-003 y RF-004.
- **Sinónimos aceptados:** Capa base, datos del inmueble.
- **Términos prohibidos:** (No aplica, es un identificador formal).
- **Uso en RFs:** RF-002 (dependencia), RF-003 (dependencia), RF-004 (dependencia).

---

### U

#### Umbral de Valor Mínimo
- **Definición:** Límites por debajo de los cuales una actuación no se muestra en los niveles principales de la jerarquía (RF-003). Se aplica a ahorro energético anual (≥50€/año o ≥5% factura) y amortización (≤20 años). Seguridad y normativa no tienen umbral.
- **Sinónimos aceptados:** Umbral de rentabilidad, filtro de valor mínimo.
- **Términos prohibidos:** Límite de exclusión, regla de descarte automático.
- **Uso en RFs:** RF-003 (definición principal).

---

## 3. Términos prohibidos y sustitutos

### 3.1 Tabla general

| Término prohibido | Sustituto obligatorio | RFs afectados | Justificación |
|-------------------|-----------------------|---------------|---------------|
| Algoritmo de decisión | Modelo de evaluación / Sistema de apoyo | RF-003 | El sistema no decide, apoya |
| Automático (como "clasificación automática") | Sugerido / Recomendado | RF-003 | El AT es el decisor final |
| Beneficio asegurado | Beneficio estimado | RF-004 | No hay garantías en eficiencia energética |
| Decisión del sistema | Recomendación del sistema | RF-002, RF-003 | El sistema recomienda, el AT decide |
| Determina / Decide | Sugiere / Recomienda | RF-003 | Convención de lenguaje transversal |
| Exactitud | Fiabilidad / Confianza | RF-002, RF-004 | La confianza no es exactitud numérica |
| Filtro automático | Umbral de valor mínimo | RF-003 | El AT puede sobrescribir cualquier filtro |
| Garantía de ahorro | Estimación de ahorro | RF-004 | Los ahorros son estimaciones |
| Inspector | Arquitecto Técnico (AT) | RF-002, RF-003, RF-004 | Especificar la titulación profesional |
| Orden definitivo | Orden recomendado | RF-003 | El AT puede modificarlo |
| Peso / Porcentaje | Ponderación metodológica | RF-003 | Los pesos son internos, no del PRD |
| Precisión del dato | Fiabilidad del dato | RF-002 | La confianza mide fiabilidad, no precisión |
| Priorización automática | Priorización sugerida | RF-003 | El AT valida y ajusta |
| Scoring | Puntuación compuesta | RF-003 | Término más específico y menos técnico |

### 3.2 Términos prohibidos específicos de RF-003

La sección 14 de RF-003-JERARQUIA-DE-DECISIONES.md ya define una tabla de términos prohibidos y sustitutos. Esta tabla es coherente con el glosario general y se incorpora como referencia:

| Término prohibido (RF-003) | Sustituto obligatorio |
|---------------------------|-----------------------|
| determina / decide | sugiere / recomienda |
| el algoritmo calcula | la plataforma calcula / genera |
| orden definitivo | orden recomendado |
| clasificación automática | clasificación sugerida |
| el sistema prioriza | el sistema recomienda priorizar |
| peso fijo / porcentaje | ponderación metodológica |
| el AT debe aceptar | el AT puede aceptar |
| decisión del sistema | recomendación del sistema |
| el sistema asigna | el AT asigna (valoraciones) |

---

## 4. Validación de documentos

### 4.1 Checklist de alineación terminológica

Antes de aprobar cualquier documento de la Capa 1 (RF-002, RF-003, RF-004, PRD-001), debe verificarse:

| # | Verificación | RF-002 | RF-003 | RF-004 |
|---|-------------|--------|--------|--------|
| 1 | Usa "Nivel de Confianza" (no "precisión" ni "exactitud") | ✅ | ✅ | ✅ |
| 2 | Usa "Actuación" (no "tarea" ni "acción") | — | ✅ | ✅ |
| 3 | Usa "Orden Recomendado" (no "orden definitivo") | — | ✅ | — |
| 4 | Usa "AT" como abreviatura de Arquitecto Técnico | ✅ | ✅ | ✅ |
| 5 | Usa "Cliente" (no "usuario" genérico) | ✅ | ✅ | ✅ |
| 6 | Usa "PITR™" para la inspección | ✅ | ✅ | ✅ |
| 7 | Usa "Estimación" (no "garantía" ni "cifra exacta") | — | — | ✅ |
| 8 | Usa "Confianza de la Estimación" en RF-004 | ✅ | — | ✅ |
| 9 | Usa "Ponderación Metodológica" (no "peso" ni "porcentaje") | — | ✅ | — |
| 10 | No usa "automático" para decisiones que el AT puede modificar | ✅ | ✅ | ✅ |

### 4.2 Estado de alineación actual

Tras la revisión horizontal de los tres documentos:

| Documento | Alineación | Observaciones |
|-----------|------------|---------------|
| RF-002-NIVEL-DE-CONFIANZA.md | ✅ Completa | Usa correctamente "Nivel de Confianza", "Confianza Global", "Confianza por Módulo". Terminología coherente con el glosario. |
| RF-003-JERARQUIA-DE-DECISIONES.md | ✅ Completa | Incluye su propia convención de lenguaje (sección 14) que es coherente con este glosario. Usa "Orden Recomendado", "Evaluación Multicriterio", "AT". |
| RF-004-IMPACTO-DE-ACTUACIONES.md | ✅ Completa | Usa correctamente "Beneficios Esperados", "Estimación", "Confianza de la Estimación". Terminología coherente con el glosario. |

**Conclusión:** Los tres documentos están alineados terminológicamente con el presente glosario. No se requieren modificaciones en los documentos existentes.

---

## Histórico de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 1.0 | 2026-07-07 | Sistema | Versión inicial. Creación del glosario oficial para PRD-001. Incorporación de términos de RF-002, RF-003, RF-004. Armonización de la convención de lenguaje de RF-003 (sección 14) con el vocabulario de RF-002 y RF-004. |

---

*Fin del documento GLOSARIO-PRD-001.md*