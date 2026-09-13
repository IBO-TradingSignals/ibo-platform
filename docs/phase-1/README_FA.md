# IBO — Phase 1 Package (Repository + Architecture Foundation)

## این پکیج چیست؟
خروجی کامل **Phase 1**: تصمیمات فنی نهایی (Tech Stack، ساختار Repository، مدل Credential) + دستور اجرایی برای CLINE جهت ساخت اسکلت خالی Repository. هنوز هیچ Business Logic واقعی وجود ندارد.

## فایل‌ها و ترتیب مطالعه
1. **PHASE_1_PLAN.md** — هدف، وابستگی، PASS/STOP، Rollback.
2. **TECH_STACK_DECISION.md** — پیشنهاد نهایی: NestJS+TypeScript، PostgreSQL، Prisma، REST/OpenAPI، Monorepo — همراه دلیل هرکدام طبق چارچوب تصمیم Phase 0.
3. **REPOSITORY_STRUCTURE.md** — ساختار دقیق پوشه‌ها.
4. **CREDENTIAL_AND_SECRETS_MODEL.md** — پاسخ رسمی به درخواست خودکارسازی ورود/خروج ابزارها: مدل «Scoped Credential Vault» به‌جای دسترسی کامل/دائمی به Gmail، همراه دلیل امنیتی و نقشه Credential هر ابزار.
5. **CLINE_PHASE_01_EXECUTION_PROMPT.md** — Prompt کامل و آماده برای دادن به CLINE.
6. **TEST_PLAN_PHASE_1.md** — کدام سطح از ۱۰ تست استاندارد در این Phase فعال است.
7. **ACCEPTANCE_CHECKLIST.md** — چک‌لیست تأیید مالک.
8. **GITHUB_HANDOFF.md** — اقدامات دقیق شما در GitHub.
9. **USER_APP_PROMPT.md / ADMIN_APP_PROMPT.md** — همچنان N/A (تا Phase 6/7).

## چه چیزی باید Upload شود؟
هیچ فایل جدیدی. فقط تصمیمات (بخش «تصمیمات فنی» در ACCEPTANCE_CHECKLIST.md) را تأیید کنید.

## چه Promptی استفاده شود؟
`CLINE_PHASE_01_EXECUTION_PROMPT.md` — مستقیماً به CLINE در Terminal بدهید.

## چه کاری در Google AI Studio انجام شود؟
هیچ‌کاری — این Phase وارد AI Studio نمی‌شود.

## چه چیزی Push شود؟
مستندات این پکیج (`docs/phase-1/`) + خروجی CLINE روی Branch `feature/phase-1-scaffold` (طبق GITHUB_HANDOFF.md).

## چه Screenshotی لازم است؟
Branch Protection Settings + خروجی سبز CI + `curl` روی `/health`.

## چه تستی انجام شود؟
فقط Build/Lint + بررسی نبود Secret (طبق TEST_PLAN_PHASE_1.md).

## قدم بعدی
پس از تکمیل ACCEPTANCE_CHECKLIST.md و بررسی Repository توسط Claude → Phase 2 (Data Model + API Contracts).
