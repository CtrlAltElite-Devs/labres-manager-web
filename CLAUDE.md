# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**labres-manager-web** is the main web application for the Labres Manager lab results system. Built with Next.js 15 (App Router) + React 19 + Zustand + TanStack React Query. Part of a monorepo — see `../CLAUDE.md` for the full system overview.

## Commands

```bash
npm run dev        # Dev server with Turbopack
npm run build      # Production build
npm run lint       # ESLint (next lint)
npm run start      # Start production server
```

No test framework is configured in this project.

## Architecture

### Routing (App Router)

- `src/app/(auth)/` — Auth route group: sign-in, password, register, register-email, verify-email, onboarding. Uses a centered layout with theme toggle.
- `src/app/dashboard/` — Protected route group: lab results table, individual result view `result/[id]`. Uses a sidebar layout (`SidebarProvider` + `AppSidebar`).
- `src/app/page.tsx` — Root `/` redirects to `/sign-in` via `next.config.ts` redirect.

### Auth Flow

Multi-step identification flow, not a simple login:

1. **Sign-in page** (`/sign-in`): User enters PID → calls `identify/step1` API
2. Server returns an `IdentifyStatus` enum (`NOT_FOUND`, `NEEDS_ONBOARDING`, `NEEDS_EMAIL`, `EMAIL_REGISTERED`, `READY_TO_LOGIN`)
3. Based on status, user is routed to onboarding, email registration/verification, or password entry
4. Password page calls `login` API → receives JWT access + refresh tokens + user data

### Middleware (`src/middleware.ts`)

- Validates JWT access tokens server-side using `jose` (`JWT_SECRET` env var required).
- Reads tokens from Zustand-persisted cookies via `ZustandCookieParser`.
- Protected routes: `/dashboard`, `/profile`, `/settings` → redirect to `/sign-in` if no valid token.
- Auth routes: `/sign-in`, `/password`, `/register` → redirect to `/dashboard` if already authenticated.

### State Management

Three Zustand stores, each with different persistence:

| Store | Persistence | Purpose |
|---|---|---|
| `useTokenStore` (token) | Cookie (`customCookieStorage`) | JWT access token — cookie so middleware can read it |
| `useRefreshTokenStore` | Cookie (`customCookieStorage`) | Refresh token — same reason |
| `useUserStore` (user, pid) | `localStorage` | User profile data and PID |
| `useGlobalStore` | None (in-memory) | Ephemeral UI state (e.g., `hasTestResults`) |
| `usePdfStore` | None (in-memory) | PDF viewer overlay state |

Token stores use `customCookieStorage` (`src/stores/custom-cookie-storage.ts`) — a Zustand `StateStorage` adapter that reads/writes `document.cookie` directly, enabling the Next.js middleware (server-side) to access tokens from cookies.

**Two token access patterns** (`src/stores/tokens/index.ts`):
- `useTokensStoreHook()` — React hook version for components
- `useTokenStoreHookState()` — Direct `.getState()` version for non-React code (Axios interceptors)

### API Layer

- **Axios instance** (`src/lib/axios.ts`): Base URL from `NEXT_PUBLIC_API_BASE_URI`. Auto-attaches Bearer token via request interceptor. Response interceptor handles 401 (auto-refresh) and 429 (rate limit → force logout).
- **Services** (`src/services/`): Organized by domain (`auth/`, `result/`), versioned with `ApiVersion` type (`v1`, `v2`). Each service exports a TanStack React Query hook (`useMutation` or `useQuery`).
- **Service naming**: `{action}-v{n}.ts` pattern (e.g., `login-user-v2.ts`, `get-results-v1.ts`).

### Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URI` | Client + Server | Backend API base URL |
| `JWT_SECRET` | Server only | Middleware JWT validation |

### UI Stack

- **shadcn/ui**: New York style, slate base color, CSS variables enabled. Components in `src/components/ui/`.
- **Theming**: `next-themes` with system default. Custom theme CSS in `src/themes/` (dark.css, light.css).
- **Toast notifications**: `sonner` (via `<Toaster>` in root layout).
- **Forms**: React Hook Form + Zod schemas defined inline in form components.
- **Icons**: Lucide React.
- **Path alias**: `@/*` → `./src/*`

### Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

Configuration is in `components.json`. Components install to `src/components/ui/`.
