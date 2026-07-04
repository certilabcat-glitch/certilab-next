import type { Metadata } from "next";
import Link from "next/link";
import { getMisExpedientes } from "@/lib/actions/crear-expediente";

export const metadata: Metadata = {
  title: "Mis Expedientes | Plataforma Certilab",
  description: "Lista de tus expedientes",
};

const estadoLabels: Record<string, string> = {
  pendiente: "Pendiente",
  pago_pendiente: "Pago pendiente",
  pago_recibido: "Pago recibido",
  expediente_creado: "Expediente creado",
  en_revision: "En revisión",
  informe_enviado: "Informe enviado",
  cerrado: "Cerrado",
  rechazado: "Rechazado",
  cancelado: "Cancelado",
};

const estadoColors: Record<string, string> = {
  pendiente: "bg-yellow-100 text-yellow-800",
  pago_pendiente: "bg-orange-100 text-orange-800",
  pago_recibido: "bg-blue-100 text-blue-800",
  expediente_creado: "bg-blue-100 text-blue-800",
  en_revision: "bg-purple-100 text-purple-800",
  informe_enviado: "bg-green-100 text-green-800",
  cerrado: "bg-gray-100 text-gray-800",
  rechazado: "bg-red-100 text-red-800",
  cancelado: "bg-red-100 text-red-800",
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
        <Link
          href="/plataforma/solicitar-segunda-opinion"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
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
          <ul className="divide-y divide-gray-200">
            {activos.map((exp) => (
              <li key={exp.id}>
                <Link
                  href={`/plataforma/expedientes/${exp.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {exp.titulo ?? "Segunda Opinión"}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {exp.numero_expediente}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          estadoColors[exp.estado] ?? "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {estadoLabels[exp.estado] ?? exp.estado}
                      </span>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Creado el{" "}
                    {new Date(exp.created_at).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
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
          <ul className="divide-y divide-gray-200">
            {completados.map((exp) => (
              <li key={exp.id}>
                <Link
                  href={`/plataforma/expedientes/${exp.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {exp.titulo ?? "Segunda Opinión"}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {exp.numero_expediente}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          estadoColors[exp.estado] ?? "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {estadoLabels[exp.estado] ?? exp.estado}
                      </span>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Creado el{" "}
                    {new Date(exp.created_at).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}