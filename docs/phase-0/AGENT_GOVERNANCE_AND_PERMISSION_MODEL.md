# IBO — AGENT GOVERNANCE, PERMISSION MODEL, EVENT/TASK/RULE/HOOK MODEL, RISK MODEL

## 1) اصل بنیادین
تعداد کم اما دقیق Agent، هرکدام با مسئولیت روشن. Chief Agent هماهنگ می‌کند، اختیار نامحدود ندارد.

## 2) فهرست اولیه Agentها (Minimal Useful Set)
Chief/Governor, Planner/Research, Development, QA, Visual QA, Text/Localization QA, Security Guardian, SEO, GEO, Content, News, Journal, Analytics, Payment/Market Research, DevOps.

## 3) Agent Registry — قالب اجباری هر Agent
هر Agent باید این فیلدها را داشته باشد (این فیلدها در Phase 16 پر می‌شوند؛ اینجا فقط قالب منجمد می‌شود):

| فیلد | توضیح |
|---|---|
| Agent ID | شناسه یکتا |
| Name | نام |
| Purpose | هدف دقیق و محدود |
| Inputs | ورودی‌های مجاز |
| Outputs | خروجی‌های مجاز |
| Allowed Tools | ابزارهای مجاز (از Tool Registry) |
| Forbidden Actions | اقدامات صریحاً ممنوع |
| Permissions | سطح دسترسی (از Permission Matrix) |
| Risk Class | R0–R4 |
| Execution Mode | READ_ONLY / DRY_RUN / STAGING / PRODUCTION |
| Health | HEALTHY / DEGRADED / UNHEALTHY / CRITICAL / UNKNOWN / OFFLINE |
| Owner | مسئول انسانی |
| Version | نسخه Contract |

## 4) نمونه Permission Matrix (Least Privilege) — مثال الگو
| Agent | Read CMS | Search/Research | Analytics Read | Signal Publish | Payment Write | Database Delete |
|---|---|---|---|---|---|---|
| SEO Agent | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Content Agent | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| QA Agent | ✓ (Read-only) | ✗ | ✓ | ✗ | ✗ | ✗ |
| Chief/Governor | ✓ | ✓ | ✓ | ✗ (هرگز) | ✗ | ✗ |
| DevOps Agent | ✗ | ✗ | ✗ | ✗ | ✗ | فقط با Approval صریح R4 |

**هیچ Agent‌ای هرگز مجوز Signal Publish ندارد** — این عملیات همیشه Human-Only است و در Permission Matrix هیچ Agent، از جمله Chief/Governor، نباید این حق را داشته باشد.

## 5) Event / Hook / Rule / Task / Workflow / Automation — تعریف
- **Event** = اتفاقی که رخ داده (گذشته، غیرقابل تغییر)
- **Hook** = نقطه واکنش به یک Event
- **Rule** = قانون/Invariant که همیشه باید برقرار باشد
- **Task** = یک کار محدود و مشخص
- **Workflow** = زنجیره‌ای از Taskها
- **Automation** = اجرای Deterministic یک Workflow شناخته‌شده (نه Loop نامحدود LLM)

### Event Catalog (نمونه اولیه — تکمیل در Phase 16/17)
UserRegistered, SubscriptionPurchased, SubscriptionExpired, PaymentSucceeded, PaymentFailed, SignalDrafted, SignalValidated, SignalPublished, NotificationCreated, NotificationDelivered, ArticleDrafted, ArticlePublished, QAFailed, SecurityAlert, DeploymentCompleted, IncidentCreated.

### Hook Catalog (نمونه اولیه)
PreSignalPublish, PostSignalPublish, PrePaymentUpdate, PostPaymentUpdate, PreDeploy, PostDeploy, PreArticlePublish, PostArticlePublish.

### Rule Catalog (نمونه اولیه — غیرقابل نقض)
1. سیگنال بدون Human Confirmation منتشر نمی‌شود.
2. عملیات حساس Production نیازمند Approval است.
3. Fail شدن QA اجباری، Release را Block می‌کند.
4. هیچ حذف یا تغییر مخرب بدون بررسی و مسیر Rollback انجام نمی‌شود.
5. هیچ Capability تأییدشده بدون دلیل/اثر/Risk/جایگزین/Rollback حذف نمی‌شود.

## 6) Task Status (واژگان استاندارد — الزامی برای همه Taskها)
NEW, QUEUED, CLAIMED, RUNNING, WAITING, VERIFYING, RETRYING, SUCCESS, PARTIAL_SUCCESS, BLOCKED, FAILED, ESCALATED, CANCEL_REQUESTED, CANCELLED, EXPIRED

## 7) Agent Lifecycle
REGISTERED, STARTING, READY, BUSY, DEGRADED, PAUSED, DRAINING, QUARANTINED, OFFLINE, RETIRED

## 8) Execution Mode
READ_ONLY, DRY_RUN, STAGING, PRODUCTION

## 9) Risk Model
| کلاس | معنا | نمونه |
|---|---|---|
| R0 | Observation | خواندن Log، گزارش‌گیری |
| R1 | Low-Risk Reversible | تغییر متن پیش‌نویس، Draft محتوا |
| R2 | Moderate Controlled | تغییر تنظیمات غیر-حساس در Staging |
| R3 | High-Impact | تغییر ساختار داده، انتشار محتوای عمومی |
| R4 | Critical/Irreversible/Production-Sensitive | Migration، حذف Production، تغییر Payment، تغییر دسترسی، انتشار Signal (که هرگز به AI واگذار نمی‌شود) |

هر عملیات R3/R4 نیازمند **Approval Required** انسانی است، بدون استثنا.

## 10) 24/7 Operation Model
`Scheduler → Event → Queue → Worker → Retry/Fallback (با سقف) → Monitoring → Recovery/Escalation`
— نه Infinite LLM Loop. Task State هرگز در Error از بین نمی‌رود؛ Retry دارای Backoff و سقف تلاش است؛ بعد از اتمام سقف، Escalation به انسان.

## 11) Observability — Admin-Safe Explanation
به‌جای ذخیره/نمایش زنجیره فکر خام مدل، هر اجرای Agent باید این فیلدها را ثبت کند:
Objective, Plan Summary, Evidence, Assumptions, Alternatives, Decision, Rationale, Uncertainty, Risk, Tools, Sources, Result, Next Action.

## 12) MCP Governance
هر MCP Server قبل از استفاده باید این بررسی‌ها را پاس کند: Source Review, Permission Review, Security Review, Capability Review, Rate Limit Review, Auditability Review. تنها در صورت نیاز واقعی اضافه می‌شود (Useful > Numerous؛ پرهیز از Tech Zoo).

## 13) Model Portability
نام مدل هرگز در Business Logic Hard-code نمی‌شود. اولویت CLINE: GLM-5.3-Flash (اول) → DeepSeek V4-Flash یا مسیر Flash سازگار فعلی (دوم)، پشت یک Provider/Model Adapter. در Rate Limit/Failure: Retry with Backoff → Fallback Model → Preserve Task State → Continue/Escalate.
