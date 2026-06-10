## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2026-06-10 - Skip to Content and Semantic Landmarks
**Learning:** Single Page Applications without page reloads often trap keyboard users in repetitive navigation. Adding semantic landmarks (`<main>`, `<nav>`) and a 'Skip to main content' link is critical for accessibility.
**Action:** Always include a hidden 'Skip to main content' link that becomes visible on focus, and ensure the main content container can receive programmatic focus with `tabIndex={-1}`.
