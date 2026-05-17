## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.
## 2025-03-08 - Added "Skip to main content" link and Semantic Landmarks
**Learning:** Adding a "Skip to main content" link requires `tabIndex={-1}` and `focus:outline-none` on the target container (e.g., `<main id="main-content">`) so that it can receive programmatic focus without causing confusing visual focus rings.
**Action:** When adding "Skip to main content" links to components, ensure the target landmark explicitly handles these attributes to maintain correct keyboard accessibility.
