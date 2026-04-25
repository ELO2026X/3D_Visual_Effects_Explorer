## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2025-02-27 - Added Semantic Landmarks and Skip Links for SPAs
**Learning:** React Single Page Applications (SPAs) with complex dynamic layout structures (like sidebar navigations alongside primary 3D canvas content) often inadvertently hide main content from screen readers because they lack distinct structural markup. Keyboard users get stuck tabbing through long sidebar lists.
**Action:** When auditing React SPAs, ensure standard top-level landmarks like `<main>` and `<aside>` wrap primary and secondary sections respectively. Crucially, insert a visually hidden "Skip to main content" link (e.g. `sr-only focus:not-sr-only`) at the document root to bypass repetitive navigation lists, and apply `tabIndex={-1}` and `focus:outline-none` on the main container to ensure focus lands there properly.
