## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.
## 2026-04-22 - "Skip to main content" Link Accessibility
**Learning:** Adding a "Skip to main content" link for keyboard users is crucial when there is a sidebar or navigation menu. It's essential that the target `<main>` container has `tabIndex={-1}` and `focus:outline-none` so it can be programmatically focused without showing a distracting outline or disrupting the normal tab order.
**Action:** Include a "Skip to main content" link with correct tabIndex and outline handling for any layout containing repeating navigation elements.
