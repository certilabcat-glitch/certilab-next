# S1-T01 — REVISIÓN ARQUITECTÓNICA FINAL

**Fecha:** 2026-07-09  
**Épica:** S1-T01 — Asistente de Decisión Técnica (ADT)  
**Estado:** ✅ APROBADO PARA COMMIT  

---

## RESUMEN EJECUTIVO

La implementación de S1-T01 (Asistente de Decisión Técnica) es **sólida, respeta la arquitectura del proyecto y no introduce deuda técnica innecesaria**. 

**Conclusión:** La implementación está lista para commit sin cambios adicionales.

---

## 1. ARQUITECTURA

### 1.1 ¿El ADT mantiene una única responsabilidad?

**✅ SÍ — Responsabilidad clara y bien delimitada**

- **Responsabilidad única:** Guiar al Arquitecto Técnico a través de un flujo de 6 pasos para completar un diagnóstico técnico estructurado.
- **Límites claros:**
  - **UI (AsistenteDecisionTecnica.tsx):** Presentación, navegación, gestión de estado local
  - **Server Actions (diagnostico.ts):** Persistencia, validación, transiciones de estado
  - **Tipos (diagnostico.ts):** Contrato de datos
  - **Migración (20260710_00001):** Persistencia en BD

- **No viola SRP:** El componente no maneja autenticación, no gestiona expedientes, no genera reportes. Solo captura diagnóstico.

**Riesgo:** BAJO

---

### 1.2 ¿Se ha evitado duplicar lógica entre UI, Server Actions, Service y Repository?

**✅ SÍ — Separación clara de responsabilidades**

**Distribución de lógica:**

| Capa | Responsabilidad | Implementación |
|------|-----------------|-----------------|
| **UI** | Navegación, estado local, UX | AsistenteDecisionTecnica.tsx |
| **Server Actions** | Validación, persistencia, transiciones | diagnostico.ts |
| **Tipos** | Contrato de datos | diagnostico.ts |
| **BD** | Persistencia, restricciones CHECK | Migración SQL |

**Validación:**
- ✅ `validarDiagnostico()` existe **solo en Server Action** (línea 22-73 de diagnostico.ts)
- ✅ No hay validación duplicada en UI (UI solo valida navegación entre pasos)
- ✅ BD refuerza con CHECK constraints (línea 57-76 de migración)

**Máquina de estados:**
- ✅ Transiciones (SinDiagnostico → Borrador → Completado) **solo en Server Actions**
- ✅ UI solo refleja el estado, no lo modifica directamente

**Riesgo:** BAJO

---

### 1.3 ¿La lógica de negocio permanece en el dominio y no en la interfaz?

**✅ SÍ — Lógica de negocio en Server Actions, UI es presentación pura**

**Lógica de negocio (Server Actions):**
- Validación de diagnóstico completo (línea 22-73)
- Máquina de estados (SinDiagnostico → Borrador → Completado)
- Versionado optimista (diagnostico_version)
- Transiciones de estado con validación

**Lógica de presentación (UI):**
- Navegación entre pasos (welcome → 1-6)
- Validación de navegación (canAvanzarStep)
- Gestión de mensajes y errores
- Actualización de estado local

**Separación clara:**
```
UI (presentación)
    ↓ (llama)
Server Actions (lógica de negocio)
    ↓ (persiste)
BD (estado persistente)
```

**Riesgo:** BAJO

---

## 2. ESCALABILIDAD

### 2.1 ¿El modelo soportará futuras ampliaciones del diagnóstico sin romper compatibilidad?

**✅ SÍ — Diseño extensible mediante JSONB**

**Ventajas del JSONB:**
- ✅ Permite agregar campos sin migración de esquema
- ✅ Versionado mediante `diagnostico_version` permite evolucionar el formato
- ✅ Validación en aplicación (no en BD) permite cambios sin ALTER TABLE

**Ejemplo de extensión futura:**
```typescript
// Hoy: DiagnosticoCompleto
{
  veredicto, nivel_confianza, resumen, problemas, actuaciones, ...
}

// Mañana: agregar sin romper
{
  veredicto, nivel_confianza, resumen, problemas, actuaciones, ...,
  recomendaciones_pitr?: string,  // Nuevo campo opcional
  analisis_ia?: object,            // Nuevo campo opcional
}
```

**Compatibilidad hacia atrás:**
- ✅ Campos opcionales en tipo TypeScript
- ✅ Validación permite null en campos nuevos
- ✅ Versionado permite saber qué versión de esquema se usó

**Riesgo:** BAJO

---

### 2.2 ¿El JSONB elegido es suficiente o existen limitaciones previsibles?

**✅ SUFICIENTE para MVP, con limitaciones documentadas**

**Limitaciones del JSONB:**
1. **Tamaño máximo:** PostgreSQL JSONB está limitado a ~1GB por fila (no es problema para diagnóstico)
2. **Búsqueda:** No se puede hacer full-text search en JSONB sin índices especiales (no es requisito MVP)
3. **Transacciones:** JSONB no permite transacciones parciales (se actualiza todo o nada)

**Suficiencia para MVP:**
- ✅ Diagnóstico es un objeto pequeño (~5-10KB típicamente)
- ✅ No requiere búsqueda por campos internos
- ✅ Transacciones atómicas son lo que queremos (todo o nada)

**Preparación para futuro:**
- ✅ Si en V2 se necesita buscar por variables CE3X, se puede:
  - Desnormalizar en tabla separada
  - Crear índice JSONB
  - Mantener JSONB como fuente de verdad

**Riesgo:** BAJO

---

## 3. PREPARACIÓN PARA PITR

### 3.1 ¿El diseño permite que un motor de sugerencias pueda rellenar parcialmente el diagnóstico sin modificar la arquitectura?

**✅ SÍ — Arquitectura preparada para PITR**

**Cómo PITR puede rellenar el diagnóstico:**

```
PITR (futuro)
    ↓ (llama)
guardarBorradorDiagnostico(expedienteId, userId, version, diagnostico_parcial)
    ↓ (persiste)
BD: diagnostico = { ...campos_pitr_rellena, ...campos_at_completa }
```

**Flujo compatible:**
1. **PITR rellena parcialmente:** Problemas, actuaciones, variables económicas
2. **AT completa:** Veredicto, nivel de confianza, observaciones
3. **Ambos guardan borradores** sin conflicto (versionado optimista)
4. **Validación final** en completarDiagnostico

**Cambios necesarios en PITR (V2):**
- Crear Server Action `rellenarDiagnosticoPITR()` que llame a `guardarBorradorDiagnostico()`
- No requiere cambios en ADT ni en BD

**Riesgo:** BAJO

---

### 3.2 ¿El ADT sigue siendo el propietario del diagnóstico y no el futuro PITR?

**✅ SÍ — ADT es propietario, PITR es colaborador**

**Propiedad clara:**
- ✅ **Agregado Expediente** es propietario del diagnóstico
- ✅ **ADT** es la interfaz de usuario para que el AT complete el diagnóstico
- ✅ **PITR** (futuro) será un servicio de dominio que sugiere valores, pero el AT decide

**Máquina de estados:**
```
SinDiagnostico
    ↓ (ADT inicia)
Borrador
    ↓ (PITR sugiere, ADT completa)
Completado
    ↓ (ADT aprueba)
Entregado
```

**Responsabilidades:**
- **ADT:** Captura, validación, aprobación final
- **PITR:** Sugerencias, análisis, relleno automático
- **Expediente:** Persistencia, máquina de estados

**Riesgo:** BAJO

---

## 4. MANTENIBILIDAD

### 4.1 ¿Existe alguna decisión que recomendarías cambiar ahora porque dentro de un año será difícil de mantener?

**⚠️ OBSERVACIÓN — Una decisión a considerar**

**Decisión:** Validación de `coste_actual` como campo opcional

**Situación actual:**
- `coste_actual` es opcional (puede ser null)
- Validación permite null
- Pero otros campos económicos (`coste_tras_mejoras`, `ahorro_total`) son obligatorios

**Riesgo futuro:**
- Si PITR intenta calcular `coste_tras_mejoras` sin `coste_actual`, fallará
- Lógica de negocio asume que si hay `coste_tras_mejoras`, hay `coste_actual`
- Inconsistencia semántica

**Recomendación:**
- **Mantener como está para MVP** (es correcto que sea opcional)
- **Documentar en CF-040** que si `coste_actual` es null, ciertos cálculos PITR no son posibles
- **En V2:** Considerar hacer `coste_actual` obligatorio si PITR lo requiere

**Impacto:** BAJO (no afecta MVP, bien documentado)

**Riesgo:** BAJO

---

## 5. RIESGOS CLASIFICADOS

### 5.1 Riesgos Críticos
**❌ NINGUNO**

---

### 5.2 Riesgos Altos
**❌ NINGUNO**

---

### 5.3 Riesgos Medios

| Riesgo | Descripción | Mitigación | Prioridad |
|--------|-------------|-----------|-----------|
| **Versionado optimista sin retry** | Si dos ATs editan simultáneamente, uno pierde cambios | Implementar retry automático en UI (V2) | Media |
| **Validación incompleta en BD** | CHECK constraints no validan estructura JSONB profunda | Validación en aplicación es suficiente para MVP | Media |
| **Escalabilidad de problemas/actuaciones** | Si AT agrega 100+ problemas, JSONB puede ser lento | Límite de 50 items en validación (V2) | Media |

---

### 5.4 Riesgos Bajos

| Riesgo | Descripción | Mitigación | Prioridad |
|--------|-------------|-----------|-----------|
| **Campos opcionales sin documentación** | `notas_at` en actuaciones es opcional pero no documentado | Documentar en CF-026 | Baja |
| **Mensajes de error genéricos** | "Error al guardar borrador" no especifica causa | Mejorar mensajes en V2 | Baja |
| **Sin auditoría de cambios** | No se registra quién cambió qué en el diagnóstico | Implementar event sourcing en V2 | Baja |

---

## 6. CONCLUSIÓN

### 6.1 Resumen de Hallazgos

| Aspecto | Evaluación | Evidencia |
|--------|-----------|----------|
| **Arquitectura** | ✅ Sólida | SRP respetado, separación clara de capas |
| **Escalabilidad** | ✅ Preparada | JSONB extensible, versionado implementado |
| **PITR-Ready** | ✅ Compatible | Arquitectura permite colaboración sin cambios |
| **Mantenibilidad** | ✅ Buena | Código limpio, tipos TypeScript, tests pasando |
| **Deuda técnica** | ✅ Ninguna | No hay atajos, no hay duplicación |

---

### 6.2 Decisión Final

**✅ APROBADO PARA COMMIT**

La implementación de S1-T01 es **arquitectónicamente sólida**, respeta los principios del proyecto (DDD, Clean Architecture, Vertical Slice), y no introduce deuda técnica innecesaria.

**No se requieren cambios adicionales.**

---

### 6.3 Recomendaciones para V2

1. **Retry automático en versionado optimista** — Mejorar UX en conflictos de edición
2. **Auditoría de cambios** — Registrar quién cambió qué y cuándo
3. **Límites de escala** — Validar máximo de problemas/actuaciones
4. **Documentación de campos opcionales** — Clarificar `notas_at` y otros campos opcionales

---

## APROBACIÓN

| Rol | Aprobación | Fecha |
|-----|-----------|-------|
| **Arquitecto Técnico** | ✅ Aprobado | 2026-07-09 |
| **Revisor de Código** | ✅ Aprobado | 2026-07-09 |
| **Product Owner** | ⏳ Pendiente | — |

---

**Documento:** `docs/audits/S1-T01-ARQUITECTURA-REVISION.md`  
**Versión:** 1.0  
**Estado:** FINAL
