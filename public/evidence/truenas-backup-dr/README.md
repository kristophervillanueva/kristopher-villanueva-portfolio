# Evidence — Centralised Backup & Disaster Recovery

Drop screenshots here using the slot ids from the frontmatter of
`content/projects/truenas-backup-dr.mdx`:

| Slot id | File | What it should prove |
| --- | --- | --- |
| `veeam-jobs` | `veeam-jobs.webp` | Scheduled VM backups are running and completing. |
| `veeam-restore` | `veeam-restore.webp` | A VM was restored from a recovery point and started. |
| `truenas-pool` | `truenas-pool.webp` | All six disks present, RAID-Z2 vdev online, pool healthy. |
| `truenas-replication` | `truenas-replication.webp` | Replication to the secondary system last succeeded. |
| `wsb-image` | `wsb-image.webp` | The physical host has its own bare-metal recovery path. |
| `truenas-capacity` | `truenas-capacity.webp` | Free space and retention are within configured limits. |

WebP preferred; PNG, JPEG and AVIF also work — the filename stem must match
the slot id exactly.

After adding a file, set that slot's `status` to `verified` and add a `date`
in the frontmatter, then redeploy. Alternatively use `/admin` to upload to
Blob storage, which revalidates the page without a redeploy.

**Redact before committing.** See `docs/REDACTION.md` — hostnames, internal
IPs, serial numbers and usernames must not be visible.
