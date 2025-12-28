import { useState } from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 400px;
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid var(--neon-cyan);
  color: var(--neon-cyan);
  padding: 15px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.85rem;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
  backdrop-filter: blur(5px);

  /* Glitch border effect */
  &::before {
    content: '';
    position: absolute;
    top: -2px; left: -2px; right: -2px; bottom: -2px;
    background: linear-gradient(45deg, var(--neon-cyan), transparent, var(--neon-pink));
    z-index: -1;
    opacity: 0.5;
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
  border: 1px solid var(--neon-cyan);
  color: var(--neon-cyan);
  padding: 5px 10px;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  transition: all 0.2s ease;

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
`;

const SystemAlert = () => {
  // Initialize state lazily to avoid setting state in useEffect for initial render
  const [isVisible, setIsVisible] = useState(() => {
    // Check localStorage during initialization
    // Note: window might not be available during SSR but this is a client-side SPA.
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
