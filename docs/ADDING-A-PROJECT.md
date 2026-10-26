# Adding a project

Two ways in: the scaffolder, or a copy of `content/projects/_example-brief.mdx`.

```bash
npm run new:project
# or, non-interactively:
npm run new:project -- --slug office-move --title "Office Move" --type brief --category operations
```

The filename becomes the URL. `office-move.mdx` → `/projects/office-move`.

---

## Frontmatter reference

Only `title`, `subtitle`, `type`, `category` and `summary` are required. The
rest have defaults.

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | string | — | Shown as the page `h1`. |
| `subtitle` | string | — | One line under the title. Concrete, not marketing. |
| `type` | `case-study` \| `brief` | — | See below. |
| `category` | enum | — | `backup`, `networking`, `identity`, `m365`, `endpoint`, `operations`. Drives the index filter. |
| `summary` | string | — | Two sentences max. Used on cards, in search results and as the meta description. |
| `order` | number | `99` | Lower sorts first. |
| `featured` | boolean | `false` | Only meaningful for case studies; `true` puts it on the home page. |
| `draft` | boolean | `false` | `true` hides it from production builds. |
| `role` | string | — | Usually "IT Administrator". |
| `timeframe` | string | — | "2026", "Ongoing", "Aug — Oct 2026". |
| `status` | enum | `operational` | `operational`, `in-progress`, `planned`. Shown as a coloured dot. |
| `outcome` | string | — | One line on what changed. Used on brief cards. |
| `updated` | string | — | Free text: `Oct 2026`. Shown in the meta row. |
| `stack` | string[] | `[]` | Product names. Rendered as chips. |
| `metrics` | `{value,label}[]` | `[]` | Max four read well. Shown as a stat strip. |

### `evidence[]`

Each entry is a named slot. The id is also the filename.

| Field | Notes |
| --- | --- |
| `id` | lowercase letters, numbers, hyphens. Must be unique within the file. |
| `label` | Short name shown under the slot. |
| `proves` | One sentence: what a viewer can verify from this image. |
| `status` | `verified` (published), `on-request` (exists, not published), `not-claimed` (deliberately not offered). |
| `date` | Only used with `verified`. Free text: `2026-10-12`. |
| `image` | Optional override path. Defaults to `/evidence/<slug>/<id>.webp`. |
| `alt` | Optional alt text. Defaults to label + proves. |

### `decisions[]`

| Field | Notes |
| --- | --- |
| `decision` | What you chose. |
| `alternative` | What you rejected. |
| `why` | The constraint that decided it. |
| `cost` | Optional. What the choice costs. |

A decision with no cost reads as marketing. There is always a cost.

### `notClaiming[]`, `next[]`

Plain string arrays. `notClaiming` is a ledger of things the project does not
prove. `next` is an honest checklist — items can stay open indefinitely; that
is the point.

### `diagram`

`backup-flow` or `remote-access`. Renders a component from
`components/diagrams/`. Leave it out for briefs.

### `links`

`{label, href}[]`. Rendered as buttons at the end. All hrefs must be absolute.

---

## In-body components

Available in any `.mdx` file, no import needed:

| Component | Renders |
| --- | --- |
| `<Diagram />` | The SVG named by `diagram:` in the frontmatter. |
| `<Decisions />` | The `decisions[]` array as a table (cards on mobile). |
| `<Evidence />` | The evidence grid with legend. |
| `<NotClaiming />` | The `notClaiming[]` ledger. |
| `<Next />` | The `next[]` checklist. |
| `<Callout title="...">` | A bordered callout. Use for test results. |

Standard Markdown plus GFM tables, task lists and strikethrough work. Heading
ids are generated automatically and the right-hand "On this page" nav is built
from your `##` headings — no configuration.

`<Callout>` takes children, so it needs a closing tag:

```mdx
<Callout title="File-level restore — tested">
A file was recovered and its permissions checked. Elapsed time was not
recorded, so no RTO figure is claimed.
</Callout>
```

---

## Adding screenshots

1. Put the file at `public/evidence/<slug>/<slot-id>.webp`.
   Filename stem must equal the slot id. WebP, PNG, JPEG or AVIF.
2. Set that slot's `status: verified` and add `date:`.
3. Commit and deploy.

Or upload through `/admin`, which writes to Vercel Blob at the same path and
revalidates the page within its 60-second window. Blob entries take precedence
over committed files, so a later upload replaces a local image without a
redeploy.

Redaction is not optional: see [`REDACTION.md`](./REDACTION.md).

---

## Adding a new diagram

1. Create `components/diagrams/<name>.tsx`, exporting a component that wraps
   its SVG in `<DiagramFrame title="..." caption="...">`.
2. Add the name to the `diagram` enum in `content/projects/_schema.ts`.
3. Add a case for it in the `Diagram` component in `components/mdx.tsx`.

Diagrams are hand-authored SVG on purpose: they stay sharp, they weigh a few
kilobytes, they inherit the theme's CSS variables, and they cannot leak a
screenshot of a real console.

---

## Before you publish

- [ ] No real hostnames, domain names, internal IPs, serial numbers or usernames.
- [ ] No phone number anywhere in the file or its images.
- [ ] Every "tested" claim has either a screenshot or a dated note.
- [ ] `notClaiming[]` has at least one entry, unless the project genuinely has none.
- [ ] `npm run build` passes.
