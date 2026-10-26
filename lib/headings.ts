import GithubSlugger from "github-slugger";

export type Heading = { id: string; text: string };

/**
 * Mirrors what rehype-slug does to the rendered MDX, so the sidebar links
 * always match the ids Next actually emits.
 */
export function extractHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of body.split(/\r?\n/)) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].replace(/[*`[\]()]/g, "").trim();
    const id = slugger.slug(text);

    if (level === 2) headings.push({ id, text });
  }

  return headings;
}
