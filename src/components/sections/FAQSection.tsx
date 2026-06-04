"use client";

import { useState } from "react";
import type { FAQItem } from "@/types/service";

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
  className?: string;
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
      <div className="faq-list" role="list">
        {items.map((item, index) => (
          <details
            key={index}
            open={openIndex === index}
            onToggle={(e) => {
              if ((e.target as HTMLDetailsElement).open) {
                setOpenIndex(index);
              }
            }}
          >
            <summary>{item.q}</summary>
            <p dangerouslySetInnerHTML={{ __html: item.a }} />
          </details>
        ))}
      </div>

      <style jsx>{`
        .faq-list {
          max-width: 680px;
          margin: 3rem auto 0;
        }
        details {
          border-top: 1px solid var(--color-border);
          padding: 1.2rem 0;
        }
        details:last-of-type {
          border-bottom: 1px solid var(--color-border);
        }
        summary {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-black);
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        summary::-webkit-details-marker {
          display: none;
        }
        details p {
          margin: 1rem 0 0;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-grey);
          line-height: 1.7;
        }
        details a {
          color: var(--color-black);
          text-decoration: underline;
        }
      `}</style>
      </section>
    </>
  );
}


