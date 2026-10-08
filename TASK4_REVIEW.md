# Task 4: Website and Product Review - www.branda.com.ng

## 3 Things Working Well

1. **Clean, modern UI** - The site has a polished look with consistent styling, good use of whitespace, and clear hierarchy. Visuals are appealing and brand-forward.
2. **Navigation structure** - Menu/categories are well-organized, making it easy to find services. Top navigation is logical and accessible.
3. **Service presentation** - Product/service cards are clear with images, names, and CTAs. Good visual separation of offerings.

## 5 Areas for Improvement

1. **Performance** - Initial load could be faster. Large images, unoptimized assets, and heavy JS may impact LCP/INP. Needs next/image optimization, code splitting, better caching.
2. **Mobile experience** - Some layouts feel cramped on small screens. Navigation/menu behavior on mobile could be smoother; touch targets need review. Responsive breakpoints need tightening.
3. **Search/Filtering** - Search is present but filtering UX could be improved (multi-select filters, clear all, URL-reflected filters for shareability). Current UX could be more intuitive.
4. **Cart/Checkout clarity** - Cart summary and checkout flow could be more explicit with better empty states, pricing breakdown (subtotal/tax/shipping), and clearer CTAs.
5. **Accessibility** - Missing alt text in places, focus states could be more visible, some ARIA improvements needed. Color contrast should be validated across all states.

## Notable Issues

- **Responsiveness**: Certain sections overflow on mobile (horizontal scroll). Grid behavior inconsistent across breakpoints.
- **Navigation**: Dropdowns can be tricky on touch devices. Mobile menu animation/behavior could improve.
- **UX**: Some CTAs lack clear affordance; loading states inconsistent.
- **Page Speed**: Likely issues with image optimization, render-blocking resources, JS bundle size (desktop/mobile).
- **Accessibility**: Focus management, keyboard navigation for interactive elements, alt attributes for images.
- **UI Consistency**: Spacing, button styles, card heights vary slightly across pages.

## 3 Practical Priorities for Branda V2 (Next.js)

1. **Performance Optimization (Core Web Vitals)** - Use next/image with sizes, prioritize LCP, lazy load, code splitting, cache headers, and measure LCP/INP/CLS. Focus on mobile-first.
2. **Responsive UX with Smart Listing** - Implement mobile-optimized listing (infinite scroll) and desktop pagination with URL-reflected filters (search/category/use case/industry/sort). Improve mobile nav and touch targets.
3. **Robust Cart/Checkout** - Clear empty states, persistent cart (localStorage), transparent pricing (subtotal/tax/total), and a smooth mock confirmation flow. Add accessibility to cart controls.
