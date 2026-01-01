## 2024-02-14 - Loading State UX
**Learning:** Even simple forms benefit significantly from visual feedback (spinners) during async operations. Accessibility can be maintained invisibly (`aria-busy`) without compromising a strict "Cyberpunk" aesthetic.
**Action:** Always verify async actions have visual loading states. For "fast" mocks, artificial delays are necessary for verification.

## 2024-02-14 - User Control & Invisible A11y
**Learning:** Animations are delightful but repetitive. Providing a "Skip" control respects user agency. Invisible a11y (aria-live) solves critical issues without design compromise.
**Action:** Audit all long animations for skip controls. Ensure all status messages have `role="alert"`.

## 2024-02-14 - Thematic Error Handling
**Learning:** Error boundaries shouldn't be generic. A "BSOD" style error page turns a negative experience (crash) into a memorable, on-brand moment.
**Action:** Always theme error states to match the app's personality.

## 2025-05-24 - Interactive Semantics
**Learning:** Custom interactive elements (like divs with onClick) are invisible to keyboard users. Converting them to semantic buttons with proper resets preserves the design while instantly granting focusability and keyboard support.
**Action:** Audit all `onClick` handlers on non-interactive elements and convert to `<button>` or add `role="button"` with `tabIndex`.
