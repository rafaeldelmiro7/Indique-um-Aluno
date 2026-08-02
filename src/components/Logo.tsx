import { Link } from "react-router-dom";
import logo from "../assets/logo-educacao-adventista.png";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5 rounded-xl"
      aria-label="Indique e Ganhe — página inicial"
    >
      <img
        src={logo}
        alt="Educação Adventista"
        className="h-9 w-9 shrink-0 rounded-xl shadow-sm"
      />
      <span className="leading-tight">
        <span className="block text-[15px] font-bold tracking-tight text-ink">
          Indique e Ganhe
        </span>
        {!compact && (
          <span className="block text-[11px] font-medium text-ink-muted">
            Rede Adventista de Educação - ASuR
          </span>
        )}
      </span>
    </Link>
  );
}
