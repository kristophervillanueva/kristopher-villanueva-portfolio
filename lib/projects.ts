import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import {
  CATEGORIES,
  categoryKeys,
  projectFrontmatterSchema,
  type CategoryKey,
  type ProjectFrontmatter,
} from "@/content/projects/_schema";

export type Project = ProjectFrontmatter & {
  slug: string;
  body: string;
};

const PROJECT_DIR = path.join(process.cwd(), "content", "projects");

let cache: Project[] | null = null;

function formatIssues(file: string, error: z.ZodError) {
  const lines = error.issues.map((issue) => {
    const field = issue.path.length ? issue.path.join(".") : "(root)";
    return `    • ${field}: ${issue.message}`;
  });
  return [
    "",
    `  Content error in content/projects/${file}`,
    ...lines,
    "",
    "  Fix the fields above, then run the build again.",
    "  See docs/ADDING-A-PROJECT.md for the full field reference.",
    "",
  ].join("\n");
}

function readProject(file: string): Project {
  const raw = fs.readFileSync(path.join(PROJECT_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const parsed = projectFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(formatIssues(file, parsed.error));
  }

  return {
    ...parsed.data,
    slug: file.replace(/\.mdx?$/, ""),
    body: content.trim(),
  };
}

export function getAllProjects({
  includeDrafts = false,
}: { includeDrafts?: boolean } = {}): Project[] {
  if (!cache) {
    if (!fs.existsSync(PROJECT_DIR)) return [];
    cache = fs
      .readdirSync(PROJECT_DIR)
      .filter((file) => /\.mdx?$/.test(file))
      .filter((file) => !file.startsWith("_"))
      .map(readProject);
  }

  return cache
    .filter((project) => includeDrafts || !project.draft)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects({ includeDrafts: true }).find((p) => p.slug === slug);
}

export function getPublishedSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.type === "case-study" && p.featured);
}

export function getBriefProjects(): Project[] {
  return getAllProjects().filter((p) => p.type === "brief");
}

export function getCaseStudies(): Project[] {
  return getAllProjects().filter((p) => p.type === "case-study");
}

export function getUsedCategories(): { key: CategoryKey; label: string; count: number }[] {
  const projects = getAllProjects();
  return categoryKeys
    .map((key) => ({
      key,
      label: CATEGORIES[key],
      count: projects.filter((p) => p.category === key).length,
    }))
    .filter((entry) => entry.count > 0);
}

export function categoryLabel(key: CategoryKey) {
  return CATEGORIES[key];
}

/** /evidence/<slug>/<id>.webp unless the frontmatter overrides it. */
export function evidenceSrc(project: Project, id: string, override?: string) {
  return override ?? `/evidence/${project.slug}/${id}.webp`;
}
