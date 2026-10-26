import type { Decision } from "@/content/projects/_schema";
import { Check } from "@/components/icons";

export function DecisionTable({ decisions }: { decisions: Decision[] }) {
  if (decisions.length === 0) return null;

  return (
    <div className="not-prose my-8">
      {/* desktop */}
      <div className="hidden overflow-hidden rounded-[8px] border border-line md:block">
        <table className="w-full border-collapse text-left align-top">
          <thead>
            <tr className="border-b border-line bg-panel-2/70">
              {["Decision", "Alternative considered", "Why", "Accepted cost"].map(
                (heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-4 py-3 font-mono text-2xs font-medium uppercase tracking-[0.12em] text-ink-3"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {decisions.map((decision) => (
              <tr key={decision.decision} className="align-top">
                <td className="w-[24%] px-4 py-4 text-[13px] font-medium leading-relaxed text-ink">
                  {decision.decision}
                </td>
                <td className="w-[22%] px-4 py-4 text-[12.5px] leading-relaxed text-ink-3">
                  {decision.alternative}
                </td>
                <td className="w-[30%] px-4 py-4 text-[12.5px] leading-relaxed text-ink-2">
                  {decision.why}
                </td>
                <td className="w-[24%] px-4 py-4 text-[12.5px] leading-relaxed text-ink-3">
                  {decision.cost ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile */}
      <div className="space-y-3 md:hidden">
        {decisions.map((decision, index) => (
          <div
            key={decision.decision}
            className="rounded-[8px] border border-line bg-panel p-4"
          >
            <p className="font-mono text-2xs text-ink-3">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-[13.5px] font-medium leading-snug text-ink">
              {decision.decision}
            </p>

            <dl className="mt-3 space-y-2.5">
              <div>
                <dt className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-3">
                  Instead of
                </dt>
                <dd className="mt-0.5 text-[12.5px] leading-relaxed text-ink-3">
                  {decision.alternative}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-3">
                  Why
                </dt>
                <dd className="mt-0.5 text-[12.5px] leading-relaxed text-ink-2">
                  {decision.why}
                </dd>
              </div>
              {decision.cost && (
                <div>
                  <dt className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-3">
                    Cost
                  </dt>
                  <dd className="mt-0.5 text-[12.5px] leading-relaxed text-ink-3">
                    {decision.cost}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotClaimingList({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="not-prose my-6 space-y-3.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-[14px] leading-relaxed text-ink-2"
        >
          <span
            className="mt-[0.55rem] size-1.5 shrink-0 rounded-full border border-ink-3/70"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NextSteps({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <ol className="not-prose my-6 space-y-3">
      {items.map((item, index) => (
        <li
          key={item}
          className="flex gap-3.5 border-l border-line pl-4 text-[14px] leading-relaxed text-ink-2"
        >
          <span className="mt-0.5 font-mono text-2xs text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose my-6 rounded-[8px] border border-line bg-panel border-l-2 border-l-accent/70 p-4 sm:p-5">
      <p className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.13em] text-accent">
        <Check className="size-3.5" />
        {title}
      </p>
      <div className="mt-2.5 text-[13.5px] leading-relaxed text-ink-2">
        {children}
      </div>
    </div>
  );
}
