import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaTerminal, FaBell, FaRobot, FaArrowRight } from 'react-icons/fa';

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const BannerWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  max-width: 420px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${slideIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @media (max-width: 768px) {
    bottom: 140px; /* Elevated cleanly above mobile navigation bar and Rook button */
    right: 15px;
    left: 15px;
    max-width: none;
  }

  /* Cyberpunk Theme */
  [data-theme='cyberpunk'] & {
    background: rgba(10, 12, 20, 0.95);
    border: 1px solid var(--neon-cyan);
    color: var(--text-main);
    padding: 16px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.85rem;
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.25);
    backdrop-filter: blur(8px);
    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  }

  /* Professional Theme */
  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #ffffff;
    color: #0f172a;
    padding: 16px 18px;
    border-radius: 12px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    border-left: 4px solid #2563eb;
    font-family: var(--font-main);
    font-size: 0.88rem;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const Message = styled.div`
  flex: 1;
  line-height: 1.45;
`;

const AlertTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  margin-bottom: 4px;

  [data-theme='cyberpunk'] & {
    color: var(--neon-cyan);
    letter-spacing: 1px;
    font-size: 0.85rem;
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #0f172a;
    font-size: 0.92rem;
  }
`;

const IconWrapper = styled.div`
  margin-top: 2px;
  font-size: 1.15rem;

  [data-theme='cyberpunk'] & {
    color: var(--neon-green);
  }

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
  margin-left: 6px;
  color: inherit;
  opacity: 0.6;
  font-size: 1.3rem;
  line-height: 1;

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

const RookActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--border-color);

  [data-theme='cyberpunk'] & {
    border-top: 1px dashed rgba(0, 243, 255, 0.3);
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    border-top: 1px solid #f1f5f9;
  }
`;

const RookTriggerBtn = styled.button`
  background: none;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s ease;

  [data-theme='cyberpunk'] & {
    color: var(--neon-pink);
    border: 1px solid var(--neon-pink);
    clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);

    &:hover {
      background: var(--neon-pink);
      color: #000;
      box-shadow: 0 0 10px var(--neon-pink);
    }
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #eff6ff;
    color: #2563eb;
    border-radius: 6px;

    &:hover {
      background: #2563eb;
      color: #ffffff;
    }
  }
`;

const StatusBadge = styled.span`
  font-size: 0.72rem;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #22c55e;
  font-weight: 500;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px #22c55e;
  }
`;

const SystemAlert = ({ onOpenRook }) => {
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

  const handleTriggerRook = () => {
    handleDismiss();
    if (onOpenRook) {
      onOpenRook("Tell me about Raj, his background, and his work.");
    }
  };

  if (!isVisible) return null;

  return (
    <BannerWrapper role="status" aria-live="polite">
      <Content>
        <IconWrapper>
          {theme === 'cyberpunk' ? <FaTerminal /> : <FaBell />}
        </IconWrapper>
        <Message>
          <AlertTitle>
            {theme === 'cyberpunk' ? (
              <span>SYSTEM_INIT // WELCOME</span>
            ) : (
              <span>Welcome to Raj's Portfolio!</span>
            )}
          </AlertTitle>
          {theme === 'cyberpunk' ? (
            <div>
              Welcome to Raj's portfolio! Explore his professional journey, engineering work, and key projects. Have questions? Chat with <strong>Rook</strong> (AI assistant at bottom-left) to learn more or connect.
            </div>
          ) : (
            <div>
              Welcome to Raj's portfolio! Take a look around to explore his professional life, work experience, and projects. Have questions? Feel free to ask <strong>Rook</strong> (bottom-left) or get in touch.
            </div>
          )}
          <RookActionRow>
            <StatusBadge>Portfolio Live</StatusBadge>
            <RookTriggerBtn onClick={handleTriggerRook}>
              <FaRobot size={12} />
              <span>Ask Rook</span>
              <FaArrowRight size={10} />
            </RookTriggerBtn>
          </RookActionRow>
        </Message>
        <CloseButton onClick={handleDismiss} aria-label="Dismiss notification">×</CloseButton>
      </Content>
    </BannerWrapper>
  );
};

export default SystemAlert;
