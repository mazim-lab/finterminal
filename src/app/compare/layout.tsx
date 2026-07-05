import type { Metadata } from "next";
import { ogMeta } from "@/lib/og";

// The compare page is a Client Component and cannot export metadata itself,
// so this passthrough layout carries the page metadata for it.
export const metadata: Metadata = {
  title: "Compare credit cards side by side | FinTerminal",
  description: "Put Canadian credit cards head to head: rewards, fees, welcome bonuses, and our own point valuations, side by side.",
  ...ogMeta("Compare credit cards side by side", "Credit cards"),
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
