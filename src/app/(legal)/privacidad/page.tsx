import type { Metadata } from "next";
import "../legal.css";

export const metadata: Metadata = {
  title: "Política de Privacidad | Certilab",
  description: "Política de privacidad de Certilab. Protección de datos personales según RGPD.",
  alternates: { canonical: "https://www.certilab.cat/privacidad/" },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <main className="legal-page">
      <div className="legal-content">
        <h1>Política de Privacidad</h1>
        <p className="legal-update">Última actualización: mayo 2026</p>

        <h2>1. Responsable del tratamiento</h2>
        <p><strong>Identidad:</strong> Eva María González García (Certilab)</p>
        <p><strong>Colegiada:</strong> Cateb nº 9457</p>
        <p><strong>Contacto:</strong> A través del formulario de la web o WhatsApp</p>

        <h2>2. Finalidad del tratamiento</h2>
        <p>Tratamos los datos personales que nos proporcionas con las siguientes finalidades:</p>
        <ul>
          <li>Gestionar la solicitud de servicios de consultoría energética</li>
          <li>Responder a consultas y comunicaciones vía WhatsApp</li>
          <li>Envío de informes técnicos y documentación profesional</li>
          <li>Cumplir con obligaciones legales y deontológicas</li>
        </ul>

        <h2>3. Base legal</h2>
        <p>La base legal para el tratamiento de tus datos es el consentimiento explícito que nos otorgas al contactarnos, así como la ejecución de un contrato de servicios profesionales.</p>

        <h2>4. Conservación de datos</h2>
        <p>Conservamos tus datos personales durante el tiempo necesario para cumplir con la finalidad para la que se recogieron y durante el plazo legal exigido (5 años desde la finalización del servicio, según normativa fiscal).</p>

        <h2>5. Destinatarios</h2>
        <p>No cedemos datos personales a terceros, salvo obligación legal. Los datos se almacenan en infraestructura cifrada con acceso restringido.</p>

        <h2>6. Derechos</h2>
        <p>Tienes derecho a acceder, rectificar, suprimir, limitar el tratamiento, oponerte y portar tus datos. Puedes ejercerlos contactando a través de la web.</p>

        <h2>7. Cookies</h2>
        <p>Utilizamos cookies técnicas esenciales y, con tu consentimiento, Meta Pixel para medición de audiencia. Puedes configurar tus preferencias en nuestra <a href="/cookies/">política de cookies</a>.</p>
      </div>


    </main>
  );
}
