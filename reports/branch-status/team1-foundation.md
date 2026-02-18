# Team 1 – Foundation & Document Reliability

## Branch Identity
- Workflow doc branch: `sro/feat/foundation-document-reliability`
- SSOT / execution alias: `sro/feat/foundation-document-reliability`
- Owners: frontend-lead, backend-lead, qa-testing-lead, security-engineer (Team 1 pod)
- Code areas: auth flows, onboarding hooks, dashboard document views, server document module

## Current Status (2026-02-18)
- No local branch beyond `master` and `ihm/feat/ai-community-intelligence`; Team 1 branch has not been pulled down yet.
- SSOT rows for WBS-1.2, WBS-1.3, WBS-1.4 (Team 1 slice), WBS-5.3/5.4/5.5, and Team 1-owned tech-debt/testing/security tickets remain `NS` (not started).
- No build/test evidence recorded for Team 1 scope; Task Packets still need creation before coding.

## Completed Work to Date
- None. No commits or SSOT evidence exist for Team 1 deliverables.

## Outstanding Scope Summary
1. **Authentication and Validation**
   - Remove GitHub identity option from Clerk UI without touching backend provider config (WBS-1.2).
   - Harden login sync with retries, graceful failure UI, and onboarding fallback (WBS-1.3).
   - Apply full Zod coverage across auth/onboarding/document forms, with shared schema parity on server (Team 1 slice of WBS-1.4 & WBS-SM-MVP-02).
2. **Document Experience**
   - Fix Workspace document preview (loading states, mobile layout, error boundary) – WBS-5.3.
   - Complete document preview page (multi-type adapters, print/share/version) – WBS-5.4.
   - Implement secure downloads (signed URLs, batch queue, progress UI) – WBS-5.5.
3. **Quality & Safety Backlog**
   - Standardize API error envelopes, loading states, and route-level error boundaries (WBS-TD-CQ-01/02/03).
   - Add unit tests for auth/doc utilities and file upload security controls (WBS-TD-TS-01, WBS-TD-SC-03).
   - Close Team 1 owned critical bugs and document upload KPI instrumentation (WBS-SM-MVP-01, WBS-SM-KPI-03).

## Concerns / Risks Before Merge
- Document viewer stack (`features/messages/components/MessageThread.jsx` and several document server modules) is missing per Master Task Breakdown; Team 1 must create these artifacts instead of assuming they exist.
- Download endpoints introduce security risk: must enforce signed URLs, expirations, and audit logs before exposing batch download.
- Auth sync errors block dashboard entry; until WBS-1.3 ships, onboarding remains brittle.
- Shared validation initiative (WBS-1.4) cannot be marked done for the program until Team 1 completes its slice; coordinate schema boundaries with other teams.

## Manual Verification Plan
1. **Auth Providers** – Remove GitHub UI button, verify Google/email flows still render; run through Clerk staging env.
2. **Login Sync Resilience** – Force sync failure (simulate API 500) and confirm retry with capped backoff, user-facing error, and fallback route.
3. **Zod Validation Coverage** – For each Team 1 form (sign in/up, onboarding, document upload, metadata edits) confirm client+server schema rejects invalid input with matching messages.
4. **Workspace Document Preview** – Test PDF/Docx/Images, large files, offline mode, and mobile viewport; verify loading skeleton and error boundary behavior.
5. **Document Page UX** – Exercise print/share/version panels and fallback download path for unsupported file types.
6. **Download Security** – Attempt to reuse expired signed link, ensure denial is logged; run batch download progress/resume flows.
7. **Upload Security** – Upload blocked MIME types and oversized files to confirm rejection + audit entry.
8. **Unit/Integration Tests** – `npm run build` + Team 1 jest suite (auth/doc modules once implemented).

## Pre-Merge Checklist
- Build Task Packets for each WBS item with acceptance/tests/rollback.
- Implement features in guarded slices with feature flags for risky UI rewrites.
- Update SSOT rows with live evidence (commits, builds, manual test logs).
- Provide updated handoff package with risk register and rollback paths before requesting merge into integration.
