# AI Execution Protocol for 5 Independent Teams (5 Devices)

## Purpose
This protocol defines deterministic execution for all AI agents working across `advyon-client` and `advyon-server` using the WBS in `SSOT_WBS_TRACKER.md`.

## Canonical Inputs
- `docs/task-orchestration/MASTER_TASK_BREAKDOWN.md`
- `docs/task-orchestration/SSOT_WBS_TRACKER.md`
- Team workflow file for active branch

## Repository and Branch Model
- Single GitHub repository, team branches only.
- No direct work on integration or release branches.
- Branch naming is fixed:
  - `team1/foundation-document-reliability`
  - `team2/public-content-metadata`
  - `team3/ai-community-intelligence`
  - `team4/core-practice-operations`
  - `team5/admin-commerce-governance`

## Session Start Checklist (every device)
1. `git fetch origin --prune`
2. `git checkout <team-branch>`
3. `git pull --rebase origin <team-branch>`
4. Open SSOT and confirm assigned WBS IDs.
5. Mark WBS row as `IP` only after Task Packet is ready.

## Task Packet Template (required before implementation)
- WBS ID
- Objective
- In-scope files
- Out-of-scope files
- API contract changes
- Data/schema changes
- Acceptance checklist from SSOT
- Test plan (unit/integration/e2e/manual)
- Rollback plan
- Risk and blocker notes

## Implementation Rules
- Implement only active WBS acceptance criteria.
- If contract is unclear, stop and mark `BL` in SSOT.
- Do not create undocumented endpoints or payload fields.
- Do not modify files outside ownership boundaries unless orchestrator approves.
- Commit immediately when 3+ files changed or logical unit complete.

## Evidence Requirements (PR and SSOT)
Every task must attach:
- PR URL
- Commit hash(es)
- Test output summary
- Screenshot or log evidence for UI/behavior changes
- Mapping of acceptance criteria to proof artifacts

## Testing Gate Minimums
- MVP product tasks: unit + integration or e2e as appropriate
- Security-sensitive tasks: add security validation evidence
- API contract changes: include contract test results
- Performance-sensitive tasks: include baseline and delta

## Sync and Communication Rhythm
- Update branch and draft PR every 4 hours.
- Update SSOT status and evidence field in the same cycle.
- Escalate blockers within 30 minutes of discovery.
- Handoff SLA target is less than 4 hours.

## Merge Train
- Two integration windows daily.
- Preconditions for merge:
  - Required checks green
  - SSOT row not `BL`
  - Acceptance evidence complete
  - Security gate pass for sensitive WBS IDs

## Definition of Done per WBS
- All checklist items in SSOT checked
- Required tests passed
- Evidence attached
- Handoff accepted
- No open blocker for the WBS ID

## Hallucination Prevention Checklist
- [ ] I am implementing only mapped WBS IDs.
- [ ] I validated file paths in the repository.
- [ ] I did not invent API behavior without a contract.
- [ ] I documented assumptions as blockers instead of guessing.
- [ ] I attached evidence for each acceptance item.
