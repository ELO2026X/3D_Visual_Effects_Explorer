## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.
## 2026-04-22 - Skip to main content links
**Learning:** Skip to main content links should target an element with `tabIndex={-1}` and `focus:outline-none` so that it properly receives keyboard focus without showing an ugly outline to sighted users.
**Action:** Ensure all skip links target a properly configured container element.
