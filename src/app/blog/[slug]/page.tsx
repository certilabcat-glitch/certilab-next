import Link from "next/link";
import { notFound } from "next/navigation";
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

function formatContent(content: string): string {
  return content
    .replace(/^## (.*)$/gm, '<h2 class="post-h2">$1</h2>')
    .replace(/^### (.*)$/gm, '<h3 class="post-h3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.*)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul class="post-ul">$&</ul>')
    .replace(/(<ul class="post-ul">){2,}/g, '<ul class="post-ul">')
    .replace(/(<\/ul>){2,}/g, "</ul>")
    .replace(/\n\n/g, '</p><p class="post-p">')
    .replace(/\n/g, "<br/>");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.tags, article.slug);

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

        <div className="post-cta">
          <p>
            ¿Tienes dudas sobre tu certificado energético?{" "}
            <strong>Consulta gratis por WhatsApp</strong>
          </p>
          <a
            href={waDiagnostico()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Consultar gratis →
          </a>
        </div>
      </article>

      {related.length > 0 && (
        <section className="related">
          <h2>Artículos relacionados</h2>
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
            author: {
              "@type": "Person",
              name: article.author,
            },
          }),
        }}
      />
    </>
  );
}