import type { ReactNode } from "react";

export function DiagramFrame({
  title,
  caption,
  children,
  legend,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
  legend?: ReactNode;
}) {
  return (
    <figure className="not-prose my-8">
      <div className="overflow-hidden rounded-[10px] border border-line bg-panel">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-3">
            {title}
          </span>
          <span className="font-mono text-2xs text-ink-3">
            figure · not to scale
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[720px] p-4 sm:p-6">{children}</div>
        </div>

        {legend && (
          <div className="border-t border-line px-4 py-3">{legend}</div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-[12.5px] leading-relaxed text-ink-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function LegendItem({
  dashed = false,
  accent = false,
  children,
}: {
  dashed?: boolean;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-[11.5px] text-ink-3">
      <svg width="26" height="6" aria-hidden className="shrink-0">
        <line
          x1="0"
          y1="3"
          x2="26"
          y2="3"
          stroke={accent ? "var(--color-accent)" : "var(--color-line-2)"}
          strokeWidth="1.5"
          strokeDasharray={dashed ? "4 4" : undefined}
        />
      </svg>
      {children}
    </span>
  );
}
