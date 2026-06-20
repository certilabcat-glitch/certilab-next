import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | Certilab",
  description: "Política de cookies de Certilab. Información sobre las cookies que utilizamos en nuestro sitio web.",
  robots: "index, follow",
};

export default function Cookies() {
  return (
    <div className="legal-page">
      <h1>Política de Cookies</h1>

      <h2>1. ¿Qué son las Cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan para recordar información sobre tu navegación y preferencias.
      </p>

      <h2>2. Tipos de Cookies que Utilizamos</h2>

      <h3>2.1 Cookies Técnicas (Obligatorias)</h3>
      <p>
        Estas cookies son esenciales para el funcionamiento del sitio web. Sin ellas, no podríamos prestar nuestros servicios correctamente.
      </p>
      <ul>
        <li><strong>Sesión:</strong> mantienen tu sesión activa mientras navegas.</li>
        <li><strong>Seguridad:</strong> protegen contra accesos no autorizados.</li>
        <li><strong>Preferencias:</strong> recuerdan tus ajustes (idioma, tema, etc.).</li>
      </ul>

      <h3>2.2 Cookies de Analítica</h3>
      <p>
        Utilizamos Google Analytics para entender cómo usas el sitio web. Estas cookies recopilan información anónima sobre:
      </p>
      <ul>
        <li>Páginas visitadas.</li>
        <li>Duración de la visita.</li>
        <li>Dispositivo utilizado.</li>
        <li>Ubicación geográfica (aproximada).</li>
      </ul>
      <p>
        <strong>Necesitan tu consentimiento.</strong> Puedes rechazarlas sin afectar el funcionamiento del sitio.
      </p>

      <h3>2.3 Cookies de Marketing</h3>
      <p>
        Utilizamos cookies de terceros para:
      </p>
      <ul>
        <li>Mostrar anuncios relevantes en otros sitios web.</li>
        <li>Medir la efectividad de campañas publicitarias.</li>
        <li>Personalizar contenido según tus intereses.</li>
      </ul>
      <p>
        <strong>Necesitan tu consentimiento.</strong> Puedes rechazarlas sin problemas.
      </p>

      <h2>3. Cookies de Terceros</h2>
      <p>
        Algunos servicios que utilizamos pueden instalar sus propias cookies:
      </p>
      <ul>
        <li><strong>Google Analytics:</strong> analítica web (analytics.google.com).</li>
        <li><strong>Meta Pixel:</strong> seguimiento de conversiones (facebook.com).</li>
        <li><strong>Vercel Analytics:</strong> rendimiento del sitio (vercel.com).</li>
      </ul>

      <h2>4. Duración de las Cookies</h2>
      <ul>
        <li><strong>Cookies de sesión:</strong> se eliminan al cerrar el navegador.</li>
        <li><strong>Cookies persistentes:</strong> se mantienen hasta 12 meses.</li>
        <li><strong>Cookies de analítica:</strong> se mantienen hasta 2 años.</li>
      </ul>

      <h2>5. Cómo Gestionar tus Cookies</h2>

      <h3>5.1 A través de Certilab</h3>
      <p>
        Puedes gestionar tus preferencias de cookies en cualquier momento usando el banner de consentimiento que aparece al entrar en el sitio web.
      </p>

      <h3>5.2 A través de tu Navegador</h3>
      <p>
        Puedes configurar tu navegador para:
      </p>
      <ul>
        <li>Rechazar todas las cookies.</li>
        <li>Aceptar solo cookies de sesión.</li>
        <li>Eliminar cookies al cerrar el navegador.</li>
      </ul>
      <p>
        Instrucciones para navegadores populares:
      </p>
      <ul>
        <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
        <li><strong>Firefox:</strong> Preferencias → Privacidad → Cookies</li>
        <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
        <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
      </ul>

      <h2>6. Impacto de Rechazar Cookies</h2>
      <p>
        Si rechazas las cookies:
      </p>
      <ul>
        <li><strong>Cookies técnicas:</strong> el sitio web podría no funcionar correctamente.</li>
        <li><strong>Cookies de analítica:</strong> no podremos mejorar el sitio basándonos en tu uso.</li>
        <li><strong>Cookies de marketing:</strong> verás anuncios menos relevantes.</li>
      </ul>

      <h2>7. Cambios en esta Política</h2>
      <p>
        Nos reservamos el derecho de actualizar esta política de cookies. Los cambios serán efectivos desde su publicación en el sitio web.
      </p>

      <h2>8. Contacto</h2>
      <p>
        Para cualquier duda sobre esta política de cookies:
      </p>
      <ul>
        <li>Email: info@certilab.cat</li>
        <li>Teléfono: +34 722 437 675</li>
        <li>Formulario de contacto: disponible en el sitio web</li>
      </ul>

      <h2>9. Información Adicional</h2>
      <p>
        Para más información sobre cookies y privacidad en internet, puedes consultar:
      </p>
      <ul>
        <li><a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">Autoridad de Protección de Datos (AEPD)</a></li>
        <li><a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">About Cookies</a></li>
        <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">All About Cookies</a></li>
      </ul>

      <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}
