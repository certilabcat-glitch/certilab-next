# GTM-001-AUTOMATION-IA-MATRIX — Matriz de Oportunidades de Automatización e IA

| Campo | Valor |
|-------|-------|
| **Código** | GTM-001-AUTOMATION-IA-MATRIX |
| **Título** | Matriz de Oportunidades de Automatización e IA para el Catálogo Certilab |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-06 |
| **Estado** | 📋 EN REDACCIÓN |
| **Propósito** | Identificar y priorizar oportunidades de automatización e IA que mejoren la eficiencia operativa, la experiencia del cliente y la escalabilidad del catálogo |

---

## 1. Principios de automatización

1. **Automatizar lo que escala, no lo que diferencia.** La relación con el cliente, el juicio técnico y la empatía siguen siendo humanos. La automatización libera tiempo para eso.
2. **IA como aumentación, no sustitución.** La IA asiste al AT y al cliente. No reemplaza la supervisión técnica de un AT colegiado.
3. **ROI primero:** Cada automatización debe justificarse en ahorro de tiempo, reducción de errores o aumento de conversión.
4. **Madurez progresiva:** Automatización simple primero (reglas, emails). Automatización con IA después.
5. **Datos como combustible:** Sin datos estructurados no hay automatización útil. Invertir primero en captura de datos de calidad.

---

## 2. Matriz de oportunidades

### 2.1 Oportunidades de automatización (sin IA)

| ID | Proceso | Producto | Tipo | Complejidad | Impacto | Prioridad | Ahorro tiempo est. |
|:--:|---------|----------|:----:|:-----------:|:-------:|:---------:|:------------------:|
| AU-01 | **Confirmación de compra automática** + email con instrucciones | ATI-01, GTD-01 | Transaccional | 🟢 Baja | 🔴 Alto | 🔴 Crítica | 5 min/exp |
| AU-02 | **Asignación automática de AT** según disponibilidad y especialidad | ATI-01, ATI-03 | Operativa | 🟡 Media | 🔴 Alto | 🔴 Crítica | 15 min/exp |
| AU-03 | **Recordatorio de pago** (24h tras abandono) | ATI-01, GTD-01 | Captación | 🟢 Baja | 🟡 Medio | 🟡 Alta | — (recuperación) |
| AU-04 | **Email post-servicio** con resumen + recomendación cross-sell | ATI-01, ATI-03 | Cross-sell | 🟢 Baja | 🟡 Medio | 🟡 Alta | 10 min/exp |
| AU-05 | **Generación automática de factura** | Todos | Administrativa | 🟢 Baja | 🟡 Medio | 🟡 Alta | 5 min/exp |
| AU-06 | **Dashboard de estado de expediente** para el cliente | ATI-01, ATI-03 | Experiencia | 🟡 Media | 🟡 Medio | 🟡 Alta | — |
| AU-07 | **Sistema de alertas de caducidad** (certificados, ITE, documentos) | GTD-03 | Core producto | 🟡 Media | 🔴 Alto | 🟡 Alta | — (valor producto) |
| AU-08 | **Encuesta NPS automática** post-entrega | Todos | Feedback | 🟢 Baja | 🟢 Bajo | 🟢 Media | 5 min/exp |
| AU-09 | **Programa de referidos automatizado** (emails, tracking, recompensas) | ATI-01, GTD-01 | Captación | 🟡 Media | 🟡 Medio | 🟢 Media | — |
| AU-10 | **Generación automática de ISV** a partir de datos estructurados del inmueble | GTD-01 | Core producto | 🔴 Alta | 🔴 Alto | 🟢 Media (F3) | 60 min/informe |
| AU-11 | **Chat en vivo** (humano, horario laboral) | Todos | Conversión | 🟡 Media | 🟡 Medio | 🟡 Alta | — |
| AU-12 | **Segmentación automática de leads** por comportamiento y perfil | Marketing | Captación | 🟡 Media | 🟡 Medio | 🟢 Media | — |

### 2.2 Oportunidades con IA

| ID | Proceso | Producto | Tipo | Complejidad | Impacto | Prioridad | Modelo/solución sugerida |
|:--:|---------|----------|:----:|:-----------:|:-------:|:---------:|-------------------------|
| IA-01 | **Clasificación automática de documentos** subidos por el cliente (categorización) | GTD-01, GTD-04 | Core producto | 🟡 Media | 🔴 Alto | 🔴 Crítica | OpenAI GPT + fine-tuning con taxonomía Certilab |
| IA-02 | **Extracción de datos de certificados energéticos PDF** (campos clave: calificación, fecha, emisor) | ATI-01 | Core producto | 🟡 Media | 🔴 Alto | 🔴 Crítica | OpenAI GPT-4o vision + validación por AT |
| IA-03 | **Detección de anomalías en certificados** (diferencias con datos del inmueble) | ATI-01 | Core producto | 🔴 Alta | 🔴 Alto | 🔴 Crítica | Reglas + IA para detección de patrones |
| IA-04 | **Chatbot IA para preguntas frecuentes** (CKB™) | TRV-01 | Captación | 🟢 Baja | 🟡 Medio | 🟡 Alta | RAG sobre base de conocimiento con docs Certilab |
| IA-05 | **Generación de borrador de dictamen** a partir de datos estructurados + notas del AT | ATI-01 | Eficiencia AT | 🔴 Alta | 🔴 Alto | 🟡 Alta (F2+) | GPT-4 + plantillas PITR™ |
| IA-06 | **Recomendación inteligente de cross-sell** basada en perfil del cliente y comportamiento | Todos | Cross-sell | 🟡 Media | 🟡 Medio | 🟡 Alta | Sistema de reglas + ML básico |
| IA-07 | **Análisis de sentimiento en encuestas NPS y reseñas** | Todos | Feedback | 🟢 Baja | 🟢 Bajo | 🟢 Media | Análisis NLP básico |
| IA-08 | **Búsqueda semántica en documentación técnica** (PITR™, normativa) | PLT-01 | Productividad AT | 🟡 Media | 🟡 Medio | 🟢 Media (F2+) | RAG con embeddings + Supabase pgvector |
| IA-09 | **Generación de contenido SEO asistido** (borradores de artículos para revisión humana) | Marketing | Captación | 🟢 Baja | 🟡 Medio | 🟢 Media (F3) | GPT-4 + prompt templates SEO |
| IA-10 | **Asistente IA para administradores** (respuestas a preguntas sobre ITE, plazos, normativas) | ATI-03 | Captación/Conversión | 🟡 Media | 🟡 Medio | 🟢 Media (F2+) | Chat RAG con base normativa |

---

## 3. Roadmap de automatización

### 3.1 Fase 1 (Mes 1-3): Automatización base

| ID | Prioridad | Dependencias | Implementación | Tiempo estimado |
|:--:|:---------:|--------------|----------------|:---------------:|
| AU-01 | 🔴 Crítica | Stripe conectado | Trigger webhook → email transaccional | 1-2 días |
| AU-02 | 🔴 Crítica | Pool de ATs creado | Sistema de cola + disponibilidad | 3-5 días |
| AU-05 | 🟡 Alta | Stripe conectado | Generación automática en Stripe | 1 día |
| AU-08 | 🟢 Media | — | Encuesta post-entrega (0-10) | 1 día |

### 3.2 Fase 2 (Mes 4-6): Automatización avanzada + primeras IA

| ID | Prioridad | Dependencias | Implementación | Tiempo estimado |
|:--:|:---------:|--------------|----------------|:---------------:|
| IA-01 | 🔴 Crítica | Documentos reales de clientes para entrenamiento | OpenAI API + pipeline de clasificación | 2-3 semanas |
| IA-02 | 🔴 Crítica | Certificados reales anonimizados para fine-tuning | OpenAI vision + extracción estructurada | 2-3 semanas |
| IA-03 | 🔴 Crítica | IA-02 completada + reglas de negocio | Pipeline de validación automática | 2 semanas |
| AU-07 | 🟡 Alta | GTD-03 implementado | Sistema de fechas + alertas email | 1 semana |
| IA-04 | 🟡 Alta | Base de conocimiento CKB™ poblada | RAG + chat widget | 2 semanas |
| AU-03 | 🟡 Alta | — | Email trigger tras abandono (24h) | 1 día |
| AU-04 | 🟡 Alta | — | Email templates + triggers post-entrega | 2 días |

### 3.3 Fase 3 (Mes 7-12): IA core + escalado

| ID | Prioridad | Dependencias | Implementación | Tiempo estimado |
|:--:|:---------:|--------------|----------------|:---------------:|
| IA-05 | 🟡 Alta | Piloto ATs con 50+ expedientes recopilados | Plantillas PITR™ + GPT-4 | 3-4 semanas |
| IA-06 | 🟡 Alta | Datos de 100+ clientes con historial de compra | Sistema de reglas + ML | 2-3 semanas |
| AU-10 | 🟢 Media | Datos estructurados de inmuebles | Generación automática con plantillas | 2 semanas |
| AU-09 | 🟢 Media | 50+ clientes satisfechos | Programa de referidos automatizado | 1 semana |
| IA-09 | 🟢 Media | — | Templates + GPT + revisión humana | En paralelo |

---

## 4. Ahorro estimado por automatización

### 4.1 Ahorro en tiempo de AT (horas/expediente)

| Producto | Sin automatización | Con automatización F1 | Con automatización F2 | Con automatización F3 | Ahorro total |
|----------|:------------------:|:---------------------:|:---------------------:|:---------------------:|:------------:|
| ATI-01 | 2h | 1h 45min (AU-01, AU-05) | 1h 15min (+IA-02, IA-03) | 1h (+IA-05) | **50%** |
| ATI-03 | 4-6h | 3h 45min-5h 45min (AU-01, AU-02) | 3-5h (+IA-01) | 2h 30min-4h 30min | **25-30%** |
| GTD-01 | 1-2h | 1-2h | 45min-1h (+IA-01) | 30-45min (+AU-10) | **50-60%** |

### 4.2 Ahorro en tiempo administrativo (horas/semana)

| Proceso | Sin automatización | Con automatización | Equivalente en €/mes |
|---------|:------------------:|:------------------:|:--------------------:|
| Confirmación de compras (20/semana) | 1h 40min | 0h | 100 € |
| Asignación de ATs (20/semana) | 5h | 0h | 300 € |
| Facturación (20/semana) | 1h 40min | 0h | 100 € |
| Emails post-servicio (20/semana) | 3h 20min | 0h | 200 € |
| **Total** | **11h 40min/semana** | **0h** | **700 €/mes** |

---

## 5. Inversión estimada en automatización

| Fase | Inversión estimada | Descripción |
|:----:|:------------------:|-------------|
| Fase 1 | 500-1.000 € | Herramientas low-code, email automation, triggers |
| Fase 2 | 3.000-5.000 € | OpenAI API, pipeline IA, RAG, desarrollo a medida |
| Fase 3 | 5.000-10.000 € | Modelos fine-tuned, automatización core, ML |
| **Total** | **8.500-16.000 €** | Inversión total en automatización e IA año 1 |

### 5.1 ROI estimado

| Concepto | Año 1 | Año 2 (escalado) |
|----------|:-----:|:----------------:|
| Ahorro en costes operativos | 8.400 €/año (700€/mes × 12 × 50% ramp-up) | 16.800 €/año |
| Ahorro en tiempo AT (mayor capacidad) | 5.000-8.000 €/año | 15.000-25.000 €/año |
| Incremento de conversión (automatización captación) | 3.000-6.000 €/año | 10.000-20.000 €/año |
| **ROI total estimado** | **16.400-22.400 €** | **41.800-61.800 €** |
| **Frente a inversión de** | **8.500-16.000 €** | **2.000-5.000 € (mantenimiento)** |
| **ROI neto** | **+40% a +160%** | **+700% a +1.200%** |

---

## 6. Riesgos de automatización e IA

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|:-----------:|:-------:|------------|
| **IA alucina en dictámenes** generando errores que el AT no detecta | Baja | 🔴 Crítico | Supervisión obligatoria. Validación humana antes de entrega al cliente. |
| **Dependencia de API externa** (OpenAI): coste variable, cambios de precio | Media | 🟡 Medio | Arquitectura desacoplada. Evaluar modelos open-source (Mistral, Llama) como backup. |
| **Datos sensibles** de cliente expuestos a API externa | Media | 🔴 Crítico | Anonimización estricta. Entorno on-premise o Azure OpenAI con datos residentes en UE. |
| **Sobre-automatización** que deshumaniza la relación con el cliente | Media | 🟡 Medio | Automatizar procesos, no relaciones. El AT sigue siendo el punto de contacto humano. |
| **Falsa eficiencia:** automatizar procesos que no deberían existir | Alta | 🟡 Medio | Revisar procesos antes de automatizar. Primero simplificar, luego automatizar. |
| **IA desplaza al AT** en lugar de aumentarlo | Baja | 🔴 Crítico | IA siempre como asistencia. Juicio técnico final siempre del AT. |

---

*Fin del documento GTM-001-AUTOMATION-IA-MATRIX.md*