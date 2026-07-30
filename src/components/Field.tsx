import type { ComponentType, ReactNode, SVGProps } from "react";

interface FieldProps {
  label: string;
  children: ReactNode;
  /** Ícone exibido dentro do campo, à esquerda. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  hint?: string;
  optional?: boolean;
}

export default function Field({
  label,
  children,
  icon: Icon,
  hint,
  optional = false,
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2">
        <span className="text-sm font-semibold text-ink-soft">{label}</span>
        {optional && (
          <span className="text-xs font-medium text-ink-muted">(opcional)</span>
        )}
      </span>

      <span className={`relative block ${Icon ? "has-icon" : ""}`}>
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        )}
        {children}
      </span>

      {hint && (
        <span className="mt-1.5 block text-xs leading-relaxed text-ink-muted">
          {hint}
        </span>
      )}
    </label>
  );
}
