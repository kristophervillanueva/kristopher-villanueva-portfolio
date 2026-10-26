import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projects = getAllProjects().map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: project.type === "case-study" ? 0.8 : 0.6,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/resume"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...projects,
  ];
}
