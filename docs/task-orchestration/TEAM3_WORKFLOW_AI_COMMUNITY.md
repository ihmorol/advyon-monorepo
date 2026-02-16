# Team 3 Workflow - AI and Community Intelligence

## Branch and Ownership
- Branch: `ihm/feat/ai-community-intelligence`
- Primary skills: `ai-ml-specialist`, `backend-lead`, `security-engineer`, `frontend-lead`
- Agent roles: ai-engineer, backend-dev, frontend-dev, security-engineer, qa-tester

## Parallel Independence Contract
- Team 3 owns AI and community intelligence layers.
- Owned paths:
  - `advyon-server/src/app/modules/ai/`
  - `advyon-server/src/app/modules/community/`
  - `advyon-client/src/features/community/`
  - `advyon-client/src/pages/dashboard/AIToolsPage.jsx` (create)
  - `advyon-client/src/store/useAIStore.js`
- Do not modify payment/admin/operations modules outside published contracts.

## Device and GitHub Execution Rules
- Start each session with: `git fetch origin --prune`, `git checkout ihm/feat/ai-community-intelligence`, `git pull --rebase origin ihm/feat/ai-community-intelligence`.
- Work only in Team 3 owned paths unless orchestrator approves a cross-team contract change.
- Build a Task Packet for each WBS item (scope, contracts, test plan, rollback) before code edits.
- Push at least every 4 hours and update SSOT evidence links in the same cycle.
- Unknown behavior is a blocker; set SSOT status to `BL` instead of guessing implementation.
- Follow `docs/task-orchestration/AI_EXECUTION_PROTOCOL.md` for deterministic execution details.

## Execution Workflow (independent)
1. Requirements pass: define legal-only AI policies and moderation thresholds.
2. Design pass: finalize AI service contracts, safety filters, and fallback behavior.
3. Build pass: implement moderation, AI tools, and community assistance features.
4. Validation pass: safety tests, abuse tests, and latency/cost benchmarks.
5. Handoff pass: publish prompt/policy docs and SSOT evidence.

## Assigned Tasks
| Order | WBS ID | Deliverable | Requirement Match | Commit Rule |
|---|---|---|---|---|
| 1 | WBS-3.1 | AI content moderation for threads/replies | Toxicity/spam/off-topic detection, flagging, review queue, configurable threshold, appeals | Commit after >=3 files or logical unit |
| 2 | WBS-3.3 | AI tools page and backend tools module | Contract analyzer, generator, researcher, writing assistant, deposition summarizer, brief analyzer, history/export | Commit after >=3 files or logical unit |
| 3 | WBS-3.4 | Centralized legal AI context manager | Legal-bound scope, off-topic rejection, context memory, injection resistance | Commit after >=3 files or logical unit |
| 4 | WBS-3.2 | Advanced AI assistance in community posts (future) | Similar thread suggestions, answer suggestions, legal refs, summaries, smart tags | Commit after >=3 files or logical unit |
| 5 | WBS-1.4 (Team 3 domain) | Zod validation for community/AI forms | Form + endpoint validation parity and error UX | Commit after >=3 files or logical unit |
| 6 | WBS-DEP-SV-02 | Moderation package integration | Stable moderation dependency with queue-safe execution | Commit after >=3 files or logical unit |
| 7 | WBS-TD-SC-02 | Input sanitization (AI/community scope) | Prompt and UGC sanitization centralized | Commit after >=3 files or logical unit |
| 8 | WBS-SM-MVP-02 (Team 3 domain) | Form validation coverage verification | Team 3 owned forms fully validated | Commit after >=3 files or logical unit |
| 9 | WBS-SM-KPI-04 | AI usage KPI instrumentation | Usage, success/fail, latency tracked | Commit after >=3 files or logical unit |
| 10 | WBS-SM-KPI-05 | Community engagement KPI instrumentation | Thread/reply/like/search engagement tracked | Commit after >=3 files or logical unit |

## Required Handoff Package
- AI safety policy and prompt-injection handling notes.
- Moderation evaluation metrics and false-positive/false-negative report.
- Feature flag matrix for each AI tool.
- SSOT updates with model/provider cost and reliability notes.
