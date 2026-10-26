import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/print-button";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/seo";
import { ArrowLeft } from "@/components/icons";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé for ${site.name}, ${site.role} — ${site.specialism}. Infrastructure, service desk and systems administration background.`,
  alternates: { canonical: "/resume" },
};

const competencies = [
  "Windows Server & Active Directory",
  "Hyper-V virtualisation",
  "Microsoft 365 administration",
  "Veeam Backup & Replication",
  "TrueNAS / OpenZFS",
  "FortiGate & OPNsense firewalls",
  "VLAN segmentation",
  "OpenVPN & MFA (RADIUS, TOTP)",
  "Disaster recovery planning",
  "Backup and restore validation",
  "IT asset lifecycle",
  "Vendor & CAPEX coordination",
  "SOP and documentation",
  "ServiceNow",
];

export default function ResumePage() {
  return (
    <>
      <div className="print-hidden border-b border-line">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.12em] text-ink-3 transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" />
            Back to portfolio
          </Link>
          <div className="flex items-center gap-3">
            <p className="hidden font-mono text-2xs uppercase tracking-[0.1em] text-ink-3 sm:block">
              A4 · two pages
            </p>
            <PrintButton />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-5 py-10 sm:px-8 sm:py-14 print:max-w-none print:p-0">
        <article className="resume-sheet print-plain rounded-[10px] border border-line bg-panel px-6 py-8 sm:px-10 sm:py-12 print:border-0 print:bg-white print:p-0">
          <header className="border-b border-line pb-6 print:border-b-2 print:border-black/20 print:pb-4">
            <h1 className="text-[2rem] leading-none tracking-[-0.02em] sm:text-[2.4rem]">
              {site.name}
            </h1>
            <p className="mt-2.5 text-[15px] text-ink print:text-black">
              {site.role} — {site.specialism}
            </p>
            <p className="print-muted mt-3 font-mono text-[11.5px] leading-relaxed text-ink-3">
              {site.location} · {site.email} · {site.linkedin.replace("https://www.", "")}
            </p>
            <p className="print-muted mt-1 font-mono text-[10.5px] text-ink-3">
              Phone available on request · Open to infrastructure and systems
              administration roles
            </p>
          </header>

          <section className="mt-7 print:mt-5">
            <h2 className="eyebrow print:text-black">Profile</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-2 print:text-black">
              IT administrator across infrastructure, service desk and systems
              administration. Currently responsible for a 54-workstation
              environment and four production VMs on two Dell Hyper-V hosts:
              Windows Server and Hyper-V, Active Directory, Microsoft 365,
              FortiGate and OPNsense firewalls, and a multi-layer backup and
              recovery estate built on TrueNAS and Veeam. Works to a simple
              standard — document the system, test the recovery, and state
              plainly what has not been verified.
            </p>
          </section>

          <section className="mt-7 print:mt-5">
            <h2 className="eyebrow print:text-black">Core competencies</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[13px] text-ink-2 sm:grid-cols-3 print:grid-cols-3 print:text-[10pt] print:text-black">
              {competencies.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="print:text-black/40" aria-hidden>
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 print:mt-6">
            <h2 className="eyebrow print:text-black">Experience</h2>

            <div className="mt-4 space-y-7 print:space-y-5">
              {site.experience.map((job) => (
                <div
                  key={`${job.company}-${job.role}`}
                  className="resume-job break-inside-avoid"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[15px] font-semibold text-ink print:text-[11.5pt] print:text-black">
                      {job.role}
                    </h3>
                    <p className="print-muted font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
                      {job.period}
                    </p>
                  </div>
                  <p className="print-muted mt-0.5 text-[12.5px] text-ink-3">
                    {job.company} · {job.location}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-2 print:text-[10pt] print:text-black">
                    {job.summary}
                  </p>
                  <ul className="mt-2 space-y-1 print:mt-1.5">
                    {job.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2 text-[12.5px] leading-relaxed text-ink-2 print:text-[9.5pt] print:text-black"
                      >
                        <span
                          className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-line-2 print:bg-black/50"
                          aria-hidden
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 print:mt-6">
            <h2 className="eyebrow print:text-black">Education</h2>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-[13.5px] font-medium text-ink print:text-[10.5pt] print:text-black">
                {site.education.qualification}
              </p>
              <p className="print-muted font-mono text-[10.5px] text-ink-3">
                {site.education.location}
              </p>
            </div>
            <p className="print-muted mt-0.5 text-[12.5px] text-ink-3">
              {site.education.institution}
            </p>
          </section>

          <section className="mt-8 border-t border-line pt-5 print:mt-6 print:border-black/15 print:pt-3">
            <h2 className="eyebrow print:text-black">Selected projects</h2>
            <ul className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-ink-2 print:text-[9.5pt] print:text-black">
              <li>
                <strong className="font-medium text-ink print:text-black">
                  Centralised backup and disaster recovery
                </strong>{" "}
                — Veeam, TrueNAS with RAID-Z2, Windows Server Backup and
                replication to a second system. File-level and virtual-machine
                restores tested.
              </li>
              <li>
                <strong className="font-medium text-ink print:text-black">
                  Secure remote access
                </strong>{" "}
                — OPNsense OpenVPN with certificate, Active Directory password
                and TOTP via FreeRADIUS and privacyIDEA, over LDAPS. End-to-end
                pilot verified with RDP and UltraVNC.
              </li>
              <li>
                <strong className="font-medium text-ink print:text-black">
                  VLAN segmentation
                </strong>{" "}
                — designed and deployed across FortiGate firewalls and managed
                switches.
              </li>
            </ul>
            <p className="print-muted mt-3 font-mono text-[10px] text-ink-3">
              Detailed case studies at {siteUrl.replace(/^https?:\/\//, "")}/projects
            </p>
          </section>
        </article>
      </div>
    </>
  );
}
