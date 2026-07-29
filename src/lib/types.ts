export type AmbassadorType = "pais" | "colaborador";

export const AMBASSADOR_TYPE_LABEL: Record<AmbassadorType, string> = {
  pais: "Parceiro",
  colaborador: "Colaborador",
};

export type ReferralStatus =
  | "pendente"
  | "agendada_visita"
  | "matriculado"
  | "nao_elegivel";

export interface School {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

export interface Referral {
  id: string;
  ambassadorType: AmbassadorType;
  ambassadorName: string;
  ambassadorEmail: string;
  ambassadorPhone: string;
  ambassadorCpf: string;
  ambassadorBirthDate: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  schoolId: string;
  schoolName: string;
  grade: string;
  status: ReferralStatus;
  createdAt: number;
  updatedAt: number;
}

export const REFERRAL_STATUS_LABEL: Record<ReferralStatus, string> = {
  pendente: "Pendente",
  agendada_visita: "Agendada Visita",
  matriculado: "Matriculado",
  nao_elegivel: "Não elegível",
};

export const GRADE_OPTIONS = [
  "Maternal",
  "Pré I",
  "Pré II",
  "1º Ano EFUND",
  "2º Ano EFUND",
  "3º Ano EFUND",
  "4º Ano EFUND",
  "5º Ano EFUND",
  "6º Ano EFUND",
  "7º Ano EFUND",
  "8º Ano EFUND",
  "9º Ano EFUND",
  "1º Ano EM",
  "2º Ano EM",
  "3º Ano EM",
];
