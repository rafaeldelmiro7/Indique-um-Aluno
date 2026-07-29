const STEPS = [
  {
    number: "01",
    title: "Indique",
    body: "Preencha um único formulário com seus dados e os dados do aluno que você está indicando.",
  },
  {
    number: "02",
    title: "Acompanhamento",
    body: "A escola entra em contato com a família indicada para dar sequência à matrícula.",
  },
  {
    number: "03",
    title: "Matriculado",
    body: "Quando a matrícula é efetivada, você recebe a recompensa.",
  },
];

export default function StepsSection() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
        Como funciona
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <span className="text-3xl font-extrabold text-brand-200">
              {step.number}
            </span>
            <h3 className="mt-3 font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
