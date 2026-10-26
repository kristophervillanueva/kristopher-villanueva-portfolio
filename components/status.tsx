const PROJECT_STATUS = {
  operational: { label: "Operational", dot: "bg-ok", text: "text-ok" },
  "in-progress": { label: "In progress", dot: "bg-accent", text: "text-accent" },
  planned: { label: "Planned", dot: "bg-ink-3", text: "text-ink-3" },
} as const;

const EVIDENCE_STATUS = {
  verified: { label: "Verified", dot: "bg-ok", text: "text-ok" },
  "on-request": { label: "Screenshot on request", dot: "bg-accent", text: "text-accent" },
  "not-claimed": { label: "Not claimed", dot: "bg-ink-3", text: "text-ink-3" },
} as const;

export function ProjectStatus({
  status,
}: {
  status: keyof typeof PROJECT_STATUS;
}) {
  const value = PROJECT_STATUS[status];
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.12em]">
      <span className={`size-1.5 rounded-full ${value.dot}`} aria-hidden />
      <span className={value.text}>{value.label}</span>
    </span>
  );
}

export function EvidenceStatus({
  status,
  children,
}: {
  status: keyof typeof EVIDENCE_STATUS;
  children?: React.ReactNode;
}) {
  const value = EVIDENCE_STATUS[status];
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.12em]">
      <span className={`size-1.5 rounded-full ${value.dot}`} aria-hidden />
      <span className={value.text}>{children ?? value.label}</span>
    </span>
  );
}
