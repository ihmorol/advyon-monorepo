# Operations & Deployment Guide

## Repository Layout
- `advyon-client/` – Vite + React SPA with Clerk, Zustand, TanStack Query, Socket.io client.
- `advyon-server/` – Express + TypeScript API with modular architecture, MongoDB, Socket.io, Stripe, Cloudinary, AI providers.
- `documentation/` – MkDocs-ready Markdown (`docs_dir`) that powers Material theme docs.

> Source: documentation/architecture/index.md (c73ac5a)

## Environment Variables
### Server (`advyon-server/.env`)
| Key | Description |
|-----|-------------|
| `PORT` | API + Socket.io port (default 5000) |
| `DATABASE_URL` | MongoDB Atlas URI |
| `BCRYPT_SALT_ROUNDS` | Password hashing cost |
| `DEFAULT_PASS`, `SUPER_ADMIN_PASSWORD` | Seed credentials used by `seedSuperAdmin()` |
| `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY` | Clerk JWT verification |
| `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `RESET_PASS_UI_LINK` | Legacy auth flows |
| `CLOUDINARY_*` | Document upload credentials |
| `OPENROUTER_API_KEY`, `GROQ_API_KEY`, `GEMINI_API_KEY` | AI providers |
| `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` | Billing |
| `CONTACT_SMTP_*`, `CONTACT_EMAIL_*` | Outbound contact ticket emails |
| `MAX_UPLOAD_SIZE_BYTES` | Optional override for fileUploadSecurity, default 50MB |

> Source: advyon-server/src/app/config/index.ts (c73ac5a)

### Client (`advyon-client/.env`)
Use Vite prefixes: `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_API_BASE_URL`, `VITE_STRIPE_PUBLISHABLE_KEY`, etc. The SPA proxies API calls through `src/lib/api/api` which reads these values.

## Local Development
```bash
# Terminal 1 – API + sockets
cd advyon-server
npm install
npm run dev

# Terminal 2 – Client
cd advyon-client
npm install
npm run dev

# Docs preview (Material)
mkdocs serve -f mkdocs.yml
```
- Socket.io runs on the same port as Express (`server.ts` creates an HTTP server and injects `socketService`).
- Ensure MongoDB Atlas IP allow-list includes your workstation; connection logic retries with exponential backoff.

> Source: advyon-server/src/server.ts (c73ac5a)
> Source: advyon-server/src/app/modules/socket/socket.service.ts (c73ac5a)

## Database Utilities
- `npm run seed:db` – seeds the legal database, admin accounts, and metadata.
- `npm run db:indexes` / `npm run db:rebuild-indexes` – manage schema indexes after migrations.
- `npm run db:health` – quick connectivity + stats check (alerts via exit codes in CI).

> Source: advyon-server/package.json (c73ac5a)

## Building & Deploying
1. **Install dependencies** for both client and server (lockfiles committed; avoid `npm update`).
2. **Build artifacts**:
   - Server: `npm run build` (outputs to `advyon-server/dist`). Use `npm run prod` to start from compiled JS.
   - Client: `npm run build` (outputs `advyon-client/dist`). Serve via CDN or behind reverse proxy; configure `VITE_API_BASE_URL` accordingly.
3. **Documentation**: `mkdocs build -f mkdocs.yml` reads from `documentation/` and emits to `site/`. Publish with `mkdocs gh-deploy` or pipeline-specific artifact steps.
4. **Environment promotion**: update `.env` secrets across local/staging/prod simultaneously (Clerk, Stripe, Mongo, AI providers). Document rotations in `reports/` and `guides/security.md`.

## Monitoring & Logging
- Express logs to stdout; instrument hosting stack (e.g., PM2, Docker, Kubernetes) to ship logs to ELK or CloudWatch.
- Mongo connection listeners emit `connected`/`error`/`disconnected` messages—alert on repeated reconnects.
- Socket.io events log when users connect/disconnect; consider piping to metrics for online presence counts.
- Stripe webhooks should log signature validation failures; treat them as alerts to avoid missing invoices.

> Source: advyon-server/src/server.ts (c73ac5a)
> Source: advyon-server/src/app/modules/payment/payment.route.ts (c73ac5a)

## Release Checklist
- [ ] Server + client tests pass (`npm run test`, `npx vitest run --coverage`).
- [ ] Lint + prettier clean.
- [ ] MkDocs audit passes (nav vs files script + `mkdocs build`).
- [ ] Environment diff reviewed (Clerk, Stripe webhooks, Cloudinary, AI keys).
- [ ] `reports/merge-checklist.md` updated with verification evidence.
- [ ] Stakeholder preview link attached (Vercel/Netlify for client, Render/Fly/Heroku for API) and docs static preview shared.

## Incident Response & Rollback
- Keep `npm run db:health` handy to validate DB connectivity post-deploy.
- Payments & subscriptions rely on Stripe webhooks; re-run failed events via Stripe dashboard after rerouting traffic.
- Socket.io issues: restart the API pod/process—it reattaches to the HTTP server automatically.
- For data regressions, leverage Mongo backups (Atlas continuous backups) plus AuditLog history to reconstruct admin actions.


