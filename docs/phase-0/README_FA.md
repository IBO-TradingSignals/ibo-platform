# IBO — Phase 0 Package (Product Bible / Requirement Freeze)

## این پکیج چیست؟
این پکیج، خروجی کامل **Phase 0** پروژه بازسازی IBO است — یعنی سند مادر و تثبیت‌شده محصول، معماری، حاکمیت سیگنال، حاکمیت AI، و استراتژی ابزارها، پیش از هرگونه Implementation واقعی.

هیچ کد، Backend، Database یا Build واقعی در این Phase ساخته نشده است. این فقط سند مرجع (Baseline) است.

## فایل‌ها و ترتیب مطالعه پیشنهادی
1. **PHASE_0_PLAN.md** — هدف، وابستگی، PASS/STOP، قدم بعدی این Phase.
2. **PRODUCT_BIBLE.md** — تعریف محصول، Scope/Non-Scope، قانون قطعی حاکمیت سیگنال، Subscription، محتوا/SEO، پنج‌زبانه، امنیت.
3. **ARCHITECTURE_MAP.md** — نقشه معماری، پلتفرم‌ها، دامنه داده، قالب‌های Signal، چارچوب تصمیم فناوری.
4. **AGENT_GOVERNANCE_AND_PERMISSION_MODEL.md** — Agentها، Permission Matrix، Event/Hook/Rule/Task، Risk Model.
5. **GOOGLE_AI_STUDIO_STRATEGY.md** — وضعیت فعلی تأییدشده AI Studio برای Web (GitHub Two-way Sync) و Android (فقط ZIP، بدون GitHub Export مستقیم فعلاً).
6. **GITHUB_WORKFLOW.md** — جریان کار Repository و حلقه بازخورد.
7. **TEST_PLAN.md** — تست ده‌مرحله‌ای و Composite Test برای هر Phase آینده.
8. **PHASE_DEPENDENCY_GRAPH.md** — ترتیب کامل ۲۵ فاز و وابستگی‌های حیاتی بین آن‌ها.
9. **ACCEPTANCE_CHECKLIST.md** — چک‌لیستی که باید مالک تکمیل و تأیید کند تا Phase 1 آغاز شود.
10. **USER_APP_PROMPT.md / ADMIN_APP_PROMPT.md / CLINE_EXECUTION_PROMPT.md** — در این Phase خالی/N-A هستند (چون هنوز چیزی برای Build وجود ندارد)؛ فقط برای یکدست بودن ساختار پکیج نگه داشته شده‌اند.
11. **GITHUB_HANDOFF.md** — اقدام اختیاری (نه اجباری) که مالک می‌تواند همین حالا انجام دهد.

## چه چیزی باید Upload شود؟
هیچ. Phase 0 نیازی به Upload فایل جدید از طرف مالک ندارد.

## چه Promptی باید استفاده شود؟
هیچ Prompt اجرایی برای Google AI Studio در این مرحله وجود ندارد. اولین Promptها در Phase 6 (Admin App) و Phase 7 (User App) خواهند آمد.

## چه کاری در Google AI Studio انجام شود؟
هیچ کاری — Phase 0 وارد AI Studio نمی‌شود.

## چه چیزی Push شود؟
اختیاری: می‌توانید این پکیج را در `docs/phase-0/` یک Repository جدید (خالی) قرار دهید. اجباری نیست.

## چه Screenshotی لازم است؟
هیچ.

## چه تستی انجام شود؟
فقط تأیید محتوایی — چک‌لیست `ACCEPTANCE_CHECKLIST.md` را کامل کنید.

## قدم بعدی
پس از تکمیل و تأیید صریح `ACCEPTANCE_CHECKLIST.md` (یا اعلام اصلاحات لازم)، Phase 1 — Repository + Architecture Foundation — آغاز خواهد شد.

---
⚠️ یادآوری قانون حیاتی پروژه: **IBO یک Trading Bot خودکار یا Autonomous AI Trader نیست. هیچ سیگنالی بدون تأیید صریح انسان منتشر نمی‌شود.** این قانون در تمام فازهای آینده بدون استثنا برقرار می‌ماند.
