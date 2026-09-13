# IBO — DATA MODEL (Phase 2)

مرجع: فهرست Entityهای ARCHITECTURE_MAP.md (Phase 0). هر Entity زیر باید عیناً پیاده‌سازی شود؛ حذف/تغییر ماهوی نیازمند بازگشت به مالک است (طبق اصل No Destructive Drift).

## 1) هویت و دسترسی

### User
`id, email (unique), phone (nullable), passwordHash, status (ACTIVE|SUSPENDED|PENDING_VERIFICATION), localeCode, countryCode, createdAt, updatedAt`

### Role (Human Roles — مجزا از Agent Permission Matrix که در Phase 0/16 تعریف شد)
Enum ثابت: `OWNER, ANALYST, SUPPORT, SUBSCRIBER` — تخصیص نقش به User از طریق `UserRole` (Many-to-Many، برای پشتیبانی از نقش‌های ترکیبی مثل ANALYST+SUPPORT).

### AuditLog (سراسری — برای Signal، Payment، Content، هر تغییر حساس)
`id, actorType (HUMAN|AGENT|SYSTEM), actorId, action, entityType, entityId, metadata (JSONB), createdAt`

## 2) Subscription Domain (طبق قانون Phase 0: Plan ≠ Subscription ≠ Entitlement)

### MarketDomain (Enum — نه جدول جداگانه؛ ثابت و قابل توسعه از طریق Migration جدید)
`BINARY_INTERNATIONAL, BINARY_OTC, CRYPTO_SPOT, CRYPTO_FUTURES, FOREX`

### Plan
`id, name, description, durationDays, price, currency, isActive, createdAt, updatedAt`

### PlanEntitlement (Join Table)
`planId, marketDomain` — یک Plan می‌تواند چند MarketDomain را پوشش دهد.

### Subscription
`id, userId, planId, startAt, endAt, status (PENDING|ACTIVE|EXPIRED|CANCELLED), createdAt, updatedAt`

### SubscriptionEntitlement (Snapshot — عمداً از Plan جدا؛ چون تغییر بعدی Plan نباید مشترکین قبلی را عقب بیندازد)
`subscriptionId, marketDomain, grantedAt`

## 3) Signal Domain (حیاتی‌ترین بخش — باید دقیقاً زنجیره Phase 0 را پیاده کند)

### Instrument
`id, symbol, name, marketDomain, isActive`

### SignalTemplate
`id, marketDomain, version, fieldsSchema (JSONB — تعریف پویا فیلدهای هر نوع سیگنال طبق ARCHITECTURE_MAP §4), isActive`

### Signal
`id, templateId, instrumentId, createdByUserId, payload (JSONB — مقادیر واقعی طبق fieldsSchema), status, confirmedByUserId (nullable), confirmedAt (nullable), publishedAt (nullable), createdAt, updatedAt`

**Status Enum (State Machine اجباری، دقیقاً همان زنجیره Phase 0):**
```
DRAFT → VALIDATED → PREVIEW → CONFIRMED → PUBLISHED
                                   ↘ CANCELLED (از هر مرحله قبل از PUBLISHED)
PUBLISHED → EXPIRED (پس از انقضای طبیعی سیگنال)
```
**قانون غیرقابل نقض در سطح Schema/API:** انتقال از `PREVIEW` به `CONFIRMED` **فقط** با پر بودن `confirmedByUserId` مجاز است و این فیلد **هرگز** توسط هیچ Agent ای نباید Set شود — این باید در سطح Application Layer (Phase 3) و همچنین در OpenAPI (جدا بودن Endpoint Confirm از Endpoint Create) اجرا شود.

### SignalDelivery
`id, signalId, subscriptionId, channel (IN_APP|ANDROID_PUSH|WEB_PUSH|EMAIL|SMS), status (QUEUED|SENT|DELIVERED|FAILED), sentAt, deliveredAt`

## 4) Notification (Adapter-based طبق Phase 0)

### NotificationLog
`id, userId, channel, templateType, payload (JSONB), status, createdAt`
(خود Adapterها Business Logic هستند، نه Entity — در Phase 9 پیاده می‌شوند؛ این فقط Log است.)

## 5) Payment

### Payment
`id, userId, subscriptionId (nullable — ممکن است پرداخت مستقل از تمدید باشد), provider, providerRef (شناسه تراکنش نزد Provider — هرگز شماره کارت!), amount, currency, status (PENDING|SUCCEEDED|FAILED|REFUNDED), createdAt`

⚠️ **هیچ فیلدی برای شماره کارت/CVV/اطلاعات حساب بانکی در این Schema وجود ندارد و نباید اضافه شود** — طبق CREDENTIAL_AND_SECRETS_MODEL.md، این اطلاعات فقط نزد Payment Provider می‌ماند (PCI Compliance).

## 6) AI Journal & News Intelligence (مستقل از Signal Core طبق Phase 0)

### JournalEntry
`id, authorType (HUMAN|AGENT), authorId, marketDomain, instrumentId (nullable), content, aiAssisted (boolean), createdAt`

### NewsItem
`id, source, title, url, summary, language, publishedAt, ingestedAt`

## 7) CMS (مستقل از Signal Core)

### Article
`id, slug (unique per language), title, body, language, countryTargets (string[]), status (DRAFT|IN_REVIEW|PUBLISHED), seoMeta (JSONB), publishedAt, createdAt, updatedAt`

### Locale
`code (PK, e.g. fa, en, ar, ...), name, isActive`

### Country
`code (PK, ISO), name, defaultCurrency, isActive`

## 8) Agent/Task/Event Infrastructure (پیاده‌سازی DB-level Phase 0 §6/§9/§11)

### Event
`id, type, payload (JSONB), occurredAt`

### Task
`id, type, status (طبق واژگان دقیق Phase 0: NEW, QUEUED, CLAIMED, RUNNING, WAITING, VERIFYING, RETRYING, SUCCESS, PARTIAL_SUCCESS, BLOCKED, FAILED, ESCALATED, CANCEL_REQUESTED, CANCELLED, EXPIRED), payload (JSONB), result (JSONB, nullable), createdAt, updatedAt`

### AgentRun (Admin-Safe Explanation — طبق Phase 0 §11؛ هرگز Chain-of-Thought خام)
`id, agentId, taskId (nullable), objective, planSummary, evidence (JSONB), decision, rationale, risk (R0-R4), toolsUsed (string[]), sources (string[]), result, nextAction, createdAt`

## 9) قوانین سراسری Schema
1. هر جدول `createdAt`/`updatedAt` دارد (به‌جز جداول صرفاً Log/Immutable که فقط `createdAt` لازم دارند).
2. هیچ Hard Delete برای Signal/Payment/AuditLog — فقط Soft Status (مثل CANCELLED)؛ حذف فیزیکی این جداول ممنوع است (Audit Trail).
3. تمام Foreign Key ها `ON DELETE RESTRICT` پیش‌فرض‌اند مگر دلیل صریح برای CASCADE وجود داشته باشد (جلوگیری از حذف زنجیره‌ای ناخواسته).
4. JSONB فقط برای داده‌های ذاتاً پویا (fieldsSchema، payload سیگنال، metadata) استفاده می‌شود، نه برای فیلدهای ثابتی که Query/Index لازم دارند.

## 10) نکته اجرایی برای OpenCode
Prisma Schema دقیق (فایل `schema.prisma`) باید از روی همین سند تولید شود؛ نام فیلدها camelCase در Prisma و snake_case در ستون‌های واقعی دیتابیس (طبق convention رایج Prisma: `@map`). این سند مرجع مفهومی است، نه کد نهایی.
