'use client';

import { use, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import type { ExpedienteRow, EstadoExpediente } from '@/types/core/expediente';
import type { DictamenTecnico } from '@/types/core/dictamen';
import type { EstadoDiagnostico } from '@/types/core/diagnostico';
import { obtenerDictamen } from '@/lib/actions/obtener-dictamen';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Separator from '@/components/ui/Separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useToast } from '@/components/ui/use-toast';
import DictamenStatusBadge from '@/components/expedientes/DictamenStatusBadge';
import DictamenView from '@/components/expedientes/DictamenView';
import EmitirDictamenButton from '@/components/expedientes/EmitirDictamenButton';
import EmitirDictamenModal from '@/components/expedientes/EmitirDictamenModal';
import EntregarDictamenButton from '@/components/expedientes/EntregarDictamenButton';
import AsistenteDecisionTecnica from '@/components/expedientes/AsistenteDecisionTecnica';
import { DocumentList } from '@/components/expedientes/DocumentList';
import { IconDocumento, IconDiagnostico } from '@/components/ui/icons';

interface PageProps {
  params: Promise<{ id: string }>;
}

function traducirEstado(estado: EstadoExpediente): string {
  const mapa: Record<EstadoExpediente, string> = {
    Solicitud: 'Solicitud',
    PteDocumentacion: 'Pendiente Documentación',
    EnRevisionPITR: 'En Revisión PITR',
    Auditado: 'Auditado',
    RequiereRevisionManual: 'Requiere Revisión Manual',
    RevisionManual: 'Revisión Manual',
    Aprobado: 'Aprobado',
    Rechazado: 'Rechazado',
    DictamenEmitido: 'Dictamen Emitido',
    DictamenEntregado: 'Dictamen Entregado',
    Entregado: 'Entregado',
    Cancelado: 'Cancelado',
    Devuelto: 'Devuelto',
  };
  return mapa[estado] ?? estado;
}

/**
 * Página de detalle de expediente para AT (Arquitecto Técnico).
 */
export default function ATExpedienteDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const { addToast } = useToast();

  const [expediente, setExpediente] = useState<ExpedienteRow | null>(null);
  const [dictamen, setDictamen] = useState<DictamenTecnico | null>(null);
  const [loadingExpediente, setLoadingExpediente] = useState(true);
  const [loadingDictamen, setLoadingDictamen] = useState(false);
  const [dictamenError, setDictamenError] = useState<string | null>(null);
  const [emitirModalOpen, setEmitirModalOpen] = useState(false);
  const [fetchVersion, setFetchVersion] = useState(0);

  // Track whether component is still mounted
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Cargar expediente
  useEffect(() => {
    let cancelled = false;
    async function fetchExpediente() {
      setLoadingExpediente(true);
      try {
        const res = await fetch(`/api/expedientes/${id}`);
        if (!res.ok) throw new Error('Error al cargar expediente');
        const data = await res.json();
        if (!cancelled) setExpediente(data);
      } catch (err) {
        if (!cancelled) {
          addToast(err instanceof Error ? err.message : 'Error al cargar expediente', 'error');
        }
      } finally {
        if (!cancelled) setLoadingExpediente(false);
      }
    }
    fetchExpediente();
    return () => { cancelled = true; };
  }, [id, fetchVersion, addToast]);

  // Cargar dictamen cuando cambia el estado del expediente
  useEffect(() => {
    if (!expediente) return;
    let cancelled = false;
    async function fetchDictamen() {
      const estadosConDictamen: EstadoExpediente[] = [
        'DictamenEmitido',
        'DictamenEntregado',
      ];
      if (!estadosConDictamen.includes(expediente!.estado)) {
        if (!cancelled) setDictamen(null);
        return;
      }
      setLoadingDictamen(true);
      setDictamenError(null);
      try {
        const result = await obtenerDictamen(expediente!.id);
        if (!cancelled) {
          if (result.success && result.data) {
            setDictamen(result.data);
          } else {
            setDictamenError(result.error ?? 'No se pudo cargar el dictamen');
          }
        }
      } catch (err) {
        if (!cancelled) {
          setDictamenError(err instanceof Error ? err.message : 'Error al cargar dictamen');
        }
      } finally {
        if (!cancelled) setLoadingDictamen(false);
      }
    }
    fetchDictamen();
    return () => { cancelled = true; };
  }, [expediente]);

  // Handlers para acciones
  const handleDictamenEmitido = () => {
    setEmitirModalOpen(false);
    setFetchVersion(v => v + 1);
    addToast('Dictamen emitido correctamente', 'success');
  };

  const handleDictamenEntregado = () => {
    setFetchVersion(v => v + 1);
    addToast('Dictamen entregado al cliente', 'success');
  };

  // Estados de carga
  if (userLoading || loadingExpediente) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-600">Debes iniciar sesión para ver esta página.</p>
      </div>
    );
  }

  if (!expediente) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-600">Expediente no encontrado.</p>
      </div>
    );
  }

  const estado = expediente.estado;

  // Mapa de estados a Badge
  const estadoBadge = (est: EstadoExpediente) => {
    const colores: Record<string, string> = {
      Solicitud: 'bg-blue-100 text-blue-800',
      PteDocumentacion: 'bg-amber-100 text-amber-800',
      EnRevisionPITR: 'bg-purple-100 text-purple-800',
      Auditado: 'bg-indigo-100 text-indigo-800',
      RequiereRevisionManual: 'bg-orange-100 text-orange-800',
      RevisionManual: 'bg-yellow-100 text-yellow-800',
      Aprobado: 'bg-green-100 text-green-800',
      Rechazado: 'bg-red-100 text-red-800',
      DictamenEmitido: 'bg-teal-100 text-teal-800',
      DictamenEntregado: 'bg-emerald-100 text-emerald-800',
      Entregado: 'bg-gray-100 text-gray-800',
      Cancelado: 'bg-slate-100 text-slate-500',
      Devuelto: 'bg-pink-100 text-pink-800',
    };
    return colores[est] ?? 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Expediente {expediente.numero_expediente}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {expediente.titulo ?? 'Sin título'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={estadoBadge(estado)}>
            {traducirEstado(estado)}
          </Badge>
          <DictamenStatusBadge
            estado={estado}
            dictamen={dictamen ?? undefined}
          />
        </div>
      </div>

      <Separator />

      {/* Sección de documentos — visible siempre que el expediente esté activo */}
      {!['Cancelado', 'Entregado', 'DictamenEntregado'].includes(estado) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconDocumento className="h-5 w-5" />
              Documentación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentList expedienteId={expediente.id} readOnly={estado !== 'PteDocumentacion' && estado !== 'Solicitud'} />
          </CardContent>
        </Card>
      )}

      {/* Diagnóstico / Asistente — visible en estados previos al dictamen */}
      {estado === 'RevisionManual' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconDiagnostico className="h-5 w-5" />
              Diagnóstico Técnico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AsistenteDecisionTecnica
              expedienteId={expediente.id}
              userId={user.id}
              expedienteVersion={expediente.version}
              estadoInicial={("SinDiagnostico") as EstadoDiagnostico}
              diagnosticoInicial={null}
              onCompletado={() => setFetchVersion(v => v + 1)}
              onGuardado={() => {}}
            />
          </CardContent>
        </Card>
      )}

      {/* Dictamen — visible cuando está emitido o entregado */}
      {(estado === 'DictamenEmitido' || estado === 'DictamenEntregado') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Dictamen Técnico
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingDictamen ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : dictamenError ? (
              <p className="text-red-600">{dictamenError}</p>
            ) : dictamen ? (
            <DictamenView
              dictamen={dictamen}
              estado={estado === 'DictamenEmitido' ? 'Emitido' : 'Entregado'}
            />
            ) : (
              <p className="text-muted-foreground">No se pudo cargar el dictamen.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Acciones — visibles según estado */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Botón Emitir Dictamen — visible SOLO en estado Aprobado */}
          {estado === 'Aprobado' && (
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-green-50">
              <div className="flex-1">
                <p className="font-medium text-green-800">Dictamen pendiente</p>
                <p className="text-sm text-green-600">
                  El diagnóstico está completado y aprobado. Emite el dictamen técnico formal.
                </p>
              </div>
              <EmitirDictamenButton
                expedienteId={expediente.id}
                onEmitido={handleDictamenEmitido}
              />
            </div>
          )}

          {/* Botón Emitir Dictamen alternativo (modal) — misma condición */}
          {estado === 'Aprobado' && (
            <div>
              <Button onClick={() => setEmitirModalOpen(true)}>
                Emitir Dictamen (Modal)
              </Button>
              <EmitirDictamenModal
                expedienteId={expediente.id}
                isOpen={emitirModalOpen}
                onClose={() => setEmitirModalOpen(false)}
                onEmitido={handleDictamenEmitido}
              />
            </div>
          )}

          {/* Botón Entregar Dictamen — visible SOLO en estado DictamenEmitido */}
          {estado === 'DictamenEmitido' && (
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-teal-50">
              <div className="flex-1">
                <p className="font-medium text-teal-800">Dictamen emitido</p>
                <p className="text-sm text-teal-600">
                  El dictamen está emitido. Entrégalo al cliente para finalizar el proceso.
                </p>
              </div>
              <EntregarDictamenButton
                expedienteId={expediente.id}
                onEntregado={handleDictamenEntregado}
              />
            </div>
          )}

          {/* Estado final de entrega */}
          {estado === 'DictamenEntregado' && (
            <div className="p-4 border rounded-lg bg-emerald-50">
              <p className="font-medium text-emerald-800">Dictamen entregado</p>
              <p className="text-sm text-emerald-600">
                El dictamen ha sido entregado al cliente correctamente.
              </p>
            </div>
          )}

          {/* Estados terminales */}
          {estado === 'Cancelado' && (
            <div className="p-4 border rounded-lg bg-slate-50">
              <p className="font-medium text-slate-600">Expediente cancelado</p>
            </div>
          )}

          {estado === 'Devuelto' && (
            <div className="p-4 border rounded-lg bg-pink-50">
              <p className="font-medium text-pink-800">Devuelto para correcciones</p>
              <p className="text-sm text-pink-600">
                El certificado fue devuelto al cliente para correcciones.
              </p>
            </div>
          )}

          {/* DropdownMenu de acciones adicionales */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm">
                Más acciones
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/at/expedientes`)}>
                Volver a la bandeja
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFetchVersion(v => v + 1)}>
                Recargar página
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </div>
  );
}
