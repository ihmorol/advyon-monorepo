# Comprehensive MkDocs Documentation Refresh Plan

## Goals & Success Criteria
- Treat `documentation/` as the canonical MkDocs `docs_dir` so every published page reflects the live `advyon-client` + `advyon-server` code (no placeholder-only stubs).
- Close the gap between navigation defined in `mkdocs.yml` and files on disk; add the missing sections and expand the nav to cover every active module/feature (e.g., `analytics`, `chat`, `contact`, `health`, `payment`, `subscription`, `workspace`).
- Deliver professional-grade content for three audiences (internal engineers, technical stakeholders, external users) with traceability back to source files, diagrams that render in MkDocs Material, and explicit callouts for risks/assumptions.
- Ship mandatory diagrams: database schema, layered/data-flow diagrams (L0/L1), feature roadmap diagram, and role/control diagram (RBAC / user governance) – all encoded in Mermaid so MkDocs renders them.
- Keep the plan executable via parallel agents per `.codex/orchestration/README.md`: orchestrator coordinates, domain leads author content directly from code, and qa/security review before publishing.

## Repository Inventory Snapshot (03-01-2026)
- Backend modules (`advyon-server/src/app/modules/*`): activity, admin, ai, analytics, auth, case, caseAccess, chat, community, contact, dashboard, document, gamification, health, insight, legal, message, metadata, notification, payment, schedule, socket, subscription, user.
- Frontend features (`advyon-client/src/features/*`): auth, community, dashboard, documents, landing, legal, onboarding, profile, schedule, workspace.
- State stores (`advyon-client/src/store/*.js`): per-domain Zustand stores (`useAIStore`, `useCommunityStore`, etc.) + legacy slices (auth.js, cases.js, documents.js).
- Current MkDocs nav (see `mkdocs.yml`) misses at least: architecture/database.md, architecture/auth-flow.md, api/gamification.md, DevOps/security/testing content, AI/analytics/payment/subscription/socket endpoints, and feature showcases. These gaps drive the workstreams below.

## Orchestrated Multi-Agent Workflow
| Agent Skill | Responsibility | Key Outputs |
|-------------|----------------|-------------|
| `team-orchestrator` | Kickoff, context packets, dependency tracking, review gates | Storyboard for each workstream, Kanban updates |
| `backend-lead` + `database-architect` | Inspect `advyon-server` modules, derive REST/socket contracts, schemas | `documentation/api/*.md`, `architecture/database.md`, ER + collection diagrams |
| `frontend-lead` | Map UI composition, routing, shared primitives, state | `documentation/client/*.md`, component catalog tables, component hierarchy diagram |
| `architecture-lead` | End-to-end data-flow, integration touchpoints, auth flows, deployment topologies | `documentation/architecture/*.md` (overview, auth, data-flow, scaling) |
| `devops-engineer` | MkDocs plumbing, build/lint automation, environment parity docs | `guides/operations.md`, CI status badges, mkdocs build verification |
| `qa-testing-lead` | Testing pyramid, coverage dashboards, risk matrix | `guides/testing.md`, linkage to `reports/` risks |
| `security-engineer` | Secrets handling, RBAC/user-control diagram, compliance considerations | `guides/security.md`, RBAC mermaid diagram |
| `product-manager` + `ui-ux-designer` | Feature narratives, personas, release highlights | `features/*.md`, roadmap & feature diagrams |

Parallelization rule: orchestrator unblocks Workstreams 1–5 simultaneously after Workstream 0 (MkDocs infra) is green. Documentation PRs must cite data sources (file paths, commit hashes) in footnotes.

## Workstreams & Deliverables

### WS0 – MkDocs Infrastructure & Gap Audit (Owner: devops-engineer, Due: 2026-03-02)
- Set `docs_dir: documentation` inside `mkdocs.yml` (current default is `docs/`). Confirm `mkdocs serve` resolves relative links.
- Generate a nav-vs-files audit script (`scripts/mkdocs-audit.mjs`) to list missing Markdown files each CI run; integrate into `npm run docs:check`.
- Create placeholder files for nav entries that are entirely absent (architecture/database.md, architecture/auth-flow.md, api/gamification.md, guides/*) with front-matter describing required content.
- Add `documentation/assets/diagrams/` for exported PNG/SVG backups of Mermaid diagrams (Material renders live, but assets give alternative format for PDFs).
- Output: passing `mkdocs build`, audit report committed to `reports/merge-checklist.md`.

### WS1 – System Overview & Index Refresh (Owner: product-manager)
- Update `documentation/index.md` with:
  - Executive summary referencing current sprint goals and links to `reports/` risk checklist (no stale final-report text).
  - Platform capability matrix (per persona: admin, staff attorney, client, community member) using Markdown tables.
  - High-level architecture diagram (Mermaid: `flowchart LR`) linking client, API, AI/LLM providers, databases, external services (Stripe, Clerk, Cloudinary if used).
  - Quick links to onboarding, SLAs, support.
- Add `documentation/features/overview.md` summarizing differentiators + release roadmap (Gantt-style Mermaid or timeline component).

### WS2 – Backend API & Data Contracts (Owner: backend-lead + database-architect)
- For each module listed above, create/update Markdown under `documentation/api/` with:
  - Endpoint tables (method, path, auth, request schema, response schema, error codes) extracted from `advyon-server/src/app/modules/<module>/*`.
  - Inline code references (e.g., ``[`case.service.ts`](advyon-server/src/app/modules/case/case.service.ts)``) so readers can jump to source.
  - Example requests/responses using fenced `json` blocks.
  - Cross-links to related modules (e.g., `caseAccess` ? `case`).
- Expand nav to include new files: `api/analytics.md`, `api/chat.md`, `api/contact.md`, `api/gamification.md`, `api/health.md`, `api/payment.md`, `api/socket.md`, `api/subscription.md`.
- Build `architecture/database.md` capturing Mongo collections, indexes, and relationships (Mermaid `erDiagram` or `classDiagram`). Document data retention + backups.

### WS3 – Frontend Architecture & UI Guides (Owner: frontend-lead)
- Refresh `client/index.md`, `client/features.md`, `client/components.md`, `client/store.md`, `client/routing.md` with:
  - Component hierarchy diagrams (Mermaid `graph TD`) per major feature (Dashboard, Documents, Schedule, Workspace).
  - State store matrix listing each Zustand slice, the domain it mirrors server-side, and events/actions. Pull function names from `advyon-client/src/store/*.js` to keep it source-aligned.
  - Routing table derived from `advyon-client/src/app` / router config (include guards, lazy-loading, breadcrumbs).
  - Accessibility & responsive guidelines referencing UI primitives from `src/components/ui/*`.
- Author `documentation/features/<feature>.md` for any feature with dedicated UI module (workspace, onboarding, profile, community, schedule, documents). Each doc includes: user goals, backend dependencies, data contracts, and screenshots placeholders (to be exported later).

### WS4 – Security, Authentication & User Control (Owner: security-engineer + architecture-lead)
- Populate `architecture/auth-flow.md` describing Clerk/OpenID integration, session lifetimes, token exchange, and server-side guards (`advyon-server/src/app/middleware/*`).
- Add `architecture/user-control.md` with RBAC & governance diagram (Mermaid `stateDiagram` or `graph TD`). Cover user roles (super admin, admin, attorney, client, guest/community) and allowed actions per module.
- Document secrets & config touchpoints referencing `.env.example`, `advyon-server/src/app/config/*.ts`, and `advyon-client/vite.config`. Provide rotation steps and audit requirements.
- Include threat model summary + mitigations for AI endpoints (prompt injection, data leakage) referencing `security-engineer` skill guidance.

### WS5 – Data Flow, Integrations & AI (Owner: architecture-lead + ai-ml-specialist + data-engineer)
- Create `architecture/data-flow.md` with layered diagrams:
  - L0 context diagram (actors ? platform).
  - L1 diagram for critical journeys: Case intake, Document automation, AI legal assistant.
  - Sequence diagram for AI workflows (client prompts ? API ? provider ? response stream) referencing `advyon-server/src/app/modules/ai/*` and `advyon-client/src/features/ai` (if present).
- Document analytics/data pipelines (events captured, sinks, dashboards). If not yet implemented, call out TODO + owner.
- Outline integration touchpoints (Stripe, Cloudinary, email/push providers) with credentials and webhook flows.

### WS6 – DevOps, Deployment & Environments (Owner: devops-engineer)
- Add `guides/operations.md` covering local, staging, prod environments, `.env` matrices, `npm` scripts, containerization (if any), and Cloud hosting diagrams.
- Document CI/CD (GitHub Actions or alternative) referencing scripts under `scripts/` and commands from AGENTS guidelines. Include release checklist referencing `reports/`.
- Provide incident response + rollback instructions, log aggregation, monitoring stack.

### WS7 – Testing & Quality Assurance (Owner: qa-testing-lead)
- Create `guides/testing.md` summarizing testing pyramid: Vitest (client), Jest/Supertest (server), Playwright/end-to-end, plus manual regression.
- Include coverage expectations, flaky test tracking, and how QA results sync to `reports/` risk log.
- Provide step-by-step for running `npm run test` inside each package, referencing already approved command prefixes (per permissions instructions).

### WS8 – Stakeholder-Facing Appendices (Owner: product-manager + ui-ux-designer)
- Add `guides/roadmap.md` (timeline of upcoming epics) and `guides/glossary.md` (domain vocabulary, abbreviations).
- Create `features/case-studies.md` linking to user stories, ROI metrics, testimonial placeholders.
- Build FAQ and troubleshooting pages pointing to support contacts.
- Capture “Nice to add” extras: release notes, compliance statement (GDPR/CCPA), accessibility conformance summary, billing/support SLAs.

## Diagrams (Standardized Assets)
- Database ERD (`architecture/database.md`): Mermaid `erDiagram`, plus exported PNG in `documentation/assets/diagrams/database.png`.
- Data Flow Diagrams (`architecture/data-flow.md`): Mermaid `flowchart`/`sequenceDiagram` for L0/L1 + AI sequence.
- Feature Diagram (`features/overview.md`): Mermaid `mindmap` or `graph LR` showing relationships among modules (Dashboard, Case Mgmt, Messaging, AI Copilot, Community, Gamification).
- User Control Diagram (`architecture/user-control.md`): Mermaid `stateDiagram` enumerating role transitions, or `flowchart` linking roles to permissions matrix.
- Deployment diagram (`guides/operations.md`): Mermaid `graph TD` showing client, API, queue/jobs, databases, third parties.

## Verification & Quality Gates
- Every new/updated page must cite the code/asset source in a `> Source:` block (file path + commit hash) for auditability.
- MkDocs build pipeline (`npm run docs:check`) must run in CI and block merges on broken links or missing files.
- Security + QA review sign-off recorded in `reports/merge-checklist.md` with date/time.
- Stakeholder dry run: share static site preview (e.g., `mkdocs serve` screenshot or `mkdocs gh-deploy --dry-run`) for sign-off from engineering, product, and customer success.

## Next Steps
1. Orchestrator circulates this plan + opens individual tracking issues referencing WS0–WS8 (include owners + due dates).
2. DevOps executes WS0 immediately to unblock content work.
3. Backend/Frontend/Architecture leads run parallel deep-dives (WS2–WS5) with daily sync via orchestrator.
4. QA + Security review after initial drafts; incorporate feedback before publishing.
5. Publish updated docs via MkDocs Material and confirm stakeholders can access them (provide hosted URL + PDF export for offline readers).
