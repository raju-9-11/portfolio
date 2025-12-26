import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import Profile from './components/Profile';
import Bio from './components/Bio';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Interests from './components/Interests';
import Contact from './components/Contact';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  /* Background grid pattern for a techy feel */
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
`;

const Footer = styled.footer`
  margin-top: 20px;
  color: var(--win-white);
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  text-align: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Profile />
        <Bio />
        <Skills />
        <Experience />
        <Interests />
        <Contact />

        <Footer>
          © {new Date().getFullYear()} Raj Kumar S. All rights reserved. <br/>
          Built with React & Retro Vibes.
        </Footer>
      </AppContainer>
    </>
  )
}

export default App
