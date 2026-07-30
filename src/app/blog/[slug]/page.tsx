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
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title.length > 48 ? { absolute: article.title } : article.title,
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
      images: [{ url: article.image ?? "https://www.certilab.cat/og-image.jpg", width: 1200, height: 630, alt: article.title }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.image ?? "https://www.certilab.cat/og-image.jpg"] },
  };
}

function processInline(text: string): string {
  let t = text;
  t = t.replace(/\*\*([\s\S]*?)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(?<!\*)\*(?!\*)([\s\S]*?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m: string, linkText: string, url: string) => `<a href="${url}" class="post-link">${linkText}</a>`);
  return t;
}

function formatContent(raw: string): string {
  const textToProcess = raw.replace(/## Preguntas frecuentes[\s\S]*?(?=\n---|\n## |$)/, "");
  const blocks = textToProcess.split("\n\n");

  return blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    if (trimmed === "[cta:segunda-opinion]") return `<div class="post-cta-inline"><div class="post-cta-inline-icon">🔍</div><div class="post-cta-inline-body"><p><strong>¿No te fías de tu certificado energético?</strong> Por 59€ un técnico lo revisa y te dice si es correcto.</p><a href="/segunda-opinion/" class="post-cta-inline-link">Revisar mi certificado →</a></div></div>`;
    const tldrMatch = trimmed.match(/^\*\*TL;DR:\*\*([\s\S]*)$/);
    if (tldrMatch) return `<div class="post-tldr"><strong>TL;DR:</strong>${processInline(tldrMatch[1])}</div>`;
    if (/^---$/.test(trimmed)) return '<hr class="post-hr" />';
    if (trimmed.startsWith("## ")) return `<h2 class="post-h2">${processInline(trimmed.replace("## ", ""))}</h2>`;
    if (trimmed.startsWith("### ")) return `<h3 class="post-h3">${processInline(trimmed.replace("### ", ""))}</h3>`;

    const calloutMatch = trimmed.match(/^>\s*(⚠️|💡|✅|📌|🚨|❌|ℹ️|💰)\s*([\s\S]*)$/);
    if (calloutMatch) {
      const cls = "callout-default";
      return `<div class="post-callout ${cls}"><span class="callout-icon">${calloutMatch[1]}</span><div class="callout-body">${processInline(calloutMatch[2])}</div></div>`;
    }
    if (trimmed.startsWith("> ")) return `<blockquote class="post-blockquote"><p>${processInline(trimmed.replace(/^> /gm, "").trim())}</p></blockquote>`;

    if (trimmed.startsWith("|")) {
      const lines = trimmed.split("\n");
      let output = '<div class="post-table-wrapper"><table class="post-table">';
      const headerCells = lines[0].split("|").filter(c => c.trim().length > 0);
      const headers = headerCells.map(c => processInline(c.trim()).replace(/<[^>]*>/g, ""));

      output += `<thead><tr>${headerCells.map(c => `<th>${processInline(c.trim())}</th>`).join("")}</tr></thead>`;

      output += "<tbody>";
      for (let i = 1; i < lines.length; i++) {
        const cells = lines[i].split("|").filter(c => c.trim().length > 0);
        if (cells.length === 0) continue;
        if (cells.length >= 1 && /^:?-{3,}:?$/.test(cells[0].trim())) continue;
        output += `<tr>${cells.map((c, j) => {
          const label = headers[j] || "";
          return `<td data-label="${label}">${processInline(c.trim())}</td>`;
        }).join("")}</tr>`;
      }
      output += "</tbody>";


      return output + '</table></div>';
    }
    if (trimmed.startsWith("- ")) return `<ul class="post-ul">${trimmed.split("\n").filter(l => l.startsWith("- ")).map(l => `<li>${processInline(l.replace("- ", ""))}</li>`).join("")}</ul>`;
    return `<p class="post-p">${processInline(trimmed.replace(/\n/g, "<br/>"))}</p>`;
  }).join("\n");
}

function extractFAQs(content: string): { question: string; answer: string }[] {
  const faqSection = content.match(/## Preguntas frecuentes[\s\S]*?(?=\n---|\n## |$)/);
  if (!faqSection) return [];
  const regex = /\*\*¿([^?]+)\?\*\*\n+([\s\S]*?)(?=\n\n\*\*¿|\n---|\n## |$)/g;
  let match; const faqs: { question: string; answer: string }[] = [];
  while ((match = regex.exec(faqSection[0])) !== null) faqs.push({ question: match[1].trim(), answer: match[2].trim() });
  return faqs;
}

function renderFAQsAsDropdowns(faqs: { question: string; answer: string }[]): string {
  if (faqs.length === 0) return "";
  return `<div class="post-faqs-section"><h2 class="post-h2">Preguntas frecuentes</h2><ul class="post-faqs-list">${faqs.map(faq => `<li><details class="post-faq-item"><summary class="post-faq-question">${faq.question}</summary><div class="post-faq-answer">${processInline(faq.answer)}</div></details></li>`).join("")}</ul></div>`;
}

function getServiceCta(tags: string[]) {
  if (tags.some((t) => t.includes("rehabilitación") || t.includes("ayudas"))) return { text: "¿Necesitas análisis de viabilidad?", url: "/informe-tecnico-energetico/", label: "Solicitar Informe →" };
  return { text: "¿No te fías de tu certificado?", url: "/segunda-opinion/", label: "Revisar mi certificado →" };
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
            <li><Link href="/">Inicio</Link> <span className="sep">/</span></li>
            <li><Link href="/blog/">Blog</Link> <span className="sep">/</span></li>
            <li aria-current="page">{article.title}</li>
        </ol>
      </nav>

      <article className="post">
        <header className="post-header">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="post-image"
              width={1200}
              height={630}
              loading="eager"
            />
          )}
          <p className="post-meta">{article.date} · {article.readingTime} min de lectura</p>
          <h1>{article.title}</h1>
        </header>

        <AutorBloque nombre="Eva María González García" credencial="Arquitecta Técnica" descripcion="20 años de experiencia." />

        <div className="post-content" dangerouslySetInnerHTML={{ __html: formatContent(article.content) }} />

        {extractFAQs(article.content).length > 0 && (
          <div className="post-faqs-wrapper" dangerouslySetInnerHTML={{ __html: renderFAQsAsDropdowns(extractFAQs(article.content)) }} />
        )}

        {serviceCta && (
          <div className="post-cta my-8">
            <p>{serviceCta.text}</p>
            <a href={serviceCta.url} className="btn-primary">{serviceCta.label}</a>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="related">
          <h2>También te puede interesar</h2>
          <div className="related-grid">
            {related.map((r) => (
              <div key={r.slug} className="related-card">
                <h3><Link href={`/blog/${r.slug}/`}>{r.title}</Link></h3>
              </div>
            ))}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: article.title, author: { "@type": "Person", name: article.author } }) }} />
      {extractFAQs(article.content).length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: extractFAQs(article.content).map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }) }} />
      )}
    </>
  );
}