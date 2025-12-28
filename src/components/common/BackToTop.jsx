import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronUp } from 'react-icons/fa';

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--neon-cyan);
  color: var(--neon-cyan);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 99;
  opacity: ${props => props.$visible ? 0.8 : 0};
  pointer-events: ${props => props.$visible ? 'all' : 'none'};
  transition: all 0.3s ease;
  clip-path: polygon(
    0 5px, 5px 0,
    100% 0, 100% calc(100% - 5px),
    calc(100% - 5px) 100%, 0 100%
  );

  &:hover {
    background: var(--neon-cyan);
    color: #000;
    transform: translateY(-3px);
    box-shadow: 0 0 10px var(--neon-cyan);
    opacity: 1;
  }
`;

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <Button
      onClick={scrollToTop}
      $visible={visible}
      aria-label="Back to Top"
      title="Return to Source"
    >
      <FaChevronUp />
    </Button>
  );
};

export default BackToTop;
