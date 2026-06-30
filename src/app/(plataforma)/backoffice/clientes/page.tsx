import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clientes | Backoffice Certilab",
  description: "Gestión de clientes",
};

export default function BackofficeClientesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
        <p className="mt-2 text-gray-600">
          Gestión de clientes y sus datos
        </p>
      </div>

      {/* Placeholder: Tabla de clientes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista de Clientes
          </h2>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled
          >
            + Nuevo Cliente
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No hay clientes aún.
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
