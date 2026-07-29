import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { logout } from "../lib/auth";
import { listAllReferrals, listSchools, updateReferralStatus } from "../lib/firestore";
import { AMBASSADOR_TYPE_LABEL, REFERRAL_STATUS_LABEL, type Referral, type ReferralStatus, type School } from "../lib/types";

const ALL = "todos";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  const [schoolFilter, setSchoolFilter] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState<typeof ALL | ReferralStatus>(ALL);
  const [ambassadorFilter, setAmbassadorFilter] = useState(ALL);

  useEffect(() => {
    Promise.all([listAllReferrals(), listSchools()]).then(([refs, sch]) => {
      setReferrals(refs);
      setSchools(sch);
      setLoading(false);
    });
  }, []);

  const ambassadors = useMemo(
    () => Array.from(new Set(referrals.map((r) => r.ambassadorName))).sort(),
    [referrals]
  );

  const filtered = useMemo(
    () =>
      referrals.filter(
        (r) =>
          (schoolFilter === ALL || r.schoolId === schoolFilter) &&
          (statusFilter === ALL || r.status === statusFilter) &&
          (ambassadorFilter === ALL || r.ambassadorName === ambassadorFilter)
      ),
    [referrals, schoolFilter, statusFilter, ambassadorFilter]
  );

  async function handleStatusChange(id: string, status: ReferralStatus) {
    await updateReferralStatus(id, status);
    setReferrals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  }

  function handleExportCsv() {
    const header = [
      "Aluno",
      "Responsável do aluno",
      "Telefone do aluno",
      "E-mail do aluno",
      "Escola",
      "Embaixador",
      "Tipo",
      "Telefone do embaixador",
      "E-mail do embaixador",
      "CPF do embaixador",
      "Data de Nascimento do embaixador",
      "Status",
      "Data",
    ];
    const rows = filtered.map((r) => [
      r.studentName,
      r.studentResponsibleName,
      r.studentPhone,
      r.studentEmail,
      r.schoolName,
      r.ambassadorName,
      AMBASSADOR_TYPE_LABEL[r.ambassadorType],
      r.ambassadorPhone,
      r.ambassadorEmail,
      r.ambassadorCpf,
      r.ambassadorBirthDate,
      REFERRAL_STATUS_LABEL[r.status],
      new Date(r.createdAt).toLocaleDateString("pt-BR"),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `indicacoes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Carregando...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Indicações da rede
        </h1>
        <button
          onClick={async () => {
            await logout();
            navigate("/");
          }}
          className="text-sm font-semibold text-slate-500 hover:text-slate-800"
        >
          Sair
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <select
          value={schoolFilter}
          onChange={(e) => setSchoolFilter(e.target.value)}
          className="input"
        >
          <option value={ALL}>Todas as escolas</option>
          {schools.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof ALL | ReferralStatus)}
          className="input"
        >
          <option value={ALL}>Todos os status</option>
          {Object.entries(REFERRAL_STATUS_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={ambassadorFilter}
          onChange={(e) => setAmbassadorFilter(e.target.value)}
          className="input"
        >
          <option value={ALL}>Todos os embaixadores</option>
          {ambassadors.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button
          onClick={handleExportCsv}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Exportar CSV
        </button>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {filtered.length} indicação(ões)
      </p>

      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Aluno indicado</th>
              <th className="px-4 py-3 font-medium">Escola</th>
              <th className="px-4 py-3 font-medium">Embaixador</th>
              <th className="px-4 py-3 font-medium">Contato do embaixador</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <div>{r.studentName}</div>
                  <div className="text-xs text-slate-400">
                    Responsável: {r.studentResponsibleName}
                  </div>
                  <div className="text-xs text-slate-400">{r.studentPhone}</div>
                  {r.studentEmail && (
                    <div className="text-xs text-slate-400">{r.studentEmail}</div>
                  )}
                </td>
                <td className="px-4 py-3">{r.schoolName}</td>
                <td className="px-4 py-3">
                  <div>{r.ambassadorName}</div>
                  <div className="text-xs text-slate-400">
                    {AMBASSADOR_TYPE_LABEL[r.ambassadorType]}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>{r.ambassadorPhone}</div>
                  <div className="text-xs text-slate-400">{r.ambassadorEmail}</div>
                  <div className="text-xs text-slate-400">CPF: {r.ambassadorCpf}</div>
                  <div className="text-xs text-slate-400">
                    Nascimento: {r.ambassadorBirthDate}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={r.status}
                    onChange={(e) =>
                      handleStatusChange(r.id, e.target.value as ReferralStatus)
                    }
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
                  >
                    {Object.entries(REFERRAL_STATUS_LABEL).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <div className="mt-1">
                    <StatusBadge status={r.status} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
