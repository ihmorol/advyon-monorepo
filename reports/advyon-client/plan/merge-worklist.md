# advyon-client Merge Worklist

## Branch: `sro/feat/foundation-document-reliability`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Merge router updates with AI/Admin routes while keeping `RouteErrorBoundary`. | Done | `advyon-client/src/routes/index.jsx` now wraps Workspace, Document Viewer, Text Review, AI Tools, Admin, and Billing routes in `RouteErrorBoundary` while preserving `RequireRole` guards. |
| Land document viewer suite (`DocumentAdapter`, `PDFViewer`, `DocumentErrorBoundary`, `useDocumentDownload`) and verify endpoints. | Done (needs QA) | `src/features/documents/components/*` plus `src/hooks/useDocumentDownload.js` feed `DocumentViewerPage.jsx` and `WorkspaceView.jsx`. Manual preview/download evidence still needs to be captured after server build succeeds. |
| Integrate `syncUserWithRetry` across `DashboardLayout` and ensure Clerk fallback flows. | Done | `src/layouts/DashboardLayout.jsx` uses `syncUserWithRetry` from `src/hooks/useAuthApi.js` with retry + onboarding fallback, satisfying WBS-1.3. |
| Normalize `useDocumentsStore` duplicates + telemetry. | Done (tests pending) | `src/store/documents.js` now keeps a single `activeCaseId`, caches downloads, and logs upload funnel telemetry. Store tests remain unimplemented. |
| Update onboarding/auth flows to Zod schemas; confirm parity with backend. | Done (needs parity audit) | `src/lib/validation/authSchemas.js` and `documentSchemas.js` back the updated `SignInForm`, `SignUpForm`, and `OnboardingFlow`. Need to cross-check against server validators once backend lint/build stabilize. |

## Branch: `ihm/feat/ai-community-intelligence`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Merge AI Tools page/tests and keep route wrappers intact. | Done (tests blocked) | `/dashboard/ai-assistant` renders `AIToolsPage` behind `RouteErrorBoundary`, and `src/pages/dashboard/AIToolsPage.test.jsx` plus `src/store/useCommunityStore.test.js` exist. Vitest cannot run yet (see verification log). |
| Reconcile community components + schemas with server validation. | Done (monitor drift) | Client schemas under `src/features/community/schemas/communitySchemas.js` mirror new backend validators (`advyon-server/src/app/modules/community/community.validation.ts`). Keep risk flag open until server build/test finish. |
| Validate export/download flows for AI tool history (CSV/JSON). | Pending manual QA | UI hooks (`useAIStore`) implement CSV/JSON exports, but no manual QA evidence is attached yet. Runs must wait for backend verification. |

## Branch: `sif/feat/core-practice-operations`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Resolve dependency additions (FullCalendar/Recharts) with other package updates. | Done (awaiting bundle proof) | `package.json` pulls in `@fullcalendar/*`, `recharts`, `socket.io-client`, etc., and node_modules contains them. Need a successful build once Node is upgraded. |
| Run `npm install && npm run build` post-merge to confirm bundler support. | Blocked | `cmd /c npm run build` fails because Node v22.11.0 does not satisfy Vite's requirement (>=22.12). |

## Branch: `ab/feat/admin-commerce-governance`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Add Billing/Admin routes + nav while preserving guards/error boundaries. | Done | Sidebar + router entries for `/dashboard/admin` (behind `RequireRole`) and `/dashboard/billing` are merged. |
| Integrate Stripe client + billing/admin services; confirm env handling. | Done (blocked on server deps) | `src/lib/stripe/stripeClient.js`, `src/services/admin/adminService.js`, and `src/services/billing/billingService.js` call the new APIs. Full validation waits on server installs for `stripe`, `node-cron`, and `uuid`. |
| Prepare manual QA script for AdminPanel + Billing flows. | Ready | Scenarios captured in `reports/all/strategy/cross-repo-risks.md`; execution deferred until build/test issues clear. |

## Verification Checklist

| Check | Status | Notes |
| --- | --- | --- |
| `cmd /c npm run lint` (2026-02-18) | Failed | React 19 ESLint rules surfaced 118 errors (unused `motion` imports, `react-refresh/only-export-components`, hook purity concerns). Logs retained from the 18:05 local run. |
| `cmd /c npm run build` | Blocked | Vite requires Node 20.19+ or 22.12+. Current environment is 22.11.0 (`node -v`), so the build aborts before verifying the operations dependencies. |
| `cmd /c npx vitest run src/hooks/__tests__/useAuthApi.test.js src/store/useCommunityStore.test.js src/pages/dashboard/AIToolsPage.test.jsx` | Blocked | Vitest fails during startup because `vite.config.js` cannot be bundled (same `spawn EPERM` seen in build). |
| Manual regression (document preview/download, AI tools, admin dashboard, billing) | Pending | Manual playbooks in `reports/branch-status/manual-verification.md` remain open; execution postponed until builds/tests can run. |
