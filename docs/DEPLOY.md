# Deploying

The site is a standard Next.js app. Vercel is the path of least resistance
because Blob storage is a first-party add-on, but nothing here is
Vercel-specific except `/admin`.

**Production:** <https://kristopher-villanueva-portfolio.vercel.app>

## Prerequisites

- Node 20.9 or newer (developed on 24).
- A GitHub account, or the Vercel CLI.

## 1. Local verification

```bash
npm install
npm run build
npm run start
```

Open <http://localhost:3000> and check the pages listed under
[Post-deploy checks](#post-deploy-checks).

`npm run build` validates all MDX frontmatter. A content error fails the build
with the filename and field name in the message.

## 2. Deploy through GitHub (recommended)

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then in Vercel: **Add New → Project → Import** the repository. Framework
preset is detected as Next.js; no build settings need changing.

Every push to `main` deploys to production once the Vercel project is connected
to the GitHub repository. Every other branch gets a preview URL.

If `npx vercel git connect` reports **"You need to add a Login Connection to
your GitHub account first"**, add GitHub as a login connection in the Vercel
account settings and run it again. Until that connection exists, a push updates
GitHub but does not deploy; run `npx vercel --prod` manually after pushing.

The same push also runs `.github/workflows/ci.yml`: `npm ci`, typecheck, build
and a production-dependency audit. Dependabot opens weekly grouped dependency
pull requests, so let CI run before merging them.

## 3. Or deploy from the CLI

```bash
npx vercel login
npx vercel            # preview deployment
npx vercel --prod     # production
```

## 4. Environment variables

Set these in **Project → Settings → Environment Variables**. None are required
for the site to build and run; they only enable `/admin`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `BLOB_READ_WRITE_TOKEN` | For uploads | Created automatically when you add Blob storage. |
| `ADMIN_PASSWORD` | For uploads | Compared server-side via SHA-256 with a timing-safe compare. Use 24+ random characters. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical URL. On Vercel the site derives it from `VERCEL_PROJECT_PRODUCTION_URL`, so only set this for a custom domain. |

Generate a password:

```powershell
# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

```bash
# bash
openssl rand -base64 24
```

### Enabling the upload page

1. Vercel dashboard → **Storage** → **Create Database** → **Blob**.
2. Connect it to the project. `BLOB_READ_WRITE_TOKEN` is added automatically.
3. Add `ADMIN_PASSWORD` manually.
4. Redeploy so the variables are picked up.

Without these, `/admin` renders a "storage not configured" notice and the
drop-in file method in `public/evidence/` still works.

## 5. Custom domain

**Settings → Domains → Add.** Then either set `NEXT_PUBLIC_SITE_URL` to the
new origin, or let Vercel's production URL stand. Pull requests and preview
deployments use their own URL automatically, which keeps Open Graph images
pointing at the right host.

## 6. Post-deploy checks

| Check | Expected |
| --- | --- |
| `/` | Hero, two featured case study cards, plus the VLAN case study and office-expansion brief under "Also delivered", skills, about, contact. |
| `/projects` | Four published projects, category filters work, counts match. |
| `/projects/truenas-backup-dr` | Diagram renders, decision table, six evidence placeholders, TOC on desktop. |
| `/projects/secure-remote-access` | Diagram, seven evidence placeholders, "hardest faults" section. |
| `/projects/vlan-segmentation` | Four-VLAN table, decision table, eight evidence placeholders, no real subnets or employer name. |
| `/resume` | Reads cleanly on screen; `Ctrl+P` previews a light, two-page A4 document with no nav or footer. |
| `/admin` | Loads; shows a warning until env vars are set. |
| `/this-does-not-exist` | 404 page with "no route to host". |
| `/sitemap.xml`, `/robots.txt` | Present, `/admin` and `/api/` disallowed. |
| Social preview | Paste the URL into a chat client; the OG card should render. |
| Mobile | Check 375 px, 768 px, 1440 px. No horizontal scrolling except the diagrams, which scroll intentionally. |

## 7. How content updates deploy

- **MDX or code changes** — push to `main`. Vercel builds and deploys.
- **Evidence uploaded through `/admin`** — writes to Blob and revalidates
  `/projects/<slug>` immediately. Project pages also revalidate every 60
  seconds as a safety net, so an upload appears without any deploy.
- **Evidence committed to `public/evidence/`** — needs a deploy, since it is
  part of the build output.
- **Blob beats local.** If both exist for the same slot, the uploaded version
  wins.

## 8. Things that will bite later

- **`/admin` is password-only, not identity-provider-backed.** Failed uploads
  are rate-limited per source address (8 failures per 10 minutes, HTTP 429 with
  `Retry-After`) and each failed check adds a 350 ms delay, but the password is
  still a shared secret. For stronger protection, put the route behind Vercel's
  Deployment Protection, or remove `app/admin/page.tsx` once the evidence set is
  final and use the drop-in file method instead.
- **The password is stored in `sessionStorage`** so a reload does not force a
  re-entry. It clears when the tab closes. Do not use `/admin` on a shared
  machine.
- **The evidence legend copies claim precision.** If a screenshot is uploaded
  but the frontmatter still says `on-request`, the image renders without a
  "verified" badge. Update the frontmatter as well; the upload is a file
  operation, not a claim.
- **Print layout is tuned for A4 at default margins.** If the résumé grows past
  two pages, trim `highlights` in `lib/site.ts` rather than shrinking the font.
- **`revalidate = 60` on project pages** is what makes Blob uploads appear
  without a deploy. Removing it makes uploads require a redeploy.

## Rolling back

Vercel → **Deployments** → pick a previous one → **Promote to Production**.
Content changes are ordinary Git commits, so `git revert` works too.
