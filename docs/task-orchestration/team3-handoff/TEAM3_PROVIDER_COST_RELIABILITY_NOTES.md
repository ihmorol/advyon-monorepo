# Team 3 Model/Provider Cost and Reliability Notes

## Providers in Use
- Chat/tool generation:
  - Groq client path (`AIService.chatWithAI`)
- Document vision analysis:
  - OpenRouter path (`AIService.analyzeWithOpenRouter`)

## Cost Posture
- AI tool runs persist metadata for metering:
  - status, latency, model marker, policy signals
  - history via `AIToolHistoryModel`
- KPI endpoint for usage/failure trends:
  - `GET /ai/tools/metrics`
- Current implementation tracks usage and reliability signals.
- Token-level cost accounting is not yet implemented in this phase.

## Reliability Posture
- Fallback strategy:
  - Moderation model can fall back to rule-based scoring when unavailable.
  - Tool execution captures `failed` status without crashing user flow.
- Queue-safe moderation:
  - Async worker prevents request-latency regression.
- Policy-safe block:
  - Off-topic/injection requests are blocked before LLM execution.

## Observed Build/Test Stability
- Server build:
  - `npm run build` passes on Team 3 branch.
- AI/community test suites:
  - Team 3 targeted jest suites pass.
- Client build:
  - `npm run build` passes.

## Remaining Reliability Work (Post-Team3 DoD)
- Add token/cost counters per provider response.
- Add provider timeout/failover strategy for text generation path.
- Add dashboard view for team-level cost and failure trends.

