import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Doto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { MobileMenu, MobileMenuProvider } from "@/components/MobileMenu";
import { TerminalHeader } from "@/components/TerminalHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { allCards } from "@/data/cards";
import "./globals.css";
import "./terminal.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", weight: ["400", "500", "700"], variable: "--font-jetbrains" });
const doto = Doto({ subsets: ["latin"], display: "swap", weight: ["500", "700", "900"], variable: "--font-doto" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.finterminal.ca"),
  title: "FinTerminal | Cards, Points & Personal Finance for Canadians",
  description: `The terminal for Canadian money: compare ${allCards.length}+ credit cards, maximize travel points, and track a real portfolio, verified data, no sponsored noise.`,
  openGraph: {
    title: "FinTerminal",
    description: "The terminal for Canadian money: cards, points, personal finance and a live portfolio.",
    type: "website",
    siteName: "FinTerminal",
    locale: "en_CA",
    url: "https://www.finterminal.ca",
    images: [{ url: "/api/og?title=The+terminal+for+Canadian+money&kicker=Cards%2C+points+%26+personal+finance", width: 1200, height: 630, alt: "FinTerminal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinTerminal",
    description: "The terminal for Canadian money: cards, points, personal finance and a live portfolio.",
    images: ["/api/og?title=The+terminal+for+Canadian+money&kicker=Cards%2C+points+%26+personal+finance"],
  },
};

// Match the mobile browser chrome to the active theme (paper background per mode).
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1110" },
    { media: "(prefers-color-scheme: light)", color: "#f2f1eb" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${doto.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MobileMenuProvider>
            <MobileMenu />
            <TerminalHeader />
            {children}
            <SiteFooter />
          </MobileMenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
