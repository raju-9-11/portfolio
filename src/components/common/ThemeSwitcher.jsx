import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const SwitcherContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;

  font-size: 0.9rem;
  color: var(--text-dim);
  transition: all 0.2s ease;

  &:hover, &:focus-visible {
    color: var(--neon-cyan);
    outline: none;
  }

  [data-theme='cyberpunk'] &:focus-visible {
    text-shadow: 0 0 8px var(--neon-cyan);
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    padding: 8px 18px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 9999px;
    color: #475569;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      color: #2563eb;
      border-color: #cbd5e1;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }
  }
`;

const SwitcherText = styled.span`
  letter-spacing: 0.5px;
  font-weight: 500;
`;

export const FloatingThemeToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 990;
  display: none;

  @media (min-width: 769px) {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.25s ease;
    backdrop-filter: blur(10px);
  }

  /* Cyberpunk style */
  [data-theme='cyberpunk'] & {
    background: rgba(10, 10, 20, 0.85);
    border: 1px solid var(--neon-cyan);
    color: var(--neon-cyan);
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
    box-shadow: 0 0 12px rgba(0, 243, 255, 0.25);
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);

    &:hover {
      background: var(--neon-cyan);
      color: #000;
      box-shadow: 0 0 20px var(--neon-cyan);
      transform: translateY(-2px);
    }
  }

  /* Professional Light style */
  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid #e2e8f0;
    color: #1e293b;
    border-radius: 9999px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    &:hover {
      background: #ffffff;
      border-color: #cbd5e1;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
      color: #2563eb;
    }
  }
`;

export const FloatingThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <FloatingThemeToggle
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'cyberpunk' ? 'Professional Light' : 'Cyberpunk Dark'} Mode`}
      title={`Switch to ${theme === 'cyberpunk' ? 'Professional Light' : 'Cyberpunk Dark'} Mode`}
    >
      {theme === 'cyberpunk' ? (
        <>
          <FaSun style={{ color: 'var(--neon-yellow)' }} />
          <span>[ LIGHT_MODE ]</span>
        </>
      ) : (
        <>
          <FaMoon style={{ color: '#4f46e5' }} />
          <span>Cyberpunk Mode</span>
        </>
      )}
    </FloatingThemeToggle>
  );
};

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <SwitcherContainer
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'cyberpunk' ? 'Professional Light' : 'Cyberpunk Dark'} Mode`}
    >
      {theme === 'cyberpunk' ? (
        <>
          <FaSun style={{ color: 'var(--neon-yellow)' }} />
          <SwitcherText>[ SWITCH_TO_LIGHT_MODE ]</SwitcherText>
        </>
      ) : (
        <>
          <FaMoon style={{ color: '#4f46e5' }} />
          <SwitcherText>Switch to Cyberpunk Dark</SwitcherText>
        </>
      )}
    </SwitcherContainer>
  );
};

export default ThemeSwitcher;
