# advyon-client Branch Analysis & Risk Assessment

## `sro/feat/foundation-document-reliability`

### Scope Overview
- Adds document viewing hardening (`DocumentAdapter.jsx`, `PDFViewer.jsx`, `DocumentErrorBoundary.jsx`), new download hook (`src/hooks/useDocumentDownload.js`), and telemetry-aware `useDocumentsStore` changes.
- Introduces Route-level hardening (`RouteErrorBoundary.jsx`), auth resiliency (`src/hooks/useAuthApi.js`, `DashboardLayout.jsx`), and shared validation (`src/lib/validation/*.js`).
- Touches onboarding, workspace, onboarding flow, and API utilities.

### File-by-File Notes
| File | Change Summary | Risks / Potential Breakage | Test Coverage Gaps |
| --- | --- | --- | --- |
| `.gitignore` | Ignores `.agents/.codex/.opencode`. | None, informational. | N/A |
| `package.json` / `lock` | Bumps `react-resizable-panels`. | Lock conflicts with other branches; ensure dedupe after merges. | No automated check for dependency mismatches. |
| `src/components/RouteErrorBoundary.jsx` | Adds reusable error boundary. | Needs integration in router; missing telemetry hook configuration. | No component tests verifying fallback UI. |
| `src/components/ui/LoadingSkeleton.jsx`, `LoadingSpinner.jsx` | New UI primitives for loading states. | If unused after merge, dead code. | No story/test to assert styles. |
| `src/features/auth/components/SignInForm.jsx`, `SignUpForm.jsx` | Removes GitHub social button, adds schema integration. | Must ensure Clerk dashboard matches removal; otherwise UI hides option but backend still allows. | No regression test verifying provider list. |
| `src/features/documents/components/DocumentAdapter.jsx`, `DocumentErrorBoundary.jsx`, `PDFViewer.jsx`, `DocumentViewerPage.jsx`, `src/features/documents/index.js` | Complete rewrite of viewer, MIME detection, download path, skeleton UI. | - Requires `/documents/:id/content` + `/download` endpoints ready.  <br/>- Large-file gate might block legitimate preview if size metadata missing.  <br/>- DocumentViewer now depends on `DocumentAdapter`; ensure tree-shaking retains it. | No automated rendering tests for new adapter/boundary; rely on manual QA. |
| `src/features/onboarding/components/OnboardingFlow.jsx` | Aligns onboarding with new Zod schemas. | Must ensure server accepts new roles/fields; check for backward compatibility. | No form validation tests verifying schema wiring. |
| `src/features/workspace/components/WorkspaceView.jsx` | Dynamic folder derivation, preview autoload, integrates DocumentErrorBoundary/PDF viewer. | Relies on `fetchDocumentContent` returning URL; error handling logs only. Might over-fetch causing load spikes. | No tests verifying folder logic or new preview effect. |
| `src/hooks/__tests__/useAuthApi.test.js` | Adds coverage for retry logic. | Good coverage but requires Vitest environment (known to fail locally). | Test depends on `@testing-library/react-hooks` (deprecated) — consider future-proof replacement. |
| `src/hooks/useAuthApi.js` | Adds retry/backoff logic (`syncUserWithRetry`). | Must merge alongside DashboardLayout; otherwise undefined hook usage. Backoff uses global timers; ensure cleanup. | Covered by new tests; still lacking integration test with Clerk. |
| `src/hooks/useDocumentDownload.js` | Implements download/batch download with progress and cancellation. | Assumes `/documents/{caseId}/{docId}/download` returns `downloadUrl`; server branch must provide. Without AbortController support in older browsers, cancel may fail silently. | No hook tests verifying progress/cancel; heavy reliance on manual QA. |
| `src/layouts/DashboardLayout.jsx` | Uses `syncUserWithRetry`, new retry UI, onboarding fallback. | Must ensure `syncUserWithRetry` imported; if not, runtime crash. | No component/unit tests covering error fallback states. |
| `src/lib/api/api.js`, `src/lib/api/apiErrorHandler.js` | Adds shared error normalization. | All consumers now receive custom error objects; existing catch blocks expecting AxiosError may break. Need repo-wide audit. | No unit tests for `apiErrorHandler`. |
| `src/lib/validation/authSchemas.js`, `documentSchemas.js` | Defines Zod schemas for auth/document flows. | If server validation diverges, client may reject valid submissions. Need documentation sync. | No automated tests verifying schema coverage beyond manual usage. |
| `src/routes/index.jsx` | Wraps critical routes with `RouteErrorBoundary`. | Must reconcile with AI/Admin route additions to avoid dropping wrappers. | No router tests verifying boundary injection. |
| `src/store/documents.js` | Adds telemetry, download helpers, fixes caching, but still contains duplicate `activeCaseId` entry. | Duplicate state indicates merge artifact; leaving as-is may not break but is sloppy. Telemetry references `window.__telemetry`; undefined check present but not polyfilled. | No store tests verifying new behaviors. |

### Additional Observations
- No documentation updates accompany the new hooks/components; add to `/docs` later.
- Several imports assume absolute alias (`@/`); ensure tsconfig/vite config remains aligned after merges.
- Manual QA checklist required for document viewer: PDF, image, office, unsupported types, large file gate, download fallback.

## `ihm/feat/ai-community-intelligence`

### Scope Overview
- Introduces AI tools dashboard (`src/pages/dashboard/AIToolsPage.jsx`) + tests, adds AI/community schema updates, store enhancements, and moderation UI tweaks.

### File-by-File Notes
| File | Change Summary | Risks | Test Gaps |
| --- | --- | --- | --- |
| `.gitignore` | Same ignore additions as foundation; ensure dedupe. | None. | N/A |
| `src/features/community/components/AISummary.jsx`, `CreateThreadModal.jsx`, `ReplyForm.jsx` | Enhances AI-assisted summaries, input validation, anti-abuse flows. | Dependent on new store structure and sanitized inputs; mismatched schema versions may throw. | No component tests except schema-level ones. |
| `src/features/community/schemas/communitySchemas.js` + `.test.js` | Adds Zod schemas/tests for community forms. | Must reconcile with existing validation to avoid duplicate logic. | Tests exist but limited to schema parsing. |
| `src/pages/dashboard/AIToolsPage.jsx`, `.test.jsx` | Adds full AI tools workspace with history/export. | Relies on `useAIStore` endpoints; without server branch, UI fails. CSV/JSON export uses `URL.createObjectURL`; ensure browser support. | Tests cover rendering and basic actions but not API integration. |
| `src/pages/dashboard/ThreadDetailPage.jsx` | Updates to show moderation tags, AI suggestions. | Without backend metadata fields, renders undefined. | No test updates. |
| `src/routes/index.jsx` | Replaces `ComingSoon` AI route with actual page. | Must coexist with RouteErrorBoundary + Admin additions. | No router tests. |
| `src/store/useAIStore.js`, `src/store/useCommunityStore.js` + `.test.js` | Adds tool execution, history fetch/export, moderation state. | Store relies on new API endpoints (`/ai/tools/*`, `/community/*`); ensure server branch merged prior to enabling. | Tests only cover partial selectors; no e2e coverage for export/download flows. |

### Additional Observations
- Need documentation for feature flags (env `VITE_AI_TOOL_*`).
- Performance risk: history grouping runs on every render; memoization exists but relies on stable dependencies.

## `sif/feat/core-practice-operations`

### Scope Overview
- Client side only updates `package.json`/`package-lock.json` adding FullCalendar + Recharts.

### Notes
- Ensure tree-shaking and bundle impact reviewed; no UI changes yet so dead deps possible until corresponding components land.
- After merge, run `npm install` and check `npm audit` for new vulnerabilities.

## `ab/feat/admin-commerce-governance`

### Scope Overview
- Adds billing/admin UI, Stripe client, admin/billing services, CODEOWNERS entry, .env addition.

### File-by-File Notes
| File | Summary | Risks | Test Gaps |
| --- | --- | --- | --- |
| `.env` | Adds `VITE_STRIPE_PUBLISHABLE_KEY`. | Sensitive key committed? Provided test key; ensure production secrets managed via env. | N/A |
| `.gitignore` | Same ignore additions. | None. | N/A |
| `CODEOWNERS` | Introduces ownership entries (file not previously tracked). | Must ensure GitHub parses correctly after merge. | N/A |
| `package.json` / `lock` | Adds Stripe deps? (client already? verifying). | Must reconcile with FullCalendar/resizable updates. | No automation verifying peer deps. |
| `src/components/Sidebar.jsx` | Adds Billing/Admin nav items (icons). | Access control only via frontend; ensure server enforces roles. Non-admins may see Admin link if roles array mis-synced. | No unit tests for nav gating. |
| `src/lib/stripe/stripeClient.js` | Adds lazy Stripe loader. | Logs warning if key missing; but BillingPage requires `stripePromise` (could be `null`). Need fallback UI. | No tests verifying fallback. |
| `src/pages/dashboard/AdminPanelPage.jsx` | Large tabbed admin center with multiple hooks. | Heavy reliance on admin service endpoints; without server support, page fails. Complex state lacks memoization/test coverage; risk of runtime errors if responses differ. | No tests. |
| `src/pages/dashboard/BillingPage.jsx` | Subscription management UI using Stripe elements. | Depends on `stripePromise`; ensures `Elements` renders even if null? needs guard. Also manipulates URL search params without router. | No tests. |
| `src/routes/index.jsx` | Adds `/dashboard/admin` (RequireRole) and `/dashboard/billing`. | Must merge with error boundary + AI route updates carefully. | No router tests. |
| `src/services/admin/adminService.js`, `src/services/billing/billingService.js` | Adds SWR hooks for admin/billing endpoints. | Must ensure `useApiSWR` handles new endpoints, add caching keys. | No service-level tests/mocks. |

### Additional Observations
- Need documentation (docs folder) for new admin/billing flows and feature flags.
- CODEOWNERS addition may conflict with other branch’s governance updates—plan to merge carefully.

---

**Actionable Next Steps**
1. Prepare conflict-aware merges per plan ensuring router/store/shared hooks merged holistically.
2. Create verification checklist for each feature area (documents, AI tools, admin/billing).  
3. Identify missing automated tests (DocumentAdapter, AdminPanel, Billing, Document store) for potential follow-up tasks.
