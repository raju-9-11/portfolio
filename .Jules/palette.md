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

## 2025-02-27 - BootSequence Accessibility
**Learning:** Providing a keyboard-only skip method (ESC key) is insufficient for mobile and mouse users. An interactive button ensures universal access to skip functionality.
**Action:** When implementing "Press Key to X" patterns, always pair them with an interactive UI element for users who cannot or do not use keyboard shortcuts.

## 2025-05-24 - Transient Props & Accessibility
**Learning:** Styled-components pass all standard props to the DOM, causing React warnings for custom props like `progress` on `div`. Using transient props (`$progress`) fixes this while keeping the value available for styling. Pairing this with `role="progressbar"` creates a semantic, warning-free component.
**Action:** Use `$` prefix for style-only props and ensure `div` based progress bars always have ARIA roles.
