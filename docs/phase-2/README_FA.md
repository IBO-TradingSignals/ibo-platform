# IBO — Phase 2 Package (Data Model + API Contracts)

## این پکیج چیست؟
تثبیت Schema کامل پایگاه‌داده و OpenAPI Contract نسخه اول برای IBO — هسته‌ای‌ترین بخش معماری، چون هم Backend، هم AI Studio (از Phase 6/7 به بعد)، هم Android همگی از روی همین Contract ساخته می‌شوند.

## ⚠️ تغییر مهم Toolchain
از این Phase، Coding Worker **OpenCode CLI (با مدل Qwen)** است، نه CLINE. این تغییر پیش‌تر در خود Blueprint پیش‌بینی شده بود («OpenCode و CLINE هر دو Coding Worker هستند»)، پس هیچ اصل معماری‌ای تغییر نکرده — فقط نام Prompt‌ها از این پس `OPENCODE_PHASE_XX_...` است.

## فایل‌ها و ترتیب مطالعه
1. **PHASE_2_PLAN.md** — هدف، وابستگی، PASS/STOP.
2. **DATA_MODEL.md** — تمام Entityها (User, Plan, Subscription, Signal, Payment, Journal, News, CMS, Agent/Task/Event) با فیلد و رابطه دقیق؛ تمرکز ویژه روی State Machine سیگنال که قانون حیاتی «بدون تأیید انسان، بدون انتشار» را در سطح Database اجرا می‌کند.
3. **API_CONTRACTS.md** — قوانین طراحی، جداسازی Endpoint هر مرحله سیگنال، تفکیک Token انسان/Agent.
4. **OPENAPI_V1_CONTENT.md** — محتوای کامل و آماده Copy برای `packages/contracts/openapi.yaml`.
5. **OPENCODE_PHASE_02_EXECUTION_PROMPT.md** — Prompt کامل برای OpenCode CLI.
6. **TEST_PLAN_PHASE_2.md** — شامل یک تست حاکمیتی اضافه (Governance Test) که مانع Publish بدون Confirm می‌شود.
7. **ACCEPTANCE_CHECKLIST.md**
8. **GITHUB_HANDOFF.md**
9. **USER_APP_PROMPT.md / ADMIN_APP_PROMPT.md** — همچنان N/A تا Phase 6/7.

## چه چیزی باید Upload شود؟
هیچ فایل جدید. فقط تصمیمات Schema/Contract را در ACCEPTANCE_CHECKLIST.md تأیید کنید.

## چه Promptی استفاده شود؟
`OPENCODE_PHASE_02_EXECUTION_PROMPT.md` — به OpenCode CLI بدهید.

## چه کاری در Google AI Studio؟
هیچ — همچنان زود است.

## چه چیزی Push شود؟
مستندات `docs/phase-2/` + خروجی OpenCode روی `feature/phase-2-data-api` (PR جدید، بدون Merge تا Review من).

## چه تستی؟
Build/Lint/Test + `prisma migrate dev` + Validation OpenAPI + تست Governance ویژه (طبق TEST_PLAN_PHASE_2.md).

## قدم بعدی
پس از تأیید ACCEPTANCE_CHECKLIST.md و بررسی PR توسط من → Phase 3 (Backend + Auth واقعی).
