# GITHUB HANDOFF — Phase 2

## اقدامات مالک
1. مطمئن شوید PR #1 (Phase 1) واقعاً Merge شده و `main` به‌روز است.
2. Branch جدید بسازید: `feature/phase-2-data-api` (یا اجازه بدهید OpenCode بسازد).
3. مستندات این پکیج (`docs/phase-2/`) را اضافه کنید.
4. `OPENCODE_PHASE_02_EXECUTION_PROMPT.md` را به OpenCode CLI بدهید (نه CLINE — طبق تغییر Toolchain).
5. PR جدید باز می‌شود؛ **Merge نکنید** تا من Review کنم — دقیقاً همان روندی که برای Phase 1 جواب داد (ZIP خروجی یا لینک PR را برایم بفرستید، **هرگز Token/Secret را در چت پیست نکنید**).

## یادآوری امنیتی (تکراری اما مهم)
اگر OpenCode CLI هم نیاز به یک GitHub Credential دارد، طبق CREDENTIAL_AND_SECRETS_MODEL.md یک PAT Fine-grained مجزا و Scoped به همین Repository برایش تنظیم کنید — همان یکی که برای CLINE ساخته بودید را می‌توانید (پس از Revoke کردن نسخه‌ای که در چت لو رفت) دوباره برای OpenCode استفاده کنید، یا یک توکن کاملاً جدید بسازید؛ تفاوتی از نظر امنیتی ندارد، مهم این است که هیچ‌گاه در چت نوشته نشود.

## قدم بعدی پس از تأیید
Claude فایل‌های Phase 3 (Backend + Auth) را تولید می‌کند: پیاده‌سازی واقعی JWT (User/Agent مجزا طبق API_CONTRACTS.md)، Guardهای واقعی روی هر Endpoint، و اولین Migration واقعی برای جدول User/Role.
