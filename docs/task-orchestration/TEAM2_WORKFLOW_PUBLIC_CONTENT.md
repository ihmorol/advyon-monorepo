# Team 2 Workflow - Public Experience, Content, and Metadata

## Branch and Ownership
- Branch: `msi/feat/public-content-metadata`
- Segment `2.1` Branch: `team2.1/public-static-pages`
- Segment `2.2` Branch: `team2.2/public-remaining-scope`
- Primary skills: `ui-ux-designer`, `product-manager`, `frontend-lead`, `backend-lead`
- Agent roles: ui-ux-designer, product-manager, frontend-dev, backend-dev, qa-tester

## Parallel Independence Contract
- Team 2 owns public pages and metadata APIs.
- Owned paths:
  - `advyon-client/src/pages/Home.jsx`
  - `advyon-client/src/pages/AboutPage.jsx`
  - `advyon-client/src/pages/ContactPage.jsx` (create)
  - `advyon-client/src/pages/HowToUsePage.jsx` (create)
  - `advyon-client/src/features/landing/` (create)
  - policy pages under `advyon-client/src/pages/`
  - `advyon-server/src/app/modules/contact/` (create)
  - `advyon-server/src/app/modules/metadata/`
- Do not modify Team 1/3/4/5 modules except contract adapters.

## Device and GitHub Execution Rules
- Start each session with: `git fetch origin --prune`, `git checkout msi/feat/public-content-metadata`, `git pull --rebase origin msi/feat/public-content-metadata`.
- Work only in Team 2 owned paths unless orchestrator approves a cross-team contract change.
- Build a Task Packet for each WBS item (scope, contracts, test plan, rollback) before code edits.
- Push at least every 4 hours and update SSOT evidence links in the same cycle.
- Unknown behavior is a blocker; set SSOT status to `BL` instead of guessing implementation.
- Follow `docs/task-orchestration/AI_EXECUTION_PROTOCOL.md` for deterministic execution details.

## Execution Workflow (independent)
1. Requirements pass: lock content, IA, and metadata schemas.
2. Design pass: finalize page sections and responsive behavior.
3. Build pass: implement pages and APIs with additive changes only.
4. Validation pass: accessibility/performance checks and route validation.
5. Handoff pass: SSOT updates with screenshots and API contract evidence.

## Assigned Tasks - Segment 2.1 (Public Static Pages)
| Order | WBS ID | Deliverable | Requirement Match | Commit Rule |
|---|---|---|---|---|
| 1 | WBS-1.1 | Landing loading state before content render | Loading, smooth transition, auth-state handling | Commit after >=3 files or logical unit |
| 2 | WBS-2.1 | Replace placeholder content platform-wide (public scope) | Legal-domain copy, professional tone, i18n-ready structure | Commit after >=3 files or logical unit |
| 3 | WBS-10.1 | Full landing page build | Hero, features, how-it-works, testimonials, pricing preview, FAQ, trust, footer | Commit after >=3 files or logical unit |
| 4 | WBS-10.2 | About page completion | Mission, team, vision/values, milestones, partners | Commit after >=3 files or logical unit |
| 5 | WBS-10.3 | How to Use page (future) | Start guide, tutorials, videos, FAQs, best practices | Commit after >=3 files or logical unit |
| 6 | WBS-10.5 | Additional public pages | Terms, privacy, cookie, security, accessibility, careers, blog placeholder | Commit after >=3 files or logical unit |
| 7 | WBS-TD-PF-02 | Public asset optimization | Optimized media and loading strategies | Commit after >=3 files or logical unit |
| 8 | WBS-TD-TS-04 | Accessibility audits for public experience | Automated + manual a11y compliance reports | Commit after >=3 files or logical unit |
| 9 | WBS-SM-MVP-07 | Less than 2s public page load target | Measured performance budget passed | Commit after >=3 files or logical unit |

## Assigned Tasks - Segment 2.2 (Remaining Team 2 Scope)
| Order | WBS ID | Deliverable | Requirement Match | Commit Rule |
|---|---|---|---|---|
| 1 | WBS-2.2 | Metadata API expansion | Court/case/template/urgency/hearing/specialization metadata with caching/admin-config | Commit after >=3 files or logical unit |
| 2 | WBS-1.4 (Team 2 domain) | Zod validation for contact/public forms | Client/server validation and clear errors | Commit after >=3 files or logical unit |
| 3 | WBS-10.4 | Contact page + contact backend | Form, email integration, support ticket, office/social info | Commit after >=3 files or logical unit |
| 4 | WBS-SM-MVP-02 (Team 2 domain) | Form validation coverage verification | Team 2 owned forms fully validated | Commit after >=3 files or logical unit |
| 5 | WBS-SM-KPI-07 | Support ticket volume tracking | Contact/support events instrumented | Commit after >=3 files or logical unit |

## Required Handoff Package
- Segment `2.1`: static-page artifacts, visual snapshots, performance and a11y results.
- Segment `2.2`: API contract docs, contact flow validation evidence, KPI instrumentation proof.
- Content map and copy inventory with replaced placeholders.
- Public route accessibility and performance reports.
- Metadata API contract docs and sample payloads.
- SSOT row status with proof links.
