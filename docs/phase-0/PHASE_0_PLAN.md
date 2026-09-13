# PHASE 0 — Product Bible / Requirement Freeze

Status: OPEN — در انتظار تأیید مالک
Risk Class: R0 (Observation / Documentation only — هیچ کد، Backend، Database یا AI Studio Build ای در این Phase اجرا نمی‌شود)
Execution Mode: READ_ONLY

## 1) Objective
تثبیت نسخه نهایی «سند مادر محصول» (Product Bible) پیش از هرگونه Implementation. خروجی این Phase مرجع تغییرناپذیر (تا اطلاع ثانوی) برای تمام Phaseهای بعدی است.

Phase 0 هیچ کد تولید نمی‌کند، هیچ Prompt اجرایی برای Google AI Studio ارسال نمی‌شود، و هیچ Repository ساخته نمی‌شود مگر برای آماده‌سازی صرف (خالی).

## 2) Dependencies
- ورودی: IBO_MASTER_BLUEPRINT_FA.md، IBO_CLAUDE_MASTER_EXECUTION_PROMPT.md، IBO_HUMAN_GUIDE_FA.md، IBO_AI_MODEL_AND_TOOLCHAIN_PROTOCOL_FA.md (هر چهار فایل بررسی و در این پکیج لحاظ شدند).
- پیش‌نیاز خارجی: هیچ. Phase 0 به Google AI Studio، GitHub یا CLINE وابسته نیست.

## 3) Exact Input Files (از مالک، برای شروع Phase 1)
Phase 0 چیزی از مالک برای Upload لازم ندارد؛ فقط تأیید محتوا لازم است. Input های واقعی (Upload/Screenshot/Push) از Phase 1 به بعد شروع می‌شوند.

## 4) User App / Admin App Prompt
N/A برای Phase 0. Google AI Studio در Phase 0 استفاده نمی‌شود. اولین Promptهای واقعی AI Studio در Phase 6 (Admin App Foundation) و Phase 7 (User Web/PWA Foundation) تولید خواهند شد — دقیقاً پس از تثبیت Data Model و API Contracts در Phase 2 و پایه Backend/Auth در Phase 3.

## 5) Expected Deliverables (فایل‌های همین Phase)
- PHASE_0_PLAN.md (همین فایل)
- PRODUCT_BIBLE.md
- ARCHITECTURE_MAP.md
- AGENT_GOVERNANCE_AND_PERMISSION_MODEL.md
- GOOGLE_AI_STUDIO_STRATEGY.md
- GITHUB_WORKFLOW.md
- TEST_PLAN.md
- PHASE_DEPENDENCY_GRAPH.md
- ACCEPTANCE_CHECKLIST.md
- USER_APP_PROMPT.md (N/A placeholder)
- ADMIN_APP_PROMPT.md (N/A placeholder)
- CLINE_EXECUTION_PROMPT.md (N/A placeholder)
- GITHUB_HANDOFF.md
- README_FA.md

## 6) Files That Must Not Be Touched
در این Phase چیزی برای «دست نزدن» وجود ندارد چون هنوز Repository/کدی ساخته نشده. این بند از Phase 1 به بعد فعال می‌شود.

## 7) GitHub Action for Owner (Phase 0)
اختیاری، فقط آماده‌سازی:
1. یک Repository خالی (private) با نام پیشنهادی `ibo-platform` بسازید (یا نام دلخواه مالک).
2. هیچ کدی هنوز Push نشود.
3. این پکیج (فایل‌های Phase 0) را می‌توانید به‌عنوان `docs/phase-0/` در همان Repository نگه دارید — این خودش اولین Commit مستند پروژه خواهد بود.

## 8) Screenshots / Evidence Required
هیچ. Phase 0 مبتنی بر تأیید متنی مالک است، نه Evidence بصری.

## 9) Tests (Phase 0 Gate)
Phase 0 از ۱۰ تست استاندارد فنی معاف است (چون کد/UI وجود ندارد) اما باید این ۴ تست حاکمیتی را پاس کند:
1. Completeness Test — همه بخش‌های اجباری Phase 0 (فهرست بالا) تولید و ارائه شده‌اند.
2. Consistency Test — هیچ تناقضی بین این پکیج و ۱۰۰ اصل Blueprint وجود ندارد.
3. Non-Drift Test — هیچ قابلیت تأییدشده در Blueprint حذف یا تضعیف نشده است.
4. Owner Confirmation Test — مالک صراحتاً این پکیج را به‌عنوان Baseline تأیید کرده است.

## 10) PASS Criteria
- مالک این پکیج (یا نسخه اصلاح‌شده آن) را به‌صورت صریح تأیید کند.
- هیچ Requirement متناقضی باقی نمانده باشد.

## 11) STOP Criteria
- مالک درخواست تغییر در تعریف محصول، Brand، یا قانون Signal Governance بدهد → Phase 0 اصلاح و دوباره ارائه می‌شود.
- ابهام حل‌نشده در حوزه‌ای حیاتی (Signal، Data، Compliance) باقی بماند.

## 12) Rollback
Phase 0 صرفاً سند است؛ Rollback به معنای ویرایش نسخه سند و صدور نسخه جدید (v0.2, v0.3, ...) است. نسخه قبلی هرگز به‌طور مخفیانه حذف نمی‌شود.

## 13) Next Action
پس از تأیید مالک:
→ Phase 1 — Repository + Architecture Foundation (ساخت اسکلت Repository، تعیین ساختار Monorepo/Polyrepo، تعیین Tech Stack نهایی Backend/DB بر اساس ARCHITECTURE_MAP.md، بدون هیچ Business Logic واقعی).
