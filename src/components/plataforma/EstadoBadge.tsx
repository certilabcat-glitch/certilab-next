import { EstadoExpediente } from "@/types/expediente";
import { etiquetasEstado, coloresEstado } from "@/lib/expediente-estados";

interface EstadoBadgeProps {
  estado: EstadoExpediente;
  className?: string;
}

/**
 * Componente reutilizable para mostrar estado de expediente
 */
export default function EstadoBadge({
  estado,
  className = "",
}: EstadoBadgeProps) {
  const etiqueta = etiquetasEstado[estado];
  const colores = coloresEstado[estado];

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colores} ${className}`}>
      {etiqueta}
    </span>
  );
}
