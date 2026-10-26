import { site } from "@/lib/site";

export function SkillMatrix() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {site.skills.map((group) => (
        <div key={group.key} className="bg-panel p-6">
          <h3 className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.14em] text-ink-3">
            <span className="size-1 rounded-full bg-accent/70" aria-hidden />
            {group.title}
          </h3>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-[13.5px] leading-relaxed text-ink-2">
            {group.items.map((item, index) => (
              <span key={item} className="inline-flex items-baseline gap-1.5">
                {item}
                {index < group.items.length - 1 && (
                  <span className="text-line-2" aria-hidden>
                    ·
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
