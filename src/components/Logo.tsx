import { Link } from "react-router-dom";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5 rounded-xl"
      aria-label="Indique e Ganhe — página inicial"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow-sm transition group-hover:bg-brand-700">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M5 17.5 12 5l7 12.5H5Z" fill="currentColor" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-bold tracking-tight text-ink">
          Indique e Ganhe
        </span>
        {!compact && (
          <span className="block text-[11px] font-medium text-ink-muted">
            Rede Adventista ASuR
          </span>
        )}
      </span>
    </Link>
  );
}
