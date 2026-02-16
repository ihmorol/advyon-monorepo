# Team 3 Moderation Evaluation Report (WBS-3.1)

## Goal
Evaluate moderation pipeline behavior for:
- Toxicity detection
- Spam detection
- Off-topic detection
- Auto-flag/reject
- Human review queue and appeals

## Runtime Model
- Primary queue-safe moderation path:
  - Fast gate on create/reply (rule + score threshold)
  - Async queue processor for deeper moderation classification
- Package integration:
  - `@tensorflow-models/toxicity` + `@tensorflow/tfjs`
  - Rule-based fallback when model runtime is unavailable

## Threshold Configuration
- Env key: `COMMUNITY_MODERATION_THRESHOLD`
- Default: `0.72`
- Sanitized range: `0.40` to `0.95`

## Functional Checks
- Covered by:
  - `src/app/modules/community/community.moderation.service.test.ts`
- Test cases:
  - Abusive text -> flagged/rejected + toxicity reason
  - Spam-like text -> flagged/rejected + spam reason
  - Legal-domain normal content -> approved

## Baseline Precision Notes (Current Heuristic+Model Stage)
- False Positive risk:
  - Medium on short, low-context messages.
  - Mitigation: review queue + appeal flow.
- False Negative risk:
  - Medium for subtle toxicity/sarcasm.
  - Mitigation: async model pass + configurable threshold.

## Queue and Appeals Evidence
- Review queue endpoints:
  - `GET /community/moderation/reviews`
  - `PATCH /community/moderation/reviews/:reviewId`
- Appeal endpoints:
  - `POST /community/moderation/appeals`
  - `GET /community/moderation/appeals`
  - `PATCH /community/moderation/appeals/:appealId`

## Recommendation
- Keep threshold at `0.72` for MVP posture.
- Tighten to `0.68` only if abuse volume increases and reviewer capacity is available.

