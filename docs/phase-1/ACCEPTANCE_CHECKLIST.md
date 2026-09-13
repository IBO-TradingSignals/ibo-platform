# IBO — PHASE 1 ACCEPTANCE CHECKLIST

## تصمیمات فنی
- [ ] Tech Stack پیشنهادی (NestJS + TypeScript + PostgreSQL + Prisma + REST/OpenAPI + Monorepo) تأیید می‌شود، یا جایگزین مشخص شود.
- [ ] نام نهایی Repository (`ibo-platform` یا نام دیگر) تأیید می‌شود.

## مدل Credential
- [ ] مدل «Scoped Credential Vault» (به‌جای Full Gmail/Identity Delegation) پذیرفته شده است.
- [ ] پذیرفته شده که مراحل ذاتاً مرورگری/انسانی (AI Studio Build UI، KYC) همچنان Human Action Required باقی می‌مانند.

## اجرای واقعی (پس از اجرای CLINE)
- [ ] Repository ساخته شده و Branch Protection روی `main` فعال است.
- [ ] Branch `feature/phase-1-scaffold` طبق CLINE_PHASE_01_EXECUTION_PROMPT.md ساخته و Push شده.
- [ ] CI سبز است (Evidence ارائه شده طبق PHASE_1_PLAN.md بخش ۹).
- [ ] هیچ Secret واقعی در Git History پیدا نشده.
- [ ] `docs/phase-0/` بدون تغییر باقی مانده.

## نهایی
- [ ] Claude خروجی Repository را بررسی و تأیید کرده (Repository Review طبق GITHUB_WORKFLOW.md).
- [ ] مالک این Phase را به‌عنوان Baseline v1.0 تأیید می‌کند.

---
با تأیید کامل، Phase 2 — Data Model + API Contracts — آغاز می‌شود.
