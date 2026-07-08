import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

// Workers KV-backed incremental cache = true runtime ISR: pages re-fetch
// Airtable on their revalidate interval and the fresh HTML is persisted across
// the fleet. KV is included in the free Workers plan (no subscription needed),
// unlike R2. The KV namespace bound as NEXT_INC_CACHE_KV in wrangler.jsonc is
// auto-provisioned by wrangler on first deploy (no pre-created id required).
//
// upgrade path: enable R2 subscription in dashboard, create bucket
// finterminal-inc-cache, swap this back:
//   import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
//   export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
// and restore the r2_buckets binding in wrangler.jsonc.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
