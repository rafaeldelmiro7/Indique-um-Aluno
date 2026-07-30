import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import PageBackground from "../components/PageBackground";
import { ArrowRightIcon, DocumentIcon } from "../components/icons";

/** Uma seção numerada do regulamento. */
function Rule({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: ReactNode[];
}) {
  return (
    <section className="border-t border-slate-200/80 pt-8">
      <h2 className="flex items-start gap-3 text-lg font-bold text-ink">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-sm font-bold text-brand-700">
          {number}
        </span>
        {title}
      </h2>
      <ol className="mt-4 space-y-3 pl-10">
        {items.map((item, i) => (
          <li key={i} className="relative text-[15px] leading-relaxed text-ink-soft">
            <span className="absolute -left-10 font-semibold tabular-nums text-ink-muted">
              {number}.{i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </section>
  );
}

const LINK_CLASS =
  "font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 transition hover:decoration-brand-600";

export default function Regulamento() {
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

      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
            <DocumentIcon className="h-4 w-4" />
            Regulamento da campanha
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Programa de Incentivo “Indique e Ganhe”
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Ao indicar novos alunos à Rede Adventista de Educação, todo
            mundo ganha, por indicação que se converter em matrícula (vide regras
            do programa). O programa terá vigência a partir do dia 01/08/2026, e
            será válida por meio das matrículas confirmadas até o dia 30/08/2026.
          </p>
        </div>

        <div className="card mt-10 space-y-8 p-6 sm:p-9">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-muted">
            Regras do programa
          </h2>

          <Rule
            number="1"
            title="Critérios de elegibilidade para indicação de novos alunos"
            items={[
              <>
                Cadastrar a indicação no site:{" "}
                <a
                  href="https://indicaeadv.com.br/ama-pais/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  https://indicaeadv.com.br/ama-pais/
                </a>
                , (
                <a
                  href="https://indicaeadv.com.br/ama-funcionarios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  https://indicaeadv.com.br/ama-funcionários/
                </a>
                ), ou parceiros (
                <a
                  href="https://indicaeadv.com.br/ama-parceiros/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  https://indicaeadv.com.br/ama-parceiros/
                </a>
                ).
              </>,
              "Serão válidas apenas as indicações informadas no ato da matrícula pelo responsável indicado.",
              "O aluno novo indicado e efetivado não pode ser irmão de aluno veterano.",
              "O aluno novo indicado e efetivado não pode receber desconto superior a 15%.",
              "O aluno novo indicado e efetivado não pode ser filho de funcionário na Rede Adventista ou Associação.",
              "O aluno novo indicado e efetivado não pode ser bolsista, seja com bolsa de 50% ou 100%.",
              "O aluno novo indicado e efetivado não pode ser ex-aluno retornando à Rede Adventista no prazo de 2 anos.",
              "O aluno novo indicado e efetivado não pode estar vindo de transferência da Rede Adventista.",
              "Os responsáveis legais/financeiros pelos alunos novos indicados e efetivados, bem como dos alunos veteranos, não podem estar inadimplentes no período de 01/08 a 30/08/2026.",
              "Os responsáveis legais/financeiros pelos alunos novos indicados e efetivados, bem como dos alunos veteranos, não podem ter dívidas de cheque e/ou parcelas de anos anteriores junto à Rede Adventista.",
            ]}
          />

          <Rule
            number="2"
            title="Critérios de participação para professores e funcionários"
            items={[
              "Funcionários da administração (diretor, secretária, tesoureiro, coordenador, orientador, pastor escolar, secretárias pedagógicas) não participam do “Programa de Incentivo Indique e Ganhe”.",
              "Os demais funcionários, bem como professores, monitores, zeladores e outros, poderão participar do “Programa de Incentivo Indique e Ganhe”.",
            ]}
          />

          <Rule
            number="3"
            title="Regras de pagamento para responsáveis"
            items={[
              "Prêmios para o indicador: valor de R$ 500,00 (Quinhentos Reais), que será disponibilizado no cartão Swile e poderá ser resgatado até 05/09/2026.",
              "Prêmios para o aluno novo indicado efetivado: kit de uniforme (1 calça + 1 camiseta).",
              "Importante: os responsáveis (pelo aluno novo indicado e do aluno veterano que indicou) devem estar adimplentes até a parcela de 30/08/26.",
            ]}
          />

          <Rule
            number="4"
            title="Regras de pagamento para professores e funcionários"
            items={[
              "Para cada aluno novo indicado e efetivado, o funcionário acumulará o valor de R$ 400,00 (Quatrocentos Reais), o resgate do valor será feito via cartão Swile no mês de 05/09/2026.",
              "Prêmios para o aluno novo indicado efetivado: kit de uniforme (1 calça + 1 camiseta).",
              "Importante: os responsáveis (pelo aluno novo indicado e do aluno veterano que indicou) devem estar adimplentes até a parcela de 30/08/26.",
            ]}
          />

          <Rule
            number="5"
            title="Regras de pagamento para parceiros (empresas ou pessoas sem vínculo com a instituição)"
            items={[
              "Para cada aluno novo indicado e efetivado, os parceiros, sendo escolinha conveniada, igrejas evangélicas conveniadas, aplicativo de transporte, comércio, colportagem de matrícula e outros que estejam nessa categoria de parceiros, receberão o valor de R$ 500,00 (Quinhentos Reais), que poderá ser resgatado no dia 05/08/2026.",
              "Prêmios para o aluno novo indicado efetivado: kit de uniforme (1 calça + 1 camiseta).",
              "Importante: o responsável pelo aluno novo indicado e efetivado deve estar adimplente até a parcela de 30/08/2026.",
            ]}
          />

          <Rule
            number="6"
            title="Disposições gerais"
            items={[
              "O objetivo deste programa é incentivar a indicação de novos alunos para a Rede Adventista de Educação, garantindo a qualidade e o compromisso com os princípios da Rede Adventista.",
              "Qualquer dúvida ou necessidade de esclarecimento adicional deve ser direcionada à administração da unidade escolar.",
            ]}
          />

          <Rule
            number="7"
            title="Validade"
            items={[
              "Este comunicado e suas regras entram em vigor a partir da data de sua publicação e permanece válido até segunda ordem.",
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-lg font-semibold text-ink">
            Pronto para indicar?
          </p>
          <Link to="/cadastro" className="btn-primary">
            Fazer minha indicação
            <ArrowRightIcon className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </main>
    </PageBackground>
  );
}
