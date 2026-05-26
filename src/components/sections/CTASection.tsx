"use client";

import Link from "next/link";

interface CTASectionProps {
  title: string;
  text: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTASection({
  title,
  text,
  buttonText,
  buttonHref,
}: CTASectionProps) {
  return (
    <section className="cta-final" aria-labelledby="cta-title">
      <h2 id="cta-title">{title}</h2>
      <p>{text}</p>
      <Link href={buttonHref} className="btn-primary">
        {buttonText}
      </Link>

      <style jsx>{`
        .cta-final {
          text-align: center;
          padding: 7.5rem 1.5rem;
          border-top: 1px solid var(--color-border);
          background: var(--color-crema);
        }
        h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 1rem;
        }
        p {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          color: var(--color-grey);
          max-width: 480px;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }
        @media (max-width: 767px) {
          .cta-final {
            padding: 5rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
