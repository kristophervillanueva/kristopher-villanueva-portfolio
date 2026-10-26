import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowUpRight(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function Mail(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function LinkedIn(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05a4.16 4.16 0 0 1 3.75-2.06c4 0 4.74 2.63 4.74 6.05V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21h-4V9Z" />
    </svg>
  );
}

export function Menu(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Check(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function Print(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 9V3h10v6" />
      <rect x="3" y="9" width="18" height="8" rx="2" />
      <path d="M7 14h10v7H7z" />
    </svg>
  );
}

export function Copy(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H5.5A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" />
    </svg>
  );
}

export function Shield(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z" />
    </svg>
  );
}

export function Database(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
    </svg>
  );
}

export function Network(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="9" y="3" width="6" height="5" rx="1" />
      <rect x="2" y="16" width="6" height="5" rx="1" />
      <rect x="16" y="16" width="6" height="5" rx="1" />
      <path d="M12 8v4M5 16v-2h14v2" />
    </svg>
  );
}

export function Terminal(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </svg>
  );
}

export function FileText(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

export function Upload(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export function Lock(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
