import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { FaRunning, FaTerminal, FaCogs, FaGamepad } from 'react-icons/fa';

const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
`;

const InterestCard = styled.div`
  /* Cyberpunk style matching ProjectCard */
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--text-dim);
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;

  /* Professional Theme */
  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #ffffff;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

    &:hover {
      border-color: #3b82f6;
      box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }
  }

  [data-theme='cyberpunk'] &:hover {
    border-color: var(--neon-yellow);
    box-shadow: 2px 2px 0 var(--neon-cyan);
    transform: translate(-1px, -1px);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

const IconWrapper = styled.div`
  color: var(--neon-yellow);
  display: flex;
  align-items: center;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #2563eb;
  }
`;

const Title = styled.h4`
  color: var(--neon-yellow);
  font-size: 0.88rem;
  margin: 0;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #0f172a;
    font-weight: 600;
  }
`;

const Subtitle = styled.p`
  font-size: 0.78rem;
  color: #ccc;
  margin: 0 0 10px 0;
  line-height: 1.4;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #64748b;
  }
`;

const Tag = styled.span`
  font-size: 0.68rem;
  background: var(--neon-cyan);
  color: var(--bg-color);
  padding: 2px 6px;
  font-weight: bold;
  align-self: flex-start;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-weight: 500;
  }
`;

const interestsList = [
  {
    icon: <FaRunning size={14} />,
    title: "Obstacle Course Races",
    desc: "Endurance training, Spartan races, and extreme physical grit.",
    tag: "Athletics & Stamina"
  },
  {
    icon: <FaTerminal size={14} />,
    title: "Linux Rice & Dotfiles",
    desc: "Wayland, Hyprland/i3 setup, kernel tweaks, and minimal CLI setups.",
    tag: "Systems & Unix"
  },
  {
    icon: <FaCogs size={14} />,
    title: "System Architecture",
    desc: "Deterministic state machines, agentic pipelines, and low latency.",
    tag: "Deep Tech"
  },
  {
    icon: <FaGamepad size={14} />,
    title: "Retro Gaming & Emulation",
    desc: "ARM architecture, hardware emulation, and low-level ROM hacking.",
    tag: "Low-Level Fun"
  }
];

const Interests = () => {
  return (
    <PixelCard title="Interests & Passions">
      <InterestsGrid>
        {interestsList.map((item, idx) => (
          <InterestCard key={idx}>
            <div>
              <Header>
                <IconWrapper>{item.icon}</IconWrapper>
                <Title>{item.title}</Title>
              </Header>
              <Subtitle>{item.desc}</Subtitle>
            </div>
            <Tag>{item.tag}</Tag>
          </InterestCard>
        ))}
      </InterestsGrid>
    </PixelCard>
  );
};

export default Interests;
