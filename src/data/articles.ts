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
