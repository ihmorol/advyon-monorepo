# Task Packet · WBS-2.2 Metadata API Updates

## Objective
Deliver the metadata platform contract for public pages and workflows so Team 2 can ship contact/onboarding flows without hardcoding. Scope includes new metadata datasets, cached read APIs, and admin-safe management endpoints while keeping existing `/metadata/practice-areas` + `/metadata/languages` routes stable.

## In-Scope Files
- `advyon-server/src/app/modules/metadata/**/*`
- `advyon-server/src/app/routes/index.ts` (metadata route wiring only)
- `docs/task-orchestration/*` contract notes that prove compliance

## Out-of-Scope
- Any Team 1/3/4/5 modules
- Client routing/UI (only stub usage notes if needed)
- Non-metadata collections or seeding utilities outside of metadata bootstrap

## API Contract Changes
1. Existing GET routes stay intact.
2. Add GET endpoints for each dataset:
   - `/metadata/court-locations`
   - `/metadata/case-types`
   - `/metadata/document-templates`
   - `/metadata/urgency-levels`
   - `/metadata/hearing-types`
   - `/metadata/legal-specializations`
3. `GET /metadata` returns all datasets as `{ type: MetadataResponse[] }`.
4. Admin routes (require `admin` or `superAdmin` role + Clerk auth header):
   - `POST /metadata/:type` -> create entry.
   - `PATCH /metadata/:id` -> update label/metadata/state.
   - `PATCH /metadata/:id/status` -> toggle `isActive`.
5. Response envelope keeps `sendResponse` contract:
   ```json
   {
     "success": true,
     "statusCode": 200,
     "message": "Court locations retrieved successfully",
     "data": [{ "id": "ny-supreme", "label": "NY Supreme Court", ... }]
   }
   ```

## Data / Schema Changes
- New `MetadataItem` Mongoose model
  - Fields: `type`, `key`, `label`, `description`, `region`, `locale`, `color`, `icon`, `sortOrder`, `isActive`, `metadata`.
- Bootstrap defaults from constants for all datasets when DB empty.
- Cache map (TTL 15 minutes) storing data per type + aggregated view.

## Acceptance Checklist Mapping
- Court locations endpoint/value set → new dataset `courtLocations`.
- Case types/categories endpoint/value set → dataset `caseTypes`.
- Document templates endpoint/value set → dataset `documentTemplates`.
- Urgency levels endpoint/value set → dataset `urgencyLevels`.
- Hearing types endpoint/value set → dataset `hearingTypes`.
- Legal specializations endpoint/value set → dataset `legalSpecializations`.
- All metadata accessible via API → aggregated `/metadata` route + typed GETs.
- Cached responses → in-memory cache with busting on mutation + manual `cache=refresh` query override.
- Admin-configurable values → secured CRUD endpoints + validation.

## Test Plan
- **Unit**: cover `MetadataService.getByType`, cache hit/miss, invalid type guard, and mutation invalidates cache (Jest).
- **Integration**: Supertest for one read endpoint and one admin mutation (role stub) to prove HTTP contract.
- **Manual**: Verify seeded defaults returned, admin POST adds entry, GET reflects change after cache invalidation, and unauthorized calls fail.

## Rollback Plan
- Keep constants untouched; allow `MetadataService` fallback to constants if DB errors.
- Feature flag via env `METADATA_DB_ENABLED` (default true). Rollback by setting false → service serves static constants.
- Revert commits limited to metadata module if catastrophic issue arises.

## Risk / Blockers
- Need Clerk-authenticated admin token to hit mutation endpoints (blocked until we have env-ready tokens; manual tests may mock service level).
- Mongo collection migrations not yet in prod; seeding must be idempotent to avoid duplicate keys.
- Local Jest may be slow on Windows; fallback is targeted service tests only.
