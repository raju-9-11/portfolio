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
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
  }
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  /* PixelCard handles internal overflow, but ModalContent constrains size */
  display: flex;
  flex-direction: column;

  /* Adjust scrollbar for modal context if needed, though PixelCard also has one */
  /* The comment mentions "scroll bar in modal of all certifications is not matching" */

  /* This targets any scrollable containers inside */
  & ::-webkit-scrollbar {
    width: 8px;
  }

  [data-theme='professional'] & ::-webkit-scrollbar-track {
    background: #f1f5f9; /* Slate-100 */
  }

  [data-theme='professional'] & ::-webkit-scrollbar-thumb {
    background: #cbd5e1; /* Slate-300 */
    border-radius: 4px;

    &:hover {
      background: #94a3b8; /* Slate-400 */
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
    z-index: 100; /* Ensure it's above content */
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
        top: 12px;
        right: 12px;
        font-size: 1rem;
        color: var(--text-dim);
        background: transparent;
        border-radius: 50%;
        width: 28px;
        height: 28px;

        &:hover {
            background: rgba(0,0,0,0.05);
            color: var(--text-main);
            text-shadow: none;
        }
    }
`;

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <PixelCard title={title}>
            <CloseButton onClick={onClose} aria-label="Close Modal"><FaTimes /></CloseButton>
            {children}
        </PixelCard>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
