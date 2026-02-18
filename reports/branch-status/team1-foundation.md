# Team 1 - Foundation & Document Reliability

## Branch Identity
- Workflow doc branch: `sro/feat/foundation-document-reliability`
- SSOT / execution alias: `sro/feat/foundation-document-reliability`
- Owners: frontend-lead, backend-lead, qa-testing-lead, security-engineer (Team 1 pod)
- Code areas: auth flows, onboarding hooks, dashboard document views, server document module

## Current Status (2026-02-18)
- Client and server code for the foundation branch are merged into `ihm/fix/merge-teamwork` (see `advyon-client/src/routes/index.jsx`, `src/features/documents/components/*`, `src/hooks/useAuthApi.js`, and `advyon-server/src/app/middlewares/fileUploadSecurity.ts`).
- Verification is blocked: `cmd /c npm run lint` (client) reports 118 React 19 errors, `cmd /c npm run build` refuses to run under Node v22.11.0, and server `npm install` fails to download `stripe/node-cron/uuid`, preventing `tsc` and Jest from executing.
- SSOT rows should remain `IP` until lint/build/test logs and manual evidence are attached; feature flags for risky UI (document viewer, download flows) remain enabled.

## Completed Work to Date
- Route error boundaries now wrap Workspace, Document Viewer, Text Review, AITools, Admin, and Billing (`advyon-client/src/routes/index.jsx`).
- Document viewer stack landed (DocumentAdapter, DocumentErrorBoundary, PDFViewer) plus the download hook (`src/hooks/useDocumentDownload.js`) and telemetry updates in `src/store/documents.js`.
- Auth resiliency (`syncUserWithRetry` in `src/hooks/useAuthApi.js` + `DashboardLayout.jsx`) and Zod schemas for auth/document flows (`src/lib/validation/*.js`).
- Server-side security additions: `fileUploadSecurity` middleware and new download/batch-download endpoints in `src/app/modules/document/*` and `case.route.ts`.

## Outstanding Scope Summary
1. **Verification Debt** - Fix React 19 ESLint errors, upgrade Node to >=22.12 (or 20.19 LTS) so Vite builds and Vitest can run, and capture lint/build/test logs for WBS-1.2/1.3/5.3/5.4/5.5.
2. **Server Dependency Install** - Resolve `npm install` EACCES errors so `stripe/node-cron/uuid` install; rerun `npm run lint`, `npm run build`, and targeted Jest for document uploads/downloads.
3. **Manual Evidence** - Execute the auth/document manual suites (providers, preview, download security, upload guards) and attach artifacts plus server log excerpts.
4. **Telemetry/Test Coverage** - Add store/hooks tests for the new download hook, telemetry, and retry logic; current coverage relies solely on manual QA.

## Concerns / Risks Before Merge
- Lint/build blockers prevent regression detection; shipping without resolving React 19 ESLint errors risks runtime issues (`react-refresh/only-export-components`, hook purity warnings).
- Server dependency installation failure means Stripe SDK and cron scheduler are missing, so document download KPI logging and upload guard monitoring cannot be exercised end-to-end.
- Manual verification remains outstanding; without evidence QA cannot close WBS-5.3/5.4/5.5.
- Shared validation remains unproven; if server schemas diverge while tooling is broken, client-side Zod may reject valid payloads.

## Manual Verification Plan
1. **Auth providers** - Remove GitHub button, exercise email + Google sign in/out, capture Clerk console logs.
2. **Login sync resilience** - Simulate API failure, observe retry/backoff, confirm fallback onboarding route and user messaging.
3. **Zod validation** - Run automated schema script against auth/onboarding/document forms; capture CLI output.
4. **Workspace document preview** - Test PDF/Docx/Image/large file/mobile/offline scenarios, confirm loading + error boundary.
5. **Document preview page** - Validate print/share/version controls and fallback download; capture audit log for downloads.
6. **Download security** - Attempt expired/foreign signed URLs and batch progress/resume flows; confirm rejection logs.
7. **Upload security** - Upload disallowed MIME + oversize files; verify rejection + telemetry.
8. **Unit/integration tests** - `npm run build` + targeted Jest once tooling issues are cleared.

## Pre-Merge Checklist
- [ ] Fix client ESLint errors and rerun `cmd /c npm run lint`.
- [ ] Upgrade Node and rerun `cmd /c npm run build` plus targeted Vitest suites (use `npx vitest run src/hooks/__tests__/useAuthApi.test.js ...`).
- [ ] Resolve server `npm install` failures, then rerun `cmd /c npm run lint`, `cmd /c npm run build`, and targeted Jest for document upload/download modules.
- [ ] Execute the manual verification suites above; attach screenshots/logs to SSOT WBS rows.
- [ ] Update SSOT with links to the logs and manual artifacts once all evidence is captured.
