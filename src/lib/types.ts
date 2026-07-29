export type AmbassadorType = "pais" | "colaborador";

export const AMBASSADOR_TYPE_LABEL: Record<AmbassadorType, string> = {
  pais: "Parceiro",
  colaborador: "Colaborador",
};

export type ReferralStatus =
  | "pendente"
  | "agendada_visita"
  | "matriculado"
  | "nao_tem_interesse"
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
  studentResponsibleName: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  schoolId: string;
  schoolName: string;
  status: ReferralStatus;
  visitDate: string;
  createdAt: number;
  updatedAt: number;
}

export const REFERRAL_STATUS_LABEL: Record<ReferralStatus, string> = {
  pendente: "Pendente",
  agendada_visita: "Agendada Visita",
  matriculado: "Matriculado",
  nao_tem_interesse: "Não tem Interesse",
  nao_elegivel: "Não elegível",
};

