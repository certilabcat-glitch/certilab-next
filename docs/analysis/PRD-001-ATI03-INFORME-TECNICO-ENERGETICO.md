# PRD-001: ATI-03 — Diagnóstico Energético de Decisiones
## Product Requirement Document (Revisión conceptual: de informe técnico a herramienta de decisión)

| Campo | Valor |
|-------|-------|
| **Código** | PRD-001 |
| **Título** | ATI-03 — Diagnóstico Energético de Decisiones |
| **Versión** | 2.0 (Revisión conceptual) |
| **Fecha** | 2026-07-07 |
| **Estado** | 📋 EN REVISIÓN DE DISEÑO (cambio de paradigma) |
| **Precedencia** | PRD-FRAMEWORK-001, MR-001, GTM-001-POSITIONING, PA-001-CATALOG |
| **Propósito** | Definir el producto ATI-03 como herramienta de ayuda a la toma de decisiones del propietario, evolucionando desde el concepto original de "informe técnico" hacia un producto de claridad y acción |
| **Restricciones** | ⚠️ No cambia alcance funcional. No abre nuevas épicas. No implementa código. No modifica arquitectura. Solo evoluciona el diseño del producto |

---

## Índice

1. Resumen Ejecutivo (revisado)
2. Problema y Oportunidad (revisado)
3. ¿Qué vende realmente el producto? (NUEVO)
4. Propuesta de valor (revisada)
5. Cliente objetivo y buyer personas (revisadas)
6. Recorrido del usuario — De la duda a la decisión (revisado)
7. Requisitos funcionales (revisados: entregables redefinidos)
8. Requisitos no funcionales (revisados)
9. Métricas de éxito (revisadas)
10. Estructura del entregable principal: el documento de decisiones (NUEVO)
11. Experiencia final: el momento de claridad (NUEVO)
12. Recomendación de naming (NUEVO)
13. Riesgos y mitigaciones (revisados)
14. Dependencias y prerrequisitos (sin cambios)
15. Próximos pasos (revisados)

---

## 1. Resumen Ejecutivo

> **ATI-03 no entrega un informe técnico.**
> **ATI-03 entrega respuestas a las 6 preguntas que todo propietario necesita responder antes de decidir.**

### La decisión que sustituye al documento

Un informe técnico energético tradicional responde a una pregunta (¿cuál es la calificación energética?) desde una perspectiva documental (aquí están los datos, interpreta tú).

El propietario no necesita más datos. Necesita certeza sobre qué hacer.

**El producto ATI-03 debe diseñarse para que, cuando el cliente termine de consumirlo, pueda responder sin ambigüedad a:**

| Pregunta | Lo que el producto responde |
|----------|-----------------------------|
| ¿Cuál es el estado real de mi vivienda? | Diagnóstico visual del estado actual frente al certificado |
| ¿Qué problemas son realmente importantes? | Jerarquía clara: crítico / importante / mejora |
| ¿Qué actuaciones debo realizar primero? | Plan de acción priorizado por impacto y urgencia |
| ¿Cuánto puedo ahorrar? | Estimación económica en euros/año, no en porcentajes |
| ¿Qué inversión merece la pena y cuál no? | Análisis coste-beneficio por actuación con retorno estimado |
| ¿Qué ocurre si no hago nada? | Proyección del coste de la inacción |

### ¿Qué cambia respecto a la versión anterior?

| Aspecto | V1 (Informe Técnico) | V2 (Herramienta de Decisión) |
|---------|---------------------|------------------------------|
| **Propósito** | Documentar el estado energético | Ayudar al propietario a decidir |
| **Pregunta principal** | ¿Cuál es la calificación? | ¿Qué debo hacer? |
| **Formato principal** | PDF técnico extenso | Documento visual interactivo + anexo técnico |
| **Primera impresión** | Portada, índice, datos | Dashboard visual con diagnóstico claro |
| **Éxito del producto** | El informe se ha entregado | El cliente sabe qué hacer |
| **Relación cliente** | Entrega unidireccional | Diálogo: diagnóstico + recomendación + plan |

### Principio rector del diseño

> **El informe técnico no desaparece. Pasa a ser un anexo.**
>
> El producto principal es el documento de decisiones: visual, priorizado, orientado a acción.
> La documentación técnica detallada se incorpora como anexos cuando el cliente necesite profundizar.

---

## 2. Problema y Oportunidad

### 2.1 El problema real (revisado)

El propietario de una vivienda que recibe un certificado energético se enfrenta a tres problemas concurrentes:

**Problema 1: No sabe si el certificado es correcto**
El 30-60% de los certificados contienen errores (OCU 2023, CGATE 2024). El propietario no tiene forma de verificar la calidad del documento que ha pagado.

**Problema 2: No sabe qué significa realmente**
Una calificación D o E es un dato abstracto. El propietario no sabe cómo se traduce en confort, ahorro o valor de reventa. No sabe si es grave o leve, si debe actuar o puede esperar.

**Problema 3: No sabe qué hacer con esa información**
Incluso si el certificado es correcto, el propietario no dispone de un plan de acción priorizado. No sabe qué mejoras son rentables, cuáles urgentes y cuáles irrelevantes.

**El problema que ATI-03 resuelve no es informativo, es decisional.**

### 2.2 El dolor emocional

El propietario experimenta:

- **Confusión**: "Mi casa tiene una D, pero no sé si es buena o mala"
- **Desconfianza**: "El certificador me puso una E, pero creo que mi casa es mejor"
- **Parálisis**: "Sé que debería mejorar la eficiencia, pero no sé por dónde empezar"
- **Miedo**: "Si no hago nada, ¿puedo tener problemas al vender?"

Un informe técnico tradicional amplifica estos dolores (más datos, más confusión).
ATI-03 debe resolverlos reemplazando la confusión por claridad.

### 2.3 La oportunidad

El mercado español tiene 25,8 millones de viviendas (INE 2023). El parque edificatorio necesita rehabilitación energética masiva (NextGen EU, PNRV, EPBD 2024/1275). Pero el propietario no actúa no por falta de incentivos económicos, sino por **falta de claridad sobre qué hacer**.

> 🔵 **[HECHO VERIFICADO — MR-001]** La EPBD 2024/1275 exige control independiente de EPCs (Art.19). Esto crea un mercado cautivo de verificación. Pero la oportunidad real va más allá del control: es **guiar al propietario en la toma de decisiones de rehabilitación**.

---

## 3. ¿Qué vende realmente el producto?

Esta sección es nueva y define el cambio de paradigma.

### 3.1 Lo que NO vende

- ❌ No vende un PDF
- ❌ No vende datos técnicos
- ❌ No vende un informe pericial
- ❌ No vende "información" (la información ya existe en el certificado)

### 3.2 Lo que SÍ vende

- ✅ **Claridad**: El propietario entiende su situación real sin ambigüedad
- ✅ **Jerarquía**: Sabe qué es importante y qué no lo es
- ✅ **Dirección**: Sabe qué hacer primero, después y por qué
- ✅ **Confianza**: Sabe que las recomendaciones son independientes y técnicamente fundadas
- ✅ **Tranquilidad**: Sabe qué ocurre si no hace nada
- ✅ **Visibilidad económica**: Sabe cuánto puede ahorrar y qué inversión recupera

### 3.3 El producto como servicio de decisión

ATI-03 es un servicio de diagnóstico que transforma datos técnicos en decisiones accionables.

**La cadena de valor del producto:**

```
Datos del certificado  →  Análisis PITR™  →  Diagnóstico visual
                          (proceso interno)    (producto entregado)
                                                    ↓
                                              Decisiones claras
                                              Plan priorizado
                                              Confianza para actuar
```

El informe PDF es un subproducto. El producto real es la claridad que el cliente obtiene.

---

## 4. Propuesta de Valor

### 4.1 Propuesta de valor (revisada)

> **Para propietarios que necesitan saber qué hacer con su certificado energético, ATI-03 es el diagnóstico que transforma datos técnicos en decisiones claras: qué problemas son reales, qué actuaciones merecen la pena, cuánto puedes ahorrar y por dónde empezar.**
>
> No es un informe técnico más. Es la respuesta a las 6 preguntas que importan antes de decidir.

### 4.2 Taglines de evaluación

| Tagline | Orientación | Nota |
|---------|-------------|------|
| "El diagnóstico que te dice qué hacer con tu certificado" | Decisión | Fuerte, claro, accionable |
| "No más dudas: respuestas claras sobre tu vivienda" | Emocional | Resuelve el dolor de la incertidumbre |
| "De la calificación a la decisión" | Transición | Describe el valor del producto |
| "Tu vivienda en una página: estado, prioridades, ahorro" | Visual | Comunica simplicidad |
| "Antes de reformar, decide con claridad" | Preventivo | Posiciona como paso previo |

### 4.3 Diferenciación respecto al mercado

| Atributo | Certificado tradicional | AT tradicional | ATI-03 |
|----------|------------------------|----------------|--------|
| **Propósito** | Cumplir normativa | Diagnosticar | Decidir |
| **Formato** | PDF normativo | Informe técnico | Documento visual de decisiones |
| **Lenguaje** | Técnico-regulatorio | Técnico | Visual + ejecutivo |
| **Pregunta que responde** | ¿Cuál es la letra? | ¿Qué tiene la casa? | ¿Qué hago con esto? |
| **Valor para el cliente** | Obligación legal | Conocimiento | Claridad para actuar |

---

## 5. Cliente Objetivo y Buyer Personas

### 5.1 Perfil primario

**Escenario típico:** Propietario que ha recibido un certificado energético con calificación baja (E, F, G) y necesita decidir si:
- Acepta la calificación y vende/alquila con descuento
- Reclama al certificador
- Invierte en mejoras (y cuáles)
- Solicita una segunda opinión completa

Este perfil no necesita más información técnica. Necesita **respuestas que le permitan decidir** entre esas 4 opciones.

### 5.2 Perfil secundario

**Comprador:** Persona que está evaluando comprar una vivienda y necesita entender el coste energético real antes de decidir:
- "Si compro una casa con certificado E, ¿cuánto voy a pagar al mes?"
- "¿Qué inversión necesito para mejorarla?"
- "¿Es una buena compra o una trampa?"

### 5.3 Perfil terciario

**Comunidad de propietarios:** Representante de comunidad que necesita decidir sobre obras de rehabilitación y busca un diagnóstico claro que justifique la inversión ante los vecinos.

### 5.4 Momentos de compra

El cliente compra ATI-03 cuando se encuentra en uno de estos estados:

| Momento | Dolor | Lo que busca |
|---------|-------|-------------|
| Acabo de recibir el certificado y es malo | Preocupación | Saber si es real y qué hacer |
| Estoy vendiendo y tengo duda | Riesgo económico | Saber si pierdo dinero |
| Estoy comprando y hay certificado | Incertidumbre | Saber el coste real futuro |
| Quiero reformar pero no sé por dónde empezar | Parálisis | Un plan claro |
| Me han denegado una subvención | Frustración | Entender por qué y qué corregir |

---

## 6. Recorrido del Usuario — De la duda a la decisión

### 6.1 Mapa del recorrido (revisado)

El recorrido cambia de "solicitud → inspección → entrega → fin" a un flujo de **descubrimiento → diagnóstico → claridad → acción**.

```
FASE 1                    FASE 2                    FASE 3                     FASE 4
DESCUBRIMIENTO            DIAGNÓSTICO               CLARIDAD                   ACCIÓN
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐        ┌─────────────────┐
│ "Algo no        │      │ El AT aplica    │      │ Cliente recibe  │        │ Cliente sabe    │
│  cuadra"        │      │ PITR™           │      │ documento de    │        │ exactamente     │
│                 │      │                 │      │ decisiones      │        │ qué hacer       │
│ Cliente tiene   │ ──►  │ (proceso        │ ──►  │ ────────────    │ ────►  │ ────────────    │
│ duda o          │      │  interno)       │      │ Dashboard       │        │ Contrata obra   │
│ preocupación    │      │                 │      │ Jerarquía       │        │ Reclama         │
│                 │      │                 │      │ Plan acción     │        │ Acepta          │
│ Busca respuesta │      │                 │      │ Ahorro          │        │ Vende           │
└─────────────────┘      └─────────────────┘      └─────────────────┘        └─────────────────┘
```

### 6.2 Los 6 momentos de verdad (revisados)

| Momento | Antes (informe técnico) | Ahora (decisión) |
|---------|------------------------|------------------|
| **Llegada a la web** | "Solicita tu informe técnico" | "Responde a 6 preguntas y decide" |
| **Solicitud** | Rellenar formulario técnico | "Cuéntanos tu situación para ayudarte a decidir" |
| **Recepción** | Recibir PDF técnico por email | Acceder a dashboard visual con diagnóstico |
| **Primera impresión** | "Aquí están los datos" | **"Este es el estado real de tu vivienda"** |
| **Navegación** | Leer páginas de datos | Explorar decisiones: ¿qué hago primero? |
| **Post-entrega** | "Pregúntame si tienes dudas" | "Sabes exactamente qué hacer" |

### 6.3 La experiencia de recepción (crítica)

El momento más importante del recorrido es la **recepción del documento**. Ahí el cliente decide si el producto vale lo que ha pagado.

**Experiencia actual (informe técnico):**
1. Abre email → encuentra PDF adjunto
2. Descarga PDF → ve portada con nombre técnico
3. Abre documento → primera página: datos de certificado, normativa, tecnicismos
4. Se siente abrumado → cierra PDF → no vuelve a abrirlo

**Experiencia deseada (herramienta de decisión):**
1. Abre email → ve enlace a dashboard interactivo (no PDF adjunto)
2. Hace clic → **primera pantalla: respuesta visual a "¿Cuál es el estado real de mi vivienda?"**
3. Ve indicador claro (ej: semáforo, puntuación, ranking visual)
4. Despliega hacia abajo → las otras 5 preguntas respondidas de forma visual
5. Puede profundizar si quiere → anexo técnico disponible como sección expandible
6. Se siente tranquilo → sabe qué hacer

> **El informe debe ser la consecuencia del producto, no el producto en sí.**
> La experiencia de recepción debe generar un momento de claridad inmediata.

---

## 7. Requisitos Funcionales

### 7.1 Cambio en la filosofía de entrega

| Requisito | V1 (Informe Técnico) | V2 (Herramienta de Decisión) |
|-----------|---------------------|------------------------------|
| **RF-001** | Generar informe técnico en PDF | Generar **documento visual de decisiones** con acceso a detalle técnico |
| **RF-002** | Validar certificado energético | Validar certificado + **diagnosticar implicaciones prácticas** |
| **RF-003** | Identificar desviaciones técnicas | Identificar desviaciones + **clasificarlas por impacto en la decisión** |
| **RF-004** | Proponer mejoras genéricas | Proponer mejoras con **estimación de ahorro económico anual** |
| **RF-005** | Estimar costes de mejora | Estimar costes + **calcular retorno de inversión por actuación** |
| **RF-006** | Incluir normativa aplicable | Incluir normativa en anexo, **no en el cuerpo principal** |
| **RF-007** | Firmar digitalmente el informe | Firmar digitalmente + **sello de garantía de decisión independiente** |
| **RF-008** | Entregar PDF por email | **Entregar acceso a dashboard interactivo + PDF descargable** |

### 7.2 RF-001 (revisado): El documento de decisiones

**El entregable principal no es un PDF. Es un documento vivo que responde a las 6 preguntas.**

| Aspecto | Definición |
|---------|-----------|
| **Formato principal** | Página web/dashboard interactivo (responsive, accesible) |
| **Segundo formato** | PDF descargable (misma estructura visual) |
| **Tercer formato** | Anexo técnico detallado (PDF opcional, no forma parte de la experiencia principal) |
| **Estructura** | Pila de decisión: de lo general a lo específico, de lo visual a lo detallado |
| **Principio** | El cliente debe obtener la respuesta a las 6 preguntas en menos de 30 segundos de apertura |

### 7.3 RF-002 (revisado): Validación con contexto decisional

| Aspecto | Definición |
|---------|-----------|
| **Validación técnica** | Se mantiene (verificar corrección del certificado) |
| **Novedad** | La validación se contextualiza: "Tu certificado es correcto, pero tiene una desviación del X% en el consumo real" |
| **Impacto** | "Esta desviación significa que tu factura anual es 300€ superior a lo estimado en el certificado" |

### 7.4 RF-003 (revisado): Sistema de Apoyo a la Priorización

| Aspecto | Definición |
|---------|-----------|
| **Concepto** | Sistema de apoyo que asiste al Arquitecto Técnico en la construcción de una priorización coherente y explicable para el cliente |
| **No sustituye al AT** | La plataforma genera un **orden recomendado** basado en criterios técnicos. El AT mantiene siempre la capacidad de aceptarlo, modificarlo o redefinirlo con justificación. |
| **Salida** | Actuaciones ordenadas en 3 niveles: 🔴 Prioritarias / � Recomendadas / 🟢 Opcionales |
| **Cada actuación incluye** | Qué es, por qué importa, qué ocurre si no se actúa, coste estimado de no actuar |
| **Criterios documentados** | Los criterios de decisión se documentan en el PRD (seguridad, normativa, coste energético, amortización, confort, viabilidad técnica, ahorro energético) |
| **Pesos internos** | La ponderación de criterios forma parte de la **metodología interna** de la plataforma y puede evolucionar sin modificar el PRD |
| **Transparencia** | Todo cambio del AT respecto al orden recomendado queda registrado con su justificación (Justification Log) |

### 7.5 RF-004 (revisado): Ahorro económico

| Aspecto | Definición |
|---------|-----------|
| **Unidad** | Euros/año (no porcentajes abstractos) |
| **Contexto** | "Podrías ahorrar 450€/año, equivalentes al 25% de tu factura actual" |
| **Visualización** | Barra comparativa: coste actual vs coste con mejora |
| **Desglose** | Por concepto: calefacción, refrigeración, ACS, iluminación |

### 7.6 RF-005 (revisado): Inversión y retorno

| Aspecto | Definición |
|---------|-----------|
| **Cada actuación debe incluir** | Inversión estimada, ahorro anual, retorno simple (años), prioridad |
| **Clasificación** | "Merece la pena" / "Valóralo" / "No recomendado" |
| **Ejemplo** | "Aislar fachada: 8.000€ inversión, 600€/año ahorro, retorno en 13 años → **Merece la pena** (vida útil 30+ años)" |

### 7.7 RF-008 (revisado): Entrega multicanal

| Aspecto | Definición |
|---------|-----------|
| **Canal principal** | Dashboard web interactivo (acceso con enlace único) |
| **Canal secundario** | PDF descargable con misma estructura visual |
| **Anexo técnico** | PDF separado, disponible a un clic desde el dashboard |
| **Explicación** | El cliente recibe el enlace al dashboard. Si quiere papel, descarga el PDF. Si quiere datos técnicos, accede al anexo. **Nunca al revés.** |

---

## 8. Requisitos No Funcionales

### 8.1 Usabilidad (revisado)

| Requisito | Criterio |
|-----------|----------|
| **Tiempo de comprensión** | El cliente debe entender su diagnóstico en ≤30 segundos desde la apertura |
| **Navegación** | Las 6 preguntas deben responderse en una única página (scroll vertical) |
| **Profundidad** | El detalle técnico debe estar a un clic, nunca en el flujo principal |
| **Idioma** | Español claro, sin tecnicismos. El lenguaje técnico se reserva al anexo |

### 8.2 Accesibilidad

| Requisito | Criterio |
|-----------|----------|
| **Comprensión** | Nivel de lectura: ESO (12-14 años). Validado con prueba de legibilidad |
| **Visual** | Contraste suficiente. Color no es el único canal de información |
| **Formato** | Responsive (móvil, tablet, escritorio). El propietario lo verá probablemente en móvil |

### 8.3 Confianza y credibilidad

| Requisito | Criterio |
|-----------|----------|
| **Firma digital** | El documento debe estar firmado digitalmente por el AT colegiado |
| **Trazabilidad** | Cada afirmación debe poder rastrearse al anexo técnico |
| **Transparencia** | Si hay incertidumbre en una estimación, debe indicarse explícitamente |
| **Independencia** | Declaración explícita de independencia del AT respecto al certificador original |

---

## 9. Métricas de Éxito

### 9.1 Métricas de producto (revisadas)

| Métrica | Por qué | Objetivo V1 |
|---------|---------|-------------|
| **Tiempo hasta claridad** | Tiempo desde que abre el documento hasta que entiende las 6 respuestas | ≤30 segundos |
| **Tasa de comprensión** | % de clientes que pueden explicar su diagnóstico sin ayuda | ≥80% |
| **Tasa de acción** | % de clientes que realizan alguna acción tras recibir el documento | ≥40% |
| **NPS** | Satisfacción general con el producto | ≥50 |
| **Tasa de re-apertura** | % de clientes que vuelven a consultar el documento | ≥60% |
| **Tasa de profundización** | % de clientes que acceden al anexo técnico | ≥30% (esperable) |

### 9.2 Métricas de negocio

| Métrica | Objetivo V1 |
|---------|-------------|
| **Conversión solicitud→compra** | ≥25% |
| **Tiempo medio de entrega** | ≤72h |
| **Tasa de adopción sobre ATI-01** | ≥15% (clientes que compran ATI-03 además de o después de ATI-01) |
| **Coste de adquisición (CAC)** | ≤15€ |

### 9.3 Definición de "éxito del producto"

> **Éxito no es "el cliente recibió el documento".**
> **Éxito es "el cliente sabe qué hacer después de leerlo".**

---

## 10. Estructura del Entregable Principal

### 10.1 Pila de decisión

El documento de decisiones se organiza como una **pila vertical** donde cada capa responde a una pregunta de decisión. De arriba abajo: de lo general a lo específico, de lo visual a lo detallado.

```
┌──────────────────────────────────────────────────────────┐
│  CAPA 1: ESTADO REAL                                     │
│  Indicador visual único del estado diagnóstico           │
│  "Tu vivienda tiene un estado energético [BUENO/REGULAR/ │
│   MEJORABLE/DEFICIENTE]"                                 │
│  ● Visualización tipo semáforo o score visual            │
│  ● Comparativa: lo que dice el certificado vs lo que     │
│    realmente consume                                      │
├──────────────────────────────────────────────────────────┤
│  CAPA 2: PROBLEMAS PRIORIZADOS                           │
│  🔴 Críticos (urge actuar)                               │
│  🟡 Importantes (planificar próximos meses)              │
│  🟢 Mejoras (cuando toque reforma)                       │
│  ● Cada problema con: qué es, por qué importa,           │
│    qué pasa si no actúas                                 │
├──────────────────────────────────────────────────────────┤
│  CAPA 3: PLAN DE ACCIÓN                                  │
│  "Esto es lo que debes hacer, en orden"                  │
│  ● Actuación 1: [nombre] → [coste] → [ahorro/año]        │
│  ● Actuación 2: [nombre] → [coste] → [ahorro/año]        │
│  ● Visualización tipo timeline o checklist               │
├──────────────────────────────────────────────────────────┤
│  CAPA 4: AHORRO ECONÓMICO                                │
│  "Cuánto puedes ahorrar"                                 │
│  ● Desglose por concepto (calefacción, ACS, etc.)        │
│  ● Comparativa: factura actual vs factura mejorada       │
│  ● Proyección anual y a 5 años                          │
├──────────────────────────────────────────────────────────┤
│  CAPA 5: INVERSIONES QUE MERECEN LA PENA                 │
│  Cada actuación con:                                     │
│  ● Inversión estimada                                    │
│  ● Ahorro anual                                          │
│  ● Retorno de inversión (años)                           │
│  ● Veredicto: ✅ Merece la pena / ⚠️ Valóralo / ❌ No     │
├──────────────────────────────────────────────────────────┤
│  CAPA 6: ¿QUÉ OCURRE SI NO HAGO NADA?                    │
│  ● Proyección a 1, 5, 10 años                            │
│  ● Coste acumulado de no actuar (factura extra)          │
│  ● Impacto en valor de reventa                           │
│  ● Riesgo regulatorio (futuras exigencias EPBD)          │
├──────────────────────────────────────────────────────────┤
│  [ANEXO TÉCNICO] — Un clic, no en el flujo principal     │
│  ● Datos completos de la inspección PITR™                │
│  ● Desglose técnico por elemento (cerramientos,          │
│    instalaciones, etc.)                                  │
│  ● Normativa aplicable                                   │
│  ● Metodología y fuentes                                 │
└──────────────────────────────────────────────────────────┘
```

### 10.2 Principios de diseño visual

| Principio | Aplicación |
|-----------|------------|
| **Lo más importante primero** | El estado real y los problemas críticos aparecen antes del scroll |
| **Una idea por capa** | Cada capa responde a una única pregunta de decisión |
| **Lo visual precede a lo textual** | Gráfico/indicador visual primero, texto explicativo después |
| **La profundidad es opcional** | El detalle está disponible pero nunca es necesario para entender |
| **Consistencia de nomenclatura** | Mismas etiquetas, colores y jerarquías en todo el documento |

### 10.3 Experiencia móvil (prioritaria)

El 60%+ de los propietarios abrirán el documento en el móvil. La pila de decisión debe funcionar perfectamente en pantalla pequeña:

- **Cada capa es un bloque vertical**: se ve completa en una pantalla de móvil
- **Desplazamiento suave**: scroll nativo, no paginación
- **Toque para expandir**: el detalle se despliega al tocar, no al cargar
- **PDF descargable**: para quien quiera imprimirlo o compartirlo

### 10.4 El anexo técnico: necesario pero no protagonista

El anexo técnico debe existir y ser riguroso, pero **no forma parte de la experiencia principal**. Se accede a él:

- Desde un enlace/botón al final del dashboard: "Ver detalle técnico completo"
- Desde cada capa: "Ver justificación técnica de esta recomendación"
- El PDF técnico completo está disponible para descarga

---

## 11. Experiencia Final: El Momento de Claridad

### 11.1 ¿Cómo se siente el cliente al terminar?

**Antes (informe técnico):**
"Vale, he recibido el informe. Tiene 30 páginas. La letra es pequeña. No entiendo bien qué significa esto del factor corrector del certificado. Supongo que está bien. Lo guardo por si acaso."

**Ahora (herramienta de decisión):**
"Mi casa está en estado 'mejorable'. El problema principal es el aislamiento de fachada. Si aíslo, ahorro 600€/año y recupero la inversión en 13 años. Si no hago nada, seguiré pagando 300€ más al año de lo que debería. Lo primero que tengo que hacer es pedir presupuesto de aislamiento de fachada."

### 11.2 Los indicadores de éxito emocional

| Indicador | Señal de que el producto funciona |
|-----------|----------------------------------|
| **Comprensión** | El cliente puede explicar su situación a otra persona (familiar, contratista) |
| **Confianza** | El cliente cita el documento al tomar decisiones: "Según el diagnóstico..." |
| **Acción** | El cliente solicita presupuestos, contacta profesionales, prioriza obras |
| **Tranquilidad** | El cliente sabe que no necesita preocuparse por lo que no es crítico |

### 11.3 El final del documento

El documento de decisiones debe cerrar con una **llamada a la acción clara** que depende del diagnóstico:

| Diagnóstico | CTA recomendada |
|-------------|-----------------|
| Todo correcto | "Tu vivienda está en buen estado. Si tienes más dudas, solicita una segunda opinión." |
| Problemas críticos | "Actúa ya. Solicita presupuesto para las actuaciones prioritarias." |
| Mejoras recomendadas | "Planifica. Estas son las mejoras que merecen la pena cuando hagas reforma." |
| Dudas sobre el certificado | "Solicita una segunda opinión para verificar si el certificado es correcto." |

---

## 12. Recomendación de Naming

> ⚠️ **Nota:** Esta sección contiene una recomendación de naming. No se cambia el nombre oficial del producto. La decisión se tomará posteriormente dentro de una iniciativa específica de branding. PA-001-CATALOG sigue reflejando "Informe Técnico Energético" como nombre oficial hasta entonces.

### 12.1 Diagnóstico del naming actual

**"Informe Técnico Energético"** tiene los siguientes problemas desde la nueva perspectiva:

- "Informe" → transmite documento, no servicio
- "Técnico" → transmite complejidad, no accesibilidad
- "Energético" → transmite limitación temática, no impacto decisional
- En conjunto → suena a documento que un técnico entrega a otro técnico

### 12.2 Criterios para un buen nombre

| Criterio | Pregunta de validación |
|----------|----------------------|
| **Describe el valor, no el formato** | ¿El nombre explica qué consigue el cliente, no qué recibe? |
| **Es accionable** | ¿El nombre sugiere que el cliente podrá decidir algo? |
| **No es técnico** | ¿Un propietario no profesional lo entiende? |
| **Diferenciador** | ¿Se distingue claramente de un "informe técnico"? |

### 12.3 Nombres evaluados

| Nombre | Puntuación (1-10) | Pros | Contras |
|--------|:-----------------:|------|---------|
| **Diagnóstico Energético de Decisiones** | 8 | Comunica la evolución de informe a decisión; "diagnóstico" es médico → genera confianza | Largo (3 palabras) |
| **Análisis de Decisiones Energéticas** | 7 | Claro, profesional, accionable | Menos diferenciador |
| **Guía de Decisiones Energéticas** | 8 | "Guía" es accesible, no técnico; sugiere acompañamiento | Puede sonar demasiado simple |
| **Plan Energético Personalizado** | 6 | "Plan" es accionable | Genérico; no diferencia de otras consultorías |
| **Diagnóstico de Vivienda (con enfoque energético)** | 7 | Más amplio, permite escalar a otros diagnósticos | Menos específico |
| **Tu Decisión Energética** | 9 | Muy cercano, personal, no técnico; "tu" es poderoso | Puede sonar demasiado comercial |
| **Check-Up Energético de Decisiones** | 7 | "Check-Up" ya es conocido en Certilab (ATI-04) | Puede canibalizar ATI-04 |

### 12.4 Recomendación

**Nombre recomendado:** "Diagnóstico Energético de Decisiones"

Razones:
1. Comunica la evolución: de "informe" (documento) a "diagnóstico" (servicio de claridad)
2. "Decisiones" es la palabra clave que diferencia el producto de cualquier informe técnico
3. "Diagnóstico" tiene connotaciones médicas → confianza, rigor, profesionalidad
4. Es suficientemente distinto de "Informe Técnico Energético" para justificar el cambio
5. Mantiene "Energético" para alinearse con la búsqueda SEO y la categoría de producto

**Alternativa corta para comunicación:** "Tu Decisión Energética"

**Nota:** Este naming es una recomendación. La decisión final corresponde a la iniciativa de branding, no al PRD.

---

## 13. Riesgos y Mitigaciones

### 13.1 Riesgos de diseño (nuevos)

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|:-----------:|:-------:|------------|
| **Exceso de tecnicismo** | Alta | Alto | Principio rector: el anexo técnico no está en el flujo principal. Revisión de legibilidad obligatoria (objetivo: 12-14 años) |
| **Subestimación de la complejidad técnica** | Media | Medio | El anexo técnico debe ser riguroso. No se simplifica el contenido técnico, solo se separa de la experiencia principal |
| **Cliente confunde diagnóstico con proyecto de obra** | Media | Medio | Disclaimer claro: "Este diagnóstico identifica prioridades. No sustituye a un proyecto de obra." |
| **Expectativa de precisión absoluta en estimaciones** | Media | Alto | Indicar explícitamente horquillas y nivel de confianza: "Estimación basada en datos medios. El ahorro real puede variar ±20%" |
| **Pérdida de rigor percibido por simplificación** | Media | Medio | El anexo técnico y la firma digital garantizan el rigor. El documento visual no es menos riguroso, es más accesible |

### 13.2 Riesgos de producto (revisados)

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|:-----------:|:-------:|------------|
| **Baja tasa de profundización en anexo técnico** | Alta | Bajo | No es un problema. El producto cumple su función si el cliente entiende las 6 respuestas sin necesitar el anexo |
| **Canibalización de ATI-01** | Media | Bajo | ATI-01 y ATI-03 son productos diferentes: uno verifica, el otro diagnostica. El flujo natural es ATI-01 → ATI-03 |
| **Dependencia de ATs para generar contenido visual** | Media | Medio | Invertir en automatización de generación de dashboard desde los datos estructurados de PITR™ |
| **Complejidad técnica del análisis energético** | Media | Alto | Partir de ATI-01 como base. ATI-03 añade análisis de consumo real y recomendaciones, que requieren datos adicionales |

---

## 14. Dependencias y Prerrequisitos

*[Sin cambios respecto a la versión V1. Las dependencias técnicas (Core V1, PITR™, ATs colegiados) se mantienen idénticas.]*

---

## 15. Próximos Pasos

### 15.1 Acciones inmediatas

- [ ] **Revisar PA-001-CATALOG**: Actualizar la ficha de ATI-03 para reflejar la nueva propuesta de valor (sin cambiar el nombre oficial hasta la iniciativa de branding)
- [ ] **Diseñar prototipo del documento de decisiones**: Mockup de la pila de decisión (capas 1-6) para validar con usuarios
- [ ] **Test de comprensión**: Validar con 5-10 propietarios que entienden las 6 respuestas en ≤30 segundos
- [ ] **Definir estructura del anexo técnico**: Mantener rigor técnico fuera del flujo principal
- [ ] **Planificar iniciativa de naming**: Incluir "Diagnóstico Energético de Decisiones" como candidato en la evaluación de branding

### 15.2 Lo que NO cambia

- ❌ No cambia el alcance funcional del producto (mismo Core V1, mismo PITR™, mismos ATs)
- ❌ No abre nuevas épicas
- ❌ No implementa código
- ❌ No modifica la arquitectura
- ✅ Solo evoluciona el diseño del producto: de informe técnico a herramienta de decisión

---

## Anexo: Mapa de cambios respecto a PRD-001 V1

| Sección | Cambio |
|---------|--------|
| 1. Resumen Ejecutivo | Nuevo. Narrativa centrada en decisión, no en información |
| 2. Problema y Oportunidad | Reformulado: el dolor es decisional, no informativo |
| 3. ¿Qué vende realmente? | **NUEVA** |
| 4. Propuesta de valor | Reformulada: de "informe detallado" a "respuestas para decidir" |
| 5. Cliente objetivo | Ampliado: perfiles por momento de decisión |
| 6. Recorrido del usuario | Rediseñado: de entrega documental a momento de claridad |
| 7. Requisitos funcionales | Reformulados: entregable principal es visual, anexo técnico es secundario |
| 8. Requisitos no funcionales | Añadidos: tiempo de comprensión, nivel de lectura, experiencia móvil |
| 9. Métricas de éxito | Reformuladas: basadas en claridad y acción, no en entrega |
| 10. Estructura del entregable | **NUEVA** — Pila de decisión visual |
| 11. Experiencia final | **NUEVA** — Momento de claridad |
| 12. Recomendación de naming | **NUEVA** — Propuesta, no cambio oficial |
| 13. Riesgos | Añadidos: exceso de tecnicismo, expectativas de precisión |
| 14. Dependencias | Sin cambios |
| 15. Próximos pasos | Reformulados: priorizan validación de comprensión y prototipado visual |

---

*Fin del documento PRD-001 V2 — Revisión conceptual*