import { CONTACTO } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Certilab",
  description: "Política de privacidad de Certilab. Información sobre cómo tratamos tus datos personales según RGPD.",
  robots: "index, follow",
};

export default function Privacidad() {
  return (
    <div className="legal-page">
      <h1>Política de Privacidad</h1>

      <h2>1. Responsable del Tratamiento</h2>
      <p>
        <strong>Denominación:</strong> Certilab
      </p>
      <p>
        <strong>Responsable:</strong> Eva María González García
      </p>
      <p>
        <strong>Email:</strong> {CONTACTO.email}
      </p>
      <p>
        <strong>Teléfono:</strong> {CONTACTO.telefonoFormateado}
      </p>

      <h2>2. Información sobre el Tratamiento de Datos</h2>
      <p>
        En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), te informamos sobre cómo tratamos tus datos personales.
      </p>

      <h2>3. Datos que Recopilamos</h2>
      <p>
        Recopilamos los siguientes datos personales:
      </p>
      <ul>
        <li><strong>Datos de contacto:</strong> nombre, email, teléfono, dirección.</li>
        <li><strong>Datos de la vivienda:</strong> ubicación, características técnicas, certificado energético.</li>
        <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas, duración de la visita.</li>
        <li><strong>Datos de cookies:</strong> información sobre preferencias y comportamiento de navegación.</li>
      </ul>

      <h2>4. Finalidades del Tratamiento</h2>
      <p>
        Tratamos tus datos para:
      </p>
      <ul>
        <li>Prestar los servicios de consultoría energética que solicites.</li>
        <li>Responder a tus consultas y solicitudes de información.</li>
        <li>Enviar información sobre nuestros servicios (con tu consentimiento).</li>
        <li>Cumplir obligaciones legales y fiscales.</li>
        <li>Mejorar la experiencia de usuario en el sitio web.</li>
        <li>Analizar el uso del sitio web mediante herramientas de analítica.</li>
      </ul>

      <h2>5. Base Legal del Tratamiento</h2>
      <p>
        El tratamiento de tus datos se basa en:
      </p>
      <ul>
        <li><strong>Consentimiento:</strong> cuando nos autorizas explícitamente.</li>
        <li><strong>Ejecución de contrato:</strong> para prestar los servicios que solicitas.</li>
        <li><strong>Obligación legal:</strong> para cumplir con leyes aplicables.</li>
        <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y seguridad.</li>
      </ul>

      <h2>6. Destinatarios de los Datos</h2>
      <p>
        Tus datos pueden ser compartidos con:
      </p>
      <ul>
        <li><strong>Proveedores de servicios:</strong> hosting, email, analítica web.</li>
        <li><strong>Autoridades públicas:</strong> cuando lo requiera la ley.</li>
        <li><strong>Profesionales colegiados:</strong> cuando sea necesario para la prestación del servicio.</li>
      </ul>
      <p>
        No compartimos tus datos con terceros para fines comerciales sin tu consentimiento.
      </p>

      <h2>7. Período de Conservación</h2>
      <p>
        Conservamos tus datos durante:
      </p>
      <ul>
        <li><strong>Datos de contacto:</strong> mientras mantengas relación con nosotros + 3 años (obligación fiscal).</li>
        <li><strong>Datos de navegación:</strong> máximo 12 meses.</li>
        <li><strong>Datos de cookies:</strong> según la configuración de cada cookie.</li>
      </ul>

      <h2>8. Tus Derechos</h2>
      <p>
        Tienes derecho a:
      </p>
      <ul>
        <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti.</li>
        <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
        <li><strong>Supresión:</strong> solicitar la eliminación de tus datos (&ldquo;derecho al olvido&rdquo;).</li>
        <li><strong>Limitación:</strong> restringir el tratamiento de tus datos.</li>
        <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
        <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
      </ul>
      <p>
        Para ejercer estos derechos, contacta con nosotros en {CONTACTO.email}.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Utilizamos cookies para:
      </p>
      <ul>
        <li><strong>Cookies técnicas:</strong> funcionamiento del sitio web (obligatorias).</li>
        <li><strong>Cookies de analítica:</strong> entender cómo usas el sitio (con consentimiento).</li>
        <li><strong>Cookies de marketing:</strong> personalizar contenido (con consentimiento).</li>
      </ul>
      <p>
        Puedes gestionar tus preferencias de cookies en cualquier momento a través del banner de consentimiento.
      </p>

      <h2>10. Seguridad de los Datos</h2>
      <p>
        Implementamos medidas técnicas y organizativas para proteger tus datos:
      </p>
      <ul>
        <li>Encriptación SSL/TLS en la transmisión de datos.</li>
        <li>Acceso restringido a datos personales.</li>
        <li>Copias de seguridad regulares.</li>
        <li>Auditorías de seguridad periódicas.</li>
      </ul>

      <h2>11. Transferencias Internacionales</h2>
      <p>
        Algunos proveedores de servicios pueden estar ubicados fuera de la UE. En estos casos, garantizamos que cumplen con estándares de protección equivalentes al RGPD.
      </p>

      <h2>12. Cambios en esta Política</h2>
      <p>
        Nos reservamos el derecho de actualizar esta política de privacidad. Los cambios serán efectivos desde su publicación en el sitio web.
      </p>

      <h2>13. Contacto y Reclamaciones</h2>
      <p>
        Para cualquier duda sobre esta política o para ejercer tus derechos:
      </p>
      <ul>
        <li>Email: {CONTACTO.email}</li>
        <li>Teléfono: {CONTACTO.telefonoFormateado}</li>
        <li>Formulario de contacto: disponible en el sitio web</li>
      </ul>
      <p>
        Si consideras que tus derechos no han sido respetados, puedes presentar una reclamación ante la Autoridad de Protección de Datos (AEPD) en www.aepd.es.
      </p>

      <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}
