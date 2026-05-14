## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.
## 2024-05-14 - Implementing Skip to Content
**Learning:** For a single page app where navigation may be the first element, adding a "skip to main content" correctly routes keyboard users bypassing unnecessary focus stops, but to make it completely flawless `tabIndex={-1}` and `focus:outline-none` should be on the target element itself (e.g. `<main>`), so it can programmatically receive focus without a visual border.
**Action:** Next time I add "Skip to Content", ensure the target container sets `tabIndex={-1}` and `focus:outline-none`.
