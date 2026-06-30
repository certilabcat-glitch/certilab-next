import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuevo Expediente | Plataforma Certilab",
  description: "Crear un nuevo expediente",
};

export default function NuevoExpedientePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nuevo Expediente</h1>
        <p className="mt-2 text-gray-600">
          Crear un nuevo expediente (solo para administradores)
        </p>
      </div>

      {/* Placeholder: Formulario */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cliente
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Seleccionar cliente"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Inmueble
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Seleccionar inmueble"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Servicio
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Seleccionar servicio"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prioridad
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              disabled
            >
              <option>Baja</option>
              <option>Media</option>
              <option>Alta</option>
              <option>Urgente</option>
            </select>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            Crear Expediente
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Esta funcionalidad estará disponible en la siguiente fase.
      </p>
    </div>
  );
}
