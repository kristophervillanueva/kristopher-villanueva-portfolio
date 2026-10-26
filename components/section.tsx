import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
  size = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  size?: "default" | "tight";
}) {
  const pad = size === "tight" ? "py-12 sm:py-16" : "py-16 sm:py-24";
  return (
    <section id={id} className={`border-t border-line ${pad} ${className}`}>
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-[1.7rem] leading-tight sm:text-[2rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
