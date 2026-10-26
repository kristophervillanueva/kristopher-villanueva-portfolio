import Link from "next/link";
import { site } from "@/lib/site";
import { CopyEmail } from "@/components/copy-email";
import { ArrowUpRight, LinkedIn, Mail } from "@/components/icons";

export function Contact() {
  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="relative overflow-hidden rounded-[12px] border border-line bg-panel">
          <div
            className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_68%)]"
            aria-hidden
          />
          <div className="relative p-7 sm:p-12 lg:p-14">
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 max-w-2xl text-[1.7rem] leading-tight sm:text-[2.3rem]">
              Looking for someone who documents the system and tests the
              recovery?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">
              I am open to infrastructure, systems administration and IT
              operations roles in Metro Manila, hybrid or remote. Full
              technical detail on either case study is available on request.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className="btn btn-primary">
                <Mail className="size-4" />
                Email me
              </a>
              <CopyEmail email={site.email} />
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost"
              >
                <LinkedIn className="size-4 text-ink-3" />
                LinkedIn
              </a>
              <Link href="/resume" className="btn btn-ghost">
                Résumé
                <ArrowUpRight className="size-3.5 text-ink-3" />
              </Link>
            </div>

            <p className="mt-8 font-mono text-xs text-ink-3">
              <a
                href={`mailto:${site.email}`}
                className="link-underline break-all text-ink-2"
              >
                {site.email}
              </a>
            </p>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6 font-mono text-2xs uppercase tracking-[0.12em] text-ink-3">
              <span>{site.locationShort}</span>
              <span>{site.timezone}</span>
              <span className="flex items-center gap-1.5">
                <span className="animate-dot size-1.5 rounded-full bg-ok" aria-hidden />
                {site.availability}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
