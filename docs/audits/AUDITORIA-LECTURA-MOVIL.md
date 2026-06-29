# Auditoría de Lectura Móvil — Certilab

**Fecha:** 27 de junio de 2026  
**Alcance:** Todos los artículos del blog (21), páginas de servicio (4), landing (1), componentes UI (10), FAQs (30 preguntas)  
**Referencia:** Pantalla 375px de ancho (móvil estándar)  
**Metodología:** Solo contenido y estructura. No se revisó CSS ni media queries.

---

## Resumen Ejecutivo

Se detectaron **87 problemas** que degradan la experiencia de lectura en móvil. De ellos, **15 son críticos** (tablas con datos económicos que pierden todo sentido al hacer scroll horizontal), **32 altos** (listas ilegibles, CTAs repetitivas, FAQs sin jerarquía) y **40 medios** (párrafos-documento, headings consecutivos, falta de negritas en datos clave).

El problema estructural número uno son las **tablas markdown**. Hay 18 tablas en artículos y 1 en componente que, en una pantalla de 375px, fuerzan scroll horizontal o rompen la relación visual entre columnas. En tablas con datos económicos, esto significa que el usuario **pierde el contexto** y no puede comparar cifras.

---

## 1. Tablas — Prioridad Crítica

### 1.1 Tablas en artículos del blog (18 detectadas)

#### 🔴 coste-oportunidad — `perder-dinero-certificado-energetico-mal-hecho`

**Antes:** Tabla de 4 columnas × 4 filas con relación coste-beneficio económico:
```
| Valor vivienda | Riesgo mínimo | Riesgo máximo | Coste verificación | Ratio beneficio |
| 150.000€ | 7.500€ | 22.500€ | 59€ | 1:127 a 1:381 |
| 270.000€ | 13.500€ | 40.500€ | 59€ | 1:229 a 1:686 |
| 400.000€ | 20.000€ | 60.000€ | 59€ | 1:339 a 1:1.016 |
```
En 375px: ilegible. El usuario no puede ver las 5 columnas simultáneamente. La columna "Ratio beneficio" (la más importante) desaparece del viewport.

**Después:** Fichas visuales por rango de precio:
```
🏠 Vivienda de 150.000€
   Riesgo: 7.500€ – 22.500€
   Inversión en verificación: 59€
   Retorno: por cada 1€ inviertes, ahorras entre 127€ y 381€

🏠 Vivienda de 270.000€
   Riesgo: 13.500€ – 40.500€
   Inversión en verificación: 59€
   Retorno: por cada 1€ inviertes, ahorras entre 229€ y 686€

🏠 Vivienda de 400.000€
   Riesgo: 20.000€ – 60.000€
   Inversión en verificación: 59€
   Retorno: por cada 1€ inviertes, ahorras entre 339€ y 1.016€
```

**Beneficio UX:** Cada ficha se lee completa sin scroll horizontal. El dato de "retorno por euro invertido" queda visualmente destacado.

**Impacto en comprensión:** El usuario entiende inmediatamente que 59€ eliminan un riesgo de miles de euros. En formato tabla, esa relación se pierde al no poder ver todas las columnas a la vez.

---

#### 🔴 Tabla hipoteca verde — `certificado-energetico-hipoteca-verde`

**Antes:** 3 tablas en el mismo artículo:
1. Comparativa hipoteca tradicional vs verde (4 columnas × 5 filas)
2. Calificación vs acceso a hipoteca verde (3 columnas × 5 filas)
3. Ahorro real (5 columnas × 6 filas)

Tres tablas consecutivas con datos económicos diferentes. En móvil: desorientación total. El usuario no sabe qué tabla está viendo ni qué dato es relevante para su caso.

**Después:** Convertir en:
- **Acordeón "¿Cuánto ahorras según tu caso?"** — El usuario selecciona su precio de vivienda y ve el ahorro estimado. Una sola ficha, no 6 filas.
- **Fichas comparativas** para hipoteca tradicional vs verde — Dos tarjetas lado a lado con bullets, no tabla.
- **Bloque de datos** para calificación vs acceso — Lista con icono ✅/❌, no tabla.

**Beneficio UX:** El usuario interactúa con un solo dato relevante (su caso), no con una matriz de 30 celdas.

**Impacto en comprensión:** Pasa de "tabla compleja que abandono" a "dato personalizado que entiendo en 3 segundos".

---

#### 🔴 Tabla resumen errores — `errores-graves-certificado-energetico`

**Antes:** Tabla de 4 columnas × 8 filas:
```
| # | Error | Señal de alerta | Coste económico |
| 1 | Sin visita presencial | Falta fecha de visita | Multas 300-6.000€ + nulo |
| ...7 filas más...
```

**Después:** 7 fichas de error, cada una con:
- Número y nombre del error (H3)
- Icono de señal de alerta
- Dato económico destacado en negrita
- Una frase de acción ("¿Cómo detectarlo?")

Las fichas se apilan verticalmente. Cada una es autocontenida. El usuario hace scroll y lee una ficha completa sin perder contexto.

**Beneficio UX:** El usuario puede saltar directamente al error que le interesa (ej: "error 4: reformas no registradas") sin tener que descifrar una tabla.

**Impacto en comprensión:** Cada error se entiende como un caso independiente, no como una celda perdida en una matriz.

---

#### 🔴 Tablas de comparativa orientativa — múltiples artículos

Artículos afectados: `certificado-energetico-inflado-que-hacer`, `certificado-energetico-vendedor-fiable`, `como-saber-si-certificado-energetico-esta-mal`, `certificado-energetico-f-g-correcto-o-error`, `certificado-energetico-negociar-precio`

**Patrón detectado:** Tablas de 2-4 columnas con datos orientativos (tipo vivienda vs calificación esperada, consumo vs calificación, etc.). En total, 8 tablas de este tipo.

**Propuesta unificada:** Convertir todas en **bloques de datos** con este formato:
```
📊 Piso 1960-1980 sin reformas
   Calificación típica: G o F
   ⚠️ Si tu certificado dice C o B → probablemente inflado

📊 Piso 1980-2000 con caldera antigua
   Calificación típica: F o E
   ⚠️ Si tu certificado dice B → revisa los datos
```

**Beneficio UX:** Formato escaneable. El usuario identifica su tipo de vivienda en 1 segundo.

**Impacto en comprensión:** La relación "tipo de vivienda → calificación esperada" se hace explícita y visual, no requiere comparar columnas.

---

#### 🔴 Tablas de precios — `como-saber-si-certificado-energetico-esta-mal`

**Antes:** Formato pseudo-tabla con texto corrido:
```
**Piso menor de 70m²:** Precio con visita 80-120€ | Precio sin visita (ilegal) 30-50€
**Piso 70-100m²:** Precio con visita 90-180€ | Precio sin visita (ilegal) 35-60€
**Casa unifamiliar:** Precio con visita 180-350€ | Precio sin visita (ilegal) 50-80€
```
En móvil: cada línea es un muro de texto. El separador `|` no crea columnas visuales, solo añade ruido.

**Después:** Fichas con dos columnas visuales (con visita ✅ / sin visita ❌):
```
🏢 Piso < 70m²
   ✅ Con visita: 80€ – 120€
   ❌ Sin visita (ilegal): 30€ – 50€

🏢 Piso 70–100m²
   ✅ Con visita: 90€ – 180€
   ❌ Sin visita (ilegal): 35€ – 60€
```

**Beneficio UX:** Escaneo vertical rápido. Los iconos ✅/❌ crean anclaje visual inmediato.

**Impacto en comprensión:** El contraste "legal vs ilegal" se convierte en el elemento visual dominante, no en un dato escondido tras un `|`.

---

#### 🔴 Tablas en artículos externos (MD sueltos)

Archivos: `src/data/articles/certificado-energetico-inflado.md`, `src/data/articles/certificado-energetico-f-g-correcto.md`

**Hallazgo:** Ambos contienen tablas markdown con 3-4 columnas y 4-8 filas. Mismo problema que las tablas en `articles.ts`.

**Propuesta:** Aplicar las mismas transformaciones (fichas para datos económicos, bloques de datos para comparativas, acordeones para tablas de referencia).

---

### 1.2 Tabla en componente UI

#### 🔴 ServicesComparison.tsx — Tabla comparativa de servicios

**Antes:** Tabla HTML de 4 columnas × 6 filas comparando Segunda Opinión (59€), Express (79€) e Informe Técnico (399€). Las celdas contienen frases de 50-70 caracteres. En 375px cada columna tendría ~70px → texto ilegible con saltos constantes.

**Después:** Tres tarjetas verticales, una por servicio:
```
┌─────────────────────────┐
│ SEGUNDA OPINIÓN — 59€   │
│ Para compradores y      │
│ vendedores que dudan    │
│ del certificado         │
│ ⏱ 24-48h               │
│ 📋 Análisis del certificado existente │
│ [Contratar →]           │
└─────────────────────────┘
```
Repetir para Express e Informe Técnico.

En desktop: restaurar la tabla. La comparación lado a lado es superior en pantallas grandes. La clave es que en móvil cada servicio se lea como una ficha completa, no como una celda mutilada.

**Beneficio UX:** El usuario hace scroll vertical (natural en móvil) en lugar de horizontal (antinatural).

**Impacto en comprensión:** Cada servicio se presenta con su propuesta de valor completa. En formato tabla, el usuario solo ve fragmentos.

---

## 2. FAQs — 30 preguntas sin jerarquía

### 2.1 FAQSection.tsx — renderizado plano

**Antes:** Las 30 preguntas se renderizan como una lista `<ul>` plana de acordeones `<details>/<summary>`. Sin categorías visibles, sin buscador, sin numeración. El usuario en móvil ve una pared de 30 preguntas. No sabe por dónde empezar.

**Datos:**
- 8 preguntas de Home
- 12 preguntas de Segunda Opinión
- 8 preguntas de Informe Técnico
- 2 preguntas de Check-Up Inmobiliario

**Después:**
1. **Agrupar por categoría** con H3 visibles: "Sobre el certificado energético", "Sobre la Segunda Opinión", "Sobre el Informe Técnico"
2. **Añadir buscador** en la parte superior (input text que filtra por pregunta)
3. **Limitar a 5-6 preguntas visibles por categoría** con "Ver más" si hay más
4. **Numerar preguntas** dentro de cada categoría ("1 de 8", "2 de 8"...)

**Beneficio UX:** El usuario escanea 4 categorías (4 H3) en lugar de 30 preguntas. Encuentra su duda en segundos.

**Impacto en comprensión:** La categorización da contexto. El usuario sabe que las preguntas de "Segunda Opinión" son sobre el servicio, no sobre el certificado en general.

---

### 2.2 Respuestas largas sin estructura interna

**Antes:** Varias respuestas FAQ superan las 150 palabras en un solo párrafo. En móvil, eso son 15-20 líneas de texto continuo. El usuario pierde el hilo.

**Ejemplo:** FAQ "¿Es mejor pagar 59€ por una segunda opinión que arriesgarme a perder miles de euros?" — Respuesta de 90 palabras en un solo bloque.

**Después:** Estructurar cada respuesta con:
- **Frase resumen en negrita** (1 línea)
- **Bullet points** si hay 3+ datos
- **Dato económico destacado** al final

**Beneficio UX:** El usuario puede leer solo la primera línea y decidir si necesita el detalle.

**Impacto en comprensión:** La información jerarquizada se retiene mejor que el texto corrido.

---

## 3. CTAs — Repetición y falta de contexto

### 3.1 CTAs repetitivas en artículos

**Antes:** Varios artículos contienen 3 CTAs que apuntan al mismo destino (`/segunda-opinion/`) con redacciones casi idénticas. Ejemplo en `errores-graves-certificado-energetico`:
- CTA 1 (tras sección 7 errores): "Por 59€ te confirmamos si está bien hecho o no"  
- CTA 2 (tras FAQ): sin cambios sustanciales respecto a CTA 1  
- CTA 3 (al final): repite el mismo mensaje

En móvil, 3 bloques CTA en un artículo de 9 minutos de lectura saturan. El usuario desarrolla "banner blindness".

**Después:**
- **1 CTA principal** al final del artículo con la oferta completa
- **1 CTA contextual suave** a mitad del artículo, sin botón, solo enlace de texto: "¿Quieres verificarlo? →"
- Eliminar el tercer CTA redundante

**Beneficio UX:** Menos ruido visual. El usuario no siente que le están "persiguiendo" con la misma oferta.

**Impacto en comprensión:** El CTA gana peso al aparecer menos. Cuando aparece, el usuario le presta atención.

---

### 3.2 StickyCTA en móvil

**Antes:** `StickyCTA.tsx` muestra una barra fija en la parte inferior en móvil. Compite visualmente con:
- CTAs inline en el contenido
- El formulario de contacto
- El menú de navegación

En 375px, la barra ocupa ~60px. Sumado a la barra de navegación (~50px) y al teclado si hay formulario, el viewport útil se reduce a ~265px.

**Después:** 
- Mostrar StickyCTA solo cuando el usuario ha hecho scroll más allá del 60% del contenido
- Ocultarlo cuando hay un formulario visible (para no competir con el teclado)
- En páginas de servicio, mostrar solo 1 CTA sticky (no 2)

**Beneficio UX:** La barra no compite con el contenido durante la lectura. Aparece solo cuando el usuario está cerca de decidir.

**Impacto en comprensión:** El CTA sticky pasa de "molestia" a "recordatorio útil en el momento adecuado".

---

### 3.3 CTAs inline dentro de párrafos

**Antes:** Varios artículos tienen CTAs camuflados como frases dentro de párrafos:
> "Por 59€ sabes si tu certificado te está costando dinero. Informe técnico firmado en 24-48h."

Esto rompe el ritmo de lectura. El usuario está leyendo contenido informativo y de repente aparece una oferta comercial sin separación visual.

**Después:** Separar siempre los CTAs con `---` (línea horizontal) y darles un bloque propio con fondo diferenciado:
```
---

**Por 59€ sabes si tu certificado te está costando dinero.**
Informe técnico firmado por arquitecta colegiada en 24-48h.
[Solicitar Segunda Opinión →](/segunda-opinion/)
```

**Beneficio UX:** El usuario identifica visualmente que es un bloque comercial, no contenido editorial. Puede saltarlo sin perder el hilo.

**Impacto en comprensión:** El contenido editorial y el comercial no se mezclan. El usuario confía más en el contenido cuando sabe qué es información y qué es oferta.

---

## 4. Listas — Exceso de items y pérdida de escaneabilidad

### 4.1 Listas con más de 6 items

**Ubicaciones detectadas:**
- `CheckUpInmobiliarioClient.tsx` — Lista de "razones para confiar" con 7 items
- `certificado-energetico-hipoteca-verde` — Lista de bancos con 6 items
- `segunda-opinion-certificado-energetico` — Lista de casos de uso con 7 items
- `errores-graves-certificado-energetico` — Lista de errores (aunque numerada, son 7 items densos)

**Después:** Dividir en dos listas con H3 diferentes, o usar formato de fichas numeradas para más de 6 elementos.

**Beneficio UX:** El usuario procesa mejor 2 listas de 3-4 items que 1 lista de 7+.

**Impacto en comprensión:** Cada subgrupo tiene un contexto claro. El usuario no tiene que mantener 7 conceptos en la memoria de trabajo.

---

### 4.2 Items de lista demasiado largos

**Antes:** Varios items superan las 2 líneas en móvil. Ejemplo:
```
- **Modificar parámetros de aislamiento** → Declarar un aislamiento mejor del real, usando valores de catálogo en lugar de los medidos in situ, lo que falsea la transmitancia térmica de la envolvente
```
En 375px: 4-5 líneas. El formato lista pierde su función de escaneo rápido.

**Después:** Máximo 2 líneas por item. Si necesita más explicación, usar un párrafo aparte con sangría o un `<details>` colapsable.

**Beneficio UX:** La lista recupera su función de "índice visual". El usuario escanea los items en segundos.

**Impacto en comprensión:** Los items cortos se recuerdan. Los items largos se abandonan.

---

## 5. Casos Prácticos y Ejemplos — Formato documento

### 5.1 Casos reales como texto corrido

**Antes:** Los 3 casos reales en `como-saber-si-certificado-energetico-esta-mal` están formateados como párrafos con negritas:
```
### Caso 1: Certificado sin visita
**Situación:** Piso en Barcelona, certificado por 45€, calificación D.
**Señales detectadas:** No aparece fecha de visita, precio bajo, datos genéricos.
**Realidad:** El técnico nunca visitó la vivienda.
**Consecuencia:** Multa de 1.200€ al vendedor + certificado nuevo obligatorio.
```
En móvil: 4 líneas de texto con etiquetas en negrita. Parece un acta notarial, no contenido web.

**Después:** Ficha visual de caso:
```
┌────────────────────────────────┐
│ 📋 CASO 1: Certificado sin visita │
│                                │
│ 🏠 Piso en Barcelona           │
│ 💶 Certificado: 45€            │
│ 📊 Calificación mostrada: D    │
│                                │
│ ⚠️ Señales detectadas:         │
│ • Sin fecha de visita          │
│ • Precio bajo (<60€)           │
│ • Datos genéricos              │
│                                │
│ 🔍 Realidad:                   │
│ El técnico nunca visitó        │
│ la vivienda.                   │
│                                │
│ 💸 Consecuencia:               │
│ Multa de 1.200€ al vendedor    │
│ + certificado nuevo obligatorio│
└────────────────────────────────┘
```

**Beneficio UX:** Formato de "ficha de expediente" que se lee como una tarjeta, no como un párrafo.

**Impacto en comprensión:** Los datos clave (precio, multa, calificación) tienen jerarquía visual. El usuario los capta en 2 segundos.

---

### 5.2 Ejemplos de cálculo sin formato

**Antes:** En `perder-dinero-certificado-energetico-mal-hecho`:
```
Una vivienda de 270.000€ con certificado D (pero que realmente es F):
- El vendedor pide 270.000€ basándose en una calificación D
- El comprador, si no verifica, paga 270.000€
- La realidad es que la vivienda vale 243.000€ (con el Brown Discount del 10% por ser F)
- El comprador ha perdido **27.000€** por no verificar
```
Lista de 4 items con el cálculo económico diluido en texto.

**Después:** Bloque de cálculo visual:
```
🏠 Vivienda: 270.000€

❌ Con certificado D (inflado):
   Precio de venta: 270.000€

✅ Con certificado F (real):
   Precio real (Brown Discount 10%): 243.000€

💸 Diferencia perdida por el comprador: 27.000€
```

**Beneficio UX:** El cálculo se presenta como una resta visual (270.000€ → 243.000€ → 27.000€), no como 4 frases.

**Impacto en comprensión:** El usuario ve la operación matemática, no tiene que reconstruirla mentalmente.

---

## 6. Párrafos-Documento y Ritmo de Lectura

### 6.1 Párrafos de más de 5 líneas

**Ubicaciones:** Detectados en FAQs (respuestas largas), en introducciones de artículos y en secciones de "¿Qué es...?".

**Ejemplo:** FAQSection respuestas con 80-120 palabras en un solo `<p>`.

**Después:** Aplicar regla de 3 líneas máximo por párrafo. Si un concepto necesita más espacio, dividirlo en 2-3 párrafos con conectores.

**Beneficio UX:** En móvil, un párrafo de 3 líneas se lee sin scroll. Uno de 6 líneas obliga a hacer scroll y perder la referencia visual.

**Impacto en comprensión:** Párrafos cortos = mayor retención. El cerebro procesa mejor 3 ideas en 3 párrafos que 3 ideas en 1 párrafo.

---

### 6.2 Secciones sin heading durante más de 300 palabras

**Antes:** Algunos artículos tienen bloques de 300-400 palabras entre headings. En móvil, eso son 40-50 líneas de scroll sin un punto de anclaje visual.

**Después:** Insertar un H3 cada 150-200 palabras. Usar H3 con verbo de acción: "Cómo detectarlo", "Qué hacer", "Cuánto cuesta".

**Beneficio UX:** Los headings actúan como "marcadores" en el scroll. El usuario puede saltar entre secciones sin perderse.

**Impacto en comprensión:** Cada H3 divide el contenido en unidades digeribles. El usuario sabe qué está leyendo en cada momento.

---

## 7. Jerarquía Visual — Headings y Negritas

### 7.1 Headings consecutivos sin contenido

**Antes:** En varios artículos, H2 seguido inmediatamente de H3:
```
## ¿Qué factores determinan una calificación F o G?
### Factor 1
### Factor 2
```
El H2 anuncia el tema pero no hay texto de transición.

**Después:** Añadir siempre 1-2 líneas de transición entre H2 y H3:
```
## ¿Qué factores determinan una calificación F o G?

Para que una vivienda obtenga F o G, deben darse varias condiciones. Aquí tienes los 7 factores principales.

### Aislamiento inexistente
```

**Beneficio UX:** La transición prepara al lector para lo que viene. Sin ella, el salto H2→H3 es abrupto.

**Impacto en comprensión:** El lector entiende que los H3 son sub-elementos del H2, no secciones independientes.

---

### 7.2 Datos económicos sin negrita

**Antes:** Varios datos económicos críticos aparecen en texto plano:
```
El coste extra total es de aproximadamente 10.500€ en 25 años.
```

**Después:** Destacar siempre el dato económico:
```
El coste extra total es de aproximadamente **10.500€** en 25 años.
```

**Beneficio UX:** El usuario que escanea en diagonal capta el dato económico aunque no lea el párrafo completo.

**Impacto en comprensión:** Las cifras en negrita funcionan como "anclas visuales". El lector recuerda "10.500€" aunque olvide el contexto exacto.

---

## 8. Elementos que Requieren Scroll Horizontal Forzado

### 8.1 Tabla de comparativa de precios FAQ

**Antes:** Tabla en catalán dentro de `segunda-opinion-certificado-energetico`:
```
| Concepte | Preu |
| Anàlisi tècnica del certificat | Inclòs |
| ...5 filas más...
```
Aunque son solo 2 columnas, el texto en catalán ocupa más caracteres y puede forzar scroll en 375px si las celdas no tienen ancho flexible.

**Después:** Lista de características con precio alineado a la derecha:
```
Anàlisi tècnica del certificat ............ Inclòs
Informe tècnic signat ..................... Inclòs
Identificació d'errors .................... Inclòs
Calificació correcta estimada ............. Inclòs
Recomanacions d'actuació .................. Inclòs
─────────────────────────────────────────────
TOTAL ..................................... 59€
```

**Beneficio UX:** Sin scroll horizontal. El precio se alinea visualmente a la derecha.

**Impacto en comprensión:** El formato "recibo" es universalmente comprensible. El usuario ve qué incluye y el precio final en un solo vistazo.

---

## 9. Formulario de Contacto — ContactForm.tsx

### 9.1 Campos sin contexto suficiente en móvil

**Antes:** El formulario de contacto tiene campos con labels estándar. En móvil, si el usuario está leyendo un artículo y llega al formulario, pierde el contexto de qué está solicitando exactamente.

**Después:** Añadir un H3 contextual sobre el formulario que indique exactamente qué va a recibir:
```
## Solicita tu informe en 24-48h
Adjunta tu certificado y recibe el análisis firmado por arquitecta colegiada.
```

**Beneficio UX:** El usuario sabe qué esperar al rellenar el formulario.

**Impacto en comprensión:** Reduce la fricción. El usuario no duda si esto es un contacto genérico o una solicitud específica.

---

## 10. Resumen de Acciones Recomendadas

### Prioridad 1 — Crítico (antes del próximo deploy)
1. **Transformar 12 tablas económicas** en fichas/bloques de datos (sección 1.1)
2. **Convertir ServicesComparison** de tabla a tarjetas en móvil (sección 1.2)
3. **Estructurar casos reales** como fichas visuales (sección 5)

### Prioridad 2 — Alto (este sprint)
4. **Agrupar FAQs por categoría** con H3 visibles (sección 2.1)
5. **Reducir CTAs a 1-2 por artículo** con separación clara (sección 3)
6. **Dividir listas de 7+ items** en dos grupos (sección 4.1)
7. **Acortar items de lista** a máximo 2 líneas (sección 4.2)

### Prioridad 3 — Medio (próximo sprint)
8. **Añadir transiciones entre H2 y H3** (sección 7.1)
9. **Aplicar negritas a datos económicos** (sección 7.2)
10. **Dividir párrafos de más de 5 líneas** (sección 6.1)
11. **Insertar H3 cada 200 palabras** en secciones largas (sección 6.2)
12. **Establecer regla de StickyCTA** (aparecer solo tras 60% scroll, ocultar con formulario)

### Resumen numérico
- **12 tablas críticas** a transformar
- **30 FAQs** a reagrupar
- **~15 CTAs redundantes** a eliminar o consolidar
- **8 listas** a dividir o acortar
- **6 casos prácticos/ejemplos** a reformatear como fichas

---

**Conclusión:** El contenido de Certilab tiene una base sólida. Los problemas detectados no son de fondo sino de formato: tablas que no se adaptan a móvil, FAQs sin jerarquía, CTAs redundantes, y bloques de texto que parecen documentos en lugar de contenido web. Con las transformaciones propuestas, la lectura en móvil será tan cómoda como en una app nativa: fichas escaneables, datos económicos visibles de un vistazo, y CTAs que aparecen en el momento justo sin saturar.