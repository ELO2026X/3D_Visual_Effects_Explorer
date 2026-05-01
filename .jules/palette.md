## 2024-05-01 - Skip Link Keyboard Accessibility
**Learning:** Adding a "Skip to main content" link is useless if the target container (`<main>`) cannot receive programmatic focus.
**Action:** Always ensure the target container (e.g., `<main id="main-content">`) includes `tabIndex={-1}` and appropriate styling classes (e.g., `focus:outline-none`) to properly receive focus while maintaining correct keyboard navigation semantics without showing an ugly default focus ring.
