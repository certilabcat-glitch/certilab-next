import type { Metadata } from "next";
import UserMenu from "@/components/auth/UserMenu";

export const metadata: Metadata = {
  title: "Plataforma Certilab",
  description: "Gestión de expedientes digitales",
};

export default function PlatformaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar de plataforma */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Plataforma Certilab
          </h1>
          <UserMenu />
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}