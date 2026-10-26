import Link from "next/link";
import { Hero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/section";
import { BriefCard, CaseStudyCard } from "@/components/project-card";
import { SkillMatrix } from "@/components/skill-matrix";
import { Contact } from "@/components/contact";
import { ArrowRight } from "@/components/icons";
import { getFeaturedProjects, getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const others = getAllProjects().filter(
    (project) => !featured.some((item) => item.slug === project.slug),
  );

  return (
    <>
      <Hero />

      <Section id="work">
        <SectionHeading
          eyebrow="Selected work"
          title="Two projects where the decisions mattered more than the products"
          description="Each one is written as an engineering record: the constraint, the trade-off, the test that was actually run, and the claims I deliberately do not make."
          action={
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.12em] text-ink-2 transition-colors hover:text-accent"
            >
              All projects
              <ArrowRight className="size-3.5" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {featured.map((project, index) => (
            <CaseStudyCard
              key={project.slug}
              project={project}
              index={index + 1}
            />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-4">
              <p className="eyebrow shrink-0">Also delivered</p>
              <span className="hairline" aria-hidden />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((project) => (
                <BriefCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section id="capabilities" size="tight">
        <SectionHeading
          eyebrow="Capabilities"
          title="What I work with day to day"
          description="Drawn from current responsibilities and the tooling documented in the case studies — not a wish list."
        />
        <SkillMatrix />
      </Section>

      <Section id="about">
        <div className="grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="mt-3 max-w-xl text-[1.7rem] leading-tight sm:text-[2rem]">
              Keeping systems running — and writing down how.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-2">
              {site.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-6 font-mono text-2xs uppercase tracking-[0.12em] text-ink-3">
              {site.education.qualification} ·{" "}
              {site.education.institution}
            </p>
          </div>

          <div>
            <p className="eyebrow">How I work</p>
            <ol className="mt-6 space-y-6">
              {site.principles.map((principle, index) => (
                <li
                  key={principle.title}
                  className="border-l border-line pl-5"
                >
                  <span className="font-mono text-2xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 text-sm font-medium text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-3">
                    {principle.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Contact />
    </>
  );
}
