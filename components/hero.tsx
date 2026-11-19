import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export function Hero() {
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

            <h1 className="fluid-display mt-7 font-semibold leading-[0.95] tracking-[-0.035em] text-ink">
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

          <div className="relative mx-auto h-[20rem] w-full max-w-[19rem] select-none sm:h-[24rem] lg:mt-1 lg:h-[30rem] lg:max-w-[22rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[8%] bottom-[6%] top-[18%] rounded-full bg-[radial-gradient(ellipse_at_50%_65%,rgba(241,163,60,0.12),transparent_70%)]"
            />
            <Image
              src="/kristopher-cutout.png"
              alt={`${site.name}, ${site.role}`}
              fill
              priority
              sizes="(min-width: 1024px) 22rem, 19rem"
              className="pointer-events-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)]"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
