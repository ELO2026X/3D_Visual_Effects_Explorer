## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2026-06-24 - Semantic main content and skip links
**Learning:** For React single-page applications, adding a visually hidden "Skip to main content" link and updating the core viewing area to use `<main id="main-content" tabIndex={-1}>` enables critical keyboard navigation semantics. Applying `focus:outline-none` on the target is necessary to prevent programmatic focus from showing an unsightly ring around the entire main area.
**Action:** When working on application layouts with persistent navigation sidebars, prioritize adding skip links and properly semantic main container targets to support keyboard/screen reader users.
