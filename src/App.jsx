import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import Profile from './components/Profile';
import Bio from './components/Bio';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Interests from './components/Interests';
import Contact from './components/Contact';

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--grid-gap);
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;

  /* Desktop Layout */
  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto;

    /*
      Grid Area Map (4 columns)
      P = Profile, B = Bio, S = Skills, E = Experience
      J = Projects, A = Achievements, I = Interests, C = Contact
    */
    grid-template-areas:
      "P P B B"
      "S A E E"
      "J J J J"
      "I C C C";
  }
`;

// Wrappers to assign grid areas
const ProfileArea = styled.div` grid-area: P; @media(min-width: 900px) { height: 100%; } `;
const BioArea = styled.div` grid-area: B; @media(min-width: 900px) { height: 100%; } `;
const SkillsArea = styled.div` grid-area: S; `;
const ExperienceArea = styled.div` grid-area: E; `;
const ProjectsArea = styled.div` grid-area: J; `;
const AchievementsArea = styled.div` grid-area: A; `;
const InterestsArea = styled.div` grid-area: I; `;
const ContactArea = styled.div` grid-area: C; `;

function App() {
  return (
    <>
      <GlobalStyle />
      <BentoGrid>
        <ProfileArea><Profile /></ProfileArea>
        <BioArea><Bio /></BioArea>
        <SkillsArea><Skills /></SkillsArea>
        <AchievementsArea><Achievements /></AchievementsArea>
        <ExperienceArea><Experience /></ExperienceArea>
        <ProjectsArea><Projects /></ProjectsArea>
        <InterestsArea><Interests /></InterestsArea>
        <ContactArea><Contact /></ContactArea>
      </BentoGrid>
      <div style={{textAlign: 'center', padding: '20px', color: 'var(--text-dim)', fontSize: '0.8rem'}}>
        SYSTEM STATUS: ONLINE | © {new Date().getFullYear()} RAJ KUMAR S
      </div>
    </>
  )
}

export default App
