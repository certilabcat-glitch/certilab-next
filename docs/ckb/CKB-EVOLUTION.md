# CKB-EVOLUTION — Hoja de ruta del Repositorio Oficial de Conocimiento

> **Propósito:** Planificar la evolución del CKB a lo largo de las fases del proyecto.
> Este documento no forma parte del índice. Es un artefacto de planificación del propio CKB.

---

## V1 — MVP (Julio 2026)

**Objetivo:** Establecer el índice maestro como práctica operativa del proyecto.

### Artefactos
- `docs/CKB-INDEX.md` — Índice maestro con 17 documentos.
- `docs/CKB-GUIDE.md` — Guía breve de uso.

### Cobertura
- Familias: GOV (6), ARCH (5), DOM (3), ADR (2), ROAD (1).
- Cobertura estimada: ~17 documentos sobre ~100 totales en `docs/`.

### Tooling
- Ninguno. Git + Markdown.

### Mantenimiento
- Actualización manual del índice en cada sesión.
- Verificación manual de rutas con `test -f` o `ls`.

### Criterio de salida
- 3 sesiones consecutivas sin incidencias de descubrimiento (un agente no necesita preguntar dónde está un documento).

---

## V2 — Crecimiento (Post-MVP)

**Objetivo:** Ampliar cobertura y añadir validación básica.

### Nuevos artefactos (opcionales)
- Script de validación de rutas: verifica que todas las rutas en CKB-INDEX.md existen.
- Script de detección de documentos no indexados: compara el índice con el contenido de `docs/`.

### Nuevas familias
- **PROD** — Documentación de producto (PA-001, PA-001-CATALOG). Entra cuando la primera épica requiera validar criterios de producto.
- **DSGN** — Documentación de diseño visual (Design System, Brand Book, UX). Entra cuando una épica de UI activa lo requiera.

### Cobertura estimada
- 25-35 documentos.

### Tooling
- Script opcional de validación de integridad (Node.js o shell).
- Sin CI todavía.

### Criterio de entrada para PROD y DSGN
- Existe una épica activa que requiere consultar documentación de producto o diseño.
- Alguien (agente o humano) ha necesitado un documento de esas familias y no lo ha encontrado en el índice.

### Regla
- No se añaden familias PROD ni DSGN hasta que se cumpla el criterio de entrada.
- No se añaden por diseño anticipado.

---

## V3 — Madurez (V2 completo)

**Objetivo:** Automatización y escalabilidad.

### Nuevos artefactos
- CI básico para health check del índice en cada PR.
- Verificación automática de que CKB-INDEX.md está actualizado con nuevos documentos en `docs/`.

### Nuevas capacidades
- Taxonomía de etiquetas (tags) si se superan los 50 documentos indexados.
- Validación de que ningún documento indexado está en estado Draft.

### Cobertura estimada
- 30-50 documentos.

### Tooling
- GitHub Action o script CI que ejecute health check.
- Las validaciones son informativas (no bloqueantes del merge).

### Criterio de salida
- El CKB puede actualizarse sin intervención manual en más del 80% de los casos.

---

## Lo que NO entrará en ninguna fase

| Tipo de documento | Motivo | Excepción |
|-------------------|--------|-----------|
| Análisis exploratorios (`docs/analysis/`) | No son conocimiento activo. Son trabajo previo a una decisión de diseño. | Ninguna. |
| Auditorías cerradas (`docs/audits/`) | Son informes de proceso. Salvo que contengan criterios arquitectónicos vigentes. | Indexación por excepción y solo si se demuestra necesidad. |
| Informes de sesión / handover | Son registro de trabajo, no conocimiento del proyecto. | Ninguna. |
| Documentación SEO/marketing | No es documentación técnica del proyecto. | Ninguna. |
| Código fuente (`src/`) | Se gobierna por su propia estructura de tipos, carpetas y repositorio. | Ninguna. |
| Releases y changelogs | Son históricos. La versión actual se conoce por Git. | Ninguna. |
| llms.txt | Es un artefacto de IA externo, no documentación del proyecto. | Ninguna. |

---

> **Última actualización:** 09/07/2026
> **Próxima revisión:** Al cierre del MVP V1 o cuando se superen los 25 documentos indexados.