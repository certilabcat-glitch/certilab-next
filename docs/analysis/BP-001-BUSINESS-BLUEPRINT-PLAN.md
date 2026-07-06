# BP-001 — Business Blueprint: Plan de Arquitectura Funcional y de Negocio

| Campo | Descripción |
|-------|-------------|
| **Código** | BP-001 |
| **Título** | Business Blueprint — Plan de trabajo para la alineación estratégica |
| **Versión** | 1.1 |
| **Fecha** | 2026-07-06 |
| **Estado** | 📋 BORRADOR v1.1 — Pendiente de aprobación |
| **Precedencia** | Posterior a CONSOLIDATION-001. Previo a nuevas épicas de desarrollo. |
| **Propósito** | Definir el alcance, entregables y criterios de aceptación de la fase de Arquitectura Funcional y de Negocio. |

---

## 1. Contexto

### 1.1 ¿Dónde estamos?

CONSOLIDATION-001 ha sido aceptada y cerrada. El estado actual del proyecto es:

| Componente | Estado |
|------------|--------|
| Core V1 (Cliente, Inmueble, Expediente, Documento IA) | ✅ Estabilizado y congelado |
| Design System v1 | ✅ Completado y auditado |
| MVP v1.0.0-rc1 | ✅ Release candidate generada |
| Product Vision / Positioning / Roadmap | ✅ Definido en V1 |
| Decisiones estratégicas empresariales | 🔄 **Pendientes de incorporar** |

### 1.2 Las nuevas decisiones estratégicas

La dirección ha establecido las siguientes directrices que deben gobernar la evolución futura de la plataforma:

1. **Empresa 100% remota** — La organización operará sin sede física. La plataforma debe soportar esta realidad.
2. **Cobertura nacional** — Alcance a todo el territorio español desde el inicio.
3. **Escalabilidad y automatización** — Todos los productos deben diseñarse para escalar sin incremento lineal de costes operativos y ser susceptibles de automatización.
4. **Crecimiento por líneas de negocio** — La empresa crecerá mediante líneas de negocio, no mediante una lista de servicios. Esto es un cambio estructural respecto al modelo actual de "módulos de inspección técnica".
5. **Nueva línea estratégica: Gestión Técnica Documental** — Orientada a la obtención, organización y verificación documental mediante autorización del cliente y consulta de organismos oficiales cuando proceda.
6. **Productos que resuelven problemas del cliente** — No para vender documentos. El producto es el servicio de resolución, no el papel.

---

## 2. Principio rector de la fase

> **La plataforma debe adaptarse al Business Blueprint, nunca el Business Blueprint a la plataforma.**

Esto implica:

1. **EP-100 y EP-102** (Business Blueprint + GTD) se diseñan con total libertad empresarial, sin considerar las capacidades actuales del Core V1 ni restricciones técnicas.
2. **EP-101** (Product-Business Alignment) se realiza **después** de completar el Business Blueprint. Solo entonces se analiza qué capacidades de la plataforma actual encajan, cuáles deben evolucionar y cuáles deben crearse.
3. **EP-103** (Actualización de docs estratégicos) se realiza al final, una vez que el Alignment ha identificado el gap real.

---

## 3. Diagnóstico: ¿Qué necesita cambiar?

### 3.1 Estructura actual vs. estructura necesaria

| Aspecto | Estado actual | Estado necesario (Business Blueprint) |
|---------|---------------|---------------------------------------|
| **Modelo de crecimiento** | Módulos técnicos (Certificación, ITE, Accesibilidad) | Líneas de negocio con valor de mercado propio |
| **Catálogo** | Servicios (Segunda Opinión 99€, Express 49€) | Soluciones a problemas del cliente (no documentos) |
| **Organización** | No definida | 100% remota, cobertura nacional |
| **Documentación estratégica** | PRODUCT-VISION, POSITIONING, ROADMAP, PERSONAS, COMPETITORS | + Business Blueprint, Líneas de Negocio, Modelo Operativo, Arquitectura Comercial |
| **Modelo de ingresos** | Pay-per-service (V1) + Suscripciones AT (V3) | Por definir por línea de negocio |
| **Gestión Técnica Documental** | No existe como concepto | Nueva línea estratégica |
| **Arquitectura comercial** | No definida formalmente | Canales, distribución, pricing, partnerships |
| **Customer Journey** | No documentado formalmente | Mapa de experiencia E2E por persona y línea |

### 3.2 Implicaciones para la plataforma (se analizarán en EP-101, post-Blueprint)

Las decisiones estratégicas tendrán impacto potencial sobre:

1. **Modelo de datos** — ¿La Gestión Técnica Documental requiere nuevos agregados o puede componerse sobre el Core existente?
2. **Flujo de trabajo** — ¿Cómo se integra la consulta a organismos oficiales en el workflow actual de expedientes?
3. **Modelo operativo** — Una empresa 100% remota con cobertura nacional necesita distintos mecanismos de coordinación, asignación y escalado.
4. **Estrategia de producto** — Pasar de "vendemos auditorías de certificados" a "resolvemos problemas documentales del cliente" cambia el posicionamiento, el ICP y el GTM.
5. **Roadmap** — El roadmap actual está estructurado por módulos técnicos (V1, V1.1, V2, V3). Necesita reestructurarse por líneas de negocio.

> Estos análisis se realizarán en EP-101, una vez definido el Business Blueprint sin condicionamientos.

---

## 4. Alcance de la fase

### 4.1 ¿Qué NO incluye esta fase?

- ❌ **No se desarrolla código** — Cero implementación, cero nuevas épicas.
- ❌ **No se modifican archivos de código fuente** — Sin tocar `src/`, `supabase/`, `scripts/`.
- ❌ **No se proponen cambios arquitectónicos** — El Core V1 está congelado (CF-001A).
- ❌ **No se inician discusiones sobre nuevas tecnologías** — Sin CQRS, Event Sourcing, microservicios, etc.

### 4.2 ¿Qué SÍ incluye esta fase?

Solo documentación estratégica y de negocio:

- ✅ Business Blueprint completo (empresa, líneas de negocio, modelo operativo)
- ✅ Arquitectura comercial, marketing, customer journey, modelo de crecimiento
- ✅ Especificación de la línea de Gestión Técnica Documental
- ✅ Mapa de alineación producto-negocio (post-Blueprint)
- ✅ Actualización de documentos de producto (Visión, Roadmap, Posicionamiento)
- ✅ ADR necesarias para formalizar decisiones estratégicas

---

## 5. Entregables propuestos (orden de ejecución)

### EP-100: Business Blueprint — Modelo de empresa

Define **qué es Certilab como empresa**, sin condicionamiento técnico. Se diseña con total libertad.

| Bloque | Entregable | Descripción |
|--------|------------|-------------|
| **Estructura** | BP-100-01 | **Business Blueprint Canvas** — Estructura organizativa 100% remota, cobertura nacional, modelo operativo, principios de escalabilidad y automatización |
| **Líneas de negocio** | BP-100-02 | **Líneas de negocio** — Definición formal de cada línea: nombre, propuesta de valor, mercado, modelo de ingresos, KPIs |
| **Modelo operativo** | BP-100-03 | **Modelo operativo remoto** — Cómo opera Certilab: procesos, roles, herramientas, coordinación en remoto |
| **Arquitectura comercial** | BP-100-04 | **Arquitectura comercial** — Canales de venta, modelo de distribución, pricing por línea de negocio, estructura de comisiones, partnerships estratégicos |
| **Marketing** | BP-100-05 | **Estrategia de marketing** — Posicionamiento por línea, estrategia de contenidos, canales de adquisición, presupuesto estimado, métricas de marca |
| **Customer Journey** | BP-100-06 | **Customer Journey** — Mapa de experiencia del cliente extremo a extremo: descubrimiento, consideración, compra, entrega, post-venta, fidelización. Separado por persona y línea de negocio |
| **Crecimiento** | BP-100-07 | **Modelo de crecimiento** — Estrategia de scaling, palancas de crecimiento, hitos por fase, economía unitaria proyectada, modelo de viralidad/referidos |

### EP-102: Gestión Técnica Documental

Nueva línea estratégica. Se diseña con la misma libertad que EP-100, sin condicionamiento técnico.

| Entregable | Descripción |
|------------|-------------|
| BP-102-01 | **Especificación de la línea GTD** — Definición completa: qué es, qué problema resuelve, cómo genera valor, modelo de ingresos, mercado objetivo |
| BP-102-02 | **Flujo de referencia GTD** — Proceso completo: autorización del cliente → consulta a organismo oficial → obtención → organización → verificación → entrega |
| BP-102-03 | **Modelo operativo GTD** — Roles necesarios, herramientas, tiempos, SLAs, calidad, compliance (RGPD, LOPD) |

---

**BARRERA: Business Blueprint completo** — Punto de decisión. Solo después de aprobar EP-100 y EP-102 se procede al alineamiento con la plataforma.

---

### EP-101: Product-Business Alignment (post-Blueprint)

Se realiza **después** de tener el Business Blueprint completo. Analiza la plataforma existente contra lo que la empresa necesita.

| Entregable | Descripción |
|------------|-------------|
| BP-101-01 | **Matriz Línea de Negocio ↔ Capacidad de Plataforma** — Mapa detallado: por cada línea de negocio, qué agregados del Core V1 se reutilizan, qué flujos se componen, qué UI existe, qué falta |
| BP-101-02 | **Análisis de gap por línea** — Para cada línea: capacidades existentes (✔️), capacidades que evolucionan (🔄), capacidades a crear (➕). Estimación de esfuerzo sin compromiso |
| BP-101-03 | **Análisis de viabilidad GTD sobre Core V1** — ¿Puede GTD implementarse usando Cliente, Inmueble, Expediente y Documento IA existentes? ¿Qué extensiones mínimas serían necesarias? ¿Requiere nuevos agregados? |

### EP-103: Actualización de documentos estratégicos (post-Alignment)

Actualiza los documentos de producto existentes con los resultados del Alignment.

| Entregable | Descripción |
|------------|-------------|
| BP-103-01 | **PRODUCT-VISION v3.0** — Visión actualizada con líneas de negocio, GTD, principio "productos resuelven problemas, no venden documentos" |
| BP-103-02 | **PRODUCT-POSITIONING v3.0** — Posicionamiento actualizado por línea de negocio, con GTD y nuevo ICP |
| BP-103-03 | **PRODUCT-ROADMAP v3.0** — Roadmap reestructurado por líneas de negocio en lugar de módulos técnicos |

### ADR necesarias (post-Alignment)

Se redactan después del Alignment, una vez conocido el gap real.

| ADR | Propósito |
|-----|-----------|
| ADR-003 | **Incorporación de Líneas de Negocio como concepto arquitectónico** — Cómo el concepto de "business line" se refleja en la arquitectura sin romper el Core V1 |
| ADR-004 | **Gestión Técnica Documental como capacidad del Core** — Extensión controlada del Core V1 o nuevo agregado, según resultado de BP-101-03 |

---

## 6. Flujo de trabajo propuesto

Siguiendo el EPIC WORKFLOW definido en AGENTS.md:

```
BP-001 (este plan)
    ↓ (aprobación)
EP-100: Business Blueprint — Modelo de empresa (con total libertad)
    ├── BP-100-01: Business Blueprint Canvas
    ├── BP-100-02: Líneas de negocio
    ├── BP-100-03: Modelo operativo remoto
    ├── BP-100-04: Arquitectura comercial
    ├── BP-100-05: Estrategia de marketing
    ├── BP-100-06: Customer Journey
    └── BP-100-07: Modelo de crecimiento
    ↓
EP-102: Gestión Técnica Documental (con total libertad)
    ↓
─── BARRERA: Business Blueprint completo ───
    (revisión y aprobación del modelo de empresa antes del alignment)
    ↓
EP-101: Product-Business Alignment (análisis de la plataforma contra el Business Blueprint)
    ↓
EP-103: Actualización de documentos estratégicos
    ↓
ADR-003 + ADR-004 (si proceden)
    ↓
Auditoría cruzada de coherencia
    ↓
Informe de cierre
    ↓
Aprobación del usuario
    ↓
Commit + Tag (BP-001)
    ↓
Siguiente fase (nuevas épicas de desarrollo)
```

Cada EP seguirá su propio ciclo:
```
Diseño → Implementación (docs) → Tests de coherencia → Build (verificación) → Auditoría específica → Informe de cierre
```

### Secuencia temporal estimada

| Fase | Duración estimada | Dependencias |
|------|-------------------|--------------|
| EP-100 (Business Blueprint completo, 7 bloques) | 5-7 días | Ninguna |
| EP-102 (Gestión Técnica Documental) | 2-3 días | EP-100 (mismo marco estratégico) |
| **Barrera: revisión Business Blueprint** | **Punto de decisión** | EP-100 + EP-102 completos |
| EP-101 (Product-Business Alignment) | 2-3 días | Business Blueprint completo |
| EP-103 (Actualización docs + ADR) | 2 días | EP-101 completado |
| Auditoría + cierre | 1 día | Todo lo anterior |
| **Total estimado** | **12-16 días** | — |

---

## 7. Preguntas obligatorias (AGENTS.md §9.5)

Antes de proceder, verificamos que esta fase cumple con PRODUCT-FIRST EXECUTION MODE:

### 1. ¿Qué capacidad funcional añade al MVP?
**Respuesta:** Ninguna directamente. Esta fase no desarrolla funcionalidad. Establece el marco estratégico que gobernará todo el desarrollo futuro, alineando la plataforma con la estrategia empresarial antes de abrir nuevas épicas.

### 2. ¿Qué agregados participan?
**Respuesta:** Ninguno. Es una fase exclusivamente documental y estratégica. No se modifica ningún agregado del Core V1.

### 3. ¿Cómo interactúan entre sí?
**Respuesta:** No aplica. No hay interacciones entre agregados porque no hay implementación.

### 4. ¿Por qué esta es la solución de menor complejidad?
**Respuesta:** Porque las decisiones estratégicas ya han sido tomadas por la dirección. El único trabajo pendiente es documentarlas con total libertad empresarial (sin condicionamiento técnico), alinearlas con la plataforma existente y formalizarlas. Cualquier otra aproximación (implementar sin alineación, o posponer la alineación) generaría deuda estratégica y requeriría rehacer trabajo más adelante.

### 5. Clasificación automática V2
**Respuesta:** No aplica. Esta no es una mejora técnica ni funcional. Es un prerequisito estratégico indispensable para el desarrollo futuro del MVP. Sin este Business Blueprint, las próximas épicas carecerían de marco de decisión.

---

## 8. Criterios de aceptación

Esta fase se considerará completada cuando:

- [ ] BP-100-01 a BP-100-07 redactados y aprobados (Business Blueprint completo)
- [ ] BP-102-01, BP-102-02, BP-102-03 redactados y aprobados (GTD)
- [ ] BP-101-01, BP-101-02, BP-101-03 redactados y aprobados (Alignment post-Blueprint)
- [ ] BP-103-01, BP-103-02, BP-103-03 redactados y aprobados (Docs actualizados)
- [ ] ADR-003 y ADR-004 (si procede) redactados y firmados
- [ ] Auditoría cruzada de coherencia completada sin inconsistencias
- [ ] Informe de cierre generado
- [ ] Aprobación explícita del usuario

---

## 9. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| **Parálisis por análisis** | Media | Alto | Duración máxima de la fase: 2 semanas. Si se alarga, se reduce alcance. |
| **Decisiones estratégicas contradictorias** | Baja | Alto | Validación cruzada con dirección antes de documentar. |
| **GTD no encaja en Core V1** | Media | Medio | El análisis se realiza en EP-101 (post-Blueprint). Si requiere nuevos agregados, se documenta como extensión controlada con ADR. Si requiere cambios en el Core V1 congelado, se pospone a V2. |
| **Desalineación con roadmap existente** | Alta | Medio | El roadmap se actualiza como parte de BP-103 (post-Alignment). Las épicas planificadas se reevalúan contra las líneas de negocio. |
| **Business Blueprint demasiado abstracto** | Media | Medio | Cada entregable incluye ejemplos concretos y métricas. Se valida con dirección antes de pasar al siguiente bloque. |
| **Deseo de condicionar el Business Blueprint por la plataforma actual** | Alta | Alto | Principio rector explícito en §2. La barrera (Alignment post-Blueprint) protege esta separación. |

---

*Fin del documento BP-001-BUSINESS-BLUEPRINT-PLAN.md v1.1*