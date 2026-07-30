import type { ComponentType, SVGProps } from "react";
import { DocumentIcon, GiftIcon, LockIcon, UsersIcon } from "./icons";

const ITEMS: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}[] = [
  { icon: GiftIcon, label: "Cadastro gratuito" },
  { icon: LockIcon, label: "Dados protegidos" },
  { icon: DocumentIcon, label: "Regras claras no regulamento" },
  { icon: UsersIcon, label: "Apoio da secretaria da sua unidade" },
];

export default function TrustBar() {
  return (
    <section className="border-t border-slate-200/70 bg-white py-10">
      <ul className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-ink-soft">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
