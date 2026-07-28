import { CONTACTO } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal | Certilab",
  description: "Aviso legal de Certilab. Información sobre responsabilidades, limitaciones de uso y condiciones de acceso.",
  robots: "index, follow",
};

export default function AvisoLegal() {
  return (
    <div className="legal-page">
      <h1>Aviso Legal</h1>

      <h2>1. Identificación del Responsable</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos identificativos del titular del sitio web:
      </p>
      <p>
        <strong>Titular del sitio web:</strong> ILHASA BUILDING S.L.
      </p>
      <p>
        <strong>NIF/CIF:</strong> B64327810
      </p>
      <p>
        <strong>Domicilio social:</strong> CL DE LA VINYA 27, 08348 CABRILS (Barcelona, España)
      </p>
      <p>
        <strong>Responsable Técnico:</strong> Eva María González García (Arquitecta Técnica colegiada en CATEB nº 9457)
      </p>
      <p>
        <strong>Email:</strong> {CONTACTO.email}
      </p>

      <h2>2. Objeto del Sitio Web</h2>
      <p>
        Este sitio web tiene como objeto la prestación de servicios de consultoría energética forense, análisis técnico de certificados energéticos, auditorías inmobiliarias e informes técnicos, prestados de forma estrictamente telemática.
      </p>
      <p>
        Certilab actúa como profesional independiente con responsabilidad profesional verificable, sin intermediarios ni algoritmos opacos, analizando la documentación técnica aportada por el cliente de forma remota.
      </p>

      <h2>3. Condiciones de Uso</h2>
      <p>
        El acceso y uso de este sitio web está condicionado a la aceptación de este aviso legal y de las condiciones de uso que se detallan a continuación.
      </p>
      <p>
        El usuario se compromete a utilizar el sitio web de forma lícita y leal, respetando la legislación vigente y los derechos de terceros.
      </p>

      <h2>4. Responsabilidad de Contenidos</h2>
      <p>
        Certilab se esfuerza por mantener la información contenida en este sitio web actualizada y precisa. Sin embargo, no garantiza la exactitud, integridad o actualización de los contenidos generales.
      </p>
      <p>
        Los contenidos de este sitio web tienen carácter informativo. El servicio técnico formal solo comienza tras la contratación y aportación documental por parte del cliente, rigiéndose por los estándares del colegio profesional.
      </p>

      <h2>5. Limitación de Responsabilidad</h2>
      <p>
        Certilab no será responsable de:
      </p>
      <ul>
        <li>Daños y perjuicios de cualquier naturaleza derivados del acceso, uso o imposibilidad de uso del sitio web.</li>
        <li>Daños causados por virus, malware u otros elementos nocivos que puedan afectar los sistemas informáticos del usuario.</li>
        <li>Interrupciones, errores o fallos en el funcionamiento del sitio web.</li>
        <li>Errores derivados de información falsa, inexacta o incompleta proporcionada por el usuario en los formularios de evaluación técnica.</li>
      </ul>

      <h2>6. Propiedad Intelectual</h2>
      <p>
        Todos los contenidos de este sitio web (textos, imágenes, gráficos, logos, iconos, botones, software, código fuente, etc.) están protegidos por derechos de propiedad intelectual e industrial titularidad de ILHASA BUILDING S.L. y Eva María González García.
      </p>
      <p>
        El usuario se compromete a no reproducir, distribuir, modificar, transmitir o utilizar los contenidos sin autorización expresa, salvo para uso personal y no comercial.
      </p>

      <h2>7. Enlaces a Terceros</h2>
      <p>
        Este sitio web puede contener enlaces a sitios web de terceros (como pasarelas de pago u organismos oficiales). Certilab no es responsable del contenido, exactitud o legalidad de los sitios web enlazados.
      </p>
      <p>
        La inclusión de un enlace no implica aprobación, recomendación o asociación corporativa con el sitio web enlazado.
      </p>

      <h2>8. Modificación del Aviso Legal</h2>
      <p>
        Certilab se reserva el derecho de modificar este aviso legal en cualquier momento para adaptarlo a novedades legislativas o jurisprudenciales. Los cambios serán efectivos desde su publicación en el sitio web.
      </p>

      <h2>9. Legislación Aplicable</h2>
      <p>
        Este aviso legal se rige por la legislación española, en particular:
      </p>
      <ul>
        <li>Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).</li>
        <li>Ley 3/1991, de 10 de enero, de Competencia Desleal.</li>
        <li>Real Decreto Legislativo 1/1996, de 12 de abril, por el que se aprueba el Texto Refundido de la Ley de Propiedad Intelectual.</li>
        <li>Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</li>
        <li>Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD).</li>
      </ul>

      <h2>10. Jurisdicción y Competencia</h2>
      <p>
        Para cualquier controversia derivada del uso de este sitio web o la prestación de los servicios telemáticos, las partes se someten a la jurisdicción de los juzgados y tribunales de Barcelona (España), renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Para cualquier duda o consulta sobre este aviso legal, puede contactar con Certilab a través de:
      </p>
      <ul>
        <li>Email: {CONTACTO.email}</li>
              </ul>

      <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}