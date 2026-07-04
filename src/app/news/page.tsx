import { NEWS } from "@/data/news";
import { NewsFeed } from "./NewsFeed";

export const metadata = {
  title: "News | FinTerminal",
  description: "Canadian credit-card and points news, in plain language.",
};

export default function NewsPage() {
  return <NewsFeed items={NEWS} />;
}
