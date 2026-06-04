## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.
## 2024-06-04 - Screen reader navigation in SPAs
**Learning:** In SPAs without natural page loads, a "Skip to main content" link and semantic landmarks (`<main>`, `<nav>`) are essential to allow screen reader and keyboard-only users to bypass repetitive navigation like sidebars.
**Action:** Always implement a skip link and `tabIndex={-1}` with `focus:outline-none` on the main content area to correctly manage programmatic focus for accessibility.
