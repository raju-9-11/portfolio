import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { profileData } from '../data/portfolio';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  justify-content: center;
`;

const GlitchText = styled.h1`
  font-size: 2.5rem;
  color: var(--neon-pink);
  text-shadow: 2px 2px var(--neon-cyan);
  position: relative;
  margin-bottom: 5px;

  /* Simple glitch animation placeholder */
  &:hover {
    text-shadow: -2px -2px var(--neon-yellow);
  }
`;

const Role = styled.h2`
  font-size: 1rem;
  color: var(--neon-green);
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border: 4px solid var(--neon-cyan);
  margin-bottom: 20px;
  filter: grayscale(100%) contrast(1.2);
  object-fit: cover;

  &:hover {
    filter: grayscale(0%) contrast(1);
    border-color: var(--neon-pink);
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  font-size: 0.9rem;
  padding: 5px 10px;
  border: 1px solid var(--neon-cyan);
  background: rgba(0, 243, 255, 0.1);

  &:hover {
    background: var(--neon-cyan);
    color: var(--bg-color);
  }
`;

const Profile = () => {
  return (
    <PixelCard>
      <ProfileWrapper>
        <Avatar src={profileData.profileImage || "https://ui-avatars.com/api/?name=Raj+Kumar+S&background=0a0a1a&color=00f3ff&size=150"} alt="Profile" />
        <GlitchText>{profileData.name}</GlitchText>
        <Role>{profileData.headline}</Role>
        <p style={{color: 'var(--text-dim)'}}>{profileData.location}</p>

        <Socials>
          <SocialIcon href={profileData.socialLinks.linkedin} target="_blank">LI</SocialIcon>
          <SocialIcon href={`mailto:${profileData.socialLinks.email}`}>@</SocialIcon>
        </Socials>
      </ProfileWrapper>
    </PixelCard>
  );
};

export default Profile;
