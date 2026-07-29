import { useState } from "react";
import Field from "./Field";
import { deleteReferral, updateReferral } from "../lib/firestore";
import {
  AMBASSADOR_TYPE_LABEL,
  CONTACT_RESULT_LABEL,
  REFERRAL_STATUS_LABEL,
  VISIT_RESULT_LABEL,
  type AmbassadorType,
  type ContactResult,
  type Referral,
  type ReferralStatus,
  type School,
  type VisitResult,
} from "../lib/types";

interface ReferralEditModalProps {
  referral: Referral;
  schools: School[];
  onClose: () => void;
  onSaved: (updated: Referral) => void;
  onDeleted: (id: string) => void;
}

export default function ReferralEditModal({
  referral,
  schools,
  onClose,
  onSaved,
  onDeleted,
}: ReferralEditModalProps) {
  const [form, setForm] = useState<Referral>({ ...referral });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof Referral>(key: K, value: Referral[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const school = schools.find((s) => s.id === form.schoolId);
      const data = { ...form, schoolName: school?.name ?? form.schoolName };
      await updateReferral(referral.id, data);
      onSaved({ ...data, id: referral.id });
      onClose();
    } catch {
      setError("Não foi possível salvar as alterações.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Excluir esta indicação permanentemente?")) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteReferral(referral.id);
      onDeleted(referral.id);
      onClose();
    } catch {
      setError("Não foi possível excluir a indicação.");
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Editar indicação</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-8">
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">
              Aluno indicado
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Field label="Nome do aluno">
                <input
                  value={form.studentName}
                  onChange={(e) => update("studentName", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Nome do responsável">
                <input
                  value={form.studentResponsibleName}
                  onChange={(e) => update("studentResponsibleName", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Telefone/WhatsApp">
                <input
                  value={form.studentPhone}
                  onChange={(e) => update("studentPhone", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="E-mail">
                <input
                  value={form.studentEmail}
                  onChange={(e) => update("studentEmail", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Unidade escolar">
                <select
                  value={form.schoolId}
                  onChange={(e) => update("schoolId", e.target.value)}
                  className="input"
                >
                  {schools.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">
              Parceiro/Embaixador
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Field label="Nome completo">
                <input
                  value={form.ambassadorName}
                  onChange={(e) => update("ambassadorName", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Tipo">
                <select
                  value={form.ambassadorType}
                  onChange={(e) => update("ambassadorType", e.target.value as AmbassadorType)}
                  className="input"
                >
                  {Object.entries(AMBASSADOR_TYPE_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Telefone/WhatsApp">
                <input
                  value={form.ambassadorPhone}
                  onChange={(e) => update("ambassadorPhone", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="E-mail">
                <input
                  value={form.ambassadorEmail}
                  onChange={(e) => update("ambassadorEmail", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="CPF">
                <input
                  value={form.ambassadorCpf}
                  onChange={(e) => update("ambassadorCpf", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Data de Nascimento">
                <input
                  type="date"
                  value={form.ambassadorBirthDate}
                  onChange={(e) => update("ambassadorBirthDate", e.target.value)}
                  className="input"
                />
              </Field>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">
              Status geral
            </h3>
            <div className="mt-3">
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => update("status", e.target.value as ReferralStatus)}
                  className="input"
                >
                  {Object.entries(REFERRAL_STATUS_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">
              Tentativa de contato
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Field label="Data do contato">
                <input
                  type="date"
                  value={form.contactAttemptDate}
                  onChange={(e) => update("contactAttemptDate", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Resultado">
                <select
                  value={form.contactResult}
                  onChange={(e) => update("contactResult", e.target.value as ContactResult)}
                  className="input"
                >
                  {Object.entries(CONTACT_RESULT_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Observação">
                <textarea
                  value={form.contactAttemptNote}
                  onChange={(e) => update("contactAttemptNote", e.target.value)}
                  className="input"
                  rows={2}
                />
              </Field>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">
              Visita ou tentativa de visita
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Field label="Data da visita">
                <input
                  type="date"
                  value={form.visitDate}
                  onChange={(e) => update("visitDate", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Resultado">
                <select
                  value={form.visitResult}
                  onChange={(e) => update("visitResult", e.target.value as VisitResult)}
                  className="input"
                >
                  {Object.entries(VISIT_RESULT_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <button
              onClick={handleDelete}
              disabled={deleting || saving}
              className="text-sm font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
            >
              {deleting ? "Excluindo..." : "Excluir indicação"}
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || deleting}
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
