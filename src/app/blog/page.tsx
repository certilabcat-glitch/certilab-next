import Link from "next/link";
import { articles } from "@/data/articles";
import "./blog.css";

export default function BlogPage() {
  return (
    <>
      <header className="blog-header">
        <h1>Blog de Consultoría Energética</h1>
        <p>
          Artículos sobre certificación energética, eficiencia en edificios,
          ayudas, normativa y todo lo que necesitas saber para tomar decisiones
          informadas sobre tu vivienda.
        </p>
      </header>

      <div className="blog-grid">
        {articles.map((article) => (
          <article key={article.slug} className="blog-card">
            <p className="meta">
              {article.date} · {article.readingTime} min de lectura
            </p>
            <h2>
              <Link href={`/blog/${article.slug}/`}>{article.title}</Link>
            </h2>
            <p>{article.excerpt}</p>
            <div className="tags">
              {article.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/blog/${article.slug}/`}
              className="read-more"
            >
              Leer artículo →
            </Link>
          </article>
        ))}
      </div>


    </>
  );
}
