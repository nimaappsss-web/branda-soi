---
name: popin-blueprint
description: >-
  Use when scaffolding, structuring, or reviewing a new project (Next.js App
  Router OR React + Vite with react-router v7). It defines the canonical folder
  structure, the portable core kit (auth, HTTP, TanStack Query, query keys,
  storage, hooks), feature-slice anatomy, form strategy (shadcn/ui for new
  projects), and the hard rules — one component per file, UI fully separated and
  reusable, no inline component factories, single source of truth with zero
  repetition. Follow it to the letter.
---

# THE BLUEPRINT

**A.K.A. `popin-blueprint`** — the structural contract for every new project.

This document is both a README and an executable skill. When you are asked to
create a **fresh project**, you read this file first and replicate the structure,
the portable kit, and the rules **exactly**. Deviations require an explicit
reason stated to the user.

The reference implementation is this repo (`popin`, Next.js App Router). Where
this repo contains historical inconsistencies, **this document wins** — the rules
below are the corrected, portable form of what should have been built.

---

## 0. The two supported targets

Every rule in this document must hold for **both**:

| Target | Stack |
| --- | --- |
| **A — Next.js** | Next.js (App Router, `src/app`), React 19, TS, Tailwind v4 |
| **B — React + Vite** | Vite, React 19, TS, Tailwind v4, **react-router v7** (layout routes) |

The domain structure (`features/`, `hooks/`, `lib/`, `utils/`, `components/`,
`types/`) is **identical** in both targets. Only the routing/presentation layer
differs (see §4.2). Never bake `next/*` imports into portable kit code beyond
the two files that are explicitly target-specific (`lib/react-query.tsx` mount
point, route guard).

---

## 1. Non-negotiable rules

These are hard rules. A PR that breaks any of them is wrong, regardless of how
well it works.

### R1 — Exactly ONE React component per file

- The file name **is** the component name: `ThingCard.tsx` → `export const ThingCard`.
- **One exported component per file. No exceptions.**
- Never define a second component in the same file — not a wrapper, not a
  `RenderX`, not a private sub-component, not "a div that renders the button".
- Pages (`page.tsx`, `*Page.tsx`) and layouts only **compose** existing
  components. Never define a component inside a page/layout file.
- Pure non-UI helpers (a variant map, a `formatX` function, a constant) may
  colocate in the file **only if** they are not components and not reused
  elsewhere. If reused → `utils/` or `features/<x>/utils/`.

**Violations seen in the reference repo — do NOT replicate:**

```tsx
// ❌ HoverAnimatedButton.tsx exports TWO components
export const HoverAnimatedButton = () => { ... };
export const AnimatedButtonViewMore = () => { ... };   // extract to its own file

// ❌ SplitTextAnimation.tsx
const Word = (...) => { ... };                        // private component
export const HeroSplitTextStagger = (...) => { ... };  // second component
export const ScrollTriggeredSplitText = (...) => { ... };

// ❌ ChatCard.tsx contains 3 components; HostServiceCardSkeleton.tsx contains 2
```

**Correct:**

```tsx
// ✅ src/components/HoverAnimatedButton.tsx  — the one component
export const HoverAnimatedButton = () => { ... };

// ✅ src/components/AnimatedButtonViewMore.tsx — its own file
export const AnimatedButtonViewMore = () => { ... };
```

> Known duplication to never repeat: `components/Loader.tsx` and
> `components/elements/Loader.tsx` are the same component twice. One component →
> one file → one import path.

### R2 — UI is separate, brand-agnostic, and customizable

Every reusable UI component must:

1. Accept `className?: string` and merge it with `clsx(...)` as the **first**
   argument so callers can override anything.
2. Expose `variant` / `size` props instead of hardcoded colors.
3. Contain **no marketing copy** and no product-specific text — strings belong
   to pages and feature components.
4. Contain **no data fetching**. Presentational components receive data via
   props; containers (feature components / pages) call the API hooks.
5. Contain **no redirects or storage access** — that belongs to hooks
   (`useLogout`) and route guards.

### R3 — One component, one place. Never inline-and-render.

Do not create a component plus a second component whose only job is to render
the first one in the same file. Composition happens at the **call site**:

```tsx
// ❌ same file: the primitive AND its renderer
const Button = (...) => <button ...>{children}</button>;
const RenderSubmitButton = () => <div><Button type="submit">Save</Button></div>;

// ✅ Button.tsx holds Button only; SubmitButton.tsx holds the composed version
// ✅ or the parent page composes them directly
<div>
  <Button type="submit">Save</Button>
</div>
```

### R4 — Placement decision tree (where a file goes)

| Situation | Location |
| --- | --- |
| Generic, used by ≥ 2 features or by routes | `components/` (or `components/elements/`, `components/table/`, …) |
| Used by exactly one feature | `features/<role>/<feature>/components/` |
| Feature component used only inside the dashboard shell | `.../components/dashboardRelated/` |
| Modal component | `.../components/modals/` (or `.../modal/`) |
| Generic stateful logic (no API call) | `hooks/useX.ts` |
| API call (query/mutation) | `features/<role>/<feature>/api/useX.ts` |
| Cross-feature API hook (used by >1 feature) | `api/` at the app root (`src/app/api/` in Next, `src/api/` in Vite) |
| Pure logic used by one feature | `features/<role>/<feature>/utils/` |
| Pure logic used everywhere | `utils/` |
| Route/shell chrome (navbar, footer, sidebar frame) | `layouts/` |
| Types shared across features | `types/index.ts` |
| Types owned by one feature | `features/<role>/<feature>/types/index.ts` |

**Role folders are `guest` and `host`. Feature folders are singular camelCase:**
`auth`, `profile`, `dashboard`, `event`, `stays`, `fleet`, `carHire`,
`contact`, `notifications`.

### R5 — Forms in NEW projects are built on shadcn/ui

For any **new** project:

- Run `npx shadcn@latest init`, then `npx shadcn@latest add` for:
  `button input label select textarea checkbox dialog dropdown-menu table
  tooltip skeleton alert sonner`.
- shadcn primitives live in **`src/components/ui/`** (or `src/app/components/ui/`
  — pick one and never mix).
- **Never edit files inside `components/ui/`** and never fork them. Need
  different behavior? Wrap.
- Thin wrappers that bridge `react-hook-form` + shadcn (label + error + wiring)
  live in **`components/form/`** — one wrapper per file (R1 applies).
- **Do NOT port this repo's `components/form/InputField.tsx`,
  `SelectField.tsx`, `TextAreaField.tsx`, etc. into new projects.** They are
  legacy. shadcn `Input`/`Select`/`Textarea` replace them.
- `Button` also comes from shadcn in new projects. This repo's
  `components/elements/Button.tsx` may be copied only if you need its
  `as="link"` polymorphism — and if you do, it is one file, one component.

This repo (popin) keeps its existing form components; R5 governs **new**
projects.

### R6 — Nothing is fetched outside the API layer

- Components never import `axios`, `fetch`, or `react-query`'s `useQuery`
  inline for app data. They import hooks: `import { useAllStays } from "@/app/features/guest/stays/api"`.
- Every network call goes through `fetchData` (which wraps `axiosInstance`).
- Every request hook lives in `api/useXxx.ts` with a barrel `api/index.ts`.

### R7 — Query keys only from the factory

Never write a raw array literal in `queryKey` / `invalidateQueries`. Always:

```ts
import { staysKeys } from "@/app/utils/query-key-factory";

useQuery({ queryKey: staysKeys.list({ status }), ... });
queryClient.invalidateQueries({ queryKey: staysKeys.all });   // ✅
queryClient.invalidateQueries({ queryKey: ["stays"] });       // ❌ raw literal
```

### R8 — Errors and toasts are centralized

- All user-facing error text comes from `transformError(error)` in
  `utils/utils.ts`, surfaced with `toast.error(...)` (react-hot-toast).
- Never `alert()`, never raw `error.message` from the network layer.
- Mutations: `onError: (error) => toast.error(transformError(error))`.
- Mutations that succeed: `toast.success("...")` + invalidate the factory keys.

### R9 — Storage is wrapped, never touched directly

No `localStorage` / `Cookies` calls outside `utils/storage.ts`. Every key is
prefixed `STORAGE_PREFIX = "<PROJECT>_"`. One `storage.clear()` wipes
everything.

### R10 — Pages stay thin

A route file (`page.tsx` / `XxxPage.tsx`) may only: `"use client"` (Next),
import, compose JSX of existing components, and define **zero** components. If
it grows past a screenful of logic, the logic moves to a hook or a feature
component.

### R11 — No dead or duplicate files

No `utils copy.ts`, no `.DS_Store` committed, no second `Loader`. Before
creating a file, glob for an existing one that does the job.

### R12 — Single source of truth. Zero repetition.

Every constant, type, helper, endpoint, style token, route list, and component
has **exactly ONE definition** in the codebase. Everything else either
**imports it** or **derives from it**. If two files define the same thing, one
of them is wrong — delete it.

**The law in practice:**

| Concern | The ONE place | Everywhere else |
| --- | --- | --- |
| HTTP client / base URL / auth header | `lib/axios.ts` | never read `process.env` / `import.meta.env` for API URLs, never create a second axios/fetch instance |
| Generic request verbs | `utils/fetchData.ts` | no hand-rolled `axios.get/post` in hooks |
| Token/session persistence | `utils/storage.ts` | no raw `localStorage`/`Cookies` (R9) |
| Query keys | `utils/query-key-factory.ts` | no raw arrays (R7) |
| Error text normalization | `transformError` in `utils/utils.ts` | no per-hook error message munging (R8) |
| Route guard lists | `src/proxy.ts` (A) / `router.tsx` guards (B) | no ad-hoc permission checks inside pages |
| Design tokens/colors | `@theme` block in `globals.css` | no retyped hex values in components — use the token/class |
| HTTP verbs, shared zod fragments, empty-option shapes | `utils/constants.ts` | never redeclare `OPTION_VALIDATION` or `{ name, id }` per feature |
| A given component | **one file, one import path** (R1) | no second implementation with the same job |
| A given hook | one file — api hook in `features/*/api/`, generic hook in `hooks/` | never two variants of the same hook |
| A given type/interface | its feature's `types/index.ts` (or root `types/`) | never redeclare an API payload/response type in two files — import it |
| A given feature API surface | the feature's `api/index.ts` barrel | consumers use the barrel, not a mix of deep + barrel paths to the same hook |

**Derived, not restated.** Totals, counts, unique lists, filtered arrays, route
paths built from a base — compute them once from the source data. Never paste
the computed result into a second literal, and never re-implement the same
lookup/`switch` in multiple files: define one map/record keyed by status or id
and index into it.

**When you need something twice → extract before the second copy lands:**

- repeated JSX block (2+ call sites) → extract a component (one file — R1)
- repeated logic/effects → custom hook (`hooks/` or feature `api/`)
- repeated literal (appears 2+ times) → named constant in `utils/constants.ts`
  (global) or the feature's `utils/constants.ts` (feature-only)
- repeated validation fragment → zod piece in `utils/constants.ts`, composed
  with `.extend()` / `.pick()`
- same data reachable via two paths (two hooks, two storage readers) → delete
  the loser, keep one canonical path

**Known violations in this reference repo — do NOT replicate:**

```text
❌ src/app/api/useFileUpload.ts   (208 lines, direct-upload flow)
❌ src/app/hooks/useFileUpload.ts (49 lines,  raw fetch, different endpoint)
   → one upload hook, one location: an api hook (R4/R6).

❌ src/app/components/Loader.tsx
❌ src/app/components/elements/Loader.tsx
   → one Loader, one file (R1/R11).
```

**Anti-repetition check before you finish any task:** grep for the name you
just wrote (`rg "useFileUpload|Loader|OPTION_VALIDATION"`). If a second
definition already existed, your new file is the violation — merge into the
existing source of truth instead.

---

## 2. Stack baseline (what to install)

```bash
# Both targets
npm i @tanstack/react-query @tanstack/react-query-devtools axios zod \
  react-hook-form @hookform/resolvers clsx js-cookie react-hot-toast \
  dayjs lucide-react motion

# Target A (Next.js)
npx create-next-app@latest --src-dir --app --ts --tailwind
npm i nextjs-toploader iconsax-react            # iconsax optional
npm i @tanstack/react-table                     # only if tables are needed

# Target B (React + Vite + react-router v7)
npm create vite@latest -- --template react-ts
npm i react-router
npx shadcn@latest init                          # R5
```

Path alias (both targets) — `tsconfig.json`:

```jsonc
"paths": { "@/*": ["./src/*"] }
```

Vite also needs `vite.config.ts` → `resolve.alias: { "@": "/src" }`.

---

## 3. The portable core kit

This is the part that is **passed from project to project**. Three buckets:

### 3.1 COPY AS-IS (change only prefix + env names)

| File | What it is |
| --- | --- |
| `lib/axios.ts` | Axios instance, auth header interceptor, 401 refresh-token queue, retry, redirect to `/login` |
| `utils/fetchData.ts` | The single generic request function (GET/POST/PUT/PATCH/DELETE) used by every hook |
| `utils/storage.ts` | Cookie/localStorage wrappers: `tokenStorage`, `refreshTokenStorage`, `userIDStorage`, `roleStorage`, `hasHostStorage`, `storage.clear()` — change `STORAGE_PREFIX` |
| `utils/query-key-factory.ts` | Key factory **structure** (delete the keys, keep the shape) |
| `utils/utils.ts` | `transformError` + `AxiosErrorResponse` + date/currency formatters (adapt locale/currency) |
| `utils/constants.ts` | `METHOD`, shared option zod schemas (`OPTION_VALIDATION`, …) |
| `lib/react-query.tsx` | `QueryClientProvider` wrapper, devtools in dev only |
| `api/useFileUpload.ts`, `api/useDeleteUpload.ts`, `api/useCategories.ts` | Cross-feature API hooks (the `api/` root folder) |
| `hooks/useDebounce`, `useToggle`, `useModal`, `useClipboard`, `useComponentVisible`, `useResponsiveVisibility`, `useFilterBySearch`, `useMergeRefs`, `useObjectURL`, `useFileUpload`, `useMultiFileUpload`, `useDateHook` | Generic, product-agnostic hooks |
| `hooks/useLogout.ts` | Clears query cache + storage, routes to `/login` (swap `next/navigation` for `react-router` in target B) |
| `components/Modal.tsx` | Portal to `#modal-root` + focus lock + remove-scroll (or replace with shadcn `dialog` in new projects) |
| `components/ErrorMessage.tsx`, `EmptyState.tsx`, `ErrorState.tsx`, `FullPageLoader.tsx`, `Tooltip.tsx`, `Avatar.tsx` | Generic feedback primitives |

### 3.2 ADAPT (structure yes, content no)

| File | How to adapt |
| --- | --- |
| `utils/animations.ts` | Motion variants are generic — keep the variant vocabulary (`staggerContainerVariant`, `reusableTextVariant`, …), drop product copy |
| `globals.css` `@theme` block | Keep the **token system** (`--color-*`, `--breakpoint-*`), replace the values with the new brand |
| `src/proxy.ts` (Next) / route guard (Vite) | Route-guard skeleton: `publicRoutes` / `authRoutes` / `protectedRoutes` arrays — rewrite the paths |
| `components/elements/*` | Only if not using shadcn for that primitive |
| `components/table/*` | TanStack Table wrappers — keep if the new project uses tables |
| `components/animation/SplitTextAnimation.tsx` | Generic, but split into one component per file first (R1) |
| `lib/react-query.tsx` default options | Keep the shape; tune `staleTime`/`gcTime` per product |

### 3.3 DO NOT COPY (product-specific)

- `layouts/` → `Navbar`, `Footer`, `Testimonies`, `TestimonyCard`,
  `PaymentSection`, `PrivacyNav`, `StarRating`
- `utils/dummyData.ts`, `utils/constants.tsx` nav/status-color tables
  (`NAV_LINKS`, `FEATURE_COLORS`, `STAYS_STATUS_COLORS`, `SEE_MORE_LINKS`)
- Everything under `features/` (the code, not the **anatomy** — see §5)
- Route folders `(outer)`, `(auth)`, `(inner)`
- Hero/background CSS classes in `globals.css` (`.event-hero`, `.shortlet-hero`, …)
- `components/form/*` (superseded by shadcn for new projects — R5)
- `NOTIFICATIONS_GOLANG_IMPLEMENTATION.md` and other project docs

---

## 4. Structure

### 4.1 Target A — Next.js App Router (canonical)

```text
src/
├── proxy.ts                      # route guard: public/auth/protected lists + redirects (Next 16 middleware)
├── app/
│   ├── layout.tsx                # ROOT: fonts, <ReactQueryProvider>, <Toaster/>, #modal-root, top loader
│   ├── globals.css               # Tailwind v4 @theme design tokens
│   ├── not-found.tsx
│   ├── (outer)/                  # PUBLIC shell — layout.tsx = Navbar + Footer (+ smooth scroll)
│   │   ├── layout.tsx
│   │   ├── page.tsx              # landing
│   │   ├── events/  stays/  fleet/           # listing pages
│   │   │   ├── page.tsx
│   │   │   ├── all/page.tsx                  # "see all"
│   │   │   └── [id]/page.tsx                 # detail
│   │   ├── contact/  privacy-policy/  terms-of-service/
│   │   └── ...
│   ├── (auth)/                   # AUTH shell — no Navbar/Footer; own layout.tsx only when needed
│   │   ├── login/  sign-up/  forgot-password/  reset-password/
│   │   ├── verify-account/  google-callback/  onboarding/
│   │   └── host-with-us/         # nested: layout.tsx + page.tsx + onboarding/
│   ├── (inner)/dashboard/        # AUTHENTICATED shell — layout.tsx = sidebar/header frame
│   │   ├── layout.tsx
│   │   ├── guest/                # guest sub-shell (layout.tsx) + routes
│   │   │   ├── page.tsx  profile/
│   │   │   ├── events/  stays/  fleet/  notification/
│   │   │   └── <feature>/[id]/  <feature>/all/  <feature>/notification/
│   │   └── host/                 # host sub-shell (layout.tsx) + routes
│   │       ├── page.tsx  profile/  select-service/
│   │       ├── <feature>/  <feature>/new/  <feature>/[details]/
│   │       └── <feature>/notifications/general/
│   ├── api/                      # CROSS-FEATURE api hooks (not route handlers)
│   │   ├── useFileUpload.ts  useDeleteUpload.ts  useCategories.ts
│   ├── components/               # global UI — R4 decides subfolder
│   │   ├── elements/             # Button, Label, Loader, PageSpinner, ProgressBar
│   │   ├── form/                 # form wrappers (legacy here; shadcn wrappers in new projects)
│   │   ├── table/                # TanStack Table primitives
│   │   ├── carousels/  animation/
│   │   └── Modal.tsx  EmptyState.tsx  ErrorMessage.tsx  ...
│   ├── features/                 # FEATURE SLICES — the heart of the app
│   │   ├── guest/    auth  profile  dashboard  event  stays  carHire  contact
│   │   ├── host/     auth  profile  dashboard  events  stays  fleet
│   │   └── notifications/        # cross-role feature (barrel: index.ts → ./api + ./types)
│   ├── hooks/                    # generic hooks (portable)
│   ├── layouts/                  # app-level shell pieces (Navbar, Footer) — NOT portable
│   ├── lib/                      # axios.ts, react-query.tsx  ← PORTABLE
│   ├── types/                    # global types
│   └── utils/                    # fetchData, storage, query-key-factory, utils,
│                                 # constants, animations  ← PORTABLE (dummyData is not)
```

### 4.2 Target B — React + Vite, react-router v7

Domain folders are copied verbatim; routing is translated:

```text
src/
├── main.tsx                      # createRoot → <QueryProvider> + <ToasterProvider> + <RouterProvider>
├── router.tsx                    # createBrowserRouter: layout routes + RequireAuth
├── api/                          # cross-feature api hooks   (was src/app/api)
├── components/                   # incl. ui/ (shadcn)        (was src/app/components)
├── features/                     # UNCHANGED                  (was src/app/features)
├── hooks/                        # UNCHANGED
├── layouts/                      # PublicLayout, AuthLayout, DashboardLayout + Guest/HostLayout
├── lib/                          # axios.ts, react-query.tsx  (was src/app/lib)
├── routes/                       # page components (XxxPage.tsx)  (was src/app/**/page.tsx)
│   ├── public/       HomePage  EventsPage  EventDetailsPage  ContactPage …
│   ├── auth/         LoginPage  SignUpPage  ForgotPasswordPage …
│   └── dashboard/
│       ├── guest/    DashboardGuestPage  GuestProfilePage  …
│       └── host/     DashboardHostPage  HostNewStayPage  …
├── types/
└── utils/
```

**Translation table (memorize this):**

| Next.js (Target A) | Vite + react-router v7 (Target B) |
| --- | --- |
| `src/app/(outer)/layout.tsx` | `src/layouts/PublicLayout.tsx` |
| `src/app/(auth)/**/page.tsx` | `src/layouts/AuthLayout.tsx` + `src/routes/auth/XxxPage.tsx` |
| `src/app/(inner)/dashboard/layout.tsx` | `src/layouts/DashboardLayout.tsx` |
| `src/app/(inner)/dashboard/guest/layout.tsx` | `src/layouts/GuestLayout.tsx` |
| `src/app/(outer)/events/page.tsx` | `src/routes/public/EventsPage.tsx` |
| `src/app/(outer)/events/[id]/page.tsx` | `src/routes/public/EventDetailsPage.tsx` (`useParams()`) |
| default export of `page.tsx` | named export `export const EventsPage` |
| `src/proxy.ts` route guard | `<RequireAuth>` wrapper route returning `<Outlet/>` or `<Navigate/>` |
| `"use client"` directive | **delete** (everything is client) |
| `next/link` → `<Link href>` | `react-router` → `<Link to>` |
| `useRouter()` from `next/navigation` | `useNavigate()` from `react-router` |
| `useParams()` from `next/navigation` | `useParams()` from `react-router` |
| `not-found.tsx` | `*` route → `<NotFoundPage/>` |
| `metadata` export (title/description) | `document.title` in a `useDocumentTitle` hook (or `react-helmet-async`) |
| `next/image` | plain `<img>` (or a thin `AppImage` wrapper with lazy/placeholder) |
| root `layout.tsx` providers | `main.tsx` |
| `process.env.NEXT_PUBLIC_*` | `import.meta.env.VITE_*` (keep the exported `API_BASE_URL` constant so nothing else changes) |
| `src/proxy.ts` cookie read | `tokenStorage.getToken()` (client-side guard) |

**`router.tsx` skeleton:**

```tsx
import { createBrowserRouter, Navigate, Outlet } from "react-router";

import { tokenStorage } from "@/utils/storage";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { LoginPage } from "@/routes/auth/LoginPage";
import { EventsPage } from "@/routes/public/EventsPage";
// ...

const RequireAuth = () =>
  tokenStorage.getToken() ? <Outlet /> : <Navigate to="/login" replace />;

const RedirectIfAuthed = () =>
  tokenStorage.getToken() ? <Navigate to="/dashboard/guest" replace /> : <Outlet />;

export const router = createBrowserRouter([
  { element: <PublicLayout />, children: [
    { path: "/", element: <HomePage /> },
    { path: "/events", element: <EventsPage /> },
    { path: "/events/:id", element: <EventDetailsPage /> },
  ]},
  { element: <RedirectIfAuthed />, children: [
    { element: <AuthLayout />, children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
    ]},
  ]},
  { element: <RequireAuth />, children: [
    { element: <DashboardLayout />, children: [
      { path: "/dashboard/guest", element: <DashboardGuestPage /> },
      { path: "/dashboard/host", element: <DashboardHostPage /> },
    ]},
  ]},
  { path: "*", element: <NotFoundPage /> },
]);
```

This is the **same** public/auth/protected logic as `src/proxy.ts`, expressed
as layout routes. Route lists (`publicRoutes`, `authRoutes`, `protectedRoutes`)
stay in one place — never scatter permission checks across pages.

---

## 5. Feature-slice anatomy

Every feature — in both targets — has the same shape:

```text
features/<role>/<feature>/
├── api/
│   ├── index.ts                  # barrel: export { useX } from "./useX";  (ALWAYS create it)
│   ├── useGetThings.ts           # one hook per file, named useXxx.ts
│   └── useCreateThing.ts
├── components/
│   ├── ThingCard.tsx             # ONE component per file (R1)
│   ├── ThingDetails.tsx
│   ├── modals/                   # CreateThingModal.tsx
│   └── dashboardRelated/         # dashboard-only variants of feature UI
├── types/
│   └── index.ts                  # Thing, ThingResponse, CreateThingPayload, …
└── utils/
    ├── validationSchema.ts       # zod schema + z.infer type (per form)
    ├── constants.ts              # optional, feature-only
    └── utils.ts                  # optional, feature-only pure helpers
```

Notes:

- Roles: `guest/`, `host/`, and cross-role features sit directly under
  `features/` (e.g. `features/notifications/`) and expose `index.ts` barrels
  (`export * from "./api"; export * from "./types";`).
- When guest and host hit **different endpoints** for the "same" data, they are
  **different features** (`guest/stays` vs `host/stays`) with **different query
  key families** (`staysKeys` vs `hostStayKeys`).
- Import from barrels: `import { useLogin } from "@/app/features/guest/auth/api"`.
  Deep imports of `api/useLogin.ts` from outside the feature are discouraged.

### 5.1 Page composition rule

A page = shell slot + feature sections. Nothing else.

```tsx
// src/app/(outer)/events/page.tsx   (Target A)
"use client";
import { EventFilterBar } from "@/app/features/guest/event/components/EventFilterBar";
import { CategorySection } from "@/app/features/guest/event/components/CategorySection";
import { Button } from "@/app/components/elements/Button";

const EventPage = () => (
  <div>
    <section className="event-hero ...">{/* hero JSX + <EventFilterBar/> */}</section>
    <section className="container"><CategorySection /></section>
  </div>
);

export default EventPage;
```

---

## 6. TanStack arrangement

### 6.1 Provider (copied verbatim)

`lib/react-query.tsx`:

```tsx
"use client";
const twelveHours = 1000 * 60 * 60 * 12;
const sixtySeconds = 60 * 1000;

const defaultOptions: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: twelveHours,
    gcTime: twelveHours,
    refetchInterval: sixtySeconds,
  },
};

const queryCache = new QueryCache({
  onError: (error) => { error.message = "An error occurred. Please try again later."; },
});

// QueryClient created once via useState(() => new QueryClient(...))
// <QueryClientProvider> wraps the app; <ReactQueryDevtools/> only in development
```

- Mount **once**: root `layout.tsx` (A) or `main.tsx` (B).
- Per-hook overrides are allowed (`staleTime: 5 * 60 * 1000`) — the provider
  values are defaults, not laws.

### 6.2 Query key factory — the keys arrangement

One file: `utils/query-key-factory.ts`. Every resource gets a factory with this
**exact five-level shape**:

```ts
export const staysKeys = {
  all: ["stays"] as const,
  lists: () => [...staysKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) => [...staysKeys.lists(), filters] as const,
  details: () => [...staysKeys.all, "detail"] as const,
  detail: (id: string | number) => [...staysKeys.details(), id] as const,
};
```

Naming conventions observed:

| Family | Scope |
| --- | --- |
| `authKeys` | current user / session (`authKeys.currentUser()`) |
| `staysKeys`, `fleetKeys`, `eventKeys`, `categoryKeys` | guest-facing collections |
| `hostStayKeys`, `hostFleetKeys` | host-facing collections (separate endpoints → separate keys) |
| `notificationKeys` | lists carry `{ offset, limit }`; plus `unreadCount()` |

Rules: `as const` everywhere; parameterized members take **one** argument (or
one filters object); derived keys are built by spreading parents — never by
re-typing the root literal.

### 6.3 Query hook template

```ts
// features/host/fleet/api/useAllHostFleet.ts
"use client";
import { useQuery } from "@tanstack/react-query";

import { hostFleetKeys } from "@/app/utils/query-key-factory";
import { fetchData } from "@/app/utils/fetchData";
import { FleetResponse } from "../types";

interface UseAllHostFleetParams { status?: string }

export const useAllHostFleet = ({ status }: UseAllHostFleetParams = {}) => {
  const url = `/host/me/fleets${status ? `?status=${status}` : ""}`;

  return useQuery<FleetResponse>({
    queryKey: hostFleetKeys.list({ status }),
    queryFn: () => fetchData<FleetResponse>(url, "GET"),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
```

### 6.4 Mutation hook template

```ts
// features/host/stays/api/useCreateStay.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { transformError, AxiosErrorResponse } from "@/app/utils/utils";
import { fetchData } from "@/app/utils/fetchData";
import { hostStayKeys } from "@/app/utils/query-key-factory";
import { CreateStayPayload, CreateStayResponse } from "../types";

export const useCreateStay = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateStayResponse, AxiosErrorResponse, CreateStayPayload>({
    mutationFn: (payload) => fetchData<CreateStayPayload>("/host/me/stays", "POST", payload),

    onSuccess: () => {
      toast.success("Stay created successfully!");
      queryClient.invalidateQueries({ queryKey: hostStayKeys.all });   // factory (R7)
    },
    onError: (error) => toast.error(transformError(error)),           // centralized (R8)
  });
};
```

### 6.5 Barrel (`api/index.ts`)

```ts
export { useAllHostStays } from "./useAllHostStays";
export { useStayDetails } from "./useStayDetails";
export { usePublishStay } from "./usePublishStay";
export { useCreateStay } from "./useCreateStay";
```

---

## 7. Auth arrangement (the most portable part)

Four cooperating pieces. Copy all four.

1. **`utils/storage.ts`** — namespaced cookie/localStorage. Cookies for
   `TOKEN`, `USER_ID`, `ROLE`, `HAS_HOST`; localStorage for
   `REFRESH_TOKEN` (guarded with `typeof window`). Export
   `storage.clear()` that wipes every key.
2. **`lib/axios.ts`** —
   - request interceptor: attach `Authorization: Bearer <token>`;
   - response interceptor on **401**: single-flight refresh (a `isRefreshing`
     flag + a queued-promise array), call `POST /auth/refresh`, store rotated
     tokens, retry the original request;
   - refresh failed → `storage.clear()` + redirect `/login`;
   - export `API_BASE_URL` (env switch: prod vs dev) and
     `setAxiosDefaultToken` / `deleteAxiosDefaultToken`.
3. **Route guard** — `src/proxy.ts` (A) or `RequireAuth`/`RedirectIfAuthed`
   (B) with the three route lists: `publicRoutes`, `authRoutes`,
   `protectedRoutes`, plus role branching via `HAS_HOST` cookie.
4. **Session hooks** —
   - `features/guest/auth/api/useLoggedInUser.ts`: `useQuery` keyed
     `authKeys.currentUser()`, `enabled: !!token`, `staleTime: Infinity`,
     no refetch on mount/focus/reconnect;
   - `hooks/useLogout.ts`: `queryClient.removeQueries()` → `storage.clear()`
     → `route.replace("/login")`;
   - mutations `useLogin` / `useRegister` / `useForgotPassword` /
     `useResetPassword` / `useVerificationCode` / `useGoogleAuth` — each one
     file in `features/guest/auth/api/`, each writing tokens through
     `tokenStorage` **never** raw `localStorage`.

Env keys (`.env.local`):

```
NEXT_PUBLIC_API_BASE_URL=          # Target A
NEXT_PUBLIC_DEV_API_BASE_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
# Target B equivalents: VITE_API_BASE_URL, VITE_DEV_API_BASE_URL, VITE_GOOGLE_CLIENT_ID
```

Only `lib/axios.ts` reads these. Never spread `process.env`/`import.meta.env`
reads across the codebase.

---

## 8. Types & validation

- Feature types → `features/<role>/<feature>/types/index.ts`
  (`Thing`, `ThingResponse`, `CreateThingPayload`).
- Global/shared types → `src/types/index.ts`.
- Validation → `features/<role>/<feature>/utils/validationSchema.ts`, always
  pairing schema + inferred type:

```ts
import { object, string } from "zod";

export const LoginSchema = object({
  email: string().email("Please enter a valid email"),
  password: string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
});

export type LoginInputType = z.infer<typeof LoginSchema>;
```

- The form component wires it:

```tsx
const { register, handleSubmit, formState: { errors } } = useForm<LoginInputType>({
  resolver: zodResolver(LoginSchema),
});
```

- Shared option schemas (`OPTION_VALIDATION`, `OPTIONS_VALIDATION`) live in
  `utils/constants.ts` — do not redeclare them per feature.
- Form types come from `z.infer`, not hand-written interfaces. Hand-written
  payload/response interfaces are fine for API bodies.

---

## 9. Forms (new project, shadcn-based)

Pattern: **shadcn primitive + one thin wrapper per file + react-hook-form + zod**.

```tsx
// src/components/form/InputFormField.tsx   ← ONE component (R1)
"use client";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "@/components/ErrorMessage";

interface InputFormFieldProps {
  registration: Partial<UseFormRegisterReturn>;
  hasError?: FieldError;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  isRequired?: boolean;
}

export const InputFormField = ({
  registration, hasError, label, placeholder, type = "text",
  className, isRequired,
}: InputFormFieldProps) => (
  <div className={clsx("w-full", className)}>
    {!!label && (
      <Label htmlFor={registration.name} className="mb-2 block">
        {label}{isRequired && <span className="text-primary"> *</span>}
      </Label>
    )}
    <Input
      id={registration.name}
      type={type}
      placeholder={placeholder}
      aria-invalid={!!hasError}
      className={clsx(hasError && "border-red-500")}
      {...registration}
    />
    {hasError?.message && <ErrorMessage>{hasError.message}</ErrorMessage>}
  </div>
);
```

Same recipe for `SelectFormField`, `TextareaFormField`, `CheckboxFormField`,
`PhoneFormField` — **one wrapper, one file**. Because the wrapper only
composes, re-theming the input is a `className`/CSS-variable change in
`components/ui/*`'s theme, never a fork.

---

## 10. Styling & tokens

Tailwind v4. Tokens live in one `@theme` block — never raw hex in components:

```css
@import "tailwindcss";

@theme {
  --color-primary: #E03E17;
  --color-purple-state: #7F2AFF;
  --color-gray-1: #6A6A6A;
  --color-gray-2: #171615;
  /* ...one token per brand color */
  --breakpoint-xs: 440px;
}
```

- Product-specific background classes (`.event-hero`) are allowed **only** in
  `globals.css`, scoped per page — never as inline style strings repeated in
  components.
- Gradients/overlays as CSS variables under `:root` (`--color-dark-fade`).
- Utility classes for one-off layout are fine in pages; shared component styling
  must be token-driven + `className`-overridable (R2).

---

## 11. Naming & conventions cheat-sheet

| Thing | Convention |
| --- | --- |
| Component file | `PascalCase.tsx`, one component, named export |
| Page (A) | `page.tsx`, **default** export (Next requirement) |
| Page (B) | `XxxPage.tsx`, named export |
| Layout (A) | `layout.tsx`, default export |
| Hook file | `useCamelCase.ts` |
| API hook | `api/useXxx.ts` + `api/index.ts` barrel |
| Feature folder | singular camelCase: `event`, `stays`, `fleet`, `carHire` |
| Role folder | `guest`, `host` |
| Types | `types/index.ts` |
| Zod | `utils/validationSchema.ts` → `XxxSchema` + `XxxInputType` |
| Query keys | `<thing>Keys` with `all/lists/list/details/detail` |
| Imports | `@/` alias, relative only inside the same feature |
| Client directive | `"use client"` first line of any client file in Target A; absent in Target B |
| Toasts | `react-hot-toast` only |
| Icons | `lucide-react` (shadcn default); `iconsax-react` allowed in Target A legacy code |

---

## 12. New-project scaffold checklist (execute in order)

1. **Scaffold** the target (create-next-app or Vite react-ts) with `src/`.
2. **Alias** `@/* → ./src/*` (tsconfig + vite config).
3. **Install** the stack baseline (§2) + shadcn init (R5).
4. **Create the shell folders**: `lib/`, `utils/`, `hooks/`, `api/`,
   `components/` (+ `components/ui`), `features/`, `layouts/`, `types/`,
   `routes/` (B only).
5. **Copy the portable kit** (§3.1). Set `STORAGE_PREFIX`, env names,
   locale/currency in `utils.ts`.
6. **Mount providers**: root `layout.tsx` (A) or `main.tsx` (B) →
   `ReactQueryProvider` + `<Toaster />` + `#modal-root` (+ top loader, fonts).
7. **Write `utils/query-key-factory.ts`** from the template (§6.2) with only
   the resources the project starts with.
8. **Build the route shells** for the target: public / auth / protected
   layouts (A: route groups; B: `router.tsx` layout routes + guards) and wire
   the guard lists (§7.3).
9. **Create the first feature slice** from the anatomy (§5) — api → types →
   utils → components → route page — following R1–R12.
10. **Add design tokens** to `globals.css` `@theme` (§10).
11. **Verify**: `npm run lint` + `tsc --noEmit` (or `npm run build`); grep for
    violations: multiple `export const` components in one file, raw
    `queryKey: [`, `localStorage` outside `storage.ts`, `fetch(`/`axios` outside
    `lib/`, `alert(`.
12. **Duplication audit (R12)**: for every file you created, grep its exported
    name (`rg "export const <Name>"`). Exactly **one** definition may exist.
    Two definitions → merge into the single source of truth and delete the
    copy. Then re-check literals: any magic number/string appearing 2+ times →
    promoted to a constant.

---

## 13. Quick reference — Do / Don't

| Do | Don't |
| --- | --- |
| One component per file, file = component name | Two components (or a component + its renderer) in one file |
| Compose in the parent page | Define components inside `page.tsx` / `XxxPage.tsx` |
| shadcn `components/ui` + thin `components/form` wrappers (new projects) | Port the legacy `InputField`-style inputs into new projects |
| `className` + `variant` props everywhere | Hardcode brand colors/text inside shared UI |
| Hooks in `api/useXxx.ts` + barrel | Raw `axios`/`fetch`/`useQuery` inside components |
| Keys from the query-key-factory | Raw `queryKey: ["x"]` literals |
| `transformError` + `toast` | `alert()`, raw `error.message` |
| `storage.ts` for all persistence | Direct `localStorage` / `Cookies` calls |
| Copy §3.1 between projects verbatim | Copy `layouts/`, `dummyData`, feature code, route folders |
| Follow the anatomy for every feature | Invent a new folder layout per feature |
| Target A & B translation table for routing | Import `next/*` inside portable kit (except documented seams) |
| **One definition, one file — import or derive from it (R12)** | **Duplicate a constant, type, helper, component, or hook — two sources of truth** |
| Extract at the second use (component / hook / constant / zod fragment) | Copy-paste a block, literal, or lookup into another file |
| Compute totals/lists/paths from the source data | Restate a derived value as a second literal |
| Read env/API URLs only in `lib/axios.ts` | Scatter `process.env` / `import.meta.env` reads across the app |
| One status→config map, indexed into | Repeated `switch`/lookup logic in multiple files |
| One canonical import path (the barrel) | Mix deep imports and barrel imports of the same hook |
