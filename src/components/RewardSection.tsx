import { Link } from "react-router-dom";
import fundoCampanha from "../assets/fundo-campanha-amarelo.png";
import { ArrowRightIcon, CalendarIcon, DocumentIcon, ShirtIcon } from "./icons";
import { AUDIENCE_COPY, CAMPAIGN } from "../lib/campaign";
import type { AmbassadorType } from "../lib/types";

export default function RewardSection({
  audience,
}: {
  audience: AmbassadorType;
}) {
  const copy = AUDIENCE_COPY[audience];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      {/* O fundo da campanha entra como textura decorativa, sob uma camada
          azul-marinho que preserva o contraste dos textos e botões. */}
      <div
        className="relative overflow-hidden rounded-3xl bg-brand-900 bg-cover bg-no-repeat bg-[position:64%_center] px-5 py-11 sm:bg-center sm:px-12 sm:py-16"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.94), rgba(23, 37, 84, 0.87)), url(${fundoCampanha})`,
        }}
      >
        {/* Halos decorativos */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-600/40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-brand-500/25 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Seu prêmio por cada aluno matriculado
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-brand-100">
              O valor é creditado no cartão Swile após a matrícula ser
              efetivada, e o aluno indicado recebe um {CAMPAIGN.uniformKit}.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/cadastro?tipo=${audience}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-800 transition hover:-translate-y-0.5 hover:bg-brand-50"
              >
                Quero indicar agora
                <ArrowRightIcon className="h-[18px] w-[18px]" />
              </Link>
              <Link
                to="/regulamento"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <DocumentIcon className="h-[18px] w-[18px]" />
                Ler o regulamento
              </Link>
            </div>
          </div>

          {/* Cartão do valor */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm">
            <p className="text-sm font-medium text-brand-100">
              {copy.rewardLabel}
            </p>
            <p className="mt-2 text-5xl font-extrabold tracking-tight text-white">
              {copy.rewardAmount}
            </p>

            <dl className="mt-7 space-y-4 border-t border-white/15 pt-6">
              <div className="flex items-start gap-3">
                <dt className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-white">
                  <ShirtIcon className="h-5 w-5" />
                  <span className="sr-only">Prêmio do aluno indicado</span>
                </dt>
                <dd className="text-sm leading-relaxed text-brand-100">
                  <span className="block font-semibold text-white">
                    Kit de uniforme
                  </span>
                  Para o aluno indicado, quando a matrícula é efetivada.
                </dd>
              </div>

              <div className="flex items-start gap-3">
                <dt className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-white">
                  <CalendarIcon className="h-5 w-5" />
                  <span className="sr-only">Prazo da campanha</span>
                </dt>
                <dd className="text-sm leading-relaxed text-brand-100">
                  <span className="block font-semibold text-white">
                    Até {CAMPAIGN.enrollmentDeadline}
                  </span>
                  Prazo para as matrículas serem confirmadas.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
