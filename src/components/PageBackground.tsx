import type { ReactNode } from "react";
import fundoBicolor from "../assets/Imagem Bicolor.png";

/**
 * Fundo padrão das páginas públicas: o degradê bicolor da campanha (azul no
 * topo, região clara no centro e amarelo na base), sob uma camada branca
 * translúcida que o mantém apenas como ambientação, mais o gradiente suave
 * no topo e dois halos. Puramente decorativo.
 */
export default function PageBackground({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-top bg-no-repeat bg-scroll"
      style={{
        // Cor de continuação alinhada ao amarelo suave da base da imagem,
        // usada apenas enquanto o arquivo carrega.
        backgroundColor: "#FDF6E7",
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.82)), url(${fundoBicolor})`,
      }}
    >
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
