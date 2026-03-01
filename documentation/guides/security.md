# Security Guide

## Identity & Access
- Clerk handles credential storage + MFA; `auth.ts` validates JWTs server-side and auto-syncs missing users on first request.
- All protected endpoints call `auth()` with optional role args. Soft-deleted or blocked users are denied globally.
- Case-level sharing uses `CaseAccess` rows, so even clients can be assigned granular folders without elevating their global role.
- Frontend enforces route-level permissions with `<RequireRole>` but never trusts client state; every mutation re-validates on the server.

> Source: advyon-server/src/app/middlewares/auth.ts (c73ac5a)
> Source: advyon-server/src/app/modules/caseAccess/caseAccess.route.ts (c73ac5a)
> Source: advyon-client/src/components/auth/RequireRole.jsx (c73ac5a)

## Network & Application Safeguards
- Rate limiting tiers (`globalRateLimiter`, `authRateLimiter`, `paymentRateLimiter`, `webhookRateLimiter`) protect sensitive endpoints.
- File uploads pass through `fileUploadSecurity` before Cloudinary, blocking executable extensions, sanitizing filenames, and enforcing size limits.
- Socket.io handshake replays JWT verification, attaches `userId`, and isolates rooms by user/case/chat to prevent leakage.
- Swagger docs exist for transparency, but ensure they are gated in production with admin credentials or IP filtering.

> Source: advyon-server/src/app/middlewares/rateLimiter.ts (c73ac5a)
> Source: advyon-server/src/app/middlewares/fileUploadSecurity.ts (c73ac5a)
> Source: advyon-server/src/app/modules/socket/socket.service.ts (c73ac5a)

## Data Protection
- Mongo collections use soft delete flags plus pre-query hooks (`Case`, `Legal`) to prevent accidental exposure of deleted records.
- `SystemSettings` toggles features (AI, community, billing); keep this singleton locked down to super admins and audit changes via `AuditLog`.
- Payment data never stores PANs; only Stripe IDs + metadata exist in `Payment` documents. Webhooks validate signatures using `express.raw` payloads.
- Document metadata references Cloudinary URLs; raw files never touch Mongo, and `fileUploadSecurity` prevents malicious payloads.

> Source: advyon-server/src/app/modules/case/case.model.ts (c73ac5a)
> Source: advyon-server/src/app/modules/admin/systemSettings.model.ts (c73ac5a)
> Source: advyon-server/src/app/modules/payment/payment.route.ts (c73ac5a)
> Source: advyon-server/src/app/modules/document/document.model.ts (c73ac5a)

## AI & Community Safeguards
- Community posts run through `CommunityModerationService` which records toxicity/spam scores and can queue manual reviews with appeals.
- AI endpoints sanitize/scope messages, maintain per-user context, and record tool usage for auditability (`AIToolHistory`).
- When AI analysis finishes, results emit via Socket.io plus `Notification` rows; clients without proper case access never receive those events because rooms follow `user:<id>`.
- Threats such as prompt injection are mitigated by sanitizing user-generated content and passing only necessary context to providers.

> Source: advyon-server/src/app/modules/community/community.service.ts (c73ac5a)
> Source: advyon-server/src/app/modules/community/community.moderation.model.ts (c73ac5a)
> Source: advyon-server/src/app/modules/ai/ai.tool.model.ts (c73ac5a)

## Secrets & Configuration
- Keep `.env` files out of source control (gitignored). Use secret managers or CI vaults for production.
- Rotate keys whenever migrating environments (Clerk, Stripe, Mongo credentials, AI API keys). Document rotations in `reports/`.
- Ensure Stripe webhook endpoint is configured with the latest signing secret; replays fail fast thanks to rate limiter + signature checks.
- Do not log tokens or request bodies that may contain PII. Review logs before sharing with third parties.

> Source: advyon-server/src/app/config/index.ts (c73ac5a)
> Source: reports/ (c73ac5a)

## Incident Response
1. **Contain** – revoke affected tokens via Clerk dashboard, disable relevant features in `SystemSettings` if needed.
2. **Investigate** – query `AuditLog`, `Activity`, and `AIToolHistory` to reconstruct actions.
3. **Remediate** – patch vulnerabilities, rotate keys, redeploy.
4. **Communicate** – update stakeholders and add a note to `reports/merge-checklist.md` for traceability.


