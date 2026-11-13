import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { allCards } from "@/data/cards";
import "./globals.css";
import "./site.css";

// FAEConf type pairing: Inter for words, IBM Plex Mono for numbers and labels.
// Self-hosted by next/font (no layout shift, display swap).
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600"], variable: "--font-plex" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.finterminal.ca"),
  title: "FinTerminal | Cards, Points & Personal Finance for Canadians",
  description: `Canadian credit cards, travel points and personal finance, explained by one dad: compare ${allCards.length}+ cards, find the sweet spots and check the rates, with a date on the numbers.`,
  manifest: "/manifest.webmanifest",
  icons: {
    apple: [{ url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "FinTerminal",
    description: "Canadian cards, points, travel and personal finance, explained plainly and dated.",
    type: "website",
    siteName: "FinTerminal",
    locale: "en_CA",
    url: "https://www.finterminal.ca",
    images: [{ url: "/api/og?title=The+terminal+for+Canadian+money&kicker=Cards%2C+points+%26+personal+finance", width: 1200, height: 630, alt: "FinTerminal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinTerminal",
    description: "Canadian cards, points, travel and personal finance, explained plainly and dated.",
    images: ["/api/og?title=The+terminal+for+Canadian+money&kicker=Cards%2C+points+%26+personal+finance"],
  },
};

// Browser chrome matches the FAEConf page background in each theme.
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0f16" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${plex.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a className="skip" href="#main">Skip to content</a>
          <SiteHeader />
          <div id="main" tabIndex={-1}>{children}</div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
