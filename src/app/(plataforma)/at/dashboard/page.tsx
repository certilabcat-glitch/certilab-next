import { obtenerBandejaTecnica, contarPendientes } from "@/lib/actions/at";
import BandejaTecnicaTable from "./BandejaTecnicaTable";
import Badge from "@/components/ui/Badge";

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

  const emptyState = (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">✅</div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No hay expedientes pendientes
      </h2>
      <p className="text-gray-500">
        Todos los expedientes han sido procesados.
      </p>
    </div>
  );

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
            <Badge variant="warning" className="ml-2">
              {pendientes.count} pendiente{pendientes.count !== 1 ? "s" : ""}
            </Badge>
          )}
        </p>
      </div>

      {/* Bandeja de expedientes */}
      {bandeja.data.length === 0 ? (
        emptyState
      ) : (
        <BandejaTecnicaTable expedientes={bandeja.data} />
      )}
    </div>
  );
}
