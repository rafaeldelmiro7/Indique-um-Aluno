import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Field from "../components/Field";
import StatusBadge from "../components/StatusBadge";
import { formatCpf, isValidCpf } from "../lib/cpf";
import type { ReferralStatus } from "../lib/types";

interface StatusResult {
  studentName: string;
  schoolName: string;
  grade: string;
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
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Conferir status</h1>
      <p className="mt-2 text-sm text-slate-600">
        Digite o CPF usado no cadastro da indicação para ver o status.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Field label="CPF">
          <input
            required
            inputMode="numeric"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(formatCpf(e.target.value))}
            className="input"
          />
        </Field>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
        >
          {submitting ? "Consultando..." : "Consultar"}
        </button>
      </form>

      {results && results.length === 0 && (
        <p className="mt-8 text-center text-sm text-slate-500">
          Nenhuma indicação encontrada para esse CPF.
        </p>
      )}

      {results && results.length > 0 && (
        <div className="mt-8 space-y-3">
          {results.map((r, i) => (
            <div key={i} className="rounded-xl border border-slate-100 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{r.studentName}</p>
                  <p className="text-xs text-slate-500">
                    {r.schoolName}
                    {r.grade ? ` · ${r.grade}` : ""}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-slate-600">
        <Link to="/" className="font-semibold text-brand-700">
          Voltar para a página inicial
        </Link>
      </p>
    </div>
  );
}
