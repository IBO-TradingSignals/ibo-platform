# IBO — GOOGLE AI STUDIO STRATEGY (Phase 0 Baseline)

⚠️ این سند بر اساس بررسی مستندات رسمی Google در تاریخ ۱۳ سپتامبر ۲۰۲۶ نوشته شده. چون قابلیت‌های AI Studio به‌سرعت تغییر می‌کنند، Claude موظف است پیش از شروع هر Phase اجرایی (به‌ویژه Phase 6, 7, 8) این بخش را دوباره از منابع رسمی راستی‌آزمایی کند.

## 1) وضعیت فعلی تأییدشده (Web / PWA / Full-stack)
- Google AI Studio Build Mode برای Web از **GitHub Import** (از ۸ ژوئیه ۲۰۲۶) و **Two-way Sync** (به‌روزرسانی مرداد/آگوست ۲۰۲۶) پشتیبانی کامل می‌کند: تغییرات AI Studio می‌توانند مستقیماً با Commit Message خودکار به GitHub Push شوند و تغییرات محلی/تیم نیز به AI Studio Pull می‌شوند.
- امکان ساخت Full-stack Web App با Server-side Runtime (Node.js) وجود دارد.
- خروجی جایگزین: دانلود ZIP برای توسعه محلی، Deploy مستقیم به Cloud Run، یا Hand-off به Google Antigravity (با حفظ تاریخچه گفتگو و Secrets).
- کلید Gemini API به‌صورت خودکار و فقط Server-side تنظیم می‌شود (هرگز در کد Client قرار نمی‌گیرد).

نتیجه برای IBO: مسیر Web/PWA (User App و Admin App) می‌تواند از همان ابتدا با GitHub Sync کار کند — یعنی حلقه `AI Studio → GitHub → CLINE → GitHub → Claude Review` برای Web کاملاً عملی است.

## 2) وضعیت فعلی تأییدشده (Android)
- طبق مستند رسمی `ai.google.dev/gemini-api/docs/aistudio-android` (آخرین به‌روزرسانی ۱۸ آگوست ۲۰۲۶): **«ZIP download only: … GitHub export is not yet available for Android projects.»**
- یعنی برخلاف برخی اعلامیه‌های اولیه I/O (مه ۲۰۲۶) که از قابلیت Export مستقیم به GitHub برای Android صحبت می‌کردند، مستند رسمی فعلی صراحتاً این قابلیت را «هنوز در دسترس نیست» اعلام کرده است. سند رسمی و تازه‌تر ملاک عمل است.
- پروژه Android در AI Studio با Kotlin/Jetpack Compose ساخته می‌شود، در Emulator داخل مرورگر قابل تست است، و از طریق ADB روی گوشی فیزیکی نصب می‌شود.
- مسیر توسعه فراتر از AI Studio: دانلود ZIP → Import به Android Studio → ادامه توسعه/GitHub در آنجا (نه از داخل خود AI Studio).

نتیجه برای IBO: مسیر Android **جدا از حلقه GitHub خودکار** برنامه‌ریزی می‌شود:
`AI Studio (Android) → ZIP Export → Import به Android Studio محلی مالک → Push دستی به GitHub از Android Studio → Claude Review`

این مغایرتی با Blueprint ایجاد نمی‌کند چون خود Blueprint (بند ۳۲۲ و ۳۲۸ سند مادر) از قبل همین احتیاط را پیش‌بینی کرده بود: «مسیر Android باید جداگانه در برنامه‌ریزی لحاظ شود» و «Claude باید هنگام اجرای واقعی وضعیت فعلی را بررسی کند».

## 3) دو مسیر مستقل (طبق قانون قطعی Blueprint)
### Track A — User-Facing App
- Web/PWA: از طریق AI Studio Build Mode + GitHub Sync.
- Android: از طریق AI Studio Android Build + ZIP Export دستی.

### Track B — Admin App
- یک App کاملاً جدا (New App مستقل در AI Studio)، نه بخشی از User App.
- در نسخه اول فقط Web (برای Admin معمولاً Native Android لازم نیست مگر مالک بخواهد).
- همان قاعده GitHub Sync برای Web برقرار است.

## 4) مرز دقیق کاری AI Studio (تکرار قانون Blueprint)
AI Studio فقط این‌ها را می‌سازد:
- Design System اولیه، صفحات پایه، Navigation، Layout، Responsive foundation، RTL/LTR foundation
- Component skeletons، API contract placeholders/interfaces
- Mock data با برچسب صریح `MOCK/PLACEHOLDER`

AI Studio **نباید** Business Core حساس (Payment واقعی، Signal Authority، Production Credentials، انتشار خودکار سیگنال) را با داده ساختگی به‌جای سیستم واقعی جا بزند.

## 5) اولین استفاده واقعی از AI Studio — کِی؟
طبق Roadmap، اولین Promptهای واقعی AI Studio در **Phase 6 (Admin App Foundation)** و **Phase 7 (User Web/PWA Foundation)** تولید می‌شوند — یعنی پس از:
- Phase 1: تثبیت Repository/Architecture
- Phase 2: Data Model + API Contracts (تا Placeholderهای AI Studio با Contract واقعی هم‌راستا باشند)
- Phase 3: Backend + Auth پایه

Phase 0 هیچ Prompt اجرایی برای AI Studio تولید نمی‌کند (به همین دلیل USER_APP_PROMPT.md و ADMIN_APP_PROMPT.md در این پکیج N/A هستند).

## 6) منابع رسمی استفاده‌شده برای این راستی‌آزمایی
- https://ai.google.dev/gemini-api/docs/aistudio-build-mode
- https://ai.google.dev/gemini-api/docs/aistudio-android
