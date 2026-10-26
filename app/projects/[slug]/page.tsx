import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  categoryLabel,
  getProject,
  getPublishedSlugs,
  getAllProjects,
} from "@/lib/projects";
import { getEvidenceMap } from "@/lib/evidence";
import { extractHeadings } from "@/lib/headings";
import { getMdxComponents } from "@/components/mdx";
import { TableOfContents } from "@/components/toc";
import { ProjectStatus } from "@/components/status";
import { Contact } from "@/components/contact";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.summary,
      type: "article",
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();
  if (project.draft && process.env.NODE_ENV === "production") notFound();

  const evidenceMap = await getEvidenceMap(project.slug);
  const headings = extractHeadings(project.body);
  const components = getMdxComponents(project, evidenceMap);

  const all = getAllProjects();
  const index = all.findIndex((entry) => entry.slug === project.slug);
  const next = index >= 0 ? all[(index + 1) % all.length] : undefined;
  const previous = index > 0 ? all[index - 1] : all[all.length - 1];

  const meta = [
    project.role ? { label: "Role", value: project.role } : null,
    project.timeframe ? { label: "Timeframe", value: project.timeframe } : null,
    project.updated ? { label: "Updated", value: project.updated } : null,
    { label: "Type", value: project.type === "case-study" ? "Case study" : "Brief" },
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_20%_0%,black,transparent_78%)]"
        />
        <div className="relative mx-auto max-w-[1180px] px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.12em] text-ink-3 transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" />
            All projects
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <span className="chip">{categoryLabel(project.category)}</span>
            <ProjectStatus status={project.status} />
          </div>

          <h1 className="mt-5 max-w-3xl text-[clamp(1.85rem,4.4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-2">
            {project.subtitle}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-3">
                  {item.label}
                </dt>
                <dd className="mt-1 text-[13px] text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>

          {project.stack.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {project.metrics.length > 0 && (
        <div className="border-b border-line bg-canvas-2/40">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col bg-canvas px-5 py-5 sm:px-6"
                >
                  <dt className="order-2 mt-2.5 font-mono text-2xs uppercase tracking-[0.1em] text-ink-3">
                    {metric.label}
                  </dt>
                  <dd className="order-1 font-mono text-[1.35rem] leading-none text-ink">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <div>
            <TableOfContents headings={headings} />
          </div>

          <div className="min-w-0">
            <div className="prose">
              <MDXRemote
                source={project.body}
                components={components}
                options={{
                  parseFrontmatter: false,
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>

            {project.links.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-6">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-ghost"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5 text-ink-3" />
                  </a>
                ))}
              </div>
            )}

            <div className="mt-12 rounded-[8px] border border-line bg-panel px-5 py-4">
              <p className="font-mono text-2xs leading-relaxed text-ink-3">
                Environment details have been generalised to protect the
                employer. Product versions, dates and measured results are
                reported as recorded. Anything not tested is labelled as such.
              </p>
            </div>

            <nav
              aria-label="Project navigation"
              className="mt-10 grid gap-3 border-t border-line pt-8 sm:grid-cols-2"
            >
              {previous && previous.slug !== project.slug && (
                <Link
                  href={`/projects/${previous.slug}`}
                  className="group rounded-[6px] border border-line p-4 transition-colors hover:border-line-2 hover:bg-panel"
                >
                  <span className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.12em] text-ink-3">
                    <ArrowLeft className="size-3" />
                    Previous
                  </span>
                  <span className="mt-2 block text-[13.5px] text-ink-2 transition-colors group-hover:text-ink">
                    {previous.title}
                  </span>
                </Link>
              )}
              {next && next.slug !== project.slug && (
                <Link
                  href={`/projects/${next.slug}`}
                  className="group rounded-[6px] border border-line p-4 text-right transition-colors hover:border-line-2 hover:bg-panel sm:col-start-2"
                >
                  <span className="flex items-center justify-end gap-2 font-mono text-2xs uppercase tracking-[0.12em] text-ink-3">
                    Next
                    <ArrowRight className="size-3" />
                  </span>
                  <span className="mt-2 block text-[13.5px] text-ink-2 transition-colors group-hover:text-ink">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>

      <Contact />
    </article>
  );
}
