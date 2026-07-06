import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Dashboard | Plataforma Certilab",
  description: "Dashboard principal de la plataforma",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Bienvenido a la Plataforma Certilab
        </p>
      </div>

      {/* Resumen de expedientes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Expedientes</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">En Progreso</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Completados</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Próximos a Vencer</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">0</p>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="space-y-3">
          <Link href="/plataforma/mis-expedientes">
            <Button variant="link" className="!justify-start">
              → Ver mis expedientes
            </Button>
          </Link>
          <Link href="/plataforma/nuevo-expediente">
            <Button variant="link" className="!justify-start">
              → Crear nuevo expediente
            </Button>
          </Link>
          <Link href="/plataforma/backoffice/expedientes">
            <Button variant="link" className="!justify-start">
              → Ir a backoffice
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
