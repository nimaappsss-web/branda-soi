# Task 2: Frontend Performance and Problem Solving

## Issues and Likely Causes

| Issue | Likely Causes | Solutions |
|---|---|---|
| Slow initial page load | Large JS bundle, unoptimized images, blocking third-party scripts, not using SSR/SSG appropriately | Use Server Components, code splitting, next/image, lazy load below-fold, analyze bundle with @next/bundle-analyzer |
| Images taking too long to load | Unoptimized images, wrong formats, no responsive sizing, too large | next/image with sizes, priority for LCP, format selection (AVIF/WebP), blur placeholders, CDN caching |
| Poor performance on mobile | Heavy JS, large images, layout shifts, excessive re-renders | Reduce JS (dynamic imports), optimize images, minimize CLS/LCP/INP, use responsive breakpoints, avoid blocking work |
| Excessive API requests | No caching, duplicate requests, no debouncing/throttling | TanStack Query caching, request deduplication, debounce search, batch requests, optimistic updates |
| Components re-rendering unnecessarily | Inline functions/objects, missing memoization, prop drilling, Context causing broad re-renders | React.memo/useMemo/useCallback, split components, Zustand for granular updates, avoid new object literals in renders |
| Large JavaScript bundle size | Importing whole libraries, duplicate deps, unneeded client components | Tree shaking, dynamic imports for client-only heavy UI, route-based code splitting, bundle analysis, remove unused deps |

## Specific Strategies

### Image Optimization
- Use `next/image` with proper `sizes` for responsive loading
- Set `priority` only for above-fold LCP images
- Serve WebP/AVIF (Next.js auto-converts)
- Lazy load offscreen images (default with next/image)
- Use CDN for static assets

### Lazy Loading & Dynamic Imports
- Dynamic import non-critical client components: `const X = dynamic(() => import('./X'))`
- Lazy load modals/drawers/filters that aren't needed on first paint
- Split route-level chunks via App Router

### Code Splitting
- App Router does automatic route-based splitting
- Keep Server Components dominant; move interactive code to small client islands
- Split large feature components

### Caching
- Server fetch caching: use Next.js fetch cache/revalidation
- Client state: TanStack Query (staleTime/gcTime), properly keyed queries
- Static assets via CDN + browser caching (immutable, long max-age)
- Revalidation (ISR) for semi-static content

### API Request Optimization
- Deduplicate with TanStack Query (single request per key)
- Debounce search inputs (400ms) to avoid rapid calls
- Batch related calls; avoid waterfall requests
- Handle errors and retry appropriately

### Component Optimization
- Prefer Server Components; Client Components only for interactivity
- `React.memo` for pure presentational components with stable props
- `useMemo` for expensive computations, `useCallback` for stable handlers
- Use Zustand for cart (selective subscriptions) to avoid broad re-renders

### Bundle Optimization
- Analyze with `@next/bundle-analyzer`
- Tree shaking (ESM imports)
- Avoid large barrel imports; import specific modules
- Check for duplicate dependencies
- Minimize third-party client scripts

### Rendering Strategy
- **SSR (Server-Side Rendering)**: User-specific, frequently changing, needs fresh data (e.g. cart view with auth context, dynamic filters requiring server-side processing)
- **SSG (Static Generation)**: Static content, rarely changes (e.g. marketing pages, service detail slugs known in advance) - use `generateStaticParams`
- **ISR (Incremental Static Regeneration)**: Semi-static with periodic updates (revalidate in seconds)
- **CSR (Client-Side Rendering)**: Highly interactive, client-only data (e.g. cart interactions, UI state, localStorage-driven views)

For this app: listing/detail can use SSG/SSR with URL params; cart/checkout are client-side (localStorage + interactions).

### Mobile Performance
- Responsive images, touch targets >=44px
- Reduce layout shifts (CLS)
- Minimize main-thread work
- Avoid heavy animations on low-end devices
- Use CSS over JS for simple transitions

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: Optimize hero images (next/image priority, preload), reduce server response time, avoid render-blocking CSS/JS
- **INP (Interaction to Next Paint)**: Reduce JS execution, use passive listeners, avoid long tasks, keep handlers fast
- **CLS (Cumulative Layout Shift)**: Set explicit sizes for images/media, avoid inserting content above existing, reserve space for ads/embeds
