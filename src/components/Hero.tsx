import { Link } from "react-router-dom";
import promoMatriculas from "../assets/matriculas-abertas-2027.png";
import { ArrowRightIcon, CheckIcon, SearchIcon } from "./icons";
import { AUDIENCE_COPY } from "../lib/campaign";
import type { AmbassadorType } from "../lib/types";

export default function Hero({ audience }: { audience: AmbassadorType }) {
  const copy = AUDIENCE_COPY[audience];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6 sm:pb-16 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Coluna de texto */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {copy.badge}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {copy.title}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-[22px] sm:leading-relaxed">
            {copy.subtitleBefore}
            <strong className="font-bold italic underline">
              {copy.rewardAmount}
            </strong>
            {copy.subtitleAfter}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to={`/cadastro?tipo=${audience}`} className="btn-primary">
              Fazer minha indicação
              <ArrowRightIcon className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/status" className="btn-secondary">
              <SearchIcon className="h-[18px] w-[18px]" />
              Consultar status
            </Link>
          </div>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {copy.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-[15px] font-medium text-ink-soft">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna visual */}
        <div className="animate-fade-up delay-2 flex justify-center lg:justify-end">
          <img
            src={promoMatriculas}
            alt="Matrículas abertas 2027 da Educação Adventista"
            width={941}
            height={1672}
            decoding="async"
            className="h-auto w-full max-w-[340px] rounded-3xl object-contain shadow-card ring-1 ring-slate-200/70 sm:max-w-[400px] lg:max-w-[440px] xl:max-w-[480px]"
          />
        </div>
      </div>
    </section>
  );
}
