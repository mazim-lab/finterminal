import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Cloudflare dev integration. initOpenNextCloudflareForDev() makes Cloudflare
// bindings (R2/KV/etc.) available during `next dev` via getCloudflareContext().
//
// This MUST stay inert on Vercel: main deploys to Vercel until cutover. We
// therefore only pull the OpenNext adapter into the module graph when running
// the local dev server (NODE_ENV === "development"). A production `next build`
// on Vercel never evaluates this import, so the adapter cannot affect it. The
// dynamic import also keeps `next build` from resolving the adapter at all.
if (process.env.NODE_ENV === "development") {
  void import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev();
  });
}
