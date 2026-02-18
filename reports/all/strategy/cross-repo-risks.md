# Cross-Repo Merge Strategy & SSOT Coverage

## Key Cross-Cutting Issues
1. **Router Alignment (Client) vs API Registration (Server)**  
   - Client routes for Document Viewer, AI Tools, Admin, Billing rely on matching server endpoints.  
   - Server routes (`/documents`, `/ai/tools`, `/admin`, `/subscriptions`) must ship before UI toggles flip.  
   - **Handling:** Router merge sequence tracked inside `reports/advyon-client/plan/merge-worklist.md`; each route stays behind existing feature flags until server readiness is confirmed via manual verification matrix.
2. **Document Download Contract**  
   - Client `useDocumentDownload` expects `/documents/:caseId/:documentId/download` plus `/documents/batch-download`.  
   - **Handling:** Tagged as blocker for Team 1 WBS-5.3/5.4/5.5. Client/server foundation branches will merge simultaneously, followed by manual preview/download checks logged in SSOT.
3. **AI Tooling**  
   - `AIToolsPage` + stores call `/ai/tools/history`, `/ai/tools/export`, `/ai/tools/run`.  
   - **Handling:** Keep AI Tools UI disabled until server AI branch completes verification (Team 3 playbook). After merge, capture evidence for WBS-3.2/3.3 (client) and KPI endpoints (server) before loosening flags.
4. **Admin & Billing**  
   - Client AdminPanel/Billing depend on `/admin/*`, `/subscriptions/*`, `/payments/*`, `/admin/settings`, `/payment/webhook`.  
   - **Handling:** Governance branch must land first; then enable `systemSettings.features.billing/admin` and execute billing/admin QA scripts from manual-verification doc before exposing UI broadly.
5. **Operations Features**  
   - Client currently lacks UI for schedule/notification even though dependencies are queued.  
   - **Handling:** Leave dependencies unmerged until Team 4 scope is ready or explicitly revert; SSOT Team 4 rows stay `NS` with note referencing this decision.
6. **Validation & Schema Sync**  
   - Client Zod schemas for auth/doc/community require server parity.  
   - **Handling:** SSOT WBS-1.4/SM-MVP-02 remain `IP`; record deviations + blockers per team subrows until parity validated.
7. **Testing Gaps**  
   - Backend operations/admin modules lack automation; client document/admin UI also untested.  
   - **Handling:** Map each gap to WBS-TD entries (CQ/TS/SC). Create follow-up tickets for DocumentAdapter unit tests, Admin/Billing UI tests, and new server suites.

## SSOT Tracker Hooks (Updated)
- Team 1 rows (WBS-1.2/1.3/5.3/5.4/5.5) now reference the merge plan. Status stays `NS`, notes cite `reports/advyon-client/plan/merge-worklist.md` to show prep work.  
- WBS-1.4 + WBS-SM-MVP-02 remain `IP` with explicit note: “Team 3 done; Team 1/2/4 pending schema parity per plan.”  
- Team 2 WBS-10.x rows reference branch-status plan; still `NS`.  
- Team 5 WBS-11.1 & 12.1 note that governance/Stripe work depends on admin branch plan.  
- Program OPS tasks keep `NS` but mention CODEOWNERS/PR template pending in admin branch.

## Merge Execution Order (Recommended)
1. Merge foundation branches (client + server) ? run document/auth regression + download contract tests.  
2. Merge AI branches (client + server) ? execute Team 3 manual suite + jest targets.  
3. Merge operations server branch ? hold client dependency commit until UI ready; validate schedule/notification APIs via Postman scripts.  
4. Merge admin/billing (server first) ? configure Stripe/webhooks, then enable client UI and run billing/admin QA.  
5. After each wave, reconcile package locks, rerun `npm run build` / targeted tests, and update SSOT evidence links.

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
- Confirm whether remote fetch access can be restored; otherwise plan manual patching for latest commits.  
- Decide whether to hold operations deps or fast-follow UI work; document decision in Team 4 SSOT notes.  
- Align on automated test strategy for new UI/modules (DocumentAdapter, AdminPanel, Billing, operations APIs) and capture it as follow-up tasks.