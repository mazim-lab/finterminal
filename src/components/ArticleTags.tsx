import Link from "next/link";
import { resolveTagSlugsForPath, tagBySlug } from "@/data/tags";

// Server component. Renders a row of clickable topic chips for an article,
// resolving tag slugs from the registry (with a path-based fallback).
export function ArticleTags({ path }: { path: string }) {
  const tags = resolveTagSlugsForPath(path)
    .map((slug) => tagBySlug(slug))
    .filter((t): t is NonNullable<ReturnType<typeof tagBySlug>> => t !== undefined);

  if (tags.length === 0) return null;

  return (
    <div className="chips doc-tags" aria-label="Topics">
      {tags.map((t) => (
        <Link key={t.slug} href={`/tags/${t.slug}`} className="chip">
          {t.label}
        </Link>
      ))}
    </div>
  );
}
