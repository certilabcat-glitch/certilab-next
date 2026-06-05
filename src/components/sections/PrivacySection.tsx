"use client";

import styles from "./PrivacySection.module.css";

export default function PrivacySection() {
  const items = [
    {
      icon: "🏠",
      title: "Sin extraños en su casa",
      text: "Metodología 100% remota. Usted no abre su puerta a desconocidos. Nadie entra en su hogar. El vendedor ni se entera.",
    },
    {
      icon: "📄",
      title: "Usted controla la información",
      text: "Solo comparte los documentos que considera necesarios. Sin presiones. Sin requerimientos excesivos.",
    },
    {
      icon: "🔒",
      title: "Blindaje documental",
      text: "Su expediente se cifra de extremo a extremo. Sello profesional Cateb 9457 en cada página. Trazabilidad completa.",
    },
    {
      icon: "⚖️",
      title: "Secreto profesional",
      text: "Arquitecta técnica colegiada sujeta a código deontológico. Sus datos no se comparten. Confidencialidad absoluta.",
    },
  ];

  return (
    <section className="section privacidad-section" aria-labelledby="privacidad-title">
      <h2 className="section-title" id="privacidad-title">
        Privacidad por Diseño · Blindaje Documental
      </h2>
      <p className="section-sub">
        Nuestra metodología 100% remota no solo protege su intimidad: convierte
        cada análisis en un expediente con cadena de custodia profesional.
      </p>
      <div className={styles.privacidadGrid}>
        {items.map((item) => (
          <div key={item.title} className={styles.privacidadCard}>
            <p className={styles.privacidadIcono}>{item.icon}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
