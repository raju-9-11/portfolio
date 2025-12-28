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
`;

const AwardName = styled.h4`
  color: var(--neon-cyan);
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Issuer = styled.p`
  font-size: 0.9rem;
  color: var(--text-main);
  margin: 0;
`;

const Date = styled.p`
    font-size: 0.8rem;
    color: var(--text-dim);
    margin: 0;
    margin-top: 5px;
`;

const Awards = () => {
  return (
    <PixelCard title="HONORS_&_AWARDS">
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
