# Task 3: Code Quality and Architecture

## Component Architecture

- **Single Responsibility**: Each component does one thing (one component per file - R1 from blueprint)
- **Composition over inheritance**: Pages/layouts compose feature/shared components
- **Presentational vs Container**: Feature components encapsulate domain logic; pages are thin compositions
- **Reusability**: Shared primitives in `components/ui`, `components/shared` (Price, SkeletonCard); feature components specific to domain

## Folder & File Structure

Feature-based with singular naming (`service/`):
- `app/`: Route segments (App Router). Routes compose only; no component definitions in pages/layouts
- `features/*`: Domain slices with `api/`, `components/`, `types/`, `utils/`
- `components/`: Shared UI (layout, shared, ui, form, others)
- `data/`: Mock/static data
- `types/`: Global/shared types
- `hooks/`, `lib/`, `utils/`, `config/`: Reusable utilities

Route groups not used; dynamic segment `[market]` at root gives subfolder routing (/ng,/us,/uk,/ca). Layouts at `[market]` level provide market-aware chrome.

## State Management

- **Server State**: TanStack Query (caching, deduplication, staleTime/gcTime, devtools). Ready for API migration.
- **Client State**: Zustand for cart (global, frequent updates, needs localStorage persistence). Selective subscriptions avoid re-renders. Persist middleware for localStorage.
- **Forms**: React Hook Form + Zod for validation.

## API & Service Layer

- `features/*/api/`: Service layer functions (pure, testable) - e.g. `services.service.ts` with filtering/sorting/pagination logic
- Barrel exports via `api/index.ts`
- No raw fetch/axios in components - centralized in service layer
- TanStack Query wrappers can wrap these when moving to real APIs

## Form Handling & Validation

- React Hook Form for form state (minimal re-renders)
- Zod schemas for validation (type-safe)
- shadcn/ui form primitives + thin wrappers in `components/form/` (one per file)

## Error Handling

- Route-level `error.tsx` boundaries per segment (app/[market], app/[market]/service, etc.)
- Global `app/error.tsx`
- Empty states via `EmptyState` component
- Loading via `loading.tsx` + skeletons
- Graceful fallbacks (notFound for invalid routes/slugs)

## Authentication & User State

Current scope: no auth implemented. Structure supports role-based dashboards later: add `features/auth/`, protected routes via middleware/guards, session storage via cookies (existing `utils/storage.ts`), role-based access checks in layouts/middleware.

## Multi-Market, Multi-Currency, Localization

- **Multi-market routing**: Dynamic `[market]` segment (ng/us/uk/ca) - subfolders preserve SEO. `generateStaticParams` for all markets.
- **Multi-currency**: MarketConfig with currency code/symbol and exchangeRate (NGN base). `Price` component formats with `Intl.NumberFormat` per market. Cart stores unitPrice at add time.
- **Localization**: Hero copy varies per market in config. Can extend with i18n (next-intl) if needed.
- **SEO**: Dynamic `generateMetadata` per service (title/description/OG). Market subfolders give clean URLs. For hreflang, recommend adding `<link rel="alternate" hreflang="..." href="..." />` in market layout metadata or head (cover ng/us/uk/ca variants of each page).

## Responsive Design

- Mobile-first with Tailwind breakpoints (sm/md/lg/xl)
- Infinite scroll on mobile, pagination on desktop (as specified)
- CSS-based responsive visibility (`md:hidden`/`hidden md:block`) to avoid hydration flicker
- Semantic HTML, keyboard navigation, focus-visible, alt text, sufficient contrast via theme

## Code Maintainability, Testing, Documentation

- One component per file; clear naming (PascalCase components, camelCase hooks)
- Barrel exports, feature boundaries
- TypeScript strict - type safety throughout
- ESLint configured; build enforces type checking
- Mock data centralized in `data/`
- README with setup/decisions; PLAN docs included

## Git & Version Control Workflow

- Feature branches (e.g. `feat/service-listing`, `feat/cart`)
- Descriptive commits (conventional commits recommended: feat:, fix:, chore:, docs:)
- Keep commits atomic
- PRs with clear description, screenshots if UI changes
- Main branch protected, require passing checks (build/lint/typecheck)
- .gitignore as provided
