import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { achievementsData } from '../data/portfolio';
import { FaTrophy } from 'react-icons/fa';
import ThemedIcon from './common/ThemedIcon';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  margin-bottom: 15px;
  border-bottom: 1px dashed var(--text-dim);
  padding-bottom: 10px;

  &:last-child {
    border-bottom: none;
  }
`;

const Title = styled.div`
  color: var(--neon-pink);
  font-weight: bold;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Event = styled.div`
  color: var(--neon-cyan);
  font-size: 0.8rem;
  margin: 2px 0 2px 24px; /* Indent to align with text */
`;

const Desc = styled.div`
  color: var(--text-dim);
  font-size: 0.8rem;
  margin-left: 24px;
`;

const Achievements = () => {
  return (
    <PixelCard title="Achievements">
      <List>
        {achievementsData.map((item, idx) => (
          <Item key={idx}>
            <Title>
              <ThemedIcon ascii="[+]" icon={<FaTrophy size={14} />} />
              {item.title}
            </Title>
            <Event>@{item.event}</Event>
            <Desc>{item.description}</Desc>
          </Item>
        ))}
      </List>
    </PixelCard>
  );
};

export default Achievements;
