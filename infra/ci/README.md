# infra/ci

Definition of the CI pipeline for IBO Platform.

The executable workflow lives at `.github/workflows/ci.yml` and runs on every push and pull request:

1. **Install** — `pnpm install --frozen-lockfile` (pnpm 12.4.1, Node.js 24 LTS)
2. **Lint** — `pnpm lint` (Turborepo task across all workspaces)
3. **Build** — `pnpm build` (Turborepo task across all workspaces)
4. **Test** — `pnpm test` (unit tests; expanded in later phases)

Phase 1 scope only. Deployment/staging pipelines are added in later phases.
