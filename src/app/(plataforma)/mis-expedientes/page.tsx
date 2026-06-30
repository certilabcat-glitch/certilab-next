import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis Expedientes | Plataforma Certilab",
  description: "Lista de tus expedientes",
};

export default function MisExpedientesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mis Expedientes</h1>
        <p className="mt-2 text-gray-600">
          Aquí puedes ver todos tus expedientes activos
        </p>
      </div>

      {/* Placeholder: Lista de expedientes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Expedientes Activos
          </h2>
        </div>
        <div className="px-6 py-8 text-center">
          <p className="text-gray-500">
            No tienes expedientes activos en este momento.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Los expedientes aparecerán aquí después de realizar un pago.
          </p>
        </div>
      </div>

      {/* Placeholder: Expedientes completados */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Expedientes Completados
          </h2>
        </div>
        <div className="px-6 py-8 text-center">
          <p className="text-gray-500">
            No tienes expedientes completados aún.
          </p>
        </div>
      </div>
    </div>
  );
}
