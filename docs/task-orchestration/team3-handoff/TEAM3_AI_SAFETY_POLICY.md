# Team 3 AI Safety Policy and Prompt-Injection Handling

## Scope
- Applies to Team 3 AI/community surfaces in:
  - `advyon-server/src/app/modules/ai/`
  - `advyon-server/src/app/modules/community/`
  - `advyon-client/src/pages/dashboard/AIToolsPage.jsx`
  - `advyon-client/src/store/useAIStore.js`
  - `advyon-client/src/store/useCommunityStore.js`

## Policy Rules
- Legal-only boundary:
  - AI responses are restricted to legal-domain and Advyon platform usage.
  - Off-topic requests are rejected with explicit user-facing refusal.
- Prompt-injection resistance:
  - Inputs are scanned for injection patterns (e.g. "ignore previous instructions", "reveal system prompt").
  - Detected injection signals force policy rejection before model execution.
- Untrusted input handling:
  - Community UGC and AI inputs are sanitized centrally in `input-sanitizer.ts`.
  - Dangerous tags, inline event handlers, and control characters are stripped.
- Memory safety:
  - Conversation memory is bounded (`MAX_MEMORY_MESSAGES`) and sanitized before use.
- Tool safety:
  - AI tools run behind per-tool flags and policy checks.
  - Usage limits are enforced per user/day.

## Guardrail Implementation Map
- Context policy engine:
  - `advyon-server/src/app/modules/ai/ai-context-manager.service.ts`
- Prompt/UGC sanitization:
  - `advyon-server/src/app/modules/ai/input-sanitizer.ts`
- Tool policy enforcement:
  - `advyon-server/src/app/modules/ai/ai.tool.service.ts`
- Moderation policy + queue:
  - `advyon-server/src/app/modules/community/community.moderation.service.ts`

## Rejection Behavior
- Off-topic requests:
  - Return legal-scope rejection message and no model output.
- Prompt-injection attempts:
  - Return policy rejection message and policy signal metadata.
- Blocked tool runs:
  - Persist blocked execution in tool history with `status=blocked`.

## Security Validation Evidence
- Prompt-injection rejection tests:
  - `src/app/modules/ai/ai-context-manager.service.test.ts`
- Moderation safety tests:
  - `src/app/modules/community/community.moderation.service.test.ts`

