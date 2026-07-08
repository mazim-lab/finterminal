import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Static-assets incremental cache = zero runtime resources. All content is
// build-time static since Airtable was removed: every page reads from the
// committed src/data modules and each content change is a git push that
// triggers a full rebuild on Cloudflare Workers Builds. There is no runtime
// ISR left to persist, so prerendered HTML is served straight from the deployed
// static assets and nothing is written at request time.
//
// Runtime revalidation (and the KV-backed incremental cache) was removed
// 2026-07-08 to stay within the Workers KV free tier: the old kvIncrementalCache
// populated ~297 entries per deploy and wrote more on every revalidation, which
// tripped a 50%-of-daily-limit KV warning.
//
// upgrade path: if runtime ISR is ever reintroduced, swap this back to the
// KV-backed cache (the namespace finterminal-inc-cache, id
// 2f165e19677f4941a9d23f7f14472f44, still exists):
//   import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
//   export default defineCloudflareConfig({ incrementalCache: kvIncrementalCache });
// and restore the kv_namespaces binding in wrangler.jsonc.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
