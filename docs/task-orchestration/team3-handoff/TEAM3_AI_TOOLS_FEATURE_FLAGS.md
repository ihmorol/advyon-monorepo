# Team 3 AI Tools Feature Flag Matrix (WBS-3.3)

## Client Flags (`advyon-client/src/pages/dashboard/AIToolsPage.jsx`)
- `VITE_AI_TOOL_CONTRACT_ANALYZER` -> `contract-analyzer`
- `VITE_AI_TOOL_DOCUMENT_GENERATOR` -> `document-generator`
- `VITE_AI_TOOL_CASE_RESEARCHER` -> `case-law-researcher`
- `VITE_AI_TOOL_WRITING_ASSISTANT` -> `legal-writing-assistant`
- `VITE_AI_TOOL_DEPOSITION_SUMMARIZER` -> `deposition-summarizer`
- `VITE_AI_TOOL_BRIEF_ANALYZER` -> `brief-analyzer`

## Behavior
- Default behavior:
  - Tool is enabled unless env var is explicitly `false`.
- Disabled behavior:
  - Tool is hidden from the UI selection list.
- Global degradation behavior:
  - Policy-blocked requests return guarded response and are logged as `blocked`.
  - Tool failures are logged as `failed` in history with safe error messaging.

## Server Operational Controls
- Daily usage limit:
  - Env key: `AI_TOOL_DAILY_LIMIT`
  - Enforced in `ai.tool.service.ts`
- Export controls:
  - `GET /ai/tools/history/export?format=json|csv`
- Metrics endpoint:
  - `GET /ai/tools/metrics`

## Release Guidance
- Rollout strategy:
  - Enable one tool at a time in staging.
  - Validate policy behavior and latency before broad enablement.

