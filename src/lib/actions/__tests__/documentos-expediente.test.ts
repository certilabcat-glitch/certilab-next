import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock Supabase client
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("node:crypto", () => ({
  subtle: {
    digest: vi.fn(),
  },
}));

describe("documentos-expediente Server Actions", () => {
  const mockUserId = "user-123";
  const mockExpedienteId = "exp-456";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("subirDocumento", () => {
    it("should return error if user is not authenticated", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: null },
        error: new Error("Not authenticated"),
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
        storage: {
          from: vi.fn(),
        },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { subirDocumento } = await import("../documentos-expediente");
      const formData = new FormData();
      formData.append("file", new File([""], "test.pdf"));

      const result = await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Debes iniciar sesión para subir documentos.");
    });

    it("should return error if no file is provided", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { subirDocumento } = await import("../documentos-expediente");
      const formData = new FormData();

      const result = await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(result.success).toBe(false);
      expect(result.error).toBe("No se ha seleccionado ningún archivo.");
    });

    it("should return error if file exceeds 20MB", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { subirDocumento } = await import("../documentos-expediente");
      const bigFile = new File([new ArrayBuffer(21 * 1024 * 1024)], "large.pdf");
      const formData = new FormData();
      formData.append("file", bigFile);

      const result = await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(result.success).toBe(false);
      expect(result.error).toBe("El archivo no puede superar los 20MB.");
    });

    it("should return error if file type is not allowed", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { subirDocumento } = await import("../documentos-expediente");
      const formData = new FormData();
      formData.append("file", new File(["test"], "test.exe", { type: "application/x-msdownload" }));

      const result = await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(result.success).toBe(false);
      expect(result.error).toContain("Tipo de archivo no permitido");
    });

    it("should return error if expediente does not belong to user", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      vi.spyOn(expedienteService, "findById").mockResolvedValue({
        id: mockExpedienteId,
        cliente_id: "other-user",
        version: 1,
      } as any);

      const { subirDocumento } = await import("../documentos-expediente");
      const formData = new FormData();
      formData.append("file", new File(["test"], "test.pdf", { type: "application/pdf" }));

      const result = await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(result.success).toBe(false);
      expect(result.error).toBe("No tienes permiso para modificar este expediente.");
    });

    it("should upload file and register document successfully", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockStorageFrom = vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ error: null }),
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
        storage: { from: mockStorageFrom },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      vi.spyOn(expedienteService, "findById").mockResolvedValue({
        id: mockExpedienteId,
        cliente_id: mockUserId,
        estado: "Solicitud",
        version: 1,
      } as any);
      vi.spyOn(expedienteService, "cambiarEstado").mockResolvedValue({
        success: true,
      } as any);

      const { documentoIARepository } = await import(
        "@/lib/core/documento-ia.repository"
      );
      vi.spyOn(documentoIARepository, "crear").mockResolvedValue({
        id: "doc-789",
        expediente_id: mockExpedienteId,
        tipo: "CERTIFICADO_ORIGINAL",
        nombre: "test.pdf",
        mime_type: "application/pdf",
        estado_ia: "NO_APLICA",
      } as any);

      const { subirDocumento } = await import("../documentos-expediente");
      const pdfFile = new File(["test"], "test.pdf", { type: "application/pdf" });
      const formData = new FormData();
      formData.append("file", pdfFile);

      const result = await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(result.success).toBe(true);
      expect(result.documento).toBeDefined();
      expect(result.documento?.tipo).toBe("CERTIFICADO_ORIGINAL");
      expect(result.documento?.estado_ia).toBe("NO_APLICA");
    });

    it("should transition from Solicitud to PteDocumentacion on first upload", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockStorageFrom = vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ error: null }),
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
        storage: { from: mockStorageFrom },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      const cambiarEstadoSpy = vi.spyOn(expedienteService, "cambiarEstado").mockResolvedValue({
        success: true,
      } as any);
      vi.spyOn(expedienteService, "findById").mockResolvedValue({
        id: mockExpedienteId,
        cliente_id: mockUserId,
        estado: "Solicitud",
        version: 1,
      } as any);

      const { documentoIARepository } = await import(
        "@/lib/core/documento-ia.repository"
      );
      vi.spyOn(documentoIARepository, "crear").mockResolvedValue({
        id: "doc-789",
        expediente_id: mockExpedienteId,
      } as any);

      const { subirDocumento } = await import("../documentos-expediente");
      const pdfFile = new File(["test"], "test.pdf", { type: "application/pdf" });
      const formData = new FormData();
      formData.append("file", pdfFile);

      await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(cambiarEstadoSpy).toHaveBeenCalledWith(
        mockExpedienteId,
        "PteDocumentacion",
        mockUserId,
        1
      );
    });

    it("should transition from Devuelto to PteDocumentacion on upload", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockStorageFrom = vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ error: null }),
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
        storage: { from: mockStorageFrom },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      const cambiarEstadoSpy = vi.spyOn(expedienteService, "cambiarEstado").mockResolvedValue({
        success: true,
      } as any);
      vi.spyOn(expedienteService, "findById").mockResolvedValue({
        id: mockExpedienteId,
        cliente_id: mockUserId,
        estado: "Devuelto",
        version: 2,
      } as any);

      const { documentoIARepository } = await import(
        "@/lib/core/documento-ia.repository"
      );
      vi.spyOn(documentoIARepository, "crear").mockResolvedValue({
        id: "doc-789",
        expediente_id: mockExpedienteId,
      } as any);

      const { subirDocumento } = await import("../documentos-expediente");
      const pdfFile = new File(["test"], "test.pdf", { type: "application/pdf" });
      const formData = new FormData();
      formData.append("file", pdfFile);

      await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(cambiarEstadoSpy).toHaveBeenCalledWith(
        mockExpedienteId,
        "PteDocumentacion",
        mockUserId,
        2
      );
    });

    it("should NOT transition if estado is neither Solicitud nor Devuelto", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockStorageFrom = vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ error: null }),
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
        storage: { from: mockStorageFrom },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      const cambiarEstadoSpy = vi.spyOn(expedienteService, "cambiarEstado").mockResolvedValue({
        success: true,
      } as any);
      vi.spyOn(expedienteService, "findById").mockResolvedValue({
        id: mockExpedienteId,
        cliente_id: mockUserId,
        estado: "PteDocumentacion",
        version: 1,
      } as any);

      const { documentoIARepository } = await import(
        "@/lib/core/documento-ia.repository"
      );
      vi.spyOn(documentoIARepository, "crear").mockResolvedValue({
        id: "doc-789",
      } as any);

      const { subirDocumento } = await import("../documentos-expediente");
      const pdfFile = new File(["test"], "test.pdf", { type: "application/pdf" });
      const formData = new FormData();
      formData.append("file", pdfFile);

      await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(cambiarEstadoSpy).not.toHaveBeenCalled();
    });

    it("should handle storage upload error", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockStorageFrom = vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ error: new Error("Storage quota exceeded") }),
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
        storage: { from: mockStorageFrom },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      vi.spyOn(expedienteService, "findById").mockResolvedValue({
        id: mockExpedienteId,
        cliente_id: mockUserId,
        estado: "Solicitud",
        version: 1,
      } as any);

      const { subirDocumento } = await import("../documentos-expediente");
      const pdfFile = new File(["test"], "test.pdf", { type: "application/pdf" });
      const formData = new FormData();
      formData.append("file", pdfFile);

      const result = await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(result.success).toBe(false);
      expect(result.error).toContain("Storage quota exceeded");
    });

    it("should call revalidatePath on success", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockStorageFrom = vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ error: null }),
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
        storage: { from: mockStorageFrom },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      vi.spyOn(expedienteService, "findById").mockResolvedValue({
        id: mockExpedienteId,
        cliente_id: mockUserId,
        estado: "Solicitud",
        version: 1,
      } as any);
      vi.spyOn(expedienteService, "cambiarEstado").mockResolvedValue({
        success: true,
      } as any);

      const { documentoIARepository } = await import(
        "@/lib/core/documento-ia.repository"
      );
      vi.spyOn(documentoIARepository, "crear").mockResolvedValue({
        id: "doc-789",
      } as any);

      const { revalidatePath } = await import("next/cache");
      const { subirDocumento } = await import("../documentos-expediente");

      const pdfFile = new File(["test"], "test.pdf", { type: "application/pdf" });
      const formData = new FormData();
      formData.append("file", pdfFile);

      await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(revalidatePath).toHaveBeenCalledWith(
        `/plataforma/expedientes/${mockExpedienteId}`
      );
    });

    it("should handle errors from the service layer", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      vi.spyOn(expedienteService, "findById").mockRejectedValue(
        new Error("Database connection error")
      );

      const { subirDocumento } = await import("../documentos-expediente");
      const pdfFile = new File(["test"], "test.pdf", { type: "application/pdf" });
      const formData = new FormData();
      formData.append("file", pdfFile);

      const result = await subirDocumento(mockExpedienteId, "CERTIFICADO_ORIGINAL", formData);

      expect(result.success).toBe(false);
      expect(result.error).toContain("Database connection error");
    });
  });

  describe("getDocumentosExpediente", () => {
    it("should return error if user is not authenticated", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: null },
        error: new Error("Not authenticated"),
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { getDocumentosExpediente } = await import("../documentos-expediente");
      const result = await getDocumentosExpediente(mockExpedienteId);

      expect(result.data).toEqual([]);
      expect(result.error).toBe("Debes iniciar sesión.");
    });

    it("should return documents for a valid expediente", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      vi.spyOn(expedienteService, "findById").mockResolvedValue({
        id: mockExpedienteId,
        cliente_id: mockUserId,
      } as any);

      const mockDocs = [
        { id: "doc-1", nombre: "test.pdf", tipo: "CERTIFICADO_ORIGINAL" },
        { id: "doc-2", nombre: "foto.jpg", tipo: "FOTOGRAFIA" },
      ];
      const { documentoIARepository } = await import(
        "@/lib/core/documento-ia.repository"
      );
      vi.spyOn(documentoIARepository, "findMany").mockResolvedValue(mockDocs as any);

      const { getDocumentosExpediente } = await import("../documentos-expediente");
      const result = await getDocumentosExpediente(mockExpedienteId);

      expect(result.data).toHaveLength(2);
      expect(result.data[0].nombre).toBe("test.pdf");
      expect(result.error).toBeUndefined();
    });
  });

  describe("eliminarDocumento", () => {
    it("should return error if user is not authenticated", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: null },
        error: new Error("Not authenticated"),
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { eliminarDocumento } = await import("../documentos-expediente");
      const result = await eliminarDocumento("doc-789");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Debes iniciar sesión.");
    });

    it("should return error if documento not found", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { documentoIARepository } = await import(
        "@/lib/core/documento-ia.repository"
      );
      vi.spyOn(documentoIARepository, "findById").mockResolvedValue(null);

      const { eliminarDocumento } = await import("../documentos-expediente");
      const result = await eliminarDocumento("doc-789");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Documento no encontrado.");
    });

    it("should return error if user doesn't own the expediente", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { documentoIARepository } = await import(
        "@/lib/core/documento-ia.repository"
      );
      vi.spyOn(documentoIARepository, "findById").mockResolvedValue({
        id: "doc-789",
        expediente_id: mockExpedienteId,
      } as any);

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      vi.spyOn(expedienteService, "findById").mockResolvedValue({
        id: mockExpedienteId,
        cliente_id: "other-user",
      } as any);

      const { eliminarDocumento } = await import("../documentos-expediente");
      const result = await eliminarDocumento("doc-789");

      expect(result.success).toBe(false);
      expect(result.error).toBe("No tienes permiso para eliminar este documento.");
    });

    it("should soft delete document successfully", async () => {
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const { documentoIARepository } = await import(
        "@/lib/core/documento-ia.repository"
      );
      vi.spyOn(documentoIARepository, "findById").mockResolvedValue({
        id: "doc-789",
        expediente_id: mockExpedienteId,
      } as any);

      const softDeleteSpy = vi.spyOn(documentoIARepository, "softDelete").mockResolvedValue({
        success: true,
        deleted_at: new Date().toISOString(),
        version: 1,
      });

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      vi.spyOn(expedienteService, "findById").mockResolvedValue({
        id: mockExpedienteId,
        cliente_id: mockUserId,
      } as any);

      const { eliminarDocumento } = await import("../documentos-expediente");
      const result = await eliminarDocumento("doc-789");

      expect(result.success).toBe(true);
      expect(softDeleteSpy).toHaveBeenCalledWith("doc-789", mockUserId);
    });
  });
});