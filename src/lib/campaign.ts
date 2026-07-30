import type { AmbassadorType } from "./types";

/**
 * Dados da campanha usados nos textos da landing page.
 * Fonte: regulamento do Programa de Incentivo "Indique e Ganhe" (ver /regulamento).
 * Os valores de premiação diferem entre parceiros e colaboradores.
 */
export const CAMPAIGN = {
  enrollmentDeadline: "30/08/2026",
  rewardRedemptionDate: "05/09/2026",
  uniformKit: "kit de uniforme (1 calça + 1 camiseta)",
  schoolCount: 5,
} as const;

export const AUDIENCE_COPY: Record<
  AmbassadorType,
  {
    badge: string;
    title: string;
    subtitleBefore: string;
    subtitleAfter: string;
    rewardLabel: string;
    rewardAmount: string;
    highlights: string[];
  }
> = {
  pais: {
    badge: "Programa de incentivo · Rede Adventista de Educação",
    title: "Indique novos alunos e receba seu prêmio",
    subtitleBefore:
      "Você indica uma família para uma das nossas unidades e, depois que a matrícula é efetivada, recebe ",
    subtitleAfter: ". O aluno indicado também ganha um kit de uniforme.",
    rewardLabel: "Você recebe por aluno matriculado",
    rewardAmount: "R$ 500,00",
    highlights: [
      "R$ 500,00 por aluno matriculado",
      "Kit de uniforme para o aluno indicado",
      "Cadastro gratuito, em um único formulário",
      "Acompanhe suas indicações pelo CPF",
    ],
  },
  colaborador: {
    badge: "Programa de incentivo · Exclusivo para colaboradores",
    title: "Indique novos alunos e receba seu prêmio",
    subtitleBefore:
      "Você conhece o nosso trabalho de dentro. Indique famílias para a rede e, depois que a matrícula é efetivada, receba ",
    subtitleAfter: ". O aluno indicado também ganha um kit de uniforme.",
    rewardLabel: "Você recebe por aluno matriculado",
    rewardAmount: "R$ 400,00",
    highlights: [
      "R$ 400,00 por aluno matriculado",
      "Kit de uniforme para o aluno indicado",
      "Cadastro gratuito, em um único formulário",
      "Acompanhe suas indicações pelo CPF",
    ],
  },
};
