# AGENTS.md

## Two independent packages, no root workspace

`TODO-Front/` and `TODO-back/` are **independent** — each has its own `package.json`, `pnpm-lock.yaml`, and `node_modules`. There is no root `package.json` or workspace config. Always install and run commands inside the correct subdirectory.

- Package manager: **pnpm** (v10). Never use npm or yarn.
- Do not run pnpm commands from the repo root.

## Frontend (`TODO-Front/`)

**Stack:** React 19 + Vite 7 + TailwindCSS v4 + React Router v7 + Axios + Motion

- ESM (`"type": "module"` in package.json)
- Entry: `src/main.jsx`
- TailwindCSS v4 uses the `@tailwindcss/vite` Vite plugin (not PostCSS/CLI config). Dark mode via `.dark` class (`@custom-variant dark`).
- Auth: JWT stored in `localStorage` (`token`, `user`); sent via axios interceptor as `Authorization: Bearer <token>`.
- Theme: `localStorage` key `todo_theme`.
- API base URL: `import.meta.env.VITE_API_URL` (defaults to `http://localhost:4000`).
- Deployed on Vercel; `vercel.json` rewrites all paths to `/` (SPA catch-all).

### Commands (run inside `TODO-Front/`)

```
pnpm dev          # Vite dev server (default http://localhost:5173)
pnpm build        # Vite production build
pnpm preview      # Vite preview of built output
pnpm lint         # ESLint
```

## Backend (`TODO-back/`)

**Stack:** Express 5 + Mongoose 9 + JWT + bcryptjs + cors + dotenv

- CommonJS (`require`/`module.exports`)
- Entry: `main.js` — connects to MongoDB first, then starts listening on `PORT` (default 4000).
- **Requires `.env` file** with these variables:

| Variable      | Purpose                          |
|---------------|----------------------------------|
| `MONGO_URI`   | MongoDB connection string        |
| `JWT_SECRET`  | Secret for signing tokens        |
| `CLIENT_URL`  | Comma-separated allowed CORS origins |

- CORS allows all origins in `CLIENT_URL` plus localhost:5173, localhost:4173 (non-production only).
- All data routes (`/boards/*`, `/boards/:boardId/lists/*`) require `authMiddleware` (Bearer JWT).
- Auth routes (`/login`, `/register`) are public.

### Commands (run inside `TODO-back/`)

```
pnpm dev     # nodemon main.js (auto-restart on changes)
pnpm start   # node main.js (production)
```

### API routes

```
POST /register               # create user
POST /login                  # login, returns JWT + user
GET    /boards               # list boards
POST   /boards               # create board
GET    /boards/:boardId      # get board
POST   /boards/:boardId/members      # share board
POST   /boards/:boardId/lists        # create list
GET    /boards/:boardId/lists        # get lists
DELETE /boards/:boardId/lists/:listId          # delete list
POST   /boards/:boardId/lists/:listId/tasks    # create task
GET    /boards/:boardId/lists/:listId/tasks    # get tasks
PATCH  /boards/:boardId/lists/:listId/tasks/:taskId   # update task
DELETE /boards/:boardId/lists/:listId/tasks/:taskId   # delete task
```

## Routing structure (Frontend)

```
/          → PublicLayout > Landing
/login     → PublicLayout > Login (redirects to /app if authenticated)
/signup    → PublicLayout > SignUp (redirects to /app if authenticated)
/app       → ProtectedRoute > Layout > Home (board grid)
/app/boards/:boardId → ProtectedRoute > Layout > Board
```

## No tests

No test runner or test files exist. The backend `test` script is a placeholder (`echo "Error: no test specified" && exit 1`).
