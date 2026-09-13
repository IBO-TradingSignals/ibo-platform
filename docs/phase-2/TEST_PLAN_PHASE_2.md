# IBO — TEST PLAN (Phase 2 specific)

| سطح | وضعیت | معیار |
|---|---|---|
| 1. Build/Syntax | ✅ فعال | `pnpm build` سبز |
| 2. Unit | ✅ فعال | تست State Machine سیگنال (مسیر موفق + حداقل یک مسیر خطا) |
| 3. Integration | ⏳ محدود (بدون DB واقعی خارج از Docker محلی) | `prisma migrate dev` بدون خطا |
| 4. API/Data | ✅ فعال | OpenAPI Valid؛ Shape پاسخ Endpointها با Schema یکی است |
| 5-7. UI/Localization | ⏳ N/A | تا Phase 6/7 |
| 8. Security | ✅ فعال (محدود) | بدون Secret؛ TODO صریح برای Auth (چون Auth واقعی Phase 3 است) ثبت شده، نه پنهان |
| 9. Performance/Accessibility | ⏳ N/A | — |
| 10. Regression/Release | ✅ فعال | Composite 1..2: بدون تغییر در docs/phase-0 و phase-1؛ Health Endpoint Phase 1 دست‌نخورده |

## Composite Test
Composite 1..2 — شامل تست مجدد Health-check (نباید توسط تغییرات Phase 2 خراب شود) + تست‌های جدید Phase 2.

## معیار ویژه این Phase (فراتر از ۱۰ سطح استاندارد)
یک تست حاکمیتی اضافه: **Governance Test** — بررسی صریح که هیچ مسیر کد یا Endpoint ای امکان نمی‌دهد Signal بدون عبور از `confirm` (توسط User واقعی) به `PUBLISHED` برسد. این تست FAIL باید همیشه Build را متوقف کند، حتی اگر بقیه تست‌ها Pass باشند.
