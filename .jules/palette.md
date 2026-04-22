## 2026-04-21 - Added UI focus states and semantic accessibility
**Learning:** In React apps, dynamically changing states like loading indicators need `aria-live="polite"` to ensure screen readers announce them properly without being overly disruptive. Focus states are also often overlooked in generic styles.
**Action:** Always check for `aria-live` on loading components and `focus-visible` on interactive elements during UI audits.

## 2026-04-22 - Aligning file picker 'accept' attributes with application capabilities
**Learning:** When adding support for new file types (like Gaussian Splats '.splat', '.ksplat') to the application's renderer, failing to update the associated hidden `<input type="file" accept="...">` results in a highly frustrating UX. Users are forced to manually change their OS file picker to 'All Files' to even select the supported assets, which feels broken and unintuitive.
**Action:** Always verify that input  attributes perfectly match the comprehensive list of formats supported by the application's underlying parsers or renderers.

## 2026-04-22 - Semantic skip links for Single Page Applications
**Learning:** In SPAs, visual layout (like sidebars and main content areas) can easily trap keyboard and screen reader users if semantic landmarks aren't used. A simple hidden "Skip to main content" link provides a crucial bypass mechanism that greatly improves accessibility.
**Action:** Always verify if a semantic skip link makes sense for the layout during UI audits.
