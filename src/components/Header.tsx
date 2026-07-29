import type { AmbassadorType } from "../lib/types";

interface HeaderProps {
  audience: AmbassadorType;
  onAudienceChange: (audience: AmbassadorType) => void;
}

export default function Header({ audience, onAudienceChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-lg font-bold tracking-tight text-brand-800">
          Indique um Aluno
        </span>
        <nav className="flex overflow-hidden rounded-full border border-slate-200 text-sm font-semibold">
          <button
            onClick={() => onAudienceChange("pais")}
            className={`px-4 py-2 transition ${
              audience === "pais"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Parceiro
          </button>
          <button
            onClick={() => onAudienceChange("colaborador")}
            className={`px-4 py-2 transition ${
              audience === "colaborador"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Colaboradores
          </button>
        </nav>
      </div>
    </header>
  );
}
