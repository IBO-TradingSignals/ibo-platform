# IBO — PHASE DEPENDENCY GRAPH (Phase 0 Baseline)

## ترتیب رودمپ کامل (۲۵ فاز، طبق Blueprint)
```
Phase 0  — Product Bible / Requirement Freeze                (این پکیج)
Phase 1  — Repository + Architecture Foundation
Phase 2  — Data Model + API Contracts
Phase 3  — Backend + Auth
Phase 4  — Subscription + Entitlements
Phase 5  — Signal Management + Human Publishing
Phase 6  — Admin App Foundation            (اولین استفاده AI Studio)
Phase 7  — User Web/PWA Foundation         (اولین استفاده AI Studio)
Phase 8  — Android Foundation              (مسیر ZIP/Android Studio جدا)
Phase 9  — Notification Layer
Phase 10 — CMS + Blog
Phase 11 — SEO
Phase 12 — GEO
Phase 13 — Localization + Country Intelligence
Phase 14 — News Intelligence + Journal
Phase 15 — Analytics + Monitoring
Phase 16 — AI Agent Governance (تکمیل Registry واقعی)
Phase 17 — MCP + Skills + Tools
Phase 18 — n8n / Automation
Phase 19 — Security Hardening
Phase 20 — Full Integration            → Phase 20 Test + Composite 1..20
Phase 21 — Production Readiness
Phase 22 — Store Readiness
Phase 23 — Growth Optimization
Phase 24 — Autonomous Safe Operations (فقط عملیات غیر-Signal، هرگز صدور خودکار سیگنال)
```

## قوانین وابستگی حیاتی
- Phase 2 (Data Model/API Contracts) باید قبل از Phase 6/7/8 (AI Studio UI) تثبیت شود، تا Placeholderهای UI با Contract واقعی هم‌راستا باشند.
- Phase 3 (Backend+Auth) باید قبل از Phase 4 (Subscription) و Phase 5 (Signal) تثبیت شود.
- Phase 5 (Signal Management) باید قبل از Phase 9 (Notification) کامل شود، چون Delivery به رویداد `SignalPublished` وابسته است.
- Phase 10 (CMS) مستقل از Signal Core است و می‌تواند موازی با Phase 9 پیش برود، اما نباید زودتر از Phase 2 شروع شود (چون به API Contract مشترک نیاز دارد).
- Phase 16 (Agent Governance کامل) باید قبل از فعال‌سازی گسترده Phase 17/18 (MCP/Automation) کامل شود — Least Privilege باید از قبل تعریف شده باشد.
- Phase 19 (Security Hardening) باید قبل از Phase 21 (Production Readiness) کامل شود.
- Phase 24 (Autonomous Safe Operations) هرگز به معنای واگذاری Signal Authority به AI نیست؛ فقط عملیات‌های غیر-Signal (Monitoring، Journal، News) خودکارتر می‌شوند.

## قانون Gate
هیچ Phase بدون PASS شدن Gate فاز قبلی (طبق TEST_PLAN.md) باز نمی‌شود.
