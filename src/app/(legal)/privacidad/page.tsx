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

      <h2>2. Información sobre el Tratamiento de Datos</h2>
      <p>
        En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), te informamos sobre cómo tratamos tus datos personales de forma transparente y segura.
      </p>

      <h2>3. Datos que Recopilamos</h2>
      <p>
        Al prestar nuestro servicio de consultoría de forma estrictamente telemática y sin visitas presenciales al inmueble, recopilamos los siguientes datos:
      </p>
      <ul>
        <li><strong>Datos de contacto:</strong> nombre, email, dirección postal.</li>
        <li><strong>Datos de la vivienda:</strong> ubicación, características técnicas, documentación aportada y certificado energético.</li>
        <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas, duración de la visita.</li>
        <li><strong>Datos de cookies:</strong> información sobre preferencias y comportamiento de navegación.</li>
      </ul>

      <h2>4. Finalidades del Tratamiento</h2>
      <p>
        Tratamos tus datos para:
      </p>
      <ul>
        <li>Prestar los servicios de auditoría y consultoría energética que solicites.</li>
        <li>Responder a tus consultas y solicitudes de información.</li>
        <li>Enviar información sobre nuestros servicios (siempre con tu consentimiento).</li>
        <li>Cumplir con nuestras obligaciones legales y fiscales.</li>
        <li>Mejorar la experiencia de usuario en el sitio web.</li>
        <li>Analizar el uso del sitio web mediante herramientas de analítica.</li>
      </ul>

      <h2>5. Base Legal del Tratamiento</h2>
      <p>
        El tratamiento de tus datos se basa en:
      </p>
      <ul>
        <li><strong>Consentimiento:</strong> cuando nos autorizas explícitamente (ej. envío de comunicaciones o uso de cookies).</li>
        <li><strong>Ejecución de contrato:</strong> para prestar los servicios técnicos que solicitas.</li>
        <li><strong>Obligación legal:</strong> para cumplir con las leyes aplicables (ej. normativas fiscales).</li>
        <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y garantizar la seguridad técnica.</li>
      </ul>

      <h2>6. Destinatarios de los Datos</h2>
      <p>
        Tus datos pueden ser compartidos con:
      </p>
      <ul>
        <li><strong>Proveedores de servicios:</strong> plataformas de hosting, email, pasarelas de pago y analítica web.</li>
        <li><strong>Autoridades públicas:</strong> únicamente cuando lo requiera la ley.</li>
        <li><strong>Profesionales colegiados:</strong> cuando sea estrictamente necesario para la prestación del servicio.</li>
      </ul>
      <p>
        <em>Nota:</em> No compartimos tus datos con terceros para fines comerciales sin tu consentimiento explícito.
      </p>

      <h2>7. Publicidad y Remarketing (Google, Meta y TikTok)</h2>
      <p>
        Este sitio web utiliza herramientas publicitarias y píxeles de seguimiento de terceros, incluyendo Google Ads, Meta (Facebook e Instagram) y TikTok. Estas plataformas y otros proveedores externos utilizan cookies y tecnologías similares para analizar el rendimiento de nuestras campañas y mostrar anuncios personalizados basados en las visitas y el comportamiento anterior de un usuario en nuestro sitio web.
      </p>
      <p>
        Los usuarios pueden gestionar sus preferencias o inhabilitar el uso de datos para publicidad personalizada directamente en las plataformas correspondientes:
      </p>
      <ul>
        <li><strong>Google:</strong> Accediendo a la <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Configuración de anuncios de Google</a>.</li>
        <li><strong>Meta (Facebook/Instagram):</strong> A través de la <a href="https://www.facebook.com/adpreferences/ad_settings" target="_blank" rel="noopener noreferrer">Configuración de anuncios de tu cuenta</a>.</li>
        <li><strong>TikTok:</strong> Desde los ajustes de privacidad de la aplicación o consultando su <a href="https://www.tiktok.com/legal/cookie-policy" target="_blank" rel="noopener noreferrer">Política de Cookies</a>.</li>
      </ul>
      <p>
        Alternativamente, puedes inhabilitar el uso de cookies de proveedores externos para publicidad personalizada visitando <a href="http://www.aboutads.info" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
      </p>

      <h2>8. Período de Conservación</h2>
      <p>
        Conservamos tus datos durante:
      </p>
      <ul>
        <li><strong>Datos de contacto y facturación:</strong> mientras mantengas relación con nosotros y hasta 5 años posteriores para cumplir con obligaciones legales y fiscales.</li>
        <li><strong>Datos de navegación:</strong> máximo 12 meses.</li>
        <li><strong>Datos de cookies:</strong> según la configuración específica de cada cookie.</li>
      </ul>

      <h2>9. Tus Derechos</h2>
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
        Para ejercer estos derechos, contacta directamente con nosotros en <strong>{CONTACTO.email}</strong>.
      </p>

      <h2>10. Cookies</h2>
      <p>
        Utilizamos cookies para:
      </p>
      <ul>
        <li><strong>Cookies técnicas:</strong> esenciales para el funcionamiento del sitio web (obligatorias).</li>
        <li><strong>Cookies de analítica:</strong> para entender cómo usas el sitio (requieren consentimiento).</li>
        <li><strong>Cookies de marketing:</strong> para personalizar el contenido publicitario (requieren consentimiento).</li>
      </ul>
      <p>
        Puedes gestionar tus preferencias de cookies en cualquier momento a través de nuestro banner de consentimiento.
      </p>

      <h2>11. Seguridad de los Datos</h2>
      <p>
        Implementamos medidas técnicas y organizativas rigurosas para proteger tu información:
      </p>
      <ul>
        <li>Encriptación SSL/TLS en la transmisión de datos.</li>
        <li>Acceso restringido y seguro a los datos personales.</li>
        <li>Copias de seguridad regulares.</li>
        <li>Auditorías de seguridad periódicas.</li>
      </ul>

      <h2>12. Transferencias Internacionales</h2>
      <p>
        Algunos de nuestros proveedores de servicios (como sistemas de automatización o pasarelas de pago) pueden estar ubicados fuera de la UE. En todos estos casos, garantizamos que cumplen con estándares de protección equivalentes al RGPD (mediante cláusulas contractuales tipo u otros mecanismos legales aprobados).
      </p>

      <h2>13. Contacto y Reclamaciones</h2>
      <p>
        Para cualquier duda sobre esta política o para ejercer tus derechos:
      </p>
      <ul>
        <li><strong>Email:</strong> {CONTACTO.email}</li>
      </ul>
      <p>
        Si consideras que tus derechos no han sido debidamente respetados, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
      </p>

      <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}