import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración | Plataforma Certilab",
  description: "Configuración de tu cuenta",
};

export default function ConfiguracionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="mt-2 text-gray-600">
          Gestiona tu perfil y preferencias
        </p>
      </div>

      {/* Placeholder: Secciones de configuración */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Perfil
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Tu nombre"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="tu@email.com"
                disabled
              />
            </div>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled
            >
              Guardar Cambios
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Seguridad
          </h2>
          <div className="space-y-4">
            <button
              className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Cambiar Contraseña
            </button>
            <button
              className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Autenticación de Dos Factores
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notificaciones
          </h2>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                disabled
              />
              <span className="ml-2 text-sm text-gray-700">
                Notificaciones por email
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                disabled
              />
              <span className="ml-2 text-sm text-gray-700">
                Notificaciones por SMS
              </span>
            </label>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Estas opciones estarán disponibles en la siguiente fase.
      </p>
    </div>
  );
}
