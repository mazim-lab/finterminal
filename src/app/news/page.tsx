import { NEWS } from "@/data/news";
import { NewsFeed } from "./NewsFeed";
import { ogMeta } from "@/lib/og";

export const metadata = {
  title: "News | FinTerminal",
  description: "Canadian credit-card and points news, in plain language.",
  ...ogMeta("News", "News"),
};

export default function NewsPage() {
  return <NewsFeed items={NEWS} />;
}
