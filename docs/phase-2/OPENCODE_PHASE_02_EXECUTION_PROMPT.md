# OPENCODE_PHASE_02_EXECUTION_PROMPT.md

## Objective
پیاده‌سازی Prisma Schema کامل (طبق `docs/phase-2/DATA_MODEL.md`) + جایگزینی `packages/contracts/openapi.yaml` با نسخه کامل Phase 2 (طبق `docs/phase-2/OPENAPI_V1_CONTENT.md`) — همچنان بدون Auth واقعی، بدون UI، بدون Payment واقعی. فقط Schema + Contract + تست‌های پایه CRUD با داده ساختگی.

## Context (مطالعه اجباری قبل از شروع)
- `docs/phase-0/PRODUCT_BIBLE.md`, `docs/phase-0/ARCHITECTURE_MAP.md`
- `docs/phase-2/DATA_MODEL.md`
- `docs/phase-2/API_CONTRACTS.md`
- `docs/phase-2/OPENAPI_V1_CONTENT.md`
- `docs/phase-1/CREDENTIAL_AND_SECRETS_MODEL.md`

## Files Allowed to Change/Create
- `apps/backend/prisma/schema.prisma` (جدید)
- `apps/backend/prisma/migrations/**` (خروجی `prisma migrate dev`)
- `apps/backend/src/**` — فقط ماژول‌های جدید مربوط به Entityهای Phase 2 (بدون Auth Guard واقعی هنوز — آن Phase 3 است؛ فعلاً Endpointها Public/Mock هستند اما دقیقاً با همان Path/Shape قرارداد)
- `packages/contracts/openapi.yaml` (جایگزینی کامل با محتوای OPENAPI_V1_CONTENT.md)
- `docs/phase-2/PHASE_02_EXECUTION_EVIDENCE.md` (جدید — طبق الگوی خوب Phase 1)

## Files NOT to Touch
- `docs/phase-0/`, `docs/phase-1/` — Read-only
- `apps/backend/src/health/**` — دست نخورد (فقط اگر AppModule نیاز به Import ماژول‌های جدید داشت، آن فایل مجاز است)

## Execution Mode / Risk
STAGING (فقط Docker محلی) — Risk Class R2. **هیچ Migration روی هیچ محیط Production/Staging واقعی اجرا نشود چون چنین محیطی وجود ندارد.**

## Steps
1. `apps/backend/prisma/schema.prisma` را دقیقاً طبق DATA_MODEL.md بساز (تمام Entityهای بخش ۱ تا ۸).
2. `prisma migrate dev --name phase2_initial_schema` را روی Postgres همان `docker-compose.yml` موجود اجرا کن.
3. برای هر Entity اصلی (Signal, Plan, Subscription, Instrument) یک NestJS Module حداقلی (Controller+Service+DTO) بساز که مسیرهای OPENAPI_V1_CONTENT.md را پیاده کند — **بدون Auth واقعی فعلاً** (فقط یک TODO Comment صریح: `// TODO(Phase 3): enforce userAuth/agentAuth per API_CONTRACTS.md`).
4. مطمئن شو مسیر State Machine سیگنال (`create→validate→preview→confirm→publish/cancel`) در سطح Service Logic هم رعایت می‌شود (مثلاً `confirm` باید خطا بدهد اگر Signal در وضعیت `PREVIEW` نباشد).
5. `packages/contracts/openapi.yaml` را با محتوای کامل OPENAPI_V1_CONTENT.md جایگزین کن؛ Health را حذف نکن.
6. Validate کن که OpenAPI Valid است (با هر Validator موجود در Ecosystem، مثل `@redocly/cli lint` یا معادل).
7. تست‌های واحد پایه برای Service Signal بنویس: مسیر موفق کامل (Draft→...→Published) + حداقل یک مسیر خطا (تلاش برای Confirm از وضعیت غیر PREVIEW باید Reject شود).
8. `docs/phase-2/PHASE_02_EXECUTION_EVIDENCE.md` را دقیقاً به سبک نمونه Phase 1 بساز: نسخه دقیق ابزارها، خروجی دستورات، خروجی تست‌ها، وضعیت Secret، لینک CI.

## Acceptance Criteria
- `pnpm build`, `pnpm lint`, `pnpm test` سبز.
- `prisma migrate dev` بدون خطا روی Postgres محلی.
- OpenAPI Valid (بدون خطای Schema).
- تست واحد State Machine سیگنال Pass می‌شود (هم مسیر موفق هم مسیر خطا).
- هیچ Secret واقعی در هیچ Commit.
- `docs/phase-0/`, `docs/phase-1/` بدون تغییر.

## Evidence Required
مشابه دقیق `docs/phase-1/PHASE_01_EXECUTION_EVIDENCE.md` — نسخه دقیق ابزار (از جمله نسخه Prisma که این‌بار واقعاً نصب می‌شود)، خروجی Migration، خروجی تست‌ها، لینک CI، وضعیت Secret Scanning.

## Git/Commit Expectations
- Branch: `feature/phase-2-data-api`
- Commitهای مجزا: schema+migration، ماژول‌های Backend، OpenAPI جایگزینی، تست‌ها، Evidence.
- Merge فقط از طریق PR، پس از Review Claude.

## Stop Conditions
- اگر بین DATA_MODEL.md و OPENAPI_V1_CONTENT.md هرگونه ناسازگاری کشف شد (مثلاً فیلدی در یکی هست و در دیگری نیست) → STOP و گزارش به Claude قبل از حدس زدن.
- اگر پیاده‌سازی State Machine سیگنال نیاز به اجازه دادن به یک مسیر میانبر (مثلاً Direct Publish بدون Confirm) داشت به هر دلیل فنی → STOP فوری، این هرگز مجاز نیست.
