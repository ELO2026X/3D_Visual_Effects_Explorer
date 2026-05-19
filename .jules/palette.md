## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## $(date +%Y-%m-%d) - Adding Skip to Main Content Link
**Learning:** Added a 'Skip to main content' link that visually stays hidden until it receives keyboard focus, dramatically improving keyboard navigation for sighted and non-sighted users to bypass repeating UI components like sidebars.
**Action:** When creating skip links, target a semantically appropriate landmark (like `<main>`) with a corresponding id. Use `tabIndex={-1}` and `focus:outline-none` on the target so it receives programmatic focus properly without displaying a focus outline. Use Tailwind's `sr-only focus-visible:not-sr-only` to ensure the link only appears when focused.
