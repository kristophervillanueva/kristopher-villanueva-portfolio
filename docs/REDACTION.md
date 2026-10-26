# Redaction checklist

Anything published on this site is public and effectively permanent: search
engines cache it, screenshots get forwarded, and an archive service may keep a
copy after you take it down.

The site already generalises the written content. Screenshots are the leak.

---

## Before you upload or commit an image

Crop first, redact second. A tight crop around the one panel that proves the
claim removes most of the risk without any blurring.

| Risk | What to do |
| --- | --- |
| Hostnames and domain names | Crop them out or cover them. Especially the domain controller name, NAS hostnames and the FortiGate's system name. |
| Internal IP addresses | Cover. Keep only the octet pattern if it illustrates the design, e.g. `10.x.x.x`. |
| Public IP addresses | Always cover, even if it is dynamic. |
| Usernames, full names, email addresses | Cover, including the signed-in user in a console corner. |
| Employer name and logo | Crop out. Wallpaper, desktop icons, browser bookmarks and window titles all leak it. |
| Serial numbers, asset tags, MAC addresses | Cover. They identify hardware someone could look up. |
| Licence keys, subscription IDs, tenant IDs | Never publish. Not even partially. |
| Customer or project data | Never publish. Render file names and project names count. |
| Browser URL bar, tab titles | Crop the whole browser chrome, or use a cropped screenshot tool. |
| Notification popups, chat windows | Close them before capturing. |
| Certificate details | Subject and SAN reveal real names. Show the issuer chain only. |

## How to redact

**Solid fill, not blur.** Blur and mosaic are reversible with the right
tooling, and pixelation over text can often be read by eye at the right scale.
Draw an opaque rectangle.

**Redact before saving**, in the tool you annotate with. Do not save the
unredacted file into `public/` and redact a copy — the original will end up
committed by accident.

**Re-capture rather than redact** when more than two or three areas need
covering. A clean screenshot from a test VM proves the same thing.

## What this site claims about screenshots

Evidence slots have three states for a reason:

- `verified` — the image is published below the claim.
- `on-request` — the image exists, is redacted, and can be walked through in
  a call. Nothing is published.
- `not-claimed` — deliberately excluded from what the project claims.

Most slots currently sit at `on-request`. That is a legitimate state: it says
the artefact exists without handing an attacker a map. It also keeps the
written claims honest, because the page states plainly that the proof is not
inline.

## Generalisation used in the written content

The published pages describe roles and platform behaviour, not the live
addressing plan:

| Real | Published as |
| --- | --- |
| NAS hostname | "primary NAS" / "secondary NAS" |
| NAS or server management address | Omitted, or described as the management network |
| Domain controller FQDN | "the domain controller" |
| VLAN subnets and gateways | VLAN IDs, purpose and a `/24` with gateway `.254` convention only |
| Firewall policy names and IDs | Described by intent, never by identifier |
| Switch port map | Summarised; the full map stays in the internal as-built |
| "HK HQ" | "regional HQ" |
| Employer name | Appears in the employment timeline only, never beside topology |

No documentation IP ranges are published either, because a plausible-looking
example address can be mistaken for the real plan. If one is ever needed for a
diagram, use RFC 5737 ranges (`192.0.2.0/24`, `198.51.100.0/24`,
`203.0.113.0/24`) and the `.example` TLD. They cannot be routed, which is
exactly why they are safe to print.

## After publishing

If you realise something leaked:

1. Remove the file and redeploy immediately — do not wait for a build cycle if
   you can help it.
2. If it went to Vercel Blob, delete the blob in the dashboard. Deleting from
   the repo does not delete the blob.
3. Purge the Vercel edge cache for the affected route.
4. Request removal from Google's cache if the page was indexed with the image.
5. Change any credential that was visible, even partially.

Deleting a file from a Git repository does not remove it from history. If a
secret was committed, rotate it — do not rewrite history and assume that is
enough.
