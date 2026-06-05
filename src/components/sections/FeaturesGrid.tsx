"use client";

import styles from "./FeaturesGrid.module.css";

interface Feature {
  num: string;
  title: string;
  text: string;
}

interface FeaturesGridProps {
  features: Feature[];
  className?: string;
}

export default function FeaturesGrid({ features, className = "" }: FeaturesGridProps) {
  return (
    <section className={`section ${className}`}>
      <div className={styles["features-grid"]}>
        {features.map((f, i) => (
          <div key={i} className={styles.feature}>
            <p className={styles["feature-num"]}>{f.num}</p>
            <h4>{f.title}</h4>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}