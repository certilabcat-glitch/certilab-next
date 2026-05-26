"use client";

interface Step {
  title: string;
  text: string;
}

interface StepsGridProps {
  steps: Step[];
  className?: string;
}

export default function StepsGrid({ steps, className = "" }: StepsGridProps) {
  return (
    <section className={`steps-wrapper ${className}`}>
      <div className="steps-grid">
        {steps.map((step, i) => (
          <div key={i} className="step">
            <div className="step-num">{i + 1}</div>
            <h4>{step.title}</h4>
            <p>{step.text}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 900px;
          margin: 3rem auto 0;
          padding: 0 1.5rem;
        }
        .step {
          text-align: left;
        }
        .step-num {
          width: 2.5rem;
          height: 2.5rem;
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-family: var(--font-serif);
          font-size: 0.9rem;
          color: var(--color-grey);
        }
        .step h4 {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-black);
          margin: 0.75rem 0 0.5rem;
        }
        .step p {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-grey);
          margin: 0;
          line-height: 1.6;
        }
        @media (min-width: 768px) {
          .steps-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
          }
          .step {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
