# Content

Everything recruiter-facing lives in two places:

```
content/projects/        one .mdx file per project
public/evidence/<slug>/  screenshots referenced by that project
```

Nothing else needs editing to add a project. The site reads this directory at
build time and validates every file against `content/projects/_schema.ts`.

## Files in this directory

| File | Purpose |
| --- | --- |
| `<slug>.mdx` | A published project. The filename is the URL: `/projects/<slug>`. |
| `_example-brief.mdx` | Commented template. Ignored by the site (leading underscore). |
| `_schema.ts` | Zod schema. The build fails, naming the file and field, if frontmatter is wrong. |

## The two project types

**`case-study`** — the full template. Supports a diagram, a decision table,
an evidence grid, a "not claiming" ledger and next steps. Use it for the work
that deserves a full engineering record.

**`brief`** — a short record: problem, approach, outcome, next step. No
evidence grid, no decision table. Use it for work that is real but not worth
a full write-up.

Both render at `/projects/<slug>` and both appear in the index. Briefs are
visually de-emphasised rather than hidden.

## Adding a project

```bash
npm run new:project
```

Answers: title, type, category, subtitle. It writes the MDX file and creates
the evidence folder with a README. Full field reference:
[`docs/ADDING-A-PROJECT.md`](../docs/ADDING-A-PROJECT.md).

## The honesty rule

Every project has three separate places for claims, and they are not
interchangeable:

- **`outcome` / body prose** — what changed, stated plainly.
- **`evidence[].status: verified`** — only for things you have tested and can
  screenshot. `on-request` means it exists but is not published.
- **`notClaiming[]`** — what this project deliberately does *not* prove.

If something was designed but never tested, it belongs in `next[]` or
`notClaiming[]`. Never in the outcome. A reviewer who catches an inflated
claim stops believing the rest of the site; a reviewer who sees an honest gap
usually asks about it.

## Drafts

`draft: true` keeps a file out of production builds and the index, while
remaining visible in `npm run dev`. The `/admin` upload page still lists its
evidence slots, so you can prepare screenshots before publishing.

## Validation

The build fails loudly rather than shipping broken content:

```
  Content error in content/projects/my-project.mdx
    • category: Invalid option: expected one of "backup"|"networking"|...
    • evidence.0.id: use lowercase letters, numbers and hyphens
```

Run `npm run build` before pushing, or `npm run dev` which surfaces the same
error in the terminal on save.
