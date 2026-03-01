# Contributing Guidelines

## Workflow Summary
1. **Create an issue / WBS item** - tie every change to the risk & merge checklist stored under `reports/`.
2. **Branch naming** - use `feature/<scope>` or `fix/<scope>` and reference the WBS ID, e.g., `feature/WBS-5.2-chat-presence`.
3. **Follow Conventional Commits** - `docs: Update API docs - 4 files changed` per `.codex/RULES.md`. Commit as soon as you touch =3 files.
4. **Parallel agents** - align with the orchestration roles in `.codex/orchestration/README.md` (architecture lead, backend lead, QA, etc.). Each agent owns a workstream in `documentation_plan.md`.
5. **Documentation traceability** - whenever you touch behavior or data contracts, update the MkDocs page and cite the source file (`> Source: path (commit)`).

> Source: AGENTS.md (c73ac5a)
> Source: .codex/RULES.md (c73ac5a)

## Coding Standards & Tooling
- **Formatting & linting**: run `npm run lint` / `npm run prettier` in `advyon-server` and `npm run lint` in `advyon-client` before pushing.
- **Type safety**: backend relies on TypeScript + Zod; define DTOs alongside controllers (`<module>.validation.ts`). Frontend hooks/components use TypeScript-friendly patterns even in `.jsx` files—prefer typed hooks and central schemas in `src/lib/validation`.
- **State management**: prefer feature-specific Zustand stores inside `src/store`, with optimistic updates and cache invalidation hooks similar to `useCasesStore`.
- **Error handling**: wrap async Express handlers with `catchAsync`, throw `AppError`, and let `globalErrorHandler` translate them into API responses.
- **Security**: never log secrets. Keep `.env.example` updated and reference env vars via `config` (server) or `import.meta.env` (client).

> Source: advyon-server/package.json (c73ac5a)
> Source: advyon-client/package.json (c73ac5a)
> Source: advyon-server/src/app/utils/catchAsync.ts (c73ac5a)

## Pull Request Checklist
- [ ] Linked issue/WBS entry and updated `reports/merge-checklist.md`
- [ ] Tests executed (`npm run test` server, `npx vitest run --coverage` client)
- [ ] Lint/prettier clean
- [ ] MkDocs build passes (`mkdocs build -f mkdocs.yml`)
- [ ] Screenshots or GIFs for UI changes (attach to PR)
- [ ] Mention QA + Security sign-off when required workstreams touch their domains

## Documentation Requirements
- Store Markdown under `documentation/` (MkDocs `docs_dir`).
- Embed Mermaid diagrams for flows/ERDs; export PNGs into `documentation/assets/diagrams/` when stakeholders need offline copies.
- Add `> Source:` blocks referencing the authoritative module + commit hash whenever describing code-driven behavior.

> Source: mkdocs.yml (c73ac5a)
> Source: documentation_plan.md (c73ac5a)

