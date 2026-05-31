"use client";

"use client";

import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              item: `https://www.certilab.cat${item.href}`,
            })),
          }),
        }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {items.map((item, i) =>
            i < items.length - 1 ? (
              <li key={item.href}>
                <Link href={item.href}>{item.name}</Link>
                <span className="sep">/</span>
              </li>
            ) : (
              <li key={item.href} aria-current="page">
                {item.name}
              </li>
            )
          )}
        </ol>
      </nav>

      <style jsx>{`
        .breadcrumbs {
          max-width: 1100px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
        }
        ol {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--color-grey);
        }
        a {
          color: var(--color-terra);
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        .sep {
          margin-left: 0.5rem;
          color: var(--color-border);
        }
      `}</style>
    </>
  );
}
