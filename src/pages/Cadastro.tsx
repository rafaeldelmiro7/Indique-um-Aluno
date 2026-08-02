import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Field from "../components/Field";
import Logo from "../components/Logo";
import PageBackground from "../components/PageBackground";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  GiftIcon,
  IdIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  SchoolIcon,
  ShirtIcon,
  UserIcon,
  UsersIcon,
} from "../components/icons";
import { formatCpf, isValidCpf } from "../lib/cpf";
import { formatPhone } from "../lib/phone";
import { listSchools } from "../lib/firestore";
import { AUDIENCE_COPY, CAMPAIGN } from "../lib/campaign";
import { AMBASSADOR_TYPE_LABEL, type School } from "../lib/types";

const TRUST_ITEMS = [
  "Cadastro gratuito, sem compromisso",
  "Usamos seus dados apenas para esta indicação",
  "Você acompanha o status quando quiser",
];

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

  const copy = AUDIENCE_COPY[ambassadorType];
  const schoolsReady = !loadingSchools && schools.length > 0;

  if (done) {
    return (
      <PageBackground>
        <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircleIcon className="h-9 w-9" />
          </span>

          <h1 className="mt-7 text-3xl font-extrabold tracking-tight text-ink">
            Indicação enviada!
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Recebemos os seus dados. A escola vai entrar em contato com a
            família indicada em breve para agendar uma visita.
          </p>

          <div className="card mt-8 w-full p-6 text-left">
            <p className="text-sm font-semibold text-ink">Próximos passos</p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed text-ink-soft">
                  Acompanhe o andamento em{" "}
                  <Link
                    to="/status"
                    className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-600"
                  >
                    Consultar status
                  </Link>
                  , usando o seu CPF.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed text-ink-soft">
                  Com a matrícula efetivada, seu prêmio de {copy.rewardAmount} é
                  liberado conforme o regulamento.
                </span>
              </li>
            </ul>
          </div>

          <Link to="/" className="btn-secondary mt-8">
            Voltar para a página inicial
          </Link>
        </div>
      </PageBackground>
    );
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

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-12">
          {/* Formulário */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
              {AMBASSADOR_TYPE_LABEL[ambassadorType]}
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Faça sua indicação
            </h1>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-soft">
              Preencha os seus dados e os dados do aluno indicado. Depois que a
              matrícula for efetivada, você recebe seu prêmio.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Seus dados */}
              <section className="card p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <UserIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-ink">Seus dados</h2>
                    <p className="text-sm text-ink-muted">
                      Quem está fazendo a indicação
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field label="Nome completo" icon={UserIcon}>
                    <input
                      required
                      autoComplete="name"
                      placeholder="Seu nome completo"
                      value={ambassadorName}
                      onChange={(e) => setAmbassadorName(e.target.value)}
                      className="input"
                    />
                  </Field>

                  <Field label="E-mail" icon={MailIcon}>
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      value={ambassadorEmail}
                      onChange={(e) => setAmbassadorEmail(e.target.value)}
                      className="input"
                    />
                  </Field>

                  <Field label="WhatsApp para contato" icon={PhoneIcon}>
                    <input
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="(69) 90000-0000"
                      value={ambassadorPhone}
                      onChange={(e) => setAmbassadorPhone(formatPhone(e.target.value))}
                      className="input"
                    />
                  </Field>

                  <Field
                    label="CPF"
                    icon={IdIcon}
                    hint="Usado também para você consultar o status depois."
                  >
                    <input
                      required
                      inputMode="numeric"
                      placeholder="000.000.000-00"
                      value={ambassadorCpf}
                      onChange={(e) => setAmbassadorCpf(formatCpf(e.target.value))}
                      className="input"
                    />
                  </Field>

                  <Field label="Data de nascimento" icon={CalendarIcon}>
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

              {/* Dados do indicado */}
              <section className="card p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <UsersIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-ink">
                      Aluno indicado
                    </h2>
                    <p className="text-sm text-ink-muted">
                      Quem você está indicando para a rede
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Unidade escolar pretendida"
                    icon={schoolsReady ? SchoolIcon : undefined}
                  >
                    {loadingSchools ? (
                      <p className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-ink-muted">
                        Carregando unidades…
                      </p>
                    ) : schools.length === 0 ? (
                      <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        Nenhuma unidade cadastrada ainda. Peça ao administrador
                        para cadastrar as escolas da rede.
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

                  <Field label="Nome do responsável" icon={UserIcon}>
                    <input
                      required
                      placeholder="Quem responde pelo aluno"
                      value={studentResponsibleName}
                      onChange={(e) => setStudentResponsibleName(e.target.value)}
                      className="input"
                    />
                  </Field>

                  <Field label="Nome completo do aluno" icon={UserIcon}>
                    <input
                      required
                      placeholder="Nome do aluno indicado"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="input"
                    />
                  </Field>

                  <Field label="E-mail" icon={MailIcon} optional>
                    <input
                      type="email"
                      placeholder="email@exemplo.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="input"
                    />
                  </Field>

                  <Field label="WhatsApp para contato" icon={PhoneIcon}>
                    <input
                      required
                      inputMode="tel"
                      placeholder="(69) 90000-0000"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(formatPhone(e.target.value))}
                      className="input"
                    />
                  </Field>
                </div>
              </section>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {error}
                </p>
              )}

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitting || schools.length === 0}
                  className="btn-primary w-full sm:w-auto"
                >
                  {submitting ? "Enviando…" : "Enviar minha indicação"}
                  {!submitting && (
                    <ArrowRightIcon className="h-[18px] w-[18px]" />
                  )}
                </button>

                <p className="flex items-center gap-2 text-xs font-medium text-ink-muted">
                  <LockIcon className="h-4 w-4 shrink-0 text-emerald-600" />
                  Seus dados estão protegidos
                </p>
              </div>
            </form>
          </div>

          {/* Resumo lateral */}
          <aside className="animate-fade-up delay-2 lg:sticky lg:top-8 lg:self-start">
            <div className="card overflow-hidden">
              <div className="bg-brand-900 px-6 py-6">
                <p className="text-xs font-medium text-brand-100">
                  {copy.rewardLabel}
                </p>
                <p className="mt-1.5 text-4xl font-extrabold tracking-tight text-white">
                  {copy.rewardAmount}
                </p>
              </div>

              <dl className="space-y-4 p-6">
                <div className="flex items-start gap-3">
                  <dt className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShirtIcon className="h-5 w-5" />
                    <span className="sr-only">Prêmio do aluno indicado</span>
                  </dt>
                  <dd className="text-sm leading-relaxed text-ink-soft">
                    <span className="block font-semibold text-ink">
                      Kit de uniforme
                    </span>
                    Para o aluno indicado, após a matrícula.
                  </dd>
                </div>

                <div className="flex items-start gap-3">
                  <dt className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <CalendarIcon className="h-5 w-5" />
                    <span className="sr-only">Prazo da campanha</span>
                  </dt>
                  <dd className="text-sm leading-relaxed text-ink-soft">
                    <span className="block font-semibold text-ink">
                      Até {CAMPAIGN.enrollmentDeadline}
                    </span>
                    Prazo para confirmar a matrícula.
                  </dd>
                </div>

                <div className="flex items-start gap-3">
                  <dt className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <GiftIcon className="h-5 w-5" />
                    <span className="sr-only">Resgate do prêmio</span>
                  </dt>
                  <dd className="text-sm leading-relaxed text-ink-soft">
                    <span className="block font-semibold text-ink">
                      Cartão Swile
                    </span>
                    Resgate a partir de {CAMPAIGN.rewardRedemptionDate}.
                  </dd>
                </div>
              </dl>

              <div className="border-t border-slate-200/80 px-6 py-5">
                <ul className="space-y-2.5">
                  {TRUST_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckIcon
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                        strokeWidth={2.5}
                      />
                      <span className="text-xs leading-relaxed text-ink-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/regulamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-sm font-semibold text-brand-700 underline decoration-brand-200 underline-offset-2 transition hover:decoration-brand-600"
                >
                  Ler o regulamento completo
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </PageBackground>
  );
}
