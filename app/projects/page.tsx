import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import {
  ProjectsExplorer,
  type ExplorerItem,
} from "@/components/projects-explorer";
import {
  categoryLabel,
  getAllProjects,
  getUsedCategories,
} from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Infrastructure case studies written as engineering records: the constraint, the trade-off, the test that was run, and the claims that are deliberately not made.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  const items: ExplorerItem[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    category: project.category,
    categoryLabel: categoryLabel(project.category),
    status: project.status,
    type: project.type,
    stack: project.stack,
  }));

  const categories = getUsedCategories().map((entry) => ({
    key: entry.key,
    label: entry.label,
    count: entry.count,
  }));

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_15%_0%,black,transparent_78%)]"
        />
        <div className="relative mx-auto max-w-[1180px] px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
          <p className="eyebrow">Projects</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.05] tracking-[-0.025em]">
            Engineering records, not highlight reels
          </h1>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-2">
            Each project documents the business problem, the constraint that
            shaped the design, the trade-off I accepted, and the test that was
            actually run. Where something was not verified, it says so.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <ProjectsExplorer items={items} categories={categories} />
        </div>
      </section>

      <Contact />
    </>
  );
}
