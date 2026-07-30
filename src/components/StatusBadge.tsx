import { REFERRAL_STATUS_LABEL, type ReferralStatus } from "../lib/types";

const STYLES: Record<ReferralStatus, string> = {
  pendente: "bg-amber-50 text-amber-700 ring-amber-200",
  agendada_visita: "bg-blue-50 text-blue-700 ring-blue-200",
  matriculado: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  nao_tem_interesse: "bg-orange-50 text-orange-700 ring-orange-200",
  nao_elegivel: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default function StatusBadge({ status }: { status: ReferralStatus }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${STYLES[status]}`}
    >
      {REFERRAL_STATUS_LABEL[status]}
    </span>
  );
}
