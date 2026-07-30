import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Field from "../components/Field";
import Logo from "../components/Logo";
import PageBackground from "../components/PageBackground";
import { LockIcon, MailIcon, ShieldIcon } from "../components/icons";
import { loginWithEmail } from "../lib/auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await loginWithEmail(email, password);
      navigate("/admin");
    } catch {
      setError("E-mail ou senha inválidos.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageBackground>
      <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <Link
            to="/"
            className="text-sm font-semibold text-ink-muted transition hover:text-ink"
          >
            Voltar
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-md flex-col justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="animate-fade-up text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-ink">
            <ShieldIcon className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">
            Acesso administrativo
          </h1>
          <p className="mt-3 text-base text-ink-soft">
            Painel de relatórios da rede — acesso restrito.
          </p>
        </div>

        {searchParams.get("unauthorized") && (
          <p
            role="alert"
            className="animate-fade-up mt-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800"
          >
            Essa conta não tem permissão de administrador.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="card animate-fade-up delay-1 mt-8 space-y-5 p-6 sm:p-7"
        >
          <Field label="E-mail" icon={MailIcon}>
            <input
              required
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </Field>

          <Field label="Senha" icon={LockIcon}>
            <input
              required
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </Field>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {submitting ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </main>
    </PageBackground>
  );
}
