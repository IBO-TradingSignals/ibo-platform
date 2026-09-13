# PHASE 2 — Data Model + API Contracts

Status: OPEN — در انتظار تأیید مالک
Risk Class: R2 (Moderate Controlled — تعریف Schema و Contract؛ هنوز بدون داده واقعی کاربر، بدون Payment واقعی)
Execution Mode: STAGING

## 0) تغییر Toolchain (ثبت رسمی)
از این Phase به بعد، Coding/Engineering Worker به‌جای CLINE، **OpenCode CLI (opencode-ai) با مدل Qwen** است. این تغییر با اصل خود Blueprint («OpenCode و CLINE هر دو Coding/Review Worker هستند، نه Business Core») کاملاً سازگار است — یعنی فقط جایگزینی درون همان نقش، بدون نیاز به بازنویسی هیچ تصمیم معماری. تمام Promptهای اجرایی از این پس با پیشوند `OPENCODE_PHASE_XX_EXECUTION_PROMPT.md` نام‌گذاری می‌شوند. مدل Provider/Model Adapter (طبق AGENT_GOVERNANCE، بخش ۱۳) بدون تغییر باقی می‌ماند — یعنی نام مدل (Qwen) هرگز در Business Logic Hard-code نمی‌شود.

## 1) Objective
تثبیت Schema دقیق پایگاه‌داده (تمام Entityهای فهرست‌شده در Phase 0) و OpenAPI Contract کامل نسخه اول — همچنان بدون UI واقعی، بدون داده کاربر واقعی، بدون اتصال Payment واقعی.

## 2) Dependencies
- Phase 1 PASS شده (Repository + Skeleton + CI سبز).
- هیچ وابستگی به Phase 6/7/8 (AI Studio) ندارد.

## 3) Exact Input Files
هیچ فایل جدیدی از مالک لازم نیست. فقط تأیید Schema/Contract در ACCEPTANCE_CHECKLIST.md.

## 4) User App / Admin App Prompt
همچنان N/A — طبق GOOGLE_AI_STUDIO_STRATEGY.md، اولین Prompt واقعی AI Studio در Phase 6/7 است، دقیقاً پس از تکمیل همین Phase.

## 5) Expected Deliverables (این پکیج)
- PHASE_2_PLAN.md (همین فایل)
- DATA_MODEL.md — Schema کامل با فیلد/نوع/رابطه هر Entity + Prisma Schema پیش‌نویس
- API_CONTRACTS.md — راهنمای گروه‌بندی Endpointها + قوانین طراحی API
- packages/contracts/openapi.yaml (نسخه کامل — جایگزین نسخه Health-only فعلی) — به‌صورت محتوای آماده در همین پکیج
- OPENCODE_PHASE_02_EXECUTION_PROMPT.md
- TEST_PLAN_PHASE_2.md
- ACCEPTANCE_CHECKLIST.md
- GITHUB_HANDOFF.md
- README_FA.md
- USER_APP_PROMPT.md / ADMIN_APP_PROMPT.md (همچنان N/A)

## 6) Files That Must Not Be Touched
- `docs/phase-0/` و `docs/phase-1/` — Read-only.
- `apps/backend/src/health/**` — نباید در این Phase تغییر ماهوی کند (فقط اگر برای هماهنگی با Module ساختار جدید نیاز به Import مجدد بود، مجاز).

## 7) GitHub Action for Owner
1. Branch جدید: `feature/phase-2-data-api`.
2. `OPENCODE_PHASE_02_EXECUTION_PROMPT.md` را به OpenCode CLI بدهید.
3. Migration واقعی Prisma فقط روی Database توسعه محلی (Docker) اجرا شود؛ هیچ Migration روی محیط Staging/Production واقعی در این Phase وجود ندارد (چون چنین محیطی هنوز ساخته نشده).
4. PR جدید باز شود؛ Merge نشود تا من Review کنم.

## 8) Screenshots/Evidence Required
- خروجی `prisma migrate dev` (موفق، بدون خطا) روی Postgres محلی.
- خروجی Validation موفق OpenAPI (مثلاً با Spectral یا ابزار مشابه).
- خروجی CI سبز.
- فایل Evidence مشابه Phase 1 (`PHASE_02_EXECUTION_EVIDENCE.md`) — الگوی خوبی بود، تکرار شود.

## 9) Tests
سطح ۱ (Build/Syntax)، ۴ (API/Data — اعتبارسنجی OpenAPI + تست CRUD پایه روی هر Entity با داده ساختگی)، ۸ (Security — بررسی نبود Secret، بررسی اینکه هیچ Endpoint حساس بدون Auth Guard نیست حتی اگر Auth واقعی Phase 3 باشد)، ۱۰ (Regression در برابر Phase 0/1) فعال هستند. UI/Localization/Performance همچنان N/A.

## 10) PASS Criteria
- Schema تمام Entityهای Phase 0 را پوشش می‌دهد، بدون Business Logic اجرایی واقعی (فقط تعریف Schema/Migration).
- OpenAPI Contract Valid است و منعکس‌کننده همان Schema است.
- هیچ Endpoint ای امکان انتشار مستقیم Signal بدون مرحله Human Confirm را در Contract باز نمی‌گذارد (بررسی می‌شود که مسیر State Machine سیگنال دقیقاً زنجیره Phase 0 را منعکس کند).
- CI سبز، بدون Secret.

## 11) STOP Criteria
- اگر مالک متوجه شود Entity ای در Data Domain Phase 0 فراموش شده → توقف، افزودن Entity، بازنویسی Migration قبل از ادامه.
- اگر OpenAPI مسیری برای Publish مستقیم Signal (بدون Confirm) اجازه دهد → STOP فوری (نقض قانون حیاتی Blueprint).

## 12) Rollback
حذف Branch `feature/phase-2-data-api` بدون تأثیر روی `main` (که اکنون شامل Phase 1 Merge‌شده است).

## 13) Next Action
پس از PASS: → Phase 3 — Backend + Auth (پیاده‌سازی واقعی Authentication/Authorization روی همین Schema، همچنان بدون UI).
