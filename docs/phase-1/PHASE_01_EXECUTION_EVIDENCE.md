# IBO Platform — Phase 1 Execution Evidence

Execution record for `CLINE_PHASE_01_EXECUTION_PROMPT.md` (Phase 1 repository scaffold).
This document satisfies the prompt's **Evidence Required** section and
`TECH_STACK_DECISION.md` §7 (record the exact tool versions actually used at run time).

- Date: 2026-09-13
- Branch: `feature/phase-1-scaffold`
- Pull request: #1 (`feature/phase-1-scaffold` → `main`) — open, pending review
- Risk class: R1 (DRY_RUN → STAGING; no production, no merge to `main` without review)

## 1. Exact tool versions used (queried + lockfile-verified)

| Tool | Version actually used | How verified |
|---|---|---|
| Node.js | `24.20.0` (Active LTS line 24; `.nvmrc` = `24`, `engines.node` = `>=24`) | `node -v` at run time |
| pnpm | `12.4.1` (pinned via `packageManager`) | `pnpm -v`; matches `package.json#packageManager` |
| Turborepo | `2.10.12` | resolved in `pnpm-lock.yaml` |
| NestJS | `12.0.1` (`@nestjs/core`, `@nestjs/common`); CLI `12.0.0` | installed package versions |
| TypeScript | `5.9.3` | resolved in `pnpm-lock.yaml` |
| ESLint | `10.10.0` (+ `typescript-eslint` 8.x flat config) | resolved in `pnpm-lock.yaml` |
| Vitest | `5.0.0` | resolved in `pnpm-lock.yaml` |
| Prettier | `3.9.6` | resolved in `pnpm-lock.yaml` |
| PostgreSQL | `18` (dev container image `postgres:18-alpine`) | docker compose run (see §4) |
| Prisma | not installed (deferred to Phase 2 — no DB/schema in Phase 1) | 0 refs in lockfile |

## 2. Acceptance criteria verification

| Criterion | Status | Evidence |
|---|---|---|
| All `REPOSITORY_STRUCTURE.md` folders exist | PASS | tree in §5 (placeholders via `.gitkeep`/`README.md`) |
| `GET /health` returns `{status, version}` | PASS | curl output in §3 |
| Works locally **and** on Docker Compose | PASS | node boot + docker compose in §3–§4 |
| CI green (Install → Lint → Build → Test) | PASS | Actions runs in §4 |
| No real secret in any commit | PASS | secret-scanning alerts = 0; only dev-only placeholders |
| `docs/phase-0/` unchanged | PASS | content byte-identical; only relocated under `docs/phase-0/` |

## 3. Commands run and results

```bash
corepack pnpm install --frozen-lockfile   # OK — lockfile up to date, no drift
corepack pnpm lint                        # 0 errors, 0 warnings (2/2 tasks successful)
corepack pnpm build                       # 2/2 tasks successful (nest build → dist/main.js)
corepack pnpm test                        # 2/2 tests passed (health.controller.spec.ts)
```

Health endpoint (built app run directly via Node):

```bash
$ PORT=3111 IBO_BACKEND_VERSION=0.1.0 node apps/backend/dist/main.js &
$ curl -i http://localhost:3111/health
HTTP/1.1 200 OK
{"status":"ok","version":"0.1.0"}

$ curl -i http://localhost:3111/nope     # unmapped route
HTTP/1.1 404 Not Found
```

`version` resolves as `IBO_BACKEND_VERSION` (set in docker-compose) → falls back to
`npm_package_version` when started through pnpm → final fallback `0.0.0`.

## 4. CI + Docker Compose evidence

GitHub Actions (workflow `CI`, job `build-lint-test`), both runs on scaffold HEAD `35b8ad8`:

- Run #2 — success — <https://github.com/IBO-TradingSignals/ibo-platform/actions/runs/34740928018>
- Run #1 — success — <https://github.com/IBO-TradingSignals/ibo-platform/actions/runs/34740921670>

Docker Compose (`docker compose -f infra/docker-compose.yml up -d --build`):

```
Container ibo-postgres   (postgres:18-alpine)   Up (healthy)   5432->5432
Container ibo-backend    (infra-backend)         Up            3000->3000
$ curl -s http://localhost:3000/health
{"status":"ok","version":"0.1.0"}
```

## 5. Repository tree (tracked files)

```
ibo-platform/
├── .github/
│   └── workflows/
│       └── ci.yml
├── apps/
│   ├── admin-web/
│   │   ├── .gitkeep
│   │   └── README.md
│   ├── android/
│   │   ├── .gitkeep
│   │   └── README.md
│   ├── backend/
│   │   ├── src/
│   │   │   ├── health/
│   │   │   │   ├── health-response.interface.ts
│   │   │   │   ├── health.controller.spec.ts
│   │   │   │   ├── health.controller.ts
│   │   │   │   ├── health.module.ts
│   │   │   │   └── health.service.ts
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── .dockerignore
│   │   ├── Dockerfile
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   └── user-web/
│       ├── .gitkeep
│       └── README.md
├── docs/
│   ├── phase-0/
│   │   ├── ARCHITECTURE_MAP.md
│   │   └── PRODUCT_BIBLE.md
│   ├── phase-1/
│   │   ├── CLINE_PHASE_01_EXECUTION_PROMPT.md
│   │   ├── CREDENTIAL_AND_SECRETS_MODEL.md
│   │   ├── REPOSITORY_STRUCTURE.md
│   │   └── TECH_STACK_DECISION.md
│   └── registries/
│       ├── .gitkeep
│       └── README.md
├── infra/
│   ├── ci/
│   │   ├── .gitkeep
│   │   └── README.md
│   └── docker-compose.yml
├── packages/
│   ├── contracts/
│   │   ├── openapi.yaml
│   │   ├── package.json
│   │   └── README.md
│   ├── design-tokens/
│   │   ├── .gitkeep
│   │   └── README.md
│   └── shared-utils/
│       ├── .gitkeep
│       └── README.md
├── services/
│   └── worker/
│       ├── .gitkeep
│       └── README.md
├── .env.example
├── .gitignore
├── .nvmrc
├── eslint.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── turbo.json

## 6. Secrets posture

- `.env` is git-ignored; only `.env.example` (variable names, no values) is committed.
- `docker-compose.yml` uses **dev-only placeholder** credentials (`ibo` / `ibo_dev_only_password`)
  for a local, throwaway database — no production/real secret, per
  `CREDENTIAL_AND_SECRETS_MODEL.md`.
- GitHub secret-scanning: **0 alerts** on this branch.

## 7. Notes / traceability

- `TECH_STACK_DECISION.md` intentionally omits pinned versions; the values in §1 are the
  latest stable/LTS resolved at execution time and recorded here as required.
- Merge to `main` only via PR #1 after review (see `GITHUB_WORKFLOW`/governance in README).
- Rollback: delete `feature/phase-1-scaffold`; `main` untouched.
