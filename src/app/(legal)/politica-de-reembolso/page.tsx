import { CONTACTO } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Reembolso | Certilab",
  description: "Política de devoluciones, cancelaciones y reembolsos de los servicios de Certilab.",
  robots: "index, follow",
};

export default function PoliticaDeReembolso() {
  return (
    <div className="legal-page">
      <h1>Política de Reembolso y Cancelaciones</h1>

      <h2>1. Derecho de Desistimiento</h2>
      <p>
        De conformidad con lo dispuesto en la Ley General para la Defensa de los Consumidores y Usuarios, el cliente tiene derecho a desistir del contrato en un plazo de 14 días naturales sin necesidad de justificación.
      </p>
      <p>
        No obstante, al tratarse de servicios de consultoría técnica a medida y de contenido digital, el derecho de desistimiento se ve limitado en los términos que se detallan a continuación.
      </p>

      <h2>2. Reembolso Íntegro</h2>
      <p>
        El cliente podrá cancelar el servicio y solicitar la devolución completa del importe pagado siempre y cuando <strong>no haya aportado todavía la documentación técnica</strong> requerida para la prestación del servicio y nuestro equipo no haya iniciado el análisis de la misma.
      </p>
      <p>
        Para ejercer este derecho, el cliente deberá notificarlo por escrito a la dirección de correo electrónico {CONTACTO.email}, indicando su nombre completo y el número de referencia del pedido, si lo tuviera.
      </p>
      <p>
        Una vez recibida la solicitud, Certilab procederá al reembolso del importe íntegro en un plazo máximo de 14 días naturales, utilizando el mismo medio de pago empleado en la transacción original.
      </p>

      <h2>3. Pérdida del Derecho de Desistimiento</h2>
      <p>
        El cliente reconoce y acepta expresamente que <strong>una vez que envía la documentación técnica y el equipo de Certilab comienza su revisión y análisis, se pierde el derecho de desistimiento</strong> y no se realizarán reembolsos, independientemente del resultado de la auditoría o del grado de satisfacción con el servicio prestado.
      </p>
      <p>
        Esta limitación se fundamenta en la naturaleza personalizada y de contenido digital del servicio, que implica la elaboración de un informe o dictamen técnico a medida basado en la documentación específica aportada por el cliente.
      </p>

      <h2>4. Caducidad por Inactividad</h2>
      <p>
        El cliente dispone de un plazo máximo de <strong>1 mes</strong> desde la fecha de pago para aportar la documentación requerida para la prestación del servicio.
      </p>
      <p>
        Si transcurrido este plazo el cliente no ha facilitado los documentos necesarios, el expediente se cerrará de forma automática. En este supuesto, <strong>no se realizará ningún reembolso</strong> del importe abonado, en concepto de gastos administrativos y de reserva operativa incurridos por Certilab.
      </p>

      <h2>5. Procedimiento de Solicitud de Reembolso</h2>
      <p>
        Para solicitar un reembolso, el cliente deberá:
      </p>
      <ol>
        <li>Enviar un correo electrónico a {CONTACTO.email}.</li>
        <li>Indicar en el asunto: &ldquo;Solicitud de Reembolso&rdquo;.</li>
        <li>Incluir en el cuerpo del mensaje: nombre completo, DNI/NIF, fecha de contratación y motivo de la solicitud.</li>
        <li>Adjuntar cualquier documentación que considere relevante para la tramitación.</li>
      </ol>
      <p>
        Certilab acusará recibo de la solicitud en un plazo máximo de 48 horas hábiles y resolverá sobre la procedencia del reembolso en un plazo no superior a 14 días naturales.
      </p>

      <h2>6. Excepciones</h2>
      <p>
        No se admitirán solicitudes de reembolso en los siguientes supuestos:
      </p>
      <ul>
        <li>Cuando el servicio ya haya sido prestado en su totalidad y el informe o dictamen haya sido entregado al cliente.</li>
        <li>Cuando el equipo técnico de Certilab ya haya iniciado el análisis de la documentación aportada por el cliente.</li>
        <li>Cuando haya transcurrido más de 1 mes desde la fecha de pago sin que el cliente haya aportado la documentación requerida.</li>
        <li>Cuando la solicitud se base en la disconformidad con el resultado técnico de la auditoría, ya que este se elabora conforme a criterios técnicos objetivos y a la normativa vigente.</li>
      </ul>

      <h2>7. Contacto para Reembolsos</h2>
      <p>
        Para cualquier consulta relacionada con devoluciones, cancelaciones o reembolsos, el cliente puede contactar con Certilab a través de:
      </p>
      <ul>
        <li>Email: {CONTACTO.email}</li>
        <li>Teléfono: {CONTACTO.telefonoFormateado}</li>
        <li>WhatsApp: {CONTACTO.whatsappFormateado}</li>
      </ul>

      <h2>8. Legislación Aplicable</h2>
      <p>
        Esta política de reembolso se rige por la legislación española, en particular:
      </p>
      <ul>
        <li>Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios y otras leyes complementarias.</li>
        <li>Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSICE).</li>
      </ul>
      <p>
        Cualquier controversia derivada de esta política será sometida a los Juzgados y Tribunales de Barcelona (España).
      </p>

      <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}