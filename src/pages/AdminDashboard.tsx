import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReferralEditModal from "../components/ReferralEditModal";
import StatusBadge from "../components/StatusBadge";
import { logout } from "../lib/auth";
import { listAllReferrals, listSchools } from "../lib/firestore";
import {
  AMBASSADOR_TYPE_LABEL,
  CONTACT_RESULT_LABEL,
  REFERRAL_STATUS_LABEL,
  VISIT_RESULT_LABEL,
  type AmbassadorType,
  type Referral,
  type ReferralStatus,
  type School,
} from "../lib/types";

const ALL = "todos";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  const [schoolFilter, setSchoolFilter] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState<typeof ALL | ReferralStatus>(ALL);
  const [ambassadorFilter, setAmbassadorFilter] = useState(ALL);
  const [typeFilter, setTypeFilter] = useState<typeof ALL | AmbassadorType>(ALL);
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null);

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
          (ambassadorFilter === ALL || r.ambassadorName === ambassadorFilter) &&
          (typeFilter === ALL || r.ambassadorType === typeFilter)
      ),
    [referrals, schoolFilter, statusFilter, ambassadorFilter, typeFilter]
  );

  function handleSaved(updated: Referral) {
    setReferrals((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  }

  function handleDeleted(id: string) {
    setReferrals((prev) => prev.filter((r) => r.id !== id));
  }

  function handleExportCsv() {
    const header = [
      "Aluno",
      "Responsável do aluno",
      "Telefone do aluno",
      "E-mail do aluno",
      "Escola",
      "Parceiro",
      "Tipo",
      "Telefone do Parceiro",
      "E-mail do Parceiro",
      "CPF do Parceiro",
      "Data de Nascimento do Parceiro",
      "Status",
      "Data do Contato",
      "Resultado do Contato",
      "Observação do Contato",
      "Data da Visita",
      "Resultado da Visita",
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
      r.contactAttemptDate,
      CONTACT_RESULT_LABEL[r.contactResult],
      r.contactAttemptNote,
      r.visitDate,
      VISIT_RESULT_LABEL[r.visitResult],
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
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-500 hover:text-slate-800"
          >
            Voltar Página Inicial
          </Link>
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
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as typeof ALL | AmbassadorType)}
          className="input"
        >
          <option value={ALL}>Parceiro e Colaborador</option>
          <option value="pais">Parceiro</option>
          <option value="colaborador">Colaborador</option>
        </select>

        <select
          value={ambassadorFilter}
          onChange={(e) => setAmbassadorFilter(e.target.value)}
          className="input"
        >
          <option value={ALL}>Todos os parceiros</option>
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
        <table className="w-full min-w-[1080px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Aluno indicado</th>
              <th className="px-4 py-3 font-medium">Escola</th>
              <th className="px-4 py-3 font-medium">Parceiro</th>
              <th className="px-4 py-3 font-medium">Contato Parceiro</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Contato / Visita</th>
              <th className="px-4 py-3 font-medium"></th>
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
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  <div>Contato: {CONTACT_RESULT_LABEL[r.contactResult]}</div>
                  <div>Visita: {VISIT_RESULT_LABEL[r.visitResult]}</div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setEditingReferral(r)}
                    className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Abrir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingReferral && (
        <ReferralEditModal
          referral={editingReferral}
          schools={schools}
          onClose={() => setEditingReferral(null)}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}
