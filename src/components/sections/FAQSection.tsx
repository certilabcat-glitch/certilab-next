"use client";

import { useState, useMemo } from "react";
import type { FAQItem } from "@/types/service";
import styles from "./FAQSection.module.css";

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
  className?: string;
}

/** Permite solo etiquetas HTML seguras: <strong>, <a>, <br>, <em> */
function sanitizeHTML(html: string): string {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*on\w+\s*=\s*["'][^"']*["'][^>]*>/gi, "")
    .replace(/<(\/?(?:strong|a|br|em|b|i|u)\b)[^>]*>/gi, "<$1>")
    .replace(/<(?![\/]?(?:strong|a|br|em|b|i|u)\b)[^>]*>/gi, "");
}

export default function FAQSection({
  title = "Preguntas frecuentes",
  items,
  className = "",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Schema.org FAQPage */}
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a.replace(/<[^>]*>/g, ""),
                },
              })),
            }),
          }}
        />
      )}
      <section className={`section ${className}`} aria-labelledby="faq-title">
      <h2 className="section-title" id="faq-title">
        {title}
      </h2>
      <div className={styles.faqList} role="list">
        {items.map((item, index) => (
          <details
            key={index}
            className={styles.details}
            open={openIndex === index}
            onToggle={(e) => {
              if ((e.target as HTMLDetailsElement).open) {
                setOpenIndex(index);
              }
            }}
          >
            <summary className={styles.summary}>{item.q}</summary>
            <p className={styles.answer} dangerouslySetInnerHTML={{ __html: sanitizeHTML(item.a) }} />
          </details>
        ))}
      </div>
      </section>
    </>
  );
}


