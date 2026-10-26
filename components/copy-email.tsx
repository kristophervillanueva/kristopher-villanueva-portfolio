"use client";

import { useState } from "react";
import { Check, Copy } from "@/components/icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="btn btn-ghost"
      aria-live="polite"
    >
      {copied ? (
        <Check className="size-4 text-ok" />
      ) : (
        <Copy className="size-4 text-ink-3" />
      )}
      {copied ? "Copied" : "Copy address"}
    </button>
  );
}
