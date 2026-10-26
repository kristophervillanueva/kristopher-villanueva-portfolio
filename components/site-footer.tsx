import Link from "next/link";
import { nav, site } from "@/lib/site";
import { LinkedIn, Mail } from "@/components/icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="print-hidden border-t border-line">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 text-sm font-medium text-ink">
              <span className="size-1.5 rounded-full bg-ok" aria-hidden />
              {site.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-2">
              {site.role} — {site.specialism}. Background across infrastructure,
              service desk and systems administration.
            </p>
            <p className="mt-4 font-mono text-2xs uppercase tracking-[0.13em] text-ink-3">
              {site.locationShort} · {site.timezone}
            </p>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline inline-flex items-center gap-2 text-ink-2"
                >
                  <Mail className="size-3.5 text-ink-3" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline inline-flex items-center gap-2 text-ink-2"
                >
                  <LinkedIn className="size-3.5 text-ink-3" />
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href="/resume" className="link-underline text-ink-2">
                  Printable résumé
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Site</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-ink-2">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/projects" className="link-underline text-ink-2">
                  All projects
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-2xs text-ink-3">
            © {year} {site.name}
          </p>
          <p className="max-w-xl font-mono text-2xs leading-relaxed text-ink-3">
            Environment details generalised to protect the employer.
            Full technical detail available on request.
          </p>
        </div>
      </div>
    </footer>
  );
}
