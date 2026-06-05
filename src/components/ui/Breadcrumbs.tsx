"use client";

import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

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
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <ol>
          {items.map((item, i) =>
            i < items.length - 1 ? (
              <li key={item.href}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ) : (
              <li key={item.href} aria-current="page">
                {item.name}
              </li>
            )
          )}
        </ol>
      </nav>
    </>
  );
}
