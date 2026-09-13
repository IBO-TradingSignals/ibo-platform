# IBO — ARCHITECTURE MAP (Phase 0 Baseline)

## 1) نمودار معماری مادر
```
Admin Command Center
   → Chief/Governor Agent
      → Planner/Research Agent
      → Specialist Agents (Dev, QA, SEO, GEO, Content, News, Journal, Analytics, Security, DevOps ...)
   → Tasks / Workflows
   → MCP / Tools
   → Automation (Scheduler + Queue + Worker)
→ Backend مرکزی (Single Source of Truth)
   → Database
   → CMS
   → External Services (Payment, Notification Providers, News Sources)
→ Clients: Android / Web / PWA / Public Website / Blog / Admin App
```
مرجع اصلی Business Logic همیشه Backend مرکزی است؛ هیچ Clientای منطق تجاری تکراری پیاده نمی‌کند.

## 2) نقشه پلتفرم‌ها (Platform Map)
| پلتفرم | نقش | وابستگی |
|---|---|---|
| Public Website + Blog | SEO/GEO، محتوای عمومی، ورود کاربر جدید | CMS + Backend API |
| Web App / PWA | تجربه اصلی کاربر مشترک | Backend API مشترک |
| Android App | تجربه Native موبایل | Backend API مشترک |
| Admin App | Command Center — کاملاً جدا از User App | Backend API مشترک، Permission سطح بالاتر |
| Backend API | Source of Truth؛ Auth، Signal، Subscription، Notification، Payment | Database + External Services |
| CMS (Headless) | Articles, Blog, FAQ, Landing Pages, SEO Metadata, Media, Localization | مستقل از Signal Core؛ API ارتباطی روشن |

## 3) دامنه داده (Data Domain) — Entityهای اولیه
Users, Roles, Permissions, Plans, Subscriptions, Entitlements, Markets, Instruments, SignalTemplates, Signals, SignalDeliveries, Notifications, Payments, JournalEntries, NewsItems, Articles, Locales, Countries, AuditLogs, Events, Tasks, AgentRuns.

جزئیات Schema دقیق در Phase 2 (Data Model + API Contracts) تعیین می‌شود — Phase 0 فقط فهرست Entityها را منجمد می‌کند، نه ستون‌ها یا Migrationها.

## 4) قالب‌های Signal (Dynamic، نه یک فرم غول‌پیکر)
- Binary Options: Instrument, Market Type, International/OTC, Call/Put, Expiration, Risk
- Crypto Spot: Instrument, Buy/Sell, Entry, Target, Stop Loss, Risk, Notes
- Crypto Futures: Instrument, Long/Short, Entry, TP, SL, Leverage, Risk
- Forex: Instrument, Buy/Sell, Entry, SL, TP, Risk, Timeframe, Notes

هر Template مستقل است؛ افزودن بازار جدید نباید Templateهای موجود را تغییر دهد.

## 5) Technology Decision Framework
تصمیم نهایی فنی (زبان Backend، Framework، نسخه دقیق DB) در Phase 1 گرفته می‌شود، اما چارچوب تصمیم‌گیری از همین Phase 0 ثابت است:

معیارهای انتخاب هر فناوری، به ترتیب اولویت:
1. سازگاری با اصل Single-Source-of-Truth / API-First (آیا فناوری منطق تجاری را در Backend مرکزی نگه می‌دارد؟)
2. پشتیبانی از Provider/Model Adapter برای اجزای AI (بدون Hard-code نام مدل).
3. بلوغ و پایداری در تولید (Production-grade)، نه صرفاً محبوبیت.
4. توانایی پشتیبانی از RTL/LTR و پنج‌زبانه از پایه.
5. سادگی عملیاتی — «Docker کافی است، Kubernetes در شروع لازم نیست».
6. هزینه و در دسترس بودن نیروی توسعه (CLINE/GLM-5.3-Flash/DeepSeek Flash به‌عنوان Coding Worker).

پیشنهاد اولیه (قابل بازبینی در Phase 1، نه قطعی):
- Database: PostgreSQL (طبق Blueprint، «قابل بررسی» — تأیید نهایی در Phase 1).
- معماری Backend: API-First، REST یا GraphQL (تصمیم در Phase 1 با ذکر دلیل).
- Frontend Foundation: از طریق Google AI Studio Build Mode (Web/PWA) و مسیر Android مستقل.

## 6) مرز دقیق ابزارها (خلاصه از پروتکل Toolchain)
| ابزار | نقش | محدوده |
|---|---|---|
| Google AI Studio | اسکلت اولیه UI/UX دو مسیر (User/Admin) | فقط Frontend Foundation؛ هرگز مالک دائمی Business Core نیست |
| CLINE (Terminal) | Coding/Engineering Worker اصلی پس از پایه UI | Backend, DB, API, Auth, Signal Mgmt, Notification, CMS integration, Tests, Security |
| Claude | Master Planner / Architect / Governor / Reviewer | برنامه‌ریزی، Phase Gate، Prompt Generation، Repository Review، Regression Check |
| GitHub | مرکز Repository و Source of Truth نسخه‌ها | Feature Branch → Test → PR → Review → Merge |

Source of Truth نهایی پروژه: **Repository + Approved Architecture Documents + Data/API Contracts + Tests** — نه تاریخچه Chat در AI Studio یا هیچ ابزار دیگر.
