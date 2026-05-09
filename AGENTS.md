# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Kurban-AI is a single-service **Next.js 15** full-stack app (TypeScript + React 19 + Tailwind CSS 3.4). It provides AI-powered livestock analysis using the Google Gemini 2.0 Flash API. No real database is needed — auth and history use local JSON files under a `/data/` directory.

### Standard commands

See `package.json` `scripts` section:

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (port 3000) |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Production start | `npm run start` |

### Environment variables

Copy `.env.example` to `.env.local`. The only functional env var is `GOOGLE_AI_API_KEY` (Gemini API key). Without it, the `/api/analyze` endpoint returns mock/simulated analysis data, so the app is fully functional for development without an API key.

### Gotchas

- Both `package-lock.json` and `yarn.lock` exist in the repo. Use **npm** as the package manager (matches `package-lock.json`).
- The app has no automated test suite — there is no `test` script in `package.json`. Validation is done via `npm run lint` and `npm run build`.
- The Tailwind config exists in both `.ts` and `.js` variants (`tailwind.config.ts` is primary, `tailwind.config.js` is a fallback subset). Edit the `.ts` version.
- The `/api/analyze` route creates a `/data/` directory at the project root for JSON-file-based persistence. This directory is git-ignored.
