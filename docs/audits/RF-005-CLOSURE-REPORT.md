# INFORME DE CIERRE — RF-005: Inversión y Retorno

| Campo | Valor |
|-------|-------|
| **Código** | RF-005-CLOSURE |
| **Título** | Informe de cierre del análisis conceptual de RF-005 |
| **Fecha** | 2026-07-08 |
| **Sesión** | Continuación desde SESSION-HANDOVER-PRD001 |
| **Estado** | ✅ COMPLETADO |

---

## 1. Resumen ejecutivo

Se ha completado el análisis conceptual de **RF-005 (Inversión y Retorno)**, el último requisito funcional de la Capa 1 del PRD-001 (ATI-03). El análisis se ha documentado en `docs/analysis/RF-005-INVERSION-RETORNO.md` (713 líneas, 15 secciones).

RF-005 responde a la **pregunta 5 del cliente** definida en ATI-03: *"¿Qué inversión merece la pena?"*

---

## 2. Cambios principales introducidos

El análisis conceptual de RF-005 introduce los siguientes cambios respecto a la definición original en PRD-001 V2 (§7.6):

1. **Reframing de "ROI técnico" a "Veredicto de Inversión"** — Se abandona el término ROI (demasiado financiero para el usuario doméstico) en favor de una clasificación intuitiva: ✅ Merece la pena / 🟡 Valóralo / ❌ No recomendado.

2. **Integración en tarjeta única** — RF-005 no es un entregable independiente. Se integra como la **tercera sección** de una tarjeta única de actuación que ya incluye RF-003 (Priorización) y RF-004 (Beneficios), más una sección transversal de Confianza (RF-002).

3. **Sistema de clasificación ternario** — El veredicto se determina por la relación entre payback simple y vida útil de la actuación:
   - ✅ Merece la pena: payback < vida útil / 2
   - 🟡 Valóralo: vida útil / 2 ≤ payback ≤ vida útil
   - ❌ No recomendado: payback > vida útil

4. **Cálculo off-PITR** — RF-005 no requiere nuevos datos de PITR. Usa el ahorro anual estimado de RF-004 y tablas externas de costes de referencia y vidas útiles.

---

## 3. Documentos afectados

| Documento | Cambio |
|-----------|--------|
| `docs/analysis/RF-005-INVERSION-RETORNO.md` | ✅ Creado (análisis conceptual completo) |
| `docs/analysis/MATRIZ-TRAZABILIDAD-CAPA1.md` | ✅ Actualizado (v1.1: estado RF-005, hito H3) |

---

## 4. Verificaciones

| Verificación | Resultado |
|-------------|-----------|
| Build completo | ✅ Compilación exitosa (0 errores, 0 warnings) |
| Sin TODO/FIXME en archivos de la épica | ✅ Ninguno |
| Sin console.log en producción | ✅ No aplica (documento de análisis) |
| Tipos TypeScript actualizados | ✅ No aplica (no hay cambios de código) |
| Tests | ✅ No aplica (no hay cambios de código) |

---

## 5. Product-First Execution Mode — Preguntas obligatorias

Según AGENTS.md §9.5, se responden las preguntas obligatorias:

### 5.1 ¿Qué capacidad funcional añade al MVP?

RF-005 añade la capacidad de que el cliente sepa, para cada actuación recomendada por el AT, si **económicamente merece la pena** ejecutarla o no. Esto cierra la pregunta 5 del ATI-03: *"¿Qué inversión merece la pena?"*

Sin RF-005, el ATI-03 diría "cambia la caldera" y diría el ahorro, pero el cliente no sabría si los 5.000€ de inversión se recuperan antes de que la caldera se estropee definitivamente.

### 5.2 ¿Qué agregados participan?

Ninguno nuevo. RF-005 es un análisis conceptual que consume datos de los agregados existentes del Core V1:
- **Expediente**: contiene las actuaciones propuestas
- **Documento IA**: contiene las estimaciones de ahorro (RF-004)

### 5.3 ¿Cómo interactúan entre sí?

RF-005 es un **consumidor puro**. Toma el ahorro anual estimado de RF-004 (que opera sobre Documento IA) y lo combina con tablas externas de costes de referencia y vidas útiles para generar el veredicto.

### 5.4 ¿Por qué esta es la solución de menor complejidad?

- **Reutilización**: Usa los datos existentes de RF-004 (ahorro anual estimado). No requiere nuevas fuentes de datos PITR.
- **Sin nuevos agregados**: No se crean nuevos Aggregate Roots, Bounded Contexts ni servicios de dominio.
- **Cálculo simple**: El veredicto se determina con una regla ternaria (3 comparaciones).
- **Tablas externas existentes**: Los costes de referencia y vidas útiles provienen de tablas estándar del sector (CTE, IDAE, fabricantes) — no se requiere investigación primaria.

---

## 6. Clasificación V2

No se identifican mejoras clasificables como V2 en este análisis. El documento es completo para MVP.

---

## 7. Riesgos y recomendaciones

### 7.1 Riesgo identificado

| Riesgo | Descripción | Mitigación |
|--------|-------------|------------|
| Precios de referencia desactualizados | Las tablas de costes pueden quedar obsoletas con la inflación | Revisión periódica (anual). En V2, actualización dinámica vía índice |

### 7.2 Recomendaciones V2

1. **Tarifa real del cliente** — Permitir al cliente introducir su tarifa real en lugar de usar la tarifa media de zona.
2. **Subvenciones automáticas** — Calcular subvenciones aplicables automáticamente por tipo de actuación y zona.
3. **Análisis de sensibilidad** — Mostrar cómo afectan al retorno variaciones en el precio de la energía.
4. **Payback descontado** — Añadir payback descontado (VAN/TIR) para actuaciones de alto coste.

---

## 8. Cierre de la Capa 1

Con la finalización de RF-005, los **4 requisitos funcionales de la Capa 1 del PRD-001 (ATI-03)** están completados y documentados:

| Requisito | Estado | Documento |
|-----------|--------|-----------|
| RF-002 — Nivel de Confianza | ✅ Completado | `RF-002-NIVEL-DE-CONFIANZA.md` |
| RF-003 — Jerarquía de Decisiones | ✅ Completado | `RF-003-JERARQUIA-DE-DECISIONES.md` |
| RF-004 — Impacto de Actuaciones | ✅ Completado | `RF-004-IMPACTO-DE-ACTUACIONES.md` |
| RF-005 — Inversión y Retorno | ✅ Completado | `RF-005-INVERSION-RETORNO.md` |

**Siguiente paso:** Diseño de prototipo del documento de decisiones (pila de decisión capas 1-6) y test de comprensión con usuarios.

---

## Histórico de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 1.0 | 2026-07-08 | Sistema | Versión inicial. Informe de cierre del análisis conceptual RF-005. |

---

*Fin del informe de cierre RF-005*