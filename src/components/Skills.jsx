import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { skillsData } from '../data/portfolio';

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
`;

const SkillBar = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border: 1px solid var(--text-dim);

  &:hover {
    border-color: var(--neon-cyan);
    background: rgba(0, 243, 255, 0.05);
  }
`;

const SkillName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.8rem;
  color: var(--neon-cyan);
`;

const ProgressBar = styled.div`
  height: 6px;
  background: #333;
  width: 100%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.$level}%;
    background: var(--neon-green);
    box-shadow: 0 0 5px var(--neon-green);
  }
`;

const Skills = () => {
  return (
    <PixelCard title="Skills">
      <SkillsGrid>
        {skillsData.map((skill, index) => (
          <SkillBar key={skill.name}>
            <SkillName>
              <span id={`skill-${index}`}>{skill.name}</span>
              <span aria-hidden="true">{skill.level}%</span>
            </SkillName>
            <ProgressBar
              $level={skill.level}
              role="progressbar"
              aria-valuenow={skill.level}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-labelledby={`skill-${index}`}
            />
          </SkillBar>
        ))}
      </SkillsGrid>
    </PixelCard>
  );
};

export default Skills;
