# CF-031 — PITR™ Intelligent Question Tree

> ⚠️ **V2+ — NO IMPLEMENTAR EN MVP V1**
> Este documento corresponde al módulo avanzado de inspección PITR™, planificado para V2+. Define el árbol de decisión adaptativo para auditoría remota de certificados energéticos, un producto/servicio futuro fuera del alcance del MVP V1. No debe implementarse ni integrarse durante el desarrollo del MVP.

| Campo | Descripción |
|-------|-------------|
| **Código** | CF-031 |
| **Título** | PITR™ Intelligent Question Tree — Árbol inteligente de preguntas para auditoría remota de certificados energéticos |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-02 |
| **Autor** | Certilab® — Metodología PITR™ |
| **Propósito** | Definir el árbol de decisión adaptativo que guía la recogida de evidencia fotográfica y documental, determina la confianza por variable CE3X, identifica contradicciones y decide cuándo es necesaria revisión manual. ⚠️ **V2+ — NO IMPLEMENTAR EN MVP V1** |
| **Dependencias** | CF-030 (catálogo de evidencia fotográfica), CF-020 (modelo de datos), CF-012 (motor PITR), CF-000 (project brain) |
| **Audiencia** | Arquitectos Técnicos, desarrolladores del motor PITR, auditores de certificación energética |

---

## Índice

1. [Arquitectura del árbol de preguntas](#1-arquitectura-del-árbol-de-preguntas)
2. [Nivel 0 — Inicialización y contexto](#2-nivel-0--inicialización-y-contexto)
3. [Nivel 1 — Envolvente: Fachadas y cerramientos](#3-nivel-1--envolvente-fachadas-y-cerramientos)
4. [Nivel 2 — Envolvente: Huecos y ventanas](#4-nivel-2--envolvente-huecos-y-ventanas)
5. [Nivel 3 — Envolvente: Cubierta y suelos](#5-nivel-3--envolvente-cubierta-y-suelos)
6. [Nivel 4 — Envolvente: Puentes térmicos](#6-nivel-4--envolvente-puentes-térmicos)
7. [Nivel 5 — Instalaciones: Calefacción](#7-nivel-5--instalaciones-calefacción)
8. [Nivel 6 — Instalaciones: Refrigeración](#8-nivel-6--instalaciones-refrigeración)
9. [Nivel 7 — Instalaciones: ACS](#9-nivel-7--instalaciones-acs)
10. [Nivel 8 — Instalaciones: Ventilación](#10-nivel-8--instalaciones-ventilación)
11. [Nivel 9 — Energías renovables](#11-nivel-9--energías-renovables)
12. [Nivel 10 — Documentación complementaria](#12-nivel-10--documentación-complementaria)
13. [Nivel 11 — Matriz de contradicciones](#13-nivel-11--matriz-de-contradicciones)
14. [Nivel 12 — Decisión final: confianza y revisión manual](#14-nivel-12--decisión-final-confianza-y-revisión-manual)
15. [Apéndice A — Resumen de preguntas por variable CE3X](#15-apéndice-a--resumen-de-preguntas-por-variable-ce3x)
16. [Apéndice B — Flujo de priorización dinámica](#16-apéndice-b--flujo-de-priorización-dinámica)

---

## 1. Arquitectura del árbol de preguntas

### 1.1 Principios de diseño

1. **Adaptativo:** Las preguntas siguientes dependen de las respuestas anteriores (no es un cuestionario lineal).
2. **Orientado a variables CE3X:** Cada pregunta se asigna a una o más variables del certificado energético.
3. **Priorización dinámica:** Las preguntas esenciales se formulan primero; si se alcanza el umbral de confianza, las preguntas de baja prioridad se saltan.
4. **Trazabilidad completa:** Cada respuesta se asocia a un código de evidencia fotográfica (F-xxx, H-xxx, etc.) y a un nivel de confianza.
5. **Detección temprana de contradicciones:** Cuando dos preguntas producen respuestas incompatibles, se activa una rama de resolución de contradicciones antes de continuar.
6. **Decisión de revisión manual:** Al final del árbol, se calcula la confianza global y se determina si es necesaria visita presencial.

### 1.2 Estructura de cada nodo

Cada nodo del árbol sigue esta estructura:

```
NODO: [ID único]
├── Pregunta: [Texto de la pregunta al cliente/sistema]
├── Tipo: [binaria | opción múltiple | numérica | texto | foto]
├── Variable CE3X: [Código(s) de variable(s) afectada(s)]
├── Evidencia requerida: [Código(s) F-xxx / H-xxx / D-xxx de CF-030]
├── Dependencias: [Nodos que deben haberse respondido antes]
├── Confianza base: [%] (si la respuesta es clara y documentada)
├── Penalización por ausencia: [%] (si no se puede responder)
├── Ramas:
│   ├── Si [respuesta = A] → ir a [ID nodo]
│   ├── Si [respuesta = B] → ir a [ID nodo]
│   └── Si [respuesta = C] → ir a [ID nodo]
└── Contradicciones con: [Lista de nodos cuyas respuestas pueden ser incompatibles]
```

### 1.3 Convenciones de nomenclatura

| Prefijo | Nivel | Descripción |
|---------|-------|-------------|
| Q-000 | 0 | Contexto general del edificio |
| Q-1xx | 1 | Fachadas y cerramientos |
| Q-2xx | 2 | Huecos y ventanas |
| Q-3xx | 3 | Cubierta y suelos |
| Q-4xx | 4 | Puentes térmicos |
| Q-5xx | 5 | Calefacción |
| Q-6xx | 6 | Refrigeración |
| Q-7xx | 7 | ACS |
| Q-8xx | 8 | Ventilación |
| Q-9xx | 9 | Energías renovables |
| Q-Axx | 10 | Documentación complementaria |
| Q-Bxx | 11 | Contradicciones |
| Q-Cxx | 12 | Decisión final |

---

## 2. Nivel 0 — Inicialización y contexto

### NODO: Q-000 — Año de construcción del edificio

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Cuál es el año de construcción del edificio?" |
| **Tipo** | Numérica (año) |
| **Variable CE3X** | A1 (Año de construcción), C3-C10 (Composición de muros por época) |
| **Evidencia requerida** | D-001 (certificado original), escrituras o IBI |
| **Dependencias** | Ninguna (primer nodo) |
| **Confianza base** | 95% si se aporta documento oficial; 70% si es declarado por el cliente |
| **Ramas** | |
| | Si año < 1981 → Q-001 (NBE-CT-79 / anterior a normativa) |
| | Si 1981 ≤ año ≤ 2006 → Q-002 (CTE 2006 anterior / NBE-CT-79) |
| | Si 2007 ≤ año ≤ 2013 → Q-003 (CTE 2006 / HE 2013) |
| | Si año > 2013 → Q-004 (CTE HE 2019 / actual) |
| **Contradicciones con** | Q-A01 (certificado original puede tener año distinto) |

### NODO: Q-001 — Época constructiva pre-1981

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Se ha realizado alguna rehabilitación o reforma significativa en la envolvente (fachada, cubierta, ventanas) después de la construcción original?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Ninguna rehabilitación" / "Solo ventanas" / "Fachada completa (SATE, enfoscado)" / "Cubierta" / "Rehabilitación integral" |
| **Variable CE3X** | C1-C12 (composición de muros), D1-D6 (cubierta), F1-F18 (ventanas) |
| **Evidencia requerida** | F-001, F-020, F-023, F-027, F-036 |
| **Dependencias** | Q-000 |
| **Confianza base** | 90% si se documenta con fotos; 60% si solo es declaración verbal |
| **Ramas** | |
| | Si "Ninguna" → Esquema constructivo pre-1981 (muro sin aislamiento, ventanas originales) → Q-100 |
| | Si "Solo ventanas" → Muros originales pre-1981, ventanas modernas → Q-110 |
| | Si "Fachada completa" → Rehabilitación reciente → Q-120 |
| | Si "Cubierta" → Q-130 |
| | Si "Rehabilitación integral" → Q-140 |
| **Contradicciones con** | Q-100, Q-A01 |

### NODO: Q-002 — Época constructiva 1981–2006

| Campo | Valor |
|-------|-------|
| **Pregunta** | "El edificio fue construido entre 1981 y 2006. ¿Podría indicar el tipo de cerramiento exterior predominante?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Ladrillo cara vista sin aislamiento" / "Ladrillo con cámara de aire (sin aislamiento)" / "Ladrillo con cámara y aislamiento (especialmente post-2000)" / "Panel prefabricado de hormigón" / "No lo sé" |
| **Variable CE3X** | C1 (Tipo de fachada), C2 (Transmitancia térmica) |
| **Evidencia requerida** | F-001, F-020, F-021 |
| **Dependencias** | Q-000 |
| **Confianza base** | 80% si se aporta F-020 (detalle de fachada); 50% si no |
| **Ramas** | |
| | Si "Ladrillo sin aislamiento" → Verificar espesor del muro (F-021) → Q-101 |
| | Si "Ladrillo con cámara" → Verificar presencia de aislamiento (F-021, F-022) → Q-102 |
| | Si "Ladrillo con aislamiento" → Posible mejora respecto a la época → Q-103 |
| | Si "Panel prefabricado" → Q-104 |
| | Si "No lo sé" → Solicitar F-020, F-021 → Q-105 |
| **Contradicciones con** | Q-A01 |

### NODO: Q-003 — Época constructiva 2007–2013

| Campo | Valor |
|-------|-------|
| **Pregunta** | "El edificio fue construido entre 2007 y 2013 (CTE 2006). ¿Sabe si el edificio tiene SATE (Sistema de Aislamiento Térmico Exterior) u otro tipo de aislamiento continuo en fachada?" |
| **Tipo** | Binaria con opción "No lo sé" |
| **Variable CE3X** | C1 (Tipo de fachada), C2 (Transmitancia) |
| **Evidencia requerida** | F-001, F-020 |
| **Dependencias** | Q-000 |
| **Confianza base** | 85% si se aporta F-020; 50% si no |
| **Ramas** | |
| | Si "Sí (SATE)" → Q-106 |
| | Si "No (fachada tradicional)" → Q-107 |
| | Si "No lo sé" → Solicitar F-020, F-021, F-022 → Q-105 |
| **Contradicciones con** | Q-A01 |

### NODO: Q-004 — Época constructiva posterior a 2013

| Campo | Valor |
|-------|-------|
| **Pregunta** | "El edificio fue construido después de 2013 (CTE HE 2019 o DB-HE 2013). ¿Tiene acceso al proyecto de ejecución o al certificado de eficiencia energética del edificio terminado?" |
| **Tipo** | Binaria |
| **Variable CE3X** | Todas las variables (C, D, E, F, H, I, J, K) |
| **Evidencia requerida** | D-001 |
| **Dependencias** | Q-000 |
| **Confianza base** | 95% si se aporta proyecto o certificado original |
| **Ramas** | |
| | Si "Sí" → Validar certificado original (Q-A01) → Continuar con verificación de instalaciones (Q-500) |
| | Si "No" → Seguir árbol completo como edificio de época desconocida avanzada |
| **Contradicciones con** | Q-A01 |

### NODO: Q-005 — Tipo de vivienda

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Qué tipo de vivienda es?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Piso en edificio plurifamiliar (entre medianeras)" / "Piso en edificio plurifamiliar (ático/última planta)" / "Piso en edificio plurifamiliar (planta baja)" / "Vivienda unifamiliar adosada" / "Vivienda unifamiliar aislada (chalet)" / "Dúplex o vivienda en dos plantas" |
| **Variable CE3X** | A2 (Tipo de edificio), E1-E10 (Suelo), D1-D6 (Cubierta) |
| **Evidencia requerida** | F-001 (fachada completa) |
| **Dependencias** | Q-000 |
| **Confianza base** | 95% si se aporta F-001 |
| **Ramas** | |
| | Si "Entre medianeras" → Solo fachada principal y trasera son envolvente (Q-100) |
| | Si "Ático" → Cubierta y fachada son envolvente (Q-300) |
| | Si "Planta baja" → Suelo y fachada son envolvente (Q-350) |
| | Si "Adosada" → Fachada frontal, trasera y cubierta (Q-100, Q-300) |
| | Si "Aislada" → Todas las fachadas + cubierta + suelo (Q-100, Q-300, Q-350) |
| | Si "Dúplex" → Verificar si hay más envolvente que en un piso estándar |
| **Contradicciones con** | Q-A01, Q-000 |

---

## 3. Nivel 1 — Envolvente: Fachadas y cerramientos

### NODO: Q-100 — Material de fachada (identificación inicial)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Cuál es el material predominante de la fachada exterior?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Ladrillo cara vista" / "Enfoscado pintado (monocapa, mortero)" / "SATE (Sistema de Aislamiento Térmico Exterior)" / "Piedra natural o artificial" / "Panel sándwich o metal" / "Madera" / "No lo sé" |
| **Variable CE3X** | C1 (Tipo de fachada), C11 (Color de la fachada) |
| **Evidencia requerida** | F-001, F-020 |
| **Dependencias** | Q-000, Q-001/002/003/004, Q-005 |
| **Confianza base** | 90% con F-020 nítida; 60% sin foto |
| **Ramas** | |
| | Si "Ladrillo cara vista" → Q-101 |
| | Si "Enfoscado" → Q-102 |
| | Si "SATE" → Q-103 |
| | Si "Piedra" → Q-108 |
| | Si "Panel sándwich" → Q-109 |
| | Si "Madera" → Q-110 |
| | Si "No lo sé" → Solicitar F-020, redirigir a Q-105 |
| **Contradicciones con** | Q-A01 (certificado original), Q-000 (año constructivo) |

### NODO: Q-101 — Fachada de ladrillo cara vista: estimación de composición

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Se ve el canto del muro en alguna zona (enchufe, caja de persiana, hueco de obra)? Si es así, ¿cuánto mide aproximadamente el espesor total de la pared?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "< 25 cm (muro sencillo)" / "25-30 cm (doble hoja con cámara)" / "30-38 cm (doble hoja con cámara y posible aislamiento)" / "> 38 cm (con aislamiento grueso o piedra)" / "No se ve el espesor" |
| **Variable CE3X** | C1 (Tipo de fachada), C2 (U), C3-C10 (Capas del muro) |
| **Evidencia requerida** | F-020, F-021 |
| **Dependencias** | Q-100 |
| **Confianza base** | 95% si F-021 muestra espesor medible; 70% estimación por época constructiva |
| **Ramas** | |
| | Si "< 25 cm" → Muro de ladrillo hueco sencillo (sin cámara, sin aislamiento) → U ≈ 1.8-2.5 W/m²·K → Q-200 (pasar a ventanas) |
| | Si "25-30 cm" → Muro de doble hoja con cámara (sin aislamiento) → U ≈ 1.2-1.6 W/m²·K → Q-200 |
| | Si "30-38 cm" → Muro con cámara y posible aislamiento → Si pre-2000: sin aislamiento (U≈1.0-1.2); si post-2000: con aislamiento (U≈0.6-0.8) → Q-200 |
| | Si "> 38 cm" → Muro con aislamiento grueso o piedra → Q-108 (pasar a piedra) |
| | Si "No se ve" → Inferir por época constructiva (Q-000) → Asignar confianza reducida (70%) → Q-200 |
| **Contradicciones con** | Q-000 (si año <1981 y espesor >30cm, posible rehabilitación), Q-103 (si hay SATE visible) |

### NODO: Q-102 — Fachada enfoscada: estimación de composición

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La fachada es de enfoscado pintado. ¿El acabado tiene un color uniforme, liso, con esquineros visibles y sin juntas de ladrillo? ¿O se ve textura de ladrillo debajo?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Color uniforme, liso, con esquineros (parece SATE)" / "Textura de ladrillo debajo (enfoscado sobre ladrillo)" / "Acabado rugoso (monocapa)" / "No lo sé" |
| **Variable CE3X** | C1 (Tipo de fachada) |
| **Evidencia requerida** | F-020 |
| **Dependencias** | Q-100 |
| **Confianza base** | 90% con F-020 nítida |
| **Ramas** | |
| | Si "Parece SATE" → Q-103 (tratar como SATE) |
| | Si "Enfoscado sobre ladrillo" → Aplicar lógica de Q-101 según espesor |
| | Si "Monocapa" → Enfoscado monocapa sobre ladrillo o bloque → composición variable según época |
| | Si "No lo sé" → Solicitar F-020 más nítida o F-021 |
| **Contradicciones con** | Q-000 (si SATE en edificio pre-2006, puede ser rehabilitación), Q-101 |

### NODO: Q-103 — Fachada con SATE confirmado

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La fachada tiene SATE. ¿Sabe el espesor del aislamiento o cuándo se instaló?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Instalado en obra nueva (conozco el espesor: ___ cm)" / "Instalado en rehabilitación reciente (<5 años)" / "Instalado en rehabilitación (hace >5 años)" / "No sé el espesor ni cuándo se instaló" |
| **Variable CE3X** | C1 (Tipo de fachada), C2 (U) |
| **Evidencia requerida** | F-020, F-022 (si hay obra visible) |
| **Dependencias** | Q-100, Q-102 |
| **Confianza base** | 95% si se conoce espesor y tipo de aislamiento; 75% si solo se sabe que hay SATE sin detalle |
| **Ramas** | |
| | Si "Obra nueva (con espesor)" → Calcular U según espesor (EPS 3cm → U≈0.8; EPS 5cm → U≈0.55; EPS 8cm → U≈0.40) → Q-200 |
| | Si "Rehabilitación reciente" → Verificar documentación de la rehabilitación (Q-A03) → Q-200 |
| | Si "Rehabilitación antigua" → Verificar estado actual del SATE (F-023, F-024) → Q-200 |
| | Si "No sé" → Buscar corte constructivo (F-022) o inferir por época (si post-2013: espesor ≥5cm; si rehabilitación: espesor 3-8cm) → confianza reducida (70%) → Q-200 |
| **Contradicciones con** | Q-000 (si año <2006, no puede ser SATE original → debe ser rehabilitación) |

### NODO: Q-104 — Fachada de panel prefabricado

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La fachada es de panel prefabricado de hormigón. ¿Sabe si tiene aislamiento incorporado (panel sándwich) o es macizo?" |
| **Tipo** | Binaria con "No lo sé" |
| **Variable CE3X** | C1 (Tipo de fachada), C2 (U) |
| **Evidencia requerida** | F-020, F-022 |
| **Dependencias** | Q-100 |
| **Confianza base** | 80% si hay documentación; 50% sin ella |
| **Ramas** | |
| | Si "Panel sándwich (con aislamiento)" → U ≈ 0.5-0.8 W/m²·K (según espesor) |
| | Si "Macizo (sin aislamiento)" → U ≈ 2.0-3.0 W/m²·K |
| | Si "No lo sé" → Inferir por época (post-2000 suelen tener aislamiento) → confianza 60% |
| **Contradicciones con** | Q-000 |

### NODO: Q-105 — Solicitud de fotos de fachada (cuando no se puede identificar)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "No tenemos suficiente información para identificar la fachada. Por favor, tome las siguientes fotos: [F-001] Fachada completa del edificio; [F-020] Primer plano del material de la fachada (textura); [F-021] Si hay algún hueco en la pared (enchufe, caja de persiana), foto del espesor del muro." |
| **Tipo** | Acción (solicitud de fotos) |
| **Evidencia requerida** | F-001, F-020, F-021 |
| **Dependencias** | Q-100, Q-101, Q-102 |
| **Confianza base** | N/A (es un nodo de acción, no de pregunta) |
| **Ramas** | |
| | Si se reciben las fotos → Volver a Q-100 |
| | Si no se reciben → Asignar confianza baja (40%) y continuar con valores por defecto según época |

### NODO: Q-106 — Estado de conservación de la fachada

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿La fachada tiene algún defecto visible: grietas, manchas de humedad, desconchones, vegetación, o suciedad generalizada?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Sin defectos visibles (buena conservación)" / "Manchas de suciedad o pequeñas grietas (<1mm)" / "Grietas visibles (1-2mm)" / "Grietas importantes (>2mm)" / "Humedades generalizadas o desconchones" / "No lo sé / no puedo verlo" |
| **Variable CE3X** | C12 (Estado de conservación), G1-G8 (Puentes térmicos) |
| **Evidencia requerida** | F-023, F-024, F-025 (humedades interiores) |
| **Dependencias** | Q-100 |
| **Confianza base** | 85% si se aportan F-023 y F-024; 50% si solo declaración |
| **Ramas** | |
| | Si "Sin defectos" → C12 = "Buena" → Sin cambios en U |
| | Si "Pequeñas grietas o suciedad" → C12 = "Regular" → Posible incremento de infiltraciones |
| | Si "Grietas 1-2mm" → Solicitar F-024 con referencia de tamaño → Q-107 |
| | Si "Grietas >2mm" → **Revisión manual obligatoria** (Apéndice B de CF-030) → Q-C01 |
| | Si "Humedades generalizadas" → Solicitar F-025 → Q-107 |
| **Contradicciones con** | Q-103 (SATE en mal estado reduce su eficacia) |

### NODO: Q-107 — Detalle de patologías en fachada

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Por favor, tome una foto de cerca de la grieta/mancha con una moneda al lado para conocer su tamaño. ¿La grieta recorre toda la fachada o solo está en una zona localizada?" |
| **Tipo** | Texto + foto |
| **Variable CE3X** | C12 (Estado de conservación) |
| **Evidencia requerida** | F-024, F-025 |
| **Dependencias** | Q-106 |
| **Confianza base** | 90% con F-024 nítida y referencia de tamaño |
| **Ramas** | |
| | Si grieta <1mm localizada → C12 = "Buena" (defecto superficial) |
| | Si grieta 1-2mm → C12 = "Regular" |
| | Si grieta >2mm → **Revisión manual obligatoria** |
| | Si mancha de humedad → Evaluar origen (puente térmico, filtración) → Q-400 |

### NODO: Q-108 — Fachada de piedra

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La fachada es de piedra. ¿Sabe si es piedra maciza (muro de carga) o es un revestimiento de piedra sobre ladrillo?" |
| **Tipo** | Opción múltiple |
| **Variable CE3X** | C1, C2 |
| **Evidencia requerida** | F-020 |
| **Dependencias** | Q-100 |
| **Confianza base** | 75% |
| **Ramas** | |
| | Si "Piedra maciza" → U ≈ 2.0-3.0 W/m²·K (muy alta transmitancia, mucha inercia) |
| | Si "Revestimiento sobre ladrillo" → Similar a fachada de ladrillo (Q-101) |
| | Si "No lo sé" → Inferir por época y espesor visible |

### NODO: Q-109 — Fachada de panel sándwich o metal

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La fachada es de panel sándwich o metal. ¿Sabe el espesor del panel y el tipo de aislamiento (PUR, PIR, lana mineral)?" |
| **Tipo** | Texto |
| **Variable CE3X** | C1, C2 |
| **Evidencia requerida** | F-020, placa del panel si visible |
| **Dependencias** | Q-100 |
| **Confianza base** | 85% si se conoce espesor |
| **Ramas** | |
| | Si espesor conocido → Calcular U (panel 4cm PUR → U≈0.50; 6cm → U≈0.35; 8cm → U≈0.25) |
| | Si espesor desconocido → Usar valor típico (U≈0.50) con confianza reducida (60%) |

### NODO: Q-110 — Color de la fachada (absortividad solar)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿De qué color es la fachada?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Blanco / muy claro" / "Beige / amarillo / crema" / "Gris claro" / "Rojo / naranja / marrón claro" / "Gris oscuro" / "Azul oscuro / verde oscuro / negro" |
| **Variable CE3X** | C11 (Color de la fachada / absortividad solar) |
| **Evidencia requerida** | F-001, F-020 |
| **Dependencias** | Q-100 |
| **Confianza base** | 95% si F-020 es nítida y con luz natural |
| **Ramas** | |
| | Si "Blanco/muy claro" → Absortividad 0.3 (baja) |
| | Si "Beige/crema" → Absortividad 0.4 |
| | Si "Gris claro" → Absortividad 0.5 |
| | Si "Rojo/naranja" → Absortividad 0.6 |
| | Si "Gris oscuro" → Absortividad 0.7 |
| | Si "Azul/verde oscuro/negro" → Absortividad 0.8-0.9 (alta) |
| **Contradicciones con** | Q-A01 (certificado original puede tener un color distinto) |

---

## 4. Nivel 2 — Envolvente: Huecos y ventanas

### NODO: Q-200 — Tipo de marco de ventana

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿De qué material es el marco de las ventanas?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Madera" / "Aluminio (sin RPT)" / "Aluminio (con RPT — se ve una banda oscura entre los perfiles interior y exterior)" / "PVC (blanco, perfil grueso)" / "Mixto madera-aluminio" / "No lo sé" |
| **Variable CE3X** | F1 (Tipo de marco) |
| **Evidencia requerida** | F-036 (marco interior), F-037 (marco exterior) |
| **Dependencias** | Q-005 (tipo de vivienda) |
| **Confianza base** | 95% si se aportan F-036 y F-037 nítidas |
| **Ramas** | |
| | Si "Madera" → U_marco ≈ 2.0-2.5 W/m²·K → Q-210 |
| | Si "Aluminio sin RPT" → U_marco ≈ 5.0-6.0 W/m²·K (muy alta pérdida) → Q-210 |
| | Si "Aluminio con RPT" → U_marco ≈ 3.0-4.0 W/m²·K → Q-210 |
| | Si "PVC" → U_marco ≈ 1.5-2.5 W/m²·K (depende del número de cámaras) → Q-201 |
| | Si "Mixto" → U_marco ≈ 2.0-3.0 W/m²·K → Q-210 |
| | Si "No lo sé" → Solicitar F-036, F-037 → Q-202 |
| **Contradicciones con** | Q-000 (ventanas de PVC en edificio pre-1990 indican sustitución), Q-A01 |

### NODO: Q-201 — Número de cámaras en marco de PVC

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La ventana es de PVC. ¿Puede ver la sección del perfil (con la ventana entreabierta) para contar el número de cámaras?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "2 cámaras (perfil básico)" / "3-4 cámaras (perfil medio)" / "5+ cámaras (perfil alta eficiencia)" / "No se ve / No lo sé" |
| **Variable CE3X** | F1 (Tipo de marco), F3 (Transmitancia del hueco) |
| **Evidencia requerida** | F-038 (sección del perfil) |
| **Dependencias** | Q-200 |
| **Confianza base** | 85% si F-038 es nítida |
| **Ramas** | |
| | Si "2 cámaras" → U_marco ≈ 2.0-2.5 W/m²·K |
| | Si "3-4 cámaras" → U_marco ≈ 1.5-2.0 W/m²·K |
| | Si "5+ cámaras" → U_marco ≈ 1.2-1.5 W/m²·K |
| | Si "No se ve" → Usar valor típico (U≈1.8) con confianza 65% → Q-210 |

### NODO: Q-202 — Solicitud de fotos de marco de ventana

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Por favor, tome una foto del marco de la ventana desde el interior (F-036) y, si es posible, desde el exterior (F-037). Necesito ver el perfil completo para identificar el material." |
| **Tipo** | Acción |
| **Evidencia requerida** | F-036, F-037 |
| **Dependencias** | Q-200 |
| **Ramas** | |
| | Si se reciben las fotos → Volver a Q-200 |
| | Si no se reciben → Asignar valor por defecto según época (confianza 40%) → Q-210 |

### NODO: Q-210 — Tipo de acristalamiento

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Qué tipo de acristalamiento tiene la ventana?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Vidrio simple (un solo vidrio)" / "Doble acristalamiento (dos vidrios con cámara)" / "Triple acristalamiento (tres vidrios)" / "No lo sé" |
| **Variable CE3X** | F2 (Tipo de acristalamiento) |
| **Evidencia requerida** | F-039 (marcas en el vidrio), F-040 (perfil separador), F-041 (esquina del vidrio) |
| **Dependencias** | Q-200 |
| **Confianza base** | 98% si se encuentran marcas en el vidrio (F-039); 85% si se mide el perfil separador (F-040); 50% sin evidencia |
| **Ramas** | |
| | Si "Vidrio simple" → U_vidrio ≈ 5.7 W/m²·K → Q-220 |
| | Si "Doble acristalamiento" → Q-211 |
| | Si "Triple acristalamiento" → Q-212 |
| | Si "No lo sé" → Solicitar F-039, F-040, F-041 → Q-213 |
| **Contradicciones con** | Q-000, Q-200 |

### NODO: Q-211 — Doble acristalamiento: tipo de vidrio y cámara

| Campo | Valor |
|-------|-------|
| **Pregunta** | "El vidrio es doble. ¿Puede leer alguna marca en el vidrio (esquina inferior derecha, serigrafiado) o medir el perfil separador (la pieza metálica entre los vidrios)?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Marca legible: [texto de la marca]" / "Perfil separador visible: [medida en mm]" / "Marca: 4/12/4 o similar" / "Marca: incluye Low-E o Bajo Emisivo" / "Marca: incluye Argón" / "No hay marcas ni separador visible" |
| **Variable CE3X** | F2 (Tipo de acristalamiento), F3 (U_vidrio), F4 (Factor solar) |
| **Evidencia requerida** | F-039, F-040, F-042 |
| **Dependencias** | Q-210 |
| **Confianza base** | 98% si la marca es legible; 85% si se mide el separador |
| **Ramas** | |
| | Si marca "4/12/4" → 4mm vidrio + 12mm cámara + 4mm vidrio → U ≈ 2.8 W/m²·K |
| | Si "4/12Ar/4" → Cámara de argón → U ≈ 2.6 W/m²·K |
| | Si "Low-E" o "Bajo Emisivo" → U ≈ 1.5-2.0 W/m²·K (según espesor) |
| | Si "4/16/4 Low-E" → U ≈ 1.4 W/m²·K |
| | Si separador = 6mm → U ≈ 3.5 W/m²·K |
| | Si separador = 9mm → U ≈ 3.1 W/m²·K |
| | Si separador = 12mm → U ≈ 2.8 W/m²·K |
| | Si separador = 15mm → U ≈ 2.7 W/m²·K |
| | Si separador = 20mm → U ≈ 2.6 W/m²·K |
| | Si "No hay marcas" → Inferir por época (doble acristalamiento genérico) → U ≈ 2.8 (confianza 60%) |
| **Contradicciones con** | Q-200 (marco de aluminio sin RPT con doble acristalamiento bajo emisivo indica ventana de gama media/alta), Q-000 |

### NODO: Q-212 — Triple acristalamiento

| Campo | Valor |
|-------|-------|
| **Pregunta** | "El vidrio es triple. ¿Tiene marcas que indiquen el tipo de vidrio y el espesor de las cámaras? ¿Incluye vidrios bajo emisivos y gas argón?" |
| **Tipo** | Texto |
| **Variable CE3X** | F2, F3, F4 |
| **Evidencia requerida** | F-039, F-041 |
| **Dependencias** | Q-210 |
| **Confianza base** | 95% con marcas legibles |
| **Ramas** | |
| | Si "Triple bajo emisivo con argón" → U ≈ 0.5-0.9 W/m²·K (alta eficiencia) |
| | Si "Triple estándar" → U ≈ 1.8-2.2 W/m²·K |
| **Contradicciones con** | Q-000 (triple acristalamiento en España solo común en climas fríos o edificios Passivhaus) |

### NODO: Q-213 — Solicitud de fotos de acristalamiento

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Para identificar el acristalamiento, necesito: [F-039] Foto de las marcas en el vidrio (buscar en la esquina inferior derecha); [F-040] Foto del perfil separador (pieza metálica entre vidrios); [F-041] Foto de la esquina del vidrio mostrando su espesor total." |
| **Tipo** | Acción |
| **Evidencia requerida** | F-039, F-040, F-041 |
| **Dependencias** | Q-210 |
| **Ramas** | |
| | Si se reciben → Volver a Q-211 |
| | Si no se reciben → Asignar valor por defecto según época (confianza 30%) |

### NODO: Q-220 — Factor solar del acristalamiento (F4)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Si tiene marca legible del vidrio, ¿incluye algún valor 'g=' (factor solar) o algún dato sobre el control solar?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "g=0.XX visible en la marca" / "Vidrio bajo emisivo (g ≈ 0.6-0.7)" / "Vidrio de control solar (g ≈ 0.3-0.5)" / "Vidrio simple sin tratar (g ≈ 0.85)" / "Doble acristalamiento estándar (g ≈ 0.75-0.80)" / "No hay datos" |
| **Variable CE3X** | F4 (Factor solar) |
| **Evidencia requerida** | F-039 |
| **Dependencias** | Q-211, Q-212 |
| **Confianza base** | 98% si g es visible; 80% si se infiere del tipo de vidrio |
| **Ramas** | |
| | Si g conocido → Usar valor exacto |
| | Si vidrio bajo emisivo → g ≈ 0.65 |
| | Si control solar → g ≈ 0.40 |
| | Si vidrio simple → g ≈ 0.85 |
| | Si doble estándar → g ≈ 0.75 |
| | Si no hay datos → Usar valor por defecto del tipo de vidrio (confianza 60%) |

### NODO: Q-221 — Dimensiones de las ventanas (F5)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Puede medir el ancho y el alto del hueco de la ventana (no del marco)? Si no tiene cinta métrica, ¿puede ponerse al lado de la ventana para tener una referencia de tamaño?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Cinta métrica disponible: ancho = __ m, alto = __ m" / "Referencia visual (persona, puerta, cama)" / "Estimar sin medir" |
| **Variable CE3X** | F5 (Dimensiones de huecos) |
| **Evidencia requerida** | F-044, F-045, F-046 |
| **Dependencias** | Q-200 |
| **Confianza base** | 98% con cinta métrica; 80% con referencia visual; 50% estimación |
| **Ramas** | |
| | Si "Cinta métrica" → Usar valores exactos |
| | Si "Referencia visual" → Solicitar F-046 |
| | Si "Estimar" → Usar valores típicos según tipo de estancia (confianza 40%) → Continuar |

### NODO: Q-222 — Protecciones solares (F6)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Las ventanas tienen protecciones solares? Indique el tipo para cada ventana o para la mayoría." |
| **Tipo** | Opción múltiple |
| **Opciones** | "Toldo exterior (extensible, fijo)" / "Persiana (PVC, aluminio, enrollable)" / "Persiana veneciana / lamas orientables" / "Cortina interior opaca" / "Estor interior semitransparente" / "No tiene protecciones solares" / "Tiene toldo/lamas + persiana" |
| **Variable CE3X** | F6 (Factor de sombra) |
| **Evidencia requerida** | F-015, F-016, F-017, F-018, F-048 |
| **Dependencias** | Q-200 |
| **Confianza base** | 90% con F-015 y F-018; 70% sin fotos |
| **Ramas** | |
| | Si "Toldo exterior" → Factor de sombra 0.3-0.5 (según material y ángulo) |
| | Si "Persiana" → Factor 0.4-0.6 (según material: PVC mejor que aluminio) |
| | Si "Veneciana" → Factor 0.3-0.7 (según ángulo de lamas) |
| | Si "Cortina opaca interior" → Factor 0.3-0.5 |
| | Si "Estor semitransparente" → Factor 0.6-0.8 |
| | Si "No tiene" → Factor 1.0 (sin protección) |
| | Si "Toldo + persiana" → Factor combinado: multiplicar factores (ej. 0.4 × 0.5 = 0.2) |
| **Contradicciones con** | Q-227 (sombra exterior por obstáculos) |

### NODO: Q-223 — Sombra exterior de ventanas (obstáculos)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Desde el exterior, ¿hay algún obstáculo que dé sombra a las ventanas? (edificio de enfrente más alto, árbol, toldo del vecino superior)" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Edificio de enfrente más alto (sombra permanente)" / "Edificio de enfrente de menor altura (sombra parcial)" / "Árbol de hoja caduca" / "Árbol de hoja perenne" / "Toldo o voladizo del vecino superior" / "Ningún obstáculo (ventana despejada)" / "No lo sé" |
| **Variable CE3X** | F6 (Factor de sombra) |
| **Evidencia requerida** | F-047 |
| **Dependencias** | Q-200 |
| **Confianza base** | 70% con F-047; 50% sin foto |
| **Ramas** | |
| | Si "Edificio más alto (sombra permanente)" → Factor obstáculo 0.5-0.7 |
| | Si "Edificio más bajo (sombra parcial)" → Factor obstáculo 0.7-0.9 |
| | Si "Árbol hoja caduca" → Verano: 0.6-0.7; Invierno: 0.8-0.9 |
| | Si "Árbol hoja perenne" → Factor 0.6-0.8 todo el año |
| | Si "Ninguno" → Factor 1.0 |
| | Si "No lo sé" → Solicitar F-047 → Si no se obtiene, factor 1.0 (confianza 50%) |
| **Contradicciones con** | Q-222, Q-000 |

### NODO: Q-224 — Número de ventanas por orientación

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Cuántas ventanas tiene la vivienda y hacia qué orientación principal miran?" |
| **Tipo** | Texto estructurado por orientación |
| **Variable CE3X** | F13-F18 (Número de huecos por orientación) |
| **Evidencia requerida** | F-043 (todas las ventanas), F-001 (fachada) |
| **Dependencias** | Q-200, Q-005 |
| **Confianza base** | 95% si se fotografían todas las ventanas (F-043) |
| **Ramas** | |
| | → Pedir fotos de cada ventana (F-043) |
| | → Confirmar orientación con la fachada (F-001) y brújula / Google Maps |

### NODO: Q-225 — Estado de burletes y permeabilidad

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Nota corrientes de aire cerca de las ventanas? ¿Las gomas (burletes) alrededor del marco están en buen estado?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Burletes en buen estado (flexibles, completos)" / "Burletes deteriorados (duros, rotos, faltan trozos)" / "No tiene burletes" / "No lo sé" |
| **Variable CE3X** | F7 (Permeabilidad al aire), F9 (Estado de juntas) |
| **Evidencia requerida** | F-049 |
| **Dependencias** | Q-200 |
| **Confianza base** | 85% con F-049; 60% sin foto |
| **Ramas** | |
| | Si "Buen estado" → Permeabilidad Clase 3-4 (baja) |
| | Si "Deteriorados" → Permeabilidad Clase 1-2 (alta) |
| | Si "No tiene burletes" → Permeabilidad Clase 1 (muy alta) |
| | Si "No lo sé" → Solicitar F-049 → Si no se obtiene, inferir por antigüedad (confianza 40%) |

### NODO: Q-226 — Tipo de apertura de ventana

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Cómo se abren las ventanas?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Abatible (se abren hacia dentro)" / "Oscilobatiente (se inclinan hacia dentro + abatible)" / "Corredera (se desplazan lateralmente)" / "Pivotante (giran sobre un eje)" / "Fija (no se abren)" |
| **Variable CE3X** | F8 (Tipo de apertura) |
| **Evidencia requerida** | F-050 |
| **Dependencias** | Q-200 |
| **Confianza base** | 95% con F-050 |
| **Ramas** | |
| | Si "Abatible" → Mejor estanqueidad (Clase 3-4) |
| | Si "Oscilobatiente" → Muy buena estanqueidad (Clase 4) |
| | Si "Corredera" → Peor estanqueidad (Clase 1-3) |
| | Si "Pivotante" → Estanqueidad variable |
| | Si "Fija" → Estanqueidad perfecta (no hay infiltración) |

### NODO: Q-227 — Puerta de entrada a la vivienda

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿De qué material es la puerta de entrada a la vivienda y tiene burletes?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Madera maciza con burletes" / "Madera maciza sin burletes" / "Madera hueca" / "Metálica con aislamiento" / "Metálica sin aislamiento" / "PVC" / "No lo sé" |
| **Variable CE3X** | F12 (Puerta de acceso) |
| **Evidencia requerida** | F-051 |
| **Dependencias** | Q-005 |
| **Confianza base** | 85% con F-051 |
| **Ramas** | |
| | Si "Madera maciza con burletes" → Baja pérdida por infiltración |
| | Si "Madera maciza sin burletes" → Pérdida media |
| | Si "Madera hueca" → Alta pérdida |
| | Si "Metálica con aislamiento" → Baja pérdida |
| | Si "Metálica sin aislamiento" → Alta pérdida |
| | Si "PVC" → Baja pérdida |

---

## 5. Nivel 3 — Envolvente: Cubierta y suelos

### NODO: Q-300 — Tipo de cubierta

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Qué tipo de cubierta tiene el edificio?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Cubierta plana (terraza, azotea)" / "Cubierta inclinada (tejado de tejas)" / "Cubierta inclinada (panel sándwich o metal)" / "No lo sé / no se ve desde la calle" / "No aplica (vivienda entre medianeras, no soy ático)" |
| **Variable CE3X** | D1 (Tipo de cubierta) |
| **Evidencia requerida** | F-027 (perfil del edificio), F-028 (vista cenital) |
| **Dependencias** | Q-000, Q-005 |
| **Confianza base** | 85% con F-027; 90% con F-028; 40% sin evidencia visual |
| **Ramas** | |
| | Si "Plana" → Q-301 |
| | Si "Inclinada (tejas)" → Q-302 |
| | Si "Panel sándwich" → Q-303 |
| | Si "No lo sé" → Solicitar F-027, F-028 |
| | Si "No aplica" → Marcar D1 como "No aplica" (vivienda no es ático ni unifamiliar) → Q-350 |

### NODO: Q-301 — Cubierta plana: composición y estado

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La cubierta es plana. ¿Sabe si tiene aislamiento? ¿Puede ver el canto o borde de la cubierta para estimar su espesor?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Sé que tiene aislamiento (espesor conocido: __ cm)" / "Borde visible: espesor total 20-25cm (probablemente sin aislamiento)" / "Borde visible: espesor 30-40cm (probablemente con aislamiento)" / "No se ve el borde / No lo sé" |
| **Variable CE3X** | D1 (Tipo de cubierta), D2 (Composición), D3-D6 (Estado) |
| **Evidencia requerida** | F-028, F-030 (borde de cubierta), F-032 (juntas y encuentros) |
| **Dependencias** | Q-300 |
| **Confianza base** | 90% si se ve el borde (F-030); 70% si solo se conoce la época constructiva |
| **Ramas** | |
| | Si "Aislamiento conocido" → Calcular U según espesor (EPS 5cm → U≈0.55; 8cm → U≈0.40) |
| | Si "20-25cm" → U ≈ 1.2-1.8 W/m²·K (cubierta plana sin aislamiento) |
| | Si "30-40cm" → U ≈ 0.5-0.8 W/m²·K (cubierta plana con aislamiento) |
| | Si "No lo sé" → Inferir por época (pre-2006: sin aislamiento; post-2006: con aislamiento) → confianza 60% |

### NODO: Q-302 — Cubierta inclinada (tejas): composición

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La cubierta es inclinada con tejas. ¿Tiene acceso al desván o al espacio bajo cubierta (ático, trastero)? Si es así, ¿se ve aislamiento entre las vigas?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Acceso al desván: se ve aislamiento (tipo y espesor visible)" / "Acceso al desván: no se ve aislamiento" / "No tengo acceso al desván" / "Vivo en un ático habitable con el techo inclinado visto" |
| **Variable CE3X** | D1 (Tipo de cubierta), D2 (Composición) |
| **Evidencia requerida** | F-029 (interior ático/última planta), F-031 (bajo cubierta inclinada) |
| **Dependencias** | Q-300 |
| **Confianza base** | 95% si F-031 es accesible; 70% sin acceso |
| **Ramas** | |
| | Si "Aislamiento visible" → Tipo y espesor permiten calcular U (lana mineral 10cm → U≈0.40; poliestireno 5cm → U≈0.55) |
| | Si "Sin aislamiento visible" → U ≈ 1.5-2.5 W/m²·K (depende del tipo de teja y soporte) |
| | Si "Sin acceso" → Inferir por época (pre-2006: sin aislamiento; post-2006: con aislamiento) → confianza 55% |
| | Si "Ático habitable" → Verificar techo inclinado (F-029): si hay falso techo, el aislamiento puede estar oculto → confianza 60% |

### NODO: Q-303 — Cubierta de panel sándwich

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La cubierta es de panel sándwich. ¿Sabe el espesor y el tipo de aislamiento?" |
| **Tipo** | Texto |
| **Variable CE3X** | D1, D2 |
| **Evidencia requerida** | F-028 |
| **Dependencias** | Q-300 |
| **Confianza base** | 85% si se conoce el espesor |
| **Ramas** | |
| | → Calcular U según espesor y tipo de aislamiento |

### NODO: Q-304 — Estado de la cubierta

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Hay manchas de humedad en el techo de alguna habitación (especialmente en la última planta)? ¿Se ven filtraciones, goteras, o tejas rotas?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Sin manchas ni filtraciones" / "Manchas en el techo (posibles filtraciones)" / "Goteras activas" / "Tejas rotas o desplazadas (visibles desde la calle)" / "No lo sé / no puedo verlo" |
| **Variable CE3X** | D3-D6 (Estado de cubierta) |
| **Evidencia requerida** | F-025 (humedades interiores), F-029 (interior ático) |
| **Dependencias** | Q-300, Q-005 |
| **Confianza base** | 85% con F-025 nítida |
| **Ramas** | |
| | Si "Sin manchas" → D3-D6 = "Bueno" |
| | Si "Manchas en techo" → Posible filtración → Solicitar F-025, F-029 → Si se confirma, D3-D6 = "Regular/Malo" |
| | Si "Goteras activas" → **Revisión manual recomendada** |
| | Si "Tejas rotas" → Solicitar F-028 (vista cenital) → D3-D6 = "Malo" |

### NODO: Q-350 — Tipo de suelo en contacto con el terreno (planta baja)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La vivienda está en planta baja (o es unifamiliar). ¿Qué hay debajo del suelo?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Terrero directamente (solera / forjado sanitario)" / "Garaje o sótano (espacio no calefactado bajo la vivienda)" / "Cámara de aire sanitaria (espacio ventilado bajo el suelo)" / "Otra vivienda (piso inferior)" / "No lo sé" / "No aplica (vivo en un piso entre plantas, no en planta baja)" |
| **Variable CE3X** | E1 (Tipo de suelo), E6-E10 (Resistencia del terreno) |
| **Evidencia requerida** | F-035 (espacio bajo la vivienda) |
| **Dependencias** | Q-005 |
| **Confianza base** | 95% si hay acceso al espacio inferior (F-035); 60% sin acceso |
| **Ramas** | |
| | Si "Terrero directo (solera)" → U ≈ 0.5-1.0 W/m²·K (depende del perímetro y aislamiento) |
| | Si "Garaje/sótano" → Forjado sobre espacio no calefactado → U según composición del forjado |
| | Si "Cámara de aire" → Suelo sobre cámara ventilada → U más alto (mayor pérdida) |
| | Si "Otra vivienda" → No aplica pérdidas por suelo (el piso inferior está calefactado) → E1 = "Entre plantas" |
| | Si "No lo sé" → Inferir por tipo de edificio (bloque: otra vivienda; unifamiliar: solera o cámara) → confianza 50% |
| **Contradicciones con** | Q-000, Q-A01 |

### NODO: Q-351 — Material del suelo interior

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿De qué material es el suelo de la mayor parte de la vivienda?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Tarima / parquet (madera)" / "Gres / cerámica / porcelánico" / "Mármol / piedra natural" / "Moqueta" / "Vinilo / linóleo" / "Hormigón pulido" |
| **Variable CE3X** | E1 (Tipo de suelo) — complementa la inercia térmica |
| **Evidencia requerida** | F-033 |
| **Dependencias** | Q-350 |
| **Confianza base** | 95% con F-033 |
| **Ramas** | |
| | Si "Madera" → Baja inercia térmica (afecta a la respuesta del edificio a cambios de temperatura) |
| | Si "Cerámica / piedra" → Alta inercia térmica |
| | Si "Moqueta" → Baja inercia, pero añade resistencia superficial |
| | Si "Vinilo" → Inercia baja-media |

---

## 6. Nivel 4 — Envolvente: Puentes térmicos

### NODO: Q-400 — Moho o condensación en esquinas

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Hay manchas de moho negro o humedad en las esquinas de las habitaciones que dan al exterior?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "No, ninguna esquina tiene moho" / "Sí, en algunas esquinas de habitaciones exteriores" / "Sí, en muchas esquinas" / "Sí, pero solo en el baño (no en habitaciones)" |
| **Variable CE3X** | G1 (Puentes térmicos en fachada), G5 (Esquinas de fachada) |
| **Evidencia requerida** | F-053 (esquina interior), F-025 (humedades) |
| **Dependencias** | Q-100, Q-005 |
| **Confianza base** | 85% con F-053 nítida |
| **Ramas** | |
| | Si "No" → Es probable que los puentes térmicos sean moderados o la ventilación sea adecuada |
| | Si "Sí, en esquinas exteriores" → Puente térmico significativo (la temperatura superficial de la esquina está por debajo del punto de rocío) → Q-401 |
| | Si "Sí, en muchas" → Puentes térmicos generalizados → posible problema de aislamiento → **Revisión manual recomendada** |
| | Si "Solo en baño" → Probable condensación por humedad del baño (no puente térmico) |

### NODO: Q-401 — Caja de persiana

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Se ve la caja de la persiana (sobre la ventana)? ¿Tiene aislamiento visible o deja pasar el aire/la luz?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Caja visible: tiene aislamiento (espuma, lana)" / "Caja visible: no tiene aislamiento" / "Caja visible: deja pasar la luz (hay rendijas)" / "Caja no visible (oculta por falso techo o armario)" |
| **Variable CE3X** | G6 (Cajas de persiana) |
| **Evidencia requerida** | F-054 |
| **Dependencias** | Q-400, Q-200 |
| **Confianza base** | 85% si F-054 es nítida |
| **Ramas** | |
| | Si "Con aislamiento" → ψ ≈ 0.10-0.15 W/m·K (puente térmico reducido) |
| | Si "Sin aislamiento" → ψ ≈ 0.20-0.30 W/m·K (puente térmico significativo) |
| | Si "Pasa luz/aire" → ψ > 0.30 W/m·K (puente térmico grave) |
| | Si "No visible" → Asumir valor típico según época (ψ≈0.25) → confianza 50% |

### NODO: Q-402 — Encuentro fachada-forjado

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Desde la calle, ¿se ve una línea horizontal en la fachada a la altura de cada piso (el borde del forjado)? ¿La fachada es continua o se ven las losas de los balcones/terrazas?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Sí, se ven líneas horizontales (forjados visibles)" / "La fachada es lisa y continua (tiene SATE, no se ven los forjados)" / "Hay balcones/terrazas voladas de hormigón" / "No se ven los forjados (fachada ventilada)" / "No lo sé" |
| **Variable CE3X** | G2 (Encuentro fachada-forjado), G8 (Balcones y terrazas) |
| **Evidencia requerida** | F-056 (encuentro fachada-forjado), F-026 (esquinas y encuentros con balcones) |
| **Dependencias** | Q-100, Q-005 |
| **Confianza base** | 85% con F-056 nítida |
| **Ramas** | |
| | Si "Forjados visibles" → Puente térmico de forjado significativo (G2: ψ≈0.15-0.25) |
| | Si "Fachada continua (SATE)" → Puente térmico mínimo (G2: ψ≈0.05-0.10) |
| | Si "Balcones volados" → Puente térmico grave en terrazas (G8: ψ≈0.30-0.50) → **Revisión manual recomendada** |
| | Si "Fachada ventilada" → Puente térmico reducido |

---

## 7. Nivel 5 — Instalaciones: Calefacción

### NODO: Q-500 — Tipo de sistema de calefacción

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Qué sistema utiliza la vivienda para calefacción?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Caldera de gas (natural o propano)" / "Bomba de calor (aire-acondicionado con función calor)" / "Estufa de pellets / biomasa" / "Calefacción eléctrica (radiadores eléctricos, acumuladores)" / "Calefacción centralizada (comunidad de propietarios)" / "Suelo radiante (agua o eléctrico)" / "No tengo calefacción / no uso" / "No lo sé" |
| **Variable CE3X** | H1 (Sistema de calefacción), H4 (Combustible) |
| **Evidencia requerida** | H-001 (equipo de calefacción), H-002 (emisores) |
| **Dependencias** | Q-000, Q-005 |
| **Confianza base** | 90% con H-001 y H-002 |
| **Ramas** | |
| | Si "Caldera de gas" → Q-501 |
| | Si "Bomba de calor" → Q-502 |
| | Si "Estufa pellets" → Q-503 |
| | Si "Eléctrica directa" → Q-504 |
| | Si "Centralizada" → Q-505 |
| | Si "Suelo radiante" → Q-506 |
| | Si "No tengo / no uso" → H1 = "No existe" → Q-600 (pasar a refrigeración) |
| | Si "No lo sé" → Solicitar H-001, H-002 → Q-507 |
| **Contradicciones con** | Q-A01 (certificado original puede tener otro sistema) |

### NODO: Q-501 — Caldera de gas: datos técnicos

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La caldera de gas, ¿puede leer la placa de características (marca, modelo, potencia, año)?" |
| **Tipo** | Opción múltiple + foto |
| **Opciones** | "Sí, placa legible: marca ___, modelo ___, potencia __ kW, año ___" / "Solo veo la marca y el modelo" / "La placa no es legible" |
| **Variable CE3X** | H2 (Potencia), H3 (Rendimiento), H8 (Antigüedad) |
| **Evidencia requerida** | H-001, H-003 (placa) |
| **Dependencias** | Q-500 |
| **Confianza base** | 99% si H-003 es legible; 70% si solo se ve la marca |
| **Ramas** | |
| | Si "Placa legible" → Extraer datos: potencia (H2), año (H8). Consultar base de datos de rendimientos para obtener η (H3). Si año > 2010 y caldera de condensación → η ≈ 90-94%. Si anterior → η ≈ 80-85%. |
| | Si "Solo marca/modelo" → Consultar base de datos de rendimientos por modelo → confianza 80% |
| | Si "Placa no legible" → Estimar por antigüedad (visible en H-001): caldera antigua → η ≈ 75-80%; reciente → η ≈ 85-90% → confianza 60% |
| **Contradicciones con** | Q-000, Q-A01 |

### NODO: Q-502 — Bomba de calor: datos técnicos

| Campo | Valor |
|-------|-------|
| **Pregunta** | "El equipo de bomba de calor, ¿puede leer la placa de características del split interior o de la unidad exterior (marca, modelo, capacidad, EER/COP)?" |
| **Tipo** | Opción múltiple + foto |
| **Opciones** | "Sí, unidad exterior visible con placa legible" / "Sí, solo la unidad interior (split) visible" / "No encuentro la unidad exterior" / "No hay placa legible" |
| **Variable CE3X** | I1 (Sistema), I2 (Potencia), I3 (Eficiencia), H1 (si también calefacción) |
| **Evidencia requerida** | I-001 (unidad interior), I-002 (unidad exterior), I-005 (placa exterior) |
| **Dependencias** | Q-500 |
| **Confianza base** | 95% si se accede a la unidad exterior (I-002 + I-005); 70% si solo se ve la interior |
| **Ramas** | |
| | Si "Unidad exterior visible" → Obtener capacidad (I2), EER/SEER (I3), tipo de refrigerante (I4) |
| | Si "Solo unidad interior" → Estimar por tamaño del split: split pequeño (2.5 kW), mediano (3.5 kW), grande (5.0 kW). Eficiencia estimada por año → confianza 60% |
| | Si "No encuentro exterior" → Solicitar I-002 (preguntar al cliente dónde está la unidad exterior) → Q-507 |
| **Contradicciones con** | Q-A01 |

### NODO: Q-503 — Estufa de pellets/biomasa

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La estufa de pellets, ¿tiene placa de características visible? ¿Sabe la potencia y el rendimiento?" |
| **Tipo** | Texto + foto |
| **Variable CE3X** | H1, H2, H3, H4 |
| **Evidencia requerida** | H-001, H-003 |
| **Dependencias** | Q-500 |
| **Confianza base** | 85% con placa legible |
| **Ramas** | |
| | → Obtener potencia (típicamente 5-12 kW) y rendimiento (70-90% según modelo) |

### NODO: Q-504 — Calefacción eléctrica directa

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Los radiadores eléctricos, ¿son de acumulación (grandes, pesados, con material refractario) o son radiadores eléctricos directos (convectores, paneles radiantes)?" |
| **Tipo** | Binaria |
| **Variable CE3X** | H1, H3 |
| **Evidencia requerida** | H-002 |
| **Dependencias** | Q-500 |
| **Confianza base** | 90% con H-002 |
| **Ramas** | |
| | Si "Acumulación" → η ≈ 100% (aprovechan tarifa nocturna, mayor eficiencia económica) |
| | Si "Directos" → η ≈ 100% (toda la electricidad se convierte en calor, pero es caro) |
| **Contradicciones con** | Q-A01 |

### NODO: Q-505 — Calefacción centralizada

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La calefacción es centralizada (comunidad de propietarios). ¿Tiene contador individual? ¿Sabe el tipo de combustible de la caldera comunitaria?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Sí, tengo contador individual (consumo medido)" / "No, el consumo se reparte por coeficiente" / "No sé el tipo de combustible" / "Gas natural" / "Gasóleo" |
| **Variable CE3X** | H1, H4, H15 |
| **Evidencia requerida** | H-007 (factura), H-008 (contador) |
| **Dependencias** | Q-500 |
| **Confianza base** | 85% si hay factura individual |
| **Ramas** | |
| | Si "Contador individual" → Solicitar factura (H-007) → calcular consumo real |
| | Si "Reparto por coeficiente" → Dato menos preciso. Solicitar factura de la comunidad si está disponible |

### NODO: Q-506 — Suelo radiante

| Campo | Valor |
|-------|-------|
| **Pregunta** | "El suelo radiante, ¿es de agua (hidrónico) o eléctrico? ¿Ve el manifold (colector) o el termostato?" |
| **Tipo** | Binaria |
| **Variable CE3X** | H1, H5 |
| **Evidencia requerida** | H-002 (mostrar termostato o manifold), F-019 (termostato) |
| **Dependencias** | Q-500 |
| **Confianza base** | 80% con evidencia visual |
| **Ramas** | |
| | Si "Agua (hidrónico)" → Sistema de baja temperatura → requiere caldera de condensación o aerotermia |
| | Si "Eléctrico" → Sistema de resistencia eléctrica bajo el suelo |

### NODO: Q-507 — Solicitud de fotos de calefacción

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Por favor, tome fotos del equipo de calefacción: [H-001] Foto general del equipo (caldera, split, estufa); [H-003] Placa de características (datos técnicos); [H-002] Foto de los radiadores o splits de cada habitación." |
| **Tipo** | Acción |
| **Evidencia requerida** | H-001, H-002, H-003 |
| **Dependencias** | Q-500, Q-501, Q-502 |
| **Ramas** | |
| | Si se reciben → Volver al nodo correspondiente |
| | Si no se reciben → Asignar valores por defecto según época (confianza 30%) |

### NODO: Q-508 — Emisores de calefacción

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Qué tipo de emisores tiene en cada habitación?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Radiadores de agua (paneles blancos metálicos)" / "Radiadores eléctricos (conectados a la red)" / "Splits de bomba de calor (unidad en pared)" / "Fancoils (unidad con ventilador)" / "Suelo radiante / Toallero en baño" / "No sabe / no hay emisores visibles" |
| **Variable CE3X** | H5 (Sistema de distribución), H17 (Fracción calefactada) |
| **Evidencia requerida** | H-002 |
| **Dependencias** | Q-500 |
| **Confianza base** | 95% con H-002 |
| **Ramas** | |
| | → Confirmar que hay emisores en todas las estancias (o identificar cuáles no tienen) |

### NODO: Q-509 — Termostato y control

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Tiene termostato para controlar la calefacción? ¿Es programable o manual? ¿Qué temperatura suele tener programada en invierno?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Termostato programable (con pantalla): temperatura __°C" / "Termostato manual (dial): temperatura __" / "No tengo termostato (controlo manualmente el equipo)" / "Termostato inteligente (WiFi, app)" |
| **Variable CE3X** | H6 (Sistema de control), B8 (Temperatura de consigna) |
| **Evidencia requerida** | F-019, H-004 |
| **Dependencias** | Q-500 |
| **Confianza base** | 90% con H-004 nítido |
| **Ramas** | |
| | Si "Programable" → Mejor eficiencia (ahorro 10-15% respecto a manual) |
| | Si "Manual" → Eficiencia estándar |
| | Si "No tengo" → Control manual del equipo |
| | Si "Inteligente" → Máxima eficiencia de control |

### NODO: Q-510 — Temperatura de consigna en invierno (B8)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿A qué temperatura suele tener el termostato en invierno cuando está en casa?" |
| **Tipo** | Numérica (°C) |
| **Variable CE3X** | B8 (Temperatura de consigna) |
| **Evidencia requerida** | H-004 (lectura del termostato) |
| **Dependencias** | Q-509 |
| **Confianza base** | 90% si se ve en H-004; 70% si es declarado |
| **Ramas** | |
| | → El valor por defecto en CE3X es 20°C para viviendas. Si el cliente declara 20-21°C, usar valor estándar. Si declara >22°C o <18°C, documentar como dato real. |

### NODO: Q-511 — Factura de combustible (calefacción)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Puede compartir las facturas de gas y/o electricidad de los últimos 12 meses? (Puede tapar los datos personales y el importe. Necesito ver el consumo en kWh y las fechas.)" |
| **Tipo** | Acción (envío de documentos) |
| **Variable CE3X** | H15 (Consumo de calefacción) |
| **Evidencia requerida** | H-007, D-002 |
| **Dependencias** | Q-501, Q-502, Q-503, Q-504, Q-505 |
| **Confianza base** | 98% si se reciben facturas de 12 meses completos |
| **Ramas** | |
| | Si se reciben → Desglosar consumo de calefacción (restando consumo base de verano). Comparar con estimación CE3X. Si diferencia >20%, revisar datos de entrada. |
| | Si no se reciben → Usar valores por defecto de CE3X (confianza 40%) |

---

## 8. Nivel 6 — Instalaciones: Refrigeración

### NODO: Q-600 — Sistema de refrigeración

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿La vivienda tiene aire acondicionado o algún sistema de refrigeración?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Sí, splits de aire acondicionado (uno o varios)" / "Sí, sistema centralizado por conductos" / "Sí, equipo portátil (no fijo)" / "No tengo refrigeración" / "Sí, bomba de calor (usa el mismo equipo que calefacción)" |
| **Variable CE3X** | I1 (Sistema de refrigeración) |
| **Evidencia requerida** | I-001 (unidad interior), I-002 (unidad exterior) |
| **Dependencias** | Q-005 |
| **Confianza base** | 90% con I-001 |
| **Ramas** | |
| | Si "Splits" → Q-601 |
| | Si "Centralizado" → Q-602 |
| | Si "Portátil" → No considerar en certificado (no es fijo) → I1 = "No existe" |
| | Si "No tengo" → I1 = "No existe" → Q-700 (pasar a ACS) |
| | Si "Bomba de calor (mismo equipo)" → Si ya se registró en Q-502, confirmar que también se usa para refrigeración → I1 = "Bomba de calor" |

### NODO: Q-601 — Splits de aire acondicionado: datos técnicos

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Puede leer la placa de características de la unidad exterior del aire acondicionado (marca, modelo, capacidad frigorífica, EER/SEER)?" |
| **Tipo** | Opción múltiple + foto |
| **Variable CE3X** | I2 (Potencia), I3 (Eficiencia), I4 (Refrigerante) |
| **Evidencia requerida** | I-005 (placa exterior), I-006 (etiqueta energética) |
| **Dependencias** | Q-600 |
| **Confianza base** | 95% si I-005 es legible |
| **Ramas** | |
| | → Obtener capacidad (I2), EER/SEER (I3). Si la unidad también da calefacción, obtener COP/SCOP. |

### NODO: Q-602 — Refrigeración centralizada

| Campo | Valor |
|-------|-------|
| **Pregunta** | "El sistema es centralizado. ¿Tiene acceso a la máquina exterior (condensadora) o a la placa de características?" |
| **Tipo** | Binaria |
| **Variable CE3X** | I1, I2, I3 |
| **Evidencia requerida** | I-002, I-004, I-005 |
| **Dependencias** | Q-600 |
| **Confianza base** | 70% si no se accede a la máquina |
| **Ramas** | |
| | → Si se accede: obtener datos de la placa. Si no: estimar por tamaño de la vivienda y tipo de sistema (confianza 50%) |

### NODO: Q-603 — Temperatura de consigna de refrigeración

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿A qué temperatura suele poner el aire acondicionado en verano?" |
| **Tipo** | Numérica (°C) |
| **Variable CE3X** | I8 (Temperatura de consigna refrigeración) |
| **Evidencia requerida** | I-003 (termostato o mando) |
| **Dependencias** | Q-600 |
| **Confianza base** | 85% con I-003; 70% declarado |
| **Ramas** | |
| | → Valor por defecto CE3X: 24°C. Si cliente declara 24-26°C, usar valor estándar. Si <23°C, documentar como consumo mayor. |

---

## 9. Nivel 7 — Instalaciones: ACS

### NODO: Q-700 — Sistema de producción de ACS

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Cómo se produce el agua caliente sanitaria (ACS)?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Caldera mixta (la misma de calefacción produce ACS)" / "Calentador de gas (solo ACS, no calefacción)" / "Termo eléctrico (acumulador)" / "Bomba de calor para ACS (aerotermia)" / "Caldera de gasóleo (mixta o solo ACS)" / "Estufa de pellets con ACS (con serpentín)" / "Solar térmica con apoyo (eléctrico o gas)" / "No sé" |
| **Variable CE3X** | J1 (Sistema de ACS) |
| **Evidencia requerida** | J-001 (equipo de ACS) |
| **Dependencias** | Q-500 (pueden compartir equipo) |
| **Confianza base** | 90% con J-001 |
| **Ramas** | |
| | Si "Caldera mixta" → Si ya se documentó en Q-501, vincular datos → Q-701 |
| | Si "Calentador de gas" → Q-701 |
| | Si "Termo eléctrico" → Q-702 |
| | Si "Bomba de calor ACS" → Q-703 |
| | Si "Solar térmica con apoyo" → Q-704, Q-900 (renovables) |
| | Si "No sé" → Solicitar J-001 → Q-705 |
| **Contradicciones con** | Q-500 (si caldera mixta, debe haberse identificado en calefacción), Q-A01 |

### NODO: Q-701 — Datos técnicos del equipo de ACS (gas)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Puede leer la placa de características del calentador/caldera (potencia, caudal, rendimiento, año)?" |
| **Tipo** | Texto + foto |
| **Variable CE3X** | J2 (Potencia), J3 (Rendimiento), J1 (Tipo) |
| **Evidencia requerida** | J-003 (placa de ACS) |
| **Dependencias** | Q-700 |
| **Confianza base** | 99% si la placa es legible |
| **Ramas** | |
| | → Si caldera mixta, el rendimiento ACS (η_acs) suele ser similar al de calefacción. Si calentador instantáneo, η ≈ 75-85% (estándar) o >90% (condensación). |

### NODO: Q-702 — Termo eléctrico: capacidad y eficiencia

| Campo | Valor |
|-------|-------|
| **Pregunta** | "El termo eléctrico, ¿qué capacidad tiene (litros)? ¿Tiene etiqueta energética visible?" |
| **Tipo** | Texto + foto |
| **Variable CE3X** | J1, J2, J3, J5 |
| **Evidencia requerida** | J-001, J-002, J-006 |
| **Dependencias** | Q-700 |
| **Confianza base** | 90% con J-002 y J-006 |
| **Ramas** | |
| | → Capacidad (J5): 50-80L (1-2 pers.), 100-150L (3-4 pers.), >200L (grande). Rendimiento (J3): depende de la clase energética (A → η≈98%; B → η≈95%; C → η≈90%). |

### NODO: Q-703 — Bomba de calor para ACS

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La bomba de calor para ACS, ¿puede leer la placa de características (COP, capacidad, marca)?" |
| **Tipo** | Texto + foto |
| **Variable CE3X** | J1, J2, J3 |
| **Evidencia requerida** | J-001, J-003, J-006 |
| **Dependencias** | Q-700 |
| **Confianza base** | 90% con placa legible |
| **Ramas** | |
| | → COP típico: 2.5-3.5 (mucho más eficiente que resistencia eléctrica) |

### NODO: Q-704 — Apoyo solar térmico para ACS

| Campo | Valor |
|-------|-------|
| **Pregunta** | "El sistema tiene apoyo solar térmico. ¿Ve el depósito de acumulación solar (interacumulador) y el sistema de apoyo (resistencia eléctrica o conexión a caldera)?" |
| **Tipo** | Opción múltiple |
| **Variable CE3X** | J1, M1 |
| **Evidencia requerida** | J-005, M-003 |
| **Dependencias** | Q-700 |
| **Confianza base** | 85% si se ve el depósito |
| **Ramas** | |
| | → Derivar a Q-900 (renovables) para documentar la instalación solar térmica completa |

### NODO: Q-705 — Solicitud de fotos de ACS

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Por favor, tome fotos del equipo de ACS: [J-001] Equipo completo (calentador, termo, caldera); [J-003] Placa de características; [J-002] Depósito de acumulación si tiene." |
| **Tipo** | Acción |
| **Evidencia requerida** | J-001, J-002, J-003 |
| **Dependencias** | Q-700 |
| **Ramas** | |
| | → Volver al nodo correspondiente según el equipo identificado |

---

## 10. Nivel 8 — Instalaciones: Ventilación

### NODO: Q-800 — Tipo de ventilación

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Cómo es la ventilación de la vivienda?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Ventilación natural (abro ventanas)" / "Extractores en baños y campana en cocina (sin VMC)" / "VMC (Ventilación Mecánica Controlada) con recuperador de calor" / "VMC sin recuperador (solo extracción mecánica)" / "Rejillas de admisión en ventanas + extractores" / "No lo sé" |
| **Variable CE3X** | K1 (Tipo de ventilación) |
| **Evidencia requerida** | K-001 (rejillas), K-002 (extractores), K-003 (unidad VMC), K-004 (rejillas admisión) |
| **Dependencias** | Q-005, Q-000 |
| **Confianza base** | 85% con evidencia fotográfica; 60% solo declaración |
| **Ramas** | |
| | Si "Natural" → K1 = "Natural" (tasa de renovación por defecto: 0.63 ren/h en CE3X) |
| | Si "Extractores" → K1 = "Natural asistida" (mejora la tasa de renovación) |
| | Si "VMC con recuperador" → K1 = "Mecánica con recuperación" → Q-801 |
| | Si "VMC sin recuperador" → K1 = "Mecánica simple" |
| | Si "Rejillas + extractores" → K1 = "Híbrida (CTE DB-HS)" |
| | Si "No lo sé" → Solicitar fotos → Q-802 |

### NODO: Q-801 — VMC con recuperador de calor

| Campo | Valor |
|-------|-------|
| **Pregunta** | "La unidad de VMC, ¿puede leer la marca, modelo y la eficiencia del recuperador (suele venir en la etiqueta como 'eficiencia de recuperación ≥ XX%')?" |
| **Tipo** | Texto + foto |
| **Variable CE3X** | K1, K4 (Eficiencia del recuperador) |
| **Evidencia requerida** | K-003 |
| **Dependencias** | Q-800 |
| **Confianza base** | 85% con K-003 |
| **Ramas** | |
| | → Eficiencia típica: 60-85%. Si no se encuentra el dato, usar 70% como valor por defecto (confianza 50%) |

### NODO: Q-802 — Solicitud de fotos de ventilación

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Por favor, tome fotos de: [K-001] Rejillas en ventanas; [K-002] Campana extractora y extractor de baño; [K-003] Unidad de VMC si existe." |
| **Tipo** | Acción |
| **Evidencia requerida** | K-001, K-002, K-003 |
| **Dependencias** | Q-800 |
| **Ramas** | |
| | → Volver a Q-800 con la evidencia |

---

## 11. Nivel 9 — Energías renovables

### NODO: Q-900 — Presencia de energías renovables

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿La vivienda tiene algún sistema de energía renovable instalado?" |
| **Tipo** | Opción múltiple |
| **Opciones** | "Paneles solares fotovoltaicos (para electricidad)" / "Paneles solares térmicos (para ACS)" / "Ambos (FV + térmica)" / "Aerotermia (bomba de calor para calefacción/ACS)" / "Biomasa (caldera o estufa de pellets)" / "Geotermia" / "Ninguna renovable" / "No lo sé" |
| **Variable CE3X** | M1 (Solar térmica), M2 (Fotovoltaica), M5 (Aerotermia), M6 (Biomasa), M7 (Geotermia) |
| **Evidencia requerida** | M-001 (paneles en cubierta), M-002 (satélite), M-003 (depósito solar), M-004 (inversor FV) |
| **Dependencias** | Q-000, Q-005 |
| **Confianza base** | 85% si se ven desde la calle (M-001); 95% si se accede al equipo |
| **Ramas** | |
| | Si "Fotovoltaica" → Q-901 |
| | Si "Térmica" → Q-902 (y vincular con Q-704 si es para ACS) |
| | Si "Ambos" → Q-901 + Q-902 |
| | Si "Aerotermia" → Verificar que la bomba de calor ya está documentada en Q-502 o Q-703 |
| | Si "Biomasa" → Verificar que ya está documentada en Q-503 |
| | Si "Geotermia" → Q-903 |
| | Si "Ninguna" → M1-M7 = "No existe" |
| | Si "No lo sé" → Solicitar M-001 (foto desde la calle) y M-002 (Google Maps satélite) → Q-904 |
| **Contradicciones con** | Q-000 (si edificio pre-2007, las renovables solo pueden ser añadidas posteriormente), Q-A01 |

### NODO: Q-901 — Instalación fotovoltaica

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Tiene placas fotovoltaicas. ¿Cuántos paneles tiene? ¿Sabe la potencia (kWp)? ¿Ve el inversor?" |
| **Tipo** | Texto + foto |
| **Variable CE3X** | M2 (Fotovoltaica) |
| **Evidencia requerida** | M-001, M-004 (inversor), M-005 (contador de generación) |
| **Dependencias** | Q-900 |
| **Confianza base** | 95% si se ve inversor y contador |
| **Ramas** | |
| | → Obtener número de paneles × potencia unitaria (típica 400-500 Wp/panel). Potencia total (kWp). Energía anual estimada: en España, 1 kWp genera ~1.200-1.500 kWh/año. Si se ve el inversor (M-004), confirmar potencia nominal. |

### NODO: Q-902 — Instalación solar térmica

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Tiene placas solares térmicas para ACS. ¿Cuántos captadores tiene? ¿Ve el depósito de acumulación solar (interacumulador)?" |
| **Tipo** | Texto + foto |
| **Variable CE3X** | M1 (Solar térmica) |
| **Evidencia requerida** | M-001, M-003 (depósito), J-005 |
| **Dependencias** | Q-900 |
| **Confianza base** | 85% si se ven los captadores; 95% si se ve el depósito |
| **Ramas** | |
| | → Contar captadores. Cada captador plano típico: ~2m². Superficie total (m²). Tipo: plano o tubos de vacío. Orientación e inclinación (óptima: sur, 30-45°). |

### NODO: Q-903 — Geotermia

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Tiene geotermia. ¿Sabe la potencia de la bomba de calor geotérmica y el tipo de captación (horizontal, vertical, agua subterránea)?" |
| **Tipo** | Texto |
| **Variable CE3X** | M7 (Geotermia) |
| **Evidencia requerida** | H-001 (bomba de calor geotérmica) |
| **Dependencias** | Q-900 |
| **Confianza base** | 80% con placa de características |

### NODO: Q-904 — Solicitud de fotos de renovables

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Por favor, tome fotos de: [M-001] Paneles en la cubierta (desde la calle); [M-002] Captura de Google Maps satélite de su edificio; [M-004] Inversor fotovoltaico (si tiene FV); [J-005/M-003] Depósito de acumulación solar (si tiene térmica)." |
| **Tipo** | Acción |
| **Evidencia requerida** | M-001, M-002, M-004, M-003 |
| **Dependencias** | Q-900 |
| **Ramas** | |
| | → Volver a Q-901 o Q-902 según el tipo identificado |

---

## 12. Nivel 10 — Documentación complementaria

### NODO: Q-A01 — Certificado energético original (D-001)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Tiene el certificado energético original en PDF? Por favor, comparta el documento completo (no solo la primera página)." |
| **Tipo** | Acción (envío de PDF) |
| **Variable CE3X** | O1-O10 (Certificado original auditado) |
| **Evidencia requerida** | D-001 |
| **Dependencias** | Q-000 |
| **Confianza base** | 100% si el PDF es completo y legible |
| **Ramas** | |
| | Si se recibe → Extraer todos los datos de entrada del certificado original. Comparar variable por variable con las respuestas del árbol. Para cada variable, si la diferencia es significativa, activar la matriz de contradicciones (Q-Bxx). |
| | Si no se recibe → Continuar sin certificado original (confianza reducida en todas las variables, -20%) |

### NODO: Q-A02 — Facturas de suministro (D-002)

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Puede compartir las facturas de gas y/o electricidad de los últimos 12 meses? (Puede tapar datos personales. Necesito ver consumos y fechas.)" |
| **Tipo** | Acción (envío de facturas) |
| **Variable CE3X** | H15 (Consumo calefacción), J4 (Consumo ACS), I12 (Consumo refrigeración) |
| **Evidencia requerida** | D-002 |
| **Dependencias** | Q-511 |
| **Confianza base** | 98% si se reciben 12 meses completos |
| **Ramas** | |
| | Si se reciben → Desglosar consumos por uso (calefacción, ACS, refrigeración, otros). Comparar con estimación CE3X. Si diferencia >20%, revisar datos de entrada. |
| | Si no se reciben → Usar valores por defecto (confianza 40%) |

### NODO: Q-A03 — Documentación de rehabilitaciones

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Si se ha realizado alguna rehabilitación, ¿tiene facturas, proyectos, o certificados de la misma? (Especialmente si se ha instalado SATE, cambiado ventanas, o mejorado el aislamiento.)" |
| **Tipo** | Acción (envío de documentos) |
| **Variable CE3X** | C1-C12, D1-D6, F1-F18 (según la rehabilitación) |
| **Evidencia requerida** | Según corresponda |
| **Dependencias** | Q-001, Q-002, Q-003 |
| **Confianza base** | 95% si se aporta documentación técnica |
| **Ramas** | |
| | → Si hay documentación, actualizar las variables afectadas con alta confianza. |

### NODO: Q-A04 — Recibo del IBI

| Campo | Valor |
|-------|-------|
| **Pregunta** | "¿Puede compartir el recibo del IBI (donde se vea la referencia catastral y la superficie construida)?" |
| **Tipo** | Acción (foto o PDF) |
| **Variable CE3X** | A3 (Superficie), A4 (Referencia catastral) |
| **Evidencia requerida** | IBI |
| **Dependencias** | Q-000 |
| **Confianza base** | 98% si el IBI es legible |
| **Ramas** | |
| | → Confirmar superficie y referencia catastral. Comparar con certificado original (Q-A01). |

---

## 13. Nivel 11 — Matriz de contradicciones

### NODO: Q-B00 — Activación de la matriz de contradicciones

| Campo | Valor |
|-------|-------|
| **Pregunta** | "Se han detectado contradicciones entre las respuestas. Resolviendo... (Este nodo se ejecuta automáticamente cuando dos o más nodos producen valores incompatibles para la misma variable CE3X.)" |
| **Tipo** | Automático (no pregunta al usuario) |
| **Dependencias** | Todos los nodos anteriores |
| **Ramas** | |
| | → Ir a la submatriz correspondiente según la variable afectada |

### NODO: Q-B01 — Contradicción: año de construcción vs. tipo de fachada

| Conflicto | Resolución |
|-----------|------------|
| **Q-000 dice: año < 1981** | Si hay SATE (Q-103) → debe ser rehabilitación. Preguntar: "¿Se rehabilitó la fachada con SATE después de la construcción original?" → Si sí, documentar año de rehabilitación y fachada con SATE. Si no, contradicción no resuelta → **Revisión manual**. |
| **Q-100 dice: fachada con SATE** | |
| **Q-000 dice: año < 2006** | Las ventanas originales serían de madera o aluminio. Si el cliente dice PVC (Q-200), confirmar que las ventanas fueron sustituidas. Preguntar año de sustitución. |
| **Q-200 dice: ventanas de PVC** | |

### NODO: Q-B02 — Contradicción: certificado original vs. observación

| Conflicto | Resolución |
|-----------|------------|
| **Q-A01: certificado dice una composición de fachada** | Priorizar la evidencia fotográfica (Q-100, Q-101, Q-102, F-020) sobre el certificado original, **a menos que** el cliente confirme que se realizó una rehabilitación después del certificado. En ese caso, actualizar el certificado. |
| **Q-100: observación dice otra** | |
| **Q-A01: certificado dice ventanas de aluminio** | Priorizar F-036 y F-037. Si el cliente muestra fotos nítidas de PVC, el certificado original tiene un error en F1. |
| **Q-200: observación muestra PVC** | |
| **Q-A01: certificado dice caldera de gas** | Priorizar H-001 y H-003. Si el cliente muestra fotos de una bomba de calor, el certificado original tiene un error o el sistema fue reemplazado. |
| **Q-500: observación muestra bomba de calor** | |

### NODO: Q-B03 — Contradicción: protecciones solares vs. sombra exterior

| Conflicto | Resolución |
|-----------|------------|
| **Q-222: cliente dice tener toldos exteriores** | El factor de sombra total (F6) = factor de protección solar × factor de obstáculo. Si ambos existen, se multiplican. Preguntar: "¿Los toldos se usan habitualmente en verano durante las horas de más sol?" Si no se usan, el factor de protección puede ser 1.0. |
| **Q-223: cliente dice que hay un árbol que da sombra** | |

### NODO: Q-B04 — Contradicción: consumo real vs. estimado CE3X

| Conflicto | Resolución |
|-----------|------------|
| **Q-511: facturas muestran consumo real** | Si la diferencia entre el consumo estimado por CE3X (según datos recogidos) y el consumo real de facturas es: <20% → validación aceptable. 20-50% → revisar variables de entrada (temperatura de consigna, superficies, rendimientos). >50% → **Revisión manual**. |
| **Estimación CE3X (según datos del árbol)** | |

### NODO: Q-B05 — Contradicción: tipo de calefacción vs. tipo de emisores

| Conflicto | Resolución |
|-----------|------------|
| **Q-500: caldera de gas** | Los emisores deben ser de agua (radiadores, fancoils, suelo radiante). Si el cliente dice splits (H-002), hay incompatibilidad. Posible explicación: tiene caldera para calefacción y splits para refrigeración (sistema mixto). Confirmar con el cliente. |

---

## 14. Nivel 12 — Decisión final: confianza y revisión manual

### NODO: Q-C00 — Cálculo de confianza global

| Campo | Valor |
|-------|-------|
| **Pregunta** | (Automático) Calcular la confianza global del análisis PITR™ basándose en todas las variables y las evidencias recogidas. |
| **Tipo** | Automático |

El cálculo de confianza global sigue estas reglas:

1. **Variables esenciales** (obligatorias): C1, C2, F1, F2, F3, F5, H1, H3, J1, J3
   - Cada variable debe tener confianza ≥ 75% para considerar el análisis válido.
   - Si alguna variable esencial tiene confianza < 50% → **Revisión manual obligatoria**.

2. **Variables de alta prioridad**: C11, C12, D1, D2, F4, F6, F7, H2, H4, H5, H6, I1, I2, I3, J2, K1, M1, M2
   - Deben tener confianza ≥ 60% para una auditoría completa.
   - Si >3 variables de alta prioridad tienen confianza < 50% → **Revisión manual recomendada**.

3. **Variables de prioridad media**: D3-D6, E1, E6-E10, F8-F18, G1-G8, I4, I8, J4, J5, K4, K5, L1, M4, M5
   - Su falta de datos no invalida el análisis, pero reduce la confianza global en -5% cada una.

4. **Penalizaciones por documentación faltante:**
   - Sin certificado original (Q-A01): -20% en todas las variables.
   - Sin facturas de consumo (Q-A02): -10% en variables de consumo.
   - Sin fotos de fachada (F-001, F-020): -15% en C1, C2.
   - Sin fotos de ventanas (F-036, F-039): -20% en F1, F2.
   - Sin fotos de caldera (H-001, H-003): -20% en H1, H3.

5. **Fórmula de confianza global:**
```
C_global = (Σ C_i × w_i) / Σ w_i - Σ P_j
```
Donde:
- C_i = confianza de cada variable i
- w_i = peso de la variable (esencial: 3, alta: 2, media: 1)
- P_j = penalización por documentación faltante

### NODO: Q-C01 — Decisión de revisión manual

| Condición | Decisión |
|-----------|----------|
| **C_global ≥ 85%** y ninguna variable esencial < 75% | ✅ **Auditoría remota válida.** No es necesaria revisión manual. |
| **75% ≤ C_global < 85%** | ⚠️ **Auditoría remota aceptable.** Recomendar revisión manual opcional (el cliente puede aceptar el resultado con la confianza actual). |
| **C_global < 75%** o alguna variable esencial < 50% | 🔴 **Revisión manual obligatoria.** Los datos disponibles no permiten una auditoría remota fiable. |
| Se cumple **cualquier** condición del Apéndice B de CF-030 | 🔴 **Revisión manual obligatoria** (independientemente de C_global). |

### NODO: Q-C02 — Recomendaciones de mejora

| Campo | Valor |
|-------|-------|
| **Pregunta** | Basándose en las variables con menor confianza y las deficiencias detectadas, el sistema genera recomendaciones específicas para mejorar el certificado energético. |
| **Tipo** | Generación automática |

**Formato de cada recomendación:**
1. **Variable CE3X afectada:** [Código y nombre]
2. **Valor actual:** [Valor estimado con confianza]
3. **Valor recomendado (si aplica mejora):** [Propuesta de mejora]
4. **Medida concreta:** [Ej. "Instalar aislamiento en fachada de 5cm de EPS"]
5. **Ahorro estimado:** [kWh/año y €/año]
6. **Prioridad:** [Alta / Media / Baja]
7. **Coste orientativo:** [Rango de precios]

---

## 15. Apéndice A — Resumen de preguntas por variable CE3X

| Variable CE3X | Descripción | Nodo(s) del árbol | Evidencia CF-030 |
|---------------|-------------|--------------------|-------------------|
| A1 | Año de construcción | Q-000 | D-001 |
| A2 | Tipo de edificio | Q-005 | F-001 |
| A3 | Superficie | Q-A04 | IBI |
| A4 | Referencia catastral | Q-A04 | IBI |
| B8 | Temperatura de consigna (calefacción) | Q-510 | F-019, H-004 |
| C1 | Tipo de fachada | Q-100, Q-101, Q-102, Q-103, Q-104, Q-108, Q-109 | F-001, F-020 |
| C2 | Transmitancia térmica (fachada) | Q-101, Q-102, Q-103, Q-108, Q-109 | F-020, F-021, F-022 |
| C3-C10 | Capas del muro | Q-101, Q-102, Q-103 | F-021, F-022 |
| C11 | Color de la fachada (absortividad) | Q-110 | F-020 |
| C12 | Estado de conservación | Q-106, Q-107 | F-023, F-024, F-025 |
| D1 | Tipo de cubierta | Q-300 | F-027, F-028 |
| D2 | Composición de la cubierta | Q-301, Q-302, Q-303 | F-028, F-030, F-031 |
| D3-D6 | Estado de la cubierta | Q-304 | F-025, F-029, F-032 |
| E1 | Tipo de suelo | Q-350, Q-351 | F-033, F-035 |
| E2-E10 | Composición del suelo / terreno | Q-350 | F-035 |
| F1 | Tipo de marco de ventana | Q-200, Q-201 | F-036, F-037, F-038 |
| F2 | Tipo de acristalamiento | Q-210, Q-211, Q-212 | F-039, F-040, F-041 |
| F3 | Transmitancia del hueco (U) | Q-211, Q-212 | F-039, F-040, F-042 |
| F4 | Factor solar | Q-220 | F-039 |
| F5 | Dimensiones de huecos | Q-221 | F-044, F-045, F-046 |
| F6 | Factor de sombra | Q-222, Q-223 | F-015, F-016, F-017, F-018, F-047, F-048 |
| F7 | Permeabilidad al aire | Q-225 | F-049 |
| F8 | Tipo de apertura | Q-226 | F-050 |
| F9 | Estado de juntas y burletes | Q-225 | F-049 |
| F12 | Puerta de acceso | Q-227 | F-051 |
| F13-F18 | Huecos por orientación | Q-224 | F-001, F-043 |
| G1-G2 | Puentes térmicos (fachada, forjado) | Q-400, Q-402 | F-053, F-056 |
| G5 | Esquinas de fachada | Q-400 | F-053, F-026 |
| G6 | Cajas de persiana | Q-401 | F-054 |
| G8 | Balcones y terrazas | Q-402 | F-026 |
| H1 | Sistema de calefacción | Q-500 | H-001 |
| H2 | Potencia calefacción | Q-501, Q-502, Q-503 | H-003 |
| H3 | Rendimiento calefacción | Q-501, Q-502, Q-503 | H-003, H-006 |
| H4 | Combustible | Q-500, Q-501, Q-505 | H-001, H-003 |
| H5 | Sistema de distribución | Q-508 | H-002 |
| H6 | Sistema de control | Q-509 | F-019, H-004 |
| H8 | Antigüedad del equipo | Q-501 | H-003 |
| H15 | Consumo de calefacción | Q-511 | H-007, D-002 |
| I1 | Sistema de refrigeración | Q-600 | I-001, I-002 |
| I2 | Potencia refrigeración | Q-601, Q-602 | I-005 |
| I3 | Eficiencia refrigeración | Q-601, Q-602 | I-005, I-006 |
| I4 | Tipo de refrigerante | Q-601 | I-005 |
| I8 | Temperatura de consigna refrigeración | Q-603 | I-003 |
| I12 | Consumo de refrigeración | Q-511 (indirecto) | D-002 |
| J1 | Sistema de ACS | Q-700 | J-001 |
| J2 | Potencia ACS | Q-701, Q-702, Q-703 | J-003 |
| J3 | Rendimiento ACS | Q-701, Q-702, Q-703 | J-003, J-006 |
| J4 | Consumo ACS | Q-511 | D-002 |
| J5 | Depósito de acumulación | Q-702, Q-704 | J-002, J-005 |
| K1 | Tipo de ventilación | Q-800 | K-001, K-002, K-003, K-004 |
| K4 | Eficiencia recuperador VMC | Q-801 | K-003 |
| L1 | Tipo de iluminación (terciario) | (No aplica en residencial) | L-001, L-002 |
| M1 | Solar térmica | Q-902 | M-001, M-003 |
| M2 | Fotovoltaica | Q-901 | M-001, M-004, M-005 |

---

## 16. Apéndice B — Flujo de priorización dinámica

### B.1 Orden óptimo de navegación del árbol

El árbol está diseñado para minimizar el número de preguntas necesarias. El motor PITR™ debe seguir este orden de priorización:

```
1.  [Nivel 0] Contexto (año, tipo de vivienda)
2.  [Nivel 10] Solicitar certificado original (Q-A01) y IBI (Q-A04) — en paralelo
3.  [Nivel 1] Fachada (Q-100 → Q-101/102/103/... → Q-106 → Q-110)
4.  [Nivel 2] Ventanas (Q-200 → Q-210 → Q-220 → Q-221 → Q-222 → Q-223)
5.  [Nivel 3] Cubierta (Q-300 → Q-301/302/303 → Q-304)
6.  [Nivel 3] Suelo (Q-350 → Q-351)
7.  [Nivel 4] Puentes térmicos (Q-400 → Q-401 → Q-402)
8.  [Nivel 5] Calefacción (Q-500 → Q-501/502/... → Q-508 → Q-509 → Q-510)
9.  [Nivel 6] Refrigeración (Q-600 → Q-601/602/603)
10. [Nivel 7] ACS (Q-700 → Q-701/702/703/704)
11. [Nivel 8] Ventilación (Q-800 → Q-801)
12. [Nivel 9] Renovables (Q-900 → Q-901/902)
13. [Nivel 10] Facturas (Q-A02) — puede ejecutarse en paralelo con pasos 3-12
14. [Nivel 11] Resolver contradicciones (Q-B00 → Q-B01/Q-B02/...)
15. [Nivel 12] Decisión final (Q-C00 → Q-C01 → Q-C02)
```

### B.2 Reglas de salto temprano

1. **Si el certificado original (D-001) tiene datos con alta coherencia** y se dispone de fotos que lo confirman (F-001, F-020, F-036, F-039, H-001, H-003), se pueden saltar las preguntas de baja prioridad de los niveles 1-9.

2. **Si la confianza acumulada de un grupo de variables supera el 90%** y no hay contradicciones, se puede saltar a la siguiente sección.

3. **Si el cliente no tiene un tipo de instalación** (ej. no tiene refrigeración), se salta todo el nivel correspondiente.

4. **Si una variable esencial no se puede determinar** incluso después de solicitar fotos adicionales, se activa directamente el nodo de decisión de revisión manual (Q-C01).

### B.3 Prioridad de cada pregunta para el cliente

| Prioridad | Nodos | Tiempo estimado |
|-----------|-------|-----------------|
| **Esencial** (obligatorio) | Q-000, Q-005, Q-100, Q-110, Q-200, Q-210, Q-221, Q-222, Q-300, Q-350, Q-500, Q-508, Q-510, Q-600, Q-700, Q-800, Q-900, Q-A01, Q-A04 | ~30 min fotos + documentos |
| **Alta** (muy recomendable) | Q-101, Q-102, Q-103, Q-106, Q-201, Q-211, Q-220, Q-223, Q-224, Q-225, Q-226, Q-301, Q-302, Q-304, Q-400, Q-401, Q-402, Q-501, Q-502, Q-509, Q-601, Q-701, Q-702, Q-801, Q-901, Q-902 | ~45 min adicionales |
| **Media** (útil) | Q-107, Q-108, Q-109, Q-212, Q-227, Q-303, Q-351, Q-503, Q-504, Q-505, Q-506, Q-602, Q-603, Q-703, Q-704, Q-903, Q-A03 | ~20 min adicionales |
| **Baja** (solo si necesario) | Q-104, Q-107, Q-213, Q-227, Q-352, Q-507, Q-705, Q-802, Q-904, Q-A03 | ~10 min adicionales |

**Tiempo total estimado para el cliente:** 60-90 minutos para completar todas las preguntas y fotos esenciales + alta prioridad.

---

*Fin del documento CF-031-PITR-QUESTION-TREE.md*

*Este documento es propiedad intelectual de Certilab®. La metodología PITR™ es una marca registrada.*