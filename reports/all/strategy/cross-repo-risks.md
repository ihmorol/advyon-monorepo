# Cross-Repo Merge Strategy & SSOT Coverage

## Key Cross-Cutting Issues (Status 2026-02-18)
| Risk | Status | Notes / Mitigation |
| --- | --- | --- |
| Router alignment vs API registration | Mitigated - verification pending | Client router (`advyon-client/src/routes/index.jsx`) and server router (`advyon-server/src/app/routes/index.ts`) both expose Document Viewer, AI Tools, Admin, Billing, and Schedule routes. Manual regression remains open until lint/build/test succeed. |
| Document download contract | Implemented - needs QA evidence | `useDocumentDownload` plus the new viewer components call `/documents/:caseId/:documentId/download` and `/documents/batch-download`, which now exist server-side. Manual preview/download and audit-log checks must still run per Team 1 playbook. |
| AI tooling | Feature flagged - tests blocked | UI + stores (`AIToolsPage`, `useAIStore`, `useCommunityStore`) consume `/ai/tools/*` routes backed by the new AI modules. Leave feature flags enabled until Vitest/Jest executions produce logs and privacy controls ship. |
| Admin & billing | Code merged - blocked by missing deps | Client admin/billing flows and server modules (`admin`, `payment`, `subscription`, `stripe.config.ts`) compile logically, but `npm install` cannot pull `stripe/node-cron/uuid`, so `tsc` and Stripe webhook drills cannot run. |
| Operations features | Server ready - client UI limited | Schedule/notification/message/personalization modules exist on the server; client only has dependency scaffolding. Keep operations UI hidden behind feature flags and validate via Postman before release. |
| Validation & schema sync | Schemas aligned - parity unproven | Auth/document/community Zod schemas exist on the client and matching validators exist server-side; lint/build blockers prevent attaching schema test output to WBS-1.4/SM-MVP-02. |
| Testing gaps & tooling constraints | High risk | React 19 ESLint (client) and Jest/eslint (server) fail; Vite requires Node >=22.12 and `npm install` fails with `EACCES`. No automated evidence is available yet. |

## SSOT Tracker Hooks
- Team 1 rows (WBS-1.2/1.3/5.3/5.4/5.5) can move from `NS` to `IP` once lint/build/test output is attached; for now, notes link to `reports/advyon-client/plan/merge-worklist.md` plus the verification blockers above.
- WBS-1.4 and WBS-SM-MVP-02 stay `IP` with updated notes: “Client + server schemas merged; awaiting evidence after tooling fixes.”
- Team 2 WBS-10.x rows remain `NS`. Plan is unchanged because no public-site code landed in this cycle.
- Team 5 (admin/billing) rows cite the governance branch plan and explicitly call out the `npm install` failure that is blocking Stripe verification.
- Program OPS tasks now reference the merged CODEOWNERS/PR template from the admin branch but remain `NS` until branch protections and cadence enforcement flip on.

## Merge Execution Order (Progress)
1. Foundation (client/server) – Code merged. Pending actions: fix lint errors, unblock `npm run build`, execute document preview/download manual suite, attach logs to WBS-5.3/5.4/5.5.
2. AI (client/server) – Code merged. Pending actions: run Vitest + Jest suites, capture AI moderation/tooling manual evidence, implement privacy retention controls before widening rollout.
3. Operations (server) – Code merged on the backend with schedule/notification/message modules. Client UI remains feature-flagged until manual API validation is recorded.
4. Admin/Billing (server -> client) – Code merged across both repos, but missing npm dependencies prevent Stripe/webhook validation. Do not expose billing/admin toggles until `npm install`, `tsc`, and manual QA complete.
5. Post-wave housekeeping – Package-lock reconciliation, lint/build/test reruns, and SSOT updates are blocked by the tooling issues listed in the verification snapshot.

## Post-Merge Validation Matrix
| Flow | Client Verification | Server Verification | Evidence Target |
| --- | --- | --- | --- |
| Document Preview/Download | Manual doc upload/preview/download | `/documents/content`, `/download`, `/batch-download` API tests | WBS-5.3/5.4/5.5 |
| Auth Sync | Simulate backend outage to trigger retry UI | Monitor `/auth/sync` logs/backoff behavior | WBS-1.3 |
| AI Tools | Execute each tool, history filters, export JSON/CSV | Jest suites + `/ai/tools/*` manual cURL | WBS-3.2/3.3 |
| Community Moderation | Create flagged thread/reply scenarios | Validate moderation queue + KPI metrics | WBS-3.1 |
| Admin Dashboard | Navigate Users/Cases/Settings tabs | `/admin/*` API + audit logs | WBS-11.1 |
| Billing | Subscribe/cancel/portal flows | Stripe Checkout + webhook replay | WBS-12.1 |
| Schedule/Notifications | (Future UI) confirm API contract via mock client | `/schedule/*` + `/notifications/*` CRUD tests | WBS-6.1/9.1 |

## Outstanding Questions / Clarifications Needed
- When can we upgrade the Node runtime (>=22.12) so Vite builds and Vitest runs complete locally?
- Who can unblock `npm install` for the server (EACCES when downloading `stripe`/`uuid`)? Without that fix, TypeScript cannot compile and Stripe webhooks cannot be tested.
- Do we need interim manual evidence for operations APIs before the client UI is built, or will we hold the feature set entirely until the dashboard work lands?
- What is the agreed automation strategy for new UI/modules (DocumentAdapter, AdminPanel, Billing, schedule APIs) once tooling stabilizes?
