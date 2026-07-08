# Cloudflare Workers Migration (OpenNext)

**STATUS: Migration completed 2026-07-08.** www.finterminal.ca is live on the
`finterminal` Cloudflare Worker. The apex domain (finterminal.ca) and
frugalcanuck.ca resolve via 308 edge redirects to www.finterminal.ca. Vercel
project deletion is pending after the soak period.

---

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

## 3. Incremental-cache store (static assets, no KV)

`open-next.config.ts` uses the static-assets incremental cache
(`staticAssetsIncrementalCache`), which uses zero runtime resources. There is no
KV or R2 binding: `wrangler.jsonc` has no incremental-cache binding at all.

The site is fully static. Since Airtable was removed, every page reads from the
committed `src/data` modules, so all page data is baked at build time and every
content change is a git push that triggers a full rebuild on Cloudflare Workers
Builds. There is no runtime ISR left: the `revalidate` exports on the prerendered
pages were removed 2026-07-08, so prerendered HTML is served straight from the
deployed static assets and nothing is written at request time.

Why no KV: the previous `kvIncrementalCache` existed for runtime ISR back when
pages re-fetched Airtable on a revalidate interval. With Airtable gone it was
vestigial, and it burned the Workers KV free tier: every deploy's populate-cache
step wrote ~297 entries and each revalidation wrote more, which tripped a
50%-of-daily-limit KV warning. Dropping it removes KV usage entirely.

Upgrade path (only if runtime ISR is ever reintroduced): swap
`open-next.config.ts` back to `kvIncrementalCache` and restore the
`kv_namespaces` binding in `wrangler.jsonc`. The namespace `finterminal-inc-cache`
(id `2f165e19677f4941a9d23f7f14472f44`) still exists under Dashboard -> Storage &
Databases -> KV; the commented binding block in `wrangler.jsonc` carries the id.
Pages that need runtime freshness would also need their `revalidate` export
re-added.

## 4. Set environment variables and secrets

Worker -> Settings -> Variables and Secrets. Add as encrypted secrets.

Only needed when comments are activated (KV-backed comments + moderation);
the site builds and serves without these:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `COMMENTS_ADMIN_TOKEN`

Use the same values currently set in the Vercel project. Local dev reads these
from `.dev.vars` (gitignored), not from the dashboard.

## 5. QA on the workers.dev URL

After the first successful deploy, Cloudflare gives you a
`finterminal.<subdomain>.workers.dev` URL. Before touching DNS, check:

- `/` — home renders, fonts load (next/font is inlined at build time).
- `/deals` loads, and is served as fully static prerendered HTML from the
  build (no runtime revalidation; content refreshes on the next deploy).
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
days is sensible) and watch logs, analytics, and the prerendered pages. Once satisfied,
delete the Vercel project so nothing double-deploys.

## Rollback

Vercel is untouched through step 6, so rollback is DNS-only:

- Revert the affected domains' nameservers in Namecheap back to the previous
  values recorded in step 6. Vercel resumes serving as before.
- The Vercel project and its `main` deployments keep running until you
  explicitly delete them in step 7, so there is nothing to redeploy.
- The `cloudflare` branch changes are inert on Vercel, so leaving them merged
  does not affect a Vercel-served site.
