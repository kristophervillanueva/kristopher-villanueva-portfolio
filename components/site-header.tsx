"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { ArrowUpRight, Close, Menu } from "@/components/icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="print-hidden sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-[5px] border border-line-2 bg-panel font-mono text-[10px] tracking-widest text-ink-2 transition-colors group-hover:border-accent/60 group-hover:text-ink">
            KV
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[13px] font-medium tracking-tight text-ink">
              {site.name}
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
              {site.role}
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.13em] transition-colors ${
                  active ? "text-ink" : "text-ink-3 hover:text-ink-2"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[21px] h-px bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-[5px] border border-line-2 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2 transition-colors hover:border-accent/50 hover:text-ink"
          >
            Contact
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-9 items-center justify-center rounded-[5px] border border-line text-ink-2 transition-colors hover:border-line-2 hover:text-ink md:hidden"
        >
          {open ? <Close className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-line bg-canvas px-5 pb-5 pt-2 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-line/60 py-3.5 font-mono text-xs uppercase tracking-[0.13em] ${
                  isActive(item.href) ? "text-ink" : "text-ink-2"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="py-3.5 font-mono text-xs uppercase tracking-[0.13em] text-accent"
            >
              Email me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
