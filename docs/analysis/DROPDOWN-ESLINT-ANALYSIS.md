# Análisis Detallado: ESLint en DropdownMenu.tsx

**Fecha:** 10 de julio de 2026  
**Componente:** `src/components/ui/DropdownMenu.tsx`  
**Regla ESLint:** `react-hooks/rules-of-hooks`

---

## 1. Regla ESLint Deshabilitada

**Regla:** `react-hooks/rules-of-hooks`

Esta regla viene de `eslint-plugin-react-hooks` (incluida en `eslint-config-next/core-web-vitals`).

**Propósito:** Garantizar que los hooks de React (`useState`, `useContext`, `useEffect`, etc.) solo se llamen:
- En el nivel superior de un componente funcional
- En el nivel superior de un hook personalizado
- Nunca dentro de condicionales, bucles o funciones anidadas

---

## 2. Código Antes y Después

### ANTES (con eslint-disable)

```typescript
// Líneas 72-87
export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  className = '',
}) => {
  const ctx = useContext(DropdownMenuContext);  // ✅ Hook en nivel superior
  if (!ctx) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');

  const handleClick = () => {
    ctx.setOpen(!ctx.open);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (
    // eslint-disable-next-line react-hooks/rules-of-hooks
    <button
      // eslint-disable-next-line react-hooks/rules-of-hooks
      ref={ctx.triggerRef}
      type="button"
      onClick={handleClick}
      aria-haspopup="true"
      // eslint-disable-next-line react-hooks/rules-of-hooks
      aria-expanded={ctx.open}
      className={className}
    >
      {children}
    </button>
  );
};
```

---

## 3. Por Qué la Regla Falla en Este Punto

**Problema:** Los `eslint-disable` están colocados **incorrectamente**.

La regla `react-hooks/rules-of-hooks` se dispara cuando:
1. Se llama a un hook dentro de un condicional, bucle o función anidada
2. Se llama a un hook después de un `return` condicional

**En este caso:**
- `useContext(DropdownMenuContext)` está en el nivel superior ✅ (correcto)
- El `return` está en el nivel superior ✅ (correcto)
- Los atributos `ref` y `aria-expanded` **no son hooks**, son solo propiedades JSX

**El problema real:** Los `eslint-disable` están en lugares donde **no hay hooks**. Esto es ruido de linting.

---

## 4. Intento de Reestructuración sin eslint-disable

### Opción A: Extraer valores a variables (RECOMENDADO)

```typescript
export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  className = '',
}) => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');

  const handleClick = () => {
    ctx.setOpen(!ctx.open);
  };

  // Extraer valores a variables antes del JSX
  const triggerRef = ctx.triggerRef;
  const isOpen = ctx.open;

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={handleClick}
      aria-haspopup="true"
      aria-expanded={isOpen}
      className={className}
    >
      {children}
    </button>
  );
};
```

**Ventaja:** Elimina completamente los eslint-disable. El código es más legible.

**Desventaja:** Mínima (solo 2 líneas extra).

---

### Opción B: Usar un hook personalizado

```typescript
// Hook personalizado
function useDropdownMenuTrigger() {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');
  return ctx;
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  className = '',
}) => {
  const ctx = useDropdownMenuTrigger();

  const handleClick = () => {
    ctx.setOpen(!ctx.open);
  };

  return (
    <button
      ref={ctx.triggerRef}
      type="button"
      onClick={handleClick}
      aria-haspopup="true"
      aria-expanded={ctx.open}
      className={className}
    >
      {children}
    </button>
  );
};
```

**Ventaja:** Patrón más escalable si se reutiliza.

**Desventaja:** Más código para un caso simple.

---

## 5. Conclusión y Recomendación

### ✅ SOLUCIÓN RECOMENDADA: Opción A

**Razón:**
1. Elimina completamente los `eslint-disable` innecesarios
2. El código es más legible y explícito
3. No añade complejidad innecesaria
4. Respeta la regla de React Hooks sin excepciones

**Cambio a realizar:**
```typescript
// Líneas 61-88
export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  className = '',
}) => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');

  const handleClick = () => {
    ctx.setOpen(!ctx.open);
  };

  // Extraer valores antes del JSX
  const triggerRef = ctx.triggerRef;
  const isOpen = ctx.open;

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={handleClick}
      aria-haspopup="true"
      aria-expanded={isOpen}
      className={className}
    >
      {children}
    </button>
  );
};
```

**Resultado:** 
- ✅ Sin eslint-disable
- ✅ Código más limpio
- ✅ Cumple con `react-hooks/rules-of-hooks`
- ✅ Mejor mantenibilidad

---

## Análisis de la Línea 20-21 (Type Definition)

También hay un `eslint-disable` en la definición del tipo:

```typescript
type DropdownMenuContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  // eslint-disable-next-line react-hooks/rules-of-hooks
};
```

**Este es un falso positivo aún más claro:** No hay hooks en una definición de tipo. Este `eslint-disable` debe eliminarse directamente.

---

**Conclusión Final:** Los `eslint-disable` en este archivo son **innecesarios y pueden eliminarse completamente** reestructurando el código de forma trivial.
