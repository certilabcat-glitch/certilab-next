import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración | Backoffice Certilab",
  description: "Configuración del sistema",
};

export default function BackofficeConfiguracionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="mt-2 text-gray-600">
          Configuración del sistema y parámetros globales
        </p>
      </div>

      {/* Placeholder: Secciones de configuración */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Servicios
          </h2>
          <p className="text-gray-600 mb-4">
            Gestionar servicios disponibles y sus parámetros
          </p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled
          >
            Gestionar Servicios
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Integraciones
          </h2>
          <p className="text-gray-600 mb-4">
            Configurar integraciones con MyPOS, n8n, Supabase, etc.
          </p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled
          >
            Configurar Integraciones
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notificaciones
          </h2>
          <p className="text-gray-600 mb-4">
            Configurar plantillas de email y SMS
          </p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled
          >
            Configurar Notificaciones
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Seguridad
          </h2>
          <p className="text-gray-600 mb-4">
            Configurar políticas de seguridad y permisos
          </p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled
          >
            Configurar Seguridad
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Esta funcionalidad estará disponible en la siguiente fase.
      </p>
    </div>
  );
}
