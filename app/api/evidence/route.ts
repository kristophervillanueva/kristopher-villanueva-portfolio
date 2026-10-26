import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import sharp from "sharp";
import { getProject } from "@/lib/projects";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_BYTES = 4 * 1024 * 1024;
const MAX_PIXELS = 40_000_000;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILURES = 8;
const attempts = new Map<string, { count: number; resetAt: number }>();

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function pruneExpired(now: number) {
  if (attempts.size < 500) return;
  for (const [key, entry] of attempts) {
    if (entry.resetAt <= now) attempts.delete(key);
  }
}

/** Returns a Retry-After value in seconds when the caller is locked out. */
function blockStatus(ip: string) {
  const now = Date.now();
  pruneExpired(now);
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt <= now) return null;
  if (entry.count < MAX_FAILURES) return null;
  return Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
}

function recordFailure(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  entry.count += 1;
}

function clearFailures(ip: string) {
  attempts.delete(ip);
}

function authorised(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const provided = request.headers.get("x-admin-password") ?? "";
  if (!provided || provided.length > 256) return false;

  // Hash both sides so the comparison is fixed-length and constant-time.
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return json(
      {
        error:
          "Blob storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel, or drop the file into public/evidence/<project>/<slot>.webp instead.",
      },
      503,
    );
  }

  if (!process.env.ADMIN_PASSWORD) {
    return json({ error: "ADMIN_PASSWORD is not set in this environment." }, 503);
  }

  const ip = clientIp(request);
  const retryAfter = blockStatus(ip);
  if (retryAfter !== null) {
    return Response.json(
      { error: "Too many failed attempts. Try again later." },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Retry-After": String(retryAfter),
        },
      },
    );
  }

  if (!authorised(request)) {
    recordFailure(ip);
    await new Promise((resolve) => setTimeout(resolve, 350));
    return json({ error: "Incorrect password." }, 401);
  }

  clearFailures(ip);

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
    return json({ error: "Expected a multipart upload." }, 415);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Could not read the upload." }, 400);
  }

  const projectSlug = String(form.get("project") ?? "");
  const slotId = String(form.get("slot") ?? "");
  const file = form.get("file");

  if (!/^[a-z0-9-]+$/.test(projectSlug) || !/^[a-z0-9-]+$/.test(slotId)) {
    return json({ error: "Unknown project or slot identifier." }, 400);
  }

  const project = getProject(projectSlug);
  if (!project) {
    return json({ error: "That project does not exist." }, 404);
  }

  const slot = project.evidence.find((item) => item.id === slotId);
  if (!slot) {
    return json(
      { error: "That evidence slot is not defined in this project's frontmatter." },
      404,
    );
  }

  if (!(file instanceof Blob)) {
    return json({ error: "No image was attached." }, 400);
  }

  if (file.size > MAX_BYTES) {
    return json(
      {
        error: `That file is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is 4 MB — crop or resize it first.`,
      },
      413,
    );
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return json({ error: "Only JPEG, PNG, WebP or AVIF images are accepted." }, 415);
  }

  let processed: Buffer;
  try {
    const input = Buffer.from(await file.arrayBuffer());
    processed = await sharp(input, {
      failOn: "error",
      limitInputPixels: MAX_PIXELS,
    })
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return json(
      {
        error:
          "That image could not be processed. Try exporting it as PNG or JPEG first.",
      },
      422,
    );
  }

  const pathname = `evidence/${projectSlug}/${slotId}.webp`;

  try {
    const blob = await put(pathname, processed, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "image/webp",
      cacheControlMaxAge: 60,
    });

    revalidatePath(`/projects/${projectSlug}`);

    return json({
      url: blob.url,
      pathname: blob.pathname,
      bytes: processed.byteLength,
      note: "Uploaded as WebP, resized to 1600 px wide, camera and location metadata stripped.",
    });
  } catch (error) {
    // Keep provider details out of the response; log for the deployment owner.
    console.error("Evidence upload failed", error);
    return json({ error: "Upload failed. Check the Blob store configuration." }, 500);
  }
}
