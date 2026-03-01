# Gamification API & Services

Although gamification logic lives in `advyon-server/src/app/modules/gamification/gamification.service.ts`, the public endpoints are exposed through the Community module.

## Scoring Model
| Action | Points | Notes |
|--------|--------|-------|
| Create thread | +5 | Awarded after moderation approval |
| Add reply | +3 | Only for visible replies |
| Upvote received | +2 | Triggered when someone upvotes your reply |
| Downvote received | -1 | Deducted once per downvote |
| Accepted answer | +10 | When thread author marks reply as solution |
| First reply bonus | +2 | Encourages fast responses |

Weekly points reset via `resetWeeklyPoints()` (cron). Totals live directly on the `User` document (`points`, `weeklyPoints`).

> Source: advyon-server/src/app/modules/gamification/gamification.service.ts (c73ac5a)
> Source: advyon-server/src/app/modules/user/user.model.ts (c73ac5a)

## Leaderboard & Stats Endpoints
| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/community/top-contributors` | GET | Public | Returns top users sorted by `points`, including `fullName`, `avatarUrl`, `role`, `weeklyPoints`. | 
| `/community/stats` | GET | Public | Totals for threads, replies, daily questions, and active users (based on `User.lastLoginAt`). |
| `/community/metrics/engagement` | GET | `lawyer`, `admin`, `superAdmin` | Aggregated event counts pulled from `CommunityEngagementEventModel`; accepts `from`/`to` query params. |

All responses follow the standard `{ success, data }` wrapper used across the API.

> Source: advyon-server/src/app/modules/community/community.route.ts (c73ac5a)
> Source: advyon-server/src/app/modules/community/community.kpi.model.ts (c73ac5a)

## Automatic Point Awards
- `CommunityService.createThread` ? `GamificationService.awardPoints('CREATE_THREAD', threadId)` after AI moderation approves content.
- `CommunityService.addReply` ? awards `ADD_REPLY` once reply is visible.
- `CommunityService.voteThread` / `voteReply` ? increments/decrements points for vote recipients.
- `CommunityService.markAsSolved` ? adds `ACCEPTED_ANSWER` bonus to the reply author.

No explicit REST endpoint exists to manually adjust scores; use the service functions inside admin-only scripts if needed.

> Source: advyon-server/src/app/modules/community/community.service.ts (c73ac5a)

## Recommended Client Usage
- Fetch leaderboards via `useCommunityStore.fetchTopContributors()` to populate badge cards.
- Display weekly vs lifetime points on user profile pages using values already embedded in `/users/me/profile` responses.
- Highlight progress bars or streaks using `weeklyPoints` + `lastWeekReset` to encourage regular engagement.

> Source: advyon-client/src/store/useCommunityStore.js (c73ac5a)

