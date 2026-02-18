# advyon-server Merge Worklist

## Branch: `sro/feat/foundation-document-reliability`
- [ ] Introduce `fileUploadSecurity` middleware and ensure all upload routes invoke it (cases + documents).  
  Files: `src/app/middlewares/fileUploadSecurity.ts`, `src/app/modules/{case,document}/*.ts`.
- [ ] Merge document controller/service updates for signed content + batch downloads; align with client hook contract.  
  Tests: targeted Jest/integration for upload/download.

## Branch: `ihm/feat/ai-community-intelligence`
- [ ] Add OpenRouter config + AI context/tool modules; register models/services.  
  Files: `src/app/modules/ai/*`, `src/app/config/openrouter.config.ts`.
- [ ] Integrate community moderation/KPI services with existing community routes.  
  Files: `src/app/modules/community/*`.
- [ ] Run new Jest suites (`ai-context-manager.service.test.ts`, `ai.tool.service.test.ts`, `community.ai-assist.service.test.ts`, `community.moderation.service.test.ts`).

## Branch: `sif/feat/core-practice-operations`
- [ ] Layer analytics, case automation, schedule, messaging, notification, personalization modules on top of existing code.  
  Files: `src/app/modules/{analytics,case,schedule,message,notification,user,socket}/*`.
- [ ] Ensure archive scheduler + task generator are registered in application bootstrap.
- [ ] Plan manual/API tests for schedule CRUD, notification delivery, archive flows.

## Branch: `ab/feat/admin-commerce-governance`
- [ ] Add governance configs (CORS, rateLimiter, Stripe) and ensure `app.ts` registers them.  
  Files: `src/app.ts`, `src/app/config/*.ts`, `src/app/middlewares/rateLimiter.ts`.
- [ ] Merge admin refactor + audit logs/system settings models.  
  Files: `src/app/modules/admin/*`.
- [ ] Integrate payment/subscription modules + webhook controller; confirm route registration.  
  Files: `src/app/modules/{payment,subscription}/*`, `src/app/routes/index.ts`.
- [ ] Update contracts + CODEOWNERS/PR template; verify documentation.

## Verification Checklist
- [ ] `npm run lint` & `npm run build`.
- [ ] Targeted Jest suites from AI/community branch.
- [ ] Manual API tests: document download/batch, AI tools (`/ai/tools/*`), admin endpoints (`/admin/*`), payment/subscription flows, schedule + notification flows.
- [ ] Stripe webhook dry run using test secret.
