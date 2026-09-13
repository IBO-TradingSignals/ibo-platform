# IBO Platform

Subscription-based trading signals platform (Binary Options, Crypto, Forex).
**Backend API is the Single Source of Truth** — clients (Web/PWA, Android, Admin) never re-implement business logic.

## Tech Stack (decided in Phase 1)

| Concern | Choice |
|---|---|
| Runtime | Node.js 24 (LTS) + TypeScript |
| Backend framework | NestJS 12 |
| Database / ORM | PostgreSQL 18 / Prisma 7 (installed in Phase 2) |
| API contract | REST + OpenAPI 3.1 (`packages/contracts`) |
| Monorepo | pnpm workspaces + Turborepo |
| Dev environment | Docker Compose |

## Repository Structure

```
apps/backend/        NestJS API (the only place business logic lives)
apps/admin-web/      Admin Command Center (Phase 6 — placeholder)
apps/user-web/       User Web/PWA (Phase 7 — placeholder)
apps/android/        Android client (Phase 8 — placeholder)
packages/contracts/  OpenAPI spec + generated types (shared by all clients)
packages/design-tokens/  Shared design system (placeholder)
packages/shared-utils/   Non-business shared utilities (placeholder)
services/worker/     Queue worker (Phase 2+ — placeholder)
docs/phase-0/        Frozen baseline documents (never overwritten)
docs/phase-1/        Phase 1 decision documents + execution record
docs/registries/     Agent/Skill/Tool/MCP registries (Phase 16+)
infra/               docker-compose for local development
.github/workflows/   CI (install → lint → build → test)
```

## Getting Started

Requirements: Node.js 24, pnpm 12 (enabled via `packageManager` field / corepack), Docker.

```bash
# 1. Install dependencies
pnpm install

# 2. Lint, build, test
pnpm lint
pnpm build
pnpm test

# 3. Run the backend locally
pnpm --filter @ibo/backend start:dev
# → GET http://localhost:3000/health

# 4. Or run the full local stack (Postgres + backend)
docker compose -f infra/docker-compose.yml up -d
curl http://localhost:3000/health
# → {"status":"ok","version":"0.1.0"}
```

## Environment Variables

Copy `.env.example` to `.env` and fill values locally.
**Never commit real secrets** — see `docs/phase-1/CREDENTIAL_AND_SECRETS_MODEL.md`.

## Governance & Workflow

- All changes go through a feature branch → CI must be green → Pull Request → review before merge to `main`.
- Phase 0 documents in `docs/phase-0/` are frozen (read-only audit trail).
- Human confirmation is mandatory for any signal publication — AI never creates or approves signals.

## Documentation

- Phase 0 baseline: [docs/phase-0/](docs/phase-0/)
- Phase 1 decisions: [docs/phase-1/](docs/phase-1/)
