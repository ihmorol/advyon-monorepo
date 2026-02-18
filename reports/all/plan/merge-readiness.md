# Merge Readiness Plan – advyon-client & advyon-server

## Phase 0 – Preflight
- Snapshot current branch (`ihm/fix/merge-teamwork`) for both repos and capture `docs/task-orchestration/SSOT_WBS_TRACKER.md` state.
- Ensure no untracked changes besides `.gitignore` edits; log `git status -sb` for traceability.
- Use existing remote refs (fetch blocked) and export per-branch file lists to drive analysis.
- Create report structure under `/reports/{advyon-client,advyon-server,all}/{strategy,plan}` for downstream artifacts.

## Phase 1 – advyon-client Merge Order
1. **sro/feat/foundation-document-reliability**  
   - Merge router wrappers (`src/routes/index.jsx`) without losing upcoming AI/Admin routes.  
   - Land `RouteErrorBoundary`, loading skeletons, `DocumentAdapter`, `useDocumentDownload`, Zod schemas.  
   - Update `DashboardLayout` to rely on `syncUserWithRetry` (from hook changes below).  
   - Normalize `useDocumentsStore` (remove duplicate `activeCaseId`, add telemetry + download funnel).  
   - Remove GitHub auth option, align onboarding/document validation with new schemas.
2. **ihm/feat/ai-community-intelligence**  
   - Re-point `/dashboard/ai-assistant` to `AIToolsPage` while keeping error boundaries.  
   - Merge AI/community store changes and test files (`useCommunityStore.test.js`, `AIToolsPage.test.jsx`).  
   - Confirm client-server contract for AI tool history/metrics exists before release.
3. **sif/feat/core-practice-operations**  
   - Resolve dependency bumps (FullCalendar/Recharts) with prior changes; ensure `package-lock.json` keeps Stripe/foundation updates.  
   - Re-run `npm install && npm run build` to verify bundles.
4. **ab/feat/admin-commerce-governance**  
   - Add Billing/Admin routes + sidebar entries, Stripe client, admin/billing services.  
   - Extend `.env` for publishable key (keep secrets local) and align `.gitignore`.  
   - Smoke-test new pages with mocked APIs until server merge completes.

## Phase 2 – advyon-server Merge Order
1. **sro/feat/foundation-document-reliability**  
   - Introduce `fileUploadSecurity` middleware and hook into every upload route.  
   - Merge document controller/service changes (download + batch download) so client hook contract is satisfied.  
   - Run targeted Jest covering uploads/downloads.
2. **ihm/feat/ai-community-intelligence**  
   - Add OpenRouter config, AI context manager, tool services, moderation/KPI layers.  
   - Reconcile community/service models with ops/admin schema changes to avoid enum drift.  
   - Execute provided Jest suites after merge.
3. **sif/feat/core-practice-operations**  
   - Layer schedule, notification, message, personalization modules on top of foundation changes.  
   - Ensure archive scheduler/task generator files are referenced during bootstrap.  
   - Run integration tests (schedule + notifications) or manual cURL validation.
4. **ab/feat/admin-commerce-governance**  
   - Wire new configs (CORS, Stripe), rate limiter, admin/payment/subscription modules.  
   - Update `src/app.ts` + `src/app/routes/index.ts` to register new routers alongside AI/ops endpoints.  
   - Verify admin analytics/KPI endpoints remain compatible with AI metrics additions.

## Phase 3 – Cross-Repo Alignment
- Confirm API contracts for documents, AI tools, admin/billing, schedule/notifications match client expectations before release.
- Update SSOT tracker rows per WBS with merged evidence (commits, test logs, manual verification).  
- Populate `/reports/advyon-client/*`, `/reports/advyon-server/*`, `/reports/all/*` with:
  - Conflict matrices (strategy).  
  - Resolution steps, verification commands, and SSOT linkage (plan).  
- After all merges, run `npm run build` (client) and `npm run build && npm run test` or targeted suites (server); attach logs to reports.

## Risk Mitigation Hooks
- Treat `src/routes/index.jsx`, `src/store/documents.js`, `src/layouts/DashboardLayout.jsx`, and `src/app/modules/case/document/*.ts` as high-conflict files—resolve using 3-way diff rather than manual copy/paste.
- Keep dependency updates atomic: resolve `package-lock.json` once per repo after all branch merges, then install to validate.  
- Use targeted tests (Vitest/Jest) listed above to prove merged functionality before updating SSOT statuses.