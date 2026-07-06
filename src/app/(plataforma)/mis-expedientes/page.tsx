import type { Metadata } from "next";
import Link from "next/link";
import { getMisExpedientes } from "@/lib/actions/crear-expediente";
import ExpedientesTable from "./ExpedientesTable";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Mis Expedientes | Plataforma Certilab",
  description: "Lista de tus expedientes",
};

export default async function MisExpedientesPage() {
  const { data: expedientes, error } = await getMisExpedientes();

  const activos = expedientes.filter(
    (e) => !["cerrado", "rechazado", "cancelado"].includes(e.estado)
  );
  const completados = expedientes.filter((e) =>
    ["cerrado", "rechazado", "cancelado"].includes(e.estado)
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Expedientes</h1>
          <p className="mt-2 text-gray-600">
            Aquí puedes ver todos tus expedientes
          </p>
        </div>
        <Link href="/plataforma/solicitar-segunda-opinion">
          <Button>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Solicitar Segunda Opinión
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Expedientes activos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Expedientes Activos
            {activos.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({activos.length})
              </span>
            )}
          </h2>
        </div>

        {activos.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500">
              No tienes expedientes activos en este momento.
            </p>
            <Link
              href="/plataforma/solicitar-segunda-opinion"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Solicitar una Segunda Opinión →
            </Link>
          </div>
        ) : (
          <ExpedientesTable expedientes={activos} tipo="activos" />
        )}
      </div>

      {/* Expedientes completados */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Expedientes Completados
            {completados.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({completados.length})
              </span>
            )}
          </h2>
        </div>

        {completados.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500">
              No tienes expedientes completados aún.
            </p>
          </div>
        ) : (
          <ExpedientesTable expedientes={completados} tipo="completados" />
        )}
      </div>
    </div>
  );
}
