import type { ComponentType, SVGProps } from "react";
import { GiftIcon, SchoolIcon, SearchIcon, ShirtIcon } from "./icons";
import { CAMPAIGN } from "../lib/campaign";

interface Benefit {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: GiftIcon,
    title: "Prêmio em dinheiro",
    body: `Com a matrícula efetivada, o valor é disponibilizado no cartão Swile para resgate a partir de ${CAMPAIGN.rewardRedemptionDate}.`,
  },
  {
    icon: ShirtIcon,
    title: "Kit de uniforme",
    body: "O aluno indicado também é premiado: ganha uma calça e uma camiseta do uniforme escolar.",
  },
  {
    icon: SearchIcon,
    title: "Acompanhamento simples",
    body: "Consulte o andamento de todas as suas indicações quando quiser, informando apenas o seu CPF.",
  },
  {
    icon: SchoolIcon,
    title: "Cinco unidades",
    body: "Indique para qualquer uma das cinco escolas da Rede Adventista de Educação em Rondônia.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Por que vale a pena indicar
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Todo mundo ganha: você recebe o prêmio, a família indicada conhece a
          nossa proposta pedagógica e o aluno começa bem equipado.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, body }) => (
          <article
            key={title}
            className="card group p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              {body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
