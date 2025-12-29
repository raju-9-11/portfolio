import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    /* DEFAULT / CYBERPUNK THEME */
    --bg-color: #050510;
    --card-bg: #0a0a1a;
    --text-main: #f8f8f2;
    --text-dim: #6272a4;
    --border-color: #bd93f9;

    --neon-cyan: #00f3ff;
    --neon-pink: #bc13fe;
    --neon-yellow: #f1fa8c;
    --neon-green: #50fa7b;

    --font-main: 'Courier New', Courier, monospace;
    --border-radius: 0px;
    --grid-gap: 16px;
    --letter-spacing: 2px;
    --text-transform: uppercase;
    --transition-speed: 0.2s;

    /* Cyberpunk Grid Background */
    --bg-image:
      linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px);
    --bg-size: 40px 40px;
  }

  /* MODERN THEME OVERRIDES */
  [data-theme='modern'] {
    /* Cleaner, lighter palette requested by user */
    --bg-color: #f8fafc; /* Slate-50 - Very light cool gray */
    --card-bg: #ffffff;
    --text-main: #334155; /* Slate-700 - Softer than pure black */
    --text-dim: #64748b; /* Slate-500 */
    --border-color: #e2e8f0; /* Slate-200 */

    /* Re-mapped accents to be more harmonious/modern */
    /* Blue for primary actions/links (replaces neon-cyan) */
    --neon-cyan: #3182ce; /* Muted Blue - for primary links/actions */

    /* Soft Blue/Indigo for secondary accents (replaces neon-pink) */
    --neon-pink: #805ad5; /* Muted Purple - for secondary accents */

    /* Amber/Orange for warnings/highlights (replaces neon-yellow) */
    --neon-yellow: #d97706; /* Amber-600 */

    /* Emerald for success (replaces neon-green) */
    --neon-green: #059669; /* Emerald-600 */

    --font-main: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --border-radius: 12px; /* Slightly tighter radius */
    --letter-spacing: normal;
    --text-transform: none;

    --bg-image: none;
    --bg-size: auto;
  }

  * {
    box-sizing: border-box;
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--bg-color);
    color: var(--text-main);
    font-family: var(--font-main);

    background-image: var(--bg-image);
    background-size: var(--bg-size);
  }

  h1, h2, h3, h4, h5, h6 {
    text-transform: var(--text-transform);
    letter-spacing: var(--letter-spacing);
    margin: 0 0 10px 0;
  }

  a {
    color: var(--neon-cyan);
    text-decoration: none;
    transition: all var(--transition-speed);

    &:hover {
      color: var(--neon-pink);
      /* Only add glow in cyberpunk mode */
      text-shadow: 0 0 5px var(--neon-pink);
    }
  }

  [data-theme='modern'] a {
    color: var(--neon-pink); /* Blue-500 for links */
  }

  [data-theme='modern'] a:hover {
    color: var(--neon-cyan); /* Dark slate on hover */
    text-shadow: none;
    text-decoration: underline;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg-color);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--neon-cyan);
    border-radius: 4px;
  }

  [data-theme='modern'] ::-webkit-scrollbar-thumb {
     background: #cbd5e1; /* Slate-300 for subtler scrollbar */
  }

  [data-theme='modern'] ::selection {
    background: rgba(49, 130, 206, 0.1);
    color: inherit;
  }
`;
