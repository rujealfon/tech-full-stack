# @tasks-app/web

React + Vite frontend for the tasks app. During development, API requests to `/api` are proxied to the Hono server running on `http://localhost:8787`.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TanStack Router](https://tanstack.com/router) — file-based routing
- [TanStack Query](https://tanstack.com/query) — data fetching
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — form validation
- [@tasks-app/api-client](../../packages/api-client/) — type-safe Hono RPC client

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Build for production (outputs to `../api/public`) |
| `pnpm lint` | Lint with ESLint |
| `pnpm typecheck` | Type-check with TypeScript |

## Development

Start from the repo root:

```sh
pnpm dev
```

The web app is available at [http://localhost:5173](http://localhost:5173). All `/api` requests are proxied to the API server at `http://localhost:8787`.

## Production Build

```sh
pnpm build
```

The build output goes to `apps/api/public/`, where the API server serves it as static files.
