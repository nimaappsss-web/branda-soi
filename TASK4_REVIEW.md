# Task 4: Website and Product Review - www.branda.com.ng

## 3 Things Working Well

1. **Clean, modern UI** - The site has a polished look with consistent styling, good use of whitespace, and clear hierarchy. Visuals are appealing and brand-forward.
2. **Navigation structure** - Menu/categories are well-organized, making it easy to find services. Top navigation is logical and accessible.
3. **Service presentation** - Product/service cards are clear with images, names, and CTAs. Good visual separation of offerings.

## 5 Areas for Improvement

1. **Performance** - Initial load could be faster. Large images, unoptimized assets, and heavy JS may impact LCP/INP. Needs next/image optimization, code splitting, better caching.
2. **Mobile experience** - Some layouts feel cramped on small screens. Navigation/menu behavior on mobile could be smoother; touch targets need review. Responsive breakpoints need tightening.
3. **Typography and spacing** - Type sizes do not feel deliberate: heading, body and label scale shifts between sections, padding and gaps inside buttons are uneven, and the vertical rhythm between sections is inconsistent. This weakens hierarchy and makes some pages feel cramped while others feel loose. One shared type scale and a 4/8-based spacing scale, applied through design tokens, would fix this across the site.
4. **Search, filtering and checkout clarity** - The shop page relies on a header keyword search plus an order-by dropdown and a price widget. There are no category or faceted filters and no URL-reflected filter state, so finding a specific product gets harder as the catalogue grows. Faceted search (category, price range, tags) with shareable, URL-synced state is needed. Cart and checkout also need clearer empty states, a fuller pricing breakdown (subtotal/tax/shipping), and stronger CTA affordances.
5. **Accessibility** - Missing alt text in places, focus states could be more visible, some ARIA improvements needed. Color contrast should be validated across all states.

## Notable Issues

- **Responsiveness**: Certain sections overflow on mobile (horizontal scroll). Grid behavior inconsistent across breakpoints.
- **Navigation**: Dropdowns can be tricky on touch devices. Mobile menu animation/behavior could improve.
- **Navbar dropdown chevron**: The right chevron indicator on dropdown menu items sits off-centre vertically, which reads as unfinished polish on an otherwise clean navigation.
- **Preloader on every route change**: A full-screen preloader fires on each page navigation, including instant client-side transitions. It adds perceived latency and interrupts browsing flow. It should run on first load only, with subsequent navigations handled by lightweight route-level skeletons.
- **UX**: Some CTAs lack clear affordance; loading states inconsistent.
- **Page Speed**: Likely issues with image optimization, render-blocking resources, JS bundle size (desktop/mobile).
- **Accessibility**: Focus management, keyboard navigation for interactive elements, alt attributes for images.

## 3 Practical Priorities for Branda V2 (Next.js)

1. **Performance Optimization (Core Web Vitals)** - Use next/image with sizes, prioritize LCP, lazy load, code splitting, cache headers, and measure LCP/INP/CLS. Focus on mobile-first.
2. **Responsive UX with Smart Listing** - Implement mobile-optimized listing (infinite scroll) and desktop pagination with URL-reflected filters (search/category/use case/industry/sort), built on a shared type scale and 4/8 spacing tokens. Improve mobile nav and touch targets.
3. **Robust Cart/Checkout** - Clear empty states, persistent cart (localStorage), transparent pricing (subtotal/tax/total), and a smooth mock confirmation flow. Add accessibility to cart controls.
