# Repository Guidelines

## Project Structure & Module Organization
- `advyon-client/`: Vite + React UI; domain code in `src/features/*`, primitives in `src/components/ui`, state in `src/store`, assets in `public/`.
- `advyon-server/`: Node/Express API (TypeScript); modules under `src/app/modules/<domain>`, shared config in `src/app/config`, transport wiring in `src/server.ts`, tests in `tests/`.
- `docs/` + `documentation/` hold long-form research; `reports/` is the canonical merge and risk checklist—keep entries aligned when strategies change.
- `landing/` hosts marketing media referenced by docs; treat as read-only unless coordinating with design.

## Build, Test, and Development Commands
- Client: `cd advyon-client && npm install`, then `npm run dev`, `npm run build`, `npm run lint`, `npx vitest run --coverage`.
- Server: `cd advyon-server && npm install`, then `npm run dev`, `npm run build`, `npm run prod`, `npm run lint`, `npm run prettier`, `npm run test`.
- Run installs from each subdirectory; lockfiles are committed, so avoid `npm update` without review.

## Coding Style & Naming Conventions
- Prettier governs formatting (2-space indent, import sorting, trailing commas). Run lint/prettier before committing.
- React components/hooks/pages use PascalCase files and default exports; shared utilities stay camelCase. Backend conventions: `<module>.controller.ts`, `.service.ts`, `.route.ts`, plus DTO/schema files next to the module.
- Secrets stay in `.env` files derived from `.env.example`; reference them via `import.meta.env` (client) and `config` helper (server).

## Testing Guidelines
- UI specs live beside their components as `.test.jsx/.js`, written with Vitest + Testing Library; mock HTTP via `services/_shared/apiClient`.
- API specs belong in `advyon-server/tests/**/*.spec.ts`, executed by Jest + Supertest; reuse builders from `src/app/DB` for seeding.
- Capture new risks, flaky tests, and mitigations immediately in the matching `reports/` checklist item.

## Commit & Pull Request Guidelines
- Follow the Conventional Commits pattern in the log (`docs:`, `feat:`, `chore(WBS-3.1): ...`). Reference the report/risk ID a change satisfies.
- PRs need a concise summary, list of commands executed (`npm run test`, `npx vitest run`), screenshots for UI deltas, and a link to the updated report entry.
- Do not request review while report tasks assigned to the branch remain unchecked unless you explicitly defer them with owner + due date in `reports/`.

## Security & Configuration Tips
- Rotate Clerk, Stripe, MongoDB, OpenAI, Groq credentials through `.env` and your secret manager at the same time; never log them.
- Revalidate upload/billing settings whenever environments move by checking `advyon-server/src/app/config/cloudinary.config.ts` and `stripe.config.ts`.
