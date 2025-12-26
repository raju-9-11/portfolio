import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { profileData } from '../data/portfolio';

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;

  @media (min-width: 900px) {
    flex-direction: row;
    align-items: center;
    padding: 20px;
  }
`;

const ProfileSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (min-width: 900px) {
    border-right: 1px solid rgba(0, 243, 255, 0.2);
    padding-right: 30px;
  }
`;

const InfoSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Avatar = styled.img`
  width: 180px;
  height: 180px;
  border: 4px solid var(--neon-cyan);
  filter: grayscale(100%) contrast(1.2);
  object-fit: cover;
  box-shadow: 10px 10px 0 rgba(0, 243, 255, 0.2);
  transition: all 0.3s;

  &:hover {
    filter: grayscale(0%) contrast(1);
    transform: translate(-5px, -5px);
    box-shadow: 15px 15px 0 var(--neon-pink);
  }
`;

const GlitchName = styled.h1`
  font-size: 3rem;
  color: var(--neon-pink);
  text-shadow: 3px 3px var(--neon-cyan);
  margin: 20px 0 5px 0;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Role = styled.h2`
  font-size: 1.2rem;
  color: var(--neon-green);
  background: rgba(80, 250, 123, 0.1);
  padding: 5px 10px;
  border-left: 3px solid var(--neon-green);
`;

const TerminalBox = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--text-dim);
  padding: 15px;
  font-family: 'Courier New', monospace;
  position: relative;
  min-height: 150px;

  &::before {
    content: "guest@portfolio:~$ cat bio.txt";
    display: block;
    color: var(--neon-pink);
    border-bottom: 1px solid var(--text-dim);
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-size: 0.9rem;
  }
`;

const TypingText = styled.p`
  color: var(--text-main);
  line-height: 1.6;
  margin: 0;

  &::after {
    content: '_';
    animation: blink 1s infinite;
    color: var(--neon-cyan);
  }

  @keyframes blink {
    50% { opacity: 0; }
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;

  @media (min-width: 900px) {
    justify-content: flex-start;
  }
`;

const SocialBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 243, 255, 0.1);
  border: 1px solid var(--neon-cyan);
  color: var(--neon-cyan);
  font-size: 0.9rem;
  font-weight: bold;

  &:hover {
    background: var(--neon-cyan);
    color: #000;
    box-shadow: 0 0 10px var(--neon-cyan);
  }
`;

const Hero = () => {
  const [bioText, setBioText] = useState('');
  const fullText = profileData.summary;

  useEffect(() => {
    let idx = 0;
    // Delay start slightly
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setBioText((prev) => prev + fullText.charAt(idx));
        idx++;
        if (idx === fullText.length) clearInterval(interval);
      }, 30); // Typing speed
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [fullText]);

  return (
    <PixelCard>
      <HeroContent>
        <ProfileSection>
          <Avatar src={profileData.profileImage || "https://ui-avatars.com/api/?name=Raj+Kumar+S&background=0a0a1a&color=00f3ff&size=150"} alt="Avatar" />
          <GlitchName>{profileData.name}</GlitchName>
          <Role>{profileData.headline}</Role>
          <p style={{color: 'var(--text-dim)', marginTop: '10px'}}>{profileData.location}</p>
        </ProfileSection>

        <InfoSection>
          <TerminalBox>
            <TypingText>{bioText}</TypingText>
          </TerminalBox>

          <Socials>
            <SocialBtn href={profileData.socialLinks.linkedin} target="_blank">
              LINKEDIN
            </SocialBtn>
            <SocialBtn href={`mailto:${profileData.socialLinks.email}`}>
              EMAIL_UPLINK
            </SocialBtn>
          </Socials>
        </InfoSection>
      </HeroContent>
    </PixelCard>
  );
};

export default Hero;
