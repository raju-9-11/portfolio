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
`;

const CertificationName = styled.h4`
  color: var(--neon-cyan);
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const Issuer = styled.p`
  font-size: 0.8rem;
  color: var(--text-main);
  margin-bottom: 10px;
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
`;

const ButtonContainer = styled.div`
    text-align: center;
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
`;

const Certifications = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const certificationsToShow = 3;

  return (
    <>
      <PixelCard title="LICENSES_&_CERTIFICATIONS">
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
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="LICENSES_&_CERTIFICATIONS">
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
