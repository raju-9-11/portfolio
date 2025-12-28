import styled from 'styled-components';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import PixelCard from './common/PixelCard';
import { projectsData } from '../data/portfolio';

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

  &:hover {
    border-color: var(--neon-pink);
    transform: scale(1.02);
  }
`;

const ProjectHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
`;

const ProjectTitle = styled.h4`
  color: var(--neon-yellow);
  margin: 0;
  font-size: 1.1rem;
`;

const TechStack = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;
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
`;

const Status = styled.span`
  font-size: 0.7rem;
  color: var(--neon-green);
  border: 1px solid var(--neon-green);
  padding: 2px 5px;
  white-space: nowrap;
`;

const ProjectLinks = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 15px;
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
