import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FinTerminal",
    short_name: "FinTerminal",
    description:
      "The terminal for Canadian money: compare credit cards, maximize travel points, and track a real portfolio with verified, dated data.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1110",
    theme_color: "#0e1110",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
