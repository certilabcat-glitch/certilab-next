import { CONTACTO } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Reembolso | Certilab",
  description: "Política de devoluciones y cancelaciones de los servicios de Certilab. Condiciones de desistimiento y reembolso.",
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

      <h2>2. Reembolso Íntegro</h2>
      <p>
        El cliente podrá cancelar el servicio y solicitar la devolución completa del importe pagado siempre y cuando <strong>no haya aportado todavía la documentación técnica</strong> y nuestro equipo no haya iniciado el análisis de la misma.
      </p>
      <p>
        Para solicitarlo, debe escribir a {CONTACTO.email} indicando su nombre, número de pedido y la solicitud de cancelación. El reembolso se procesará en un plazo máximo de 14 días naturales desde la recepción de la solicitud.
      </p>

      <h2>3. Pérdida del Derecho de Desistimiento</h2>
      <p>
        Al tratarse de un servicio de consultoría técnica a medida y de contenido digital, el cliente acepta y consiente expresamente que <strong>una vez enviada la documentación y el equipo de Certilab comienza su revisión, se pierde el derecho de desistimiento y no se realizarán reembolsos</strong>, independientemente del resultado de la auditoría o del dictamen emitido.
      </p>
      <p>
        Esta excepción está amparada por el artículo 103.m) de la Ley General para la Defensa de los Consumidores y Usuarios, que excluye el derecho de desistimiento en servicios que hayan sido completamente ejecutados con el consentimiento expreso del consumidor.
      </p>

      <h2>4. Caducidad por Inactividad</h2>
      <p>
        El cliente dispone de un plazo máximo de <strong>1 mes</strong> desde la fecha de pago para aportar la documentación requerida. Si transcurrido este plazo no ha facilitado los documentos necesarios, el expediente se cerrará de forma automática.
      </p>
      <p>
        En este supuesto, no se realizará ningún reembolso del importe abonado en concepto de gastos administrativos y reserva operativa.
      </p>

      <h2>5. Procedimiento de Solicitud de Reembolso</h2>
      <p>
        Para solicitar un reembolso, el cliente deberá:
      </p>
      <ol>
        <li>Enviar un correo electrónico a {CONTACTO.email} con el asunto "Solicitud de Reembolso".</li>
        <li>Incluir en el mensaje: nombre completo, número de pedido y motivo de la solicitud.</li>
        <li>El equipo de Certilab confirmará la recepción en un plazo máximo de 48 horas laborables.</li>
        <li>Si procede el reembolso, se procesará a través del mismo método de pago utilizado en la compra.</li>
      </ol>

      <h2>6. Plazos de Devolución</h2>
      <p>
        Una vez aprobado el reembolso, el importe se devolverá en un plazo máximo de <strong>14 días naturales</strong>. El tiempo de percepción por parte del cliente dependerá de su entidad bancaria y del método de pago utilizado.
      </p>
      <ul>
        <li><strong>Tarjeta de crédito/débito:</strong> entre 5 y 10 días hábiles.</li>
        <li><strong>Otros métodos de pago:</strong> el plazo dependerá de la entidad gestora correspondiente.</li>
      </ul>

      <h2>7. Excepciones</h2>
      <p>
        No se realizarán reembolsos en los siguientes casos:
      </p>
      <ul>
        <li>Cuando el servicio ya haya sido ejecutado total o parcialmente con consentimiento del cliente.</li>
        <li>Cuando hayan transcurrido más de 14 días naturales desde la contratación y el cliente no haya solicitado el desistimiento.</li>
        <li>Cuando el cliente haya aportado documentación y el equipo técnico haya iniciado el análisis.</li>
        <li>Por inactividad del cliente transcurrido 1 mes desde la fecha de pago sin haber aportado la documentación requerida.</li>
      </ul>

      <h2>8. Contacto para Reclamaciones</h2>
      <p>
        Para cualquier duda, reclamación o solicitud relacionada con esta política de reembolso, puede contactar con Certilab a través de:
      </p>
      <ul>
        <li>Email: {CONTACTO.email}</li>
        <li>WhatsApp: {CONTACTO.whatsappFormateado}</li>
      </ul>
      <p>
        Trataremos de resolver cualquier disputa de forma amistosa a la mayor brevedad posible.
      </p>

      <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}