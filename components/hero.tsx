import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

const profileRows = [
  { label: "Current role", value: site.role },
  { label: "In role since", value: "Aug 2022" },
  { label: "Environment", value: "54 workstations · 4 VMs" },
  { label: "Virtualisation", value: "2 Dell Hyper-V hosts · 3 + 1" },
  { label: "Core stack", value: "Windows Server · Hyper-V · FortiGate · TrueNAS" },
  { label: "Based", value: "Metro Manila, PH" },
];

export function Hero() {
  const updated = new Date().toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_-10%,black,transparent_75%)]"
      />
      <div
        aria-hidden
        className="glow-top pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-[1180px] px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div className="animate-rise">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="chip">
                <span
                  className="animate-dot size-1.5 rounded-full bg-ok"
                  aria-hidden
                />
                Available for new roles
              </span>
              <span className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-3">
                {site.locationShort} · {site.timezone}
              </span>
            </div>

            <h1 className="mt-7 text-[clamp(2.6rem,7vw,4.3rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-ink">
              {site.name}
            </h1>

            <p className="mt-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-accent">
              {site.headline}
            </p>

            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">
              {site.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="btn btn-primary">
                View the work
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/resume" className="btn btn-ghost">
                Résumé
                <ArrowUpRight className="size-3.5 text-ink-3" />
              </Link>
            </div>
          </div>

          <div className="panel overflow-hidden lg:mt-1">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="font-mono text-2xs uppercase tracking-[0.16em] text-ink-3">
                profile
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.12em] text-ok">
                <span className="size-1.5 rounded-full bg-ok" aria-hidden />
                active
              </span>
            </div>
            <dl className="divide-y divide-line">
              {profileRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 px-5 py-3.5"
                >
                  <dt className="shrink-0 font-mono text-2xs uppercase tracking-[0.12em] text-ink-3">
                    {row.label}
                  </dt>
                  <dd className="text-right text-[12.5px] leading-snug text-ink">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-line px-5 py-3">
              <span className="font-mono text-2xs text-ink-3">
                updated {updated}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
