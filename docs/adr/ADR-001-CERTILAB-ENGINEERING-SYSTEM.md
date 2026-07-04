# ADR-001 — Sistema de Ingeniería de Certilab

- **Estado:** ACEPTADA
- **Fecha:** 2026-07-04
- **Épica origen:** EP-000A (Discovery)
- **Documento de referencia:** `docs/CERTILAB-OS-DISCOVERY.md`

---

## 1. Contexto

Tras la finalización de la épica EP-000A, Certilab ha completado un descubrimiento profundo sobre cómo debería organizarse el conocimiento del proyecto para minimizar errores, evitar duplicidades, preservar la memoria de las sesiones de desarrollo y permitir escalar durante V1, V2 y V3.

Durante dicho descubrimiento se planteó inicialmente el concepto de **Certilab OS** como una posible solución integral. La primera interpretación del concepto apuntaba a una plataforma completa con UI, base de datos vectorial, orquestador multi-agente, hooks, MCP servers y pipelines de automatización.

Sin embargo, tras la corrección documentada en el propio Discovery (sección 1, "Aclaración"), se redefinió Certilab OS como:

> Una **convención ligera de organización del conocimiento del proyecto** formada exclusivamente por memoria, reglas, conocimiento, índices y documentación para agentes — sin automatizaciones obligatorias, sin plugins, sin MCP servers obligatorios, sin infraestructura nueva.

El proyecto se encuentra en V1, con una arquitectura congelada (CF-001A), una gobernanza madura y un roadmap de producto definido. El principal desafío detectado no es técnico sino de **organización y continuidad del conocimiento**.

---

## 2. Problema

Durante el Discovery (EP-000A) se identificó un riesgo crítico para la sostenibilidad del proyecto:

> **El conocimiento del proyecto está fragmentado en ~40+ documentos sin un índice maestro, sin mecanismos de continuidad entre sesiones de desarrollo, y sin memoria persistente para los agentes de IA.**

Las fragilidades estructurales detectadas son:

| # | Fragilidad | Impacto |
|---|-----------|---------|
| 1 | Sin continuidad entre sesiones. Cada sesión empieza desde cero. | Conocimiento perdido |
| 2 | Conocimiento fragmentado en ~40+ documentos sin índice maestro ni consistencia cruzada. | Drift documental |
| 3 | Sin CI/CD automatizado. Tests, lint, typecheck y build manuales. | Build roto |
| 4 | Gobernanza no programática. Depende de que el agente lea y cumpla documentos. | Reglas ignorables |
| 5 | Sin separación de entornos (dev/staging/prod). | Riesgo de configuración |
| 6 | Cobertura de tests limitada a unit tests puros. | Regresiones no detectadas |

El riesgo específico que motiva esta ADR es la **pérdida sistemática de contexto entre sesiones de desarrollo**, que provoca que cada sesión deba redescubrir decisiones ya tomadas, patrones ya establecidos y problemas ya resueltos.

---

## 3. Alternativas Consideradas

### Alternativa A: Plataforma completa

**Descripción:** Construir una plataforma tecnológica integral para Certilab OS con UI, base de datos vectorial, orquestador multi-agente, hooks, MCP servers, pipelines de automatización, y todos los componentes de una plataforma de desarrollo.

**Ventajas:**
- Solución completa y ambiciosa
- Potencial para escalar a equipos grandes
- Diferenciador tecnológico

**Desventajas:**
- Requiere meses de desarrollo
- Consume recursos del producto (viola MVP Discipline)
- Introduce complejidad innecesaria (viola No Overengineering)
- Genera deuda técnica y dependencias
- No es viable para un equipo unipersonal en V1

**Decisión:** ❌ **Descartada.** Violaría los principios de MVP Discipline y No Overengineering establecidos en AGENTS.md. No hay recursos para desarrollarla en V1.

---

### Alternativa B: Framework

**Descripción:** Crear un framework reusable de ingeniería de conocimiento que pudiera ser utilizado por otros proyectos similares, con plantillas, CLI, scaffolding y documentación genérica.

**Ventajas:**
- Reutilizable en otros proyectos
- Podría generar un producto secundario
- Estandariza la práctica

**Desventajas:**
- Requiere abstracción genérica que no está validada
- Añade carga de mantenimiento de un framework
- Distrae del objetivo principal del proyecto
- No hay demanda externa conocida

**Decisión:** ❌ **Descartada.** Genericizar prematuramente añadiría complejidad sin beneficio inmediato. Si en V2 o V3 surge la necesidad, se evaluará entonces.

---

### Alternativa C: Sistema Ligero de Ingeniería ✅

**Descripción:** Adoptar una convención ligera de organización del conocimiento del proyecto basada exclusivamente en archivos markdown, documentos de gobernanza, memoria persistente, índices de navegación, y automatización incremental. Sin infraestructura nueva, sin código de plataforma, sin dependencias adicionales.

**Componentes:**

| Componente | Descripción | Formato |
|-----------|-------------|---------|
| **Documentación** | Documentos CF-XXX existentes, extendidos con estructura consistente | Markdown |
| **Gobernanza** | Reglas AGENTS.md, CF-001, CF-001A ya existentes | Markdown |
| **Memoria** | Archivos de contexto para continuidad entre sesiones | Markdown |
| **Índices** | Mapas de navegación del conocimiento (índice maestro) | Markdown |
| **Conocimiento** | Documentación técnica, de dominio y de producto | Markdown |
| **llms.txt** | Estándar emergente para consumo de LLMs | Markdown (ya implementado) |
| **Automatización incremental** | Scripts y herramientas que se añaden solo cuando aportan valor sin sobrecarga | Scripts Node.js |

**Ventajas:**
- No requiere implementación técnica (solo archivos markdown)
- Sin infraestructura nueva, sin coste operativo
- Compatible con MVP Discipline (no consume recursos de producto)
- Compatible con No Overengineering (es la solución más simple posible)
- Escala naturalmente (más archivos markdown no es complejidad adicional)
- Es descartable (si el proyecto pivota, solo se pierden archivos de documentación)
- Se puede empezar en V1 sin coste
- El componente llms.txt ya está implementado parcialmente en el proyecto

**Desventajas:**
- No resuelve automáticamente CI/CD, testing ni separación de entornos (quedan fuera de alcance)
- Depende de disciplina del equipo para mantener los documentos actualizados
- No tiene enforcement programático de la gobernanza

**Decisión:** ✅ **Seleccionada.**

---

## 4. Decisión

**Certilab adopta un Sistema Ligero de Ingeniería como convención de organización del conocimiento del proyecto.**

La decisión se fundamenta en:

1. **El Discovery (EP-000A) confirmó** que el problema real no es técnico sino de organización y continuidad del conocimiento.

2. **La solución más simple** (archivos markdown) es suficiente para resolver los problemas detectados sin incurrir en sobreingeniería.

3. **La compatibilidad con el marco de gobierno actual:** la decisión no viola la Architecture Freeze (CF-001A), no requiere cambios en la Constitución, no modifica AGENTS.md, y respeta MVP Discipline y No Overengineering.

4. **El coste es cero** en términos de recursos de desarrollo del producto. No se escribe código de infraestructura, no se añaden dependencias, no se modifica el roadmap V1.

5. **La adopción puede ser incremental:** empezar con un índice maestro, un manifiesto básico y mejorar progresivamente sin necesidad de un diseño completo upfront.

Los componentes concretos que se implementarán son:

| Componente | Prioridad V1 | Estado inicial |
|-----------|-------------|----------------|
| Índice maestro de documentación | Alta | No existe |
| Memoria de sesión persistente | Alta | No existe |
| Manifiesto del proyecto | Media | No existe |
| Playbooks de gobernanza | Media | No existen |
| Extensión de llms.txt con docs del proyecto | Media | Ya existe base |
| Automatización incremental (scripts) | Baja | Ya existen scripts base |

> **Nota:** CI/CD, tests de integración, separación de entornos y otras automatizaciones quedan explícitamente **fuera del alcance** de esta ADR. Son problemas identificados que deberán abordarse mediante ADRs separadas cuando los recursos lo permitan.

---

## 5. Consecuencias

### Positivas

1. **Continuidad entre sesiones:** La memoria persistente permitirá a los agentes retomar el trabajo de sesiones anteriores sin perder contexto, reduciendo el tiempo de onboarding de cada sesión.

2. **Conocimiento centralizado:** Un índice maestro permitirá navegar los ~40+ documentos del proyecto de forma estructurada, reduciendo el drift documental y las duplicidades.

3. **Sin coste de desarrollo:** Al ser una convención basada en archivos markdown, no consume recursos del roadmap V1 del producto.

4. **Adopción inmediata:** Se puede empezar a implementar desde la siguiente sesión sin necesidad de configuración, instalación o infraestructura.

5. **Escalabilidad natural:** El sistema escala añadiendo más archivos markdown, sin complejidad adicional.

6. **Descartable:** Si el proyecto cambia de dirección, solo se pierden archivos de documentación, no infraestructura ni código.

7. **llms.txt ya existente:** El componente de exposición a LLMs ya está implementado (`public/llms.txt`, `public/llms-full.txt`, `scripts/generate-llms.mjs`), lo que reduce el esfuerzo inicial.

8. **Mejora la descubribilidad:** Tanto para desarrolladores humanos como para agentes de IA, la estructura documental será más navegable.

### Negativas

1. **No resuelve automatización:** CI/CD, testing automatizado y pre-commit hooks quedan fuera del alcance de esta ADR y deberán abordarse por separado.

2. **Dependencia de disciplina:** El sistema depende de que el equipo mantenga los documentos actualizados. Sin enforcement programático, puede degradarse con el tiempo.

3. **Esfuerzo inicial de organización:** Crear el índice maestro, la memoria persistente y los playbooks requiere tiempo de documentación que podría dedicarse a desarrollo de producto.

4. **Riesgo de burocracia documental:** Si no se gestiona con cuidado, el sistema podría generar sobrecarga de documentación que ralentice el desarrollo.

5. **No resuelve la fragmentación de scripts:** Los múltiples scripts de migración y utilidades existentes seguirán fragmentados hasta que se aborde específicamente.

### Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| **El sistema se vuelve burocrático** | Media | Medio | Mantener el principio de "suficientemente bueno". No crear procesos formales de actualización obligatoria en V1. |
| **Los documentos se desactualizan** | Alta | Medio | Incluir verificación de consistencia documental en las auditorías de cada épica. |
| **Se intenta abarcar demasiado en V1** | Media | Alto | Limitar el alcance V1 a: índice maestro + memoria de sesión. El resto en V2. |
| **Falsa sensación de orden** | Baja | Medio | El sistema organiza el conocimiento pero no garantiza su corrección. Mantener auditorías y evidence-first. |
| **Dependencia de un agente específico** | Baja | Medio | Los formatos (markdown) son universales. Cualquier agente o humano puede leerlos. |

---

## 6. Estado

**ACEPTADA**

Esta decisión queda registrada y no debe volver a debatirse durante V1, salvo que una nueva ADR la modifique o reemplace explícitamente.

### Documentos afectados

| Documento | Naturaleza del impacto |
|-----------|----------------------|
| `docs/CERTILAB-OS-DISCOVERY.md` | Documento de origen que motiva esta ADR. No se modifica. |
| `docs/CF-000-PROJECT-BRAIN.md` | No se modifica. Esta ADR es coherente con la Constitución. |
| `AGENTS.md` | No se modifica. Esta ADR respeta todas las reglas de gobernanza. |
| `docs/CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md` | No se modifica. Esta ADR no altera la arquitectura congelada. |

### Próximos pasos (fuera del alcance de esta ADR)

- Implementar el índice maestro de documentación
- Implementar el mecanismo de memoria de sesión persistente
- Extender `public/llms.txt` con referencias a la documentación del proyecto
- Evaluar en V2 la necesidad de automatización y CI/CD

---

> **Fin de ADR-001**