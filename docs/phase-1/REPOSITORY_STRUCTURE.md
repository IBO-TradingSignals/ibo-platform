# IBO — REPOSITORY STRUCTURE (Phase 1)

## ساختار پیشنهادی Monorepo
```
ibo-platform/
├── apps/
│   ├── backend/                 # NestJS API — Single Source of Truth Business Logic
│   ├── admin-web/                # Admin App (خروجی AI Studio Track B — از Phase 6)
│   ├── user-web/                  # User Web/PWA (خروجی AI Studio Track A — از Phase 7)
│   └── android/                   # پروژه Android (خروجی AI Studio Android — از Phase 8، ZIP Import)
├── packages/
│   ├── contracts/                 # OpenAPI Spec + Generated Types — مصرف مشترک همه Appها
│   ├── design-tokens/              # Design System مشترک (رنگ/فونت/RTL-LTR/Spacing)
│   └── shared-utils/                # ابزارهای مشترک غیر-Business (فرمت تاریخ/عدد چندزبانه و ...)
├── services/
│   └── worker/                     # Queue Worker (Notification Delivery, News Ingest, Journal jobs)
├── docs/
│   ├── phase-0/                     # پکیج Phase 0 (بدون تغییر)
│   ├── phase-1/                     # همین پکیج
│   └── registries/                  # Agent/Skill/Tool/MCP Registry (تکمیل از Phase 16 به بعد)
├── infra/
│   ├── docker-compose.yml          # محیط توسعه (Postgres, Backend, Worker)
│   └── ci/                          # تعریف CI Pipeline (Build/Test/Lint فقط در این Phase)
├── .github/
│   └── workflows/                   # GitHub Actions
├── .env.example                     # فقط نمونه؛ هرگز مقدار واقعی
├── .gitignore
├── package.json                     # ریشه Workspace
└── README.md                        # سطح Repository (انگلیسی، فنی)
```

## قوانین این ساختار
1. هیچ Business Logic خارج از `apps/backend` پیاده نمی‌شود. Clientها فقط از `packages/contracts` مصرف می‌کنند.
2. `apps/android` تا Phase 8 خالی/Placeholder می‌ماند (چون خروجی AI Studio است، نه دستی نوشته می‌شود).
3. `apps/admin-web` و `apps/user-web` تا Phase 6/7 خالی/Placeholder می‌مانند.
4. `docs/phase-0/` هرگز در فازهای بعدی Overwrite نمی‌شود؛ فقط فازهای جدید به‌صورت پوشه جدید (`phase-2/`, `phase-3/`, ...) اضافه می‌شوند — این خودش یک Audit Trail طبیعی از تصمیمات پروژه است.
5. `.env.example` فقط اسم متغیرها را نشان می‌دهد (مثل `DATABASE_URL=`)، هرگز مقدار واقعی.

## خروجی مورد انتظار از CLINE در پایان Phase 1
- تمام پوشه‌های بالا ساخته شده (حتی اگر برخی فقط شامل یک `.gitkeep` یا `README.md` Placeholder باشند).
- `apps/backend` یک پروژه NestJS خالی/Bootstrap شده (فقط Health-check Endpoint، بدون هیچ Entity واقعی Business).
- `packages/contracts` یک فایل OpenAPI حداقلی (`openapi.yaml`) فقط شامل همان Health-check Endpoint — تکمیل واقعی در Phase 2.
- CI حداقلی که روی هر Push/PR: Install → Lint → Build → (Unit Test اگر تستی موجود بود) را اجرا کند.
