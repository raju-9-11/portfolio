import styled, { keyframes } from 'styled-components';
import PixelCard from './common/PixelCard';
import { FaApple, FaMicrochip, FaLayerGroup } from 'react-icons/fa';

const glitchAnim = keyframes`
  0% { transform: scale(1); clip-path: inset(0 0 0 0); }
  20% { clip-path: inset(10% 0 0 0); }
  40% { clip-path: inset(0 0 0 0); }
  60% { transform: scale(1.02); clip-path: inset(0 0 10% 0); }
  80% { clip-path: inset(0 0 0 0); }
  100% { transform: scale(1); clip-path: inset(0 0 0 0); }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 5px;
`;

const DomainCard = styled.div`
  /* Default Cyberpunk Style matching ProjectCard */
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--text-dim);
  padding: 18px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  /* Professional Theme Override */
  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #ffffff;
    border: 1px solid var(--border-color);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    overflow: hidden;

    &:hover {
      border-color: #3b82f6;
      box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }
  }

  [data-theme='cyberpunk'] &:hover {
    border-color: var(--neon-pink);
    box-shadow: 3px 3px 0 var(--neon-cyan);
    transform: translate(-2px, -2px);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 0, 255, 0.04);
      pointer-events: none;
      z-index: 0;
    }
  }
`;

const DomainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
`;

const DomainTitle = styled.h4`
  color: var(--neon-yellow);
  margin: 0;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 8px;

  ${DomainCard}:hover & {
    animation: ${glitchAnim} 0.5s cubic-bezier(.25, .46, .45, .94) both;
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #0f172a;
    font-weight: 700;
  }

  [data-theme='professional'] ${DomainCard}:hover &,
  [data-theme='modern'] ${DomainCard}:hover & {
    animation: none;
    color: #2563eb;
  }
`;

const StatusBadge = styled.span`
  font-size: 0.68rem;
  padding: 3px 8px;
  border: 1px solid currentColor;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;

  color: ${props => {
    switch (props.$type) {
      case 'primary': return 'var(--neon-green)';
      case 'systems': return 'var(--neon-pink)';
      default: return 'var(--neon-cyan)';
    }
  }};

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #f8fafc;
    border-radius: 4px;
    border-color: #e2e8f0;
    color: ${props => {
      switch (props.$type) {
        case 'primary': return '#166534';
        case 'systems': return '#7c3aed';
        default: return '#0284c7';
      }
    }};
  }
`;

const DomainSubtitle = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  margin: 0 0 14px 0;
  line-height: 1.4;
  position: relative;
  z-index: 1;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #64748b;
  }
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
`;

const SkillRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SkillInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-main);

  [data-theme='cyberpunk'] & span:first-child {
    color: var(--neon-cyan);
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    color: #334155;
    font-weight: 600;
  }

  small {
    font-size: 0.74rem;
    color: var(--text-dim);
    font-family: monospace;
  }
`;

const ProgressBar = styled.div`
  height: 5px;
  background: rgba(255, 255, 255, 0.1);
  width: 100%;
  position: relative;
  overflow: hidden;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #e2e8f0;
    border-radius: 9999px;
    height: 6px;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.$level}%;
    background: var(--neon-green);
    box-shadow: 0 0 6px var(--neon-green);
    transition: width 0.4s ease;

    [data-theme='professional'] &,
    [data-theme='modern'] & {
      background: linear-gradient(90deg, #3b82f6, #2563eb);
      box-shadow: none;
      border-radius: 9999px;
    }
  }
`;

const TechStack = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding-top: 10px;
  border-top: 1px dashed var(--border-color);
  position: relative;
  z-index: 1;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    border-top: 1px solid #f1f5f9;
  }
`;

const TechTag = styled.span`
  font-size: 0.7rem;
  background: var(--neon-cyan);
  color: var(--bg-color);
  padding: 2px 6px;
  font-weight: bold;

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-weight: 500;
  }
`;

const skillCategories = [
  {
    id: 'ios-agentic',
    title: 'Agentic AI & iOS Systems',
    status: 'Core Production',
    type: 'primary',
    icon: <FaApple size={16} />,
    subtitle: 'Modular component architecture, Swift design systems, and deterministic multi-agent state machines.',
    skills: [
      { name: 'Swift & SwiftUI', level: 90 },
      { name: 'Agentic Framework', level: 90 },
      { name: 'UIKit Architecture', level: 85 },
      { name: 'AI / LLM Pipelines', level: 85 }
    ],
    tags: ['Swift Concurrency', 'TDD QA', 'Design Systems', 'State Machine', 'Combine']
  },
  {
    id: 'systems-linux',
    title: 'Systems & Embedded Linux',
    status: 'Kernel & Hardware',
    type: 'systems',
    icon: <FaMicrochip size={16} />,
    subtitle: 'Low-level OS distributions, RK3588 board bring-up, device trees, and kernel process scheduling.',
    skills: [
      { name: 'Linux Kernel & C', level: 80 },
      { name: 'RK3588 / DTS', level: 75 },
      { name: 'POSIX & Makefiles', level: 75 },
      { name: 'Armbian / FIT Images', level: 70 }
    ],
    tags: ['Mainline 6.18', 'Device Tree', 'Memory Bounds', 'Process Hooks']
  },
  {
    id: 'fullcycle-ecosystem',
    title: 'Full-Cycle & Ecosystem',
    status: 'Cross-Platform',
    type: 'ecosystem',
    icon: <FaLayerGroup size={16} />,
    subtitle: 'Cross-platform mobile companions, cloud services, telemetry, and secure networking mesh.',
    skills: [
      { name: 'Firebase & Auth', level: 75 },
      { name: 'React & Web Apps', level: 70 },
      { name: 'Kotlin & Android', level: 60 },
      { name: 'Java & React Native', level: 65 }
    ],
    tags: ['Jetpack Compose', 'Tailscale Mesh', 'Cloud Firestore', 'REST/WebSockets']
  }
];

const Skills = () => {
  return (
    <PixelCard title="Technical Proficiencies">
      <SkillsContainer>
        {skillCategories.map(cat => (
          <DomainCard key={cat.id}>
            <div>
              <DomainHeader>
                <DomainTitle>
                  {cat.icon}
                  <span>{cat.title}</span>
                </DomainTitle>
                <StatusBadge $type={cat.type}>[{cat.status}]</StatusBadge>
              </DomainHeader>
              <DomainSubtitle>{cat.subtitle}</DomainSubtitle>
              <SkillList>
                {cat.skills.map(s => {
                  const skillId = `skill-${s.name.replace(/\s+/g, '-').toLowerCase()}`;
                  return (
                    <SkillRow key={s.name}>
                      <SkillInfo id={skillId}>
                        <span>{s.name}</span>
                        <small>{s.level}%</small>
                      </SkillInfo>
                      <ProgressBar
                        $level={s.level}
                        role="progressbar"
                        aria-valuenow={s.level}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-labelledby={skillId}
                      />
                    </SkillRow>
                  );
                })}
              </SkillList>
            </div>
            <TechStack>
              {cat.tags.map(t => (
                <TechTag key={t}>{t}</TechTag>
              ))}
            </TechStack>
          </DomainCard>
        ))}
      </SkillsContainer>
    </PixelCard>
  );
};

export default Skills;
