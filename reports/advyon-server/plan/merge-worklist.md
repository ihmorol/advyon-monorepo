# advyon-server Merge Worklist

## Branch: `sro/feat/foundation-document-reliability`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Introduce `fileUploadSecurity` middleware and ensure all upload routes invoke it. | Done | `src/app/middlewares/fileUploadSecurity.ts` is committed and wired into `case.route.ts` and `document.route.ts`. |
| Merge document controller/service updates for signed content + batch downloads. | Done (needs tests) | `src/app/modules/document/document.controller.ts/.service.ts/.route.ts` expose `/documents/:caseId/:documentId/download` and `/documents/batch-download`. Targeted Jest still blocked (see verification). |

## Branch: `ihm/feat/ai-community-intelligence`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Add OpenRouter config + AI context/tool modules; register models/services. | Done | `src/app/config/openrouter.config.ts`, `ai-context-manager.service.ts`, `ai.tool.*`, and supporting services/tests exist. Secrets pull from `config`. |
| Integrate community moderation/KPI services with existing community routes. | Done (lint debt) | `src/app/modules/community/**` implements moderation queue, sanitizer, KPI service, and AI assist endpoints. ESLint now flags dozens of `any` usages that must be tightened. |
| Run new Jest suites (`ai-context-manager`, `ai.tool`, `community.*`). | Blocked | `cmd /c npm run test` fails with `spawn EPERM` before suites execute; environment cannot fork Jest workers yet. |

## Branch: `sif/feat/core-practice-operations`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Layer analytics, case automation, schedule, messaging, notification, personalization modules. | Done | Modules for schedule (`src/app/modules/schedule/*`), notification, message, analytics/KPI, socket, personalization, and archive scheduler (`case/archive-scheduler.ts`, `task.generator.ts`) are present. |
| Ensure archive scheduler + task generator registered in bootstrap. | Done (needs runtime proof) | `src/app/modules/case/archive-scheduler.ts` and `task.generator.ts` ship alongside `socket.service.ts`; runtime verification pending until `npm run dev`/cron smoke test is possible. |
| Plan manual/API tests (schedule, notifications, archive flows). | Ready | Scenarios documented in `reports/branch-status/manual-verification.md`. Awaiting build/test green lights. |

## Branch: `ab/feat/admin-commerce-governance`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Add governance configs (CORS, rateLimiter, Stripe) and update `app.ts`. | Done | `src/app.ts` now loads `rateLimiter`, CORS config, and registers admin/payment/subscription routes. |
| Merge admin refactor + audit logs/system settings models. | Done | `src/app/modules/admin/**` introduces audit log + system settings models plus enhanced controllers/services. |
| Integrate payment/subscription modules + webhook controller. | Done (deps missing) | `src/app/modules/payment/**`, `subscription/**`, and `src/app/config/stripe.config.ts` exist, but `npm install` cannot pull `stripe`, `uuid`, or `node-cron` due to EACCES errors, causing `tsc` failures. |
| Update contracts + CODEOWNERS/PR template. | Done | Contracts and governance artifacts ship with the branch (`contracts/*.ts`, `.github/pull_request_template.md`, `CODEOWNERS`). |

## Verification Checklist

| Check | Status | Notes |
| --- | --- | --- |
| `cmd /c npm install` | Failed | Registry downloads for `stripe`/`uuid` return `EACCES`; logs stored in `advyon-server/.npm-cache/_logs/2026-02-18T12_10_43_109Z-debug-0.log`. Missing modules directly block builds. |
| `cmd /c npm run lint` (2026-02-18) | Failed | ESLint reported 577 errors/84 warnings (e.g., `no-explicit-any`, missing jest globals, control-character regex). Lint must be triaged after dependency install succeeds. |
| `cmd /c npm run build` | Failed | `tsc` cannot resolve `stripe`, `node-cron`, or `uuid` because npm install failed. |
| `cmd /c npm run test` | Blocked | Jest worker startup throws `spawn EPERM`, so no suites execute. |
| Manual API tests (documents, AI, admin, payments, schedule, notifications) | Pending | Scripts enumerated in `reports/branch-status/manual-verification.md`; require green builds + deployed deps. |
| Stripe webhook dry run | Pending | Blocked behind missing `stripe` dependency and build failures. |
