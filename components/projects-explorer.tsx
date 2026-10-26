"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "@/components/icons";
import { ProjectStatus } from "@/components/status";

export type ExplorerItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  categoryLabel: string;
  status: "operational" | "in-progress" | "planned";
  type: "case-study" | "brief";
  stack: string[];
};

export function ProjectsExplorer({
  items,
  categories,
}: {
  items: ExplorerItem[];
  categories: { key: string; label: string; count: number }[];
}) {
  const [active, setActive] = useState("all");

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.category === active)),
    [active, items],
  );

  const filters = [
    { key: "all", label: "All", count: items.length },
    ...categories,
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
        {filters.map((filter) => {
          const selected = active === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActive(filter.key)}
              aria-pressed={selected}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-2xs uppercase tracking-[0.1em] transition-colors ${
                selected
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border-line bg-panel text-ink-3 hover:border-line-2 hover:text-ink-2"
              }`}
            >
              {filter.label}
              <span
                className={`text-[10px] ${selected ? "text-accent" : "text-ink-3"}`}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 border-t border-line">
        {filtered.map((item, index) => (
          <li key={item.slug} className="border-b border-line">
            <Link
              href={`/projects/${item.slug}`}
              className="group grid gap-4 py-6 transition-colors hover:bg-panel/50 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:px-4"
            >
              <span className="font-mono text-2xs text-ink-3">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-[1rem] font-medium text-ink">
                    {item.title}
                  </h2>
                  <span className="chip">{item.categoryLabel}</span>
                  {item.type === "brief" && (
                    <span className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-3">
                      brief
                    </span>
                  )}
                </div>
                <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-ink-3">
                  {item.summary}
                </p>
                {item.stack.length > 0 && (
                  <p className="mt-2.5 font-mono text-2xs text-ink-3">
                    {item.stack.slice(0, 5).join(" · ")}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <ProjectStatus status={item.status} />
                <ArrowUpRight className="size-4 text-ink-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="border-b border-line py-12 text-center text-sm text-ink-3">
          Nothing filed under this category yet.
        </p>
      )}

      <p className="mt-6 font-mono text-2xs uppercase tracking-[0.1em] text-ink-3">
        showing {filtered.length} of {items.length}
      </p>
    </div>
  );
}
