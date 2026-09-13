# CLINE_PHASE_01_EXECUTION_PROMPT.md

## Objective
ساخت اسکلت اولیه Repository `ibo-platform` طبق REPOSITORY_STRUCTURE.md و TECH_STACK_DECISION.md — بدون هیچ Business Logic، بدون اتصال واقعی به Database، بدون هیچ Secret واقعی.

## Context (فایل‌های مرجع الزامی برای مطالعه قبل از شروع)
- `docs/phase-0/PRODUCT_BIBLE.md`
- `docs/phase-0/ARCHITECTURE_MAP.md`
- `docs/phase-1/TECH_STACK_DECISION.md`
- `docs/phase-1/REPOSITORY_STRUCTURE.md`
- `docs/phase-1/CREDENTIAL_AND_SECRETS_MODEL.md`

## Files to Inspect
Repository در حال حاضر خالی است (یا فقط شامل `docs/phase-0/` و `docs/phase-1/`). چیزی برای Inspect از کد قبلی وجود ندارد — بازسازی از صفر.

## Files Allowed to Change / Create
هر فایلی داخل ساختار تعریف‌شده در REPOSITORY_STRUCTURE.md، از جمله:
- `apps/backend/**` (فقط Bootstrap NestJS + یک Health-check Endpoint)
- `packages/contracts/openapi.yaml` (فقط Health-check)
- `infra/docker-compose.yml`, `infra/ci/**`
- `.github/workflows/**`
- `package.json` ریشه، `.gitignore`, `.env.example`, `README.md`

## Files NOT to Touch
- هرچیزی داخل `docs/phase-0/` — Read-only.
- هیچ فایل `.env` واقعی نباید ساخته یا Commit شود؛ فقط `.env.example`.

## Execution Mode
DRY_RUN برای بررسی اولیه ساختار → سپس STAGING برای ساخت واقعی Branch/Commit (طبق تعریف Phase 0: STAGING یعنی هنوز Production نیست).
Risk Class: R1

## Steps
1. آخرین نسخه LTS/Stable Node.js، NestJS، Prisma، pnpm/Turborepo را از مستندات رسمی همان ابزارها استعلام کن (چون این Prompt نسخه ثابت قید نکرده — طبق تصمیم TECH_STACK_DECISION.md بخش ۷).
2. یک Feature Branch بساز: `feature/phase-1-scaffold`.
3. ساختار پوشه‌ها را دقیقاً طبق REPOSITORY_STRUCTURE.md بساز.
4. `apps/backend` را با NestJS Bootstrap کن؛ فقط یک Endpoint `GET /health` که `{status: "ok", version: <package version>}` برمی‌گرداند.
5. `packages/contracts/openapi.yaml` را با همان یک Endpoint تولید کن (دستی یا از طریق `@nestjs/swagger`).
6. `infra/docker-compose.yml` را با یک سرویس Postgres (بدون Schema واقعی، فقط برای آماده بودن محیط توسعه Phase 2) و یک سرویس backend بساز.
7. یک GitHub Actions Workflow حداقلی بساز: روی هر Push/PR → Install Dependencies → Lint → Build → (اگر تستی هست) Test.
8. `.env.example` را با نام متغیرهای مورد نیاز (بدون مقدار) بساز، طبق CREDENTIAL_AND_SECRETS_MODEL.md.
9. یک `README.md` سطح Repository (انگلیسی) بنویس: چطور نصب/اجرا شود، لینک به `docs/phase-0/` و `docs/phase-1/`.
10. مطمئن شو هیچ Secret Scanning Warning ای در GitHub برای این Branch فعال نشده.

## Exact Acceptance Criteria
- تمام پوشه‌های REPOSITORY_STRUCTURE.md موجودند (حداقل با `.gitkeep`/`README.md` Placeholder).
- `GET /health` روی Backend به‌درستی کار می‌کند (Local/Docker Compose).
- CI روی این Branch سبز است (Build+Lint موفق).
- هیچ Secret واقعی در هیچ Commit این Branch نیست.
- `docs/phase-0/` بدون تغییر باقی مانده.

## Commands/Tests to Run
- `pnpm install` (یا معادل بسته به ابزار انتخابی)
- `pnpm lint`
- `pnpm build`
- `docker compose up -d && curl localhost:<port>/health`

## Evidence Required
- خروجی کامل `tree` از ریشه Repository پس از ساخت.
- خروجی سبز CI (لینک Run).
- خروجی `curl` روی Health-check Endpoint.
- نسخه دقیق Node/NestJS/Prisma/pnpm که واقعاً استفاده شد (طبق مرحله ۱ بالا).

## Rollback
اگر مشکلی پیش آمد: حذف کامل Branch `feature/phase-1-scaffold` — هیچ تغییری روی `main` اعمال نشده، پس ریسک از بین‌رفتن چیزی وجود ندارد.

## Git Branch/Commit Expectations
- Branch: `feature/phase-1-scaffold`
- Commit messages مجزا و معنادار (مثلاً: `chore: bootstrap NestJS backend skeleton`, `chore: add docker-compose for local dev`, `ci: add build+lint workflow`).
- Merge به `main` فقط از طریق Pull Request، پس از بررسی Claude (Repository Review طبق GITHUB_WORKFLOW.md).

## Stop Conditions
- اگر ابزار انتخابی (NestJS/Prisma/...) در نسخه فعلی مغایرت اساسی با فرض‌های TECH_STACK_DECISION.md داشت (مثلاً Breaking Change بزرگ) → STOP و گزارش به Claude برای بازبینی سند تصمیم، قبل از ادامه.
- اگر هرگونه Secret واقعی به‌طور تصادفی نیاز به وارد شدن در کد داشت (نباید پیش بیاید در این Phase) → STOP فوری، این Phase چنین نیازی ندارد.

