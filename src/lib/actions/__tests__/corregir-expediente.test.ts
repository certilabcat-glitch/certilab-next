import { describe, it, expect, beforeEach, vi } from "vitest";
import { corregirExpediente } from "../corregir-expediente";

// Mock Supabase client
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("corregirExpediente Server Action", () => {
  const mockUserId = "user-123";
  const mockExpedienteId = "exp-456";
  const mockVersion = 1;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("corregirExpediente", () => {
    it("should be a defined function", () => {
      expect(corregirExpediente).toBeDefined();
      expect(corregirExpediente).toBeInstanceOf(Function);
    });

    it("should return error if user is not authenticated", async () => {
      // Arrange: createClient devuelve getUser sin usuario
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: null },
        error: new Error("Not authenticated"),
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      // Act
      const result = await corregirExpediente(mockExpedienteId, mockVersion);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe(
        "Debes iniciar sesión para realizar esta operación."
      );
    });

    it("should return error if expediente not found", async () => {
      // Arrange: mock para getUser exitoso, pero servicio devuelve null
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      // Mock del servicio para que falle findById
      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      vi.spyOn(expedienteService, "findById").mockResolvedValue(null as any);

      // Act
      const result = await corregirExpediente(mockExpedienteId, mockVersion);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe("Expediente no encontrado.");
    });

    it("should return error if expediente is not in Devuelto state", async () => {
      // Arrange
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const mockExpediente = {
        id: mockExpedienteId,
        estado: "Aprobado", // Estado incorrecto
        version: mockVersion,
      };

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      vi.spyOn(expedienteService, "findById").mockResolvedValue(
        mockExpediente as any
      );

      // Act
      const result = await corregirExpediente(mockExpedienteId, mockVersion);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain("Solo se pueden corregir expedientes");
      expect(result.error).toContain("Aprobado");
    });

    it("should return success for expediente in Devuelto state", async () => {
      // Arrange
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const mockExpediente = {
        id: mockExpedienteId,
        estado: "Devuelto",
        version: mockVersion,
      };

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );

      vi.spyOn(expedienteService, "findById").mockResolvedValue(
        mockExpediente as any
      );
      vi.spyOn(expedienteService, "corregirExpediente").mockResolvedValue({
        success: true,
      } as any);

      // Act
      const result = await corregirExpediente(mockExpedienteId, mockVersion);

      // Assert
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should handle errors from the service layer", async () => {
      // Arrange
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const mockExpediente = {
        id: mockExpedienteId,
        estado: "Devuelto",
        version: mockVersion,
      };

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );

      vi.spyOn(expedienteService, "findById").mockResolvedValue(
        mockExpediente as any
      );
      vi.spyOn(expedienteService, "corregirExpediente").mockRejectedValue(
        new Error("Optimistic lock error")
      );

      // Act
      const result = await corregirExpediente(mockExpedienteId, mockVersion);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain("Optimistic lock error");
    });

    it("should call revalidatePath on success", async () => {
      // Arrange
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: { id: mockUserId } },
        error: null,
      });

      const mockSupabase = {
        auth: { getUser: mockGetUser },
      };

      const { createClient } = await import("@/lib/supabase/server");
      (createClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockSupabase);

      const mockExpediente = {
        id: mockExpedienteId,
        estado: "Devuelto",
        version: mockVersion,
      };

      const { expedienteService } = await import(
        "@/lib/core/expediente.service"
      );
      const { revalidatePath } = await import("next/cache");

      vi.spyOn(expedienteService, "findById").mockResolvedValue(
        mockExpediente as any
      );
      vi.spyOn(expedienteService, "corregirExpediente").mockResolvedValue({
        success: true,
      } as any);

      // Act
      await corregirExpediente(mockExpedienteId, mockVersion);

      // Assert
      expect(revalidatePath).toHaveBeenCalledWith(
        `/plataforma/expedientes/${mockExpedienteId}`
      );
      expect(revalidatePath).toHaveBeenCalledWith(
        "/mis-expedientes"
      );
      expect(revalidatePath).toHaveBeenCalledWith(
        "/plataforma/at/dashboard"
      );
    });
  });
});