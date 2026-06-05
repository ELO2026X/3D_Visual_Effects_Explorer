## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2026-04-22 - Semantic Landmarks and Skip Links
**Learning:** SPAs often trap keyboard users in complex navigation before reaching the primary view. Adding a visually hidden "Skip to main content" link along with semantic `<nav>` and `<main>` landmarks significantly improves keyboard navigation flow.
**Action:** Always include a skip link targeting a focusable `<main tabIndex={-1}>` and ensure navigation panels use semantic `<nav>` landmarks.
