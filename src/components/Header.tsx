import { Link } from "react-router-dom";
import Logo from "./Logo";
import { AMBASSADOR_TYPE_LABEL, type AmbassadorType } from "../lib/types";

interface HeaderProps {
  audience: AmbassadorType;
  onAudienceChange: (audience: AmbassadorType) => void;
}

const AUDIENCES: AmbassadorType[] = ["pais", "colaborador"];

export default function Header({ audience, onAudienceChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <div className="flex items-center gap-3">
          <div
            role="tablist"
            aria-label="Escolha o seu perfil"
            className="flex rounded-full bg-slate-100 p-1"
          >
            {AUDIENCES.map((option) => {
              const active = audience === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onAudienceChange(option)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "bg-white text-brand-700 shadow-sm"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {AMBASSADOR_TYPE_LABEL[option]}
                </button>
              );
            })}
          </div>

          <Link
            to={`/cadastro?tipo=${audience}`}
            className="hidden rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:inline-flex"
          >
            Quero indicar
          </Link>
        </div>
      </div>
    </header>
  );
}
