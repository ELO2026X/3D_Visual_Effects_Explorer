## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2024-05-22 - Semantic Landmarks and Skip Links
**Learning:** Single Page Applications (SPAs) often lack native skip links and semantic landmarks (`<main>`, `<nav>`), which forces screen reader and keyboard users to navigate through all sidebar elements before reaching the primary content.
**Action:** Always include a visually hidden "Skip to main content" link that targets a focusable `<main>` element, and use semantic HTML tags for layout regions.
