"use client";

import Link from "next/link";

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  badges?: string[];
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  price?: string;
  credentials?: string;
  nota?: string;
  children?: React.ReactNode;
}

export default function HeroSection({
  eyebrow,
  title,
  subtitle,
  badges,
  ctaPrimary,
  ctaSecondary,
  price,
  credentials,
  nota,
  children,
}: HeroSectionProps) {
  return (
    <header className="hero" role="banner">
      {eyebrow && <p className="hero-eyebrow">{eyebrow}</p>}
      <h1
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && <p className="hero-sub">{subtitle}</p>}
      {badges && badges.length > 0 && (
        <div className="hero-badges">
          {badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      )}
      {price && <p className="hero-price">{price}</p>}
      {credentials && <p className="hero-credentials">{credentials}</p>}
      {(ctaPrimary || ctaSecondary) && (
        <div className="hero-ctas">
          {ctaPrimary && (
            <Link href={ctaPrimary.href} className="btn-primary">
              {ctaPrimary.label}
            </Link>
          )}
          {ctaSecondary && (
            <Link href={ctaSecondary.href} className="btn-ghost">
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      )}
      {nota && <p className="hero-nota">{nota}</p>}
      {children}

      <style jsx>{`
        .hero {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 6rem 1.5rem;
          background: var(--color-crema);
        }
        .hero-eyebrow {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-grey);
          margin-bottom: 1.5rem;
          font-weight: 400;
        }
        .hero h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 300;
          line-height: 1.1;
          color: var(--color-black);
          max-width: 800px;
          margin: 0 auto 1.5rem;
        }
        .hero-sub {
          font-family: var(--font-sans);
          font-size: 1.15rem;
          font-weight: 400;
          color: var(--color-dark);
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto 2.5rem;
        }
        .hero-badges {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .hero-badges span {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          padding: 0.4rem 1rem;
          border: 1px solid var(--color-border);
        }
        .hero-price {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.5rem);
          color: var(--color-terra);
          margin: 1rem 0;
        }
        .hero-credentials {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--color-grey);
          margin: 1rem 0;
          line-height: 1.6;
        }
        .hero-ctas {
          display: flex;
          gap: 2rem;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hero-nota {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--color-grey);
          margin-top: 2rem;
          max-width: 500px;
        }
        @media (max-width: 767px) {
          .hero {
            min-height: 70vh;
            padding: 4rem 1.5rem;
          }
        }
      `}</style>
    </header>
  );
}
