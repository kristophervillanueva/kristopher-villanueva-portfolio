import Image from "next/image";
import type { Project } from "@/lib/projects";
import type { EvidenceItem } from "@/content/projects/_schema";
import type { EvidenceMap } from "@/lib/evidence";
import { EVIDENCE_LEGEND } from "@/lib/evidence";
import { EvidenceStatus } from "@/components/status";
import { Shield } from "@/components/icons";

function EvidenceSlot({
  item,
  src,
}: {
  item: EvidenceItem;
  src?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-[8px] border border-line bg-panel">
      <div className="relative aspect-[16/10] overflow-hidden bg-panel-2">
        {src ? (
          <Image
            src={src}
            alt={item.alt ?? `${item.label}. ${item.proves}`}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 90vw"
            className="object-cover object-top"
          />
        ) : (
          <>
            <div
              className="absolute inset-3 rounded-[5px] border border-dashed border-line-2/70"
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 text-center">
              <Shield className="size-5 text-ink-3" />
              <p className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-3">
                {item.status === "not-claimed"
                  ? "No proof offered"
                  : "Screenshot available on request"}
              </p>
              <p className="max-w-[260px] text-[11px] leading-relaxed text-ink-3">
                {item.status === "not-claimed"
                  ? "This claim is intentionally not made."
                  : "Redacted before publishing. Ask for it and I will walk you through the console."}
              </p>
            </div>
          </>
        )}
      </div>

      <figcaption className="border-t border-line px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <p className="min-w-0 text-[13px] font-medium text-ink">
            {item.label}
          </p>
          <span className="shrink-0 whitespace-nowrap">
            <EvidenceStatus status={item.status}>
              {item.status === "verified" && item.date
                ? `Verified ${item.date}`
                : undefined}
            </EvidenceStatus>
          </span>
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-ink-3">
          {item.proves}
        </p>
      </figcaption>
    </figure>
  );
}

export function EvidenceGrid({
  project,
  map,
}: {
  project: Project;
  map: EvidenceMap;
}) {
  if (project.evidence.length === 0) return null;

  return (
    <div className="not-prose my-8">
      <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2 rounded-[6px] border border-line bg-panel/60 px-4 py-3">
        {EVIDENCE_LEGEND.map((entry) => (
          <span
            key={entry.status}
            className="inline-flex items-center gap-2 text-[11.5px] text-ink-3"
          >
            <EvidenceStatus status={entry.status} />
            <span>{entry.text}</span>
          </span>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {project.evidence.map((item) => (
          <EvidenceSlot
            key={item.id}
            item={item}
            src={map[item.id] ?? item.image}
          />
        ))}
      </div>
    </div>
  );
}
