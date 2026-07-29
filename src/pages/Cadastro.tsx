import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DoodleBackground from "../components/DoodleBackground";
import Field from "../components/Field";
import { formatCpf, isValidCpf } from "../lib/cpf";
import { listSchools } from "../lib/firestore";
import { AMBASSADOR_TYPE_LABEL, type School } from "../lib/types";

export default function Cadastro() {
  const [searchParams] = useSearchParams();
  const ambassadorType = searchParams.get("tipo") === "colaborador" ? "colaborador" : "pais";

  const [schools, setSchools] = useState<School[]>([]);
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const [ambassadorName, setAmbassadorName] = useState("");
  const [ambassadorEmail, setAmbassadorEmail] = useState("");
  const [ambassadorPhone, setAmbassadorPhone] = useState("");
  const [ambassadorCpf, setAmbassadorCpf] = useState("");
  const [ambassadorBirthDate, setAmbassadorBirthDate] = useState("");

  const [studentResponsibleName, setStudentResponsibleName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [schoolId, setSchoolId] = useState("");

  useEffect(() => {
    listSchools()
      .then((list) => {
        setSchools(list);
        if (list.length > 0) setSchoolId(list[0].id);
      })
      .catch(() => setError("Não foi possível carregar as escolas da rede."))
      .finally(() => setLoadingSchools(false));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!schoolId) {
      setError("Selecione a unidade escolar pretendida.");
      return;
    }
    if (!isValidCpf(ambassadorCpf)) {
      setError("CPF inválido. Confira os números digitados.");
      return;
    }

    setSubmitting(true);
    try {
      const school = schools.find((s) => s.id === schoolId)!;
      const res = await fetch("/api/submit-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ambassadorType,
          ambassadorName,
          ambassadorEmail,
          ambassadorPhone,
          ambassadorCpf,
          ambassadorBirthDate,
          studentResponsibleName,
          studentName,
          studentEmail,
          studentPhone,
          schoolId: school.id,
          schoolName: school.name,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Não foi possível enviar seu cadastro.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <DoodleBackground>
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Indicação enviada com sucesso!
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            A escola vai entrar em contato com a família indicada em breve.
          </p>
          <Link to="/" className="mt-6 font-semibold text-brand-700">
            Voltar para a página inicial
          </Link>
        </div>
      </DoodleBackground>
    );
  }

  return (
    <DoodleBackground>
      <div className="mx-auto flex max-w-2xl flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Indique um aluno</h1>
      <p className="mt-2 text-sm text-slate-600">
        Preencha seus dados e os dados de quem você está indicando. Após a
        matrícula efetivada, você recebe seu prêmio.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <Field label="Você é">
          <div className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800">
            {AMBASSADOR_TYPE_LABEL[ambassadorType]}
          </div>
        </Field>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-700">
            Seus dados
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Nome completo">
              <input
                required
                value={ambassadorName}
                onChange={(e) => setAmbassadorName(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="E-mail">
              <input
                required
                type="email"
                value={ambassadorEmail}
                onChange={(e) => setAmbassadorEmail(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Telefone/WhatsApp">
              <input
                required
                value={ambassadorPhone}
                onChange={(e) => setAmbassadorPhone(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="CPF">
              <input
                required
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={ambassadorCpf}
                onChange={(e) => setAmbassadorCpf(formatCpf(e.target.value))}
                className="input"
              />
            </Field>
            <Field label="Data de Nascimento">
              <input
                required
                type="date"
                value={ambassadorBirthDate}
                onChange={(e) => setAmbassadorBirthDate(e.target.value)}
                className="input"
              />
            </Field>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-700">
            Indicado
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Unidade escolar pretendida">
              {loadingSchools ? (
                <p className="text-sm text-slate-500">Carregando unidades...</p>
              ) : schools.length === 0 ? (
                <p className="text-sm text-amber-600">
                  Nenhuma unidade cadastrada ainda. Peça ao administrador para
                  cadastrar as escolas da rede.
                </p>
              ) : (
                <select
                  required
                  value={schoolId}
                  onChange={(e) => setSchoolId(e.target.value)}
                  className="input"
                >
                  {schools.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <Field label="Nome do responsável">
              <input
                required
                value={studentResponsibleName}
                onChange={(e) => setStudentResponsibleName(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Nome do aluno">
              <input
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="E-mail">
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Telefone/WhatsApp">
              <input
                required
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                className="input"
              />
            </Field>
          </div>
        </section>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting || schools.length === 0}
          className="w-full rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
        >
          {submitting ? "Enviando..." : "Enviar indicação"}
        </button>
      </form>
      </div>
    </DoodleBackground>
  );
}
