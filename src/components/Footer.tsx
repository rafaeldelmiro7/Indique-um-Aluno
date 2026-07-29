import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6">
        <span>© {new Date().getFullYear()} Indique um Aluno. Todos os direitos reservados.</span>
        <div className="flex gap-4">
          <Link to="/admin/login" className="hover:text-brand-700">
            Acesso administrativo
          </Link>
        </div>
      </div>
    </footer>
  );
}
