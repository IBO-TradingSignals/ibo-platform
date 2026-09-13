# IBO — TEST PLAN (Phase 1 specific)

Phase 1 فقط اسکلت خالی است؛ بنابراین از ۱۰ سطح استاندارد (TEST_PLAN.md کلی، از Phase 0)، فقط این‌ها معنا دارند:

| سطح | وضعیت در Phase 1 | معیار |
|---|---|---|
| 1. Build/Syntax | ✅ فعال | `pnpm build` بدون خطا |
| 2. Unit | ⏳ N/A (چیزی برای تست واحد وجود ندارد) | — |
| 3. Integration | ⏳ N/A | — |
| 4. API/Data | ✅ فعال (فقط Health-check) | `GET /health` پاسخ 200 می‌دهد |
| 5. UI/Navigation | ⏳ N/A (تا Phase 6/7) | — |
| 6. Responsive+RTL/LTR | ⏳ N/A | — |
| 7. Localization/Text | ⏳ N/A | — |
| 8. Security | ✅ فعال (محدود) | هیچ Secret واقعی در Git History؛ `.env.example` بدون مقدار |
| 9. Performance/Accessibility | ⏳ N/A | — |
| 10. Regression/Release | ✅ فعال | مقایسه با Phase 0 — هیچ اصل Blueprint نقض نشده |

## Composite Test
Composite 1..1 (فقط همین Phase، چون اولین Phase عملیاتی است).

## معیار Fail
اگر CI قرمز شود یا Secret Scanning هشدار دهد → `STOP → Diagnose → Fix → Retest`. تا رفع کامل، PR به `main` Merge نمی‌شود.
