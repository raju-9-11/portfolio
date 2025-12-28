import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PixelCard from './common/PixelCard';
import { sendEmail } from '../services/emailService';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--text-dim);
  color: var(--text-main);
  padding: 10px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--neon-cyan);
    box-shadow: 0 0 5px var(--neon-cyan);
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--text-dim);
  color: var(--text-main);
  padding: 10px;
  font-family: inherit;
  flex: 1;
  resize: none;

  &:focus {
    outline: none;
    border-color: var(--neon-cyan);
    box-shadow: 0 0 5px var(--neon-cyan);
  }
`;

const Button = styled.button`
  background: var(--neon-pink);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #d946ef;
    transform: translateY(-2px);
  }

  &:disabled {
    background: var(--text-dim);
    cursor: not-allowed;
    transform: none;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spin} 1s linear infinite;
`;

const Status = styled.div`
  color: ${props => props.$error ? '#ff5555' : 'var(--neon-green)'};
  font-size: 0.9rem;
  text-align: center;
`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendEmail(formData);
      setStatus({ type: 'success', text: 'TRANSMISSION SENT SUCCESSFULLY' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.log(error);
      setStatus({ type: 'error', text: 'TRANSMISSION FAILED' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PixelCard title="COMMS_UPLINK">
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="CODENAME (Name)"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          required
        />
        <Input
          type="email"
          placeholder="FREQUENCY (Email)"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          required
        />
        <TextArea
          placeholder="PAYLOAD (Message)"
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          required
        />
        <Button type="submit" disabled={loading} aria-busy={loading}>
          {loading && <Spinner aria-hidden="true" />}
          {loading ? 'UPLOADING...' : 'INITIATE UPLOAD'}
        </Button>
        {status && <Status $error={status.type === 'error'}>{status.text}</Status>}
      </Form>
    </PixelCard>
  );
};

export default Contact;
