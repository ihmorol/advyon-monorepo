# Task Packet · WBS-10.4 Contact Page & Backend Flow

## Objective
Deliver a production-ready contact experience that lets prospects submit support/sales/legal inquiries from the public site with validated forms, branded UI, and backend routing to capture + notify Advyon staff. Must also provide office/social info and pave the way for KPI instrumentation (WBS-SM-KPI-07).

## In-Scope Files
- `advyon-client/src/pages/ContactPage.jsx`
- `advyon-client/src/features/landing/**/*` (new shared sections/assets)
- `advyon-client/src/components/ui/` for reusable 3D backgrounds + loaders
- `advyon-client/src/services/public/contactService.js`
- `advyon-server/src/app/modules/contact/**/*` (controller, route, service, model, validation)
- `advyon-server/src/app/routes/index.ts`
- `advyon-server/src/app/modules/analytics/support-kpi.service.ts` (or instrumentation hook)
- Documentation under `docs/task-orchestration/*` for API proof + evidence

## Out-of-Scope
- Dashboard/contact center UI (Team 4/5 scope)
- Admin workflows unrelated to contact ticket intake
- Email delivery infrastructure beyond basic nodemailer SMTP configuration
- Localization copywriting (English only for this pass)

## API Contract Changes
| Route | Method | Description |
| --- | --- | --- |
| `/contact` | `POST` | Anonymous-friendly endpoint that accepts `{ fullName, email, orgName, role, message, urgencyKey, topicKey, attachments? }`. Validates via Zod, persists ticket, optionally emails support, and enqueues instrumentation event. Returns ticket summary and reference code. |
| `/contact/meta` | `GET` | Public metadata aggregator for contact form (topics, urgency). Reads from `metadata` service cache. |
| `/contact/health` | `GET` (optional) | Simple readiness check for monitoring (200 + version). |

Response envelope continues to use `sendResponse`. Attach `referenceId` and `slaEstimateHours`.

## Data / Schema Changes
- New `ContactTicket` Mongoose model:
  - `referenceId`, `fullName`, `email`, `orgName`, `role`, `topicKey`, `urgencyKey`, `message`, `attachments`, `status`, `source` (`public-site`), `ipAddress`, `userAgent`.
  - Auto timestamps.
- Optional `SupportKpi` model or incremental counters under analytics module (used for WBS-SM-KPI-07).
- Seed defaults for topics + urgency come from metadata constants for parity with front-end.

## Acceptance Checklist Mapping
- **Contact form** → `/contact` endpoint + client page with inline validation, success state.
- **Email integration** → nodemailer transport triggered when env config present; log fallback otherwise.
- **Support ticket creation** → `ContactTicket` persisted storing structured data and reference ID.
- **Office locations** → static dataset rendered on page, referencing brand guidelines (NYC, SF, London).
- **Social links** → Provide icons + accessible copy linking to LinkedIn, X, YouTube.
- **Instrumented KPI** → fire `SupportTicketMetric` event recorded by analytics service (ties into WBS-SM-KPI-07 acceptance).

## Test Plan
- **Server unit/integration**
  - Zod validation happy-path + failure cases.
  - Service test ensures reference IDs unique and instrumentation invoked.
  - Supertest route test hitting `/contact` with sample payload (no auth) returns 201.
- **Client**
  - Vitest/RTL for `ContactForm` component verifying validation and API interaction (mock service).
  - Motion snapshots optional (Storybook later) — ensure forms accessible via keyboard.
- **Manual**
  - Submit form locally, confirm success message + network call.
  - Verify DB ticket creation and instrumentation entry.

## Rollback Plan
- Feature flag via env `PUBLIC_CONTACT_ENABLED`. Setting to `false` disables route + hides UI CTA (fallback to mailto link).
- Revert `contact` module + client page if blocking issue; metadata + other modules unaffected.
- Tickets created before rollback remain stored.

## Risks / Blockers
- Outbound email requires valid SMTP creds; use `.env` gating to avoid failures (log-only fallback).
- Rate-limiting / abuse: rely on existing global limiter plus additional IP-based limiter for `/contact`.
- Animation-heavy UI might affect performance; ensure `prefers-reduced-motion` fallback and lazy-load 3D assets.
