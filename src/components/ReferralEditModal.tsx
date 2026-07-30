import { useState } from "react";
import Field from "./Field";
import { deleteReferral, updateReferral } from "../lib/firestore";
import {
  AMBASSADOR_TYPE_LABEL,
  CONTACT_RESULT_LABEL,
  REFERRAL_STATUS_LABEL,
  VISIT_RESULT_LABEL,
  type AmbassadorType,
  type ContactAttemptEntry,
  type ContactResult,
  type Referral,
  type ReferralStatus,
  type School,
  type VisitAttemptEntry,
  type VisitResult,
} from "../lib/types";

function formatDate(value: string): string {
  if (!value) return "—";
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}

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
  const [sectionSaving, setSectionSaving] = useState<"contact" | "visit" | null>(null);
  const [sectionSaved, setSectionSaved] = useState<"contact" | "visit" | null>(null);

  function update<K extends keyof Referral>(key: K, value: Referral[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function errorMessage(err: unknown, fallback: string): string {
    if (err instanceof Error) return `${fallback} (${err.message})`;
    return fallback;
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
    } catch (err) {
      setError(errorMessage(err, "Não foi possível salvar as alterações."));
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveSection(section: "contact" | "visit") {
    setSectionSaving(section);
    setSectionSaved(null);
    setError(null);
    try {
      let fields: Partial<Referral>;
      if (section === "contact") {
        const entry: ContactAttemptEntry = {
          date: form.contactAttemptDate,
          result: form.contactResult,
          note: form.contactAttemptNote,
          createdAt: Date.now(),
        };
        fields = {
          contactAttemptDate: form.contactAttemptDate,
          contactAttemptNote: form.contactAttemptNote,
          contactResult: form.contactResult,
          contactHistory: [...(form.contactHistory ?? []), entry],
        };
      } else {
        const entry: VisitAttemptEntry = {
          date: form.visitDate,
          result: form.visitResult,
          createdAt: Date.now(),
        };
        fields = {
          visitDate: form.visitDate,
          visitResult: form.visitResult,
          visitHistory: [...(form.visitHistory ?? []), entry],
        };
      }
      await updateReferral(referral.id, fields);
      setForm((prev) => ({ ...prev, ...fields }));
      onSaved({ ...referral, ...fields });
      setSectionSaved(section);
    } catch (err) {
      setError(errorMessage(err, "Não foi possível salvar essa seção."));
    } finally {
      setSectionSaving(null);
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
    } catch (err) {
      setError(errorMessage(err, "Não foi possível excluir a indicação."));
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
              Parceiro
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
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">
                Tentativa de contato
              </h3>
              <div className="flex items-center gap-2">
                {sectionSaved === "contact" && (
                  <span className="text-xs font-semibold text-emerald-600">Salvo!</span>
                )}
                <button
                  type="button"
                  onClick={() => handleSaveSection("contact")}
                  disabled={sectionSaving === "contact"}
                  className="rounded-full border border-brand-300 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-50 disabled:opacity-50"
                >
                  {sectionSaving === "contact" ? "Salvando..." : "Salvar contato"}
                </button>
              </div>
            </div>
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

            {form.contactHistory && form.contactHistory.length > 0 && (
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Histórico de contatos
                </p>
                <ul className="space-y-2">
                  {[...form.contactHistory].reverse().map((entry, i) => (
                    <li key={i} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-slate-700">
                          {formatDate(entry.date)}
                        </span>
                        <span className="text-xs font-semibold text-brand-700">
                          {CONTACT_RESULT_LABEL[entry.result]}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="mt-1 text-slate-600">{entry.note}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">
                Visita ou tentativa de visita
              </h3>
              <div className="flex items-center gap-2">
                {sectionSaved === "visit" && (
                  <span className="text-xs font-semibold text-emerald-600">Salvo!</span>
                )}
                <button
                  type="button"
                  onClick={() => handleSaveSection("visit")}
                  disabled={sectionSaving === "visit"}
                  className="rounded-full border border-brand-300 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-50 disabled:opacity-50"
                >
                  {sectionSaving === "visit" ? "Salvando..." : "Salvar visita"}
                </button>
              </div>
            </div>
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

            {form.visitHistory && form.visitHistory.length > 0 && (
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Histórico de visitas
                </p>
                <ul className="space-y-2">
                  {[...form.visitHistory].reverse().map((entry, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm"
                    >
                      <span className="font-medium text-slate-700">
                        {formatDate(entry.date)}
                      </span>
                      <span className="text-xs font-semibold text-brand-700">
                        {VISIT_RESULT_LABEL[entry.result]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
