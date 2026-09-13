# IBO — PHASE 2 ACCEPTANCE CHECKLIST

## Data Model
- [ ] تمام Entityهای بخش ۱ تا ۸ سند DATA_MODEL.md پذیرفته می‌شوند، یا موارد اصلاحی مشخص شود.
- [ ] State Machine سیگنال (`DRAFT→VALIDATED→PREVIEW→CONFIRMED→PUBLISHED/CANCELLED/EXPIRED`) تأیید می‌شود.
- [ ] عدم وجود فیلد اطلاعات پرداخت حساس (کارت/CVV) در Schema تأیید می‌شود.

## API Contract
- [ ] جداسازی Endpoint برای هر مرحله Signal (به‌جای یک PATCH عمومی) پذیرفته می‌شود.
- [ ] تفکیک `userAuth` / `agentAuth` و ممنوعیت `agentAuth` روی `/confirm` تأیید می‌شود.

## اجرا (پس از OpenCode)
- [ ] `prisma migrate dev` موفق روی محیط محلی.
- [ ] CI سبز (Build/Lint/Test).
- [ ] OpenAPI Valid.
- [ ] تست Governance (ممنوعیت Publish بدون Confirm) Pass شده.
- [ ] `docs/phase-0/`, `docs/phase-1/` بدون تغییر.
- [ ] `PHASE_02_EXECUTION_EVIDENCE.md` تولید و بررسی شده.

## نهایی
- [ ] Claude خروجی Repository/PR را بررسی و تأیید کرده.
- [ ] مالک این Phase را تأیید می‌کند.

---
با تأیید کامل، Phase 3 — Backend + Auth — آغاز می‌شود.
