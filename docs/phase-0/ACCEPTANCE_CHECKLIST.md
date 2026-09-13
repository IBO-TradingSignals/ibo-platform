# IBO — PHASE 0 ACCEPTANCE CHECKLIST

مالک باید هرکدام از موارد زیر را تأیید (✅) یا رد (❌ + توضیح) کند. تا زمانی‌که همه موارد ✅ نشوند، Phase 1 آغاز نمی‌شود.

## هویت و Scope
- [ ] هویت برند (نام/لوگو/شعار) درست ثبت شده و تغییری در آن نیست.
- [ ] سه حوزه خدمات (Binary/Crypto/Forex) و زیرمجموعه‌های آن‌ها (International/OTC، Spot/Futures) درست است.
- [ ] فهرست Non-Scope (خارج از فاز اول) قابل قبول است.

## حاکمیت سیگنال
- [ ] قانون Human-Only Signal Publishing کاملاً واضح و قابل قبول است.
- [ ] زنجیره Create→Validate→Preview→Human Confirm→Publish→Event→Audience Filter→Queue→Delivery→Journal→Audit تأیید می‌شود.

## معماری
- [ ] نقشه معماری مادر (Admin Command Center → Backend مرکزی → Clients) قابل قبول است.
- [ ] فهرست اولیه Data Domain Entities کامل به‌نظر می‌رسد (یا نیاز به افزودن/حذف دارد — مشخص شود).
- [ ] چارچوب تصمیم فناوری (Technology Decision Framework) قابل قبول است؛ تصمیم نهایی PostgreSQL/Stack در Phase 1 گرفته می‌شود.

## حاکمیت AI و Agent
- [ ] فهرست اولیه Agentها (Minimal Useful Set) قابل قبول است.
- [ ] اصل Least Privilege و ممنوعیت مطلق Signal Publish برای هر Agent پذیرفته شده است.
- [ ] مدل Risk (R0–R4) و الزام Approval برای R3/R4 پذیرفته شده است.

## Toolchain
- [ ] مرز Google AI Studio (فقط Frontend Foundation) پذیرفته شده است.
- [ ] وضعیت فعلی تأییدشده AI Studio (Web = GitHub Two-way Sync؛ Android = فقط ZIP، بدون GitHub Export مستقیم) درک و پذیرفته شده است.
- [ ] اولویت مدل CLINE (GLM-5.3-Flash → DeepSeek V4-Flash) و اصل Provider/Model Adapter پذیرفته شده است.

## GitHub و تست
- [ ] جریان کار GitHub (Feature Branch → PR → Review → Merge) پذیرفته شده است.
- [ ] تست ده‌مرحله‌ای + Composite Test برای هر Phase پذیرفته شده است.
- [ ] سیاست Failure (STOP → Diagnose → Fix → Retest → Composite Retest) پذیرفته شده است.

## نهایی
- [ ] هیچ ابهام حل‌نشده‌ای در حوزه‌های حیاتی (Signal، Payment، Compliance) باقی نمانده است.
- [ ] مالک این پکیج را به‌عنوان **Baseline نسخه v0.1** تأیید می‌کند.

---
با تأیید کامل این چک‌لیست، Phase 1 (Repository + Architecture Foundation) آغاز می‌شود.
