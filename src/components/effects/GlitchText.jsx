import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const glitchAnim = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const GlitchWrapper = styled.span`
  position: relative;
  display: inline-block;

  /* Only apply glitch hover in cyberpunk mode */
  ${props => props.$theme === 'cyberpunk' && css`
    &:hover {
      animation: ${glitchAnim} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
      color: var(--neon-pink);

      &::before, &::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--card-bg); /* Match background to hide original text slightly */
      }

      &::before {
        left: 2px;
        text-shadow: -1px 0 var(--neon-cyan);
        clip: rect(24px, 550px, 90px, 0);
        animation: ${glitchAnim} 2s infinite linear alternate-reverse;
      }

      &::after {
        left: -2px;
        text-shadow: -1px 0 var(--neon-green);
        clip: rect(85px, 550px, 140px, 0);
        animation: ${glitchAnim} 2s infinite linear alternate-reverse;
      }
    }
  `}
`;

// Dictionary for Cyberpunk text replacements
const CYBERPUNK_DICTIONARY = {
  "Experience": "MEMORY BANKS",
  "Skills": "INSTALLED MODULES",
  "Projects": "EXECUTABLE PROGRAMS",
  "Contact": "COMMS UPLINK",
  "About": "BIO_METRICS",
  "Achievements": "TROPHY DATA",
  "Awards": "RECOGNITION PROTOCOLS",
  "Certifications": "AUTH KEYS",
  "Interests": "BACKGROUND PROCESSES",
  "Testimonials": "USER REVIEWS",
  "LinkedIn": "NETWORK_LINK",
  "Email": "EMAIL_UPLINK"
};

const GlitchText = ({ text }) => {
  const { theme } = useTheme();

  // If cyberpunk, check if we have a cool replacement
  const displayText = (theme === 'cyberpunk' && CYBERPUNK_DICTIONARY[text])
    ? CYBERPUNK_DICTIONARY[text]
    : text;

  return (
    <GlitchWrapper $theme={theme} data-text={displayText}>
      {displayText}
    </GlitchWrapper>
  );
};

export default GlitchText;
