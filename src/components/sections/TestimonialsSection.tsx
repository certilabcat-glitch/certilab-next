"use client";

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Tenía un certificado con calificación B. La segunda opinión detectó que era una D inflada. El vendedor tuvo que bajarlo y negocié un descuento de 8.000€.",
    author: "Marc B.",
    role: "Comprador, Barcelona",
  },
  {
    text: "Rápido, profesional y muy claro. En 24h tenía el informe con los errores del certificado. Recomendable 100% antes de firmar nada.",
    author: "Anna S.",
    role: "Propietaria, Girona",
  },
  {
    text: "Me explicaron el Brown Discount de una forma que entendí. Por 39€ evitamos pagar de más en la hipoteca. Increíble.",
    author: "Javier L.",
    role: "Comprador, Tarragona",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" aria-label="Testimonios de clientes">
      <h2 className="section-title">Lo que dicen nuestros clientes</h2>
      <p className="section-sub">Personas como tú ya han confiado en nuestra revisión antes de tomar decisiones.</p>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <blockquote key={i} className="testimonial-card">
            <svg className="quote-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M10 11H6C5.44772 11 5 10.5523 5 10V7C5 6.44772 5.44772 6 6 6H9C9.55228 6 10 6.44772 10 7V11ZM10 11C10 13.5 8 16 6 17M14 11H18C18.5523 11 19 10.5523 19 10V7C19 6.44772 18.5523 6 18 6H15C14.4477 6 14 6.44772 14 7V11ZM14 11C14 13.5 16 16 18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="testimonial-text">{t.text}</p>
            <footer className="testimonial-footer">
              <div className="testimonial-avatar">{t.author.charAt(0)}</div>
              <div>
                <cite className="testimonial-author">{t.author}</cite>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>

      <style jsx>{`
        .testimonials-section {
          padding: 5rem 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .section-sub {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-grey);
          max-width: 550px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .testimonial-card {
          background: #fff;
          border: 1px solid var(--color-border);
          padding: 2rem;
          margin: 0;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .testimonial-card:hover {
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
        .quote-icon {
          color: var(--color-terra-light);
          margin-bottom: 1rem;
          opacity: 0.6;
        }
        .testimonial-text {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-dark);
          line-height: 1.7;
          flex: 1;
          margin: 0 0 1.5rem;
        }
        .testimonial-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-top: 1px solid var(--color-border);
          padding-top: 1rem;
        }
        .testimonial-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-terra-light);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          flex-shrink: 0;
        }
        .testimonial-author {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-black);
          font-style: normal;
          display: block;
        }
        .testimonial-role {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--color-grey);
          display: block;
        }
        @media (max-width: 767px) {
          .testimonials-section { padding: 3rem 1.5rem; }
          .testimonials-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}