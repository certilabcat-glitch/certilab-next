"use client";

import Link from "next/link";
import styles from "./CTASection.module.css";

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
    <section className={styles.section} aria-labelledby="cta-title">
      <h2 id="cta-title" className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
      <Link href={buttonHref} className="btn-primary">
        {buttonText}
      </Link>
    </section>
  );
}
