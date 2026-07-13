# CF-028 — AUDITORÍA DOCUMENTAL

> **Informe de auditoría de CF-028-EXPEDIENTE-WORKFLOW.md**
>
> Objetivo: Identificar qué apartados describen el MVP (V1) y cuáles describen el Motor PITR futuro (V2).
> Proponer una actualización que separe claramente ambos mundos.

---

## RESUMEN EJECUTIVO

CF-028 mezcla dos flujos distintos sin marcar explícitamente cuál pertenece al MVP y cuál al futuro:

1. **Flujo MVP (V1):** Revisión manual del AT — `PteDocumentacion → RevisionManual → Aprobado/Rechazado`
2. **Flujo Futuro (V2):** Motor PITR automático — `PteDocumentacion → EnRevisionPITR → Auditado/RevisionManual`

Esta confusión ha generado interpretaciones incorrectas sobre el estado `EnRevisionPITR` como obligatorio en el MVP.

---

## 1. APARTADOS QUE DESCRIBEN EL MVP (V1)

### ✅ Fase 0 — Pre-creación (§3)
- **Líneas:** 130-238
- **Estado:** Completamente MVP
- **Descripción:** Identificación de cliente e inmueble
- **Acción requerida:** Marcar explícitamente como V1

### ✅ Fase 1 — Creación del expediente (§4)
- **Líneas:** 241-343
- **Estado:** Completamente MVP
- **Descripción:** Creación del expediente en estado `Solicitud`
- **Acción requerida:** Marcar explícitamente como V1

### ⚠️ Fase 2 — Recepción de documentación (§5)
- **Líneas:** 346-482
- **Estado:** PARCIALMENTE MVP
- **Descripción:** Subida de documentos y validación
- **Problema:** Líneas 405-419 describen transición a `EnRevisionPITR` que NO ocurre en MVP
- **Acción requerida:** Separar en dos subsecciones:
  - **§5.1 (V1):** Subida y validación de documentos
  - **§5.2 (V2):** Transición automática a `EnRevisionPITR` (futuro)

### ❌ Fase 3 — Análisis PITR automático (§6)
- **Líneas:** 485-629
- **Estado:** COMPLETAMENTE FUTURO (V2)
- **Descripción:** Motor PITR automático con extracción de variables, evaluación, cálculo de confianza
- **Problema:** Presentado como parte del flujo actual sin marcar como futuro
- **Acción requerida:** Mover a sección separada "Fase 3 — Análisis PITR automático (V2 FUTURO)"

### ⚠️ Fase 4 — Revisión manual del AT (§7)
- **Líneas:** 632-753
- **Estado:** PARCIALMENTE MVP
- **Descripción:** Revisión manual del AT
- **Problema:** Líneas 644-670 asumen que el expediente viene de `EnRevisionPITR`, pero en MVP viene de `PteDocumentacion`
- **Acción requerida:** Reescribir para reflejar que en V1 el AT accede directamente desde `PteDocumentacion`

### ✅ Fase 5 — Entrega del resultado (§8)
- **Líneas:** 756-865
- **Estado:** Completamente MVP (EP-032)
- **Descripción:** Transición `Aprobado → Entregado`
- **Acción requerida:** Marcar explícitamente como V1

### ✅ Fase de cancelación y rechazo (§9)
- **Líneas:** 868-929
- **Estado:** Completamente MVP
- **Descripción:** Cancelación, rechazo, devolución
- **Acción requerida:** Marcar explícitamente como V1

### ✅ Matriz de responsabilidades (§10)
- **Líneas:** 932-975
- **Estado:** Completamente MVP
- **Acción requerida:** Marcar explícitamente como V1

### ⚠️ Mapa de eventos (§11)
- **Líneas:** 978-1020
- **Estado:** PARCIALMENTE MVP
- **Problema:** Eventos `PITRAnalisisCompletado`, `PITRConfianzaAlta`, `PITRConfianzaBaja` (líneas 1001-1003) pertenecen a V2
- **Acción requerida:** Separar eventos V1 de eventos V2

### ⚠️ Validaciones por paso (§12)
- **Líneas:** 1023-1050
- **Estado:** PARCIALMENTE MVP
- **Problema:** Línea 1038 menciona transición `PteDocumentacion → EnRevisionPITR` que no ocurre en MVP
- **Acción requerida:** Actualizar tabla de transiciones para reflejar flujo MVP real

### ⚠️ Gestión de fallos (§13)
- **Líneas:** 1053-1108
- **Estado:** PARCIALMENTE MVP
- **Problema:** Líneas 1085-1097 describen fallos del motor PITR (V2)
- **Acción requerida:** Separar fallos V1 de fallos V2

### ⚠️ Manual vs. Automatizado (§14)
- **Líneas:** 1111-1165
- **Estado:** PARCIALMENTE MVP
- **Problema:** Tabla §14.2 mezcla V1 y V2 sin distinción clara
- **Acción requerida:** Separar columnas V1 y V2 explícitamente

---

## 2. APARTADOS QUE DESCRIBEN EL MOTOR PITR FUTURO (V2)

### ❌ Fase 3 — Análisis PITR automático (§6)
- **Líneas:** 485-629
- **Descripción completa:** Motor PITR automático
- **Componentes V2:**
  - Extracción automática de variables CE3X (líneas 503-510)
  - Evaluación por variable (líneas 514-523)
  - Cálculo de confianza global (líneas 527-533)
  - Generación de informe PITR (líneas 537-547)
  - Decisión de ruta automática (líneas 551-566)

### ❌ Transición automática PteDocumentacion → EnRevisionPITR
- **Líneas:** 405-419 (en §5.2)
- **Descripción:** Transición automática cuando documentación mínima está completa
- **Estado:** V2 (requiere motor PITR)

### ❌ Eventos PITR
- **Líneas:** 1001-1003 (en §11.3)
- **Eventos:**
  - `PITRAnalisisCompletado`
  - `PITRConfianzaAlta`
  - `PITRConfianzaBaja`

### ❌ Fallos del motor PITR
- **Líneas:** 1085-1097 (en §13.2)
- **Descripción:** Manejo de errores del motor PITR automático

---

## 3. FLUJO REAL DEL MVP (SEGÚN CF-050 Y CÓDIGO)

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUJO MVP V1 REAL                        │
│                                                             │
│  Cliente sube documentos                                    │
│         ↓                                                   │
│  Expediente → PteDocumentacion ✅                           │
│         ↓                                                   │
│  AT accede a bandeja técnica (estado PteDocumentacion) ✅   │
│         ↓                                                   │
│  AT inicia revisión manualmente ✅                          │
│  (acción: iniciarRevisionExpediente)                        │
│         ↓                                                   │
│  Expediente → RevisionManual ✅                             │
│         ↓                                                   │
│  AT revisa documentación y variables CE3X (MANUAL) ✅       │
│         ↓                                                   │
│  AT aprueba o rechaza ✅                                    │
│         ↓                                                   │
│  Expediente → Aprobado/Rechazado ✅                         │
│         ↓                                                   │
│  Expediente → Entregado ✅                                  │
│                                                             │
│  ❌ NO EXISTE: EnRevisionPITR                               │
│  ❌ NO EXISTE: Motor PITR automático                        │
│  ❌ NO EXISTE: Extracción automática de variables           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. FLUJO FUTURO CON MOTOR PITR (V2)

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUJO FUTURO V2                          │
│                                                             │
│  Cliente sube documentos                                    │
│         ↓                                                   │
│  Expediente → PteDocumentacion                              │
│         ↓                                                   │
│  [AUTOMÁTICO] Verificar documentación mínima                │
│         ↓                                                   │
│  Expediente → EnRevisionPITR (AUTOMÁTICO) ← V2              │
│         ↓                                                   │
│  [AUTOMÁTICO] Motor PITR procesa:                           │
│    - Extrae variables CE3X (OCR + IA)                       │
│    - Evalúa por variable                                    │
│    - Calcula confianza global                               │
│    - Genera informe PITR                                    │
│         ↓                                                   │
│  Expediente → Auditado (si confianza ≥ 80%) ← V2           │
│         ↓                                                   │
│  AT revisa informe PITR (MANUAL)                            │
│         ↓                                                   │
│  Expediente → Aprobado/Rechazado                            │
│         ↓                                                   │
│  Expediente → Entregado                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. DIFERENCIAS CLAVE ENTRE CF-028 Y REALIDAD

| Aspecto | CF-028 (actual) | Realidad MVP | Acción |
|---------|-----------------|--------------|--------|
| **Transición tras documentación mínima** | `PteDocumentacion → EnRevisionPITR` (automática) | `PteDocumentacion` (espera AT) | Corregir §5.2 |
| **Quién inicia revisión** | Motor PITR automático | AT manual | Corregir §7.2 |
| **Bandeja técnica consume** | `EnRevisionPITR` | `PteDocumentacion` | Corregir §7.2 |
| **Extracción de variables CE3X** | Automática (motor PITR) | Manual (AT introduce) | Corregir §7.2 |
| **Evaluación por variable** | Automática (motor PITR) | Manual (AT aplica criterio) | Corregir §7.2 |
| **Cálculo de confianza** | Automático | Manual (AT decide) | Corregir §7.2 |
| **Generación de informe PITR** | Automática | Manual (AT redacta) | Corregir §7.2 |
| **Decisión Auditado vs. RevisionManual** | Automática (basada en confianza) | Manual (AT decide) | Corregir §7.2 |

---

## 6. PROPUESTA DE ACTUALIZACIÓN DE CF-028

### Estructura propuesta:

```
## 1. Propósito y alcance
## 2. Diagrama general del flujo
## 3. Fase 0 — Pre-creación (V1)
## 4. Fase 1 — Creación del expediente (V1)
## 5. Fase 2 — Recepción de documentación (V1)
   ### 5.1 Subida y validación de documentos (V1)
   ### 5.2 Transición automática a EnRevisionPITR (V2 FUTURO)
## 6. Fase 3 — Análisis PITR automático (V2 FUTURO)
## 7. Fase 4 — Revisión manual del AT (V1)
   ### 7.1 Flujo MVP: AT accede desde PteDocumentacion (V1)
   ### 7.2 Flujo Futuro: AT accede desde Auditado (V2)
## 8. Fase 5 — Entrega del resultado (V1)
## 9. Fase de cancelación y rechazo (V1)
## 10. Matriz de responsabilidades (V1)
## 11. Mapa de eventos (V1 + V2 separados)
## 12. Validaciones por paso (V1 + V2 separados)
## 13. Gestión de fallos (V1 + V2 separados)
## 14. Manual vs. Automatizado (V1 + V2 separados)
## 15. Glosario
```

### Cambios específicos requeridos:

#### **§5.2 — Transición automática (NUEVA SUBSECCIÓN V2)**

**Líneas a mover:** 405-419

**Nuevo encabezado:**
```markdown
### 5.2 Transición automática a EnRevisionPITR (V2 FUTURO)

⚠️ **NOTA:** Esta subsección describe el flujo futuro con motor PITR automático.
En el MVP V1, esta transición NO ocurre. El expediente permanece en PteDocumentacion
hasta que el AT inicia manualmente la revisión.

[Contenido actual de líneas 405-419]
```

#### **§6 — Análisis PITR (RENOMBRAR A V2 FUTURO)**

**Nuevo encabezado:**
```markdown
## 6. Fase 3 — Análisis PITR automático (V2 FUTURO)

⚠️ **NOTA:** Esta fase describe el motor PITR automático que será implementado en V2.
En el MVP V1, esta fase NO existe. La revisión es completamente manual por el AT.

[Contenido actual sin cambios]
```

#### **§7.2 — Flujo de revisión (REESCRIBIR PARA V1)**

**Líneas a reescribir:** 644-670

**Nuevo contenido:**

```markdown
### 7.2 Flujo de revisión en el MVP V1

En el MVP V1, el flujo es completamente manual:

```
Expediente en PteDocumentacion
    ↓
┌──────────────────────────────────────────────────────────────┐
│ AT accede a la bandeja técnica                               │
│ (expedientes en estado PteDocumentacion)                     │
│                                                              │
│ El AT tiene acceso a:                                        │
│  - Datos del Cliente (solo lectura)                          │
│  - Datos del Inmueble (solo lectura)                         │
│  - Certificado original (Documento IA)                       │
│  - Fotografías y documentación (Documento IA)                │
│                                                              │
│ El AT realiza MANUALMENTE:                                   │
│  1. Verifica que el PDF es un certificado energético válido  │
│  2. Introduce manualmente las variables CE3X                 │
│  3. Evalúa cada variable según su criterio técnico           │
│  4. Detecta contradicciones entre evidencias                 │
│  5. Decide si aprueba o rechaza                              │
└──────────────────────────────────────────────────────────────┘
    ↓
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
└──────────────────────────────────────────────────────────────┘
```

### 7.3 Flujo futuro con motor PITR (V2)

[Contenido actual de §7.2 renombrado como §7.3]
```

#### **§11 — Mapa de eventos (SEPARAR V1 Y V2)**

**Cambio:** Crear dos subsecciones:

```markdown
### 11.1 Eventos del MVP V1

[Eventos que ocurren en V1]

### 11.2 Eventos del Motor PITR (V2 FUTURO)

⚠️ **NOTA:** Los siguientes eventos pertenecen al motor PITR automático de V2.

| Evento | Emisor | Receptores | Fase |
|--------|--------|------------|------|
| `PITRAnalisisCompletado` | Motor PITR | Expediente (procesa resultado) | 3 |
| `PITRConfianzaAlta` | Motor PITR | Expediente (transición a Auditado) | 3 |
| `PITRConfianzaBaja` | Motor PITR | Expediente (transición a RevisionManual) | 3 |
```

#### **§12 — Validaciones (ACTUALIZAR TABLA)**

**Línea 1038 — Cambiar:**

```markdown
| PteDocumentacion → EnRevisionPITR | V-DOC-01, V-DOC-04, I-EX-10 |
```

**Por:**

```markdown
| PteDocumentacion → EnRevisionPITR | V-DOC-01, V-DOC-04, I-EX-10 | (V2 FUTURO) |
| PteDocumentacion → RevisionManual | (AT inicia manualmente) | (V1) |
```

#### **§14.2 — Manual vs. Automatizado (SEPARAR COLUMNAS)**

**Cambio:** Crear tabla con tres columnas:

```markdown
| Paso | V1 MVP | V2 Futuro | Prioridad |
|------|--------|-----------|-----------|
| Extracción de variables CE3X | Manual (AT introduce) | Automático (OCR + IA) | Crítica |
| Evaluación por variable | Manual (AT aplica criterio) | Semiautomático (reglas + IA) | Alta |
| ...
```

---

## 7. IMPACTO DE LA ACTUALIZACIÓN

### Beneficios:

1. ✅ **Claridad:** Desarrolladores sabrán exactamente qué pertenece a V1 y qué a V2
2. ✅ **Prevención de errores:** No habrá interpretaciones incorrectas sobre `EnRevisionPITR`
3. ✅ **Trazabilidad:** Cada sección tendrá un marcador explícito de versión
4. ✅ **Mantenibilidad:** Futuras actualizaciones serán más fáciles de integrar

### Riesgo:

- Bajo: Solo cambios de estructura y clarificación, sin cambios de contenido técnico

---

## 8. RECOMENDACIONES

1. **Aplicar cambios en orden:**
   - Primero: Renombrar §6 a "V2 FUTURO"
   - Segundo: Separar §5.2 como subsección V2
   - Tercero: Reescribir §7.2 para flujo V1
   - Cuarto: Separar eventos, validaciones y manual vs. automatizado

2. **Añadir advertencia al inicio:**
   ```markdown
   > ⚠️ **IMPORTANTE:** Este documento describe tanto el flujo MVP V1 (implementado)
   > como el flujo futuro V2 con motor PITR automático (no implementado).
   > Cada sección está marcada explícitamente con su versión.
   > Para el MVP V1, consulta las secciones marcadas como "V1".
   ```

3. **Crear documento complementario:**
   - Documento: `CF-028-MVP-V1-FLUJO-SIMPLIFICADO.md`
   - Contenido: Solo el flujo MVP V1 sin referencias a V2
   - Propósito: Referencia rápida para desarrolladores

---

## CONCLUSIÓN

CF-028 es un documento valioso que describe tanto el MVP como el futuro, pero la falta de separación explícita ha generado confusión. La actualización propuesta mantiene todo el contenido técnico mientras añade claridad sobre qué pertenece a cada versión.

**Próximo paso:** Aprobación de esta propuesta antes de modificar CF-028.
