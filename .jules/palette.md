## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.
## 2026-05-30 - Implemented Skip-to-Content & Semantic Landmarks
**Learning:** For React SPAs relying heavily on div-based layouts, adding a visually hidden "Skip to main content" link paired with semantic tags like `<main tabIndex={-1}>` and `<nav>` significantly improves keyboard and screen reader accessibility without disrupting visual design.
**Action:** Default to including a skip link and `tabIndex={-1}` on root target content areas (like `<main>`) during initial layout implementations.
