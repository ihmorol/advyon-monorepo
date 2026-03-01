# Gamification Feature

## Overview

The Gamification module rewards users for engagement and participation on the platform. Users earn points for various activities which can be displayed on leaderboards and profiles.

## Point System

### Point Values

| Action | Points | Description |
|--------|--------|-------------|
| CREATE_THREAD | +5 | Creating a new community thread |
| ADD_REPLY | +3 | Posting a reply to a thread |
| UPVOTE_RECEIVED | +2 | Receiving an upvote on content |
| DOWNVOTE_RECEIVED | -1 | Receiving a downvote |
| ACCEPTED_ANSWER | +10 | Having an answer accepted |
| FIRST_REPLY_BONUS | +2 | First reply bonus |

## User Points Fields

Points are stored in the User model:

```typescript
{
  points: Number,         // Total lifetime points
  weeklyPoints: Number,   // Points earned this week
  lastWeekReset: Date    // Last weekly reset date
}
```

## Gamification Service

The service provides functions for awarding and managing points:

### awardPoints

Awards points to a user for an action:

```typescript
import { awardPoints } from './gamification.service';

// Award points for creating a thread
await awardPoints('USR-0001', 'CREATE_THREAD');
```

### deductPoints

Deducts points from a user (floors at 0):

```typescript
await deductPoints('USR-0001', 'DOWNVOTE_RECEIVED');
```

### getTopContributors

Gets the top users by points:

```typescript
const topUsers = await getTopContributors(10);
// Returns array of user objects sorted by points
```

### resetWeeklyPoints

Resets all users' weekly points (for weekly leaderboards):

```typescript
await resetWeeklyPoints();
```

## Usage in Features

### Community Integration

The gamification service is integrated with the Community module:

1. **Creating a thread**: Awards 5 points
2. **Adding a reply**: Awards 3 points
3. **Receiving upvote**: Awards 2 points
4. **Receiving downvote**: Deducts 1 point
5. **Accepted answer**: Awards 10 points

### Leaderboards

Users can be ranked by:
- **Total Points**: All-time leaderboard
- **Weekly Points**: Current week leaderboard (resets weekly)

## Weekly Reset

The system supports weekly point resets for competitive leaderboards:
- Every week, `weeklyPoints` is reset to 0
- `lastWeekReset` timestamp is updated

This allows for:
- Weekly competitions
- Monthly challenges
- Seasonal contests

## Frontend Display

### User Profile

Users can see their points on their profile:
- Total points
- Weekly points
- Current rank (future feature)

### Community Hub

Top contributors can be highlighted in the community:
- "Top Contributor" badge
- Featured on community homepage

---

*Last Updated: March 2026*
