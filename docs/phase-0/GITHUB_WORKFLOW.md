# IBO — GITHUB WORKFLOW (Phase 0 Baseline)

## 1) اصل
GitHub مرکز اصلی Repository است: Source Code, Documentation, Issues, Branches, Pull Requests, Actions, Releases. GitLab/Bitbucket فقط با نیاز اثبات‌شده اضافه می‌شوند.

## 2) ساختار پیشنهادی Repository (تصمیم نهایی در Phase 1)
یکی از دو الگو، بسته به تصمیم Phase 1:
- **Monorepo**: `apps/user-web`, `apps/admin-web`, `apps/android`, `services/backend`, `packages/shared-contracts`, `docs/`
- **Polyrepo**: Repository جدا برای هرکدام + یک Repository `ibo-contracts` برای API/Data Contracts مشترک.

Phase 0 فقط اصل را منجمد می‌کند: هرچه انتخاب شود، **API Contracts باید Single Source of Truth و به هر دو Client (User/Admin) قابل‌دسترس باشد** — تکرار Contract در چند جا ممنوع.

## 3) جریان کار استاندارد
```
Feature Branch → Implement → Test → Pull Request → Review (Claude/Owner) → Merge → CI/CD
```
Pipeline هدف:
```
Commit → Build → Test → Security → QA → Artifact → Staging → Approval → Production
```
AI (CLINE) ترجیحاً روی Branch/PR کار می‌کند، نه مستقیم روی `main`.

## 4) حلقه بازخورد (GitHub Loop) — طبق مسیر Web
```
Google AI Studio → GitHub (Two-way Sync) → CLINE Terminal → GitHub → Claude Repository Review → Diff/Regression Check → Phase Gate → Next Step
```

## 5) حلقه بازخورد — مسیر Android (متفاوت، طبق وضعیت فعلی مستندات)
```
Google AI Studio (Android) → ZIP Export → Import در Android Studio محلی مالک → Push دستی به GitHub → Claude Review → Next Step
```
(دلیل تفاوت در GOOGLE_AI_STUDIO_STRATEGY.md ثبت شده است.)

## 6) قانون «هرگز فرض نکن Push موفق بود»
بعد از هر Push مالک:
1. Claude باید Repository را از طریق دسترسی/Context ارائه‌شده بررسی کند.
2. Diff واقعی با انتظار Phase مقایسه شود.
3. اگر Regression یا Drift دیده شد → STOP → Diagnose → Fix → Retest → Composite Retest.
4. فقط پس از تأیید، Phase Gate بعدی باز می‌شود.

## 7) Human Action Required — کِی مالک باید مستقیماً وارد شود
هر جا KYC، پذیرش قانونی، ثبت حساب بانکی/Merchant، یا هر اقدام هویتی لازم باشد، Claude یک بسته «Human Action Required» تولید می‌کند شامل: چه چیزی باقی مانده، چرا لازم است، لینک/منبع رسمی، چه‌کاری قبلاً انجام شده، چه اطلاعات غیر-محرمانه‌ای لازم است، هشدارهای امنیتی، قدم بعدی.

## 8) قانون Secrets در GitHub
هیچ Password، Private Key، Seed Phrase، اطلاعات کارت پرداخت، API Secret یا مدرک هویتی در هیچ Commit، Issue، PR Description یا فایل عادی Repository قرار نمی‌گیرد. Secrets فقط از طریق مکانیزم امن پلتفرم میزبانی (مثل GitHub Secrets / Cloud Secret Manager) مدیریت می‌شوند.
