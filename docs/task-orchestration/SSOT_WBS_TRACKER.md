# SSOT WBS Tracker (Canonical Source of Truth)

## Purpose
This document is the only authoritative tracker for planning and execution status for all tasks from `TASK_PLAN.md`.
Execution mechanics are defined in `docs/task-orchestration/AI_EXECUTION_PROTOCOL.md`.

## Status Legend
- `NS`: Not started
- `IP`: In progress
- `RV`: In review
- `DN`: Done
- `BL`: Blocked

## Global Enforcement
- Commit policy is mandatory for every task: commit immediately after touching 3 or more files or completing a logical unit.
- Requirement match cannot be marked pass until checklist items are complete and verified.
- Every row must include evidence link (PR, commit hash, test report, or demo note).
- Unknowns are blockers, not assumptions: move task to `BL` and document open question in handoff.
- Every implementation task requires a Task Packet (scope, contracts, tests, rollback) before coding.

## Team and Branch Registry
| Team | Branch |
|---|---|
| Team 1 Foundation Reliability | `team1/foundation-document-reliability` |
| Team 2 Public Experience | `team2/public-content-metadata` |
| Team 3 AI and Community Intelligence | `team3/ai-community-intelligence` |
| Team 4 Core Practice Operations | `team4/core-practice-operations` |
| Team 5 Admin Commerce Governance | `team5/admin-commerce-governance` |

## Team 3 Task Packet and Execution Log

### Active Task Packet: WBS-3.1 Content Moderation for Community Hub
- Objective: Deliver toxicity/spam/off-topic moderation with auto-flagging, review queue, configurable threshold, and appeals for thread/reply creation.
- In-scope files: `advyon-server/src/app/modules/community/*`, `advyon-server/src/app/modules/ai/*`, Team 3 owned client community/AI files.
- Out-of-scope files: payment/admin/operations modules, non-Team-3 domain features.
- API contract changes: additive moderation metadata on thread/reply create responses and review/appeal endpoints.
- Data/schema changes: additive moderation decision records, queue state, and appeal state.
- Acceptance checklist source: WBS-3.1 checklist in this document.
- Test plan: server unit/integration for moderation path plus client smoke for moderation UX.
- Rollback plan: disable moderation checks with feature flag and retain review queue records.
- Risk and blocker notes: pending package install/runtime constraints for moderation model.

### Team 3 Execution Cycle Log
| Timestamp | WBS ID | Status | Owner/Role | Blockers | Next Action | Evidence |
|---|---|---|---|---|---|---|
| 2026-02-16T17:52:54+06:00 | WBS-3.1 | IP | Team Orchestrator -> ai-ml-specialist + backend-lead | None | Implement moderation core + queue-safe execution | Branch `ihm/feat/ai-community-intelligence` ready; task packet created |
| 2026-02-16T18:14:00+06:00 | WBS-3.1 | IP | ai-ml-specialist + backend-lead | None | Add AI context manager and tools contract integration | Moderation queue models/service/routes wired; community create/reply now auto-moderated |
| 2026-02-16T18:14:00+06:00 | WBS-DEP-SV-02 | IP | ai-ml-specialist | None | Validate runtime fallback + capture commit evidence | `@tensorflow-models/toxicity` + `@tensorflow/tfjs` added and installed; queue worker enabled |
| 2026-02-16T18:14:00+06:00 | WBS-TD-SC-02 | IP | security-engineer + backend-lead | None | Extend sanitization across AI tools and community assistant outputs | Central sanitizer added and integrated into AI chat + community thread/reply flows |
| 2026-02-16T18:24:00+06:00 | WBS-3.1 / WBS-DEP-SV-02 / WBS-TD-SC-02 | IP | Team 3 implementation pod | None | Begin WBS-3.4 centralized legal AI context manager | Commit `feb5396`; `npm run build` pass; `npx jest src/app/modules/community/community.moderation.service.test.ts --runInBand` pass |

## Master WBS Status Board
| WBS ID | Tier | Team | Status | Requirement Match | QA Gate | Security Gate | Commit Rule | Evidence |
|---|---|---|---|---|---|---|---|---|
| WBS-1.1 | MVP | Team 2 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-1.2 | MVP | Team 1 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-1.3 | MVP | Team 1 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-1.4 | MVP | Teams 1-5 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-2.1 | MVP | Team 2 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-2.2 | MVP | Team 2 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-3.1 | Post-MVP | Team 3 | IP | In Progress | Build Passed | Pending | Commit after >=3 files or logical unit | Commit `feb5396`; moderation queue, review+appeal APIs, and auto-moderation hooks implemented |
| WBS-3.2 | Future | Team 3 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-3.3 | Post-MVP | Team 3 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-3.4 | Post-MVP | Team 3 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-4.1 | Post-MVP | Team 4 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-4.2 | Post-MVP | Team 4 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-5.1 | MVP | Team 4 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-5.2 | Post-MVP | Team 4 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-5.3 | MVP | Team 1 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-5.4 | MVP | Team 1 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-5.5 | MVP | Team 1 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-6.1 | Post-MVP | Team 4 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-7.1 | MVP | Team 4 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-7.2 | MVP | Team 4 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-8.1 | Post-MVP | Team 4 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-8.1-FUT | Future | Team 4 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-9.1 | MVP | Team 4 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-10.1 | MVP | Team 2 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-10.2 | MVP | Team 2 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-10.3 | Future | Team 2 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-10.4 | MVP | Team 2 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-10.5 | Future | Team 2 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-11.1 | MVP | Team 5 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-12.1 | MVP | Team 5 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-TD-CQ-01 | Ongoing | Team 1 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-CQ-02 | Ongoing | Team 1 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-CQ-03 | Ongoing | Team 1 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-CQ-04 | Ongoing | Team 5 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-CQ-05 | Ongoing | Team 5 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-PF-01 | Ongoing | Team 4 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-PF-02 | Ongoing | Team 2 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-PF-03 | Ongoing | Team 4 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-PF-04 | Ongoing | Team 4 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-PF-05 | Ongoing | Team 4 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-TS-01 | Ongoing | Team 1 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-TS-02 | Ongoing | Team 4 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-TS-03 | Ongoing | Team 4 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-TS-04 | Ongoing | Team 2 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-TS-05 | Ongoing | Team 5 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-TD-SC-01 | Ongoing | Team 5 owner | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-TD-SC-02 | Ongoing | Team 3 owner | IP | In Progress | Build Passed | Pending | Commit after >=3 files or logical unit | Commit `feb5396`; centralized input sanitizer integrated in AI/community scope |
| WBS-TD-SC-03 | Ongoing | Team 1 owner | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-TD-SC-04 | Ongoing | Team 5 owner | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-TD-SC-05 | Ongoing | Team 5 owner | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-DEP-CL-01 | Enabler | Team 5 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-DEP-CL-02 | Enabler | Team 5 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-DEP-CL-03 | Enabler | Team 4 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-DEP-CL-04 | Enabler | Team 4 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-DEP-SV-01 | Enabler | Team 5 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-DEP-SV-02 | Enabler | Team 3 | IP | In Progress | Build Passed | Pending | Commit after >=3 files or logical unit | Commit `feb5396`; toxicity dependencies installed and queue-safe moderation flow integrated |
| WBS-DEP-SV-03 | Enabler | Team 4 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-OPS-01 | Program | Team 5 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-OPS-02 | Program | Team 5 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-OPS-03 | Program | Team 5 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-OPS-04 | Program | Team 4 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-OPS-05 | Program | Team 5 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-OPS-06 | Program | Team 5 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-SM-MVP-01 | Governance | Team 1 owner | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-SM-MVP-02 | Governance | Teams 1-5 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-SM-MVP-03 | Governance | Team 5 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-SM-MVP-04 | Governance | Team 5 | NS | Pending | Pending | Pending | Commit after >=3 files or logical unit | TBD |
| WBS-SM-MVP-05 | Governance | Team 4 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-SM-MVP-06 | Governance | Team 5 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-SM-MVP-07 | Governance | Team 2 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-SM-KPI-01 | Governance | Team 5 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-SM-KPI-02 | Governance | Team 4 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-SM-KPI-03 | Governance | Team 1 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-SM-KPI-04 | Governance | Team 3 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-SM-KPI-05 | Governance | Team 3 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-SM-KPI-06 | Governance | Team 5 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |
| WBS-SM-KPI-07 | Governance | Team 2 | NS | Pending | Pending | N/A | Commit after >=3 files or logical unit | TBD |

## Requirement Checklists (Canonical)

### WBS-1.1 Landing Page Loading State
- [ ] Loading state shown before content
- [ ] Smooth transition to landing content
- [ ] Handles auth state checking
- Commit rule: commit after >=3 files or logical unit.

### WBS-1.2 Remove GitHub Login from Clerk
- [ ] GitHub login button removed
- [ ] Only email/password and Google remain (if desired)
- Commit rule: commit after >=3 files or logical unit.

### WBS-1.3 Fix Sync Error After Login
- [ ] Graceful error handling
- [ ] Retry mechanism
- [ ] Clear error messages
- [ ] Fallback to onboarding if needed
- Commit rule: commit after >=3 files or logical unit.

### WBS-1.4 All Form Validation with Zod
- [ ] Every form has Zod schema
- [ ] Client-side validation before submission
- [ ] Server-side validation on all endpoints
- [ ] Clear error messages
- [ ] Real-time validation feedback
- Commit rule: commit after >=3 files or logical unit.

### WBS-2.1 Update Content with Meaningful Data
- [ ] All placeholder text replaced
- [ ] Content reflects legal industry
- [ ] Professional tone throughout
- [ ] Multi-language support considered
- Commit rule: commit after >=3 files or logical unit.

### WBS-2.2 Metadata API Updates
- [ ] Court locations endpoint/value set
- [ ] Case types/categories endpoint/value set
- [ ] Document templates endpoint/value set
- [ ] Urgency levels endpoint/value set
- [ ] Hearing types endpoint/value set
- [ ] Legal specializations endpoint/value set
- [ ] All metadata accessible via API
- [ ] Cached responses
- [ ] Admin-configurable values
- Commit rule: commit after >=3 files or logical unit.

### WBS-3.1 Content Moderation for Community Hub
- [ ] Toxicity detection
- [ ] Spam detection
- [ ] Off-topic detection
- [ ] Auto-flag inappropriate content
- [ ] Human review queue
- [ ] Automatic moderation on thread creation
- [ ] Automatic moderation on replies
- [ ] Confidence threshold configurable
- [ ] Appeals process
- Commit rule: commit after >=3 files or logical unit.

### WBS-3.2 AI Features in Community Posts
- [ ] Auto-suggest similar threads
- [ ] AI-generated answer suggestions
- [ ] Legal reference recommendations
- [ ] Thread summarization
- [ ] Smart tagging suggestions
- Commit rule: commit after >=3 files or logical unit.

### WBS-3.3 AI Tools Page
- [ ] Contract analyzer
- [ ] Legal document generator
- [ ] Case law researcher
- [ ] Legal writing assistant
- [ ] Deposition summarizer
- [ ] Brief analyzer
- [ ] All tools functional
- [ ] Usage limits/pagination
- [ ] History of AI interactions
- [ ] Export results
- Commit rule: commit after >=3 files or logical unit.

### WBS-3.4 Centralized AI Context
- [ ] Context boundary enforcement
- [ ] Off-topic question rejection
- [ ] Scope limitation (legal-only)
- [ ] Context-aware responses
- [ ] Conversation memory
- Commit rule: commit after >=3 files or logical unit.

### WBS-4.1 Robust Personalization Database
- [ ] User behavior tracking
- [ ] Case preference learning
- [ ] Dashboard widget personalization
- [ ] Notification preferences
- [ ] AI interaction history
- [ ] Search history
- [ ] Document access patterns
- Commit rule: commit after >=3 files or logical unit.

### WBS-4.2 Case Archive Implementation
- [ ] Archive case endpoint
- [ ] Restore case endpoint
- [ ] Archived cases list view
- [ ] Search archived cases
- [ ] Archive after 30 days automation
- [ ] Permanent delete option
- [ ] Cases can be archived
- [ ] Archived cases hidden from active view
- [ ] Can restore archived cases
- [ ] Data integrity maintained
- Commit rule: commit after >=3 files or logical unit.

### WBS-5.1 New Case Creation UI Update
- [ ] Multi-step wizard
- [ ] Template selection
- [ ] Client assignment
- [ ] Document upload during creation
- [ ] Deadline auto-calculation
- [ ] Duplicate detection
- [ ] Case number auto-generation
- Commit rule: commit after >=3 files or logical unit.

### WBS-5.2 Workspace Sidebar Real-time Updates
- [ ] Real-time notification counts
- [ ] New case alerts
- [ ] Message notifications
- [ ] Activity indicators
- [ ] Online status
- Commit rule: commit after >=3 files or logical unit.

### WBS-5.3 Fix Document Preview in Workspace
- [ ] PDF rendering errors fixed
- [ ] Large file handling fixed
- [ ] Mobile responsiveness fixed
- [ ] Loading states added
- [ ] Error boundaries added
- Commit rule: commit after >=3 files or logical unit.

### WBS-5.4 Fix Document Preview Page
- [ ] All document types supported
- [ ] Smooth navigation
- [ ] Print functionality
- [ ] Share functionality
- [ ] Version history
- Commit rule: commit after >=3 files or logical unit.

### WBS-5.5 Documents Page Download Button
- [ ] Download original file
- [ ] Download analyzed version
- [ ] Batch download
- [ ] Progress indicator
- [ ] Security checks
- Commit rule: commit after >=3 files or logical unit.

### WBS-6.1 Complete Schedule Features
- [ ] Calendar view (month/week/day)
- [ ] Drag-and-drop rescheduling
- [ ] Recurring events
- [ ] Reminders and notifications
- [ ] Calendar sync (Google Calendar first)
- [ ] Conflict detection
- [ ] Resource booking (courtrooms)
- Commit rule: commit after >=3 files or logical unit.

### WBS-7.1 Complete Client Management Workflow
- [ ] Add new client
- [ ] Edit client details
- [ ] Delete/archive client
- [ ] Client detail view
- [ ] Case association
- [ ] Document access management
- [ ] Billing history
- Commit rule: commit after >=3 files or logical unit.

### WBS-7.2 Client-Lawyer Interconnection Message
- [ ] Case-specific messaging
- [ ] File attachments
- [ ] Read receipts
- [ ] Message templates
- [ ] Notification integration
- [ ] Message search
- Commit rule: commit after >=3 files or logical unit.

### WBS-8.1 Update Analytics Page
- [ ] Case resolution time
- [ ] Win/loss ratio
- [ ] Revenue tracking
- [ ] Client acquisition
- [ ] Document processing stats
- [ ] AI usage analytics
- [ ] Custom date ranges
- [ ] Export reports (PDF/Excel)
- Commit rule: commit after >=3 files or logical unit.

### WBS-9.1 Notification System Using Socket
- [ ] Real-time notifications
- [ ] Case updates notification type
- [ ] New messages notification type
- [ ] Document uploads notification type
- [ ] Hearing reminders notification type
- [ ] Deadlines notification type
- [ ] AI analysis complete notification type
- [ ] Mark as read/unread
- [ ] Notification preferences
- [ ] Push notifications (PWA)
- [ ] Email notifications channel
- Commit rule: commit after >=3 files or logical unit.

### WBS-10.1 Landing Page
- [ ] Hero with CTA
- [ ] Features showcase
- [ ] How it works
- [ ] Testimonials
- [ ] Pricing preview
- [ ] FAQ
- [ ] Trust badges
- [ ] Footer with links
- Commit rule: commit after >=3 files or logical unit.

### WBS-10.2 About Page
- [ ] Company mission
- [ ] Team members
- [ ] Vision and values
- [ ] Timeline/milestones
- [ ] Partners
- Commit rule: commit after >=3 files or logical unit.

### WBS-10.3 How to Use Page
- [ ] Getting started guide
- [ ] Feature tutorials
- [ ] Video demonstrations
- [ ] FAQs
- [ ] Best practices
- Commit rule: commit after >=3 files or logical unit.

### WBS-10.4 Contact Page
- [ ] Contact form
- [ ] Email integration
- [ ] Support ticket creation
- [ ] Office locations
- [ ] Social links
- Commit rule: commit after >=3 files or logical unit.

### WBS-10.5 Other Public Pages
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Cookie Policy
- [ ] Security page
- [ ] Accessibility page
- [ ] Careers page
- [ ] Blog placeholder for future
- Commit rule: commit after >=3 files or logical unit.

### WBS-11.1 MVP Admin Controls
- [ ] User management
- [ ] Case oversight
- [ ] Content moderation controls
- [ ] System settings
- [ ] Analytics overview
- [ ] Bulk operations
- [ ] Audit logs
- Commit rule: commit after >=3 files or logical unit.

### WBS-12.1 Payment Integration
- [ ] Subscription plans
- [ ] Stripe integration
- [ ] Payment history
- [ ] Invoice generation
- [ ] Usage-based billing
- [ ] Trial management
- [ ] Payment method management
- Commit rule: commit after >=3 files or logical unit.

## Program Operations Checklists

### WBS-OPS-01 Multi-device Git safety
- [ ] Team branches protected in GitHub
- [ ] Required status checks configured
- [ ] CODEOWNERS guards cross-team ownership boundaries
- Commit rule: commit after >=3 files or logical unit.

### WBS-OPS-02 PR quality consistency
- [ ] PR template enforces WBS mapping
- [ ] PR template requires acceptance evidence
- [ ] PR template requires rollback section
- Commit rule: commit after >=3 files or logical unit.

### WBS-OPS-03 Cross-device sync discipline
- [ ] Mandatory fetch/rebase cadence documented and adopted
- [ ] Draft PR updates required every 4 hours
- [ ] Stale branch detection enabled
- Commit rule: commit after >=3 files or logical unit.

### WBS-OPS-04 Contract-first development
- [ ] API contracts frozen before implementation windows
- [ ] Contract changes versioned and approved
- [ ] Consumer compatibility tests added for changed contracts
- Commit rule: commit after >=3 files or logical unit.

### WBS-OPS-05 Merge train and conflict playbook
- [ ] Two daily merge windows scheduled
- [ ] Conflict ownership and resolution SLA defined
- [ ] Integration branch health checks required before merge
- Commit rule: commit after >=3 files or logical unit.

### WBS-OPS-06 Handoff SLA governance
- [ ] Handoff template usage is mandatory
- [ ] Handoff acceptance SLA is below 4 hours
- [ ] Escalation path is documented and exercised
- Commit rule: commit after >=3 files or logical unit.

## Technical Debt Checklists

### Code Quality
- [ ] WBS-TD-CQ-01 Consistent error handling across all API calls
- [ ] WBS-TD-CQ-02 Proper loading states everywhere
- [ ] WBS-TD-CQ-03 Error boundaries for all routes
- [ ] WBS-TD-CQ-04 Standardized TypeScript interfaces
- [ ] WBS-TD-CQ-05 Comprehensive JSDoc comments

### Performance
- [ ] WBS-TD-PF-01 Proper caching strategies
- [ ] WBS-TD-PF-02 Optimize images and assets
- [ ] WBS-TD-PF-03 Pagination to all list endpoints
- [ ] WBS-TD-PF-04 Virtual scrolling for large lists
- [ ] WBS-TD-PF-05 Request deduplication

### Testing
- [ ] WBS-TD-TS-01 Unit tests for critical utilities
- [ ] WBS-TD-TS-02 Integration tests for API endpoints
- [ ] WBS-TD-TS-03 E2E tests for critical user flows
- [ ] WBS-TD-TS-04 Accessibility audits
- [ ] WBS-TD-TS-05 Performance benchmarks

### Security
- [ ] WBS-TD-SC-01 Rate limiting on all endpoints
- [ ] WBS-TD-SC-02 Input sanitization
- [ ] WBS-TD-SC-03 File upload security
- [ ] WBS-TD-SC-04 CORS configuration review
- [ ] WBS-TD-SC-05 Secrets management audit

## Dependency Checklists
- [ ] WBS-DEP-CL-01 `@stripe/stripe-js`
- [ ] WBS-DEP-CL-02 `@stripe/react-stripe-js`
- [ ] WBS-DEP-CL-03 `@fullcalendar/react` (or equivalent)
- [ ] WBS-DEP-CL-04 `recharts` (if needed)
- [ ] WBS-DEP-SV-01 `stripe`
- [ ] WBS-DEP-SV-02 moderation package (`@tensorflow-models/toxicity` or equivalent)
- [ ] WBS-DEP-SV-03 `node-cron`

## Release and KPI Verification
- [ ] WBS-SM-MVP-01 All critical bugs fixed
- [ ] WBS-SM-MVP-02 All forms validated
- [ ] WBS-SM-MVP-03 Payment system working
- [ ] WBS-SM-MVP-04 Admin controls functional
- [ ] WBS-SM-MVP-05 Basic analytics tracking
- [ ] WBS-SM-MVP-06 99 percent uptime
- [ ] WBS-SM-MVP-07 Less than 2s page load
- [ ] WBS-SM-KPI-01 User registration rate
- [ ] WBS-SM-KPI-02 Case creation rate
- [ ] WBS-SM-KPI-03 Document upload rate
- [ ] WBS-SM-KPI-04 AI feature usage
- [ ] WBS-SM-KPI-05 Community engagement
- [ ] WBS-SM-KPI-06 Revenue metrics
- [ ] WBS-SM-KPI-07 Support ticket volume

## Handoff Rule
For every WBS item, handoff must include context, acceptance checklist, risks, open questions, and receiver sign-off.
