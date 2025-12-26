import { useState, useEffect } from 'react';
import styled from 'styled-components';
import WindowFrame from './common/WindowFrame';
import Terminal from './common/Terminal';
import { profileData } from '../data/portfolio';

const CodeText = styled.p`
  margin: 0 0 10px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const Bio = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = profileData.summary;

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) {
        clearInterval(intervalId);
      }
    }, 15); // Typing speed

    return () => clearInterval(intervalId);
  }, [fullText]);

  return (
    <WindowFrame title="BIO_LOG.TXT" font="'Courier New', monospace">
      <Terminal>
        <CodeText>{displayedText}</CodeText>
      </Terminal>
    </WindowFrame>
  );
};

export default Bio;
