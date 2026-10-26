import fs from "node:fs";
import path from "node:path";
import { list } from "@vercel/blob";

const IMAGE_RE = /\.(webp|png|jpe?g|avif)$/i;

export type EvidenceMap = Record<string, string>;

/**
 * Evidence images can arrive two ways:
 *
 *  1. Committed to the repo at public/evidence/<slug>/<slot-id>.webp
 *  2. Uploaded through /admin, which writes to Vercel Blob at the same path
 *
 * Blob entries win, so an upload replaces a stale local file without a redeploy.
 * Pages that call this are revalidated every 60 seconds (see app/projects/[slug]).
 */
export async function getEvidenceMap(slug: string): Promise<EvidenceMap> {
  const map: EvidenceMap = {};

  const localDir = path.join(process.cwd(), "public", "evidence", slug);
  try {
    if (fs.existsSync(localDir)) {
      for (const file of fs.readdirSync(localDir)) {
        if (!IMAGE_RE.test(file)) continue;
        map[file.replace(IMAGE_RE, "")] = `/evidence/${slug}/${file}`;
      }
    }
  } catch {
    // A read failure should never break the page; fall through to Blob.
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: `evidence/${slug}/`, limit: 100 });
      for (const blob of blobs) {
        const file = blob.pathname.split("/").pop() ?? "";
        if (!IMAGE_RE.test(file)) continue;
        map[file.replace(IMAGE_RE, "")] = blob.url;
      }
    } catch {
      // Blob storage misconfigured or unreachable: placeholders still render.
    }
  }

  return map;
}

export const EVIDENCE_LEGEND = [
  {
    status: "verified" as const,
    text: "tested, with the evidence published below",
  },
  {
    status: "on-request" as const,
    text: "exists and can be shown in a call or on request",
  },
  {
    status: "not-claimed" as const,
    text: "deliberately excluded from what this project claims",
  },
];
