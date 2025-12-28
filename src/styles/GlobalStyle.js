import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: #050510;
    --card-bg: #0a0a1a;
    --neon-cyan: #00f3ff;
    --neon-pink: #bc13fe;
    --neon-yellow: #f1fa8c;
    --neon-green: #50fa7b;
    --text-main: #f8f8f2;
    --text-dim: #6272a4;
    --border-color: #bd93f9;

    --grid-gap: 16px;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--bg-color);
    color: var(--text-main);
    font-family: 'Courier New', Courier, monospace; /* Fallback to monospace */
    /* overflow-x: hidden; Removed for debugging */

    /* Cyberpunk Grid Background */
    background-image:
      linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  h1, h2, h3, h4, h5, h6 {
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0 0 10px 0;
  }

  a {
    color: var(--neon-cyan);
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      color: var(--neon-pink);
      text-shadow: 0 0 5px var(--neon-pink);
    }
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
