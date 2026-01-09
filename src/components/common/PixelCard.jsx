import styled from 'styled-components';
import GlitchText from '../effects/GlitchText';

const StyledContainer = styled.div`
  background-color: var(--card-bg);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  /* Professional Theme Base */
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 24px;
  border: 1px solid var(--border-color);

  /* Cyberpunk Theme Overrides */
  [data-theme='cyberpunk'] & {
    padding: 20px;
    border: 2px solid var(--neon-cyan);
    box-shadow: none;
    border-radius: 0;

    /* Pixel/Chamfered corners */
    clip-path: polygon(
      0 20px,
      20px 0,
      100% 0,
      100% calc(100% - 20px),
      calc(100% - 20px) 100%,
      0 100%
    );

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
      z-index: 10;
    }

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
  }
`;

export const CardTitle = styled.h3`
  color: var(--neon-cyan);
  padding-bottom: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;

  /* Cyberpunk specific */
  [data-theme='cyberpunk'] & {
    border-bottom: 2px solid var(--neon-pink);
    &::before {
      content: ">";
      margin-right: 10px;
      color: var(--neon-pink);
    }
  }

  /* Professional specific */
  [data-theme='professional'] & {
    color: var(--text-main);
    border-bottom: 1px solid var(--border-color);
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

const PixelCard = ({ title, children, className, ...props }) => {
  return (
    <StyledContainer className={className} title={title} {...props}>
      {title && <CardTitle><GlitchText text={title} /></CardTitle>}
      <CardContent>{children}</CardContent>
    </StyledContainer>
  );
};

export default PixelCard;
