"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent_75%)]"
      />
      <div className="relative mx-auto max-w-[1180px] px-5 py-28 sm:px-8 sm:py-40">
        <p className="eyebrow">500 · unexpected fault</p>
        <h1 className="mt-4 max-w-2xl text-[clamp(1.9rem,5vw,3rem)] leading-[1.05] tracking-[-0.02em]">
          Something failed outside the happy path.
        </h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-2">
          The page could not finish rendering. Retrying usually clears a
          transient failure; if it does not, the project index still works.
        </p>
        {error.digest && (
          <p className="mt-5 font-mono text-2xs text-ink-3">
            digest {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/projects" className="btn btn-ghost">
            <ArrowLeft className="size-3.5" />
            All projects
          </Link>
        </div>
      </div>
    </div>
  );
}
