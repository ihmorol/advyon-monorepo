# Merge Readiness Plan - advyon-client & advyon-server

## Phase 0 - Preflight (Status: Completed 2026-02-18)
- Captured `git status -sb` for the root and both submodules while on `ihm/fix/merge-teamwork`; only the expected submodule pointers show as modified.
- Archived the current `docs/task-orchestration/SSOT_WBS_TRACKER.md` snapshot for evidence and kept the reports directory structure (`reports/{advyon-client,advyon-server,all}`) intact.
- Remote fetch remains blocked, so analysis relies on the local history from each branch plus the task packets already migrated into `/reports`.

## Phase 1 - advyon-client Merge Order (Status: Code merged, verification blocked)
1. **sro/feat/foundation-document-reliability** – Router wrappers, document viewer stack, `syncUserWithRetry`, store normalization, and Zod schemas all landed in `advyon-client/src/**`. Outstanding item: automated lint/build/test runs (React 19 ESLint emits 118 errors; Vite build requires Node >=22.12).
2. **ihm/feat/ai-community-intelligence** – `AIToolsPage`, community stores, schemas, and tests sit behind feature flags with `RouteErrorBoundary` applied. Awaiting Vitest execution and manual export QA.
3. **sif/feat/core-practice-operations** – Dependency bumps (FullCalendar, Recharts, socket.io-client) exist in `package.json`, but bundler validation is blocked by the Node version mismatch.
4. **ab/feat/admin-commerce-governance** – Admin/Billing routes, sidebar entries, services, and the Stripe client are merged. Manual QA is deferred until the server installs `stripe/node-cron/uuid` so end-to-end flows can run.

## Phase 2 - advyon-server Merge Order (Status: Code merged, environment blockers)
1. **sro/feat/foundation-document-reliability** – `fileUploadSecurity` middleware plus document download/batch routes are live in `src/app/modules/{case,document}`. Need targeted Jest once lint/build are green.
2. **ihm/feat/ai-community-intelligence** – OpenRouter config, AI context manager, tool services, moderation queue, sanitizer, and KPI modules are present; Jest cannot start because `cmd /c npm run test` fails with `spawn EPERM`.
3. **sif/feat/core-practice-operations** – Schedule, notification, messaging, personalization, analytics, socket, and archive scheduler modules are committed. Runtime verification depends on resolving the missing dependencies.
4. **ab/feat/admin-commerce-governance** – `app.ts` now wires CORS, rate limiter, admin/payment/subscription routes plus Stripe config. TypeScript build fails until `stripe`, `uuid`, and `node-cron` install cleanly.

## Phase 3 - Cross-Repo Alignment (Status: Partially satisfied)
- Document download, AI tool history, admin/billing, and schedule/notification contracts now exist on both client and server, but compliance evidence is pending because `npm run build/test` do not complete.
- SSOT rows can reference the updated reports in `reports/advyon-client/*` and `reports/advyon-server/*`; they still need links to successful command logs.
- Post-merge validation hinges on upgrading Node (client) and unblocking `npm install` (server) so that lint/build/test artifacts can be attached to the plan.

## Verification Snapshot (2026-02-18)
- `cmd /c npm run lint` (client) -> 118 errors (`motion` unused, `react-refresh/only-export-components`, hook purity violations).
- `cmd /c npm run build` (client) -> Vite refuses to run under Node v22.11.0.
- `cmd /c npx vitest run ...` (client) -> fails while bundling `vite.config.js` with esbuild (`spawn EPERM`).
- `cmd /c npm install` (server) -> cannot download `stripe`/`uuid` (EACCES). Log: `advyon-server/.npm-cache/_logs/2026-02-18T12_10_43_109Z-debug-0.log`.
- `cmd /c npm run lint` (server) -> 577 errors / 84 warnings (widespread `no-explicit-any`, missing jest globals, control-character regex errors).
- `cmd /c npm run build` (server) -> `tsc` cannot resolve `stripe`, `node-cron`, `uuid`.
- `cmd /c npm run test` (server) -> Jest worker startup fails with `spawn EPERM`.

## Risk Mitigation Hooks (Updated)
- Keep resolving conflicts in `src/routes/index.jsx`, `src/store/documents.js`, `src/layouts/DashboardLayout.jsx`, and `src/app/modules/case/document/*.ts`; all four files now contain merged logic and should not regress.
- Defer dependency reconcilation commits until Node is upgraded and `npm install` succeeds; otherwise we churn lockfiles without producing usable artifacts.
- Once tooling issues are cleared, rerun the targeted Vitest/Jest suites listed above and attach logs to SSOT before marking any WBS row as Done.
