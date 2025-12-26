import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { projectsData } from '../data/portfolio';

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const ProjectCard = styled.div`
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--text-dim);
  padding: 15px;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--neon-pink);
    transform: scale(1.02);
  }
`;

const ProjectTitle = styled.h4`
  color: var(--neon-yellow);
  margin-bottom: 5px;
  font-size: 1rem;
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
  font-size: 0.8rem;
  color: #ccc;
  line-height: 1.4;
`;

const Status = styled.span`
  font-size: 0.7rem;
  color: var(--neon-green);
  border: 1px solid var(--neon-green);
  padding: 2px 5px;
  float: right;
  margin-top: -35px; /* Hacky align with title */
`;

const Projects = () => {
  return (
    <PixelCard title="PROJECT_DATABASE">
      <ProjectsGrid>
        {projectsData.map((project, idx) => (
          <ProjectCard key={idx}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <Status>{project.status}</Status>
            <TechStack>
              {project.tech.map(t => <TechTag key={t}>{t}</TechTag>)}
            </TechStack>
            <Description>{project.description}</Description>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </PixelCard>
  );
};

export default Projects;
