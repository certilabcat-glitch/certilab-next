# EP-101 — Product-Business Alignment

| Campo | Valor |
|-------|-------|
| **Código** | EP-101 |
| **Título** | Alineación producto-negocio tras Business Blueprint |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-06 |
| **Estado** | 📋 BORRADOR — Pendiente de aprobación |
| **Precedencia** | Debe aprobarse después de BP-100-01/02/03/04. Actualiza PRODUCT-VISION, PRODUCT-POSITIONING, PRODUCT-ROADMAP. |
| **Propósito** | Alinear los documentos de producto (VISION, POSITIONING, ROADMAP) con las decisiones estratégicas del Business Blueprint, sin implementar cambios de código. |

---

## 1. Decisiones del Business Blueprint que afectan al producto

| Decisión | Documento BP | Impacto en producto |
|----------|-------------|---------------------|
| **GTD como segunda línea de negocio** | BP-100-02, EP-102 | La plataforma deja de ser "auditoría técnica" para ser "gestión técnica integral". El roadmap debe reflejar dos líneas de producto. |
| **Empresa 100% remota** | BP-100-03 | No afecta al producto SaaS. Afecta a la operativa interna. |
| **Cobertura nacional** | BP-100-03 | El producto debe soportar diferencias autonómicas (certificados, cédulas, ITE). GTD lo requiere intrínsecamente. |
| **Crecimiento por líneas de negocio** | BP-100-02 | El producto no es monolítico. Es una plataforma de capacidades compartidas + líneas de negocio específicas. |
| **Productos que resuelven problemas del cliente** | BP-100-01 | Refuerza el enfoque actual. No vender documentos, vender soluciones. |
| **Automatización como requisito** | BP-100-03 | El producto debe diseñarse para ser automatizable desde el inicio. |

---

## 2. Actualizaciones necesarias en PRODUCT-VISION.md

### 2.1 Jerarquía del producto

**Actual:** 
```
Empresa: Certilab
Producto SaaS: Certilab Platform
Módulos: Auditoría de Certificados Energéticos (V1), Futuros módulos (V2+)
```

**Propuesta:**
```
Empresa: Certilab (100% remota, cobertura nacional, crecimiento por líneas de negocio)
│
Plataforma: Certilab Platform
│   Core: Cliente, Inmueble, Expediente, Documento IA (congelado)
│
Líneas de negocio (productos):
├── ATI — Auditoría Técnica de Inmuebles
│   └── Módulos: Segunda Opinión PITR™, Dictamen Técnico, Correcciones
│
├── GTD — Gestión Técnica Documental
│   └── Módulos: Informe de Situación, Recopilación Completa, Custodia
│
└── [Futuras líneas: Observatorio, Formación, Consultoría]
```

### 2.2 Visión actualizada

**Actual:** "Certilab es la plataforma de referencia para la auditoría técnica de inmuebles en el mundo hispanohablante, comenzando por la certificación energética como primer módulo."

**Propuesta:** "Certilab es la plataforma de referencia para la gestión técnica integral de inmuebles en el mundo hispanohablante. Nuestra primera línea de negocio, ATI, audita certificados energéticos. Nuestra segunda línea, GTD, gestiona la documentación técnica completa del inmueble. Ambas comparten el mismo Core y la misma promesa: resolver problemas técnico-documentales del propietario sin que tenga que saber de esto."

### 2.3 Sección "¿Qué NO pretende ser?" — Actualización necesaria

La sección actual dice "No es un marketplace de certificadores" y "No es una consultora energética". Con GTD, la plataforma SÍ gestiona documentación. Es necesario añadir una nota aclaratoria:

> **Nota V2:** Con la incorporación de GTD como segunda línea de negocio, Certilab Platform SÍ gestiona documentación técnica (obtención, organización, verificación y custodia). Las exclusiones de V1 se mantienen para ATI. GTD tiene sus propias exclusiones (ver EP-102).

### 2.4 Visión a 5 años — Actualización

La visión a 5 años debe reflejar GTD y el modelo de líneas de negocio. Sin reescribir los hitos existentes de ATI, se añade una columna GTD:

| Año | Hito ATI | Hito GTD |
|-----|----------|----------|
| **2026** | MVP V1 lanzado. Flujo completo. Primeros 100 expedientes. | — |
| **2027** | V2 con IA asistente. 500 expedientes/mes. Observatorio. | V1 GTD lanzado (Informe de Situación). Validación de demanda. |
| **2028** | V3 SaaS multitécnico. 50+ ATs. Expansión LATAM. | V2 GTD (Recopilación Completa). Integraciones principales. |
| **2029** | V4 IA proactiva. 2.000 expedientes/mes. API pública. | GTD operativo. Suscripciones de custodia. |
| **2030-31** | Liderazgo de mercado ATI. | GTD como segunda fuente de ingresos estable. |

---

## 3. Actualizaciones necesarias en PRODUCT-POSITIONING.md

### 3.1 Mercado objetivo — Actualización

Añadir mercado GTD al documento de posicionamiento:

| Mercado | ATI | GTD |
|---------|-----|-----|
| **Primario** | Propietarios con certificado energético y dudas | Propietarios que quieren saber qué documentos tiene su inmueble |
| **Secundario** | ATs, inmobiliarias | Inmobiliarias, administradores de fincas, compradores |
| **Tamaño** | ~3,5M transacciones/año | ~25M viviendas en España (stock total) |

### 3.2 Declaración de posicionamiento — Actualización

**Propuesta de declaración unificada (V2):**

> **Para propietarios de vivienda que necesitan seguridad sobre la situación técnica y documental de su inmueble, Certilab Platform es el servicio integral que audita certificados energéticos y gestiona la documentación técnica completa, con la garantía de profesionales colegiados y metodología auditable, a diferencia de las soluciones parciales que solo certifican, solo informan o solo tramitan.**

### 3.3 Pricing — Actualización con GTD

| Servicio | Línea | Precio | Margen estimado |
|----------|-------|--------|-----------------|
| Segunda Opinión PITR™ | ATI | 99 € | 30-40 € |
| Informe de Situación Documental | GTD | 29-49 € | 15-30 € |
| Recopilación Documental Completa | GTD | 99-199 € | 40-80 € |
| Custodia Documental | GTD | 5-15 €/mes | 4-12 €/mes |

---

## 4. Actualizaciones necesarias en PRODUCT-ROADMAP.md

### 4.1 Roadmap integrado ATI + GTD

| Mes | ATI | GTD | Plataforma |
|-----|-----|-----|------------|
| **M1** | — | — | Business Blueprint aprobado |
| **M2-M3** | Estabilización MVP. Correcciones post-lanzamiento. | EP-102A: Informe de Situación V1 (validación) | Extensión Documento IA (ADR-004) |
| **M4-M6** | V2 IA asistente. Dashboard AT. | Validación de demanda GTD. | — |
| **M7-M9** | Crecimiento. Primer AT externo. | EP-102B: Recopilación Completa | Integraciones con organismos |
| **M10-M12** | 200 expedientes/mes. Observatorio. | Custodia documental (beta) | API de plataforma |
| **2027** | V3. Expansión LATAM. | GTD operativo. Suscripciones. | Escalado. |

### 4.2 Principio de priorización

> Cuando una épica de ATI y una de GTD compitan por recursos, se priorizará aquella que:
> 1. Desbloquee más valor para el cliente (medido en NPS o demanda validada)
> 2. Tenga menor tiempo de implementación
> 3. Genere ingresos más rápido
> 
> En caso de empate, se priorizará ATI por ser la línea fundacional y la que tiene el flujo más maduro.

---

## 5. Documentos que NO se actualizan (por ahora)

| Documento | Motivo |
|-----------|--------|
| **PRODUCT-PERSONAS.md** | Las personas de ATI no cambian. GTD tendrá sus propias personas cuando se implemente. |
| **PRODUCT-COMPETITORS.md** | El análisis de competidores de ATI sigue siendo válido. GTD tendrá su propio análisis cuando se lance. |
| **CF-040 (Business Policies)** | Ya aprobado y congelado. Cualquier cambio requeriría ADR. |
| **ROADMAP-V1.md** | El roadmap V1 actual finaliza con el MVP. El nuevo roadmap se definirá en el informe de cierre de esta fase. |

**Nota:** Los documentos de producto no se modifican en este momento. EP-101 es un análisis de alineación. Las modificaciones reales se realizarán cuando se apruebe esta EP y se inicien las épicas correspondientes.

---

## 6. Riesgos de alineación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| **GTD canibaliza recursos de ATI** | Media | Alto | Priorización clara. ATI es la línea fundacional. GTD no compite por los mismos ATs. |
| **El posicionamiento unificado diluye la propuesta de valor** | Media | Medio | Mantener comunicaciones separadas por línea de negocio. La plataforma es el nexo, no el mensaje. |
| **Confusión del cliente: "¿Certilab hace qué?"** | Alta | Medio | Lanzamiento escalonado. GTD se comunica como "nuevo servicio" cuando esté listo, no antes. |
| **La extensión de Documento IA para GTD rompe algo en ATI** | Baja | Alto | ADR-004 con análisis de impacto. Tests de regresión. |

---

## Apéndice A: Mapa de documentos afectados vs. no afectados

| Documento | ¿Requiere cambio? | ¿Cuándo? | Responsable |
|-----------|-------------------|----------|-------------|
| PRODUCT-VISION.md | ✅ Sí (visión, jerarquía, 5-year plan) | Al aprobar Business Blueprint | Product |
| PRODUCT-POSITIONING.md | ✅ Sí (mercado, declaración, pricing) | Al aprobar Business Blueprint | Product |
| PRODUCT-ROADMAP.md | ✅ Sí (nuevo roadmap integrado) | Al aprobar Business Blueprint | Product |
| PRODUCT-PERSONAS.md | ❌ No (nuevas personas en épica GTD) | EP-102A | Product |
| PRODUCT-COMPETITORS.md | ❌ No (análisis separado para GTD) | EP-102A | Product |
| CF-040 (Business Policies) | ❌ No (congelado por CF-001A) | — | — |
| ROADMAP-V1.md | ❌ No (finaliza con MVP) | — | — |

---

*Fin del documento EP-101-PRODUCT-BUSINESS-ALIGNMENT.md v1.0*