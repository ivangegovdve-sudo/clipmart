## 2026-03-16 - [Performance Regressions from `force-dynamic`]
**Learning:** [Adding `force-dynamic` disables caching. Do not fix build errors by adding `force-dynamic` if you are only asked for one performance optimization as this will damage Next.js caching]
**Action:** [Only do exactly ONE requested performance improvement and nothing more. Specifically, do not "fix" pre-existing Next.js build errors if that requires modifying other files or introducing `force-dynamic` unless explicitly told to do so.]
