# Team 3 Form Validation Coverage (WBS-1.4 / WBS-SM-MVP-02)

## Coverage Matrix
| Surface | Client Validation | Server Validation | Evidence |
|---|---|---|---|
| Community thread create | `createThreadSchema` | `CommunityValidation.createThreadValidation` | Client + server build pass |
| Community reply create | `replySchema` | `CommunityValidation.addReplyValidation` | Client + server build pass |
| AI chat | input validation in store + UX error | `AIValidation.chatValidation` | Server build pass |
| AI tool input | `aiToolInputSchema` | `AIValidation.runToolValidation` | Client build pass |
| AI tool history/export query | N/A (query params) | `AIValidation.toolHistoryValidation` + `exportToolHistoryValidation` | Server build pass |
| Community assist endpoints | UI-triggered request structure | `similarThreadsValidation`, `smartTagValidation`, `answerSuggestionValidation`, `legalReferenceValidation` | Server build pass |

## Automated Validation Evidence
- Schema checks (automated script run):
  - Command:
    - `node --input-type=module` (inline checks for `createThreadSchema`, `replySchema`, `aiToolInputSchema`)
  - Output:
    - `community schema checks passed`

## Test Runner Constraint
- `vitest` execution in this environment hits `spawn EPERM`/timeout due process restrictions.
- Team 3 used deterministic fallback script checks plus build/test gates.

## Build and Test Gates
- Server:
  - `npm run build` passed
  - targeted jest suites passed (`ai-context-manager`, `ai-tool-service`, `community-moderation`, `community-ai-assist`)
- Client:
  - `npm run build` passed

