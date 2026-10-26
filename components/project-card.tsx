import Link from "next/link";
import { categoryLabel, type Project } from "@/lib/projects";
import { ArrowUpRight } from "@/components/icons";
import { ProjectStatus } from "@/components/status";

export function CaseStudyCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group panel relative flex flex-col p-6 transition-colors duration-200 hover:border-line-2 hover:bg-panel-2/50 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-2xs tracking-[0.14em] text-ink-3">
          {String(index).padStart(2, "0")}
        </span>
        <span className="chip">{categoryLabel(project.category)}</span>
      </div>

      <h3 className="mt-7 text-[1.15rem] leading-snug font-semibold text-ink transition-colors group-hover:text-white sm:text-[1.3rem]">
        {project.title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
        {project.subtitle}
      </p>

      <p className="mt-5 text-sm leading-relaxed text-ink-2">
        {project.summary}
      </p>

      {project.metrics.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5">
          {project.metrics.slice(0, 4).map((metric) => (
            <div key={metric.label}>
              <dt className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-3">
                {metric.label}
              </dt>
              <dd className="mt-0.5 font-mono text-sm text-ink">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-auto flex items-center justify-between gap-4 pt-7">
        <ProjectStatus status={project.status} />
        <span className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.12em] text-accent">
          Case study
          <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function BriefCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group panel flex flex-col p-5 transition-colors duration-200 hover:border-line-2 hover:bg-panel-2/50 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-3">
          {categoryLabel(project.category)}
        </span>
        <ArrowUpRight className="size-3.5 text-ink-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>

      <h3 className="mt-4 text-[0.95rem] leading-snug font-medium text-ink">
        {project.title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
        {project.outcome ?? project.summary}
      </p>

      {project.stack.length > 0 && (
        <p className="mt-4 font-mono text-2xs text-ink-3">
          {project.stack.slice(0, 4).join(" · ")}
        </p>
      )}
    </Link>
  );
}

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid gap-4 border-b border-line py-6 transition-colors hover:bg-panel/60 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:px-4"
    >
      <span className="font-mono text-2xs text-ink-3">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-[0.98rem] font-medium text-ink">
            {project.title}
          </h3>
          <span className="chip">{categoryLabel(project.category)}</span>
        </div>
        <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-ink-3">
          {project.summary}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <ProjectStatus status={project.status} />
        <ArrowUpRight className="size-4 text-ink-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
    </Link>
  );
}
