# Testing Strategy

## Test Pyramid
| Layer | Tooling | Coverage Targets |
|-------|---------|------------------|
| Unit | Jest (server), Vitest + Testing Library (client) | =80% for auth, payments, AI, community | 
| Integration | Supertest (`advyon-server/tests`), MSW/API mocks in client feature tests | Exercise REST contracts & schema validation |
| E2E / UX | Playwright (approved prefix) or Cypress (future) against deployed preview | Smoke workflows: onboarding, case creation, document upload, AI chat |
| Manual | QA checklist aligned to `reports/merge-checklist.md` | Accessibility, visual regressions, compliance |

> Source: advyon-server/package.json (c73ac5a)
> Source: advyon-client/package.json (c73ac5a)

## Commands
```bash
# Server (Jest)
cd advyon-server
npm run test

# Client (Vitest + jsdom)
cd advyon-client
npx vitest run --coverage

# Lint as gate
npm run lint

# Documentation link checks (after mkdocs audit script lands)
mkdocs build -f mkdocs.yml
```
- Use the already-approved command prefixes for Playwright or Vitest when running in CI/CD; see `.codex/RULES.md` for escalation rules.

## Module-Specific Guidance
- **Auth & RBAC**: keep `auth.test.ts` updated when adding roles or Clerk claims. Mock `verifyToken` and assert `req.user` payloads.
- **Community Store**: `useCommunityStore.test.js` covers optimistic updates for votes/replies—extend these tests when adjusting store shape.
- **AI**: isolate OpenRouter/Groq network calls via dependency injection or use `nock` to stub HTTP responses.
- **Sockets**: add integration tests ensuring events fire when controllers mutate resources (e.g., `socketService.notifyAnalysisComplete`).

> Source: advyon-server/src/app/modules/auth/auth.test.ts (c73ac5a)
> Source: advyon-client/src/store/useCommunityStore.test.js (c73ac5a)
> Source: advyon-server/src/app/modules/socket/socket.service.ts (c73ac5a)

## QA Checklists
1. **Workspace** – create/update/archive cases, upload documents (PDF, DOCX), verify AI summaries, download documents.
2. **Calendar** – create an event, edit recurrence, ensure reminders not duplicated, test `today events` endpoint.
3. **Billing** – simulate Stripe Checkout via test mode, verify webhook processed and subscription state updates.
4. **Community** – post thread, reply, vote, trigger moderation queue by posting flagged content.
5. **AI Tools** – send prompt, run at least one tool (e.g., `contract_review`), confirm history export, observe rate-limit behavior.
6. **Realtime** – open two browsers, send chat message, confirm typing indicator + message push.

## Reporting & Flakes
- Document flaky tests or intermittent API failures directly in `reports/merge-checklist.md` with owner + ETA.
- Capture console/network logs for frontend issues; attach them to Jira/WBS tickets.
- For backend, export Jest `--runInBand --detectOpenHandles` output to track slow tests.

## Test Data & Seeding
- Use `npm run seed:db:dry` to preview changes, `npm run seed:db` to insert fixtures (legal articles, admin accounts).
- Clean up Mongo collections before running destructive tests; prefer ephemeral Atlas clusters for CI to avoid sharing state.

> Source: advyon-server/package.json (c73ac5a)
> Source: docs/reporting references (c73ac5a)

