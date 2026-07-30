import { createFirestoreDoc, type FirebaseAdminEnv } from "../lib/firebaseAdmin";
import { EMAIL_RE, isValidCpf } from "../lib/validation";

interface SubmitReferralBody {
  ambassadorType: "pais" | "colaborador";
  ambassadorName: string;
  ambassadorEmail: string;
  ambassadorPhone: string;
  ambassadorCpf: string;
  ambassadorBirthDate: string;
  studentResponsibleName: string;
  studentName: string;
  studentEmail?: string;
  studentPhone: string;
  schoolId: string;
  schoolName: string;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const onRequestPost: PagesFunction<FirebaseAdminEnv> = async (context) => {
  let body: Partial<SubmitReferralBody>;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Corpo da requisição inválido." }, 400);
  }

  const {
    ambassadorType,
    ambassadorName,
    ambassadorEmail,
    ambassadorPhone,
    ambassadorCpf,
    ambassadorBirthDate,
    studentResponsibleName,
    studentName,
    studentEmail,
    studentPhone,
    schoolId,
    schoolName,
  } = body;

  if (
    (ambassadorType !== "pais" && ambassadorType !== "colaborador") ||
    !ambassadorName?.trim() ||
    !ambassadorPhone?.trim() ||
    !ambassadorCpf ||
    !ambassadorBirthDate ||
    !studentResponsibleName?.trim() ||
    !studentName?.trim() ||
    !studentPhone?.trim() ||
    !schoolId ||
    !schoolName
  ) {
    return json({ error: "Preencha todos os campos obrigatórios." }, 400);
  }
  if (!EMAIL_RE.test(ambassadorEmail ?? "")) {
    return json({ error: "E-mail do Parceiro inválido." }, 400);
  }
  if (studentEmail && !EMAIL_RE.test(studentEmail)) {
    return json({ error: "E-mail do aluno inválido." }, 400);
  }
  if (!isValidCpf(ambassadorCpf)) {
    return json({ error: "CPF inválido." }, 400);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ambassadorBirthDate) || Number.isNaN(Date.parse(ambassadorBirthDate))) {
    return json({ error: "Data de nascimento inválida." }, 400);
  }

  try {
    const now = Date.now();
    const id = await createFirestoreDoc(context.env, "referrals", {
      ambassadorType,
      ambassadorName: ambassadorName.trim(),
      ambassadorEmail: ambassadorEmail!.trim(),
      ambassadorPhone: ambassadorPhone.trim(),
      ambassadorCpf: ambassadorCpf.replace(/\D/g, ""),
      ambassadorBirthDate,
      studentResponsibleName: studentResponsibleName.trim(),
      studentName: studentName.trim(),
      studentEmail: (studentEmail ?? "").trim(),
      studentPhone: studentPhone.trim(),
      schoolId,
      schoolName,
      status: "pendente",
      visitDate: "",
      visitResult: "nao_registrada",
      contactAttemptDate: "",
      contactAttemptNote: "",
      contactResult: "nao_registrado",
      createdAt: now,
      updatedAt: now,
    });

    return json({ id });
  } catch (err) {
    return json(
      {
        error: `Erro ao gravar no Firestore: ${err instanceof Error ? err.message : String(err)}`,
        debugEnvKeys: Object.keys(context.env),
        debugPrivateKeyType: typeof context.env.FIREBASE_PRIVATE_KEY,
        debugPrivateKeyLength:
          typeof context.env.FIREBASE_PRIVATE_KEY === "string"
            ? context.env.FIREBASE_PRIVATE_KEY.length
            : null,
      },
      500
    );
  }
};
