"use client";

import Link from "next/link";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  badges?: string[];
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  price?: string;
  priceOld?: string;
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
  priceOld,
  credentials,
  nota,
  children,
}: HeroSectionProps) {
  return (
    <header className={styles.hero} role="banner">
      {eyebrow && <p className={styles["hero-eyebrow"]}>{eyebrow}</p>}
      <h1
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && <p className={styles["hero-sub"]}>{subtitle}</p>}
      {badges && badges.length > 0 && (
        <div className={styles["hero-badges"]}>
          {badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      )}
      {(priceOld || price) && (
        <p className={styles["hero-price"]}>
          {priceOld && <span className={styles["hero-price-old"]}>{priceOld}</span>}
          {price && <span className={styles["hero-price-current"]}>{price}</span>}
        </p>
      )}
      {credentials && <p className={styles["hero-credentials"]}>{credentials}</p>}
      {(ctaPrimary || ctaSecondary) && (
        <div className={styles["hero-ctas"]}>
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
      {nota && <p className={styles["hero-nota"]}>{nota}</p>}
      {children}
    </header>
  );
}
