import { z } from "zod";

/**
 * Every project file in `content/projects/` is validated against this schema
 * at build time. If you add a field with a typo, or forget a required one,
 * `npm run build` fails with a message naming the file and the field.
 */

export const CATEGORIES = {
  backup: "Backup & DR",
  networking: "Networking",
  identity: "Identity & Access",
  m365: "Microsoft 365",
  endpoint: "Endpoint",
  operations: "Operations",
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const categoryKeys = Object.keys(CATEGORIES) as CategoryKey[];

const decisionSchema = z.object({
  decision: z.string(),
  alternative: z.string(),
  why: z.string(),
  cost: z.string().optional(),
});

const evidenceSchema = z.object({
  /** Stable id — also the file name under /public/evidence/<slug>/<id>.webp */
  id: z.string().regex(/^[a-z0-9-]+$/, "use lowercase letters, numbers and hyphens"),
  label: z.string(),
  /** One sentence: what does a viewer learn from this image? */
  proves: z.string(),
  status: z.enum(["verified", "on-request", "not-claimed"]).default("on-request"),
  /** Only meaningful when status is "verified". */
  date: z.string().optional(),
  /** Optional explicit path. Defaults to /evidence/<project-slug>/<id>.webp */
  image: z.string().optional(),
  alt: z.string().optional(),
});

const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const linkSchema = z.object({
  label: z.string(),
  href: z.string().url(),
});

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  type: z.enum(["case-study", "brief"]),
  category: z.enum(categoryKeys as [CategoryKey, ...CategoryKey[]]),
  order: z.number().default(99),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),

  role: z.string().optional(),
  timeframe: z.string().optional(),
  status: z.enum(["operational", "in-progress", "planned"]).default("operational"),

  /** Used on cards and in metadata. Two sentences maximum. */
  summary: z.string(),
  /** One line describing what the work achieved. */
  outcome: z.string().optional(),

  stack: z.array(z.string()).default([]),
  metrics: z.array(metricSchema).default([]),
  evidence: z.array(evidenceSchema).default([]),
  decisions: z.array(decisionSchema).default([]),

  /** Things this project explicitly does NOT prove. Rendered as a ledger. */
  notClaiming: z.array(z.string()).default([]),

  /** Next steps, honest. Rendered as a checklist. */
  next: z.array(z.string()).default([]),

  /** The 60–90 second spoken version, for interview prep. */
  interview: z.string().optional(),

  diagram: z.enum(["backup-flow", "remote-access"]).optional(),
  links: z.array(linkSchema).default([]),
  updated: z.string().optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type Decision = z.infer<typeof decisionSchema>;
export type EvidenceItem = z.infer<typeof evidenceSchema>;
export type Metric = z.infer<typeof metricSchema>;
