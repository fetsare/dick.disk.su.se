# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
npm test          # Run Vitest tests (run once)
npm run test:watch  # Run Vitest in watch mode
npm run format    # Prettier format
```

Run a single test file:
```bash
npx vitest run lib/format-membership-duration.test.ts
```

## Environment Variables

Required in `.env.local`:
- `DATABASE_URL` — Neon PostgreSQL connection string
- `JWT_SECRET` — Secret for signing session JWTs
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token for profile image uploads
- `BLOB_HOSTNAME` — Vercel Blob hostname (used in `next.config.ts` for image whitelisting)

## Architecture

This is a **Next.js 16 App Router** project for a board game club (dick.disk.su.se). It is deployed on Vercel and uses **Neon** (serverless PostgreSQL) for storage and **Vercel Blob** for profile images.

> **Note from AGENTS.md**: This is Next.js 16 with breaking changes vs earlier versions. Read `node_modules/next/dist/docs/` before writing App Router code.

### Auth model

Authentication is dual-layer:
1. **Server-side**: An `httpOnly` JWT cookie named `session` (7-day expiry). All sensitive operations call `requireAdmin()` or `requireMember()` from `lib/session.ts` at the top of the Server Action.
2. **Client-side**: `lib/auth-context.tsx` provides an `AuthProvider` that caches `{ id, role }` in `localStorage` under key `auth:user`. This is UI-only — it does not grant any real access.

### Data model (users table)

`UserDb` in `lib/types.ts`: `id` (uuid), `email`, `name`, `slug`, `password_hash`, `role` (`admin` | `member`), `is_active`, `title`, `profile_image_url`, `description`, `colonist_link`.

There is also a `member_requests` table with columns: `id`, `name`, `email`, `motivation`, `status` (`pending` | `approved` | `rejected`), `created_at`, `reviewed_by`, `reviewed_at`.

### Key patterns

- **Server Actions** (`'use server'`): All mutations and data fetching go through Next.js Server Actions in `actions.ts` files colocated with routes. Never create API route handlers.
- **Direct SQL**: Uses `neon()` from `@neondatabase/serverless` — raw tagged-template SQL, no ORM.
- **No client fetching**: All data is loaded server-side in page components and passed as props, or mutated via Server Actions.
- **Toasts**: `sonner` (`<Toaster>` in root layout) is used for all user feedback.

### Routes

| Path | Description |
|------|-------------|
| `/` | Home page |
| `/om-oss` | About page |
| `/medlemmar` | Members list |
| `/profil` | Own profile (edit) |
| `/profil/[user]` | Public profile by slug |
| `/bli-medlem` | Membership application form |
| `/bli-medlem/tack` | Post-application thank-you |
| `/login` | Login form |
| `/logout` | Logout action |
| `/admin` | Admin panel — pending/handled member requests, create accounts |
| `/admin/create` | Admin: create a member account directly |
| `/admin/requests` | Admin: list pending requests |
| `/vilkor` | Terms page |

### Components

Shared components live in `components/`: `Button`, `Footer`, `FormField`, `MemberCard`, `Navbar`, `PageTitle`, `TitleBadge`.

### Utilities (`lib/`)

- `session.ts` — JWT auth: `getJwtPayload`, `requireAdmin`, `requireMember`, `getCurrentUser`
- `auth-context.tsx` — Client `AuthProvider` + `useAuth` hook
- `types.ts` — `UserDb`, `User`, `UserRole`
- `slug.ts` — `generateSlugFromName`
- `hash-password.ts` — `hashPassword` (bcrypt)
- `generate-temp-password.ts` — generates temp passwords for new accounts
- `format-membership-duration.ts` — utility with a Vitest test

### CI

GitHub Actions runs `npm run lint` + `npm test` on push/PR to `main`.
