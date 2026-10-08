# Task 5: Short Answer Questions

## 1. Describe a frontend project you have worked on that involved significant traffic, complex functionality, or a large user base. What was your role?

In a prior role, I contributed to a multi-tenant web application called Talora website is www.taloraagency.com and this averages a traffic of 80 to 100 thousand monthly, serving hundred of thousands of users with complex role-based access, forms, and reporting. My role was Senior frontend engineer (Next js/TypeScript), responsible for building reusable components, state management, API integration, and performance optimizations. I focused on responsive UI, form validation, and reducing bundle size while working closely with backend/API teams.

## 2. Which frontend technologies and frameworks are you strongest in, and why? Include your experience with Next.js.

Strongest in: React, TypeScript, Next.js (App Router), Tailwind CSS, shadcn/ui, TanStack Query, Zustand/Context for state. Next.js is my go-to for SEO-friendly apps with SSR/SSG; I value its routing, Server Components, and performance features. TypeScript + Tailwind enable rapid, type-safe, consistent UI.

## 3. When would you choose SSR, SSG, ISR, or client-side rendering in Next.js, and why?

- **SSR**: User-specific/fresh data needed (e.g. account dashboard, cart depending on session) - SEO + fresh.
- **SSG**: Static, rarely changes (marketing pages, known slugs) - fastest, cached at edge.
- **ISR**: Semi-static with updates (e.g. service catalog) - revalidate on interval, balances freshness + performance.
- **CSR**: Highly interactive, client-only (e.g. cart UI, localStorage-driven, complex client widgets) - minimal server work.

## 4. How do you decide between Server Components and Client Components?

Default to Server Components (better performance, less JS, SEO). Use Client Components only when needed: interactivity (onClick/state), browser APIs (localStorage), hooks (useState/useEffect), third-party client libs. Keep client boundaries small and push to leaf components.

## 5. How do you usually identify and fix slow frontend performance?

Use DevTools Performance/Lighthouse, Web Vitals (LCP/INP/CLS), network analysis. Fixes: optimize images (next/image), code splitting/dynamic imports, reduce bundle, memoization where needed, improve caching (TanStack Query), minimize layout shifts, defer non-critical JS. Measure before/after.

## 6. What is your approach to building reusable and scalable React components?

Follow "one component per file", composition over inheritance, clear props, variants via cva/class-variance-authority, avoid prop drilling. Keep presentational vs container separate. Use TypeScript interfaces, accessible markup, and shared primitives in ui/shared folders. Document usage patterns.

## 7. How do you handle API loading, error, and empty states in Next.js?

Loading: `loading.tsx` and skeleton components. Error: `error.tsx` boundaries with retry. Empty: dedicated EmptyState component with CTA. For client-side: track loading/error in state (TanStack Query provides isLoading/isError/error). Always provide user feedback and graceful recovery.

## 8. How would you handle SEO for a multi-market site with localized content?

Use market subfolders (`/ng`, `/us`, `/uk`, `/ca`) preserving SEO. Generate per-page metadata (title/description/OG) per market. Add hreflang tags linking alternate market versions. Use canonical URLs appropriately. Ensure semantic HTML, structured data where relevant, localized hero/copy per market. Optimize images and Core Web Vitals.

## 9. How do you ensure a website works properly across different screen sizes and browsers?

Mobile-first with Tailwind breakpoints. Test on common breakpoints (sm/md/lg/xl). Use semantic HTML, progressive enhancement. Avoid browser-specific CSS without fallbacks. Test critical flows in modern browsers; use autoprefixer via Tailwind. Validate accessibility and touch targets.

## 10. What tools do you use for debugging frontend issues?

Chrome DevTools (Performance, Network, Elements, Console, Sources), React DevTools, TanStack Query Devtools, Lighthouse/PageSpeed Insights, Next.js error overlay, browser extensions for accessibility. For network: inspect requests/responses. For performance: trace main thread.

## 11. What steps do you take to improve Core Web Vitals?

LCP: optimize hero images (priority), reduce TTFB, preconnect critical resources. INP: minimize JS, avoid long tasks, use passive listeners, code splitting. CLS: reserve space for images/media, avoid layout shifts on content injection, use CSS transforms. Measure with Lighthouse/Web Vitals API and iterate.

## 12. Describe a difficult frontend bug you encountered and how you solved it.

Encountered stale UI after mutations due to incorrect query cache keys/invalidation. Symptoms: list not updating after adding item. Solution: standardized query keys (factory pattern), invalidated affected queries on mutation success, used optimistic updates carefully. Also fixed race conditions with proper loading states. Added logging and tests for the flow.

## 13. How do you ensure your code remains maintainable when working on a large product with multiple developers?

Enforce type safety (TypeScript), linting/formatting, consistent patterns (one component per file, feature-based structure). Use clear naming, barrels, and avoid deep nesting. Code reviews with clear checklists. Keep components small/reusable. Document architecture and key decisions in README. Write self-documenting code; add comments only when necessary. Follow git workflow (branches/PRs).
