import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expedientes | Backoffice Certilab",
  description: "Gestión de expedientes",
};

export default function BackofficeExpedientesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Expedientes</h1>
        <p className="mt-2 text-gray-600">
          Gestión completa de expedientes (Backoffice)
        </p>
      </div>

      {/* Placeholder: Filtros */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              disabled
            >
              <option>Todos</option>
              <option>Pago recibido</option>
              <option>Expediente creado</option>
              <option>Esperando información</option>
              <option>Información recibida</option>
              <option>En revisión</option>
              <option>Informe enviado</option>
              <option>Cerrado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prioridad
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              disabled
            >
              <option>Todas</option>
              <option>Baja</option>
              <option>Media</option>
              <option>Alta</option>
              <option>Urgente</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Técnico
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              disabled
            >
              <option>Todos</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Búsqueda
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Número, cliente, inmueble..."
              disabled
            />
          </div>
        </div>
      </div>

      {/* Placeholder: Tabla de expedientes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista de Expedientes
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Progreso
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No hay expedientes aún.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Esta funcionalidad estará disponible en la siguiente fase.
      </p>
    </div>
  );
}
