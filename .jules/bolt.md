## 2026-03-17 - React Suspense and useSearchParams
**Learning:** Components using `useSearchParams` must be wrapped in a `<React.Suspense>` boundary in Next.js Client Components. Failing to do so causes a bailout from static rendering, which will fail the production build in recent Next.js versions.
**Action:** Always wrap components consuming `useSearchParams` in `<React.Suspense>` when using them in client components in Next.js App Router.
