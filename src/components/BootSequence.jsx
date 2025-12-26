import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const turnOn = keyframes`
  0% { transform: scale(1, 0.005) scaleY(0); filter: brightness(30); opacity: 0; }
  20% { transform: scale(1, 0.005) scaleY(1); filter: brightness(10); opacity: 1; }
  50% { transform: scale(1, 0.005) scaleY(1); filter: brightness(1); }
  70% { transform: scale(1.3, 0.005) scaleY(1); }
  100% { transform: scale(1, 1) scaleY(1); filter: brightness(1); }
`;

const textGlow = keyframes`
  0% { text-shadow: 0 0 5px var(--neon-green); opacity: 0.8; }
  50% { text-shadow: 0 0 20px var(--neon-green), 0 0 10px var(--neon-green); opacity: 1; }
  100% { text-shadow: 0 0 5px var(--neon-green); opacity: 0.8; }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  animation: ${turnOn} 0.4s ease-out forwards;
`;

const LogContainer = styled.div`
  font-family: 'Courier New', monospace;
  color: var(--neon-green);
  width: 80%;
  max-width: 600px;
  text-align: left;
`;

const LogLine = styled.div`
  margin: 5px 0;
  opacity: 0;
  animation: fadeIn 0.1s forwards;

  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #333;
  margin-top: 20px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: var(--neon-cyan);
    box-shadow: 0 0 10px var(--neon-cyan);
    transition: width 0.1s linear;
  }
`;

const AccessText = styled.h1`
  color: var(--neon-pink);
  font-size: 2rem;
  margin-top: 20px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 5px;
  animation: ${textGlow} 1.5s infinite;
`;

const BootSequence = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  const bootLogs = [
    "INITIALIZING KERNEL...",
    "LOADING MEMORY MODULES...",
    "CHECKING PERIPHERALS...",
    "MOUNTING FILE SYSTEM...",
    "ESTABLISHING SECURE CONNECTION...",
    "LOADING PROFILE DATA...",
    "RENDERING UI COMPONENTS...",
    "SYSTEM OPTIMIZATION...",
    "DONE."
  ];

  useEffect(() => {
    let currentLog = 0;

    const logInterval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        setProgress(((currentLog + 1) / bootLogs.length) * 100);
        currentLog++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setComplete(true), 500);
        setTimeout(onComplete, 2000); // Wait a bit after completion before hiding
      }
    }, 150); // Speed of logs

    return () => clearInterval(logInterval);
  }, [onComplete]);

  return (
    <Container>
      {!complete ? (
        <LogContainer>
          {logs.map((log, i) => (
            <LogLine key={i}>{'>'} {log}</LogLine>
          ))}
          <ProgressBar progress={progress} />
        </LogContainer>
      ) : (
        <AccessText>SYSTEM ONLINE</AccessText>
      )}
    </Container>
  );
};

export default BootSequence;
