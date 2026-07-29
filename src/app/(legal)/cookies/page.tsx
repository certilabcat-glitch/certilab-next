import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | Certilab",
  description: "Política de Cookies de Certilab e ILHASA BUILDING, S.L. Información transparente sobre el uso de cookies en certilab.cat.",
  robots: "index, follow",
};

export default function CookiesPage() {
  return (
    <div className="legal-page">
      <h1>Política de Cookies</h1>

      <h2>1. ¿Qué es una Cookie y cuál es su función legal?</h2>
      <p>
        En cumplimiento del artículo 22.2 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
        Información y del Comercio Electrónico (LSSI-CE), y de las directrices de la Agencia Española de Protección
        de Datos (AEPD), informamos de que el sitio web certilab.cat, propiedad de <strong>ILHASA BUILDING, S.L.</strong>
        (CIF B64327810), utiliza tecnología de cookies o dispositivos similares de almacenamiento y recuperación de datos.
      </p>
      <p>
        Una cookie es un pequeño archivo de texto que un sitio web almacena en el navegador del usuario con el objetivo de
        facilitar la navegación, garantizar la seguridad técnica y permitir el correcto funcionamiento de las funciones web.
      </p>

      <h2>2. Arquitectura de Privacidad y Tipología de Cookies</h2>
      <p>
        certilab.cat opera bajo una arquitectura tecnológica minimalista enfocada en la protección de la privacidad del usuario.
        <strong> No utilizamos cookies publicitarias, de perfilado comercial ni rastreadores invasivos de terceros.</strong>
      </p>
      <p>
        Las cookies presentes en este sitio web se limitan exclusivamente a las siguientes categorías:
      </p>
      <ul>
        <li>
          <strong>Cookies técnicas y de funcionalidad esenciales (Exentas de consentimiento):</strong> Son aquellas
          estrictamente necesarias para el correcto funcionamiento web, permitir la navegación fluida, controlar el tráfico,
          mantener la seguridad técnica frente a ataques informáticos y recordar las preferencias básicas de visualización o
          el estado de aceptación legal del usuario.
        </li>
        <li>
          <strong>Cookies analíticas básicas (Anónimas y no invasivas):</strong> En caso de emplearse herramientas de medición
          técnica o estadísticas de tráfico para comprender qué contenidos del blog resultan de mayor utilidad para los clientes,
          estas operan procesando datos agregados y anónimos, sin identificar individualmente al usuario ni rastrear su actividad
          en otros sitios web.
        </li>
      </ul>

      <h2>3. Base Legitimadora y Exención de Consentimiento</h2>
      <p>
        Conforme a la normativa española y europea vigente, las cookies de carácter estrictamente técnico necesarias para
        la seguridad, carga y navegación del sitio web quedan <strong>exentas del requisito de consentimiento expreso</strong>
        por parte del usuario, amparándose su instalación en la ejecución técnica de la comunicación digital y en el interés
        legítimo del titular web.
      </p>
      <p>
        En el caso de eventuales cookies analíticas no esenciales, su instalación estará supeditada a la aceptación previa
        mediante el aviso o banner de configuración web.
      </p>

      <h2>4. Gestión, Configuración y Desactivación en el Navegador</h2>
      <p>
        Aunque las cookies técnicas son esenciales para cargar la web, el usuario tiene el derecho y la libertad de bloquear,
        restringir o eliminar las cookies instaladas en su equipo mediante las opciones de privacidad de su navegador web.
      </p>
      <p>
        Puede consultar cómo gestionar o deshabilitar las cookies en los navegadores más comunes a través de sus enlaces oficiales de soporte:
      </p>
      <ul>
        <li><strong>Google Chrome:</strong> Opciones de Privacidad y Seguridad &gt; Cookies y otros datos de sitios.</li>
        <li><strong>Mozilla Firefox:</strong> Ajustes &gt; Privacidad &amp; Seguridad &gt; Cookies y datos del sitio.</li>
        <li><strong>Apple Safari:</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.</li>
        <li><strong>Microsoft Edge:</strong> Configuración &gt; Cookies y permisos del sitio.</li>
      </ul>
      <p>
        <em>Advertencia técnica:</em> La desactivación o el bloqueo total de cookies técnicas esenciales puede provocar que
        algunas partes de la web de Certilab no se carguen correctamente o que la navegación sea más lenta.
      </p>

      <h2>5. Actualizaciones de la Política de Cookies</h2>
      <p>
        ILHASA BUILDING, S.L. se reserva el derecho de modificar la presente Política de Cookies para adaptarla a novedades
        legislativas, cambios técnicos en la web o nuevas resoluciones de las autoridades de control (AEPD/CEPD).
        Cualquier modificación será publicada de manera visible en esta misma página.
      </p>

      <h2>6. Contacto Técnico y Legal</h2>
      <p>
        Para cualquier consulta técnica o jurídica relacionada con el uso de cookies en certilab.cat o para el ejercicio
        de derechos de privacidad, puede dirigirse exclusivamente por escrito a:
      </p>
      <ul>
        <li><strong>Responsable Legal:</strong> ILHASA BUILDING, S.L.</li>
        <li><strong>Correo electrónico de atención:</strong> info@certilab.cat</li>
      </ul>

      <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}