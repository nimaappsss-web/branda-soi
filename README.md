# Branda V2 - Service Ordering Interface

A responsive service ordering interface for Branda V2, built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. Supports multi-market routing (/ng, /us, /uk, /ca), service listing/detail pages, cart and checkout with mock confirmation, and responsive UX (pagination on desktop, infinite scroll on mobile).

## Features

- **Multi-market routing**: Subfolder routing `/[market]` (ng/us/uk/ca) with market-specific hero content
- **Service listing**: Grid layout with search, category/Use Case/Industry filters, sorting (price/popularity), pagination (desktop) and infinite scroll (mobile). Filters reflected in URL.
- **Service detail**: Image gallery, pricing, description, what's included, options, quantity selector, Add to Cart/Order Now, related/complementary services. Dynamic metadata (title/description/Open Graph) per service.
- **Cart & Checkout**: Add/remove/update quantity, persistent cart in localStorage (Zustand), flat tax calculation (7.5%), itemized summary, mock confirmation screen.
- **Responsive design**: Works across desktop, tablet, mobile. Semantic HTML, accessible controls, focus states.
- **Performance**: Server Components for listing/detail where appropriate, loading/error/empty states, next/image optimization.

## Tech Stack

- **Framework**: Next.js 16.4.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Base UI)
- **State Management**: Zustand (cart, with persist)
- **Data Fetching**: TanStack Query (installed, ready to extend)
- **Forms/Validation**: React Hook Form, Zod (installed)
- **Utilities**: clsx, tailwind-merge, lucide-react, js-cookie, react-hot-toast, axios, dayjs

## Project Structure (Feature-Based)

Feature folders use singular naming (`service/` as specified). Route files live in `app/`.

```
app/
  [market]/
    service/                    # Listing + detail (SSR/SSG)
    cart/, checkout/            # Cart/checkout flows
    layout.tsx, page.tsx        # Market-aware layout/home
    loading.tsx, error.tsx, not-found.tsx

components/
  layout/ (Header, Footer) - one per file
  market/ (MarketSelector)
  shared/ (Price, SkeletonCard)

features/
  service/                      # Listing logic
    api/, components/, types/, utils/
  service-detail/               # Detail page components
    components/, utils/, types/
  cart/                         # Cart store, utils, components
    store/, utils/, components/, types/
  market/                       # Market config/hooks/components
    config/, hooks/, components/

data/                           # Mock services data
types/                          # Shared types (brand.ts)
```

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev

# Open http://localhost:3000 (redirects to /ng)
```

### Build & Production

```bash
# Type check, lint, build
npm run build

# Start production server
npm start
```

## Multi-Market

- Markets: Nigeria (ng/NGN), USA (us/USD), UK (uk/GBP), Canada (ca/CAD)
- Routing: subfolder `/[market]/...` (SEO-friendly)
- Currency adapts per market via `Price` component using exchange rates (mock)
- Market selector in header updates URL while preserving current path
- Hero copy varies per market

## Cart & Checkout

- Cart persisted in localStorage via Zustand persist (`branda-soi-cart`)
- Flat tax: 7.5% (`TAX_RATE = 0.075`)
- Checkout is mock (no payment integration) - clicking "Place Order" clears cart and shows confirmation
- Order Now adds item and navigates to cart

## Listing UX

- **Desktop**: Pagination (12 items/page). Page reflected in URL.
- **Mobile**: Infinite scroll with IntersectionObserver. Items accumulate client-side.
- **Filters**: Category, Use Case (extra filter 1), Industry (extra filter 2). All reflected in URL. Search debounced.
- **Sort**: Price (Low→High), Price (High→Low), Popularity (desc).

## Mock Data

Sample services across 5 categories: Digital, Gifts, Create, Studio, Prints. Includes images from Unsplash/Picsum, pricing (NGN base), discounts, options/variants, what's included, turnaround, related service IDs, use cases/industries, popularity.

## Key Decisions

- **Feature-based structure**: Domain-driven under `features/`; routes thin in `app/`. Improves maintainability and scalability.
- **Zustand for cart**: Fine-grained reactivity, selective subscriptions, simple persist to localStorage. Avoids context re-render cascades for frequent updates.
- **URL as source of truth**: Filters/search/sort/page in URL for shareability and indexability (SSR-friendly).
- **Server Components for listing/detail**: Better SEO and initial load; client components only for interactivity (search debounce, filters, infinite scroll, cart actions).
- **Infinite scroll (mobile) + pagination (desktop)**: As specified in requirements.

## Testing/QA

```bash
# Lint
npx eslint .

# Type check
npx tsc --noEmit

# Build (runs type check)
npm run build
```

## SEO & Localization

- Subfolder routing `/[market]/...` keeps one domain per market (no subdomains)
- `generateMetadata` on home, listing and service detail (title, description, Open Graph)
- Canonical + hreflang alternates (en-NG, en-US, en-GB, en-CA, en, x-default) generated from one helper: `features/market/utils/seo.ts`
- Server-rendered HTML, semantic headings, alt text on images

## Screenshots / Writeups

Written parts of the screening task:

- `TASK2_PERFORMANCE.md` - performance problem solving
- `TASK3_ARCHITECTURE.md` - architecture and code quality
- `TASK4_REVIEW.md` - website and product review (www.branda.com.ng)
- `TASK5_ANSWERS.md` - short answer questions

## Deployment

Ready for Vercel or any Next.js host. No special environment variables required for mock data.

```bash
# Vercel
npx vercel
```

## Submission

- GitHub repository: https://github.com/nimaappsss-web/branda-soi
- Live deployment: https://branda-soi.vercel.app
- Email: brandamgt@gmail.com (subject: Frontend Developer Screening | Full Name)
