import { CONTACTO } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Reembolso | Certilab",
  description:
    "Política de devoluciones y cancelaciones de los servicios de Certilab. Condiciones de desistimiento, reembolso y caducidad por inactividad.",
  robots: "index, follow",
};

export default function PoliticaDeReembolso() {
  return (
    <div className="legal-page">
      <h1>Política de Reembolso</h1>

      <h2>1. Derecho de Desistimiento</h2>
      <p>
        De conformidad con lo dispuesto en el Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios, el cliente dispone de un plazo de <strong>14 días naturales</strong> desde la fecha de contratación para desistir del servicio sin necesidad de justificación.
      </p>
      <p>
        No obstante, al tratarse de un servicio de consultoría técnica a medida y de contenido digital, el derecho de desistimiento se pierde en el momento en que el cliente aporta la documentación técnica y el equipo de Certilab comienza su revisión, tal como se detalla en los apartados siguientes.
      </p>

      <h2>2. Reembolso Íntegro</h2>
      <p>
        El cliente podrá cancelar el servicio y solicitar la devolución completa del importe pagado siempre y cuando <strong>no haya aportado todavía la documentación técnica</strong> y nuestro equipo no haya iniciado el análisis de la misma.
      </p>
      <p>
        Para solicitarlo, debe escribir de forma inmediata a {CONTACTO.email} indicando el número de pedido o referencia de la contratación. El reembolso se procesará en un plazo máximo de <strong>14 días naturales</strong> desde la recepción de la solicitud, abonándose en el mismo método de pago utilizado en la contratación.
      </p>

      <h2>3. Pérdida del Derecho de Desistimiento</h2>
      <p>
        Al tratarse de un servicio de consultoría técnica a medida y de análisis de contenido digital, el cliente acepta y consiente expresamente que <strong>una vez envía la documentación y el equipo de Certilab comienza su revisión, se pierde el derecho de desistimiento y no se realizarán reembolsos</strong>, independientemente del resultado de la auditoría o del dictamen emitido.
      </p>
      <p>
        Esta excepción está amparada por el artículo 103.m) del Real Decreto Legislativo 1/2007, que excluye el derecho de desistimiento en los servicios de consultoría técnica una vez que estos hayan sido completamente ejecutados o cuya ejecución haya comenzado, con previo consentimiento expreso del consumidor y con el reconocimiento por su parte de que pierde el derecho de desistimiento.
      </p>

      <h2>4. Caducidad por Inactividad</h2>
      <p>
        El cliente dispone de un plazo máximo de <strong>1 mes</strong> desde la fecha de pago para aportar la documentación técnica requerida (certificado energético, datos del inmueble, referencias catastrales, etc.).
      </p>
      <p>
        Si transcurrido este plazo no ha facilitado los documentos necesarios, el expediente se cerrará de forma automática. En este supuesto, <strong>no se realizará ningún reembolso</strong> del importe abonado en concepto de gastos administrativos y reserva operativa del equipo técnico.
      </p>
      <p>
        No obstante, el cliente podrá contactar con Certilab a través de {CONTACTO.email} para solicitar la reapertura del expediente, sujeta a disponibilidad y, en su caso, a nuevas condiciones de servicio.
      </p>

      <h2>5. Cancelaciones por Parte de Certilab</h2>
      <p>
        Certilab se reserva el derecho de cancelar un servicio contratado en los siguientes supuestos:
      </p>
      <ul>
        <li>Imposibilidad técnica de realizar el análisis por falta de documentación suficiente o de calidad adecuada.</li>
        <li>Detectarse que la documentación aportada es fraudulenta, falsa o manipulada.</li>
        <li>Incumplimiento grave de las condiciones de contratación por parte del cliente.</li>
      </ul>
      <p>
        En caso de cancelación por causas imputables a Certilab, se procederá al reembolso íntegro del importe pagado en un plazo máximo de 14 días naturales.
      </p>

      <h2>6. Procedimiento de Solicitud de Reembolso</h2>
      <p>
        Para solicitar un reembolso, el cliente deberá:
      </p>
      <ol>
        <li>Enviar un correo electrónico a {CONTACTO.email} indicando el motivo de la solicitud y el número de pedido o referencia.</li>
        <li>Certilab confirmará la recepción en un plazo máximo de 48 horas laborables.</li>
        <li>Se evaluará la solicitud conforme a las condiciones establecidas en esta política.</li>
        <li>En caso de proceder el reembolso, se procesará en un plazo máximo de 14 días naturales desde la confirmación.</li>
      </ol>

      <h2>7. Excepciones</h2>
      <p>
        No se aplicará reembolso en los siguientes casos:
      </p>
      <ul>
        <li>Cuando el servicio haya sido total o parcialmente ejecutado (revisión iniciada por el equipo técnico).</li>
        <li>Cuando hayan transcurrido más de 14 días naturales desde la contratación sin que el cliente haya ejercido su derecho de desistimiento.</li>
        <li>Cuando el cliente no haya aportado la documentación requerida en el plazo de 1 mes desde el pago.</li>
        <li>Cuando el resultado de la auditoría o dictamen no sea del agrado del cliente, al tratarse de un servicio de análisis técnico objetivo cuyo resultado no es predecible ni garantizable.</li>
      </ul>

      <h2>8. Legislación Aplicable</h2>
      <p>
        Esta política de reembolso se rige por la legislación española, en particular:
      </p>
      <ul>
        <li>Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios.</li>
        <li>Ley 3/2014, de 27 de marzo, por la que se modifica el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios.</li>
        <li>Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD).</li>
      </ul>

      <h2>9. Contacto</h2>
      <p>
        Para cualquier duda, aclaración o solicitud relacionada con esta política de reembolso, puede contactar con Certilab a través de:
      </p>
      <ul>
        <li>Email: {CONTACTO.email}</li>
        <li>WhatsApp: {CONTACTO.whatsappFormateado}</li>
        <li>Teléfono: {CONTACTO.telefonoFormateado}</li>
      </ul>

      <h2>10. Reclamaciones</h2>
      <p>
        Cualquier reclamación sobre el servicio prestado o sobre el proceso de reembolso deberá dirigirse por escrito a {CONTACTO.email}. Trataremos de resolver cualquier disputa de forma amistosa a la mayor brevedad posible.
      </p>
      <p>
        Asimismo, en caso de no quedar satisfecho con la resolución, el cliente podrá acudir a la plataforma de resolución de litigios en línea de la Unión Europea disponible en <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.
      </p>

      <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}