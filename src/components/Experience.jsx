import styled from 'styled-components';
import WindowFrame from './common/WindowFrame';
import { experienceData } from '../data/portfolio';

const TreeView = styled.div`
  border: 2px inset var(--win-white);
  background: var(--win-white);
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
`;

const ExpItem = styled.div`
  margin-bottom: 20px;
  padding-left: 20px;
  border-left: 1px dotted var(--win-gray-dark);
  position: relative;

  &:last-child {
    border-left: none;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 15px;
    height: 1px;
    background: var(--win-gray-dark);
  }
`;

const CompanyHeader = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;
`;

const Role = styled.div`
  font-style: italic;
  color: var(--win-gray-dark);
  font-size: 0.9rem;
`;

const Details = styled.div`
  margin-top: 5px;
  font-size: 0.9rem;
  white-space: pre-wrap;
  color: #333;
`;

const Experience = () => {
  return (
    <WindowFrame title="C:\USERS\RAJ\EXPERIENCE">
      <TreeView>
        {experienceData.map((exp, index) => (
          <ExpItem key={index}>
             <CompanyHeader>
               📂 {exp.company}
               <span style={{fontSize: '0.8rem', fontWeight: 'normal'}}>({exp.dates})</span>
             </CompanyHeader>
             <Role>↳ {exp.role} | {exp.type}</Role>
             {exp.description && <Details>{exp.description}</Details>}
          </ExpItem>
        ))}
      </TreeView>
    </WindowFrame>
  );
};

export default Experience;
