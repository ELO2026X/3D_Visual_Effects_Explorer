## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2026-05-16 - Add skip links and semantic landmarks for SPAs
**Learning:** Single Page Applications (SPAs) often lack natural tab structure. Without semantic landmarks like `<main>` and `<nav>`, or a 'Skip to main content' link, keyboard and screen reader users can get trapped in repetitive navigation like sidebars.
**Action:** Always include a visually hidden 'Skip to main content' link targeting a semantic `<main id="main-content" tabIndex={-1}>` on core layouts to ensure equitable navigation.
