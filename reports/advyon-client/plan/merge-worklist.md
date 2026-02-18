# advyon-client Merge Worklist

## Branch: `sro/feat/foundation-document-reliability`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Merge router updates with AI/Admin routes while keeping `RouteErrorBoundary`. | In Progress | Conflict map captured in `reports/advyon-client/strategy/branch-analysis.md`; awaiting paired server merge to avoid orphaned routes. |
| Land document viewer suite (`DocumentAdapter`, `PDFViewer`, `DocumentErrorBoundary`, `useDocumentDownload`) and verify endpoints. | Ready | Blocked on server download contract; see cross-repo note “Document Download Contract”. |
| Integrate `syncUserWithRetry` across `DashboardLayout` and ensure Clerk fallback flows. | Ready | Retry UX spec complete; will pair with auth API merge to avoid undefined hook usage. |
| Normalize `useDocumentsStore` duplicates + telemetry. | Planned | Requires follow-up store test harness; add smoke test before marking done. |
| Update onboarding/auth flows to Zod schemas; confirm parity with backend. | Planned | Coordination with server validation owners pending (SSOT WBS-1.4). |

## Branch: `ihm/feat/ai-community-intelligence`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Merge AI Tools page/tests and keep route wrappers intact. | In Progress | Waiting on router resolution from foundation branch; tracked under cross-repo risk “Router Alignment”. |
| Reconcile community components + schemas with server validation. | Planned | Need schema freeze from backend before finalizing; document assumptions in SSOT risk column. |
| Validate export/download flows for AI tool history (CSV/JSON). | Planned | Manual QA script drafted; execution blocked until `/ai/tools/history` endpoints land. |

## Branch: `sif/feat/core-practice-operations`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Resolve dependency additions (FullCalendar/Recharts) with other package updates. | Planned | Will run `npm install` after branch is locally available (fetch blocked). |
| Run `npm install && npm run build` post-merge to confirm bundler support. | Planned | Depends on previous task. |

## Branch: `ab/feat/admin-commerce-governance`

| Task | Status | Notes / Owners |
| --- | --- | --- |
| Add Billing/Admin routes + nav while preserving guards/error boundaries. | Planned | Router merge sequencing documented; blocked behind foundation router work. |
| Integrate Stripe client + billing/admin services; confirm env handling. | Planned | Waiting on server Stripe endpoints; see cross-repo risk “Admin & Billing”. |
| Prepare manual QA script for AdminPanel + Billing flows. | In Progress | Test matrix drafted in reports/all/strategy/cross-repo-risks.md. |

## Verification Checklist

| Check | Status | Notes |
| --- | --- | --- |
| `npm run lint` (post-merge) | Planned | To run once all feature branches integrated. |
| `npm run build` | Planned | Bundled with lint run. |
| Targeted Vitest suites (`useAuthApi`, `useCommunityStore`, `AIToolsPage`) | Planned | Dependent on dependency install + environment fix for Vitest. |
| Manual regression (document preview/download, AI tools, admin dashboard, billing) | Planned | Scripts reside in branch-status/manual-verification.md; execution scheduled post-merge. |
