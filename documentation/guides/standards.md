# Coding Standards & Project Conventions

## Directory Principles
- **Feature-first modules** (`advyon-server/src/app/modules/<domain>`) must contain controller, service, route, validation, model, interface, and constant files. Keep DTOs beside their module to prevent drift.
- **Client code** groups UI in `src/features`, shared primitives in `src/components/ui`, routing under `src/routes`, and Zustand stores in `src/store`. Prefer co-locating tests (`*.test.jsx/js`) with the hooks/components they cover.

> Source: documentation/architecture/index.md (c73ac5a)
> Source: advyon-client/src (c73ac5a)

## Naming & Style
| Layer | Convention |
|-------|-----------|
| Files | kebab-case for configs, `<Feature>.tsx` / `.ts` elsewhere |
| Classes/Types | PascalCase (`CaseControllers`, `TDocument`) |
| Functions/Vars | camelCase (`syncUser`, `useAIStore`) |
| Constants | UPPER_SNAKE_CASE for env and enums (`PLAN_TIERS`) |

- Keep React components stateless where possible; move data fetching to hooks/stores to keep reusability high.
- Use TypeScript interfaces for request/response models (`TCase`, `TAIToolHistory`) and share them with controllers + services.
- Run Prettier (2-space indent, trailing commas) and ESLint before every commit.

> Source: advyon-server/src/app/modules/case/case.interface.ts (c73ac5a)
> Source: advyon-client/src/store/useAIStore.js (c73ac5a)

## API Standards
- Always validate requests with Zod (`validateRequest`) and return `sendResponse` wrappers for consistent success payloads.
- Document new endpoints in `documentation/api/<module>.md` plus Swagger annotations inside the route file.
- Use CamelCase IDs (`CASE-0001`) at the app layer, but Mongo `_id` references for foreign keys.
- Leverage `AppError` for domain-specific failures; do not leak raw errors to clients.

> Source: advyon-server/src/app/middlewares/validateRequest.ts (c73ac5a)
> Source: advyon-server/src/app/modules/case/case.route.ts (c73ac5a)
> Source: documentation/api/index.md (c73ac5a)

## Frontend Standards
- Fetch data via `api` client in `src/lib/api/api` to ensure auth headers and interceptors are shared.
- Store UI state in feature-specific Zustand stores; persist lightweight slices with `zustand/middleware` only when the UX demands it (e.g., onboarding wizard).
- Use `RouteErrorBoundary` for all dashboard subroutes as shown in `src/routes/index.jsx`.
- Adopt Shadcn UI primitives from `src/components/ui` for consistent styling; theme toggles live in `usePreferencesStore`.

> Source: advyon-client/src/routes/index.jsx (c73ac5a)
> Source: advyon-client/src/store/onboarding.js (c73ac5a)
> Source: advyon-client/src/store/usePreferencesStore.js (c73ac5a)

## Testing Expectations
- Backend: Jest + Supertest under `advyon-server/tests` and module-level `*.test.ts` (e.g., `auth.test.ts`). Mock external APIs where possible.
- Frontend: Vitest + Testing Library, colocated `*.test.js`. Use MSW or Axios mocks when calling backend services.
- Target =80% coverage for high-risk modules (auth, payment, AI). Document flaky tests in `reports/`.

> Source: advyon-server/src/app/modules/auth/auth.test.ts (c73ac5a)
> Source: advyon-client/src/store/useCommunityStore.test.js (c73ac5a)

## Documentation & Reviews
- Keep `documentation_plan.md` synchronized with actual progress; update diagrams/sections alongside code.
- Every architecture or data change requires updating the relevant MkDocs page plus `reports/merge-checklist.md` before requesting review.
- Reviews focus on correctness & risk first: highlight behavioral changes, database migrations, and security impacts.

> Source: documentation_plan.md (c73ac5a)
> Source: reports/ (c73ac5a)

