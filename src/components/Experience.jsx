import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { experienceData } from '../data/portfolio';

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const JobItem = styled.div`
  border-left: 2px solid var(--neon-cyan);
  padding-left: 15px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 10px;
    height: 10px;
    background: var(--neon-pink);
    box-shadow: 0 0 5px var(--neon-pink);
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
`;

const Company = styled.h4`
  color: var(--neon-yellow);
  margin: 0;
  font-size: 1.1rem;
`;

const Dates = styled.span`
  font-size: 0.8rem;
  color: var(--text-dim);
`;

const Role = styled.div`
  color: var(--neon-cyan);
  font-size: 0.9rem;
  margin: 5px 0;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 0.85rem;
  line-height: 1.4;
  color: #ccc;
  margin-bottom: 10px;
`;

const ProjectList = styled.ul`
  list-style: none;
  padding-left: 10px;
  margin: 5px 0;
`;

const ProjectItem = styled.li`
  font-size: 0.85rem;
  margin-bottom: 5px;
  color: var(--text-dim);

  strong {
    color: var(--text-main);
  }

  &::before {
    content: ">> ";
    color: var(--neon-green);
  }
`;

const Experience = () => {
  return (
    <PixelCard title="EXPERIENCE_LOG">
      <Timeline>
        {experienceData.map((exp, index) => (
          <JobItem key={index}>
            <JobHeader>
              <Company>{exp.company}</Company>
              <Dates>{exp.dates}</Dates>
            </JobHeader>
            <Role>{exp.role}</Role>
            {exp.description && <Description>{exp.description}</Description>}
            {exp.projects && (
              <ProjectList>
                {exp.projects.map((proj, pIndex) => (
                  <ProjectItem key={pIndex}>
                    <strong>{proj.name}:</strong> {proj.desc}
                  </ProjectItem>
                ))}
              </ProjectList>
            )}
          </JobItem>
        ))}
      </Timeline>
    </PixelCard>
  );
};

export default Experience;
