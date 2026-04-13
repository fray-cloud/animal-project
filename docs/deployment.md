# Deployment — Vercel (web + api)

This repo is deployed as **two separate Vercel projects** pointing at the same GitHub repo, with distinct `Root Directory` settings. Per the Vercel monorepo guide, this is preferred over a single root `vercel.json`.

## Projects

| Project | Root Directory | Framework | Config file |
|---|---|---|---|
| `animal-project-web` | `apps/web` | Next.js (auto) | none (Next preset) |
| `animal-project-api` | `apps/api` | Other (Node Functions) | `apps/api/vercel.json` |

## Environment variable matrix

| Variable | Project | Required | Scope | Notes |
|---|---|---|---|---|
| `DATA_GO_KR_SERVICE_KEY` | web | ✅ | Production + Preview | Server-only key for the Korean public-data-portal `abandonmentPublicService_v2` API. Read by the Next Route Handler at `apps/web/app/api/data-go-kr/[...path]/route.ts`. **Never** add the `NEXT_PUBLIC_` prefix — that would leak it to the browser bundle. |
| _(none today)_ | api | — | — | The api is a scaffold; no required env vars. `PORT` is read in local dev only and is ignored on Vercel. |

The local-dev counterparts live in `apps/web/.env.local` and `apps/api/.env.local`, both git-ignored. Use the `.env.example` in each app dir as the template.

## First-time setup

### Web project

1. In the Vercel Dashboard, **Add New → Project**, import this repo.
2. Set **Root Directory** = `apps/web`.
3. Framework Preset auto-detects as **Next.js** (Next 16, App Router). Leave build/install commands at defaults.
4. **Environment Variables** → add `DATA_GO_KR_SERVICE_KEY` to *Production* and *Preview*.
5. Deploy. The first build runs `next build`; the resulting routes are visible in the build log:
   ```
   ○ /
   ○ /search
   ○ /like
   ƒ /api/data-go-kr/[...path]
   ```

### API project

1. **Add New → Project**, same repo.
2. Set **Root Directory** = `apps/api`.
3. Framework Preset = **Other**. Build/install commands at defaults — `apps/api/vercel.json` controls the function runtime.
4. No env vars required today. (When you later add e.g. database creds, add them here AND list them in `apps/api/.env.example`.)
5. Deploy. Vercel auto-detects `api/index.ts` as a Node Function and applies the rewrites from `vercel.json` so `/api` and `/api/*` route to the NestJS handler.

After both deploys land, you'll have two distinct Vercel URLs. The web project does NOT proxy to the api project — the web's data-portal proxy goes directly to the public data portal upstream. The api project is independent and currently only exposes `GET /api → {message:"Hello API"}` as the placeholder endpoint.

## Key rotation

`DATA_GO_KR_SERVICE_KEY` previously lived as a literal in `apps/web/src/new-api/service.ts` (removed in #3). The old value remains in git history and **must be considered compromised**. Steps:

1. Log in to https://www.data.go.kr/, regenerate the key on the `abandonmentPublicService_v2` application.
2. Update `apps/web/.env.local` for local dev.
3. Update the Vercel env var on the web project for both Production and Preview scopes.
4. Trigger a redeploy (push to dev or main, or click "Redeploy" in the Vercel Dashboard).

## CI

GitHub Actions (`.github/workflows/ci.yml`) only runs `nx affected -t lint test build`. Vercel handles preview/production deploys via its native Git integration — no GitHub Action wiring needed for deploy itself.

E2E (`web-e2e`, `api-e2e`) is currently excluded from CI; restoring it is tracked separately in #18.
