# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workspace

Nx 22.6 monorepo (`@animal-project/source`). Two runnable apps plus their e2e counterparts under `apps/`:

- `web` — React 18 + Vite (SWC) frontend. Uses MUI Joy, Tailwind/daisyUI, SCSS, React Router v6, TanStack Query, Zustand, react-hook-form.
- `api` — NestJS 10 backend (platform-express, webpack bundler). Currently scaffolded only.
- `web-e2e` — Playwright. `api-e2e` — Jest (excluded from the `@nx/jest` inferred target; see `nx.json`).

Nx targets are **inferred** from plugins in `nx.json` (`@nx/vite`, `@nx/webpack`, `@nx/eslint`, `@nx/jest`, `@nx/playwright`) rather than declared in `project.json` files. Use `npx nx show project <name>` to see what's available for a project.

## Commands

```sh
npx nx serve web           # dev server (Vite)
npx nx build web            # production build
npx nx test web             # jest (via @nx/jest inferred target)
npx nx lint web             # eslint
npx nx serve api            # nest dev (webpack)
npx nx build api
npx nx test api             # jest
npx nx e2e web-e2e          # playwright
npx nx e2e api-e2e          # jest-based api e2e
```

Run a single test: `npx nx test web -- -t "test name"` or `npx nx test api -- -t "test name"` (both jest). Affected-only: `npx nx affected -t test`.

There are **no root `scripts` in `package.json`** — always go through `npx nx`.

## Path aliases

`tsconfig.base.json` defines a single alias: `front/* → apps/web/src/*`. All web imports use this prefix (e.g. `front/new-component/header`, `front/new-api`, `front/route`). When adding files under `apps/web/src`, import them via `front/...` rather than relative paths to stay consistent.

## Web architecture

`apps/web/src` is organized by role rather than feature. Key directories:

- `app/` — root `App` component. Wraps the router in a `QueryClientProvider` + `Layout` (Header + main + Bottom). `QueryClient` is instantiated inside `App` — don't move it without considering reload semantics.
- `route/` — React Router config (`SiteRouter`), single entry re-exported from `route/index.ts`.
- `new-api/` — data-access layer. All API calls go through `new-api/service.ts`, which exports an Axios instance pointed at the Korean public data portal `abandonmentPublicSrvc` endpoint and a generic `getAPI<T, K>(props, path)` helper that auto-injects `serviceKey` and `_type: 'json'`. Per-resource folders (`animalInfo`, `kind`, `shelter`, `sido`, `sigungu`) wrap this helper. **New API calls should go through `getAPI` rather than creating new axios instances.**
- `new-types/` — shared response types, notably `APIResponse<K>` used by `getAPI`.
- `new-component/` — shared UI (Header, Bottom, etc.).
- `new-site/` — page-level components mounted by the router.
- `hooks/` — shared React hooks.

The app targets the Korean public animal-shelter API; responses follow the `APIResponse<K>` envelope, so typed callers pass the item type as the second generic to `getAPI`.

## Styling

Tailwind + daisyUI + SCSS coexist. Nx react generator defaults (see `nx.json`) use `style: "scss"`, so new components should follow suit. Global styles live in `apps/web/src/styles.scss`.

## Deployment

`vercel.json` exists at the root and the repo depends on `@vercel/remote-nx`; `web` is the deployed target. `.circleci/` and `.github/workflows/ci.yml` are tracked as Nx `sharedGlobals` inputs — changes to either invalidate the Nx cache for every project.

## Agents

This repo ships two specialized subagents. Invoke them via the Agent tool when the task matches.

- **tdd-practitioner** — Red-Green-Refactor driven implementation and bug fixes. Use for any new behavior or regression fix where a failing test should come first.
- **upgrade-issue-tracker** — GitHub issue management for the modernization roadmap below. Use when planning, tracking, or reporting on roadmap work. State lives in GitHub Issues in `fray-cloud/animal-project`, accessed via `gh` CLI only.

@.claude/agents/tdd-practitioner.md
@.claude/agents/upgrade-issue-tracker.md

## Upgrade roadmap (in progress)

The repository is being modernized. Treat the current state described above as the *starting point* and move toward the target state below. Do not partially migrate — land each bullet as a coherent change.

### 1. Frontend: Vite → Next.js (latest)
- Replace the `@nx/vite`-based `web` app with a Next.js app (App Router, latest stable). Use `@nx/next` as the Nx plugin and remove `@nx/vite` / `@vitejs/*` / `vite` / `vitest` when nothing references them.
- Port `apps/web/src/{app,route,new-site,new-component,new-api,new-types,hooks}` into the Next.js `app/` directory. React Router v6 (`SiteRouter`) disappears — routes become file-system routes under `app/`.
- Preserve the `front/*` path alias (update `tsconfig.base.json` `paths` to point at the new source root) so existing imports keep working during the migration.
- `QueryClientProvider` + `ReactQueryDevtools` move into a `"use client"` provider mounted from the root `layout.tsx`. Data fetching that can run on the server should migrate to React Server Components + `fetch`; keep `getAPI` for client-side TanStack Query usage.
- Prefer Next's built-in CSS / CSS-modules; see styling item for Tailwind + shadcn.

### 2. Backend: NestJS latest
- Upgrade `@nestjs/*` from 10 to the latest major. **Before** editing, query **context7** for the migration guide for each major version jump; if context7 has no entry, fall back to a web search of the official NestJS migration doc and read it fully before making changes.
- Re-verify compatibility with the Node version pinned by Nx and with `@nx/nest` after the Nx upgrade.
- Keep `apps/api` on webpack via `@nx/webpack` unless the Nest upgrade guide recommends otherwise.

### 3. Styling: Tailwind + daisyUI → Tailwind + shadcn/ui
- Remove `daisyui` from dependencies and from the Tailwind config. Initialize `shadcn/ui` (latest, compatible with Next.js App Router).
- Replace daisyUI class usage across `new-component/` and `new-site/` with shadcn components. Do not leave mixed daisyUI + shadcn usage.
- Audit `@mui/joy` and `@mui/x-date-pickers` usage — prefer shadcn equivalents where they exist, keep MUI only where shadcn has no replacement.

### 4. Nx upgrade
- Bump Nx from 19.6 to the latest. Always run `npx nx migrate latest` → commit `migrations.json` → `npx nx migrate --run-migrations` so generated migrations are applied cleanly. Review each migration; do not squash them.
- Re-check `nx.json` plugin entries afterward — plugin option shapes occasionally change across majors. Preserve the inferred-target model (no `project.json` targets).
- Smoke test with `npx nx affected -t lint test build e2e`.

### 5. Shared libraries (`libs/`)
- Identify code duplicated between `apps/web` and `apps/api` — especially types under `apps/web/src/new-types` and any request/response shapes the API will start serving. Extract them into Nx libs generated with `npx nx g @nx/js:lib <name> --directory=libs/<name> --bundler=tsc`.
- Suggested initial libs: `libs/shared-types` (DTOs, `APIResponse<K>` envelope, per-resource item types) and `libs/shared-utils` (dayjs helpers, formatters). Expose as `@animal-project/shared-types`, `@animal-project/shared-utils` via `tsconfig.base.json` paths.
- Both `web` (Next.js) and `api` (Nest) must consume these libs through the Nx buildable tsc path so `nx build web` and `nx build api` pick up lib changes via the task graph. Verify by adding a type in the lib and confirming both apps fail typecheck until imports are updated.

### 6. Deployment: web + api on Vercel
- Keep `web` on Vercel using the Next.js preset (no custom build command once migrated).
- Deploy `api` to Vercel as well using Vercel Functions / Node runtime. NestJS needs an adapter entrypoint (`main.ts` exporting a handler wrapping the Nest app with `@vendia/serverless-express` or Nest's serverless-express integration). Prefer a second Vercel project over stuffing both apps into one `vercel.json`.
- Document required env vars. The public-data portal `serviceKey` currently hardcoded in `apps/web/src/new-api/service.ts:5` **must** move into an env var before any deploy, and should be rotated since it has been committed to git history.
- CI (`.circleci/config.yml`, `.github/workflows/ci.yml`) should run `npx nx affected` for `lint`, `test`, `build`, `e2e` across both apps and shared libs.

### Migration etiquette
- For every upgrade step with potential breaking changes (Nest, Nx, Next, shadcn init, Tailwind majors), first consult **context7**; if the library is not indexed there, fall back to a targeted web search of the official migration guide and read it before touching code. Do not guess at API changes.
- Suggested landing order, each step leaving the repo green on `nx affected -t lint test build`: Nx upgrade → shared libs → Nest upgrade → Vite→Next.js → daisyUI→shadcn → Vercel api deploy.
