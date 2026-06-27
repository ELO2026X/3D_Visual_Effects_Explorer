## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.
## 2025-06-27 - Implementing Skip-to-Content Links in React Single Page Applications
**Learning:** When implementing a 'Skip to main content' link in a React application, ensure the target container (e.g., `<main id="main-content">`) includes `tabIndex={-1}` and appropriate styling classes (e.g., `focus:outline-none`) to properly receive programmatic focus without showing a jarring default focus ring while maintaining correct keyboard navigation semantics.
**Action:** Always check that the skip link's target element has `tabIndex={-1}` and `focus:outline-none` during a11y audits.
