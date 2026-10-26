"use client";

import { Print } from "@/components/icons";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn btn-primary print-hidden"
    >
      <Print className="size-4" />
      Print / save as PDF
    </button>
  );
}
