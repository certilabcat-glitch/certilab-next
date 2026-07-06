"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ConfiguracionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="mt-2 text-gray-600">
          Gestiona tu perfil y preferencias
        </p>
      </div>

      {/* Secciones de configuración */}
      <div className="space-y-6">
        {/* Perfil */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Perfil
          </h2>
          <div className="space-y-4">
            <Input
              type="text"
              label="Nombre"
              placeholder="Tu nombre"
              disabled
            />
            <Input
              type="email"
              label="Email"
              placeholder="tu@email.com"
              disabled
            />
            <Button disabled>
              Guardar Cambios
            </Button>
          </div>
        </div>

        {/* Seguridad */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Seguridad
          </h2>
          <div className="space-y-3">
            <Button variant="secondary" disabled className="w-full justify-start">
              Cambiar Contraseña
            </Button>
            <Button variant="secondary" disabled className="w-full justify-start">
              Autenticación de Dos Factores
            </Button>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notificaciones
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                disabled
              />
              <span className="text-sm text-gray-700">
                Notificaciones por email
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                disabled
              />
              <span className="text-sm text-gray-700">
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
