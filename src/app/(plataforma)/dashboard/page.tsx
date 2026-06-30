import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Plataforma Certilab",
  description: "Dashboard principal de la plataforma",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Bienvenido a la Plataforma Certilab
        </p>
      </div>

      {/* Placeholder: Resumen de expedientes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Expedientes</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">En Progreso</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Completados</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Próximos a Vencer</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">0</p>
        </div>
      </div>

      {/* Placeholder: Acciones rápidas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="space-y-2">
          <a
            href="/plataforma/mis-expedientes"
            className="block text-blue-600 hover:text-blue-800"
          >
            → Ver mis expedientes
          </a>
          <a
            href="/plataforma/nuevo-expediente"
            className="block text-blue-600 hover:text-blue-800"
          >
            → Crear nuevo expediente
          </a>
          <a
            href="/plataforma/backoffice/expedientes"
            className="block text-blue-600 hover:text-blue-800"
          >
            → Ir a backoffice
          </a>
        </div>
      </div>
    </div>
  );
}
