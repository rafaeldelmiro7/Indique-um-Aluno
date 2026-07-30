import type { ReactNode } from "react";

/**
 * Fundo padrão das páginas públicas: gradiente suave no topo com dois halos
 * discretos, sobre a cor de superfície. Puramente decorativo.
 */
export default function PageBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-brand-50 via-brand-50/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-32 -z-10 h-72 w-72 rounded-full bg-brand-300/20 blur-3xl"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
