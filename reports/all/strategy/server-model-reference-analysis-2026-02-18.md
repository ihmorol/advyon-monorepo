# Server Model Reference Analysis (ID Integrity)

Date: 2026-02-18
Purpose: Map model ID/reference behavior and align seed data with actual server expectations.

## Core Findings

1. The server uses **dual identifiers**:
   - `_id` (MongoDB ObjectId, canonical relational reference)
   - `id` (business ID string used heavily by API/service layer)
2. Many modules authenticate/query by `User.id` (string), not `_id`.
3. Relationship fields across core modules (`Case`, `Document`, `Message`, `Schedule`, `Notification`, `Payment`, `Subscription`) are ObjectId-based and must reference valid `_id` values.
4. Some schemas intentionally store string IDs (`AI` context/history userId, community KPI userId), so those must follow service usage patterns (`req.user.userId` => `User.id` string).

## Model Reference Map

| Collection | Primary key style | Critical reference fields | Expected value type |
| --- | --- | --- | --- |
| `users` | `_id` + `id` | N/A | `_id` ObjectId, `id` business string |
| `roles` | `_id` + `id` | N/A | `_id` ObjectId, `id` business string |
| `userroles` | `_id` + `id` | `userId`, `roleId`, `createdByUserId` | String fields carrying ObjectId string values |
| `clientprofiles` / `lawyerprofiles` / `judgeprofiles` | `_id` + `id` | `userId` | String field carrying `User._id` string |
| `cases` | `_id` + `id` | `createdBy`, `clientId`, `archivedBy` | ObjectId refs to `users` |
| `caseaccesses` | `_id` | `caseId`, `userId`, `grantedBy` | ObjectId refs |
| `documents` | `_id` + `id` | `caseId`, `uploaderId`, `uploadedBy` | ObjectId refs |
| `activities` | `_id` | `userId`, `caseId`, `documentId` | ObjectId refs |
| `schedules` | `_id` | `caseId`, `createdBy`, `participants[]` | ObjectId refs |
| `notifications` | `_id` | `recipientId`, `senderId`, `caseId` | ObjectId refs |
| `messages` | `_id` | `senderId`, `receiverId`, `caseId`, `parentMessageId` | ObjectId refs |
| `threads` / `replies` | `_id` | `author`, `threadId` | ObjectId refs |
| `moderationreviews` / `moderationappeals` | `_id` | `targetId`, `reviewId` | ObjectId refs by target model |
| `communityengagementevents` | `_id` | `userId`, `threadId`, `replyId` | `userId` business string; thread/reply ObjectId |
| `aiconversationcontexts` | `_id` | `userId`, `caseId` | Business string IDs (`User.id`, `Case.id`) |
| `aipersonalizationprofiles` | `_id` | `userId` | Business string `User.id` |
| `aitoolhistories` | `_id` | `userId`, `metadata.caseId`, `metadata.documentIds[]` | Business IDs (`User.id`, `Case.id`, `Document.id`) |
| `personalizations` | `_id` | `userId`, `documentAccessPatterns.documentId` | ObjectId refs |
| `subscriptions` / `payments` | `_id` | `user` | ObjectId ref |
| `auditlogs` | `_id` | `actor` | ObjectId ref |
| `systemsettings` | `_id` | `updatedBy` | String (non-strict ref) |

## Seeder Alignment Rules Applied

- Never set manual `_id`; MongoDB generates all `_id` values.
- All ObjectId relation fields are populated from inserted document `_id` values.
- All business-string relation fields are populated from existing business IDs (`User.id`, `Case.id`, `Document.id`) where services expect them.
- Added post-seed integrity validation that checks mismatches across all major relations and fails the run if any mismatch exists.

## Current Seed Integrity Result

- Reference mismatch counts: all zero.
- Seed account scope: 3 provided accounts are used to populate all relational workflows.
- Collection volume remains >=10 for most major workflow collections; collections with unique user constraints remain capped by 3 users (e.g., `personalizations`, `aipersonalizationprofiles`, role-specific profile collections).

## Runtime ID Defects Resolved

- `src/app/modules/notification/notification.service.ts`
  - Fixed recipient/sender filtering and mutation paths to resolve `req.user.userId` (business string) into `User._id` for ObjectId fields.
- `src/app/modules/schedule/schedule.service.ts`
  - Fixed conflict/list/today queries and create-event normalization to resolve user/case identifiers into ObjectId references.
- `src/app/modules/message/message.service.ts`
  - Fixed case association in message creation/thread queries by resolving business `caseId` values before ObjectId conversion.
- Validation evidence
  - `tests/smoke/api.smoke.test.ts` and `reports/all/strategy/api-smoke-matrix-2026-02-18.md` confirm authenticated route matrix pass.
  - `tests/smoke/feature-flow.smoke.test.ts` and `reports/all/strategy/feature-flow-checklist-2026-02-18.md` confirm workflow-level case/schedule/message/notification/admin/billing checks pass.
