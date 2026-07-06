"use client";

import type { Metadata } from "next";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function NuevoExpedientePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nuevo Expediente</h1>
        <p className="mt-2 text-gray-600">
          Crear un nuevo expediente (solo para administradores)
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <Input
            type="text"
            label="Cliente"
            placeholder="Seleccionar cliente"
            disabled
          />

          <Input
            type="text"
            label="Inmueble"
            placeholder="Seleccionar inmueble"
            disabled
          />

          <Input
            type="text"
            label="Servicio"
            placeholder="Seleccionar servicio"
            disabled
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridad
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <option>Baja</option>
              <option>Media</option>
              <option>Alta</option>
              <option>Urgente</option>
            </select>
          </div>

          <Button disabled className="w-full">
            Crear Expediente
          </Button>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Esta funcionalidad estará disponible en la siguiente fase.
      </p>
    </div>
  );
}
