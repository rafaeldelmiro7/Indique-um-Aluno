import type { SVGProps } from "react";

/**
 * Ícones minimalistas em SVG inline — evita dependência externa e mantém o
 * bundle enxuto. Todos herdam a cor do texto (`currentColor`).
 */
type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Base>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </Base>
  );
}

export function GiftIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z" />
      <path d="M3 7.5h18V11H3V7.5Z" />
      <path d="M12 7.5V21" />
      <path d="M12 7.5S10.5 3 8 3a2.25 2.25 0 0 0 0 4.5h4Zm0 0S13.5 3 16 3a2.25 2.25 0 0 1 0 4.5h-4Z" />
    </Base>
  );
}

export function ShirtIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 3.5 12 6l3-2.5 4.5 2.2a1 1 0 0 1 .55 1.02l-.5 3.3-2.55.4V20a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9.6l-2.55-.4-.5-3.3A1 1 0 0 1 4.5 5.7L9 3.5Z" />
    </Base>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </Base>
  );
}

export function SchoolIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
      <path d="M6.5 10v5.5c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3V10" />
      <path d="M21 8v5" />
    </Base>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l7 2.5v6c0 4.2-2.9 8-7 9.5-4.1-1.5-7-5.3-7-9.5v-6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </Base>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8.5" r="3.75" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </Base>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9.5" cy="8.5" r="3.25" />
      <path d="M3.5 20a6 6 0 0 1 12 0" />
      <path d="M16.5 6.2a3.25 3.25 0 0 1 0 6.1" />
      <path d="M18 20a6 6 0 0 0-1.6-4.1" />
    </Base>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.75 7 8.25 6 8.25-6" />
    </Base>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.75 5.5h2.5" />
      <path d="M12 18.25h.01" />
    </Base>
  );
}

export function IdIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.75" y="5" width="18.5" height="14" rx="2" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M5.5 16c.6-1.4 1.7-2.1 3-2.1s2.4.7 3 2.1" />
      <path d="M14.5 10.5h4M14.5 13.5h4" />
    </Base>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3.5v3M16 3.5v3" />
    </Base>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4.5 12h14" />
      <path d="m13 6.5 5.5 5.5L13 17.5" />
    </Base>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 3.5h7l5 5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M13 3.5v5h5" />
      <path d="M8.5 13h7M8.5 16.5h4.5" />
    </Base>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6.5 6.5l2.5 2.5M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" />
    </Base>
  );
}
