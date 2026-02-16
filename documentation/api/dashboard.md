# Dashboard API

Endpoints designed to populate the main application dashboard efficiently.

## Get Unified Dashboard
**GET** `/dashboard/unified`

Aggregates multiple data sources into a single response to reduce network round-trips on initial load.

### Response Data Includes:
- **Stats**: Key metrics (active cases, pending tasks).
- **Recent Activity**: Last 5 actions.
- **Upcoming Events**: Next 3 scheduled items.
- **Recent Messages**: Latest unread messages.

---

## Get Stats
**GET** `/dashboard/stats`

Returns only the statistical metrics (counts and trends).
