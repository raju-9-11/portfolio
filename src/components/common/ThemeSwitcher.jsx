import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
  cursor: pointer;

  font-size: 0.9rem;
  color: var(--text-dim);
  transition: color 0.3s;

  &:hover {
    color: var(--neon-cyan);
  }
`;

const SwitcherText = styled.span`
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <SwitcherContainer onClick={toggleTheme}>
      {theme === 'cyberpunk' ? (
        <>
          <span>[ SWITCH_MODE ]</span>
        </>
      ) : (
        <>
          <FaSun />
          <SwitcherText>Light Mode</SwitcherText>
          <FaToggleOn />
        </>
      )}
    </SwitcherContainer>
  );
};

export default ThemeSwitcher;
