interface ProgressBarProps {
  progreso: number; // 0-100
  className?: string;
  mostrarPorcentaje?: boolean;
}

/**
 * Componente reutilizable para mostrar barra de progreso
 */
export default function ProgressBar({
  progreso,
  className = "",
  mostrarPorcentaje = true,
}: ProgressBarProps) {
  // Asegurar que el progreso esté entre 0 y 100
  const progresoNormalizado = Math.min(Math.max(progreso, 0), 100);

  return (
    <div className={className}>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progresoNormalizado}%` }}
        />
      </div>
      {mostrarPorcentaje && (
        <p className="text-sm text-gray-600 mt-1">{progresoNormalizado}%</p>
      )}
    </div>
  );
}
