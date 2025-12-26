import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { profileData } from '../data/portfolio';

const TerminalText = styled.div`
  font-family: 'Courier New', monospace;
  color: var(--neon-green);
  line-height: 1.6;
  font-size: 0.9rem;

  &::after {
    content: '_';
    animation: blink 1s infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }
`;

const Bio = () => {
  const [text, setText] = useState('');
  const fullText = profileData.summary;

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + fullText.charAt(idx));
      idx++;
      if (idx === fullText.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <PixelCard title="BIO_DATA">
      <TerminalText>
        <span style={{color: 'var(--neon-pink)'}}>guest@portfolio:~$</span> cat bio.txt<br/>
        {text}
      </TerminalText>
    </PixelCard>
  );
};

export default Bio;
