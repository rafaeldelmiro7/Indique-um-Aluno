import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Programa de incentivo à indicação de novos alunos da Rede
              Adventista de Educação.
            </p>
          </div>

          <nav aria-label="Links do rodapé">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Navegação
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/cadastro"
                  className="font-medium text-ink-soft transition hover:text-brand-700"
                >
                  Fazer uma indicação
                </Link>
              </li>
              <li>
                <Link
                  to="/status"
                  className="font-medium text-ink-soft transition hover:text-brand-700"
                >
                  Consultar status
                </Link>
              </li>
              <li>
                <Link
                  to="/regulamento"
                  className="font-medium text-ink-soft transition hover:text-brand-700"
                >
                  Regulamento da campanha
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="font-medium text-ink-muted transition hover:text-brand-700"
                >
                  Acesso administrativo
                </Link>
              </li>
            </ul>
          </nav>

          <div className="max-w-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Dúvidas
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Para esclarecimentos sobre a campanha, procure a administração da
              sua unidade escolar.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200/70 pt-6">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} Rede Adventista de Educação.
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
