## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2026-04-22 - Skip to main content link target configuration
**Learning:** When implementing a 'Skip to main content' link, the target container needs `tabIndex={-1}` to be programmatically focusable, but it also needs `focus:outline-none` so that a focus ring doesn't appear around the entire main area when activated, maintaining correct keyboard navigation semantics without visual disruption.
**Action:** Always apply both `tabIndex={-1}` and `focus:outline-none` (or equivalent) to the target element of skip-to-content links.
