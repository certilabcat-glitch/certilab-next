"use client";

interface IncludesBoxProps {
  title?: string;
  items: string[];
}

export default function IncludesBox({
  title = "Incluye",
  items,
}: IncludesBoxProps) {
  return (
    <div className="includes-box">
      <h3>{title}</h3>
      <ul className="includes-list">
        {items.map((item, i) => (
          <li key={i}>
            <span className="check">✓</span> {item}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .includes-box {
          border: 1px solid var(--color-border);
          padding: 2.5rem;
          margin: 2rem 0 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .includes-box h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--color-terra);
          margin-bottom: 1rem;
        }
        .includes-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .includes-list li {
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--color-border);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-black);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .includes-list li:last-child {
          border-bottom: none;
        }
        .check {
          color: var(--color-terra);
          font-weight: 400;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
