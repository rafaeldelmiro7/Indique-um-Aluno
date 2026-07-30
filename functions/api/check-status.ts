import { queryByField, type FirebaseAdminEnv } from "../lib/firebaseAdmin";
import { isValidCpf } from "../lib/validation";

interface CheckStatusBody {
  cpf: string;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const onRequestPost: PagesFunction<FirebaseAdminEnv> = async (context) => {
  let body: Partial<CheckStatusBody>;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Corpo da requisição inválido." }, 400);
  }

  const cpf = body.cpf ?? "";
  if (!isValidCpf(cpf)) {
    return json({ error: "CPF inválido." }, 400);
  }

  try {
    const docs = await queryByField(context.env, "referrals", "ambassadorCpf", cpf.replace(/\D/g, ""));

    const referrals = docs
      .map((d) => ({
        studentName: d.studentName,
        schoolName: d.schoolName,
        status: d.status,
        createdAt: Number(d.createdAt),
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    return json({ referrals });
  } catch (err) {
    return json(
      { error: `Erro ao consultar o Firestore: ${err instanceof Error ? err.message : String(err)}` },
      500
    );
  }
};
