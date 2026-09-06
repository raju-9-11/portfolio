import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaTerminal, FaBell } from 'react-icons/fa';

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const BannerWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 400px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${slideIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @media (max-width: 768px) {
    bottom: 80px; /* Raise above mobile nav */
    right: 10px;
    left: 10px;
    max-width: none;
  }

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

  /* Professional Theme */
  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #ffffff;
    color: #0f172a;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
    border: 1px solid #e2e8f0;
    border-left: 4px solid #2563eb;
    font-family: var(--font-main);
    font-size: 0.9rem;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const Message = styled.div`
  flex: 1;
  line-height: 1.4;
`;

const IconWrapper = styled.div`
  margin-top: 2px;
  font-size: 1.1rem;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #2563eb;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  color: inherit;
  opacity: 0.7;
  font-size: 1.2rem;

  &:hover {
    opacity: 1;
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #64748b;

    &:hover {
      color: #0f172a;
    }
  }
`;

const SystemAlert = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show alert after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <BannerWrapper role="status" aria-live="polite">
      <Content>
        <IconWrapper>
            {theme === 'cyberpunk' ? <FaTerminal /> : <FaBell />}
        </IconWrapper>
        <Message>
          {theme === 'cyberpunk' ? (
             <>
               <strong>SYSTEM_MSG:</strong> WELCOME, USER. NEURAL INTERFACE ONLINE. SCROLL TO NAVIGATE MEMORY BANKS.
             </>
          ) : (
            <>
              <strong>Welcome!</strong> Feel free to explore my portfolio. Use the form below if you'd like to get in touch.
            </>
          )}
        </Message>
        <CloseButton onClick={handleDismiss} aria-label="Dismiss">×</CloseButton>
      </Content>
    </BannerWrapper>
  );
};

export default SystemAlert;
