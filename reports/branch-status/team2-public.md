# Team 2 – Public Experience & Metadata

## Branch Identity
- Workflow doc branch: `msi/feat/public-content-metadata` with sub-branches `team2.1/public-static-pages` and `team2.2/public-remaining-scope`
- SSOT / execution alias: `msi/feat/public-content-metadata`
- Owners: ui-ux-designer, product-manager, frontend-lead, backend-lead pod
- Code areas: landing + marketing pages, policy pages, contact/How-To routes, metadata API module

## Current Status (2026-02-18)
- No local Team 2 branch checked out; SSOT rows for every Team 2 WBS remain `NS`.
- Public experience still uses placeholder copy, no contact form backend, and metadata endpoints have not been extended.
- No evidence of Task Packets, design lock, or performance/a11y audits.

## Completed Work to Date
- None. Team 2 deliverables have not started per SSOT and repository history.

## Outstanding Scope Summary
1. **Public Static Pages (Segment 2.1)**
   - Landing loading state (WBS-1.1) + entire landing rebuild (WBS-10.1).
   - Replace placeholder content platform-wide (WBS-2.1).
   - About page (WBS-10.2), How-To (WBS-10.3 future), and additional policy pages (WBS-10.5).
   - Asset optimization (WBS-TD-PF-02) and accessibility audits (WBS-TD-TS-04).
   - Performance budget <2s (WBS-SM-MVP-07).
2. **Metadata & Contact Scope (Segment 2.2)**
   - Metadata API expansions with caching/admin configurability (WBS-2.2).
   - Contact page UI + anti-spam backend module (WBS-10.4) with new `contact` server module creation.
   - Team 2 slice of Zod validation and SSOT validation evidence (WBS-1.4 + WBS-SM-MVP-02).
   - Support ticket KPI instrumentation (WBS-SM-KPI-07).

## Concerns / Risks Before Merge
- New server modules (`contact` and metadata caching) do not exist yet; must be created with additive APIs and backward compatibility.
- Public routes cannot regress auth/redirect behavior; marketing work must remain isolated from dashboard logic per guardrails.
- Accessibility/performance gates require tangible audit artifacts; skipping them delays release readiness.
- Contact form introduces inbound attack surface (spam, injection); rate limiting and CSRF protection must be in the initial implementation.

## Manual Verification Plan
1. **Content Inventory** – Verify every public page has legal-domain copy; run copy diff review to ensure placeholders removed.
2. **Landing Loading State** – Simulate slow auth/content fetch and confirm skeleton/transition flows without layout shift.
3. **About/How-To/Policy Pages** – Check responsive layouts, CTA links, SEO metadata, and internationalization readiness.
4. **Contact Flow** – Submit valid + invalid forms, confirm server-side validation, rate limiting, spam protection, ticket creation, and email/push integration.
5. **Metadata API** – Call each endpoint (court locations, case types, document templates, urgency, hearings, specializations) and confirm caching + admin overrides.
6. **Performance & A11y** – Run Lighthouse/Axe on landing/contact/about; confirm <2s LCP and AA compliance.
7. **Validation Coverage** – Run schema tests for all Team 2 forms and document evidence for WBS-SM-MVP-02 slice.

## Pre-Merge Checklist
- Produce Task Packets per WBS + design approvals (IA, copy decks, API contracts).
- Implement routes/APIs with feature flags until QA/perf gates pass.
- Capture manual verification + audit artifacts and attach to SSOT rows.
- Coordinate with DevOps on CDN/asset strategy before integrating to release branch.
