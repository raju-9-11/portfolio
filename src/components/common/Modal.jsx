import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import PixelCard from './PixelCard';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;

  [data-theme='professional'] & {
    background: rgba(0, 0, 0, 0.5); /* Slightly darker for contrast with white button */
    backdrop-filter: blur(2px);
  }
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative; /* Context for CloseButton absolute positioning */

  /* Allow button to hang outside in professional mode */
  overflow: visible;

  /* Scrollbar styles for children */
  & ::-webkit-scrollbar {
    width: 8px;
  }

  [data-theme='professional'] & ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  [data-theme='professional'] & ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;

    &:hover {
      background: #94a3b8;
    }
  }

  /* Fix overlap of title with close button in Cyberpunk mode */
  /* Target the h3 (CardTitle) inside PixelCard inside ModalContent */
  /* Since PixelCard renders StyledContainer -> CardTitle(h3) */
  & h3 {
     [data-theme='cyberpunk'] & {
        padding-right: 60px; /* Increased to 60px to ensure no overlap (Button is ~47px from right) */
     }
  }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: var(--neon-pink);
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;

    &:hover {
        color: var(--neon-yellow);
        text-shadow: 0 0 5px var(--neon-yellow);
    }

    [data-theme='professional'] & {
        top: -40px; /* Position OUTSIDE the card */
        right: 0;
        font-size: 1.2rem;
        color: white; /* White text on dark overlay */
        background: transparent;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        opacity: 0.8;

        &:hover {
            opacity: 1;
            background: rgba(255,255,255,0.1);
            color: white;
            text-shadow: none;
        }
    }
`;

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close Modal"><FaTimes /></CloseButton>
        <PixelCard title={title}>
            {children}
        </PixelCard>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
