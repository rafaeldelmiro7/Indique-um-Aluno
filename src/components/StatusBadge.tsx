import { REFERRAL_STATUS_LABEL, type ReferralStatus } from "../lib/types";

const STYLES: Record<ReferralStatus, string> = {
  pendente: "bg-amber-100 text-amber-800",
  agendada_visita: "bg-blue-100 text-blue-800",
  matriculado: "bg-emerald-100 text-emerald-800",
  nao_elegivel: "bg-slate-200 text-slate-700",
};

export default function StatusBadge({ status }: { status: ReferralStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${STYLES[status]}`}
    >
      {REFERRAL_STATUS_LABEL[status]}
    </span>
  );
}
