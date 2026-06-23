## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2024-05-20 - Adding Skip to Content Links
**Learning:** When implementing "Skip to main content" links for keyboard accessibility, it's critical to add `tabIndex={-1}` and `focus:outline-none` (or similar styles) to the target element (like `<main id="main-content">`). Without `tabIndex={-1}`, the element cannot programmatically receive focus, breaking the skip functionality. Without `focus:outline-none`, focusing the element will create an unwanted default focus ring around the entire container, negatively impacting the visual experience.
**Action:** Always verify the target element of skip links has the appropriate `tabIndex` and focus styling configuration.
