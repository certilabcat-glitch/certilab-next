import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticle, getRelatedArticles } from "@/data/articles";
import { waDiagnostico } from "@/lib/wa";
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
    title: `${article.title} | Certilab`,
    description: article.excerpt,
    alternates: { canonical: `https://www.certilab.cat/blog/${slug}/` },
    openGraph: {
      title: `${article.title} | Certilab`,
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
      title: `${article.title} | Certilab`,
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
  // Inline links [text](url)
  t = t.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m: string, linkText: string, url: string) =>
      `<a href="${url}" class="post-link">${linkText}</a>`
  );
  return t;
}

function formatContent(raw: string): string {
  // Escape HTML first
  let html = escapeHtml(raw);

  // --- INLINE CTA: [cta:segunda-opinion] ---
  html = html.replace(
    /\[cta:segunda-opinion\]/g,
    '</p><div class="post-cta-inline"><div class="post-cta-inline-icon">🔍</div><div class="post-cta-inline-body"><p><strong>¿Tienes dudas sobre tu certificado energético?</strong> Solicita una Segunda Opinión y descubre si es correcto antes de que te cueste dinero.</p><a href="/segunda-opinion/" class="post-cta-inline-link">Pedir Segunda Opinión</a></div></div><p class="post-p">'
  );

  // --- PRE-PARSE (preserve TL;DR) ---
  html = html.replace(
    /^\*\*TL;DR:\*\*(.*)$/gm,
    '</p><div class="post-tldr"><strong>TL;DR:</strong>$1</div><p class="post-p">'
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, '</p><hr class="post-hr" /><p class="post-p">');

  // Headings (H2, H3)
  html = html.replace(/^## (.*)$/gm, '<h2 class="post-h2">$1</h2>');
  html = html.replace(/^### (.*)$/gm, '<h3 class="post-h3">$1</h3>');

  // Tables: detect rows like | col1 | col2 |
  // We'll process them in a multi-step: collect all consecutive table rows
  html = html.replace(
    /((?:\|.+\|\n?)+)/g,
    (match: string) => {
      const lines = match.trim().split("\n");
      // If any line doesn't start with |, skip
      if (!lines.every((l) => l.trim().startsWith("|"))) return match;
      let output = '<div class="post-table-wrapper"><table class="post-table">';
      let hasHeader = false;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const cells = line
          .split("|")
          .map((c) => c.trim())
          .filter((c) => c.length > 0);
        if (cells.length === 0) continue;
        // Detect separator row e.g. |---|---|
        if (cells.every((c) => /^-+$/.test(c))) {
          hasHeader = true;
          continue;
        }
        const processed = cells.map((c) => processInline(c));
        if (!hasHeader && i === 0) {
          output += `<thead><tr>${processed
            .map((c) => `<th>${c}</th>`)
            .join("")}</tr></thead>`;
        } else if (hasHeader && i === 0) {
          output += `<thead><tr>${processed
            .map((c) => `<th>${c}</th>`)
            .join("")}</tr></thead>`;
        } else {
          if (!output.includes("<tbody>")) output += "<tbody>";
          output += `<tr>${processed
            .map((c) => `<td>${c}</td>`)
            .join("")}</tr>`;
        }
      }
      if (output.includes("<tbody>")) output += "</tbody>";
      output += "</table></div>";
      return output;
    }
  );

  // Callout blockquotes: > ⚠️ text, > 💡 text, > ✅ text, etc.
  html = html.replace(
    /^>\s*(⚠️|💡|✅|📌|🚨|❌|ℹ️|💰)\s*(.*)$/gm,
    (_m: string, icon: string, text: string) => {
      const cls = icon === "⚠️" ? "callout-warning"
        : icon === "💡" ? "callout-tip"
        : icon === "✅" ? "callout-success"
        : icon === "📌" ? "callout-note"
        : icon === "🚨" ? "callout-danger"
        : icon === "❌" ? "callout-danger"
        : icon === "ℹ️" ? "callout-info"
        : icon === "💰" ? "callout-money"
        : "callout-default";
      return `</p><div class="post-callout ${cls}"><span class="callout-icon">${icon}</span><div class="callout-body">${processInline(text)}</div></div><p class="post-p">`;
    }
  );

  // Regular blockquotes (> text)
  html = html.replace(
    /^> (.*)$/gm,
    (_m: string, text: string) =>
      `</p><blockquote class="post-blockquote"><p>${processInline(text)}</p></blockquote><p class="post-p">`
  );

  // Unordered lists (- item)
  html = html.replace(/^- (.*)$/gm, (_m: string, text: string) => {
    return `<li>${processInline(text)}</li>`;
  });
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul class="post-ul">$&</ul>');
  html = html.replace(/(<ul class="post-ul">){2,}/g, '<ul class="post-ul">');
  html = html.replace(/(<\/ul>){2,}/g, "</ul>");

  // Paragraphs (split by double newlines)
  html = html.replace(/\n\n/g, '</p><p class="post-p">');
  // Remaining single newlines as <br/>
  html = html.replace(/\n/g, "<br/>");

  // Wrap in paragraph if not already wrapped
  if (!html.startsWith("<")) {
    html = `<p class="post-p">${html}</p>`;
  }

  // Clean empty paragraphs
  html = html.replace(/<p class="post-p"><\/p>/g, "");

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
  if (tags.some((t) => t.includes("errores") || t.includes("falso") || t.includes("guía") || t.includes("fraude"))) {
    return {
      text: "¿Tienes dudas sobre tu certificado energético? Solicita una Segunda Opinión.",
      url: "/segunda-opinion/",
      label: "Pedir Segunda Opinión →",
    };
  }
  return {
    text: "¿Tienes dudas con tu certificado energético? Te ayudamos.",
    url: "/segunda-opinion/",
    label: "Pedir Segunda Opinión →",
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

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
        />

        {serviceCta && (
          <div className="post-cta" style={{ marginTop: "2rem" }}>
            <p>{serviceCta.text}</p>
            <a href={serviceCta.url} className="btn-primary">
              {serviceCta.label}
            </a>
          </div>
        )}

        <div className="post-cta">
          <p>
            ¿Tienes dudas sobre tu certificado energético?{" "}
            <strong>Consulta gratis por WhatsApp</strong>
          </p>
          <a
            href={waDiagnostico()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Consultar gratis
          </a>
        </div>
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
              sameAs: ["https://www.linkedin.com/in/eva-mar%C3%ADa-gonz%C3%A1lez-gracia-7a53a094/"],
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
    </>
  );
}