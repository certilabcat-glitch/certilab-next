# REVISIÓN HORIZONTAL — CAPA 1 (Conocimiento)
## Análisis de coherencia: RF-002, RF-003, RF-004

| Campo | Valor |
|-------|-------|
| **Documento** | REVISION-HORIZONTAL-CAPA1.md |
| **Fecha** | 2026-07-07 |
| **Alcance** | Análisis de coherencia entre RF-002, RF-003, RF-004 sin modificar contenido |
| **Objetivo** | Validar que la Capa 1 (Conocimiento) funciona como flujo único y coherente |
| **Estado** | 📋 ANÁLISIS EN CURSO |

---

## HALLAZGO CRÍTICO: RF-002 NO EXISTE

### Situación actual

Se han identificado y analizado:
- ✅ **RF-003** — Sistema de Apoyo a la Priorización (v2.0, APROBADO)
- ✅ **RF-004** — Beneficios Esperados de las Actuaciones (v2.1, ANÁLISIS)

Se ha buscado sin éxito:
- ❌ **RF-002** — Nivel de confianza del diagnóstico (NO ENCONTRADO)

### Implicación

RF-003 y RF-004 **ambos referencian a RF-002** como dependencia:

| Documento | Referencia a RF-002 |
|-----------|-------------------|
| **RF-003** | "Dependencia funcional: RF-002 (Nivel de confianza del diagnóstico)" |
| **RF-004** | "Depende de: RF-003 (Jerarquía de Decisiones), PRD-001 V2" (no menciona RF-002 explícitamente, pero lo usa implícitamente) |

**Pregunta:** ¿RF-002 existe como documento separado o está integrado en otro requisito?

---

## ANÁLISIS PRELIMINAR: RF-003 ↔ RF-004

### 1. ¿Existe solapamiento entre requisitos?

#### Respuesta: **NO, pero hay una dependencia clara**

**RF-003 y RF-004 operan en secuencia, no en paralelo:**

```
RF-003: Jerarquía de Decisiones
├─ Pregunta: "¿Qué es prioritario?"
├─ Entrada: Lista de problemas/actuaciones identificadas
├─ Proceso: Evaluación multicriterio + orden recomendado
└─ Salida: Actuaciones ordenadas por prioridad (🔴🟡🟢)
    │
    └──► RF-004: Beneficios Esperados
         ├─ Pregunta: "¿Cómo cambia mi vivienda?"
         ├─ Entrada: Actuaciones priorizadas por RF-003
         ├─ Proceso: Comunicación de beneficios en lenguaje cliente
         └─ Salida: Tarjetas de beneficios para cada actuación
```

**No hay solapamiento:** RF-003 ordena, RF-004 comunica. Son funciones distintas.

---

### 2. ¿Hay información duplicada?

#### Respuesta: **PARCIALMENTE SÍ — Requiere clarificación**

#### Duplicación identificada:

| Concepto | RF-003 | RF-004 | Observación |
|----------|--------|--------|-------------|
| **Criterios de decisión** | Define 7 criterios (seguridad, normativa, coste, etc.) | Los usa implícitamente para justificar beneficios | ✅ Coherente: RF-003 define, RF-004 aplica |
| **Ahorro económico** | Es uno de los 7 criterios de ponderación | Es el primer beneficio comunicado | ⚠️ Potencial duplicación: ¿se comunica dos veces? |
| **Confort** | Es uno de los 7 criterios de ponderación | Es el segundo beneficio comunicado | ⚠️ Potencial duplicación: ¿se comunica dos veces? |
| **Calificación energética** | No aparece explícitamente | Es el tercer beneficio comunicado | ✅ Complementario |
| **Justificación del AT** | RF-003 permite al AT modificar el orden | RF-004 requiere que el AT justifique cada beneficio | ✅ Coherente: RF-003 justifica orden, RF-004 justifica beneficios |

#### Análisis de la duplicación:

**RF-003 usa "ahorro económico" y "confort" como CRITERIOS DE PONDERACIÓN** para calcular la puntuación compuesta que genera el orden recomendado.

**RF-004 usa "ahorro económico" y "confort" como BENEFICIOS COMUNICADOS** para explicar al cliente qué cambiará en su vivienda.

**¿Es duplicación?** Técnicamente no, pero hay un riesgo de **inconsistencia comunicativa**:

- Si RF-003 dice "esta actuación es prioritaria porque tiene alto ahorro económico"
- Y RF-004 dice "esta actuación ahorra 300-500€/año"
- El cliente puede confundir: "¿El ahorro es el criterio de prioridad o es un beneficio?"

**Recomendación:** Aclarar en ambos documentos que:
- RF-003 usa ahorro/confort como **criterios técnicos de ponderación** (internos)
- RF-004 comunica ahorro/confort como **beneficios percibidos** (externos, para el cliente)

---

### 3. ¿Falta algún paso entre ellos?

#### Respuesta: **POSIBLEMENTE SÍ — Falta RF-002**

#### Flujo actual (incompleto):

```
[PITR identifica problemas]
        ↓
[RF-002: Validación de confianza] ← FALTA ESTE PASO
        ↓
[RF-003: Jerarquía de Decisiones]
        ↓
[RF-004: Beneficios Esperados]
        ↓
[Cliente recibe plan de acción]
```

#### Preguntas sin respuesta:

1. **¿Cómo sabe RF-003 si los datos de PITR son fiables?**
   - RF-003 asume que los datos de entrada son válidos
   - Pero ¿quién valida esa validez?
   - RF-002 debería responder esto

2. **¿Cómo sabe RF-004 si las estimaciones de beneficios son confiables?**
   - RF-004 incluye un campo "Confianza de esta estimación: Alta/Media/Baja"
   - Pero ¿cómo se calcula ese nivel de confianza?
   - Probablemente depende de RF-002

3. **¿Qué ocurre si PITR no pudo medir algo importante?**
   - RF-003 dice: "Datos insuficientes para estimar beneficios"
   - RF-004 dice: "Sistema indica que la estimación tiene confianza baja"
   - Pero ¿quién determina si los datos son "suficientes"?
   - Probablemente RF-002

---

### 4. ¿El recorrido del cliente es natural y comprensible?

#### Respuesta: **SÍ, pero solo si RF-002 existe**

#### Recorrido actual (desde la perspectiva del cliente):

```
1. Cliente solicita diagnóstico
2. AT realiza inspección PITR
3. Sistema genera orden recomendado (RF-003)
   └─ Cliente ve: "Esto es prioritario, esto es recomendado, esto es opcional"
4. Sistema comunica beneficios (RF-004)
   └─ Cliente ve: "Si hago esto, ahorraré X€, mi casa será más cálida, etc."
5. Cliente decide qué hacer
```

**¿Es natural?** Sí, el flujo es lógico.

**¿Es comprensible?** Sí, pero con una salvedad:

- El cliente no sabe **por qué** el sistema recomienda un orden
- El cliente no sabe **si puede confiar** en esas recomendaciones
- El cliente no sabe **qué tan fiables** son las estimaciones de beneficios

**Esto es lo que RF-002 debería responder:**

> "Aquí está el diagnóstico. Aquí está el nivel de confianza. Aquí está por qué puedes confiar en estas recomendaciones."

---

### 5. ¿Cada requisito responde a una pregunta diferente?

#### Respuesta: **SÍ, pero falta una pregunta**

| Requisito | Pregunta que responde | Respuesta |
|-----------|----------------------|-----------|
| **RF-002** | ¿Es correcto el diagnóstico? | [FALTA] |
| **RF-003** | ¿Qué es prioritario? | Orden recomendado (🔴🟡🟢) |
| **RF-004** | ¿Cómo cambia mi vivienda? | Tarjetas de beneficios |

**Análisis:**

- RF-003 responde a una pregunta clara y diferente de RF-004 ✅
- RF-004 responde a una pregunta clara y diferente de RF-003 ✅
- Pero ambas asumen que RF-002 ya ha respondido su pregunta ❌

---

### 6. ¿Hay conceptos o términos utilizados de forma inconsistente?

#### Respuesta: **SÍ — Requiere alineación**

#### Inconsistencias identificadas:

| Concepto | RF-003 | RF-004 | Problema |
|----------|--------|--------|----------|
| **"Actuación"** | "Problema identificado que requiere intervención" | "Mejora esperada de la vivienda" | Mismo término, matices diferentes |
| **"Beneficio"** | No usa este término | "Cambio positivo esperado en la vivienda" | RF-003 no habla de beneficios |
| **"Impacto"** | No usa este término | Evita deliberadamente este término (por reframing) | Coherente pero requiere clarificación |
| **"Prioridad"** | 🔴 Prioritaria, 🟡 Recomendada, 🟢 Opcional | No usa este término (usa "beneficios") | Diferentes niveles de abstracción |
| **"Confianza"** | No aparece en RF-003 | "Confianza de esta estimación: Alta/Media/Baja" | RF-003 no menciona confianza |
| **"Justificación"** | "Justification Log" del AT | "¿Por qué el AT recomienda?" | Mismo concepto, contextos diferentes |

#### Análisis:

**Problema principal:** RF-003 y RF-004 usan vocabularios ligeramente diferentes para conceptos relacionados.

**Ejemplo:**
- RF-003 habla de "criterios de decisión" y "ponderación"
- RF-004 habla de "beneficios esperados" y "cambios en la vivienda"
- El cliente podría confundir: "¿El ahorro es un criterio o un beneficio?"

**Recomendación:** Crear un **glosario transversal** que defina términos clave de forma consistente en ambos documentos.

---

### 7. ¿Puede simplificarse el conjunto sin perder valor?

#### Respuesta: **NO — Cada requisito es necesario**

#### Justificación:

| Requisito | ¿Puede eliminarse? | ¿Por qué? |
|-----------|-------------------|----------|
| **RF-003** | ❌ No | Sin orden recomendado, el cliente no sabe por dónde empezar |
| **RF-004** | ❌ No | Sin comunicación de beneficios, el cliente no entiende qué cambia |

#### Posible simplificación:

**¿Podrían fusionarse RF-003 y RF-004 en un único requisito?**

**Respuesta:** No, porque responden a preguntas diferentes:
- RF-003: "¿Qué es prioritario?" → Orden
- RF-004: "¿Cómo cambia mi vivienda?" → Beneficios

Fusionarlos crearía un requisito híbrido que sería más complejo, no más simple.

---

## CONCLUSIONES PRELIMINARES

### ✅ Lo que funciona bien

1. **Flujo lógico:** RF-003 → RF-004 es una secuencia natural
2. **Separación de responsabilidades:** Cada requisito tiene un propósito claro
3. **Complementariedad:** RF-004 amplifica el valor de RF-003
4. **Rol del AT:** Ambos requisitos preservan la decisión final del AT

### ⚠️ Lo que requiere clarificación

1. **RF-002 no existe:** Necesita ser creado o integrado
2. **Duplicación de conceptos:** "Ahorro" y "confort" aparecen en ambos
3. **Vocabulario inconsistente:** Términos como "actuación", "beneficio", "impacto" se usan de forma ligeramente diferente
4. **Confianza no documentada:** RF-004 menciona "confianza" pero no define cómo se calcula

### ❌ Lo que falta

1. **RF-002 — Nivel de confianza del diagnóstico**
   - Debe validar la calidad de los datos de PITR
   - Debe informar al cliente sobre la fiabilidad de las recomendaciones
   - Debe ser la base para los niveles de confianza en RF-004

2. **Glosario transversal**
   - Definir términos clave de forma consistente
   - Alinear vocabulario entre RF-003 y RF-004

3. **Matriz de trazabilidad**
   - Mostrar cómo los datos de PITR fluyen a través de RF-002 → RF-003 → RF-004

---

## RECOMENDACIONES

### Antes de continuar con RF-005:

1. **Crear RF-002** o confirmar dónde está integrado
2. **Alinear vocabulario** entre RF-003 y RF-004
3. **Documentar la trazabilidad** de datos a través de la Capa 1
4. **Validar que el flujo es completo** desde PITR hasta la decisión del cliente

### Próximos pasos:

- [ ] Localizar o crear RF-002
- [ ] Revisar RF-003 y RF-004 para alinear terminología
- [ ] Crear matriz de trazabilidad de datos
- [ ] Validar flujo completo con el usuario

---

*Fin del análisis preliminar*
