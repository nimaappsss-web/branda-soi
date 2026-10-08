Task 5: Short Answer Questions

1. A frontend project with significant traffic, complex functionality or a large user base, and my role.

The biggest one I have worked on was an internal operations platform with several hundred daily active users across multiple teams, with dashboards that pulled from a few different APIs at once. My role was frontend development, owning the UI implementation, the data fetching layer, and the performance work on the reporting screens. The hard part was not the size of the codebase, it was that the same data was being requested from three places and the screens re-rendered constantly while people were typing. I moved the fetching into a shared layer with caching and dedup, cut the client components down to only what needed interaction, and the reports went from feeling sluggish to instant for the people who used them daily. I am happy to go deeper on any part of this in a call.


2. Which frontend technologies and frameworks I am strongest in, and my experience with Next.js.

TypeScript, React and Tailwind are where I am strongest, and Next.js is the framework I reach for on anything with routing, SEO or server rendering. I have used the App Router seriously, which means server and client components, generateMetadata, generateStaticParams, loading and error boundaries, route handlers, middleware and streaming. I am comfortable with when to keep a component on the server and when it has to be a client component, and I have hit most of the sharp edges around useSearchParams, static versus dynamic rendering, and cache revalidation in real projects. On top of that I use Zustand or React Query for state and data, React Hook Form with Zod for forms, and plain CSS or Tailwind for styling.


3. When would you choose SSR, SSG, ISR or client side rendering, and why?

SSG when the content is the same for everyone and changes rarely, marketing pages, service catalog, service details. That gives the fastest possible response and it caches at the CDN. ISR when the content is mostly static but updates every few minutes or hours, you get static speed plus background refresh without a full redeploy. SSR when the response depends on the request, a logged in user, session data, live pricing or stock, anything that would be wrong if it came from cache. Client side rendering only for genuinely realtime or private UI where caching would be wrong, a chat widget, a live admin table. The default mistake I see is SSR for content that never changes, which pays a server round trip for nothing.


4. How do you decide between Server Components and Client Components?

I start from the question of whether it needs state, effects, event handlers or browser APIs. If no to all of those it stays a server component, which means zero JavaScript shipped for it. Interactivity gets marked with use client at the leaf where it is needed, not at the page level, so clicking a button does not pull an entire page into the client bundle. Data fetching pushes you to the server too, fetching where it happens and passing plain data down. The boundary to watch is when you need a server component's data inside a client component, you pass it as props from a server parent instead of fetching again on the client.


5. How do you usually identify and fix slow frontend performance?

Measure before guessing. Lighthouse for the field metrics, the network tab to see what is actually being downloaded and when, React DevTools Profiler to find the component re-rendering on every keystroke, and bundle analyzer for the JS. Then the fix is usually one of four things: an unoptimized image blocking LCP, too much JavaScript on the first load, a client component doing work that belongs on the server, or an API waterfall where calls run one after another instead of in parallel. After the fix I verify with the same tool and check it again in production with real user data, because lab numbers move around.


6. What is your approach to building reusable and scalable React components?

Composition over configuration. Small primitives with a clear API, a Button that takes variants rather than twenty props, and larger components assembled from those. Props are typed and minimal, styling goes through tokens or Tailwind classes rather than hardcoded colors, and anything that varies by market or currency goes through a shared component like Price instead of being formatted inline. One component per file, no duplication, and a feature folder structure so components live next to the code that uses them. When the same pattern shows up three times it gets extracted. I am wary of building a giant generic component upfront, abstraction should come from real repetition, not guesswork.


7. How do you handle API loading, error and empty states in Next.js?

Three separate states, all treated deliberately. Loading uses loading.tsx at the route segment with skeletons that match the real layout so there is no layout shift, or Suspense boundaries for partial loading. Errors use error.tsx boundaries at each segment so a failure shows a message with a retry button instead of a blank page, and not-found.tsx for bad URLs. Empty is its own case with a dedicated EmptyState component offering a way forward, like clearing filters or browsing everything, rather than a blank list. Async actions on the client get caught and surfaced through a toast. The rule I follow is that no state should leave the user with a silent screen.


8. How would you handle SEO for a multi market site with localized content?

Separate indexable URLs per market, subfolder routing like /ng and /us rather than subdomains, since subfolders consolidate domain authority. Each route gets its own canonical and a full hreflang set (en-NG, en-US, en-GB, en-CA plus x-default) generated from one helper so they can never drift out of sync. Metadata comes from generateMetadata using the market and the page, with per service titles, descriptions and Open Graph images. Server rendered HTML so crawlers see content without executing JavaScript, semantic headings and alt text on every image. Local currency and local hero copy per market, because an English page with the wrong currency reads as broken. Structured data for products and breadcrumbs would go on next, and I would keep sitemaps per market.


9. How do you ensure a website works properly across different screen sizes and browsers?

Mobile first CSS, a small set of breakpoints, fluid containers with proper gutters, and testing in the browser dev tools plus real devices for the interactions that emulation lies about, mainly touch, scrolling and fixed elements. Components change behaviour at breakpoints rather than just shrinking, the filter bar turning into a bottom drawer is the example from this project. For browsers I check the last two versions of Chrome, Safari, Firefox and Edge, watch out for Safari specifics like dvh units and safe area insets, and use CSS that has broad support instead of the newest thing. Keyboard navigation and visible focus states are part of the same job, plus alt text, labels and contrast checks. Build passing lint and typecheck removes a whole class of breakage before it ships.


10. What tools do you use for debugging frontend issues?

React DevTools Profiler for re-renders, the browser network and performance panels for loading and long tasks, Lighthouse for Core Web Vitals, console with proper logging and conditional breakpoints, and next build with bundle analyzer for size. For server side or rendering issues I check the terminal output and the response HTML directly with curl to see what was actually rendered. When something only breaks for one user I reproduce it with the same query params and viewport. The most useful habit is forming a hypothesis and testing it with one change at a time instead of changing five things at once.


11. What steps do you take to improve Core Web Vitals?

LCP: priority on the single hero image, properly sized and in a modern format, preload it, make sure the server responds fast, and do not lazy load the thing that defines the first screen. INP: reduce main thread work, break long tasks, defer non urgent JavaScript, keep event handlers cheap, and stop unnecessary re-renders while the user is typing or tapping. CLS: explicit width and height on images and embeds, reserve space for anything injected later like badges or banners, never insert content above content that is already visible. Then I verify with Lighthouse in lab and confirm in real user data from CrUX or the hosting analytics, because field numbers are what Google actually grades.


12. Describe a difficult frontend bug you encountered and how you solved it.

In this project there was an infinite navigation loop on the service listing page. The search box debounced the input and then read the current URL to build the next query string, and the effect that ran on URL change fed back into the input. The result was the router pushing and replacing the same route over and over and the page never settling. It was difficult because it did not throw any error, the page just behaved strangely and only with network requests visible did the pattern show up. The fix was small once the cause was clear, compare the next query string with the current one and return early when they match, so a no-op never triggers navigation. The lesson I took from it is to guard any effect that reads global state and writes global state, and to reproduce with the network tab open rather than reasoning about it in my head.


13. How do you ensure your code remains maintainable when working on a large product with multiple developers?

Agreements that are enforced by tooling, not by memory. TypeScript strict, ESLint, formatting on save, and CI that blocks a merge if lint or typecheck fails. A clear structure, feature folders, one component per file, pages that compose instead of containing logic, so the next person knows where to look. Shared tokens and shared primitives so nobody invents a second button. Conventional commits and small pull requests that one person can review properly, preview deployments so review happens on a real URL, and a README plus docs that explain decisions instead of leaving them in someone's head. Code review is where the consistency actually happens, catching duplication and unclear APIs before they land.
