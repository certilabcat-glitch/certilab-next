# Plan de diferenciación: certificado-energetico-incorrecto vs reclamar-certificado-energetico-incorrecto

## Estrategia: Mantener ambas URLs como etapas del funnel

Los dos artículos compiten por queries similares. La solución no es fusionar, sino **repartir el contenido según la etapa del funnel** y enlazar entre sí.

---

## 1. Análisis de solapamiento sección por sección

| Sección | ¿Está en A? | ¿Está en B? | ¿Qué hacer? |
|---------|:-----------:|:-----------:|-------------|
| **¿Cuándo es incorrecto? / causas** | ✅ H2 "¿Cuándo es incorrecto?" | ✅ H2 "¿Por qué ocurren los errores?" | 🔴 **Solapa.** Quitar de B. En B el usuario ya sabe que tiene errores |
| **Error subsanable vs invalidante** | ✅ H3 en A | ❌ No está en B | ✅ Se queda en A |
| **¿Qué errores son reclamables?** | ❌ No está en A | ✅ H3 en B | ✅ Se queda en B (específico de reclamación) |
| **Cómo detectar / señales de alerta** | ✅ H2 + 2 H3 | ❌ No está en B | ✅ Se queda en A (core de detección) |
| **Errores técnicos que invalidan** | ✅ H3 en A | ❌ No está en B | ✅ Se queda en A |
| **Brown Discount / consecuencias económicas** | ✅ H2 + 2 H3 (casos, cifras) | ✅ H2 (tabla) | 🔴 **Solapa.** Quitar de B. En B el usuario ya sabe que hay consecuencias |
| **¿Qué hacer? / 4 pasos genéricos** | ✅ H2 en A | ✅ H2 en B (proceso detallado) | 🔴 **Solapa.** Quitar de A. Los pasos de reclamación pertenecen a B |
| **Documentos para reclamar** | ❌ No está en A | ✅ H2 en B | ✅ Se queda en B (específico) |
| **Comprobaciones previas por tu cuenta** | ❌ No está en A | ✅ H2 en B | 🔴 **Solapa conceptual.** Si en A se explica cómo detectar, esto no aporta. Quitar de B |
| **FAQ** | 8 preguntas (híbridas) | 3 preguntas (reclamación) | 🟡 **Reorganizar.** FAQs genéricas → A. FAQs de reclamación → B |

---

## 2. Distribución final del contenido

### Artículo A: `certificado-energetico-incorrecto`
**Foco: DETECCIÓN**
**Etapa funnel:** Descubrimiento → Evaluación
**CTA principal:** Segunda Opinión 59€

#### Qué se queda (secciones existentes que se mantienen):
- [x] **H2 ¿Cuándo es incorrecto un certificado energético?** → causas
- [x] **H3 Error subsanable vs error invalidante**
- [x] **H2 ¿Cómo detectar un certificado energético incorrecto?** → core del artículo
- [x] **H3 Señales de alerta evidentes**
- [x] **H3 Errores técnicos que invalidan**
- [x] **H2 ¿Cuánto dinero puedes perder?** → impacto económico
- [x] **H3 El Brown Discount**
- [x] **H3 Casos reales con cifras**
- [x] **FAQs** → solo las de detección
- [x] **Conclusión**
- [x] **También te puede interesar**

#### Qué se quita de A (pasa a B):
- [ ] **H2 "¿Qué hacer si crees que tu certificado está mal?"** → los 4 pasos genéricos de reclamación se mueven a B
- [ ] **FAQs sobre reclamación:** plazos, validez legal del informe, anular compraventa → pasan a B

#### Enlaces entrantes desde A:
- Al final de "¿Cuánto dinero puedes perder?" → enlace a B: *"Si ya has detectado errores en tu certificado, descubre cómo reclamar legalmente →"*
- En FAQ sobre reclamación (si queda alguna) → enlace a B

---

### Artículo B: `reclamar-certificado-energetico-incorrecto`
**Foco: RECLAMACIÓN**
**Etapa funnel:** Evaluación → Acción
**CTA principal:** Informe Técnico (cambiar desde Segunda Opinión)

#### Qué se queda (secciones existentes que se mantienen):
- [x] **H2 ¿Se puede reclamar un certificado energético incorrecto?** → gateway
- [x] **H3 ¿Qué errores son reclamables?** → graves vs leves
- [x] **H2 ¿Cómo es el proceso legal de reclamación?** → core (tabla con pasos y plazos)
- [x] **H2 ¿Qué documentos necesitas para reclamar?** → checklist
- [x] **FAQs de reclamación** → prescripción, coste, quién puede reclamar

#### Qué se quita de B (pasa a A o se elimina):
- [ ] **H2 "¿Por qué ocurren los errores?"** → el usuario ya sabe que tiene errores, no necesita causas genéricas
- [ ] **H3 "Certificados sin visita presencial"** → cubierto en A como señal de alerta
- [ ] **H3 "Calificación inflada"** → cubierto en A
- [ ] **H3 "Desconocimiento técnico"** → cubierto en A
- [ ] **H2 "Consecuencias de un certificado incorrecto"** → cubierto en A con más profundidad
- [ ] **H2 "¿Qué puedes hacer por tu cuenta?"** → contradice la necesidad de dictamen técnico. El mensaje de B debe ser: "no lo hagas solo, necesitas un profesional"

#### Qué se añade a B (contenido nuevo necesario):

**Nuevo H2: "Responsabilidades legales del técnico certificador"**
- Responsabilidad civil profesional
- Responsabilidad ante el colegio profesional
- Posibles sanciones administrativas (300€ - 6.000€)
- Plazo de reclamación por responsabilidad profesional (hasta 10 años)

**Nuevo H2: "¿Necesitas un abogado o basta con un informe técnico?"**
- Diferenciar reclamación administrativa (no necesita abogado) vs civil (recomendable)
- Cuándo el informe técnico es suficiente para la reclamación
- Coste orientativo de un abogado especializado

#### Enlaces entrantes desde B:
- En nueva sección de responsabilidades → enlace a A: *"¿Aún no sabes si tu certificado tiene errores? Aprende a detectarlos →"*
- **CTA cambiar de Segunda Opinión 59€ a Informe Técnico** (enlace a /informe-tecnico-energetico/)
- En FAQ si alguien pregunta "¿y si solo quiero saber si está mal?" → enlace a A

---

## 3. Esquema de enlazado interno

```
certificado-energetico-incorrecto (A)
│
│  Foco: detección, señales, errores, Brown Discount
│  CTA: Segunda Opinión 59€
│
├──→ [Enlace contextual en "¿Cuánto dinero puedes perder?"]
│    "Si ya has identificado errores en tu certificado, 
│     aquí te explicamos cómo reclamar paso a paso →"
│    → reclamar-certificado-energetico-incorrecto
│
└──→ [CTA final] → /segunda-opinion/


reclamar-certificado-energetico-incorrecto (B)
│
│  Foco: reclamación, proceso legal, documentos, responsabilidades
│  CTA: Informe Técnico (cambiado desde Segunda Opinión)
│
├──→ [Enlace contextual en introducción o FAQ]
│    "Si todavía no sabes si tu certificado tiene errores, 
│     descubre las señales de alerta →"
│    → certificado-energetico-incorrecto
│
└──→ [CTA principal] → /informe-tecnico-energetico/
```

---

## 4. Resumen de cambios por artículo

### Artículo A: cambios
| Acción | Elemento |
|--------|----------|
| 🗑️ Eliminar | H2 "¿Qué hacer si crees que tu certificado está mal?" |
| 🗑️ Eliminar | FAQs de reclamación (plazos, validez legal del informe, anular compraventa) |
| ➕ Añadir | Enlace contextual a B al final de "¿Cuánto dinero puedes perder?" |
| 🔗 Mantener | CTA → Segunda Opinión 59€ |

### Artículo B: cambios
| Acción | Elemento |
|--------|----------|
| 🗑️ Eliminar | H2 "¿Por qué ocurren los errores en los certificados?" + 3 H3 |
| 🗑️ Eliminar | H2 "Consecuencias de un certificado incorrecto" |
| 🗑️ Eliminar | H2 "¿Qué puedes hacer por tu cuenta antes de reclamar?" |
| ➕ Añadir | H2 "Responsabilidades legales del técnico certificador" |
| ➕ Añadir | H2 "¿Necesitas un abogado o basta con un informe técnico?" |
| ➕ Añadir | Enlace contextual a A en introducción |
| 🔄 Cambiar | CTA principal de Segunda Opinión → Informe Técnico |
| ➕ Añadir | FAQs adicionales sobre proceso legal y plazos (desde A) |

---

## 5. Riesgos detectados

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Eliminar "¿Qué hacer?" de A puede reducir CTAs | Medio | El usuario que busca detectar no está listo para reclamar. La Segunda Opinión es el CTA correcto en esa etapa |
| B se queda más corto (~80 líneas vs 123) | Bajo | Las nuevas secciones (responsabilidades, abogado vs informe) recuperan extensión y aportan profundidad BOFU |
| El usuario llega a B sin pasar por A | Medio | Añadir enlace a A en la introducción de B para que el usuario pueda retroceder si necesita contexto |
| Google puede ver ambos como similares | Medio | Con la reestructuración dejarán de solapar: A cubre keywords de detección, B cubre keywords de reclamación. Las URLs se enlazarán entre sí indicando relación complementaria |

---

## 6. Próximos pasos (para cuando se decida implementar)

1. **Editar** `src/data/articles/certificado-energetico-incorrecto.md`: eliminar sección "¿Qué hacer?" y FAQs de reclamación. Añadir enlace a B
2. **Editar** `src/data/articles/reclamar-certificado-energetico-incorrecto.md`: eliminar secciones TOFU que solapan. Añadir nuevas secciones BOFU. Cambiar CTA. Añadir enlaces a A
3. **Actualizar** `src/data/articles.ts`: cambiar CTA de B de "Segunda Opinión" a "Informe Técnico" si el CTA se gestiona desde ahí
4. **Verificar** ningún componente React referencia a B solo con fines de detección