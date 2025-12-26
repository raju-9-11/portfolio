import styled from 'styled-components';
import WindowFrame from './common/WindowFrame';
import { interestsData } from '../data/portfolio';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  &:before {
    content: '💿';
    margin-right: 10px;
  }
`;

const Interests = () => {
  return (
    <WindowFrame title="MEDIA_PLAYER / INTERESTS">
      <List>
        {interestsData.map((interest, idx) => (
          <ListItem key={idx}>{interest}</ListItem>
        ))}
      </List>
    </WindowFrame>
  );
};

export default Interests;
