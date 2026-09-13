# IBO — TEST PLAN / TESTING GATES (Phase 0 Baseline)

## 1) تست ده‌مرحله‌ای استاندارد هر Phase (از Phase 1 به بعد فعال می‌شود)
1. Build/Syntax
2. Unit
3. Integration
4. API/Data
5. UI/Navigation
6. Responsive + RTL/LTR
7. Localization/Text
8. Security
9. Performance/Accessibility
10. Regression/Release

## 2) قانون Composite Test
پس از هر Phase:
- تست اختصاصی همان Phase (۱۰ مرحله بالا)
- Composite Test تمام Phaseهای قبلی (تجمعی)

نمونه: Phase 3 کامل شد → ابتدا Phase 3 تست می‌شود → سپس Composite 1..3 اجرا می‌شود.

## 3) نقاط عطف بزرگ (طبق مدل ۳۰ پارت قبلی، برای سازگاری)
- در Part/Phase 20: Phase 20 Test + Composite 1..20
- در Part/Phase 30 (در صورت استفاده از ساختار قدیمی): Part 30 Test + Composite 1..30 + Hardcore Master Audit

## 4) سیاست شکست (Failure Policy)
```
FAIL → STOP → Diagnose → Fix → Retest → Composite Retest
```
هیچ Phase بعدی قبل از حل کامل Regression باز نمی‌شود.

## 5) تعریف Regression معنادار
هرگونه:
- شکست در Test Level 8 (Security) یا 10 (Regression/Release) → همیشه معنادار.
- تغییر رفتار مستندشده در API Contract بدون تأیید → معنادار.
- کاهش پوشش زبان/RTL-LTR نسبت به Baseline قبلی → معنادار.
در صورت گستردگی یا عدم قطعیت دامنه Regression، Composite Retest کامل (نه فقط Phase فعلی) اجرا می‌شود.

## 6) تست‌های حاکمیتی Phase 0 (به‌جای ۱۰ تست فنی)
چون Phase 0 کد/UI تولید نمی‌کند، معیار پذیرش این پکیج چهار تست زیر است (شرح در PHASE_0_PLAN.md بخش ۹):
1. Completeness Test
2. Consistency Test
3. Non-Drift Test
4. Owner Confirmation Test

## 7) مسئولیت اجرای تست
- Build/Syntax/Unit/Integration/API: CLINE (به‌عنوان Coding Worker) اجرا و گزارش می‌کند.
- UI/Navigation/Responsive/RTL-LTR/Localization: ترکیب Visual QA Agent + بررسی انسانی مالک از طریق Screenshot/Preview.
- Security: Security Guardian Agent + بررسی نهایی انسانی برای هر تغییر R3/R4.
- Regression/Release: Claude (Repository Review) پیش از باز کردن Phase Gate بعدی.
