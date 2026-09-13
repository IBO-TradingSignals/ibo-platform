# IBO — PRODUCT BIBLE (Phase 0 Baseline)

## 1) هویت برند (تغییرناپذیر)
- نام: IBO
- لوگو، هویت بصری، شعار اصلی: بدون تغییر نسبت به نسخه قبلی، مگر با تأیید صریح مالک.
- هرگونه Rebrand یا تغییر نام ممنوع است مگر با درخواست مکتوب مالک.

## 2) تعریف محصول
IBO یک پلتفرم چندپلتفرمی اشتراک‌محور برای ارائه خدمات سیگنال معاملاتی است.

IBO **نیست**:
- Trading Bot خودکار
- Autonomous AI Trader
- سیستمی که بدون تأیید انسان سیگنال منتشر کند

IBO **هست**:
- یک اکوسیستم (Backend مرکزی + چند Client + Admin Command Center + CMS + News/Journal) که در آن تحلیلگر انسانی سیگنال را می‌سازد و تأیید می‌کند، و AI فقط در نقش‌های غیر-Signal (اعتبارسنجی ساختاری، فرمت‌دهی، QA، تحقیق، خلاصه‌سازی خبر، تولید محتوا با بازبینی انسانی) کمک می‌کند.

## 3) دامنه خدمات (Scope)
سه حوزه اصلی، هرکدام با ساختار مستقل و قابل توسعه:

| حوزه | زیرمجموعه‌ها |
|---|---|
| Binary Options | International, OTC |
| Cryptocurrency | Spot, Futures |
| Forex / Global Markets | ساختار مستقل، آماده افزودن Instrumentهای جدید |

## 4) خارج از Scope (Non-Scope) در نسخه اول
موارد زیر عمداً از فاز اول محصول خارج‌اند و فقط با تأیید صریح مالک و اجرای فرآیند Change Control وارد Scope می‌شوند:
- اجرای خودکار معامله (Auto-Execution) روی حساب کاربر — **همیشه ممنوع**، نه فقط «فاز اول».
- صدور سیگنال بدون تأیید انسان — **همیشه ممنوع**.
- افزودن بازارهای جدید (مثل Commodities، Indices اختصاصی) — نیازمند تأیید و بازتعریف Template.
- ادغام مستقیم با کارگزاری‌های شخص ثالث برای اجرای معامله — خارج از Scope تا تصمیم جداگانه مالک.
- GitLab/Bitbucket/Jira/Confluence — تا زمانی که نیاز واقعی اثبات نشود.
- Kubernetes — در شروع لازم نیست؛ Docker کافی است.

## 5) قانون قطعی حاکمیت سیگنال (Signal Governance) — غیرقابل مذاکره
1. سیگنال نهایی فقط توسط مالک/تحلیلگر انسانی در Admin App ایجاد و تأیید می‌شود.
2. AI هرگز به‌تنهایی سیگنال معاملاتی ایجاد، تأیید یا منتشر نمی‌کند.
3. جریان انتشار سیگنال ثابت و اجباری است:
   `Create → Validate → Preview → Human Confirm → Publish → Event → Audience Filter → Queue → Delivery → Journal → Audit`
4. هیچ مرحله‌ای از این زنجیره حذف یا Bypass نمی‌شود، حتی برای «تست» یا «Demo»، مگر در محیط Sandbox کاملاً جدا و برچسب‌گذاری‌شده.
5. AI مجاز است در نقش‌های زیر کمک کند: اعتبارسنجی ساختاری فرم، فرمت‌دهی، News Intelligence، Journal Analysis، QA، تحقیق، گزارش‌گیری — و بس.

## 6) Subscription Model (اصول)
Plan ≠ Subscription ≠ Entitlement — این سه Entity مستقل‌اند:
- **Plan**: Name, Duration, Price, Entitlements
- **Subscription**: User, Plan, Start, End, Status
- **Entitlement**: Binary (OTC/International), Crypto (Spot/Futures), Forex, و قابلیت‌های آینده

یک اشتراک می‌تواند فقط زیرمجموعه‌ای از حوزه‌ها را پوشش دهد (مثلاً فقط Crypto).

## 7) اصول محتوا و SEO/GEO
- ممنوع: Fake Traffic، Fake Ranking، Keyword Stuffing، Mass Low-Value Pages، محتوای کپی.
- چرخه الزامی: Research → Search Intent → Topic Opportunity → Draft → Source/Facts → SEO Review → GEO Review → Localization → Policy Review → Publish → Measure → Update.
- News و Journal مستقل از Signal Generation‌اند و هرگز نباید به تولیدکننده مخفی سیگنال تبدیل شوند.

## 8) پنج‌زبانه و Regionalization
Language ≠ Country ≠ Locale. فرض‌های ساده‌انگارانه (مثل «English یعنی UK» یا «Arabic یک بازار واحد است») ممنوع است. Country Intelligence شامل: Language, Locale, Country, Currency, Payment Options, Communication, Content Context, Operational Constraints, Legal/Compliance Notes.

اقدامات مالکیتی (KYC، ثبت حساب، قرارداد، حساب بانکی) همیشه Human Action Required هستند و هرگز توسط AI یا اتوماسیون انجام نمی‌شوند.

## 9) امنیت — قانون Secrets
هیچ‌گاه Password، Private Key، Seed Phrase، اطلاعات کارت پرداخت، API Secret یا مدارک هویتی داخل Prompt، Log، Screenshot یا فایل‌های عادی Repository قرار نمی‌گیرد.

## 10) اصل عدم‌فرسایش (No Destructive Drift)
هیچ Capability تأییدشده بدون ذکر دلیل، اثر، Risk، جایگزین و Rollback حذف یا تضعیف نمی‌شود. این قانون برای همه ۱۰۰+ اصل Blueprint اصلی برقرار است و در این پکیج نقض نشده است.

## 11) وضعیت نسبت به پروژه قبلی
پروژه قبلی عمداً حذف شده است. هیچ کد، Schema، UI یا تصمیم معماری قبلی بدون تأیید صریح و مکتوب مالک فرض یا منتقل نمی‌شود. بازسازی از صفر است؛ فقط هویت برند حفظ می‌شود.
