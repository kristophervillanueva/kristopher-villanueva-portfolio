# kristopher-villanueva-portfolio

Personal portfolio for an IT administrator working in infrastructure, Microsoft
365 and security operations. Built as a set of engineering records rather than a
highlight reel: every project states the constraint, the trade-off, the test that
was run, and — separately — what it does not prove.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · MDX content · Vercel.

## Run it

```bash
npm install
npm run dev
```

<http://localhost:3000>

```bash
npm run build     # also validates every MDX file's frontmatter
npm run typecheck # tsc --noEmit
npm run start     # serve the production build
```

On Windows PowerShell, `npm.ps1` may be blocked by execution policy. Use
`npm.cmd run dev` instead.

## Layout

```
app/
  page.tsx                    home
  projects/page.tsx           index + category filters
  projects/[slug]/page.tsx    case study / brief template
  resume/page.tsx             print-optimised résumé (Ctrl+P → PDF)
  admin/page.tsx              password-gated evidence upload
  api/evidence/route.ts       upload handler → Vercel Blob
  opengraph-image.tsx         generated social cards
  globals.css                 design tokens, prose, motion, print rules
components/
  diagrams/                   hand-authored SVG architecture diagrams
  …                           header, hero, cards, evidence grid, MDX parts
content/projects/
  <slug>.mdx                  one file per project
  _schema.ts                  zod frontmatter contract
lib/
  site.ts                     profile, experience, skills (from the résumé)
  projects.ts                 MDX loader + validation
  evidence.ts                 local + Blob evidence resolution
scripts/new-project.mjs       scaffolder
docs/                         adding projects, redaction, deployment
```

## Adding a project

```bash
npm run new:project
```

Scaffolds the MDX file and the evidence folder, then tells you what to fill in.
Full field reference: [`docs/ADDING-A-PROJECT.md`](docs/ADDING-A-PROJECT.md).

## Evidence screenshots

Two ways, and neither requires touching code:

1. Drop a file at `public/evidence/<slug>/<slot-id>.webp` and redeploy.
2. Upload through `/admin`, which resizes and converts to WebP, strips metadata,
   and writes to Vercel Blob. The page revalidates without a redeploy.

Slots are declared in each project's frontmatter and appear as labelled
placeholders until an image exists. Read [`docs/REDACTION.md`](docs/REDACTION.md)
before publishing anything.

## What is deliberately absent

- **No phone number.** Email and LinkedIn are the contact paths.
- **No certifications section.** Not held, so not claimed.
- **No real hostnames, IPs or domain names.** Addressing is omitted or
  generalised rather than published; the employer name appears only in the
  employment timeline, never next to a topology.
- **No invented metrics.** Things that were not measured are labelled as not
  measured, even where a number would have looked better.

## Deploying

See [`docs/DEPLOY.md`](docs/DEPLOY.md). Short version: import the repo into
Vercel, optionally add Blob storage and `ADMIN_PASSWORD` for the upload page,
deploy.

Every push and pull request runs typecheck, build and a production dependency
audit via GitHub Actions. Dependabot keeps dependencies current in grouped
weekly pull requests.

## Security

Security headers (CSP, HSTS in production, framing denial), upload hardening and
the disclosure process are documented in [`SECURITY.md`](SECURITY.md).
