import { useState } from 'react';
import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import Modal from './common/Modal';
import { certificationsData } from '../data/portfolio';
// import { FaExternalLinkAlt } from 'react-icons/fa'; // Temporarily removed

// Styles for the Modal content
const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
`;

const CertificationCard = styled.div`
  background: rgba(0,0,0,0.2);
  border: 1px solid var(--text-dim);
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  [data-theme='professional'] & {
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
`;

const CertificationName = styled.h4`
  color: var(--neon-cyan);
  font-size: 0.9rem;
  margin-bottom: 5px;

  [data-theme='professional'] & {
    color: var(--text-main);
    font-weight: 600;
  }
`;

const Issuer = styled.p`
  font-size: 0.8rem;
  color: var(--text-main);
  margin-bottom: 10px;

  [data-theme='professional'] & {
    color: var(--text-dim);
  }
`;

const Meta = styled.div`
  font-size: 0.8rem;
  color: var(--text-dim);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const CredentialLink = styled.a`
  color: var(--neon-pink);
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  font-size: 0.8rem;

  &:hover {
    color: var(--neon-yellow);
  }

  [data-theme='professional'] & {
    color: var(--neon-pink); /* Blue-500 */
    &:hover {
       text-decoration: underline;
       color: var(--neon-cyan);
    }
  }
`;

// Styles for the main card display
const PreviewList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
`;

const PreviewItem = styled.li`
    font-size: 0.9rem;
    color: var(--text-main);
    margin-bottom: 10px;
    border-left: 2px solid var(--neon-cyan);
    padding-left: 10px;

    span {
        font-size: 0.8rem;
        color: var(--text-dim);
        display: block;
    }

    [data-theme='professional'] & {
        border-left: 2px solid var(--border-color); /* Subtle accent */
        /* Or use accent color? Let's use accent for consistency */
        border-left-color: var(--neon-pink);
    }
`;

const ButtonContainer = styled.div`
    text-align: center;
    /* Add padding to container to prevent border clipping of child button on selection/hover */
    padding: 5px;
`;

const OpenModalButton = styled.button`
    background: var(--neon-pink);
    color: var(--bg-color);
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    font-family: var(--font-mono);
    text-transform: uppercase;
    transition: all 0.3s ease;

    &:hover {
        background: var(--neon-yellow);
        box-shadow: 0 0 10px var(--neon-yellow);
    }

    [data-theme='professional'] & {
        background: var(--bg-color);
        color: var(--neon-pink); /* Blue text */
        border: 1px solid var(--neon-pink);
        font-family: var(--font-main);
        text-transform: none;
        border-radius: 6px;
        font-weight: 500;

        /* Ensure outline doesn't clip */
        outline-offset: 2px;

        &:hover {
            background: var(--neon-pink);
            color: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        &:focus-visible {
            box-shadow: 0 0 0 2px var(--neon-pink);
        }
    }
`;

const Certifications = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const certificationsToShow = 3;

  return (
    <>
      <PixelCard title="Certifications">
        <PreviewList>
            {certificationsData.slice(0, certificationsToShow).map((cert, idx) => (
                <PreviewItem key={idx}>
                    {cert.name}
                    <span>{cert.issuer}</span>
                </PreviewItem>
            ))}
        </PreviewList>
        <ButtonContainer>
            <OpenModalButton onClick={() => setModalOpen(true)}>
                View All ({certificationsData.length})
            </OpenModalButton>
        </ButtonContainer>
      </PixelCard>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Certifications">
        <CertificationsGrid>
          {certificationsData.map((cert, idx) => (
            <CertificationCard key={idx}>
              <div>
                <CertificationName>{cert.name}</CertificationName>
                <Issuer>{cert.issuer}</Issuer>
              </div>
              <Meta>
                <span>{cert.date}</span>
                {cert.credentialUrl && (
                  <CredentialLink href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    {/* <FaExternalLinkAlt /> */} Credential
                  </CredentialLink>
                )}
              </Meta>
            </CertificationCard>
          ))}
        </CertificationsGrid>
      </Modal>
    </>
  );
};

export default Certifications;
