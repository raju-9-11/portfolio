import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: var(--card-bg);
  border: 2px solid var(--neon-cyan);
  padding: 20px;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
    z-index: 10;
  }

  /* Pixel corners */
  clip-path: polygon(
    0 10px,
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%
  );

  /* Scanline effect overlay */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 1;
    opacity: 0.3;
  }
`;

export const CardTitle = styled.h3`
  color: var(--neon-cyan);
  border-bottom: 2px solid var(--neon-pink);
  padding-bottom: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::before {
    content: ">";
    margin-right: 10px;
    color: var(--neon-pink);
  }
`;

export const CardContent = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 4px;
  }
`;

const PixelCard = ({ title, children, className }) => {
  return (
    <CardContainer className={className}>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default PixelCard;
