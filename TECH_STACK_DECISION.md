# IBO — TECH STACK DECISION (Phase 1)

این تصمیم بر اساس «Technology Decision Framework» ثبت‌شده در ARCHITECTURE_MAP.md (Phase 0) گرفته شده: API-First/Single-Source-of-Truth، پشتیبانی از Provider/Model Adapter، بلوغ Production، پشتیبانی RTL/LTR و پنج‌زبانه، سادگی عملیاتی (Docker کافی است)، هزینه/در‌دسترس‌بودن نیروی توسعه (CLINE + GLM-5.3-Flash/DeepSeek Flash).

⚠️ این پیشنهاد است، نه تحمیل — در ACCEPTANCE_CHECKLIST.md باید صریحاً تأیید یا رد شود.

## 1) Backend Language/Framework
**پیشنهاد: Node.js + TypeScript + NestJS**

دلایل:
- NestJS ساختار Module/Provider/Controller دارد که دقیقاً با جداسازی حوزه‌ای که Blueprint می‌خواهد (Signal Core, Subscription, Notification, CMS API) هم‌راستاست — هرکدام یک Module مستقل با مرز مشخص.
- پشتیبانی درجه‌یک از OpenAPI (`@nestjs/swagger`) → مستقیماً API Contract تولید می‌کند، سازگار با اصل API-First.
- TypeScript باعث می‌شود مدل‌های Backend/Frontend (Web/PWA/Admin) بتوانند از یک Type/Contract مشترک استفاده کنند (خصوصاً اگر بعداً tRPC یا Shared Types اضافه شود).
- مدل‌های Coding اولویت‌دار CLINE (GLM-5.3-Flash, DeepSeek Flash) در تولید کد TypeScript/Node عملکرد قوی دارند؛ این هزینه/سرعت توسعه را بهینه می‌کند.
- بلوغ Production بالا، اکوسیستم گسترده برای Queue (BullMQ)، Auth (Passport/JWT)، WebSocket (برای Notification Real-time).

جایگزین بررسی‌شده و رد‌شده در این مرحله: Python/FastAPI — از نظر فنی معتبر است اما جداسازی Module داخلی به‌اندازه NestJS تحمیلی/استاندارد نیست و برای تیم AI-driven (CLINE) هماهنگی کمتری با ساختار Domain-Driven مدنظر Blueprint دارد. در صورت تمایل مالک به Python، این تصمیم قابل بازنگری است.

## 2) Database
**پیشنهاد: PostgreSQL** (طبق پیشنهاد اولیه خود Blueprint، اکنون قطعی می‌شود)

دلایل:
- یکپارچگی رابطه‌ای برای Users/Subscriptions/Entitlements/AuditLogs حیاتی است (تراکنش‌های Payment/Subscription نباید Race Condition داشته باشند).
- پشتیبانی JSONB برای فیلدهای Dynamic (مثل تفاوت فیلدهای هر SignalTemplate: Binary vs Crypto Futures vs Forex) بدون نیاز به Schema جداگانه برای هرکدام.
- پشتیبانی بومی از Row-Level Security — می‌تواند لایه دفاعی اضافه برای Entitlement/Multi-tenant باشد.
- بلوغ بسیار بالا در Production، ابزار Migration فراوان.

## 3) ORM / Migration Tool
**پیشنهاد: Prisma**

دلایل: Type-safety کامل با TypeScript، تولید Migration خوانا و قابل Review در Pull Request (سازگار با اصل «هر تغییر باید قابل ردیابی باشد»)، ابزار خوب برای CLINE جهت تولید/تغییر Schema به‌صورت کنترل‌شده.

## 4) API Contract Style
**پیشنهاد: REST + OpenAPI 3.1 به‌عنوان Single Source of Truth Contract**

دلایل: سادگی برای مصرف توسط چند Client متفاوت (Android Native، PWA، Admin Web)، تولید خودکار SDK/Type از OpenAPI برای هر Client، خوانایی بالا برای Promptهای AI Studio/CLINE (سند Contract قابل Copy/Paste در Prompt است). GraphQL به‌عنوان لایه اضافه در آینده (نه جایگزین) قابل بررسی مجدد است اگر نیاز واقعی (مثل Aggregation پیچیده در Admin Dashboard) اثبات شود.

## 5) Repository Model
**پیشنهاد: Monorepo** با ابزار Workspace (مثل pnpm workspaces + Turborepo یا Nx — انتخاب دقیق ابزار در حین اجرای Phase 1 توسط CLINE و طبق آخرین مستندات رسمی آن ابزار بررسی می‌شود، چون نسخه‌ها به‌سرعت تغییر می‌کنند)

دلایل:
- Contract مشترک (`packages/contracts`) در یک Commit با تغییرات Backend/Client هم‌زمان تغییر می‌کند → از Drift بین API واقعی و Client جلوگیری می‌کند.
- برای یک تیم کوچک/AI-driven (Claude+CLINE)، هماهنگی یک Repository ساده‌تر از هماهنگی چند Repository جداست.
- Android (که مسیر GitHub Export مستقیم ندارد) در یک پوشه جدا از همان Monorepo نگه داشته می‌شود تا وقتی مستندات AI Studio تغییر کرد، به‌سادگی ادغام شود.

## 6) Containerization
**پیشنهاد: Docker + Docker Compose** برای محیط توسعه/Staging. Kubernetes در این فاز اضافه نمی‌شود (طبق اصل ۹۸ Blueprint) — فقط اگر در Phase 21 (Production Readiness) نیاز واقعی به Auto-scaling چندسرویسی اثبات شود، بازبینی می‌شود.

## 7) نسخه‌های دقیق ابزارها
عمداً در این سند نسخه دقیق (مثل «Node 22» یا «NestJS 11») قید نمی‌شود؛ CLINE موظف است در لحظه اجرای Phase 1، آخرین نسخه LTS/Stable هرکدام را از مستندات رسمی همان ابزار استعلام و در `CLINE_PHASE_01_EXECUTION_PROMPT.md` (خروجی Evidence) ثبت کند — تا این سند به‌خاطر گذر زمان منسوخ نشود.
