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
        .section {
          padding: 7.5rem 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 0.75rem;
        }
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
        @media (max-width: 767px) {
          .section {
            padding: 5rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
