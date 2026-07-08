# Cloudflare Workers Migration (OpenNext)

Owner checklist to move FinTerminal from Vercel to Cloudflare Workers using
[@opennextjs/cloudflare](https://opennext.js.org/cloudflare). Everything in the
repo is already wired and is inert on Vercel, so `main` keeps deploying to
Vercel until you finish step 7. Work top to bottom.

## 0. Prerequisites (already in the repo)

The `cloudflare` branch adds `wrangler.jsonc`, `open-next.config.ts`, the
`initOpenNextCloudflareForDev()` dev hook (guarded so it never runs on Vercel),
and the `cf:build` / `cf:preview` / `cf:deploy` / `cf-typegen` scripts. Merge
`cloudflare` into `main` only at cutover, or point Workers Builds at the
`cloudflare` branch first to validate, then switch its production branch to
`main` after the merge.

## 1. Create a Cloudflare account

Sign up at https://dash.cloudflare.com/sign-up if you do not have one. No plan
upgrade is needed; the Workers free tier covers this site.

## 2. Create the Worker via Workers Builds (git integration)

1. Dashboard -> Compute (Workers) -> Workers & Pages -> Create -> Workers.
2. Choose "Import a repository" / connect git, authorize the Cloudflare GitHub
   app, and select `mazim-lab/finterminal`.
3. Configure the build:
   - Production branch: `main`
   - Build command: `npx opennextjs-cloudflare build`
   - Deploy command: `npx wrangler deploy`

   Workers Builds runs a two-step flow: the build command compiles the Next.js
   app and transforms the output into the Worker bundle under `.open-next/`, then
   the deploy command ships it. `npx wrangler deploy` is Cloudflare's documented
   default deploy command; the build command is the OpenNext-recommended way to
   produce the bundle. The builds run on Cloudflare's Linux runners, which is
   required: Windows-produced bundles fail at runtime (path-separator issue found
   during the spike).

The Worker name is `finterminal` (set in `wrangler.jsonc`); keep the dashboard
name matching so the `WORKER_SELF_REFERENCE` service binding resolves.

## 3. Incremental-cache store (Workers KV)

`open-next.config.ts` uses the Workers KV incremental cache for runtime ISR, and
`wrangler.jsonc` binds it as `NEXT_INC_CACHE_KV`. KV is included in the free
Workers plan and needs no subscription or payment method. Nothing to create by
hand: the `kv_namespaces` binding has no `id`, so wrangler auto-provisions the
namespace on the first deploy (its `--experimental-provision` behaviour is on by
default). Confirm afterward under Dashboard -> Storage & Databases -> KV that a
namespace bound as `NEXT_INC_CACHE_KV` now exists.

Upgrade path (optional, R2-backed cache): R2 is strongly consistent and is the
adapter's recommended store, but enabling it is subscription-gated and requires
a payment method on file (free-tier allowance is 10 GB storage, 1M Class A +
10M Class B operations per month, which this cache will not approach). To switch
later: Dashboard -> R2 -> enable R2 and create a bucket named exactly
`finterminal-inc-cache`, then in `open-next.config.ts` swap `kvIncrementalCache`
back to `r2IncrementalCache` and in `wrangler.jsonc` replace the `kv_namespaces`
binding with the `r2_buckets` binding (both commented alternatives are left in
those files).

## 4. Set environment variables and secrets

Worker -> Settings -> Variables and Secrets. Add as encrypted secrets:

Needed from day one (Airtable-backed content):
- `AIRTABLE_TOKEN`
- `AIRTABLE_BASE_ID`

Add only when comments go live (KV-backed comments + moderation):
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `COMMENTS_ADMIN_TOKEN`

Use the same values currently set in the Vercel project. Local dev reads these
from `.dev.vars` (gitignored), not from the dashboard.

## 5. QA on the workers.dev URL

After the first successful deploy, Cloudflare gives you a
`finterminal.<subdomain>.workers.dev` URL. Before touching DNS, check:

- `/` — home renders, fonts load (next/font is inlined at build time).
- `/deals` — loads, and is served as ISR. Reload after the revalidate window
  and confirm content refreshes (validates the KV incremental cache is writing
  back, not just serving build-time HTML).
- `/personal-finance`, `/guides`, `/travel`, `/news` — index pages render.
- A specific article under each (e.g. `/news/<slug>`) — dynamic route renders.
- `/api/og?title=Test` — returns an actual rendered PNG image (not an error),
  confirming the OG image route works on the Workers runtime.
- If comments are enabled: POST to `/api/comments` and confirm rate-limit
  bucketing works (the route now trusts `cf-connecting-ip` first on Cloudflare).

Fix any 500s here before adding real domains. Check the Worker's logs in the
dashboard for runtime errors.

## 6. Add custom domains and move DNS

1. Add the domains as Cloudflare zones: Dashboard -> add site for `finterminal.ca`
   and `frugalcanuck.ca`. Cloudflare gives you two assigned nameservers per zone.
2. In Namecheap, change each domain's nameservers from Namecheap's defaults to
   the Cloudflare-assigned nameservers. Record the previous Namecheap nameserver
   values first (needed for rollback).
3. Once the zones are active, bind the routes to the Worker: Worker -> Settings
   -> Domains & Routes -> Add custom domain, for:
   - `finterminal.ca`
   - `www.finterminal.ca`
   - `frugalcanuck.ca`

Cloudflare provisions TLS automatically. DNS propagation can take up to a few
hours.

## 7. Soak, then decommission Vercel

Let the Cloudflare deployment run on the live domains for a soak period (a few
days is sensible) and watch logs, analytics, and the ISR pages. Once satisfied,
delete the Vercel project so nothing double-deploys.

## Rollback

Vercel is untouched through step 6, so rollback is DNS-only:

- Revert the affected domains' nameservers in Namecheap back to the previous
  values recorded in step 6. Vercel resumes serving as before.
- The Vercel project and its `main` deployments keep running until you
  explicitly delete them in step 7, so there is nothing to redeploy.
- The `cloudflare` branch changes are inert on Vercel, so leaving them merged
  does not affect a Vercel-served site.
