import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  [data-theme='cyberpunk'] & {
    font-family: 'Courier New', monospace;
    font-weight: bold;
    color: var(--neon-pink);
  }

  [data-theme='professional'] & {
    color: inherit; /* Allow parent to control color (e.g. on hover) */
  }
`;

const ThemedIcon = ({ ascii, icon }) => {
  const { theme } = useTheme();

  return (
    <IconWrapper>
      {theme === 'cyberpunk' ? ascii : icon}
    </IconWrapper>
  );
};

export default ThemedIcon;
