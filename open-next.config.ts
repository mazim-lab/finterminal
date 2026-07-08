import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// R2-backed incremental cache = true runtime ISR: pages re-fetch Airtable on
// their revalidate interval and the fresh HTML is persisted across the fleet.
// The R2 bucket "finterminal-inc-cache" must exist before the first deploy
// (see wrangler.jsonc NEXT_INC_CACHE_R2_BUCKET binding).
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
