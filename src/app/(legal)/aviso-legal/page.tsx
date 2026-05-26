import type { Metadata } from "next";
import "../legal.css";

export const metadata: Metadata = {
  title: "Aviso Legal | Certilab",
  description: "Aviso legal de Certilab. Información sobre titularidad, condiciones de uso y responsabilidades.",
  alternates: { canonical: "https://www.certilab.cat/aviso-legal/" },
  robots: { index: true, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <main className="legal-page">
      <div className="legal-content">
        <h1>Aviso Legal</h1>
        <p className="legal-update">Última actualización: mayo 2026</p>

        <h2>1. Titularidad</h2>
        <p><strong>Titular:</strong> Eva María González Gracia</p>
        <p><strong>Colegiada:</strong> Cateb nº 9457</p>
        <p><strong>Actividad:</strong> Arquitectura Técnica · Consultoría Energética Forense</p>
        <p><strong>Contacto:</strong> A través del formulario de la web</p>

        <h2>2. Propiedad intelectual</h2>
        <p>Todos los contenidos de esta web (textos, imágenes, diseño, logotipos) son propiedad de Certilab o se utilizan con licencia. Queda prohibida la reproducción total o parcial sin autorización expresa.</p>

        <h2>3. Responsabilidad</h2>
        <p>Los informes y análisis emitidos por Certilab tienen carácter de consultoría técnica forense. No constituyen un certificado energético oficial con registro en CCAA. El usuario es responsable de verificar la aplicabilidad de las recomendaciones a su caso concreto.</p>

        <h2>4. Enlaces externos</h2>
        <p>Esta web puede contener enlaces a sitios externos. Certilab no se responsabiliza del contenido ni de las políticas de privacidad de terceros.</p>

        <h2>5. Legislación aplicable</h2>
        <p>Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de la provincia de Barcelona.</p>
      </div>


    </main>
  );
}
