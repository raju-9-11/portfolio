import { useState } from 'react';
import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import Modal from './common/Modal';
import { certificationsData } from '../data/portfolio';
import { FaExternalLinkAlt, FaCertificate } from 'react-icons/fa';

const CertificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  justify-content: space-between;
  padding: 5px;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  padding: 2px;
`;

const CertCard = styled.div`
  /* Cyberpunk style matching ProjectCard */
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--text-dim);
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;

  /* Professional Theme */
  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #ffffff;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

    &:hover {
      border-color: #3b82f6;
      box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }
  }

  [data-theme='cyberpunk'] &:hover {
    border-color: var(--neon-cyan);
    box-shadow: 2px 2px 0 var(--neon-pink);
    transform: translate(-1px, -1px);
  }
`;

const CertHeader = styled.div`
  margin-bottom: 8px;
`;

const CertName = styled.h4`
  color: var(--neon-cyan);
  font-size: 0.88rem;
  margin: 0 0 6px 0;
  line-height: 1.35;
  font-weight: 600;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #0f172a;
  }
`;

const IssuerTag = styled.span`
  font-size: 0.72rem;
  background: rgba(0, 243, 255, 0.1);
  color: var(--neon-cyan);
  padding: 2px 6px;
  display: inline-block;
  font-weight: 600;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-weight: 500;
  }
`;

const CertFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px dashed var(--border-color);
  font-size: 0.76rem;
  color: var(--text-dim);

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    border-top: 1px solid #f8fafc;
  }
`;

const CredentialLink = styled.a`
  color: var(--neon-pink);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  font-size: 0.76rem;
  font-weight: 600;

  &:hover {
    color: var(--neon-yellow);
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #2563eb;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ViewAllButton = styled.button`
  background: transparent;
  border: 1px solid var(--neon-pink);
  color: var(--neon-pink);
  padding: 8px 16px;
  font-size: 0.82rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  width: 100%;

  [data-theme='cyberpunk'] & {
    clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);

    &:hover {
      background: var(--neon-pink);
      color: #000;
      box-shadow: 0 0 12px var(--neon-pink);
    }
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #f8fafc;
    color: #2563eb;
    border: 1px solid #cbd5e1;
    border-radius: 8px;

    &:hover {
      background: #eff6ff;
      border-color: #bfdbfe;
      color: #1d4ed8;
      box-shadow: 0 2px 6px rgba(37, 99, 235, 0.1);
    }
  }
`;

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
  max-height: 65vh;
  overflow-y: auto;
  padding: 4px;
`;

const Certifications = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const previewCount = 3;

  return (
    <>
      <PixelCard title="Certifications">
        <CertificationsContainer>
          <PreviewGrid>
            {certificationsData.slice(0, previewCount).map((cert, idx) => (
              <CertCard key={idx}>
                <div>
                  <CertHeader>
                    <IssuerTag>{cert.issuer}</IssuerTag>
                  </CertHeader>
                  <CertName>{cert.name}</CertName>
                </div>
                <CertFooter>
                  <span>{cert.date}</span>
                  {cert.credentialUrl ? (
                    <CredentialLink href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      Verify <FaExternalLinkAlt size={9} />
                    </CredentialLink>
                  ) : (
                    <span>Verified</span>
                  )}
                </CertFooter>
              </CertCard>
            ))}
          </PreviewGrid>
          <ViewAllButton onClick={() => setModalOpen(true)}>
            <FaCertificate size={12} />
            <span>View All ({certificationsData.length}) Certifications</span>
          </ViewAllButton>
        </CertificationsContainer>
      </PixelCard>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="All Certifications">
        <ModalGrid>
          {certificationsData.map((cert, idx) => (
            <CertCard key={idx}>
              <div>
                <CertHeader>
                  <IssuerTag>{cert.issuer}</IssuerTag>
                </CertHeader>
                <CertName>{cert.name}</CertName>
              </div>
              <CertFooter>
                <span>{cert.date}</span>
                {cert.credentialUrl ? (
                  <CredentialLink href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    Verify Credential <FaExternalLinkAlt size={10} />
                  </CredentialLink>
                ) : (
                  <span>Verified</span>
                )}
              </CertFooter>
            </CertCard>
          ))}
        </ModalGrid>
      </Modal>
    </>
  );
};

export default Certifications;
