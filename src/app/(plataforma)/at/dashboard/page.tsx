import { obtenerBandejaTecnica, contarPendientes } from "@/lib/actions/at";

/**
 * Dashboard del Área Técnica
 *
 * Muestra los expedientes pendientes de análisis (estado PteDocumentacion)
 * ordenados FIFO. Es la puerta de entrada a la cola de trabajo del Motor PITR.
 *
 * EP-030: Primera iteración funcional del flujo de trabajo del Área Técnica.
 */
export default async function AtDashboardPage() {
  const [bandeja, pendientes] = await Promise.all([
    obtenerBandejaTecnica(),
    contarPendientes(),
  ]);

  if (bandeja.error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Error al cargar la bandeja técnica
        </h1>
        <p className="text-gray-700">{bandeja.error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Cabecera */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Área Técnica
        </h1>
        <p className="text-gray-600 mt-2">
          Expedientes pendientes de análisis técnico
          {pendientes.error ? null : (
            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              {pendientes.count} pendiente{pendientes.count !== 1 ? "s" : ""}
            </span>
          )}
        </p>
      </div>

      {/* Bandeja de expedientes */}
      {bandeja.data.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No hay expedientes pendientes
          </h2>
          <p className="text-gray-500">
            Todos los expedientes han sido procesados.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nº Expediente
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Servicio
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Título
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Recibido
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bandeja.data.map((exp) => (
            <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                {exp.numero_expediente}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                {exp.servicio?.replace(/_/g, " ") ?? "—"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                {exp.titulo ?? "—"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(exp.created_at).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {exp.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}
    </div>
  );
}