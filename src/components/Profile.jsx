import styled from 'styled-components';
import WindowFrame from './common/WindowFrame';
import { profileData } from '../data/portfolio';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border: 2px solid;
  border-color: var(--win-gray-dark) var(--win-white) var(--win-white) var(--win-gray-dark);
  background: var(--win-white);
  padding: 2px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.2); /* Retro feel */
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Role = styled.h2`
  margin: 5px 0 15px;
  font-size: 1rem;
  font-weight: normal;
  color: var(--win-blue-dark);
`;

const SocialLink = styled.a`
  display: inline-block;
  margin-right: 15px;
  padding: 5px 10px;
  background: var(--win-gray);
  border: 1px solid;
  border-color: var(--win-white) var(--win-black) var(--win-black) var(--win-white);
  text-decoration: none;
  color: var(--win-black);
  font-size: 0.9rem;

  &:active {
    border-color: var(--win-black) var(--win-white) var(--win-white) var(--win-black);
    transform: translateY(1px);
  }
`;

const Profile = () => {
  return (
    <WindowFrame title="PROFILE.EXE">
      <ProfileWrapper>
        <ImageContainer>
           {/* Placeholder for now since we don't have a real URL yet */}
           <img src="https://ui-avatars.com/api/?name=Raj+Kumar+S&background=0D8ABC&color=fff&size=150" alt="Profile" />
        </ImageContainer>
        <Info>
          <Name>{profileData.name}</Name>
          <Role>{profileData.headline}</Role>

          <div>
            <SocialLink href={profileData.socialLinks.linkedin} target="_blank">LinkedIn</SocialLink>
            <SocialLink href={`mailto:${profileData.socialLinks.email}`}>Email Me</SocialLink>
          </div>
        </Info>
      </ProfileWrapper>
    </WindowFrame>
  );
};

export default Profile;
