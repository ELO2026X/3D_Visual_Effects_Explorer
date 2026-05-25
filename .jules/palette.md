## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2024-05-24 - Proper Target Containers for Skip Links
**Learning:** When implementing a 'Skip to main content' link, the target container (e.g., `<main id="main-content">`) must include `tabIndex={-1}` and appropriate styling classes (e.g., `focus:outline-none`) to properly receive programmatic focus while maintaining correct keyboard navigation semantics without introducing unwanted focus outlines.
**Action:** Always verify both the skip link itself and the attributes of its target container when adding bypass blocks.
