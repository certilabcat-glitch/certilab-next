export function breadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href,
    })),
  };
}

export function serviceSchema(service: {
  title: string;
  description: string;
  price: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    provider: {
      "@type": "ProfessionalService",
      name: "Certilab - Eva González",
      telephone: "+34608515922",
    },
    areaServed: { "@type": "Country", name: "España" },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    description: service.description,
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    image: article.image,
  };
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.replace(/<[^>]*>/g, ""), // Strip HTML for schema
      },
    })),
  };
}
