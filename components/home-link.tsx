"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type HomeLinkProps = ComponentProps<typeof Link>;

/**
 * Home links must always land on the top of the page. Next's Link does not
 * scroll on same-route clicks, and its client navigation can restore a
 * previous home scroll position when arriving from another route.
 */
export function HomeLink({ onClick, ...props }: HomeLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    // Preserve new-tab / modified clicks.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    // A full navigation guarantees the top for cross-page clicks and clears
    // any hash; client-side navigation can restore an old home scroll offset.
    if (pathname !== "/" || window.location.hash) {
      window.location.assign("/");
      return;
    }

    // Plain same-route click: Link would do nothing, so scroll explicitly.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return <Link {...props} onClick={handleClick} />;
}
