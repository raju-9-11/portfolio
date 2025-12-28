import { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const BannerWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 400px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;

  /* Cyberpunk Theme */
  [data-theme='cyberpunk'] & {
    background: rgba(10, 10, 10, 0.95);
    border: 1px solid var(--neon-cyan);
    color: var(--neon-cyan);
    padding: 15px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.85rem;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
    backdrop-filter: blur(5px);

    &::before {
      content: '';
      position: absolute;
      top: -2px; left: -2px; right: -2px; bottom: -2px;
      background: linear-gradient(45deg, var(--neon-cyan), transparent, var(--neon-pink));
      z-index: -1;
      opacity: 0.5;
    }
  }

  /* Professional Theme (Hidden per plan) */
  [data-theme='professional'] & {
    display: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 5px;
`;

const ActionButton = styled.button`
  background: transparent;
  padding: 5px 10px;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  transition: all 0.2s ease;

  /* Cyberpunk Styles */
  [data-theme='cyberpunk'] & {
    border: 1px solid var(--neon-cyan);
    color: var(--neon-cyan);

    &:hover {
      background: var(--neon-cyan);
      color: #000;
      box-shadow: 0 0 8px var(--neon-cyan);
    }

    &.abort {
      border-color: var(--neon-pink);
      color: var(--neon-pink);

      &:hover {
        background: var(--neon-pink);
        color: #000;
        box-shadow: 0 0 8px var(--neon-pink);
      }
    }
  }
`;

const SystemAlert = () => {
  const { theme } = useTheme();

  // Initialize state lazily
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
        const consent = localStorage.getItem('data_uplink_consent');
        return consent === null;
    }
    return false;
  });

  const handleAuthorize = () => {
    localStorage.setItem('data_uplink_consent', 'true');
    setIsVisible(false);
  };

  const handleAbort = () => {
    localStorage.setItem('data_uplink_consent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;
  // If theme is professional, we decided to hide it completely as "cookies" logic might not be critical for this portfolio demo,
  // or the "Neural telemetry" text is inappropriate.
  if (theme === 'professional') return null;

  return (
    <BannerWrapper>
      <div>
        <strong>SYSTEM ALERT:</strong> Neural telemetry protocols detected. Authorize data uplink for optimized experience?
      </div>
      <ButtonGroup>
        <ActionButton onClick={handleAuthorize}>[ AUTHORIZE ]</ActionButton>
        <ActionButton className="abort" onClick={handleAbort}>[ ABORT ]</ActionButton>
      </ButtonGroup>
    </BannerWrapper>
  );
};

export default SystemAlert;
