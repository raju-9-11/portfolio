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

  /* PROFESSIONAL THEME OVERRIDES */
  [data-theme='professional'] {
    --bg-color: #f3f4f6; /* Light gray */
    --card-bg: #ffffff;
    --text-main: #1f2937; /* Gray-900 */
    --text-dim: #4b5563; /* Gray-600 */
    --border-color: #e5e7eb; /* Gray-200 */

    /* Map neon variables to professional accents for compatibility */
    --neon-cyan: #2563eb; /* Blue-600 */
    --neon-pink: #7c3aed; /* Violet-600 */
    --neon-yellow: #d97706; /* Amber-600 */
    --neon-green: #059669; /* Emerald-600 */

    --font-main: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --border-radius: 16px;
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
      /* Only add glow in cyberpunk mode, logic handled via css var if needed or specific classes.
         For now, keeping the shadow but it might look odd in pro mode.
         Let's override the shadow in Pro mode.
      */
      text-shadow: 0 0 5px var(--neon-pink);
    }
  }

  [data-theme='professional'] a:hover {
    text-shadow: none;
    opacity: 0.8;
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
`;
