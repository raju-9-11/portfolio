import styled from 'styled-components';

export const WindowContainer = styled.div`
  background-color: var(--win-gray);
  border: 2px solid;
  border-color: var(--win-white) var(--win-black) var(--win-black) var(--win-white);
  padding: 2px;
  box-shadow: 1px 1px 0px var(--win-black);
  margin-bottom: 20px;
  max-width: 800px;
  width: 100%;
`;

export const TitleBar = styled.div`
  background: linear-gradient(90deg, var(--win-blue-dark), #1084d0);
  padding: 3px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleText = styled.span`
  color: var(--win-white);
  font-weight: bold;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
`;

export const Controls = styled.div`
  display: flex;
  gap: 2px;
`;

export const ControlButton = styled.button`
  width: 16px;
  height: 14px;
  background-color: var(--win-gray);
  border: 1px solid;
  border-color: var(--win-white) var(--win-black) var(--win-black) var(--win-white);
  font-size: 8px;
  line-height: 10px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:active {
    border-color: var(--win-black) var(--win-white) var(--win-white) var(--win-black);
  }
`;

export const WindowContent = styled.div`
  padding: 15px;
  font-family: ${props => props.font || 'inherit'};
`;

const WindowFrame = ({ title, children, font }) => {
  return (
    <WindowContainer>
      <TitleBar>
        <TitleText>{title}</TitleText>
        <Controls>
          <ControlButton>_</ControlButton>
          <ControlButton>□</ControlButton>
          <ControlButton>X</ControlButton>
        </Controls>
      </TitleBar>
      <WindowContent font={font}>
        {children}
      </WindowContent>
    </WindowContainer>
  );
};

export default WindowFrame;
