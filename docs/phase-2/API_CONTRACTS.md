# IBO — API CONTRACTS GUIDE (Phase 2)

این سند قوانین طراحی OpenAPI را مشخص می‌کند؛ فایل واقعی `openapi.yaml` کامل در `OPENCODE_PHASE_02_EXECUTION_PROMPT.md` (بخش خروجی) تولید می‌شود.

## 1) گروه‌بندی Endpointها (Tags)
`Auth, Users, Plans, Subscriptions, Instruments, SignalTemplates, Signals, SignalDeliveries, Notifications, Payments, Journal, News, CMS-Articles, Locales, Countries, Health`

## 2) قانون طلایی: جداسازی Endpoint بر اساس Risk
هر عملیات روی Signal باید Endpoint جدا داشته باشد، دقیقاً هم‌راستا با State Machine (نه یک PATCH عمومی که همه‌کاره باشد):

| Endpoint | Method | توضیح | چه کسی مجاز است |
|---|---|---|---|
| `/signals` | POST | ایجاد Draft جدید | ANALYST, OWNER (انسان) |
| `/signals/{id}/validate` | POST | اعتبارسنجی ساختاری (می‌تواند توسط Agent فراخوانی شود) | ANALYST, OWNER, یا Agent با Permission محدود |
| `/signals/{id}/preview` | POST | تولید پیش‌نمایش نهایی برای تحلیلگر | ANALYST, OWNER |
| `/signals/{id}/confirm` | POST | **تنها Endpoint ای که Signal را به CONFIRMED می‌برد** | **فقط ANALYST/OWNER انسانی — این Endpoint هرگز نباید با API Key سطح Agent قابل فراخوانی باشد** |
| `/signals/{id}/publish` | POST | انتشار (فقط از CONFIRMED) | ANALYST, OWNER |
| `/signals/{id}/cancel` | POST | لغو قبل از انتشار | ANALYST, OWNER |
| `/signals/{id}` | GET | مشاهده | همه نقش‌های مجاز طبق Entitlement |

این جداسازی دقیق (به‌جای یک PATCH عمومی `status`) دقیقاً همان کنترلی است که در سطح Database (بخش ۳ سند DATA_MODEL) توضیح داده شد را در سطح API هم اجرایی می‌کند — دو لایه دفاعی مستقل (Defense in Depth).

## 3) Authentication (طراحی Contract؛ پیاده‌سازی واقعی در Phase 3)
- `Authorization: Bearer <JWT>` برای همه Endpointهای غیر-Public.
- دو نوع Token مجزا در طراحی: `UserToken` (برای انسان‌ها، شامل Role) و `AgentToken` (برای Agentها، شامل Agent ID + Permission Scope از Permission Matrix). این دو **هرگز** یک نوع Token مشترک نیستند — یعنی حتی در سطح Auth Design، امکان ندارد یک Agent Token به‌جای User Token در Endpoint `/signals/{id}/confirm` پذیرفته شود.

## 4) قوانین عمومی REST
- Pagination: `?page=&pageSize=` روی همه Listهای بالقوه بزرگ (Signals, Articles, NewsItems, AuditLogs).
- Idempotency-Key Header برای POSTهای حساس (Payment, Signal Publish) تا Retry تصادفی باعث Duplicate نشود.
- خطاها: فرمت یکسان `{ "error": { "code": "...", "message": "..." } }`.
- نسخه‌بندی: `/v1/` پیشوند مسیرها از همین Phase (برای اینکه تغییرات Breaking آینده مسیر مجزا بگیرند).

## 5) چیزی که در این Contract نیست (عمداً)
- هیچ Endpoint ای برای دریافت مستقیم اطلاعات کارت پرداخت — این همیشه از طریق Redirect/Webhook با Provider خارجی انجام می‌شود.
- هیچ Endpoint ای که یک Agent بتواند مستقیم `status=PUBLISHED` ست کند.
- هیچ Bulk-Delete برای Signal/Payment/AuditLog.
