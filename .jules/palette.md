## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2024-05-09 - Added semantic SPA landmarks and Skip Link
**Learning:** Single Page Applications (SPAs) frequently lack proper semantic boundaries (`<main>`, `<nav>`) and bypass traditional page load focus resets. This makes keyboard navigation tedious. Adding a visually hidden "Skip to main content" link that directs focus to a `<main tabIndex="-1">` container restores critical keyboard accessibility for power users and screen readers.
**Action:** When building or auditing SPAs, always establish clear semantic landmarks (`<main>`, `<nav>`, `<header>`) and ensure a focusable skip link is present at the top of the DOM to bypass repetitive navigation elements.
