# GITHUB HANDOFF — Phase 1

## اقدامات لازم مالک (به ترتیب)
1. اگر هنوز نساخته‌اید: Repository private با نام `ibo-platform` بسازید.
2. `docs/phase-0/` و `docs/phase-1/` (این پکیج) را به Repository اضافه کنید (Commit مستقیم روی `main` برای مستندات مشکلی ندارد، چون کد نیست).
3. Branch Protection روی `main` فعال کنید: حداقل «Require pull request before merging».
4. مطمئن شوید PAT/MCP گیت‌هاب که برای CLINE تنظیم کرده‌اید، فقط به همین Repository Scope دارد (طبق CREDENTIAL_AND_SECRETS_MODEL.md).
5. `CLINE_PHASE_01_EXECUTION_PROMPT.md` را به CLINE بدهید تا روی Branch `feature/phase-1-scaffold` اجرا کند.
6. پس از اتمام کار CLINE، Pull Request باز می‌شود — آن را Merge نکنید تا Claude خروجی را بررسی کند.

## چیزی که در این Phase لازم نیست
- هیچ Login به Google AI Studio.
- هیچ Screenshot از UI (چون UI ای وجود ندارد).
- هیچ Secret واقعی.

## معیار عبور
- CI سبز + عدم وجود Secret + بدون تغییر در `docs/phase-0/` + تأیید Claude پس از Repository Review.

## قدم بعدی پس از تأیید
Claude فایل‌های Phase 2 (Data Model + API Contracts) را تولید می‌کند: Schema دقیق تمام Entityهای فهرست‌شده در ARCHITECTURE_MAP.md، OpenAPI Contract کامل (نه فقط Health-check)، و اولین `CLINE_PHASE_02_EXECUTION_PROMPT.md`.
