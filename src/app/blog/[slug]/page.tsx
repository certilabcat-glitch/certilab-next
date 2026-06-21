import Link from "next/link";
import AutorBloque from "@/components/blog/AutorBloque";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticle, getRelatedArticles } from "@/data/articles";
import "./post.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title.length > 48
      ? { absolute: article.title }
      : article.title,
    description: article.excerpt,
    alternates: { canonical: `https://www.certilab.cat/blog/${slug}/` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.certilab.cat/blog/${slug}/`,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: article.image ?? "https://www.certilab.cat/og-image.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image ?? "https://www.certilab.cat/og-image.jpg"],
    },
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}

function processInline(text: string): string {
  let t = text;
  // Bold **text**
  t = t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Italic *text*
  t = t.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  // Inline links [text](url)
  t = t.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m: string, linkText: string, url: string) =>
      `<a href="${url}" class="post-link">${linkText}</a>`
  );
  return t;
}

function formatContent(raw: string): string {
  // 1) Strip the FAQ section to avoid duplicate rendering (text + dropdowns)
  const textToProcess = raw.replace(/## Preguntas frecuentes[\s\S]*?(?=\n---|\n## |$)/, "");

  // 2) Split into blocks by double newlines
  const blocks = textToProcess.split("\n\n");

  const result = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    // --- INLINE CTA: [cta:segunda-opinion] ---
    if (trimmed === "[cta:segunda-opinion]") {
      return `<div class="post-cta-inline"><div class="post-cta-inline-icon">🔍</div><div class="post-cta-inline-body"><p><strong>¿No te fías de tu certificado energético?</strong> Por 59€ un técnico lo revisa y te dice si es correcto.</p><a href="/segunda-opinion/" class="post-cta-inline-link">Revisar mi certificado →</a></div></div>`;
    }

    // --- TL;DR ---
    const tldrMatch = trimmed.match(/^\*\*TL;DR:\*\*([\s\S]*)$/);
    if (tldrMatch) {
      return `<div class="post-tldr"><strong>TL;DR:</strong>${processInline(tldrMatch[1])}</div>`;
    }

    // --- Horizontal rule ---
    if (/^---$/.test(trimmed)) {
      return '<hr class="post-hr" />';
    }

    // --- Heading H2 ---
    const h2Match = trimmed.match(/^## (.+)$/);
    if (h2Match) {
      return `<h2 class="post-h2">${processInline(h2Match[1])}</h2>`;
    }

    // --- Heading H3 ---
    const h3Match = trimmed.match(/^### (.+)$/);
    if (h3Match) {
      return `<h3 class="post-h3">${processInline(h3Match[1])}</h3>`;
    }

    // --- Callout blockquotes: > ⚠️ text, > 💡 text, etc. ---
    const calloutMatch = trimmed.match(/^>\s*(⚠️|💡|✅|📌|🚨|❌|ℹ️|💰)\s*([\s\S]*)$/);
    if (calloutMatch) {
      const icon = calloutMatch[1];
      const text = calloutMatch[2];
      const cls = icon === "⚠️" ? "callout-warning"
        : icon === "💡" ? "callout-tip"
        : icon === "✅" ? "callout-success"
        : icon === "📌" ? "callout-note"
        : icon === "🚨" ? "callout-danger"
        : icon === "❌" ? "callout-danger"
        : icon === "ℹ️" ? "callout-info"
        : icon === "💰" ? "callout-money"
        : "callout-default";
      return `<div class="post-callout ${cls}"><span class="callout-icon">${icon}</span><div class="callout-body">${processInline(text)}</div></div>`;
    }

    // --- Regular blockquotes (> text) ---
    if (trimmed.startsWith("> ")) {
      const text = trimmed.replace(/^> /gm, "").trim();
      return `<blockquote class="post-blockquote"><p>${processInline(text)}</p></blockquote>`;
    }

    // --- Tables: rows like | col1 | col2 | ---
    if (trimmed.startsWith("|")) {
      const lines = trimmed.split("\n");
      if (lines.every((l) => l.trim().startsWith("|"))) {
        let output = '<div class="post-table-wrapper"><table class="post-table">';
        let hasHeader = false;
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          const cells = line.split("|").map((c) => c.trim()).filter((c) => c.length > 0);
          if (cells.length === 0) continue;
          if (cells.every((c) => /^-+$/.test(c))) {
            hasHeader = true;
            continue;
          }
          const processed = cells.map((c) => processInline(c));
          const tag = (!hasHeader && i === 0) || (hasHeader && i === 0) ? "th" : "td";
          if (tag === "td" && !output.includes("<tbody>")) output += "<tbody>";
          output += `<tr>${processed.map((c) => `<${tag}>${c}</${tag}>`).join("")}</tr>`;
        }
        if (output.includes("<tbody>")) output += "</tbody>";
        output += "</table></div>";
        return output;
      }
    }

    // --- Unordered list (- item) ---
    if (/^- .+/.test(trimmed)) {
      const items = trimmed.split("\n").filter((l) => l.startsWith("- ")).map((l) => {
        const text = l.replace(/^- /, "");
        return `<li>${processInline(text)}</li>`;
      });
      return `<ul class="post-ul">${items.join("")}</ul>`;
    }

    // --- Paragraph (default) ---
    return `<p class="post-p">${processInline(trimmed.replace(/\n/g, "<br/>"))}</p>`;
  });

  return result.join("\n");
}

function extractFAQs(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];

  // Buscar la sección "## Preguntas frecuentes"
  const faqSection = content.match(/## Preguntas frecuentes[\s\S]*?(?=\n---|\n## |$)/);
  if (!faqSection) return [];

  // Extraer pares **¿Pregunta?** \n\n Respuesta
  const regex = /\*\*¿([^?]+)\?\*\*\n+([\s\S]*?)(?=\n\n\*\*¿|\n---|\n## |$)/g;
  let match;
  while ((match = regex.exec(faqSection[0])) !== null) {
    const answer = match[2].trim();
    if (answer) {
      faqs.push({
        question: match[1].trim(),
        answer,
      });
    }
  }
  return faqs;
}

function renderFAQsAsDropdowns(faqs: { question: string; answer: string }[]): string {
  if (faqs.length === 0) return "";
  
  let html = '<div class="post-faqs-section"><h2 class="post-h2">Preguntas frecuentes</h2><ul class="post-faqs-list">';
  
  faqs.forEach((faq, index) => {
    html += `
      <li>
        <details class="post-faq-item">
          <summary class="post-faq-question">${faq.question}</summary>
          <div class="post-faq-answer">${processInline(faq.answer)}</div>
        </details>
      </li>
    `;
  });
  
  html += '</ul></div>';
  return html;
}

function getServiceCta(tags: string[]): { text: string; url: string; label: string } | null {
  if (tags.some((t) => t.includes("rehabilitación") || t.includes("ayudas") || t.includes("subvenciones"))) {
    return {
      text: "¿Necesitas un análisis completo de viabilidad de tu proyecto de rehabilitación?",
      url: "/informe-tecnico-energetico/",
      label: "Solicitar Informe Técnico →",
    };
  }
  if (tags.some((t) => t.includes("compraventa") || t.includes("brown discount"))) {
    return {
      text: "¿Vas a comprar o vender? Descubre el valor real de tu vivienda con nuestro Check-Up Inmobiliario.",
      url: "/check-up-inmobiliario/",
      label: "Solicitar Check-Up →",
    };
  }
  return {
    text: "¿No te fías de tu certificado energético? Por 59€ un técnico lo revisa y te dice si es correcto.",
    url: "/segunda-opinion/",
    label: "Revisar mi certificado →",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.tags, article.slug);
  const serviceCta = getServiceCta(article.tags);

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          <li>
            <Link href="/">Inicio</Link>
            <span className="sep">/</span>
          </li>
          <li>
            <Link href="/blog/">Blog</Link>
            <span className="sep">/</span>
          </li>
          <li aria-current="page">{article.title}</li>
        </ol>
      </nav>

      <article className="post">
        <header className="post-header">
          <p className="post-meta">
            {article.date} · {article.readingTime} min de lectura · Por{" "}
            {article.author}
          </p>
          <h1>{article.title}</h1>
          <div className="post-tags">
            {article.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <AutorBloque
          nombre="Eva María González García"
          credencial="Arquitecta Técnica · Colegiada CATEB 9457 · Seguro RC Profesional"
          descripcion="20 años de experiencia en certificación energética. Más de 1.000 expedientes tramitados en toda España mediante auditoría forense 100% online y remota."
        />

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
        />

        {extractFAQs(article.content).length > 0 && (
          <div
            className="post-faqs-wrapper"
            dangerouslySetInnerHTML={{ __html: renderFAQsAsDropdowns(extractFAQs(article.content)) }}
          />
        )}

        {serviceCta && (
          <div className="post-cta" style={{ marginTop: "2rem" }}>
            <p>{serviceCta.text}</p>
            <a href={serviceCta.url} className="btn-primary">
              {serviceCta.label}
            </a>
          </div>
        )}

      </article>

      {related.length > 0 && (
        <section className="related">
          <h2>También te puede interesar</h2>
           <div className="related-grid">
             {related.map((r) => (
               <div key={r.slug} className="related-card">
                 <h3>
                   <Link href={`/blog/${r.slug}/`}>{r.title}</Link>
                 </h3>
                 <p>{r.excerpt}</p>
               </div>
             ))}
           </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.date,
            dateModified: article.date,
            author: {
              "@type": "Person",
              name: article.author,
              url: "https://www.certilab.cat/sobre-nosotros/",
              sameAs: ["https://www.linkedin.com/in/eva-mar%C3%ADa-gonz%C3%A1lez-garcia-7a53a094/"],
            },
            publisher: {
              "@type": "Organization",
              name: "Certilab",
              url: "https://www.certilab.cat",
            },
            url: `https://www.certilab.cat/blog/${article.slug}/`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.certilab.cat/blog/${article.slug}/`,
            },
            image: article.image ?? "https://www.certilab.cat/og-image.jpg",
            articleSection: article.tags.length > 0 ? article.tags[0] : undefined,
          }),
        }}
      />

      {extractFAQs(article.content).length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: extractFAQs(article.content).map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}
    </>
  );
}