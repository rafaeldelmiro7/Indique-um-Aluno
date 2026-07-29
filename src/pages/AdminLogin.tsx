import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="text-2xl font-bold text-slate-900">Acesso administrativo</h1>
      <p className="mt-2 text-sm text-slate-600">
        Painel de relatórios da rede — acesso restrito.
      </p>

      {searchParams.get("unauthorized") && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Essa conta não tem permissão de administrador.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          required
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          required
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
