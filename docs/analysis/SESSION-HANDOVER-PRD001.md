# SESSION HANDOVER — PRD-001 / ATI-03

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-07-08 |
| **Sesión** | Análisis conceptual PRD-001 + experiencia cliente ATI-03 |
| **Propósito** | Permitir continuar el trabajo sin releer semanas de conversaciones |

---

## 1. Estado actual del proyecto

- PRD-001 (ATI-03) fue revisado conceptualmente: pasa de ser un "informe técnico" a una "herramienta de decisión". Documento actualizado a V2.
- Se completaron y documentaron los análisis conceptuales de **RF-002** (Nivel de Confianza), **RF-003** (Jerarquía de Decisiones) y **RF-004** (Impacto de Actuaciones).
- Se realizó y validó un análisis completo de la **experiencia del cliente ATI-03** (10 preguntas).
- **RF-005 no se ha iniciado.** Se decidió no continuar con RF-005 hasta validar la experiencia completa del producto.

---

## 2. Decisiones congeladas

| Decisión | Fuente |
|----------|--------|
| ATI-03 responde a: **"¿Qué decisión debería tomar sobre mi vivienda?"** No responde a "¿Cómo ejecuto esa decisión?" | Validación cliente (esta sesión) |
| La brecha entre diagnóstico y acción no se resuelve ampliando ATI-03. Queda como oportunidad para futuros productos del ecosistema. | Validación cliente (esta sesión) |
| El producto real no es el dashboard. El producto es **la seguridad que siente el cliente al tomar una decisión**. | Validación cliente (esta sesión) |
| Arquitectura V1 congelada por CF-001A. No se proponen cambios en DDD, Clean Architecture, Vertical Slice, Aggregate Roots, etc. | CF-001A |
| MVP Discipline: No CQRS, Event Sourcing, microservicios, multi tenant, etc. sin ADR aprobada. | AGENTS.md §8 |

---

## 3. Documentos fuente de verdad

| Documento | Rol |
|-----------|-----|
| `docs/analysis/PRD-001-ATI03-INFORME-TECNICO-ENERGETICO.md` (V2) | Definición conceptual del producto ATI-03 |
| `docs/analysis/RF-002-NIVEL-DE-CONFIANZA.md` | Análisis completado |
| `docs/analysis/RF-003-JERARQUIA-DE-DECISIONES.md` | Análisis completado |
| `docs/analysis/RF-004-IMPACTO-DE-ACTUACIONES.md` | Análisis completado |
| `docs/analysis/GLOSARIO-PRD-001.md` | Glosario oficial del dominio ATI-03 |
| `docs/analysis/MATRIZ-TRAZABILIDAD-CAPA1.md` | Trazabilidad entre requisitos y análisis |
| `docs/product/PA-001-CATALOG.md` | Catálogo oficial de productos (ATI-03 como "Informe Técnico Energético" a efectos oficiales) |
| `docs/analysis/PRD-FRAMEWORK-001.md` | Framework que define cómo se estructuran los PRDs |
| `docs/analysis/PRD-001-CANDIDATE-EVALUATION.md` | Evaluación que seleccionó ATI-03 como candidato |

---

## 4. Principios que no deben volver a discutirse

1. **ATI-03 no entrega un informe técnico.** Entrega respuestas a las 6 preguntas que todo propietario necesita responder antes de decidir.
2. **El informe técnico no desaparece.** Pasa a ser un anexo. El producto principal es el documento de decisiones (visual, priorizado, orientado a acción).
3. **Las 6 preguntas** que ATI-03 responde son: estado real, problemas importantes, actuaciones prioritarias, ahorro económico, inversión que merece la pena, coste de la inacción.
4. **ATI-03 se limita a decidir.** No incluye ejecución de obras, contratación de profesionales ni presupuestos.
5. **La frase "Entendí en 30 segundos lo que el certificado no me explicó en 20 páginas"** es material de branding conservado.

---

## 5. Requisitos aprobados conceptualmente

| Requisito | Estado |
|-----------|--------|
| **RF-001** — Documento de decisiones como entregable principal (dashboard web), PDF como secundario, anexo técnico como terciario | Aprobado conceptualmente |
| **RF-002** — Validación de certificado con contexto decisional (no solo verificar, sino traducir a impacto real) | Aprobado conceptualmente |
| **RF-003** — Sistema de apoyo a la priorización (🔴🟡🟢) con intervención del AT | Aprobado conceptualmente |
| **RF-004** — Ahorro económico en euros/año, desglosado por concepto | Aprobado conceptualmente |
| **RF-005** — Inversión y retorno (coste, ahorro, ROI, veredicto) | **No iniciado** |
| **RF-006** — Normativa en anexo, no en cuerpo principal | Aprobado conceptualmente |
| **RF-007** — Firma digital y sello de independencia | Aprobado conceptualmente |
| **RF-008** — Entrega multicanal (dashboard + PDF + anexo) | Aprobado conceptualmente |

---

## 6. Pendiente

| Tarea | Prioridad |
|-------|-----------|
| **RF-005**: Análisis conceptual de Inversión y Retorno | Siguiente paso |
| Diseño de prototipo del documento de decisiones (pila de decisión capas 1-6) | Tras RF-005 |
| Test de comprensión con usuarios (validar ≤30s) | Tras prototipo |
| Revisar PA-001-CATALOG para reflejar nueva propuesta de valor | Pendiente (no bloqueante) |

---

## 7. Siguiente paso cuando se retome el trabajo

**Retomar con el análisis conceptual de RF-005** siguiendo el mismo patrón de RF-002, RF-003 y RF-004:

1. Leer RF-002, RF-003, RF-004 como referencia de formato.
2. Leer la definición de RF-005 en PRD-001 (sección 7.6).
3. Realizar análisis conceptual respondiendo a las preguntas: ¿qué pregunta del cliente resuelve?, ¿cómo se presenta la información?, ¿qué criterios determinan el veredicto "Merece la pena / Valóralo / No recomendado"?, ¿qué principios de diseño aplican?
4. Documentar en `docs/analysis/RF-005-INVERSION-RETORNO.md`.

**No reabrir** el análisis de experiencia de cliente — está validado y cerrado.

---

*Fin del documento de traspaso. Generado el 2026-07-08.*