# PHASE 1 — Repository + Architecture Foundation

Status: OPEN — در انتظار تأیید مالک (طبق ACCEPTANCE_CHECKLIST همین Phase)
Risk Class: R1 (Low-Risk Reversible — فقط اسکلت خالی Repository، بدون Business Logic، بدون Secret واقعی)
Execution Mode: DRY_RUN → پس از تأیید مالک: STAGING (فقط ساخت اسکلت، نه Deploy)

## 1) Objective
تثبیت تصمیمات فنی نهایی (Tech Stack، ساختار Repository، مدل Credential/Secret) و ساخت اسکلت اولیه Repository — بدون هیچ Backend واقعی، بدون اتصال به Database واقعی، بدون هیچ Business Logic. خروجی این Phase چیزی است که CLINE بتواند از روی آن در Phase 2 به بعد بسازد.

## 2) Dependencies
- Phase 0 تأیید شده (Product Bible, Architecture Map, Agent Governance, AI Studio Strategy, GitHub Workflow, Test Plan, Phase Dependency Graph).
- هیچ وابستگی خارجی دیگری ندارد.

## 3) Exact Input Files (از مالک)
هیچ فایل جدیدی لازم نیست. فقط نیاز به این تصمیمات مالک است (در ACCEPTANCE_CHECKLIST مشخص شده):
- تأیید یا رد تصمیم Tech Stack پیشنهادی (بخش TECH_STACK_DECISION.md)
- تأیید یا رد ساختار Monorepo پیشنهادی
- تأیید نام دقیق Repository در GitHub

## 4) Exact Upload Order
N/A — Phase 1 چیزی برای Upload از طرف مالک ندارد. فقط دو اقدام لازم است:
1. ساخت Repository خالی در GitHub (نام پیشنهادی: `ibo-platform`)
2. اتصال PAT/MCP گیت‌هاب به CLINE (طبق CREDENTIAL_AND_SECRETS_MODEL.md) — که طبق گفته مالک از قبل انجام شده است.

## 5) User App / Admin App Prompt
همچنان N/A. اولین Prompt واقعی AI Studio در Phase 6/7 خواهد آمد.

## 6) Expected Files/Changes (این Phase)
داخل پکیج مستندات (این پکیج):
- PHASE_1_PLAN.md (همین فایل)
- TECH_STACK_DECISION.md
- REPOSITORY_STRUCTURE.md
- CREDENTIAL_AND_SECRETS_MODEL.md
- CLINE_PHASE_01_EXECUTION_PROMPT.md
- TEST_PLAN_PHASE_1.md
- ACCEPTANCE_CHECKLIST.md
- GITHUB_HANDOFF.md
- README_FA.md
- USER_APP_PROMPT.md / ADMIN_APP_PROMPT.md (همچنان N/A placeholder)

داخل Repository واقعی (توسط CLINE، پس از اجرای CLINE_PHASE_01_EXECUTION_PROMPT.md):
- اسکلت پوشه‌ها طبق REPOSITORY_STRUCTURE.md
- فایل‌های پیکربندی پایه (package.json های خالی/حداقلی، tsconfig, .gitignore, .editorconfig, README.md سطح Repository)
- CI Pipeline حداقلی (فقط Build/Lint، بدون Deploy واقعی)
- **هیچ کد Business Logic، هیچ اتصال Database واقعی، هیچ Secret واقعی**

## 7) Files That Must Not Be Touched
- هیچ فایلی از Phase 0 (پوشه `docs/phase-0/`) نباید تغییر کند؛ فقط Append/Reference مجاز است.
- هیچ فایل Secret/`.env` واقعی نباید در این Phase وارد Repository شود.

## 8) GitHub Action for Owner
1. Repository خالی `ibo-platform` را (اگر هنوز نساخته‌اید) بسازید.
2. `docs/phase-0/` و `docs/phase-1/` را طبق GITHUB_HANDOFF.md همین پکیج اضافه کنید.
3. Branch پیش‌فرض را `main` بگذارید؛ Branch Protection Rule فعال کنید (حداقل: نیاز به Pull Request برای merge به `main`).
4. CLINE را با Prompt فایل `CLINE_PHASE_01_EXECUTION_PROMPT.md` روی یک Feature Branch (`feature/phase-1-scaffold`) اجرا کنید.

## 9) Screenshots/Evidence Required
- Screenshot از تنظیمات Branch Protection روی `main`.
- خروجی CI (سبز/قرمز) بعد از اولین Push.
- ساختار نهایی درخت پوشه‌ها (خروجی `tree` یا معادل آن در GitHub).

## 10) Tests (طبق TEST_PLAN_PHASE_1.md)
فقط Level 1 (Build/Syntax) و Level 10 (Regression در برابر Phase 0 — یعنی هیچ تناقضی با اسناد Phase 0 ایجاد نشده) در این مرحله معنا دارند؛ سایر ۸ سطح چون هنوز UI/API/Data واقعی وجود ندارد، N/A هستند و در Phase 2 به بعد فعال می‌شوند.

## 11) PASS Criteria
- Repository ساخته شده و اسکلت طبق REPOSITORY_STRUCTURE.md موجود است.
- CI حداقلی (Build/Lint) سبز است.
- هیچ Secret واقعی در Repository Commit نشده (بررسی با Git History/Secret Scanning).
- مالک ACCEPTANCE_CHECKLIST.md را تأیید کرده است.

## 12) STOP Criteria
- هرگونه Secret واقعی (Token, Key, Password) در یک Commit پیدا شود → توقف فوری، Rotate کردن آن Secret، پاک‌سازی از Git History.
- تصمیم Tech Stack توسط مالک رد شود → بازنویسی TECH_STACK_DECISION.md با گزینه جایگزین.

## 13) Rollback
چون فقط اسکلت خالی است، Rollback ساده است: حذف Branch `feature/phase-1-scaffold` بدون اینکه به `main` رسیده باشد، یا در صورت Merge شدن، یک Revert Commit ساده.

## 14) Next Action
پس از PASS شدن این Gate:
→ Phase 2 — Data Model + API Contracts (تعریف دقیق Schema، OpenAPI Contract نهایی، بدون هنوز اتصال UI).
