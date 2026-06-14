# Hono + Vue / Vite + PostgreSQL + pnpm workspaces monorepo

A monorepo setup using pnpm workspaces with a Hono API and Vue / Vite client backed by a local PostgreSQL database.

## Features

- Run tasks in parallel across apps / packages with pnpm
- Hono API [proxied with Vite](./apps/web/vite.config.ts) during development
- Hono [RPC client](packages/api-client/src/index.ts) resolved directly from source for faster inference
- Shared Zod validators with drizzle-zod
- Shared ESLint config
- Shared tsconfig

## Tech Stack

**api**
- [Hono](https://hono.dev/) on Node.js via `@hono/node-server`
- Hono Zod OpenAPI + Scalar API reference
- Drizzle ORM + drizzle-zod
- PostgreSQL (`pg`)
- stoker

**web**
- Vue 3
- Vite
- Vue Router
- VeeValidate + Zod

**dev tooling**
- TypeScript
- ESLint with `@antfu/eslint-config`
- Vitest

## Project Structure

```
.
├── apps/
│   ├── api/          # Hono REST API (Node.js)
│   └── web/          # Vue / Vite frontend
└── packages/
    ├── api-client/   # Type-safe Hono RPC client
    └── eslint-config/ # Shared ESLint config
```

> All pnpm commands are run from the root of the repo.

## Local Setup

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL running locally (e.g. via [Postgres.app](https://postgresapp.com/) or Docker)

### 1. Install dependencies

```sh
pnpm install
```

### 2. Configure environment

```sh
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env` and fill in your values:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/tech_full_stack
PORT=8787
```

### 3. Run DB migrations

```sh
pnpm db:generate
pnpm db:migrate
```

### 4. Start apps

```sh
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173)

All requests to `/api` are proxied to the Hono server running on [http://localhost:8787](http://localhost:8787).

## Database

| Command | Description |
| --- | --- |
| `pnpm db:generate` | Generate migrations from schema changes |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:studio` | Open Drizzle Studio |

## Tasks

### Lint

```sh
pnpm lint
```

### Test

```sh
pnpm test
```

Tests run against a real PostgreSQL database — make sure `DATABASE_URL` in `apps/api/.env` points to a running instance.

### Build

```sh
pnpm build
```
