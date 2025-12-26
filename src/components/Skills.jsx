import styled from 'styled-components';
import WindowFrame from './common/WindowFrame';
import { skillsData } from '../data/portfolio';

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 15px;
  text-align: center;
`;

const SkillIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  background-color: var(--win-white);
  border: 1px solid var(--win-black);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 2px 2px 0 var(--win-gray-dark);
`;

const SkillName = styled.span`
  font-size: 0.8rem;
`;

// Simple icon mapping based on first letter or type
const getIcon = (skill) => {
  if (skill.category === 'Mobile') return '📱';
  if (skill.category === 'Frontend') return '🌐';
  if (skill.category === 'Backend') return '💾';
  return '⚙️';
};

const Skills = () => {
  return (
    <WindowFrame title="SKILLS_MANAGER">
      <SkillsGrid>
        {skillsData.map((skill) => (
          <SkillIcon key={skill.name}>
            <IconBox>{getIcon(skill)}</IconBox>
            <SkillName>{skill.name}</SkillName>
          </SkillIcon>
        ))}
      </SkillsGrid>
    </WindowFrame>
  );
};

export default Skills;
