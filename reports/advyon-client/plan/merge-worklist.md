# advyon-client Merge Worklist

## Branch: `sro/feat/foundation-document-reliability`
- [ ] Merge router updates with future AI/Admin routes while keeping `RouteErrorBoundary`.  
  Files: `src/routes/index.jsx`, `src/components/RouteErrorBoundary.jsx`.
- [ ] Land document viewer suite (`DocumentAdapter`, `PDFViewer`, `DocumentErrorBoundary`, `useDocumentDownload`) and verify against server download endpoints.  
  Test: manual preview of PDF/image/docx + download gating.
- [ ] Integrate `syncUserWithRetry` across `DashboardLayout` and ensure Clerk fallback flows.  
  Test: simulate API failure to trigger retry UI.
- [ ] Normalize `useDocumentsStore` duplicates + telemetry.  
  Test: add temporary unit/smoke check.
- [ ] Update onboarding/auth flows to Zod schemas; confirm parity with backend.

## Branch: `ihm/feat/ai-community-intelligence`
- [ ] Merge AI Tools page/tests and ensure route wrappers preserved.  
  Files: `src/pages/dashboard/AIToolsPage.jsx/.test.jsx`, `src/routes/index.jsx`.
- [ ] Reconcile community components + schemas with existing validation.  
  Files: `src/features/community/*`, `src/store/useCommunityStore.js`.
- [ ] Validate export/download flows for AI tool history (CSV/JSON).  
  Manual test w/ mocked store data.

## Branch: `sif/feat/core-practice-operations`
- [ ] Resolve dependency additions (FullCalendar/Recharts) alongside other package updates.  
  Files: `package.json`, `package-lock.json`.
- [ ] After merge, run `npm install && npm run build` to ensure bundler aware of new deps.

## Branch: `ab/feat/admin-commerce-governance`
- [ ] Add Billing/Admin routes + nav while preserving guards and error boundaries.  
  Files: `src/routes/index.jsx`, `src/components/Sidebar.jsx`.
- [ ] Integrate Stripe client + billing/admin services; confirm env config handling.  
  Files: `src/lib/stripe/stripeClient.js`, `src/services/{admin,billing}/*.js`, `.env` guidance.
- [ ] Prepare manual QA script for AdminPanel + Billing flows (plan upgrade, cancel, portal, audit logs).

## Verification Checklist
- [ ] `npm run lint` (after combined merges).
- [ ] `npm run build`.
- [ ] Targeted Vitest suites: `src/hooks/__tests__/useAuthApi.test.js`, `src/store/useCommunityStore.test.js`, `src/pages/dashboard/AIToolsPage.test.jsx`.
- [ ] Manual regression: document preview/download, AI tools, admin dashboard, billing.
