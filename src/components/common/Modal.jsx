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
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
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

    &:hover {
        color: var(--neon-yellow);
    }
`;

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <PixelCard title={title}>
            <CloseButton onClick={onClose}><FaTimes /></CloseButton>
            {children}
        </PixelCard>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
