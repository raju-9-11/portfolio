import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { awardsData } from '../data/portfolio';

const AwardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AwardCard = styled.div`
  background: rgba(0,0,0,0.2);
  border: 1px solid var(--text-dim);
  padding: 15px;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #ffffff;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  }
`;

const AwardName = styled.h4`
  color: var(--neon-cyan);
  font-size: 1rem;
  margin-bottom: 5px;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #0f172a;
    font-weight: 600;
  }
`;

const Issuer = styled.p`
  font-size: 0.9rem;
  color: var(--text-main);
  margin: 0;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: var(--text-dim);
  }
`;

const Date = styled.p`
    font-size: 0.8rem;
    color: var(--text-dim);
    margin: 0;
    margin-top: 5px;
`;

const Awards = () => {
  return (
    <PixelCard title="Awards">
      <AwardsList>
        {awardsData.map((award, idx) => (
          <AwardCard key={idx}>
            <AwardName>{award.name}</AwardName>
            <Issuer>{award.issuer}</Issuer>
            <Date>Date: {award.date}</Date>
          </AwardCard>
        ))}
      </AwardsList>
    </PixelCard>
  );
};

export default Awards;
