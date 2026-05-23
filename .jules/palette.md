## 2024-05-24 - Single Page Application Skip Links
**Learning:** Skip links in Single Page Applications (SPAs) like React require specific handling. Simply pointing a skip link to an ID (e.g., `href="#main-content"`) may not shift focus if the target element isn't inherently focusable.
**Action:** When adding skip links, ensure the target container (often `<main>`) has `tabIndex={-1}` and `focus:outline-none` (if using Tailwind) so it can receive programmatic focus without displaying an unsightly focus ring on click, thereby correctly resetting the tab sequence for keyboard and screen reader users.

## 2024-05-24 - Single Page Application Skip Links
**Learning:** Skip links in Single Page Applications (SPAs) like React require specific handling. Simply pointing a skip link to an ID (e.g., `href="#main-content"`) may not shift focus if the target element isn't inherently focusable.
**Action:** When adding skip links, ensure the target container (often `<main>`) has `tabIndex={-1}` and `focus:outline-none` (if using Tailwind) so it can receive programmatic focus without displaying an unsightly focus ring on click, thereby correctly resetting the tab sequence for keyboard and screen reader users.
