import { CONTACTO } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Reembolso | Certilab",
  description: "Política de devoluciones y cancelaciones de los servicios de Certilab. Condiciones para solicitar el reembolso de tu servicio contratado.",
  robots: "index, follow",
};

export default function Reembolso() {
  return (
    <div className="legal-page">
      <h1>Política de Reembolso</h1>

      <h2>1. Derecho de Desistimiento</h2>
      <p>
        De conformidad con lo dispuesto en la Ley General para la Defensa de los Consumidores y Usuarios y el Real Decreto Legislativo 1/2007, el cliente dispone de un plazo de <strong>14 días naturales</strong> desde la fecha de contratación para ejercer su derecho de desistimiento, sin necesidad de justificar su decisión y sin penalización alguna.
      </p>

      <h2>2. Reembolso Integro</h2>
      <p>
        El cliente podrá cancelar el servicio y solicitar la devolución completa del importe pagado siempre y cuando <strong>no haya aportado todavía la documentación técnica</strong> y nuestro equipo no haya iniciado el análisis de la misma.
      </p>
      <p>
        Para solicitarlo, debe escribir de forma inmediata a <strong>{CONTACTO.email}</strong> indicando su nombre completo, el número de pedido y la solicitud de cancelación.
      </p>

      <h2>3. Pérdida del Derecho de Desistimiento</h2>
      <p>
        Al tratarse de un servicio de consultoría técnica a medida y de contenido digital, el cliente acepta y consiente expresamente que <strong>una vez enviada la documentación y el equipo de Certilab comienza su revisión, se pierde el derecho de desistimiento</strong> y no se realizarán reembolsos, independientemente del resultado de la auditoría.
      </p>
      <p>
        Esta excepción está amparada por el artículo 103.m) del Texto Refundido de la Ley General para la Defensa de los Consumidores y Usuarios, que excluye el derecho de desistimiento en los contratos de servicios una vez que el servicio haya sido completamente ejecutado, cuando la ejecución haya comenzado con el consentimiento previo del consumidor.
      </p>

      <h2>4. Caducidad por Inactividad</h2>
      <p>
        El cliente dispone de un plazo máximo de <strong>1 mes</strong> desde la fecha de pago para aportar la documentación requerida. Si transcurrido este plazo no ha facilitado los documentos necesarios, el expediente se cerrará de forma automática.
      </p>
      <p>
        En este supuesto, no se realizará ningún reembolso del importe abonado en concepto de gastos administrativos y reserva operativa. El cliente podrá contactar con nosotros para valorar la reapertura del expediente en condiciones particulares.
      </p>

      <h2>5. Procedimiento de Solicitud</h2>
      <p>
        Para solicitar un reembolso, el cliente deberá:
      </p>
      <ul>
        <li>Enviar un correo electrónico a <strong>{CONTACTO.email}</strong> desde la dirección asociada a su pedido.</li>
        <li>Indicar el número de pedido y los datos del titular.</li>
        <li>Especificar el motivo de la solicitud de cancelación.</li>
      </ul>
      <p>
        Certilab confirmará la recepción de la solicitud en un plazo máximo de 48 horas laborables y procesará el reembolso en un plazo máximo de 14 días naturales desde la confirmación de la procedencia del mismo.
      </p>

      <h2>6. Forma de Reembolso</h2>
      <p>
        El reembolso se realizará a través del mismo medio de pago utilizado en la contratación (tarjeta de crédito o débito a través de Stripe), a menos que el cliente acuerde expresamente otro medio de devolución.
      </p>
      <p>
        Certilab no aplicará ninguna comisión o penalización adicional por el procesamiento del reembolso.
      </p>

      <h2>7. Casos Especiales</h2>
      <p>
        En caso de que se detecte un error imputable a Certilab en la prestación del servicio (error de análisis, incumplimiento del plazo de entrega acordado, o imposibilidad técnica de prestar el servicio), el cliente tendrá derecho al reembolso íntegro del importe pagado, independientemente de la fase en la que se encuentre el servicio.
      </p>
      <p>
        Para estas situaciones, rogamos contactar directamente con nuestro equipo de atención al cliente en <strong>{CONTACTO.email}</strong> para que podamos evaluar el caso de forma personalizada.
      </p>

      <h2>8. Contacto</h2>
      <p>
        Para cualquier consulta relacionada con esta política de reembolso, puedes contactarnos a través de:
      </p>
      <ul>
        <li><strong>Email:</strong> {CONTACTO.email}</li>
      </ul>

      <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}