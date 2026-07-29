import { Link } from "react-router-dom";
import type { AmbassadorType } from "../lib/types";

const COPY: Record<
  AmbassadorType,
  { title: string; body: string }
> = {
  pais: {
    title: "Indique e Ganhe com a nossa Rede de Ensino!",
    body: "Valorizamos a confiança de cada família que acredita em nossa proposta pedagógica. Indique novos alunos para qualquer uma das nossas escolas e, após a matrícula efetivada, você recebe seu prêmio exclusivo.",
  },
  colaborador: {
    title: "Indique e Ganhe como Colaborador!",
    body: "Você conhece o nosso trabalho de dentro. Indique novos alunos para a rede e, após a matrícula efetivada, receba reconhecimento e prêmios exclusivos para colaboradores.",
  },
};

export default function Hero({ audience }: { audience: AmbassadorType }) {
  const copy = COPY[audience];

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {copy.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          {copy.body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={`/cadastro?tipo=${audience}`}
            className="rounded-full bg-brand-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
          >
            Quero Indicar
          </Link>
          <Link
            to="/status"
            className="rounded-full border border-brand-200 px-8 py-3 text-base font-semibold text-brand-700 transition hover:bg-brand-100"
          >
            Conferir Status
          </Link>
          <Link
            to="/regulamento"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-3 text-base font-semibold text-brand-700 transition hover:bg-brand-100"
          >
            Ver regulamento
          </Link>
        </div>
      </div>
    </section>
  );
}
