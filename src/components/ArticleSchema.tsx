/**
 * Article structured data (JSON-LD) for editorial pages. Renders an invisible
 * <script> declaring the page as an Article, with the branded OG image, org
 * author/publisher, and canonical mainEntityOfPage. datePublished is optional
 * (standalone pages have no structured date; omit rather than guess).
 *
 *   <ArticleSchema headline="RRSP vs TFSA: the honest decision for Canadians"
 *                  path="/personal-finance/rrsp-vs-tfsa-canada" kicker="Personal finance" />
 */
const BASE = "https://www.finterminal.ca";

export function ArticleSchema({
  headline,
  path,
  kicker = "FinTerminal",
  datePublished,
}: {
  headline: string;
  path: string;
  kicker?: string;
  datePublished?: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    image: `${BASE}/api/og?title=${encodeURIComponent(headline)}&kicker=${encodeURIComponent(kicker)}`,
    ...(datePublished ? { datePublished, dateModified: datePublished } : {}),
    author: { "@type": "Organization", name: "FinTerminal", url: BASE },
    publisher: { "@type": "Organization", name: "FinTerminal", url: BASE },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}${path}` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
