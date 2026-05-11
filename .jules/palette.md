## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2026-05-11 - Skip to Content links and programmatic focus
**Learning:** When adding a 'Skip to main content' link in SPAs, the target `<main>` container must have `tabIndex={-1}` so it can properly receive programmatic focus from the link, otherwise screen readers and keyboard users might lose their place or not advance correctly.
**Action:** When implementing semantic landmarks like `<main>` that act as skip-link targets, always include `tabIndex={-1}` and `focus:outline-none`.
