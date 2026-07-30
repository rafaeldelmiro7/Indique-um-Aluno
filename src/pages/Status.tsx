import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Field from "../components/Field";
import Logo from "../components/Logo";
import PageBackground from "../components/PageBackground";
import StatusBadge from "../components/StatusBadge";
import { IdIcon, SchoolIcon, SearchIcon } from "../components/icons";
import { formatCpf, isValidCpf } from "../lib/cpf";
import type { ReferralStatus } from "../lib/types";

interface StatusResult {
  studentName: string;
  schoolName: string;
  status: ReferralStatus;
  createdAt: number;
}

export default function Status() {
  const [cpf, setCpf] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<StatusResult[] | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setResults(null);

    if (!isValidCpf(cpf)) {
      setError("CPF inválido. Confira os números digitados.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/check-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Não foi possível consultar o status.");
      }
      const data = (await res.json()) as { referrals: StatusResult[] };
      setResults(data.referrals);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
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

      <main className="mx-auto max-w-xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="animate-fade-up text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
            <SearchIcon className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Consultar status
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">
            Informe o CPF usado na indicação para ver o andamento de cada aluno
            que você indicou.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card animate-fade-up delay-1 mt-9 space-y-5 p-6 sm:p-7">
          <Field label="CPF" icon={IdIcon}>
            <input
              required
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
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

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Consultando…" : "Consultar minhas indicações"}
          </button>
        </form>

        {results && results.length === 0 && (
          <div className="card mt-8 p-8 text-center">
            <p className="font-semibold text-ink">
              Nenhuma indicação encontrada
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Não localizamos indicações para esse CPF. Confira os números ou
              faça a sua primeira indicação.
            </p>
            <Link to="/cadastro" className="btn-primary mt-6">
              Fazer uma indicação
            </Link>
          </div>
        )}

        {results && results.length > 0 && (
          <section className="mt-9">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-muted">
              {results.length}{" "}
              {results.length === 1 ? "indicação" : "indicações"}
            </h2>

            <ul className="mt-4 space-y-3">
              {results.map((r, i) => (
                <li key={i} className="card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-ink">{r.studentName}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
                        <SchoolIcon className="h-4 w-4 shrink-0" />
                        {r.schoolName}
                      </p>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </PageBackground>
  );
}
