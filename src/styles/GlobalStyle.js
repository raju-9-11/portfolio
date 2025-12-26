import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --win-gray: #c0c0c0;
    --win-gray-light: #dfdfdf;
    --win-gray-dark: #808080;
    --win-black: #000000;
    --win-white: #ffffff;
    --win-blue-dark: #000080;
    --term-green: #00ff00;
    --term-bg: #0c0c0c;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #008080; /* Teal background classic Win95 */
    font-family: 'MS Sans Serif', 'Segoe UI', sans-serif;
    color: var(--win-black);
    overflow-x: hidden;
  }

  /* Scrollbar styling for a retro feel */
  ::-webkit-scrollbar {
    width: 16px;
    background: var(--win-gray);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--win-gray);
    box-shadow: inset 1px 1px var(--win-white), inset -1px -1px var(--win-black);
  }
  ::-webkit-scrollbar-track {
    background: var(--win-gray);
    box-shadow: inset 1px 1px var(--win-black), inset -1px -1px var(--win-white);
  }
`;
