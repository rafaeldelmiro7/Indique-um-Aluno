import { CheckCircleIcon, GiftIcon, SchoolIcon, ShirtIcon } from "./icons";

/**
 * Composição decorativa do hero: uma prévia do acompanhamento da indicação,
 * com o prêmio em destaque. Não é interativa — apenas ilustra o produto.
 */
export default function HeroVisual({ rewardAmount }: { rewardAmount: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      {/* Halo atrás do card */}
      <div className="absolute inset-6 -z-10 rounded-[2rem] bg-brand-300/25 blur-2xl" />

      <div className="card overflow-hidden">
        {/* Barra superior estilo aplicativo */}
        <div className="flex items-center gap-2 border-b border-slate-200/80 bg-slate-50/80 px-5 py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="ml-2 text-xs font-semibold text-ink-muted">
            Minhas indicações
          </span>
        </div>

        <div className="space-y-4 p-5">
          {/* Indicação matriculada */}
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink">Ana Beatriz</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-muted">
                  <SchoolIcon className="h-3.5 w-3.5" />
                  Colégio Adventista de Ji-Paraná
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                <CheckCircleIcon className="h-3.5 w-3.5" />
                Matriculado
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-brand-50 px-3.5 py-3">
              <span className="flex items-center gap-2 text-xs font-medium text-brand-900">
                <GiftIcon className="h-4 w-4" />
                Seu prêmio
              </span>
              <span className="text-lg font-extrabold tracking-tight text-brand-700">
                {rewardAmount}
              </span>
            </div>
          </div>

          {/* Indicação em andamento */}
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink">Lucas Andrade</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-muted">
                  <SchoolIcon className="h-3.5 w-3.5" />
                  Escola Adventista de Vilhena
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                Visita agendada
              </span>
            </div>

            <div className="mt-4 flex items-center gap-1.5">
              <span className="h-1.5 flex-1 rounded-full bg-brand-600" />
              <span className="h-1.5 flex-1 rounded-full bg-brand-600" />
              <span className="h-1.5 flex-1 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Selo flutuante do kit de uniforme */}
      <div className="absolute -bottom-5 -left-4 hidden animate-float items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-card sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
          <ShirtIcon className="h-5 w-5" />
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-medium text-ink-muted">
            O aluno indicado ganha
          </span>
          <span className="block text-[13px] font-bold text-ink">
            Kit de uniforme
          </span>
        </span>
      </div>
    </div>
  );
}
