import { describe, it, expect, vi, beforeEach } from "vitest";

// Mocks — must be before imports
const mockSingle = vi.fn();
const mockFrom = vi.fn();
const mockSupabaseClient = { from: mockFrom };

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockReturnValue(mockSupabaseClient),
}));

import type { DiagnosticoCompleto } from "@/types/core/diagnostico";

// Control variables for mock chain behavior
let _selectResult: any = { data: null, error: null };
let _updateError: string | null = null;

function resetMocks() {
  _selectResult = { data: null, error: null };
  _updateError = null;
}

/**
 * Builds a thenable query chain that mimics Supabase's PostgrestFilterBuilder.
 *
 * Flow: from("table") → update(...) → eq(...) → eq(...) → await
 *       from("table") → select(...) → eq(...) → single() → await
 *
 * The chain is thenable. When awaited, it resolves to the configured result.
 */
function makeQueryChain() {
  const chain = {
    // Non-terminal chain methods: return this
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    range: vi.fn().mockReturnThis(),
    is: vi.fn().mockReturnThis(),
    not: vi.fn().mockReturnThis(),

    // Terminal: single() → returns a Promise directly
    single: vi.fn().mockImplementation(() =>
      Promise.resolve(_selectResult)
    ),

    // Terminal: select() → returns this (chaining continues)
    select: vi.fn().mockReturnThis(),

    // Terminal: update() → returns a THENABLE that resolves to controlled result
    update: vi.fn().mockImplementation(() => {
      const err = _updateError;
      _updateError = null; // consume
      const result = err
        ? { data: null, error: { message: err } }
        : { data: null, error: null };
      return {
        eq: vi.fn().mockReturnThis(),
        then: (resolve: (v: any) => any) => Promise.resolve(result).then(resolve),
      };
    }),

    // Make the chain itself thenable (for update().eq().eq() await)
    then: (resolve: (v: any) => any) =>
      Promise.resolve({ data: null, error: null }).then(resolve),
  };

  return chain;
}

function mockDiagnosticoValido(): DiagnosticoCompleto {
  return {
    veredicto: "Regular",
    nivel_confianza: "Medio",
    resumen: "Resumen ejecutivo del diagnóstico",
    problemas: [
      {
        id: "p1",
        nombre: "Filtraciones en cubierta",
        categoria: "importante",
        descripcion: "Filtraciones detectadas en pendiente norte",
        por_que_importa: "Afecta al aislamiento térmico",
        si_no_actuas: "Empeorará la calificación",
        nivel_confianza: "Alto",
        actuacion_asociada: "Reparación cubierta",
      },
    ],
    actuaciones: [
      {
        id: "a1",
        posicion: 1,
        nombre: "Aislamiento fachada SATE",
        inversion_estimada: 12000,
        ahorro_anual: 1800,
        veredicto: "merece",
        payback: 6.7,
        descripcion: "Sistema de aislamiento térmico exterior",
        justificacion_posicion: "Mejor relación coste-beneficio",
        nivel_confianza_ahorro: "Medio",
        vida_util: 25,
        veredicto_detalle: "Amortizable en 6.7 años",
      },
    ],
    ahorro_total: 1800,
    coste_actual: 3600,
    coste_tras_mejoras: 1800,
    coste_inaccion_1a: 3600,
    coste_inaccion_5a: 18000,
    coste_inaccion_10a: 36000,
    impacto_reventa: "+5% valor mercado",
    riesgo_regulatorio: "No cumple CTE DB-HE 2019",
    observaciones_at: "Cliente informado de plazos",
  };
}

describe("diagnostico actions", () => {
  let queryChain: ReturnType<typeof makeQueryChain>;

  beforeEach(() => {
    vi.clearAllMocks();
    resetMocks();
    queryChain = makeQueryChain();
    mockFrom.mockReturnValue(queryChain);
  });

  // ----------------------------------------------------------
  // iniciarDiagnostico
  // ----------------------------------------------------------
  describe("iniciarDiagnostico", () => {
    it("should return success when diagnostic is created", async () => {
      // First call (from obtenerEstadoDiagnostico): returns SinDiagnostico
      _selectResult = {
        data: {
          id: "exp-1",
          estado_diagnostico: "SinDiagnostico" as const,
          diagnostico_version: 1,
          diagnostico: null,
        },
        error: null,
      };

      // update returns success (no error)
      _updateError = null;

      const { iniciarDiagnostico } = await import("../diagnostico");

      const result = await iniciarDiagnostico("exp-1", "user-1", 1);

      expect(result.success).toBe(true);
      expect(result.state).toBeDefined();
      expect(result.state!.estado).toBe("Borrador");
      expect(result.state!.version).toBe(2);
    });

    it("should return error when expediente not found", async () => {
      _selectResult = {
        data: null,
        error: { message: "Not found" },
      };

      const { iniciarDiagnostico } = await import("../diagnostico");

      const result = await iniciarDiagnostico("exp-1", "user-1", 1);

      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should return error when already started", async () => {
      _selectResult = {
        data: {
          id: "exp-1",
          estado_diagnostico: "Borrador" as const,
          diagnostico_version: 2,
          diagnostico: {},
        },
        error: null,
      };

      const { iniciarDiagnostico } = await import("../diagnostico");

      const result = await iniciarDiagnostico("exp-1", "user-1", 1);

      expect(result.success).toBe(false);
      expect(result.error).toContain("ya ha sido iniciado");
    });
  });

  // ----------------------------------------------------------
  // guardarBorradorDiagnostico
  // ----------------------------------------------------------
  describe("guardarBorradorDiagnostico", () => {
    it("should save draft successfully", async () => {
      _updateError = null;

      const { guardarBorradorDiagnostico } = await import("../diagnostico");
      const diagnostico = mockDiagnosticoValido();

      const result = await guardarBorradorDiagnostico(
        "exp-1",
        "user-1",
        1,
        diagnostico
      );

      expect(result.success).toBe(true);
      expect(result.newVersion).toBe(2);
    });

    it("should return error on DB failure", async () => {
      _updateError = "DB update failed";

      const { guardarBorradorDiagnostico } = await import("../diagnostico");

      const result = await guardarBorradorDiagnostico(
        "exp-1",
        "user-1",
        1,
        mockDiagnosticoValido()
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain("DB update failed");
    });
  });

  // ----------------------------------------------------------
  // completarDiagnostico
  // ----------------------------------------------------------
  describe("completarDiagnostico", () => {
    it("should complete diagnostic successfully", async () => {
      _updateError = null;

      const { completarDiagnostico } = await import("../diagnostico");

      const result = await completarDiagnostico(
        "exp-1",
        "user-1",
        1,
        mockDiagnosticoValido()
      );

      expect(result.success).toBe(true);
      expect(result.newVersion).toBe(2);
    });

    it("should return validation errors when resumen is too short", async () => {
      const { completarDiagnostico } = await import("../diagnostico");
      const diagnostico = mockDiagnosticoValido();
      diagnostico.resumen = "Corto";

      const result = await completarDiagnostico("exp-1", "user-1", 1, diagnostico);

      expect(result.success).toBe(false);
      expect(result.errores_validacion).toBeDefined();
      expect(result.errores_validacion!.length).toBeGreaterThan(0);
    });

    it("should return validation errors when no problems", async () => {
      const { completarDiagnostico } = await import("../diagnostico");
      const diagnostico = mockDiagnosticoValido();
      diagnostico.problemas = [];

      const result = await completarDiagnostico("exp-1", "user-1", 1, diagnostico);

      expect(result.success).toBe(false);
      expect(result.errores_validacion).toBeDefined();
      expect(
        result.errores_validacion!.some((e) =>
          e.toLowerCase().includes("problema")
        )
      ).toBe(true);
    });

    it("should return validation errors when no actuaciones", async () => {
      const { completarDiagnostico } = await import("../diagnostico");
      const diagnostico = mockDiagnosticoValido();
      diagnostico.actuaciones = [];

      const result = await completarDiagnostico("exp-1", "user-1", 1, diagnostico);

      expect(result.success).toBe(false);
      expect(result.errores_validacion).toBeDefined();
      expect(
        result.errores_validacion!.some((e) =>
          e.toLowerCase().includes("actuaci")
        )
      ).toBe(true);
    });

    it("should allow completion when coste_actual is null (optional field)", async () => {
      const { completarDiagnostico } = await import("../diagnostico");
      const diagnostico = mockDiagnosticoValido();
      (diagnostico.coste_actual as number | null) = null;

      const result = await completarDiagnostico("exp-1", "user-1", 1, diagnostico);

      // coste_actual es opcional, así que debe permitir null
      expect(result.success).toBe(true);
      expect(result.newVersion).toBe(2);
    });
  });

  // ----------------------------------------------------------
  // obtenerEstadoDiagnostico
  // ----------------------------------------------------------
  describe("obtenerEstadoDiagnostico", () => {
    it("should return diagnostic state", async () => {
      _selectResult = {
        data: {
          id: "exp-1",
          estado_diagnostico: "Completado" as const,
          diagnostico_version: 3,
          diagnostico: { veredicto: "Bueno" },
        },
        error: null,
      };

      const { obtenerEstadoDiagnostico } = await import("../diagnostico");

      const result = await obtenerEstadoDiagnostico("exp-1");

      expect(result.data).toBeDefined();
      expect(result.data!.estado).toBe("Completado");
      expect(result.data!.version).toBe(3);
      expect(result.data!.diagnostico).toEqual({ veredicto: "Bueno" });
    });

    it("should return error on DB failure", async () => {
      _selectResult = {
        data: null,
        error: { message: "DB error" },
      };

      const { obtenerEstadoDiagnostico } = await import("../diagnostico");

      const result = await obtenerEstadoDiagnostico("exp-1");

      expect(result.error).toBeTruthy();
    });
  });

  // ----------------------------------------------------------
  // verificarDiagnosticoCompletado
  // ----------------------------------------------------------
  describe("verificarDiagnosticoCompletado", () => {
    it("should return true when completado", async () => {
      _selectResult = {
        data: {
          id: "exp-1",
          estado_diagnostico: "Completado" as const,
          diagnostico_version: 3,
          diagnostico: {},
        },
        error: null,
      };

      const { verificarDiagnosticoCompletado } = await import("../diagnostico");

      const result = await verificarDiagnosticoCompletado("exp-1");

      expect(result.completado).toBe(true);
    });

    it("should return false when not completado", async () => {
      _selectResult = {
        data: {
          id: "exp-1",
          estado_diagnostico: "Borrador" as const,
          diagnostico_version: 2,
          diagnostico: {},
        },
        error: null,
      };

      const { verificarDiagnosticoCompletado } = await import("../diagnostico");

      const result = await verificarDiagnosticoCompletado("exp-1");

      expect(result.completado).toBe(false);
    });
  });
});