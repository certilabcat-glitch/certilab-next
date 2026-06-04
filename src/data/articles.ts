export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
}

export const articles: Article[] = [
  {
    slug: "brown-discount-precio-vivienda",
    title: "Brown Discount: qué es y cómo afecta al precio de tu vivienda",
    excerpt:
      "El Brown Discount es la pérdida de valor de una vivienda por su mala calificación energética. Descubre cómo detectarlo y qué hacer si estás comprando o vendiendo.",
    content: `
## ¿Qué es el Brown Discount?

El **Brown Discount** es el descuento que aplican los compradores informados (y los tasadores profesionales) sobre el precio de una vivienda con mala calificación energética (E, F o G).

### ¿Cuánto puedes perder?

Los estudios del sector inmobiliario europeo estiman que una vivienda con calificación E, F o G puede perder entre un **5% y un 15%** de su valor de mercado respecto a una vivienda equivalente con calificación A o B.

**Ejemplo real:** Una vivienda valorada en 270.000€ con calificación G podría perder hasta **40.000€** de su valor.

### ¿Por qué ocurre?

1. **Costes energéticos mayores:** Una vivienda ineficiente gasta más en calefacción y electricidad.
2. **Exigencia normativa:** La UE exige que todos los inmuebles tengan calificación energética para su venta o alquiler.
3. **Acceso a hipotecas verdes:** Cada vez más bancos ofrecen mejores condiciones para viviendas eficientes.

### ¿Cómo detectarlo?

En Certilab incluimos la detección del Brown Discount en todos nuestros **Check-Up Inmobiliario** e **Informes Técnicos Energéticos**.

Si estás comprando una vivienda, asegúrate de que el certificado energético refleja la realidad del inmueble. Una segunda opinión profesional puede ahorrarte miles de euros.
    `,
    date: "2026-01-15",
    author: "Eva María González Gracia",
    tags: ["brown discount", "calificación energética", "compraventa"],
    readingTime: 5,
    featured: true,
  },
  {
    slug: "cuanto-cuesta-certificado-energetico-2026",
    title: "Precio del Certificado Energético 2026: claves para entender las diferencias",
    excerpt:
      "¿Cuánto debería costar un certificado energético en 2026? Analizamos los precios del mercado y las diferencias entre las distintas opciones disponibles.",
    content: `
## ¿Cuánto cuesta un certificado energético en 2026?

Los precios de un certificado energético oficial en España varían según:

- **Ubicación:** Entre 80€ y 200€ dependiendo de la comunidad autónoma
- **Superficie del inmueble:** A mayor superficie, mayor precio
- **Complejidad:** Viviendas unifamiliares o edificios completos tienen tarifas superiores

### ¿Por qué hay certificados de 30€?

Existen plataformas online que ofrecen certificados energéticos por menos de 50€. El problema es que **no incluyen visita presencial**, lo que incumple el artículo 6.5 del RD 390/2021.

### Riesgos de un certificado barato

1. **Nulo jurídicamente:** Al no cumplir la normativa, el certificado puede ser declarado nulo
2. **Responsabilidad:** El técnico firmante puede ser sancionado
3. **Para el comprador:** Una calificación incorrecta puede ocultar el Brown Discount

### ¿Qué hacer?

Si tienes un certificado dudoso, solicita una **Segunda Opinión** en Certilab. Por 39€ te decimos si es fiable.
    `,
    date: "2026-02-20",
    author: "Eva María González Gracia",
    tags: ["certificado energético", "precios", "normativa"],
    readingTime: 4,
    featured: true,
  },
  {
    slug: "obtener-certificado-energetico-gratis",
    title: "¿Certificado Energético Gratis? Guía 2026",
    excerpt:
      "¿Existe realmente el certificado energético gratis? Te explicamos qué puedes obtener sin coste y qué debes pagar.",
    content: `
## ¿Existe el certificado energético gratis?

**No exactamente.** El certificado energético oficial requiere la intervención de un técnico colegiado con visita presencial, y ese trabajo tiene un coste.

### ¿Qué puedes obtener gratis?

En Certilab ofrecemos un **Diagnóstico Express gratuito** que incluye:

- Análisis orientativo de tu situación energética
- Recomendación del servicio más adecuado para tu caso
- Primer contacto sin compromiso con Eva

### Alternativas gratuitas

- **Registro de Certificadores:** Puedes buscar técnicos habilitados en el registro autonómico
- **Orientación:** Te ayudamos a entender qué necesitas sin coste

### ¿Cuánto deberías pagar?

Un certificado energético oficial con visita presencial cuesta entre **80€ y 200€**. Cualquier precio inferior a 60€ debería hacerte sospechar.
    `,
    date: "2026-03-10",
    author: "Eva María González Gracia",
    tags: ["certificado energético", "gratis", "guía"],
    readingTime: 3,
    featured: false,
  },
  {
    slug: "errores-certificado-energetico",
    title: "Errores comunes en el certificado energético (y cómo detectarlos)",
    excerpt:
      "Los 5 errores más frecuentes que encontramos en los certificados energéticos y cómo identificarlos antes de que te cuesten dinero.",
    content: `
## Los 5 errores más comunes en los certificados energéticos

### 1. Datos del catastro sin verificar

Muchos certificados se elaboran con los datos genéricos del catastro, sin comprobar si el inmueble tiene reformas, aislamiento adicional o cambios en las instalaciones.

### 2. Calificación inflada

Es el error más grave: asignar una calificación superior a la real para contentar al vendedor. Una A que debería ser una C, o una C que es una E.

### 3. Omisión de la fecha de visita

El certificado debe incluir la fecha de la visita presencial. Si no aparece, probablemente no se realizó.

### 4. Antigüedad del certificado

Los certificados tienen una validez de 10 años, pero si el inmueble ha tenido reformas, debería actualizarse.

### 5. Técnico no habilitado

El certificado debe estar firmado por un técnico competente (arquitecto, arquitecto técnico o ingeniero) colegiado.

### ¿Cómo detectarlos?

Solicita una **Segunda Opinión** en Certilab. Por 39€ revisamos tu certificado y te decimos si es fiable.
    `,
    date: "2026-04-05",
    author: "Eva María González Gracia",
    tags: ["certificado energético", "errores", "guía"],
    readingTime: 4,
    featured: false,
  },
  {
    slug: "ayudas-next-generation-rehabilitacion-energetica-2026",
    title: "Ayudas Next Generation para Rehabilitación Energética 2026",
    excerpt:
      "Guía completa de las ayudas Next Generation EU para rehabilitación energética de viviendas. ¿Cumples los requisitos? ¿Cómo solicitarlas?",
    content: `
## Ayudas Next Generation 2026 para rehabilitación energética

Los fondos Next Generation EU incluyen partidas específicas para la rehabilitación energética de edificios en España.

### ¿Qué ayudas están disponibles?

1. **Programa de Rehabilitación Energética de Edificios (PREE)**
2. **Programa de Ayudas para la Rehabilitación de Viviendas**
3. **Deducción IRPF por obras de mejora energética**

### Requisitos generales

- La vivienda debe ser anterior a 2007 (en la mayoría de casos)
- Las obras deben suponer una mejora de al menos un 30% en eficiencia
- Es necesario contar con un informe técnico previo

### ¿Cómo te ayudamos en Certilab?

Nuestro **Informe Técnico Energético** incluye orientación personalizada sobre las ayudas aplicables a tu caso. No gestionamos las solicitudes, pero te explicamos qué necesitas y dónde pedirlas.
    `,
    date: "2026-05-01",
    author: "Eva María González Gracia",
    tags: ["ayudas", "next generation", "rehabilitación", "subvenciones"],
    readingTime: 5,
    featured: true,
  },
  {
    slug: "detectar-certificado-energetico-falso",
    title: "¿Tu certificado energético es falso? Guía para detectarlo",
    excerpt:
      "Guía práctica para detectar si tu certificado energético es falso: 5 señales de alerta, precios orientativos, cómo reclamar y qué alternativas tienes.",
    content: `
## Señales de alerta: cómo detectar un certificado energético no fiable

### 1. No incluye fecha de visita presencial

El Real Decreto 390/2021 exige que el técnico visite el inmueble. Si tu certificado no menciona una visita in situ, probablemente se hizo sin pisar la vivienda.

### 2. Precio inferior a 60€

Un certificado energético real con visita presencial cuesta entre 80 y 200 €. Si pagaste menos de 60 €, es muy probable que no haya habido visita.

### 3. Técnico no colegiado o no verificable

El técnico debe estar colegiado. Busca su número en el registro del Colegio de Arquitectos Técnicos de tu provincia.

### 4. Datos genéricos sin verificar

Si el certificado usa solo datos del catastro sin mencionar reformas, aislamiento real o instalaciones específicas, es señal de que no hubo visita.

### 5. Calificación sospechosamente alta

Una vivienda antigua sin reformas difícilmente obtiene una A o B. Si la calificación parece inflada, puede estar ocultando el Brown Discount.

## ¿Qué hacer si tu certificado no es fiable?

1. **Solicita una Segunda Opinión** - Por 39€ analizamos tu certificado y te decimos si es fiable.
2. **Reclama ante el colegio profesional** del técnico firmante.
3. **Denuncia ante la administración** autonómica competente.

## Nuestros servicios para tu tranquilidad

Nuestro análisis forense te permite saber, antes de tomar cualquier decisión, si tu certificado energético es fiable, si la calificación es real y si el valor de tu inmueble está protegido:
- Segunda Opinión (39€) - Revisamos tu certificado actual
- Segunda Opinión Express (79€) - Entrega en menos de 2h
- Check-Up Inmobiliario (199€) - Análisis completo antes de comprar
- Informe Técnico (399€) - Análisis profundo con propuestas de mejora
    `,
    date: "2026-05-30",
    author: "Eva María González García",
    tags: ["certificado energético", "falso", "guía", "reclamar"],
    readingTime: 5,
    featured: true,
  },
  // Artículo 7 — TOFU
  {
    slug: "multas-no-tener-certificado-energetico",
    title: "Multas por no tener certificado energético: cuánto te puede costar en 2026",
    excerpt:
      "Las sanciones por no tener o no registrar el certificado energético pueden alcanzar los 6.000€. Te explicamos quién está obligado, qué riesgos corres y cómo evitarlos.",
    content: `
> ⚠️ **TL;DR:** La sanción por no tener certificado energético al vender o alquilar una vivienda puede ir de **300€ a 6.000€** en función de la gravedad. Además, desde 2025 la Inspección Técnica de Edificios (ITE) exige en muchas comunidades la calificación energética como requisito previo.

---

## ¿Es obligatorio el certificado energético?

Sí, contundentemente. El **Real Decreto 390/2021** transpone la Directiva Europea de Eficiencia Energética y establece que **toda vivienda que se venda o alquile debe disponer de un certificado energético válido** registrado en el organismo autonómico correspondiente.

La obligación no es nueva —existe desde 2013— pero las inspecciones y sanciones se han endurecido progresivamente. En 2026, las comunidades autónomas están coordinando campañas de inspección masiva cruzando datos catastrales con anuncios de venta y alquiler.

> 📌 **Dato clave:** Según el IDAE, más del 40% de los anuncios inmobiliarios en España incumplen la obligación de mostrar la calificación energética. La administración lo sabe y está actuando.

---

## ¿Qué dice la ley?

El artículo 62 de la Ley de Economía Sostenible (Ley 2/2011) y el Real Decreto 390/2021 establecen:

| Obligación | ¿A quién aplica? | Sanción |
|------------|-------------------|---------|
| Tener certificado en vigor | Vendedores y arrendadores | 300€ – 6.000€ |
| Registrar el certificado | Propietario (a través de técnico) | 300€ – 1.000€ |
| Mostrar calificación en anuncios | Agencias y propietarios | 300€ – 1.000€ |
| Entregar copia al comprador/inquilino | Vendedor/arrendador | 600€ – 6.000€ |

---

## ¿Quién inspecciona y cómo te pueden multar?

Las inspecciones no son aleatorias. La administración autonómica utiliza varias vías:

### 1. Cruzado de datos con anuncios online

Los inspectores rastrean portales inmobiliarios (Fotocasa, Idealista, Habitaclia) y verifican si el anuncio incluye:
- La **etiqueta energética** visible
- El **número de registro** del certificado

Si falta cualquiera de los dos, se inicia un expediente.

[cta:segunda-opinion]

### 2. Inspecciones en cambios de titularidad

Cuando compras una vivienda, el notario está obligado a solicitar el certificado energético. Si no se presenta, se comunica a la administración autonómica.

### 3. Denuncias de particulares

Vecinos, inquilinos o compradores pueden denunciar la ausencia de certificado. Es más frecuente de lo que parece, sobre todo en casos de conflicto arrendaticio.

> 🚨 **Atención:** Las denuncias de inquilinos son cada vez más comunes. Si tienes una vivienda alquilada sin certificado, cualquier reclamación del inquilino puede derivar en sanción.

---

## ¿Cuánto son las multas reales?

Las sanciones se gradúan en tres niveles:

### Leves (300€ – 1.000€)
- No tener el certificado en la vivienda
- No mostrar la calificación en el anuncio
- Retraso en el registro

### Graves (1.000€ – 2.000€)
- No entregar copia al comprador o inquilino
- Certificado caducado o sin registrar
- Falsear datos de la calificación

### Muy graves (2.000€ – 6.000€)
- Reincidencia en infracciones graves
- Certificado falso o emitido sin visita
- Impedir la inspección

---

## ¿Y si alquilo sin certificado?

Esta es una de las casuísticas más habituales y peligrosas. Alquilar sin certificado energético:

1. **Te expone a multas** de 300€ a 6.000€
2. **Permite al inquilino reclamar** la resolución del contrato si la vivienda no cumple condiciones mínimas de habitabilidad
3. **Te impide actualizar la renta** en algunos contratos de alquiler de larga duración

> 💡 **Consejo:** El certificado energético cuesta entre 60€ y 150€. Comparado con una multa mínima de 300€, no tiene sentido correr el riesgo.

[cta:segunda-opinion]

---

## Casos reales documentados

Según datos de las comunidades autónomas (2024-2025):

| Comunidad | Sanciones anuales | Importe medio |
|-----------|-------------------|---------------|
| Cataluña | +2.500 | 1.200€ |
| Madrid | +1.800 | 900€ |
| Andalucía | +3.100 | 800€ |
| Comunidad Valenciana | +1.200 | 1.100€ |

Las cifras aumentan año a año. Si tienes una vivienda en alquiler o estás pensando en vender, no esperes a que te inspeccionen.

---

## Cómo evitar la multa (pasos prácticos)

1. **Solicita tu certificado** a un técnico colegiado
2. **Verifica** que el técnico realice la visita presencial obligatoria
3. **Asegúrate** de que el certificado se registre en el órgano autonómico
4. **Incluye la etiqueta** en todos tus anuncios de venta o alquiler
5. **Entrega una copia** al comprador o inquilino antes de firmar

Si ya tienes certificado pero dudas de si es válido o está correctamente registrado, una segunda opinión profesional te lo confirma en cuestión de horas.
    `,
    date: "2026-06-04",
    author: "Eva María González García",
    tags: ["certificado energético", "multas", "obligatorio", "sanciones", "alquiler"],
    readingTime: 6,
    featured: false,
  },
  // Artículo 8 — TOFU
  {
    slug: "certificado-energetico-obligatorio-alquiler",
    title: "¿Es obligatorio el certificado energético para alquilar una vivienda en 2026?",
    excerpt:
      "Sí, el certificado energético es obligatorio para alquilar desde 2013. Te contamos qué dice la ley, las excepciones reales y qué pasa si alquilas sin él.",
    content: `
> 💡 **TL;DR:** El certificado energético **es obligatorio para alquilar cualquier vivienda** en España desde 2013. No hay excepción por antigüedad, tamaño o precio del alquiler. Si alquilas sin él, te expones a multas de hasta 6.000€ y el inquilino puede reclamar.

---

## La respuesta corta: sí, es obligatorio

Desde la entrada en vigor del **Real Decreto 235/2013** (actualizado por el **Real Decreto 390/2021**), toda vivienda que se ponga en alquiler debe disponer de un certificado energético válido y registrado.

La ley no distingue entre:
- Pisos completos o habitaciones sueltas
- Alquiler de temporada o de larga duración
- Viviendas amuebladas o vacías
- Primer alquiler o renovación

Si hay contraprestación económica a cambio del uso de la vivienda, necesitas certificado.

> 🚨 **Excepción importante:** El alquiler de **habitaciones individuales** en la vivienda habitual del propietario NO necesita certificado, según la interpretación del IDAE. Pero si alquilas el piso entero, sí.

---

## ¿Qué dice la normativa exactamente?

El artículo 6 del RD 390/2021 establece que:

> "El certificado de eficiencia energética del edificio o de la parte del mismo será necesario para la **venta o arrendamiento** del mismo, y deberá ponerse a disposición del adquirente o arrendatario."

Es decir: **no basta con tenerlo**, además hay que **entregar una copia** al inquilino. Si no lo entregas, también estás incumpliendo.

[cta:segunda-opinion]

---

## ¿Y para alquileres de temporada o vacacional?

Esta es una de las dudas más frecuentes. La respuesta es **sí, también es obligatorio**:

| Tipo de alquiler | ¿Obligatorio? | ¿Qué dice la ley? |
|-----------------|---------------|-------------------|
| Alquiler de larga duración (>1 año) | ✅ Sí | RD 390/2021 |
| Alquiler de temporada (curso, trabajo) | ✅ Sí | Misma normativa |
| Alquiler vacacional (días/semanas) | ✅ Sí | Además necesita licencia turística |
| Habitaciones (con el dueño viviendo) | ❌ No | Interpretación IDAE |

---

## ¿Qué información debe aparecer en el anuncio?

Desde 2021, los anuncios de alquiler deben incluir:

1. La **etiqueta energética** (la letra de la A a la G)
2. El **número de registro** del certificado
3. El **consumo anual de energía** expresado en kWh/m²

Si anuncias sin esta información, el portal inmobiliario puede retirar el anuncio y la administración puede sancionarte.

> 💡 **Dato práctico:** Idealista, Fotocasa y Habitaclia ya exigen la etiqueta energética como campo obligatorio para publicar anuncios.

---

## ¿Qué pasa si alquilas sin certificado?

Las consecuencias son varias y ninguna buena:

### 1. Sanción económica
Las multas van de **300€ a 6.000€** según la gravedad (como vimos en nuestro artículo sobre [multas del certificado energético](/blog/multas-no-tener-certificado-energetico/)).

### 2. El inquilino puede reclamar
Aunque el contrato de alquiler sigue siendo legal, el inquilino puede:
- Solicitar la resolución del contrato si se demuestra que la vivienda no cumple condiciones mínimas
- Reclamar daños y perjuicios si la falta de certificado le ha impedido acceder a ayudas o bonificaciones

### 3. Problemas con el seguro
Algunas aseguradoras están empezando a preguntar por el certificado energético como parte de la documentación del seguro de hogar. No tenerlo puede ser motivo de exclusión de cobertura en caso de siniestro.

[cta:segunda-opinion]

---

## ¿Necesito certificado nuevo para cada inquilino?

No necesitas uno nuevo si el certificado sigue en vigor. El certificado energético tiene una **validez de 10 años** (para viviendas con calificación A o B) o de **10 años también** (para el resto, aunque la recomendación es actualizarlo antes).

Eso sí, debes entregar una copia a cada nuevo inquilino. Si alquilas la misma vivienda a distintas personas a lo largo del tiempo, usas el mismo certificado siempre que esté vigente.

---

## ¿Qué tengo que hacer si voy a alquilar?

Si estás a punto de alquilar tu vivienda, estos son los pasos:

1. **Contrata un técnico colegiado** que emita el certificado con visita presencial
2. **Verifica el registro** en el organismo autonómico (Cataluña tiene su propio registro en la ICAEN)
3. **Incluye la etiqueta** en tus anuncios
4. **Entrega una copia** al inquilino junto con el contrato
5. **Guarda el justificante** de entrega firmado

Si ya tienes un certificado pero te han surgido dudas sobre su validez, podemos revisarlo por ti en nuestra [segunda opinión](/segunda-opinion/).
    `,
    date: "2026-06-04",
    author: "Eva María González García",
    tags: ["certificado energético", "alquiler", "obligatorio", "arrendamiento", "vivienda"],
    readingTime: 6,
    featured: false,
  },
  // Artículo 9 — TOFU
  {
    slug: "cuanto-dura-certificado-energetico",
    title: "¿Cuánto dura el certificado energético? Validez, caducidad y renovación en 2026",
    excerpt:
      "El certificado energético tiene una validez máxima de 10 años. Pero hay casos en los que caduca antes. Te explicamos cuándo renovarlo y cómo saber si el tuyo sigue vigente.",
    content: `
> 💡 **TL;DR:** El certificado energético tiene una **validez máxima de 10 años**, pero hay circunstancias que obligan a renovarlo antes: obras de rehabilitación, cambios normativos o si el certificado contiene errores. En Cataluña, el plazo para calificaciones A y B puede ser de 10 años, pero para viviendas ineficientes conviene actualizarlo a los 5.

---

## Validez legal del certificado energético

El **Real Decreto 390/2021** establece que el certificado de eficiencia energética tiene una vigencia máxima de:

| Calificación | Validez máxima | ¿Cuándo renovar? |
|-------------|----------------|-------------------|
| A o B | 10 años | Al vender o alquilar, mejor renovar si quedan <2 años |
| C o D | 10 años | Recomendable a los 5-7 años si ha habido cambios |
| E, F o G | 10 años | Recomendable a los 5 años (el Brown Discount puede haber cambiado) |

Pero ojo: **los 10 años son el máximo, no la garantía**. Hay situaciones que acortan ese plazo.

> 📌 **Dato clave:** El plazo de validez comienza a contar desde la **fecha de registro** del certificado en el organismo autonómico, no desde la fecha de emisión ni desde la visita del técnico. Asegúrate de que tu certificado esté registrado.

---

## ¿Cuándo caduca antes de los 10 años?

Hay **cuatro situaciones** que invalidan el certificado antes de su fecha teórica de caducidad:

### 1. Obras de rehabilitación o mejora

Si realizas obras que afectan a la envolvente térmica (fachadas, ventanas, cubierta) o a las instalaciones (caldera, aire acondicionado, iluminación), el certificado deja de reflejar el estado real de la vivienda. Legalmente, necesitas uno nuevo.

### 2. Cambio normativo

La normativa europea avanza rápido. Si entra en vigor una nueva directiva o real decreto que modifique los criterios de cálculo, los certificados antiguos pueden perder validez antes de su fecha de caducidad.

[cta:segunda-opinion]

### 3. Errores en el certificado

Si se detectan errores en el certificado —como una calificación inflada, datos incorrectos del inmueble o la ausencia de visita presencial— el certificado puede ser declarado nulo. En ese caso, deja de tener validez aunque no hayan pasado los 10 años.

### 4. Cambio de titularidad sin actualización

Aunque el certificado es transferible al nuevo propietario, si se vende la vivienda varias veces sin actualizar el certificado, la administración puede requerir uno nuevo si el existente tiene más de 5 años.

---

## ¿Puedo usar el mismo certificado para alquilar y vender?

Sí, siempre que esté en vigor. No necesitas certificados distintos para alquilar y para vender. El mismo certificado sirve para ambas operaciones.

Eso sí: si primero alquilas y luego vendes, asegúrate de que:
- El certificado sigue vigente (no ha caducado)
- Está correctamente registrado
- La calificación sigue siendo representativa del estado actual de la vivienda

---

## ¿Y en Cataluña? ¿Hay diferencias?

Cataluña tiene su propio organismo regulador (ICAEN) y su registro autonómico. La validez legal es la misma (10 años), pero hay **particularidades importantes**:

1. **Registro obligatorio** en el Registro General de Certificados de Cataluña (no vale solo con tenerlo firmado)
2. La **etiqueta energética debe incluir el código de registro** específico de Cataluña
3. Las **inspecciones son más frecuentes** que en otras comunidades

Si tu certificado es de Cataluña, verifica que aparece el número de registro de la ICAEN. Si no está, puede que no sea válido aunque tenga menos de 10 años.

[cta:segunda-opinion]

---

## ¿Cómo sé si mi certificado sigue vigente?

Para comprobarlo:

1. **Mira la fecha de registro** (no la de emisión)
2. **Suma 10 años** desde esa fecha
3. **Verifica** que el certificado sigue registrado en el organismo autonómico
4. **Comprueba** que no ha habido cambios normativos que lo invaliden

Si tienes dudas, en Certilab podemos revisar tu certificado y decirte si sigue siendo válido o necesitas renovarlo. Nuestra [segunda opinión](/segunda-opinion/) incluye esta verificación.

---

## Preguntas frecuentes sobre la validez

**¿El certificado caduca si no lo uso?**
No. El certificado caduca por tiempo, no por uso. Si pasan 10 años desde el registro, caduca aunque no hayas alquilado ni vendido.

**¿Puedo renovar el certificado antes de que caduque?**
Sí, y en muchos casos es recomendable, sobre todo si has hecho mejoras que pueden mejorar la calificación.

**¿El certificado energético caduca si cambio de comunidad autónoma?**
No. El certificado es válido en toda España independientemente de dónde se registrara, siempre que esté dentro del plazo de validez.

**¿Cuánto cuesta renovar el certificado?**
Lo mismo que el primero: entre 60€ y 150€, dependiendo del técnico y la comunidad. Es un coste asumible comparado con los riesgos de tenerlo caducado.
    `,
    date: "2026-06-04",
    author: "Eva María González García",
    tags: ["certificado energético", "validez", "caducidad", "renovar", "vigencia"],
    readingTime: 6,
    featured: false,
  },
  // Artículo 10 — TOFU
  {
    slug: "como-interpretar-certificado-energetico",
    title: "Cómo interpretar tu certificado energético: guía visual para no perderte",
    excerpt:
      "¿Tu certificado energético parece chino? Te enseñamos a leer cada apartado: calificación, consumo, emisiones y el número de registro que lo hace válido.",
    content: `
> 💡 **TL;DR:** Un certificado energético tiene 5 partes clave: la etiqueta (calificación A-G), la escala de consumo, la escala de emisiones, los datos del técnico y el número de registro. Si falta alguno, el certificado puede no ser válido.

---

## La estructura del certificado energético

Un certificado energético válido debe contener estos 5 bloques fundamentales:

| Bloque | ¿Qué debe incluir? | ¿Por qué es importante? |
|--------|-------------------|--------------------------|
| 1. Etiqueta | Letra de calificación (A-G) + código de registro | Identifica visualmente la eficiencia |
| 2. Consumo | kWh/m² año | Mide cuánta energía consume el inmueble |
| 3. Emisiones | kg CO₂/m² año | Mide el impacto ambiental |
| 4. Datos del técnico | Nombre, nº colegiado, firma | Verifica que es un profesional habilitado |
| 5. Medidas de mejora | Recomendaciones del técnico | Te indica qué puedes hacer para mejorar |

---

## 1. La etiqueta energética

Es la parte más famosa y la que se muestra en los anuncios. La etiqueta es una barra de colores que va del **verde oscuro (A)** al **rojo oscuro (G)**.

La flecha negra indica la calificación actual de tu vivienda. Pero **atención**: la etiqueta no es suficiente. Necesitas que aparezca el **código de registro** asociado.

> 🚨 **Error muy común:** Muchas inmobiliarias ponen una etiqueta genérica sin código de registro. Si no tiene código, no es el certificado real de la vivienda. Es un simple adorno.

[cta:segunda-opinion]

---

## 2. El consumo de energía (kWh/m² año)

Esta cifra es la más importante para tu bolsillo. Te dice cuánta energía consume tu vivienda por metro cuadrado al año.

| Consumo | ¿Qué significa? | Coste anual estimado (80m²) |
|---------|----------------|---------------------------|
| < 50 kWh/m² | Muy eficiente | < 400€ |
| 50-100 kWh/m² | Eficiente | 400-700€ |
| 100-200 kWh/m² | Normal | 700-1.200€ |
| > 200 kWh/m² | Ineficiente | > 1.200€ |

Si tu consumo declarado en el certificado no se corresponde con tus facturas reales, es posible que el certificado tenga errores.

---

## 3. Las emisiones de CO₂ (kg CO₂/m² año)

Este indicador es cada vez más relevante por:
- **Exigencias normativas** (la UE endurece los límites)
- **Acceso a ayudas** (muchas subvenciones exigen un máximo de emisiones)
- **Valor de reventa** (los compradores informados miran esta cifra)

💡 **Para que te hagas una idea:** Una vivienda con calificación G puede emitir hasta 5 veces más CO₂ que una con calificación A. Eso se traduce en un mayor impacto ambiental... y en una mayor factura energética.

---

## 4. Los datos del técnico (y por qué son críticos)

El certificado debe identificar claramente al técnico que lo ha emitido:

- **Nombre completo** del técnico
- **Número de colegiado** (imprescindible)
- **Colegio profesional** (Arquitectos, Aparejadores, Ingenieros)
- **Firma digital o manuscrita**

Si alguno de estos datos falta, el certificado puede ser declarado nulo. Como explicamos en nuestro artículo sobre [cómo detectar un certificado falso](/blog/detectar-certificado-energetico-falso/), la ausencia de técnico verificable es una de las señales de alerta más claras.

[cta:segunda-opinion]

---

## 5. Las medidas de mejora

Todo certificado energético debe incluir **al menos 2 medidas de mejora** recomendadas por el técnico. Estas medidas pueden ser:

| Tipo de mejora | Ejemplo | Ahorro potencial |
|---------------|---------|------------------|
| Envolvente | Aislar fachada o cubierta | 20-40% |
| Ventanas | Doble acristalamiento | 10-20% |
| Climatización | Cambiar caldera por bomba de calor | 30-50% |
| Iluminación | LED + sensores | 10-15% |

Si tu certificado no incluye ninguna medida de mejora, es sospechoso. La normativa obliga a incluirlas.

---

## Errores frecuentes al leer el certificado

### ❌ Confundir "fecha de emisión" con "fecha de registro"
La fecha que cuenta para la validez del certificado es la de **registro**, no la de emisión. Puede haber semanas de diferencia.

### ❌ No verificar que la calificación corresponde al consumo declarado
Si la etiqueta muestra una A pero el consumo declarado es de 200 kWh/m², hay una incoherencia. La calificación debe corresponderse con los datos numéricos.

### ❌ Ignorar la escala de emisiones
Algunos certificados muestran una calificación buena en consumo pero mala en emisiones (o viceversa). La calificación final se calcula con ambas escalas.

---

## ¿Qué hago si mi certificado tiene errores?

Si al leer tu certificado detectas alguna incoherencia, tienes varias opciones:

1. **Solicitar una segunda opinión** — Por 39€ analizamos tu certificado y te decimos si es fiable
2. **Reclamar al técnico** — Si el certificado tiene errores, el técnico debe corregirlos sin coste adicional
3. **Denunciar ante el colegio profesional** — Si el técnico se niega a corregir errores graves

En Certilab revisamos decenas de certificados cada semana. Nuestra recomendación: si tienes dudas, no las ignores. Un certificado con errores puede costarte mucho más que los 39€ de una [segunda opinión](/segunda-opinion/).
    `,
    date: "2026-06-04",
    author: "Eva María González García",
    tags: ["certificado energético", "interpretar", "leer", "guía", "calificación"],
    readingTime: 7,
    featured: false,
  },
  // ──────────────────────────────────────────
  // Artículo 13 - Comunidad de vecinos
  // ──────────────────────────────────────────
  {
    slug: "certificado-energetico-comunidades-vecinos",
    title: "Certificado energético en comunidades de vecinos: obligación legal para zonas comunes",
    excerpt:
      "¿Sabías que las comunidades de vecinos también necesitan certificado energético para las zonas comunes? Descubre en qué casos es obligatorio, cómo obtenerlo y las sanciones por no tenerlo.",
    content: `
## ¿Obligan a las comunidades de vecinos a tener certificado energético?

Sí. Desde la entrada en vigor del Real Decreto 390/2021, **las zonas comunes de los edificios de viviendas también necesitan su propio certificado energético** cuando se vendan o alquilen.

### ¿Qué zonas comunes entran?

El certificado debe incluir:

- **Ascensores** y motores de elevación
- **Iluminación de pasillos**, portales, escaleras y garajes
- **Sistemas de climatización** centralizados (calefacción, aire acondicionado)
- **Instalaciones de agua caliente sanitaria (ACS)** comunitarias
- **Cubiertas y fachadas** (por su influencia en la demanda energética)

> ⚠️ **Importante:** No es necesario un certificado separado para cada vecino. Basta con un único certificado para todo el edificio que incluya tanto las zonas comunes como las viviendas individuales.

### ¿Cuándo es obligatorio?

- **Venta de un piso:** El vendedor debe presentar el certificado del edificio completo (o al menos de la vivienda + su parte proporcional de comunes).
- **Alquiler de un piso:** Igual que en venta, el arrendador debe entregar una copia al inquilino.
- **Venta del edificio completo:** Es obligatorio el certificado del inmueble completo.

### ¿Qué pasa si la comunidad no lo tiene?

Si la comunidad de propietarios no dispone del certificado en el momento de vender o alquilar cualquier vivienda, **el propietario individual no podrá completar la operación**. Además, la comunidad podría enfrentarse a sanciones.

### ¿Cómo obtenerlo?

1. Contactar con un **técnico competente** (arquitecto, ingeniero o aparejador).
2. El técnico realizará una visita para **inspeccionar las instalaciones comunes**.
3. Calculará la calificación energética del edificio (de la A a la G).
4. Registrará el certificado en el **organismo autonómico correspondiente**.

> 💡 **Consejo:** Aprovecha la obtención del certificado comunitario para identificar mejoras de eficiencia que pueden beneficiar a todos los vecinos y acceder a ayudas públicas.

[cta:segunda-opinion]

## ¿Cuánto cuesta?

El precio del certificado para comunidades varía según el tamaño y la complejidad del edificio, pero suele oscilar entre:
- Edificio pequeño (hasta 10 viviendas): **300-500 €**
- Edificio mediano (10-30 viviendas): **500-800 €**
- Edificio grande (más de 30 viviendas): **800-1.200 €**

## Resumen

| Aspecto | Detalle |
|---------|---------|
| ¿Es obligatorio? | Sí, para venta o alquiler |
| ¿Qué cubre? | Zonas comunes + viviendas |
| ¿Cada cuánto renovar? | 10 años |
| ¿Sanción por no tenerlo? | Desde 300 € hasta 6.000 € |

Si tu comunidad aún no tiene el certificado energético, te recomendamos ponerte en marcha cuanto antes para evitar problemas legales en futuras operaciones inmobiliarias.
`,
    date: "2026-06-04",
    author: "Eva María González García",
    tags: ["certificado energético", "comunidades de vecinos", "obligación legal", "zonas comunes", "edificios", "viviendas"],
    readingTime: 6,
    featured: false,
  },
  // ──────────────────────────────────────────
  // Artículo 14 - Vivienda eficiente sin A
  // ──────────────────────────────────────────
  {
    slug: "vivienda-eficiente-sin-certificado-a",
    title: "Vivienda eficiente sin certificado A: mitos y realidades sobre la calificación energética",
    excerpt:
      "¿Puede una vivienda ser eficiente aunque no tenga calificación A? Analizamos los mitos más comunes y te explicamos qué significan realmente las letras de la etiqueta energética.",
    content: `
## ¿Vale realmente la letra?

Es habitual pensar que **si una vivienda no tiene calificación A, no es eficiente**. Pero la realidad es más compleja. La letra de la etiqueta energética depende de dos factores: el **consumo de energía** y las **emisiones de CO₂**, pero también del tipo de combustible y del sistema de calificación utilizado.

### Mito 1: "Solo las casas nuevas pueden tener A"

**Falso.** Aunque las viviendas de obra nueva suelen tener mejores calificaciones, una reforma integral bien planteada puede llevar una vivienda antigua de una G a una B o incluso A. Todo depende de las mejoras que se apliquen:

- Sustitución de ventanas por **climalit con rotura de puente térmico**
- Aislamiento de **fachadas y cubiertas**
- Instalación de **aerotermia** o **bomba de calor**
- Paneles solares para ACS

> 💡 **Dato:** Una vivienda de los años 70 que se reforma con aislamiento y aerotermia puede pasar de una G a una B, reduciendo el consumo hasta un 70%.

### Mito 2: "Si tengo C o D, mi casa es muy ineficiente"

**Depende.** Una C es una calificación aceptable y no te penalizará en el mercado. Una D puede ser mejor que una A si esta última se ha obtenido con sistemas poco realistas. Lo importante no es solo la letra, sino **el consumo real en kWh/m² año**.

| Calificación | Consumo orientativo | ¿Es eficiente? |
|-------------|-------------------|---------------|
| A | < 30 kWh/m² año | Excelente |
| B | 30-50 kWh/m² año | Muy buena |
| C | 50-80 kWh/m² año | Buena |
| D | 80-120 kWh/m² año | Aceptable |
| E | 120-160 kWh/m² año | Mejorable |
| F-G | > 160 kWh/m² año | Necesita reforma |

### Mito 3: "La etiqueta energética es siempre fiable"

No siempre. Algunos certificados se elaboran sin visita o con datos incorrectos. Un **certificado mal hecho** puede:

- Inflar la calificación (peligro si compras esperando una casa eficiente)
- Dar una calificación más baja de la real (pérdida de valor injustificada)

> ⚠️ **Precaución:** Si sospechas que tu certificado no refleja la realidad, solicita una Segunda Opinión profesional.

### ¿Qué debes mirar realmente?

1. **Consumo de energía primaria** (kWh/m² año) — cuanto más bajo, mejor.
2. **Emisiones de CO₂** (kgCO₂/m² año) — importante para el medio ambiente.
3. **Medidas de mejora** recomendadas — un buen certificado siempre incluye propuestas.
4. **Que el técnico haya visitado la vivienda** — sin visita, el certificado no es válido.

[cta:segunda-opinion]

## Conclusión

No te obsesiones con la letra. Una **C o D bien calculada** puede ser más fiable que una **A o B mal obtenida**. Si tienes dudas sobre tu certificado, pide una segunda opinión antes de tomar decisiones importantes.
`,
    date: "2026-06-04",
    author: "Eva María González García",
    tags: ["certificado energético", "eficiencia", "calificación", "mitos", "vivienda eficiente"],
    readingTime: 7,
    featured: false,
  },
  // ──────────────────────────────────────────
  // Artículo 15 - Guía tramitar certificado Catalunya
  // ──────────────────────────────────────────
  {
    slug: "guia-tramitar-certificado-energetico-catalunya",
    title: "Guía completa para tramitar el certificado energético en Catalunya (2026)",
    excerpt:
      "¿Necesitas el certificado energético en Catalunya? Te explicamos paso a paso todo el proceso: desde pedir presupuesto hasta registrarlo en el ICAEN. Incluye plazos, precios y documentos necesarios.",
    content: `
## ¿Cómo obtener el certificado energético en Catalunya?

Si vas a **vender o alquilar** tu vivienda en Catalunya, necesitas el certificado energético. Aquí te explicamos todo el proceso paso a paso.

### Paso 1: Encuentra un técnico competente

El certificado debe ser emitido por un **técnico certificador** con titulación habilitante:

- Arquitecto o arquitecto técnico
- Ingeniero o ingeniero técnico
- Instalador habilitado

> 💡 **Consejo:** Pide al menos **3 presupuestos** y asegúrate de que incluyen visita a la vivienda. Un certificado sin visita no es válido.

### Paso 2: Prepara la documentación

Antes de la visita del técnico, ten a mano:

- **Datos del inmueble** (dirección, año de construcción, referencia catastral)
- **Facturas de suministros** (electricidad, gas, gasoil) de los últimos 2-3 años
- **Planos** de la vivienda (si los tienes)
- **Documentación de reformas** realizadas (cambio de ventanas, aislamiento, caldera, etc.)

### Paso 3: La visita técnica

El técnico visitará tu vivienda para:

- **Medir** superficies y volúmenes
- **Identificar** los sistemas de climatización y ACS
- **Comprobar** el tipo de cerramientos (ventanas, puertas, muros)
- **Evaluar** el estado del aislamiento térmico

La visita suele durar entre **30 y 60 minutos** para una vivienda tipo.

### Paso 4: Emisión y registro

Con los datos recogidos, el técnico:

1. **Calcula** la calificación energética (de A a G) usando software homologado.
2. **Genera** la etiqueta energética y el informe técnico.
3. **Registra** el certificado en el **ICAEN** (Institut Català d'Energia) o en el órgano autonómico correspondiente.

El registro es obligatorio y otorga al certificado validez legal.

### Paso 5: Entrega al comprador o inquilino

Una vez registrado, debes **entregar una copia** del certificado:

- **En venta:** Al comprador, antes de la firma de la escritura.
- **En alquiler:** Al inquilino, antes de la firma del contrato.

> ⚠️ **Importante:** El incumplimiento puede conllevar sanciones de hasta 6.000 €.

### Plazos y precios orientativos

| Tipo de vivienda | Precio estimado | Plazo de emisión |
|-----------------|----------------|-----------------|
| Piso pequeño (< 70 m²) | 90-150 € | 2-5 días |
| Piso mediano (70-100 m²) | 120-200 € | 2-5 días |
| Casa unifamiliar | 200-350 € | 3-7 días |

### ¿Cada cuánto hay que renovarlo?

El certificado energético tiene una validez de **10 años**. Pasado ese tiempo, debe renovarse. También es recomendable renovarlo si haces reformas que mejoren la eficiencia.

[cta:segunda-opinion]

## Resumen rápido

1. ✅ Busca técnico certificador homologado
2. ✅ Prepara documentación del inmueble
3. ✅ Facilita la visita del técnico
4. ✅ Recibe la etiqueta y el informe
5. ✅ Registro obligatorio en el ICAEN
6. ✅ Entrega al comprador/inquilino

Si tienes dudas sobre el proceso o sospechas que tu certificado no es correcto, solicita una Segunda Opinión antes de formalizar la operación.
`,
    date: "2026-06-04",
    author: "Eva María González García",
    tags: ["certificado energético", "Catalunya", "trámites", "guía", "ICAEN", "registro"],
    readingTime: 8,
    featured: false,
  },
  // ──────────────────────────────────────────
  // Artículo 16 - Sanciones multas
  // ──────────────────────────────────────────
  {
    slug: "sanciones-multas-no-tener-certificado-energetico",
    title: "Sanciones y multas por no tener certificado energético: cuantías y riesgos legales",
    excerpt:
      "¿Cuánto puedes pagar si no tienes el certificado energético? Analizamos las sanciones reales en España y Catalunya, desde 300 € hasta 6.000 €, y cómo evitarlas.",
    content: `
## ¿Es ilegal no tener certificado energético?

Sí. Desde la transposición de la Directiva Europea 2010/31/UE, es **obligatorio** disponer de un certificado energético válido y registrado para cualquier operación de **venta o alquiler** de un inmueble en España.

### ¿Qué dice la ley?

El **Real Decreto 390/2021**, por el que se aprueba el procedimiento básico para la certificación energética de edificios, establece:

- **Artículo 12:** Obligación de exhibir la etiqueta energética en toda oferta de venta o alquiler.
- **Artículo 13:** Obligación de entregar copia al comprador o inquilino.
- **Disposición adicional cuarta:** Régimen sancionador.

### ¿Cuánto son las multas?

Las sanciones se clasifican en tres grados:

| Tipo | Cuantía | ¿Por qué? |
|------|--------|-----------|
| **Leve** | 300 € - 1.000 € | No exhibir la etiqueta en anuncios |
| **Grave** | 1.001 € - 2.000 € | No tener certificado en el momento de la compraventa |
| **Muy grave** | 2.001 € - 6.000 € | Falsear datos del certificado o no registrarlo |

> ⚠️ **Atención:** En Catalunya, la **Agència de l'Habitatge de Catalunya** puede iniciar expedientes sancionadores de oficio o a instancia de parte (por ejemplo, si un inquilino denuncia).

### Casos reales y ejemplos

**Caso 1:** Un propietario anuncia su piso en alquiler sin mencionar la calificación energética.
→ Sanción leve: **600 €**.

**Caso 2:** Un vendedor formaliza la escritura sin haber entregado el certificado al comprador.
→ Sanción grave: **1.500 €**.

**Caso 3:** Un técnico emite un certificado sin visitar la vivienda y con datos falsos.
→ Sanción muy grave: **4.000 €** al técnico y **2.000 €** al propietario que lo contrató.

### ¿Cómo detectar si te están engañando?

Señales de alerta:

- ❌ El técnico no visita la vivienda (solo con fotos o planos)
- ❌ El certificado no tiene número de registro del ICAEN
- ❌ La calificación es muy alta sin reformas evidentes
- ❌ El precio es sospechosamente bajo (menos de 50 €)

### ¿Qué hacer si te denuncian?

1. **No ignorar la notificación** — las sanciones pueden aumentar con intereses.
2. **Obtener el certificado cuanto antes** — si aún no lo tienes, consíguelo inmediatamente.
3. **Solicitar una Segunda Opinión** si el certificado existente es incorrecto.
4. **Alegar desconocimiento** solo funciona una vez; la reincidencia multiplica las sanciones.

[cta:segunda-opinion]

## Conclusión

No tener el certificado energético puede salirte caro. Las multas empiezan en **300 €** y pueden llegar hasta **6.000 €** en casos graves. Si tienes dudas sobre tu certificado o necesitas obtenerlo, no esperes a que te sancionen.
`,
    date: "2026-06-04",
    author: "Eva María González García",
    tags: ["certificado energético", "sanciones", "multas", "riesgos legales", "obligación", "comunidades"],
    readingTime: 7,
    featured: false,
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getRelatedArticles(tags: string[], currentSlug: string): Article[] {
  return articles
    .filter((a) => a.slug !== currentSlug)
    .map((a) => ({
      article: a,
      relevance: a.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((a) => a.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3)
    .map((a) => a.article);
}
