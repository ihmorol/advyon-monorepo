# Team 3 Manual Verification Playbook (A-Z)

## Preconditions
- Branch: `ihm/feat/ai-community-intelligence`
- Services running: `advyon-server`, `advyon-client`
- Authenticated test user available
- Seed data: at least 3 community threads and 1 case/document

## WBS-3.1 Community Moderation
1. **Direct abuse block**
   - Create a thread with title/content including `fuck you`.
   - Expected: request rejected (`400`) or content hidden immediately (`isVisible=false`).
2. **Review queue visibility**
   - Open moderation queue endpoint.
   - Expected: moderation item present with status `review`/`rejected` and toxicity reason.
3. **Appeal path**
   - Submit appeal as content owner.
   - Expected: pending appeal record created; moderation state becomes `appealed`.
4. **Admin resolution**
   - Resolve appeal as moderator/admin.
   - Expected: item status updates to `approved` or `rejected` with reviewer metadata.

## WBS-3.2 Community AI Assist
1. **Create thread modal guardrails**
   - Open Ask Question modal.
   - Expected: AI assist actions disabled until title >= 5 chars and details >= 10 chars.
2. **Similar threads**
   - Enter valid title/details and click `Suggest Similar Threads`.
   - Expected: suggestions appear; no uncaught console exception.
3. **Smart tags**
   - Click `Suggest Smart Tags`.
   - Expected: tags appear; selecting a tag appends to tag input without duplicates.
4. **Failure UX**
   - Simulate API failure.
   - Expected: controlled inline error message, modal remains usable.

## WBS-3.3 AI Tools Workspace
1. **Multi-run history**
   - Run at least 4 tools with varied inputs.
   - Expected: all runs shown in history, grouped by date.
2. **Status filtering**
   - Use status chips (`all/success/blocked/failed`).
   - Expected: list updates accurately.
3. **Search and expand**
   - Search by keyword from prior input.
   - Expected: matching runs only; expand/collapse details works.
4. **Export**
   - Export JSON and CSV.
   - Expected: files download with expected content and columns.
5. **Pagination and refresh**
   - Navigate pages and refresh current page.
   - Expected: stable navigation metadata and refreshed list.

## WBS-3.4 Centralized Context + Personalization
1. **Off-topic rejection**
   - Ask clearly non-legal question via `/ai/chat`.
   - Expected: legal-boundary refusal; no unsafe answer generation.
2. **Prompt-injection rejection**
   - Ask to reveal system prompt / ignore previous instructions.
   - Expected: refusal with policy signal behavior.
3. **Context profile endpoint**
   - Call `GET /ai/context/profile`.
   - Expected: profile object + memory summary returned for authenticated user.
4. **Memory continuity**
   - Ask follow-up legal questions.
   - Expected: profile usage count increases; recent query/keyword memory updates.

## WBS-1.4 Team 3 Validation Parity
1. **Category contract**
   - Attempt create-thread with category `all`.
   - Expected: blocked client-side and rejected by store guard.
2. **Thread schema**
   - Try invalid short title/content.
   - Expected: field-level validation messages appear.
3. **AI tool input schema**
   - Submit input shorter than minimum.
   - Expected: validation error and no API call.

## KPI and Metrics Checks
1. **AI usage KPI (`WBS-SM-KPI-04`)**
   - Call `GET /ai/tools/metrics`.
   - Expected: usage/success/fail/latency metrics returned.
2. **Community engagement KPI (`WBS-SM-KPI-05`)**
   - Trigger thread view/search/vote/reply flows, then query engagement metrics.
   - Expected: counters reflect interactions.

## Audit Commands (Evidence)
- Server build: `npm run build` (in `advyon-server`)
- Server targeted tests:
  - `npx jest src/app/modules/community/community.moderation.service.test.ts src/app/modules/community/community.ai-assist.service.test.ts src/app/modules/community/community.service.test.ts src/app/modules/ai/ai-context-manager.service.test.ts src/app/modules/ai/ai.tool.service.test.ts --runInBand`
- Client build: `npm run build` (in `advyon-client`)

## Pass Criteria
- No unresolved blockers for Team 3 rows in SSOT.
- Required Team 3 test/build evidence passes.
- Manual flow checks above pass without uncaught UI/API failures.
