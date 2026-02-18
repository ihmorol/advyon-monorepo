# Team 3 – AI & Community Intelligence

## Branch Identity
- Branch: `ihm/feat/ai-community-intelligence` (current working branch)
- Owners: ai-ml-specialist, backend-lead, security-engineer, frontend-lead pod
- Code areas: `advyon-server/src/app/modules/{ai,community}`, client community + AI features, shared validation + stores

## Current Status (2026-02-18)
- Branch is present locally; most recent commits (e365747, 676d00d, 860c4b7, f3fa49e, a04e00c, eaeaf61) deliver Team 3 scope.
- SSOT marks WBS-3.1, WBS-3.2, WBS-3.3, WBS-3.4, WBS-DEP-SV-02, WBS-TD-SC-02, WBS-SM-KPI-04, WBS-SM-KPI-05, and Team 3 slices of WBS-1.4 & WBS-SM-MVP-02 as `DN`.
- Manual verification playbook, AI safety policy, feature flags, risk audit, and user guide are published in `docs/task-orchestration/team3-handoff/`.

## Completed Work Snapshot
- **Moderation (WBS-3.1)** – Toxicity/spam/off-topic detection with queue, configurable thresholds, appeals, and admin resolution; async moderation worker + `@tensorflow-models/toxicity` dependency installed.
- **AI Tools (WBS-3.3)** – Contract analyzer, generator, researcher, writing assistant, deposition summarizer, brief analyzer with history, filters, export, pagination, and feature-level flags.
- **Centralized Context (WBS-3.4)** – Legal-only scope enforcement, prompt-injection rejection, personalization memory profile, context profile endpoint, and persistence guards.
- **Community AI Assist (WBS-3.2)** – Similar thread suggestions, AI answer suggestions, legal reference hints, summaries, smart tags, resilient error UX.
- **Validation & Safety** – Shared Zod schemas for Team 3 forms, central sanitizer (WBS-TD-SC-02), KPI endpoints for AI usage/community engagement, manual coverage evidence.

## Outstanding Items / Risks
- Privacy & retention controls for personalization memory still open (risk audit recommends explicit retention window + opt-out UI).
- Need production abuse suite before enabling AI broadly; maintain feature flags (`TEAM3_AI_TOOLS_FEATURE_FLAGS.md`).
- Residual medium risk for toxic content variants (obfuscation) and PII retention; requires operational monitoring and threshold tuning.
- Client automated tests not runnable in current env; rely on targeted jest suites + manual playbook until infra issue solved.

## Manual Verification Checklist
Derived from `TEAM3_MANUAL_VERIFICATION_PLAYBOOK.md`:
1. **Moderation Block & Queue** – Submit abusive thread (`fuck you`), verify rejection + queue item and status transitions (review → appeal → resolved).
2. **Assist Guardrails** – Validate Ask Question modal preconditions, similar threads, smart tags, and failure UX.
3. **AI Tools Workspace** – Run multiple tools, inspect history, status filters, search, pagination, export (JSON/CSV), and refresh.
4. **Context & Personalization** – Test off-topic + prompt-injection rejection, context profile endpoint, and memory continuity across chat sessions.
5. **Validation Edge Cases** – Enforce category contract, short title/content rejection, AI tool input minimums (client & server).
6. **KPI Endpoints** – Exercise `/ai/tools/metrics` and `/community/metrics/engagement` after generating interactions.
7. **Build/Test Evidence** – `npm run build` in server & client, plus targeted jest command listed in the playbook.

## Pre-Merge / Release Gate Tasks
- Keep rollout controlled via per-tool feature flags and moderation thresholds; document toggles per environment.
- Implement privacy retention + opt-out controls before flagging personalization as production-ready.
- Configure observability alerts (moderation rejection spikes, assist 4xx/5xx, context write failures).
- Ensure SSOT remains updated with manual verification outcomes for each deploy candidate.
- Prepare rollback plan (disable AI tools, raise moderation thresholds) as described in risk audit before merging to integration/release.
