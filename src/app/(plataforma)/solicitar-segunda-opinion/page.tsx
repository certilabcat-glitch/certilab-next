import type { Metadata } from "next";
import SolicitarSegundaOpinionForm from "./SolicitarSegundaOpinionForm";

export const metadata: Metadata = {
  title: "Solicitar Segunda Opinión | Certilab",
  description: "Solicita una segunda opinión para tu certificado energético",
};

export default function SolicitarSegundaOpinionPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Solicitar Segunda Opinión
        </h1>
        <p className="mt-2 text-gray-600">
          Nuestros técnicos revisarán tu certificado energético y te
          proporcionarán una segunda opinión profesional.
        </p>
      </div>

      <SolicitarSegundaOpinionForm />
    </div>
  );
}