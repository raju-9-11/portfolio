import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { useTheme } from './context/ThemeContext';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Interests from './components/Interests';
import Contact from './components/Contact';
import BootSequence from './components/BootSequence';
import Certifications from './components/Certifications';
import Awards from './components/Awards';
import Testimonials from './components/Testimonials';
import SystemAlert from './components/SystemAlert';
import { logSystemLogin } from './firebase';
import BackToTop from './components/common/BackToTop';
import CyberpunkOverlay from './components/effects/CyberpunkOverlay';
import ThemeSwitcher from './components/common/ThemeSwitcher';

const MainWrapper = styled.div`
  min-height: 100vh;
  position: relative;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--grid-gap);
  padding: 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 50px;

  /* Mobile Layout */
  grid-template-areas:
    "H"
    "J"
    "E"
    "S"
    "L"
    "T"
    "A"
    "W"
    "I"
    "C";

  /* Tablet Layout */
  @media (min-width: 700px) and (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "H H"
      "J J"
      "E E"
      "S S"
      "L A"
      "W I"
      "T T"
      "C C";
  }

  /* Desktop Layout */
  @media (min-width: 1101px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: min-content;

    grid-template-areas:
      "H H H H"
      "J J E E"
      "S S S S"
      "L A W I"
      "T T T T"
      "C C C C";
  }
`;

// Wrappers to assign grid areas
const HeroArea = styled.div` grid-area: H; `;
const SkillsArea = styled.div` grid-area: S; `;
const ExperienceArea = styled.div` grid-area: E; `;
const ProjectsArea = styled.div` grid-area: J; `;
const AchievementsArea = styled.div` grid-area: A; `;
const InterestsArea = styled.div` grid-area: I; `;
const ContactArea = styled.div` grid-area: C; `;
const CertificationsArea = styled.div` grid-area: L; `;
const AwardsArea = styled.div` grid-area: W; `;
const TestimonialsArea = styled.div` grid-area: T; `;


function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (bootComplete) {
      logSystemLogin();
    }
  }, [bootComplete]);

  // Apply theme to body via data-attribute
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <GlobalStyle />
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}

      {bootComplete && (
        <MainWrapper>
          <CyberpunkOverlay />
          <SystemAlert />
          <BentoGrid>
            <HeroArea><Hero /></HeroArea>
            <ProjectsArea><Projects /></ProjectsArea>
            <ExperienceArea><Experience /></ExperienceArea>
            <SkillsArea><Skills /></SkillsArea>
            <CertificationsArea><Certifications /></CertificationsArea>
            <TestimonialsArea><Testimonials /></TestimonialsArea>
            <AchievementsArea><Achievements /></AchievementsArea>
            <AwardsArea><Awards /></AwardsArea>
            <InterestsArea><Interests /></InterestsArea>
            <ContactArea><Contact /></ContactArea>
          </BentoGrid>
          <BackToTop />
          <div style={{textAlign: 'center', padding: '20px', color: 'var(--text-dim)', fontSize: '0.8rem', position: 'relative', zIndex: 10}}>
            <ThemeSwitcher />
            <br/>
            SYSTEM STATUS: ONLINE | © {new Date().getFullYear()} RAJ KUMAR S
          </div>
        </MainWrapper>
      )}
    </>
  )
}

export default App
