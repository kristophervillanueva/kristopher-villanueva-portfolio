"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Check, Lock, Upload } from "@/components/icons";

type Slot = { id: string; label: string; proves: string; status: string };
type AdminProject = { slug: string; title: string; slots: Slot[] };

const CHECKLIST = [
  "Employer name, logo, or any internal branding",
  "Hostnames, domain names, and internal IP addresses",
  "Usernames, full names, and email addresses",
  "Window title bars and browser URL bars",
  "Server serial numbers and asset tags",
  "Anything that reveals customer or project data",
];

export function AdminUploader({
  projects,
  configured,
  hasPassword,
}: {
  projects: AdminProject[];
  configured: boolean;
  hasPassword: boolean;
}) {
  const [password, setPassword] = useState("");
  const [projectSlug, setProjectSlug] = useState(projects[0]?.slug ?? "");
  const [slotId, setSlotId] = useState(projects[0]?.slots[0]?.id ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; note: string } | null>(
    null,
  );
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = window.sessionStorage.getItem("evidence-admin-password");
    if (saved) setPassword(saved);
  }, []);

  const project = useMemo(
    () => projects.find((entry) => entry.slug === projectSlug),
    [projectSlug, projects],
  );
  const slot = useMemo(
    () => project?.slots.find((entry) => entry.id === slotId),
    [project, slotId],
  );

  function selectProject(slug: string) {
    setProjectSlug(slug);
    const nextProject = projects.find((entry) => entry.slug === slug);
    setSlotId(nextProject?.slots[0]?.id ?? "");
    setResult(null);
    setError(null);
  }

  function pickFile(next: File | null) {
    setError(null);
    setResult(null);
    if (!next) return;
    if (!next.type.startsWith("image/")) {
      setError("That file is not an image.");
      return;
    }
    if (next.size > 4 * 1024 * 1024) {
      setError(
        `That file is ${(next.size / 1024 / 1024).toFixed(1)} MB. The limit is 4 MB.`,
      );
      return;
    }
    setFile(next);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!file) {
      setError("Choose an image first.");
      return;
    }
    if (!password) {
      setError("Enter the admin password.");
      return;
    }

    setBusy(true);
    window.sessionStorage.setItem("evidence-admin-password", password);

    try {
      const body = new FormData();
      body.set("project", projectSlug);
      body.set("slot", slotId);
      body.set("file", file);

      const response = await fetch("/api/evidence", {
        method: "POST",
        headers: { "x-admin-password": password },
        body,
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error ?? "Upload failed.");
        return;
      }

      setResult({
        url: `${payload.url}?v=${Date.now()}`,
        note: payload.note,
      });
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch {
      setError("The request could not be sent. Check the connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
      <div>
        <div className="flex items-center gap-2.5">
          <Lock className="size-4 text-accent" />
          <h1 className="text-[1.6rem] leading-none">Evidence upload</h1>
        </div>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-2">
          Publishes a screenshot to a case study. Files are converted to WebP,
          resized to 1600 px wide, and stripped of camera and location metadata
          before they are stored.
        </p>

        {!configured && (
          <div className="mt-6 rounded-[8px] border border-accent/40 bg-accent/[0.06] p-4">
            <p className="font-mono text-2xs uppercase tracking-[0.12em] text-accent">
              Storage not configured
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-2">
              <code className="rounded border border-line bg-panel px-1 py-0.5 font-mono text-[11.5px]">
                BLOB_READ_WRITE_TOKEN
              </code>{" "}
              is missing, so uploads are disabled. Either add Vercel Blob
              storage to the project, or drop files into{" "}
              <code className="rounded border border-line bg-panel px-1 py-0.5 font-mono text-[11.5px]">
                public/evidence/&lt;project&gt;/&lt;slot&gt;.webp
              </code>{" "}
              and redeploy. The site works either way.
            </p>
          </div>
        )}

        {!hasPassword && (
          <div className="mt-4 rounded-[8px] border border-danger/40 bg-danger/[0.06] p-4">
            <p className="font-mono text-2xs uppercase tracking-[0.12em] text-danger">
              No admin password set
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-2">
              Add <code className="font-mono text-[11.5px]">ADMIN_PASSWORD</code>{" "}
              to the environment before uploading.
            </p>
          </div>
        )}

        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="password"
              className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-3"
            >
              Admin password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-[6px] border border-line bg-panel px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/30"
              placeholder="Set in ADMIN_PASSWORD"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="project"
                className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-3"
              >
                Project
              </label>
              <select
                id="project"
                value={projectSlug}
                onChange={(event) => selectProject(event.target.value)}
                className="mt-2 w-full rounded-[6px] border border-line bg-panel px-3 py-2.5 text-sm text-ink focus:border-accent/60 focus:outline-none"
              >
                {projects.map((entry) => (
                  <option key={entry.slug} value={entry.slug}>
                    {entry.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="slot"
                className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-3"
              >
                Evidence slot
              </label>
              <select
                id="slot"
                value={slotId}
                onChange={(event) => {
                  setSlotId(event.target.value);
                  setResult(null);
                  setError(null);
                }}
                className="mt-2 w-full rounded-[6px] border border-line bg-panel px-3 py-2.5 text-sm text-ink focus:border-accent/60 focus:outline-none"
              >
                {(project?.slots ?? []).map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.label} ({entry.id})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {slot && (
            <p className="rounded-[6px] border border-line bg-panel px-3.5 py-3 text-[12.5px] leading-relaxed text-ink-3">
              <span className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-3">
                This image should prove:
              </span>{" "}
              <span className="text-ink-2">{slot.proves}</span>
            </p>
          )}

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              pickFile(event.dataTransfer.files[0] ?? null);
            }}
            className={`rounded-[8px] border border-dashed p-6 text-center transition-colors ${
              dragging
                ? "border-accent/70 bg-accent/[0.05]"
                : "border-line-2 bg-panel/50"
            }`}
          >
            <Upload className="mx-auto size-5 text-ink-3" />
            <p className="mt-2.5 text-[13px] text-ink-2">
              {file ? file.name : "Drop a screenshot here"}
            </p>
            <p className="mt-1 font-mono text-2xs text-ink-3">
              PNG, JPEG or WebP · max 4 MB
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              aria-label="Screenshot file"
              onChange={(event) => pickFile(event.target.files?.[0] ?? null)}
              className="mt-3 block w-full text-[12px] text-ink-3 file:mr-3 file:rounded-[4px] file:border file:border-line-2 file:bg-panel-2 file:px-3 file:py-1.5 file:font-mono file:text-2xs file:uppercase file:tracking-[0.1em] file:text-ink-2 hover:file:border-accent/50"
            />
          </div>

          <button
            type="submit"
            disabled={busy || !configured}
            className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Processing…" : "Upload and publish"}
          </button>

          {error && (
            <p className="rounded-[6px] border border-danger/40 bg-danger/[0.06] px-3.5 py-3 text-[13px] text-danger">
              {error}
            </p>
          )}

          {result && (
            <div className="rounded-[8px] border border-ok/40 bg-ok/[0.05] p-4">
              <p className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.12em] text-ok">
                <Check className="size-3.5" />
                Published
              </p>
              <div className="relative mt-3 aspect-[16/10] overflow-hidden rounded-[4px] border border-line bg-panel-2">
                <Image
                  src={result.url}
                  alt="Uploaded evidence preview"
                  fill
                  sizes="(min-width: 1024px) 500px, 90vw"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-ink-3">
                {result.note} The case study has been revalidated — reload it to
                confirm.
              </p>
              <p className="mt-2 break-all font-mono text-[11px] text-ink-3">
                {result.url.split("?")[0]}
              </p>
            </div>
          )}
        </form>
      </div>

      <aside className="lg:pt-2">
        <div className="rounded-[8px] border border-line bg-panel p-5">
          <p className="eyebrow">Before you upload</p>
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink-3">
            Anything you publish here is public and permanent. Black these out
            first:
          </p>
          <ul className="mt-4 space-y-2.5">
            {CHECKLIST.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[12px] leading-relaxed text-ink-2"
              >
                <span
                  className="mt-1.5 size-1 shrink-0 rounded-full bg-accent/70"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-line pt-3 font-mono text-2xs leading-relaxed text-ink-3">
            When in doubt, crop tighter. A close view of one healthy pool is
            more persuasive than a full desktop.
          </p>
        </div>

        <div className="mt-4 rounded-[8px] border border-line bg-panel p-5">
          <p className="eyebrow">Drop-in alternative</p>
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink-3">
            You can skip this page entirely. Save the image as{" "}
            <code className="font-mono text-[11px] text-ink-2">
              public/evidence/&lt;project&gt;/&lt;slot&gt;.webp
            </code>{" "}
            and redeploy. Nothing else to configure.
          </p>
        </div>
      </aside>
    </div>
  );
}
