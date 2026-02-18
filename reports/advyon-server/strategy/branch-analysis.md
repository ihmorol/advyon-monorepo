# advyon-server Branch Analysis & Risk Assessment

## `sro/feat/foundation-document-reliability`

### Scope Overview
- Adds `fileUploadSecurity` middleware guarding MIME/type/size and applies it to case/document upload routes.
- Expands document controller/service/validation with signed download URLs, batch-download API, Cloudinary safety improvements.

### File-by-File Notes
| File | Summary | Risks | Test Gaps |
| --- | --- | --- | --- |
| `.gitignore` | Adds `.agents/.codex/.opencode`. | None. | N/A |
| `package.json` / `lock` | Minor dependency alignment; ensure reconciliation with other branches. | Potential lock conflicts. | N/A |
| `src/app/middlewares/fileUploadSecurity.ts` | New middleware verifying extensions/MIME, sanitizing file names, enforcing size limit (50MB default). | Must be registered before upload routes; currently added in `case.route.ts` but not `document.route.ts`? (requires verification). | No dedicated unit tests; consider adding fast tests. |
| `src/app/modules/case/case.route.ts` | Adds middleware + cleanup formatting. | Need to ensure duplicate route definitions (upload at bottom) are consistent; double registration risk. | No route tests. |
| `src/app/modules/document/document.controller.ts/.service.ts/.validation.ts/.route.ts` | Implements signed content fetching, download endpoint, batch download, improved validation. | relies on `DocumentService` to stream from storage; ensure Cloudinary credentials accessible. Batch download returns URL list but no rate limiting. | No new tests for controller/service; high-risk functions. |

#### Merge Outcome & Follow-ups (2026-02-18)
- `fileUploadSecurity` and the new document download/batch routes are merged in `src/app/modules/{case,document}`.
- `cmd /c npm run lint` now surfaces 577 errors across the server (numerous `no-explicit-any`, missing Jest globals).
- `cmd /c npm run build` cannot run because `npm install` failed to download `stripe`, `node-cron`, and `uuid`; TypeScript cannot resolve those modules.
- Targeted Jest suites for uploads/downloads have not run; `cmd /c npm run test` fails with `spawn EPERM`.

## `ihm/feat/ai-community-intelligence`

### Scope Overview
- Massive AI + community feature drop: OpenRouter config, AI context manager/service/tests, AI tool models/services/tests, community moderation queue (models, services, KPI tracking), sanitizer, and updated controllers/routes.

### Notable Files & Risks
| Area | Files | Risks | Tests |
| --- | --- | --- | --- |
| Config | `src/app/config/openrouter.config.ts` | Stores API keys; ensure env vars present. | No dedicated tests. |
| AI Context | `src/app/modules/ai/ai-context-manager.service.ts` + `.test.ts`, `ai.context.model.ts` | Provides persistent context with guardrails. | Dependent on Mongo indexes; ensure migrations. Tests exist but limited to service-level behavior. |
| AI Tools | `ai.tool.model.ts`, `ai.tool.service.ts`, `ai.tool.service.test.ts`, `ai.tool.interface.ts`, `ai.controller.ts`, `ai.route.ts`, `ai.validation.ts`, `ai.service.ts` | Exposes /ai/tools endpoints. | Rate limiting? ensure `rateLimiter` merges later. Tests cover service but not controller/route integration. |
| Sanitization | `input-sanitizer.ts` | Shared for AI/community. | Ensure reused by community controllers; missing tests beyond usage. |
| Community | `community.*` suite (controller, service, interface, model, moderation interface/model/service/test, KPI model/service, ai-assist service/test, validation/test, route) | Adds moderation (toxicity detection), KPI tracking, AI assist features. | Heavily touches existing schema; risk of drift with operations/admin additions to `community.model.ts`. Tests exist for moderation + AI assist + validation but not for controllers. |

### Additional Observations
- New dependencies introduced via package-lock (TensorFlow libs?). Need to verify install footprint.
- Ensure environment has necessary GPU/CPU support; fallback path defined? (check service). Possibly heavy build times.

#### Merge Outcome & Follow-ups (2026-02-18)
- AI routes, services, and tests are merged, but Jest cannot start (`cmd /c npm run test` fails with `spawn EPERM`), so none of the new suites have executed.
- ESLint reports extensive `no-explicit-any` usage across AI/community modules; remediation is required before promoting the branch.
- Infrastructure dependencies (TensorFlow, OpenRouter API keys) remain unverified until `npm install` issues are resolved.

## `sif/feat/core-practice-operations`

### Scope Overview
- Broad operational enhancements: scheduling, notifications, messaging, personalization, analytics, archive automation.

### Key Areas
| Area | Files | Risks | Tests |
| --- | --- | --- | --- |
| Analytics | `analytics.controller.ts`, `.route.ts`, `.service.ts`, `.validation.ts` | Adds metrics endpoints. | Must ensure KPI service integration w/ admin branch. No new tests. |
| Case Management | `archive-scheduler.ts`, `case.constant.ts`, `case.controller.ts`, `.interface.ts`, `.model.ts`, `.route.ts`, `.service.ts`, `.template.ts`, `task.generator.ts` | Introduces archive automation, templates, task generation. | Cron tasks require scheduler bootstrap; ensure entry point registers them. No automated tests verifying scheduler. |
| Messaging/Notifications | `message.*`, `notification.*`, `socket.service.ts` | Adds messaging flows, socket integration. | Overlaps with admin branch rate-limiter/auth; high conflict risk. No tests. |
| Schedule | `schedule.*` | Adds CRUD for calendar events. | Needs timezone handling; no tests. |
| Personalization/User | `user.personalization.*`, `user.*` updates | Adds personalization preferences. | Schema migrations needed; ensure backward compatibility. No tests. |
| Activity Interface | `activity.interface.ts` changes | Must ensure downstream modules updated. | No tests. |
| package files | adds dependencies for scheduler, etc. | Need install/test. |

### Additional Observations
- No documentation/test artifacts despite wide surface area. Regression risk high.

#### Merge Outcome & Follow-ups (2026-02-18)
- Schedule, notification, messaging, personalization, analytics, socket, and archive scheduler modules are merged, but no automated tests or cron dry runs have executed.
- Missing dependencies from `npm install` (notably `node-cron`) block TypeScript builds and runtime validation of the archive scheduler.
- Manual API verification for schedule/notification flows remains outstanding; capture Postman or curl logs before enabling related client features.

## `ab/feat/admin-commerce-governance`

### Scope Overview
- Introduces governance tooling: CORS config, Stripe integration (payment/subscription modules + webhook controller), rate limiting, admin refactor (audit logs, system settings), analytics KPI service, health route, CODEOWNERS, PR template, env example updates.

### Key Files & Risks
| Area | Files | Risks | Tests |
| --- | --- | --- | --- |
| Repo Ops | `.env.example`, `.github/pull_request_template.md`, `CODEOWNERS`, `.gitignore` | Governance improvements. | Ensure template matches required sections; CODEOWNERS conflicts possible. | N/A |
| Config | `src/app.ts`, `src/app/config/*.ts` (CORS, index, stripe), `rateLimiter.ts` | Adds middleware + Stripe config. | Must ensure rate limiter applies before new API routes; double-check CORS for Stripe webhooks. | No tests. |
| Admin Module | `admin.controller.ts`, `.interface.ts`, `.route.ts`, `.service.ts`, `.validation.ts`, `auditLog.model.ts`, `systemSettings.model.ts` | Full admin center backend. | Overlaps with AI/community modifications (analytics). Need to ensure new models registered with Mongoose once. No tests. |
| Analytics | `analytics/kpi.service.ts` | Extends analytics to include KPIs from AI/community. | Keep in sync with operations analytics. No tests. |
| Payment/Subscription | `payment.*`, `payment.validation.ts`, `subscription.*`, `stripe.config.ts`, `payment.webhook.controller.ts` | Handles billing flows + Stripe webhooks. | Requires webhook secret envs; risk if missing. Need idempotency + signature validation. No tests. |
| Contracts | `contracts/*.ts` | Formalizes admin/payment contracts. | Must align with client services. | No tests (pure types). |
| Routes | `src/app/routes/index.ts` | Registers new routers. | Merge carefully with AI/community/ops to avoid dropping existing mounts. | No tests. |

### Additional Observations
- Stripe integration demands secure secret management; ensure `.env` guidance updated.
- Lacks automated tests for critical payment flow; plan test backlog.

#### Merge Outcome & Follow-ups (2026-02-18)
- Governance artifacts (CODEOWNERS, PR template) and admin/payment/subscription modules are merged, but `npm install` cannot download `stripe`, so the Stripe SDK is unavailable.
- `cmd /c npm run build` fails because `stripe`, `node-cron`, and `uuid` cannot be resolved; `cmd /c npm run lint` highlights widespread `no-explicit-any` usage in payment/webhook controllers.
- Stripe webhook drills and admin/billing manual QA must remain blocked until dependencies install and Jest/eslint are green.

---

**Global Concerns**
- None of the large backend branches (operations, admin) include migration scripts; deploying without data prep may break production.
- Need load/perf testing for new AI + payment dependencies.
- Ensure `npm run lint`/`npm run test` pipelines updated to include new suites.
