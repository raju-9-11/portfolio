import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { interestsData } from '../data/portfolio';

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  background: transparent;
  border: 1px solid var(--neon-yellow);
  color: var(--neon-yellow);
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: default;

  &:hover {
    background: var(--neon-yellow);
    color: var(--bg-color);
    box-shadow: 0 0 10px var(--neon-yellow);
  }
`;

const Interests = () => {
  return (
    <PixelCard title="SIDE_QUESTS">
      <Tags>
        {interestsData.map((interest, idx) => (
          <Tag key={idx}>{interest}</Tag>
        ))}
      </Tags>
    </PixelCard>
  );
};

export default Interests;
