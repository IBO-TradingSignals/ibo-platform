# IBO — CREDENTIAL AND SECRETS MODEL (Phase 1)

## 1) هدف این سند
جواب رسمی به نیاز مالک: «CLINE نباید مدام از من بخواهد دستی وارد فلان سرویس شوم» — بدون نقض اصول Least Privilege / Human Action Required / No Destructive Drift که در Phase 0 تثبیت شد.

## 2) اصل حاکم: Scoped Credential Vault، نه Identity Delegation
تفاوت بنیادین بین این دو مدل:

| مدل | توضیح | ریسک |
|---|---|---|
| **Identity Delegation** (رد شده) | دادن دسترسی کامل و دائمی به یک حساب هویتی مادر (مثل Gmail شخصی) تا Agent بتواند «به‌جای شما» در هر سرویسی Login کند | نامحدود — اگر Agent نشت کند یا اشتباه کند، کل هویت دیجیتال/مالی به خطر می‌افتد؛ قابل Scope/Revoke دقیق نیست |
| **Scoped Credential Vault** (پذیرفته‌شده) | هر سرویس یک Token/Key مجزا، با کمترین دسترسی لازم (Least Privilege)، ذخیره‌شده در یک Secret Manager، قابل Revoke مستقل | محدود به همان سرویس؛ نشت یک Token فقط همان سرویس را تحت تأثیر قرار می‌دهد |

از این پس، **هر ابزار/سرویس یک Credential مستقل و کم‌دامنه دارد**، دقیقاً مثل الگویی که همین حالا برای GitHub (PAT مخصوص همان Repository) دارید.

## 3) نقشه Credential برای هر ابزار

| ابزار | نوع Credential پیشنهادی | دامنه دسترسی | محل ذخیره |
|---|---|---|---|
| GitHub | PAT (Fine-grained) — همان که دارید | فقط Repository `ibo-platform`؛ فقط Contents+PR+Actions | GitHub Secrets / CLINE‌s local secret store |
| Google AI Studio | API Key پروژه (Cloud Project مخصوص IBO) — نه Login شخصی Gmail | فقط Gemini API + AI Studio Build همان Project | Secret Manager محلی؛ هرگز در Prompt یا Log |
| Payment Provider (هرکدام که انتخاب شود) | API Key حالت Sandbox/Live مجزا، Webhook Secret مجزا | فقط Read/Charge محدود طبق مستندات همان Provider | Backend Secret Manager؛ هرگز در Client یا CLINE Prompt |
| Notification Providers (Email/SMS/Push) | API Key مخصوص همان سرویس | فقط Send، بدون دسترسی به Billing/Account Settings | Backend Secret Manager |
| Database | Connection String با یوزر محدود (نه Superuser) | فقط Schema مربوط به IBO؛ بدون DROP DATABASE در محیط Staging/Prod | Backend Secret Manager / Docker Secrets |

## 4) درباره Google AI Studio به‌طور خاص
Google AI Studio از طریق **API Key پروژه Google Cloud** (نه لزوماً Login شخصی Gmail) قابل استفاده برنامه‌نویسی است برای بخش‌های API-محور. اما بخش **Build Mode/UI Editor** خود AI Studio یک ابزار مبتنی‌بر مرورگر و Session انسانی است — طراحی فعلی گوگل این را برای Login خودکار دائمی توسط یک Agent باز نگذاشته (و این خودش یک تصمیم امنیتی درست از طرف گوگل است).

نتیجه عملی: کارهایی که CLINE در Terminal انجام می‌دهد (Backend, DB, API, Tests) کاملاً بدون نیاز به Login مرورگری شما قابل خودکارسازی است چون فقط به API Key/Token نیاز دارد. اما وارد شدن به رابط Build Mode گوگل AI Studio برای ساخت/ویرایش UI (Phase 6/7/8) ذاتاً یک اقدام مرورگری است و بهتر است **همچنان توسط شما و با همان Promptهایی که Claude تولید می‌کند** انجام شود — نه به این دلیل که محدودیت دلخواه ماست، بلکه چون خود پلتفرم گوگل این‌گونه طراحی شده و تلاش برای Bypass آن (مثلاً با اشتراک‌گذاری Session/Cookie شخصی) هم ناامن و هم برخلاف Terms of Service گوگل است.

## 5) قانون عملیاتی از این پس
1. هر Credential را **یک‌بار** در Secret Manager/CLINE ثبت می‌کنید (دقیقاً مثل کاری که برای GitHub انجام دادید).
2. از آن پس، برای عملیات‌های R0–R2 (طبق Risk Model Phase 0)، CLINE بدون توقف و بدون سؤال از شما اجرا می‌کند.
3. برای عملیات R3/R4 (Migration خطرناک، تغییر Payment، انتشار Production، هر چیز غیرقابل‌بازگشت) — طبق قانون خود Blueprint («Approval Required») — همچنان یک تأیید صریح از شما لازم است. این توقف‌ها حذف نمی‌شوند چون دقیقاً همان‌هایی هستند که جلوی خطای غیرقابل‌جبران را می‌گیرند.
4. مراحلی که ذاتاً نیاز به مرورگر/Session انسانی شما دارند (AI Studio Build Mode، KYC، تنظیمات بانکی) در دسته Human Action Required باقی می‌مانند — نه به‌خاطر محدودیت ما، بلکه چون خود آن پلتفرم‌ها این‌گونه طراحی شده‌اند.

## 6) جمع‌بندی برای CLINE
`CLINE_PHASE_01_EXECUTION_PROMPT.md` این سند را به‌عنوان مرجع Credential دریافت می‌کند و موظف است:
- هیچ Credential را در کد/Log/Prompt ننویسد.
- فقط از طریق متغیرهای محیطی/Secret Manager به هر سرویس متصل شود.
- اگر برای Task ای Credential جدید لازم بود، آن را به‌صورت یک درخواست مشخص («این API Key با این Scope لازم است») از شما بخواهد — نه یک درخواست مبهم مثل «برو یک‌جایی Login کن».
