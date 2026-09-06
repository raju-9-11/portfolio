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
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: default;
  transition: all 0.2s ease;

  &:hover {
    background: var(--neon-yellow);
    color: var(--bg-color);
    box-shadow: 0 0 10px var(--neon-yellow);
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    color: #334155;
    border-radius: 9999px;
    font-weight: 500;

    &:hover {
      background: #e2e8f0;
      color: #0f172a;
      box-shadow: none;
    }
  }
`;

const Interests = () => {
  return (
    <PixelCard title="Interests">
      <Tags>
        {interestsData.map((interest, idx) => (
          <Tag key={idx}>{interest}</Tag>
        ))}
      </Tags>
    </PixelCard>
  );
};

export default Interests;
