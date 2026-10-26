import type { Heading } from "@/lib/headings";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <nav aria-label="On this page" className="sticky top-24 hidden lg:block">
      <p className="eyebrow">On this page</p>
      <ul className="mt-4">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="block border-l border-line py-1.5 pl-4 text-[12.5px] leading-snug text-ink-3 transition-colors hover:border-accent hover:text-ink"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
