import DoodleBackground from "../components/DoodleBackground";

export default function Regulamento() {
  return (
    <DoodleBackground>
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">
        Conheça o regulamento da campanha
      </h1>
      <h2 className="mt-1 text-lg font-semibold text-brand-700">
        Programa de Incentivo "Indique e Ganhe"
      </h2>

      <p className="mt-6 text-slate-700">
        Ao indicar novos alunos à Rede de Colégios Adventistas ASUR, todo
        mundo ganha, por indicação que se converter em matrícula (vide regras
        do programa). O programa terá vigência a partir do dia 01/08/2026, e
        será válida por meio das matrículas confirmadas até o dia 30/08/2026.
      </p>

      <h3 className="mt-8 text-base font-bold text-slate-900">
        Regras do programa
      </h3>

      <section className="mt-6">
        <h4 className="font-semibold text-slate-900">
          1. Critérios de Elegibilidade para Indicação de Novos Alunos
        </h4>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700 marker:text-slate-400">
          <li>
            Cadastrar a indicação no site:{" "}
            <a
              href="https://indicaeadv.com.br/ama-pais/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 underline"
            >
              https://indicaeadv.com.br/ama-pais/
            </a>
            , (
            <a
              href="https://indicaeadv.com.br/ama-funcionarios/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 underline"
            >
              https://indicaeadv.com.br/ama-funcionários/
            </a>
            ), ou parceiros (
            <a
              href="https://indicaeadv.com.br/ama-parceiros/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 underline"
            >
              https://indicaeadv.com.br/ama-parceiros/
            </a>
            ).
          </li>
          <li>Serão válidas apenas as indicações informadas no ato da matrícula pelo responsável indicado.</li>
          <li>O aluno novo indicado e efetivado não pode ser irmão de aluno veterano.</li>
          <li>O aluno novo indicado e efetivado não pode receber desconto superior a 15%.</li>
          <li>O aluno novo indicado e efetivado não pode ser filho de funcionário na Rede Adventista ou Associação.</li>
          <li>O aluno novo indicado e efetivado não pode ser bolsista, seja com bolsa de 50% ou 100%.</li>
          <li>O aluno novo indicado e efetivado não pode ser ex-aluno retornando à Rede Adventista no prazo de 2 anos.</li>
          <li>O aluno novo indicado e efetivado não pode estar vindo de transferência da Rede Adventista.</li>
          <li>
            Os responsáveis legais/financeiros pelos alunos novos indicados e
            efetivados, bem como dos alunos veteranos, não podem estar
            inadimplentes no período de 01/08 a 30/08/2026.
          </li>
          <li>
            Os responsáveis legais/financeiros pelos alunos novos indicados e
            efetivados, bem como dos alunos veteranos, não podem ter dívidas
            de cheque e/ou parcelas de anos anteriores junto à Rede
            Adventista.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h4 className="font-semibold text-slate-900">
          2. Critérios de Participação para Professores e Funcionários
        </h4>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700 marker:text-slate-400">
          <li>
            Funcionários da administração (diretor, secretária, tesoureiro,
            coordenador, orientador, pastor escolar, secretárias pedagógicas)
            não participam do "Programa de Incentivo Indique e Ganhe".
          </li>
          <li>
            Os demais funcionários, bem como professores, monitores,
            zeladores e outros, poderão participar do "Programa de Incentivo
            Indique e Ganhe".
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h4 className="font-semibold text-slate-900">
          3. Regras de Pagamento para Responsáveis
        </h4>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700 marker:text-slate-400">
          <li>
            Prêmios para o indicador: valor de R$ 500,00 (Quinhentos Reais),
            que será disponibilizado no cartão Swile e poderá ser resgatado
            até 05/09/2026.
          </li>
          <li>
            Prêmios para o aluno novo indicado efetivado: kit de uniforme
            (1 calça + 1 camiseta).
          </li>
          <li>
            Importante: os responsáveis (pelo aluno novo indicado e do aluno
            veterano que indicou) devem estar adimplentes até a parcela de
            30/08/26.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h4 className="font-semibold text-slate-900">
          4. Regras de Pagamento para Professores e Funcionários
        </h4>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700 marker:text-slate-400">
          <li>
            Para cada aluno novo indicado e efetivado, o funcionário
            acumulará o valor de R$ 400,00 (Quatrocentos Reais), o resgate do
            valor será feito via cartão Swile no mês de 05/09/2026.
          </li>
          <li>
            Prêmios para o aluno novo indicado efetivado: kit de uniforme
            (1 calça + 1 camiseta).
          </li>
          <li>
            Importante: os responsáveis (pelo aluno novo indicado e do aluno
            veterano que indicou) devem estar adimplentes até a parcela de
            30/08/26.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h4 className="font-semibold text-slate-900">
          5. Regras de Pagamento para Parceiros (Empresas ou Pessoas sem
          Vínculo com a Instituição)
        </h4>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700 marker:text-slate-400">
          <li>
            Para cada aluno novo indicado e efetivado, os parceiros, sendo
            escolinha conveniada, igrejas evangélicas conveniadas, aplicativo
            de transporte, comércio, colportagem de matrícula e outros que
            estejam nessa categoria de parceiros, receberão o valor de R$
            500,00 (Quinhentos Reais), que poderá ser resgatado no dia
            05/08/2026.
          </li>
          <li>
            Prêmios para o aluno novo indicado efetivado: kit de uniforme
            (1 calça + 1 camiseta).
          </li>
          <li>
            Importante: o responsável pelo aluno novo indicado e efetivado
            deve estar adimplente até a parcela de 30/08/2026.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h4 className="font-semibold text-slate-900">6. Disposições Gerais</h4>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700 marker:text-slate-400">
          <li>
            O objetivo deste programa é incentivar a indicação de novos
            alunos para a Rede de Colégios Adventistas ASUR, garantindo a
            qualidade e o compromisso com os princípios da Rede Adventista.
          </li>
          <li>
            Qualquer dúvida ou necessidade de esclarecimento adicional deve
            ser direcionada à administração da unidade escolar.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h4 className="font-semibold text-slate-900">7. Validade</h4>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700 marker:text-slate-400">
          <li>
            Este comunicado e suas regras entram em vigor a partir da data de
            sua publicação e permanece válido até segunda ordem.
          </li>
        </ol>
      </section>
    </div>
    </DoodleBackground>
  );
}
