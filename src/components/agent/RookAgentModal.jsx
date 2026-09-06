import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { askRookAgent } from '../../services/minimaxClient';
import { FaPaperPlane, FaTimes, FaRobot, FaKey, FaCheck, FaPhoneAlt } from 'react-icons/fa';

const FloatingRookButton = styled(motion.button)`
  position: fixed;
  bottom: 80px;
  left: 20px;
  z-index: 995;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 9999px;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition: all 0.25s ease;

  [data-theme='cyberpunk'] & {
    background: rgba(10, 10, 20, 0.9);
    border: 1px solid var(--neon-cyan);
    color: var(--neon-cyan);
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
    border-radius: 0;

    &:hover {
      background: var(--neon-cyan);
      color: #000;
      box-shadow: 0 0 25px var(--neon-cyan);
      transform: translateY(-2px);
    }
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #0f172a;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);

    &:hover {
      border-color: #2563eb;
      color: #2563eb;
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.15);
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    bottom: 80px;
    left: 15px;
    padding: 8px 14px;
    font-size: 0.78rem;
  }
`;

const ChatDrawer = styled(motion.div)`
  position: fixed;
  bottom: 90px;
  left: 20px;
  width: 400px;
  max-width: calc(100vw - 40px);
  height: 520px;
  max-height: calc(100vh - 120px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  [data-theme='cyberpunk'] & {
    background: rgba(8, 8, 16, 0.96);
    border: 1px solid var(--neon-cyan);
    box-shadow: 0 0 25px rgba(0, 243, 255, 0.25);
    font-family: 'Courier New', monospace;
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  }
`;

const DrawerHeader = styled.div`
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);

  [data-theme='cyberpunk'] & {
    background: rgba(0, 243, 255, 0.08);
    border-bottom-color: rgba(0, 243, 255, 0.2);
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #f8fafc;
    border-bottom-color: #f1f5f9;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 0.95rem;

  small {
    font-size: 0.72rem;
    font-weight: 400;
    color: var(--text-dim);
    display: block;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MessageBubble = styled.div`
  max-width: 85%;
  padding: 10px 14px;
  font-size: 0.85rem;
  line-height: 1.45;
  border-radius: 12px;
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  white-space: pre-wrap;

  ${props => props.$isUser ? `
    background: var(--neon-cyan);
    color: #ffffff;
    border-bottom-right-radius: 2px;
  ` : `
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-main);
    border: 1px solid var(--border-color);
    border-bottom-left-radius: 2px;
  `}

  [data-theme='professional'] & {
    ${props => props.$isUser ? `
      background: #2563eb;
      color: #ffffff;
    ` : `
      background: #f1f5f9;
      color: #0f172a;
      border-color: #e2e8f0;
    `}
  }
`;

const QuickChips = styled.div`
  display: flex;
  gap: 6px;
  padding: 6px 16px 10px 16px;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Chip = styled.button`
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-dim);
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.72rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--neon-cyan);
    color: var(--neon-cyan);
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #f8fafc;
    border-color: #e2e8f0;
    color: #475569;

    &:hover {
      background: #eff6ff;
      border-color: #bfdbfe;
      color: #2563eb;
    }
  }
`;

const InputForm = styled.form`
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  border-top: 1px solid var(--border-color);
  background: var(--card-bg);
`;

const TextInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.85rem;
  outline: none;

  &:focus {
    border-color: var(--neon-cyan);
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #ffffff;
    border-color: #cbd5e1;
    color: #0f172a;

    &:focus {
      border-color: #2563eb;
    }
  }
`;

const SendButton = styled.button`
  background: var(--neon-cyan);
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 0 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  [data-theme='professional'] &,
  [data-theme='modern'] & {
    background: #2563eb;
    color: #ffffff;
  }
`;

const TwilioNotificationBanner = styled.div`
  background: #10b98122;
  border: 1px solid #10b981;
  color: #10b981;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
`;

export const RookAgentModal = ({ externalPrompt, onClearExternalPrompt, onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('agent') === 'open';
    }
    return false;
  });
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I am Rook Agent, Raj's portfolio assistant. Ask me about his Agentic Component Framework, Linux 6.18 kernel builds, or leave a message and I'll send an instant SMS to Raj via Twilio!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [twilioSent, setTwilioSent] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => {
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
      return localStorage.getItem('rook_minimax_key') || '';
    }
    return '';
  });
  const [keySaved, setKeySaved] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle external prompt passed from VirtualShell (`ask <query>`)
  useEffect(() => {
    if (externalPrompt) {
      setIsOpen(true);
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSendMessage = async (userText) => {
    const text = (userText || inputValue).trim();
    if (!text || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    let assistantText = '';
    const tempIndex = newMessages.length;

    setMessages([...newMessages, { role: 'assistant', content: '...' }]);

    try {
      await askRookAgent({
        messages: newMessages,
        onChunk: (chunkText) => {
          assistantText = chunkText;
          setMessages(prev => {
            const updated = [...prev];
            updated[tempIndex] = { role: 'assistant', content: assistantText };
            return updated;
          });
        },
        onAction: (action) => {
          if (action.type === 'twilio') {
            setTwilioSent(true);
          }
          if (action.type === 'open_resume' && onOpenResume) {
            onOpenResume();
          }
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveKey = (e) => {
    e.preventDefault();
    if (apiKeyInput.trim()) {
      localStorage.setItem('rook_minimax_key', apiKeyInput.trim());
      setKeySaved(true);
      setTimeout(() => {
        setKeySaved(false);
        setShowKeyModal(false);
      }, 1000);
    }
  };

  return (
    <>
      <FloatingRookButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Rook Agent Chat"
      >
        <FaRobot size={16} />
        <span>Rook Agent</span>
      </FloatingRookButton>

      <AnimatePresence>
        {isOpen && (
          <ChatDrawer
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            <DrawerHeader>
              <HeaderTitle>
                <FaRobot color="#22c55e" size={18} />
                <div>
                  Rook Agent
                  <small>Model: MiniMax AI | Feed: Live GitHub</small>
                </div>
              </HeaderTitle>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={() => setShowKeyModal(!showKeyModal)}
                  title="Configure MiniMax API Key"
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  <FaKey />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '1rem' }}
                  aria-label="Close Chat"
                >
                  <FaTimes />
                </button>
              </div>
            </DrawerHeader>

            {/* Optional Key Configuration Drawer */}
            {showKeyModal && (
              <div style={{ padding: '10px 16px', background: 'rgba(0,0,0,0.1)', borderBottom: '1px solid var(--border-color)', fontSize: '0.78rem' }}>
                <form onSubmit={handleSaveKey} style={{ display: 'flex', gap: 6 }}>
                  <input
                    type="password"
                    placeholder="Enter MiniMax API Key"
                    value={apiKeyInput}
                    onChange={e => setApiKeyInput(e.target.value)}
                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.78rem', borderRadius: 4, border: '1px solid var(--border-color)' }}
                  />
                  <button type="submit" style={{ padding: '4px 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                    {keySaved ? <FaCheck /> : 'Save'}
                  </button>
                </form>
                <div style={{ color: 'var(--text-dim)', marginTop: 4 }}>Key stored locally in browser session.</div>
              </div>
            )}

            <MessagesContainer>
              {messages.map((msg, i) => (
                <MessageBubble key={i} $isUser={msg.role === 'user'}>
                  {msg.content}
                </MessageBubble>
              ))}
              {twilioSent && (
                <TwilioNotificationBanner>
                  <FaPhoneAlt />
                  <span>Twilio Alert Dispatched: Raj has been notified via SMS!</span>
                </TwilioNotificationBanner>
              )}
              <div ref={messagesEndRef} />
            </MessagesContainer>

            <QuickChips>
              <Chip onClick={() => handleSendMessage("Tell me about the Agentic Component Framework")}>
                Agentic Framework
              </Chip>
              <Chip onClick={() => handleSendMessage("What did Raj build for RK3588 Linux?")}>
                Linux & RK3588
              </Chip>
              <Chip onClick={() => handleSendMessage("What are his live GitHub repos?")}>
                GitHub Repos
              </Chip>
              <Chip onClick={() => handleSendMessage("I want to interview Raj. Can you let him know?")}>
                Contact / Interview
              </Chip>
            </QuickChips>

            <InputForm onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
              <TextInput
                placeholder="Ask Rook Agent anything..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <SendButton type="submit" disabled={isLoading || !inputValue.trim()} aria-label="Send Message">
                <FaPaperPlane size={13} />
              </SendButton>
            </InputForm>
          </ChatDrawer>
        )}
      </AnimatePresence>
    </>
  );
};

export default RookAgentModal;
