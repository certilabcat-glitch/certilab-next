"use client";

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
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature">
            <p className="feature-num">{f.num}</p>
            <h4>{f.title}</h4>
            <p>{f.text}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0 3rem;
        }
        .feature {
          border: 1px solid var(--color-border);
          padding: 2rem;
        }
        .feature-num {
          font-family: var(--font-serif);
          font-size: 0.9rem;
          color: var(--color-grey);
          margin-bottom: 0.75rem;
        }
        .feature h4 {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .feature p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
