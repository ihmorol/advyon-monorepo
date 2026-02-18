# Cross-Repo Merge Strategy & SSOT Coverage

## Key Cross-Cutting Issues
1. **Router Alignment (Client) vs API Registration (Server)**  
   - Client routes for Document Viewer, AI Tools, Admin, Billing rely on corresponding server endpoints.  
   - Ensure server routes (`/documents`, `/ai/tools`, `/admin`, `/subscriptions`) are merged before enabling UI via feature flags.
2. **Document Download Contract**  
   - Client `useDocumentDownload` expects `/documents/:caseId/:documentId/download` and `/documents/batch-download`.  
   - Server foundation branch supplies these; must land together to avoid 404s.
3. **AI Tooling**  
   - `AIToolsPage` + stores call `/ai/tools/history`, `/ai/tools/export`, `/ai/tools/run`.  
   - Server AI branch introduces these endpoints plus telemetry; coordinate deployment order.
4. **Admin & Billing**  
   - Client AdminPanel/Billing pages rely on `/admin/*`, `/subscriptions/*`, `/payments/*`, `/admin/settings`, `/payment/webhook`.  
   - Server governance branch must merge before exposing UI; also apply feature flags via `systemSettings`.
5. **Operations Features**  
   - Client currently lacks UI for operations dependencies despite adding FullCalendar/Recharts. Server introduces scheduling/notifications—plan follow-up client work or remove unused deps to comply with SSOT.
6. **Validation & Schema Sync**  
   - Client adds Zod schemas for auth/doc/community; ensure server validation matches. Document deviations in WBS tracker if not implemented.
7. **Testing Gaps**  
   - Most new backend modules lack tests except AI branch. Document viewer, Admin/Billing UI also lack automated coverage. Track as debt in SSOT WBS-TD buckets.

## SSOT Tracker Hooks
- WBS-1.2/1.3/1.4 (Team 1) now have client-side work queued; backend components pending. Update SSOT once merges/test evidence captured.
- WBS-3.x tasks largely complete per SSOT; ensure new files map to existing evidence (commit refs).  
- WBS-4.x/5.x/7.x/9.x/10.x/11.x/12.x still `NS`; operations/admin branches supply code but lack validation/tests—keep `IP` until verified.
- Program governance WBS-OPS-01..06: CODEOWNERS/PR template/rate limiter/branch protections handled partially in admin branch; record in tracker with evidence.

## Merge Execution Order (Recommended)
1. Merge foundation branches (client + server). Run document + auth regression.
2. Merge AI branches (client + server). Run AI tool + community moderation suites.
3. Merge operations server branch; hold client dependency change until UI ready or add feature flags. Validate schedule/notification flows.
4. Merge admin/billing (server first, then client). Configure Stripe/test webhooks.
5. Reconcile package locks, rerun builds/tests, and update SSOT tracker rows with evidence links (commits, logs, manual verification notes).

## Post-Merge Validation Matrix
| Flow | Client Verification | Server Verification | Evidence Target |
| --- | --- | --- | --- |
| Document Preview/Download | Manual doc upload/preview/download in dashboard | API tests for `/documents/content` + `/download` + `/batch-download` | WBS-5.3/5.4/5.5 |
| Auth Sync | Simulate backend outage to test retry UI | Monitor `/auth/sync` logs | WBS-1.3 |
| AI Tools | Run each tool, inspect history/export | Jest suites + manual `/ai/tools/*` calls | WBS-3.2/3.3 |
| Community Moderation | Create flagged thread/reply | Validate moderation pipeline + queue state | WBS-3.1 |
| Admin Dashboard | Navigate Users/Cases/Settings tabs | API tests for `/admin/*`, audit logs | WBS-11.1 |
| Billing | Subscribe/cancel/test portal | Stripe test mode checkout + webhook | WBS-12.1 |
| Schedule/Notifications | (Future UI) confirm API responses via Postman | CRUD tests for `/schedule/*`, `/notifications/*` | WBS-6.1/9.1 |

## Outstanding Questions / Clarifications Needed
- Confirm availability of remote fetch to pull latest commits; current environment offline. Need manual sync instructions if upstream changes happen.
- Determine rollout plan for operations features on client side (no UI yet). Either add placeholder toggles or revert unused deps until feature ready.
- Decide on automated test strategy for Admin/Billing UI and DocumentAdapter; consider Cypress or React Testing Library suites.

