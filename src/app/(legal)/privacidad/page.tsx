import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Certilab",
  description: "Política de privacidad y protección de datos de Certilab e ILHASA BUILDING, S.L. según RGPD y LOPDGDD.",
  robots: "index, follow",
};

export default function Privacidad() {
  return (
    <div className="legal-page">
      <h1>Política de Privacidad y Protección de Datos</h1>

      <h2>1. Responsable del Tratamiento y Marco Normativo</h2>
      <p>
        De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), informamos al Usuario
        de que los datos personales recabados a través del sitio web certilab.cat serán incorporados a las actividades
        de tratamiento cuya titularidad y responsabilidad corresponde a:
      </p>
      <ul>
        <li><strong>Razón Social:</strong> ILHASA BUILDING, S.L. (&ldquo;EL RESPONSABLE&rdquo; o &ldquo;CERTILAB&rdquo;)</li>
        <li><strong>NIF / CIF:</strong> B64327810</li>
        <li><strong>Domicilio Social:</strong> Calle La Vinya, 27, 08348 Cabrils (Barcelona), España.</li>
        <li><strong>Datos Registrales:</strong> Registro Mercantil de Barcelona, Tomo 39.047, Folio 214, Hoja B-336247, Inscripción 1ª.</li>
        <li><strong>Correo para ejercicio de derechos:</strong> info@certilab.cat</li>
      </ul>
      <p style={{ fontStyle: "italic", fontSize: "0.95em", marginTop: "1rem" }}>
        <strong>Nota legal operativa:</strong> ILHASA BUILDING, S.L. opera bajo un modelo de arquitectura técnica y consultoría 100% online
        y remota. Conforme a su política operativa, no se dispone de canal de atención telefónica ni se recaban números de teléfono
        a efectos comerciales o de soporte, procesándose toda comunicación oficial estrictamente por escrito y vía telemática.
      </p>

      <h2>2. Principios Aplicables al Tratamiento</h2>
      <p>
        El tratamiento de datos personales se rige estrictamente por los principios del artículo 5 del RGPD: licitud, lealtad y
        transparencia; limitación de la finalidad; minimización de datos; exactitud; limitación del plazo de conservación; e
        integridad y confidencialidad.
      </p>

      <h2>3. Categorías de Datos Tratados</h2>
      <p>
        Para el desarrollo de la consultoría y auditoría técnica de Certificados de Eficiencia Energética (CEE), Check-Up Inmobiliario
        e Informes Técnicos, tratamos exclusivamente las siguientes categorías de datos aportadas voluntariamente por el Cliente:
      </p>
      <ul>
        <li><strong>Datos identificativos y de contacto por escrito:</strong> nombre, apellidos, dirección de correo electrónico (info@certilab.cat), ubicación del inmueble objeto de consulta y NIF/CIF a efectos fiscales si procede la contratación.</li>
        <li><strong>Datos técnicos y documentales del inmueble:</strong> archivos digitales aportados por el Cliente (certificados energéticos PDF, notas simples, planos, memorias técnicas, informes o fotografías).</li>
        <li><strong>Datos técnicos de navegación:</strong> dirección IP y logs de seguridad estrictamente necesarios para la protección de la infraestructura web.</li>
      </ul>

      <h2>4. Finalidades del Tratamiento y Bases Legales</h2>
      <p>
        Los datos personales serán tratados para las siguientes finalidades amparadas en el artículo 6 del RGPD:
      </p>
      <ul>
        <li><strong>Ejecución contractual o medidas precontractuales (Art. 6.1.b RGPD):</strong> gestión de consultas por escrito, valoración de presupuestos, análisis técnico remoto y emisión del informe técnico encargado.</li>
        <li><strong>Cumplimiento de obligaciones legales (Art. 6.1.c RGPD):</strong> cumplimiento de deberes fiscales, contables y tributarios (Ley General Tributaria).</li>
        <li><strong>Interés legítimo (Art. 6.1.f RGPD):</strong> mantener la seguridad web contra ciberataques y preservar la trazabilidad por escrito de dictámenes técnicos ante eventuales controversias.</li>
        <li><strong>Consentimiento (Art. 6.1.a RGPD):</strong> atención de correos y solicitudes de información no vinculadas a una relación contractual previa.</li>
      </ul>

      <h2>5. Modelo Remoto y Veracidad de la Documentación</h2>
      <p>
        Al prestarse un servicio de consultoría técnica que opera exclusivamente online sin visitas presenciales a los inmuebles,
        ILHASA BUILDING, S.L. fundamenta su análisis en la veracidad y autenticidad de la documentación digital que el propio Cliente aporta.
      </p>
      <p>
        El Usuario garantiza que los datos y documentos aportados son veraces, asumiendo la exclusiva responsabilidad sobre cualquier
        conclusión técnica que resulte de falsedades, omisiones o falta de legitimación en los datos facilitados.
      </p>

      <h2>6. Plazos de Conservación de los Datos</h2>
      <p>
        Conservaremos los datos bajo las siguientes reglas:
      </p>
      <ul>
        <li><strong>Datos de clientes y documentación de informes:</strong> durante la vigencia contractual y, tras finalizar el servicio, permanecerán debidamente bloqueados entre cuatro (4) y seis (6) años para obligaciones fiscales y tributarias, así como por los plazos de prescripción de responsabilidad técnica aplicables a la arquitectura técnica.</li>
        <li><strong>Consultas no convertidas en encargo:</strong> eliminación transcurridos seis (6) meses desde el último contacto.</li>
        <li><strong>Logs de seguridad web:</strong> máximo de 12 meses.</li>
      </ul>

      <h2>7. Destinatarios, Encargados y Transferencias</h2>
      <p>
        Tus datos no se cederán, venderán ni intercambiarán con terceros, salvo obligación legal (Agencia Tributaria o autoridades públicas).
      </p>
      <p>
        Los proveedores de infraestructura web y correo electrónico actúan como Encargados del Tratamiento bajo el artículo 28 del RGPD.
        Si se utilizara algún proveedor con servidores fuera del Espacio Económico Europeo (EEE), garantizamos el cumplimiento del
        Capítulo V del RGPD mediante Decisiones de Adecuación o Cláusulas Contractuales Tipo (SCC).
      </p>

      <h2>8. Derechos de los Interesados</h2>
      <p>
        Tienes derecho a ejercer gratuitamente tus derechos de:
      </p>
      <ul>
        <li><strong>Acceso:</strong> confirmar si tratamos tus datos y acceder a ellos.</li>
        <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos.</li>
        <li><strong>Supresión:</strong> solicitar el borrado de tus datos (&ldquo;derecho al olvido&rdquo;).</li>
        <li><strong>Limitación:</strong> restringir el tratamiento en los casos legalmente previstos.</li>
        <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado y de lectura mecánica.</li>
        <li><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</li>
      </ul>
      <p>
        Para ejercer estos derechos, envía un correo electrónico por escrito a <strong>info@certilab.cat</strong> indicando
        en el asunto &ldquo;EJERCICIO DE DERECHOS RGPD&rdquo;. Asimismo, tienes derecho a presentar una reclamación ante la
        Agencia Española de Protección de Datos (AEPD) en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
      </p>

      <h2>9. Seguridad de los Datos</h2>
      <p>
        En cumplimiento del artículo 32 del RGPD, implementamos las medidas técnicas y organizativas necesarias (como cifrado SSL/TLS,
        backups y control de acceso estricto) para garantizar la confidencialidad, integridad y resiliencia de la información.
      </p>

      <h2>10. Cambios en la Política de Privacidad</h2>
      <p>
        Nos reservamos el derecho de modificar esta política para adaptarla a novedades legislativas o resoluciones de la AEPD.
        Los cambios serán efectivos al publicarse en este sitio web.
      </p>

      <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}