# advyon-server Merge Worklist

## Branch: `sro/feat/foundation-document-reliability`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Introduce `fileUploadSecurity` middleware and ensure all upload routes invoke it. | Planned | Middleware spec captured; pending branch checkout (fetch blocked). |
| Merge document controller/service updates for signed content + batch downloads. | Ready | Blocked on coordinated client merge; see cross-repo risk “Document Download Contract”. |

## Branch: `ihm/feat/ai-community-intelligence`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Add OpenRouter config + AI context/tool modules; register models/services. | Planned | Requires secrets inventory + infra approval before merge. |
| Integrate community moderation/KPI services with existing community routes. | Planned | Schema drift review scheduled with operations branch owners. |
| Run new Jest suites (`ai-context-manager`, `ai.tool`, `community.*`). | Planned | To execute immediately after code lands; will attach logs to SSOT. |

## Branch: `sif/feat/core-practice-operations`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Layer analytics, case automation, schedule, messaging, notification, personalization modules. | Planned | Requires fresh fetch; meanwhile contracts documented in branch-status/team4-operations.md. |
| Ensure archive scheduler + task generator registered in bootstrap. | Planned | Add ADR once module wiring confirmed. |
| Plan manual/API tests (schedule, notifications, archive flows). | In Progress | Test matrix drafted inside manual-verification.md. |

## Branch: `ab/feat/admin-commerce-governance`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Add governance configs (CORS, rateLimiter, Stripe) and update `app.ts`. | Planned | Need ops approval for new middleware ordering. |
| Merge admin refactor + audit logs/system settings models. | Planned | Waiting for schema migration strategy. |
| Integrate payment/subscription modules + webhook controller. | Planned | Stripe test keys available; webhook tunnel plan pending. |
| Update contracts + CODEOWNERS/PR template. | In Progress | Draft template lives in branch; will validate once code merges. |

## Verification Checklist

| Check | Status | Notes |
| --- | --- | --- |
| `npm run lint` & `npm run build` | Planned | Execute after merging first branch to verify baseline. |
| AI/community Jest suites | Planned | Must run post-merge with TensorFlow deps installed. |
| Manual API tests (documents, AI, admin, payments, schedule, notifications) | Planned | Scripts enumerated in manual-verification.md. |
| Stripe webhook dry run | Planned | Pending payment module merge + test secret configuration. |
