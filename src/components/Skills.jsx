import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { skillsData } from '../data/portfolio';

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
  gap: 12px;
`;

const SkillBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border: 1px solid var(--text-dim);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--neon-cyan);
    background: rgba(0, 243, 255, 0.05);
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px;

    &:hover {
      border-color: #3b82f6;
      background: #ffffff;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      transform: translateY(-1px);
    }
  }
`;

const SkillName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.82rem;
  color: var(--neon-cyan);
  font-weight: 500;
  white-space: nowrap;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #0f172a;
    font-weight: 600;
  }
`;

const ProgressBar = styled.div`
  height: 6px;
  background: #333;
  width: 100%;
  position: relative;
  overflow: hidden;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #e2e8f0;
    border-radius: 9999px;
    height: 7px;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.$level}%;
    background: var(--neon-green);
    box-shadow: 0 0 5px var(--neon-green);

    [data-theme='professional'] &,
    [data-theme='modern'] & {
      background: linear-gradient(90deg, #3b82f6, #2563eb);
      box-shadow: none;
      border-radius: 9999px;
    }
  }
`;

const Skills = () => {
  return (
    <PixelCard title="Skills">
      <SkillsGrid>
        {skillsData.map((skill) => {
          const skillId = `skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`;
          return (
            <SkillBar key={skill.name}>
              <SkillName id={skillId}>
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </SkillName>
              <ProgressBar
                $level={skill.level}
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-labelledby={skillId}
              />
            </SkillBar>
          );
        })}
      </SkillsGrid>
    </PixelCard>
  );
};

export default Skills;
