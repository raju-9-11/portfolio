import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const TerminalContainer = styled.div`
  background-color: var(--term-bg);
  color: var(--term-green);
  font-family: 'Courier New', monospace;
  padding: 10px;
  height: 100%;
  min-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--term-green);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
`;

const Prompt = styled.span`
  color: #ff00ff; /* Neon pink for user/host */
  margin-right: 8px;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 15px;
  background-color: var(--term-green);
  animation: ${blink} 1s step-end infinite;
  vertical-align: middle;
  margin-left: 2px;
`;

const Terminal = ({ children }) => {
  return (
    <TerminalContainer>
       {children}
       <div>
         <Prompt>guest@portfolio:~$</Prompt>
         <Cursor />
       </div>
    </TerminalContainer>
  );
};

export default Terminal;
