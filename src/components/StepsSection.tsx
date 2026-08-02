const STEPS = [
  {
    number: "1",
    title: "Faça sua indicação",
    body: "Preencha um único formulário com os seus dados e os dados do aluno indicado.",
  },
  {
    number: "2",
    title: "A escola entra em contato",
    body: "Nossa equipe fala com a família indicada e agenda uma visita à unidade escolhida.",
  },
  {
    number: "3",
    title: "Matrícula efetivada",
    body: "A família conhece a escola de perto e conclui a matrícula do novo aluno.",
  },
  {
    number: "4",
    title: "Você recebe seu prêmio",
    body: "Com a matrícula confirmada, o seu prêmio é liberado conforme as regras do regulamento.",
  },
];

export default function StepsSection() {
  return (
    <section
      id="como-funciona"
      className="border-y border-slate-200/70 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Como funciona
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            São quatro etapas simples, do cadastro até o recebimento do prêmio.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Linha conectora nos ecrãs grandes */}
          <span
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-brand-100 via-brand-200 to-brand-100 lg:block"
            aria-hidden="true"
          />

          {STEPS.map((step) => (
            <li key={step.number} className="relative">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-lg font-bold text-white ring-4 ring-white">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
