import styled, { keyframes } from 'styled-components';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import PixelCard from './common/PixelCard';
import { projectsData } from '../data/portfolio';

const glitchAnim = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const pulseAnim = keyframes`
  0%, 100% { opacity: 1; text-shadow: 0 0 5px var(--neon-green); }
  50% { opacity: 0.7; text-shadow: 0 0 2px var(--neon-green); }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ProjectCard = styled.div`
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--text-dim);
  padding: 15px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: var(--neon-pink);
    box-shadow: 3px 3px 0 var(--neon-cyan);
    transform: translate(-2px, -2px);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 0, 255, 0.05);
      pointer-events: none;
      z-index: 0;
    }
  }
`;

const ProjectHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
`;

const ProjectTitle = styled.h4`
  color: var(--neon-yellow);
  margin: 0;
  font-size: 1.1rem;

  ${ProjectCard}:hover & {
    animation: ${glitchAnim} 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
  }
`;

const TechStack = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
`;

const TechTag = styled.span`
  font-size: 0.7rem;
  background: var(--neon-cyan);
  color: var(--bg-color);
  padding: 2px 5px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #ccc;
  line-height: 1.4;
  flex-grow: 1;
  position: relative;
  z-index: 1;
`;

const Status = styled.span`
  font-size: 0.7rem;
  color: var(--neon-green);
  border: 1px solid var(--neon-green);
  padding: 2px 5px;
  white-space: nowrap;
  animation: ${pulseAnim} 2s infinite;
`;

const ProjectLinks = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 15px;
  position: relative;
  z-index: 1;
`;

const ProjectLink = styled.a`
  color: var(--neon-pink);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;

  &:hover {
    color: var(--neon-yellow);
    text-shadow: 0 0 5px var(--neon-yellow);
  }
`;

const Projects = () => {
  return (
    <PixelCard title="PROJECT_DATABASE">
      <ProjectsGrid>
        {projectsData.map((project, idx) => (
          <ProjectCard key={idx}>
            <div>
                <ProjectHeader>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <Status>{project.status}</Status>
                </ProjectHeader>
                <TechStack>
                {project.tech.map(t => <TechTag key={t}>{t}</TechTag>)}
                </TechStack>
                <Description>{project.description}</Description>
            </div>
            <ProjectLinks>
              {project.liveUrl && (
                <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt /> Live
                </ProjectLink>
              )}
              {project.sourceUrl && (
                <ProjectLink href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> Source
                </ProjectLink>
              )}
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </PixelCard>
  );
};

export default Projects;
