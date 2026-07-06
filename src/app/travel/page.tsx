import { SWEET_SPOTS } from "@/data/sweet-spots";
import { TRAVEL_GUIDES } from "@/data/travel-guides";
import { LoadMoreCards } from "@/components/LoadMoreCards";
import { ogMeta } from "@/lib/og";

export const metadata = {
  title: "Travel & Points | FinTerminal",
  description: "Guides for turning Canadian credit card points into real trips, with a focus on Aeroplan and Amex Membership Rewards.",
  ...ogMeta("Travel & Points", "Travel & points"),
};

const ARTICLES = TRAVEL_GUIDES;

export default function TravelPage() {
  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <div className="head"><h1>Travel &amp; Points</h1></div>

          <div className="cd-sec">Guides</div>
          <LoadMoreCards
            cards={[
              ...ARTICLES.map((a) => ({
                href: `/travel/${a.slug}`,
                title: a.title,
                dek: a.dek,
                tag: a.tag,
                meta: [a.read, a.date],
              })),
              ...SWEET_SPOTS.map((s) => ({
                href: `/travel/sweet-spots/${s.slug}`,
                title: s.title,
                dek: s.dek,
                tag: "Sweet spot",
                meta: [s.program, s.read, s.date],
              })),
            ]}
            pageSize={10}
          />

          <p className="lede" style={{ marginTop: 20 }}>
            New worked examples land here a couple of times a week, walking through a real redemption on a
            different program each time.
          </p>
        </div>
      </main>
    </div>
  );
}
