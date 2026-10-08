# Branda V2 - Screening Task Implementation Plan (Read-Only)

This document outlines the implementation plan for the Branda V2 frontend screening task.

## 1. Context

- **Stack**: Next.js 16.4.0 (App Router), TypeScript, Tailwind v4
- **Dependencies**: TanStack Query, Axios, React Hook Form + Zod, shadcn/ui (Base UI), js-cookie, react-hot-toast, zustand (to add), clsx, tailwind-merge, lucide-react, motion, dayjs
- **Goal**: Responsive Service Ordering Interface with multi-market support (/ng, /us, /uk, /ca subfolders), service listing/detail, cart+checkout (mock confirmation), localStorage persistence, infinite scroll (mobile) + pagination (desktop), flat tax, extra filters.

## 2. State Management: Zustand vs Context+useState

**Recommendation: Zustand for cart (with persist).** Keep server state in TanStack Query.

- **Context+useReducer/useState**: Simple, no extra deps. Can cause broad re-renders; persisting localStorage needs careful effect handling.
- **Zustand**: Selective subscriptions (fine-grained reactivity), built-in persist middleware, easy devtools, TypeScript-first, small footprint. Excellent for cart with frequent mutations (add/update/remove/qty). Fits feature-based structure.

Rationale: Cart changes frequently; Zustand avoids context re-render cascades and gives clean localStorage persistence. Context is viable if avoiding new deps; Zustand is pragmatic and justified.

## 3. Folder Structure (Feature-Based)

Feature folder name: `service/` (singular) as requested.

```
app/
├── [market]/ (ng|us|uk|ca)
│   ├── layout.tsx              # Market-aware Header/Footer
│   ├── page.tsx                # Market-specific home/hero
│   ├── service/
│   │   ├── page.tsx            # Listing (Server Component, reads searchParams)
│   │   ├── [slug]/
│   │   │   ├── page.tsx        # Detail (generateMetadata + Server Component)
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   └── not-found.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── cart/
│   │   ├── page.tsx             # Client (cart state)
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── checkout/
│   │   ├── page.tsx             # Client (summary + totals)
│   │   ├── confirmation/
│   │   │   └── page.tsx         # Mock confirmation
│   │   └── loading.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── layout.tsx                  # Root providers
├── page.tsx                    # Redirect to /ng
├── loading.tsx
├── error.tsx
└── not-found.tsx

components/
├── layout/ (Header.tsx, Footer.tsx) - one per file
├── market/ (MarketSelector.tsx)
├── shared/ (Price.tsx, SkeletonCard.tsx)
├── ui/ (shadcn - existing)
├── form/ (thin wrappers - existing)
└── others/ (existing)

features/
├── service/
│   ├── api/services.service.ts, api/index.ts
│   ├── components/: ServiceCard, ServiceGrid, ServiceListHeader, Filters (Category+UseCase+Industry), SearchInput (debounced), SortSelect, Pagination (desktop), InfiniteScroll (mobile), DesktopServiceList, MobileServiceList
│   ├── types/index.ts
│   └── utils/filters.ts, utils/constants.ts
├── service-detail/
│   ├── components/: ImageGallery, DetailHeader, WhatIsIncluded, ServiceOptions (variations), QuantitySelector, RelatedServices
│   ├── utils/metadata.ts
│   └── types/index.ts
├── cart/
│   ├── components/: CartItem, CartSummary, EmptyCart, CartActions
│   ├── store/useCartStore.ts (Zustand + persist/localStorage)
│   ├── utils/pricing.ts (subtotal/tax/total, flat tax 7.5%)
│   └── types/index.ts
└── market/
    ├── components/MarketSelector.tsx
    ├── config/markets.ts (codes, countries, currencies, symbols, exchangeRate, hero, featured)
    └── hooks/useMarket.ts

data/
├── mock-services.ts
└── seed.ts (helpers)

hooks/, lib/, utils/, types/, config/ as needed
```

**Rules**: One component per file. Pages/layouts only compose existing components. No inline component definitions in page/layout. Feature APIs exposed via barrels. Server Components dominant; Client Components only where interactivity needed.

## 4. Data Model

**Types** (`types/brand.ts` + feature-level types):
- `MarketCode`: 'ng' | 'us' | 'uk' | 'ca'
- `Currency`: 'NGN' | 'USD' | 'GBP' | 'CAD'
- `Category`: 'Digital' | 'Gifts' | 'Create' | 'Studio' | 'Prints'
- `UseCase`: 'Business' | 'Personal' | 'Event' | 'Marketing' (extra filter 1)
- `Industry`: 'Fashion' | 'Food' | 'Tech' | 'Education' | 'Real Estate' | 'General' (extra filter 2)
- `Service`: id, slug, name, description, category, images[], basePrice (NGN reference), discountPct?, whatIsIncluded[], turnaround, options?, relatedServiceIds[], tags[], useCase[], industry[], urgency?, popularity (0-100)
- `Variant`: id, label, priceDelta?
- `CartItem`: serviceId, slug, name, image, variantId?, variantLabel?, unitPrice (market price at add time), quantity, category
- `MarketConfig`: code, country, currency, symbol, exchangeRate (NGN=1.0), heroTitle, heroSubtitle, featuredSlugs[]

Mock data: ~20-30 services across 5 categories, cross-category related, picsum/unsplash with stable seeds.

## 5. Multi-Market, SEO, Currency

- **Routing**: Dynamic `[market]` segment with subfolders (`/ng`, `/us`, `/uk`, `/ca`). `generateStaticParams` for all 4.
- **Market-specific hero**: Configured per market in `markets.ts`.
- **Currency**: `Intl.NumberFormat` with market currency. Store unit price in market currency at add time for cart consistency. Base prices in NGN reference; convert via exchange rates (mock).
- **SEO**: Dynamic `generateMetadata` per service (title, description, OG image). Plan for hreflang in Task 3 writeup.
- **Price component**: Market-aware formatting (`components/shared/Price.tsx`).

## 6. Listing: Infinite Scroll (Mobile) + Pagination (Desktop)

- **Server Component**: `app/[market]/service/page.tsx` reads `searchParams` (q, category, useCase, industry, sort, page, limit). Filter/sort/paginate on server from mock data. URL is source of truth (shareable/indexable).
- **Search**: Debounced via `useDebounce` (client `SearchInput`) before updating URL.
- **Filters**: Category, Use Case, Industry - update URL on change.
- **Sort**: Price (Low→High), Price (High→Low), Popularity (desc) - update URL.
- **Desktop**: `DesktopServiceList` renders `ServiceGrid` + `Pagination` (links with page param; default limit 12).
- **Mobile**: `MobileServiceList` + `InfiniteScroll` (IntersectionObserver). Accumulate items client-side across pages; stop when exhausted. Track loading to prevent duplicates.
- **Responsive**: Tailwind breakpoints (`md:hidden` / `hidden md:block`) or `useMediaQuery`.
- **States**: `loading.tsx` with skeletons, empty state, `error.tsx`.

## 7. Detail, Cart, Checkout, Confirmation

- **Detail**: `ImageGallery` (client, keyboard accessible), `DetailHeader`, `WhatIsIncluded`, `ServiceOptions` (variations), `QuantitySelector`, `RelatedServices` (relatedServiceIds or same category excluding self). Actions: "Add to Cart" and "Order Now" (navigates to cart).
- **Cart store** (Zustand + persist/localStorage): `add`, `updateQty`, `remove`, `clear`, `getItemCount`. Key items by `serviceId + variantId` for correct increments.
- **Pricing** (flat tax): `TAX_RATE = 0.075` (7.5%) in `features/cart/utils/pricing.ts`. Compute subtotal, tax, total to 2 decimals.
- **Cart page**: List items, adjust/remove, empty state, summary with checkout CTA.
- **Checkout**: Itemized summary + totals (mock, no payment). "Place Order" clears cart and navigates to confirmation.
- **Confirmation**: Mock confirmation screen.

## 8. Performance, A11y, Responsive

- **Images**: `next/image` with sizes, alt text, `priority` only for above-fold hero/gallery.
- **Loading/Error/Empty**: `loading.tsx`, `error.tsx`, `EmptyState` component.
- **A11y**: Semantic HTML (main/section/article/nav/header/footer), focus-visible, labels, aria labels, keyboard navigation, sufficient contrast.
- **Responsive**: Mobile-first; grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`. Filters may collapse on mobile.
- **Code splitting**: Server Components dominant; client components loaded on demand. Dynamic import only if heavy.
- **SEO**: URL-reflected filters, dynamic metadata per service, market subfolders preserve SEO.

## 9. Implementation Phases

**Phase 0**: deps (zustand), types (`types/brand.ts`), market config + hooks, mock data, pricing constants  
**Phase 1**: `[market]` layout/Header/Footer/MarketSelector, useMarket, root redirect, shared components (Price, SkeletonCard), base states  
**Phase 2**: service listing (filters/utils, cards/grid/search/filters/sort, Pagination + InfiniteScroll + wrappers), server page + loading  
**Phase 3**: service detail (gallery/options/quantity/related), generateMetadata/generateStaticParams, actions  
**Phase 4**: cart store + persist, cart/checkout/confirmation, empty states  
**Phase 5**: polish (responsive/a11y), QA, build/lint/typecheck  
**Phase 6**: docs (Tasks 2-5) + README with setup/key decisions

## 10. Deliverables

- Working Next.js App Router code (feature-based: service, service-detail, cart, market)
- Infinite scroll (mobile) + pagination (desktop)
- Multi-market /ng,/us,/uk,/ca with currency adaptation and market-specific hero
- Cart with localStorage, flat tax (7.5%), mock confirmation
- SEO: dynamic metadata, URL-reflected filters
- Loading/error/empty states, responsive, a11y basics
- Docs: Tasks 2-5 + README with setup/key decisions
- Build/lint/typecheck green

## 11. Notes

- Feature folder is `service/` (singular); route is `app/[market]/service/`.
- One component per file throughout.
- Pages compose only; no component definitions inside pages/layouts.
- Zustand chosen for cart (fine-grained reactivity + persist); TanStack Query for server state.
